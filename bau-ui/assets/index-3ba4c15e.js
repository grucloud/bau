(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();const nt=(e,t)=>({...e,paths:[...t,e.path]}),ge=({paths:e=[],routes:t})=>t.flatMap(({children:a,...n})=>{const o=nt(n,e);return a?[o,...ge({paths:[...e,n.path],routes:a})]:o}),ot=({paths:e})=>{const t=e.map(a=>a instanceof RegExp?a.source:a).map(a=>String.raw`\/${a}`).join("");return new RegExp(`^${t}$`)},rt=({routes:e=[],notFoundRoute:t})=>{const a=ge({routes:e}).map(n=>({...n,regex:ot(n)}));return{resolve:({pathname:n})=>{const o=a.find(({regex:r})=>r.test(n));return o?o.action({match:n.match(o.regex)}):t}}};function st({routes:e,notFoundRoute:t,onLocationChange:a}){const n=rt({routes:e,notFoundRoute:t});return window.addEventListener("popstate",o=>{console.log("popstate",o),o.state!=null&&a({router:n})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(o,r,s)=>{o.apply(r,s),a({router:n})}}),document.addEventListener("click",o=>{const{target:r}=o,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),o.preventDefault())}),a({router:n}),n}const fe=[["neutral",{h:"0%",s:"0%",l:"62%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],lt=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],it=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Q=e=>`var(--color-${e}-darkest)`,ct=e=>`var(--color-${e}-lightest)`,dt=()=>fe.map(([e])=>`
.plain.${e} {
  border: 1px solid transparent;
  color: ${Q(e)};
  background-color: var(--background-color);
}
.outline.${e} {
  border: 1px solid ${Q(e)};
  color: ${Q(e)};
  background-color: var(--background-color);
}
.soft.${e} {
  border: 1px solid transparent;
  color: ${Q(e)};
  background-color: ${ct(e)};
}
.solid.${e} {
  border: 1px solid transparent;
  color: var(--font-color-inverse);
  background-color: ${Q(e)};
}
`).join(`
`),ut=()=>new Array(20).fill("").map((e,t)=>`--color-gray-${t*50}: hsl(0, 0%, ${100-5*t}%);`).join(`
`),ve=({dark:e})=>new Array(20).fill("").map((t,a)=>`--color-emphasis-${a*50}: var(--color-gray-${e?1e3-a*50:a*50});`).join(`
`),mt=([e,{h:t,s:a,l:n}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${a};`,`--color-${e}-l: ${n};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...lt.map(([o,r])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...it.map(([o,r])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function pt({createGlobalStyles:e},{colorPalette:t=fe}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${t.map(([a,n])=>mt([a,n])).join(`
`)}
  ${ut()}
  ${ve({})}
  ${dt()}
  --color-content: hsl(0, 0%, 10%);
  --color-content-inverse: hsl(0, 0%, 95%);
  --color-content-secondary: hsl(0, 0%, 30%);
  --background-color: var(--color-white);
  --background-surface-color: var(--color-content-inverse);
  --global-border-width: 1px;
  --global-radius: 0.4rem;
  --font-color-base: var(--color-content);
  --font-color-disabled: var(--color-emphasis-700);
  --font-color-inverse: var(--color-content-inverse);
  --font-color-secondary: var(--color-content-secondary);
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
  --shadow-m: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
  --font-size-base: 100%;
  --line-height-base: 1.65;
  --link-color: var(--color-primary)
}
:root {
  font-family: var(--font-family);
  color-scheme: var(--color-scheme);
  color: var(--color-content);
  font: var(--font-size-base) / var(--line-height-base) var(--font-family)
}
body {
  margin: 0;
}
`}function ht(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let re=e=>Object.prototype.toString.call(e??0).slice(8,-1),bt=e=>re(e)=="Object",le=e=>re(e)=="Function",te=e=>["Object","Array"].includes(re(e)),ie=Object.getPrototypeOf,ae=e=>Z(e)?e.val:e,Z=e=>e==null?void 0:e.__isState,gt=["splice","push","pop","shift","unshift","sort","reverse"],ee=(e,t)=>{const a=new Array(e.length);for(let n=0;n<e.length;n++)a[n]=t(e[n],n);return a};const O=e=>!Z(e[0])&&bt(e[0])?e:[{},...e];function ft(e){let t=(e==null?void 0:e.window)??window,{document:a}=t,n,o=new Set,r=new Set,s=!1,l,i=f=>a.createElement(f),m=(f,y,x)=>{let k=l;l=y;let A=f(x);return l=k,A},d=()=>{n||(n=window.requestAnimationFrame(()=>{o.forEach(f=>{f.bindings=f.bindings.filter(y=>{var x;return(x=y.element)==null?void 0:x.isConnected}),!f.bindings.length&&!f.computed&&o.delete(f)}),n=void 0}))},c=(f,y,x,k,A,V)=>{var z;if(s){r.add(f);return}for(let _ of f.bindings){let{deps:L,element:N,renderInferred:X,render:R,renderItem:F}=_;if(F&&y)(z=g(N,k,(...U)=>p(F(...U)),x,A,V)[y])==null||z.call();else{let U=X?X({element:N}):R({element:N,renderItem:F})(...L.map(ae));U!==N&&N.replaceWith(_.element=p(U))}}E(f),d()},u=(f,y,x=[])=>({get(k,A,V){var z;if(l==null||l.add(f),A==="_isProxy")return!0;if(!((z=k[A])!=null&&z._isProxy)&&!Z(k[A])&&te(k[A]))k[A]=new Proxy(k[A],u(f,y,[...x,A]));else if(gt.includes(A)){let _=k[A];return(...L)=>{let N=_.apply(k,L);return c(f,A,N,L,y,x),N}}return Reflect.get(k,A,V)},set(k,A,V,z){let _=Reflect.set(k,A,V,z);return c(f,"setItem",_,{prop:A,value:V},y,[...x,A]),_}}),b=(f,y)=>new Proxy(y,u(f,y)),g=(f,y,x,k,A,V)=>{let z=()=>f.replaceChildren(...ee(k,x)),_=L=>f[L]&&f.removeChild(f[L]);return{assign:z,sort:z,reverse:z,setItem:()=>{var N;let L=V[0];(N=f.children[L])==null||N.replaceWith(x(A[L],L))},push:()=>f.append(...ee(y,(L,N)=>x(L,A.length+N))),unshift:()=>f.prepend(...ee(y,x)),pop:()=>_("lastChild"),shift:()=>_("firstChild"),splice:()=>{let[L,N,...X]=y;const{length:R}=f.children;for(let F=L>=0?Math.min(L+N-1,R-1):R-1;F>=(L>=0?L:R+L);F--)f.children[F].remove();if(X.length){let F=X.forEach((U,at)=>x(U,L+at));f.children[L]?f.children[L].after(...F):f.append(...F)}}}},h=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let y=this;return l==null||l.add(y),y.valProxy??(y.valProxy=te(f)?b(y,f):f,y.valProxy)},set val(y){let x=this,k=x.val;te(y)?(x.valProxy=b(x,y),c(x,"assign",y)):y!==k&&(x.valProxy=y,c(x)),x.oldVal=k}}),p=f=>f==null||f===!1?i("span"):f.nodeType?f:a.createTextNode(f),v=(f,y)=>{let x=new Set;return y.val=m(f,x),x},w=f=>{let y=h(),x=v(f,y);y.computed=!0;for(let k of x)k.listeners.push({computed:f,deps:x,state:y});return y},E=f=>{for(let y of[...f.listeners])v(y.computed,y.state)},C=(f,...y)=>{if(y.length){let x=[];for(let k of y.flat(1/0))k!=null&&x.push(Z(k)?H({deps:[k],render:()=>A=>A}):le(k)?P({renderInferred:k}):p(k));f.append(...x)}},$={},I=(f,y)=>f&&(Object.getOwnPropertyDescriptor(f,y)??I(ie(f),y)),S=(f,y,x)=>{var k;return $[f+","+y]??($[f+","+y]=((k=I(x,y))==null?void 0:k.set)??0)},M=(f,y)=>new MutationObserver((x,k)=>{x.filter(A=>A.removedNodes).forEach(A=>[...A.removedNodes].find(V=>V===f&&(y({element:f}),k.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),B=f=>new Proxy(function(x,...k){var _;let[A,...V]=O(k),z=f?a.createElementNS(f,x):i(x);for(let[L,N]of Object.entries(A)){if(L.startsWith("bau"))continue;let X=S(x,L,ie(z))?R=>z[L]=R:R=>z.setAttribute(L,R);N==null||(Z(N)?H({deps:[N],render:()=>()=>(X(N.val),z)}):le(N)&&(!L.startsWith("on")||N.isDerived)?P({renderInferred:()=>(X(N({element:z})),z)}):N.renderProp?H({deps:N.deps,render:()=>()=>(X(N.renderProp({element:z})(...N.deps.map(ae))),z)}):X(N))}return C(z,...V),(_=A.bauCreated)==null||_.call(A,{element:z}),A.bauMounted&&t.requestAnimationFrame(()=>A.bauMounted({element:z})),A.bauUnmounted&&t.requestAnimationFrame(()=>M(z,A.bauUnmounted)),z},{get:(y,x)=>y.bind(void 0,x)}),D=(f,y,x)=>{f.element=p(x);for(let k of y)Z(k)&&(o.add(k),k.bindings.push(f));return f.element},P=({renderInferred:f,element:y})=>{let x=new Set,k=m(f,x,{element:y});return D({renderInferred:f},x,k)},H=({deps:f,element:y,render:x,renderItem:k})=>D({deps:f,render:x,renderItem:k},f,x({element:y,renderItem:k})(...f.map(ae))),G=(f,y,x)=>H({deps:[f],render:({renderItem:k})=>A=>(y.append(...ee(A,k)),y),renderItem:x}),q=f=>{s=!0,f(),s=!1,r.forEach(c),r.clear()};return{tags:B(),tagsNS:B,state:h,bind:H,loop:G,derive:w,stateSet:o,batch:q}}const vt=e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"bau"+a},wt=(e,t,a,n)=>{const o=e.createElement("style");o.id=a,o.append(n),(t??e.head).append(o)},yt=(e,t)=>e.reduce((a,n,o)=>a+n+(t[o]??""),"");function xt(e){let{document:t}=(e==null?void 0:e.window)??window;const a=n=>(o,...r)=>{const s=yt(o,r),l=vt(s);return!t.getElementById(l)&&wt(t,e==null?void 0:e.target,l,n(l,s)),l};return{css:a((n,o)=>`.${n} { ${o} }`),keyframes:a((n,o)=>`@keyframes ${n} { ${o} }`),createGlobalStyles:a((n,o)=>o)}}function kt(e={}){return{bau:ft(),...xt(),tr:t=>t,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function W(e,t){const{bau:a,css:n}=e,o={root:n`
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      outline: none;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: background-color var(--transition-fast);
      &::before {
        background-color: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: calc(50% - 100%);
        left: calc(50% - 100%);
        width: 200%;
        height: 200%;
        transition: opacity var(--transition-fast) linear;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        content: "";
      }
      &:active {
        &::before {
          opacity: 1;
        }
      }
      &:hover {
        &::before {
          opacity: 0.5;
        }
      }
    `,button:n`
      cursor: pointer;
    `,a:n``,disabled:n`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    `};return function(...s){let[{color:l,variant:i="outline",size:m,disabled:d,href:c,...u},...b]=O(s);return(c?a.tags.a:a.tags.button)({...u,class:T(o.root,i,m,l,c?o.a:o.button,d&&o.disabled,t==null?void 0:t.class,u.class),disabled:d,href:c,...!c&&{type:"button"}},b)}}function Ct(e){const{tr:t,bau:a,css:n,config:o}=e,{i:r,header:s,h1:l,div:i,a:m,img:d,b:c,ul:u,li:b}=a.tags,{svg:g,path:h}=a.tagsNS("http://www.w3.org/2000/svg"),p=a.state(!0),v=W(e),w=()=>r({class:n`
          color: var(--font-color-inverse);
        `},g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>i({class:n`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"plain",color:"none",onclick:()=>p.val=!p.val},w()),m({href:`${o.base}/`,class:n`
            text-decoration: none;
            font-size: x-large;
          `},c(t("Bau Story Book")))),C=()=>m({class:n`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:"./github-mark-white.svg",width:30,height:30}));return function(){return s({class:n`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
          height: var(--header-height);
        `},E(),C())}}function Et({tr:e,bau:t,css:a}){const{footer:n,span:o,a:r,ul:s,li:l,p:i}=t.tags;return function(){return n({class:a`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},o("version: 0.40.0"))}}function we(e,t={}){return function({parent:n,animationHide:o,animationShow:r},s){s.style.animation=r;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((i,m)=>{i.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(c=>{n.style.position="relative";const u=c.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=o,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),m.disconnect(),!0}))}).observe(n,{childList:!0,subtree:!0}),s}}const ce="0.3s",ye=({parent:e,grandParent:t})=>a=>{const{children:n,...o}=a,r=structuredClone(o);return r.children=n==null?void 0:n.map(ye({parent:a,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},xe=e=>t=>{var a;if(!e)return t;if(((a=t==null?void 0:t.data)==null?void 0:a.href)==e)return t.children?t:t.parentTree;if(t.children)for(let n=0;n<t.children.length;n++){const o=xe(e)(t.children[n]);if(o)return o}},St=({window:e,subTree:t})=>{var a;return e.location.pathname===((a=t==null?void 0:t.data)==null?void 0:a.href)},Tt=({createGlobalStyles:e,keyframes:t})=>(e`
:root {
  --drill-down-menu-color: var(--font-color-base);
  --drill-down-menu-padding: 0.4rem;
  --drill-down-menu-bg-active: var(--color-emphasis-200);
  --drill-down-menu-bg-hover: var(--color-emphasis-200);
}
`,{hideToLeft:t`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,showFromLeft:t`
   from {
     transform: translateX(-100%);
     opacity: 0;
   }
   to {
     transform: translateX(0%);
     opacity: 1;
   }
  `,hideToRight:t`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `,showFromRight:t`
  from {
    transform: translateX(100%);
    opacity: 0;

  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `});function ke(e,t){const{bau:a,css:n,window:o}=e,{renderHeader:r,renderMenuItem:s}=t,{ul:l,li:i,nav:m,div:d,header:c,a:u}=a.tags,b=we(),{hideToLeft:g,hideToRight:h,showFromRight:p,showFromLeft:v}=Tt(e),w=n`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a,
    span {
      flex-grow: 1;
      text-decoration: none;
      //color: var(--drill-down-menu-color);
      color: inherit;
    }
    & header {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      padding: var(--drill-down-menu-padding);
      transition: background-color var(--transition-slow) ease-in-out;
      &:hover {
        background: var(--drill-down-menu-bg-hover);
      }
      &::before {
        content: "\u2190";
        margin-right: 0.5rem;
      }
    }
    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & .is-active {
        background-color: var(--drill-down-menu-bg-active);
      }
      & li {
        padding: var(--drill-down-menu-padding);
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        transition: background-color var(--transition-slow) ease-in-out;
        &:hover {
          background-color: var(--drill-down-menu-bg-hover);
          cursor: pointer;
        }
      }
    }
  `,E=({variant:C,color:$,size:I,onclickItem:S,onclickBack:M,currentTree:B})=>{const{children:D,parentTree:P,data:H}=B;return d({class:T("drillDownMenu",C,$,I)},P&&c({onclick:M({currentTree:B})},r({data:H,currentTree:B})),D&&l(D.map(G=>i({class:T(G.children&&"has-children",St({window:o,subTree:G})&&"is-active"),onclick:G.children&&S({currentTree:G})},s(G.data)))))};return function($){const{variant:I="plain",color:S="neutral",size:M,tree:B,pathnameState:D=a.state(o.location.pathname),...P}=$,H=({currentTree:y})=>x=>q(x,f,y,!0),G=({currentTree:y})=>x=>q(x,f,y.parentTree,!1),q=(y,x,k,A)=>{x.firstChild.replaceChildren(b({parent:x,animationHide:`${A?g:h} ${ce}`,animationShow:`${A?p:v} ${ce}`},E({variant:I,color:S,size:M,currentTree:k,onclickItem:H,onclickBack:G})))},f=m({class:T(w,t==null?void 0:t.class,P.class)},()=>{console.log("drilldown",D.val);let y=ye({})(B),x=xe(D.val)(y);return x||(console.log("drilldown no sub tree",D.val),x=y),d(E({variant:I,color:S,size:M,currentTree:x,onclickItem:H,onclickBack:G}))});return f}}function Ce(e){const{tr:t,bau:a,css:n,config:o}=e,{div:r,ul:s,li:l,nav:i,a:m,span:d}=a.tags,c={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]},{data:{name:"Pages",href:"/pages"},children:[{data:{name:"Login",href:"/pages/login"}}]}]},g=ke(e,{renderHeader:({currentTree:h,data:p})=>m({href:`${o.base}${h.parentTree.children[0].data.href}`},p.name),renderMenuItem:({name:h,href:p})=>m({href:`${o.base}${p}`,onclick:v=>{}},h)});return function(){console.log("NavBarMenu");const p=a.state(window.location.pathname.replace(o.base,""));return console.log("window.location.pathname",window.location.pathname),r({class:n`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},g({tree:c,pathnameState:p}))}}const $t=e=>{const{bau:t,css:a}=e,{div:n}=t.tags,o=Ct(e),r=Ce(e),s=Et(e);return function({componentState:i}){return n({class:a`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-columns: minmax(15%, 200px) minmax(50%, 85%);
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            & nav {
              display: none;
            }
          }
        `},o(),r(),()=>i.val&&i.val({}),s())}};function At(e,t){const{bau:a,css:n}=e,{accordionDefs:o}=t,{div:r,ul:s,li:l,header:i,h3:m,button:d}=a.tags,c=a.state(""),u=h=>p=>{c.val==h?c.val="":c.val=h},b=({element:h,open:p})=>{const v=()=>{h.removeEventListener("transitionend",v)};function w(C){C.addEventListener("transitionend",v),window.requestAnimationFrame(()=>{C.style.height="0px"})}function E(C){C.addEventListener("transitionend",v),C.style.height=C.scrollHeight+"px"}h.scrollHeight!=0&&(p?E(h):w(h))},g=n`
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        margin: 0.2rem;
        overflow: hidden;
        border: 1px solid var(--color-emphasis-200);
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        &:hover {
          border-color: var(--color-emphasis-500);
        }
        & h3 {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
          & button {
            width: 100%;
            border: none;
            background-color: transparent;
            text-align: left;
            font-size: large;
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
          &::after {
            content: "\u203A";
            transform: rotate(90deg);
          }
        }
        & .content {
          height: 0px;
          will-change: height;
          transition: height var(--transition-fast) ease-out;
        }
      }
    }
  `;return function(...p){let[{color:v,variant:w="outline",size:E,content:C,...$},...I]=O(p);const S=M=>{const{Header:B,Content:D,name:P}=M;return l({class:T(v,w,E),onclick:u(P)},m({class:()=>T(c.val==P&&"active")},d({type:"button","aria-controls":`bau-${P}`,"aria-expanded":({element:H})=>c.val==P},B(M))),r({class:"content",role:"region",id:`bau-${P}`,"data-state":({element:H})=>{const G=c.val==P;return b({element:H,open:G}),G}},D(M)))};return r({class:T("accordion",g,t==null?void 0:t.class,$.class)},s(o.map(S)))}}const Y=["neutral","primary","success","danger","warning"],Bt=["plain","outline","solid"],j=e=>{const{bau:t,css:a}=e,{div:n,table:o,tbody:r,tr:s,td:l,thead:i,th:m}=t.tags;return function({Item:c}){return n({class:a`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},o(i(s(m("Variant/Color"),Y.map(u=>m(u)))),r(Bt.map(u=>s(m(u),Y.map((b,g)=>l(c({color:b,variant:u},{index:g}))))))))}},Ee=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,p:i}=a.tags,m=j(e),d=(...b)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),u=At(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>r(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>r(i("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>r(i("Item 3 content"))}]});return()=>o({id:"accordion"},l(t("Accordion")),s("Basic Accordion"),d(u({})),s("Accordion Table"),m({Item:b=>u({...b})}),s("Accordion width: fit-content"),d(u({color:"warning",class:n`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),d(u({color:"success",variant:"outline",class:n`
            &.accordion {
              & ul {
                & li {
                  & header {
                    &::after {
                      content: "\u002B";
                    }
                  }
                  & header.active {
                    &::after {
                      transform: rotate(45deg);
                    }
                  }
                }
              }
            }
          `})))},Mt={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},It=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`};function oe(e,t){const{bau:a,css:n,createGlobalStyles:o}=e,{div:r}=a.tags;It({css:n,createGlobalStyles:o});const s=n`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 1rem;
      font-size: 2.5rem;
    }
    & .content {
      padding: 0 0.5rem;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
    }
    & .button-close {
      margin: 1rem;
    }
  `,l=W(e),i=({onclick:m})=>l({"aria-label":"Close",onclick:m,class:"button-close"},"✖");return function(d,...c){const{variant:u="outline",color:b="neutral",size:g,onRemove:h,...p}=d;return r({...p,class:T(`alert-${u}`,u,b,g,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},r({class:"icon"},Mt[b]),r({class:"content"},...c),h&&i({onclick:h}))}}const Se=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,h4:i,p:m}=a.tags,d=j(e),c=oe(e),u=oe(e,{class:n`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>o({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),r(c({color:"danger"},i("Something went wrong"),m("Error code ",404),m("Status ","Not Found"))),s("Custom Alert"),r(u({color:"warning"},i("My message"))),s("Alert Table"),d({Item:b=>c({...b},`Alert ${b.color}`)}))},Dt=(e,t={})=>{const{bau:a,css:n,keyframes:o}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:l}=a.tags,i=a.state([]),m={inserting:o`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:o`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:n`
      min-width: 300px;
      max-width: 90% vw;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:n`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      animation: ${m.inserting} var(--transition-slow) ease-out;
    `,itemOut:n`
      animation: ${m.removing} var(--transition-slow) ease-out;
    `},c=({id:u,status:b})=>{const g=i.val.findIndex(h=>h.id===u);g!=-1&&(i.val[g].status=b)};return function(b={},...g){const h=({id:w})=>{c({id:w,status:"removing"});const E=i.val.findIndex(C=>C.id===w);E!=-1&&i.val.splice(E,1)},p=({Component:w})=>{const E={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};i.val.length>=r&&h({id:i.val[0].id}),i.val.push(E),setTimeout(()=>h(E),s)},v=w=>l({class:d.item,onclick:()=>h(w)},w.Component());return document.addEventListener("alert.add",w=>p(w.detail)),document.addEventListener("alert.remove",w=>h(w.detail)),l({class:T(d.stack,t==null?void 0:t.class,b.class)},a.loop(i,l(),v))}},Te=e=>{const{tr:t,bau:a}=e,{section:n,h1:o}=a.tags,r=Dt(e,{deleteAfterDuration:2e4}),s=W(e),l=oe(e);return function(){return n({id:"alert-stack"},r(),o("Alert stack"),s({color:"success",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Pt=({keyframes:e})=>({hideRight:e`
   from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
  `,showRight:e`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `}),$e=e=>{const{bau:t}=e,{section:a,div:n,h1:o}=t.tags,r=we(),s=W(e),l=Pt(e);return function(){const i=t.state(!0),m=n(),d=c=>{m.replaceChildren(r({parent:m,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},n(c.val?"Ciao":"")))};return d(i),a({id:"animate"},n(o("Test Animate"),n(s({onclick:()=>{i.val=!i.val,d(i)}},()=>i.val?"Hide":"Show")),m))}};function Lt(e,t){const{bau:a}=e,{span:n,img:o}=a.tags,r=a.state(!0),s=a.state(!1),l=()=>r.val=!1,i=m=>{r.val=!1,s.val=!0};return function(...d){let[{color:c,variant:u="outline",size:b,width:g=60,height:h=60,...p},...v]=O(d);return n({class:T(t==null?void 0:t.class,p.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",o({width:g,height:h,onload:l,onerror:i,class:T(t==null?void 0:t.class,c,u,b,p.class),...p}))}}const Ae=e=>{const{tr:t,bau:a,css:n}=e,{section:o,h2:r,h3:s}=a.tags,l=n`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=j(e),m=Lt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>o({id:"avatar"},r(t("Avatar")),m({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),m({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),m({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),i({Item:d=>m({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function se(e,t){const{bau:a,css:n,window:o}=e,{dialog:r}=a.tags,s=n`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    &::backdrop {
      background: var(--background-color);
    }
    opacity: 0;
  `;return function(...i){let[{contentEl:m,triggerEl:d,onClose:c,...u},...b]=O(i);const g=v=>{p.style.opacity=1,p.showModal();const w=d.getBoundingClientRect(),E=p.getBoundingClientRect();w.x<o.innerWidth/2?p.style.left=w.left+"px":p.style.left=w.right-E.width+"px",w.y<o.innerHeight/2?p.style.top=w.top+w.height+"px":p.style.top=w.top-E.height+"px"},h=v=>{const w=()=>{p.close(),p.removeEventListener("transitionend",w)};p.addEventListener("transitionend",w),p.style.opacity=0},p=r({role:"presentation",class:T("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:v=>v.target===p&&(h(),c==null?void 0:c.call())},m);return p.closeDialog=h,p.openDialog=g,p}}function Nt(e,t){const{bau:a,css:n}=e,{div:o,input:r,ul:s,li:l,i,span:m,button:d}=a.tags,c=se(e),u=n`
    & button {
      cursor: pointer;
      color: var(--font-color-base);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0.7rem 0.5rem;
      min-width: 2rem;
      outline: none;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      color: inherit;
      transition: background-color var(--transition-fast);
      &:hover {
        box-shadow: var(--shadow-s);
        background: var(--color-emphasis-50);
      }
      & label {
        cursor: pointer;
      }
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }

    & label {
      display: block;
    }
    & .content {
      height: fit-content;
      & input {
        min-height: 2rem;
        padding: 0.8rem;
        margin: 0.3rem;
        outline: none;
        font-size: 1rem;
        border-radius: var(--global-radius);
      }
      & ul {
        list-style: none;
        padding: 0;
        margin: 0 0;
        & li {
          padding: 0.5rem;
          cursor: pointer;
          &:hover {
            background-color: var(--color-emphasis-200);
          }
        }
        & li.active {
          background-color: var(--color-emphasis-200);
        }
      }
    }
  `,b=a.state(""),g=a.state(""),h=a.state(!1),p=a.state(0),v=()=>{h.val=!1};return function(...E){let[{variant:C="outline",color:$,size:I,id:S,label:M,placeholder:B,Option:D,options:P,getOptionLabel:H=({label:R})=>R,...G},...q]=O(E);const f=a.state(P),y=()=>{X.openDialog(),h.val=!0,g.val="",f.val=P},x=()=>{X.closeDialog(),h.val=!1,g.val=""},k=R=>{const{value:F}=R.target;g.val=F,F?f.val=P.filter(U=>H(U).match(new RegExp(`${F}`,"i"))):f.val=P},A=R=>{console.log("onclickButton",h.val),h.val?x():y()},V=R=>F=>{b.val=H(R),x()},z=R=>{switch(R.key){case"Escape":x();break;case"ArrowDown":p.val++;break;case"ArrowUp":p.val--;break;case"Enter":b.val=H(f.val[p.val]),g.val="",x();break}},_=d({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,onclick:A,class:T(C,$,I)},()=>!b.val&&a.tags.label(M),b),L=r({id:S,value:g,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:k,onkeydown:z,class:T(C,$,I)}),X=c({id:S,triggerEl:_,contentEl:(()=>o({class:T(C,$,I,"content")},L,()=>s(f.val.map((R,F)=>l({class:()=>T(p.val==F&&"active"),onclick:V(R)},D(R))))))(),onClose:v});return o({...G,class:T("autocomplete",u,t==null?void 0:t.class,G==null?void 0:G.class)},_,X)}}const Be=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,span:i}=a.tags,m=(...g)=>r({class:n`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=j(e),c=Nt(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=g=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>o({id:"autocomplete",class:n``},l(t("Autocomplete")),s("Basic Autocomplete"),m(c({options:u,Option:b,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:g=>c({...g,options:u,Option:b,getOptionLabel:({label:h})=>h,label:"Country",placeholder:"Search countries",id:"country"})}))};function de(e,t){const{bau:a,css:n}=e,{span:o}=a.tags,r=n`
    position: relative;
    & span {
      display: block;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      right: 0;
      font-size: 0.75rem;
      font-weight: 600;
      transform: scale(1) translate(100%, -50%);
      transform-origin: 100% 0%;
      padding: 0.2rem;
      border-radius: 1rem;
      min-width: 1rem;
      height: 1rem;
    }
  `;return function(...l){let[{color:i,variant:m="outline",size:d,content:c,...u},...b]=O(l);return o({...u,class:T("badge",r,t==null?void 0:t.class,u==null?void 0:u.class)},o({class:T(i,m,d)},c),...b)}}const Me=e=>{const{bau:t,css:a}=e,{section:n,div:o,h3:r,h2:s}=t.tags,l=(...c)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),i=j(e),m=de(e),d=de(e,{class:a`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>n({id:"badge"},s("Badge"),r("Basic Badge"),l(m({content:"10"},"☏")),r("Badges Table"),i({Item:(c,{index:u})=>m({...c,content:`${u*100}`},"☏")}),r("Badge custom"),l(d({content:"1"},"☏")))};function zt(e,t){const{bau:a,css:n}=e,{ul:o,li:r,a:s,span:l}=a.tags,i=n`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin-bottom: 0;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "\u3009";
        padding: 0.5rem;
      }
      &:last-child {
        &::after {
          content: "";
        }
      }
      > a,
      span {
        display: flex;
        text-decoration: none;
        border-radius: var(--global-radius);
        padding: 0.5rem;
        &:hover {
          background-color: var(--color-emphasis-100);
        }
      }
    }
  `;return function(...d){let[{color:c,variant:u="outline",size:b,items:g,...h},...p]=O(d);return o({...h,class:T(i,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:v,name:w})=>r((v?s:l)({href:v,class:T(c,u,b)},w))))}}const Ie=e=>{const{tr:t,bau:a}=e,{section:n,h2:o,h3:r}=a.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=j(e),i=zt(e);return()=>n({id:"breadcrumbs"},o(t("Breadcrumbs")),r("Bacis Breadcrumb"),i(s),r("Breadcrumbs Table"),l({Item:m=>i({...m,...s})}))},De=e=>{const{bau:t,css:a}=e,{section:n,p:o,h3:r}=t.tags,s=j(e),l=W(e);return()=>n({id:"button",class:a`
          & button {
            margin: 0.5rem;
          }
        `},r("Button Examples"),s({Item:i=>l({...i},`${i.variant} ${i.color}`)}),r("Full With"),o(l({color:"primary",class:a`
              width: 100%;
            `},"witdh: 100%")),r("Icon"),o(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},Ht=()=>Y.map(e=>`
&.button-group.${e} {
  & button { 
    border-right-color: var(--color-${e});
  }
}
&.button-group.solid.${e} {
  & button { 
    border-right-color: var(--color-emphasis-100);
  }
}
`).join(`
`);function jt(e,t){const{bau:a,css:n}=e,{div:o}=a.tags,r=n`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button {
      border-radius: 0;
      border-right: 1px solid var(--color-emphasis-400);
      color: inherit;
      font-size: inherit;
    }
    & button:last-child {
      border: none;
    }
    &.sm {
      & button {
        font-size: 0.7rem;
      }
    }
    &.md {
      font-size: 1rem;
    }
    &.lg {
      & button {
        font-size: 1.5rem;
        padding: 1rem;
      }
    }
    ${Ht()}
  `;return function(...l){let[{variant:i="outline",size:m="md",color:d,...c},...u]=O(l);return o({...c,class:T("button-group",r,i,d,m,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Pe=e=>{const{tr:t,bau:a}=e,{section:n,h2:o,h3:r}=a.tags,s=j(e),l=W(e),i=jt(e);return()=>n({id:"button-group"},o(t("Button Group Examples")),r("Outline"),i({},l({},"ONE"),l({},"TWO"),l({},"THREE")),r("Button Group Table"),s({Item:m=>i({...m},l({},"ONE"),l({},"TWO"),l({},"THREE"))}))};function ue(e,t){const{bau:a,css:n}=e,{input:o}=a.tags,s=n`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    ${(()=>Y.map(l=>`
&.calendar.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()}
  `;return function(...i){let[{color:m="neutral",variant:d="plain",size:c,...u},...b]=O(i);return o({...u,type:"date",class:T("calendar",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Le=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,label:i}=a.tags,m=j(e),d=(...g)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),c=a.state("2023-08-08"),u=ue(e),b=ue(e,{class:n`
      background-color: lightseagreen !important;
    `});return()=>o({id:"calendar"},l(t("Calendar")),r("Date: ",c),s("Basic Calendar"),d(i({for:"start"},"Start date:",u({id:"start",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar min and max"),d(i("End date:",u({min:"2023-01-01",max:"2023-12-31",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar custom"),d(b({})),s("Calendar Table"),m({Item:g=>u({...g})}))};function Gt(e,t){const{bau:a,css:n}=e,{span:o}=a.tags,r=n`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:i,variant:m="outline",color:d="neutral",onclick:c,...u},...b]=O(l);return o({...u,onclick:c,class:T("chip",r,i,m,d,c&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Ne=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l}=a.tags,i=j(e),m=(...c)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),d=Gt(e);return()=>o({id:"chip"},l(t("Chip")),s("Chip Default"),m(d("My Chip")),s("Chip Clickable"),m(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),i({Item:c=>d({...c},`Chip ${c.color}`)}))};function Ot(e,t={}){const{bau:a,css:n}=e,{input:o}=a.tags,r=n`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--global-radius);
    appearance: none;
    outline: none;
    box-sizing: border-box;
    transition: all var(--transition-fast) ease-in-out;
    box-shadow: var(--shadow-s);
    position: relative;
    &:hover {
      transform: scale(1.05);
    }
    &:disabled {
      border: 2px dashed var(--color-gray-500);
    }
    &:checked::after {
      opacity: 1;
    }
    &::after {
      content: "\u2716";
      position: absolute;
      font-size: 1.2rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
  `;return function(...l){let[{color:i,variant:m="outline",size:d,...c},...u]=O(l);return o({type:"checkbox",required:"required",...c,class:T(r,i,m,d,t==null?void 0:t.class,c==null?void 0:c.class)})}}const ze=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,label:s,h2:l,form:i}=a.tags,m=j(e),d=Ot(e),c=a.state(!1),u=a.state(!1),b=h=>p=>{h.val=!!p.target.checked},g=(...h)=>r({class:n`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...h);return()=>o({id:"checkbox"},i(l(t("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:c,onchange:b(c)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:b(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),m({Item:(h,{index:p})=>d({id:`myCheckbox-${p}`,name:`myCheckbox-${p}`,...h})})))};function Rt(e,t){const{bau:a,css:n}=e,{div:o}=a.tags,r=n`
    position: fixed;
    top: 80px;
    left: 0px;
    z-index: 2;
    & .overlay {
      position: fixed;
      visibility: hidden;
      z-index: -1;
      opacity: 0;
      background-color: var(--background-color);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: opacity var(--transition-fast) ease-out;
    }
    & .overlay-open {
      visibility: visible;
      z-index: 1;
      opacity: 0.5;
    }
    & .content {
      transform: translate(-100%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
    & .content-open {
      transform: translate(0%, 0px);
      z-index: 2;
      position: absolute;
      box-shadow: var(--shadow-m);
      background-color: var(--background-color);
      top: 0;
      left: 0;
      transition: transform var(--transition-fast) ease-out;
    }
  `;return function(...l){let[{color:i,variant:m="outline",size:d,openState:c,...u},...b]=O(l);return o({class:T(r,t==null?void 0:t.class,u.class)},o({class:()=>T("overlay",c.val&&"overlay-open"),onclick:()=>{c.val=!1}}),o({class:()=>T("content",c.val&&"content-open")},b))}}const He=e=>{const{tr:t,bau:a}=e,{section:n,h2:o}=a.tags,r=a.state(!1),s=Rt(e),l=W(e),i=Ce(e);return()=>n({id:"drawer"},o(t("Drawer")),l({onclick:()=>{r.val=!r.val}},"OPEN DRAWER"),s({openState:r},i()))},je=e=>{const{tr:t,bau:a,window:n,config:o}=e,{section:r,a:s,h2:l,h3:i}=a.tags,m=a.state(n.location.pathname.replace(o.base,"")),d=j(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},g=ke(e,{renderMenuItem:({name:h,href:p})=>s({href:p,onclick:v=>{}},h),renderHeader:({currentTree:h,data:p})=>s({href:h.parentTree.children[0].data.href},p.name)});return()=>r({id:"drillDownMenu"},l(t("Drill Down Menu")),g({tree:c,pathnameState:m}),i("Drill Down Table"),d({Item:h=>g({tree:c,...h})}))};function Ft(e,t){const{bau:a,css:n}=e,{div:o,span:r,label:s,input:l}=a.tags,i={base:n`
      display: inline-block;
      > * {
        margin: 1rem 0;
      }
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      & .filename-display {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & label {
        border-radius: var(--global-radius);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          box-shadow: var(--shadow-m);
        }
      }
    `,disabled:n`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(d,...c){const{variant:u="outline",color:b="neutral",size:g,Component:h,disabled:p,...v}=d;return o({class:T(i.base,p&&i.disabled,t==null?void 0:t.class,d.class)},s({class:T(u,b,g)},h({disabled:p}),l({type:"file",disabled:p,...v})),r({class:"filename-display"}))}}const Ge=e=>{const{tr:t,bau:a,css:n}=e,{svg:o,use:r}=a.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:i,h2:m,span:d}=a.tags,c=j(e),u=a.state("No file selected"),b=Ft(e),g=p=>{const v=p.target.files[0];v?u.val=v.name:u.val="No file selected"},h=({disabled:p})=>l({class:T(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,p&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},o({width:100,height:100,fill:"currentColor"},r({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},m(t("FileInput Examples")),i("File Input"),b({Component:h,name:"file",accept:"text/*",onchange:g}),l("File selected: ",u),i("File Input disabled"),b({Component:h,name:"file",accept:"text/*",disabled:!0,onchange:g}),i("File Input Table"),c({Item:p=>b({Component:h,name:"file",accept:"text/*",onchange:g,...p})}))},_t=()=>Y.map(e=>`
&.input.${e} {
  border: 2px solid transparent;
}
&.input.plain.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
}
&.input.outline.${e} {
  border: 1px solid var(--color-${e});
  &:focus {
    border: 2px solid var(--color-${e});
  };
}
&.input.soft.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
} 
&.input.solid.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
  &::placeholder {
    color: var(--color-emphasis-200);
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function Vt(e,t){const{bau:a,css:n}=e,{input:o}=a.tags,r=n`
    display: inline-block;
    font-size: large;
    padding: 1rem;
    height: 2.5rem;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    ${_t()}
  `;return function(l){const{size:i,variant:m="outline",color:d="neutral",name:c,id:u,disabled:b,...g}=l;return o({...g,class:T("input",i,d,m,r,t==null?void 0:t.class,g.class)})}}const Oe=e=>{const{tr:t,bau:a}=e,{section:n,div:o,h3:r,h2:s}=a.tags,l=j(e),i=Vt(e);return()=>n({id:"input"},s(t("Input Examples")),r("Standard"),o(i({id:"my-Input",name:"Label",label:"Label"})),r("Disabled"),o(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),r("Input with error"),o(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),r("Input Table"),l({Item:m=>i({name:"my-input",id:"my-input-with",placeholder:"Enter text",...m})}))};function Xt(e,t){const{bau:a,css:n}=e,{dialog:o}=a.tags,s=n`
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    top: 0;
    left: 0;
    max-height: 90vh;
    max-width: 95vw;
    transition: transform 0.3s ease-out;
    border-radius: 10px;
    min-width: 400px;
    padding: 0px;
    border: 0px;
    & header {
      padding: 1rem;
      font-size: 1.8rem;
      font-weight: 800;
      text-align: center;
    }
    & footer {
      display: flex;
      justify-content: flex-end;
      margin: 0px;
      box-shadow: var(--shadow-s);
      padding: 1rem;
      gap: 1rem;
    }
    & > main {
      margin: 12px;
      flex-grow: 1;
      overflow: scroll;
    }
    ${(()=>Y.map(l=>`
&.modal.plain.${l} {
  color: inherit;
}
&.modal.outline.${l} {
  color: inherit;
}
&.modal.soft.${l} {
  color: inherit;
}
&.modal.solid.${l} {

}
`).join(`
`))()}
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...b]=O(i);return o({class:T("modal",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Re=e=>{const{tr:t,bau:a}=e,{section:n,main:o,h2:r,header:s,footer:l,p:i,div:m}=a.tags,d=j(e),c=W(e),u=Xt(e),b=()=>o(Array(10).fill("").map((p,v)=>i(v+1,". Some text here"))),g=p=>{const v=u({id:"my-dialog",...p},s("Header"),b(),l(c({variant:"outline",onclick:()=>{v.close()}},"Cancel"),c({variant:"solid",onclick:()=>{v.close()}},"OK")));return v},h=g({});return()=>n({id:"modal"},r(t("Modal Examples")),c({variant:"solid",onclick:()=>{h.showModal()}},"OPEN MODAL"),h,r(t("Modal Table")),d({Item:p=>{const v=g(p);return m(c({...p,onclick:()=>{v.showModal()}},"OPEN MODAL"),v)}}))},Fe=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,h1:i,p:m}=a.tags,d=W(e),c=(...$)=>r({class:n`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...$),u=se(e),g=(()=>d({onclick:()=>v.open?v.closeDialog():v.openDialog()},"Click"))(),h=()=>r({},i("My content"),m("My Content")),p=h(),v=u({id:"my-popover-left",triggerEl:g,contentEl:p}),w=d({onclick:()=>C.open?C.closeDialog():C.openDialog()},"Click"),E=h(),C=u({id:"my-popover-left",triggerEl:w,contentEl:E});return()=>o({id:"popover",class:n``},l(t("Popover")),s("Basic Popover"),c(r(g,v),r(w,C)))};function Wt(e,t){const{bau:a,css:n}=e,{div:o,ul:r,li:s,button:l}=a.tags,i=se(e),m=n`
    & button {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      border: none;
      border-radius: var(--global-radius);
      background: transparent;
      font-size: 1rem;
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      color: inherit;
      transition: background-color var(--transition-fast);
      &:hover {
        box-shadow: var(--shadow-s);
        background: var(--color-emphasis-100);
      }
      &:focus {
        box-shadow: var(--shadow-s);
        background: var(--color-emphasis-50);
      }
      & label {
        cursor: pointer;
      }
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    & ul {
      list-style: none;
      padding: 0;
      margin: 0;
      & li {
        border-radius: var(--global-radius);
        padding: 0.5rem;
        cursor: pointer;
        &:hover {
          background-color: var(--color-emphasis-50);
        }
      }
      & li.active {
        background-color: var(--color-emphasis-50);
      }
    }
  `,d=a.state(""),c=a.state(!1),u=a.state(0);return function(...g){let[{color:h="neutral",variant:p="outline",size:v,id:w,label:E,Option:C,options:$,getOptionLabel:I=({label:k})=>k,...S},...M]=O(g);const B=()=>{x.openDialog(),c.val=!0},D=()=>{x.closeDialog(),c.val=!1},P=()=>{c.val=!1},H=k=>{c.val?D():B()},G=k=>A=>{d.val=I(k),D()},q=k=>{switch(k.preventDefault(),k.key){case"Escape":D();break;case"ArrowDown":u.val<$.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=$.length-1:u.val--;break;case"Enter":c.val?(d.val=I($[u.val]),D()):B();break}},f=()=>r($.map((k,A)=>s({class:()=>T(u.val==A&&"active"),onclick:G(k)},C(k)))),y=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":c,onclick:H,class:T(h,p,v)},()=>!d.val&&a.tags.label(E),d),x=i({id:w,triggerEl:y,contentEl:f(),onClose:P});return o({...S,class:T("select",m,t==null?void 0:t.class,S==null?void 0:S.class),onkeydown:q},y,x)}}const _e=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,span:i}=a.tags,m=(...g)=>r({class:n`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=j(e),c=Wt(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=g=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>o({id:"select",class:n``},l(t("Select")),s("Basic Select"),m(c({options:u,Option:b,getOptionLabel:({label:g})=>g,label:"Select a country..."})),l(t("Select Table")),d({Item:g=>r(c({...g,options:u,Option:b,getOptionLabel:({label:h})=>h,label:"Select a country..."}))}))};function ne(e,t){const{bau:a,css:n}=e,{input:o}=a.tags,s=n`
    ${(()=>Y.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...b]=O(i);return o({...u,type:"range",class:T("slider",m,d,c,s,t==null?void 0:t.class,u.class)},...b)}}const Ve=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,p:i,label:m,datalist:d,option:c,br:u}=a.tags,b=a.state(0),g=C=>{b.val=C==null?void 0:C.target.value},h=(...C)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...C),p=j(e),v=ne(e),w=ne(e),E=ne(e);return()=>o({id:"slider"},l(t("Slider")),i("Slider value: ",b),s("Basic Slider"),h(v({oninput:g,name:"slider-simple"})),s(t("Slider Table")),p({Item:C=>v(C)}),s("Slider Min Max: -1000 1000"),h(w({oninput:g,min:-1e3,max:1e3})),s("Slider Step 20"),h(v({oninput:g,step:20,min:-100,max:100})),s("Slider Vertical"),h(r({class:n`
              display: flex;
            `},v({oninput:g,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:n`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(C=>c({value:Number(C),label:C}))))),s("Slider with mark"),h(m({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:g,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(C=>c({value:Number(C),label:C})))))},me={sm:16,md:32,lg:64};function Xe(e,t={}){const{bau:a,css:n}=e,{svg:o,animate:r,animateTransform:s,rect:l}=a.tagsNS("http://www.w3.org/2000/svg");return function({size:m="md",color:d="color-base",variant:c="outline",visibility:u=!0,...b}={}){return o({class:T(n`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,b.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:me[m],height:me[m],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const We=e=>{const{tr:t,bau:a}=e,{section:n,h2:o,h3:r}=a.tags,s=j(e),l=Xe(e);return()=>n({id:"spinner"},o(t("Spinner Examples")),r(t("Spinner Table")),s({Item:i=>l(i)}))},qt=()=>Y.map(e=>`
&.switch.plain.${e} {
  &::after {
    background-color: var(--color-emphasis-100);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.outline.${e} {
  &::after {
    background-color: var(--color-emphasis-100);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.soft.${e} {
  &::after {
    background-color: var(--color-emphasis-100);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.solid.${e} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-100);
  } 
  &:checked {
    background-color: var(--color-${e}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-100);
  }
}
`).join(`
`);function Ut(e,t){const{bau:a,css:n}=e,{input:o}=a.tags,r=n`
    position: relative;
    width: 2.4rem;
    height: 1.4rem;
    border-radius: 0.7rem;
    appearance: none;
    outline: none;
    transition: all var(--transition-fast);
    box-shadow: var(--shadow-m);
    &::after {
      content: "";
      transform: translate(-100%, -50%);
      left: 50%;
      top: 50%;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      box-shadow: var(--shadow-m);
      transition: all var(--transition-fast);
      background-color: var(--color-emphasis-800);
    }
    &:checked::after {
      content: "";
      transform: translate(0%, -50%);
    }
    ${qt()}
  `;return function(...l){let[{color:i="neutral",variant:m="plain",size:d,...c},...u]=O(l);return o({...c,class:T("switch",r,i,m,d,t==null?void 0:t.class,c.class),type:"checkbox",required:"required"},...u)}}const qe=e=>{const{tr:t,bau:a,css:n}=e,{section:o,form:r,label:s,div:l,h2:i}=a.tags,m=j(e),d=Ut(e);return()=>o({id:"switch"},i(t("Switch Examples")),r(l({class:n`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))),i(t("Switch Table")),m({Item:c=>l(d({...c,id:"my-switch"}),d({...c,id:"my-switch-checked",checked:!0}))}))};function pe(e,t){const{bau:a,css:n}=e,{tabDefs:o}=t,{div:r,ul:s,li:l}=a.tags,i=a.state(o),m=a.state(o[0]),d=u=>i.val.find(b=>b.name==u),c={base:n`
      display: flex;
      flex-direction: column;
      & ul {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0;
        list-style: none;
        border-bottom: 2px solid var(--color-emphasis-200);
        & li {
          text-align: center;
          padding: 0.5rem;
          padding-bottom: 0rem;
          color: inherit;
          cursor: pointer;
          font-weight: var(--font-weight-semibold);
          transition: var(--transition-fast) ease-in-out;
          overflow: hidden;
          &:hover {
            color: var(--color-primary-light);
            background-color: var(--color-emphasis-100);
            &::after {
              transform: translateY(0%);
            }
          }
          &::after {
            transition: var(--transition-fast) ease-in-out;
            transform: translateY(400%);
            opacity: 1;
            content: "";
            margin-top: 0.3rem;
            height: 2px;
            width: 100%;
            display: block;
          }
        }
        & .active {
          font-weight: bolder;
          &::after {
            transform: translateY(0%);
          }
        }
        & .disabled {
          cursor: not-allowed;
          font-style: italic;
          color: var(--font-color-disabled);
          transform: none;
          &:hover {
            color: var(--font-color-disabled);
            border: none;
            &::after {
              transform: none;
            }
          }
        }
      }
    `};return function(...b){let[{color:g,variant:h="plain",size:p,...v},...w]=O(b);const E=$=>{const{Header:I,disabled:S,name:M}=$;return l({class:()=>T(m.val.name==M&&"active",S&&"disabled"),onclick:B=>B.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:M},bubbles:!0}))},I($))},C=r({class:T(c.base,h,p,g,t==null?void 0:t.class,v.class)},a.loop(i,s(),E),()=>m.val.Content?m.val.Content({}):"");return C.addEventListener("tab.select",$=>{var M,B;const{tabName:I}=$.detail,S=d(I);S&&((M=m.val.exit)==null||M.call(),m.val=S,(B=S.enter)==null||B.call())},!1),C.addEventListener("tab.add",$=>{var S;const{tab:I}=$.detail;(S=I.enter)==null||S.call(),i.val.push(I)},!1),C.addEventListener("tab.remove",$=>{var S;const I=i.val.findIndex(M=>M.name==$.detail.tabName);I>0&&((S=i.val[I].exit)==null||S.call(),i.val.splice(I,1))},!1),C}}const Ue=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h3:s,h2:l,p:i,i:m}=a.tags,d=j(e),c=W(e),u=(...w)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...w),b=()=>({name:"New Tab",Header:({name:w})=>r(w),Content:()=>r("My Paragraph")}),h=pe(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(i("My tab Disabled"))}]}),v=pe(e,{tabDefs:[{name:"Tab1",Header:()=>r(m({class:n`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>r({class:n`
              > button {
                margin: 10px;
              }
            `},c({onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:b()},bubbles:!0}))},"Add a new Tab"),c({accent:!0,onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),i("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(i("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(i("My Content"))}]});return()=>o({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(h({})),s("Full Witdth"),u(h({class:n`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(h({class:n`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(h({class:n`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(h({class:n`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(h({class:n`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(v({})),l(t("Tabs Table")),d({Item:w=>h(w)}))};function K(e,t){const{bau:a,css:n,createGlobalStyles:o}=e,{div:r}=a.tags;o`
  :root {
    --table-cell-padding: 0.75rem;
    --table-background: transparent;
    --table-stripe-background: rgba(0, 0, 0, 0.03);
    --table-border-width: 1px;
    --table-border-color: var(--color-emphasis-300);
    --table-head-background: inherit;
    --table-head-color: inherit;
    --table-cell-color: inherit;
  }

  table {
    border-collapse: collapse;
    display: table;

    & thead, tr  {
      border-bottom: var(--table-border-width) solid var(--table-border-color);
    }

    & tr {
      background-color: var(--table-background);
    }
    & tr:last-child {
      border-bottom: none
    }
    
    & td, th {
      padding: var(--table-cell-padding);
    }

    & th {
      background-color: var(--table-head-background);
      color: var(--table-head-color);
      font-weight: var(--font-weight-semibold);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

    }

    & td {
      color: var(--table-cell-color);
      font-size: 0.875rem;
    }
  }
`;const s=n`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...i){let[{...m},...d]=O(i);return r({...m,class:T("table-container",s,t==null?void 0:t.class,m==null?void 0:m.class)},...d)}}const Ye=e=>{const{bau:t,css:a}=e,{section:n,div:o,h3:r,h2:s,th:l,td:i,tr:m,table:d,thead:c,tbody:u,caption:b}=t.tags;function g(M,B,D,P,H){return{name:M,calories:B,fat:D,carbs:P,protein:H}}const h=[g("Frozen yoghurt",159,6,24,4),g("Ice cream sandwich",237,9,37,4.3),g("Eclair",262,16,24,6),g("Cupcake",305,3.7,67,4.3),g("Gingerbread",356,16,49,3.9)],p=(...M)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...M),v=({name:M,calories:B})=>m(i(M),i({class:a`
            text-align: right;
          `},B)),w=()=>c(m(l({class:a`
              text-align: left;
            `,title:"Product Name"},"Product Name"),l({class:a`
              text-align: right;
            `,title:"Calories"},"Calories"))),E=K(e,{class:a`
      max-width: 650px;
    `}),C=K(e,{class:a`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),$=K(e,{class:a`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),I=K(e,{class:a`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),S=K(e,{class:a`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>n({id:"table"},s(m("Table")),r("Basic Table"),p(E(d(b("Basic Table"),w(),u(h.map(v))))),r("Dense Table"),p(C(d(b("Dense Table"),w(),u(h.map(v))))),r("Zebra Table"),p($(d(b("Zebra Table"),w(),u(h.map(v))))),r("Caption Bottom"),p(I(d(b("Caption Bottom Table"),w(),u(h.map(v))))),r("Overflow Header"),p(S(d(b("Overflow Header"),w(),u(h.map(v))))))};function Ke(e,t){const{bau:a,css:n}=e,{div:o}=a.tags,r=W(e),s=Xe(e),l=n`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: var(--table-border-width) solid var(--table-border-color);
    gap: 0.5rem;
    padding: 0.4rem 0.2rem;
    & .pages-numbers {
      font-size: smaller;
    }
    &.disabled {
      pointer-events: none;
    }
  `,i=({label:b,icon:g,...h})=>r({variant:"plain","aria-label":b,title:b,...h},g),m=({count:b,totalCount:g,page:h,rowsPerPage:p})=>o({class:"pages-numbers"},Number(h-1)*Number(p)+(b>0?1:0),"-",Math.min(h*p,g)," of ",g),d=({count:b,page:g,rowsPerPage:h})=>o({class:"pages-numbers"},(g-1)*h+(b>0?1:0),"-",g*h),c=b=>b<=1,u=(b,g,h)=>b>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:p=0,page:v=1,rowsPerPage:w=50,onPageChange:E,isLoading:C=!1,disableFirst:$=()=>c(v),disablePrevious:I=()=>c(v),disableNext:S=()=>u(v,p,w),disableLast:M=()=>u(v,p,w),...B},...D]=O(g);const P=Math.max(0,Math.ceil(p/w)),H=E({page:1}),G=E({page:v-1}),q=E({page:v+1}),f=E({page:P});return o({...B,class:T("table-pagination",l,C&&"disabled",t==null?void 0:t.class,B==null?void 0:B.class)},s({class:"spinner",visibility:C,size:"md"}),p>0?m({count:h,totalCount:p,page:v,maxPages:P,rowsPerPage:w}):d({count:h,page:v,maxPages:P,rowsPerPage:w}),o(i({label:"First",icon:"⟪",onclick:H,disabled:$()}),i({label:"Previous",icon:"⟨",onclick:G,disabled:I()}),i({label:"Next",icon:"⟩",onclick:q,disabled:S()}),i({label:"Last",icon:"⟫",onclick:f,disabled:M()})))}}const Yt=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),Kt=e=>{const{bau:t,css:a}=e,{th:n,td:o,tr:r,table:s,thead:l,tbody:i}=t.tags,m=Yt(45),d=({name:w,email:E})=>r(o(w),o(E)),c=()=>l(n({class:a`
            text-align: left;
          `},"Name"),n({class:a`
            text-align: left;
          `},"Email")),u=Ke(e),b=K(e,{class:a`
      max-width: 650px;
    `}),g=t.state(m),h=t.state({count:m.length,totalCount:m.length,page:1,rowsPerPage:10}),p=t.derive(()=>g.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),v=({page:w})=>E=>{h.val.page=w};return()=>b(s(c(),()=>i(p.val.map(d))),()=>u({...h.val,onPageChange:v}))},Zt=e=>{const{bau:t,css:a}=e,{th:n,td:o,tr:r,table:s,thead:l,tbody:i,div:m}=t.tags,d=t.state(!1),c=t.state([]),u=t.state(""),b=t.derive(()=>c.val.length),g=t.state(1),h=t.state(10),p=t.derive(()=>c.val),v=B=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(B).toString()}`,w=({page:B})=>D=>{g.val=B,E(v({page:B,per_page:h.val}))};E(v({page:1,per_page:h.val}));async function E(B){try{d.val=!0;const D=await fetch(B,{});if(D.ok){const P=await D.json();c.val=P;return}throw D}catch(D){u.val=D.message}finally{d.val=!1}}const C=({name:B,description:D,stargazers_count:P})=>r(o(B),o(D),o({class:a`
            text-align: right;
          `},P)),$=()=>l(n({class:a`
            text-align: left;
          `},"Name"),n({class:a`
            text-align: left;
          `},"Description"),n({class:a`
            text-align: right;
          `},"Stars")),I=Ke(e),S=K(e,{class:a`
      min-width: 650px;
    `}),M=({message:B})=>m(B);return()=>S(()=>I({rowsPerPage:h.val,page:g.val,count:b.val,totalCount:-1,isLoading:d.val,onPageChange:w,disableNext:()=>!1}),s($(),()=>u.val&&M({message:u.val}),()=>i(p.val.map(C))))},Ze=e=>{const{bau:t,css:a}=e,{section:n,div:o,h3:r,h2:s,tr:l}=t.tags,i=Kt(e),m=Zt(e),d=(...c)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
          & .table-container {
            width: 100%;
            & table {
              min-width: 500px;
              width: 100%;
              & td,
              th {
                padding: 0.4rem;
              }
            }
          }
        `},...c);return()=>n({id:"pagination"},s(l("Table Pagination")),r("Asynchronous Pagination"),d(m()),r("Simple Pagination"),d(i()))};function he(e,t){const{bau:a,css:n,window:o}=e,{div:r}=a.tags,s=n`
    position: relative;
    display: inline-block;
    & .container {
      & .content {
        box-shadow: var(--shadow-m);
        font-size: smaller;
        border-radius: var(--global-radius);
        padding: 0.3rem;
      }
      white-space: nowrap;
      position: absolute;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease-in-out;
    }
    & .visible.container {
      visibility: visible;
      opacity: 1;
    }
    & .top.container {
      bottom: 100%;
      padding-bottom: 0.3rem;
    }
    & .bottom.container {
      top: 100%;
      padding-top: 0.3rem;
    }
    & .right.container {
      left: 100%;
      padding-left: 0.3rem;
    }
    & .left.container {
      right: 100%;
      padding-right: 0.3rem;
    }
    & .top.start.container {
      left: 0%;
    }
    & .top.centered.container {
      left: 50%;
      transform: translateX(-50%);
    }
    & .top.end.container {
      left: 100%;
      transform: translateX(-100%);
    }
    & .bottom.start.container {
      left: 0%;
    }
    & .bottom.centered.container {
      left: 50%;
      transform: translateX(-50%);
    }
    & .bottom.end.container {
      left: 100%;
      transform: translateX(-100%);
    }
    & .right.start.container {
      top: 0%;
    }
    & .right.centered.container {
      top: 50%;
      transform: translateY(-50%);
    }
    & .right.end.container {
      top: 100%;
      transform: translateY(-100%);
    }
    & .left.start.container {
      top: 0%;
    }
    & .left.centered.container {
      top: 50%;
      transform: translateY(-50%);
    }
    & .left.end.container {
      top: 100%;
      transform: translateY(-100%);
    }
  `;return function(...i){let[{titleEl:m,side:d="bottom-start",color:c="neutral",variant:u="outline",size:b,...g},...h]=O(i);const p=r({class:T("container",...d.split("-"))},r({class:T("content",c,u,b),role:"tooltip"},m)),v=S=>`move-to-${S}`,w=(S,M,B)=>{if(S()){const D=v(M);p.classList.add(D),p.classList.add(M),p.classList.remove(B)}},E=(S,M)=>{const B=v(S);p.classList.contains(B)&&(p.classList.remove(B),p.classList.add(M),p.classList.remove(S))},C=S=>{const M=p.getBoundingClientRect();w(()=>M.x<0,"right","left"),w(()=>M.x+M.width>o.innerWidth,"left","right"),w(()=>M.y<0,"bottom","top"),w(()=>M.bottom>o.innerHeight,"top","bottom"),p.classList.add("visible")},$=S=>{p.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return r({...g,class:T("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:S})=>{S.addEventListener("mouseover",C),S.addEventListener("mouseout",$)},bauUnmounted:({element:S})=>{S.removeEventListener("mouseover",C),S.removeEventListener("mouseout",$)}},...h,p)}}const Je=e=>{const{tr:t,bau:a,css:n}=e,{section:o,div:r,h2:s,em:l,p:i}=a.tags,m=j(e),d=W(e),c=he(e),u=he(e,{class:n`
      .container > .content {
        background-color: lightgreen;
        border: 2px dotted darkgreen;
        font-size: 1.5rem;
      }
      .container.top {
        &::after {
          position: absolute;
          content: " ";
          bottom: 0%;
          left: 20%;
          margin-top: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent var(--color-emphasis-400)
            transparent;
        }
      }
      .container.bottom {
        &::after {
          position: absolute;
          content: " ";
          top: 0%;
          left: 20%;
          margin-left: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--color-emphasis-400) transparent transparent
            transparent;
        }
      }
    `}),b=()=>r({class:n`
          font-size: larger;
        `},i("A ",l("tooltip")," can be any component")),g=()=>[r({class:n`
          display: flex;
          justify-content: space-around;
        `},c({side:"top-start",titleEl:b()},d({},"top-start")),c({side:"top-centered",titleEl:b()},d({},"top-centered")),c({side:"top-end",titleEl:b()},d({},"top-end"))),r({class:n`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-start",titleEl:b()},d({},"left-start")),c({side:"right-start",titleEl:b()},d({},"right-start"))),r({class:n`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-centered",titleEl:b()},d({},"left-centered")),c({side:"right-centered",titleEl:b()},d({},"right-centered"))),r({class:n`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-end",titleEl:b()},d({},"left end")),c({side:"right-end",titleEl:b()},d({},"right end"))),r({class:n`
          display: flex;
          justify-content: space-around;
        `},c({side:"bottom-start",titleEl:b()},d({},"bottom start")),c({side:"bottom-centered",titleEl:b()},d({},"bottom centered")),c({side:"bottom-end",titleEl:b()},d({},"bottom end")))];return()=>o({id:"tooltip"},s(t("Tooltip")),r({class:n`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},g()),s(t("Tooltip moved")),r({class:n`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},g()),s(t("Tooltip custom")),r({class:n`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},u({titleEl:b()},d({},"custom tooltip"))),s(t("Tooltip Table")),m({Item:h=>c({titleEl:b(),...h},d({},`${h.color} ${h.variant}`))}))},Jt="light";function Qt(e,t){const{bau:a,css:n,window:o}=e,{input:r}=a.tags,s=d=>{o.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},i=l();i?s(i):o.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):o.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Jt);const m=n`
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 1px var(--color-gray-200) dotted;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
      //border: 1px var(--color-primary) dotted;
      &::after {
        // color: var(--color-primary);
      }
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
      //color: var(--color-emphasis-400);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
  `;return function(...c){let[{color:u,variant:b="outline",size:g,...h},...p]=O(c);return r({required:"required",title:"Switch Theme",...h,class:T(m,u,b,g,t==null?void 0:t.class,h.class),type:"checkbox",checked:l()=="dark",onclick:v=>{s(v.target.checked?"dark":"light")}},...p)}}const Qe=e=>{const{tr:t,bau:a,css:n}=e,{section:o,form:r,div:s,h2:l}=a.tags,i=j(e),m=Qt(e);return()=>o({id:"theme-switch"},l(t("Theme Switch")),r(s({class:n`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},m({}))),l(t("Theme Switch Table")),i({Item:d=>m(d)}))},ea=({css:e,createGlobalStyles:t})=>(t`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
}
`,{nav:e`
    font-weight: var(--font-weight-semibold);
    overflow-x: hidden;
    display: inline-flex;
    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color var(--transition-fast) ease-in-out;
          &:hover {
            background: var(--color-emphasis-300);
            cursor: pointer;
          }
          &::after {
            transition: transform var(--transition-fast) linear;
            font-size: x-large;
            margin-right: 1rem;
          }
          > a,
          span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--menu-link-padding-vertical)
              var(--menu-link-padding-horizontal);
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `,expanded:e`
      > div {
        &::after {
          content: "\u203A";
          transform: rotate(90deg);
        }
      }
    `,collapsed:e`
      > div {
        &::after {
          content: "\u203A";
        }
      }
    `});function ta(e,t){const{bau:a,css:n,createGlobalStyles:o,window:r}=e,{renderMenuItem:s}=t,{ul:l,li:i,nav:m,div:d}=a.tags,c=ea({css:n,createGlobalStyles:o}),u=({element:p,closeState:v})=>{p.scrollHeight!=0&&(v.val?b(p):g(p))};function b(p){p.style.height=p.scrollHeight+"px";const v=()=>{p.removeEventListener("transitionend",v)};p.addEventListener("transitionend",v),r.requestAnimationFrame(()=>{p.style.height="0px"})}function g(p){const v=()=>{p.removeEventListener("transitionend",v),p.style.height=null};p.addEventListener("transitionend",v),p.style.height=p.scrollHeight+"px"}const h=({depth:p=1,maxDepth:v})=>w=>{const{children:E,expanded:C}=w,$=a.state(!C);return i({class:()=>T(E?$.val?c.collapsed:c.expanded:"")},d({class:n`
              cursor: pointer;
            `,onclick:I=>{E&&($.val=!$.val)}},s(w.data)),E&&p<v&&l({bauMounted:({element:I})=>{$.val&&(I.style.height="0px")},"aria-expanded":({element:I})=>(u({element:I,closeState:$}),!$.val)},E.map(h({depth:p+1,maxDepth:v}))))};return function({tree:v,maxDepth:w=1/0,size:E,variant:C="plain",color:$="neutral",...I}){return m({class:T(c.nav,E,C,$,t==null?void 0:t.class,I.class)},v.children&&l(v.children.map(h({maxDepth:w}))))}}const et=e=>{const{tr:t,bau:a}=e,{section:n,a:o,h2:r,h3:s}=a.tags,l=j(e),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=ta(e,{renderMenuItem:({name:c,href:u})=>o({href:u,onclick:b=>{b.preventDefault()}},c)});return()=>n({id:"treeview"},r(t("Tree View")),s(t("Tree View Default")),d({tree:i}),s(t("Tree View Table")),l({Item:c=>d({...c,tree:i})}))};function be(e){const{tr:t,bau:a,css:n}=e,{div:o,main:r,h1:s,article:l}=a.tags;return function(){return o({class:n`
          grid-area: main;
          display: flex;
        `},l({class:n`
            flex-grow: 1;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Component Examples")),Ee(e)(),Se(e)(),Te(e)(),$e(e)(),Be(e)(),Ae(e)(),Me(e)(),Ie(e)(),De(e)(),Pe(e)(),Le(e)(),ze(e)(),Ne(e)(),He(e)(),je(e)(),Ge(e)(),Oe(e)(),Re(e)(),Fe(e)(),_e(e)(),Ve(e)(),We(e)(),qe(e)(),Ye(e)(),Ze(e)(),Ue(e)(),Je(e)(),Qe(e)(),et(e)()))}}function aa(e,t={}){const{bau:a,css:n}=e,{div:o,span:r,pre:s,h3:l,h4:i}=a.tags;return function(d,...c){return o("Login")}}const na=e=>{const{tr:t,bau:a}=e,{section:n,div:o,h3:r,h2:s}=a.tags,l=aa(e);return()=>n({id:"login"},s(t("Login Examples")),r("Basic"),o(l()))};function oa(e){const{tr:t,bau:a,css:n}=e,{div:o,article:r,h1:s}=a.tags;return function(){return o({class:n`
          grid-area: main;
          display: flex;
        `},r({class:n`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),na(e)()))}}const ra=({context:e})=>[{path:"",action:t=>({title:"Storybook",component:be(e)})},{path:"components",action:()=>({title:"Component",component:be(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ee(e)})},{path:"alert",action:()=>({title:"Alert",component:Se(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Te(e)})},{path:"animate",action:()=>({title:"Animate",component:$e(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Be(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ae(e)})},{path:"badge",action:()=>({title:"Badge",component:Me(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ie(e)})},{path:"button",action:()=>({title:"Button",component:De(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Pe(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Le(e)})},{path:"chip",action:()=>({title:"Chip",component:Ne(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ze(e)})},{path:"drawer",action:()=>({title:"drawer",component:He(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:je(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Ge(e)})},{path:"input",action:()=>({title:"Input",component:Oe(e)})},{path:"modal",action:()=>({title:"Modal",component:Re(e)})},{path:"popover",action:()=>({title:"Popover",component:Fe(e)})},{path:"select",action:()=>({title:"Select",component:_e(e)})},{path:"slider",action:()=>({title:"Slider",component:Ve(e)})},{path:"spinner",action:()=>({title:"Spinner",component:We(e)})},{path:"switch",action:()=>({title:"Switch",component:qe(e)})},{path:"table",action:()=>({title:"Table",component:Ye(e)})},{path:"tablePagination",action:()=>({title:"Table",component:Ze(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Ue(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Je(e)})},{path:"themeSwitch",action:()=>({title:"Tooltip",component:Qe(e)})},{path:"treeView",action:()=>({title:"Tree View",component:et(e)})}]},{path:"pages",action:t=>({title:"Pages",component:oa(e)})}],sa=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),la=({context:e,LayoutDefault:t,config:{base:a=""}})=>{const n=e.bau.state(),o=t({componentState:n});return document.getElementById("app").replaceChildren(o),({router:s})=>{console.log("onLocationChange");const{title:l,component:i,Layout:m=t}=s.resolve({pathname:location.pathname.replace(a,"")});n.val=i,document.title=`${l}`}},ia=e=>{const{createGlobalStyles:t}=e;pt(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"40%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }

  `},ca=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #1b1b1d;
  --background-surface-color: #242526;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${ve({dark:!0})}
}
  `};ht();const tt={title:"Bau",base:"/bau/bau-ui"},J=kt({config:tt});ia(J);ca(J);st({routes:ra({context:J}),onLocationChange:la({context:J,LayoutDefault:$t(J),config:tt}),notFoundRoute:sa(J)});
