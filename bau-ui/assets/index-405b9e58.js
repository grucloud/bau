(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Bn=(e,t)=>({...e,paths:[...t,e.path]}),vt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Bn(o,e);return n?[a,...vt({paths:[...e,o.path],routes:n})]:a}),_n=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Pn=({routes:e=[],notFoundRoute:t})=>{const n=vt({routes:e}).map(o=>({...o,regex:_n(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function On({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Pn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ve=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Rn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Ln=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],st=e=>`var(--color-${e})`,jn=e=>`var(--color-${e}-lightest)`,zn=()=>Ve.map(([e])=>`
.outline.${e} {
  border: 2px solid ${st(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${jn(e)};
}
.solid.${e} {
  background-color: ${st(e)};
}
`).join(`
`),Hn=()=>Ve.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Un=e=>100-e*10,Gn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Un(t)}%);`).join(`
`),it=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Fn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Rn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Ln.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Vn({createGlobalStyles:e},{colorPalette:t=Ve}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>Fn([n,o])).join(`
`)}
      ${Gn()}
      ${it({})}
      ${zn()}
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
      ${Hn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${it({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Wn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let We=e=>Object.prototype.toString.call(e??0).slice(8,-1),Zn=e=>We(e)=="Object",ct=e=>We(e)=="Function",Ue=e=>["Object","Array"].includes(We(e)),lt=Object.getPrototypeOf,Ge=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,Xn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const X=e=>!me(e[0])&&Zn(e[0])?e:[{},...e];function Kn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=v=>n.createElement(v),l=(v,m,b)=>{let w=r;r=m;let E=v(b);return r=w,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(v=>{v.bindings=v.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!v.bindings.length&&!v.computed&&a.delete(v)}),o=void 0}))},p=(v,m,b,w,E,_)=>{var I;if(s){i.add(v);return}for(let W of v.bindings){let{deps:N,element:M,renderInferred:V,render:J,renderItem:Q}=W;if(Q&&m)(I=h(M,w,(...ae)=>x(Q(...ae)),b,E,_)[m])==null||I.call();else{let ae=V?V({element:M}):J({element:M,renderItem:Q})(...N.map(Ge));ae!==M&&M.replaceWith(W.element=x(ae))}}S(v),u()},d=(v,m,b=[])=>({get(w,E,_){var I;if(r==null||r.add(v),E==="_isProxy")return!0;if(!((I=w[E])!=null&&I._isProxy)&&!me(w[E])&&Ue(w[E]))w[E]=new Proxy(w[E],d(v,m,[...b,E]));else if(Xn.includes(E)){let W=w[E];return(...N)=>{let M=W.apply(w,N);return p(v,E,M,N,m,b),M}}return Reflect.get(w,E,_)},set(w,E,_,I){let W=Reflect.set(w,E,_,I);return p(v,"setItem",W,{prop:E,value:_},m,[...b,E]),W}}),g=(v,m)=>new Proxy(m,d(v,m)),h=(v,m,b,w,E,_)=>{let I=()=>v.replaceChildren(...ke(w,b)),W=N=>v[N]&&v.removeChild(v[N]);return{assign:I,sort:I,reverse:I,setItem:()=>{var M;let N=_[0];(M=v.children[N])==null||M.replaceWith(b(E[N],N))},push:()=>v.append(...ke(m,(N,M)=>b(N,E.length+M))),unshift:()=>v.prepend(...ke(m,b)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{let[N,M,...V]=m;const{length:J}=v.children;for(let Q=N>=0?Math.min(N+M-1,J-1):J-1;Q>=(N>=0?N:J+N);Q--)v.children[Q].remove();if(V.length){let Q=V.forEach((ae,Le)=>b(ae,N+Le));v.children[N]?v.children[N].after(...Q):v.append(...Q)}}}},f=v=>({oldVal:v,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=Ue(v)?g(m,v):v,m.valProxy)},set val(m){let b=this,w=b.val;Ue(m)?(b.valProxy=g(b,m),p(b,"assign",m)):m!==w&&(b.valProxy=m,p(b)),b.oldVal=w}}),x=v=>v==null||v===!1?c("span"):v.nodeType?v:n.createTextNode(v),y=(v,m)=>{let b=new Set;return m.val=l(v,b),b},C=v=>{let m=f(),b=y(v,m);m.computed=!0;for(let w of b)w.listeners.push({computed:v,deps:b,state:m});return m},S=v=>{for(let m of[...v.listeners])y(m.computed,m.state)},B=(v,...m)=>{if(m.length){let b=[];for(let w of m.flat(1/0))w!=null&&b.push(me(w)?j({deps:[w],render:()=>E=>E}):ct(w)?te({renderInferred:w}):x(w));v.append(...b)}},P={},L=(v,m)=>v&&(Object.getOwnPropertyDescriptor(v,m)??L(lt(v),m)),D=(v,m,b)=>{var w;return P[v+","+m]??(P[v+","+m]=((w=L(b,m))==null?void 0:w.set)??0)},O=(v,m)=>new t.MutationObserver((b,w)=>{b.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(_=>_===v&&(m({element:v}),w.disconnect(),!0)))}).observe(v.parentNode,{childList:!0}),$=(v,m)=>new t.MutationObserver((b,w)=>b.forEach(E=>m({record:E,element:v}))).observe(v,{childList:!0}),H=v=>new Proxy(function(b,...w){var W;let[E,..._]=X(w),I=v?n.createElementNS(v,b):c(b);for(let[N,M]of Object.entries(E)){if(N.startsWith("bau"))continue;let V=D(b,N,lt(I))?J=>I[N]=J:J=>I.setAttribute(N,J);M==null||(me(M)?j({deps:[M],render:()=>()=>(V(M.val),I)}):ct(M)&&(!N.startsWith("on")||M.isDerived)?te({renderInferred:()=>(V(M({element:I})),I)}):M.renderProp?j({deps:M.deps,render:()=>()=>(V(M.renderProp({element:I})(...M.deps.map(Ge))),I)}):V(M))}return E.bauChildMutated&&$(I,E.bauChildMutated),B(I,..._),(W=E.bauCreated)==null||W.call(E,{element:I}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:I})),E.bauUnmounted&&t.requestAnimationFrame(()=>O(I,E.bauUnmounted)),I},{get:(m,b)=>m.bind(void 0,b)}),q=(v,m,b)=>{v.element=x(b);for(let w of m)me(w)&&(a.add(w),w.bindings.push(v));return v.element},te=({renderInferred:v,element:m})=>{let b=new Set,w=l(v,b,{element:m});return q({renderInferred:v},b,w)},j=({deps:v,element:m,render:b,renderItem:w})=>q({deps:v,render:b,renderItem:w},v,b({element:m,renderItem:w})(...v.map(Ge))),F=(v,m,b)=>j({deps:[v],render:({renderItem:w})=>E=>(m.append(...ke(E,w)),m),renderItem:b}),U=v=>{s=!0,v(),s=!1,i.forEach(p),i.clear()};return{tags:H(),tagsNS:H,state:f,bind:j,loop:F,derive:C,stateSet:a,batch:U}}const Yn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},qn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Jn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Qn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=Jn(a,i),r=Yn(s);return!t.getElementById(r)&&qn(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function eo(e){const t=Kn(),n=Qn();return Vn(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function Ie(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!s()||d.getAttribute("cloned"))return;const g=d.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=d.getAttribute("width"),g.style.height=d.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),u.target.appendChild(g),g.addEventListener("animationend",()=>g.parentNode.removeChild(g))}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const g=d.getBoundingClientRect();if(d.setAttribute("width",g.width+"px"),d.setAttribute("height",g.height+"px"),r()){d.style.animation=r();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function K(e,t){const{bau:n,css:o}=e,a={root:o`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;
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
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:u,href:p,...d},...g]=X(s);return(p?n.tags.a:n.tags.button)({...d,class:T("button",a.root,c,l,r,p?a.a:a.button,u&&a.disabled,t==null?void 0:t.class,d.class),disabled:u,href:p,...!p&&{type:"button"}},g)}}const oe=["neutral","primary","success","danger","warning"],to=["plain","outline","solid"],no=["sm","md","lg"],oo="light",ao=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Ze(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(oo);const l=o`
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
    ${ao()}
  `;return function(...p){let[{color:d,variant:g="outline",size:h="md",...f},...x]=X(p);return i({required:"required",title:"Switch Theme",...f,class:T("theme-switch",d,g,h,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:r()=="dark",onclick:y=>{s(y.target.checked?"dark":"light")}},...x)}}function ro(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:p,b:d,ul:g,li:h}=n.tags,{svg:f,path:x}=n.tagsNS("http://www.w3.org/2000/svg"),y=i.drawerOpen,C=K(e,{class:o`
      background: transparent;
    `}),S=Ze(e),B=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},x({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),P=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},C({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},B()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(t("Bau UI")))),L=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),C({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},P(),L())}}function so({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:p}=t.tags,d=({links:f,title:x})=>o({class:n`
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
        `},p(x),r(f.map(({href:y,name:C})=>c(s({href:y},C))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=X(r);return a({...p,class:T("list",i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Te="0.3s",xt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(xt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},wt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=wt(e)(t.children[o]);if(a)return a}},io=({keyframes:e})=>({hideToLeft:e`
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
   `});function Xe(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=j=>{var F;return((F=j.parentTree.data)==null?void 0:F.href)??j.parentTree.children[0].data.href},u=({variant:j,color:F,size:U,currentTree:v,data:m})=>S(D({variant:j,color:F,size:U,href:`${c}${l(v)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:j,color:F,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:j,subTree:{data:{name:F,href:U},children:v=[]}})=>D({size:j,href:`${c}${U}`,"data-ischild":!v.length},F),d=({pathname:j,subTree:F})=>{var U;return j===((U=F==null?void 0:F.data)==null?void 0:U.href)},{renderHeader:g=u,renderMenuItem:h=p,isActive:f=d}=t,{li:x,nav:y,div:C,header:S,a:B}=n.tags,P=Ie(e),L=we(e),D=K(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:O,hideToRight:$}=io(e),H=o`
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
  `,q=({variant:j,color:F,size:U,currentTree:v,pathnameState:m})=>{const{children:b,parentTree:w,data:E}=v;return C({class:T("drillDownMenu",j,F,U)},w&&g({variant:j,color:F,size:U,data:E,currentTree:v}),b&&L({class:T(j,F,U)},b.map(_=>x({class:()=>T(_.children&&"has-children",f({pathname:m.val,subTree:_})&&"active")},h({variant:j,color:F,size:U,subTree:_})))))},te=({tree:j,pathname:F})=>{let U=xt({})(structuredClone(j)),v=wt(F)(U);return v||(console.error("drilldown no sub tree",F),v=U),v};return function(F){const{variant:U="plain",color:v="neutral",size:m="md",tree:b,...w}=F,E=n.state(a.location.pathname.replace(c,"")),_=n.derive(()=>te({tree:b,pathname:E.val}));a.document.addEventListener("click",V=>{const{target:J}=V,Q=J.getAttribute("href");if(J.tagName==="A"&&Q&&!Q.startsWith("http")){let ae=Q.replace(c,"");r||(ae=ae.replace(J.hash,"")),E.val=ae}});let I=1;const W=V=>{const{dataset:J}=V.target;J.buttonback=="true"?I=-1:J.ischild=="false"?I=1:J.ischild=="true"&&(I=0)},N=V=>{switch(V){case 1:return`${O} ${Te}`;case-1:return`${$} ${Te}`;default:return""}},M=V=>{switch(V){case 1:return`${$} ${Te} reverse`;case-1:return`${O} ${Te} reverse`;default:return""}};return y({class:T(H,t==null?void 0:t.class,w.class),onclick:W},P({animationHide:()=>N(I),animationShow:()=>M(I)},()=>q({variant:U,color:v,size:m,currentTree:_.val,pathnameState:E})))}}const co={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function yt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let g=!1;const h=Xe(e);return function(){return r({bauMounted:({element:x})=>{s.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:x=>{g&&!x.target.dataset.buttonback&&!x.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},h({tree:co}))}}const lo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ie(e),r=ro(e),c=yt(e),l=so(e),u=a`
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
            overflow-y: scroll;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val&&g.val({})),l())}};function $e(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...g]=X(r);return a({...d,onclick:p,class:T("chip",i,c,l,u,p&&"clickable",t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}function uo(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;K(e);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),s(p),r(d))}}function po(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function mo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:g,size:h})=>r({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function bo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=uo(e),l=po(e),u=K(e);$e(e);const p=mo(e),d=(...y)=>a({class:n`
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
          `},...y)),g=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],x=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:h}),x())}}function go(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const ho=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=go(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function fo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),ho(e)()))}}function vo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ct(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ct(n)}),e}class ut{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Et(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const xo="</span>",dt=e=>!!e.scope,wo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class yo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Et(t)}openNode(t){if(!dt(t))return;const n=wo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){dt(t)&&(this.buffer+=xo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const pt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ke{constructor(){this.rootNode=pt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=pt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ke._collapse(n)}))}}class Co extends Ke{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new yo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function St(e){return de("(?=",e,")")}function Eo(e){return de("(?:",e,")*")}function So(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function ko(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ye(...e){return"("+(ko(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function kt(e){return new RegExp(e.toString()+"|").exec("").length-1}function To(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Ao=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qe(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),s="";for(;i.length>0;){const r=Ao.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Mo=/\b\B/,Tt="[a-zA-Z]\\w*",Je="[a-zA-Z_]\\w*",At="\\b\\d+(\\.\\d+)?",Mt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Dt="\\b(0b[01]+)",Do="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Io=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},$o={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},No={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Bo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ne=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Ye("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},_o=Ne("//","$"),Po=Ne("/\\*","\\*/"),Oo=Ne("#","$"),Ro={scope:"number",begin:At,relevance:0},Lo={scope:"number",begin:Mt,relevance:0},jo={scope:"number",begin:Dt,relevance:0},zo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Ho={scope:"title",begin:Tt,relevance:0},Uo={scope:"title",begin:Je,relevance:0},Go={begin:"\\.\\s*"+Je,relevance:0},Fo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ae=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Mo,IDENT_RE:Tt,UNDERSCORE_IDENT_RE:Je,NUMBER_RE:At,C_NUMBER_RE:Mt,BINARY_NUMBER_RE:Dt,RE_STARTERS_RE:Do,SHEBANG:Io,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:$o,QUOTE_STRING_MODE:No,PHRASAL_WORDS_MODE:Bo,COMMENT:Ne,C_LINE_COMMENT_MODE:_o,C_BLOCK_COMMENT_MODE:Po,HASH_COMMENT_MODE:Oo,NUMBER_MODE:Ro,C_NUMBER_MODE:Lo,BINARY_NUMBER_MODE:jo,REGEXP_MODE:zo,TITLE_MODE:Ho,UNDERSCORE_TITLE_MODE:Uo,METHOD_GUARD:Go,END_SAME_AS_BEGIN:Fo});function Vo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Wo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Zo(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Vo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Xo(e,t){Array.isArray(e.illegal)&&(e.illegal=Ye(...e.illegal))}function Ko(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Yo(e,t){e.relevance===void 0&&(e.relevance=1)}const qo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,St(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Jo=["of","and","for","in","not","or","if","then","parent","list","value"],Qo="keyword";function It(e,t,n=Qo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,It(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ea(c[0],c[1])]})}}function ea(e,t){return t?Number(t):ta(e)?0:1}function ta(e){return Jo.includes(e.toLowerCase())}const mt={},ue=e=>{console.error(e)},bt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{mt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),mt[`${e}/${t}`]=!0)},De=new Error;function $t(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=kt(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function na(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),De;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),De;$t(e,e.begin,{key:"beginScope"}),e.begin=qe(e.begin,{joinWith:""})}}function oa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),De;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),De;$t(e,e.end,{key:"endScope"}),e.end=qe(e.end,{joinWith:""})}}function aa(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ra(e){aa(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),na(e),oa(e)}function sa(e){function t(s,r){return new RegExp(ve(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=kt(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(qe(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[Wo,Ko,ra,qo].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[Zo,Xo,Yo].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=It(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return ia(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function Nt(e){return e?e.endsWithParent||Nt(e.starts):!1}function ia(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Nt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var ca="11.8.0";class la extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Fe=Et,gt=ie,ht=Symbol("nomatch"),ua=7,Bt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Co};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const w=r.languageDetectRe.exec(b);if(w){const E=$(w[1]);return E||(bt(i.replace("{}",w[1])),bt("Falling back to no-highlight mode for this block.",m)),E?w[1]:"no-highlight"}return b.split(/\s+/).find(E=>c(E)||$(E))}function u(m,b,w){let E="",_="";typeof b=="object"?(E=m,w=b.ignoreIllegals,_=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),_=m,E=b),w===void 0&&(w=!0);const I={code:E,language:_};U("before:highlight",I);const W=I.result?I.result:p(I.language,I.code,w);return W.code=I.code,U("after:highlight",W),W}function p(m,b,w,E){const _=Object.create(null);function I(k,A){return k.keywords[A]}function W(){if(!R.keywords){ee.addText(Y);return}let k=0;R.keywordPatternRe.lastIndex=0;let A=R.keywordPatternRe.exec(Y),z="";for(;A;){z+=Y.substring(k,A.index);const Z=re.case_insensitive?A[0].toLowerCase():A[0],ne=I(R,Z);if(ne){const[se,$n]=ne;if(ee.addText(z),z="",_[Z]=(_[Z]||0)+1,_[Z]<=ua&&(Se+=$n),se.startsWith("_"))z+=A[0];else{const Nn=re.classNameAliases[se]||se;V(A[0],Nn)}}else z+=A[0];k=R.keywordPatternRe.lastIndex,A=R.keywordPatternRe.exec(Y)}z+=Y.substring(k),ee.addText(z)}function N(){if(Y==="")return;let k=null;if(typeof R.subLanguage=="string"){if(!t[R.subLanguage]){ee.addText(Y);return}k=p(R.subLanguage,Y,!0,rt[R.subLanguage]),rt[R.subLanguage]=k._top}else k=g(Y,R.subLanguage.length?R.subLanguage:null);R.relevance>0&&(Se+=k.relevance),ee.__addSublanguage(k._emitter,k.language)}function M(){R.subLanguage!=null?N():W(),Y=""}function V(k,A){k!==""&&(ee.startScope(A),ee.addText(k),ee.endScope())}function J(k,A){let z=1;const Z=A.length-1;for(;z<=Z;){if(!k._emit[z]){z++;continue}const ne=re.classNameAliases[k[z]]||k[z],se=A[z];ne?V(se,ne):(Y=se,W(),Y=""),z++}}function Q(k,A){return k.scope&&typeof k.scope=="string"&&ee.openNode(re.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(V(Y,re.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(J(k.beginScope,A),Y="")),R=Object.create(k,{parent:{value:R}}),R}function ae(k,A,z){let Z=To(k.endRe,z);if(Z){if(k["on:end"]){const ne=new ut(k);k["on:end"](A,ne),ne.isMatchIgnored&&(Z=!1)}if(Z){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return ae(k.parent,A,z)}function Le(k){return R.matcher.regexIndex===0?(Y+=k[0],1):(He=!0,0)}function An(k){const A=k[0],z=k.rule,Z=new ut(z),ne=[z.__beforeBegin,z["on:begin"]];for(const se of ne)if(se&&(se(k,Z),Z.isMatchIgnored))return Le(A);return z.skip?Y+=A:(z.excludeBegin&&(Y+=A),M(),!z.returnBegin&&!z.excludeBegin&&(Y=A)),Q(z,k),z.returnBegin?0:A.length}function Mn(k){const A=k[0],z=b.substring(k.index),Z=ae(R,k,z);if(!Z)return ht;const ne=R;R.endScope&&R.endScope._wrap?(M(),V(A,R.endScope._wrap)):R.endScope&&R.endScope._multi?(M(),J(R.endScope,k)):ne.skip?Y+=A:(ne.returnEnd||ne.excludeEnd||(Y+=A),M(),ne.excludeEnd&&(Y=A));do R.scope&&ee.closeNode(),!R.skip&&!R.subLanguage&&(Se+=R.relevance),R=R.parent;while(R!==Z.parent);return Z.starts&&Q(Z.starts,k),ne.returnEnd?0:A.length}function Dn(){const k=[];for(let A=R;A!==re;A=A.parent)A.scope&&k.unshift(A.scope);k.forEach(A=>ee.openNode(A))}let Ee={};function at(k,A){const z=A&&A[0];if(Y+=k,z==null)return M(),0;if(Ee.type==="begin"&&A.type==="end"&&Ee.index===A.index&&z===""){if(Y+=b.slice(A.index,A.index+1),!a){const Z=new Error(`0 width match regex (${m})`);throw Z.languageName=m,Z.badRule=Ee.rule,Z}return 1}if(Ee=A,A.type==="begin")return An(A);if(A.type==="illegal"&&!w){const Z=new Error('Illegal lexeme "'+z+'" for mode "'+(R.scope||"<unnamed>")+'"');throw Z.mode=R,Z}else if(A.type==="end"){const Z=Mn(A);if(Z!==ht)return Z}if(A.type==="illegal"&&z==="")return 1;if(ze>1e5&&ze>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=z,z.length}const re=$(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const In=sa(re);let je="",R=E||In;const rt={},ee=new r.__emitter(r);Dn();let Y="",Se=0,ce=0,ze=0,He=!1;try{if(re.__emitTokens)re.__emitTokens(b,ee);else{for(R.matcher.considerAll();;){ze++,He?He=!1:R.matcher.considerAll(),R.matcher.lastIndex=ce;const k=R.matcher.exec(b);if(!k)break;const A=b.substring(ce,k.index),z=at(A,k);ce=k.index+z}at(b.substring(ce))}return ee.finalize(),je=ee.toHTML(),{language:m,value:je,relevance:Se,illegal:!1,_emitter:ee,_top:R}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:Fe(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:b.slice(ce-100,ce+100),mode:k.mode,resultSoFar:je},_emitter:ee};if(a)return{language:m,value:Fe(b),illegal:!1,relevance:0,errorRaised:k,_emitter:ee,_top:R};throw k}}function d(m){const b={value:Fe(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function g(m,b){b=b||r.languages||Object.keys(t);const w=d(m),E=b.filter($).filter(q).map(M=>p(M,m,!1));E.unshift(w);const _=E.sort((M,V)=>{if(M.relevance!==V.relevance)return V.relevance-M.relevance;if(M.language&&V.language){if($(M.language).supersetOf===V.language)return 1;if($(V.language).supersetOf===M.language)return-1}return 0}),[I,W]=_,N=I;return N.secondBest=W,N}function h(m,b,w){const E=b&&n[b]||w;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function f(m){let b=null;const w=l(m);if(c(w))return;if(U("before:highlightElement",{el:m,language:w}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new la("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const E=b.textContent,_=w?u(E,{language:w,ignoreIllegals:!0}):g(E);m.innerHTML=_.value,h(m,w,_.language),m.result={language:_.language,re:_.relevance,relevance:_.relevance},_.secondBest&&(m.secondBest={language:_.secondBest.language,relevance:_.secondBest.relevance}),U("after:highlightElement",{el:m,result:_,text:E})}function x(m){r=gt(r,m)}const y=()=>{B(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){B(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function B(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function P(){S&&B()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",P,!1);function L(m,b){let w=null;try{w=b(e)}catch(E){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(E);else throw E;w=s}w.name||(w.name=m),t[m]=w,w.rawDefinition=b.bind(null,e),w.aliases&&H(w.aliases,{languageName:m})}function D(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function O(){return Object.keys(t)}function $(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(w=>{n[w.toLowerCase()]=b})}function q(m){const b=$(m);return b&&!b.disableAutodetect}function te(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function j(m){te(m),o.push(m)}function F(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function U(m,b){const w=m;o.forEach(function(E){E[w]&&E[w](b)})}function v(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),f(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:B,highlightElement:f,highlightBlock:v,configure:x,initHighlighting:y,initHighlightingOnLoad:C,registerLanguage:L,unregisterLanguage:D,listLanguages:O,getLanguage:$,registerAliases:H,autoDetection:q,inherit:gt,addPlugin:j,removePlugin:F}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=ca,e.regex={concat:de,lookahead:St,either:Ye,optional:So,anyNumberOfTimes:Eo};for(const m in Ae)typeof Ae[m]=="object"&&Ct(Ae[m]);return Object.assign(e,Ae),e},be=Bt({});be.newInstance=()=>Bt({});var da=be;be.HighlightJS=be;be.default=be;const fe=vo(da),ft="[A-Za-z$_][0-9A-Za-z$_]*",pa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ma=["true","false","null","undefined","NaN","Infinity"],_t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Pt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ot=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ba=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ga=[].concat(Ot,_t,Pt);function Rt(e){const t=e.regex,n=(b,{after:w})=>{const E="</"+b[0].slice(1);return b.input.indexOf(E,w)!==-1},o=ft,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,w)=>{const E=b[0].length+b.index,_=b.input[E];if(_==="<"||_===","){w.ignoreMatch();return}_===">"&&(n(b,{after:E})||w.ignoreMatch());let I;const W=b.input.substring(E);if(I=W.match(/^\s*=/)){w.ignoreMatch();return}if((I=W.match(/^\s+extends\s+/))&&I.index===0){w.ignoreMatch();return}}},r={$pattern:ft,keyword:pa,literal:ma,built_in:ga,"variable.language":ba},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},x={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,f,x,{match:/\$\d+/},p];d.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const B=[].concat(C,d.contains),P=B.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(B)}]),L={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:P},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[..._t,...Pt]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[L],illegal:/%/},q={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function te(b){return t.concat("(?!",b.join("|"),")")}const j={match:t.concat(/\b/,te([...Ot,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},L]},v="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(v)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[L]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:P,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,f,x,C,{match:/\$\d+/},p,O,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:v,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:P}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[L,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[L]},j,q,D,U,{match:/\$[(.]/}]}}function ha(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const fa=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",Rt),fe.registerLanguage("sh",ha),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=fe.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function va(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=fa(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Be(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",...p},...d]=X(r);return a({...p,class:T("paper",u,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Lt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(s(l(d??""),oe.map(g=>l(g)))),i(to.map(g=>s(l(g),oe.map((h,f)=>r(p({color:h,variant:g},{index:f}))))))))}},xa=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},no.map((s,r)=>i({color:"success",variant:"outline",size:s},{index:r})))}},G=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:i,p:s,h2:r,h3:c,pre:l,code:u}=t.tags;fe.registerLanguage("javascript",Rt);const p=Be(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),d=Lt(e),g=xa(e),h=({text:f})=>l({class:n`
          display: inline-block;
        `},u({class:"hljs language-js",bauCreated:({element:x})=>{x.innerHTML=fe.highlight(f,{language:"js"}).value}}));return function(x){return o({class:n``},i(x.title),s(x.description),x.gridItem&&[r("Variant/Color"),!x.variantColorTableDisable&&x.gridItem&&p(d({Item:x.gridItem(e)})),r("Size"),s("Component with size: ",u("sm"),", ",u("md"),", and ",u("lg")),x.gridItem&&p(g({Item:x.gridItem(e)}))],r("Usage"),c("Import"),h({text:x.importStatement}),r("Examples"),x.examples.map(y=>a(i(y.title),s(y.description),p(y.createComponent(e)()),h({text:y.code}))))}};function Qe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:g="md",Header:h,Content:f,close:x=!0,...y}]=X(u);const C=n.state(x);return a({...y,class:T("collapsible",g,i,t==null?void 0:t.class,y==null?void 0:y.class)},a({class:()=>T("header",f?C.val?"close":"open":""),onclick:S=>{C.val=!C.val,S.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:S})=>{C.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:C}),!C.val)},f&&f()))}}const wa=()=>oe.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=n.state(""),u=Qe(e),p=g=>h=>{l.val==g?l.val="":l.val=g},d=o`
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
    ${wa()}
  `;return function(...h){let[{color:f,variant:x="outline",size:y="md",data:C=[],...S}]=X(h);const B=P=>{const{Header:L,Content:D,name:O}=P,$=()=>r({class:()=>T(l.val==O&&"active")},c({type:"button","aria-controls":`bau-${O}`,"aria-expanded":({element:q})=>l.val==O},L(P))),H=()=>a({id:`bau-${O}`,"data-state":({element:q})=>l.val==O},D(P));return s({class:T(f,x,y),onclick:p(O)},u({Header:$,Content:H}))};return a({class:T("accordion",d,t==null?void 0:t.class,S.class)},i(C.map(B)))}}const jt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return s=>i({...s,data:a})},ya=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Ca=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,zt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ea=e=>{const{css:t}=e,n=zt(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Sa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,ka=e=>{const{css:t}=e,n=zt(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ta=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Aa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ca,createComponent:ya},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Sa,createComponent:Ea},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ta,createComponent:ka}],gridItem:jt},Ma=e=>{const t=G(e);return()=>t(Aa)},Da={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ia=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},$a=()=>oe.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:s}=n.tags;Ia({css:o,createGlobalStyles:a});const r=o`
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
    ${$a()}
  `,c=K(e),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:g="outline",color:h="neutral",size:f="md",onRemove:x,...y}=p;return i({...y,class:T(`alert-${g}`,g,h,f,r,t==null?void 0:t.class,p.class,"alert"),role:"alert"},s({class:"icon"},Da[h]),i({class:"content"},...d),x&&l({onclick:x}))}}const Ht=e=>{const t=Pe(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Na=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Pe(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ba=`import alert from "@grucloud/bau-ui/alert";
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
`,_a=e=>{const{css:t}=e,n=Pe(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Pa=`import alert from "@grucloud/bau-ui/alert";
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
`,Oa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ba,createComponent:Na},{title:"Custom Alert ",description:"A custom alert.",code:Pa,createComponent:_a}],gridItem:Ht},Ra=e=>{const t=G(e);return()=>t(Oa)},La=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:g})=>{const h=c.val.findIndex(f=>f.id===d);h!=-1&&(c.val[h].status=g)};return function(g={},...h){const f=({id:C})=>{p({id:C,status:"removing"});const S=c.val.findIndex(B=>B.id===C);S!=-1&&c.val.splice(S,1)},x=({Component:C})=>{const S={id:Math.random().toString(10).split(".")[1],Component:C,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(S),setTimeout(()=>f(S),s)},y=C=>r({class:u.item,onclick:()=>f(C)},C.Component());return document.addEventListener("alert.add",C=>x(C.detail)),document.addEventListener("alert.remove",C=>f(C.detail)),r({class:T(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),y))}},ja=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=La(e,{deleteAfterDuration:2e4}),i=K(e),s=Pe(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},za=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ha={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:za,createComponent:ja}]},Ua=e=>{const t=G(e);return()=>t(Ha)},Ga=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ie(e),s=K(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},Fa=`import animate from "@grucloud/bau-ui/animate";
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
`,Va=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ie(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Wa=`import animate from "@grucloud/bau-ui/animate";
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
`,Za={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Fa,createComponent:Ga},{title:"Component hide and show",description:"Hide and show a component",code:Wa,createComponent:Va}]},Xa=e=>{const t=G(e);return()=>t(Za)};function Ut(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...d){let[{color:g,variant:h="outline",size:f="md",width:x=30,height:y=30,...C},...S]=X(d);return a({class:T(u,t==null?void 0:t.class,C.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:x,height:y,onload:c,onerror:l,class:T(g,h,f,u,t==null?void 0:t.class,C.class),...C}))}}const Gt=e=>{const{css:t}=e,n=Ut(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Ka=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Ut(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Ya=`import avatar from "@grucloud/bau-ui/avatar";
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
`,qa={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Ya,createComponent:Ka}],gridItem:Gt},Ja=e=>{const t=G(e);return()=>t(qa)};function et(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Be(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...g},...h]=X(l);const f=C=>{y.style.opacity=1,y.showModal();const S=p.getBoundingClientRect(),B=y.getBoundingClientRect();S.x<a.innerWidth/2?y.style.left=S.left+"px":y.style.left=S.right-B.width+"px",S.y<a.innerHeight/2?y.style.top=S.top+S.height+"px":y.style.top=S.top-B.height+"px"},x=C=>{const S=()=>{y.close(),y.removeEventListener("transitionend",S)};y.addEventListener("transitionend",S),y.style.opacity=0},y=i({role:"presentation",class:T("popover",r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:C=>C.target===y&&(x(),d==null?void 0:d.call())},s(u));return y.closeDialog=x,y.openDialog=f,y}}const Qa=()=>oe.map(e=>`
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
`);function tt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Qa()}
  `;return function(r){const{size:c="md",variant:l="outline",color:u="neutral",name:p,id:d,disabled:g,...h}=r;return a({...h,class:T("input",c,u,l,i,t==null?void 0:t.class,h.class)})}}const er=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ft(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=et(e),r=K(e),c=tt(e),l=we(e),u=o`
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

    ${er()}
  `,p=n.state(""),d=n.state(""),g=n.state(!1),h=n.state(0),f=()=>{g.val=!1};return function(...y){let[{variant:C="outline",color:S,size:B="md",id:P,label:L,placeholder:D,Option:O,options:$,getOptionLabel:H=({label:N})=>N,...q},...te]=X(y);const j=n.state($),F=()=>{W.openDialog(),g.val=!0,d.val="",j.val=$},U=()=>{W.closeDialog(),g.val=!1,d.val=""},v=N=>{const{value:M}=N.target;d.val=M,M?j.val=$.filter(V=>H(V).match(new RegExp(`${M}`,"i"))):j.val=$},m=N=>{g.val?U():F()},b=({option:N,index:M})=>V=>{p.val=H(N),h.val=M,U()},w=N=>{switch(console.log("onkeydown",N.key,h.val),N.key){case"Escape":U();break;case"ArrowDown":h.val<j.val.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=j.val.length-1:h.val--;break;case"Enter":p.val=H(j.val[h.val]),d.val="",U();break}},E=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":L,onclick:m,variant:C,color:S,size:B},()=>!p.val&&L,p),_=c({id:P,value:d,placeholder:D,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:v,onkeydown:w,variant:C,color:S,size:B}),W=s({id:P,triggerEl:E,contentEl:(()=>a({class:T(C,S,B,"content")},_,()=>l({class:T(C,S,B)},j.val.map((N,M)=>i({class:()=>T(h.val==M&&"active"),onclick:b({option:N,index:M})},O(N))))))(),onClose:f});return a({...q,class:T("autocomplete",u,t==null?void 0:t.class,q==null?void 0:q.class)},E,W)}}const Vt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Ft(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},tr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ft(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},nr=`import { Context } from "@grucloud/bau-ui/context";
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
`,or={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:nr,createComponent:tr}],gridItem:Vt},ar=e=>{const t=G(e);return()=>t(or)};function Wt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...g]=X(r);return a({...d,class:T("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...g)}}const Zt=e=>{const t=Wt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Wt(e);return()=>n(o({content:"10"},"☏"))},sr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,ir={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:sr,createComponent:rr}],gridItem:Zt},cr=e=>{const t=G(e);return()=>t(ir)};function Xt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:s}=n.tags,r=K(e),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",items:h,...f},...x]=X(u);return a({...f,class:T(c,t==null?void 0:t.class,f==null?void 0:f.class)},h.map(({href:y,name:C})=>i((y?r:s)({href:y,color:p,variant:d,size:g,class:T(p,d,g)},C))))}}const Kt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Xt(e);return o=>n({...o,...t})},lr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Xt(e);return()=>n(a(o))},ur=`import breadcrumbs, {
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
`,dr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:ur,createComponent:lr}],gridItem:Kt},pr=e=>{const t=G(e);return()=>t(dr)},Yt=e=>{const t=K(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},mr=e=>{const{bau:t}=e,{section:n}=t.tags,o=K(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},br=`import button from "@grucloud/bau-ui/button";
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
`,gr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:br,createComponent:mr}],gridItem:Yt},hr=e=>{const t=G(e);return()=>t(gr)},fr=()=>oe.map(e=>`
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
`);function nt(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${fr()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:u,...p},...d]=X(r);return a({...p,class:T("button-group",c,u,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const qt=e=>{const t=["ONE","TWO","THREE"],n=K(e),o=nt(e);return a=>o({...a},t.map(i=>n(a,i)))},vr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=K(e),i=nt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},xr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,wr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:xr,createComponent:vr}],gridItem:qt},yr=e=>{const t=G(e);return()=>t(wr)};function Jt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...g]=X(c);return a({...d,type:"date",class:T("calendar",s,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const Qt=e=>{const t=Jt(e);return n=>t({...n})},Cr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=Jt(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Er=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Sr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Er,createComponent:Cr}],gridItem:Qt},kr=e=>{const t=G(e);return()=>t(Sr)};function Tr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:g,Previous:h,Next:f,...x}]=X(c);const y=()=>{s.val<=0?s.val=d.length-1:s.val--},C=()=>{s.val>=d.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},d.map(g));return a({...x,class:T("carousel",p,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:T("control","control-previous"),onclick:y},h()),a({class:T("control","control-next"),onclick:C},f()),S)}}const Ar=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Mr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=K(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Tr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Ar,Slide:s,Previous:c,Next:l}))},Dr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Ir={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Dr,createComponent:Mr}]},$r=e=>{const t=G(e);return()=>t(Ir)},en=e=>{const t=$e(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Nr=e=>{const{bau:t}=e,{section:n}=t.tags,o=$e(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Br=`import chip from "@grucloud/bau-ui/chip";
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
`,_r={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Br,createComponent:Nr}],gridItem:en},Pr=e=>{const t=G(e);return()=>t(_r)};function tn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",...p},...d]=X(r);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,t==null?void 0:t.class,p==null?void 0:p.class)})}}const nn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=tn(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Or=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=tn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Rr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Lr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Rr,createComponent:Or}],gridItem:nn},jr=e=>{const t=G(e);return()=>t(Lr)},zr=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Qe(e),i=K(e),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},Hr=`import button from "@grucloud/bau-ui/button";
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
`,Ur={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Hr,createComponent:zr}]},Gr=e=>{const t=G(e);return()=>t(Ur)};function Fr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:p,...d},...g]=X(r);return a({class:T(i,t==null?void 0:t.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},g))}}const Vr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Fr(e),s=K(e),r=yt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Wr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Zr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Wr,createComponent:Vr}]},Xr=e=>{const t=G(e);return()=>t(Zr)},on=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Xe(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Kr=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Xe(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Yr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,qr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Yr,createComponent:Kr}],gridItem:e=>on(e,{base:"/components/drillDownMenu",hashBased:!0})},Jr=e=>{const t=G(e);return()=>t(qr)};function an(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(u,...p){const{variant:d="outline",color:g="neutral",size:h="md",Component:f,disabled:x,...y}=u;return a({class:T(c.base,x&&c.disabled,t==null?void 0:t.class,u.class)},s({class:T(d,g,h)},f({disabled:x}),r({type:"file",disabled:x,...y})),i({class:"filename-display"}))}}const rn=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),u=an(e),p=g=>{const h=g.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:g})=>r({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return g=>u({Component:d,name:"file",accept:"text/*",onchange:p,...g})},Qr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),p=an(e),d=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:h})=>c({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:g,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},es=`import classNames from "@grucloud/bau-css/classNames";
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
`,ts={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:es,createComponent:Qr}],gridItem:rn},ns=e=>{const t=G(e);return()=>t(ts)},sn=e=>{const t=tt(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},os=e=>{const{bau:t}=e,{section:n}=t.tags,o=tt(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},as=`import input from "@grucloud/bau-ui/input";
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
`,rs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:as,createComponent:os}],gridItem:sn},ss=e=>{const t=G(e);return()=>t(rs)};function cn(e,t){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>oe.map(l=>`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",running:h,...f}]=X(u);return i({...f,role:"progressbar",class:{deps:[h],renderProp:()=>x=>T("linearProgress",g,p,c,x&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const ln=e=>{const t=cn(e);return n=>t({...n,running:!0})},is=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=K(e),i=cn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},cs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ls={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:cs,createComponent:is}],gridItem:ln},us=e=>{const t=G(e);return()=>t(ls)},Me={sm:12,md:16,lg:24},ds=()=>oe.map(e=>`
&.plain.${e} {
  background-color:transparent;
  & .path {
    stroke: var(--color-${e});
  }
}
&.outline.${e} {
  background-color:transparent;
  border: none;
  & .path {
    stroke: var(--color-${e});
  }
}
&.solid.${e} {
  & .path {
    stroke: var(--font-color-inverse);
    ;
  }
}
`).join(`
`);function Oe(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
      animation: ${r} 2s linear infinite;
      width: ${Me[u]};
      height: ${Me[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${ds()}
    `;return i({class:{deps:[g],renderProp:()=>x=>T("spinner",f,p,d,x==!1?"":"visibility",t==null?void 0:t.class,h.class)},version:"1.1",x:"0px",y:"0px",width:Me[u],height:Me[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function un(e,t){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:g,...h},...f]=X(l);const x=K(e),y=Oe(e);return n.bind({deps:[g],render:()=>C=>x({...h,class:T("loadingButton",d,p,u,r,C&&"loading",t==null?void 0:t.class,h==null?void 0:h.class)},y({size:d,variant:p,color:u,visibility:C}),i({class:C&&"loading"},f))})}}const ps=e=>{const t=un(e);return n=>t({...n,loading:!0},"Save")},ms=e=>{const{bau:t}=e,{section:n}=t.tags,o=un(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},bs=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,gs={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:bs,createComponent:ms}],gridItem:ps},hs=e=>{const t=G(e);return()=>t(gs)},fs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],vs=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},fs.map(s))},xs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ws=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=we(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},xs.map(r)))},ys=`import list from "@grucloud/bau-ui/list";
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
`,Cs={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ys,createComponent:ws}],gridItem:vs},Es=e=>{const t=G(e);return()=>t(Cs)};function dn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...g]=X(c);return a({class:T("modal",s,l,u,p,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const pn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=K(e),c=dn(e),l=()=>o(Array(10).fill("").map((p,d)=>s(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(r({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},Ss=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=K(e),l=dn(e),u=()=>o(Array(10).fill("").map((d,g)=>s(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},ks=`import modal from "@grucloud/bau-ui/modal";
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
`,Ts={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:ks,createComponent:Ss}],gridItem:pn},As=e=>{const t=G(e);return()=>t(Ts)},Ms=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=K(e),r=et(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},Ds=`import popover from "@grucloud/bau-ui/popover";
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
`,Is={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ds,createComponent:Ms}]},$s=e=>{const t=G(e);return()=>t(Is)},Ns=e=>{const{bau:t}=e,{div:n}=t.tags,o=Be(e);return a=>o({...a},n(`Paper ${a.size??""}`))},Bs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Be(e);return()=>n(a({size:"md"},o("My content")))},_s=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Ps={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:_s,createComponent:Bs}],variantColorTableDisable:!0,gridItem:Ns},Os=e=>{const t=G(e);return()=>t(Ps)},Rs=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function mn(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=K(e),r=et(e),c=we(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Rs()}
  `,u=n.state(""),p=n.state(!1),d=n.state(0);return function(...h){let[{color:f="neutral",variant:x="outline",size:y="md",id:C,label:S,Option:B,options:P,getOptionLabel:L=({label:b})=>b,...D},...O]=X(h);const $=()=>{m.openDialog(),m.focus(),p.val=!0},H=()=>{m.closeDialog(),p.val=!1},q=()=>{p.val=!1},te=b=>{p.val?H():$()},j=({option:b,index:w})=>E=>{u.val=L(b),d.val=w,H()},F=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":d.val<P.length-1?d.val++:d.val=0;break;case"ArrowUp":d.val<=0?d.val=P.length-1:d.val--;break;case"Enter":p.val?(u.val=L(P[d.val]),H()):$();break}},U=()=>c({tabindex:"0",class:T(f,x)},P.map((b,w)=>i({class:()=>T(d.val==w&&"active"),onclick:j({option:b,index:w})},B(b)))),v=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":S,onclick:te,color:f,variant:x,size:y},()=>!u.val&&S,u),m=r({id:C,triggerEl:v,contentEl:U(),onClose:q});return a({...D,class:T("select",f,y,l,t==null?void 0:t.class,D==null?void 0:D.class),onkeydown:F},v,m)}}const bn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=mn(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Ls=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=mn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},js=`import select from "@grucloud/bau-ui/select";
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
`,zs={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:js,createComponent:Ls}],gridItem:bn},Hs=e=>{const t=G(e);return()=>t(zs)};function Re(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...g]=X(c);return a({...d,type:"range",class:T("slider",l,u,p,s,t==null?void 0:t.class,d.class)},...g)}}const gn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Re(e);return i=>a({...i,oninput:o})},Us=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Re(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Gs=`import slider from "@grucloud/bau-ui/slider";
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
`,Fs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Re(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},Vs=`import slider from "@grucloud/bau-ui/slider";
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
`,Ws=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Re(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},Zs=`import slider from "@grucloud/bau-ui/slider";
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
`,Xs={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Gs,createComponent:Us},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Vs,createComponent:Fs},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Zs,createComponent:Ws}],gridItem:gn},Ks=e=>{const t=G(e);return()=>t(Xs)},hn=e=>{const t=Oe(e);return n=>t({...n})},Ys=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e);return()=>n(o({}))},qs=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,Js={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:qs,createComponent:Ys}],gridItem:hn},Qs=e=>{const t=G(e);return()=>t(Js)},ei=()=>oe.map(e=>`
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
`);function fn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${ei()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=X(r);return a({...p,class:T("switch",i,c,l,u,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const vn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=fn(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ti=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=fn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},ni=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,oi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ni,createComponent:ti}],gridItem:vn},ai=e=>{const t=G(e);return()=>t(oi)},ri=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),u=d=>c.val.find(g=>g.name==d),p={base:o`
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
      ${ri()}
    `};return function(...g){let[{color:h,variant:f="plain",size:x,...y},...C]=X(g);const S=P=>{const{Header:L,disabled:D,name:O}=P;return r({class:()=>T(l.val.name==O&&"active",D&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},L(P))},B=i({class:T("tabs",p.base,f,x,h,t==null?void 0:t.class,y.class)},n.loop(c,s(),S),()=>l.val.Content?l.val.Content({}):"");return B.addEventListener("tab.select",P=>{var O,$;const{tabName:L}=P.detail,D=u(L);D&&((O=l.val.exit)==null||O.call(),l.val=D,($=D.enter)==null||$.call())},!1),B.addEventListener("tab.add",P=>{var D;const{tab:L}=P.detail;(D=L.enter)==null||D.call(),c.val.push(L)},!1),B.addEventListener("tab.remove",P=>{var D;const L=c.val.findIndex(O=>O.name==P.detail.tabName);L>0&&((D=c.val[L].exit)==null||D.call(),c.val.splice(L,1))},!1),B}}const xn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},si=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},ii=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ci=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},li=`import tabs from "@grucloud/bau-ui/tabs";
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
`,wn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},ui=e=>{const{css:t}=e,n=ye(e,{tabDefs:wn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},di=`import tabs from "@grucloud/bau-ui/tabs";
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
`,pi=e=>{const{css:t}=e,n=wn(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},mi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,bi={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ii,createComponent:si},{title:"Extended Tabs",description:"An extended tabs.",code:li,createComponent:ci},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:di,createComponent:ui},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:mi,createComponent:pi}],gridItem:xn},gi=e=>{const t=G(e);return()=>t(bi)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=X(c);return i({...l,class:T("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const hi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function p(x,y,C,S,B){return{name:x,calories:y,fat:C,carbs:S,protein:B}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:x,calories:y})=>s(i(x),i({class:n`
            text-align: right;
          `},y)),h=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),h(),l(d.map(g)))))},fi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ge(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const vi=[ge("Frozen yoghurt",159,6,24,4),ge("Ice cream sandwich",237,9,37,4.3),ge("Eclair",262,16,24,6),ge("Cupcake",305,3.7,67,4.3),ge("Gingerbread",356,16,49,3.9)],xi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:f})=>s(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),d(),l(vi.map(p)))))},wi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const yi=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Ci=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:h,calories:f})=>s(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),d(),l(yi.map(p)))))},Ei=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Si={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:fi,createComponent:hi},{title:"Dense",description:"A dense table.",code:wi,createComponent:xi},{title:"Zebra",description:"A zebra table.",code:Ei,createComponent:Ci}]},ki=e=>{const t=G(e);return()=>t(Si)};function yn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=nt(e),s=K(e),r=Oe(e),c=o`
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
  `,l=({label:h,icon:f,...x})=>s({"aria-label":h,title:h,...x},f),u=({count:h,totalCount:f,page:x,rowsPerPage:y})=>a({class:"pages-numbers"},Number(x-1)*Number(y)+(h>0?1:0),"-",Math.min(x*y,f)," of ",f),p=({count:h,page:f,rowsPerPage:x})=>a({class:"pages-numbers"},(f-1)*x+(h>0?1:0),"-",f*x),d=h=>h<=1,g=(h,f,x)=>h>=Math.ceil(f/x);return function(...f){let[{count:x=0,totalCount:y=0,page:C=1,rowsPerPage:S=50,onPageChange:B,isLoading:P=!1,disableFirst:L=()=>d(C),disablePrevious:D=()=>d(C),disableNext:O=()=>g(C,y,S),disableLast:$=()=>g(C,y,S),...H},...q]=X(f);const te=Math.max(0,Math.ceil(y/S)),j=B({page:1}),F=B({page:C-1}),U=B({page:C+1}),v=B({page:te}),m=[{label:"First",icon:"⟪",onclick:j,disabled:L()},{label:"Previous",icon:"⟨",onclick:F,disabled:D()},{label:"Next",icon:"⟩",onclick:U,disabled:O()},{label:"Last",icon:"⟫",onclick:v,disabled:$()}];return a({...H,class:T("table-pagination",c,P&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},r({class:"spinner",visibility:P,size:"md"}),y>0?u({count:x,totalCount:y,page:C,maxPages:te,rowsPerPage:S}):p({count:x,page:C,maxPages:te,rowsPerPage:S}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Ti=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ai=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=Ti(45),u=({name:C,email:S})=>i(a(C),a(S)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=yn(e),g=Ce(e,{class:n`
      max-width: 650px;
    `}),h=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),x=t.derive(()=>h.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),y=({page:C})=>S=>{f.val.page=C};return()=>g(s(p(),()=>c(x.val.map(u))),()=>d({...f.val,onPageChange:y}))},Mi=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),g=t.derive(()=>p.val.length),h=t.state(1),f=t.state(10),x=t.derive(()=>p.val),y=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,C=({page:$})=>H=>{h.val=$,S(y({page:$,per_page:f.val}))};S(y({page:1,per_page:f.val}));async function S($){try{u.val=!0;const H=await fetch($,{});if(H.ok){const q=await H.json();p.val=q;return}throw H}catch(H){d.val=H.message}finally{u.val=!1}}const B=({name:$,description:H,stargazers_count:q})=>i(a($),a(H),a({class:n`
            text-align: right;
          `},q)),P=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),L=yn(e),D=Ce(e,{class:n`
      min-width: 650px;
    `}),O=({message:$})=>l($);return()=>D(()=>L({rowsPerPage:f.val,page:h.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:C,disableNext:()=>!1}),s(P(),()=>d.val&&O({message:d.val}),()=>c(x.val.map(B))))},Di=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=Ai(e),l=Mi(e),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function ot(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:g="md",...h},...f]=X(c);const x=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,g),role:"tooltip"},l)),y=D=>`move-to-${D}`,C=(D,O,$)=>{if(D()){const H=y(O);x.classList.add(H),x.classList.add(O),x.classList.remove($)}},S=(D,O)=>{const $=y(D);x.classList.contains($)&&(x.classList.remove($),x.classList.add(O),x.classList.remove(D))},B=D=>{const O=x.getBoundingClientRect();C(()=>O.x<0,"right","left"),C(()=>O.x+O.width>a.innerWidth,"left","right"),C(()=>O.y<0,"bottom","top"),C(()=>O.bottom>a.innerHeight,"top","bottom"),x.classList.add("visible")},P=D=>{x.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...h,class:T("tooltip",s,t==null?void 0:t.class,h==null?void 0:h.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",B),D.addEventListener("mouseout",P)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",B),D.removeEventListener("mouseout",P)}},...f,x)}}const Cn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,s=K(e),r=ot(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Ii=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=K(e),s=ot(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},$i=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ni=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=(...p)=>$e(e)({variant:"outline",color:"primary"},p),c=ot(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Bi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,_i={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:$i,createComponent:Ii},{title:"Grid",description:"Various tooltip position",code:Bi,createComponent:Ni}],gridItem:Cn},Pi=e=>{const t=G(e);return()=>t(_i)},En=e=>{const t=Ze(e);return n=>t(n)},Oi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ze(e);return()=>n(o({}))},Ri=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Li={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Ri,createComponent:Oi}],gridItem:En},ji=e=>{const t=G(e);return()=>t(Li)},zi=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Sn(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=zi({css:o,createGlobalStyles:a}),p=Qe(e),d=({depth:g=1,maxDepth:h,color:f,variant:x,size:y})=>C=>{const{children:S,expanded:B}=C,P=n.state(!B),L=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:O=>{S&&(P.val=!P.val)}},i(C.data)),D=()=>s({class:T(f,y)},S.map(d({depth:g+1,maxDepth:h})));return r(p({Header:L,Content:S&&g<h&&D}))};return function({tree:h,maxDepth:f=1/0,size:x="md",variant:y="plain",color:C="neutral",...S}){return c({class:T(u.nav,x,y,C,t==null?void 0:t.class,S.class)},h.children&&s(h.children.map(d({maxDepth:f,color:C,variant:y,size:x}))))}}const kn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Sn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},Hi=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Sn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Ui=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Gi={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ui,createComponent:Hi}],gridItem:kn},Fi=e=>{const t=G(e);return()=>t(Gi)},Vi=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=Lt(e),u=K(e),p=[{name:"Accordion",Item:jt(e)},{name:"Alert",Item:Ht(e)},{name:"Autocomplete",Item:Vt(e)},{name:"Avatar",Item:Gt(e)},{name:"Badge",Item:Zt(e)},{name:"Breadcrumbs",Item:Kt(e)},{name:"Button",Item:Yt(e)},{name:"Button Group",Item:qt(e)},{name:"Calendar",Item:Qt(e)},{name:"Checkbox",Item:nn(e)},{name:"Chip",Item:en(e)},{name:"DrillDown Menu",Item:on(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:rn(e)},{name:"Input",Item:sn(e)},{name:"Linear Progress",Item:ln(e)},{name:"Modal",Item:pn(e)},{name:"Select",Item:bn(e)},{name:"Slider",Item:gn(e)},{name:"Spinner",Item:hn(e)},{name:"Switch",Item:vn(e)},{name:"Tabs",Item:xn(e)},{name:"Theme Switch",Item:En(e)},{name:"Tooltip",Item:Cn(e)},{name:"Tree View",Item:kn(e)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},Wi=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:bo(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:va(e)})},{path:"components",action:()=>({title:"Component",component:Vi(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ma(e)})},{path:"alert",action:()=>({title:"Alert",component:Ra(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ua(e)})},{path:"animate",action:()=>({title:"Animate",component:Xa(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:ar(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ja(e)})},{path:"badge",action:()=>({title:"Badge",component:cr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:pr(e)})},{path:"button",action:()=>({title:"Button",component:hr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:yr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:kr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:$r(e)})},{path:"chip",action:()=>({title:"Chip",component:Pr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:jr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Gr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Xr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Jr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:ns(e)})},{path:"input",action:()=>({title:"Input",component:ss(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:us(e)})},{path:"list",action:()=>({title:"List",component:Es(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:hs(e)})},{path:"modal",action:()=>({title:"Modal",component:As(e)})},{path:"paper",action:()=>({title:"Paper",component:Os(e)})},{path:"popover",action:()=>({title:"Popover",component:$s(e)})},{path:"select",action:()=>({title:"Select",component:Hs(e)})},{path:"slider",action:()=>({title:"Slider",component:Ks(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Qs(e)})},{path:"switch",action:()=>({title:"Switch",component:ai(e)})},{path:"table",action:()=>({title:"Table",component:ki(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Di(e)})},{path:"tabs",action:()=>({title:"Tabs",component:gi(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Pi(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ji(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Fi(e)})}]},{path:"pages",action:t=>({title:"Pages",component:fo(e)})}],Zi=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Xi=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:g=t}=l.resolve({pathname:u});s.val=d,document.title=`${p}`}},Ki=e=>{const{createGlobalStyles:t}=e;t`
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
  `};Wn();const Tn={title:"Bau",base:"/bau/bau-ui"},le=eo({config:Tn}),{bau:Yi}=le;le.states={drawerOpen:Yi.state(!0)};Ki(le);On({routes:Wi({context:le}),onLocationChange:Xi({context:le,LayoutDefault:lo(le),config:Tn}),notFoundRoute:Zi(le)});
