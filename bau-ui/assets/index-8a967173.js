(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const In=(e,t)=>({...e,paths:[...t,e.path]}),ft=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=In(o,e);return n?[a,...ft({paths:[...e,o.path],routes:n})]:a}),$n=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Nn=({routes:e=[],notFoundRoute:t})=>{const n=ft({routes:e}).map(o=>({...o,regex:$n(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function _n({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Nn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ge=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Bn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],On=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],at=e=>`var(--color-${e})`,Pn=e=>`var(--color-${e}-lightest)`,Rn=()=>Ge.map(([e])=>`
.outline.${e} {
  border: 2px solid ${at(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Pn(e)};
}
.solid.${e} {
  background-color: ${at(e)};
}
`).join(`
`),Ln=()=>Ge.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),jn=e=>100-e*10,zn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${jn(t)}%);`).join(`
`),rt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Hn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Bn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...On.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Un({createGlobalStyles:e},{colorPalette:t=Ge}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>Hn([n,o])).join(`
`)}
      ${zn()}
      ${rt({})}
      ${Rn()}
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
      ${Ln()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${rt({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Gn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Fe=e=>Object.prototype.toString.call(e??0).slice(8,-1),Fn=e=>Fe(e)=="Object",st=e=>Fe(e)=="Function",ze=e=>["Object","Array"].includes(Fe(e)),it=Object.getPrototypeOf,He=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,Vn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const Z=e=>!me(e[0])&&Fn(e[0])?e:[{},...e];function Wn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=f=>n.createElement(f),l=(f,m,b)=>{let x=r;r=m;let C=f(b);return r=x,C},d=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},p=(f,m,b,x,C,P)=>{var $;if(s){i.add(f);return}for(let W of f.bindings){let{deps:N,element:D,renderInferred:F,render:J,renderItem:Q}=W;if(Q&&m)($=v(D,x,(...ae)=>g(Q(...ae)),b,C,P)[m])==null||$.call();else{let ae=F?F({element:D}):J({element:D,renderItem:Q})(...N.map(He));ae!==D&&D.replaceWith(W.element=g(ae))}}k(f),d()},u=(f,m,b=[])=>({get(x,C,P){var $;if(r==null||r.add(f),C==="_isProxy")return!0;if(!(($=x[C])!=null&&$._isProxy)&&!me(x[C])&&ze(x[C]))x[C]=new Proxy(x[C],u(f,m,[...b,C]));else if(Vn.includes(C)){let W=x[C];return(...N)=>{let D=W.apply(x,N);return p(f,C,D,N,m,b),D}}return Reflect.get(x,C,P)},set(x,C,P,$){let W=Reflect.set(x,C,P,$);return p(f,"setItem",W,{prop:C,value:P},m,[...b,C]),W}}),h=(f,m)=>new Proxy(m,u(f,m)),v=(f,m,b,x,C,P)=>{let $=()=>f.replaceChildren(...ke(x,b)),W=N=>f[N]&&f.removeChild(f[N]);return{assign:$,sort:$,reverse:$,setItem:()=>{var D;let N=P[0];(D=f.children[N])==null||D.replaceWith(b(C[N],N))},push:()=>f.append(...ke(m,(N,D)=>b(N,C.length+D))),unshift:()=>f.prepend(...ke(m,b)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{let[N,D,...F]=m;const{length:J}=f.children;for(let Q=N>=0?Math.min(N+D-1,J-1):J-1;Q>=(N>=0?N:J+N);Q--)f.children[Q].remove();if(F.length){let Q=F.forEach((ae,Pe)=>b(ae,N+Pe));f.children[N]?f.children[N].after(...Q):f.append(...Q)}}}},w=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=ze(f)?h(m,f):f,m.valProxy)},set val(m){let b=this,x=b.val;ze(m)?(b.valProxy=h(b,m),p(b,"assign",m)):m!==x&&(b.valProxy=m,p(b)),b.oldVal=x}}),g=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),y=(f,m)=>{let b=new Set;return m.val=l(f,b),b},E=f=>{let m=w(),b=y(f,m);m.computed=!0;for(let x of b)x.listeners.push({computed:f,deps:b,state:m});return m},k=f=>{for(let m of[...f.listeners])y(m.computed,m.state)},_=(f,...m)=>{if(m.length){let b=[];for(let x of m.flat(1/0))x!=null&&b.push(me(x)?j({deps:[x],render:()=>C=>C}):st(x)?ne({renderInferred:x}):g(x));f.append(...b)}},O={},B=(f,m)=>f&&(Object.getOwnPropertyDescriptor(f,m)??B(it(f),m)),I=(f,m,b)=>{var x;return O[f+","+m]??(O[f+","+m]=((x=B(b,m))==null?void 0:x.set)??0)},R=(f,m)=>new t.MutationObserver((b,x)=>{b.filter(C=>C.removedNodes).forEach(C=>[...C.removedNodes].find(P=>P===f&&(m({element:f}),x.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),A=(f,m)=>new t.MutationObserver((b,x)=>b.forEach(C=>m({record:C,element:f}))).observe(f,{childList:!0}),H=f=>new Proxy(function(b,...x){var W;let[C,...P]=Z(x),$=f?n.createElementNS(f,b):c(b);for(let[N,D]of Object.entries(C)){if(N.startsWith("bau"))continue;let F=I(b,N,it($))?J=>$[N]=J:J=>$.setAttribute(N,J);D==null||(me(D)?j({deps:[D],render:()=>()=>(F(D.val),$)}):st(D)&&(!N.startsWith("on")||D.isDerived)?ne({renderInferred:()=>(F(D({element:$})),$)}):D.renderProp?j({deps:D.deps,render:()=>()=>(F(D.renderProp({element:$})(...D.deps.map(He))),$)}):F(D))}return C.bauChildMutated&&A($,C.bauChildMutated),_($,...P),(W=C.bauCreated)==null||W.call(C,{element:$}),C.bauMounted&&t.requestAnimationFrame(()=>C.bauMounted({element:$})),C.bauUnmounted&&t.requestAnimationFrame(()=>R($,C.bauUnmounted)),$},{get:(m,b)=>m.bind(void 0,b)}),Y=(f,m,b)=>{f.element=g(b);for(let x of m)me(x)&&(a.add(x),x.bindings.push(f));return f.element},ne=({renderInferred:f,element:m})=>{let b=new Set,x=l(f,b,{element:m});return Y({renderInferred:f},b,x)},j=({deps:f,element:m,render:b,renderItem:x})=>Y({deps:f,render:b,renderItem:x},f,b({element:m,renderItem:x})(...f.map(He))),G=(f,m,b)=>j({deps:[f],render:({renderItem:x})=>C=>(m.append(...ke(C,x)),m),renderItem:b}),U=f=>{s=!0,f(),s=!1,i.forEach(p),i.clear()};return{tags:H(),tagsNS:H,state:w,bind:j,loop:G,derive:E,stateSet:a,batch:U}}const Xn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Zn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Kn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Yn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=Kn(a,i),r=Xn(s);return!t.getElementById(r)&&Zn(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function qn(e){const t=Wn(),n=Yn();return Un(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function De(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(u=>{if(!s()||u.getAttribute("cloned"))return;const h=u.cloneNode(!0);h.setAttribute("cloned",!0),h.style.top=0,h.style.left=0,h.style.width=u.getAttribute("width"),h.style.height=u.getAttribute("height"),h.style.position="absolute",h.style.animation=s(),d.target.appendChild(h),h.addEventListener("animationend",()=>h.parentNode.removeChild(h))}),[...d.addedNodes].forEach(u=>{if(u.getAttribute("cloned"))return;p.style.position="relative";const h=u.getBoundingClientRect();if(u.setAttribute("width",h.width+"px"),u.setAttribute("height",h.height+"px"),r()){u.style.animation=r();const v=()=>{u.removeEventListener("animationend",v),u.style.animation=""};u.addEventListener("animationend",v)}})},...c},l)}}function q(e,t){const{bau:n,css:o}=e,a={root:o`
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
        padding: 0.5rem;
      }
      &.lg {
        padding: 0.7rem 2rem;
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:d,href:p,...u},...h]=Z(s);return(p?n.tags.a:n.tags.button)({...u,class:T("button",a.root,c,l,r,p?a.a:a.button,d&&a.disabled,t==null?void 0:t.class,u.class),disabled:d,href:p,...!p&&{type:"button"}},h)}}const oe=["neutral","primary","success","danger","warning"],Jn=["plain","outline","solid"],Qn=["sm","md","lg"],eo="light",to=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Ve(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=d=>{a.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(eo);const l=o`
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
    ${to()}
  `;return function(...p){let[{color:u,variant:h="outline",size:v="md",...w},...g]=Z(p);return i({required:"required",title:"Switch Theme",...w,class:T("theme-switch",u,h,v,l,t==null?void 0:t.class,w.class),type:"checkbox",checked:r()=="dark",onclick:y=>{s(y.target.checked?"dark":"light")}},...g)}}function no(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:d,img:p,b:u,ul:h,li:v}=n.tags,{svg:w,path:g}=n.tagsNS("http://www.w3.org/2000/svg"),y=i.drawerOpen,E=q(e,{class:o`
      background: transparent;
    `}),k=Ve(e),_=()=>s(w({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},g({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),O=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},_()),d({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),B=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},k(),E({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${a.base}/github-mark-white.svg`,width:30,height:30})));return function(){return r({class:o`
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
        `},O(),B())}}function oo({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:d,h1:p}=t.tags,u=({links:w,title:g})=>o({class:n`
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
        `},p(g),r(w.map(({href:y,name:E})=>c(s({href:y},E))))),h=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],v=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 4rem;
          border-top: 1px solid var(--color-emphasis-200);
          color: var(--color-content-secondary);
        `},d({class:n`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `},u({title:"Bau UI",links:h}),u({title:"Bau Ecosystem",links:v})),d({class:n`
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
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d,...p},...u]=Z(r);return a({...p,class:T("list",i,c,l,d,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Te="0.3s",vt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(vt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},xt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=xt(e)(t.children[o]);if(a)return a}},ao=({keyframes:e})=>({hideToLeft:e`
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
   `});function We(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=j=>{var G;return((G=j.parentTree.data)==null?void 0:G.href)??j.parentTree.children[0].data.href},d=({variant:j,color:G,size:U,currentTree:f,data:m})=>k(I({variant:j,color:G,size:U,href:`${c}${l(f)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),I({variant:j,color:G,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:j,subTree:{data:{name:G,href:U},children:f=[]}})=>I({size:j,href:`${c}${U}`,"data-ischild":!f.length},G),u=({pathname:j,subTree:G})=>{var U;return j===((U=G==null?void 0:G.data)==null?void 0:U.href)},{renderHeader:h=d,renderMenuItem:v=p,isActive:w=u}=t,{li:g,nav:y,div:E,header:k,a:_}=n.tags,O=De(e),B=we(e),I=q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:R,hideToRight:A}=ao(e),H=o`
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
  `,Y=({variant:j,color:G,size:U,currentTree:f,pathnameState:m})=>{const{children:b,parentTree:x,data:C}=f;return E({class:T("drillDownMenu",j,G,U)},x&&h({variant:j,color:G,size:U,data:C,currentTree:f}),b&&B({class:T(j,G,U)},b.map(P=>g({class:()=>T(P.children&&"has-children",w({pathname:m.val,subTree:P})&&"active")},v({variant:j,color:G,size:U,subTree:P})))))},ne=({tree:j,pathname:G})=>{let U=vt({})(structuredClone(j)),f=xt(G)(U);return f||(console.error("drilldown no sub tree",G),f=U),f};return function(G){const{variant:U="plain",color:f="neutral",size:m="md",tree:b,...x}=G,C=n.state(a.location.pathname.replace(c,"")),P=n.derive(()=>ne({tree:b,pathname:C.val}));a.document.addEventListener("click",F=>{const{target:J}=F,Q=J.getAttribute("href");if(J.tagName==="A"&&Q&&!Q.startsWith("http")){let ae=Q.replace(c,"");r||(ae=ae.replace(J.hash,"")),C.val=ae}});let $=1;const W=F=>{const{dataset:J}=F.target;J.buttonback=="true"?$=-1:J.ischild=="false"?$=1:J.ischild=="true"&&($=0)},N=F=>{switch(F){case 1:return`${R} ${Te}`;case-1:return`${A} ${Te}`;default:return""}},D=F=>{switch(F){case 1:return`${A} ${Te} reverse`;case-1:return`${R} ${Te} reverse`;default:return""}};return y({class:T(H,t==null?void 0:t.class,x.class),onclick:W},O({animationHide:()=>N($),animationShow:()=>D($)},()=>Y({variant:U,color:f,size:m,currentTree:P.val,pathnameState:C})))}}const ro={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function wt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:d,a:p,span:u}=n.tags;let h=!1;const v=We(e);return function(){return r({bauMounted:({element:g})=>{s.innerWidth<=640&&(h=!0,i.drawerOpen.val=!1)},onclick:g=>{h&&!g.target.dataset.buttonback&&!g.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},v({tree:ro}))}}const so=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=De(e),r=no(e),c=wt(e),l=oo(e),d=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(u="")=>`${d} ease-in-out 0.5s ${u}`;return function({componentState:h}){return i({class:n`
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
        `},r(),c(),s({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>h.val&&h.val({})),l())}};function Ie(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c="md",variant:l="outline",color:d="neutral",onclick:p,...u},...h]=Z(r);return a({...u,onclick:p,class:T("chip",i,c,l,d,p&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}function io(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;q(e);const c=n`
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
  `;return function({name:d,text:p,tagLine:u}){return a({class:c},i(d),s(p),r(u))}}function co(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function lo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:d}=t.tags,p=({maxSize:u=151})=>({libName:h,size:v})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},h),s({class:n`
              display: flex;
              align-items: center;
              width: 100%;
              margin: 0 1rem;
            `},r({class:n`
                display: flex;
                color: var(--font-color-inverse);
                background-image: linear-gradient(
                  247deg,
                  var(--color-danger) 0%,
                  var(--color-success) ${v/u*100}%
                );
                justify-content: flex-end;
                width: ${v/u*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},v)));return function({data:h=[]}){return o({class:n`
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
          `},h.map(p({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",d({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function uo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=io(e),l=co(e),d=q(e);Ie(e);const p=lo(e),u=(...y)=>a({class:n`
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
          `},...y)),h=n``,v=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],w=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),d({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),u(d({variant:"solid",color:"primary"},"solid"),d({variant:"outline",color:"primary"},"outline"),d({variant:"plain",color:"primary"},"plain")),u(d({variant:"solid",color:"neutral",size:"sm"},"neutral"),d({variant:"solid",color:"primary",size:"sm"},"primary"),d({variant:"solid",color:"danger",size:"sm"},"danger"),d({variant:"solid",color:"warning",size:"sm"},"warning")),u(d({variant:"outline",color:"primary",size:"sm"},"small"),d({variant:"outline",color:"primary",size:"md"},"medium"),d({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],g=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},d({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),d({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),d({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:h},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:w}),p({data:v}),g())}}function po(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...u){return a("Login")}}const mo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=po(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function bo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),mo(e)()))}}function ho(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function yt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&yt(n)}),e}class ct{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ct(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const go="</span>",lt=e=>!!e.scope,fo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class vo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ct(t)}openNode(t){if(!lt(t))return;const n=fo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){lt(t)&&(this.buffer+=go)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const ut=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Xe{constructor(){this.rootNode=ut(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=ut({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Xe._collapse(n)}))}}class xo extends Xe{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new vo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function Et(e){return de("(?=",e,")")}function wo(e){return de("(?:",e,")*")}function yo(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function Co(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ze(...e){return"("+(Co(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function St(e){return new RegExp(e.toString()+"|").exec("").length-1}function Eo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const So=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ke(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),s="";for(;i.length>0;){const r=So.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const ko=/\b\B/,kt="[a-zA-Z]\\w*",Ye="[a-zA-Z_]\\w*",Tt="\\b\\d+(\\.\\d+)?",At="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Mt="\\b(0b[01]+)",To="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ao=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},Mo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Do={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Io={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},$e=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Ze("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},$o=$e("//","$"),No=$e("/\\*","\\*/"),_o=$e("#","$"),Bo={scope:"number",begin:Tt,relevance:0},Oo={scope:"number",begin:At,relevance:0},Po={scope:"number",begin:Mt,relevance:0},Ro={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Lo={scope:"title",begin:kt,relevance:0},jo={scope:"title",begin:Ye,relevance:0},zo={begin:"\\.\\s*"+Ye,relevance:0},Ho=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ae=Object.freeze({__proto__:null,MATCH_NOTHING_RE:ko,IDENT_RE:kt,UNDERSCORE_IDENT_RE:Ye,NUMBER_RE:Tt,C_NUMBER_RE:At,BINARY_NUMBER_RE:Mt,RE_STARTERS_RE:To,SHEBANG:Ao,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:Mo,QUOTE_STRING_MODE:Do,PHRASAL_WORDS_MODE:Io,COMMENT:$e,C_LINE_COMMENT_MODE:$o,C_BLOCK_COMMENT_MODE:No,HASH_COMMENT_MODE:_o,NUMBER_MODE:Bo,C_NUMBER_MODE:Oo,BINARY_NUMBER_MODE:Po,REGEXP_MODE:Ro,TITLE_MODE:Lo,UNDERSCORE_TITLE_MODE:jo,METHOD_GUARD:zo,END_SAME_AS_BEGIN:Ho});function Uo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Go(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Fo(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Uo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Vo(e,t){Array.isArray(e.illegal)&&(e.illegal=Ze(...e.illegal))}function Wo(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Xo(e,t){e.relevance===void 0&&(e.relevance=1)}const Zo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Et(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ko=["of","and","for","in","not","or","if","then","parent","list","value"],Yo="keyword";function Dt(e,t,n=Yo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Dt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,qo(c[0],c[1])]})}}function qo(e,t){return t?Number(t):Jo(e)?0:1}function Jo(e){return Ko.includes(e.toLowerCase())}const dt={},ue=e=>{console.error(e)},pt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{dt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),dt[`${e}/${t}`]=!0)},Me=new Error;function It(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=St(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function Qo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Me;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Me;It(e,e.begin,{key:"beginScope"}),e.begin=Ke(e.begin,{joinWith:""})}}function ea(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Me;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Me;It(e,e.end,{key:"endScope"}),e.end=Ke(e.end,{joinWith:""})}}function ta(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function na(e){ta(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Qo(e),ea(e)}function oa(e){function t(s,r){return new RegExp(ve(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=St(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(Ke(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,u)=>u>0&&p!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[Go,Wo,na,Zo].forEach(d=>d(s,r)),e.compilerExtensions.forEach(d=>d(s,r)),s.__beforeBegin=null,[Fo,Vo,Xo].forEach(d=>d(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Dt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(d){return aa(d==="self"?s:d)})),s.contains.forEach(function(d){i(d,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function $t(e){return e?e.endsWithParent||$t(e.starts):!1}function aa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:$t(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var ra="11.8.0";class sa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ue=Ct,mt=ie,bt=Symbol("nomatch"),ia=7,Nt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:xo};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const x=r.languageDetectRe.exec(b);if(x){const C=A(x[1]);return C||(pt(i.replace("{}",x[1])),pt("Falling back to no-highlight mode for this block.",m)),C?x[1]:"no-highlight"}return b.split(/\s+/).find(C=>c(C)||A(C))}function d(m,b,x){let C="",P="";typeof b=="object"?(C=m,x=b.ignoreIllegals,P=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=m,C=b),x===void 0&&(x=!0);const $={code:C,language:P};U("before:highlight",$);const W=$.result?$.result:p($.language,$.code,x);return W.code=$.code,U("after:highlight",W),W}function p(m,b,x,C){const P=Object.create(null);function $(S,M){return S.keywords[M]}function W(){if(!L.keywords){ee.addText(K);return}let S=0;L.keywordPatternRe.lastIndex=0;let M=L.keywordPatternRe.exec(K),z="";for(;M;){z+=K.substring(S,M.index);const X=re.case_insensitive?M[0].toLowerCase():M[0],te=$(L,X);if(te){const[se,Mn]=te;if(ee.addText(z),z="",P[X]=(P[X]||0)+1,P[X]<=ia&&(Se+=Mn),se.startsWith("_"))z+=M[0];else{const Dn=re.classNameAliases[se]||se;F(M[0],Dn)}}else z+=M[0];S=L.keywordPatternRe.lastIndex,M=L.keywordPatternRe.exec(K)}z+=K.substring(S),ee.addText(z)}function N(){if(K==="")return;let S=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){ee.addText(K);return}S=p(L.subLanguage,K,!0,ot[L.subLanguage]),ot[L.subLanguage]=S._top}else S=h(K,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Se+=S.relevance),ee.__addSublanguage(S._emitter,S.language)}function D(){L.subLanguage!=null?N():W(),K=""}function F(S,M){S!==""&&(ee.startScope(M),ee.addText(S),ee.endScope())}function J(S,M){let z=1;const X=M.length-1;for(;z<=X;){if(!S._emit[z]){z++;continue}const te=re.classNameAliases[S[z]]||S[z],se=M[z];te?F(se,te):(K=se,W(),K=""),z++}}function Q(S,M){return S.scope&&typeof S.scope=="string"&&ee.openNode(re.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(F(K,re.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),K=""):S.beginScope._multi&&(J(S.beginScope,M),K="")),L=Object.create(S,{parent:{value:L}}),L}function ae(S,M,z){let X=Eo(S.endRe,z);if(X){if(S["on:end"]){const te=new ct(S);S["on:end"](M,te),te.isMatchIgnored&&(X=!1)}if(X){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return ae(S.parent,M,z)}function Pe(S){return L.matcher.regexIndex===0?(K+=S[0],1):(je=!0,0)}function Sn(S){const M=S[0],z=S.rule,X=new ct(z),te=[z.__beforeBegin,z["on:begin"]];for(const se of te)if(se&&(se(S,X),X.isMatchIgnored))return Pe(M);return z.skip?K+=M:(z.excludeBegin&&(K+=M),D(),!z.returnBegin&&!z.excludeBegin&&(K=M)),Q(z,S),z.returnBegin?0:M.length}function kn(S){const M=S[0],z=b.substring(S.index),X=ae(L,S,z);if(!X)return bt;const te=L;L.endScope&&L.endScope._wrap?(D(),F(M,L.endScope._wrap)):L.endScope&&L.endScope._multi?(D(),J(L.endScope,S)):te.skip?K+=M:(te.returnEnd||te.excludeEnd||(K+=M),D(),te.excludeEnd&&(K=M));do L.scope&&ee.closeNode(),!L.skip&&!L.subLanguage&&(Se+=L.relevance),L=L.parent;while(L!==X.parent);return X.starts&&Q(X.starts,S),te.returnEnd?0:M.length}function Tn(){const S=[];for(let M=L;M!==re;M=M.parent)M.scope&&S.unshift(M.scope);S.forEach(M=>ee.openNode(M))}let Ee={};function nt(S,M){const z=M&&M[0];if(K+=S,z==null)return D(),0;if(Ee.type==="begin"&&M.type==="end"&&Ee.index===M.index&&z===""){if(K+=b.slice(M.index,M.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=Ee.rule,X}return 1}if(Ee=M,M.type==="begin")return Sn(M);if(M.type==="illegal"&&!x){const X=new Error('Illegal lexeme "'+z+'" for mode "'+(L.scope||"<unnamed>")+'"');throw X.mode=L,X}else if(M.type==="end"){const X=kn(M);if(X!==bt)return X}if(M.type==="illegal"&&z==="")return 1;if(Le>1e5&&Le>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return K+=z,z.length}const re=A(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const An=oa(re);let Re="",L=C||An;const ot={},ee=new r.__emitter(r);Tn();let K="",Se=0,ce=0,Le=0,je=!1;try{if(re.__emitTokens)re.__emitTokens(b,ee);else{for(L.matcher.considerAll();;){Le++,je?je=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const S=L.matcher.exec(b);if(!S)break;const M=b.substring(ce,S.index),z=nt(M,S);ce=S.index+z}nt(b.substring(ce))}return ee.finalize(),Re=ee.toHTML(),{language:m,value:Re,relevance:Se,illegal:!1,_emitter:ee,_top:L}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:m,value:Ue(b),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:ce,context:b.slice(ce-100,ce+100),mode:S.mode,resultSoFar:Re},_emitter:ee};if(a)return{language:m,value:Ue(b),illegal:!1,relevance:0,errorRaised:S,_emitter:ee,_top:L};throw S}}function u(m){const b={value:Ue(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function h(m,b){b=b||r.languages||Object.keys(t);const x=u(m),C=b.filter(A).filter(Y).map(D=>p(D,m,!1));C.unshift(x);const P=C.sort((D,F)=>{if(D.relevance!==F.relevance)return F.relevance-D.relevance;if(D.language&&F.language){if(A(D.language).supersetOf===F.language)return 1;if(A(F.language).supersetOf===D.language)return-1}return 0}),[$,W]=P,N=$;return N.secondBest=W,N}function v(m,b,x){const C=b&&n[b]||x;m.classList.add("hljs"),m.classList.add(`language-${C}`)}function w(m){let b=null;const x=l(m);if(c(x))return;if(U("before:highlightElement",{el:m,language:x}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new sa("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const C=b.textContent,P=x?d(C,{language:x,ignoreIllegals:!0}):h(C);m.innerHTML=P.value,v(m,x,P.language),m.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(m.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),U("after:highlightElement",{el:m,result:P,text:C})}function g(m){r=mt(r,m)}const y=()=>{_(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){_(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function _(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(r.cssSelector).forEach(w)}function O(){k&&_()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",O,!1);function B(m,b){let x=null;try{x=b(e)}catch(C){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(C);else throw C;x=s}x.name||(x.name=m),t[m]=x,x.rawDefinition=b.bind(null,e),x.aliases&&H(x.aliases,{languageName:m})}function I(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function R(){return Object.keys(t)}function A(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=b})}function Y(m){const b=A(m);return b&&!b.disableAutodetect}function ne(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function j(m){ne(m),o.push(m)}function G(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function U(m,b){const x=m;o.forEach(function(C){C[x]&&C[x](b)})}function f(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),w(m)}Object.assign(e,{highlight:d,highlightAuto:h,highlightAll:_,highlightElement:w,highlightBlock:f,configure:g,initHighlighting:y,initHighlightingOnLoad:E,registerLanguage:B,unregisterLanguage:I,listLanguages:R,getLanguage:A,registerAliases:H,autoDetection:Y,inherit:mt,addPlugin:j,removePlugin:G}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=ra,e.regex={concat:de,lookahead:Et,either:Ze,optional:yo,anyNumberOfTimes:wo};for(const m in Ae)typeof Ae[m]=="object"&&yt(Ae[m]);return Object.assign(e,Ae),e},be=Nt({});be.newInstance=()=>Nt({});var ca=be;be.HighlightJS=be;be.default=be;const fe=ho(ca),ht="[A-Za-z$_][0-9A-Za-z$_]*",la=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ua=["true","false","null","undefined","NaN","Infinity"],_t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Bt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ot=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],da=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],pa=[].concat(Ot,_t,Bt);function Pt(e){const t=e.regex,n=(b,{after:x})=>{const C="</"+b[0].slice(1);return b.input.indexOf(C,x)!==-1},o=ht,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const C=b[0].length+b.index,P=b.input[C];if(P==="<"||P===","){x.ignoreMatch();return}P===">"&&(n(b,{after:C})||x.ignoreMatch());let $;const W=b.input.substring(C);if($=W.match(/^\s*=/)){x.ignoreMatch();return}if(($=W.match(/^\s+extends\s+/))&&$.index===0){x.ignoreMatch();return}}},r={$pattern:ht,keyword:la,literal:ua,built_in:pa,"variable.language":da},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},h={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},v={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},w={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,w,g,{match:/\$\d+/},p];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(k)});const _=[].concat(E,u.contains),O=_.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(_)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:O},I={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[..._t,...Bt]}},A={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},Y={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ne(b){return t.concat("(?!",b.join("|"),")")}const j={match:t.concat(/\b/,ne([...Ot,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},G={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},f="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(f)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:O,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),A,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,w,g,E,{match:/\$\d+/},p,R,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:f,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:O}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},G,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},j,Y,I,U,{match:/\$[(.]/}]}}function ma(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const ba=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",Pt),fe.registerLanguage("sh",ma),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=fe.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function ha(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,d=ba(e);return function(){return o({class:n`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},a("Getting Started"),i("Grab the source code template for Javascript or Typescript"),d({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),i("Install the dependencies with the package manager of your choice:"),d({text:`cd my-bau-project
npm install`}),i("This template project is built with Vite. To start a development server:"),d({text:"npm run dev"}),i("The application starting point is at ",s("src/main.ts")),i("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),d({text:'import button from "@grucloud/bau-ui/button";'}),i("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),d({text:"const Button = button(context);"}),i("Last step is to place the button into the tree of component:"),d({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ne(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...p},...u]=Z(r);return a({...p,class:T("paper",d,i,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Rt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:u}){return o({class:n`
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
        `},a(c(s(l(u??""),oe.map(h=>l(h)))),i(Jn.map(h=>s(l(h),oe.map((v,w)=>r(p({color:v,variant:h},{index:w}))))))))}},ga=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Qn.map((s,r)=>i({color:"success",variant:"outline",size:s},{index:r})))}},V=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:i,p:s,h2:r,h3:c,pre:l,code:d}=t.tags;fe.registerLanguage("javascript",Pt);const p=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),u=Rt(e),h=ga(e),v=({text:w})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:g})=>{g.innerHTML=fe.highlight(w,{language:"js"}).value}}));return function(g){return o({class:n``},i(g.title),s(g.description),g.gridItem&&[r("Variant/Color"),!g.variantColorTableDisable&&g.gridItem&&p(u({Item:g.gridItem(e)})),r("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),g.gridItem&&p(h({Item:g.gridItem(e)}))],r("Usage"),c("Import"),v({text:g.importStatement}),r("Examples"),g.examples.map(y=>a(i(y.title),s(y.description),p(y.createComponent(e)()),v({text:y.code}))))}},fa=()=>oe.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=n.state(""),d=h=>v=>{l.val==h?l.val="":l.val=h},p=({element:h,open:v})=>{const w=()=>{h.removeEventListener("transitionend",w)};function g(E){E.addEventListener("transitionend",w),window.requestAnimationFrame(()=>{E.style.height="0px"})}function y(E){E.addEventListener("transitionend",w),E.style.height=E.scrollHeight+"px"}h.scrollHeight!=0&&(v?y(h):g(h))},u=o`
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
            background-color: inherit;
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
    ${fa()}
  `;return function(...v){let[{color:w,variant:g="outline",size:y="md",data:E=[],...k},..._]=Z(v);const O=B=>{const{Header:I,Content:R,name:A}=B;return s({class:T(w,g,y),onclick:d(A)},r({class:()=>T(l.val==A&&"active")},c({type:"button","aria-controls":`bau-${A}`,"aria-expanded":({element:H})=>l.val==A},I(B))),a({class:"content",role:"region",id:`bau-${A}`,"data-state":({element:H})=>{const Y=l.val==A;return p({element:H,open:Y}),Y}},R(B)))};return a({class:T("accordion",u,t==null?void 0:t.class,k.class)},i(E.map(O)))}}const Lt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return s=>i({...s,data:a})},va=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return()=>i({data:a,color:"neutral",variant:"outline"})},xa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,jt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},wa=e=>{const{css:t}=e,n=jt(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},ya=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ca=e=>{const{css:t}=e,n=jt(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ea=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Sa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:xa,createComponent:va},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:ya,createComponent:wa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ea,createComponent:Ca}],gridItem:Lt},ka=e=>{const t=V(e);return()=>t(Sa)},Ta={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Aa=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Ma=()=>oe.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Be(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:s}=n.tags;Aa({css:o,createGlobalStyles:a});const r=o`
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
    ${Ma()}
  `,c=q(e),l=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(p,...u){const{variant:h="outline",color:v="neutral",size:w="md",onRemove:g,...y}=p;return i({...y,class:T(`alert-${h}`,h,v,w,r,t==null?void 0:t.class,p.class,"alert"),role:"alert"},s({class:"icon"},Ta[v]),i({class:"content"},...u),g&&l({onclick:g}))}}const zt=e=>{const t=Be(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Da=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Be(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ia=`import alert from "@grucloud/bau-ui/alert";
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
`,$a=e=>{const{css:t}=e,n=Be(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Na=`import alert from "@grucloud/bau-ui/alert";
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
`,_a={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ia,createComponent:Da},{title:"Custom Alert ",description:"A custom alert.",code:Na,createComponent:$a}],gridItem:zt},Ba=e=>{const t=V(e);return()=>t(_a)},Oa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
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
      animation: ${l.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${l.removing} var(--transition-slow) ease-out;
    `},p=({id:u,status:h})=>{const v=c.val.findIndex(w=>w.id===u);v!=-1&&(c.val[v].status=h)};return function(h={},...v){const w=({id:E})=>{p({id:E,status:"removing"});const k=c.val.findIndex(_=>_.id===E);k!=-1&&c.val.splice(k,1)},g=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=i&&w({id:c.val[0].id}),c.val.push(k),setTimeout(()=>w(k),s)},y=E=>r({class:d.item,onclick:()=>w(E)},E.Component());return document.addEventListener("alert.add",E=>g(E.detail)),document.addEventListener("alert.remove",E=>w(E.detail)),r({class:T(d.stack,t==null?void 0:t.class,h.class)},n.loop(c,r(),y))}},Pa=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Oa(e,{deleteAfterDuration:2e4}),i=q(e),s=Be(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Ra=`import { Context } from "@grucloud/bau-ui/context";
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
`,La={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ra,createComponent:Pa}]},ja=e=>{const t=V(e);return()=>t(La)},za=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=De(e),s=q(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},Ha=`import animate from "@grucloud/bau-ui/animate";
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
`,Ua=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=De(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),d=({target:u})=>l.val=u.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:d})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:d})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Ga=`import animate from "@grucloud/bau-ui/animate";
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
`,Fa={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Ha,createComponent:za},{title:"Component hide and show",description:"Hide and show a component",code:Ga,createComponent:Ua}]},Va=e=>{const t=V(e);return()=>t(Fa)};function Ht(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},d=o`
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
  `;return function(...u){let[{color:h,variant:v="outline",size:w="md",width:g=30,height:y=30,...E},...k]=Z(u);return a({class:T(d,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:g,height:y,onload:c,onerror:l,class:T(h,v,w,d,t==null?void 0:t.class,E.class),...E}))}}const Ut=e=>{const{css:t}=e,n=Ht(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Wa=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Ht(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Xa=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Za={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Xa,createComponent:Wa}],gridItem:Ut},Ka=e=>{const t=V(e);return()=>t(Za)};function qe(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ne(e,{class:o`
      &.paper {
        padding: 0;
      }
    `}),r=o`
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
  `;return function(...l){let[{contentEl:d,triggerEl:p,onClose:u,...h},...v]=Z(l);const w=E=>{y.style.opacity=1,y.showModal();const k=p.getBoundingClientRect(),_=y.getBoundingClientRect();k.x<a.innerWidth/2?y.style.left=k.left+"px":y.style.left=k.right-_.width+"px",k.y<a.innerHeight/2?y.style.top=k.top+k.height+"px":y.style.top=k.top-_.height+"px"},g=E=>{const k=()=>{y.close(),y.removeEventListener("transitionend",k)};y.addEventListener("transitionend",k),y.style.opacity=0},y=i({role:"presentation",class:T("popover",r,t==null?void 0:t.class,h==null?void 0:h.class),onclick:E=>E.target===y&&(g(),u==null?void 0:u.call())},s(d));return y.closeDialog=g,y.openDialog=w,y}}const Ya=()=>oe.map(e=>`
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
`);function Je(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Ya()}
  `;return function(r){const{size:c="md",variant:l="outline",color:d="neutral",name:p,id:u,disabled:h,...v}=r;return a({...v,class:T("input",c,d,l,i,t==null?void 0:t.class,v.class)})}}const qa=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Gt(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=qe(e),r=q(e),c=Je(e),l=we(e),d=o`
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

    ${qa()}
  `,p=n.state(""),u=n.state(""),h=n.state(!1),v=n.state(0),w=()=>{h.val=!1};return function(...y){let[{variant:E="outline",color:k,size:_="md",id:O,label:B,placeholder:I,Option:R,options:A,getOptionLabel:H=({label:N})=>N,...Y},...ne]=Z(y);const j=n.state(A),G=()=>{W.openDialog(),h.val=!0,u.val="",j.val=A},U=()=>{W.closeDialog(),h.val=!1,u.val=""},f=N=>{const{value:D}=N.target;u.val=D,D?j.val=A.filter(F=>H(F).match(new RegExp(`${D}`,"i"))):j.val=A},m=N=>{h.val?U():G()},b=({option:N,index:D})=>F=>{p.val=H(N),v.val=D,U()},x=N=>{switch(console.log("onkeydown",N.key,v.val),N.key){case"Escape":U();break;case"ArrowDown":v.val<j.val.length-1?v.val++:v.val=0;break;case"ArrowUp":v.val<=0?v.val=j.val.length-1:v.val--;break;case"Enter":p.val=H(j.val[v.val]),u.val="",U();break}},C=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,"aria-label":B,onclick:m,variant:E,color:k,size:_},()=>!p.val&&B,p),P=c({id:O,value:u,placeholder:I,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:f,onkeydown:x,variant:E,color:k,size:_}),W=s({id:O,triggerEl:C,contentEl:(()=>a({class:T(E,k,_,"content")},P,()=>l({class:T(E,k,_)},j.val.map((N,D)=>i({class:()=>T(v.val==D&&"active"),onclick:b({option:N,index:D})},R(N))))))(),onClose:w});return a({...Y,class:T("autocomplete",d,t==null?void 0:t.class,Y==null?void 0:Y.class)},C,W)}}const Ft=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Gt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},Ja=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Gt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Qa=`import { Context } from "@grucloud/bau-ui/context";
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
`,er={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:Qa,createComponent:Ja}],gridItem:Ft},tr=e=>{const t=V(e);return()=>t(er)};function Vt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",content:p,...u},...h]=Z(r);return a({...u,class:T("badge",i,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:T(c,l,d)},p),...h)}}const Wt=e=>{const t=Vt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},nr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Vt(e);return()=>n(o({content:"10"},"☏"))},or=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,ar={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:or,createComponent:nr}],gridItem:Wt},rr=e=>{const t=V(e);return()=>t(ar)};function Xt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:s}=n.tags,r=q(e),c=o`
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
  `;return function(...d){let[{color:p="neutral",variant:u="plain",size:h="md",items:v,...w},...g]=Z(d);return a({...w,class:T(c,t==null?void 0:t.class,w==null?void 0:w.class)},v.map(({href:y,name:E})=>i((y?r:s)({href:y,color:p,variant:u,size:h,class:T(p,u,h)},E))))}}const Zt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Xt(e);return o=>n({...o,...t})},sr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Xt(e);return()=>n(a(o))},ir=`import breadcrumbs, {
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
`,cr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:ir,createComponent:sr}],gridItem:Zt},lr=e=>{const t=V(e);return()=>t(cr)},Kt=e=>{const t=q(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},ur=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},dr=`import button from "@grucloud/bau-ui/button";
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
`,pr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:dr,createComponent:ur}],gridItem:Kt},mr=e=>{const t=V(e);return()=>t(pr)},br=()=>oe.map(e=>`
&.button-group.${e} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function Qe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${br()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:d,...p},...u]=Z(r);return a({...p,class:T("button-group",c,d,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Yt=e=>{const t=["ONE","TWO","THREE"],n=q(e),o=Qe(e);return a=>o({...a},t.map(i=>n(a,i)))},hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=q(e),i=Qe(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},gr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,fr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:gr,createComponent:hr}],gridItem:Yt},vr=e=>{const t=V(e);return()=>t(fr)};function qt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>oe.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:p,...u},...h]=Z(c);return a({...u,type:"date",class:T("calendar",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Jt=e=>{const t=qt(e);return n=>t({...n})},xr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=qt(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},wr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,yr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:wr,createComponent:xr}],gridItem:Jt},Cr=e=>{const t=V(e);return()=>t(yr)};function Er(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{color:l,variant:d="plain",size:p="md",slides:u,Slide:h,Previous:v,Next:w,...g}]=Z(c);const y=()=>{s.val<=0?s.val=u.length-1:s.val--},E=()=>{s.val>=u.length-1?s.val=0:s.val++},k=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},u.map(h));return a({...g,class:T("carousel",p,i,t==null?void 0:t.class,g==null?void 0:g.class)},a({class:T("control","control-previous"),onclick:y},v()),a({class:T("control","control-next"),onclick:E},w()),k)}}const Sr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],kr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=q(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:d})=>a({src:d}),r=Er(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Sr,Slide:s,Previous:c,Next:l}))},Tr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Ar={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Tr,createComponent:kr}]},Mr=e=>{const t=V(e);return()=>t(Ar)},Qt=e=>{const t=Ie(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Dr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Ir=`import chip from "@grucloud/bau-ui/chip";
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
`,$r={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Ir,createComponent:Dr}],gridItem:Qt},Nr=e=>{const t=V(e);return()=>t($r)};function en(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...p},...u]=Z(r);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,d,t==null?void 0:t.class,p==null?void 0:p.class)})}}const tn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=en(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},_r=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=en(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Br=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Or={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Br,createComponent:_r}],gridItem:tn},Pr=e=>{const t=V(e);return()=>t(Or)};function nn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    border: 1px solid red;
  `;return function(...r){let[{color:c,variant:l="plain",size:d="md",...p},...u]=Z(r);return a({...p,class:T("collapsible",d,i,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Rr=e=>{const t=nn(e);return n=>t({...n},"")},Lr=e=>{const{bau:t}=e,{section:n}=t.tags,o=nn(e);return()=>n(o({},"Collapsible"))},jr=`import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Collapsible = collapsible(context);

  return () => section(Collapsible({}, "Collapsible"));
};
`,zr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible displaying a few random pictures.",code:jr,createComponent:Lr}],gridItem:Rr},Hr=e=>{const t=V(e);return()=>t(zr)};function Ur(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d,openState:p,...u},...h]=Z(r);return a({class:T(i,t==null?void 0:t.class,u.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},h))}}const Gr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Ur(e),s=q(e),r=wt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Fr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Vr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Fr,createComponent:Gr}]},Wr=e=>{const t=V(e);return()=>t(Vr)},on=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=We(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Xr=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=We(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Zr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Kr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Zr,createComponent:Xr}],gridItem:e=>on(e,{base:"/components/drillDownMenu",hashBased:!0})},Yr=e=>{const t=V(e);return()=>t(Kr)};function an(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(d,...p){const{variant:u="outline",color:h="neutral",size:v="md",Component:w,disabled:g,...y}=d;return a({class:T(c.base,g&&c.disabled,t==null?void 0:t.class,d.class)},s({class:T(u,h,v)},w({disabled:g}),r({type:"file",disabled:g,...y})),i({class:"filename-display"}))}}const rn=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),d=an(e),p=h=>{const v=h.target.files[0];v?l.val=v.name:l.val="No file selected"},u=({disabled:h})=>r({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return h=>d({Component:u,name:"file",accept:"text/*",onchange:p,...h})},qr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,d=n.state("No file selected"),p=an(e),u=v=>{const w=v.target.files[0];w?d.val=w.name:d.val="No file selected"},h=({disabled:v})=>c({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,v&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:h,name:"file",accept:"text/*",onchange:u}),c("File selected: ",d))},Jr=`import classNames from "@grucloud/bau-css/classNames";
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
`,Qr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Jr,createComponent:qr}],gridItem:rn},es=e=>{const t=V(e);return()=>t(Qr)},sn=e=>{const t=Je(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},ts=e=>{const{bau:t}=e,{section:n}=t.tags,o=Je(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},ns=`import input from "@grucloud/bau-ui/input";
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
`,os={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ns,createComponent:ts}],gridItem:sn},as=e=>{const t=V(e);return()=>t(os)},rs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ss=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},rs.map(s))},is=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],cs=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=we(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},is.map(r)))},ls=`import list from "@grucloud/bau-ui/list";
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
`,us={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ls,createComponent:cs}],gridItem:ss},ds=e=>{const t=V(e);return()=>t(us)};function cn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
    ${(()=>oe.map(r=>`
&.modal.plain.${r} {
  color: inherit;
}
&.modal.outline.${r} {
  color: inherit;
}
&.modal.soft.${r} {
  color: inherit;
}
&.modal.solid.${r} {

}
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p="md",...u},...h]=Z(c);return a({class:T("modal",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const ln=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=q(e),c=cn(e),l=()=>o(Array(10).fill("").map((p,u)=>s(u+1,". Some text here"))),d=p=>{const u=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{u.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{u.close()}},"OK")));return u};return p=>{const u=d(p);return n(r({...p,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},ps=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=q(e),l=cn(e),d=()=>o(Array(10).fill("").map((u,h)=>s(h+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),d(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},ms=`import modal from "@grucloud/bau-ui/modal";
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
`,bs={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:ms,createComponent:ps}],gridItem:ln},hs=e=>{const t=V(e);return()=>t(bs)},gs=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=q(e),r=qe(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),d=c(),p=r({id:"my-popover-left",triggerEl:d,contentEl:l()});return()=>n(o(d,p))},fs=`import popover from "@grucloud/bau-ui/popover";
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
`,vs={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:fs,createComponent:gs}]},xs=e=>{const t=V(e);return()=>t(vs)},ws=e=>{const{bau:t}=e,{div:n}=t.tags,o=Ne(e);return a=>o({...a},n(`Paper ${a.size??""}`))},ys=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},Cs=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Es={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Cs,createComponent:ys}],variantColorTableDisable:!0,gridItem:ws},Ss=e=>{const t=V(e);return()=>t(Es)},ks=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function un(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=q(e),r=qe(e),c=we(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ks()}
  `,d=n.state(""),p=n.state(!1),u=n.state(0);return function(...v){let[{color:w="neutral",variant:g="outline",size:y="md",id:E,label:k,Option:_,options:O,getOptionLabel:B=({label:b})=>b,...I},...R]=Z(v);const A=()=>{m.openDialog(),m.focus(),p.val=!0},H=()=>{m.closeDialog(),p.val=!1},Y=()=>{p.val=!1},ne=b=>{p.val?H():A()},j=({option:b,index:x})=>C=>{d.val=B(b),u.val=x,H()},G=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":u.val<O.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=O.length-1:u.val--;break;case"Enter":p.val?(d.val=B(O[u.val]),H()):A();break}},U=()=>c({tabindex:"0",class:T(w,g)},O.map((b,x)=>i({class:()=>T(u.val==x&&"active"),onclick:j({option:b,index:x})},_(b)))),f=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":k,onclick:ne,color:w,variant:g,size:y},()=>!d.val&&k,d),m=r({id:E,triggerEl:f,contentEl:U(),onClose:Y});return a({...I,class:T("select",w,y,l,t==null?void 0:t.class,I==null?void 0:I.class),onkeydown:G},f,m)}}const dn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=un(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Ts=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=un(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},As=`import select from "@grucloud/bau-ui/select";
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
`,Ms={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:As,createComponent:Ts}],gridItem:dn},Ds=e=>{const t=V(e);return()=>t(Ms)};function Oe(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p,...u},...h]=Z(c);return a({...u,type:"range",class:T("slider",l,d,p,s,t==null?void 0:t.class,u.class)},...h)}}const pn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Oe(e);return i=>a({...i,oninput:o})},Is=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Oe(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},$s=`import slider from "@grucloud/bau-ui/slider";
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
`,Ns=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Oe(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},_s=`import slider from "@grucloud/bau-ui/slider";
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
`,Bs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Oe(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},Os=`import slider from "@grucloud/bau-ui/slider";
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
`,Ps={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:$s,createComponent:Is},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:_s,createComponent:Ns},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Os,createComponent:Bs}],gridItem:pn},Rs=e=>{const t=V(e);return()=>t(Ps)},gt={sm:16,md:32,lg:64};function et(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:i,animateTransform:s,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:d="color-base",variant:p="outline",visibility:u=!0,...h}={}){return a({class:T(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,h.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:gt[l],height:gt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},i({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const mn=e=>{const t=et(e);return n=>t({...n})},Ls=e=>{const{bau:t}=e,{section:n}=t.tags,o=et(e);return()=>n(o({}))},js=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,zs={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:js,createComponent:Ls}],gridItem:mn},Hs=e=>{const t=V(e);return()=>t(zs)},Us=()=>oe.map(e=>`
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
`);function bn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Us()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d="md",...p},...u]=Z(r);return a({...p,class:T("switch",i,c,l,d,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...u)}}const hn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=bn(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},Gs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=bn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Fs=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Vs={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Fs,createComponent:Gs}],gridItem:hn},Ws=e=>{const t=V(e);return()=>t(Vs)},Xs=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),d=u=>c.val.find(h=>h.name==u),p={base:o`
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
      ${Xs()}
    `};return function(...h){let[{color:v,variant:w="plain",size:g,...y},...E]=Z(h);const k=O=>{const{Header:B,disabled:I,name:R}=O;return r({class:()=>T(l.val.name==R&&"active",I&&"disabled"),onclick:A=>A.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:R},bubbles:!0}))},B(O))},_=i({class:T("tabs",p.base,w,g,v,t==null?void 0:t.class,y.class)},n.loop(c,s(),k),()=>l.val.Content?l.val.Content({}):"");return _.addEventListener("tab.select",O=>{var R,A;const{tabName:B}=O.detail,I=d(B);I&&((R=l.val.exit)==null||R.call(),l.val=I,(A=I.enter)==null||A.call())},!1),_.addEventListener("tab.add",O=>{var I;const{tab:B}=O.detail;(I=B.enter)==null||I.call(),c.val.push(B)},!1),_.addEventListener("tab.remove",O=>{var I;const B=c.val.findIndex(R=>R.name==O.detail.tabName);B>0&&((I=c.val[B].exit)==null||I.call(),c.val.splice(B,1))},!1),_}}const gn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},Zs=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Ks=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Ys=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},qs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,fn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Js=e=>{const{css:t}=e,n=ye(e,{tabDefs:fn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Qs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,ei=e=>{const{css:t}=e,n=fn(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},ti=`import tabs from "@grucloud/bau-ui/tabs";
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
`,ni={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Ks,createComponent:Zs},{title:"Extended Tabs",description:"An extended tabs.",code:qs,createComponent:Ys},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Qs,createComponent:Js},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:ti,createComponent:ei}],gridItem:gn},oi=e=>{const t=V(e);return()=>t(ni)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...d]=Z(c);return i({...l,class:T("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...d)}}const ai=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags;function p(g,y,E,k,_){return{name:g,calories:y,fat:E,carbs:k,protein:_}}const u=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],h=({name:g,calories:y})=>s(i(g),i({class:n`
            text-align: right;
          `},y)),v=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),w=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(w(r(d("Basic Table"),v(),l(u.map(h)))))},ri=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const si=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],ii=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:v,calories:w})=>s(i(v),i({class:n`
            text-align: right;
          `},w)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Ce(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(h(r(d("Table Dense"),u(),l(si.map(p)))))},ci=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ge(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const li=[ge("Frozen yoghurt",159,6,24,4),ge("Ice cream sandwich",237,9,37,4.3),ge("Eclair",262,16,24,6),ge("Cupcake",305,3.7,67,4.3),ge("Gingerbread",356,16,49,3.9)],ui=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:v,calories:w})=>s(i(v),i({class:n`
            text-align: right;
          `},w)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Ce(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(h(r(d("Table Zebra"),u(),l(li.map(p)))))},di=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,pi={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:ri,createComponent:ai},{title:"Dense",description:"A dense table.",code:ci,createComponent:ii},{title:"Zebra",description:"A zebra table.",code:di,createComponent:ui}]},mi=e=>{const t=V(e);return()=>t(pi)};function vn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=Qe(e),s=q(e),r=et(e),c=o`
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
  `,l=({label:v,icon:w,...g})=>s({"aria-label":v,title:v,...g},w),d=({count:v,totalCount:w,page:g,rowsPerPage:y})=>a({class:"pages-numbers"},Number(g-1)*Number(y)+(v>0?1:0),"-",Math.min(g*y,w)," of ",w),p=({count:v,page:w,rowsPerPage:g})=>a({class:"pages-numbers"},(w-1)*g+(v>0?1:0),"-",w*g),u=v=>v<=1,h=(v,w,g)=>v>=Math.ceil(w/g);return function(...w){let[{count:g=0,totalCount:y=0,page:E=1,rowsPerPage:k=50,onPageChange:_,isLoading:O=!1,disableFirst:B=()=>u(E),disablePrevious:I=()=>u(E),disableNext:R=()=>h(E,y,k),disableLast:A=()=>h(E,y,k),...H},...Y]=Z(w);const ne=Math.max(0,Math.ceil(y/k)),j=_({page:1}),G=_({page:E-1}),U=_({page:E+1}),f=_({page:ne}),m=[{label:"First",icon:"⟪",onclick:j,disabled:B()},{label:"Previous",icon:"⟨",onclick:G,disabled:I()},{label:"Next",icon:"⟩",onclick:U,disabled:R()},{label:"Last",icon:"⟫",onclick:f,disabled:A()}];return a({...H,class:T("table-pagination",c,O&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},r({class:"spinner",visibility:O,size:"md"}),y>0?d({count:g,totalCount:y,page:E,maxPages:ne,rowsPerPage:k}):p({count:g,page:E,maxPages:ne,rowsPerPage:k}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const bi=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),hi=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=bi(45),d=({name:E,email:k})=>i(a(E),a(k)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=vn(e),h=Ce(e,{class:n`
      max-width: 650px;
    `}),v=t.state(l),w=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),g=t.derive(()=>v.val.slice(w.val.page*w.val.rowsPerPage,(w.val.page+1)*w.val.rowsPerPage)),y=({page:E})=>k=>{w.val.page=E};return()=>h(s(p(),()=>c(g.val.map(d))),()=>u({...w.val,onPageChange:y}))},gi=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,d=t.state(!1),p=t.state([]),u=t.state(""),h=t.derive(()=>p.val.length),v=t.state(1),w=t.state(10),g=t.derive(()=>p.val),y=A=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(A).toString()}`,E=({page:A})=>H=>{v.val=A,k(y({page:A,per_page:w.val}))};k(y({page:1,per_page:w.val}));async function k(A){try{d.val=!0;const H=await fetch(A,{});if(H.ok){const Y=await H.json();p.val=Y;return}throw H}catch(H){u.val=H.message}finally{d.val=!1}}const _=({name:A,description:H,stargazers_count:Y})=>i(a(A),a(H),a({class:n`
            text-align: right;
          `},Y)),O=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),B=vn(e),I=Ce(e,{class:n`
      min-width: 650px;
    `}),R=({message:A})=>l(A);return()=>I(()=>B({rowsPerPage:w.val,page:v.val,count:h.val,totalCount:-1,isLoading:d.val,onPageChange:E,disableNext:()=>!1}),s(O(),()=>u.val&&R({message:u.val}),()=>c(g.val.map(_))))},fi=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=hi(e),l=gi(e),d=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),d(l()),i("Simple Pagination"),d(c()))};function tt(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:d="bottom-start",color:p="neutral",variant:u="outline",size:h="md",...v},...w]=Z(c);const g=i({class:T("container",...d.split("-"))},i({class:T("content",p,u,h),role:"tooltip"},l)),y=I=>`move-to-${I}`,E=(I,R,A)=>{if(I()){const H=y(R);g.classList.add(H),g.classList.add(R),g.classList.remove(A)}},k=(I,R)=>{const A=y(I);g.classList.contains(A)&&(g.classList.remove(A),g.classList.add(R),g.classList.remove(I))},_=I=>{const R=g.getBoundingClientRect();E(()=>R.x<0,"right","left"),E(()=>R.x+R.width>a.innerWidth,"left","right"),E(()=>R.y<0,"bottom","top"),E(()=>R.bottom>a.innerHeight,"top","bottom"),g.classList.add("visible")},O=I=>{g.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return i({...v,class:T("tooltip",s,t==null?void 0:t.class,v==null?void 0:v.class),bauMounted:({element:I})=>{I.addEventListener("mouseover",_),I.addEventListener("mouseout",O)},bauUnmounted:({element:I})=>{I.removeEventListener("mouseover",_),I.removeEventListener("mouseout",O)}},...w,g)}}const xn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,s=q(e),r=tt(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},vi=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=q(e),s=tt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},xi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,wi=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=(...p)=>Ie(e)({variant:"outline",color:"primary"},p),c=tt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),d=()=>s({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        `},o({class:n`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          `},c({side:"top-start",titleEl:l()},r("top-start")),c({side:"top-centered",titleEl:l()},r("top-centered")),c({side:"top-end",titleEl:l()},r("top-end"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-start",titleEl:l()},r("left-start")),c({side:"right-start",titleEl:l()},r("right-start"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-centered",titleEl:l()},r("left-centered")),c({side:"right-centered",titleEl:l()},r("right-centered"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-end",titleEl:l()},r("left end")),c({side:"right-end",titleEl:l()},r("right end"))),o({class:n`
            display: flex;
            justify-content: space-around;
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>d()},yi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ci={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:xi,createComponent:vi},{title:"Grid",description:"Various tooltip position",code:yi,createComponent:wi}],gridItem:xn},Ei=e=>{const t=V(e);return()=>t(Ci)},wn=e=>{const t=Ve(e);return n=>t(n)},Si=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ve(e);return()=>n(o({}))},ki=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Ti={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:ki,createComponent:Si}],gridItem:wn},Ai=e=>{const t=V(e);return()=>t(Ti)},Mi=({css:e,createGlobalStyles:t})=>(t`
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

    &.solid div:hover {
      filter: brightness(var(--brightness-hover-always));
    }

    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      background: inherit;

      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all var(--transition-fast) ease-in-out;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
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
    `});function yn(e,t){const{bau:n,css:o,createGlobalStyles:a,window:i}=e,{renderMenuItem:s}=t,{ul:r,li:c,nav:l,div:d}=n.tags,p=Mi({css:o,createGlobalStyles:a}),u=({element:g,closeState:y})=>{g.scrollHeight!=0&&(y.val?h(g):v(g))};function h(g){g.style.height=g.scrollHeight+"px";const y=()=>{g.removeEventListener("transitionend",y)};g.addEventListener("transitionend",y),i.requestAnimationFrame(()=>{g.style.height="0px"})}function v(g){const y=()=>{g.removeEventListener("transitionend",y),g.style.height=null};g.addEventListener("transitionend",y),g.style.height=g.scrollHeight+"px"}const w=({depth:g=1,maxDepth:y,color:E,variant:k,size:_})=>O=>{const{children:B,expanded:I}=O,R=n.state(!I);return c({class:()=>T(B?R.val?p.collapsed:p.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:A=>{B&&(R.val=!R.val)}},s(O.data)),B&&g<y&&r({class:T(E,_),bauMounted:({element:A})=>{R.val&&(A.style.height="0px")},"aria-expanded":({element:A})=>(u({element:A,closeState:R}),!R.val)},B.map(w({depth:g+1,maxDepth:y}))))};return function({tree:y,maxDepth:E=1/0,size:k="md",variant:_="plain",color:O="neutral",...B}){return l({class:T(p.nav,k,_,O,t==null?void 0:t.class,B.class)},y.children&&r(y.children.map(w({maxDepth:E,color:O,variant:_,size:k}))))}}const Cn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=yn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},Di=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=yn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Ii=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,$i={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ii,createComponent:Di}],gridItem:Cn},Ni=e=>{const t=V(e);return()=>t($i)},_i=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=Rt(e),d=q(e),p=[{name:"Accordion",Item:Lt(e)},{name:"Alert",Item:zt(e)},{name:"Autocomplete",Item:Ft(e)},{name:"Avatar",Item:Ut(e)},{name:"Badge",Item:Wt(e)},{name:"Breadcrumbs",Item:Zt(e)},{name:"Button",Item:Kt(e)},{name:"Button Group",Item:Yt(e)},{name:"Calendar",Item:Jt(e)},{name:"Checkbox",Item:tn(e)},{name:"Chip",Item:Qt(e)},{name:"DrillDown Menu",Item:on(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:rn(e)},{name:"Input",Item:sn(e)},{name:"Modal",Item:ln(e)},{name:"Select",Item:dn(e)},{name:"Slider",Item:pn(e)},{name:"Spinner",Item:mn(e)},{name:"Switch",Item:hn(e)},{name:"Tabs",Item:gn(e)},{name:"Theme Switch",Item:wn(e)},{name:"Tooltip",Item:xn(e)},{name:"Tree View",Item:Cn(e)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:u})=>c(d({color:"primary",variant:"solid",href:`#${u}`,size:"sm"},u)))),p.map(u=>a({id:u.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(u))))},Bi=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:uo(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:ha(e)})},{path:"components",action:()=>({title:"Component",component:_i(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:ka(e)})},{path:"alert",action:()=>({title:"Alert",component:Ba(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ja(e)})},{path:"animate",action:()=>({title:"Animate",component:Va(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:tr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ka(e)})},{path:"badge",action:()=>({title:"Badge",component:rr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:lr(e)})},{path:"button",action:()=>({title:"Button",component:mr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:vr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Cr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Mr(e)})},{path:"chip",action:()=>({title:"Chip",component:Nr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Pr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Hr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Wr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Yr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:es(e)})},{path:"input",action:()=>({title:"Input",component:as(e)})},{path:"list",action:()=>({title:"List",component:ds(e)})},{path:"modal",action:()=>({title:"Modal",component:hs(e)})},{path:"paper",action:()=>({title:"Paper",component:Ss(e)})},{path:"popover",action:()=>({title:"Popover",component:xs(e)})},{path:"select",action:()=>({title:"Select",component:Ds(e)})},{path:"slider",action:()=>({title:"Slider",component:Rs(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Hs(e)})},{path:"switch",action:()=>({title:"Switch",component:Ws(e)})},{path:"table",action:()=>({title:"Table",component:mi(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:fi(e)})},{path:"tabs",action:()=>({title:"Tabs",component:oi(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ei(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Ai(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Ni(e)})}]},{path:"pages",action:t=>({title:"Pages",component:bo(e)})}],Oi=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Pi=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const d=o.location.pathname.replace(n,""),{title:p,component:u,Layout:h=t}=l.resolve({pathname:d});s.val=u,document.title=`${p}`}},Ri=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};Gn();const En={title:"Bau",base:"/bau/bau-ui"},le=qn({config:En}),{bau:Li}=le;le.states={drawerOpen:Li.state(!0)};Ri(le);_n({routes:Bi({context:le}),onLocationChange:Pi({context:le,LayoutDefault:so(le),config:En}),notFoundRoute:Oi(le)});
