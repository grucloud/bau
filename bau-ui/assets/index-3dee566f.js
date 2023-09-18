(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Yn=(e,t)=>({...e,paths:[...t,e.path]}),Ot=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Yn(o,e);return n?[a,...Ot({paths:[...e,o.path],routes:n})]:a}),Jn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Qn=({routes:e=[],notFoundRoute:t})=>{const n=Ot({routes:e}).map(o=>({...o,regex:Jn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function eo({routes:e,notFoundRoute:t,onLocationChange:n}){const o=Qn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const nt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],to=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],no=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ct=e=>`var(--color-${e})`,oo=e=>`var(--color-${e}-lightest)`,ao=()=>nt.map(([e])=>`
.outline.${e} {
  border: 1px solid ${Ct(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${oo(e)};
}
.solid.${e} {
  background-color: ${Ct(e)};
}
`).join(`
`),ro=()=>nt.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),so=e=>100-e*10,io=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${so(t)}%);`).join(`
`),Et=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),co=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...to.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...no.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function lo({createGlobalStyles:e},{colorPalette:t=nt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>co([n,o])).join(`
`)}
      ${io()}
      ${Et({})}
      ${ao()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);

      --color-content-secondary: hsl(0, 0%, 30%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.2rem;
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
      --font-color-inverse: var(--color-content-inverse);
      --font-color-secondary: var(--color-content-secondary);
      --font-color-inverse-secondary: hsl(0, 0%, 75%);
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
      ${ro()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Et({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function uo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let ot=e=>Object.prototype.toString.call(e??0).slice(8,-1),po=e=>ot(e)=="Object",kt=e=>ot(e)=="Function",Qe=e=>["Object","Array"].includes(ot(e)),Tt=Object.getPrototypeOf,et=e=>ye(e)?e.val:e,ye=e=>e==null?void 0:e.__isState,mo=["splice","push","pop","shift","unshift","sort","reverse"],Le=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const F=e=>!ye(e[0])&&po(e[0])?e:[{},...e];function go(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,m,b)=>{let C=r;r=m;let E=y(b);return r=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(m=>{var b;return(b=m.element)==null?void 0:b.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,m,b,C,E,O)=>{var B;if(s){i.add(y);return}for(let G of y.bindings){let{deps:L,element:_,renderInferred:X,render:ne,renderItem:Q}=G;if(Q&&m)(B=f(_,C,(...ae)=>v(Q(...ae)),b,E,O)[m])==null||B.call();else{let ae=X?X({element:_}):ne({element:_,renderItem:Q})(...L.map(et));ae!==_&&_.replaceWith(G.element=v(ae))}}S(y),u()},p=(y,m,b=[])=>({get(C,E,O){var B;if(r==null||r.add(y),E==="_isProxy")return!0;if(!((B=C[E])!=null&&B._isProxy)&&!ye(C[E])&&Qe(C[E]))C[E]=new Proxy(C[E],p(y,m,[...b,E]));else if(mo.includes(E)){let G=C[E];return(...L)=>{let _=G.apply(C,L);return d(y,E,_,L,m,b),_}}return Reflect.get(C,E,O)},set(C,E,O,B){let G=Reflect.set(C,E,O,B);return d(y,"setItem",G,{prop:E,value:O},m,[...b,E]),G}}),g=(y,m)=>new Proxy(m,p(y,m)),f=(y,m,b,C,E,O)=>{let B=()=>y.replaceChildren(...Le(C,b)),G=L=>y[L]&&y.removeChild(y[L]);return{assign:B,sort:B,reverse:B,setItem:()=>{var _;let L=O[0];(_=y.children[L])==null||_.replaceWith(b(E[L],L))},push:()=>y.append(...Le(m,(L,_)=>b(L,E.length+_))),unshift:()=>y.prepend(...Le(m,b)),pop:()=>G("lastChild"),shift:()=>G("firstChild"),splice:()=>{let[L,_,...X]=m;const{length:ne}=y.children;for(let Q=L>=0?Math.min(L+_-1,ne-1):ne-1;Q>=(L>=0?L:ne+L);Q--)y.children[Q].remove();if(X.length){let Q=X.forEach((ae,pe)=>b(ae,L+pe));y.children[L]?y.children[L].after(...Q):y.append(...Q)}}}},h=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=Qe(y)?g(m,y):y,m.valProxy)},set val(m){let b=this,C=b.val;Qe(m)?(b.valProxy=g(b,m),d(b,"assign",m)):m!==C&&(b.valProxy=m,d(b)),b.oldVal=C}}),v=y=>{if(y==null||y===!1){const m=c("span");return m.style.display="none",m}else return y.nodeType?y:n.createTextNode(y)},w=(y,m)=>{let b=new Set;return m.val=l(y,b),b},x=y=>{let m=h(),b=w(y,m);m.computed=!0;for(let C of b)C.listeners.push({computed:y,deps:b,state:m});return m},S=y=>{for(let m of[...y.listeners])w(m.computed,m.state)},A=(y,...m)=>{if(m.length){let b=[];for(let C of m.flat(1/0))C!=null&&b.push(ye(C)?K({deps:[C],render:()=>E=>E}):kt(C)?te({renderInferred:C}):v(C));y.append(...b)}},k={},I=(y,m)=>y&&(Object.getOwnPropertyDescriptor(y,m)??I(Tt(y),m)),T=(y,m,b)=>{var C;return k[y+","+m]??(k[y+","+m]=((C=I(b,m))==null?void 0:C.set)??0)},N=(y,m)=>new t.MutationObserver((b,C)=>{b.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(O=>O===y&&(m({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),$=(y,m)=>new t.MutationObserver((b,C)=>b.forEach(E=>m({record:E,element:y}))).observe(y,{childList:!0}),R=y=>new Proxy(function(b,...C){var G;let[E,...O]=F(C),B=y?n.createElementNS(y,b):c(b);for(let[L,_]of Object.entries(E)){if(L.startsWith("bau"))continue;let X=T(b,L,Tt(B))?ne=>B[L]=ne:ne=>B.setAttribute(L,ne);_==null||(ye(_)?K({deps:[_],render:()=>()=>(X(_.val),B)}):kt(_)&&(!L.startsWith("on")||_.isDerived)?te({renderInferred:()=>(X(_({element:B})),B)}):_.renderProp?K({deps:_.deps,render:()=>()=>(X(_.renderProp({element:B})(..._.deps.map(et))),B)}):X(_))}return E.bauChildMutated&&$(B,E.bauChildMutated),A(B,...O),(G=E.bauCreated)==null||G.call(E,{element:B}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:B})),E.bauUnmounted&&t.requestAnimationFrame(()=>N(B,E.bauUnmounted)),B},{get:(m,b)=>m.bind(void 0,b)}),V=(y,m,b)=>{y.element=v(b);for(let C of m)ye(C)&&(a.add(C),C.bindings.push(y));return y.element},te=({renderInferred:y,element:m})=>{let b=new Set,C=l(y,b,{element:m});return V({renderInferred:y},b,C)},K=({deps:y,element:m,render:b,renderItem:C})=>V({deps:y,render:b,renderItem:C},y,b({element:m,renderItem:C})(...y.map(et))),J=(y,m,b)=>K({deps:[y],render:({renderItem:C})=>E=>(m.append(...Le(E,C)),m),renderItem:b}),z=y=>{s=!0,y(),s=!1,i.forEach(d),i.clear()};return{tags:R(),tagsNS:R,state:h,bind:K,loop:J,derive:x,stateSet:a,batch:z}}const bo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},ho=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},fo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function vo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=fo(a,i),r=bo(s);return!t.getElementById(r)&&ho(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function xo(e){const t=go(),n=vo();return lo(n),{bau:t,...n,tr:o=>o,window,...e}}function M(...e){return e.filter(t=>t).join(" ")}function Ge(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:M("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const g=p.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=p.getAttribute("width"),g.style.height=p.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var f;return(f=g.parentNode)==null?void 0:f.removeChild(g)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const g=p.getBoundingClientRect();if(p.setAttribute("width",g.width+"px"),p.setAttribute("height",g.height+"px"),r()){p.style.animation=r();const f=()=>{p.removeEventListener("animationend",f),p.style.animation=""};p.addEventListener("animationend",f)}})},...c},l)}}const ee=["neutral","primary","success","danger","warning"],wo=["plain","outline","solid"],yo=["sm","md","lg"],So=()=>ee.map(e=>`
&.button.plain.${e} {
  &:focus {
    outline: 4px auto var(--color-${e});
    border: 1px solid var(--color-neutral);
  };
}
&.button.outline.${e} {
  &:focus {
    outline: 4px auto var(--color-${e});
  };
}
&.button.solid.${e} {
  &:focus {
    outline: 4px auto var(--color-${e}-lightest);
  };
}
`).join(`
`);function W(e,t={}){const{bau:n,css:o}=e,a=o`
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
      padding: 0.4rem 2rem;
    }
    & i {
      font-style: normal;
    }
    ${So()}
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...d},...p]=F(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:M("button",t.class,c,r,l,a,d.class),href:u},p)}}const Co="light",Eo=()=>ee.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function at(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Co);const l=o`
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
    ${Eo()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:f=t.color??"neutral",...h},...v]=F(d);return i({required:"required",title:"Switch Theme",...h,class:M("theme-switch",f,g,p,l,t==null?void 0:t.class,h.class),type:"checkbox",checked:r()=="dark",onclick:w=>{s(w.target.checked?"dark":"light")}},...v)}}function ko(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:d,b:p,ul:g,li:f}=n.tags,{svg:h,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),w=i.drawerOpen,x=W(e,{class:o`
      background: transparent;
    `}),S=at(e),A=()=>s(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),k=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},x({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>w.val=!w.val},A()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),I=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),x({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},k(),I())}}function To({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:d}=t.tags,p=({links:h,title:v})=>o({class:n`
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
        `},d(v),r(h.map(({href:w,name:x})=>c(s({href:w},x))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],f=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:g}),p({title:"Bau Ecosystem",links:f})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.46.0"),i("MIT license")))}}function Ce(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("list",i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const ze="0.3s",_t=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(_t({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Lt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Lt(e)(t.children[o]);if(a)return a}},Ao=({keyframes:e})=>({hideToLeft:e`
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
   `});function rt(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=z=>{var y;return((y=z.parentTree.data)==null?void 0:y.href)??z.parentTree.children[0].data.href},u=({variant:z,color:y,size:m,currentTree:b,data:C})=>S(T({variant:z,color:y,size:m,href:`${c}${l(b)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:z,color:y,size:m,href:`${c}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),d=({size:z,subTree:{data:{name:y,href:m},children:b=[]}})=>T({size:z,href:`${c}${m}`,"data-ischild":!b.length},y),p=({pathname:z,subTree:y})=>{var m;return z===((m=y==null?void 0:y.data)==null?void 0:m.href)},{renderHeader:g=u,renderMenuItem:f=d,isActive:h=p}=t,{li:v,nav:w,div:x,header:S,a:A}=n.tags,k=Ge(e),I=Ce(e),T=W(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:N,hideToRight:$}=Ao(e),R=o`
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
  `,V=({children:z,pathnameState:y,variant:m,color:b,size:C})=>I({class:M(m,b,C)},z.map(E=>v({class:()=>M(E.children&&"has-children",h({pathname:y.val,subTree:E})&&"active")},f({variant:m,color:b,size:C,subTree:E})))),te=({variant:z,color:y,size:m,currentTree:b,pathnameState:C})=>{const{children:E,parentTree:O,data:B,renderList:G}=b;return x({class:M("drillDownMenu",z,y,m)},O&&g({variant:z,color:y,size:m,data:B,currentTree:b}),E&&G?G({renderListDefault:V,children:E,pathnameState:C,variant:z,color:y,size:m}):V({children:E,pathnameState:C,variant:z,color:y,size:m}))},K=({tree:z,pathname:y})=>{let m=_t({})({...z}),b=Lt(y)(m);return b||(b=m),b},J=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",z=>{const{target:y}=z,m=y.getAttribute("href");if(y.tagName==="A"&&m&&!m.startsWith("http")){let b=m.replace(c,"");r||(b=b.replace(y.hash,"")),J.val=b}}),function(y){const{size:m=t.size??"md",variant:b=t.variant??"plain",color:C=t.color??"neutral",tree:E,...O}=y;let B,G=n.derive(()=>(B=K({tree:E,pathname:J.val}),B)),L=1;const _=Q=>{const{dataset:ae}=Q.target;ae.buttonback=="true"?L=-1:ae.ischild=="false"?L=1:ae.ischild=="true"&&(L=0)},X=Q=>{switch(Q){case 1:return`${N} ${ze}`;case-1:return`${$} ${ze}`;default:return""}},ne=Q=>{switch(Q){case 1:return`${$} ${ze} reverse`;case-1:return`${N} ${ze} reverse`;default:return""}};return w({class:M(R,b,C,m,t==null?void 0:t.class,O.class),onclick:_},k({animationHide:()=>X(L),animationShow:()=>ne(L)},n.bind({deps:[G],render:()=>()=>te({variant:b,color:C,size:m,currentTree:B,pathnameState:J})})))}}const Io=()=>ee.map(e=>`
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
    outline: 4px auto var(--color-${e}-lightest);
  };
  &::placeholder {
    color: var(--font-color-inverse-secondary);
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
    ${Io()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:M("input",t.class,t.size??"md",l,c,i,u.class)})}}function st(e,t={}){const{bau:n,css:o,window:a}=e,i=ve(e,t);return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,g=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return i({type:"search",...u,color:l,variant:c,class:M("inputSearch",t.class,g,u.class)})}}function zt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags,g=st(e,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:x,children:S,pathnameState:A,variant:k,color:I,size:T})=>{const N=n.state(""),$=n.derive(()=>N.val==""?S:S.filter(V=>V.data.name.match(new RegExp(`${N.val}`,"i")))),R=V=>{N.val=V.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},g({autocomplete:!1,name:"search",autofocus:!0,value:N,placeholder:`Search ${$.val.length} components`,size:22,oninput:R}),()=>x({children:$.val,pathnameState:A,variant:k,color:I,size:T}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let v=!1;const w=rt(e);return function(){return r({bauMounted:({element:S})=>{s.innerWidth<=640&&(v=!0,i.drawerOpen.val=!1)},onclick:S=>{v&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:M(o`
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
          `)},w({tree:h}))}}const Do=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ge(e),r=ko(e),c=zt(e),l=To(e),u=a`
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
        `},r(),c(),s({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),l())}};function Ue(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...g]=F(r);return a({...p,onclick:d,class:M("chip",t.class,c,l,u,d&&"clickable",i,p.class)},...g)}}function No(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;W(e);const c=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},i(u),s(d),r(p))}}function Mo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function $o({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:g,size:f})=>r({class:n`
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
                  var(--color-success) ${f/p*100}%
                );
                justify-content: flex-end;
                width: ${f/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},f)));return function({data:g=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Bo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=No(e),l=Mo(e),u=W(e);Ue(e);const d=$o(e),p=(...w)=>a({class:n`
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
          `},...w)),g=n``,f=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:h}),d({data:f}),v())}}function Po(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const Oo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Po(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function _o(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Oo(e)()))}}function Lo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Rt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Rt(n)}),e}class At{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function jt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const zo="</span>",It=e=>!!e.scope,Ro=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class jo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=jt(t)}openNode(t){if(!It(t))return;const n=Ro(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){It(t)&&(this.buffer+=zo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Dt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class it{constructor(){this.rootNode=Dt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Dt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{it._collapse(n)}))}}class Ho extends it{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ae(e){return e?typeof e=="string"?e:e.source:null}function Ht(e){return xe("(?=",e,")")}function Go(e){return xe("(?:",e,")*")}function Uo(e){return xe("(?:",e,")?")}function xe(...e){return e.map(n=>Ae(n)).join("")}function Fo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ct(...e){return"("+(Fo(e).capture?"":"?:")+e.map(o=>Ae(o)).join("|")+")"}function Gt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Wo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Vo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function lt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ae(o),s="";for(;i.length>0;){const r=Vo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Ko=/\b\B/,Ut="[a-zA-Z]\\w*",ut="[a-zA-Z_]\\w*",Ft="\\b\\d+(\\.\\d+)?",Wt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Vt="\\b(0b[01]+)",qo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Xo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=xe(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ie={begin:"\\\\[\\s\\S]",relevance:0},Zo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ie]},Yo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ie]},Jo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Fe=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ct("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xe(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Qo=Fe("//","$"),ea=Fe("/\\*","\\*/"),ta=Fe("#","$"),na={scope:"number",begin:Ft,relevance:0},oa={scope:"number",begin:Wt,relevance:0},aa={scope:"number",begin:Vt,relevance:0},ra={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ie,{begin:/\[/,end:/\]/,relevance:0,contains:[Ie]}]}]},sa={scope:"title",begin:Ut,relevance:0},ia={scope:"title",begin:ut,relevance:0},ca={begin:"\\.\\s*"+ut,relevance:0},la=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Re=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Ko,IDENT_RE:Ut,UNDERSCORE_IDENT_RE:ut,NUMBER_RE:Ft,C_NUMBER_RE:Wt,BINARY_NUMBER_RE:Vt,RE_STARTERS_RE:qo,SHEBANG:Xo,BACKSLASH_ESCAPE:Ie,APOS_STRING_MODE:Zo,QUOTE_STRING_MODE:Yo,PHRASAL_WORDS_MODE:Jo,COMMENT:Fe,C_LINE_COMMENT_MODE:Qo,C_BLOCK_COMMENT_MODE:ea,HASH_COMMENT_MODE:ta,NUMBER_MODE:na,C_NUMBER_MODE:oa,BINARY_NUMBER_MODE:aa,REGEXP_MODE:ra,TITLE_MODE:sa,UNDERSCORE_TITLE_MODE:ia,METHOD_GUARD:ca,END_SAME_AS_BEGIN:la});function ua(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function da(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function pa(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ua,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ma(e,t){Array.isArray(e.illegal)&&(e.illegal=ct(...e.illegal))}function ga(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ba(e,t){e.relevance===void 0&&(e.relevance=1)}const ha=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=xe(n.beforeMatch,Ht(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},fa=["of","and","for","in","not","or","if","then","parent","list","value"],va="keyword";function Kt(e,t,n=va){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Kt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,xa(c[0],c[1])]})}}function xa(e,t){return t?Number(t):wa(e)?0:1}function wa(e){return fa.includes(e.toLowerCase())}const Nt={},fe=e=>{console.error(e)},Mt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},we=(e,t)=>{Nt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Nt[`${e}/${t}`]=!0)},He=new Error;function qt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=Gt(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function ya(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),He;if(typeof e.beginScope!="object"||e.beginScope===null)throw fe("beginScope must be object"),He;qt(e,e.begin,{key:"beginScope"}),e.begin=lt(e.begin,{joinWith:""})}}function Sa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),He;if(typeof e.endScope!="object"||e.endScope===null)throw fe("endScope must be object"),He;qt(e,e.end,{key:"endScope"}),e.end=lt(e.end,{joinWith:""})}}function Ca(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ea(e){Ca(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),ya(e),Sa(e)}function ka(e){function t(s,r){return new RegExp(Ae(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Gt(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(lt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[da,ga,Ea,ha].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[pa,ma,ba].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Kt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ae(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Ta(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Xt(e){return e?e.endsWithParent||Xt(e.starts):!1}function Ta(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Xt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var Aa="11.8.0";class Ia extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const tt=jt,$t=de,Bt=Symbol("nomatch"),Da=7,Zt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Ho};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const C=r.languageDetectRe.exec(b);if(C){const E=$(C[1]);return E||(Mt(i.replace("{}",C[1])),Mt("Falling back to no-highlight mode for this block.",m)),E?C[1]:"no-highlight"}return b.split(/\s+/).find(E=>c(E)||$(E))}function u(m,b,C){let E="",O="";typeof b=="object"?(E=m,C=b.ignoreIllegals,O=b.language):(we("10.7.0","highlight(lang, code, ...args) has been deprecated."),we("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),O=m,E=b),C===void 0&&(C=!0);const B={code:E,language:O};z("before:highlight",B);const G=B.result?B.result:d(B.language,B.code,C);return G.code=B.code,z("after:highlight",G),G}function d(m,b,C,E){const O=Object.create(null);function B(D,P){return D.keywords[P]}function G(){if(!j.keywords){oe.addText(Z);return}let D=0;j.keywordPatternRe.lastIndex=0;let P=j.keywordPatternRe.exec(Z),U="";for(;P;){U+=Z.substring(D,P.index);const q=ie.case_insensitive?P[0].toLowerCase():P[0],re=B(j,q);if(re){const[ce,Xn]=re;if(oe.addText(U),U="",O[q]=(O[q]||0)+1,O[q]<=Da&&(_e+=Xn),ce.startsWith("_"))U+=P[0];else{const Zn=ie.classNameAliases[ce]||ce;X(P[0],Zn)}}else U+=P[0];D=j.keywordPatternRe.lastIndex,P=j.keywordPatternRe.exec(Z)}U+=Z.substring(D),oe.addText(U)}function L(){if(Z==="")return;let D=null;if(typeof j.subLanguage=="string"){if(!t[j.subLanguage]){oe.addText(Z);return}D=d(j.subLanguage,Z,!0,St[j.subLanguage]),St[j.subLanguage]=D._top}else D=g(Z,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(_e+=D.relevance),oe.__addSublanguage(D._emitter,D.language)}function _(){j.subLanguage!=null?L():G(),Z=""}function X(D,P){D!==""&&(oe.startScope(P),oe.addText(D),oe.endScope())}function ne(D,P){let U=1;const q=P.length-1;for(;U<=q;){if(!D._emit[U]){U++;continue}const re=ie.classNameAliases[D[U]]||D[U],ce=P[U];re?X(ce,re):(Z=ce,G(),Z=""),U++}}function Q(D,P){return D.scope&&typeof D.scope=="string"&&oe.openNode(ie.classNameAliases[D.scope]||D.scope),D.beginScope&&(D.beginScope._wrap?(X(Z,ie.classNameAliases[D.beginScope._wrap]||D.beginScope._wrap),Z=""):D.beginScope._multi&&(ne(D.beginScope,P),Z="")),j=Object.create(D,{parent:{value:j}}),j}function ae(D,P,U){let q=Wo(D.endRe,U);if(q){if(D["on:end"]){const re=new At(D);D["on:end"](P,re),re.isMatchIgnored&&(q=!1)}if(q){for(;D.endsParent&&D.parent;)D=D.parent;return D}}if(D.endsWithParent)return ae(D.parent,P,U)}function pe(D){return j.matcher.regexIndex===0?(Z+=D[0],1):(Je=!0,0)}function me(D){const P=D[0],U=D.rule,q=new At(U),re=[U.__beforeBegin,U["on:begin"]];for(const ce of re)if(ce&&(ce(D,q),q.isMatchIgnored))return pe(P);return U.skip?Z+=P:(U.excludeBegin&&(Z+=P),_(),!U.returnBegin&&!U.excludeBegin&&(Z=P)),Q(U,D),U.returnBegin?0:P.length}function Y(D){const P=D[0],U=b.substring(D.index),q=ae(j,D,U);if(!q)return Bt;const re=j;j.endScope&&j.endScope._wrap?(_(),X(P,j.endScope._wrap)):j.endScope&&j.endScope._multi?(_(),ne(j.endScope,D)):re.skip?Z+=P:(re.returnEnd||re.excludeEnd||(Z+=P),_(),re.excludeEnd&&(Z=P));do j.scope&&oe.closeNode(),!j.skip&&!j.subLanguage&&(_e+=j.relevance),j=j.parent;while(j!==q.parent);return q.starts&&Q(q.starts,D),re.returnEnd?0:P.length}function se(){const D=[];for(let P=j;P!==ie;P=P.parent)P.scope&&D.unshift(P.scope);D.forEach(P=>oe.openNode(P))}let ge={};function yt(D,P){const U=P&&P[0];if(Z+=D,U==null)return _(),0;if(ge.type==="begin"&&P.type==="end"&&ge.index===P.index&&U===""){if(Z+=b.slice(P.index,P.index+1),!a){const q=new Error(`0 width match regex (${m})`);throw q.languageName=m,q.badRule=ge.rule,q}return 1}if(ge=P,P.type==="begin")return me(P);if(P.type==="illegal"&&!C){const q=new Error('Illegal lexeme "'+U+'" for mode "'+(j.scope||"<unnamed>")+'"');throw q.mode=j,q}else if(P.type==="end"){const q=Y(P);if(q!==Bt)return q}if(P.type==="illegal"&&U==="")return 1;if(Ye>1e5&&Ye>P.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Z+=U,U.length}const ie=$(m);if(!ie)throw fe(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const qn=ka(ie);let Ze="",j=E||qn;const St={},oe=new r.__emitter(r);se();let Z="",_e=0,be=0,Ye=0,Je=!1;try{if(ie.__emitTokens)ie.__emitTokens(b,oe);else{for(j.matcher.considerAll();;){Ye++,Je?Je=!1:j.matcher.considerAll(),j.matcher.lastIndex=be;const D=j.matcher.exec(b);if(!D)break;const P=b.substring(be,D.index),U=yt(P,D);be=D.index+U}yt(b.substring(be))}return oe.finalize(),Ze=oe.toHTML(),{language:m,value:Ze,relevance:_e,illegal:!1,_emitter:oe,_top:j}}catch(D){if(D.message&&D.message.includes("Illegal"))return{language:m,value:tt(b),illegal:!0,relevance:0,_illegalBy:{message:D.message,index:be,context:b.slice(be-100,be+100),mode:D.mode,resultSoFar:Ze},_emitter:oe};if(a)return{language:m,value:tt(b),illegal:!1,relevance:0,errorRaised:D,_emitter:oe,_top:j};throw D}}function p(m){const b={value:tt(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function g(m,b){b=b||r.languages||Object.keys(t);const C=p(m),E=b.filter($).filter(V).map(_=>d(_,m,!1));E.unshift(C);const O=E.sort((_,X)=>{if(_.relevance!==X.relevance)return X.relevance-_.relevance;if(_.language&&X.language){if($(_.language).supersetOf===X.language)return 1;if($(X.language).supersetOf===_.language)return-1}return 0}),[B,G]=O,L=B;return L.secondBest=G,L}function f(m,b,C){const E=b&&n[b]||C;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function h(m){let b=null;const C=l(m);if(c(C))return;if(z("before:highlightElement",{el:m,language:C}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Ia("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const E=b.textContent,O=C?u(E,{language:C,ignoreIllegals:!0}):g(E);m.innerHTML=O.value,f(m,C,O.language),m.result={language:O.language,re:O.relevance,relevance:O.relevance},O.secondBest&&(m.secondBest={language:O.secondBest.language,relevance:O.secondBest.relevance}),z("after:highlightElement",{el:m,result:O,text:E})}function v(m){r=$t(r,m)}const w=()=>{A(),we("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){A(),we("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function A(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(h)}function k(){S&&A()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",k,!1);function I(m,b){let C=null;try{C=b(e)}catch(E){if(fe("Language definition for '{}' could not be registered.".replace("{}",m)),a)fe(E);else throw E;C=s}C.name||(C.name=m),t[m]=C,C.rawDefinition=b.bind(null,e),C.aliases&&R(C.aliases,{languageName:m})}function T(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function N(){return Object.keys(t)}function $(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function R(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=b})}function V(m){const b=$(m);return b&&!b.disableAutodetect}function te(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function K(m){te(m),o.push(m)}function J(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function z(m,b){const C=m;o.forEach(function(E){E[C]&&E[C](b)})}function y(m){return we("10.7.0","highlightBlock will be removed entirely in v12.0"),we("10.7.0","Please use highlightElement now."),h(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:A,highlightElement:h,highlightBlock:y,configure:v,initHighlighting:w,initHighlightingOnLoad:x,registerLanguage:I,unregisterLanguage:T,listLanguages:N,getLanguage:$,registerAliases:R,autoDetection:V,inherit:$t,addPlugin:K,removePlugin:J}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Aa,e.regex={concat:xe,lookahead:Ht,either:ct,optional:Uo,anyNumberOfTimes:Go};for(const m in Re)typeof Re[m]=="object"&&Rt(Re[m]);return Object.assign(e,Re),e},Se=Zt({});Se.newInstance=()=>Zt({});var Na=Se;Se.HighlightJS=Se;Se.default=Se;const Te=Lo(Na),Pt="[A-Za-z$_][0-9A-Za-z$_]*",Ma=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],$a=["true","false","null","undefined","NaN","Infinity"],Yt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Jt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Qt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ba=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Pa=[].concat(Qt,Yt,Jt);function en(e){const t=e.regex,n=(b,{after:C})=>{const E="</"+b[0].slice(1);return b.input.indexOf(E,C)!==-1},o=Pt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,C)=>{const E=b[0].length+b.index,O=b.input[E];if(O==="<"||O===","){C.ignoreMatch();return}O===">"&&(n(b,{after:E})||C.ignoreMatch());let B;const G=b.input.substring(E);if(B=G.match(/^\s*=/)){C.ignoreMatch();return}if((B=G.match(/^\s+extends\s+/))&&B.index===0){C.ignoreMatch();return}}},r={$pattern:Pt,keyword:Ma,literal:$a,built_in:Pa,"variable.language":Ba},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,f,h,v,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const A=[].concat(x,p.contains),k=A.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(A)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},N={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Yt,...Jt]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},R={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},V={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function te(b){return t.concat("(?!",b.join("|"),")")}const K={match:t.concat(/\b/,te([...Qt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},J={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:N},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,f,h,v,x,{match:/\$\d+/},d,N,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},R,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},J,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},K,V,T,z,{match:/\$[(.]/}]}}function Oa(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const _a=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",en),Te.registerLanguage("sh",Oa),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function La(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=_a(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function De(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("paper",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function tn(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(v,w)=>{let x=null;return(...S)=>{a.clearTimeout(x),x=a.setTimeout(()=>v(...S),w)}},p=o`
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
  `,g=({value:v,id:w,children:x=[]})=>{const S=c({class:()=>u.val==w?"active":"",href:`#${w}`});return S.innerHTML=v,r({class:()=>u.val==w?"active":""},S,x.length>0&&s(x.map(g)))},f=v=>v.tagName.charAt(1),h=({contentEl:v})=>{const w=v.querySelectorAll(l);let x=2,S={},A={children:[]},k=A;const I=k;let T=[k];return[...w].forEach(N=>{const $=f(N);N.setAttribute("id",N.textContent),!N.innerHTML.includes("<button")&&(S={value:N.innerHTML,id:N.id??N.textContent,children:[]},x==$?(A=S,k.children.push(A)):x<$?(T.push(k),k=A,A.children.push(S),A=S):x>$&&(k=T[$-1],T=T.slice(0,$-1),k.children.push(S),A=S),x=$)}),I};return function(...w){let[{size:x=t.size??"md",variant:S=t.variant??"plain",color:A=t.color??"neutral",contentEl:k,...I}]=F(w);const T=h({contentEl:k}),N=d(()=>{const R=[...k.querySelectorAll(l)].find(V=>{const{top:te,height:K}=V.getBoundingClientRect();if(te+K>60)return!0});R&&(u.val=R==null?void 0:R.id)},100);return i({...I,class:M("tableOfContent",x,S,A,p,t==null?void 0:t.class,I==null?void 0:I.class),bauMounted:()=>{a.addEventListener("scroll",N)},bauUnmounted:()=>{a.removeEventListener("scroll",N)}},T.children&&s(T.children.map(g)))}}const nn=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(s(l(p??""),ee.map(g=>l(g)))),i(wo.map(g=>s(l(g),ee.map((f,h)=>r(d({color:f,variant:g},{index:h}))))))))}},za=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},yo.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:d}=t.tags;Te.registerLanguage("javascript",en);const p=tn(e),g=De(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),f=nn(e),h=za(e),v=({text:w})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:x})=>{x.innerHTML=Te.highlight(w,{language:"js"}).value}}));return function(x){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(x.title),r(x.description),x.gridItem&&[c("Variant/Color"),!x.variantColorTableDisable&&x.gridItem&&g(f({Item:x.gridItem(e)})),c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),x.gridItem&&g(h({item:x.gridItem}))],c("Usage"),l("Import"),v({text:x.importStatement}),c("Examples"),x.examples.map(A=>i(l(A.title),r(A.description),g(A.createComponent(e)({})),v({text:A.code}))));return o({class:n`
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
        `},S,p({contentEl:S}))}};function dt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",Header:f,Content:h,close:v=!0,...w}]=F(u);const x=n.state(v);return a({...w,class:M("collapsible",d,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:()=>M("header",h?x.val?"close":"open":""),onclick:S=>{x.val=!x.val,S.stopPropagation()}},f()),a({class:"content",role:"region",bauMounted:({element:S})=>{x.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:x}),!x.val)},h&&h()))}}const Ra=()=>ee.map(e=>`
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
`);function We(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
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
    ${Ra()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:f=t.color??"neutral",data:h=[],...v}]=F(d);const w=n.state(""),x=dt(e,{size:p,variant:g,color:f}),S=k=>I=>{w.val==k?w.val="":w.val=k},A=k=>{const{Header:I,Content:T,name:N}=k,$=()=>r({class:()=>M(w.val==N&&"active")},c({type:"button","aria-controls":`bau-${N}`,"aria-expanded":({element:V})=>w.val==N},I(k))),R=()=>a({id:`bau-${N}`,"data-state":({element:V})=>w.val==N},T(k));return s({class:M(f,g,p),onclick:S(N)},x({Header:$,Content:R}))};return a({class:M("accordion",l,t==null?void 0:t.class,v.class)},i(h.map(A)))}}const on=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=We(e,t);return r=>s({...r,data:i})},ja=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=We(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Ha=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,an=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ga=e=>{const{css:t}=e,n=an(e),o=We(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Ua=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Fa=e=>{const{css:t}=e,n=an(e),o=We(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Wa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Va={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ha,createComponent:ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ua,createComponent:Ga},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Wa,createComponent:Fa}],gridItem:on},Ka=e=>{const t=H(e);return()=>t(Va)},qa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Xa=()=>ee.map(e=>`
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
`);function Ne(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
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
    ${Xa()}
  `,r=W(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",onRemove:f,...h},...v]=F(u);return a({...h,class:M("alert",`alert-${p}`,t.class,p,g,d,s,h.class),role:"alert"},i({class:"icon"},qa[g]),a({class:"content"},...v),f&&c({onclick:f}))}}const rn=(e,t)=>{const n=Ne(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},Za=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Ne(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ya=`import alert from "@grucloud/bau-ui/alert";
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
`,Ja=e=>{const{css:t}=e,n=Ne(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Qa=`import alert from "@grucloud/bau-ui/alert";
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
`,er={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ya,createComponent:Za},{title:"Custom Alert ",description:"A custom alert.",code:Qa,createComponent:Ja}],gridItem:rn},tr=e=>{const t=H(e);return()=>t(er)},nr=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:g})=>{const f=c.val.findIndex(h=>h.id===p);f!=-1&&(c.val[f].status=g)};return function(g={},...f){const h=({id:x})=>{d({id:x,status:"removing"});const S=c.val.findIndex(A=>A.id===x);S!=-1&&c.val.splice(S,1)},v=({Component:x})=>{const S={id:Math.random().toString(10).split(".")[1],Component:x,status:"inserting"};c.val.length>=i&&h({id:c.val[0].id}),c.val.push(S),setTimeout(()=>h(S),s)},w=x=>r({class:u.item,onclick:()=>h(x)},x.Component());return document.addEventListener("alert.add",x=>v(x.detail)),document.addEventListener("alert.remove",x=>h(x.detail)),r({class:M(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),w))}},or=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=nr(e,{deleteAfterDuration:2e4}),i=W(e),s=Ne(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ar=`import { Context } from "@grucloud/bau-ui/context";
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
`,rr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ar,createComponent:or}]},sr=e=>{const t=H(e);return()=>t(rr)},ir=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ge(e),s=W(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},cr=`import animate from "@grucloud/bau-ui/animate";
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
`,lr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ge(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},ur=`import animate from "@grucloud/bau-ui/animate";
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
`,dr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:cr,createComponent:ir},{title:"Component hide and show",description:"Hide and show a component",code:ur,createComponent:lr}]},pr=e=>{const t=H(e);return()=>t(dr)};function sn(e,t={}){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:f=t.variant??"plain",color:h=t.color??"neutral",width:v=40,height:w=40,...x},...S]=F(p);return a({class:M(u,t==null?void 0:t.class,x.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:v,height:w,onload:c,onerror:l,class:M(h,f,g,u,t==null?void 0:t.class,x.class),...x}))}}const cn=(e,t)=>{const{css:n}=e,o=sn(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},mr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=sn(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},gr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,br={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:gr,createComponent:mr}],gridItem:cn},hr=e=>{const t=H(e);return()=>t(br)};function pt(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=De(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...g},...f]=F(l);const h=x=>{w.style.opacity=1,w.showModal();const S=d.getBoundingClientRect(),A=w.getBoundingClientRect();S.x<a.innerWidth/2?w.style.left=S.left+"px":w.style.left=S.right-A.width+"px",S.y<a.innerHeight/2?w.style.top=S.top+S.height+"px":(w.style.top=Math.max(0,S.top-A.height)+"px",w.scrollHeight>S.top&&(w.style.height=S.top+"px"))},v=x=>{const S=()=>{w.close(),w.removeEventListener("transitionend",S)};w.addEventListener("transitionend",S),w.style.opacity=0},w=i({role:"presentation",class:M("popover",r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:x=>x.target===w&&(v(),p==null?void 0:p.call())},s(u));return w.closeDialog=v,w.openDialog=h,w}}const je={sm:12,md:16,lg:24},fr=()=>ee.map(e=>`
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
`);function Me(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:g=!0,...f}={}){const h=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${je[u]};
      height: ${je[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${fr()}
    `;return i({class:{deps:[g],renderProp:()=>v=>M("spinner",h,d,p,v==!1?"":"visibility",t==null?void 0:t.class,f.class)},version:"1.1",x:"0px",y:"0px",width:je[u],height:je[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...f},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const vr=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function mt(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
    position: relative;
    overflow: hidden;
    height: fit-content;
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    & .content {
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow: hidden;
      & ul {
        border-width: 0px !important;
        overflow: auto;
      }
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${vr()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:g,Option:f,options:h,getOptionLabel:v=({label:Y})=>Y,onSelect:w=()=>{},id:x,required:S,name:A,loading:k,...I},...T]=F(c);const N=pt(e),$=W(e),R=ve(e,{variant:u,color:d,size:l}),V=Ce(e),te=Me(e,{variant:u,color:d,size:l}),K=n.state(I.value);n.derive(()=>{K.val&&(ae.value=v(K.val),w(K.val))});const J=n.state(""),z=n.state(!1),y=n.state(0),m=()=>{z.val=!1},b=n.state(h),C=Y=>se=>Y.val&&v(se)==v(Y.val),E=()=>{me.openDialog(),z.val=!0,J.val="",b.val=h,y.val=h.findIndex(C(K));const Y=pe.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),Q.scrollIntoView({block:"end"}))},O=()=>{me.closeDialog(),z.val=!1,J.val="",y.val=0},B=Y=>{const{value:se}=Y.target;J.val=se,se?b.val=h.filter(ge=>v(ge).match(new RegExp(`${se}`,"i"))):b.val=h},G=Y=>{me.open?O():E()},L=({option:Y,index:se})=>ge=>{K.val=Y,y.val=se,O()},_=()=>{const Y=pe.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},X=Y=>{switch(Y.key){case"Escape":O();break;case"ArrowDown":y.val<b.val.length-1?y.val++:y.val=0,_();break;case"ArrowUp":y.val<=0?y.val=b.val.length-1:y.val--,_();break;case"Enter":me.open?(K.val=b.val[y.val],J.val="",O()):E(),Y.preventDefault();break}},ne=$({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":z,"aria-label":p,onclick:G,variant:u,color:d,size:l,class:k==!0&&"loading",disabled:k},()=>K.val?v(K.val):p,()=>k==!0&&te({visibility:k})),Q=R({value:J,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":z,oninput:B,onkeydown:X,...I}),ae=R({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:J,required:S,name:A}),pe=a({class:M(u,d,l,"content")},Q,()=>V({class:M(u,d,l)},b.val.map((Y,se)=>i({class:()=>M(y.val==se&&"active",C(K)(Y)&&"selected"),onclick:L({option:Y,index:se})},f(Y))))),me=N({id:x,triggerEl:ne,contentEl:pe,onClose:m,class:o`
        overflow: hidden;
      `});return a({...I,class:M("autocomplete",s,t==null?void 0:t.class,I==null?void 0:I.class)},ne,ae,me)}}const ln=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=mt(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},xr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=mt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},wr=`import { Context } from "@grucloud/bau-ui/context";
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
`,yr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=W(e,{variant:"outline"}),r=mt(e),c=t.state([]),l=t.state(!1),u=t.state("");async function d({url:f,transform:h=v=>v}){try{l.val=!0;const v=await fetch(f,{});if(v.ok){const w=await v.json();c.val=h(w)}else u.val=v.statusText}catch(v){u.val=v.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:f=>f.sort((h,v)=>h.name.common.localeCompare(v.name.common))});p();const g=f=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(f.flag),i(f.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionLabel:({name:f})=>f.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>p()},"Reload")))},Sr=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const Autocomplete = autocomplete(context);

  const dataState = bau.state([]);
  const loadingState = bau.state(false);
  const errorMessageState = bau.state("");

  async function fetchData({ url, transform = (x: any) => x }: any) {
    try {
      loadingState.val = true;
      const response = await fetch(url, {});
      if (response.ok) {
        const json = await response.json();
        dataState.val = transform(json);
      } else {
        errorMessageState.val = response.statusText;
      }
    } catch (error: any) {
      errorMessageState.val = error.message;
    } finally {
      loadingState.val = false;
    }
  }
  const fetchCountries = () =>
    fetchData({
      url: "https://restcountries.com/v3.1/all?fields=name,flag",
      transform: (data: any) =>
        data.sort((a: any, b: any) =>
          a.name.common.localeCompare(b.name.common)
        ),
    });

  fetchCountries();

  const Option = (option: any) =>
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        \`,
      },
      span(option.flag),
      span(option.name.common)
    );

  return () =>
    section(
      div(
        {
          class: css\`
            display: flex;
            gap: 1rem;
          \`,
        },
        () =>
          Autocomplete({
            options: dataState.val,
            Option,
            getOptionLabel: ({ name }: any) => name.common,
            label: "Country",
            placeholder: "Search countries",
            id: "country",
            loading: loadingState.val,
          }),
        Button({ onclick: () => fetchCountries() }, "Reload")
      )
    );
};
`,Cr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:wr,createComponent:xr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Sr,createComponent:yr}],gridItem:ln},Er=e=>{const t=H(e);return()=>t(Cr)};function un(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=F(r);return a({...p,class:M("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:M(u,l,c)},d),...g)}}const dn=(e,t)=>{const n=un(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=un(e);return()=>n(o({content:"10"},"☏"))},Tr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Ar={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Tr,createComponent:kr}],gridItem:dn},Ir=e=>{const t=H(e);return()=>t(Ar)};function gt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,{separator:c="〉"}=t,l=W(e),u=o`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin: 0;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "${c}";
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
  `;return function(...p){let[{size:g=t.size??"md",variant:f=t.variant??"plain",color:h=t.color??"neutral",items:v,...w},...x]=F(p);return i({...w,class:M(u,t==null?void 0:t.class,w==null?void 0:w.class)},v.map(({href:S,name:A})=>s((S?l:r)({href:`${a.base}${S}`,color:h,variant:f,size:g,class:M(h,f,g)},A))))}}const pn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=gt(e,t);return a=>o({...a,...n})},Dr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=gt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},Nr=`import { Context } from "@grucloud/bau-ui/context";
import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const breadcrumbsProps: BreadcrumbsProps = {
    items: [
      {
        href: "/",
        name: "\\u2302",
      },
      { name: "Dir", href: "/dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const Breadcrumbs = breadcrumbs(context, {
    variant: "outline",
    color: "neutral",
  });

  return () =>
    section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
};
`,Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=gt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},$r=`import { Context } from "@grucloud/bau-ui/context";
import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const breadcrumbsProps: BreadcrumbsProps = {
    items: [
      {
        href: "/",
        name: "\\u2302",
      },
      { name: "Dir", href: "/dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const Breadcrumbs = breadcrumbs(context, {
    variant: "plain",
    color: "neutral",
    separator: "/",
  });

  return () =>
    section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
};
`,Br={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Nr,createComponent:Dr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:$r,createComponent:Mr}],gridItem:pn},Pr=e=>{const t=H(e);return()=>t(Br)},mn=(e,t={})=>{const n=W(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Or=e=>{const{bau:t}=e,{section:n}=t.tags,o=W(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},_r=`import button from "@grucloud/bau-ui/button";
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
`,Lr=e=>{const{bau:t}=e,{section:n}=t.tags,o=W(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},zr=`import button from "@grucloud/bau-ui/button";
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
`,Rr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:_r,createComponent:Or},{title:"Disabled Button",description:"A disabled button.",code:zr,createComponent:Lr}],gridItem:mn},jr=e=>{const t=H(e);return()=>t(Rr)},Hr=()=>ee.map(e=>`
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
`);function bt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Hr()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("button-group",l,u,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const gn=(e,t)=>{const n=["ONE","TWO","THREE"],o=W(e,t),a=bt(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Gr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=W(e),i=bt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Ur=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Fr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Ur,createComponent:Gr}],gridItem:gn},Wr=e=>{const t=H(e);return()=>t(Fr)};function bn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=F(c);return a({...p,type:"date",class:M("calendar",s,d,u,l,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}const hn=(e,t)=>{const n=bn(e,t);return o=>n({...o})},Vr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=bn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Kr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,qr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Kr,createComponent:Vr}],gridItem:hn},Xr=e=>{const t=H(e);return()=>t(qr)};function Zr(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:g,Previous:f,Next:h,...v}]=F(c);const w=()=>{s.val<=0?s.val=p.length-1:s.val--},x=()=>{s.val>=p.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},p.map(g));return a({...v,class:M("carousel",l,i,t==null?void 0:t.class,v==null?void 0:v.class)},a({class:M("control","control-previous"),onclick:w},f()),a({class:M("control","control-next"),onclick:x},h()),S)}}const Yr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],Jr=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=W(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Zr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Yr,Slide:s,Previous:c,Next:l}))},Qr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,es={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Qr,createComponent:Jr}]},ts=e=>{const t=H(e);return()=>t(es)},fn=(e,t)=>{const n=Ue(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ns=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ue(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},os=`import chip from "@grucloud/bau-ui/chip";
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
`,as={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:os,createComponent:ns}],gridItem:fn},rs=e=>{const t=H(e);return()=>t(as)};function vn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({type:"checkbox",required:"required",...d,class:M(i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const xn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=vn(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},ss=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=vn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},is=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,cs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:is,createComponent:ss}],gridItem:xn},ls=e=>{const t=H(e);return()=>t(cs)},us=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=dt(e),i=W(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},ds=`import button from "@grucloud/bau-ui/button";
import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Collapsible = collapsible(context);
  const Button = button(context, { variant: "outline" });

  const Header = () => Button("Header");
  const Content = () => div("Content");

  return () =>
    section(
      //
      Collapsible({ Header, Content })
    );
};
`,ps={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:ds,createComponent:us}]},ms=e=>{const t=H(e);return()=>t(ps)};function gs(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...g]=F(r);return a({class:M(i,t==null?void 0:t.class,p.class)},a({class:()=>M("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>M("content",d.val&&"content-open")},g))}}const bs=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=gs(e),s=W(e),r=zt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},hs=`import drawer from "@grucloud/bau-ui/drawer";
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
`,fs={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:hs,createComponent:bs}]},vs=e=>{const t=H(e);return()=>t(fs)},wn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=rt(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},xs=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=rt(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},ws=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,ys={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:ws,createComponent:xs}],gridItem:(e,t)=>wn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Ss=e=>{const t=H(e);return()=>t(ys)};function ht(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
      display: inline-flex;
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
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
    `};return function(l,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",Component:f,disabled:h,...v}=l;return a({class:M(r.base,h&&r.disabled,t==null?void 0:t.class,l.class)},i({class:M(p,g,d)},f({disabled:h}),s({type:"file",disabled:h,...v})))}}const yn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=ht(e,t),p=f=>{const h=f.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:f})=>c({class:M(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,f&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return f=>d({Component:g,name:"file",accept:"text/*",onchange:p,...f})},Cs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=ht(e),p=f=>{const h=f.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:f})=>c({class:M(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,f&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(d({Component:g,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},Es=`import classNames from "@grucloud/bau-css/classNames";
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
`,ks={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Es,createComponent:Cs}],gridItem:yn},Ts=e=>{const t=H(e);return()=>t(ks)};function $e(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
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
      display: inline-flex;
      flex-direction: column;
      gap: 1rem;
    }
    & label,
    legend {
      display: inline-flex;
      flex-direction: column;
      gap: 0.3rem;
      font-weight: 500;
      font-size: smaller;
      color: var(--color-content-secondary);
    }
    & fieldset {
      border-radius: var(--global-radius);
    }
    & > footer {
      display: flex;
      gap: 1rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=F(r);return a({...p,class:M("form",u,l,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}function ft(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:g,...f},...h]=F(l);const v=W(e),w=Me(e);return n.bind({deps:[g],render:()=>x=>v({...f,class:M("loadingButton",u,d,p,r,x&&"loading",t==null?void 0:t.class,f==null?void 0:f.class)},w({size:u,variant:d,color:p,visibility:x}),i({class:x&&"loading"},h))})}}const As=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=ft(e),d=Ne(e,{variant:"outline",color:"danger"}),p=ve(e),g=$e(e,{class:n`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),f=De(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:v=()=>{}}){const w=t.state(!1),x=t.state("");return f(g({onsubmit:async A=>{const{username:k,password:I}=A.target.elements;A.preventDefault();try{w.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:k.value,password:I.value})});if(T.ok){const N=await T.json();v(N)}else T.status==401?x.val="Invalid username or password":x.val=T.statusText}catch(T){x.val=T.message}finally{w.val=!1}}},s(c({width:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>x.val&&d(x.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:w},"Login"))))}},Is=`import form from "@grucloud/bau-ui/form";
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
`,Ds={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Login page",description:"A login page.",code:Is,createComponent:As}]},Ns=e=>{const t=H(e);return()=>t(Ds)},Sn=(e,t={})=>{const n=ve(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Ms=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ve(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},$s=`import input from "@grucloud/bau-ui/input";
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
`,Bs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:$s,createComponent:Ms}],gridItem:Sn},Ps=e=>{const t=H(e);return()=>t(Bs)},Cn=(e,t={})=>{const n=st(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},Os=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=st(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},_s=`import inputSearch from "@grucloud/bau-ui/inputSearch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, h3 } = bau.tags;

  const InputSearch = inputSearch(context);

  return () =>
    section(
      h3("Basic inputSearch"),
      InputSearch({
        id: "my-inputSearch",
        name: "my-inputSearch",
        placeholder: "Enter Text",
        // oninputSearch: (event)=> {}
      }),
      h3("Disabled inputSearch"),
      InputSearch({
        name: "my-inputSearch-disabled",
        placeholder: "Enter Text",
        disabled: true,
      })
    );
};
`,Ls={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:_s,createComponent:Os}],gridItem:Cn},zs=e=>{const t=H(e);return()=>t(Ls)};function En(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>ee.map(l=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",running:f,...h}]=F(u);return i({...h,role:"progressbar",class:{deps:[f],renderProp:()=>v=>M("linearProgress",d,g,c,v&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const kn=(e,t)=>{const n=En(e,t);return o=>n({...o,running:!0})},Rs=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=W(e),i=En(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},js=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Hs={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:js,createComponent:Rs}],gridItem:kn},Gs=e=>{const t=H(e);return()=>t(Hs)},Tn=(e,t)=>{const n=ft(e,t);return o=>n({...o,loading:!0},"Save")},Us=e=>{const{bau:t}=e,{section:n}=t.tags,o=ft(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Fs=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Ws={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Fs,createComponent:Us}],gridItem:Tn},Vs=e=>{const t=H(e);return()=>t(Ws)},Ks=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],qs=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=Ce(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},Ks.map(r))},Xs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Zs=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=Ce(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Xs.map(r)))},Ys=`import list from "@grucloud/bau-ui/list";
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
`,Js={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ys,createComponent:Zs}],gridItem:qs},Qs=e=>{const t=H(e);return()=>t(Js)};function vt(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...g},...f]=F(l);return a({class:M("modal",r,p,d,u,t==null?void 0:t.class,g==null?void 0:g.class)},i(...f))}}const An=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=W(e),c=vt(e),l=()=>o(Array(10).fill("").map((d,p)=>s(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(r({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),r({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(r({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},ei=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=W(e),l=vt(e),u=()=>o(Array(10).fill("").map((p,g)=>s(g+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},ti=`import modal from "@grucloud/bau-ui/modal";
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
`,ni={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:ti,createComponent:ei}],gridItem:An},oi=e=>{const t=H(e);return()=>t(ni)},ai=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=W(e),r=pt(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},ri=`import popover from "@grucloud/bau-ui/popover";
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
`,si={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:ri,createComponent:ai}]},ii=e=>{const t=H(e);return()=>t(si)};function ci(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:g,href:f})=>s({href:`${a.base}${f}`},r({class:"sublabel"},d),i({class:`label ${d}`},g??p));return function(...p){let[{size:g=t.size??"md",variant:f=t.variant??"plain",color:h=t.color??"neutral",data:v={},...w}]=F(p);const{next:x,previous:S}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...w,class:M("paginationNavigation",g,l,t==null?void 0:t.class,w==null?void 0:w.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(x==null?void 0:x.href)&&u({text:"Next"})(x))}}const li=e=>{const{bau:t}=e,{section:n}=t.tags,o=ci(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},ui=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,di={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ui,createComponent:li}]},pi=e=>{const t=H(e);return()=>t(di)},mi=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=De(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},gi=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=De(e);return()=>n(a({size:"md"},o("My content")))},bi=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,hi={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:bi,createComponent:gi}],variantColorTableDisable:!0,gridItem:mi},fi=e=>{const t=H(e);return()=>t(hi)};function In(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=F(c);return a({...p,type:"radio",class:M("radio-button",l,d,u,s,t==null?void 0:t.class,p==null?void 0:p.class)})}}const Dn=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=In(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},vi=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=In(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},xi=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,wi={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:xi,createComponent:vi}],gridItem:Dn},yi=e=>{const t=H(e);return()=>t(wi)},Si=()=>ee.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ve(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=W(e),l=pt(e),u=Ce(e),d=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Si()}
  `;return function(...g){let[{size:f=t.size??"md",variant:h=t.variant??"outline",color:v=t.color??"neutral",label:w,Option:x,options:S,getOptionLabel:A=({label:E})=>E,...k},...I]=F(g);const T=n.state(k.value),N=n.state(!1),$=n.state(0),R=()=>{b.openDialog(),b.focus(),N.val=!0},V=()=>{b.closeDialog(),N.val=!1},te=()=>{N.val=!1},K=E=>{b.open?V():R(),E.preventDefault()},J=({option:E,index:O})=>B=>{T.val=A(E),C.value=T.val,C.setCustomValidity(""),$.val=O,V(),B.preventDefault()},z=E=>{switch(E.preventDefault(),E.key){case"Escape":V();break;case"ArrowDown":$.val<S.length-1?$.val++:$.val=0;break;case"ArrowUp":$.val<=0?$.val=S.length-1:$.val--;break;case"Enter":b.open?(T.val=A(S[$.val]),V()):R();break}},y=()=>u({tabindex:"0",class:M(v,h)},S.map((E,O)=>i({class:()=>M($.val==O&&"active"),onclick:J({option:E,index:O})},x(E)))),m=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":N,"aria-label":w,onclick:K,color:v,variant:h,size:f},()=>!T.val&&w,T),b=l({triggerEl:m,contentEl:y(),onClose:te}),C=s(k,r({value:""},"--Select Category--"),S.map(E=>r(A(E))));return C.value=k.value,a({...k,class:M("select",v,f,d,t==null?void 0:t.class,k==null?void 0:k.class),onkeydown:z},C,m,b)}}const Nn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ve(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Ci=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ve(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Ei=`import select from "@grucloud/bau-ui/select";
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
`,ki=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Ve(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},Ti=`import select from "@grucloud/bau-ui/select";
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
`,Ai={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Ei,createComponent:Ci},{title:"Select AWS region",description:"Select the AWS region",code:Ti,createComponent:ki}],gridItem:Nn},Ii=e=>{const t=H(e);return()=>t(Ai)};function Mn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("select-native",u,c,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const $n=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Mn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},Di=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Mn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},Ni=`import selectNative from "@grucloud/bau-ui/selectNative";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, option } = bau.tags;

  const SelectNative = selectNative(context);

  const phoneOptions = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  return () =>
    section(
      SelectNative(
        phoneOptions.map(({ label, phone }) => option({ value: phone }, label))
      )
    );
};
`,Mi={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Ni,createComponent:Di}],gridItem:$n},$i=e=>{const t=H(e);return()=>t(Mi)};function Ke(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>ee.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=F(c);return a({...p,type:"range",class:M("slider",d,u,l,s,t==null?void 0:t.class,p.class)},...g)}}const Bn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ke(e);return i=>a({...i,oninput:o})},Bi=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Ke(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Pi=`import slider from "@grucloud/bau-ui/slider";
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
`,Oi=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ke(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},_i=`import slider from "@grucloud/bau-ui/slider";
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
`,Li=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Ke(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},zi=`import slider from "@grucloud/bau-ui/slider";
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
`,Ri={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Pi,createComponent:Bi},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:_i,createComponent:Oi},{title:"Vertical Mark",description:"A vertical slider with marks.",code:zi,createComponent:Li}],gridItem:Bn},ji=e=>{const t=H(e);return()=>t(Ri)},Pn=(e,t)=>{const n=Me(e,t);return o=>n({...o})},Hi=e=>{const{bau:t}=e,{section:n}=t.tags,o=W(e),a=Me(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},Gi=`import spinner from "@grucloud/bau-ui/spinner";
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
`,Ui={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Gi,createComponent:Hi}],gridItem:Pn},Fi=e=>{const t=H(e);return()=>t(Ui)},Wi=()=>ee.map(e=>`
`).join(`
`);function On(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,span:r}=n.tags,c=o`
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
    ${Wi()}
  `;return function(...u){let[{color:d,variant:p="plain",size:g,stepperDefs:f=[],activeStepIndex:h,...v},...w]=F(u);const x=n.state(f.map((I,T)=>({...I,index:T}))),S=n.derive(()=>x.val[h.val]),A=I=>{const{Header:T,disabled:N,name:$,index:R}=I;return s({class:()=>M(S.val.name==$&&"active",h.val<R&&"not-completed",h.val>R&&"completed",N&&"disabled")},r({class:"step-number"},R+1),r({class:"step-label"},()=>T(I)))};return a({class:M("stepper",p,g,d,c,t==null?void 0:t.class,v.class)},n.loop(x,i(),A),n.bind({deps:[S],render:()=>I=>I.Content?I.Content({}):""}))}}const Vi=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=On(e),r=W(e),c=({name:f})=>f,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},g=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:d,variant:"outline",color:"primary"},"Previous"),r({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),g())},Ki=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,qi=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=W(e,{variant:"outline",color:"primary"});return function({onclickProvider:d}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({"data-button-select-aws":!0,onclick:d("AWS")},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({"data-button-select-azure":!0,onclick:d("Azure")},r({width:261,height:90,fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({"data-button-select-google":!0,onclick:d("Google")},r({width:300,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}},qe=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},Xe=e=>{const{bau:t}=e,{i:n}=t.tags,o=W(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},le="https://github.com/grucloud/grucloud/",ue="main",Xi={AWS:[{title:"EC2 an instance with public address",description:"Deploy a EC2 virtual machine attached to an elastic public address",url:le,branch:ue,directory:"examples/aws/ec2"},{title:"EKS",description:"Deploy a kubernetes cluster with EKS",url:le,branch:ue,directory:"examples/aws/EKS/eks-simple"},{title:"Route53 TXT Record",description:"Create an Hosted Zone and a TXT record",url:le,branch:ue,directory:"examples/aws/route53/dns-validation-record-txt"}],Azure:[{title:"Virtual machine",description:"Deploy a virtual machine with a public address, protected by a firewall",url:le,branch:ue,directory:"examples/azure/Compute/vm"}],Google:[{title:"Virtual machine",description:"Deploy a virtual machine on the default network",resources:["compute.instance"],url:le,branch:ue,directory:"examples/google/vm"},{title:"Virtual machine inside a network",description:"Create a network, a sub-network, a virtual machine and firewall rules for HTTP/HTTPS",url:le,branch:ue,directory:"examples/google/vm-network",resources:["compute.network","compute.subnetwork","compute.subnetwork"]},{title:"Secure static website",description:"Deploy a static website served with HTTPS",url:le,branch:ue,directory:"examples/google/storage/website-https"},{title:"DNS records",description:"Manages DNS records such as A, CNAME, TXT and MX records",url:le,branch:ue,directory:"examples/google/dns/github-page"}]},Zi=e=>{const{bau:t,css:n}=e,{li:o,strong:a,span:i}=t.tags;return function({project:r,onclickItem:c}){return o({onclick:c(r),class:n`
          flex-direction: column;
          align-items: flex-start;
        `},a(r.title),i(r.description))}},Yi=e=>{const{bau:t,css:n}=e,{strong:o,small:a}=t.tags,i=W(e);return function({item:r,onclickItem:c}){return i({onclick:c(r),class:n`
          &.button {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
          }
        `},o(r.title),a(r.description))}},Ji=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,footer:s}=t.tags,r=W(e),c=$e(e),l=Xe(e),u=qe(e),d=Yi(e),p=Zi(e),g=Ce(e),f=vt(e);return function({providerName:v,onclickPrevious:w,onclickImportExistingInfra:x,onclickImportFromTemplate:S}){const A=f({id:"my-dialog"},a("Infrastructure from template"),i("Select an infrastructure template from the list below."),n(g(Xi[v].map(k=>p({project:k,onclickItem:I=>()=>{A.close(),S(I)}})))),s(r({variant:"outline",onclick:()=>{A.close()}},"Cancel")));return c({name:"form-import-project","data-form-import-project":!0},a(o("Import Project"),i("")),n(d({"data-selection-project-import-existing":!0,item:{title:"Import an existing infrastructure",description:"Choose this option to visualize an existing infrastructure."},onclickItem:()=>()=>{x()}}),d({"data-selection-project-new-from-template":!0,item:{title:"Create new infrastructure from a template",description:"This option lets you create an infrastructure from a selection of ready made template."},onclickItem:()=>()=>{A.showModal()}})),A,u(l({onclick:w})))}},Qi=e=>{const{bau:t}=e,{span:n}=t.tags,o=Ve(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},ec=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:s,i:r}=t.tags,c=W(e),l=ve(e),u=$e(e),d=Xe(e),p=qe(e),g=Qi(e);return function({onclickPrevious:h,onclickNext:v}){return u({name:"form-config-aws",onsubmit:x=>{x.preventDefault(),v()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(s("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),s("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Region",g({name:"region"}))),p(d({onclick:h}),c({type:"submit",variant:"outline",color:"primary"},"Next",r("▶"))))}},tc=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:s,label:r,i:c,ol:l,li:u,h3:d,pre:p,em:g,div:f}=t.tags,h=W(e),v=Xe(e),w=qe(e),x=ve(e),S=$e(e);return function({onclickPrevious:k,onclickNext:I}){const T=$=>{$.preventDefault(),I()},N=n`
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
    `;return S({name:"form-config-azure",onsubmit:T,"data-infra-create":!0,class:N},i(a("Azure Configuration"),s("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),s("Retrieve the ",g("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),r("Subscription Id",x({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("Tenant Id"),s("Retrieve the ",g("Tenant Id")," with the following command:"),p("az account show"),r("Tenant Id",x({"data-input-azure-tenant-id":!0,placeholder:"Tenant Id",name:"tenantId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("App ID and PASSWORD"),s("Retrieve the ",g("APP_ID")," and ",g("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),f({class:n`
                  display: inline-flex;
                  flex-direction: column;
                  gap: 1rem;
                `},r("App Id",x({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",minLength:36,maxLength:36,size:36,required:!0})),r("Password",x({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",minLength:8,maxLength:64,size:64,required:!0})))))),w(v({onclick:k}),h({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},nc=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,p:r,div:c,i:l,ol:u,li:d,span:p,em:g,a:f,table:h,tbody:v,th:w,tr:x,td:S}=t.tags,{svg:A,use:k}=t.tagsNS("http://www.w3.org/2000/svg"),I=ht(e),T=W(e),N=$e(e),$=Xe(e),R=qe(e);return function({onclickPrevious:te,onclickNext:K}){const J=t.state("No file selected"),z=t.state({}),y=t.state(!0),m=B=>{const G=B.target.files[0];if(G){J.val=G.name;const L=new FileReader;L.readAsText(G),L.onload=()=>{try{debugger;if(L.result){const _=JSON.parse(L.result);z.val=_,_.project_id&&(y.val=!1)}}catch{}},L.onerror=()=>{console.log(L.error)}}else J.val=""},b=({fileName:B,content:G})=>h({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},v(x(w("Credential File"),S(B)),x(w("Project Name"),S(G.project_id)),x(w("Service Account"),S(G.client_email)))),C=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},A({width:100,height:100,fill:"currentColor"},k({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),E=B=>{B.preventDefault(),K()},O=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return N({name:"form-config-google",class:O,onsubmit:E,"data-infra-create":!0},s(i("Google Configuration"),r("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",f({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",g("CREATE SERVICE ACCOUNT"),""),d("Set the ",g("Service account name")," to 'grucloud' for instance"),d("Click on ",g("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",g("CONTINUE"),""),d("Click on ",g("DONE"),""),d("Go to the ",g("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",g("Manage keys"),""),d("Click on ",g("ADD KEYS"),", then ",g("Create new key"),""),d("Click on ",g("CREATE")," to download the credential file in JSON format.")),I({"data-input-google-upload":!0,Component:C,name:"file",accept:"application/JSON",onchange:m}),()=>b({fileName:J.val,content:z.val})),R($({onclick:te}),()=>T({type:"submit",variant:"outline",color:"primary",disabled:y.val},"Next",l("▶"))))}},oc=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=On(e),r=qi(e),c=ec(e),l=tc(e),u=nc(e),d=Ji(e),p=t.state(""),g=t.state(0),f=({name:h})=>h;return function(){const v=T=>()=>{p.val=T,g.val++},w=()=>{g.val++},x=()=>{g.val++},A=[{name:"Provider Selection",Header:f,Content:()=>r({onclickProvider:v}),enter:async()=>{p.val=""}},{name:"Import",Header:()=>"Import Project",Content:()=>d({providerName:p.val,onclickPrevious:k,onclickImportExistingInfra:w,onclickImportFromTemplate:x})},{name:"Configuration",Header:()=>`Configuration ${p.val}`,Content:()=>{switch(p.val){case"AWS":return c({onclickPrevious:k,onclickNext:I});case"Azure":return l({onclickPrevious:k,onclickNext:I});case"Google":return u({onclickPrevious:k,onclickNext:I})}}},{name:"Scan",Header:f,Content:()=>a(i("My stepper 3 Content"))}],k=()=>{g.val>0&&g.val--},I=()=>{A.length>g.val+1&&g.val++};return o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:A,activeStepIndex:g}))}},ac=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,rc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:Ki,createComponent:Vi},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:ac,createComponent:oc}]},sc=e=>{const t=H(e);return()=>t(rc)},ic=()=>ee.map(e=>`
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
`);function _n(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${ic()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=F(r);return a({...d,class:M("switch",i,u,l,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Ln=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=_n(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},cc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=_n(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},lc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,uc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:lc,createComponent:cc}],gridItem:Ln},dc=e=>{const t=H(e);return()=>t(uc)},pc=()=>ee.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Be(e,t={}){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=o`
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
    ${pc()}
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",...f},...h]=F(u);const v=n.state(a),w=n.state(a[0]),x=k=>v.val.find(I=>I.name==k),S=k=>{const{Header:I,disabled:T,name:N}=k;return r({class:()=>M(w.val.name==N&&"active",T&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:N},bubbles:!0}))},I(k))},A=i({class:M("tabs",p,d,g,c,t==null?void 0:t.class,f.class)},n.loop(v,s(),S),()=>w.val.Content?w.val.Content({}):"");return A.addEventListener("tab.select",k=>{var N,$;const{tabName:I}=k.detail,T=x(I);T&&((N=w.val.exit)==null||N.call(),w.val=T,($=T.enter)==null||$.call())},!1),A.addEventListener("tab.add",k=>{var T;const{tab:I}=k.detail;(T=I.enter)==null||T.call(),v.val.push(I)},!1),A.addEventListener("tab.remove",k=>{var T;const I=v.val.findIndex(N=>N.name==k.detail.tabName);I>0&&((T=v.val[I].exit)==null||T.call(),v.val.splice(I,1))},!1),A}}const zn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=Be(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},mc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},gc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,bc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},hc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Rn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},fc=e=>{const{css:t}=e,n=Be(e,{tabDefs:Rn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},vc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,xc=e=>{const{css:t}=e,n=Rn(e),o=Be(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},wc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,yc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:gc,createComponent:mc},{title:"Extended Tabs",description:"An extended tabs.",code:hc,createComponent:bc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:vc,createComponent:fc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:wc,createComponent:xc}],gridItem:zn},Sc=e=>{const t=H(e);return()=>t(yc)};function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=F(c);return i({...l,class:M("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Cc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function d(v,w,x,S,A){return{name:v,calories:w,fat:x,carbs:S,protein:A}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:v,calories:w})=>s(i(v),i({class:n`
            text-align: right;
          `},w)),f=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Pe(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(r(u("Basic Table"),f(),l(p.map(g)))))},Ec=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ee(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const kc=[Ee("Frozen yoghurt",159,6,24,4),Ee("Ice cream sandwich",237,9,37,4.3),Ee("Eclair",262,16,24,6),Ee("Cupcake",305,3.7,67,4.3),Ee("Gingerbread",356,16,49,3.9)],Tc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:f,calories:h})=>s(i(f),i({class:n`
            text-align: right;
          `},h)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pe(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),p(),l(kc.map(d)))))},Ac=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Ic=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],Dc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:f,calories:h})=>s(i(f),i({class:n`
            text-align: right;
          `},h)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pe(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),p(),l(Ic.map(d)))))},Nc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Mc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Ec,createComponent:Cc},{title:"Dense",description:"A dense table.",code:Ac,createComponent:Tc},{title:"Zebra",description:"A zebra table.",code:Nc,createComponent:Dc}]},$c=e=>{const t=H(e);return()=>t(Mc)},Bc=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=tn(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},Pc=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Oc={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Pc,createComponent:Bc}]},_c=e=>{const t=H(e);return()=>t(Oc)};function jn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=bt(e),s=W(e),r=Me(e),c=o`
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
  `,l=({label:f,icon:h,...v})=>s({"aria-label":f,title:f,...v},h),u=({count:f,totalCount:h,page:v,rowsPerPage:w})=>a({class:"pages-numbers"},Number(v-1)*Number(w)+(f>0?1:0),"-",Math.min(v*w,h)," of ",h),d=({count:f,page:h,rowsPerPage:v})=>a({class:"pages-numbers"},(h-1)*v+(f>0?1:0),"-",h*v),p=f=>f<=1,g=(f,h,v)=>f>=Math.ceil(h/v);return function(...h){let[{size:v=t.size??"md",variant:w=t.variant??"outline",color:x=t.color??"neutral",count:S=0,totalCount:A=0,page:k=1,rowsPerPage:I=50,onPageChange:T,isLoading:N=!1,disableFirst:$=()=>p(k),disablePrevious:R=()=>p(k),disableNext:V=()=>g(k,A,I),disableLast:te=()=>g(k,A,I),...K},...J]=F(h);const z=Math.max(0,Math.ceil(A/I)),y=T({page:1}),m=T({page:k-1}),b=T({page:k+1}),C=T({page:z}),E=[{label:"First",icon:"⟪",onclick:y,disabled:$()},{label:"Previous",icon:"⟨",onclick:m,disabled:R()},{label:"Next",icon:"⟩",onclick:b,disabled:V()},{label:"Last",icon:"⟫",onclick:C,disabled:te()}];return a({...K,class:M("table-pagination",c,N&&"disabled",t==null?void 0:t.class,K==null?void 0:K.class)},r({class:"spinner",visibility:N,size:"md"}),A>0?u({count:S,totalCount:A,page:k,maxPages:z,rowsPerPage:I}):d({count:S,page:k,maxPages:z,rowsPerPage:I}),i({variant:w,color:x},E.map(O=>l({...O,variant:w,color:x}))))}}const Lc=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),zc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=Lc(45),u=({name:x,email:S})=>i(a(x),a(S)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=jn(e),g=Pe(e,{class:n`
      max-width: 650px;
    `}),f=t.state(l),h=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=t.derive(()=>f.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),w=({page:x})=>S=>{h.val.page=x};return()=>g(s(d(),()=>c(v.val.map(u))),()=>p({...h.val,onPageChange:w}))},Rc=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),g=t.derive(()=>d.val.length),f=t.state(1),h=t.state(10),v=t.derive(()=>d.val),w=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,x=({page:$})=>R=>{f.val=$,S(w({page:$,per_page:h.val}))};S(w({page:1,per_page:h.val}));async function S($){try{u.val=!0;const R=await fetch($,{});if(R.ok){const V=await R.json();d.val=V;return}throw R}catch(R){p.val=R.message}finally{u.val=!1}}const A=({name:$,description:R,stargazers_count:V})=>i(a($),a(R),a({class:n`
            text-align: right;
          `},V)),k=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),I=jn(e),T=Pe(e,{class:n`
      min-width: 650px;
    `}),N=({message:$})=>l($);return()=>T(()=>I({rowsPerPage:h.val,page:f.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:x,disableNext:()=>!1}),s(k(),()=>p.val&&N({message:p.val}),()=>c(v.val.map(A))))},jc=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=zc(e),l=Rc(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Oe(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
    cursor: pointer;
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:g,onChange:f,...h},...v]=F(c);return i({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>w=>w},class:{deps:[p],renderProp:()=>w=>M("toggle",l,d,u,s,w&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:g},v)}}const Hn=(e,t)=>{const{bau:n}=e,o=Oe(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},Hc=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Gc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Uc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Gc,createComponent:Hc}],gridItem:Hn},Fc=e=>{const t=H(e);return()=>t(Uc)},Wc=()=>ee.map(e=>`
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
`);function xt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Wc()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...g},...f]=F(r);const h=new Set,v=w=>{const{value:x}=w.target;d?(h.clear(),h.add(x)):h.has(x)?h.delete(x):h.add(x),p({event:w,values:[...h]})};return a({...g,class:M("toggle-group",c,u,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v},...f)}}const Gn=(e,t)=>{const{bau:n}=e,o=xt(e,t),a=Oe(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},Vc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=xt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},Kc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,qc=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=xt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},Xc=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Zc={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Kc,createComponent:Vc},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Xc,createComponent:qc}],gridItem:Gn},Yc=e=>{const t=H(e);return()=>t(Zc)};function wt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",...f},...h]=F(c);const v=i({class:M("container",...u.split("-"))},i({class:M("content",g,p,d),role:"tooltip"},l)),w=T=>`move-to-${T}`,x=(T,N,$)=>{if(T()){const R=w(N);v.classList.add(R),v.classList.add(N),v.classList.remove($)}},S=(T,N)=>{const $=w(T);v.classList.contains($)&&(v.classList.remove($),v.classList.add(N),v.classList.remove(T))},A=T=>{const N=v.getBoundingClientRect();x(()=>N.x<0,"right","left"),x(()=>N.x+N.width>a.innerWidth,"left","right"),x(()=>N.y<0,"bottom","top"),x(()=>N.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},k=T=>{v.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...f,class:M("tooltip",s,t==null?void 0:t.class,f==null?void 0:f.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",A),T.addEventListener("mouseout",k)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",A),T.removeEventListener("mouseout",k)}},...h,v)}}const Un=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=W(e),r=wt(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Jc=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=W(e),s=wt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Qc=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,el=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Ue(e,{variant:"outline",color:"primary"}),c=wt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},tl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,nl={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Qc,createComponent:Jc},{title:"Grid",description:"Various tooltip position",code:tl,createComponent:el}],gridItem:Un},ol=e=>{const t=H(e);return()=>t(nl)},Fn=(e,t)=>{const n=at(e,t);return o=>n(o)},al=e=>{const{bau:t}=e,{section:n}=t.tags,o=at(e);return()=>n(o({}))},rl=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,sl={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:rl,createComponent:al}],gridItem:Fn},il=e=>{const t=H(e);return()=>t(sl)},cl=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Wn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=cl({css:o,createGlobalStyles:a}),d=dt(e),p=({depth:g=1,maxDepth:f,color:h,variant:v,size:w})=>x=>{const{children:S,expanded:A}=x,k=n.state(!A),I=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:N=>{S&&(k.val=!k.val)}},i(x.data)),T=()=>s({class:M(h,w)},S.map(p({depth:g+1,maxDepth:f})));return r(d({size:w,Header:I,Content:S&&g<f&&T}))};return function({tree:f,maxDepth:h=1/0,size:v=t.size??"md",variant:w=t.variant??"outline",color:x=t.color??"neutral",...S}){return c({class:M(u.nav,v,w,x,t==null?void 0:t.class,S.class)},f.children&&s(f.children.map(p({maxDepth:h,color:x,variant:w,size:v}))))}}const Vn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Wn(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},ll=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Wn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},ul=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,dl={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:ul,createComponent:ll}],gridItem:Vn},pl=e=>{const t=H(e);return()=>t(dl)},ml=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=nn(e),u=W(e),d=[{name:"Accordion",Item:on(e)},{name:"Alert",Item:rn(e)},{name:"Autocomplete",Item:ln(e)},{name:"Avatar",Item:cn(e)},{name:"Badge",Item:dn(e)},{name:"Breadcrumbs",Item:pn(e)},{name:"Button",Item:mn(e)},{name:"Button Group",Item:gn(e)},{name:"Calendar",Item:hn(e)},{name:"Checkbox",Item:xn(e)},{name:"Chip",Item:fn(e)},{name:"DrillDown Menu",Item:wn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:yn(e)},{name:"Input",Item:Sn(e)},{name:"Input Search",Item:Cn(e)},{name:"Linear Progress",Item:kn(e)},{name:"Loading Button",Item:Tn(e)},{name:"Modal",Item:An(e)},{name:"Radio Button",Item:Dn(e)},{name:"Select",Item:Nn(e)},{name:"Select Native",Item:$n(e)},{name:"Slider",Item:Bn(e)},{name:"Spinner",Item:Pn(e)},{name:"Switch",Item:Ln(e)},{name:"Tabs",Item:zn(e)},{name:"Theme Switch",Item:Fn(e)},{name:"Toggle",Item:Hn(e)},{name:"Toggle Group",Item:Gn(e)},{name:"Tooltip",Item:Un(e)},{name:"Tree View",Item:Vn(e)}];return()=>o({class:n`
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
            `},l(p))))},gl=({context:e})=>{const t=ml(e);return[{path:"",action:n=>({title:"Bau UI",component:Bo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:La(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ka(e)})},{path:"alert",action:()=>({title:"Alert",component:tr(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:sr(e)})},{path:"animate",action:()=>({title:"Animate",component:pr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Er(e)})},{path:"avatar",action:()=>({title:"Avatar",component:hr(e)})},{path:"badge",action:()=>({title:"Badge",component:Ir(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Pr(e)})},{path:"button",action:()=>({title:"Button",component:jr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Wr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Xr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:ts(e)})},{path:"chip",action:()=>({title:"Chip",component:rs(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ls(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ms(e)})},{path:"drawer",action:()=>({title:"Drawer",component:vs(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Ss(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Ts(e)})},{path:"form",action:()=>({title:"Form",component:Ns(e)})},{path:"input",action:()=>({title:"Input",component:Ps(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:zs(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Gs(e)})},{path:"list",action:()=>({title:"List",component:Qs(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Vs(e)})},{path:"modal",action:()=>({title:"Modal",component:oi(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:pi(e)})},{path:"paper",action:()=>({title:"Paper",component:fi(e)})},{path:"popover",action:()=>({title:"Popover",component:ii(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:yi(e)})},{path:"select",action:()=>({title:"Select",component:Ii(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:$i(e)})},{path:"slider",action:()=>({title:"Slider",component:ji(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Fi(e)})},{path:"stepper",action:()=>({title:"Stepper",component:sc(e)})},{path:"switch",action:()=>({title:"Switch",component:dc(e)})},{path:"table",action:()=>({title:"Table",component:$c(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:_c(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:jc(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Sc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:Fc(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Yc(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:ol(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:il(e)})},{path:"treeView",action:()=>({title:"Tree View",component:pl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:_o(e)})}]},bl=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),hl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=t}=l.resolve({pathname:u});s.val=p({}),document.title=`${d}`}},fl=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};uo();const Kn={title:"Bau",base:"/bau/bau-ui"},he=xo({config:Kn}),{bau:vl}=he;he.states={drawerOpen:vl.state(!0)};fl(he);eo({routes:gl({context:he}),onLocationChange:hl({context:he,LayoutDefault:Do(he),config:Kn}),notFoundRoute:bl(he)});
