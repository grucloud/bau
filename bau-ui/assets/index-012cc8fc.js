(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),_e=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,..._e({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=_e({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},r=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:r}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,s,l)=>{i.apply(s,l),o.pathname!=window.location.pathname&&n({router:r}),a(window.location)}}),document.addEventListener("click",i=>{const{target:s}=i,l=s.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:r}),r}const ae=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],co=t=>`var(--color-${t})`,lo=t=>`var(--color-${t}-lightest)`,uo=()=>ae.map(([t])=>`
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
`),po=()=>ae.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),mo=t=>100-t*10,go=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${mo(e)}%);`).join(`
`),ke=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),bo=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,r])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${r}));`),...io.map(([a,r])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${r}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
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
      ${e.map(([n,o])=>bo([n,o])).join(`
`)}
      ${go()}
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
      ${po()}
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
  `}function ho(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let re=t=>Object.prototype.toString.call(t??0).slice(8,-1),vo=t=>re(t)=="Object",Ee=t=>re(t)=="Function",ee=t=>["Object","Array"].includes(re(t)),Te=Object.getPrototypeOf,ne=t=>wt(t)?t.val:t,wt=t=>t==null?void 0:t.__isState,xo=["splice","push","pop","shift","unshift","sort","reverse"],Gt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const J=t=>!wt(t[0])&&vo(t[0])?t:[{},...t];function yo(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,r=new Set,i=!1,s,l=w=>n.createElement(w),c=(w,f,y)=>{let k=s;s=f;let E=w(y);return s=k,E},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(w=>{w.bindings=w.bindings.filter(f=>{var y;return(y=f.element)==null?void 0:y.isConnected}),!w.bindings.length&&!w.computed&&a.delete(w)}),o=void 0}))},d=(w,f,y,k,E,H)=>{var z;if(i){r.add(w);return}for(let V of w.bindings){let{deps:K,element:I,renderInferred:X,render:nt,renderItem:Z}=V;if(Z&&f)(z=m(I,k,(...Y)=>b(Z(...Y)),y,E,H)[f])==null||z.call();else{let Y=X?X({element:I}):nt({element:I,renderItem:Z})(...K.map(ne));Y!==I&&I.replaceWith(V.element=b(Y))}}S(w),u()},p=(w,f,y=[])=>({get(k,E,H){var z;if(s==null||s.add(w),E==="_isProxy")return!0;if(!((z=k[E])!=null&&z._isProxy)&&!wt(k[E])&&ee(k[E]))k[E]=new Proxy(k[E],p(w,f,[...y,E]));else if(xo.includes(E)){let V=k[E];return(...K)=>{let I=V.apply(k,K);return d(w,E,I,K,f,y),I}}return Reflect.get(k,E,H)},set(k,E,H,z){let V=Reflect.set(k,E,H,z);return d(w,"setItem",V,{prop:E,value:H},f,[...y,E]),V}}),g=(w,f)=>new Proxy(f,p(w,f)),m=(w,f,y,k,E,H)=>{let z=()=>w.replaceChildren(...Gt(k,y)),V=K=>w[K]&&w.removeChild(w[K]);return{assign:z,sort:z,reverse:z,setItem:()=>{var I;let K=H[0];(I=w.children[K])==null||I.replaceWith(y(E[K],K))},push:()=>w.append(...Gt(f,(K,I)=>y(K,E.length+I))),unshift:()=>w.prepend(...Gt(f,y)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:K}=w.children;let[I,X=K,...nt]=f;for(let Z=I>=0?Math.min(I+X-1,K-1):K-1;Z>=(I>=0?I:K+I);Z--)w.children[Z].remove();if(nt.length){let Z=nt.forEach((Y,rt)=>y(Y,I+rt));w.children[I]?w.children[I].after(...Z):w.append(...Z)}}}},h=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let f=this;return s==null||s.add(f),f.valProxy??(f.valProxy=ee(w)?g(f,w):w,f.valProxy)},set val(f){let y=this,k=y.val;ee(f)?(y.valProxy=g(y,f),d(y,"assign",f)):f!==k&&(y.valProxy=f,d(y)),y.oldVal=k}}),b=w=>{if(w==null||w===!1){const f=l("span");return f.style.display="none",f}else return w.nodeType?w:n.createTextNode(w)},v=(w,f)=>{let y=new Set;return f.val=c(w,y),y},x=w=>{let f=h(),y=v(w,f);f.computed=!0;for(let k of y)k.listeners.push({computed:w,deps:y,state:f});return f},S=w=>{for(let f of[...w.listeners])v(f.computed,f.state)},C=(w,...f)=>{if(f.length){let y=[];for(let k of f.flat(1/0))k!=null&&y.push(wt(k)?G({deps:[k],render:()=>E=>E}):Ee(k)?j({renderInferred:k}):b(k));w.append(...y)}},T={},A=(w,f)=>w&&(Object.getOwnPropertyDescriptor(w,f)??A(Te(w),f)),D=(w,f,y)=>{var k;return T[w+","+f]??(T[w+","+f]=((k=A(y,f))==null?void 0:k.set)??0)},M=(w,f)=>new e.MutationObserver((y,k)=>{y.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(H=>H===w&&(f({element:w}),k.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),N=(w,f)=>new e.MutationObserver((y,k)=>y.forEach(E=>f({record:E,element:w}))).observe(w,{childList:!0}),O=w=>new Proxy(function(y,...k){var V;let[E,...H]=J(k),z=w?n.createElementNS(w,y):l(y);for(let[K,I]of Object.entries(E)){if(K.startsWith("bau"))continue;let X=D(y,K,Te(z))?nt=>nt!==void 0&&(z[K]=nt):nt=>z.setAttribute(K,nt);I==null||(wt(I)?G({deps:[I],render:()=>()=>(X(I.val),z)}):Ee(I)&&(!K.startsWith("on")||I.isDerived)?j({renderInferred:()=>(X(I({element:z})),z)}):I.renderProp?G({deps:I.deps,render:()=>()=>(X(I.renderProp({element:z})(...I.deps.map(ne))),z)}):X(I))}return E.bauChildMutated&&N(z,E.bauChildMutated),C(z,...H),z.autofocus&&z.focus&&e.requestAnimationFrame(()=>z.focus()),(V=E.bauCreated)==null||V.call(E,{element:z}),E.bauMounted&&e.requestAnimationFrame(()=>E.bauMounted({element:z})),E.bauUnmounted&&e.requestAnimationFrame(()=>M(z,E.bauUnmounted)),z},{get:(f,y)=>f.bind(void 0,y)}),L=(w,f,y)=>{w.element=b(y);for(let k of f)wt(k)&&(a.add(k),k.bindings.push(w));return w.element},j=({renderInferred:w,element:f})=>{let y=new Set,k=c(w,y,{element:f});return L({renderInferred:w},y,k)},G=({deps:w,element:f,render:y,renderItem:k})=>L({deps:w,render:y,renderItem:k},w,y({element:f,renderItem:k})(...w.map(ne))),F=(w,f,y)=>G({deps:[w],render:({renderItem:k})=>E=>(f.append(...Gt(E,k)),f),renderItem:y}),P=async w=>{i=!0;const f=await w();return i=!1,r.forEach(d),r.clear(),f};return{tags:O(),tagsNS:O,state:h,bind:G,loop:F,derive:x,stateSet:a,batch:P}}const wo=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},So=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Co=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function ko(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...r)=>{const i=Co(a,r),s=wo(i);return!e.getElementById(s)&&So(e,t==null?void 0:t.target,s,o(s,i)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Eo(t){const e=yo(),n=ko();return fo(n),{bau:e,...n,tr:o=>o,window,...t}}function B(...t){return t.filter(e=>e).join(" ")}function Wt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,r=()=>{};return function({animationHide:s=r,animationShow:l=r,...c},u){return a({class:B("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(g=>{if(!s()||g.getAttribute("cloned"))return;const m=g.cloneNode(!0);o.requestAnimationFrame(()=>{m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=g.getAttribute("width"),m.style.height=g.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),d.target.appendChild(m),m.addEventListener("animationend",()=>{var h;return(h=m.parentNode)==null?void 0:h.removeChild(m)})})}),[...d.addedNodes].forEach(g=>{g.getAttribute("cloned")||o.requestAnimationFrame(()=>{p.style.position="relative";const m=g.getBoundingClientRect();if(g.setAttribute("width",m.width+"px"),g.setAttribute("height",m.height+"px"),l()){g.style.animation=l();const h=()=>{g.removeEventListener("animationend",h),g.style.animation=""};g.addEventListener("animationend",h)}})})},...c},u)}}const ot=["neutral","primary","success","danger","warning"],To=["plain","outline","solid"],Ao=["sm","md","lg"],Do=()=>ot.map(t=>`
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
`);function R(t,e={}){const{bau:n,css:o}=t,a=o`
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
    ${Do()}
  `;return function(...i){let[{size:s=e.size??"md",variant:l=e.variant??"none",color:c=e.color??"none",href:u,...d},...p]=J(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:B("button",e.class,l,s,c,a,d.class),href:u},p)}}const Bo="light",Mo=()=>ot.map(t=>`
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
    ${Mo()}
  `;return function(...d){let[{size:p=e.size??"md",variant:g=e.variant??"plain",color:m=e.color??"neutral",...h},...b]=J(d);return r({required:"required",title:"Switch Theme",...h,class:B("theme-switch",m,g,p,c,e==null?void 0:e.class,h.class),type:"checkbox",checked:s()=="dark",onclick:v=>{i(v.target.checked?"dark":"light")}},...b)}}function Io(t){const{tr:e,bau:n,css:o,config:a,states:r}=t,{i,header:s,h1:l,div:c,a:u,img:d,b:p,ul:g,li:m}=n.tags,{svg:h,path:b}=n.tagsNS("http://www.w3.org/2000/svg"),v=r.drawerOpen,x=R(t,{class:o`
      background: transparent;
    `}),S=se(t),C=()=>i(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},b({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),T=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},x({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>v.val=!v.val},C()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(e("Bau UI")))),A=()=>c({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),x({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},T(),A())}}function No({tr:t,bau:e,css:n}){const{section:o,footer:a,span:r,a:i,ul:s,li:l,p:c,div:u,h1:d}=e.tags,p=({links:h,title:b})=>o({class:n`
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
        `},d(b),s(h.map(({href:v,name:x})=>l(i({href:v},x))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],m=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:g}),p({title:"Bau Ecosystem",links:m})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},r("v0.72.0"),r("MIT license")))}}function vt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("list",r,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const Ht="0.3s",Re=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,r={...a};return r.children=o==null?void 0:o.map(Re({parent:n,grandParent:t})),t&&(t.parentTree=e),r.parentTree=t,r},je=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=je(t)(e.children[o]);if(a)return a}},$o=({keyframes:t})=>({hideToLeft:t`
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
   `});function ie(t,e={}){const{bau:n,css:o,window:a,config:r}=t,{base:i="",hashBased:s=!1}=e,l=`${r.base}${i}`,c=P=>{var w;return((w=P.parentTree.data)==null?void 0:w.href)??P.parentTree.children[0].data.href},u=({variant:P,color:w,size:f,currentTree:y,data:k})=>S(D({variant:P,color:w,size:f,href:`${l}${c(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:P,color:w,size:f,href:`${l}${k.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},k.name)),d=({size:P,subTree:{data:{name:w,href:f},children:y=[]}})=>D({size:P,href:`${l}${f}`,"data-ischild":!y.length},w),p=({pathname:P,subTree:w})=>{var f;return P===((f=w==null?void 0:w.data)==null?void 0:f.href)},{renderHeader:g=u,renderMenuItem:m=d,isActive:h=p}=e,{li:b,nav:v,div:x,header:S,a:C}=n.tags,T=Wt(t),A=vt(t),D=R(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:M,hideToRight:N}=$o(t),O=o`
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
  `,L=({children:P,pathnameState:w,variant:f,color:y,size:k})=>A({class:B(f,y,k)},P.map(E=>b({class:()=>B(E.children&&"has-children",h({pathname:w.val,subTree:E})&&"active")},m({variant:f,color:y,size:k,subTree:E})))),j=({variant:P,color:w,size:f,currentTree:y,pathnameState:k})=>{const{children:E,parentTree:H,data:z,renderList:V}=y;return x({class:B("drillDownMenu",P,w,f)},H&&g({variant:P,color:w,size:f,data:z,currentTree:y}),E&&V?V({renderListDefault:L,children:E,pathnameState:k,variant:P,color:w,size:f}):L({children:E,pathnameState:k,variant:P,color:w,size:f}))},G=({tree:P,pathname:w})=>{let f=Re({})({...P}),y=je(w)(f);return y||(y=f),y},F=({target:P})=>{let f=P.closest("a").getAttribute("href").replace(l,"");return s||(f=f.replace(P.hash,"")),f};return function(w){const{size:f=e.size??"md",variant:y=e.variant??"plain",color:k=e.color??"neutral",tree:E,...H}=w,z=n.state(a.location.pathname.replace(l,""));let V=G({tree:E,pathname:z.val});const K=n.state(JSON.stringify(V.data));let I;a.document.addEventListener("click",Y=>{const{target:rt}=Y,ct=rt.closest("a");if(!ct)return;const lt=ct.getAttribute("href");lt&&!lt.startsWith("http")&&!lt.startsWith("#")&&!lt.startsWith("?")&&(V=G({tree:E,pathname:F(Y)}),K.val=JSON.stringify(V.data),z.val=F({target:rt}))});const X=Y=>{const{buttonback:rt,ischild:ct}=Y.target.dataset;rt=="true"?I=-1:ct=="false"?I=1:ct=="true"&&(I=0)},nt=Y=>{switch(Y){case 1:return`${M} ${Ht}`;case-1:return`${N} ${Ht}`;default:return""}},Z=Y=>{switch(Y){case 1:return`${N} ${Ht} reverse`;case-1:return`${M} ${Ht} reverse`;default:return""}};return v({class:B(O,y,k,f,e==null?void 0:e.class,H.class),onclick:X},T({animationHide:()=>nt(I),animationShow:()=>Z(I)},n.bind({deps:[K],render:()=>()=>j({variant:y,color:k,size:f,currentTree:V,pathnameState:z})})))}}const Oo=()=>ot.map(t=>`
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
`);function pt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
    ${Oo()}
  `;return function(s){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=s;return a({type:"text",...u,class:B("input",e.class,e.size??"md",c,l,r,u.class)})}}function ce(t,e={}){const{bau:n,css:o,window:a}=t,r=pt(t,e);return function(s){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=s,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,g=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return r({type:"search",...u,color:c,variant:l,class:B("inputSearch",e.class,g,u.class)})}}function Ge(t){const{tr:e,bau:n,css:o,config:a,states:r,window:i}=t,{div:s,ul:l,li:c,nav:u,a:d,span:p,form:g}=n.tags,m=ce(t,{variant:"plain",color:"neutral",size:"sm"}),b={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:S,children:C,pathnameState:T,variant:A,color:D,size:M})=>{const N=n.state(""),O=n.derive(()=>N.val==""?C:C.filter(j=>j.data.name.match(new RegExp(`${N.val}`,"i")))),L=j=>{N.val=j.target.value};return g({class:o`
          display: flex;
          flex-direction: column;
        `},m({autocomplete:"off",name:"component-search",autofocus:!0,value:N,placeholder:`Search ${O.val.length} components`,size:32,oninput:L}),()=>S({children:O.val,pathnameState:T,variant:A,color:D,size:M}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let v=!1;const x=ie(t);return function(){return s({bauMounted:({element:C})=>{i.innerWidth<=640&&(v=!0,r.drawerOpen.val=!1)},onclick:C=>{v&&!C.target.dataset.buttonback&&!C.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:B(o`
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
          `)},x({tree:b}))}}const Lo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:r}=e.tags,i=Wt(t),s=Io(t),l=Ge(t),c=No(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:g}){return r({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),c())}};function Nt(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...p},...g]=J(s);return a({...p,onclick:d,class:B("chip",e.class,l,c,u,d&&"clickable",r,p.class)},...g)}}function Po(t){const{bau:e,css:n,config:o}=t,{div:a,h1:r,h2:i,p:s}=e.tags;R(t);const l=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:l},r(u),i(d),s(p))}}function zo(t){const{bau:e,css:n}=t,{div:o,h1:a,p:r}=e.tags,i=n`
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
  `,s=({title:l,Content:c})=>o({className:"feature"},a(l),r(c()));return function({featuresContent:c}){return o({class:i},c.map(s))}}function _o({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:r,dd:i,div:s,aside:l,footer:c,a:u}=e.tags,d=({maxSize:p=151})=>({libName:g,size:m})=>s({class:n`
            display: flex;
            margin: 0.3rem;
          `},r({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},g),i({class:n`
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
                  var(--color-success) ${m/p*100}%
                );
                justify-content: flex-end;
                width: ${m/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},m)));return function({data:g=[]}){return o({class:n`
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
          `},g.map(d({}))),c({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Ro(t){const{bau:e,css:n,config:o}=t,{div:a,p:r,a:i,section:s}=e.tags,l=Po(t),c=zo(t),u=R(t);Nt(t);const d=_o(t),p=(...v)=>a({class:n`
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
          `},...v)),g=n``,m=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[r("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[r("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]}],b=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:h}),d({data:m}),b())}}function jo(t,e={}){const{bau:n,css:o}=t,{div:a,form:r,span:i,pre:s,h3:l,h4:c}=n.tags;return function(d,...p){return a("Login")}}const Go=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:r,h2:i}=n.tags,s=jo(t);return()=>o({id:"login"},i(e("Login Examples")),r("Basic"),a(s()))};function Ho(t){const{tr:e,bau:n,css:o}=t,{div:a,article:r,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(e("Pages Examples")),Go(t)()))}}function Uo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function He(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&He(n)}),t}class Ae{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ue(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function mt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Fo="</span>",De=t=>!!t.scope,Vo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Wo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Ue(e)}openNode(e){if(!De(e))return;const n=Vo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){De(e)&&(this.buffer+=Fo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Be=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class le{constructor(){this.rootNode=Be(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Be({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{le._collapse(n)}))}}class Jo extends le{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Wo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Mt(t){return t?typeof t=="string"?t:t.source:null}function Fe(t){return xt("(?=",t,")")}function Ko(t){return xt("(?:",t,")*")}function qo(t){return xt("(?:",t,")?")}function xt(...t){return t.map(n=>Mt(n)).join("")}function Xo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function ue(...t){return"("+(Xo(t).capture?"":"?:")+t.map(o=>Mt(o)).join("|")+")"}function Ve(t){return new RegExp(t.toString()+"|").exec("").length-1}function Zo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function de(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let r=Mt(o),i="";for(;r.length>0;){const s=Yo.exec(r);if(!s){i+=r;break}i+=r.substring(0,s.index),r=r.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+a):(i+=s[0],s[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Qo=/\b\B/,We="[a-zA-Z]\\w*",pe="[a-zA-Z_]\\w*",Je="\\b\\d+(\\.\\d+)?",Ke="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",qe="\\b(0b[01]+)",ta="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ea=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=xt(e,/.*\b/,t.binary,/\b.*/)),mt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},It={begin:"\\\\[\\s\\S]",relevance:0},na={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[It]},oa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[It]},aa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Jt=function(t,e,n={}){const o=mt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ue("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ra=Jt("//","$"),sa=Jt("/\\*","\\*/"),ia=Jt("#","$"),ca={scope:"number",begin:Je,relevance:0},la={scope:"number",begin:Ke,relevance:0},ua={scope:"number",begin:qe,relevance:0},da={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[It,{begin:/\[/,end:/\]/,relevance:0,contains:[It]}]}]},pa={scope:"title",begin:We,relevance:0},ma={scope:"title",begin:pe,relevance:0},ga={begin:"\\.\\s*"+pe,relevance:0},ba=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Ut=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Qo,IDENT_RE:We,UNDERSCORE_IDENT_RE:pe,NUMBER_RE:Je,C_NUMBER_RE:Ke,BINARY_NUMBER_RE:qe,RE_STARTERS_RE:ta,SHEBANG:ea,BACKSLASH_ESCAPE:It,APOS_STRING_MODE:na,QUOTE_STRING_MODE:oa,PHRASAL_WORDS_MODE:aa,COMMENT:Jt,C_LINE_COMMENT_MODE:ra,C_BLOCK_COMMENT_MODE:sa,HASH_COMMENT_MODE:ia,NUMBER_MODE:ca,C_NUMBER_MODE:la,BINARY_NUMBER_MODE:ua,REGEXP_MODE:da,TITLE_MODE:pa,UNDERSCORE_TITLE_MODE:ma,METHOD_GUARD:ga,END_SAME_AS_BEGIN:ba});function fa(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function ha(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function va(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=fa,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function xa(t,e){Array.isArray(t.illegal)&&(t.illegal=ue(...t.illegal))}function ya(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function wa(t,e){t.relevance===void 0&&(t.relevance=1)}const Sa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=xt(n.beforeMatch,Fe(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Ca=["of","and","for","in","not","or","if","then","parent","list","value"],ka="keyword";function Xe(t,e,n=ka){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(r){Object.assign(o,Xe(t[r],e,r))}),o;function a(r,i){e&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){const l=s.split("|");o[l[0]]=[r,Ea(l[0],l[1])]})}}function Ea(t,e){return e?Number(e):Ta(t)?0:1}function Ta(t){return Ca.includes(t.toLowerCase())}const Me={},ht=t=>{console.error(t)},Ie=(t,...e)=>{console.log(`WARN: ${t}`,...e)},yt=(t,e)=>{Me[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Me[`${t}/${e}`]=!0)},Vt=new Error;function Ze(t,e,{key:n}){let o=0;const a=t[n],r={},i={};for(let s=1;s<=e.length;s++)i[s+o]=a[s],r[s+o]=!0,o+=Ve(e[s-1]);t[n]=i,t[n]._emit=r,t[n]._multi=!0}function Aa(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ht("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Vt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ht("beginScope must be object"),Vt;Ze(t,t.begin,{key:"beginScope"}),t.begin=de(t.begin,{joinWith:""})}}function Da(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ht("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Vt;if(typeof t.endScope!="object"||t.endScope===null)throw ht("endScope must be object"),Vt;Ze(t,t.end,{key:"endScope"}),t.end=de(t.end,{joinWith:""})}}function Ba(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Ma(t){Ba(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Aa(t),Da(t)}function Ia(t){function e(i,s){return new RegExp(Mt(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=Ve(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(l=>l[1]);this.matcherRe=e(de(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(s);if(!l)return null;const c=l.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const l=new n;return this.rules.slice(s).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const s=new o;return i.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function r(i,s){const l=i;if(i.isCompiled)return l;[ha,ya,Ma,Sa].forEach(u=>u(i,s)),t.compilerExtensions.forEach(u=>u(i,s)),i.__beforeBegin=null,[va,xa,wa].forEach(u=>u(i,s)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Xe(i.keywords,t.case_insensitive)),l.keywordPatternRe=e(c,!0),s&&(i.begin||(i.begin=/\B|\b/),l.beginRe=e(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=e(l.end)),l.terminatorEnd=Mt(l.end)||"",i.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(l.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Na(u==="self"?i:u)})),i.contains.forEach(function(u){r(u,l)}),i.starts&&r(i.starts,s),l.matcher=a(l),l}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=mt(t.classNameAliases||{}),r(t)}function Ye(t){return t?t.endsWithParent||Ye(t.starts):!1}function Na(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return mt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ye(t)?mt(t,{starts:t.starts?mt(t.starts):null}):Object.isFrozen(t)?mt(t):t}var $a="11.8.0";class Oa extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const oe=Ue,Ne=mt,$e=Symbol("nomatch"),La=7,Qe=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Jo};function l(f){return s.noHighlightRe.test(f)}function c(f){let y=f.className+" ";y+=f.parentNode?f.parentNode.className:"";const k=s.languageDetectRe.exec(y);if(k){const E=N(k[1]);return E||(Ie(r.replace("{}",k[1])),Ie("Falling back to no-highlight mode for this block.",f)),E?k[1]:"no-highlight"}return y.split(/\s+/).find(E=>l(E)||N(E))}function u(f,y,k){let E="",H="";typeof y=="object"?(E=f,k=y.ignoreIllegals,H=y.language):(yt("10.7.0","highlight(lang, code, ...args) has been deprecated."),yt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),H=f,E=y),k===void 0&&(k=!0);const z={code:E,language:H};P("before:highlight",z);const V=z.result?z.result:d(z.language,z.code,k);return V.code=z.code,P("after:highlight",V),V}function d(f,y,k,E){const H=Object.create(null);function z($,_){return $.keywords[_]}function V(){if(!W.keywords){st.addText(et);return}let $=0;W.keywordPatternRe.lastIndex=0;let _=W.keywordPatternRe.exec(et),q="";for(;_;){q+=et.substring($,_.index);const tt=at.case_insensitive?_[0].toLowerCase():_[0],it=z(W,tt);if(it){const[dt,to]=it;if(st.addText(q),q="",H[tt]=(H[tt]||0)+1,H[tt]<=La&&(jt+=to),dt.startsWith("_"))q+=_[0];else{const eo=at.classNameAliases[dt]||dt;X(_[0],eo)}}else q+=_[0];$=W.keywordPatternRe.lastIndex,_=W.keywordPatternRe.exec(et)}q+=et.substring($),st.addText(q)}function K(){if(et==="")return;let $=null;if(typeof W.subLanguage=="string"){if(!e[W.subLanguage]){st.addText(et);return}$=d(W.subLanguage,et,!0,Ce[W.subLanguage]),Ce[W.subLanguage]=$._top}else $=g(et,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(jt+=$.relevance),st.__addSublanguage($._emitter,$.language)}function I(){W.subLanguage!=null?K():V(),et=""}function X($,_){$!==""&&(st.startScope(_),st.addText($),st.endScope())}function nt($,_){let q=1;const tt=_.length-1;for(;q<=tt;){if(!$._emit[q]){q++;continue}const it=at.classNameAliases[$[q]]||$[q],dt=_[q];it?X(dt,it):(et=dt,V(),et=""),q++}}function Z($,_){return $.scope&&typeof $.scope=="string"&&st.openNode(at.classNameAliases[$.scope]||$.scope),$.beginScope&&($.beginScope._wrap?(X(et,at.classNameAliases[$.beginScope._wrap]||$.beginScope._wrap),et=""):$.beginScope._multi&&(nt($.beginScope,_),et="")),W=Object.create($,{parent:{value:W}}),W}function Y($,_,q){let tt=Zo($.endRe,q);if(tt){if($["on:end"]){const it=new Ae($);$["on:end"](_,it),it.isMatchIgnored&&(tt=!1)}if(tt){for(;$.endsParent&&$.parent;)$=$.parent;return $}}if($.endsWithParent)return Y($.parent,_,q)}function rt($){return W.matcher.regexIndex===0?(et+=$[0],1):(te=!0,0)}function ct($){const _=$[0],q=$.rule,tt=new Ae(q),it=[q.__beforeBegin,q["on:begin"]];for(const dt of it)if(dt&&(dt($,tt),tt.isMatchIgnored))return rt(_);return q.skip?et+=_:(q.excludeBegin&&(et+=_),I(),!q.returnBegin&&!q.excludeBegin&&(et=_)),Z(q,$),q.returnBegin?0:_.length}function lt($){const _=$[0],q=y.substring($.index),tt=Y(W,$,q);if(!tt)return $e;const it=W;W.endScope&&W.endScope._wrap?(I(),X(_,W.endScope._wrap)):W.endScope&&W.endScope._multi?(I(),nt(W.endScope,$)):it.skip?et+=_:(it.returnEnd||it.excludeEnd||(et+=_),I(),it.excludeEnd&&(et=_));do W.scope&&st.closeNode(),!W.skip&&!W.subLanguage&&(jt+=W.relevance),W=W.parent;while(W!==tt.parent);return tt.starts&&Z(tt.starts,$),it.returnEnd?0:_.length}function Tt(){const $=[];for(let _=W;_!==at;_=_.parent)_.scope&&$.unshift(_.scope);$.forEach(_=>st.openNode(_))}let ut={};function Q($,_){const q=_&&_[0];if(et+=$,q==null)return I(),0;if(ut.type==="begin"&&_.type==="end"&&ut.index===_.index&&q===""){if(et+=y.slice(_.index,_.index+1),!a){const tt=new Error(`0 width match regex (${f})`);throw tt.languageName=f,tt.badRule=ut.rule,tt}return 1}if(ut=_,_.type==="begin")return ct(_);if(_.type==="illegal"&&!k){const tt=new Error('Illegal lexeme "'+q+'" for mode "'+(W.scope||"<unnamed>")+'"');throw tt.mode=W,tt}else if(_.type==="end"){const tt=lt(_);if(tt!==$e)return tt}if(_.type==="illegal"&&q==="")return 1;if(Qt>1e5&&Qt>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=q,q.length}const at=N(f);if(!at)throw ht(r.replace("{}",f)),new Error('Unknown language: "'+f+'"');const Rt=Ia(at);let Yt="",W=E||Rt;const Ce={},st=new s.__emitter(s);Tt();let et="",jt=0,bt=0,Qt=0,te=!1;try{if(at.__emitTokens)at.__emitTokens(y,st);else{for(W.matcher.considerAll();;){Qt++,te?te=!1:W.matcher.considerAll(),W.matcher.lastIndex=bt;const $=W.matcher.exec(y);if(!$)break;const _=y.substring(bt,$.index),q=Q(_,$);bt=$.index+q}Q(y.substring(bt))}return st.finalize(),Yt=st.toHTML(),{language:f,value:Yt,relevance:jt,illegal:!1,_emitter:st,_top:W}}catch($){if($.message&&$.message.includes("Illegal"))return{language:f,value:oe(y),illegal:!0,relevance:0,_illegalBy:{message:$.message,index:bt,context:y.slice(bt-100,bt+100),mode:$.mode,resultSoFar:Yt},_emitter:st};if(a)return{language:f,value:oe(y),illegal:!1,relevance:0,errorRaised:$,_emitter:st,_top:W};throw $}}function p(f){const y={value:oe(f),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return y._emitter.addText(f),y}function g(f,y){y=y||s.languages||Object.keys(e);const k=p(f),E=y.filter(N).filter(L).map(I=>d(I,f,!1));E.unshift(k);const H=E.sort((I,X)=>{if(I.relevance!==X.relevance)return X.relevance-I.relevance;if(I.language&&X.language){if(N(I.language).supersetOf===X.language)return 1;if(N(X.language).supersetOf===I.language)return-1}return 0}),[z,V]=H,K=z;return K.secondBest=V,K}function m(f,y,k){const E=y&&n[y]||k;f.classList.add("hljs"),f.classList.add(`language-${E}`)}function h(f){let y=null;const k=c(f);if(l(k))return;if(P("before:highlightElement",{el:f,language:k}),f.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(f)),s.throwUnescapedHTML))throw new Oa("One of your code blocks includes unescaped HTML.",f.innerHTML);y=f;const E=y.textContent,H=k?u(E,{language:k,ignoreIllegals:!0}):g(E);f.innerHTML=H.value,m(f,k,H.language),f.result={language:H.language,re:H.relevance,relevance:H.relevance},H.secondBest&&(f.secondBest={language:H.secondBest.language,relevance:H.secondBest.relevance}),P("after:highlightElement",{el:f,result:H,text:E})}function b(f){s=Ne(s,f)}const v=()=>{C(),yt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){C(),yt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function C(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(s.cssSelector).forEach(h)}function T(){S&&C()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function A(f,y){let k=null;try{k=y(t)}catch(E){if(ht("Language definition for '{}' could not be registered.".replace("{}",f)),a)ht(E);else throw E;k=i}k.name||(k.name=f),e[f]=k,k.rawDefinition=y.bind(null,t),k.aliases&&O(k.aliases,{languageName:f})}function D(f){delete e[f];for(const y of Object.keys(n))n[y]===f&&delete n[y]}function M(){return Object.keys(e)}function N(f){return f=(f||"").toLowerCase(),e[f]||e[n[f]]}function O(f,{languageName:y}){typeof f=="string"&&(f=[f]),f.forEach(k=>{n[k.toLowerCase()]=y})}function L(f){const y=N(f);return y&&!y.disableAutodetect}function j(f){f["before:highlightBlock"]&&!f["before:highlightElement"]&&(f["before:highlightElement"]=y=>{f["before:highlightBlock"](Object.assign({block:y.el},y))}),f["after:highlightBlock"]&&!f["after:highlightElement"]&&(f["after:highlightElement"]=y=>{f["after:highlightBlock"](Object.assign({block:y.el},y))})}function G(f){j(f),o.push(f)}function F(f){const y=o.indexOf(f);y!==-1&&o.splice(y,1)}function P(f,y){const k=f;o.forEach(function(E){E[k]&&E[k](y)})}function w(f){return yt("10.7.0","highlightBlock will be removed entirely in v12.0"),yt("10.7.0","Please use highlightElement now."),h(f)}Object.assign(t,{highlight:u,highlightAuto:g,highlightAll:C,highlightElement:h,highlightBlock:w,configure:b,initHighlighting:v,initHighlightingOnLoad:x,registerLanguage:A,unregisterLanguage:D,listLanguages:M,getLanguage:N,registerAliases:O,autoDetection:L,inherit:Ne,addPlugin:G,removePlugin:F}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=$a,t.regex={concat:xt,lookahead:Fe,either:ue,optional:qo,anyNumberOfTimes:Ko};for(const f in Ut)typeof Ut[f]=="object"&&He(Ut[f]);return Object.assign(t,Ut),t},St=Qe({});St.newInstance=()=>Qe({});var Pa=St;St.HighlightJS=St;St.default=St;const Bt=Uo(Pa),Oe="[A-Za-z$_][0-9A-Za-z$_]*",za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],_a=["true","false","null","undefined","NaN","Infinity"],tn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],en=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ra=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ja=[].concat(nn,tn,en);function on(t){const e=t.regex,n=(y,{after:k})=>{const E="</"+y[0].slice(1);return y.input.indexOf(E,k)!==-1},o=Oe,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(y,k)=>{const E=y[0].length+y.index,H=y.input[E];if(H==="<"||H===","){k.ignoreMatch();return}H===">"&&(n(y,{after:E})||k.ignoreMatch());let z;const V=y.input.substring(E);if(z=V.match(/^\s*=/)){k.ignoreMatch();return}if((z=V.match(/^\s+extends\s+/))&&z.index===0){k.ignoreMatch();return}}},s={$pattern:Oe,keyword:za,literal:_a,built_in:ja,"variable.language":Ra},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},m={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},b={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,p]},x={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},S=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,m,h,b,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(S)});const C=[].concat(x,p.contains),T=C.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(C)}]),A={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...tn,...en]}},N={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[A],illegal:/%/},L={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(y){return e.concat("(?!",y.join("|"),")")}const G={match:e.concat(/\b/,j([...nn,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},P={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},A]},w="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",f={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(w)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[A]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),N,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,m,h,b,x,{match:/\$\d+/},d,M,{className:"attr",begin:o+e.lookahead(":"),relevance:0},f,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,t.REGEXP_MODE,{className:"function",begin:w,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[A,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[A]},G,L,D,P,{match:/\$[(.]/}]}}function Ga(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ha=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return Bt.registerLanguage("javascript",on),Bt.registerLanguage("sh",Ga),function({text:i,language:s="js"}){const l=a({class:`hljs language-${s}`});return l.innerHTML=Bt.highlight(i,{language:s}).value,o({class:n`
          display: inline-block;
        `},l)}};function Ua(t){const{bau:e,css:n}=t,{article:o,h1:a,p:r,code:i,a:s,ul:l,li:c}=e.tags,u=Ha(t);return function(){return o({class:n`
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
)`}),r("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),r("Further reading:",l(c(s({href:"components"},"Visit the component gallery")),c(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function me(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("paper",l,r,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}function an(t,e={}){const{bau:n,css:o,window:a}=t,{nav:r,ul:i,li:s,a:l}=n.tags,{headerSelector:c="h2,h3"}=e,u=n.state("no"),d=(b,v)=>{let x=null;return(...S)=>{a.clearTimeout(x),x=a.setTimeout(()=>b(...S),v)}},p=o`
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
  `,g=({value:b,id:v,children:x=[]})=>{const S=l({class:()=>u.val==v?"active":"",href:`#${v}`});return S.innerHTML=b,s({class:()=>u.val==v?"active":""},S,x.length>0&&i(x.map(g)))},m=b=>b.tagName.charAt(1),h=({contentEl:b})=>{const v=b.querySelectorAll(c);let x=2,S={},C={children:[]},T=C;const A=T;let D=[T];return[...v].forEach(M=>{const N=m(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(S={value:M.innerHTML,id:M.id??M.textContent,children:[]},x==N?(C=S,T.children.push(C)):x<N?(D.push(T),T=C,C.children.push(S),C=S):x>N&&(T=D[N-1],D=D.slice(0,N-1),T.children.push(S),C=S),x=N)}),A};return function(...v){let[{size:x=e.size??"md",variant:S=e.variant??"plain",color:C=e.color??"neutral",contentEl:T,...A}]=J(v);const D=h({contentEl:T}),M=d(()=>{const O=[...T.querySelectorAll(c)].find(L=>{const{top:j,height:G}=L.getBoundingClientRect();if(j+G>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return r({...A,class:B("tableOfContent",x,S,C,p,e==null?void 0:e.class,A==null?void 0:A.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},D.children&&i(D.children.map(g)))}}const rn=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:r,tr:i,td:s,thead:l,th:c}=e.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(l(i(c(p??""),ot.map(g=>c(g)))),r(To.map(g=>i(c(g),ot.map((m,h)=>s(d({color:m,variant:g},{index:h}))))))))}},Fa=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:r}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Ao.map((i,s)=>r(t,{size:i})({color:"success",variant:"outline"},{size:i,index:s})))}},U=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:r,h1:i,p:s,h2:l,h3:c,pre:u,code:d}=e.tags;Bt.registerLanguage("javascript",on);const p=an(t),g=me(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),m=rn(t),h=Fa(t),b=({text:v})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:x})=>{x.innerHTML=Bt.highlight(v,{language:"js"}).value}}));return function(x){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(x.title),s(x.description),x.gridItem&&!x.variantColorTableDisable&&[l("Variant/Color"),g(m({Item:x.gridItem(t)}))],x.gridItem&&!x.variantSizeDisable&&[l("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),g(h({item:x.gridItem}))],l("Usage"),c("Import"),b({text:x.importStatement}),l("Examples"),x.examples.map(C=>r(c(C.title),s(C.description),g(C.createComponent(t)({})),b({text:C.code}))));return o({class:n`
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
        `},S,p({contentEl:S}))}};function ge(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?s(c):l(c))};function s(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",Header:m,Content:h,expanded:b=!1,...v}]=J(u);const x=n.state(!b);return a({...v,class:B("collapsible",d,r,e==null?void 0:e.class,v==null?void 0:v.class)},a({class:()=>B("header",h?x.val?"close":"open":""),onclick:S=>{x.val=!x.val,S.stopPropagation()}},m()),a({class:"content",role:"region",bauMounted:({element:S})=>{x.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(i({element:S,closeState:x}),!x.val)},h&&h()))}}const Va=()=>ot.map(t=>`
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
  `;return function(...d){let[{size:p=e.size??"md",variant:g=e.variant??"plain",color:m=e.color??"neutral",data:h=[],...b}]=J(d);const v=n.state(""),x=ge(t,{size:p,variant:g,color:m}),S=T=>A=>{v.val==T?v.val="":v.val=T},C=T=>{const{Header:A,Content:D,name:M}=T,N=()=>s({class:()=>B(v.val==M&&"active")},l({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:L})=>v.val==M},A(T))),O=()=>a({id:`bau-${M}`,"data-state":({element:L})=>v.val==M},D(T));return i({class:B(m,g,p),onclick:S(M)},x({Header:N,Content:O}))};return a({class:B("accordion",c,e==null?void 0:e.class,b.class)},r(h.map(C)))}}const sn=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Kt(t,e);return s=>i({...s,data:r})},Wa=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Kt(t,{color:"neutral",variant:"outline"});return()=>a(i({data:r}))},Ja=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,cn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ka=t=>{const{css:e}=t,n=cn(t),o=Kt(t,{color:"warning",class:e`
      &.accordion {
        & ul {
          & li {
            width: fit-content;
          }
        }
      }
    `});return()=>o({data:n})},qa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Ja,createComponent:Wa},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:qa,createComponent:Ka},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:Xa}],gridItem:sn},Qa=t=>{const e=U(t);return()=>e(Ya)},tr={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},er=()=>ot.map(t=>`
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
`);function kt(t,e={}){const{bau:n,css:o}=t,{div:a,i:r}=n.tags,i=o`
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
  `,s=R(t),l=({onclick:c})=>s({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"outline",color:g=e.color??"neutral",onRemove:m,...h},...b]=J(u);return a({...h,class:B("alert",`alert-${p}`,e.class,p,g,d,i,h.class),role:"alert"},r({class:"icon"},tr[g]),a({class:"content"},...b),m&&l({onclick:m}))}}const ln=(t,e)=>{const n=kt(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},nr=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=kt(t,{color:"danger"});return()=>a(n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},or=`import alert from "@grucloud/bau-ui/alert";
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
`,ar=t=>{const{css:e}=t,n=kt(t,{color:"warning",class:e`
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
`,sr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:or,createComponent:nr},{title:"Custom Alert ",description:"A custom alert.",code:rr,createComponent:ar}],gridItem:ln},ir=t=>{const e=U(t);return()=>e(sr)},cr=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:r=10,deleteAfterDuration:i=15e3}=e,{div:s}=n.tags,l=n.state([]),c={inserting:a`
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
    `},d=({id:p,status:g})=>{const m=l.val.findIndex(h=>h.id===p);m!=-1&&(l.val[m].status=g)};return function(g={},...m){const h=({id:x})=>{d({id:x,status:"removing"});const S=l.val.findIndex(C=>C.id===x);S!=-1&&l.val.splice(S,1)},b=({Component:x})=>{const S={id:Math.random().toString(10).split(".")[1],Component:x,status:"inserting"};l.val.length>=r&&h({id:l.val[0].id}),l.val.push(S),setTimeout(()=>h(S),i)},v=x=>s({class:u.item,onclick:()=>h(x)},x.Component());return document.addEventListener("alert.add",x=>b(x.detail)),document.addEventListener("alert.remove",x=>h(x.detail)),s({class:B(u.stack,e==null?void 0:e.class,g.class)},n.loop(l,s(),v))}},lr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=cr(t,{deleteAfterDuration:2e4}),r=R(t),i=kt(t);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},ur=`import { Context } from "@grucloud/bau-ui/context";
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
`,dr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ur,createComponent:lr}]},pr=t=>{const e=U(t);return()=>e(dr)},mr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,r=Wt(t),i=R(t),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=e.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),r({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},gr=`import animate from "@grucloud/bau-ui/animate";
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
`,br=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:r,label:i}=e.tags,s=Wt(t),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=e.state("one"),u=({target:p})=>c.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",r({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",r({type:"radio",id:"two",name:"radio",value:c,oninput:u})),s({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},fr=`import animate from "@grucloud/bau-ui/animate";
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
`,hr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:gr,createComponent:mr},{title:"Component hide and show",description:"Hide and show a component",code:fr,createComponent:br}]},vr=t=>{const e=U(t);return()=>e(hr)};function Ct(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:p=e.color??"neutral",...g},...m]=J(c);return r({...g,class:B("skeleton",u,s,e==null?void 0:e.class,g==null?void 0:g.class)},...m)}}function be(t,e={}){const{bau:n,css:o}=t,{div:a,img:r}=n.tags,i=n.state(!0),s=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,s.val=!0},u=o`
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
  `;return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",width:b=40,height:v=40,alt:x,...S},...C]=J(p);const T=Ct(t,{class:B(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${v}px;
          width: ${b}px;
        `,e==null?void 0:e.class,S.class)});return a({class:B(u,e==null?void 0:e.class,S.class)},()=>i.val&&T(),()=>s.val&&x,r({alt:x,width:b,height:v,onload:l,onerror:c,class:()=>B(!i.val&&"visible",s.val&&"hide",h,m,g,u,e==null?void 0:e.class,S.class),...S}))}}const un=(t,e)=>{const{css:n}=t,o=be(t,{...e,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},xr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=be(t,{class:n`
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
`,wr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=be(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",alt:"My Avatar"}))},Sr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:yr,createComponent:xr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:Sr,createComponent:wr}],gridItem:un},kr=t=>{const e=U(t);return()=>e(Cr)};function $t(t,e){const{bau:n,css:o,window:a}=t,{dialog:r}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...l){let[{contentEl:c,triggerEl:u,onClose:d,...p},...g]=J(l);const m=v=>{b.style.opacity=1,b.showModal();const x=u.getBoundingClientRect(),S=b.getBoundingClientRect();x.x<a.innerWidth/2?b.style.left=x.left+"px":b.style.left=x.right-S.width+"px",x.y<a.innerHeight/2?(b.style.top=x.top+x.height+"px",b.style.height=Math.min(b.scrollHeight,a.innerHeight-x.top-x.height)+"px"):(b.style.top=Math.max(0,x.top-S.height)+"px",b.scrollHeight>x.top&&(b.style.height=x.top+"px"))},h=v=>{const x=()=>{b.close(),b.removeEventListener("transitionend",x)};b.addEventListener("transitionend",x),b.style.opacity=0},b=r({role:"presentation",class:B("popover",i,e==null?void 0:e.class,p==null?void 0:p.class),onclick:v=>{v.target===b&&(h(),d==null||d.call())}},c);return b.closeDialog=h,b.openDialog=m,b}}const Ft={sm:12,md:16,lg:24},Er=()=>ot.map(t=>`
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
`);function gt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:r,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:p=e.variant??"outline",visibility:g=!0,...m}={}){const h=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${Ft[u]};
      height: ${Ft[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${Er()}
    `;return r({class:{deps:[g],renderProp:()=>b=>B("spinner",h,d,p,b==!1?"":"visibility",e==null?void 0:e.class,m.class)},version:"1.1",x:"0px",y:"0px",width:Ft[u],height:Ft[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...m},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Tr=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function qt(t,e={}){const{bau:n,css:o}=t,{div:a,li:r}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:p,placeholder:g,Option:m,options:h,defaultOption:b,getOptionLabel:v,getOptionValue:x,onSelect:S=()=>{},id:C,required:T,name:A,loading:D,...M},...N]=J(l);const O=$t(t),L=R(t),j=pt(t,{variant:u,color:d,size:c}),G=vt(t),F=gt(t,{variant:u,color:d,size:c}),P=n.state(b),w=n.state(M.value),f=n.state(!1),y=n.state(0),k=()=>{f.val=!1},E=n.state(h),H=Q=>at=>Q.val&&v(at)==v(Q.val),z=()=>{ut.openDialog(),f.val=!0,w.val="",E.val=h,y.val=h.findIndex(H(P));const Q=Tt.querySelector("li.selected");Q&&(Q.scrollIntoView({block:"center"}),ct.scrollIntoView({block:"end"}))},V=()=>{ut.closeDialog(),f.val=!1,y.val=0},K=Q=>{const{value:at}=Q.target;w.val=at,at?E.val=h.filter(Rt=>v(Rt).match(new RegExp(`${at}`,"i"))):E.val=h},I=Q=>{ut.open?V():z()},X=Q=>{P.val=Q,lt.value=x(Q)},nt=({option:Q,index:at})=>Rt=>{X(Q),y.val=at,V()},Z=()=>{const Q=Tt.querySelector("li.active");Q&&Q.scrollIntoView({block:"center",behavior:"smooth"})},Y=Q=>{switch(Q.key){case"Escape":V();break;case"ArrowDown":y.val<E.val.length-1?y.val++:y.val=0,Z();break;case"ArrowUp":y.val<=0?y.val=E.val.length-1:y.val--,Z();break;case"Enter":ut.open?(X(E.val[y.val]),V()):z(),Q.preventDefault();break}},rt=L({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":f,"aria-label":p,onclick:I,variant:u,color:d,size:c,class:D==!0&&"loading",disabled:D},()=>P.val?v(P.val):p,()=>D==!0&&F({visibility:D})),ct=j({value:w,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":f,oninput:K,onkeydown:Y,...M}),lt=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:b&&x(b),required:T,name:A}),Tt=a({class:B(u,d,c,"content")},ct,()=>G({class:B(u,d,c)},E.val.map((Q,at)=>r({class:()=>B(y.val==at&&"active",H(P)(Q)&&"selected"),onclick:nt({option:Q,index:at})},m(Q))))),ut=O({id:C,triggerEl:rt,contentEl:Tt,onClose:k,class:o`
        overflow: hidden;
      `});return a({...M,class:B("autocomplete",i,e==null?void 0:e.class,M==null?void 0:M.class)},n.bind({deps:[P],render:()=>Q=>{Q&&(lt.value=x(Q),S(Q))}}),rt,lt,ut)}}const dn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:r}=n.tags,i=qt(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Ar=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:r}=e.tags,i=qt(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return()=>o(i({options:s,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Country",placeholder:"Search countries",id:"country"}))},Dr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Br=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:r}=e.tags,i=qt(t),s="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(u.label),r(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==s),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},Mr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ir=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:r}=e.tags,i=R(t,{variant:"outline"}),s=qt(t),l=e.state([]),c=e.state(!1),u=e.state("");async function d({url:m,transform:h=b=>b}){try{c.val=!0;const b=await fetch(m,{});if(b.ok){const v=await b.json();l.val=h(v)}else u.val=b.statusText}catch(b){u.val=b.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,b)=>h.name.common.localeCompare(b.name.common))});p();const g=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(m.flag),r(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>s({options:l.val,Option:g,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",placeholder:"Search countries",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},Nr=`import { Context } from "@grucloud/bau-ui/context";
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
`,$r={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Dr,createComponent:Ar},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Nr,createComponent:Ir},{title:"Default Option",description:"A autocomplete with a default option.",code:Mr,createComponent:Br}],gridItem:dn},Or=t=>{const e=U(t);return()=>e($r)};function pn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...p},...g]=J(s);return a({...p,class:B("badge",r,e==null?void 0:e.class,p==null?void 0:p.class)},a({class:B(u,c,l)},d),...g)}}const mn=(t,e)=>{const n=pn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Lr=t=>{const{bau:e}=t,{section:n}=e.tags,o=pn(t);return()=>n(o({content:"10"},"☏"))},Pr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,zr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Pr,createComponent:Lr}],gridItem:mn},_r=t=>{const e=U(t);return()=>e(zr)};function fe(t,e={}){const{bau:n,css:o,config:a}=t,{ul:r,li:i,span:s}=n.tags,{separator:l="〉"}=e,c=R(t),u=o`
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
  `;return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",items:b,...v},...x]=J(p);return r({...v,class:B(u,e==null?void 0:e.class,v==null?void 0:v.class)},b.map(({href:S,name:C})=>i((S!=null?c:s)({href:`${a.base}${S}`,color:h,variant:m,size:g,class:B(h,m,g)},C))))}}const gn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=fe(t,e);return a=>o({...a,...n})},Rr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=fe(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},jr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ur={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:jr,createComponent:Rr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Hr,createComponent:Gr}],gridItem:gn},Fr=t=>{const e=U(t);return()=>e(Ur)},bn=(t,e={})=>{const n=R(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Vr=t=>{const{bau:e}=t,{section:n}=e.tags,o=R(t,{color:"primary",variant:"outline"}),a=()=>{alert("Click")};return()=>n(o({onclick:a},"Click me"))},Wr=`import button from "@grucloud/bau-ui/button";
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
`,Jr=t=>{const{bau:e}=t,{section:n}=e.tags,o=R(t,{color:"primary",variant:"outline"}),a=()=>{alert("Click")};return()=>n(o({disabled:!0,onclick:a},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
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
`,qr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Wr,createComponent:Vr},{title:"Disabled Button",description:"A disabled button.",code:Kr,createComponent:Jr}],gridItem:bn},Xr=t=>{const e=U(t);return()=>e(qr)},Zr=()=>ot.map(t=>`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("button-group",c,u,l,r,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const fn=(t,e)=>{const n=["ONE","TWO","THREE"],o=R(t,e),a=he(t,e);return r=>a({...r},n.map(i=>o(r,i)))},Yr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a="primary",r="solid",i=R(t,{color:a,variant:r}),s=he(t,{color:a,variant:r}),l=c=>u=>{alert(c)};return()=>n(s(o.map(c=>i({onclick:l(c)},c))))},Qr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,ts={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Qr,createComponent:Yr}],gridItem:fn},es=t=>{const e=U(t);return()=>e(ts)};function hn(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p},...g]=J(l);return a({...p,type:"date",class:B("calendar",i,d,u,c,e==null?void 0:e.class,p==null?void 0:p.class)},...g)}}const vn=(t,e)=>{const n=hn(t,e);return o=>n({...o})},ns=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),r=hn(t);return()=>n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},os=`import calendar from "@grucloud/bau-ui/calendar";
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
`,as={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:os,createComponent:ns}],gridItem:vn},rs=t=>{const e=U(t);return()=>e(as)};function ss(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:p,Slide:g,Previous:m,Next:h,...b}]=J(l);const v=()=>{i.val<=0?i.val=p.length-1:i.val--},x=()=>{i.val>=p.length-1?i.val=0:i.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},p.map(g));return a({...b,class:B("carousel",c,r,e==null?void 0:e.class,b==null?void 0:b.class)},a({class:B("control","control-previous"),onclick:v},m()),a({class:B("control","control-next"),onclick:x},h()),S)}}const is=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],cs=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,r=R(t,{class:n`
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
`,us={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ls,createComponent:cs}]},ds=t=>{const e=U(t);return()=>e(us)},xn=(t,e)=>{const n=Nt(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ps=t=>{const{bau:e}=t,{section:n}=e.tags,o=Nt(t,{variant:"outline",color:"primary"});return()=>n(o("My Chip"))},ms=`import chip from "@grucloud/bau-ui/chip";
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
`,gs={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ms,createComponent:ps}],gridItem:xn},bs=t=>{const e=U(t);return()=>e(gs)};function Et(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({type:"checkbox",...d,class:B(r,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)})}}const yn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,r=Et(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,r({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},fs=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,label:i}=e.tags,s=Et(t,{color:"neutral",variant:"outline"}),l=R(t,{variant:"outline",color:"primary"}),c=e.state(!1),u=p=>{c.val=!!p.target.checked},d=p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(g))};return()=>o({onsubmit:d},a(i({class:n`
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,vs=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:r,form:i}=e.tags,s=Et(t,{color:"neutral",variant:"outline"}),l=R(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.target.closest("form")));alert(JSON.stringify(d))};return()=>i({onsubmit:c,class:n`
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
`,ys=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:r,form:i}=e.tags,s=Et(t,{color:"neutral",variant:"outline"}),l=R(t,{variant:"outline",color:"primary"}),c=R(t,{variant:"solid",color:"primary"}),u=p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(g))},d=p=>{const g=window.document.getElementById("my-checkbox");g&&(g.indeterminate=!g.indeterminate)};return()=>i({onsubmit:u,class:n`
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
        `},r(o("My Checkbox",s({id:"my-checkbox",name:"my-checkbox"})),l({onclick:d},"Toggle Indeterminate")),a(c({type:"submit"},"Submit")))},ws=`import checkbox from "@grucloud/bau-ui/checkbox";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Ss={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:hs,createComponent:fs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:xs,createComponent:vs},{title:"Indeterminate checkbox",description:"An indeterminate checkbox.",code:ws,createComponent:ys}],gridItem:yn},Cs=t=>{const e=U(t);return()=>e(Ss)},ks=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=ge(t),r=R(t,{variant:"outline"}),i=()=>r("Header"),s=()=>o("Content");return()=>n(a({Header:i,Content:s}))},Es=`import button from "@grucloud/bau-ui/button";
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
`,Ts={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Es,createComponent:ks}]},As=t=>{const e=U(t);return()=>e(Ts)};function Ds(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("divider",l,r,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const Bs=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ds(t);return()=>n(o("OR"))},Ms=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Is={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ms,createComponent:Bs}],variantColorTableDisable:!0,variantSizeDisable:!0},Ns=t=>{const e=U(t);return()=>e(Is)};function $s(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{color:l,variant:c="outline",size:u,openState:d,...p},...g]=J(s);return a({class:B(r,e==null?void 0:e.class,p.class)},a({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>B("content",d.val&&"content-open")},g))}}const Os=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),r=$s(t),i=R(t,{color:"neutral",variant:"outline"}),s=Ge(t);return()=>n(o("Click on the button to open and close the drawer."),i({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},s()))},Ls=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ps={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ls,createComponent:Os}]},zs=t=>{const e=U(t);return()=>e(Ps)},_s=()=>ot.map(t=>`
`).join(`
`);function wn(t,e={}){const{bau:n,css:o}=t,{div:a,li:r}=n.tags,i=R(t),s=$t(t),l=vt(t),c=o`
    ${_s()}
  `;return function(...d){let[{size:p=e.size??"md",variant:g=e.variant??"outline",color:m=e.color??"neutral",label:h,ListItem:b,items:v,...x},...S]=J(d);const C=n.state(0),T=()=>{G.openDialog(),G.focus()},A=()=>{G.closeDialog()},D=()=>{G.open?A():T()},M=F=>{D(),F.preventDefault()},N=({item:F,index:P})=>w=>{C.val=P,A(),w.preventDefault()},O=F=>{switch(F.preventDefault(),F.key){case"Escape":A();break;case"ArrowDown":C.val<options.length-1?C.val++:C.val=0;break;case"ArrowUp":C.val<=0?C.val=options.length-1:C.val--;break;case"Enter":D();break}},L=()=>l({tabindex:"0",class:B(m,g)},v.map((F,P)=>r({class:()=>B(C.val==P&&"active"),onclick:N({item:F,index:P})},b(F)))),j=i({type:"button",onclick:M,color:m,variant:g,size:p},h),G=s({triggerEl:j,contentEl:L()});return a({...x,class:B("dropdownMenu",m,p,c,e==null?void 0:e.class,x==null?void 0:x.class),onkeydown:O},j,G)}}const Rs=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,r=wn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o(a(l.label));return l=>r({...l,items:i,ListItem:s,label:"Action"})},js=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,r=wn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(r({items:i,ListItem:s,label:"Action"}))},Gs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Hs={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Gs,createComponent:js}],gridItem:Rs},Us=t=>{const e=U(t);return()=>e(Hs)},Sn=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=ie(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Fs=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=ie(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Vs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Ws={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Vs,createComponent:Fs}],gridItem:(t,e)=>Sn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},Js=t=>{const e=U(t);return()=>e(Ws)};function Cn(t,e={}){const{bau:n,css:o}=t,{div:a,label:r,input:i}=n.tags,s={base:o`
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
    `};return function(c,...u){const{size:d=e.size??"md",variant:p=e.variant??"outline",color:g=e.color??"neutral",Component:m,disabled:h,...b}=c;return a({class:B(s.base,h&&s.disabled,e==null?void 0:e.class,c.class)},r({class:B(p,g,d)},m({disabled:h}),i({type:"file",disabled:h,...b})))}}const kn=(t,e)=>{const{tr:n,bau:o,css:a,config:r}=t,{svg:i,use:s}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=Cn(t,e),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:m})=>l({class:B(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${r.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return m=>d({Component:g,name:"file",accept:"text/*",onchange:p,...m})},Ks=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:r,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,span:c}=n.tags,u=n.state("No file selected"),d=Cn(t),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:m})=>l({class:B(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return()=>s(d({Component:g,name:"file",accept:"text/*",onchange:p}),l("File selected: ",u))},qs=`import classNames from "@grucloud/bau-css/classNames";
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
`,Xs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:qs,createComponent:Ks}],gridItem:kn},Zs=t=>{const e=U(t);return()=>e(Xs)};function Ot(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,r=o`
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
    & section {
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...p},...g]=J(s);return a({...p,class:B("form",u,c,l,r,e==null?void 0:e.class,p==null?void 0:p.class)},...g)}}function ve(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:p=e.color??"neutral",loading:g,...m},...h]=J(c);const b=R(t),v=gt(t);return n.bind({deps:[g],render:()=>x=>b({...m,class:B("loadingButton",u,d,p,s,x&&"loading",e==null?void 0:e.class,m==null?void 0:m.class)},v({size:u,variant:d,color:p,visibility:x}),r({class:x&&"loading"},h))})}}const Ys=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:r,header:i,label:s,img:l,footer:c}=e.tags,u=ve(t,{variant:"solid",color:"primary"}),d=kt(t,{variant:"outline",color:"danger"}),p=pt(t),g=Ot(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:h=()=>{}}){const b=e.state(!1),v=e.state("");return g({onsubmit:async S=>{S.preventDefault();const{username:C,password:T}=Object.fromEntries(new FormData(S.target.closest("form")));try{b.val=!0;const A=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:C,password:T})});if(A.ok){const D=await A.json();h(D)}else A.status==401?v.val="Invalid username or password":v.val=A.statusText}catch(A){v.val=A.message}finally{b.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),r("Login to Grucloud")),a(()=>v.val&&d(v.val),s("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),s("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",loading:b},"Login")))}},Qs=`import form from "@grucloud/bau-ui/form";
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
`,ti=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:r,footer:i}=e.tags,s=Ot(t),l=R(t,{variant:"solid",color:"primary"}),c=pt(t);return function({onSubmitted:d=()=>{}}){return s({onsubmit:async g=>{g.preventDefault();const m=Object.fromEntries(new FormData(g.target.closest("form")));alert(JSON.stringify(m)),d(m)}},a(o("Form with input")),n(r("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},ei=`import form from "@grucloud/bau-ui/form";
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
`,ni=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:r,footer:i,em:s,span:l}=e.tags,c=e.state(""),u=e.derive(()=>c.val!=="Delete"),d=Ot(t),p=R(t,{variant:"solid",color:"danger"}),g=pt(t);return function({onSubmitted:h=()=>{}}){return d({onsubmit:async v=>{v.preventDefault(),h()}},a(o("Delete Protection")),n(r(l("Type ",s("Delete")," to confirm the destruction of the resource."),g({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:v=>c.val=v.target.value}))),i(p({type:"submit",disabled:u},"Delete")))}},oi=`import { Context } from "@grucloud/bau-ui/context";
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
`,ai={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:ei,createComponent:ti},{title:"Form with state",description:"A form with input state and a dervied state.",code:oi,createComponent:ni},{title:"Login page",description:"A login page.",code:Qs,createComponent:Ys}]},ri=t=>{const e=U(t);return()=>e(ai)},En=(t,e={})=>{const n=pt(t,e);return o=>n({name:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,placeholder:"Enter text",...o})},si=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=pt(t);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ii=`import input from "@grucloud/bau-ui/input";
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
`,ci={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ii,createComponent:si}],gridItem:En},li=t=>{const e=U(t);return()=>e(ci)},Tn=(t,e={})=>{const n=ce(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},ui=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=ce(t);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},di=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,pi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:di,createComponent:ui}],gridItem:Tn},mi=t=>{const e=U(t);return()=>e(pi)};function An(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("keyValueList",r,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const gi=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:r}=e.tags,i=An(t);return()=>n(i(o(a("My label"),r("My Value")),o(a("My other label"),r("My Other Value"))))},bi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,fi=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:r,span:i}=e.tags,s=An(t,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(s(a(r("My label"),i("My Value")),a(r("My other label"),i("My Other Value"))))},hi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,vi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:bi,createComponent:gi},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:hi,createComponent:fi}]},xi=t=>{const e=U(t);return()=>e(vi)},yi="modulepreload",wi=function(t){return"/bau/bau-ui/"+t},Le={},Dn=function(e,n,o){if(!n||n.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=wi(r),r in Le)return;Le[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===r&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":yi,i||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function Bn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=gt(t,{size:"lg"}),i=kt(t,{color:"danger"}),s=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},r({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=s,error:p=l,props:g={}}){const m=n.state(void 0),h=n.state(!0),b=n.state(!1);return u().then(v=>{n.batch(()=>{m.val=v.default(t),h.val=!1})}).catch(v=>{b.val=v.message}),a(()=>{if(b.val)return p({message:b.val});if(h.val)return d();if(m.val)return m.val(g)})}}const Si=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state(!1),a=Bn(t),r=R(t);return()=>n(r({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},Ci=`import { Context } from "@grucloud/bau-ui/context";
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
`,ki=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),r=Bn(t,{loading:()=>o("My Custom Loading"),error:s=>o("My Custom Error")}),i=R(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&r({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Ei=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ti={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:Ci,createComponent:Si},{title:"Custom Loader",description:"Custom loader and error",code:Ei,createComponent:ki}]},Ai=t=>{const e=U(t);return()=>e(Ti)};function Mn(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:r}=n.tags,i=()=>ot.map(c=>`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",running:m,...h}]=J(u);return r({...h,role:"progressbar",class:{deps:[m],renderProp:()=>b=>B("linearProgress",d,g,l,b&&"running",e==null?void 0:e.class,h==null?void 0:h.class)}})}}const In=(t,e)=>{const n=Mn(t,e);return o=>n({...o,running:!0})},Di=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=R(t,{variant:"solid",color:"primary"}),r=Mn(t),i=e.state(!1);return()=>n(a({onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,r({running:i}))},Bi=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
        running: runningState,
      })
    );
};
`,Mi={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Bi,createComponent:Di}],gridItem:In},Ii=t=>{const e=U(t);return()=>e(Mi)},Nn=(t,e)=>{const n=ve(t,e);return o=>n({...o,loading:!0},"Save")},Ni=t=>{const{bau:e}=t,{section:n}=e.tags,o=ve(t,{variant:"solid",color:"primary"}),a=e.state(!0);return()=>n(o({loading:a,onclick:()=>a.val=!a.val},"Save"))},$i=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Oi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:$i,createComponent:Ni}],gridItem:Nn},Li=t=>{const e=U(t);return()=>e(Oi)},Pi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],zi=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:r}=n.tags,i=vt(t,e),s=({code:l,label:c})=>r({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},Pi.map(s))},_i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ri=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:r}=e.tags,i=vt(t,{variant:"outline",color:"primary"}),s=({code:l,label:c})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i(_i.map(s)))},ji=`import list from "@grucloud/bau-ui/list";
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
`,Gi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ji,createComponent:Ri}],gridItem:zi},Hi=t=>{const e=U(t);return()=>e(Gi)};function $n(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:r,div:i}=n.tags,l=o`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",...m},...h]=J(u);const b=r({...m,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(m.id??"modal")&&b.showModal()},class:B("modal",l,g,p,d,e==null?void 0:e.class,m==null?void 0:m.class)},h);return new MutationObserver(x=>{const S=new URLSearchParams(a.location.search);x[0].attributeName=="open"&&(b.open?S.set("modal",b.id??"modal"):S.delete("modal"),a.history.pushState("","",`?${S.toString()}`))}).observe(b,{attributes:!0}),b}}const On=(t,e={})=>{const{bau:n,window:o}=t,{document:a}=o,{form:r,section:i,main:s,header:l,footer:c,p:u,h1:d}=n.tags,p=R(t),g=$n(t,e),m=()=>s(Array(20).fill("").map((v,x)=>u(x+1,". Some text here"))),h=v=>`dialog-${v.color}-${v.variant}-${e.size}`,b=v=>g({id:h(v),...v},r(l(d("Header")),m(),c(p({variant:"outline",color:v.color,onclick:x=>{x.target.closest("dialog").close()}},"Cancel"),p({variant:"solid",color:v.color,onclick:x=>{x.target.closest("dialog").close()}},"OK"))));return v=>i(p({...v,onclick:()=>{a.getElementById(h(v)).showModal()}},"OPEN MODAL"),b(v))},Ui=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,section:r,main:i,header:s,footer:l,p:c}=e.tags,d=R(t,{color:"neutral"}),p=$n(t),g=()=>i(Array(10).fill("").map((m,h)=>c(h+1,". Some text here")));return()=>r(d({variant:"solid",color:"neutral",onclick:()=>{o.getElementById("my-dialog").showModal()}},"OPEN MODAL"),p({id:"my-dialog"},a(s("Header"),g(),l(d({variant:"outline",onclick:m=>{m.target.closest("dialog").close()}},"Cancel"),d({variant:"solid",onclick:m=>{m.target.closest("dialog").close()}},"OK")))))},Fi=`import modal from "@grucloud/bau-ui/modal";
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
          color: "neutral",
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
`,Vi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Fi,createComponent:Ui}],gridItem:On},Wi=t=>{const e=U(t);return()=>e(Vi)},Ji=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Ki(t,e={}){const{bau:n,css:o}=t,{div:a,li:r,select:i}=n.tags,s=R(t),l=$t(t),c=vt(t),u=Et(t,{color:"neutral",variant:"outline"}),d=o`
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
    ${Ji()}
  `;return function(...g){let[{size:m=e.size??"md",variant:h=e.variant??"outline",color:b=e.color??"neutral",name:v,label:x,Option:S,options:C,defaultValue:T=[],getOptionLabel:A,getOptionValue:D,renderValue:M,onSelect:N=()=>{},loading:O,...L},...j]=J(g);const G=gt(t,{variant:h,color:b,size:m}),F=n.state(T),P=n.state(!1),w=n.state(0),f=()=>{X.openDialog(),X.focus(),P.val=!0},y=()=>{X.closeDialog(),P.val=!1},k=()=>{P.val=!1},E=Z=>{X.open?y():f(),Z.preventDefault()},H=()=>Array.from(nt.selectedOptions).map(({value:Z})=>C.find(Y=>D(Y)==Z)),z=Z=>{switch(Z.preventDefault(),Z.key){case"Escape":y();break;case"ArrowDown":w.val<C.length-1?w.val++:w.val=0;break;case"ArrowUp":w.val<=0?w.val=C.length-1:w.val--;break;case"Enter":if(X.open){const Y=Z.currentTarget.querySelectorAll("input")[w.val];Y.checked=!Y.checked;const rt=nt.options[w.val+1];rt.selected=!rt.selected,F.val=H()}else f();break}},V=Z=>Y=>{const rt=[...nt.options].find(({value:ct})=>ct==D(Z));Y.target.checked?rt.selected=!0:rt.selected=!1,F.val=H()},K=()=>c({tabindex:"0",class:B(b,h)},C.map((Z,Y)=>r({class:()=>B(w.val==Y&&"active")},n.tags.label(u({checked:T.find(rt=>D(rt)==D(Z)),name:`${v}-${D(Z)}`,onchange:V(Z)}),S(Z))))),I=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":P,"aria-label":x,onclick:E,color:b,variant:h,size:m,class:O==!0&&"loading",disabled:O},()=>F.val.length?M(F.val):x,()=>O==!0&&G({visibility:O})),X=l({triggerEl:I,contentEl:K(),onClose:k}),nt=i({name:v,multiple:!0,...L},n.tags.option({value:""},"--Category--"),C.map(Z=>n.tags.option({value:D(Z),selected:T.find(Y=>D(Y)==D(Z))},A(Z))));return a({...L,class:B("multiSelect",b,m,d,e==null?void 0:e.class,L==null?void 0:L.class),onkeydown:z},nt,I,X)}}const qi=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:r,footer:i}=e.tags,s=Ki(t),l=R(t,{variant:"outline",color:"neutral"}),c=Nt(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=g=>a(g.group),p=g=>{g.preventDefault();const{selectedOptions:m}=g.target.elements.myMultiSelect;var h=Array.from(m).map(({value:b})=>b);alert(JSON.stringify(h))};return()=>r({onsubmit:p,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},s({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:g})=>g,getOptionLabel:({group:g})=>g,renderValue:g=>o({class:n`
                display: flex;
                align-items: center;
                gap: 0.2rem;
              `},g.map(m=>c(m.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},Xi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Zi=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:r}=e.tags,i=R(t,{variant:"outline",color:"neutral"}),s=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:p})=>p);alert(JSON.stringify(d))};return()=>r({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},s.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},Yi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Qi={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Xi,createComponent:qi},{title:"Native Multi Select",description:"A native multi select.",code:Yi,createComponent:Zi}]},tc=t=>{const e=U(t);return()=>e(Qi)},ec=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:r}=e.tags,i=R(t,{variant:"outline",color:"success"}),s=$t(t),l=()=>i({onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),r("My Content")),u=l(),d=s({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},nc=`import popover from "@grucloud/bau-ui/popover";
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
`,oc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:nc,createComponent:ec}]},ac=t=>{const e=U(t);return()=>e(oc)};function rc(t,e={}){const{bau:n,css:o,config:a}=t,{div:r,a:i,span:s,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:p,label:g,href:m})=>i({href:`${a.base}${m}`},s({class:"sublabel"},d),r({class:`label ${d}`},g??p));return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",data:b={},...v}]=J(p);const{next:x,previous:S}=b;return l({"data-paginationnav":JSON.stringify(b),"aria-label":"pages navigation",...v,class:B("paginationNavigation",g,c,e==null?void 0:e.class,v==null?void 0:v.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(x==null?void 0:x.href)&&u({text:"Next"})(x))}}const sc=t=>{const{bau:e}=t,{section:n}=e.tags,o=rc(t,{variant:"solid",color:"primary"}),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({data:a}))},ic=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,cc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ic,createComponent:sc}]},lc=t=>{const e=U(t);return()=>e(cc)},uc=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=me(t,e);return r=>a({...r},o(`Paper ${e.size??""}`))},dc=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=me(t,{size:"md"});return()=>n(a(o("My content")))},pc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context, { size: "md" });

  return () => section(Paper(div("My content")));
};
`,mc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:pc,createComponent:dc}],variantColorTableDisable:!0,gridItem:uc},gc=t=>{const e=U(t);return()=>e(mc)};function xe(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p}]=J(l);return a({...p,type:"radio",class:B("radio-button",c,d,u,i,e==null?void 0:e.class,p==null?void 0:p.class)})}}const Ln=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:r}=n.tags,i=xe(t,e);return s=>r({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},bc=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:r}=e.tags,i=xe(t),s=e.state("one"),l=({target:c})=>s.val=c.id;return()=>r({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        `},o("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:l})),o("Two",i({id:"two",name:"radio",value:s,oninput:l})),a("Choice: ",s))},fc=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,hc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:fc,createComponent:bc}],gridItem:Ln},vc=t=>{const e=U(t);return()=>e(hc)};function Xt(t,e={}){const{bau:n,css:o}=t,{div:a,label:r}=n.tags,i=xe(t),l=o`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"none",color:g=e.color??"neutral",name:m,oninput:h,value:b,radios:v=[],...x}]=J(u);return a({...x,class:B("radioButtonGroup",d,g,p,l,e==null?void 0:e.class,x==null?void 0:x.class)},v.map(({id:S,Label:C})=>r(i({size:d,variant:p,color:g,id:S,name:m,checked:b==S,value:S,oninput:h}),C())))}}const xc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:r}=e.tags,i=Xt(t),s=R(t,{variant:"outline",color:"primary"}),l=e.state("two"),c=({target:d})=>l.val=d.id,u=d=>{d.preventDefault(),alert(l.val)};return()=>n({onsubmit:u},o(i({oninput:c,name:"myRadio",value:l.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),r("CheckedState: ",l)),a(s({type:"submit"},"Submit")))},yc=`import { Context } from "@grucloud/bau-ui/context";
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
`,wc=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=Xt(t),i=R(t,{variant:"outline",color:"primary"}),s=l=>{l.preventDefault();const c=l.target.closest("form"),u=Object.fromEntries(new FormData(c));alert(JSON.stringify(u))};return()=>n({onsubmit:s},o(r({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},Sc=`import { Context } from "@grucloud/bau-ui/context";
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
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
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
`,Cc=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:r,img:i}=e.tags,s=Xt(t),l=R(t,{variant:"outline",color:"primary"}),c=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28}),d=p=>{p.preventDefault();const g=p.target.closest("form"),m=Object.fromEntries(new FormData(g));alert(JSON.stringify(m))};return()=>o({onsubmit:d},a(s({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>[c(),"GitHub"]},{id:"GitLab",Label:()=>[u(),"GitLab"]}]})),r(l({type:"submit"},"Submit")))},kc=`import { Context } from "@grucloud/bau-ui/context";
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
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
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
`,Ec=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:r,div:i}=e.tags,s=Xt(t),l=R(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=u.target.closest("form"),p=Object.fromEntries(new FormData(d));alert(JSON.stringify(p))};return()=>n({onsubmit:c},o(s({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>i("GitHub",r("Login with GitHub"))},{id:"GitLab",Label:()=>i("GitLab",r("Login with GitLab"))}]})),a(l({type:"submit"},"Submit")))},Tc=`import { Context } from "@grucloud/bau-ui/context";
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
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
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
`,Ac={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:Sc,createComponent:wc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:yc,createComponent:xc},{title:"Label with Image",description:"A label with an image.",code:kc,createComponent:Cc},{title:"Label with description",description:"A label with name and description.",code:Tc,createComponent:Ec}]},Dc=t=>{const e=U(t);return()=>e(Ac)},Bc=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Lt(t,e={}){const{bau:n,css:o}=t,{div:a,li:r,select:i,option:s}=n.tags,l=R(t),c=$t(t),u=vt(t),d=o`
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
    ${Bc()}
  `;return function(...g){let[{size:m=e.size??"md",variant:h=e.variant??"outline",color:b=e.color??"neutral",label:v,Option:x,options:S,defaultOption:C,getOptionLabel:T,getOptionValue:A,onSelect:D=()=>{},loading:M,...N},...O]=J(g);const L=gt(t,{variant:h,color:b,size:m}),j=n.state(C?T(C):v),G=n.state(!1),F=n.state(0),P=()=>{V.openDialog(),V.focus(),G.val=!0},w=()=>{V.closeDialog(),G.val=!1},f=()=>{G.val=!1},y=I=>{V.open?w():P(),I.preventDefault()},k=({option:I,index:X})=>nt=>{j.val=T(I),K.value=A(I),K.setCustomValidity(""),F.val=X,w(),D(I),nt.preventDefault()},E=I=>{switch(I.preventDefault(),I.key){case"Escape":w();break;case"ArrowDown":F.val<S.length-1?F.val++:F.val=0;break;case"ArrowUp":F.val<=0?F.val=S.length-1:F.val--;break;case"Enter":V.open?(j.val=T(S[F.val]),K.value=A(s),w()):P();break}},H=()=>u({tabindex:"0",class:B(b,h)},S.map((I,X)=>r({class:()=>B(F.val==X&&"active"),onclick:k({option:I,index:X})},x(I)))),z=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":G,"aria-label":v,onclick:y,color:b,variant:h,size:m,class:M==!0&&"loading",disabled:M},()=>!j.val&&v,j,()=>M==!0&&L({visibility:M})),V=c({triggerEl:z,contentEl:H(),onClose:f}),K=i(N,s({value:""},"--Select Category--"),S.map(I=>s({value:A(I)},T(I))));return K.value=N.value,a({...N,class:B("select",b,m,d,e==null?void 0:e.class,N==null?void 0:N.class),onkeydown:E},K,z,V)}}const Pn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:r}=n.tags,i=Lt(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Mc=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:r}=e.tags,i=Lt(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return()=>o(i({options:s,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Select a country..."}))},Ic=`import select from "@grucloud/bau-ui/select";
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
`,Nc=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:r}=e.tags,i=Lt(t),s="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(u.label),r(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==s),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},$c=`import select from "@grucloud/bau-ui/select";
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
`,Oc=t=>{const{bau:e}=t,{span:n,form:o}=e.tags,a=Lt(t),r=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n({},s);return()=>o(a({options:r,Option:i,label:"Select a region",getOptionValue:s=>s,getOptionLabel:s=>s}))},Lc=`import select from "@grucloud/bau-ui/select";
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
`,Pc=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:r}=e.tags,i=R(t,{variant:"outline"}),s=Lt(t),l=e.state([]),c=e.state(!1),u=e.state("");async function d({url:m,transform:h=b=>b}){try{c.val=!0;const b=await fetch(m,{});if(b.ok){const v=await b.json();l.val=h(v)}else u.val=b.statusText}catch(b){u.val=b.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,b)=>h.name.common.localeCompare(b.name.common))});p();const g=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(m.flag),r(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>s({options:l.val,Option:g,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},zc=`import { Context } from "@grucloud/bau-ui/context";
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
`,_c={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Ic,createComponent:Mc},{title:"Default Option",description:"Select with a default option",code:$c,createComponent:Nc},{title:"Select AWS region",description:"Select the AWS region",code:Lc,createComponent:Oc},{title:"Loading Indicator",description:"Select with a loading indicator",code:zc,createComponent:Pc}],gridItem:Pn},Rc=t=>{const e=U(t);return()=>e(_c)};function zn(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,r=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("select-native",u,l,c,r,e==null?void 0:e.class,d==null?void 0:d.class)},p)}}const _n=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=zn(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,r.map(({label:s,phone:l})=>o({value:l},s)))},jc=t=>{const{bau:e}=t,{option:n,form:o,footer:a}=e.tags,r=R(t,{variant:"outline",color:"primary"}),i=zn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(u))};return()=>o({onsubmit:l},i({name:"my-select"},n({value:""},"--Please choose a phone code--"),s.map(({label:c,phone:u})=>n({value:u},c))),a(r({type:"submit"},"Submit")))},Gc=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Hc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Gc,createComponent:jc}],gridItem:_n},Uc=t=>{const e=U(t);return()=>e(Hc)},Fc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,r=Ct(t),i=()=>a({class:n`
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
          `})));return()=>o(i())},Vc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Wc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,r=Ct(t),i=()=>a({class:n`
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
            `}))));return()=>o(i())},Jc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Kc=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:r,tr:i,td:s}=e.tags,l=Ct(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(r(new Array(8).fill("").map(()=>i(s(l({class:n`
                  width: 5rem;
                `})),s(l()),s(l()),s(l()),s(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},qc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Xc=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:r,article:i}=e.tags,s=n`
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
  `,l=Ct(t,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),c=Ct(t);function u({columnsSize:d=4}){return o({class:s},a(new Array(d).fill("").map(()=>l(r("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Zc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Yc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Vc,createComponent:Fc},{title:"List",description:"A list skeleton.",code:Jc,createComponent:Wc},{title:"Table",description:"A table skeleton.",code:qc,createComponent:Kc},{title:"Tabs",description:"A tabs skeleton.",code:Zc,createComponent:Xc}],variantColorTableDisable:!0,variantSizeDisable:!0},Qc=t=>{const e=U(t);return()=>e(Yc)};function Zt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${(()=>ot.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p},...g]=J(l);return a({...p,type:"range",class:B("slider",d,u,c,i,e==null?void 0:e.class,p.class)},...g)}}const Rn=t=>{const{bau:e}=t,n=e.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=Zt(t);return r=>a({...r,oninput:o})},tl=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:r}=e.tags,i=e.state(0),s=c=>{i.val=c==null?void 0:c.target.value},l=Zt(t);return()=>n(o(a("Slider with step, min and max",r,l({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},el=`import slider from "@grucloud/bau-ui/slider";
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
`,nl=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:r,datalist:i,br:s,option:l}=e.tags,c=e.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Zt(t);return()=>o(a(r({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>l({value:Number(p),label:p})))))},ol=`import slider from "@grucloud/bau-ui/slider";
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
`,al=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:r,datalist:i,br:s,option:l}=e.tags,c=e.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Zt(t);return()=>o(a({class:n`
            display: flex;
          `},r({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>l({value:Number(p),label:p})))))},rl=`import slider from "@grucloud/bau-ui/slider";
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
`,sl={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:el,createComponent:tl},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ol,createComponent:nl},{title:"Vertical Mark",description:"A vertical slider with marks.",code:rl,createComponent:al}],gridItem:Rn},il=t=>{const e=U(t);return()=>e(sl)},jn=(t,e)=>{const n=gt(t,e);return o=>n({...o})},cl=t=>{const{bau:e}=t,{section:n}=e.tags,o=R(t,{variant:"solid",color:"primary"}),a=gt(t,{size:"lg"}),r=e.state(!0);return()=>n(o({onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),a({visibility:r}))},ll=`import spinner from "@grucloud/bau-ui/spinner";
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
`,ul={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ll,createComponent:cl}],gridItem:jn},dl=t=>{const e=U(t);return()=>e(ul)},pl=()=>ot.map(t=>"").join(`
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
    ${pl()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...p){let[{color:g,variant:m="plain",size:h,stepperDefs:b=[],stepperName:v,activeStepIndex:x=n.state(0),...S},...C]=J(p);const T=n.state(b.map((L,j)=>({...L,index:j}))),A=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(L,j,G)=>{L.apply(j,G);const F=G[2]??"";console.log("stepper pushState ",F),["?","#"].includes(F[0])&&O()}});const D=n.derive(()=>T.val[x.val]),M=L=>{const{Header:j,disabled:G,name:F,index:P}=L;return s({class:()=>B(D.val.name==F&&"active",x.val<P&&"not-completed",x.val>P&&"completed",G&&"disabled")},l({class:"step-number"},P+1),l({class:"step-label"},()=>j(L)))},N=L=>b.findIndex(({name:j})=>j==L.name),O=()=>{const j=new URLSearchParams(a.location.search).get(v)??b[0].name,G=Math.max(b.findIndex(({name:F})=>F==j),0);G<x.val&&(console.log("remove last step"),A.val.pop()),A.val.some(({name:F})=>j==F)||(console.log("add new step"),A.val.push(b[G])),x.val=G};return O(),r({bauMounted:({element:L})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:B("stepper",m,h,g,u,e==null?void 0:e.class,S.class)},n.loop(T,i(),M),n.loop(A,c(),L=>r({class:()=>B("content",L.name==D.val.name&&"visible")},L.Content({nextStep:b[N(L)+1],previousStep:b[N(L)-1]}))))}}const Pe="my-wizard",ml=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:r,section:i,a:s,ul:l,li:c}=e.tags,u=pt(t),d=Ot(t),p=Hn(t),g=Gn(t,Pe),m=R(t,{variant:"outline",color:"primary"}),h=R(t,{variant:"solid",color:"primary"}),b=({nextStep:S})=>C=>{C.preventDefault();const{organization:T}=C.target.elements;n.history.pushState("","",g(S.name,{organization:T.value}))},v=S=>{var D;S.preventDefault();const{organization:C}=(D=n.document.forms)==null?void 0:D.formStep1.elements,A=new URLSearchParams(n.location.search).get("choice");alert(`organization ${C.value}, choice:${A}`)},x=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>d({onsubmit:b({nextStep:S}),id:"formStep1"},r("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:C})=>d(l(c(s({href:g(S.name,{choice:"choice1"})},"Choice 1")),c(s({href:g(S.name,{choice:"choice2"})},"Choice 2"))),o(m({href:g(C.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>d({onsubmit:v},a("My stepper 3 Content"),o(m({href:g(S.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>i(p({stepperDefs:x,stepperName:Pe}))},gl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ze="stepper-vertical",bl=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:r,label:i,section:s,a:l,ul:c,li:u}=e.tags,d=pt(t),p=Ot(t),g=Hn(t,{class:o`
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
    `}),m=Gn(t,ze),h=R(t,{variant:"outline",color:"primary"}),b=R(t,{variant:"solid",color:"primary"}),v=({nextStep:C})=>T=>{T.preventDefault();const{organization:A}=T.target.elements;n.history.pushState("","",m(C.name,{organization:A.value}))},x=C=>{var M;C.preventDefault();const{organization:T}=(M=n.document.forms)==null?void 0:M.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${T.value}, choice:${D}`)},S=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:C})=>p({onsubmit:v({nextStep:C}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(b({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:C,previousStep:T})=>p(c(u(l({href:m(C.name,{choice:"choice1"})},"Choice 1")),u(l({href:m(C.name,{choice:"choice2"})},"Choice 2"))),a(h({href:m(T.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:C})=>p({onsubmit:x},r("My stepper 3 Content"),a(h({href:m(C.name)},"Previous: Step 2"),b({type:"submit"},"Save")))}];return()=>s(g({stepperDefs:S,stepperName:ze}))},fl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,hl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:gl,createComponent:ml},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:fl,createComponent:bl}]},vl=t=>{const e=U(t);return()=>e(hl)},xl=()=>ot.map(t=>`
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
`);function Un(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
    ${xl()}
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=J(s);return a({...d,class:B("switch",r,u,c,l,e==null?void 0:e.class,d.class),type:"checkbox"},...p)}}const Fn=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:r}=n.tags,i=Un(t,e);return s=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},r("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),r("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},yl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:r}=e.tags,i=Un(t,{variant:"outline"}),s=R(t,{variant:"outline",color:"primary"}),l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(u))};return()=>a({onsubmit:l},r({class:n`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `},"My shinny switch",i({name:"my-shinny-switch"})),o(s({type:"submit"},"Submit")))},wl=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Sl={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:wl,createComponent:yl}],gridItem:Fn},Cl=t=>{const e=U(t);return()=>e(Sl)},kl=()=>ot.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function Pt(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:r}=e,{div:i,ul:s,li:l,a:c}=n.tags,u=o`
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
    ${kl()}
  `;return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",tabsKey:b="tabs",...v},...x]=J(p);const S=n.state(r),C=O=>S.val.find(L=>L.name==O),T=n.state(r[0]),A=()=>{var j,G;const L=new URLSearchParams(a.location.search).get(b)??r[0].name;if(L!=T.val.name){const F=C(L);(j=T.val.exit)==null||j.call(),T.val=F,(G=F==null?void 0:F.enter)==null||G.call()}};A(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,L,j)=>{O.apply(L,j);const G=j[2]??"";["?","#"].includes(G[0])&&A()}});const D=O=>{const L=new URLSearchParams(a.location.search);return L.delete(b),L.append(b,O),`?${L.toString()}`},M=O=>{const{Header:L,disabled:j,name:G}=O;return l({class:()=>B(T.val.name==G&&"active",j&&"disabled")},c({href:D(G)},L(O)))},N=i({class:B("tabs",m,g,h,u,e==null?void 0:e.class,v.class),bauMounted:({element:O})=>{a.addEventListener("popstate",A)},bauUnmounted:()=>{a.removeEventListener("popstate",A)}},n.loop(S,s(),M),n.bind({deps:[T],render:()=>({Content:O})=>O?O(v):""}));return N.addEventListener("tab.add",O=>{var j;const{tab:L}=O.detail;(j=L.enter)==null||j.call(),S.val.push(L)},!1),N.addEventListener("tab.remove",O=>{var j;const L=S.val.findIndex(G=>G.name==O.detail.tabName);L>0&&((j=S.val[L].exit)==null||j.call(),S.val.splice(L,1))},!1),N}}const El=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,r=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>r({})},Tl=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Al=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,r=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>r({tabsKey:"my-tab"})},Dl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Vn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Bl=t=>{const{css:e}=t,n=Pt(t,{tabDefs:Vn(t),class:e`
      flex-direction: column-reverse;
    `});return()=>n({})},Ml=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Il=t=>{const{css:e}=t,n=Vn(t),o=Pt(t,{tabDefs:n,class:e`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},Nl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,$l={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Tl,createComponent:El},{title:"Extended Tabs",description:"An extended tabs.",code:Dl,createComponent:Al},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Ml,createComponent:Bl},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Nl,createComponent:Il}]},Ol=t=>{const e=U(t);return()=>e($l)};function zt(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:r}=n.tags;a`
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
  `;return function(...l){let[{...c},...u]=J(l);return r({...c,class:B("table-container",i,e==null?void 0:e.class,c==null?void 0:c.class)},...u)}}const Ll=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags;function d(b,v,x,S,C){return{name:b,calories:v,fat:x,carbs:S,protein:C}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:b,calories:v})=>i(r(b),r({class:n`
            text-align: right;
          `},v)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=zt(t,{class:n`
      max-width: 650px;
    `});return()=>o(h(s(u("Basic Table"),m(),c(p.map(g)))))},Pl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function At(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const zl=[At("Frozen yoghurt",159,6,24,4),At("Ice cream sandwich",237,9,37,4.3),At("Eclair",262,16,24,6),At("Cupcake",305,3.7,67,4.3),At("Gingerbread",356,16,49,3.9)],_l=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags,d=({name:m,calories:h})=>i(r(m),r({class:n`
            text-align: right;
          `},h)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=zt(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(s(u("Table Dense"),p(),c(zl.map(d)))))},Rl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Dt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const jl=[Dt("Frozen yoghurt",159,6,24,4),Dt("Ice cream sandwich",237,9,37,4.3),Dt("Eclair",262,16,24,6),Dt("Cupcake",305,3.7,67,4.3),Dt("Gingerbread",356,16,49,3.9)],Gl=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags,d=({name:m,calories:h})=>i(r(m),r({class:n`
            text-align: right;
          `},h)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=zt(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(s(u("Table Zebra"),p(),c(jl.map(d)))))},Hl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Ul={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Pl,createComponent:Ll},{title:"Dense",description:"A dense table.",code:Rl,createComponent:_l},{title:"Zebra",description:"A zebra table.",code:Hl,createComponent:Gl}]},Fl=t=>{const e=U(t);return()=>e(Ul)},Vl=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:r,section:i,article:s}=e.tags,l=an(t),c=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),r({id:"h3-1-1"},"h3 1 1"),r({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),r({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},Wl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Jl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Wl,createComponent:Vl}]},Kl=t=>{const e=U(t);return()=>e(Jl)};function Wn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=he(t),i=R(t),s=gt(t),l=o`
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
  `,c=({label:m,icon:h,...b})=>i({"aria-label":m,title:m,...b},h),u=({count:m,totalCount:h,page:b,rowsPerPage:v})=>a({class:"pages-numbers"},Number(b-1)*Number(v)+(m>0?1:0),"-",Math.min(b*v,h)," of ",h),d=({count:m,page:h,rowsPerPage:b})=>a({class:"pages-numbers"},(h-1)*b+(m>0?1:0),"-",h*b),p=m=>m<=1,g=(m,h,b)=>m>=Math.ceil(h/b);return function(...h){let[{size:b=e.size??"md",variant:v=e.variant??"outline",color:x=e.color??"neutral",count:S=0,totalCount:C=0,page:T=1,rowsPerPage:A=50,onPageChange:D,isLoading:M=!1,disableFirst:N=()=>p(T),disablePrevious:O=()=>p(T),disableNext:L=()=>g(T,C,A),disableLast:j=()=>g(T,C,A),...G},...F]=J(h);const P=Math.max(0,Math.ceil(C/A)),w=D({page:1}),f=D({page:T-1}),y=D({page:T+1}),k=D({page:P}),E=[{label:"First",icon:"⟪",onclick:w,disabled:N()},{label:"Previous",icon:"⟨",onclick:f,disabled:O()},{label:"Next",icon:"⟩",onclick:y,disabled:L()},{label:"Last",icon:"⟫",onclick:k,disabled:j()}];return a({...G,class:B("table-pagination",l,M&&"disabled",e==null?void 0:e.class,G==null?void 0:G.class)},s({class:"spinner",visibility:M,size:"md"}),C>0?u({count:S,totalCount:C,page:T,maxPages:P,rowsPerPage:A}):d({count:S,page:T,maxPages:P,rowsPerPage:A}),r({variant:v,color:x},E.map(H=>c({...H,variant:v,color:x}))))}}const ql=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Xl=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:r,table:i,thead:s,tbody:l}=e.tags,c=ql(45),u=({name:x,email:S})=>r(a(x),a(S)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Wn(t),g=zt(t,{class:n`
      max-width: 650px;
    `}),m=e.state(c),h=e.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),b=e.derive(()=>m.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),v=({page:x})=>S=>{h.val.page=x};return()=>g(i(d(),()=>l(b.val.map(u))),()=>p({...h.val,onPageChange:v}))},Zl=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:r,table:i,thead:s,tbody:l,div:c}=e.tags,u=e.state(!1),d=e.state([]),p=e.state(""),g=e.derive(()=>d.val.length),m=e.state(1),h=e.state(10),b=e.derive(()=>d.val),v=N=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(N).toString()}`,x=({page:N})=>O=>{m.val=N,S(v({page:N,per_page:h.val}))};S(v({page:1,per_page:h.val}));async function S(N){try{u.val=!0;const O=await fetch(N,{});if(O.ok){const L=await O.json();d.val=L;return}throw O}catch(O){p.val=O.message}finally{u.val=!1}}const C=({name:N,description:O,stargazers_count:L})=>r(a(N),a(O),a({class:n`
            text-align: right;
          `},L)),T=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),A=Wn(t),D=zt(t,{class:n`
      min-width: 650px;
    `}),M=({message:N})=>c(N);return()=>D(()=>A({rowsPerPage:h.val,page:m.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:x,disableNext:()=>!1}),i(T(),()=>p.val&&M({message:p.val}),()=>l(b.val.map(C))))},Yl=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:r,h2:i,tr:s}=e.tags,l=Xl(t),c=Zl(t),u=(...d)=>a({class:n`
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
      --toggle-background-color: rgba(0, 0, 0, 0.2);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.16)
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",selected:p=!1,disabled:g,onChange:m,...h},...b]=J(l);return r({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>v=>v},class:{deps:[p],renderProp:()=>v=>B("toggle",c,d,u,i,v&&"selected",e==null?void 0:e.class,h==null?void 0:h.class)},disabled:g},b)}}const Jn=(t,e)=>{const{bau:n}=t,o=_t(t,e);return a=>{const r=n.state(!1);return o({...a,selected:r,onclick:()=>r.val=!r.val},"Toggle Me")}},Ql=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=_t(t,{variant:"plain"}),i=R(t,{variant:"outline",color:"primary"}),s=e.state(!1),l=c=>{var p;c.preventDefault();const d=(p=c.target.closest("form").querySelector("button[aria-pressed=true]"))==null?void 0:p.name;alert(d)};return()=>n({onsubmit:l},o(r({name:"my-toogle",selected:s,onclick:()=>s.val=!s.val},"Toggle Me")),a(i({type:"submit"},"Submit")))},tu=`import { Context } from "@grucloud/bau-ui/context";
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
    const formEl = event.target.closest("form");
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
`,eu={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:tu,createComponent:Ql}],gridItem:Jn},nu=t=>{const e=U(t);return()=>e(eu)},ou=()=>ot.map(t=>`
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
    ${ou()}
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...g},...m]=J(s);const h=new Set,b=v=>{const{value:x}=v.target;d?(h.clear(),h.add(x)):h.has(x)?h.delete(x):h.add(x),p({event:v,values:[...h]})};return a({...g,class:B("toggle-group",l,u,c,r,e==null?void 0:e.class,g==null?void 0:g.class),onclick:b},...m)}}const Kn=(t,e)=>{const{bau:n}=t,o=ye(t,e),a=_t(t,e);return r=>{const i=n.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...r,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:u})=>()=>a({...r,value:u,selected:i.val.includes(u),"area-label":c},c)))}},au=t=>{const{bau:e}=t,{form:n,footer:o,article:a}=e.tags,r=e.state([""]),i=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s="primary",l="solid",c=_t(t,{color:s,variant:l}),u=ye(t,{color:s,variant:l}),d=R(t,{variant:"outline",color:"primary"}),p=({values:m})=>{r.val=m},g=m=>{var v;m.preventDefault();const b=(v=m.target.closest("form").querySelector("button[aria-pressed=true]"))==null?void 0:v.name;alert(b)};return()=>n({onsubmit:g},a(u({exclusive:!0,onChange:p},i.map(({label:m,value:h})=>()=>c({value:h,name:m,selected:r.val.includes(h)},m)))),o(d({type:"submit"},"Submit")))},ru=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
    const formEl = event.target.closest("form");
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
`,su=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=e.state([""]),i=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s="primary",l="solid",c=_t(t,{variant:l,color:s}),u=ye(t,{variant:l,color:s}),d=R(t,{variant:"outline",color:"primary"}),p=({values:m})=>{r.val=m},g=m=>{m.preventDefault();const b=[...m.target.closest("form").querySelectorAll("button[aria-pressed=true]")].map(({name:v})=>v);alert(JSON.stringify(b))};return()=>n({onsubmit:g},o(u({onChange:p},i.map(({label:m,value:h})=>()=>c({value:h,name:m,selected:r.val.includes(h)},m)))),a(d({type:"submit"},"Submit")))},iu=`import { Context } from "@grucloud/bau-ui/context";
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
    const formEl = event.target.closest("form");
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
`,cu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:ru,createComponent:au},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:iu,createComponent:su}],gridItem:Kn},lu=t=>{const e=U(t);return()=>e(cu)};function we(t,e={}){const{bau:n,css:o,window:a}=t,{div:r}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=e.size??"md",variant:p=e.variant??"outline",color:g=e.color??"neutral",...m},...h]=J(l);const b=r({class:B("container",...u.split("-"))},r({class:B("content",g,p,d),role:"tooltip"},c)),v=D=>`move-to-${D}`,x=(D,M,N)=>{if(D()){const O=v(M);b.classList.add(O),b.classList.add(M),b.classList.remove(N)}},S=(D,M)=>{const N=v(D);b.classList.contains(N)&&(b.classList.remove(N),b.classList.add(M),b.classList.remove(D))},C=D=>{const M=b.getBoundingClientRect();x(()=>M.x<0,"right","left"),x(()=>M.x+M.width>a.innerWidth,"left","right"),x(()=>M.y<0,"bottom","top"),x(()=>M.bottom>a.innerHeight,"top","bottom"),b.classList.add("visible")},T=D=>{b.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return r({...m,class:B("tooltip",i,e==null?void 0:e.class,m==null?void 0:m.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",C),D.addEventListener("mouseout",T)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",C),D.removeEventListener("mouseout",T)}},...h,b)}}const qn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:r}=n.tags,i=R(t),s=we(t,e),l=()=>o(a("A ",r("tooltip")," can be any component"));return c=>s({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},uu=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,r=R(t),i=we(t),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:s()},r("tooltip"))},du=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,pu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:r,section:i}=e.tags,s=Nt(t,{variant:"outline",color:"primary"}),l=we(t),c=()=>o(a("A ",r("tooltip")," can be any component")),u=()=>i({class:n`
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
          `},l({side:"bottom-start",titleEl:c()},s("bottom start")),l({side:"bottom-centered",titleEl:c()},s("bottom centered")),l({side:"bottom-end",titleEl:c()},s("bottom end"))));return()=>u()},mu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,gu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:du,createComponent:uu},{title:"Grid",description:"Various tooltip position",code:mu,createComponent:pu}],gridItem:qn},bu=t=>{const e=U(t);return()=>e(gu)},Xn=(t,e)=>{const n=se(t,e);return o=>n(o)},fu=t=>{const{bau:e}=t,{section:n}=e.tags,o=se(t);return()=>n(o({}))},hu=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,vu={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:hu,createComponent:fu}],gridItem:Xn},xu=t=>{const e=U(t);return()=>e(vu)},Zn=({parent:t,grandParent:e})=>n=>{const{children:o=[],...a}=n,r={...a};return r.children=o==null?void 0:o.map(Zn({parent:n,grandParent:t})),t&&(t.parent=e),r.parent=t,r},yu=({css:t,createGlobalStyles:e})=>(e`
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
  `});function Se(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:r}=e,{ul:i,li:s,nav:l,div:c}=n.tags,u=yu({css:o,createGlobalStyles:a}),d=ge(t),p=({depth:g=1,maxDepth:m,parent:h,color:b,variant:v,size:x})=>S=>{const{children:C,expanded:T}=S,A=n.state(!T),D=()=>c({class:o`
              cursor: ${C?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:N=>{C&&(A.val=!A.val)}},r({item:S,parent:h,depth:g})),M=()=>i({class:B(b,x)},C.map(p({depth:g+1,maxDepth:m,parent:S})));return s(C.length?d({expanded:T,Header:D,Content:C&&g<m&&M}):D())};return function({tree:m,maxDepth:h=1/0,size:b=e.size??"md",variant:v=e.variant??"outline",color:x=e.color??"neutral",...S}){return l({class:B(u.nav,b,v,x,e==null?void 0:e.class,S.class)},i(p({maxDepth:h,color:x,variant:v,size:b})(Zn({})({...m}))))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Se(t,{renderMenuItem:({item:{data:{name:s,href:l}}})=>o({href:l},s),...e});return s=>i({...s,tree:a})},wu=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=Se(t,{renderMenuItem:({item:{data:{name:i,href:s}}})=>n({href:s},i)});return()=>r({tree:o})},Su=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Cu=t=>{const{bau:e,css:n,window:o}=t,{form:a,label:r,article:i,footer:s}=e.tags,l=Et(t,{color:"neutral",variant:"outline"}),c=R(t,{variant:"solid",color:"danger"}),u=e.state(0),d=C=>{C.preventDefault();const T=C.target.closest("form"),A=Object.fromEntries(new FormData(T));alert(JSON.stringify(A))},p={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},g=({id:C,name:T})=>C??T,m=C=>o.document.getElementById(g(C)),h=({onNode:C})=>T=>{C(T);const{children:A=[]}=T;A.map(h({onNode:C}))},b=({parent:C})=>{if(C){const{children:T}=C,A=m(C.data);if(A){const D=T.every(M=>{const{checked:N,indeterminate:O}=m(M.data);return!N&&!O});A.indeterminate=!D&&T.some(M=>!m(M.data).checked),A.checked=T.every(M=>m(M.data).checked)}b({parent:C.parent})}},v=({item:C,parent:T})=>A=>{b({parent:T}),h({onNode:N=>{const O=m(N.data);O&&(O.checked=A.target.checked,O.indeterminate=!1)}})(C);const M=A.target.closest("form").querySelectorAll('input[type="checkbox"][data-type="resources"]:checked');u.val=M.length,A.stopPropagation()},S=Se(t,{renderMenuItem:({item:C,parent:T})=>{const{name:A,id:D}=C.data,M=g(C.data);return r({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:N=>N.stopPropagation()},l({onclick:v({item:C,parent:T}),name:M,id:M,"data-type":D?"resources":"group"}),A)}});return()=>a({onsubmit:d},i(S({tree:p})),s(c({type:"submit"},()=>`Delete ${u.val} Resource(s)`)))},ku=`import { Context } from "@grucloud/bau-ui/context";
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
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
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

      const formEl = event.target.closest("form");
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
`,Eu={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:Su,createComponent:wu},{title:"Checkable",description:"A treeview with checkboxes.",code:ku,createComponent:Cu}],gridItem:Yn},Tu=t=>{const e=U(t);return()=>e(Eu)},Au=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return s=>i(s)},Du=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:r,p:i,ul:s,li:l}=e.tags,c=rn(t),u=R(t),d=[{name:"Accordion",Item:sn(t)},{name:"Alert",Item:ln(t)},{name:"Autocomplete",Item:dn(t)},{name:"Avatar",Item:un(t)},{name:"Badge",Item:mn(t)},{name:"Breadcrumbs",Item:gn(t)},{name:"Button",Item:bn(t)},{name:"Button Group",Item:fn(t)},{name:"Calendar",Item:vn(t)},{name:"Checkbox",Item:yn(t)},{name:"Chip",Item:xn(t)},{name:"DrillDown Menu",Item:Sn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:kn(t)},{name:"Input",Item:En(t)},{name:"Input Search",Item:Tn(t)},{name:"Linear Progress",Item:In(t)},{name:"Loading Button",Item:Nn(t)},{name:"Modal",Item:On(t)},{name:"Radio Button",Item:Ln(t)},{name:"Select",Item:Pn(t)},{name:"Select Native",Item:_n(t)},{name:"Slider",Item:Rn(t)},{name:"Spinner",Item:jn(t)},{name:"Switch",Item:Fn(t)},{name:"Tabs",Item:Au(t)},{name:"Theme Switch",Item:Xn(t)},{name:"Toggle",Item:Jn(t)},{name:"Toggle Group",Item:Kn(t)},{name:"Tooltip",Item:qn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
          overflow-y: scroll;
        `},r("Bau Component Gallery"),i("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:p})=>l(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},c(p))))},Bu=({context:t})=>{const e=Du(t);return[{path:"",action:n=>({title:"Bau UI",component:Ro(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ua(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Qa(t)})},{path:"alert",action:()=>({title:"Alert",component:ir(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:pr(t)})},{path:"animate",action:()=>({title:"Animate",component:vr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Or(t)})},{path:"avatar",action:()=>({title:"Avatar",component:kr(t)})},{path:"badge",action:()=>({title:"Badge",component:_r(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Fr(t)})},{path:"button",action:()=>({title:"Button",component:Xr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:es(t)})},{path:"calendar",action:()=>({title:"Calendar",component:rs(t)})},{path:"carousel",action:()=>({title:"Carousel",component:ds(t)})},{path:"chip",action:()=>({title:"Chip",component:bs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Cs(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:As(t)})},{path:"divider",action:()=>({title:"Divider",component:Ns(t)})},{path:"drawer",action:()=>({title:"Drawer",component:zs(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Us(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Js(t)})},{path:"fileInput",action:()=>({title:"File Input",component:Zs(t)})},{path:"form",action:()=>({title:"Form",component:ri(t)})},{path:"input",action:()=>({title:"Input",component:li(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:mi(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:xi(t)})},{path:"lazy",action:()=>({title:"Lazy",component:Ai(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Ii(t)})},{path:"list",action:()=>({title:"List",component:Hi(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Li(t)})},{path:"modal",action:()=>({title:"Modal",component:Wi(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:tc(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:lc(t)})},{path:"paper",action:()=>({title:"Paper",component:gc(t)})},{path:"popover",action:()=>({title:"Popover",component:ac(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:vc(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:Dc(t)})},{path:"select",action:()=>({title:"Select",component:Rc(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:Uc(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Qc(t)})},{path:"slider",action:()=>({title:"Slider",component:il(t)})},{path:"spinner",action:()=>({title:"Spinner",component:dl(t)})},{path:"stepper",action:()=>({title:"Stepper",component:vl(t)})},{path:"switch",action:()=>({title:"Switch",component:Cl(t)})},{path:"table",action:()=>({title:"Table",component:Fl(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Kl(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Yl(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Ol(t)})},{path:"toggle",action:()=>({title:"Toggle",component:nu(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:lu(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:bu(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:xu(t)})},{path:"treeView",action:()=>({title:"Tree View",component:Tu(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Ho(t)})}]},Mu=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),Iu=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=t,i=a.state(),s=e({componentState:i});return document.getElementById("app").replaceChildren(s),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=e}=c.resolve({pathname:u});i.val=p({}),document.title=`${d}`}},Nu=t=>{const{createGlobalStyles:e}=t;e`
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
  `};ho();const Qn={title:"Bau",base:"/bau/bau-ui"},ft=Eo({config:Qn}),{bau:$u}=ft;ft.states={drawerOpen:$u.state(!0)};Nu(ft);ro({routes:Bu({context:ft}),onLocationChange:Iu({context:ft,LayoutDefault:Lo(ft),config:Qn}),notFoundRoute:Mu(ft)});
