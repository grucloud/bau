(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Pn=(t,e)=>({...t,paths:[...e,t.path]}),ve=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=Pn(o,t);return n?[a,...ve({paths:[...t,o.path],routes:n})]:a}),_n=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},On=({routes:t=[],notFoundRoute:e})=>{const n=ve({routes:t}).map(o=>({...o,regex:_n(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function Rn({routes:t,notFoundRoute:e,onLocationChange:n}){const o=On({routes:t,notFoundRoute:e});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Vt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Ln=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],jn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],se=t=>`var(--color-${t})`,zn=t=>`var(--color-${t}-lightest)`,Hn=()=>Vt.map(([t])=>`
.outline.${t} {
  border: 2px solid ${se(t)};
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${zn(t)};
}
.solid.${t} {
  background-color: ${se(t)};
}
`).join(`
`),Un=()=>Vt.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),Gn=t=>100-t*10,Fn=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${Gn(e)}%);`).join(`
`),ie=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),Vn=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...Ln.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),...jn.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function Wn({createGlobalStyles:t},{colorPalette:e=Vt}={}){t`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${e.map(([n,o])=>Vn([n,o])).join(`
`)}
      ${Fn()}
      ${ie({})}
      ${Hn()}
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
      ${Un()}
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
  `}function Zn(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let Wt=t=>Object.prototype.toString.call(t??0).slice(8,-1),Xn=t=>Wt(t)=="Object",ce=t=>Wt(t)=="Function",Ut=t=>["Object","Array"].includes(Wt(t)),le=Object.getPrototypeOf,Gt=t=>mt(t)?t.val:t,mt=t=>t==null?void 0:t.__isState,Kn=["splice","push","pop","shift","unshift","sort","reverse"],kt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const X=t=>!mt(t[0])&&Xn(t[0])?t:[{},...t];function Yn(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,i=new Set,s=!1,r,c=x=>n.createElement(x),l=(x,m,g)=>{let w=r;r=m;let E=x(g);return r=w,E},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(x=>{x.bindings=x.bindings.filter(m=>{var g;return(g=m.element)==null?void 0:g.isConnected}),!x.bindings.length&&!x.computed&&a.delete(x)}),o=void 0}))},p=(x,m,g,w,E,P)=>{var I;if(s){i.add(x);return}for(let W of x.bindings){let{deps:$,element:M,renderInferred:V,render:J,renderItem:Q}=W;if(Q&&m)(I=h(M,w,(...at)=>v(Q(...at)),g,E,P)[m])==null||I.call();else{let at=V?V({element:M}):J({element:M,renderItem:Q})(...$.map(Gt));at!==M&&M.replaceWith(W.element=v(at))}}S(x),u()},d=(x,m,g=[])=>({get(w,E,P){var I;if(r==null||r.add(x),E==="_isProxy")return!0;if(!((I=w[E])!=null&&I._isProxy)&&!mt(w[E])&&Ut(w[E]))w[E]=new Proxy(w[E],d(x,m,[...g,E]));else if(Kn.includes(E)){let W=w[E];return(...$)=>{let M=W.apply(w,$);return p(x,E,M,$,m,g),M}}return Reflect.get(w,E,P)},set(w,E,P,I){let W=Reflect.set(w,E,P,I);return p(x,"setItem",W,{prop:E,value:P},m,[...g,E]),W}}),b=(x,m)=>new Proxy(m,d(x,m)),h=(x,m,g,w,E,P)=>{let I=()=>x.replaceChildren(...kt(w,g)),W=$=>x[$]&&x.removeChild(x[$]);return{assign:I,sort:I,reverse:I,setItem:()=>{var M;let $=P[0];(M=x.children[$])==null||M.replaceWith(g(E[$],$))},push:()=>x.append(...kt(m,($,M)=>g($,E.length+M))),unshift:()=>x.prepend(...kt(m,g)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{let[$,M,...V]=m;const{length:J}=x.children;for(let Q=$>=0?Math.min($+M-1,J-1):J-1;Q>=($>=0?$:J+$);Q--)x.children[Q].remove();if(V.length){let Q=V.forEach((at,Lt)=>g(at,$+Lt));x.children[$]?x.children[$].after(...Q):x.append(...Q)}}}},f=x=>({oldVal:x,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=Ut(x)?b(m,x):x,m.valProxy)},set val(m){let g=this,w=g.val;Ut(m)?(g.valProxy=b(g,m),p(g,"assign",m)):m!==w&&(g.valProxy=m,p(g)),g.oldVal=w}}),v=x=>x==null||x===!1?c("span"):x.nodeType?x:n.createTextNode(x),y=(x,m)=>{let g=new Set;return m.val=l(x,g),g},C=x=>{let m=f(),g=y(x,m);m.computed=!0;for(let w of g)w.listeners.push({computed:x,deps:g,state:m});return m},S=x=>{for(let m of[...x.listeners])y(m.computed,m.state)},B=(x,...m)=>{if(m.length){let g=[];for(let w of m.flat(1/0))w!=null&&g.push(mt(w)?j({deps:[w],render:()=>E=>E}):ce(w)?et({renderInferred:w}):v(w));x.append(...g)}},_={},L=(x,m)=>x&&(Object.getOwnPropertyDescriptor(x,m)??L(le(x),m)),D=(x,m,g)=>{var w;return _[x+","+m]??(_[x+","+m]=((w=L(g,m))==null?void 0:w.set)??0)},O=(x,m)=>new e.MutationObserver((g,w)=>{g.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(P=>P===x&&(m({element:x}),w.disconnect(),!0)))}).observe(x.parentNode,{childList:!0}),N=(x,m)=>new e.MutationObserver((g,w)=>g.forEach(E=>m({record:E,element:x}))).observe(x,{childList:!0}),H=x=>new Proxy(function(g,...w){var W;let[E,...P]=X(w),I=x?n.createElementNS(x,g):c(g);for(let[$,M]of Object.entries(E)){if($.startsWith("bau"))continue;let V=D(g,$,le(I))?J=>I[$]=J:J=>I.setAttribute($,J);M==null||(mt(M)?j({deps:[M],render:()=>()=>(V(M.val),I)}):ce(M)&&(!$.startsWith("on")||M.isDerived)?et({renderInferred:()=>(V(M({element:I})),I)}):M.renderProp?j({deps:M.deps,render:()=>()=>(V(M.renderProp({element:I})(...M.deps.map(Gt))),I)}):V(M))}return E.bauChildMutated&&N(I,E.bauChildMutated),B(I,...P),(W=E.bauCreated)==null||W.call(E,{element:I}),E.bauMounted&&e.requestAnimationFrame(()=>E.bauMounted({element:I})),E.bauUnmounted&&e.requestAnimationFrame(()=>O(I,E.bauUnmounted)),I},{get:(m,g)=>m.bind(void 0,g)}),q=(x,m,g)=>{x.element=v(g);for(let w of m)mt(w)&&(a.add(w),w.bindings.push(x));return x.element},et=({renderInferred:x,element:m})=>{let g=new Set,w=l(x,g,{element:m});return q({renderInferred:x},g,w)},j=({deps:x,element:m,render:g,renderItem:w})=>q({deps:x,render:g,renderItem:w},x,g({element:m,renderItem:w})(...x.map(Gt))),F=(x,m,g)=>j({deps:[x],render:({renderItem:w})=>E=>(m.append(...kt(E,w)),m),renderItem:g}),U=x=>{s=!0,x(),s=!1,i.forEach(p),i.clear()};return{tags:H(),tagsNS:H,state:f,bind:j,loop:F,derive:C,stateSet:a,batch:U}}const qn=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},Jn=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Qn=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function to(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...i)=>{const s=Qn(a,i),r=qn(s);return!e.getElementById(r)&&Jn(e,t==null?void 0:t.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function eo(t){const e=Yn(),n=to();return Wn(n),{bau:e,...n,tr:o=>o,window,...t}}function T(...t){return t.filter(e=>e).join(" ")}function It(t,e={}){const{bau:n}=t,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:T("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!s()||d.getAttribute("cloned"))return;const b=d.cloneNode(!0);b.setAttribute("cloned",!0),b.style.top=0,b.style.left=0,b.style.width=d.getAttribute("width"),b.style.height=d.getAttribute("height"),b.style.position="absolute",b.style.animation=s(),u.target.appendChild(b),b.addEventListener("animationend",()=>b.parentNode.removeChild(b))}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const b=d.getBoundingClientRect();if(d.setAttribute("width",b.width+"px"),d.setAttribute("height",b.height+"px"),r()){d.style.animation=r();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function K(t,e){const{bau:n,css:o}=t,a={root:o`
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
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:u,href:p,...d},...b]=X(s);return(p?n.tags.a:n.tags.button)({...d,class:T("button",a.root,c,l,r,p?a.a:a.button,u&&a.disabled,e==null?void 0:e.class,d.class),disabled:u,href:p,...!p&&{type:"button"}},b)}}const ot=["neutral","primary","success","danger","warning"],no=["plain","outline","solid"],oo=["sm","md","lg"],ao="light",ro=()=>ot.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function Zt(t,e){const{bau:n,css:o,window:a}=t,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(ao);const l=o`
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
    ${ro()}
  `;return function(...p){let[{color:d,variant:b="outline",size:h="md",...f},...v]=X(p);return i({required:"required",title:"Switch Theme",...f,class:T("theme-switch",d,b,h,l,e==null?void 0:e.class,f.class),type:"checkbox",checked:r()=="dark",onclick:y=>{s(y.target.checked?"dark":"light")}},...v)}}function so(t){const{tr:e,bau:n,css:o,config:a,states:i}=t,{i:s,header:r,h1:c,div:l,a:u,img:p,b:d,ul:b,li:h}=n.tags,{svg:f,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),y=i.drawerOpen,C=K(t,{class:o`
      background: transparent;
    `}),S=Zt(t),B=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),_=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},C({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},B()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(e("Bau UI")))),L=()=>l({class:o`
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
        `},_(),L())}}function io({tr:t,bau:e,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:p}=e.tags,d=({links:f,title:v})=>o({class:n`
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
        `},p(v),r(f.map(({href:y,name:C})=>c(s({href:y},C))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},d({title:"Bau UI",links:b}),d({title:"Bau Ecosystem",links:h})),u({class:n`
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
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=X(r);return a({...p,class:T("list",i,c,l,u,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const Tt="0.3s",xe=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(xe({parent:n,grandParent:t})),t&&(t.parentTree=e),i.parentTree=t,i},we=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=we(t)(e.children[o]);if(a)return a}},co=({keyframes:t})=>({hideToLeft:t`
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
   `});function Xt(t,e={}){const{bau:n,css:o,window:a,config:i}=t,{base:s="",hashBased:r=!1}=e,c=`${i.base}${s}`,l=j=>{var F;return((F=j.parentTree.data)==null?void 0:F.href)??j.parentTree.children[0].data.href},u=({variant:j,color:F,size:U,currentTree:x,data:m})=>S(D({variant:j,color:F,size:U,href:`${c}${l(x)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:j,color:F,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:j,subTree:{data:{name:F,href:U},children:x=[]}})=>D({size:j,href:`${c}${U}`,"data-ischild":!x.length},F),d=({pathname:j,subTree:F})=>{var U;return j===((U=F==null?void 0:F.data)==null?void 0:U.href)},{renderHeader:b=u,renderMenuItem:h=p,isActive:f=d}=e,{li:v,nav:y,div:C,header:S,a:B}=n.tags,_=It(t),L=wt(t),D=K(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:O,hideToRight:N}=co(t),H=o`
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
  `,q=({variant:j,color:F,size:U,currentTree:x,pathnameState:m})=>{const{children:g,parentTree:w,data:E}=x;return C({class:T("drillDownMenu",j,F,U)},w&&b({variant:j,color:F,size:U,data:E,currentTree:x}),g&&L({class:T(j,F,U)},g.map(P=>v({class:()=>T(P.children&&"has-children",f({pathname:m.val,subTree:P})&&"active")},h({variant:j,color:F,size:U,subTree:P})))))},et=({tree:j,pathname:F})=>{let U=xe({})(structuredClone(j)),x=we(F)(U);return x||(console.error("drilldown no sub tree",F),x=U),x};return function(F){const{variant:U="plain",color:x="neutral",size:m="md",tree:g,...w}=F,E=n.state(a.location.pathname.replace(c,"")),P=n.derive(()=>et({tree:g,pathname:E.val}));a.document.addEventListener("click",V=>{const{target:J}=V,Q=J.getAttribute("href");if(J.tagName==="A"&&Q&&!Q.startsWith("http")){let at=Q.replace(c,"");r||(at=at.replace(J.hash,"")),E.val=at}});let I=1;const W=V=>{const{dataset:J}=V.target;J.buttonback=="true"?I=-1:J.ischild=="false"?I=1:J.ischild=="true"&&(I=0)},$=V=>{switch(V){case 1:return`${O} ${Tt}`;case-1:return`${N} ${Tt}`;default:return""}},M=V=>{switch(V){case 1:return`${N} ${Tt} reverse`;case-1:return`${O} ${Tt} reverse`;default:return""}};return y({class:T(H,e==null?void 0:e.class,w.class),onclick:W},_({animationHide:()=>$(I),animationShow:()=>M(I)},()=>q({variant:U,color:x,size:m,currentTree:P.val,pathnameState:E})))}}const lo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function ye(t){const{tr:e,bau:n,css:o,config:a,states:i,window:s}=t,{div:r,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let b=!1;const h=Xt(t);return function(){return r({bauMounted:({element:v})=>{s.innerWidth<=640&&(b=!0,i.drawerOpen.val=!1)},onclick:v=>{b&&!v.target.dataset.buttonback&&!v.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},h({tree:lo}))}}const uo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:i}=e.tags,s=It(t),r=so(t),c=ye(t),l=io(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(d="")=>`${u} ease-in-out 0.5s ${d}`;return function({componentState:b}){return i({class:n`
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
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>b.val&&b.val({})),l())}};function Nt(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...b]=X(r);return a({...d,onclick:p,class:T("chip",i,c,l,u,p&&"clickable",e==null?void 0:e.class,d==null?void 0:d.class)},...b)}}function po(t){const{bau:e,css:n,config:o}=t,{div:a,h1:i,h2:s,p:r}=e.tags;K(t);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),s(p),r(d))}}function mo(t){const{bau:e,css:n}=t,{div:o,h1:a,p:i}=e.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function bo({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=e.tags,p=({maxSize:d=151})=>({libName:b,size:h})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},b),s({class:n`
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
              `},h)));return function({data:b=[]}){return o({class:n`
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
          `},b.map(p({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function go(t){const{bau:e,css:n,config:o}=t,{div:a,p:i,a:s,section:r}=e.tags,c=po(t),l=mo(t),u=K(t);Nt(t);const p=bo(t),d=(...y)=>a({class:n`
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
          `},...y)),b=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:h}),v())}}function ho(t,e={}){const{bau:n,css:o}=t,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const fo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:i,h2:s}=n.tags,r=ho(t);return()=>o({id:"login"},s(e("Login Examples")),i("Basic"),a(r()))};function vo(t){const{tr:e,bau:n,css:o}=t,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(e("Pages Examples")),fo(t)()))}}function xo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ce(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ce(n)}),t}class ue{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ee(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function it(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const wo="</span>",de=t=>!!t.scope,yo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Co{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Ee(e)}openNode(e){if(!de(e))return;const n=yo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){de(e)&&(this.buffer+=wo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const pe=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class Kt{constructor(){this.rootNode=pe(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=pe({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{Kt._collapse(n)}))}}class Eo extends Kt{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Co(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function vt(t){return t?typeof t=="string"?t:t.source:null}function Se(t){return dt("(?=",t,")")}function So(t){return dt("(?:",t,")*")}function ko(t){return dt("(?:",t,")?")}function dt(...t){return t.map(n=>vt(n)).join("")}function To(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function Yt(...t){return"("+(To(t).capture?"":"?:")+t.map(o=>vt(o)).join("|")+")"}function ke(t){return new RegExp(t.toString()+"|").exec("").length-1}function Ao(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Mo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qt(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let i=vt(o),s="";for(;i.length>0;){const r=Mo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(e)}const Do=/\b\B/,Te="[a-zA-Z]\\w*",Jt="[a-zA-Z_]\\w*",Ae="\\b\\d+(\\.\\d+)?",Me="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",De="\\b(0b[01]+)",Io="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",No=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=dt(e,/.*\b/,t.binary,/\b.*/)),it({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},xt={begin:"\\\\[\\s\\S]",relevance:0},$o={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xt]},Bo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xt]},Po={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},$t=function(t,e,n={}){const o=it({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Yt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:dt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},_o=$t("//","$"),Oo=$t("/\\*","\\*/"),Ro=$t("#","$"),Lo={scope:"number",begin:Ae,relevance:0},jo={scope:"number",begin:Me,relevance:0},zo={scope:"number",begin:De,relevance:0},Ho={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xt,{begin:/\[/,end:/\]/,relevance:0,contains:[xt]}]}]},Uo={scope:"title",begin:Te,relevance:0},Go={scope:"title",begin:Jt,relevance:0},Fo={begin:"\\.\\s*"+Jt,relevance:0},Vo=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var At=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Do,IDENT_RE:Te,UNDERSCORE_IDENT_RE:Jt,NUMBER_RE:Ae,C_NUMBER_RE:Me,BINARY_NUMBER_RE:De,RE_STARTERS_RE:Io,SHEBANG:No,BACKSLASH_ESCAPE:xt,APOS_STRING_MODE:$o,QUOTE_STRING_MODE:Bo,PHRASAL_WORDS_MODE:Po,COMMENT:$t,C_LINE_COMMENT_MODE:_o,C_BLOCK_COMMENT_MODE:Oo,HASH_COMMENT_MODE:Ro,NUMBER_MODE:Lo,C_NUMBER_MODE:jo,BINARY_NUMBER_MODE:zo,REGEXP_MODE:Ho,TITLE_MODE:Uo,UNDERSCORE_TITLE_MODE:Go,METHOD_GUARD:Fo,END_SAME_AS_BEGIN:Vo});function Wo(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function Zo(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function Xo(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=Wo,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function Ko(t,e){Array.isArray(t.illegal)&&(t.illegal=Yt(...t.illegal))}function Yo(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function qo(t,e){t.relevance===void 0&&(t.relevance=1)}const Jo=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=dt(n.beforeMatch,Se(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Qo=["of","and","for","in","not","or","if","then","parent","list","value"],ta="keyword";function Ie(t,e,n=ta){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(i){Object.assign(o,Ie(t[i],e,i))}),o;function a(i,s){e&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ea(c[0],c[1])]})}}function ea(t,e){return e?Number(e):na(t)?0:1}function na(t){return Qo.includes(t.toLowerCase())}const me={},ut=t=>{console.error(t)},be=(t,...e)=>{console.log(`WARN: ${t}`,...e)},pt=(t,e)=>{me[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),me[`${t}/${e}`]=!0)},Dt=new Error;function Ne(t,e,{key:n}){let o=0;const a=t[n],i={},s={};for(let r=1;r<=e.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=ke(e[r-1]);t[n]=s,t[n]._emit=i,t[n]._multi=!0}function oa(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ut("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Dt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ut("beginScope must be object"),Dt;Ne(t,t.begin,{key:"beginScope"}),t.begin=qt(t.begin,{joinWith:""})}}function aa(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ut("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Dt;if(typeof t.endScope!="object"||t.endScope===null)throw ut("endScope must be object"),Dt;Ne(t,t.end,{key:"endScope"}),t.end=qt(t.end,{joinWith:""})}}function ra(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function sa(t){ra(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),oa(t),aa(t)}function ia(t){function e(s,r){return new RegExp(vt(s),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=ke(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=e(qt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[Zo,Yo,sa,Jo].forEach(u=>u(s,r)),t.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[Xo,Ko,qo].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Ie(s.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=e(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=e(c.end)),c.terminatorEnd=vt(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=e(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return ca(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=it(t.classNameAliases||{}),i(t)}function $e(t){return t?t.endsWithParent||$e(t.starts):!1}function ca(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return it(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:$e(t)?it(t,{starts:t.starts?it(t.starts):null}):Object.isFrozen(t)?it(t):t}var la="11.8.0";class ua extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const Ft=Ee,ge=it,he=Symbol("nomatch"),da=7,Be=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Eo};function c(m){return r.noHighlightRe.test(m)}function l(m){let g=m.className+" ";g+=m.parentNode?m.parentNode.className:"";const w=r.languageDetectRe.exec(g);if(w){const E=N(w[1]);return E||(be(i.replace("{}",w[1])),be("Falling back to no-highlight mode for this block.",m)),E?w[1]:"no-highlight"}return g.split(/\s+/).find(E=>c(E)||N(E))}function u(m,g,w){let E="",P="";typeof g=="object"?(E=m,w=g.ignoreIllegals,P=g.language):(pt("10.7.0","highlight(lang, code, ...args) has been deprecated."),pt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=m,E=g),w===void 0&&(w=!0);const I={code:E,language:P};U("before:highlight",I);const W=I.result?I.result:p(I.language,I.code,w);return W.code=I.code,U("after:highlight",W),W}function p(m,g,w,E){const P=Object.create(null);function I(k,A){return k.keywords[A]}function W(){if(!R.keywords){tt.addText(Y);return}let k=0;R.keywordPatternRe.lastIndex=0;let A=R.keywordPatternRe.exec(Y),z="";for(;A;){z+=Y.substring(k,A.index);const Z=rt.case_insensitive?A[0].toLowerCase():A[0],nt=I(R,Z);if(nt){const[st,$n]=nt;if(tt.addText(z),z="",P[Z]=(P[Z]||0)+1,P[Z]<=da&&(St+=$n),st.startsWith("_"))z+=A[0];else{const Bn=rt.classNameAliases[st]||st;V(A[0],Bn)}}else z+=A[0];k=R.keywordPatternRe.lastIndex,A=R.keywordPatternRe.exec(Y)}z+=Y.substring(k),tt.addText(z)}function $(){if(Y==="")return;let k=null;if(typeof R.subLanguage=="string"){if(!e[R.subLanguage]){tt.addText(Y);return}k=p(R.subLanguage,Y,!0,re[R.subLanguage]),re[R.subLanguage]=k._top}else k=b(Y,R.subLanguage.length?R.subLanguage:null);R.relevance>0&&(St+=k.relevance),tt.__addSublanguage(k._emitter,k.language)}function M(){R.subLanguage!=null?$():W(),Y=""}function V(k,A){k!==""&&(tt.startScope(A),tt.addText(k),tt.endScope())}function J(k,A){let z=1;const Z=A.length-1;for(;z<=Z;){if(!k._emit[z]){z++;continue}const nt=rt.classNameAliases[k[z]]||k[z],st=A[z];nt?V(st,nt):(Y=st,W(),Y=""),z++}}function Q(k,A){return k.scope&&typeof k.scope=="string"&&tt.openNode(rt.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(V(Y,rt.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(J(k.beginScope,A),Y="")),R=Object.create(k,{parent:{value:R}}),R}function at(k,A,z){let Z=Ao(k.endRe,z);if(Z){if(k["on:end"]){const nt=new ue(k);k["on:end"](A,nt),nt.isMatchIgnored&&(Z=!1)}if(Z){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return at(k.parent,A,z)}function Lt(k){return R.matcher.regexIndex===0?(Y+=k[0],1):(Ht=!0,0)}function Mn(k){const A=k[0],z=k.rule,Z=new ue(z),nt=[z.__beforeBegin,z["on:begin"]];for(const st of nt)if(st&&(st(k,Z),Z.isMatchIgnored))return Lt(A);return z.skip?Y+=A:(z.excludeBegin&&(Y+=A),M(),!z.returnBegin&&!z.excludeBegin&&(Y=A)),Q(z,k),z.returnBegin?0:A.length}function Dn(k){const A=k[0],z=g.substring(k.index),Z=at(R,k,z);if(!Z)return he;const nt=R;R.endScope&&R.endScope._wrap?(M(),V(A,R.endScope._wrap)):R.endScope&&R.endScope._multi?(M(),J(R.endScope,k)):nt.skip?Y+=A:(nt.returnEnd||nt.excludeEnd||(Y+=A),M(),nt.excludeEnd&&(Y=A));do R.scope&&tt.closeNode(),!R.skip&&!R.subLanguage&&(St+=R.relevance),R=R.parent;while(R!==Z.parent);return Z.starts&&Q(Z.starts,k),nt.returnEnd?0:A.length}function In(){const k=[];for(let A=R;A!==rt;A=A.parent)A.scope&&k.unshift(A.scope);k.forEach(A=>tt.openNode(A))}let Et={};function ae(k,A){const z=A&&A[0];if(Y+=k,z==null)return M(),0;if(Et.type==="begin"&&A.type==="end"&&Et.index===A.index&&z===""){if(Y+=g.slice(A.index,A.index+1),!a){const Z=new Error(`0 width match regex (${m})`);throw Z.languageName=m,Z.badRule=Et.rule,Z}return 1}if(Et=A,A.type==="begin")return Mn(A);if(A.type==="illegal"&&!w){const Z=new Error('Illegal lexeme "'+z+'" for mode "'+(R.scope||"<unnamed>")+'"');throw Z.mode=R,Z}else if(A.type==="end"){const Z=Dn(A);if(Z!==he)return Z}if(A.type==="illegal"&&z==="")return 1;if(zt>1e5&&zt>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=z,z.length}const rt=N(m);if(!rt)throw ut(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Nn=ia(rt);let jt="",R=E||Nn;const re={},tt=new r.__emitter(r);In();let Y="",St=0,ct=0,zt=0,Ht=!1;try{if(rt.__emitTokens)rt.__emitTokens(g,tt);else{for(R.matcher.considerAll();;){zt++,Ht?Ht=!1:R.matcher.considerAll(),R.matcher.lastIndex=ct;const k=R.matcher.exec(g);if(!k)break;const A=g.substring(ct,k.index),z=ae(A,k);ct=k.index+z}ae(g.substring(ct))}return tt.finalize(),jt=tt.toHTML(),{language:m,value:jt,relevance:St,illegal:!1,_emitter:tt,_top:R}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:Ft(g),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ct,context:g.slice(ct-100,ct+100),mode:k.mode,resultSoFar:jt},_emitter:tt};if(a)return{language:m,value:Ft(g),illegal:!1,relevance:0,errorRaised:k,_emitter:tt,_top:R};throw k}}function d(m){const g={value:Ft(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return g._emitter.addText(m),g}function b(m,g){g=g||r.languages||Object.keys(e);const w=d(m),E=g.filter(N).filter(q).map(M=>p(M,m,!1));E.unshift(w);const P=E.sort((M,V)=>{if(M.relevance!==V.relevance)return V.relevance-M.relevance;if(M.language&&V.language){if(N(M.language).supersetOf===V.language)return 1;if(N(V.language).supersetOf===M.language)return-1}return 0}),[I,W]=P,$=I;return $.secondBest=W,$}function h(m,g,w){const E=g&&n[g]||w;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function f(m){let g=null;const w=l(m);if(c(w))return;if(U("before:highlightElement",{el:m,language:w}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new ua("One of your code blocks includes unescaped HTML.",m.innerHTML);g=m;const E=g.textContent,P=w?u(E,{language:w,ignoreIllegals:!0}):b(E);m.innerHTML=P.value,h(m,w,P.language),m.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(m.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),U("after:highlightElement",{el:m,result:P,text:E})}function v(m){r=ge(r,m)}const y=()=>{B(),pt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){B(),pt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function B(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function _(){S&&B()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function L(m,g){let w=null;try{w=g(t)}catch(E){if(ut("Language definition for '{}' could not be registered.".replace("{}",m)),a)ut(E);else throw E;w=s}w.name||(w.name=m),e[m]=w,w.rawDefinition=g.bind(null,t),w.aliases&&H(w.aliases,{languageName:m})}function D(m){delete e[m];for(const g of Object.keys(n))n[g]===m&&delete n[g]}function O(){return Object.keys(e)}function N(m){return m=(m||"").toLowerCase(),e[m]||e[n[m]]}function H(m,{languageName:g}){typeof m=="string"&&(m=[m]),m.forEach(w=>{n[w.toLowerCase()]=g})}function q(m){const g=N(m);return g&&!g.disableAutodetect}function et(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=g=>{m["before:highlightBlock"](Object.assign({block:g.el},g))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=g=>{m["after:highlightBlock"](Object.assign({block:g.el},g))})}function j(m){et(m),o.push(m)}function F(m){const g=o.indexOf(m);g!==-1&&o.splice(g,1)}function U(m,g){const w=m;o.forEach(function(E){E[w]&&E[w](g)})}function x(m){return pt("10.7.0","highlightBlock will be removed entirely in v12.0"),pt("10.7.0","Please use highlightElement now."),f(m)}Object.assign(t,{highlight:u,highlightAuto:b,highlightAll:B,highlightElement:f,highlightBlock:x,configure:v,initHighlighting:y,initHighlightingOnLoad:C,registerLanguage:L,unregisterLanguage:D,listLanguages:O,getLanguage:N,registerAliases:H,autoDetection:q,inherit:ge,addPlugin:j,removePlugin:F}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=la,t.regex={concat:dt,lookahead:Se,either:Yt,optional:ko,anyNumberOfTimes:So};for(const m in At)typeof At[m]=="object"&&Ce(At[m]);return Object.assign(t,At),t},bt=Be({});bt.newInstance=()=>Be({});var pa=bt;bt.HighlightJS=bt;bt.default=bt;const ft=xo(pa),fe="[A-Za-z$_][0-9A-Za-z$_]*",ma=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ba=["true","false","null","undefined","NaN","Infinity"],Pe=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],_e=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Oe=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ga=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ha=[].concat(Oe,Pe,_e);function Re(t){const e=t.regex,n=(g,{after:w})=>{const E="</"+g[0].slice(1);return g.input.indexOf(E,w)!==-1},o=fe,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(g,w)=>{const E=g[0].length+g.index,P=g.input[E];if(P==="<"||P===","){w.ignoreMatch();return}P===">"&&(n(g,{after:E})||w.ignoreMatch());let I;const W=g.input.substring(E);if(I=W.match(/^\s*=/)){w.ignoreMatch();return}if((I=W.match(/^\s+extends\s+/))&&I.index===0){w.ignoreMatch();return}}},r={$pattern:fe,keyword:ma,literal:ba,built_in:ha,"variable.language":ga},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,d]},C={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},S=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,h,f,v,{match:/\$\d+/},p];d.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const B=[].concat(C,d.contains),_=B.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(B)}]),L={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:_},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Pe,..._e]}},N={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[L],illegal:/%/},q={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function et(g){return e.concat("(?!",g.join("|"),")")}const j={match:e.concat(/\b/,et([...Oe,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},L]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[L]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),N,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,h,f,v,C,{match:/\$\d+/},p,O,{className:"attr",begin:o+e.lookahead(":"),relevance:0},m,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,t.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[L,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[L]},j,q,D,U,{match:/\$[(.]/}]}}function fa(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const va=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return ft.registerLanguage("javascript",Re),ft.registerLanguage("sh",fa),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=ft.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function xa(t){const{bau:e,css:n}=t,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=e.tags,u=va(t);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Bt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",...p},...d]=X(r);return a({...p,class:T("paper",u,i,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const Le=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=e.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(s(l(d??""),ot.map(b=>l(b)))),i(no.map(b=>s(l(b),ot.map((h,f)=>r(p({color:h,variant:b},{index:f}))))))))}},wa=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},oo.map((s,r)=>i({color:"success",variant:"outline",size:s},{index:r})))}},G=t=>{const{bau:e,css:n}=t,{article:o,section:a,h1:i,p:s,h2:r,h3:c,pre:l,code:u}=e.tags;ft.registerLanguage("javascript",Re);const p=Bt(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),d=Le(t),b=wa(t),h=({text:f})=>l({class:n`
          display: inline-block;
        `},u({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=ft.highlight(f,{language:"js"}).value}}));return function(v){return o({class:n``},i(v.title),s(v.description),v.gridItem&&[r("Variant/Color"),!v.variantColorTableDisable&&v.gridItem&&p(d({Item:v.gridItem(t)})),r("Size"),s("Component with size: ",u("sm"),", ",u("md"),", and ",u("lg")),v.gridItem&&p(b({Item:v.gridItem(t)}))],r("Usage"),c("Import"),h({text:v.importStatement}),r("Examples"),v.examples.map(y=>a(i(y.title),s(y.description),p(y.createComponent(t)()),h({text:y.code}))))}};function Qt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:b="md",Header:h,Content:f,close:v=!0,...y}]=X(u);const C=n.state(v);return a({...y,class:T("collapsible",b,i,e==null?void 0:e.class,y==null?void 0:y.class)},a({class:()=>T("header",f?C.val?"close":"open":""),onclick:S=>{C.val=!C.val,S.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:S})=>{C.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:C}),!C.val)},f&&f()))}}const ya=()=>ot.map(t=>`
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
`);function Pt(t,e){const{bau:n,css:o}=t,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=n.state(""),u=Qt(t),p=b=>h=>{l.val==b?l.val="":l.val=b},d=o`
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
    ${ya()}
  `;return function(...h){let[{color:f,variant:v="outline",size:y="md",data:C=[],...S}]=X(h);const B=_=>{const{Header:L,Content:D,name:O}=_,N=()=>r({class:()=>T(l.val==O&&"active")},c({type:"button","aria-controls":`bau-${O}`,"aria-expanded":({element:q})=>l.val==O},L(_))),H=()=>a({id:`bau-${O}`,"data-state":({element:q})=>l.val==O},D(_));return s({class:T(f,v,y),onclick:p(O)},u({Header:N,Content:H}))};return a({class:T("accordion",d,e==null?void 0:e.class,S.class)},i(C.map(B)))}}const je=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Pt(t);return s=>i({...s,data:a})},Ca=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Pt(t);return()=>i({data:a,color:"neutral",variant:"outline"})},Ea=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,ze=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Sa=t=>{const{css:e}=t,n=ze(t),o=Pt(t);return()=>o({color:"warning",data:n,class:e`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},ka=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ta=t=>{const{css:e}=t,n=ze(t),o=Pt(t);return()=>o({color:"success",variant:"outline",data:n,class:e`
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
      `})},Aa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ma={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ea,createComponent:Ca},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:ka,createComponent:Sa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Aa,createComponent:Ta}],gridItem:je},Da=t=>{const e=G(t);return()=>e(Ma)},Ia={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Na=({css:t,createGlobalStyles:e})=>{e`
:root {
  --alert-border-left-width: 8px;
}
`},$a=()=>ot.map(t=>`
&.alert.outline.${t} {
  & .icon {
    color: var(--color-${t})
  }
}
`).join(`
`);function _t(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i,i:s}=n.tags;Na({css:o,createGlobalStyles:a});const r=o`
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
  `,c=K(t),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:b="outline",color:h="neutral",size:f="md",onRemove:v,...y}=p;return i({...y,class:T(`alert-${b}`,b,h,f,r,e==null?void 0:e.class,p.class,"alert"),role:"alert"},s({class:"icon"},Ia[h]),i({class:"content"},...d),v&&l({onclick:v}))}}const He=t=>{const e=_t(t);return n=>e({...n},`Alert ${n.variant} ${n.color}`)},Ba=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=_t(t);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Pa=`import alert from "@grucloud/bau-ui/alert";
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
`,_a=t=>{const{css:e}=t,n=_t(t,{class:e`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Oa=`import alert from "@grucloud/bau-ui/alert";
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
`,Ra={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Pa,createComponent:Ba},{title:"Custom Alert ",description:"A custom alert.",code:Oa,createComponent:_a}],gridItem:He},La=t=>{const e=G(t);return()=>e(Ra)},ja=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:i=10,deleteAfterDuration:s=15e3}=e,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:b})=>{const h=c.val.findIndex(f=>f.id===d);h!=-1&&(c.val[h].status=b)};return function(b={},...h){const f=({id:C})=>{p({id:C,status:"removing"});const S=c.val.findIndex(B=>B.id===C);S!=-1&&c.val.splice(S,1)},v=({Component:C})=>{const S={id:Math.random().toString(10).split(".")[1],Component:C,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(S),setTimeout(()=>f(S),s)},y=C=>r({class:u.item,onclick:()=>f(C)},C.Component());return document.addEventListener("alert.add",C=>v(C.detail)),document.addEventListener("alert.remove",C=>f(C.detail)),r({class:T(u.stack,e==null?void 0:e.class,b.class)},n.loop(c,r(),y))}},za=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=ja(t,{deleteAfterDuration:2e4}),i=K(t),s=_t(t);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},Ha=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ua={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ha,createComponent:za}]},Ga=t=>{const e=G(t);return()=>e(Ua)},Fa=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,i=It(t),s=K(t),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=e.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},Va=`import animate from "@grucloud/bau-ui/animate";
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
`,Wa=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:i,label:s}=e.tags,r=It(t),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=e.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Za=`import animate from "@grucloud/bau-ui/animate";
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
`,Xa={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Va,createComponent:Fa},{title:"Component hide and show",description:"Hide and show a component",code:Za,createComponent:Wa}]},Ka=t=>{const e=G(t);return()=>e(Xa)};function Ue(t,e){const{bau:n,css:o}=t,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...d){let[{color:b,variant:h="outline",size:f="md",width:v=30,height:y=30,...C},...S]=X(d);return a({class:T(u,e==null?void 0:e.class,C.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:v,height:y,onload:c,onerror:l,class:T(b,h,f,u,e==null?void 0:e.class,C.class),...C}))}}const Ge=t=>{const{css:e}=t,n=Ue(t,{class:e`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Ya=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=Ue(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},qa=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Ja={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:qa,createComponent:Ya}],gridItem:Ge},Qa=t=>{const e=G(t);return()=>e(Ja)};function te(t,e){const{bau:n,css:o,window:a}=t,{dialog:i}=n.tags,s=Bt(t,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...b},...h]=X(l);const f=C=>{y.style.opacity=1,y.showModal();const S=p.getBoundingClientRect(),B=y.getBoundingClientRect();S.x<a.innerWidth/2?y.style.left=S.left+"px":y.style.left=S.right-B.width+"px",S.y<a.innerHeight/2?y.style.top=S.top+S.height+"px":y.style.top=S.top-B.height+"px"},v=C=>{const S=()=>{y.close(),y.removeEventListener("transitionend",S)};y.addEventListener("transitionend",S),y.style.opacity=0},y=i({role:"presentation",class:T("popover",r,e==null?void 0:e.class,b==null?void 0:b.class),onclick:C=>C.target===y&&(v(),d==null?void 0:d.call())},s(u));return y.closeDialog=v,y.openDialog=f,y}}const tr=()=>ot.map(t=>`
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
    ${tr()}
  `;return function(r){const{size:c="md",variant:l="outline",color:u="neutral",name:p,id:d,disabled:b,...h}=r;return a({...h,class:T("input",c,u,l,i,e==null?void 0:e.class,h.class)})}}const er=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Fe(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,s=te(t),r=K(t),c=ee(t),l=wt(t),u=o`
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
  `,p=n.state(""),d=n.state(""),b=n.state(!1),h=n.state(0),f=()=>{b.val=!1};return function(...y){let[{variant:C="outline",color:S,size:B="md",id:_,label:L,placeholder:D,Option:O,options:N,getOptionLabel:H=({label:$})=>$,...q},...et]=X(y);const j=n.state(N),F=()=>{W.openDialog(),b.val=!0,d.val="",j.val=N},U=()=>{W.closeDialog(),b.val=!1,d.val=""},x=$=>{const{value:M}=$.target;d.val=M,M?j.val=N.filter(V=>H(V).match(new RegExp(`${M}`,"i"))):j.val=N},m=$=>{b.val?U():F()},g=({option:$,index:M})=>V=>{p.val=H($),h.val=M,U()},w=$=>{switch(console.log("onkeydown",$.key,h.val),$.key){case"Escape":U();break;case"ArrowDown":h.val<j.val.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=j.val.length-1:h.val--;break;case"Enter":p.val=H(j.val[h.val]),d.val="",U();break}},E=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":b,"aria-label":L,onclick:m,variant:C,color:S,size:B},()=>!p.val&&L,p),P=c({id:_,value:d,placeholder:D,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":b,oninput:x,onkeydown:w,variant:C,color:S,size:B}),W=s({id:_,triggerEl:E,contentEl:(()=>a({class:T(C,S,B,"content")},P,()=>l({class:T(C,S,B)},j.val.map(($,M)=>i({class:()=>T(h.val==M&&"active"),onclick:g({option:$,index:M})},O($))))))(),onClose:f});return a({...q,class:T("autocomplete",u,e==null?void 0:e.class,q==null?void 0:q.class)},E,W)}}const Ve=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=Fe(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},nr=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,s=Fe(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},or=`import { Context } from "@grucloud/bau-ui/context";
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
`,ar={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:or,createComponent:nr}],gridItem:Ve},rr=t=>{const e=G(t);return()=>e(ar)};function We(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...b]=X(r);return a({...d,class:T("badge",i,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...b)}}const Ze=t=>{const e=We(t);return(n,{index:o})=>e({...n,content:`${o*100}`},"☏")},sr=t=>{const{bau:e}=t,{section:n}=e.tags,o=We(t);return()=>n(o({content:"10"},"☏"))},ir=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,cr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:ir,createComponent:sr}],gridItem:Ze},lr=t=>{const e=G(t);return()=>e(cr)};function Xe(t,e){const{bau:n,css:o}=t,{ul:a,li:i,span:s}=n.tags,r=K(t),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:b="md",items:h,...f},...v]=X(u);return a({...f,class:T(c,e==null?void 0:e.class,f==null?void 0:f.class)},h.map(({href:y,name:C})=>i((y?r:s)({href:y,color:p,variant:d,size:b,class:T(p,d,b)},C))))}}const Ke=t=>{const e={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Xe(t);return o=>n({...o,...e})},ur=t=>{const{bau:e}=t,{section:n}=e.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Xe(t);return()=>n(a(o))},dr=`import breadcrumbs, {
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
`,pr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:dr,createComponent:ur}],gridItem:Ke},mr=t=>{const e=G(t);return()=>e(pr)},Ye=t=>{const e=K(t);return n=>e({...n},`${n.variant} ${n.color} ${n.size??""}`)},br=t=>{const{bau:e}=t,{section:n}=e.tags,o=K(t),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},gr=`import button from "@grucloud/bau-ui/button";
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
`,hr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:gr,createComponent:br}],gridItem:Ye},fr=t=>{const e=G(t);return()=>e(hr)},vr=()=>ot.map(t=>`
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
    ${vr()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:u,...p},...d]=X(r);return a({...p,class:T("button-group",c,u,l,i,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const qe=t=>{const e=["ONE","TWO","THREE"],n=K(t),o=ne(t);return a=>o({...a},e.map(i=>n(a,i)))},xr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a=K(t),i=ne(t),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},wr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,yr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:wr,createComponent:xr}],gridItem:qe},Cr=t=>{const e=G(t);return()=>e(yr)};function Je(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ot.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...b]=X(c);return a({...d,type:"date",class:T("calendar",s,l,u,p,e==null?void 0:e.class,d==null?void 0:d.class)},...b)}}const Qe=t=>{const e=Je(t);return n=>e({...n})},Er=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),i=Je(t);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Sr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,kr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Sr,createComponent:Er}],gridItem:Qe},Tr=t=>{const e=G(t);return()=>e(kr)};function Ar(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:b,Previous:h,Next:f,...v}]=X(c);const y=()=>{s.val<=0?s.val=d.length-1:s.val--},C=()=>{s.val>=d.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},d.map(b));return a({...v,class:T("carousel",p,i,e==null?void 0:e.class,v==null?void 0:v.class)},a({class:T("control","control-previous"),onclick:y},h()),a({class:T("control","control-next"),onclick:C},f()),S)}}const Mr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Dr=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,i=K(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Ar(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Mr,Slide:s,Previous:c,Next:l}))},Ir=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Nr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Ir,createComponent:Dr}]},$r=t=>{const e=G(t);return()=>e(Nr)},tn=t=>{const e=Nt(t);return n=>e({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Br=t=>{const{bau:e}=t,{section:n}=e.tags,o=Nt(t);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Pr=`import chip from "@grucloud/bau-ui/chip";
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
`,_r={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Pr,createComponent:Br}],gridItem:tn},Or=t=>{const e=G(t);return()=>e(_r)};function en(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u="md",...p},...d]=X(r);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,e==null?void 0:e.class,p==null?void 0:p.class)})}}const nn=t=>{const{bau:e,css:n}=t,{label:o}=e.tags,a=en(t);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Rr=t=>{const{bau:e,css:n}=t,{section:o,label:a}=e.tags,i=en(t),s=e.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Lr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,jr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Lr,createComponent:Rr}],gridItem:nn},zr=t=>{const e=G(t);return()=>e(jr)},Hr=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Qt(t),i=K(t),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},Ur=`import button from "@grucloud/bau-ui/button";
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
`,Gr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Ur,createComponent:Hr}]},Fr=t=>{const e=G(t);return()=>e(Gr)};function Vr(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:p,...d},...b]=X(r);return a({class:T(i,e==null?void 0:e.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},b))}}const Wr=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),i=Vr(t),s=K(t),r=ye(t);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Zr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Xr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Zr,createComponent:Wr}]},Kr=t=>{const e=G(t);return()=>e(Xr)},on=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Xt(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Yr=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Xt(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},qr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Jr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:qr,createComponent:Yr}],gridItem:t=>on(t,{base:"/components/drillDownMenu",hashBased:!0})},Qr=t=>{const e=G(t);return()=>e(Jr)};function an(t,e){const{bau:n,css:o}=t,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(u,...p){const{variant:d="outline",color:b="neutral",size:h="md",Component:f,disabled:v,...y}=u;return a({class:T(c.base,v&&c.disabled,e==null?void 0:e.class,u.class)},s({class:T(d,b,h)},f({disabled:v}),r({type:"file",disabled:v,...y})),i({class:"filename-display"}))}}const rn=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),u=an(t),p=b=>{const h=b.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:b})=>r({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return b=>u({Component:d,name:"file",accept:"text/*",onchange:p,...b})},ts=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),p=an(t),d=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},b=({disabled:h})=>c({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(e("Choose a file to upload")));return()=>r(p({Component:b,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},es=`import classNames from "@grucloud/bau-css/classNames";
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
`,ns={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:es,createComponent:ts}],gridItem:rn},os=t=>{const e=G(t);return()=>e(ns)},sn=t=>{const e=ee(t);return n=>e({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},as=t=>{const{bau:e}=t,{section:n}=e.tags,o=ee(t);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},rs=`import input from "@grucloud/bau-ui/input";
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
`,ss={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:rs,createComponent:as}],gridItem:sn},is=t=>{const e=G(t);return()=>e(ss)};function cn(t,e){const{bau:n,css:o,keyframes:a}=t,{div:i}=n.tags,s=()=>ot.map(l=>`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:b="md",running:h,...f}]=X(u);return i({...f,role:"progressbar",class:{deps:[h],renderProp:()=>v=>T("linearProgress",b,p,c,v&&"running",e==null?void 0:e.class,f==null?void 0:f.class)}})}}const ln=t=>{const e=cn(t);return n=>e({...n,running:!0})},cs=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=K(t),i=cn(t),s=e.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},ls=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,us={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ls,createComponent:cs}],gridItem:ln},ds=t=>{const e=G(t);return()=>e(us)},Mt={sm:12,md:16,lg:24},ps=()=>ot.map(t=>`
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
`);function Ot(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u="md",color:p="primary",variant:d="outline",visibility:b=!0,...h}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Mt[u]};
      height: ${Mt[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${ps()}
    `;return i({class:{deps:[b],renderProp:()=>v=>T("spinner",f,p,d,v==!1?"":"visibility",e==null?void 0:e.class,h.class)},version:"1.1",x:"0px",y:"0px",width:Mt[u],height:Mt[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function un(t,e){const{bau:n,css:o,keyframes:a}=t,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:b,...h},...f]=X(l);const v=K(t),y=Ot(t);return n.bind({deps:[b],render:()=>C=>v({...h,class:T("loadingButton",d,p,u,r,C&&"loading",e==null?void 0:e.class,h==null?void 0:h.class)},y({size:d,variant:p,color:u,visibility:C}),i({class:C&&"loading"},f))})}}const dn=t=>{const e=un(t);return n=>e({...n,loading:!0},"Save")},ms=t=>{const{bau:e}=t,{section:n}=e.tags,o=un(t),a=e.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},bs=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,gs={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:bs,createComponent:ms}],gridItem:dn},hs=t=>{const e=G(t);return()=>e(gs)},fs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],vs=t=>{const{bau:e,css:n}=t,{span:o,li:a}=e.tags,i=wt(t),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},fs.map(s))},xs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ws=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:i}=e.tags,s=wt(t),r=({code:c,label:l})=>i({class:n`
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
`,Cs={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ys,createComponent:ws}],gridItem:vs},Es=t=>{const e=G(t);return()=>e(Cs)};function pn(t,e){const{bau:n,css:o}=t,{dialog:a}=n.tags,s=o`
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
    ${(()=>ot.map(r=>`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...b]=X(c);return a({class:T("modal",s,l,u,p,e==null?void 0:e.class,d==null?void 0:d.class)},...b)}}const mn=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:s}=e.tags,r=K(t),c=pn(t),l=()=>o(Array(10).fill("").map((p,d)=>s(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(r({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},Ss=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:s}=e.tags,r="neutral",c=K(t),l=pn(t),u=()=>o(Array(10).fill("").map((d,b)=>s(b+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},ks=`import modal from "@grucloud/bau-ui/modal";
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
`,Ts={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:ks,createComponent:Ss}],gridItem:mn},As=t=>{const e=G(t);return()=>e(Ts)},Ms=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:i}=e.tags,s=K(t),r=te(t),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},Ds=`import popover from "@grucloud/bau-ui/popover";
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
`,Is={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ds,createComponent:Ms}]},Ns=t=>{const e=G(t);return()=>e(Is)};function $s(t,e){const{bau:n,css:o,config:a}=t,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
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
  `,u=({text:p})=>({name:d,label:b,href:h})=>s({href:`${a.base}${h}`},r({class:"sublabel"},p),i({class:`label ${p}`},b??d));return function(...d){let[{color:b,variant:h="plain",size:f="md",data:v={},...y}]=X(d);const{next:C,previous:S}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...y,class:T("paginationNavigation",f,l,e==null?void 0:e.class,y==null?void 0:y.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(C==null?void 0:C.href)&&u({text:"Next"})(C))}}const Bs=t=>{const{bau:e}=t,{section:n}=e.tags,o=$s(t),a={next:{name:"next page",label:"My Next Page",href:"#next"},previous:{name:"previous page",label:"My Previous Page",href:"#previous"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Ps=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const PaginationNavigation = paginationNavigation(context);

  const data = {
    next: { name: "next page", label: "My Next Page", href: "#next" },
    previous: {
      name: "previous page",
      label: "My Previous Page",
      href: "#previous",
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
`,_s={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Ps,createComponent:Bs}]},Os=t=>{const e=G(t);return()=>e(_s)},Rs=t=>{const{bau:e}=t,{div:n}=e.tags,o=Bt(t);return a=>o({...a},n(`Paper ${a.size??""}`))},Ls=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Bt(t);return()=>n(a({size:"md"},o("My content")))},js=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,zs={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:js,createComponent:Ls}],variantColorTableDisable:!0,gridItem:Rs},Hs=t=>{const e=G(t);return()=>e(zs)},Us=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function bn(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,s=K(t),r=te(t),c=wt(t),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Us()}
  `,u=n.state(""),p=n.state(!1),d=n.state(0);return function(...h){let[{color:f="neutral",variant:v="outline",size:y="md",id:C,label:S,Option:B,options:_,getOptionLabel:L=({label:g})=>g,...D},...O]=X(h);const N=()=>{m.openDialog(),m.focus(),p.val=!0},H=()=>{m.closeDialog(),p.val=!1},q=()=>{p.val=!1},et=g=>{p.val?H():N()},j=({option:g,index:w})=>E=>{u.val=L(g),d.val=w,H()},F=g=>{switch(g.preventDefault(),g.key){case"Escape":H();break;case"ArrowDown":d.val<_.length-1?d.val++:d.val=0;break;case"ArrowUp":d.val<=0?d.val=_.length-1:d.val--;break;case"Enter":p.val?(u.val=L(_[d.val]),H()):N();break}},U=()=>c({tabindex:"0",class:T(f,v)},_.map((g,w)=>i({class:()=>T(d.val==w&&"active"),onclick:j({option:g,index:w})},B(g)))),x=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":S,onclick:et,color:f,variant:v,size:y},()=>!u.val&&S,u),m=r({id:C,triggerEl:x,contentEl:U(),onClose:q});return a({...D,class:T("select",f,y,l,e==null?void 0:e.class,D==null?void 0:D.class),onkeydown:F},x,m)}}const gn=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=bn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Gs=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,s=bn(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Fs=`import select from "@grucloud/bau-ui/select";
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
`,Vs={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Fs,createComponent:Gs}],gridItem:gn},Ws=t=>{const e=G(t);return()=>e(Vs)};function Rt(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
    ${(()=>ot.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...b]=X(c);return a({...d,type:"range",class:T("slider",l,u,p,s,e==null?void 0:e.class,d.class)},...b)}}const hn=t=>{const{bau:e}=t,n=e.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Rt(t);return i=>a({...i,oninput:o})},Zs=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:i}=e.tags,s=e.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Rt(t);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Xs=`import slider from "@grucloud/bau-ui/slider";
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
`,Ks=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:s,br:r,option:c}=e.tags,l=e.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Rt(t);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},Ys=`import slider from "@grucloud/bau-ui/slider";
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
`,qs=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:s,br:r,option:c}=e.tags,l=e.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Rt(t);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},Js=`import slider from "@grucloud/bau-ui/slider";
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
`,Qs={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Xs,createComponent:Zs},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ys,createComponent:Ks},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Js,createComponent:qs}],gridItem:hn},ti=t=>{const e=G(t);return()=>e(Qs)},fn=t=>{const e=Ot(t);return n=>e({...n})},ei=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ot(t);return()=>n(o({}))},ni=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,oi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ni,createComponent:ei}],gridItem:fn},ai=t=>{const e=G(t);return()=>e(oi)},ri=()=>ot.map(t=>`
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
`);function vn(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${ri()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=X(r);return a({...p,class:T("switch",i,c,l,u,e==null?void 0:e.class,p.class),type:"checkbox",required:"required"},...d)}}const xn=t=>{const{bau:e,css:n}=t,{form:o,label:a}=e.tags,i=vn(t);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},si=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i}=e.tags,s=vn(t);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},ii=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,ci={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ii,createComponent:si}],gridItem:xn},li=t=>{const e=G(t);return()=>e(ci)},ui=()=>ot.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function yt(t,e){const{bau:n,css:o}=t,{tabDefs:a}=e,{div:i,ul:s,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),u=d=>c.val.find(b=>b.name==d),p={base:o`
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
      ${ui()}
    `};return function(...b){let[{color:h,variant:f="plain",size:v,...y},...C]=X(b);const S=_=>{const{Header:L,disabled:D,name:O}=_;return r({class:()=>T(l.val.name==O&&"active",D&&"disabled"),onclick:N=>N.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},L(_))},B=i({class:T("tabs",p.base,f,v,h,e==null?void 0:e.class,y.class)},n.loop(c,s(),S),()=>l.val.Content?l.val.Content({}):"");return B.addEventListener("tab.select",_=>{var O,N;const{tabName:L}=_.detail,D=u(L);D&&((O=l.val.exit)==null||O.call(),l.val=D,(N=D.enter)==null||N.call())},!1),B.addEventListener("tab.add",_=>{var D;const{tab:L}=_.detail;(D=L.enter)==null||D.call(),c.val.push(L)},!1),B.addEventListener("tab.remove",_=>{var D;const L=c.val.findIndex(O=>O.name==_.detail.tabName);L>0&&((D=c.val[L].exit)==null||D.call(),c.val.splice(L,1))},!1),B}}const wn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},di=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},pi=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,mi=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},bi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,yn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},gi=t=>{const{css:e}=t,n=yt(t,{tabDefs:yn(t)});return()=>n({variant:"outline",color:"neutral",class:e`
        flex-direction: column-reverse;
      `})},hi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,fi=t=>{const{css:e}=t,n=yn(t),o=yt(t,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:e`
        & ul {
          justify-content: center;
        }
      `})},vi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,xi={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:pi,createComponent:di},{title:"Extended Tabs",description:"An extended tabs.",code:bi,createComponent:mi},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:hi,createComponent:gi},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:vi,createComponent:fi}],gridItem:wn},wi=t=>{const e=G(t);return()=>e(xi)};function Ct(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=X(c);return i({...l,class:T("table-container",s,e==null?void 0:e.class,l==null?void 0:l.class)},...u)}}const yi=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=e.tags;function p(v,y,C,S,B){return{name:v,calories:y,fat:C,carbs:S,protein:B}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],b=({name:v,calories:y})=>s(i(v),i({class:n`
            text-align: right;
          `},y)),h=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Ct(t,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),h(),l(d.map(b)))))},Ci=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function gt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Ei=[gt("Frozen yoghurt",159,6,24,4),gt("Ice cream sandwich",237,9,37,4.3),gt("Eclair",262,16,24,6),gt("Cupcake",305,3.7,67,4.3),gt("Gingerbread",356,16,49,3.9)],Si=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=e.tags,p=({name:h,calories:f})=>s(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ct(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(r(u("Table Dense"),d(),l(Ei.map(p)))))},ki=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ht(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Ti=[ht("Frozen yoghurt",159,6,24,4),ht("Ice cream sandwich",237,9,37,4.3),ht("Eclair",262,16,24,6),ht("Cupcake",305,3.7,67,4.3),ht("Gingerbread",356,16,49,3.9)],Ai=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=e.tags,p=({name:h,calories:f})=>s(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ct(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(r(u("Table Zebra"),d(),l(Ti.map(p)))))},Mi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Di={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Ci,createComponent:yi},{title:"Dense",description:"A dense table.",code:ki,createComponent:Si},{title:"Zebra",description:"A zebra table.",code:Mi,createComponent:Ai}]},Ii=t=>{const e=G(t);return()=>e(Di)};function Cn(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=ne(t),s=K(t),r=Ot(t),c=o`
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
  `,l=({label:h,icon:f,...v})=>s({"aria-label":h,title:h,...v},f),u=({count:h,totalCount:f,page:v,rowsPerPage:y})=>a({class:"pages-numbers"},Number(v-1)*Number(y)+(h>0?1:0),"-",Math.min(v*y,f)," of ",f),p=({count:h,page:f,rowsPerPage:v})=>a({class:"pages-numbers"},(f-1)*v+(h>0?1:0),"-",f*v),d=h=>h<=1,b=(h,f,v)=>h>=Math.ceil(f/v);return function(...f){let[{count:v=0,totalCount:y=0,page:C=1,rowsPerPage:S=50,onPageChange:B,isLoading:_=!1,disableFirst:L=()=>d(C),disablePrevious:D=()=>d(C),disableNext:O=()=>b(C,y,S),disableLast:N=()=>b(C,y,S),...H},...q]=X(f);const et=Math.max(0,Math.ceil(y/S)),j=B({page:1}),F=B({page:C-1}),U=B({page:C+1}),x=B({page:et}),m=[{label:"First",icon:"⟪",onclick:j,disabled:L()},{label:"Previous",icon:"⟨",onclick:F,disabled:D()},{label:"Next",icon:"⟩",onclick:U,disabled:O()},{label:"Last",icon:"⟫",onclick:x,disabled:N()}];return a({...H,class:T("table-pagination",c,_&&"disabled",e==null?void 0:e.class,H==null?void 0:H.class)},r({class:"spinner",visibility:_,size:"md"}),y>0?u({count:v,totalCount:y,page:C,maxPages:et,rowsPerPage:S}):p({count:v,page:C,maxPages:et,rowsPerPage:S}),i({variant:"outline",color:"neutral"},m.map(g=>l({...g,variant:"outline",color:"neutral"}))))}}const Ni=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),$i=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=e.tags,l=Ni(45),u=({name:C,email:S})=>i(a(C),a(S)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=Cn(t),b=Ct(t,{class:n`
      max-width: 650px;
    `}),h=e.state(l),f=e.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=e.derive(()=>h.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),y=({page:C})=>S=>{f.val.page=C};return()=>b(s(p(),()=>c(v.val.map(u))),()=>d({...f.val,onPageChange:y}))},Bi=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=e.tags,u=e.state(!1),p=e.state([]),d=e.state(""),b=e.derive(()=>p.val.length),h=e.state(1),f=e.state(10),v=e.derive(()=>p.val),y=N=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(N).toString()}`,C=({page:N})=>H=>{h.val=N,S(y({page:N,per_page:f.val}))};S(y({page:1,per_page:f.val}));async function S(N){try{u.val=!0;const H=await fetch(N,{});if(H.ok){const q=await H.json();p.val=q;return}throw H}catch(H){d.val=H.message}finally{u.val=!1}}const B=({name:N,description:H,stargazers_count:q})=>i(a(N),a(H),a({class:n`
            text-align: right;
          `},q)),_=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),L=Cn(t),D=Ct(t,{class:n`
      min-width: 650px;
    `}),O=({message:N})=>l(N);return()=>D(()=>L({rowsPerPage:f.val,page:h.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:C,disableNext:()=>!1}),s(_(),()=>d.val&&O({message:d.val}),()=>c(v.val.map(B))))},Pi=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:i,h2:s,tr:r}=e.tags,c=$i(t),l=Bi(t),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function oe(t,e){const{bau:n,css:o,window:a}=t,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:b="md",...h},...f]=X(c);const v=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,b),role:"tooltip"},l)),y=D=>`move-to-${D}`,C=(D,O,N)=>{if(D()){const H=y(O);v.classList.add(H),v.classList.add(O),v.classList.remove(N)}},S=(D,O)=>{const N=y(D);v.classList.contains(N)&&(v.classList.remove(N),v.classList.add(O),v.classList.remove(D))},B=D=>{const O=v.getBoundingClientRect();C(()=>O.x<0,"right","left"),C(()=>O.x+O.width>a.innerWidth,"left","right"),C(()=>O.y<0,"bottom","top"),C(()=>O.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},_=D=>{v.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...h,class:T("tooltip",s,e==null?void 0:e.class,h==null?void 0:h.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",B),D.addEventListener("mouseout",_)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",B),D.removeEventListener("mouseout",_)}},...f,v)}}const En=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i}=e.tags,s=K(t),r=oe(t),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},_i=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,i=K(t),s=oe(t),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Oi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ri=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i,section:s}=e.tags,r=(...p)=>Nt(t)({variant:"outline",color:"primary"},p),c=oe(t),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Li=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ji={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Oi,createComponent:_i},{title:"Grid",description:"Various tooltip position",code:Li,createComponent:Ri}],gridItem:En},zi=t=>{const e=G(t);return()=>e(ji)},Sn=t=>{const e=Zt(t);return n=>e(n)},Hi=t=>{const{bau:e}=t,{section:n}=e.tags,o=Zt(t);return()=>n(o({}))},Ui=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Gi={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Ui,createComponent:Hi}],gridItem:Sn},Fi=t=>{const e=G(t);return()=>e(Gi)},Vi=({css:t,createGlobalStyles:e})=>(e`
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
  `});function kn(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:i}=e,{ul:s,li:r,nav:c,div:l}=n.tags,u=Vi({css:o,createGlobalStyles:a}),p=Qt(t),d=({depth:b=1,maxDepth:h,color:f,variant:v,size:y})=>C=>{const{children:S,expanded:B}=C,_=n.state(!B),L=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:O=>{S&&(_.val=!_.val)}},i(C.data)),D=()=>s({class:T(f,y)},S.map(d({depth:b+1,maxDepth:h})));return r(p({Header:L,Content:S&&b<h&&D}))};return function({tree:h,maxDepth:f=1/0,size:v="md",variant:y="plain",color:C="neutral",...S}){return c({class:T(u.nav,v,y,C,e==null?void 0:e.class,S.class)},h.children&&s(h.children.map(d({maxDepth:f,color:C,variant:y,size:v}))))}}const Tn=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=kn(t,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},Wi=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=kn(t,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Zi=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Xi={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Zi,createComponent:Wi}],gridItem:Tn},Ki=t=>{const e=G(t);return()=>e(Xi)},Yi=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:i,p:s,ul:r,li:c}=e.tags,l=Le(t),u=K(t),p=[{name:"Accordion",Item:je(t)},{name:"Alert",Item:He(t)},{name:"Autocomplete",Item:Ve(t)},{name:"Avatar",Item:Ge(t)},{name:"Badge",Item:Ze(t)},{name:"Breadcrumbs",Item:Ke(t)},{name:"Button",Item:Ye(t)},{name:"Button Group",Item:qe(t)},{name:"Calendar",Item:Qe(t)},{name:"Checkbox",Item:nn(t)},{name:"Chip",Item:tn(t)},{name:"DrillDown Menu",Item:on(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:rn(t)},{name:"Input",Item:sn(t)},{name:"Linear Progress",Item:ln(t)},{name:"Loading Button",Item:dn(t)},{name:"Modal",Item:mn(t)},{name:"Select",Item:gn(t)},{name:"Slider",Item:hn(t)},{name:"Spinner",Item:fn(t)},{name:"Switch",Item:xn(t)},{name:"Tabs",Item:wn(t)},{name:"Theme Switch",Item:Sn(t)},{name:"Tooltip",Item:En(t)},{name:"Tree View",Item:Tn(t)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},qi=({context:t})=>[{path:"",action:e=>({title:"Bau UI",component:go(t)})},{path:"GettingStarted",action:e=>({title:"Getting Started",component:xa(t)})},{path:"components",action:()=>({title:"Component",component:Yi(t)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Da(t)})},{path:"alert",action:()=>({title:"Alert",component:La(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ga(t)})},{path:"animate",action:()=>({title:"Animate",component:Ka(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:rr(t)})},{path:"avatar",action:()=>({title:"Avatar",component:Qa(t)})},{path:"badge",action:()=>({title:"Badge",component:lr(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:mr(t)})},{path:"button",action:()=>({title:"Button",component:fr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Cr(t)})},{path:"calendar",action:()=>({title:"Calendar",component:Tr(t)})},{path:"carousel",action:()=>({title:"Carousel",component:$r(t)})},{path:"chip",action:()=>({title:"Chip",component:Or(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:zr(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Fr(t)})},{path:"drawer",action:()=>({title:"Drawer",component:Kr(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Qr(t)})},{path:"fileInput",action:()=>({title:"File Input",component:os(t)})},{path:"input",action:()=>({title:"Input",component:is(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ds(t)})},{path:"list",action:()=>({title:"List",component:Es(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:hs(t)})},{path:"modal",action:()=>({title:"Modal",component:As(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Os(t)})},{path:"paper",action:()=>({title:"Paper",component:Hs(t)})},{path:"popover",action:()=>({title:"Popover",component:Ns(t)})},{path:"select",action:()=>({title:"Select",component:Ws(t)})},{path:"slider",action:()=>({title:"Slider",component:ti(t)})},{path:"spinner",action:()=>({title:"Spinner",component:ai(t)})},{path:"switch",action:()=>({title:"Switch",component:li(t)})},{path:"table",action:()=>({title:"Table",component:Ii(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Pi(t)})},{path:"tabs",action:()=>({title:"Tabs",component:wi(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:zi(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Fi(t)})},{path:"treeView",action:()=>({title:"Tree View",component:Ki(t)})}]},{path:"pages",action:e=>({title:"Pages",component:vo(t)})}],Ji=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),Qi=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=t,s=a.state(),r=e({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:b=e}=l.resolve({pathname:u});s.val=d,document.title=`${p}`}},tc=t=>{const{createGlobalStyles:e}=t;e`
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
  `};Zn();const An={title:"Bau",base:"/bau/bau-ui"},lt=eo({config:An}),{bau:ec}=lt;lt.states={drawerOpen:ec.state(!0)};tc(lt);Rn({routes:qi({context:lt}),onLocationChange:Qi({context:lt,LayoutDefault:uo(lt),config:An}),notFoundRoute:Ji(lt)});
