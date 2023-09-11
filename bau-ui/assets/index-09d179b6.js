(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Kn=(e,t)=>({...e,paths:[...t,e.path]}),Dt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Kn(o,e);return n?[a,...Dt({paths:[...e,o.path],routes:n})]:a}),qn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Xn=({routes:e=[],notFoundRoute:t})=>{const n=Dt({routes:e}).map(o=>({...o,regex:qn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Zn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Xn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Qe=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],Yn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Jn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ft=e=>`var(--color-${e})`,Qn=e=>`var(--color-${e}-lightest)`,eo=()=>Qe.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ft(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Qn(e)};
}
.solid.${e} {
  background-color: ${ft(e)};
}
`).join(`
`),to=()=>Qe.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),no=e=>100-e*10,oo=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${no(t)}%);`).join(`
`),vt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),ao=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Yn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...Jn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ro({createGlobalStyles:e},{colorPalette:t=Qe}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>ao([n,o])).join(`
`)}
      ${oo()}
      ${vt({})}
      ${eo()}
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
      ${to()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${vt({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function so(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let et=e=>Object.prototype.toString.call(e??0).slice(8,-1),io=e=>et(e)=="Object",xt=e=>et(e)=="Function",Ze=e=>["Object","Array"].includes(et(e)),wt=Object.getPrototypeOf,Ye=e=>be(e)?e.val:e,be=e=>e==null?void 0:e.__isState,co=["splice","push","pop","shift","unshift","sort","reverse"],Be=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const K=e=>!be(e[0])&&io(e[0])?e:[{},...e];function lo(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,g,v)=>{let S=r;r=g;let E=y(v);return r=S,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(g=>{var v;return(v=g.element)==null?void 0:v.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,g,v,S,E,R)=>{var $;if(s){i.add(y);return}for(let F of y.bindings){let{deps:_,element:P,renderInferred:X,render:J,renderItem:te}=F;if(te&&g)($=f(P,S,(...ae)=>h(te(...ae)),v,E,R)[g])==null||$.call();else{let ae=X?X({element:P}):J({element:P,renderItem:te})(..._.map(Ye));ae!==P&&P.replaceWith(F.element=h(ae))}}C(y),u()},p=(y,g,v=[])=>({get(S,E,R){var $;if(r==null||r.add(y),E==="_isProxy")return!0;if(!(($=S[E])!=null&&$._isProxy)&&!be(S[E])&&Ze(S[E]))S[E]=new Proxy(S[E],p(y,g,[...v,E]));else if(co.includes(E)){let F=S[E];return(..._)=>{let P=F.apply(S,_);return d(y,E,P,_,g,v),P}}return Reflect.get(S,E,R)},set(S,E,R,$){let F=Reflect.set(S,E,R,$);return d(y,"setItem",F,{prop:E,value:R},g,[...v,E]),F}}),m=(y,g)=>new Proxy(g,p(y,g)),f=(y,g,v,S,E,R)=>{let $=()=>y.replaceChildren(...Be(S,v)),F=_=>y[_]&&y.removeChild(y[_]);return{assign:$,sort:$,reverse:$,setItem:()=>{var P;let _=R[0];(P=y.children[_])==null||P.replaceWith(v(E[_],_))},push:()=>y.append(...Be(g,(_,P)=>v(_,E.length+P))),unshift:()=>y.prepend(...Be(g,v)),pop:()=>F("lastChild"),shift:()=>F("firstChild"),splice:()=>{let[_,P,...X]=g;const{length:J}=y.children;for(let te=_>=0?Math.min(_+P-1,J-1):J-1;te>=(_>=0?_:J+_);te--)y.children[te].remove();if(X.length){let te=X.forEach((ae,Ve)=>v(ae,_+Ve));y.children[_]?y.children[_].after(...te):y.append(...te)}}}},x=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return r==null||r.add(g),g.valProxy??(g.valProxy=Ze(y)?m(g,y):y,g.valProxy)},set val(g){let v=this,S=v.val;Ze(g)?(v.valProxy=m(v,g),d(v,"assign",g)):g!==S&&(v.valProxy=g,d(v)),v.oldVal=S}}),h=y=>y==null||y===!1?c("span"):y.nodeType?y:n.createTextNode(y),w=(y,g)=>{let v=new Set;return g.val=l(y,v),v},b=y=>{let g=x(),v=w(y,g);g.computed=!0;for(let S of v)S.listeners.push({computed:y,deps:v,state:g});return g},C=y=>{for(let g of[...y.listeners])w(g.computed,g.state)},A=(y,...g)=>{if(g.length){let v=[];for(let S of g.flat(1/0))S!=null&&v.push(be(S)?z({deps:[S],render:()=>E=>E}):xt(S)?Q({renderInferred:S}):h(S));y.append(...v)}},T={},N=(y,g)=>y&&(Object.getOwnPropertyDescriptor(y,g)??N(wt(y),g)),k=(y,g,v)=>{var S;return T[y+","+g]??(T[y+","+g]=((S=N(v,g))==null?void 0:S.set)??0)},D=(y,g)=>new t.MutationObserver((v,S)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(R=>R===y&&(g({element:y}),S.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),M=(y,g)=>new t.MutationObserver((v,S)=>v.forEach(E=>g({record:E,element:y}))).observe(y,{childList:!0}),L=y=>new Proxy(function(v,...S){var F;let[E,...R]=K(S),$=y?n.createElementNS(y,v):c(v);for(let[_,P]of Object.entries(E)){if(_.startsWith("bau"))continue;let X=k(v,_,wt($))?J=>$[_]=J:J=>$.setAttribute(_,J);P==null||(be(P)?z({deps:[P],render:()=>()=>(X(P.val),$)}):xt(P)&&(!_.startsWith("on")||P.isDerived)?Q({renderInferred:()=>(X(P({element:$})),$)}):P.renderProp?z({deps:P.deps,render:()=>()=>(X(P.renderProp({element:$})(...P.deps.map(Ye))),$)}):X(P))}return E.bauChildMutated&&M($,E.bauChildMutated),A($,...R),(F=E.bauCreated)==null||F.call(E,{element:$}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:$})),E.bauUnmounted&&t.requestAnimationFrame(()=>D($,E.bauUnmounted)),$},{get:(g,v)=>g.bind(void 0,v)}),W=(y,g,v)=>{y.element=h(v);for(let S of g)be(S)&&(a.add(S),S.bindings.push(y));return y.element},Q=({renderInferred:y,element:g})=>{let v=new Set,S=l(y,v,{element:g});return W({renderInferred:y},v,S)},z=({deps:y,element:g,render:v,renderItem:S})=>W({deps:y,render:v,renderItem:S},y,v({element:g,renderItem:S})(...y.map(Ye))),V=(y,g,v)=>z({deps:[y],render:({renderItem:S})=>E=>(g.append(...Be(E,S)),g),renderItem:v}),G=y=>{s=!0,y(),s=!1,i.forEach(d),i.clear()};return{tags:L(),tagsNS:L,state:x,bind:z,loop:V,derive:b,stateSet:a,batch:G}}const uo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},po=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},mo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function go(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=mo(a,i),r=uo(s);return!t.getElementById(r)&&po(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function bo(e){const t=lo(),n=go();return ro(n),{bau:t,...n,tr:o=>o,window,...e}}function B(...e){return e.filter(t=>t).join(" ")}function Re(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:B("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const m=p.cloneNode(!0);m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=p.getAttribute("width"),m.style.height=p.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),u.target.appendChild(m),m.addEventListener("animationend",()=>{var f;return(f=m.parentNode)==null?void 0:f.removeChild(m)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const m=p.getBoundingClientRect();if(p.setAttribute("width",m.width+"px"),p.setAttribute("height",m.height+"px"),r()){p.style.animation=r();const f=()=>{p.removeEventListener("animationend",f),p.style.animation=""};p.addEventListener("animationend",f)}})},...c},l)}}function q(e,t={}){const{bau:n,css:o}=e,a=o`
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
    cursor: pointer;
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
    &.button:disabled {
      filter: grayscale(1) brightness(var(--brightness-hover));
      cursor: not-allowed;
      pointer-events: none;
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
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...d},...p]=K(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:B("button",t.class,c,r,l,a,d.class),href:u},p)}}const ee=["neutral","primary","success","danger","warning"],ho=["plain","outline","solid"],fo=["sm","md","lg"],vo="light",xo=()=>ee.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function tt(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(vo);const l=o`
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
    ${xo()}
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",...x},...h]=K(d);return i({required:"required",title:"Switch Theme",...x,class:B("theme-switch",f,m,p,l,t==null?void 0:t.class,x.class),type:"checkbox",checked:r()=="dark",onclick:w=>{s(w.target.checked?"dark":"light")}},...h)}}function wo(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:d,b:p,ul:m,li:f}=n.tags,{svg:x,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,b=q(e,{class:o`
      background: transparent;
    `}),C=tt(e),A=()=>s(x({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),T=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},b({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},A()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),N=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},C(),b({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},T(),N())}}function yo({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:d}=t.tags,p=({links:x,title:h})=>o({class:n`
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
        `},d(h),r(x.map(({href:w,name:b})=>c(s({href:w},b))))),m=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],f=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:m}),p({title:"Bau Ecosystem",links:f})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.43.3"),i("MIT license")))}}function fe(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(r);return a({...d,class:B("list",i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const $e="0.3s",Nt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(Nt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Mt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Mt(e)(t.children[o]);if(a)return a}},Co=({keyframes:e})=>({hideToLeft:e`
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
   `});function nt(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=z=>{var V;return((V=z.parentTree.data)==null?void 0:V.href)??z.parentTree.children[0].data.href},u=({variant:z,color:V,size:G,currentTree:y,data:g})=>C(k({variant:z,color:V,size:G,href:`${c}${l(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),k({variant:z,color:V,size:G,href:`${c}${g.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},g.name)),d=({size:z,subTree:{data:{name:V,href:G},children:y=[]}})=>k({size:z,href:`${c}${G}`,"data-ischild":!y.length},V),p=({pathname:z,subTree:V})=>{var G;return z===((G=V==null?void 0:V.data)==null?void 0:G.href)},{renderHeader:m=u,renderMenuItem:f=d,isActive:x=p}=t,{li:h,nav:w,div:b,header:C,a:A}=n.tags,T=Re(e),N=fe(e),k=q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:D,hideToRight:M}=Co(e),L=o`
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
  `,W=({variant:z,color:V,size:G,currentTree:y,pathnameState:g})=>{const{children:v,parentTree:S,data:E}=y;return b({class:B("drillDownMenu",z,V,G)},S&&m({variant:z,color:V,size:G,data:E,currentTree:y}),v&&N({class:B(z,V,G)},v.map(R=>h({class:()=>B(R.children&&"has-children",x({pathname:g.val,subTree:R})&&"active")},f({variant:z,color:V,size:G,subTree:R})))))},Q=({tree:z,pathname:V})=>{let G=Nt({})(structuredClone(z)),y=Mt(V)(G);return y||(console.error("drilldown no sub tree",V),y=G),y};return function(V){const{size:G=t.size??"md",variant:y=t.variant??"plain",color:g=t.color??"neutral",tree:v,...S}=V,E=n.state(a.location.pathname.replace(c,"")),R=n.derive(()=>Q({tree:v,pathname:E.val}));a.document.addEventListener("click",X=>{const{target:J}=X,te=J.getAttribute("href");if(J.tagName==="A"&&te&&!te.startsWith("http")){let ae=te.replace(c,"");r||(ae=ae.replace(J.hash,"")),E.val=ae}});let $=1;const F=X=>{const{dataset:J}=X.target;J.buttonback=="true"?$=-1:J.ischild=="false"?$=1:J.ischild=="true"&&($=0)},_=X=>{switch(X){case 1:return`${D} ${$e}`;case-1:return`${M} ${$e}`;default:return""}},P=X=>{switch(X){case 1:return`${M} ${$e} reverse`;case-1:return`${D} ${$e} reverse`;default:return""}};return w({class:B(L,t==null?void 0:t.class,S.class),onclick:F},T({animationHide:()=>_($),animationShow:()=>P($)},()=>W({variant:y,color:g,size:G,currentTree:R.val,pathnameState:E})))}}const So={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Bt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags;let m=!1;const f=nt(e);return function(){return r({bauMounted:({element:h})=>{s.innerWidth<=640&&(m=!0,i.drawerOpen.val=!1)},onclick:h=>{m&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:B(o`
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
          `)},f({tree:So}))}}const Eo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Re(e),r=wo(e),c=Bt(e),l=yo(e),u=a`
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
        `},r(),c(),s({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>m.val),l())}};function Le(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...m]=K(r);return a({...p,onclick:d,class:B("chip",t.class,c,l,u,d&&"clickable",i,p.class)},...m)}}function ko(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;q(e);const c=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},i(u),s(d),r(p))}}function To(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Ao({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:m,size:f})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},m),s({class:n`
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
                  var(--color-success) ${f/p*100}%
                );
                justify-content: flex-end;
                width: ${f/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},f)));return function({data:m=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Io(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=ko(e),l=To(e),u=q(e);Le(e);const d=Ao(e),p=(...w)=>a({class:n`
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
          `},...w)),m=n``,f=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],x=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],h=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:m},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:x}),d({data:f}),h())}}function Do(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const No=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Do(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function Mo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),No(e)()))}}function Bo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function $t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&$t(n)}),e}class yt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Pt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function le(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const $o="</span>",Ct=e=>!!e.scope,Po=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Oo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Pt(t)}openNode(t){if(!Ct(t))return;const n=Po(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Ct(t)&&(this.buffer+=$o)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const St=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class ot{constructor(){this.rootNode=St(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=St({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{ot._collapse(n)}))}}class _o extends ot{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Oo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ce(e){return e?typeof e=="string"?e:e.source:null}function Ot(e){return me("(?=",e,")")}function Ro(e){return me("(?:",e,")*")}function Lo(e){return me("(?:",e,")?")}function me(...e){return e.map(n=>Ce(n)).join("")}function zo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function at(...e){return"("+(zo(e).capture?"":"?:")+e.map(o=>Ce(o)).join("|")+")"}function _t(e){return new RegExp(e.toString()+"|").exec("").length-1}function jo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Ho=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function rt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ce(o),s="";for(;i.length>0;){const r=Ho.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Go=/\b\B/,Rt="[a-zA-Z]\\w*",st="[a-zA-Z_]\\w*",Lt="\\b\\d+(\\.\\d+)?",zt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",jt="\\b(0b[01]+)",Uo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Fo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=me(t,/.*\b/,e.binary,/\b.*/)),le({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Se={begin:"\\\\[\\s\\S]",relevance:0},Wo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Se]},Vo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Se]},Ko={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ze=function(e,t,n={}){const o=le({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=at("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:me(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},qo=ze("//","$"),Xo=ze("/\\*","\\*/"),Zo=ze("#","$"),Yo={scope:"number",begin:Lt,relevance:0},Jo={scope:"number",begin:zt,relevance:0},Qo={scope:"number",begin:jt,relevance:0},ea={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Se,{begin:/\[/,end:/\]/,relevance:0,contains:[Se]}]}]},ta={scope:"title",begin:Rt,relevance:0},na={scope:"title",begin:st,relevance:0},oa={begin:"\\.\\s*"+st,relevance:0},aa=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Pe=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Go,IDENT_RE:Rt,UNDERSCORE_IDENT_RE:st,NUMBER_RE:Lt,C_NUMBER_RE:zt,BINARY_NUMBER_RE:jt,RE_STARTERS_RE:Uo,SHEBANG:Fo,BACKSLASH_ESCAPE:Se,APOS_STRING_MODE:Wo,QUOTE_STRING_MODE:Vo,PHRASAL_WORDS_MODE:Ko,COMMENT:ze,C_LINE_COMMENT_MODE:qo,C_BLOCK_COMMENT_MODE:Xo,HASH_COMMENT_MODE:Zo,NUMBER_MODE:Yo,C_NUMBER_MODE:Jo,BINARY_NUMBER_MODE:Qo,REGEXP_MODE:ea,TITLE_MODE:ta,UNDERSCORE_TITLE_MODE:na,METHOD_GUARD:oa,END_SAME_AS_BEGIN:aa});function ra(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function sa(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ia(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ra,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ca(e,t){Array.isArray(e.illegal)&&(e.illegal=at(...e.illegal))}function la(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ua(e,t){e.relevance===void 0&&(e.relevance=1)}const da=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=me(n.beforeMatch,Ot(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},pa=["of","and","for","in","not","or","if","then","parent","list","value"],ma="keyword";function Ht(e,t,n=ma){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Ht(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ga(c[0],c[1])]})}}function ga(e,t){return t?Number(t):ba(e)?0:1}function ba(e){return pa.includes(e.toLowerCase())}const Et={},pe=e=>{console.error(e)},kt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ge=(e,t)=>{Et[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Et[`${e}/${t}`]=!0)},_e=new Error;function Gt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=_t(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function ha(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw pe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),_e;if(typeof e.beginScope!="object"||e.beginScope===null)throw pe("beginScope must be object"),_e;Gt(e,e.begin,{key:"beginScope"}),e.begin=rt(e.begin,{joinWith:""})}}function fa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw pe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),_e;if(typeof e.endScope!="object"||e.endScope===null)throw pe("endScope must be object"),_e;Gt(e,e.end,{key:"endScope"}),e.end=rt(e.end,{joinWith:""})}}function va(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function xa(e){va(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),ha(e),fa(e)}function wa(e){function t(s,r){return new RegExp(Ce(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=_t(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(rt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[sa,la,xa,da].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ia,ca,ua].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Ht(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ce(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return ya(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=le(e.classNameAliases||{}),i(e)}function Ut(e){return e?e.endsWithParent||Ut(e.starts):!1}function ya(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return le(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ut(e)?le(e,{starts:e.starts?le(e.starts):null}):Object.isFrozen(e)?le(e):e}var Ca="11.8.0";class Sa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Je=Pt,Tt=le,At=Symbol("nomatch"),Ea=7,Ft=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:_o};function c(g){return r.noHighlightRe.test(g)}function l(g){let v=g.className+" ";v+=g.parentNode?g.parentNode.className:"";const S=r.languageDetectRe.exec(v);if(S){const E=M(S[1]);return E||(kt(i.replace("{}",S[1])),kt("Falling back to no-highlight mode for this block.",g)),E?S[1]:"no-highlight"}return v.split(/\s+/).find(E=>c(E)||M(E))}function u(g,v,S){let E="",R="";typeof v=="object"?(E=g,S=v.ignoreIllegals,R=v.language):(ge("10.7.0","highlight(lang, code, ...args) has been deprecated."),ge("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),R=g,E=v),S===void 0&&(S=!0);const $={code:E,language:R};G("before:highlight",$);const F=$.result?$.result:d($.language,$.code,S);return F.code=$.code,G("after:highlight",F),F}function d(g,v,S,E){const R=Object.create(null);function $(I,O){return I.keywords[O]}function F(){if(!j.keywords){ne.addText(Y);return}let I=0;j.keywordPatternRe.lastIndex=0;let O=j.keywordPatternRe.exec(Y),U="";for(;O;){U+=Y.substring(I,O.index);const Z=re.case_insensitive?O[0].toLowerCase():O[0],oe=$(j,Z);if(oe){const[se,Wn]=oe;if(ne.addText(U),U="",R[Z]=(R[Z]||0)+1,R[Z]<=Ea&&(Me+=Wn),se.startsWith("_"))U+=O[0];else{const Vn=re.classNameAliases[se]||se;X(O[0],Vn)}}else U+=O[0];I=j.keywordPatternRe.lastIndex,O=j.keywordPatternRe.exec(Y)}U+=Y.substring(I),ne.addText(U)}function _(){if(Y==="")return;let I=null;if(typeof j.subLanguage=="string"){if(!t[j.subLanguage]){ne.addText(Y);return}I=d(j.subLanguage,Y,!0,ht[j.subLanguage]),ht[j.subLanguage]=I._top}else I=m(Y,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(Me+=I.relevance),ne.__addSublanguage(I._emitter,I.language)}function P(){j.subLanguage!=null?_():F(),Y=""}function X(I,O){I!==""&&(ne.startScope(O),ne.addText(I),ne.endScope())}function J(I,O){let U=1;const Z=O.length-1;for(;U<=Z;){if(!I._emit[U]){U++;continue}const oe=re.classNameAliases[I[U]]||I[U],se=O[U];oe?X(se,oe):(Y=se,F(),Y=""),U++}}function te(I,O){return I.scope&&typeof I.scope=="string"&&ne.openNode(re.classNameAliases[I.scope]||I.scope),I.beginScope&&(I.beginScope._wrap?(X(Y,re.classNameAliases[I.beginScope._wrap]||I.beginScope._wrap),Y=""):I.beginScope._multi&&(J(I.beginScope,O),Y="")),j=Object.create(I,{parent:{value:j}}),j}function ae(I,O,U){let Z=jo(I.endRe,U);if(Z){if(I["on:end"]){const oe=new yt(I);I["on:end"](O,oe),oe.isMatchIgnored&&(Z=!1)}if(Z){for(;I.endsParent&&I.parent;)I=I.parent;return I}}if(I.endsWithParent)return ae(I.parent,O,U)}function Ve(I){return j.matcher.regexIndex===0?(Y+=I[0],1):(Xe=!0,0)}function Hn(I){const O=I[0],U=I.rule,Z=new yt(U),oe=[U.__beforeBegin,U["on:begin"]];for(const se of oe)if(se&&(se(I,Z),Z.isMatchIgnored))return Ve(O);return U.skip?Y+=O:(U.excludeBegin&&(Y+=O),P(),!U.returnBegin&&!U.excludeBegin&&(Y=O)),te(U,I),U.returnBegin?0:O.length}function Gn(I){const O=I[0],U=v.substring(I.index),Z=ae(j,I,U);if(!Z)return At;const oe=j;j.endScope&&j.endScope._wrap?(P(),X(O,j.endScope._wrap)):j.endScope&&j.endScope._multi?(P(),J(j.endScope,I)):oe.skip?Y+=O:(oe.returnEnd||oe.excludeEnd||(Y+=O),P(),oe.excludeEnd&&(Y=O));do j.scope&&ne.closeNode(),!j.skip&&!j.subLanguage&&(Me+=j.relevance),j=j.parent;while(j!==Z.parent);return Z.starts&&te(Z.starts,I),oe.returnEnd?0:O.length}function Un(){const I=[];for(let O=j;O!==re;O=O.parent)O.scope&&I.unshift(O.scope);I.forEach(O=>ne.openNode(O))}let Ne={};function bt(I,O){const U=O&&O[0];if(Y+=I,U==null)return P(),0;if(Ne.type==="begin"&&O.type==="end"&&Ne.index===O.index&&U===""){if(Y+=v.slice(O.index,O.index+1),!a){const Z=new Error(`0 width match regex (${g})`);throw Z.languageName=g,Z.badRule=Ne.rule,Z}return 1}if(Ne=O,O.type==="begin")return Hn(O);if(O.type==="illegal"&&!S){const Z=new Error('Illegal lexeme "'+U+'" for mode "'+(j.scope||"<unnamed>")+'"');throw Z.mode=j,Z}else if(O.type==="end"){const Z=Gn(O);if(Z!==At)return Z}if(O.type==="illegal"&&U==="")return 1;if(qe>1e5&&qe>O.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=U,U.length}const re=M(g);if(!re)throw pe(i.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Fn=wa(re);let Ke="",j=E||Fn;const ht={},ne=new r.__emitter(r);Un();let Y="",Me=0,ue=0,qe=0,Xe=!1;try{if(re.__emitTokens)re.__emitTokens(v,ne);else{for(j.matcher.considerAll();;){qe++,Xe?Xe=!1:j.matcher.considerAll(),j.matcher.lastIndex=ue;const I=j.matcher.exec(v);if(!I)break;const O=v.substring(ue,I.index),U=bt(O,I);ue=I.index+U}bt(v.substring(ue))}return ne.finalize(),Ke=ne.toHTML(),{language:g,value:Ke,relevance:Me,illegal:!1,_emitter:ne,_top:j}}catch(I){if(I.message&&I.message.includes("Illegal"))return{language:g,value:Je(v),illegal:!0,relevance:0,_illegalBy:{message:I.message,index:ue,context:v.slice(ue-100,ue+100),mode:I.mode,resultSoFar:Ke},_emitter:ne};if(a)return{language:g,value:Je(v),illegal:!1,relevance:0,errorRaised:I,_emitter:ne,_top:j};throw I}}function p(g){const v={value:Je(g),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return v._emitter.addText(g),v}function m(g,v){v=v||r.languages||Object.keys(t);const S=p(g),E=v.filter(M).filter(W).map(P=>d(P,g,!1));E.unshift(S);const R=E.sort((P,X)=>{if(P.relevance!==X.relevance)return X.relevance-P.relevance;if(P.language&&X.language){if(M(P.language).supersetOf===X.language)return 1;if(M(X.language).supersetOf===P.language)return-1}return 0}),[$,F]=R,_=$;return _.secondBest=F,_}function f(g,v,S){const E=v&&n[v]||S;g.classList.add("hljs"),g.classList.add(`language-${E}`)}function x(g){let v=null;const S=l(g);if(c(S))return;if(G("before:highlightElement",{el:g,language:S}),g.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),r.throwUnescapedHTML))throw new Sa("One of your code blocks includes unescaped HTML.",g.innerHTML);v=g;const E=v.textContent,R=S?u(E,{language:S,ignoreIllegals:!0}):m(E);g.innerHTML=R.value,f(g,S,R.language),g.result={language:R.language,re:R.relevance,relevance:R.relevance},R.secondBest&&(g.secondBest={language:R.secondBest.language,relevance:R.secondBest.relevance}),G("after:highlightElement",{el:g,result:R,text:E})}function h(g){r=Tt(r,g)}const w=()=>{A(),ge("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function b(){A(),ge("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let C=!1;function A(){if(document.readyState==="loading"){C=!0;return}document.querySelectorAll(r.cssSelector).forEach(x)}function T(){C&&A()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function N(g,v){let S=null;try{S=v(e)}catch(E){if(pe("Language definition for '{}' could not be registered.".replace("{}",g)),a)pe(E);else throw E;S=s}S.name||(S.name=g),t[g]=S,S.rawDefinition=v.bind(null,e),S.aliases&&L(S.aliases,{languageName:g})}function k(g){delete t[g];for(const v of Object.keys(n))n[v]===g&&delete n[v]}function D(){return Object.keys(t)}function M(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function L(g,{languageName:v}){typeof g=="string"&&(g=[g]),g.forEach(S=>{n[S.toLowerCase()]=v})}function W(g){const v=M(g);return v&&!v.disableAutodetect}function Q(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=v=>{g["before:highlightBlock"](Object.assign({block:v.el},v))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=v=>{g["after:highlightBlock"](Object.assign({block:v.el},v))})}function z(g){Q(g),o.push(g)}function V(g){const v=o.indexOf(g);v!==-1&&o.splice(v,1)}function G(g,v){const S=g;o.forEach(function(E){E[S]&&E[S](v)})}function y(g){return ge("10.7.0","highlightBlock will be removed entirely in v12.0"),ge("10.7.0","Please use highlightElement now."),x(g)}Object.assign(e,{highlight:u,highlightAuto:m,highlightAll:A,highlightElement:x,highlightBlock:y,configure:h,initHighlighting:w,initHighlightingOnLoad:b,registerLanguage:N,unregisterLanguage:k,listLanguages:D,getLanguage:M,registerAliases:L,autoDetection:W,inherit:Tt,addPlugin:z,removePlugin:V}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Ca,e.regex={concat:me,lookahead:Ot,either:at,optional:Lo,anyNumberOfTimes:Ro};for(const g in Pe)typeof Pe[g]=="object"&&$t(Pe[g]);return Object.assign(e,Pe),e},he=Ft({});he.newInstance=()=>Ft({});var ka=he;he.HighlightJS=he;he.default=he;const ye=Bo(ka),It="[A-Za-z$_][0-9A-Za-z$_]*",Ta=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Aa=["true","false","null","undefined","NaN","Infinity"],Wt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Vt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Kt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ia=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Da=[].concat(Kt,Wt,Vt);function qt(e){const t=e.regex,n=(v,{after:S})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,S)!==-1},o=It,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,S)=>{const E=v[0].length+v.index,R=v.input[E];if(R==="<"||R===","){S.ignoreMatch();return}R===">"&&(n(v,{after:E})||S.ignoreMatch());let $;const F=v.input.substring(E);if($=F.match(/^\s*=/)){S.ignoreMatch();return}if(($=F.match(/^\s+extends\s+/))&&$.index===0){S.ignoreMatch();return}}},r={$pattern:It,keyword:Ta,literal:Aa,built_in:Da,"variable.language":Ia},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},m={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},x={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},b={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},C=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,f,x,h,{match:/\$\d+/},d];p.contains=C.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(C)});const A=[].concat(b,p.contains),T=A.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(A)}]),N={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:T},k={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},D={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Wt,...Vt]}},M={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[N],illegal:/%/},W={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(v){return t.concat("(?!",v.join("|"),")")}const z={match:t.concat(/\b/,Q([...Kt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},G={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},N]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[N]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:D},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),M,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,f,x,h,b,{match:/\$\d+/},d,D,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[b,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[N,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[N]},z,W,k,G,{match:/\$[(.]/}]}}function Na(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ma=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return ye.registerLanguage("javascript",qt),ye.registerLanguage("sh",Na),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=ye.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function Ba(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=Ma(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ee(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    border: 1px solid transparent;
    height: fit-content;
    border-radius: var(--global-radius);
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(r);return a({...d,class:B("paper",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function Xt(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(h,w)=>{let b=null;return(...C)=>{a.clearTimeout(b),b=a.setTimeout(()=>h(...C),w)}},p=o`
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
  `,m=({value:h,id:w,children:b=[]})=>{const C=c({class:()=>u.val==w?"active":"",href:`#${w}`});return C.innerHTML=h,r({class:()=>u.val==w?"active":""},C,b.length>0&&s(b.map(m)))},f=h=>h.tagName.charAt(1),x=({contentEl:h})=>{const w=h.querySelectorAll(l);let b=2,C={},A={children:[]},T=A;const N=T;let k=[T];return[...w].forEach(D=>{const M=f(D);D.setAttribute("id",D.textContent),!D.innerHTML.includes("<button")&&(C={value:D.innerHTML,id:D.id??D.textContent,children:[]},b==M?(A=C,T.children.push(A)):b<M?(k.push(T),T=A,A.children.push(C),A=C):b>M&&(T=k[M-1],k=k.slice(0,M-1),T.children.push(C),A=C),b=M)}),N};return function(...w){let[{size:b=t.size??"md",variant:C=t.variant??"plain",color:A=t.color??"neutral",contentEl:T,...N}]=K(w);const k=x({contentEl:T}),D=d(()=>{const L=[...T.querySelectorAll(l)].find(W=>{const{top:Q,height:z}=W.getBoundingClientRect();if(Q+z>60)return!0});L&&(u.val=L==null?void 0:L.id)},100);return i({...N,class:B("tableOfContent",b,C,A,p,t==null?void 0:t.class,N==null?void 0:N.class),bauMounted:()=>{a.addEventListener("scroll",D)},bauUnmounted:()=>{a.removeEventListener("scroll",D)}},k.children&&s(k.children.map(m)))}}const Zt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(s(l(p??""),ee.map(m=>l(m)))),i(ho.map(m=>s(l(m),ee.map((f,x)=>r(d({color:f,variant:m},{index:x}))))))))}},$a=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},fo.map((s,r)=>i(e,{color:"success",variant:"outline",size:s})({index:r})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:d}=t.tags;ye.registerLanguage("javascript",qt);const p=Xt(e),m=Ee(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),f=Zt(e),x=$a(e),h=({text:w})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:b})=>{b.innerHTML=ye.highlight(w,{language:"js"}).value}}));return function(b){const C=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(b.title),r(b.description),b.gridItem&&[c("Variant/Color"),!b.variantColorTableDisable&&b.gridItem&&m(f({Item:b.gridItem(e)})),c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b.gridItem&&m(x({item:b.gridItem}))],c("Usage"),l("Import"),h({text:b.importStatement}),c("Examples"),b.examples.map(A=>i(l(A.title),r(A.description),m(A.createComponent(e)({})),h({text:A.code}))));return o({class:n`
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
        `},C,p({contentEl:C}))}};function it(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:d,variant:p="plain",size:m="md",Header:f,Content:x,close:h=!0,...w}]=K(u);const b=n.state(h);return a({...w,class:B("collapsible",m,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:()=>B("header",x?b.val?"close":"open":""),onclick:C=>{b.val=!b.val,C.stopPropagation()}},f()),a({class:"content",role:"region",bauMounted:({element:C})=>{b.val&&(C.style.height="0px")},"aria-expanded":({element:C})=>(s({element:C,closeState:b}),!b.val)},x&&x()))}}const Pa=()=>ee.map(e=>`
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
`);function je(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
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
    ${Pa()}
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",data:x=[],...h}]=K(d);const w=n.state(""),b=it(e),C=T=>N=>{w.val==T?w.val="":w.val=T},A=T=>{const{Header:N,Content:k,name:D}=T,M=()=>r({class:()=>B(w.val==D&&"active")},c({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:W})=>w.val==D},N(T))),L=()=>a({id:`bau-${D}`,"data-state":({element:W})=>w.val==D},k(T));return s({class:B(f,m,p),onclick:C(D)},b({Header:M,Content:L}))};return a({class:B("accordion",l,t==null?void 0:t.class,h.class)},i(x.map(A)))}}const Yt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=je(e);return s=>i({...s,data:a})},Oa=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=je(e);return()=>i({data:a,color:"neutral",variant:"outline"})},_a=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Jt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ra=e=>{const{css:t}=e,n=Jt(e),o=je(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
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
`,za=e=>{const{css:t}=e,n=Jt(e),o=je(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},ja=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ha={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:_a,createComponent:Oa},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:La,createComponent:Ra},{title:"Customize the icon",description:"Customize the icon with a cross.",code:ja,createComponent:za}],gridItem:Yt},Ga=e=>{const t=H(e);return()=>t(Ha)},Ua={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Fa=()=>ee.map(e=>`
&.alert {
  &.plain.${e} {
    & .icon {
      color: var(--color-${e})
    }
  }
  &.outline.${e} {
    & .icon {
      color: var(--color-${e})
    }
  }
}
  `).join(`
`);function ke(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 0.5rem;
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
    ${Fa()}
  `,r=q(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",onRemove:f,...x},...h]=K(u);return a({...x,class:B("alert",`alert-${p}`,t.class,p,m,d,s,x.class),role:"alert"},i({class:"icon"},Ua[m]),a({class:"content"},...h),f&&c({onclick:f}))}}const Qt=e=>{const t=ke(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Wa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=ke(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Va=`import alert from "@grucloud/bau-ui/alert";
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
`,Ka=e=>{const{css:t}=e,n=ke(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},qa=`import alert from "@grucloud/bau-ui/alert";
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
`,Xa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Va,createComponent:Wa},{title:"Custom Alert ",description:"A custom alert.",code:qa,createComponent:Ka}],gridItem:Qt},Za=e=>{const t=H(e);return()=>t(Xa)},Ya=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:m})=>{const f=c.val.findIndex(x=>x.id===p);f!=-1&&(c.val[f].status=m)};return function(m={},...f){const x=({id:b})=>{d({id:b,status:"removing"});const C=c.val.findIndex(A=>A.id===b);C!=-1&&c.val.splice(C,1)},h=({Component:b})=>{const C={id:Math.random().toString(10).split(".")[1],Component:b,status:"inserting"};c.val.length>=i&&x({id:c.val[0].id}),c.val.push(C),setTimeout(()=>x(C),s)},w=b=>r({class:u.item,onclick:()=>x(b)},b.Component());return document.addEventListener("alert.add",b=>h(b.detail)),document.addEventListener("alert.remove",b=>x(b.detail)),r({class:B(u.stack,t==null?void 0:t.class,m.class)},n.loop(c,r(),w))}},Ja=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Ya(e,{deleteAfterDuration:2e4}),i=q(e),s=ke(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Qa=`import { Context } from "@grucloud/bau-ui/context";
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
`,er={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Qa,createComponent:Ja}]},tr=e=>{const t=H(e);return()=>t(er)},nr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Re(e),s=q(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},or=`import animate from "@grucloud/bau-ui/animate";
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
`,ar=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Re(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},rr=`import animate from "@grucloud/bau-ui/animate";
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
`,sr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:or,createComponent:nr},{title:"Component hide and show",description:"Hide and show a component",code:rr,createComponent:ar}]},ir=e=>{const t=H(e);return()=>t(sr)};function en(e,t={}){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,r.val=!0},u=o`
    display: flex;
    justify-content: center;
    align-items: center;
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
  `;return function(...p){let[{size:m=t.size??"md",variant:f=t.variant??"plain",color:x=t.color??"neutral",width:h=40,height:w=40,...b},...C]=K(p);return a({class:B(u,t==null?void 0:t.class,b.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:h,height:w,onload:c,onerror:l,class:B(x,f,m,u,t==null?void 0:t.class,b.class),...b}))}}const tn=e=>{const{css:t}=e,n=en(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},cr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=en(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},lr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,ur={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:lr,createComponent:cr}],gridItem:tn},dr=e=>{const t=H(e);return()=>t(ur)};function ct(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ee(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...m},...f]=K(l);const x=b=>{w.style.opacity=1,w.showModal();const C=d.getBoundingClientRect(),A=w.getBoundingClientRect();C.x<a.innerWidth/2?w.style.left=C.left+"px":w.style.left=C.right-A.width+"px",C.y<a.innerHeight/2?w.style.top=C.top+C.height+"px":(w.style.top=Math.max(0,C.top-A.height)+"px",A.height>C.top&&(w.style.height=C.top+"px"))},h=b=>{const C=()=>{w.close(),w.removeEventListener("transitionend",C)};w.addEventListener("transitionend",C),w.style.opacity=0},w=i({role:"presentation",class:B("popover",r,t==null?void 0:t.class,m==null?void 0:m.class),onclick:b=>b.target===w&&(h(),p==null?void 0:p.call())},s(u));return w.closeDialog=h,w.openDialog=x,w}}const pr=()=>ee.map(e=>`
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
`);function ve(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    &.input:disabled {
      filter: grayscale(100%);
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
    ${pr()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:B("input",t.class,t.size??"md",l,c,i,u.class)})}}const mr=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function nn(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
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

    ${mr()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",id:p,label:m,placeholder:f,Option:x,options:h,getOptionLabel:w=({label:_})=>_,...b},...C]=K(c);const A=ct(e),T=q(e),N=ve(e,{variant:u,color:d,size:l}),k=fe(e),D=n.state(""),M=n.state(""),L=n.state(!1),W=n.state(0),Q=()=>{L.val=!1},z=n.state(h),V=()=>{F.openDialog(),L.val=!0,M.val="",z.val=h},G=()=>{F.closeDialog(),L.val=!1,M.val=""},y=_=>{const{value:P}=_.target;M.val=P,P?z.val=h.filter(X=>w(X).match(new RegExp(`${P}`,"i"))):z.val=h},g=_=>{L.val?G():V()},v=({option:_,index:P})=>X=>{D.val=w(_),W.val=P,G()},S=_=>{switch(console.log("onkeydown",_.key,W.val),_.key){case"Escape":G();break;case"ArrowDown":W.val<z.val.length-1?W.val++:W.val=0;break;case"ArrowUp":W.val<=0?W.val=z.val.length-1:W.val--;break;case"Enter":D.val=w(z.val[W.val]),M.val="",G();break}},E=T({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":L,"aria-label":m,onclick:g,variant:u,color:d,size:l},()=>!D.val&&m,D),R=N({id:p,value:M,placeholder:f,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":L,oninput:y,onkeydown:S}),F=A({id:p,triggerEl:E,contentEl:(()=>a({class:B(u,d,l,"content")},R,()=>k({class:B(u,d,l)},z.val.map((_,P)=>i({class:()=>B(W.val==P&&"active"),onclick:v({option:_,index:P})},x(_))))))(),onClose:Q});return a({...b,class:B("autocomplete",s,t==null?void 0:t.class,b==null?void 0:b.class)},E,F)}}const on=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=nn(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},gr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=nn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},br=`import { Context } from "@grucloud/bau-ui/context";
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
`,hr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:br,createComponent:gr}],gridItem:on},fr=e=>{const t=H(e);return()=>t(hr)};function an(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...m]=K(r);return a({...p,class:B("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:B(u,l,c)},d),...m)}}const rn=e=>{const t=an(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},vr=e=>{const{bau:t}=e,{section:n}=t.tags,o=an(e);return()=>n(o({content:"10"},"☏"))},xr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,wr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:xr,createComponent:vr}],gridItem:rn},yr=e=>{const t=H(e);return()=>t(wr)};function sn(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,c=q(e),l=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",items:x,...h},...w]=K(d);return i({...h,class:B(l,t==null?void 0:t.class,h==null?void 0:h.class)},x.map(({href:b,name:C})=>s((b?c:r)({href:`${a.base}${b}`,color:f,variant:m,size:p,class:B(f,m,p)},C))))}}const cn=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=sn(e);return o=>n({...o,...t})},Cr=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=sn(e);return()=>n(a(o))},Sr=`import breadcrumbs, {
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
`,Er={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Sr,createComponent:Cr}],gridItem:cn},kr=e=>{const t=H(e);return()=>t(Er)},ln=e=>{const t=q(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size??""}`)},Tr=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Ar=`import button from "@grucloud/bau-ui/button";
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
`,Ir=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Dr=`import button from "@grucloud/bau-ui/button";
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
      Button(
        { disabled: true, color: "primary", variant: "outline", onclick },
        "Click me"
      )
    );
};
`,Nr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Ar,createComponent:Tr},{title:"Disabled Button",description:"A disabled button.",code:Dr,createComponent:Ir}],gridItem:ln},Mr=e=>{const t=H(e);return()=>t(Nr)},Br=()=>ee.map(e=>`
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
`);function lt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Br()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(r);return a({...d,class:B("button-group",l,u,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const un=e=>{const t=["ONE","TWO","THREE"],n=q(e),o=lt(e);return a=>o({...a},t.map(i=>n(a,i)))},$r=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=q(e),i=lt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Pr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Or={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Pr,createComponent:$r}],gridItem:un},_r=e=>{const t=H(e);return()=>t(Or)};function dn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...m]=K(c);return a({...p,type:"date",class:B("calendar",s,d,u,l,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const pn=e=>{const t=dn(e);return n=>t({...n})},Rr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=dn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Lr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,zr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Lr,createComponent:Rr}],gridItem:pn},jr=e=>{const t=H(e);return()=>t(zr)};function Hr(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:m,Previous:f,Next:x,...h}]=K(c);const w=()=>{s.val<=0?s.val=p.length-1:s.val--},b=()=>{s.val>=p.length-1?s.val=0:s.val++},C=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},p.map(m));return a({...h,class:B("carousel",l,i,t==null?void 0:t.class,h==null?void 0:h.class)},a({class:B("control","control-previous"),onclick:w},f()),a({class:B("control","control-next"),onclick:b},x()),C)}}const Gr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Ur=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=q(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Hr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Gr,Slide:s,Previous:c,Next:l}))},Fr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Wr={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Fr,createComponent:Ur}]},Vr=e=>{const t=H(e);return()=>t(Wr)},mn=e=>{const t=Le(e);return n=>t({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},Kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Le(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},qr=`import chip from "@grucloud/bau-ui/chip";
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
`,Xr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:qr,createComponent:Kr}],gridItem:mn},Zr=e=>{const t=H(e);return()=>t(Xr)};function gn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(r);return a({type:"checkbox",required:"required",...d,class:B(i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const bn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=gn(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Yr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=gn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Jr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Qr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Jr,createComponent:Yr}],gridItem:bn},es=e=>{const t=H(e);return()=>t(Qr)},ts=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=it(e),i=q(e),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},ns=`import button from "@grucloud/bau-ui/button";
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
`,os={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:ns,createComponent:ts}]},as=e=>{const t=H(e);return()=>t(os)};function rs(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...m]=K(r);return a({class:B(i,t==null?void 0:t.class,p.class)},a({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>B("content",d.val&&"content-open")},m))}}const ss=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=rs(e),s=q(e),r=Bt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},is=`import drawer from "@grucloud/bau-ui/drawer";
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
`,cs={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:is,createComponent:ss}]},ls=e=>{const t=H(e);return()=>t(cs)},hn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=nt(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},us=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=nt(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},ds=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,ps={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:ds,createComponent:us}],gridItem:e=>hn(e,{base:"/components/drillDownMenu",hashBased:!0})},ms=e=>{const t=H(e);return()=>t(ps)};function ut(e,t={}){const{bau:n,css:o}=e,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(u,...d){const{size:p=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",Component:x,disabled:h,...w}=u;return a({class:B(c.base,h&&c.disabled,t==null?void 0:t.class,u.class)},s({class:B(m,f,p)},x({disabled:h}),r({type:"file",disabled:h,...w})),i({class:"filename-display"}))}}const fn=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),u=ut(e),d=m=>{const f=m.target.files[0];f?l.val=f.name:l.val="No file selected"},p=({disabled:m})=>r({class:B(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return m=>u({Component:p,name:"file",accept:"text/*",onchange:d,...m})},gs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=ut(e),p=f=>{const x=f.target.files[0];x?u.val=x.name:u.val="No file selected"},m=({disabled:f})=>c({class:B(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,f&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(d({Component:m,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},bs=`import classNames from "@grucloud/bau-css/classNames";
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
            gap: 1rem;
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
`,hs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:bs,createComponent:gs}],gridItem:fn},fs=e=>{const t=H(e);return()=>t(hs)};function Te(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;
    & > header {
      text-align: center;
      & h1 {
        line-height: 0;
        font-size: 1.3rem;
      }
    }
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
      font-size: smaller;
      color: var(--color-content-secondary);
    }
    & > footer {
      display: flex;
      gap: 1rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...m]=K(r);return a({...p,class:B("form",u,l,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const Oe={sm:12,md:16,lg:24},vs=()=>ee.map(e=>`
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
`);function He(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:m=!0,...f}={}){const x=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Oe[u]};
      height: ${Oe[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${vs()}
    `;return i({class:{deps:[m],renderProp:()=>h=>B("spinner",x,d,p,h==!1?"":"visibility",t==null?void 0:t.class,f.class)},version:"1.1",x:"0px",y:"0px",width:Oe[u],height:Oe[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...f},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function dt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:m,...f},...x]=K(l);const h=q(e),w=He(e);return n.bind({deps:[m],render:()=>b=>h({...f,class:B("loadingButton",u,d,p,r,b&&"loading",t==null?void 0:t.class,f==null?void 0:f.class)},w({size:u,variant:d,color:p,visibility:b}),i({class:b&&"loading"},x))})}}const xs=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=dt(e),d=ke(e,{variant:"outline",color:"danger"}),p=ve(e),m=Te(e,{class:n`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),f=Ee(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:h=()=>{}}){const w=t.state(!1),b=t.state("");return f(m({onsubmit:async A=>{const{username:T,password:N}=A.target.elements;A.preventDefault();try{w.val=!0;const k=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:T.value,password:N.value})});if(k.ok){const D=await k.json();h(D)}else k.status==401?b.val="Invalid username or password":b.val=k.statusText}catch(k){b.val=k.message}finally{w.val=!1}}},s(c({width:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>b.val&&d(b.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:w},"Login"))))}},ws=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, h1, header, label, img, footer } = bau.tags;

  const LoadingButton = loadingButton(context);
  const Alert = alert(context, { variant: "outline", color: "danger" });
  const Input = input(context);
  const Form = form(context, {
    class: css\`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    \`,
  });
  const Paper = paper(context, {
    class: css\`
      max-width: 400px;
    \`,
  });

  type LoginFormProp = {
    onLoggedIn: (response: object) => void;
  };

  return function LoginForm({ onLoggedIn = () => {} }: LoginFormProp) {
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      const { username, password } = event.target.elements;
      event.preventDefault();
      try {
        loadingState.val = true;
        const response = await fetch("/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          onLoggedIn(json);
        } else if (response.status == 401) {
          errorMessageState.val = "Invalid username or password";
        } else {
          errorMessageState.val = response.statusText;
        }
      } catch (error: any) {
        errorMessageState.val = error.message;
      } finally {
        loadingState.val = false;
      }
    };

    return Paper(
      Form(
        { onsubmit },
        header(
          img({ width: "100", src: \`\${config.base}/gc.svg\` }),
          h1("Login to Grucloud")
        ),
        section(
          () => errorMessageState.val && Alert(errorMessageState.val),
          label(
            "Email",
            Input({
              type: "email",
              autofocus: true,
              placeholder: "Email",
              name: "username",
              autocomplete: "username",
              required: true,
            })
          ),
          label(
            "Password",
            Input({
              type: "password",
              placeholder: "Password",
              name: "password",
              autocomplete: "current-password",
              minlength: "8",
              required: true,
            })
          )
        ),
        footer(
          LoadingButton(
            {
              type: "submit",
              variant: "solid",
              color: "primary",
              loading: loadingState,
            },
            "Login"
          )
        )
      )
    );
  };
};
`,ys={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Login page",description:"A login page.",code:ws,createComponent:xs}]},Cs=e=>{const t=H(e);return()=>t(ys)},vn=(e,t={})=>{const n=ve(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Ss=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ve(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Es=`import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, h3 } = bau.tags;

  const Input = input(context);

  return () =>
    section(
      h3("Basic input"),
      Input({
        id: "my-input",
        name: "my-input",
        placeholder: "Enter Text",
        // oninput: (event)=> {}
      }),
      h3("Disabled input"),
      Input({
        name: "my-input-disabled",
        placeholder: "Enter Text",
        disabled: true,
      })
    );
};
`,ks={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Es,createComponent:Ss}],gridItem:vn},Ts=e=>{const t=H(e);return()=>t(ks)};function xn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>ee.map(l=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:m=t.color??"neutral",running:f,...x}]=K(u);return i({...x,role:"progressbar",class:{deps:[f],renderProp:()=>h=>B("linearProgress",d,m,c,h&&"running",t==null?void 0:t.class,x==null?void 0:x.class)}})}}const wn=e=>{const t=xn(e);return n=>t({...n,running:!0})},As=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=q(e),i=xn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},Is=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Ds={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Is,createComponent:As}],gridItem:wn},Ns=e=>{const t=H(e);return()=>t(Ds)},yn=e=>{const t=dt(e);return n=>t({...n,loading:!0},"Save")},Ms=e=>{const{bau:t}=e,{section:n}=t.tags,o=dt(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Bs=`import loadingButton from "@grucloud/bau-ui/loadingButton";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
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
`,$s={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Bs,createComponent:Ms}],gridItem:yn},Ps=e=>{const t=H(e);return()=>t($s)},Os=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],_s=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=fe(e),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},Os.map(s))},Rs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ls=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=fe(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Rs.map(r)))},zs=`import list from "@grucloud/bau-ui/list";
import { Context } from "@grucloud/bau-ui/context";

const phoneCodes = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, span, li } = bau.tags;

  const List = list(context);

  const ListItem = ({ code, label }: any) =>
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
      List({ variant: "outline", color: "primary" }, phoneCodes.map(ListItem))
    );
};
`,js={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:zs,createComponent:Ls}],gridItem:_s},Hs=e=>{const t=H(e);return()=>t(js)};function pt(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    padding: 1rem;
    border: 0px;
    > div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-height: 90vh;
      max-width: 95vw;
      & > header {
        font-size: 1.5rem;
        font-weight: 500;
      }
      & > main,
      > section {
        flex-grow: 1;
        overflow-y: auto;
      }
      & > footer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        gap: 1rem;
      }
    }

    ${(()=>ee.map(c=>`
&.modal.plain.${c} {
  color: inherit;
}
&.modal.outline.${c} {
  color: inherit;
}
&.modal.soft.${c} {
  color: inherit;
}
&.modal.solid.${c} {
}
`).join(`
`))()}
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...m},...f]=K(l);return a({class:B("modal",r,p,d,u,t==null?void 0:t.class,m==null?void 0:m.class)},i(...f))}}const Cn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=q(e),c=pt(e),l=()=>o(Array(10).fill("").map((d,p)=>s(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(r({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),r({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(r({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},Gs=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=q(e),l=pt(e),u=()=>o(Array(10).fill("").map((p,m)=>s(m+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Us=`import modal from "@grucloud/bau-ui/modal";
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
`,Fs={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Us,createComponent:Gs}],gridItem:Cn},Ws=e=>{const t=H(e);return()=>t(Fs)},Vs=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=q(e),r=ct(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},Ks=`import popover from "@grucloud/bau-ui/popover";
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
`,qs={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ks,createComponent:Vs}]},Xs=e=>{const t=H(e);return()=>t(qs)};function Zs(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:m,href:f})=>s({href:`${a.base}${f}`},r({class:"sublabel"},d),i({class:`label ${d}`},m??p));return function(...p){let[{size:m=t.size??"md",variant:f=t.variant??"plain",color:x=t.color??"neutral",data:h={},...w}]=K(p);const{next:b,previous:C}=h;return c({"data-paginationnav":JSON.stringify(h),"aria-label":"pages navigation",...w,class:B("paginationNavigation",m,l,t==null?void 0:t.class,w==null?void 0:w.class)},(C==null?void 0:C.href)&&u({text:"Previous"})(C),(b==null?void 0:b.href)&&u({text:"Next"})(b))}}const Ys=e=>{const{bau:t}=e,{section:n}=t.tags,o=Zs(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Js=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Qs={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Js,createComponent:Ys}]},ei=e=>{const t=H(e);return()=>t(Qs)},ti=e=>{const{bau:t}=e,{div:n}=t.tags,o=Ee(e);return a=>o({...a},n(`Paper ${a.size??""}`))},ni=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ee(e);return()=>n(a({size:"md"},o("My content")))},oi=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,ai={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:oi,createComponent:ni}],variantColorTableDisable:!0,gridItem:ti},ri=e=>{const t=H(e);return()=>t(ai)};function Sn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=K(c);return a({...p,type:"radio",class:B("radio-button",l,d,u,s,t==null?void 0:t.class,p==null?void 0:p.class)})}}const En=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=Sn(e);return s=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),o("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},si=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Sn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},ii=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,ci={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:ii,createComponent:si}],gridItem:En},li=e=>{const t=H(e);return()=>t(ci)},ui=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ge(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=q(e),l=ct(e),u=fe(e),d=o`
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
    ${ui()}
  `;return function(...m){let[{size:f=t.size??"md",variant:x=t.variant??"outline",color:h=t.color??"neutral",label:w,Option:b,options:C,getOptionLabel:A=({label:E})=>E,...T},...N]=K(m);const k=n.state(""),D=n.state(!1),M=n.state(0),L=()=>{v.openDialog(),v.focus(),D.val=!0},W=()=>{v.closeDialog(),D.val=!1},Q=()=>{D.val=!1},z=E=>{D.val?W():L(),E.preventDefault()},V=({option:E,index:R})=>$=>{k.val=A(E),S.value=k.val,S.setCustomValidity(""),M.val=R,W(),$.preventDefault()},G=E=>{switch(E.preventDefault(),E.key){case"Escape":W();break;case"ArrowDown":M.val<C.length-1?M.val++:M.val=0;break;case"ArrowUp":M.val<=0?M.val=C.length-1:M.val--;break;case"Enter":D.val?(k.val=A(C[M.val]),W()):L();break}},y=()=>u({tabindex:"0",class:B(h,x)},C.map((E,R)=>i({class:()=>B(M.val==R&&"active"),onclick:V({option:E,index:R})},b(E)))),g=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":D,"aria-label":w,onclick:z,color:h,variant:x,size:f},()=>!k.val&&w,k),v=l({triggerEl:g,contentEl:y(),onClose:Q}),S=s(T,r({value:""},"--Select Category--"),C.map(E=>r(A(E))));return a({...T,class:B("select",h,f,d,t==null?void 0:t.class,T==null?void 0:T.class),onkeydown:G},S,g,v)}}const kn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Ge(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},di=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ge(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},pi=`import select from "@grucloud/bau-ui/select";
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
`,mi=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Ge(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},gi=`import select from "@grucloud/bau-ui/select";
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
`,bi={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:pi,createComponent:di},{title:"Select AWS region",description:"Select the AWS region",code:gi,createComponent:mi}],gridItem:kn},hi=e=>{const t=H(e);return()=>t(bi)};function Ue(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>ee.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...m]=K(c);return a({...p,type:"range",class:B("slider",d,u,l,s,t==null?void 0:t.class,p.class)},...m)}}const Tn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ue(e);return i=>a({...i,oninput:o})},fi=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Ue(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},vi=`import slider from "@grucloud/bau-ui/slider";
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
`,xi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ue(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},wi=`import slider from "@grucloud/bau-ui/slider";
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
`,yi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ue(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},Ci=`import slider from "@grucloud/bau-ui/slider";
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
`,Si={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:vi,createComponent:fi},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:wi,createComponent:xi},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Ci,createComponent:yi}],gridItem:Tn},Ei=e=>{const t=H(e);return()=>t(Si)},An=e=>{const t=He(e);return n=>t({...n})},ki=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=He(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},Ti=`import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Button = button(context);
  const Spinner = spinner(context, { size: "lg" });

  const runningState = bau.state(true);

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
      Spinner({ visibility: runningState })
    );
};
`,Ai={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Ti,createComponent:ki}],gridItem:An},Ii=e=>{const t=H(e);return()=>t(Ai)},Di=()=>ee.map(e=>`
`).join(`
`);function In(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,span:r}=n.tags,c=o`
    display: flex;
    flex-direction: column;
    padding: 1rem;
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
        & .step-label {
          text-align: center;
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
    ${Di()}
  `;return function(...u){let[{color:d,variant:p="plain",size:m,stepperDefs:f=[],activeStepIndex:x,...h},...w]=K(u);const b=n.state(f.map((N,k)=>({...N,index:k}))),C=n.derive(()=>b.val[x.val]),A=N=>{const{Header:k,disabled:D,name:M,index:L}=N;return s({class:()=>B(C.val.name==M&&"active",x.val<L&&"not-completed",x.val>L&&"completed",D&&"disabled")},r({class:"step-number"},L+1),r({class:"step-label"},()=>k(N)))};return a({class:B("stepper",p,m,d,c,t==null?void 0:t.class,h.class)},n.loop(b,i(),A),n.bind({deps:[C],render:()=>N=>N.Content?N.Content({}):""}))}}const Ni=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=In(e),r=q(e),c=({name:f})=>f,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},m=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:d,variant:"outline",color:"primary"},"Previous"),r({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),m())},Mi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Bi=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=q(e,{variant:"outline",color:"primary"});return function({onclickProvider:d}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({"data-button-select-aws":!0,onclick:d("AWS")},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({"data-button-select-azure":!0,onclick:d("Azure")},r({width:261,height:90,fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({"data-button-select-google":!0,onclick:d("Google")},r({width:300,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}},Fe=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},We=e=>{const{bau:t}=e,{i:n}=t.tags,o=q(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},ie="https://github.com/grucloud/grucloud/",ce="main",$i={AWS:[{title:"EC2 an instance with public address",description:"Deploy a EC2 virtual machine attached to an elastic public address",url:ie,branch:ce,directory:"examples/aws/ec2"},{title:"EKS",description:"Deploy a kubernetes cluster with EKS",url:ie,branch:ce,directory:"examples/aws/EKS/eks-simple"},{title:"Route53 TXT Record",description:"Create an Hosted Zone and a TXT record",url:ie,branch:ce,directory:"examples/aws/route53/dns-validation-record-txt"}],Azure:[{title:"Virtual machine",description:"Deploy a virtual machine with a public address, protected by a firewall",url:ie,branch:ce,directory:"examples/azure/Compute/vm"}],Google:[{title:"Virtual machine",description:"Deploy a virtual machine on the default network",resources:["compute.instance"],url:ie,branch:ce,directory:"examples/google/vm"},{title:"Virtual machine inside a network",description:"Create a network, a sub-network, a virtual machine and firewall rules for HTTP/HTTPS",url:ie,branch:ce,directory:"examples/google/vm-network",resources:["compute.network","compute.subnetwork","compute.subnetwork"]},{title:"Secure static website",description:"Deploy a static website served with HTTPS",url:ie,branch:ce,directory:"examples/google/storage/website-https"},{title:"DNS records",description:"Manages DNS records such as A, CNAME, TXT and MX records",url:ie,branch:ce,directory:"examples/google/dns/github-page"}]},Pi=e=>{const{bau:t,css:n}=e,{li:o,strong:a,span:i}=t.tags;return function({project:r,onclickItem:c}){return o({onclick:c(r),class:n`
          flex-direction: column;
          align-items: flex-start;
        `},a(r.title),i(r.description))}},Oi=e=>{const{bau:t,css:n}=e,{strong:o,small:a}=t.tags,i=q(e);return function({item:r,onclickItem:c}){return i({onclick:c(r),class:n`
          &.button {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
          }
        `},o(r.title),a(r.description))}},_i=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,footer:s}=t.tags,r=q(e),c=Te(e),l=We(e),u=Fe(e),d=Oi(e),p=Pi(e),m=fe(e),f=pt(e);return function({providerName:h,onclickPrevious:w,onclickImportExistingInfra:b,onclickImportFromTemplate:C}){const A=f({id:"my-dialog"},a("Infrastructure from template"),i("Select an infrastructure template from the list below."),n(m($i[h].map(T=>p({project:T,onclickItem:N=>()=>{A.close(),C(N)}})))),s(r({variant:"outline",onclick:()=>{A.close()}},"Cancel")));return c({name:"form-import-project","data-form-import-project":!0},a(o("Import Project"),i("")),n(d({"data-selection-project-import-existing":!0,item:{title:"Import an existing infrastructure",description:"Choose this option to visualize an existing infrastructure."},onclickItem:()=>()=>{b()}}),d({"data-selection-project-new-from-template":!0,item:{title:"Create new infrastructure from a template",description:"This option lets you create an infrastructure from a selection of ready made template."},onclickItem:()=>()=>{A.showModal()}})),A,u(l({onclick:w})))}},Ri=e=>{const{bau:t}=e,{span:n}=t.tags,o=Ge(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},Li=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:s,i:r}=t.tags,c=q(e),l=ve(e),u=Te(e),d=We(e),p=Fe(e),m=Ri(e);return function({onclickPrevious:x,onclickNext:h}){return u({name:"form-config-aws",onsubmit:b=>{b.preventDefault(),h()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(s("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),s("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Region",m({name:"region"}))),p(d({onclick:x}),c({type:"submit",variant:"outline",color:"primary"},"Next",r("▶"))))}},zi=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:s,label:r,i:c,ol:l,li:u,h3:d,pre:p,em:m,div:f}=t.tags,x=q(e),h=We(e),w=Fe(e),b=ve(e),C=Te(e);return function({onclickPrevious:T,onclickNext:N}){const k=M=>{M.preventDefault(),N()},D=n`
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
    `;return C({name:"form-config-azure",onsubmit:k,"data-infra-create":!0,class:D},i(a("Azure Configuration"),s("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),s("Retrieve the ",m("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),r("Subscription Id",b({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",minLength:32,maxLength:32,size:32,required:!0}))),u(d("Tenant Id"),s("Retrieve the ",m("Tenant Id")," with the following command:"),p("az account show"),r("Tenant Id",b({"data-input-azure-tenant-id":!0,placeholder:"Tenant Id",name:"tenantId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("App ID and PASSWORD"),s("Retrieve the ",m("APP_ID")," and ",m("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),f({class:n`
                  display: flex;
                  flex-direction: column;
                  gap: 1rem;
                `},r("App Id",b({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",minLength:36,maxLength:36,size:36,required:!0})),r("Password",b({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",minLength:8,maxLength:64,size:64,required:!0})))))),w(h({onclick:T}),x({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},ji=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,p:r,div:c,i:l,ol:u,li:d,span:p,em:m,a:f,table:x,tbody:h,th:w,tr:b,td:C}=t.tags,{svg:A,use:T}=t.tagsNS("http://www.w3.org/2000/svg"),N=ut(e),k=q(e),D=Te(e),M=We(e),L=Fe(e);return function({onclickPrevious:Q,onclickNext:z}){const V=t.state("No file selected"),G=t.state({}),y=t.state(!0),g=$=>{const F=$.target.files[0];if(F){V.val=F.name;const _=new FileReader;_.readAsText(F),_.onload=()=>{try{debugger;if(_.result){const P=JSON.parse(_.result);G.val=P,P.project_id&&(y.val=!1)}}catch{}},_.onerror=()=>{console.log(_.error)}}else V.val=""},v=({fileName:$,content:F})=>x({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},h(b(w("Credential File"),C($)),b(w("Project Name"),C(F.project_id)),b(w("Service Account"),C(F.client_email)))),S=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},A({width:100,height:100,fill:"currentColor"},T({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),E=$=>{$.preventDefault(),z()},R=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return D({name:"form-config-google",class:R,onsubmit:E,"data-infra-create":!0},s(i("Google Configuration"),r("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",f({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",m("CREATE SERVICE ACCOUNT"),""),d("Set the ",m("Service account name")," to 'grucloud' for instance"),d("Click on ",m("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",m("CONTINUE"),""),d("Click on ",m("DONE"),""),d("Go to the ",m("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",m("Manage keys"),""),d("Click on ",m("ADD KEYS"),", then ",m("Create new key"),""),d("Click on ",m("CREATE")," to download the credential file in JSON format.")),N({"data-input-google-upload":!0,Component:S,name:"file",accept:"application/JSON",onchange:g}),()=>v({fileName:V.val,content:G.val})),L(M({onclick:Q}),()=>k({type:"submit",variant:"outline",color:"primary",disabled:y.val},"Next",l("▶"))))}},Hi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=In(e),r=Bi(e),c=Li(e),l=zi(e),u=ji(e),d=_i(e),p=t.state(""),m=t.state(0),f=({name:x})=>x;return function(){const h=k=>()=>{p.val=k,m.val++},w=()=>{m.val++},b=()=>{m.val++},A=[{name:"Provider Selection",Header:f,Content:()=>r({onclickProvider:h}),enter:async()=>{p.val=""}},{name:"Import",Header:()=>"Import Project",Content:()=>d({providerName:p.val,onclickPrevious:T,onclickImportExistingInfra:w,onclickImportFromTemplate:b})},{name:"Configuration",Header:()=>`Configuration ${p.val}`,Content:()=>{switch(p.val){case"AWS":return c({onclickPrevious:T,onclickNext:N});case"Azure":return l({onclickPrevious:T,onclickNext:N});case"Google":return u({onclickPrevious:T,onclickNext:N})}}},{name:"Scan",Header:f,Content:()=>a(i("My stepper 3 Content"))}],T=()=>{m.val>0&&m.val--},N=()=>{A.length>m.val+1&&m.val++};return o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:A,activeStepIndex:m}))}},Gi=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

import stepStepProviderSelection from "./cloud-config/stepProviderSelection";
import importProject from "./cloud-config/importProject";

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
  const ImportProject = importProject(context);

  const providerNameState = bau.state("");
  const activeStepIndex = bau.state(0);

  // For testing
  // const providerNameState = bau.state("AWS");
  // const activeStepIndex = bau.state(1);

  const Header = ({ name }: any) => name;

  return function StepperCloudConfig() {
    const onclickProvider = (providerName: string) => () => {
      providerNameState.val = providerName;
      activeStepIndex.val++;
    };

    const onclickImportExistingInfra = () => {
      activeStepIndex.val++;
    };

    const onclickImportFromTemplate = () => {
      //TODO
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
        name: "Import",
        Header: () => "Import Project",
        Content: () =>
          ImportProject({
            providerName: providerNameState.val,
            onclickPrevious,
            onclickImportExistingInfra,
            onclickImportFromTemplate,
          }),
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

    return section(
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
};
`,Ui={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:Mi,createComponent:Ni},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Gi,createComponent:Hi}]},Fi=e=>{const t=H(e);return()=>t(Ui)},Wi=()=>ee.map(e=>`
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
`);function Dn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Wi()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(r);return a({...d,class:B("switch",i,u,l,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Nn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=Dn(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},Vi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=Dn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Ki=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,qi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Ki,createComponent:Vi}],gridItem:Nn},Xi=e=>{const t=H(e);return()=>t(qi)},Zi=()=>ee.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Ae(e,t={}){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=o`
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
    ${Zi()}
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",...f},...x]=K(u);const h=n.state(a),w=n.state(a[0]),b=T=>h.val.find(N=>N.name==T),C=T=>{const{Header:N,disabled:k,name:D}=T;return r({class:()=>B(w.val.name==D&&"active",k&&"disabled"),onclick:M=>M.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:D},bubbles:!0}))},N(T))},A=i({class:B("tabs",p,d,m,c,t==null?void 0:t.class,f.class)},n.loop(h,s(),C),()=>w.val.Content?w.val.Content({}):"");return A.addEventListener("tab.select",T=>{var D,M;const{tabName:N}=T.detail,k=b(N);k&&((D=w.val.exit)==null||D.call(),w.val=k,(M=k.enter)==null||M.call())},!1),A.addEventListener("tab.add",T=>{var k;const{tab:N}=T.detail;(k=N.enter)==null||k.call(),h.val.push(N)},!1),A.addEventListener("tab.remove",T=>{var k;const N=h.val.findIndex(D=>D.name==T.detail.tabName);N>0&&((k=h.val[N].exit)==null||k.call(),h.val.splice(N,1))},!1),A}}const Mn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ae(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},Yi=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ae(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Ji=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Qi=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Ae(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},ec=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Bn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},tc=e=>{const{css:t}=e,n=Ae(e,{tabDefs:Bn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},nc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,oc=e=>{const{css:t}=e,n=Bn(e),o=Ae(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},ac=`import tabs from "@grucloud/bau-ui/tabs";
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
`,rc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Ji,createComponent:Yi},{title:"Extended Tabs",description:"An extended tabs.",code:ec,createComponent:Qi},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:nc,createComponent:tc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:ac,createComponent:oc}],gridItem:Mn},sc=e=>{const t=H(e);return()=>t(rc)};function Ie(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
  :root {
    --table-cell-padding: 0.75rem;
    --table-background: transparent;
    --table-stripe-background: rgba(0, 0, 0, 0.03);
    --table-border-width: 1px;
    --table-border-color: var(--color-emphasis-300);
    --table-head-background: inherit;
    --table-head-color: var(--font-color-secondary);
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
    width: fit-content;
  `;return function(...c){let[{...l},...u]=K(c);return i({...l,class:B("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const ic=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function d(h,w,b,C,A){return{name:h,calories:w,fat:b,carbs:C,protein:A}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],m=({name:h,calories:w})=>s(i(h),i({class:n`
            text-align: right;
          `},w)),f=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),x=Ie(e,{class:n`
      max-width: 650px;
    `});return()=>o(x(r(u("Basic Table"),f(),l(p.map(m)))))},cc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function xe(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const lc=[xe("Frozen yoghurt",159,6,24,4),xe("Ice cream sandwich",237,9,37,4.3),xe("Eclair",262,16,24,6),xe("Cupcake",305,3.7,67,4.3),xe("Gingerbread",356,16,49,3.9)],uc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:f,calories:x})=>s(i(f),i({class:n`
            text-align: right;
          `},x)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=Ie(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(m(r(u("Table Dense"),p(),l(lc.map(d)))))},dc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function we(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const pc=[we("Frozen yoghurt",159,6,24,4),we("Ice cream sandwich",237,9,37,4.3),we("Eclair",262,16,24,6),we("Cupcake",305,3.7,67,4.3),we("Gingerbread",356,16,49,3.9)],mc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:f,calories:x})=>s(i(f),i({class:n`
            text-align: right;
          `},x)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=Ie(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(m(r(u("Table Zebra"),p(),l(pc.map(d)))))},gc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,bc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:cc,createComponent:ic},{title:"Dense",description:"A dense table.",code:dc,createComponent:uc},{title:"Zebra",description:"A zebra table.",code:gc,createComponent:mc}]},hc=e=>{const t=H(e);return()=>t(bc)},fc=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=Xt(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},vc=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,xc={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:vc,createComponent:fc}]},wc=e=>{const t=H(e);return()=>t(xc)};function $n(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=lt(e),s=q(e),r=He(e),c=o`
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
  `,l=({label:f,icon:x,...h})=>s({"aria-label":f,title:f,...h},x),u=({count:f,totalCount:x,page:h,rowsPerPage:w})=>a({class:"pages-numbers"},Number(h-1)*Number(w)+(f>0?1:0),"-",Math.min(h*w,x)," of ",x),d=({count:f,page:x,rowsPerPage:h})=>a({class:"pages-numbers"},(x-1)*h+(f>0?1:0),"-",x*h),p=f=>f<=1,m=(f,x,h)=>f>=Math.ceil(x/h);return function(...x){let[{size:h=t.size??"md",variant:w=t.variant??"outline",color:b=t.color??"neutral",count:C=0,totalCount:A=0,page:T=1,rowsPerPage:N=50,onPageChange:k,isLoading:D=!1,disableFirst:M=()=>p(T),disablePrevious:L=()=>p(T),disableNext:W=()=>m(T,A,N),disableLast:Q=()=>m(T,A,N),...z},...V]=K(x);const G=Math.max(0,Math.ceil(A/N)),y=k({page:1}),g=k({page:T-1}),v=k({page:T+1}),S=k({page:G}),E=[{label:"First",icon:"⟪",onclick:y,disabled:M()},{label:"Previous",icon:"⟨",onclick:g,disabled:L()},{label:"Next",icon:"⟩",onclick:v,disabled:W()},{label:"Last",icon:"⟫",onclick:S,disabled:Q()}];return a({...z,class:B("table-pagination",c,D&&"disabled",t==null?void 0:t.class,z==null?void 0:z.class)},r({class:"spinner",visibility:D,size:"md"}),A>0?u({count:C,totalCount:A,page:T,maxPages:G,rowsPerPage:N}):d({count:C,page:T,maxPages:G,rowsPerPage:N}),i({variant:w,color:b},E.map(R=>l({...R,variant:w,color:b}))))}}const yc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Cc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=yc(45),u=({name:b,email:C})=>i(a(b),a(C)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=$n(e),m=Ie(e,{class:n`
      max-width: 650px;
    `}),f=t.state(l),x=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>f.val.slice(x.val.page*x.val.rowsPerPage,(x.val.page+1)*x.val.rowsPerPage)),w=({page:b})=>C=>{x.val.page=b};return()=>m(s(d(),()=>c(h.val.map(u))),()=>p({...x.val,onPageChange:w}))},Sc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),m=t.derive(()=>d.val.length),f=t.state(1),x=t.state(10),h=t.derive(()=>d.val),w=M=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(M).toString()}`,b=({page:M})=>L=>{f.val=M,C(w({page:M,per_page:x.val}))};C(w({page:1,per_page:x.val}));async function C(M){try{u.val=!0;const L=await fetch(M,{});if(L.ok){const W=await L.json();d.val=W;return}throw L}catch(L){p.val=L.message}finally{u.val=!1}}const A=({name:M,description:L,stargazers_count:W})=>i(a(M),a(L),a({class:n`
            text-align: right;
          `},W)),T=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),N=$n(e),k=Ie(e,{class:n`
      min-width: 650px;
    `}),D=({message:M})=>l(M);return()=>k(()=>N({rowsPerPage:x.val,page:f.val,count:m.val,totalCount:-1,isLoading:u.val,onPageChange:b,disableNext:()=>!1}),s(T(),()=>p.val&&D({message:p.val}),()=>c(h.val.map(A))))},Ec=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=Cc(e),l=Sc(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function De(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:m,onChange:f,...x},...h]=K(c);return i({type:"button",...x,"aria-pressed":{deps:[p],renderProp:()=>w=>w},class:{deps:[p],renderProp:()=>w=>B("toggle",l,d,u,s,w&&"selected",t==null?void 0:t.class,x==null?void 0:x.class)},disabled:m},h)}}const Pn=e=>{const{bau:t}=e,n=De(e);return console.log("grid item"),o=>{const a=t.state(!1);return n({...o,selected:a,onclick:()=>a.val=!a.val},"Toggle Me")}},kc=e=>{const{bau:t}=e,{section:n}=t.tags,o=De(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Tc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Ac={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Tc,createComponent:kc}],gridItem:Pn},Ic=e=>{const t=H(e);return()=>t(Ac)},Dc=()=>ee.map(e=>`
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
`);function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Dc()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...m},...f]=K(r);const x=new Set,h=w=>{const{value:b}=w.target;d?(x.clear(),x.add(b)):x.has(b)?x.delete(b):x.add(b),p({event:w,values:[...x]})};return a({...m,class:B("toggle-group",c,u,l,i,t==null?void 0:t.class,m==null?void 0:m.class),onclick:h},...f)}}const On=e=>{const{bau:t}=e,n=mt(e),o=De(e);return a=>{const i=t.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return n({...a,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:l})=>()=>o({...a,value:l,selected:i.val.includes(l),"area-label":c},c)))}},Nc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=De(e),s=mt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},Mc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Bc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=De(e),s=mt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},$c=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Pc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Mc,createComponent:Nc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:$c,createComponent:Bc}],gridItem:On},Oc=e=>{const t=H(e);return()=>t(Pc)};function gt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
    position: relative;
    display: inline-block;
    & .container {
      & .content {
        box-shadow: var(--shadow-m);
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",...f},...x]=K(c);const h=i({class:B("container",...u.split("-"))},i({class:B("content",m,p,d),role:"tooltip"},l)),w=k=>`move-to-${k}`,b=(k,D,M)=>{if(k()){const L=w(D);h.classList.add(L),h.classList.add(D),h.classList.remove(M)}},C=(k,D)=>{const M=w(k);h.classList.contains(M)&&(h.classList.remove(M),h.classList.add(D),h.classList.remove(k))},A=k=>{const D=h.getBoundingClientRect();b(()=>D.x<0,"right","left"),b(()=>D.x+D.width>a.innerWidth,"left","right"),b(()=>D.y<0,"bottom","top"),b(()=>D.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},T=k=>{h.classList.remove("visible"),C("right","left"),C("left","right"),C("bottom","top"),C("top","bottom")};return i({...f,class:B("tooltip",s,t==null?void 0:t.class,f==null?void 0:f.class),bauMounted:({element:k})=>{k.addEventListener("mouseover",A),k.addEventListener("mouseout",T)},bauUnmounted:({element:k})=>{k.removeEventListener("mouseover",A),k.removeEventListener("mouseout",T)}},...x,h)}}const _n=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=q(e),s=gt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return c=>s({titleEl:r(),...c},i(c,`${c.color} ${c.variant}`))},_c=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=q(e),s=gt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Rc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Lc=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Le(e,{variant:"outline",color:"primary"}),c=gt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},zc=`import tooltip from "@grucloud/bau-ui/tooltip";
import chip from "@grucloud/bau-ui/chip";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, p, em, section } = bau.tags;

  const Chip = chip(context, { variant: "outline", color: "primary" });

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
`,jc={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Rc,createComponent:_c},{title:"Grid",description:"Various tooltip position",code:zc,createComponent:Lc}],gridItem:_n},Hc=e=>{const t=H(e);return()=>t(jc)},Rn=e=>{const t=tt(e);return n=>t(n)},Gc=e=>{const{bau:t}=e,{section:n}=t.tags,o=tt(e);return()=>n(o({}))},Uc=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Fc={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Uc,createComponent:Gc}],gridItem:Rn},Wc=e=>{const t=H(e);return()=>t(Fc)},Vc=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Ln(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Vc({css:o,createGlobalStyles:a}),d=it(e),p=({depth:m=1,maxDepth:f,color:x,variant:h,size:w})=>b=>{const{children:C,expanded:A}=b,T=n.state(!A),N=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:D=>{C&&(T.val=!T.val)}},i(b.data)),k=()=>s({class:B(x,w)},C.map(p({depth:m+1,maxDepth:f})));return r(d({Header:N,Content:C&&m<f&&k}))};return function({tree:f,maxDepth:x=1/0,size:h=t.size??"md",variant:w=t.variant??"outline",color:b=t.color??"neutral",...C}){return c({class:B(u.nav,h,w,b,t==null?void 0:t.class,C.class)},f.children&&s(f.children.map(p({maxDepth:x,color:b,variant:w,size:h}))))}}const zn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Ln(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},Kc=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Ln(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},qc=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Xc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:qc,createComponent:Kc}],gridItem:zn},Zc=e=>{const t=H(e);return()=>t(Xc)},Yc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=Zt(e),u=q(e),d=[{name:"Accordion",Item:Yt(e)},{name:"Alert",Item:Qt(e)},{name:"Autocomplete",Item:on(e)},{name:"Avatar",Item:tn(e)},{name:"Badge",Item:rn(e)},{name:"Breadcrumbs",Item:cn(e)},{name:"Button",Item:ln(e)},{name:"Button Group",Item:un(e)},{name:"Calendar",Item:pn(e)},{name:"Checkbox",Item:bn(e)},{name:"Chip",Item:mn(e)},{name:"DrillDown Menu",Item:hn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:fn(e)},{name:"Input",Item:vn(e)},{name:"Linear Progress",Item:wn(e)},{name:"Loading Button",Item:yn(e)},{name:"Modal",Item:Cn(e)},{name:"Radio Button",Item:En(e)},{name:"Select",Item:kn(e)},{name:"Slider",Item:Tn(e)},{name:"Spinner",Item:An(e)},{name:"Switch",Item:Nn(e)},{name:"Tabs",Item:Mn(e)},{name:"Theme Switch",Item:Rn(e)},{name:"Toggle",Item:Pn(e)},{name:"Toggle Group",Item:On(e)},{name:"Tooltip",Item:_n(e)},{name:"Tree View",Item:zn(e)}];return()=>o({class:n`
          overflow-y: scroll;
        `},i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},d.map(({name:p})=>c(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(p))))},Jc=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Io(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:Ba(e)})},{path:"components",action:()=>({title:"Component",component:Yc(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ga(e)})},{path:"alert",action:()=>({title:"Alert",component:Za(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:tr(e)})},{path:"animate",action:()=>({title:"Animate",component:ir(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:fr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:dr(e)})},{path:"badge",action:()=>({title:"Badge",component:yr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:kr(e)})},{path:"button",action:()=>({title:"Button",component:Mr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:_r(e)})},{path:"calendar",action:()=>({title:"Calendar",component:jr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:Vr(e)})},{path:"chip",action:()=>({title:"Chip",component:Zr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:es(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:as(e)})},{path:"drawer",action:()=>({title:"Drawer",component:ls(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:ms(e)})},{path:"fileInput",action:()=>({title:"File Input",component:fs(e)})},{path:"form",action:()=>({title:"Form",component:Cs(e)})},{path:"input",action:()=>({title:"Input",component:Ts(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Ns(e)})},{path:"list",action:()=>({title:"List",component:Hs(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Ps(e)})},{path:"modal",action:()=>({title:"Modal",component:Ws(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:ei(e)})},{path:"paper",action:()=>({title:"Paper",component:ri(e)})},{path:"popover",action:()=>({title:"Popover",component:Xs(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:li(e)})},{path:"select",action:()=>({title:"Select",component:hi(e)})},{path:"slider",action:()=>({title:"Slider",component:Ei(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Ii(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Fi(e)})},{path:"switch",action:()=>({title:"Switch",component:Xi(e)})},{path:"table",action:()=>({title:"Table",component:hc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:wc(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ec(e)})},{path:"tabs",action:()=>({title:"Tabs",component:sc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:Ic(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Oc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Hc(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Wc(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Zc(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Mo(e)})}],Qc=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),el=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:m=t}=l.resolve({pathname:u});s.val=p({}),document.title=`${d}`}},tl=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};so();const jn={title:"Bau",base:"/bau/bau-ui"},de=bo({config:jn}),{bau:nl}=de;de.states={drawerOpen:nl.state(!0)};tl(de);Zn({routes:Jc({context:de}),onLocationChange:el({context:de,LayoutDefault:Eo(de),config:jn}),notFoundRoute:Qc(de)});
