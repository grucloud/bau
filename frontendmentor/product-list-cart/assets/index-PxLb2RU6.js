(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))E(d);new MutationObserver(d=>{for(const y of d)if(y.type==="childList")for(const k of y.addedNodes)k.tagName==="LINK"&&k.rel==="modulepreload"&&E(k)}).observe(document,{childList:!0,subtree:!0});function x(d){const y={};return d.integrity&&(y.integrity=d.integrity),d.referrerPolicy&&(y.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?y.credentials="include":d.crossOrigin==="anonymous"?y.credentials="omit":y.credentials="same-origin",y}function E(d){if(d.ep)return;d.ep=!0;const y=x(d);fetch(d.href,y)}})();let be=u=>Object.prototype.toString.call(u??0).slice(8,-1),Se=u=>be(u)=="Object",xe=u=>be(u)=="Function",he=u=>["Object","Array"].includes(be(u)),Oe=Object.getPrototypeOf,me=u=>ce(u)?u.val:u,Ee=u=>Array.isArray(u)?u:[u],ce=u=>u==null?void 0:u.__isState,$e=["splice","push","pop","shift","unshift","sort","reverse"];const Pe=u=>!ce(u[0])&&Se(u[0])?[u[0],u.slice(1)]:[{},u];function je(u){let p=window,{document:x}=p,E,d=new Set,y=[],k,S=t=>x.createElement(t),_=(t,o,r)=>{let n=k;k=o;try{return t(r)}catch(a){return console.error(a),r}finally{k=n}},q=()=>{E||(E=p.requestAnimationFrame(()=>{d.forEach(t=>{t.bindings=t.bindings.filter(({element:o})=>{var r;return(r=Array.isArray(o)?o[0]:o)==null?void 0:r.isConnected}),!t.bindings.length&&!t.computed&&d.delete(t)}),E=void 0}))},D=(t,o)=>{!y.length&&p.requestAnimationFrame(j),y.push([t,o])};const j=()=>{let t=0,o=y.length;do{for(let r of new Set(y.slice(t,o).flatMap(([n])=>n.listeners)))m(r.computed,r.state);t=o,o=y.length}while(t<o);for(let r of new Set(y.flatMap(([n,a])=>n.bindings.map(w=>(w.op=a,w)))))J(r);y=[],q()};let J=t=>{var te;const{deps:o,element:r,renderInferred:n,render:a,renderItem:w,isAttribute:h,op:A=[]}=t,[v,b,O,C,$]=A;if(v&&w)(te=se(r,O,(...ee)=>X(w(...ee)),b,C,$)[v])==null||te.call();else{let ee=n?n({element:r}):a({element:r,renderItem:w})(...o.map(me));if(ee!==r&&!h){let re=Ee(t.element=X(ee)),z=Ee(r),F=0;for(;F<z.length&&F<re.length;F++)z[F].replaceWith(X(re[F]));let R=F;for(;re.length>R;)re[R-1].after(re[R]),R++;for(;z.length>F;)z[F].remove(),F++}}},U=(t,o,r=[])=>({get(n,a,w){var h,A;if((h=k==null?void 0:k.g)==null||h.add(t),a==="_isProxy")return!0;if(!((A=n[a])!=null&&A._isProxy)&&!ce(n[a])&&he(n[a]))n[a]=new Proxy(n[a],U(t,o,[...r,a]));else if($e.includes(a)){let v=n[a];return(...b)=>{let O=v.apply(n,b);return D(t,[a,O,b,o,r]),O}}return Reflect.get(n,a,w)},set(n,a,w,h){let A=Reflect.set(n,a,w,h);return D(t,["setItem",A,{prop:a,value:w},o,[...r,a]]),A}}),B=(t,o)=>new Proxy(o,U(t,o)),se=(t,o,r,n,a,w)=>{let h=()=>{if(n.length==0)t.textContent="";else{for(var v=0;v<n.length&&v<t.children.length;v++){const O=t.children[v];O!=null&&O.bauUpdate?O.bauUpdate(O,n[v]):O.replaceWith(r(n[v],v))}let b=t.children[v];if(b)for(;b;){const O=b.nextSibling;b.remove(),b=O}else for(;v<n.length;v++)t.appendChild(r(n[v],v))}},A=v=>t[v]&&t.removeChild(t[v]);return{assign:h,sort:h,reverse:h,setItem:()=>{let v=w[0],b=t.children[v],O=a[v];b&&(b!=null&&b.bauUpdate?b.bauUpdate(b,O):b.replaceWith(r(O,v)))},push:()=>{for(let v=0;v<o.length;v++)t.appendChild(r(o[v],a.length+v))},unshift:()=>{for(let v=o.length-1;v>=0;v--)t.prepend(r(o[v]))},pop:()=>A("lastChild"),shift:()=>A("firstChild"),splice:()=>{const{length:v}=t.children;let[b,O=v,...C]=o;for(let $=b>=0?Math.min(b+O-1,v-1):v-1;$>=(b>=0?b:v+b);$--)t.children[$].remove();if(C.length){let $=C.map((te,ee)=>r(te,b+ee));t.children[b]?t.children[b].before(...$):t.append(...$)}}}},W=(t,{onUpdate:o,name:r}={})=>({name:r,rawVal:t,bindings:[],listeners:[],__isState:!0,get val(){var a;let n=this;return(a=k==null?void 0:k.g)==null||a.add(n),n.valProxy??(n.valProxy=he(t)?B(n,t):t,n.valProxy)},set val(n){var h;let a=this,w=a.rawVal;(h=k==null?void 0:k.s)==null||h.add(a),o==null||o(w,n),a.rawVal=n,he(n)?(a.valProxy=B(a,n),D(a,["assign",n])):n!==w&&(a.valProxy=n,a.bindings.length+a.listeners.length&&D(a))}}),X=t=>{if(t==null||t===!1){let o=S("span");return o.style.display="none",o}else return t.nodeType?t:Array.isArray(t)?t.map(X):x.createTextNode(t)},m=(t,o)=>{let r={g:new Set,s:new Set};return o.val=_(t,r),r},ae=(t,o)=>{let r=W(void 0,o),n=m(t,r);r.computed=!0;let a={computed:t,state:r};for(let w of new Set([...n.g].filter(h=>!n.s.has(h)&&h.listeners.every(A=>!n.g.has(A.state)))))w.listeners.push(a);return r},M=(t,o=[])=>{for(let r of o)if(Array.isArray(r))M(t,r);else if(r!=null){let n=ce(r)?c({deps:[r],render:()=>a=>a}):xe(r)?l(r):X(r);Array.isArray(n)?t.append(...n):t.appendChild(n)}},ne={},L=(t,o)=>t&&(Object.getOwnPropertyDescriptor(t,o)??L(Oe(t),o)),H=(t,o,r)=>{var n;return ne[t+","+o]??(ne[t+","+o]=((n=L(r,o))==null?void 0:n.set)??0)},e=(t,o)=>new p.MutationObserver((r,n)=>{r.filter(a=>a.removedNodes).forEach(a=>[...a.removedNodes].find(w=>w===t&&(o({element:t}),n.disconnect(),!0)))}).observe(t.parentNode,{childList:!0}),i=(t,o)=>new p.MutationObserver((r,n)=>r.forEach(a=>o({record:a,element:t}))).observe(t,{childList:!0}),s=t=>new Proxy(function(r,...n){var A;let[a,w]=Pe(n),h=t?x.createElementNS(t,r):S(r);for(let[v,b]of Object.entries(a))if(v=="bauUpdate")h[v]=b;else if(!v.startsWith("bau")){let O=H(r,v,Oe(h))?C=>C!==void 0&&(h[v]=C):C=>h.setAttribute(v,Array.isArray(C)?C.filter($=>$).join(" "):C);b==null||(ce(b)?c({deps:[b],render:()=>()=>(O(b.val),h)},!0):xe(b)&&(!v.startsWith("on")||b.isDerived)?l(()=>(O(b({element:h})),h),!0):b.renderProp?c({deps:b.deps,render:()=>()=>(O(b.renderProp({element:h})(...b.deps.map(me))),h)},!0):O(b))}return a.bauChildMutated&&i(h,a.bauChildMutated),M(h,w),h.autofocus&&h.focus&&p.requestAnimationFrame(()=>h.focus()),(A=a.bauCreated)==null||A.call(a,{element:h}),a.bauMounted&&p.requestAnimationFrame(()=>a.bauMounted({element:h})),a.bauUnmounted&&p.requestAnimationFrame(()=>e(h,a.bauUnmounted)),h},{get:(o,r)=>o.bind(void 0,r)}),f=(t,o,r,n)=>{t.element=X(r),t.isAttribute=n;for(let a of o.g)ce(a)&&(d.add(a),a.bindings.push(t));return t.element},l=(t,o)=>{let r={g:new Set,s:new Set},n=_(t,r,{});return f({renderInferred:t},r,n,o)},c=({deps:t,element:o,render:r,renderItem:n},a)=>f({deps:t,render:r,renderItem:n},{g:new Set(t),s:new Set},r({element:o,renderItem:n})(...t.map(me)),a),g=(t,o,r)=>c({deps:[t],render:({renderItem:n})=>a=>{for(let w=0;w<a.length;w++)o.appendChild(n(a[w],w));return o},renderItem:r});return{tags:s(),tagsNS:s,state:W,bind:c,loop:g,derive:ae,stateSet:d}}const Ie=u=>{let p=0,x=11;for(;p<u.length;)x=101*x+u.charCodeAt(p++)>>>0;return"bau"+x},Me=(u,p,x,E)=>{const d=u.createElement("style");d.id=x,d.append(E),(p??u.head).append(d)},_e=(u,p)=>u.reduce((x,E,d)=>x+E+(p[d]??""),"");function Be(u){let{document:p}=(u==null?void 0:u.window)??window;const x=E=>(d,...y)=>{const k=_e(d,y),S=Ie(k);return!p.getElementById(S)&&Me(p,u==null?void 0:u.target,S,E(S,k)),S};return{css:x((E,d)=>`.${E} { ${d} }`),keyframes:x((E,d)=>`@keyframes ${E} { ${d} }`),createGlobalStyles:x((E,d)=>d)}}const ye=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Te=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],qe=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Le=u=>`var(--color-${u})`,Re=u=>`var(--color-${u}-lightest)`,De=()=>ye.map(([u])=>`
.outline.${u} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${u} {
  background-color: ${Re(u)};
}
.solid.${u} {
  background-color: ${Le(u)};
}
`).join(`
`),Ue=()=>ye.map(([u])=>[`--color-${u}-s: var(--color-${u}-dark-s);`]).join(`
`),ze=u=>100-u*10,Fe=()=>new Array(10).fill("").map((u,p)=>`--color-gray-${p*100}: hsl(0, 0%, ${ze(p)}%);`).join(`
`),Ae=({dark:u})=>new Array(10).fill("").map((p,x)=>`--color-emphasis-${x*100}: var(--color-gray-${u?1e3-x*100:x*100});`).join(`
`),Ge=([u,{h:p,s:x,l:E}])=>[`--color-${u}-h: ${p};`,`--color-${u}-l: ${E};`,`--color-${u}-base-s: ${x};`,`--color-${u}-s: var(--color-${u}-base-s);`,`--color-${u}-dark-s: calc(${x} - 25%);`,`--color-${u}-hsl: var(--color-${u}-h), var(--color-${u}-s), var(--color-${u}-l);`,`--color-${u}: hsl(var(--color-${u}-hsl));`,...Te.map(([d,y])=>`--color-${u}-${d}: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * ${y}));`),...qe.map(([d,y])=>`--color-${u}-${d}: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * ${y}));`),`--color-${u}-contrast-background: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) / var(--contrast-background-value)));`,`--color-${u}-contrast-foreground: hsl(var(--color-${u}-h), var(--color-${u}-s), calc(var(--color-${u}-l) * var(--contrast-foreground-value)));`].join(`
`);function He({createGlobalStyles:u},{colorPalette:p=ye}={}){u`
    * {
      margin: 0;
      padding: 0;
    }
   
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${p.map(([x,E])=>Ge([x,E])).join(`
`)}
      ${Fe()}
      ${Ae({})}
      ${De()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.2rem;
      --font-color: var(--color-content);
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
      --font-color-inverse: var(--color-content-inverse);
      --font-color-secondary: var(--color-content-secondary);
      --font-color-inverse-secondary: hsl(0, 0%, 75%);
      --font-family: system-ui, -apple-system, Helvetica, Arial, sans-serif;
      --font-family-monospace: Consolas, monospace;
      --font-weight-light: 300;
      --font-weight-normal: 400;
      --font-weight-semibold: 500;
      --font-weight-bold: 700;
      --global-spacing: 1rem;
      --spacing-vertical: var(--global-spacing);
      --spacing-horizontal: var(--global-spacing);
      --transition-fast: 200ms;
      --transition-slow: 400ms;
      --shadow-s: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      --shadow-m: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      --shadow-lg: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
      --font-size-base: 100%;
      --line-height-base: 1.65;
      --link-color: var(--color-primary);
      --brightness-hover-always: 120%;
      --brightness-active-always: 130%;
      --brightness-hover: 80%;
      --brightness-hover-reverse: 140%;
      --brightness-active: 90%;
      .plain {
        background-color: var(--background-color);
      }
      .outline {
        background-color: var(--background-color);
      }
      .solid {
        color: var(--font-color-inverse);
      }
      .sm {
        font-size: 0.8rem;
      }
      .md {
        font-size: 1rem;
      }
      .lg {
        font-size: 1.2rem;
      }
    }
    :root {
      font-family: var(--font-family);
      color-scheme: var(--color-scheme);
      color: var(--color-content);
      font: var(--font-size-base) / var(--line-height-base) var(--font-family);
      background-color: var(--background-color);
    }
    html:has(dialog[open]) {
      overflow: hidden;
    }
    html[data-theme="dark"] {
      ${Ue()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Ae({dark:!0})};
    }
  `}function Ve(u){const p=je(),x=Be({target:window.document.getElementById("bau-css")});return He(x),{bau:p,...x,tr:E=>E,window,...u}}var We=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,pe=Math.ceil,Q=Math.floor,V="[BigNumber Error] ",ke=V+"Number primitive has more than 15 significant digits: ",Z=1e14,N=14,we=9007199254740991,ve=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],oe=1e7,T=1e9;function Ce(u){var p,x,E,d=m.prototype={constructor:m,toString:null,valueOf:null},y=new m(1),k=20,S=4,_=-7,q=21,D=-1e7,j=1e7,J=!1,U=1,B=0,se={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},W="0123456789abcdefghijklmnopqrstuvwxyz",X=!0;function m(e,i){var s,f,l,c,g,t,o,r,n=this;if(!(n instanceof m))return new m(e,i);if(i==null){if(e&&e._isBigNumber===!0){n.s=e.s,!e.c||e.e>j?n.c=n.e=null:e.e<D?n.c=[n.e=0]:(n.e=e.e,n.c=e.c.slice());return}if((t=typeof e=="number")&&e*0==0){if(n.s=1/e<0?(e=-e,-1):1,e===~~e){for(c=0,g=e;g>=10;g/=10,c++);c>j?n.c=n.e=null:(n.e=c,n.c=[e]);return}r=String(e)}else{if(!We.test(r=String(e)))return E(n,r,t);n.s=r.charCodeAt(0)==45?(r=r.slice(1),-1):1}(c=r.indexOf("."))>-1&&(r=r.replace(".","")),(g=r.search(/e/i))>0?(c<0&&(c=g),c+=+r.slice(g+1),r=r.substring(0,g)):c<0&&(c=r.length)}else{if(P(i,2,W.length,"Base"),i==10&&X)return n=new m(e),L(n,k+n.e+1,S);if(r=String(e),t=typeof e=="number"){if(e*0!=0)return E(n,r,t,i);if(n.s=1/e<0?(r=r.slice(1),-1):1,m.DEBUG&&r.replace(/^0\.0*|\./,"").length>15)throw Error(ke+e)}else n.s=r.charCodeAt(0)===45?(r=r.slice(1),-1):1;for(s=W.slice(0,i),c=g=0,o=r.length;g<o;g++)if(s.indexOf(f=r.charAt(g))<0){if(f=="."){if(g>c){c=o;continue}}else if(!l&&(r==r.toUpperCase()&&(r=r.toLowerCase())||r==r.toLowerCase()&&(r=r.toUpperCase()))){l=!0,g=-1,c=0;continue}return E(n,String(e),t,i)}t=!1,r=x(r,i,10,n.s),(c=r.indexOf("."))>-1?r=r.replace(".",""):c=r.length}for(g=0;r.charCodeAt(g)===48;g++);for(o=r.length;r.charCodeAt(--o)===48;);if(r=r.slice(g,++o)){if(o-=g,t&&m.DEBUG&&o>15&&(e>we||e!==Q(e)))throw Error(ke+n.s*e);if((c=c-g-1)>j)n.c=n.e=null;else if(c<D)n.c=[n.e=0];else{if(n.e=c,n.c=[],g=(c+1)%N,c<0&&(g+=N),g<o){for(g&&n.c.push(+r.slice(0,g)),o-=N;g<o;)n.c.push(+r.slice(g,g+=N));g=N-(r=r.slice(g)).length}else g-=o;for(;g--;r+="0");n.c.push(+r)}}else n.c=[n.e=0]}m.clone=Ce,m.ROUND_UP=0,m.ROUND_DOWN=1,m.ROUND_CEIL=2,m.ROUND_FLOOR=3,m.ROUND_HALF_UP=4,m.ROUND_HALF_DOWN=5,m.ROUND_HALF_EVEN=6,m.ROUND_HALF_CEIL=7,m.ROUND_HALF_FLOOR=8,m.EUCLID=9,m.config=m.set=function(e){var i,s;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(i="DECIMAL_PLACES")&&(s=e[i],P(s,0,T,i),k=s),e.hasOwnProperty(i="ROUNDING_MODE")&&(s=e[i],P(s,0,8,i),S=s),e.hasOwnProperty(i="EXPONENTIAL_AT")&&(s=e[i],s&&s.pop?(P(s[0],-T,0,i),P(s[1],0,T,i),_=s[0],q=s[1]):(P(s,-T,T,i),_=-(q=s<0?-s:s))),e.hasOwnProperty(i="RANGE"))if(s=e[i],s&&s.pop)P(s[0],-T,-1,i),P(s[1],1,T,i),D=s[0],j=s[1];else if(P(s,-T,T,i),s)D=-(j=s<0?-s:s);else throw Error(V+i+" cannot be zero: "+s);if(e.hasOwnProperty(i="CRYPTO"))if(s=e[i],s===!!s)if(s)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))J=s;else throw J=!s,Error(V+"crypto unavailable");else J=s;else throw Error(V+i+" not true or false: "+s);if(e.hasOwnProperty(i="MODULO_MODE")&&(s=e[i],P(s,0,9,i),U=s),e.hasOwnProperty(i="POW_PRECISION")&&(s=e[i],P(s,0,T,i),B=s),e.hasOwnProperty(i="FORMAT"))if(s=e[i],typeof s=="object")se=s;else throw Error(V+i+" not an object: "+s);if(e.hasOwnProperty(i="ALPHABET"))if(s=e[i],typeof s=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(s))X=s.slice(0,10)=="0123456789",W=s;else throw Error(V+i+" invalid: "+s)}else throw Error(V+"Object expected: "+e);return{DECIMAL_PLACES:k,ROUNDING_MODE:S,EXPONENTIAL_AT:[_,q],RANGE:[D,j],CRYPTO:J,MODULO_MODE:U,POW_PRECISION:B,FORMAT:se,ALPHABET:W}},m.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!m.DEBUG)return!0;var i,s,f=e.c,l=e.e,c=e.s;e:if({}.toString.call(f)=="[object Array]"){if((c===1||c===-1)&&l>=-T&&l<=T&&l===Q(l)){if(f[0]===0){if(l===0&&f.length===1)return!0;break e}if(i=(l+1)%N,i<1&&(i+=N),String(f[0]).length==i){for(i=0;i<f.length;i++)if(s=f[i],s<0||s>=Z||s!==Q(s))break e;if(s!==0)return!0}}}else if(f===null&&l===null&&(c===null||c===1||c===-1))return!0;throw Error(V+"Invalid BigNumber: "+e)},m.maximum=m.max=function(){return M(arguments,-1)},m.minimum=m.min=function(){return M(arguments,1)},m.random=function(){var e=9007199254740992,i=Math.random()*e&2097151?function(){return Q(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(s){var f,l,c,g,t,o=0,r=[],n=new m(y);if(s==null?s=k:P(s,0,T),g=pe(s/N),J)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(g*=2));o<g;)t=f[o]*131072+(f[o+1]>>>11),t>=9e15?(l=crypto.getRandomValues(new Uint32Array(2)),f[o]=l[0],f[o+1]=l[1]):(r.push(t%1e14),o+=2);o=g/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(g*=7);o<g;)t=(f[o]&31)*281474976710656+f[o+1]*1099511627776+f[o+2]*4294967296+f[o+3]*16777216+(f[o+4]<<16)+(f[o+5]<<8)+f[o+6],t>=9e15?crypto.randomBytes(7).copy(f,o):(r.push(t%1e14),o+=7);o=g/7}else throw J=!1,Error(V+"crypto unavailable");if(!J)for(;o<g;)t=i(),t<9e15&&(r[o++]=t%1e14);for(g=r[--o],s%=N,g&&s&&(t=ve[N-s],r[o]=Q(g/t)*t);r[o]===0;r.pop(),o--);if(o<0)r=[c=0];else{for(c=-1;r[0]===0;r.splice(0,1),c-=N);for(o=1,t=r[0];t>=10;t/=10,o++);o<N&&(c-=N-o)}return n.e=c,n.c=r,n}}(),m.sum=function(){for(var e=1,i=arguments,s=new m(i[0]);e<i.length;)s=s.plus(i[e++]);return s},x=function(){var e="0123456789";function i(s,f,l,c){for(var g,t=[0],o,r=0,n=s.length;r<n;){for(o=t.length;o--;t[o]*=f);for(t[0]+=c.indexOf(s.charAt(r++)),g=0;g<t.length;g++)t[g]>l-1&&(t[g+1]==null&&(t[g+1]=0),t[g+1]+=t[g]/l|0,t[g]%=l)}return t.reverse()}return function(s,f,l,c,g){var t,o,r,n,a,w,h,A,v=s.indexOf("."),b=k,O=S;for(v>=0&&(n=B,B=0,s=s.replace(".",""),A=new m(f),w=A.pow(s.length-v),B=n,A.c=i(ie(Y(w.c),w.e,"0"),10,l,e),A.e=A.c.length),h=i(s,f,l,g?(t=W,e):(t=e,W)),r=n=h.length;h[--n]==0;h.pop());if(!h[0])return t.charAt(0);if(v<0?--r:(w.c=h,w.e=r,w.s=c,w=p(w,A,b,O,l),h=w.c,a=w.r,r=w.e),o=r+b+1,v=h[o],n=l/2,a=a||o<0||h[o+1]!=null,a=O<4?(v!=null||a)&&(O==0||O==(w.s<0?3:2)):v>n||v==n&&(O==4||a||O==6&&h[o-1]&1||O==(w.s<0?8:7)),o<1||!h[0])s=a?ie(t.charAt(1),-b,t.charAt(0)):t.charAt(0);else{if(h.length=o,a)for(--l;++h[--o]>l;)h[o]=0,o||(++r,h=[1].concat(h));for(n=h.length;!h[--n];);for(v=0,s="";v<=n;s+=t.charAt(h[v++]));s=ie(s,r,t.charAt(0))}return s}}(),p=function(){function e(f,l,c){var g,t,o,r,n=0,a=f.length,w=l%oe,h=l/oe|0;for(f=f.slice();a--;)o=f[a]%oe,r=f[a]/oe|0,g=h*o+r*w,t=w*o+g%oe*oe+n,n=(t/c|0)+(g/oe|0)+h*r,f[a]=t%c;return n&&(f=[n].concat(f)),f}function i(f,l,c,g){var t,o;if(c!=g)o=c>g?1:-1;else for(t=o=0;t<c;t++)if(f[t]!=l[t]){o=f[t]>l[t]?1:-1;break}return o}function s(f,l,c,g){for(var t=0;c--;)f[c]-=t,t=f[c]<l[c]?1:0,f[c]=t*g+f[c]-l[c];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,l,c,g,t){var o,r,n,a,w,h,A,v,b,O,C,$,te,ee,re,z,F,R=f.s==l.s?1:-1,G=f.c,I=l.c;if(!G||!G[0]||!I||!I[0])return new m(!f.s||!l.s||(G?I&&G[0]==I[0]:!I)?NaN:G&&G[0]==0||!I?R*0:R/0);for(v=new m(R),b=v.c=[],r=f.e-l.e,R=c+r+1,t||(t=Z,r=K(f.e/N)-K(l.e/N),R=R/N|0),n=0;I[n]==(G[n]||0);n++);if(I[n]>(G[n]||0)&&r--,R<0)b.push(1),a=!0;else{for(ee=G.length,z=I.length,n=0,R+=2,w=Q(t/(I[0]+1)),w>1&&(I=e(I,w,t),G=e(G,w,t),z=I.length,ee=G.length),te=z,O=G.slice(0,z),C=O.length;C<z;O[C++]=0);F=I.slice(),F=[0].concat(F),re=I[0],I[1]>=t/2&&re++;do{if(w=0,o=i(I,O,z,C),o<0){if($=O[0],z!=C&&($=$*t+(O[1]||0)),w=Q($/re),w>1)for(w>=t&&(w=t-1),h=e(I,w,t),A=h.length,C=O.length;i(h,O,A,C)==1;)w--,s(h,z<A?F:I,A,t),A=h.length,o=1;else w==0&&(o=w=1),h=I.slice(),A=h.length;if(A<C&&(h=[0].concat(h)),s(O,h,C,t),C=O.length,o==-1)for(;i(I,O,z,C)<1;)w++,s(O,z<C?F:I,C,t),C=O.length}else o===0&&(w++,O=[0]);b[n++]=w,O[0]?O[C++]=G[te]||0:(O=[G[te]],C=1)}while((te++<ee||O[0]!=null)&&R--);a=O[0]!=null,b[0]||b.splice(0,1)}if(t==Z){for(n=1,R=b[0];R>=10;R/=10,n++);L(v,c+(v.e=n+r*N-1)+1,g,a)}else v.e=r,v.r=+a;return v}}();function ae(e,i,s,f){var l,c,g,t,o;if(s==null?s=S:P(s,0,8),!e.c)return e.toString();if(l=e.c[0],g=e.e,i==null)o=Y(e.c),o=f==1||f==2&&(g<=_||g>=q)?de(o,g):ie(o,g,"0");else if(e=L(new m(e),i,s),c=e.e,o=Y(e.c),t=o.length,f==1||f==2&&(i<=c||c<=_)){for(;t<i;o+="0",t++);o=de(o,c)}else if(i-=g,o=ie(o,c,"0"),c+1>t){if(--i>0)for(o+=".";i--;o+="0");}else if(i+=c-t,i>0)for(c+1==t&&(o+=".");i--;o+="0");return e.s<0&&l?"-"+o:o}function M(e,i){for(var s,f,l=1,c=new m(e[0]);l<e.length;l++)f=new m(e[l]),(!f.s||(s=le(c,f))===i||s===0&&c.s===i)&&(c=f);return c}function ne(e,i,s){for(var f=1,l=i.length;!i[--l];i.pop());for(l=i[0];l>=10;l/=10,f++);return(s=f+s*N-1)>j?e.c=e.e=null:s<D?e.c=[e.e=0]:(e.e=s,e.c=i),e}E=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,i=/^([^.]+)\.$/,s=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,l=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(c,g,t,o){var r,n=t?g:g.replace(l,"");if(f.test(n))c.s=isNaN(n)?null:n<0?-1:1;else{if(!t&&(n=n.replace(e,function(a,w,h){return r=(h=h.toLowerCase())=="x"?16:h=="b"?2:8,!o||o==r?w:a}),o&&(r=o,n=n.replace(i,"$1").replace(s,"0.$1")),g!=n))return new m(n,r);if(m.DEBUG)throw Error(V+"Not a"+(o?" base "+o:"")+" number: "+g);c.s=null}c.c=c.e=null}}();function L(e,i,s,f){var l,c,g,t,o,r,n,a=e.c,w=ve;if(a){e:{for(l=1,t=a[0];t>=10;t/=10,l++);if(c=i-l,c<0)c+=N,g=i,o=a[r=0],n=Q(o/w[l-g-1]%10);else if(r=pe((c+1)/N),r>=a.length)if(f){for(;a.length<=r;a.push(0));o=n=0,l=1,c%=N,g=c-N+1}else break e;else{for(o=t=a[r],l=1;t>=10;t/=10,l++);c%=N,g=c-N+l,n=g<0?0:Q(o/w[l-g-1]%10)}if(f=f||i<0||a[r+1]!=null||(g<0?o:o%w[l-g-1]),f=s<4?(n||f)&&(s==0||s==(e.s<0?3:2)):n>5||n==5&&(s==4||f||s==6&&(c>0?g>0?o/w[l-g]:0:a[r-1])%10&1||s==(e.s<0?8:7)),i<1||!a[0])return a.length=0,f?(i-=e.e+1,a[0]=w[(N-i%N)%N],e.e=-i||0):a[0]=e.e=0,e;if(c==0?(a.length=r,t=1,r--):(a.length=r+1,t=w[N-c],a[r]=g>0?Q(o/w[l-g]%w[g])*t:0),f)for(;;)if(r==0){for(c=1,g=a[0];g>=10;g/=10,c++);for(g=a[0]+=t,t=1;g>=10;g/=10,t++);c!=t&&(e.e++,a[0]==Z&&(a[0]=1));break}else{if(a[r]+=t,a[r]!=Z)break;a[r--]=0,t=1}for(c=a.length;a[--c]===0;a.pop());}e.e>j?e.c=e.e=null:e.e<D&&(e.c=[e.e=0])}return e}function H(e){var i,s=e.e;return s===null?e.toString():(i=Y(e.c),i=s<=_||s>=q?de(i,s):ie(i,s,"0"),e.s<0?"-"+i:i)}return d.absoluteValue=d.abs=function(){var e=new m(this);return e.s<0&&(e.s=1),e},d.comparedTo=function(e,i){return le(this,new m(e,i))},d.decimalPlaces=d.dp=function(e,i){var s,f,l,c=this;if(e!=null)return P(e,0,T),i==null?i=S:P(i,0,8),L(new m(c),e+c.e+1,i);if(!(s=c.c))return null;if(f=((l=s.length-1)-K(this.e/N))*N,l=s[l])for(;l%10==0;l/=10,f--);return f<0&&(f=0),f},d.dividedBy=d.div=function(e,i){return p(this,new m(e,i),k,S)},d.dividedToIntegerBy=d.idiv=function(e,i){return p(this,new m(e,i),0,1)},d.exponentiatedBy=d.pow=function(e,i){var s,f,l,c,g,t,o,r,n,a=this;if(e=new m(e),e.c&&!e.isInteger())throw Error(V+"Exponent not an integer: "+H(e));if(i!=null&&(i=new m(i)),t=e.e>14,!a.c||!a.c[0]||a.c[0]==1&&!a.e&&a.c.length==1||!e.c||!e.c[0])return n=new m(Math.pow(+H(a),t?e.s*(2-ge(e)):+H(e))),i?n.mod(i):n;if(o=e.s<0,i){if(i.c?!i.c[0]:!i.s)return new m(NaN);f=!o&&a.isInteger()&&i.isInteger(),f&&(a=a.mod(i))}else{if(e.e>9&&(a.e>0||a.e<-1||(a.e==0?a.c[0]>1||t&&a.c[1]>=24e7:a.c[0]<8e13||t&&a.c[0]<=9999975e7)))return c=a.s<0&&ge(e)?-0:0,a.e>-1&&(c=1/c),new m(o?1/c:c);B&&(c=pe(B/N+2))}for(t?(s=new m(.5),o&&(e.s=1),r=ge(e)):(l=Math.abs(+H(e)),r=l%2),n=new m(y);;){if(r){if(n=n.times(a),!n.c)break;c?n.c.length>c&&(n.c.length=c):f&&(n=n.mod(i))}if(l){if(l=Q(l/2),l===0)break;r=l%2}else if(e=e.times(s),L(e,e.e+1,1),e.e>14)r=ge(e);else{if(l=+H(e),l===0)break;r=l%2}a=a.times(a),c?a.c&&a.c.length>c&&(a.c.length=c):f&&(a=a.mod(i))}return f?n:(o&&(n=y.div(n)),i?n.mod(i):c?L(n,B,S,g):n)},d.integerValue=function(e){var i=new m(this);return e==null?e=S:P(e,0,8),L(i,i.e+1,e)},d.isEqualTo=d.eq=function(e,i){return le(this,new m(e,i))===0},d.isFinite=function(){return!!this.c},d.isGreaterThan=d.gt=function(e,i){return le(this,new m(e,i))>0},d.isGreaterThanOrEqualTo=d.gte=function(e,i){return(i=le(this,new m(e,i)))===1||i===0},d.isInteger=function(){return!!this.c&&K(this.e/N)>this.c.length-2},d.isLessThan=d.lt=function(e,i){return le(this,new m(e,i))<0},d.isLessThanOrEqualTo=d.lte=function(e,i){return(i=le(this,new m(e,i)))===-1||i===0},d.isNaN=function(){return!this.s},d.isNegative=function(){return this.s<0},d.isPositive=function(){return this.s>0},d.isZero=function(){return!!this.c&&this.c[0]==0},d.minus=function(e,i){var s,f,l,c,g=this,t=g.s;if(e=new m(e,i),i=e.s,!t||!i)return new m(NaN);if(t!=i)return e.s=-i,g.plus(e);var o=g.e/N,r=e.e/N,n=g.c,a=e.c;if(!o||!r){if(!n||!a)return n?(e.s=-i,e):new m(a?g:NaN);if(!n[0]||!a[0])return a[0]?(e.s=-i,e):new m(n[0]?g:S==3?-0:0)}if(o=K(o),r=K(r),n=n.slice(),t=o-r){for((c=t<0)?(t=-t,l=n):(r=o,l=a),l.reverse(),i=t;i--;l.push(0));l.reverse()}else for(f=(c=(t=n.length)<(i=a.length))?t:i,t=i=0;i<f;i++)if(n[i]!=a[i]){c=n[i]<a[i];break}if(c&&(l=n,n=a,a=l,e.s=-e.s),i=(f=a.length)-(s=n.length),i>0)for(;i--;n[s++]=0);for(i=Z-1;f>t;){if(n[--f]<a[f]){for(s=f;s&&!n[--s];n[s]=i);--n[s],n[f]+=Z}n[f]-=a[f]}for(;n[0]==0;n.splice(0,1),--r);return n[0]?ne(e,n,r):(e.s=S==3?-1:1,e.c=[e.e=0],e)},d.modulo=d.mod=function(e,i){var s,f,l=this;return e=new m(e,i),!l.c||!e.s||e.c&&!e.c[0]?new m(NaN):!e.c||l.c&&!l.c[0]?new m(l):(U==9?(f=e.s,e.s=1,s=p(l,e,0,3),e.s=f,s.s*=f):s=p(l,e,0,U),e=l.minus(s.times(e)),!e.c[0]&&U==1&&(e.s=l.s),e)},d.multipliedBy=d.times=function(e,i){var s,f,l,c,g,t,o,r,n,a,w,h,A,v,b,O=this,C=O.c,$=(e=new m(e,i)).c;if(!C||!$||!C[0]||!$[0])return!O.s||!e.s||C&&!C[0]&&!$||$&&!$[0]&&!C?e.c=e.e=e.s=null:(e.s*=O.s,!C||!$?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=K(O.e/N)+K(e.e/N),e.s*=O.s,o=C.length,a=$.length,o<a&&(A=C,C=$,$=A,l=o,o=a,a=l),l=o+a,A=[];l--;A.push(0));for(v=Z,b=oe,l=a;--l>=0;){for(s=0,w=$[l]%b,h=$[l]/b|0,g=o,c=l+g;c>l;)r=C[--g]%b,n=C[g]/b|0,t=h*r+n*w,r=w*r+t%b*b+A[c]+s,s=(r/v|0)+(t/b|0)+h*n,A[c--]=r%v;A[c]=s}return s?++f:A.splice(0,1),ne(e,A,f)},d.negated=function(){var e=new m(this);return e.s=-e.s||null,e},d.plus=function(e,i){var s,f=this,l=f.s;if(e=new m(e,i),i=e.s,!l||!i)return new m(NaN);if(l!=i)return e.s=-i,f.minus(e);var c=f.e/N,g=e.e/N,t=f.c,o=e.c;if(!c||!g){if(!t||!o)return new m(l/0);if(!t[0]||!o[0])return o[0]?e:new m(t[0]?f:l*0)}if(c=K(c),g=K(g),t=t.slice(),l=c-g){for(l>0?(g=c,s=o):(l=-l,s=t),s.reverse();l--;s.push(0));s.reverse()}for(l=t.length,i=o.length,l-i<0&&(s=o,o=t,t=s,i=l),l=0;i;)l=(t[--i]=t[i]+o[i]+l)/Z|0,t[i]=Z===t[i]?0:t[i]%Z;return l&&(t=[l].concat(t),++g),ne(e,t,g)},d.precision=d.sd=function(e,i){var s,f,l,c=this;if(e!=null&&e!==!!e)return P(e,1,T),i==null?i=S:P(i,0,8),L(new m(c),e,i);if(!(s=c.c))return null;if(l=s.length-1,f=l*N+1,l=s[l]){for(;l%10==0;l/=10,f--);for(l=s[0];l>=10;l/=10,f++);}return e&&c.e+1>f&&(f=c.e+1),f},d.shiftedBy=function(e){return P(e,-we,we),this.times("1e"+e)},d.squareRoot=d.sqrt=function(){var e,i,s,f,l,c=this,g=c.c,t=c.s,o=c.e,r=k+4,n=new m("0.5");if(t!==1||!g||!g[0])return new m(!t||t<0&&(!g||g[0])?NaN:g?c:1/0);if(t=Math.sqrt(+H(c)),t==0||t==1/0?(i=Y(g),(i.length+o)%2==0&&(i+="0"),t=Math.sqrt(+i),o=K((o+1)/2)-(o<0||o%2),t==1/0?i="5e"+o:(i=t.toExponential(),i=i.slice(0,i.indexOf("e")+1)+o),s=new m(i)):s=new m(t+""),s.c[0]){for(o=s.e,t=o+r,t<3&&(t=0);;)if(l=s,s=n.times(l.plus(p(c,l,r,1))),Y(l.c).slice(0,t)===(i=Y(s.c)).slice(0,t))if(s.e<o&&--t,i=i.slice(t-3,t+1),i=="9999"||!f&&i=="4999"){if(!f&&(L(l,l.e+k+2,0),l.times(l).eq(c))){s=l;break}r+=4,t+=4,f=1}else{(!+i||!+i.slice(1)&&i.charAt(0)=="5")&&(L(s,s.e+k+2,1),e=!s.times(s).eq(c));break}}return L(s,s.e+k+1,S,e)},d.toExponential=function(e,i){return e!=null&&(P(e,0,T),e++),ae(this,e,i,1)},d.toFixed=function(e,i){return e!=null&&(P(e,0,T),e=e+this.e+1),ae(this,e,i)},d.toFormat=function(e,i,s){var f,l=this;if(s==null)e!=null&&i&&typeof i=="object"?(s=i,i=null):e&&typeof e=="object"?(s=e,e=i=null):s=se;else if(typeof s!="object")throw Error(V+"Argument not an object: "+s);if(f=l.toFixed(e,i),l.c){var c,g=f.split("."),t=+s.groupSize,o=+s.secondaryGroupSize,r=s.groupSeparator||"",n=g[0],a=g[1],w=l.s<0,h=w?n.slice(1):n,A=h.length;if(o&&(c=t,t=o,o=c,A-=c),t>0&&A>0){for(c=A%t||t,n=h.substr(0,c);c<A;c+=t)n+=r+h.substr(c,t);o>0&&(n+=r+h.slice(c)),w&&(n="-"+n)}f=a?n+(s.decimalSeparator||"")+((o=+s.fractionGroupSize)?a.replace(new RegExp("\\d{"+o+"}\\B","g"),"$&"+(s.fractionGroupSeparator||"")):a):n}return(s.prefix||"")+f+(s.suffix||"")},d.toFraction=function(e){var i,s,f,l,c,g,t,o,r,n,a,w,h=this,A=h.c;if(e!=null&&(t=new m(e),!t.isInteger()&&(t.c||t.s!==1)||t.lt(y)))throw Error(V+"Argument "+(t.isInteger()?"out of range: ":"not an integer: ")+H(t));if(!A)return new m(h);for(i=new m(y),r=s=new m(y),f=o=new m(y),w=Y(A),c=i.e=w.length-h.e-1,i.c[0]=ve[(g=c%N)<0?N+g:g],e=!e||t.comparedTo(i)>0?c>0?i:r:t,g=j,j=1/0,t=new m(w),o.c[0]=0;n=p(t,i,0,1),l=s.plus(n.times(f)),l.comparedTo(e)!=1;)s=f,f=l,r=o.plus(n.times(l=r)),o=l,i=t.minus(n.times(l=i)),t=l;return l=p(e.minus(s),f,0,1),o=o.plus(l.times(r)),s=s.plus(l.times(f)),o.s=r.s=h.s,c=c*2,a=p(r,f,c,S).minus(h).abs().comparedTo(p(o,s,c,S).minus(h).abs())<1?[r,f]:[o,s],j=g,a},d.toNumber=function(){return+H(this)},d.toPrecision=function(e,i){return e!=null&&P(e,1,T),ae(this,e,i,2)},d.toString=function(e){var i,s=this,f=s.s,l=s.e;return l===null?f?(i="Infinity",f<0&&(i="-"+i)):i="NaN":(e==null?i=l<=_||l>=q?de(Y(s.c),l):ie(Y(s.c),l,"0"):e===10&&X?(s=L(new m(s),k+l+1,S),i=ie(Y(s.c),s.e,"0")):(P(e,2,W.length,"Base"),i=x(ie(Y(s.c),l,"0"),10,e,f,!0)),f<0&&s.c[0]&&(i="-"+i)),i},d.valueOf=d.toJSON=function(){return H(this)},d._isBigNumber=!0,d[Symbol.toStringTag]="BigNumber",d[Symbol.for("nodejs.util.inspect.custom")]=d.valueOf,u!=null&&m.set(u),m}function K(u){var p=u|0;return u>0||u===p?p:p-1}function Y(u){for(var p,x,E=1,d=u.length,y=u[0]+"";E<d;){for(p=u[E++]+"",x=N-p.length;x--;p="0"+p);y+=p}for(d=y.length;y.charCodeAt(--d)===48;);return y.slice(0,d+1||1)}function le(u,p){var x,E,d=u.c,y=p.c,k=u.s,S=p.s,_=u.e,q=p.e;if(!k||!S)return null;if(x=d&&!d[0],E=y&&!y[0],x||E)return x?E?0:-S:k;if(k!=S)return k;if(x=k<0,E=_==q,!d||!y)return E?0:!d^x?1:-1;if(!E)return _>q^x?1:-1;for(S=(_=d.length)<(q=y.length)?_:q,k=0;k<S;k++)if(d[k]!=y[k])return d[k]>y[k]^x?1:-1;return _==q?0:_>q^x?1:-1}function P(u,p,x,E){if(u<p||u>x||u!==Q(u))throw Error(V+(E||"Argument")+(typeof u=="number"?u<p||u>x?" out of range: ":" not an integer: ":" not a primitive number: ")+String(u))}function ge(u){var p=u.c.length-1;return K(u.e/N)==p&&u.c[p]%2!=0}function de(u,p){return(u.length>1?u.charAt(0)+"."+u.slice(1):u)+(p<0?"e":"e+")+p}function ie(u,p,x){var E,d;if(p<0){for(d=x+".";++p;d+=x);u=d+u}else if(E=u.length,++p>E){for(d=x,p-=E;--p;d+=x);u+=d}else p<E&&(u=u.slice(0,p)+"."+u.slice(p));return u}var fe=Ce();const Xe=[{image:{thumbnail:"./assets/images/image-waffle-thumbnail.jpg",mobile:"./assets/images/image-waffle-mobile.jpg",tablet:"./assets/images/image-waffle-tablet.jpg",desktop:"./assets/images/image-waffle-desktop.jpg"},name:"Waffle with Berries",category:"Waffle",price:6.5},{image:{thumbnail:"./assets/images/image-creme-brulee-thumbnail.jpg",mobile:"./assets/images/image-creme-brulee-mobile.jpg",tablet:"./assets/images/image-creme-brulee-tablet.jpg",desktop:"./assets/images/image-creme-brulee-desktop.jpg"},name:"Vanilla Bean Crème Brûlée",category:"Crème Brûlée",price:7},{image:{thumbnail:"./assets/images/image-macaron-thumbnail.jpg",mobile:"./assets/images/image-macaron-mobile.jpg",tablet:"./assets/images/image-macaron-tablet.jpg",desktop:"./assets/images/image-macaron-desktop.jpg"},name:"Macaron Mix of Five",category:"Macaron",price:8},{image:{thumbnail:"./assets/images/image-tiramisu-thumbnail.jpg",mobile:"./assets/images/image-tiramisu-mobile.jpg",tablet:"./assets/images/image-tiramisu-tablet.jpg",desktop:"./assets/images/image-tiramisu-desktop.jpg"},name:"Classic Tiramisu",category:"Tiramisu",price:5.5},{image:{thumbnail:"./assets/images/image-baklava-thumbnail.jpg",mobile:"./assets/images/image-baklava-mobile.jpg",tablet:"./assets/images/image-baklava-tablet.jpg",desktop:"./assets/images/image-baklava-desktop.jpg"},name:"Pistachio Baklava",category:"Baklava",price:4},{image:{thumbnail:"./assets/images/image-meringue-thumbnail.jpg",mobile:"./assets/images/image-meringue-mobile.jpg",tablet:"./assets/images/image-meringue-tablet.jpg",desktop:"./assets/images/image-meringue-desktop.jpg"},name:"Lemon Meringue Pie",category:"Pie",price:5},{image:{thumbnail:"./assets/images/image-cake-thumbnail.jpg",mobile:"./assets/images/image-cake-mobile.jpg",tablet:"./assets/images/image-cake-tablet.jpg",desktop:"./assets/images/image-cake-desktop.jpg"},name:"Red Velvet Cake",category:"Cake",price:4.5},{image:{thumbnail:"./assets/images/image-brownie-thumbnail.jpg",mobile:"./assets/images/image-brownie-mobile.jpg",tablet:"./assets/images/image-brownie-tablet.jpg",desktop:"./assets/images/image-brownie-desktop.jpg"},name:"Salted Caramel Brownie",category:"Brownie",price:4.5},{image:{thumbnail:"./assets/images/image-panna-cotta-thumbnail.jpg",mobile:"./assets/images/image-panna-cotta-mobile.jpg",tablet:"./assets/images/image-panna-cotta-tablet.jpg",desktop:"./assets/images/image-panna-cotta-desktop.jpg"},name:"Vanilla Panna Cotta",category:"Panna Cotta",price:6.5}],Ye="en-US",Qe="USD",ue=u=>new Intl.NumberFormat(Ye,{style:"currency",currency:Qe}).format(u);function Ke(u){const{bau:p,css:x}=u,{h1:E,h2:d,div:y,p:k,ul:S,li:_,article:q,section:D,span:j,picture:J,button:U,img:B,source:se,strong:W,dialog:X,form:m}=p.tags,ae=x`
    display: grid;
    grid-template-columns: auto auto;
    margin: 3rem;
    @media (max-width: 430px) {
      margin: 0.5rem;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  `,M=p.state([]),ne=p.derive(()=>ue(M.val.reduce((r,{price:n,quantity:a})=>r.plus(fe(n).times(fe(a))),fe(0)).toNumber())),L=p.derive(()=>M.val.reduce((r,{quantity:n})=>r+n,0)),H=r=>()=>{const n=M.val.find(({name:a})=>a==r.name);n?n.quantity++:M.val.push({name:r.name,price:r.price,quantity:1,thumbnail:r.image.thumbnail})},e=r=>()=>{const n=M.val.findIndex(({name:a})=>a==r.name);n>=0&&M.val.splice(n,1)},i=r=>()=>{const n=M.val.findIndex(({name:a})=>a==r.name);if(n>=0){const a=M.val[n];a.quantity<=1?M.val.splice(n,1):a.quantity--}},s=()=>X({id:"confirm-dialog",class:x`
          & p {
            font-size: 0.7rem;
            font-weight: 400;
            color: var(--rose-400);
          }
          & button {
            margin-top: 1rem;
          }
          & ul {
            padding: 1rem;
            background-color: var(--rose-100);
            > li {
              list-style: none;
              display: flex;
              justify-content: space-between;
              gap: 1rem;
              margin: 0.2rem 0;

              > img {
                width: 48px;
                height: 48px;
              }
              > .content {
                flex-grow: 1;
                .name {
                  font-size: 0.8rem;
                  font-weight: 600;
                }
                .quantity {
                  color: var(--red);
                  font-size: 0.9rem;
                  font-weight: 600;
                }
                .price {
                  color: var(--rose-500);
                  font-size: 0.9rem;
                  font-weight: 300;
                }
                .price-total {
                  font-weight: 700;
                }
              }
            }
          }
        `},m(B({src:"./assets/images/icon-order-confirmed.svg",alt:""}),E("Order Confirmed"),k("We hope you enjoy your food!"),p.loop(M,S(),r=>_(B({src:r.thumbnail}),y({class:"content"},y({class:"name"},r.name),j({class:"quantity"},r.quantity,"x"),j({class:"price"},ue(r.price))),y({class:"price-total"},ue(fe(r.price).times(r.quantity).toNumber())))),U({type:"submit",onclick:f},"Submit New Order"))),f=()=>{const r=document.getElementById("confirm-dialog");M.val=[],r.close()},l=()=>{document.getElementById("confirm-dialog").showModal()},c=r=>{const{name:n,category:a,price:w,image:h}=r,A=p.derive(()=>M.val.find(({name:b})=>b==r.name)),v=p.derive(()=>!!A.val);return y({class:"item"},J(se({srcset:h.mobile,media:"(max-width:476px)"}),B({class:()=>["item-img",v.val&&"active"],src:h.desktop,alt:"thumbnail"}),g({item:r,hasQuantity:v,cartByItem:A})),y({class:"category"},a),d({class:"name"},n),y({class:"price"},w))},g=({item:r,hasQuantity:n,cartByItem:a})=>{const w=p.derive(()=>{var h;return(h=a==null?void 0:a.val)==null?void 0:h.quantity});return y({class:x`
          display: flex;
          justify-content: center;
          margin-bottom: 0.5rem;
          margin-top: -2rem;

          .quantity-selector {
            background-color: var(--red);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 8rem;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            .quantity {
              font-weight: 600;
            }
            > button {
              background-color: inherit;
              border: none;
              display: flex;
              & img {
                width: 1.25rem;
                height: 1.25rem;
                padding: 0.3rem;
                border-radius: 50%;
                border: 1px solid white;
              }
            }
          }
          .add-to-cart {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            border: none;
            border: 1px solid var(--rose-500);
            text-align: center;
            font-size: 0.875rem;
            font-weight: 600;
            background-color: white;
            border-radius: 2rem;
            padding: 0.5rem 1rem;
            transition: all 0.3s;
            &:hover {
              color: var(--red);
              border-color: var(--red);
            }
            &::before {
              content: url("./assets/images/icon-add-to-cart.svg");
            }
          }
        `},()=>n.val?y({class:"quantity-selector"},U({onclick:i(r),"aria-label":"decrement quantity"},B({src:"./assets/images/icon-decrement-quantity.svg",alt:"remove-from-cart"})),y({class:"quantity"},w),U({onclick:H(r),"aria-label":"increment quantity"},B({src:"./assets/images/icon-increment-quantity.svg",alt:"add-cart"}))):U({class:"add-to-cart",onclick:H(r),"aria-label":"add to cart"},"Add to Cart"))},t=()=>D({class:x`
          & h1 {
            font-size: 2.8rem;
          }
          .item-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0rem;
            justify-content: center;
            .item {
              .item-img {
                width: 251px;
                height: 240px;
                border-radius: 1rem;
                &.active {
                  border: 2px solid var(--red);
                }
              }

              padding: 1rem;
              line-height: 1.6rem;

              .name {
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--rose-900);
              }
              .category {
                font-size: 0.9rem;
                font-weight: 300;
                color: var(--rose-500);
              }
              .price {
                font-size: 1rem;
                font-weight: 600;
                color: var(--red);
              }
            }
          }
        `},E("Dessert"),y({class:"item-container"},Xe.map(c))),o=()=>D({class:x`
          padding: 1rem;
          align-self: start;
          position: sticky;
          top: 0;
          background-color: white;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          & h1 {
            color: var(--red);
          }
          .cart-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            & p {
              font-size: 0.8rem;
              color: var(--rose-500);
              text-align: center;
            }
          }
          .cart-inner {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            & ul {
              > li {
                display: flex;
                align-items: center;
                list-style: none;
                justify-content: space-between;
                .name {
                  font-size: 0.8rem;
                  font-weight: 600;
                }
                .quantity {
                  color: var(--red);
                }
                .price {
                  color: var(--rose-500);
                }
                .price-total {
                  color: var(--rose-500);
                  font-weight: 600;
                }
                > button {
                  border: none;
                  display: flex;
                  padding: 0.5rem;
                  border-radius: 100%;
                  border: 1px solid var(--rose-300);
                  transition: all 0.3s;
                  background-color: white;
                  &:hover {
                    border-color: var(--rose-900);
                  }
                }
              }
            }
          }

          .order-total-container {
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            align-items: center;
            border-top: 1px solid var(--rose-100);
            .order-total-key {
              color: var(--rose-900);
              font-weight: 400;
              font-size: 0.8rem;
            }
            .order-value {
              font-size: 1.2rem;
              color: var(--rose-900);
              font-weight: 700;
            }
          }
          p.carbon-neutral {
            background-color: var(--rose-100);
            padding: 0.7rem;
            font-size: 0.7rem;
            font-weight: 400;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            &::before {
              content: url("./assets/images/icon-carbon-neutral.svg");
            }
          }
        `},E("Your Cart (",L,")"),()=>M.val.length==0&&y({class:"cart-empty"},B({src:"./assets/images/illustration-empty-cart.svg",alt:"","aria-hidden":!0}),k("Your added items will appear here")),y({class:()=>M.val.length==0?"hide":"cart-inner"},p.loop(M,S({}),r=>_(y(y({class:"name"},r.name),y(j({class:"quantity"},r.quantity,"x"),j({class:"price"},ue(r.price)),j({class:"price-total"},"  =",ue(fe(r.price).times(r.quantity).toNumber())))),U({role:"delete",onclick:e(r)},B({src:"./assets/images/icon-remove-item.svg",alt:"delete"})))),y({class:"order-total-container"},j({class:"order-total-key"},"Order Total"),j({class:"order-value"},ne)),k({class:"carbon-neutral"},j("This is a ",W(" carbon-neutral ")," delivery")),U({type:"submit",onclick:l},"Confirm Order")));return()=>q({class:ae},t(),o(),s())}const Je=Ve(),Ze=u=>{const{bau:p}=u,{main:x}=p.tags,E=Ke(u);return function(){return x(E())}},et=Ze(Je);var Ne;(Ne=document.getElementById("app"))==null||Ne.replaceChildren(et());
