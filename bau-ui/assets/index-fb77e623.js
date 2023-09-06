(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const zn=(e,t)=>({...e,paths:[...t,e.path]}),wt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=zn(o,e);return n?[a,...wt({paths:[...e,o.path],routes:n})]:a}),Hn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Gn=({routes:e=[],notFoundRoute:t})=>{const n=wt({routes:e}).map(o=>({...o,regex:Hn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Un({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Gn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ve=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Fn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Wn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ct=e=>`var(--color-${e})`,Vn=e=>`var(--color-${e}-lightest)`,Zn=()=>Ve.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ct(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Vn(e)};
}
.solid.${e} {
  background-color: ${ct(e)};
}
`).join(`
`),Xn=()=>Ve.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Kn=e=>100-e*10,Yn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Kn(t)}%);`).join(`
`),lt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),qn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Fn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Wn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Jn({createGlobalStyles:e},{colorPalette:t=Ve}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>qn([n,o])).join(`
`)}
      ${Yn()}
      ${lt({})}
      ${Zn()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 30%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.4rem;
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
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
    html[data-theme="dark"] {
      ${Xn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${lt({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Qn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ze=e=>Object.prototype.toString.call(e??0).slice(8,-1),eo=e=>Ze(e)=="Object",ut=e=>Ze(e)=="Function",Ue=e=>["Object","Array"].includes(Ze(e)),dt=Object.getPrototypeOf,Fe=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,to=["splice","push","pop","shift","unshift","sort","reverse"],Te=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const W=e=>!me(e[0])&&eo(e[0])?e:[{},...e];function no(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,r=!1,s,c=y=>n.createElement(y),l=(y,m,b)=>{let C=s;s=m;let S=y(b);return s=C,S},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},p=(y,m,b,C,S,R)=>{var P;if(r){i.add(y);return}for(let Z of y.bindings){let{deps:_,element:N,renderInferred:V,render:J,renderItem:te}=Z;if(te&&m)(P=h(N,C,(...ae)=>v(te(...ae)),b,S,R)[m])==null||P.call();else{let ae=V?V({element:N}):J({element:N,renderItem:te})(..._.map(Fe));ae!==N&&N.replaceWith(Z.element=v(ae))}}E(y),u()},d=(y,m,b=[])=>({get(C,S,R){var P;if(s==null||s.add(y),S==="_isProxy")return!0;if(!((P=C[S])!=null&&P._isProxy)&&!me(C[S])&&Ue(C[S]))C[S]=new Proxy(C[S],d(y,m,[...b,S]));else if(to.includes(S)){let Z=C[S];return(..._)=>{let N=Z.apply(C,_);return p(y,S,N,_,m,b),N}}return Reflect.get(C,S,R)},set(C,S,R,P){let Z=Reflect.set(C,S,R,P);return p(y,"setItem",Z,{prop:S,value:R},m,[...b,S]),Z}}),g=(y,m)=>new Proxy(m,d(y,m)),h=(y,m,b,C,S,R)=>{let P=()=>y.replaceChildren(...Te(C,b)),Z=_=>y[_]&&y.removeChild(y[_]);return{assign:P,sort:P,reverse:P,setItem:()=>{var N;let _=R[0];(N=y.children[_])==null||N.replaceWith(b(S[_],_))},push:()=>y.append(...Te(m,(_,N)=>b(_,S.length+N))),unshift:()=>y.prepend(...Te(m,b)),pop:()=>Z("lastChild"),shift:()=>Z("firstChild"),splice:()=>{let[_,N,...V]=m;const{length:J}=y.children;for(let te=_>=0?Math.min(_+N-1,J-1):J-1;te>=(_>=0?_:J+_);te--)y.children[te].remove();if(V.length){let te=V.forEach((ae,je)=>b(ae,_+je));y.children[_]?y.children[_].after(...te):y.append(...te)}}}},f=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return s==null||s.add(m),m.valProxy??(m.valProxy=Ue(y)?g(m,y):y,m.valProxy)},set val(m){let b=this,C=b.val;Ue(m)?(b.valProxy=g(b,m),p(b,"assign",m)):m!==C&&(b.valProxy=m,p(b)),b.oldVal=C}}),v=y=>y==null||y===!1?c("span"):y.nodeType?y:n.createTextNode(y),x=(y,m)=>{let b=new Set;return m.val=l(y,b),b},w=y=>{let m=f(),b=x(y,m);m.computed=!0;for(let C of b)C.listeners.push({computed:y,deps:b,state:m});return m},E=y=>{for(let m of[...y.listeners])x(m.computed,m.state)},I=(y,...m)=>{if(m.length){let b=[];for(let C of m.flat(1/0))C!=null&&b.push(me(C)?z({deps:[C],render:()=>S=>S}):ut(C)?Q({renderInferred:C}):v(C));y.append(...b)}},$={},O=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??O(dt(y),m)),A=(y,m,b)=>{var C;return $[y+","+m]??($[y+","+m]=((C=O(b,m))==null?void 0:C.set)??0)},B=(y,m)=>new t.MutationObserver((b,C)=>{b.filter(S=>S.removedNodes).forEach(S=>[...S.removedNodes].find(R=>R===y&&(m({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),D=(y,m)=>new t.MutationObserver((b,C)=>b.forEach(S=>m({record:S,element:y}))).observe(y,{childList:!0}),j=y=>new Proxy(function(b,...C){var Z;let[S,...R]=W(C),P=y?n.createElementNS(y,b):c(b);for(let[_,N]of Object.entries(S)){if(_.startsWith("bau"))continue;let V=A(b,_,dt(P))?J=>P[_]=J:J=>P.setAttribute(_,J);N==null||(me(N)?z({deps:[N],render:()=>()=>(V(N.val),P)}):ut(N)&&(!_.startsWith("on")||N.isDerived)?Q({renderInferred:()=>(V(N({element:P})),P)}):N.renderProp?z({deps:N.deps,render:()=>()=>(V(N.renderProp({element:P})(...N.deps.map(Fe))),P)}):V(N))}return S.bauChildMutated&&D(P,S.bauChildMutated),I(P,...R),(Z=S.bauCreated)==null||Z.call(S,{element:P}),S.bauMounted&&t.requestAnimationFrame(()=>S.bauMounted({element:P})),S.bauUnmounted&&t.requestAnimationFrame(()=>B(P,S.bauUnmounted)),P},{get:(m,b)=>m.bind(void 0,b)}),Y=(y,m,b)=>{y.element=v(b);for(let C of m)me(C)&&(a.add(C),C.bindings.push(y));return y.element},Q=({renderInferred:y,element:m})=>{let b=new Set,C=l(y,b,{element:m});return Y({renderInferred:y},b,C)},z=({deps:y,element:m,render:b,renderItem:C})=>Y({deps:y,render:b,renderItem:C},y,b({element:m,renderItem:C})(...y.map(Fe))),F=(y,m,b)=>z({deps:[y],render:({renderItem:C})=>S=>(m.append(...Te(S,C)),m),renderItem:b}),U=y=>{r=!0,y(),r=!1,i.forEach(p),i.clear()};return{tags:j(),tagsNS:j,state:f,bind:z,loop:F,derive:w,stateSet:a,batch:U}}const oo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},ao=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},ro=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function so(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const r=ro(a,i),s=oo(r);return!t.getElementById(s)&&ao(t,e==null?void 0:e.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function io(e){const t=no(),n=so();return Jn(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function $e(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:r=a,animationShow:s=a,...c},l){return o({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!r()||d.getAttribute("cloned"))return;const g=d.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=d.getAttribute("width"),g.style.height=d.getAttribute("height"),g.style.position="absolute",g.style.animation=r(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var h;return(h=g.parentNode)==null?void 0:h.removeChild(g)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const g=d.getBoundingClientRect();if(d.setAttribute("width",g.width+"px"),d.setAttribute("height",g.height+"px"),s()){d.style.animation=s();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function K(e,t){const{bau:n,css:o}=e,a={root:o`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      min-height: 2rem;
      border: none;
      border-radius: var(--global-radius);
      font-weight: var(--font-weight-semibold);
      text-align: center;
      text-decoration: none;
      overflow: hidden;
      box-sizing: border-box;
      user-select: none;
      transition: all var(--transition-slow);

      &.outline,
      &.solid {
        box-shadow: var(--shadow-m);
      }
      &.outline:hover,
      &.solid:hover {
        box-shadow: var(--shadow-lg);
      }
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &:hover.solid {
        filter: brightness(var(--brightness-hover-always));
      }
      &.sm {
        padding: 0.3rem;
      }
      &.md {
        padding: 0.2rem 0.8rem;
      }
      &.lg {
        padding: 0.2rem 2rem;
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:u,href:p,...d},...g]=W(r);return(p?n.tags.a:n.tags.button)({...d,class:T("button",a.root,c,l,s,p?a.a:a.button,u&&a.disabled,t==null?void 0:t.class,d.class),disabled:u,href:p,...!p&&{type:"button"}},g)}}const ee=["neutral","primary","success","danger","warning"],co=["plain","outline","solid"],lo=["sm","md","lg"],uo="light",po=()=>ee.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Xe(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,r=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(uo);const l=o`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--global-radius);
    appearance: none;
    transition: all var(--transition-fast);
    &:hover {
      cursor: pointer;
    }
    &::after {
      content: "\u2600";
      font-size: x-large;
      transition: all var(--transition-fast);
    }
    &:checked {
    }
    &:checked::after {
      content: "\u263D";
      font-size: x-large;
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      width: 1.7rem;
      height: 1.7rem;
    }
    &.sm::after {
      font-size: 1rem;
    }
    &.md {
      width: 2rem;
      height: 2rem;
    }
    &.md::after {
      font-size: 1.5rem;
    }
    &.lg {
      width: 3rem;
      height: 3rem;
    }
    &.lg::after {
      font-size: 2.3rem;
    }
    ${po()}
  `;return function(...p){let[{color:d,variant:g="outline",size:h="md",...f},...v]=W(p);return i({required:"required",title:"Switch Theme",...f,class:T("theme-switch",d,g,h,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:s()=="dark",onclick:x=>{r(x.target.checked?"dark":"light")}},...v)}}function mo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:r,header:s,h1:c,div:l,a:u,img:p,b:d,ul:g,li:h}=n.tags,{svg:f,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,w=K(e,{class:o`
      background: transparent;
    `}),E=Xe(e),I=()=>r(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),$=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},w({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},I()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(t("Bau UI")))),O=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},E(),w({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${a.base}/github-mark-white.svg`,width:30,height:30})));return function(){return s({class:o`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},$(),O())}}function go({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:r,ul:s,li:c,p:l,div:u,h1:p}=t.tags,d=({links:f,title:v})=>o({class:n`
          & ul {
            list-style: none;
            padding-left: 0;
          }
          & h1 {
            font-size: medium;
            color: var(--color-content-secondary);
          }
          & a {
            text-decoration: none;
            color: var(--color-content-secondary);
            &:hover {
              text-decoration: underline;
            }
          }
        `},p(v),s(f.map(({href:x,name:w})=>c(r({href:x},w))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 4rem;
          border-top: 1px solid var(--color-emphasis-200);
          color: var(--color-content-secondary);
        `},u({class:n`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `},d({title:"Bau UI",links:g}),d({title:"Bau Ecosystem",links:h})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.42.0"),i("MIT license")))}}function we(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
    list-style: none;
    padding: 0;
    margin: 0 0;
    &.solid {
      & li:hover {
        filter: brightness(var(--brightness-hover-always));
      }
      & li.active {
        filter: brightness(var(--brightness-active-always));
      }
    }
    & li {
      padding: 0.4rem;
      cursor: pointer;
      background-color: inherit;
      transition: all var(--transition-slow) ease-out;
      display: flex;
      align-items: center;
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=W(s);return a({...p,class:T("list",i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Ae="0.3s",yt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(yt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Ct=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ct(e)(t.children[o]);if(a)return a}},bo=({keyframes:e})=>({hideToLeft:e`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,hideToRight:e`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `});function Ke(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:r="",hashBased:s=!1}=t,c=`${i.base}${r}`,l=z=>{var F;return((F=z.parentTree.data)==null?void 0:F.href)??z.parentTree.children[0].data.href},u=({variant:z,color:F,size:U,currentTree:y,data:m})=>E(A({variant:z,color:F,size:U,href:`${c}${l(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),A({variant:z,color:F,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:z,subTree:{data:{name:F,href:U},children:y=[]}})=>A({size:z,href:`${c}${U}`,"data-ischild":!y.length},F),d=({pathname:z,subTree:F})=>{var U;return z===((U=F==null?void 0:F.data)==null?void 0:U.href)},{renderHeader:g=u,renderMenuItem:h=p,isActive:f=d}=t,{li:v,nav:x,div:w,header:E,a:I}=n.tags,$=$e(e),O=we(e),A=K(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:D}=bo(e),j=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      & a {
        padding: 0.6rem;
        border-radius: 0;
        font-weight: 600;
      }
    }
    & a,
    & ul {
      border-width: 0 !important;
      box-shadow: none !important;
    }
    & ul {
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & li {
        padding: 0;
        & a {
          width: 100%;
        }
      }
    }
  `,Y=({variant:z,color:F,size:U,currentTree:y,pathnameState:m})=>{const{children:b,parentTree:C,data:S}=y;return w({class:T("drillDownMenu",z,F,U)},C&&g({variant:z,color:F,size:U,data:S,currentTree:y}),b&&O({class:T(z,F,U)},b.map(R=>v({class:()=>T(R.children&&"has-children",f({pathname:m.val,subTree:R})&&"active")},h({variant:z,color:F,size:U,subTree:R})))))},Q=({tree:z,pathname:F})=>{let U=yt({})(structuredClone(z)),y=Ct(F)(U);return y||(console.error("drilldown no sub tree",F),y=U),y};return function(F){const{variant:U="plain",color:y="neutral",size:m="md",tree:b,...C}=F,S=n.state(a.location.pathname.replace(c,"")),R=n.derive(()=>Q({tree:b,pathname:S.val}));a.document.addEventListener("click",V=>{const{target:J}=V,te=J.getAttribute("href");if(J.tagName==="A"&&te&&!te.startsWith("http")){let ae=te.replace(c,"");s||(ae=ae.replace(J.hash,"")),S.val=ae}});let P=1;const Z=V=>{const{dataset:J}=V.target;J.buttonback=="true"?P=-1:J.ischild=="false"?P=1:J.ischild=="true"&&(P=0)},_=V=>{switch(V){case 1:return`${B} ${Ae}`;case-1:return`${D} ${Ae}`;default:return""}},N=V=>{switch(V){case 1:return`${D} ${Ae} reverse`;case-1:return`${B} ${Ae} reverse`;default:return""}};return x({class:T(j,t==null?void 0:t.class,C.class),onclick:Z},$({animationHide:()=>_(P),animationShow:()=>N(P)},()=>Y({variant:U,color:y,size:m,currentTree:R.val,pathnameState:S})))}}const ho={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Et(e){const{tr:t,bau:n,css:o,config:a,states:i,window:r}=e,{div:s,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let g=!1;const h=Ke(e);return function(){return s({bauMounted:({element:v})=>{r.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:v=>{g&&!v.target.dataset.buttonback&&!v.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
            grid-area: sidebar;
            position: sticky;
            top: calc(var(--header-height));
            align-self: start;
            overflow-y: scroll;
            height: calc(100vh - var(--header-height) - 1rem);
            border-right: 1px solid var(--color-emphasis-200);
            min-width: 200px;

            @media (max-width: 640px) {
              position: fixed;
              width: 100vw;
              z-index: 1;
              display: none;
            }
          `)},h({tree:ho}))}}const fo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,r=$e(e),s=mo(e),c=Et(e),l=go(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(d="")=>`${u} ease-in-out 0.5s ${d}`;return function({componentState:g}){return i({class:n`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "sidebar footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "footer";
          }
        `},s(),c(),r({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-x: scroll;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val&&g.val({})),l())}};function Ne(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0.2rem;
    }
    &.md {
      padding: 0.2rem 0.5rem;
    }
    &.lg {
      padding: 0.3rem 1rem;
    }
  `;return function(...s){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...g]=W(s);return a({...d,onclick:p,class:T("chip",i,c,l,u,p&&"clickable",t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}function vo(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:r,p:s}=t.tags;K(e);const c=n`
    padding: 0 1rem 1rem 1rem;
    & h1 {
      font-size: 56px;
    }
    & h2 {
      font-size: 48px;
    }
    & p {
      font-size: 24px;
      color: var(--color-emphasis-900);
    }
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),r(p),s(d))}}function xo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,r=n`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & .feature {
      border: 1px solid var(--color-emphasis-200);
      box-shadow: var(--shadow-m);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 1rem;
      width: 28%;
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
        width: auto;
      }
    }
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function wo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:r,div:s,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:g,size:h})=>s({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},g),r({class:n`
              display: flex;
              align-items: center;
              width: 100%;
              margin: 0 1rem;
            `},s({class:n`
                display: flex;
                color: var(--font-color-inverse);
                background-image: linear-gradient(
                  247deg,
                  var(--color-danger) 0%,
                  var(--color-success) ${h/d*100}%
                );
                justify-content: flex-end;
                width: ${h/d*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},h)));return function({data:g=[]}){return o({class:n`
          box-shadow: var(--shadow-m);
          border: 1px solid var(--color-emphasis-200);
          padding: 1rem;
        `},c({class:n`
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
          `},"Bundle Size Comparison in kB"),a({class:n`
            display: flex;
            flex-direction: column;
          `},g.map(p({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function yo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:r,section:s}=t.tags,c=vo(e),l=xo(e),u=K(e);Ne(e);const p=wo(e),d=(...x)=>a({class:n`
          background-color: var(--color-emphasis-100);
          border-radius: var(--global-radius);
          padding: 0.5rem 0.5rem;
          margin: 0.5rem 0;
        `},a({class:n`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;

            gap: 1rem;
          `},...x)),g=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:h}),v())}}function Co(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const Eo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:r}=n.tags,s=Co(e);return()=>o({id:"login"},r(t("Login Examples")),i("Basic"),a(s()))};function So(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
          grid-area: main;
          display: flex;
        `},i({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},r(t("Pages Examples")),Eo(e)()))}}function ko(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function St(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&St(n)}),e}class pt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function kt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const To="</span>",mt=e=>!!e.scope,Ao=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Mo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=kt(t)}openNode(t){if(!mt(t))return;const n=Ao(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){mt(t)&&(this.buffer+=To)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const gt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ye{constructor(){this.rootNode=gt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=gt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ye._collapse(n)}))}}class Do extends Ye{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Mo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function Tt(e){return de("(?=",e,")")}function Io(e){return de("(?:",e,")*")}function $o(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function No(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function qe(...e){return"("+(No(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function At(e){return new RegExp(e.toString()+"|").exec("").length-1}function Bo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Po=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Je(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),r="";for(;i.length>0;){const s=Po.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(t)}const _o=/\b\B/,Mt="[a-zA-Z]\\w*",Qe="[a-zA-Z_]\\w*",Dt="\\b\\d+(\\.\\d+)?",It="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",$t="\\b(0b[01]+)",Oo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ro=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},Lo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},jo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},zo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Be=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Ho=Be("//","$"),Go=Be("/\\*","\\*/"),Uo=Be("#","$"),Fo={scope:"number",begin:Dt,relevance:0},Wo={scope:"number",begin:It,relevance:0},Vo={scope:"number",begin:$t,relevance:0},Zo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Xo={scope:"title",begin:Mt,relevance:0},Ko={scope:"title",begin:Qe,relevance:0},Yo={begin:"\\.\\s*"+Qe,relevance:0},qo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Me=Object.freeze({__proto__:null,MATCH_NOTHING_RE:_o,IDENT_RE:Mt,UNDERSCORE_IDENT_RE:Qe,NUMBER_RE:Dt,C_NUMBER_RE:It,BINARY_NUMBER_RE:$t,RE_STARTERS_RE:Oo,SHEBANG:Ro,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:Lo,QUOTE_STRING_MODE:jo,PHRASAL_WORDS_MODE:zo,COMMENT:Be,C_LINE_COMMENT_MODE:Ho,C_BLOCK_COMMENT_MODE:Go,HASH_COMMENT_MODE:Uo,NUMBER_MODE:Fo,C_NUMBER_MODE:Wo,BINARY_NUMBER_MODE:Vo,REGEXP_MODE:Zo,TITLE_MODE:Xo,UNDERSCORE_TITLE_MODE:Ko,METHOD_GUARD:Yo,END_SAME_AS_BEGIN:qo});function Jo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Qo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ea(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Jo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ta(e,t){Array.isArray(e.illegal)&&(e.illegal=qe(...e.illegal))}function na(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function oa(e,t){e.relevance===void 0&&(e.relevance=1)}const aa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Tt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ra=["of","and","for","in","not","or","if","then","parent","list","value"],sa="keyword";function Nt(e,t,n=sa){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Nt(e[i],t,i))}),o;function a(i,r){t&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,ia(c[0],c[1])]})}}function ia(e,t){return t?Number(t):ca(e)?0:1}function ca(e){return ra.includes(e.toLowerCase())}const bt={},ue=e=>{console.error(e)},ht=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{bt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),bt[`${e}/${t}`]=!0)},Ie=new Error;function Bt(e,t,{key:n}){let o=0;const a=e[n],i={},r={};for(let s=1;s<=t.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=At(t[s-1]);e[n]=r,e[n]._emit=i,e[n]._multi=!0}function la(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ie;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Ie;Bt(e,e.begin,{key:"beginScope"}),e.begin=Je(e.begin,{joinWith:""})}}function ua(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ie;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Ie;Bt(e,e.end,{key:"endScope"}),e.end=Je(e.end,{joinWith:""})}}function da(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function pa(e){da(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),la(e),ua(e)}function ma(e){function t(r,s){return new RegExp(ve(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=At(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=t(Je(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[Qo,na,pa,aa].forEach(u=>u(r,s)),e.compilerExtensions.forEach(u=>u(r,s)),r.__beforeBegin=null,[ea,ta,oa].forEach(u=>u(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=Nt(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(u){return ga(u==="self"?r:u)})),r.contains.forEach(function(u){i(u,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function Pt(e){return e?e.endsWithParent||Pt(e.starts):!1}function ga(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Pt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var ba="11.8.0";class ha extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const We=kt,ft=ie,vt=Symbol("nomatch"),fa=7,_t=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Do};function c(m){return s.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const C=s.languageDetectRe.exec(b);if(C){const S=D(C[1]);return S||(ht(i.replace("{}",C[1])),ht("Falling back to no-highlight mode for this block.",m)),S?C[1]:"no-highlight"}return b.split(/\s+/).find(S=>c(S)||D(S))}function u(m,b,C){let S="",R="";typeof b=="object"?(S=m,C=b.ignoreIllegals,R=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),R=m,S=b),C===void 0&&(C=!0);const P={code:S,language:R};U("before:highlight",P);const Z=P.result?P.result:p(P.language,P.code,C);return Z.code=P.code,U("after:highlight",Z),Z}function p(m,b,C,S){const R=Object.create(null);function P(k,M){return k.keywords[M]}function Z(){if(!L.keywords){ne.addText(q);return}let k=0;L.keywordPatternRe.lastIndex=0;let M=L.keywordPatternRe.exec(q),H="";for(;M;){H+=q.substring(k,M.index);const X=re.case_insensitive?M[0].toLowerCase():M[0],oe=P(L,X);if(oe){const[se,Ln]=oe;if(ne.addText(H),H="",R[X]=(R[X]||0)+1,R[X]<=fa&&(ke+=Ln),se.startsWith("_"))H+=M[0];else{const jn=re.classNameAliases[se]||se;V(M[0],jn)}}else H+=M[0];k=L.keywordPatternRe.lastIndex,M=L.keywordPatternRe.exec(q)}H+=q.substring(k),ne.addText(H)}function _(){if(q==="")return;let k=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){ne.addText(q);return}k=p(L.subLanguage,q,!0,it[L.subLanguage]),it[L.subLanguage]=k._top}else k=g(q,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(ke+=k.relevance),ne.__addSublanguage(k._emitter,k.language)}function N(){L.subLanguage!=null?_():Z(),q=""}function V(k,M){k!==""&&(ne.startScope(M),ne.addText(k),ne.endScope())}function J(k,M){let H=1;const X=M.length-1;for(;H<=X;){if(!k._emit[H]){H++;continue}const oe=re.classNameAliases[k[H]]||k[H],se=M[H];oe?V(se,oe):(q=se,Z(),q=""),H++}}function te(k,M){return k.scope&&typeof k.scope=="string"&&ne.openNode(re.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(V(q,re.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),q=""):k.beginScope._multi&&(J(k.beginScope,M),q="")),L=Object.create(k,{parent:{value:L}}),L}function ae(k,M,H){let X=Bo(k.endRe,H);if(X){if(k["on:end"]){const oe=new pt(k);k["on:end"](M,oe),oe.isMatchIgnored&&(X=!1)}if(X){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return ae(k.parent,M,H)}function je(k){return L.matcher.regexIndex===0?(q+=k[0],1):(Ge=!0,0)}function Pn(k){const M=k[0],H=k.rule,X=new pt(H),oe=[H.__beforeBegin,H["on:begin"]];for(const se of oe)if(se&&(se(k,X),X.isMatchIgnored))return je(M);return H.skip?q+=M:(H.excludeBegin&&(q+=M),N(),!H.returnBegin&&!H.excludeBegin&&(q=M)),te(H,k),H.returnBegin?0:M.length}function _n(k){const M=k[0],H=b.substring(k.index),X=ae(L,k,H);if(!X)return vt;const oe=L;L.endScope&&L.endScope._wrap?(N(),V(M,L.endScope._wrap)):L.endScope&&L.endScope._multi?(N(),J(L.endScope,k)):oe.skip?q+=M:(oe.returnEnd||oe.excludeEnd||(q+=M),N(),oe.excludeEnd&&(q=M));do L.scope&&ne.closeNode(),!L.skip&&!L.subLanguage&&(ke+=L.relevance),L=L.parent;while(L!==X.parent);return X.starts&&te(X.starts,k),oe.returnEnd?0:M.length}function On(){const k=[];for(let M=L;M!==re;M=M.parent)M.scope&&k.unshift(M.scope);k.forEach(M=>ne.openNode(M))}let Se={};function st(k,M){const H=M&&M[0];if(q+=k,H==null)return N(),0;if(Se.type==="begin"&&M.type==="end"&&Se.index===M.index&&H===""){if(q+=b.slice(M.index,M.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=Se.rule,X}return 1}if(Se=M,M.type==="begin")return Pn(M);if(M.type==="illegal"&&!C){const X=new Error('Illegal lexeme "'+H+'" for mode "'+(L.scope||"<unnamed>")+'"');throw X.mode=L,X}else if(M.type==="end"){const X=_n(M);if(X!==vt)return X}if(M.type==="illegal"&&H==="")return 1;if(He>1e5&&He>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return q+=H,H.length}const re=D(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Rn=ma(re);let ze="",L=S||Rn;const it={},ne=new s.__emitter(s);On();let q="",ke=0,ce=0,He=0,Ge=!1;try{if(re.__emitTokens)re.__emitTokens(b,ne);else{for(L.matcher.considerAll();;){He++,Ge?Ge=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const k=L.matcher.exec(b);if(!k)break;const M=b.substring(ce,k.index),H=st(M,k);ce=k.index+H}st(b.substring(ce))}return ne.finalize(),ze=ne.toHTML(),{language:m,value:ze,relevance:ke,illegal:!1,_emitter:ne,_top:L}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:We(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:b.slice(ce-100,ce+100),mode:k.mode,resultSoFar:ze},_emitter:ne};if(a)return{language:m,value:We(b),illegal:!1,relevance:0,errorRaised:k,_emitter:ne,_top:L};throw k}}function d(m){const b={value:We(m),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return b._emitter.addText(m),b}function g(m,b){b=b||s.languages||Object.keys(t);const C=d(m),S=b.filter(D).filter(Y).map(N=>p(N,m,!1));S.unshift(C);const R=S.sort((N,V)=>{if(N.relevance!==V.relevance)return V.relevance-N.relevance;if(N.language&&V.language){if(D(N.language).supersetOf===V.language)return 1;if(D(V.language).supersetOf===N.language)return-1}return 0}),[P,Z]=R,_=P;return _.secondBest=Z,_}function h(m,b,C){const S=b&&n[b]||C;m.classList.add("hljs"),m.classList.add(`language-${S}`)}function f(m){let b=null;const C=l(m);if(c(C))return;if(U("before:highlightElement",{el:m,language:C}),m.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),s.throwUnescapedHTML))throw new ha("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const S=b.textContent,R=C?u(S,{language:C,ignoreIllegals:!0}):g(S);m.innerHTML=R.value,h(m,C,R.language),m.result={language:R.language,re:R.relevance,relevance:R.relevance},R.secondBest&&(m.secondBest={language:R.secondBest.language,relevance:R.secondBest.relevance}),U("after:highlightElement",{el:m,result:R,text:S})}function v(m){s=ft(s,m)}const x=()=>{I(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function w(){I(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function I(){if(document.readyState==="loading"){E=!0;return}document.querySelectorAll(s.cssSelector).forEach(f)}function $(){E&&I()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",$,!1);function O(m,b){let C=null;try{C=b(e)}catch(S){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(S);else throw S;C=r}C.name||(C.name=m),t[m]=C,C.rawDefinition=b.bind(null,e),C.aliases&&j(C.aliases,{languageName:m})}function A(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function B(){return Object.keys(t)}function D(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function j(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=b})}function Y(m){const b=D(m);return b&&!b.disableAutodetect}function Q(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function z(m){Q(m),o.push(m)}function F(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function U(m,b){const C=m;o.forEach(function(S){S[C]&&S[C](b)})}function y(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),f(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:I,highlightElement:f,highlightBlock:y,configure:v,initHighlighting:x,initHighlightingOnLoad:w,registerLanguage:O,unregisterLanguage:A,listLanguages:B,getLanguage:D,registerAliases:j,autoDetection:Y,inherit:ft,addPlugin:z,removePlugin:F}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=ba,e.regex={concat:de,lookahead:Tt,either:qe,optional:$o,anyNumberOfTimes:Io};for(const m in Me)typeof Me[m]=="object"&&St(Me[m]);return Object.assign(e,Me),e},ge=_t({});ge.newInstance=()=>_t({});var va=ge;ge.HighlightJS=ge;ge.default=ge;const fe=ko(va),xt="[A-Za-z$_][0-9A-Za-z$_]*",xa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],wa=["true","false","null","undefined","NaN","Infinity"],Ot=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Rt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Lt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ya=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ca=[].concat(Lt,Ot,Rt);function jt(e){const t=e.regex,n=(b,{after:C})=>{const S="</"+b[0].slice(1);return b.input.indexOf(S,C)!==-1},o=xt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,C)=>{const S=b[0].length+b.index,R=b.input[S];if(R==="<"||R===","){C.ignoreMatch();return}R===">"&&(n(b,{after:S})||C.ignoreMatch());let P;const Z=b.input.substring(S);if(P=Z.match(/^\s*=/)){C.ignoreMatch();return}if((P=Z.match(/^\s+extends\s+/))&&P.index===0){C.ignoreMatch();return}}},s={$pattern:xt,keyword:xa,literal:wa,built_in:Ca,"variable.language":ya},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},E=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,f,v,{match:/\$\d+/},p];d.contains=E.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(E)});const I=[].concat(w,d.contains),$=I.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(I)}]),O={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:$},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ot,...Rt]}},D={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},j={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[O],illegal:/%/},Y={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(b){return t.concat("(?!",b.join("|"),")")}const z={match:t.concat(/\b/,Q([...Lt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},O]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[O]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:$,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),D,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,f,v,w,{match:/\$\d+/},p,B,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:$}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},j,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[O,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[O]},z,Y,A,U,{match:/\$[(.]/}]}}function Ea(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Sa=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",jt),fe.registerLanguage("sh",Ea),function({text:r,language:s="js"}){const c=a({class:`hljs language-${s}`});return c.innerHTML=fe.highlight(r,{language:s}).value,o({class:n`
          display: inline-block;
        `},c)}};function ka(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:r,a:s,ul:c,li:l}=t.tags,u=Sa(e);return function(){return o({class:n`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},a("Getting Started"),i("Grab the source code template for Javascript or Typescript"),u({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),i("Install the dependencies with the package manager of your choice:"),u({text:`cd my-bau-project
npm install`}),i("This template project is built with Vite. To start a development server:"),u({text:"npm run dev"}),i("The application starting point is at ",r("src/main.ts")),i("let's see how to add a ",s({href:"components/button"},"button component")," , first of all,  import the button:"),u({text:'import button from "@grucloud/bau-ui/button";'}),i("Then, create an instance of this ",s({href:"components/button"},"button")," by passing the context object:"),u({text:"const Button = button(context);"}),i("Last step is to place the button into the tree of component:"),u({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),i("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(s({href:"components"},"Visit the component gallery")),l(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Pe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    border: 1px solid transparent;
    border-radius: var(--global-radius);
    padding: 1rem;
    &.sm {
      box-shadow: var(--shadow-s);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.03)
      );
    }
    &.md {
      box-shadow: var(--shadow-m);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05)
      );
    }
    &.lg {
      box-shadow: var(--shadow-lg);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
      );
    }
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=W(s);return a({...p,class:T("paper",u,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const zt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
            & th,
            & td {
              padding: 0.5rem;
            }
          }
        `},a(c(r(l(d??""),ee.map(g=>l(g)))),i(co.map(g=>r(l(g),ee.map((h,f)=>s(p({color:h,variant:g},{index:f}))))))))}},Ta=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},lo.map((r,s)=>i({color:"success",variant:"outline",size:r},{index:s})))}},G=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:i,p:r,h2:s,h3:c,pre:l,code:u}=t.tags;fe.registerLanguage("javascript",jt);const p=Pe(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),d=zt(e),g=Ta(e),h=({text:f})=>l({class:n`
          display: inline-block;
        `},u({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=fe.highlight(f,{language:"js"}).value}}));return function(v){return o({class:n``},i(v.title),r(v.description),v.gridItem&&[s("Variant/Color"),!v.variantColorTableDisable&&v.gridItem&&p(d({Item:v.gridItem(e)})),s("Size"),r("Component with size: ",u("sm"),", ",u("md"),", and ",u("lg")),v.gridItem&&p(g({Item:v.gridItem(e)}))],s("Usage"),c("Import"),h({text:v.importStatement}),s("Examples"),v.examples.map(x=>a(i(x.title),r(x.description),p(x.createComponent(e)()),h({text:x.code}))))}};function et(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: inherit;
      &::after {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::after {
        content: "\u203A";
        padding: 0.5rem;
      }
      &.open::after {
        content: "\u203A";
        padding: 0.5rem;
        transform: rotate(90deg);
      }
    }
    & .content {
      background-color: inherit;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      overflow-y: scroll;
    }
  `,r=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?s(l):c(l))};function s(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:g="md",Header:h,Content:f,close:v=!0,...x}]=W(u);const w=n.state(v);return a({...x,class:T("collapsible",g,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>T("header",f?w.val?"close":"open":""),onclick:E=>{w.val=!w.val,E.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:E})=>{w.val&&(E.style.height="0px")},"aria-expanded":({element:E})=>(r({element:E,closeState:w}),!w.val)},f&&f()))}}const Aa=()=>ee.map(e=>`
& li.plain.${e} h3::after {
  color: var(--color-${e});
}
& li.outline.${e} h3::after {
  color: var(--color-${e});
}
& h3.solid.${e}:hover {
  filter: brightness(var(--brightness-hover-always));
}
`).join(`
`);function _e(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:r,h3:s,button:c}=n.tags,l=n.state(""),u=et(e),p=g=>h=>{l.val==g?l.val="":l.val=g},d=o`
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
        margin: 0.2rem;
        overflow: hidden;
        border-radius: var(--global-radius);
        transition: all var(--transition-slow) ease-out;
        background-color: inherit;
        &:hover.solid {
          filter: brightness(var(--brightness-hover-always)) !important;
        }
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
        & h3 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          & button {
            width: 100%;
            border: none;
            background-color: inherit;
            text-align: left;
            font-size: large;
            cursor: pointer;
            color: inherit;
          }
        }
        & h3.active {
          font-weight: var(--font-weight-semibold);
        }
      }
    }
    ${Aa()}
  `;return function(...h){let[{color:f,variant:v="outline",size:x="md",data:w=[],...E}]=W(h);const I=$=>{const{Header:O,Content:A,name:B}=$,D=()=>s({class:()=>T(l.val==B&&"active")},c({type:"button","aria-controls":`bau-${B}`,"aria-expanded":({element:Y})=>l.val==B},O($))),j=()=>a({id:`bau-${B}`,"data-state":({element:Y})=>l.val==B},A($));return r({class:T(f,v,x),onclick:p(B)},u({Header:D,Content:j}))};return a({class:T("accordion",d,t==null?void 0:t.class,E.class)},i(w.map(I)))}}const Ht=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return r=>i({...r,data:a})},Ma=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Da=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;

  const accordionDefs: Accordion[] = [
    {
      name: "Item1",
      Header: () => "Item 1",
      Content: () => div(p("Item 1 Content")),
    },
    {
      name: "Item2",
      Header: () => "Item 2",
      Content: () => div(p("Item 2 Content")),
    },
  ];
  const Accordion = accordion(context);

  return () =>
    Accordion({ data: accordionDefs, color: "neutral", variant: "outline" });
};
`,Gt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ia=e=>{const{css:t}=e,n=Gt(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},$a=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context);

  return () =>
    Accordion({
      color: "warning",
      data: accordionDefs,
      class: css\`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      \`,
    });
};
`,Na=e=>{const{css:t}=e,n=Gt(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ba=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context);

  return () =>
    Accordion({
      color: "success",
      variant: "outline",
      data: accordionDefs,
      class: css\`
        &.accordion {
          & ul {
            & li {
              & h3 {
                &::after {
                  content: "\\u002B";
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
      \`,
    });
};
`,Pa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Da,createComponent:Ma},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:$a,createComponent:Ia},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ba,createComponent:Na}],gridItem:Ht},_a=e=>{const t=G(e);return()=>t(Pa)},Oa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ra=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},La=()=>ee.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Oe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:r}=n.tags;Ra({css:o,createGlobalStyles:a});const s=o`
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
    ${La()}
  `,c=K(e),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:g="outline",color:h="neutral",size:f="md",onRemove:v,...x}=p;return i({...x,class:T(`alert-${g}`,g,h,f,s,t==null?void 0:t.class,p.class,"alert"),role:"alert"},r({class:"icon"},Oa[h]),i({class:"content"},...d),v&&l({onclick:v}))}}const Ut=e=>{const t=Oe(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},ja=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Oe(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},za=`import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { h4, p } = bau.tags;

  const Alert = alert(context);
  return () =>
    Alert(
      {
        color: "danger",
      },
      h4("Something went wrong"),
      p("Error code ", 404),
      p("Status ", "Not Found")
    );
};
`,Ha=e=>{const{css:t}=e,n=Oe(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Ga=`import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { css } = context;

  const Alert = alert(context, {
    class: css\`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    \`,
  });

  return () =>
    Alert({ color: "warning" }, "Your coffee supply is getting low.");
};
`,Ua={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:za,createComponent:ja},{title:"Custom Alert ",description:"A custom alert.",code:Ga,createComponent:Ha}],gridItem:Ut},Fa=e=>{const t=G(e);return()=>t(Ua)},Wa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:r=15e3}=t,{div:s}=n.tags,c=n.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},u={stack:o`
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
      animation: ${l.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${l.removing} var(--transition-slow) ease-out;
    `},p=({id:d,status:g})=>{const h=c.val.findIndex(f=>f.id===d);h!=-1&&(c.val[h].status=g)};return function(g={},...h){const f=({id:w})=>{p({id:w,status:"removing"});const E=c.val.findIndex(I=>I.id===w);E!=-1&&c.val.splice(E,1)},v=({Component:w})=>{const E={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(E),setTimeout(()=>f(E),r)},x=w=>s({class:u.item,onclick:()=>f(w)},w.Component());return document.addEventListener("alert.add",w=>v(w.detail)),document.addEventListener("alert.remove",w=>f(w.detail)),s({class:T(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,s(),x))}},Va=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Wa(e,{deleteAfterDuration:2e4}),i=K(e),r=Oe(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Za=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import alert from "@grucloud/bau-ui/alert";
import alertStack from "@grucloud/bau-ui/alertStack";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section } = bau.tags;

  const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
  const Button = button(context);
  const Alert = alert(context);

  return () =>
    section(
      AlertStack(),
      Button(
        {
          color: "success",
          variant: "outline",
          onclick: () => {
            document.dispatchEvent(
              new CustomEvent("alert.add", {
                detail: {
                  Component: () =>
                    Alert(
                      {
                        color: "success",
                      },
                      tr("Infrastructure Created")
                    ),
                },
              })
            );
          },
        },
        "Success Alert"
      )
    );
};
`,Xa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Za,createComponent:Va}]},Ka=e=>{const t=G(e);return()=>t(Xa)},Ya=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=$e(e),r=K(e),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(r({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},qa=`import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, keyframes } = context;
  const { section, div } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const hideRight = keyframes\`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  \`;

  const showState = bau.state(true);

  return () =>
    section(
      Button(
        {
          onclick: () => {
            showState.val = !showState.val;
          },
        },
        () => (showState.val ? "Hide" : "Show")
      ),
      Animate(
        {
          animationHide: () => \`\${hideRight} 0.5s\`,
          animationShow: () => \`\${hideRight} 0.5s reverse\`,
        },
        () => div(showState.val ? "Ciao" : "Mondo")
      )
    );
};
`,Ja=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:r}=t.tags,s=$e(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(r("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),r("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),s({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Qa=`import animate from "@grucloud/bau-ui/animate";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, keyframes } = context;
  const { section, div, input, label } = bau.tags;
  const Animate = animate(context);

  const fadeIn = keyframes\`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  \`;

  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  const routeMap: any = {
    //
    one: () => div("ONE"),
    two: () => div("TWO"),
  };

  return () =>
    section(
      label(
        "One",
        input({
          type: "radio",
          id: "one",
          name: "radio",
          checked: true,
          value: checkedState,
          oninput,
        })
      ),
      label(
        "Two",
        input({
          type: "radio",
          id: "two",
          name: "radio",
          value: checkedState,
          oninput,
        })
      ),
      Animate(
        {
          animationHide: () => \`\${fadeIn} 0.5s\`,
          animationShow: () => \`\${fadeIn} 0.5s reverse\`,
        },
        () => routeMap[checkedState.val]()
      )
    );
};
`,er={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:qa,createComponent:Ya},{title:"Component hide and show",description:"Hide and show a component",code:Qa,createComponent:Ja}]},tr=e=>{const t=G(e);return()=>t(er)};function Ft(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=p=>{r.val=!1,s.val=!0},u=o`
    &.sm {
      width: 20px;
      height: 20px;
    }
    &.md {
      width: 40px;
      height: 40px;
    }
    &.lg {
      width: 60px;
      height: 60px;
    }
  `;return function(...d){let[{color:g,variant:h="outline",size:f="md",width:v=30,height:x=30,...w},...E]=W(d);return a({class:T(u,t==null?void 0:t.class,w.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:v,height:x,onload:c,onerror:l,class:T(g,h,f,u,t==null?void 0:t.class,w.class),...w}))}}const Wt=e=>{const{css:t}=e,n=Ft(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},nr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Ft(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},or=`import avatar from "@grucloud/bau-ui/avatar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section } = bau.tags;

  const Avatar = avatar(context, {
    class: css\`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    \`,
  });

  return () =>
    section(
      Avatar({
        src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
        alt: "my avatar",
      })
    );
};
`,ar={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:or,createComponent:nr}],gridItem:Wt},rr=e=>{const t=G(e);return()=>t(ar)};function tt(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,r=Pe(e,{class:o`
      &.paper {
        padding: 0;
      }
    `}),s=o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...g},...h]=W(l);const f=w=>{x.style.opacity=1,x.showModal();const E=p.getBoundingClientRect(),I=x.getBoundingClientRect();E.x<a.innerWidth/2?x.style.left=E.left+"px":x.style.left=E.right-I.width+"px",E.y<a.innerHeight/2?x.style.top=E.top+E.height+"px":x.style.top=E.top-I.height+"px"},v=w=>{const E=()=>{x.close(),x.removeEventListener("transitionend",E)};x.addEventListener("transitionend",E),x.style.opacity=0},x=i({role:"presentation",class:T("popover",s,t==null?void 0:t.class,g==null?void 0:g.class),onclick:w=>w.target===x&&(v(),d==null?void 0:d.call())},r(u));return x.closeDialog=v,x.openDialog=f,x}}const sr=()=>ee.map(e=>`
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
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function nt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    display: inline-block;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    &.sm {
      padding: 0.4rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.8rem;
    }
    ${sr()}
  `;return function(s){const{size:c="md",variant:l="outline",color:u="neutral",name:p,id:d,disabled:g,...h}=s;return a({...h,class:T("input",c,u,l,i,t==null?void 0:t.class,h.class)})}}const ir=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Vt(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=tt(e),s=K(e),c=nt(e),l=we(e),u=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }
    & .content {
      height: fit-content;
      & ul {
        border-width: 0px !important;
      }
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${ir()}
  `,p=n.state(""),d=n.state(""),g=n.state(!1),h=n.state(0),f=()=>{g.val=!1};return function(...x){let[{variant:w="outline",color:E,size:I="md",id:$,label:O,placeholder:A,Option:B,options:D,getOptionLabel:j=({label:_})=>_,...Y},...Q]=W(x);const z=n.state(D),F=()=>{Z.openDialog(),g.val=!0,d.val="",z.val=D},U=()=>{Z.closeDialog(),g.val=!1,d.val=""},y=_=>{const{value:N}=_.target;d.val=N,N?z.val=D.filter(V=>j(V).match(new RegExp(`${N}`,"i"))):z.val=D},m=_=>{g.val?U():F()},b=({option:_,index:N})=>V=>{p.val=j(_),h.val=N,U()},C=_=>{switch(console.log("onkeydown",_.key,h.val),_.key){case"Escape":U();break;case"ArrowDown":h.val<z.val.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=z.val.length-1:h.val--;break;case"Enter":p.val=j(z.val[h.val]),d.val="",U();break}},S=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":O,onclick:m,variant:w,color:E,size:I},()=>!p.val&&O,p),R=c({id:$,value:d,placeholder:A,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:y,onkeydown:C,variant:w,color:E,size:I}),Z=r({id:$,triggerEl:S,contentEl:(()=>a({class:T(w,E,I,"content")},R,()=>l({class:T(w,E,I)},z.val.map((_,N)=>i({class:()=>T(h.val==N&&"active"),onclick:b({option:_,index:N})},B(_))))))(),onClose:f});return a({...Y,class:T("autocomplete",u,t==null?void 0:t.class,Y==null?void 0:Y.class)},S,Z)}}const Zt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Vt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},cr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=Vt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},lr=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Autocomplete = autocomplete(context);

  const options = [
    { code: "AD", label: "Andorra", phone: "376" },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  const Option = (option: any) =>
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        \`,
      },
      span(option.label),
      span(option.code)
    );

  return () =>
    section(
      Autocomplete({
        options,
        Option,
        getOptionLabel: ({ label }: any) => label,
        label: "Country",
        placeholder: "Search countries",
        id: "country",
      })
    );
};
`,ur={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:lr,createComponent:cr}],gridItem:Zt},dr=e=>{const t=G(e);return()=>t(ur)};function Xt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...g]=W(s);return a({...d,class:T("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...g)}}const Kt=e=>{const t=Xt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},pr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Xt(e);return()=>n(o({content:"10"},"☏"))},mr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,gr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:mr,createComponent:pr}],gridItem:Kt},br=e=>{const t=G(e);return()=>t(gr)};function Yt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:r}=n.tags,s=K(e),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",items:h,...f},...v]=W(u);return a({...f,class:T(c,t==null?void 0:t.class,f==null?void 0:f.class)},h.map(({href:x,name:w})=>i((x?s:r)({href:x,color:p,variant:d,size:g,class:T(p,d,g)},w))))}}const qt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Yt(e);return o=>n({...o,...t})},hr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Yt(e);return()=>n(a(o))},fr=`import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const breadcrumbsProps: BreadcrumbsProps = {
    variant: "outline",
    color: "neutral",
    items: [
      {
        href: "/",
        name: "\\u2302",
      },
      { name: "Dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const Breadcrumbs = breadcrumbs(context);

  return () =>
    section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
};
`,vr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:fr,createComponent:hr}],gridItem:qt},xr=e=>{const t=G(e);return()=>t(vr)},Jt=e=>{const t=K(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},wr=e=>{const{bau:t}=e,{section:n}=t.tags,o=K(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},yr=`import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context);
  const onclick = () => {
    alert("Click");
  };
  return () =>
    section(
      //
      Button({ color: "primary", variant: "outline", onclick }, "Click me")
    );
};
`,Cr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:yr,createComponent:wr}],gridItem:Jt},Er=e=>{const t=G(e);return()=>t(Cr)},Sr=()=>ee.map(e=>`
&.button-group.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${e}) !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function ot(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-flex;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    & button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${Sr()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:u,...p},...d]=W(s);return a({...p,class:T("button-group",c,u,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Qt=e=>{const t=["ONE","TWO","THREE"],n=K(e),o=ot(e);return a=>o({...a},t.map(i=>n(a,i)))},kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=K(e),i=ot(e),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},Tr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const groups = ["ONE", "TWO", "THREE"];

  const Button = button(context);
  const ButtonGroup = buttonGroup(context);

  const color = "primary";
  const variant = "solid";
  return () =>
    section(
      ButtonGroup(
        { color, variant },
        groups.map((group) => Button({ color, variant }, group))
      )
    );
};
`,Ar={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Tr,createComponent:kr}],gridItem:Qt},Mr=e=>{const t=G(e);return()=>t(Ar)};function en(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ee.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...g]=W(c);return a({...d,type:"date",class:T("calendar",r,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const tn=e=>{const t=en(e);return n=>t({...n})},Dr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=en(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},Ir=`import calendar from "@grucloud/bau-ui/calendar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, label } = bau.tags;

  const calendarState = bau.state("2023-08-08");

  const Calendar = calendar(context);

  return () =>
    section(
      label(
        "Start date:",
        Calendar({
          id: "start",
          min: "2023-01-01",
          max: "2024-12-31",
          value: calendarState.val,
          oninput: (event: any) => {
            calendarState.val = event.target.value;
          },
        })
      )
    );
};
`,$r={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Ir,createComponent:Dr}],gridItem:tn},Nr=e=>{const t=G(e);return()=>t($r)};function Br(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-block;
    position: relative;
    overflow: hidden;
    & img {
      object-fit: contain;
    }
    & .control {
      z-index: 1;
      position: absolute;
      padding: 0.5rem;
      cursor: pointer;
    }
    & .control-previous {
      top: 50%;
      transform: translateY(-50%);
    }
    & .control-next {
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    & .track {
      display: flex;
      flex-direction: row;
      transition: all var(--transition-slow);
    }
  `,r=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:g,Previous:h,Next:f,...v}]=W(c);const x=()=>{r.val<=0?r.val=d.length-1:r.val--},w=()=>{r.val>=d.length-1?r.val=0:r.val++},E=a({class:"track",style:()=>`transform: translateX(${-100*r.val}%);`},d.map(g));return a({...v,class:T("carousel",p,i,t==null?void 0:t.class,v==null?void 0:v.class)},a({class:T("control","control-previous"),onclick:x},h()),a({class:T("control","control-next"),onclick:w},f()),E)}}const Pr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],_r=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=K(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),r=({src:u})=>a({src:u}),s=Br(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(s({slides:Pr,Slide:r,Previous:c,Next:l}))},Or=`import carousel from "@grucloud/bau-ui/carousel";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

const slides: any[] = [
  { src: "https://source.unsplash.com//featured/200x201" },
  { src: "https://source.unsplash.com//featured/200x202" },
  { src: "https://source.unsplash.com//featured/200x203" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, img } = bau.tags;

  const Button = button(context, {
    class: css\`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    \`,
  });

  const Slide = ({ src }: any) => img({ src });

  const Carousel = carousel(context, {
    class: css\`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    \`,
  });

  const Previous = () => Button("\\u25C0");
  const Next = () => Button("\\u25B6");

  return () =>
    section(
      //
      Carousel({ slides, Slide, Previous, Next })
    );
};
`,Rr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Or,createComponent:_r}]},Lr=e=>{const t=G(e);return()=>t(Rr)},nn=e=>{const t=Ne(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},jr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ne(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},zr=`import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Chip = chip(context);

  return () =>
    section(
      //
      Chip({ variant: "outline", color: "primary" }, "My Chip")
    );
};
`,Hr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:zr,createComponent:jr}],gridItem:nn},Gr=e=>{const t=G(e);return()=>t(Hr)};function on(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
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
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
    &.sm {
      width: 1.3rem;
      height: 1.3rem;
    }
    &.sm::after {
      font-size: 0.9rem;
    }
    &.md {
      width: 1.5rem;
      height: 1.5rem;
    }
    &.md::after {
      font-size: 1.2rem;
    }
    &.lg {
      width: 2rem;
      height: 2rem;
    }
    &.lg::after {
      font-size: 1.6rem;
    }
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=W(s);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)})}}const an=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=on(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Ur=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=on(e),r=t.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:s})))},Fr=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, label } = bau.tags;

  const Checkbox = checkbox(context);

  const checkboxState = bau.state(false);

  const onChange = (event: any) => {
    checkboxState.val = event.target.checked ? true : false;
  };

  return () =>
    section(
      label(
        {
          class: css\`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          \`,
        },
        "My Checkbox",
        Checkbox({
          color: "neutral",
          variant: "outline",
          id: "my-checkbox",
          name: "myCheckbox",
          checked: checkboxState,
          onchange: onChange,
        })
      )
    );
};
`,Wr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Fr,createComponent:Ur}],gridItem:an},Vr=e=>{const t=G(e);return()=>t(Wr)},Zr=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=et(e),i=K(e),r=()=>i("Header"),s=()=>o("Content");return()=>n(a({Header:r,Content:s}))},Xr=`import button from "@grucloud/bau-ui/button";
import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Collapsible = collapsible(context);
  const Button = button(context);

  const Header = () => Button("Header");
  const Content = () => div("Content");

  return () =>
    section(
      //
      Collapsible({ Header, Content })
    );
};
`,Kr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Xr,createComponent:Zr}]},Yr=e=>{const t=G(e);return()=>t(Kr)};function qr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u,openState:p,...d},...g]=W(s);return a({class:T(i,t==null?void 0:t.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},g))}}const Jr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=qr(e),r=K(e),s=Et(e);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},Qr=`import drawer from "@grucloud/bau-ui/drawer";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import navBarMenu from "../../components/navBarMenu";

export default (context: Context) => {
  const { bau } = context;
  const { section, p } = bau.tags;

  const openState = bau.state(false);

  const Drawer = drawer(context);
  const Button = button(context);
  const NavBarMenu = navBarMenu(context);

  return () =>
    section(
      p("Click on the button to open and close the drawer."),
      Button(
        {
          color: "neutral",
          variant: "outline",
          onclick: () => {
            openState.val = !openState.val;
          },
        },
        "OPEN DRAWER"
      ),
      Drawer({ openState }, NavBarMenu())
    );
};
`,es={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Qr,createComponent:Jr}]},ts=e=>{const t=G(e);return()=>t(es)},rn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Ke(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},ns=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Ke(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},os=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const tree: Tree = {
    data: { name: "Root Menu", href: "#drilldown-example" },
    children: [
      {
        data: { name: "Menu 1", href: "#dd-menu1" },
        children: [
          {
            data: { name: "Sub Menu 1", href: "#dd-menusub2" },
            children: [
              { data: { name: "Sub Sub Menu 1", href: "#menusubsub1" } },
            ],
          },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#dd-menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
      {
        data: { name: "Menu 3", href: "#menu3" },
      },
    ],
  };

  const DrillDownMenu = drillDownMenu(context, {
    base: "/components/drillDownMenu",
    hashBased: true,
  });

  return () => section({ id: "drilldown-example" }, DrillDownMenu({ tree }));
};
`,as={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:os,createComponent:ns}],gridItem:e=>rn(e,{base:"/components/drillDownMenu",hashBased:!0})},rs=e=>{const t=G(e);return()=>t(as)};function sn(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
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
        transition: all var(--transition-slow) ease-out;
        &:hover.solid {
          filter: brightness(var(--brightness-hover-always)) !important;
        }
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
      }
    `,disabled:o`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(u,...p){const{variant:d="outline",color:g="neutral",size:h="md",Component:f,disabled:v,...x}=u;return a({class:T(c.base,v&&c.disabled,t==null?void 0:t.class,u.class)},r({class:T(d,g,h)},f({disabled:v}),s({type:"file",disabled:v,...x})),i({class:"filename-display"}))}}const cn=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),u=sn(e),p=g=>{const h=g.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:g})=>s({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,g&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return g=>u({Component:d,name:"file",accept:"text/*",onchange:p,...g})},ss=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,u=n.state("No file selected"),p=sn(e),d=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:h})=>c({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,h&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>s(p({Component:g,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},is=`import classNames from "@grucloud/bau-css/classNames";
import fileInput from "@grucloud/bau-ui/fileInput";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau, css, config } = context;

  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const { section, div, span } = bau.tags;

  const fileState = bau.state("No file selected");

  const FileInput = fileInput(context);

  const onchange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      fileState.val = file.name;
    } else {
      fileState.val = "No file selected";
    }
  };

  const FileInputLabel = ({ disabled }: any) =>
    div(
      {
        class: classNames(
          css\`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          \`,
          disabled &&
            css\`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            \`
        ),
      },
      svg(
        { width: 100, height: 100, fill: "currentColor" },
        use({ href: \`\${config.base}/uploadIcon.svg#Capa_1\` })
      ),
      span(tr("Choose a file to upload"))
    );

  return () =>
    section(
      FileInput({
        Component: FileInputLabel,
        name: "file",
        accept: "text/*",
        onchange,
      }),
      div("File selected: ", fileState)
    );
};
`,cs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:is,createComponent:ss}],gridItem:cn},ls=e=>{const t=G(e);return()=>t(cs)},ln=e=>{const t=nt(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},us=e=>{const{bau:t}=e,{section:n}=t.tags,o=nt(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},ds=`import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Input = input(context);

  return () =>
    section(
      Input({
        id: "my-input",
        name: "my-input",
        placeholder: "Enter Text",
        // oninput: (event)=> {}
      })
    );
};
`,ps={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ds,createComponent:us}],gridItem:ln},ms=e=>{const t=G(e);return()=>t(ps)};function un(e,t){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,r=()=>ee.map(l=>`
&.${l}{
  background-color: var(--color-${l});
}
  `).join(`
`),s=a`
    0% {
      background-position: 0rem 0;
    }
    100% {
      background-position: 1rem 0;
    }
  `,c=o`
    width: 100%;
    height: 5px;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    transition: all 0.3s linear;
    opacity: 0;
    &.running {
      opacity: 1;
      animation: ${s} 1s linear infinite;
    }
    &.sm {
      height: 0.2rem;
    }
    &.md {
      height: 0.5rem;
    }
    &.lg {
      height: 1rem;
    }

    ${r()}
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",running:h,...f}]=W(u);return i({...f,role:"progressbar",class:{deps:[h],renderProp:()=>v=>T("linearProgress",g,p,c,v&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const dn=e=>{const t=un(e);return n=>t({...n,running:!0})},gs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=K(e),i=un(e),r=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),o,i({running:r}))},bs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, hr } = bau.tags;
  const Button = button(context);
  const LinearProgress = linearProgress(context);

  const runningState = bau.state(false);

  return () =>
    section(
      Button(
        {
          variant: "solid",
          color: "primary",
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      hr,
      LinearProgress({
        running: runningState,
      })
    );
};
`,hs={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:bs,createComponent:gs}],gridItem:dn},fs=e=>{const t=G(e);return()=>t(hs)},De={sm:12,md:16,lg:24},vs=()=>ee.map(e=>`
&.${e} {
  background-color:transparent;
}
&.plain.${e} {
  & .path {
    stroke: var(--color-${e});
  }
}
&.outline.${e} {
  border: none;
  & .path {
    stroke: var(--color-${e});
  }
}
&.solid.${e} {
  background-color:transparent;
  & .path {
    stroke: var(--font-color-inverse);
    ;
  }
}
`).join(`
`);function Re(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:r}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
100% {
      transform: rotate(360deg);
}
  `,c=a`
0% {
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
}
50% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -35;
}
100% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -124;
}
  `;return function({size:u="md",color:p="primary",variant:d="outline",visibility:g=!0,...h}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${De[u]};
      height: ${De[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${vs()}
    `;return i({class:{deps:[g],renderProp:()=>v=>T("spinner",f,p,d,v==!1?"":"visibility",t==null?void 0:t.class,h.class)},version:"1.1",x:"0px",y:"0px",width:De[u],height:De[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},r({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function pn(e,t){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,r=a`
0% {
      opacity: 1;
}
100% {
      opacity: 0;
}
`,s=o`
    position: relative;
    &:hover.loading {
      cursor: default;
    }
    & .spinner {
      position: absolute;
    }
    & span {
      &.loading {
        animation: ${r} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:g,...h},...f]=W(l);const v=K(e),x=Re(e);return n.bind({deps:[g],render:()=>w=>v({...h,class:T("loadingButton",d,p,u,s,w&&"loading",t==null?void 0:t.class,h==null?void 0:h.class)},x({size:d,variant:p,color:u,visibility:w}),i({class:w&&"loading"},f))})}}const mn=e=>{const t=pn(e);return n=>t({...n,loading:!0},"Save")},xs=e=>{const{bau:t}=e,{section:n}=t.tags,o=pn(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},ws=`import loadingButton from "@grucloud/bau-ui/loadingButton";
//import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  //const Button = button(context);
  const LoadingButton = loadingButton(context);

  const loadingState = bau.state(true);

  return () =>
    section(
      LoadingButton(
        {
          variant: "solid",
          color: "primary",
          loading: loadingState,
          onclick: () => (loadingState.val = !loadingState.val),
        },
        "Save"
      )
    );
};
`,ys={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:ws,createComponent:xs}],gridItem:mn},Cs=e=>{const t=G(e);return()=>t(ys)},Es=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ss=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},Es.map(r))},ks=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ts=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,r=we(e),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},ks.map(s)))},As=`import list from "@grucloud/bau-ui/list";
import { Context } from "@grucloud/bau-ui/context";

const phoneCodes = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, span, li } = bau.tags;

  const List = list(context);

  const listItem = ({ code, label }: any) =>
    li(
      {
        class: css\`
          display: flex;
          gap: 1rem;
        \`,
      },
      span(code),
      span(label)
    );

  return () =>
    section(
      List({ variant: "outline", color: "primary" }, phoneCodes.map(listItem))
    );
};
`,Ms={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:As,createComponent:Ts}],gridItem:Ss},Ds=e=>{const t=G(e);return()=>t(Ms)};function gn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,r=o`
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
    ${(()=>ee.map(s=>`
&.modal.plain.${s} {
  color: inherit;
}
&.modal.outline.${s} {
  color: inherit;
}
&.modal.soft.${s} {
  color: inherit;
}
&.modal.solid.${s} {

}
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...g]=W(c);return a({class:T("modal",r,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const bn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s=K(e),c=gn(e),l=()=>o(Array(10).fill("").map((p,d)=>r(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(s({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),s({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(s({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},Is=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s="neutral",c=K(e),l=gn(e),u=()=>o(Array(10).fill("").map((d,g)=>r(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:s,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},$s=`import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, main, header, footer, p } = bau.tags;

  const color = "neutral";

  const Button = button(context);
  const Modal = modal(context);

  const Content = () =>
    main(
      Array(10)
        .fill("")
        .map((_, k) => p(k + 1, ". Some text here" /*faker.lorem.paragraph()*/))
    );

  const modalEl = Modal(
    { id: "my-dialog" },
    header("Header"),
    Content(),
    footer(
      Button(
        {
          variant: "outline",
          color,
          onclick: () => {
            modalEl.close();
          },
        },
        "Cancel"
      ),
      Button(
        {
          variant: "solid",
          color,
          onclick: () => {
            modalEl.close();
          },
        },
        "OK"
      )
    )
  );

  return () =>
    section(
      Button(
        {
          variant: "solid",
          color: "neutral",
          onclick: () => {
            modalEl.showModal();
          },
        },
        "OPEN MODAL"
      ),
      modalEl
    );
};
`,Ns={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:$s,createComponent:Is}],gridItem:bn},Bs=e=>{const t=G(e);return()=>t(Ns)},Ps=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,r=K(e),s=tt(e),c=()=>r({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=s({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},_s=`import popover from "@grucloud/bau-ui/popover";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div, h1, p } = bau.tags;

  const Button = button(context);
  const Popover = popover(context);

  const TriggerButton = () =>
    Button(
      {
        variant: "outline",
        color: "success",
        onclick: () =>
          popoverEl.open ? popoverEl.closeDialog() : popoverEl.openDialog(),
      },
      "Click"
    );

  const Content = () => div({}, h1("My content"), p("My Content"));

  const triggerEl = TriggerButton();

  const popoverEl = Popover({
    id: "my-popover-left",
    triggerEl,
    contentEl: Content(),
  });

  return () => section(div(triggerEl, popoverEl));
};
`,Os={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:_s,createComponent:Ps}]},Rs=e=>{const t=G(e);return()=>t(Os)};function Ls(e,t){const{bau:n,css:o,config:a}=e,{div:i,a:r,span:s,nav:c}=n.tags,l=o`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
    grid-area: paginationnav;
    gap: var(--spacing-horizontal);
    grid-template-columns: repeat(2, 1fr);
    & > a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      border: 1px solid var(--color-emphasis-300);
      border-radius: var(--global-radius);
      transition: border-color var(--transition-slow);
      &:hover {
        border-color: var(--color-primary);
      }
      .sublabel {
        color: var(--color-content-secondary);
        font-size: 0.8rem;
        font-weight: var(--font-weight-semibold);
        margin-bottom: 0.25rem;
      }
      .label {
        color: var(--link-color);
        font-size: 1rem;
        font-weight: var(--font-weight-bold);
      }
      .Previous {
        &::before {
          content: "« ";
        }
      }
      .Next {
        &::after {
          content: " »";
        }
      }
    }
  `,u=({text:p})=>({name:d,label:g,href:h})=>r({href:`${a.base}${h}`},s({class:"sublabel"},p),i({class:`label ${p}`},g??d));return function(...d){let[{color:g,variant:h="plain",size:f="md",data:v={},...x}]=W(d);const{next:w,previous:E}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...x,class:T("paginationNavigation",f,l,t==null?void 0:t.class,x==null?void 0:x.class)},(E==null?void 0:E.href)&&u({text:"Previous"})(E),(w==null?void 0:w.href)&&u({text:"Next"})(w))}}const js=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ls(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},zs=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const PaginationNavigation = paginationNavigation(context);

  const data = {
    next: {
      name: "next page",
      label: "Popover",
      href: "/components/popover",
    },
    previous: {
      name: "previous page",
      label: "Paper",
      href: "/components/paper",
    },
  };

  return () =>
    section(
      PaginationNavigation({
        variant: "solid",
        color: "primary",
        data,
      })
    );
};
`,Hs={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:zs,createComponent:js}]},Gs=e=>{const t=G(e);return()=>t(Hs)},Us=e=>{const{bau:t}=e,{div:n}=t.tags,o=Pe(e);return a=>o({...a},n(`Paper ${a.size??""}`))},Fs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Pe(e);return()=>n(a({size:"md"},o("My content")))},Ws=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Vs={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Ws,createComponent:Fs}],variantColorTableDisable:!0,gridItem:Us},Zs=e=>{const t=G(e);return()=>t(Vs)};function hn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>ee.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
  `).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p="md",...d}]=W(c);return a({...d,type:"radio",class:T("radio-button",p,l,u,r,t==null?void 0:t.class,d==null?void 0:d.class)})}}const fn=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=hn(e);return r=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),o("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Xs=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=hn(e),r=t.state("one"),s=({target:c})=>r.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:s})),n("Two",i({id:"two",name:"radio",value:r,oninput:s})),o("Choice: ",r))},Ks=`import radioButton from "@grucloud/bau-ui/radioButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { label, div, form } = bau.tags;
  const RadioButton = radioButton(context);

  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  return () =>
    form(
      label(
        "One",
        RadioButton({
          id: "one",
          name: "radio",
          checked: true,
          value: checkedState,
          oninput,
        })
      ),
      label(
        "Two",
        RadioButton({
          id: "two",
          name: "radio",
          value: checkedState,
          oninput,
        })
      ),
      div("Choice: ", checkedState)
    );
};
`,Ys={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Ks,createComponent:Xs}],gridItem:fn},qs=e=>{const t=G(e);return()=>t(Ys)},Js=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function vn(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=K(e),s=tt(e),c=we(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Js()}
  `,u=n.state(""),p=n.state(!1),d=n.state(0);return function(...h){let[{color:f="neutral",variant:v="outline",size:x="md",id:w,label:E,Option:I,options:$,getOptionLabel:O=({label:b})=>b,...A},...B]=W(h);const D=()=>{m.openDialog(),m.focus(),p.val=!0},j=()=>{m.closeDialog(),p.val=!1},Y=()=>{p.val=!1},Q=b=>{p.val?j():D()},z=({option:b,index:C})=>S=>{u.val=O(b),d.val=C,j()},F=b=>{switch(b.preventDefault(),b.key){case"Escape":j();break;case"ArrowDown":d.val<$.length-1?d.val++:d.val=0;break;case"ArrowUp":d.val<=0?d.val=$.length-1:d.val--;break;case"Enter":p.val?(u.val=O($[d.val]),j()):D();break}},U=()=>c({tabindex:"0",class:T(f,v)},$.map((b,C)=>i({class:()=>T(d.val==C&&"active"),onclick:z({option:b,index:C})},I(b)))),y=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":E,onclick:Q,color:f,variant:v,size:x},()=>!u.val&&E,u),m=s({id:w,triggerEl:y,contentEl:U(),onClose:Y});return a({...A,class:T("select",f,x,l,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:F},y,m)}}const xn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=vn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Qs=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=vn(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},ei=`import select from "@grucloud/bau-ui/select";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Select = select(context);

  const options = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  const Option = (option: any) =>
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        \`,
      },
      span(option.label),
      span(option.code)
    );

  return () =>
    section(
      Select({
        options,
        Option,
        getOptionLabel: ({ label }: any) => label,
        label: "Select a country...",
      })
    );
};
`,ti={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:ei,createComponent:Qs}],gridItem:xn},ni=e=>{const t=G(e);return()=>t(ti)};function Le(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    ${(()=>ee.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...g]=W(c);return a({...d,type:"range",class:T("slider",l,u,p,r,t==null?void 0:t.class,d.class)},...g)}}const wn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Le(e);return i=>a({...i,oninput:o})},oi=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,r=t.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=Le(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},ai=`import slider from "@grucloud/bau-ui/slider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, form, label, br } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);

  return () =>
    section(
      form(
        label(
          "Slider with step, min and max",
          br,
          Slider({
            oninput,
            name: "slider-simple",
            step: 20,
            min: -100,
            max: 100,
          })
        )
      )
    );
};
`,ri=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Le(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},si=`import slider from "@grucloud/bau-ui/slider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, form, label, datalist, br, option } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);

  return () =>
    section(
      form(
        label({ for: "temp" }, "Choose a comfortable temperature"),
        br,
        Slider({
          oninput,
          class: css\`
            width: 300px;
            margin: 0;
          \`,
          id: "temp",
          name: "temp",
          list: "markers",
        }),
        datalist(
          {
            id: "markers",
            class: css\`
              width: 300px;
              display: flex;
              justify-content: space-between;
            \`,
          },
          ["0", "25", "50", "75", "100"].map((label) =>
            option({ value: Number(label), label })
          )
        )
      )
    );
};
`,ii=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Le(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},ci=`import slider from "@grucloud/bau-ui/slider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, form, label, datalist, br, option } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);

  return () =>
    section(
      form(
        {
          class: css\`
            display: flex;
          \`,
        },
        label({ for: "temp" }, "Choose a comfortable temperature"),
        br,
        Slider({
          oninput,
          id: "temp-vertical",
          name: "temp",
          list: "markers-vertical",
          orient: "vertical",
          class: css\`
            width: 30px;
            appearance: slider-vertical;
          \`,
        }),
        datalist(
          {
            id: "markers-vertical",
            class: css\`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            \`,
          },
          ["0", "25", "50", "75", "100"]
            .reverse()
            .map((label) => option({ value: Number(label), label }))
        )
      )
    );
};
`,li={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ai,createComponent:oi},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:si,createComponent:ri},{title:"Vertical Mark",description:"A vertical slider with marks.",code:ci,createComponent:ii}],gridItem:wn},ui=e=>{const t=G(e);return()=>t(li)},yn=e=>{const t=Re(e);return n=>t({...n})},di=e=>{const{bau:t}=e,{section:n}=t.tags,o=Re(e);return()=>n(o({}))},pi=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,mi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:pi,createComponent:di}],gridItem:yn},gi=e=>{const t=G(e);return()=>t(mi)},bi=()=>ee.map(e=>`
&.switch.plain.${e} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.outline.${e} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.soft.${e} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.solid.${e} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-400);
  } 
  &:checked {
    background-color: var(--color-${e}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-400);
  }
}
`).join(`
`);function Cn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    position: relative;
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
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      width: 2rem;
      height: 1.2rem;
      border-radius: 0.6rem;
    }
    &.sm::after {
      width: 0.8rem;
      height: 0.8rem;
    }
    &.md {
      width: 2.4rem;
      height: 1.4rem;
      border-radius: 0.7rem;
    }
    &.md::after {
      width: 1rem;
      height: 1rem;
    }
    &.lg {
      width: 3.3rem;
      height: 1.7rem;
      border-radius: 2rem;
    }
    &.lg::after {
      width: 1.5rem;
      height: 1.5rem;
    }
    ${bi()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=W(s);return a({...p,class:T("switch",i,c,l,u,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const En=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=Cn(e);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},hi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,r=Cn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},fi=`import createSwitch from "@grucloud/bau-ui/switch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, form, label } = bau.tags;

  const Switch = createSwitch(context);

  return () =>
    section(
      form(
        label(
          {
            class: css\`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            \`,
          },
          "My shinny switch",
          Switch({ variant: "outline", id: "my-shinny-switch" })
        )
      )
    );
};
`,vi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:fi,createComponent:hi}],gridItem:En},xi=e=>{const t=G(e);return()=>t(vi)},wi=()=>ee.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:r,li:s}=n.tags,c=n.state(a),l=n.state(a[0]),u=d=>c.val.find(g=>g.name==d),p={base:o`
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
            background-color: var(--color-emphasis-300);
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
          transform: none;
          &:hover {
            border: none;
          }
        }
      }
      ${wi()}
    `};return function(...g){let[{color:h,variant:f="plain",size:v,...x},...w]=W(g);const E=$=>{const{Header:O,disabled:A,name:B}=$;return s({class:()=>T(l.val.name==B&&"active",A&&"disabled"),onclick:D=>D.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},O($))},I=i({class:T("tabs",p.base,f,v,h,t==null?void 0:t.class,x.class)},n.loop(c,r(),E),()=>l.val.Content?l.val.Content({}):"");return I.addEventListener("tab.select",$=>{var B,D;const{tabName:O}=$.detail,A=u(O);A&&((B=l.val.exit)==null||B.call(),l.val=A,(D=A.enter)==null||D.call())},!1),I.addEventListener("tab.add",$=>{var A;const{tab:O}=$.detail;(A=O.enter)==null||A.call(),c.val.push(O)},!1),I.addEventListener("tab.remove",$=>{var A;const O=c.val.findIndex(B=>B.name==$.detail.tabName);O>0&&((A=c.val[O].exit)==null||A.call(),c.val.splice(O,1))},!1),I}}const Sn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},yi=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Ci=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => div("TAB"),
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => div("TAB 2"),
      Content: () => div(p("My tab 2 Content")),
    },
  ];

  const Tabs = tabs(context, { tabDefs });

  return () => Tabs({ variant: "outline", color: "neutral" });
};
`,Ei=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},Si=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;
  const tabDefs = [
    {
      name: "Tab1",
      Header: () => div("TAB 1"),
      Content: () => div(p("My Content")),
      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Tab2",
      Header: () => div("TAB 2"),
      Content: () => div(p("My TAB 2 Content")),
      enter: async () => console.log("tab2 enter"),
      exit: async () => console.log("tab2 exit"),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: () => div("Tab Disabled"),
      Content: () => div(p("My Content Disabled")),
    },
  ];

  const Tabs = tabs(context, { tabDefs });

  return () => Tabs({ variant: "outline", color: "success" });
};
`,kn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},ki=e=>{const{css:t}=e,n=ye(e,{tabDefs:kn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Ti=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";
import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const Tabs = tabs(context, { tabDefs: createTabDefs(context) });

  return () =>
    Tabs({
      variant: "outline",
      color: "neutral",
      class: css\`
        flex-direction: column-reverse;
      \`,
    });
};
`,Ai=e=>{const{css:t}=e,n=kn(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Mi=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const tabDefs = createTabDefs(context);

  const Tabs = tabs(context, { tabDefs });

  return () =>
    Tabs({
      variant: "outline",
      color: "neutral",
      class: css\`
        & ul {
          justify-content: center;
        }
      \`,
    });
};
`,Di={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Ci,createComponent:yi},{title:"Extended Tabs",description:"An extended tabs.",code:Si,createComponent:Ei},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Ti,createComponent:ki},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Mi,createComponent:Ai}],gridItem:Sn},Ii=e=>{const t=G(e);return()=>t(Di)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
`;const r=o`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...c){let[{...l},...u]=W(c);return i({...l,class:T("table-container",r,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const $i=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags;function p(v,x,w,E,I){return{name:v,calories:x,fat:w,carbs:E,protein:I}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:v,calories:x})=>r(i(v),i({class:n`
            text-align: right;
          `},x)),h=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(s(u("Basic Table"),h(),l(d.map(g)))))},Ni=`import tableContainer from "@grucloud/bau-ui/tableContainer";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, th, td, tr, table, thead, tbody, caption } = bau.tags;

  // @ts-ignore
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows: any = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const Row = ({ name, calories }: any) =>
    tr(
      td(name),
      td(
        {
          class: css\`
            text-align: right;
          \`,
        },
        calories
      )
    );

  const TableHeader = () =>
    thead(
      tr(
        th(
          {
            class: css\`
              text-align: left;
            \`,
            title: "Product Name",
          },
          "Product Name"
        ),
        th(
          {
            class: css\`
              text-align: right;
            \`,
            title: "Calories",
          },
          "Calories"
        )
      )
    );

  const TableSimple = tableContainer(context, {
    class: css\`
      max-width: 650px;
    \`,
  });

  return () =>
    section(
      TableSimple(
        table(caption("Basic Table"), TableHeader(), tbody(rows.map(Row)))
      )
    );
};
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Bi=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Pi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:f})=>r(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(s(u("Table Dense"),d(),l(Bi.map(p)))))},_i=`import tableContainer from "@grucloud/bau-ui/tableContainer";
import { Context } from "@grucloud/bau-ui/context";

// @ts-ignore
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows: any = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, th, td, tr, table, thead, tbody, caption } = bau.tags;

  const Row = ({ name, calories }: any) =>
    tr(
      td(name),
      td(
        {
          class: css\`
            text-align: right;
          \`,
        },
        calories
      )
    );

  const TableHeader = () =>
    thead(
      tr(
        th(
          {
            class: css\`
              text-align: left;
            \`,
            title: "Product Name",
          },
          "Product Name"
        ),
        th(
          {
            class: css\`
              text-align: right;
            \`,
            title: "Calories",
          },
          "Calories"
        )
      )
    );

  const TableDense = tableContainer(context, {
    class: css\`
      & td,
      th {
        padding: 0.4rem;
      }
    \`,
  });

  return () =>
    section(
      TableDense(
        table(caption("Table Dense"), TableHeader(), tbody(rows.map(Row)))
      )
    );
};
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Oi=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Ri=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:f})=>r(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(s(u("Table Zebra"),d(),l(Oi.map(p)))))},Li=`import tableContainer from "@grucloud/bau-ui/tableContainer";
import { Context } from "@grucloud/bau-ui/context";

// @ts-ignore
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows: any = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, th, td, tr, table, thead, tbody, caption } = bau.tags;

  const Row = ({ name, calories }: any) =>
    tr(
      td(name),
      td(
        {
          class: css\`
            text-align: right;
          \`,
        },
        calories
      )
    );

  const TableHeader = () =>
    thead(
      tr(
        th(
          {
            class: css\`
              text-align: left;
            \`,
            title: "Product Name",
          },
          "Product Name"
        ),
        th(
          {
            class: css\`
              text-align: right;
            \`,
            title: "Calories",
          },
          "Calories"
        )
      )
    );

  const TableZebra = tableContainer(context, {
    class: css\`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    \`,
  });

  return () =>
    section(
      TableZebra(
        table(caption("Table Zebra"), TableHeader(), tbody(rows.map(Row)))
      )
    );
};
`,ji={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Ni,createComponent:$i},{title:"Dense",description:"A dense table.",code:_i,createComponent:Pi},{title:"Zebra",description:"A zebra table.",code:Li,createComponent:Ri}]},zi=e=>{const t=G(e);return()=>t(ji)};function Hi(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:r,li:s,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state(""),p=(v,x)=>{let w=null;return(...E)=>{a.clearTimeout(w),w=a.setTimeout(()=>v(...E),x)}},d=o`
    grid-area: toc;
    position: sticky;
    right: 0;
    z-index: 1;
    top: calc(var(--header-height) + 1rem);
    height: fit-content;
    max-height: calc(100vh - var(--header-height));

    overflow: scroll;
    border-left: 1px solid var(--color-emphasis-200);
    & ul {
      padding-left: 1rem;
    }
    & li {
      display: block;
      &::before {
        content: "";
        border: 1px solid transparent;
        margin-right: 1rem;
        display: inline;
        height: 100%;
        vertical-align: middle;
      }
      &.active::before {
        transition: all 0.4s ease-in-out;
        border-color: var(--link-color);
      }
    }
    & a {
      font-size: 0.8rem;
      text-decoration: none;
      color: var(--color-content-secondary);
      &:hover {
        text-decoration: underline;
      }
      &.active {
        color: var(--link-color);
      }
    }
  `,g=({value:v,id:x,children:w=[]})=>{const E=c({class:()=>u.val==x?"active":"",href:`#${x}`});return E.innerHTML=v,s({class:()=>u.val==x?"active":""},E,w.length>0&&r(w.map(g)))},h=v=>v.tagName.charAt(1),f=({contentEl:v})=>{const x=v.querySelectorAll(l);let w=2,E={},I={children:[]},$=I;const O=$;let A=[$];return[...x].forEach(B=>{const D=h(B);E={value:B.innerHTML,id:B.id,children:[]},w==D?(I=E,$.children.push(I)):w<D?(A.push($),$=I,I.children.push(E),I=E):w>D&&($=A[D-1],A=A.slice(0,D-1),$.children.push(E),I=E),w=D}),O};return function(...x){let[{color:w,variant:E,size:I="md",contentEl:$,...O}]=W(x);const A=f({contentEl:$}),B=p(()=>{const j=[...$.querySelectorAll(l)].find(Y=>{const{top:Q,height:z}=Y.getBoundingClientRect();if(Q+z>60)return!0});j&&(u.val=j==null?void 0:j.id)},100);return i({...O,class:T("tableOfContent",I,E,w,d,t==null?void 0:t.class,O==null?void 0:O.class),bauMounted:()=>{a.addEventListener("scroll",B)},bauUnmounted:()=>{a.removeEventListener("scroll",B)}},A.children&&r(A.children.map(g)))}}const Gi=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:r,article:s}=t.tags,c=Hi(e),l=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>r({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},Ui=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { h1, h2, h3, section, article } = bau.tags;
  const TableOfContent = tableOfContent(context);

  const contentEl = article(
    {
      id: "content",
      class: css\`
        grid-area: content;
      \`,
    },
    h1({ id: "h1" }, "h1"),
    h2({ id: "h2-1" }, "h2 1"),
    h3({ id: "h3-1-1" }, "h3 1 1"),
    h3({ id: "h3-1-2" }, "h3 1 2"),
    h2({ id: "h2-2" }, "h2 2"),
    h3({ id: "h3-2-1" }, "h3 2 1")
  );

  return () =>
    section(
      {
        class: css\`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        \`,
      },
      contentEl,
      TableOfContent({ contentEl })
    );
};
`,Fi={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Ui,createComponent:Gi}]},Wi=e=>{const t=G(e);return()=>t(Fi)};function Tn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=ot(e),r=K(e),s=Re(e),c=o`
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
  `,l=({label:h,icon:f,...v})=>r({"aria-label":h,title:h,...v},f),u=({count:h,totalCount:f,page:v,rowsPerPage:x})=>a({class:"pages-numbers"},Number(v-1)*Number(x)+(h>0?1:0),"-",Math.min(v*x,f)," of ",f),p=({count:h,page:f,rowsPerPage:v})=>a({class:"pages-numbers"},(f-1)*v+(h>0?1:0),"-",f*v),d=h=>h<=1,g=(h,f,v)=>h>=Math.ceil(f/v);return function(...f){let[{count:v=0,totalCount:x=0,page:w=1,rowsPerPage:E=50,onPageChange:I,isLoading:$=!1,disableFirst:O=()=>d(w),disablePrevious:A=()=>d(w),disableNext:B=()=>g(w,x,E),disableLast:D=()=>g(w,x,E),...j},...Y]=W(f);const Q=Math.max(0,Math.ceil(x/E)),z=I({page:1}),F=I({page:w-1}),U=I({page:w+1}),y=I({page:Q}),m=[{label:"First",icon:"⟪",onclick:z,disabled:O()},{label:"Previous",icon:"⟨",onclick:F,disabled:A()},{label:"Next",icon:"⟩",onclick:U,disabled:B()},{label:"Last",icon:"⟫",onclick:y,disabled:D()}];return a({...j,class:T("table-pagination",c,$&&"disabled",t==null?void 0:t.class,j==null?void 0:j.class)},s({class:"spinner",visibility:$,size:"md"}),x>0?u({count:v,totalCount:x,page:w,maxPages:Q,rowsPerPage:E}):p({count:v,page:w,maxPages:Q,rowsPerPage:E}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Vi=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Zi=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=t.tags,l=Vi(45),u=({name:w,email:E})=>i(a(w),a(E)),p=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=Tn(e),g=Ce(e,{class:n`
      max-width: 650px;
    `}),h=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=t.derive(()=>h.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),x=({page:w})=>E=>{f.val.page=w};return()=>g(r(p(),()=>c(v.val.map(u))),()=>d({...f.val,onPageChange:x}))},Xi=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),g=t.derive(()=>p.val.length),h=t.state(1),f=t.state(10),v=t.derive(()=>p.val),x=D=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(D).toString()}`,w=({page:D})=>j=>{h.val=D,E(x({page:D,per_page:f.val}))};E(x({page:1,per_page:f.val}));async function E(D){try{u.val=!0;const j=await fetch(D,{});if(j.ok){const Y=await j.json();p.val=Y;return}throw j}catch(j){d.val=j.message}finally{u.val=!1}}const I=({name:D,description:j,stargazers_count:Y})=>i(a(D),a(j),a({class:n`
            text-align: right;
          `},Y)),$=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),O=Tn(e),A=Ce(e,{class:n`
      min-width: 650px;
    `}),B=({message:D})=>l(D);return()=>A(()=>O({rowsPerPage:f.val,page:h.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:w,disableNext:()=>!1}),r($(),()=>d.val&&B({message:d.val}),()=>c(v.val.map(I))))},Ki=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:r,tr:s}=t.tags,c=Zi(e),l=Xi(e),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Ee(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.2);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.16)
    }
  `;const r=o`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    min-width: 2rem;
    min-height: 2rem;
    border: none;
    border-radius: var(--global-radius);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;
    user-select: none;
    transition: all var(--transition-slow);
    box-sizing: border-box;
    &.selected {
      background-color: var(--toggle-background-color);
    }
    &.selected.solid {
      filter: brightness(80%) !important;
    }
    &.outline,
    &.solid {
      box-shadow: var(--shadow-m);
    }
    &.outline:hover,
    &.solid:hover {
      box-shadow: var(--shadow-lg);
    }
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    &.sm {
      padding: 0.3rem;
    }
    &.md {
      padding: 0.2rem 0.8rem;
    }
    &.lg {
      padding: 0.2rem 2rem;
    }
  `;return function(...c){let[{color:l,variant:u,size:p="md",selected:d=!1,disabled:g,onChange:h,...f},...v]=W(c);return i({type:"button",...f,"aria-pressed":{deps:[d],renderProp:()=>x=>x},class:{deps:[d],renderProp:()=>x=>T("toggle",p,l,u,r,x&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:g},v)}}const An=e=>{const{bau:t}=e,n=Ee(e);return console.log("grid item"),o=>{const a=t.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},Yi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ee(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},qi=`import toggle from "@grucloud/bau-ui/toggle";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Toggle = toggle(context);

  const selectedState = bau.state(false);

  return () =>
    section(
      Toggle(
        {
          variant: "plain",
          selected: selectedState,
          onclick: () => (selectedState.val = !selectedState.val),
        },
        "Toggle Me"
      )
    );
};
`,Ji={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:qi,createComponent:Yi}],gridItem:An},Qi=e=>{const t=G(e);return()=>t(Ji)},ec=()=>ee.map(e=>`
&.toggle-group.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${e}) !important;
  }
}

&.toggle-group.outline.${e} {
  border: none;
}

&.toggle-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function at(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${ec()}
  `;return function(...s){let[{color:c,variant:l="plain",size:u="md",exclusive:p=!1,onChange:d=()=>{},...g},...h]=W(s);const f=new Set,v=x=>{const{value:w}=x.target;p?(f.clear(),f.add(w)):f.has(w)?f.delete(w):f.add(w),d({event:x,values:[...f]})};return a({...g,class:T("toggle-group",u,c,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v},...h)}}const Mn=e=>{const{bau:t}=e,n=at(e),o=Ee(e);return a=>{const i=t.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return n({...a,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:l})=>()=>o({...a,value:l,selected:i.val.includes(l),"area-label":c},c)))}},tc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Ee(e),r=at(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:p})=>()=>i({color:s,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},nc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const Toggle = toggle(context);
  const ToggleGroup = toggleGroup(context);

  const color = "primary";
  const variant = "solid";

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  return () =>
    section(
      ToggleGroup(
        { color, variant, exclusive: true, onChange },
        groups.map(
          ({ label, value }) =>
            () =>
              Toggle(
                {
                  color,
                  variant,
                  value,
                  selected: selectedState.val.includes(value),
                  "area-label": label,
                },
                label
              )
        )
      )
    );
};
`,oc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Ee(e),r=at(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,onChange:l},a.map(({label:u,value:p})=>()=>i({color:s,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},ac=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const Toggle = toggle(context);
  const ToggleGroup = toggleGroup(context);

  const color = "primary";
  const variant = "solid";

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  return () =>
    section(
      ToggleGroup(
        { color, variant, onChange },
        groups.map(
          ({ label, value }) =>
            () =>
              Toggle(
                {
                  color,
                  variant,
                  value,
                  selected: selectedState.val.includes(value),
                  "area-label": label,
                },
                label
              )
        )
      )
    );
};
`,rc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:nc,createComponent:tc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:ac,createComponent:oc}],gridItem:Mn},sc=e=>{const t=G(e);return()=>t(rc)};function rt(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,r=o`
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
      z-index: 10;
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:g="md",...h},...f]=W(c);const v=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,g),role:"tooltip"},l)),x=A=>`move-to-${A}`,w=(A,B,D)=>{if(A()){const j=x(B);v.classList.add(j),v.classList.add(B),v.classList.remove(D)}},E=(A,B)=>{const D=x(A);v.classList.contains(D)&&(v.classList.remove(D),v.classList.add(B),v.classList.remove(A))},I=A=>{const B=v.getBoundingClientRect();w(()=>B.x<0,"right","left"),w(()=>B.x+B.width>a.innerWidth,"left","right"),w(()=>B.y<0,"bottom","top"),w(()=>B.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},$=A=>{v.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return i({...h,class:T("tooltip",r,t==null?void 0:t.class,h==null?void 0:h.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",I),A.addEventListener("mouseout",$)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",I),A.removeEventListener("mouseout",$)}},...f,v)}}const Dn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,r=K(e),s=rt(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},ic=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=K(e),r=rt(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},cc=`import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p, em } = bau.tags;
  const Button = button(context);

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(p("A ", em("tooltip"), " can be any component"));

  return () =>
    Tooltip(
      { side: "bottom-start", titleEl: TooltipContent() },
      Button("tooltip")
    );
};
`,lc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:r}=t.tags,s=(...p)=>Ne(e)({variant:"outline",color:"primary"},p),c=rt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>r({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        `},o({class:n`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          `},c({side:"top-start",titleEl:l()},s("top-start")),c({side:"top-centered",titleEl:l()},s("top-centered")),c({side:"top-end",titleEl:l()},s("top-end"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-start",titleEl:l()},s("left-start")),c({side:"right-start",titleEl:l()},s("right-start"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-centered",titleEl:l()},s("left-centered")),c({side:"right-centered",titleEl:l()},s("right-centered"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-end",titleEl:l()},s("left end")),c({side:"right-end",titleEl:l()},s("right end"))),o({class:n`
            display: flex;
            justify-content: space-around;
          `},c({side:"bottom-start",titleEl:l()},s("bottom start")),c({side:"bottom-centered",titleEl:l()},s("bottom centered")),c({side:"bottom-end",titleEl:l()},s("bottom end"))));return()=>u()},uc=`import tooltip from "@grucloud/bau-ui/tooltip";
import chip from "@grucloud/bau-ui/chip";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, p, em, section } = bau.tags;

  const Chip = (...children: any[]) =>
    chip(context)({ variant: "outline", color: "primary" }, children);

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(p("A ", em("tooltip"), " can be any component"));

  const TooltipGrid = () =>
    section(
      {
        class: css\`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        \`,
      },
      div(
        {
          class: css\`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          \`,
        },
        Tooltip(
          { side: "top-start", titleEl: TooltipContent() },
          Chip("top-start")
        ),
        Tooltip(
          { side: "top-centered", titleEl: TooltipContent() },
          Chip("top-centered")
        ),
        Tooltip({ side: "top-end", titleEl: TooltipContent() }, Chip("top-end"))
      ),
      div(
        {
          class: css\`
            display: flex;
            justify-content: space-between;
          \`,
        },
        Tooltip(
          { side: "left-start", titleEl: TooltipContent() },
          Chip("left-start")
        ),
        Tooltip(
          { side: "right-start", titleEl: TooltipContent() },
          Chip("right-start")
        )
      ),
      div(
        {
          class: css\`
            display: flex;
            justify-content: space-between;
          \`,
        },
        Tooltip(
          { side: "left-centered", titleEl: TooltipContent() },
          Chip("left-centered")
        ),
        Tooltip(
          { side: "right-centered", titleEl: TooltipContent() },
          Chip("right-centered")
        )
      ),
      div(
        {
          class: css\`
            display: flex;
            justify-content: space-between;
          \`,
        },
        Tooltip(
          { side: "left-end", titleEl: TooltipContent() },
          Chip("left end")
        ),
        Tooltip(
          { side: "right-end", titleEl: TooltipContent() },
          Chip("right end")
        )
      ),
      div(
        {
          class: css\`
            display: flex;
            justify-content: space-around;
          \`,
        },
        Tooltip(
          { side: "bottom-start", titleEl: TooltipContent() },
          Chip("bottom start")
        ),
        Tooltip(
          { side: "bottom-centered", titleEl: TooltipContent() },
          Chip("bottom centered")
        ),
        Tooltip(
          { side: "bottom-end", titleEl: TooltipContent() },
          Chip("bottom end")
        )
      )
    );
  return () => TooltipGrid();
};
`,dc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:cc,createComponent:ic},{title:"Grid",description:"Various tooltip position",code:uc,createComponent:lc}],gridItem:Dn},pc=e=>{const t=G(e);return()=>t(dc)},In=e=>{const t=Xe(e);return n=>t(n)},mc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Xe(e);return()=>n(o({}))},gc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,bc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:gc,createComponent:mc}],gridItem:In},hc=e=>{const t=G(e);return()=>t(bc)},fc=({css:e,createGlobalStyles:t})=>(t`
:root {
  --treeview-link-padding-horizontal: 0.75rem;
  --treeview-link-padding-vertical: 0.375rem;
}
`,{nav:e`
    font-weight: var(--font-weight-semibold);
    overflow-x: hidden;
    display: inline-flex;

    &.solid div:hover {
      filter: brightness(var(--brightness-hover-always));
    }

    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      background: inherit;

      & li {
        padding-left: var(--treeview-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        & .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
          }
          & a,
          & span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--treeview-link-padding-vertical)
              var(--treeview-link-padding-horizontal);
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `});function $n(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:r,li:s,nav:c,div:l}=n.tags,u=fc({css:o,createGlobalStyles:a}),p=et(e),d=({depth:g=1,maxDepth:h,color:f,variant:v,size:x})=>w=>{const{children:E,expanded:I}=w,$=n.state(!I),O=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:B=>{E&&($.val=!$.val)}},i(w.data)),A=()=>r({class:T(f,x)},E.map(d({depth:g+1,maxDepth:h})));return s(p({Header:O,Content:E&&g<h&&A}))};return function({tree:h,maxDepth:f=1/0,size:v="md",variant:x="plain",color:w="neutral",...E}){return c({class:T(u.nav,v,x,w,t==null?void 0:t.class,E.class)},h.children&&r(h.children.map(d({maxDepth:f,color:w,variant:x,size:v}))))}}const Nn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=$n(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},vc=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=$n(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},xc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { a } = bau.tags;

  const menu: Tree = {
    data: { name: "Root Menu" },
    children: [
      {
        data: { name: "Menu 1", href: "#menu" },
        expanded: true,
        children: [
          { data: { name: "Sub Menu 1", href: "#menusub2" } },
          { data: { name: "Sub Menu 2", href: "#menusub1" } },
        ],
      },
      {
        data: { name: "Menu 2", href: "#menu2" },
        children: [{ data: { name: "Sub Menu 21", href: "#menusub21" } }],
      },
    ],
  };

  const renderMenuItem = ({ name, href }: any) =>
    a(
      {
        href,
      },
      name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return () => TreeView({ tree: menu });
};
`,wc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:xc,createComponent:vc}],gridItem:Nn},yc=e=>{const t=G(e);return()=>t(wc)},Cc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:r,ul:s,li:c}=t.tags,l=zt(e),u=K(e),p=[{name:"Accordion",Item:Ht(e)},{name:"Alert",Item:Ut(e)},{name:"Autocomplete",Item:Zt(e)},{name:"Avatar",Item:Wt(e)},{name:"Badge",Item:Kt(e)},{name:"Breadcrumbs",Item:qt(e)},{name:"Button",Item:Jt(e)},{name:"Button Group",Item:Qt(e)},{name:"Calendar",Item:tn(e)},{name:"Checkbox",Item:an(e)},{name:"Chip",Item:nn(e)},{name:"DrillDown Menu",Item:rn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:cn(e)},{name:"Input",Item:ln(e)},{name:"Linear Progress",Item:dn(e)},{name:"Loading Button",Item:mn(e)},{name:"Modal",Item:bn(e)},{name:"Radio Button",Item:fn(e)},{name:"Select",Item:xn(e)},{name:"Slider",Item:wn(e)},{name:"Spinner",Item:yn(e)},{name:"Switch",Item:En(e)},{name:"Tabs",Item:Sn(e)},{name:"Theme Switch",Item:In(e)},{name:"Toggle",Item:An(e)},{name:"Toggle Group",Item:Mn(e)},{name:"Tooltip",Item:Dn(e)},{name:"Tree View",Item:Nn(e)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},Ec=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:yo(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:ka(e)})},{path:"components",action:()=>({title:"Component",component:Cc(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:_a(e)})},{path:"alert",action:()=>({title:"Alert",component:Fa(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ka(e)})},{path:"animate",action:()=>({title:"Animate",component:tr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:dr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:rr(e)})},{path:"badge",action:()=>({title:"Badge",component:br(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:xr(e)})},{path:"button",action:()=>({title:"Button",component:Er(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Mr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Nr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Lr(e)})},{path:"chip",action:()=>({title:"Chip",component:Gr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Vr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Yr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:ts(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:rs(e)})},{path:"fileInput",action:()=>({title:"File Input",component:ls(e)})},{path:"input",action:()=>({title:"Input",component:ms(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:fs(e)})},{path:"list",action:()=>({title:"List",component:Ds(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Cs(e)})},{path:"modal",action:()=>({title:"Modal",component:Bs(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Gs(e)})},{path:"paper",action:()=>({title:"Paper",component:Zs(e)})},{path:"popover",action:()=>({title:"Popover",component:Rs(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:qs(e)})},{path:"select",action:()=>({title:"Select",component:ni(e)})},{path:"slider",action:()=>({title:"Slider",component:ui(e)})},{path:"spinner",action:()=>({title:"Spinner",component:gi(e)})},{path:"switch",action:()=>({title:"Switch",component:xi(e)})},{path:"table",action:()=>({title:"Table",component:zi(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:Wi(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ki(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Ii(e)})},{path:"toggle",action:()=>({title:"Toggle",component:Qi(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:sc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:pc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:hc(e)})},{path:"treeView",action:()=>({title:"Tree View",component:yc(e)})}]},{path:"pages",action:t=>({title:"Pages",component:So(e)})}],Sc=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),kc=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,r=a.state(),s=t({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:g=t}=l.resolve({pathname:u});r.val=d,document.title=`${p}`}},Tc=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};Qn();const Bn={title:"Bau",base:"/bau/bau-ui"},le=io({config:Bn}),{bau:Ac}=le;le.states={drawerOpen:Ac.state(!0)};Tc(le);Un({routes:Ec({context:le}),onLocationChange:kc({context:le,LayoutDefault:fo(le),config:Bn}),notFoundRoute:Sc(le)});
