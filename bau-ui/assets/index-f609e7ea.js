(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const nt=(e,t)=>({...e,paths:[...t,e.path]}),ge=({paths:e=[],routes:t})=>t.flatMap(({children:n,...a})=>{const o=nt(a,e);return n?[o,...ge({paths:[...e,a.path],routes:n})]:o}),ot=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},rt=({routes:e=[],notFoundRoute:t})=>{const n=ge({routes:e}).map(a=>({...a,regex:ot(a)}));return{resolve:({pathname:a})=>{const o=n.find(({regex:r})=>r.test(a));return o?o.action({match:a.match(o.regex)}):t}}};function st({routes:e,notFoundRoute:t,onLocationChange:n}){const a=rt({routes:e,notFoundRoute:t});return window.addEventListener("popstate",o=>{o.state!=null&&n({router:a})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(o,r,s)=>{o.apply(r,s),n({router:a})}}),document.addEventListener("click",o=>{const{target:r}=o,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.startsWith("#")&&(history.pushState({},null,s),o.preventDefault())}),n({router:a}),a}const fe=[["neutral",{h:"0%",s:"0%",l:"62%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],it=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],lt=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Q=e=>`var(--color-${e}-darkest)`,ct=e=>`var(--color-${e}-lightest)`,dt=()=>fe.map(([e])=>`
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
`),ve=({dark:e})=>new Array(20).fill("").map((t,n)=>`--color-emphasis-${n*50}: var(--color-gray-${e?1e3-n*50:n*50});`).join(`
`),mt=([e,{h:t,s:n,l:a}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${a};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...it.map(([o,r])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...lt.map(([o,r])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function pt({createGlobalStyles:e},{colorPalette:t=fe}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${t.map(([n,a])=>mt([n,a])).join(`
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
`}function ht(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let re=e=>Object.prototype.toString.call(e??0).slice(8,-1),bt=e=>re(e)=="Object",ie=e=>re(e)=="Function",te=e=>["Object","Array"].includes(re(e)),le=Object.getPrototypeOf,ae=e=>Z(e)?e.val:e,Z=e=>e==null?void 0:e.__isState,gt=["splice","push","pop","shift","unshift","sort","reverse"],ee=(e,t)=>{const n=new Array(e.length);for(let a=0;a<e.length;a++)n[a]=t(e[a],a);return n};const O=e=>!Z(e[0])&&bt(e[0])?e:[{},...e];function ft(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,a,o=new Set,r=new Set,s=!1,i,l=v=>n.createElement(v),p=(v,y,x)=>{let k=i;i=y;let S=v(x);return i=k,S},d=()=>{a||(a=window.requestAnimationFrame(()=>{o.forEach(v=>{v.bindings=v.bindings.filter(y=>{var x;return(x=y.element)==null?void 0:x.isConnected}),!v.bindings.length&&!v.computed&&o.delete(v)}),a=void 0}))},c=(v,y,x,k,S,H)=>{var L;if(s){r.add(v);return}for(let F of v.bindings){let{deps:N,element:z,renderInferred:_,render:R,renderItem:X}=F;if(X&&y)(L=g(z,k,(...q)=>m(X(...q)),x,S,H)[y])==null||L.call();else{let q=_?_({element:z}):R({element:z,renderItem:X})(...N.map(ae));q!==z&&z.replaceWith(F.element=m(q))}}E(v),d()},u=(v,y,x=[])=>({get(k,S,H){var L;if(i==null||i.add(v),S==="_isProxy")return!0;if(!((L=k[S])!=null&&L._isProxy)&&!Z(k[S])&&te(k[S]))k[S]=new Proxy(k[S],u(v,y,[...x,S]));else if(gt.includes(S)){let F=k[S];return(...N)=>{let z=F.apply(k,N);return c(v,S,z,N,y,x),z}}return Reflect.get(k,S,H)},set(k,S,H,L){let F=Reflect.set(k,S,H,L);return c(v,"setItem",F,{prop:S,value:H},y,[...x,S]),F}}),b=(v,y)=>new Proxy(y,u(v,y)),g=(v,y,x,k,S,H)=>{let L=()=>v.replaceChildren(...ee(k,x)),F=N=>v[N]&&v.removeChild(v[N]);return{assign:L,sort:L,reverse:L,setItem:()=>{var z;let N=H[0];(z=v.children[N])==null||z.replaceWith(x(S[N],N))},push:()=>v.append(...ee(y,(N,z)=>x(N,S.length+z))),unshift:()=>v.prepend(...ee(y,x)),pop:()=>F("lastChild"),shift:()=>F("firstChild"),splice:()=>{let[N,z,..._]=y;const{length:R}=v.children;for(let X=N>=0?Math.min(N+z-1,R-1):R-1;X>=(N>=0?N:R+N);X--)v.children[X].remove();if(_.length){let X=_.forEach((q,at)=>x(q,N+at));v.children[N]?v.children[N].after(...X):v.append(...X)}}}},h=v=>({oldVal:v,bindings:[],listeners:[],__isState:!0,get val(){let y=this;return i==null||i.add(y),y.valProxy??(y.valProxy=te(v)?b(y,v):v,y.valProxy)},set val(y){let x=this,k=x.val;te(y)?(x.valProxy=b(x,y),c(x,"assign",y)):y!==k&&(x.valProxy=y,c(x)),x.oldVal=k}}),m=v=>v==null||v===!1?l("span"):v.nodeType?v:n.createTextNode(v),f=(v,y)=>{let x=new Set;return y.val=p(v,x),x},w=v=>{let y=h(),x=f(v,y);y.computed=!0;for(let k of x)k.listeners.push({computed:v,deps:x,state:y});return y},E=v=>{for(let y of[...v.listeners])f(y.computed,y.state)},C=(v,...y)=>{if(y.length){let x=[];for(let k of y.flat(1/0))k!=null&&x.push(Z(k)?j({deps:[k],render:()=>S=>S}):ie(k)?D({renderInferred:k}):m(k));v.append(...x)}},A={},M=(v,y)=>v&&(Object.getOwnPropertyDescriptor(v,y)??M(le(v),y)),T=(v,y,x)=>{var k;return A[v+","+y]??(A[v+","+y]=((k=M(x,y))==null?void 0:k.set)??0)},I=(v,y)=>new MutationObserver((x,k)=>{x.filter(S=>S.removedNodes).forEach(S=>[...S.removedNodes].find(H=>H===v&&(y({element:v}),k.disconnect(),!0)))}).observe(v.parentNode,{childList:!0}),B=v=>new Proxy(function(x,...k){var F;let[S,...H]=O(k),L=v?n.createElementNS(v,x):l(x);for(let[N,z]of Object.entries(S)){if(N.startsWith("bau"))continue;let _=T(x,N,le(L))?R=>L[N]=R:R=>L.setAttribute(N,R);z==null||(Z(z)?j({deps:[z],render:()=>()=>(_(z.val),L)}):ie(z)&&(!N.startsWith("on")||z.isDerived)?D({renderInferred:()=>(_(z({element:L})),L)}):z.renderProp?j({deps:z.deps,render:()=>()=>(_(z.renderProp({element:L})(...z.deps.map(ae))),L)}):_(z))}return C(L,...H),(F=S.bauCreated)==null||F.call(S,{element:L}),S.bauMounted&&t.requestAnimationFrame(()=>S.bauMounted({element:L})),S.bauUnmounted&&t.requestAnimationFrame(()=>I(L,S.bauUnmounted)),L},{get:(y,x)=>y.bind(void 0,x)}),P=(v,y,x)=>{v.element=m(x);for(let k of y)Z(k)&&(o.add(k),k.bindings.push(v));return v.element},D=({renderInferred:v,element:y})=>{let x=new Set,k=p(v,x,{element:y});return P({renderInferred:v},x,k)},j=({deps:v,element:y,render:x,renderItem:k})=>P({deps:v,render:x,renderItem:k},v,x({element:y,renderItem:k})(...v.map(ae))),V=(v,y,x)=>j({deps:[v],render:({renderItem:k})=>S=>(y.append(...ee(S,k)),y),renderItem:x}),W=v=>{s=!0,v(),s=!1,r.forEach(c),r.clear()};return{tags:B(),tagsNS:B,state:h,bind:j,loop:V,derive:w,stateSet:o,batch:W}}const vt=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},wt=(e,t,n,a)=>{const o=e.createElement("style");o.id=n,o.append(a),(t??e.head).append(o)},yt=(e,t)=>e.reduce((n,a,o)=>n+a+(t[o]??""),"");function xt(e){let{document:t}=(e==null?void 0:e.window)??window;const n=a=>(o,...r)=>{const s=yt(o,r),i=vt(s);return!t.getElementById(i)&&wt(t,e==null?void 0:e.target,i,a(i,s)),i};return{css:n((a,o)=>`.${a} { ${o} }`),keyframes:n((a,o)=>`@keyframes ${a} { ${o} }`),createGlobalStyles:n((a,o)=>o)}}function kt(e={}){const t=ft();return{bau:t,...xt(),tr:n=>n,window,states:{pathname:t.state("")},...e}}function $(...e){return e.filter(t=>t).join(" ")}function U(e,t){const{bau:n,css:a}=e,o={root:a`
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
    `,button:a`
      cursor: pointer;
    `,a:a``,disabled:a`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    `};return function(...s){let[{color:i,variant:l="outline",size:p,disabled:d,href:c,...u},...b]=O(s);return(c?n.tags.a:n.tags.button)({...u,class:$(o.root,l,p,i,c?o.a:o.button,d&&o.disabled,t==null?void 0:t.class,u.class),disabled:d,href:c,...!c&&{type:"button"}},b)}}function Ct(e){const{tr:t,bau:n,css:a,config:o}=e,{i:r,header:s,h1:i,div:l,a:p,img:d,b:c,ul:u,li:b}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),m=n.state(!0),f=U(e),w=()=>r({class:a`
          color: var(--font-color-inverse);
        `},g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>l({class:a`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"plain",color:"none",onclick:()=>m.val=!m.val},w()),p({href:`${o.base}/`,class:a`
            text-decoration: none;
            font-size: x-large;
          `},c(t("Bau UI Components")))),C=()=>p({class:a`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:"./github-mark-white.svg",width:30,height:30}));return function(){return s({class:a`
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
        `},E(),C())}}function Et({tr:e,bau:t,css:n}){const{footer:a,span:o,a:r,ul:s,li:i,p:l}=t.tags;return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},o("version: 0.40.0"))}}function we(e,t={}){return function({parent:a,animationHide:o,animationShow:r},s){s.style.animation=r;const i=()=>{s.removeEventListener("animationend",i),s.style.animation=""};return s.addEventListener("animationend",i),new MutationObserver((l,p)=>{l.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(c=>{a.style.position="relative";const u=c.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=o,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),p.disconnect(),!0}))}).observe(a,{childList:!0,subtree:!0}),s}}const ce="0.3s",ye=({parent:e,grandParent:t})=>n=>{const{children:a,...o}=n,r=structuredClone(o);return r.children=a==null?void 0:a.map(ye({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},xe=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let a=0;a<t.children.length;a++){const o=xe(e)(t.children[a]);if(o)return o}},St=({createGlobalStyles:e,keyframes:t})=>(e`
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
 `});function ke(e,t){const{bau:n,css:a,window:o}=e,r=({subTree:M})=>{var T;return o.location.pathname===((T=M==null?void 0:M.data)==null?void 0:T.href)},{renderHeader:s,renderMenuItem:i,isActive:l=r}=t,{ul:p,li:d,nav:c,div:u,header:b,a:g}=n.tags,h=we(),{hideToLeft:m,hideToRight:f,showFromRight:w,showFromLeft:E}=St(e),C=a`
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
  `,A=({variant:M,color:T,size:I,onclickItem:B,onclickBack:P,currentTree:D,pathnameState:j})=>{const{children:V,parentTree:W,data:v}=D;return u({class:$("drillDownMenu",M,T,I)},W&&b({onclick:P({currentTree:D})},s({data:v,currentTree:D})),V&&p(V.map(y=>d({class:()=>$(y.children&&"has-children",l({pathname:j.val,subTree:y})&&"is-active"),onclick:y.children&&B({currentTree:y})},i(y.data)))))};return function(T){const{variant:I="plain",color:B="neutral",size:P,tree:D,pathnameState:j=n.state(o.location.pathname),...V}=T,W=j.val,v=({currentTree:S})=>H=>x(H,k,S,!0),y=({currentTree:S})=>H=>x(H,k,S.parentTree,!1),x=(S,H,L,F)=>{H.firstChild.replaceChildren(h({parent:H,animationHide:`${F?m:f} ${ce}`,animationShow:`${F?w:E} ${ce}`},A({variant:I,color:B,size:P,currentTree:L,onclickItem:v,onclickBack:y,pathnameState:j})))},k=c({class:$(C,t==null?void 0:t.class,V.class)},()=>{let S=ye({})(D),H=xe(W)(S);return H||(H=S),u(A({variant:I,color:B,size:P,currentTree:H,onclickItem:v,onclickBack:y,pathnameState:j}))});return k}}const Tt={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Ce(e){const{tr:t,bau:n,css:a,config:o,states:r}=e,{div:s,ul:i,li:l,nav:p,a:d,span:c}=n.tags,h=ke(e,{renderHeader:({currentTree:m,data:f})=>d({href:`${o.base}${m.parentTree.children[0].data.href}`},f.name),renderMenuItem:({name:m,href:f})=>d({href:`${o.base}${f}`},m),isActive:({subTree:m})=>{var f;return window.location.pathname.replace(o.base,"")===((f=m==null?void 0:m.data)==null?void 0:f.href)}});return function(){return s({class:a`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},h({tree:Tt,pathnameState:r.pathname}))}}const $t=e=>{const{bau:t,css:n}=e,{div:a}=t.tags,o=Ct(e),r=Ce(e),s=Et(e);return function({componentState:l}){return a({class:n`
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
        `},o(),r(),()=>l.val&&l.val({}),s())}};function At(e,t){const{bau:n,css:a}=e,{accordionDefs:o}=t,{div:r,ul:s,li:i,header:l,h3:p,button:d}=n.tags,c=n.state(""),u=h=>m=>{c.val==h?c.val="":c.val=h},b=({element:h,open:m})=>{const f=()=>{h.removeEventListener("transitionend",f)};function w(C){C.addEventListener("transitionend",f),window.requestAnimationFrame(()=>{C.style.height="0px"})}function E(C){C.addEventListener("transitionend",f),C.style.height=C.scrollHeight+"px"}h.scrollHeight!=0&&(m?E(h):w(h))},g=a`
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
  `;return function(...m){let[{color:f,variant:w="outline",size:E,content:C,...A},...M]=O(m);const T=I=>{const{Header:B,Content:P,name:D}=I;return i({class:$(f,w,E),onclick:u(D)},p({class:()=>$(c.val==D&&"active")},d({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:j})=>c.val==D},B(I))),r({class:"content",role:"region",id:`bau-${D}`,"data-state":({element:j})=>{const V=c.val==D;return b({element:j,open:V}),V}},P(I)))};return r({class:$("accordion",g,t==null?void 0:t.class,A.class)},s(o.map(T)))}}const Y=["neutral","primary","success","danger","warning"],Bt=["plain","outline","solid"],G=e=>{const{bau:t,css:n}=e,{div:a,table:o,tbody:r,tr:s,td:i,thead:l,th:p}=t.tags;return function({Item:c}){return a({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},o(l(s(p("Variant/Color"),Y.map(u=>p(u)))),r(Bt.map(u=>s(p(u),Y.map((b,g)=>i(c({color:b,variant:u},{index:g}))))))))}},Ee=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,p:l}=n.tags,p=G(e),d=(...b)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),u=At(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>r(l("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>r(l("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>r(l("Item 3 content"))}]});return()=>o({id:"accordion"},i(t("Accordion")),s("Basic Accordion"),d(u({})),s("Accordion Table"),p({Item:b=>u({...b})}),s("Accordion width: fit-content"),d(u({color:"warning",class:a`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),d(u({color:"success",variant:"outline",class:a`
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
`};function oe(e,t){const{bau:n,css:a,createGlobalStyles:o}=e,{div:r}=n.tags;It({css:a,createGlobalStyles:o});const s=a`
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
  `,i=U(e),l=({onclick:p})=>i({"aria-label":"Close",onclick:p,class:"button-close"},"✖");return function(d,...c){const{variant:u="outline",color:b="neutral",size:g,onRemove:h,...m}=d;return r({...m,class:$(`alert-${u}`,u,b,g,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},r({class:"icon"},Mt[b]),r({class:"content"},...c),h&&l({onclick:h}))}}const Se=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,h4:l,p}=n.tags,d=G(e),c=oe(e),u=oe(e,{class:a`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>o({id:"alert"},i(t("Alert Examples")),s("Basic Alert"),r(c({color:"danger"},l("Something went wrong"),p("Error code ",404),p("Status ","Not Found"))),s("Custom Alert"),r(u({color:"warning"},l("My message"))),s("Alert Table"),d({Item:b=>c({...b},`Alert ${b.color}`)}))},Dt=(e,t={})=>{const{bau:n,css:a,keyframes:o}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:i}=n.tags,l=n.state([]),p={inserting:o`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:o`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:a`
      min-width: 300px;
      max-width: 90% vw;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:a`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      animation: ${p.inserting} var(--transition-slow) ease-out;
    `,itemOut:a`
      animation: ${p.removing} var(--transition-slow) ease-out;
    `},c=({id:u,status:b})=>{const g=l.val.findIndex(h=>h.id===u);g!=-1&&(l.val[g].status=b)};return function(b={},...g){const h=({id:w})=>{c({id:w,status:"removing"});const E=l.val.findIndex(C=>C.id===w);E!=-1&&l.val.splice(E,1)},m=({Component:w})=>{const E={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};l.val.length>=r&&h({id:l.val[0].id}),l.val.push(E),setTimeout(()=>h(E),s)},f=w=>i({class:d.item,onclick:()=>h(w)},w.Component());return document.addEventListener("alert.add",w=>m(w.detail)),document.addEventListener("alert.remove",w=>h(w.detail)),i({class:$(d.stack,t==null?void 0:t.class,b.class)},n.loop(l,i(),f))}},Te=e=>{const{tr:t,bau:n}=e,{section:a,h1:o}=n.tags,r=Dt(e,{deleteAfterDuration:2e4}),s=U(e),i=oe(e);return function(){return a({id:"alert-stack"},r(),o("Alert stack"),s({color:"success",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Pt=({keyframes:e})=>({hideRight:e`
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
 `}),$e=e=>{const{bau:t}=e,{section:n,div:a,h1:o}=t.tags,r=we(),s=U(e),i=Pt(e);return function(){const l=t.state(!0),p=a(),d=c=>{p.replaceChildren(r({parent:p,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},a(c.val?"Ciao":"")))};return d(l),n({id:"animate"},a(o("Test Animate"),a(s({onclick:()=>{l.val=!l.val,d(l)}},()=>l.val?"Hide":"Show")),p))}};function Nt(e,t){const{bau:n}=e,{span:a,img:o}=n.tags,r=n.state(!0),s=n.state(!1),i=()=>r.val=!1,l=p=>{r.val=!1,s.val=!0};return function(...d){let[{color:c,variant:u="outline",size:b,width:g=60,height:h=60,...m},...f]=O(d);return a({class:$(t==null?void 0:t.class,m.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",o({width:g,height:h,onload:i,onerror:l,class:$(t==null?void 0:t.class,c,u,b,m.class),...m}))}}const Ae=e=>{const{tr:t,bau:n,css:a}=e,{section:o,h2:r,h3:s}=n.tags,i=a`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,l=G(e),p=Nt(e,{class:a`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>o({id:"avatar"},r(t("Avatar")),p({class:i,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),p({class:i,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),p({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),l({Item:d=>p({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function se(e,t){const{bau:n,css:a,window:o}=e,{dialog:r}=n.tags,s=a`
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
  `;return function(...l){let[{contentEl:p,triggerEl:d,onClose:c,...u},...b]=O(l);const g=f=>{m.style.opacity=1,m.showModal();const w=d.getBoundingClientRect(),E=m.getBoundingClientRect();w.x<o.innerWidth/2?m.style.left=w.left+"px":m.style.left=w.right-E.width+"px",w.y<o.innerHeight/2?m.style.top=w.top+w.height+"px":m.style.top=w.top-E.height+"px"},h=f=>{const w=()=>{m.close(),m.removeEventListener("transitionend",w)};m.addEventListener("transitionend",w),m.style.opacity=0},m=r({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:f=>f.target===m&&(h(),c==null?void 0:c.call())},p);return m.closeDialog=h,m.openDialog=g,m}}function Lt(e,t){const{bau:n,css:a}=e,{div:o,input:r,ul:s,li:i,i:l,span:p,button:d}=n.tags,c=se(e),u=a`
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
  `,b=n.state(""),g=n.state(""),h=n.state(!1),m=n.state(0),f=()=>{h.val=!1};return function(...E){let[{variant:C="outline",color:A,size:M,id:T,label:I,placeholder:B,Option:P,options:D,getOptionLabel:j=({label:R})=>R,...V},...W]=O(E);const v=n.state(D),y=()=>{_.openDialog(),h.val=!0,g.val="",v.val=D},x=()=>{_.closeDialog(),h.val=!1,g.val=""},k=R=>{const{value:X}=R.target;g.val=X,X?v.val=D.filter(q=>j(q).match(new RegExp(`${X}`,"i"))):v.val=D},S=R=>{console.log("onclickButton",h.val),h.val?x():y()},H=R=>X=>{b.val=j(R),x()},L=R=>{switch(R.key){case"Escape":x();break;case"ArrowDown":m.val++;break;case"ArrowUp":m.val--;break;case"Enter":b.val=j(v.val[m.val]),g.val="",x();break}},F=d({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,onclick:S,class:$(C,A,M)},()=>!b.val&&n.tags.label(I),b),N=r({id:T,value:g,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:k,onkeydown:L,class:$(C,A,M)}),_=c({id:T,triggerEl:F,contentEl:(()=>o({class:$(C,A,M,"content")},N,()=>s(v.val.map((R,X)=>i({class:()=>$(m.val==X&&"active"),onclick:H(R)},P(R))))))(),onClose:f});return o({...V,class:$("autocomplete",u,t==null?void 0:t.class,V==null?void 0:V.class)},F,_)}}const Be=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,span:l}=n.tags,p=(...g)=>r({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=G(e),c=Lt(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=g=>r({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(g.label),l(g.code));return()=>o({id:"autocomplete",class:a``},i(t("Autocomplete")),s("Basic Autocomplete"),p(c({options:u,Option:b,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:g=>c({...g,options:u,Option:b,getOptionLabel:({label:h})=>h,label:"Country",placeholder:"Search countries",id:"country"})}))};function de(e,t){const{bau:n,css:a}=e,{span:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:l,variant:p="outline",size:d,content:c,...u},...b]=O(i);return o({...u,class:$("badge",r,t==null?void 0:t.class,u==null?void 0:u.class)},o({class:$(l,p,d)},c),...b)}}const Me=e=>{const{bau:t,css:n}=e,{section:a,div:o,h3:r,h2:s}=t.tags,i=(...c)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),l=G(e),p=de(e),d=de(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>a({id:"badge"},s("Badge"),r("Basic Badge"),i(p({content:"10"},"☏")),r("Badges Table"),l({Item:(c,{index:u})=>p({...c,content:`${u*100}`},"☏")}),r("Badge custom"),i(d({content:"1"},"☏")))};function zt(e,t){const{bau:n,css:a}=e,{ul:o,li:r,a:s,span:i}=n.tags,l=a`
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
  `;return function(...d){let[{color:c,variant:u="outline",size:b,items:g,...h},...m]=O(d);return o({...h,class:$(l,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:f,name:w})=>r((f?s:i)({href:f,class:$(c,u,b)},w))))}}const Ie=e=>{const{tr:t,bau:n}=e,{section:a,h2:o,h3:r}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},i=G(e),l=zt(e);return()=>a({id:"breadcrumbs"},o(t("Breadcrumbs")),r("Bacis Breadcrumb"),l(s),r("Breadcrumbs Table"),i({Item:p=>l({...p,...s})}))},De=e=>{const{bau:t,css:n}=e,{section:a,p:o,h3:r}=t.tags,s=G(e),i=U(e);return()=>a({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},r("Button Examples"),s({Item:l=>i({...l},`${l.variant} ${l.color}`)}),r("Full With"),o(i({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),r("Icon"),o(i({"aria-label":"Close"},"✖"),i({},"⟪"),i({},"⟨"),i({},"⟩"),i({},"⟫")))},Ht=()=>Y.map(e=>`
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
`);function jt(e,t){const{bau:n,css:a}=e,{div:o}=n.tags,r=a`
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
  `;return function(...i){let[{variant:l="outline",size:p="md",color:d,...c},...u]=O(i);return o({...c,class:$("button-group",r,l,d,p,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Pe=e=>{const{tr:t,bau:n}=e,{section:a,h2:o,h3:r}=n.tags,s=G(e),i=U(e),l=jt(e);return()=>a({id:"button-group"},o(t("Button Group Examples")),r("Outline"),l({},i({},"ONE"),i({},"TWO"),i({},"THREE")),r("Button Group Table"),s({Item:p=>l({...p},i({},"ONE"),i({},"TWO"),i({},"THREE"))}))};function ue(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,s=a`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    ${(()=>Y.map(i=>`
&.calendar.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()}
  `;return function(...l){let[{color:p="neutral",variant:d="plain",size:c,...u},...b]=O(l);return o({...u,type:"date",class:$("calendar",s,p,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Ne=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,label:l}=n.tags,p=G(e),d=(...g)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),c=n.state("2023-08-08"),u=ue(e),b=ue(e,{class:a`
      background-color: lightseagreen !important;
    `});return()=>o({id:"calendar"},i(t("Calendar")),r("Date: ",c),s("Basic Calendar"),d(l({for:"start"},"Start date:",u({id:"start",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar min and max"),d(l("End date:",u({min:"2023-01-01",max:"2023-12-31",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar custom"),d(b({})),s("Calendar Table"),p({Item:g=>u({...g})}))};function Gt(e,t){const{bau:n,css:a}=e,{span:o}=n.tags,r=a`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...i){let[{size:l,variant:p="outline",color:d="neutral",onclick:c,...u},...b]=O(i);return o({...u,onclick:c,class:$("chip",r,l,p,d,c&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Le=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i}=n.tags,l=G(e),p=(...c)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),d=Gt(e);return()=>o({id:"chip"},i(t("Chip")),s("Chip Default"),p(d("My Chip")),s("Chip Clickable"),p(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),l({Item:c=>d({...c},`Chip ${c.color}`)}))};function Ot(e,t={}){const{bau:n,css:a}=e,{input:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:l,variant:p="outline",size:d,...c},...u]=O(i);return o({type:"checkbox",required:"required",...c,class:$(r,l,p,d,t==null?void 0:t.class,c==null?void 0:c.class)})}}const ze=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,label:s,h2:i,form:l}=n.tags,p=G(e),d=Ot(e),c=n.state(!1),u=n.state(!1),b=h=>m=>{h.val=!!m.target.checked},g=(...h)=>r({class:a`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...h);return()=>o({id:"checkbox"},l(i(t("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:c,onchange:b(c)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:b(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),i(t("Checkbox Table")),p({Item:(h,{index:m})=>d({id:`myCheckbox-${m}`,name:`myCheckbox-${m}`,...h})})))};function Rt(e,t){const{bau:n,css:a}=e,{div:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:l,variant:p="outline",size:d,openState:c,...u},...b]=O(i);return o({class:$(r,t==null?void 0:t.class,u.class)},o({class:()=>$("overlay",c.val&&"overlay-open"),onclick:()=>{c.val=!1}}),o({class:()=>$("content",c.val&&"content-open")},b))}}const He=e=>{const{tr:t,bau:n}=e,{section:a,h2:o}=n.tags,r=n.state(!1),s=Rt(e),i=U(e),l=Ce(e);return()=>a({id:"drawer"},o(t("Drawer")),i({onclick:()=>{r.val=!r.val}},"OPEN DRAWER"),s({openState:r},l()))},je=e=>{const{tr:t,bau:n,window:a,config:o}=e,{section:r,a:s,h2:i,h3:l}=n.tags,p=n.state(a.location.pathname.replace(o.base,"")),d=G(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},h=ke(e,{renderMenuItem:({name:m,href:f})=>s({href:f},m),renderHeader:({currentTree:m,data:f})=>s({href:m.parentTree.children[0].data.href},f.name),isActive:({subTree:m})=>{var f;return a.location.pathname.replace(o.base,"")===((f=m==null?void 0:m.data)==null?void 0:f.href)}});return()=>r({id:"drillDownMenu"},i(t("Drill Down Menu")),h({tree:c,pathnameState:p}),l("Drill Down Table"),d({Item:m=>h({tree:c,...m})}))};function Ft(e,t){const{bau:n,css:a}=e,{div:o,span:r,label:s,input:i}=n.tags,l={base:a`
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
    `,disabled:a`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(d,...c){const{variant:u="outline",color:b="neutral",size:g,Component:h,disabled:m,...f}=d;return o({class:$(l.base,m&&l.disabled,t==null?void 0:t.class,d.class)},s({class:$(u,b,g)},h({disabled:m}),i({type:"file",disabled:m,...f})),r({class:"filename-display"}))}}const Ge=e=>{const{tr:t,bau:n,css:a}=e,{svg:o,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:i,h3:l,h2:p,span:d}=n.tags,c=G(e),u=n.state("No file selected"),b=Ft(e),g=m=>{const f=m.target.files[0];f?u.val=f.name:u.val="No file selected"},h=({disabled:m})=>i({class:$(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},o({width:100,height:100,fill:"currentColor"},r({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},p(t("FileInput Examples")),l("File Input"),b({Component:h,name:"file",accept:"text/*",onchange:g}),i("File selected: ",u),l("File Input disabled"),b({Component:h,name:"file",accept:"text/*",disabled:!0,onchange:g}),l("File Input Table"),c({Item:m=>b({Component:h,name:"file",accept:"text/*",onchange:g,...m})}))},Vt=()=>Y.map(e=>`
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
`);function Xt(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,r=a`
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
    ${Vt()}
  `;return function(i){const{size:l,variant:p="outline",color:d="neutral",name:c,id:u,disabled:b,...g}=i;return o({...g,class:$("input",l,d,p,r,t==null?void 0:t.class,g.class)})}}const Oe=e=>{const{tr:t,bau:n}=e,{section:a,div:o,h3:r,h2:s}=n.tags,i=G(e),l=Xt(e);return()=>a({id:"input"},s(t("Input Examples")),r("Standard"),o(l({id:"my-Input",name:"Label",label:"Label"})),r("Disabled"),o(l({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),l({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),r("Input with error"),o(l({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),r("Input Table"),i({Item:p=>l({name:"my-input",id:"my-input-with",placeholder:"Enter text",...p})}))};function _t(e,t){const{bau:n,css:a}=e,{dialog:o}=n.tags,s=a`
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
    ${(()=>Y.map(i=>`
&.modal.plain.${i} {
  color: inherit;
}
&.modal.outline.${i} {
  color: inherit;
}
&.modal.soft.${i} {
  color: inherit;
}
&.modal.solid.${i} {

}
`).join(`
`))()}
  `;return function(...l){let[{color:p="neutral",variant:d="outline",size:c,...u},...b]=O(l);return o({class:$("modal",s,p,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...b)}}const Re=e=>{const{tr:t,bau:n}=e,{section:a,main:o,h2:r,header:s,footer:i,p:l,div:p}=n.tags,d=G(e),c=U(e),u=_t(e),b=()=>o(Array(10).fill("").map((m,f)=>l(f+1,". Some text here"))),g=m=>{const f=u({id:"my-dialog",...m},s("Header"),b(),i(c({variant:"outline",onclick:()=>{f.close()}},"Cancel"),c({variant:"solid",onclick:()=>{f.close()}},"OK")));return f},h=g({});return()=>a({id:"modal"},r(t("Modal Examples")),c({variant:"solid",onclick:()=>{h.showModal()}},"OPEN MODAL"),h,r(t("Modal Table")),d({Item:m=>{const f=g(m);return p(c({...m,onclick:()=>{f.showModal()}},"OPEN MODAL"),f)}}))},Fe=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,h1:l,p}=n.tags,d=U(e),c=(...A)=>r({class:a`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...A),u=se(e),g=(()=>d({onclick:()=>f.open?f.closeDialog():f.openDialog()},"Click"))(),h=()=>r({},l("My content"),p("My Content")),m=h(),f=u({id:"my-popover-left",triggerEl:g,contentEl:m}),w=d({onclick:()=>C.open?C.closeDialog():C.openDialog()},"Click"),E=h(),C=u({id:"my-popover-left",triggerEl:w,contentEl:E});return()=>o({id:"popover",class:a``},i(t("Popover")),s("Basic Popover"),c(r(g,f),r(w,C)))};function Ut(e,t){const{bau:n,css:a}=e,{div:o,ul:r,li:s,button:i}=n.tags,l=se(e),p=a`
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
  `,d=n.state(""),c=n.state(!1),u=n.state(0);return function(...g){let[{color:h="neutral",variant:m="outline",size:f,id:w,label:E,Option:C,options:A,getOptionLabel:M=({label:k})=>k,...T},...I]=O(g);const B=()=>{x.openDialog(),c.val=!0},P=()=>{x.closeDialog(),c.val=!1},D=()=>{c.val=!1},j=k=>{c.val?P():B()},V=k=>S=>{d.val=M(k),P()},W=k=>{switch(k.preventDefault(),k.key){case"Escape":P();break;case"ArrowDown":u.val<A.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=A.length-1:u.val--;break;case"Enter":c.val?(d.val=M(A[u.val]),P()):B();break}},v=()=>r(A.map((k,S)=>s({class:()=>$(u.val==S&&"active"),onclick:V(k)},C(k)))),y=i({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":c,onclick:j,class:$(h,m,f)},()=>!d.val&&n.tags.label(E),d),x=l({id:w,triggerEl:y,contentEl:v(),onClose:D});return o({...T,class:$("select",p,t==null?void 0:t.class,T==null?void 0:T.class),onkeydown:W},y,x)}}const Ve=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,span:l}=n.tags,p=(...g)=>r({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=G(e),c=Ut(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=g=>r({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(g.label),l(g.code));return()=>o({id:"select",class:a``},i(t("Select")),s("Basic Select"),p(c({options:u,Option:b,getOptionLabel:({label:g})=>g,label:"Select a country..."})),i(t("Select Table")),d({Item:g=>r(c({...g,options:u,Option:b,getOptionLabel:({label:h})=>h,label:"Select a country..."}))}))};function ne(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,s=a`
    ${(()=>Y.map(i=>`
&.slider.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()};
  `;return function(...l){let[{color:p="neutral",variant:d="outline",size:c,...u},...b]=O(l);return o({...u,type:"range",class:$("slider",p,d,c,s,t==null?void 0:t.class,u.class)},...b)}}const Xe=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,p:l,label:p,datalist:d,option:c,br:u}=n.tags,b=n.state(0),g=C=>{b.val=C==null?void 0:C.target.value},h=(...C)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...C),m=G(e),f=ne(e),w=ne(e),E=ne(e);return()=>o({id:"slider"},i(t("Slider")),l("Slider value: ",b),s("Basic Slider"),h(f({oninput:g,name:"slider-simple"})),s(t("Slider Table")),m({Item:C=>f(C)}),s("Slider Min Max: -1000 1000"),h(w({oninput:g,min:-1e3,max:1e3})),s("Slider Step 20"),h(f({oninput:g,step:20,min:-100,max:100})),s("Slider Vertical"),h(r({class:a`
              display: flex;
            `},f({oninput:g,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:a`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:a`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(C=>c({value:Number(C),label:C}))))),s("Slider with mark"),h(p({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:g,class:a`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:a`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(C=>c({value:Number(C),label:C})))))},me={sm:16,md:32,lg:64};function _e(e,t={}){const{bau:n,css:a}=e,{svg:o,animate:r,animateTransform:s,rect:i}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:p="md",color:d="color-base",variant:c="outline",visibility:u=!0,...b}={}){return o({class:$(a`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,b.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:me[p],height:me[p],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Ue=e=>{const{tr:t,bau:n}=e,{section:a,h2:o,h3:r}=n.tags,s=G(e),i=_e(e);return()=>a({id:"spinner"},o(t("Spinner Examples")),r(t("Spinner Table")),s({Item:l=>i(l)}))},Wt=()=>Y.map(e=>`
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
`);function qt(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,r=a`
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
    ${Wt()}
  `;return function(...i){let[{color:l="neutral",variant:p="plain",size:d,...c},...u]=O(i);return o({...c,class:$("switch",r,l,p,d,t==null?void 0:t.class,c.class),type:"checkbox",required:"required"},...u)}}const We=e=>{const{tr:t,bau:n,css:a}=e,{section:o,form:r,label:s,div:i,h2:l}=n.tags,p=G(e),d=qt(e);return()=>o({id:"switch"},l(t("Switch Examples")),r(i({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))),l(t("Switch Table")),p({Item:c=>i(d({...c,id:"my-switch"}),d({...c,id:"my-switch-checked",checked:!0}))}))};function pe(e,t){const{bau:n,css:a}=e,{tabDefs:o}=t,{div:r,ul:s,li:i}=n.tags,l=n.state(o),p=n.state(o[0]),d=u=>l.val.find(b=>b.name==u),c={base:a`
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
    `};return function(...b){let[{color:g,variant:h="plain",size:m,...f},...w]=O(b);const E=A=>{const{Header:M,disabled:T,name:I}=A;return i({class:()=>$(p.val.name==I&&"active",T&&"disabled"),onclick:B=>B.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:I},bubbles:!0}))},M(A))},C=r({class:$(c.base,h,m,g,t==null?void 0:t.class,f.class)},n.loop(l,s(),E),()=>p.val.Content?p.val.Content({}):"");return C.addEventListener("tab.select",A=>{var I,B;const{tabName:M}=A.detail,T=d(M);T&&((I=p.val.exit)==null||I.call(),p.val=T,(B=T.enter)==null||B.call())},!1),C.addEventListener("tab.add",A=>{var T;const{tab:M}=A.detail;(T=M.enter)==null||T.call(),l.val.push(M)},!1),C.addEventListener("tab.remove",A=>{var T;const M=l.val.findIndex(I=>I.name==A.detail.tabName);M>0&&((T=l.val[M].exit)==null||T.call(),l.val.splice(M,1))},!1),C}}const qe=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h3:s,h2:i,p:l,i:p}=n.tags,d=G(e),c=U(e),u=(...w)=>r({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...w),b=()=>({name:"New Tab",Header:({name:w})=>r(w),Content:()=>r("My Paragraph")}),h=pe(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(l("My tab Disabled"))}]}),f=pe(e,{tabDefs:[{name:"Tab1",Header:()=>r(p({class:a`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>r({class:a`
              > button {
                margin: 10px;
              }
            `},c({onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:b()},bubbles:!0}))},"Add a new Tab"),c({accent:!0,onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(l("My Content"))}]});return()=>o({id:"tabs"},i(t("Tabs")),s("Basic Tabs"),u(h({})),s("Full Witdth"),u(h({class:a`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(h({class:a`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(h({class:a`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(h({class:a`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(h({class:a`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(f({})),i(t("Tabs Table")),d({Item:w=>h(w)}))};function K(e,t){const{bau:n,css:a,createGlobalStyles:o}=e,{div:r}=n.tags;o`
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
`;const s=a`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...l){let[{...p},...d]=O(l);return r({...p,class:$("table-container",s,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Ye=e=>{const{bau:t,css:n}=e,{section:a,div:o,h3:r,h2:s,th:i,td:l,tr:p,table:d,thead:c,tbody:u,caption:b}=t.tags;function g(I,B,P,D,j){return{name:I,calories:B,fat:P,carbs:D,protein:j}}const h=[g("Frozen yoghurt",159,6,24,4),g("Ice cream sandwich",237,9,37,4.3),g("Eclair",262,16,24,6),g("Cupcake",305,3.7,67,4.3),g("Gingerbread",356,16,49,3.9)],m=(...I)=>o({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...I),f=({name:I,calories:B})=>p(l(I),l({class:n`
            text-align: right;
          `},B)),w=()=>c(p(i({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),i({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),E=K(e,{class:n`
      max-width: 650px;
    `}),C=K(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),A=K(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),M=K(e,{class:n`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),T=K(e,{class:n`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>a({id:"table"},s(p("Table")),r("Basic Table"),m(E(d(b("Basic Table"),w(),u(h.map(f))))),r("Dense Table"),m(C(d(b("Dense Table"),w(),u(h.map(f))))),r("Zebra Table"),m(A(d(b("Zebra Table"),w(),u(h.map(f))))),r("Caption Bottom"),m(M(d(b("Caption Bottom Table"),w(),u(h.map(f))))),r("Overflow Header"),m(T(d(b("Overflow Header"),w(),u(h.map(f))))))};function Ke(e,t){const{bau:n,css:a}=e,{div:o}=n.tags,r=U(e),s=_e(e),i=a`
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
  `,l=({label:b,icon:g,...h})=>r({variant:"plain","aria-label":b,title:b,...h},g),p=({count:b,totalCount:g,page:h,rowsPerPage:m})=>o({class:"pages-numbers"},Number(h-1)*Number(m)+(b>0?1:0),"-",Math.min(h*m,g)," of ",g),d=({count:b,page:g,rowsPerPage:h})=>o({class:"pages-numbers"},(g-1)*h+(b>0?1:0),"-",g*h),c=b=>b<=1,u=(b,g,h)=>b>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:m=0,page:f=1,rowsPerPage:w=50,onPageChange:E,isLoading:C=!1,disableFirst:A=()=>c(f),disablePrevious:M=()=>c(f),disableNext:T=()=>u(f,m,w),disableLast:I=()=>u(f,m,w),...B},...P]=O(g);const D=Math.max(0,Math.ceil(m/w)),j=E({page:1}),V=E({page:f-1}),W=E({page:f+1}),v=E({page:D});return o({...B,class:$("table-pagination",i,C&&"disabled",t==null?void 0:t.class,B==null?void 0:B.class)},s({class:"spinner",visibility:C,size:"md"}),m>0?p({count:h,totalCount:m,page:f,maxPages:D,rowsPerPage:w}):d({count:h,page:f,maxPages:D,rowsPerPage:w}),o(l({label:"First",icon:"⟪",onclick:j,disabled:A()}),l({label:"Previous",icon:"⟨",onclick:V,disabled:M()}),l({label:"Next",icon:"⟩",onclick:W,disabled:T()}),l({label:"Last",icon:"⟫",onclick:v,disabled:I()})))}}const Yt=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),Kt=e=>{const{bau:t,css:n}=e,{th:a,td:o,tr:r,table:s,thead:i,tbody:l}=t.tags,p=Yt(45),d=({name:w,email:E})=>r(o(w),o(E)),c=()=>i(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Email")),u=Ke(e),b=K(e,{class:n`
      max-width: 650px;
    `}),g=t.state(p),h=t.state({count:p.length,totalCount:p.length,page:1,rowsPerPage:10}),m=t.derive(()=>g.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),f=({page:w})=>E=>{h.val.page=w};return()=>b(s(c(),()=>l(m.val.map(d))),()=>u({...h.val,onPageChange:f}))},Zt=e=>{const{bau:t,css:n}=e,{th:a,td:o,tr:r,table:s,thead:i,tbody:l,div:p}=t.tags,d=t.state(!1),c=t.state([]),u=t.state(""),b=t.derive(()=>c.val.length),g=t.state(1),h=t.state(10),m=t.derive(()=>c.val),f=B=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(B).toString()}`,w=({page:B})=>P=>{g.val=B,E(f({page:B,per_page:h.val}))};E(f({page:1,per_page:h.val}));async function E(B){try{d.val=!0;const P=await fetch(B,{});if(P.ok){const D=await P.json();c.val=D;return}throw P}catch(P){u.val=P.message}finally{d.val=!1}}const C=({name:B,description:P,stargazers_count:D})=>r(o(B),o(P),o({class:n`
            text-align: right;
          `},D)),A=()=>i(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Description"),a({class:n`
            text-align: right;
          `},"Stars")),M=Ke(e),T=K(e,{class:n`
      min-width: 650px;
    `}),I=({message:B})=>p(B);return()=>T(()=>M({rowsPerPage:h.val,page:g.val,count:b.val,totalCount:-1,isLoading:d.val,onPageChange:w,disableNext:()=>!1}),s(A(),()=>u.val&&I({message:u.val}),()=>l(m.val.map(C))))},Ze=e=>{const{bau:t,css:n}=e,{section:a,div:o,h3:r,h2:s,tr:i}=t.tags,l=Kt(e),p=Zt(e),d=(...c)=>o({class:n`
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
        `},...c);return()=>a({id:"pagination"},s(i("Table Pagination")),r("Asynchronous Pagination"),d(p()),r("Simple Pagination"),d(l()))};function he(e,t){const{bau:n,css:a,window:o}=e,{div:r}=n.tags,s=a`
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
  `;return function(...l){let[{titleEl:p,side:d="bottom-start",color:c="neutral",variant:u="outline",size:b,...g},...h]=O(l);const m=r({class:$("container",...d.split("-"))},r({class:$("content",c,u,b),role:"tooltip"},p)),f=T=>`move-to-${T}`,w=(T,I,B)=>{if(T()){const P=f(I);m.classList.add(P),m.classList.add(I),m.classList.remove(B)}},E=(T,I)=>{const B=f(T);m.classList.contains(B)&&(m.classList.remove(B),m.classList.add(I),m.classList.remove(T))},C=T=>{const I=m.getBoundingClientRect();w(()=>I.x<0,"right","left"),w(()=>I.x+I.width>o.innerWidth,"left","right"),w(()=>I.y<0,"bottom","top"),w(()=>I.bottom>o.innerHeight,"top","bottom"),m.classList.add("visible")},A=T=>{m.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return r({...g,class:$("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",C),T.addEventListener("mouseout",A)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",C),T.removeEventListener("mouseout",A)}},...h,m)}}const Je=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h2:s,em:i,p:l}=n.tags,p=G(e),d=U(e),c=he(e),u=he(e,{class:a`
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
    `}),b=()=>r({class:a`
          font-size: larger;
        `},l("A ",i("tooltip")," can be any component")),g=()=>[r({class:a`
          display: flex;
          justify-content: space-around;
        `},c({side:"top-start",titleEl:b()},d({},"top-start")),c({side:"top-centered",titleEl:b()},d({},"top-centered")),c({side:"top-end",titleEl:b()},d({},"top-end"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-start",titleEl:b()},d({},"left-start")),c({side:"right-start",titleEl:b()},d({},"right-start"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-centered",titleEl:b()},d({},"left-centered")),c({side:"right-centered",titleEl:b()},d({},"right-centered"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-end",titleEl:b()},d({},"left end")),c({side:"right-end",titleEl:b()},d({},"right end"))),r({class:a`
          display: flex;
          justify-content: space-around;
        `},c({side:"bottom-start",titleEl:b()},d({},"bottom start")),c({side:"bottom-centered",titleEl:b()},d({},"bottom centered")),c({side:"bottom-end",titleEl:b()},d({},"bottom end")))];return()=>o({id:"tooltip"},s(t("Tooltip")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},g()),s(t("Tooltip moved")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},g()),s(t("Tooltip custom")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},u({titleEl:b()},d({},"custom tooltip"))),s(t("Tooltip Table")),p({Item:h=>c({titleEl:b(),...h},d({},`${h.color} ${h.variant}`))}))},Jt="light";function Qt(e,t){const{bau:n,css:a,window:o}=e,{input:r}=n.tags,s=d=>{o.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},i=()=>{try{return localStorage.getItem("theme")}catch{}},l=i();l?s(l):o.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):o.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Jt);const p=a`
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
  `;return function(...c){let[{color:u,variant:b="outline",size:g,...h},...m]=O(c);return r({required:"required",title:"Switch Theme",...h,class:$(p,u,b,g,t==null?void 0:t.class,h.class),type:"checkbox",checked:i()=="dark",onclick:f=>{s(f.target.checked?"dark":"light")}},...m)}}const Qe=e=>{const{tr:t,bau:n,css:a}=e,{section:o,form:r,div:s,h2:i}=n.tags,l=G(e),p=Qt(e);return()=>o({id:"theme-switch"},i(t("Theme Switch")),r(s({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},p({}))),i(t("Theme Switch Table")),l({Item:d=>p(d)}))},ea=({css:e,createGlobalStyles:t})=>(t`
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
    `});function ta(e,t){const{bau:n,css:a,createGlobalStyles:o,window:r}=e,{renderMenuItem:s}=t,{ul:i,li:l,nav:p,div:d}=n.tags,c=ea({css:a,createGlobalStyles:o}),u=({element:m,closeState:f})=>{m.scrollHeight!=0&&(f.val?b(m):g(m))};function b(m){m.style.height=m.scrollHeight+"px";const f=()=>{m.removeEventListener("transitionend",f)};m.addEventListener("transitionend",f),r.requestAnimationFrame(()=>{m.style.height="0px"})}function g(m){const f=()=>{m.removeEventListener("transitionend",f),m.style.height=null};m.addEventListener("transitionend",f),m.style.height=m.scrollHeight+"px"}const h=({depth:m=1,maxDepth:f})=>w=>{const{children:E,expanded:C}=w,A=n.state(!C);return l({class:()=>$(E?A.val?c.collapsed:c.expanded:"")},d({class:a`
              cursor: pointer;
            `,onclick:M=>{E&&(A.val=!A.val)}},s(w.data)),E&&m<f&&i({bauMounted:({element:M})=>{A.val&&(M.style.height="0px")},"aria-expanded":({element:M})=>(u({element:M,closeState:A}),!A.val)},E.map(h({depth:m+1,maxDepth:f}))))};return function({tree:f,maxDepth:w=1/0,size:E,variant:C="plain",color:A="neutral",...M}){return p({class:$(c.nav,E,C,A,t==null?void 0:t.class,M.class)},f.children&&i(f.children.map(h({maxDepth:w}))))}}const et=e=>{const{tr:t,bau:n}=e,{section:a,a:o,h2:r,h3:s}=n.tags,i=G(e),l={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=ta(e,{renderMenuItem:({name:c,href:u})=>o({href:u,onclick:b=>{b.preventDefault()}},c)});return()=>a({id:"treeview"},r(t("Tree View")),s(t("Tree View Default")),d({tree:l}),s(t("Tree View Table")),i({Item:c=>d({...c,tree:l})}))};function be(e){const{tr:t,bau:n,css:a}=e,{div:o,main:r,h1:s,article:i}=n.tags;return function(){return o({class:a`
          grid-area: main;
          display: flex;
        `},i({class:a`
            flex-grow: 1;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Component Examples")),Ee(e)(),Se(e)(),Te(e)(),$e(e)(),Be(e)(),Ae(e)(),Me(e)(),Ie(e)(),De(e)(),Pe(e)(),Ne(e)(),ze(e)(),Le(e)(),He(e)(),je(e)(),Ge(e)(),Oe(e)(),Re(e)(),Fe(e)(),Ve(e)(),Xe(e)(),Ue(e)(),We(e)(),Ye(e)(),Ze(e)(),qe(e)(),Je(e)(),Qe(e)(),et(e)()))}}function aa(e,t={}){const{bau:n,css:a}=e,{div:o,span:r,pre:s,h3:i,h4:l}=n.tags;return function(d,...c){return o("Login")}}const na=e=>{const{tr:t,bau:n}=e,{section:a,div:o,h3:r,h2:s}=n.tags,i=aa(e);return()=>a({id:"login"},s(t("Login Examples")),r("Basic"),o(i()))};function oa(e){const{tr:t,bau:n,css:a}=e,{div:o,article:r,h1:s}=n.tags;return function(){return o({class:a`
          grid-area: main;
          display: flex;
        `},r({class:a`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),na(e)()))}}const ra=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:be(e)})},{path:"components",action:()=>({title:"Component",component:be(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ee(e)})},{path:"alert",action:()=>({title:"Alert",component:Se(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Te(e)})},{path:"animate",action:()=>({title:"Animate",component:$e(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Be(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ae(e)})},{path:"badge",action:()=>({title:"Badge",component:Me(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ie(e)})},{path:"button",action:()=>({title:"Button",component:De(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Pe(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Ne(e)})},{path:"chip",action:()=>({title:"Chip",component:Le(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ze(e)})},{path:"drawer",action:()=>({title:"Drawer",component:He(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:je(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Ge(e)})},{path:"input",action:()=>({title:"Input",component:Oe(e)})},{path:"modal",action:()=>({title:"Modal",component:Re(e)})},{path:"popover",action:()=>({title:"Popover",component:Fe(e)})},{path:"select",action:()=>({title:"Select",component:Ve(e)})},{path:"slider",action:()=>({title:"Slider",component:Xe(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Ue(e)})},{path:"switch",action:()=>({title:"Switch",component:We(e)})},{path:"table",action:()=>({title:"Table",component:Ye(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ze(e)})},{path:"tabs",action:()=>({title:"Tabs",component:qe(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Je(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Qe(e)})},{path:"treeView",action:()=>({title:"Tree View",component:et(e)})}]},{path:"pages",action:t=>({title:"Pages",component:oa(e)})}],sa=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ia=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:a,bau:o,states:r}=e,s=o.state(),i=t({componentState:s});return document.getElementById("app").replaceChildren(i),({router:p})=>{const d=a.location.pathname.replace(n,""),{title:c,component:u,Layout:b=t}=p.resolve({pathname:d});r.pathname.val=d,s.val=u,document.title=`${c}`}},la=e=>{const{createGlobalStyles:t}=e;pt(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"40%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),t`
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
  `};ht();const tt={title:"Bau",base:"/bau/bau-ui"},J=kt({config:tt});la(J);ca(J);st({routes:ra({context:J}),onLocationChange:ia({context:J,LayoutDefault:$t(J),config:tt}),notFoundRoute:sa(J)});
