/* V6 · OIDC/PKCE Boardroom authentication + private bundle loader */
(() => {
  const cfg=()=>window.V6_CONFIG?.auth||{};
  const enc=s=>new TextEncoder().encode(s);
  const b64url=buf=>btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  const isLocal=()=>location.protocol==='file:'||['localhost','127.0.0.1','::1'].includes(location.hostname);
  const now=()=>Math.floor(Date.now()/1000);
  const store=sessionStorage;
  const keys={token:'v6_oidc_token',exp:'v6_oidc_exp',verifier:'v6_pkce_verifier',state:'v6_oidc_state',return:'v6_oidc_return'};
  let privateLoaded=false,discovery=null;

  function status(){
    const c=cfg(), simple=c.simpleLogin||{}, exp=Number(store.getItem(keys.exp)||0);
    if(simple.enabled && store.getItem(simple.sessionKey||'soliss-v61-boardroom')==='1')
      return {authenticated:true,mode:'simple',label:'Acceso Soliss'};
    if(c.enabled && store.getItem(keys.token) && exp>now()+15)
      return {authenticated:true,mode:'oidc',label:'SSO activo'};
    if(!c.enabled && c.allowLocalDemo && isLocal())
      return {authenticated:false,mode:'simple',label:'Login requerido'};
    if(simple.enabled)
      return {authenticated:false,mode:'simple',label:'Login requerido'};
    if(!c.enabled)
      return {authenticated:false,mode:'not-configured',label:'SSO pendiente'};
    return {authenticated:false,mode:'oidc',label:'Login requerido'};
  }
  async function sha256(text){return crypto.subtle.digest('SHA-256',enc(text))}
  function randomString(n=64){
    const a=new Uint8Array(n);crypto.getRandomValues(a);
    return [...a].map(x=>(x%36).toString(36)).join('');
  }
  async function getDiscovery(){
    if(discovery)return discovery;
    const issuer=cfg().issuer?.replace(/\/$/,'');
    if(!issuer||issuer.includes('KEYCLOAK_HOST'))throw new Error('Keycloak issuer no configurado');
    const r=await fetch(`${issuer}/.well-known/openid-configuration`,{cache:'no-store'});
    if(!r.ok)throw new Error(`OIDC discovery ${r.status}`);
    discovery=await r.json();return discovery;
  }
  async function login(){
    const c=cfg();
    if(!c.enabled)throw new Error('OIDC no está habilitado en config/runtime-config.js');
    const d=await getDiscovery(),verifier=randomString(72),challenge=b64url(await sha256(verifier)),state=randomString(32);
    const redirect=c.redirectUri||`${location.origin}${location.pathname}`;
    store.setItem(keys.verifier,verifier);store.setItem(keys.state,state);store.setItem(keys.return,location.href);
    const u=new URL(d.authorization_endpoint);
    u.searchParams.set('client_id',c.clientId);u.searchParams.set('response_type','code');u.searchParams.set('scope',c.scope||'openid profile email');
    u.searchParams.set('redirect_uri',redirect);u.searchParams.set('state',state);u.searchParams.set('code_challenge',challenge);u.searchParams.set('code_challenge_method','S256');
    location.assign(u.toString());
  }
  async function handleCallback(){
    const u=new URL(location.href),code=u.searchParams.get('code'),state=u.searchParams.get('state');
    if(!code)return false;
    if(state!==store.getItem(keys.state))throw new Error('OIDC state inválido');
    const c=cfg(),d=await getDiscovery(),redirect=c.redirectUri||`${location.origin}${location.pathname}`;
    const body=new URLSearchParams({grant_type:'authorization_code',client_id:c.clientId,code,redirect_uri:redirect,code_verifier:store.getItem(keys.verifier)||''});
    const r=await fetch(d.token_endpoint,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
    if(!r.ok)throw new Error(`Token exchange ${r.status}`);
    const t=await r.json();store.setItem(keys.token,t.access_token);store.setItem(keys.exp,String(now()+(t.expires_in||300)));
    [keys.verifier,keys.state].forEach(k=>store.removeItem(k));
    u.searchParams.delete('code');u.searchParams.delete('state');u.searchParams.delete('session_state');u.searchParams.set('view','boardroom');
    history.replaceState(null,'',u);
    return true;
  }
  async function fetchPrivate(path,opts={}){
    const c=cfg(),base=(c.privateBaseUrl||'private').replace(/\/$/,'');
    const url=/^https?:/.test(path)?path:`${base}/${String(path).replace(/^private\//,'').replace(/^\//,'')}`;
    const headers=new Headers(opts.headers||{});
    const st=status();if(st.mode==='oidc')headers.set('Authorization',`Bearer ${store.getItem(keys.token)}`);
    return fetch(url,{...opts,headers,cache:'no-store'});
  }
  function simpleLogin(username,password){
    const c=cfg(),s=c.simpleLogin||{};
    const ok=!!s.enabled && username===String(s.username||'') && password===String(s.password||'');
    if(ok)store.setItem(s.sessionKey||'soliss-v61-boardroom','1');
    return ok;
  }
  function clearSimpleLogin(){
    const s=cfg().simpleLogin||{};
    store.removeItem(s.sessionKey||'soliss-v61-boardroom');
  }
  async function loadPrivateBundle(){
    if(privateLoaded)return true;
    const st=status();if(!st.authenticated)return false;
    const [dr,doc]=await Promise.all([fetchPrivate('boardroom-data.json'),fetchPrivate('documents.json')]);
    if(!dr.ok||!doc.ok)throw new Error(`Bundle privado no disponible (${dr.status}/${doc.status}). Proteja /private en el hosting y permita acceso autenticado.`);
    const board=await dr.json(),docs=await doc.json();
    Object.assign(window.P0.economics,board.economics||{});
    for(const k of ['decisions','gates','evidence','risks'])window.P0[k]=board[k]||[];
    if(board.traces&&window.V6_DATA)window.V6_DATA.traces=board.traces;
    Object.keys(window.P0_DOCUMENTS).forEach(k=>delete window.P0_DOCUMENTS[k]);Object.assign(window.P0_DOCUMENTS,docs);
    privateLoaded=true;
    document.dispatchEvent(new CustomEvent('v6:private-ready',{detail:{mode:st.mode}}));
    return true;
  }
  async function ensureBoardroom(credentials={}){
    let st=status();
    if(st.authenticated){await loadPrivateBundle();return true}
    const c=cfg(),s=c.simpleLogin||{};
    if(s.enabled){
      if(!simpleLogin(credentials.username||'',credentials.password||''))return false;
      await loadPrivateBundle();
      return true;
    }
    if(c.enabled){await login();return false}
    return false;
  }
  async function downloadPrivate(path,filename){
    const r=await fetchPrivate(path);if(!r.ok)throw new Error(`Descarga privada ${r.status}`);
    const blob=await r.blob(),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename||path.split('/').pop();document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  async function logout(){
    const c=cfg();store.removeItem(keys.token);store.removeItem(keys.exp);clearSimpleLogin();privateLoaded=false;
    if(c.enabled){
      try{
        const d=await getDiscovery();
        if(d.end_session_endpoint){const u=new URL(d.end_session_endpoint);u.searchParams.set('post_logout_redirect_uri',`${location.origin}${location.pathname}?view=public`);location.assign(u);return}
      }catch{}
    }
    location.assign(`${location.pathname}?view=public`);
  }
  function readinessText(){
    const c=cfg(),st=status(),s=c.simpleLogin||{};
    if(st.mode==='simple' && st.authenticated)return 'Acceso Boardroom activo para esta sesión.';
    if(s.enabled)return 'Introduzca las credenciales Boardroom para continuar.';
    if(st.mode==='local-demo')return 'Modo DEMO LOCAL.';
    if(!c.enabled)return 'SSO no configurado.';
    if(st.authenticated)return 'Sesión OIDC válida.';
    return 'Keycloak/OIDC configurado. Al continuar se iniciará Authorization Code + PKCE.';
  }

  window.V6Auth={status,login,handleCallback,ensureBoardroom,loadPrivateBundle,fetchPrivate,downloadPrivate,logout,readinessText,simpleLogin,isPrivateLoaded:()=>privateLoaded};
  handleCallback().catch(e=>{console.error(e);sessionStorage.setItem('v6_auth_error',e.message)});
})();
