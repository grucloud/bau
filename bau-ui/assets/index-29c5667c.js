(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Jn=(e,t)=>({...e,paths:[...t,e.path]}),Bt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Jn(o,e);return n?[a,...Bt({paths:[...e,o.path],routes:n})]:a}),Qn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},eo=({routes:e=[],notFoundRoute:t})=>{const n=Bt({routes:e}).map(o=>({...o,regex:Qn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function to({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const a=s=>{o={...s}},i=eo({routes:e,notFoundRoute:t});return window.addEventListener("popstate",s=>{o.pathname!=s.target.location.pathname&&n({router:i}),a(s.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(s,r,c)=>{s.apply(r,c),o.pathname!=window.location.pathname&&n({router:i}),a(window.location)}}),document.addEventListener("click",s=>{const{target:r}=s,c=r.closest("a");if(!c)return;const l=c.getAttribute("href");l&&!l.startsWith("http")&&!l.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",l),history.pushState({},null,l),a(window.location),["?","#"].includes(l[0])||window.scrollTo({top:0,left:0}),s.preventDefault())}),n({router:i}),i}const nt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],no=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],oo=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],xt=e=>`var(--color-${e})`,ao=e=>`var(--color-${e}-lightest)`,ro=()=>nt.map(([e])=>`
.outline.${e} {
  border: 1px solid ${xt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ao(e)};
}
.solid.${e} {
  background-color: ${xt(e)};
}
`).join(`
`),so=()=>nt.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),io=e=>100-e*10,co=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${io(t)}%);`).join(`
`),yt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),lo=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...no.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...oo.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function uo({createGlobalStyles:e},{colorPalette:t=nt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>lo([n,o])).join(`
`)}
      ${co()}
      ${yt({})}
      ${ro()}
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
      ${so()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${yt({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function po(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let ot=e=>Object.prototype.toString.call(e??0).slice(8,-1),mo=e=>ot(e)=="Object",wt=e=>ot(e)=="Function",Qe=e=>["Object","Array"].includes(ot(e)),St=Object.getPrototypeOf,et=e=>ve(e)?e.val:e,ve=e=>e==null?void 0:e.__isState,go=["splice","push","pop","shift","unshift","sort","reverse"],_e=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const X=e=>!ve(e[0])&&mo(e[0])?e:[{},...e];function bo(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=w=>n.createElement(w),l=(w,m,h)=>{let C=r;r=m;let E=w(h);return r=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(w=>{w.bindings=w.bindings.filter(m=>{var h;return(h=m.element)==null?void 0:h.isConnected}),!w.bindings.length&&!w.computed&&a.delete(w)}),o=void 0}))},p=(w,m,h,C,E,H)=>{var L;if(s){i.add(w);return}for(let W of w.bindings){let{deps:F,element:N,renderInferred:K,render:ne,renderItem:ee}=W;if(ee&&m)(L=b(N,C,(...ae)=>v(ee(...ae)),h,E,H)[m])==null||L.call();else{let ae=K?K({element:N}):ne({element:N,renderItem:ee})(...F.map(et));ae!==N&&N.replaceWith(W.element=v(ae))}}S(w),u()},d=(w,m,h=[])=>({get(C,E,H){var L;if(r==null||r.add(w),E==="_isProxy")return!0;if(!((L=C[E])!=null&&L._isProxy)&&!ve(C[E])&&Qe(C[E]))C[E]=new Proxy(C[E],d(w,m,[...h,E]));else if(go.includes(E)){let W=C[E];return(...F)=>{let N=W.apply(C,F);return p(w,E,N,F,m,h),N}}return Reflect.get(C,E,H)},set(C,E,H,L){let W=Reflect.set(C,E,H,L);return p(w,"setItem",W,{prop:E,value:H},m,[...h,E]),W}}),g=(w,m)=>new Proxy(m,d(w,m)),b=(w,m,h,C,E,H)=>{let L=()=>w.replaceChildren(..._e(C,h)),W=F=>w[F]&&w.removeChild(w[F]);return{assign:L,sort:L,reverse:L,setItem:()=>{var N;let F=H[0];(N=w.children[F])==null||N.replaceWith(h(E[F],F))},push:()=>w.append(..._e(m,(F,N)=>h(F,E.length+N))),unshift:()=>w.prepend(..._e(m,h)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{const{length:F}=w.children;let[N,K=F,...ne]=m;for(let ee=N>=0?Math.min(N+K-1,F-1):F-1;ee>=(N>=0?N:F+N);ee--)w.children[ee].remove();if(ne.length){let ee=ne.forEach((ae,he)=>h(ae,N+he));w.children[N]?w.children[N].after(...ee):w.append(...ee)}}}},f=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=Qe(w)?g(m,w):w,m.valProxy)},set val(m){let h=this,C=h.val;Qe(m)?(h.valProxy=g(h,m),p(h,"assign",m)):m!==C&&(h.valProxy=m,p(h)),h.oldVal=C}}),v=w=>{if(w==null||w===!1){const m=c("span");return m.style.display="none",m}else return w.nodeType?w:n.createTextNode(w)},x=(w,m)=>{let h=new Set;return m.val=l(w,h),h},y=w=>{let m=f(),h=x(w,m);m.computed=!0;for(let C of h)C.listeners.push({computed:w,deps:h,state:m});return m},S=w=>{for(let m of[...w.listeners])x(m.computed,m.state)},k=(w,...m)=>{if(m.length){let h=[];for(let C of m.flat(1/0))C!=null&&h.push(ve(C)?R({deps:[C],render:()=>E=>E}):wt(C)?j({renderInferred:C}):v(C));w.append(...h)}},T={},B=(w,m)=>w&&(Object.getOwnPropertyDescriptor(w,m)??B(St(w),m)),D=(w,m,h)=>{var C;return T[w+","+m]??(T[w+","+m]=((C=B(h,m))==null?void 0:C.set)??0)},M=(w,m)=>new t.MutationObserver((h,C)=>{h.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(H=>H===w&&(m({element:w}),C.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),P=(w,m)=>new t.MutationObserver((h,C)=>h.forEach(E=>m({record:E,element:w}))).observe(w,{childList:!0}),O=w=>new Proxy(function(h,...C){var W;let[E,...H]=X(C),L=w?n.createElementNS(w,h):c(h);for(let[F,N]of Object.entries(E)){if(F.startsWith("bau"))continue;let K=D(h,F,St(L))?ne=>ne!==void 0&&(L[F]=ne):ne=>L.setAttribute(F,ne);N==null||(ve(N)?R({deps:[N],render:()=>()=>(K(N.val),L)}):wt(N)&&(!F.startsWith("on")||N.isDerived)?j({renderInferred:()=>(K(N({element:L})),L)}):N.renderProp?R({deps:N.deps,render:()=>()=>(K(N.renderProp({element:L})(...N.deps.map(et))),L)}):K(N))}return E.bauChildMutated&&P(L,E.bauChildMutated),k(L,...H),L.autofocus&&L.focus&&t.requestAnimationFrame(()=>L.focus()),(W=E.bauCreated)==null||W.call(E,{element:L}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:L})),E.bauUnmounted&&t.requestAnimationFrame(()=>M(L,E.bauUnmounted)),L},{get:(m,h)=>m.bind(void 0,h)}),$=(w,m,h)=>{w.element=v(h);for(let C of m)ve(C)&&(a.add(C),C.bindings.push(w));return w.element},j=({renderInferred:w,element:m})=>{let h=new Set,C=l(w,h,{element:m});return $({renderInferred:w},h,C)},R=({deps:w,element:m,render:h,renderItem:C})=>$({deps:w,render:h,renderItem:C},w,h({element:m,renderItem:C})(...w.map(et))),G=(w,m,h)=>R({deps:[w],render:({renderItem:C})=>E=>(m.append(..._e(E,C)),m),renderItem:h}),_=w=>{s=!0,w(),s=!1,i.forEach(p),i.clear()};return{tags:O(),tagsNS:O,state:f,bind:R,loop:G,derive:y,stateSet:a,batch:_}}const ho=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},fo=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},vo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function xo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=vo(a,i),r=ho(s);return!t.getElementById(r)&&fo(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function yo(e){const t=bo(),n=xo();return uo(n),{bau:t,...n,tr:o=>o,window,...e}}function A(...e){return e.filter(t=>t).join(" ")}function Ge(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:A("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!s()||d.getAttribute("cloned"))return;const g=d.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=d.getAttribute("width"),g.style.height=d.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),u.target.appendChild(g),g.addEventListener("animationend",()=>{var b;return(b=g.parentNode)==null?void 0:b.removeChild(g)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const g=d.getBoundingClientRect();if(d.setAttribute("width",g.width+"px"),d.setAttribute("height",g.height+"px"),r()){d.style.animation=r();const b=()=>{d.removeEventListener("animationend",b),d.style.animation=""};d.addEventListener("animationend",b)}})},...c},l)}}const te=["neutral","primary","success","danger","warning"],wo=["plain","outline","solid"],So=["sm","md","lg"],Co=()=>te.map(e=>`
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
`);function q(e,t={}){const{bau:n,css:o}=e,a=o`
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
      cursor: pointer;
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
    ${Co()}
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...p},...d]=X(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...p,class:A("button",t.class,c,r,l,a,p.class),href:u},d)}}const Eo="light",ko=()=>te.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function at(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Eo);const l=o`
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
    ${ko()}
  `;return function(...p){let[{size:d=t.size??"md",variant:g=t.variant??"plain",color:b=t.color??"neutral",...f},...v]=X(p);return i({required:"required",title:"Switch Theme",...f,class:A("theme-switch",b,g,d,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:r()=="dark",onclick:x=>{s(x.target.checked?"dark":"light")}},...v)}}function To(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:p,b:d,ul:g,li:b}=n.tags,{svg:f,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,y=q(e,{class:o`
      background: transparent;
    `}),S=at(e),k=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),T=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},y({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},k()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(t("Bau UI")))),B=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),y({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},T(),B())}}function Ao({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:p}=t.tags,d=({links:f,title:v})=>o({class:n`
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
        `},p(v),r(f.map(({href:x,name:y})=>c(s({href:x},y))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],b=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},d({title:"Bau UI",links:g}),d({title:"Bau Ecosystem",links:b})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.56.0"),i("MIT license")))}}function we(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=X(r);return a({...p,class:A("list",i,u,l,c,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Re="0.3s",Pt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(Pt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Ot=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ot(e)(t.children[o]);if(a)return a}},Do=({keyframes:e})=>({hideToLeft:e`
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
   `});function rt(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=_=>{var w;return((w=_.parentTree.data)==null?void 0:w.href)??_.parentTree.children[0].data.href},u=({variant:_,color:w,size:m,currentTree:h,data:C})=>S(D({variant:_,color:w,size:m,href:`${c}${l(h)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:_,color:w,size:m,href:`${c}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),p=({size:_,subTree:{data:{name:w,href:m},children:h=[]}})=>D({size:_,href:`${c}${m}`,"data-ischild":!h.length},w),d=({pathname:_,subTree:w})=>{var m;return _===((m=w==null?void 0:w.data)==null?void 0:m.href)},{renderHeader:g=u,renderMenuItem:b=p,isActive:f=d}=t,{li:v,nav:x,div:y,header:S,a:k}=n.tags,T=Ge(e),B=we(e),D=q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:M,hideToRight:P}=Do(e),O=o`
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
  `,$=({children:_,pathnameState:w,variant:m,color:h,size:C})=>B({class:A(m,h,C)},_.map(E=>v({class:()=>A(E.children&&"has-children",f({pathname:w.val,subTree:E})&&"active")},b({variant:m,color:h,size:C,subTree:E})))),j=({variant:_,color:w,size:m,currentTree:h,pathnameState:C})=>{const{children:E,parentTree:H,data:L,renderList:W}=h;return y({class:A("drillDownMenu",_,w,m)},H&&g({variant:_,color:w,size:m,data:L,currentTree:h}),E&&W?W({renderListDefault:$,children:E,pathnameState:C,variant:_,color:w,size:m}):$({children:E,pathnameState:C,variant:_,color:w,size:m}))},R=({tree:_,pathname:w})=>{let m=Pt({})({..._}),h=Ot(w)(m);return h||(h=m),h},G=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",_=>{const{target:w}=_,m=w.getAttribute("href");if(w.tagName==="A"&&m&&!m.startsWith("http")&&!m.startsWith("#")&&!m.startsWith("?")){let h=m.replace(c,"");r||(h=h.replace(w.hash,"")),G.val=h}}),function(w){const{size:m=t.size??"md",variant:h=t.variant??"plain",color:C=t.color??"neutral",tree:E,...H}=w;let L,W=n.derive(()=>(L=R({tree:E,pathname:G.val}),L)),F=1;const N=ee=>{const{dataset:ae}=ee.target;ae.buttonback=="true"?F=-1:ae.ischild=="false"?F=1:ae.ischild=="true"&&(F=0)},K=ee=>{switch(ee){case 1:return`${M} ${Re}`;case-1:return`${P} ${Re}`;default:return""}},ne=ee=>{switch(ee){case 1:return`${P} ${Re} reverse`;case-1:return`${M} ${Re} reverse`;default:return""}};return x({class:A(O,h,C,m,t==null?void 0:t.class,H.class),onclick:N},T({animationHide:()=>K(F),animationShow:()=>ne(F)},n.bind({deps:[W],render:()=>()=>j({variant:h,color:C,size:m,currentTree:L,pathnameState:G})})))}}const Io=()=>te.map(e=>`
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
`);function le(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:A("input",t.class,t.size??"md",l,c,i,u.class)})}}function st(e,t={}){const{bau:n,css:o,window:a}=e,i=le(e,t);return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r,d=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,g=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${d};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return i({type:"search",...u,color:l,variant:c,class:A("inputSearch",t.class,g,u.class)})}}function Lt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:p,span:d}=n.tags,g=st(e,{variant:"plain",color:"neutral",size:"sm"}),f={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:y,children:S,pathnameState:k,variant:T,color:B,size:D})=>{const M=n.state(""),P=n.derive(()=>M.val==""?S:S.filter($=>$.data.name.match(new RegExp(`${M.val}`,"i")))),O=$=>{M.val=$.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},g({autocomplete:!1,name:"search",autofocus:!0,value:M,placeholder:`Search ${P.val.length} components`,size:22,oninput:O}),()=>y({children:P.val,pathnameState:k,variant:T,color:B,size:D}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let v=!1;const x=rt(e);return function(){return r({bauMounted:({element:S})=>{s.innerWidth<=640&&(v=!0,i.drawerOpen.val=!1)},onclick:S=>{v&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:A(o`
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
          `)},x({tree:f}))}}const Mo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ge(e),r=To(e),c=Lt(e),l=Ao(e),u=a`
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
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>g.val),l())}};function Fe(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
    display: inline-flex;
    align-items: center;
    flex-grow: 0;
    box-sizing: border-box;
    gap: 0.5rem;
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:p,...d},...g]=X(r);return a({...d,onclick:p,class:A("chip",t.class,c,l,u,p&&"clickable",i,d.class)},...g)}}function No(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;q(e);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),s(p),r(d))}}function $o(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Bo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:g,size:b})=>r({class:n`
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
                  var(--color-success) ${b/d*100}%
                );
                justify-content: flex-end;
                width: ${b/d*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},b)));return function({data:g=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Po(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=No(e),l=$o(e),u=q(e);Fe(e);const p=Bo(e),d=(...x)=>a({class:n`
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
          `},...x)),g=n``,b=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:b}),v())}}function Oo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const Lo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Oo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function zo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Lo(e)()))}}function _o(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function zt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&zt(n)}),e}class Ct{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function _t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ue(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Ro="</span>",Et=e=>!!e.scope,jo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Ho{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=_t(t)}openNode(t){if(!Et(t))return;const n=jo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Et(t)&&(this.buffer+=Ro)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const kt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class it{constructor(){this.rootNode=kt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=kt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{it._collapse(n)}))}}class Uo extends it{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Ho(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ae(e){return e?typeof e=="string"?e:e.source:null}function Rt(e){return be("(?=",e,")")}function Go(e){return be("(?:",e,")*")}function Fo(e){return be("(?:",e,")?")}function be(...e){return e.map(n=>Ae(n)).join("")}function Vo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ct(...e){return"("+(Vo(e).capture?"":"?:")+e.map(o=>Ae(o)).join("|")+")"}function jt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Wo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Xo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function lt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ae(o),s="";for(;i.length>0;){const r=Xo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Zo=/\b\B/,Ht="[a-zA-Z]\\w*",ut="[a-zA-Z_]\\w*",Ut="\\b\\d+(\\.\\d+)?",Gt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ft="\\b(0b[01]+)",qo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=be(t,/.*\b/,e.binary,/\b.*/)),ue({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},De={begin:"\\\\[\\s\\S]",relevance:0},Yo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[De]},Jo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[De]},Qo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ve=function(e,t,n={}){const o=ue({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ct("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:be(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ea=Ve("//","$"),ta=Ve("/\\*","\\*/"),na=Ve("#","$"),oa={scope:"number",begin:Ut,relevance:0},aa={scope:"number",begin:Gt,relevance:0},ra={scope:"number",begin:Ft,relevance:0},sa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[De,{begin:/\[/,end:/\]/,relevance:0,contains:[De]}]}]},ia={scope:"title",begin:Ht,relevance:0},ca={scope:"title",begin:ut,relevance:0},la={begin:"\\.\\s*"+ut,relevance:0},ua=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var je=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Zo,IDENT_RE:Ht,UNDERSCORE_IDENT_RE:ut,NUMBER_RE:Ut,C_NUMBER_RE:Gt,BINARY_NUMBER_RE:Ft,RE_STARTERS_RE:qo,SHEBANG:Ko,BACKSLASH_ESCAPE:De,APOS_STRING_MODE:Yo,QUOTE_STRING_MODE:Jo,PHRASAL_WORDS_MODE:Qo,COMMENT:Ve,C_LINE_COMMENT_MODE:ea,C_BLOCK_COMMENT_MODE:ta,HASH_COMMENT_MODE:na,NUMBER_MODE:oa,C_NUMBER_MODE:aa,BINARY_NUMBER_MODE:ra,REGEXP_MODE:sa,TITLE_MODE:ia,UNDERSCORE_TITLE_MODE:ca,METHOD_GUARD:la,END_SAME_AS_BEGIN:ua});function da(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function pa(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ma(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=da,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ga(e,t){Array.isArray(e.illegal)&&(e.illegal=ct(...e.illegal))}function ba(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ha(e,t){e.relevance===void 0&&(e.relevance=1)}const fa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=be(n.beforeMatch,Rt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},va=["of","and","for","in","not","or","if","then","parent","list","value"],xa="keyword";function Vt(e,t,n=xa){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Vt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ya(c[0],c[1])]})}}function ya(e,t){return t?Number(t):wa(e)?0:1}function wa(e){return va.includes(e.toLowerCase())}const Tt={},ge=e=>{console.error(e)},At=(e,...t)=>{console.log(`WARN: ${e}`,...t)},fe=(e,t)=>{Tt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Tt[`${e}/${t}`]=!0)},Ue=new Error;function Wt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=jt(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function Sa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ge("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ue;if(typeof e.beginScope!="object"||e.beginScope===null)throw ge("beginScope must be object"),Ue;Wt(e,e.begin,{key:"beginScope"}),e.begin=lt(e.begin,{joinWith:""})}}function Ca(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ge("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ue;if(typeof e.endScope!="object"||e.endScope===null)throw ge("endScope must be object"),Ue;Wt(e,e.end,{key:"endScope"}),e.end=lt(e.end,{joinWith:""})}}function Ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ka(e){Ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Sa(e),Ca(e)}function Ta(e){function t(s,r){return new RegExp(Ae(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=jt(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(lt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[pa,ba,ka,fa].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ma,ga,ha].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Vt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ae(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Aa(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ue(e.classNameAliases||{}),i(e)}function Xt(e){return e?e.endsWithParent||Xt(e.starts):!1}function Aa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ue(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Xt(e)?ue(e,{starts:e.starts?ue(e.starts):null}):Object.isFrozen(e)?ue(e):e}var Da="11.8.0";class Ia extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const tt=_t,Dt=ue,It=Symbol("nomatch"),Ma=7,Zt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Uo};function c(m){return r.noHighlightRe.test(m)}function l(m){let h=m.className+" ";h+=m.parentNode?m.parentNode.className:"";const C=r.languageDetectRe.exec(h);if(C){const E=P(C[1]);return E||(At(i.replace("{}",C[1])),At("Falling back to no-highlight mode for this block.",m)),E?C[1]:"no-highlight"}return h.split(/\s+/).find(E=>c(E)||P(E))}function u(m,h,C){let E="",H="";typeof h=="object"?(E=m,C=h.ignoreIllegals,H=h.language):(fe("10.7.0","highlight(lang, code, ...args) has been deprecated."),fe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),H=m,E=h),C===void 0&&(C=!0);const L={code:E,language:H};_("before:highlight",L);const W=L.result?L.result:p(L.language,L.code,C);return W.code=L.code,_("after:highlight",W),W}function p(m,h,C,E){const H=Object.create(null);function L(I,z){return I.keywords[z]}function W(){if(!V.keywords){oe.addText(Q);return}let I=0;V.keywordPatternRe.lastIndex=0;let z=V.keywordPatternRe.exec(Q),Z="";for(;z;){Z+=Q.substring(I,z.index);const J=ie.case_insensitive?z[0].toLowerCase():z[0],re=L(V,J);if(re){const[ce,Kn]=re;if(oe.addText(Z),Z="",H[J]=(H[J]||0)+1,H[J]<=Ma&&(ze+=Kn),ce.startsWith("_"))Z+=z[0];else{const Yn=ie.classNameAliases[ce]||ce;K(z[0],Yn)}}else Z+=z[0];I=V.keywordPatternRe.lastIndex,z=V.keywordPatternRe.exec(Q)}Z+=Q.substring(I),oe.addText(Z)}function F(){if(Q==="")return;let I=null;if(typeof V.subLanguage=="string"){if(!t[V.subLanguage]){oe.addText(Q);return}I=p(V.subLanguage,Q,!0,vt[V.subLanguage]),vt[V.subLanguage]=I._top}else I=g(Q,V.subLanguage.length?V.subLanguage:null);V.relevance>0&&(ze+=I.relevance),oe.__addSublanguage(I._emitter,I.language)}function N(){V.subLanguage!=null?F():W(),Q=""}function K(I,z){I!==""&&(oe.startScope(z),oe.addText(I),oe.endScope())}function ne(I,z){let Z=1;const J=z.length-1;for(;Z<=J;){if(!I._emit[Z]){Z++;continue}const re=ie.classNameAliases[I[Z]]||I[Z],ce=z[Z];re?K(ce,re):(Q=ce,W(),Q=""),Z++}}function ee(I,z){return I.scope&&typeof I.scope=="string"&&oe.openNode(ie.classNameAliases[I.scope]||I.scope),I.beginScope&&(I.beginScope._wrap?(K(Q,ie.classNameAliases[I.beginScope._wrap]||I.beginScope._wrap),Q=""):I.beginScope._multi&&(ne(I.beginScope,z),Q="")),V=Object.create(I,{parent:{value:V}}),V}function ae(I,z,Z){let J=Wo(I.endRe,Z);if(J){if(I["on:end"]){const re=new Ct(I);I["on:end"](z,re),re.isMatchIgnored&&(J=!1)}if(J){for(;I.endsParent&&I.parent;)I=I.parent;return I}}if(I.endsWithParent)return ae(I.parent,z,Z)}function he(I){return V.matcher.regexIndex===0?(Q+=I[0],1):(Je=!0,0)}function Le(I){const z=I[0],Z=I.rule,J=new Ct(Z),re=[Z.__beforeBegin,Z["on:begin"]];for(const ce of re)if(ce&&(ce(I,J),J.isMatchIgnored))return he(z);return Z.skip?Q+=z:(Z.excludeBegin&&(Q+=z),N(),!Z.returnBegin&&!Z.excludeBegin&&(Q=z)),ee(Z,I),Z.returnBegin?0:z.length}function Ce(I){const z=I[0],Z=h.substring(I.index),J=ae(V,I,Z);if(!J)return It;const re=V;V.endScope&&V.endScope._wrap?(N(),K(z,V.endScope._wrap)):V.endScope&&V.endScope._multi?(N(),ne(V.endScope,I)):re.skip?Q+=z:(re.returnEnd||re.excludeEnd||(Q+=z),N(),re.excludeEnd&&(Q=z));do V.scope&&oe.closeNode(),!V.skip&&!V.subLanguage&&(ze+=V.relevance),V=V.parent;while(V!==J.parent);return J.starts&&ee(J.starts,I),re.returnEnd?0:z.length}function de(){const I=[];for(let z=V;z!==ie;z=z.parent)z.scope&&I.unshift(z.scope);I.forEach(z=>oe.openNode(z))}let Y={};function se(I,z){const Z=z&&z[0];if(Q+=I,Z==null)return N(),0;if(Y.type==="begin"&&z.type==="end"&&Y.index===z.index&&Z===""){if(Q+=h.slice(z.index,z.index+1),!a){const J=new Error(`0 width match regex (${m})`);throw J.languageName=m,J.badRule=Y.rule,J}return 1}if(Y=z,z.type==="begin")return Le(z);if(z.type==="illegal"&&!C){const J=new Error('Illegal lexeme "'+Z+'" for mode "'+(V.scope||"<unnamed>")+'"');throw J.mode=V,J}else if(z.type==="end"){const J=Ce(z);if(J!==It)return J}if(z.type==="illegal"&&Z==="")return 1;if(Ye>1e5&&Ye>z.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Q+=Z,Z.length}const ie=P(m);if(!ie)throw ge(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const qn=Ta(ie);let Ke="",V=E||qn;const vt={},oe=new r.__emitter(r);de();let Q="",ze=0,pe=0,Ye=0,Je=!1;try{if(ie.__emitTokens)ie.__emitTokens(h,oe);else{for(V.matcher.considerAll();;){Ye++,Je?Je=!1:V.matcher.considerAll(),V.matcher.lastIndex=pe;const I=V.matcher.exec(h);if(!I)break;const z=h.substring(pe,I.index),Z=se(z,I);pe=I.index+Z}se(h.substring(pe))}return oe.finalize(),Ke=oe.toHTML(),{language:m,value:Ke,relevance:ze,illegal:!1,_emitter:oe,_top:V}}catch(I){if(I.message&&I.message.includes("Illegal"))return{language:m,value:tt(h),illegal:!0,relevance:0,_illegalBy:{message:I.message,index:pe,context:h.slice(pe-100,pe+100),mode:I.mode,resultSoFar:Ke},_emitter:oe};if(a)return{language:m,value:tt(h),illegal:!1,relevance:0,errorRaised:I,_emitter:oe,_top:V};throw I}}function d(m){const h={value:tt(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return h._emitter.addText(m),h}function g(m,h){h=h||r.languages||Object.keys(t);const C=d(m),E=h.filter(P).filter($).map(N=>p(N,m,!1));E.unshift(C);const H=E.sort((N,K)=>{if(N.relevance!==K.relevance)return K.relevance-N.relevance;if(N.language&&K.language){if(P(N.language).supersetOf===K.language)return 1;if(P(K.language).supersetOf===N.language)return-1}return 0}),[L,W]=H,F=L;return F.secondBest=W,F}function b(m,h,C){const E=h&&n[h]||C;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function f(m){let h=null;const C=l(m);if(c(C))return;if(_("before:highlightElement",{el:m,language:C}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Ia("One of your code blocks includes unescaped HTML.",m.innerHTML);h=m;const E=h.textContent,H=C?u(E,{language:C,ignoreIllegals:!0}):g(E);m.innerHTML=H.value,b(m,C,H.language),m.result={language:H.language,re:H.relevance,relevance:H.relevance},H.secondBest&&(m.secondBest={language:H.secondBest.language,relevance:H.secondBest.relevance}),_("after:highlightElement",{el:m,result:H,text:E})}function v(m){r=Dt(r,m)}const x=()=>{k(),fe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function y(){k(),fe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function k(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function T(){S&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function B(m,h){let C=null;try{C=h(e)}catch(E){if(ge("Language definition for '{}' could not be registered.".replace("{}",m)),a)ge(E);else throw E;C=s}C.name||(C.name=m),t[m]=C,C.rawDefinition=h.bind(null,e),C.aliases&&O(C.aliases,{languageName:m})}function D(m){delete t[m];for(const h of Object.keys(n))n[h]===m&&delete n[h]}function M(){return Object.keys(t)}function P(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function O(m,{languageName:h}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=h})}function $(m){const h=P(m);return h&&!h.disableAutodetect}function j(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=h=>{m["before:highlightBlock"](Object.assign({block:h.el},h))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=h=>{m["after:highlightBlock"](Object.assign({block:h.el},h))})}function R(m){j(m),o.push(m)}function G(m){const h=o.indexOf(m);h!==-1&&o.splice(h,1)}function _(m,h){const C=m;o.forEach(function(E){E[C]&&E[C](h)})}function w(m){return fe("10.7.0","highlightBlock will be removed entirely in v12.0"),fe("10.7.0","Please use highlightElement now."),f(m)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:k,highlightElement:f,highlightBlock:w,configure:v,initHighlighting:x,initHighlightingOnLoad:y,registerLanguage:B,unregisterLanguage:D,listLanguages:M,getLanguage:P,registerAliases:O,autoDetection:$,inherit:Dt,addPlugin:R,removePlugin:G}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Da,e.regex={concat:be,lookahead:Rt,either:ct,optional:Fo,anyNumberOfTimes:Go};for(const m in je)typeof je[m]=="object"&&zt(je[m]);return Object.assign(e,je),e},xe=Zt({});xe.newInstance=()=>Zt({});var Na=xe;xe.HighlightJS=xe;xe.default=xe;const Te=_o(Na),Mt="[A-Za-z$_][0-9A-Za-z$_]*",$a=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ba=["true","false","null","undefined","NaN","Infinity"],qt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Kt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Yt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Pa=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Oa=[].concat(Yt,qt,Kt);function Jt(e){const t=e.regex,n=(h,{after:C})=>{const E="</"+h[0].slice(1);return h.input.indexOf(E,C)!==-1},o=Mt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(h,C)=>{const E=h[0].length+h.index,H=h.input[E];if(H==="<"||H===","){C.ignoreMatch();return}H===">"&&(n(h,{after:E})||C.ignoreMatch());let L;const W=h.input.substring(E);if(L=W.match(/^\s*=/)){C.ignoreMatch();return}if((L=W.match(/^\s+extends\s+/))&&L.index===0){C.ignoreMatch();return}}},r={$pattern:Mt,keyword:$a,literal:Ba,built_in:Oa,"variable.language":Pa},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},y={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,b,f,v,{match:/\$\d+/},p];d.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const k=[].concat(y,d.contains),T=k.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(k)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:T},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...qt,...Kt]}},P={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(h){return t.concat("(?!",h.join("|"),")")}const R={match:t.concat(/\b/,j([...Yt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},G={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},_={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},w="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(w)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),P,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,b,f,v,y,{match:/\$\d+/},p,M,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[y,e.REGEXP_MODE,{className:"function",begin:w,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},G,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},R,$,D,_,{match:/\$[(.]/}]}}function La(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const za=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",Jt),Te.registerLanguage("sh",La),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function _a(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=za(e);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ie(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=X(r);return a({...p,class:A("paper",c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}function Qt(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),p=(v,x)=>{let y=null;return(...S)=>{a.clearTimeout(y),y=a.setTimeout(()=>v(...S),x)}},d=o`
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
  `,g=({value:v,id:x,children:y=[]})=>{const S=c({class:()=>u.val==x?"active":"",href:`#${x}`});return S.innerHTML=v,r({class:()=>u.val==x?"active":""},S,y.length>0&&s(y.map(g)))},b=v=>v.tagName.charAt(1),f=({contentEl:v})=>{const x=v.querySelectorAll(l);let y=2,S={},k={children:[]},T=k;const B=T;let D=[T];return[...x].forEach(M=>{const P=b(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(S={value:M.innerHTML,id:M.id??M.textContent,children:[]},y==P?(k=S,T.children.push(k)):y<P?(D.push(T),T=k,k.children.push(S),k=S):y>P&&(T=D[P-1],D=D.slice(0,P-1),T.children.push(S),k=S),y=P)}),B};return function(...x){let[{size:y=t.size??"md",variant:S=t.variant??"plain",color:k=t.color??"neutral",contentEl:T,...B}]=X(x);const D=f({contentEl:T}),M=p(()=>{const O=[...T.querySelectorAll(l)].find($=>{const{top:j,height:R}=$.getBoundingClientRect();if(j+R>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return i({...B,class:A("tableOfContent",y,S,k,d,t==null?void 0:t.class,B==null?void 0:B.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},D.children&&s(D.children.map(g)))}}const en=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(s(l(d??""),te.map(g=>l(g)))),i(wo.map(g=>s(l(g),te.map((b,f)=>r(p({color:b,variant:g},{index:f}))))))))}},Ra=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},So.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},U=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:p}=t.tags;Te.registerLanguage("javascript",Jt);const d=Qt(e),g=Ie(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),b=en(e),f=Ra(e),v=({text:x})=>u({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:y})=>{y.innerHTML=Te.highlight(x,{language:"js"}).value}}));return function(y){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(y.title),r(y.description),y.gridItem&&!y.variantColorTableDisable&&[c("Variant/Color"),g(b({Item:y.gridItem(e)}))],y.gridItem&&!y.variantSizeDisable&&[c("Size"),r("Component with size: ",p("sm"),", ",p("md"),", and ",p("lg")),g(f({item:y.gridItem}))],c("Usage"),l("Import"),v({text:y.importStatement}),c("Examples"),y.examples.map(k=>i(l(k.title),r(k.description),g(k.createComponent(e)({})),v({text:k.code}))));return o({class:n`
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
        `},S,d({contentEl:S}))}};function dt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: inherit;
      &::before {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::before {
        content: "\u203A";
        padding: 0.5rem;
      }
      &.open::before {
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:g=t.color??"neutral",Header:b,Content:f,close:v=!0,...x}]=X(u);const y=n.state(v);return a({...x,class:A("collapsible",p,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>A("header",f?y.val?"close":"open":""),onclick:S=>{y.val=!y.val,S.stopPropagation()}},b()),a({class:"content",role:"region",bauMounted:({element:S})=>{y.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:y}),!y.val)},f&&f()))}}const ja=()=>te.map(e=>`
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
      display: inline-flex;
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
    ${ja()}
  `;return function(...p){let[{size:d=t.size??"md",variant:g=t.variant??"plain",color:b=t.color??"neutral",data:f=[],...v}]=X(p);const x=n.state(""),y=dt(e,{size:d,variant:g,color:b}),S=T=>B=>{x.val==T?x.val="":x.val=T},k=T=>{const{Header:B,Content:D,name:M}=T,P=()=>r({class:()=>A(x.val==M&&"active")},c({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:$})=>x.val==M},B(T))),O=()=>a({id:`bau-${M}`,"data-state":({element:$})=>x.val==M},D(T));return s({class:A(b,g,d),onclick:S(M)},y({Header:P,Content:O}))};return a({class:A("accordion",l,t==null?void 0:t.class,v.class)},i(f.map(k)))}}const tn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=We(e,t);return r=>s({...r,data:i})},Ha=e=>{const{bau:t}=e,{div:n,p:o,section:a}=t.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],s=We(e);return()=>a(s({data:i,color:"neutral",variant:"outline"}))},Ua=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p, section } = bau.tags;

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
    section(
      Accordion({ data: accordionDefs, color: "neutral", variant: "outline" })
    );
};
`,nn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ga=e=>{const{css:t}=e,n=nn(e),o=We(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Fa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Va=e=>{const{css:t}=e,n=nn(e),o=We(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
`,Xa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Ua,createComponent:Ha},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Fa,createComponent:Ga},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Wa,createComponent:Va}],gridItem:tn},Za=e=>{const t=U(e);return()=>t(Xa)},qa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ka=()=>te.map(e=>`
&.alert {
  &.sm {
    & .icon {
      font-size: 1.3rem;
    }
  }
  &.lg {
    & .icon {
      font-size: 2.5rem;
    }
  }
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
`);function Me(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 0.5rem;
      font-size: 2rem;
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
    ${Ka()}
  `,r=q(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"outline",color:g=t.color??"neutral",onRemove:b,...f},...v]=X(u);return a({...f,class:A("alert",`alert-${d}`,t.class,d,g,p,s,f.class),role:"alert"},i({class:"icon"},qa[g]),a({class:"content"},...v),b&&c({onclick:b}))}}const on=(e,t)=>{const n=Me(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},Ya=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Me(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ja=`import alert from "@grucloud/bau-ui/alert";
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
`,Qa=e=>{const{css:t}=e,n=Me(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},er=`import alert from "@grucloud/bau-ui/alert";
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
`,tr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ja,createComponent:Ya},{title:"Custom Alert ",description:"A custom alert.",code:er,createComponent:Qa}],gridItem:on},nr=e=>{const t=U(e);return()=>t(tr)},or=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:g})=>{const b=c.val.findIndex(f=>f.id===d);b!=-1&&(c.val[b].status=g)};return function(g={},...b){const f=({id:y})=>{p({id:y,status:"removing"});const S=c.val.findIndex(k=>k.id===y);S!=-1&&c.val.splice(S,1)},v=({Component:y})=>{const S={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(S),setTimeout(()=>f(S),s)},x=y=>r({class:u.item,onclick:()=>f(y)},y.Component());return document.addEventListener("alert.add",y=>v(y.detail)),document.addEventListener("alert.remove",y=>f(y.detail)),r({class:A(u.stack,t==null?void 0:t.class,g.class)},n.loop(c,r(),x))}},ar=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=or(e,{deleteAfterDuration:2e4}),i=q(e),s=Me(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},rr=`import { Context } from "@grucloud/bau-ui/context";
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
`,sr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:rr,createComponent:ar}]},ir=e=>{const t=U(e);return()=>t(sr)},cr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ge(e),s=q(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},lr=`import animate from "@grucloud/bau-ui/animate";
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
`,ur=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ge(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},dr=`import animate from "@grucloud/bau-ui/animate";
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
`,pr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:lr,createComponent:cr},{title:"Component hide and show",description:"Hide and show a component",code:dr,createComponent:ur}]},mr=e=>{const t=U(e);return()=>t(pr)};function ye(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=a`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  `,r=o`
    background-color: var(--color-emphasis-200);
    position: relative;
    overflow: hidden;
    &::after {
      animation: 2s linear 0.5s infinite normal none running ${s};
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      content: "";
      position: absolute;
      transform: translateX(-100%);
      inset: 0px;
    }
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",...g},...b]=X(l);return i({...g,class:A("skeleton",u,r,t==null?void 0:t.class,g==null?void 0:g.class)},...b)}}function pt(e,t={}){const{bau:n,css:o}=e,{div:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},u=o`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    & img {
      visibility: hidden;
      opacity: 0;
      transition: opacity var(--transition-slow) ease-in;
    }
    & .visible {
      visibility: visible;
      opacity: 1;
    }
    & .hide {
      display: none;
    }
  `;return function(...d){let[{size:g=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",width:v=40,height:x=40,alt:y,...S},...k]=X(d);const T=ye(e,{class:A(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${v}px;
        `,t==null?void 0:t.class,S.class)});return a({class:A(u,t==null?void 0:t.class,S.class)},()=>s.val&&T(),()=>r.val&&y,i({width:v,height:x,onload:c,onerror:l,class:()=>A(!s.val&&"visible",r.val&&"hide",f,b,g,u,t==null?void 0:t.class,S.class),...S}))}}const an=(e,t)=>{const{css:n}=e,o=pt(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},gr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=pt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},br=`import avatar from "@grucloud/bau-ui/avatar";
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
`,hr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=pt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",alt:"My Avatar"}))},fr=`import avatar from "@grucloud/bau-ui/avatar";
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
        src: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",
        alt: "My Avatar",
      })
    );
};
`,vr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:br,createComponent:gr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:fr,createComponent:hr}],gridItem:an},xr=e=>{const t=U(e);return()=>t(vr)};function Xe(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ie(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...g},...b]=X(l);const f=y=>{x.style.opacity=1,x.showModal();const S=p.getBoundingClientRect(),k=x.getBoundingClientRect();S.x<a.innerWidth/2?x.style.left=S.left+"px":x.style.left=S.right-k.width+"px",S.y<a.innerHeight/2?x.style.top=S.top+S.height+"px":(x.style.top=Math.max(0,S.top-k.height)+"px",x.scrollHeight>S.top&&(x.style.height=S.top+"px"))},v=y=>{const S=()=>{x.close(),x.removeEventListener("transitionend",S)};x.addEventListener("transitionend",S),x.style.opacity=0},x=i({role:"presentation",class:A("popover",r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:y=>y.target===x&&(v(),d==null?void 0:d.call())},s(u));return x.closeDialog=v,x.openDialog=f,x}}const He={sm:12,md:16,lg:24},yr=()=>te.map(e=>`
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
`);function Se(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:p=t.color??"primary",variant:d=t.variant??"outline",visibility:g=!0,...b}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${He[u]};
      height: ${He[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${yr()}
    `;return i({class:{deps:[g],renderProp:()=>v=>A("spinner",f,p,d,v==!1?"":"visibility",t==null?void 0:t.class,b.class)},version:"1.1",x:"0px",y:"0px",width:He[u],height:He[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...b},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const wr=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ze(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
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
        overflow-y: scroll;
      }
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${wr()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:p=t.color??"neutral",label:d,placeholder:g,Option:b,options:f,defaultOption:v,getOptionLabel:x,getOptionValue:y,onSelect:S=()=>{},id:k,required:T,name:B,loading:D,...M},...P]=X(c);const O=Xe(e),$=q(e),j=le(e,{variant:u,color:p,size:l}),R=we(e),G=Se(e,{variant:u,color:p,size:l}),_=n.state(v),w=n.state(M.value),m=n.state(!1),h=n.state(0),C=()=>{m.val=!1},E=n.state(f),H=Y=>se=>Y.val&&x(se)==x(Y.val),L=()=>{de.openDialog(),m.val=!0,w.val="",E.val=f,h.val=f.findIndex(H(_));const Y=Ce.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),he.scrollIntoView({block:"end"}))},W=()=>{de.closeDialog(),m.val=!1,w.val="",h.val=0},F=Y=>{const{value:se}=Y.target;w.val=se,se?E.val=f.filter(ie=>x(ie).match(new RegExp(`${se}`,"i"))):E.val=f},N=Y=>{de.open?W():L()},K=({option:Y,index:se})=>ie=>{_.val=Y,h.val=se,W()},ne=()=>{const Y=Ce.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},ee=Y=>{switch(Y.key){case"Escape":W();break;case"ArrowDown":h.val<E.val.length-1?h.val++:h.val=0,ne();break;case"ArrowUp":h.val<=0?h.val=E.val.length-1:h.val--,ne();break;case"Enter":de.open?(_.val=E.val[h.val],w.val="",W()):L(),Y.preventDefault();break}},ae=$({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":m,"aria-label":d,onclick:N,variant:u,color:p,size:l,class:D==!0&&"loading",disabled:D},()=>_.val?x(_.val):d,()=>D==!0&&G({visibility:D})),he=j({value:w,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":m,oninput:F,onkeydown:ee,...M}),Le=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:w,required:T,name:B}),Ce=a({class:A(u,p,l,"content")},he,()=>R({class:A(u,p,l)},E.val.map((Y,se)=>i({class:()=>A(h.val==se&&"active",H(_)(Y)&&"selected"),onclick:K({option:Y,index:se})},b(Y))))),de=O({id:k,triggerEl:ae,contentEl:Ce,onClose:C,class:o`
        overflow: hidden;
      `});return a({...M,class:A("autocomplete",s,t==null?void 0:t.class,M==null?void 0:M.class)},n.bind({deps:[_],render:()=>Y=>{Y&&(Le.value=y(Y),S(Y))}}),ae,Le,de)}}const rn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ze(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Sr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ze(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Cr=`import { Context } from "@grucloud/bau-ui/context";
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
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Country",
        placeholder: "Search countries",
        id: "country",
      })
    );
};
`,Er=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ze(e),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(u.label),i(u.code));return()=>o(s({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},kr=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Autocomplete = autocomplete(context);

  const defaultCode = "AD";

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
        defaultOption: options.find(({ code }) => code == defaultCode),
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Country",
        placeholder: "Search countries",
        id: "country",
      })
    );
};
`,Tr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=q(e,{variant:"outline"}),r=Ze(e),c=t.state([]),l=t.state(!1),u=t.state("");async function p({url:b,transform:f=v=>v}){try{l.val=!0;const v=await fetch(b,{});if(v.ok){const x=await v.json();c.val=f(x)}else u.val=v.statusText}catch(v){u.val=v.message}finally{l.val=!1}}const d=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:b=>b.sort((f,v)=>f.name.common.localeCompare(v.name.common))});d();const g=b=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.flag),i(b.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionValue:({name:b})=>b.common,getOptionLabel:({name:b})=>b.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>d()},"Reload")))},Ar=`import { Context } from "@grucloud/bau-ui/context";
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
            getOptionValue: ({ name }: any) => name.common,
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
`,Dr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Cr,createComponent:Sr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ar,createComponent:Tr},{title:"Default Option",description:"A autocomplete with a default option.",code:kr,createComponent:Er}],gridItem:rn},Ir=e=>{const t=U(e);return()=>t(Dr)};function sn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:p,...d},...g]=X(r);return a({...d,class:A("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:A(u,l,c)},p),...g)}}const cn=(e,t)=>{const n=sn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o=sn(e);return()=>n(o({content:"10"},"☏"))},Nr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,$r={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Nr,createComponent:Mr}],gridItem:cn},Br=e=>{const t=U(e);return()=>t($r)};function mt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,{separator:c="〉"}=t,l=q(e),u=o`
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
  `;return function(...d){let[{size:g=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",items:v,...x},...y]=X(d);return i({...x,class:A(u,t==null?void 0:t.class,x==null?void 0:x.class)},v.map(({href:S,name:k})=>s((S?l:r)({href:`${a.base}${S}`,color:f,variant:b,size:g,class:A(f,b,g)},k))))}}const ln=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=mt(e,t);return a=>o({...a,...n})},Pr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=mt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},Or=`import { Context } from "@grucloud/bau-ui/context";
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
`,Lr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=mt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},zr=`import { Context } from "@grucloud/bau-ui/context";
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
`,_r={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Or,createComponent:Pr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:zr,createComponent:Lr}],gridItem:ln},Rr=e=>{const t=U(e);return()=>t(_r)},un=(e,t={})=>{const n=q(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},jr=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Hr=`import button from "@grucloud/bau-ui/button";
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
`,Ur=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Gr=`import button from "@grucloud/bau-ui/button";
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
`,Fr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Hr,createComponent:jr},{title:"Disabled Button",description:"A disabled button.",code:Gr,createComponent:Ur}],gridItem:un},Vr=e=>{const t=U(e);return()=>t(Fr)},Wr=()=>te.map(e=>`
&.button-group.${e} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}) !important;
  }
  & .button:not(:first-child) { 
    border-left: 1px solid var(--color-${e}) !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function gt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-flex;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    & .button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & .button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${Wr()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=X(r);return a({...p,class:A("button-group",l,u,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const dn=(e,t)=>{const n=["ONE","TWO","THREE"],o=q(e,t),a=gt(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Xr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=q(e),i=gt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Zr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,qr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Zr,createComponent:Xr}],gridItem:dn},Kr=e=>{const t=U(e);return()=>t(qr)};function pn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>te.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d},...g]=X(c);return a({...d,type:"date",class:A("calendar",s,p,u,l,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}const mn=(e,t)=>{const n=pn(e,t);return o=>n({...o})},Yr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=pn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Jr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Qr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Jr,createComponent:Yr}],gridItem:mn},es=e=>{const t=U(e);return()=>t(Qr)};function ts(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",slides:d,Slide:g,Previous:b,Next:f,...v}]=X(c);const x=()=>{s.val<=0?s.val=d.length-1:s.val--},y=()=>{s.val>=d.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},d.map(g));return a({...v,class:A("carousel",l,i,t==null?void 0:t.class,v==null?void 0:v.class)},a({class:A("control","control-previous"),onclick:x},b()),a({class:A("control","control-next"),onclick:y},f()),S)}}const ns=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],os=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=q(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=ts(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:ns,Slide:s,Previous:c,Next:l}))},as=`import carousel from "@grucloud/bau-ui/carousel";
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
`,rs={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:as,createComponent:os}]},ss=e=>{const t=U(e);return()=>t(rs)},gn=(e,t)=>{const n=Fe(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},is=e=>{const{bau:t}=e,{section:n}=t.tags,o=Fe(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},cs=`import chip from "@grucloud/bau-ui/chip";
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
`,ls={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:cs,createComponent:is}],gridItem:gn},us=e=>{const t=U(e);return()=>t(ls)};function bn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=X(r);return a({type:"checkbox",required:"required",...p,class:A(i,u,l,c,t==null?void 0:t.class,p==null?void 0:p.class)})}}const hn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=bn(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},ds=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=bn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},ps=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,ms={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:ps,createComponent:ds}],gridItem:hn},gs=e=>{const t=U(e);return()=>t(ms)},bs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=dt(e),i=q(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},hs=`import button from "@grucloud/bau-ui/button";
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
`,fs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:hs,createComponent:bs}]},vs=e=>{const t=U(e);return()=>t(fs)};function xs(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: flex;
    align-items: center;
    .content {
      margin: 1rem;
      font-weight: 400;
      font-size: 0.875rem;
    }
    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 0px;
      border-top: 1px solid var(--color-emphasis-200);
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=X(r);return a({...p,class:A("divider",c,i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:"content"},...d))}}const ys=e=>{const{bau:t}=e,{section:n}=t.tags,o=xs(e);return()=>n(o("OR"))},ws=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Ss={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:ws,createComponent:ys}],variantColorTableDisable:!0,variantSizeDisable:!0},Cs=e=>{const t=U(e);return()=>t(Ss)};function Es(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:p,...d},...g]=X(r);return a({class:A(i,t==null?void 0:t.class,d.class)},a({class:()=>A("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>A("content",p.val&&"content-open")},g))}}const ks=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Es(e),s=q(e),r=Lt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Ts=`import drawer from "@grucloud/bau-ui/drawer";
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
`,As={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ts,createComponent:ks}]},Ds=e=>{const t=U(e);return()=>t(As)},Is=()=>te.map(e=>`
`).join(`
`);function fn(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=q(e),r=Xe(e),c=we(e),l=o`
    ${Is()}
  `;return function(...p){let[{size:d=t.size??"md",variant:g=t.variant??"outline",color:b=t.color??"neutral",label:f,ListItem:v,items:x,...y},...S]=X(p);const k=n.state(0),T=()=>{R.openDialog(),R.focus()},B=()=>{R.closeDialog()},D=()=>{R.open?B():T()},M=G=>{D(),G.preventDefault()},P=({item:G,index:_})=>w=>{k.val=_,B(),w.preventDefault()},O=G=>{switch(G.preventDefault(),G.key){case"Escape":B();break;case"ArrowDown":k.val<options.length-1?k.val++:k.val=0;break;case"ArrowUp":k.val<=0?k.val=options.length-1:k.val--;break;case"Enter":D();break}},$=()=>c({tabindex:"0",class:A(b,g)},x.map((G,_)=>i({class:()=>A(k.val==_&&"active"),onclick:P({item:G,index:_})},v(G)))),j=s({type:"button",onclick:M,color:b,variant:g,size:d},f),R=r({triggerEl:j,contentEl:$()});return a({...y,class:A("dropdownMenu",b,d,l,t==null?void 0:t.class,y==null?void 0:y.class),onkeydown:O},j,R)}}const Ms=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,i=fn(e,t),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>i({...c,items:s,ListItem:r,label:"Action"})},Ns=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,i=fn(e),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(i({items:s,ListItem:r,label:"Action"}))},$s=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div, span } = bau.tags;

  const DropdownMenu = dropdownMenu(context);

  const items = [
    { label: "List" },
    {
      label: "Plan",
    },
    { label: "Apply" },
  ];

  const ListItem = (option: any) =>
    div(
      {
        onclick: () => {
          alert(\`click  \${option.label}\`);
        },
      },
      span(option.label)
    );

  return () =>
    section(
      DropdownMenu({
        items,
        ListItem,
        label: "Action",
      })
    );
};
`,Bs={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:$s,createComponent:Ns}],gridItem:Ms},Ps=e=>{const t=U(e);return()=>t(Bs)},vn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=rt(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Os=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=rt(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Ls=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,zs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Ls,createComponent:Os}],gridItem:(e,t)=>vn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},_s=e=>{const t=U(e);return()=>t(zs)};function xn(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:p=t.size??"md",variant:d=t.variant??"outline",color:g=t.color??"neutral",Component:b,disabled:f,...v}=l;return a({class:A(r.base,f&&r.disabled,t==null?void 0:t.class,l.class)},i({class:A(d,g,p)},b({disabled:f}),s({type:"file",disabled:f,...v})))}}const yn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),p=xn(e,t),d=b=>{const f=b.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:b})=>c({class:A(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return b=>p({Component:g,name:"file",accept:"text/*",onchange:d,...b})},Rs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),p=xn(e),d=b=>{const f=b.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:b})=>c({class:A(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:g,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},js=`import classNames from "@grucloud/bau-css/classNames";
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
`,Hs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:js,createComponent:Rs}],gridItem:yn},Us=e=>{const t=U(e);return()=>t(Hs)};function Ne(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;

    & > header {
      & h1 {
        line-height: 0;
        font-size: 1.3rem;
      }
    }
    & section {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
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
    & footer {
      display: flex;
      gap: 1rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:p,...d},...g]=X(r);return a({...d,class:A("form",u,l,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...g)}}function bt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",loading:g,...b},...f]=X(l);const v=q(e),x=Se(e);return n.bind({deps:[g],render:()=>y=>v({...b,class:A("loadingButton",u,p,d,r,y&&"loading",t==null?void 0:t.class,b==null?void 0:b.class)},x({size:u,variant:p,color:d,visibility:y}),i({class:y&&"loading"},f))})}}const Gs=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=bt(e),p=Me(e,{variant:"outline",color:"danger"}),d=le(e),g=Ne(e,{class:n`
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),b=Ie(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:v=()=>{}}){const x=t.state(!1),y=t.state("");return b(g({onsubmit:async k=>{k.preventDefault();const{username:T,password:B}=Object.fromEntries(new FormData(k.target.closest("form")));try{x.val=!0;const D=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:T,password:B})});if(D.ok){const M=await D.json();v(M)}else D.status==401?y.val="Invalid username or password":y.val=D.statusText}catch(D){y.val=D.message}finally{x.val=!1}}},s(c({width:"100",height:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>y.val&&p(y.val),r("Email",d({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",d({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:x},"Login"))))}},Fs=`import form from "@grucloud/bau-ui/form";
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
      event.preventDefault();
      const { username, password } = Object.fromEntries(
        new FormData(event.target.closest("form"))
      );
      try {
        loadingState.val = true;
        const response = await fetch("/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
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
          img({ width: "100", height: "100", src: \`\${config.base}/gc.svg\` }),
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
`,Vs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:i,footer:s}=t.tags,r=Ne(e),c=q(e,{variant:"solid",color:"primary"}),l=le(e);return function({onSubmitted:p=()=>{}}){return r({onsubmit:async g=>{g.preventDefault();const b=Object.fromEntries(new FormData(g.target.closest("form")));alert(JSON.stringify(b)),p(b)}},a(o("Form with input")),n(i("Branch",l({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),s(c({type:"submit"},"Click")))}},Ws=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, label, footer } = bau.tags;

  const Form = form(context);
  const Button = button(context, { variant: "solid", color: "primary" });
  const Input = input(context);

  return function SimpleForm({ onSubmitted = () => {} }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(
        new FormData(event.target.closest("form"))
      );
      alert(JSON.stringify(payload));
      onSubmitted(payload);
    };

    return Form(
      { onsubmit },
      header(h1("Form with input")),
      section(
        label(
          "Branch",
          Input({
            autofocus: true,
            placeholder: "Branch",
            name: "branch",
            required: true,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Click"))
    );
  };
};
`,Xs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:i,footer:s,em:r,span:c}=t.tags,l=t.state(""),u=t.derive(()=>l.val!=="Delete"),p=Ne(e),d=q(e,{variant:"solid",color:"primary"}),g=le(e);return function({onSubmitted:f=()=>{}}){return p({onsubmit:async x=>{x.preventDefault(),f()}},a(o("Delete Protection")),n(i(c("Type ",r("Delete")," to confirm the destruction of the resource."),g({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:l,oninput:x=>l.val=x.target.value}))),s(d({type:"submit",disabled:u},"Delete")))}},Zs=`import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, label, footer, em, span } = bau.tags;

  const inputState = bau.state("");
  const disabledState = bau.derive(() => inputState.val !== "Delete");

  const Form = form(context);
  const Button = button(context, { variant: "solid", color: "primary" });
  const Input = input(context);

  return function SimpleForm({ onSubmitted = () => {} }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      onSubmitted();
    };

    return Form(
      { onsubmit },
      header(h1("Delete Protection")),
      section(
        label(
          span(
            "Type ",
            em("Delete"),
            " to confirm the destruction of the resource."
          ),
          Input({
            autofocus: true,
            placeholder: "Type 'Delete'",
            name: "check",
            required: true,
            value: inputState,
            oninput: (event: any) => (inputState.val = event.target.value),
          })
        )
      ),
      footer(Button({ type: "submit", disabled: disabledState }, "Delete"))
    );
  };
};
`,qs={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Ws,createComponent:Vs},{title:"Form with state",description:"A form with input state and a dervied state.",code:Zs,createComponent:Xs},{title:"Login page",description:"A login page.",code:Fs,createComponent:Gs}]},Ks=e=>{const t=U(e);return()=>t(qs)},wn=(e,t={})=>{const n=le(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Ys=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=le(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Js=`import input from "@grucloud/bau-ui/input";
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
`,Qs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Js,createComponent:Ys}],gridItem:wn},ei=e=>{const t=U(e);return()=>t(Qs)},Sn=(e,t={})=>{const n=st(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},ti=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=st(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},ni=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,oi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:ni,createComponent:ti}],gridItem:Sn},ai=e=>{const t=U(e);return()=>t(oi)};function Cn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>te.map(l=>`
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
  `;return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:g=t.color??"neutral",running:b,...f}]=X(u);return i({...f,role:"progressbar",class:{deps:[b],renderProp:()=>v=>A("linearProgress",p,g,c,v&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const En=(e,t)=>{const n=Cn(e,t);return o=>n({...o,running:!0})},ri=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=q(e),i=Cn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},si=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ii={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:si,createComponent:ri}],gridItem:En},ci=e=>{const t=U(e);return()=>t(ii)},kn=(e,t)=>{const n=bt(e,t);return o=>n({...o,loading:!0},"Save")},li=e=>{const{bau:t}=e,{section:n}=t.tags,o=bt(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},ui=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,di={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:ui,createComponent:li}],gridItem:kn},pi=e=>{const t=U(e);return()=>t(di)},mi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],gi=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=we(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},mi.map(r))},bi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],hi=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=we(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},bi.map(r)))},fi=`import list from "@grucloud/bau-ui/list";
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
`,vi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:fi,createComponent:hi}],gridItem:gi},xi=e=>{const t=U(e);return()=>t(vi)};function Tn(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
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

    ${(()=>te.map(c=>`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",...g},...b]=X(l);return a({class:A("modal",r,d,p,u,t==null?void 0:t.class,g==null?void 0:g.class)},i(...b))}}const An=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=q(e),c=Tn(e),l=()=>o(Array(10).fill("").map((p,d)=>s(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(r({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},yi=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=q(e),l=Tn(e),u=()=>o(Array(10).fill("").map((d,g)=>s(g+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},wi=`import modal from "@grucloud/bau-ui/modal";
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
`,Si={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:wi,createComponent:yi}],gridItem:An},Ci=e=>{const t=U(e);return()=>t(Si)},Ei=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=q(e),r=Xe(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},ki=`import popover from "@grucloud/bau-ui/popover";
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
`,Ti={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:ki,createComponent:Ei}]},Ai=e=>{const t=U(e);return()=>t(Ti)};function Di(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:p})=>({name:d,label:g,href:b})=>s({href:`${a.base}${b}`},r({class:"sublabel"},p),i({class:`label ${p}`},g??d));return function(...d){let[{size:g=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",data:v={},...x}]=X(d);const{next:y,previous:S}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...x,class:A("paginationNavigation",g,l,t==null?void 0:t.class,x==null?void 0:x.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(y==null?void 0:y.href)&&u({text:"Next"})(y))}}const Ii=e=>{const{bau:t}=e,{section:n}=t.tags,o=Di(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Mi=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Ni={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Mi,createComponent:Ii}]},$i=e=>{const t=U(e);return()=>t(Ni)},Bi=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ie(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},Pi=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ie(e);return()=>n(a({size:"md"},o("My content")))},Oi=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Li={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Oi,createComponent:Pi}],variantColorTableDisable:!0,gridItem:Bi},zi=e=>{const t=U(e);return()=>t(Li)};function Dn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>te.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
  `).join(`
`))()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d}]=X(c);return a({...d,type:"radio",class:A("radio-button",l,p,u,s,t==null?void 0:t.class,d==null?void 0:d.class)})}}const In=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Dn(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},_i=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Dn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},Ri=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,ji={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Ri,createComponent:_i}],gridItem:In},Hi=e=>{const t=U(e);return()=>t(ji)},Ui=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function $e(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=q(e),l=Xe(e),u=we(e),p=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    ${Ui()}
  `;return function(...g){let[{size:b=t.size??"md",variant:f=t.variant??"outline",color:v=t.color??"neutral",label:x,Option:y,options:S,defaultOption:k,getOptionLabel:T,getOptionValue:B,onSelect:D=()=>{},loading:M,...P},...O]=X(g);const $=Se(e,{variant:f,color:v,size:b}),j=n.state(k?T(k):x),R=n.state(!1),G=n.state(0),_=()=>{W.openDialog(),W.focus(),R.val=!0},w=()=>{W.closeDialog(),R.val=!1},m=()=>{R.val=!1},h=N=>{W.open?w():_(),N.preventDefault()},C=({option:N,index:K})=>ne=>{j.val=T(N),F.value=B(N),F.setCustomValidity(""),G.val=K,w(),D(N),ne.preventDefault()},E=N=>{switch(N.preventDefault(),N.key){case"Escape":w();break;case"ArrowDown":G.val<S.length-1?G.val++:G.val=0;break;case"ArrowUp":G.val<=0?G.val=S.length-1:G.val--;break;case"Enter":W.open?(j.val=T(S[G.val]),F.value=B(r),w()):_();break}},H=()=>u({tabindex:"0",class:A(v,f)},S.map((N,K)=>i({class:()=>A(G.val==K&&"active"),onclick:C({option:N,index:K})},y(N)))),L=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":R,"aria-label":x,onclick:h,color:v,variant:f,size:b,class:M==!0&&"loading",disabled:M},()=>!j.val&&x,j,()=>M==!0&&$({visibility:M})),W=l({triggerEl:L,contentEl:H(),onClose:m}),F=s(P,r({value:""},"--Select Category--"),S.map(N=>r({value:B(N)},T(N))));return F.value=P.value,a({...P,class:A("select",v,b,p,t==null?void 0:t.class,P==null?void 0:P.class),onkeydown:E},F,L,W)}}const Mn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=$e(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Gi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=$e(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Fi=`import select from "@grucloud/bau-ui/select";
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
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Select a country...",
      })
    );
};
`,Vi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=$e(e),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(u.label),i(u.code));return()=>o(s({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},Wi=`import select from "@grucloud/bau-ui/select";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Select = select(context);

  const defaultCode = "AD";

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
        defaultOption: options.find(({ code }) => code == defaultCode),
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Select a country...",
      })
    );
};
`,Xi=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=$e(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionValue:r=>r,getOptionLabel:r=>r}))},Zi=`import select from "@grucloud/bau-ui/select";
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
        getOptionValue: (label: any) => label,
        getOptionLabel: (label: any) => label,
      })
    );
};
`,qi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=q(e,{variant:"outline"}),r=$e(e),c=t.state([]),l=t.state(!1),u=t.state("");async function p({url:b,transform:f=v=>v}){try{l.val=!0;const v=await fetch(b,{});if(v.ok){const x=await v.json();c.val=f(x)}else u.val=v.statusText}catch(v){u.val=v.message}finally{l.val=!1}}const d=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:b=>b.sort((f,v)=>f.name.common.localeCompare(v.name.common))});d();const g=b=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.flag),i(b.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionValue:({name:b})=>b.common,getOptionLabel:({name:b})=>b.common,label:"Country",id:"country",loading:l.val}),s({onclick:()=>d()},"Reload")))},Ki=`import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const Select = select(context);

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
          Select({
            options: dataState.val,
            Option,
            getOptionValue: ({ name }: any) => name.common,
            getOptionLabel: ({ name }: any) => name.common,
            label: "Country",
            id: "country",
            loading: loadingState.val,
          }),
        Button({ onclick: () => fetchCountries() }, "Reload")
      )
    );
};
`,Yi={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Fi,createComponent:Gi},{title:"Default Option",description:"Select with a default option",code:Wi,createComponent:Vi},{title:"Select AWS region",description:"Select the AWS region",code:Zi,createComponent:Xi},{title:"Loading Indicator",description:"Select with a loading indicator",code:Ki,createComponent:qi}],gridItem:Mn},Ji=e=>{const t=U(e);return()=>t(Yi)};function Nn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...p},...d]=X(r);return a({...p,class:A("select-native",u,c,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},d)}}const $n=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Nn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},Qi=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Nn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},ec=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,tc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:ec,createComponent:Qi}],gridItem:$n},nc=e=>{const t=U(e);return()=>t(tc)},oc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=ye(e),s=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},i({class:n`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        `}),new Array(4).fill("").map(()=>i({class:n`
            border-radius: 5px;
            width: 100%;
            height: 2rem;
          `})));return()=>o(s())},ac=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const Skeleton = skeleton(context);
  const CardSkeleton = () =>
    div(
      {
        class: css\`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        \`,
      },
      Skeleton({
        class: css\`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        \`,
      }),
      new Array(4).fill("").map(() =>
        Skeleton({
          class: css\`
            border-radius: 5px;
            width: 100%;
            height: 2rem;
          \`,
        })
      )
    );

  return () => section(CardSkeleton());
};
`,rc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=ye(e),s=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},new Array(4).fill("").map(()=>a({class:n`
              display: flex;
              gap: 1rem;
              align-items: center;
            `},i({class:n`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            `}),i({class:n`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            `}))));return()=>o(s())},sc=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const Skeleton = skeleton(context);
  const ListSkeleton = () =>
    div(
      {
        class: css\`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        \`,
      },
      new Array(4).fill("").map(() =>
        div(
          {
            class: css\`
              display: flex;
              gap: 1rem;
              align-items: center;
            \`,
          },
          Skeleton({
            class: css\`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            \`,
          }),
          Skeleton({
            class: css\`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            \`,
          })
        )
      )
    );

  return () => section(ListSkeleton());
};
`,ic=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:i,tr:s,td:r}=t.tags,c=ye(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),l=()=>a(i(new Array(8).fill("").map(()=>s(r(c({class:n`
                  width: 5rem;
                `})),r(c()),r(c()),r(c()),r(c({class:n`
                  width: 20rem;
                `}))))));return()=>o(l())},cc=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, table, tbody, tr, td } = bau.tags;

  const Skeleton = skeleton(context, {
    class: css\`
      height: 2rem;
      width: 10rem;
    \`,
  });

  const TableSkeleton = () =>
    table(
      tbody(
        new Array(8).fill("").map(() =>
          tr(
            td(
              Skeleton({
                class: css\`
                  width: 5rem;
                \`,
              })
            ),
            td(Skeleton()),
            td(Skeleton()),
            td(Skeleton()),
            td(
              Skeleton({
                class: css\`
                  width: 20rem;
                \`,
              })
            )
          )
        )
      )
    );

  return () => section(TableSkeleton());
};
`,lc=e=>{const{bau:t,css:n}=e,{section:o,header:a,span:i,article:s}=t.tags,r=n`
    display: flex;
    flex-direction: column;
    & header {
      display: inline-flex;
      justify-content: flex-start;
      gap: 2rem;
      padding: 1rem;
    }
    & article > div {
      min-height: 600px;
    }
  `,c=ye(e,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),l=ye(e);function u({columnsSize:p=4}){return o({class:r},a(new Array(p).fill("").map(()=>c(i("1")))),s(l("")))}return()=>o(u({columnsSize:3}))},uc=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, header, span, article } = bau.tags;

  const className = css\`
    display: flex;
    flex-direction: column;
    & header {
      display: inline-flex;
      justify-content: flex-start;
      gap: 2rem;
      padding: 1rem;
    }
    & article > div {
      min-height: 600px;
    }
  \`;

  const Skeleton = skeleton(context, {
    class: css\`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    \`,
  });

  const SkeletonContent = skeleton(context);
  function TabsSkeleton({ columnsSize = 4 }) {
    return section(
      {
        class: className,
      },
      header(new Array(columnsSize).fill("").map(() => Skeleton(span("1")))),
      article(SkeletonContent(""))
    );
  }

  return () => section(TabsSkeleton({ columnsSize: 3 }));
};
`,dc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:ac,createComponent:oc},{title:"List",description:"A list skeleton.",code:sc,createComponent:rc},{title:"Table",description:"A table skeleton.",code:cc,createComponent:ic},{title:"Tabs",description:"A tabs skeleton.",code:uc,createComponent:lc}],variantColorTableDisable:!0,variantSizeDisable:!0},pc=e=>{const t=U(e);return()=>t(dc)};function qe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>te.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d},...g]=X(c);return a({...d,type:"range",class:A("slider",p,u,l,s,t==null?void 0:t.class,d.class)},...g)}}const Bn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=qe(e);return i=>a({...i,oninput:o})},mc=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=qe(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},gc=`import slider from "@grucloud/bau-ui/slider";
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
`,bc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=qe(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},hc=`import slider from "@grucloud/bau-ui/slider";
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
`,fc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=qe(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},vc=`import slider from "@grucloud/bau-ui/slider";
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
`,xc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:gc,createComponent:mc},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:hc,createComponent:bc},{title:"Vertical Mark",description:"A vertical slider with marks.",code:vc,createComponent:fc}],gridItem:Bn},yc=e=>{const t=U(e);return()=>t(xc)},Pn=(e,t)=>{const n=Se(e,t);return o=>n({...o})},wc=e=>{const{bau:t}=e,{section:n}=t.tags,o=q(e),a=Se(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},Sc=`import spinner from "@grucloud/bau-ui/spinner";
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
`,Cc={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Sc,createComponent:wc}],gridItem:Pn},Ec=e=>{const t=U(e);return()=>t(Cc)},kc=()=>te.map(e=>"").join(`
`),On=(e,t)=>(n,o)=>{const a=new URLSearchParams(e.window.location.search);return a.delete(t),a.append(t,n),o&&Object.entries(o).map(([i,s])=>(a.delete(i),a.append(i,s))),`?${a.toString()}`};function Ln(e,t={}){const{bau:n,css:o,window:a}=e,{div:i,ul:s,li:r,span:c,section:l}=n.tags,u=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      gap: 1rem;
      list-style: none;
      & > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        flex-grow: 0;
        padding: 0.5rem;
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
    ${kc()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...d){let[{color:g,variant:b="plain",size:f,stepperDefs:v=[],stepperName:x,activeStepIndex:y=n.state(0),...S},...k]=X(d);const T=n.state(v.map(($,j)=>({...$,index:j}))),B=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:($,j,R)=>{$.apply(j,R);const G=R[2]??"";console.log("stepper pushState ",G),["?","#"].includes(G[0])&&O()}});const D=n.derive(()=>T.val[y.val]),M=$=>{const{Header:j,disabled:R,name:G,index:_}=$;return r({class:()=>A(D.val.name==G&&"active",y.val<_&&"not-completed",y.val>_&&"completed",R&&"disabled")},c({class:"step-number"},_+1),c({class:"step-label"},()=>j($)))},P=$=>v.findIndex(({name:j})=>j==$.name),O=()=>{const j=new URLSearchParams(a.location.search).get(x)??v[0].name,R=Math.max(v.findIndex(({name:G})=>G==j),0);R<y.val&&(console.log("remove last step"),B.val.pop()),B.val.some(({name:G})=>j==G)||(console.log("add new step"),B.val.push(v[R])),y.val=R};return O(),i({bauMounted:({element:$})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:A("stepper",b,f,g,u,t==null?void 0:t.class,S.class)},n.loop(T,s(),M),n.loop(B,l(),$=>i({class:()=>A("content",$.name==D.val.name&&"visible")},$.Content({nextStep:v[P($)+1],previousStep:v[P($)-1]}))))}}const Nt="my-wizard",Tc=e=>{const{bau:t,window:n}=e,{footer:o,p:a,label:i,section:s,a:r,ul:c,li:l}=t.tags,u=le(e),p=Ne(e),d=Ln(e),g=On(e,Nt),b=q(e,{variant:"outline",color:"primary"}),f=q(e,{variant:"solid",color:"primary"}),v=({nextStep:S})=>k=>{k.preventDefault();const{organization:T}=k.target.elements;n.history.pushState("","",g(S.name,{organization:T.value}))},x=S=>{var D;S.preventDefault();const{organization:k}=(D=n.document.forms)==null?void 0:D.formStep1.elements,B=new URLSearchParams(n.location.search).get("choice");alert(`organization ${k.value}, choice:${B}`)},y=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>p({onsubmit:v({nextStep:S}),id:"formStep1"},i("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:k})=>p(c(l(r({href:g(S.name,{choice:"choice1"})},"Choice 1")),l(r({href:g(S.name,{choice:"choice2"})},"Choice 2"))),o(b({href:g(k.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>p({onsubmit:x},a("My stepper 3 Content"),o(b({href:g(S.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>s(d({stepperDefs:y,stepperName:Nt}))},Ac=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";

const stepperName = "my-wizard";

export default (context: Context) => {
  const { bau, window } = context;
  const { footer, p, label, section, a, ul, li } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const Stepper = stepper(context);
  const nextUrl = NextUrl(context, stepperName);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const ButtonNext = button(context, {
    variant: "solid",
    color: "primary",
  });

  const onsubmitStep1 =
    ({ nextStep }: any) =>
    (event: any) => {
      event.preventDefault();
      const { organization } = event.target.elements;
      window.history.pushState(
        "",
        "",
        nextUrl(nextStep.name, { organization: organization.value })
      );
    };

  const onsubmitStep3 = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const { organization } = window.document.forms?.formStep1.elements;
    const search = new URLSearchParams(window.location.search);
    const choice = search.get("choice");
    alert(\`organization \${organization.value}, choice:\${choice}\`);
  };

  const stepperDefs: StepperPage[] = [
    {
      name: "step1",
      Header: () => "Step 1",
      Content: ({ nextStep }: any) =>
        Form(
          { onsubmit: onsubmitStep1({ nextStep }), id: "formStep1" },
          label(
            "Organization",
            Input({
              autofocus: true,
              placeholder: "Organization",
              name: "organization",
            })
          ),
          footer(ButtonNext({ type: "submit" }, "Next: "))
        ),
    },
    {
      name: "step2",
      Header: () => "Step 2",
      Content: ({ nextStep, previousStep }: any) =>
        Form(
          ul(
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice1" }) },
                "Choice 1"
              )
            ),
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice2" }) },
                "Choice 2"
              )
            )
          ),
          footer(
            ButtonPrevious({ href: nextUrl(previousStep.name) }, "Previous")
          )
        ),
    },
    {
      name: "step3",
      Header: () => "Step 3",
      Content: ({ previousStep }: any) =>
        Form(
          { onsubmit: onsubmitStep3 },
          p("My stepper 3 Content"),
          footer(
            ButtonPrevious(
              { href: nextUrl(previousStep.name) },
              "Previous: Step 2"
            ),
            ButtonNext({ type: "submit" }, "Save")
          )
        ),
    },
  ];

  return () => section(Stepper({ stepperDefs, stepperName }));
};
`,$t="stepper-vertical",Dc=e=>{const{bau:t,window:n,css:o}=e,{footer:a,p:i,label:s,section:r,a:c,ul:l,li:u}=t.tags,p=le(e),d=Ne(e),g=Ln(e,{class:o`
      &.stepper {
        flex-direction: row;
        & > ul {
          flex-direction: column;
          & > li {
            flex-direction: row;
            gap: 0.5rem;
            justify-content: space-around;
          }
        }
      }
    `}),b=On(e,$t),f=q(e,{variant:"outline",color:"primary"}),v=q(e,{variant:"solid",color:"primary"}),x=({nextStep:k})=>T=>{T.preventDefault();const{organization:B}=T.target.elements;n.history.pushState("","",b(k.name,{organization:B.value}))},y=k=>{var M;k.preventDefault();const{organization:T}=(M=n.document.forms)==null?void 0:M.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${T.value}, choice:${D}`)},S=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:k})=>d({onsubmit:x({nextStep:k}),id:"formStep1"},s("Organization",p({autofocus:!0,placeholder:"Organization",name:"organization"})),a(v({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:k,previousStep:T})=>d(l(u(c({href:b(k.name,{choice:"choice1"})},"Choice 1")),u(c({href:b(k.name,{choice:"choice2"})},"Choice 2"))),a(f({href:b(T.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:k})=>d({onsubmit:y},i("My stepper 3 Content"),a(f({href:b(k.name)},"Previous: Step 2"),v({type:"submit"},"Save")))}];return()=>r(g({stepperDefs:S,stepperName:$t}))},Ic=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";

const stepperName = "stepper-vertical";

export default (context: Context) => {
  const { bau, window, css } = context;
  const { footer, p, label, section, a, ul, li } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const Stepper = stepper(context, {
    class: css\`
      &.stepper {
        flex-direction: row;
        & > ul {
          flex-direction: column;
          & > li {
            flex-direction: row;
            gap: 0.5rem;
            justify-content: space-around;
          }
        }
      }
    \`,
  });
  const nextUrl = NextUrl(context, stepperName);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const ButtonNext = button(context, {
    variant: "solid",
    color: "primary",
  });

  const onsubmitStep1 =
    ({ nextStep }: any) =>
    (event: any) => {
      event.preventDefault();
      const { organization } = event.target.elements;
      window.history.pushState(
        "",
        "",
        nextUrl(nextStep.name, { organization: organization.value })
      );
    };

  const onsubmitStep3 = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const { organization } = window.document.forms?.formStep1.elements;
    const search = new URLSearchParams(window.location.search);
    const choice = search.get("choice");
    alert(\`organization \${organization.value}, choice:\${choice}\`);
  };

  const stepperDefs: StepperPage[] = [
    {
      name: "step1",
      Header: () => "Step 1",
      Content: ({ nextStep }: any) =>
        Form(
          { onsubmit: onsubmitStep1({ nextStep }), id: "formStep1" },
          label(
            "Organization",
            Input({
              autofocus: true,
              placeholder: "Organization",
              name: "organization",
            })
          ),
          footer(ButtonNext({ type: "submit" }, "Next: "))
        ),
    },
    {
      name: "step2",
      Header: () => "Step 2",
      Content: ({ nextStep, previousStep }: any) =>
        Form(
          ul(
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice1" }) },
                "Choice 1"
              )
            ),
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice2" }) },
                "Choice 2"
              )
            )
          ),
          footer(
            ButtonPrevious({ href: nextUrl(previousStep.name) }, "Previous")
          )
        ),
    },
    {
      name: "step3",
      Header: () => "Step 3",
      Content: ({ previousStep }: any) =>
        Form(
          { onsubmit: onsubmitStep3 },
          p("My stepper 3 Content"),
          footer(
            ButtonPrevious(
              { href: nextUrl(previousStep.name) },
              "Previous: Step 2"
            ),
            ButtonNext({ type: "submit" }, "Save")
          )
        ),
    },
  ];

  return () => section(Stepper({ stepperDefs, stepperName }));
};
`,Mc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:Ac,createComponent:Tc},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:Ic,createComponent:Dc}]},Nc=e=>{const t=U(e);return()=>t(Mc)},$c=()=>te.map(e=>`
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
`);function zn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${$c()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=X(r);return a({...p,class:A("switch",i,u,l,c,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const _n=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=zn(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Bc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=zn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Pc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Oc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Pc,createComponent:Bc}],gridItem:_n},Lc=e=>{const t=U(e);return()=>t(Oc)},zc=()=>te.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Be(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:i}=t,{div:s,ul:r,li:c,a:l}=n.tags,u=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      margin: 0;
      list-style: none;
      & li {
        & > a {
          color: inherit;
          text-decoration: none;
        }
        text-align: center;
        padding: 0.5rem 1rem 0 1rem;
        color: inherit;
        cursor: pointer;
        font-weight: var(--font-weight-semibold);
        transition: var(--transition-fast) ease-in-out;
        overflow: hidden;
        &:hover {
          color: var(--color-primary-light);
          background-color: var(--color-emphasis-200);
          &::after {
            transform: translateY(0%);
          }
        }
        &::after {
          transition: var(--transition-fast) ease-in-out;
          transform: translateY(100%);
          background: var(--color-primary-light);
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
        pointer-events: none;
        transform: none;
        &:hover {
          border: none;
        }
      }
    }
    ${zc()}
  `;return function(...d){let[{size:g=t.size??"md",variant:b=t.variant??"outline",color:f=t.color??"neutral",tabsName:v="tabs",...x},...y]=X(d);const S=n.state(i),k=O=>S.val.find($=>$.name==O),T=n.state(i[0]),B=()=>{var R,G;const $=new URLSearchParams(a.location.search).get(v)??i[0].name,j=k($);(R=T.val.exit)==null||R.call(),T.val=j,(G=j.enter)==null||G.call()};B(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,$,j)=>{O.apply($,j);const R=j[2]??"";["?","#"].includes(R[0])&&B()}});const D=O=>{const $=new URLSearchParams(a.location.search);return $.delete(v),$.append(v,O),`?${$.toString()}`},M=O=>{const{Header:$,disabled:j,name:R}=O;return c({class:()=>A(T.val.name==R&&"active",j&&"disabled")},l({href:D(R)},$(O)))},P=s({class:A("tabs",b,g,f,u,t==null?void 0:t.class,x.class),bauMounted:({element:O})=>{a.addEventListener("popstate",B)},bauUnmounted:()=>{a.removeEventListener("popstate",B)}},n.loop(S,r(),M),n.bind({deps:[T],render:()=>({Content:O})=>O?O(x):""}));return P.addEventListener("tab.add",O=>{var j;const{tab:$}=O.detail;(j=$.enter)==null||j.call(),S.val.push($)},!1),P.addEventListener("tab.remove",O=>{var j;const $=S.val.findIndex(R=>R.name==O.detail.tabName);$>0&&((j=S.val[$].exit)==null||j.call(),S.val.splice($,1))},!1),P}}const Rn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=Be(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB 1"),Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},_c=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}],variant:"outline",color:"neutral"});return()=>i({tabsName:"my-tab"})},Rc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => div("TAB 1"),
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => div("TAB 2"),
      Content: () => div(p("My tab 2 Content")),
    },
  ];

  const Tabs = tabs(context, {
    tabDefs,
    variant: "outline",
    color: "neutral",
  });

  return () => Tabs({ tabsName: "my-tab" });
};
`,jc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},Hc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,jn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Uc=e=>{const{css:t}=e,n=Be(e,{tabDefs:jn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Gc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Fc=e=>{const{css:t}=e,n=jn(e),o=Be(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Vc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Wc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Rc,createComponent:_c},{title:"Extended Tabs",description:"An extended tabs.",code:Hc,createComponent:jc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Gc,createComponent:Uc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Vc,createComponent:Fc}],gridItem:Rn},Xc=e=>{const t=U(e);return()=>t(Wc)};function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=X(c);return i({...l,class:A("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Zc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function p(v,x,y,S,k){return{name:v,calories:x,fat:y,carbs:S,protein:k}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],g=({name:v,calories:x})=>s(i(v),i({class:n`
            text-align: right;
          `},x)),b=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Pe(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),b(),l(d.map(g)))))},qc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ee(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Kc=[Ee("Frozen yoghurt",159,6,24,4),Ee("Ice cream sandwich",237,9,37,4.3),Ee("Eclair",262,16,24,6),Ee("Cupcake",305,3.7,67,4.3),Ee("Gingerbread",356,16,49,3.9)],Yc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:b,calories:f})=>s(i(b),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pe(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),d(),l(Kc.map(p)))))},Jc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Qc=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],el=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:b,calories:f})=>s(i(b),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pe(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),d(),l(Qc.map(p)))))},tl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,nl={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:qc,createComponent:Zc},{title:"Dense",description:"A dense table.",code:Jc,createComponent:Yc},{title:"Zebra",description:"A zebra table.",code:tl,createComponent:el}]},ol=e=>{const t=U(e);return()=>t(nl)},al=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=Qt(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},rl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,sl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:rl,createComponent:al}]},il=e=>{const t=U(e);return()=>t(sl)};function Hn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=gt(e),s=q(e),r=Se(e),c=o`
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
  `,l=({label:b,icon:f,...v})=>s({"aria-label":b,title:b,...v},f),u=({count:b,totalCount:f,page:v,rowsPerPage:x})=>a({class:"pages-numbers"},Number(v-1)*Number(x)+(b>0?1:0),"-",Math.min(v*x,f)," of ",f),p=({count:b,page:f,rowsPerPage:v})=>a({class:"pages-numbers"},(f-1)*v+(b>0?1:0),"-",f*v),d=b=>b<=1,g=(b,f,v)=>b>=Math.ceil(f/v);return function(...f){let[{size:v=t.size??"md",variant:x=t.variant??"outline",color:y=t.color??"neutral",count:S=0,totalCount:k=0,page:T=1,rowsPerPage:B=50,onPageChange:D,isLoading:M=!1,disableFirst:P=()=>d(T),disablePrevious:O=()=>d(T),disableNext:$=()=>g(T,k,B),disableLast:j=()=>g(T,k,B),...R},...G]=X(f);const _=Math.max(0,Math.ceil(k/B)),w=D({page:1}),m=D({page:T-1}),h=D({page:T+1}),C=D({page:_}),E=[{label:"First",icon:"⟪",onclick:w,disabled:P()},{label:"Previous",icon:"⟨",onclick:m,disabled:O()},{label:"Next",icon:"⟩",onclick:h,disabled:$()},{label:"Last",icon:"⟫",onclick:C,disabled:j()}];return a({...R,class:A("table-pagination",c,M&&"disabled",t==null?void 0:t.class,R==null?void 0:R.class)},r({class:"spinner",visibility:M,size:"md"}),k>0?u({count:S,totalCount:k,page:T,maxPages:_,rowsPerPage:B}):p({count:S,page:T,maxPages:_,rowsPerPage:B}),i({variant:x,color:y},E.map(H=>l({...H,variant:x,color:y}))))}}const cl=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),ll=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=cl(45),u=({name:y,email:S})=>i(a(y),a(S)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=Hn(e),g=Pe(e,{class:n`
      max-width: 650px;
    `}),b=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=t.derive(()=>b.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),x=({page:y})=>S=>{f.val.page=y};return()=>g(s(p(),()=>c(v.val.map(u))),()=>d({...f.val,onPageChange:x}))},ul=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),g=t.derive(()=>p.val.length),b=t.state(1),f=t.state(10),v=t.derive(()=>p.val),x=P=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(P).toString()}`,y=({page:P})=>O=>{b.val=P,S(x({page:P,per_page:f.val}))};S(x({page:1,per_page:f.val}));async function S(P){try{u.val=!0;const O=await fetch(P,{});if(O.ok){const $=await O.json();p.val=$;return}throw O}catch(O){d.val=O.message}finally{u.val=!1}}const k=({name:P,description:O,stargazers_count:$})=>i(a(P),a(O),a({class:n`
            text-align: right;
          `},$)),T=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),B=Hn(e),D=Pe(e,{class:n`
      min-width: 650px;
    `}),M=({message:P})=>l(P);return()=>D(()=>B({rowsPerPage:f.val,page:b.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:y,disableNext:()=>!1}),s(T(),()=>d.val&&M({message:d.val}),()=>c(v.val.map(k))))},dl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=ll(e),l=ul(e),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Oe(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:p=t.color??"neutral",selected:d=!1,disabled:g,onChange:b,...f},...v]=X(c);return i({type:"button",...f,"aria-pressed":{deps:[d],renderProp:()=>x=>x},class:{deps:[d],renderProp:()=>x=>A("toggle",l,p,u,s,x&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:g},v)}}const Un=(e,t)=>{const{bau:n}=e,o=Oe(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},pl=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},ml=`import toggle from "@grucloud/bau-ui/toggle";

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
`,gl={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:ml,createComponent:pl}],gridItem:Un},bl=e=>{const t=U(e);return()=>t(gl)},hl=()=>te.map(e=>`
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
`);function ht(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${hl()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:p=!1,onChange:d=()=>{},...g},...b]=X(r);const f=new Set,v=x=>{const{value:y}=x.target;p?(f.clear(),f.add(y)):f.has(y)?f.delete(y):f.add(y),d({event:x,values:[...f]})};return a({...g,class:A("toggle-group",c,u,l,i,t==null?void 0:t.class,g==null?void 0:g.class),onclick:v},...b)}}const Gn=(e,t)=>{const{bau:n}=e,o=ht(e,t),a=Oe(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},fl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=ht(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},vl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,xl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Oe(e),s=ht(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},yl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,wl={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:vl,createComponent:fl},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:yl,createComponent:xl}],gridItem:Gn},Sl=e=>{const t=U(e);return()=>t(wl)};function ft(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:p=t.size??"md",variant:d=t.variant??"outline",color:g=t.color??"neutral",...b},...f]=X(c);const v=i({class:A("container",...u.split("-"))},i({class:A("content",g,d,p),role:"tooltip"},l)),x=D=>`move-to-${D}`,y=(D,M,P)=>{if(D()){const O=x(M);v.classList.add(O),v.classList.add(M),v.classList.remove(P)}},S=(D,M)=>{const P=x(D);v.classList.contains(P)&&(v.classList.remove(P),v.classList.add(M),v.classList.remove(D))},k=D=>{const M=v.getBoundingClientRect();y(()=>M.x<0,"right","left"),y(()=>M.x+M.width>a.innerWidth,"left","right"),y(()=>M.y<0,"bottom","top"),y(()=>M.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},T=D=>{v.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...b,class:A("tooltip",s,t==null?void 0:t.class,b==null?void 0:b.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",k),D.addEventListener("mouseout",T)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",k),D.removeEventListener("mouseout",T)}},...f,v)}}const Fn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=q(e),r=ft(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Cl=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=q(e),s=ft(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},El=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,kl=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Fe(e,{variant:"outline",color:"primary"}),c=ft(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Tl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Al={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:El,createComponent:Cl},{title:"Grid",description:"Various tooltip position",code:Tl,createComponent:kl}],gridItem:Fn},Dl=e=>{const t=U(e);return()=>t(Al)},Vn=(e,t)=>{const n=at(e,t);return o=>n(o)},Il=e=>{const{bau:t}=e,{section:n}=t.tags,o=at(e);return()=>n(o({}))},Ml=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Nl={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Ml,createComponent:Il}],gridItem:Vn},$l=e=>{const t=U(e);return()=>t(Nl)},Bl=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Wn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Bl({css:o,createGlobalStyles:a}),p=dt(e),d=({depth:g=1,maxDepth:b,color:f,variant:v,size:x})=>y=>{const{children:S,expanded:k}=y,T=n.state(!k),B=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:M=>{S&&(T.val=!T.val)}},i(y.data)),D=()=>s({class:A(f,x)},S.map(d({depth:g+1,maxDepth:b})));return r(p({size:x,Header:B,Content:S&&g<b&&D}))};return function({tree:b,maxDepth:f=1/0,size:v=t.size??"md",variant:x=t.variant??"outline",color:y=t.color??"neutral",...S}){return c({class:A(u.nav,v,x,y,t==null?void 0:t.class,S.class)},b.children&&s(b.children.map(d({maxDepth:f,color:y,variant:x,size:v}))))}}const Xn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Wn(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},Pl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Wn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Ol=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Ll={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ol,createComponent:Pl}],gridItem:Xn},zl=e=>{const t=U(e);return()=>t(Ll)},_l=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=en(e),u=q(e),p=[{name:"Accordion",Item:tn(e)},{name:"Alert",Item:on(e)},{name:"Autocomplete",Item:rn(e)},{name:"Avatar",Item:an(e)},{name:"Badge",Item:cn(e)},{name:"Breadcrumbs",Item:ln(e)},{name:"Button",Item:un(e)},{name:"Button Group",Item:dn(e)},{name:"Calendar",Item:mn(e)},{name:"Checkbox",Item:hn(e)},{name:"Chip",Item:gn(e)},{name:"DrillDown Menu",Item:vn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:yn(e)},{name:"Input",Item:wn(e)},{name:"Input Search",Item:Sn(e)},{name:"Linear Progress",Item:En(e)},{name:"Loading Button",Item:kn(e)},{name:"Modal",Item:An(e)},{name:"Radio Button",Item:In(e)},{name:"Select",Item:Mn(e)},{name:"Select Native",Item:$n(e)},{name:"Slider",Item:Bn(e)},{name:"Spinner",Item:Pn(e)},{name:"Switch",Item:_n(e)},{name:"Tabs",Item:Rn(e)},{name:"Theme Switch",Item:Vn(e)},{name:"Toggle",Item:Un(e)},{name:"Toggle Group",Item:Gn(e)},{name:"Tooltip",Item:Fn(e)},{name:"Tree View",Item:Xn(e)}];return()=>o({class:n`
          overflow-y: scroll;
        `},i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},Rl=({context:e})=>{const t=_l(e);return[{path:"",action:n=>({title:"Bau UI",component:Po(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:_a(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Za(e)})},{path:"alert",action:()=>({title:"Alert",component:nr(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ir(e)})},{path:"animate",action:()=>({title:"Animate",component:mr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Ir(e)})},{path:"avatar",action:()=>({title:"Avatar",component:xr(e)})},{path:"badge",action:()=>({title:"Badge",component:Br(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Rr(e)})},{path:"button",action:()=>({title:"Button",component:Vr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Kr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:es(e)})},{path:"carousel",action:()=>({title:"Carousel",component:ss(e)})},{path:"chip",action:()=>({title:"Chip",component:us(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:gs(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:vs(e)})},{path:"divider",action:()=>({title:"Divider",component:Cs(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Ds(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Ps(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:_s(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Us(e)})},{path:"form",action:()=>({title:"Form",component:Ks(e)})},{path:"input",action:()=>({title:"Input",component:ei(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:ai(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ci(e)})},{path:"list",action:()=>({title:"List",component:xi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:pi(e)})},{path:"modal",action:()=>({title:"Modal",component:Ci(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:$i(e)})},{path:"paper",action:()=>({title:"Paper",component:zi(e)})},{path:"popover",action:()=>({title:"Popover",component:Ai(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Hi(e)})},{path:"select",action:()=>({title:"Select",component:Ji(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:nc(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:pc(e)})},{path:"slider",action:()=>({title:"Slider",component:yc(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Ec(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Nc(e)})},{path:"switch",action:()=>({title:"Switch",component:Lc(e)})},{path:"table",action:()=>({title:"Table",component:ol(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:il(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:dl(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Xc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:bl(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Sl(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Dl(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:$l(e)})},{path:"treeView",action:()=>({title:"Tree View",component:zl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:zo(e)})}]},jl=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Hl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:g=t}=l.resolve({pathname:u});s.val=d({}),document.title=`${p}`}},Ul=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};po();const Zn={title:"Bau",base:"/bau/bau-ui"},me=yo({config:Zn}),{bau:Gl}=me;me.states={drawerOpen:Gl.state(!0)};Ul(me);to({routes:Rl({context:me}),onLocationChange:Hl({context:me,LayoutDefault:Mo(me),config:Zn}),notFoundRoute:jl(me)});
