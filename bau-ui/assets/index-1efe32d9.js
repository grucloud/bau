(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Gn=(e,t)=>({...e,paths:[...t,e.path]}),yt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Gn(o,e);return n?[a,...yt({paths:[...e,o.path],routes:n})]:a}),Un=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Fn=({routes:e=[],notFoundRoute:t})=>{const n=yt({routes:e}).map(o=>({...o,regex:Un(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Wn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Fn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ze=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Vn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Kn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],lt=e=>`var(--color-${e})`,Zn=e=>`var(--color-${e}-lightest)`,Xn=()=>Ze.map(([e])=>`
.outline.${e} {
  border: 2px solid ${lt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Zn(e)};
}
.solid.${e} {
  background-color: ${lt(e)};
}
`).join(`
`),qn=()=>Ze.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),Yn=e=>100-e*10,Jn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Yn(t)}%);`).join(`
`),ut=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Qn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Vn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Kn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function eo({createGlobalStyles:e},{colorPalette:t=Ze}={}){e`
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
      ${ut({})}
      ${Xn()}
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
      ${qn()}
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
  `}function to(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Xe=e=>Object.prototype.toString.call(e??0).slice(8,-1),no=e=>Xe(e)=="Object",dt=e=>Xe(e)=="Function",We=e=>["Object","Array"].includes(Xe(e)),pt=Object.getPrototypeOf,Ve=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,oo=["splice","push","pop","shift","unshift","sort","reverse"],Te=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const W=e=>!me(e[0])&&no(e[0])?e:[{},...e];function ao(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,r=!1,s,c=y=>n.createElement(y),l=(y,m,h)=>{let C=s;s=m;let E=y(h);return s=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var h;return(h=m.element)==null?void 0:h.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,m,h,C,E,_)=>{var O;if(r){i.add(y);return}for(let Z of y.bindings){let{deps:R,element:P,renderInferred:K,render:J,renderItem:te}=Z;if(te&&m)(O=x(P,C,(...ae)=>v(te(...ae)),h,E,_)[m])==null||O.call();else{let ae=K?K({element:P}):J({element:P,renderItem:te})(...R.map(Ve));ae!==P&&P.replaceWith(Z.element=v(ae))}}S(y),u()},p=(y,m,h=[])=>({get(C,E,_){var O;if(s==null||s.add(y),E==="_isProxy")return!0;if(!((O=C[E])!=null&&O._isProxy)&&!me(C[E])&&We(C[E]))C[E]=new Proxy(C[E],p(y,m,[...h,E]));else if(oo.includes(E)){let Z=C[E];return(...R)=>{let P=Z.apply(C,R);return d(y,E,P,R,m,h),P}}return Reflect.get(C,E,_)},set(C,E,_,O){let Z=Reflect.set(C,E,_,O);return d(y,"setItem",Z,{prop:E,value:_},m,[...h,E]),Z}}),g=(y,m)=>new Proxy(m,p(y,m)),x=(y,m,h,C,E,_)=>{let O=()=>y.replaceChildren(...Te(C,h)),Z=R=>y[R]&&y.removeChild(y[R]);return{assign:O,sort:O,reverse:O,setItem:()=>{var P;let R=_[0];(P=y.children[R])==null||P.replaceWith(h(E[R],R))},push:()=>y.append(...Te(m,(R,P)=>h(R,E.length+P))),unshift:()=>y.prepend(...Te(m,h)),pop:()=>Z("lastChild"),shift:()=>Z("firstChild"),splice:()=>{let[R,P,...K]=m;const{length:J}=y.children;for(let te=R>=0?Math.min(R+P-1,J-1):J-1;te>=(R>=0?R:J+R);te--)y.children[te].remove();if(K.length){let te=K.forEach((ae,He)=>h(ae,R+He));y.children[R]?y.children[R].after(...te):y.append(...te)}}}},b=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return s==null||s.add(m),m.valProxy??(m.valProxy=We(y)?g(m,y):y,m.valProxy)},set val(m){let h=this,C=h.val;We(m)?(h.valProxy=g(h,m),d(h,"assign",m)):m!==C&&(h.valProxy=m,d(h)),h.oldVal=C}}),v=y=>y==null||y===!1?c("span"):y.nodeType?y:n.createTextNode(y),w=(y,m)=>{let h=new Set;return m.val=l(y,h),h},f=y=>{let m=b(),h=w(y,m);m.computed=!0;for(let C of h)C.listeners.push({computed:y,deps:h,state:m});return m},S=y=>{for(let m of[...y.listeners])w(m.computed,m.state)},D=(y,...m)=>{if(m.length){let h=[];for(let C of m.flat(1/0))C!=null&&h.push(me(C)?z({deps:[C],render:()=>E=>E}):dt(C)?Q({renderInferred:C}):v(C));y.append(...h)}},N={},$=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??$(pt(y),m)),M=(y,m,h)=>{var C;return N[y+","+m]??(N[y+","+m]=((C=$(h,m))==null?void 0:C.set)??0)},I=(y,m)=>new t.MutationObserver((h,C)=>{h.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(_=>_===y&&(m({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),A=(y,m)=>new t.MutationObserver((h,C)=>h.forEach(E=>m({record:E,element:y}))).observe(y,{childList:!0}),L=y=>new Proxy(function(h,...C){var Z;let[E,..._]=W(C),O=y?n.createElementNS(y,h):c(h);for(let[R,P]of Object.entries(E)){if(R.startsWith("bau"))continue;let K=M(h,R,pt(O))?J=>O[R]=J:J=>O.setAttribute(R,J);P==null||(me(P)?z({deps:[P],render:()=>()=>(K(P.val),O)}):dt(P)&&(!R.startsWith("on")||P.isDerived)?Q({renderInferred:()=>(K(P({element:O})),O)}):P.renderProp?z({deps:P.deps,render:()=>()=>(K(P.renderProp({element:O})(...P.deps.map(Ve))),O)}):K(P))}return E.bauChildMutated&&A(O,E.bauChildMutated),D(O,..._),(Z=E.bauCreated)==null||Z.call(E,{element:O}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:O})),E.bauUnmounted&&t.requestAnimationFrame(()=>I(O,E.bauUnmounted)),O},{get:(m,h)=>m.bind(void 0,h)}),F=(y,m,h)=>{y.element=v(h);for(let C of m)me(C)&&(a.add(C),C.bindings.push(y));return y.element},Q=({renderInferred:y,element:m})=>{let h=new Set,C=l(y,h,{element:m});return F({renderInferred:y},h,C)},z=({deps:y,element:m,render:h,renderItem:C})=>F({deps:y,render:h,renderItem:C},y,h({element:m,renderItem:C})(...y.map(Ve))),V=(y,m,h)=>z({deps:[y],render:({renderItem:C})=>E=>(m.append(...Te(E,C)),m),renderItem:h}),U=y=>{r=!0,y(),r=!1,i.forEach(d),i.clear()};return{tags:L(),tagsNS:L,state:b,bind:z,loop:V,derive:f,stateSet:a,batch:U}}const ro=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},so=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},io=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function co(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const r=io(a,i),s=ro(r);return!t.getElementById(s)&&so(t,e==null?void 0:e.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function lo(e){const t=ao(),n=co();return eo(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function Ne(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:r=a,animationShow:s=a,...c},l){return o({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!r()||p.getAttribute("cloned"))return;const g=p.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=p.getAttribute("width"),g.style.height=p.getAttribute("height"),g.style.position="absolute",g.style.animation=r(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var x;return(x=g.parentNode)==null?void 0:x.removeChild(g)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const g=p.getBoundingClientRect();if(p.setAttribute("width",g.width+"px"),p.setAttribute("height",g.height+"px"),s()){p.style.animation=s();const x=()=>{p.removeEventListener("animationend",x),p.style.animation=""};p.addEventListener("animationend",x)}})},...c},l)}}function X(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:u,href:d,...p},...g]=W(r);return(d?n.tags.a:n.tags.button)({...!d&&{type:"button"},...p,class:T("button",a.root,c,l,s,d?a.a:a.button,u&&a.disabled,t==null?void 0:t.class,p.class),disabled:u,href:d},g)}}const ee=["neutral","primary","success","danger","warning"],uo=["plain","outline","solid"],po=["sm","md","lg"],mo="light",go=()=>ee.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function qe(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,r=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(mo);const l=o`
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
  `;return function(...d){let[{color:p,variant:g="outline",size:x="md",...b},...v]=W(d);return i({required:"required",title:"Switch Theme",...b,class:T("theme-switch",p,g,x,l,t==null?void 0:t.class,b.class),type:"checkbox",checked:s()=="dark",onclick:w=>{r(w.target.checked?"dark":"light")}},...v)}}function bo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:r,header:s,h1:c,div:l,a:u,img:d,b:p,ul:g,li:x}=n.tags,{svg:b,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,f=X(e,{class:o`
      background: transparent;
    `}),S=qe(e),D=()=>r(b({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),N=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},D()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),$=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),f({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},N(),$())}}function ho({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:r,ul:s,li:c,p:l,div:u,h1:d}=t.tags,p=({links:b,title:v})=>o({class:n`
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
        `},d(v),s(b.map(({href:w,name:f})=>c(r({href:w},f))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],x=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:g}),p({title:"Bau Ecosystem",links:x})),u({class:n`
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
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u,...d},...p]=W(s);return a({...d,class:T("list",i,c,l,u,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const Ae="0.3s",Ct=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(Ct({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},St=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=St(e)(t.children[o]);if(a)return a}},fo=({keyframes:e})=>({hideToLeft:e`
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
   `});function Ye(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:r="",hashBased:s=!1}=t,c=`${i.base}${r}`,l=z=>{var V;return((V=z.parentTree.data)==null?void 0:V.href)??z.parentTree.children[0].data.href},u=({variant:z,color:V,size:U,currentTree:y,data:m})=>S(M({variant:z,color:V,size:U,href:`${c}${l(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),M({variant:z,color:V,size:U,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),d=({size:z,subTree:{data:{name:V,href:U},children:y=[]}})=>M({size:z,href:`${c}${U}`,"data-ischild":!y.length},V),p=({pathname:z,subTree:V})=>{var U;return z===((U=V==null?void 0:V.data)==null?void 0:U.href)},{renderHeader:g=u,renderMenuItem:x=d,isActive:b=p}=t,{li:v,nav:w,div:f,header:S,a:D}=n.tags,N=Ne(e),$=we(e),M=X(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:I,hideToRight:A}=fo(e),L=o`
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
  `,F=({variant:z,color:V,size:U,currentTree:y,pathnameState:m})=>{const{children:h,parentTree:C,data:E}=y;return f({class:T("drillDownMenu",z,V,U)},C&&g({variant:z,color:V,size:U,data:E,currentTree:y}),h&&$({class:T(z,V,U)},h.map(_=>v({class:()=>T(_.children&&"has-children",b({pathname:m.val,subTree:_})&&"active")},x({variant:z,color:V,size:U,subTree:_})))))},Q=({tree:z,pathname:V})=>{let U=Ct({})(structuredClone(z)),y=St(V)(U);return y||(console.error("drilldown no sub tree",V),y=U),y};return function(V){const{variant:U="plain",color:y="neutral",size:m="md",tree:h,...C}=V,E=n.state(a.location.pathname.replace(c,"")),_=n.derive(()=>Q({tree:h,pathname:E.val}));a.document.addEventListener("click",K=>{const{target:J}=K,te=J.getAttribute("href");if(J.tagName==="A"&&te&&!te.startsWith("http")){let ae=te.replace(c,"");s||(ae=ae.replace(J.hash,"")),E.val=ae}});let O=1;const Z=K=>{const{dataset:J}=K.target;J.buttonback=="true"?O=-1:J.ischild=="false"?O=1:J.ischild=="true"&&(O=0)},R=K=>{switch(K){case 1:return`${I} ${Ae}`;case-1:return`${A} ${Ae}`;default:return""}},P=K=>{switch(K){case 1:return`${A} ${Ae} reverse`;case-1:return`${I} ${Ae} reverse`;default:return""}};return w({class:T(L,t==null?void 0:t.class,C.class),onclick:Z},N({animationHide:()=>R(O),animationShow:()=>P(O)},()=>F({variant:U,color:y,size:m,currentTree:_.val,pathnameState:E})))}}const vo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Et(e){const{tr:t,bau:n,css:o,config:a,states:i,window:r}=e,{div:s,ul:c,li:l,nav:u,a:d,span:p}=n.tags;let g=!1;const x=Ye(e);return function(){return s({bauMounted:({element:v})=>{r.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:v=>{g&&!v.target.dataset.buttonback&&!v.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},x({tree:vo}))}}const xo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,r=Ne(e),s=bo(e),c=Et(e),l=ho(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:g}){return i({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),l())}};function $e(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:d,...p},...g]=W(s);return a({...p,onclick:d,class:T("chip",i,c,l,u,d&&"clickable",t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}function wo(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:r,p:s}=t.tags;X(e);const c=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},i(u),r(d),s(p))}}function yo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,r=n`
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
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function Co({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:r,div:s,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:g,size:x})=>s({class:n`
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
                  var(--color-success) ${x/p*100}%
                );
                justify-content: flex-end;
                width: ${x/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},x)));return function({data:g=[]}){return o({class:n`
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
          `},g.map(d({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function So(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:r,section:s}=t.tags,c=wo(e),l=yo(e),u=X(e);$e(e);const d=Co(e),p=(...w)=>a({class:n`
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
          `},...w)),g=n``,x=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],b=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:b}),d({data:x}),v())}}function Eo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const ko=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:r}=n.tags,s=Eo(e);return()=>o({id:"login"},r(t("Login Examples")),i("Basic"),a(s()))};function To(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
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
          `},r(t("Pages Examples")),ko(e)()))}}function Ao(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function kt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&kt(n)}),e}class mt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Tt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Io="</span>",gt=e=>!!e.scope,Do=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Mo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Tt(t)}openNode(t){if(!gt(t))return;const n=Do(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){gt(t)&&(this.buffer+=Io)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const bt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Je{constructor(){this.rootNode=bt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=bt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Je._collapse(n)}))}}class No extends Je{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Mo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function At(e){return de("(?=",e,")")}function $o(e){return de("(?:",e,")*")}function Bo(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function Po(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Qe(...e){return"("+(Po(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function It(e){return new RegExp(e.toString()+"|").exec("").length-1}function Oo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const _o=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function et(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),r="";for(;i.length>0;){const s=_o.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(t)}const Ro=/\b\B/,Dt="[a-zA-Z]\\w*",tt="[a-zA-Z_]\\w*",Mt="\\b\\d+(\\.\\d+)?",Nt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",$t="\\b(0b[01]+)",Lo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",jo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},zo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Ho={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Go={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Be=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Uo=Be("//","$"),Fo=Be("/\\*","\\*/"),Wo=Be("#","$"),Vo={scope:"number",begin:Mt,relevance:0},Ko={scope:"number",begin:Nt,relevance:0},Zo={scope:"number",begin:$t,relevance:0},Xo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},qo={scope:"title",begin:Dt,relevance:0},Yo={scope:"title",begin:tt,relevance:0},Jo={begin:"\\.\\s*"+tt,relevance:0},Qo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ie=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Ro,IDENT_RE:Dt,UNDERSCORE_IDENT_RE:tt,NUMBER_RE:Mt,C_NUMBER_RE:Nt,BINARY_NUMBER_RE:$t,RE_STARTERS_RE:Lo,SHEBANG:jo,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:zo,QUOTE_STRING_MODE:Ho,PHRASAL_WORDS_MODE:Go,COMMENT:Be,C_LINE_COMMENT_MODE:Uo,C_BLOCK_COMMENT_MODE:Fo,HASH_COMMENT_MODE:Wo,NUMBER_MODE:Vo,C_NUMBER_MODE:Ko,BINARY_NUMBER_MODE:Zo,REGEXP_MODE:Xo,TITLE_MODE:qo,UNDERSCORE_TITLE_MODE:Yo,METHOD_GUARD:Jo,END_SAME_AS_BEGIN:Qo});function ea(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ta(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function na(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ea,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function oa(e,t){Array.isArray(e.illegal)&&(e.illegal=Qe(...e.illegal))}function aa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ra(e,t){e.relevance===void 0&&(e.relevance=1)}const sa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,At(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ia=["of","and","for","in","not","or","if","then","parent","list","value"],ca="keyword";function Bt(e,t,n=ca){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Bt(e[i],t,i))}),o;function a(i,r){t&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,la(c[0],c[1])]})}}function la(e,t){return t?Number(t):ua(e)?0:1}function ua(e){return ia.includes(e.toLowerCase())}const ht={},ue=e=>{console.error(e)},ft=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{ht[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ht[`${e}/${t}`]=!0)},Me=new Error;function Pt(e,t,{key:n}){let o=0;const a=e[n],i={},r={};for(let s=1;s<=t.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=It(t[s-1]);e[n]=r,e[n]._emit=i,e[n]._multi=!0}function da(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Me;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Me;Pt(e,e.begin,{key:"beginScope"}),e.begin=et(e.begin,{joinWith:""})}}function pa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Me;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Me;Pt(e,e.end,{key:"endScope"}),e.end=et(e.end,{joinWith:""})}}function ma(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ga(e){ma(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),da(e),pa(e)}function ba(e){function t(r,s){return new RegExp(ve(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=It(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=t(et(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[ta,aa,ga,sa].forEach(u=>u(r,s)),e.compilerExtensions.forEach(u=>u(r,s)),r.__beforeBegin=null,[na,oa,ra].forEach(u=>u(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=Bt(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(u){return ha(u==="self"?r:u)})),r.contains.forEach(function(u){i(u,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function Ot(e){return e?e.endsWithParent||Ot(e.starts):!1}function ha(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ot(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var fa="11.8.0";class va extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ke=Tt,vt=ie,xt=Symbol("nomatch"),xa=7,_t=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:No};function c(m){return s.noHighlightRe.test(m)}function l(m){let h=m.className+" ";h+=m.parentNode?m.parentNode.className:"";const C=s.languageDetectRe.exec(h);if(C){const E=A(C[1]);return E||(ft(i.replace("{}",C[1])),ft("Falling back to no-highlight mode for this block.",m)),E?C[1]:"no-highlight"}return h.split(/\s+/).find(E=>c(E)||A(E))}function u(m,h,C){let E="",_="";typeof h=="object"?(E=m,C=h.ignoreIllegals,_=h.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),_=m,E=h),C===void 0&&(C=!0);const O={code:E,language:_};U("before:highlight",O);const Z=O.result?O.result:d(O.language,O.code,C);return Z.code=O.code,U("after:highlight",Z),Z}function d(m,h,C,E){const _=Object.create(null);function O(k,B){return k.keywords[B]}function Z(){if(!j.keywords){ne.addText(Y);return}let k=0;j.keywordPatternRe.lastIndex=0;let B=j.keywordPatternRe.exec(Y),G="";for(;B;){G+=Y.substring(k,B.index);const q=re.case_insensitive?B[0].toLowerCase():B[0],oe=O(j,q);if(oe){const[se,zn]=oe;if(ne.addText(G),G="",_[q]=(_[q]||0)+1,_[q]<=xa&&(ke+=zn),se.startsWith("_"))G+=B[0];else{const Hn=re.classNameAliases[se]||se;K(B[0],Hn)}}else G+=B[0];k=j.keywordPatternRe.lastIndex,B=j.keywordPatternRe.exec(Y)}G+=Y.substring(k),ne.addText(G)}function R(){if(Y==="")return;let k=null;if(typeof j.subLanguage=="string"){if(!t[j.subLanguage]){ne.addText(Y);return}k=d(j.subLanguage,Y,!0,ct[j.subLanguage]),ct[j.subLanguage]=k._top}else k=g(Y,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(ke+=k.relevance),ne.__addSublanguage(k._emitter,k.language)}function P(){j.subLanguage!=null?R():Z(),Y=""}function K(k,B){k!==""&&(ne.startScope(B),ne.addText(k),ne.endScope())}function J(k,B){let G=1;const q=B.length-1;for(;G<=q;){if(!k._emit[G]){G++;continue}const oe=re.classNameAliases[k[G]]||k[G],se=B[G];oe?K(se,oe):(Y=se,Z(),Y=""),G++}}function te(k,B){return k.scope&&typeof k.scope=="string"&&ne.openNode(re.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(K(Y,re.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(J(k.beginScope,B),Y="")),j=Object.create(k,{parent:{value:j}}),j}function ae(k,B,G){let q=Oo(k.endRe,G);if(q){if(k["on:end"]){const oe=new mt(k);k["on:end"](B,oe),oe.isMatchIgnored&&(q=!1)}if(q){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return ae(k.parent,B,G)}function He(k){return j.matcher.regexIndex===0?(Y+=k[0],1):(Fe=!0,0)}function _n(k){const B=k[0],G=k.rule,q=new mt(G),oe=[G.__beforeBegin,G["on:begin"]];for(const se of oe)if(se&&(se(k,q),q.isMatchIgnored))return He(B);return G.skip?Y+=B:(G.excludeBegin&&(Y+=B),P(),!G.returnBegin&&!G.excludeBegin&&(Y=B)),te(G,k),G.returnBegin?0:B.length}function Rn(k){const B=k[0],G=h.substring(k.index),q=ae(j,k,G);if(!q)return xt;const oe=j;j.endScope&&j.endScope._wrap?(P(),K(B,j.endScope._wrap)):j.endScope&&j.endScope._multi?(P(),J(j.endScope,k)):oe.skip?Y+=B:(oe.returnEnd||oe.excludeEnd||(Y+=B),P(),oe.excludeEnd&&(Y=B));do j.scope&&ne.closeNode(),!j.skip&&!j.subLanguage&&(ke+=j.relevance),j=j.parent;while(j!==q.parent);return q.starts&&te(q.starts,k),oe.returnEnd?0:B.length}function Ln(){const k=[];for(let B=j;B!==re;B=B.parent)B.scope&&k.unshift(B.scope);k.forEach(B=>ne.openNode(B))}let Ee={};function it(k,B){const G=B&&B[0];if(Y+=k,G==null)return P(),0;if(Ee.type==="begin"&&B.type==="end"&&Ee.index===B.index&&G===""){if(Y+=h.slice(B.index,B.index+1),!a){const q=new Error(`0 width match regex (${m})`);throw q.languageName=m,q.badRule=Ee.rule,q}return 1}if(Ee=B,B.type==="begin")return _n(B);if(B.type==="illegal"&&!C){const q=new Error('Illegal lexeme "'+G+'" for mode "'+(j.scope||"<unnamed>")+'"');throw q.mode=j,q}else if(B.type==="end"){const q=Rn(B);if(q!==xt)return q}if(B.type==="illegal"&&G==="")return 1;if(Ue>1e5&&Ue>B.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=G,G.length}const re=A(m);if(!re)throw ue(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const jn=ba(re);let Ge="",j=E||jn;const ct={},ne=new s.__emitter(s);Ln();let Y="",ke=0,ce=0,Ue=0,Fe=!1;try{if(re.__emitTokens)re.__emitTokens(h,ne);else{for(j.matcher.considerAll();;){Ue++,Fe?Fe=!1:j.matcher.considerAll(),j.matcher.lastIndex=ce;const k=j.matcher.exec(h);if(!k)break;const B=h.substring(ce,k.index),G=it(B,k);ce=k.index+G}it(h.substring(ce))}return ne.finalize(),Ge=ne.toHTML(),{language:m,value:Ge,relevance:ke,illegal:!1,_emitter:ne,_top:j}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:Ke(h),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:h.slice(ce-100,ce+100),mode:k.mode,resultSoFar:Ge},_emitter:ne};if(a)return{language:m,value:Ke(h),illegal:!1,relevance:0,errorRaised:k,_emitter:ne,_top:j};throw k}}function p(m){const h={value:Ke(m),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return h._emitter.addText(m),h}function g(m,h){h=h||s.languages||Object.keys(t);const C=p(m),E=h.filter(A).filter(F).map(P=>d(P,m,!1));E.unshift(C);const _=E.sort((P,K)=>{if(P.relevance!==K.relevance)return K.relevance-P.relevance;if(P.language&&K.language){if(A(P.language).supersetOf===K.language)return 1;if(A(K.language).supersetOf===P.language)return-1}return 0}),[O,Z]=_,R=O;return R.secondBest=Z,R}function x(m,h,C){const E=h&&n[h]||C;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function b(m){let h=null;const C=l(m);if(c(C))return;if(U("before:highlightElement",{el:m,language:C}),m.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),s.throwUnescapedHTML))throw new va("One of your code blocks includes unescaped HTML.",m.innerHTML);h=m;const E=h.textContent,_=C?u(E,{language:C,ignoreIllegals:!0}):g(E);m.innerHTML=_.value,x(m,C,_.language),m.result={language:_.language,re:_.relevance,relevance:_.relevance},_.secondBest&&(m.secondBest={language:_.secondBest.language,relevance:_.secondBest.relevance}),U("after:highlightElement",{el:m,result:_,text:E})}function v(m){s=vt(s,m)}const w=()=>{D(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function f(){D(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function D(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(s.cssSelector).forEach(b)}function N(){S&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",N,!1);function $(m,h){let C=null;try{C=h(e)}catch(E){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),a)ue(E);else throw E;C=r}C.name||(C.name=m),t[m]=C,C.rawDefinition=h.bind(null,e),C.aliases&&L(C.aliases,{languageName:m})}function M(m){delete t[m];for(const h of Object.keys(n))n[h]===m&&delete n[h]}function I(){return Object.keys(t)}function A(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function L(m,{languageName:h}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=h})}function F(m){const h=A(m);return h&&!h.disableAutodetect}function Q(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=h=>{m["before:highlightBlock"](Object.assign({block:h.el},h))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=h=>{m["after:highlightBlock"](Object.assign({block:h.el},h))})}function z(m){Q(m),o.push(m)}function V(m){const h=o.indexOf(m);h!==-1&&o.splice(h,1)}function U(m,h){const C=m;o.forEach(function(E){E[C]&&E[C](h)})}function y(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),b(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:D,highlightElement:b,highlightBlock:y,configure:v,initHighlighting:w,initHighlightingOnLoad:f,registerLanguage:$,unregisterLanguage:M,listLanguages:I,getLanguage:A,registerAliases:L,autoDetection:F,inherit:vt,addPlugin:z,removePlugin:V}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=fa,e.regex={concat:de,lookahead:At,either:Qe,optional:Bo,anyNumberOfTimes:$o};for(const m in Ie)typeof Ie[m]=="object"&&kt(Ie[m]);return Object.assign(e,Ie),e},ge=_t({});ge.newInstance=()=>_t({});var wa=ge;ge.HighlightJS=ge;ge.default=ge;const fe=Ao(wa),wt="[A-Za-z$_][0-9A-Za-z$_]*",ya=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ca=["true","false","null","undefined","NaN","Infinity"],Rt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Lt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],jt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Sa=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ea=[].concat(jt,Rt,Lt);function zt(e){const t=e.regex,n=(h,{after:C})=>{const E="</"+h[0].slice(1);return h.input.indexOf(E,C)!==-1},o=wt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(h,C)=>{const E=h[0].length+h.index,_=h.input[E];if(_==="<"||_===","){C.ignoreMatch();return}_===">"&&(n(h,{after:E})||C.ignoreMatch());let O;const Z=h.input.substring(E);if(O=Z.match(/^\s*=/)){C.ignoreMatch();return}if((O=Z.match(/^\s+extends\s+/))&&O.index===0){C.ignoreMatch();return}}},s={$pattern:wt,keyword:ya,literal:Ca,built_in:Ea,"variable.language":Sa},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},b={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},f={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,x,b,v,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(S)});const D=[].concat(f,p.contains),N=D.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(D)}]),$={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N},M={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Rt,...Lt]}},A={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[$],illegal:/%/},F={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(h){return t.concat("(?!",h.join("|"),")")}const z={match:t.concat(/\b/,Q([...jt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},$]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[$]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),A,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,x,b,v,f,{match:/\$\d+/},d,I,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[f,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[$,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[$]},z,F,M,U,{match:/\$[(.]/}]}}function ka(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ta=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",zt),fe.registerLanguage("sh",ka),function({text:r,language:s="js"}){const c=a({class:`hljs language-${s}`});return c.innerHTML=fe.highlight(r,{language:s}).value,o({class:n`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...d},...p]=W(s);return a({...d,class:T("paper",u,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function Ht(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:r,li:s,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(v,w)=>{let f=null;return(...S)=>{a.clearTimeout(f),f=a.setTimeout(()=>v(...S),w)}},p=o`
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
  `,g=({value:v,id:w,children:f=[]})=>{const S=c({class:()=>u.val==w?"active":"",href:`#${w}`});return S.innerHTML=v,s({class:()=>u.val==w?"active":""},S,f.length>0&&r(f.map(g)))},x=v=>v.tagName.charAt(1),b=({contentEl:v})=>{const w=v.querySelectorAll(l);let f=2,S={},D={children:[]},N=D;const $=N;let M=[N];return[...w].forEach(I=>{const A=x(I);I.setAttribute("id",I.textContent),!I.innerHTML.includes("<button")&&(S={value:I.innerHTML,id:I.id??I.textContent,children:[]},f==A?(D=S,N.children.push(D)):f<A?(M.push(N),N=D,D.children.push(S),D=S):f>A&&(N=M[A-1],M=M.slice(0,A-1),N.children.push(S),D=S),f=A)}),$};return function(...w){let[{color:f,variant:S,size:D="md",contentEl:N,...$}]=W(w);const M=b({contentEl:N}),I=d(()=>{const L=[...N.querySelectorAll(l)].find(F=>{const{top:Q,height:z}=F.getBoundingClientRect();if(Q+z>60)return!0});L&&(u.val=L==null?void 0:L.id)},100);return i({...$,class:T("tableOfContent",D,S,f,p,t==null?void 0:t.class,$==null?void 0:$.class),bauMounted:()=>{a.addEventListener("scroll",I)},bauUnmounted:()=>{a.removeEventListener("scroll",I)}},M.children&&r(M.children.map(g)))}}const Gt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(r(l(p??""),ee.map(g=>l(g)))),i(uo.map(g=>r(l(g),ee.map((x,b)=>s(d({color:x,variant:g},{index:b}))))))))}},Ia=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},po.map((r,s)=>i({color:"success",variant:"outline",size:r},{index:s})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:r,p:s,h2:c,h3:l,pre:u,code:d}=t.tags;fe.registerLanguage("javascript",zt);const p=Ht(e),g=Pe(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),x=Gt(e),b=Ia(e),v=({text:w})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=fe.highlight(w,{language:"js"}).value}}));return function(f){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},r(f.title),s(f.description),f.gridItem&&[c("Variant/Color"),!f.variantColorTableDisable&&f.gridItem&&g(x({Item:f.gridItem(e)})),c("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),f.gridItem&&g(b({Item:f.gridItem(e)}))],c("Usage"),l("Import"),v({text:f.importStatement}),c("Examples"),f.examples.map(D=>i(l(D.title),s(D.description),g(D.createComponent(e)()),v({text:D.code}))));return o({class:n`
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
        `},S,p({contentEl:S}))}};function nt(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,r=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?s(l):c(l))};function s(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:d,variant:p="plain",size:g="md",Header:x,Content:b,close:v=!0,...w}]=W(u);const f=n.state(v);return a({...w,class:T("collapsible",g,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:()=>T("header",b?f.val?"close":"open":""),onclick:S=>{f.val=!f.val,S.stopPropagation()}},x()),a({class:"content",role:"region",bauMounted:({element:S})=>{f.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(r({element:S,closeState:f}),!f.val)},b&&b()))}}const Da=()=>ee.map(e=>`
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
`);function Oe(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:r,h3:s,button:c}=n.tags,l=o`
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
    ${Da()}
  `;return function(...d){let[{color:p,variant:g="outline",size:x="md",data:b=[],...v}]=W(d);const w=n.state(""),f=nt(e),S=N=>$=>{w.val==N?w.val="":w.val=N},D=N=>{const{Header:$,Content:M,name:I}=N,A=()=>s({class:()=>T(w.val==I&&"active")},c({type:"button","aria-controls":`bau-${I}`,"aria-expanded":({element:F})=>w.val==I},$(N))),L=()=>a({id:`bau-${I}`,"data-state":({element:F})=>w.val==I},M(N));return r({class:T(p,g,x),onclick:S(I)},f({Header:A,Content:L}))};return a({class:T("accordion",l,t==null?void 0:t.class,v.class)},i(b.map(D)))}}const Ut=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Oe(e);return r=>i({...r,data:a})},Ma=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Oe(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Na=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ft=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},$a=e=>{const{css:t}=e,n=Ft(e),o=Oe(e);return()=>o({color:"warning",data:n,class:t`
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
`,Pa=e=>{const{css:t}=e,n=Ft(e),o=Oe(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Oa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,_a={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Na,createComponent:Ma},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ba,createComponent:$a},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Oa,createComponent:Pa}],gridItem:Ut},Ra=e=>{const t=H(e);return()=>t(_a)},La={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},ja=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},za=()=>ee.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function _e(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:r}=n.tags;ja({css:o,createGlobalStyles:a});const s=o`
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
  `,c=X(e),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(d,...p){const{variant:g="outline",color:x="neutral",size:b="md",onRemove:v,...w}=d;return i({...w,class:T(`alert-${g}`,g,x,b,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},r({class:"icon"},La[x]),i({class:"content"},...p),v&&l({onclick:v}))}}const Wt=e=>{const t=_e(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Ha=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=_e(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ga=`import alert from "@grucloud/bau-ui/alert";
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
`,Ua=e=>{const{css:t}=e,n=_e(e,{class:t`
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
`,Wa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ga,createComponent:Ha},{title:"Custom Alert ",description:"A custom alert.",code:Fa,createComponent:Ua}],gridItem:Wt},Va=e=>{const t=H(e);return()=>t(Wa)},Ka=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:r=15e3}=t,{div:s}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:g})=>{const x=c.val.findIndex(b=>b.id===p);x!=-1&&(c.val[x].status=g)};return function(g={},...x){const b=({id:f})=>{d({id:f,status:"removing"});const S=c.val.findIndex(D=>D.id===f);S!=-1&&c.val.splice(S,1)},v=({Component:f})=>{const S={id:Math.random().toString(10).split(".")[1],Component:f,status:"inserting"};c.val.length>=i&&b({id:c.val[0].id}),c.val.push(S),setTimeout(()=>b(S),r)},w=f=>s({class:u.item,onclick:()=>b(f)},f.Component());return document.addEventListener("alert.add",f=>v(f.detail)),document.addEventListener("alert.remove",f=>b(f.detail)),s({class:T(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,s(),w))}},Za=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Ka(e,{deleteAfterDuration:2e4}),i=X(e),r=_e(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Xa=`import { Context } from "@grucloud/bau-ui/context";
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
`,qa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Xa,createComponent:Za}]},Ya=e=>{const t=H(e);return()=>t(qa)},Ja=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ne(e),r=X(e),s=n`
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
  `,l=t.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(r("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),r("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),s({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},tr=`import animate from "@grucloud/bau-ui/animate";
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
`,nr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Qa,createComponent:Ja},{title:"Component hide and show",description:"Hide and show a component",code:tr,createComponent:er}]},or=e=>{const t=H(e);return()=>t(nr)};function Vt(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=d=>{r.val=!1,s.val=!0},u=o`
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
  `;return function(...p){let[{color:g,variant:x="outline",size:b="md",width:v=30,height:w=30,...f},...S]=W(p);return a({class:T(u,t==null?void 0:t.class,f.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:v,height:w,onload:c,onerror:l,class:T(g,x,b,u,t==null?void 0:t.class,f.class),...f}))}}const Kt=e=>{const{css:t}=e,n=Vt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},ar=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Vt(e,{class:n`
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
`,sr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:rr,createComponent:ar}],gridItem:Kt},ir=e=>{const t=H(e);return()=>t(sr)};function ot(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,r=Pe(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...g},...x]=W(l);const b=f=>{w.style.opacity=1,w.showModal();const S=d.getBoundingClientRect(),D=w.getBoundingClientRect();S.x<a.innerWidth/2?w.style.left=S.left+"px":w.style.left=S.right-D.width+"px",S.y<a.innerHeight/2?w.style.top=S.top+S.height+"px":w.style.top=S.top-D.height+"px"},v=f=>{const S=()=>{w.close(),w.removeEventListener("transitionend",S)};w.addEventListener("transitionend",S),w.style.opacity=0},w=i({role:"presentation",class:T("popover",s,t==null?void 0:t.class,g==null?void 0:g.class),onclick:f=>f.target===w&&(v(),p==null?void 0:p.call())},r(u));return w.closeDialog=v,w.openDialog=b,w}}const cr=()=>ee.map(e=>`
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
`);function Re(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(s){const{size:c="md",variant:l="outline",color:u="neutral",disabled:d,...p}=s;return a({type:"text",...p,disabled:d,class:T("input",c,u,l,i,d&&"disabled",t==null?void 0:t.class,p.class)})}}const lr=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Zt(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=ot(e),s=X(e),c=Re(e),l=we(e),u=o`
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
  `;return function(...p){let[{variant:g="outline",color:x,size:b="md",id:v,label:w,placeholder:f,Option:S,options:D,getOptionLabel:N=({label:R})=>R,...$},...M]=W(p);const I=n.state(""),A=n.state(""),L=n.state(!1),F=n.state(0),Q=()=>{L.val=!1},z=n.state(D),V=()=>{Z.openDialog(),L.val=!0,A.val="",z.val=D},U=()=>{Z.closeDialog(),L.val=!1,A.val=""},y=R=>{const{value:P}=R.target;A.val=P,P?z.val=D.filter(K=>N(K).match(new RegExp(`${P}`,"i"))):z.val=D},m=R=>{L.val?U():V()},h=({option:R,index:P})=>K=>{I.val=N(R),F.val=P,U()},C=R=>{switch(console.log("onkeydown",R.key,F.val),R.key){case"Escape":U();break;case"ArrowDown":F.val<z.val.length-1?F.val++:F.val=0;break;case"ArrowUp":F.val<=0?F.val=z.val.length-1:F.val--;break;case"Enter":I.val=N(z.val[F.val]),A.val="",U();break}},E=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":L,"aria-label":w,onclick:m,variant:g,color:x,size:b},()=>!I.val&&w,I),_=c({id:v,value:A,placeholder:f,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":L,oninput:y,onkeydown:C,variant:g,color:x,size:b}),Z=r({id:v,triggerEl:E,contentEl:(()=>a({class:T(g,x,b,"content")},_,()=>l({class:T(g,x,b)},z.val.map((R,P)=>i({class:()=>T(F.val==P&&"active"),onclick:h({option:R,index:P})},S(R))))))(),onClose:Q});return a({...$,class:T("autocomplete",u,t==null?void 0:t.class,$==null?void 0:$.class)},E,Z)}}const Xt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Zt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
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
`,pr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:dr,createComponent:ur}],gridItem:Xt},mr=e=>{const t=H(e);return()=>t(pr)};function qt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:d,...p},...g]=W(s);return a({...p,class:T("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:T(c,l,u)},d),...g)}}const Yt=e=>{const t=qt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},gr=e=>{const{bau:t}=e,{section:n}=t.tags,o=qt(e);return()=>n(o({content:"10"},"☏"))},br=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,hr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:br,createComponent:gr}],gridItem:Yt},fr=e=>{const t=H(e);return()=>t(hr)};function Jt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:r}=n.tags,s=X(e),c=o`
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
  `;return function(...u){let[{color:d="neutral",variant:p="plain",size:g="md",items:x,...b},...v]=W(u);return a({...b,class:T(c,t==null?void 0:t.class,b==null?void 0:b.class)},x.map(({href:w,name:f})=>i((w?s:r)({href:w,color:d,variant:p,size:g,class:T(d,p,g)},f))))}}const Qt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Jt(e);return o=>n({...o,...t})},vr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Jt(e);return()=>n(a(o))},xr=`import breadcrumbs, {
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
`,wr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:xr,createComponent:vr}],gridItem:Qt},yr=e=>{const t=H(e);return()=>t(wr)},en=e=>{const t=X(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},Cr=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Sr=`import button from "@grucloud/bau-ui/button";
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
`,Er={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Sr,createComponent:Cr}],gridItem:en},kr=e=>{const t=H(e);return()=>t(Er)},Tr=()=>ee.map(e=>`
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
    ${Tr()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:u,...d},...p]=W(s);return a({...d,class:T("button-group",c,u,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const tn=e=>{const t=["ONE","TWO","THREE"],n=X(e),o=at(e);return a=>o({...a},t.map(i=>n(a,i)))},Ar=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=X(e),i=at(e),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},Ir=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Dr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Ir,createComponent:Ar}],gridItem:tn},Mr=e=>{const t=H(e);return()=>t(Dr)};function nn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:d,...p},...g]=W(c);return a({...p,type:"date",class:T("calendar",r,l,u,d,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}const on=e=>{const t=nn(e);return n=>t({...n})},Nr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=nn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},$r=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Br={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:$r,createComponent:Nr}],gridItem:on},Pr=e=>{const t=H(e);return()=>t(Br)};function Or(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,r=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:d="md",slides:p,Slide:g,Previous:x,Next:b,...v}]=W(c);const w=()=>{r.val<=0?r.val=p.length-1:r.val--},f=()=>{r.val>=p.length-1?r.val=0:r.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*r.val}%);`},p.map(g));return a({...v,class:T("carousel",d,i,t==null?void 0:t.class,v==null?void 0:v.class)},a({class:T("control","control-previous"),onclick:w},x()),a({class:T("control","control-next"),onclick:f},b()),S)}}const _r=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Rr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=X(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),r=({src:u})=>a({src:u}),s=Or(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(s({slides:_r,Slide:r,Previous:c,Next:l}))},Lr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,jr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Lr,createComponent:Rr}]},zr=e=>{const t=H(e);return()=>t(jr)},an=e=>{const t=$e(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=$e(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Gr=`import chip from "@grucloud/bau-ui/chip";
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
`,Ur={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Gr,createComponent:Hr}],gridItem:an},Fr=e=>{const t=H(e);return()=>t(Ur)};function rn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...d},...p]=W(s);return a({type:"checkbox",required:"required",...d,class:T(i,c,l,u,t==null?void 0:t.class,d==null?void 0:d.class)})}}const sn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=rn(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Wr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=rn(e),r=t.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
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
`,Kr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Vr,createComponent:Wr}],gridItem:sn},Zr=e=>{const t=H(e);return()=>t(Kr)},Xr=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=nt(e),i=X(e),r=()=>i("Header"),s=()=>o("Content");return()=>n(a({Header:r,Content:s}))},qr=`import button from "@grucloud/bau-ui/button";
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
`,Yr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:qr,createComponent:Xr}]},Jr=e=>{const t=H(e);return()=>t(Yr)};function Qr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u,openState:d,...p},...g]=W(s);return a({class:T(i,t==null?void 0:t.class,p.class)},a({class:()=>T("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>T("content",d.val&&"content-open")},g))}}const es=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Qr(e),r=X(e),s=Et(e);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},ts=`import drawer from "@grucloud/bau-ui/drawer";
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
`,ns={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:ts,createComponent:es}]},os=e=>{const t=H(e);return()=>t(ns)},cn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Ye(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},as=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Ye(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},rs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,ss={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:rs,createComponent:as}],gridItem:e=>cn(e,{base:"/components/drillDownMenu",hashBased:!0})},is=e=>{const t=H(e);return()=>t(ss)};function ln(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
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
    `};return function(u,...d){const{variant:p="outline",color:g="neutral",size:x="md",Component:b,disabled:v,...w}=u;return a({class:T(c.base,v&&c.disabled,t==null?void 0:t.class,u.class)},r({class:T(p,g,x)},b({disabled:v}),s({type:"file",disabled:v,...w})),i({class:"filename-display"}))}}const un=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),u=ln(e),d=g=>{const x=g.target.files[0];x?l.val=x.name:l.val="No file selected"},p=({disabled:g})=>s({class:T(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return g=>u({Component:p,name:"file",accept:"text/*",onchange:d,...g})},cs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,u=n.state("No file selected"),d=ln(e),p=x=>{const b=x.target.files[0];b?u.val=b.name:u.val="No file selected"},g=({disabled:x})=>c({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,x&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>s(d({Component:g,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},ls=`import classNames from "@grucloud/bau-css/classNames";
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
`,us={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ls,createComponent:cs}],gridItem:un},ds=e=>{const t=H(e);return()=>t(us)},dn=e=>{const t=Re(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},ps=e=>{const{bau:t}=e,{section:n}=t.tags,o=Re(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},ms=`import input from "@grucloud/bau-ui/input";
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
`,gs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ms,createComponent:ps}],gridItem:dn},bs=e=>{const t=H(e);return()=>t(gs)};function pn(e,t){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,r=()=>ee.map(l=>`
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
  `;return function(...u){let[{color:d="neutral",variant:p="plain",size:g="md",running:x,...b}]=W(u);return i({...b,role:"progressbar",class:{deps:[x],renderProp:()=>v=>T("linearProgress",g,d,c,v&&"running",t==null?void 0:t.class,b==null?void 0:b.class)}})}}const mn=e=>{const t=pn(e);return n=>t({...n,running:!0})},hs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=X(e),i=pn(e),r=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),o,i({running:r}))},fs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,vs={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:fs,createComponent:hs}],gridItem:mn},xs=e=>{const t=H(e);return()=>t(vs)},De={sm:12,md:16,lg:24},ws=()=>ee.map(e=>`
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
`);function Le(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:r}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
  `;return function({size:u="md",color:d="primary",variant:p="outline",visibility:g=!0,...x}={}){const b=o`
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
      ${ws()}
    `;return i({class:{deps:[g],renderProp:()=>v=>T("spinner",b,d,p,v==!1?"":"visibility",t==null?void 0:t.class,x.class)},version:"1.1",x:"0px",y:"0px",width:De[u],height:De[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...x},r({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function gn(e,t){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,r=a`
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
  `;return function(...l){let[{color:u,variant:d="plain",size:p="md",loading:g,...x},...b]=W(l);const v=X(e),w=Le(e);return n.bind({deps:[g],render:()=>f=>v({...x,class:T("loadingButton",p,d,u,s,f&&"loading",t==null?void 0:t.class,x==null?void 0:x.class)},w({size:p,variant:d,color:u,visibility:f}),i({class:f&&"loading"},b))})}}const bn=e=>{const t=gn(e);return n=>t({...n,loading:!0},"Save")},ys=e=>{const{bau:t}=e,{section:n}=t.tags,o=gn(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Cs=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,Ss={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Cs,createComponent:ys}],gridItem:bn},Es=e=>{const t=H(e);return()=>t(Ss)},ks=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ts=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},ks.map(r))},As=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Is=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,r=we(e),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},As.map(s)))},Ds=`import list from "@grucloud/bau-ui/list";
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
`,Ms={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ds,createComponent:Is}],gridItem:Ts},Ns=e=>{const t=H(e);return()=>t(Ms)};function hn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,r=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:d="md",...p},...g]=W(c);return a({class:T("modal",r,l,u,d,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}const fn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s=X(e),c=hn(e),l=()=>o(Array(10).fill("").map((d,p)=>r(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(s({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),s({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(s({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},$s=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s="neutral",c=X(e),l=hn(e),u=()=>o(Array(10).fill("").map((p,g)=>r(g+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:s,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Bs=`import modal from "@grucloud/bau-ui/modal";
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
`,Ps={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Bs,createComponent:$s}],gridItem:fn},Os=e=>{const t=H(e);return()=>t(Ps)},_s=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,r=X(e),s=ot(e),c=()=>r({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=s({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},Rs=`import popover from "@grucloud/bau-ui/popover";
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
`,Ls={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Rs,createComponent:_s}]},js=e=>{const t=H(e);return()=>t(Ls)};function zs(e,t){const{bau:n,css:o,config:a}=e,{div:i,a:r,span:s,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:g,href:x})=>r({href:`${a.base}${x}`},s({class:"sublabel"},d),i({class:`label ${d}`},g??p));return function(...p){let[{color:g,variant:x="plain",size:b="md",data:v={},...w}]=W(p);const{next:f,previous:S}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...w,class:T("paginationNavigation",b,l,t==null?void 0:t.class,w==null?void 0:w.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(f==null?void 0:f.href)&&u({text:"Next"})(f))}}const Hs=e=>{const{bau:t}=e,{section:n}=t.tags,o=zs(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Gs=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Us={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Gs,createComponent:Hs}]},Fs=e=>{const t=H(e);return()=>t(Us)},Ws=e=>{const{bau:t}=e,{div:n}=t.tags,o=Pe(e);return a=>o({...a},n(`Paper ${a.size??""}`))},Vs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Pe(e);return()=>n(a({size:"md"},o("My content")))},Ks=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Zs={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Ks,createComponent:Vs}],variantColorTableDisable:!0,gridItem:Ws},Xs=e=>{const t=H(e);return()=>t(Zs)};function vn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:d="md",...p}]=W(c);return a({...p,type:"radio",class:T("radio-button",d,l,u,r,t==null?void 0:t.class,p==null?void 0:p.class)})}}const xn=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=vn(e);return r=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),o("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},qs=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=vn(e),r=t.state("one"),s=({target:c})=>r.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:s})),n("Two",i({id:"two",name:"radio",value:r,oninput:s})),o("Choice: ",r))},Ys=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Js={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Ys,createComponent:qs}],gridItem:xn},Qs=e=>{const t=H(e);return()=>t(Js)},ei=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function je(e,t){const{bau:n,css:o}=e,{div:a,li:i,select:r,option:s}=n.tags,c=X(e),l=ot(e),u=we(e),d=o`
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
    ${ei()}
  `;return function(...g){let[{color:x="neutral",variant:b="outline",size:v="md",label:w,Option:f,options:S,getOptionLabel:D=({label:E})=>E,...N},...$]=W(g);const M=n.state(""),I=n.state(!1),A=n.state(0),L=()=>{h.openDialog(),h.focus(),I.val=!0},F=()=>{h.closeDialog(),I.val=!1},Q=()=>{I.val=!1},z=E=>{I.val?F():L(),E.preventDefault()},V=({option:E,index:_})=>O=>{M.val=D(E),C.value=M.val,C.setCustomValidity(""),A.val=_,F(),O.preventDefault()},U=E=>{switch(E.preventDefault(),E.key){case"Escape":F();break;case"ArrowDown":A.val<S.length-1?A.val++:A.val=0;break;case"ArrowUp":A.val<=0?A.val=S.length-1:A.val--;break;case"Enter":I.val?(M.val=D(S[A.val]),F()):L();break}},y=()=>u({tabindex:"0",class:T(x,b)},S.map((E,_)=>i({class:()=>T(A.val==_&&"active"),onclick:V({option:E,index:_})},f(E)))),m=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":I,"aria-label":w,onclick:z,color:x,variant:b,size:v},()=>!M.val&&w,M),h=l({triggerEl:m,contentEl:y(),onClose:Q}),C=r(N,s({value:""},"--Select Category--"),S.map(E=>s(D(E))));return a({...N,class:T("select",x,v,d,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:U},C,m,h)}}const wn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=je(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},ti=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=je(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
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
`,oi=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=je(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],r=s=>n({},s);return()=>o(a({options:i,Option:r,label:"Select a region",getOptionLabel:s=>s}))},ai=`import select from "@grucloud/bau-ui/select";
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
`,ri={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:ni,createComponent:ti},{title:"Select AWS region",description:"Select the AWS region",code:ai,createComponent:oi}],gridItem:wn},si=e=>{const t=H(e);return()=>t(ri)};function ze(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    ${(()=>ee.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:d,...p},...g]=W(c);return a({...p,type:"range",class:T("slider",l,u,d,r,t==null?void 0:t.class,p.class)},...g)}}const yn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=ze(e);return i=>a({...i,oninput:o})},ii=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,r=t.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=ze(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},ci=`import slider from "@grucloud/bau-ui/slider";
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
`,li=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=ze(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},ui=`import slider from "@grucloud/bau-ui/slider";
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
`,di=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=ze(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},pi=`import slider from "@grucloud/bau-ui/slider";
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
`,mi={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ci,createComponent:ii},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ui,createComponent:li},{title:"Vertical Mark",description:"A vertical slider with marks.",code:pi,createComponent:di}],gridItem:yn},gi=e=>{const t=H(e);return()=>t(mi)},Cn=e=>{const t=Le(e);return n=>t({...n})},bi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Le(e);return()=>n(o({}))},hi=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,fi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:hi,createComponent:bi}],gridItem:Cn},vi=e=>{const t=H(e);return()=>t(fi)},xi=()=>ee.map(e=>`
`).join(`
`);function Sn(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:r,span:s}=n.tags,c=o`
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
    ${xi()}
  `;return function(...u){let[{color:d,variant:p="plain",size:g,stepperDefs:x=[],activeStepIndex:b,...v},...w]=W(u);const f=n.state(x.map(($,M)=>({...$,index:M}))),S=n.derive(()=>f.val[b.val]),D=$=>{const{Header:M,disabled:I,name:A,index:L}=$;return r({class:()=>T(S.val.name==A&&"active",b.val<L&&"not-completed",b.val>L&&"completed",I&&"disabled")},s({class:"step-number"},L+1),s({class:"step-label"},()=>M($)))};return a({class:T("stepper",p,g,d,c,t==null?void 0:t.class,v.class)},n.loop(f,i(),D),n.bind({deps:[S],render:()=>$=>$.Content?$.Content({}):""}))}}const wi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,r=Sn(e),s=X(e),c=({name:x})=>x,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},g=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},s({onclick:d,variant:"outline",color:"primary"},"Previous"),s({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},r({stepperDefs:l,activeStepIndex:u}),g())},yi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Ci=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:r}=t.tags,{svg:s,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=X(e);return function({onclickProvider:d}){return a(r("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({onclick:d("AWS"),variant:"outline",color:"primary"},s({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({onclick:d("Azure"),variant:"outline",color:"primary"},s({width:261,height:90,viewBox:"0 0 261 75",fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`})))))}},Si=e=>{const{bau:t}=e,{span:n}=t.tags,o=je(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=r=>n(r);return function(s){return o({Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...s})}},Ei=e=>{const{bau:t,css:n}=e,{section:o,form:a,h1:i,header:r,footer:s,p:c,label:l,i:u}=t.tags,d=X(e),p=Re(e),g=Si(e);return function({onclickPrevious:b,onclickNext:v}){return a({name:"config-aws",onsubmit:f=>{f.preventDefault(),v()},"data-infra-create":!0,class:n`
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
        `},r(i("AWS Configuration"),c("Please provide the following information to create and scan a new infrastructure")),o(l("Infrastructure Name",p({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),l("Access Key Id",p({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),l("Secret Key",p({placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),l("Region",g({name:"region",required:"required",title:"Select an AWS region",oninvalid:f=>{f.target.setCustomValidity("Please select an AWS region")}}))),s({class:n`
            display: flex;
            gap: 1rem;
          `},d({onclick:b,variant:"outline",color:"primary"},u("◀"),"Previous"),d({type:"submit",variant:"outline",color:"primary"},"Next",u("▶"))))}},ki=e=>{const{bau:t,css:n}=e,{section:o,h1:a,footer:i}=t.tags,r=X(e);return function({onclickPrevious:c,onclickNext:l}){return o(a("Azure Configuration"),i({class:n`
            display: flex;
            gap: 1rem;
          `},r({onclick:c,variant:"outline",color:"primary"},"Previous"),r({onclick:l,variant:"outline",color:"primary"},"Next")))}},Ti=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,r=Sn(e),s=Ci(e),c=Ei(e),l=ki(e),u=t.state("AWS"),d=t.state(1),p=({name:f})=>f,g=f=>()=>{u.val=f,d.val++},b=[{name:"Provider Selection",Header:p,Content:()=>s({onclickProvider:g}),enter:async()=>{u.val=""}},{name:"Configuration",Header:()=>`Configuration ${u.val}`,Content:()=>{switch(u.val){case"AWS":return c({onclickPrevious:v,onclickNext:w});case"Azure":return l({onclickPrevious:v,onclickNext:w})}}},{name:"Scan",Header:p,Content:()=>a(i("My stepper 3 Content"))}],v=()=>{d.val>0&&d.val--},w=()=>{b.length>d.val+1&&d.val++};return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},r({stepperDefs:b,activeStepIndex:d}))},Ai=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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

  const providerNameState = bau.state("AWS");
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
`,Ii={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:yi,createComponent:wi},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Ai,createComponent:Ti}]},Di=e=>{const t=H(e);return()=>t(Ii)},Mi=()=>ee.map(e=>`
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
    ${Mi()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u="md",...d},...p]=W(s);return a({...d,class:T("switch",i,c,l,u,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const kn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=En(e);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Ni=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,r=En(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},$i=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Bi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:$i,createComponent:Ni}],gridItem:kn},Pi=e=>{const t=H(e);return()=>t(Bi)},Oi=()=>ee.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ye(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:r,li:s}=n.tags,c=o`
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
    ${Oi()}
  `;return function(...u){let[{color:d,variant:p="plain",size:g,...x},...b]=W(u);const v=n.state(a),w=n.state(a[0]),f=N=>v.val.find($=>$.name==N),S=N=>{const{Header:$,disabled:M,name:I}=N;return s({class:()=>T(w.val.name==I&&"active",M&&"disabled"),onclick:A=>A.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:I},bubbles:!0}))},$(N))},D=i({class:T("tabs",p,g,d,c,t==null?void 0:t.class,x.class)},n.loop(v,r(),S),()=>w.val.Content?w.val.Content({}):"");return D.addEventListener("tab.select",N=>{var I,A;const{tabName:$}=N.detail,M=f($);M&&((I=w.val.exit)==null||I.call(),w.val=M,(A=M.enter)==null||A.call())},!1),D.addEventListener("tab.add",N=>{var M;const{tab:$}=N.detail;(M=$.enter)==null||M.call(),v.val.push($)},!1),D.addEventListener("tab.remove",N=>{var M;const $=v.val.findIndex(I=>I.name==N.detail.tabName);$>0&&((M=v.val[$].exit)==null||M.call(),v.val.splice($,1))},!1),D}}const Tn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},_i=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Ri=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Li=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=ye(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},ji=`import tabs from "@grucloud/bau-ui/tabs";
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
`,An=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},zi=e=>{const{css:t}=e,n=ye(e,{tabDefs:An(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Hi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Gi=e=>{const{css:t}=e,n=An(e),o=ye(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Ui=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Fi={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Ri,createComponent:_i},{title:"Extended Tabs",description:"An extended tabs.",code:ji,createComponent:Li},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Hi,createComponent:zi},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Ui,createComponent:Gi}],gridItem:Tn},Wi=e=>{const t=H(e);return()=>t(Fi)};function Ce(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=W(c);return i({...l,class:T("table-container",r,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Vi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags;function d(v,w,f,S,D){return{name:v,calories:w,fat:f,carbs:S,protein:D}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:v,calories:w})=>r(i(v),i({class:n`
            text-align: right;
          `},w)),x=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ce(e,{class:n`
      max-width: 650px;
    `});return()=>o(b(s(u("Basic Table"),x(),l(p.map(g)))))},Ki=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Zi=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Xi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,d=({name:x,calories:b})=>r(i(x),i({class:n`
            text-align: right;
          `},b)),p=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(s(u("Table Dense"),p(),l(Zi.map(d)))))},qi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Yi=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Ji=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,d=({name:x,calories:b})=>r(i(x),i({class:n`
            text-align: right;
          `},b)),p=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ce(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(s(u("Table Zebra"),p(),l(Yi.map(d)))))},Qi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,ec={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Ki,createComponent:Vi},{title:"Dense",description:"A dense table.",code:qi,createComponent:Xi},{title:"Zebra",description:"A zebra table.",code:Qi,createComponent:Ji}]},tc=e=>{const t=H(e);return()=>t(ec)},nc=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:r,article:s}=t.tags,c=Ht(e),l=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>r({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},oc=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,ac={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:oc,createComponent:nc}]},rc=e=>{const t=H(e);return()=>t(ac)};function In(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=at(e),r=X(e),s=Le(e),c=o`
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
  `,l=({label:x,icon:b,...v})=>r({"aria-label":x,title:x,...v},b),u=({count:x,totalCount:b,page:v,rowsPerPage:w})=>a({class:"pages-numbers"},Number(v-1)*Number(w)+(x>0?1:0),"-",Math.min(v*w,b)," of ",b),d=({count:x,page:b,rowsPerPage:v})=>a({class:"pages-numbers"},(b-1)*v+(x>0?1:0),"-",b*v),p=x=>x<=1,g=(x,b,v)=>x>=Math.ceil(b/v);return function(...b){let[{count:v=0,totalCount:w=0,page:f=1,rowsPerPage:S=50,onPageChange:D,isLoading:N=!1,disableFirst:$=()=>p(f),disablePrevious:M=()=>p(f),disableNext:I=()=>g(f,w,S),disableLast:A=()=>g(f,w,S),...L},...F]=W(b);const Q=Math.max(0,Math.ceil(w/S)),z=D({page:1}),V=D({page:f-1}),U=D({page:f+1}),y=D({page:Q}),m=[{label:"First",icon:"⟪",onclick:z,disabled:$()},{label:"Previous",icon:"⟨",onclick:V,disabled:M()},{label:"Next",icon:"⟩",onclick:U,disabled:I()},{label:"Last",icon:"⟫",onclick:y,disabled:A()}];return a({...L,class:T("table-pagination",c,N&&"disabled",t==null?void 0:t.class,L==null?void 0:L.class)},s({class:"spinner",visibility:N,size:"md"}),w>0?u({count:v,totalCount:w,page:f,maxPages:Q,rowsPerPage:S}):d({count:v,page:f,maxPages:Q,rowsPerPage:S}),i({variant:"outline",color:"neutral"},m.map(h=>l({...h,variant:"outline",color:"neutral"}))))}}const sc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),ic=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=t.tags,l=sc(45),u=({name:f,email:S})=>i(a(f),a(S)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=In(e),g=Ce(e,{class:n`
      max-width: 650px;
    `}),x=t.state(l),b=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=t.derive(()=>x.val.slice(b.val.page*b.val.rowsPerPage,(b.val.page+1)*b.val.rowsPerPage)),w=({page:f})=>S=>{b.val.page=f};return()=>g(r(d(),()=>c(v.val.map(u))),()=>p({...b.val,onPageChange:w}))},cc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),g=t.derive(()=>d.val.length),x=t.state(1),b=t.state(10),v=t.derive(()=>d.val),w=A=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(A).toString()}`,f=({page:A})=>L=>{x.val=A,S(w({page:A,per_page:b.val}))};S(w({page:1,per_page:b.val}));async function S(A){try{u.val=!0;const L=await fetch(A,{});if(L.ok){const F=await L.json();d.val=F;return}throw L}catch(L){p.val=L.message}finally{u.val=!1}}const D=({name:A,description:L,stargazers_count:F})=>i(a(A),a(L),a({class:n`
            text-align: right;
          `},F)),N=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),$=In(e),M=Ce(e,{class:n`
      min-width: 650px;
    `}),I=({message:A})=>l(A);return()=>M(()=>$({rowsPerPage:b.val,page:x.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:f,disableNext:()=>!1}),r(N(),()=>p.val&&I({message:p.val}),()=>c(v.val.map(D))))},lc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:r,tr:s}=t.tags,c=ic(e),l=cc(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Se(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{color:l,variant:u,size:d="md",selected:p=!1,disabled:g,onChange:x,...b},...v]=W(c);return i({type:"button",...b,"aria-pressed":{deps:[p],renderProp:()=>w=>w},class:{deps:[p],renderProp:()=>w=>T("toggle",d,l,u,r,w&&"selected",t==null?void 0:t.class,b==null?void 0:b.class)},disabled:g},v)}}const Dn=e=>{const{bau:t}=e,n=Se(e);return console.log("grid item"),o=>{const a=t.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},uc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Se(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},dc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,pc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:dc,createComponent:uc}],gridItem:Dn},mc=e=>{const t=H(e);return()=>t(pc)},gc=()=>ee.map(e=>`
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
    ${gc()}
  `;return function(...s){let[{color:c,variant:l="plain",size:u="md",exclusive:d=!1,onChange:p=()=>{},...g},...x]=W(s);const b=new Set,v=w=>{const{value:f}=w.target;d?(b.clear(),b.add(f)):b.has(f)?b.delete(f):b.add(f),p({event:w,values:[...b]})};return a({...g,class:T("toggle-group",u,c,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v},...x)}}const Mn=e=>{const{bau:t}=e,n=rt(e),o=Se(e);return a=>{const i=t.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return n({...a,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:l})=>()=>o({...a,value:l,selected:i.val.includes(l),"area-label":c},c)))}},bc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Se(e),r=rt(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:s,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},hc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,fc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Se(e),r=rt(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:s,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},vc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,xc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:hc,createComponent:bc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:vc,createComponent:fc}],gridItem:Mn},wc=e=>{const t=H(e);return()=>t(xc)};function st(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:d="neutral",variant:p="outline",size:g="md",...x},...b]=W(c);const v=i({class:T("container",...u.split("-"))},i({class:T("content",d,p,g),role:"tooltip"},l)),w=M=>`move-to-${M}`,f=(M,I,A)=>{if(M()){const L=w(I);v.classList.add(L),v.classList.add(I),v.classList.remove(A)}},S=(M,I)=>{const A=w(M);v.classList.contains(A)&&(v.classList.remove(A),v.classList.add(I),v.classList.remove(M))},D=M=>{const I=v.getBoundingClientRect();f(()=>I.x<0,"right","left"),f(()=>I.x+I.width>a.innerWidth,"left","right"),f(()=>I.y<0,"bottom","top"),f(()=>I.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},N=M=>{v.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...x,class:T("tooltip",r,t==null?void 0:t.class,x==null?void 0:x.class),bauMounted:({element:M})=>{M.addEventListener("mouseover",D),M.addEventListener("mouseout",N)},bauUnmounted:({element:M})=>{M.removeEventListener("mouseover",D),M.removeEventListener("mouseout",N)}},...b,v)}}const Nn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,r=X(e),s=st(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},yc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=X(e),r=st(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},Cc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Sc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:r}=t.tags,s=(...d)=>$e(e)({variant:"outline",color:"primary"},d),c=st(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>r({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},s("bottom start")),c({side:"bottom-centered",titleEl:l()},s("bottom centered")),c({side:"bottom-end",titleEl:l()},s("bottom end"))));return()=>u()},Ec=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,kc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Cc,createComponent:yc},{title:"Grid",description:"Various tooltip position",code:Ec,createComponent:Sc}],gridItem:Nn},Tc=e=>{const t=H(e);return()=>t(kc)},$n=e=>{const t=qe(e);return n=>t(n)},Ac=e=>{const{bau:t}=e,{section:n}=t.tags,o=qe(e);return()=>n(o({}))},Ic=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Dc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Ic,createComponent:Ac}],gridItem:$n},Mc=e=>{const t=H(e);return()=>t(Dc)},Nc=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Bn(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:r,li:s,nav:c,div:l}=n.tags,u=Nc({css:o,createGlobalStyles:a}),d=nt(e),p=({depth:g=1,maxDepth:x,color:b,variant:v,size:w})=>f=>{const{children:S,expanded:D}=f,N=n.state(!D),$=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:I=>{S&&(N.val=!N.val)}},i(f.data)),M=()=>r({class:T(b,w)},S.map(p({depth:g+1,maxDepth:x})));return s(d({Header:$,Content:S&&g<x&&M}))};return function({tree:x,maxDepth:b=1/0,size:v="md",variant:w="plain",color:f="neutral",...S}){return c({class:T(u.nav,v,w,f,t==null?void 0:t.class,S.class)},x.children&&r(x.children.map(p({maxDepth:b,color:f,variant:w,size:v}))))}}const Pn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Bn(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},$c=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Bn(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},Bc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Pc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Bc,createComponent:$c}],gridItem:Pn},Oc=e=>{const t=H(e);return()=>t(Pc)},_c=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:r,ul:s,li:c}=t.tags,l=Gt(e),u=X(e),d=[{name:"Accordion",Item:Ut(e)},{name:"Alert",Item:Wt(e)},{name:"Autocomplete",Item:Xt(e)},{name:"Avatar",Item:Kt(e)},{name:"Badge",Item:Yt(e)},{name:"Breadcrumbs",Item:Qt(e)},{name:"Button",Item:en(e)},{name:"Button Group",Item:tn(e)},{name:"Calendar",Item:on(e)},{name:"Checkbox",Item:sn(e)},{name:"Chip",Item:an(e)},{name:"DrillDown Menu",Item:cn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:un(e)},{name:"Input",Item:dn(e)},{name:"Linear Progress",Item:mn(e)},{name:"Loading Button",Item:bn(e)},{name:"Modal",Item:fn(e)},{name:"Radio Button",Item:xn(e)},{name:"Select",Item:wn(e)},{name:"Slider",Item:yn(e)},{name:"Spinner",Item:Cn(e)},{name:"Switch",Item:kn(e)},{name:"Tabs",Item:Tn(e)},{name:"Theme Switch",Item:$n(e)},{name:"Toggle",Item:Dn(e)},{name:"Toggle Group",Item:Mn(e)},{name:"Tooltip",Item:Nn(e)},{name:"Tree View",Item:Pn(e)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},d.map(({name:p})=>c(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(p))))},Rc=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:So(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:Aa(e)})},{path:"components",action:()=>({title:"Component",component:_c(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ra(e)})},{path:"alert",action:()=>({title:"Alert",component:Va(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ya(e)})},{path:"animate",action:()=>({title:"Animate",component:or(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:mr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:ir(e)})},{path:"badge",action:()=>({title:"Badge",component:fr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:yr(e)})},{path:"button",action:()=>({title:"Button",component:kr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Mr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Pr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:zr(e)})},{path:"chip",action:()=>({title:"Chip",component:Fr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Zr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Jr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:os(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:is(e)})},{path:"fileInput",action:()=>({title:"File Input",component:ds(e)})},{path:"input",action:()=>({title:"Input",component:bs(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:xs(e)})},{path:"list",action:()=>({title:"List",component:Ns(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Es(e)})},{path:"modal",action:()=>({title:"Modal",component:Os(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Fs(e)})},{path:"paper",action:()=>({title:"Paper",component:Xs(e)})},{path:"popover",action:()=>({title:"Popover",component:js(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Qs(e)})},{path:"select",action:()=>({title:"Select",component:si(e)})},{path:"slider",action:()=>({title:"Slider",component:gi(e)})},{path:"spinner",action:()=>({title:"Spinner",component:vi(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Di(e)})},{path:"switch",action:()=>({title:"Switch",component:Pi(e)})},{path:"table",action:()=>({title:"Table",component:tc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:rc(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:lc(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Wi(e)})},{path:"toggle",action:()=>({title:"Toggle",component:mc(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:wc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Tc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Mc(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Oc(e)})}]},{path:"pages",action:t=>({title:"Pages",component:To(e)})}],Lc=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),jc=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,r=a.state(),s=t({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=t}=l.resolve({pathname:u});r.val=p({}),document.title=`${d}`}},zc=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};to();const On={title:"Bau",base:"/bau/bau-ui"},le=lo({config:On}),{bau:Hc}=le;le.states={drawerOpen:Hc.state(!0)};zc(le);Wn({routes:Rc({context:le}),onLocationChange:jc({context:le,LayoutDefault:xo(le),config:On}),notFoundRoute:Lc(le)});
