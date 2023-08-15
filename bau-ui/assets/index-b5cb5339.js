(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Qe=(e,t)=>({...e,paths:[...t,e.path]}),Ce=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const r=Qe(o,e);return n?[r,...Ce({paths:[...e,o.path],routes:n})]:r}),et=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},tt=({routes:e=[],notFoundRoute:t})=>{const n=Ce({routes:e}).map(o=>({...o,regex:et(o)}));return{resolve:({pathname:o})=>{const r=n.find(({regex:a})=>a.test(o));return r?r.action({match:o.match(r.regex)}):t}}};function at({routes:e,notFoundRoute:t,onLocationChange:n}){const o=tt({routes:e,notFoundRoute:t});return window.addEventListener("popstate",r=>{r.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(r,a,s)=>{r.apply(a,s),n({router:o})}}),document.addEventListener("click",r=>{const{target:a}=r,s=a.getAttribute("href");a.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),r.preventDefault())}),n({router:o}),o}const Se=[["neutral",{h:"0%",s:"0%",l:"62%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],nt=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ot=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],te=e=>`var(--color-${e}-darkest)`,rt=e=>`var(--color-${e}-lightest)`,st=()=>Se.map(([e])=>`
.plain.${e} {
  color: ${te(e)};
  background-color: var(--background-color);
}
.outline.${e} {
  border: 1px solid ${te(e)};
  color: ${te(e)};
  background-color: var(--background-color);
}
.soft.${e} {
  color: ${te(e)};
  background-color: ${rt(e)};
}
.solid.${e} {
  color: var(--font-color-inverse);
  background-color: ${te(e)};
}
`).join(`
`),lt=()=>new Array(20).fill("").map((e,t)=>`--color-gray-${t*50}: hsl(0, 0%, ${100-5*t}%);`).join(`
`),Ee=({dark:e})=>new Array(20).fill("").map((t,n)=>`--color-emphasis-${n*50}: var(--color-gray-${e?1e3-n*50:n*50});`).join(`
`),it=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...nt.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),...ot.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ct({createGlobalStyles:e},{colorPalette:t=Se}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${t.map(([n,o])=>it([n,o])).join(`
`)}
  ${lt()}
  ${Ee({})}
  ${st()}
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
`}function dt(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let me=e=>Object.prototype.toString.call(e??0).slice(8,-1),ut=e=>me(e)=="Object",we=e=>me(e)=="Function",se=e=>["Object","Array"].includes(me(e)),ye=Object.getPrototypeOf,le=e=>ee(e)?e.val:e,ee=e=>e==null?void 0:e.__isState,mt=["splice","push","pop","shift","unshift","sort","reverse"],ae=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const U=e=>!ee(e[0])&&ut(e[0])?e:[{},...e];function ht(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,r=new Set,a=new Set,s=!1,l,i=f=>n.createElement(f),m=(f,x,k)=>{let C=l;l=x;let T=f(k);return l=C,T},d=()=>{o||(o=window.requestAnimationFrame(()=>{r.forEach(f=>{f.bindings=f.bindings.filter(x=>{var k;return(k=x.element)==null?void 0:k.isConnected}),!f.bindings.length&&!f.computed&&r.delete(f)}),o=void 0}))},c=(f,x,k,C,T,_)=>{var z;if(s){a.add(f);return}for(let X of f.bindings){let{deps:N,element:L,renderInferred:R,render:G,renderItem:V}=X;if(V&&x)(z=g(L,C,(...K)=>b(V(...K)),k,T,_)[x])==null||z.call();else{let K=R?R({element:L}):G({element:L,renderItem:V})(...N.map(le));K!==L&&L.replaceWith(X.element=b(K))}}E(f),d()},u=(f,x,k=[])=>({get(C,T,_){var z;if(l==null||l.add(f),T==="_isProxy")return!0;if(!((z=C[T])!=null&&z._isProxy)&&!ee(C[T])&&se(C[T]))C[T]=new Proxy(C[T],u(f,x,[...k,T]));else if(mt.includes(T)){let X=C[T];return(...N)=>{let L=X.apply(C,N);return c(f,T,L,N,x,k),L}}return Reflect.get(C,T,_)},set(C,T,_,z){let X=Reflect.set(C,T,_,z);return c(f,"setItem",X,{prop:T,value:_},x,[...k,T]),X}}),h=(f,x)=>new Proxy(x,u(f,x)),g=(f,x,k,C,T,_)=>{let z=()=>f.replaceChildren(...ae(C,k)),X=N=>f[N]&&f.removeChild(f[N]);return{assign:z,sort:z,reverse:z,setItem:()=>{var L;let N=_[0];(L=f.children[N])==null||L.replaceWith(k(T[N],N))},push:()=>f.append(...ae(x,(N,L)=>k(N,T.length+L))),unshift:()=>f.prepend(...ae(x,k)),pop:()=>X("lastChild"),shift:()=>X("firstChild"),splice:()=>{let[N,L,...R]=x;const{length:G}=f.children;for(let V=N>=0?Math.min(N+L-1,G-1):G-1;V>=(N>=0?N:G+N);V--)f.children[V].remove();if(R.length){let V=R.forEach((K,re)=>k(K,N+re));f.children[N]?f.children[N].after(...V):f.append(...V)}}}},p=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let x=this;return l==null||l.add(x),x.valProxy??(x.valProxy=se(f)?h(x,f):f,x.valProxy)},set val(x){let k=this,C=k.val;se(x)?(k.valProxy=h(k,x),c(k,"assign",x)):x!==C&&(k.valProxy=x,c(k)),k.oldVal=C}}),b=f=>f==null||f===!1?i("span"):f.nodeType?f:n.createTextNode(f),v=(f,x)=>{let k=new Set;return x.val=m(f,k),k},y=f=>{let x=p(),k=v(f,x);x.computed=!0;for(let C of k)C.listeners.push({computed:f,deps:k,state:x});return x},E=f=>{for(let x of[...f.listeners])v(x.computed,x.state)},S=(f,...x)=>{if(x.length){let k=[];for(let C of x.flat(1/0))C!=null&&k.push(ee(C)?H({deps:[C],render:()=>T=>T}):we(C)?D({renderInferred:C}):b(C));f.append(...k)}},I={},P=(f,x)=>f&&(Object.getOwnPropertyDescriptor(f,x)??P(ye(f),x)),A=(f,x,k)=>{var C;return I[f+","+x]??(I[f+","+x]=((C=P(k,x))==null?void 0:C.set)??0)},B=(f,x)=>new MutationObserver((k,C)=>{k.filter(T=>T.removedNodes).forEach(T=>[...T.removedNodes].find(_=>_===f&&(x({element:f}),C.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),M=f=>new Proxy(function(k,...C){var X;let[T,..._]=U(C),z=f?n.createElementNS(f,k):i(k);for(let[N,L]of Object.entries(T)){if(N.startsWith("bau"))continue;let R=A(k,N,ye(z))?G=>z[N]=G:G=>z.setAttribute(N,G);L==null||(ee(L)?H({deps:[L],render:()=>()=>(R(L.val),z)}):we(L)&&(!N.startsWith("on")||L.isDerived)?D({renderInferred:()=>(R(L({element:z})),z)}):L.renderProp?H({deps:L.deps,render:()=>()=>(R(L.renderProp({element:z})(...L.deps.map(le))),z)}):R(L))}return S(z,..._),(X=T.bauCreated)==null||X.call(T,{element:z}),T.bauMounted&&t.requestAnimationFrame(()=>T.bauMounted({element:z})),T.bauUnmounted&&t.requestAnimationFrame(()=>B(z,T.bauUnmounted)),z},{get:(x,k)=>x.bind(void 0,k)}),O=(f,x,k)=>{f.element=b(k);for(let C of x)ee(C)&&(r.add(C),C.bindings.push(f));return f.element},D=({renderInferred:f,element:x})=>{let k=new Set,C=m(f,k,{element:x});return O({renderInferred:f},k,C)},H=({deps:f,element:x,render:k,renderItem:C})=>O({deps:f,render:k,renderItem:C},f,k({element:x,renderItem:C})(...f.map(le))),j=(f,x,k)=>H({deps:[f],render:({renderItem:C})=>T=>(x.append(...ae(T,C)),x),renderItem:k}),W=f=>{s=!0,f(),s=!1,a.forEach(c),a.clear()};return{tags:M(),tagsNS:M,state:p,bind:H,loop:j,derive:y,stateSet:r,batch:W}}const pt=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},bt=(e,t,n,o)=>{const r=e.createElement("style");r.id=n,r.append(o),(t??e.head).append(r)},gt=(e,t)=>e.reduce((n,o,r)=>n+o+(t[r]??""),"");function ft(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(r,...a)=>{const s=gt(r,a),l=pt(s);return!t.getElementById(l)&&bt(t,e==null?void 0:e.target,l,o(l,s)),l};return{css:n((o,r)=>`.${o} { ${r} }`),keyframes:n((o,r)=>`@keyframes ${o} { ${r} }`),createGlobalStyles:n((o,r)=>r)}}function vt(e){return{bau:ht(),...ft(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function Y(e,t){const{bau:n,css:o}=e,r={root:o`
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
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    `};return function(...s){let[{color:l,variant:i="outline",size:m,disabled:d,href:c,...u},...h]=U(s);return(c?n.tags.a:n.tags.button)({...u,class:$(r.root,i,m,l,c?r.a:r.button,d&&r.disabled,t==null?void 0:t.class,u.class),disabled:d,href:c,...!c&&{type:"button"}},h)}}function wt(e){const{tr:t,bau:n,css:o,config:r}=e,{i:a,header:s,h1:l,div:i,a:m,img:d,b:c,ul:u,li:h}=n.tags,{svg:g,path:p}=n.tagsNS("http://www.w3.org/2000/svg"),b=n.state(!0),v=Y(e),y=()=>a({class:o`
          color: var(--font-color-inverse);
        `},g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},p({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>i({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"plain",color:"none",onclick:()=>b.val=!b.val},y()),m({href:`${r.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},c(t("Bau UI Components")))),S=()=>m({class:o`
          padding: 1rem;
        `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:`${r.base}/github-mark-white.svg`,width:30,height:30}));return function(){return s({class:o`
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
        `},E(),S())}}function yt({tr:e,bau:t,css:n}){const{footer:o,span:r,a,ul:s,li:l,p:i}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},r("version: 0.40.0"))}}function Te(e,t={}){return function({parent:o,animationHide:r,animationShow:a},s){s.style.animation=a;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((i,m)=>{i.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(c=>{o.style.position="relative";const u=c.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=r,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),m.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}const xe="0.3s",$e=({parent:e,grandParent:t})=>n=>{const{children:o,...r}=n,a=structuredClone(r);return a.children=o==null?void 0:o.map($e({parent:n,grandParent:e})),e&&(e.parentTree=t),a.parentTree=e,a},Ae=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const r=Ae(e)(t.children[o]);if(r)return r}},xt=({createGlobalStyles:e,keyframes:t})=>(e`
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
 `});function he(e,t){const{bau:n,css:o,window:r}=e,{base:a=""}=t,s=({currentTree:D,data:H,onclickBack:j})=>b(E({href:`${a}${D.parentTree.children[0].data.href}`,onclick:j({currentTree:D}),class:o`
            min-width: 3rem;
          `},"←"),E({href:`${a}${H.href}`,class:o`
            flex-grow: 1;
            justify-content: flex-start;
          `},H.name)),l=({name:D,href:H})=>v({href:`${a}${H}`},D),i=({subTree:D})=>{var H;return r.location.pathname.replace(a,"")===((H=D==null?void 0:D.data)==null?void 0:H.href)},{renderHeader:m=s,renderMenuItem:d=l,isActive:c=i}=t,{ul:u,li:h,nav:g,div:p,header:b,a:v}=n.tags,y=Te(),E=Y(e),{hideToLeft:S,hideToRight:I,showFromRight:P,showFromLeft:A}=xt(e),B=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      transition: background-color var(--transition-slow) ease-in-out;
      & a {
        padding: 0.5rem;
        border-radius: 0;
      }
      &:hover {
        background: var(--drill-down-menu-bg-hover);
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
        & a,
        span {
          text-decoration: none;
          width: 100%;
          color: inherit;
        }
      }
    }
  `,M=({variant:D,color:H,size:j,onclickItem:W,onclickBack:f,currentTree:x,pathnameState:k})=>{const{children:C,parentTree:T,data:_}=x;return console.log("Menu",x,k.val),p({class:$("drillDownMenu",D,H,j)},T&&m({data:_,currentTree:x,onclickBack:f}),C&&u(C.map(z=>h({class:()=>$(z.children&&"has-children",c({pathname:k.val,subTree:z})&&"is-active"),onclick:z.children&&W({currentTree:z})},d(z.data)))))},O=({tree:D,pathnameStateInitial:H})=>{let j=$e({})(D),W=Ae(H)(j);return W||(W=j),W};return function(H){const{variant:j="plain",color:W="neutral",size:f,tree:x,pathnameState:k=n.state(r.location.pathname),...C}=H,T=k.val,_=({currentTree:L})=>R=>X(R,N,L,!0),z=({currentTree:L})=>R=>X(R,N,L.parentTree,!1),X=(L,R,G,V)=>{R.firstChild.replaceChildren(y({parent:R,animationHide:`${V?S:I} ${xe}`,animationShow:`${V?P:A} ${xe}`},M({variant:j,color:W,size:f,currentTree:G,onclickItem:_,onclickBack:z,pathnameState:k})))},N=g({class:$(B,t==null?void 0:t.class,C.class)},p(M({variant:j,color:W,size:f,currentTree:O({tree:x,pathnameStateInitial:T}),onclickItem:_,onclickBack:z,pathnameState:k})));return N}}const kt={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Ie(e){const{tr:t,bau:n,css:o,config:r,states:a}=e,{div:s,ul:l,li:i,nav:m,a:d,span:c}=n.tags,u=he(e,{base:r.base});return function(){return s({class:o`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},u({tree:kt,pathnameState:a.pathname}))}}const Ct=e=>{const{bau:t,css:n}=e,{div:o}=t.tags,r=wt(e),a=Ie(e),s=yt(e);return function({componentState:i}){return o({class:n`
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
        `},r(),a(),o({class:n`
            grid-area: main;
            display: flex;
            margin: 0 1rem;
          `},()=>i.val&&i.val({})),s())}};function St(e){const{bau:t,css:n,config:o}=e,{div:r,h1:a,h2:s,p:l}=t.tags;Y(e);const i=n`
    padding: 0 1rem 1rem 1rem;
    & h1 {
      font-size: 56px;
      color: var(--color-primary);
    }
    & h2 {
      font-size: 48px;
    }
    & p {
      font-size: 24px;
      color: var(--color-emphasis-900);
    }
  `;return function({name:d,text:c,tagLine:u}){return r({class:i},a(d),s(c),l(u))}}function Et(e){const{bau:t,css:n}=e,{div:o,h1:r,p:a}=t.tags,s=n`
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & .feature {
      background-color: var(--color-emphasis-50);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 0.5rem;
      width: 30%;
      & h1 {
        font-size: 1.1rem;
      }
      & p {
        color: var(--font-color-secondary);
      }
    }
    @media (max-width: 640px) {
      flex-direction: column;
      & .feature {
        width: 90%;
      }
    }
  `,l=({title:i,Content:m})=>o({className:"feature"},r(i),a(m()));return function({featuresContent:m}){return o({class:s},m.map(l))}}function Tt(e){const{bau:t,css:n,config:o}=e,{div:r,p:a,a:s}=t.tags,l=St(e),i=Et(e),m=Y(e),d=n`
    grid-area: main;
  `,c=[{title:"UI components for the web",Content:()=>[a("Over 25 components such as button, input, tabs, autocomplete etc ..."),m({href:`${o.base}/components`,color:"primary",variant:"solid"},"Visit Gallery")]},{title:"Component style",Content:()=>[a("Each component has a combination of variant, color and size:"),a("3 variant: plain, outline and primary"),a("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[a("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),a("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[a("The component bundle size is about 8x smaller compared to popular React UI component library."),a("Faster download time for users."),a("Save in bandwith fees for the operator."),a("Suitable for low bandwith network and low cost device.")]}];return function({}){return r({class:d},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),i({featuresContent:c}))}}function Me(e,t){const{bau:n,css:o}=e,{accordionDefs:r}=t,{div:a,ul:s,li:l,header:i,h3:m,button:d}=n.tags,c=n.state(""),u=p=>b=>{c.val==p?c.val="":c.val=p},h=({element:p,open:b})=>{const v=()=>{p.removeEventListener("transitionend",v)};function y(S){S.addEventListener("transitionend",v),window.requestAnimationFrame(()=>{S.style.height="0px"})}function E(S){S.addEventListener("transitionend",v),S.style.height=S.scrollHeight+"px"}p.scrollHeight!=0&&(b?E(p):y(p))},g=o`
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
  `;return function(...b){let[{color:v,variant:y="outline",size:E,content:S,...I},...P]=U(b);const A=B=>{const{Header:M,Content:O,name:D}=B;return l({class:$(v,y,E),onclick:u(D)},m({class:()=>$(c.val==D&&"active")},d({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:H})=>c.val==D},M(B))),a({class:"content",role:"region",id:`bau-${D}`,"data-state":({element:H})=>{const j=c.val==D;return h({element:H,open:j}),j}},O(B)))};return a({class:$("accordion",g,t==null?void 0:t.class,I.class)},s(r.map(A)))}}const J=["neutral","primary","success","danger","warning"],$t=["plain","outline","solid"],F=e=>{const{bau:t,css:n}=e,{div:o,table:r,tbody:a,tr:s,td:l,thead:i,th:m}=t.tags;return function({Item:c,name:u}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},r(i(s(m(u??"Variant/Color"),J.map(h=>m(h)))),a($t.map(h=>s(m(h),J.map((g,p)=>l(c({color:g,variant:h},{index:p}))))))))}},At=e=>{const{tr:t,bau:n,css:o}=e,{article:r,div:a,h3:s,h2:l,h1:i,p:m}=n.tags,d=F(e),c=(...g)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),h=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(m("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(m("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(m("Item 3 content"))}]});return()=>r({id:"accordion"},i(t("Accordion")),l("Accordion Table"),d({Item:g=>h({...g})}),l("Customization"),s("Default Accordion"),c(h({})),s("Accordion width: fit-content"),c(h({color:"warning",class:o`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),c(h({color:"success",variant:"outline",class:o`
            &.accordion {
              & ul {
                & li {
                  & h3 {
                    &::after {
                      content: "\u002B";
                    }
                  }
                  & h3.active {
                    &::after {
                      transform: rotate(45deg);
                    }
                  }
                }
              }
            }
          `})))},It={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Mt=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`};function oe(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;Mt({css:o,createGlobalStyles:r});const s=o`
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
  `,l=Y(e),i=({onclick:m})=>l({"aria-label":"Close",onclick:m,class:"button-close"},"✖");return function(d,...c){const{variant:u="outline",color:h="neutral",size:g,onRemove:p,...b}=d;return a({...b,class:$(`alert-${u}`,u,h,g,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},a({class:"icon"},It[h]),a({class:"content"},...c),p&&i({onclick:p}))}}const Bt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h4:i,p:m}=n.tags,d=F(e),c=oe(e),u=oe(e,{class:o`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>r({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),a(c({color:"danger"},i("Something went wrong"),m("Error code ",404),m("Status ","Not Found"))),s("Custom Alert"),a(u({color:"warning"},i("My message"))),s("Alert Table"),d({Item:h=>c({...h},`Alert ${h.color}`)}))},Dt=(e,t={})=>{const{bau:n,css:o,keyframes:r}=e,{limit:a=10,deleteAfterDuration:s=15e3}=t,{div:l}=n.tags,i=n.state([]),m={inserting:r`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:r`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:o`
      min-width: 300px;
      max-width: 90% vw;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:o`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      animation: ${m.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${m.removing} var(--transition-slow) ease-out;
    `},c=({id:u,status:h})=>{const g=i.val.findIndex(p=>p.id===u);g!=-1&&(i.val[g].status=h)};return function(h={},...g){const p=({id:y})=>{c({id:y,status:"removing"});const E=i.val.findIndex(S=>S.id===y);E!=-1&&i.val.splice(E,1)},b=({Component:y})=>{const E={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};i.val.length>=a&&p({id:i.val[0].id}),i.val.push(E),setTimeout(()=>p(E),s)},v=y=>l({class:d.item,onclick:()=>p(y)},y.Component());return document.addEventListener("alert.add",y=>b(y.detail)),document.addEventListener("alert.remove",y=>p(y.detail)),l({class:$(d.stack,t==null?void 0:t.class,h.class)},n.loop(i,l(),v))}},Pt=e=>{const{tr:t,bau:n}=e,{section:o,h1:r}=n.tags,a=Dt(e,{deleteAfterDuration:2e4}),s=Y(e),l=oe(e);return function(){return o({id:"alert-stack"},a(),r("Alert stack"),s({color:"success",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},zt=({keyframes:e})=>({hideRight:e`
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
 `}),Nt=e=>{const{bau:t}=e,{section:n,div:o,h1:r}=t.tags,a=Te(),s=Y(e),l=zt(e);return function(){const i=t.state(!0),m=o(),d=c=>{m.replaceChildren(a({parent:m,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},o(c.val?"Ciao":"")))};return d(i),n({id:"animate"},o(r("Test Animate"),o(s({onclick:()=>{i.val=!i.val,d(i)}},()=>i.val?"Hide":"Show")),m))}};function Be(e,t){const{bau:n}=e,{span:o,img:r}=n.tags,a=n.state(!0),s=n.state(!1),l=()=>a.val=!1,i=m=>{a.val=!1,s.val=!0};return function(...d){let[{color:c,variant:u="outline",size:h,width:g=60,height:p=60,...b},...v]=U(d);return o({class:$(t==null?void 0:t.class,b.class)},()=>a.val?"Loading...":"",()=>s.val&&"Error",r({width:g,height:p,onload:l,onerror:i,class:$(t==null?void 0:t.class,c,u,h,b.class),...b}))}}const Lt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,h2:a,h3:s}=n.tags,l=o`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=F(e),m=Be(e,{class:o`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>r({id:"avatar"},a(t("Avatar")),m({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),m({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),m({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),i({Item:d=>m({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function pe(e,t){const{bau:n,css:o,window:r}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...i){let[{contentEl:m,triggerEl:d,onClose:c,...u},...h]=U(i);const g=v=>{b.style.opacity=1,b.showModal();const y=d.getBoundingClientRect(),E=b.getBoundingClientRect();y.x<r.innerWidth/2?b.style.left=y.left+"px":b.style.left=y.right-E.width+"px",y.y<r.innerHeight/2?b.style.top=y.top+y.height+"px":b.style.top=y.top-E.height+"px"},p=v=>{const y=()=>{b.close(),b.removeEventListener("transitionend",y)};b.addEventListener("transitionend",y),b.style.opacity=0},b=a({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:v=>v.target===b&&(p(),c==null?void 0:c.call())},m);return b.closeDialog=p,b.openDialog=g,b}}function De(e,t){const{bau:n,css:o}=e,{div:r,input:a,ul:s,li:l,i,span:m,button:d}=n.tags,c=pe(e),u=o`
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
  `,h=n.state(""),g=n.state(""),p=n.state(!1),b=n.state(0),v=()=>{p.val=!1};return function(...E){let[{variant:S="outline",color:I,size:P,id:A,label:B,placeholder:M,Option:O,options:D,getOptionLabel:H=({label:G})=>G,...j},...W]=U(E);const f=n.state(D),x=()=>{R.openDialog(),p.val=!0,g.val="",f.val=D},k=()=>{R.closeDialog(),p.val=!1,g.val=""},C=G=>{const{value:V}=G.target;g.val=V,V?f.val=D.filter(K=>H(K).match(new RegExp(`${V}`,"i"))):f.val=D},T=G=>{console.log("onclickButton",p.val),p.val?k():x()},_=G=>V=>{h.val=H(G),k()},z=G=>{switch(G.key){case"Escape":k();break;case"ArrowDown":b.val++;break;case"ArrowUp":b.val--;break;case"Enter":h.val=H(f.val[b.val]),g.val="",k();break}},X=d({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":B,onclick:T,class:$(S,I,P)},()=>!h.val&&B,h),N=a({id:A,value:g,placeholder:M,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":p,oninput:C,onkeydown:z,class:$(S,I,P)}),R=c({id:A,triggerEl:X,contentEl:(()=>r({class:$(S,I,P,"content")},N,()=>s(f.val.map((G,V)=>l({class:()=>$(b.val==V&&"active"),onclick:_(G)},O(G))))))(),onClose:v});return r({...j,class:$("autocomplete",u,t==null?void 0:t.class,j==null?void 0:j.class)},X,R)}}const Ht=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:i}=n.tags,m=(...g)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=F(e),c=De(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],h=g=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>r({id:"autocomplete",class:o``},l(t("Autocomplete")),s("Basic Autocomplete"),m(c({options:u,Option:h,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:g=>c({...g,options:u,Option:h,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",id:"country"})}))};function ie(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,content:c,...u},...h]=U(l);return r({...u,class:$("badge",a,t==null?void 0:t.class,u==null?void 0:u.class)},r({class:$(i,m,d)},c),...h)}}const jt=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s}=t.tags,l=(...c)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),i=F(e),m=ie(e),d=ie(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>o({id:"badge"},s("Badge"),a("Basic Badge"),l(m({content:"10"},"☏")),a("Badges Table"),i({Item:(c,{index:u})=>m({...c,content:`${u*100}`},"☏")}),a("Badge custom"),l(d({content:"1"},"☏")))};function Pe(e,t){const{bau:n,css:o}=e,{ul:r,li:a,a:s,span:l}=n.tags,i=o`
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
  `;return function(...d){let[{color:c,variant:u="outline",size:h,items:g,...p},...b]=U(d);return r({...p,class:$(i,t==null?void 0:t.class,p==null?void 0:p.class)},g.map(({href:v,name:y})=>a((v?s:l)({href:v,class:$(c,u,h)},y))))}}const Ot=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=F(e),i=Pe(e);return()=>o({id:"breadcrumbs"},r(t("Breadcrumbs")),a("Bacis Breadcrumb"),i(s),a("Breadcrumbs Table"),l({Item:m=>i({...m,...s})}))},Gt=e=>{const{bau:t,css:n}=e,{section:o,p:r,h3:a}=t.tags,s=F(e),l=Y(e);return()=>o({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},a("Button Examples"),s({Item:i=>l({...i},`${i.variant} ${i.color}`)}),a("Full With"),r(l({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),a("Icon"),r(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},Ft=()=>J.map(e=>`
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
`);function ze(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
    ${Ft()}
  `;return function(...l){let[{variant:i="outline",size:m="md",color:d,...c},...u]=U(l);return r({...c,class:$("button-group",a,i,d,m,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Rt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=Y(e),i=ze(e);return()=>o({id:"button-group"},r(t("Button Group Examples")),a("Outline"),i({},l({},"ONE"),l({},"TWO"),l({},"THREE")),a("Button Group Table"),s({Item:m=>i({...m},l({},"ONE"),l({},"TWO"),l({},"THREE"))}))};function ce(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>J.map(l=>`
&.calendar.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()}
  `;return function(...i){let[{color:m="neutral",variant:d="plain",size:c,...u},...h]=U(i);return r({...u,type:"date",class:$("calendar",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Vt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,label:i}=n.tags,m=F(e),d=(...g)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),c=n.state("2023-08-08"),u=ce(e),h=ce(e,{class:o`
      background-color: lightseagreen !important;
    `});return()=>r({id:"calendar"},l(t("Calendar")),a("Date: ",c),s("Basic Calendar"),d(i({for:"start"},"Start date:",u({id:"start",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar min and max"),d(i("End date:",u({min:"2023-01-01",max:"2023-12-31",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar custom"),d(h({})),s("Calendar Table"),m({Item:g=>u({...g})}))};function Ne(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:i,variant:m="outline",color:d="neutral",onclick:c,...u},...h]=U(l);return r({...u,onclick:c,class:$("chip",a,i,m,d,c&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Ut=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l}=n.tags,i=F(e),m=(...c)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),d=Ne(e);return()=>r({id:"chip"},l(t("Chip")),s("Chip Default"),m(d("My Chip")),s("Chip Clickable"),m(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),i({Item:c=>d({...c},`Chip ${c.color}`)}))};function Le(e,t={}){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,...c},...u]=U(l);return r({type:"checkbox",required:"required",...c,class:$(a,i,m,d,t==null?void 0:t.class,c==null?void 0:c.class)})}}const _t=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,label:s,h2:l,form:i}=n.tags,m=F(e),d=Le(e),c=n.state(!1),u=n.state(!1),h=p=>b=>{p.val=!!b.target.checked},g=(...p)=>a({class:o`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...p);return()=>r({id:"checkbox"},i(l(t("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:c,onchange:h(c)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:h(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),m({Item:(p,{index:b})=>d({id:`myCheckbox-${b}`,name:`myCheckbox-${b}`,...p})})))};function Xt(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,openState:c,...u},...h]=U(l);return r({class:$(a,t==null?void 0:t.class,u.class)},r({class:()=>$("overlay",c.val&&"overlay-open"),onclick:()=>{c.val=!1}}),r({class:()=>$("content",c.val&&"content-open")},h))}}const Wt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r}=n.tags,a=n.state(!1),s=Xt(e),l=Y(e),i=Ie(e);return()=>o({id:"drawer"},r(t("Drawer")),l({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},i()))},qt=e=>{const{tr:t,bau:n,window:o,config:r}=e,{section:a,h2:s,h3:l}=n.tags,i=n.state(o.location.pathname.replace(r.base,"")),m=F(e),d={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},c=he(e,{base:r.base+"/components/drillDownMenu"});return()=>a({id:"drillDownMenu"},s(t("Drill Down Menu")),c({tree:d,pathnameState:i}),l("Drill Down Table"),m({Item:u=>c({tree:d,...u})}))};function He(e,t){const{bau:n,css:o}=e,{div:r,span:a,label:s,input:l}=n.tags,i={base:o`
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
    `,disabled:o`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(d,...c){const{variant:u="outline",color:h="neutral",size:g,Component:p,disabled:b,...v}=d;return r({class:$(i.base,b&&i.disabled,t==null?void 0:t.class,d.class)},s({class:$(u,h,g)},p({disabled:b}),l({type:"file",disabled:b,...v})),a({class:"filename-display"}))}}const Yt=e=>{const{tr:t,bau:n,css:o}=e,{svg:r,use:a}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:i,h2:m,span:d}=n.tags,c=F(e),u=n.state("No file selected"),h=He(e),g=b=>{const v=b.target.files[0];v?u.val=v.name:u.val="No file selected"},p=({disabled:b})=>l({class:$(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},a({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},m(t("FileInput Examples")),i("File Input"),h({Component:p,name:"file",accept:"text/*",onchange:g}),l("File selected: ",u),i("File Input disabled"),h({Component:p,name:"file",accept:"text/*",disabled:!0,onchange:g}),i("File Input Table"),c({Item:b=>h({Component:p,name:"file",accept:"text/*",onchange:g,...b})}))},Kt=()=>J.map(e=>`
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
`);function je(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
    ${Kt()}
  `;return function(l){const{size:i,variant:m="outline",color:d="neutral",name:c,id:u,disabled:h,...g}=l;return r({...g,class:$("input",i,d,m,a,t==null?void 0:t.class,g.class)})}}const Zt=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=F(e),i=je(e);return()=>o({id:"input"},s(t("Input Examples")),a("Standard"),r(i({id:"my-Input",name:"Label",label:"Label"})),a("Disabled"),r(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),a("Input with error"),r(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),a("Input Table"),l({Item:m=>i({name:"my-input",id:"my-input-with",placeholder:"Enter text",...m})}))};function Oe(e,t){const{bau:n,css:o}=e,{dialog:r}=n.tags,s=o`
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
    ${(()=>J.map(l=>`
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
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...h]=U(i);return r({class:$("modal",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Jt=e=>{const{tr:t,bau:n}=e,{section:o,main:r,h2:a,header:s,footer:l,p:i,div:m}=n.tags,d=F(e),c=Y(e),u=Oe(e),h=()=>r(Array(10).fill("").map((b,v)=>i(v+1,". Some text here"))),g=b=>{const v=u({id:"my-dialog",...b},s("Header"),h(),l(c({variant:"outline",onclick:()=>{v.close()}},"Cancel"),c({variant:"solid",onclick:()=>{v.close()}},"OK")));return v},p=g({});return()=>o({id:"modal"},a(t("Modal Examples")),c({variant:"solid",onclick:()=>{p.showModal()}},"OPEN MODAL"),p,a(t("Modal Table")),d({Item:b=>{const v=g(b);return m(c({...b,onclick:()=>{v.showModal()}},"OPEN MODAL"),v)}}))},Qt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h1:i,p:m}=n.tags,d=Y(e),c=(...I)=>a({class:o`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...I),u=pe(e),g=(()=>d({onclick:()=>v.open?v.closeDialog():v.openDialog()},"Click"))(),p=()=>a({},i("My content"),m("My Content")),b=p(),v=u({id:"my-popover-left",triggerEl:g,contentEl:b}),y=d({onclick:()=>S.open?S.closeDialog():S.openDialog()},"Click"),E=p(),S=u({id:"my-popover-left",triggerEl:y,contentEl:E});return()=>r({id:"popover",class:o``},l(t("Popover")),s("Basic Popover"),c(a(g,v),a(y,S)))};function Ge(e,t){const{bau:n,css:o}=e,{div:r,ul:a,li:s,button:l}=n.tags,i=pe(e),m=o`
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
  `,d=n.state(""),c=n.state(!1),u=n.state(0);return function(...g){let[{color:p="neutral",variant:b="outline",size:v,id:y,label:E,Option:S,options:I,getOptionLabel:P=({label:C})=>C,...A},...B]=U(g);const M=()=>{k.openDialog(),c.val=!0},O=()=>{k.closeDialog(),c.val=!1},D=()=>{c.val=!1},H=C=>{c.val?O():M()},j=C=>T=>{d.val=P(C),O()},W=C=>{switch(C.preventDefault(),C.key){case"Escape":O();break;case"ArrowDown":u.val<I.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=I.length-1:u.val--;break;case"Enter":c.val?(d.val=P(I[u.val]),O()):M();break}},f=()=>a(I.map((C,T)=>s({class:()=>$(u.val==T&&"active"),onclick:j(C)},S(C)))),x=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":c,"aria-label":E,onclick:H,class:$(p,b,v)},()=>!d.val&&E,d),k=i({id:y,triggerEl:x,contentEl:f(),onClose:D});return r({...A,class:$("select",m,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:W},x,k)}}const ea=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:i}=n.tags,m=(...g)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=F(e),c=Ge(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],h=g=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>r({id:"select",class:o``},l(t("Select")),s("Basic Select"),m(c({options:u,Option:h,getOptionLabel:({label:g})=>g,label:"Select a country..."})),l(t("Select Table")),d({Item:g=>a(c({...g,options:u,Option:h,getOptionLabel:({label:p})=>p,label:"Select a country..."}))}))};function ne(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    ${(()=>J.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...h]=U(i);return r({...u,type:"range",class:$("slider",m,d,c,s,t==null?void 0:t.class,u.class)},...h)}}const ta=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:i,label:m,datalist:d,option:c,br:u}=n.tags,h=n.state(0),g=S=>{h.val=S==null?void 0:S.target.value},p=(...S)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),b=F(e),v=ne(e),y=ne(e),E=ne(e);return()=>r({id:"slider"},l(t("Slider")),i("Slider value: ",h),s("Basic Slider"),p(v({oninput:g,name:"slider-simple"})),s(t("Slider Table")),b({Item:S=>v(S)}),s("Slider Min Max: -1000 1000"),p(y({oninput:g,min:-1e3,max:1e3})),s("Slider Step 20"),p(v({oninput:g,step:20,min:-100,max:100})),s("Slider Vertical"),p(a({class:o`
              display: flex;
            `},v({oninput:g,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:o`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:o`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(S=>c({value:Number(S),label:S}))))),s("Slider with mark"),p(m({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:g,class:o`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:o`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(S=>c({value:Number(S),label:S})))))},ke={sm:16,md:32,lg:64};function be(e,t={}){const{bau:n,css:o}=e,{svg:r,animate:a,animateTransform:s,rect:l}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:m="md",color:d="color-base",variant:c="outline",visibility:u=!0,...h}={}){return r({class:$(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,h.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:ke[m],height:ke[m],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},a({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const aa=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=be(e);return()=>o({id:"spinner"},r(t("Spinner Examples")),a(t("Spinner Table")),s({Item:i=>l(i)}))},na=()=>J.map(e=>`
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
`);function Fe(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
    ${na()}
  `;return function(...l){let[{color:i="neutral",variant:m="plain",size:d,...c},...u]=U(l);return r({...c,class:$("switch",a,i,m,d,t==null?void 0:t.class,c.class),type:"checkbox",required:"required"},...u)}}const oa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,label:s,div:l,h2:i}=n.tags,m=F(e),d=Fe(e);return()=>r({id:"switch"},i(t("Switch Examples")),a(l({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-shinny-switch"},"My shinny switch"),d({id:"my-shinny-switch"}))),i(t("Switch Table")),m({Item:c=>l({class:o`
                & label {
                  display: inline-flex;
                  border: 1px dotted var(--color-emphasis-200);
                  font-size: smaller;
                  align-items: center;
                  color: var(--color-content-secondary);
                  padding: 0.2rem;
                }
              `},s("off ",d({...c,id:`my-switch-example-off-${c.color}-${c.variant}`})),s("on ",d({...c,id:`my-switch-example-on-${c.color}-${c.variant}`,checked:!0})))}))};function de(e,t){const{bau:n,css:o}=e,{tabDefs:r}=t,{div:a,ul:s,li:l}=n.tags,i=n.state(r),m=n.state(r[0]),d=u=>i.val.find(h=>h.name==u),c={base:o`
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
    `};return function(...h){let[{color:g,variant:p="plain",size:b,...v},...y]=U(h);const E=I=>{const{Header:P,disabled:A,name:B}=I;return l({class:()=>$(m.val.name==B&&"active",A&&"disabled"),onclick:M=>M.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},P(I))},S=a({class:$(c.base,p,b,g,t==null?void 0:t.class,v.class)},n.loop(i,s(),E),()=>m.val.Content?m.val.Content({}):"");return S.addEventListener("tab.select",I=>{var B,M;const{tabName:P}=I.detail,A=d(P);A&&((B=m.val.exit)==null||B.call(),m.val=A,(M=A.enter)==null||M.call())},!1),S.addEventListener("tab.add",I=>{var A;const{tab:P}=I.detail;(A=P.enter)==null||A.call(),i.val.push(P)},!1),S.addEventListener("tab.remove",I=>{var A;const P=i.val.findIndex(B=>B.name==I.detail.tabName);P>0&&((A=i.val[P].exit)==null||A.call(),i.val.splice(P,1))},!1),S}}const ra=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:i,i:m}=n.tags,d=F(e),c=Y(e),u=(...y)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...y),h=()=>({name:"New Tab",Header:({name:y})=>a(y),Content:()=>a("My Paragraph")}),p=de(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My tab Disabled"))}]}),v=de(e,{tabDefs:[{name:"Tab1",Header:()=>a(m({class:o`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>a({class:o`
              > button {
                margin: 10px;
              }
            `},c({onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:h()},bubbles:!0}))},"Add a new Tab"),c({accent:!0,onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),i("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My Content"))}]});return()=>r({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(p({})),s("Full Witdth"),u(p({class:o`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(p({class:o`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(p({class:o`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(p({class:o`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(p({class:o`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(v({})),l(t("Tabs Table")),d({Item:y=>p(y)}))};function Q(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;r`
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
`;const s=o`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...i){let[{...m},...d]=U(i);return a({...m,class:$("table-container",s,t==null?void 0:t.class,m==null?void 0:m.class)},...d)}}const sa=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,th:l,td:i,tr:m,table:d,thead:c,tbody:u,caption:h}=t.tags;function g(B,M,O,D,H){return{name:B,calories:M,fat:O,carbs:D,protein:H}}const p=[g("Frozen yoghurt",159,6,24,4),g("Ice cream sandwich",237,9,37,4.3),g("Eclair",262,16,24,6),g("Cupcake",305,3.7,67,4.3),g("Gingerbread",356,16,49,3.9)],b=(...B)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...B),v=({name:B,calories:M})=>m(i(B),i({class:n`
            text-align: right;
          `},M)),y=()=>c(m(l({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),l({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),E=Q(e,{class:n`
      max-width: 650px;
    `}),S=Q(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),I=Q(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),P=Q(e,{class:n`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),A=Q(e,{class:n`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>o({id:"table"},s(m("Table")),a("Basic Table"),b(E(d(h("Basic Table"),y(),u(p.map(v))))),a("Dense Table"),b(S(d(h("Dense Table"),y(),u(p.map(v))))),a("Zebra Table"),b(I(d(h("Zebra Table"),y(),u(p.map(v))))),a("Caption Bottom"),b(P(d(h("Caption Bottom Table"),y(),u(p.map(v))))),a("Overflow Header"),b(A(d(h("Overflow Header"),y(),u(p.map(v))))))};function Re(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=Y(e),s=be(e),l=o`
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
  `,i=({label:h,icon:g,...p})=>a({variant:"plain","aria-label":h,title:h,...p},g),m=({count:h,totalCount:g,page:p,rowsPerPage:b})=>r({class:"pages-numbers"},Number(p-1)*Number(b)+(h>0?1:0),"-",Math.min(p*b,g)," of ",g),d=({count:h,page:g,rowsPerPage:p})=>r({class:"pages-numbers"},(g-1)*p+(h>0?1:0),"-",g*p),c=h=>h<=1,u=(h,g,p)=>h>=Math.ceil(g/p);return function(...g){let[{count:p=0,totalCount:b=0,page:v=1,rowsPerPage:y=50,onPageChange:E,isLoading:S=!1,disableFirst:I=()=>c(v),disablePrevious:P=()=>c(v),disableNext:A=()=>u(v,b,y),disableLast:B=()=>u(v,b,y),...M},...O]=U(g);const D=Math.max(0,Math.ceil(b/y)),H=E({page:1}),j=E({page:v-1}),W=E({page:v+1}),f=E({page:D});return r({...M,class:$("table-pagination",l,S&&"disabled",t==null?void 0:t.class,M==null?void 0:M.class)},s({class:"spinner",visibility:S,size:"md"}),b>0?m({count:p,totalCount:b,page:v,maxPages:D,rowsPerPage:y}):d({count:p,page:v,maxPages:D,rowsPerPage:y}),r(i({label:"First",icon:"⟪",onclick:H,disabled:I()}),i({label:"Previous",icon:"⟨",onclick:j,disabled:P()}),i({label:"Next",icon:"⟩",onclick:W,disabled:A()}),i({label:"Last",icon:"⟫",onclick:f,disabled:B()})))}}const la=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),ia=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:i}=t.tags,m=la(45),d=({name:y,email:E})=>a(r(y),r(E)),c=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=Re(e),h=Q(e,{class:n`
      max-width: 650px;
    `}),g=t.state(m),p=t.state({count:m.length,totalCount:m.length,page:1,rowsPerPage:10}),b=t.derive(()=>g.val.slice(p.val.page*p.val.rowsPerPage,(p.val.page+1)*p.val.rowsPerPage)),v=({page:y})=>E=>{p.val.page=y};return()=>h(s(c(),()=>i(b.val.map(d))),()=>u({...p.val,onPageChange:v}))},ca=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:i,div:m}=t.tags,d=t.state(!1),c=t.state([]),u=t.state(""),h=t.derive(()=>c.val.length),g=t.state(1),p=t.state(10),b=t.derive(()=>c.val),v=M=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(M).toString()}`,y=({page:M})=>O=>{g.val=M,E(v({page:M,per_page:p.val}))};E(v({page:1,per_page:p.val}));async function E(M){try{d.val=!0;const O=await fetch(M,{});if(O.ok){const D=await O.json();c.val=D;return}throw O}catch(O){u.val=O.message}finally{d.val=!1}}const S=({name:M,description:O,stargazers_count:D})=>a(r(M),r(O),r({class:n`
            text-align: right;
          `},D)),I=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=Re(e),A=Q(e,{class:n`
      min-width: 650px;
    `}),B=({message:M})=>m(M);return()=>A(()=>P({rowsPerPage:p.val,page:g.val,count:h.val,totalCount:-1,isLoading:d.val,onPageChange:y,disableNext:()=>!1}),s(I(),()=>u.val&&B({message:u.val}),()=>i(b.val.map(S))))},da=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,tr:l}=t.tags,i=ia(e),m=ca(e),d=(...c)=>r({class:n`
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
        `},...c);return()=>o({id:"pagination"},s(l("Table Pagination")),a("Asynchronous Pagination"),d(m()),a("Simple Pagination"),d(i()))};function ue(e,t){const{bau:n,css:o,window:r}=e,{div:a}=n.tags,s=o`
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
  `;return function(...i){let[{titleEl:m,side:d="bottom-start",color:c="neutral",variant:u="outline",size:h,...g},...p]=U(i);const b=a({class:$("container",...d.split("-"))},a({class:$("content",c,u,h),role:"tooltip"},m)),v=A=>`move-to-${A}`,y=(A,B,M)=>{if(A()){const O=v(B);b.classList.add(O),b.classList.add(B),b.classList.remove(M)}},E=(A,B)=>{const M=v(A);b.classList.contains(M)&&(b.classList.remove(M),b.classList.add(B),b.classList.remove(A))},S=A=>{const B=b.getBoundingClientRect();y(()=>B.x<0,"right","left"),y(()=>B.x+B.width>r.innerWidth,"left","right"),y(()=>B.y<0,"bottom","top"),y(()=>B.bottom>r.innerHeight,"top","bottom"),b.classList.add("visible")},I=A=>{b.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return a({...g,class:$("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",I)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",I)}},...p,b)}}const ua=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h2:s,em:l,p:i}=n.tags,m=F(e),d=Y(e),c=ue(e),u=ue(e,{class:o`
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
    `}),h=()=>a({class:o`
          font-size: larger;
        `},i("A ",l("tooltip")," can be any component")),g=()=>[a({class:o`
          display: flex;
          justify-content: space-around;
        `},c({side:"top-start",titleEl:h()},d({},"top-start")),c({side:"top-centered",titleEl:h()},d({},"top-centered")),c({side:"top-end",titleEl:h()},d({},"top-end"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-start",titleEl:h()},d({},"left-start")),c({side:"right-start",titleEl:h()},d({},"right-start"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-centered",titleEl:h()},d({},"left-centered")),c({side:"right-centered",titleEl:h()},d({},"right-centered"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-end",titleEl:h()},d({},"left end")),c({side:"right-end",titleEl:h()},d({},"right end"))),a({class:o`
          display: flex;
          justify-content: space-around;
        `},c({side:"bottom-start",titleEl:h()},d({},"bottom start")),c({side:"bottom-centered",titleEl:h()},d({},"bottom centered")),c({side:"bottom-end",titleEl:h()},d({},"bottom end")))];return()=>r({id:"tooltip"},s(t("Tooltip")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},g()),s(t("Tooltip moved")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},g()),s(t("Tooltip custom")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},u({titleEl:h()},d({},"custom tooltip"))),s(t("Tooltip Table")),m({Item:p=>c({titleEl:h(),...p},d({},`${p.color} ${p.variant}`))}))},ma="light";function Ve(e,t){const{bau:n,css:o,window:r}=e,{input:a}=n.tags,s=d=>{r.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},i=l();i?s(i):r.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(ma);const m=o`
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
  `;return function(...c){let[{color:u,variant:h="outline",size:g,...p},...b]=U(c);return a({required:"required",title:"Switch Theme",...p,class:$(m,u,h,g,t==null?void 0:t.class,p.class),type:"checkbox",checked:l()=="dark",onclick:v=>{s(v.target.checked?"dark":"light")}},...b)}}const ha=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,div:s,h2:l}=n.tags,i=F(e),m=Ve(e);return()=>r({id:"theme-switch"},l(t("Theme Switch")),a(s({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},m({}))),l(t("Theme Switch Table")),i({Item:d=>m(d)}))},pa=({css:e,createGlobalStyles:t})=>(t`
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
    `});function Ue(e,t){const{bau:n,css:o,createGlobalStyles:r,window:a}=e,{renderMenuItem:s}=t,{ul:l,li:i,nav:m,div:d}=n.tags,c=pa({css:o,createGlobalStyles:r}),u=({element:b,closeState:v})=>{b.scrollHeight!=0&&(v.val?h(b):g(b))};function h(b){b.style.height=b.scrollHeight+"px";const v=()=>{b.removeEventListener("transitionend",v)};b.addEventListener("transitionend",v),a.requestAnimationFrame(()=>{b.style.height="0px"})}function g(b){const v=()=>{b.removeEventListener("transitionend",v),b.style.height=null};b.addEventListener("transitionend",v),b.style.height=b.scrollHeight+"px"}const p=({depth:b=1,maxDepth:v})=>y=>{const{children:E,expanded:S}=y,I=n.state(!S);return i({class:()=>$(E?I.val?c.collapsed:c.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:P=>{E&&(I.val=!I.val)}},s(y.data)),E&&b<v&&l({bauMounted:({element:P})=>{I.val&&(P.style.height="0px")},"aria-expanded":({element:P})=>(u({element:P,closeState:I}),!I.val)},E.map(p({depth:b+1,maxDepth:v}))))};return function({tree:v,maxDepth:y=1/0,size:E,variant:S="plain",color:I="neutral",...P}){return m({class:$(c.nav,E,S,I,t==null?void 0:t.class,P.class)},v.children&&l(v.children.map(p({maxDepth:y}))))}}const ba=e=>{const{tr:t,bau:n}=e,{section:o,a:r,h2:a,h3:s}=n.tags,l=F(e),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=Ue(e,{renderMenuItem:({name:c,href:u})=>r({href:u,onclick:h=>{h.preventDefault()}},c)});return()=>o({id:"treeview"},a(t("Tree View")),s(t("Tree View Default")),d({tree:i}),s(t("Tree View Table")),l({Item:c=>d({...c,tree:i})}))};function ga(e,t={}){const{bau:n,css:o}=e,{div:r,span:a,pre:s,h3:l,h4:i}=n.tags;return function(d,...c){return r("Login")}}const fa=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=ga(e);return()=>o({id:"login"},s(t("Login Examples")),a("Basic"),r(l()))};function va(e){const{tr:t,bau:n,css:o}=e,{div:r,article:a,h1:s}=n.tags;return function(){return r({class:o`
          grid-area: main;
          display: flex;
        `},a({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),fa(e)()))}}const wa=e=>{const{bau:t,css:n,config:o}=e,{section:r,div:a,h1:s,span:l,p:i,ul:m,li:d,a:c,main:u,header:h,footer:g,label:p}=t.tags,{svg:b,use:v}=t.tagsNS("http://www.w3.org/2000/svg"),y=F(e),S=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(i("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(i("Item 3 content"))}]}),I=oe(e),P=De(e),A=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],B=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),M=Be(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),O=ie(e),D={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},H=Pe(e),j=Y(e),W=ze(e),f=ce(e),x=Le(e),k=Ne(e),C={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},T=he(e,{base:o.base+"/components"}),_=({disabled:w})=>a({class:$(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,w&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},b({width:100,height:100,fill:"currentColor"},v({href:"uploadIcon.svg#Capa_1"})),l("Choose a file to upload")),z=He(e),X=je(e),N=Oe(e),L=()=>u(Array(10).fill("").map((w,q)=>i(q+1,". Some text here"))),R=w=>{const q=N({id:"my-dialog",...w},h("Header"),L(),g(j({variant:"outline",onclick:()=>{q.close()}},"Cancel"),j({variant:"solid",onclick:()=>{q.close()}},"OK")));return q},G=Ge(e),V=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],K=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),re=ne(e),_e=be(e),fe=Fe(e),Xe=de(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My tab Disabled"))}]}),We=Ve(e),qe=()=>l("My tooltip"),Ye=ue(e),Ke={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},Ze=Ue(e,{renderMenuItem:({name:w,href:q})=>c({href:q,onclick:Je=>{Je.preventDefault()}},w)}),ve=[{name:"Accordion",Item:w=>S({...w})},{name:"Alert",Item:w=>I({...w},`Alert ${w.color}`)},{name:"Autocomplete",Item:w=>P({...w,options:A,Option:B,getOptionLabel:({label:q})=>q,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:w=>M({...w,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(w,{index:q})=>O({...w,content:`${q*100}`},"☏")},{name:"Breadcrumbs",Item:w=>H({...w,...D})},{name:"Button",Item:w=>j({...w},`${w.variant} ${w.color}`)},{name:"Button Group",Item:w=>W({...w},j({},"ONE"),j({},"TWO"),j({},"THREE"))},{name:"Calendar",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,f({...w})))},{name:"Checkbox",Item:w=>p({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${w.color} ${w.variant}`,x({id:`myCheckbox-gallery-${w.color}-${w.variant}`,name:`myCheckbox-gallery-${w.color}-${w.variant}`,...w}))},{name:"Chip",Item:w=>k({...w},`Chip ${w.color}`)},{name:"DrillDown Menu",Item:w=>T({tree:C,...w})},{name:"File Input",Item:w=>z({Component:_,name:"file",accept:"text/*",onchange,...w})},{name:"Input",Item:w=>X({name:"my-input",id:"my-input-with",placeholder:"Enter text",...w})},{name:"Modal",Item:w=>{const q=R(w);return a(j({...w,onclick:()=>{q.showModal()}},"OPEN MODAL"),q)}},{name:"Select",Item:w=>a(G({...w,options:V,Option:K,getOptionLabel:({label:q})=>q,label:"Select a country..."}))},{name:"Slider",Item:w=>re({...w,id:`mySwitch-${w.color}-${w.variant}`})},{name:"Spinner",Item:w=>_e(w)},{name:"Switch",Item:w=>a({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},p("off",fe({...w,id:`mySwitch-off-${w.color}-${w.variant}`})),p("on",fe({...w,id:`mySwitch-on-${w.color}-${w.variant}`,checked:!0})))},{name:"Tabs",Item:w=>Xe(w)},{name:"Theme Switch",Item:w=>We(w)},{name:"Tooltip",Item:w=>Ye({titleEl:qe(),...w},j({},`${w.color} ${w.variant}`))},{name:"Tree View",Item:w=>Ze({...w,tree:Ke})}];return()=>r(s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),m({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},ve.map(({name:w})=>d(k({color:"primary"},c({href:`#${w}`},w))))),ve.map(w=>a({id:w.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},y(w))))},ya=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Tt(e)})},{path:"components",action:()=>({title:"Component",component:wa(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:At(e)})},{path:"alert",action:()=>({title:"Alert",component:Bt(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Pt(e)})},{path:"animate",action:()=>({title:"Animate",component:Nt(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Ht(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Lt(e)})},{path:"badge",action:()=>({title:"Badge",component:jt(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ot(e)})},{path:"button",action:()=>({title:"Button",component:Gt(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Rt(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Vt(e)})},{path:"chip",action:()=>({title:"Chip",component:Ut(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:_t(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Wt(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:qt(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Yt(e)})},{path:"input",action:()=>({title:"Input",component:Zt(e)})},{path:"modal",action:()=>({title:"Modal",component:Jt(e)})},{path:"popover",action:()=>({title:"Popover",component:Qt(e)})},{path:"select",action:()=>({title:"Select",component:ea(e)})},{path:"slider",action:()=>({title:"Slider",component:ta(e)})},{path:"spinner",action:()=>({title:"Spinner",component:aa(e)})},{path:"switch",action:()=>({title:"Switch",component:oa(e)})},{path:"table",action:()=>({title:"Table",component:sa(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:da(e)})},{path:"tabs",action:()=>({title:"Tabs",component:ra(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:ua(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ha(e)})},{path:"treeView",action:()=>({title:"Tree View",component:ba(e)})}]},{path:"pages",action:t=>({title:"Pages",component:va(e)})}],xa=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ka=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:r,states:a}=e,s=r.state(),l=t({componentState:s});return document.getElementById("app").replaceChildren(l),({router:m})=>{const d=o.location.pathname.replace(n,""),{title:c,component:u,Layout:h=t}=m.resolve({pathname:d});a.pathname.val=d,s.val=u,document.title=`${c}`}},Ca=e=>{const{createGlobalStyles:t}=e;ct(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"40%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),t`
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
  ${Ee({dark:!0})}
}
  `};dt();const ge={title:"Bau",base:"/bau/bau-ui"},Z=vt({config:ge});Z.states={pathname:Z.bau.state(window.location.pathname.replace(ge.base,""))};Ca(Z);Sa(Z);at({routes:ya({context:Z}),onLocationChange:ka({context:Z,LayoutDefault:Ct(Z),config:ge}),notFoundRoute:xa(Z)});
