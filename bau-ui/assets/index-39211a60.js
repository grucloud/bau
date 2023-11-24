(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Yn=(e,t)=>({...e,paths:[...t,e.path]}),Ot=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Yn(o,e);return n?[a,...Ot({paths:[...e,o.path],routes:n})]:a}),Qn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},eo=({routes:e=[],notFoundRoute:t})=>{const n=Ot({routes:e}).map(o=>({...o,regex:Qn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function to({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const a=s=>{o={...s}},i=eo({routes:e,notFoundRoute:t});return window.addEventListener("popstate",s=>{o.pathname!=s.target.location.pathname&&n({router:i}),a(s.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(s,r,c)=>{s.apply(r,c),o.pathname!=window.location.pathname&&n({router:i}),a(window.location)}}),document.addEventListener("click",s=>{const{target:r}=s,c=r.closest("a");if(!c)return;const l=c.getAttribute("href");l&&!l.startsWith("http")&&!l.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",l),history.pushState({},null,l),a(window.location),["?","#"].includes(l[0])||window.scrollTo({top:0,left:0}),s.preventDefault())}),n({router:i}),i}const ot=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],no=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],oo=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],yt=e=>`var(--color-${e})`,ao=e=>`var(--color-${e}-lightest)`,ro=()=>ot.map(([e])=>`
.outline.${e} {
  border: 1px solid ${yt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ao(e)};
}
.solid.${e} {
  background-color: ${yt(e)};
}
`).join(`
`),so=()=>ot.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),io=e=>100-e*10,co=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${io(t)}%);`).join(`
`),wt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),lo=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...no.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...oo.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function uo({createGlobalStyles:e},{colorPalette:t=ot}={}){e`
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
      ${wt({})}
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
      --brightness-hover-reverse: 70% ${wt({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function po(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let at=e=>Object.prototype.toString.call(e??0).slice(8,-1),mo=e=>at(e)=="Object",St=e=>at(e)=="Function",et=e=>["Object","Array"].includes(at(e)),Ct=Object.getPrototypeOf,tt=e=>we(e)?e.val:e,we=e=>e==null?void 0:e.__isState,go=["splice","push","pop","shift","unshift","sort","reverse"],je=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const Z=e=>!we(e[0])&&mo(e[0])?e:[{},...e];function bo(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,g,v)=>{let C=r;r=g;let E=y(v);return r=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(g=>{var v;return(v=g.element)==null?void 0:v.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},p=(y,g,v,C,E,j)=>{var z;if(s){i.add(y);return}for(let V of y.bindings){let{deps:F,element:$,renderInferred:J,render:ne,renderItem:q}=V;if(q&&g)(z=b($,C,(...ee)=>h(q(...ee)),v,E,j)[g])==null||z.call();else{let ee=J?J({element:$}):ne({element:$,renderItem:q})(...F.map(tt));ee!==$&&$.replaceWith(V.element=h(ee))}}S(y),u()},d=(y,g,v=[])=>({get(C,E,j){var z;if(r==null||r.add(y),E==="_isProxy")return!0;if(!((z=C[E])!=null&&z._isProxy)&&!we(C[E])&&et(C[E]))C[E]=new Proxy(C[E],d(y,g,[...v,E]));else if(go.includes(E)){let V=C[E];return(...F)=>{let $=V.apply(C,F);return p(y,E,$,F,g,v),$}}return Reflect.get(C,E,j)},set(C,E,j,z){let V=Reflect.set(C,E,j,z);return p(y,"setItem",V,{prop:E,value:j},g,[...v,E]),V}}),m=(y,g)=>new Proxy(g,d(y,g)),b=(y,g,v,C,E,j)=>{let z=()=>y.replaceChildren(...je(C,v)),V=F=>y[F]&&y.removeChild(y[F]);return{assign:z,sort:z,reverse:z,setItem:()=>{var $;let F=j[0];($=y.children[F])==null||$.replaceWith(v(E[F],F))},push:()=>y.append(...je(g,(F,$)=>v(F,E.length+$))),unshift:()=>y.prepend(...je(g,v)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:F}=y.children;let[$,J=F,...ne]=g;for(let q=$>=0?Math.min($+J-1,F-1):F-1;q>=($>=0?$:F+$);q--)y.children[q].remove();if(ne.length){let q=ne.forEach((ee,se)=>v(ee,$+se));y.children[$]?y.children[$].after(...q):y.append(...q)}}}},f=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return r==null||r.add(g),g.valProxy??(g.valProxy=et(y)?m(g,y):y,g.valProxy)},set val(g){let v=this,C=v.val;et(g)?(v.valProxy=m(v,g),p(v,"assign",g)):g!==C&&(v.valProxy=g,p(v)),v.oldVal=C}}),h=y=>{if(y==null||y===!1){const g=c("span");return g.style.display="none",g}else return y.nodeType?y:n.createTextNode(y)},x=(y,g)=>{let v=new Set;return g.val=l(y,v),v},w=y=>{let g=f(),v=x(y,g);g.computed=!0;for(let C of v)C.listeners.push({computed:y,deps:v,state:g});return g},S=y=>{for(let g of[...y.listeners])x(g.computed,g.state)},k=(y,...g)=>{if(g.length){let v=[];for(let C of g.flat(1/0))C!=null&&v.push(we(C)?R({deps:[C],render:()=>E=>E}):St(C)?H({renderInferred:C}):h(C));y.append(...v)}},A={},B=(y,g)=>y&&(Object.getOwnPropertyDescriptor(y,g)??B(Ct(y),g)),T=(y,g,v)=>{var C;return A[y+","+g]??(A[y+","+g]=((C=B(v,g))==null?void 0:C.set)??0)},M=(y,g)=>new t.MutationObserver((v,C)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(j=>j===y&&(g({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),P=(y,g)=>new t.MutationObserver((v,C)=>v.forEach(E=>g({record:E,element:y}))).observe(y,{childList:!0}),O=y=>new Proxy(function(v,...C){var V;let[E,...j]=Z(C),z=y?n.createElementNS(y,v):c(v);for(let[F,$]of Object.entries(E)){if(F.startsWith("bau"))continue;let J=T(v,F,Ct(z))?ne=>ne!==void 0&&(z[F]=ne):ne=>z.setAttribute(F,ne);$==null||(we($)?R({deps:[$],render:()=>()=>(J($.val),z)}):St($)&&(!F.startsWith("on")||$.isDerived)?H({renderInferred:()=>(J($({element:z})),z)}):$.renderProp?R({deps:$.deps,render:()=>()=>(J($.renderProp({element:z})(...$.deps.map(tt))),z)}):J($))}return E.bauChildMutated&&P(z,E.bauChildMutated),k(z,...j),z.autofocus&&z.focus&&t.requestAnimationFrame(()=>z.focus()),(V=E.bauCreated)==null||V.call(E,{element:z}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:z})),E.bauUnmounted&&t.requestAnimationFrame(()=>M(z,E.bauUnmounted)),z},{get:(g,v)=>g.bind(void 0,v)}),N=(y,g,v)=>{y.element=h(v);for(let C of g)we(C)&&(a.add(C),C.bindings.push(y));return y.element},H=({renderInferred:y,element:g})=>{let v=new Set,C=l(y,v,{element:g});return N({renderInferred:y},v,C)},R=({deps:y,element:g,render:v,renderItem:C})=>N({deps:y,render:v,renderItem:C},y,v({element:g,renderItem:C})(...y.map(tt))),U=(y,g,v)=>R({deps:[y],render:({renderItem:C})=>E=>(g.append(...je(E,C)),g),renderItem:v}),L=y=>{s=!0,y(),s=!1,i.forEach(p),i.clear()};return{tags:O(),tagsNS:O,state:f,bind:R,loop:U,derive:w,stateSet:a,batch:L}}const ho=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},fo=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},vo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function xo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=vo(a,i),r=ho(s);return!t.getElementById(r)&&fo(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function yo(e){const t=bo(),n=xo();return uo(n),{bau:t,...n,tr:o=>o,window,...e}}function D(...e){return e.filter(t=>t).join(" ")}function Ve(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:D("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!s()||d.getAttribute("cloned"))return;const m=d.cloneNode(!0);m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=d.getAttribute("width"),m.style.height=d.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),u.target.appendChild(m),m.addEventListener("animationend",()=>{var b;return(b=m.parentNode)==null?void 0:b.removeChild(m)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const m=d.getBoundingClientRect();if(d.setAttribute("width",m.width+"px"),d.setAttribute("height",m.height+"px"),r()){d.style.animation=r();const b=()=>{d.removeEventListener("animationend",b),d.style.animation=""};d.addEventListener("animationend",b)}})},...c},l)}}const oe=["neutral","primary","success","danger","warning"],wo=["plain","outline","solid"],So=["sm","md","lg"],Co=()=>oe.map(e=>`
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
`);function X(e,t={}){const{bau:n,css:o}=e,a=o`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
      min-width: 2rem;
      min-height: 2rem;
    }
    &.lg {
      padding: 0.4rem 2rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }
    & i {
      font-style: normal;
    }
    ${Co()}
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...p},...d]=Z(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...p,class:D("button",t.class,c,r,l,a,p.class),href:u},d)}}const Eo="light",ko=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function rt(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Eo);const l=o`
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
  `;return function(...p){let[{size:d=t.size??"md",variant:m=t.variant??"plain",color:b=t.color??"neutral",...f},...h]=Z(p);return i({required:"required",title:"Switch Theme",...f,class:D("theme-switch",b,m,d,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:r()=="dark",onclick:x=>{s(x.target.checked?"dark":"light")}},...h)}}function Ao(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:p,b:d,ul:m,li:b}=n.tags,{svg:f,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,w=X(e,{class:o`
      background: transparent;
    `}),S=rt(e),k=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},w({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},k()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(t("Bau UI")))),B=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),w({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},A(),B())}}function To({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:p}=t.tags,d=({links:f,title:h})=>o({class:n`
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
        `},p(h),r(f.map(({href:x,name:w})=>c(s({href:x},w))))),m=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],b=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},d({title:"Bau UI",links:m}),d({title:"Bau Ecosystem",links:b})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.60.1"),i("MIT license")))}}function he(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=Z(r);return a({...p,class:D("list",i,u,l,c,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const He="0.3s",Pt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(Pt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},Lt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Lt(e)(t.children[o]);if(a)return a}},Do=({keyframes:e})=>({hideToLeft:e`
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
   `});function st(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=L=>{var y;return((y=L.parentTree.data)==null?void 0:y.href)??L.parentTree.children[0].data.href},u=({variant:L,color:y,size:g,currentTree:v,data:C})=>S(T({variant:L,color:y,size:g,href:`${c}${l(v)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:L,color:y,size:g,href:`${c}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),p=({size:L,subTree:{data:{name:y,href:g},children:v=[]}})=>T({size:L,href:`${c}${g}`,"data-ischild":!v.length},y),d=({pathname:L,subTree:y})=>{var g;return L===((g=y==null?void 0:y.data)==null?void 0:g.href)},{renderHeader:m=u,renderMenuItem:b=p,isActive:f=d}=t,{li:h,nav:x,div:w,header:S,a:k}=n.tags,A=Ve(e),B=he(e),T=X(e,{class:o`
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
  `,N=({children:L,pathnameState:y,variant:g,color:v,size:C})=>B({class:D(g,v,C)},L.map(E=>h({class:()=>D(E.children&&"has-children",f({pathname:y.val,subTree:E})&&"active")},b({variant:g,color:v,size:C,subTree:E})))),H=({variant:L,color:y,size:g,currentTree:v,pathnameState:C})=>{const{children:E,parentTree:j,data:z,renderList:V}=v;return w({class:D("drillDownMenu",L,y,g)},j&&m({variant:L,color:y,size:g,data:z,currentTree:v}),E&&V?V({renderListDefault:N,children:E,pathnameState:C,variant:L,color:y,size:g}):N({children:E,pathnameState:C,variant:L,color:y,size:g}))},R=({tree:L,pathname:y})=>{let g=Pt({})({...L}),v=Lt(y)(g);return v||(v=g),v},U=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",L=>{const{target:y}=L,g=y.getAttribute("href");if(y.tagName==="A"&&g&&!g.startsWith("http")&&!g.startsWith("#")&&!g.startsWith("?")){let v=g.replace(c,"");r||(v=v.replace(y.hash,"")),U.val=v}}),function(y){const{size:g=t.size??"md",variant:v=t.variant??"plain",color:C=t.color??"neutral",tree:E,...j}=y;let z,V=n.derive(()=>(z=R({tree:E,pathname:U.val}),z)),F=1;const $=q=>{const{dataset:ee}=q.target;ee.buttonback=="true"?F=-1:ee.ischild=="false"?F=1:ee.ischild=="true"&&(F=0)},J=q=>{switch(q){case 1:return`${M} ${He}`;case-1:return`${P} ${He}`;default:return""}},ne=q=>{switch(q){case 1:return`${P} ${He} reverse`;case-1:return`${M} ${He} reverse`;default:return""}};return x({class:D(O,v,C,g,t==null?void 0:t.class,j.class),onclick:$},A({animationHide:()=>J(F),animationShow:()=>ne(F)},n.bind({deps:[V],render:()=>()=>H({variant:v,color:C,size:g,currentTree:z,pathnameState:U})})))}}const Mo=()=>oe.map(e=>`
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
`);function ue(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Mo()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:D("input",t.class,t.size??"md",l,c,i,u.class)})}}function it(e,t={}){const{bau:n,css:o,window:a}=e,i=ue(e,t);return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r,d=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,m=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${d};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return i({type:"search",...u,color:l,variant:c,class:D("inputSearch",t.class,m,u.class)})}}function zt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:p,span:d}=n.tags,m=it(e,{variant:"plain",color:"neutral",size:"sm"}),f={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:w,children:S,pathnameState:k,variant:A,color:B,size:T})=>{const M=n.state(""),P=n.derive(()=>M.val==""?S:S.filter(N=>N.data.name.match(new RegExp(`${M.val}`,"i")))),O=N=>{M.val=N.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},m({autocomplete:!1,name:"search",autofocus:!0,value:M,placeholder:`Search ${P.val.length} components`,size:22,oninput:O}),()=>w({children:P.val,pathnameState:k,variant:A,color:B,size:T}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let h=!1;const x=st(e);return function(){return r({bauMounted:({element:S})=>{s.innerWidth<=640&&(h=!0,i.drawerOpen.val=!1)},onclick:S=>{h&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:D(o`
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
          `)},x({tree:f}))}}const Io=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ve(e),r=Ao(e),c=zt(e),l=To(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(d="")=>`${u} ease-in-out 0.5s ${d}`;return function({componentState:m}){return i({class:n`
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
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>m.val),l())}};function Ie(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
      padding: 0rem 0.4rem;
    }
    &.md {
      padding: 0.2rem 0.5rem;
    }
    &.lg {
      padding: 0.3rem 1rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:p,...d},...m]=Z(r);return a({...d,onclick:p,class:D("chip",t.class,c,l,u,p&&"clickable",i,d.class)},...m)}}function No(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;X(e);const c=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Bo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:m,size:b})=>r({class:n`
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
                  var(--color-success) ${b/d*100}%
                );
                justify-content: flex-end;
                width: ${b/d*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},b)));return function({data:m=[]}){return o({class:n`
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
          `},m.map(p({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Oo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=No(e),l=$o(e),u=X(e);Ie(e);const p=Bo(e),d=(...x)=>a({class:n`
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
          `},...x)),m=n``,b=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],h=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:m},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:b}),h())}}function Po(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const Lo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Po(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function zo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Lo(e)()))}}function _o(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function _t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&_t(n)}),e}class Et{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Rt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Ro="</span>",kt=e=>!!e.scope,jo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Ho{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Rt(t)}openNode(t){if(!kt(t))return;const n=jo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){kt(t)&&(this.buffer+=Ro)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const At=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class ct{constructor(){this.rootNode=At(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=At({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{ct._collapse(n)}))}}class Uo extends ct{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Ho(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function De(e){return e?typeof e=="string"?e:e.source:null}function jt(e){return fe("(?=",e,")")}function Go(e){return fe("(?:",e,")*")}function Fo(e){return fe("(?:",e,")?")}function fe(...e){return e.map(n=>De(n)).join("")}function Vo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function lt(...e){return"("+(Vo(e).capture?"":"?:")+e.map(o=>De(o)).join("|")+")"}function Ht(e){return new RegExp(e.toString()+"|").exec("").length-1}function Wo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Xo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ut(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=De(o),s="";for(;i.length>0;){const r=Xo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Zo=/\b\B/,Ut="[a-zA-Z]\\w*",dt="[a-zA-Z_]\\w*",Gt="\\b\\d+(\\.\\d+)?",Ft="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Vt="\\b(0b[01]+)",qo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=fe(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Me={begin:"\\\\[\\s\\S]",relevance:0},Jo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Me]},Yo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Me]},Qo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},We=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=lt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:fe(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ea=We("//","$"),ta=We("/\\*","\\*/"),na=We("#","$"),oa={scope:"number",begin:Gt,relevance:0},aa={scope:"number",begin:Ft,relevance:0},ra={scope:"number",begin:Vt,relevance:0},sa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Me,{begin:/\[/,end:/\]/,relevance:0,contains:[Me]}]}]},ia={scope:"title",begin:Ut,relevance:0},ca={scope:"title",begin:dt,relevance:0},la={begin:"\\.\\s*"+dt,relevance:0},ua=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ue=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Zo,IDENT_RE:Ut,UNDERSCORE_IDENT_RE:dt,NUMBER_RE:Gt,C_NUMBER_RE:Ft,BINARY_NUMBER_RE:Vt,RE_STARTERS_RE:qo,SHEBANG:Ko,BACKSLASH_ESCAPE:Me,APOS_STRING_MODE:Jo,QUOTE_STRING_MODE:Yo,PHRASAL_WORDS_MODE:Qo,COMMENT:We,C_LINE_COMMENT_MODE:ea,C_BLOCK_COMMENT_MODE:ta,HASH_COMMENT_MODE:na,NUMBER_MODE:oa,C_NUMBER_MODE:aa,BINARY_NUMBER_MODE:ra,REGEXP_MODE:sa,TITLE_MODE:ia,UNDERSCORE_TITLE_MODE:ca,METHOD_GUARD:la,END_SAME_AS_BEGIN:ua});function da(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function pa(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ma(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=da,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ga(e,t){Array.isArray(e.illegal)&&(e.illegal=lt(...e.illegal))}function ba(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ha(e,t){e.relevance===void 0&&(e.relevance=1)}const fa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=fe(n.beforeMatch,jt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},va=["of","and","for","in","not","or","if","then","parent","list","value"],xa="keyword";function Wt(e,t,n=xa){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Wt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ya(c[0],c[1])]})}}function ya(e,t){return t?Number(t):wa(e)?0:1}function wa(e){return va.includes(e.toLowerCase())}const Tt={},be=e=>{console.error(e)},Dt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ye=(e,t)=>{Tt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Tt[`${e}/${t}`]=!0)},Fe=new Error;function Xt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=Ht(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function Sa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw be("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Fe;if(typeof e.beginScope!="object"||e.beginScope===null)throw be("beginScope must be object"),Fe;Xt(e,e.begin,{key:"beginScope"}),e.begin=ut(e.begin,{joinWith:""})}}function Ca(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw be("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Fe;if(typeof e.endScope!="object"||e.endScope===null)throw be("endScope must be object"),Fe;Xt(e,e.end,{key:"endScope"}),e.end=ut(e.end,{joinWith:""})}}function Ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ka(e){Ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Sa(e),Ca(e)}function Aa(e){function t(s,r){return new RegExp(De(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Ht(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(ut(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[pa,ba,ka,fa].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ma,ga,ha].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Wt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=De(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Ta(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Zt(e){return e?e.endsWithParent||Zt(e.starts):!1}function Ta(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Zt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var Da="11.8.0";class Ma extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const nt=Rt,Mt=de,It=Symbol("nomatch"),Ia=7,qt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Uo};function c(g){return r.noHighlightRe.test(g)}function l(g){let v=g.className+" ";v+=g.parentNode?g.parentNode.className:"";const C=r.languageDetectRe.exec(v);if(C){const E=P(C[1]);return E||(Dt(i.replace("{}",C[1])),Dt("Falling back to no-highlight mode for this block.",g)),E?C[1]:"no-highlight"}return v.split(/\s+/).find(E=>c(E)||P(E))}function u(g,v,C){let E="",j="";typeof v=="object"?(E=g,C=v.ignoreIllegals,j=v.language):(ye("10.7.0","highlight(lang, code, ...args) has been deprecated."),ye("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),j=g,E=v),C===void 0&&(C=!0);const z={code:E,language:j};L("before:highlight",z);const V=z.result?z.result:p(z.language,z.code,C);return V.code=z.code,L("after:highlight",V),V}function p(g,v,C,E){const j=Object.create(null);function z(I,_){return I.keywords[_]}function V(){if(!W.keywords){ae.addText(te);return}let I=0;W.keywordPatternRe.lastIndex=0;let _=W.keywordPatternRe.exec(te),K="";for(;_;){K+=te.substring(I,_.index);const Q=ce.case_insensitive?_[0].toLowerCase():_[0],re=z(W,Q);if(re){const[le,Kn]=re;if(ae.addText(K),K="",j[Q]=(j[Q]||0)+1,j[Q]<=Ia&&(Re+=Kn),le.startsWith("_"))K+=_[0];else{const Jn=ce.classNameAliases[le]||le;J(_[0],Jn)}}else K+=_[0];I=W.keywordPatternRe.lastIndex,_=W.keywordPatternRe.exec(te)}K+=te.substring(I),ae.addText(K)}function F(){if(te==="")return;let I=null;if(typeof W.subLanguage=="string"){if(!t[W.subLanguage]){ae.addText(te);return}I=p(W.subLanguage,te,!0,xt[W.subLanguage]),xt[W.subLanguage]=I._top}else I=m(te,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(Re+=I.relevance),ae.__addSublanguage(I._emitter,I.language)}function $(){W.subLanguage!=null?F():V(),te=""}function J(I,_){I!==""&&(ae.startScope(_),ae.addText(I),ae.endScope())}function ne(I,_){let K=1;const Q=_.length-1;for(;K<=Q;){if(!I._emit[K]){K++;continue}const re=ce.classNameAliases[I[K]]||I[K],le=_[K];re?J(le,re):(te=le,V(),te=""),K++}}function q(I,_){return I.scope&&typeof I.scope=="string"&&ae.openNode(ce.classNameAliases[I.scope]||I.scope),I.beginScope&&(I.beginScope._wrap?(J(te,ce.classNameAliases[I.beginScope._wrap]||I.beginScope._wrap),te=""):I.beginScope._multi&&(ne(I.beginScope,_),te="")),W=Object.create(I,{parent:{value:W}}),W}function ee(I,_,K){let Q=Wo(I.endRe,K);if(Q){if(I["on:end"]){const re=new Et(I);I["on:end"](_,re),re.isMatchIgnored&&(Q=!1)}if(Q){for(;I.endsParent&&I.parent;)I=I.parent;return I}}if(I.endsWithParent)return ee(I.parent,_,K)}function se(I){return W.matcher.regexIndex===0?(te+=I[0],1):(Qe=!0,0)}function xe(I){const _=I[0],K=I.rule,Q=new Et(K),re=[K.__beforeBegin,K["on:begin"]];for(const le of re)if(le&&(le(I,Q),Q.isMatchIgnored))return se(_);return K.skip?te+=_:(K.excludeBegin&&(te+=_),$(),!K.returnBegin&&!K.excludeBegin&&(te=_)),q(K,I),K.returnBegin?0:_.length}function Ee(I){const _=I[0],K=v.substring(I.index),Q=ee(W,I,K);if(!Q)return It;const re=W;W.endScope&&W.endScope._wrap?($(),J(_,W.endScope._wrap)):W.endScope&&W.endScope._multi?($(),ne(W.endScope,I)):re.skip?te+=_:(re.returnEnd||re.excludeEnd||(te+=_),$(),re.excludeEnd&&(te=_));do W.scope&&ae.closeNode(),!W.skip&&!W.subLanguage&&(Re+=W.relevance),W=W.parent;while(W!==Q.parent);return Q.starts&&q(Q.starts,I),re.returnEnd?0:_.length}function pe(){const I=[];for(let _=W;_!==ce;_=_.parent)_.scope&&I.unshift(_.scope);I.forEach(_=>ae.openNode(_))}let Y={};function ie(I,_){const K=_&&_[0];if(te+=I,K==null)return $(),0;if(Y.type==="begin"&&_.type==="end"&&Y.index===_.index&&K===""){if(te+=v.slice(_.index,_.index+1),!a){const Q=new Error(`0 width match regex (${g})`);throw Q.languageName=g,Q.badRule=Y.rule,Q}return 1}if(Y=_,_.type==="begin")return xe(_);if(_.type==="illegal"&&!C){const Q=new Error('Illegal lexeme "'+K+'" for mode "'+(W.scope||"<unnamed>")+'"');throw Q.mode=W,Q}else if(_.type==="end"){const Q=Ee(_);if(Q!==It)return Q}if(_.type==="illegal"&&K==="")return 1;if(Ye>1e5&&Ye>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return te+=K,K.length}const ce=P(g);if(!ce)throw be(i.replace("{}",g)),new Error('Unknown language: "'+g+'"');const qn=Aa(ce);let Je="",W=E||qn;const xt={},ae=new r.__emitter(r);pe();let te="",Re=0,me=0,Ye=0,Qe=!1;try{if(ce.__emitTokens)ce.__emitTokens(v,ae);else{for(W.matcher.considerAll();;){Ye++,Qe?Qe=!1:W.matcher.considerAll(),W.matcher.lastIndex=me;const I=W.matcher.exec(v);if(!I)break;const _=v.substring(me,I.index),K=ie(_,I);me=I.index+K}ie(v.substring(me))}return ae.finalize(),Je=ae.toHTML(),{language:g,value:Je,relevance:Re,illegal:!1,_emitter:ae,_top:W}}catch(I){if(I.message&&I.message.includes("Illegal"))return{language:g,value:nt(v),illegal:!0,relevance:0,_illegalBy:{message:I.message,index:me,context:v.slice(me-100,me+100),mode:I.mode,resultSoFar:Je},_emitter:ae};if(a)return{language:g,value:nt(v),illegal:!1,relevance:0,errorRaised:I,_emitter:ae,_top:W};throw I}}function d(g){const v={value:nt(g),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return v._emitter.addText(g),v}function m(g,v){v=v||r.languages||Object.keys(t);const C=d(g),E=v.filter(P).filter(N).map($=>p($,g,!1));E.unshift(C);const j=E.sort(($,J)=>{if($.relevance!==J.relevance)return J.relevance-$.relevance;if($.language&&J.language){if(P($.language).supersetOf===J.language)return 1;if(P(J.language).supersetOf===$.language)return-1}return 0}),[z,V]=j,F=z;return F.secondBest=V,F}function b(g,v,C){const E=v&&n[v]||C;g.classList.add("hljs"),g.classList.add(`language-${E}`)}function f(g){let v=null;const C=l(g);if(c(C))return;if(L("before:highlightElement",{el:g,language:C}),g.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),r.throwUnescapedHTML))throw new Ma("One of your code blocks includes unescaped HTML.",g.innerHTML);v=g;const E=v.textContent,j=C?u(E,{language:C,ignoreIllegals:!0}):m(E);g.innerHTML=j.value,b(g,C,j.language),g.result={language:j.language,re:j.relevance,relevance:j.relevance},j.secondBest&&(g.secondBest={language:j.secondBest.language,relevance:j.secondBest.relevance}),L("after:highlightElement",{el:g,result:j,text:E})}function h(g){r=Mt(r,g)}const x=()=>{k(),ye("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function w(){k(),ye("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function k(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function A(){S&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function B(g,v){let C=null;try{C=v(e)}catch(E){if(be("Language definition for '{}' could not be registered.".replace("{}",g)),a)be(E);else throw E;C=s}C.name||(C.name=g),t[g]=C,C.rawDefinition=v.bind(null,e),C.aliases&&O(C.aliases,{languageName:g})}function T(g){delete t[g];for(const v of Object.keys(n))n[v]===g&&delete n[v]}function M(){return Object.keys(t)}function P(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function O(g,{languageName:v}){typeof g=="string"&&(g=[g]),g.forEach(C=>{n[C.toLowerCase()]=v})}function N(g){const v=P(g);return v&&!v.disableAutodetect}function H(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=v=>{g["before:highlightBlock"](Object.assign({block:v.el},v))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=v=>{g["after:highlightBlock"](Object.assign({block:v.el},v))})}function R(g){H(g),o.push(g)}function U(g){const v=o.indexOf(g);v!==-1&&o.splice(v,1)}function L(g,v){const C=g;o.forEach(function(E){E[C]&&E[C](v)})}function y(g){return ye("10.7.0","highlightBlock will be removed entirely in v12.0"),ye("10.7.0","Please use highlightElement now."),f(g)}Object.assign(e,{highlight:u,highlightAuto:m,highlightAll:k,highlightElement:f,highlightBlock:y,configure:h,initHighlighting:x,initHighlightingOnLoad:w,registerLanguage:B,unregisterLanguage:T,listLanguages:M,getLanguage:P,registerAliases:O,autoDetection:N,inherit:Mt,addPlugin:R,removePlugin:U}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Da,e.regex={concat:fe,lookahead:jt,either:lt,optional:Fo,anyNumberOfTimes:Go};for(const g in Ue)typeof Ue[g]=="object"&&_t(Ue[g]);return Object.assign(e,Ue),e},Se=qt({});Se.newInstance=()=>qt({});var Na=Se;Se.HighlightJS=Se;Se.default=Se;const Te=_o(Na),Nt="[A-Za-z$_][0-9A-Za-z$_]*",$a=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ba=["true","false","null","undefined","NaN","Infinity"],Kt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Jt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Yt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Oa=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Pa=[].concat(Yt,Kt,Jt);function Qt(e){const t=e.regex,n=(v,{after:C})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,C)!==-1},o=Nt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,C)=>{const E=v[0].length+v.index,j=v.input[E];if(j==="<"||j===","){C.ignoreMatch();return}j===">"&&(n(v,{after:E})||C.ignoreMatch());let z;const V=v.input.substring(E);if(z=V.match(/^\s*=/)){C.ignoreMatch();return}if((z=V.match(/^\s+extends\s+/))&&z.index===0){C.ignoreMatch();return}}},r={$pattern:Nt,keyword:$a,literal:Ba,built_in:Pa,"variable.language":Oa},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},m={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,b,f,h,{match:/\$\d+/},p];d.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const k=[].concat(w,d.contains),A=k.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(k)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Kt,...Jt]}},P={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},N={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function H(v){return t.concat("(?!",v.join("|"),")")}const R={match:t.concat(/\b/,H([...Yt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},U={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},L={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),P,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,b,f,h,w,{match:/\$\d+/},p,M,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},U,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},R,N,T,L,{match:/\$[(.]/}]}}function La(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const za=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",Qt),Te.registerLanguage("sh",La),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ne(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=Z(r);return a({...p,class:D("paper",c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}function en(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),p=(h,x)=>{let w=null;return(...S)=>{a.clearTimeout(w),w=a.setTimeout(()=>h(...S),x)}},d=o`
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
  `,m=({value:h,id:x,children:w=[]})=>{const S=c({class:()=>u.val==x?"active":"",href:`#${x}`});return S.innerHTML=h,r({class:()=>u.val==x?"active":""},S,w.length>0&&s(w.map(m)))},b=h=>h.tagName.charAt(1),f=({contentEl:h})=>{const x=h.querySelectorAll(l);let w=2,S={},k={children:[]},A=k;const B=A;let T=[A];return[...x].forEach(M=>{const P=b(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(S={value:M.innerHTML,id:M.id??M.textContent,children:[]},w==P?(k=S,A.children.push(k)):w<P?(T.push(A),A=k,k.children.push(S),k=S):w>P&&(A=T[P-1],T=T.slice(0,P-1),A.children.push(S),k=S),w=P)}),B};return function(...x){let[{size:w=t.size??"md",variant:S=t.variant??"plain",color:k=t.color??"neutral",contentEl:A,...B}]=Z(x);const T=f({contentEl:A}),M=p(()=>{const O=[...A.querySelectorAll(l)].find(N=>{const{top:H,height:R}=N.getBoundingClientRect();if(H+R>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return i({...B,class:D("tableOfContent",w,S,k,d,t==null?void 0:t.class,B==null?void 0:B.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},T.children&&s(T.children.map(m)))}}const tn=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(s(l(d??""),oe.map(m=>l(m)))),i(wo.map(m=>s(l(m),oe.map((b,f)=>r(p({color:b,variant:m},{index:f}))))))))}},Ra=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},So.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},G=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:p}=t.tags;Te.registerLanguage("javascript",Qt);const d=en(e),m=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),b=tn(e),f=Ra(e),h=({text:x})=>u({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:w})=>{w.innerHTML=Te.highlight(x,{language:"js"}).value}}));return function(w){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(w.title),r(w.description),w.gridItem&&!w.variantColorTableDisable&&[c("Variant/Color"),m(b({Item:w.gridItem(e)}))],w.gridItem&&!w.variantSizeDisable&&[c("Size"),r("Component with size: ",p("sm"),", ",p("md"),", and ",p("lg")),m(f({item:w.gridItem}))],c("Usage"),l("Import"),h({text:w.importStatement}),c("Examples"),w.examples.map(k=>i(l(k.title),r(k.description),m(k.createComponent(e)({})),h({text:k.code}))));return o({class:n`
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
        `},S,d({contentEl:S}))}};function pt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:m=t.color??"neutral",Header:b,Content:f,close:h=!0,...x}]=Z(u);const w=n.state(h);return a({...x,class:D("collapsible",p,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>D("header",f?w.val?"close":"open":""),onclick:S=>{w.val=!w.val,S.stopPropagation()}},b()),a({class:"content",role:"region",bauMounted:({element:S})=>{w.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:w}),!w.val)},f&&f()))}}const ja=()=>oe.map(e=>`
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
`);function Xe(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
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
  `;return function(...p){let[{size:d=t.size??"md",variant:m=t.variant??"plain",color:b=t.color??"neutral",data:f=[],...h}]=Z(p);const x=n.state(""),w=pt(e,{size:d,variant:m,color:b}),S=A=>B=>{x.val==A?x.val="":x.val=A},k=A=>{const{Header:B,Content:T,name:M}=A,P=()=>r({class:()=>D(x.val==M&&"active")},c({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:N})=>x.val==M},B(A))),O=()=>a({id:`bau-${M}`,"data-state":({element:N})=>x.val==M},T(A));return s({class:D(b,m,d),onclick:S(M)},w({Header:P,Content:O}))};return a({class:D("accordion",l,t==null?void 0:t.class,h.class)},i(f.map(k)))}}const nn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=Xe(e,t);return r=>s({...r,data:i})},Ha=e=>{const{bau:t}=e,{div:n,p:o,section:a}=t.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],s=Xe(e);return()=>a(s({data:i,color:"neutral",variant:"outline"}))},Ua=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,on=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ga=e=>{const{css:t}=e,n=on(e),o=Xe(e);return()=>o({color:"warning",data:n,class:t`
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
`,Va=e=>{const{css:t}=e,n=on(e),o=Xe(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
`,Xa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Ua,createComponent:Ha},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Fa,createComponent:Ga},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Wa,createComponent:Va}],gridItem:nn},Za=e=>{const t=G(e);return()=>t(Xa)},qa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ka=()=>oe.map(e=>`
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
`);function $e(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
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
  `,r=X(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"outline",color:m=t.color??"neutral",onRemove:b,...f},...h]=Z(u);return a({...f,class:D("alert",`alert-${d}`,t.class,d,m,p,s,f.class),role:"alert"},i({class:"icon"},qa[m]),a({class:"content"},...h),b&&c({onclick:b}))}}const an=(e,t)=>{const n=$e(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},Ja=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=$e(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ya=`import alert from "@grucloud/bau-ui/alert";
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
`,Qa=e=>{const{css:t}=e,n=$e(e,{class:t`
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
`,tr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ya,createComponent:Ja},{title:"Custom Alert ",description:"A custom alert.",code:er,createComponent:Qa}],gridItem:an},nr=e=>{const t=G(e);return()=>t(tr)},or=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:m})=>{const b=c.val.findIndex(f=>f.id===d);b!=-1&&(c.val[b].status=m)};return function(m={},...b){const f=({id:w})=>{p({id:w,status:"removing"});const S=c.val.findIndex(k=>k.id===w);S!=-1&&c.val.splice(S,1)},h=({Component:w})=>{const S={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(S),setTimeout(()=>f(S),s)},x=w=>r({class:u.item,onclick:()=>f(w)},w.Component());return document.addEventListener("alert.add",w=>h(w.detail)),document.addEventListener("alert.remove",w=>f(w.detail)),r({class:D(u.stack,t==null?void 0:t.class,m.class)},n.loop(c,r(),x))}},ar=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=or(e,{deleteAfterDuration:2e4}),i=X(e),s=$e(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},rr=`import { Context } from "@grucloud/bau-ui/context";
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
`,sr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:rr,createComponent:ar}]},ir=e=>{const t=G(e);return()=>t(sr)},cr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ve(e),s=X(e),r=n`
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
`,ur=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ve(e),c=n`
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
`,pr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:lr,createComponent:cr},{title:"Component hide and show",description:"Hide and show a component",code:dr,createComponent:ur}]},mr=e=>{const t=G(e);return()=>t(pr)};function Ce(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",...m},...b]=Z(l);return i({...m,class:D("skeleton",u,r,t==null?void 0:t.class,m==null?void 0:m.class)},...b)}}function mt(e,t={}){const{bau:n,css:o}=e,{div:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...d){let[{size:m=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",width:h=40,height:x=40,alt:w,...S},...k]=Z(d);const A=Ce(e,{class:D(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${h}px;
        `,t==null?void 0:t.class,S.class)});return a({class:D(u,t==null?void 0:t.class,S.class)},()=>s.val&&A(),()=>r.val&&w,i({width:h,height:x,onload:c,onerror:l,class:()=>D(!s.val&&"visible",r.val&&"hide",f,b,m,u,t==null?void 0:t.class,S.class),...S}))}}const rn=(e,t)=>{const{css:n}=e,o=mt(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},gr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=mt(e,{class:n`
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
`,hr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=mt(e,{class:n`
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
`,vr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:br,createComponent:gr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:fr,createComponent:hr}],gridItem:rn},xr=e=>{const t=G(e);return()=>t(vr)};function Be(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ne(e,{class:o`
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
    opacity: 0;
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...m},...b]=Z(l);const f=w=>{x.style.opacity=1,x.showModal();const S=p.getBoundingClientRect(),k=x.getBoundingClientRect();S.x<a.innerWidth/2?x.style.left=S.left+"px":x.style.left=S.right-k.width+"px",S.y<a.innerHeight/2?(x.style.top=S.top+S.height+"px",x.style.height=Math.min(x.scrollHeight,a.innerHeight-S.top-S.height)+"px"):(x.style.top=Math.max(0,S.top-k.height)+"px",x.scrollHeight>S.top&&(x.style.height=S.top+"px"))},h=w=>{const S=()=>{x.close(),x.removeEventListener("transitionend",S)};x.addEventListener("transitionend",S),x.style.opacity=0},x=i({role:"presentation",class:D("popover",r,t==null?void 0:t.class,m==null?void 0:m.class),onclick:w=>{w.target===x&&(h(),d==null||d.call())}},s(u));return x.closeDialog=h,x.openDialog=f,x}}const Ge={sm:12,md:16,lg:24},yr=()=>oe.map(e=>`
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
`);function ve(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:p=t.color??"primary",variant:d=t.variant??"outline",visibility:m=!0,...b}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Ge[u]};
      height: ${Ge[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${yr()}
    `;return i({class:{deps:[m],renderProp:()=>h=>D("spinner",f,p,d,h==!1?"":"visibility",t==null?void 0:t.class,b.class)},version:"1.1",x:"0px",y:"0px",width:Ge[u],height:Ge[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...b},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const wr=()=>oe.map(e=>`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:p=t.color??"neutral",label:d,placeholder:m,Option:b,options:f,defaultOption:h,getOptionLabel:x,getOptionValue:w,onSelect:S=()=>{},id:k,required:A,name:B,loading:T,...M},...P]=Z(c);const O=Be(e),N=X(e),H=ue(e,{variant:u,color:p,size:l}),R=he(e),U=ve(e,{variant:u,color:p,size:l}),L=n.state(h),y=n.state(M.value),g=n.state(!1),v=n.state(0),C=()=>{g.val=!1},E=n.state(f),j=Y=>ie=>Y.val&&x(ie)==x(Y.val),z=()=>{pe.openDialog(),g.val=!0,y.val="",E.val=f,v.val=f.findIndex(j(L));const Y=Ee.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),se.scrollIntoView({block:"end"}))},V=()=>{pe.closeDialog(),g.val=!1,y.val="",v.val=0},F=Y=>{const{value:ie}=Y.target;y.val=ie,ie?E.val=f.filter(ce=>x(ce).match(new RegExp(`${ie}`,"i"))):E.val=f},$=Y=>{pe.open?V():z()},J=({option:Y,index:ie})=>ce=>{L.val=Y,v.val=ie,V()},ne=()=>{const Y=Ee.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},q=Y=>{switch(Y.key){case"Escape":V();break;case"ArrowDown":v.val<E.val.length-1?v.val++:v.val=0,ne();break;case"ArrowUp":v.val<=0?v.val=E.val.length-1:v.val--,ne();break;case"Enter":pe.open?(L.val=E.val[v.val],y.val="",V()):z(),Y.preventDefault();break}},ee=N({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":d,onclick:$,variant:u,color:p,size:l,class:T==!0&&"loading",disabled:T},()=>L.val?x(L.val):d,()=>T==!0&&U({visibility:T})),se=H({value:y,placeholder:m,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:F,onkeydown:q,...M}),xe=H({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:y,required:A,name:B}),Ee=a({class:D(u,p,l,"content")},se,()=>R({class:D(u,p,l)},E.val.map((Y,ie)=>i({class:()=>D(v.val==ie&&"active",j(L)(Y)&&"selected"),onclick:J({option:Y,index:ie})},b(Y))))),pe=O({id:k,triggerEl:ee,contentEl:Ee,onClose:C,class:o`
        overflow: hidden;
      `});return a({...M,class:D("autocomplete",s,t==null?void 0:t.class,M==null?void 0:M.class)},n.bind({deps:[L],render:()=>Y=>{Y&&(xe.value=w(Y),S(Y))}}),ee,xe,pe)}}const sn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ze(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
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
`,Ar=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=X(e,{variant:"outline"}),r=Ze(e),c=t.state([]),l=t.state(!1),u=t.state("");async function p({url:b,transform:f=h=>h}){try{l.val=!0;const h=await fetch(b,{});if(h.ok){const x=await h.json();c.val=f(x)}else u.val=h.statusText}catch(h){u.val=h.message}finally{l.val=!1}}const d=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:b=>b.sort((f,h)=>f.name.common.localeCompare(h.name.common))});d();const m=b=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.flag),i(b.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:m,getOptionValue:({name:b})=>b.common,getOptionLabel:({name:b})=>b.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>d()},"Reload")))},Tr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Dr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Cr,createComponent:Sr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Tr,createComponent:Ar},{title:"Default Option",description:"A autocomplete with a default option.",code:kr,createComponent:Er}],gridItem:sn},Mr=e=>{const t=G(e);return()=>t(Dr)};function cn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:p,...d},...m]=Z(r);return a({...d,class:D("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:D(u,l,c)},p),...m)}}const ln=(e,t)=>{const n=cn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Ir=e=>{const{bau:t}=e,{section:n}=t.tags,o=cn(e);return()=>n(o({content:"10"},"☏"))},Nr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,$r={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Nr,createComponent:Ir}],gridItem:ln},Br=e=>{const t=G(e);return()=>t($r)};function gt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,{separator:c="〉"}=t,l=X(e),u=o`
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
  `;return function(...d){let[{size:m=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",items:h,...x},...w]=Z(d);return i({...x,class:D(u,t==null?void 0:t.class,x==null?void 0:x.class)},h.map(({href:S,name:k})=>s((S?l:r)({href:`${a.base}${S}`,color:f,variant:b,size:m,class:D(f,b,m)},k))))}}const un=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=gt(e,t);return a=>o({...a,...n})},Or=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=gt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},Pr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Lr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=gt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},zr=`import { Context } from "@grucloud/bau-ui/context";
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
`,_r={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Pr,createComponent:Or},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:zr,createComponent:Lr}],gridItem:un},Rr=e=>{const t=G(e);return()=>t(_r)},dn=(e,t={})=>{const n=X(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},jr=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Hr=`import button from "@grucloud/bau-ui/button";
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
`,Ur=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Gr=`import button from "@grucloud/bau-ui/button";
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
`,Fr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Hr,createComponent:jr},{title:"Disabled Button",description:"A disabled button.",code:Gr,createComponent:Ur}],gridItem:dn},Vr=e=>{const t=G(e);return()=>t(Fr)},Wr=()=>oe.map(e=>`
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
`);function bt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=Z(r);return a({...p,class:D("button-group",l,u,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const pn=(e,t)=>{const n=["ONE","TWO","THREE"],o=X(e,t),a=bt(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Xr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=X(e),i=bt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Zr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,qr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Zr,createComponent:Xr}],gridItem:pn},Kr=e=>{const t=G(e);return()=>t(qr)};function mn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d},...m]=Z(c);return a({...d,type:"date",class:D("calendar",s,p,u,l,t==null?void 0:t.class,d==null?void 0:d.class)},...m)}}const gn=(e,t)=>{const n=mn(e,t);return o=>n({...o})},Jr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=mn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Yr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Qr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Yr,createComponent:Jr}],gridItem:gn},es=e=>{const t=G(e);return()=>t(Qr)};function ts(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",slides:d,Slide:m,Previous:b,Next:f,...h}]=Z(c);const x=()=>{s.val<=0?s.val=d.length-1:s.val--},w=()=>{s.val>=d.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},d.map(m));return a({...h,class:D("carousel",l,i,t==null?void 0:t.class,h==null?void 0:h.class)},a({class:D("control","control-previous"),onclick:x},b()),a({class:D("control","control-next"),onclick:w},f()),S)}}const ns=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],os=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=X(e,{class:n`
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
`,rs={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:as,createComponent:os}]},ss=e=>{const t=G(e);return()=>t(rs)},bn=(e,t)=>{const n=Ie(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},is=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},cs=`import chip from "@grucloud/bau-ui/chip";
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
`,ls={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:cs,createComponent:is}],gridItem:bn},us=e=>{const t=G(e);return()=>t(ls)};function qe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
      width: 1rem;
      height: 1rem;
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=Z(r);return a({type:"checkbox",...p,class:D(i,u,l,c,t==null?void 0:t.class,p==null?void 0:p.class)})}}const hn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=qe(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},ds=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=qe(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
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
`,ms=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=qe(e,{color:"neutral",variant:"outline"}),s=X(e),r=c=>{c.preventDefault();const l=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(l))};return()=>a({onsubmit:r,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          & label {
            display: inline-flex;
            flex-direction: row;
            font-size: smaller;
            align-items: center;
            gap: 1rem;
          }
        `},o("My Checkbox",i({id:"my-checkbox-uncontrolled",name:"my-checkbox-uncontrolled"})),s({type:"submit"},"Submit"))},gs=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, form } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context);

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          & label {
            display: inline-flex;
            flex-direction: row;
            font-size: smaller;
            align-items: center;
            gap: 1rem;
          }
        \`,
      },
      label(
        "My Checkbox",
        Checkbox({
          id: "my-checkbox-uncontrolled",
          name: "my-checkbox-uncontrolled",
        })
      ),
      Button({ type: "submit" }, "Submit")
    );
};
`,bs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:ps,createComponent:ds},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:gs,createComponent:ms}],gridItem:hn},hs=e=>{const t=G(e);return()=>t(bs)},fs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=pt(e),i=X(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},vs=`import button from "@grucloud/bau-ui/button";
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
`,xs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:vs,createComponent:fs}]},ys=e=>{const t=G(e);return()=>t(xs)};function ws(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=Z(r);return a({...p,class:D("divider",c,i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:"content"},...d))}}const Ss=e=>{const{bau:t}=e,{section:n}=t.tags,o=ws(e);return()=>n(o("OR"))},Cs=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Es={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Cs,createComponent:Ss}],variantColorTableDisable:!0,variantSizeDisable:!0},ks=e=>{const t=G(e);return()=>t(Es)};function As(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:p,...d},...m]=Z(r);return a({class:D(i,t==null?void 0:t.class,d.class)},a({class:()=>D("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>D("content",p.val&&"content-open")},m))}}const Ts=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=As(e),s=X(e),r=zt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Ds=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ms={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ds,createComponent:Ts}]},Is=e=>{const t=G(e);return()=>t(Ms)},Ns=()=>oe.map(e=>`
`).join(`
`);function fn(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=X(e),r=Be(e),c=he(e),l=o`
    ${Ns()}
  `;return function(...p){let[{size:d=t.size??"md",variant:m=t.variant??"outline",color:b=t.color??"neutral",label:f,ListItem:h,items:x,...w},...S]=Z(p);const k=n.state(0),A=()=>{R.openDialog(),R.focus()},B=()=>{R.closeDialog()},T=()=>{R.open?B():A()},M=U=>{T(),U.preventDefault()},P=({item:U,index:L})=>y=>{k.val=L,B(),y.preventDefault()},O=U=>{switch(U.preventDefault(),U.key){case"Escape":B();break;case"ArrowDown":k.val<options.length-1?k.val++:k.val=0;break;case"ArrowUp":k.val<=0?k.val=options.length-1:k.val--;break;case"Enter":T();break}},N=()=>c({tabindex:"0",class:D(b,m)},x.map((U,L)=>i({class:()=>D(k.val==L&&"active"),onclick:P({item:U,index:L})},h(U)))),H=s({type:"button",onclick:M,color:b,variant:m,size:d},f),R=r({triggerEl:H,contentEl:N()});return a({...w,class:D("dropdownMenu",b,d,l,t==null?void 0:t.class,w==null?void 0:w.class),onkeydown:O},H,R)}}const $s=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,i=fn(e,t),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>i({...c,items:s,ListItem:r,label:"Action"})},Bs=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,i=fn(e),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(i({items:s,ListItem:r,label:"Action"}))},Os=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Ps={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Os,createComponent:Bs}],gridItem:$s},Ls=e=>{const t=G(e);return()=>t(Ps)},vn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=st(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},zs=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=st(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},_s=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Rs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:_s,createComponent:zs}],gridItem:(e,t)=>vn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},js=e=>{const t=G(e);return()=>t(Rs)};function xn(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:p=t.size??"md",variant:d=t.variant??"outline",color:m=t.color??"neutral",Component:b,disabled:f,...h}=l;return a({class:D(r.base,f&&r.disabled,t==null?void 0:t.class,l.class)},i({class:D(d,m,p)},b({disabled:f}),s({type:"file",disabled:f,...h})))}}const yn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),p=xn(e,t),d=b=>{const f=b.target.files[0];f?u.val=f.name:u.val="No file selected"},m=({disabled:b})=>c({class:D(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return b=>p({Component:m,name:"file",accept:"text/*",onchange:d,...b})},Hs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),p=xn(e),d=b=>{const f=b.target.files[0];f?u.val=f.name:u.val="No file selected"},m=({disabled:b})=>c({class:D(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:m,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},Us=`import classNames from "@grucloud/bau-css/classNames";
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
`,Gs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Us,createComponent:Hs}],gridItem:yn},Fs=e=>{const t=G(e);return()=>t(Gs)};function Oe(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:p,...d},...m]=Z(r);return a({...d,class:D("form",u,l,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...m)}}function ht(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",loading:m,...b},...f]=Z(l);const h=X(e),x=ve(e);return n.bind({deps:[m],render:()=>w=>h({...b,class:D("loadingButton",u,p,d,r,w&&"loading",t==null?void 0:t.class,b==null?void 0:b.class)},x({size:u,variant:p,color:d,visibility:w}),i({class:w&&"loading"},f))})}}const Vs=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=ht(e),p=$e(e,{variant:"outline",color:"danger"}),d=ue(e),m=Oe(e,{class:n`
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),b=Ne(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:h=()=>{}}){const x=t.state(!1),w=t.state("");return b(m({onsubmit:async k=>{k.preventDefault();const{username:A,password:B}=Object.fromEntries(new FormData(k.target.closest("form")));try{x.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:A,password:B})});if(T.ok){const M=await T.json();h(M)}else T.status==401?w.val="Invalid username or password":w.val=T.statusText}catch(T){w.val=T.message}finally{x.val=!1}}},s(c({width:"100",height:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>w.val&&p(w.val),r("Email",d({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",d({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:x},"Login"))))}},Ws=`import form from "@grucloud/bau-ui/form";
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
`,Xs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:i,footer:s}=t.tags,r=Oe(e),c=X(e,{variant:"solid",color:"primary"}),l=ue(e);return function({onSubmitted:p=()=>{}}){return r({onsubmit:async m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.target.closest("form")));alert(JSON.stringify(b)),p(b)}},a(o("Form with input")),n(i("Branch",l({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),s(c({type:"submit"},"Click")))}},Zs=`import form from "@grucloud/bau-ui/form";
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
`,qs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:i,footer:s,em:r,span:c}=t.tags,l=t.state(""),u=t.derive(()=>l.val!=="Delete"),p=Oe(e),d=X(e,{variant:"solid",color:"primary"}),m=ue(e);return function({onSubmitted:f=()=>{}}){return p({onsubmit:async x=>{x.preventDefault(),f()}},a(o("Delete Protection")),n(i(c("Type ",r("Delete")," to confirm the destruction of the resource."),m({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:l,oninput:x=>l.val=x.target.value}))),s(d({type:"submit",disabled:u},"Delete")))}},Ks=`import { Context } from "@grucloud/bau-ui/context";
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
`,Js={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Zs,createComponent:Xs},{title:"Form with state",description:"A form with input state and a dervied state.",code:Ks,createComponent:qs},{title:"Login page",description:"A login page.",code:Ws,createComponent:Vs}]},Ys=e=>{const t=G(e);return()=>t(Js)},wn=(e,t={})=>{const n=ue(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Qs=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ue(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ei=`import input from "@grucloud/bau-ui/input";
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
`,ti={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ei,createComponent:Qs}],gridItem:wn},ni=e=>{const t=G(e);return()=>t(ti)},Sn=(e,t={})=>{const n=it(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},oi=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=it(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},ai=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,ri={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:ai,createComponent:oi}],gridItem:Sn},si=e=>{const t=G(e);return()=>t(ri)};function Cn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>oe.map(l=>`
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
  `;return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:m=t.color??"neutral",running:b,...f}]=Z(u);return i({...f,role:"progressbar",class:{deps:[b],renderProp:()=>h=>D("linearProgress",p,m,c,h&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const En=(e,t)=>{const n=Cn(e,t);return o=>n({...o,running:!0})},ii=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=X(e),i=Cn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},ci=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,li={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ci,createComponent:ii}],gridItem:En},ui=e=>{const t=G(e);return()=>t(li)},kn=(e,t)=>{const n=ht(e,t);return o=>n({...o,loading:!0},"Save")},di=e=>{const{bau:t}=e,{section:n}=t.tags,o=ht(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},pi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,mi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:pi,createComponent:di}],gridItem:kn},gi=e=>{const t=G(e);return()=>t(mi)},bi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],hi=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=he(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},bi.map(r))},fi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],vi=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=he(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},fi.map(r)))},xi=`import list from "@grucloud/bau-ui/list";
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
`,yi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:xi,createComponent:vi}],gridItem:hi},wi=e=>{const t=G(e);return()=>t(yi)};function An(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    border: 0px;
    > div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-height: 96vh;
      max-width: 96vw;
      & > header {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
    &.sm {
      max-height: 50vh;
      max-width: 50vw;
    }
    &.md {
    }
    &.lg {
      height: 96vh;
      width: 96vw;
    }

    ${(()=>oe.map(c=>`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",...m},...b]=Z(l);return a({class:D("modal",r,d,p,u,t==null?void 0:t.class,m==null?void 0:m.class)},i(b))}}const Tn=(e,t={})=>{const{bau:n}=e,{section:o,main:a,header:i,footer:s,p:r}=n.tags,c=X(e),l=An(e,t),u=()=>a(Array(10).fill("").map((d,m)=>r(m+1,". Some text here"))),p=d=>{const m=l({id:"my-dialog",...d},i("Header"),u(),s(c({variant:"outline",color:d.color,onclick:()=>{m.close()}},"Cancel"),c({variant:"solid",color:d.color,onclick:()=>{m.close()}},"OK")));return m};return d=>{const m=p(d);return o(c({...d,onclick:()=>{m.showModal()}},"OPEN MODAL"),m)}},Si=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=X(e),l=An(e),u=()=>o(Array(10).fill("").map((d,m)=>s(m+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Ci=`import modal from "@grucloud/bau-ui/modal";
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
`,Ei={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ci,createComponent:Si}],gridItem:Tn},ki=e=>{const t=G(e);return()=>t(Ei)},Ai=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ti(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s}=n.tags,r=X(e),c=Be(e),l=he(e),u=qe(e,{color:"neutral",variant:"outline"}),p=o`
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
    & label {
      display: flex;
      gap: 0.5rem;
      flex-grow: 1;
    }
    ${Ai()}
  `;return function(...m){let[{size:b=t.size??"md",variant:f=t.variant??"outline",color:h=t.color??"neutral",name:x,label:w,Option:S,options:k,defaultValue:A=[],getOptionLabel:B,getOptionValue:T,renderValue:M,onSelect:P=()=>{},loading:O,...N},...H]=Z(m);const R=ve(e,{variant:f,color:h,size:b}),U=n.state(A),L=n.state(!1),y=n.state(0),g=()=>{J.openDialog(),J.focus(),L.val=!0},v=()=>{J.closeDialog(),L.val=!1},C=()=>{L.val=!1},E=q=>{J.open?v():g(),q.preventDefault()},j=()=>Array.from(ne.selectedOptions).map(({value:q})=>k.find(ee=>T(ee)==q)),z=q=>{switch(q.preventDefault(),q.key){case"Escape":v();break;case"ArrowDown":y.val<k.length-1?y.val++:y.val=0;break;case"ArrowUp":y.val<=0?y.val=k.length-1:y.val--;break;case"Enter":if(J.open){const ee=q.currentTarget.querySelectorAll("input")[y.val];ee.checked=!ee.checked;const se=ne.options[y.val+1];se.selected=!se.selected,U.val=j()}else g();break}},V=q=>ee=>{const se=[...ne.options].find(({value:xe})=>xe==T(q));ee.target.checked?se.selected=!0:se.selected=!1,U.val=j()},F=()=>l({tabindex:"0",class:D(h,f)},k.map((q,ee)=>i({class:()=>D(y.val==ee&&"active")},n.tags.label(u({checked:A.find(se=>T(se)==T(q)),name:`${x}-${T(q)}`,onchange:V(q)}),S(q))))),$=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":L,"aria-label":w,onclick:E,color:h,variant:f,size:b,class:O==!0&&"loading",disabled:O},()=>U.val.length?M(U.val):w,()=>O==!0&&R({visibility:O})),J=c({triggerEl:$,contentEl:F(),onClose:C}),ne=s({name:x,multiple:!0,...N},n.tags.option({value:""},"--Category--"),k.map(q=>n.tags.option({value:T(q),selected:A.find(ee=>T(ee)==T(q))},B(q))));return a({...N,class:D("multiSelect",h,b,p,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:z},ne,$,J)}}const Di=e=>{const{bau:t,css:n}=e,{div:o,span:a,form:i,footer:s}=t.tags,r=Ti(e),c=X(e,{variant:"outline",color:"neutral"}),l=Ie(e,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],p=m=>a(m.group),d=m=>{m.preventDefault();const{selectedOptions:b}=m.target.elements.myMultiSelect;var f=Array.from(b).map(({value:h})=>h);alert(JSON.stringify(f))};return()=>i({onsubmit:d,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:p,defaultValue:[{group:"IAM"}],getOptionValue:({group:m})=>m,getOptionLabel:({group:m})=>m,renderValue:m=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},m.map(b=>l(b.group))),label:"Select services"}),s(c({type:"submit"},"Submit")))},Mi=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import multiSelect from "@grucloud/bau-ui/multiSelect";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, span, form, footer } = bau.tags;

  const MultiSelect = multiSelect(context);
  const Button = button(context, { variant: "outline", color: "neutral" });
  const Chip = chip(context, { size: "sm" });

  const options = [
    { group: "EC2" },
    { group: "ECS" },
    { group: "IAM" },
    { group: "Lambda" },
    { group: "RDS" },
    { group: "S3" },
  ];

  const Option = (option: any) => span(option.group);

  const onsubmit = (event: any) => {
    event.preventDefault();
    const { selectedOptions } = event.target.elements.myMultiSelect;
    var values = Array.from(selectedOptions).map(({ value }: any) => value);
    alert(JSON.stringify(values));
  };

  return () =>
    form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      MultiSelect({
        name: "myMultiSelect",
        options,
        Option,
        defaultValue: [{ group: "IAM" }],
        getOptionValue: ({ group }: any) => group,
        getOptionLabel: ({ group }: any) => group,
        renderValue: (selected: any) =>
          div(
            {
              class: css\`
                display: flex;
                gap: 0.2rem;
              \`,
            },
            selected.map((item: any) => Chip(item.group))
          ),
        label: "Select services",
      }),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Ii=e=>{const{bau:t,css:n}=e,{select:o,option:a,form:i}=t.tags,s=X(e,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],c=l=>{l.preventDefault();const{selectedOptions:u}=l.target.elements.myNativeMultiSelect;var p=Array.from(u).map(({value:d})=>d);alert(JSON.stringify(p))};return()=>i({onsubmit:c,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:l})=>a({value:l},l))),s({type:"submit"},"Submit"))},Ni=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { select, option, form } = bau.tags;

  const Button = button(context, { variant: "outline", color: "neutral" });

  const options = [
    { group: "Cabrinha" },
    { group: "Core" },
    { group: "Duotone" },
    { group: "Naish" },
    { group: "Reedin" },
    { group: "Slingshot" },
  ];

  const onsubmit = (event: any) => {
    event.preventDefault();
    const { selectedOptions } = event.target.elements.myNativeMultiSelect;
    var values = Array.from(selectedOptions).map(({ value }: any) => value);
    alert(JSON.stringify(values));
  };

  return () =>
    form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      select(
        {
          multiple: true,
          name: "myNativeMultiSelect",
        },
        options.map(({ group }) => option({ value: group }, group))
      ),
      Button({ type: "submit" }, "Submit")
    );
};
`,$i={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Mi,createComponent:Di},{title:"Native Multi Select",description:"A native multi select.",code:Ni,createComponent:Ii}]},Bi=e=>{const t=G(e);return()=>t($i)},Oi=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=X(e),r=Be(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},Pi=`import popover from "@grucloud/bau-ui/popover";
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
`,Li={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Pi,createComponent:Oi}]},zi=e=>{const t=G(e);return()=>t(Li)};function _i(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:p})=>({name:d,label:m,href:b})=>s({href:`${a.base}${b}`},r({class:"sublabel"},p),i({class:`label ${p}`},m??d));return function(...d){let[{size:m=t.size??"md",variant:b=t.variant??"plain",color:f=t.color??"neutral",data:h={},...x}]=Z(d);const{next:w,previous:S}=h;return c({"data-paginationnav":JSON.stringify(h),"aria-label":"pages navigation",...x,class:D("paginationNavigation",m,l,t==null?void 0:t.class,x==null?void 0:x.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(w==null?void 0:w.href)&&u({text:"Next"})(w))}}const Ri=e=>{const{bau:t}=e,{section:n}=t.tags,o=_i(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},ji=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Hi={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ji,createComponent:Ri}]},Ui=e=>{const t=G(e);return()=>t(Hi)},Gi=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ne(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},Fi=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},Vi=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Wi={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Vi,createComponent:Fi}],variantColorTableDisable:!0,gridItem:Gi},Xi=e=>{const t=G(e);return()=>t(Wi)};function Dn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>oe.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
  `).join(`
`))()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d}]=Z(c);return a({...d,type:"radio",class:D("radio-button",l,p,u,s,t==null?void 0:t.class,d==null?void 0:d.class)})}}const Mn=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Dn(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Zi=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Dn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},qi=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Ki={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:qi,createComponent:Zi}],gridItem:Mn},Ji=e=>{const t=G(e);return()=>t(Ki)},Yi=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Pe(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=X(e),l=Be(e),u=he(e),p=o`
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
    ${Yi()}
  `;return function(...m){let[{size:b=t.size??"md",variant:f=t.variant??"outline",color:h=t.color??"neutral",label:x,Option:w,options:S,defaultOption:k,getOptionLabel:A,getOptionValue:B,onSelect:T=()=>{},loading:M,...P},...O]=Z(m);const N=ve(e,{variant:f,color:h,size:b}),H=n.state(k?A(k):x),R=n.state(!1),U=n.state(0),L=()=>{V.openDialog(),V.focus(),R.val=!0},y=()=>{V.closeDialog(),R.val=!1},g=()=>{R.val=!1},v=$=>{V.open?y():L(),$.preventDefault()},C=({option:$,index:J})=>ne=>{H.val=A($),F.value=B($),F.setCustomValidity(""),U.val=J,y(),T($),ne.preventDefault()},E=$=>{switch($.preventDefault(),$.key){case"Escape":y();break;case"ArrowDown":U.val<S.length-1?U.val++:U.val=0;break;case"ArrowUp":U.val<=0?U.val=S.length-1:U.val--;break;case"Enter":V.open?(H.val=A(S[U.val]),F.value=B(r),y()):L();break}},j=()=>u({tabindex:"0",class:D(h,f)},S.map(($,J)=>i({class:()=>D(U.val==J&&"active"),onclick:C({option:$,index:J})},w($)))),z=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":R,"aria-label":x,onclick:v,color:h,variant:f,size:b,class:M==!0&&"loading",disabled:M},()=>!H.val&&x,H,()=>M==!0&&N({visibility:M})),V=l({triggerEl:z,contentEl:j(),onClose:g}),F=s(P,r({value:""},"--Select Category--"),S.map($=>r({value:B($)},A($))));return F.value=P.value,a({...P,class:D("select",h,b,p,t==null?void 0:t.class,P==null?void 0:P.class),onkeydown:E},F,z,V)}}const In=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Pe(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Qi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Pe(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},ec=`import select from "@grucloud/bau-ui/select";
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
`,tc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Pe(e),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(u.label),i(u.code));return()=>o(s({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},nc=`import select from "@grucloud/bau-ui/select";
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
`,oc=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Pe(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionValue:r=>r,getOptionLabel:r=>r}))},ac=`import select from "@grucloud/bau-ui/select";
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
`,rc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=X(e,{variant:"outline"}),r=Pe(e),c=t.state([]),l=t.state(!1),u=t.state("");async function p({url:b,transform:f=h=>h}){try{l.val=!0;const h=await fetch(b,{});if(h.ok){const x=await h.json();c.val=f(x)}else u.val=h.statusText}catch(h){u.val=h.message}finally{l.val=!1}}const d=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:b=>b.sort((f,h)=>f.name.common.localeCompare(h.name.common))});d();const m=b=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.flag),i(b.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:m,getOptionValue:({name:b})=>b.common,getOptionLabel:({name:b})=>b.common,label:"Country",id:"country",loading:l.val}),s({onclick:()=>d()},"Reload")))},sc=`import { Context } from "@grucloud/bau-ui/context";
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
`,ic={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:ec,createComponent:Qi},{title:"Default Option",description:"Select with a default option",code:nc,createComponent:tc},{title:"Select AWS region",description:"Select the AWS region",code:ac,createComponent:oc},{title:"Loading Indicator",description:"Select with a loading indicator",code:sc,createComponent:rc}],gridItem:In},cc=e=>{const t=G(e);return()=>t(ic)};function Nn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...p},...d]=Z(r);return a({...p,class:D("select-native",u,c,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},d)}}const $n=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Nn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},lc=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Nn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},uc=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,dc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:uc,createComponent:lc}],gridItem:$n},pc=e=>{const t=G(e);return()=>t(dc)},mc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=Ce(e),s=()=>a({class:n`
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
          `})));return()=>o(s())},gc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,bc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=Ce(e),s=()=>a({class:n`
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
            `}))));return()=>o(s())},hc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,fc=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:i,tr:s,td:r}=t.tags,c=Ce(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),l=()=>a(i(new Array(8).fill("").map(()=>s(r(c({class:n`
                  width: 5rem;
                `})),r(c()),r(c()),r(c()),r(c({class:n`
                  width: 20rem;
                `}))))));return()=>o(l())},vc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,xc=e=>{const{bau:t,css:n}=e,{section:o,header:a,span:i,article:s}=t.tags,r=n`
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
  `,c=Ce(e,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),l=Ce(e);function u({columnsSize:p=4}){return o({class:r},a(new Array(p).fill("").map(()=>c(i("1")))),s(l("")))}return()=>o(u({columnsSize:3}))},yc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,wc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:gc,createComponent:mc},{title:"List",description:"A list skeleton.",code:hc,createComponent:bc},{title:"Table",description:"A table skeleton.",code:vc,createComponent:fc},{title:"Tabs",description:"A tabs skeleton.",code:yc,createComponent:xc}],variantColorTableDisable:!0,variantSizeDisable:!0},Sc=e=>{const t=G(e);return()=>t(wc)};function Ke(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d},...m]=Z(c);return a({...d,type:"range",class:D("slider",p,u,l,s,t==null?void 0:t.class,d.class)},...m)}}const Bn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ke(e);return i=>a({...i,oninput:o})},Cc=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Ke(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Ec=`import slider from "@grucloud/bau-ui/slider";
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
`,kc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Ke(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},Ac=`import slider from "@grucloud/bau-ui/slider";
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
`,Tc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Ke(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},Dc=`import slider from "@grucloud/bau-ui/slider";
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
`,Mc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Ec,createComponent:Cc},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ac,createComponent:kc},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Dc,createComponent:Tc}],gridItem:Bn},Ic=e=>{const t=G(e);return()=>t(Mc)},On=(e,t)=>{const n=ve(e,t);return o=>n({...o})},Nc=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=ve(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},$c=`import spinner from "@grucloud/bau-ui/spinner";
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
`,Bc={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:$c,createComponent:Nc}],gridItem:On},Oc=e=>{const t=G(e);return()=>t(Bc)},Pc=()=>oe.map(e=>"").join(`
`),Pn=(e,t)=>(n,o)=>{const a=new URLSearchParams(e.window.location.search);return a.delete(t),a.append(t,n),o&&Object.entries(o).map(([i,s])=>(a.delete(i),a.append(i,s))),`?${a.toString()}`};function Ln(e,t={}){const{bau:n,css:o,window:a}=e,{div:i,ul:s,li:r,span:c,section:l}=n.tags,u=o`
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
    ${Pc()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...d){let[{color:m,variant:b="plain",size:f,stepperDefs:h=[],stepperName:x,activeStepIndex:w=n.state(0),...S},...k]=Z(d);const A=n.state(h.map((N,H)=>({...N,index:H}))),B=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(N,H,R)=>{N.apply(H,R);const U=R[2]??"";console.log("stepper pushState ",U),["?","#"].includes(U[0])&&O()}});const T=n.derive(()=>A.val[w.val]),M=N=>{const{Header:H,disabled:R,name:U,index:L}=N;return r({class:()=>D(T.val.name==U&&"active",w.val<L&&"not-completed",w.val>L&&"completed",R&&"disabled")},c({class:"step-number"},L+1),c({class:"step-label"},()=>H(N)))},P=N=>h.findIndex(({name:H})=>H==N.name),O=()=>{const H=new URLSearchParams(a.location.search).get(x)??h[0].name,R=Math.max(h.findIndex(({name:U})=>U==H),0);R<w.val&&(console.log("remove last step"),B.val.pop()),B.val.some(({name:U})=>H==U)||(console.log("add new step"),B.val.push(h[R])),w.val=R};return O(),i({bauMounted:({element:N})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:D("stepper",b,f,m,u,t==null?void 0:t.class,S.class)},n.loop(A,s(),M),n.loop(B,l(),N=>i({class:()=>D("content",N.name==T.val.name&&"visible")},N.Content({nextStep:h[P(N)+1],previousStep:h[P(N)-1]}))))}}const $t="my-wizard",Lc=e=>{const{bau:t,window:n}=e,{footer:o,p:a,label:i,section:s,a:r,ul:c,li:l}=t.tags,u=ue(e),p=Oe(e),d=Ln(e),m=Pn(e,$t),b=X(e,{variant:"outline",color:"primary"}),f=X(e,{variant:"solid",color:"primary"}),h=({nextStep:S})=>k=>{k.preventDefault();const{organization:A}=k.target.elements;n.history.pushState("","",m(S.name,{organization:A.value}))},x=S=>{var T;S.preventDefault();const{organization:k}=(T=n.document.forms)==null?void 0:T.formStep1.elements,B=new URLSearchParams(n.location.search).get("choice");alert(`organization ${k.value}, choice:${B}`)},w=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>p({onsubmit:h({nextStep:S}),id:"formStep1"},i("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:k})=>p(c(l(r({href:m(S.name,{choice:"choice1"})},"Choice 1")),l(r({href:m(S.name,{choice:"choice2"})},"Choice 2"))),o(b({href:m(k.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>p({onsubmit:x},a("My stepper 3 Content"),o(b({href:m(S.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>s(d({stepperDefs:w,stepperName:$t}))},zc=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Bt="stepper-vertical",_c=e=>{const{bau:t,window:n,css:o}=e,{footer:a,p:i,label:s,section:r,a:c,ul:l,li:u}=t.tags,p=ue(e),d=Oe(e),m=Ln(e,{class:o`
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
    `}),b=Pn(e,Bt),f=X(e,{variant:"outline",color:"primary"}),h=X(e,{variant:"solid",color:"primary"}),x=({nextStep:k})=>A=>{A.preventDefault();const{organization:B}=A.target.elements;n.history.pushState("","",b(k.name,{organization:B.value}))},w=k=>{var M;k.preventDefault();const{organization:A}=(M=n.document.forms)==null?void 0:M.formStep1.elements,T=new URLSearchParams(n.location.search).get("choice");alert(`organization ${A.value}, choice:${T}`)},S=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:k})=>d({onsubmit:x({nextStep:k}),id:"formStep1"},s("Organization",p({autofocus:!0,placeholder:"Organization",name:"organization"})),a(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:k,previousStep:A})=>d(l(u(c({href:b(k.name,{choice:"choice1"})},"Choice 1")),u(c({href:b(k.name,{choice:"choice2"})},"Choice 2"))),a(f({href:b(A.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:k})=>d({onsubmit:w},i("My stepper 3 Content"),a(f({href:b(k.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>r(m({stepperDefs:S,stepperName:Bt}))},Rc=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,jc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:zc,createComponent:Lc},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:Rc,createComponent:_c}]},Hc=e=>{const t=G(e);return()=>t(jc)},Uc=()=>oe.map(e=>`
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
    ${Uc()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=Z(r);return a({...p,class:D("switch",i,u,l,c,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const _n=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=zn(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Gc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=zn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Fc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Vc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Fc,createComponent:Gc}],gridItem:_n},Wc=e=>{const t=G(e);return()=>t(Vc)},Xc=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Le(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:i}=t,{div:s,ul:r,li:c,a:l}=n.tags,u=o`
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
          padding: 0.5rem 1rem 0 1rem;
        }
        text-align: center;
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
    ${Xc()}
  `;return function(...d){let[{size:m=t.size??"md",variant:b=t.variant??"outline",color:f=t.color??"neutral",tabsName:h="tabs",...x},...w]=Z(d);const S=n.state(i),k=O=>S.val.find(N=>N.name==O),A=n.state(i[0]),B=()=>{var R,U;const N=new URLSearchParams(a.location.search).get(h)??i[0].name,H=k(N);(R=A.val.exit)==null||R.call(),A.val=H,(U=H.enter)==null||U.call()};B(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,N,H)=>{O.apply(N,H);const R=H[2]??"";["?","#"].includes(R[0])&&B()}});const T=O=>{const N=new URLSearchParams(a.location.search);return N.delete(h),N.append(h,O),`?${N.toString()}`},M=O=>{const{Header:N,disabled:H,name:R}=O;return c({class:()=>D(A.val.name==R&&"active",H&&"disabled")},l({href:T(R)},N(O)))},P=s({class:D("tabs",b,m,f,u,t==null?void 0:t.class,x.class),bauMounted:({element:O})=>{a.addEventListener("popstate",B)},bauUnmounted:()=>{a.removeEventListener("popstate",B)}},n.loop(S,r(),M),n.bind({deps:[A],render:()=>({Content:O})=>O?O(x):""}));return P.addEventListener("tab.add",O=>{var H;const{tab:N}=O.detail;(H=N.enter)==null||H.call(),S.val.push(N)},!1),P.addEventListener("tab.remove",O=>{var H;const N=S.val.findIndex(R=>R.name==O.detail.tabName);N>0&&((H=S.val[N].exit)==null||H.call(),S.val.splice(N,1))},!1),P}}const Rn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},Zc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}],variant:"outline",color:"neutral"});return()=>i({tabsName:"my-tab"})},qc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => "TAB 1",
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => "TAB 2",
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
`,Kc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},Jc=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;
  const tabDefs = [
    {
      name: "Tab1",
      Header: () => "TAB 1",
      Content: () => div(p("My Content")),
      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Tab2",
      Header: () => "TAB 2",
      Content: () => div(p("My TAB 2 Content")),
      enter: async () => console.log("tab2 enter"),
      exit: async () => console.log("tab2 exit"),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: () => "Tab Disabled",

      Content: () => div(p("My Content Disabled")),
    },
  ];

  const Tabs = tabs(context, { tabDefs });

  return () => Tabs({ variant: "outline", color: "success" });
};
`,jn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Yc=e=>{const{css:t}=e,n=Le(e,{tabDefs:jn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Qc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,el=e=>{const{css:t}=e,n=jn(e),o=Le(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},tl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,nl={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:qc,createComponent:Zc},{title:"Extended Tabs",description:"An extended tabs.",code:Jc,createComponent:Kc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Qc,createComponent:Yc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:tl,createComponent:el}],gridItem:Rn},ol=e=>{const t=G(e);return()=>t(nl)};function ze(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=Z(c);return i({...l,class:D("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const al=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function p(h,x,w,S,k){return{name:h,calories:x,fat:w,carbs:S,protein:k}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],m=({name:h,calories:x})=>s(i(h),i({class:n`
            text-align: right;
          `},x)),b=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=ze(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),b(),l(d.map(m)))))},rl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const sl=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],il=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:b,calories:f})=>s(i(b),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=ze(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(m(r(u("Table Dense"),d(),l(sl.map(p)))))},cl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ae(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const ll=[Ae("Frozen yoghurt",159,6,24,4),Ae("Ice cream sandwich",237,9,37,4.3),Ae("Eclair",262,16,24,6),Ae("Cupcake",305,3.7,67,4.3),Ae("Gingerbread",356,16,49,3.9)],ul=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:b,calories:f})=>s(i(b),i({class:n`
            text-align: right;
          `},f)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=ze(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(m(r(u("Table Zebra"),d(),l(ll.map(p)))))},dl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,pl={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:rl,createComponent:al},{title:"Dense",description:"A dense table.",code:cl,createComponent:il},{title:"Zebra",description:"A zebra table.",code:dl,createComponent:ul}]},ml=e=>{const t=G(e);return()=>t(pl)},gl=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=en(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},bl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,hl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:bl,createComponent:gl}]},fl=e=>{const t=G(e);return()=>t(hl)};function Hn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=bt(e),s=X(e),r=ve(e),c=o`
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
  `,l=({label:b,icon:f,...h})=>s({"aria-label":b,title:b,...h},f),u=({count:b,totalCount:f,page:h,rowsPerPage:x})=>a({class:"pages-numbers"},Number(h-1)*Number(x)+(b>0?1:0),"-",Math.min(h*x,f)," of ",f),p=({count:b,page:f,rowsPerPage:h})=>a({class:"pages-numbers"},(f-1)*h+(b>0?1:0),"-",f*h),d=b=>b<=1,m=(b,f,h)=>b>=Math.ceil(f/h);return function(...f){let[{size:h=t.size??"md",variant:x=t.variant??"outline",color:w=t.color??"neutral",count:S=0,totalCount:k=0,page:A=1,rowsPerPage:B=50,onPageChange:T,isLoading:M=!1,disableFirst:P=()=>d(A),disablePrevious:O=()=>d(A),disableNext:N=()=>m(A,k,B),disableLast:H=()=>m(A,k,B),...R},...U]=Z(f);const L=Math.max(0,Math.ceil(k/B)),y=T({page:1}),g=T({page:A-1}),v=T({page:A+1}),C=T({page:L}),E=[{label:"First",icon:"⟪",onclick:y,disabled:P()},{label:"Previous",icon:"⟨",onclick:g,disabled:O()},{label:"Next",icon:"⟩",onclick:v,disabled:N()},{label:"Last",icon:"⟫",onclick:C,disabled:H()}];return a({...R,class:D("table-pagination",c,M&&"disabled",t==null?void 0:t.class,R==null?void 0:R.class)},r({class:"spinner",visibility:M,size:"md"}),k>0?u({count:S,totalCount:k,page:A,maxPages:L,rowsPerPage:B}):p({count:S,page:A,maxPages:L,rowsPerPage:B}),i({variant:x,color:w},E.map(j=>l({...j,variant:x,color:w}))))}}const vl=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),xl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=vl(45),u=({name:w,email:S})=>i(a(w),a(S)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=Hn(e),m=ze(e,{class:n`
      max-width: 650px;
    `}),b=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>b.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),x=({page:w})=>S=>{f.val.page=w};return()=>m(s(p(),()=>c(h.val.map(u))),()=>d({...f.val,onPageChange:x}))},yl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),m=t.derive(()=>p.val.length),b=t.state(1),f=t.state(10),h=t.derive(()=>p.val),x=P=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(P).toString()}`,w=({page:P})=>O=>{b.val=P,S(x({page:P,per_page:f.val}))};S(x({page:1,per_page:f.val}));async function S(P){try{u.val=!0;const O=await fetch(P,{});if(O.ok){const N=await O.json();p.val=N;return}throw O}catch(O){d.val=O.message}finally{u.val=!1}}const k=({name:P,description:O,stargazers_count:N})=>i(a(P),a(O),a({class:n`
            text-align: right;
          `},N)),A=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),B=Hn(e),T=ze(e,{class:n`
      min-width: 650px;
    `}),M=({message:P})=>l(P);return()=>T(()=>B({rowsPerPage:f.val,page:b.val,count:m.val,totalCount:-1,isLoading:u.val,onPageChange:w,disableNext:()=>!1}),s(A(),()=>d.val&&M({message:d.val}),()=>c(h.val.map(k))))},wl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=xl(e),l=yl(e),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function _e(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:p=t.color??"neutral",selected:d=!1,disabled:m,onChange:b,...f},...h]=Z(c);return i({type:"button",...f,"aria-pressed":{deps:[d],renderProp:()=>x=>x},class:{deps:[d],renderProp:()=>x=>D("toggle",l,p,u,s,x&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:m},h)}}const Un=(e,t)=>{const{bau:n}=e,o=_e(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},Sl=e=>{const{bau:t}=e,{section:n}=t.tags,o=_e(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Cl=`import toggle from "@grucloud/bau-ui/toggle";

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
`,El={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Cl,createComponent:Sl}],gridItem:Un},kl=e=>{const t=G(e);return()=>t(El)},Al=()=>oe.map(e=>`
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
`);function ft(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Al()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:p=!1,onChange:d=()=>{},...m},...b]=Z(r);const f=new Set,h=x=>{const{value:w}=x.target;p?(f.clear(),f.add(w)):f.has(w)?f.delete(w):f.add(w),d({event:x,values:[...f]})};return a({...m,class:D("toggle-group",c,u,l,i,t==null?void 0:t.class,m==null?void 0:m.class),onclick:h},...b)}}const Gn=(e,t)=>{const{bau:n}=e,o=ft(e,t),a=_e(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},Tl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=_e(e),s=ft(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},Dl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Ml=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=_e(e),s=ft(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},Il=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Nl={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Dl,createComponent:Tl},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Il,createComponent:Ml}],gridItem:Gn},$l=e=>{const t=G(e);return()=>t(Nl)};function vt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:p=t.size??"md",variant:d=t.variant??"outline",color:m=t.color??"neutral",...b},...f]=Z(c);const h=i({class:D("container",...u.split("-"))},i({class:D("content",m,d,p),role:"tooltip"},l)),x=T=>`move-to-${T}`,w=(T,M,P)=>{if(T()){const O=x(M);h.classList.add(O),h.classList.add(M),h.classList.remove(P)}},S=(T,M)=>{const P=x(T);h.classList.contains(P)&&(h.classList.remove(P),h.classList.add(M),h.classList.remove(T))},k=T=>{const M=h.getBoundingClientRect();w(()=>M.x<0,"right","left"),w(()=>M.x+M.width>a.innerWidth,"left","right"),w(()=>M.y<0,"bottom","top"),w(()=>M.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},A=T=>{h.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...b,class:D("tooltip",s,t==null?void 0:t.class,b==null?void 0:b.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",k),T.addEventListener("mouseout",A)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",k),T.removeEventListener("mouseout",A)}},...f,h)}}const Fn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=X(e),r=vt(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Bl=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=X(e),s=vt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Ol=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Pl=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Ie(e,{variant:"outline",color:"primary"}),c=vt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Ll=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,zl={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Ol,createComponent:Bl},{title:"Grid",description:"Various tooltip position",code:Ll,createComponent:Pl}],gridItem:Fn},_l=e=>{const t=G(e);return()=>t(zl)},Vn=(e,t)=>{const n=rt(e,t);return o=>n(o)},Rl=e=>{const{bau:t}=e,{section:n}=t.tags,o=rt(e);return()=>n(o({}))},jl=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Hl={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:jl,createComponent:Rl}],gridItem:Vn},Ul=e=>{const t=G(e);return()=>t(Hl)},Gl=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Wn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Gl({css:o,createGlobalStyles:a}),p=pt(e),d=({depth:m=1,maxDepth:b,color:f,variant:h,size:x})=>w=>{const{children:S,expanded:k}=w,A=n.state(!k),B=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:M=>{S&&(A.val=!A.val)}},i(w.data)),T=()=>s({class:D(f,x)},S.map(d({depth:m+1,maxDepth:b})));return r(p({size:x,Header:B,Content:S&&m<b&&T}))};return function({tree:b,maxDepth:f=1/0,size:h=t.size??"md",variant:x=t.variant??"outline",color:w=t.color??"neutral",...S}){return c({class:D(u.nav,h,x,w,t==null?void 0:t.class,S.class)},b.children&&s(b.children.map(d({maxDepth:f,color:w,variant:x,size:h}))))}}const Xn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Wn(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},Fl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Wn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Vl=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Wl={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Vl,createComponent:Fl}],gridItem:Xn},Xl=e=>{const t=G(e);return()=>t(Wl)},Zl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=tn(e),u=X(e),p=[{name:"Accordion",Item:nn(e)},{name:"Alert",Item:an(e)},{name:"Autocomplete",Item:sn(e)},{name:"Avatar",Item:rn(e)},{name:"Badge",Item:ln(e)},{name:"Breadcrumbs",Item:un(e)},{name:"Button",Item:dn(e)},{name:"Button Group",Item:pn(e)},{name:"Calendar",Item:gn(e)},{name:"Checkbox",Item:hn(e)},{name:"Chip",Item:bn(e)},{name:"DrillDown Menu",Item:vn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:yn(e)},{name:"Input",Item:wn(e)},{name:"Input Search",Item:Sn(e)},{name:"Linear Progress",Item:En(e)},{name:"Loading Button",Item:kn(e)},{name:"Modal",Item:Tn(e)},{name:"Radio Button",Item:Mn(e)},{name:"Select",Item:In(e)},{name:"Select Native",Item:$n(e)},{name:"Slider",Item:Bn(e)},{name:"Spinner",Item:On(e)},{name:"Switch",Item:_n(e)},{name:"Tabs",Item:Rn(e)},{name:"Theme Switch",Item:Vn(e)},{name:"Toggle",Item:Un(e)},{name:"Toggle Group",Item:Gn(e)},{name:"Tooltip",Item:Fn(e)},{name:"Tree View",Item:Xn(e)}];return()=>o({class:n`
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
            `},l(d))))},ql=({context:e})=>{const t=Zl(e);return[{path:"",action:n=>({title:"Bau UI",component:Oo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:_a(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Za(e)})},{path:"alert",action:()=>({title:"Alert",component:nr(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ir(e)})},{path:"animate",action:()=>({title:"Animate",component:mr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Mr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:xr(e)})},{path:"badge",action:()=>({title:"Badge",component:Br(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Rr(e)})},{path:"button",action:()=>({title:"Button",component:Vr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Kr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:es(e)})},{path:"carousel",action:()=>({title:"Carousel",component:ss(e)})},{path:"chip",action:()=>({title:"Chip",component:us(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:hs(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ys(e)})},{path:"divider",action:()=>({title:"Divider",component:ks(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Is(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Ls(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:js(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Fs(e)})},{path:"form",action:()=>({title:"Form",component:Ys(e)})},{path:"input",action:()=>({title:"Input",component:ni(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:si(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ui(e)})},{path:"list",action:()=>({title:"List",component:wi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:gi(e)})},{path:"modal",action:()=>({title:"Modal",component:ki(e)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:Bi(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Ui(e)})},{path:"paper",action:()=>({title:"Paper",component:Xi(e)})},{path:"popover",action:()=>({title:"Popover",component:zi(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Ji(e)})},{path:"select",action:()=>({title:"Select",component:cc(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:pc(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Sc(e)})},{path:"slider",action:()=>({title:"Slider",component:Ic(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Oc(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Hc(e)})},{path:"switch",action:()=>({title:"Switch",component:Wc(e)})},{path:"table",action:()=>({title:"Table",component:ml(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:fl(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:wl(e)})},{path:"tabs",action:()=>({title:"Tabs",component:ol(e)})},{path:"toggle",action:()=>({title:"Toggle",component:kl(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:$l(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:_l(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Ul(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Xl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:zo(e)})}]},Kl=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Jl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:m=t}=l.resolve({pathname:u});s.val=d({}),document.title=`${p}`}},Yl=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};po();const Zn={title:"Bau",base:"/bau/bau-ui"},ge=yo({config:Zn}),{bau:Ql}=ge;ge.states={drawerOpen:Ql.state(!0)};Yl(ge);to({routes:ql({context:ge}),onLocationChange:Jl({context:ge,LayoutDefault:Io(ge),config:Zn}),notFoundRoute:Kl(ge)});
