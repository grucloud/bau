(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),Re=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,...Re({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=Re({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},r=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:r}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,s,l)=>{i.apply(s,l),o.pathname!=window.location.pathname&&n({router:r}),a(window.location)}}),document.addEventListener("click",i=>{const{target:s}=i,l=s.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:r}),r}const ae=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],co=t=>`var(--color-${t})`,lo=t=>`var(--color-${t}-lightest)`,uo=()=>ae.map(([t])=>`
.outline.${t} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${lo(t)};
}
.solid.${t} {
  background-color: ${co(t)};
}
`).join(`
`),mo=()=>ae.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),po=t=>100-t*10,bo=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${po(e)}%);`).join(`
`),ke=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),go=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,r])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${r}));`),...io.map(([a,r])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${r}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function fo({createGlobalStyles:t},{colorPalette:e=ae}={}){t`
    * {
      margin: 0;
      padding: 0;
    }
    h1,h2,h3,p {
      margin:0.3rem 0;
    }
    ul,ol {
      padding-left:1.3rem
    }
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${e.map(([n,o])=>go([n,o])).join(`
`)}
      ${bo()}
      ${ke({})}
      ${uo()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
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
    html:has(dialog[open]) {
      overflow: hidden;
    }
    html[data-theme="dark"] {
      ${mo()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ke({dark:!0})};
    }
  `}function ho(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let re=t=>Object.prototype.toString.call(t??0).slice(8,-1),vo=t=>re(t)=="Object",Ee=t=>re(t)=="Function",ee=t=>["Object","Array"].includes(re(t)),Te=Object.getPrototypeOf,ne=t=>wt(t)?t.val:t,wt=t=>t==null?void 0:t.__isState,xo=["splice","push","pop","shift","unshift","sort","reverse"],Ht=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const W=t=>!wt(t[0])&&vo(t[0])?t:[{},...t];function yo(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,r=new Set,i=!1,s,l=C=>n.createElement(C),c=(C,f,y)=>{let k=s;s=f;let T=C(y);return s=k,T},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(C=>{C.bindings=C.bindings.filter(f=>{var y;return(y=f.element)==null?void 0:y.isConnected}),!C.bindings.length&&!C.computed&&a.delete(C)}),o=void 0}))},d=(C,f,y,k,T,H)=>{var R;if(i){r.add(C);return}for(let V of C.bindings){let{deps:J,element:N,renderInferred:X,render:nt,renderItem:Z}=V;if(Z&&f)(R=b(N,k,(...Y)=>h(Z(...Y)),y,T,H)[f])==null||R.call();else{let Y=X?X({element:N}):nt({element:N,renderItem:Z})(...J.map(ne));Y!==N&&N.replaceWith(V.element=h(Y))}}w(C),u()},m=(C,f,y=[])=>({get(k,T,H){var R;if(s==null||s.add(C),T==="_isProxy")return!0;if(!((R=k[T])!=null&&R._isProxy)&&!wt(k[T])&&ee(k[T]))k[T]=new Proxy(k[T],m(C,f,[...y,T]));else if(xo.includes(T)){let V=k[T];return(...J)=>{let N=V.apply(k,J);return d(C,T,N,J,f,y),N}}return Reflect.get(k,T,H)},set(k,T,H,R){let V=Reflect.set(k,T,H,R);return d(C,"setItem",V,{prop:T,value:H},f,[...y,T]),V}}),p=(C,f)=>new Proxy(f,m(C,f)),b=(C,f,y,k,T,H)=>{let R=()=>C.replaceChildren(...Ht(k,y)),V=J=>C[J]&&C.removeChild(C[J]);return{assign:R,sort:R,reverse:R,setItem:()=>{var N;let J=H[0];(N=C.children[J])==null||N.replaceWith(y(T[J],J))},push:()=>C.append(...Ht(f,(J,N)=>y(J,T.length+N))),unshift:()=>C.prepend(...Ht(f,y)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:J}=C.children;let[N,X=J,...nt]=f;for(let Z=N>=0?Math.min(N+X-1,J-1):J-1;Z>=(N>=0?N:J+N);Z--)C.children[Z].remove();if(nt.length){let Z=nt.forEach((Y,rt)=>y(Y,N+rt));C.children[N]?C.children[N].after(...Z):C.append(...Z)}}}},g=C=>({oldVal:C,bindings:[],listeners:[],__isState:!0,get val(){let f=this;return s==null||s.add(f),f.valProxy??(f.valProxy=ee(C)?p(f,C):C,f.valProxy)},set val(f){let y=this,k=y.val;ee(f)?(y.valProxy=p(y,f),d(y,"assign",f)):f!==k&&(y.valProxy=f,d(y)),y.oldVal=k}}),h=C=>{if(C==null||C===!1){const f=l("span");return f.style.display="none",f}else return C.nodeType?C:n.createTextNode(C)},x=(C,f)=>{let y=new Set;return f.val=c(C,y),y},v=C=>{let f=g(),y=x(C,f);f.computed=!0;for(let k of y)k.listeners.push({computed:C,deps:y,state:f});return f},w=C=>{for(let f of[...C.listeners])x(f.computed,f.state)},S=(C,...f)=>{if(f.length){let y=[];for(let k of f.flat(1/0))k!=null&&y.push(wt(k)?G({deps:[k],render:()=>T=>T}):Ee(k)?j({renderInferred:k}):h(k));C.append(...y)}},E={},D=(C,f)=>C&&(Object.getOwnPropertyDescriptor(C,f)??D(Te(C),f)),A=(C,f,y)=>{var k;return E[C+","+f]??(E[C+","+f]=((k=D(y,f))==null?void 0:k.set)??0)},I=(C,f)=>new e.MutationObserver((y,k)=>{y.filter(T=>T.removedNodes).forEach(T=>[...T.removedNodes].find(H=>H===C&&(f({element:C}),k.disconnect(),!0)))}).observe(C.parentNode,{childList:!0}),M=(C,f)=>new e.MutationObserver((y,k)=>y.forEach(T=>f({record:T,element:C}))).observe(C,{childList:!0}),$=C=>new Proxy(function(y,...k){var V;let[T,...H]=W(k),R=C?n.createElementNS(C,y):l(y);for(let[J,N]of Object.entries(T)){if(J.startsWith("bau"))continue;let X=A(y,J,Te(R))?nt=>nt!==void 0&&(R[J]=nt):nt=>R.setAttribute(J,nt);N==null||(wt(N)?G({deps:[N],render:()=>()=>(X(N.val),R)}):Ee(N)&&(!J.startsWith("on")||N.isDerived)?j({renderInferred:()=>(X(N({element:R})),R)}):N.renderProp?G({deps:N.deps,render:()=>()=>(X(N.renderProp({element:R})(...N.deps.map(ne))),R)}):X(N))}return T.bauChildMutated&&M(R,T.bauChildMutated),S(R,...H),R.autofocus&&R.focus&&e.requestAnimationFrame(()=>R.focus()),(V=T.bauCreated)==null||V.call(T,{element:R}),T.bauMounted&&e.requestAnimationFrame(()=>T.bauMounted({element:R})),T.bauUnmounted&&e.requestAnimationFrame(()=>I(R,T.bauUnmounted)),R},{get:(f,y)=>f.bind(void 0,y)}),L=(C,f,y)=>{C.element=h(y);for(let k of f)wt(k)&&(a.add(k),k.bindings.push(C));return C.element},j=({renderInferred:C,element:f})=>{let y=new Set,k=c(C,y,{element:f});return L({renderInferred:C},y,k)},G=({deps:C,element:f,render:y,renderItem:k})=>L({deps:C,render:y,renderItem:k},C,y({element:f,renderItem:k})(...C.map(ne))),U=(C,f,y)=>G({deps:[C],render:({renderItem:k})=>T=>(f.append(...Ht(T,k)),f),renderItem:y}),z=async C=>{i=!0;const f=await C();return i=!1,r.forEach(d),r.clear(),f};return{tags:$(),tagsNS:$,state:g,bind:G,loop:U,derive:v,stateSet:a,batch:z}}const So=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},wo=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Co=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function ko(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...r)=>{const i=Co(a,r),s=So(i);return!e.getElementById(s)&&wo(e,t==null?void 0:t.target,s,o(s,i)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Eo(t){const e=yo(),n=ko();return fo(n),{bau:e,...n,tr:o=>o,window,...t}}function B(...t){return t.filter(e=>e).join(" ")}function qt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,r=()=>{};return function({animationHide:s=r,animationShow:l=r,...c},u){return a({class:B("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:d,element:m})=>{[...d.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const b=p.cloneNode(!0);o.requestAnimationFrame(()=>{b.setAttribute("cloned",!0),b.style.top=0,b.style.left=0,b.style.width=p.getAttribute("width"),b.style.height=p.getAttribute("height"),b.style.position="absolute",b.style.animation=s(),d.target.appendChild(b),b.addEventListener("animationend",()=>{var g;return(g=b.parentNode)==null?void 0:g.removeChild(b)})})}),[...d.addedNodes].forEach(p=>{p.getAttribute("cloned")||o.requestAnimationFrame(()=>{m.style.position="relative";const b=p.getBoundingClientRect();if(p.setAttribute("width",b.width+"px"),p.setAttribute("height",b.height+"px"),l()){p.style.animation=l();const g=()=>{p.removeEventListener("animationend",g),p.style.animation=""};p.addEventListener("animationend",g)}})})},...c},u)}}const ot=["neutral","primary","success","danger","warning"],To=["plain","outline","solid"],Do=["sm","md","lg"],Ao=()=>ot.map(t=>`
&.button.plain.${t} {
  &:focus {
    outline: 4px auto var(--color-${t});
    border: 1px solid var(--color-neutral);
  };
}
&.button.outline.${t} {
  &:focus {
    outline: 4px auto var(--color-${t});
  };
}
&.button.solid.${t} {
  &:focus {
    outline: 4px auto var(--color-${t}-lightest);
  };
}
`).join(`
`);function P(t,e={}){const{bau:n,css:o}=t,a=o`
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
    ${Ao()}
  `;return function(...i){let[{size:s=e.size??"md",variant:l=e.variant??"none",color:c=e.color??"none",href:u,...d},...m]=W(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:B("button",e.class,l,s,c,a,d.class),href:u},m)}}const Bo="light",Io=()=>ot.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function se(t,e={}){const{bau:n,css:o,window:a}=t,{input:r}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},l=s();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Bo);const c=o`
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
    ${Io()}
  `;return function(...d){let[{size:m=e.size??"md",variant:p=e.variant??"plain",color:b=e.color??"neutral",...g},...h]=W(d);return r({required:"required",title:"Switch Theme",name:"theme-switch",...g,class:B("theme-switch",b,p,m,c,e==null?void 0:e.class,g.class),type:"checkbox",checked:s()=="dark",onclick:x=>{i(x.target.checked?"dark":"light")}},...h)}}function No(t){const{tr:e,bau:n,css:o,config:a,states:r}=t,{i,header:s,h1:l,div:c,a:u,img:d,b:m,ul:p,li:b}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),x=r.drawerOpen,v=P(t,{class:o`
      background: transparent;
    `}),w=se(t),S=()=>i(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},S()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},m(e("Bau UI")))),D=()=>c({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},w(),v({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},E(),D())}}function Mo({tr:t,bau:e,css:n}){const{section:o,footer:a,span:r,a:i,ul:s,li:l,p:c,div:u,h1:d}=e.tags,m=({links:g,title:h})=>o({class:n`
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
        `},d(h),s(g.map(({href:x,name:v})=>l(i({href:x},v))))),p=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],b=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 4rem;
          padding: 1rem;
          border-top: 1px solid var(--color-emphasis-200);
          color: var(--color-content-secondary);
        `},u({class:n`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `},m({title:"Bau UI",links:p}),m({title:"Bau Ecosystem",links:b})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},r("v0.76.0"),r("MIT license")))}}function vt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("list",r,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}const Ft="0.3s",_e=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,r={...a};return r.children=o==null?void 0:o.map(_e({parent:n,grandParent:t})),t&&(t.parentTree=e),r.parentTree=t,r},je=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=je(t)(e.children[o]);if(a)return a}},Oo=({keyframes:t})=>({hideToLeft:t`
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
   `});function ie(t,e={}){const{bau:n,css:o,window:a,config:r}=t,{base:i="",hashBased:s=!1}=e,l=`${r.base}${i}`,c=z=>{var C;return((C=z.parentTree.data)==null?void 0:C.href)??z.parentTree.children[0].data.href},u=({variant:z,color:C,size:f,currentTree:y,data:k})=>w(A({variant:z,color:C,size:f,href:`${l}${c(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),A({variant:z,color:C,size:f,href:`${l}${k.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},k.name)),d=({size:z,subTree:{data:{name:C,href:f},children:y=[]}})=>A({size:z,href:`${l}${f}`,"data-ischild":!y.length},C),m=({pathname:z,subTree:C})=>{var f;return z===((f=C==null?void 0:C.data)==null?void 0:f.href)},{renderHeader:p=u,renderMenuItem:b=d,isActive:g=m}=e,{li:h,nav:x,div:v,header:w,a:S}=n.tags,E=qt(t),D=vt(t),A=P(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:I,hideToRight:M}=Oo(t),$=o`
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
  `,L=({children:z,pathnameState:C,variant:f,color:y,size:k})=>D({class:B(f,y,k)},z.map(T=>h({class:()=>B(T.children&&"has-children",g({pathname:C.val,subTree:T})&&"active")},b({variant:f,color:y,size:k,subTree:T})))),j=({variant:z,color:C,size:f,currentTree:y,pathnameState:k})=>{const{children:T,parentTree:H,data:R,renderList:V}=y;return v({class:B("drillDownMenu",z,C,f)},H&&p({variant:z,color:C,size:f,data:R,currentTree:y}),T&&V?V({renderListDefault:L,children:T,pathnameState:k,variant:z,color:C,size:f}):L({children:T,pathnameState:k,variant:z,color:C,size:f}))},G=({tree:z,pathname:C})=>{let f=_e({})({...z}),y=je(C)(f);return y||(y=f),y},U=({target:z})=>{let f=z.closest("a").getAttribute("href").replace(l,"");return s||(f=f.replace(z.hash,"")),f};return function(C){const{size:f=e.size??"md",variant:y=e.variant??"plain",color:k=e.color??"neutral",tree:T,...H}=C,R=n.state(a.location.pathname.replace(l,""));let V=G({tree:T,pathname:R.val});const J=n.state(JSON.stringify(V.data));let N;a.document.addEventListener("click",Y=>{const{target:rt}=Y,ct=rt.closest("a");if(!ct)return;const lt=ct.getAttribute("href");lt&&!lt.startsWith("http")&&!lt.startsWith("#")&&!lt.startsWith("?")&&(V=G({tree:T,pathname:U(Y)}),J.val=JSON.stringify(V.data),R.val=U({target:rt}))});const X=Y=>{const{buttonback:rt,ischild:ct}=Y.target.dataset;rt=="true"?N=-1:ct=="false"?N=1:ct=="true"&&(N=0)},nt=Y=>{switch(Y){case 1:return`${I} ${Ft}`;case-1:return`${M} ${Ft}`;default:return""}},Z=Y=>{switch(Y){case 1:return`${M} ${Ft} reverse`;case-1:return`${I} ${Ft} reverse`;default:return""}};return x({class:B($,y,k,f,e==null?void 0:e.class,H.class),onclick:X},E({animationHide:()=>nt(N),animationShow:()=>Z(N)},n.bind({deps:[J],render:()=>()=>j({variant:y,color:k,size:f,currentTree:V,pathnameState:R})})))}}const $o=()=>ot.map(t=>`
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
    outline: 4px auto var(--color-${t});
  };
}
&.input.solid.${t} {
  &:focus {
    outline: 4px auto var(--color-${t}-lightest);
  };
  &::placeholder {
    color: var(--font-color-inverse-secondary);
  }
  &:hover {
    background-color: var(--color-${t}-light);
  }
}
`).join(`
`);function dt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
    ${$o()}
  `;return function(s){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=s;return a({type:"text",...u,class:B("input",e.class,e.size??"md",c,l,r,u.class)})}}function ce(t,e={}){const{bau:n,css:o,window:a}=t,r=dt(t,e);return function(s){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=s,m=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,p=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${m};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return r({type:"search",...u,color:c,variant:l,class:B("inputSearch",e.class,p,u.class)})}}function Ge(t){const{tr:e,bau:n,css:o,config:a,states:r,window:i}=t,{div:s,ul:l,li:c,nav:u,a:d,span:m,form:p}=n.tags,b=ce(t,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:w,children:S,pathnameState:E,variant:D,color:A,size:I})=>{const M=n.state(""),$=n.derive(()=>M.val==""?S:S.filter(j=>j.data.name.match(new RegExp(`${M.val}`,"i")))),L=j=>{M.val=j.target.value};return p({class:o`
          display: flex;
          flex-direction: column;
        `},b({autocomplete:"off",name:"component-search",autofocus:!0,value:M,placeholder:`Search ${$.val.length} components`,size:32,oninput:L}),()=>w({children:$.val,pathnameState:E,variant:D,color:A,size:I}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let x=!1;const v=ie(t);return function(){return s({bauMounted:({element:S})=>{i.innerWidth<=640&&(x=!0,r.drawerOpen.val=!1)},onclick:S=>{x&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:B(o`
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
          `)},v({tree:h}))}}const Lo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:r}=e.tags,i=qt(t),s=No(t),l=Ge(t),c=Mo(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(m="")=>`${u} ease-in-out 0.5s ${m}`;return function({componentState:p}){return r({class:n`
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
        `},s(),l(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>p.val),c())}};function Ot(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...m},...p]=W(s);return a({...m,onclick:d,class:B("chip",e.class,l,c,u,d&&"clickable",r,m.class)},...p)}}function Po(t){const{bau:e,css:n,config:o}=t,{div:a,h1:r,h2:i,p:s}=e.tags;P(t);const l=n`
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
  `;return function({name:u,text:d,tagLine:m}){return a({class:l},r(u),i(d),s(m))}}function zo(t){const{bau:e,css:n}=t,{div:o,h1:a,p:r}=e.tags,i=n`
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
  `,s=({title:l,Content:c})=>o({className:"feature"},a(l),r(c()));return function({featuresContent:c}){return o({class:i},c.map(s))}}function Ro({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:r,dd:i,div:s,aside:l,footer:c,a:u}=e.tags,d=({maxSize:m=151})=>({libName:p,size:b})=>s({class:n`
            display: flex;
            margin: 0.3rem;
          `},r({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},p),i({class:n`
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
                  var(--color-success) ${b/m*100}%
                );
                justify-content: flex-end;
                width: ${b/m*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},b)));return function({data:p=[]}){return o({class:n`
          box-shadow: var(--shadow-m);
          border: 1px solid var(--color-emphasis-200);
          padding: 1rem;
        `},l({class:n`
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
          `},"Bundle Size Comparison in kB"),a({class:n`
            display: flex;
            flex-direction: column;
          `},p.map(d({}))),c({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function _o(t){const{bau:e,css:n,config:o}=t,{div:a,p:r,a:i,section:s}=e.tags,l=Po(t),c=zo(t),u=P(t);Ot(t);const d=Ro(t),m=(...x)=>a({class:n`
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
          `},...x)),p=n``,b=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],g=[{title:"UI components for the web",Content:()=>[r("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),m(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),m(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),m(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[r("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]}],h=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:p},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:g}),d({data:b}),h())}}function jo(t,e={}){const{bau:n,css:o}=t,{div:a,form:r,span:i,pre:s,h3:l,h4:c}=n.tags;return function(d,...m){return a("Login")}}const Go=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:r,h2:i}=n.tags,s=jo(t);return()=>o({id:"login"},i(e("Login Examples")),r("Basic"),a(s()))};function Ho(t){const{tr:e,bau:n,css:o}=t,{div:a,article:r,h1:i}=n.tags;return function(){return a({class:o`
          grid-area: main;
          display: flex;
        `},r({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},i(e("Pages Examples")),Go(t)()))}}function Fo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function He(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&He(n)}),t}class De{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Fe(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function pt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Uo="</span>",Ae=t=>!!t.scope,Vo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Jo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Fe(e)}openNode(e){if(!Ae(e))return;const n=Vo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){Ae(e)&&(this.buffer+=Uo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Be=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class le{constructor(){this.rootNode=Be(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Be({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{le._collapse(n)}))}}class qo extends le{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Nt(t){return t?typeof t=="string"?t:t.source:null}function Ue(t){return xt("(?=",t,")")}function Wo(t){return xt("(?:",t,")*")}function Ko(t){return xt("(?:",t,")?")}function xt(...t){return t.map(n=>Nt(n)).join("")}function Xo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function ue(...t){return"("+(Xo(t).capture?"":"?:")+t.map(o=>Nt(o)).join("|")+")"}function Ve(t){return new RegExp(t.toString()+"|").exec("").length-1}function Zo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function de(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let r=Nt(o),i="";for(;r.length>0;){const s=Yo.exec(r);if(!s){i+=r;break}i+=r.substring(0,s.index),r=r.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+a):(i+=s[0],s[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Qo=/\b\B/,Je="[a-zA-Z]\\w*",me="[a-zA-Z_]\\w*",qe="\\b\\d+(\\.\\d+)?",We="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ke="\\b(0b[01]+)",ta="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ea=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=xt(e,/.*\b/,t.binary,/\b.*/)),pt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},Mt={begin:"\\\\[\\s\\S]",relevance:0},na={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Mt]},oa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Mt]},aa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Wt=function(t,e,n={}){const o=pt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ue("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ra=Wt("//","$"),sa=Wt("/\\*","\\*/"),ia=Wt("#","$"),ca={scope:"number",begin:qe,relevance:0},la={scope:"number",begin:We,relevance:0},ua={scope:"number",begin:Ke,relevance:0},da={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Mt,{begin:/\[/,end:/\]/,relevance:0,contains:[Mt]}]}]},ma={scope:"title",begin:Je,relevance:0},pa={scope:"title",begin:me,relevance:0},ba={begin:"\\.\\s*"+me,relevance:0},ga=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Ut=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Qo,IDENT_RE:Je,UNDERSCORE_IDENT_RE:me,NUMBER_RE:qe,C_NUMBER_RE:We,BINARY_NUMBER_RE:Ke,RE_STARTERS_RE:ta,SHEBANG:ea,BACKSLASH_ESCAPE:Mt,APOS_STRING_MODE:na,QUOTE_STRING_MODE:oa,PHRASAL_WORDS_MODE:aa,COMMENT:Wt,C_LINE_COMMENT_MODE:ra,C_BLOCK_COMMENT_MODE:sa,HASH_COMMENT_MODE:ia,NUMBER_MODE:ca,C_NUMBER_MODE:la,BINARY_NUMBER_MODE:ua,REGEXP_MODE:da,TITLE_MODE:ma,UNDERSCORE_TITLE_MODE:pa,METHOD_GUARD:ba,END_SAME_AS_BEGIN:ga});function fa(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function ha(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function va(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=fa,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function xa(t,e){Array.isArray(t.illegal)&&(t.illegal=ue(...t.illegal))}function ya(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function Sa(t,e){t.relevance===void 0&&(t.relevance=1)}const wa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=xt(n.beforeMatch,Ue(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Ca=["of","and","for","in","not","or","if","then","parent","list","value"],ka="keyword";function Xe(t,e,n=ka){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(r){Object.assign(o,Xe(t[r],e,r))}),o;function a(r,i){e&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){const l=s.split("|");o[l[0]]=[r,Ea(l[0],l[1])]})}}function Ea(t,e){return e?Number(e):Ta(t)?0:1}function Ta(t){return Ca.includes(t.toLowerCase())}const Ie={},ht=t=>{console.error(t)},Ne=(t,...e)=>{console.log(`WARN: ${t}`,...e)},St=(t,e)=>{Ie[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Ie[`${t}/${e}`]=!0)},Jt=new Error;function Ze(t,e,{key:n}){let o=0;const a=t[n],r={},i={};for(let s=1;s<=e.length;s++)i[s+o]=a[s],r[s+o]=!0,o+=Ve(e[s-1]);t[n]=i,t[n]._emit=r,t[n]._multi=!0}function Da(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ht("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Jt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ht("beginScope must be object"),Jt;Ze(t,t.begin,{key:"beginScope"}),t.begin=de(t.begin,{joinWith:""})}}function Aa(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ht("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Jt;if(typeof t.endScope!="object"||t.endScope===null)throw ht("endScope must be object"),Jt;Ze(t,t.end,{key:"endScope"}),t.end=de(t.end,{joinWith:""})}}function Ba(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Ia(t){Ba(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Da(t),Aa(t)}function Na(t){function e(i,s){return new RegExp(Nt(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=Ve(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(l=>l[1]);this.matcherRe=e(de(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(s);if(!l)return null;const c=l.findIndex((d,m)=>m>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const l=new n;return this.rules.slice(s).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const s=new o;return i.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function r(i,s){const l=i;if(i.isCompiled)return l;[ha,ya,Ia,wa].forEach(u=>u(i,s)),t.compilerExtensions.forEach(u=>u(i,s)),i.__beforeBegin=null,[va,xa,Sa].forEach(u=>u(i,s)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Xe(i.keywords,t.case_insensitive)),l.keywordPatternRe=e(c,!0),s&&(i.begin||(i.begin=/\B|\b/),l.beginRe=e(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=e(l.end)),l.terminatorEnd=Nt(l.end)||"",i.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(l.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ma(u==="self"?i:u)})),i.contains.forEach(function(u){r(u,l)}),i.starts&&r(i.starts,s),l.matcher=a(l),l}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=pt(t.classNameAliases||{}),r(t)}function Ye(t){return t?t.endsWithParent||Ye(t.starts):!1}function Ma(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return pt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ye(t)?pt(t,{starts:t.starts?pt(t.starts):null}):Object.isFrozen(t)?pt(t):t}var Oa="11.8.0";class $a extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const oe=Fe,Me=pt,Oe=Symbol("nomatch"),La=7,Qe=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:qo};function l(f){return s.noHighlightRe.test(f)}function c(f){let y=f.className+" ";y+=f.parentNode?f.parentNode.className:"";const k=s.languageDetectRe.exec(y);if(k){const T=M(k[1]);return T||(Ne(r.replace("{}",k[1])),Ne("Falling back to no-highlight mode for this block.",f)),T?k[1]:"no-highlight"}return y.split(/\s+/).find(T=>l(T)||M(T))}function u(f,y,k){let T="",H="";typeof y=="object"?(T=f,k=y.ignoreIllegals,H=y.language):(St("10.7.0","highlight(lang, code, ...args) has been deprecated."),St("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),H=f,T=y),k===void 0&&(k=!0);const R={code:T,language:H};z("before:highlight",R);const V=R.result?R.result:d(R.language,R.code,k);return V.code=R.code,z("after:highlight",V),V}function d(f,y,k,T){const H=Object.create(null);function R(O,_){return O.keywords[_]}function V(){if(!q.keywords){st.addText(et);return}let O=0;q.keywordPatternRe.lastIndex=0;let _=q.keywordPatternRe.exec(et),K="";for(;_;){K+=et.substring(O,_.index);const tt=at.case_insensitive?_[0].toLowerCase():_[0],it=R(q,tt);if(it){const[mt,to]=it;if(st.addText(K),K="",H[tt]=(H[tt]||0)+1,H[tt]<=La&&(Gt+=to),mt.startsWith("_"))K+=_[0];else{const eo=at.classNameAliases[mt]||mt;X(_[0],eo)}}else K+=_[0];O=q.keywordPatternRe.lastIndex,_=q.keywordPatternRe.exec(et)}K+=et.substring(O),st.addText(K)}function J(){if(et==="")return;let O=null;if(typeof q.subLanguage=="string"){if(!e[q.subLanguage]){st.addText(et);return}O=d(q.subLanguage,et,!0,Ce[q.subLanguage]),Ce[q.subLanguage]=O._top}else O=p(et,q.subLanguage.length?q.subLanguage:null);q.relevance>0&&(Gt+=O.relevance),st.__addSublanguage(O._emitter,O.language)}function N(){q.subLanguage!=null?J():V(),et=""}function X(O,_){O!==""&&(st.startScope(_),st.addText(O),st.endScope())}function nt(O,_){let K=1;const tt=_.length-1;for(;K<=tt;){if(!O._emit[K]){K++;continue}const it=at.classNameAliases[O[K]]||O[K],mt=_[K];it?X(mt,it):(et=mt,V(),et=""),K++}}function Z(O,_){return O.scope&&typeof O.scope=="string"&&st.openNode(at.classNameAliases[O.scope]||O.scope),O.beginScope&&(O.beginScope._wrap?(X(et,at.classNameAliases[O.beginScope._wrap]||O.beginScope._wrap),et=""):O.beginScope._multi&&(nt(O.beginScope,_),et="")),q=Object.create(O,{parent:{value:q}}),q}function Y(O,_,K){let tt=Zo(O.endRe,K);if(tt){if(O["on:end"]){const it=new De(O);O["on:end"](_,it),it.isMatchIgnored&&(tt=!1)}if(tt){for(;O.endsParent&&O.parent;)O=O.parent;return O}}if(O.endsWithParent)return Y(O.parent,_,K)}function rt(O){return q.matcher.regexIndex===0?(et+=O[0],1):(te=!0,0)}function ct(O){const _=O[0],K=O.rule,tt=new De(K),it=[K.__beforeBegin,K["on:begin"]];for(const mt of it)if(mt&&(mt(O,tt),tt.isMatchIgnored))return rt(_);return K.skip?et+=_:(K.excludeBegin&&(et+=_),N(),!K.returnBegin&&!K.excludeBegin&&(et=_)),Z(K,O),K.returnBegin?0:_.length}function lt(O){const _=O[0],K=y.substring(O.index),tt=Y(q,O,K);if(!tt)return Oe;const it=q;q.endScope&&q.endScope._wrap?(N(),X(_,q.endScope._wrap)):q.endScope&&q.endScope._multi?(N(),nt(q.endScope,O)):it.skip?et+=_:(it.returnEnd||it.excludeEnd||(et+=_),N(),it.excludeEnd&&(et=_));do q.scope&&st.closeNode(),!q.skip&&!q.subLanguage&&(Gt+=q.relevance),q=q.parent;while(q!==tt.parent);return tt.starts&&Z(tt.starts,O),it.returnEnd?0:_.length}function Dt(){const O=[];for(let _=q;_!==at;_=_.parent)_.scope&&O.unshift(_.scope);O.forEach(_=>st.openNode(_))}let ut={};function Q(O,_){const K=_&&_[0];if(et+=O,K==null)return N(),0;if(ut.type==="begin"&&_.type==="end"&&ut.index===_.index&&K===""){if(et+=y.slice(_.index,_.index+1),!a){const tt=new Error(`0 width match regex (${f})`);throw tt.languageName=f,tt.badRule=ut.rule,tt}return 1}if(ut=_,_.type==="begin")return ct(_);if(_.type==="illegal"&&!k){const tt=new Error('Illegal lexeme "'+K+'" for mode "'+(q.scope||"<unnamed>")+'"');throw tt.mode=q,tt}else if(_.type==="end"){const tt=lt(_);if(tt!==Oe)return tt}if(_.type==="illegal"&&K==="")return 1;if(Qt>1e5&&Qt>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=K,K.length}const at=M(f);if(!at)throw ht(r.replace("{}",f)),new Error('Unknown language: "'+f+'"');const jt=Na(at);let Yt="",q=T||jt;const Ce={},st=new s.__emitter(s);Dt();let et="",Gt=0,gt=0,Qt=0,te=!1;try{if(at.__emitTokens)at.__emitTokens(y,st);else{for(q.matcher.considerAll();;){Qt++,te?te=!1:q.matcher.considerAll(),q.matcher.lastIndex=gt;const O=q.matcher.exec(y);if(!O)break;const _=y.substring(gt,O.index),K=Q(_,O);gt=O.index+K}Q(y.substring(gt))}return st.finalize(),Yt=st.toHTML(),{language:f,value:Yt,relevance:Gt,illegal:!1,_emitter:st,_top:q}}catch(O){if(O.message&&O.message.includes("Illegal"))return{language:f,value:oe(y),illegal:!0,relevance:0,_illegalBy:{message:O.message,index:gt,context:y.slice(gt-100,gt+100),mode:O.mode,resultSoFar:Yt},_emitter:st};if(a)return{language:f,value:oe(y),illegal:!1,relevance:0,errorRaised:O,_emitter:st,_top:q};throw O}}function m(f){const y={value:oe(f),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return y._emitter.addText(f),y}function p(f,y){y=y||s.languages||Object.keys(e);const k=m(f),T=y.filter(M).filter(L).map(N=>d(N,f,!1));T.unshift(k);const H=T.sort((N,X)=>{if(N.relevance!==X.relevance)return X.relevance-N.relevance;if(N.language&&X.language){if(M(N.language).supersetOf===X.language)return 1;if(M(X.language).supersetOf===N.language)return-1}return 0}),[R,V]=H,J=R;return J.secondBest=V,J}function b(f,y,k){const T=y&&n[y]||k;f.classList.add("hljs"),f.classList.add(`language-${T}`)}function g(f){let y=null;const k=c(f);if(l(k))return;if(z("before:highlightElement",{el:f,language:k}),f.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(f)),s.throwUnescapedHTML))throw new $a("One of your code blocks includes unescaped HTML.",f.innerHTML);y=f;const T=y.textContent,H=k?u(T,{language:k,ignoreIllegals:!0}):p(T);f.innerHTML=H.value,b(f,k,H.language),f.result={language:H.language,re:H.relevance,relevance:H.relevance},H.secondBest&&(f.secondBest={language:H.secondBest.language,relevance:H.secondBest.relevance}),z("after:highlightElement",{el:f,result:H,text:T})}function h(f){s=Me(s,f)}const x=()=>{S(),St("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function v(){S(),St("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let w=!1;function S(){if(document.readyState==="loading"){w=!0;return}document.querySelectorAll(s.cssSelector).forEach(g)}function E(){w&&S()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",E,!1);function D(f,y){let k=null;try{k=y(t)}catch(T){if(ht("Language definition for '{}' could not be registered.".replace("{}",f)),a)ht(T);else throw T;k=i}k.name||(k.name=f),e[f]=k,k.rawDefinition=y.bind(null,t),k.aliases&&$(k.aliases,{languageName:f})}function A(f){delete e[f];for(const y of Object.keys(n))n[y]===f&&delete n[y]}function I(){return Object.keys(e)}function M(f){return f=(f||"").toLowerCase(),e[f]||e[n[f]]}function $(f,{languageName:y}){typeof f=="string"&&(f=[f]),f.forEach(k=>{n[k.toLowerCase()]=y})}function L(f){const y=M(f);return y&&!y.disableAutodetect}function j(f){f["before:highlightBlock"]&&!f["before:highlightElement"]&&(f["before:highlightElement"]=y=>{f["before:highlightBlock"](Object.assign({block:y.el},y))}),f["after:highlightBlock"]&&!f["after:highlightElement"]&&(f["after:highlightElement"]=y=>{f["after:highlightBlock"](Object.assign({block:y.el},y))})}function G(f){j(f),o.push(f)}function U(f){const y=o.indexOf(f);y!==-1&&o.splice(y,1)}function z(f,y){const k=f;o.forEach(function(T){T[k]&&T[k](y)})}function C(f){return St("10.7.0","highlightBlock will be removed entirely in v12.0"),St("10.7.0","Please use highlightElement now."),g(f)}Object.assign(t,{highlight:u,highlightAuto:p,highlightAll:S,highlightElement:g,highlightBlock:C,configure:h,initHighlighting:x,initHighlightingOnLoad:v,registerLanguage:D,unregisterLanguage:A,listLanguages:I,getLanguage:M,registerAliases:$,autoDetection:L,inherit:Me,addPlugin:G,removePlugin:U}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=Oa,t.regex={concat:xt,lookahead:Ue,either:ue,optional:Ko,anyNumberOfTimes:Wo};for(const f in Ut)typeof Ut[f]=="object"&&He(Ut[f]);return Object.assign(t,Ut),t},Ct=Qe({});Ct.newInstance=()=>Qe({});var Pa=Ct;Ct.HighlightJS=Ct;Ct.default=Ct;const It=Fo(Pa),$e="[A-Za-z$_][0-9A-Za-z$_]*",za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ra=["true","false","null","undefined","NaN","Infinity"],tn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],en=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],_a=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ja=[].concat(nn,tn,en);function on(t){const e=t.regex,n=(y,{after:k})=>{const T="</"+y[0].slice(1);return y.input.indexOf(T,k)!==-1},o=$e,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(y,k)=>{const T=y[0].length+y.index,H=y.input[T];if(H==="<"||H===","){k.ignoreMatch();return}H===">"&&(n(y,{after:T})||k.ignoreMatch());let R;const V=y.input.substring(T);if(R=V.match(/^\s*=/)){k.ignoreMatch();return}if((R=V.match(/^\s+extends\s+/))&&R.index===0){k.ignoreMatch();return}}},s={$pattern:$e,keyword:za,literal:Ra,built_in:ja,"variable.language":_a},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},m={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},p={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,m]},v={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},w=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,p,b,g,h,{match:/\$\d+/},d];m.contains=w.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(w)});const S=[].concat(v,m.contains),E=S.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(S)}]),D={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:E},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...tn,...en]}},M={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},$={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},L={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(y){return e.concat("(?!",y.join("|"),")")}const G={match:e.concat(/\b/,j([...nn,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},U={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",f={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),M,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,p,b,g,h,v,{match:/\$\d+/},d,I,{className:"attr",begin:o+e.lookahead(":"),relevance:0},f,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[v,t.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},$,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},U,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},G,L,A,z,{match:/\$[(.]/}]}}function Ga(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ha=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return It.registerLanguage("javascript",on),It.registerLanguage("sh",Ga),function({text:i,language:s="js"}){const l=a({class:`hljs language-${s}`});return l.innerHTML=It.highlight(i,{language:s}).value,o({class:n`
          display: inline-block;
        `},l)}};function Fa(t){const{bau:e,css:n}=t,{article:o,h1:a,p:r,code:i,a:s,ul:l,li:c}=e.tags,u=Ha(t);return function(){return o({class:n`
          background-color: var(--background-color);
        `},a("Getting Started"),r("Grab the source code template for Javascript or Typescript"),u({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),r("Install the dependencies with the package manager of your choice:"),u({text:`cd my-bau-project
npm install`}),r("This template project is built with Vite. To start a development server:"),u({text:"npm run dev"}),r("The application starting point is at ",i("src/main.ts")),r("let's see how to add a ",s({href:"components/button"},"button component")," , first of all,  import the button:"),u({text:'import button from "@grucloud/bau-ui/button";'}),r("Then, create an instance of this ",s({href:"components/button"},"button")," by passing the context object:"),u({text:"const Button = button(context);"}),r("Last step is to place the button into the tree of component:"),u({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),r("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),r("Further reading:",l(c(s({href:"components"},"Visit the component gallery")),c(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function pe(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
    border: 1px solid transparent;
    height: fit-content;
    border-radius: var(--global-radius);
    margin: 1rem 0;
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("paper",l,r,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}function an(t,e={}){const{bau:n,css:o,window:a}=t,{nav:r,ul:i,li:s,a:l}=n.tags,{headerSelector:c="h2,h3"}=e,u=n.state("no"),d=(h,x)=>{let v=null;return(...w)=>{a.clearTimeout(v),v=a.setTimeout(()=>h(...w),x)}},m=o`
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
  `,p=({value:h,id:x,children:v=[]})=>{const w=l({class:()=>u.val==x?"active":"",href:`#${x}`});return w.innerHTML=h,s({class:()=>u.val==x?"active":""},w,v.length>0&&i(v.map(p)))},b=h=>h.tagName.charAt(1),g=({contentEl:h})=>{const x=h.querySelectorAll(c);let v=2,w={},S={children:[]},E=S;const D=E;let A=[E];return[...x].forEach(I=>{const M=b(I);I.setAttribute("id",I.textContent),!I.innerHTML.includes("<button")&&(w={value:I.innerHTML,id:I.id??I.textContent,children:[]},v==M?(S=w,E.children.push(S)):v<M?(A.push(E),E=S,S.children.push(w),S=w):v>M&&(E=A[M-1],A=A.slice(0,M-1),E.children.push(w),S=w),v=M)}),D};return function(...x){let[{size:v=e.size??"md",variant:w=e.variant??"plain",color:S=e.color??"neutral",contentEl:E,...D}]=W(x);const A=g({contentEl:E}),I=d(()=>{const $=[...E.querySelectorAll(c)].find(L=>{const{top:j,height:G}=L.getBoundingClientRect();if(j+G>60)return!0});$&&(u.val=$==null?void 0:$.id)},100);return r({...D,class:B("tableOfContent",v,w,S,m,e==null?void 0:e.class,D==null?void 0:D.class),bauMounted:()=>{a.addEventListener("scroll",I)},bauUnmounted:()=>{a.removeEventListener("scroll",I)}},A.children&&i(A.children.map(p)))}}const rn=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:r,tr:i,td:s,thead:l,th:c}=e.tags;return function({Item:d,name:m}){return o({class:n`
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
        `},a(l(i(c(m??""),ot.map(p=>c(p)))),r(To.map(p=>i(c(p),ot.map((b,g)=>s(d({color:b,variant:p},{index:g}))))))))}},Ua=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:r}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Do.map((i,s)=>r(t,{size:i})({color:"success",variant:"outline"},{size:i,index:s})))}},F=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:r,h1:i,p:s,h2:l,h3:c,pre:u,code:d}=e.tags;It.registerLanguage("javascript",on);const m=an(t),p=pe(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),b=rn(t),g=Ua(t),h=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=It.highlight(x,{language:"js"}).value}}));return function(v){const w=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(v.title),s(v.description),v.gridItem&&!v.variantColorTableDisable&&[l("Variant/Color"),p(b({Item:v.gridItem(t)}))],v.gridItem&&!v.variantSizeDisable&&[l("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),p(g({item:v.gridItem}))],l("Usage"),c("Import"),h({text:v.importStatement}),l("Examples"),v.examples.map(S=>r(c(S.title),s(S.description),p(S.createComponent(t)({})),h({text:S.code}))));return o({class:n`
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
        `},w,m({contentEl:w}))}};function be(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?s(c):l(c))};function s(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:p=e.color??"neutral",Header:b,Content:g,expanded:h=!1,...x}]=W(u);const v=n.state(!h);return a({...x,class:B("collapsible",d,r,e==null?void 0:e.class,x==null?void 0:x.class)},a({class:()=>B("header",g?v.val?"close":"open":""),onclick:w=>{v.val=!v.val,w.stopPropagation()}},b()),a({class:"content",role:"region",bauMounted:({element:w})=>{v.val&&(w.style.height="0px")},"aria-expanded":({element:w})=>(i({element:w,closeState:v}),!v.val)},g&&g()))}}const Va=()=>ot.map(t=>`
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
`);function Kt(t,e={}){const{bau:n,css:o}=t,{div:a,ul:r,li:i,h3:s,button:l}=n.tags,c=o`
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
    ${Va()}
  `;return function(...d){let[{size:m=e.size??"md",variant:p=e.variant??"plain",color:b=e.color??"neutral",data:g=[],...h}]=W(d);const x=n.state(""),v=be(t,{size:m,variant:p,color:b}),w=E=>D=>{x.val==E?x.val="":x.val=E},S=E=>{const{Header:D,Content:A,name:I}=E,M=()=>s({class:()=>B(x.val==I&&"active")},l({type:"button","aria-controls":`bau-${I}`,"aria-expanded":({element:L})=>x.val==I},D(E))),$=()=>a({id:`bau-${I}`,"data-state":({element:L})=>x.val==I},A(E));return i({class:B(b,p,m),onclick:w(I)},v({Header:M,Content:$}))};return a({class:B("accordion",c,e==null?void 0:e.class,h.class)},r(g.map(S)))}}const sn=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Kt(t,e);return s=>i({...s,data:r})},Ja=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Kt(t,{color:"neutral",variant:"outline"});return()=>a(i({data:r}))},qa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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

  const Accordion = accordion(context, {
    color: "neutral",
    variant: "outline",
  });

  return () => section(Accordion({ data: accordionDefs }));
};
`,cn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Wa=t=>{const{css:e}=t,n=cn(t),o=Kt(t,{color:"warning",class:e`
      &.accordion {
        & ul {
          & li {
            width: fit-content;
          }
        }
      }
    `});return()=>o({data:n})},Ka=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context, {
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

  return () =>
    Accordion({
      data: accordionDefs,
    });
};
`,Xa=t=>{const{css:e}=t,n=cn(t),o=Kt(t,{color:"success",variant:"outline",class:e`
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
    `});return()=>o({data:n})},Za=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context, {
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

  return () =>
    Accordion({
      data: accordionDefs,
    });
};
`,Ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:qa,createComponent:Ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ka,createComponent:Wa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:Xa}],gridItem:sn},Qa=t=>{const e=F(t);return()=>e(Ya)},tr={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},er=()=>ot.map(t=>`
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
  &.plain.${t} {
    & .icon {
      color: var(--color-${t})
    }
  }
  &.outline.${t} {
    & .icon {
      color: var(--color-${t})
    }
  }
}
  `).join(`
`);function Et(t,e={}){const{bau:n,css:o}=t,{div:a,i:r}=n.tags,i=o`
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
    ${er()}
  `,s=P(t),l=({onclick:c})=>s({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"outline",color:p=e.color??"neutral",onRemove:b,...g},...h]=W(u);return a({...g,class:B("alert",`alert-${m}`,e.class,m,p,d,i,g.class),role:"alert"},r({class:"icon"},tr[p]),a({class:"content"},...h),b&&l({onclick:b}))}}const ln=(t,e)=>{const n=Et(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},nr=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=Et(t,{color:"danger"});return()=>a(n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},or=`import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { h4, p } = bau.tags;

  const Alert = alert(context, {
    color: "danger",
  });

  return () =>
    Alert(
      h4("Something went wrong"),
      p("Error code ", 404),
      p("Status ", "Not Found")
    );
};
`,ar=t=>{const{css:e}=t,n=Et(t,{color:"warning",class:e`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n("Your coffee supply is getting low.")},rr=`import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { css } = context;

  const Alert = alert(context, {
    color: "warning",
    class: css\`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    \`,
  });

  return () => Alert("Your coffee supply is getting low.");
};
`,sr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:or,createComponent:nr},{title:"Custom Alert ",description:"A custom alert.",code:rr,createComponent:ar}],gridItem:ln},ir=t=>{const e=F(t);return()=>e(sr)},cr=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:r=10,deleteAfterDuration:i=15e3}=e,{div:s}=n.tags,l=n.state([]),c={inserting:a`
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
      animation: ${c.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${c.removing} var(--transition-slow) ease-out;
    `},d=({id:m,status:p})=>{const b=l.val.findIndex(g=>g.id===m);b!=-1&&(l.val[b].status=p)};return function(p={},...b){const g=({id:v})=>{d({id:v,status:"removing"});const w=l.val.findIndex(S=>S.id===v);w!=-1&&l.val.splice(w,1)},h=({Component:v})=>{const w={id:Math.random().toString(10).split(".")[1],Component:v,status:"inserting"};l.val.length>=r&&g({id:l.val[0].id}),l.val.push(w),setTimeout(()=>g(w),i)},x=v=>s({class:u.item,onclick:()=>g(v)},v.Component());return document.addEventListener("alert.add",v=>h(v.detail)),document.addEventListener("alert.remove",v=>g(v.detail)),s({class:B(u.stack,e==null?void 0:e.class,p.class)},n.loop(l,s(),x))}},lr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=cr(t,{deleteAfterDuration:2e4}),r=P(t),i=Et(t);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},ur=`import { Context } from "@grucloud/bau-ui/context";
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
`,dr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ur,createComponent:lr}]},mr=t=>{const e=F(t);return()=>e(dr)},pr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,r=qt(t),i=P(t),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=e.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),r({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},br=`import animate from "@grucloud/bau-ui/animate";
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
`,gr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:r,label:i}=e.tags,s=qt(t),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=e.state("one"),u=({target:m})=>c.val=m.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",r({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",r({type:"radio",id:"two",name:"radio",value:c,oninput:u})),s({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},fr=`import animate from "@grucloud/bau-ui/animate";
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
`,hr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:br,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:fr,createComponent:gr}]},vr=t=>{const e=F(t);return()=>e(hr)};function kt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:r}=n.tags,i=a`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  `,s=o`
    background-color: var(--color-emphasis-200);
    position: relative;
    overflow: hidden;
    &::after {
      animation: 2s linear 0.5s infinite normal none running ${i};
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",...p},...b]=W(c);return r({...p,class:B("skeleton",u,s,e==null?void 0:e.class,p==null?void 0:p.class)},...b)}}function ge(t,e={}){const{bau:n,css:o}=t,{div:a,img:r}=n.tags,i=n.state(!0),s=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,s.val=!0},u=o`
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
  `;return function(...m){let[{size:p=e.size??"md",variant:b=e.variant??"plain",color:g=e.color??"neutral",width:h=40,height:x=40,alt:v,...w},...S]=W(m);const E=kt(t,{class:B(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${h}px;
        `,e==null?void 0:e.class,w.class)});return a({class:B(u,e==null?void 0:e.class,w.class)},()=>i.val&&E(),()=>s.val&&v,r({alt:v,width:h,height:x,onload:l,onerror:c,class:()=>B(!i.val&&"visible",s.val&&"hide",g,b,p,u,e==null?void 0:e.class,w.class),...w}))}}const un=(t,e)=>{const{css:n}=t,o=ge(t,{...e,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},xr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=ge(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},yr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Sr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=ge(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",alt:"My Avatar"}))},wr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:yr,createComponent:xr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:wr,createComponent:Sr}],gridItem:un},kr=t=>{const e=F(t);return()=>e(Cr)};function $t(t,e){const{bau:n,css:o,window:a}=t,{dialog:r}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...l){let[{contentEl:c,triggerEl:u,onClose:d,...m},...p]=W(l);const b=x=>{h.style.opacity=1,h.showModal();const v=u.getBoundingClientRect(),w=h.getBoundingClientRect();v.x<a.innerWidth/2?h.style.left=v.left+"px":h.style.left=v.right-w.width+"px",v.y<a.innerHeight/2?(h.style.top=v.top+v.height+"px",h.style.height=Math.min(h.scrollHeight,a.innerHeight-v.top-v.height)+"px"):(h.style.top=Math.max(0,v.top-w.height)+"px",h.scrollHeight>v.top&&(h.style.height=v.top+"px"))},g=x=>{const v=()=>{h.close(),h.removeEventListener("transitionend",v)};h.addEventListener("transitionend",v),h.style.opacity=0},h=r({role:"presentation",class:B("popover",i,e==null?void 0:e.class,m==null?void 0:m.class),onclick:x=>{x.target===h&&(g(),d==null||d.call())}},c);return h.closeDialog=g,h.openDialog=b,h}}const Vt={sm:12,md:16,lg:24},Er=()=>ot.map(t=>`
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
  background-color: transparent;
  & .path {
    stroke: var(--font-color-inverse);
  }
}
`).join(`
`);function bt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:r,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
    100% {
      transform: rotate(360deg);
    }
  `,l=a`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:m=e.variant??"outline",visibility:p=!0,...b}={}){const g=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${Vt[u]};
      height: ${Vt[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${Er()}
    `;return r({class:{deps:[p],renderProp:()=>h=>B("spinner",g,d,m,h==!1?"":"visibility",e==null?void 0:e.class,b.class)},version:"1.1",x:"0px",y:"0px",width:Vt[u],height:Vt[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...b},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Tr=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Xt(t,e={}){const{bau:n,css:o}=t,{div:a,li:r}=n.tags,i=o`
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

    ${Tr()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:m,placeholder:p,Option:b,options:g,defaultOption:h,getOptionLabel:x,getOptionValue:v,onSelect:w=()=>{},id:S,required:E,name:D,loading:A,...I},...M]=W(l);const $=$t(t),L=P(t),j=dt(t,{variant:u,color:d,size:c}),G=vt(t),U=bt(t,{variant:u,color:d,size:c}),z=n.state(h),C=n.state(I.value),f=n.state(!1),y=n.state(0),k=()=>{f.val=!1},T=n.state(g),H=Q=>at=>Q.val&&x(at)==x(Q.val),R=()=>{ut.openDialog(),f.val=!0,C.val="",T.val=g,y.val=g.findIndex(H(z));const Q=Dt.querySelector("li.selected");Q&&(Q.scrollIntoView({block:"center"}),ct.scrollIntoView({block:"end"}))},V=()=>{ut.closeDialog(),f.val=!1,y.val=0},J=Q=>{const{value:at}=Q.target;C.val=at,at?T.val=g.filter(jt=>x(jt).match(new RegExp(`${at}`,"i"))):T.val=g},N=Q=>{ut.open?V():R()},X=Q=>{z.val=Q,lt.value=v(Q)},nt=({option:Q,index:at})=>jt=>{X(Q),y.val=at,V()},Z=()=>{const Q=Dt.querySelector("li.active");Q&&Q.scrollIntoView({block:"center",behavior:"smooth"})},Y=Q=>{switch(Q.key){case"Escape":V();break;case"ArrowDown":y.val<T.val.length-1?y.val++:y.val=0,Z();break;case"ArrowUp":y.val<=0?y.val=T.val.length-1:y.val--,Z();break;case"Enter":ut.open?(X(T.val[y.val]),V()):R(),Q.preventDefault();break}},rt=L({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":f,"aria-label":m,onclick:N,variant:u,color:d,size:c,class:A==!0&&"loading",disabled:A},()=>z.val?x(z.val):m,()=>A==!0&&U({visibility:A})),ct=j({value:C,placeholder:p,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":f,oninput:J,onkeydown:Y,name:`${D}-search`,...I}),lt=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:h&&v(h),required:E,name:D,"aria-hidden":!1,"aria-label":D}),Dt=a({class:B(u,d,c,"content")},ct,()=>G({class:B(u,d,c)},T.val.map((Q,at)=>r({class:()=>B(y.val==at&&"active",H(z)(Q)&&"selected"),onclick:nt({option:Q,index:at})},b(Q))))),ut=$({id:S,triggerEl:rt,contentEl:Dt,onClose:k,class:o`
        overflow: hidden;
      `});return a({...I,class:B("autocomplete",i,e==null?void 0:e.class,I==null?void 0:I.class)},n.bind({deps:[z],render:()=>Q=>{Q&&(lt.value=v(Q),w(Q))}}),rt,lt,ut)}}const dn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:r}=n.tags,i=Xt(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",name:"country","aria-label":"country"})},Dr=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:r,article:i,footer:s}=e.tags,l=Xt(t),c=P(t,{variant:"outline",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],d=p=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(p.label),a(p.code)),m=p=>{p.preventDefault();const b=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(b))};return()=>r({onsubmit:m},i(l({options:u,Option:d,getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",name:"country"})),s(c({type:"submit"},"Submit")))},Ar=`import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, span, form, article, footer } = bau.tags;

  const Autocomplete = autocomplete(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        Autocomplete({
          options,
          Option,
          getOptionValue: ({ code }: any) => code,
          getOptionLabel: ({ label }: any) => label,
          label: "Country",
          placeholder: "Search countries",
          name: "country",
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Br=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Xt(t),c=P(t,{variant:"outline",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],m=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(b.label),s(b.code)),p=b=>{b.preventDefault();const g=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(g))};return()=>o({onsubmit:p},a(l({options:d,Option:m,defaultOption:d.find(({code:b})=>b==u),getOptionValue:({code:b})=>b,getOptionLabel:({label:b})=>b,label:"Country",placeholder:"Search countries",name:"country"})),r(c({type:"submit"},"Submit")))},Ir=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, div, span } = bau.tags;

  const Autocomplete = autocomplete(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        Autocomplete({
          options,
          Option,
          defaultOption: options.find(({ code }) => code == defaultCode),
          getOptionValue: ({ code }: any) => code,
          getOptionLabel: ({ label }: any) => label,
          label: "Country",
          placeholder: "Search countries",
          name: "country",
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Nr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=P(t,{variant:"outline"}),c=P(t,{variant:"solid",color:"primary"}),u=Xt(t),d=e.state([]),m=e.state(!1),p=e.state("");async function b({url:v,transform:w=S=>S}){try{m.val=!0;const S=await fetch(v,{});if(S.ok){const E=await S.json();d.val=w(E)}else p.val=S.statusText}catch(S){p.val=S.message}finally{m.val=!1}}const g=()=>b({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:v=>v.sort((w,S)=>w.name.common.localeCompare(S.name.common))});g();const h=v=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(v.flag),s(v.name.common)),x=v=>{v.preventDefault();const w=Object.fromEntries(new FormData(v.currentTarget));alert(JSON.stringify(w))};return()=>o({onsubmit:x},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({options:d.val,Option:h,getOptionValue:({name:v})=>v.common,getOptionLabel:({name:v})=>v.common,label:"Country",placeholder:"Search countries",name:"country",loading:m.val}),l({onclick:g},"Reload")),r(c({type:"submit"},"Submit")))},Mr=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, div, span } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };
  return () =>
    form(
      { onsubmit },
      article(
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
            name: "country",
            loading: loadingState.val,
          }),
        Button({ onclick: fetchCountries }, "Reload")
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,Or={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Ar,createComponent:Dr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Mr,createComponent:Nr},{title:"Default Option",description:"A autocomplete with a default option.",code:Ir,createComponent:Br}],gridItem:dn},$r=t=>{const e=F(t);return()=>e(Or)};function mn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},...p]=W(s);return a({...m,class:B("badge",r,e==null?void 0:e.class,m==null?void 0:m.class)},a({class:B(u,c,l)},d),...p)}}const pn=(t,e)=>{const n=mn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Lr=t=>{const{bau:e}=t,{section:n}=e.tags,o=mn(t);return()=>n(o({content:"10"},"☏"))},Pr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,zr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Pr,createComponent:Lr}],gridItem:pn},Rr=t=>{const e=F(t);return()=>e(zr)};function fe(t,e={}){const{bau:n,css:o,config:a}=t,{ul:r,li:i,span:s}=n.tags,{separator:l="〉"}=e,c=P(t),u=o`
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
        content: "${l}";
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
  `;return function(...m){let[{size:p=e.size??"md",variant:b=e.variant??"plain",color:g=e.color??"neutral",items:h,...x},...v]=W(m);return r({...x,class:B(u,e==null?void 0:e.class,x==null?void 0:x.class)},h.map(({href:w,name:S})=>i((w!=null?c:s)({href:`${a.base}${w}`,color:g,variant:b,size:p,class:B(g,b,p)},S))))}}const bn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=fe(t,e);return a=>o({...a,...n})},_r=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=fe(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},jr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Gr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=fe(t,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Hr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Fr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:jr,createComponent:_r},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Hr,createComponent:Gr}],gridItem:bn},Ur=t=>{const e=F(t);return()=>e(Fr)},gn=(t,e={})=>{const n=P(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Vr=t=>{const{bau:e}=t,{section:n}=e.tags,o=P(t,{color:"primary",variant:"outline"}),a=()=>{alert("Click")};return()=>n(o({onclick:a},"Click me"))},Jr=`import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context, { color: "primary", variant: "outline" });
  const onclick = () => {
    alert("Click");
  };
  return () =>
    section(
      //
      Button({ onclick }, "Click me")
    );
};
`,qr=t=>{const{bau:e}=t,{section:n}=e.tags,o=P(t,{color:"primary",variant:"outline"}),a=()=>{alert("Click")};return()=>n(o({disabled:!0,onclick:a},"Click me"))},Wr=`import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context, { color: "primary", variant: "outline" });
  const onclick = () => {
    alert("Click");
  };
  return () =>
    section(
      //
      Button({ disabled: true, onclick }, "Click me")
    );
};
`,Kr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Jr,createComponent:Vr},{title:"Disabled Button",description:"A disabled button.",code:Wr,createComponent:qr}],gridItem:gn},Xr=t=>{const e=F(t);return()=>e(Kr)},Zr=()=>ot.map(t=>`
&.button-group.${t} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}) !important;
  }
  & .button:not(:first-child) { 
    border-left: 1px solid var(--color-${t}) !important;
  }
}

&.button-group.outline.${t} {
  border: none;
}

&.button-group.solid.${t} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function he(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
    ${Zr()}
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("button-group",c,u,l,r,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}const fn=(t,e)=>{const n=["ONE","TWO","THREE"],o=P(t,e),a=he(t,e);return r=>a({...r},n.map(i=>o(r,i)))},Yr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a="primary",r="solid",i=P(t,{color:a,variant:r}),s=he(t,{color:a,variant:r}),l=c=>u=>{alert(c)};return()=>n(s(o.map(c=>i({onclick:l(c)},c))))},Qr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const groups = ["ONE", "TWO", "THREE"];

  const color = "primary";
  const variant = "solid";

  const Button = button(context, { color, variant });
  const ButtonGroup = buttonGroup(context, { color, variant });

  const onClick = (group: string) => (_event: any) => {
    alert(group);
  };

  return () =>
    section(
      ButtonGroup(
        groups.map((group) => Button({ onclick: onClick(group) }, group))
      )
    );
};
`,ts={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Qr,createComponent:Yr}],gridItem:fn},es=t=>{const e=F(t);return()=>e(ts)};function hn(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ot.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},...p]=W(l);return a({...m,type:"date",class:B("calendar",i,d,u,c,e==null?void 0:e.class,m==null?void 0:m.class)},...p)}}const vn=(t,e)=>{const n=hn(t,e),o=({props:a={},options:r={}})=>`myinput-gallery-${a.color??r.color}-${a.variant??r.variant}-${a.size??r.size}`;return a=>n({"aria-label":o({props:a,options:e}),...a})},ns=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),r=hn(t);return()=>n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},os=`import calendar from "@grucloud/bau-ui/calendar";
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
`,as={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:os,createComponent:ns}],gridItem:vn},rs=t=>{const e=F(t);return()=>e(as)};function ss(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:m,Slide:p,Previous:b,Next:g,...h}]=W(l);const x=()=>{i.val<=0?i.val=m.length-1:i.val--},v=()=>{i.val>=m.length-1?i.val=0:i.val++},w=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},m.map(p));return a({...h,class:B("carousel",c,r,e==null?void 0:e.class,h==null?void 0:h.class)},a({class:B("control","control-previous"),onclick:x},b()),a({class:B("control","control-next"),onclick:v},g()),w)}}const is=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],cs=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,r=P(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),s=ss(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),l=()=>r("◀"),c=()=>r("▶");return()=>o(s({slides:is,Slide:i,Previous:l,Next:c}))},ls=`import carousel from "@grucloud/bau-ui/carousel";
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
`,us={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ls,createComponent:cs}]},ds=t=>{const e=F(t);return()=>e(us)},xn=(t,e)=>{const n=Ot(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ms=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ot(t,{variant:"outline",color:"primary"});return()=>n(o("My Chip"))},ps=`import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Chip = chip(context, { variant: "outline", color: "primary" });

  return () =>
    section(
      //
      Chip("My Chip")
    );
};
`,bs={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ps,createComponent:ms}],gridItem:xn},gs=t=>{const e=F(t);return()=>e(bs)};function Tt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    margin: 0.5rem;
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
    &:indeterminate::after {
      content: "\u2796";
      opacity: 1;
    }
    &:disabled {
      border: 2px dashed var(--color-gray-500);
    }
    &:checked::after {
      content: "\u2716";
      opacity: 1;
    }
    &::after {
      content: "";
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({type:"checkbox",...d,class:B(r,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)})}}const yn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,r=Tt(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,r({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},fs=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,label:i}=e.tags,s=Tt(t,{color:"neutral",variant:"outline"}),l=P(t,{variant:"outline",color:"primary"}),c=e.state(!1),u=m=>{c.val=!!m.target.checked},d=m=>{m.preventDefault();const p=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(p))};return()=>o({onsubmit:d},a(i({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",s({name:"myCheckbox",checked:c,onchange:u}))),r(l({type:"submit"},"Submit")))},hs=`import { Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, label } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const checkboxState = bau.state(false);

  const onChange = (event: any) => {
    checkboxState.val = event.target.checked ? true : false;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
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
            name: "myCheckbox",
            checked: checkboxState,
            onchange: onChange,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,vs=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:r,form:i}=e.tags,s=Tt(t,{color:"neutral",variant:"outline"}),l=P(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))};return()=>i({onsubmit:c,class:n`
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
        `},r(o("My Checkbox",s({name:"my-checkbox-uncontrolled"}))),a(l({type:"submit"},"Submit")))},xs=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, footer, article, form } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
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
      article(
        label(
          "My Checkbox",
          Checkbox({
            name: "my-checkbox-uncontrolled",
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,ys=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:r,form:i}=e.tags,s=Tt(t,{color:"neutral",variant:"outline"}),l=P(t,{variant:"outline",color:"primary"}),c=P(t,{variant:"solid",color:"primary"}),u=m=>{m.preventDefault();const p=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(p))},d=m=>{const p=window.document.getElementById("my-checkbox");p&&(p.indeterminate=!p.indeterminate)};return()=>i({onsubmit:u,class:n`
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
        `},r(o("My Checkbox",s({id:"my-checkbox",name:"my-checkbox"})),l({onclick:d},"Toggle Indeterminate")),a(c({type:"submit"},"Submit")))},Ss=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, footer, article, form } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });

  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const ButtonSubmit = button(context, {
    variant: "solid",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };
  const onclickIndeterminate = (_event: any) => {
    const checkboxEl = window.document.getElementById("my-checkbox");
    if (checkboxEl) {
      // @ts-ignore
      checkboxEl.indeterminate = !checkboxEl.indeterminate;
    }
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
      article(
        label(
          "My Checkbox",
          Checkbox({
            id: "my-checkbox",
            name: "my-checkbox",
          })
        ),
        Button({ onclick: onclickIndeterminate }, "Toggle Indeterminate")
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,ws={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:hs,createComponent:fs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:xs,createComponent:vs},{title:"Indeterminate checkbox",description:"An indeterminate checkbox.",code:Ss,createComponent:ys}],gridItem:yn},Cs=t=>{const e=F(t);return()=>e(ws)},ks=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=be(t),r=P(t,{variant:"outline"}),i=()=>r("Header"),s=()=>o("Content");return()=>n(a({Header:i,Content:s}))},Es=`import button from "@grucloud/bau-ui/button";
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
`,Ts={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Es,createComponent:ks}]},Ds=t=>{const e=F(t);return()=>e(Ts)};function As(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("divider",l,r,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:"content"},...m))}}const Bs=t=>{const{bau:e}=t,{section:n}=e.tags,o=As(t);return()=>n(o("OR"))},Is=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Ns={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Is,createComponent:Bs}],variantColorTableDisable:!0,variantSizeDisable:!0},Ms=t=>{const e=F(t);return()=>e(Ns)};function Os(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{color:l,variant:c="outline",size:u,openState:d,...m},...p]=W(s);return a({class:B(r,e==null?void 0:e.class,m.class)},a({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>B("content",d.val&&"content-open")},p))}}const $s=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),r=Os(t),i=P(t,{color:"neutral",variant:"outline"}),s=Ge(t);return()=>n(o("Click on the button to open and close the drawer."),i({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},s()))},Ls=`import drawer from "@grucloud/bau-ui/drawer";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import navBarMenu from "../../components/navBarMenu";

export default (context: Context) => {
  const { bau } = context;
  const { section, p } = bau.tags;

  const openState = bau.state(false);

  const Drawer = drawer(context);
  const Button = button(context, { color: "neutral", variant: "outline" });
  const NavBarMenu = navBarMenu(context);

  return () =>
    section(
      p("Click on the button to open and close the drawer."),
      Button(
        {
          onclick: () => {
            openState.val = !openState.val;
          },
        },
        "OPEN DRAWER"
      ),
      Drawer({ openState }, NavBarMenu())
    );
};
`,Ps={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ls,createComponent:$s}]},zs=t=>{const e=F(t);return()=>e(Ps)},Rs=()=>ot.map(t=>`
`).join(`
`);function Sn(t,e={}){const{bau:n,css:o}=t,{div:a,li:r}=n.tags,i=P(t),s=$t(t),l=vt(t),c=o`
    ${Rs()}
  `;return function(...d){let[{size:m=e.size??"md",variant:p=e.variant??"outline",color:b=e.color??"neutral",label:g,ListItem:h,items:x,...v},...w]=W(d);const S=n.state(0),E=()=>{G.openDialog(),G.focus()},D=()=>{G.closeDialog()},A=()=>{G.open?D():E()},I=U=>{A(),U.preventDefault()},M=({item:U,index:z})=>C=>{S.val=z,D(),C.preventDefault()},$=U=>{switch(U.preventDefault(),U.key){case"Escape":D();break;case"ArrowDown":S.val<options.length-1?S.val++:S.val=0;break;case"ArrowUp":S.val<=0?S.val=options.length-1:S.val--;break;case"Enter":A();break}},L=()=>l({tabindex:"0",class:B(b,p)},x.map((U,z)=>r({class:()=>B(S.val==z&&"active"),onclick:M({item:U,index:z})},h(U)))),j=i({type:"button",onclick:I,color:b,variant:p,size:m},g),G=s({triggerEl:j,contentEl:L()});return a({...v,class:B("dropdownMenu",b,m,c,e==null?void 0:e.class,v==null?void 0:v.class),onkeydown:$},j,G)}}const _s=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,r=Sn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o(a(l.label));return l=>r({...l,items:i,ListItem:s,label:"Action"})},js=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,r=Sn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(r({items:i,ListItem:s,label:"Action"}))},Gs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Hs={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Gs,createComponent:js}],gridItem:_s},Fs=t=>{const e=F(t);return()=>e(Hs)},wn=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=ie(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Us=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=ie(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Vs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Js={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Vs,createComponent:Us}],gridItem:(t,e)=>wn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},qs=t=>{const e=F(t);return()=>e(Js)};function Cn(t,e={}){const{bau:n,css:o}=t,{div:a,label:r,input:i}=n.tags,s={base:o`
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
    `};return function(c,...u){const{size:d=e.size??"md",variant:m=e.variant??"outline",color:p=e.color??"neutral",Component:b,disabled:g,...h}=c;return a({class:B(s.base,g&&s.disabled,e==null?void 0:e.class,c.class)},r({class:B(m,p,d)},b({disabled:g}),i({type:"file",disabled:g,...h})))}}const kn=(t,e)=>{const{tr:n,bau:o,css:a,config:r}=t,{svg:i,use:s}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=Cn(t,e),m=b=>{const g=b.target.files[0];g?u.val=g.name:u.val="No file selected"},p=({disabled:b})=>l({class:B(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${r.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return b=>d({Component:p,name:"file",accept:"text/*",onchange:m,...b})},Ws=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:r,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,span:c}=n.tags,u=n.state("No file selected"),d=Cn(t),m=b=>{const g=b.target.files[0];g?u.val=g.name:u.val="No file selected"},p=({disabled:b})=>l({class:B(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return()=>s(d({Component:p,name:"file",accept:"text/*",onchange:m}),l("File selected: ",u))},Ks=`import classNames from "@grucloud/bau-css/classNames";
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
`,Xs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Ks,createComponent:Ws}],gridItem:kn},Zs=t=>{const e=F(t);return()=>e(Xs)};function yt(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,r=o`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;
    & > header {
      & h1 {
        font-size: 1.3rem;
      }
    }
    & section,
    article {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    &
      label:has(
        :is(input[type="text"], input[type="password"], input[type="email"])
      ),
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},...p]=W(s);return a({...m,class:B("form",u,c,l,r,e==null?void 0:e.class,m==null?void 0:m.class)},...p)}}function ve(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:r}=n.tags,i=a`
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
        animation: ${i} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",loading:p,...b},...g]=W(c);const h=P(t),x=bt(t);return n.bind({deps:[p],render:()=>v=>h({...b,class:B("loadingButton",u,d,m,s,v&&"loading",e==null?void 0:e.class,b==null?void 0:b.class)},x({size:u,variant:d,color:m,visibility:v}),r({class:v&&"loading"},g))})}}const Ys=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:r,header:i,label:s,img:l,footer:c}=e.tags,u=ve(t,{variant:"solid",color:"primary"}),d=Et(t,{variant:"outline",color:"danger"}),m=dt(t),p=yt(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:g=()=>{}}){const h=e.state(!1),x=e.state("");return p({onsubmit:async w=>{w.preventDefault();const{username:S,password:E}=Object.fromEntries(new FormData(w.currentTarget));try{h.val=!0;const D=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:S,password:E})});if(D.ok){const A=await D.json();g(A)}else D.status==401?x.val="Invalid username or password":x.val=D.statusText}catch(D){x.val=D.message}finally{h.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),r("Login to Grucloud")),a(()=>x.val&&d(x.val),s("Email",m({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),s("Password",m({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",loading:h},"Login")))}},Qs=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, h1, header, label, img, footer } = bau.tags;

  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "primary",
  });
  const Alert = alert(context, { variant: "outline", color: "danger" });
  const Input = input(context);
  const Form = form(context, {
    class: css\`
      max-width: 400px;
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

  type LoginFormProp = {
    onLoggedIn: (response: object) => void;
  };

  return function LoginForm({ onLoggedIn = () => {} }: LoginFormProp) {
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { username, password } = Object.fromEntries(
        new FormData(event.currentTarget)
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

    return Form(
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
            loading: loadingState,
          },
          "Login"
        )
      )
    );
  };
};
`,ti=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:r,footer:i}=e.tags,s=yt(t),l=P(t,{variant:"solid",color:"primary"}),c=dt(t);return function({onSubmitted:d=()=>{}}){return s({onsubmit:async p=>{p.preventDefault();const b=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(b)),d(b)}},a(o("Form with input")),n(r("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},ei=`import form from "@grucloud/bau-ui/form";
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
      const payload = Object.fromEntries(new FormData(event.currentTarget));
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
`,ni=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:r,footer:i,em:s,span:l}=e.tags,c=e.state(""),u=e.derive(()=>c.val!=="Delete"),d=yt(t),m=P(t,{variant:"solid",color:"danger"}),p=dt(t);return function({onSubmitted:g=()=>{}}){return d({onsubmit:async x=>{x.preventDefault(),g()}},a(o("Delete Protection")),n(r(l("Type ",s("Delete")," to confirm the destruction of the resource."),p({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:x=>c.val=x.target.value}))),i(m({type:"submit",disabled:u},"Delete")))}},oi=`import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, label, footer, em, span } = bau.tags;

  const inputState = bau.state("");
  const disabledState = bau.derive(() => inputState.val !== "Delete");

  const Form = form(context);
  const Button = button(context, { variant: "solid", color: "danger" });
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
`,ai={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:ei,createComponent:ti},{title:"Form with state",description:"A form with input state and a dervied state.",code:oi,createComponent:ni},{title:"Login page",description:"A login page.",code:Qs,createComponent:Ys}]},ri=t=>{const e=F(t);return()=>e(ai)},En=(t,e={})=>{const n=dt(t,e),o=({color:a,variant:r,size:i,options:s})=>`myinput-gallery-${a??s.color}-${r??s.variant}-${i??s.size}`;return({color:a,variant:r,size:i,...s})=>n({"aria-label":o({color:a,variant:r,size:i,options:e}),name:o({color:a,variant:r,size:i,options:e}),placeholder:"Enter text",color:a,variant:r,size:i,...s})},si=t=>{const{bau:e}=t,{article:n,footer:o,label:a}=e.tags,r=dt(t),i=yt(t),s=P(t,{variant:"solid",color:"primary"}),l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))};return()=>i({onsubmit:l},n(a("Basic input",r({name:"my-input",placeholder:"Enter Text"})),a("Required input",r({required:!0,name:"my-required-input",placeholder:"Enter Text"})),a("Input with minLength/maxLength",r({name:"my-required-input-min-max",placeholder:"Enter Text",required:!0,minLength:3,maxLength:24})),a("Input with custom error message",r({name:"my-required-input-custom",placeholder:"Enter Text",required:!0,minLength:3,maxLength:24,oninvalid:c=>{c.target.setCustomValidity("Please select the correct format.")}})),a("Disabled input",r({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))),o(s({type:"submit"},"Submit")))},ii=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

export default (context: Context) => {
  const { bau } = context;
  const { article, footer, label } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    Form(
      { onsubmit },
      article(
        label(
          "Basic input",
          Input({
            name: "my-input",
            placeholder: "Enter Text",
          })
        ),
        label(
          "Required input",
          Input({
            required: true,
            name: "my-required-input",
            placeholder: "Enter Text",
          })
        ),
        label(
          "Input with minLength/maxLength",
          Input({
            name: "my-required-input-min-max",
            placeholder: "Enter Text",
            required: true,
            minLength: 3,
            maxLength: 24,
          })
        ),
        label(
          "Input with custom error message",
          Input({
            name: "my-required-input-custom",
            placeholder: "Enter Text",
            required: true,
            minLength: 3,
            maxLength: 24,
            oninvalid: (event: any) => {
              event.target.setCustomValidity(
                "Please select the correct format."
              );
            },
          })
        ),
        label(
          "Disabled input",
          Input({
            name: "my-input-disabled",
            placeholder: "Enter Text",
            disabled: true,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,ci=t=>{const{bau:e}=t,{article:n,footer:o,label:a}=e.tags,r=dt(t),i=yt(t),s=P(t,{variant:"solid",color:"primary"});return()=>{const l=e.state(""),c=e.derive(()=>l.val=="");return i({onsubmit:m=>{m.preventDefault(),alert(l.val)}},n(a("Input",r({name:"my-input",placeholder:"Enter Text",value:l,oninput:m=>l.val=m.target.value}))),o(s({type:"submit",disabled:c},"Submit")))}},li=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

export default (context: Context) => {
  const { bau } = context;
  const { article, footer, label } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  return () => {
    const inputState = bau.state("");
    const disableButtonState = bau.derive(() => inputState.val == "");

    const oninput = (event: any) => (inputState.val = event.target.value);
    const onsubmit = (event: any) => {
      event.preventDefault();
      //const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(inputState.val);
    };

    return Form(
      { onsubmit },
      article(
        label(
          "Input",
          Input({
            name: "my-input",
            placeholder: "Enter Text",
            value: inputState,
            oninput,
          })
        )
      ),
      footer(
        ButtonSubmit({ type: "submit", disabled: disableButtonState }, "Submit")
      )
    );
  };
};
`,ui={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Uncontrolled Input",description:"Various uncontrolled inputs.",code:ii,createComponent:si},{title:"Controlled Input",description:"Various controlled inputs.",code:li,createComponent:ci}],gridItem:En},di=t=>{const e=F(t);return()=>e(ui)},Tn=(t,e={})=>{const n=ce(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},mi=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=ce(t);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},pi=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,bi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:pi,createComponent:mi}],gridItem:Tn},gi=t=>{const e=F(t);return()=>e(bi)};function Dn(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,r=o`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding-left: 0;
    & li {
      margin: 0.5rem 0;
      display: flex;
      flex-direction: column;
      font-size: smaller;
      line-height: 1.6rem;
      & label {
        color: var(--font-color-secondary);
      }
    }
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("keyValueList",r,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}const fi=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:r}=e.tags,i=Dn(t);return()=>n(i(o(a("My label"),r("My Value")),o(a("My other label"),r("My Other Value"))))},hi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, li, label, span } = bau.tags;

  const KeyValueList = keyValueList(context);

  return () =>
    section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
};
`,vi=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:r,span:i}=e.tags,s=Dn(t,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(s(a(r("My label"),i("My Value")),a(r("My other label"),i("My Other Value"))))},xi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, li, label, span } = bau.tags;

  const KeyValueList = keyValueList(context, {
    class: css\`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    \`,
  });

  return () =>
    section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
};
`,yi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:hi,createComponent:fi},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:xi,createComponent:vi}]},Si=t=>{const e=F(t);return()=>e(yi)},wi="modulepreload",Ci=function(t){return"/bau/bau-ui/"+t},Le={},An=function(e,n,o){if(!n||n.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=Ci(r),r in Le)return;Le[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===r&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":wi,i||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function Bn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=bt(t,{size:"lg"}),i=Et(t,{color:"danger"}),s=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},r({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=s,error:m=l,props:p={}}){const b=n.state(void 0),g=n.state(!0),h=n.state(!1);return u().then(x=>{n.batch(()=>{b.val=x.default(t),g.val=!1})}).catch(x=>{h.val=x.message}),a(()=>{if(h.val)return m({message:h.val});if(g.val)return d();if(b.val)return b.val(p)})}}const ki=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state(!1),a=Bn(t),r=P(t);return()=>n(r({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>An(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},Ei=`import { Context } from "@grucloud/bau-ui/context";
import lazy from "@grucloud/bau-ui/lazy";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const showState = bau.state(false);

  const Lazy = lazy(context);
  const Button = button(context);

  return () =>
    section(
      Button({ onclick: () => (showState.val = !showState.val) }, () =>
        showState.val ? "Hide" : "Show"
      ),
      () =>
        showState.val &&
        Lazy({
          getModule: () => import("./myComponent"),
          props: { message: "myValue" },
        })
    );
};
`,Ti=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),r=Bn(t,{loading:()=>o("My Custom Loading"),error:s=>o("My Custom Error")}),i=P(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&r({getModule:()=>An(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Di=`import { Context } from "@grucloud/bau-ui/context";
import lazy from "@grucloud/bau-ui/lazy";
import button from "@grucloud/bau-ui/button";
export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const showState = bau.state(false);

  const Lazy = lazy(context, {
    loading: () => div("My Custom Loading"),
    error: (_error: any) => div("My Custom Error"),
  });
  const Button = button(context);

  return () =>
    section(
      Button({ onclick: () => (showState.val = !showState.val) }, () =>
        showState.val ? "Hide" : "Show"
      ),
      () =>
        showState.val &&
        Lazy({
          getModule: () => import("./myComponent"),
          props: { message: "Additional Props here" },
        })
    );
};
`,Ai={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:Ei,createComponent:ki},{title:"Custom Loader",description:"Custom loader and error",code:Di,createComponent:Ti}]},Bi=t=>{const e=F(t);return()=>e(Ai)};function In(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:r}=n.tags,i=()=>ot.map(c=>`
&.${c}{
  background-color: var(--color-${c});
}
  `).join(`
`),s=a`
    0% {
      background-position: 0rem 0;
    }
    100% {
      background-position: 1rem 0;
    }
  `,l=o`
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

    ${i()}
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:p=e.color??"neutral",running:b,...g}]=W(u);return r({...g,role:"progressbar",class:{deps:[b],renderProp:()=>h=>B("linearProgress",d,p,l,h&&"running",e==null?void 0:e.class,g==null?void 0:g.class)}})}}const Nn=(t,e)=>{const n=In(t,e);return o=>n({...o,"aria-label":"linear-progress",running:!0})},Ii=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=P(t,{variant:"solid",color:"primary"}),r=In(t),i=e.state(!1);return()=>n(a({onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,r({"aria-label":"linear-progress",running:i}))},Ni=`import linearProgress from "@grucloud/bau-ui/linearProgress";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, hr } = bau.tags;
  const Button = button(context, { variant: "solid", color: "primary" });
  const LinearProgress = linearProgress(context);

  const runningState = bau.state(false);

  return () =>
    section(
      Button(
        {
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      hr,
      LinearProgress({
        "aria-label": "linear-progress",
        running: runningState,
      })
    );
};
`,Mi={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Ni,createComponent:Ii}],gridItem:Nn},Oi=t=>{const e=F(t);return()=>e(Mi)},Mn=(t,e)=>{const n=ve(t,e);return o=>n({...o,loading:!0},"Save")},$i=t=>{const{bau:e}=t,{section:n}=e.tags,o=ve(t,{variant:"solid",color:"primary"}),a=e.state(!0);return()=>n(o({loading:a,onclick:()=>a.val=!a.val},"Save"))},Li=`import loadingButton from "@grucloud/bau-ui/loadingButton";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "primary",
  });

  const loadingState = bau.state(true);

  return () =>
    section(
      LoadingButton(
        {
          loading: loadingState,
          onclick: () => (loadingState.val = !loadingState.val),
        },
        "Save"
      )
    );
};
`,Pi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Li,createComponent:$i}],gridItem:Mn},zi=t=>{const e=F(t);return()=>e(Pi)},Ri=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],_i=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:r}=n.tags,i=vt(t,e),s=({code:l,label:c})=>r({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},Ri.map(s))},ji=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Gi=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:r}=e.tags,i=vt(t,{variant:"outline",color:"primary"}),s=({code:l,label:c})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i(ji.map(s)))},Hi=`import list from "@grucloud/bau-ui/list";
import { Context } from "@grucloud/bau-ui/context";

const phoneCodes = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, span, li } = bau.tags;

  const List = list(context, { variant: "outline", color: "primary" });

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

  return () => section(List(phoneCodes.map(ListItem)));
};
`,Fi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Hi,createComponent:Gi}],gridItem:_i},Ui=t=>{const e=F(t);return()=>e(Fi)};function On(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:r,div:i}=n.tags,l=o`
    margin: auto;
    padding: 1rem;
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    border: 0px;
    overflow: hidden;
    > form {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      max-height: 96vh;
      max-width: 96vw;
      & > header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
      }
      & > main,
      > section,
      > article {
        overflow-y: auto;
        flex-grow: 1;
      }
      & > footer {
        display: flex;
        justify-content: flex-end;
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
    ${(()=>ot.map(c=>`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:p=e.color??"neutral",...b},...g]=W(u);const h=r({...b,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(b.id??"modal")&&h.showModal()},class:B("modal",l,p,m,d,e==null?void 0:e.class,b==null?void 0:b.class)},g);return new MutationObserver(v=>{const w=new URLSearchParams(a.location.search);v[0].attributeName=="open"&&(h.open?w.set("modal",h.id??"modal"):w.delete("modal"),a.history.pushState("","",`?${w.toString()}`))}).observe(h,{attributes:!0}),h}}const $n=(t,e={})=>{const{bau:n,window:o}=t,{document:a}=o,{form:r,section:i,main:s,header:l,footer:c,p:u,h1:d}=n.tags,m=P(t),p=On(t,e),b=()=>s(Array(20).fill("").map((x,v)=>u(v+1,". Some text here"))),g=x=>`dialog-${x.color}-${x.variant}-${e.size}`,h=x=>p({id:g(x),...x},r(l(d("Header")),b(),c(m({variant:"outline",color:x.color,onclick:v=>{v.target.closest("dialog").close()}},"Cancel"),m({variant:"solid",color:x.color,onclick:v=>{v.target.closest("dialog").close()}},"OK"))));return x=>i(m({...x,onclick:()=>{a.getElementById(g(x)).showModal()}},"OPEN MODAL"),h(x))},Vi=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,section:r,main:i,header:s,footer:l,p:c}=e.tags,d=P(t,{color:"neutral"}),m=On(t),p=()=>i(Array(10).fill("").map((b,g)=>c(g+1,". Some text here")));return()=>r(d({variant:"solid",onclick:()=>{o.getElementById("my-dialog").showModal()}},"OPEN MODAL"),m({id:"my-dialog"},a(s("Header"),p(),l(d({variant:"outline",onclick:b=>{b.target.closest("dialog").close()}},"Cancel"),d({variant:"solid",onclick:b=>{b.target.closest("dialog").close()}},"OK")))))},Ji=`import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, window } = context;
  const { document } = window;
  const { form, section, main, header, footer, p } = bau.tags;

  const color = "neutral";

  const Button = button(context, { color });
  const Modal = modal(context);

  const Content = () =>
    main(
      Array(10)
        .fill("")
        .map((_, k) => p(k + 1, ". Some text here" /*faker.lorem.paragraph()*/))
    );

  return () =>
    section(
      Button(
        {
          variant: "solid",
          onclick: () => {
            const dialogEl = document.getElementById(
              "my-dialog"
            ) as HTMLDialogElement;
            dialogEl.showModal();
          },
        },
        "OPEN MODAL"
      ),
      Modal(
        { id: "my-dialog" },
        form(
          header("Header"),
          Content(),
          footer(
            Button(
              {
                variant: "outline",
                onclick: (event: any) => {
                  event.target.closest("dialog").close();
                },
              },
              "Cancel"
            ),
            Button(
              {
                variant: "solid",
                onclick: (event: any) => {
                  event.target.closest("dialog").close();
                },
              },
              "OK"
            )
          )
        )
      )
    );
};
`,qi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ji,createComponent:Vi}],gridItem:$n},Wi=t=>{const e=F(t);return()=>e(qi)},Ki=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Xi(t,e={}){const{bau:n,css:o}=t,{div:a,li:r,select:i}=n.tags,s=P(t),l=$t(t),c=vt(t),u=Tt(t,{color:"neutral",variant:"outline"}),d=o`
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
      align-items: center;
      flex-grow: 1;
    }
    ${Ki()}
  `;return function(...p){let[{size:b=e.size??"md",variant:g=e.variant??"outline",color:h=e.color??"neutral",name:x,label:v,Option:w,options:S,defaultValue:E=[],getOptionLabel:D,getOptionValue:A,renderValue:I,onSelect:M=()=>{},loading:$,...L},...j]=W(p);const G=bt(t,{variant:g,color:h,size:b}),U=n.state(E),z=n.state(!1),C=n.state(0),f=()=>{X.openDialog(),X.focus(),z.val=!0},y=()=>{X.closeDialog(),z.val=!1},k=()=>{z.val=!1},T=Z=>{X.open?y():f(),Z.preventDefault()},H=()=>Array.from(nt.selectedOptions).map(({value:Z})=>S.find(Y=>A(Y)==Z)),R=Z=>{switch(Z.preventDefault(),Z.key){case"Escape":y();break;case"ArrowDown":C.val<S.length-1?C.val++:C.val=0;break;case"ArrowUp":C.val<=0?C.val=S.length-1:C.val--;break;case"Enter":if(X.open){const Y=Z.currentTarget.querySelectorAll("input")[C.val];Y.checked=!Y.checked;const rt=nt.options[C.val+1];rt.selected=!rt.selected,U.val=H()}else f();break}},V=Z=>Y=>{const rt=[...nt.options].find(({value:ct})=>ct==A(Z));Y.target.checked?rt.selected=!0:rt.selected=!1,U.val=H()},J=()=>c({tabindex:"0",class:B(h,g)},S.map((Z,Y)=>r({class:()=>B(C.val==Y&&"active")},n.tags.label(u({checked:E.find(rt=>A(rt)==A(Z)),name:`${x}-${A(Z)}`,onchange:V(Z)}),w(Z))))),N=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":z,"aria-label":v,onclick:T,color:h,variant:g,size:b,class:$==!0&&"loading",disabled:$},()=>U.val.length?I(U.val):v,()=>$==!0&&G({visibility:$})),X=l({triggerEl:N,contentEl:J(),onClose:k}),nt=i({name:x,multiple:!0,...L},n.tags.option({value:""},"--Category--"),S.map(Z=>n.tags.option({value:A(Z),selected:E.find(Y=>A(Y)==A(Z))},D(Z))));return a({...L,class:B("multiSelect",h,b,d,e==null?void 0:e.class,L==null?void 0:L.class),onkeydown:R},nt,N,X)}}const Zi=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:r,footer:i}=e.tags,s=Xi(t),l=P(t,{variant:"outline",color:"neutral"}),c=Ot(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=p=>a(p.group),m=p=>{p.preventDefault();const{selectedOptions:b}=p.target.elements.myMultiSelect;var g=Array.from(b).map(({value:h})=>h);alert(JSON.stringify(g))};return()=>r({onsubmit:m,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},s({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:p})=>p,getOptionLabel:({group:p})=>p,renderValue:p=>o({class:n`
                display: flex;
                align-items: center;
                gap: 0.2rem;
              `},p.map(b=>c(b.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},Yi=`import { Context } from "@grucloud/bau-ui/context";
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
                align-items: center;
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
`,Qi=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:r}=e.tags,i=P(t,{variant:"outline",color:"neutral"}),s=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:m})=>m);alert(JSON.stringify(d))};return()=>r({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},s.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},tc=`import { Context } from "@grucloud/bau-ui/context";
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
`,ec={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Yi,createComponent:Zi},{title:"Native Multi Select",description:"A native multi select.",code:tc,createComponent:Qi}]},nc=t=>{const e=F(t);return()=>e(ec)},oc=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:r}=e.tags,i=P(t,{variant:"outline",color:"success"}),s=$t(t),l=()=>i({onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),r("My Content")),u=l(),d=s({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},ac=`import popover from "@grucloud/bau-ui/popover";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div, h1, p } = bau.tags;

  const Button = button(context, { variant: "outline", color: "success" });
  const Popover = popover(context);

  const TriggerButton = () =>
    Button(
      {
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
`,rc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:ac,createComponent:oc}]},sc=t=>{const e=F(t);return()=>e(rc)};function ic(t,e={}){const{bau:n,css:o,config:a}=t,{div:r,a:i,span:s,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:m,label:p,href:b})=>i({href:`${a.base}${b}`},s({class:"sublabel"},d),r({class:`label ${d}`},p??m));return function(...m){let[{size:p=e.size??"md",variant:b=e.variant??"plain",color:g=e.color??"neutral",data:h={},...x}]=W(m);const{next:v,previous:w}=h;return l({"data-paginationnav":JSON.stringify(h),"aria-label":"pages navigation",...x,class:B("paginationNavigation",p,c,e==null?void 0:e.class,x==null?void 0:x.class)},(w==null?void 0:w.href)&&u({text:"Previous"})(w),(v==null?void 0:v.href)&&u({text:"Next"})(v))}}const cc=t=>{const{bau:e}=t,{section:n}=e.tags,o=ic(t,{variant:"solid",color:"primary"}),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({data:a}))},lc=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const PaginationNavigation = paginationNavigation(context, {
    variant: "solid",
    color: "primary",
  });

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
        data,
      })
    );
};
`,uc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:lc,createComponent:cc}]},dc=t=>{const e=F(t);return()=>e(uc)},mc=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=pe(t,e);return r=>a({...r},o(`Paper ${e.size??""}`))},pc=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=pe(t,{size:"md"});return()=>n(a(o("My content")))},bc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context, { size: "md" });

  return () => section(Paper(div("My content")));
};
`,gc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:bc,createComponent:pc}],variantColorTableDisable:!0,gridItem:mc},fc=t=>{const e=F(t);return()=>e(gc)};function xe(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    cursor: pointer;
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>ot.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
  `).join(`
`))()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m}]=W(l);return a({...m,type:"radio",class:B("radio-button",c,d,u,i,e==null?void 0:e.class,m==null?void 0:m.class)})}}const Ln=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:r}=n.tags,i=xe(t,e);return s=>r({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},hc=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:r}=e.tags,i=xe(t),s=e.state("one"),l=({target:c})=>s.val=c.id;return()=>r({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        `},o("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:l})),o("Two",i({id:"two",name:"radio",value:s,oninput:l})),a("Choice: ",s))},vc=`import radioButton from "@grucloud/bau-ui/radioButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, div, form } = bau.tags;
  const RadioButton = radioButton(context);

  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  return () =>
    form(
      {
        class: css\`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        \`,
      },
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
`,xc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:vc,createComponent:hc}],gridItem:Ln},yc=t=>{const e=F(t);return()=>e(xc)};function Zt(t,e={}){const{bau:n,css:o}=t,{div:a,label:r}=n.tags,i=xe(t),l=o`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    & label {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px dotted var(--color-emphasis-500);
      border-radius: var(--global-radius);
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      > div {
        display: flex;
        flex-direction: column;
      }
    }
    ${(()=>ot.map(c=>`
  `).join(`
`))()};
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"none",color:p=e.color??"neutral",name:b,oninput:g,value:h,radios:x=[],...v}]=W(u);return a({...v,class:B("radioButtonGroup",d,p,m,l,e==null?void 0:e.class,v==null?void 0:v.class)},x.map(({id:w,Label:S})=>r(i({size:d,variant:m,color:p,id:w,name:b,checked:h==w,value:w,oninput:g}),S())))}}const Sc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:r}=e.tags,i=Zt(t),s=P(t,{variant:"outline",color:"primary"}),l=e.state("two"),c=({target:d})=>l.val=d.id,u=d=>{d.preventDefault(),alert(l.val)};return()=>n({onsubmit:u},o(i({oninput:c,name:"myRadio",value:l.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),r("CheckedState: ",l)),a(s({type:"submit"},"Submit")))},wc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer, p } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const checkedState = bau.state("two");

  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  const onsubmit = (event: any) => {
    event.preventDefault();
    alert(checkedState.val);
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          oninput,
          name: "myRadio",
          value: checkedState.val,
          radios: [
            { id: "one", Label: () => "One" },
            { id: "two", Label: () => "Two" },
          ],
        }),
        p("CheckedState: ", checkedState)
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Cc=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=Zt(t),i=P(t,{variant:"outline",color:"primary"}),s=l=>{l.preventDefault();const c=Object.fromEntries(new FormData(l.currentTarget));alert(JSON.stringify(c))};return()=>n({onsubmit:s},o(r({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},kc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "myRadio",
          value: "one",
          radios: [
            { id: "one", Label: () => "One" },
            { id: "two", Label: () => "Two" },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Ec=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:r,img:i}=e.tags,s=Zt(t),l=P(t,{variant:"outline",color:"primary"}),c=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28}),d=m=>{m.preventDefault();const p=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(p))};return()=>o({onsubmit:d},a(s({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>[c(),"GitHub"]},{id:"GitLab",Label:()=>[u(),"GitLab"]}]})),r(l({type:"submit"},"Submit")))},Tc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, config } = context;
  const { form, article, footer, img } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const GithubImg = () =>
    img({
      src: \`\${config.base}/login/github.svg#Capa_1\`,
      alt: "GitHub",
      width: 28,
      height: 28,
    });

  const GitlabImg = () =>
    img({
      src: \`\${config.base}/login/gitlab-logo.svg#Capa_1\`,
      alt: "GitLab",
      width: 28,
      height: 28,
    });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "git_provider_type",
          value: "",
          radios: [
            { id: "GitHub", Label: () => [GithubImg(), "GitHub"] },
            { id: "GitLab", Label: () => [GitlabImg(), "GitLab"] },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Dc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:r,div:i}=e.tags,s=Zt(t),l=P(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))};return()=>n({onsubmit:c},o(s({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>i("GitHub",r("Login with GitHub"))},{id:"GitLab",Label:()=>i("GitLab",r("Login with GitLab"))}]})),a(l({type:"submit"},"Submit")))},Ac=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer, small, div } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "git_provider_type",
          value: "",
          radios: [
            {
              id: "GitHub",
              Label: () => div("GitHub", small("Login with GitHub")),
            },
            {
              id: "GitLab",
              Label: () => div("GitLab", small("Login with GitLab")),
            },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Bc={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:kc,createComponent:Cc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:wc,createComponent:Sc},{title:"Label with Image",description:"A label with an image.",code:Tc,createComponent:Ec},{title:"Label with description",description:"A label with name and description.",code:Ac,createComponent:Dc}]},Ic=t=>{const e=F(t);return()=>e(Bc)},Nc=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Lt(t,e={}){const{bau:n,css:o}=t,{div:a,li:r,select:i,option:s}=n.tags,l=P(t),c=$t(t),u=vt(t),d=o`
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
    ${Nc()}
  `;return function(...p){let[{size:b=e.size??"md",variant:g=e.variant??"outline",color:h=e.color??"neutral",label:x,Option:v,options:w,defaultOption:S,getOptionLabel:E,getOptionValue:D,onSelect:A=()=>{},loading:I,...M},...$]=W(p);const L=bt(t,{variant:g,color:h,size:b}),j=n.state(S?E(S):x),G=n.state(!1),U=n.state(0),z=()=>{V.openDialog(),V.focus(),G.val=!0},C=()=>{V.closeDialog(),G.val=!1},f=()=>{G.val=!1},y=N=>{V.open?C():z(),N.preventDefault()},k=({option:N,index:X})=>nt=>{j.val=E(N),J.value=D(N),J.setCustomValidity(""),U.val=X,C(),A(N),nt.preventDefault()},T=N=>{switch(N.preventDefault(),N.key){case"Escape":C();break;case"ArrowDown":U.val<w.length-1?U.val++:U.val=0;break;case"ArrowUp":U.val<=0?U.val=w.length-1:U.val--;break;case"Enter":V.open?(j.val=E(w[U.val]),J.value=D(s),C()):z();break}},H=()=>u({tabindex:"0",class:B(h,g)},w.map((N,X)=>r({class:()=>B(U.val==X&&"active"),onclick:k({option:N,index:X})},v(N)))),R=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":G,"aria-label":x,onclick:y,color:h,variant:g,size:b,class:I==!0&&"loading",disabled:I},()=>!j.val&&x,j,()=>I==!0&&L({visibility:I})),V=c({triggerEl:R,contentEl:H(),onClose:f}),J=i(M,s({value:""},"--Select Category--"),w.map(N=>s({value:D(N)},E(N))));return S?J.value=D(S):J.value=M.value,a({...M,class:B("select",h,b,d,e==null?void 0:e.class,M==null?void 0:M.class),onkeydown:T},J,R,V)}}const Pn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:r}=n.tags,i=Lt(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Mc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Lt(t),c=P(t,{variant:"solid",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],d=p=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(p.label),s(p.code)),m=p=>{p.preventDefault();const b=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(b))};return()=>o({onsubmit:m},a(l({name:"country",options:u,Option:d,getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Select a country..."})),r(c({type:"submit"},"Submit")))},Oc=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import select from "@grucloud/bau-ui/select";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, div, span } = bau.tags;

  const Select = select(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        Select({
          name: "country",
          options,
          Option,
          getOptionValue: ({ code }: any) => code,
          getOptionLabel: ({ label }: any) => label,
          label: "Select a country...",
        })
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,$c=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Lt(t),c=P(t,{variant:"solid",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],m=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(b.label),s(b.code)),p=b=>{b.preventDefault();const g=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(g))};return()=>o({onsubmit:p},a(l({name:"country",options:d,Option:m,defaultOption:d.find(({code:b})=>b==u),getOptionValue:({code:b})=>b,getOptionLabel:({label:b})=>b,label:"Select a country..."})),r(c({type:"submit"},"Submit")))},Lc=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import select from "@grucloud/bau-ui/select";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, div, span } = bau.tags;

  const Select = select(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        Select({
          name: "country",
          options,
          Option,
          defaultOption: options.find(({ code }) => code == defaultCode),
          getOptionValue: ({ code }: any) => code,
          getOptionLabel: ({ label }: any) => label,
          label: "Select a country...",
        })
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,Pc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,span:r}=e.tags,i=Lt(t),s=P(t,{variant:"solid",color:"primary"}),l=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],c=d=>r({},d),u=d=>{d.preventDefault();const m=Object.fromEntries(new FormData(d.currentTarget));alert(JSON.stringify(m))};return()=>n({onsubmit:u},o(i({name:"region",options:l,Option:c,label:"Select a region",getOptionValue:d=>d,getOptionLabel:d=>d,required:!0,oninvalid:d=>{d.target.setCustomValidity("Please select an AWS region")}})),a(s({type:"submit"},"Submit")))},zc=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import select from "@grucloud/bau-ui/select";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer, span } = bau.tags;

  const Select = select(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        Select({
          name: "region",
          options,
          Option,
          label: "Select a region",
          getOptionValue: (label: any) => label,
          getOptionLabel: (label: any) => label,
          required: true,
          oninvalid: (event: any) => {
            event.target.setCustomValidity("Please select an AWS region");
          },
        })
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,Rc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,span:i,div:s}=e.tags,l=P(t,{variant:"outline"}),c=P(t,{variant:"solid",color:"primary"}),u=Lt(t),d=e.state([]),m=e.state(!1),p=e.state("");async function b({url:v,transform:w=S=>S}){try{m.val=!0;const S=await fetch(v,{});if(S.ok){const E=await S.json();d.val=w(E)}else p.val=S.statusText}catch(S){p.val=S.message}finally{m.val=!1}}const g=()=>b({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:v=>v.sort((w,S)=>w.name.common.localeCompare(S.name.common))});g();const h=v=>s({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(v.flag),i(v.name.common)),x=v=>{v.preventDefault();const w=Object.fromEntries(new FormData(v.currentTarget));alert(JSON.stringify(w))};return()=>o({onsubmit:x},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({name:"country",options:d.val,Option:h,getOptionValue:({name:v})=>v.common,getOptionLabel:({name:v})=>v.common,label:"Country",id:"country",loading:m.val,required:!0}),l({onclick:()=>g()},"Reload")),r(c({type:"submit"},"Submit")))},_c=`import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, span, div } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        {
          class: css\`
            display: flex;
            gap: 1rem;
          \`,
        },
        () =>
          Select({
            name: "country",
            options: dataState.val,
            Option,
            getOptionValue: ({ name }: any) => name.common,
            getOptionLabel: ({ name }: any) => name.common,
            label: "Country",
            id: "country",
            loading: loadingState.val,
            required: true,
          }),
        Button({ onclick: () => fetchCountries() }, "Reload")
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,jc={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Oc,createComponent:Mc},{title:"Default Option",description:"Select with a default option",code:Lc,createComponent:$c},{title:"Select AWS region",description:"Select the AWS region",code:zc,createComponent:Pc},{title:"Loading Indicator",description:"Select with a loading indicator",code:_c,createComponent:Rc}],gridItem:Pn},Gc=t=>{const e=F(t);return()=>e(jc)};function zn(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,r=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("select-native",u,l,c,r,e==null?void 0:e.class,d==null?void 0:d.class)},m)}}const Rn=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=zn(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,r.map(({label:s,phone:l})=>o({value:l},s)))},Hc=t=>{const{bau:e}=t,{option:n,form:o,footer:a}=e.tags,r=P(t,{variant:"outline",color:"primary"}),i=zn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))};return()=>o({onsubmit:l},i({name:"my-select"},n({value:""},"--Please choose a phone code--"),s.map(({label:c,phone:u})=>n({value:u},c))),a(r({type:"submit"},"Submit")))},Fc=`import { Context } from "@grucloud/bau-ui/context";
import selectNative from "@grucloud/bau-ui/selectNative";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { option, form, footer } = bau.tags;

  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

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

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      SelectNative(
        { name: "my-select" },
        option({ value: "" }, "--Please choose a phone code--"),
        phoneOptions.map(({ label, phone }) => option({ value: phone }, label))
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Uc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Fc,createComponent:Hc}],gridItem:Rn},Vc=t=>{const e=F(t);return()=>e(Uc)},Jc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,r=kt(t),i=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},r({class:n`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        `}),new Array(4).fill("").map(()=>r({class:n`
            border-radius: 5px;
            width: 100%;
            height: 2rem;
          `})));return()=>o(i())},qc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Wc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,r=kt(t),i=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},new Array(4).fill("").map(()=>a({class:n`
              display: flex;
              gap: 1rem;
              align-items: center;
            `},r({class:n`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            `}),r({class:n`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            `}))));return()=>o(i())},Kc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Xc=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:r,tr:i,td:s}=e.tags,l=kt(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(r(new Array(8).fill("").map(()=>i(s(l({class:n`
                  width: 5rem;
                `})),s(l()),s(l()),s(l()),s(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},Zc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Yc=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:r,article:i}=e.tags,s=n`
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
  `,l=kt(t,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),c=kt(t);function u({columnsSize:d=4}){return o({class:s},a(new Array(d).fill("").map(()=>l(r("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Qc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,tl={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:qc,createComponent:Jc},{title:"List",description:"A list skeleton.",code:Kc,createComponent:Wc},{title:"Table",description:"A table skeleton.",code:Zc,createComponent:Xc},{title:"Tabs",description:"A tabs skeleton.",code:Qc,createComponent:Yc}],variantColorTableDisable:!0,variantSizeDisable:!0},el=t=>{const e=F(t);return()=>e(tl)};function Pt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${(()=>ot.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},...p]=W(l);return a({...m,type:"range",class:B("slider",d,u,c,i,e==null?void 0:e.class,m.class)},...p)}}const _n=t=>{const{bau:e}=t,n=e.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=Pt(t);return r=>a({"aria-label":"slider",...r,oninput:o})},nl=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:r,footer:i}=e.tags,s=Pt(t),l=P(t,{variant:"solid",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))};return()=>n({onsubmit:c},o(a("Slider with step, min and max",r,s({name:"slider-simple",step:20,min:-100,max:100}))),i(l({type:"submit"},"Submit")))},ol=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, label, br, footer } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        label(
          "Slider with step, min and max",
          br,
          Slider({
            name: "slider-simple",
            step: 20,
            min: -100,
            max: 100,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,al=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:r,footer:i}=e.tags,s=Pt(t),l=P(t,{variant:"solid",color:"primary"});return()=>{const c=e.state(0);return n({onsubmit:m=>{m.preventDefault();const p=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(p))}},o(a("Slider Value:",c,r,s({oninput:m=>{c.val=m==null?void 0:m.target.value},name:"slider-simple",step:20,min:-100,max:100}))),i(l({type:"submit"},"Submit")))}},rl=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, label, br, footer } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  return () => {
    const sliderState = bau.state(0);

    const oninput = (event: any) => {
      sliderState.val = event?.target.value;
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        label(
          "Slider Value:",
          sliderState,
          br,
          Slider({
            oninput,
            name: "slider-simple",
            step: 20,
            min: -100,
            max: 100,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,sl=t=>{const{bau:e,css:n}=t,{article:o,footer:a,form:r,label:i,datalist:s,br:l,option:c}=e.tags,u=Pt(t),d=P(t,{variant:"solid",color:"primary"}),m=p=>{p.preventDefault();const b=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(b))};return()=>r({onsubmit:m},o(i({for:"temp"},"Choose a comfortable temperature"),l,u({class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))),a(d({type:"submit"},"Submit")))},il=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau, css } = context;
  const { article, footer, form, label, datalist, br, option } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        label({ for: "temp" }, "Choose a comfortable temperature"),
        br,
        Slider({
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
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,cl=t=>{const{bau:e,css:n}=t,{article:o,footer:a,form:r,label:i,datalist:s,br:l,option:c}=e.tags,u=e.state(0),d=g=>{u.val=g==null?void 0:g.target.value},m=Pt(t),p=P(t,{variant:"solid",color:"primary"}),b=g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))};return()=>r({onsubmit:b},o({class:n`
            display: flex;
          `},i({for:"temp-vertical"},"Choose a comfortable temperature"),l,m({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",class:n`
            width: 30px;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(g=>c({value:Number(g),label:g})))),a(p({type:"submit"},"Submit")))},ll=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau, css } = context;
  const { article, footer, form, label, datalist, br, option } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        {
          class: css\`
            display: flex;
          \`,
        },
        label({ for: "temp-vertical" }, "Choose a comfortable temperature"),
        br,
        Slider({
          oninput,
          id: "temp-vertical",
          name: "temp",
          list: "markers-vertical",
          class: css\`
            width: 30px;
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
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
};
`,ul={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Uncontrolled slider",description:"A uncontrolled slider.",code:ol,createComponent:nl},{title:"Controlled slider",description:"A controlled slider.",code:rl,createComponent:al},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:il,createComponent:sl},{title:"Vertical Mark",description:"A vertical slider with marks.",code:ll,createComponent:cl}],gridItem:_n},dl=t=>{const e=F(t);return()=>e(ul)},jn=(t,e)=>{const n=bt(t,e);return o=>n({...o})},ml=t=>{const{bau:e}=t,{section:n}=e.tags,o=P(t,{variant:"solid",color:"primary"}),a=bt(t,{size:"lg"}),r=e.state(!0);return()=>n(o({onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),a({visibility:r}))},pl=`import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Button = button(context, {
    variant: "solid",
    color: "primary",
  });
  const Spinner = spinner(context, { size: "lg" });

  const runningState = bau.state(true);

  return () =>
    section(
      Button(
        {
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      Spinner({ visibility: runningState })
    );
};
`,bl={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:pl,createComponent:ml}],gridItem:jn},gl=t=>{const e=F(t);return()=>e(bl)},fl=()=>ot.map(t=>"").join(`
`),Gn=(t,e)=>(n,o)=>{const a=new URLSearchParams(t.window.location.search);return a.delete(e),a.append(e,n),o&&Object.entries(o).map(([r,i])=>(a.delete(r),a.append(r,i))),`?${a.toString()}`};function Hn(t,e={}){const{bau:n,css:o,window:a}=t,{div:r,ul:i,li:s,span:l,section:c}=n.tags,u=o`
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
    ${fl()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...m){let[{color:p,variant:b="plain",size:g,stepperDefs:h=[],stepperName:x,activeStepIndex:v=n.state(0),...w},...S]=W(m);const E=n.state(h.map((L,j)=>({...L,index:j}))),D=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(L,j,G)=>{L.apply(j,G);const U=G[2]??"";console.log("stepper pushState ",U),["?","#"].includes(U[0])&&$()}});const A=n.derive(()=>E.val[v.val]),I=L=>{const{Header:j,disabled:G,name:U,index:z}=L;return s({class:()=>B(A.val.name==U&&"active",v.val<z&&"not-completed",v.val>z&&"completed",G&&"disabled")},l({class:"step-number"},z+1),l({class:"step-label"},()=>j(L)))},M=L=>h.findIndex(({name:j})=>j==L.name),$=()=>{const j=new URLSearchParams(a.location.search).get(x)??h[0].name,G=Math.max(h.findIndex(({name:U})=>U==j),0);G<v.val&&(console.log("remove last step"),D.val.pop()),D.val.some(({name:U})=>j==U)||(console.log("add new step"),D.val.push(h[G])),v.val=G};return $(),r({bauMounted:({element:L})=>{a.addEventListener("popstate",$)},bauUnmounted:()=>{a.removeEventListener("popstate",$)},class:B("stepper",b,g,p,u,e==null?void 0:e.class,w.class)},n.loop(E,i(),I),n.loop(D,c(),L=>r({class:()=>B("content",L.name==A.val.name&&"visible")},L.Content({nextStep:h[M(L)+1],previousStep:h[M(L)-1]}))))}}const Pe="my-wizard",hl=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:r,section:i,a:s,ul:l,li:c}=e.tags,u=dt(t),d=yt(t),m=Hn(t),p=Gn(t,Pe),b=P(t,{variant:"outline",color:"primary"}),g=P(t,{variant:"solid",color:"primary"}),h=({nextStep:w})=>S=>{S.preventDefault();const{organization:E}=S.target.elements;n.history.pushState("","",p(w.name,{organization:E.value}))},x=w=>{var A;w.preventDefault();const{organization:S}=(A=n.document.forms)==null?void 0:A.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${S.value}, choice:${D}`)},v=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:w})=>d({onsubmit:h({nextStep:w}),id:"formStep1"},r("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(g({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:w,previousStep:S})=>d(l(c(s({href:p(w.name,{choice:"choice1"})},"Choice 1")),c(s({href:p(w.name,{choice:"choice2"})},"Choice 2"))),o(b({href:p(S.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:w})=>d({onsubmit:x},a("My stepper 3 Content"),o(b({href:p(w.name)},"Previous: Step 2"),g({type:"submit"},"Save")))}];return()=>i(m({stepperDefs:v,stepperName:Pe}))},vl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ze="stepper-vertical",xl=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:r,label:i,section:s,a:l,ul:c,li:u}=e.tags,d=dt(t),m=yt(t),p=Hn(t,{class:o`
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
    `}),b=Gn(t,ze),g=P(t,{variant:"outline",color:"primary"}),h=P(t,{variant:"solid",color:"primary"}),x=({nextStep:S})=>E=>{E.preventDefault();const{organization:D}=E.target.elements;n.history.pushState("","",b(S.name,{organization:D.value}))},v=S=>{var I;S.preventDefault();const{organization:E}=(I=n.document.forms)==null?void 0:I.formStep1.elements,A=new URLSearchParams(n.location.search).get("choice");alert(`organization ${E.value}, choice:${A}`)},w=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>m({onsubmit:x({nextStep:S}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:E})=>m(c(u(l({href:b(S.name,{choice:"choice1"})},"Choice 1")),u(l({href:b(S.name,{choice:"choice2"})},"Choice 2"))),a(g({href:b(E.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>m({onsubmit:v},r("My stepper 3 Content"),a(g({href:b(S.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>s(p({stepperDefs:w,stepperName:ze}))},yl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Sl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:vl,createComponent:hl},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:yl,createComponent:xl}]},wl=t=>{const e=F(t);return()=>e(Sl)},Cl=()=>ot.map(t=>`
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
`);function Fn(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    cursor: pointer;
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
    ${Cl()}
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=W(s);return a({...d,class:B("switch",r,u,c,l,e==null?void 0:e.class,d.class),type:"checkbox"},...m)}}const Un=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:r}=n.tags,i=Fn(t,e);return s=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},r("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),r("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},kl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:r}=e.tags,i=Fn(t,{variant:"outline"}),s=P(t,{variant:"outline",color:"primary"}),l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))};return()=>a({onsubmit:l},r({class:n`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `},"My shinny switch",i({name:"my-shinny-switch"})),o(s({type:"submit"},"Submit")))},El=`import { Context } from "@grucloud/bau-ui/context";
import createSwitch from "@grucloud/bau-ui/switch";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { footer, form, label } = bau.tags;

  const Switch = createSwitch(context, { variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      label(
        {
          class: css\`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          \`,
        },
        "My shinny switch",
        Switch({ name: "my-shinny-switch" })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Tl={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:El,createComponent:kl}],gridItem:Un},Dl=t=>{const e=F(t);return()=>e(Tl)},Al=()=>ot.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function zt(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:r}=e,{div:i,ul:s,li:l,a:c}=n.tags,u=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid var(--color-emphasis-100);
      list-style: none;
      & li:not(:last-child) {
        border-right: 1px solid var(--color-emphasis-100);
      }
      & li {
        display: flex;
        flex-direction: column;

        & > a {
          padding: 0.6rem 1rem 0.6rem 1rem;
          color: inherit;
          text-decoration: none;
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
        }
        &::after {
          transition: var(--transition-fast) ease-in-out;
          transform: translateY(100%);
          background: var(--color-primary-light);
          opacity: 1;
          content: "";
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
    ${Al()}
  `;return function(...m){let[{size:p=e.size??"md",variant:b=e.variant??"plain",color:g=e.color??"neutral",tabsKey:h="tabs",...x},...v]=W(m);const w=n.state(r),S=$=>w.val.find(L=>L.name==$),E=n.state(r[0]),D=()=>{var j,G;const L=new URLSearchParams(a.location.search).get(h)??r[0].name;if(L!=E.val.name){const U=S(L);(j=E.val.exit)==null||j.call(),E.val=U,(G=U==null?void 0:U.enter)==null||G.call()}};D(),a.history.pushState=new Proxy(a.history.pushState,{apply:($,L,j)=>{$.apply(L,j);const G=j[2]??"";["?","#"].includes(G[0])&&D()}});const A=$=>{const L=new URLSearchParams(a.location.search);return L.delete(h),L.append(h,$),`?${L.toString()}`},I=$=>{const{Header:L,disabled:j,name:G}=$;return l({class:()=>B(E.val.name==G&&"active",j&&"disabled")},c({href:A(G)},L($)))},M=i({class:B("tabs",b,p,g,u,e==null?void 0:e.class,x.class),bauMounted:({element:$})=>{a.addEventListener("popstate",D)},bauUnmounted:()=>{a.removeEventListener("popstate",D)}},n.loop(w,s(),I),n.bind({deps:[E],render:()=>({Content:$})=>$?$(x):""}));return M.addEventListener("tab.add",$=>{var j;const{tab:L}=$.detail;(j=L.enter)==null||j.call(),w.val.push(L)},!1),M.addEventListener("tab.remove",$=>{var j;const L=w.val.findIndex(G=>G.name==$.detail.tabName);L>0&&((j=w.val[L].exit)==null||j.call(),w.val.splice(L,1))},!1),M}}const Bl=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,r=zt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>r({})},Il=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
  });

  return () => Tabs({});
};
`,Nl=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,r=zt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>r({tabsKey:"my-tab"})},Ml=`import tabs from "@grucloud/bau-ui/tabs";
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

  const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

  return () => Tabs({ tabsKey: "my-tab" });
};
`,Vn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Ol=t=>{const{css:e}=t,n=zt(t,{tabDefs:Vn(t),class:e`
      flex-direction: column-reverse;
    `});return()=>n({})},$l=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";
import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const Tabs = tabs(context, {
    tabDefs: createTabDefs(context),
    class: css\`
      flex-direction: column-reverse;
    \`,
  });

  return () => Tabs({});
};
`,Ll=t=>{const{css:e}=t,n=Vn(t),o=zt(t,{tabDefs:n,class:e`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},Pl=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const tabDefs = createTabDefs(context);

  const Tabs = tabs(context, {
    tabDefs,
    class: css\`
      & ul {
        justify-content: center;
      }
    \`,
  });

  return () => Tabs({});
};
`,zl={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Il,createComponent:Bl},{title:"Extended Tabs",description:"An extended tabs.",code:Ml,createComponent:Nl},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:$l,createComponent:Ol},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Pl,createComponent:Ll}]},Rl=t=>{const e=F(t);return()=>e(zl)};function Rt(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:r}=n.tags;a`
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
`;const i=o`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    width: fit-content;
  `;return function(...l){let[{...c},...u]=W(l);return r({...c,class:B("table-container",i,e==null?void 0:e.class,c==null?void 0:c.class)},...u)}}const _l=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags;function d(h,x,v,w,S){return{name:h,calories:x,fat:v,carbs:w,protein:S}}const m=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],p=({name:h,calories:x})=>i(r(h),r({class:n`
            text-align: right;
          `},x)),b=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Rt(t,{class:n`
      max-width: 650px;
    `});return()=>o(g(s(u("Basic Table"),b(),c(m.map(p)))))},jl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function At(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Gl=[At("Frozen yoghurt",159,6,24,4),At("Ice cream sandwich",237,9,37,4.3),At("Eclair",262,16,24,6),At("Cupcake",305,3.7,67,4.3),At("Gingerbread",356,16,49,3.9)],Hl=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags,d=({name:b,calories:g})=>i(r(b),r({class:n`
            text-align: right;
          `},g)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),p=Rt(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(p(s(u("Table Dense"),m(),c(Gl.map(d)))))},Fl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Bt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Ul=[Bt("Frozen yoghurt",159,6,24,4),Bt("Ice cream sandwich",237,9,37,4.3),Bt("Eclair",262,16,24,6),Bt("Cupcake",305,3.7,67,4.3),Bt("Gingerbread",356,16,49,3.9)],Vl=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags,d=({name:b,calories:g})=>i(r(b),r({class:n`
            text-align: right;
          `},g)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),p=Rt(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(p(s(u("Table Zebra"),m(),c(Ul.map(d)))))},Jl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,ql={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:jl,createComponent:_l},{title:"Dense",description:"A dense table.",code:Fl,createComponent:Hl},{title:"Zebra",description:"A zebra table.",code:Jl,createComponent:Vl}]},Wl=t=>{const e=F(t);return()=>e(ql)},Kl=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:r,section:i,article:s}=e.tags,l=an(t),c=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),r({id:"h3-1-1"},"h3 1 1"),r({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),r({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},Xl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Zl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Xl,createComponent:Kl}]},Yl=t=>{const e=F(t);return()=>e(Zl)};function Jn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=he(t),i=P(t),s=bt(t),l=o`
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
  `,c=({label:b,icon:g,...h})=>i({"aria-label":b,title:b,...h},g),u=({count:b,totalCount:g,page:h,rowsPerPage:x})=>a({class:"pages-numbers"},Number(h-1)*Number(x)+(b>0?1:0),"-",Math.min(h*x,g)," of ",g),d=({count:b,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(b>0?1:0),"-",g*h),m=b=>b<=1,p=(b,g,h)=>b>=Math.ceil(g/h);return function(...g){let[{size:h=e.size??"md",variant:x=e.variant??"outline",color:v=e.color??"neutral",count:w=0,totalCount:S=0,page:E=1,rowsPerPage:D=50,onPageChange:A,isLoading:I=!1,disableFirst:M=()=>m(E),disablePrevious:$=()=>m(E),disableNext:L=()=>p(E,S,D),disableLast:j=()=>p(E,S,D),...G},...U]=W(g);const z=Math.max(0,Math.ceil(S/D)),C=A({page:1}),f=A({page:E-1}),y=A({page:E+1}),k=A({page:z}),T=[{label:"First",icon:"⟪",onclick:C,disabled:M()},{label:"Previous",icon:"⟨",onclick:f,disabled:$()},{label:"Next",icon:"⟩",onclick:y,disabled:L()},{label:"Last",icon:"⟫",onclick:k,disabled:j()}];return a({...G,class:B("table-pagination",l,I&&"disabled",e==null?void 0:e.class,G==null?void 0:G.class)},s({class:"spinner",visibility:I,size:"md"}),S>0?u({count:w,totalCount:S,page:E,maxPages:z,rowsPerPage:D}):d({count:w,page:E,maxPages:z,rowsPerPage:D}),r({variant:x,color:v},T.map(H=>c({...H,variant:x,color:v}))))}}const Ql=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),tu=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:r,table:i,thead:s,tbody:l}=e.tags,c=Ql(45),u=({name:v,email:w})=>r(a(v),a(w)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),m=Jn(t),p=Rt(t,{class:n`
      max-width: 650px;
    `}),b=e.state(c),g=e.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),h=e.derive(()=>b.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),x=({page:v})=>w=>{g.val.page=v};return()=>p(i(d(),()=>l(h.val.map(u))),()=>m({...g.val,onPageChange:x}))},eu=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:r,table:i,thead:s,tbody:l,div:c}=e.tags,u=e.state(!1),d=e.state([]),m=e.state(""),p=e.derive(()=>d.val.length),b=e.state(1),g=e.state(10),h=e.derive(()=>d.val),x=M=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(M).toString()}`,v=({page:M})=>$=>{b.val=M,w(x({page:M,per_page:g.val}))};w(x({page:1,per_page:g.val}));async function w(M){try{u.val=!0;const $=await fetch(M,{});if($.ok){const L=await $.json();d.val=L;return}throw $}catch($){m.val=$.message}finally{u.val=!1}}const S=({name:M,description:$,stargazers_count:L})=>r(a(M),a($),a({class:n`
            text-align: right;
          `},L)),E=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),D=Jn(t),A=Rt(t,{class:n`
      min-width: 650px;
    `}),I=({message:M})=>c(M);return()=>A(()=>D({rowsPerPage:g.val,page:b.val,count:p.val,totalCount:-1,isLoading:u.val,onPageChange:v,disableNext:()=>!1}),i(E(),()=>m.val&&I({message:m.val}),()=>l(h.val.map(S))))},nu=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:r,h2:i,tr:s}=e.tags,l=tu(t),c=eu(t),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(s("Table Pagination")),r("Asynchronous Pagination"),u(c()),r("Simple Pagination"),u(l()))};function _t(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{button:r}=n.tags;a`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.3);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.4)
    }
  `;const i=o`
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
    &:hover:not(.selected) {
      filter: brightness(var(--brightness-hover)) !important;
    }
    &:hover.solid:not(.selected) {
      filter: brightness(var(--brightness-hover-always)) !important;
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",selected:m=!1,disabled:p,onChange:b,...g},...h]=W(l);return r({type:"button",...g,"aria-pressed":{deps:[m],renderProp:()=>x=>x},class:{deps:[m],renderProp:()=>x=>B("toggle",c,d,u,i,x&&"selected",e==null?void 0:e.class,g==null?void 0:g.class)},disabled:p},h)}}const qn=(t,e)=>{const{bau:n}=t,o=_t(t,e);return a=>{const r=n.state(!1);return o({...a,selected:r,onclick:()=>r.val=!r.val},"Toggle Me")}},ou=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=_t(t,{variant:"plain"}),i=P(t,{variant:"outline",color:"primary"}),s=e.state(!1),l=c=>{var m;c.preventDefault();const d=(m=c.currentTarget.querySelector("button[aria-pressed=true]"))==null?void 0:m.name;alert(d)};return()=>n({onsubmit:l},o(r({name:"my-toogle",selected:s,onclick:()=>s.val=!s.val},"Toggle Me")),a(i({type:"submit"},"Submit")))},au=`import { Context } from "@grucloud/bau-ui/context";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;

  const Toggle = toggle(context, { variant: "plain" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const selectedState = bau.state(false);

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const buttonName = formEl.querySelector("button[aria-pressed=true]")?.name;
    alert(buttonName);
  };

  return () =>
    form(
      { onsubmit },
      article(
        Toggle(
          {
            name: "my-toogle",
            selected: selectedState,
            onclick: () => (selectedState.val = !selectedState.val),
          },
          "Toggle Me"
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,ru={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:au,createComponent:ou}],gridItem:qn},su=t=>{const e=F(t);return()=>e(ru)},iu=()=>ot.map(t=>`
&.toggle-group.${t} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${t}) !important;
  }
}

&.toggle-group.outline.${t} {
  border: none;
}

&.toggle-group.solid.${t} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function ye(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
    ${iu()}
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:m=()=>{},...p},...b]=W(s);const g=new Set,h=x=>{const{value:v}=x.target;d?(g.clear(),g.add(v)):g.has(v)?g.delete(v):g.add(v),m({event:x,values:[...g]})};return a({...p,class:B("toggle-group",l,u,c,r,e==null?void 0:e.class,p==null?void 0:p.class),onclick:h},...b)}}const Wn=(t,e)=>{const{bau:n}=t,o=ye(t,e),a=_t(t,e);return r=>{const i=n.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...r,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:u})=>()=>a({...r,value:u,selected:i.val.includes(u),"area-label":c},c)))}},cu=t=>{const{bau:e}=t,{form:n,footer:o,article:a}=e.tags,r=e.state([""]),i=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s="primary",l="solid",c=_t(t,{color:s,variant:l}),u=ye(t,{color:s,variant:l}),d=P(t,{variant:"outline",color:"primary"}),m=({values:b})=>{r.val=b},p=b=>{var x;b.preventDefault();const h=(x=b.currentTarget.querySelector("button[aria-pressed=true]"))==null?void 0:x.name;alert(h)};return()=>n({onsubmit:p},a(u({exclusive:!0,onChange:m},i.map(({label:b,value:g})=>()=>c({value:g,name:b,selected:r.val.includes(g)},b)))),o(d({type:"submit"},"Submit")))},lu=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { form, footer, article } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const color = "primary";
  const variant = "solid";

  const Toggle = toggle(context, { color, variant });
  const ToggleGroup = toggleGroup(context, { color, variant });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const buttonName = formEl.querySelector("button[aria-pressed=true]")?.name;
    alert(buttonName);
  };

  return () =>
    form(
      { onsubmit },
      article(
        ToggleGroup(
          { exclusive: true, onChange },
          groups.map(
            ({ label, value }) =>
              () =>
                Toggle(
                  {
                    value,
                    name: label,
                    selected: selectedState.val.includes(value),
                  },
                  label
                )
          )
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,uu=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=e.state([""]),i=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s="primary",l="solid",c=_t(t,{variant:l,color:s}),u=ye(t,{variant:l,color:s}),d=P(t,{variant:"outline",color:"primary"}),m=({values:b})=>{r.val=b},p=b=>{b.preventDefault();const h=[...b.currentTarget.querySelectorAll("button[aria-pressed=true]")].map(({name:x})=>x);alert(JSON.stringify(h))};return()=>n({onsubmit:p},o(u({onChange:m},i.map(({label:b,value:g})=>()=>c({value:g,name:b,selected:r.val.includes(g)},b)))),a(d({type:"submit"},"Submit")))},du=`import { Context } from "@grucloud/bau-ui/context";
import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const color = "primary";
  const variant = "solid";

  const Toggle = toggle(context, { variant, color });
  const ToggleGroup = toggleGroup(context, { variant, color });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const buttonNames = [
      ...formEl.querySelectorAll("button[aria-pressed=true]"),
    ].map(({ name }: any) => name);
    alert(JSON.stringify(buttonNames));
  };

  return () =>
    form(
      { onsubmit },
      article(
        ToggleGroup(
          { onChange },
          groups.map(
            ({ label, value }) =>
              () =>
                Toggle(
                  {
                    value,
                    name: label,
                    selected: selectedState.val.includes(value),
                  },
                  label
                )
          )
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,mu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:lu,createComponent:cu},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:du,createComponent:uu}],gridItem:Wn},pu=t=>{const e=F(t);return()=>e(mu)};function Se(t,e={}){const{bau:n,css:o,window:a}=t,{div:r}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=e.size??"md",variant:m=e.variant??"outline",color:p=e.color??"neutral",...b},...g]=W(l);const h=r({class:B("container",...u.split("-"))},r({class:B("content",p,m,d),role:"tooltip"},c)),x=A=>`move-to-${A}`,v=(A,I,M)=>{if(A()){const $=x(I);h.classList.add($),h.classList.add(I),h.classList.remove(M)}},w=(A,I)=>{const M=x(A);h.classList.contains(M)&&(h.classList.remove(M),h.classList.add(I),h.classList.remove(A))},S=A=>{const I=h.getBoundingClientRect();v(()=>I.x<0,"right","left"),v(()=>I.x+I.width>a.innerWidth,"left","right"),v(()=>I.y<0,"bottom","top"),v(()=>I.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},E=A=>{h.classList.remove("visible"),w("right","left"),w("left","right"),w("bottom","top"),w("top","bottom")};return r({...b,class:B("tooltip",i,e==null?void 0:e.class,b==null?void 0:b.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",E)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",E)}},...g,h)}}const Kn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:r}=n.tags,i=P(t),s=Se(t,e),l=()=>o(a("A ",r("tooltip")," can be any component"));return c=>s({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},bu=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,r=P(t),i=Se(t),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:s()},r("tooltip"))},gu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,fu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:r,section:i}=e.tags,s=Ot(t,{variant:"outline",color:"primary"}),l=Se(t),c=()=>o(a("A ",r("tooltip")," can be any component")),u=()=>i({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        `},o({class:n`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          `},l({side:"top-start",titleEl:c()},s("top-start")),l({side:"top-centered",titleEl:c()},s("top-centered")),l({side:"top-end",titleEl:c()},s("top-end"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-start",titleEl:c()},s("left-start")),l({side:"right-start",titleEl:c()},s("right-start"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-centered",titleEl:c()},s("left-centered")),l({side:"right-centered",titleEl:c()},s("right-centered"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-end",titleEl:c()},s("left end")),l({side:"right-end",titleEl:c()},s("right end"))),o({class:n`
            display: flex;
            justify-content: space-around;
          `},l({side:"bottom-start",titleEl:c()},s("bottom start")),l({side:"bottom-centered",titleEl:c()},s("bottom centered")),l({side:"bottom-end",titleEl:c()},s("bottom end"))));return()=>u()},hu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,vu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:gu,createComponent:bu},{title:"Grid",description:"Various tooltip position",code:hu,createComponent:fu}],gridItem:Kn},xu=t=>{const e=F(t);return()=>e(vu)},Xn=(t,e)=>{const n=se(t,e);return o=>n(o)},yu=t=>{const{bau:e}=t,{section:n}=e.tags,o=se(t);return()=>n(o({}))},Su=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,wu={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Su,createComponent:yu}],gridItem:Xn},Cu=t=>{const e=F(t);return()=>e(wu)},Zn=({parent:t,grandParent:e})=>n=>{const{children:o=[],...a}=n,r={...a};return r.children=o==null?void 0:o.map(Zn({parent:n,grandParent:t})),t&&(t.parent=e),r.parent=t,r},ku=({css:t,createGlobalStyles:e})=>(e`
:root {
  --treeview-link-padding-horizontal: 2rem;
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
            text-align: left;
            color: inherit;
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `});function we(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:r}=e,{ul:i,li:s,nav:l,div:c}=n.tags,u=ku({css:o,createGlobalStyles:a}),d=be(t),m=({depth:p=1,maxDepth:b,parent:g,color:h,variant:x,size:v})=>w=>{const{children:S,expanded:E}=w,D=n.state(!E),A=()=>c({class:o`
              cursor: ${S?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:M=>{S&&(D.val=!D.val)}},r({item:w,parent:g,depth:p})),I=()=>i({class:B(h,v)},S.map(m({depth:p+1,maxDepth:b,parent:w})));return s(S.length?d({expanded:E,Header:A,Content:S&&p<b&&I}):A())};return function({tree:b,maxDepth:g=1/0,size:h=e.size??"md",variant:x=e.variant??"outline",color:v=e.color??"neutral",...w}){return l({class:B(u.nav,h,x,v,e==null?void 0:e.class,w.class)},i(m({maxDepth:g,color:v,variant:x,size:h})(Zn({})({...b}))))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=we(t,{renderMenuItem:({item:{data:{name:s,href:l}}})=>o({href:l},s),...e});return s=>i({...s,tree:a})},Eu=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=we(t,{renderMenuItem:({item:{data:{name:i,href:s}}})=>n({href:s},i)});return()=>r({tree:o})},Tu=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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

  const renderMenuItem = ({
    item: {
      data: { name, href },
    },
  }: any) => a({ href }, name);

  const TreeView = treeView(context, { renderMenuItem });

  return () => TreeView({ tree: menu });
};
`,Du=t=>{const{bau:e,css:n,window:o}=t,{form:a,label:r,article:i,footer:s}=e.tags,l=Tt(t,{color:"neutral",variant:"outline"}),c=P(t,{variant:"solid",color:"danger"}),u=e.state(0),d=S=>{S.preventDefault();const E=Object.fromEntries(new FormData(S.currentTarget));alert(JSON.stringify(E))},m={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},p=({id:S,name:E})=>S??E,b=S=>o.document.getElementById(p(S)),g=({onNode:S})=>E=>{S(E);const{children:D=[]}=E;D.map(g({onNode:S}))},h=({parent:S})=>{if(S){const{children:E}=S,D=b(S.data);if(D){const A=E.every(I=>{const{checked:M,indeterminate:$}=b(I.data);return!M&&!$});D.indeterminate=!A&&E.some(I=>!b(I.data).checked),D.checked=E.every(I=>b(I.data).checked)}h({parent:S.parent})}},x=({item:S,parent:E})=>D=>{h({parent:E}),g({onNode:M=>{const $=b(M.data);$&&($.checked=D.target.checked,$.indeterminate=!1)}})(S);const I=D.currentTarget.querySelectorAll('input[type="checkbox"][data-type="resources"]:checked');u.val=I.length,D.stopPropagation()},w=we(t,{renderMenuItem:({item:S,parent:E})=>{const{name:D,id:A}=S.data,I=p(S.data);return r({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:M=>M.stopPropagation()},l({onclick:x({item:S,parent:E}),name:I,id:I,"data-type":A?"resources":"group"}),D)}});return()=>a({onsubmit:d},i(w({tree:m})),s(c({type:"submit"},()=>`Delete ${u.val} Resource(s)`)))},Au=`import { Context } from "@grucloud/bau-ui/context";
import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css, window } = context;
  const { form, label, article, footer } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "solid",
    color: "danger",
  });

  const selectedCount = bau.state(0);

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    alert(JSON.stringify(payload));
  };

  const tree: Tree = {
    data: { name: "Resources" },
    expanded: true,
    children: [
      {
        data: { name: "EC2" },
        expanded: true,
        children: [
          { data: { name: "Vpc", id: "EC2::Vpc" } },
          { data: { name: "Subnet", id: "EC2::Subnet" } },
        ],
      },
      {
        data: { name: "IAM" },
        children: [{ data: { name: "Role", id: "IAM:Role" } }],
      },
    ],
  };

  const getCheckboxId = ({ id, name }: any) => id ?? name;
  const getCheckboxEl = (data: any): HTMLInputElement =>
    window.document.getElementById(getCheckboxId(data)) as HTMLInputElement;

  const walkTree =
    ({ onNode }: any) =>
    (item: any) => {
      onNode(item);
      const { children = [] } = item;
      children.map(walkTree({ onNode }));
    };

  const isParentIndeterminate = ({ parent }: any) => {
    if (parent) {
      const { children } = parent;
      const parentCheckboxEl = getCheckboxEl(parent.data);
      if (parentCheckboxEl) {
        const allUnchecked = children.every((child: any) => {
          const { checked, indeterminate } = getCheckboxEl(child.data);
          return !checked && !indeterminate;
        });
        parentCheckboxEl.indeterminate =
          !allUnchecked &&
          children.some((child: any) => !getCheckboxEl(child.data).checked);
        parentCheckboxEl.checked = children.every(
          (child: any) => getCheckboxEl(child.data).checked
        );
      }
      isParentIndeterminate({ parent: parent.parent });
    }
  };

  const onclickCheckbox =
    ({ item, parent }: any) =>
    (event: any) => {
      isParentIndeterminate({ parent });
      walkTree({
        onNode: (node: any) => {
          const checkboxEl = getCheckboxEl(node.data);
          if (checkboxEl) {
            checkboxEl.checked = event.target.checked;
            checkboxEl.indeterminate = false;
          }
        },
      })(item);

      const formEl = event.currentTarget;
      const checkboxesChecked = formEl.querySelectorAll(
        'input[type="checkbox"][data-type="resources"]:checked'
      );
      selectedCount.val = checkboxesChecked.length;
      event.stopPropagation();
    };

  const renderMenuItem = ({ item, parent }: any) => {
    const { name, id } = item.data;
    const checkboxId = getCheckboxId(item.data);
    return label(
      {
        class: css\`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        \`,
        onclick: (event: any) => event.stopPropagation(),
      },
      Checkbox({
        onclick: onclickCheckbox({ item, parent }),
        name: checkboxId,
        id: checkboxId,
        "data-type": id ? "resources" : "group",
      }),
      name
    );
  };

  const TreeView = treeView(context, { renderMenuItem });

  return () =>
    form(
      { onsubmit },
      article(TreeView({ tree })),
      footer(
        Button(
          { type: "submit" },
          () => \`Delete \${selectedCount.val} Resource(s)\`
        )
      )
    );
};
`,Bu={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:Tu,createComponent:Eu},{title:"Checkable",description:"A treeview with checkboxes.",code:Au,createComponent:Du}],gridItem:Yn},Iu=t=>{const e=F(t);return()=>e(Bu)},Nu=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=zt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return s=>i(s)},Mu=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:r,p:i,ul:s,li:l}=e.tags,c=rn(t),u=P(t),d=[{name:"Accordion",Item:sn(t)},{name:"Alert",Item:ln(t)},{name:"Autocomplete",Item:dn(t)},{name:"Avatar",Item:un(t)},{name:"Badge",Item:pn(t)},{name:"Breadcrumbs",Item:bn(t)},{name:"Button",Item:gn(t)},{name:"Button Group",Item:fn(t)},{name:"Calendar",Item:vn(t)},{name:"Checkbox",Item:yn(t)},{name:"Chip",Item:xn(t)},{name:"DrillDown Menu",Item:wn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:kn(t)},{name:"Input",Item:En(t)},{name:"Input Search",Item:Tn(t)},{name:"Linear Progress",Item:Nn(t)},{name:"Loading Button",Item:Mn(t)},{name:"Modal",Item:$n(t)},{name:"Radio Button",Item:Ln(t)},{name:"Select",Item:Pn(t)},{name:"Select Native",Item:Rn(t)},{name:"Slider",Item:_n(t)},{name:"Spinner",Item:jn(t)},{name:"Switch",Item:Un(t)},{name:"Tabs",Item:Nu(t)},{name:"Theme Switch",Item:Xn(t)},{name:"Toggle",Item:qn(t)},{name:"Toggle Group",Item:Wn(t)},{name:"Tooltip",Item:Kn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
          overflow-y: scroll;
        `},r("Bau Component Gallery"),i("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:m})=>l(u({color:"primary",variant:"solid",href:`#${m}`,size:"sm"},m)))),d.map(m=>a({id:m.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},c(m))))},Ou=({context:t})=>{const e=Mu(t);return[{path:"",action:n=>({title:"Bau UI",component:_o(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Fa(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Qa(t)})},{path:"alert",action:()=>({title:"Alert",component:ir(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:mr(t)})},{path:"animate",action:()=>({title:"Animate",component:vr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:$r(t)})},{path:"avatar",action:()=>({title:"Avatar",component:kr(t)})},{path:"badge",action:()=>({title:"Badge",component:Rr(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ur(t)})},{path:"button",action:()=>({title:"Button",component:Xr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:es(t)})},{path:"calendar",action:()=>({title:"Calendar",component:rs(t)})},{path:"carousel",action:()=>({title:"Carousel",component:ds(t)})},{path:"chip",action:()=>({title:"Chip",component:gs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Cs(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Ds(t)})},{path:"divider",action:()=>({title:"Divider",component:Ms(t)})},{path:"drawer",action:()=>({title:"Drawer",component:zs(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Fs(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:qs(t)})},{path:"fileInput",action:()=>({title:"File Input",component:Zs(t)})},{path:"form",action:()=>({title:"Form",component:ri(t)})},{path:"input",action:()=>({title:"Input",component:di(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:gi(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:Si(t)})},{path:"lazy",action:()=>({title:"Lazy",component:Bi(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Oi(t)})},{path:"list",action:()=>({title:"List",component:Ui(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:zi(t)})},{path:"modal",action:()=>({title:"Modal",component:Wi(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:nc(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:dc(t)})},{path:"paper",action:()=>({title:"Paper",component:fc(t)})},{path:"popover",action:()=>({title:"Popover",component:sc(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:yc(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:Ic(t)})},{path:"select",action:()=>({title:"Select",component:Gc(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:Vc(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:el(t)})},{path:"slider",action:()=>({title:"Slider",component:dl(t)})},{path:"spinner",action:()=>({title:"Spinner",component:gl(t)})},{path:"stepper",action:()=>({title:"Stepper",component:wl(t)})},{path:"switch",action:()=>({title:"Switch",component:Dl(t)})},{path:"table",action:()=>({title:"Table",component:Wl(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Yl(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:nu(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Rl(t)})},{path:"toggle",action:()=>({title:"Toggle",component:su(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:pu(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:xu(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Cu(t)})},{path:"treeView",action:()=>({title:"Tree View",component:Iu(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Ho(t)})}]},$u=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),Lu=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=t,i=a.state(),s=e({componentState:i});return document.getElementById("app").replaceChildren(s),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:m,Layout:p=e}=c.resolve({pathname:u});i.val=m({}),document.title=`${d}`}},Pu=t=>{const{createGlobalStyles:e}=t;e`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
    }
    code.hljs {
      padding: 3px 5px;
    }
    .hljs {
      background: #2f1e2e;
      color: #a39e9b;
    }
    .hljs-comment,
    .hljs-quote {
      color: #8d8687;
    }
    .hljs-link,
    .hljs-meta,
    .hljs-name,
    .hljs-regexp,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-tag,
    .hljs-template-variable,
    .hljs-variable {
      color: #ef6155;
    }
    .hljs-built_in,
    .hljs-deletion,
    .hljs-literal,
    .hljs-number,
    .hljs-params,
    .hljs-type {
      color: #f99b15;
    }
    .hljs-attribute,
    .hljs-section,
    .hljs-title {
      color: #fec418;
    }
    .hljs-addition,
    .hljs-bullet,
    .hljs-string,
    .hljs-symbol {
      color: #48b685;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #815ba4;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }

    pre code.hljs {
      border-radius: var(--global-radius);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `};ho();const Qn={title:"Bau",base:"/bau/bau-ui"},ft=Eo({config:Qn}),{bau:zu}=ft;ft.states={drawerOpen:zu.state(!0)};Pu(ft);ro({routes:Ou({context:ft}),onLocationChange:Lu({context:ft,LayoutDefault:Lo(ft),config:Qn}),notFoundRoute:$u(ft)});
