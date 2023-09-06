(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Gn=(e,t)=>({...e,paths:[...t,e.path]}),wt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Gn(o,e);return n?[a,...wt({paths:[...e,o.path],routes:n})]:a}),Un=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Fn=({routes:e=[],notFoundRoute:t})=>{const n=wt({routes:e}).map(o=>({...o,regex:Un(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Wn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Fn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ve=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Vn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Zn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ct=e=>`var(--color-${e})`,Xn=e=>`var(--color-${e}-lightest)`,Kn=()=>Ve.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ct(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Xn(e)};
}
.solid.${e} {
  background-color: ${ct(e)};
}
`).join(`
`),Yn=()=>Ve.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),qn=e=>100-e*10,Jn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${qn(t)}%);`).join(`
`),lt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Qn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Vn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Zn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function eo({createGlobalStyles:e},{colorPalette:t=Ve}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>Qn([n,o])).join(`
`)}
      ${Jn()}
      ${lt({})}
      ${Kn()}
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
      ${Yn()}
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
  `}function to(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ze=e=>Object.prototype.toString.call(e??0).slice(8,-1),no=e=>Ze(e)=="Object",ut=e=>Ze(e)=="Function",Ue=e=>["Object","Array"].includes(Ze(e)),dt=Object.getPrototypeOf,Fe=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,oo=["splice","push","pop","shift","unshift","sort","reverse"],Te=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const F=e=>!me(e[0])&&no(e[0])?e:[{},...e];function ao(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,r=!1,s,c=y=>n.createElement(y),l=(y,m,b)=>{let C=s;s=m;let E=y(b);return s=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},p=(y,m,b,C,E,L)=>{var _;if(r){i.add(y);return}for(let Z of y.bindings){let{deps:O,element:B,renderInferred:V,render:J,renderItem:te}=Z;if(te&&m)(_=h(B,C,(...ae)=>x(te(...ae)),b,E,L)[m])==null||_.call();else{let ae=V?V({element:B}):J({element:B,renderItem:te})(...O.map(Fe));ae!==B&&B.replaceWith(Z.element=x(ae))}}S(y),u()},d=(y,m,b=[])=>({get(C,E,L){var _;if(s==null||s.add(y),E==="_isProxy")return!0;if(!((_=C[E])!=null&&_._isProxy)&&!me(C[E])&&Ue(C[E]))C[E]=new Proxy(C[E],d(y,m,[...b,E]));else if(oo.includes(E)){let Z=C[E];return(...O)=>{let B=Z.apply(C,O);return p(y,E,B,O,m,b),B}}return Reflect.get(C,E,L)},set(C,E,L,_){let Z=Reflect.set(C,E,L,_);return p(y,"setItem",Z,{prop:E,value:L},m,[...b,E]),Z}}),g=(y,m)=>new Proxy(m,d(y,m)),h=(y,m,b,C,E,L)=>{let _=()=>y.replaceChildren(...Te(C,b)),Z=O=>y[O]&&y.removeChild(y[O]);return{assign:_,sort:_,reverse:_,setItem:()=>{var B;let O=L[0];(B=y.children[O])==null||B.replaceWith(b(E[O],O))},push:()=>y.append(...Te(m,(O,B)=>b(O,E.length+B))),unshift:()=>y.prepend(...Te(m,b)),pop:()=>Z("lastChild"),shift:()=>Z("firstChild"),splice:()=>{let[O,B,...V]=m;const{length:J}=y.children;for(let te=O>=0?Math.min(O+B-1,J-1):J-1;te>=(O>=0?O:J+O);te--)y.children[te].remove();if(V.length){let te=V.forEach((ae,je)=>b(ae,O+je));y.children[O]?y.children[O].after(...te):y.append(...te)}}}},f=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return s==null||s.add(m),m.valProxy??(m.valProxy=Ue(y)?g(m,y):y,m.valProxy)},set val(m){let b=this,C=b.val;Ue(m)?(b.valProxy=g(b,m),p(b,"assign",m)):m!==C&&(b.valProxy=m,p(b)),b.oldVal=C}}),x=y=>y==null||y===!1?c("span"):y.nodeType?y:n.createTextNode(y),w=(y,m)=>{let b=new Set;return m.val=l(y,b),b},v=y=>{let m=f(),b=w(y,m);m.computed=!0;for(let C of b)C.listeners.push({computed:y,deps:b,state:m});return m},S=y=>{for(let m of[...y.listeners])w(m.computed,m.state)},I=(y,...m)=>{if(m.length){let b=[];for(let C of m.flat(1/0))C!=null&&b.push(me(C)?z({deps:[C],render:()=>E=>E}):ut(C)?ee({renderInferred:C}):x(C));y.append(...b)}},N={},P=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??P(dt(y),m)),A=(y,m,b)=>{var C;return N[y+","+m]??(N[y+","+m]=((C=P(b,m))==null?void 0:C.set)??0)},$=(y,m)=>new t.MutationObserver((b,C)=>{b.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(L=>L===y&&(m({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),M=(y,m)=>new t.MutationObserver((b,C)=>b.forEach(E=>m({record:E,element:y}))).observe(y,{childList:!0}),R=y=>new Proxy(function(b,...C){var Z;let[E,...L]=F(C),_=y?n.createElementNS(y,b):c(b);for(let[O,B]of Object.entries(E)){if(O.startsWith("bau"))continue;let V=A(b,O,dt(_))?J=>_[O]=J:J=>_.setAttribute(O,J);B==null||(me(B)?z({deps:[B],render:()=>()=>(V(B.val),_)}):ut(B)&&(!O.startsWith("on")||B.isDerived)?ee({renderInferred:()=>(V(B({element:_})),_)}):B.renderProp?z({deps:B.deps,render:()=>()=>(V(B.renderProp({element:_})(...B.deps.map(Fe))),_)}):V(B))}return E.bauChildMutated&&M(_,E.bauChildMutated),I(_,...L),(Z=E.bauCreated)==null||Z.call(E,{element:_}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:_})),E.bauUnmounted&&t.requestAnimationFrame(()=>$(_,E.bauUnmounted)),_},{get:(m,b)=>m.bind(void 0,b)}),Y=(y,m,b)=>{y.element=x(b);for(let C of m)me(C)&&(a.add(C),C.bindings.push(y));return y.element},ee=({renderInferred:y,element:m})=>{let b=new Set,C=l(y,b,{element:m});return Y({renderInferred:y},b,C)},z=({deps:y,element:m,render:b,renderItem:C})=>Y({deps:y,render:b,renderItem:C},y,b({element:m,renderItem:C})(...y.map(Fe))),W=(y,m,b)=>z({deps:[y],render:({renderItem:C})=>E=>(m.append(...Te(E,C)),m),renderItem:b}),U=y=>{r=!0,y(),r=!1,i.forEach(p),i.clear()};return{tags:R(),tagsNS:R,state:f,bind:z,loop:W,derive:v,stateSet:a,batch:U}}const ro=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},so=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},io=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function co(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const r=io(a,i),s=ro(r);return!t.getElementById(s)&&so(t,e==null?void 0:e.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function lo(e){const t=ao(),n=co();return eo(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function Ne(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:r=a,animationShow:s=a,...c},l){return o({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!r()||d.getAttribute("cloned"))return;const g=d.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=d.getAttribute("width"),g.style.height=d.getAttribute("height"),g.style.position="absolute",g.style.animation=r(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var h;return(h=g.parentNode)==null?void 0:h.removeChild(g)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const g=d.getBoundingClientRect();if(d.setAttribute("width",g.width+"px"),d.setAttribute("height",g.height+"px"),s()){d.style.animation=s();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function X(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:u,href:p,...d},...g]=F(r);return(p?n.tags.a:n.tags.button)({...d,class:T("button",a.root,c,l,s,p?a.a:a.button,u&&a.disabled,t==null?void 0:t.class,d.class),disabled:u,href:p,...!p&&{type:"button"}},g)}}const Q=["neutral","primary","success","danger","warning"],uo=["plain","outline","solid"],po=["sm","md","lg"],mo="light",go=()=>Q.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Xe(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,r=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(mo);const l=o`
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
    ${go()}
  `;return function(...p){let[{color:d,variant:g="outline",size:h="md",...f},...x]=F(p);return i({required:"required",title:"Switch Theme",...f,class:T("theme-switch",d,g,h,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:s()=="dark",onclick:w=>{r(w.target.checked?"dark":"light")}},...x)}}function bo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:r,header:s,h1:c,div:l,a:u,img:p,b:d,ul:g,li:h}=n.tags,{svg:f,path:x}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,v=X(e,{class:o`
      background: transparent;
    `}),S=Xe(e),I=()=>r(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},x({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),N=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},I()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(t("Bau UI")))),P=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),v({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},N(),P())}}function ho({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:r,ul:s,li:c,p:l,div:u,h1:p}=t.tags,d=({links:f,title:x})=>o({class:n`
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
        `},p(x),s(f.map(({href:w,name:v})=>c(r({href:w},v))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=F(s);return a({...p,class:T("list",i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Ae="0.3s",yt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(yt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Ct=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ct(e)(t.children[o]);if(a)return a}},fo=({keyframes:e})=>({hideToLeft:e`
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
   `});function Ke(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:r="",hashBased:s=!1}=t,c=`${i.base}${r}`,l=z=>{var W;return((W=z.parentTree.data)==null?void 0:W.href)??z.parentTree.children[0].data.href},u=({variant:z,color:W,size:U,currentTree:y,data:m})=>S(A({variant:z,color:W,size:U,href:`${c}${l(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),A({variant:z,color:W,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:z,subTree:{data:{name:W,href:U},children:y=[]}})=>A({size:z,href:`${c}${U}`,"data-ischild":!y.length},W),d=({pathname:z,subTree:W})=>{var U;return z===((U=W==null?void 0:W.data)==null?void 0:U.href)},{renderHeader:g=u,renderMenuItem:h=p,isActive:f=d}=t,{li:x,nav:w,div:v,header:S,a:I}=n.tags,N=Ne(e),P=we(e),A=X(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:$,hideToRight:M}=fo(e),R=o`
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
  `,Y=({variant:z,color:W,size:U,currentTree:y,pathnameState:m})=>{const{children:b,parentTree:C,data:E}=y;return v({class:T("drillDownMenu",z,W,U)},C&&g({variant:z,color:W,size:U,data:E,currentTree:y}),b&&P({class:T(z,W,U)},b.map(L=>x({class:()=>T(L.children&&"has-children",f({pathname:m.val,subTree:L})&&"active")},h({variant:z,color:W,size:U,subTree:L})))))},ee=({tree:z,pathname:W})=>{let U=yt({})(structuredClone(z)),y=Ct(W)(U);return y||(console.error("drilldown no sub tree",W),y=U),y};return function(W){const{variant:U="plain",color:y="neutral",size:m="md",tree:b,...C}=W,E=n.state(a.location.pathname.replace(c,"")),L=n.derive(()=>ee({tree:b,pathname:E.val}));a.document.addEventListener("click",V=>{const{target:J}=V,te=J.getAttribute("href");if(J.tagName==="A"&&te&&!te.startsWith("http")){let ae=te.replace(c,"");s||(ae=ae.replace(J.hash,"")),E.val=ae}});let _=1;const Z=V=>{const{dataset:J}=V.target;J.buttonback=="true"?_=-1:J.ischild=="false"?_=1:J.ischild=="true"&&(_=0)},O=V=>{switch(V){case 1:return`${$} ${Ae}`;case-1:return`${M} ${Ae}`;default:return""}},B=V=>{switch(V){case 1:return`${M} ${Ae} reverse`;case-1:return`${$} ${Ae} reverse`;default:return""}};return w({class:T(R,t==null?void 0:t.class,C.class),onclick:Z},N({animationHide:()=>O(_),animationShow:()=>B(_)},()=>Y({variant:U,color:y,size:m,currentTree:L.val,pathnameState:E})))}}const vo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function St(e){const{tr:t,bau:n,css:o,config:a,states:i,window:r}=e,{div:s,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let g=!1;const h=Ke(e);return function(){return s({bauMounted:({element:x})=>{r.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:x=>{g&&!x.target.dataset.buttonback&&!x.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},h({tree:vo}))}}const xo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,r=Ne(e),s=bo(e),c=St(e),l=ho(e),u=a`
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
            display: grid;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val),l())}};function $e(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...g]=F(s);return a({...d,onclick:p,class:T("chip",i,c,l,u,p&&"clickable",t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}function wo(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:r,p:s}=t.tags;X(e);const c=n`
    padding: 0 1rem 1rem 1rem;
    & h1 {
      font-size: 56px;
      line-height: 2rem;
    }
    & h2 {
      font-size: 48px;
      line-height: 1.8rem;
    }
    & p {
      font-size: 24px;
      line-height: 1.8rem;
      color: var(--color-emphasis-900);
    }
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),r(p),s(d))}}function yo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,r=n`
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
      width: 25%;
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
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function Co({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:r,div:s,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:g,size:h})=>s({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function So(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:r,section:s}=t.tags,c=wo(e),l=yo(e),u=X(e);$e(e);const p=Co(e),d=(...w)=>a({class:n`
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
          `},...w)),g=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],x=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:h}),x())}}function Eo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const ko=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:r}=n.tags,s=Eo(e);return()=>o({id:"login"},r(t("Login Examples")),i("Basic"),a(s()))};function To(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
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
          `},r(t("Pages Examples")),ko(e)()))}}function Ao(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Et(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Et(n)}),e}class pt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function kt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Io="</span>",mt=e=>!!e.scope,Mo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Do{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=kt(t)}openNode(t){if(!mt(t))return;const n=Mo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){mt(t)&&(this.buffer+=Io)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const gt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ye{constructor(){this.rootNode=gt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=gt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ye._collapse(n)}))}}class No extends Ye{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Do(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function Tt(e){return de("(?=",e,")")}function $o(e){return de("(?:",e,")*")}function Bo(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function Po(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function qe(...e){return"("+(Po(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function At(e){return new RegExp(e.toString()+"|").exec("").length-1}function _o(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Oo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Je(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),r="";for(;i.length>0;){const s=Oo.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(t)}const Ro=/\b\B/,It="[a-zA-Z]\\w*",Qe="[a-zA-Z_]\\w*",Mt="\\b\\d+(\\.\\d+)?",Dt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Nt="\\b(0b[01]+)",Lo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",jo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},zo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Ho={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Go={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Be=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Uo=Be("//","$"),Fo=Be("/\\*","\\*/"),Wo=Be("#","$"),Vo={scope:"number",begin:Mt,relevance:0},Zo={scope:"number",begin:Dt,relevance:0},Xo={scope:"number",begin:Nt,relevance:0},Ko={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Yo={scope:"title",begin:It,relevance:0},qo={scope:"title",begin:Qe,relevance:0},Jo={begin:"\\.\\s*"+Qe,relevance:0},Qo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ie=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Ro,IDENT_RE:It,UNDERSCORE_IDENT_RE:Qe,NUMBER_RE:Mt,C_NUMBER_RE:Dt,BINARY_NUMBER_RE:Nt,RE_STARTERS_RE:Lo,SHEBANG:jo,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:zo,QUOTE_STRING_MODE:Ho,PHRASAL_WORDS_MODE:Go,COMMENT:Be,C_LINE_COMMENT_MODE:Uo,C_BLOCK_COMMENT_MODE:Fo,HASH_COMMENT_MODE:Wo,NUMBER_MODE:Vo,C_NUMBER_MODE:Zo,BINARY_NUMBER_MODE:Xo,REGEXP_MODE:Ko,TITLE_MODE:Yo,UNDERSCORE_TITLE_MODE:qo,METHOD_GUARD:Jo,END_SAME_AS_BEGIN:Qo});function ea(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ta(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function na(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ea,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function oa(e,t){Array.isArray(e.illegal)&&(e.illegal=qe(...e.illegal))}function aa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ra(e,t){e.relevance===void 0&&(e.relevance=1)}const sa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Tt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ia=["of","and","for","in","not","or","if","then","parent","list","value"],ca="keyword";function $t(e,t,n=ca){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,$t(e[i],t,i))}),o;function a(i,r){t&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,la(c[0],c[1])]})}}function la(e,t){return t?Number(t):ua(e)?0:1}function ua(e){return ia.includes(e.toLowerCase())}const bt={},ue=e=>{console.error(e)},ht=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{bt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),bt[`${e}/${t}`]=!0)},De=new Error;function Bt(e,t,{key:n}){let o=0;const a=e[n],i={},r={};for(let s=1;s<=t.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=At(t[s-1]);e[n]=r,e[n]._emit=i,e[n]._multi=!0}function da(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),De;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),De;Bt(e,e.begin,{key:"beginScope"}),e.begin=Je(e.begin,{joinWith:""})}}function pa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),De;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),De;Bt(e,e.end,{key:"endScope"}),e.end=Je(e.end,{joinWith:""})}}function ma(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ga(e){ma(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),da(e),pa(e)}function ba(e){function t(r,s){return new RegExp(ve(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=At(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=t(Je(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[ta,aa,ga,sa].forEach(u=>u(r,s)),e.compilerExtensions.forEach(u=>u(r,s)),r.__beforeBegin=null,[na,oa,ra].forEach(u=>u(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=$t(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(u){return ha(u==="self"?r:u)})),r.contains.forEach(function(u){i(u,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function Pt(e){return e?e.endsWithParent||Pt(e.starts):!1}function ha(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Pt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var fa="11.8.0";class va extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const We=kt,ft=ie,vt=Symbol("nomatch"),xa=7,_t=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:No};function c(m){return s.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const C=s.languageDetectRe.exec(b);if(C){const E=M(C[1]);return E||(ht(i.replace("{}",C[1])),ht("Falling back to no-highlight mode for this block.",m)),E?C[1]:"no-highlight"}return b.split(/\s+/).find(E=>c(E)||M(E))}function u(m,b,C){let E="",L="";typeof b=="object"?(E=m,C=b.ignoreIllegals,L=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),L=m,E=b),C===void 0&&(C=!0);const _={code:E,language:L};U("before:highlight",_);const Z=_.result?_.result:p(_.language,_.code,C);return Z.code=_.code,U("after:highlight",Z),Z}function p(m,b,C,E){const L=Object.create(null);function _(k,D){return k.keywords[D]}function Z(){if(!j.keywords){ne.addText(q);return}let k=0;j.keywordPatternRe.lastIndex=0;let D=j.keywordPatternRe.exec(q),G="";for(;D;){G+=q.substring(k,D.index);const K=re.case_insensitive?D[0].toLowerCase():D[0],oe=_(j,K);if(oe){const[se,zn]=oe;if(ne.addText(G),G="",L[K]=(L[K]||0)+1,L[K]<=xa&&(ke+=zn),se.startsWith("_"))G+=D[0];else{const Hn=re.classNameAliases[se]||se;V(D[0],Hn)}}else G+=D[0];k=j.keywordPatternRe.lastIndex,D=j.keywordPatternRe.exec(q)}G+=q.substring(k),ne.addText(G)}function O(){if(q==="")return;let k=null;if(typeof j.subLanguage=="string"){if(!t[j.subLanguage]){ne.addText(q);return}k=p(j.subLanguage,q,!0,it[j.subLanguage]),it[j.subLanguage]=k._top}else k=g(q,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(ke+=k.relevance),ne.__addSublanguage(k._emitter,k.language)}function B(){j.subLanguage!=null?O():Z(),q=""}function V(k,D){k!==""&&(ne.startScope(D),ne.addText(k),ne.endScope())}function J(k,D){let G=1;const K=D.length-1;for(;G<=K;){if(!k._emit[G]){G++;continue}const oe=re.classNameAliases[k[G]]||k[G],se=D[G];oe?V(se,oe):(q=se,Z(),q=""),G++}}function te(k,D){return k.scope&&typeof k.scope=="string"&&ne.openNode(re.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(V(q,re.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),q=""):k.beginScope._multi&&(J(k.beginScope,D),q="")),j=Object.create(k,{parent:{value:j}}),j}function ae(k,D,G){let K=_o(k.endRe,G);if(K){if(k["on:end"]){const oe=new pt(k);k["on:end"](D,oe),oe.isMatchIgnored&&(K=!1)}if(K){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return ae(k.parent,D,G)}function je(k){return j.matcher.regexIndex===0?(q+=k[0],1):(Ge=!0,0)}function On(k){const D=k[0],G=k.rule,K=new pt(G),oe=[G.__beforeBegin,G["on:begin"]];for(const se of oe)if(se&&(se(k,K),K.isMatchIgnored))return je(D);return G.skip?q+=D:(G.excludeBegin&&(q+=D),B(),!G.returnBegin&&!G.excludeBegin&&(q=D)),te(G,k),G.returnBegin?0:D.length}function Rn(k){const D=k[0],G=b.substring(k.index),K=ae(j,k,G);if(!K)return vt;const oe=j;j.endScope&&j.endScope._wrap?(B(),V(D,j.endScope._wrap)):j.endScope&&j.endScope._multi?(B(),J(j.endScope,k)):oe.skip?q+=D:(oe.returnEnd||oe.excludeEnd||(q+=D),B(),oe.excludeEnd&&(q=D));do j.scope&&ne.closeNode(),!j.skip&&!j.subLanguage&&(ke+=j.relevance),j=j.parent;while(j!==K.parent);return K.starts&&te(K.starts,k),oe.returnEnd?0:D.length}function Ln(){const k=[];for(let D=j;D!==re;D=D.parent)D.scope&&k.unshift(D.scope);k.forEach(D=>ne.openNode(D))}let Ee={};function st(k,D){const G=D&&D[0];if(q+=k,G==null)return B(),0;if(Ee.type==="begin"&&D.type==="end"&&Ee.index===D.index&&G===""){if(q+=b.slice(D.index,D.index+1),!a){const K=new Error(`0 width match regex (${m})`);throw K.languageName=m,K.badRule=Ee.rule,K}return 1}if(Ee=D,D.type==="begin")return On(D);if(D.type==="illegal"&&!C){const K=new Error('Illegal lexeme "'+G+'" for mode "'+(j.scope||"<unnamed>")+'"');throw K.mode=j,K}else if(D.type==="end"){const K=Rn(D);if(K!==vt)return K}if(D.type==="illegal"&&G==="")return 1;if(He>1e5&&He>D.index*3)throw new Error("potential infinite loop, way more iterations than matches");return q+=G,G.length}const re=M(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const jn=ba(re);let ze="",j=E||jn;const it={},ne=new s.__emitter(s);Ln();let q="",ke=0,ce=0,He=0,Ge=!1;try{if(re.__emitTokens)re.__emitTokens(b,ne);else{for(j.matcher.considerAll();;){He++,Ge?Ge=!1:j.matcher.considerAll(),j.matcher.lastIndex=ce;const k=j.matcher.exec(b);if(!k)break;const D=b.substring(ce,k.index),G=st(D,k);ce=k.index+G}st(b.substring(ce))}return ne.finalize(),ze=ne.toHTML(),{language:m,value:ze,relevance:ke,illegal:!1,_emitter:ne,_top:j}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:We(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:b.slice(ce-100,ce+100),mode:k.mode,resultSoFar:ze},_emitter:ne};if(a)return{language:m,value:We(b),illegal:!1,relevance:0,errorRaised:k,_emitter:ne,_top:j};throw k}}function d(m){const b={value:We(m),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return b._emitter.addText(m),b}function g(m,b){b=b||s.languages||Object.keys(t);const C=d(m),E=b.filter(M).filter(Y).map(B=>p(B,m,!1));E.unshift(C);const L=E.sort((B,V)=>{if(B.relevance!==V.relevance)return V.relevance-B.relevance;if(B.language&&V.language){if(M(B.language).supersetOf===V.language)return 1;if(M(V.language).supersetOf===B.language)return-1}return 0}),[_,Z]=L,O=_;return O.secondBest=Z,O}function h(m,b,C){const E=b&&n[b]||C;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function f(m){let b=null;const C=l(m);if(c(C))return;if(U("before:highlightElement",{el:m,language:C}),m.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),s.throwUnescapedHTML))throw new va("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const E=b.textContent,L=C?u(E,{language:C,ignoreIllegals:!0}):g(E);m.innerHTML=L.value,h(m,C,L.language),m.result={language:L.language,re:L.relevance,relevance:L.relevance},L.secondBest&&(m.secondBest={language:L.secondBest.language,relevance:L.secondBest.relevance}),U("after:highlightElement",{el:m,result:L,text:E})}function x(m){s=ft(s,m)}const w=()=>{I(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function v(){I(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function I(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(s.cssSelector).forEach(f)}function N(){S&&I()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",N,!1);function P(m,b){let C=null;try{C=b(e)}catch(E){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(E);else throw E;C=r}C.name||(C.name=m),t[m]=C,C.rawDefinition=b.bind(null,e),C.aliases&&R(C.aliases,{languageName:m})}function A(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function $(){return Object.keys(t)}function M(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function R(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=b})}function Y(m){const b=M(m);return b&&!b.disableAutodetect}function ee(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function z(m){ee(m),o.push(m)}function W(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function U(m,b){const C=m;o.forEach(function(E){E[C]&&E[C](b)})}function y(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),f(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:I,highlightElement:f,highlightBlock:y,configure:x,initHighlighting:w,initHighlightingOnLoad:v,registerLanguage:P,unregisterLanguage:A,listLanguages:$,getLanguage:M,registerAliases:R,autoDetection:Y,inherit:ft,addPlugin:z,removePlugin:W}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=fa,e.regex={concat:de,lookahead:Tt,either:qe,optional:Bo,anyNumberOfTimes:$o};for(const m in Ie)typeof Ie[m]=="object"&&Et(Ie[m]);return Object.assign(e,Ie),e},ge=_t({});ge.newInstance=()=>_t({});var wa=ge;ge.HighlightJS=ge;ge.default=ge;const fe=Ao(wa),xt="[A-Za-z$_][0-9A-Za-z$_]*",ya=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ca=["true","false","null","undefined","NaN","Infinity"],Ot=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Rt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Lt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Sa=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ea=[].concat(Lt,Ot,Rt);function jt(e){const t=e.regex,n=(b,{after:C})=>{const E="</"+b[0].slice(1);return b.input.indexOf(E,C)!==-1},o=xt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,C)=>{const E=b[0].length+b.index,L=b.input[E];if(L==="<"||L===","){C.ignoreMatch();return}L===">"&&(n(b,{after:E})||C.ignoreMatch());let _;const Z=b.input.substring(E);if(_=Z.match(/^\s*=/)){C.ignoreMatch();return}if((_=Z.match(/^\s+extends\s+/))&&_.index===0){C.ignoreMatch();return}}},s={$pattern:xt,keyword:ya,literal:Ca,built_in:Ea,"variable.language":Sa},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},x={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},v={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,f,x,{match:/\$\d+/},p];d.contains=S.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(S)});const I=[].concat(v,d.contains),N=I.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(I)}]),P={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},$={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ot,...Rt]}},M={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},Y={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ee(b){return t.concat("(?!",b.join("|"),")")}const z={match:t.concat(/\b/,ee([...Lt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},W={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:$},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),M,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,f,x,v,{match:/\$\d+/},p,$,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[v,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},W,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},z,Y,A,U,{match:/\$[(.]/}]}}function ka(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ta=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",jt),fe.registerLanguage("sh",ka),function({text:r,language:s="js"}){const c=a({class:`hljs language-${s}`});return c.innerHTML=fe.highlight(r,{language:s}).value,o({class:n`
          display: inline-block;
        `},c)}};function Aa(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:r,a:s,ul:c,li:l}=t.tags,u=Ta(e);return function(){return o({class:n`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=F(s);return a({...p,class:T("paper",u,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}function zt(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:r,li:s,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),p=(x,w)=>{let v=null;return(...S)=>{a.clearTimeout(v),v=a.setTimeout(()=>x(...S),w)}},d=o`
    grid-area: toc;
    position: sticky;
    right: 0;
    z-index: 1;
    top: calc(var(--header-height));
    height: fit-content;
    max-height: calc(100vh - var(--header-height));
    background-color: var(--background-color);
    border-left: 1px solid var(--color-emphasis-200);
    & ul {
      padding-left: 0rem;
      & ul {
        padding-left: 1rem;
      }
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
  `,g=({value:x,id:w,children:v=[]})=>{const S=c({class:()=>u.val==w?"active":"",href:`#${w}`});return S.innerHTML=x,s({class:()=>u.val==w?"active":""},S,v.length>0&&r(v.map(g)))},h=x=>x.tagName.charAt(1),f=({contentEl:x})=>{const w=x.querySelectorAll(l);let v=2,S={},I={children:[]},N=I;const P=N;let A=[N];return[...w].forEach($=>{const M=h($);$.setAttribute("id",$.textContent),!$.innerHTML.includes("<button")&&(S={value:$.innerHTML,id:$.id??$.textContent,children:[]},v==M?(I=S,N.children.push(I)):v<M?(A.push(N),N=I,I.children.push(S),I=S):v>M&&(N=A[M-1],A=A.slice(0,M-1),N.children.push(S),I=S),v=M)}),P};return function(...w){let[{color:v,variant:S,size:I="md",contentEl:N,...P}]=F(w);const A=f({contentEl:N}),$=p(()=>{const R=[...N.querySelectorAll(l)].find(Y=>{const{top:ee,height:z}=Y.getBoundingClientRect();if(ee+z>60)return!0});R&&(u.val=R==null?void 0:R.id)},100);return i({...P,class:T("tableOfContent",I,S,v,d,t==null?void 0:t.class,P==null?void 0:P.class),bauMounted:()=>{a.addEventListener("scroll",$)},bauUnmounted:()=>{a.removeEventListener("scroll",$)}},A.children&&r(A.children.map(g)))}}const Ht=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(r(l(d??""),Q.map(g=>l(g)))),i(uo.map(g=>r(l(g),Q.map((h,f)=>s(p({color:h,variant:g},{index:f}))))))))}},Ia=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},po.map((r,s)=>i({color:"success",variant:"outline",size:r},{index:s})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:r,p:s,h2:c,h3:l,pre:u,code:p}=t.tags;fe.registerLanguage("javascript",jt);const d=zt(e),g=Pe(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),h=Ht(e),f=Ia(e),x=({text:w})=>u({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=fe.highlight(w,{language:"js"}).value}}));return function(v){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},r(v.title),s(v.description),v.gridItem&&[c("Variant/Color"),!v.variantColorTableDisable&&v.gridItem&&g(h({Item:v.gridItem(e)})),c("Size"),s("Component with size: ",p("sm"),", ",p("md"),", and ",p("lg")),v.gridItem&&g(f({Item:v.gridItem(e)}))],c("Usage"),l("Import"),x({text:v.importStatement}),c("Examples"),v.examples.map(I=>i(l(I.title),s(I.description),g(I.createComponent(e)()),x({text:I.code}))));return o({class:n`
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr auto;
          grid-template-areas: "content toc";
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas: "content";
            & nav {
              display: none;
            }
          }
        `},S,d({contentEl:S}))}};function et(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,r=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?s(l):c(l))};function s(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:g="md",Header:h,Content:f,close:x=!0,...w}]=F(u);const v=n.state(x);return a({...w,class:T("collapsible",g,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:()=>T("header",f?v.val?"close":"open":""),onclick:S=>{v.val=!v.val,S.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:S})=>{v.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(r({element:S,closeState:v}),!v.val)},f&&f()))}}const Ma=()=>Q.map(e=>`
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
    ${Ma()}
  `;return function(...h){let[{color:f,variant:x="outline",size:w="md",data:v=[],...S}]=F(h);const I=N=>{const{Header:P,Content:A,name:$}=N,M=()=>s({class:()=>T(l.val==$&&"active")},c({type:"button","aria-controls":`bau-${$}`,"aria-expanded":({element:Y})=>l.val==$},P(N))),R=()=>a({id:`bau-${$}`,"data-state":({element:Y})=>l.val==$},A(N));return r({class:T(f,x,w),onclick:p($)},u({Header:M,Content:R}))};return a({class:T("accordion",d,t==null?void 0:t.class,S.class)},i(v.map(I)))}}const Gt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return r=>i({...r,data:a})},Da=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Na=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ut=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},$a=e=>{const{css:t}=e,n=Ut(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
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
`,Pa=e=>{const{css:t}=e,n=Ut(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},_a=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Oa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Na,createComponent:Da},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ba,createComponent:$a},{title:"Customize the icon",description:"Customize the icon with a cross.",code:_a,createComponent:Pa}],gridItem:Gt},Ra=e=>{const t=H(e);return()=>t(Oa)},La={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},ja=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},za=()=>Q.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Oe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:r}=n.tags;ja({css:o,createGlobalStyles:a});const s=o`
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
    ${za()}
  `,c=X(e),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:g="outline",color:h="neutral",size:f="md",onRemove:x,...w}=p;return i({...w,class:T(`alert-${g}`,g,h,f,s,t==null?void 0:t.class,p.class,"alert"),role:"alert"},r({class:"icon"},La[h]),i({class:"content"},...d),x&&l({onclick:x}))}}const Ft=e=>{const t=Oe(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Ha=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Oe(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ga=`import alert from "@grucloud/bau-ui/alert";
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
`,Ua=e=>{const{css:t}=e,n=Oe(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Fa=`import alert from "@grucloud/bau-ui/alert";
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
`,Wa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ga,createComponent:Ha},{title:"Custom Alert ",description:"A custom alert.",code:Fa,createComponent:Ua}],gridItem:Ft},Va=e=>{const t=H(e);return()=>t(Wa)},Za=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:r=15e3}=t,{div:s}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:g})=>{const h=c.val.findIndex(f=>f.id===d);h!=-1&&(c.val[h].status=g)};return function(g={},...h){const f=({id:v})=>{p({id:v,status:"removing"});const S=c.val.findIndex(I=>I.id===v);S!=-1&&c.val.splice(S,1)},x=({Component:v})=>{const S={id:Math.random().toString(10).split(".")[1],Component:v,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(S),setTimeout(()=>f(S),r)},w=v=>s({class:u.item,onclick:()=>f(v)},v.Component());return document.addEventListener("alert.add",v=>x(v.detail)),document.addEventListener("alert.remove",v=>f(v.detail)),s({class:T(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,s(),w))}},Xa=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Za(e,{deleteAfterDuration:2e4}),i=X(e),r=Oe(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Ka=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ya={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ka,createComponent:Xa}]},qa=e=>{const t=H(e);return()=>t(Ya)},Ja=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ne(e),r=X(e),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(r({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},Qa=`import animate from "@grucloud/bau-ui/animate";
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
`,er=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:r}=t.tags,s=Ne(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(r("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),r("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),s({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},tr=`import animate from "@grucloud/bau-ui/animate";
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
`,nr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Qa,createComponent:Ja},{title:"Component hide and show",description:"Hide and show a component",code:tr,createComponent:er}]},or=e=>{const t=H(e);return()=>t(nr)};function Wt(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=p=>{r.val=!1,s.val=!0},u=o`
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
  `;return function(...d){let[{color:g,variant:h="outline",size:f="md",width:x=30,height:w=30,...v},...S]=F(d);return a({class:T(u,t==null?void 0:t.class,v.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:x,height:w,onload:c,onerror:l,class:T(g,h,f,u,t==null?void 0:t.class,v.class),...v}))}}const Vt=e=>{const{css:t}=e,n=Wt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},ar=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Wt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},rr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,sr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:rr,createComponent:ar}],gridItem:Vt},ir=e=>{const t=H(e);return()=>t(sr)};function tt(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,r=Pe(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...g},...h]=F(l);const f=v=>{w.style.opacity=1,w.showModal();const S=p.getBoundingClientRect(),I=w.getBoundingClientRect();S.x<a.innerWidth/2?w.style.left=S.left+"px":w.style.left=S.right-I.width+"px",S.y<a.innerHeight/2?w.style.top=S.top+S.height+"px":w.style.top=S.top-I.height+"px"},x=v=>{const S=()=>{w.close(),w.removeEventListener("transitionend",S)};w.addEventListener("transitionend",S),w.style.opacity=0},w=i({role:"presentation",class:T("popover",s,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v=>v.target===w&&(x(),d==null?void 0:d.call())},r(u));return w.closeDialog=x,w.openDialog=f,w}}const cr=()=>Q.map(e=>`
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
    ${cr()}
  `;return function(s){const{size:c="md",variant:l="outline",color:u="neutral",name:p,id:d,disabled:g,...h}=s;return a({...h,class:T("input",c,u,l,i,t==null?void 0:t.class,h.class)})}}const lr=()=>Q.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Zt(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=tt(e),s=X(e),c=nt(e),l=we(e),u=o`
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

    ${lr()}
  `,p=n.state(""),d=n.state(""),g=n.state(!1),h=n.state(0),f=()=>{g.val=!1};return function(...w){let[{variant:v="outline",color:S,size:I="md",id:N,label:P,placeholder:A,Option:$,options:M,getOptionLabel:R=({label:O})=>O,...Y},...ee]=F(w);const z=n.state(M),W=()=>{Z.openDialog(),g.val=!0,d.val="",z.val=M},U=()=>{Z.closeDialog(),g.val=!1,d.val=""},y=O=>{const{value:B}=O.target;d.val=B,B?z.val=M.filter(V=>R(V).match(new RegExp(`${B}`,"i"))):z.val=M},m=O=>{g.val?U():W()},b=({option:O,index:B})=>V=>{p.val=R(O),h.val=B,U()},C=O=>{switch(console.log("onkeydown",O.key,h.val),O.key){case"Escape":U();break;case"ArrowDown":h.val<z.val.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=z.val.length-1:h.val--;break;case"Enter":p.val=R(z.val[h.val]),d.val="",U();break}},E=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":P,onclick:m,variant:v,color:S,size:I},()=>!p.val&&P,p),L=c({id:N,value:d,placeholder:A,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:y,onkeydown:C,variant:v,color:S,size:I}),Z=r({id:N,triggerEl:E,contentEl:(()=>a({class:T(v,S,I,"content")},L,()=>l({class:T(v,S,I)},z.val.map((O,B)=>i({class:()=>T(h.val==B&&"active"),onclick:b({option:O,index:B})},$(O))))))(),onClose:f});return a({...Y,class:T("autocomplete",u,t==null?void 0:t.class,Y==null?void 0:Y.class)},E,Z)}}const Xt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Zt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},ur=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=Zt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},dr=`import { Context } from "@grucloud/bau-ui/context";
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
`,pr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:dr,createComponent:ur}],gridItem:Xt},mr=e=>{const t=H(e);return()=>t(pr)};function Kt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...g]=F(s);return a({...d,class:T("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...g)}}const Yt=e=>{const t=Kt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},gr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Kt(e);return()=>n(o({content:"10"},"☏"))},br=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,hr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:br,createComponent:gr}],gridItem:Yt},fr=e=>{const t=H(e);return()=>t(hr)};function qt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:r}=n.tags,s=X(e),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",items:h,...f},...x]=F(u);return a({...f,class:T(c,t==null?void 0:t.class,f==null?void 0:f.class)},h.map(({href:w,name:v})=>i((w?s:r)({href:w,color:p,variant:d,size:g,class:T(p,d,g)},v))))}}const Jt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=qt(e);return o=>n({...o,...t})},vr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=qt(e);return()=>n(a(o))},xr=`import breadcrumbs, {
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
`,wr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:xr,createComponent:vr}],gridItem:Jt},yr=e=>{const t=H(e);return()=>t(wr)},Qt=e=>{const t=X(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},Cr=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Sr=`import button from "@grucloud/bau-ui/button";
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
`,Er={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Sr,createComponent:Cr}],gridItem:Qt},kr=e=>{const t=H(e);return()=>t(Er)},Tr=()=>Q.map(e=>`
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
    ${Tr()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:u,...p},...d]=F(s);return a({...p,class:T("button-group",c,u,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const en=e=>{const t=["ONE","TWO","THREE"],n=X(e),o=ot(e);return a=>o({...a},t.map(i=>n(a,i)))},Ar=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=X(e),i=ot(e),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},Ir=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Mr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Ir,createComponent:Ar}],gridItem:en},Dr=e=>{const t=H(e);return()=>t(Mr)};function tn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>Q.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...g]=F(c);return a({...d,type:"date",class:T("calendar",r,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const nn=e=>{const t=tn(e);return n=>t({...n})},Nr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=tn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},$r=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Br={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:$r,createComponent:Nr}],gridItem:nn},Pr=e=>{const t=H(e);return()=>t(Br)};function _r(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,r=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:g,Previous:h,Next:f,...x}]=F(c);const w=()=>{r.val<=0?r.val=d.length-1:r.val--},v=()=>{r.val>=d.length-1?r.val=0:r.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*r.val}%);`},d.map(g));return a({...x,class:T("carousel",p,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:T("control","control-previous"),onclick:w},h()),a({class:T("control","control-next"),onclick:v},f()),S)}}const Or=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Rr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=X(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),r=({src:u})=>a({src:u}),s=_r(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(s({slides:Or,Slide:r,Previous:c,Next:l}))},Lr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,jr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Lr,createComponent:Rr}]},zr=e=>{const t=H(e);return()=>t(jr)},on=e=>{const t=$e(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=$e(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Gr=`import chip from "@grucloud/bau-ui/chip";
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
`,Ur={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Gr,createComponent:Hr}],gridItem:on},Fr=e=>{const t=H(e);return()=>t(Ur)};function an(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=F(s);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)})}}const rn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=an(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Wr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=an(e),r=t.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:s})))},Vr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Zr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Vr,createComponent:Wr}],gridItem:rn},Xr=e=>{const t=H(e);return()=>t(Zr)},Kr=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=et(e),i=X(e),r=()=>i("Header"),s=()=>o("Content");return()=>n(a({Header:r,Content:s}))},Yr=`import button from "@grucloud/bau-ui/button";
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
`,qr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Yr,createComponent:Kr}]},Jr=e=>{const t=H(e);return()=>t(qr)};function Qr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u,openState:p,...d},...g]=F(s);return a({class:T(i,t==null?void 0:t.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},g))}}const es=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Qr(e),r=X(e),s=St(e);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},ts=`import drawer from "@grucloud/bau-ui/drawer";
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
`,ns={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:ts,createComponent:es}]},os=e=>{const t=H(e);return()=>t(ns)},sn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Ke(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},as=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Ke(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},rs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,ss={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:rs,createComponent:as}],gridItem:e=>sn(e,{base:"/components/drillDownMenu",hashBased:!0})},is=e=>{const t=H(e);return()=>t(ss)};function cn(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
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
    `};return function(u,...p){const{variant:d="outline",color:g="neutral",size:h="md",Component:f,disabled:x,...w}=u;return a({class:T(c.base,x&&c.disabled,t==null?void 0:t.class,u.class)},r({class:T(d,g,h)},f({disabled:x}),s({type:"file",disabled:x,...w})),i({class:"filename-display"}))}}const ln=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),u=cn(e),p=g=>{const h=g.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:g})=>s({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return g=>u({Component:d,name:"file",accept:"text/*",onchange:p,...g})},cs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,u=n.state("No file selected"),p=cn(e),d=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:h})=>c({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>s(p({Component:g,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},ls=`import classNames from "@grucloud/bau-css/classNames";
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
`,us={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ls,createComponent:cs}],gridItem:ln},ds=e=>{const t=H(e);return()=>t(us)},un=e=>{const t=nt(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},ps=e=>{const{bau:t}=e,{section:n}=t.tags,o=nt(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},ms=`import input from "@grucloud/bau-ui/input";
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
`,gs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ms,createComponent:ps}],gridItem:un},bs=e=>{const t=H(e);return()=>t(gs)};function dn(e,t){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,r=()=>Q.map(l=>`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",running:h,...f}]=F(u);return i({...f,role:"progressbar",class:{deps:[h],renderProp:()=>x=>T("linearProgress",g,p,c,x&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const pn=e=>{const t=dn(e);return n=>t({...n,running:!0})},hs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=X(e),i=dn(e),r=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),o,i({running:r}))},fs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,vs={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:fs,createComponent:hs}],gridItem:pn},xs=e=>{const t=H(e);return()=>t(vs)},Me={sm:12,md:16,lg:24},ws=()=>Q.map(e=>`
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
      width: ${Me[u]};
      height: ${Me[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${ws()}
    `;return i({class:{deps:[g],renderProp:()=>x=>T("spinner",f,p,d,x==!1?"":"visibility",t==null?void 0:t.class,h.class)},version:"1.1",x:"0px",y:"0px",width:Me[u],height:Me[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},r({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function mn(e,t){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,r=a`
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
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:g,...h},...f]=F(l);const x=X(e),w=Re(e);return n.bind({deps:[g],render:()=>v=>x({...h,class:T("loadingButton",d,p,u,s,v&&"loading",t==null?void 0:t.class,h==null?void 0:h.class)},w({size:d,variant:p,color:u,visibility:v}),i({class:v&&"loading"},f))})}}const gn=e=>{const t=mn(e);return n=>t({...n,loading:!0},"Save")},ys=e=>{const{bau:t}=e,{section:n}=t.tags,o=mn(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Cs=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,Ss={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Cs,createComponent:ys}],gridItem:gn},Es=e=>{const t=H(e);return()=>t(Ss)},ks=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ts=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},ks.map(r))},As=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Is=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,r=we(e),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},As.map(s)))},Ms=`import list from "@grucloud/bau-ui/list";
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
`,Ds={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ms,createComponent:Is}],gridItem:Ts},Ns=e=>{const t=H(e);return()=>t(Ds)};function bn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,r=o`
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
    ${(()=>Q.map(s=>`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...g]=F(c);return a({class:T("modal",r,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const hn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s=X(e),c=bn(e),l=()=>o(Array(10).fill("").map((p,d)=>r(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(s({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),s({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(s({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},$s=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s="neutral",c=X(e),l=bn(e),u=()=>o(Array(10).fill("").map((d,g)=>r(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:s,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Bs=`import modal from "@grucloud/bau-ui/modal";
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
`,Ps={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Bs,createComponent:$s}],gridItem:hn},_s=e=>{const t=H(e);return()=>t(Ps)},Os=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,r=X(e),s=tt(e),c=()=>r({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=s({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},Rs=`import popover from "@grucloud/bau-ui/popover";
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
`,Ls={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Rs,createComponent:Os}]},js=e=>{const t=H(e);return()=>t(Ls)};function zs(e,t){const{bau:n,css:o,config:a}=e,{div:i,a:r,span:s,nav:c}=n.tags,l=o`
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
  `,u=({text:p})=>({name:d,label:g,href:h})=>r({href:`${a.base}${h}`},s({class:"sublabel"},p),i({class:`label ${p}`},g??d));return function(...d){let[{color:g,variant:h="plain",size:f="md",data:x={},...w}]=F(d);const{next:v,previous:S}=x;return c({"data-paginationnav":JSON.stringify(x),"aria-label":"pages navigation",...w,class:T("paginationNavigation",f,l,t==null?void 0:t.class,w==null?void 0:w.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(v==null?void 0:v.href)&&u({text:"Next"})(v))}}const Hs=e=>{const{bau:t}=e,{section:n}=t.tags,o=zs(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Gs=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Us={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Gs,createComponent:Hs}]},Fs=e=>{const t=H(e);return()=>t(Us)},Ws=e=>{const{bau:t}=e,{div:n}=t.tags,o=Pe(e);return a=>o({...a},n(`Paper ${a.size??""}`))},Vs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Pe(e);return()=>n(a({size:"md"},o("My content")))},Zs=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Xs={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Zs,createComponent:Vs}],variantColorTableDisable:!0,gridItem:Ws},Ks=e=>{const t=H(e);return()=>t(Xs)};function fn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>Q.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
  `).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p="md",...d}]=F(c);return a({...d,type:"radio",class:T("radio-button",p,l,u,r,t==null?void 0:t.class,d==null?void 0:d.class)})}}const vn=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=fn(e);return r=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),o("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Ys=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=fn(e),r=t.state("one"),s=({target:c})=>r.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:s})),n("Two",i({id:"two",name:"radio",value:r,oninput:s})),o("Choice: ",r))},qs=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Js={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:qs,createComponent:Ys}],gridItem:vn},Qs=e=>{const t=H(e);return()=>t(Js)},ei=()=>Q.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function xn(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=X(e),s=tt(e),c=we(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ei()}
  `,u=n.state(""),p=n.state(!1),d=n.state(0);return function(...h){let[{color:f="neutral",variant:x="outline",size:w="md",id:v,label:S,Option:I,options:N,getOptionLabel:P=({label:b})=>b,...A},...$]=F(h);const M=()=>{m.openDialog(),m.focus(),p.val=!0},R=()=>{m.closeDialog(),p.val=!1},Y=()=>{p.val=!1},ee=b=>{p.val?R():M()},z=({option:b,index:C})=>E=>{u.val=P(b),d.val=C,R()},W=b=>{switch(b.preventDefault(),b.key){case"Escape":R();break;case"ArrowDown":d.val<N.length-1?d.val++:d.val=0;break;case"ArrowUp":d.val<=0?d.val=N.length-1:d.val--;break;case"Enter":p.val?(u.val=P(N[d.val]),R()):M();break}},U=()=>c({tabindex:"0",class:T(f,x)},N.map((b,C)=>i({class:()=>T(d.val==C&&"active"),onclick:z({option:b,index:C})},I(b)))),y=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":S,onclick:ee,color:f,variant:x,size:w},()=>!u.val&&S,u),m=s({id:v,triggerEl:y,contentEl:U(),onClose:Y});return a({...A,class:T("select",f,w,l,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:W},y,m)}}const wn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=xn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},ti=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=xn(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},ni=`import select from "@grucloud/bau-ui/select";
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
`,oi={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:ni,createComponent:ti}],gridItem:wn},ai=e=>{const t=H(e);return()=>t(oi)};function Le(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    ${(()=>Q.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...g]=F(c);return a({...d,type:"range",class:T("slider",l,u,p,r,t==null?void 0:t.class,d.class)},...g)}}const yn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Le(e);return i=>a({...i,oninput:o})},ri=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,r=t.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=Le(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},si=`import slider from "@grucloud/bau-ui/slider";
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
`,ii=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Le(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},ci=`import slider from "@grucloud/bau-ui/slider";
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
`,li=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Le(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},ui=`import slider from "@grucloud/bau-ui/slider";
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
`,di={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:si,createComponent:ri},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ci,createComponent:ii},{title:"Vertical Mark",description:"A vertical slider with marks.",code:ui,createComponent:li}],gridItem:yn},pi=e=>{const t=H(e);return()=>t(di)},Cn=e=>{const t=Re(e);return n=>t({...n})},mi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Re(e);return()=>n(o({}))},gi=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,bi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:gi,createComponent:mi}],gridItem:Cn},hi=e=>{const t=H(e);return()=>t(bi)},fi=()=>Q.map(e=>`
`).join(`
`);function Sn(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:r,span:s}=n.tags,c=o`
    display: flex;
    flex-direction: column;
    & ul {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        flex-grow: 1;
        padding: 0.5rem;
        padding-bottom: 0rem;
        color: inherit;
        font-weight: var(--font-weight-semibold);
        transition: all var(--transition-slow) ease-in-out;
        background-color: var(--background-color);
        overflow: hidden;
        & .step-number {
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
          height: 1.5rem;
          width: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
        }
      }
      & .not-completed {
        & .step-number {
          background-color: var(--color-neutral);
        }
        & .step-label {
          color: var(--font-color-secondary);
        }
      }
      & .completed {
        & .step-number {
          background-color: var(--color-success);
        }
      }

      & .active {
        filter: brightness(var(--brightness-active));
      }
      & .disabled {
        cursor: not-allowed;
        font-style: italic;
        transform: none;
      }
    }
    ${fi()}
  `;return function(...u){let[{color:p,variant:d="plain",size:g,stepperDefs:h=[],activeStepIndex:f,...x},...w]=F(u);const v=n.state(h.map((P,A)=>({...P,index:A}))),S=n.derive(()=>v.val[f.val]),I=P=>{const{Header:A,disabled:$,name:M,index:R}=P;return r({class:()=>T(S.val.name==M&&"active",f.val<R&&"not-completed",f.val>R&&"completed",$&&"disabled")},s({class:"step-number"},R+1),s({class:"step-label"},()=>A(P)))};return a({class:T("stepper",d,g,p,c,t==null?void 0:t.class,x.class)},n.loop(v,i(),I),()=>S.val.Content?S.val.Content({}):"")}}const vi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,r=Sn(e),s=X(e),c=({name:h})=>h,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),p=()=>{u.val>0&&u.val--},d=()=>{l.length>u.val+1&&u.val++},g=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},s({onclick:p,variant:"outline",color:"primary"},"Previous"),s({onclick:d,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},r({stepperDefs:l,activeStepIndex:u}),g())},xi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, p } = bau.tags;
  const Stepper = stepper(context);
  const Button = button(context);

  const Header = ({ name }: any) => name;

  const stepperDefs: StepperPage[] = [
    {
      name: "Step 1",
      Header,
      Content: () => div(p("My stepper 1 Content")),
    },
    {
      name: "Step 2",
      Header,
      Content: () => div(p("My stepper 2 Content")),
    },
    {
      name: "Step 3",
      Header,
      Content: () => div(p("My stepper 3 Content")),
    },
  ];

  const activeStepIndex = bau.state(0);

  const onclickPrevious = () => {
    if (activeStepIndex.val > 0) {
      activeStepIndex.val--;
    }
  };

  const onclickNext = () => {
    if (stepperDefs.length > activeStepIndex.val + 1) {
      activeStepIndex.val++;
    }
  };

  const Buttons = () =>
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-around;
        \`,
      },
      Button(
        { onclick: onclickPrevious, variant: "outline", color: "primary" },
        "Previous"
      ),
      Button(
        { onclick: onclickNext, variant: "solid", color: "primary" },
        "Next"
      )
    );

  return () =>
    section(
      {
        class: css\`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      Stepper({ stepperDefs, activeStepIndex }),
      Buttons()
    );
};
`,wi=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i}=t.tags,r=X(e);return function({onclickProvider:c}){return o(i("Provider selection"),a({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},r({onclick:c("AWS"),variant:"outline",color:"primary"},"AWS"),r({onclick:c("Azure"),variant:"outline",color:"primary"},"Azure")))}},yi=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i}=t.tags,r=X(e);return function({onclickPrevious:c,onclickNext:l}){return o(i("AWS Configuration"),a({class:n`
            display: flex;
            gap: 1rem;
          `},r({onclick:c,variant:"outline",color:"primary"},"Previous"),r({onclick:l,variant:"outline",color:"primary"},"Next")))}},Ci=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i}=t.tags,r=X(e);return function({onclickPrevious:c,onclickNext:l}){return o(i("Azure Configuration"),a({class:n`
            display: flex;
            gap: 1rem;
          `},r({onclick:c,variant:"outline",color:"primary"},"Previous"),r({onclick:l,variant:"outline",color:"primary"},"Next")))}},Si=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,r=Sn(e),s=wi(e),c=yi(e),l=Ci(e),u=t.state(""),p=({name:v})=>v,d=v=>()=>{u.val=v,f.val++},h=[{name:"Provider Selection",Header:p,Content:()=>s({onclickProvider:d}),enter:async()=>{u.val=""}},{name:"Configuration",Header:()=>`Configuration ${u.val}`,Content:()=>{switch(u.val){case"AWS":return c({onclickPrevious:x,onclickNext:w});case"Azure":return l({onclickPrevious:x,onclickNext:w})}}},{name:"Scan",Header:p,Content:()=>a(i("My stepper 3 Content"))}],f=t.state(0),x=()=>{f.val>0&&f.val--},w=()=>{h.length>f.val+1&&f.val++};return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},r({stepperDefs:h,activeStepIndex:f}))},Ei=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

import stepStepProviderSelection from "./cloud-config/stepProviderSelection";
import configAws from "./cloud-config/configAws";
import configAzure from "./cloud-config/configAzure";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, p } = bau.tags;
  const Stepper = stepper(context);
  const StepProviderSelection = stepStepProviderSelection(context);
  const ConfigAws = configAws(context);
  const ConfigAzure = configAzure(context);

  const providerNameState = bau.state("");

  const Header = ({ name }: any) => name;

  const onclickProvider = (providerName: string) => () => {
    providerNameState.val = providerName;
    activeStepIndex.val++;
  };

  const ConfigPage = () => {
    switch (providerNameState.val) {
      case "AWS":
        return ConfigAws({ onclickPrevious, onclickNext });
      case "Azure":
        return ConfigAzure({ onclickPrevious, onclickNext });
      default:
        break;
    }
  };
  const stepperDefs: StepperPage[] = [
    {
      name: "Provider Selection",
      Header,
      Content: () => StepProviderSelection({ onclickProvider }),
      enter: async () => {
        providerNameState.val = "";
      },
    },
    {
      name: "Configuration",
      Header: () => \`Configuration \${providerNameState.val}\`,
      Content: ConfigPage,
    },
    {
      name: "Scan",
      Header,
      Content: () => div(p("My stepper 3 Content")),
    },
  ];

  const activeStepIndex = bau.state(0);

  const onclickPrevious = () => {
    if (activeStepIndex.val > 0) {
      activeStepIndex.val--;
    }
  };

  const onclickNext = () => {
    if (stepperDefs.length > activeStepIndex.val + 1) {
      activeStepIndex.val++;
    }
  };

  return () =>
    section(
      {
        class: css\`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      Stepper({ stepperDefs, activeStepIndex })
    );
};
`,ki={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:xi,createComponent:vi},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Ei,createComponent:Si}]},Ti=e=>{const t=H(e);return()=>t(ki)},Ai=()=>Q.map(e=>`
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
`);function En(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Ai()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=F(s);return a({...p,class:T("switch",i,c,l,u,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const kn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=En(e);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Ii=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,r=En(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},Mi=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Di={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Mi,createComponent:Ii}],gridItem:kn},Ni=e=>{const t=H(e);return()=>t(Di)},$i=()=>Q.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:r,li:s}=n.tags,c=n.state(a),l=n.state(a[0]),u=d=>c.val.find(g=>g.name==d),p=o`
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
    ${$i()}
  `;return function(...g){let[{color:h,variant:f="plain",size:x,...w},...v]=F(g);const S=N=>{const{Header:P,disabled:A,name:$}=N;return s({class:()=>T(l.val.name==$&&"active",A&&"disabled"),onclick:M=>M.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:$},bubbles:!0}))},P(N))},I=i({class:T("tabs",f,x,h,p,t==null?void 0:t.class,w.class)},n.loop(c,r(),S),()=>l.val.Content?l.val.Content({}):"");return I.addEventListener("tab.select",N=>{var $,M;const{tabName:P}=N.detail,A=u(P);A&&(($=l.val.exit)==null||$.call(),l.val=A,(M=A.enter)==null||M.call())},!1),I.addEventListener("tab.add",N=>{var A;const{tab:P}=N.detail;(A=P.enter)==null||A.call(),c.val.push(P)},!1),I.addEventListener("tab.remove",N=>{var A;const P=c.val.findIndex($=>$.name==N.detail.tabName);P>0&&((A=c.val[P].exit)==null||A.call(),c.val.splice(P,1))},!1),I}}const Tn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},Bi=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Pi=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,_i=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},Oi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,An=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Ri=e=>{const{css:t}=e,n=ye(e,{tabDefs:An(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Li=`import tabs from "@grucloud/bau-ui/tabs";
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
`,ji=e=>{const{css:t}=e,n=An(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},zi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Hi={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Pi,createComponent:Bi},{title:"Extended Tabs",description:"An extended tabs.",code:Oi,createComponent:_i},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Li,createComponent:Ri},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:zi,createComponent:ji}],gridItem:Tn},Gi=e=>{const t=H(e);return()=>t(Hi)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=F(c);return i({...l,class:T("table-container",r,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Ui=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags;function p(x,w,v,S,I){return{name:x,calories:w,fat:v,carbs:S,protein:I}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:x,calories:w})=>r(i(x),i({class:n`
            text-align: right;
          `},w)),h=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(s(u("Basic Table"),h(),l(d.map(g)))))},Fi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Wi=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Vi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:f})=>r(i(h),i({class:n`
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
    `});return()=>o(g(s(u("Table Dense"),d(),l(Wi.map(p)))))},Zi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Xi=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Ki=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:f})=>r(i(h),i({class:n`
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
    `});return()=>o(g(s(u("Table Zebra"),d(),l(Xi.map(p)))))},Yi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,qi={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Fi,createComponent:Ui},{title:"Dense",description:"A dense table.",code:Zi,createComponent:Vi},{title:"Zebra",description:"A zebra table.",code:Yi,createComponent:Ki}]},Ji=e=>{const t=H(e);return()=>t(qi)},Qi=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:r,article:s}=t.tags,c=zt(e),l=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>r({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},ec=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,tc={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:ec,createComponent:Qi}]},nc=e=>{const t=H(e);return()=>t(tc)};function In(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=ot(e),r=X(e),s=Re(e),c=o`
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
  `,l=({label:h,icon:f,...x})=>r({"aria-label":h,title:h,...x},f),u=({count:h,totalCount:f,page:x,rowsPerPage:w})=>a({class:"pages-numbers"},Number(x-1)*Number(w)+(h>0?1:0),"-",Math.min(x*w,f)," of ",f),p=({count:h,page:f,rowsPerPage:x})=>a({class:"pages-numbers"},(f-1)*x+(h>0?1:0),"-",f*x),d=h=>h<=1,g=(h,f,x)=>h>=Math.ceil(f/x);return function(...f){let[{count:x=0,totalCount:w=0,page:v=1,rowsPerPage:S=50,onPageChange:I,isLoading:N=!1,disableFirst:P=()=>d(v),disablePrevious:A=()=>d(v),disableNext:$=()=>g(v,w,S),disableLast:M=()=>g(v,w,S),...R},...Y]=F(f);const ee=Math.max(0,Math.ceil(w/S)),z=I({page:1}),W=I({page:v-1}),U=I({page:v+1}),y=I({page:ee}),m=[{label:"First",icon:"⟪",onclick:z,disabled:P()},{label:"Previous",icon:"⟨",onclick:W,disabled:A()},{label:"Next",icon:"⟩",onclick:U,disabled:$()},{label:"Last",icon:"⟫",onclick:y,disabled:M()}];return a({...R,class:T("table-pagination",c,N&&"disabled",t==null?void 0:t.class,R==null?void 0:R.class)},s({class:"spinner",visibility:N,size:"md"}),w>0?u({count:x,totalCount:w,page:v,maxPages:ee,rowsPerPage:S}):p({count:x,page:v,maxPages:ee,rowsPerPage:S}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const oc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),ac=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=t.tags,l=oc(45),u=({name:v,email:S})=>i(a(v),a(S)),p=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=In(e),g=Ce(e,{class:n`
      max-width: 650px;
    `}),h=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),x=t.derive(()=>h.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),w=({page:v})=>S=>{f.val.page=v};return()=>g(r(p(),()=>c(x.val.map(u))),()=>d({...f.val,onPageChange:w}))},rc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),g=t.derive(()=>p.val.length),h=t.state(1),f=t.state(10),x=t.derive(()=>p.val),w=M=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(M).toString()}`,v=({page:M})=>R=>{h.val=M,S(w({page:M,per_page:f.val}))};S(w({page:1,per_page:f.val}));async function S(M){try{u.val=!0;const R=await fetch(M,{});if(R.ok){const Y=await R.json();p.val=Y;return}throw R}catch(R){d.val=R.message}finally{u.val=!1}}const I=({name:M,description:R,stargazers_count:Y})=>i(a(M),a(R),a({class:n`
            text-align: right;
          `},Y)),N=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=In(e),A=Ce(e,{class:n`
      min-width: 650px;
    `}),$=({message:M})=>l(M);return()=>A(()=>P({rowsPerPage:f.val,page:h.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:v,disableNext:()=>!1}),r(N(),()=>d.val&&$({message:d.val}),()=>c(x.val.map(I))))},sc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:r,tr:s}=t.tags,c=ac(e),l=rc(e),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Se(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{color:l,variant:u,size:p="md",selected:d=!1,disabled:g,onChange:h,...f},...x]=F(c);return i({type:"button",...f,"aria-pressed":{deps:[d],renderProp:()=>w=>w},class:{deps:[d],renderProp:()=>w=>T("toggle",p,l,u,r,w&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:g},x)}}const Mn=e=>{const{bau:t}=e,n=Se(e);return console.log("grid item"),o=>{const a=t.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},ic=e=>{const{bau:t}=e,{section:n}=t.tags,o=Se(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},cc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,lc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:cc,createComponent:ic}],gridItem:Mn},uc=e=>{const t=H(e);return()=>t(lc)},dc=()=>Q.map(e=>`
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
    ${dc()}
  `;return function(...s){let[{color:c,variant:l="plain",size:u="md",exclusive:p=!1,onChange:d=()=>{},...g},...h]=F(s);const f=new Set,x=w=>{const{value:v}=w.target;p?(f.clear(),f.add(v)):f.has(v)?f.delete(v):f.add(v),d({event:w,values:[...f]})};return a({...g,class:T("toggle-group",u,c,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:x},...h)}}const Dn=e=>{const{bau:t}=e,n=at(e),o=Se(e);return a=>{const i=t.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return n({...a,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:l})=>()=>o({...a,value:l,selected:i.val.includes(l),"area-label":c},c)))}},pc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Se(e),r=at(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:p})=>()=>i({color:s,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},mc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,gc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Se(e),r=at(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,onChange:l},a.map(({label:u,value:p})=>()=>i({color:s,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},bc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,hc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:mc,createComponent:pc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:bc,createComponent:gc}],gridItem:Dn},fc=e=>{const t=H(e);return()=>t(hc)};function rt(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:g="md",...h},...f]=F(c);const x=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,g),role:"tooltip"},l)),w=A=>`move-to-${A}`,v=(A,$,M)=>{if(A()){const R=w($);x.classList.add(R),x.classList.add($),x.classList.remove(M)}},S=(A,$)=>{const M=w(A);x.classList.contains(M)&&(x.classList.remove(M),x.classList.add($),x.classList.remove(A))},I=A=>{const $=x.getBoundingClientRect();v(()=>$.x<0,"right","left"),v(()=>$.x+$.width>a.innerWidth,"left","right"),v(()=>$.y<0,"bottom","top"),v(()=>$.bottom>a.innerHeight,"top","bottom"),x.classList.add("visible")},N=A=>{x.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...h,class:T("tooltip",r,t==null?void 0:t.class,h==null?void 0:h.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",I),A.addEventListener("mouseout",N)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",I),A.removeEventListener("mouseout",N)}},...f,x)}}const Nn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,r=X(e),s=rt(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},vc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=X(e),r=rt(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},xc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,wc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:r}=t.tags,s=(...p)=>$e(e)({variant:"outline",color:"primary"},p),c=rt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>r({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},s("bottom start")),c({side:"bottom-centered",titleEl:l()},s("bottom centered")),c({side:"bottom-end",titleEl:l()},s("bottom end"))));return()=>u()},yc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Cc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:xc,createComponent:vc},{title:"Grid",description:"Various tooltip position",code:yc,createComponent:wc}],gridItem:Nn},Sc=e=>{const t=H(e);return()=>t(Cc)},$n=e=>{const t=Xe(e);return n=>t(n)},Ec=e=>{const{bau:t}=e,{section:n}=t.tags,o=Xe(e);return()=>n(o({}))},kc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Tc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:kc,createComponent:Ec}],gridItem:$n},Ac=e=>{const t=H(e);return()=>t(Tc)},Ic=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Bn(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:r,li:s,nav:c,div:l}=n.tags,u=Ic({css:o,createGlobalStyles:a}),p=et(e),d=({depth:g=1,maxDepth:h,color:f,variant:x,size:w})=>v=>{const{children:S,expanded:I}=v,N=n.state(!I),P=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:$=>{S&&(N.val=!N.val)}},i(v.data)),A=()=>r({class:T(f,w)},S.map(d({depth:g+1,maxDepth:h})));return s(p({Header:P,Content:S&&g<h&&A}))};return function({tree:h,maxDepth:f=1/0,size:x="md",variant:w="plain",color:v="neutral",...S}){return c({class:T(u.nav,x,w,v,t==null?void 0:t.class,S.class)},h.children&&r(h.children.map(d({maxDepth:f,color:v,variant:w,size:x}))))}}const Pn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Bn(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},Mc=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Bn(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},Dc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Nc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Dc,createComponent:Mc}],gridItem:Pn},$c=e=>{const t=H(e);return()=>t(Nc)},Bc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:r,ul:s,li:c}=t.tags,l=Ht(e),u=X(e),p=[{name:"Accordion",Item:Gt(e)},{name:"Alert",Item:Ft(e)},{name:"Autocomplete",Item:Xt(e)},{name:"Avatar",Item:Vt(e)},{name:"Badge",Item:Yt(e)},{name:"Breadcrumbs",Item:Jt(e)},{name:"Button",Item:Qt(e)},{name:"Button Group",Item:en(e)},{name:"Calendar",Item:nn(e)},{name:"Checkbox",Item:rn(e)},{name:"Chip",Item:on(e)},{name:"DrillDown Menu",Item:sn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:ln(e)},{name:"Input",Item:un(e)},{name:"Linear Progress",Item:pn(e)},{name:"Loading Button",Item:gn(e)},{name:"Modal",Item:hn(e)},{name:"Radio Button",Item:vn(e)},{name:"Select",Item:wn(e)},{name:"Slider",Item:yn(e)},{name:"Spinner",Item:Cn(e)},{name:"Switch",Item:kn(e)},{name:"Tabs",Item:Tn(e)},{name:"Theme Switch",Item:$n(e)},{name:"Toggle",Item:Mn(e)},{name:"Toggle Group",Item:Dn(e)},{name:"Tooltip",Item:Nn(e)},{name:"Tree View",Item:Pn(e)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},Pc=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:So(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:Aa(e)})},{path:"components",action:()=>({title:"Component",component:Bc(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ra(e)})},{path:"alert",action:()=>({title:"Alert",component:Va(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:qa(e)})},{path:"animate",action:()=>({title:"Animate",component:or(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:mr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:ir(e)})},{path:"badge",action:()=>({title:"Badge",component:fr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:yr(e)})},{path:"button",action:()=>({title:"Button",component:kr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Dr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Pr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:zr(e)})},{path:"chip",action:()=>({title:"Chip",component:Fr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Xr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Jr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:os(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:is(e)})},{path:"fileInput",action:()=>({title:"File Input",component:ds(e)})},{path:"input",action:()=>({title:"Input",component:bs(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:xs(e)})},{path:"list",action:()=>({title:"List",component:Ns(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Es(e)})},{path:"modal",action:()=>({title:"Modal",component:_s(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Fs(e)})},{path:"paper",action:()=>({title:"Paper",component:Ks(e)})},{path:"popover",action:()=>({title:"Popover",component:js(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Qs(e)})},{path:"select",action:()=>({title:"Select",component:ai(e)})},{path:"slider",action:()=>({title:"Slider",component:pi(e)})},{path:"spinner",action:()=>({title:"Spinner",component:hi(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Ti(e)})},{path:"switch",action:()=>({title:"Switch",component:Ni(e)})},{path:"table",action:()=>({title:"Table",component:Ji(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:nc(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:sc(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Gi(e)})},{path:"toggle",action:()=>({title:"Toggle",component:uc(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:fc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Sc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Ac(e)})},{path:"treeView",action:()=>({title:"Tree View",component:$c(e)})}]},{path:"pages",action:t=>({title:"Pages",component:To(e)})}],_c=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Oc=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,r=a.state(),s=t({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:g=t}=l.resolve({pathname:u});r.val=d({}),document.title=`${p}`}},Rc=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};to();const _n={title:"Bau",base:"/bau/bau-ui"},le=lo({config:_n}),{bau:Lc}=le;le.states={drawerOpen:Lc.state(!0)};Rc(le);Wn({routes:Pc({context:le}),onLocationChange:Oc({context:le,LayoutDefault:xo(le),config:_n}),notFoundRoute:_c(le)});
