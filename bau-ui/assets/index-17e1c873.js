(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Je=(e,t)=>({...e,paths:[...t,e.path]}),Ce=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const r=Je(o,e);return n?[r,...Ce({paths:[...e,o.path],routes:n})]:r}),Qe=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},et=({routes:e=[],notFoundRoute:t})=>{const n=Ce({routes:e}).map(o=>({...o,regex:Qe(o)}));return{resolve:({pathname:o})=>{const r=n.find(({regex:a})=>a.test(o));return r?r.action({match:o.match(r.regex)}):t}}};function tt({routes:e,notFoundRoute:t,onLocationChange:n}){const o=et({routes:e,notFoundRoute:t});return window.addEventListener("popstate",r=>{r.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(r,a,s)=>{r.apply(a,s),n({router:o})}}),document.addEventListener("click",r=>{const{target:a}=r,s=a.getAttribute("href");a.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),r.preventDefault())}),n({router:o}),o}const Se=[["neutral",{h:"0%",s:"0%",l:"62%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]],at=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],nt=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],te=e=>`var(--color-${e}-darkest)`,ot=e=>`var(--color-${e}-lightest)`,rt=()=>Se.map(([e])=>`
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
  background-color: ${ot(e)};
}
.solid.${e} {
  color: var(--font-color-inverse);
  background-color: ${te(e)};
}
`).join(`
`),st=()=>new Array(20).fill("").map((e,t)=>`--color-gray-${t*50}: hsl(0, 0%, ${100-5*t}%);`).join(`
`),Ee=({dark:e})=>new Array(20).fill("").map((t,n)=>`--color-emphasis-${n*50}: var(--color-gray-${e?1e3-n*50:n*50});`).join(`
`),lt=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...at.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),...nt.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function it({createGlobalStyles:e},{colorPalette:t=Se}={}){e`
:root {
  --color-scheme: light;
  --contrast-background-value: 90%;
  --contrast-foreground-value: 70%;
  --contrast-background-dark-value: 70%;
  --contrast-foreground-dark-value: 90%;
  --color-white: #fff;
  --color-black: #000;
  ${t.map(([n,o])=>lt([n,o])).join(`
`)}
  ${st()}
  ${Ee({})}
  ${rt()}
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
`}function ct(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let me=e=>Object.prototype.toString.call(e??0).slice(8,-1),dt=e=>me(e)=="Object",we=e=>me(e)=="Function",se=e=>["Object","Array"].includes(me(e)),ye=Object.getPrototypeOf,le=e=>ee(e)?e.val:e,ee=e=>e==null?void 0:e.__isState,ut=["splice","push","pop","shift","unshift","sort","reverse"],ae=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const U=e=>!ee(e[0])&&dt(e[0])?e:[{},...e];function mt(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,r=new Set,a=new Set,s=!1,l,i=f=>n.createElement(f),m=(f,y,k)=>{let C=l;l=y;let T=f(k);return l=C,T},d=()=>{o||(o=window.requestAnimationFrame(()=>{r.forEach(f=>{f.bindings=f.bindings.filter(y=>{var k;return(k=y.element)==null?void 0:k.isConnected}),!f.bindings.length&&!f.computed&&r.delete(f)}),o=void 0}))},c=(f,y,k,C,T,_)=>{var z;if(s){a.add(f);return}for(let X of f.bindings){let{deps:L,element:H,renderInferred:R,render:G,renderItem:V}=X;if(V&&y)(z=g(H,C,(...K)=>b(V(...K)),k,T,_)[y])==null||z.call();else{let K=R?R({element:H}):G({element:H,renderItem:V})(...L.map(le));K!==H&&H.replaceWith(X.element=b(K))}}E(f),d()},u=(f,y,k=[])=>({get(C,T,_){var z;if(l==null||l.add(f),T==="_isProxy")return!0;if(!((z=C[T])!=null&&z._isProxy)&&!ee(C[T])&&se(C[T]))C[T]=new Proxy(C[T],u(f,y,[...k,T]));else if(ut.includes(T)){let X=C[T];return(...L)=>{let H=X.apply(C,L);return c(f,T,H,L,y,k),H}}return Reflect.get(C,T,_)},set(C,T,_,z){let X=Reflect.set(C,T,_,z);return c(f,"setItem",X,{prop:T,value:_},y,[...k,T]),X}}),p=(f,y)=>new Proxy(y,u(f,y)),g=(f,y,k,C,T,_)=>{let z=()=>f.replaceChildren(...ae(C,k)),X=L=>f[L]&&f.removeChild(f[L]);return{assign:z,sort:z,reverse:z,setItem:()=>{var H;let L=_[0];(H=f.children[L])==null||H.replaceWith(k(T[L],L))},push:()=>f.append(...ae(y,(L,H)=>k(L,T.length+H))),unshift:()=>f.prepend(...ae(y,k)),pop:()=>X("lastChild"),shift:()=>X("firstChild"),splice:()=>{let[L,H,...R]=y;const{length:G}=f.children;for(let V=L>=0?Math.min(L+H-1,G-1):G-1;V>=(L>=0?L:G+L);V--)f.children[V].remove();if(R.length){let V=R.forEach((K,re)=>k(K,L+re));f.children[L]?f.children[L].after(...V):f.append(...V)}}}},h=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let y=this;return l==null||l.add(y),y.valProxy??(y.valProxy=se(f)?p(y,f):f,y.valProxy)},set val(y){let k=this,C=k.val;se(y)?(k.valProxy=p(k,y),c(k,"assign",y)):y!==C&&(k.valProxy=y,c(k)),k.oldVal=C}}),b=f=>f==null||f===!1?i("span"):f.nodeType?f:n.createTextNode(f),v=(f,y)=>{let k=new Set;return y.val=m(f,k),k},w=f=>{let y=h(),k=v(f,y);y.computed=!0;for(let C of k)C.listeners.push({computed:f,deps:k,state:y});return y},E=f=>{for(let y of[...f.listeners])v(y.computed,y.state)},S=(f,...y)=>{if(y.length){let k=[];for(let C of y.flat(1/0))C!=null&&k.push(ee(C)?P({deps:[C],render:()=>T=>T}):we(C)?D({renderInferred:C}):b(C));f.append(...k)}},I={},N=(f,y)=>f&&(Object.getOwnPropertyDescriptor(f,y)??N(ye(f),y)),A=(f,y,k)=>{var C;return I[f+","+y]??(I[f+","+y]=((C=N(k,y))==null?void 0:C.set)??0)},B=(f,y)=>new MutationObserver((k,C)=>{k.filter(T=>T.removedNodes).forEach(T=>[...T.removedNodes].find(_=>_===f&&(y({element:f}),C.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),M=f=>new Proxy(function(k,...C){var X;let[T,..._]=U(C),z=f?n.createElementNS(f,k):i(k);for(let[L,H]of Object.entries(T)){if(L.startsWith("bau"))continue;let R=A(k,L,ye(z))?G=>z[L]=G:G=>z.setAttribute(L,G);H==null||(ee(H)?P({deps:[H],render:()=>()=>(R(H.val),z)}):we(H)&&(!L.startsWith("on")||H.isDerived)?D({renderInferred:()=>(R(H({element:z})),z)}):H.renderProp?P({deps:H.deps,render:()=>()=>(R(H.renderProp({element:z})(...H.deps.map(le))),z)}):R(H))}return S(z,..._),(X=T.bauCreated)==null||X.call(T,{element:z}),T.bauMounted&&t.requestAnimationFrame(()=>T.bauMounted({element:z})),T.bauUnmounted&&t.requestAnimationFrame(()=>B(z,T.bauUnmounted)),z},{get:(y,k)=>y.bind(void 0,k)}),O=(f,y,k)=>{f.element=b(k);for(let C of y)ee(C)&&(r.add(C),C.bindings.push(f));return f.element},D=({renderInferred:f,element:y})=>{let k=new Set,C=m(f,k,{element:y});return O({renderInferred:f},k,C)},P=({deps:f,element:y,render:k,renderItem:C})=>O({deps:f,render:k,renderItem:C},f,k({element:y,renderItem:C})(...f.map(le))),j=(f,y,k)=>P({deps:[f],render:({renderItem:C})=>T=>(y.append(...ae(T,C)),y),renderItem:k}),q=f=>{s=!0,f(),s=!1,a.forEach(c),a.clear()};return{tags:M(),tagsNS:M,state:h,bind:P,loop:j,derive:w,stateSet:r,batch:q}}const pt=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},ht=(e,t,n,o)=>{const r=e.createElement("style");r.id=n,r.append(o),(t??e.head).append(r)},bt=(e,t)=>e.reduce((n,o,r)=>n+o+(t[r]??""),"");function gt(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(r,...a)=>{const s=bt(r,a),l=pt(s);return!t.getElementById(l)&&ht(t,e==null?void 0:e.target,l,o(l,s)),l};return{css:n((o,r)=>`.${o} { ${r} }`),keyframes:n((o,r)=>`@keyframes ${o} { ${r} }`),createGlobalStyles:n((o,r)=>r)}}function ft(e){return{bau:mt(),...gt(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function Y(e,t){const{bau:n,css:o}=e,r={root:o`
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
    `};return function(...s){let[{color:l,variant:i="outline",size:m,disabled:d,href:c,...u},...p]=U(s);return(c?n.tags.a:n.tags.button)({...u,class:$(r.root,i,m,l,c?r.a:r.button,d&&r.disabled,t==null?void 0:t.class,u.class),disabled:d,href:c,...!c&&{type:"button"}},p)}}function vt(e){const{tr:t,bau:n,css:o,config:r}=e,{i:a,header:s,h1:l,div:i,a:m,img:d,b:c,ul:u,li:p}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),b=n.state(!0),v=Y(e),w=()=>a({class:o`
          color: var(--font-color-inverse);
        `},g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>i({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"plain",color:"none",onclick:()=>b.val=!b.val},w()),m({href:`${r.base}/`,class:o`
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
        `},E(),S())}}function wt({tr:e,bau:t,css:n}){const{footer:o,span:r,a,ul:s,li:l,p:i}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},r("version: 0.40.0"))}}function Te(e,t={}){return function({parent:o,animationHide:r,animationShow:a},s){s.style.animation=a;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((i,m)=>{i.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(c=>{o.style.position="relative";const u=c.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=r,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),m.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}const xe="0.3s",$e=({parent:e,grandParent:t})=>n=>{const{children:o,...r}=n,a=structuredClone(r);return a.children=o==null?void 0:o.map($e({parent:n,grandParent:e})),e&&(e.parentTree=t),a.parentTree=e,a},Ae=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const r=Ae(e)(t.children[o]);if(r)return r}},yt=({createGlobalStyles:e,keyframes:t})=>(e`
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
 `});function pe(e,t){const{bau:n,css:o,window:r}=e,{base:a=""}=t,s=({currentTree:D,data:P,onclickBack:j})=>b(E({href:`${a}${D.parentTree.children[0].data.href}`,onclick:j({currentTree:D}),class:o`
            min-width: 3rem;
          `},"←"),E({href:`${a}${P.href}`,class:o`
            flex-grow: 1;
            justify-content: flex-start;
          `},P.name)),l=({name:D,href:P})=>v({href:`${a}${P}`},D),i=({subTree:D})=>{var P;return r.location.pathname.replace(a,"")===((P=D==null?void 0:D.data)==null?void 0:P.href)},{renderHeader:m=s,renderMenuItem:d=l,isActive:c=i}=t,{ul:u,li:p,nav:g,div:h,header:b,a:v}=n.tags,w=Te(),E=Y(e),{hideToLeft:S,hideToRight:I,showFromRight:N,showFromLeft:A}=yt(e),B=o`
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
  `,M=({variant:D,color:P,size:j,onclickItem:q,onclickBack:f,currentTree:y,pathnameState:k})=>{const{children:C,parentTree:T,data:_}=y;return console.log("Menu",y,k.val),h({class:$("drillDownMenu",D,P,j)},T&&m({data:_,currentTree:y,onclickBack:f}),C&&u(C.map(z=>p({class:()=>$(z.children&&"has-children",c({pathname:k.val,subTree:z})&&"is-active"),onclick:z.children&&q({currentTree:z})},d(z.data)))))},O=({tree:D,pathnameStateInitial:P})=>{let j=$e({})(D),q=Ae(P)(j);return q||(q=j),q};return function(P){const{variant:j="plain",color:q="neutral",size:f,tree:y,pathnameState:k=n.state(r.location.pathname),...C}=P,T=k.val,_=({currentTree:H})=>R=>X(R,L,H,!0),z=({currentTree:H})=>R=>X(R,L,H.parentTree,!1),X=(H,R,G,V)=>{R.firstChild.replaceChildren(w({parent:R,animationHide:`${V?S:I} ${xe}`,animationShow:`${V?N:A} ${xe}`},M({variant:j,color:q,size:f,currentTree:G,onclickItem:_,onclickBack:z,pathnameState:k})))},L=g({class:$(B,t==null?void 0:t.class,C.class)},h(M({variant:j,color:q,size:f,currentTree:O({tree:y,pathnameStateInitial:T}),onclickItem:_,onclickBack:z,pathnameState:k})));return L}}const xt={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Ie(e){const{tr:t,bau:n,css:o,config:r,states:a}=e,{div:s,ul:l,li:i,nav:m,a:d,span:c}=n.tags,u=pe(e,{base:r.base});return function(){return s({class:o`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},u({tree:xt,pathnameState:a.pathname}))}}const kt=e=>{const{bau:t,css:n}=e,{div:o}=t.tags,r=vt(e),a=Ie(e),s=wt(e);return function({componentState:i}){return o({class:n`
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
          `},()=>i.val&&i.val({})),s())}};function Ct(e){const{bau:t,css:n,config:o}=e,{div:r,h1:a,h2:s,p:l}=t.tags;Y(e);const i=n`
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
  `;return function({name:d,text:c,tagLine:u}){return r({class:i},a(d),s(c),l(u))}}function St(e){const{bau:t,css:n}=e,{div:o,h1:r,p:a}=t.tags,s=n`
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
  `,l=({title:i,Content:m})=>o({className:"feature"},r(i),a(m()));return function({featuresContent:m}){return o({class:s},m.map(l))}}function Et(e){const{bau:t,css:n,config:o}=e,{div:r,p:a,a:s}=t.tags,l=Ct(e),i=St(e),m=Y(e),d=n`
    grid-area: main;
  `,c=[{title:"UI components for the web",Content:()=>[a("Over 25 components such as button, input, tabs, autocomplete etc ..."),m({href:`${o.base}/components`,color:"primary",variant:"solid"},"Visit Gallery")]},{title:"Component style",Content:()=>[a("Each component has a combination of variant, color and size:"),a("3 variant: plain, outline and primary"),a("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[a("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),a("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[a("The component bundle size is about 8x smaller compared to popular React UI component library."),a("Faster download time for users."),a("Save in bandwith fees for the operator."),a("Suitable for low bandwith network and low cost device.")]}];return function({}){return r({class:d},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),i({featuresContent:c}))}}function Me(e,t){const{bau:n,css:o}=e,{accordionDefs:r}=t,{div:a,ul:s,li:l,header:i,h3:m,button:d}=n.tags,c=n.state(""),u=h=>b=>{c.val==h?c.val="":c.val=h},p=({element:h,open:b})=>{const v=()=>{h.removeEventListener("transitionend",v)};function w(S){S.addEventListener("transitionend",v),window.requestAnimationFrame(()=>{S.style.height="0px"})}function E(S){S.addEventListener("transitionend",v),S.style.height=S.scrollHeight+"px"}h.scrollHeight!=0&&(b?E(h):w(h))},g=o`
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
  `;return function(...b){let[{color:v,variant:w="outline",size:E,content:S,...I},...N]=U(b);const A=B=>{const{Header:M,Content:O,name:D}=B;return l({class:$(v,w,E),onclick:u(D)},m({class:()=>$(c.val==D&&"active")},d({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:P})=>c.val==D},M(B))),a({class:"content",role:"region",id:`bau-${D}`,"data-state":({element:P})=>{const j=c.val==D;return p({element:P,open:j}),j}},O(B)))};return a({class:$("accordion",g,t==null?void 0:t.class,I.class)},s(r.map(A)))}}const J=["neutral","primary","success","danger","warning"],Tt=["plain","outline","solid"],F=e=>{const{bau:t,css:n}=e,{div:o,table:r,tbody:a,tr:s,td:l,thead:i,th:m}=t.tags;return function({Item:c,name:u}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},r(i(s(m(u??"Variant/Color"),J.map(p=>m(p)))),a(Tt.map(p=>s(m(p),J.map((g,h)=>l(c({color:g,variant:p},{index:h}))))))))}},$t=e=>{const{tr:t,bau:n,css:o}=e,{article:r,div:a,h3:s,h2:l,h1:i,p:m}=n.tags,d=F(e),c=(...g)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),p=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(m("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(m("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(m("Item 3 content"))}]});return()=>r({id:"accordion"},i(t("Accordion")),l("Accordion Table"),d({Item:g=>p({...g})}),l("Customization"),s("Default Accordion"),c(p({})),s("Accordion width: fit-content"),c(p({color:"warning",class:o`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),c(p({color:"success",variant:"outline",class:o`
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
          `})))},At={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},It=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`};function oe(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;It({css:o,createGlobalStyles:r});const s=o`
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
  `,l=Y(e),i=({onclick:m})=>l({"aria-label":"Close",onclick:m,class:"button-close"},"✖");return function(d,...c){const{variant:u="outline",color:p="neutral",size:g,onRemove:h,...b}=d;return a({...b,class:$(`alert-${u}`,u,p,g,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},a({class:"icon"},At[p]),a({class:"content"},...c),h&&i({onclick:h}))}}const Mt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h4:i,p:m}=n.tags,d=F(e),c=oe(e),u=oe(e,{class:o`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>r({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),a(c({color:"danger"},i("Something went wrong"),m("Error code ",404),m("Status ","Not Found"))),s("Custom Alert"),a(u({color:"warning"},i("My message"))),s("Alert Table"),d({Item:p=>c({...p},`Alert ${p.color}`)}))},Bt=(e,t={})=>{const{bau:n,css:o,keyframes:r}=e,{limit:a=10,deleteAfterDuration:s=15e3}=t,{div:l}=n.tags,i=n.state([]),m={inserting:r`
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
    `},c=({id:u,status:p})=>{const g=i.val.findIndex(h=>h.id===u);g!=-1&&(i.val[g].status=p)};return function(p={},...g){const h=({id:w})=>{c({id:w,status:"removing"});const E=i.val.findIndex(S=>S.id===w);E!=-1&&i.val.splice(E,1)},b=({Component:w})=>{const E={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};i.val.length>=a&&h({id:i.val[0].id}),i.val.push(E),setTimeout(()=>h(E),s)},v=w=>l({class:d.item,onclick:()=>h(w)},w.Component());return document.addEventListener("alert.add",w=>b(w.detail)),document.addEventListener("alert.remove",w=>h(w.detail)),l({class:$(d.stack,t==null?void 0:t.class,p.class)},n.loop(i,l(),v))}},Dt=e=>{const{tr:t,bau:n}=e,{section:o,h1:r}=n.tags,a=Bt(e,{deleteAfterDuration:2e4}),s=Y(e),l=oe(e);return function(){return o({id:"alert-stack"},a(),r("Alert stack"),s({color:"success",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Pt=({keyframes:e})=>({hideRight:e`
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
 `}),Nt=e=>{const{bau:t}=e,{section:n,div:o,h1:r}=t.tags,a=Te(),s=Y(e),l=Pt(e);return function(){const i=t.state(!0),m=o(),d=c=>{m.replaceChildren(a({parent:m,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},o(c.val?"Ciao":"")))};return d(i),n({id:"animate"},o(r("Test Animate"),o(s({onclick:()=>{i.val=!i.val,d(i)}},()=>i.val?"Hide":"Show")),m))}};function Be(e,t){const{bau:n}=e,{span:o,img:r}=n.tags,a=n.state(!0),s=n.state(!1),l=()=>a.val=!1,i=m=>{a.val=!1,s.val=!0};return function(...d){let[{color:c,variant:u="outline",size:p,width:g=60,height:h=60,...b},...v]=U(d);return o({class:$(t==null?void 0:t.class,b.class)},()=>a.val?"Loading...":"",()=>s.val&&"Error",r({width:g,height:h,onload:l,onerror:i,class:$(t==null?void 0:t.class,c,u,p,b.class),...b}))}}const zt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,h2:a,h3:s}=n.tags,l=o`
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
    `});return()=>r({id:"avatar"},a(t("Avatar")),m({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),m({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),m({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),i({Item:d=>m({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function he(e,t){const{bau:n,css:o,window:r}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...i){let[{contentEl:m,triggerEl:d,onClose:c,...u},...p]=U(i);const g=v=>{b.style.opacity=1,b.showModal();const w=d.getBoundingClientRect(),E=b.getBoundingClientRect();w.x<r.innerWidth/2?b.style.left=w.left+"px":b.style.left=w.right-E.width+"px",w.y<r.innerHeight/2?b.style.top=w.top+w.height+"px":b.style.top=w.top-E.height+"px"},h=v=>{const w=()=>{b.close(),b.removeEventListener("transitionend",w)};b.addEventListener("transitionend",w),b.style.opacity=0},b=a({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:v=>v.target===b&&(h(),c==null?void 0:c.call())},m);return b.closeDialog=h,b.openDialog=g,b}}function De(e,t){const{bau:n,css:o}=e,{div:r,input:a,ul:s,li:l,i,span:m,button:d}=n.tags,c=he(e),u=o`
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
  `,p=n.state(""),g=n.state(""),h=n.state(!1),b=n.state(0),v=()=>{h.val=!1};return function(...E){let[{variant:S="outline",color:I,size:N,id:A,label:B,placeholder:M,Option:O,options:D,getOptionLabel:P=({label:G})=>G,...j},...q]=U(E);const f=n.state(D),y=()=>{R.openDialog(),h.val=!0,g.val="",f.val=D},k=()=>{R.closeDialog(),h.val=!1,g.val=""},C=G=>{const{value:V}=G.target;g.val=V,V?f.val=D.filter(K=>P(K).match(new RegExp(`${V}`,"i"))):f.val=D},T=G=>{console.log("onclickButton",h.val),h.val?k():y()},_=G=>V=>{p.val=P(G),k()},z=G=>{switch(G.key){case"Escape":k();break;case"ArrowDown":b.val++;break;case"ArrowUp":b.val--;break;case"Enter":p.val=P(f.val[b.val]),g.val="",k();break}},X=d({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,"aria-label":B,onclick:T,class:$(S,I,N)},()=>!p.val&&B,p),L=a({id:A,value:g,placeholder:M,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:C,onkeydown:z,class:$(S,I,N)}),R=c({id:A,triggerEl:X,contentEl:(()=>r({class:$(S,I,N,"content")},L,()=>s(f.val.map((G,V)=>l({class:()=>$(b.val==V&&"active"),onclick:_(G)},O(G))))))(),onClose:v});return r({...j,class:$("autocomplete",u,t==null?void 0:t.class,j==null?void 0:j.class)},X,R)}}const Lt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:i}=n.tags,m=(...g)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=F(e),c=De(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],p=g=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>r({id:"autocomplete",class:o``},l(t("Autocomplete")),s("Basic Autocomplete"),m(c({options:u,Option:p,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:g=>c({...g,options:u,Option:p,getOptionLabel:({label:h})=>h,label:"Country",placeholder:"Search countries",id:"country"})}))};function ie(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,content:c,...u},...p]=U(l);return r({...u,class:$("badge",a,t==null?void 0:t.class,u==null?void 0:u.class)},r({class:$(i,m,d)},c),...p)}}const Ht=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s}=t.tags,l=(...c)=>r({class:n`
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
  `;return function(...d){let[{color:c,variant:u="outline",size:p,items:g,...h},...b]=U(d);return r({...h,class:$(i,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:v,name:w})=>a((v?s:l)({href:v,class:$(c,u,p)},w))))}}const Ot=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=F(e),i=Pe(e);return()=>o({id:"breadcrumbs"},r(t("Breadcrumbs")),a("Bacis Breadcrumb"),i(s),a("Breadcrumbs Table"),l({Item:m=>i({...m,...s})}))},jt=e=>{const{bau:t,css:n}=e,{section:o,p:r,h3:a}=t.tags,s=F(e),l=Y(e);return()=>o({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},a("Button Examples"),s({Item:i=>l({...i},`${i.variant} ${i.color}`)}),a("Full With"),r(l({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),a("Icon"),r(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},Gt=()=>J.map(e=>`
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
`);function Ne(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
    ${Gt()}
  `;return function(...l){let[{variant:i="outline",size:m="md",color:d,...c},...u]=U(l);return r({...c,class:$("button-group",a,i,d,m,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Ft=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=Y(e),i=Ne(e);return()=>o({id:"button-group"},r(t("Button Group Examples")),a("Outline"),i({},l({},"ONE"),l({},"TWO"),l({},"THREE")),a("Button Group Table"),s({Item:m=>i({...m},l({},"ONE"),l({},"TWO"),l({},"THREE"))}))};function ce(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>J.map(l=>`
&.calendar.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()}
  `;return function(...i){let[{color:m="neutral",variant:d="plain",size:c,...u},...p]=U(i);return r({...u,type:"date",class:$("calendar",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...p)}}const Rt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,label:i}=n.tags,m=F(e),d=(...g)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),c=n.state("2023-08-08"),u=ce(e),p=ce(e,{class:o`
      background-color: lightseagreen !important;
    `});return()=>r({id:"calendar"},l(t("Calendar")),a("Date: ",c),s("Basic Calendar"),d(i({for:"start"},"Start date:",u({id:"start",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar min and max"),d(i("End date:",u({min:"2023-01-01",max:"2023-12-31",value:c.val,oninput:g=>{c.val=g.target.value}}))),s("Calendar custom"),d(p({})),s("Calendar Table"),m({Item:g=>u({...g})}))};function ze(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:i,variant:m="outline",color:d="neutral",onclick:c,...u},...p]=U(l);return r({...u,onclick:c,class:$("chip",a,i,m,d,c&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...p)}}const Vt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l}=n.tags,i=F(e),m=(...c)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),d=ze(e);return()=>r({id:"chip"},l(t("Chip")),s("Chip Default"),m(d("My Chip")),s("Chip Clickable"),m(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),i({Item:c=>d({...c},`Chip ${c.color}`)}))};function Le(e,t={}){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,...c},...u]=U(l);return r({type:"checkbox",required:"required",...c,class:$(a,i,m,d,t==null?void 0:t.class,c==null?void 0:c.class)})}}const Ut=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,label:s,h2:l,form:i}=n.tags,m=F(e),d=Le(e),c=n.state(!1),u=n.state(!1),p=h=>b=>{h.val=!!b.target.checked},g=(...h)=>a({class:o`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...h);return()=>r({id:"checkbox"},i(l(t("Checkbox Examples")),g(d({id:"myCheckbox",name:"myCheckbox",checked:c,onchange:p(c)}),s({for:"myCheckbox"},"My Checkbox")),g(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:p(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),m({Item:(h,{index:b})=>d({id:`myCheckbox-${b}`,name:`myCheckbox-${b}`,...h})})))};function _t(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,openState:c,...u},...p]=U(l);return r({class:$(a,t==null?void 0:t.class,u.class)},r({class:()=>$("overlay",c.val&&"overlay-open"),onclick:()=>{c.val=!1}}),r({class:()=>$("content",c.val&&"content-open")},p))}}const Xt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r}=n.tags,a=n.state(!1),s=_t(e),l=Y(e),i=Ie(e);return()=>o({id:"drawer"},r(t("Drawer")),l({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},i()))},Wt=e=>{const{tr:t,bau:n,window:o,config:r}=e,{section:a,h2:s,h3:l}=n.tags,i=n.state(o.location.pathname.replace(r.base,"")),m=F(e),d={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},c=pe(e,{base:r.base+"/components/drillDownMenu"});return()=>a({id:"drillDownMenu"},s(t("Drill Down Menu")),c({tree:d,pathnameState:i}),l("Drill Down Table"),m({Item:u=>c({tree:d,...u})}))};function He(e,t){const{bau:n,css:o}=e,{div:r,span:a,label:s,input:l}=n.tags,i={base:o`
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
    `};return function(d,...c){const{variant:u="outline",color:p="neutral",size:g,Component:h,disabled:b,...v}=d;return r({class:$(i.base,b&&i.disabled,t==null?void 0:t.class,d.class)},s({class:$(u,p,g)},h({disabled:b}),l({type:"file",disabled:b,...v})),a({class:"filename-display"}))}}const qt=e=>{const{tr:t,bau:n,css:o}=e,{svg:r,use:a}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:i,h2:m,span:d}=n.tags,c=F(e),u=n.state("No file selected"),p=He(e),g=b=>{const v=b.target.files[0];v?u.val=v.name:u.val="No file selected"},h=({disabled:b})=>l({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},a({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},m(t("FileInput Examples")),i("File Input"),p({Component:h,name:"file",accept:"text/*",onchange:g}),l("File selected: ",u),i("File Input disabled"),p({Component:h,name:"file",accept:"text/*",disabled:!0,onchange:g}),i("File Input Table"),c({Item:b=>p({Component:h,name:"file",accept:"text/*",onchange:g,...b})}))},Yt=()=>J.map(e=>`
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
`);function Oe(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
    ${Yt()}
  `;return function(l){const{size:i,variant:m="outline",color:d="neutral",name:c,id:u,disabled:p,...g}=l;return r({...g,class:$("input",i,d,m,a,t==null?void 0:t.class,g.class)})}}const Kt=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=F(e),i=Oe(e);return()=>o({id:"input"},s(t("Input Examples")),a("Standard"),r(i({id:"my-Input",name:"Label",label:"Label"})),a("Disabled"),r(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),a("Input with error"),r(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),a("Input Table"),l({Item:m=>i({name:"my-input",id:"my-input-with",placeholder:"Enter text",...m})}))};function je(e,t){const{bau:n,css:o}=e,{dialog:r}=n.tags,s=o`
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
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...p]=U(i);return r({class:$("modal",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...p)}}const Zt=e=>{const{tr:t,bau:n}=e,{section:o,main:r,h2:a,header:s,footer:l,p:i,div:m}=n.tags,d=F(e),c=Y(e),u=je(e),p=()=>r(Array(10).fill("").map((b,v)=>i(v+1,". Some text here"))),g=b=>{const v=u({id:"my-dialog",...b},s("Header"),p(),l(c({variant:"outline",onclick:()=>{v.close()}},"Cancel"),c({variant:"solid",onclick:()=>{v.close()}},"OK")));return v},h=g({});return()=>o({id:"modal"},a(t("Modal Examples")),c({variant:"solid",onclick:()=>{h.showModal()}},"OPEN MODAL"),h,a(t("Modal Table")),d({Item:b=>{const v=g(b);return m(c({...b,onclick:()=>{v.showModal()}},"OPEN MODAL"),v)}}))},Jt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h1:i,p:m}=n.tags,d=Y(e),c=(...I)=>a({class:o`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...I),u=he(e),g=(()=>d({onclick:()=>v.open?v.closeDialog():v.openDialog()},"Click"))(),h=()=>a({},i("My content"),m("My Content")),b=h(),v=u({id:"my-popover-left",triggerEl:g,contentEl:b}),w=d({onclick:()=>S.open?S.closeDialog():S.openDialog()},"Click"),E=h(),S=u({id:"my-popover-left",triggerEl:w,contentEl:E});return()=>r({id:"popover",class:o``},l(t("Popover")),s("Basic Popover"),c(a(g,v),a(w,S)))};function Ge(e,t){const{bau:n,css:o}=e,{div:r,ul:a,li:s,button:l}=n.tags,i=he(e),m=o`
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
  `,d=n.state(""),c=n.state(!1),u=n.state(0);return function(...g){let[{color:h="neutral",variant:b="outline",size:v,id:w,label:E,Option:S,options:I,getOptionLabel:N=({label:C})=>C,...A},...B]=U(g);const M=()=>{k.openDialog(),c.val=!0},O=()=>{k.closeDialog(),c.val=!1},D=()=>{c.val=!1},P=C=>{c.val?O():M()},j=C=>T=>{d.val=N(C),O()},q=C=>{switch(C.preventDefault(),C.key){case"Escape":O();break;case"ArrowDown":u.val<I.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=I.length-1:u.val--;break;case"Enter":c.val?(d.val=N(I[u.val]),O()):M();break}},f=()=>a(I.map((C,T)=>s({class:()=>$(u.val==T&&"active"),onclick:j(C)},S(C)))),y=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":c,onclick:P,class:$(h,b,v)},()=>!d.val&&n.tags.label(E),d),k=i({id:w,triggerEl:y,contentEl:f(),onClose:D});return r({...A,class:$("select",m,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:q},y,k)}}const Qt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:i}=n.tags,m=(...g)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...g),d=F(e),c=Ge(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],p=g=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.label),i(g.code));return()=>r({id:"select",class:o``},l(t("Select")),s("Basic Select"),m(c({options:u,Option:p,getOptionLabel:({label:g})=>g,label:"Select a country..."})),l(t("Select Table")),d({Item:g=>a(c({...g,options:u,Option:p,getOptionLabel:({label:h})=>h,label:"Select a country..."}))}))};function ne(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    ${(()=>J.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...p]=U(i);return r({...u,type:"range",class:$("slider",m,d,c,s,t==null?void 0:t.class,u.class)},...p)}}const ea=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:i,label:m,datalist:d,option:c,br:u}=n.tags,p=n.state(0),g=S=>{p.val=S==null?void 0:S.target.value},h=(...S)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),b=F(e),v=ne(e),w=ne(e),E=ne(e);return()=>r({id:"slider"},l(t("Slider")),i("Slider value: ",p),s("Basic Slider"),h(v({oninput:g,name:"slider-simple"})),s(t("Slider Table")),b({Item:S=>v(S)}),s("Slider Min Max: -1000 1000"),h(w({oninput:g,min:-1e3,max:1e3})),s("Slider Step 20"),h(v({oninput:g,step:20,min:-100,max:100})),s("Slider Vertical"),h(a({class:o`
              display: flex;
            `},v({oninput:g,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:o`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:o`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(S=>c({value:Number(S),label:S}))))),s("Slider with mark"),h(m({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:g,class:o`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:o`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(S=>c({value:Number(S),label:S})))))},ke={sm:16,md:32,lg:64};function be(e,t={}){const{bau:n,css:o}=e,{svg:r,animate:a,animateTransform:s,rect:l}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:m="md",color:d="color-base",variant:c="outline",visibility:u=!0,...p}={}){return r({class:$(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,p.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:ke[m],height:ke[m],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},a({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const ta=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=be(e);return()=>o({id:"spinner"},r(t("Spinner Examples")),a(t("Spinner Table")),s({Item:i=>l(i)}))},aa=()=>J.map(e=>`
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
    ${aa()}
  `;return function(...l){let[{color:i="neutral",variant:m="plain",size:d,...c},...u]=U(l);return r({...c,class:$("switch",a,i,m,d,t==null?void 0:t.class,c.class),type:"checkbox",required:"required"},...u)}}const na=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,label:s,div:l,h2:i}=n.tags,m=F(e),d=Fe(e);return()=>r({id:"switch"},i(t("Switch Examples")),a(l({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-switch"},"My shinny switch"),d({id:"my-switch"}))),i(t("Switch Table")),m({Item:c=>l(d({...c,id:"my-switch"}),d({...c,id:"my-switch-checked",checked:!0}))}))};function de(e,t){const{bau:n,css:o}=e,{tabDefs:r}=t,{div:a,ul:s,li:l}=n.tags,i=n.state(r),m=n.state(r[0]),d=u=>i.val.find(p=>p.name==u),c={base:o`
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
    `};return function(...p){let[{color:g,variant:h="plain",size:b,...v},...w]=U(p);const E=I=>{const{Header:N,disabled:A,name:B}=I;return l({class:()=>$(m.val.name==B&&"active",A&&"disabled"),onclick:M=>M.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},N(I))},S=a({class:$(c.base,h,b,g,t==null?void 0:t.class,v.class)},n.loop(i,s(),E),()=>m.val.Content?m.val.Content({}):"");return S.addEventListener("tab.select",I=>{var B,M;const{tabName:N}=I.detail,A=d(N);A&&((B=m.val.exit)==null||B.call(),m.val=A,(M=A.enter)==null||M.call())},!1),S.addEventListener("tab.add",I=>{var A;const{tab:N}=I.detail;(A=N.enter)==null||A.call(),i.val.push(N)},!1),S.addEventListener("tab.remove",I=>{var A;const N=i.val.findIndex(B=>B.name==I.detail.tabName);N>0&&((A=i.val[N].exit)==null||A.call(),i.val.splice(N,1))},!1),S}}const oa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:i,i:m}=n.tags,d=F(e),c=Y(e),u=(...w)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...w),p=()=>({name:"New Tab",Header:({name:w})=>a(w),Content:()=>a("My Paragraph")}),h=de(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My tab Disabled"))}]}),v=de(e,{tabDefs:[{name:"Tab1",Header:()=>a(m({class:o`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>a({class:o`
              > button {
                margin: 10px;
              }
            `},c({onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:p()},bubbles:!0}))},"Add a new Tab"),c({accent:!0,onclick:w=>w.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),i("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My Content"))}]});return()=>r({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(h({})),s("Full Witdth"),u(h({class:o`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(h({class:o`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(h({class:o`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(h({class:o`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(h({class:o`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(v({})),l(t("Tabs Table")),d({Item:w=>h(w)}))};function Q(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;r`
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
  `;return function(...i){let[{...m},...d]=U(i);return a({...m,class:$("table-container",s,t==null?void 0:t.class,m==null?void 0:m.class)},...d)}}const ra=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,th:l,td:i,tr:m,table:d,thead:c,tbody:u,caption:p}=t.tags;function g(B,M,O,D,P){return{name:B,calories:M,fat:O,carbs:D,protein:P}}const h=[g("Frozen yoghurt",159,6,24,4),g("Ice cream sandwich",237,9,37,4.3),g("Eclair",262,16,24,6),g("Cupcake",305,3.7,67,4.3),g("Gingerbread",356,16,49,3.9)],b=(...B)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...B),v=({name:B,calories:M})=>m(i(B),i({class:n`
            text-align: right;
          `},M)),w=()=>c(m(l({class:n`
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
    `}),N=Q(e,{class:n`
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
    `});return()=>o({id:"table"},s(m("Table")),a("Basic Table"),b(E(d(p("Basic Table"),w(),u(h.map(v))))),a("Dense Table"),b(S(d(p("Dense Table"),w(),u(h.map(v))))),a("Zebra Table"),b(I(d(p("Zebra Table"),w(),u(h.map(v))))),a("Caption Bottom"),b(N(d(p("Caption Bottom Table"),w(),u(h.map(v))))),a("Overflow Header"),b(A(d(p("Overflow Header"),w(),u(h.map(v))))))};function Re(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=Y(e),s=be(e),l=o`
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
  `,i=({label:p,icon:g,...h})=>a({variant:"plain","aria-label":p,title:p,...h},g),m=({count:p,totalCount:g,page:h,rowsPerPage:b})=>r({class:"pages-numbers"},Number(h-1)*Number(b)+(p>0?1:0),"-",Math.min(h*b,g)," of ",g),d=({count:p,page:g,rowsPerPage:h})=>r({class:"pages-numbers"},(g-1)*h+(p>0?1:0),"-",g*h),c=p=>p<=1,u=(p,g,h)=>p>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:b=0,page:v=1,rowsPerPage:w=50,onPageChange:E,isLoading:S=!1,disableFirst:I=()=>c(v),disablePrevious:N=()=>c(v),disableNext:A=()=>u(v,b,w),disableLast:B=()=>u(v,b,w),...M},...O]=U(g);const D=Math.max(0,Math.ceil(b/w)),P=E({page:1}),j=E({page:v-1}),q=E({page:v+1}),f=E({page:D});return r({...M,class:$("table-pagination",l,S&&"disabled",t==null?void 0:t.class,M==null?void 0:M.class)},s({class:"spinner",visibility:S,size:"md"}),b>0?m({count:h,totalCount:b,page:v,maxPages:D,rowsPerPage:w}):d({count:h,page:v,maxPages:D,rowsPerPage:w}),r(i({label:"First",icon:"⟪",onclick:P,disabled:I()}),i({label:"Previous",icon:"⟨",onclick:j,disabled:N()}),i({label:"Next",icon:"⟩",onclick:q,disabled:A()}),i({label:"Last",icon:"⟫",onclick:f,disabled:B()})))}}const sa=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),la=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:i}=t.tags,m=sa(45),d=({name:w,email:E})=>a(r(w),r(E)),c=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=Re(e),p=Q(e,{class:n`
      max-width: 650px;
    `}),g=t.state(m),h=t.state({count:m.length,totalCount:m.length,page:1,rowsPerPage:10}),b=t.derive(()=>g.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),v=({page:w})=>E=>{h.val.page=w};return()=>p(s(c(),()=>i(b.val.map(d))),()=>u({...h.val,onPageChange:v}))},ia=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:i,div:m}=t.tags,d=t.state(!1),c=t.state([]),u=t.state(""),p=t.derive(()=>c.val.length),g=t.state(1),h=t.state(10),b=t.derive(()=>c.val),v=M=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(M).toString()}`,w=({page:M})=>O=>{g.val=M,E(v({page:M,per_page:h.val}))};E(v({page:1,per_page:h.val}));async function E(M){try{d.val=!0;const O=await fetch(M,{});if(O.ok){const D=await O.json();c.val=D;return}throw O}catch(O){u.val=O.message}finally{d.val=!1}}const S=({name:M,description:O,stargazers_count:D})=>a(r(M),r(O),r({class:n`
            text-align: right;
          `},D)),I=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),N=Re(e),A=Q(e,{class:n`
      min-width: 650px;
    `}),B=({message:M})=>m(M);return()=>A(()=>N({rowsPerPage:h.val,page:g.val,count:p.val,totalCount:-1,isLoading:d.val,onPageChange:w,disableNext:()=>!1}),s(I(),()=>u.val&&B({message:u.val}),()=>i(b.val.map(S))))},ca=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,tr:l}=t.tags,i=la(e),m=ia(e),d=(...c)=>r({class:n`
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
  `;return function(...i){let[{titleEl:m,side:d="bottom-start",color:c="neutral",variant:u="outline",size:p,...g},...h]=U(i);const b=a({class:$("container",...d.split("-"))},a({class:$("content",c,u,p),role:"tooltip"},m)),v=A=>`move-to-${A}`,w=(A,B,M)=>{if(A()){const O=v(B);b.classList.add(O),b.classList.add(B),b.classList.remove(M)}},E=(A,B)=>{const M=v(A);b.classList.contains(M)&&(b.classList.remove(M),b.classList.add(B),b.classList.remove(A))},S=A=>{const B=b.getBoundingClientRect();w(()=>B.x<0,"right","left"),w(()=>B.x+B.width>r.innerWidth,"left","right"),w(()=>B.y<0,"bottom","top"),w(()=>B.bottom>r.innerHeight,"top","bottom"),b.classList.add("visible")},I=A=>{b.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return a({...g,class:$("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",I)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",I)}},...h,b)}}const da=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h2:s,em:l,p:i}=n.tags,m=F(e),d=Y(e),c=ue(e),u=ue(e,{class:o`
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
    `}),p=()=>a({class:o`
          font-size: larger;
        `},i("A ",l("tooltip")," can be any component")),g=()=>[a({class:o`
          display: flex;
          justify-content: space-around;
        `},c({side:"top-start",titleEl:p()},d({},"top-start")),c({side:"top-centered",titleEl:p()},d({},"top-centered")),c({side:"top-end",titleEl:p()},d({},"top-end"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-start",titleEl:p()},d({},"left-start")),c({side:"right-start",titleEl:p()},d({},"right-start"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-centered",titleEl:p()},d({},"left-centered")),c({side:"right-centered",titleEl:p()},d({},"right-centered"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-end",titleEl:p()},d({},"left end")),c({side:"right-end",titleEl:p()},d({},"right end"))),a({class:o`
          display: flex;
          justify-content: space-around;
        `},c({side:"bottom-start",titleEl:p()},d({},"bottom start")),c({side:"bottom-centered",titleEl:p()},d({},"bottom centered")),c({side:"bottom-end",titleEl:p()},d({},"bottom end")))];return()=>r({id:"tooltip"},s(t("Tooltip")),a({class:o`
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
          `},u({titleEl:p()},d({},"custom tooltip"))),s(t("Tooltip Table")),m({Item:h=>c({titleEl:p(),...h},d({},`${h.color} ${h.variant}`))}))},ua="light";function Ve(e,t){const{bau:n,css:o,window:r}=e,{input:a}=n.tags,s=d=>{r.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},i=l();i?s(i):r.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(ua);const m=o`
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
  `;return function(...c){let[{color:u,variant:p="outline",size:g,...h},...b]=U(c);return a({required:"required",title:"Switch Theme",...h,class:$(m,u,p,g,t==null?void 0:t.class,h.class),type:"checkbox",checked:l()=="dark",onclick:v=>{s(v.target.checked?"dark":"light")}},...b)}}const ma=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,div:s,h2:l}=n.tags,i=F(e),m=Ve(e);return()=>r({id:"theme-switch"},l(t("Theme Switch")),a(s({class:o`
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
    `});function Ue(e,t){const{bau:n,css:o,createGlobalStyles:r,window:a}=e,{renderMenuItem:s}=t,{ul:l,li:i,nav:m,div:d}=n.tags,c=pa({css:o,createGlobalStyles:r}),u=({element:b,closeState:v})=>{b.scrollHeight!=0&&(v.val?p(b):g(b))};function p(b){b.style.height=b.scrollHeight+"px";const v=()=>{b.removeEventListener("transitionend",v)};b.addEventListener("transitionend",v),a.requestAnimationFrame(()=>{b.style.height="0px"})}function g(b){const v=()=>{b.removeEventListener("transitionend",v),b.style.height=null};b.addEventListener("transitionend",v),b.style.height=b.scrollHeight+"px"}const h=({depth:b=1,maxDepth:v})=>w=>{const{children:E,expanded:S}=w,I=n.state(!S);return i({class:()=>$(E?I.val?c.collapsed:c.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:N=>{E&&(I.val=!I.val)}},s(w.data)),E&&b<v&&l({bauMounted:({element:N})=>{I.val&&(N.style.height="0px")},"aria-expanded":({element:N})=>(u({element:N,closeState:I}),!I.val)},E.map(h({depth:b+1,maxDepth:v}))))};return function({tree:v,maxDepth:w=1/0,size:E,variant:S="plain",color:I="neutral",...N}){return m({class:$(c.nav,E,S,I,t==null?void 0:t.class,N.class)},v.children&&l(v.children.map(h({maxDepth:w}))))}}const ha=e=>{const{tr:t,bau:n}=e,{section:o,a:r,h2:a,h3:s}=n.tags,l=F(e),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=Ue(e,{renderMenuItem:({name:c,href:u})=>r({href:u,onclick:p=>{p.preventDefault()}},c)});return()=>o({id:"treeview"},a(t("Tree View")),s(t("Tree View Default")),d({tree:i}),s(t("Tree View Table")),l({Item:c=>d({...c,tree:i})}))};function ba(e,t={}){const{bau:n,css:o}=e,{div:r,span:a,pre:s,h3:l,h4:i}=n.tags;return function(d,...c){return r("Login")}}const ga=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=ba(e);return()=>o({id:"login"},s(t("Login Examples")),a("Basic"),r(l()))};function fa(e){const{tr:t,bau:n,css:o}=e,{div:r,article:a,h1:s}=n.tags;return function(){return r({class:o`
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
          `},s(t("Pages Examples")),ga(e)()))}}const va=e=>{const{bau:t,css:n,config:o}=e,{section:r,div:a,h1:s,span:l,p:i,ul:m,li:d,a:c,main:u,header:p,footer:g}=t.tags,{svg:h,use:b}=t.tagsNS("http://www.w3.org/2000/svg"),v=F(e),E=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(i("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(i("Item 3 content"))}]}),S=oe(e),I=De(e),N=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],A=x=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(x.label),l(x.code)),B=Be(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),M=ie(e),O={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},D=Pe(e),P=Y(e),j=Ne(e),q=ce(e),f=Le(e),y=ze(e),k={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},C=pe(e,{base:o.base+"/components"}),T=({disabled:x})=>a({class:$(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,x&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},h({width:100,height:100,fill:"currentColor"},b({href:"uploadIcon.svg#Capa_1"})),l("Choose a file to upload")),_=He(e),z=Oe(e),X=je(e),L=()=>u(Array(10).fill("").map((x,W)=>i(W+1,". Some text here"))),H=x=>{const W=X({id:"my-dialog",...x},p("Header"),L(),g(P({variant:"outline",onclick:()=>{W.close()}},"Cancel"),P({variant:"solid",onclick:()=>{W.close()}},"OK")));return W},R=Ge(e),G=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],V=x=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(x.label),l(x.code)),K=ne(e),re=be(e),fe=Fe(e),_e=de(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My tab Disabled"))}]}),Xe=Ve(e),We=()=>l("My tooltip"),qe=ue(e),Ye={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},Ke=Ue(e,{renderMenuItem:({name:x,href:W})=>c({href:W,onclick:Ze=>{Ze.preventDefault()}},x)}),ve=[{name:"Accordion",Item:x=>E({...x})},{name:"Alert",Item:x=>S({...x},`Alert ${x.color}`)},{name:"Autocomplete",Item:x=>I({...x,options:N,Option:A,getOptionLabel:({label:W})=>W,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:x=>B({...x,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(x,{index:W})=>M({...x,content:`${W*100}`},"☏")},{name:"Breadcrumbs",Item:x=>D({...x,...O})},{name:"Button",Item:x=>P({...x},`${x.variant} ${x.color}`)},{name:"Button Group",Item:x=>j({...x},P({},"ONE"),P({},"TWO"),P({},"THREE"))},{name:"Calendar",Item:x=>q({...x})},{name:"Checkbox",Item:(x,{index:W})=>f({id:`myCheckbox-${W}`,name:`myCheckbox-${W}`,...x})},{name:"Chip",Item:x=>y({...x},`Chip ${x.color}`)},{name:"DrillDown Menu",Item:x=>C({tree:k,...x})},{name:"File Input",Item:x=>_({Component:T,name:"file",accept:"text/*",onchange,...x})},{name:"Input",Item:x=>z({name:"my-input",id:"my-input-with",placeholder:"Enter text",...x})},{name:"Modal",Item:x=>{const W=H(x);return a(P({...x,onclick:()=>{W.showModal()}},"OPEN MODAL"),W)}},{name:"Select",Item:x=>a(R({...x,options:G,Option:V,getOptionLabel:({label:W})=>W,label:"Select a country..."}))},{name:"Slider",Item:x=>K(x)},{name:"Spinner",Item:x=>re(x)},{name:"Switch",Item:x=>a(fe({...x,id:"my-switch"}),fe({...x,id:"my-switch-checked",checked:!0}))},{name:"Tabs",Item:x=>_e(x)},{name:"Theme Switch",Item:x=>Xe(x)},{name:"Tooltip",Item:x=>qe({titleEl:We(),...x},P({},`${x.color} ${x.variant}`))},{name:"Tree View",Item:x=>Ke({...x,tree:Ye})}];return()=>r(s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),m({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},ve.map(({name:x})=>d(y({color:"primary"},c({href:`#${x}`},x))))),ve.map(x=>a({id:x.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},v(x))))},wa=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Et(e)})},{path:"components",action:()=>({title:"Component",component:va(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:$t(e)})},{path:"alert",action:()=>({title:"Alert",component:Mt(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Dt(e)})},{path:"animate",action:()=>({title:"Animate",component:Nt(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Lt(e)})},{path:"avatar",action:()=>({title:"Avatar",component:zt(e)})},{path:"badge",action:()=>({title:"Badge",component:Ht(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ot(e)})},{path:"button",action:()=>({title:"Button",component:jt(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ft(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Rt(e)})},{path:"chip",action:()=>({title:"Chip",component:Vt(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Ut(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Xt(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Wt(e)})},{path:"fileInput",action:()=>({title:"File Input",component:qt(e)})},{path:"input",action:()=>({title:"Input",component:Kt(e)})},{path:"modal",action:()=>({title:"Modal",component:Zt(e)})},{path:"popover",action:()=>({title:"Popover",component:Jt(e)})},{path:"select",action:()=>({title:"Select",component:Qt(e)})},{path:"slider",action:()=>({title:"Slider",component:ea(e)})},{path:"spinner",action:()=>({title:"Spinner",component:ta(e)})},{path:"switch",action:()=>({title:"Switch",component:na(e)})},{path:"table",action:()=>({title:"Table",component:ra(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:ca(e)})},{path:"tabs",action:()=>({title:"Tabs",component:oa(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:da(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ma(e)})},{path:"treeView",action:()=>({title:"Tree View",component:ha(e)})}]},{path:"pages",action:t=>({title:"Pages",component:fa(e)})}],ya=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),xa=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:r,states:a}=e,s=r.state(),l=t({componentState:s});return document.getElementById("app").replaceChildren(l),({router:m})=>{const d=o.location.pathname.replace(n,""),{title:c,component:u,Layout:p=t}=m.resolve({pathname:d});a.pathname.val=d,s.val=u,document.title=`${c}`}},ka=e=>{const{createGlobalStyles:t}=e;it(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"40%"}],["primary",{h:"230",s:"48%",l:"47%"}],["secondary",{h:"338",s:"100%",l:"48%"}],["success",{h:"120",s:"100%",l:"32%"}],["info",{h:"194",s:"80%",l:"62%"}],["warning",{h:"43",s:"100%",l:"50%"}],["danger",{h:"358",s:"95%",l:"60%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }

  `},Ca=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #1b1b1d;
  --background-surface-color: #242526;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  ${Ee({dark:!0})}
}
  `};ct();const ge={title:"Bau",base:"/bau/bau-ui"},Z=ft({config:ge});Z.states={pathname:Z.bau.state(window.location.pathname.replace(ge.base,""))};ka(Z);Ca(Z);tt({routes:wa({context:Z}),onLocationChange:xa({context:Z,LayoutDefault:kt(Z),config:ge}),notFoundRoute:ya(Z)});
