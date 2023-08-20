(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Mn=(e,t)=>({...e,paths:[...t,e.path]}),gt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Mn(o,e);return n?[a,...gt({paths:[...e,o.path],routes:n})]:a}),Dn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},In=({routes:e=[],notFoundRoute:t})=>{const n=gt({routes:e}).map(o=>({...o,regex:Dn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function $n({routes:e,notFoundRoute:t,onLocationChange:n}){const o=In({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ue=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Nn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],_n=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ot=e=>`var(--color-${e})`,Bn=e=>`var(--color-${e}-lightest)`,On=()=>Ue.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ot(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Bn(e)};
}
.solid.${e} {
  background-color: ${ot(e)};
}
`).join(`
`),Rn=()=>Ue.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Ln=e=>100-e*10,Pn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Ln(t)}%);`).join(`
`),at=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),jn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Nn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),..._n.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function zn({createGlobalStyles:e},{colorPalette:t=Ue}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>jn([n,o])).join(`
`)}
      ${Pn()}
      ${at({})}
      ${On()}
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
        font-size: 1.1rem;
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
      ${Rn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${at({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Hn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ge=e=>Object.prototype.toString.call(e??0).slice(8,-1),Un=e=>Ge(e)=="Object",rt=e=>Ge(e)=="Function",je=e=>["Object","Array"].includes(Ge(e)),st=Object.getPrototypeOf,ze=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,Gn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const q=e=>!me(e[0])&&Un(e[0])?e:[{},...e];function Fn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=f=>n.createElement(f),l=(f,m,b)=>{let x=r;r=m;let y=f(b);return r=x,y},d=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},p=(f,m,b,x,y,O)=>{var N;if(s){i.add(f);return}for(let Z of f.bindings){let{deps:j,element:T,renderInferred:U,render:Y,renderItem:ee}=Z;if(ee&&m)(N=w(T,x,(...ae)=>h(ee(...ae)),b,y,O)[m])==null||N.call();else{let ae=U?U({element:T}):Y({element:T,renderItem:ee})(...j.map(ze));ae!==T&&T.replaceWith(Z.element=h(ae))}}k(f),d()},u=(f,m,b=[])=>({get(x,y,O){var N;if(r==null||r.add(f),y==="_isProxy")return!0;if(!((N=x[y])!=null&&N._isProxy)&&!me(x[y])&&je(x[y]))x[y]=new Proxy(x[y],u(f,m,[...b,y]));else if(Gn.includes(y)){let Z=x[y];return(...j)=>{let T=Z.apply(x,j);return p(f,y,T,j,m,b),T}}return Reflect.get(x,y,O)},set(x,y,O,N){let Z=Reflect.set(x,y,O,N);return p(f,"setItem",Z,{prop:y,value:O},m,[...b,y]),Z}}),g=(f,m)=>new Proxy(m,u(f,m)),w=(f,m,b,x,y,O)=>{let N=()=>f.replaceChildren(...ke(x,b)),Z=j=>f[j]&&f.removeChild(f[j]);return{assign:N,sort:N,reverse:N,setItem:()=>{var T;let j=O[0];(T=f.children[j])==null||T.replaceWith(b(y[j],j))},push:()=>f.append(...ke(m,(j,T)=>b(j,y.length+T))),unshift:()=>f.prepend(...ke(m,b)),pop:()=>Z("lastChild"),shift:()=>Z("firstChild"),splice:()=>{let[j,T,...U]=m;const{length:Y}=f.children;for(let ee=j>=0?Math.min(j+T-1,Y-1):Y-1;ee>=(j>=0?j:Y+j);ee--)f.children[ee].remove();if(U.length){let ee=U.forEach((ae,Oe)=>b(ae,j+Oe));f.children[j]?f.children[j].after(...ee):f.append(...ee)}}}},v=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=je(f)?g(m,f):f,m.valProxy)},set val(m){let b=this,x=b.val;je(m)?(b.valProxy=g(b,m),p(b,"assign",m)):m!==x&&(b.valProxy=m,p(b)),b.oldVal=x}}),h=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),C=(f,m)=>{let b=new Set;return m.val=l(f,b),b},E=f=>{let m=v(),b=C(f,m);m.computed=!0;for(let x of b)x.listeners.push({computed:f,deps:b,state:m});return m},k=f=>{for(let m of[...f.listeners])C(m.computed,m.state)},I=(f,...m)=>{if(m.length){let b=[];for(let x of m.flat(1/0))x!=null&&b.push(me(x)?G({deps:[x],render:()=>y=>y}):rt(x)?J({renderInferred:x}):h(x));f.append(...b)}},_={},R=(f,m)=>f&&(Object.getOwnPropertyDescriptor(f,m)??R(st(f),m)),D=(f,m,b)=>{var x;return _[f+","+m]??(_[f+","+m]=((x=R(b,m))==null?void 0:x.set)??0)},B=(f,m)=>new t.MutationObserver((b,x)=>{b.filter(y=>y.removedNodes).forEach(y=>[...y.removedNodes].find(O=>O===f&&(m({element:f}),x.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),$=(f,m)=>new t.MutationObserver((b,x)=>b.forEach(y=>m({record:y,element:f}))).observe(f,{childList:!0}),H=f=>new Proxy(function(b,...x){var Z;let[y,...O]=q(x),N=f?n.createElementNS(f,b):c(b);for(let[j,T]of Object.entries(y)){if(j.startsWith("bau"))continue;let U=D(b,j,st(N))?Y=>N[j]=Y:Y=>N.setAttribute(j,Y);T==null||(me(T)?G({deps:[T],render:()=>()=>(U(T.val),N)}):rt(T)&&(!j.startsWith("on")||T.isDerived)?J({renderInferred:()=>(U(T({element:N})),N)}):T.renderProp?G({deps:T.deps,render:()=>()=>(U(T.renderProp({element:N})(...T.deps.map(ze))),N)}):U(T))}return y.bauChildMutated&&$(N,y.bauChildMutated),I(N,...O),(Z=y.bauCreated)==null||Z.call(y,{element:N}),y.bauMounted&&t.requestAnimationFrame(()=>y.bauMounted({element:N})),y.bauUnmounted&&t.requestAnimationFrame(()=>B(N,y.bauUnmounted)),N},{get:(m,b)=>m.bind(void 0,b)}),X=(f,m,b)=>{f.element=h(b);for(let x of m)me(x)&&(a.add(x),x.bindings.push(f));return f.element},J=({renderInferred:f,element:m})=>{let b=new Set,x=l(f,b,{element:m});return X({renderInferred:f},b,x)},G=({deps:f,element:m,render:b,renderItem:x})=>X({deps:f,render:b,renderItem:x},f,b({element:m,renderItem:x})(...f.map(ze))),P=(f,m,b)=>G({deps:[f],render:({renderItem:x})=>y=>(m.append(...ke(y,x)),m),renderItem:b}),F=f=>{s=!0,f(),s=!1,i.forEach(p),i.clear()};return{tags:H(),tagsNS:H,state:v,bind:G,loop:P,derive:E,stateSet:a,batch:F}}const Vn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Wn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Zn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Xn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=Zn(a,i),r=Vn(s);return!t.getElementById(r)&&Wn(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Kn(e){const t=Fn(),n=Xn();return zn(n),{bau:t,...n,tr:o=>o,window,...e}}function M(...e){return e.filter(t=>t).join(" ")}function De(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:M("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(u=>{if(!s()||u.getAttribute("cloned"))return;const g=u.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=u.getAttribute("width"),g.style.height=u.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),d.target.appendChild(g),g.addEventListener("animationend",()=>g.parentNode.removeChild(g))}),[...d.addedNodes].forEach(u=>{if(u.getAttribute("cloned"))return;p.style.position="relative";const g=u.getBoundingClientRect();if(u.setAttribute("width",g.width+"px"),u.setAttribute("height",g.height+"px"),r()){u.style.animation=r();const w=()=>{u.removeEventListener("animationend",w),u.style.animation=""};u.addEventListener("animationend",w)}})},...c},l)}}function Q(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:d,href:p,...u},...g]=q(s);return(p?n.tags.a:n.tags.button)({...u,class:M("button",a.root,c,l,r,p?a.a:a.button,d&&a.disabled,t==null?void 0:t.class,u.class),disabled:d,href:p,...!p&&{type:"button"}},g)}}const oe=["neutral","primary","success","danger","warning"],Yn=["plain","outline","solid"],qn=["sm","md","lg"],Jn="light",Qn=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Fe(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=d=>{a.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Jn);const l=o`
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
    ${Qn()}
  `;return function(...p){let[{color:u,variant:g="outline",size:w="md",...v},...h]=q(p);return i({required:"required",title:"Switch Theme",...v,class:M("theme-switch",u,g,w,l,t==null?void 0:t.class,v.class),type:"checkbox",checked:r()=="dark",onclick:C=>{s(C.target.checked?"dark":"light")}},...h)}}function eo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:d,img:p,b:u,ul:g,li:w}=n.tags,{svg:v,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),C=i.drawerOpen,E=Q(e,{class:o`
      background: transparent;
    `}),k=Fe(e),I=()=>s(v({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),_=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>C.val=!C.val},I()),d({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),R=()=>l({class:o`
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
        `},_(),R())}}function to({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:d,h1:p}=t.tags,u=({links:v,title:h})=>o({class:n`
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
        `},p(h),r(v.map(({href:C,name:E})=>c(s({href:C},E))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],w=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid var(--color-emphasis-200);
          color: var(--color-content-secondary);
        `},d({class:n`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `},u({title:"Bau UI",links:g}),u({title:"Bau Ecosystem",links:w})),d({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.42.0"),i("MIT license")))}}function we(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,s=o`
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
    ${(()=>oe.map(r=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:p,...u},...g]=q(c);return a({...u,class:M("list",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const Te="0.3s",ft=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(ft({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},vt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=vt(e)(t.children[o]);if(a)return a}},no=({keyframes:e})=>({hideToLeft:e`
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
   `});function Ve(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=G=>{var P;return((P=G.parentTree.data)==null?void 0:P.href)??G.parentTree.children[0].data.href},d=({variant:G,color:P,size:F,currentTree:f,data:m})=>k(D({variant:G,color:P,size:F,href:`${c}${l(f)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:G,color:P,size:F,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:G,subTree:{data:{name:P,href:F},children:f=[]}})=>D({size:G,href:`${c}${F}`,"data-ischild":!f.length},P),u=({pathname:G,subTree:P})=>{var F;return G===((F=P==null?void 0:P.data)==null?void 0:F.href)},{renderHeader:g=d,renderMenuItem:w=p,isActive:v=u}=t,{li:h,nav:C,div:E,header:k,a:I}=n.tags,_=De(e),R=we(e),D=Q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:$}=no(e),H=o`
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
  `,X=({variant:G,color:P,size:F,currentTree:f,pathnameState:m})=>{const{children:b,parentTree:x,data:y}=f;return E({class:M("drillDownMenu",G,P,F)},x&&g({variant:G,color:P,size:F,data:y,currentTree:f}),b&&R({class:M(G,P,F)},b.map(O=>h({class:()=>M(O.children&&"has-children",v({pathname:m.val,subTree:O})&&"active")},w({variant:G,color:P,size:F,subTree:O})))))},J=({tree:G,pathname:P})=>{let F=ft({})(structuredClone(G)),f=vt(P)(F);return f||(console.error("drilldown no sub tree",P),f=F),f};return function(P){const{variant:F="plain",color:f="neutral",size:m="md",tree:b,...x}=P,y=n.state(a.location.pathname.replace(c,"")),O=n.derive(()=>J({tree:b,pathname:y.val}));a.document.addEventListener("click",U=>{const{target:Y}=U,ee=Y.getAttribute("href");if(Y.tagName==="A"&&ee&&!ee.startsWith("http")){let ae=ee.replace(c,"");r||(ae=ae.replace(Y.hash,"")),y.val=ae}});let N=1;const Z=U=>{const{dataset:Y}=U.target;Y.buttonback=="true"?N=-1:Y.ischild=="false"?N=1:Y.ischild=="true"&&(N=0)},j=U=>{switch(U){case 1:return`${B} ${Te}`;case-1:return`${$} ${Te}`;default:return""}},T=U=>{switch(U){case 1:return`${$} ${Te} reverse`;case-1:return`${B} ${Te} reverse`;default:return""}};return C({class:M(H,t==null?void 0:t.class,x.class),onclick:Z},_({animationHide:()=>j(N),animationShow:()=>T(N)},()=>X({variant:F,color:f,size:m,currentTree:O.val,pathnameState:y})))}}const oo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function xt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:d,a:p,span:u}=n.tags;let g=!1;const w=Ve(e);return function(){return r({bauMounted:({element:h})=>{s.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:h=>{g&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:M(o`
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
          `)},w({tree:oo}))}}const ao=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=De(e),r=eo(e),c=xt(e),l=to(e),d=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(u="")=>`${d} ease-in-out 0.5s ${u}`;return function({componentState:g}){return i({class:n`
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
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val&&g.val({})),l())}};function Ie(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c="md",variant:l="outline",color:d="neutral",onclick:p,...u},...g]=q(r);return a({...u,onclick:p,class:M("chip",i,c,l,d,p&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}function ro(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;Q(e);const c=n`
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
  `;return function({name:d,text:p,tagLine:u}){return a({class:c},i(d),s(p),r(u))}}function so(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function io({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:d}=t.tags,p=({maxSize:u=151})=>({libName:g,size:w})=>r({class:n`
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
                  var(--color-success) ${w/u*100}%
                );
                justify-content: flex-end;
                width: ${w/u*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},w)));return function({data:g=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",d({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function co(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=ro(e),l=so(e),d=Q(e);Ie(e);const p=io(e),u=(...C)=>a({class:n`
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
          `},...C)),g=n``,w=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],v=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),d({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),u(d({variant:"solid",color:"primary"},"solid"),d({variant:"outline",color:"primary"},"outline"),d({variant:"plain",color:"primary"},"plain")),u(d({variant:"solid",color:"neutral",size:"sm"},"neutral"),d({variant:"solid",color:"primary",size:"sm"},"primary"),d({variant:"solid",color:"danger",size:"sm"},"danger"),d({variant:"solid",color:"warning",size:"sm"},"warning")),u(d({variant:"outline",color:"primary",size:"sm"},"small"),d({variant:"outline",color:"primary",size:"md"},"medium"),d({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],h=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},d({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),d({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),d({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:v}),p({data:w}),h())}}function lo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...u){return a("Login")}}const uo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=lo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function po(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),uo(e)()))}}function mo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function wt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&wt(n)}),e}class it{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function yt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const bo="</span>",ct=e=>!!e.scope,ho=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class go{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=yt(t)}openNode(t){if(!ct(t))return;const n=ho(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){ct(t)&&(this.buffer+=bo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const lt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class We{constructor(){this.rootNode=lt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=lt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{We._collapse(n)}))}}class fo extends We{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new go(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function Ct(e){return de("(?=",e,")")}function vo(e){return de("(?:",e,")*")}function xo(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function wo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ze(...e){return"("+(wo(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function Et(e){return new RegExp(e.toString()+"|").exec("").length-1}function yo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Co=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Xe(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),s="";for(;i.length>0;){const r=Co.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Eo=/\b\B/,St="[a-zA-Z]\\w*",Ke="[a-zA-Z_]\\w*",kt="\\b\\d+(\\.\\d+)?",Tt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",At="\\b(0b[01]+)",So="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},To={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Ao={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Mo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},$e=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Ze("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Do=$e("//","$"),Io=$e("/\\*","\\*/"),$o=$e("#","$"),No={scope:"number",begin:kt,relevance:0},_o={scope:"number",begin:Tt,relevance:0},Bo={scope:"number",begin:At,relevance:0},Oo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Ro={scope:"title",begin:St,relevance:0},Lo={scope:"title",begin:Ke,relevance:0},Po={begin:"\\.\\s*"+Ke,relevance:0},jo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ae=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Eo,IDENT_RE:St,UNDERSCORE_IDENT_RE:Ke,NUMBER_RE:kt,C_NUMBER_RE:Tt,BINARY_NUMBER_RE:At,RE_STARTERS_RE:So,SHEBANG:ko,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:To,QUOTE_STRING_MODE:Ao,PHRASAL_WORDS_MODE:Mo,COMMENT:$e,C_LINE_COMMENT_MODE:Do,C_BLOCK_COMMENT_MODE:Io,HASH_COMMENT_MODE:$o,NUMBER_MODE:No,C_NUMBER_MODE:_o,BINARY_NUMBER_MODE:Bo,REGEXP_MODE:Oo,TITLE_MODE:Ro,UNDERSCORE_TITLE_MODE:Lo,METHOD_GUARD:Po,END_SAME_AS_BEGIN:jo});function zo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Ho(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Uo(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=zo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Go(e,t){Array.isArray(e.illegal)&&(e.illegal=Ze(...e.illegal))}function Fo(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Vo(e,t){e.relevance===void 0&&(e.relevance=1)}const Wo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Ct(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Zo=["of","and","for","in","not","or","if","then","parent","list","value"],Xo="keyword";function Mt(e,t,n=Xo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Mt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,Ko(c[0],c[1])]})}}function Ko(e,t){return t?Number(t):Yo(e)?0:1}function Yo(e){return Zo.includes(e.toLowerCase())}const ut={},ue=e=>{console.error(e)},dt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{ut[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ut[`${e}/${t}`]=!0)},Me=new Error;function Dt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=Et(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function qo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Me;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Me;Dt(e,e.begin,{key:"beginScope"}),e.begin=Xe(e.begin,{joinWith:""})}}function Jo(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Me;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Me;Dt(e,e.end,{key:"endScope"}),e.end=Xe(e.end,{joinWith:""})}}function Qo(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ea(e){Qo(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),qo(e),Jo(e)}function ta(e){function t(s,r){return new RegExp(ve(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Et(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(Xe(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,u)=>u>0&&p!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[Ho,Fo,ea,Wo].forEach(d=>d(s,r)),e.compilerExtensions.forEach(d=>d(s,r)),s.__beforeBegin=null,[Uo,Go,Vo].forEach(d=>d(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Mt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(d){return na(d==="self"?s:d)})),s.contains.forEach(function(d){i(d,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function It(e){return e?e.endsWithParent||It(e.starts):!1}function na(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:It(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var oa="11.8.0";class aa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const He=yt,pt=ie,mt=Symbol("nomatch"),ra=7,$t=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:fo};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const x=r.languageDetectRe.exec(b);if(x){const y=$(x[1]);return y||(dt(i.replace("{}",x[1])),dt("Falling back to no-highlight mode for this block.",m)),y?x[1]:"no-highlight"}return b.split(/\s+/).find(y=>c(y)||$(y))}function d(m,b,x){let y="",O="";typeof b=="object"?(y=m,x=b.ignoreIllegals,O=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),O=m,y=b),x===void 0&&(x=!0);const N={code:y,language:O};F("before:highlight",N);const Z=N.result?N.result:p(N.language,N.code,x);return Z.code=N.code,F("after:highlight",Z),Z}function p(m,b,x,y){const O=Object.create(null);function N(S,A){return S.keywords[A]}function Z(){if(!L.keywords){te.addText(K);return}let S=0;L.keywordPatternRe.lastIndex=0;let A=L.keywordPatternRe.exec(K),z="";for(;A;){z+=K.substring(S,A.index);const V=re.case_insensitive?A[0].toLowerCase():A[0],ne=N(L,V);if(ne){const[se,Tn]=ne;if(te.addText(z),z="",O[V]=(O[V]||0)+1,O[V]<=ra&&(Se+=Tn),se.startsWith("_"))z+=A[0];else{const An=re.classNameAliases[se]||se;U(A[0],An)}}else z+=A[0];S=L.keywordPatternRe.lastIndex,A=L.keywordPatternRe.exec(K)}z+=K.substring(S),te.addText(z)}function j(){if(K==="")return;let S=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){te.addText(K);return}S=p(L.subLanguage,K,!0,nt[L.subLanguage]),nt[L.subLanguage]=S._top}else S=g(K,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Se+=S.relevance),te.__addSublanguage(S._emitter,S.language)}function T(){L.subLanguage!=null?j():Z(),K=""}function U(S,A){S!==""&&(te.startScope(A),te.addText(S),te.endScope())}function Y(S,A){let z=1;const V=A.length-1;for(;z<=V;){if(!S._emit[z]){z++;continue}const ne=re.classNameAliases[S[z]]||S[z],se=A[z];ne?U(se,ne):(K=se,Z(),K=""),z++}}function ee(S,A){return S.scope&&typeof S.scope=="string"&&te.openNode(re.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(U(K,re.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),K=""):S.beginScope._multi&&(Y(S.beginScope,A),K="")),L=Object.create(S,{parent:{value:L}}),L}function ae(S,A,z){let V=yo(S.endRe,z);if(V){if(S["on:end"]){const ne=new it(S);S["on:end"](A,ne),ne.isMatchIgnored&&(V=!1)}if(V){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return ae(S.parent,A,z)}function Oe(S){return L.matcher.regexIndex===0?(K+=S[0],1):(Pe=!0,0)}function Cn(S){const A=S[0],z=S.rule,V=new it(z),ne=[z.__beforeBegin,z["on:begin"]];for(const se of ne)if(se&&(se(S,V),V.isMatchIgnored))return Oe(A);return z.skip?K+=A:(z.excludeBegin&&(K+=A),T(),!z.returnBegin&&!z.excludeBegin&&(K=A)),ee(z,S),z.returnBegin?0:A.length}function En(S){const A=S[0],z=b.substring(S.index),V=ae(L,S,z);if(!V)return mt;const ne=L;L.endScope&&L.endScope._wrap?(T(),U(A,L.endScope._wrap)):L.endScope&&L.endScope._multi?(T(),Y(L.endScope,S)):ne.skip?K+=A:(ne.returnEnd||ne.excludeEnd||(K+=A),T(),ne.excludeEnd&&(K=A));do L.scope&&te.closeNode(),!L.skip&&!L.subLanguage&&(Se+=L.relevance),L=L.parent;while(L!==V.parent);return V.starts&&ee(V.starts,S),ne.returnEnd?0:A.length}function Sn(){const S=[];for(let A=L;A!==re;A=A.parent)A.scope&&S.unshift(A.scope);S.forEach(A=>te.openNode(A))}let Ee={};function tt(S,A){const z=A&&A[0];if(K+=S,z==null)return T(),0;if(Ee.type==="begin"&&A.type==="end"&&Ee.index===A.index&&z===""){if(K+=b.slice(A.index,A.index+1),!a){const V=new Error(`0 width match regex (${m})`);throw V.languageName=m,V.badRule=Ee.rule,V}return 1}if(Ee=A,A.type==="begin")return Cn(A);if(A.type==="illegal"&&!x){const V=new Error('Illegal lexeme "'+z+'" for mode "'+(L.scope||"<unnamed>")+'"');throw V.mode=L,V}else if(A.type==="end"){const V=En(A);if(V!==mt)return V}if(A.type==="illegal"&&z==="")return 1;if(Le>1e5&&Le>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return K+=z,z.length}const re=$(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const kn=ta(re);let Re="",L=y||kn;const nt={},te=new r.__emitter(r);Sn();let K="",Se=0,ce=0,Le=0,Pe=!1;try{if(re.__emitTokens)re.__emitTokens(b,te);else{for(L.matcher.considerAll();;){Le++,Pe?Pe=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const S=L.matcher.exec(b);if(!S)break;const A=b.substring(ce,S.index),z=tt(A,S);ce=S.index+z}tt(b.substring(ce))}return te.finalize(),Re=te.toHTML(),{language:m,value:Re,relevance:Se,illegal:!1,_emitter:te,_top:L}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:m,value:He(b),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:ce,context:b.slice(ce-100,ce+100),mode:S.mode,resultSoFar:Re},_emitter:te};if(a)return{language:m,value:He(b),illegal:!1,relevance:0,errorRaised:S,_emitter:te,_top:L};throw S}}function u(m){const b={value:He(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function g(m,b){b=b||r.languages||Object.keys(t);const x=u(m),y=b.filter($).filter(X).map(T=>p(T,m,!1));y.unshift(x);const O=y.sort((T,U)=>{if(T.relevance!==U.relevance)return U.relevance-T.relevance;if(T.language&&U.language){if($(T.language).supersetOf===U.language)return 1;if($(U.language).supersetOf===T.language)return-1}return 0}),[N,Z]=O,j=N;return j.secondBest=Z,j}function w(m,b,x){const y=b&&n[b]||x;m.classList.add("hljs"),m.classList.add(`language-${y}`)}function v(m){let b=null;const x=l(m);if(c(x))return;if(F("before:highlightElement",{el:m,language:x}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new aa("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const y=b.textContent,O=x?d(y,{language:x,ignoreIllegals:!0}):g(y);m.innerHTML=O.value,w(m,x,O.language),m.result={language:O.language,re:O.relevance,relevance:O.relevance},O.secondBest&&(m.secondBest={language:O.secondBest.language,relevance:O.secondBest.relevance}),F("after:highlightElement",{el:m,result:O,text:y})}function h(m){r=pt(r,m)}const C=()=>{I(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){I(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function I(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(r.cssSelector).forEach(v)}function _(){k&&I()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function R(m,b){let x=null;try{x=b(e)}catch(y){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(y);else throw y;x=s}x.name||(x.name=m),t[m]=x,x.rawDefinition=b.bind(null,e),x.aliases&&H(x.aliases,{languageName:m})}function D(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function B(){return Object.keys(t)}function $(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=b})}function X(m){const b=$(m);return b&&!b.disableAutodetect}function J(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function G(m){J(m),o.push(m)}function P(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function F(m,b){const x=m;o.forEach(function(y){y[x]&&y[x](b)})}function f(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),v(m)}Object.assign(e,{highlight:d,highlightAuto:g,highlightAll:I,highlightElement:v,highlightBlock:f,configure:h,initHighlighting:C,initHighlightingOnLoad:E,registerLanguage:R,unregisterLanguage:D,listLanguages:B,getLanguage:$,registerAliases:H,autoDetection:X,inherit:pt,addPlugin:G,removePlugin:P}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=oa,e.regex={concat:de,lookahead:Ct,either:Ze,optional:xo,anyNumberOfTimes:vo};for(const m in Ae)typeof Ae[m]=="object"&&wt(Ae[m]);return Object.assign(e,Ae),e},be=$t({});be.newInstance=()=>$t({});var sa=be;be.HighlightJS=be;be.default=be;const fe=mo(sa),bt="[A-Za-z$_][0-9A-Za-z$_]*",ia=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ca=["true","false","null","undefined","NaN","Infinity"],Nt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],_t=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Bt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],la=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ua=[].concat(Bt,Nt,_t);function Ot(e){const t=e.regex,n=(b,{after:x})=>{const y="</"+b[0].slice(1);return b.input.indexOf(y,x)!==-1},o=bt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const y=b[0].length+b.index,O=b.input[y];if(O==="<"||O===","){x.ignoreMatch();return}O===">"&&(n(b,{after:y})||x.ignoreMatch());let N;const Z=b.input.substring(y);if(N=Z.match(/^\s*=/)){x.ignoreMatch();return}if((N=Z.match(/^\s+extends\s+/))&&N.index===0){x.ignoreMatch();return}}},r={$pattern:bt,keyword:ia,literal:ca,built_in:ua,"variable.language":la},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},w={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},v={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,w,v,h,{match:/\$\d+/},p];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(k)});const I=[].concat(E,u.contains),_=I.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(I)}]),R={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:_},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Nt,..._t]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[R],illegal:/%/},X={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function J(b){return t.concat("(?!",b.join("|"),")")}const G={match:t.concat(/\b/,J([...Bt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},P={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},F={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},R]},f="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(f)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[R]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,w,v,h,E,{match:/\$\d+/},p,B,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:f,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[R,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},P,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[R]},G,X,D,F,{match:/\$[(.]/}]}}function da(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const pa=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",Ot),fe.registerLanguage("sh",da),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=fe.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function ma(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,d=pa(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}const Rt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:u}){return o({class:n`
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
        `},a(c(s(l(u??""),oe.map(g=>l(g)))),i(Yn.map(g=>s(l(g),oe.map((w,v)=>r(p({color:w,variant:g},{index:v}))))))))}},ba=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},qn.map((s,r)=>i({color:"success",variant:"outline",size:s},{index:r})))}},W=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:i,p:s,h2:r,h3:c,pre:l,div:d,code:p}=t.tags;fe.registerLanguage("javascript",Ot);const u=Rt(e),g=ba(e),w=({text:v})=>l({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:h})=>{h.innerHTML=fe.highlight(v,{language:"js"}).value}}));return function(h){return o({class:n``},i(h.title),s(h.description),h.gridItem&&[r("Variant/Color"),h.gridItem&&u({Item:h.gridItem(e)}),r("Size"),s("Component with size: ",p("sm"),", ",p("md"),", and ",p("lg")),h.gridItem&&g({Item:h.gridItem(e)})],r("Usage"),c("Import"),w({text:h.importStatement}),r("Examples"),h.examples.map(C=>a(i(C.title),s(C.description),d(C.createComponent(e)()),w({text:C.code}))))}},ha=()=>oe.map(e=>`
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
`);function Ne(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:i,ul:s,li:r,header:c,h3:l,button:d}=n.tags,p=n.state(""),u=v=>h=>{p.val==v?p.val="":p.val=v},g=({element:v,open:h})=>{const C=()=>{v.removeEventListener("transitionend",C)};function E(I){I.addEventListener("transitionend",C),window.requestAnimationFrame(()=>{I.style.height="0px"})}function k(I){I.addEventListener("transitionend",C),I.style.height=I.scrollHeight+"px"}v.scrollHeight!=0&&(h?k(v):E(v))},w=o`
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
    ${ha()}
  `;return function(...h){let[{color:C,variant:E="outline",size:k="md",content:I,..._},...R]=q(h);const D=B=>{const{Header:$,Content:H,name:X}=B;return r({class:M(C,E,k),onclick:u(X)},l({class:()=>M(p.val==X&&"active")},d({type:"button","aria-controls":`bau-${X}`,"aria-expanded":({element:J})=>p.val==X},$(B))),i({class:"content",role:"region",id:`bau-${X}`,"data-state":({element:J})=>{const G=p.val==X;return g({element:J,open:G}),G}},H(B)))};return i({class:M("accordion",w,t==null?void 0:t.class,_.class)},s(a.map(D)))}}const Lt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ne(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return s=>i({...s})},ga=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ne(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>i({color:"neutral",variant:"outline"})},fa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
  const Accordion = accordion(context, { accordionDefs });
  return () => Accordion({ color: "neutral", variant: "outline" });
};
`,Pt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},va=e=>{const{css:t}=e,n=Pt(e),o=Ne(e,{accordionDefs:n});return()=>o({color:"warning",class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},xa=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context, { accordionDefs });

  return () =>
    Accordion({
      color: "warning",
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
`,wa=e=>{const{css:t}=e,n=Pt(e),o=Ne(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
      `})},ya=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context, { accordionDefs });

  return () =>
    Accordion({
      color: "success",
      variant: "outline",
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
`,Ca={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:fa,createComponent:ga},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:xa,createComponent:va},{title:"Customize the icon",description:"Customize the icon with a cross.",code:ya,createComponent:wa}],gridItem:Lt},Ea=e=>{const t=W(e);return()=>t(Ca)},Sa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},ka=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Ta=()=>oe.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function _e(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:s}=n.tags;ka({css:o,createGlobalStyles:a});const r=o`
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
    ${Ta()}
  `,c=Q(e),l=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(p,...u){const{variant:g="outline",color:w="neutral",size:v="md",onRemove:h,...C}=p;return i({...C,class:M(`alert-${g}`,g,w,v,r,t==null?void 0:t.class,p.class,"alert"),role:"alert"},s({class:"icon"},Sa[w]),i({class:"content"},...u),h&&l({onclick:h}))}}const jt=e=>{const t=_e(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Aa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=_e(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ma=`import alert from "@grucloud/bau-ui/alert";
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
`,Da=e=>{const{css:t}=e,n=_e(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Ia=`import alert from "@grucloud/bau-ui/alert";
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
`,$a={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ma,createComponent:Aa},{title:"Custom Alert ",description:"A custom alert.",code:Ia,createComponent:Da}],gridItem:jt},Na=e=>{const t=W(e);return()=>t($a)},_a=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:u,status:g})=>{const w=c.val.findIndex(v=>v.id===u);w!=-1&&(c.val[w].status=g)};return function(g={},...w){const v=({id:E})=>{p({id:E,status:"removing"});const k=c.val.findIndex(I=>I.id===E);k!=-1&&c.val.splice(k,1)},h=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=i&&v({id:c.val[0].id}),c.val.push(k),setTimeout(()=>v(k),s)},C=E=>r({class:d.item,onclick:()=>v(E)},E.Component());return document.addEventListener("alert.add",E=>h(E.detail)),document.addEventListener("alert.remove",E=>v(E.detail)),r({class:M(d.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),C))}},Ba=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=_a(e,{deleteAfterDuration:2e4}),i=Q(e),s=_e(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Oa=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ra={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Oa,createComponent:Ba}]},La=e=>{const t=W(e);return()=>t(Ra)},Pa=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=De(e),s=Q(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},ja=`import animate from "@grucloud/bau-ui/animate";
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
`,za=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=De(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),d=({target:u})=>l.val=u.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:d})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:d})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Ha=`import animate from "@grucloud/bau-ui/animate";
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
`,Ua={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:ja,createComponent:Pa},{title:"Component hide and show",description:"Hide and show a component",code:Ha,createComponent:za}]},Ga=e=>{const t=W(e);return()=>t(Ua)};function zt(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},d=o`
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
  `;return function(...u){let[{color:g,variant:w="outline",size:v="md",width:h=30,height:C=30,...E},...k]=q(u);return a({class:M(d,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:h,height:C,onload:c,onerror:l,class:M(g,w,v,d,t==null?void 0:t.class,E.class),...E}))}}const Ht=e=>{const{css:t}=e,n=zt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Fa=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=zt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Va=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Wa={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Va,createComponent:Fa}],gridItem:Ht},Za=e=>{const t=W(e);return()=>t(Wa)};function Ye(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:d,onClose:p,...u},...g]=q(c);const w=C=>{h.style.opacity=1,h.showModal();const E=d.getBoundingClientRect(),k=h.getBoundingClientRect();E.x<a.innerWidth/2?h.style.left=E.left+"px":h.style.left=E.right-k.width+"px",E.y<a.innerHeight/2?h.style.top=E.top+E.height+"px":h.style.top=E.top-k.height+"px"},v=C=>{const E=()=>{h.close(),h.removeEventListener("transitionend",E)};h.addEventListener("transitionend",E),h.style.opacity=0},h=i({role:"presentation",class:M("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:C=>C.target===h&&(v(),p==null?void 0:p.call())},l);return h.closeDialog=v,h.openDialog=w,h}}const Xa=()=>oe.map(e=>`
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
`);function qe(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Xa()}
  `;return function(r){const{size:c="md",variant:l="outline",color:d="neutral",name:p,id:u,disabled:g,...w}=r;return a({...w,class:M("input",c,d,l,i,t==null?void 0:t.class,w.class)})}}const Ka=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ut(e,t){const{bau:n,css:o}=e,{div:a,li:i,ul:s}=n.tags,r=Ye(e),c=Q(e),l=qe(e),d=we(e),p=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }
    & .content {
      height: fit-content;
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${Ka()}
  `,u=n.state(""),g=n.state(""),w=n.state(!1),v=n.state(0),h=()=>{w.val=!1};return function(...E){let[{variant:k="outline",color:I,size:_="md",id:R,label:D,placeholder:B,Option:$,options:H,getOptionLabel:X=({label:T})=>T,...J},...G]=q(E);const P=n.state(H),F=()=>{j.openDialog(),w.val=!0,g.val="",P.val=H},f=()=>{j.closeDialog(),w.val=!1,g.val=""},m=T=>{const{value:U}=T.target;g.val=U,U?P.val=H.filter(Y=>X(Y).match(new RegExp(`${U}`,"i"))):P.val=H},b=T=>{w.val?f():F()},x=({option:T,index:U})=>Y=>{u.val=X(T),v.val=U,f()},y=T=>{switch(console.log("onkeydown",T.key,v.val),T.key){case"Escape":f();break;case"ArrowDown":v.val<P.val.length-1?v.val++:v.val=0;break;case"ArrowUp":v.val<=0?v.val=P.val.length-1:v.val--;break;case"Enter":u.val=X(P.val[v.val]),g.val="",f();break}},O=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":w,"aria-label":D,onclick:b,variant:k,color:I,size:_},()=>!u.val&&D,u),N=l({id:R,value:g,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":w,oninput:m,onkeydown:y,variant:k,color:I,size:_}),j=r({id:R,triggerEl:O,contentEl:(()=>a({class:M(k,I,_,"content")},N,()=>d({class:M(k,I,_)},P.val.map((T,U)=>i({class:()=>M(v.val==U&&"active"),onclick:x({option:T,index:U})},$(T))))))(),onClose:h});return a({...J,class:M("autocomplete",p,t==null?void 0:t.class,J==null?void 0:J.class)},O,j)}}const Gt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Ut(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},Ya=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ut(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},qa=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ja={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:qa,createComponent:Ya}],gridItem:Gt},Qa=e=>{const t=W(e);return()=>t(Ja)};function Ft(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",content:p,...u},...g]=q(r);return a({...u,class:M("badge",i,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:M(c,l,d)},p),...g)}}const Vt=e=>{const t=Ft(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},er=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ft(e);return()=>n(o({content:"10"},"☏"))},tr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,nr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:tr,createComponent:er}],gridItem:Vt},or=e=>{const t=W(e);return()=>t(nr)};function Wt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:s}=n.tags,r=Q(e),c=o`
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
  `;return function(...d){let[{color:p="neutral",variant:u="plain",size:g="md",items:w,...v},...h]=q(d);return a({...v,class:M(c,t==null?void 0:t.class,v==null?void 0:v.class)},w.map(({href:C,name:E})=>i((C?r:s)({href:C,color:p,variant:u,size:g,class:M(p,u,g)},E))))}}const Zt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Wt(e);return o=>n({...o,...t})},ar=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Wt(e);return()=>n(a(o))},rr=`import breadcrumbs, {
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
`,sr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:rr,createComponent:ar}],gridItem:Zt},ir=e=>{const t=W(e);return()=>t(sr)},Xt=e=>{const t=Q(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},cr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},lr=`import button from "@grucloud/bau-ui/button";
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
`,ur={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:lr,createComponent:cr}],gridItem:Xt},dr=e=>{const t=W(e);return()=>t(ur)},pr=()=>oe.map(e=>`
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
`);function Je(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${pr()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:d,...p},...u]=q(r);return a({...p,class:M("button-group",c,d,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Kt=e=>{const t=["ONE","TWO","THREE"],n=Q(e),o=Je(e);return a=>o({...a},t.map(i=>n(a,i)))},mr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=Q(e),i=Je(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},br=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,hr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:br,createComponent:mr}],gridItem:Kt},gr=e=>{const t=W(e);return()=>t(hr)};function Yt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:p,...u},...g]=q(c);return a({...u,type:"date",class:M("calendar",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const qt=e=>{const t=Yt(e);return n=>t({...n})},fr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=Yt(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},vr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,xr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:vr,createComponent:fr}],gridItem:qt},wr=e=>{const t=W(e);return()=>t(xr)},Jt=e=>{const t=Ie(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},yr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Cr=`import chip from "@grucloud/bau-ui/chip";
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
`,Er={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Cr,createComponent:yr}],gridItem:Jt},Sr=e=>{const t=W(e);return()=>t(Er)};function Qt(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...p},...u]=q(r);return a({type:"checkbox",required:"required",...p,class:M(i,c,l,d,t==null?void 0:t.class,p==null?void 0:p.class)})}}const en=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=Qt(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},kr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=Qt(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Tr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Ar={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Tr,createComponent:kr}],gridItem:en},Mr=e=>{const t=W(e);return()=>t(Ar)};function Dr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d,openState:p,...u},...g]=q(r);return a({class:M(i,t==null?void 0:t.class,u.class)},a({class:()=>M("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>M("content",p.val&&"content-open")},g))}}const Ir=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Dr(e),s=Q(e),r=xt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},$r=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Nr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:$r,createComponent:Ir}]},_r=e=>{const t=W(e);return()=>t(Nr)},tn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Ve(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Br=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Ve(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Or=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Rr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Or,createComponent:Br}],gridItem:e=>tn(e,{base:"/components/drillDownMenu",hashBased:!0})},Lr=e=>{const t=W(e);return()=>t(Rr)};function nn(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(d,...p){const{variant:u="outline",color:g="neutral",size:w="md",Component:v,disabled:h,...C}=d;return a({class:M(c.base,h&&c.disabled,t==null?void 0:t.class,d.class)},s({class:M(u,g,w)},v({disabled:h}),r({type:"file",disabled:h,...C})),i({class:"filename-display"}))}}const on=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),d=nn(e),p=g=>{const w=g.target.files[0];w?l.val=w.name:l.val="No file selected"},u=({disabled:g})=>r({class:M(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return g=>d({Component:u,name:"file",accept:"text/*",onchange:p,...g})},Pr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,d=n.state("No file selected"),p=nn(e),u=w=>{const v=w.target.files[0];v?d.val=v.name:d.val="No file selected"},g=({disabled:w})=>c({class:M(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,w&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:g,name:"file",accept:"text/*",onchange:u}),c("File selected: ",d))},jr=`import classNames from "@grucloud/bau-css/classNames";
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
`,zr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:jr,createComponent:Pr}],gridItem:on},Hr=e=>{const t=W(e);return()=>t(zr)},an=e=>{const t=qe(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},Ur=e=>{const{bau:t}=e,{section:n}=t.tags,o=qe(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},Gr=`import input from "@grucloud/bau-ui/input";
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
`,Fr={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Gr,createComponent:Ur}],gridItem:an},Vr=e=>{const t=W(e);return()=>t(Fr)},Wr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Zr=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},Wr.map(s))},Xr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Kr=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=we(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Xr.map(r)))},Yr=`import list from "@grucloud/bau-ui/list";
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
`,qr={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Yr,createComponent:Kr}],gridItem:Zr},Jr=e=>{const t=W(e);return()=>t(qr)};function rn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p="md",...u},...g]=q(c);return a({class:M("modal",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const sn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=Q(e),c=rn(e),l=()=>o(Array(10).fill("").map((p,u)=>s(u+1,". Some text here"))),d=p=>{const u=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{u.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{u.close()}},"OK")));return u};return p=>{const u=d(p);return n(r({...p,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},Qr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=Q(e),l=rn(e),d=()=>o(Array(10).fill("").map((u,g)=>s(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),d(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},es=`import modal from "@grucloud/bau-ui/modal";
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
`,ts={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:es,createComponent:Qr}],gridItem:sn},ns=e=>{const t=W(e);return()=>t(ts)},os=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=Q(e),r=Ye(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),d=c(),p=r({id:"my-popover-left",triggerEl:d,contentEl:l()});return()=>n(o(d,p))},as=`import popover from "@grucloud/bau-ui/popover";
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
`,rs={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:as,createComponent:os}]},ss=e=>{const t=W(e);return()=>t(rs)},is=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function cn(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=Q(e),r=Ye(e),c=we(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${is()}
  `,d=n.state(""),p=n.state(!1),u=n.state(0);return function(...w){let[{color:v="neutral",variant:h="outline",size:C="md",id:E,label:k,Option:I,options:_,getOptionLabel:R=({label:b})=>b,...D},...B]=q(w);const $=()=>{m.openDialog(),m.focus(),p.val=!0},H=()=>{m.closeDialog(),p.val=!1},X=()=>{p.val=!1},J=b=>{p.val?H():$()},G=({option:b,index:x})=>y=>{d.val=R(b),u.val=x,H()},P=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":u.val<_.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=_.length-1:u.val--;break;case"Enter":p.val?(d.val=R(_[u.val]),H()):$();break}},F=()=>c({tabindex:"0",class:M(v,h)},_.map((b,x)=>i({class:()=>M(u.val==x&&"active"),onclick:G({option:b,index:x})},I(b)))),f=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":k,onclick:J,color:v,variant:h,size:C},()=>!d.val&&k,d),m=r({id:E,triggerEl:f,contentEl:F(),onClose:X});return a({...D,class:M("select",v,C,l,t==null?void 0:t.class,D==null?void 0:D.class),onkeydown:P},f,m)}}const ln=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=cn(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},cs=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=cn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},ls=`import select from "@grucloud/bau-ui/select";
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
`,us={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:ls,createComponent:cs}],gridItem:ln},ds=e=>{const t=W(e);return()=>t(us)};function Be(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p,...u},...g]=q(c);return a({...u,type:"range",class:M("slider",l,d,p,s,t==null?void 0:t.class,u.class)},...g)}}const un=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Be(e);return i=>a({...i,oninput:o})},ps=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Be(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},ms=`import slider from "@grucloud/bau-ui/slider";
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
`,bs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Be(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},hs=`import slider from "@grucloud/bau-ui/slider";
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
`,gs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Be(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},fs=`import slider from "@grucloud/bau-ui/slider";
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
`,vs={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ms,createComponent:ps},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:hs,createComponent:bs},{title:"Vertical Mark",description:"A vertical slider with marks.",code:fs,createComponent:gs}],gridItem:un},xs=e=>{const t=W(e);return()=>t(vs)},ht={sm:16,md:32,lg:64};function Qe(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:i,animateTransform:s,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:d="color-base",variant:p="outline",visibility:u=!0,...g}={}){return a({class:M(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,g.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:ht[l],height:ht[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},i({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const dn=e=>{const t=Qe(e);return n=>t({...n})},ws=e=>{const{bau:t}=e,{section:n}=t.tags,o=Qe(e);return()=>n(o({}))},ys=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,Cs={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ys,createComponent:ws}],gridItem:dn},Es=e=>{const t=W(e);return()=>t(Cs)},Ss=()=>oe.map(e=>`
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
`);function pn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Ss()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d="md",...p},...u]=q(r);return a({...p,class:M("switch",i,c,l,d,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...u)}}const mn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=pn(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ks=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=pn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Ts=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,As={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Ts,createComponent:ks}],gridItem:mn},Ms=e=>{const t=W(e);return()=>t(As)},Ds=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),d=u=>c.val.find(g=>g.name==u),p={base:o`
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
      ${Ds()}
    `};return function(...g){let[{color:w,variant:v="plain",size:h,...C},...E]=q(g);const k=_=>{const{Header:R,disabled:D,name:B}=_;return r({class:()=>M(l.val.name==B&&"active",D&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},R(_))},I=i({class:M("tabs",p.base,v,h,w,t==null?void 0:t.class,C.class)},n.loop(c,s(),k),()=>l.val.Content?l.val.Content({}):"");return I.addEventListener("tab.select",_=>{var B,$;const{tabName:R}=_.detail,D=d(R);D&&((B=l.val.exit)==null||B.call(),l.val=D,($=D.enter)==null||$.call())},!1),I.addEventListener("tab.add",_=>{var D;const{tab:R}=_.detail;(D=R.enter)==null||D.call(),c.val.push(R)},!1),I.addEventListener("tab.remove",_=>{var D;const R=c.val.findIndex(B=>B.name==_.detail.tabName);R>0&&((D=c.val[R].exit)==null||D.call(),c.val.splice(R,1))},!1),I}}const bn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},Is=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},$s=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Ns=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},_s=`import tabs from "@grucloud/bau-ui/tabs";
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
`,hn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Bs=e=>{const{css:t}=e,n=ye(e,{tabDefs:hn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Os=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Rs=e=>{const{css:t}=e,n=hn(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Ls=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Ps={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:$s,createComponent:Is},{title:"Extended Tabs",description:"An extended tabs.",code:_s,createComponent:Ns},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Os,createComponent:Bs},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Ls,createComponent:Rs}],gridItem:bn},js=e=>{const t=W(e);return()=>t(Ps)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...d]=q(c);return i({...l,class:M("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...d)}}const zs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags;function p(h,C,E,k,I){return{name:h,calories:C,fat:E,carbs:k,protein:I}}const u=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:h,calories:C})=>s(i(h),i({class:n`
            text-align: right;
          `},C)),w=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(v(r(d("Basic Table"),w(),l(u.map(g)))))},Hs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Us=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Gs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:w,calories:v})=>s(i(w),i({class:n`
            text-align: right;
          `},v)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(d("Table Dense"),u(),l(Us.map(p)))))},Fs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ge(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Vs=[ge("Frozen yoghurt",159,6,24,4),ge("Ice cream sandwich",237,9,37,4.3),ge("Eclair",262,16,24,6),ge("Cupcake",305,3.7,67,4.3),ge("Gingerbread",356,16,49,3.9)],Ws=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:w,calories:v})=>s(i(w),i({class:n`
            text-align: right;
          `},v)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(d("Table Zebra"),u(),l(Vs.map(p)))))},Zs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Xs={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Hs,createComponent:zs},{title:"Dense",description:"A dense table.",code:Fs,createComponent:Gs},{title:"Zebra",description:"A zebra table.",code:Zs,createComponent:Ws}]},Ks=e=>{const t=W(e);return()=>t(Xs)};function gn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=Je(e),s=Q(e),r=Qe(e),c=o`
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
  `,l=({label:w,icon:v,...h})=>s({"aria-label":w,title:w,...h},v),d=({count:w,totalCount:v,page:h,rowsPerPage:C})=>a({class:"pages-numbers"},Number(h-1)*Number(C)+(w>0?1:0),"-",Math.min(h*C,v)," of ",v),p=({count:w,page:v,rowsPerPage:h})=>a({class:"pages-numbers"},(v-1)*h+(w>0?1:0),"-",v*h),u=w=>w<=1,g=(w,v,h)=>w>=Math.ceil(v/h);return function(...v){let[{count:h=0,totalCount:C=0,page:E=1,rowsPerPage:k=50,onPageChange:I,isLoading:_=!1,disableFirst:R=()=>u(E),disablePrevious:D=()=>u(E),disableNext:B=()=>g(E,C,k),disableLast:$=()=>g(E,C,k),...H},...X]=q(v);const J=Math.max(0,Math.ceil(C/k)),G=I({page:1}),P=I({page:E-1}),F=I({page:E+1}),f=I({page:J}),m=[{label:"First",icon:"⟪",onclick:G,disabled:R()},{label:"Previous",icon:"⟨",onclick:P,disabled:D()},{label:"Next",icon:"⟩",onclick:F,disabled:B()},{label:"Last",icon:"⟫",onclick:f,disabled:$()}];return a({...H,class:M("table-pagination",c,_&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},r({class:"spinner",visibility:_,size:"md"}),C>0?d({count:h,totalCount:C,page:E,maxPages:J,rowsPerPage:k}):p({count:h,page:E,maxPages:J,rowsPerPage:k}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Ys=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),qs=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=Ys(45),d=({name:E,email:k})=>i(a(E),a(k)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=gn(e),g=Ce(e,{class:n`
      max-width: 650px;
    `}),w=t.state(l),v=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>w.val.slice(v.val.page*v.val.rowsPerPage,(v.val.page+1)*v.val.rowsPerPage)),C=({page:E})=>k=>{v.val.page=E};return()=>g(s(p(),()=>c(h.val.map(d))),()=>u({...v.val,onPageChange:C}))},Js=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,d=t.state(!1),p=t.state([]),u=t.state(""),g=t.derive(()=>p.val.length),w=t.state(1),v=t.state(10),h=t.derive(()=>p.val),C=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,E=({page:$})=>H=>{w.val=$,k(C({page:$,per_page:v.val}))};k(C({page:1,per_page:v.val}));async function k($){try{d.val=!0;const H=await fetch($,{});if(H.ok){const X=await H.json();p.val=X;return}throw H}catch(H){u.val=H.message}finally{d.val=!1}}const I=({name:$,description:H,stargazers_count:X})=>i(a($),a(H),a({class:n`
            text-align: right;
          `},X)),_=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),R=gn(e),D=Ce(e,{class:n`
      min-width: 650px;
    `}),B=({message:$})=>l($);return()=>D(()=>R({rowsPerPage:v.val,page:w.val,count:g.val,totalCount:-1,isLoading:d.val,onPageChange:E,disableNext:()=>!1}),s(_(),()=>u.val&&B({message:u.val}),()=>c(h.val.map(I))))},Qs=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=qs(e),l=Js(e),d=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),d(l()),i("Simple Pagination"),d(c()))};function et(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:d="bottom-start",color:p="neutral",variant:u="outline",size:g="md",...w},...v]=q(c);const h=i({class:M("container",...d.split("-"))},i({class:M("content",p,u,g),role:"tooltip"},l)),C=D=>`move-to-${D}`,E=(D,B,$)=>{if(D()){const H=C(B);h.classList.add(H),h.classList.add(B),h.classList.remove($)}},k=(D,B)=>{const $=C(D);h.classList.contains($)&&(h.classList.remove($),h.classList.add(B),h.classList.remove(D))},I=D=>{const B=h.getBoundingClientRect();E(()=>B.x<0,"right","left"),E(()=>B.x+B.width>a.innerWidth,"left","right"),E(()=>B.y<0,"bottom","top"),E(()=>B.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},_=D=>{h.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return i({...w,class:M("tooltip",s,t==null?void 0:t.class,w==null?void 0:w.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",I),D.addEventListener("mouseout",_)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",I),D.removeEventListener("mouseout",_)}},...v,h)}}const fn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,s=Q(e),r=et(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},ei=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=Q(e),s=et(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},ti=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ni=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=(...p)=>Ie(e)({variant:"outline",color:"primary"},p),c=et(e),l=()=>o(a("A ",i("tooltip")," can be any component")),d=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>d()},oi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ai={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:ti,createComponent:ei},{title:"Grid",description:"Various tooltip position",code:oi,createComponent:ni}],gridItem:fn},ri=e=>{const t=W(e);return()=>t(ai)},vn=e=>{const t=Fe(e);return n=>t(n)},si=e=>{const{bau:t}=e,{section:n}=t.tags,o=Fe(e);return()=>n(o({}))},ii=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,ci={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:ii,createComponent:si}],gridItem:vn},li=e=>{const t=W(e);return()=>t(ci)},ui=({css:e,createGlobalStyles:t})=>(t`
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
    `});function xn(e,t){const{bau:n,css:o,createGlobalStyles:a,window:i}=e,{renderMenuItem:s}=t,{ul:r,li:c,nav:l,div:d}=n.tags,p=ui({css:o,createGlobalStyles:a}),u=({element:h,closeState:C})=>{h.scrollHeight!=0&&(C.val?g(h):w(h))};function g(h){h.style.height=h.scrollHeight+"px";const C=()=>{h.removeEventListener("transitionend",C)};h.addEventListener("transitionend",C),i.requestAnimationFrame(()=>{h.style.height="0px"})}function w(h){const C=()=>{h.removeEventListener("transitionend",C),h.style.height=null};h.addEventListener("transitionend",C),h.style.height=h.scrollHeight+"px"}const v=({depth:h=1,maxDepth:C,color:E,variant:k,size:I})=>_=>{const{children:R,expanded:D}=_,B=n.state(!D);return c({class:()=>M(R?B.val?p.collapsed:p.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:$=>{R&&(B.val=!B.val)}},s(_.data)),R&&h<C&&r({class:M(E,I),bauMounted:({element:$})=>{B.val&&($.style.height="0px")},"aria-expanded":({element:$})=>(u({element:$,closeState:B}),!B.val)},R.map(v({depth:h+1,maxDepth:C}))))};return function({tree:C,maxDepth:E=1/0,size:k="md",variant:I="plain",color:_="neutral",...R}){return l({class:M(p.nav,k,I,_,t==null?void 0:t.class,R.class)},C.children&&r(C.children.map(v({maxDepth:E,color:_,variant:I,size:k}))))}}const wn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=xn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},di=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=xn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},pi=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,mi={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:pi,createComponent:di}],gridItem:wn},bi=e=>{const t=W(e);return()=>t(mi)},hi=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=Rt(e),d=Q(e),p=[{name:"Accordion",Item:Lt(e)},{name:"Alert",Item:jt(e)},{name:"Autocomplete",Item:Gt(e)},{name:"Avatar",Item:Ht(e)},{name:"Badge",Item:Vt(e)},{name:"Breadcrumbs",Item:Zt(e)},{name:"Button",Item:Xt(e)},{name:"Button Group",Item:Kt(e)},{name:"Calendar",Item:qt(e)},{name:"Checkbox",Item:en(e)},{name:"Chip",Item:Jt(e)},{name:"DrillDown Menu",Item:tn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:on(e)},{name:"Input",Item:an(e)},{name:"Modal",Item:sn(e)},{name:"Select",Item:ln(e)},{name:"Slider",Item:un(e)},{name:"Spinner",Item:dn(e)},{name:"Switch",Item:mn(e)},{name:"Tabs",Item:bn(e)},{name:"Theme Switch",Item:vn(e)},{name:"Tooltip",Item:fn(e)},{name:"Tree View",Item:wn(e)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:u})=>c(d({color:"primary",variant:"solid",href:`#${u}`,size:"sm"},u)))),p.map(u=>a({id:u.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(u))))},gi=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:co(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:ma(e)})},{path:"components",action:()=>({title:"Component",component:hi(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ea(e)})},{path:"alert",action:()=>({title:"Alert",component:Na(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:La(e)})},{path:"animate",action:()=>({title:"Animate",component:Ga(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Qa(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Za(e)})},{path:"badge",action:()=>({title:"Badge",component:or(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:ir(e)})},{path:"button",action:()=>({title:"Button",component:dr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:gr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:wr(e)})},{path:"chip",action:()=>({title:"Chip",component:Sr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Mr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:_r(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Lr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Hr(e)})},{path:"input",action:()=>({title:"Input",component:Vr(e)})},{path:"list",action:()=>({title:"List",component:Jr(e)})},{path:"modal",action:()=>({title:"Modal",component:ns(e)})},{path:"popover",action:()=>({title:"Popover",component:ss(e)})},{path:"select",action:()=>({title:"Select",component:ds(e)})},{path:"slider",action:()=>({title:"Slider",component:xs(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Es(e)})},{path:"switch",action:()=>({title:"Switch",component:Ms(e)})},{path:"table",action:()=>({title:"Table",component:Ks(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Qs(e)})},{path:"tabs",action:()=>({title:"Tabs",component:js(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:ri(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:li(e)})},{path:"treeView",action:()=>({title:"Tree View",component:bi(e)})}]},{path:"pages",action:t=>({title:"Pages",component:po(e)})}],fi=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),vi=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const d=o.location.pathname.replace(n,""),{title:p,component:u,Layout:g=t}=l.resolve({pathname:d});s.val=u,document.title=`${p}`}},xi=e=>{const{createGlobalStyles:t}=e;t`
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
  `};Hn();const yn={title:"Bau",base:"/bau/bau-ui"},le=Kn({config:yn}),{bau:wi}=le;le.states={drawerOpen:wi.state(!0)};xi(le);$n({routes:gi({context:le}),onLocationChange:vi({context:le,LayoutDefault:ao(le),config:yn}),notFoundRoute:fi(le)});
