(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Rn=(t,e)=>({...t,paths:[...e,t.path]}),ve=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=Rn(o,t);return n?[a,...ve({paths:[...t,o.path],routes:n})]:a}),Ln=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},jn=({routes:t=[],notFoundRoute:e})=>{const n=ve({routes:t}).map(o=>({...o,regex:Ln(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function zn({routes:t,notFoundRoute:e,onLocationChange:n}){const o=jn({routes:t,notFoundRoute:e});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Vt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Hn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Un=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],se=t=>`var(--color-${t})`,Gn=t=>`var(--color-${t}-lightest)`,Fn=()=>Vt.map(([t])=>`
.outline.${t} {
  border: 2px solid ${se(t)};
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${Gn(t)};
}
.solid.${t} {
  background-color: ${se(t)};
}
`).join(`
`),Vn=()=>Vt.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),Wn=t=>100-t*10,Zn=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${Wn(e)}%);`).join(`
`),ie=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),Xn=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...Hn.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),...Un.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function Kn({createGlobalStyles:t},{colorPalette:e=Vt}={}){t`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${e.map(([n,o])=>Xn([n,o])).join(`
`)}
      ${Zn()}
      ${ie({})}
      ${Fn()}
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
      ${Vn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ie({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Yn(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let Wt=t=>Object.prototype.toString.call(t??0).slice(8,-1),qn=t=>Wt(t)=="Object",ce=t=>Wt(t)=="Function",Ut=t=>["Object","Array"].includes(Wt(t)),le=Object.getPrototypeOf,Gt=t=>mt(t)?t.val:t,mt=t=>t==null?void 0:t.__isState,Jn=["splice","push","pop","shift","unshift","sort","reverse"],kt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const W=t=>!mt(t[0])&&qn(t[0])?t:[{},...t];function Qn(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,i=new Set,r=!1,s,c=x=>n.createElement(x),l=(x,m,b)=>{let C=s;s=m;let E=x(b);return s=C,E},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(x=>{x.bindings=x.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!x.bindings.length&&!x.computed&&a.delete(x)}),o=void 0}))},p=(x,m,b,C,E,R)=>{var P;if(r){i.add(x);return}for(let Z of x.bindings){let{deps:_,element:N,renderInferred:V,render:J,renderItem:tt}=Z;if(tt&&m)(P=h(N,C,(...at)=>f(tt(...at)),b,E,R)[m])==null||P.call();else{let at=V?V({element:N}):J({element:N,renderItem:tt})(..._.map(Gt));at!==N&&N.replaceWith(Z.element=f(at))}}S(x),u()},d=(x,m,b=[])=>({get(C,E,R){var P;if(s==null||s.add(x),E==="_isProxy")return!0;if(!((P=C[E])!=null&&P._isProxy)&&!mt(C[E])&&Ut(C[E]))C[E]=new Proxy(C[E],d(x,m,[...b,E]));else if(Jn.includes(E)){let Z=C[E];return(..._)=>{let N=Z.apply(C,_);return p(x,E,N,_,m,b),N}}return Reflect.get(C,E,R)},set(C,E,R,P){let Z=Reflect.set(C,E,R,P);return p(x,"setItem",Z,{prop:E,value:R},m,[...b,E]),Z}}),g=(x,m)=>new Proxy(m,d(x,m)),h=(x,m,b,C,E,R)=>{let P=()=>x.replaceChildren(...kt(C,b)),Z=_=>x[_]&&x.removeChild(x[_]);return{assign:P,sort:P,reverse:P,setItem:()=>{var N;let _=R[0];(N=x.children[_])==null||N.replaceWith(b(E[_],_))},push:()=>x.append(...kt(m,(_,N)=>b(_,E.length+N))),unshift:()=>x.prepend(...kt(m,b)),pop:()=>Z("lastChild"),shift:()=>Z("firstChild"),splice:()=>{let[_,N,...V]=m;const{length:J}=x.children;for(let tt=_>=0?Math.min(_+N-1,J-1):J-1;tt>=(_>=0?_:J+_);tt--)x.children[tt].remove();if(V.length){let tt=V.forEach((at,Lt)=>b(at,_+Lt));x.children[_]?x.children[_].after(...tt):x.append(...tt)}}}},v=x=>({oldVal:x,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return s==null||s.add(m),m.valProxy??(m.valProxy=Ut(x)?g(m,x):x,m.valProxy)},set val(m){let b=this,C=b.val;Ut(m)?(b.valProxy=g(b,m),p(b,"assign",m)):m!==C&&(b.valProxy=m,p(b)),b.oldVal=C}}),f=x=>x==null||x===!1?c("span"):x.nodeType?x:n.createTextNode(x),w=(x,m)=>{let b=new Set;return m.val=l(x,b),b},y=x=>{let m=v(),b=w(x,m);m.computed=!0;for(let C of b)C.listeners.push({computed:x,deps:b,state:m});return m},S=x=>{for(let m of[...x.listeners])w(m.computed,m.state)},I=(x,...m)=>{if(m.length){let b=[];for(let C of m.flat(1/0))C!=null&&b.push(mt(C)?z({deps:[C],render:()=>E=>E}):ce(C)?Q({renderInferred:C}):f(C));x.append(...b)}},$={},O=(x,m)=>x&&(Object.getOwnPropertyDescriptor(x,m)??O(le(x),m)),A=(x,m,b)=>{var C;return $[x+","+m]??($[x+","+m]=((C=O(b,m))==null?void 0:C.set)??0)},B=(x,m)=>new e.MutationObserver((b,C)=>{b.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(R=>R===x&&(m({element:x}),C.disconnect(),!0)))}).observe(x.parentNode,{childList:!0}),D=(x,m)=>new e.MutationObserver((b,C)=>b.forEach(E=>m({record:E,element:x}))).observe(x,{childList:!0}),j=x=>new Proxy(function(b,...C){var Z;let[E,...R]=W(C),P=x?n.createElementNS(x,b):c(b);for(let[_,N]of Object.entries(E)){if(_.startsWith("bau"))continue;let V=A(b,_,le(P))?J=>P[_]=J:J=>P.setAttribute(_,J);N==null||(mt(N)?z({deps:[N],render:()=>()=>(V(N.val),P)}):ce(N)&&(!_.startsWith("on")||N.isDerived)?Q({renderInferred:()=>(V(N({element:P})),P)}):N.renderProp?z({deps:N.deps,render:()=>()=>(V(N.renderProp({element:P})(...N.deps.map(Gt))),P)}):V(N))}return E.bauChildMutated&&D(P,E.bauChildMutated),I(P,...R),(Z=E.bauCreated)==null||Z.call(E,{element:P}),E.bauMounted&&e.requestAnimationFrame(()=>E.bauMounted({element:P})),E.bauUnmounted&&e.requestAnimationFrame(()=>B(P,E.bauUnmounted)),P},{get:(m,b)=>m.bind(void 0,b)}),Y=(x,m,b)=>{x.element=f(b);for(let C of m)mt(C)&&(a.add(C),C.bindings.push(x));return x.element},Q=({renderInferred:x,element:m})=>{let b=new Set,C=l(x,b,{element:m});return Y({renderInferred:x},b,C)},z=({deps:x,element:m,render:b,renderItem:C})=>Y({deps:x,render:b,renderItem:C},x,b({element:m,renderItem:C})(...x.map(Gt))),F=(x,m,b)=>z({deps:[x],render:({renderItem:C})=>E=>(m.append(...kt(E,C)),m),renderItem:b}),G=x=>{r=!0,x(),r=!1,i.forEach(p),i.clear()};return{tags:j(),tagsNS:j,state:v,bind:z,loop:F,derive:y,stateSet:a,batch:G}}const to=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},eo=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},no=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function oo(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...i)=>{const r=no(a,i),s=to(r);return!e.getElementById(s)&&eo(e,t==null?void 0:t.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function ao(t){const e=Qn(),n=oo();return Kn(n),{bau:e,...n,tr:o=>o,window,...t}}function T(...t){return t.filter(e=>e).join(" ")}function It(t,e={}){const{bau:n}=t,{div:o}=n.tags,a=()=>{};return function({animationHide:r=a,animationShow:s=a,...c},l){return o({class:T("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!r()||d.getAttribute("cloned"))return;const g=d.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=d.getAttribute("width"),g.style.height=d.getAttribute("height"),g.style.position="absolute",g.style.animation=r(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var h;return(h=g.parentNode)==null?void 0:h.removeChild(g)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const g=d.getBoundingClientRect();if(d.setAttribute("width",g.width+"px"),d.setAttribute("height",g.height+"px"),s()){d.style.animation=s();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function K(t,e){const{bau:n,css:o}=t,a={root:o`
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
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:u,href:p,...d},...g]=W(r);return(p?n.tags.a:n.tags.button)({...d,class:T("button",a.root,c,l,s,p?a.a:a.button,u&&a.disabled,e==null?void 0:e.class,d.class),disabled:u,href:p,...!p&&{type:"button"}},g)}}const nt=["neutral","primary","success","danger","warning"],ro=["plain","outline","solid"],so=["sm","md","lg"],io="light",co=()=>nt.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function Zt(t,e){const{bau:n,css:o,window:a}=t,{input:i}=n.tags,r=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(io);const l=o`
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
    ${co()}
  `;return function(...p){let[{color:d,variant:g="outline",size:h="md",...v},...f]=W(p);return i({required:"required",title:"Switch Theme",...v,class:T("theme-switch",d,g,h,l,e==null?void 0:e.class,v.class),type:"checkbox",checked:s()=="dark",onclick:w=>{r(w.target.checked?"dark":"light")}},...f)}}function lo(t){const{tr:e,bau:n,css:o,config:a,states:i}=t,{i:r,header:s,h1:c,div:l,a:u,img:p,b:d,ul:g,li:h}=n.tags,{svg:v,path:f}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,y=K(t,{class:o`
      background: transparent;
    `}),S=Zt(t),I=()=>r(v({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},f({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),$=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},y({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},I()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(e("Bau UI")))),O=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),y({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},$(),O())}}function uo({tr:t,bau:e,css:n}){const{section:o,footer:a,span:i,a:r,ul:s,li:c,p:l,div:u,h1:p}=e.tags,d=({links:v,title:f})=>o({class:n`
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
        `},p(f),s(v.map(({href:w,name:y})=>c(r({href:w},y))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},i("v0.42.0"),i("MIT license")))}}function wt(t,e){const{bau:n,css:o}=t,{ul:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=W(s);return a({...p,class:T("list",i,c,l,u,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const Tt="0.3s",xe=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(xe({parent:n,grandParent:t})),t&&(t.parentTree=e),i.parentTree=t,i},we=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=we(t)(e.children[o]);if(a)return a}},po=({keyframes:t})=>({hideToLeft:t`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
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
   `});function Xt(t,e={}){const{bau:n,css:o,window:a,config:i}=t,{base:r="",hashBased:s=!1}=e,c=`${i.base}${r}`,l=z=>{var F;return((F=z.parentTree.data)==null?void 0:F.href)??z.parentTree.children[0].data.href},u=({variant:z,color:F,size:G,currentTree:x,data:m})=>S(A({variant:z,color:F,size:G,href:`${c}${l(x)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),A({variant:z,color:F,size:G,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:z,subTree:{data:{name:F,href:G},children:x=[]}})=>A({size:z,href:`${c}${G}`,"data-ischild":!x.length},F),d=({pathname:z,subTree:F})=>{var G;return z===((G=F==null?void 0:F.data)==null?void 0:G.href)},{renderHeader:g=u,renderMenuItem:h=p,isActive:v=d}=e,{li:f,nav:w,div:y,header:S,a:I}=n.tags,$=It(t),O=wt(t),A=K(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:D}=po(t),j=o`
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
  `,Y=({variant:z,color:F,size:G,currentTree:x,pathnameState:m})=>{const{children:b,parentTree:C,data:E}=x;return y({class:T("drillDownMenu",z,F,G)},C&&g({variant:z,color:F,size:G,data:E,currentTree:x}),b&&O({class:T(z,F,G)},b.map(R=>f({class:()=>T(R.children&&"has-children",v({pathname:m.val,subTree:R})&&"active")},h({variant:z,color:F,size:G,subTree:R})))))},Q=({tree:z,pathname:F})=>{let G=xe({})(structuredClone(z)),x=we(F)(G);return x||(console.error("drilldown no sub tree",F),x=G),x};return function(F){const{variant:G="plain",color:x="neutral",size:m="md",tree:b,...C}=F,E=n.state(a.location.pathname.replace(c,"")),R=n.derive(()=>Q({tree:b,pathname:E.val}));a.document.addEventListener("click",V=>{const{target:J}=V,tt=J.getAttribute("href");if(J.tagName==="A"&&tt&&!tt.startsWith("http")){let at=tt.replace(c,"");s||(at=at.replace(J.hash,"")),E.val=at}});let P=1;const Z=V=>{const{dataset:J}=V.target;J.buttonback=="true"?P=-1:J.ischild=="false"?P=1:J.ischild=="true"&&(P=0)},_=V=>{switch(V){case 1:return`${B} ${Tt}`;case-1:return`${D} ${Tt}`;default:return""}},N=V=>{switch(V){case 1:return`${D} ${Tt} reverse`;case-1:return`${B} ${Tt} reverse`;default:return""}};return w({class:T(j,e==null?void 0:e.class,C.class),onclick:Z},$({animationHide:()=>_(P),animationShow:()=>N(P)},()=>Y({variant:G,color:x,size:m,currentTree:R.val,pathnameState:E})))}}const mo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function ye(t){const{tr:e,bau:n,css:o,config:a,states:i,window:r}=t,{div:s,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let g=!1;const h=Xt(t);return function(){return s({bauMounted:({element:f})=>{r.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:f=>{g&&!f.target.dataset.buttonback&&!f.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},h({tree:mo}))}}const go=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:i}=e.tags,r=It(t),s=lo(t),c=ye(t),l=uo(t),u=a`
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
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val&&g.val({})),l())}};function $t(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...g]=W(s);return a({...d,onclick:p,class:T("chip",i,c,l,u,p&&"clickable",e==null?void 0:e.class,d==null?void 0:d.class)},...g)}}function bo(t){const{bau:e,css:n,config:o}=t,{div:a,h1:i,h2:r,p:s}=e.tags;K(t);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),r(p),s(d))}}function ho(t){const{bau:e,css:n}=t,{div:o,h1:a,p:i}=e.tags,r=n`
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
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function fo({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:i,dd:r,div:s,aside:c,footer:l,a:u}=e.tags,p=({maxSize:d=151})=>({libName:g,size:h})=>s({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function vo(t){const{bau:e,css:n,config:o}=t,{div:a,p:i,a:r,section:s}=e.tags,c=bo(t),l=ho(t),u=K(t);$t(t);const p=fo(t),d=(...w)=>a({class:n`
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
          `},...w)),g=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],v=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],f=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:v}),p({data:h}),f())}}function xo(t,e={}){const{bau:n,css:o}=t,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const wo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:i,h2:r}=n.tags,s=xo(t);return()=>o({id:"login"},r(e("Login Examples")),i("Basic"),a(s()))};function yo(t){const{tr:e,bau:n,css:o}=t,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
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
          `},r(e("Pages Examples")),wo(t)()))}}function Co(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ce(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ce(n)}),t}class ue{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Se(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function it(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const So="</span>",de=t=>!!t.scope,Eo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class ko{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Se(e)}openNode(e){if(!de(e))return;const n=Eo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){de(e)&&(this.buffer+=So)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const pe=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class Kt{constructor(){this.rootNode=pe(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=pe({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{Kt._collapse(n)}))}}class To extends Kt{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new ko(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function vt(t){return t?typeof t=="string"?t:t.source:null}function Ee(t){return dt("(?=",t,")")}function Ao(t){return dt("(?:",t,")*")}function Mo(t){return dt("(?:",t,")?")}function dt(...t){return t.map(n=>vt(n)).join("")}function Do(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function Yt(...t){return"("+(Do(t).capture?"":"?:")+t.map(o=>vt(o)).join("|")+")"}function ke(t){return new RegExp(t.toString()+"|").exec("").length-1}function Io(t,e){const n=t&&t.exec(e);return n&&n.index===0}const $o=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qt(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let i=vt(o),r="";for(;i.length>0;){const s=$o.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(e)}const No=/\b\B/,Te="[a-zA-Z]\\w*",Jt="[a-zA-Z_]\\w*",Ae="\\b\\d+(\\.\\d+)?",Me="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",De="\\b(0b[01]+)",Bo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Po=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=dt(e,/.*\b/,t.binary,/\b.*/)),it({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},xt={begin:"\\\\[\\s\\S]",relevance:0},_o={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xt]},Oo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xt]},Ro={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Nt=function(t,e,n={}){const o=it({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Yt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:dt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Lo=Nt("//","$"),jo=Nt("/\\*","\\*/"),zo=Nt("#","$"),Ho={scope:"number",begin:Ae,relevance:0},Uo={scope:"number",begin:Me,relevance:0},Go={scope:"number",begin:De,relevance:0},Fo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xt,{begin:/\[/,end:/\]/,relevance:0,contains:[xt]}]}]},Vo={scope:"title",begin:Te,relevance:0},Wo={scope:"title",begin:Jt,relevance:0},Zo={begin:"\\.\\s*"+Jt,relevance:0},Xo=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var At=Object.freeze({__proto__:null,MATCH_NOTHING_RE:No,IDENT_RE:Te,UNDERSCORE_IDENT_RE:Jt,NUMBER_RE:Ae,C_NUMBER_RE:Me,BINARY_NUMBER_RE:De,RE_STARTERS_RE:Bo,SHEBANG:Po,BACKSLASH_ESCAPE:xt,APOS_STRING_MODE:_o,QUOTE_STRING_MODE:Oo,PHRASAL_WORDS_MODE:Ro,COMMENT:Nt,C_LINE_COMMENT_MODE:Lo,C_BLOCK_COMMENT_MODE:jo,HASH_COMMENT_MODE:zo,NUMBER_MODE:Ho,C_NUMBER_MODE:Uo,BINARY_NUMBER_MODE:Go,REGEXP_MODE:Fo,TITLE_MODE:Vo,UNDERSCORE_TITLE_MODE:Wo,METHOD_GUARD:Zo,END_SAME_AS_BEGIN:Xo});function Ko(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function Yo(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function qo(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=Ko,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function Jo(t,e){Array.isArray(t.illegal)&&(t.illegal=Yt(...t.illegal))}function Qo(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function ta(t,e){t.relevance===void 0&&(t.relevance=1)}const ea=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=dt(n.beforeMatch,Ee(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},na=["of","and","for","in","not","or","if","then","parent","list","value"],oa="keyword";function Ie(t,e,n=oa){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(i){Object.assign(o,Ie(t[i],e,i))}),o;function a(i,r){e&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,aa(c[0],c[1])]})}}function aa(t,e){return e?Number(e):ra(t)?0:1}function ra(t){return na.includes(t.toLowerCase())}const me={},ut=t=>{console.error(t)},ge=(t,...e)=>{console.log(`WARN: ${t}`,...e)},pt=(t,e)=>{me[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),me[`${t}/${e}`]=!0)},Dt=new Error;function $e(t,e,{key:n}){let o=0;const a=t[n],i={},r={};for(let s=1;s<=e.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=ke(e[s-1]);t[n]=r,t[n]._emit=i,t[n]._multi=!0}function sa(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ut("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Dt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ut("beginScope must be object"),Dt;$e(t,t.begin,{key:"beginScope"}),t.begin=qt(t.begin,{joinWith:""})}}function ia(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ut("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Dt;if(typeof t.endScope!="object"||t.endScope===null)throw ut("endScope must be object"),Dt;$e(t,t.end,{key:"endScope"}),t.end=qt(t.end,{joinWith:""})}}function ca(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function la(t){ca(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),sa(t),ia(t)}function ua(t){function e(r,s){return new RegExp(vt(r),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=ke(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=e(qt(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[Yo,Qo,la,ea].forEach(u=>u(r,s)),t.compilerExtensions.forEach(u=>u(r,s)),r.__beforeBegin=null,[qo,Jo,ta].forEach(u=>u(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=Ie(r.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=e(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=e(c.end)),c.terminatorEnd=vt(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=e(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(u){return da(u==="self"?r:u)})),r.contains.forEach(function(u){i(u,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=it(t.classNameAliases||{}),i(t)}function Ne(t){return t?t.endsWithParent||Ne(t.starts):!1}function da(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return it(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ne(t)?it(t,{starts:t.starts?it(t.starts):null}):Object.isFrozen(t)?it(t):t}var pa="11.8.0";class ma extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const Ft=Se,be=it,he=Symbol("nomatch"),ga=7,Be=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:To};function c(m){return s.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const C=s.languageDetectRe.exec(b);if(C){const E=D(C[1]);return E||(ge(i.replace("{}",C[1])),ge("Falling back to no-highlight mode for this block.",m)),E?C[1]:"no-highlight"}return b.split(/\s+/).find(E=>c(E)||D(E))}function u(m,b,C){let E="",R="";typeof b=="object"?(E=m,C=b.ignoreIllegals,R=b.language):(pt("10.7.0","highlight(lang, code, ...args) has been deprecated."),pt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),R=m,E=b),C===void 0&&(C=!0);const P={code:E,language:R};G("before:highlight",P);const Z=P.result?P.result:p(P.language,P.code,C);return Z.code=P.code,G("after:highlight",Z),Z}function p(m,b,C,E){const R=Object.create(null);function P(k,M){return k.keywords[M]}function Z(){if(!L.keywords){et.addText(q);return}let k=0;L.keywordPatternRe.lastIndex=0;let M=L.keywordPatternRe.exec(q),H="";for(;M;){H+=q.substring(k,M.index);const X=rt.case_insensitive?M[0].toLowerCase():M[0],ot=P(L,X);if(ot){const[st,_n]=ot;if(et.addText(H),H="",R[X]=(R[X]||0)+1,R[X]<=ga&&(Et+=_n),st.startsWith("_"))H+=M[0];else{const On=rt.classNameAliases[st]||st;V(M[0],On)}}else H+=M[0];k=L.keywordPatternRe.lastIndex,M=L.keywordPatternRe.exec(q)}H+=q.substring(k),et.addText(H)}function _(){if(q==="")return;let k=null;if(typeof L.subLanguage=="string"){if(!e[L.subLanguage]){et.addText(q);return}k=p(L.subLanguage,q,!0,re[L.subLanguage]),re[L.subLanguage]=k._top}else k=g(q,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Et+=k.relevance),et.__addSublanguage(k._emitter,k.language)}function N(){L.subLanguage!=null?_():Z(),q=""}function V(k,M){k!==""&&(et.startScope(M),et.addText(k),et.endScope())}function J(k,M){let H=1;const X=M.length-1;for(;H<=X;){if(!k._emit[H]){H++;continue}const ot=rt.classNameAliases[k[H]]||k[H],st=M[H];ot?V(st,ot):(q=st,Z(),q=""),H++}}function tt(k,M){return k.scope&&typeof k.scope=="string"&&et.openNode(rt.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(V(q,rt.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),q=""):k.beginScope._multi&&(J(k.beginScope,M),q="")),L=Object.create(k,{parent:{value:L}}),L}function at(k,M,H){let X=Io(k.endRe,H);if(X){if(k["on:end"]){const ot=new ue(k);k["on:end"](M,ot),ot.isMatchIgnored&&(X=!1)}if(X){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return at(k.parent,M,H)}function Lt(k){return L.matcher.regexIndex===0?(q+=k[0],1):(Ht=!0,0)}function $n(k){const M=k[0],H=k.rule,X=new ue(H),ot=[H.__beforeBegin,H["on:begin"]];for(const st of ot)if(st&&(st(k,X),X.isMatchIgnored))return Lt(M);return H.skip?q+=M:(H.excludeBegin&&(q+=M),N(),!H.returnBegin&&!H.excludeBegin&&(q=M)),tt(H,k),H.returnBegin?0:M.length}function Nn(k){const M=k[0],H=b.substring(k.index),X=at(L,k,H);if(!X)return he;const ot=L;L.endScope&&L.endScope._wrap?(N(),V(M,L.endScope._wrap)):L.endScope&&L.endScope._multi?(N(),J(L.endScope,k)):ot.skip?q+=M:(ot.returnEnd||ot.excludeEnd||(q+=M),N(),ot.excludeEnd&&(q=M));do L.scope&&et.closeNode(),!L.skip&&!L.subLanguage&&(Et+=L.relevance),L=L.parent;while(L!==X.parent);return X.starts&&tt(X.starts,k),ot.returnEnd?0:M.length}function Bn(){const k=[];for(let M=L;M!==rt;M=M.parent)M.scope&&k.unshift(M.scope);k.forEach(M=>et.openNode(M))}let St={};function ae(k,M){const H=M&&M[0];if(q+=k,H==null)return N(),0;if(St.type==="begin"&&M.type==="end"&&St.index===M.index&&H===""){if(q+=b.slice(M.index,M.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=St.rule,X}return 1}if(St=M,M.type==="begin")return $n(M);if(M.type==="illegal"&&!C){const X=new Error('Illegal lexeme "'+H+'" for mode "'+(L.scope||"<unnamed>")+'"');throw X.mode=L,X}else if(M.type==="end"){const X=Nn(M);if(X!==he)return X}if(M.type==="illegal"&&H==="")return 1;if(zt>1e5&&zt>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return q+=H,H.length}const rt=D(m);if(!rt)throw ut(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Pn=ua(rt);let jt="",L=E||Pn;const re={},et=new s.__emitter(s);Bn();let q="",Et=0,ct=0,zt=0,Ht=!1;try{if(rt.__emitTokens)rt.__emitTokens(b,et);else{for(L.matcher.considerAll();;){zt++,Ht?Ht=!1:L.matcher.considerAll(),L.matcher.lastIndex=ct;const k=L.matcher.exec(b);if(!k)break;const M=b.substring(ct,k.index),H=ae(M,k);ct=k.index+H}ae(b.substring(ct))}return et.finalize(),jt=et.toHTML(),{language:m,value:jt,relevance:Et,illegal:!1,_emitter:et,_top:L}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:Ft(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ct,context:b.slice(ct-100,ct+100),mode:k.mode,resultSoFar:jt},_emitter:et};if(a)return{language:m,value:Ft(b),illegal:!1,relevance:0,errorRaised:k,_emitter:et,_top:L};throw k}}function d(m){const b={value:Ft(m),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return b._emitter.addText(m),b}function g(m,b){b=b||s.languages||Object.keys(e);const C=d(m),E=b.filter(D).filter(Y).map(N=>p(N,m,!1));E.unshift(C);const R=E.sort((N,V)=>{if(N.relevance!==V.relevance)return V.relevance-N.relevance;if(N.language&&V.language){if(D(N.language).supersetOf===V.language)return 1;if(D(V.language).supersetOf===N.language)return-1}return 0}),[P,Z]=R,_=P;return _.secondBest=Z,_}function h(m,b,C){const E=b&&n[b]||C;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function v(m){let b=null;const C=l(m);if(c(C))return;if(G("before:highlightElement",{el:m,language:C}),m.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),s.throwUnescapedHTML))throw new ma("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const E=b.textContent,R=C?u(E,{language:C,ignoreIllegals:!0}):g(E);m.innerHTML=R.value,h(m,C,R.language),m.result={language:R.language,re:R.relevance,relevance:R.relevance},R.secondBest&&(m.secondBest={language:R.secondBest.language,relevance:R.secondBest.relevance}),G("after:highlightElement",{el:m,result:R,text:E})}function f(m){s=be(s,m)}const w=()=>{I(),pt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function y(){I(),pt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function I(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(s.cssSelector).forEach(v)}function $(){S&&I()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",$,!1);function O(m,b){let C=null;try{C=b(t)}catch(E){if(ut("Language definition for '{}' could not be registered.".replace("{}",m)),a)ut(E);else throw E;C=r}C.name||(C.name=m),e[m]=C,C.rawDefinition=b.bind(null,t),C.aliases&&j(C.aliases,{languageName:m})}function A(m){delete e[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function B(){return Object.keys(e)}function D(m){return m=(m||"").toLowerCase(),e[m]||e[n[m]]}function j(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=b})}function Y(m){const b=D(m);return b&&!b.disableAutodetect}function Q(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function z(m){Q(m),o.push(m)}function F(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function G(m,b){const C=m;o.forEach(function(E){E[C]&&E[C](b)})}function x(m){return pt("10.7.0","highlightBlock will be removed entirely in v12.0"),pt("10.7.0","Please use highlightElement now."),v(m)}Object.assign(t,{highlight:u,highlightAuto:g,highlightAll:I,highlightElement:v,highlightBlock:x,configure:f,initHighlighting:w,initHighlightingOnLoad:y,registerLanguage:O,unregisterLanguage:A,listLanguages:B,getLanguage:D,registerAliases:j,autoDetection:Y,inherit:be,addPlugin:z,removePlugin:F}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=pa,t.regex={concat:dt,lookahead:Ee,either:Yt,optional:Mo,anyNumberOfTimes:Ao};for(const m in At)typeof At[m]=="object"&&Ce(At[m]);return Object.assign(t,At),t},gt=Be({});gt.newInstance=()=>Be({});var ba=gt;gt.HighlightJS=gt;gt.default=gt;const ft=Co(ba),fe="[A-Za-z$_][0-9A-Za-z$_]*",ha=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],fa=["true","false","null","undefined","NaN","Infinity"],Pe=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],_e=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Oe=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],va=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],xa=[].concat(Oe,Pe,_e);function Re(t){const e=t.regex,n=(b,{after:C})=>{const E="</"+b[0].slice(1);return b.input.indexOf(E,C)!==-1},o=fe,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,C)=>{const E=b[0].length+b.index,R=b.input[E];if(R==="<"||R===","){C.ignoreMatch();return}R===">"&&(n(b,{after:E})||C.ignoreMatch());let P;const Z=b.input.substring(E);if(P=Z.match(/^\s*=/)){C.ignoreMatch();return}if((P=Z.match(/^\s+extends\s+/))&&P.index===0){C.ignoreMatch();return}}},s={$pattern:fe,keyword:ha,literal:fa,built_in:xa,"variable.language":va},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"css"}},v={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},f={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,d]},y={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},S=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,h,v,f,{match:/\$\d+/},p];d.contains=S.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(S)});const I=[].concat(y,d.contains),$=I.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(I)}]),O={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:$},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Pe,..._e]}},D={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},j={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[O],illegal:/%/},Y={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(b){return e.concat("(?!",b.join("|"),")")}const z={match:e.concat(/\b/,Q([...Oe,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},G={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},O]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[O]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:$,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),D,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,h,v,f,y,{match:/\$\d+/},p,B,{className:"attr",begin:o+e.lookahead(":"),relevance:0},m,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[y,t.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:$}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},j,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[O,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[O]},z,Y,A,G,{match:/\$[(.]/}]}}function wa(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const ya=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return ft.registerLanguage("javascript",Re),ft.registerLanguage("sh",wa),function({text:r,language:s="js"}){const c=a({class:`hljs language-${s}`});return c.innerHTML=ft.highlight(r,{language:s}).value,o({class:n`
          display: inline-block;
        `},c)}};function Ca(t){const{bau:e,css:n}=t,{article:o,h1:a,p:i,code:r,a:s,ul:c,li:l}=e.tags,u=ya(t);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(s({href:"components"},"Visit the component gallery")),l(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Bt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=W(s);return a({...p,class:T("paper",u,i,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const Le=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=e.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(r(l(d??""),nt.map(g=>l(g)))),i(ro.map(g=>r(l(g),nt.map((h,v)=>s(p({color:h,variant:g},{index:v}))))))))}},Sa=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},so.map((r,s)=>i({color:"success",variant:"outline",size:r},{index:s})))}},U=t=>{const{bau:e,css:n}=t,{article:o,section:a,h1:i,p:r,h2:s,h3:c,pre:l,code:u}=e.tags;ft.registerLanguage("javascript",Re);const p=Bt(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),d=Le(t),g=Sa(t),h=({text:v})=>l({class:n`
          display: inline-block;
        `},u({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=ft.highlight(v,{language:"js"}).value}}));return function(f){return o({class:n``},i(f.title),r(f.description),f.gridItem&&[s("Variant/Color"),!f.variantColorTableDisable&&f.gridItem&&p(d({Item:f.gridItem(t)})),s("Size"),r("Component with size: ",u("sm"),", ",u("md"),", and ",u("lg")),f.gridItem&&p(g({Item:f.gridItem(t)}))],s("Usage"),c("Import"),h({text:f.importStatement}),s("Examples"),f.examples.map(w=>a(i(w.title),r(w.description),p(w.createComponent(t)()),h({text:w.code}))))}};function Qt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `,r=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?s(l):c(l))};function s(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:g="md",Header:h,Content:v,close:f=!0,...w}]=W(u);const y=n.state(f);return a({...w,class:T("collapsible",g,i,e==null?void 0:e.class,w==null?void 0:w.class)},a({class:()=>T("header",v?y.val?"close":"open":""),onclick:S=>{y.val=!y.val,S.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:S})=>{y.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(r({element:S,closeState:y}),!y.val)},v&&v()))}}const Ea=()=>nt.map(t=>`
& li.plain.${t} h3::after {
  color: var(--color-${t});
}
& li.outline.${t} h3::after {
  color: var(--color-${t});
}
& h3.solid.${t}:hover {
  filter: brightness(var(--brightness-hover-always));
}
`).join(`
`);function Pt(t,e){const{bau:n,css:o}=t,{div:a,ul:i,li:r,h3:s,button:c}=n.tags,l=n.state(""),u=Qt(t),p=g=>h=>{l.val==g?l.val="":l.val=g},d=o`
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
    ${Ea()}
  `;return function(...h){let[{color:v,variant:f="outline",size:w="md",data:y=[],...S}]=W(h);const I=$=>{const{Header:O,Content:A,name:B}=$,D=()=>s({class:()=>T(l.val==B&&"active")},c({type:"button","aria-controls":`bau-${B}`,"aria-expanded":({element:Y})=>l.val==B},O($))),j=()=>a({id:`bau-${B}`,"data-state":({element:Y})=>l.val==B},A($));return r({class:T(v,f,w),onclick:p(B)},u({Header:D,Content:j}))};return a({class:T("accordion",d,e==null?void 0:e.class,S.class)},i(y.map(I)))}}const je=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Pt(t);return r=>i({...r,data:a})},ka=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Pt(t);return()=>i({data:a,color:"neutral",variant:"outline"})},Ta=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,ze=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Aa=t=>{const{css:e}=t,n=ze(t),o=Pt(t);return()=>o({color:"warning",data:n,class:e`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Ma=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Da=t=>{const{css:e}=t,n=ze(t),o=Pt(t);return()=>o({color:"success",variant:"outline",data:n,class:e`
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
      `})},Ia=`import accordion from "@grucloud/bau-ui/accordion";
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
`,$a={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ta,createComponent:ka},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ma,createComponent:Aa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ia,createComponent:Da}],gridItem:je},Na=t=>{const e=U(t);return()=>e($a)},Ba={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Pa=({css:t,createGlobalStyles:e})=>{e`
:root {
  --alert-border-left-width: 8px;
}
`},_a=()=>nt.map(t=>`
&.alert.outline.${t} {
  & .icon {
    color: var(--color-${t})
  }
}
`).join(`
`);function _t(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i,i:r}=n.tags;Pa({css:o,createGlobalStyles:a});const s=o`
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
    ${_a()}
  `,c=K(t),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:g="outline",color:h="neutral",size:v="md",onRemove:f,...w}=p;return i({...w,class:T(`alert-${g}`,g,h,v,s,e==null?void 0:e.class,p.class,"alert"),role:"alert"},r({class:"icon"},Ba[h]),i({class:"content"},...d),f&&l({onclick:f}))}}const He=t=>{const e=_t(t);return n=>e({...n},`Alert ${n.variant} ${n.color}`)},Oa=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=_t(t);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ra=`import alert from "@grucloud/bau-ui/alert";
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
`,La=t=>{const{css:e}=t,n=_t(t,{class:e`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},ja=`import alert from "@grucloud/bau-ui/alert";
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
`,za={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ra,createComponent:Oa},{title:"Custom Alert ",description:"A custom alert.",code:ja,createComponent:La}],gridItem:He},Ha=t=>{const e=U(t);return()=>e(za)},Ua=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:i=10,deleteAfterDuration:r=15e3}=e,{div:s}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:g})=>{const h=c.val.findIndex(v=>v.id===d);h!=-1&&(c.val[h].status=g)};return function(g={},...h){const v=({id:y})=>{p({id:y,status:"removing"});const S=c.val.findIndex(I=>I.id===y);S!=-1&&c.val.splice(S,1)},f=({Component:y})=>{const S={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};c.val.length>=i&&v({id:c.val[0].id}),c.val.push(S),setTimeout(()=>v(S),r)},w=y=>s({class:u.item,onclick:()=>v(y)},y.Component());return document.addEventListener("alert.add",y=>f(y.detail)),document.addEventListener("alert.remove",y=>v(y.detail)),s({class:T(u.stack,e==null?void 0:e.class,g.class)},n.loop(c,s(),w))}},Ga=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=Ua(t,{deleteAfterDuration:2e4}),i=K(t),r=_t(t);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},Fa=`import { Context } from "@grucloud/bau-ui/context";
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
`,Va={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Fa,createComponent:Ga}]},Wa=t=>{const e=U(t);return()=>e(Va)},Za=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,i=It(t),r=K(t),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=e.state(!0);return()=>o(r({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},Xa=`import animate from "@grucloud/bau-ui/animate";
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
`,Ka=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:i,label:r}=e.tags,s=It(t),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=e.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(r("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),r("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),s({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Ya=`import animate from "@grucloud/bau-ui/animate";
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
`,qa={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Xa,createComponent:Za},{title:"Component hide and show",description:"Hide and show a component",code:Ya,createComponent:Ka}]},Ja=t=>{const e=U(t);return()=>e(qa)};function Ue(t,e){const{bau:n,css:o}=t,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=p=>{r.val=!1,s.val=!0},u=o`
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
  `;return function(...d){let[{color:g,variant:h="outline",size:v="md",width:f=30,height:w=30,...y},...S]=W(d);return a({class:T(u,e==null?void 0:e.class,y.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:f,height:w,onload:c,onerror:l,class:T(g,h,v,u,e==null?void 0:e.class,y.class),...y}))}}const Ge=t=>{const{css:e}=t,n=Ue(t,{class:e`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Qa=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=Ue(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},tr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,er={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:tr,createComponent:Qa}],gridItem:Ge},nr=t=>{const e=U(t);return()=>e(er)};function te(t,e){const{bau:n,css:o,window:a}=t,{dialog:i}=n.tags,r=Bt(t,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...g},...h]=W(l);const v=y=>{w.style.opacity=1,w.showModal();const S=p.getBoundingClientRect(),I=w.getBoundingClientRect();S.x<a.innerWidth/2?w.style.left=S.left+"px":w.style.left=S.right-I.width+"px",S.y<a.innerHeight/2?w.style.top=S.top+S.height+"px":w.style.top=S.top-I.height+"px"},f=y=>{const S=()=>{w.close(),w.removeEventListener("transitionend",S)};w.addEventListener("transitionend",S),w.style.opacity=0},w=i({role:"presentation",class:T("popover",s,e==null?void 0:e.class,g==null?void 0:g.class),onclick:y=>y.target===w&&(f(),d==null?void 0:d.call())},r(u));return w.closeDialog=f,w.openDialog=v,w}}const or=()=>nt.map(t=>`
&.input.${t} {
  border: 2px solid transparent;
}
&.input.plain.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
}
&.input.outline.${t} {
  border: 1px solid var(--color-${t});
  &:focus {
    border: 2px solid var(--color-${t});
  };
}
&.input.soft.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
} 
&.input.solid.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${t}-light);
  }
}
`).join(`
`);function ee(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${or()}
  `;return function(s){const{size:c="md",variant:l="outline",color:u="neutral",name:p,id:d,disabled:g,...h}=s;return a({...h,class:T("input",c,u,l,i,e==null?void 0:e.class,h.class)})}}const ar=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Fe(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,r=te(t),s=K(t),c=ee(t),l=wt(t),u=o`
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

    ${ar()}
  `,p=n.state(""),d=n.state(""),g=n.state(!1),h=n.state(0),v=()=>{g.val=!1};return function(...w){let[{variant:y="outline",color:S,size:I="md",id:$,label:O,placeholder:A,Option:B,options:D,getOptionLabel:j=({label:_})=>_,...Y},...Q]=W(w);const z=n.state(D),F=()=>{Z.openDialog(),g.val=!0,d.val="",z.val=D},G=()=>{Z.closeDialog(),g.val=!1,d.val=""},x=_=>{const{value:N}=_.target;d.val=N,N?z.val=D.filter(V=>j(V).match(new RegExp(`${N}`,"i"))):z.val=D},m=_=>{g.val?G():F()},b=({option:_,index:N})=>V=>{p.val=j(_),h.val=N,G()},C=_=>{switch(console.log("onkeydown",_.key,h.val),_.key){case"Escape":G();break;case"ArrowDown":h.val<z.val.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=z.val.length-1:h.val--;break;case"Enter":p.val=j(z.val[h.val]),d.val="",G();break}},E=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":O,onclick:m,variant:y,color:S,size:I},()=>!p.val&&O,p),R=c({id:$,value:d,placeholder:A,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:x,onkeydown:C,variant:y,color:S,size:I}),Z=r({id:$,triggerEl:E,contentEl:(()=>a({class:T(y,S,I,"content")},R,()=>l({class:T(y,S,I)},z.val.map((_,N)=>i({class:()=>T(h.val==N&&"active"),onclick:b({option:_,index:N})},B(_))))))(),onClose:v});return a({...Y,class:T("autocomplete",u,e==null?void 0:e.class,Y==null?void 0:Y.class)},E,Z)}}const Ve=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=Fe(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},rr=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,r=Fe(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},sr=`import { Context } from "@grucloud/bau-ui/context";
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
`,ir={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:sr,createComponent:rr}],gridItem:Ve},cr=t=>{const e=U(t);return()=>e(ir)};function We(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...g]=W(s);return a({...d,class:T("badge",i,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...g)}}const Ze=t=>{const e=We(t);return(n,{index:o})=>e({...n,content:`${o*100}`},"☏")},lr=t=>{const{bau:e}=t,{section:n}=e.tags,o=We(t);return()=>n(o({content:"10"},"☏"))},ur=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,dr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:ur,createComponent:lr}],gridItem:Ze},pr=t=>{const e=U(t);return()=>e(dr)};function Xe(t,e){const{bau:n,css:o}=t,{ul:a,li:i,span:r}=n.tags,s=K(t),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",items:h,...v},...f]=W(u);return a({...v,class:T(c,e==null?void 0:e.class,v==null?void 0:v.class)},h.map(({href:w,name:y})=>i((w?s:r)({href:w,color:p,variant:d,size:g,class:T(p,d,g)},y))))}}const Ke=t=>{const e={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Xe(t);return o=>n({...o,...e})},mr=t=>{const{bau:e}=t,{section:n}=e.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Xe(t);return()=>n(a(o))},gr=`import breadcrumbs, {
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
`,br={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:gr,createComponent:mr}],gridItem:Ke},hr=t=>{const e=U(t);return()=>e(br)},Ye=t=>{const e=K(t);return n=>e({...n},`${n.variant} ${n.color} ${n.size??""}`)},fr=t=>{const{bau:e}=t,{section:n}=e.tags,o=K(t),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},vr=`import button from "@grucloud/bau-ui/button";
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
`,xr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:vr,createComponent:fr}],gridItem:Ye},wr=t=>{const e=U(t);return()=>e(xr)},yr=()=>nt.map(t=>`
&.button-group.${t} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${t}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${t} {
  border: none;
}

&.button-group.solid.${t} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function ne(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
    ${yr()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:u,...p},...d]=W(s);return a({...p,class:T("button-group",c,u,l,i,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const qe=t=>{const e=["ONE","TWO","THREE"],n=K(t),o=ne(t);return a=>o({...a},e.map(i=>n(a,i)))},Cr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a=K(t),i=ne(t),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},Sr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Er={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Sr,createComponent:Cr}],gridItem:qe},kr=t=>{const e=U(t);return()=>e(Er)};function Je(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>nt.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...g]=W(c);return a({...d,type:"date",class:T("calendar",r,l,u,p,e==null?void 0:e.class,d==null?void 0:d.class)},...g)}}const Qe=t=>{const e=Je(t);return n=>e({...n})},Tr=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),i=Je(t);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},Ar=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Mr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Ar,createComponent:Tr}],gridItem:Qe},Dr=t=>{const e=U(t);return()=>e(Mr)};function Ir(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `,r=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:g,Previous:h,Next:v,...f}]=W(c);const w=()=>{r.val<=0?r.val=d.length-1:r.val--},y=()=>{r.val>=d.length-1?r.val=0:r.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*r.val}%);`},d.map(g));return a({...f,class:T("carousel",p,i,e==null?void 0:e.class,f==null?void 0:f.class)},a({class:T("control","control-previous"),onclick:w},h()),a({class:T("control","control-next"),onclick:y},v()),S)}}const $r=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Nr=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,i=K(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),r=({src:u})=>a({src:u}),s=Ir(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(s({slides:$r,Slide:r,Previous:c,Next:l}))},Br=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Pr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Br,createComponent:Nr}]},_r=t=>{const e=U(t);return()=>e(Pr)},tn=t=>{const e=$t(t);return n=>e({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Or=t=>{const{bau:e}=t,{section:n}=e.tags,o=$t(t);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Rr=`import chip from "@grucloud/bau-ui/chip";
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
`,Lr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Rr,createComponent:Or}],gridItem:tn},jr=t=>{const e=U(t);return()=>e(Lr)};function en(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=W(s);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,e==null?void 0:e.class,p==null?void 0:p.class)})}}const nn=t=>{const{bau:e,css:n}=t,{label:o}=e.tags,a=en(t);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},zr=t=>{const{bau:e,css:n}=t,{section:o,label:a}=e.tags,i=en(t),r=e.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:s})))},Hr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Ur={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Hr,createComponent:zr}],gridItem:nn},Gr=t=>{const e=U(t);return()=>e(Ur)},Fr=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Qt(t),i=K(t),r=()=>i("Header"),s=()=>o("Content");return()=>n(a({Header:r,Content:s}))},Vr=`import button from "@grucloud/bau-ui/button";
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
`,Wr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Vr,createComponent:Fr}]},Zr=t=>{const e=U(t);return()=>e(Wr)};function Xr(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u,openState:p,...d},...g]=W(s);return a({class:T(i,e==null?void 0:e.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},g))}}const Kr=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),i=Xr(t),r=K(t),s=ye(t);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},Yr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,qr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Yr,createComponent:Kr}]},Jr=t=>{const e=U(t);return()=>e(qr)},on=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Xt(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Qr=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Xt(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},ts=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,es={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:ts,createComponent:Qr}],gridItem:t=>on(t,{base:"/components/drillDownMenu",hashBased:!0})},ns=t=>{const e=U(t);return()=>e(es)};function an(t,e){const{bau:n,css:o}=t,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
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
    `};return function(u,...p){const{variant:d="outline",color:g="neutral",size:h="md",Component:v,disabled:f,...w}=u;return a({class:T(c.base,f&&c.disabled,e==null?void 0:e.class,u.class)},r({class:T(d,g,h)},v({disabled:f}),s({type:"file",disabled:f,...w})),i({class:"filename-display"}))}}const rn=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),u=an(t),p=g=>{const h=g.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:g})=>s({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return g=>u({Component:d,name:"file",accept:"text/*",onchange:p,...g})},os=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,u=n.state("No file selected"),p=an(t),d=h=>{const v=h.target.files[0];v?u.val=v.name:u.val="No file selected"},g=({disabled:h})=>c({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(e("Choose a file to upload")));return()=>s(p({Component:g,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},as=`import classNames from "@grucloud/bau-css/classNames";
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
`,rs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:as,createComponent:os}],gridItem:rn},ss=t=>{const e=U(t);return()=>e(rs)},sn=t=>{const e=ee(t);return n=>e({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},is=t=>{const{bau:e}=t,{section:n}=e.tags,o=ee(t);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},cs=`import input from "@grucloud/bau-ui/input";
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
`,ls={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:cs,createComponent:is}],gridItem:sn},us=t=>{const e=U(t);return()=>e(ls)};function cn(t,e){const{bau:n,css:o,keyframes:a}=t,{div:i}=n.tags,r=()=>nt.map(l=>`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:g="md",running:h,...v}]=W(u);return i({...v,role:"progressbar",class:{deps:[h],renderProp:()=>f=>T("linearProgress",g,p,c,f&&"running",e==null?void 0:e.class,v==null?void 0:v.class)}})}}const ln=t=>{const e=cn(t);return n=>e({...n,running:!0})},ds=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=K(t),i=cn(t),r=e.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),o,i({running:r}))},ps=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ms={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ps,createComponent:ds}],gridItem:ln},gs=t=>{const e=U(t);return()=>e(ms)},Mt={sm:12,md:16,lg:24},bs=()=>nt.map(t=>`
&.${t} {
  background-color:transparent;
}
&.plain.${t} {
  & .path {
    stroke: var(--color-${t});
  }
}
&.outline.${t} {
  border: none;
  & .path {
    stroke: var(--color-${t});
  }
}
&.solid.${t} {
  background-color:transparent;
  & .path {
    stroke: var(--font-color-inverse);
    ;
  }
}
`).join(`
`);function Ot(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:i,circle:r}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
  `;return function({size:u="md",color:p="primary",variant:d="outline",visibility:g=!0,...h}={}){const v=o`
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${Mt[u]};
      height: ${Mt[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${bs()}
    `;return i({class:{deps:[g],renderProp:()=>f=>T("spinner",v,p,d,f==!1?"":"visibility",e==null?void 0:e.class,h.class)},version:"1.1",x:"0px",y:"0px",width:Mt[u],height:Mt[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},r({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function un(t,e){const{bau:n,css:o,keyframes:a}=t,{span:i}=n.tags,r=a`
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
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:g,...h},...v]=W(l);const f=K(t),w=Ot(t);return n.bind({deps:[g],render:()=>y=>f({...h,class:T("loadingButton",d,p,u,s,y&&"loading",e==null?void 0:e.class,h==null?void 0:h.class)},w({size:d,variant:p,color:u,visibility:y}),i({class:y&&"loading"},v))})}}const dn=t=>{const e=un(t);return n=>e({...n,loading:!0},"Save")},hs=t=>{const{bau:e}=t,{section:n}=e.tags,o=un(t),a=e.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},fs=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,vs={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:fs,createComponent:hs}],gridItem:dn},xs=t=>{const e=U(t);return()=>e(vs)},ws=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ys=t=>{const{bau:e,css:n}=t,{span:o,li:a}=e.tags,i=wt(t),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},ws.map(r))},Cs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ss=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:i}=e.tags,r=wt(t),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},Cs.map(s)))},Es=`import list from "@grucloud/bau-ui/list";
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
`,ks={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Es,createComponent:Ss}],gridItem:ys},Ts=t=>{const e=U(t);return()=>e(ks)};function pn(t,e){const{bau:n,css:o}=t,{dialog:a}=n.tags,r=o`
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
    ${(()=>nt.map(s=>`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...g]=W(c);return a({class:T("modal",r,l,u,p,e==null?void 0:e.class,d==null?void 0:d.class)},...g)}}const mn=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:r}=e.tags,s=K(t),c=pn(t),l=()=>o(Array(10).fill("").map((p,d)=>r(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(s({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),s({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(s({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},As=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:r}=e.tags,s="neutral",c=K(t),l=pn(t),u=()=>o(Array(10).fill("").map((d,g)=>r(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:s,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Ms=`import modal from "@grucloud/bau-ui/modal";
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
`,Ds={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ms,createComponent:As}],gridItem:mn},Is=t=>{const e=U(t);return()=>e(Ds)},$s=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:i}=e.tags,r=K(t),s=te(t),c=()=>r({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=s({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},Ns=`import popover from "@grucloud/bau-ui/popover";
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
`,Bs={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ns,createComponent:$s}]},Ps=t=>{const e=U(t);return()=>e(Bs)};function _s(t,e){const{bau:n,css:o,config:a}=t,{div:i,a:r,span:s,nav:c}=n.tags,l=o`
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
  `,u=({text:p})=>({name:d,label:g,href:h})=>r({href:`${a.base}${h}`},s({class:"sublabel"},p),i({class:`label ${p}`},g??d));return function(...d){let[{color:g,variant:h="plain",size:v="md",data:f={},...w}]=W(d);const{next:y,previous:S}=f;return c({"data-paginationnav":JSON.stringify(f),"aria-label":"pages navigation",...w,class:T("paginationNavigation",v,l,e==null?void 0:e.class,w==null?void 0:w.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(y==null?void 0:y.href)&&u({text:"Next"})(y))}}const Os=t=>{const{bau:e}=t,{section:n}=e.tags,o=_s(t),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Rs=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Ls={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Rs,createComponent:Os}]},js=t=>{const e=U(t);return()=>e(Ls)},zs=t=>{const{bau:e}=t,{div:n}=e.tags,o=Bt(t);return a=>o({...a},n(`Paper ${a.size??""}`))},Hs=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Bt(t);return()=>n(a({size:"md"},o("My content")))},Us=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Gs={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Us,createComponent:Hs}],variantColorTableDisable:!0,gridItem:zs},Fs=t=>{const e=U(t);return()=>e(Gs)};function gn(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>nt.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
  `).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p="md",...d}]=W(c);return a({...d,type:"radio",class:T("radio-button",p,l,u,r,e==null?void 0:e.class,d==null?void 0:d.class)})}}const bn=t=>{const{bau:e,css:n}=t,{label:o,form:a}=e.tags,i=gn(t);return r=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),o("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Vs=t=>{const{bau:e}=t,{label:n,div:o,form:a}=e.tags,i=gn(t),r=e.state("one"),s=({target:c})=>r.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:s})),n("Two",i({id:"two",name:"radio",value:r,oninput:s})),o("Choice: ",r))},Ws=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Zs={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Ws,createComponent:Vs}],gridItem:bn},Xs=t=>{const e=U(t);return()=>e(Zs)},Ks=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function hn(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,r=K(t),s=te(t),c=wt(t),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Ks()}
  `,u=n.state(""),p=n.state(!1),d=n.state(0);return function(...h){let[{color:v="neutral",variant:f="outline",size:w="md",id:y,label:S,Option:I,options:$,getOptionLabel:O=({label:b})=>b,...A},...B]=W(h);const D=()=>{m.openDialog(),m.focus(),p.val=!0},j=()=>{m.closeDialog(),p.val=!1},Y=()=>{p.val=!1},Q=b=>{p.val?j():D()},z=({option:b,index:C})=>E=>{u.val=O(b),d.val=C,j()},F=b=>{switch(b.preventDefault(),b.key){case"Escape":j();break;case"ArrowDown":d.val<$.length-1?d.val++:d.val=0;break;case"ArrowUp":d.val<=0?d.val=$.length-1:d.val--;break;case"Enter":p.val?(u.val=O($[d.val]),j()):D();break}},G=()=>c({tabindex:"0",class:T(v,f)},$.map((b,C)=>i({class:()=>T(d.val==C&&"active"),onclick:z({option:b,index:C})},I(b)))),x=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":S,onclick:Q,color:v,variant:f,size:w},()=>!u.val&&S,u),m=s({id:y,triggerEl:x,contentEl:G(),onClose:Y});return a({...A,class:T("select",v,w,l,e==null?void 0:e.class,A==null?void 0:A.class),onkeydown:F},x,m)}}const fn=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=hn(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Ys=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,r=hn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},qs=`import select from "@grucloud/bau-ui/select";
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
`,Js={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:qs,createComponent:Ys}],gridItem:fn},Qs=t=>{const e=U(t);return()=>e(Js)};function Rt(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    ${(()=>nt.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...g]=W(c);return a({...d,type:"range",class:T("slider",l,u,p,r,e==null?void 0:e.class,d.class)},...g)}}const vn=t=>{const{bau:e}=t,n=e.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Rt(t);return i=>a({...i,oninput:o})},ti=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:i}=e.tags,r=e.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=Rt(t);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},ei=`import slider from "@grucloud/bau-ui/slider";
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
`,ni=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:r,br:s,option:c}=e.tags,l=e.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Rt(t);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},oi=`import slider from "@grucloud/bau-ui/slider";
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
`,ai=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:r,br:s,option:c}=e.tags,l=e.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Rt(t);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},ri=`import slider from "@grucloud/bau-ui/slider";
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
`,si={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ei,createComponent:ti},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:oi,createComponent:ni},{title:"Vertical Mark",description:"A vertical slider with marks.",code:ri,createComponent:ai}],gridItem:vn},ii=t=>{const e=U(t);return()=>e(si)},xn=t=>{const e=Ot(t);return n=>e({...n})},ci=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ot(t);return()=>n(o({}))},li=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,ui={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:li,createComponent:ci}],gridItem:xn},di=t=>{const e=U(t);return()=>e(ui)},pi=()=>nt.map(t=>`
&.switch.plain.${t} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${t});
  }
}
&.switch.outline.${t} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${t});
  }
}
&.switch.soft.${t} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${t});
  }
}
&.switch.solid.${t} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-400);
  } 
  &:checked {
    background-color: var(--color-${t}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-400);
  }
}
`).join(`
`);function wn(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${pi()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=W(s);return a({...p,class:T("switch",i,c,l,u,e==null?void 0:e.class,p.class),type:"checkbox",required:"required"},...d)}}const yn=t=>{const{bau:e,css:n}=t,{form:o,label:a}=e.tags,i=wn(t);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},mi=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i}=e.tags,r=wn(t);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},gi=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,bi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:gi,createComponent:mi}],gridItem:yn},hi=t=>{const e=U(t);return()=>e(bi)},fi=()=>nt.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function yt(t,e){const{bau:n,css:o}=t,{tabDefs:a}=e,{div:i,ul:r,li:s}=n.tags,c=n.state(a),l=n.state(a[0]),u=d=>c.val.find(g=>g.name==d),p={base:o`
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
      ${fi()}
    `};return function(...g){let[{color:h,variant:v="plain",size:f,...w},...y]=W(g);const S=$=>{const{Header:O,disabled:A,name:B}=$;return s({class:()=>T(l.val.name==B&&"active",A&&"disabled"),onclick:D=>D.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},O($))},I=i({class:T("tabs",p.base,v,f,h,e==null?void 0:e.class,w.class)},n.loop(c,r(),S),()=>l.val.Content?l.val.Content({}):"");return I.addEventListener("tab.select",$=>{var B,D;const{tabName:O}=$.detail,A=u(O);A&&((B=l.val.exit)==null||B.call(),l.val=A,(D=A.enter)==null||D.call())},!1),I.addEventListener("tab.add",$=>{var A;const{tab:O}=$.detail;(A=O.enter)==null||A.call(),c.val.push(O)},!1),I.addEventListener("tab.remove",$=>{var A;const O=c.val.findIndex(B=>B.name==$.detail.tabName);O>0&&((A=c.val[O].exit)==null||A.call(),c.val.splice(O,1))},!1),I}}const Cn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},vi=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},xi=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,wi=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},yi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Sn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Ci=t=>{const{css:e}=t,n=yt(t,{tabDefs:Sn(t)});return()=>n({variant:"outline",color:"neutral",class:e`
        flex-direction: column-reverse;
      `})},Si=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Ei=t=>{const{css:e}=t,n=Sn(t),o=yt(t,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:e`
        & ul {
          justify-content: center;
        }
      `})},ki=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Ti={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:xi,createComponent:vi},{title:"Extended Tabs",description:"An extended tabs.",code:yi,createComponent:wi},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Si,createComponent:Ci},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:ki,createComponent:Ei}],gridItem:Cn},Ai=t=>{const e=U(t);return()=>e(Ti)};function Ct(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=W(c);return i({...l,class:T("table-container",r,e==null?void 0:e.class,l==null?void 0:l.class)},...u)}}const Mi=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=e.tags;function p(f,w,y,S,I){return{name:f,calories:w,fat:y,carbs:S,protein:I}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:f,calories:w})=>r(i(f),i({class:n`
            text-align: right;
          `},w)),h=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=Ct(t,{class:n`
      max-width: 650px;
    `});return()=>o(v(s(u("Basic Table"),h(),l(d.map(g)))))},Di=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function bt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Ii=[bt("Frozen yoghurt",159,6,24,4),bt("Ice cream sandwich",237,9,37,4.3),bt("Eclair",262,16,24,6),bt("Cupcake",305,3.7,67,4.3),bt("Gingerbread",356,16,49,3.9)],$i=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=e.tags,p=({name:h,calories:v})=>r(i(h),i({class:n`
            text-align: right;
          `},v)),d=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ct(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(s(u("Table Dense"),d(),l(Ii.map(p)))))},Ni=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ht(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Bi=[ht("Frozen yoghurt",159,6,24,4),ht("Ice cream sandwich",237,9,37,4.3),ht("Eclair",262,16,24,6),ht("Cupcake",305,3.7,67,4.3),ht("Gingerbread",356,16,49,3.9)],Pi=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=e.tags,p=({name:h,calories:v})=>r(i(h),i({class:n`
            text-align: right;
          `},v)),d=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ct(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(s(u("Table Zebra"),d(),l(Bi.map(p)))))},_i=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Oi={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Di,createComponent:Mi},{title:"Dense",description:"A dense table.",code:Ni,createComponent:$i},{title:"Zebra",description:"A zebra table.",code:_i,createComponent:Pi}]},Ri=t=>{const e=U(t);return()=>e(Oi)};function Li(t,e={}){const{bau:n,css:o,window:a}=t,{nav:i,ul:r,li:s,a:c}=n.tags,{headerSelector:l="h2,h3"}=e,u=n.state(""),p=(f,w)=>{let y=null;return(...S)=>{a.clearTimeout(y),y=a.setTimeout(()=>f(...S),w)}},d=o`
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
  `,g=({value:f,id:w,children:y=[]})=>{const S=c({class:()=>u.val==w?"active":"",href:`#${w}`});return S.innerHTML=f,s({class:()=>u.val==w?"active":""},S,y.length>0&&r(y.map(g)))},h=f=>f.tagName.charAt(1),v=({contentEl:f})=>{const w=f.querySelectorAll(l);let y=2,S={},I={children:[]},$=I;const O=$;let A=[$];return[...w].forEach(B=>{const D=h(B);S={value:B.innerHTML,id:B.id,children:[]},y==D?(I=S,$.children.push(I)):y<D?(A.push($),$=I,I.children.push(S),I=S):y>D&&($=A[D-1],A=A.slice(0,D-1),$.children.push(S),I=S),y=D}),O};return function(...w){let[{color:y,variant:S,size:I="md",contentEl:$,...O}]=W(w);const A=v({contentEl:$}),B=p(()=>{const j=[...$.querySelectorAll(l)].find(Y=>{const{top:Q,height:z}=Y.getBoundingClientRect();if(Q+z>60)return!0});j&&(u.val=j==null?void 0:j.id)},100);return i({...O,class:T("tableOfContent",I,S,y,d,e==null?void 0:e.class,O==null?void 0:O.class),bauMounted:()=>{a.addEventListener("scroll",B)},bauUnmounted:()=>{a.removeEventListener("scroll",B)}},A.children&&r(A.children.map(g)))}}const ji=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:i,section:r,article:s}=e.tags,c=Li(t),l=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>r({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},zi=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Hi={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:zi,createComponent:ji}]},Ui=t=>{const e=U(t);return()=>e(Hi)};function En(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=ne(t),r=K(t),s=Ot(t),c=o`
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
  `,l=({label:h,icon:v,...f})=>r({"aria-label":h,title:h,...f},v),u=({count:h,totalCount:v,page:f,rowsPerPage:w})=>a({class:"pages-numbers"},Number(f-1)*Number(w)+(h>0?1:0),"-",Math.min(f*w,v)," of ",v),p=({count:h,page:v,rowsPerPage:f})=>a({class:"pages-numbers"},(v-1)*f+(h>0?1:0),"-",v*f),d=h=>h<=1,g=(h,v,f)=>h>=Math.ceil(v/f);return function(...v){let[{count:f=0,totalCount:w=0,page:y=1,rowsPerPage:S=50,onPageChange:I,isLoading:$=!1,disableFirst:O=()=>d(y),disablePrevious:A=()=>d(y),disableNext:B=()=>g(y,w,S),disableLast:D=()=>g(y,w,S),...j},...Y]=W(v);const Q=Math.max(0,Math.ceil(w/S)),z=I({page:1}),F=I({page:y-1}),G=I({page:y+1}),x=I({page:Q}),m=[{label:"First",icon:"⟪",onclick:z,disabled:O()},{label:"Previous",icon:"⟨",onclick:F,disabled:A()},{label:"Next",icon:"⟩",onclick:G,disabled:B()},{label:"Last",icon:"⟫",onclick:x,disabled:D()}];return a({...j,class:T("table-pagination",c,$&&"disabled",e==null?void 0:e.class,j==null?void 0:j.class)},s({class:"spinner",visibility:$,size:"md"}),w>0?u({count:f,totalCount:w,page:y,maxPages:Q,rowsPerPage:S}):p({count:f,page:y,maxPages:Q,rowsPerPage:S}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Gi=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Fi=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=e.tags,l=Gi(45),u=({name:y,email:S})=>i(a(y),a(S)),p=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=En(t),g=Ct(t,{class:n`
      max-width: 650px;
    `}),h=e.state(l),v=e.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),f=e.derive(()=>h.val.slice(v.val.page*v.val.rowsPerPage,(v.val.page+1)*v.val.rowsPerPage)),w=({page:y})=>S=>{v.val.page=y};return()=>g(r(p(),()=>c(f.val.map(u))),()=>d({...v.val,onPageChange:w}))},Vi=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=e.tags,u=e.state(!1),p=e.state([]),d=e.state(""),g=e.derive(()=>p.val.length),h=e.state(1),v=e.state(10),f=e.derive(()=>p.val),w=D=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(D).toString()}`,y=({page:D})=>j=>{h.val=D,S(w({page:D,per_page:v.val}))};S(w({page:1,per_page:v.val}));async function S(D){try{u.val=!0;const j=await fetch(D,{});if(j.ok){const Y=await j.json();p.val=Y;return}throw j}catch(j){d.val=j.message}finally{u.val=!1}}const I=({name:D,description:j,stargazers_count:Y})=>i(a(D),a(j),a({class:n`
            text-align: right;
          `},Y)),$=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),O=En(t),A=Ct(t,{class:n`
      min-width: 650px;
    `}),B=({message:D})=>l(D);return()=>A(()=>O({rowsPerPage:v.val,page:h.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:y,disableNext:()=>!1}),r($(),()=>d.val&&B({message:d.val}),()=>c(f.val.map(I))))},Wi=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:i,h2:r,tr:s}=e.tags,c=Fi(t),l=Vi(t),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function kn(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{button:i}=n.tags;a`
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
  `;return function(...c){let[{color:l,variant:u,size:p="md",selected:d=!1,disabled:g,...h},...v]=W(c);return i({type:"button",...h,"aria-pressed":{deps:[d],renderProp:()=>f=>f},class:{deps:[d],renderProp:()=>f=>T("toggle",p,l,u,r,f&&"selected",e==null?void 0:e.class,h==null?void 0:h.class)},disabled:g},v)}}const Zi=t=>{const{bau:e}=t,n=kn(t);return console.log("grid item"),o=>{const a=e.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},Xi=t=>{const{bau:e}=t,{section:n}=e.tags,o=kn(t),a=e.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Ki=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Yi={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Ki,createComponent:Xi}],gridItem:Zi},qi=t=>{const e=U(t);return()=>e(Yi)};function oe(t,e){const{bau:n,css:o,window:a}=t,{div:i}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:g="md",...h},...v]=W(c);const f=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,g),role:"tooltip"},l)),w=A=>`move-to-${A}`,y=(A,B,D)=>{if(A()){const j=w(B);f.classList.add(j),f.classList.add(B),f.classList.remove(D)}},S=(A,B)=>{const D=w(A);f.classList.contains(D)&&(f.classList.remove(D),f.classList.add(B),f.classList.remove(A))},I=A=>{const B=f.getBoundingClientRect();y(()=>B.x<0,"right","left"),y(()=>B.x+B.width>a.innerWidth,"left","right"),y(()=>B.y<0,"bottom","top"),y(()=>B.bottom>a.innerHeight,"top","bottom"),f.classList.add("visible")},$=A=>{f.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...h,class:T("tooltip",r,e==null?void 0:e.class,h==null?void 0:h.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",I),A.addEventListener("mouseout",$)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",I),A.removeEventListener("mouseout",$)}},...v,f)}}const Tn=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i}=e.tags,r=K(t),s=oe(t),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},Ji=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,i=K(t),r=oe(t),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},Qi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,tc=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i,section:r}=e.tags,s=(...p)=>$t(t)({variant:"outline",color:"primary"},p),c=oe(t),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>r({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},s("bottom start")),c({side:"bottom-centered",titleEl:l()},s("bottom centered")),c({side:"bottom-end",titleEl:l()},s("bottom end"))));return()=>u()},ec=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,nc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Qi,createComponent:Ji},{title:"Grid",description:"Various tooltip position",code:ec,createComponent:tc}],gridItem:Tn},oc=t=>{const e=U(t);return()=>e(nc)},An=t=>{const e=Zt(t);return n=>e(n)},ac=t=>{const{bau:e}=t,{section:n}=e.tags,o=Zt(t);return()=>n(o({}))},rc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,sc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:rc,createComponent:ac}],gridItem:An},ic=t=>{const e=U(t);return()=>e(sc)},cc=({css:t,createGlobalStyles:e})=>(e`
:root {
  --treeview-link-padding-horizontal: 0.75rem;
  --treeview-link-padding-vertical: 0.375rem;
}
`,{nav:t`
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
  `});function Mn(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:i}=e,{ul:r,li:s,nav:c,div:l}=n.tags,u=cc({css:o,createGlobalStyles:a}),p=Qt(t),d=({depth:g=1,maxDepth:h,color:v,variant:f,size:w})=>y=>{const{children:S,expanded:I}=y,$=n.state(!I),O=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:B=>{S&&($.val=!$.val)}},i(y.data)),A=()=>r({class:T(v,w)},S.map(d({depth:g+1,maxDepth:h})));return s(p({Header:O,Content:S&&g<h&&A}))};return function({tree:h,maxDepth:v=1/0,size:f="md",variant:w="plain",color:y="neutral",...S}){return c({class:T(u.nav,f,w,y,e==null?void 0:e.class,S.class)},h.children&&r(h.children.map(d({maxDepth:v,color:y,variant:w,size:f}))))}}const Dn=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Mn(t,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},lc=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Mn(t,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},uc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,dc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:uc,createComponent:lc}],gridItem:Dn},pc=t=>{const e=U(t);return()=>e(dc)},mc=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:i,p:r,ul:s,li:c}=e.tags,l=Le(t),u=K(t),p=[{name:"Accordion",Item:je(t)},{name:"Alert",Item:He(t)},{name:"Autocomplete",Item:Ve(t)},{name:"Avatar",Item:Ge(t)},{name:"Badge",Item:Ze(t)},{name:"Breadcrumbs",Item:Ke(t)},{name:"Button",Item:Ye(t)},{name:"Button Group",Item:qe(t)},{name:"Calendar",Item:Qe(t)},{name:"Checkbox",Item:nn(t)},{name:"Chip",Item:tn(t)},{name:"DrillDown Menu",Item:on(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:rn(t)},{name:"Input",Item:sn(t)},{name:"Linear Progress",Item:ln(t)},{name:"Loading Button",Item:dn(t)},{name:"Modal",Item:mn(t)},{name:"Radio Button",Item:bn(t)},{name:"Select",Item:fn(t)},{name:"Slider",Item:vn(t)},{name:"Spinner",Item:xn(t)},{name:"Switch",Item:yn(t)},{name:"Tabs",Item:Cn(t)},{name:"Theme Switch",Item:An(t)},{name:"Tooltip",Item:Tn(t)},{name:"Tree View",Item:Dn(t)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},gc=({context:t})=>[{path:"",action:e=>({title:"Bau UI",component:vo(t)})},{path:"GettingStarted",action:e=>({title:"Getting Started",component:Ca(t)})},{path:"components",action:()=>({title:"Component",component:mc(t)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Na(t)})},{path:"alert",action:()=>({title:"Alert",component:Ha(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Wa(t)})},{path:"animate",action:()=>({title:"Animate",component:Ja(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:cr(t)})},{path:"avatar",action:()=>({title:"Avatar",component:nr(t)})},{path:"badge",action:()=>({title:"Badge",component:pr(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:hr(t)})},{path:"button",action:()=>({title:"Button",component:wr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:kr(t)})},{path:"calendar",action:()=>({title:"Calendar",component:Dr(t)})},{path:"carousel",action:()=>({title:"Carousel",component:_r(t)})},{path:"chip",action:()=>({title:"Chip",component:jr(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Gr(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Zr(t)})},{path:"drawer",action:()=>({title:"Drawer",component:Jr(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:ns(t)})},{path:"fileInput",action:()=>({title:"File Input",component:ss(t)})},{path:"input",action:()=>({title:"Input",component:us(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:gs(t)})},{path:"list",action:()=>({title:"List",component:Ts(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:xs(t)})},{path:"modal",action:()=>({title:"Modal",component:Is(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:js(t)})},{path:"paper",action:()=>({title:"Paper",component:Fs(t)})},{path:"popover",action:()=>({title:"Popover",component:Ps(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Xs(t)})},{path:"select",action:()=>({title:"Select",component:Qs(t)})},{path:"slider",action:()=>({title:"Slider",component:ii(t)})},{path:"spinner",action:()=>({title:"Spinner",component:di(t)})},{path:"switch",action:()=>({title:"Switch",component:hi(t)})},{path:"table",action:()=>({title:"Table",component:Ri(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Ui(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Wi(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Ai(t)})},{path:"toggle",action:()=>({title:"Toggle",component:qi(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:oc(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ic(t)})},{path:"treeView",action:()=>({title:"Tree View",component:pc(t)})}]},{path:"pages",action:e=>({title:"Pages",component:yo(t)})}],bc=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),hc=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=t,r=a.state(),s=e({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:g=e}=l.resolve({pathname:u});r.val=d,document.title=`${p}`}},fc=t=>{const{createGlobalStyles:e}=t;e`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};Yn();const In={title:"Bau",base:"/bau/bau-ui"},lt=ao({config:In}),{bau:vc}=lt;lt.states={drawerOpen:vc.state(!0)};fc(lt);zn({routes:gc({context:lt}),onLocationChange:hc({context:lt,LayoutDefault:go(lt),config:In}),notFoundRoute:bc(lt)});
