(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const Mt=(e,t)=>({...e,paths:[...t,e.path]}),xe=({paths:e=[],routes:t})=>t.flatMap(({children:a,...n})=>{const r=Mt(n,e);return a?[r,...xe({paths:[...e,n.path],routes:a})]:r}),Bt=({paths:e})=>{const t=e.map(a=>a instanceof RegExp?a.source:a).map(a=>String.raw`\/${a}`).join("");return new RegExp(`^${t}$`)},Dt=({routes:e=[],notFoundRoute:t})=>{const a=xe({routes:e}).map(n=>({...n,regex:Bt(n)}));return{resolve:({pathname:n})=>{const r=a.find(({regex:o})=>o.test(n));return r?r.action({match:n.match(r.regex)}):t}}};function Pt({routes:e,notFoundRoute:t,onLocationChange:a}){const n=Dt({routes:e,notFoundRoute:t});return window.addEventListener("popstate",r=>{r.state!=null&&a({router:n})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(r,o,s)=>{r.apply(o,s),a({router:n})}}),document.addEventListener("click",r=>{const{target:o}=r,s=o.getAttribute("href");o.tagName==="A"&&s&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),r.preventDefault())}),a({router:n}),n}const Ce=[["neutral",{h:"0%",s:"0%",l:"62%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],Lt=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Nt=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],te=e=>`var(--color-${e}-darkest)`,zt=e=>`var(--color-${e}-lightest)`,Ht=()=>Ce.map(([e])=>`
.plain.${e} {
  border: 1px solid transparent;
  color: ${te(e)};
  background-color: var(--background-color);
}
.outline.${e} {
  border: 1px solid ${te(e)};
  color: ${te(e)};
  background-color: var(--background-color);
}
.soft.${e} {
  border: 1px solid transparent;
  color: ${te(e)};
  background-color: ${zt(e)};
}
.solid.${e} {
  border: 1px solid transparent;
  color: var(--font-color-inverse);
  background-color: ${te(e)};
}
`).join(`
`),Ot=()=>new Array(20).fill("").map((e,t)=>`--color-gray-${t*50}: hsl(0, 0%, ${100-5*t}%);`).join(`
`),Se=({dark:e})=>new Array(20).fill("").map((t,a)=>`--color-emphasis-${a*50}: var(--color-gray-${e?1e3-a*50:a*50});`).join(`
`),jt=([e,{h:t,s:a,l:n}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${a};`,`--color-${e}-l: ${n};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Lt.map(([r,o])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),...Nt.map(([r,o])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Gt({createGlobalStyles:e},{colorPalette:t=Ce}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${t.map(([a,n])=>jt([a,n])).join(`
`)}
  ${Ot()}
  ${Se({})}
  ${Ht()}
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
`}function Rt(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let me=e=>Object.prototype.toString.call(e??0).slice(8,-1),Ft=e=>me(e)=="Object",ve=e=>me(e)=="Function",se=e=>["Object","Array"].includes(me(e)),we=Object.getPrototypeOf,le=e=>Q(e)?e.val:e,Q=e=>e==null?void 0:e.__isState,Vt=["splice","push","pop","shift","unshift","sort","reverse"],ae=(e,t)=>{const a=new Array(e.length);for(let n=0;n<e.length;n++)a[n]=t(e[n],n);return a};const F=e=>!Q(e[0])&&Ft(e[0])?e:[{},...e];function _t(e){let t=(e==null?void 0:e.window)??window,{document:a}=t,n,r=new Set,o=new Set,s=!1,l,i=v=>a.createElement(v),p=(v,k,x)=>{let C=l;l=k;let I=v(x);return l=C,I},d=()=>{n||(n=window.requestAnimationFrame(()=>{r.forEach(v=>{v.bindings=v.bindings.filter(k=>{var x;return(x=k.element)==null?void 0:x.isConnected}),!v.bindings.length&&!v.computed&&r.delete(v)}),n=void 0}))},c=(v,k,x,C,I,_)=>{var L;if(s){o.add(v);return}for(let X of v.bindings){let{deps:N,element:O,renderInferred:W,render:R,renderItem:U}=X;if(U&&k)(L=g(O,C,(...K)=>m(U(...K)),x,I,_)[k])==null||L.call();else{let K=W?W({element:O}):R({element:O,renderItem:U})(...N.map(le));K!==O&&O.replaceWith(X.element=m(K))}}E(v),d()},u=(v,k,x=[])=>({get(C,I,_){var L;if(l==null||l.add(v),I==="_isProxy")return!0;if(!((L=C[I])!=null&&L._isProxy)&&!Q(C[I])&&se(C[I]))C[I]=new Proxy(C[I],u(v,k,[...x,I]));else if(Vt.includes(I)){let X=C[I];return(...N)=>{let O=X.apply(C,N);return c(v,I,O,N,k,x),O}}return Reflect.get(C,I,_)},set(C,I,_,L){let X=Reflect.set(C,I,_,L);return c(v,"setItem",X,{prop:I,value:_},k,[...x,I]),X}}),b=(v,k)=>new Proxy(k,u(v,k)),g=(v,k,x,C,I,_)=>{let L=()=>v.replaceChildren(...ae(C,x)),X=N=>v[N]&&v.removeChild(v[N]);return{assign:L,sort:L,reverse:L,setItem:()=>{var O;let N=_[0];(O=v.children[N])==null||O.replaceWith(x(I[N],N))},push:()=>v.append(...ae(k,(N,O)=>x(N,I.length+O))),unshift:()=>v.prepend(...ae(k,x)),pop:()=>X("lastChild"),shift:()=>X("firstChild"),splice:()=>{let[N,O,...W]=k;const{length:R}=v.children;for(let U=N>=0?Math.min(N+O-1,R-1):R-1;U>=(N>=0?N:R+N);U--)v.children[U].remove();if(W.length){let U=W.forEach((K,re)=>x(K,N+re));v.children[N]?v.children[N].after(...U):v.append(...U)}}}},h=v=>({oldVal:v,bindings:[],listeners:[],__isState:!0,get val(){let k=this;return l==null||l.add(k),k.valProxy??(k.valProxy=se(v)?b(k,v):v,k.valProxy)},set val(k){let x=this,C=x.val;se(k)?(x.valProxy=b(x,k),c(x,"assign",k)):k!==C&&(x.valProxy=k,c(x)),x.oldVal=C}}),m=v=>v==null||v===!1?i("span"):v.nodeType?v:a.createTextNode(v),f=(v,k)=>{let x=new Set;return k.val=p(v,x),x},w=v=>{let k=h(),x=f(v,k);k.computed=!0;for(let C of x)C.listeners.push({computed:v,deps:x,state:k});return k},E=v=>{for(let k of[...v.listeners])f(k.computed,k.state)},S=(v,...k)=>{if(k.length){let x=[];for(let C of k.flat(1/0))C!=null&&x.push(Q(C)?H({deps:[C],render:()=>I=>I}):ve(C)?z({renderInferred:C}):m(C));v.append(...x)}},M={},D=(v,k)=>v&&(Object.getOwnPropertyDescriptor(v,k)??D(we(v),k)),T=(v,k,x)=>{var C;return M[v+","+k]??(M[v+","+k]=((C=D(x,k))==null?void 0:C.set)??0)},B=(v,k)=>new MutationObserver((x,C)=>{x.filter(I=>I.removedNodes).forEach(I=>[...I.removedNodes].find(_=>_===v&&(k({element:v}),C.disconnect(),!0)))}).observe(v.parentNode,{childList:!0}),$=v=>new Proxy(function(x,...C){var X;let[I,..._]=F(C),L=v?a.createElementNS(v,x):i(x);for(let[N,O]of Object.entries(I)){if(N.startsWith("bau"))continue;let W=T(x,N,we(L))?R=>L[N]=R:R=>L.setAttribute(N,R);O==null||(Q(O)?H({deps:[O],render:()=>()=>(W(O.val),L)}):ve(O)&&(!N.startsWith("on")||O.isDerived)?z({renderInferred:()=>(W(O({element:L})),L)}):O.renderProp?H({deps:O.deps,render:()=>()=>(W(O.renderProp({element:L})(...O.deps.map(le))),L)}):W(O))}return S(L,..._),(X=I.bauCreated)==null||X.call(I,{element:L}),I.bauMounted&&t.requestAnimationFrame(()=>I.bauMounted({element:L})),I.bauUnmounted&&t.requestAnimationFrame(()=>B(L,I.bauUnmounted)),L},{get:(k,x)=>k.bind(void 0,x)}),P=(v,k,x)=>{v.element=m(x);for(let C of k)Q(C)&&(r.add(C),C.bindings.push(v));return v.element},z=({renderInferred:v,element:k})=>{let x=new Set,C=p(v,x,{element:k});return P({renderInferred:v},x,C)},H=({deps:v,element:k,render:x,renderItem:C})=>P({deps:v,render:x,renderItem:C},v,x({element:k,renderItem:C})(...v.map(le))),V=(v,k,x)=>H({deps:[v],render:({renderItem:C})=>I=>(k.append(...ae(I,C)),k),renderItem:x}),q=v=>{s=!0,v(),s=!1,o.forEach(c),o.clear()};return{tags:$(),tagsNS:$,state:h,bind:H,loop:V,derive:w,stateSet:r,batch:q}}const Xt=e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"bau"+a},Ut=(e,t,a,n)=>{const r=e.createElement("style");r.id=a,r.append(n),(t??e.head).append(r)},Wt=(e,t)=>e.reduce((a,n,r)=>a+n+(t[r]??""),"");function qt(e){let{document:t}=(e==null?void 0:e.window)??window;const a=n=>(r,...o)=>{const s=Wt(r,o),l=Xt(s);return!t.getElementById(l)&&Ut(t,e==null?void 0:e.target,l,n(l,s)),l};return{css:a((n,r)=>`.${n} { ${r} }`),keyframes:a((n,r)=>`@keyframes ${n} { ${r} }`),createGlobalStyles:a((n,r)=>r)}}function Yt({config:e}){const t=_t();return{bau:t,...qt(),tr:a=>a,window,states:{pathname:t.state(window.location.pathname.replace(e.base,""))},config:e}}function A(...e){return e.filter(t=>t).join(" ")}function Y(e,t){const{bau:a,css:n}=e,r={root:n`
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
    `};return function(...s){let[{color:l,variant:i="outline",size:p,disabled:d,href:c,...u},...b]=F(s);return(c?a.tags.a:a.tags.button)({...u,class:A(r.root,i,p,l,c?r.a:r.button,d&&r.disabled,t==null?void 0:t.class,u.class),disabled:d,href:c,...!c&&{type:"button"}},b)}}function Kt(e){const{tr:t,bau:a,css:n,config:r}=e,{i:o,header:s,h1:l,div:i,a:p,img:d,b:c,ul:u,li:b}=a.tags,{svg:g,path:h}=a.tagsNS("http://www.w3.org/2000/svg"),m=a.state(!0),f=Y(e),w=()=>o({class:n`
          color: var(--font-color-inverse);
        `},g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>i({class:n`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"plain",color:"none",onclick:()=>m.val=!m.val},w()),p({href:`${r.base}/`,class:n`
            text-decoration: none;
            font-size: x-large;
          `},c(t("Bau UI Components")))),S=()=>p({class:n`
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
        `},E(),S())}}function Zt({tr:e,bau:t,css:a}){const{footer:n,span:r,a:o,ul:s,li:l,p:i}=t.tags;return function(){return n({class:a`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},r("version: 0.40.0"))}}function Ee(e,t={}){return function({parent:n,animationHide:r,animationShow:o},s){s.style.animation=o;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((i,p)=>{i.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(c=>{n.style.position="relative";const u=c.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=r,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),p.disconnect(),!0}))}).observe(n,{childList:!0,subtree:!0}),s}}const ye="0.3s",Te=({parent:e,grandParent:t})=>a=>{const{children:n,...r}=a,o=structuredClone(r);return o.children=n==null?void 0:n.map(Te({parent:a,grandParent:e})),e&&(e.parentTree=t),o.parentTree=e,o},Ae=e=>t=>{var a;if(!e)return t;if(((a=t==null?void 0:t.data)==null?void 0:a.href)==e)return t.children?t:t.parentTree;if(t.children)for(let n=0;n<t.children.length;n++){const r=Ae(e)(t.children[n]);if(r)return r}},Jt=({createGlobalStyles:e,keyframes:t})=>(e`
:root {
  --drill-down-menu-color: var(--font-color-base);
  --drill-down-menu-padding: 0.4rem;
  --drill-down-menu-bg-active: var(--color-emphasis-100);
  --drill-down-menu-bg-hover: var(--color-emphasis-50);
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
 `});function pe(e,t){const{bau:a,css:n,window:r}=e,o=({subTree:T})=>{var B;return r.location.pathname===((B=T==null?void 0:T.data)==null?void 0:B.href)},{renderHeader:s,renderMenuItem:l,isActive:i=o}=t,{ul:p,li:d,nav:c,div:u,header:b,a:g}=a.tags,h=Ee(),{hideToLeft:m,hideToRight:f,showFromRight:w,showFromLeft:E}=Jt(e),S=n`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a,
    span {
      flex-grow: 1;
      text-decoration: none;
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
  `,M=({variant:T,color:B,size:$,onclickItem:P,onclickBack:z,currentTree:H,pathnameState:V})=>{const{children:q,parentTree:v,data:k}=H;return u({class:A("drillDownMenu",T,B,$)},v&&b({onclick:z({currentTree:H})},s({data:k,currentTree:H})),q&&p(q.map(x=>d({class:()=>A(x.children&&"has-children",i({pathname:V.val,subTree:x})&&"is-active"),onclick:x.children&&P({currentTree:x})},l(x.data)))))},D=({tree:T,pathnameStateInitial:B})=>{let $=Te({})(T),P=Ae(B)($);return P||(P=$),P};return function(B){const{variant:$="plain",color:P="neutral",size:z,tree:H,pathnameState:V=a.state(r.location.pathname),...q}=B,v=V.val,k=({currentTree:_})=>L=>C(L,I,_,!0),x=({currentTree:_})=>L=>C(L,I,_.parentTree,!1),C=(_,L,X,N)=>{L.firstChild.replaceChildren(h({parent:L,animationHide:`${N?m:f} ${ye}`,animationShow:`${N?w:E} ${ye}`},M({variant:$,color:P,size:z,currentTree:X,onclickItem:k,onclickBack:x,pathnameState:V})))},I=c({class:A(S,t==null?void 0:t.class,q.class)},u(M({variant:$,color:P,size:z,currentTree:D({tree:H,pathnameStateInitial:v}),onclickItem:k,onclickBack:x,pathnameState:V})));return I}}const Qt={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function $e(e){const{tr:t,bau:a,css:n,config:r,states:o}=e,{div:s,ul:l,li:i,nav:p,a:d,span:c}=a.tags,h=pe(e,{renderHeader:({currentTree:m,data:f})=>d({href:`${r.base}${m.parentTree.children[0].data.href}`},f.name),renderMenuItem:({name:m,href:f})=>d({href:`${r.base}${f}`},m),isActive:({subTree:m})=>{var f;return window.location.pathname.replace(r.base,"")===((f=m==null?void 0:m.data)==null?void 0:f.href)}});return function(){return s({class:n`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},h({tree:Qt,pathnameState:o.pathname}))}}const ea=e=>{const{bau:t,css:a}=e,{div:n}=t.tags,r=Kt(e),o=$e(e),s=Zt(e);return function({componentState:i}){return n({class:a`
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
        `},r(),o(),()=>i.val&&i.val({}),s())}};function Ie(e,t){const{bau:a,css:n}=e,{accordionDefs:r}=t,{div:o,ul:s,li:l,header:i,h3:p,button:d}=a.tags,c=a.state(""),u=h=>m=>{c.val==h?c.val="":c.val=h},b=({element:h,open:m})=>{const f=()=>{h.removeEventListener("transitionend",f)};function w(S){S.addEventListener("transitionend",f),window.requestAnimationFrame(()=>{S.style.height="0px"})}function E(S){S.addEventListener("transitionend",f),S.style.height=S.scrollHeight+"px"}h.scrollHeight!=0&&(m?E(h):w(h))},g=n`
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
  `;return function(...m){let[{color:f,variant:w="outline",size:E,content:S,...M},...D]=F(m);const T=B=>{const{Header:$,Content:P,name:z}=B;return l({class:A(f,w,E),onclick:u(z)},p({class:()=>A(c.val==z&&"active")},d({type:"button","aria-controls":`bau-${z}`,"aria-expanded":({element:H})=>c.val==z},$(B))),o({class:"content",role:"region",id:`bau-${z}`,"data-state":({element:H})=>{const V=c.val==z;return b({element:H,open:V}),V}},P(B)))};return o({class:A("accordion",g,t==null?void 0:t.class,M.class)},s(r.map(T)))}}const Z=["neutral","primary","success","danger","warning"],ta=["plain","outline","solid"],G=e=>{const{bau:t,css:a}=e,{div:n,table:r,tbody:o,tr:s,td:l,thead:i,th:p}=t.tags;return function({Item:c,name:u}){return n({class:a`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},r(i(s(p(u??"Variant/Color"),Z.map(b=>p(b)))),o(ta.map(b=>s(p(b),Z.map((g,h)=>l(c({color:g,variant:b},{index:h}))))))))}},Me=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,p:i}=a.tags,p=G(e),d=(...b)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),u=Ie(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>o(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(i("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>o(i("Item 3 content"))}]});return()=>r({id:"accordion"},l(t("Accordion")),s("Basic Accordion"),d(u({})),s("Accordion Table"),p({Item:b=>u({...b})}),s("Accordion width: fit-content"),d(u({color:"warning",class:n`
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
          `})))},aa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},na=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`};function oe(e,t){const{bau:a,css:n,createGlobalStyles:r}=e,{div:o}=a.tags;na({css:n,createGlobalStyles:r});const s=n`
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
  `,l=Y(e),i=({onclick:p})=>l({"aria-label":"Close",onclick:p,class:"button-close"},"✖");return function(d,...c){const{variant:u="outline",color:b="neutral",size:g,onRemove:h,...m}=d;return o({...m,class:A(`alert-${u}`,u,b,g,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},o({class:"icon"},aa[b]),o({class:"content"},...c),h&&i({onclick:h}))}}const Be=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,h4:i,p}=a.tags,d=G(e),c=oe(e),u=oe(e,{class:n`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>r({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),o(c({color:"danger"},i("Something went wrong"),p("Error code ",404),p("Status ","Not Found"))),s("Custom Alert"),o(u({color:"warning"},i("My message"))),s("Alert Table"),d({Item:b=>c({...b},`Alert ${b.color}`)}))},oa=(e,t={})=>{const{bau:a,css:n,keyframes:r}=e,{limit:o=10,deleteAfterDuration:s=15e3}=t,{div:l}=a.tags,i=a.state([]),p={inserting:r`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:r`
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
      animation: ${p.inserting} var(--transition-slow) ease-out;
    `,itemOut:n`
      animation: ${p.removing} var(--transition-slow) ease-out;
    `},c=({id:u,status:b})=>{const g=i.val.findIndex(h=>h.id===u);g!=-1&&(i.val[g].status=b)};return function(b={},...g){const h=({id:w})=>{c({id:w,status:"removing"});const E=i.val.findIndex(S=>S.id===w);E!=-1&&i.val.splice(E,1)},m=({Component:w})=>{const E={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};i.val.length>=o&&h({id:i.val[0].id}),i.val.push(E),setTimeout(()=>h(E),s)},f=w=>l({class:d.item,onclick:()=>h(w)},w.Component());return document.addEventListener("alert.add",w=>m(w.detail)),document.addEventListener("alert.remove",w=>h(w.detail)),l({class:A(d.stack,t==null?void 0:t.class,b.class)},a.loop(i,l(),f))}},De=e=>{const{tr:t,bau:a}=e,{section:n,h1:r}=a.tags,o=oa(e,{deleteAfterDuration:2e4}),s=Y(e),l=oe(e);return function(){return n({id:"alert-stack"},o(),r("Alert stack"),s({color:"success",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},ra=({keyframes:e})=>({hideRight:e`
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
 `}),Pe=e=>{const{bau:t}=e,{section:a,div:n,h1:r}=t.tags,o=Ee(),s=Y(e),l=ra(e);return function(){const i=t.state(!0),p=n(),d=c=>{p.replaceChildren(o({parent:p,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},n(c.val?"Ciao":"")))};return d(i),a({id:"animate"},n(r("Test Animate"),n(s({onclick:()=>{i.val=!i.val,d(i)}},()=>i.val?"Hide":"Show")),p))}};function Le(e,t){const{bau:a}=e,{span:n,img:r}=a.tags,o=a.state(!0),s=a.state(!1),l=()=>o.val=!1,i=p=>{o.val=!1,s.val=!0};return function(...d){let[{color:c,variant:u="outline",size:b,width:g=60,height:h=60,...m},...f]=F(d);return n({class:A(t==null?void 0:t.class,m.class)},()=>o.val?"Loading...":"",()=>s.val&&"Error",r({width:g,height:h,onload:l,onerror:i,class:A(t==null?void 0:t.class,c,u,b,m.class),...m}))}}const Ne=e=>{const{tr:t,bau:a,css:n}=e,{section:r,h2:o,h3:s}=a.tags,l=n`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=G(e),p=Le(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>r({id:"avatar"},o(t("Avatar")),p({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),p({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),p({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),i({Item:d=>p({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function he(e,t){const{bau:a,css:n,window:r}=e,{dialog:o}=a.tags,s=n`
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
  `;return function(...i){let[{contentEl:p,triggerEl:d,onClose:c,...u},...b]=F(i);const g=f=>{m.style.opacity=1,m.showModal();const w=d.getBoundingClientRect(),E=m.getBoundingClientRect();w.x<r.innerWidth/2?m.style.left=w.left+"px":m.style.left=w.right-E.width+"px",w.y<r.innerHeight/2?m.style.top=w.top+w.height+"px":m.style.top=w.top-E.height+"px"},h=f=>{const w=()=>{m.close(),m.removeEventListener("transitionend",w)};m.addEventListener("transitionend",w),m.style.opacity=0},m=o({role:"presentation",class:A("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:f=>f.target===m&&(h(),c==null?void 0:c.call())},p);return m.closeDialog=h,m.openDialog=g,m}}function ze(e,t){const{bau:a,css:n}=e,{div:r,input:o,ul:s,li:l,i,span:p,button:d}=a.tags,c=he(e),u=n`
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
  `,b=a.state(""),g=a.state(""),h=a.state(!1),m=a.state(0),f=()=>{h.val=!1};return function(...E){let[{variant:S="outline",color:M,size:D,id:T,label:B,placeholder:$,Option:P,options:z,getOptionLabel:H=({label:R})=>R,...V},...q]=F(E);const v=a.state(z),k=()=>{W.openDialog(),h.val=!0,g.val="",v.val=z},x=()=>{W.closeDialog(),h.val=!1,g.val=""},C=R=>{const{value:U}=R.target;g.val=U,U?v.val=z.filter(K=>H(K).match(new RegExp(`${U}`,"i"))):v.val=z},I=R=>{console.log("onclickButton",h.val),h.val?x():k()},_=R=>U=>{b.val=H(R),x()},L=R=>{switch(R.key){case"Escape":x();break;case"ArrowDown":m.val++;break;case"ArrowUp":m.val--;break;case"Enter":b.val=H(v.val[m.val]),g.val="",x();break}},X=d({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,onclick:I,class:A(S,M,D)},()=>!b.val&&a.tags.label(B),b),N=o({id:T,value:g,placeholder:$,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:C,onkeydown:L,class:A(S,M,D)}),W=c({id:T,triggerEl:X,contentEl:(()=>r({class:A(S,M,D,"content")},N,()=>s(v.val.map((R,U)=>l({class:()=>A(m.val==U&&"active"),onclick:_(R)},P(R))))))(),onClose:f});return r({...V,class:A("autocomplete",u,t==null?void 0:t.class,V==null?void 0:V.class)},X,W)}}const He=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,span:i}=a.tags,p=(...g)=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=G(e),c=ze(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=g=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>r({id:"autocomplete",class:n``},l(t("Autocomplete")),s("Basic Autocomplete"),p(c({options:u,Option:b,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:g=>c({...g,options:u,Option:b,getOptionLabel:({label:h})=>h,label:"Country",placeholder:"Search countries",id:"country"})}))};function ie(e,t){const{bau:a,css:n}=e,{span:r}=a.tags,o=n`
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
  `;return function(...l){let[{color:i,variant:p="outline",size:d,content:c,...u},...b]=F(l);return r({...u,class:A("badge",o,t==null?void 0:t.class,u==null?void 0:u.class)},r({class:A(i,p,d)},c),...b)}}const Oe=e=>{const{bau:t,css:a}=e,{section:n,div:r,h3:o,h2:s}=t.tags,l=(...c)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),i=G(e),p=ie(e),d=ie(e,{class:a`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>n({id:"badge"},s("Badge"),o("Basic Badge"),l(p({content:"10"},"☏")),o("Badges Table"),i({Item:(c,{index:u})=>p({...c,content:`${u*100}`},"☏")}),o("Badge custom"),l(d({content:"1"},"☏")))};function je(e,t){const{bau:a,css:n}=e,{ul:r,li:o,a:s,span:l}=a.tags,i=n`
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
  `;return function(...d){let[{color:c,variant:u="outline",size:b,items:g,...h},...m]=F(d);return r({...h,class:A(i,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:f,name:w})=>o((f?s:l)({href:f,class:A(c,u,b)},w))))}}const Ge=e=>{const{tr:t,bau:a}=e,{section:n,h2:r,h3:o}=a.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=G(e),i=je(e);return()=>n({id:"breadcrumbs"},r(t("Breadcrumbs")),o("Bacis Breadcrumb"),i(s),o("Breadcrumbs Table"),l({Item:p=>i({...p,...s})}))},Re=e=>{const{bau:t,css:a}=e,{section:n,p:r,h3:o}=t.tags,s=G(e),l=Y(e);return()=>n({id:"button",class:a`
          & button {
            margin: 0.5rem;
          }
        `},o("Button Examples"),s({Item:i=>l({...i},`${i.variant} ${i.color}`)}),o("Full With"),r(l({color:"primary",class:a`
              width: 100%;
            `},"witdh: 100%")),o("Icon"),r(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},sa=()=>Z.map(e=>`
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
`);function Fe(e,t){const{bau:a,css:n}=e,{div:r}=a.tags,o=n`
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
    ${sa()}
  `;return function(...l){let[{variant:i="outline",size:p="md",color:d,...c},...u]=F(l);return r({...c,class:A("button-group",o,i,d,p,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Ve=e=>{const{tr:t,bau:a}=e,{section:n,h2:r,h3:o}=a.tags,s=G(e),l=Y(e),i=Fe(e);return()=>n({id:"button-group"},r(t("Button Group Examples")),o("Outline"),i({},l({},"ONE"),l({},"TWO"),l({},"THREE")),o("Button Group Table"),s({Item:p=>i({...p},l({},"ONE"),l({},"TWO"),l({},"THREE"))}))};function ce(e,t){const{bau:a,css:n}=e,{input:r}=a.tags,s=n`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    ${(()=>Z.map(l=>`
&.calendar.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()}
  `;return function(...i){let[{color:p="neutral",variant:d="plain",size:c,...u},...b]=F(i);return r({...u,type:"date",class:A("calendar",s,p,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const _e=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,label:i}=a.tags,p=G(e),d=(...g)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),c=a.state("2023-08-08"),u=ce(e),b=ce(e,{class:n`
      background-color: lightseagreen !important;
    `});return()=>r({id:"calendar"},l(t("Calendar")),o("Date: ",c),s("Basic Calendar"),d(i({for:"start"},"Start date:",u({id:"start",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar min and max"),d(i("End date:",u({min:"2023-01-01",max:"2023-12-31",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar custom"),d(b({})),s("Calendar Table"),p({Item:g=>u({...g})}))};function Xe(e,t){const{bau:a,css:n}=e,{span:r}=a.tags,o=n`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:i,variant:p="outline",color:d="neutral",onclick:c,...u},...b]=F(l);return r({...u,onclick:c,class:A("chip",o,i,p,d,c&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Ue=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l}=a.tags,i=G(e),p=(...c)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),d=Xe(e);return()=>r({id:"chip"},l(t("Chip")),s("Chip Default"),p(d("My Chip")),s("Chip Clickable"),p(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),i({Item:c=>d({...c},`Chip ${c.color}`)}))};function We(e,t={}){const{bau:a,css:n}=e,{input:r}=a.tags,o=n`
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
  `;return function(...l){let[{color:i,variant:p="outline",size:d,...c},...u]=F(l);return r({type:"checkbox",required:"required",...c,class:A(o,i,p,d,t==null?void 0:t.class,c==null?void 0:c.class)})}}const qe=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,label:s,h2:l,form:i}=a.tags,p=G(e),d=We(e),c=a.state(!1),u=a.state(!1),b=h=>m=>{h.val=!!m.target.checked},g=(...h)=>o({class:n`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...h);return()=>r({id:"checkbox"},i(l(t("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:c,onchange:b(c)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:b(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),p({Item:(h,{index:m})=>d({id:`myCheckbox-${m}`,name:`myCheckbox-${m}`,...h})})))};function la(e,t){const{bau:a,css:n}=e,{div:r}=a.tags,o=n`
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
  `;return function(...l){let[{color:i,variant:p="outline",size:d,openState:c,...u},...b]=F(l);return r({class:A(o,t==null?void 0:t.class,u.class)},r({class:()=>A("overlay",c.val&&"overlay-open"),onclick:()=>{c.val=!1}}),r({class:()=>A("content",c.val&&"content-open")},b))}}const Ye=e=>{const{tr:t,bau:a}=e,{section:n,h2:r}=a.tags,o=a.state(!1),s=la(e),l=Y(e),i=$e(e);return()=>n({id:"drawer"},r(t("Drawer")),l({onclick:()=>{o.val=!o.val}},"OPEN DRAWER"),s({openState:o},i()))},Ke=e=>{const{tr:t,bau:a,window:n,config:r}=e,{section:o,a:s,h2:l,h3:i}=a.tags,p=a.state(n.location.pathname.replace(r.base,"")),d=G(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},h=pe(e,{renderMenuItem:({name:m,href:f})=>s({href:f},m),renderHeader:({currentTree:m,data:f})=>s({href:m.parentTree.children[0].data.href},f.name),isActive:({subTree:m})=>{var f;return n.location.pathname.replace(r.base,"")===((f=m==null?void 0:m.data)==null?void 0:f.href)}});return()=>o({id:"drillDownMenu"},l(t("Drill Down Menu")),h({tree:c,pathnameState:p}),i("Drill Down Table"),d({Item:m=>h({tree:c,...m})}))};function Ze(e,t){const{bau:a,css:n}=e,{div:r,span:o,label:s,input:l}=a.tags,i={base:n`
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
    `};return function(d,...c){const{variant:u="outline",color:b="neutral",size:g,Component:h,disabled:m,...f}=d;return r({class:A(i.base,m&&i.disabled,t==null?void 0:t.class,d.class)},s({class:A(u,b,g)},h({disabled:m}),l({type:"file",disabled:m,...f})),o({class:"filename-display"}))}}const Je=e=>{const{tr:t,bau:a,css:n}=e,{svg:r,use:o}=a.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:i,h2:p,span:d}=a.tags,c=G(e),u=a.state("No file selected"),b=Ze(e),g=m=>{const f=m.target.files[0];f?u.val=f.name:u.val="No file selected"},h=({disabled:m})=>l({class:A(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,m&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},o({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},p(t("FileInput Examples")),i("File Input"),b({Component:h,name:"file",accept:"text/*",onchange:g}),l("File selected: ",u),i("File Input disabled"),b({Component:h,name:"file",accept:"text/*",disabled:!0,onchange:g}),i("File Input Table"),c({Item:m=>b({Component:h,name:"file",accept:"text/*",onchange:g,...m})}))},ia=()=>Z.map(e=>`
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
`);function Qe(e,t){const{bau:a,css:n}=e,{input:r}=a.tags,o=n`
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
    ${ia()}
  `;return function(l){const{size:i,variant:p="outline",color:d="neutral",name:c,id:u,disabled:b,...g}=l;return r({...g,class:A("input",i,d,p,o,t==null?void 0:t.class,g.class)})}}const et=e=>{const{tr:t,bau:a}=e,{section:n,div:r,h3:o,h2:s}=a.tags,l=G(e),i=Qe(e);return()=>n({id:"input"},s(t("Input Examples")),o("Standard"),r(i({id:"my-Input",name:"Label",label:"Label"})),o("Disabled"),r(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),o("Input with error"),r(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),o("Input Table"),l({Item:p=>i({name:"my-input",id:"my-input-with",placeholder:"Enter text",...p})}))};function tt(e,t){const{bau:a,css:n}=e,{dialog:r}=a.tags,s=n`
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
    ${(()=>Z.map(l=>`
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
  `;return function(...i){let[{color:p="neutral",variant:d="outline",size:c,...u},...b]=F(i);return r({class:A("modal",s,p,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const at=e=>{const{tr:t,bau:a}=e,{section:n,main:r,h2:o,header:s,footer:l,p:i,div:p}=a.tags,d=G(e),c=Y(e),u=tt(e),b=()=>r(Array(10).fill("").map((m,f)=>i(f+1,". Some text here"))),g=m=>{const f=u({id:"my-dialog",...m},s("Header"),b(),l(c({variant:"outline",onclick:()=>{f.close()}},"Cancel"),c({variant:"solid",onclick:()=>{f.close()}},"OK")));return f},h=g({});return()=>n({id:"modal"},o(t("Modal Examples")),c({variant:"solid",onclick:()=>{h.showModal()}},"OPEN MODAL"),h,o(t("Modal Table")),d({Item:m=>{const f=g(m);return p(c({...m,onclick:()=>{f.showModal()}},"OPEN MODAL"),f)}}))},nt=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,h1:i,p}=a.tags,d=Y(e),c=(...M)=>o({class:n`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...M),u=he(e),g=(()=>d({onclick:()=>f.open?f.closeDialog():f.openDialog()},"Click"))(),h=()=>o({},i("My content"),p("My Content")),m=h(),f=u({id:"my-popover-left",triggerEl:g,contentEl:m}),w=d({onclick:()=>S.open?S.closeDialog():S.openDialog()},"Click"),E=h(),S=u({id:"my-popover-left",triggerEl:w,contentEl:E});return()=>r({id:"popover",class:n``},l(t("Popover")),s("Basic Popover"),c(o(g,f),o(w,S)))};function ot(e,t){const{bau:a,css:n}=e,{div:r,ul:o,li:s,button:l}=a.tags,i=he(e),p=n`
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
  `,d=a.state(""),c=a.state(!1),u=a.state(0);return function(...g){let[{color:h="neutral",variant:m="outline",size:f,id:w,label:E,Option:S,options:M,getOptionLabel:D=({label:C})=>C,...T},...B]=F(g);const $=()=>{x.openDialog(),c.val=!0},P=()=>{x.closeDialog(),c.val=!1},z=()=>{c.val=!1},H=C=>{c.val?P():$()},V=C=>I=>{d.val=D(C),P()},q=C=>{switch(C.preventDefault(),C.key){case"Escape":P();break;case"ArrowDown":u.val<M.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=M.length-1:u.val--;break;case"Enter":c.val?(d.val=D(M[u.val]),P()):$();break}},v=()=>o(M.map((C,I)=>s({class:()=>A(u.val==I&&"active"),onclick:V(C)},S(C)))),k=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":c,onclick:H,class:A(h,m,f)},()=>!d.val&&a.tags.label(E),d),x=i({id:w,triggerEl:k,contentEl:v(),onClose:z});return r({...T,class:A("select",p,t==null?void 0:t.class,T==null?void 0:T.class),onkeydown:q},k,x)}}const rt=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,span:i}=a.tags,p=(...g)=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=G(e),c=ot(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=g=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>r({id:"select",class:n``},l(t("Select")),s("Basic Select"),p(c({options:u,Option:b,getOptionLabel:({label:g})=>g,label:"Select a country..."})),l(t("Select Table")),d({Item:g=>o(c({...g,options:u,Option:b,getOptionLabel:({label:h})=>h,label:"Select a country..."}))}))};function ne(e,t){const{bau:a,css:n}=e,{input:r}=a.tags,s=n`
    ${(()=>Z.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...i){let[{color:p="neutral",variant:d="outline",size:c,...u},...b]=F(i);return r({...u,type:"range",class:A("slider",p,d,c,s,t==null?void 0:t.class,u.class)},...b)}}const st=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,p:i,label:p,datalist:d,option:c,br:u}=a.tags,b=a.state(0),g=S=>{b.val=S==null?void 0:S.target.value},h=(...S)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),m=G(e),f=ne(e),w=ne(e),E=ne(e);return()=>r({id:"slider"},l(t("Slider")),i("Slider value: ",b),s("Basic Slider"),h(f({oninput:g,name:"slider-simple"})),s(t("Slider Table")),m({Item:S=>f(S)}),s("Slider Min Max: -1000 1000"),h(w({oninput:g,min:-1e3,max:1e3})),s("Slider Step 20"),h(f({oninput:g,step:20,min:-100,max:100})),s("Slider Vertical"),h(o({class:n`
              display: flex;
            `},f({oninput:g,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:n`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(S=>c({value:Number(S),label:S}))))),s("Slider with mark"),h(p({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:g,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(S=>c({value:Number(S),label:S})))))},ke={sm:16,md:32,lg:64};function be(e,t={}){const{bau:a,css:n}=e,{svg:r,animate:o,animateTransform:s,rect:l}=a.tagsNS("http://www.w3.org/2000/svg");return function({size:p="md",color:d="color-base",variant:c="outline",visibility:u=!0,...b}={}){return r({class:A(n`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,b.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:ke[p],height:ke[p],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},o({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const lt=e=>{const{tr:t,bau:a}=e,{section:n,h2:r,h3:o}=a.tags,s=G(e),l=be(e);return()=>n({id:"spinner"},r(t("Spinner Examples")),o(t("Spinner Table")),s({Item:i=>l(i)}))},ca=()=>Z.map(e=>`
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
`);function it(e,t){const{bau:a,css:n}=e,{input:r}=a.tags,o=n`
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
    ${ca()}
  `;return function(...l){let[{color:i="neutral",variant:p="plain",size:d,...c},...u]=F(l);return r({...c,class:A("switch",o,i,p,d,t==null?void 0:t.class,c.class),type:"checkbox",required:"required"},...u)}}const ct=e=>{const{tr:t,bau:a,css:n}=e,{section:r,form:o,label:s,div:l,h2:i}=a.tags,p=G(e),d=it(e);return()=>r({id:"switch"},i(t("Switch Examples")),o(l({class:n`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))),i(t("Switch Table")),p({Item:c=>l(d({...c,id:"my-switch"}),d({...c,id:"my-switch-checked",checked:!0}))}))};function de(e,t){const{bau:a,css:n}=e,{tabDefs:r}=t,{div:o,ul:s,li:l}=a.tags,i=a.state(r),p=a.state(r[0]),d=u=>i.val.find(b=>b.name==u),c={base:n`
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
    `};return function(...b){let[{color:g,variant:h="plain",size:m,...f},...w]=F(b);const E=M=>{const{Header:D,disabled:T,name:B}=M;return l({class:()=>A(p.val.name==B&&"active",T&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},D(M))},S=o({class:A(c.base,h,m,g,t==null?void 0:t.class,f.class)},a.loop(i,s(),E),()=>p.val.Content?p.val.Content({}):"");return S.addEventListener("tab.select",M=>{var B,$;const{tabName:D}=M.detail,T=d(D);T&&((B=p.val.exit)==null||B.call(),p.val=T,($=T.enter)==null||$.call())},!1),S.addEventListener("tab.add",M=>{var T;const{tab:D}=M.detail;(T=D.enter)==null||T.call(),i.val.push(D)},!1),S.addEventListener("tab.remove",M=>{var T;const D=i.val.findIndex(B=>B.name==M.detail.tabName);D>0&&((T=i.val[D].exit)==null||T.call(),i.val.splice(D,1))},!1),S}}const dt=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h3:s,h2:l,p:i,i:p}=a.tags,d=G(e),c=Y(e),u=(...w)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...w),b=()=>({name:"New Tab",Header:({name:w})=>o(w),Content:()=>o("My Paragraph")}),h=de(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(i("My tab Disabled"))}]}),f=de(e,{tabDefs:[{name:"Tab1",Header:()=>o(p({class:n`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>o({class:n`
              > button {
                margin: 10px;
              }
            `},c({onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:b()},bubbles:!0}))},"Add a new Tab"),c({accent:!0,onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),i("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(i("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(i("My Content"))}]});return()=>r({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(h({})),s("Full Witdth"),u(h({class:n`
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
          `})),s("Add and remove tabs"),u(f({})),l(t("Tabs Table")),d({Item:w=>h(w)}))};function J(e,t){const{bau:a,css:n,createGlobalStyles:r}=e,{div:o}=a.tags;r`
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
  `;return function(...i){let[{...p},...d]=F(i);return o({...p,class:A("table-container",s,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const ut=e=>{const{bau:t,css:a}=e,{section:n,div:r,h3:o,h2:s,th:l,td:i,tr:p,table:d,thead:c,tbody:u,caption:b}=t.tags;function g(B,$,P,z,H){return{name:B,calories:$,fat:P,carbs:z,protein:H}}const h=[g("Frozen yoghurt",159,6,24,4),g("Ice cream sandwich",237,9,37,4.3),g("Eclair",262,16,24,6),g("Cupcake",305,3.7,67,4.3),g("Gingerbread",356,16,49,3.9)],m=(...B)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...B),f=({name:B,calories:$})=>p(i(B),i({class:a`
            text-align: right;
          `},$)),w=()=>c(p(l({class:a`
              text-align: left;
            `,title:"Product Name"},"Product Name"),l({class:a`
              text-align: right;
            `,title:"Calories"},"Calories"))),E=J(e,{class:a`
      max-width: 650px;
    `}),S=J(e,{class:a`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),M=J(e,{class:a`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),D=J(e,{class:a`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),T=J(e,{class:a`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>n({id:"table"},s(p("Table")),o("Basic Table"),m(E(d(b("Basic Table"),w(),u(h.map(f))))),o("Dense Table"),m(S(d(b("Dense Table"),w(),u(h.map(f))))),o("Zebra Table"),m(M(d(b("Zebra Table"),w(),u(h.map(f))))),o("Caption Bottom"),m(D(d(b("Caption Bottom Table"),w(),u(h.map(f))))),o("Overflow Header"),m(T(d(b("Overflow Header"),w(),u(h.map(f))))))};function mt(e,t){const{bau:a,css:n}=e,{div:r}=a.tags,o=Y(e),s=be(e),l=n`
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
  `,i=({label:b,icon:g,...h})=>o({variant:"plain","aria-label":b,title:b,...h},g),p=({count:b,totalCount:g,page:h,rowsPerPage:m})=>r({class:"pages-numbers"},Number(h-1)*Number(m)+(b>0?1:0),"-",Math.min(h*m,g)," of ",g),d=({count:b,page:g,rowsPerPage:h})=>r({class:"pages-numbers"},(g-1)*h+(b>0?1:0),"-",g*h),c=b=>b<=1,u=(b,g,h)=>b>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:m=0,page:f=1,rowsPerPage:w=50,onPageChange:E,isLoading:S=!1,disableFirst:M=()=>c(f),disablePrevious:D=()=>c(f),disableNext:T=()=>u(f,m,w),disableLast:B=()=>u(f,m,w),...$},...P]=F(g);const z=Math.max(0,Math.ceil(m/w)),H=E({page:1}),V=E({page:f-1}),q=E({page:f+1}),v=E({page:z});return r({...$,class:A("table-pagination",l,S&&"disabled",t==null?void 0:t.class,$==null?void 0:$.class)},s({class:"spinner",visibility:S,size:"md"}),m>0?p({count:h,totalCount:m,page:f,maxPages:z,rowsPerPage:w}):d({count:h,page:f,maxPages:z,rowsPerPage:w}),r(i({label:"First",icon:"⟪",onclick:H,disabled:M()}),i({label:"Previous",icon:"⟨",onclick:V,disabled:D()}),i({label:"Next",icon:"⟩",onclick:q,disabled:T()}),i({label:"Last",icon:"⟫",onclick:v,disabled:B()})))}}const da=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),ua=e=>{const{bau:t,css:a}=e,{th:n,td:r,tr:o,table:s,thead:l,tbody:i}=t.tags,p=da(45),d=({name:w,email:E})=>o(r(w),r(E)),c=()=>l(n({class:a`
            text-align: left;
          `},"Name"),n({class:a`
            text-align: left;
          `},"Email")),u=mt(e),b=J(e,{class:a`
      max-width: 650px;
    `}),g=t.state(p),h=t.state({count:p.length,totalCount:p.length,page:1,rowsPerPage:10}),m=t.derive(()=>g.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),f=({page:w})=>E=>{h.val.page=w};return()=>b(s(c(),()=>i(m.val.map(d))),()=>u({...h.val,onPageChange:f}))},ma=e=>{const{bau:t,css:a}=e,{th:n,td:r,tr:o,table:s,thead:l,tbody:i,div:p}=t.tags,d=t.state(!1),c=t.state([]),u=t.state(""),b=t.derive(()=>c.val.length),g=t.state(1),h=t.state(10),m=t.derive(()=>c.val),f=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,w=({page:$})=>P=>{g.val=$,E(f({page:$,per_page:h.val}))};E(f({page:1,per_page:h.val}));async function E($){try{d.val=!0;const P=await fetch($,{});if(P.ok){const z=await P.json();c.val=z;return}throw P}catch(P){u.val=P.message}finally{d.val=!1}}const S=({name:$,description:P,stargazers_count:z})=>o(r($),r(P),r({class:a`
            text-align: right;
          `},z)),M=()=>l(n({class:a`
            text-align: left;
          `},"Name"),n({class:a`
            text-align: left;
          `},"Description"),n({class:a`
            text-align: right;
          `},"Stars")),D=mt(e),T=J(e,{class:a`
      min-width: 650px;
    `}),B=({message:$})=>p($);return()=>T(()=>D({rowsPerPage:h.val,page:g.val,count:b.val,totalCount:-1,isLoading:d.val,onPageChange:w,disableNext:()=>!1}),s(M(),()=>u.val&&B({message:u.val}),()=>i(m.val.map(S))))},pt=e=>{const{bau:t,css:a}=e,{section:n,div:r,h3:o,h2:s,tr:l}=t.tags,i=ua(e),p=ma(e),d=(...c)=>r({class:a`
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
        `},...c);return()=>n({id:"pagination"},s(l("Table Pagination")),o("Asynchronous Pagination"),d(p()),o("Simple Pagination"),d(i()))};function ue(e,t){const{bau:a,css:n,window:r}=e,{div:o}=a.tags,s=n`
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
  `;return function(...i){let[{titleEl:p,side:d="bottom-start",color:c="neutral",variant:u="outline",size:b,...g},...h]=F(i);const m=o({class:A("container",...d.split("-"))},o({class:A("content",c,u,b),role:"tooltip"},p)),f=T=>`move-to-${T}`,w=(T,B,$)=>{if(T()){const P=f(B);m.classList.add(P),m.classList.add(B),m.classList.remove($)}},E=(T,B)=>{const $=f(T);m.classList.contains($)&&(m.classList.remove($),m.classList.add(B),m.classList.remove(T))},S=T=>{const B=m.getBoundingClientRect();w(()=>B.x<0,"right","left"),w(()=>B.x+B.width>r.innerWidth,"left","right"),w(()=>B.y<0,"bottom","top"),w(()=>B.bottom>r.innerHeight,"top","bottom"),m.classList.add("visible")},M=T=>{m.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return o({...g,class:A("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",S),T.addEventListener("mouseout",M)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",S),T.removeEventListener("mouseout",M)}},...h,m)}}const ht=e=>{const{tr:t,bau:a,css:n}=e,{section:r,div:o,h2:s,em:l,p:i}=a.tags,p=G(e),d=Y(e),c=ue(e),u=ue(e,{class:n`
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
    `}),b=()=>o({class:n`
          font-size: larger;
        `},i("A ",l("tooltip")," can be any component")),g=()=>[o({class:n`
          display: flex;
          justify-content: space-around;
        `},c({side:"top-start",titleEl:b()},d({},"top-start")),c({side:"top-centered",titleEl:b()},d({},"top-centered")),c({side:"top-end",titleEl:b()},d({},"top-end"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-start",titleEl:b()},d({},"left-start")),c({side:"right-start",titleEl:b()},d({},"right-start"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-centered",titleEl:b()},d({},"left-centered")),c({side:"right-centered",titleEl:b()},d({},"right-centered"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-end",titleEl:b()},d({},"left end")),c({side:"right-end",titleEl:b()},d({},"right end"))),o({class:n`
          display: flex;
          justify-content: space-around;
        `},c({side:"bottom-start",titleEl:b()},d({},"bottom start")),c({side:"bottom-centered",titleEl:b()},d({},"bottom centered")),c({side:"bottom-end",titleEl:b()},d({},"bottom end")))];return()=>r({id:"tooltip"},s(t("Tooltip")),o({class:n`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},g()),s(t("Tooltip moved")),o({class:n`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},g()),s(t("Tooltip custom")),o({class:n`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},u({titleEl:b()},d({},"custom tooltip"))),s(t("Tooltip Table")),p({Item:h=>c({titleEl:b(),...h},d({},`${h.color} ${h.variant}`))}))},pa="light";function bt(e,t){const{bau:a,css:n,window:r}=e,{input:o}=a.tags,s=d=>{r.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},i=l();i?s(i):r.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(pa);const p=n`
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
  `;return function(...c){let[{color:u,variant:b="outline",size:g,...h},...m]=F(c);return o({required:"required",title:"Switch Theme",...h,class:A(p,u,b,g,t==null?void 0:t.class,h.class),type:"checkbox",checked:l()=="dark",onclick:f=>{s(f.target.checked?"dark":"light")}},...m)}}const gt=e=>{const{tr:t,bau:a,css:n}=e,{section:r,form:o,div:s,h2:l}=a.tags,i=G(e),p=bt(e);return()=>r({id:"theme-switch"},l(t("Theme Switch")),o(s({class:n`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},p({}))),l(t("Theme Switch Table")),i({Item:d=>p(d)}))},ha=({css:e,createGlobalStyles:t})=>(t`
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
    `});function ft(e,t){const{bau:a,css:n,createGlobalStyles:r,window:o}=e,{renderMenuItem:s}=t,{ul:l,li:i,nav:p,div:d}=a.tags,c=ha({css:n,createGlobalStyles:r}),u=({element:m,closeState:f})=>{m.scrollHeight!=0&&(f.val?b(m):g(m))};function b(m){m.style.height=m.scrollHeight+"px";const f=()=>{m.removeEventListener("transitionend",f)};m.addEventListener("transitionend",f),o.requestAnimationFrame(()=>{m.style.height="0px"})}function g(m){const f=()=>{m.removeEventListener("transitionend",f),m.style.height=null};m.addEventListener("transitionend",f),m.style.height=m.scrollHeight+"px"}const h=({depth:m=1,maxDepth:f})=>w=>{const{children:E,expanded:S}=w,M=a.state(!S);return i({class:()=>A(E?M.val?c.collapsed:c.expanded:"")},d({class:n`
              cursor: pointer;
            `,onclick:D=>{E&&(M.val=!M.val)}},s(w.data)),E&&m<f&&l({bauMounted:({element:D})=>{M.val&&(D.style.height="0px")},"aria-expanded":({element:D})=>(u({element:D,closeState:M}),!M.val)},E.map(h({depth:m+1,maxDepth:f}))))};return function({tree:f,maxDepth:w=1/0,size:E,variant:S="plain",color:M="neutral",...D}){return p({class:A(c.nav,E,S,M,t==null?void 0:t.class,D.class)},f.children&&l(f.children.map(h({maxDepth:w}))))}}const vt=e=>{const{tr:t,bau:a}=e,{section:n,a:r,h2:o,h3:s}=a.tags,l=G(e),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=ft(e,{renderMenuItem:({name:c,href:u})=>r({href:u,onclick:b=>{b.preventDefault()}},c)});return()=>n({id:"treeview"},o(t("Tree View")),s(t("Tree View Default")),d({tree:i}),s(t("Tree View Table")),l({Item:c=>d({...c,tree:i})}))};function ba(e){const{tr:t,bau:a,css:n}=e,{div:r,main:o,h1:s,article:l}=a.tags;return function(){return r({class:n`
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
          `},s(t("Component Examples")),Me(e)(),Be(e)(),De(e)(),Pe(e)(),He(e)(),Ne(e)(),Oe(e)(),Ge(e)(),Re(e)(),Ve(e)(),_e(e)(),qe(e)(),Ue(e)(),Ye(e)(),Ke(e)(),Je(e)(),et(e)(),at(e)(),nt(e)(),rt(e)(),st(e)(),lt(e)(),ct(e)(),ut(e)(),pt(e)(),dt(e)(),ht(e)(),gt(e)(),vt(e)()))}}function ga(e,t={}){const{bau:a,css:n}=e,{div:r,span:o,pre:s,h3:l,h4:i}=a.tags;return function(d,...c){return r("Login")}}const fa=e=>{const{tr:t,bau:a}=e,{section:n,div:r,h3:o,h2:s}=a.tags,l=ga(e);return()=>n({id:"login"},s(t("Login Examples")),o("Basic"),r(l()))};function va(e){const{tr:t,bau:a,css:n}=e,{div:r,article:o,h1:s}=a.tags;return function(){return r({class:n`
          grid-area: main;
          display: flex;
        `},o({class:n`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),fa(e)()))}}const wa=e=>{const{bau:t,css:a,config:n}=e,{section:r,div:o,h1:s,span:l,p:i,ul:p,li:d,a:c,main:u,header:b,footer:g}=t.tags,{svg:h,use:m}=t.tagsNS("http://www.w3.org/2000/svg"),f=G(e),E=Ie(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>o(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(i("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>o(i("Item 3 content"))}]}),S=oe(e),M=ze(e),D=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],T=y=>o({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(y.label),l(y.code)),B=Le(e,{class:a`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),$=ie(e),P={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},z=je(e),H=Y(e),V=Fe(e),q=ce(e),v=We(e),k=Xe(e),x={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},L=pe(e,{renderMenuItem:({name:y,href:j})=>c({href:j},y),renderHeader:({currentTree:y,data:j})=>c({href:y.parentTree.children[0].data.href},j.name),isActive:({subTree:y})=>{var j;return window.location.pathname.replace(n.base,"")===((j=y==null?void 0:y.data)==null?void 0:j.href)}}),X=({disabled:y})=>o({class:A(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,y&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},h({width:100,height:100,fill:"currentColor"},m({href:"uploadIcon.svg#Capa_1"})),l("Choose a file to upload")),N=Ze(e),O=Qe(e),W=tt(e),R=()=>u(Array(10).fill("").map((y,j)=>i(j+1,". Some text here"))),U=y=>{const j=W({id:"my-dialog",...y},b("Header"),R(),g(H({variant:"outline",onclick:()=>{j.close()}},"Cancel"),H({variant:"solid",onclick:()=>{j.close()}},"OK")));return j},K=ot(e),re=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],yt=y=>o({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(y.label),l(y.code)),kt=ne(e),xt=be(e),ge=it(e),Ct=de(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(i("My tab Disabled"))}]}),St=bt(e),Et=()=>l("My tooltip"),Tt=ue(e),At={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},$t=ft(e,{renderMenuItem:({name:y,href:j})=>c({href:j,onclick:It=>{It.preventDefault()}},y)}),fe=[{name:"Accordion",Item:y=>E({...y})},{name:"Alert",Item:y=>S({...y},`Alert ${y.color}`)},{name:"Autocomplete",Item:y=>M({...y,options:D,Option:T,getOptionLabel:({label:j})=>j,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:y=>B({...y,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(y,{index:j})=>$({...y,content:`${j*100}`},"☏")},{name:"Breadcrumbs",Item:y=>z({...y,...P})},{name:"Button",Item:y=>H({...y},`${y.variant} ${y.color}`)},{name:"Button Group",Item:y=>V({...y},H({},"ONE"),H({},"TWO"),H({},"THREE"))},{name:"Calendar",Item:y=>q({...y})},{name:"Checkbox",Item:(y,{index:j})=>v({id:`myCheckbox-${j}`,name:`myCheckbox-${j}`,...y})},{name:"Chip",Item:y=>k({...y},`Chip ${y.color}`)},{name:"DrillDown Menu",Item:y=>L({tree:x,...y})},{name:"File Input",Item:y=>N({Component:X,name:"file",accept:"text/*",onchange,...y})},{name:"Input",Item:y=>O({name:"my-input",id:"my-input-with",placeholder:"Enter text",...y})},{name:"Modal",Item:y=>{const j=U(y);return o(H({...y,onclick:()=>{j.showModal()}},"OPEN MODAL"),j)}},{name:"Select",Item:y=>o(K({...y,options:re,Option:yt,getOptionLabel:({label:j})=>j,label:"Select a country..."}))},{name:"Slider",Item:y=>kt(y)},{name:"Spinner",Item:y=>xt(y)},{name:"Switch",Item:y=>o(ge({...y,id:"my-switch"}),ge({...y,id:"my-switch-checked",checked:!0}))},{name:"Tabs",Item:y=>Ct(y)},{name:"Theme Switch",Item:y=>St(y)},{name:"Tooltip",Item:y=>Tt({titleEl:Et(),...y},H({},`${y.color} ${y.variant}`))},{name:"Tree View",Item:y=>$t({...y,tree:At})}];return()=>r(s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),p({class:a`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},fe.map(({name:y})=>d(c({href:`#${y}`},y)))),fe.map(y=>o({id:y.name,class:a`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},f(y))))},ya=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:ba(e)})},{path:"components",action:()=>({title:"Component",component:wa(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Me(e)})},{path:"alert",action:()=>({title:"Alert",component:Be(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:De(e)})},{path:"animate",action:()=>({title:"Animate",component:Pe(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:He(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ne(e)})},{path:"badge",action:()=>({title:"Badge",component:Oe(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ge(e)})},{path:"button",action:()=>({title:"Button",component:Re(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ve(e)})},{path:"calendar",action:()=>({title:"Calendar",component:_e(e)})},{path:"chip",action:()=>({title:"Chip",component:Ue(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:qe(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Ye(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Ke(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Je(e)})},{path:"input",action:()=>({title:"Input",component:et(e)})},{path:"modal",action:()=>({title:"Modal",component:at(e)})},{path:"popover",action:()=>({title:"Popover",component:nt(e)})},{path:"select",action:()=>({title:"Select",component:rt(e)})},{path:"slider",action:()=>({title:"Slider",component:st(e)})},{path:"spinner",action:()=>({title:"Spinner",component:lt(e)})},{path:"switch",action:()=>({title:"Switch",component:ct(e)})},{path:"table",action:()=>({title:"Table",component:ut(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:pt(e)})},{path:"tabs",action:()=>({title:"Tabs",component:dt(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:ht(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:gt(e)})},{path:"treeView",action:()=>({title:"Tree View",component:vt(e)})}]},{path:"pages",action:t=>({title:"Pages",component:va(e)})}],ka=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),xa=({context:e,LayoutDefault:t,config:{base:a=""}})=>{const{window:n,bau:r,states:o}=e,s=r.state(),l=t({componentState:s});return document.getElementById("app").replaceChildren(l),({router:p})=>{const d=n.location.pathname.replace(a,""),{title:c,component:u,Layout:b=t}=p.resolve({pathname:d});o.pathname.val=d,s.val=u,document.title=`${c}`}},Ca=e=>{const{createGlobalStyles:t}=e;Gt(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"40%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }

  `},Sa=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #1b1b1d;
  --background-surface-color: #242526;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${Se({dark:!0})}
}
  `};Rt();const wt={title:"Bau",base:"/bau/bau-ui"},ee=Yt({config:wt});Ca(ee);Sa(ee);Pt({routes:ya({context:ee}),onLocationChange:xa({context:ee,LayoutDefault:ea(ee),config:wt}),notFoundRoute:ka(ee)});
