(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Fn=(e,t)=>({...e,paths:[...t,e.path]}),yt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Fn(o,e);return n?[a,...yt({paths:[...e,o.path],routes:n})]:a}),Wn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Vn=({routes:e=[],notFoundRoute:t})=>{const n=yt({routes:e}).map(o=>({...o,regex:Wn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Kn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Vn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ze=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Zn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Xn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],lt=e=>`var(--color-${e})`,qn=e=>`var(--color-${e}-lightest)`,Yn=()=>Ze.map(([e])=>`
.outline.${e} {
  border: 2px solid ${lt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${qn(e)};
}
.solid.${e} {
  background-color: ${lt(e)};
}
`).join(`
`),Jn=()=>Ze.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Qn=e=>100-e*10,eo=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Qn(t)}%);`).join(`
`),ut=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),to=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Zn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Xn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function no({createGlobalStyles:e},{colorPalette:t=Ze}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>to([n,o])).join(`
`)}
      ${eo()}
      ${ut({})}
      ${Yn()}
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
      ${Jn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ut({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function oo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Xe=e=>Object.prototype.toString.call(e??0).slice(8,-1),ao=e=>Xe(e)=="Object",dt=e=>Xe(e)=="Function",We=e=>["Object","Array"].includes(Xe(e)),pt=Object.getPrototypeOf,Ve=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,ro=["splice","push","pop","shift","unshift","sort","reverse"],Ae=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const F=e=>!me(e[0])&&ao(e[0])?e:[{},...e];function so(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,m,v)=>{let S=r;r=m;let E=y(v);return r=S,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var v;return(v=m.element)==null?void 0:v.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},p=(y,m,v,S,E,_)=>{var O;if(s){i.add(y);return}for(let Z of y.bindings){let{deps:R,element:P,renderInferred:K,render:J,renderItem:te}=Z;if(te&&m)(O=h(P,S,(...ae)=>w(te(...ae)),v,E,_)[m])==null||O.call();else{let ae=K?K({element:P}):J({element:P,renderItem:te})(...R.map(Ve));ae!==P&&P.replaceWith(Z.element=w(ae))}}C(y),u()},d=(y,m,v=[])=>({get(S,E,_){var O;if(r==null||r.add(y),E==="_isProxy")return!0;if(!((O=S[E])!=null&&O._isProxy)&&!me(S[E])&&We(S[E]))S[E]=new Proxy(S[E],d(y,m,[...v,E]));else if(ro.includes(E)){let Z=S[E];return(...R)=>{let P=Z.apply(S,R);return p(y,E,P,R,m,v),P}}return Reflect.get(S,E,_)},set(S,E,_,O){let Z=Reflect.set(S,E,_,O);return p(y,"setItem",Z,{prop:E,value:_},m,[...v,E]),Z}}),g=(y,m)=>new Proxy(m,d(y,m)),h=(y,m,v,S,E,_)=>{let O=()=>y.replaceChildren(...Ae(S,v)),Z=R=>y[R]&&y.removeChild(y[R]);return{assign:O,sort:O,reverse:O,setItem:()=>{var P;let R=_[0];(P=y.children[R])==null||P.replaceWith(v(E[R],R))},push:()=>y.append(...Ae(m,(R,P)=>v(R,E.length+P))),unshift:()=>y.prepend(...Ae(m,v)),pop:()=>Z("lastChild"),shift:()=>Z("firstChild"),splice:()=>{let[R,P,...K]=m;const{length:J}=y.children;for(let te=R>=0?Math.min(R+P-1,J-1):J-1;te>=(R>=0?R:J+R);te--)y.children[te].remove();if(K.length){let te=K.forEach((ae,He)=>v(ae,R+He));y.children[R]?y.children[R].after(...te):y.append(...te)}}}},b=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=We(y)?g(m,y):y,m.valProxy)},set val(m){let v=this,S=v.val;We(m)?(v.valProxy=g(v,m),p(v,"assign",m)):m!==S&&(v.valProxy=m,p(v)),v.oldVal=S}}),w=y=>y==null||y===!1?c("span"):y.nodeType?y:n.createTextNode(y),x=(y,m)=>{let v=new Set;return m.val=l(y,v),v},f=y=>{let m=b(),v=x(y,m);m.computed=!0;for(let S of v)S.listeners.push({computed:y,deps:v,state:m});return m},C=y=>{for(let m of[...y.listeners])x(m.computed,m.state)},I=(y,...m)=>{if(m.length){let v=[];for(let S of m.flat(1/0))S!=null&&v.push(me(S)?j({deps:[S],render:()=>E=>E}):dt(S)?Q({renderInferred:S}):w(S));y.append(...v)}},M={},$=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??$(pt(y),m)),N=(y,m,v)=>{var S;return M[y+","+m]??(M[y+","+m]=((S=$(v,m))==null?void 0:S.set)??0)},A=(y,m)=>new t.MutationObserver((v,S)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(_=>_===y&&(m({element:y}),S.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),D=(y,m)=>new t.MutationObserver((v,S)=>v.forEach(E=>m({record:E,element:y}))).observe(y,{childList:!0}),L=y=>new Proxy(function(v,...S){var Z;let[E,..._]=F(S),O=y?n.createElementNS(y,v):c(v);for(let[R,P]of Object.entries(E)){if(R.startsWith("bau"))continue;let K=N(v,R,pt(O))?J=>O[R]=J:J=>O.setAttribute(R,J);P==null||(me(P)?j({deps:[P],render:()=>()=>(K(P.val),O)}):dt(P)&&(!R.startsWith("on")||P.isDerived)?Q({renderInferred:()=>(K(P({element:O})),O)}):P.renderProp?j({deps:P.deps,render:()=>()=>(K(P.renderProp({element:O})(...P.deps.map(Ve))),O)}):K(P))}return E.bauChildMutated&&D(O,E.bauChildMutated),I(O,..._),(Z=E.bauCreated)==null||Z.call(E,{element:O}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:O})),E.bauUnmounted&&t.requestAnimationFrame(()=>A(O,E.bauUnmounted)),O},{get:(m,v)=>m.bind(void 0,v)}),W=(y,m,v)=>{y.element=w(v);for(let S of m)me(S)&&(a.add(S),S.bindings.push(y));return y.element},Q=({renderInferred:y,element:m})=>{let v=new Set,S=l(y,v,{element:m});return W({renderInferred:y},v,S)},j=({deps:y,element:m,render:v,renderItem:S})=>W({deps:y,render:v,renderItem:S},y,v({element:m,renderItem:S})(...y.map(Ve))),V=(y,m,v)=>j({deps:[y],render:({renderItem:S})=>E=>(m.append(...Ae(E,S)),m),renderItem:v}),U=y=>{s=!0,y(),s=!1,i.forEach(p),i.clear()};return{tags:L(),tagsNS:L,state:b,bind:j,loop:V,derive:f,stateSet:a,batch:U}}const io=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},co=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},lo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function uo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=lo(a,i),r=io(s);return!t.getElementById(r)&&co(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function po(e){const t=so(),n=uo();return no(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function $e(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!s()||d.getAttribute("cloned"))return;const g=d.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=d.getAttribute("width"),g.style.height=d.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var h;return(h=g.parentNode)==null?void 0:h.removeChild(g)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const g=d.getBoundingClientRect();if(d.setAttribute("width",g.width+"px"),d.setAttribute("height",g.height+"px"),r()){d.style.animation=r();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function X(e,t){const{bau:n,css:o}=e,a={root:o`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
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
      & i {
        font-style: normal;
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:u,href:p,...d},...g]=F(s);return(p?n.tags.a:n.tags.button)({...!p&&{type:"button"},...d,class:T("button",a.root,c,l,r,p?a.a:a.button,u&&a.disabled,t==null?void 0:t.class,d.class),disabled:u,href:p},g)}}const ee=["neutral","primary","success","danger","warning"],mo=["plain","outline","solid"],go=["sm","md","lg"],bo="light",ho=()=>ee.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function qe(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(bo);const l=o`
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
    ${ho()}
  `;return function(...p){let[{color:d,variant:g="outline",size:h="md",...b},...w]=F(p);return i({required:"required",title:"Switch Theme",...b,class:T("theme-switch",d,g,h,l,t==null?void 0:t.class,b.class),type:"checkbox",checked:r()=="dark",onclick:x=>{s(x.target.checked?"dark":"light")}},...w)}}function fo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:p,b:d,ul:g,li:h}=n.tags,{svg:b,path:w}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,f=X(e,{class:o`
      background: transparent;
    `}),C=qe(e),I=()=>s(b({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},w({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),M=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},I()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(t("Bau UI")))),$=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},C(),f({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},M(),$())}}function vo({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:p}=t.tags,d=({links:b,title:w})=>o({class:n`
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
        `},p(w),r(b.map(({href:x,name:f})=>c(s({href:x},f))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
    display: flex;
    flex-direction: column;
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
    & > li {
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
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=F(r);return a({...p,class:T("list",i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Ie="0.3s",Ct=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(Ct({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},St=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=St(e)(t.children[o]);if(a)return a}},xo=({keyframes:e})=>({hideToLeft:e`
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
   `});function Ye(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=j=>{var V;return((V=j.parentTree.data)==null?void 0:V.href)??j.parentTree.children[0].data.href},u=({variant:j,color:V,size:U,currentTree:y,data:m})=>C(N({variant:j,color:V,size:U,href:`${c}${l(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),N({variant:j,color:V,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:j,subTree:{data:{name:V,href:U},children:y=[]}})=>N({size:j,href:`${c}${U}`,"data-ischild":!y.length},V),d=({pathname:j,subTree:V})=>{var U;return j===((U=V==null?void 0:V.data)==null?void 0:U.href)},{renderHeader:g=u,renderMenuItem:h=p,isActive:b=d}=t,{li:w,nav:x,div:f,header:C,a:I}=n.tags,M=$e(e),$=we(e),N=X(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:A,hideToRight:D}=xo(e),L=o`
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
  `,W=({variant:j,color:V,size:U,currentTree:y,pathnameState:m})=>{const{children:v,parentTree:S,data:E}=y;return f({class:T("drillDownMenu",j,V,U)},S&&g({variant:j,color:V,size:U,data:E,currentTree:y}),v&&$({class:T(j,V,U)},v.map(_=>w({class:()=>T(_.children&&"has-children",b({pathname:m.val,subTree:_})&&"active")},h({variant:j,color:V,size:U,subTree:_})))))},Q=({tree:j,pathname:V})=>{let U=Ct({})(structuredClone(j)),y=St(V)(U);return y||(console.error("drilldown no sub tree",V),y=U),y};return function(V){const{variant:U="plain",color:y="neutral",size:m="md",tree:v,...S}=V,E=n.state(a.location.pathname.replace(c,"")),_=n.derive(()=>Q({tree:v,pathname:E.val}));a.document.addEventListener("click",K=>{const{target:J}=K,te=J.getAttribute("href");if(J.tagName==="A"&&te&&!te.startsWith("http")){let ae=te.replace(c,"");r||(ae=ae.replace(J.hash,"")),E.val=ae}});let O=1;const Z=K=>{const{dataset:J}=K.target;J.buttonback=="true"?O=-1:J.ischild=="false"?O=1:J.ischild=="true"&&(O=0)},R=K=>{switch(K){case 1:return`${A} ${Ie}`;case-1:return`${D} ${Ie}`;default:return""}},P=K=>{switch(K){case 1:return`${D} ${Ie} reverse`;case-1:return`${A} ${Ie} reverse`;default:return""}};return x({class:T(L,t==null?void 0:t.class,S.class),onclick:Z},M({animationHide:()=>R(O),animationShow:()=>P(O)},()=>W({variant:U,color:y,size:m,currentTree:_.val,pathnameState:E})))}}const wo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Et(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let g=!1;const h=Ye(e);return function(){return r({bauMounted:({element:w})=>{s.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:w=>{g&&!w.target.dataset.buttonback&&!w.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},h({tree:wo}))}}const yo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=$e(e),r=fo(e),c=Et(e),l=vo(e),u=a`
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
        `},r(),c(),s({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val),l())}};function Be(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
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
  `;return function(...r){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...g]=F(r);return a({...d,onclick:p,class:T("chip",c,l,u,p&&"clickable",i,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}function Co(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;X(e);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),s(p),r(d))}}function So(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Eo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:g,size:h})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},g),s({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function ko(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=Co(e),l=So(e),u=X(e);Be(e);const p=Eo(e),d=(...x)=>a({class:n`
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
          `},...x)),g=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],b=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],w=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:b}),p({data:h}),w())}}function To(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const Ao=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=To(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function Io(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Ao(e)()))}}function Do(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function kt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&kt(n)}),e}class mt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Tt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Mo="</span>",gt=e=>!!e.scope,No=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class $o{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Tt(t)}openNode(t){if(!gt(t))return;const n=No(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){gt(t)&&(this.buffer+=Mo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const bt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Je{constructor(){this.rootNode=bt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=bt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Je._collapse(n)}))}}class Bo extends Je{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new $o(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function At(e){return de("(?=",e,")")}function Po(e){return de("(?:",e,")*")}function Oo(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function _o(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Qe(...e){return"("+(_o(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function It(e){return new RegExp(e.toString()+"|").exec("").length-1}function Ro(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Lo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function et(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),s="";for(;i.length>0;){const r=Lo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const zo=/\b\B/,Dt="[a-zA-Z]\\w*",tt="[a-zA-Z_]\\w*",Mt="\\b\\d+(\\.\\d+)?",Nt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",$t="\\b(0b[01]+)",jo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ho=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},Go={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Uo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Fo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Pe=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Wo=Pe("//","$"),Vo=Pe("/\\*","\\*/"),Ko=Pe("#","$"),Zo={scope:"number",begin:Mt,relevance:0},Xo={scope:"number",begin:Nt,relevance:0},qo={scope:"number",begin:$t,relevance:0},Yo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Jo={scope:"title",begin:Dt,relevance:0},Qo={scope:"title",begin:tt,relevance:0},ea={begin:"\\.\\s*"+tt,relevance:0},ta=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var De=Object.freeze({__proto__:null,MATCH_NOTHING_RE:zo,IDENT_RE:Dt,UNDERSCORE_IDENT_RE:tt,NUMBER_RE:Mt,C_NUMBER_RE:Nt,BINARY_NUMBER_RE:$t,RE_STARTERS_RE:jo,SHEBANG:Ho,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:Go,QUOTE_STRING_MODE:Uo,PHRASAL_WORDS_MODE:Fo,COMMENT:Pe,C_LINE_COMMENT_MODE:Wo,C_BLOCK_COMMENT_MODE:Vo,HASH_COMMENT_MODE:Ko,NUMBER_MODE:Zo,C_NUMBER_MODE:Xo,BINARY_NUMBER_MODE:qo,REGEXP_MODE:Yo,TITLE_MODE:Jo,UNDERSCORE_TITLE_MODE:Qo,METHOD_GUARD:ea,END_SAME_AS_BEGIN:ta});function na(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function oa(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function aa(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=na,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ra(e,t){Array.isArray(e.illegal)&&(e.illegal=Qe(...e.illegal))}function sa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ia(e,t){e.relevance===void 0&&(e.relevance=1)}const ca=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,At(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},la=["of","and","for","in","not","or","if","then","parent","list","value"],ua="keyword";function Bt(e,t,n=ua){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Bt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,da(c[0],c[1])]})}}function da(e,t){return t?Number(t):pa(e)?0:1}function pa(e){return la.includes(e.toLowerCase())}const ht={},ue=e=>{console.error(e)},ft=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{ht[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ht[`${e}/${t}`]=!0)},Ne=new Error;function Pt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=It(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function ma(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ne;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Ne;Pt(e,e.begin,{key:"beginScope"}),e.begin=et(e.begin,{joinWith:""})}}function ga(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ne;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Ne;Pt(e,e.end,{key:"endScope"}),e.end=et(e.end,{joinWith:""})}}function ba(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ha(e){ba(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),ma(e),ga(e)}function fa(e){function t(s,r){return new RegExp(ve(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=It(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(et(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[oa,sa,ha,ca].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[aa,ra,ia].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Bt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return va(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function Ot(e){return e?e.endsWithParent||Ot(e.starts):!1}function va(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ot(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var xa="11.8.0";class wa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ke=Tt,vt=ie,xt=Symbol("nomatch"),ya=7,_t=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Bo};function c(m){return r.noHighlightRe.test(m)}function l(m){let v=m.className+" ";v+=m.parentNode?m.parentNode.className:"";const S=r.languageDetectRe.exec(v);if(S){const E=D(S[1]);return E||(ft(i.replace("{}",S[1])),ft("Falling back to no-highlight mode for this block.",m)),E?S[1]:"no-highlight"}return v.split(/\s+/).find(E=>c(E)||D(E))}function u(m,v,S){let E="",_="";typeof v=="object"?(E=m,S=v.ignoreIllegals,_=v.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),_=m,E=v),S===void 0&&(S=!0);const O={code:E,language:_};U("before:highlight",O);const Z=O.result?O.result:p(O.language,O.code,S);return Z.code=O.code,U("after:highlight",Z),Z}function p(m,v,S,E){const _=Object.create(null);function O(k,B){return k.keywords[B]}function Z(){if(!z.keywords){ne.addText(Y);return}let k=0;z.keywordPatternRe.lastIndex=0;let B=z.keywordPatternRe.exec(Y),G="";for(;B;){G+=Y.substring(k,B.index);const q=re.case_insensitive?B[0].toLowerCase():B[0],oe=O(z,q);if(oe){const[se,Gn]=oe;if(ne.addText(G),G="",_[q]=(_[q]||0)+1,_[q]<=ya&&(Te+=Gn),se.startsWith("_"))G+=B[0];else{const Un=re.classNameAliases[se]||se;K(B[0],Un)}}else G+=B[0];k=z.keywordPatternRe.lastIndex,B=z.keywordPatternRe.exec(Y)}G+=Y.substring(k),ne.addText(G)}function R(){if(Y==="")return;let k=null;if(typeof z.subLanguage=="string"){if(!t[z.subLanguage]){ne.addText(Y);return}k=p(z.subLanguage,Y,!0,ct[z.subLanguage]),ct[z.subLanguage]=k._top}else k=g(Y,z.subLanguage.length?z.subLanguage:null);z.relevance>0&&(Te+=k.relevance),ne.__addSublanguage(k._emitter,k.language)}function P(){z.subLanguage!=null?R():Z(),Y=""}function K(k,B){k!==""&&(ne.startScope(B),ne.addText(k),ne.endScope())}function J(k,B){let G=1;const q=B.length-1;for(;G<=q;){if(!k._emit[G]){G++;continue}const oe=re.classNameAliases[k[G]]||k[G],se=B[G];oe?K(se,oe):(Y=se,Z(),Y=""),G++}}function te(k,B){return k.scope&&typeof k.scope=="string"&&ne.openNode(re.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(K(Y,re.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(J(k.beginScope,B),Y="")),z=Object.create(k,{parent:{value:z}}),z}function ae(k,B,G){let q=Ro(k.endRe,G);if(q){if(k["on:end"]){const oe=new mt(k);k["on:end"](B,oe),oe.isMatchIgnored&&(q=!1)}if(q){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return ae(k.parent,B,G)}function He(k){return z.matcher.regexIndex===0?(Y+=k[0],1):(Fe=!0,0)}function Ln(k){const B=k[0],G=k.rule,q=new mt(G),oe=[G.__beforeBegin,G["on:begin"]];for(const se of oe)if(se&&(se(k,q),q.isMatchIgnored))return He(B);return G.skip?Y+=B:(G.excludeBegin&&(Y+=B),P(),!G.returnBegin&&!G.excludeBegin&&(Y=B)),te(G,k),G.returnBegin?0:B.length}function zn(k){const B=k[0],G=v.substring(k.index),q=ae(z,k,G);if(!q)return xt;const oe=z;z.endScope&&z.endScope._wrap?(P(),K(B,z.endScope._wrap)):z.endScope&&z.endScope._multi?(P(),J(z.endScope,k)):oe.skip?Y+=B:(oe.returnEnd||oe.excludeEnd||(Y+=B),P(),oe.excludeEnd&&(Y=B));do z.scope&&ne.closeNode(),!z.skip&&!z.subLanguage&&(Te+=z.relevance),z=z.parent;while(z!==q.parent);return q.starts&&te(q.starts,k),oe.returnEnd?0:B.length}function jn(){const k=[];for(let B=z;B!==re;B=B.parent)B.scope&&k.unshift(B.scope);k.forEach(B=>ne.openNode(B))}let ke={};function it(k,B){const G=B&&B[0];if(Y+=k,G==null)return P(),0;if(ke.type==="begin"&&B.type==="end"&&ke.index===B.index&&G===""){if(Y+=v.slice(B.index,B.index+1),!a){const q=new Error(`0 width match regex (${m})`);throw q.languageName=m,q.badRule=ke.rule,q}return 1}if(ke=B,B.type==="begin")return Ln(B);if(B.type==="illegal"&&!S){const q=new Error('Illegal lexeme "'+G+'" for mode "'+(z.scope||"<unnamed>")+'"');throw q.mode=z,q}else if(B.type==="end"){const q=zn(B);if(q!==xt)return q}if(B.type==="illegal"&&G==="")return 1;if(Ue>1e5&&Ue>B.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=G,G.length}const re=D(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Hn=fa(re);let Ge="",z=E||Hn;const ct={},ne=new r.__emitter(r);jn();let Y="",Te=0,ce=0,Ue=0,Fe=!1;try{if(re.__emitTokens)re.__emitTokens(v,ne);else{for(z.matcher.considerAll();;){Ue++,Fe?Fe=!1:z.matcher.considerAll(),z.matcher.lastIndex=ce;const k=z.matcher.exec(v);if(!k)break;const B=v.substring(ce,k.index),G=it(B,k);ce=k.index+G}it(v.substring(ce))}return ne.finalize(),Ge=ne.toHTML(),{language:m,value:Ge,relevance:Te,illegal:!1,_emitter:ne,_top:z}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:Ke(v),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:v.slice(ce-100,ce+100),mode:k.mode,resultSoFar:Ge},_emitter:ne};if(a)return{language:m,value:Ke(v),illegal:!1,relevance:0,errorRaised:k,_emitter:ne,_top:z};throw k}}function d(m){const v={value:Ke(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return v._emitter.addText(m),v}function g(m,v){v=v||r.languages||Object.keys(t);const S=d(m),E=v.filter(D).filter(W).map(P=>p(P,m,!1));E.unshift(S);const _=E.sort((P,K)=>{if(P.relevance!==K.relevance)return K.relevance-P.relevance;if(P.language&&K.language){if(D(P.language).supersetOf===K.language)return 1;if(D(K.language).supersetOf===P.language)return-1}return 0}),[O,Z]=_,R=O;return R.secondBest=Z,R}function h(m,v,S){const E=v&&n[v]||S;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function b(m){let v=null;const S=l(m);if(c(S))return;if(U("before:highlightElement",{el:m,language:S}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new wa("One of your code blocks includes unescaped HTML.",m.innerHTML);v=m;const E=v.textContent,_=S?u(E,{language:S,ignoreIllegals:!0}):g(E);m.innerHTML=_.value,h(m,S,_.language),m.result={language:_.language,re:_.relevance,relevance:_.relevance},_.secondBest&&(m.secondBest={language:_.secondBest.language,relevance:_.secondBest.relevance}),U("after:highlightElement",{el:m,result:_,text:E})}function w(m){r=vt(r,m)}const x=()=>{I(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function f(){I(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let C=!1;function I(){if(document.readyState==="loading"){C=!0;return}document.querySelectorAll(r.cssSelector).forEach(b)}function M(){C&&I()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",M,!1);function $(m,v){let S=null;try{S=v(e)}catch(E){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(E);else throw E;S=s}S.name||(S.name=m),t[m]=S,S.rawDefinition=v.bind(null,e),S.aliases&&L(S.aliases,{languageName:m})}function N(m){delete t[m];for(const v of Object.keys(n))n[v]===m&&delete n[v]}function A(){return Object.keys(t)}function D(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function L(m,{languageName:v}){typeof m=="string"&&(m=[m]),m.forEach(S=>{n[S.toLowerCase()]=v})}function W(m){const v=D(m);return v&&!v.disableAutodetect}function Q(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=v=>{m["before:highlightBlock"](Object.assign({block:v.el},v))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=v=>{m["after:highlightBlock"](Object.assign({block:v.el},v))})}function j(m){Q(m),o.push(m)}function V(m){const v=o.indexOf(m);v!==-1&&o.splice(v,1)}function U(m,v){const S=m;o.forEach(function(E){E[S]&&E[S](v)})}function y(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),b(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:I,highlightElement:b,highlightBlock:y,configure:w,initHighlighting:x,initHighlightingOnLoad:f,registerLanguage:$,unregisterLanguage:N,listLanguages:A,getLanguage:D,registerAliases:L,autoDetection:W,inherit:vt,addPlugin:j,removePlugin:V}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=xa,e.regex={concat:de,lookahead:At,either:Qe,optional:Oo,anyNumberOfTimes:Po};for(const m in De)typeof De[m]=="object"&&kt(De[m]);return Object.assign(e,De),e},ge=_t({});ge.newInstance=()=>_t({});var Ca=ge;ge.HighlightJS=ge;ge.default=ge;const fe=Do(Ca),wt="[A-Za-z$_][0-9A-Za-z$_]*",Sa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ea=["true","false","null","undefined","NaN","Infinity"],Rt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Lt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],zt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ka=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ta=[].concat(zt,Rt,Lt);function jt(e){const t=e.regex,n=(v,{after:S})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,S)!==-1},o=wt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,S)=>{const E=v[0].length+v.index,_=v.input[E];if(_==="<"||_===","){S.ignoreMatch();return}_===">"&&(n(v,{after:E})||S.ignoreMatch());let O;const Z=v.input.substring(E);if(O=Z.match(/^\s*=/)){S.ignoreMatch();return}if((O=Z.match(/^\s+extends\s+/))&&O.index===0){S.ignoreMatch();return}}},r={$pattern:wt,keyword:Sa,literal:Ea,built_in:Ta,"variable.language":ka},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},b={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},f={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},C=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,b,w,{match:/\$\d+/},p];d.contains=C.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(C)});const I=[].concat(f,d.contains),M=I.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(I)}]),$={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:M},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Rt,...Lt]}},D={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[$],illegal:/%/},W={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(v){return t.concat("(?!",v.join("|"),")")}const j={match:t.concat(/\b/,Q([...zt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},$]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[$]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:M,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),D,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,b,w,f,{match:/\$\d+/},p,A,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[f,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:M}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[$,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[$]},j,W,N,U,{match:/\$[(.]/}]}}function Aa(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ia=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",jt),fe.registerLanguage("sh",Aa),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=fe.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function Da(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=Ia(e);return function(){return o({class:n`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},a("Getting Started"),i("Grab the source code template for Javascript or Typescript"),u({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),i("Install the dependencies with the package manager of your choice:"),u({text:`cd my-bau-project
npm install`}),i("This template project is built with Vite. To start a development server:"),u({text:"npm run dev"}),i("The application starting point is at ",s("src/main.ts")),i("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),u({text:'import button from "@grucloud/bau-ui/button";'}),i("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),u({text:"const Button = button(context);"}),i("Last step is to place the button into the tree of component:"),u({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Oe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",...p},...d]=F(r);return a({...p,class:T("paper",u,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}function Ht(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),p=(w,x)=>{let f=null;return(...C)=>{a.clearTimeout(f),f=a.setTimeout(()=>w(...C),x)}},d=o`
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
  `,g=({value:w,id:x,children:f=[]})=>{const C=c({class:()=>u.val==x?"active":"",href:`#${x}`});return C.innerHTML=w,r({class:()=>u.val==x?"active":""},C,f.length>0&&s(f.map(g)))},h=w=>w.tagName.charAt(1),b=({contentEl:w})=>{const x=w.querySelectorAll(l);let f=2,C={},I={children:[]},M=I;const $=M;let N=[M];return[...x].forEach(A=>{const D=h(A);A.setAttribute("id",A.textContent),!A.innerHTML.includes("<button")&&(C={value:A.innerHTML,id:A.id??A.textContent,children:[]},f==D?(I=C,M.children.push(I)):f<D?(N.push(M),M=I,I.children.push(C),I=C):f>D&&(M=N[D-1],N=N.slice(0,D-1),M.children.push(C),I=C),f=D)}),$};return function(...x){let[{color:f,variant:C,size:I="md",contentEl:M,...$}]=F(x);const N=b({contentEl:M}),A=p(()=>{const L=[...M.querySelectorAll(l)].find(W=>{const{top:Q,height:j}=W.getBoundingClientRect();if(Q+j>60)return!0});L&&(u.val=L==null?void 0:L.id)},100);return i({...$,class:T("tableOfContent",I,C,f,d,t==null?void 0:t.class,$==null?void 0:$.class),bauMounted:()=>{a.addEventListener("scroll",A)},bauUnmounted:()=>{a.removeEventListener("scroll",A)}},N.children&&s(N.children.map(g)))}}const Gt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(s(l(d??""),ee.map(g=>l(g)))),i(mo.map(g=>s(l(g),ee.map((h,b)=>r(p({color:h,variant:g},{index:b}))))))))}},Ma=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},go.map((s,r)=>i({color:"success",variant:"outline",size:s},{index:r})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:p}=t.tags;fe.registerLanguage("javascript",jt);const d=Ht(e),g=Oe(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),h=Gt(e),b=Ma(e),w=({text:x})=>u({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=fe.highlight(x,{language:"js"}).value}}));return function(f){const C=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(f.title),r(f.description),f.gridItem&&[c("Variant/Color"),!f.variantColorTableDisable&&f.gridItem&&g(h({Item:f.gridItem(e)})),c("Size"),r("Component with size: ",p("sm"),", ",p("md"),", and ",p("lg")),f.gridItem&&g(b({Item:f.gridItem(e)}))],c("Usage"),l("Import"),w({text:f.importStatement}),c("Examples"),f.examples.map(I=>i(l(I.title),r(I.description),g(I.createComponent(e)()),w({text:I.code}))));return o({class:n`
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
        `},C,d({contentEl:C}))}};function nt(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:g="md",Header:h,Content:b,close:w=!0,...x}]=F(u);const f=n.state(w);return a({...x,class:T("collapsible",g,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>T("header",b?f.val?"close":"open":""),onclick:C=>{f.val=!f.val,C.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:C})=>{f.val&&(C.style.height="0px")},"aria-expanded":({element:C})=>(s({element:C,closeState:f}),!f.val)},b&&b()))}}const Na=()=>ee.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
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
    ${Na()}
  `;return function(...p){let[{color:d,variant:g="outline",size:h="md",data:b=[],...w}]=F(p);const x=n.state(""),f=nt(e),C=M=>$=>{x.val==M?x.val="":x.val=M},I=M=>{const{Header:$,Content:N,name:A}=M,D=()=>r({class:()=>T(x.val==A&&"active")},c({type:"button","aria-controls":`bau-${A}`,"aria-expanded":({element:W})=>x.val==A},$(M))),L=()=>a({id:`bau-${A}`,"data-state":({element:W})=>x.val==A},N(M));return s({class:T(d,g,h),onclick:C(A)},f({Header:D,Content:L}))};return a({class:T("accordion",l,t==null?void 0:t.class,w.class)},i(b.map(I)))}}const Ut=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return s=>i({...s,data:a})},$a=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Ba=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ft=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Pa=e=>{const{css:t}=e,n=Ft(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Oa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,_a=e=>{const{css:t}=e,n=Ft(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ra=`import accordion from "@grucloud/bau-ui/accordion";
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
`,La={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ba,createComponent:$a},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Oa,createComponent:Pa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ra,createComponent:_a}],gridItem:Ut},za=e=>{const t=H(e);return()=>t(La)},ja={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ha=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Ga=()=>ee.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Re(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:s}=n.tags;Ha({css:o,createGlobalStyles:a});const r=o`
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
    ${Ga()}
  `,c=X(e),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:g="outline",color:h="neutral",size:b="md",onRemove:w,...x}=p;return i({...x,class:T(`alert-${g}`,g,h,b,r,t==null?void 0:t.class,p.class,"alert"),role:"alert"},s({class:"icon"},ja[h]),i({class:"content"},...d),w&&l({onclick:w}))}}const Wt=e=>{const t=Re(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Ua=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Re(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Fa=`import alert from "@grucloud/bau-ui/alert";
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
`,Wa=e=>{const{css:t}=e,n=Re(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Va=`import alert from "@grucloud/bau-ui/alert";
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
`,Ka={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Fa,createComponent:Ua},{title:"Custom Alert ",description:"A custom alert.",code:Va,createComponent:Wa}],gridItem:Wt},Za=e=>{const t=H(e);return()=>t(Ka)},Xa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:g})=>{const h=c.val.findIndex(b=>b.id===d);h!=-1&&(c.val[h].status=g)};return function(g={},...h){const b=({id:f})=>{p({id:f,status:"removing"});const C=c.val.findIndex(I=>I.id===f);C!=-1&&c.val.splice(C,1)},w=({Component:f})=>{const C={id:Math.random().toString(10).split(".")[1],Component:f,status:"inserting"};c.val.length>=i&&b({id:c.val[0].id}),c.val.push(C),setTimeout(()=>b(C),s)},x=f=>r({class:u.item,onclick:()=>b(f)},f.Component());return document.addEventListener("alert.add",f=>w(f.detail)),document.addEventListener("alert.remove",f=>b(f.detail)),r({class:T(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),x))}},qa=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Xa(e,{deleteAfterDuration:2e4}),i=X(e),s=Re(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Ya=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ja={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ya,createComponent:qa}]},Qa=e=>{const t=H(e);return()=>t(Ja)},er=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=$e(e),s=X(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},tr=`import animate from "@grucloud/bau-ui/animate";
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
`,nr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=$e(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},or=`import animate from "@grucloud/bau-ui/animate";
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
`,ar={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:tr,createComponent:er},{title:"Component hide and show",description:"Hide and show a component",code:or,createComponent:nr}]},rr=e=>{const t=H(e);return()=>t(ar)};function Vt(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...d){let[{color:g,variant:h="outline",size:b="md",width:w=30,height:x=30,...f},...C]=F(d);return a({class:T(u,t==null?void 0:t.class,f.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:w,height:x,onload:c,onerror:l,class:T(g,h,b,u,t==null?void 0:t.class,f.class),...f}))}}const Kt=e=>{const{css:t}=e,n=Vt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},sr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Vt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},ir=`import avatar from "@grucloud/bau-ui/avatar";
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
`,cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:ir,createComponent:sr}],gridItem:Kt},lr=e=>{const t=H(e);return()=>t(cr)};function ot(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Oe(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...g},...h]=F(l);const b=f=>{x.style.opacity=1,x.showModal();const C=p.getBoundingClientRect(),I=x.getBoundingClientRect();C.x<a.innerWidth/2?x.style.left=C.left+"px":x.style.left=C.right-I.width+"px",C.y<a.innerHeight/2?x.style.top=C.top+C.height+"px":(x.style.top=Math.max(0,C.top-I.height)+"px",I.height>C.top&&(x.style.height=C.top+"px"))},w=f=>{const C=()=>{x.close(),x.removeEventListener("transitionend",C)};x.addEventListener("transitionend",C),x.style.opacity=0},x=i({role:"presentation",class:T("popover",r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:f=>f.target===x&&(w(),d==null?void 0:d.call())},s(u));return x.closeDialog=w,x.openDialog=b,x}}const ur=()=>ee.map(e=>`
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
    outline: 4px auto var(--color-${e});

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
`);function ye(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${ur()}
  `;return function(r){const{size:c="md",variant:l="outline",color:u="neutral",disabled:p,...d}=r;return a({type:"text",...d,disabled:p,class:T("input",c,u,l,i,p&&"disabled",t==null?void 0:t.class,d.class)})}}const dr=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Zt(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=ot(e),r=X(e),c=ye(e),l=we(e),u=o`
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

    ${dr()}
  `;return function(...d){let[{variant:g="outline",color:h,size:b="md",id:w,label:x,placeholder:f,Option:C,options:I,getOptionLabel:M=({label:R})=>R,...$},...N]=F(d);const A=n.state(""),D=n.state(""),L=n.state(!1),W=n.state(0),Q=()=>{L.val=!1},j=n.state(I),V=()=>{Z.openDialog(),L.val=!0,D.val="",j.val=I},U=()=>{Z.closeDialog(),L.val=!1,D.val=""},y=R=>{const{value:P}=R.target;D.val=P,P?j.val=I.filter(K=>M(K).match(new RegExp(`${P}`,"i"))):j.val=I},m=R=>{L.val?U():V()},v=({option:R,index:P})=>K=>{A.val=M(R),W.val=P,U()},S=R=>{switch(console.log("onkeydown",R.key,W.val),R.key){case"Escape":U();break;case"ArrowDown":W.val<j.val.length-1?W.val++:W.val=0;break;case"ArrowUp":W.val<=0?W.val=j.val.length-1:W.val--;break;case"Enter":A.val=M(j.val[W.val]),D.val="",U();break}},E=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":L,"aria-label":x,onclick:m,variant:g,color:h,size:b},()=>!A.val&&x,A),_=c({id:w,value:D,placeholder:f,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":L,oninput:y,onkeydown:S,variant:g,color:h,size:b}),Z=s({id:w,triggerEl:E,contentEl:(()=>a({class:T(g,h,b,"content")},_,()=>l({class:T(g,h,b)},j.val.map((R,P)=>i({class:()=>T(W.val==P&&"active"),onclick:v({option:R,index:P})},C(R))))))(),onClose:Q});return a({...$,class:T("autocomplete",u,t==null?void 0:t.class,$==null?void 0:$.class)},E,Z)}}const Xt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Zt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},pr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Zt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},mr=`import { Context } from "@grucloud/bau-ui/context";
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
`,gr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:mr,createComponent:pr}],gridItem:Xt},br=e=>{const t=H(e);return()=>t(gr)};function qt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...g]=F(r);return a({...d,class:T("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...g)}}const Yt=e=>{const t=qt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=qt(e);return()=>n(o({content:"10"},"☏"))},fr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,vr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:fr,createComponent:hr}],gridItem:Yt},xr=e=>{const t=H(e);return()=>t(vr)};function Jt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:s}=n.tags,r=X(e),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",items:h,...b},...w]=F(u);return a({...b,class:T(c,t==null?void 0:t.class,b==null?void 0:b.class)},h.map(({href:x,name:f})=>i((x?r:s)({href:x,color:p,variant:d,size:g,class:T(p,d,g)},f))))}}const Qt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Jt(e);return o=>n({...o,...t})},wr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Jt(e);return()=>n(a(o))},yr=`import breadcrumbs, {
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
`,Cr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:yr,createComponent:wr}],gridItem:Qt},Sr=e=>{const t=H(e);return()=>t(Cr)},en=e=>{const t=X(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},Er=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},kr=`import button from "@grucloud/bau-ui/button";
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
`,Tr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:kr,createComponent:Er}],gridItem:en},Ar=e=>{const t=H(e);return()=>t(Tr)},Ir=()=>ee.map(e=>`
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
`);function at(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Ir()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:u,...p},...d]=F(r);return a({...p,class:T("button-group",c,u,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const tn=e=>{const t=["ONE","TWO","THREE"],n=X(e),o=at(e);return a=>o({...a},t.map(i=>n(a,i)))},Dr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=X(e),i=at(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Mr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Nr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Mr,createComponent:Dr}],gridItem:tn},$r=e=>{const t=H(e);return()=>t(Nr)};function nn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ee.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...g]=F(c);return a({...d,type:"date",class:T("calendar",s,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const on=e=>{const t=nn(e);return n=>t({...n})},Br=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=nn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Pr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Or={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Pr,createComponent:Br}],gridItem:on},_r=e=>{const t=H(e);return()=>t(Or)};function Rr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:g,Previous:h,Next:b,...w}]=F(c);const x=()=>{s.val<=0?s.val=d.length-1:s.val--},f=()=>{s.val>=d.length-1?s.val=0:s.val++},C=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},d.map(g));return a({...w,class:T("carousel",p,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:T("control","control-previous"),onclick:x},h()),a({class:T("control","control-next"),onclick:f},b()),C)}}const Lr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],zr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=X(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Rr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Lr,Slide:s,Previous:c,Next:l}))},jr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Hr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:jr,createComponent:zr}]},Gr=e=>{const t=H(e);return()=>t(Hr)},an=e=>{const t=Be(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Ur=e=>{const{bau:t}=e,{section:n}=t.tags,o=Be(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Fr=`import chip from "@grucloud/bau-ui/chip";
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
`,Wr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Fr,createComponent:Ur}],gridItem:an},Vr=e=>{const t=H(e);return()=>t(Wr)};function rn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",...p},...d]=F(r);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)})}}const sn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=rn(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Kr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=rn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Zr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Xr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Zr,createComponent:Kr}],gridItem:sn},qr=e=>{const t=H(e);return()=>t(Xr)},Yr=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=nt(e),i=X(e),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},Jr=`import button from "@grucloud/bau-ui/button";
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
`,Qr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Jr,createComponent:Yr}]},es=e=>{const t=H(e);return()=>t(Qr)};function ts(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:p,...d},...g]=F(r);return a({class:T(i,t==null?void 0:t.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},g))}}const ns=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=ts(e),s=X(e),r=Et(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},os=`import drawer from "@grucloud/bau-ui/drawer";
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
`,as={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:os,createComponent:ns}]},rs=e=>{const t=H(e);return()=>t(as)},cn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Ye(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},ss=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Ye(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},is=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,cs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:is,createComponent:ss}],gridItem:e=>cn(e,{base:"/components/drillDownMenu",hashBased:!0})},ls=e=>{const t=H(e);return()=>t(cs)};function ln(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(u,...p){const{variant:d="outline",color:g="neutral",size:h="md",Component:b,disabled:w,...x}=u;return a({class:T(c.base,w&&c.disabled,t==null?void 0:t.class,u.class)},s({class:T(d,g,h)},b({disabled:w}),r({type:"file",disabled:w,...x})),i({class:"filename-display"}))}}const un=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),u=ln(e),p=g=>{const h=g.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:g})=>r({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return g=>u({Component:d,name:"file",accept:"text/*",onchange:p,...g})},us=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),p=ln(e),d=h=>{const b=h.target.files[0];b?u.val=b.name:u.val="No file selected"},g=({disabled:h})=>c({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:g,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},ds=`import classNames from "@grucloud/bau-css/classNames";
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
`,ps={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ds,createComponent:us}],gridItem:un},ms=e=>{const t=H(e);return()=>t(ps)},dn=e=>{const t=ye(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},gs=e=>{const{bau:t}=e,{section:n}=t.tags,o=ye(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},bs=`import input from "@grucloud/bau-ui/input";
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
`,hs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:bs,createComponent:gs}],gridItem:dn},fs=e=>{const t=H(e);return()=>t(hs)};function pn(e,t){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>ee.map(l=>`
&.${l}{
  background-color: var(--color-${l});
}
  `).join(`
`),r=a`
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
      animation: ${r} 1s linear infinite;
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

    ${s()}
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",running:h,...b}]=F(u);return i({...b,role:"progressbar",class:{deps:[h],renderProp:()=>w=>T("linearProgress",g,p,c,w&&"running",t==null?void 0:t.class,b==null?void 0:b.class)}})}}const mn=e=>{const t=pn(e);return n=>t({...n,running:!0})},vs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=X(e),i=pn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},xs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ws={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:xs,createComponent:vs}],gridItem:mn},ys=e=>{const t=H(e);return()=>t(ws)},Me={sm:12,md:16,lg:24},Cs=()=>ee.map(e=>`
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
`);function Le(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u="md",color:p="primary",variant:d="outline",visibility:g=!0,...h}={}){const b=o`
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Me[u]};
      height: ${Me[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${Cs()}
    `;return i({class:{deps:[g],renderProp:()=>w=>T("spinner",b,p,d,w==!1?"":"visibility",t==null?void 0:t.class,h.class)},version:"1.1",x:"0px",y:"0px",width:Me[u],height:Me[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function gn(e,t){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
0% {
      opacity: 1;
}
100% {
      opacity: 0;
}
`,r=o`
    position: relative;
    &:hover.loading {
      cursor: default;
    }
    & .spinner {
      position: absolute;
    }
    & span {
      &.loading {
        animation: ${s} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:g,...h},...b]=F(l);const w=X(e),x=Le(e);return n.bind({deps:[g],render:()=>f=>w({...h,class:T("loadingButton",d,p,u,r,f&&"loading",t==null?void 0:t.class,h==null?void 0:h.class)},x({size:d,variant:p,color:u,visibility:f}),i({class:f&&"loading"},b))})}}const bn=e=>{const t=gn(e);return n=>t({...n,loading:!0},"Save")},Ss=e=>{const{bau:t}=e,{section:n}=t.tags,o=gn(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Es=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,ks={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Es,createComponent:Ss}],gridItem:bn},Ts=e=>{const t=H(e);return()=>t(ks)},As=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Is=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},As.map(s))},Ds=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ms=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=we(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Ds.map(r)))},Ns=`import list from "@grucloud/bau-ui/list";
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
`,$s={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ns,createComponent:Ms}],gridItem:Is},Bs=e=>{const t=H(e);return()=>t($s)};function hn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
    ${(()=>ee.map(r=>`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...g]=F(c);return a({class:T("modal",s,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const fn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=X(e),c=hn(e),l=()=>o(Array(10).fill("").map((p,d)=>s(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(r({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},Ps=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=X(e),l=hn(e),u=()=>o(Array(10).fill("").map((d,g)=>s(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Os=`import modal from "@grucloud/bau-ui/modal";
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
`,_s={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Os,createComponent:Ps}],gridItem:fn},Rs=e=>{const t=H(e);return()=>t(_s)},Ls=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=X(e),r=ot(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},zs=`import popover from "@grucloud/bau-ui/popover";
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
`,js={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:zs,createComponent:Ls}]},Hs=e=>{const t=H(e);return()=>t(js)};function Gs(e,t){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:p})=>({name:d,label:g,href:h})=>s({href:`${a.base}${h}`},r({class:"sublabel"},p),i({class:`label ${p}`},g??d));return function(...d){let[{color:g,variant:h="plain",size:b="md",data:w={},...x}]=F(d);const{next:f,previous:C}=w;return c({"data-paginationnav":JSON.stringify(w),"aria-label":"pages navigation",...x,class:T("paginationNavigation",b,l,t==null?void 0:t.class,x==null?void 0:x.class)},(C==null?void 0:C.href)&&u({text:"Previous"})(C),(f==null?void 0:f.href)&&u({text:"Next"})(f))}}const Us=e=>{const{bau:t}=e,{section:n}=t.tags,o=Gs(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Fs=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Ws={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Fs,createComponent:Us}]},Vs=e=>{const t=H(e);return()=>t(Ws)},Ks=e=>{const{bau:t}=e,{div:n}=t.tags,o=Oe(e);return a=>o({...a},n(`Paper ${a.size??""}`))},Zs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Oe(e);return()=>n(a({size:"md"},o("My content")))},Xs=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,qs={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Xs,createComponent:Zs}],variantColorTableDisable:!0,gridItem:Ks},Ys=e=>{const t=H(e);return()=>t(qs)};function vn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>ee.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
  `).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p="md",...d}]=F(c);return a({...d,type:"radio",class:T("radio-button",p,l,u,s,t==null?void 0:t.class,d==null?void 0:d.class)})}}const xn=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=vn(e);return s=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),o("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},Js=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=vn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},Qs=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,ei={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Qs,createComponent:Js}],gridItem:xn},ti=e=>{const t=H(e);return()=>t(ei)},ni=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function ze(e,t){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=X(e),l=ot(e),u=we(e),p=o`
    & select {
      width: 0;
      height: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ni()}
  `;return function(...g){let[{color:h="neutral",variant:b="outline",size:w="md",label:x,Option:f,options:C,getOptionLabel:I=({label:E})=>E,...M},...$]=F(g);const N=n.state(""),A=n.state(!1),D=n.state(0),L=()=>{v.openDialog(),v.focus(),A.val=!0},W=()=>{v.closeDialog(),A.val=!1},Q=()=>{A.val=!1},j=E=>{A.val?W():L(),E.preventDefault()},V=({option:E,index:_})=>O=>{N.val=I(E),S.value=N.val,S.setCustomValidity(""),D.val=_,W(),O.preventDefault()},U=E=>{switch(E.preventDefault(),E.key){case"Escape":W();break;case"ArrowDown":D.val<C.length-1?D.val++:D.val=0;break;case"ArrowUp":D.val<=0?D.val=C.length-1:D.val--;break;case"Enter":A.val?(N.val=I(C[D.val]),W()):L();break}},y=()=>u({tabindex:"0",class:T(h,b)},C.map((E,_)=>i({class:()=>T(D.val==_&&"active"),onclick:V({option:E,index:_})},f(E)))),m=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":A,"aria-label":x,onclick:j,color:h,variant:b,size:w},()=>!N.val&&x,N),v=l({triggerEl:m,contentEl:y(),onClose:Q}),S=s(M,r({value:""},"--Select Category--"),C.map(E=>r(I(E))));return a({...M,class:T("select",h,w,p,t==null?void 0:t.class,M==null?void 0:M.class),onkeydown:U},S,m,v)}}const wn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=ze(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},oi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=ze(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},ai=`import select from "@grucloud/bau-ui/select";
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
`,ri=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=ze(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},si=`import select from "@grucloud/bau-ui/select";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { span, form } = bau.tags;

  const Select = select(context);

  const options: any = [
    "eu-north-1",
    "ap-south-1",
    "eu-west-3",
    "eu-west-2",
    "eu-west-1",
    "ap-northeast-3",
    "ap-northeast-2",
    "ap-northeast-1",
    "sa-east-1",
    "ca-central-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "eu-central-1",
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
  ];

  const Option = (option: any) => span({}, option);

  return () =>
    form(
      Select({
        options,
        Option,
        label: "Select a region",
        getOptionLabel: (label: any) => label,
      })
    );
};
`,ii={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:ai,createComponent:oi},{title:"Select AWS region",description:"Select the AWS region",code:si,createComponent:ri}],gridItem:wn},ci=e=>{const t=H(e);return()=>t(ii)};function je(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>ee.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...g]=F(c);return a({...d,type:"range",class:T("slider",l,u,p,s,t==null?void 0:t.class,d.class)},...g)}}const yn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=je(e);return i=>a({...i,oninput:o})},li=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=je(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},ui=`import slider from "@grucloud/bau-ui/slider";
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
`,di=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=je(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},pi=`import slider from "@grucloud/bau-ui/slider";
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
`,mi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=je(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},gi=`import slider from "@grucloud/bau-ui/slider";
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
`,bi={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ui,createComponent:li},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:pi,createComponent:di},{title:"Vertical Mark",description:"A vertical slider with marks.",code:gi,createComponent:mi}],gridItem:yn},hi=e=>{const t=H(e);return()=>t(bi)},Cn=e=>{const t=Le(e);return n=>t({...n})},fi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Le(e);return()=>n(o({}))},vi=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,xi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:vi,createComponent:fi}],gridItem:Cn},wi=e=>{const t=H(e);return()=>t(xi)},yi=()=>ee.map(e=>`
`).join(`
`);function Sn(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:s,span:r}=n.tags,c=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0;
      list-style: none;
      & > li {
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
    ${yi()}
  `;return function(...u){let[{color:p,variant:d="plain",size:g,stepperDefs:h=[],activeStepIndex:b,...w},...x]=F(u);const f=n.state(h.map(($,N)=>({...$,index:N}))),C=n.derive(()=>f.val[b.val]),I=$=>{const{Header:N,disabled:A,name:D,index:L}=$;return s({class:()=>T(C.val.name==D&&"active",b.val<L&&"not-completed",b.val>L&&"completed",A&&"disabled")},r({class:"step-number"},L+1),r({class:"step-label"},()=>N($)))};return a({class:T("stepper",d,g,p,c,t==null?void 0:t.class,w.class)},n.loop(f,i(),I),n.bind({deps:[C],render:()=>$=>$.Content?$.Content({}):""}))}}const Ci=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=Sn(e),r=X(e),c=({name:h})=>h,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),p=()=>{u.val>0&&u.val--},d=()=>{l.length>u.val+1&&u.val++},g=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:p,variant:"outline",color:"primary"},"Previous"),r({onclick:d,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),g())},Si=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Ei=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=X(e);return function({onclickProvider:p}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({onclick:p("AWS"),variant:"outline",color:"primary"},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({onclick:p("Azure"),variant:"outline",color:"primary"},r({width:261,height:90,viewBox:"0 0 261 75",fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`})))))}};function En(e,t){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    & label {
      display: inline-flex;
      flex-direction: column;
      gap: 0.3rem;
      font-weight: 500;
    }
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...g]=F(r);return a({...d,class:T("form",c,l,u,i,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const kn=e=>{const{bau:t}=e,{i:n}=t.tags,o=X(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},ki=e=>{const{bau:t}=e,{span:n}=t.tags,o=ze(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},Ti=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,footer:s,p:r,label:c,i:l}=t.tags,u=X(e),p=ye(e),d=En(e),g=kn(e),h=ki(e);return function({onclickPrevious:w,onclickNext:x}){return d({name:"form-config-aws",onsubmit:C=>{C.preventDefault(),x()},"data-infra-create":!0},i(a("AWS Configuration"),r("Please provide the following information to create and scan a new infrastructure")),o(c("Infrastructure Name",p({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),c("Access Key Id",p({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),c("Secret Key",p({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),c("Region",h({name:"region"}))),s({class:n`
            display: flex;
            gap: 1rem;
          `},g({onclick:w}),u({type:"submit",variant:"outline",color:"primary"},"Next",l("▶"))))}},Ai=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,footer:s,p:r,label:c,i:l,ol:u,li:p,h3:d,pre:g,em:h,div:b}=t.tags,w=X(e),x=kn(e),f=ye(e),C=En(e);return function({onclickPrevious:M,onclickNext:$}){return C({name:"form-config-azure",onsubmit:A=>{A.preventDefault(),$()},"data-infra-create":!0,class:n``},i(a("Azure Configuration"),r("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(u({class:n`
              list-style: none;
              counter-reset: counter;
              padding-left: 40px;
              > li {
                counter-increment: counter;
                margin: 0 0 0.5rem 0;
                position: relative;
                ::before {
                  background-color: var(--color-primary);
                  color: var(--font-color-inverse);
                  content: counter(counter) ".";
                  font-weight: bold;
                  position: absolute;
                  --size: 32px;
                  left: calc(-1 * var(--size) - 10px);
                  line-height: var(--size);
                  width: var(--size);
                  height: var(--size);
                  top: -0rem;
                  border-radius: 50%;
                  text-align: center;
                }
              }
            `},p(d("Subscription Id"),r("Retrieve the ",h("Subscription Id")," with the following command:"),g("az account show --query id -otsv"),c("Subscription Id",f({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0}))),p(d("Tenant Id"),r("Retrieve the ",h("Tenant Id")," with the following command:"),g("az account show"),c("Tenant Id",f({"data-input-azure-tenant-id":!0,autofocus:!0,placeholder:"Tenant Id",name:"tenantId",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0}))),p(d("App ID and PASSWORD"),r("Retrieve the ",h("APP_ID")," and ",h("PASSWORD")," by creating a service principal called grucloud:"),g('az ad sp create-for-rbac -n "grucloud"'),b({class:n`
                  display: flex;
                  gap: 1rem;
                `},c("App Id",f({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),c("Password",f({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})))))),s({class:n`
            display: flex;
            gap: 1rem;
          `},x({onclick:M}),w({type:"submit",variant:"outline",color:"primary"},"Next",l("▶"))))}},Ii=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=Sn(e),r=Ei(e),c=Ti(e),l=Ai(e),u=t.state("Azure"),p=t.state(1),d=({name:f})=>f,g=f=>()=>{u.val=f,p.val++},b=[{name:"Provider Selection",Header:d,Content:()=>r({onclickProvider:g}),enter:async()=>{u.val=""}},{name:"Configuration",Header:()=>`Configuration ${u.val}`,Content:()=>{switch(u.val){case"AWS":return c({onclickPrevious:w,onclickNext:x});case"Azure":return l({onclickPrevious:w,onclickNext:x})}}},{name:"Scan",Header:d,Content:()=>a(i("My stepper 3 Content"))}],w=()=>{p.val>0&&p.val--},x=()=>{b.length>p.val+1&&p.val++};return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:b,activeStepIndex:p}))},Di=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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

  // const providerNameState = bau.state("");
  // const activeStepIndex = bau.state(0);

  // For testing
  const providerNameState = bau.state("Azure");
  const activeStepIndex = bau.state(1);

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
`,Mi={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:Si,createComponent:Ci},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Di,createComponent:Ii}]},Ni=e=>{const t=H(e);return()=>t(Mi)},$i=()=>ee.map(e=>`
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
`);function Tn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${$i()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=F(r);return a({...p,class:T("switch",i,c,l,u,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const An=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=Tn(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},Bi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=Tn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Pi=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Oi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Pi,createComponent:Bi}],gridItem:An},_i=e=>{const t=H(e);return()=>t(Oi)},Ri=()=>ee.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Ce(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=o`
    display: flex;
    flex-direction: column;
    & > ul {
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
    ${Ri()}
  `;return function(...u){let[{color:p,variant:d="plain",size:g,...h},...b]=F(u);const w=n.state(a),x=n.state(a[0]),f=M=>w.val.find($=>$.name==M),C=M=>{const{Header:$,disabled:N,name:A}=M;return r({class:()=>T(x.val.name==A&&"active",N&&"disabled"),onclick:D=>D.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:A},bubbles:!0}))},$(M))},I=i({class:T("tabs",d,g,p,c,t==null?void 0:t.class,h.class)},n.loop(w,s(),C),()=>x.val.Content?x.val.Content({}):"");return I.addEventListener("tab.select",M=>{var A,D;const{tabName:$}=M.detail,N=f($);N&&((A=x.val.exit)==null||A.call(),x.val=N,(D=N.enter)==null||D.call())},!1),I.addEventListener("tab.add",M=>{var N;const{tab:$}=M.detail;(N=$.enter)==null||N.call(),w.val.push($)},!1),I.addEventListener("tab.remove",M=>{var N;const $=w.val.findIndex(A=>A.name==M.detail.tabName);$>0&&((N=w.val[$].exit)==null||N.call(),w.val.splice($,1))},!1),I}}const In=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ce(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},Li=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ce(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},zi=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ji=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ce(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},Hi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Dn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Gi=e=>{const{css:t}=e,n=Ce(e,{tabDefs:Dn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Ui=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Fi=e=>{const{css:t}=e,n=Dn(e),o=Ce(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Wi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Vi={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:zi,createComponent:Li},{title:"Extended Tabs",description:"An extended tabs.",code:Hi,createComponent:ji},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Ui,createComponent:Gi},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Wi,createComponent:Fi}],gridItem:In},Ki=e=>{const t=H(e);return()=>t(Vi)};function Se(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=F(c);return i({...l,class:T("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Zi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function p(w,x,f,C,I){return{name:w,calories:x,fat:f,carbs:C,protein:I}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:w,calories:x})=>s(i(w),i({class:n`
            text-align: right;
          `},x)),h=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Se(e,{class:n`
      max-width: 650px;
    `});return()=>o(b(r(u("Basic Table"),h(),l(d.map(g)))))},Xi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const qi=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Yi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:b})=>s(i(h),i({class:n`
            text-align: right;
          `},b)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Se(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),d(),l(qi.map(p)))))},Ji=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Qi=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],ec=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:b})=>s(i(h),i({class:n`
            text-align: right;
          `},b)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Se(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),d(),l(Qi.map(p)))))},tc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,nc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Xi,createComponent:Zi},{title:"Dense",description:"A dense table.",code:Ji,createComponent:Yi},{title:"Zebra",description:"A zebra table.",code:tc,createComponent:ec}]},oc=e=>{const t=H(e);return()=>t(nc)},ac=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=Ht(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},rc=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,sc={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:rc,createComponent:ac}]},ic=e=>{const t=H(e);return()=>t(sc)};function Mn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=at(e),s=X(e),r=Le(e),c=o`
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
  `,l=({label:h,icon:b,...w})=>s({"aria-label":h,title:h,...w},b),u=({count:h,totalCount:b,page:w,rowsPerPage:x})=>a({class:"pages-numbers"},Number(w-1)*Number(x)+(h>0?1:0),"-",Math.min(w*x,b)," of ",b),p=({count:h,page:b,rowsPerPage:w})=>a({class:"pages-numbers"},(b-1)*w+(h>0?1:0),"-",b*w),d=h=>h<=1,g=(h,b,w)=>h>=Math.ceil(b/w);return function(...b){let[{count:w=0,totalCount:x=0,page:f=1,rowsPerPage:C=50,onPageChange:I,isLoading:M=!1,disableFirst:$=()=>d(f),disablePrevious:N=()=>d(f),disableNext:A=()=>g(f,x,C),disableLast:D=()=>g(f,x,C),...L},...W]=F(b);const Q=Math.max(0,Math.ceil(x/C)),j=I({page:1}),V=I({page:f-1}),U=I({page:f+1}),y=I({page:Q}),m=[{label:"First",icon:"⟪",onclick:j,disabled:$()},{label:"Previous",icon:"⟨",onclick:V,disabled:N()},{label:"Next",icon:"⟩",onclick:U,disabled:A()},{label:"Last",icon:"⟫",onclick:y,disabled:D()}];return a({...L,class:T("table-pagination",c,M&&"disabled",t==null?void 0:t.class,L==null?void 0:L.class)},r({class:"spinner",visibility:M,size:"md"}),x>0?u({count:w,totalCount:x,page:f,maxPages:Q,rowsPerPage:C}):p({count:w,page:f,maxPages:Q,rowsPerPage:C}),i({variant:"outline",color:"neutral"},m.map(v=>l({...v,variant:"outline",color:"neutral"}))))}}const cc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),lc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=cc(45),u=({name:f,email:C})=>i(a(f),a(C)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=Mn(e),g=Se(e,{class:n`
      max-width: 650px;
    `}),h=t.state(l),b=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),w=t.derive(()=>h.val.slice(b.val.page*b.val.rowsPerPage,(b.val.page+1)*b.val.rowsPerPage)),x=({page:f})=>C=>{b.val.page=f};return()=>g(s(p(),()=>c(w.val.map(u))),()=>d({...b.val,onPageChange:x}))},uc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),g=t.derive(()=>p.val.length),h=t.state(1),b=t.state(10),w=t.derive(()=>p.val),x=D=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(D).toString()}`,f=({page:D})=>L=>{h.val=D,C(x({page:D,per_page:b.val}))};C(x({page:1,per_page:b.val}));async function C(D){try{u.val=!0;const L=await fetch(D,{});if(L.ok){const W=await L.json();p.val=W;return}throw L}catch(L){d.val=L.message}finally{u.val=!1}}const I=({name:D,description:L,stargazers_count:W})=>i(a(D),a(L),a({class:n`
            text-align: right;
          `},W)),M=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),$=Mn(e),N=Se(e,{class:n`
      min-width: 650px;
    `}),A=({message:D})=>l(D);return()=>N(()=>$({rowsPerPage:b.val,page:h.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:f,disableNext:()=>!1}),s(M(),()=>d.val&&A({message:d.val}),()=>c(w.val.map(I))))},dc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=lc(e),l=uc(e),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Ee(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.2);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.16)
    }
  `;const s=o`
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
  `;return function(...c){let[{color:l,variant:u,size:p="md",selected:d=!1,disabled:g,onChange:h,...b},...w]=F(c);return i({type:"button",...b,"aria-pressed":{deps:[d],renderProp:()=>x=>x},class:{deps:[d],renderProp:()=>x=>T("toggle",p,l,u,s,x&&"selected",t==null?void 0:t.class,b==null?void 0:b.class)},disabled:g},w)}}const Nn=e=>{const{bau:t}=e,n=Ee(e);return console.log("grid item"),o=>{const a=t.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},pc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ee(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},mc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,gc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:mc,createComponent:pc}],gridItem:Nn},bc=e=>{const t=H(e);return()=>t(gc)},hc=()=>ee.map(e=>`
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
`);function rt(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${hc()}
  `;return function(...r){let[{color:c,variant:l="plain",size:u="md",exclusive:p=!1,onChange:d=()=>{},...g},...h]=F(r);const b=new Set,w=x=>{const{value:f}=x.target;p?(b.clear(),b.add(f)):b.has(f)?b.delete(f):b.add(f),d({event:x,values:[...b]})};return a({...g,class:T("toggle-group",u,c,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:w},...h)}}const $n=e=>{const{bau:t}=e,n=rt(e),o=Ee(e);return a=>{const i=t.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return n({...a,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:l})=>()=>o({...a,value:l,selected:i.val.includes(l),"area-label":c},c)))}},fc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Ee(e),s=rt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},vc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,xc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Ee(e),s=rt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},wc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,yc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:vc,createComponent:fc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:wc,createComponent:xc}],gridItem:$n},Cc=e=>{const t=H(e);return()=>t(yc)};function st(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:g="md",...h},...b]=F(c);const w=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,g),role:"tooltip"},l)),x=N=>`move-to-${N}`,f=(N,A,D)=>{if(N()){const L=x(A);w.classList.add(L),w.classList.add(A),w.classList.remove(D)}},C=(N,A)=>{const D=x(N);w.classList.contains(D)&&(w.classList.remove(D),w.classList.add(A),w.classList.remove(N))},I=N=>{const A=w.getBoundingClientRect();f(()=>A.x<0,"right","left"),f(()=>A.x+A.width>a.innerWidth,"left","right"),f(()=>A.y<0,"bottom","top"),f(()=>A.bottom>a.innerHeight,"top","bottom"),w.classList.add("visible")},M=N=>{w.classList.remove("visible"),C("right","left"),C("left","right"),C("bottom","top"),C("top","bottom")};return i({...h,class:T("tooltip",s,t==null?void 0:t.class,h==null?void 0:h.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",I),N.addEventListener("mouseout",M)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",I),N.removeEventListener("mouseout",M)}},...b,w)}}const Bn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,s=X(e),r=st(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Sc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=X(e),s=st(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Ec=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,kc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=(...p)=>Be(e)({variant:"outline",color:"primary"},p),c=st(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Tc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ac={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Ec,createComponent:Sc},{title:"Grid",description:"Various tooltip position",code:Tc,createComponent:kc}],gridItem:Bn},Ic=e=>{const t=H(e);return()=>t(Ac)},Pn=e=>{const t=qe(e);return n=>t(n)},Dc=e=>{const{bau:t}=e,{section:n}=t.tags,o=qe(e);return()=>n(o({}))},Mc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Nc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Mc,createComponent:Dc}],gridItem:Pn},$c=e=>{const t=H(e);return()=>t(Nc)},Bc=({css:e,createGlobalStyles:t})=>(t`
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

      & > li {
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
  `});function On(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Bc({css:o,createGlobalStyles:a}),p=nt(e),d=({depth:g=1,maxDepth:h,color:b,variant:w,size:x})=>f=>{const{children:C,expanded:I}=f,M=n.state(!I),$=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:A=>{C&&(M.val=!M.val)}},i(f.data)),N=()=>s({class:T(b,x)},C.map(d({depth:g+1,maxDepth:h})));return r(p({Header:$,Content:C&&g<h&&N}))};return function({tree:h,maxDepth:b=1/0,size:w="md",variant:x="plain",color:f="neutral",...C}){return c({class:T(u.nav,w,x,f,t==null?void 0:t.class,C.class)},h.children&&s(h.children.map(d({maxDepth:b,color:f,variant:x,size:w}))))}}const _n=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=On(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},Pc=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=On(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Oc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,_c={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Oc,createComponent:Pc}],gridItem:_n},Rc=e=>{const t=H(e);return()=>t(_c)},Lc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=Gt(e),u=X(e),p=[{name:"Accordion",Item:Ut(e)},{name:"Alert",Item:Wt(e)},{name:"Autocomplete",Item:Xt(e)},{name:"Avatar",Item:Kt(e)},{name:"Badge",Item:Yt(e)},{name:"Breadcrumbs",Item:Qt(e)},{name:"Button",Item:en(e)},{name:"Button Group",Item:tn(e)},{name:"Calendar",Item:on(e)},{name:"Checkbox",Item:sn(e)},{name:"Chip",Item:an(e)},{name:"DrillDown Menu",Item:cn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:un(e)},{name:"Input",Item:dn(e)},{name:"Linear Progress",Item:mn(e)},{name:"Loading Button",Item:bn(e)},{name:"Modal",Item:fn(e)},{name:"Radio Button",Item:xn(e)},{name:"Select",Item:wn(e)},{name:"Slider",Item:yn(e)},{name:"Spinner",Item:Cn(e)},{name:"Switch",Item:An(e)},{name:"Tabs",Item:In(e)},{name:"Theme Switch",Item:Pn(e)},{name:"Toggle",Item:Nn(e)},{name:"Toggle Group",Item:$n(e)},{name:"Tooltip",Item:Bn(e)},{name:"Tree View",Item:_n(e)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},zc=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:ko(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:Da(e)})},{path:"components",action:()=>({title:"Component",component:Lc(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:za(e)})},{path:"alert",action:()=>({title:"Alert",component:Za(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Qa(e)})},{path:"animate",action:()=>({title:"Animate",component:rr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:br(e)})},{path:"avatar",action:()=>({title:"Avatar",component:lr(e)})},{path:"badge",action:()=>({title:"Badge",component:xr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Sr(e)})},{path:"button",action:()=>({title:"Button",component:Ar(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:$r(e)})},{path:"calendar",action:()=>({title:"Calendar",component:_r(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Gr(e)})},{path:"chip",action:()=>({title:"Chip",component:Vr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:qr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:es(e)})},{path:"drawer",action:()=>({title:"Drawer",component:rs(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:ls(e)})},{path:"fileInput",action:()=>({title:"File Input",component:ms(e)})},{path:"input",action:()=>({title:"Input",component:fs(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ys(e)})},{path:"list",action:()=>({title:"List",component:Bs(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Ts(e)})},{path:"modal",action:()=>({title:"Modal",component:Rs(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Vs(e)})},{path:"paper",action:()=>({title:"Paper",component:Ys(e)})},{path:"popover",action:()=>({title:"Popover",component:Hs(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:ti(e)})},{path:"select",action:()=>({title:"Select",component:ci(e)})},{path:"slider",action:()=>({title:"Slider",component:hi(e)})},{path:"spinner",action:()=>({title:"Spinner",component:wi(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Ni(e)})},{path:"switch",action:()=>({title:"Switch",component:_i(e)})},{path:"table",action:()=>({title:"Table",component:oc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:ic(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:dc(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Ki(e)})},{path:"toggle",action:()=>({title:"Toggle",component:bc(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Cc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ic(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:$c(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Rc(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Io(e)})}],jc=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Hc=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:g=t}=l.resolve({pathname:u});s.val=d({}),document.title=`${p}`}},Gc=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};oo();const Rn={title:"Bau",base:"/bau/bau-ui"},le=po({config:Rn}),{bau:Uc}=le;le.states={drawerOpen:Uc.state(!0)};Gc(le);Kn({routes:zc({context:le}),onLocationChange:Hc({context:le,LayoutDefault:yo(le),config:Rn}),notFoundRoute:jc(le)});
