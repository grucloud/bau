(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const Dn=(e,t)=>({...e,paths:[...t,e.path]}),ft=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Dn(o,e);return n?[a,...ft({paths:[...e,o.path],routes:n})]:a}),In=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},$n=({routes:e=[],notFoundRoute:t})=>{const n=ft({routes:e}).map(o=>({...o,regex:In(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Nn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=$n({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,s,i)=>{a.apply(s,i),n({router:o})}}),document.addEventListener("click",a=>{const{target:s}=a,i=s.getAttribute("href");s.tagName==="A"&&i&&!i.startsWith("http")&&!i.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,i),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ge=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],_n=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Bn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],at=e=>`var(--color-${e})`,On=e=>`var(--color-${e}-lightest)`,Rn=()=>Ge.map(([e])=>`
.outline.${e} {
  border: 2px solid ${at(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${On(e)};
}
.solid.${e} {
  background-color: ${at(e)};
}
`).join(`
`),Pn=()=>Ge.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Ln=e=>100-e*10,jn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Ln(t)}%);`).join(`
`),rt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),zn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,..._n.map(([a,s])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),...Bn.map(([a,s])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Hn({createGlobalStyles:e},{colorPalette:t=Ge}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>zn([n,o])).join(`
`)}
      ${jn()}
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
      ${Pn()}
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
  `}function Un(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Fe=e=>Object.prototype.toString.call(e??0).slice(8,-1),Gn=e=>Fe(e)=="Object",st=e=>Fe(e)=="Function",ze=e=>["Object","Array"].includes(Fe(e)),it=Object.getPrototypeOf,He=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,Fn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const Y=e=>!me(e[0])&&Gn(e[0])?e:[{},...e];function Vn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,s=new Set,i=!1,r,c=f=>n.createElement(f),l=(f,m,b)=>{let x=r;r=m;let C=f(b);return r=x,C},d=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},p=(f,m,b,x,C,O)=>{var $;if(i){s.add(f);return}for(let V of f.bindings){let{deps:_,element:I,renderInferred:F,render:J,renderItem:ee}=V;if(ee&&m)($=v(I,x,(...ae)=>g(ee(...ae)),b,C,O)[m])==null||$.call();else{let ae=F?F({element:I}):J({element:I,renderItem:ee})(..._.map(He));ae!==I&&I.replaceWith(V.element=g(ae))}}k(f),d()},u=(f,m,b=[])=>({get(x,C,O){var $;if(r==null||r.add(f),C==="_isProxy")return!0;if(!(($=x[C])!=null&&$._isProxy)&&!me(x[C])&&ze(x[C]))x[C]=new Proxy(x[C],u(f,m,[...b,C]));else if(Fn.includes(C)){let V=x[C];return(..._)=>{let I=V.apply(x,_);return p(f,C,I,_,m,b),I}}return Reflect.get(x,C,O)},set(x,C,O,$){let V=Reflect.set(x,C,O,$);return p(f,"setItem",V,{prop:C,value:O},m,[...b,C]),V}}),h=(f,m)=>new Proxy(m,u(f,m)),v=(f,m,b,x,C,O)=>{let $=()=>f.replaceChildren(...ke(x,b)),V=_=>f[_]&&f.removeChild(f[_]);return{assign:$,sort:$,reverse:$,setItem:()=>{var I;let _=O[0];(I=f.children[_])==null||I.replaceWith(b(C[_],_))},push:()=>f.append(...ke(m,(_,I)=>b(_,C.length+I))),unshift:()=>f.prepend(...ke(m,b)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{let[_,I,...F]=m;const{length:J}=f.children;for(let ee=_>=0?Math.min(_+I-1,J-1):J-1;ee>=(_>=0?_:J+_);ee--)f.children[ee].remove();if(F.length){let ee=F.forEach((ae,Re)=>b(ae,_+Re));f.children[_]?f.children[_].after(...ee):f.append(...ee)}}}},w=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=ze(f)?h(m,f):f,m.valProxy)},set val(m){let b=this,x=b.val;ze(m)?(b.valProxy=h(b,m),p(b,"assign",m)):m!==x&&(b.valProxy=m,p(b)),b.oldVal=x}}),g=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),y=(f,m)=>{let b=new Set;return m.val=l(f,b),b},E=f=>{let m=w(),b=y(f,m);m.computed=!0;for(let x of b)x.listeners.push({computed:f,deps:b,state:m});return m},k=f=>{for(let m of[...f.listeners])y(m.computed,m.state)},N=(f,...m)=>{if(m.length){let b=[];for(let x of m.flat(1/0))x!=null&&b.push(me(x)?z({deps:[x],render:()=>C=>C}):st(x)?Q({renderInferred:x}):g(x));f.append(...b)}},R={},B=(f,m)=>f&&(Object.getOwnPropertyDescriptor(f,m)??B(it(f),m)),M=(f,m,b)=>{var x;return R[f+","+m]??(R[f+","+m]=((x=B(b,m))==null?void 0:x.set)??0)},P=(f,m)=>new t.MutationObserver((b,x)=>{b.filter(C=>C.removedNodes).forEach(C=>[...C.removedNodes].find(O=>O===f&&(m({element:f}),x.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),D=(f,m)=>new t.MutationObserver((b,x)=>b.forEach(C=>m({record:C,element:f}))).observe(f,{childList:!0}),j=f=>new Proxy(function(b,...x){var V;let[C,...O]=Y(x),$=f?n.createElementNS(f,b):c(b);for(let[_,I]of Object.entries(C)){if(_.startsWith("bau"))continue;let F=M(b,_,it($))?J=>$[_]=J:J=>$.setAttribute(_,J);I==null||(me(I)?z({deps:[I],render:()=>()=>(F(I.val),$)}):st(I)&&(!_.startsWith("on")||I.isDerived)?Q({renderInferred:()=>(F(I({element:$})),$)}):I.renderProp?z({deps:I.deps,render:()=>()=>(F(I.renderProp({element:$})(...I.deps.map(He))),$)}):F(I))}return C.bauChildMutated&&D($,C.bauChildMutated),N($,...O),(V=C.bauCreated)==null||V.call(C,{element:$}),C.bauMounted&&t.requestAnimationFrame(()=>C.bauMounted({element:$})),C.bauUnmounted&&t.requestAnimationFrame(()=>P($,C.bauUnmounted)),$},{get:(m,b)=>m.bind(void 0,b)}),K=(f,m,b)=>{f.element=g(b);for(let x of m)me(x)&&(a.add(x),x.bindings.push(f));return f.element},Q=({renderInferred:f,element:m})=>{let b=new Set,x=l(f,b,{element:m});return K({renderInferred:f},b,x)},z=({deps:f,element:m,render:b,renderItem:x})=>K({deps:f,render:b,renderItem:x},f,b({element:m,renderItem:x})(...f.map(He))),G=(f,m,b)=>z({deps:[f],render:({renderItem:x})=>C=>(m.append(...ke(C,x)),m),renderItem:b}),U=f=>{i=!0,f(),i=!1,s.forEach(p),s.clear()};return{tags:j(),tagsNS:j,state:w,bind:z,loop:G,derive:E,stateSet:a,batch:U}}const Wn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Zn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Xn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Kn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...s)=>{const i=Xn(a,s),r=Wn(i);return!t.getElementById(r)&&Zn(t,e==null?void 0:e.target,r,o(r,i)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Yn(e){const t=Vn(),n=Kn();return Hn(n),{bau:t,...n,tr:o=>o,window,...e}}function A(...e){return e.filter(t=>t).join(" ")}function De(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:i=a,animationShow:r=a,...c},l){return o({class:A("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(u=>{if(!i()||u.getAttribute("cloned"))return;const h=u.cloneNode(!0);h.setAttribute("cloned",!0),h.style.top=0,h.style.left=0,h.style.width=u.getAttribute("width"),h.style.height=u.getAttribute("height"),h.style.position="absolute",h.style.animation=i(),d.target.appendChild(h),h.addEventListener("animationend",()=>h.parentNode.removeChild(h))}),[...d.addedNodes].forEach(u=>{if(u.getAttribute("cloned"))return;p.style.position="relative";const h=u.getBoundingClientRect();if(u.setAttribute("width",h.width+"px"),u.setAttribute("height",h.height+"px"),r()){u.style.animation=r();const v=()=>{u.removeEventListener("animationend",v),u.style.animation=""};u.addEventListener("animationend",v)}})},...c},l)}}function q(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...i){let[{color:r,variant:c,size:l="md",disabled:d,href:p,...u},...h]=Y(i);return(p?n.tags.a:n.tags.button)({...u,class:A("button",a.root,c,l,r,p?a.a:a.button,d&&a.disabled,t==null?void 0:t.class,u.class),disabled:d,href:p,...!p&&{type:"button"}},h)}}const oe=["neutral","primary","success","danger","warning"],qn=["plain","outline","solid"],Jn=["sm","md","lg"],Qn="light",eo=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Ve(e,t){const{bau:n,css:o,window:a}=e,{input:s}=n.tags,i=d=>{a.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?i(c):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Qn);const l=o`
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
    ${eo()}
  `;return function(...p){let[{color:u,variant:h="outline",size:v="md",...w},...g]=Y(p);return s({required:"required",title:"Switch Theme",...w,class:A("theme-switch",u,h,v,l,t==null?void 0:t.class,w.class),type:"checkbox",checked:r()=="dark",onclick:y=>{i(y.target.checked?"dark":"light")}},...g)}}function to(e){const{tr:t,bau:n,css:o,config:a,states:s}=e,{i,header:r,h1:c,div:l,a:d,img:p,b:u,ul:h,li:v}=n.tags,{svg:w,path:g}=n.tagsNS("http://www.w3.org/2000/svg"),y=s.drawerOpen,E=q(e,{class:o`
      background: transparent;
    `}),k=Ve(e),N=()=>i(w({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},g({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),R=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},N()),d({href:`${a.base}/`,class:o`
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
        `},R(),B())}}function no({tr:e,bau:t,css:n}){const{section:o,footer:a,span:s,a:i,ul:r,li:c,p:l,div:d,h1:p}=t.tags,u=({links:w,title:g})=>o({class:n`
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
        `},p(g),r(w.map(({href:y,name:E})=>c(i({href:y},E))))),h=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],v=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},s("v0.42.0"),s("MIT license")))}}function we(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d,...p},...u]=Y(r);return a({...p,class:A("list",s,c,l,d,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Te="0.3s",vt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,s=structuredClone(a);return s.children=o==null?void 0:o.map(vt({parent:n,grandParent:e})),e&&(e.parentTree=t),s.parentTree=e,s},xt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=xt(e)(t.children[o]);if(a)return a}},oo=({keyframes:e})=>({hideToLeft:e`
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
   `});function We(e,t={}){const{bau:n,css:o,window:a,config:s}=e,{base:i="",hashBased:r=!1}=t,c=`${s.base}${i}`,l=z=>{var G;return((G=z.parentTree.data)==null?void 0:G.href)??z.parentTree.children[0].data.href},d=({variant:z,color:G,size:U,currentTree:f,data:m})=>k(M({variant:z,color:G,size:U,href:`${c}${l(f)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),M({variant:z,color:G,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:z,subTree:{data:{name:G,href:U},children:f=[]}})=>M({size:z,href:`${c}${U}`,"data-ischild":!f.length},G),u=({pathname:z,subTree:G})=>{var U;return z===((U=G==null?void 0:G.data)==null?void 0:U.href)},{renderHeader:h=d,renderMenuItem:v=p,isActive:w=u}=t,{li:g,nav:y,div:E,header:k,a:N}=n.tags,R=De(e),B=we(e),M=q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:P,hideToRight:D}=oo(e),j=o`
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
  `,K=({variant:z,color:G,size:U,currentTree:f,pathnameState:m})=>{const{children:b,parentTree:x,data:C}=f;return E({class:A("drillDownMenu",z,G,U)},x&&h({variant:z,color:G,size:U,data:C,currentTree:f}),b&&B({class:A(z,G,U)},b.map(O=>g({class:()=>A(O.children&&"has-children",w({pathname:m.val,subTree:O})&&"active")},v({variant:z,color:G,size:U,subTree:O})))))},Q=({tree:z,pathname:G})=>{let U=vt({})(structuredClone(z)),f=xt(G)(U);return f||(console.error("drilldown no sub tree",G),f=U),f};return function(G){const{variant:U="plain",color:f="neutral",size:m="md",tree:b,...x}=G,C=n.state(a.location.pathname.replace(c,"")),O=n.derive(()=>Q({tree:b,pathname:C.val}));a.document.addEventListener("click",F=>{const{target:J}=F,ee=J.getAttribute("href");if(J.tagName==="A"&&ee&&!ee.startsWith("http")){let ae=ee.replace(c,"");r||(ae=ae.replace(J.hash,"")),C.val=ae}});let $=1;const V=F=>{const{dataset:J}=F.target;J.buttonback=="true"?$=-1:J.ischild=="false"?$=1:J.ischild=="true"&&($=0)},_=F=>{switch(F){case 1:return`${P} ${Te}`;case-1:return`${D} ${Te}`;default:return""}},I=F=>{switch(F){case 1:return`${D} ${Te} reverse`;case-1:return`${P} ${Te} reverse`;default:return""}};return y({class:A(j,t==null?void 0:t.class,x.class),onclick:V},R({animationHide:()=>_($),animationShow:()=>I($)},()=>K({variant:U,color:f,size:m,currentTree:O.val,pathnameState:C})))}}const ao={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function wt(e){const{tr:t,bau:n,css:o,config:a,states:s,window:i}=e,{div:r,ul:c,li:l,nav:d,a:p,span:u}=n.tags;let h=!1;const v=We(e);return function(){return r({bauMounted:({element:g})=>{i.innerWidth<=640&&(h=!0,s.drawerOpen.val=!1)},onclick:g=>{h&&!g.target.dataset.buttonback&&!g.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:A(o`
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
          `)},v({tree:ao}))}}const ro=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:s}=t.tags,i=De(e),r=to(e),c=wt(e),l=no(e),d=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(u="")=>`${d} ease-in-out 0.5s ${u}`;return function({componentState:h}){return s({class:n`
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
        `},r(),c(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>h.val&&h.val({})),l())}};function Ie(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c="md",variant:l="outline",color:d="neutral",onclick:p,...u},...h]=Y(r);return a({...u,onclick:p,class:A("chip",s,c,l,d,p&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}function so(e){const{bau:t,css:n,config:o}=e,{div:a,h1:s,h2:i,p:r}=t.tags;q(e);const c=n`
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
  `;return function({name:d,text:p,tagLine:u}){return a({class:c},s(d),i(p),r(u))}}function io(e){const{bau:t,css:n}=e,{div:o,h1:a,p:s}=t.tags,i=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),s(l()));return function({featuresContent:l}){return o({class:i},l.map(r))}}function co({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:s,dd:i,div:r,aside:c,footer:l,a:d}=t.tags,p=({maxSize:u=151})=>({libName:h,size:v})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},s({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},h),i({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",d({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function lo(e){const{bau:t,css:n,config:o}=e,{div:a,p:s,a:i,section:r}=t.tags,c=so(e),l=io(e),d=q(e);Ie(e);const p=co(e),u=(...y)=>a({class:n`
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
          `},...y)),h=n``,v=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],w=[{title:"UI components for the web",Content:()=>[s("Over 25 components such as button, input, tabs, autocomplete etc ..."),d({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),u(d({variant:"solid",color:"primary"},"solid"),d({variant:"outline",color:"primary"},"outline"),d({variant:"plain",color:"primary"},"plain")),u(d({variant:"solid",color:"neutral",size:"sm"},"neutral"),d({variant:"solid",color:"primary",size:"sm"},"primary"),d({variant:"solid",color:"danger",size:"sm"},"danger"),d({variant:"solid",color:"warning",size:"sm"},"warning")),u(d({variant:"outline",color:"primary",size:"sm"},"small"),d({variant:"outline",color:"primary",size:"md"},"medium"),d({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[s("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]}],g=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},d({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),d({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),d({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:h},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:w}),p({data:v}),g())}}function uo(e,t={}){const{bau:n,css:o}=e,{div:a,form:s,span:i,pre:r,h3:c,h4:l}=n.tags;return function(p,...u){return a("Login")}}const po=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:s,h2:i}=n.tags,r=uo(e);return()=>o({id:"login"},i(t("Login Examples")),s("Basic"),a(r()))};function mo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:s,h1:i}=n.tags;return function(){return a({class:o`
          grid-area: main;
          display: flex;
        `},s({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},i(t("Pages Examples")),po(e)()))}}function bo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function yt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&yt(n)}),e}class ct{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ct(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const ho="</span>",lt=e=>!!e.scope,go=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class fo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ct(t)}openNode(t){if(!lt(t))return;const n=go(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){lt(t)&&(this.buffer+=ho)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const ut=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ze{constructor(){this.rootNode=ut(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=ut({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ze._collapse(n)}))}}class vo extends Ze{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new fo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function Et(e){return de("(?=",e,")")}function xo(e){return de("(?:",e,")*")}function wo(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function yo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Xe(...e){return"("+(yo(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function St(e){return new RegExp(e.toString()+"|").exec("").length-1}function Co(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Eo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ke(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let s=ve(o),i="";for(;s.length>0;){const r=Eo.exec(s);if(!r){i+=s;break}i+=s.substring(0,r.index),s=s.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?i+="\\"+String(Number(r[1])+a):(i+=r[0],r[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(t)}const So=/\b\B/,kt="[a-zA-Z]\\w*",Ye="[a-zA-Z_]\\w*",Tt="\\b\\d+(\\.\\d+)?",At="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Mt="\\b(0b[01]+)",ko="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",To=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},Ao={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Mo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Do={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},$e=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Xe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Io=$e("//","$"),$o=$e("/\\*","\\*/"),No=$e("#","$"),_o={scope:"number",begin:Tt,relevance:0},Bo={scope:"number",begin:At,relevance:0},Oo={scope:"number",begin:Mt,relevance:0},Ro={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Po={scope:"title",begin:kt,relevance:0},Lo={scope:"title",begin:Ye,relevance:0},jo={begin:"\\.\\s*"+Ye,relevance:0},zo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ae=Object.freeze({__proto__:null,MATCH_NOTHING_RE:So,IDENT_RE:kt,UNDERSCORE_IDENT_RE:Ye,NUMBER_RE:Tt,C_NUMBER_RE:At,BINARY_NUMBER_RE:Mt,RE_STARTERS_RE:ko,SHEBANG:To,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:Ao,QUOTE_STRING_MODE:Mo,PHRASAL_WORDS_MODE:Do,COMMENT:$e,C_LINE_COMMENT_MODE:Io,C_BLOCK_COMMENT_MODE:$o,HASH_COMMENT_MODE:No,NUMBER_MODE:_o,C_NUMBER_MODE:Bo,BINARY_NUMBER_MODE:Oo,REGEXP_MODE:Ro,TITLE_MODE:Po,UNDERSCORE_TITLE_MODE:Lo,METHOD_GUARD:jo,END_SAME_AS_BEGIN:zo});function Ho(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Uo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Go(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Ho,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Fo(e,t){Array.isArray(e.illegal)&&(e.illegal=Xe(...e.illegal))}function Vo(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Wo(e,t){e.relevance===void 0&&(e.relevance=1)}const Zo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Et(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Xo=["of","and","for","in","not","or","if","then","parent","list","value"],Ko="keyword";function Dt(e,t,n=Ko){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(s){Object.assign(o,Dt(e[s],t,s))}),o;function a(s,i){t&&(i=i.map(r=>r.toLowerCase())),i.forEach(function(r){const c=r.split("|");o[c[0]]=[s,Yo(c[0],c[1])]})}}function Yo(e,t){return t?Number(t):qo(e)?0:1}function qo(e){return Xo.includes(e.toLowerCase())}const dt={},ue=e=>{console.error(e)},pt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{dt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),dt[`${e}/${t}`]=!0)},Me=new Error;function It(e,t,{key:n}){let o=0;const a=e[n],s={},i={};for(let r=1;r<=t.length;r++)i[r+o]=a[r],s[r+o]=!0,o+=St(t[r-1]);e[n]=i,e[n]._emit=s,e[n]._multi=!0}function Jo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Me;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Me;It(e,e.begin,{key:"beginScope"}),e.begin=Ke(e.begin,{joinWith:""})}}function Qo(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Me;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Me;It(e,e.end,{key:"endScope"}),e.end=Ke(e.end,{joinWith:""})}}function ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ta(e){ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Jo(e),Qo(e)}function na(e){function t(i,r){return new RegExp(ve(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=St(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(Ke(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,u)=>u>0&&p!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(i){const r=new o;return i.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&r.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&r.addRule(i.illegal,{type:"illegal"}),r}function s(i,r){const c=i;if(i.isCompiled)return c;[Uo,Vo,ta,Zo].forEach(d=>d(i,r)),e.compilerExtensions.forEach(d=>d(i,r)),i.__beforeBegin=null,[Go,Fo,Wo].forEach(d=>d(i,r)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Dt(i.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(i.begin||(i.begin=/\B|\b/),c.beginRe=t(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",i.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(c.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(d){return oa(d==="self"?i:d)})),i.contains.forEach(function(d){s(d,c)}),i.starts&&s(i.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),s(e)}function $t(e){return e?e.endsWithParent||$t(e.starts):!1}function oa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:$t(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var aa="11.8.0";class ra extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ue=Ct,mt=ie,bt=Symbol("nomatch"),sa=7,Nt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:vo};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const x=r.languageDetectRe.exec(b);if(x){const C=D(x[1]);return C||(pt(s.replace("{}",x[1])),pt("Falling back to no-highlight mode for this block.",m)),C?x[1]:"no-highlight"}return b.split(/\s+/).find(C=>c(C)||D(C))}function d(m,b,x){let C="",O="";typeof b=="object"?(C=m,x=b.ignoreIllegals,O=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),O=m,C=b),x===void 0&&(x=!0);const $={code:C,language:O};U("before:highlight",$);const V=$.result?$.result:p($.language,$.code,x);return V.code=$.code,U("after:highlight",V),V}function p(m,b,x,C){const O=Object.create(null);function $(S,T){return S.keywords[T]}function V(){if(!L.keywords){te.addText(X);return}let S=0;L.keywordPatternRe.lastIndex=0;let T=L.keywordPatternRe.exec(X),H="";for(;T;){H+=X.substring(S,T.index);const Z=re.case_insensitive?T[0].toLowerCase():T[0],ne=$(L,Z);if(ne){const[se,An]=ne;if(te.addText(H),H="",O[Z]=(O[Z]||0)+1,O[Z]<=sa&&(Se+=An),se.startsWith("_"))H+=T[0];else{const Mn=re.classNameAliases[se]||se;F(T[0],Mn)}}else H+=T[0];S=L.keywordPatternRe.lastIndex,T=L.keywordPatternRe.exec(X)}H+=X.substring(S),te.addText(H)}function _(){if(X==="")return;let S=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){te.addText(X);return}S=p(L.subLanguage,X,!0,ot[L.subLanguage]),ot[L.subLanguage]=S._top}else S=h(X,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Se+=S.relevance),te.__addSublanguage(S._emitter,S.language)}function I(){L.subLanguage!=null?_():V(),X=""}function F(S,T){S!==""&&(te.startScope(T),te.addText(S),te.endScope())}function J(S,T){let H=1;const Z=T.length-1;for(;H<=Z;){if(!S._emit[H]){H++;continue}const ne=re.classNameAliases[S[H]]||S[H],se=T[H];ne?F(se,ne):(X=se,V(),X=""),H++}}function ee(S,T){return S.scope&&typeof S.scope=="string"&&te.openNode(re.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(F(X,re.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),X=""):S.beginScope._multi&&(J(S.beginScope,T),X="")),L=Object.create(S,{parent:{value:L}}),L}function ae(S,T,H){let Z=Co(S.endRe,H);if(Z){if(S["on:end"]){const ne=new ct(S);S["on:end"](T,ne),ne.isMatchIgnored&&(Z=!1)}if(Z){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return ae(S.parent,T,H)}function Re(S){return L.matcher.regexIndex===0?(X+=S[0],1):(je=!0,0)}function En(S){const T=S[0],H=S.rule,Z=new ct(H),ne=[H.__beforeBegin,H["on:begin"]];for(const se of ne)if(se&&(se(S,Z),Z.isMatchIgnored))return Re(T);return H.skip?X+=T:(H.excludeBegin&&(X+=T),I(),!H.returnBegin&&!H.excludeBegin&&(X=T)),ee(H,S),H.returnBegin?0:T.length}function Sn(S){const T=S[0],H=b.substring(S.index),Z=ae(L,S,H);if(!Z)return bt;const ne=L;L.endScope&&L.endScope._wrap?(I(),F(T,L.endScope._wrap)):L.endScope&&L.endScope._multi?(I(),J(L.endScope,S)):ne.skip?X+=T:(ne.returnEnd||ne.excludeEnd||(X+=T),I(),ne.excludeEnd&&(X=T));do L.scope&&te.closeNode(),!L.skip&&!L.subLanguage&&(Se+=L.relevance),L=L.parent;while(L!==Z.parent);return Z.starts&&ee(Z.starts,S),ne.returnEnd?0:T.length}function kn(){const S=[];for(let T=L;T!==re;T=T.parent)T.scope&&S.unshift(T.scope);S.forEach(T=>te.openNode(T))}let Ee={};function nt(S,T){const H=T&&T[0];if(X+=S,H==null)return I(),0;if(Ee.type==="begin"&&T.type==="end"&&Ee.index===T.index&&H===""){if(X+=b.slice(T.index,T.index+1),!a){const Z=new Error(`0 width match regex (${m})`);throw Z.languageName=m,Z.badRule=Ee.rule,Z}return 1}if(Ee=T,T.type==="begin")return En(T);if(T.type==="illegal"&&!x){const Z=new Error('Illegal lexeme "'+H+'" for mode "'+(L.scope||"<unnamed>")+'"');throw Z.mode=L,Z}else if(T.type==="end"){const Z=Sn(T);if(Z!==bt)return Z}if(T.type==="illegal"&&H==="")return 1;if(Le>1e5&&Le>T.index*3)throw new Error("potential infinite loop, way more iterations than matches");return X+=H,H.length}const re=D(m);if(!re)throw ue(s.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Tn=na(re);let Pe="",L=C||Tn;const ot={},te=new r.__emitter(r);kn();let X="",Se=0,ce=0,Le=0,je=!1;try{if(re.__emitTokens)re.__emitTokens(b,te);else{for(L.matcher.considerAll();;){Le++,je?je=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const S=L.matcher.exec(b);if(!S)break;const T=b.substring(ce,S.index),H=nt(T,S);ce=S.index+H}nt(b.substring(ce))}return te.finalize(),Pe=te.toHTML(),{language:m,value:Pe,relevance:Se,illegal:!1,_emitter:te,_top:L}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:m,value:Ue(b),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:ce,context:b.slice(ce-100,ce+100),mode:S.mode,resultSoFar:Pe},_emitter:te};if(a)return{language:m,value:Ue(b),illegal:!1,relevance:0,errorRaised:S,_emitter:te,_top:L};throw S}}function u(m){const b={value:Ue(m),illegal:!1,relevance:0,_top:i,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function h(m,b){b=b||r.languages||Object.keys(t);const x=u(m),C=b.filter(D).filter(K).map(I=>p(I,m,!1));C.unshift(x);const O=C.sort((I,F)=>{if(I.relevance!==F.relevance)return F.relevance-I.relevance;if(I.language&&F.language){if(D(I.language).supersetOf===F.language)return 1;if(D(F.language).supersetOf===I.language)return-1}return 0}),[$,V]=O,_=$;return _.secondBest=V,_}function v(m,b,x){const C=b&&n[b]||x;m.classList.add("hljs"),m.classList.add(`language-${C}`)}function w(m){let b=null;const x=l(m);if(c(x))return;if(U("before:highlightElement",{el:m,language:x}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new ra("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const C=b.textContent,O=x?d(C,{language:x,ignoreIllegals:!0}):h(C);m.innerHTML=O.value,v(m,x,O.language),m.result={language:O.language,re:O.relevance,relevance:O.relevance},O.secondBest&&(m.secondBest={language:O.secondBest.language,relevance:O.secondBest.relevance}),U("after:highlightElement",{el:m,result:O,text:C})}function g(m){r=mt(r,m)}const y=()=>{N(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){N(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function N(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(r.cssSelector).forEach(w)}function R(){k&&N()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",R,!1);function B(m,b){let x=null;try{x=b(e)}catch(C){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(C);else throw C;x=i}x.name||(x.name=m),t[m]=x,x.rawDefinition=b.bind(null,e),x.aliases&&j(x.aliases,{languageName:m})}function M(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function P(){return Object.keys(t)}function D(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function j(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=b})}function K(m){const b=D(m);return b&&!b.disableAutodetect}function Q(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function z(m){Q(m),o.push(m)}function G(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function U(m,b){const x=m;o.forEach(function(C){C[x]&&C[x](b)})}function f(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),w(m)}Object.assign(e,{highlight:d,highlightAuto:h,highlightAll:N,highlightElement:w,highlightBlock:f,configure:g,initHighlighting:y,initHighlightingOnLoad:E,registerLanguage:B,unregisterLanguage:M,listLanguages:P,getLanguage:D,registerAliases:j,autoDetection:K,inherit:mt,addPlugin:z,removePlugin:G}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=aa,e.regex={concat:de,lookahead:Et,either:Xe,optional:wo,anyNumberOfTimes:xo};for(const m in Ae)typeof Ae[m]=="object"&&yt(Ae[m]);return Object.assign(e,Ae),e},be=Nt({});be.newInstance=()=>Nt({});var ia=be;be.HighlightJS=be;be.default=be;const fe=bo(ia),ht="[A-Za-z$_][0-9A-Za-z$_]*",ca=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],la=["true","false","null","undefined","NaN","Infinity"],_t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Bt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ot=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ua=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],da=[].concat(Ot,_t,Bt);function Rt(e){const t=e.regex,n=(b,{after:x})=>{const C="</"+b[0].slice(1);return b.input.indexOf(C,x)!==-1},o=ht,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const C=b[0].length+b.index,O=b.input[C];if(O==="<"||O===","){x.ignoreMatch();return}O===">"&&(n(b,{after:C})||x.ignoreMatch());let $;const V=b.input.substring(C);if($=V.match(/^\s*=/)){x.ignoreMatch();return}if(($=V.match(/^\s+extends\s+/))&&$.index===0){x.ignoreMatch();return}}},r={$pattern:ht,keyword:ca,literal:la,built_in:da,"variable.language":ua},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},h={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},v={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},w={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,w,g,{match:/\$\d+/},p];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(k)});const N=[].concat(E,u.contains),R=N.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(N)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:R},M={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},P={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[..._t,...Bt]}},D={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},j={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},K={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(b){return t.concat("(?!",b.join("|"),")")}const z={match:t.concat(/\b/,Q([...Ot,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},G={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},f="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(f)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:R,CLASS_REFERENCE:P},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),D,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,h,v,w,g,E,{match:/\$\d+/},p,P,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:f,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:R}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},j,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},G,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},z,K,M,U,{match:/\$[(.]/}]}}function pa(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const ma=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",Rt),fe.registerLanguage("sh",pa),function({text:i,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=fe.highlight(i,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function ba(e){const{bau:t,css:n}=e,{article:o,h1:a,p:s,code:i,a:r,ul:c,li:l}=t.tags,d=ma(e);return function(){return o({class:n`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},a("Getting Started"),s("Grab the source code template for Javascript or Typescript"),d({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),s("Install the dependencies with the package manager of your choice:"),d({text:`cd my-bau-project
npm install`}),s("This template project is built with Vite. To start a development server:"),d({text:"npm run dev"}),s("The application starting point is at ",i("src/main.ts")),s("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),d({text:'import button from "@grucloud/bau-ui/button";'}),s("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),d({text:"const Button = button(context);"}),s("Last step is to place the button into the tree of component:"),d({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),s("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),s("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ne(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...p},...u]=Y(r);return a({...p,class:A("paper",d,s,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Pt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:s,tr:i,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:u}){return o({class:n`
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
        `},a(c(i(l(u??""),oe.map(h=>l(h)))),s(qn.map(h=>i(l(h),oe.map((v,w)=>r(p({color:v,variant:h},{index:w}))))))))}},ha=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:s}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Jn.map((i,r)=>s({color:"success",variant:"outline",size:i},{index:r})))}},W=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:s,p:i,h2:r,h3:c,pre:l,code:d}=t.tags;fe.registerLanguage("javascript",Rt);const p=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),u=Pt(e),h=ha(e),v=({text:w})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:g})=>{g.innerHTML=fe.highlight(w,{language:"js"}).value}}));return function(g){return o({class:n``},s(g.title),i(g.description),g.gridItem&&[r("Variant/Color"),!g.variantColorTableDisable&&g.gridItem&&p(u({Item:g.gridItem(e)})),r("Size"),i("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),g.gridItem&&p(h({Item:g.gridItem(e)}))],r("Usage"),c("Import"),v({text:g.importStatement}),r("Examples"),g.examples.map(y=>a(s(y.title),i(y.description),p(y.createComponent(e)()),v({text:y.code}))))}},ga=()=>oe.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{div:a,ul:s,li:i,header:r,h3:c,button:l}=n.tags,d=n.state(""),p=v=>w=>{d.val==v?d.val="":d.val=v},u=({element:v,open:w})=>{const g=()=>{v.removeEventListener("transitionend",g)};function y(k){k.addEventListener("transitionend",g),window.requestAnimationFrame(()=>{k.style.height="0px"})}function E(k){k.addEventListener("transitionend",g),k.style.height=k.scrollHeight+"px"}v.scrollHeight!=0&&(w?E(v):y(v))},h=o`
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
    ${ga()}
  `;return function(...w){let[{color:g,variant:y="outline",size:E="md",data:k=[],...N},...R]=Y(w);const B=M=>{const{Header:P,Content:D,name:j}=M;return i({class:A(g,y,E),onclick:p(j)},c({class:()=>A(d.val==j&&"active")},l({type:"button","aria-controls":`bau-${j}`,"aria-expanded":({element:K})=>d.val==j},P(M))),a({class:"content",role:"region",id:`bau-${j}`,"data-state":({element:K})=>{const Q=d.val==j;return u({element:K,open:Q}),Q}},D(M)))};return a({class:A("accordion",h,t==null?void 0:t.class,N.class)},s(k.map(B)))}}const Lt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],s=_e(e);return i=>s({...i,data:a})},fa=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],s=_e(e);return()=>s({data:a,color:"neutral",variant:"outline"})},va=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,jt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},xa=e=>{const{css:t}=e,n=jt(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},wa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,ya=e=>{const{css:t}=e,n=jt(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ca=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ea={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:va,createComponent:fa},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:wa,createComponent:xa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ca,createComponent:ya}],gridItem:Lt},Sa=e=>{const t=W(e);return()=>t(Ea)},ka={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ta=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Aa=()=>oe.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Be(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:s,i}=n.tags;Ta({css:o,createGlobalStyles:a});const r=o`
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
    ${Aa()}
  `,c=q(e),l=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(p,...u){const{variant:h="outline",color:v="neutral",size:w="md",onRemove:g,...y}=p;return s({...y,class:A(`alert-${h}`,h,v,w,r,t==null?void 0:t.class,p.class,"alert"),role:"alert"},i({class:"icon"},ka[v]),s({class:"content"},...u),g&&l({onclick:g}))}}const zt=e=>{const t=Be(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Ma=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Be(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Da=`import alert from "@grucloud/bau-ui/alert";
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
`,Ia=e=>{const{css:t}=e,n=Be(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},$a=`import alert from "@grucloud/bau-ui/alert";
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
`,Na={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Da,createComponent:Ma},{title:"Custom Alert ",description:"A custom alert.",code:$a,createComponent:Ia}],gridItem:zt},_a=e=>{const t=W(e);return()=>t(Na)},Ba=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:s=10,deleteAfterDuration:i=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:u,status:h})=>{const v=c.val.findIndex(w=>w.id===u);v!=-1&&(c.val[v].status=h)};return function(h={},...v){const w=({id:E})=>{p({id:E,status:"removing"});const k=c.val.findIndex(N=>N.id===E);k!=-1&&c.val.splice(k,1)},g=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=s&&w({id:c.val[0].id}),c.val.push(k),setTimeout(()=>w(k),i)},y=E=>r({class:d.item,onclick:()=>w(E)},E.Component());return document.addEventListener("alert.add",E=>g(E.detail)),document.addEventListener("alert.remove",E=>w(E.detail)),r({class:A(d.stack,t==null?void 0:t.class,h.class)},n.loop(c,r(),y))}},Oa=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Ba(e,{deleteAfterDuration:2e4}),s=q(e),i=Be(e);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Ra=`import { Context } from "@grucloud/bau-ui/context";
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
`,Pa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ra,createComponent:Oa}]},La=e=>{const t=W(e);return()=>t(Pa)},ja=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,s=De(e),i=q(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(i({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),s({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},za=`import animate from "@grucloud/bau-ui/animate";
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
`,Ha=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:s,label:i}=t.tags,r=De(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),d=({target:u})=>l.val=u.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",s({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:d})),i("Two",s({type:"radio",id:"two",name:"radio",value:l,oninput:d})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Ua=`import animate from "@grucloud/bau-ui/animate";
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
`,Ga={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:za,createComponent:ja},{title:"Component hide and show",description:"Hide and show a component",code:Ua,createComponent:Ha}]},Fa=e=>{const t=W(e);return()=>t(Ga)};function Ht(e,t){const{bau:n,css:o}=e,{span:a,img:s}=n.tags,i=n.state(!0),r=n.state(!1),c=()=>i.val=!1,l=p=>{i.val=!1,r.val=!0},d=o`
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
  `;return function(...u){let[{color:h,variant:v="outline",size:w="md",width:g=30,height:y=30,...E},...k]=Y(u);return a({class:A(d,t==null?void 0:t.class,E.class)},()=>i.val?"Loading...":"",()=>r.val&&"Error",s({width:g,height:y,onload:c,onerror:l,class:A(h,v,w,d,t==null?void 0:t.class,E.class),...E}))}}const Ut=e=>{const{css:t}=e,n=Ht(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Va=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Ht(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Wa=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Za={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Wa,createComponent:Va}],gridItem:Ut},Xa=e=>{const t=W(e);return()=>t(Za)};function qe(e,t){const{bau:n,css:o,window:a}=e,{dialog:s}=n.tags,i=Ne(e,{class:o`
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
  `;return function(...l){let[{contentEl:d,triggerEl:p,onClose:u,...h},...v]=Y(l);const w=E=>{y.style.opacity=1,y.showModal();const k=p.getBoundingClientRect(),N=y.getBoundingClientRect();k.x<a.innerWidth/2?y.style.left=k.left+"px":y.style.left=k.right-N.width+"px",k.y<a.innerHeight/2?y.style.top=k.top+k.height+"px":y.style.top=k.top-N.height+"px"},g=E=>{const k=()=>{y.close(),y.removeEventListener("transitionend",k)};y.addEventListener("transitionend",k),y.style.opacity=0},y=s({role:"presentation",class:A("popover",r,t==null?void 0:t.class,h==null?void 0:h.class),onclick:E=>E.target===y&&(g(),u==null?void 0:u.call())},i(d));return y.closeDialog=g,y.openDialog=w,y}}const Ka=()=>oe.map(e=>`
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
`);function Je(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
    ${Ka()}
  `;return function(r){const{size:c="md",variant:l="outline",color:d="neutral",name:p,id:u,disabled:h,...v}=r;return a({...v,class:A("input",c,d,l,s,t==null?void 0:t.class,v.class)})}}const Ya=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Gt(e,t){const{bau:n,css:o}=e,{div:a,li:s}=n.tags,i=qe(e),r=q(e),c=Je(e),l=we(e),d=o`
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

    ${Ya()}
  `,p=n.state(""),u=n.state(""),h=n.state(!1),v=n.state(0),w=()=>{h.val=!1};return function(...y){let[{variant:E="outline",color:k,size:N="md",id:R,label:B,placeholder:M,Option:P,options:D,getOptionLabel:j=({label:_})=>_,...K},...Q]=Y(y);const z=n.state(D),G=()=>{V.openDialog(),h.val=!0,u.val="",z.val=D},U=()=>{V.closeDialog(),h.val=!1,u.val=""},f=_=>{const{value:I}=_.target;u.val=I,I?z.val=D.filter(F=>j(F).match(new RegExp(`${I}`,"i"))):z.val=D},m=_=>{h.val?U():G()},b=({option:_,index:I})=>F=>{p.val=j(_),v.val=I,U()},x=_=>{switch(console.log("onkeydown",_.key,v.val),_.key){case"Escape":U();break;case"ArrowDown":v.val<z.val.length-1?v.val++:v.val=0;break;case"ArrowUp":v.val<=0?v.val=z.val.length-1:v.val--;break;case"Enter":p.val=j(z.val[v.val]),u.val="",U();break}},C=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,"aria-label":B,onclick:m,variant:E,color:k,size:N},()=>!p.val&&B,p),O=c({id:R,value:u,placeholder:M,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:f,onkeydown:x,variant:E,color:k,size:N}),V=i({id:R,triggerEl:C,contentEl:(()=>a({class:A(E,k,N,"content")},O,()=>l({class:A(E,k,N)},z.val.map((_,I)=>s({class:()=>A(v.val==I&&"active"),onclick:b({option:_,index:I})},P(_))))))(),onClose:w});return a({...K,class:A("autocomplete",d,t==null?void 0:t.class,K==null?void 0:K.class)},C,V)}}const Ft=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,s=Gt(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>s({...c,options:i,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},qa=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=Gt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return()=>o(i({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Ja=`import { Context } from "@grucloud/bau-ui/context";
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
`,Qa={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:Ja,createComponent:qa}],gridItem:Ft},er=e=>{const t=W(e);return()=>t(Qa)};function Vt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",content:p,...u},...h]=Y(r);return a({...u,class:A("badge",s,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:A(c,l,d)},p),...h)}}const Wt=e=>{const t=Vt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},tr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Vt(e);return()=>n(o({content:"10"},"☏"))},nr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,or={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:nr,createComponent:tr}],gridItem:Wt},ar=e=>{const t=W(e);return()=>t(or)};function Zt(e,t){const{bau:n,css:o}=e,{ul:a,li:s,span:i}=n.tags,r=q(e),c=o`
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
  `;return function(...d){let[{color:p="neutral",variant:u="plain",size:h="md",items:v,...w},...g]=Y(d);return a({...w,class:A(c,t==null?void 0:t.class,w==null?void 0:w.class)},v.map(({href:y,name:E})=>s((y?r:i)({href:y,color:p,variant:u,size:h,class:A(p,u,h)},E))))}}const Xt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Zt(e);return o=>n({...o,...t})},rr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Zt(e);return()=>n(a(o))},sr=`import breadcrumbs, {
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
`,ir={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:sr,createComponent:rr}],gridItem:Xt},cr=e=>{const t=W(e);return()=>t(ir)},Kt=e=>{const t=q(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},lr=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},ur=`import button from "@grucloud/bau-ui/button";
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
`,dr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:ur,createComponent:lr}],gridItem:Kt},pr=e=>{const t=W(e);return()=>t(dr)},mr=()=>oe.map(e=>`
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
`);function Qe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
    ${mr()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:d,...p},...u]=Y(r);return a({...p,class:A("button-group",c,d,l,s,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Yt=e=>{const t=["ONE","TWO","THREE"],n=q(e),o=Qe(e);return a=>o({...a},t.map(s=>n(a,s)))},br=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=q(e),s=Qe(e),i="primary",r="solid";return()=>n(s({color:i,variant:r},o.map(c=>a({color:i,variant:r},c))))},hr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,gr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:hr,createComponent:br}],gridItem:Yt},fr=e=>{const t=W(e);return()=>t(gr)};function qt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:p,...u},...h]=Y(c);return a({...u,type:"date",class:A("calendar",i,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Jt=e=>{const t=qt(e);return n=>t({...n})},vr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),s=qt(e);return()=>n(o("Start date:",s({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},xr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,wr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:xr,createComponent:vr}],gridItem:Jt},yr=e=>{const t=W(e);return()=>t(wr)},Qt=e=>{const t=Ie(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Cr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Er=`import chip from "@grucloud/bau-ui/chip";
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
`,Sr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Er,createComponent:Cr}],gridItem:Qt},kr=e=>{const t=W(e);return()=>t(Sr)};function en(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...p},...u]=Y(r);return a({type:"checkbox",required:"required",...p,class:A(s,c,l,d,t==null?void 0:t.class,p==null?void 0:p.class)})}}const tn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=en(e);return s=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,a({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},Tr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,s=en(e),i=t.state(!1),r=c=>{i.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",s({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:i,onchange:r})))},Ar=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Mr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Ar,createComponent:Tr}],gridItem:tn},Dr=e=>{const t=W(e);return()=>t(Mr)};function Ir(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d,openState:p,...u},...h]=Y(r);return a({class:A(s,t==null?void 0:t.class,u.class)},a({class:()=>A("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>A("content",p.val&&"content-open")},h))}}const $r=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),s=Ir(e),i=q(e),r=wt(e);return()=>n(o("Click on the button to open and close the drawer."),i({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},r()))},Nr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,_r={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Nr,createComponent:$r}]},Br=e=>{const t=W(e);return()=>t(_r)},nn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=We(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Or=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=We(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Rr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Pr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Rr,createComponent:Or}],gridItem:e=>nn(e,{base:"/components/drillDownMenu",hashBased:!0})},Lr=e=>{const t=W(e);return()=>t(Pr)};function on(e,t){const{bau:n,css:o}=e,{div:a,span:s,label:i,input:r}=n.tags,c={base:o`
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
    `};return function(d,...p){const{variant:u="outline",color:h="neutral",size:v="md",Component:w,disabled:g,...y}=d;return a({class:A(c.base,g&&c.disabled,t==null?void 0:t.class,d.class)},i({class:A(u,h,v)},w({disabled:g}),r({type:"file",disabled:g,...y})),s({class:"filename-display"}))}}const an=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),d=on(e),p=h=>{const v=h.target.files[0];v?l.val=v.name:l.val="No file selected"},u=({disabled:h})=>r({class:A(o`
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
            `)},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return h=>d({Component:u,name:"file",accept:"text/*",onchange:p,...h})},jr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,d=n.state("No file selected"),p=on(e),u=v=>{const w=v.target.files[0];w?d.val=w.name:d.val="No file selected"},h=({disabled:v})=>c({class:A(o`
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
            `)},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:h,name:"file",accept:"text/*",onchange:u}),c("File selected: ",d))},zr=`import classNames from "@grucloud/bau-css/classNames";
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
`,Hr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:zr,createComponent:jr}],gridItem:an},Ur=e=>{const t=W(e);return()=>t(Hr)},rn=e=>{const t=Je(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},Gr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Je(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},Fr=`import input from "@grucloud/bau-ui/input";
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
`,Vr={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Fr,createComponent:Gr}],gridItem:rn},Wr=e=>{const t=W(e);return()=>t(Vr)},Zr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Xr=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,s=we(e),i=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>s({...r},Zr.map(i))},Kr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Yr=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:s}=t.tags,i=we(e),r=({code:c,label:l})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(i({variant:"outline",color:"primary"},Kr.map(r)))},qr=`import list from "@grucloud/bau-ui/list";
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
`,Jr={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:qr,createComponent:Yr}],gridItem:Xr},Qr=e=>{const t=W(e);return()=>t(Jr)};function sn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,i=o`
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
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p="md",...u},...h]=Y(c);return a({class:A("modal",i,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const cn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:s,p:i}=t.tags,r=q(e),c=sn(e),l=()=>o(Array(10).fill("").map((p,u)=>i(u+1,". Some text here"))),d=p=>{const u=c({id:"my-dialog",...p},a("Header"),l(),s(r({variant:"outline",color:p.color,onclick:()=>{u.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{u.close()}},"OK")));return u};return p=>{const u=d(p);return n(r({...p,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},es=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:s,p:i}=t.tags,r="neutral",c=q(e),l=sn(e),d=()=>o(Array(10).fill("").map((u,h)=>i(h+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),d(),s(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},ts=`import modal from "@grucloud/bau-ui/modal";
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
`,ns={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:ts,createComponent:es}],gridItem:cn},os=e=>{const t=W(e);return()=>t(ns)},as=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:s}=t.tags,i=q(e),r=qe(e),c=()=>i({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),s("My Content")),d=c(),p=r({id:"my-popover-left",triggerEl:d,contentEl:l()});return()=>n(o(d,p))},rs=`import popover from "@grucloud/bau-ui/popover";
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
`,ss={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:rs,createComponent:as}]},is=e=>{const t=W(e);return()=>t(ss)},cs=e=>{const{bau:t}=e,{div:n}=t.tags,o=Ne(e);return a=>o({...a},n(`Paper ${a.size??""}`))},ls=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},us=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,ds={title:"Paper",package:"paper",description:"The paper component displays child compoenents on a surface area defined by its elevation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:us,createComponent:ls}],variantColorTableDisable:!0,gridItem:cs},ps=e=>{const t=W(e);return()=>t(ds)},ms=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function ln(e,t){const{bau:n,css:o}=e,{div:a,li:s}=n.tags,i=q(e),r=qe(e),c=we(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ms()}
  `,d=n.state(""),p=n.state(!1),u=n.state(0);return function(...v){let[{color:w="neutral",variant:g="outline",size:y="md",id:E,label:k,Option:N,options:R,getOptionLabel:B=({label:b})=>b,...M},...P]=Y(v);const D=()=>{m.openDialog(),m.focus(),p.val=!0},j=()=>{m.closeDialog(),p.val=!1},K=()=>{p.val=!1},Q=b=>{p.val?j():D()},z=({option:b,index:x})=>C=>{d.val=B(b),u.val=x,j()},G=b=>{switch(b.preventDefault(),b.key){case"Escape":j();break;case"ArrowDown":u.val<R.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=R.length-1:u.val--;break;case"Enter":p.val?(d.val=B(R[u.val]),j()):D();break}},U=()=>c({tabindex:"0",class:A(w,g)},R.map((b,x)=>s({class:()=>A(u.val==x&&"active"),onclick:z({option:b,index:x})},N(b)))),f=i({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":k,onclick:Q,color:w,variant:g,size:y},()=>!d.val&&k,d),m=r({id:E,triggerEl:f,contentEl:U(),onClose:K});return a({...M,class:A("select",w,y,l,t==null?void 0:t.class,M==null?void 0:M.class),onkeydown:G},f,m)}}const un=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,s=ln(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>s({...c,options:i,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},bs=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=ln(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return()=>o(i({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},hs=`import select from "@grucloud/bau-ui/select";
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
`,gs={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:hs,createComponent:bs}],gridItem:un},fs=e=>{const t=W(e);return()=>t(gs)};function Oe(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p,...u},...h]=Y(c);return a({...u,type:"range",class:A("slider",l,d,p,i,t==null?void 0:t.class,u.class)},...h)}}const dn=e=>{const{bau:t}=e,n=t.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=Oe(e);return s=>a({...s,oninput:o})},vs=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:s}=t.tags,i=t.state(0),r=l=>{i.val=l==null?void 0:l.target.value},c=Oe(e);return()=>n(o(a("Slider with step, min and max",s,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},xs=`import slider from "@grucloud/bau-ui/slider";
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
`,ws=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s,datalist:i,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Oe(e);return()=>o(a(s({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},ys=`import slider from "@grucloud/bau-ui/slider";
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
`,Cs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s,datalist:i,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Oe(e);return()=>o(a({class:n`
            display: flex;
          `},s({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},Es=`import slider from "@grucloud/bau-ui/slider";
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
`,Ss={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:xs,createComponent:vs},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ys,createComponent:ws},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Es,createComponent:Cs}],gridItem:dn},ks=e=>{const t=W(e);return()=>t(Ss)},gt={sm:16,md:32,lg:64};function et(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:s,animateTransform:i,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:d="color-base",variant:p="outline",visibility:u=!0,...h}={}){return a({class:A(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,h.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:gt[l],height:gt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},i({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},s({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const pn=e=>{const t=et(e);return n=>t({...n})},Ts=e=>{const{bau:t}=e,{section:n}=t.tags,o=et(e);return()=>n(o({}))},As=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,Ms={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:As,createComponent:Ts}],gridItem:pn},Ds=e=>{const t=W(e);return()=>t(Ms)},Is=()=>oe.map(e=>`
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
`);function mn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
    ${Is()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d="md",...p},...u]=Y(r);return a({...p,class:A("switch",s,c,l,d,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...u)}}const bn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,s=mn(e);return i=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...i,id:`my-switch-example-off-${i.color}-${i.variant}`})),a("on ",s({...i,id:`my-switch-example-on-${i.color}-${i.variant}`,checked:!0})))},$s=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s}=t.tags,i=mn(e);return()=>o(a(s({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",i({variant:"outline",id:"my-shinny-switch"}))))},Ns=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,_s={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Ns,createComponent:$s}],gridItem:bn},Bs=e=>{const t=W(e);return()=>t(_s)},Os=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:s,ul:i,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),d=u=>c.val.find(h=>h.name==u),p={base:o`
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
      ${Os()}
    `};return function(...h){let[{color:v,variant:w="plain",size:g,...y},...E]=Y(h);const k=R=>{const{Header:B,disabled:M,name:P}=R;return r({class:()=>A(l.val.name==P&&"active",M&&"disabled"),onclick:D=>D.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:P},bubbles:!0}))},B(R))},N=s({class:A("tabs",p.base,w,g,v,t==null?void 0:t.class,y.class)},n.loop(c,i(),k),()=>l.val.Content?l.val.Content({}):"");return N.addEventListener("tab.select",R=>{var P,D;const{tabName:B}=R.detail,M=d(B);M&&((P=l.val.exit)==null||P.call(),l.val=M,(D=M.enter)==null||D.call())},!1),N.addEventListener("tab.add",R=>{var M;const{tab:B}=R.detail;(M=B.enter)==null||M.call(),c.val.push(B)},!1),N.addEventListener("tab.remove",R=>{var M;const B=c.val.findIndex(P=>P.name==R.detail.tabName);B>0&&((M=c.val[B].exit)==null||M.call(),c.val.splice(B,1))},!1),N}}const hn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return i=>s(i)},Rs=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>s({variant:"outline",color:"neutral"})},Ps=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Ls=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>s({variant:"outline",color:"success"})},js=`import tabs from "@grucloud/bau-ui/tabs";
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
`,gn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},zs=e=>{const{css:t}=e,n=ye(e,{tabDefs:gn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Hs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Us=e=>{const{css:t}=e,n=gn(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Gs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Fs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Ps,createComponent:Rs},{title:"Extended Tabs",description:"An extended tabs.",code:js,createComponent:Ls},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Hs,createComponent:zs},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Gs,createComponent:Us}],gridItem:hn},Vs=e=>{const t=W(e);return()=>t(Fs)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:s}=n.tags;a`
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
`;const i=o`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...c){let[{...l},...d]=Y(c);return s({...l,class:A("table-container",i,t==null?void 0:t.class,l==null?void 0:l.class)},...d)}}const Ws=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:d}=t.tags;function p(g,y,E,k,N){return{name:g,calories:y,fat:E,carbs:k,protein:N}}const u=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],h=({name:g,calories:y})=>i(s(g),s({class:n`
            text-align: right;
          `},y)),v=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),w=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(w(r(d("Basic Table"),v(),l(u.map(h)))))},Zs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Xs=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Ks=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:v,calories:w})=>i(s(v),s({class:n`
            text-align: right;
          `},w)),u=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Ce(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(h(r(d("Table Dense"),u(),l(Xs.map(p)))))},Ys=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ge(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const qs=[ge("Frozen yoghurt",159,6,24,4),ge("Ice cream sandwich",237,9,37,4.3),ge("Eclair",262,16,24,6),ge("Cupcake",305,3.7,67,4.3),ge("Gingerbread",356,16,49,3.9)],Js=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:v,calories:w})=>i(s(v),s({class:n`
            text-align: right;
          `},w)),u=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Ce(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(h(r(d("Table Zebra"),u(),l(qs.map(p)))))},Qs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,ei={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Zs,createComponent:Ws},{title:"Dense",description:"A dense table.",code:Ys,createComponent:Ks},{title:"Zebra",description:"A zebra table.",code:Qs,createComponent:Js}]},ti=e=>{const t=W(e);return()=>t(ei)};function fn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=Qe(e),i=q(e),r=et(e),c=o`
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
  `,l=({label:v,icon:w,...g})=>i({"aria-label":v,title:v,...g},w),d=({count:v,totalCount:w,page:g,rowsPerPage:y})=>a({class:"pages-numbers"},Number(g-1)*Number(y)+(v>0?1:0),"-",Math.min(g*y,w)," of ",w),p=({count:v,page:w,rowsPerPage:g})=>a({class:"pages-numbers"},(w-1)*g+(v>0?1:0),"-",w*g),u=v=>v<=1,h=(v,w,g)=>v>=Math.ceil(w/g);return function(...w){let[{count:g=0,totalCount:y=0,page:E=1,rowsPerPage:k=50,onPageChange:N,isLoading:R=!1,disableFirst:B=()=>u(E),disablePrevious:M=()=>u(E),disableNext:P=()=>h(E,y,k),disableLast:D=()=>h(E,y,k),...j},...K]=Y(w);const Q=Math.max(0,Math.ceil(y/k)),z=N({page:1}),G=N({page:E-1}),U=N({page:E+1}),f=N({page:Q}),m=[{label:"First",icon:"⟪",onclick:z,disabled:B()},{label:"Previous",icon:"⟨",onclick:G,disabled:M()},{label:"Next",icon:"⟩",onclick:U,disabled:P()},{label:"Last",icon:"⟫",onclick:f,disabled:D()}];return a({...j,class:A("table-pagination",c,R&&"disabled",t==null?void 0:t.class,j==null?void 0:j.class)},r({class:"spinner",visibility:R,size:"md"}),y>0?d({count:g,totalCount:y,page:E,maxPages:Q,rowsPerPage:k}):p({count:g,page:E,maxPages:Q,rowsPerPage:k}),s({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const ni=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),oi=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:s,table:i,thead:r,tbody:c}=t.tags,l=ni(45),d=({name:E,email:k})=>s(a(E),a(k)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=fn(e),h=Ce(e,{class:n`
      max-width: 650px;
    `}),v=t.state(l),w=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),g=t.derive(()=>v.val.slice(w.val.page*w.val.rowsPerPage,(w.val.page+1)*w.val.rowsPerPage)),y=({page:E})=>k=>{w.val.page=E};return()=>h(i(p(),()=>c(g.val.map(d))),()=>u({...w.val,onPageChange:y}))},ai=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:s,table:i,thead:r,tbody:c,div:l}=t.tags,d=t.state(!1),p=t.state([]),u=t.state(""),h=t.derive(()=>p.val.length),v=t.state(1),w=t.state(10),g=t.derive(()=>p.val),y=D=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(D).toString()}`,E=({page:D})=>j=>{v.val=D,k(y({page:D,per_page:w.val}))};k(y({page:1,per_page:w.val}));async function k(D){try{d.val=!0;const j=await fetch(D,{});if(j.ok){const K=await j.json();p.val=K;return}throw j}catch(j){u.val=j.message}finally{d.val=!1}}const N=({name:D,description:j,stargazers_count:K})=>s(a(D),a(j),a({class:n`
            text-align: right;
          `},K)),R=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),B=fn(e),M=Ce(e,{class:n`
      min-width: 650px;
    `}),P=({message:D})=>l(D);return()=>M(()=>B({rowsPerPage:w.val,page:v.val,count:h.val,totalCount:-1,isLoading:d.val,onPageChange:E,disableNext:()=>!1}),i(R(),()=>u.val&&P({message:u.val}),()=>c(g.val.map(N))))},ri=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:s,h2:i,tr:r}=t.tags,c=oi(e),l=ai(e),d=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},i(r("Table Pagination")),s("Asynchronous Pagination"),d(l()),s("Simple Pagination"),d(c()))};function tt(e,t){const{bau:n,css:o,window:a}=e,{div:s}=n.tags,i=o`
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
  `;return function(...c){let[{titleEl:l,side:d="bottom-start",color:p="neutral",variant:u="outline",size:h="md",...v},...w]=Y(c);const g=s({class:A("container",...d.split("-"))},s({class:A("content",p,u,h),role:"tooltip"},l)),y=M=>`move-to-${M}`,E=(M,P,D)=>{if(M()){const j=y(P);g.classList.add(j),g.classList.add(P),g.classList.remove(D)}},k=(M,P)=>{const D=y(M);g.classList.contains(D)&&(g.classList.remove(D),g.classList.add(P),g.classList.remove(M))},N=M=>{const P=g.getBoundingClientRect();E(()=>P.x<0,"right","left"),E(()=>P.x+P.width>a.innerWidth,"left","right"),E(()=>P.y<0,"bottom","top"),E(()=>P.bottom>a.innerHeight,"top","bottom"),g.classList.add("visible")},R=M=>{g.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return s({...v,class:A("tooltip",i,t==null?void 0:t.class,v==null?void 0:v.class),bauMounted:({element:M})=>{M.addEventListener("mouseover",N),M.addEventListener("mouseout",R)},bauUnmounted:({element:M})=>{M.removeEventListener("mouseover",N),M.removeEventListener("mouseout",R)}},...w,g)}}const vn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:s}=t.tags,i=q(e),r=tt(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",s("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},i(l,`${l.color} ${l.variant}`))},si=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,s=q(e),i=tt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:r()},s("tooltip"))},ii=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ci=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:s,section:i}=t.tags,r=(...p)=>Ie(e)({variant:"outline",color:"primary"},p),c=tt(e),l=()=>o(a("A ",s("tooltip")," can be any component")),d=()=>i({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>d()},li=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ui={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:ii,createComponent:si},{title:"Grid",description:"Various tooltip position",code:li,createComponent:ci}],gridItem:vn},di=e=>{const t=W(e);return()=>t(ui)},xn=e=>{const t=Ve(e);return n=>t(n)},pi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ve(e);return()=>n(o({}))},mi=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,bi={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:mi,createComponent:pi}],gridItem:xn},hi=e=>{const t=W(e);return()=>t(bi)},gi=({css:e,createGlobalStyles:t})=>(t`
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
    `});function wn(e,t){const{bau:n,css:o,createGlobalStyles:a,window:s}=e,{renderMenuItem:i}=t,{ul:r,li:c,nav:l,div:d}=n.tags,p=gi({css:o,createGlobalStyles:a}),u=({element:g,closeState:y})=>{g.scrollHeight!=0&&(y.val?h(g):v(g))};function h(g){g.style.height=g.scrollHeight+"px";const y=()=>{g.removeEventListener("transitionend",y)};g.addEventListener("transitionend",y),s.requestAnimationFrame(()=>{g.style.height="0px"})}function v(g){const y=()=>{g.removeEventListener("transitionend",y),g.style.height=null};g.addEventListener("transitionend",y),g.style.height=g.scrollHeight+"px"}const w=({depth:g=1,maxDepth:y,color:E,variant:k,size:N})=>R=>{const{children:B,expanded:M}=R,P=n.state(!M);return c({class:()=>A(B?P.val?p.collapsed:p.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:D=>{B&&(P.val=!P.val)}},i(R.data)),B&&g<y&&r({class:A(E,N),bauMounted:({element:D})=>{P.val&&(D.style.height="0px")},"aria-expanded":({element:D})=>(u({element:D,closeState:P}),!P.val)},B.map(w({depth:g+1,maxDepth:y}))))};return function({tree:y,maxDepth:E=1/0,size:k="md",variant:N="plain",color:R="neutral",...B}){return l({class:A(p.nav,k,N,R,t==null?void 0:t.class,B.class)},y.children&&r(y.children.map(w({maxDepth:E,color:R,variant:N,size:k}))))}}const yn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=wn(e,{renderMenuItem:({name:i,href:r})=>n({href:r},i)});return i=>s({...i,tree:o})},fi=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=wn(e,{renderMenuItem:({name:i,href:r})=>n({href:r},i)});return()=>s({tree:o})},vi=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,xi={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:vi,createComponent:fi}],gridItem:yn},wi=e=>{const t=W(e);return()=>t(xi)},yi=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:s,p:i,ul:r,li:c}=t.tags,l=Pt(e),d=q(e),p=[{name:"Accordion",Item:Lt(e)},{name:"Alert",Item:zt(e)},{name:"Autocomplete",Item:Ft(e)},{name:"Avatar",Item:Ut(e)},{name:"Badge",Item:Wt(e)},{name:"Breadcrumbs",Item:Xt(e)},{name:"Button",Item:Kt(e)},{name:"Button Group",Item:Yt(e)},{name:"Calendar",Item:Jt(e)},{name:"Checkbox",Item:tn(e)},{name:"Chip",Item:Qt(e)},{name:"DrillDown Menu",Item:nn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:an(e)},{name:"Input",Item:rn(e)},{name:"Modal",Item:cn(e)},{name:"Select",Item:un(e)},{name:"Slider",Item:dn(e)},{name:"Spinner",Item:pn(e)},{name:"Switch",Item:bn(e)},{name:"Tabs",Item:hn(e)},{name:"Theme Switch",Item:xn(e)},{name:"Tooltip",Item:vn(e)},{name:"Tree View",Item:yn(e)}];return()=>o(s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:u})=>c(d({color:"primary",variant:"solid",href:`#${u}`,size:"sm"},u)))),p.map(u=>a({id:u.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(u))))},Ci=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:lo(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:ba(e)})},{path:"components",action:()=>({title:"Component",component:yi(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Sa(e)})},{path:"alert",action:()=>({title:"Alert",component:_a(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:La(e)})},{path:"animate",action:()=>({title:"Animate",component:Fa(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:er(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Xa(e)})},{path:"badge",action:()=>({title:"Badge",component:ar(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:cr(e)})},{path:"button",action:()=>({title:"Button",component:pr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:fr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:yr(e)})},{path:"chip",action:()=>({title:"Chip",component:kr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Dr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Br(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Lr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Ur(e)})},{path:"input",action:()=>({title:"Input",component:Wr(e)})},{path:"list",action:()=>({title:"List",component:Qr(e)})},{path:"modal",action:()=>({title:"Modal",component:os(e)})},{path:"paper",action:()=>({title:"Paper",component:ps(e)})},{path:"popover",action:()=>({title:"Popover",component:is(e)})},{path:"select",action:()=>({title:"Select",component:fs(e)})},{path:"slider",action:()=>({title:"Slider",component:ks(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Ds(e)})},{path:"switch",action:()=>({title:"Switch",component:Bs(e)})},{path:"table",action:()=>({title:"Table",component:ti(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:ri(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Vs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:di(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:hi(e)})},{path:"treeView",action:()=>({title:"Tree View",component:wi(e)})}]},{path:"pages",action:t=>({title:"Pages",component:mo(e)})}],Ei=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Si=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=e,i=a.state(),r=t({componentState:i});return document.getElementById("app").replaceChildren(r),({router:l})=>{const d=o.location.pathname.replace(n,""),{title:p,component:u,Layout:h=t}=l.resolve({pathname:d});i.val=u,document.title=`${p}`}},ki=e=>{const{createGlobalStyles:t}=e;t`
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
  `};Un();const Cn={title:"Bau",base:"/bau/bau-ui"},le=Yn({config:Cn}),{bau:Ti}=le;le.states={drawerOpen:Ti.state(!0)};ki(le);Nn({routes:Ci({context:le}),onLocationChange:Si({context:le,LayoutDefault:ro(le),config:Cn}),notFoundRoute:Ei(le)});
