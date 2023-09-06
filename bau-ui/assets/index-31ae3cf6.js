(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Wn=(e,t)=>({...e,paths:[...t,e.path]}),kt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Wn(o,e);return n?[a,...kt({paths:[...e,o.path],routes:n})]:a}),Vn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Kn=({routes:e=[],notFoundRoute:t})=>{const n=kt({routes:e}).map(o=>({...o,regex:Vn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Zn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Kn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Ze=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],qn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Xn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],mt=e=>`var(--color-${e})`,Yn=e=>`var(--color-${e}-lightest)`,Jn=()=>Ze.map(([e])=>`
.outline.${e} {
  border: 2px solid ${mt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Yn(e)};
}
.solid.${e} {
  background-color: ${mt(e)};
}
`).join(`
`),Qn=()=>Ze.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),eo=e=>100-e*10,to=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${eo(t)}%);`).join(`
`),gt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),no=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...qn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Xn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function oo({createGlobalStyles:e},{colorPalette:t=Ze}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>no([n,o])).join(`
`)}
      ${to()}
      ${gt({})}
      ${Jn()}
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
      ${Qn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${gt({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function ao(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let qe=e=>Object.prototype.toString.call(e??0).slice(8,-1),ro=e=>qe(e)=="Object",bt=e=>qe(e)=="Function",We=e=>["Object","Array"].includes(qe(e)),ht=Object.getPrototypeOf,Ve=e=>me(e)?e.val:e,me=e=>e==null?void 0:e.__isState,so=["splice","push","pop","shift","unshift","sort","reverse"],Ae=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const K=e=>!me(e[0])&&ro(e[0])?e:[{},...e];function io(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,r=!1,s,c=C=>n.createElement(C),l=(C,g,v)=>{let S=s;s=g;let E=C(v);return s=S,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(C=>{C.bindings=C.bindings.filter(g=>{var v;return(v=g.element)==null?void 0:v.isConnected}),!C.bindings.length&&!C.computed&&a.delete(C)}),o=void 0}))},d=(C,g,v,S,E,O)=>{var B;if(r){i.add(C);return}for(let F of C.bindings){let{deps:L,element:_,renderInferred:Z,render:Q,renderItem:te}=F;if(te&&g)(B=x(_,S,(...ae)=>w(te(...ae)),v,E,O)[g])==null||B.call();else{let ae=Z?Z({element:_}):Q({element:_,renderItem:te})(...L.map(Ve));ae!==_&&_.replaceWith(F.element=w(ae))}}y(C),u()},p=(C,g,v=[])=>({get(S,E,O){var B;if(s==null||s.add(C),E==="_isProxy")return!0;if(!((B=S[E])!=null&&B._isProxy)&&!me(S[E])&&We(S[E]))S[E]=new Proxy(S[E],p(C,g,[...v,E]));else if(so.includes(E)){let F=S[E];return(...L)=>{let _=F.apply(S,L);return d(C,E,_,L,g,v),_}}return Reflect.get(S,E,O)},set(S,E,O,B){let F=Reflect.set(S,E,O,B);return d(C,"setItem",F,{prop:E,value:O},g,[...v,E]),F}}),m=(C,g)=>new Proxy(g,p(C,g)),x=(C,g,v,S,E,O)=>{let B=()=>C.replaceChildren(...Ae(S,v)),F=L=>C[L]&&C.removeChild(C[L]);return{assign:B,sort:B,reverse:B,setItem:()=>{var _;let L=O[0];(_=C.children[L])==null||_.replaceWith(v(E[L],L))},push:()=>C.append(...Ae(g,(L,_)=>v(L,E.length+_))),unshift:()=>C.prepend(...Ae(g,v)),pop:()=>F("lastChild"),shift:()=>F("firstChild"),splice:()=>{let[L,_,...Z]=g;const{length:Q}=C.children;for(let te=L>=0?Math.min(L+_-1,Q-1):Q-1;te>=(L>=0?L:Q+L);te--)C.children[te].remove();if(Z.length){let te=Z.forEach((ae,He)=>v(ae,L+He));C.children[L]?C.children[L].after(...te):C.append(...te)}}}},h=C=>({oldVal:C,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return s==null||s.add(g),g.valProxy??(g.valProxy=We(C)?m(g,C):C,g.valProxy)},set val(g){let v=this,S=v.val;We(g)?(v.valProxy=m(v,g),d(v,"assign",g)):g!==S&&(v.valProxy=g,d(v)),v.oldVal=S}}),w=C=>C==null||C===!1?c("span"):C.nodeType?C:n.createTextNode(C),f=(C,g)=>{let v=new Set;return g.val=l(C,v),v},b=C=>{let g=h(),v=f(C,g);g.computed=!0;for(let S of v)S.listeners.push({computed:C,deps:v,state:g});return g},y=C=>{for(let g of[...C.listeners])f(g.computed,g.state)},D=(C,...g)=>{if(g.length){let v=[];for(let S of g.flat(1/0))S!=null&&v.push(me(S)?j({deps:[S],render:()=>E=>E}):bt(S)?J({renderInferred:S}):w(S));C.append(...v)}},M={},$=(C,g)=>C&&(Object.getOwnPropertyDescriptor(C,g)??$(ht(C),g)),N=(C,g,v)=>{var S;return M[C+","+g]??(M[C+","+g]=((S=$(v,g))==null?void 0:S.set)??0)},A=(C,g)=>new t.MutationObserver((v,S)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(O=>O===C&&(g({element:C}),S.disconnect(),!0)))}).observe(C.parentNode,{childList:!0}),T=(C,g)=>new t.MutationObserver((v,S)=>v.forEach(E=>g({record:E,element:C}))).observe(C,{childList:!0}),R=C=>new Proxy(function(v,...S){var F;let[E,...O]=K(S),B=C?n.createElementNS(C,v):c(v);for(let[L,_]of Object.entries(E)){if(L.startsWith("bau"))continue;let Z=N(v,L,ht(B))?Q=>B[L]=Q:Q=>B.setAttribute(L,Q);_==null||(me(_)?j({deps:[_],render:()=>()=>(Z(_.val),B)}):bt(_)&&(!L.startsWith("on")||_.isDerived)?J({renderInferred:()=>(Z(_({element:B})),B)}):_.renderProp?j({deps:_.deps,render:()=>()=>(Z(_.renderProp({element:B})(..._.deps.map(Ve))),B)}):Z(_))}return E.bauChildMutated&&T(B,E.bauChildMutated),D(B,...O),(F=E.bauCreated)==null||F.call(E,{element:B}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:B})),E.bauUnmounted&&t.requestAnimationFrame(()=>A(B,E.bauUnmounted)),B},{get:(g,v)=>g.bind(void 0,v)}),V=(C,g,v)=>{C.element=w(v);for(let S of g)me(S)&&(a.add(S),S.bindings.push(C));return C.element},J=({renderInferred:C,element:g})=>{let v=new Set,S=l(C,v,{element:g});return V({renderInferred:C},v,S)},j=({deps:C,element:g,render:v,renderItem:S})=>V({deps:C,render:v,renderItem:S},C,v({element:g,renderItem:S})(...C.map(Ve))),W=(C,g,v)=>j({deps:[C],render:({renderItem:S})=>E=>(g.append(...Ae(E,S)),g),renderItem:v}),U=C=>{r=!0,C(),r=!1,i.forEach(d),i.clear()};return{tags:R(),tagsNS:R,state:h,bind:j,loop:W,derive:b,stateSet:a,batch:U}}const co=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},lo=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},uo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function po(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const r=uo(a,i),s=co(r);return!t.getElementById(s)&&lo(t,e==null?void 0:e.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function mo(e){const t=io(),n=po();return oo(n),{bau:t,...n,tr:o=>o,window,...e}}function I(...e){return e.filter(t=>t).join(" ")}function $e(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:r=a,animationShow:s=a,...c},l){return o({class:I("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!r()||p.getAttribute("cloned"))return;const m=p.cloneNode(!0);m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=p.getAttribute("width"),m.style.height=p.getAttribute("height"),m.style.position="absolute",m.style.animation=r(),u.target.appendChild(m),m.addEventListener("animationend",()=>{var x;return(x=m.parentNode)==null?void 0:x.removeChild(m)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const m=p.getBoundingClientRect();if(p.setAttribute("width",m.width+"px"),p.setAttribute("height",m.height+"px"),s()){p.style.animation=s();const x=()=>{p.removeEventListener("animationend",x),p.style.animation=""};p.addEventListener("animationend",x)}})},...c},l)}}function q(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:u,href:d,...p},...m]=K(r);return(d?n.tags.a:n.tags.button)({...!d&&{type:"button"},...p,class:I("button",a.root,c,l,s,d?a.a:a.button,u&&a.disabled,t==null?void 0:t.class,p.class),disabled:u,href:d},m)}}const ee=["neutral","primary","success","danger","warning"],go=["plain","outline","solid"],bo=["sm","md","lg"],ho="light",fo=()=>ee.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Xe(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,r=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(ho);const l=o`
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
    ${fo()}
  `;return function(...d){let[{color:p,variant:m="outline",size:x="md",...h},...w]=K(d);return i({required:"required",title:"Switch Theme",...h,class:I("theme-switch",p,m,x,l,t==null?void 0:t.class,h.class),type:"checkbox",checked:s()=="dark",onclick:f=>{r(f.target.checked?"dark":"light")}},...w)}}function vo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:r,header:s,h1:c,div:l,a:u,img:d,b:p,ul:m,li:x}=n.tags,{svg:h,path:w}=n.tagsNS("http://www.w3.org/2000/svg"),f=i.drawerOpen,b=q(e,{class:o`
      background: transparent;
    `}),y=Xe(e),D=()=>r(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},w({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),M=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},b({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>f.val=!f.val},D()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),$=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},y(),b({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},M(),$())}}function xo({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:r,ul:s,li:c,p:l,div:u,h1:d}=t.tags,p=({links:h,title:w})=>o({class:n`
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
        `},d(w),s(h.map(({href:f,name:b})=>c(r({href:f},b))))),m=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],x=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:m}),p({title:"Bau Ecosystem",links:x})),u({class:n`
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
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u,...d},...p]=K(s);return a({...d,class:I("list",i,c,l,u,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const Ie="0.3s",Tt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(Tt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},At=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=At(e)(t.children[o]);if(a)return a}},wo=({keyframes:e})=>({hideToLeft:e`
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
   `});function Ye(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:r="",hashBased:s=!1}=t,c=`${i.base}${r}`,l=j=>{var W;return((W=j.parentTree.data)==null?void 0:W.href)??j.parentTree.children[0].data.href},u=({variant:j,color:W,size:U,currentTree:C,data:g})=>y(N({variant:j,color:W,size:U,href:`${c}${l(C)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),N({variant:j,color:W,size:U,href:`${c}${g.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},g.name)),d=({size:j,subTree:{data:{name:W,href:U},children:C=[]}})=>N({size:j,href:`${c}${U}`,"data-ischild":!C.length},W),p=({pathname:j,subTree:W})=>{var U;return j===((U=W==null?void 0:W.data)==null?void 0:U.href)},{renderHeader:m=u,renderMenuItem:x=d,isActive:h=p}=t,{li:w,nav:f,div:b,header:y,a:D}=n.tags,M=$e(e),$=we(e),N=q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:A,hideToRight:T}=wo(e),R=o`
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
  `,V=({variant:j,color:W,size:U,currentTree:C,pathnameState:g})=>{const{children:v,parentTree:S,data:E}=C;return b({class:I("drillDownMenu",j,W,U)},S&&m({variant:j,color:W,size:U,data:E,currentTree:C}),v&&$({class:I(j,W,U)},v.map(O=>w({class:()=>I(O.children&&"has-children",h({pathname:g.val,subTree:O})&&"active")},x({variant:j,color:W,size:U,subTree:O})))))},J=({tree:j,pathname:W})=>{let U=Tt({})(structuredClone(j)),C=At(W)(U);return C||(console.error("drilldown no sub tree",W),C=U),C};return function(W){const{variant:U="plain",color:C="neutral",size:g="md",tree:v,...S}=W,E=n.state(a.location.pathname.replace(c,"")),O=n.derive(()=>J({tree:v,pathname:E.val}));a.document.addEventListener("click",Z=>{const{target:Q}=Z,te=Q.getAttribute("href");if(Q.tagName==="A"&&te&&!te.startsWith("http")){let ae=te.replace(c,"");s||(ae=ae.replace(Q.hash,"")),E.val=ae}});let B=1;const F=Z=>{const{dataset:Q}=Z.target;Q.buttonback=="true"?B=-1:Q.ischild=="false"?B=1:Q.ischild=="true"&&(B=0)},L=Z=>{switch(Z){case 1:return`${A} ${Ie}`;case-1:return`${T} ${Ie}`;default:return""}},_=Z=>{switch(Z){case 1:return`${T} ${Ie} reverse`;case-1:return`${A} ${Ie} reverse`;default:return""}};return f({class:I(R,t==null?void 0:t.class,S.class),onclick:F},M({animationHide:()=>L(B),animationShow:()=>_(B)},()=>V({variant:U,color:C,size:g,currentTree:O.val,pathnameState:E})))}}const yo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function It(e){const{tr:t,bau:n,css:o,config:a,states:i,window:r}=e,{div:s,ul:c,li:l,nav:u,a:d,span:p}=n.tags;let m=!1;const x=Ye(e);return function(){return s({bauMounted:({element:w})=>{r.innerWidth<=640&&(m=!0,i.drawerOpen.val=!1)},onclick:w=>{m&&!w.target.dataset.buttonback&&!w.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:I(o`
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
          `)},x({tree:yo}))}}const Co=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,r=$e(e),s=vo(e),c=It(e),l=xo(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:m}){return i({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>m.val),l())}};function Be(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:d,...p},...m]=K(s);return a({...p,onclick:d,class:I("chip",c,l,u,d&&"clickable",i,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}function So(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:r,p:s}=t.tags;q(e);const c=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},i(u),r(d),s(p))}}function Eo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,r=n`
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
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function ko({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:r,div:s,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:m,size:x})=>s({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},m),r({class:n`
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
              `},x)));return function({data:m=[]}){return o({class:n`
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
          `},m.map(d({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function To(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:r,section:s}=t.tags,c=So(e),l=Eo(e),u=q(e);Be(e);const d=ko(e),p=(...f)=>a({class:n`
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
          `},...f)),m=n``,x=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],w=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:m},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:h}),d({data:x}),w())}}function Ao(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const Io=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:r}=n.tags,s=Ao(e);return()=>o({id:"login"},r(t("Login Examples")),i("Basic"),a(s()))};function Do(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
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
          `},r(t("Pages Examples")),Io(e)()))}}function No(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Dt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Dt(n)}),e}class ft{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Nt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Mo="</span>",vt=e=>!!e.scope,$o=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Bo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Nt(t)}openNode(t){if(!vt(t))return;const n=$o(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){vt(t)&&(this.buffer+=Mo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const xt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Je{constructor(){this.rootNode=xt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=xt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Je._collapse(n)}))}}class Po extends Je{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Bo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ve(e){return e?typeof e=="string"?e:e.source:null}function Mt(e){return de("(?=",e,")")}function Oo(e){return de("(?:",e,")*")}function _o(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ve(n)).join("")}function Ro(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Qe(...e){return"("+(Ro(e).capture?"":"?:")+e.map(o=>ve(o)).join("|")+")"}function $t(e){return new RegExp(e.toString()+"|").exec("").length-1}function Lo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const jo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function et(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ve(o),r="";for(;i.length>0;){const s=jo.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(t)}const zo=/\b\B/,Bt="[a-zA-Z]\\w*",tt="[a-zA-Z_]\\w*",Pt="\\b\\d+(\\.\\d+)?",Ot="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",_t="\\b(0b[01]+)",Ho="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Go=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},xe={begin:"\\\\[\\s\\S]",relevance:0},Uo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xe]},Fo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xe]},Wo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Pe=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Vo=Pe("//","$"),Ko=Pe("/\\*","\\*/"),Zo=Pe("#","$"),qo={scope:"number",begin:Pt,relevance:0},Xo={scope:"number",begin:Ot,relevance:0},Yo={scope:"number",begin:_t,relevance:0},Jo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xe,{begin:/\[/,end:/\]/,relevance:0,contains:[xe]}]}]},Qo={scope:"title",begin:Bt,relevance:0},ea={scope:"title",begin:tt,relevance:0},ta={begin:"\\.\\s*"+tt,relevance:0},na=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var De=Object.freeze({__proto__:null,MATCH_NOTHING_RE:zo,IDENT_RE:Bt,UNDERSCORE_IDENT_RE:tt,NUMBER_RE:Pt,C_NUMBER_RE:Ot,BINARY_NUMBER_RE:_t,RE_STARTERS_RE:Ho,SHEBANG:Go,BACKSLASH_ESCAPE:xe,APOS_STRING_MODE:Uo,QUOTE_STRING_MODE:Fo,PHRASAL_WORDS_MODE:Wo,COMMENT:Pe,C_LINE_COMMENT_MODE:Vo,C_BLOCK_COMMENT_MODE:Ko,HASH_COMMENT_MODE:Zo,NUMBER_MODE:qo,C_NUMBER_MODE:Xo,BINARY_NUMBER_MODE:Yo,REGEXP_MODE:Jo,TITLE_MODE:Qo,UNDERSCORE_TITLE_MODE:ea,METHOD_GUARD:ta,END_SAME_AS_BEGIN:na});function oa(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function aa(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ra(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=oa,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function sa(e,t){Array.isArray(e.illegal)&&(e.illegal=Qe(...e.illegal))}function ia(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ca(e,t){e.relevance===void 0&&(e.relevance=1)}const la=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Mt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ua=["of","and","for","in","not","or","if","then","parent","list","value"],da="keyword";function Rt(e,t,n=da){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Rt(e[i],t,i))}),o;function a(i,r){t&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,pa(c[0],c[1])]})}}function pa(e,t){return t?Number(t):ma(e)?0:1}function ma(e){return ua.includes(e.toLowerCase())}const wt={},ue=e=>{console.error(e)},yt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{wt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),wt[`${e}/${t}`]=!0)},Me=new Error;function Lt(e,t,{key:n}){let o=0;const a=e[n],i={},r={};for(let s=1;s<=t.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=$t(t[s-1]);e[n]=r,e[n]._emit=i,e[n]._multi=!0}function ga(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Me;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Me;Lt(e,e.begin,{key:"beginScope"}),e.begin=et(e.begin,{joinWith:""})}}function ba(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Me;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Me;Lt(e,e.end,{key:"endScope"}),e.end=et(e.end,{joinWith:""})}}function ha(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function fa(e){ha(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),ga(e),ba(e)}function va(e){function t(r,s){return new RegExp(ve(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=$t(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=t(et(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[aa,ia,fa,la].forEach(u=>u(r,s)),e.compilerExtensions.forEach(u=>u(r,s)),r.__beforeBegin=null,[ra,sa,ca].forEach(u=>u(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=Rt(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ve(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(u){return xa(u==="self"?r:u)})),r.contains.forEach(function(u){i(u,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),i(e)}function jt(e){return e?e.endsWithParent||jt(e.starts):!1}function xa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:jt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var wa="11.8.0";class ya extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ke=Nt,Ct=ie,St=Symbol("nomatch"),Ca=7,zt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Po};function c(g){return s.noHighlightRe.test(g)}function l(g){let v=g.className+" ";v+=g.parentNode?g.parentNode.className:"";const S=s.languageDetectRe.exec(v);if(S){const E=T(S[1]);return E||(yt(i.replace("{}",S[1])),yt("Falling back to no-highlight mode for this block.",g)),E?S[1]:"no-highlight"}return v.split(/\s+/).find(E=>c(E)||T(E))}function u(g,v,S){let E="",O="";typeof v=="object"?(E=g,S=v.ignoreIllegals,O=v.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),O=g,E=v),S===void 0&&(S=!0);const B={code:E,language:O};U("before:highlight",B);const F=B.result?B.result:d(B.language,B.code,S);return F.code=B.code,U("after:highlight",F),F}function d(g,v,S,E){const O=Object.create(null);function B(k,P){return k.keywords[P]}function F(){if(!z.keywords){ne.addText(Y);return}let k=0;z.keywordPatternRe.lastIndex=0;let P=z.keywordPatternRe.exec(Y),G="";for(;P;){G+=Y.substring(k,P.index);const X=re.case_insensitive?P[0].toLowerCase():P[0],oe=B(z,X);if(oe){const[se,Un]=oe;if(ne.addText(G),G="",O[X]=(O[X]||0)+1,O[X]<=Ca&&(Te+=Un),se.startsWith("_"))G+=P[0];else{const Fn=re.classNameAliases[se]||se;Z(P[0],Fn)}}else G+=P[0];k=z.keywordPatternRe.lastIndex,P=z.keywordPatternRe.exec(Y)}G+=Y.substring(k),ne.addText(G)}function L(){if(Y==="")return;let k=null;if(typeof z.subLanguage=="string"){if(!t[z.subLanguage]){ne.addText(Y);return}k=d(z.subLanguage,Y,!0,pt[z.subLanguage]),pt[z.subLanguage]=k._top}else k=m(Y,z.subLanguage.length?z.subLanguage:null);z.relevance>0&&(Te+=k.relevance),ne.__addSublanguage(k._emitter,k.language)}function _(){z.subLanguage!=null?L():F(),Y=""}function Z(k,P){k!==""&&(ne.startScope(P),ne.addText(k),ne.endScope())}function Q(k,P){let G=1;const X=P.length-1;for(;G<=X;){if(!k._emit[G]){G++;continue}const oe=re.classNameAliases[k[G]]||k[G],se=P[G];oe?Z(se,oe):(Y=se,F(),Y=""),G++}}function te(k,P){return k.scope&&typeof k.scope=="string"&&ne.openNode(re.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(Z(Y,re.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(Q(k.beginScope,P),Y="")),z=Object.create(k,{parent:{value:z}}),z}function ae(k,P,G){let X=Lo(k.endRe,G);if(X){if(k["on:end"]){const oe=new ft(k);k["on:end"](P,oe),oe.isMatchIgnored&&(X=!1)}if(X){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return ae(k.parent,P,G)}function He(k){return z.matcher.regexIndex===0?(Y+=k[0],1):(Fe=!0,0)}function jn(k){const P=k[0],G=k.rule,X=new ft(G),oe=[G.__beforeBegin,G["on:begin"]];for(const se of oe)if(se&&(se(k,X),X.isMatchIgnored))return He(P);return G.skip?Y+=P:(G.excludeBegin&&(Y+=P),_(),!G.returnBegin&&!G.excludeBegin&&(Y=P)),te(G,k),G.returnBegin?0:P.length}function zn(k){const P=k[0],G=v.substring(k.index),X=ae(z,k,G);if(!X)return St;const oe=z;z.endScope&&z.endScope._wrap?(_(),Z(P,z.endScope._wrap)):z.endScope&&z.endScope._multi?(_(),Q(z.endScope,k)):oe.skip?Y+=P:(oe.returnEnd||oe.excludeEnd||(Y+=P),_(),oe.excludeEnd&&(Y=P));do z.scope&&ne.closeNode(),!z.skip&&!z.subLanguage&&(Te+=z.relevance),z=z.parent;while(z!==X.parent);return X.starts&&te(X.starts,k),oe.returnEnd?0:P.length}function Hn(){const k=[];for(let P=z;P!==re;P=P.parent)P.scope&&k.unshift(P.scope);k.forEach(P=>ne.openNode(P))}let ke={};function dt(k,P){const G=P&&P[0];if(Y+=k,G==null)return _(),0;if(ke.type==="begin"&&P.type==="end"&&ke.index===P.index&&G===""){if(Y+=v.slice(P.index,P.index+1),!a){const X=new Error(`0 width match regex (${g})`);throw X.languageName=g,X.badRule=ke.rule,X}return 1}if(ke=P,P.type==="begin")return jn(P);if(P.type==="illegal"&&!S){const X=new Error('Illegal lexeme "'+G+'" for mode "'+(z.scope||"<unnamed>")+'"');throw X.mode=z,X}else if(P.type==="end"){const X=zn(P);if(X!==St)return X}if(P.type==="illegal"&&G==="")return 1;if(Ue>1e5&&Ue>P.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=G,G.length}const re=T(g);if(!re)throw ue(i.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Gn=va(re);let Ge="",z=E||Gn;const pt={},ne=new s.__emitter(s);Hn();let Y="",Te=0,ce=0,Ue=0,Fe=!1;try{if(re.__emitTokens)re.__emitTokens(v,ne);else{for(z.matcher.considerAll();;){Ue++,Fe?Fe=!1:z.matcher.considerAll(),z.matcher.lastIndex=ce;const k=z.matcher.exec(v);if(!k)break;const P=v.substring(ce,k.index),G=dt(P,k);ce=k.index+G}dt(v.substring(ce))}return ne.finalize(),Ge=ne.toHTML(),{language:g,value:Ge,relevance:Te,illegal:!1,_emitter:ne,_top:z}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:g,value:Ke(v),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:v.slice(ce-100,ce+100),mode:k.mode,resultSoFar:Ge},_emitter:ne};if(a)return{language:g,value:Ke(v),illegal:!1,relevance:0,errorRaised:k,_emitter:ne,_top:z};throw k}}function p(g){const v={value:Ke(g),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return v._emitter.addText(g),v}function m(g,v){v=v||s.languages||Object.keys(t);const S=p(g),E=v.filter(T).filter(V).map(_=>d(_,g,!1));E.unshift(S);const O=E.sort((_,Z)=>{if(_.relevance!==Z.relevance)return Z.relevance-_.relevance;if(_.language&&Z.language){if(T(_.language).supersetOf===Z.language)return 1;if(T(Z.language).supersetOf===_.language)return-1}return 0}),[B,F]=O,L=B;return L.secondBest=F,L}function x(g,v,S){const E=v&&n[v]||S;g.classList.add("hljs"),g.classList.add(`language-${E}`)}function h(g){let v=null;const S=l(g);if(c(S))return;if(U("before:highlightElement",{el:g,language:S}),g.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),s.throwUnescapedHTML))throw new ya("One of your code blocks includes unescaped HTML.",g.innerHTML);v=g;const E=v.textContent,O=S?u(E,{language:S,ignoreIllegals:!0}):m(E);g.innerHTML=O.value,x(g,S,O.language),g.result={language:O.language,re:O.relevance,relevance:O.relevance},O.secondBest&&(g.secondBest={language:O.secondBest.language,relevance:O.secondBest.relevance}),U("after:highlightElement",{el:g,result:O,text:E})}function w(g){s=Ct(s,g)}const f=()=>{D(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function b(){D(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let y=!1;function D(){if(document.readyState==="loading"){y=!0;return}document.querySelectorAll(s.cssSelector).forEach(h)}function M(){y&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",M,!1);function $(g,v){let S=null;try{S=v(e)}catch(E){if(ue("Language definition for '{}' could not be registered.".replace("{}",g)),a)ue(E);else throw E;S=r}S.name||(S.name=g),t[g]=S,S.rawDefinition=v.bind(null,e),S.aliases&&R(S.aliases,{languageName:g})}function N(g){delete t[g];for(const v of Object.keys(n))n[v]===g&&delete n[v]}function A(){return Object.keys(t)}function T(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function R(g,{languageName:v}){typeof g=="string"&&(g=[g]),g.forEach(S=>{n[S.toLowerCase()]=v})}function V(g){const v=T(g);return v&&!v.disableAutodetect}function J(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=v=>{g["before:highlightBlock"](Object.assign({block:v.el},v))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=v=>{g["after:highlightBlock"](Object.assign({block:v.el},v))})}function j(g){J(g),o.push(g)}function W(g){const v=o.indexOf(g);v!==-1&&o.splice(v,1)}function U(g,v){const S=g;o.forEach(function(E){E[S]&&E[S](v)})}function C(g){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),h(g)}Object.assign(e,{highlight:u,highlightAuto:m,highlightAll:D,highlightElement:h,highlightBlock:C,configure:w,initHighlighting:f,initHighlightingOnLoad:b,registerLanguage:$,unregisterLanguage:N,listLanguages:A,getLanguage:T,registerAliases:R,autoDetection:V,inherit:Ct,addPlugin:j,removePlugin:W}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=wa,e.regex={concat:de,lookahead:Mt,either:Qe,optional:_o,anyNumberOfTimes:Oo};for(const g in De)typeof De[g]=="object"&&Dt(De[g]);return Object.assign(e,De),e},ge=zt({});ge.newInstance=()=>zt({});var Sa=ge;ge.HighlightJS=ge;ge.default=ge;const fe=No(Sa),Et="[A-Za-z$_][0-9A-Za-z$_]*",Ea=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ka=["true","false","null","undefined","NaN","Infinity"],Ht=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Gt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ut=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ta=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Aa=[].concat(Ut,Ht,Gt);function Ft(e){const t=e.regex,n=(v,{after:S})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,S)!==-1},o=Et,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,S)=>{const E=v[0].length+v.index,O=v.input[E];if(O==="<"||O===","){S.ignoreMatch();return}O===">"&&(n(v,{after:E})||S.ignoreMatch());let B;const F=v.input.substring(E);if(B=F.match(/^\s*=/)){S.ignoreMatch();return}if((B=F.match(/^\s+extends\s+/))&&B.index===0){S.ignoreMatch();return}}},s={$pattern:Et,keyword:Ea,literal:ka,built_in:Aa,"variable.language":Ta},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},m={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},b={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},y=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,x,h,w,{match:/\$\d+/},d];p.contains=y.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(y)});const D=[].concat(b,p.contains),M=D.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(D)}]),$={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:M},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},A={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ht,...Gt]}},T={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[$],illegal:/%/},V={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function J(v){return t.concat("(?!",v.join("|"),")")}const j={match:t.concat(/\b/,J([...Ut,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},W={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},U={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},$]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[$]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:M,CLASS_REFERENCE:A},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),T,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,x,h,w,b,{match:/\$\d+/},d,A,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[b,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:M}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[$,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},W,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[$]},j,V,N,U,{match:/\$[(.]/}]}}function Ia(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Da=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return fe.registerLanguage("javascript",Ft),fe.registerLanguage("sh",Ia),function({text:r,language:s="js"}){const c=a({class:`hljs language-${s}`});return c.innerHTML=fe.highlight(r,{language:s}).value,o({class:n`
          display: inline-block;
        `},c)}};function Na(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:r,a:s,ul:c,li:l}=t.tags,u=Da(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(s({href:"components"},"Visit the component gallery")),l(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Oe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...d},...p]=K(s);return a({...d,class:I("paper",u,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function Wt(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:r,li:s,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(w,f)=>{let b=null;return(...y)=>{a.clearTimeout(b),b=a.setTimeout(()=>w(...y),f)}},p=o`
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
  `,m=({value:w,id:f,children:b=[]})=>{const y=c({class:()=>u.val==f?"active":"",href:`#${f}`});return y.innerHTML=w,s({class:()=>u.val==f?"active":""},y,b.length>0&&r(b.map(m)))},x=w=>w.tagName.charAt(1),h=({contentEl:w})=>{const f=w.querySelectorAll(l);let b=2,y={},D={children:[]},M=D;const $=M;let N=[M];return[...f].forEach(A=>{const T=x(A);A.setAttribute("id",A.textContent),!A.innerHTML.includes("<button")&&(y={value:A.innerHTML,id:A.id??A.textContent,children:[]},b==T?(D=y,M.children.push(D)):b<T?(N.push(M),M=D,D.children.push(y),D=y):b>T&&(M=N[T-1],N=N.slice(0,T-1),M.children.push(y),D=y),b=T)}),$};return function(...f){let[{color:b,variant:y,size:D="md",contentEl:M,...$}]=K(f);const N=h({contentEl:M}),A=d(()=>{const R=[...M.querySelectorAll(l)].find(V=>{const{top:J,height:j}=V.getBoundingClientRect();if(J+j>60)return!0});R&&(u.val=R==null?void 0:R.id)},100);return i({...$,class:I("tableOfContent",D,y,b,p,t==null?void 0:t.class,$==null?void 0:$.class),bauMounted:()=>{a.addEventListener("scroll",A)},bauUnmounted:()=>{a.removeEventListener("scroll",A)}},N.children&&r(N.children.map(m)))}}const Vt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(r(l(p??""),ee.map(m=>l(m)))),i(go.map(m=>r(l(m),ee.map((x,h)=>s(d({color:x,variant:m},{index:h}))))))))}},Ma=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},bo.map((r,s)=>i({color:"success",variant:"outline",size:r},{index:s})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:r,p:s,h2:c,h3:l,pre:u,code:d}=t.tags;fe.registerLanguage("javascript",Ft);const p=Wt(e),m=Oe(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),x=Vt(e),h=Ma(e),w=({text:f})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:b})=>{b.innerHTML=fe.highlight(f,{language:"js"}).value}}));return function(b){const y=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},r(b.title),s(b.description),b.gridItem&&[c("Variant/Color"),!b.variantColorTableDisable&&b.gridItem&&m(x({Item:b.gridItem(e)})),c("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b.gridItem&&m(h({Item:b.gridItem(e)}))],c("Usage"),l("Import"),w({text:b.importStatement}),c("Examples"),b.examples.map(D=>i(l(D.title),s(D.description),m(D.createComponent(e)()),w({text:D.code}))));return o({class:n`
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
        `},y,p({contentEl:y}))}};function nt(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,r=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?s(l):c(l))};function s(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:d,variant:p="plain",size:m="md",Header:x,Content:h,close:w=!0,...f}]=K(u);const b=n.state(w);return a({...f,class:I("collapsible",m,i,t==null?void 0:t.class,f==null?void 0:f.class)},a({class:()=>I("header",h?b.val?"close":"open":""),onclick:y=>{b.val=!b.val,y.stopPropagation()}},x()),a({class:"content",role:"region",bauMounted:({element:y})=>{b.val&&(y.style.height="0px")},"aria-expanded":({element:y})=>(r({element:y,closeState:b}),!b.val)},h&&h()))}}const $a=()=>ee.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:r,h3:s,button:c}=n.tags,l=o`
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
    ${$a()}
  `;return function(...d){let[{color:p,variant:m="outline",size:x="md",data:h=[],...w}]=K(d);const f=n.state(""),b=nt(e),y=M=>$=>{f.val==M?f.val="":f.val=M},D=M=>{const{Header:$,Content:N,name:A}=M,T=()=>s({class:()=>I(f.val==A&&"active")},c({type:"button","aria-controls":`bau-${A}`,"aria-expanded":({element:V})=>f.val==A},$(M))),R=()=>a({id:`bau-${A}`,"data-state":({element:V})=>f.val==A},N(M));return r({class:I(p,m,x),onclick:y(A)},b({Header:T,Content:R}))};return a({class:I("accordion",l,t==null?void 0:t.class,w.class)},i(h.map(D)))}}const Kt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return r=>i({...r,data:a})},Ba=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=_e(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Pa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Zt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Oa=e=>{const{css:t}=e,n=Zt(e),o=_e(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
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
`,Ra=e=>{const{css:t}=e,n=Zt(e),o=_e(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},La=`import accordion from "@grucloud/bau-ui/accordion";
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
`,ja={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Pa,createComponent:Ba},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:_a,createComponent:Oa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:La,createComponent:Ra}],gridItem:Kt},za=e=>{const t=H(e);return()=>t(ja)},Ha={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ga=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Ua=()=>ee.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Re(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:r}=n.tags;Ga({css:o,createGlobalStyles:a});const s=o`
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
    ${Ua()}
  `,c=q(e),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(d,...p){const{variant:m="outline",color:x="neutral",size:h="md",onRemove:w,...f}=d;return i({...f,class:I(`alert-${m}`,m,x,h,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},r({class:"icon"},Ha[x]),i({class:"content"},...p),w&&l({onclick:w}))}}const qt=e=>{const t=Re(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Fa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Re(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Wa=`import alert from "@grucloud/bau-ui/alert";
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
`,Va=e=>{const{css:t}=e,n=Re(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Ka=`import alert from "@grucloud/bau-ui/alert";
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
`,Za={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Wa,createComponent:Fa},{title:"Custom Alert ",description:"A custom alert.",code:Ka,createComponent:Va}],gridItem:qt},qa=e=>{const t=H(e);return()=>t(Za)},Xa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:r=15e3}=t,{div:s}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:m})=>{const x=c.val.findIndex(h=>h.id===p);x!=-1&&(c.val[x].status=m)};return function(m={},...x){const h=({id:b})=>{d({id:b,status:"removing"});const y=c.val.findIndex(D=>D.id===b);y!=-1&&c.val.splice(y,1)},w=({Component:b})=>{const y={id:Math.random().toString(10).split(".")[1],Component:b,status:"inserting"};c.val.length>=i&&h({id:c.val[0].id}),c.val.push(y),setTimeout(()=>h(y),r)},f=b=>s({class:u.item,onclick:()=>h(b)},b.Component());return document.addEventListener("alert.add",b=>w(b.detail)),document.addEventListener("alert.remove",b=>h(b.detail)),s({class:I(u.stack,t==null?void 0:t.class,m.class)},n.loop(c,s(),f))}},Ya=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Xa(e,{deleteAfterDuration:2e4}),i=q(e),r=Re(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Ja=`import { Context } from "@grucloud/bau-ui/context";
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
`,Qa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ja,createComponent:Ya}]},er=e=>{const t=H(e);return()=>t(Qa)},tr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=$e(e),r=q(e),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(r({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},nr=`import animate from "@grucloud/bau-ui/animate";
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
`,or=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:r}=t.tags,s=$e(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(r("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),r("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),s({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},ar=`import animate from "@grucloud/bau-ui/animate";
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
`,rr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:nr,createComponent:tr},{title:"Component hide and show",description:"Hide and show a component",code:ar,createComponent:or}]},sr=e=>{const t=H(e);return()=>t(rr)};function Xt(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=d=>{r.val=!1,s.val=!0},u=o`
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
  `;return function(...p){let[{color:m,variant:x="outline",size:h="md",width:w=30,height:f=30,...b},...y]=K(p);return a({class:I(u,t==null?void 0:t.class,b.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:w,height:f,onload:c,onerror:l,class:I(m,x,h,u,t==null?void 0:t.class,b.class),...b}))}}const Yt=e=>{const{css:t}=e,n=Xt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},ir=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Xt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},cr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,lr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:cr,createComponent:ir}],gridItem:Yt},ur=e=>{const t=H(e);return()=>t(lr)};function ot(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,r=Oe(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...m},...x]=K(l);const h=b=>{f.style.opacity=1,f.showModal();const y=d.getBoundingClientRect(),D=f.getBoundingClientRect();y.x<a.innerWidth/2?f.style.left=y.left+"px":f.style.left=y.right-D.width+"px",y.y<a.innerHeight/2?f.style.top=y.top+y.height+"px":(f.style.top=Math.max(0,y.top-D.height)+"px",D.height>y.top&&(f.style.height=y.top+"px"))},w=b=>{const y=()=>{f.close(),f.removeEventListener("transitionend",y)};f.addEventListener("transitionend",y),f.style.opacity=0},f=i({role:"presentation",class:I("popover",s,t==null?void 0:t.class,m==null?void 0:m.class),onclick:b=>b.target===f&&(w(),p==null?void 0:p.call())},r(u));return f.closeDialog=w,f.openDialog=h,f}}const dr=()=>ee.map(e=>`
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
    ${dr()}
  `;return function(s){const{size:c="md",variant:l="outline",color:u="neutral",disabled:d,...p}=s;return a({type:"text",...p,disabled:d,class:I("input",c,u,l,i,d&&"disabled",t==null?void 0:t.class,p.class)})}}const pr=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Jt(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=ot(e),s=q(e),c=ye(e),l=we(e),u=o`
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

    ${pr()}
  `;return function(...p){let[{variant:m="outline",color:x,size:h="md",id:w,label:f,placeholder:b,Option:y,options:D,getOptionLabel:M=({label:L})=>L,...$},...N]=K(p);const A=n.state(""),T=n.state(""),R=n.state(!1),V=n.state(0),J=()=>{R.val=!1},j=n.state(D),W=()=>{F.openDialog(),R.val=!0,T.val="",j.val=D},U=()=>{F.closeDialog(),R.val=!1,T.val=""},C=L=>{const{value:_}=L.target;T.val=_,_?j.val=D.filter(Z=>M(Z).match(new RegExp(`${_}`,"i"))):j.val=D},g=L=>{R.val?U():W()},v=({option:L,index:_})=>Z=>{A.val=M(L),V.val=_,U()},S=L=>{switch(console.log("onkeydown",L.key,V.val),L.key){case"Escape":U();break;case"ArrowDown":V.val<j.val.length-1?V.val++:V.val=0;break;case"ArrowUp":V.val<=0?V.val=j.val.length-1:V.val--;break;case"Enter":A.val=M(j.val[V.val]),T.val="",U();break}},E=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":R,"aria-label":f,onclick:g,variant:m,color:x,size:h},()=>!A.val&&f,A),O=c({id:w,value:T,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":R,oninput:C,onkeydown:S,variant:m,color:x,size:h}),F=r({id:w,triggerEl:E,contentEl:(()=>a({class:I(m,x,h,"content")},O,()=>l({class:I(m,x,h)},j.val.map((L,_)=>i({class:()=>I(V.val==_&&"active"),onclick:v({option:L,index:_})},y(L))))))(),onClose:J});return a({...$,class:I("autocomplete",u,t==null?void 0:t.class,$==null?void 0:$.class)},E,F)}}const Qt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Jt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},mr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=Jt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},gr=`import { Context } from "@grucloud/bau-ui/context";
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
`,br={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:gr,createComponent:mr}],gridItem:Qt},hr=e=>{const t=H(e);return()=>t(br)};function en(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:d,...p},...m]=K(s);return a({...p,class:I("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:I(c,l,u)},d),...m)}}const tn=e=>{const t=en(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},fr=e=>{const{bau:t}=e,{section:n}=t.tags,o=en(e);return()=>n(o({content:"10"},"☏"))},vr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,xr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:vr,createComponent:fr}],gridItem:tn},wr=e=>{const t=H(e);return()=>t(xr)};function nn(e,t){const{bau:n,css:o}=e,{ul:a,li:i,span:r}=n.tags,s=q(e),c=o`
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
  `;return function(...u){let[{color:d="neutral",variant:p="plain",size:m="md",items:x,...h},...w]=K(u);return a({...h,class:I(c,t==null?void 0:t.class,h==null?void 0:h.class)},x.map(({href:f,name:b})=>i((f?s:r)({href:f,color:d,variant:p,size:m,class:I(d,p,m)},b))))}}const on=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=nn(e);return o=>n({...o,...t})},yr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=nn(e);return()=>n(a(o))},Cr=`import breadcrumbs, {
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
`,Sr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Cr,createComponent:yr}],gridItem:on},Er=e=>{const t=H(e);return()=>t(Sr)},an=e=>{const t=q(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Tr=`import button from "@grucloud/bau-ui/button";
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
`,Ar={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Tr,createComponent:kr}],gridItem:an},Ir=e=>{const t=H(e);return()=>t(Ar)},Dr=()=>ee.map(e=>`
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
    ${Dr()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:u,...d},...p]=K(s);return a({...d,class:I("button-group",c,u,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const rn=e=>{const t=["ONE","TWO","THREE"],n=q(e),o=at(e);return a=>o({...a},t.map(i=>n(a,i)))},Nr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=q(e),i=at(e),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},Mr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,$r={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Mr,createComponent:Nr}],gridItem:rn},Br=e=>{const t=H(e);return()=>t($r)};function sn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:d,...p},...m]=K(c);return a({...p,type:"date",class:I("calendar",r,l,u,d,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const cn=e=>{const t=sn(e);return n=>t({...n})},Pr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=sn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},Or=`import calendar from "@grucloud/bau-ui/calendar";
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
`,_r={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Or,createComponent:Pr}],gridItem:cn},Rr=e=>{const t=H(e);return()=>t(_r)};function Lr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,r=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:d="md",slides:p,Slide:m,Previous:x,Next:h,...w}]=K(c);const f=()=>{r.val<=0?r.val=p.length-1:r.val--},b=()=>{r.val>=p.length-1?r.val=0:r.val++},y=a({class:"track",style:()=>`transform: translateX(${-100*r.val}%);`},p.map(m));return a({...w,class:I("carousel",d,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:I("control","control-previous"),onclick:f},x()),a({class:I("control","control-next"),onclick:b},h()),y)}}const jr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],zr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=q(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),r=({src:u})=>a({src:u}),s=Lr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(s({slides:jr,Slide:r,Previous:c,Next:l}))},Hr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Gr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Hr,createComponent:zr}]},Ur=e=>{const t=H(e);return()=>t(Gr)},ln=e=>{const t=Be(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Fr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Be(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Wr=`import chip from "@grucloud/bau-ui/chip";
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
`,Vr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Wr,createComponent:Fr}],gridItem:ln},Kr=e=>{const t=H(e);return()=>t(Vr)};function un(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...d},...p]=K(s);return a({type:"checkbox",required:"required",...d,class:I(i,c,l,u,t==null?void 0:t.class,d==null?void 0:d.class)})}}const dn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=un(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Zr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=un(e),r=t.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:s})))},qr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Xr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:qr,createComponent:Zr}],gridItem:dn},Yr=e=>{const t=H(e);return()=>t(Xr)},Jr=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=nt(e),i=q(e),r=()=>i("Header"),s=()=>o("Content");return()=>n(a({Header:r,Content:s}))},Qr=`import button from "@grucloud/bau-ui/button";
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
`,es={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Qr,createComponent:Jr}]},ts=e=>{const t=H(e);return()=>t(es)};function ns(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u,openState:d,...p},...m]=K(s);return a({class:I(i,t==null?void 0:t.class,p.class)},a({class:()=>I("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>I("content",d.val&&"content-open")},m))}}const os=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=ns(e),r=q(e),s=It(e);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},as=`import drawer from "@grucloud/bau-ui/drawer";
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
`,rs={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:as,createComponent:os}]},ss=e=>{const t=H(e);return()=>t(rs)},pn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Ye(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},is=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Ye(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},cs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,ls={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:cs,createComponent:is}],gridItem:e=>pn(e,{base:"/components/drillDownMenu",hashBased:!0})},us=e=>{const t=H(e);return()=>t(ls)};function rt(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
      display: inline-flex;
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
        padding: 1rem;
        border-radius: var(--global-radius);
        display: inline-flex;
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
    `};return function(u,...d){const{variant:p="outline",color:m="neutral",size:x="md",Component:h,disabled:w,...f}=u;return a({class:I(c.base,w&&c.disabled,t==null?void 0:t.class,u.class)},r({class:I(p,m,x)},h({disabled:w}),s({type:"file",disabled:w,...f})),i({class:"filename-display"}))}}const mn=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),u=rt(e),d=m=>{const x=m.target.files[0];x?l.val=x.name:l.val="No file selected"},p=({disabled:m})=>s({class:I(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return m=>u({Component:p,name:"file",accept:"text/*",onchange:d,...m})},ds=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,u=n.state("No file selected"),d=rt(e),p=x=>{const h=x.target.files[0];h?u.val=h.name:u.val="No file selected"},m=({disabled:x})=>c({class:I(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>s(d({Component:m,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},ps=`import classNames from "@grucloud/bau-css/classNames";
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
`,ms={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ps,createComponent:ds}],gridItem:mn},gs=e=>{const t=H(e);return()=>t(ms)},gn=e=>{const t=ye(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},bs=e=>{const{bau:t}=e,{section:n}=t.tags,o=ye(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},hs=`import input from "@grucloud/bau-ui/input";
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
`,fs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:hs,createComponent:bs}],gridItem:gn},vs=e=>{const t=H(e);return()=>t(fs)};function bn(e,t){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,r=()=>ee.map(l=>`
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
  `;return function(...u){let[{color:d="neutral",variant:p="plain",size:m="md",running:x,...h}]=K(u);return i({...h,role:"progressbar",class:{deps:[x],renderProp:()=>w=>I("linearProgress",m,d,c,w&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const hn=e=>{const t=bn(e);return n=>t({...n,running:!0})},xs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=q(e),i=bn(e),r=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),o,i({running:r}))},ws=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ys={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ws,createComponent:xs}],gridItem:hn},Cs=e=>{const t=H(e);return()=>t(ys)},Ne={sm:12,md:16,lg:24},Ss=()=>ee.map(e=>`
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
  `;return function({size:u="md",color:d="primary",variant:p="outline",visibility:m=!0,...x}={}){const h=o`
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${Ne[u]};
      height: ${Ne[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${Ss()}
    `;return i({class:{deps:[m],renderProp:()=>w=>I("spinner",h,d,p,w==!1?"":"visibility",t==null?void 0:t.class,x.class)},version:"1.1",x:"0px",y:"0px",width:Ne[u],height:Ne[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...x},r({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function fn(e,t){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,r=a`
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
  `;return function(...l){let[{color:u,variant:d="plain",size:p="md",loading:m,...x},...h]=K(l);const w=q(e),f=Le(e);return n.bind({deps:[m],render:()=>b=>w({...x,class:I("loadingButton",p,d,u,s,b&&"loading",t==null?void 0:t.class,x==null?void 0:x.class)},f({size:p,variant:d,color:u,visibility:b}),i({class:b&&"loading"},h))})}}const vn=e=>{const t=fn(e);return n=>t({...n,loading:!0},"Save")},Es=e=>{const{bau:t}=e,{section:n}=t.tags,o=fn(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},ks=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,Ts={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:ks,createComponent:Es}],gridItem:vn},As=e=>{const t=H(e);return()=>t(Ts)},Is=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ds=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=we(e),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},Is.map(r))},Ns=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ms=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,r=we(e),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},Ns.map(s)))},$s=`import list from "@grucloud/bau-ui/list";
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
`,Bs={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:$s,createComponent:Ms}],gridItem:Ds},Ps=e=>{const t=H(e);return()=>t(Bs)};function xn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,r=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:d="md",...p},...m]=K(c);return a({class:I("modal",r,l,u,d,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const wn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s=q(e),c=xn(e),l=()=>o(Array(10).fill("").map((d,p)=>r(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(s({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),s({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(s({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},Os=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s="neutral",c=q(e),l=xn(e),u=()=>o(Array(10).fill("").map((p,m)=>r(m+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:s,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},_s=`import modal from "@grucloud/bau-ui/modal";
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
`,Rs={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:_s,createComponent:Os}],gridItem:wn},Ls=e=>{const t=H(e);return()=>t(Rs)},js=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,r=q(e),s=ot(e),c=()=>r({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=s({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},zs=`import popover from "@grucloud/bau-ui/popover";
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
`,Hs={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:zs,createComponent:js}]},Gs=e=>{const t=H(e);return()=>t(Hs)};function Us(e,t){const{bau:n,css:o,config:a}=e,{div:i,a:r,span:s,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:m,href:x})=>r({href:`${a.base}${x}`},s({class:"sublabel"},d),i({class:`label ${d}`},m??p));return function(...p){let[{color:m,variant:x="plain",size:h="md",data:w={},...f}]=K(p);const{next:b,previous:y}=w;return c({"data-paginationnav":JSON.stringify(w),"aria-label":"pages navigation",...f,class:I("paginationNavigation",h,l,t==null?void 0:t.class,f==null?void 0:f.class)},(y==null?void 0:y.href)&&u({text:"Previous"})(y),(b==null?void 0:b.href)&&u({text:"Next"})(b))}}const Fs=e=>{const{bau:t}=e,{section:n}=t.tags,o=Us(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Ws=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Vs={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Ws,createComponent:Fs}]},Ks=e=>{const t=H(e);return()=>t(Vs)},Zs=e=>{const{bau:t}=e,{div:n}=t.tags,o=Oe(e);return a=>o({...a},n(`Paper ${a.size??""}`))},qs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Oe(e);return()=>n(a({size:"md"},o("My content")))},Xs=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Ys={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Xs,createComponent:qs}],variantColorTableDisable:!0,gridItem:Zs},Js=e=>{const t=H(e);return()=>t(Ys)};function yn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:d="md",...p}]=K(c);return a({...p,type:"radio",class:I("radio-button",d,l,u,r,t==null?void 0:t.class,p==null?void 0:p.class)})}}const Cn=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=yn(e);return r=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),o("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Qs=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=yn(e),r=t.state("one"),s=({target:c})=>r.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:s})),n("Two",i({id:"two",name:"radio",value:r,oninput:s})),o("Choice: ",r))},ei=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,ti={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:ei,createComponent:Qs}],gridItem:Cn},ni=e=>{const t=H(e);return()=>t(ti)},oi=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function je(e,t){const{bau:n,css:o}=e,{div:a,li:i,select:r,option:s}=n.tags,c=q(e),l=ot(e),u=we(e),d=o`
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
    ${oi()}
  `;return function(...m){let[{color:x="neutral",variant:h="outline",size:w="md",label:f,Option:b,options:y,getOptionLabel:D=({label:E})=>E,...M},...$]=K(m);const N=n.state(""),A=n.state(!1),T=n.state(0),R=()=>{v.openDialog(),v.focus(),A.val=!0},V=()=>{v.closeDialog(),A.val=!1},J=()=>{A.val=!1},j=E=>{A.val?V():R(),E.preventDefault()},W=({option:E,index:O})=>B=>{N.val=D(E),S.value=N.val,S.setCustomValidity(""),T.val=O,V(),B.preventDefault()},U=E=>{switch(E.preventDefault(),E.key){case"Escape":V();break;case"ArrowDown":T.val<y.length-1?T.val++:T.val=0;break;case"ArrowUp":T.val<=0?T.val=y.length-1:T.val--;break;case"Enter":A.val?(N.val=D(y[T.val]),V()):R();break}},C=()=>u({tabindex:"0",class:I(x,h)},y.map((E,O)=>i({class:()=>I(T.val==O&&"active"),onclick:W({option:E,index:O})},b(E)))),g=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":A,"aria-label":f,onclick:j,color:x,variant:h,size:w},()=>!N.val&&f,N),v=l({triggerEl:g,contentEl:C(),onClose:J}),S=r(M,s({value:""},"--Select Category--"),y.map(E=>s(D(E))));return a({...M,class:I("select",x,w,d,t==null?void 0:t.class,M==null?void 0:M.class),onkeydown:U},S,g,v)}}const Sn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=je(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},ai=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=je(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},ri=`import select from "@grucloud/bau-ui/select";
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
`,si=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=je(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],r=s=>n({},s);return()=>o(a({options:i,Option:r,label:"Select a region",getOptionLabel:s=>s}))},ii=`import select from "@grucloud/bau-ui/select";
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
`,ci={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:ri,createComponent:ai},{title:"Select AWS region",description:"Select the AWS region",code:ii,createComponent:si}],gridItem:Sn},li=e=>{const t=H(e);return()=>t(ci)};function ze(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    ${(()=>ee.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:d,...p},...m]=K(c);return a({...p,type:"range",class:I("slider",l,u,d,r,t==null?void 0:t.class,p.class)},...m)}}const En=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=ze(e);return i=>a({...i,oninput:o})},ui=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,r=t.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=ze(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},di=`import slider from "@grucloud/bau-ui/slider";
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
`,pi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=ze(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},mi=`import slider from "@grucloud/bau-ui/slider";
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
`,gi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=ze(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},bi=`import slider from "@grucloud/bau-ui/slider";
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
`,hi={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:di,createComponent:ui},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:mi,createComponent:pi},{title:"Vertical Mark",description:"A vertical slider with marks.",code:bi,createComponent:gi}],gridItem:En},fi=e=>{const t=H(e);return()=>t(hi)},kn=e=>{const t=Le(e);return n=>t({...n})},vi=e=>{const{bau:t}=e,{section:n}=t.tags,o=Le(e);return()=>n(o({}))},xi=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,wi={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:xi,createComponent:vi}],gridItem:kn},yi=e=>{const t=H(e);return()=>t(wi)},Ci=()=>ee.map(e=>`
`).join(`
`);function Tn(e,t){const{bau:n,css:o}=e,{div:a,ul:i,li:r,span:s}=n.tags,c=o`
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
    ${Ci()}
  `;return function(...u){let[{color:d,variant:p="plain",size:m,stepperDefs:x=[],activeStepIndex:h,...w},...f]=K(u);const b=n.state(x.map(($,N)=>({...$,index:N}))),y=n.derive(()=>b.val[h.val]),D=$=>{const{Header:N,disabled:A,name:T,index:R}=$;return r({class:()=>I(y.val.name==T&&"active",h.val<R&&"not-completed",h.val>R&&"completed",A&&"disabled")},s({class:"step-number"},R+1),s({class:"step-label"},()=>N($)))};return a({class:I("stepper",p,m,d,c,t==null?void 0:t.class,w.class)},n.loop(b,i(),D),n.bind({deps:[y],render:()=>$=>$.Content?$.Content({}):""}))}}const Si=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,r=Tn(e),s=q(e),c=({name:x})=>x,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},m=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},s({onclick:d,variant:"outline",color:"primary"},"Previous"),s({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},r({stepperDefs:l,activeStepIndex:u}),m())},Ei=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ki=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:r}=t.tags,{svg:s,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=q(e);return function({onclickProvider:d}){return a(r("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({onclick:d("AWS"),variant:"outline",color:"primary"},s({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({onclick:d("Azure"),variant:"outline",color:"primary"},s({width:261,height:90,viewBox:"0 0 261 75",fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({onclick:d("Google"),variant:"outline",color:"primary"},s({width:473,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}};function st(e,t){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:d,...p},...m]=K(s);return a({...p,class:I("form",c,l,u,i,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const it=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},ct=e=>{const{bau:t}=e,{i:n}=t.tags,o=q(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},Ti=e=>{const{bau:t}=e,{span:n}=t.tags,o=je(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=r=>n(r);return function(s){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...s})}},Ai=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:r,i:s}=t.tags,c=q(e),l=ye(e),u=st(e),d=ct(e),p=it(e),m=Ti(e);return function({onclickPrevious:h,onclickNext:w}){return u({name:"form-config-aws",onsubmit:b=>{b.preventDefault(),w()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(r("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),r("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),r("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),r("Region",m({name:"region"}))),p(d({onclick:h}),c({type:"submit",variant:"outline",color:"primary"},"Next",s("▶"))))}},Ii=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:r,label:s,i:c,ol:l,li:u,h3:d,pre:p,em:m,div:x}=t.tags,h=q(e),w=ct(e),f=it(e),b=ye(e),y=st(e);return function({onclickPrevious:M,onclickNext:$}){const N=T=>{T.preventDefault(),$()},A=n`
      & ol {
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
            top: 0;
            border-radius: 50%;
            text-align: center;
          }
        }
      }
    `;return y({name:"form-config-azure",onsubmit:N,"data-infra-create":!0,class:A},i(a("Azure Configuration"),r("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),r("Retrieve the ",m("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),s("Subscription Id",b({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",pattern:String.raw`\w{32,32}`,title:"Length should be 32 characters.",required:!0}))),u(d("Tenant Id"),r("Retrieve the ",m("Tenant Id")," with the following command:"),p("az account show"),s("Tenant Id",b({"data-input-azure-tenant-id":!0,autofocus:!0,placeholder:"Tenant Id",name:"tenantId",pattern:String.raw`\w{36,36}`,title:"Length should be 36 characters.",required:!0}))),u(d("App ID and PASSWORD"),r("Retrieve the ",m("APP_ID")," and ",m("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),x({class:n`
                  display: flex;
                  gap: 1rem;
                `},s("App Id",b({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",pattern:String.raw`\w{36,36}`,title:"Length should be 36 characters.",required:!0})),s("Password",b({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",pattern:String.raw`\w{8,64}`,title:"Length should be greater than 8 and below 64",required:!0})))))),f(w({onclick:M}),h({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},Di=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:r,p:s,div:c,i:l,ol:u,li:d,span:p,em:m,a:x,table:h,tbody:w,th:f,tr:b,td:y}=t.tags,{svg:D,use:M}=t.tagsNS("http://www.w3.org/2000/svg"),$=rt(e),N=q(e),A=st(e),T=ct(e),R=it(e);return function({onclickPrevious:J,onclickNext:j}){const W=t.state("No file selected"),U=t.state({}),C=O=>{const B=O.target.files[0];if(B){W.val=B.name;const F=new FileReader;F.readAsText(B),F.onload=()=>{try{debugger;F.result&&(U.val=JSON.parse(F.result))}catch{}},F.onerror=()=>{console.log(F.error)}}else W.val=""},g=({fileName:O,content:B})=>h({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},w(b(f("Credential File"),y(O)),b(f("Project Name"),y(B.project_id)),b(f("Service Account"),y(B.client_email)))),v=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},D({width:100,height:100,fill:"currentColor"},M({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),S=O=>{O.preventDefault(),j()},E=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return A({name:"form-config-google",class:E,onsubmit:S,"data-infra-create":!0},r(i("Google Configuration"),s("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",x({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",m("CREATE SERVICE ACCOUNT"),""),d("Set the ",m("Service account name")," to 'grucloud' for instance"),d("Click on ",m("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",m("CONTINUE"),""),d("Click on ",m("DONE"),""),d("Go to the ",m("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",m("Manage keys"),""),d("Click on ",m("ADD KEYS"),", then ",m("Create new key"),""),d("Click on ",m("CREATE")," to download the credential file in JSON format.")),$({"data-input-google-upload":!0,Component:v,name:"file",accept:"application/JSON",onchange:C}),()=>g({fileName:W.val,content:U.val})),R(T({onclick:J}),N({type:"submit",variant:"outline",color:"primary"},"Next",l("▶"))))}},Ni=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,r=Tn(e),s=ki(e),c=Ai(e),l=Ii(e),u=Di(e),d=t.state(""),p=t.state(0),m=({name:y})=>y,x=y=>()=>{d.val=y,p.val++},w=[{name:"Provider Selection",Header:m,Content:()=>s({onclickProvider:x}),enter:async()=>{d.val=""}},{name:"Configuration",Header:()=>`Configuration ${d.val}`,Content:()=>{switch(d.val){case"AWS":return c({onclickPrevious:f,onclickNext:b});case"Azure":return l({onclickPrevious:f,onclickNext:b});case"Google":return u({onclickPrevious:f,onclickNext:b})}}},{name:"Scan",Header:m,Content:()=>a(i("My stepper 3 Content"))}],f=()=>{p.val>0&&p.val--},b=()=>{w.length>p.val+1&&p.val++};return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},r({stepperDefs:w,activeStepIndex:p}))},Mi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

import stepStepProviderSelection from "./cloud-config/stepProviderSelection";
import configAws from "./cloud-config/configAws";
import configAzure from "./cloud-config/configAzure";
import configGoogle from "./cloud-config/configGoogle";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, p } = bau.tags;
  const Stepper = stepper(context);
  const StepProviderSelection = stepStepProviderSelection(context);
  const ConfigAws = configAws(context);
  const ConfigAzure = configAzure(context);
  const ConfigGoogle = configGoogle(context);

  const providerNameState = bau.state("");
  const activeStepIndex = bau.state(0);

  // For testing
  // const providerNameState = bau.state("Google");
  // const activeStepIndex = bau.state(1);

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
      case "Google":
        return ConfigGoogle({ onclickPrevious, onclickNext });
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
`,$i={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:Ei,createComponent:Si},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Mi,createComponent:Ni}]},Bi=e=>{const t=H(e);return()=>t($i)},Pi=()=>ee.map(e=>`
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
`);function An(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Pi()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u="md",...d},...p]=K(s);return a({...d,class:I("switch",i,c,l,u,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const In=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=An(e);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Oi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,r=An(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},_i=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Ri={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:_i,createComponent:Oi}],gridItem:In},Li=e=>{const t=H(e);return()=>t(Ri)},ji=()=>ee.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Ce(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:r,li:s}=n.tags,c=o`
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
    ${ji()}
  `;return function(...u){let[{color:d,variant:p="plain",size:m,...x},...h]=K(u);const w=n.state(a),f=n.state(a[0]),b=M=>w.val.find($=>$.name==M),y=M=>{const{Header:$,disabled:N,name:A}=M;return s({class:()=>I(f.val.name==A&&"active",N&&"disabled"),onclick:T=>T.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:A},bubbles:!0}))},$(M))},D=i({class:I("tabs",p,m,d,c,t==null?void 0:t.class,x.class)},n.loop(w,r(),y),()=>f.val.Content?f.val.Content({}):"");return D.addEventListener("tab.select",M=>{var A,T;const{tabName:$}=M.detail,N=b($);N&&((A=f.val.exit)==null||A.call(),f.val=N,(T=N.enter)==null||T.call())},!1),D.addEventListener("tab.add",M=>{var N;const{tab:$}=M.detail;(N=$.enter)==null||N.call(),w.val.push($)},!1),D.addEventListener("tab.remove",M=>{var N;const $=w.val.findIndex(A=>A.name==M.detail.tabName);$>0&&((N=w.val[$].exit)==null||N.call(),w.val.splice($,1))},!1),D}}const Dn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ce(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},zi=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ce(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Hi=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Gi=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ce(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},Ui=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Nn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Fi=e=>{const{css:t}=e,n=Ce(e,{tabDefs:Nn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Wi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Vi=e=>{const{css:t}=e,n=Nn(e),o=Ce(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Ki=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Zi={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Hi,createComponent:zi},{title:"Extended Tabs",description:"An extended tabs.",code:Ui,createComponent:Gi},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Wi,createComponent:Fi},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Ki,createComponent:Vi}],gridItem:Dn},qi=e=>{const t=H(e);return()=>t(Zi)};function Se(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=K(c);return i({...l,class:I("table-container",r,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Xi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags;function d(w,f,b,y,D){return{name:w,calories:f,fat:b,carbs:y,protein:D}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],m=({name:w,calories:f})=>r(i(w),i({class:n`
            text-align: right;
          `},f)),x=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Se(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(s(u("Basic Table"),x(),l(p.map(m)))))},Yi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Ji=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Qi=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,d=({name:x,calories:h})=>r(i(x),i({class:n`
            text-align: right;
          `},h)),p=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=Se(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(m(s(u("Table Dense"),p(),l(Ji.map(d)))))},ec=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const tc=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],nc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=t.tags,d=({name:x,calories:h})=>r(i(x),i({class:n`
            text-align: right;
          `},h)),p=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=Se(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(m(s(u("Table Zebra"),p(),l(tc.map(d)))))},oc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,ac={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Yi,createComponent:Xi},{title:"Dense",description:"A dense table.",code:ec,createComponent:Qi},{title:"Zebra",description:"A zebra table.",code:oc,createComponent:nc}]},rc=e=>{const t=H(e);return()=>t(ac)},sc=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:r,article:s}=t.tags,c=Wt(e),l=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>r({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},ic=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,cc={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:ic,createComponent:sc}]},lc=e=>{const t=H(e);return()=>t(cc)};function Mn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=at(e),r=q(e),s=Le(e),c=o`
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
  `,l=({label:x,icon:h,...w})=>r({"aria-label":x,title:x,...w},h),u=({count:x,totalCount:h,page:w,rowsPerPage:f})=>a({class:"pages-numbers"},Number(w-1)*Number(f)+(x>0?1:0),"-",Math.min(w*f,h)," of ",h),d=({count:x,page:h,rowsPerPage:w})=>a({class:"pages-numbers"},(h-1)*w+(x>0?1:0),"-",h*w),p=x=>x<=1,m=(x,h,w)=>x>=Math.ceil(h/w);return function(...h){let[{count:w=0,totalCount:f=0,page:b=1,rowsPerPage:y=50,onPageChange:D,isLoading:M=!1,disableFirst:$=()=>p(b),disablePrevious:N=()=>p(b),disableNext:A=()=>m(b,f,y),disableLast:T=()=>m(b,f,y),...R},...V]=K(h);const J=Math.max(0,Math.ceil(f/y)),j=D({page:1}),W=D({page:b-1}),U=D({page:b+1}),C=D({page:J}),g=[{label:"First",icon:"⟪",onclick:j,disabled:$()},{label:"Previous",icon:"⟨",onclick:W,disabled:N()},{label:"Next",icon:"⟩",onclick:U,disabled:A()},{label:"Last",icon:"⟫",onclick:C,disabled:T()}];return a({...R,class:I("table-pagination",c,M&&"disabled",t==null?void 0:t.class,R==null?void 0:R.class)},s({class:"spinner",visibility:M,size:"md"}),f>0?u({count:w,totalCount:f,page:b,maxPages:J,rowsPerPage:y}):d({count:w,page:b,maxPages:J,rowsPerPage:y}),i({variant:"outline",color:"neutral"},g.map(v=>l({...v,variant:"outline",color:"neutral"}))))}}const uc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),dc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=t.tags,l=uc(45),u=({name:b,email:y})=>i(a(b),a(y)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Mn(e),m=Se(e,{class:n`
      max-width: 650px;
    `}),x=t.state(l),h=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),w=t.derive(()=>x.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),f=({page:b})=>y=>{h.val.page=b};return()=>m(r(d(),()=>c(w.val.map(u))),()=>p({...h.val,onPageChange:f}))},pc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),m=t.derive(()=>d.val.length),x=t.state(1),h=t.state(10),w=t.derive(()=>d.val),f=T=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(T).toString()}`,b=({page:T})=>R=>{x.val=T,y(f({page:T,per_page:h.val}))};y(f({page:1,per_page:h.val}));async function y(T){try{u.val=!0;const R=await fetch(T,{});if(R.ok){const V=await R.json();d.val=V;return}throw R}catch(R){p.val=R.message}finally{u.val=!1}}const D=({name:T,description:R,stargazers_count:V})=>i(a(T),a(R),a({class:n`
            text-align: right;
          `},V)),M=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),$=Mn(e),N=Se(e,{class:n`
      min-width: 650px;
    `}),A=({message:T})=>l(T);return()=>N(()=>$({rowsPerPage:h.val,page:x.val,count:m.val,totalCount:-1,isLoading:u.val,onPageChange:b,disableNext:()=>!1}),r(M(),()=>p.val&&A({message:p.val}),()=>c(w.val.map(D))))},mc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:r,tr:s}=t.tags,c=dc(e),l=pc(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Ee(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{color:l,variant:u,size:d="md",selected:p=!1,disabled:m,onChange:x,...h},...w]=K(c);return i({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>f=>f},class:{deps:[p],renderProp:()=>f=>I("toggle",d,l,u,r,f&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:m},w)}}const $n=e=>{const{bau:t}=e,n=Ee(e);return console.log("grid item"),o=>{const a=t.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},gc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ee(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},bc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,hc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:bc,createComponent:gc}],gridItem:$n},fc=e=>{const t=H(e);return()=>t(hc)},vc=()=>ee.map(e=>`
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
`);function lt(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${vc()}
  `;return function(...s){let[{color:c,variant:l="plain",size:u="md",exclusive:d=!1,onChange:p=()=>{},...m},...x]=K(s);const h=new Set,w=f=>{const{value:b}=f.target;d?(h.clear(),h.add(b)):h.has(b)?h.delete(b):h.add(b),p({event:f,values:[...h]})};return a({...m,class:I("toggle-group",u,c,l,i,t==null?void 0:t.class,m==null?void 0:m.class),onclick:w},...x)}}const Bn=e=>{const{bau:t}=e,n=lt(e),o=Ee(e);return a=>{const i=t.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return n({...a,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:l})=>()=>o({...a,value:l,selected:i.val.includes(l),"area-label":c},c)))}},xc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Ee(e),r=lt(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:s,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},wc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,yc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Ee(e),r=lt(e),s="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(r({color:s,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:s,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},Cc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Sc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:wc,createComponent:xc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Cc,createComponent:yc}],gridItem:Bn},Ec=e=>{const t=H(e);return()=>t(Sc)};function ut(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:d="neutral",variant:p="outline",size:m="md",...x},...h]=K(c);const w=i({class:I("container",...u.split("-"))},i({class:I("content",d,p,m),role:"tooltip"},l)),f=N=>`move-to-${N}`,b=(N,A,T)=>{if(N()){const R=f(A);w.classList.add(R),w.classList.add(A),w.classList.remove(T)}},y=(N,A)=>{const T=f(N);w.classList.contains(T)&&(w.classList.remove(T),w.classList.add(A),w.classList.remove(N))},D=N=>{const A=w.getBoundingClientRect();b(()=>A.x<0,"right","left"),b(()=>A.x+A.width>a.innerWidth,"left","right"),b(()=>A.y<0,"bottom","top"),b(()=>A.bottom>a.innerHeight,"top","bottom"),w.classList.add("visible")},M=N=>{w.classList.remove("visible"),y("right","left"),y("left","right"),y("bottom","top"),y("top","bottom")};return i({...x,class:I("tooltip",r,t==null?void 0:t.class,x==null?void 0:x.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",D),N.addEventListener("mouseout",M)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",D),N.removeEventListener("mouseout",M)}},...h,w)}}const Pn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,r=q(e),s=ut(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},kc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=q(e),r=ut(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},Tc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ac=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:r}=t.tags,s=(...d)=>Be(e)({variant:"outline",color:"primary"},d),c=ut(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>r({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},s("bottom start")),c({side:"bottom-centered",titleEl:l()},s("bottom centered")),c({side:"bottom-end",titleEl:l()},s("bottom end"))));return()=>u()},Ic=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Dc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Tc,createComponent:kc},{title:"Grid",description:"Various tooltip position",code:Ic,createComponent:Ac}],gridItem:Pn},Nc=e=>{const t=H(e);return()=>t(Dc)},On=e=>{const t=Xe(e);return n=>t(n)},Mc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Xe(e);return()=>n(o({}))},$c=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Bc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:$c,createComponent:Mc}],gridItem:On},Pc=e=>{const t=H(e);return()=>t(Bc)},Oc=({css:e,createGlobalStyles:t})=>(t`
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
  `});function _n(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:r,li:s,nav:c,div:l}=n.tags,u=Oc({css:o,createGlobalStyles:a}),d=nt(e),p=({depth:m=1,maxDepth:x,color:h,variant:w,size:f})=>b=>{const{children:y,expanded:D}=b,M=n.state(!D),$=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:A=>{y&&(M.val=!M.val)}},i(b.data)),N=()=>r({class:I(h,f)},y.map(p({depth:m+1,maxDepth:x})));return s(d({Header:$,Content:y&&m<x&&N}))};return function({tree:x,maxDepth:h=1/0,size:w="md",variant:f="plain",color:b="neutral",...y}){return c({class:I(u.nav,w,f,b,t==null?void 0:t.class,y.class)},x.children&&r(x.children.map(p({maxDepth:h,color:b,variant:f,size:w}))))}}const Rn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=_n(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},_c=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=_n(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},Rc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Lc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Rc,createComponent:_c}],gridItem:Rn},jc=e=>{const t=H(e);return()=>t(Lc)},zc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:r,ul:s,li:c}=t.tags,l=Vt(e),u=q(e),d=[{name:"Accordion",Item:Kt(e)},{name:"Alert",Item:qt(e)},{name:"Autocomplete",Item:Qt(e)},{name:"Avatar",Item:Yt(e)},{name:"Badge",Item:tn(e)},{name:"Breadcrumbs",Item:on(e)},{name:"Button",Item:an(e)},{name:"Button Group",Item:rn(e)},{name:"Calendar",Item:cn(e)},{name:"Checkbox",Item:dn(e)},{name:"Chip",Item:ln(e)},{name:"DrillDown Menu",Item:pn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:mn(e)},{name:"Input",Item:gn(e)},{name:"Linear Progress",Item:hn(e)},{name:"Loading Button",Item:vn(e)},{name:"Modal",Item:wn(e)},{name:"Radio Button",Item:Cn(e)},{name:"Select",Item:Sn(e)},{name:"Slider",Item:En(e)},{name:"Spinner",Item:kn(e)},{name:"Switch",Item:In(e)},{name:"Tabs",Item:Dn(e)},{name:"Theme Switch",Item:On(e)},{name:"Toggle",Item:$n(e)},{name:"Toggle Group",Item:Bn(e)},{name:"Tooltip",Item:Pn(e)},{name:"Tree View",Item:Rn(e)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},d.map(({name:p})=>c(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(p))))},Hc=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:To(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:Na(e)})},{path:"components",action:()=>({title:"Component",component:zc(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:za(e)})},{path:"alert",action:()=>({title:"Alert",component:qa(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:er(e)})},{path:"animate",action:()=>({title:"Animate",component:sr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:hr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:ur(e)})},{path:"badge",action:()=>({title:"Badge",component:wr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Er(e)})},{path:"button",action:()=>({title:"Button",component:Ir(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Br(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Rr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Ur(e)})},{path:"chip",action:()=>({title:"Chip",component:Kr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Yr(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ts(e)})},{path:"drawer",action:()=>({title:"Drawer",component:ss(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:us(e)})},{path:"fileInput",action:()=>({title:"File Input",component:gs(e)})},{path:"input",action:()=>({title:"Input",component:vs(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Cs(e)})},{path:"list",action:()=>({title:"List",component:Ps(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:As(e)})},{path:"modal",action:()=>({title:"Modal",component:Ls(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Ks(e)})},{path:"paper",action:()=>({title:"Paper",component:Js(e)})},{path:"popover",action:()=>({title:"Popover",component:Gs(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:ni(e)})},{path:"select",action:()=>({title:"Select",component:li(e)})},{path:"slider",action:()=>({title:"Slider",component:fi(e)})},{path:"spinner",action:()=>({title:"Spinner",component:yi(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Bi(e)})},{path:"switch",action:()=>({title:"Switch",component:Li(e)})},{path:"table",action:()=>({title:"Table",component:rc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:lc(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:mc(e)})},{path:"tabs",action:()=>({title:"Tabs",component:qi(e)})},{path:"toggle",action:()=>({title:"Toggle",component:fc(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Ec(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Nc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Pc(e)})},{path:"treeView",action:()=>({title:"Tree View",component:jc(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Do(e)})}],Gc=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Uc=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,r=a.state(),s=t({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:m=t}=l.resolve({pathname:u});r.val=p({}),document.title=`${d}`}},Fc=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};ao();const Ln={title:"Bau",base:"/bau/bau-ui"},le=mo({config:Ln}),{bau:Wc}=le;le.states={drawerOpen:Wc.state(!0)};Fc(le);Zn({routes:Hc({context:le}),onLocationChange:Uc({context:le,LayoutDefault:Co(le),config:Ln}),notFoundRoute:Gc(le)});
