(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),_e=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,..._e({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=_e({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},s=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:s}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,r,l)=>{i.apply(r,l),o.pathname!=window.location.pathname&&n({router:s}),a(window.location)}}),document.addEventListener("click",i=>{const{target:r}=i,l=r.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:s}),s}const ae=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],co=t=>`var(--color-${t})`,lo=t=>`var(--color-${t}-lightest)`,uo=()=>ae.map(([t])=>`
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
`),go=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),...io.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
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
  `}function ho(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let re=t=>Object.prototype.toString.call(t??0).slice(8,-1),vo=t=>re(t)=="Object",Ee=t=>re(t)=="Function",ee=t=>["Object","Array"].includes(re(t)),Ae=Object.getPrototypeOf,ne=t=>wt(t)?t.val:t,wt=t=>t==null?void 0:t.__isState,xo=["splice","push","pop","shift","unshift","sort","reverse"],Gt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const K=t=>!wt(t[0])&&vo(t[0])?t:[{},...t];function yo(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,s=new Set,i=!1,r,l=C=>n.createElement(C),c=(C,g,y)=>{let k=r;r=g;let A=C(y);return r=k,A},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(C=>{C.bindings=C.bindings.filter(g=>{var y;return(y=g.element)==null?void 0:y.isConnected}),!C.bindings.length&&!C.computed&&a.delete(C)}),o=void 0}))},d=(C,g,y,k,A,H)=>{var _;if(i){s.add(C);return}for(let V of C.bindings){let{deps:J,element:I,renderInferred:X,render:nt,renderItem:Z}=V;if(Z&&g)(_=p(I,k,(...Y)=>v(Z(...Y)),y,A,H)[g])==null||_.call();else{let Y=X?X({element:I}):nt({element:I,renderItem:Z})(...J.map(ne));Y!==I&&I.replaceWith(V.element=v(Y))}}S(C),u()},m=(C,g,y=[])=>({get(k,A,H){var _;if(r==null||r.add(C),A==="_isProxy")return!0;if(!((_=k[A])!=null&&_._isProxy)&&!wt(k[A])&&ee(k[A]))k[A]=new Proxy(k[A],m(C,g,[...y,A]));else if(xo.includes(A)){let V=k[A];return(...J)=>{let I=V.apply(k,J);return d(C,A,I,J,g,y),I}}return Reflect.get(k,A,H)},set(k,A,H,_){let V=Reflect.set(k,A,H,_);return d(C,"setItem",V,{prop:A,value:H},g,[...y,A]),V}}),b=(C,g)=>new Proxy(g,m(C,g)),p=(C,g,y,k,A,H)=>{let _=()=>C.replaceChildren(...Gt(k,y)),V=J=>C[J]&&C.removeChild(C[J]);return{assign:_,sort:_,reverse:_,setItem:()=>{var I;let J=H[0];(I=C.children[J])==null||I.replaceWith(y(A[J],J))},push:()=>C.append(...Gt(g,(J,I)=>y(J,A.length+I))),unshift:()=>C.prepend(...Gt(g,y)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:J}=C.children;let[I,X=J,...nt]=g;for(let Z=I>=0?Math.min(I+X-1,J-1):J-1;Z>=(I>=0?I:J+I);Z--)C.children[Z].remove();if(nt.length){let Z=nt.forEach((Y,rt)=>y(Y,I+rt));C.children[I]?C.children[I].after(...Z):C.append(...Z)}}}},f=C=>({oldVal:C,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return r==null||r.add(g),g.valProxy??(g.valProxy=ee(C)?b(g,C):C,g.valProxy)},set val(g){let y=this,k=y.val;ee(g)?(y.valProxy=b(y,g),d(y,"assign",g)):g!==k&&(y.valProxy=g,d(y)),y.oldVal=k}}),v=C=>{if(C==null||C===!1){const g=l("span");return g.style.display="none",g}else return C.nodeType?C:n.createTextNode(C)},x=(C,g)=>{let y=new Set;return g.val=c(C,y),y},h=C=>{let g=f(),y=x(C,g);g.computed=!0;for(let k of y)k.listeners.push({computed:C,deps:y,state:g});return g},S=C=>{for(let g of[...C.listeners])x(g.computed,g.state)},w=(C,...g)=>{if(g.length){let y=[];for(let k of g.flat(1/0))k!=null&&y.push(wt(k)?G({deps:[k],render:()=>A=>A}):Ee(k)?j({renderInferred:k}):v(k));C.append(...y)}},E={},T=(C,g)=>C&&(Object.getOwnPropertyDescriptor(C,g)??T(Ae(C),g)),D=(C,g,y)=>{var k;return E[C+","+g]??(E[C+","+g]=((k=T(y,g))==null?void 0:k.set)??0)},M=(C,g)=>new e.MutationObserver((y,k)=>{y.filter(A=>A.removedNodes).forEach(A=>[...A.removedNodes].find(H=>H===C&&(g({element:C}),k.disconnect(),!0)))}).observe(C.parentNode,{childList:!0}),N=(C,g)=>new e.MutationObserver((y,k)=>y.forEach(A=>g({record:A,element:C}))).observe(C,{childList:!0}),$=C=>new Proxy(function(y,...k){var V;let[A,...H]=K(k),_=C?n.createElementNS(C,y):l(y);for(let[J,I]of Object.entries(A)){if(J.startsWith("bau"))continue;let X=D(y,J,Ae(_))?nt=>nt!==void 0&&(_[J]=nt):nt=>_.setAttribute(J,nt);I==null||(wt(I)?G({deps:[I],render:()=>()=>(X(I.val),_)}):Ee(I)&&(!J.startsWith("on")||I.isDerived)?j({renderInferred:()=>(X(I({element:_})),_)}):I.renderProp?G({deps:I.deps,render:()=>()=>(X(I.renderProp({element:_})(...I.deps.map(ne))),_)}):X(I))}return A.bauChildMutated&&N(_,A.bauChildMutated),w(_,...H),_.autofocus&&_.focus&&e.requestAnimationFrame(()=>_.focus()),(V=A.bauCreated)==null||V.call(A,{element:_}),A.bauMounted&&e.requestAnimationFrame(()=>A.bauMounted({element:_})),A.bauUnmounted&&e.requestAnimationFrame(()=>M(_,A.bauUnmounted)),_},{get:(g,y)=>g.bind(void 0,y)}),L=(C,g,y)=>{C.element=v(y);for(let k of g)wt(k)&&(a.add(k),k.bindings.push(C));return C.element},j=({renderInferred:C,element:g})=>{let y=new Set,k=c(C,y,{element:g});return L({renderInferred:C},y,k)},G=({deps:C,element:g,render:y,renderItem:k})=>L({deps:C,render:y,renderItem:k},C,y({element:g,renderItem:k})(...C.map(ne))),F=(C,g,y)=>G({deps:[C],render:({renderItem:k})=>A=>(g.append(...Gt(A,k)),g),renderItem:y}),z=async C=>{i=!0;const g=await C();return i=!1,s.forEach(d),s.clear(),g};return{tags:$(),tagsNS:$,state:f,bind:G,loop:F,derive:h,stateSet:a,batch:z}}const wo=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},So=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Co=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function ko(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...s)=>{const i=Co(a,s),r=wo(i);return!e.getElementById(r)&&So(e,t==null?void 0:t.target,r,o(r,i)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Eo(t){const e=yo(),n=ko();return fo(n),{bau:e,...n,tr:o=>o,window,...t}}function B(...t){return t.filter(e=>e).join(" ")}function Jt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,s=()=>{};return function({animationHide:r=s,animationShow:l=s,...c},u){return a({class:B("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:d,element:m})=>{[...d.removedNodes].forEach(b=>{if(!r()||b.getAttribute("cloned"))return;const p=b.cloneNode(!0);o.requestAnimationFrame(()=>{p.setAttribute("cloned",!0),p.style.top=0,p.style.left=0,p.style.width=b.getAttribute("width"),p.style.height=b.getAttribute("height"),p.style.position="absolute",p.style.animation=r(),d.target.appendChild(p),p.addEventListener("animationend",()=>{var f;return(f=p.parentNode)==null?void 0:f.removeChild(p)})})}),[...d.addedNodes].forEach(b=>{b.getAttribute("cloned")||o.requestAnimationFrame(()=>{m.style.position="relative";const p=b.getBoundingClientRect();if(b.setAttribute("width",p.width+"px"),b.setAttribute("height",p.height+"px"),l()){b.style.animation=l();const f=()=>{b.removeEventListener("animationend",f),b.style.animation=""};b.addEventListener("animationend",f)}})})},...c},u)}}const ot=["neutral","primary","success","danger","warning"],Ao=["plain","outline","solid"],To=["sm","md","lg"],Do=()=>ot.map(t=>`
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
    ${Do()}
  `;return function(...i){let[{size:r=e.size??"md",variant:l=e.variant??"none",color:c=e.color??"none",href:u,...d},...m]=K(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:B("button",e.class,l,r,c,a,d.class),href:u},m)}}const Bo="light",Mo=()=>ot.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function se(t,e={}){const{bau:n,css:o,window:a}=t,{input:s}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},l=r();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Bo);const c=o`
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
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"plain",color:p=e.color??"neutral",...f},...v]=K(d);return s({required:"required",title:"Switch Theme",...f,class:B("theme-switch",p,b,m,c,e==null?void 0:e.class,f.class),type:"checkbox",checked:r()=="dark",onclick:x=>{i(x.target.checked?"dark":"light")}},...v)}}function Io(t){const{tr:e,bau:n,css:o,config:a,states:s}=t,{i,header:r,h1:l,div:c,a:u,img:d,b:m,ul:b,li:p}=n.tags,{svg:f,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),x=s.drawerOpen,h=P(t,{class:o`
      background: transparent;
    `}),S=se(t),w=()=>i(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),E=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},h({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},w()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},m(e("Bau UI")))),T=()=>c({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),h({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},E(),T())}}function No({tr:t,bau:e,css:n}){const{section:o,footer:a,span:s,a:i,ul:r,li:l,p:c,div:u,h1:d}=e.tags,m=({links:f,title:v})=>o({class:n`
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
        `},d(v),r(f.map(({href:x,name:h})=>l(i({href:x},h))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],p=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},m({title:"Bau UI",links:b}),m({title:"Bau Ecosystem",links:p})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},s("v0.73.0"),s("MIT license")))}}function vt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("list",s,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}const Ht="0.3s",Re=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,s={...a};return s.children=o==null?void 0:o.map(Re({parent:n,grandParent:t})),t&&(t.parentTree=e),s.parentTree=t,s},je=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=je(t)(e.children[o]);if(a)return a}},Oo=({keyframes:t})=>({hideToLeft:t`
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
   `});function ie(t,e={}){const{bau:n,css:o,window:a,config:s}=t,{base:i="",hashBased:r=!1}=e,l=`${s.base}${i}`,c=z=>{var C;return((C=z.parentTree.data)==null?void 0:C.href)??z.parentTree.children[0].data.href},u=({variant:z,color:C,size:g,currentTree:y,data:k})=>S(D({variant:z,color:C,size:g,href:`${l}${c(y)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:z,color:C,size:g,href:`${l}${k.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},k.name)),d=({size:z,subTree:{data:{name:C,href:g},children:y=[]}})=>D({size:z,href:`${l}${g}`,"data-ischild":!y.length},C),m=({pathname:z,subTree:C})=>{var g;return z===((g=C==null?void 0:C.data)==null?void 0:g.href)},{renderHeader:b=u,renderMenuItem:p=d,isActive:f=m}=e,{li:v,nav:x,div:h,header:S,a:w}=n.tags,E=Jt(t),T=vt(t),D=P(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:M,hideToRight:N}=Oo(t),$=o`
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
  `,L=({children:z,pathnameState:C,variant:g,color:y,size:k})=>T({class:B(g,y,k)},z.map(A=>v({class:()=>B(A.children&&"has-children",f({pathname:C.val,subTree:A})&&"active")},p({variant:g,color:y,size:k,subTree:A})))),j=({variant:z,color:C,size:g,currentTree:y,pathnameState:k})=>{const{children:A,parentTree:H,data:_,renderList:V}=y;return h({class:B("drillDownMenu",z,C,g)},H&&b({variant:z,color:C,size:g,data:_,currentTree:y}),A&&V?V({renderListDefault:L,children:A,pathnameState:k,variant:z,color:C,size:g}):L({children:A,pathnameState:k,variant:z,color:C,size:g}))},G=({tree:z,pathname:C})=>{let g=Re({})({...z}),y=je(C)(g);return y||(y=g),y},F=({target:z})=>{let g=z.closest("a").getAttribute("href").replace(l,"");return r||(g=g.replace(z.hash,"")),g};return function(C){const{size:g=e.size??"md",variant:y=e.variant??"plain",color:k=e.color??"neutral",tree:A,...H}=C,_=n.state(a.location.pathname.replace(l,""));let V=G({tree:A,pathname:_.val});const J=n.state(JSON.stringify(V.data));let I;a.document.addEventListener("click",Y=>{const{target:rt}=Y,ct=rt.closest("a");if(!ct)return;const lt=ct.getAttribute("href");lt&&!lt.startsWith("http")&&!lt.startsWith("#")&&!lt.startsWith("?")&&(V=G({tree:A,pathname:F(Y)}),J.val=JSON.stringify(V.data),_.val=F({target:rt}))});const X=Y=>{const{buttonback:rt,ischild:ct}=Y.target.dataset;rt=="true"?I=-1:ct=="false"?I=1:ct=="true"&&(I=0)},nt=Y=>{switch(Y){case 1:return`${M} ${Ht}`;case-1:return`${N} ${Ht}`;default:return""}},Z=Y=>{switch(Y){case 1:return`${N} ${Ht} reverse`;case-1:return`${M} ${Ht} reverse`;default:return""}};return x({class:B($,y,k,g,e==null?void 0:e.class,H.class),onclick:X},E({animationHide:()=>nt(I),animationShow:()=>Z(I)},n.bind({deps:[J],render:()=>()=>j({variant:y,color:k,size:g,currentTree:V,pathnameState:_})})))}}const $o=()=>ot.map(t=>`
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
`);function mt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
  `;return function(r){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=r;return a({type:"text",...u,class:B("input",e.class,e.size??"md",c,l,s,u.class)})}}function ce(t,e={}){const{bau:n,css:o,window:a}=t,s=mt(t,e);return function(r){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=r,m=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${m};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return s({type:"search",...u,color:c,variant:l,class:B("inputSearch",e.class,b,u.class)})}}function Ge(t){const{tr:e,bau:n,css:o,config:a,states:s,window:i}=t,{div:r,ul:l,li:c,nav:u,a:d,span:m,form:b}=n.tags,p=ce(t,{variant:"plain",color:"neutral",size:"sm"}),v={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:S,children:w,pathnameState:E,variant:T,color:D,size:M})=>{const N=n.state(""),$=n.derive(()=>N.val==""?w:w.filter(j=>j.data.name.match(new RegExp(`${N.val}`,"i")))),L=j=>{N.val=j.target.value};return b({class:o`
          display: flex;
          flex-direction: column;
        `},p({autocomplete:"off",name:"component-search",autofocus:!0,value:N,placeholder:`Search ${$.val.length} components`,size:32,oninput:L}),()=>S({children:$.val,pathnameState:E,variant:T,color:D,size:M}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let x=!1;const h=ie(t);return function(){return r({bauMounted:({element:w})=>{i.innerWidth<=640&&(x=!0,s.drawerOpen.val=!1)},onclick:w=>{x&&!w.target.dataset.buttonback&&!w.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:B(o`
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
          `)},h({tree:v}))}}const Lo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:s}=e.tags,i=Jt(t),r=Io(t),l=Ge(t),c=No(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(m="")=>`${u} ease-in-out 0.5s ${m}`;return function({componentState:b}){return s({class:n`
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
        `},r(),l(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>b.val),c())}};function Nt(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...m},...b]=K(r);return a({...m,onclick:d,class:B("chip",e.class,l,c,u,d&&"clickable",s,m.class)},...b)}}function Po(t){const{bau:e,css:n,config:o}=t,{div:a,h1:s,h2:i,p:r}=e.tags;P(t);const l=n`
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
  `;return function({name:u,text:d,tagLine:m}){return a({class:l},s(u),i(d),r(m))}}function zo(t){const{bau:e,css:n}=t,{div:o,h1:a,p:s}=e.tags,i=n`
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
  `,r=({title:l,Content:c})=>o({className:"feature"},a(l),s(c()));return function({featuresContent:c}){return o({class:i},c.map(r))}}function _o({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:s,dd:i,div:r,aside:l,footer:c,a:u}=e.tags,d=({maxSize:m=151})=>({libName:b,size:p})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},s({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},b),i({class:n`
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
                  var(--color-success) ${p/m*100}%
                );
                justify-content: flex-end;
                width: ${p/m*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},p)));return function({data:b=[]}){return o({class:n`
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
          `},b.map(d({}))),c({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Ro(t){const{bau:e,css:n,config:o}=t,{div:a,p:s,a:i,section:r}=e.tags,l=Po(t),c=zo(t),u=P(t);Nt(t);const d=_o(t),m=(...x)=>a({class:n`
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
          `},...x)),b=n``,p=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[s("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),m(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),m(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),m(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[s("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]}],v=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:f}),d({data:p}),v())}}function jo(t,e={}){const{bau:n,css:o}=t,{div:a,form:s,span:i,pre:r,h3:l,h4:c}=n.tags;return function(d,...m){return a("Login")}}const Go=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:s,h2:i}=n.tags,r=jo(t);return()=>o({id:"login"},i(e("Login Examples")),s("Basic"),a(r()))};function Ho(t){const{tr:e,bau:n,css:o}=t,{div:a,article:s,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(e("Pages Examples")),Go(t)()))}}function Uo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function He(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&He(n)}),t}class Te{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ue(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function pt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Fo="</span>",De=t=>!!t.scope,Vo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Jo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Ue(e)}openNode(e){if(!De(e))return;const n=Vo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){De(e)&&(this.buffer+=Fo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Be=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class le{constructor(){this.rootNode=Be(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Be({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{le._collapse(n)}))}}class Wo extends le{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Mt(t){return t?typeof t=="string"?t:t.source:null}function Fe(t){return xt("(?=",t,")")}function Ko(t){return xt("(?:",t,")*")}function qo(t){return xt("(?:",t,")?")}function xt(...t){return t.map(n=>Mt(n)).join("")}function Xo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function ue(...t){return"("+(Xo(t).capture?"":"?:")+t.map(o=>Mt(o)).join("|")+")"}function Ve(t){return new RegExp(t.toString()+"|").exec("").length-1}function Zo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function de(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let s=Mt(o),i="";for(;s.length>0;){const r=Yo.exec(s);if(!r){i+=s;break}i+=s.substring(0,r.index),s=s.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?i+="\\"+String(Number(r[1])+a):(i+=r[0],r[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Qo=/\b\B/,Je="[a-zA-Z]\\w*",me="[a-zA-Z_]\\w*",We="\\b\\d+(\\.\\d+)?",Ke="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",qe="\\b(0b[01]+)",ta="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ea=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=xt(e,/.*\b/,t.binary,/\b.*/)),pt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},It={begin:"\\\\[\\s\\S]",relevance:0},na={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[It]},oa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[It]},aa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Wt=function(t,e,n={}){const o=pt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ue("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ra=Wt("//","$"),sa=Wt("/\\*","\\*/"),ia=Wt("#","$"),ca={scope:"number",begin:We,relevance:0},la={scope:"number",begin:Ke,relevance:0},ua={scope:"number",begin:qe,relevance:0},da={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[It,{begin:/\[/,end:/\]/,relevance:0,contains:[It]}]}]},ma={scope:"title",begin:Je,relevance:0},pa={scope:"title",begin:me,relevance:0},ba={begin:"\\.\\s*"+me,relevance:0},ga=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Ut=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Qo,IDENT_RE:Je,UNDERSCORE_IDENT_RE:me,NUMBER_RE:We,C_NUMBER_RE:Ke,BINARY_NUMBER_RE:qe,RE_STARTERS_RE:ta,SHEBANG:ea,BACKSLASH_ESCAPE:It,APOS_STRING_MODE:na,QUOTE_STRING_MODE:oa,PHRASAL_WORDS_MODE:aa,COMMENT:Wt,C_LINE_COMMENT_MODE:ra,C_BLOCK_COMMENT_MODE:sa,HASH_COMMENT_MODE:ia,NUMBER_MODE:ca,C_NUMBER_MODE:la,BINARY_NUMBER_MODE:ua,REGEXP_MODE:da,TITLE_MODE:ma,UNDERSCORE_TITLE_MODE:pa,METHOD_GUARD:ba,END_SAME_AS_BEGIN:ga});function fa(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function ha(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function va(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=fa,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function xa(t,e){Array.isArray(t.illegal)&&(t.illegal=ue(...t.illegal))}function ya(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function wa(t,e){t.relevance===void 0&&(t.relevance=1)}const Sa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=xt(n.beforeMatch,Fe(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Ca=["of","and","for","in","not","or","if","then","parent","list","value"],ka="keyword";function Xe(t,e,n=ka){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(s){Object.assign(o,Xe(t[s],e,s))}),o;function a(s,i){e&&(i=i.map(r=>r.toLowerCase())),i.forEach(function(r){const l=r.split("|");o[l[0]]=[s,Ea(l[0],l[1])]})}}function Ea(t,e){return e?Number(e):Aa(t)?0:1}function Aa(t){return Ca.includes(t.toLowerCase())}const Me={},ht=t=>{console.error(t)},Ie=(t,...e)=>{console.log(`WARN: ${t}`,...e)},yt=(t,e)=>{Me[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Me[`${t}/${e}`]=!0)},Vt=new Error;function Ze(t,e,{key:n}){let o=0;const a=t[n],s={},i={};for(let r=1;r<=e.length;r++)i[r+o]=a[r],s[r+o]=!0,o+=Ve(e[r-1]);t[n]=i,t[n]._emit=s,t[n]._multi=!0}function Ta(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ht("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Vt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ht("beginScope must be object"),Vt;Ze(t,t.begin,{key:"beginScope"}),t.begin=de(t.begin,{joinWith:""})}}function Da(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ht("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Vt;if(typeof t.endScope!="object"||t.endScope===null)throw ht("endScope must be object"),Vt;Ze(t,t.end,{key:"endScope"}),t.end=de(t.end,{joinWith:""})}}function Ba(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Ma(t){Ba(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Ta(t),Da(t)}function Ia(t){function e(i,r){return new RegExp(Mt(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=Ve(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=e(de(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const c=l.findIndex((d,m)=>m>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new n;return this.rules.slice(r).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(r);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(r)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const r=new o;return i.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&r.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&r.addRule(i.illegal,{type:"illegal"}),r}function s(i,r){const l=i;if(i.isCompiled)return l;[ha,ya,Ma,Sa].forEach(u=>u(i,r)),t.compilerExtensions.forEach(u=>u(i,r)),i.__beforeBegin=null,[va,xa,wa].forEach(u=>u(i,r)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Xe(i.keywords,t.case_insensitive)),l.keywordPatternRe=e(c,!0),r&&(i.begin||(i.begin=/\B|\b/),l.beginRe=e(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=e(l.end)),l.terminatorEnd=Mt(l.end)||"",i.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(l.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Na(u==="self"?i:u)})),i.contains.forEach(function(u){s(u,l)}),i.starts&&s(i.starts,r),l.matcher=a(l),l}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=pt(t.classNameAliases||{}),s(t)}function Ye(t){return t?t.endsWithParent||Ye(t.starts):!1}function Na(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return pt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ye(t)?pt(t,{starts:t.starts?pt(t.starts):null}):Object.isFrozen(t)?pt(t):t}var Oa="11.8.0";class $a extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const oe=Ue,Ne=pt,Oe=Symbol("nomatch"),La=7,Qe=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Wo};function l(g){return r.noHighlightRe.test(g)}function c(g){let y=g.className+" ";y+=g.parentNode?g.parentNode.className:"";const k=r.languageDetectRe.exec(y);if(k){const A=N(k[1]);return A||(Ie(s.replace("{}",k[1])),Ie("Falling back to no-highlight mode for this block.",g)),A?k[1]:"no-highlight"}return y.split(/\s+/).find(A=>l(A)||N(A))}function u(g,y,k){let A="",H="";typeof y=="object"?(A=g,k=y.ignoreIllegals,H=y.language):(yt("10.7.0","highlight(lang, code, ...args) has been deprecated."),yt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),H=g,A=y),k===void 0&&(k=!0);const _={code:A,language:H};z("before:highlight",_);const V=_.result?_.result:d(_.language,_.code,k);return V.code=_.code,z("after:highlight",V),V}function d(g,y,k,A){const H=Object.create(null);function _(O,R){return O.keywords[R]}function V(){if(!W.keywords){st.addText(et);return}let O=0;W.keywordPatternRe.lastIndex=0;let R=W.keywordPatternRe.exec(et),q="";for(;R;){q+=et.substring(O,R.index);const tt=at.case_insensitive?R[0].toLowerCase():R[0],it=_(W,tt);if(it){const[dt,to]=it;if(st.addText(q),q="",H[tt]=(H[tt]||0)+1,H[tt]<=La&&(jt+=to),dt.startsWith("_"))q+=R[0];else{const eo=at.classNameAliases[dt]||dt;X(R[0],eo)}}else q+=R[0];O=W.keywordPatternRe.lastIndex,R=W.keywordPatternRe.exec(et)}q+=et.substring(O),st.addText(q)}function J(){if(et==="")return;let O=null;if(typeof W.subLanguage=="string"){if(!e[W.subLanguage]){st.addText(et);return}O=d(W.subLanguage,et,!0,Ce[W.subLanguage]),Ce[W.subLanguage]=O._top}else O=b(et,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(jt+=O.relevance),st.__addSublanguage(O._emitter,O.language)}function I(){W.subLanguage!=null?J():V(),et=""}function X(O,R){O!==""&&(st.startScope(R),st.addText(O),st.endScope())}function nt(O,R){let q=1;const tt=R.length-1;for(;q<=tt;){if(!O._emit[q]){q++;continue}const it=at.classNameAliases[O[q]]||O[q],dt=R[q];it?X(dt,it):(et=dt,V(),et=""),q++}}function Z(O,R){return O.scope&&typeof O.scope=="string"&&st.openNode(at.classNameAliases[O.scope]||O.scope),O.beginScope&&(O.beginScope._wrap?(X(et,at.classNameAliases[O.beginScope._wrap]||O.beginScope._wrap),et=""):O.beginScope._multi&&(nt(O.beginScope,R),et="")),W=Object.create(O,{parent:{value:W}}),W}function Y(O,R,q){let tt=Zo(O.endRe,q);if(tt){if(O["on:end"]){const it=new Te(O);O["on:end"](R,it),it.isMatchIgnored&&(tt=!1)}if(tt){for(;O.endsParent&&O.parent;)O=O.parent;return O}}if(O.endsWithParent)return Y(O.parent,R,q)}function rt(O){return W.matcher.regexIndex===0?(et+=O[0],1):(te=!0,0)}function ct(O){const R=O[0],q=O.rule,tt=new Te(q),it=[q.__beforeBegin,q["on:begin"]];for(const dt of it)if(dt&&(dt(O,tt),tt.isMatchIgnored))return rt(R);return q.skip?et+=R:(q.excludeBegin&&(et+=R),I(),!q.returnBegin&&!q.excludeBegin&&(et=R)),Z(q,O),q.returnBegin?0:R.length}function lt(O){const R=O[0],q=y.substring(O.index),tt=Y(W,O,q);if(!tt)return Oe;const it=W;W.endScope&&W.endScope._wrap?(I(),X(R,W.endScope._wrap)):W.endScope&&W.endScope._multi?(I(),nt(W.endScope,O)):it.skip?et+=R:(it.returnEnd||it.excludeEnd||(et+=R),I(),it.excludeEnd&&(et=R));do W.scope&&st.closeNode(),!W.skip&&!W.subLanguage&&(jt+=W.relevance),W=W.parent;while(W!==tt.parent);return tt.starts&&Z(tt.starts,O),it.returnEnd?0:R.length}function At(){const O=[];for(let R=W;R!==at;R=R.parent)R.scope&&O.unshift(R.scope);O.forEach(R=>st.openNode(R))}let ut={};function Q(O,R){const q=R&&R[0];if(et+=O,q==null)return I(),0;if(ut.type==="begin"&&R.type==="end"&&ut.index===R.index&&q===""){if(et+=y.slice(R.index,R.index+1),!a){const tt=new Error(`0 width match regex (${g})`);throw tt.languageName=g,tt.badRule=ut.rule,tt}return 1}if(ut=R,R.type==="begin")return ct(R);if(R.type==="illegal"&&!k){const tt=new Error('Illegal lexeme "'+q+'" for mode "'+(W.scope||"<unnamed>")+'"');throw tt.mode=W,tt}else if(R.type==="end"){const tt=lt(R);if(tt!==Oe)return tt}if(R.type==="illegal"&&q==="")return 1;if(Qt>1e5&&Qt>R.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=q,q.length}const at=N(g);if(!at)throw ht(s.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Rt=Ia(at);let Yt="",W=A||Rt;const Ce={},st=new r.__emitter(r);At();let et="",jt=0,gt=0,Qt=0,te=!1;try{if(at.__emitTokens)at.__emitTokens(y,st);else{for(W.matcher.considerAll();;){Qt++,te?te=!1:W.matcher.considerAll(),W.matcher.lastIndex=gt;const O=W.matcher.exec(y);if(!O)break;const R=y.substring(gt,O.index),q=Q(R,O);gt=O.index+q}Q(y.substring(gt))}return st.finalize(),Yt=st.toHTML(),{language:g,value:Yt,relevance:jt,illegal:!1,_emitter:st,_top:W}}catch(O){if(O.message&&O.message.includes("Illegal"))return{language:g,value:oe(y),illegal:!0,relevance:0,_illegalBy:{message:O.message,index:gt,context:y.slice(gt-100,gt+100),mode:O.mode,resultSoFar:Yt},_emitter:st};if(a)return{language:g,value:oe(y),illegal:!1,relevance:0,errorRaised:O,_emitter:st,_top:W};throw O}}function m(g){const y={value:oe(g),illegal:!1,relevance:0,_top:i,_emitter:new r.__emitter(r)};return y._emitter.addText(g),y}function b(g,y){y=y||r.languages||Object.keys(e);const k=m(g),A=y.filter(N).filter(L).map(I=>d(I,g,!1));A.unshift(k);const H=A.sort((I,X)=>{if(I.relevance!==X.relevance)return X.relevance-I.relevance;if(I.language&&X.language){if(N(I.language).supersetOf===X.language)return 1;if(N(X.language).supersetOf===I.language)return-1}return 0}),[_,V]=H,J=_;return J.secondBest=V,J}function p(g,y,k){const A=y&&n[y]||k;g.classList.add("hljs"),g.classList.add(`language-${A}`)}function f(g){let y=null;const k=c(g);if(l(k))return;if(z("before:highlightElement",{el:g,language:k}),g.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),r.throwUnescapedHTML))throw new $a("One of your code blocks includes unescaped HTML.",g.innerHTML);y=g;const A=y.textContent,H=k?u(A,{language:k,ignoreIllegals:!0}):b(A);g.innerHTML=H.value,p(g,k,H.language),g.result={language:H.language,re:H.relevance,relevance:H.relevance},H.secondBest&&(g.secondBest={language:H.secondBest.language,relevance:H.secondBest.relevance}),z("after:highlightElement",{el:g,result:H,text:A})}function v(g){r=Ne(r,g)}const x=()=>{w(),yt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function h(){w(),yt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function w(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function E(){S&&w()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",E,!1);function T(g,y){let k=null;try{k=y(t)}catch(A){if(ht("Language definition for '{}' could not be registered.".replace("{}",g)),a)ht(A);else throw A;k=i}k.name||(k.name=g),e[g]=k,k.rawDefinition=y.bind(null,t),k.aliases&&$(k.aliases,{languageName:g})}function D(g){delete e[g];for(const y of Object.keys(n))n[y]===g&&delete n[y]}function M(){return Object.keys(e)}function N(g){return g=(g||"").toLowerCase(),e[g]||e[n[g]]}function $(g,{languageName:y}){typeof g=="string"&&(g=[g]),g.forEach(k=>{n[k.toLowerCase()]=y})}function L(g){const y=N(g);return y&&!y.disableAutodetect}function j(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=y=>{g["before:highlightBlock"](Object.assign({block:y.el},y))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=y=>{g["after:highlightBlock"](Object.assign({block:y.el},y))})}function G(g){j(g),o.push(g)}function F(g){const y=o.indexOf(g);y!==-1&&o.splice(y,1)}function z(g,y){const k=g;o.forEach(function(A){A[k]&&A[k](y)})}function C(g){return yt("10.7.0","highlightBlock will be removed entirely in v12.0"),yt("10.7.0","Please use highlightElement now."),f(g)}Object.assign(t,{highlight:u,highlightAuto:b,highlightAll:w,highlightElement:f,highlightBlock:C,configure:v,initHighlighting:x,initHighlightingOnLoad:h,registerLanguage:T,unregisterLanguage:D,listLanguages:M,getLanguage:N,registerAliases:$,autoDetection:L,inherit:Ne,addPlugin:G,removePlugin:F}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=Oa,t.regex={concat:xt,lookahead:Fe,either:ue,optional:qo,anyNumberOfTimes:Ko};for(const g in Ut)typeof Ut[g]=="object"&&He(Ut[g]);return Object.assign(t,Ut),t},St=Qe({});St.newInstance=()=>Qe({});var Pa=St;St.HighlightJS=St;St.default=St;const Bt=Uo(Pa),$e="[A-Za-z$_][0-9A-Za-z$_]*",za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],_a=["true","false","null","undefined","NaN","Infinity"],tn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],en=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ra=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ja=[].concat(nn,tn,en);function on(t){const e=t.regex,n=(y,{after:k})=>{const A="</"+y[0].slice(1);return y.input.indexOf(A,k)!==-1},o=$e,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(y,k)=>{const A=y[0].length+y.index,H=y.input[A];if(H==="<"||H===","){k.ignoreMatch();return}H===">"&&(n(y,{after:A})||k.ignoreMatch());let _;const V=y.input.substring(A);if(_=V.match(/^\s*=/)){k.ignoreMatch();return}if((_=V.match(/^\s+extends\s+/))&&_.index===0){k.ignoreMatch();return}}},r={$pattern:$e,keyword:za,literal:_a,built_in:ja,"variable.language":Ra},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},m={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"xml"}},p={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,m]},h={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},S=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,p,f,v,{match:/\$\d+/},d];m.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const w=[].concat(h,m.contains),E=w.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(w)}]),T={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:E},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...tn,...en]}},N={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},$={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[T],illegal:/%/},L={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(y){return e.concat("(?!",y.join("|"),")")}const G={match:e.concat(/\b/,j([...nn,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},T]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[T]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),N,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,p,f,v,h,{match:/\$\d+/},d,M,{className:"attr",begin:o+e.lookahead(":"),relevance:0},g,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[h,t.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},$,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[T,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[T]},G,L,D,z,{match:/\$[(.]/}]}}function Ga(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ha=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return Bt.registerLanguage("javascript",on),Bt.registerLanguage("sh",Ga),function({text:i,language:r="js"}){const l=a({class:`hljs language-${r}`});return l.innerHTML=Bt.highlight(i,{language:r}).value,o({class:n`
          display: inline-block;
        `},l)}};function Ua(t){const{bau:e,css:n}=t,{article:o,h1:a,p:s,code:i,a:r,ul:l,li:c}=e.tags,u=Ha(t);return function(){return o({class:n`
          background-color: var(--background-color);
        `},a("Getting Started"),s("Grab the source code template for Javascript or Typescript"),u({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),s("Install the dependencies with the package manager of your choice:"),u({text:`cd my-bau-project
npm install`}),s("This template project is built with Vite. To start a development server:"),u({text:"npm run dev"}),s("The application starting point is at ",i("src/main.ts")),s("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),u({text:'import button from "@grucloud/bau-ui/button";'}),s("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),u({text:"const Button = button(context);"}),s("Last step is to place the button into the tree of component:"),u({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),s("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),s("Further reading:",l(c(r({href:"components"},"Visit the component gallery")),c(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function pe(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("paper",l,s,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}function an(t,e={}){const{bau:n,css:o,window:a}=t,{nav:s,ul:i,li:r,a:l}=n.tags,{headerSelector:c="h2,h3"}=e,u=n.state("no"),d=(v,x)=>{let h=null;return(...S)=>{a.clearTimeout(h),h=a.setTimeout(()=>v(...S),x)}},m=o`
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
  `,b=({value:v,id:x,children:h=[]})=>{const S=l({class:()=>u.val==x?"active":"",href:`#${x}`});return S.innerHTML=v,r({class:()=>u.val==x?"active":""},S,h.length>0&&i(h.map(b)))},p=v=>v.tagName.charAt(1),f=({contentEl:v})=>{const x=v.querySelectorAll(c);let h=2,S={},w={children:[]},E=w;const T=E;let D=[E];return[...x].forEach(M=>{const N=p(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(S={value:M.innerHTML,id:M.id??M.textContent,children:[]},h==N?(w=S,E.children.push(w)):h<N?(D.push(E),E=w,w.children.push(S),w=S):h>N&&(E=D[N-1],D=D.slice(0,N-1),E.children.push(S),w=S),h=N)}),T};return function(...x){let[{size:h=e.size??"md",variant:S=e.variant??"plain",color:w=e.color??"neutral",contentEl:E,...T}]=K(x);const D=f({contentEl:E}),M=d(()=>{const $=[...E.querySelectorAll(c)].find(L=>{const{top:j,height:G}=L.getBoundingClientRect();if(j+G>60)return!0});$&&(u.val=$==null?void 0:$.id)},100);return s({...T,class:B("tableOfContent",h,S,w,m,e==null?void 0:e.class,T==null?void 0:T.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},D.children&&i(D.children.map(b)))}}const rn=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:s,tr:i,td:r,thead:l,th:c}=e.tags;return function({Item:d,name:m}){return o({class:n`
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
        `},a(l(i(c(m??""),ot.map(b=>c(b)))),s(Ao.map(b=>i(c(b),ot.map((p,f)=>r(d({color:p,variant:b},{index:f}))))))))}},Fa=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:s}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},To.map((i,r)=>s(t,{size:i})({color:"success",variant:"outline"},{size:i,index:r})))}},U=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:s,h1:i,p:r,h2:l,h3:c,pre:u,code:d}=e.tags;Bt.registerLanguage("javascript",on);const m=an(t),b=pe(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),p=rn(t),f=Fa(t),v=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:h})=>{h.innerHTML=Bt.highlight(x,{language:"js"}).value}}));return function(h){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(h.title),r(h.description),h.gridItem&&!h.variantColorTableDisable&&[l("Variant/Color"),b(p({Item:h.gridItem(t)}))],h.gridItem&&!h.variantSizeDisable&&[l("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b(f({item:h.gridItem}))],l("Usage"),c("Import"),v({text:h.importStatement}),l("Examples"),h.examples.map(w=>s(c(w.title),r(w.description),b(w.createComponent(t)({})),v({text:w.code}))));return o({class:n`
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
        `},S,m({contentEl:S}))}};function be(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?r(c):l(c))};function r(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",Header:p,Content:f,expanded:v=!1,...x}]=K(u);const h=n.state(!v);return a({...x,class:B("collapsible",d,s,e==null?void 0:e.class,x==null?void 0:x.class)},a({class:()=>B("header",f?h.val?"close":"open":""),onclick:S=>{h.val=!h.val,S.stopPropagation()}},p()),a({class:"content",role:"region",bauMounted:({element:S})=>{h.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(i({element:S,closeState:h}),!h.val)},f&&f()))}}const Va=()=>ot.map(t=>`
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
`);function Kt(t,e={}){const{bau:n,css:o}=t,{div:a,ul:s,li:i,h3:r,button:l}=n.tags,c=o`
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
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"plain",color:p=e.color??"neutral",data:f=[],...v}]=K(d);const x=n.state(""),h=be(t,{size:m,variant:b,color:p}),S=E=>T=>{x.val==E?x.val="":x.val=E},w=E=>{const{Header:T,Content:D,name:M}=E,N=()=>r({class:()=>B(x.val==M&&"active")},l({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:L})=>x.val==M},T(E))),$=()=>a({id:`bau-${M}`,"data-state":({element:L})=>x.val==M},D(E));return i({class:B(p,b,m),onclick:S(M)},h({Header:N,Content:$}))};return a({class:B("accordion",c,e==null?void 0:e.class,v.class)},s(f.map(w)))}}const sn=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Kt(t,e);return r=>i({...r,data:s})},Ja=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Kt(t,{color:"neutral",variant:"outline"});return()=>a(i({data:s}))},Wa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Wa,createComponent:Ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:qa,createComponent:Ka},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:Xa}],gridItem:sn},Qa=t=>{const e=U(t);return()=>e(Ya)},tr={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},er=()=>ot.map(t=>`
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
`);function kt(t,e={}){const{bau:n,css:o}=t,{div:a,i:s}=n.tags,i=o`
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
  `,r=P(t),l=({onclick:c})=>r({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",onRemove:p,...f},...v]=K(u);return a({...f,class:B("alert",`alert-${m}`,e.class,m,b,d,i,f.class),role:"alert"},s({class:"icon"},tr[b]),a({class:"content"},...v),p&&l({onclick:p}))}}const ln=(t,e)=>{const n=kt(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},nr=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=kt(t,{color:"danger"});return()=>a(n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},or=`import alert from "@grucloud/bau-ui/alert";
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
`,sr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:or,createComponent:nr},{title:"Custom Alert ",description:"A custom alert.",code:rr,createComponent:ar}],gridItem:ln},ir=t=>{const e=U(t);return()=>e(sr)},cr=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:s=10,deleteAfterDuration:i=15e3}=e,{div:r}=n.tags,l=n.state([]),c={inserting:a`
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
    `},d=({id:m,status:b})=>{const p=l.val.findIndex(f=>f.id===m);p!=-1&&(l.val[p].status=b)};return function(b={},...p){const f=({id:h})=>{d({id:h,status:"removing"});const S=l.val.findIndex(w=>w.id===h);S!=-1&&l.val.splice(S,1)},v=({Component:h})=>{const S={id:Math.random().toString(10).split(".")[1],Component:h,status:"inserting"};l.val.length>=s&&f({id:l.val[0].id}),l.val.push(S),setTimeout(()=>f(S),i)},x=h=>r({class:u.item,onclick:()=>f(h)},h.Component());return document.addEventListener("alert.add",h=>v(h.detail)),document.addEventListener("alert.remove",h=>f(h.detail)),r({class:B(u.stack,e==null?void 0:e.class,b.class)},n.loop(l,r(),x))}},lr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=cr(t,{deleteAfterDuration:2e4}),s=P(t),i=kt(t);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},ur=`import { Context } from "@grucloud/bau-ui/context";
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
`,dr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ur,createComponent:lr}]},mr=t=>{const e=U(t);return()=>e(dr)},pr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,s=Jt(t),i=P(t),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=e.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),s({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},br=`import animate from "@grucloud/bau-ui/animate";
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
`,gr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:s,label:i}=e.tags,r=Jt(t),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=e.state("one"),u=({target:m})=>c.val=m.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",s({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",s({type:"radio",id:"two",name:"radio",value:c,oninput:u})),r({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},fr=`import animate from "@grucloud/bau-ui/animate";
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
`,hr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:br,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:fr,createComponent:gr}]},vr=t=>{const e=U(t);return()=>e(hr)};function Ct(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",...b},...p]=K(c);return s({...b,class:B("skeleton",u,r,e==null?void 0:e.class,b==null?void 0:b.class)},...p)}}function ge(t,e={}){const{bau:n,css:o}=t,{div:a,img:s}=n.tags,i=n.state(!0),r=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,r.val=!0},u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:f=e.color??"neutral",width:v=40,height:x=40,alt:h,...S},...w]=K(m);const E=Ct(t,{class:B(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${v}px;
        `,e==null?void 0:e.class,S.class)});return a({class:B(u,e==null?void 0:e.class,S.class)},()=>i.val&&E(),()=>r.val&&h,s({alt:h,width:v,height:x,onload:l,onerror:c,class:()=>B(!i.val&&"visible",r.val&&"hide",f,p,b,u,e==null?void 0:e.class,S.class),...S}))}}const un=(t,e)=>{const{css:n}=t,o=ge(t,{...e,class:n`
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
`,wr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=ge(t,{class:n`
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
`,Cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:yr,createComponent:xr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:Sr,createComponent:wr}],gridItem:un},kr=t=>{const e=U(t);return()=>e(Cr)};function Ot(t,e){const{bau:n,css:o,window:a}=t,{dialog:s}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...l){let[{contentEl:c,triggerEl:u,onClose:d,...m},...b]=K(l);const p=x=>{v.style.opacity=1,v.showModal();const h=u.getBoundingClientRect(),S=v.getBoundingClientRect();h.x<a.innerWidth/2?v.style.left=h.left+"px":v.style.left=h.right-S.width+"px",h.y<a.innerHeight/2?(v.style.top=h.top+h.height+"px",v.style.height=Math.min(v.scrollHeight,a.innerHeight-h.top-h.height)+"px"):(v.style.top=Math.max(0,h.top-S.height)+"px",v.scrollHeight>h.top&&(v.style.height=h.top+"px"))},f=x=>{const h=()=>{v.close(),v.removeEventListener("transitionend",h)};v.addEventListener("transitionend",h),v.style.opacity=0},v=s({role:"presentation",class:B("popover",i,e==null?void 0:e.class,m==null?void 0:m.class),onclick:x=>{x.target===v&&(f(),d==null||d.call())}},c);return v.closeDialog=f,v.openDialog=p,v}}const Ft={sm:12,md:16,lg:24},Er=()=>ot.map(t=>`
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
`);function bt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:s,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:m=e.variant??"outline",visibility:b=!0,...p}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Ft[u]};
      height: ${Ft[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${Er()}
    `;return s({class:{deps:[b],renderProp:()=>v=>B("spinner",f,d,m,v==!1?"":"visibility",e==null?void 0:e.class,p.class)},version:"1.1",x:"0px",y:"0px",width:Ft[u],height:Ft[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...p},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Ar=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function qt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=o`
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

    ${Ar()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:m,placeholder:b,Option:p,options:f,defaultOption:v,getOptionLabel:x,getOptionValue:h,onSelect:S=()=>{},id:w,required:E,name:T,loading:D,...M},...N]=K(l);const $=Ot(t),L=P(t),j=mt(t,{variant:u,color:d,size:c}),G=vt(t),F=bt(t,{variant:u,color:d,size:c}),z=n.state(v),C=n.state(M.value),g=n.state(!1),y=n.state(0),k=()=>{g.val=!1},A=n.state(f),H=Q=>at=>Q.val&&x(at)==x(Q.val),_=()=>{ut.openDialog(),g.val=!0,C.val="",A.val=f,y.val=f.findIndex(H(z));const Q=At.querySelector("li.selected");Q&&(Q.scrollIntoView({block:"center"}),ct.scrollIntoView({block:"end"}))},V=()=>{ut.closeDialog(),g.val=!1,y.val=0},J=Q=>{const{value:at}=Q.target;C.val=at,at?A.val=f.filter(Rt=>x(Rt).match(new RegExp(`${at}`,"i"))):A.val=f},I=Q=>{ut.open?V():_()},X=Q=>{z.val=Q,lt.value=h(Q)},nt=({option:Q,index:at})=>Rt=>{X(Q),y.val=at,V()},Z=()=>{const Q=At.querySelector("li.active");Q&&Q.scrollIntoView({block:"center",behavior:"smooth"})},Y=Q=>{switch(Q.key){case"Escape":V();break;case"ArrowDown":y.val<A.val.length-1?y.val++:y.val=0,Z();break;case"ArrowUp":y.val<=0?y.val=A.val.length-1:y.val--,Z();break;case"Enter":ut.open?(X(A.val[y.val]),V()):_(),Q.preventDefault();break}},rt=L({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":m,onclick:I,variant:u,color:d,size:c,class:D==!0&&"loading",disabled:D},()=>z.val?x(z.val):m,()=>D==!0&&F({visibility:D})),ct=j({value:C,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:J,onkeydown:Y,...M}),lt=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:v&&h(v),required:E,name:T}),At=a({class:B(u,d,c,"content")},ct,()=>G({class:B(u,d,c)},A.val.map((Q,at)=>s({class:()=>B(y.val==at&&"active",H(z)(Q)&&"selected"),onclick:nt({option:Q,index:at})},p(Q))))),ut=$({id:w,triggerEl:rt,contentEl:At,onClose:k,class:o`
        overflow: hidden;
      `});return a({...M,class:B("autocomplete",i,e==null?void 0:e.class,M==null?void 0:M.class)},n.bind({deps:[z],render:()=>Q=>{Q&&(lt.value=h(Q),S(Q))}}),rt,lt,ut)}}const dn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=qt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return c=>i({...c,options:r,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Tr=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:s,article:i,footer:r}=e.tags,l=qt(t),c=P(t,{variant:"outline",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],d=b=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(b.label),a(b.code)),m=b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(p))};return()=>s({onsubmit:m},i(l({options:u,Option:d,getOptionValue:({code:b})=>b,getOptionLabel:({label:b})=>b,label:"Country",placeholder:"Search countries",name:"country"})),r(c({type:"submit"},"Submit")))},Dr=`import autocomplete from "@grucloud/bau-ui/autocomplete";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Br=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,l=qt(t),c=P(t,{variant:"outline",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],m=p=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(p.label),r(p.code)),b=p=>{p.preventDefault();const f=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(f))};return()=>o({onsubmit:b},a(l({options:d,Option:m,defaultOption:d.find(({code:p})=>p==u),getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",name:"country"})),s(c({type:"submit"},"Submit")))},Mr=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Ir=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,l=P(t,{variant:"outline"}),c=P(t,{variant:"solid",color:"primary"}),u=qt(t),d=e.state([]),m=e.state(!1),b=e.state("");async function p({url:h,transform:S=w=>w}){try{m.val=!0;const w=await fetch(h,{});if(w.ok){const E=await w.json();d.val=S(E)}else b.val=w.statusText}catch(w){b.val=w.message}finally{m.val=!1}}const f=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:h=>h.sort((S,w)=>S.name.common.localeCompare(w.name.common))});f();const v=h=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(h.flag),r(h.name.common)),x=h=>{h.preventDefault();const S=Object.fromEntries(new FormData(h.target.closest("form")));alert(JSON.stringify(S))};return()=>o({onsubmit:x},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({options:d.val,Option:v,getOptionValue:({name:h})=>h.common,getOptionLabel:({name:h})=>h.common,label:"Country",placeholder:"Search countries",name:"country",loading:m.val}),l({onclick:f},"Reload")),s(c({type:"submit"},"Submit")))},Nr=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Or={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Dr,createComponent:Tr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Nr,createComponent:Ir},{title:"Default Option",description:"A autocomplete with a default option.",code:Mr,createComponent:Br}],gridItem:dn},$r=t=>{const e=U(t);return()=>e(Or)};function mn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},...b]=K(r);return a({...m,class:B("badge",s,e==null?void 0:e.class,m==null?void 0:m.class)},a({class:B(u,c,l)},d),...b)}}const pn=(t,e)=>{const n=mn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Lr=t=>{const{bau:e}=t,{section:n}=e.tags,o=mn(t);return()=>n(o({content:"10"},"☏"))},Pr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,zr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Pr,createComponent:Lr}],gridItem:pn},_r=t=>{const e=U(t);return()=>e(zr)};function fe(t,e={}){const{bau:n,css:o,config:a}=t,{ul:s,li:i,span:r}=n.tags,{separator:l="〉"}=e,c=P(t),u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:f=e.color??"neutral",items:v,...x},...h]=K(m);return s({...x,class:B(u,e==null?void 0:e.class,x==null?void 0:x.class)},v.map(({href:S,name:w})=>i((S!=null?c:r)({href:`${a.base}${S}`,color:f,variant:p,size:b,class:B(f,p,b)},w))))}}const bn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=fe(t,e);return a=>o({...a,...n})},Rr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=fe(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},jr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ur={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:jr,createComponent:Rr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Hr,createComponent:Gr}],gridItem:bn},Fr=t=>{const e=U(t);return()=>e(Ur)},gn=(t,e={})=>{const n=P(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Vr=t=>{const{bau:e}=t,{section:n}=e.tags,o=P(t,{color:"primary",variant:"outline"}),a=()=>{alert("Click")};return()=>n(o({onclick:a},"Click me"))},Jr=`import button from "@grucloud/bau-ui/button";
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
`,Wr=t=>{const{bau:e}=t,{section:n}=e.tags,o=P(t,{color:"primary",variant:"outline"}),a=()=>{alert("Click")};return()=>n(o({disabled:!0,onclick:a},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
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
`,qr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Jr,createComponent:Vr},{title:"Disabled Button",description:"A disabled button.",code:Kr,createComponent:Wr}],gridItem:gn},Xr=t=>{const e=U(t);return()=>e(qr)},Zr=()=>ot.map(t=>`
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
`);function he(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("button-group",c,u,l,s,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}const fn=(t,e)=>{const n=["ONE","TWO","THREE"],o=P(t,e),a=he(t,e);return s=>a({...s},n.map(i=>o(s,i)))},Yr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a="primary",s="solid",i=P(t,{color:a,variant:s}),r=he(t,{color:a,variant:s}),l=c=>u=>{alert(c)};return()=>n(r(o.map(c=>i({onclick:l(c)},c))))},Qr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
    ${(()=>ot.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},...b]=K(l);return a({...m,type:"date",class:B("calendar",i,d,u,c,e==null?void 0:e.class,m==null?void 0:m.class)},...b)}}const vn=(t,e)=>{const n=hn(t,e);return o=>n({...o})},ns=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),s=hn(t);return()=>n(o("Start date:",s({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},os=`import calendar from "@grucloud/bau-ui/calendar";
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
`,as={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:os,createComponent:ns}],gridItem:vn},rs=t=>{const e=U(t);return()=>e(as)};function ss(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:m,Slide:b,Previous:p,Next:f,...v}]=K(l);const x=()=>{i.val<=0?i.val=m.length-1:i.val--},h=()=>{i.val>=m.length-1?i.val=0:i.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},m.map(b));return a({...v,class:B("carousel",c,s,e==null?void 0:e.class,v==null?void 0:v.class)},a({class:B("control","control-previous"),onclick:x},p()),a({class:B("control","control-next"),onclick:h},f()),S)}}const is=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],cs=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,s=P(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),r=ss(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),l=()=>s("◀"),c=()=>s("▶");return()=>o(r({slides:is,Slide:i,Previous:l,Next:c}))},ls=`import carousel from "@grucloud/bau-ui/carousel";
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
`,us={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ls,createComponent:cs}]},ds=t=>{const e=U(t);return()=>e(us)},xn=(t,e)=>{const n=Nt(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ms=t=>{const{bau:e}=t,{section:n}=e.tags,o=Nt(t,{variant:"outline",color:"primary"});return()=>n(o("My Chip"))},ps=`import chip from "@grucloud/bau-ui/chip";
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
`,bs={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ps,createComponent:ms}],gridItem:xn},gs=t=>{const e=U(t);return()=>e(bs)};function Et(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({type:"checkbox",...d,class:B(s,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)})}}const yn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,s=Et(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,s({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},fs=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,label:i}=e.tags,r=Et(t,{color:"neutral",variant:"outline"}),l=P(t,{variant:"outline",color:"primary"}),c=e.state(!1),u=m=>{c.val=!!m.target.checked},d=m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.target.closest("form")));alert(JSON.stringify(b))};return()=>o({onsubmit:d},a(i({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",r({name:"myCheckbox",checked:c,onchange:u}))),s(l({type:"submit"},"Submit")))},hs=`import { Context } from "@grucloud/bau-ui/context";
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
`,vs=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:s,form:i}=e.tags,r=Et(t,{color:"neutral",variant:"outline"}),l=P(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.target.closest("form")));alert(JSON.stringify(d))};return()=>i({onsubmit:c,class:n`
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
        `},s(o("My Checkbox",r({name:"my-checkbox-uncontrolled"}))),a(l({type:"submit"},"Submit")))},xs=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,ys=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:s,form:i}=e.tags,r=Et(t,{color:"neutral",variant:"outline"}),l=P(t,{variant:"outline",color:"primary"}),c=P(t,{variant:"solid",color:"primary"}),u=m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.target.closest("form")));alert(JSON.stringify(b))},d=m=>{const b=window.document.getElementById("my-checkbox");b&&(b.indeterminate=!b.indeterminate)};return()=>i({onsubmit:u,class:n`
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
        `},s(o("My Checkbox",r({id:"my-checkbox",name:"my-checkbox"})),l({onclick:d},"Toggle Indeterminate")),a(c({type:"submit"},"Submit")))},ws=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Ss={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:hs,createComponent:fs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:xs,createComponent:vs},{title:"Indeterminate checkbox",description:"An indeterminate checkbox.",code:ws,createComponent:ys}],gridItem:yn},Cs=t=>{const e=U(t);return()=>e(Ss)},ks=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=be(t),s=P(t,{variant:"outline"}),i=()=>s("Header"),r=()=>o("Content");return()=>n(a({Header:i,Content:r}))},Es=`import button from "@grucloud/bau-ui/button";
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
`,As={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Es,createComponent:ks}]},Ts=t=>{const e=U(t);return()=>e(As)};function Ds(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("divider",l,s,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:"content"},...m))}}const Bs=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ds(t);return()=>n(o("OR"))},Ms=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Is={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ms,createComponent:Bs}],variantColorTableDisable:!0,variantSizeDisable:!0},Ns=t=>{const e=U(t);return()=>e(Is)};function Os(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:l,variant:c="outline",size:u,openState:d,...m},...b]=K(r);return a({class:B(s,e==null?void 0:e.class,m.class)},a({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>B("content",d.val&&"content-open")},b))}}const $s=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),s=Os(t),i=P(t,{color:"neutral",variant:"outline"}),r=Ge(t);return()=>n(o("Click on the button to open and close the drawer."),i({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},r()))},Ls=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ps={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ls,createComponent:$s}]},zs=t=>{const e=U(t);return()=>e(Ps)},_s=()=>ot.map(t=>`
`).join(`
`);function wn(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=P(t),r=Ot(t),l=vt(t),c=o`
    ${_s()}
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"outline",color:p=e.color??"neutral",label:f,ListItem:v,items:x,...h},...S]=K(d);const w=n.state(0),E=()=>{G.openDialog(),G.focus()},T=()=>{G.closeDialog()},D=()=>{G.open?T():E()},M=F=>{D(),F.preventDefault()},N=({item:F,index:z})=>C=>{w.val=z,T(),C.preventDefault()},$=F=>{switch(F.preventDefault(),F.key){case"Escape":T();break;case"ArrowDown":w.val<options.length-1?w.val++:w.val=0;break;case"ArrowUp":w.val<=0?w.val=options.length-1:w.val--;break;case"Enter":D();break}},L=()=>l({tabindex:"0",class:B(p,b)},x.map((F,z)=>s({class:()=>B(w.val==z&&"active"),onclick:N({item:F,index:z})},v(F)))),j=i({type:"button",onclick:M,color:p,variant:b,size:m},f),G=r({triggerEl:j,contentEl:L()});return a({...h,class:B("dropdownMenu",p,m,c,e==null?void 0:e.class,h==null?void 0:h.class),onkeydown:$},j,G)}}const Rs=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,s=wn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=l=>o(a(l.label));return l=>s({...l,items:i,ListItem:r,label:"Action"})},js=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,s=wn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(s({items:i,ListItem:r,label:"Action"}))},Gs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Js={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Vs,createComponent:Fs}],gridItem:(t,e)=>Sn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},Ws=t=>{const e=U(t);return()=>e(Js)};function Cn(t,e={}){const{bau:n,css:o}=t,{div:a,label:s,input:i}=n.tags,r={base:o`
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
    `};return function(c,...u){const{size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",Component:p,disabled:f,...v}=c;return a({class:B(r.base,f&&r.disabled,e==null?void 0:e.class,c.class)},s({class:B(m,b,d)},p({disabled:f}),i({type:"file",disabled:f,...v})))}}const kn=(t,e)=>{const{tr:n,bau:o,css:a,config:s}=t,{svg:i,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=Cn(t,e),m=p=>{const f=p.target.files[0];f?u.val=f.name:u.val="No file selected"},b=({disabled:p})=>l({class:B(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,p&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${s.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return p=>d({Component:b,name:"file",accept:"text/*",onchange:m,...p})},Ks=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:l,span:c}=n.tags,u=n.state("No file selected"),d=Cn(t),m=p=>{const f=p.target.files[0];f?u.val=f.name:u.val="No file selected"},b=({disabled:p})=>l({class:B(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,p&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return()=>r(d({Component:b,name:"file",accept:"text/*",onchange:m}),l("File selected: ",u))},qs=`import classNames from "@grucloud/bau-css/classNames";
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
`,Xs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:qs,createComponent:Ks}],gridItem:kn},Zs=t=>{const e=U(t);return()=>e(Xs)};function $t(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},...b]=K(r);return a({...m,class:B("form",u,c,l,s,e==null?void 0:e.class,m==null?void 0:m.class)},...b)}}function ve(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:s}=n.tags,i=a`
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
        animation: ${i} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",loading:b,...p},...f]=K(c);const v=P(t),x=bt(t);return n.bind({deps:[b],render:()=>h=>v({...p,class:B("loadingButton",u,d,m,r,h&&"loading",e==null?void 0:e.class,p==null?void 0:p.class)},x({size:u,variant:d,color:m,visibility:h}),s({class:h&&"loading"},f))})}}const Ys=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:s,header:i,label:r,img:l,footer:c}=e.tags,u=ve(t,{variant:"solid",color:"primary"}),d=kt(t,{variant:"outline",color:"danger"}),m=mt(t),b=$t(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:f=()=>{}}){const v=e.state(!1),x=e.state("");return b({onsubmit:async S=>{S.preventDefault();const{username:w,password:E}=Object.fromEntries(new FormData(S.target.closest("form")));try{v.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:w,password:E})});if(T.ok){const D=await T.json();f(D)}else T.status==401?x.val="Invalid username or password":x.val=T.statusText}catch(T){x.val=T.message}finally{v.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),s("Login to Grucloud")),a(()=>x.val&&d(x.val),r("Email",m({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",m({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",loading:v},"Login")))}},Qs=`import form from "@grucloud/bau-ui/form";
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
`,ti=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i}=e.tags,r=$t(t),l=P(t,{variant:"solid",color:"primary"}),c=mt(t);return function({onSubmitted:d=()=>{}}){return r({onsubmit:async b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(p)),d(p)}},a(o("Form with input")),n(s("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},ei=`import form from "@grucloud/bau-ui/form";
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
`,ni=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i,em:r,span:l}=e.tags,c=e.state(""),u=e.derive(()=>c.val!=="Delete"),d=$t(t),m=P(t,{variant:"solid",color:"danger"}),b=mt(t);return function({onSubmitted:f=()=>{}}){return d({onsubmit:async x=>{x.preventDefault(),f()}},a(o("Delete Protection")),n(s(l("Type ",r("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:x=>c.val=x.target.value}))),i(m({type:"submit",disabled:u},"Delete")))}},oi=`import { Context } from "@grucloud/bau-ui/context";
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
`,ai={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:ei,createComponent:ti},{title:"Form with state",description:"A form with input state and a dervied state.",code:oi,createComponent:ni},{title:"Login page",description:"A login page.",code:Qs,createComponent:Ys}]},ri=t=>{const e=U(t);return()=>e(ai)},En=(t,e={})=>{const n=mt(t,e);return o=>n({name:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,placeholder:"Enter text",...o})},si=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=mt(t);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ii=`import input from "@grucloud/bau-ui/input";
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
`,ci={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ii,createComponent:si}],gridItem:En},li=t=>{const e=U(t);return()=>e(ci)},An=(t,e={})=>{const n=ce(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},ui=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=ce(t);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},di=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,mi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:di,createComponent:ui}],gridItem:An},pi=t=>{const e=U(t);return()=>e(mi)};function Tn(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("keyValueList",s,e==null?void 0:e.class,d==null?void 0:d.class)},...m)}}const bi=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:s}=e.tags,i=Tn(t);return()=>n(i(o(a("My label"),s("My Value")),o(a("My other label"),s("My Other Value"))))},gi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,fi=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:s,span:i}=e.tags,r=Tn(t,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(r(a(s("My label"),i("My Value")),a(s("My other label"),i("My Other Value"))))},hi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,vi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:gi,createComponent:bi},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:hi,createComponent:fi}]},xi=t=>{const e=U(t);return()=>e(vi)},yi="modulepreload",wi=function(t){return"/bau/bau-ui/"+t},Le={},Dn=function(e,n,o){if(!n||n.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=wi(s),s in Le)return;Le[s]=!0;const i=s.endsWith(".css"),r=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===s&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${r}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":yi,i||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())};function Bn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=bt(t,{size:"lg"}),i=kt(t,{color:"danger"}),r=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},s({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=r,error:m=l,props:b={}}){const p=n.state(void 0),f=n.state(!0),v=n.state(!1);return u().then(x=>{n.batch(()=>{p.val=x.default(t),f.val=!1})}).catch(x=>{v.val=x.message}),a(()=>{if(v.val)return m({message:v.val});if(f.val)return d();if(p.val)return p.val(b)})}}const Si=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state(!1),a=Bn(t),s=P(t);return()=>n(s({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},Ci=`import { Context } from "@grucloud/bau-ui/context";
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
`,ki=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),s=Bn(t,{loading:()=>o("My Custom Loading"),error:r=>o("My Custom Error")}),i=P(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&s({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Ei=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ai={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:Ci,createComponent:Si},{title:"Custom Loader",description:"Custom loader and error",code:Ei,createComponent:ki}]},Ti=t=>{const e=U(t);return()=>e(Ai)};function Mn(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=()=>ot.map(c=>`
&.${c}{
  background-color: var(--color-${c});
}
  `).join(`
`),r=a`
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

    ${i()}
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",running:p,...f}]=K(u);return s({...f,role:"progressbar",class:{deps:[p],renderProp:()=>v=>B("linearProgress",d,b,l,v&&"running",e==null?void 0:e.class,f==null?void 0:f.class)}})}}const In=(t,e)=>{const n=Mn(t,e);return o=>n({...o,running:!0})},Di=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=P(t,{variant:"solid",color:"primary"}),s=Mn(t),i=e.state(!1);return()=>n(a({onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,s({running:i}))},Bi=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Mi={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Bi,createComponent:Di}],gridItem:In},Ii=t=>{const e=U(t);return()=>e(Mi)},Nn=(t,e)=>{const n=ve(t,e);return o=>n({...o,loading:!0},"Save")},Ni=t=>{const{bau:e}=t,{section:n}=e.tags,o=ve(t,{variant:"solid",color:"primary"}),a=e.state(!0);return()=>n(o({loading:a,onclick:()=>a.val=!a.val},"Save"))},Oi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,$i={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Oi,createComponent:Ni}],gridItem:Nn},Li=t=>{const e=U(t);return()=>e($i)},Pi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],zi=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:s}=n.tags,i=vt(t,e),r=({code:l,label:c})=>s({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},Pi.map(r))},_i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ri=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:s}=e.tags,i=vt(t,{variant:"outline",color:"primary"}),r=({code:l,label:c})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i(_i.map(r)))},ji=`import list from "@grucloud/bau-ui/list";
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
`,Gi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ji,createComponent:Ri}],gridItem:zi},Hi=t=>{const e=U(t);return()=>e(Gi)};function On(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:s,div:i}=n.tags,l=o`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",...p},...f]=K(u);const v=s({...p,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(p.id??"modal")&&v.showModal()},class:B("modal",l,b,m,d,e==null?void 0:e.class,p==null?void 0:p.class)},f);return new MutationObserver(h=>{const S=new URLSearchParams(a.location.search);h[0].attributeName=="open"&&(v.open?S.set("modal",v.id??"modal"):S.delete("modal"),a.history.pushState("","",`?${S.toString()}`))}).observe(v,{attributes:!0}),v}}const $n=(t,e={})=>{const{bau:n,window:o}=t,{document:a}=o,{form:s,section:i,main:r,header:l,footer:c,p:u,h1:d}=n.tags,m=P(t),b=On(t,e),p=()=>r(Array(20).fill("").map((x,h)=>u(h+1,". Some text here"))),f=x=>`dialog-${x.color}-${x.variant}-${e.size}`,v=x=>b({id:f(x),...x},s(l(d("Header")),p(),c(m({variant:"outline",color:x.color,onclick:h=>{h.target.closest("dialog").close()}},"Cancel"),m({variant:"solid",color:x.color,onclick:h=>{h.target.closest("dialog").close()}},"OK"))));return x=>i(m({...x,onclick:()=>{a.getElementById(f(x)).showModal()}},"OPEN MODAL"),v(x))},Ui=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,section:s,main:i,header:r,footer:l,p:c}=e.tags,d=P(t,{color:"neutral"}),m=On(t),b=()=>i(Array(10).fill("").map((p,f)=>c(f+1,". Some text here")));return()=>s(d({variant:"solid",color:"neutral",onclick:()=>{o.getElementById("my-dialog").showModal()}},"OPEN MODAL"),m({id:"my-dialog"},a(r("Header"),b(),l(d({variant:"outline",onclick:p=>{p.target.closest("dialog").close()}},"Cancel"),d({variant:"solid",onclick:p=>{p.target.closest("dialog").close()}},"OK")))))},Fi=`import modal from "@grucloud/bau-ui/modal";
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
`,Vi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Fi,createComponent:Ui}],gridItem:$n},Ji=t=>{const e=U(t);return()=>e(Vi)},Wi=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Ki(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i}=n.tags,r=P(t),l=Ot(t),c=vt(t),u=Et(t,{color:"neutral",variant:"outline"}),d=o`
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
    ${Wi()}
  `;return function(...b){let[{size:p=e.size??"md",variant:f=e.variant??"outline",color:v=e.color??"neutral",name:x,label:h,Option:S,options:w,defaultValue:E=[],getOptionLabel:T,getOptionValue:D,renderValue:M,onSelect:N=()=>{},loading:$,...L},...j]=K(b);const G=bt(t,{variant:f,color:v,size:p}),F=n.state(E),z=n.state(!1),C=n.state(0),g=()=>{X.openDialog(),X.focus(),z.val=!0},y=()=>{X.closeDialog(),z.val=!1},k=()=>{z.val=!1},A=Z=>{X.open?y():g(),Z.preventDefault()},H=()=>Array.from(nt.selectedOptions).map(({value:Z})=>w.find(Y=>D(Y)==Z)),_=Z=>{switch(Z.preventDefault(),Z.key){case"Escape":y();break;case"ArrowDown":C.val<w.length-1?C.val++:C.val=0;break;case"ArrowUp":C.val<=0?C.val=w.length-1:C.val--;break;case"Enter":if(X.open){const Y=Z.currentTarget.querySelectorAll("input")[C.val];Y.checked=!Y.checked;const rt=nt.options[C.val+1];rt.selected=!rt.selected,F.val=H()}else g();break}},V=Z=>Y=>{const rt=[...nt.options].find(({value:ct})=>ct==D(Z));Y.target.checked?rt.selected=!0:rt.selected=!1,F.val=H()},J=()=>c({tabindex:"0",class:B(v,f)},w.map((Z,Y)=>s({class:()=>B(C.val==Y&&"active")},n.tags.label(u({checked:E.find(rt=>D(rt)==D(Z)),name:`${x}-${D(Z)}`,onchange:V(Z)}),S(Z))))),I=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":z,"aria-label":h,onclick:A,color:v,variant:f,size:p,class:$==!0&&"loading",disabled:$},()=>F.val.length?M(F.val):h,()=>$==!0&&G({visibility:$})),X=l({triggerEl:I,contentEl:J(),onClose:k}),nt=i({name:x,multiple:!0,...L},n.tags.option({value:""},"--Category--"),w.map(Z=>n.tags.option({value:D(Z),selected:E.find(Y=>D(Y)==D(Z))},T(Z))));return a({...L,class:B("multiSelect",v,p,d,e==null?void 0:e.class,L==null?void 0:L.class),onkeydown:_},nt,I,X)}}const qi=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:s,footer:i}=e.tags,r=Ki(t),l=P(t,{variant:"outline",color:"neutral"}),c=Nt(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=b=>a(b.group),m=b=>{b.preventDefault();const{selectedOptions:p}=b.target.elements.myMultiSelect;var f=Array.from(p).map(({value:v})=>v);alert(JSON.stringify(f))};return()=>s({onsubmit:m,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                align-items: center;
                gap: 0.2rem;
              `},b.map(p=>c(p.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},Xi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Zi=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:s}=e.tags,i=P(t,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:m})=>m);alert(JSON.stringify(d))};return()=>s({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},Yi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Qi={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Xi,createComponent:qi},{title:"Native Multi Select",description:"A native multi select.",code:Yi,createComponent:Zi}]},tc=t=>{const e=U(t);return()=>e(Qi)},ec=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:s}=e.tags,i=P(t,{variant:"outline",color:"success"}),r=Ot(t),l=()=>i({onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),s("My Content")),u=l(),d=r({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},nc=`import popover from "@grucloud/bau-ui/popover";
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
`,oc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:nc,createComponent:ec}]},ac=t=>{const e=U(t);return()=>e(oc)};function rc(t,e={}){const{bau:n,css:o,config:a}=t,{div:s,a:i,span:r,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:m,label:b,href:p})=>i({href:`${a.base}${p}`},r({class:"sublabel"},d),s({class:`label ${d}`},b??m));return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:f=e.color??"neutral",data:v={},...x}]=K(m);const{next:h,previous:S}=v;return l({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...x,class:B("paginationNavigation",b,c,e==null?void 0:e.class,x==null?void 0:x.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(h==null?void 0:h.href)&&u({text:"Next"})(h))}}const sc=t=>{const{bau:e}=t,{section:n}=e.tags,o=rc(t,{variant:"solid",color:"primary"}),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({data:a}))},ic=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,cc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ic,createComponent:sc}]},lc=t=>{const e=U(t);return()=>e(cc)},uc=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=pe(t,e);return s=>a({...s},o(`Paper ${e.size??""}`))},dc=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=pe(t,{size:"md"});return()=>n(a(o("My content")))},mc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context, { size: "md" });

  return () => section(Paper(div("My content")));
};
`,pc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:mc,createComponent:dc}],variantColorTableDisable:!0,gridItem:uc},bc=t=>{const e=U(t);return()=>e(pc)};function xe(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    cursor: pointer;
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>ot.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
  `).join(`
`))()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m}]=K(l);return a({...m,type:"radio",class:B("radio-button",c,d,u,i,e==null?void 0:e.class,m==null?void 0:m.class)})}}const Ln=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:s}=n.tags,i=xe(t,e);return r=>s({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},gc=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:s}=e.tags,i=xe(t),r=e.state("one"),l=({target:c})=>r.val=c.id;return()=>s({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        `},o("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:l})),o("Two",i({id:"two",name:"radio",value:r,oninput:l})),a("Choice: ",r))},fc=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,hc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:fc,createComponent:gc}],gridItem:Ln},vc=t=>{const e=U(t);return()=>e(hc)};function Xt(t,e={}){const{bau:n,css:o}=t,{div:a,label:s}=n.tags,i=xe(t),l=o`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"none",color:b=e.color??"neutral",name:p,oninput:f,value:v,radios:x=[],...h}]=K(u);return a({...h,class:B("radioButtonGroup",d,b,m,l,e==null?void 0:e.class,h==null?void 0:h.class)},x.map(({id:S,Label:w})=>s(i({size:d,variant:m,color:b,id:S,name:p,checked:v==S,value:S,oninput:f}),w())))}}const xc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:s}=e.tags,i=Xt(t),r=P(t,{variant:"outline",color:"primary"}),l=e.state("two"),c=({target:d})=>l.val=d.id,u=d=>{d.preventDefault(),alert(l.val)};return()=>n({onsubmit:u},o(i({oninput:c,name:"myRadio",value:l.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),s("CheckedState: ",l)),a(r({type:"submit"},"Submit")))},yc=`import { Context } from "@grucloud/bau-ui/context";
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
`,wc=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=Xt(t),i=P(t,{variant:"outline",color:"primary"}),r=l=>{l.preventDefault();const c=l.target.closest("form"),u=Object.fromEntries(new FormData(c));alert(JSON.stringify(u))};return()=>n({onsubmit:r},o(s({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},Sc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cc=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:s,img:i}=e.tags,r=Xt(t),l=P(t,{variant:"outline",color:"primary"}),c=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28}),d=m=>{m.preventDefault();const b=m.target.closest("form"),p=Object.fromEntries(new FormData(b));alert(JSON.stringify(p))};return()=>o({onsubmit:d},a(r({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>[c(),"GitHub"]},{id:"GitLab",Label:()=>[u(),"GitLab"]}]})),s(l({type:"submit"},"Submit")))},kc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ec=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:s,div:i}=e.tags,r=Xt(t),l=P(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=u.target.closest("form"),m=Object.fromEntries(new FormData(d));alert(JSON.stringify(m))};return()=>n({onsubmit:c},o(r({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>i("GitHub",s("Login with GitHub"))},{id:"GitLab",Label:()=>i("GitLab",s("Login with GitLab"))}]})),a(l({type:"submit"},"Submit")))},Ac=`import { Context } from "@grucloud/bau-ui/context";
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
`,Tc={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:Sc,createComponent:wc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:yc,createComponent:xc},{title:"Label with Image",description:"A label with an image.",code:kc,createComponent:Cc},{title:"Label with description",description:"A label with name and description.",code:Ac,createComponent:Ec}]},Dc=t=>{const e=U(t);return()=>e(Tc)},Bc=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Lt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i,option:r}=n.tags,l=P(t),c=Ot(t),u=vt(t),d=o`
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
  `;return function(...b){let[{size:p=e.size??"md",variant:f=e.variant??"outline",color:v=e.color??"neutral",label:x,Option:h,options:S,defaultOption:w,getOptionLabel:E,getOptionValue:T,onSelect:D=()=>{},loading:M,...N},...$]=K(b);const L=bt(t,{variant:f,color:v,size:p}),j=n.state(w?E(w):x),G=n.state(!1),F=n.state(0),z=()=>{V.openDialog(),V.focus(),G.val=!0},C=()=>{V.closeDialog(),G.val=!1},g=()=>{G.val=!1},y=I=>{V.open?C():z(),I.preventDefault()},k=({option:I,index:X})=>nt=>{j.val=E(I),J.value=T(I),J.setCustomValidity(""),F.val=X,C(),D(I),nt.preventDefault()},A=I=>{switch(I.preventDefault(),I.key){case"Escape":C();break;case"ArrowDown":F.val<S.length-1?F.val++:F.val=0;break;case"ArrowUp":F.val<=0?F.val=S.length-1:F.val--;break;case"Enter":V.open?(j.val=E(S[F.val]),J.value=T(r),C()):z();break}},H=()=>u({tabindex:"0",class:B(v,f)},S.map((I,X)=>s({class:()=>B(F.val==X&&"active"),onclick:k({option:I,index:X})},h(I)))),_=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":G,"aria-label":x,onclick:y,color:v,variant:f,size:p,class:M==!0&&"loading",disabled:M},()=>!j.val&&x,j,()=>M==!0&&L({visibility:M})),V=c({triggerEl:_,contentEl:H(),onClose:g}),J=i(N,r({value:""},"--Select Category--"),S.map(I=>r({value:T(I)},E(I))));return w?J.value=T(w):J.value=N.value,a({...N,class:B("select",v,p,d,e==null?void 0:e.class,N==null?void 0:N.class),onkeydown:A},J,_,V)}}const Pn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Lt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return c=>i({...c,options:r,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Mc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,l=Lt(t),c=P(t,{variant:"solid",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],d=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(b.label),r(b.code)),m=b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(p))};return()=>o({onsubmit:m},a(l({name:"country",options:u,Option:d,getOptionValue:({code:b})=>b,getOptionLabel:({label:b})=>b,label:"Select a country..."})),s(c({type:"submit"},"Submit")))},Ic=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Nc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,l=Lt(t),c=P(t,{variant:"solid",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],m=p=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(p.label),r(p.code)),b=p=>{p.preventDefault();const f=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(f))};return()=>o({onsubmit:b},a(l({name:"country",options:d,Option:m,defaultOption:d.find(({code:p})=>p==u),getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Select a country..."})),s(c({type:"submit"},"Submit")))},Oc=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,$c=t=>{const{bau:e}=t,{form:n,article:o,footer:a,span:s}=e.tags,i=Lt(t),r=P(t,{variant:"solid",color:"primary"}),l=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],c=d=>s({},d),u=d=>{d.preventDefault();const m=Object.fromEntries(new FormData(d.target.closest("form")));alert(JSON.stringify(m))};return()=>n({onsubmit:u},o(i({name:"region",options:l,Option:c,label:"Select a region",getOptionValue:d=>d,getOptionLabel:d=>d,required:!0,oninvalid:d=>{d.target.setCustomValidity("Please select an AWS region")}})),a(r({type:"submit"},"Submit")))},Lc=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,Pc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,span:i,div:r}=e.tags,l=P(t,{variant:"outline"}),c=P(t,{variant:"solid",color:"primary"}),u=Lt(t),d=e.state([]),m=e.state(!1),b=e.state("");async function p({url:h,transform:S=w=>w}){try{m.val=!0;const w=await fetch(h,{});if(w.ok){const E=await w.json();d.val=S(E)}else b.val=w.statusText}catch(w){b.val=w.message}finally{m.val=!1}}const f=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:h=>h.sort((S,w)=>S.name.common.localeCompare(w.name.common))});f();const v=h=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(h.flag),i(h.name.common)),x=h=>{h.preventDefault();const S=Object.fromEntries(new FormData(h.target.closest("form")));alert(JSON.stringify(S))};return()=>o({onsubmit:x},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({name:"country",options:d.val,Option:v,getOptionValue:({name:h})=>h.common,getOptionLabel:({name:h})=>h.common,label:"Country",id:"country",loading:m.val,required:!0}),l({onclick:()=>f()},"Reload")),s(c({type:"submit"},"Submit")))},zc=`import { Context } from "@grucloud/bau-ui/context";
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
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
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
`,_c={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Ic,createComponent:Mc},{title:"Default Option",description:"Select with a default option",code:Oc,createComponent:Nc},{title:"Select AWS region",description:"Select the AWS region",code:Lc,createComponent:$c},{title:"Loading Indicator",description:"Select with a loading indicator",code:zc,createComponent:Pc}],gridItem:Pn},Rc=t=>{const e=U(t);return()=>e(_c)};function zn(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,s=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("select-native",u,l,c,s,e==null?void 0:e.class,d==null?void 0:d.class)},m)}}const _n=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=zn(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,s.map(({label:r,phone:l})=>o({value:l},r)))},jc=t=>{const{bau:e}=t,{option:n,form:o,footer:a}=e.tags,s=P(t,{variant:"outline",color:"primary"}),i=zn(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(u))};return()=>o({onsubmit:l},i({name:"my-select"},n({value:""},"--Please choose a phone code--"),r.map(({label:c,phone:u})=>n({value:u},c))),a(s({type:"submit"},"Submit")))},Gc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Hc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Gc,createComponent:jc}],gridItem:_n},Uc=t=>{const e=U(t);return()=>e(Hc)},Fc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Ct(t),i=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},s({class:n`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        `}),new Array(4).fill("").map(()=>s({class:n`
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
`,Jc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Ct(t),i=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},new Array(4).fill("").map(()=>a({class:n`
              display: flex;
              gap: 1rem;
              align-items: center;
            `},s({class:n`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            `}),s({class:n`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            `}))));return()=>o(i())},Wc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Kc=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:s,tr:i,td:r}=e.tags,l=Ct(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(s(new Array(8).fill("").map(()=>i(r(l({class:n`
                  width: 5rem;
                `})),r(l()),r(l()),r(l()),r(l({class:n`
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
`,Xc=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:s,article:i}=e.tags,r=n`
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
    `}),c=Ct(t);function u({columnsSize:d=4}){return o({class:r},a(new Array(d).fill("").map(()=>l(s("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Zc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Yc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Vc,createComponent:Fc},{title:"List",description:"A list skeleton.",code:Wc,createComponent:Jc},{title:"Table",description:"A table skeleton.",code:qc,createComponent:Kc},{title:"Tabs",description:"A tabs skeleton.",code:Zc,createComponent:Xc}],variantColorTableDisable:!0,variantSizeDisable:!0},Qc=t=>{const e=U(t);return()=>e(Yc)};function Zt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${(()=>ot.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},...b]=K(l);return a({...m,type:"range",class:B("slider",d,u,c,i,e==null?void 0:e.class,m.class)},...b)}}const Rn=t=>{const{bau:e}=t,n=e.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=Zt(t);return s=>a({...s,oninput:o})},tl=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:s}=e.tags,i=e.state(0),r=c=>{i.val=c==null?void 0:c.target.value},l=Zt(t);return()=>n(o(a("Slider with step, min and max",s,l({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},el=`import slider from "@grucloud/bau-ui/slider";
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
`,nl=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s,datalist:i,br:r,option:l}=e.tags,c=e.state(0),u=m=>{c.val=m==null?void 0:m.target.value},d=Zt(t);return()=>o(a(s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(m=>l({value:Number(m),label:m})))))},ol=`import slider from "@grucloud/bau-ui/slider";
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
`,al=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s,datalist:i,br:r,option:l}=e.tags,c=e.state(0),u=m=>{c.val=m==null?void 0:m.target.value},d=Zt(t);return()=>o(a({class:n`
            display: flex;
          `},s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(m=>l({value:Number(m),label:m})))))},rl=`import slider from "@grucloud/bau-ui/slider";
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
`,sl={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:el,createComponent:tl},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ol,createComponent:nl},{title:"Vertical Mark",description:"A vertical slider with marks.",code:rl,createComponent:al}],gridItem:Rn},il=t=>{const e=U(t);return()=>e(sl)},jn=(t,e)=>{const n=bt(t,e);return o=>n({...o})},cl=t=>{const{bau:e}=t,{section:n}=e.tags,o=P(t,{variant:"solid",color:"primary"}),a=bt(t,{size:"lg"}),s=e.state(!0);return()=>n(o({onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),a({visibility:s}))},ll=`import spinner from "@grucloud/bau-ui/spinner";
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
`,ul={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ll,createComponent:cl}],gridItem:jn},dl=t=>{const e=U(t);return()=>e(ul)},ml=()=>ot.map(t=>"").join(`
`),Gn=(t,e)=>(n,o)=>{const a=new URLSearchParams(t.window.location.search);return a.delete(e),a.append(e,n),o&&Object.entries(o).map(([s,i])=>(a.delete(s),a.append(s,i))),`?${a.toString()}`};function Hn(t,e={}){const{bau:n,css:o,window:a}=t,{div:s,ul:i,li:r,span:l,section:c}=n.tags,u=o`
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
    ${ml()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...m){let[{color:b,variant:p="plain",size:f,stepperDefs:v=[],stepperName:x,activeStepIndex:h=n.state(0),...S},...w]=K(m);const E=n.state(v.map((L,j)=>({...L,index:j}))),T=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(L,j,G)=>{L.apply(j,G);const F=G[2]??"";console.log("stepper pushState ",F),["?","#"].includes(F[0])&&$()}});const D=n.derive(()=>E.val[h.val]),M=L=>{const{Header:j,disabled:G,name:F,index:z}=L;return r({class:()=>B(D.val.name==F&&"active",h.val<z&&"not-completed",h.val>z&&"completed",G&&"disabled")},l({class:"step-number"},z+1),l({class:"step-label"},()=>j(L)))},N=L=>v.findIndex(({name:j})=>j==L.name),$=()=>{const j=new URLSearchParams(a.location.search).get(x)??v[0].name,G=Math.max(v.findIndex(({name:F})=>F==j),0);G<h.val&&(console.log("remove last step"),T.val.pop()),T.val.some(({name:F})=>j==F)||(console.log("add new step"),T.val.push(v[G])),h.val=G};return $(),s({bauMounted:({element:L})=>{a.addEventListener("popstate",$)},bauUnmounted:()=>{a.removeEventListener("popstate",$)},class:B("stepper",p,f,b,u,e==null?void 0:e.class,S.class)},n.loop(E,i(),M),n.loop(T,c(),L=>s({class:()=>B("content",L.name==D.val.name&&"visible")},L.Content({nextStep:v[N(L)+1],previousStep:v[N(L)-1]}))))}}const Pe="my-wizard",pl=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:s,section:i,a:r,ul:l,li:c}=e.tags,u=mt(t),d=$t(t),m=Hn(t),b=Gn(t,Pe),p=P(t,{variant:"outline",color:"primary"}),f=P(t,{variant:"solid",color:"primary"}),v=({nextStep:S})=>w=>{w.preventDefault();const{organization:E}=w.target.elements;n.history.pushState("","",b(S.name,{organization:E.value}))},x=S=>{var D;S.preventDefault();const{organization:w}=(D=n.document.forms)==null?void 0:D.formStep1.elements,T=new URLSearchParams(n.location.search).get("choice");alert(`organization ${w.value}, choice:${T}`)},h=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>d({onsubmit:v({nextStep:S}),id:"formStep1"},s("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:w})=>d(l(c(r({href:b(S.name,{choice:"choice1"})},"Choice 1")),c(r({href:b(S.name,{choice:"choice2"})},"Choice 2"))),o(p({href:b(w.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>d({onsubmit:x},a("My stepper 3 Content"),o(p({href:b(S.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>i(m({stepperDefs:h,stepperName:Pe}))},bl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ze="stepper-vertical",gl=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:s,label:i,section:r,a:l,ul:c,li:u}=e.tags,d=mt(t),m=$t(t),b=Hn(t,{class:o`
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
    `}),p=Gn(t,ze),f=P(t,{variant:"outline",color:"primary"}),v=P(t,{variant:"solid",color:"primary"}),x=({nextStep:w})=>E=>{E.preventDefault();const{organization:T}=E.target.elements;n.history.pushState("","",p(w.name,{organization:T.value}))},h=w=>{var M;w.preventDefault();const{organization:E}=(M=n.document.forms)==null?void 0:M.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${E.value}, choice:${D}`)},S=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:w})=>m({onsubmit:x({nextStep:w}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(v({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:w,previousStep:E})=>m(c(u(l({href:p(w.name,{choice:"choice1"})},"Choice 1")),u(l({href:p(w.name,{choice:"choice2"})},"Choice 2"))),a(f({href:p(E.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:w})=>m({onsubmit:h},s("My stepper 3 Content"),a(f({href:p(w.name)},"Previous: Step 2"),v({type:"submit"},"Save")))}];return()=>r(b({stepperDefs:S,stepperName:ze}))},fl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,hl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:bl,createComponent:pl},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:fl,createComponent:gl}]},vl=t=>{const e=U(t);return()=>e(hl)},xl=()=>ot.map(t=>`
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
`);function Un(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=K(r);return a({...d,class:B("switch",s,u,c,l,e==null?void 0:e.class,d.class),type:"checkbox"},...m)}}const Fn=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:s}=n.tags,i=Un(t,e);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},s("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),s("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},yl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:s}=e.tags,i=Un(t,{variant:"outline"}),r=P(t,{variant:"outline",color:"primary"}),l=c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(u))};return()=>a({onsubmit:l},s({class:n`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `},"My shinny switch",i({name:"my-shinny-switch"})),o(r({type:"submit"},"Submit")))},wl=`import { Context } from "@grucloud/bau-ui/context";
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
`);function Pt(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:s}=e,{div:i,ul:r,li:l,a:c}=n.tags,u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:f=e.color??"neutral",tabsKey:v="tabs",...x},...h]=K(m);const S=n.state(s),w=$=>S.val.find(L=>L.name==$),E=n.state(s[0]),T=()=>{var j,G;const L=new URLSearchParams(a.location.search).get(v)??s[0].name;if(L!=E.val.name){const F=w(L);(j=E.val.exit)==null||j.call(),E.val=F,(G=F==null?void 0:F.enter)==null||G.call()}};T(),a.history.pushState=new Proxy(a.history.pushState,{apply:($,L,j)=>{$.apply(L,j);const G=j[2]??"";["?","#"].includes(G[0])&&T()}});const D=$=>{const L=new URLSearchParams(a.location.search);return L.delete(v),L.append(v,$),`?${L.toString()}`},M=$=>{const{Header:L,disabled:j,name:G}=$;return l({class:()=>B(E.val.name==G&&"active",j&&"disabled")},c({href:D(G)},L($)))},N=i({class:B("tabs",p,b,f,u,e==null?void 0:e.class,x.class),bauMounted:({element:$})=>{a.addEventListener("popstate",T)},bauUnmounted:()=>{a.removeEventListener("popstate",T)}},n.loop(S,r(),M),n.bind({deps:[E],render:()=>({Content:$})=>$?$(x):""}));return N.addEventListener("tab.add",$=>{var j;const{tab:L}=$.detail;(j=L.enter)==null||j.call(),S.val.push(L)},!1),N.addEventListener("tab.remove",$=>{var j;const L=S.val.findIndex(G=>G.name==$.detail.tabName);L>0&&((j=S.val[L].exit)==null||j.call(),S.val.splice(L,1))},!1),N}}const El=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>s({})},Al=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Tl=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>s({tabsKey:"my-tab"})},Dl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Ol={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Al,createComponent:El},{title:"Extended Tabs",description:"An extended tabs.",code:Dl,createComponent:Tl},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Ml,createComponent:Bl},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Nl,createComponent:Il}]},$l=t=>{const e=U(t);return()=>e(Ol)};function zt(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:s}=n.tags;a`
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
  `;return function(...l){let[{...c},...u]=K(l);return s({...c,class:B("table-container",i,e==null?void 0:e.class,c==null?void 0:c.class)},...u)}}const Ll=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=e.tags;function d(v,x,h,S,w){return{name:v,calories:x,fat:h,carbs:S,protein:w}}const m=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],b=({name:v,calories:x})=>i(s(v),s({class:n`
            text-align: right;
          `},x)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=zt(t,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),p(),c(m.map(b)))))},Pl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Tt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const zl=[Tt("Frozen yoghurt",159,6,24,4),Tt("Ice cream sandwich",237,9,37,4.3),Tt("Eclair",262,16,24,6),Tt("Cupcake",305,3.7,67,4.3),Tt("Gingerbread",356,16,49,3.9)],_l=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=e.tags,d=({name:p,calories:f})=>i(s(p),s({class:n`
            text-align: right;
          `},f)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=zt(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(r(u("Table Dense"),m(),c(zl.map(d)))))},Rl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Dt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const jl=[Dt("Frozen yoghurt",159,6,24,4),Dt("Ice cream sandwich",237,9,37,4.3),Dt("Eclair",262,16,24,6),Dt("Cupcake",305,3.7,67,4.3),Dt("Gingerbread",356,16,49,3.9)],Gl=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=e.tags,d=({name:p,calories:f})=>i(s(p),s({class:n`
            text-align: right;
          `},f)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=zt(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(r(u("Table Zebra"),m(),c(jl.map(d)))))},Hl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Ul={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Pl,createComponent:Ll},{title:"Dense",description:"A dense table.",code:Rl,createComponent:_l},{title:"Zebra",description:"A zebra table.",code:Hl,createComponent:Gl}]},Fl=t=>{const e=U(t);return()=>e(Ul)},Vl=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:s,section:i,article:r}=e.tags,l=an(t),c=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),s({id:"h3-1-1"},"h3 1 1"),s({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),s({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},Jl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Wl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Jl,createComponent:Vl}]},Kl=t=>{const e=U(t);return()=>e(Wl)};function Jn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=he(t),i=P(t),r=bt(t),l=o`
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
  `,c=({label:p,icon:f,...v})=>i({"aria-label":p,title:p,...v},f),u=({count:p,totalCount:f,page:v,rowsPerPage:x})=>a({class:"pages-numbers"},Number(v-1)*Number(x)+(p>0?1:0),"-",Math.min(v*x,f)," of ",f),d=({count:p,page:f,rowsPerPage:v})=>a({class:"pages-numbers"},(f-1)*v+(p>0?1:0),"-",f*v),m=p=>p<=1,b=(p,f,v)=>p>=Math.ceil(f/v);return function(...f){let[{size:v=e.size??"md",variant:x=e.variant??"outline",color:h=e.color??"neutral",count:S=0,totalCount:w=0,page:E=1,rowsPerPage:T=50,onPageChange:D,isLoading:M=!1,disableFirst:N=()=>m(E),disablePrevious:$=()=>m(E),disableNext:L=()=>b(E,w,T),disableLast:j=()=>b(E,w,T),...G},...F]=K(f);const z=Math.max(0,Math.ceil(w/T)),C=D({page:1}),g=D({page:E-1}),y=D({page:E+1}),k=D({page:z}),A=[{label:"First",icon:"⟪",onclick:C,disabled:N()},{label:"Previous",icon:"⟨",onclick:g,disabled:$()},{label:"Next",icon:"⟩",onclick:y,disabled:L()},{label:"Last",icon:"⟫",onclick:k,disabled:j()}];return a({...G,class:B("table-pagination",l,M&&"disabled",e==null?void 0:e.class,G==null?void 0:G.class)},r({class:"spinner",visibility:M,size:"md"}),w>0?u({count:S,totalCount:w,page:E,maxPages:z,rowsPerPage:T}):d({count:S,page:E,maxPages:z,rowsPerPage:T}),s({variant:x,color:h},A.map(H=>c({...H,variant:x,color:h}))))}}const ql=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Xl=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:l}=e.tags,c=ql(45),u=({name:h,email:S})=>s(a(h),a(S)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),m=Jn(t),b=zt(t,{class:n`
      max-width: 650px;
    `}),p=e.state(c),f=e.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),v=e.derive(()=>p.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),x=({page:h})=>S=>{f.val.page=h};return()=>b(i(d(),()=>l(v.val.map(u))),()=>m({...f.val,onPageChange:x}))},Zl=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:l,div:c}=e.tags,u=e.state(!1),d=e.state([]),m=e.state(""),b=e.derive(()=>d.val.length),p=e.state(1),f=e.state(10),v=e.derive(()=>d.val),x=N=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(N).toString()}`,h=({page:N})=>$=>{p.val=N,S(x({page:N,per_page:f.val}))};S(x({page:1,per_page:f.val}));async function S(N){try{u.val=!0;const $=await fetch(N,{});if($.ok){const L=await $.json();d.val=L;return}throw $}catch($){m.val=$.message}finally{u.val=!1}}const w=({name:N,description:$,stargazers_count:L})=>s(a(N),a($),a({class:n`
            text-align: right;
          `},L)),E=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),T=Jn(t),D=zt(t,{class:n`
      min-width: 650px;
    `}),M=({message:N})=>c(N);return()=>D(()=>T({rowsPerPage:f.val,page:p.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:h,disableNext:()=>!1}),i(E(),()=>m.val&&M({message:m.val}),()=>l(v.val.map(w))))},Yl=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:s,h2:i,tr:r}=e.tags,l=Xl(t),c=Zl(t),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(r("Table Pagination")),s("Asynchronous Pagination"),u(c()),s("Simple Pagination"),u(l()))};function _t(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{button:s}=n.tags;a`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",selected:m=!1,disabled:b,onChange:p,...f},...v]=K(l);return s({type:"button",...f,"aria-pressed":{deps:[m],renderProp:()=>x=>x},class:{deps:[m],renderProp:()=>x=>B("toggle",c,d,u,i,x&&"selected",e==null?void 0:e.class,f==null?void 0:f.class)},disabled:b},v)}}const Wn=(t,e)=>{const{bau:n}=t,o=_t(t,e);return a=>{const s=n.state(!1);return o({...a,selected:s,onclick:()=>s.val=!s.val},"Toggle Me")}},Ql=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=_t(t,{variant:"plain"}),i=P(t,{variant:"outline",color:"primary"}),r=e.state(!1),l=c=>{var m;c.preventDefault();const d=(m=c.target.closest("form").querySelector("button[aria-pressed=true]"))==null?void 0:m.name;alert(d)};return()=>n({onsubmit:l},o(s({name:"my-toogle",selected:r,onclick:()=>r.val=!r.val},"Toggle Me")),a(i({type:"submit"},"Submit")))},tu=`import { Context } from "@grucloud/bau-ui/context";
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
`,eu={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:tu,createComponent:Ql}],gridItem:Wn},nu=t=>{const e=U(t);return()=>e(eu)},ou=()=>ot.map(t=>`
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
`);function ye(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:m=()=>{},...b},...p]=K(r);const f=new Set,v=x=>{const{value:h}=x.target;d?(f.clear(),f.add(h)):f.has(h)?f.delete(h):f.add(h),m({event:x,values:[...f]})};return a({...b,class:B("toggle-group",l,u,c,s,e==null?void 0:e.class,b==null?void 0:b.class),onclick:v},...p)}}const Kn=(t,e)=>{const{bau:n}=t,o=ye(t,e),a=_t(t,e);return s=>{const i=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...s,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:u})=>()=>a({...s,value:u,selected:i.val.includes(u),"area-label":c},c)))}},au=t=>{const{bau:e}=t,{form:n,footer:o,article:a}=e.tags,s=e.state([""]),i=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],r="primary",l="solid",c=_t(t,{color:r,variant:l}),u=ye(t,{color:r,variant:l}),d=P(t,{variant:"outline",color:"primary"}),m=({values:p})=>{s.val=p},b=p=>{var x;p.preventDefault();const v=(x=p.target.closest("form").querySelector("button[aria-pressed=true]"))==null?void 0:x.name;alert(v)};return()=>n({onsubmit:b},a(u({exclusive:!0,onChange:m},i.map(({label:p,value:f})=>()=>c({value:f,name:p,selected:s.val.includes(f)},p)))),o(d({type:"submit"},"Submit")))},ru=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,su=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=e.state([""]),i=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],r="primary",l="solid",c=_t(t,{variant:l,color:r}),u=ye(t,{variant:l,color:r}),d=P(t,{variant:"outline",color:"primary"}),m=({values:p})=>{s.val=p},b=p=>{p.preventDefault();const v=[...p.target.closest("form").querySelectorAll("button[aria-pressed=true]")].map(({name:x})=>x);alert(JSON.stringify(v))};return()=>n({onsubmit:b},o(u({onChange:m},i.map(({label:p,value:f})=>()=>c({value:f,name:p,selected:s.val.includes(f)},p)))),a(d({type:"submit"},"Submit")))},iu=`import { Context } from "@grucloud/bau-ui/context";
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
`,cu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:ru,createComponent:au},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:iu,createComponent:su}],gridItem:Kn},lu=t=>{const e=U(t);return()=>e(cu)};function we(t,e={}){const{bau:n,css:o,window:a}=t,{div:s}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",...p},...f]=K(l);const v=s({class:B("container",...u.split("-"))},s({class:B("content",b,m,d),role:"tooltip"},c)),x=D=>`move-to-${D}`,h=(D,M,N)=>{if(D()){const $=x(M);v.classList.add($),v.classList.add(M),v.classList.remove(N)}},S=(D,M)=>{const N=x(D);v.classList.contains(N)&&(v.classList.remove(N),v.classList.add(M),v.classList.remove(D))},w=D=>{const M=v.getBoundingClientRect();h(()=>M.x<0,"right","left"),h(()=>M.x+M.width>a.innerWidth,"left","right"),h(()=>M.y<0,"bottom","top"),h(()=>M.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},E=D=>{v.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return s({...p,class:B("tooltip",i,e==null?void 0:e.class,p==null?void 0:p.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",w),D.addEventListener("mouseout",E)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",w),D.removeEventListener("mouseout",E)}},...f,v)}}const qn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:s}=n.tags,i=P(t),r=we(t,e),l=()=>o(a("A ",s("tooltip")," can be any component"));return c=>r({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},uu=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,s=P(t),i=we(t),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:r()},s("tooltip"))},du=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,mu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:s,section:i}=e.tags,r=Nt(t,{variant:"outline",color:"primary"}),l=we(t),c=()=>o(a("A ",s("tooltip")," can be any component")),u=()=>i({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        `},o({class:n`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          `},l({side:"top-start",titleEl:c()},r("top-start")),l({side:"top-centered",titleEl:c()},r("top-centered")),l({side:"top-end",titleEl:c()},r("top-end"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-start",titleEl:c()},r("left-start")),l({side:"right-start",titleEl:c()},r("right-start"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-centered",titleEl:c()},r("left-centered")),l({side:"right-centered",titleEl:c()},r("right-centered"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-end",titleEl:c()},r("left end")),l({side:"right-end",titleEl:c()},r("right end"))),o({class:n`
            display: flex;
            justify-content: space-around;
          `},l({side:"bottom-start",titleEl:c()},r("bottom start")),l({side:"bottom-centered",titleEl:c()},r("bottom centered")),l({side:"bottom-end",titleEl:c()},r("bottom end"))));return()=>u()},pu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,bu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:du,createComponent:uu},{title:"Grid",description:"Various tooltip position",code:pu,createComponent:mu}],gridItem:qn},gu=t=>{const e=U(t);return()=>e(bu)},Xn=(t,e)=>{const n=se(t,e);return o=>n(o)},fu=t=>{const{bau:e}=t,{section:n}=e.tags,o=se(t);return()=>n(o({}))},hu=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,vu={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:hu,createComponent:fu}],gridItem:Xn},xu=t=>{const e=U(t);return()=>e(vu)},Zn=({parent:t,grandParent:e})=>n=>{const{children:o=[],...a}=n,s={...a};return s.children=o==null?void 0:o.map(Zn({parent:n,grandParent:t})),t&&(t.parent=e),s.parent=t,s},yu=({css:t,createGlobalStyles:e})=>(e`
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
  `});function Se(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:s}=e,{ul:i,li:r,nav:l,div:c}=n.tags,u=yu({css:o,createGlobalStyles:a}),d=be(t),m=({depth:b=1,maxDepth:p,parent:f,color:v,variant:x,size:h})=>S=>{const{children:w,expanded:E}=S,T=n.state(!E),D=()=>c({class:o`
              cursor: ${w?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:N=>{w&&(T.val=!T.val)}},s({item:S,parent:f,depth:b})),M=()=>i({class:B(v,h)},w.map(m({depth:b+1,maxDepth:p,parent:S})));return r(w.length?d({expanded:E,Header:D,Content:w&&b<p&&M}):D())};return function({tree:p,maxDepth:f=1/0,size:v=e.size??"md",variant:x=e.variant??"outline",color:h=e.color??"neutral",...S}){return l({class:B(u.nav,v,x,h,e==null?void 0:e.class,S.class)},i(m({maxDepth:f,color:h,variant:x,size:v})(Zn({})({...p}))))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Se(t,{renderMenuItem:({item:{data:{name:r,href:l}}})=>o({href:l},r),...e});return r=>i({...r,tree:a})},wu=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Se(t,{renderMenuItem:({item:{data:{name:i,href:r}}})=>n({href:r},i)});return()=>s({tree:o})},Su=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Cu=t=>{const{bau:e,css:n,window:o}=t,{form:a,label:s,article:i,footer:r}=e.tags,l=Et(t,{color:"neutral",variant:"outline"}),c=P(t,{variant:"solid",color:"danger"}),u=e.state(0),d=w=>{w.preventDefault();const E=w.target.closest("form"),T=Object.fromEntries(new FormData(E));alert(JSON.stringify(T))},m={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},b=({id:w,name:E})=>w??E,p=w=>o.document.getElementById(b(w)),f=({onNode:w})=>E=>{w(E);const{children:T=[]}=E;T.map(f({onNode:w}))},v=({parent:w})=>{if(w){const{children:E}=w,T=p(w.data);if(T){const D=E.every(M=>{const{checked:N,indeterminate:$}=p(M.data);return!N&&!$});T.indeterminate=!D&&E.some(M=>!p(M.data).checked),T.checked=E.every(M=>p(M.data).checked)}v({parent:w.parent})}},x=({item:w,parent:E})=>T=>{v({parent:E}),f({onNode:N=>{const $=p(N.data);$&&($.checked=T.target.checked,$.indeterminate=!1)}})(w);const M=T.target.closest("form").querySelectorAll('input[type="checkbox"][data-type="resources"]:checked');u.val=M.length,T.stopPropagation()},S=Se(t,{renderMenuItem:({item:w,parent:E})=>{const{name:T,id:D}=w.data,M=b(w.data);return s({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:N=>N.stopPropagation()},l({onclick:x({item:w,parent:E}),name:M,id:M,"data-type":D?"resources":"group"}),T)}});return()=>a({onsubmit:d},i(S({tree:m})),r(c({type:"submit"},()=>`Delete ${u.val} Resource(s)`)))},ku=`import { Context } from "@grucloud/bau-ui/context";
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
`,Eu={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:Su,createComponent:wu},{title:"Checkable",description:"A treeview with checkboxes.",code:ku,createComponent:Cu}],gridItem:Yn},Au=t=>{const e=U(t);return()=>e(Eu)},Tu=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return r=>i(r)},Du=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:s,p:i,ul:r,li:l}=e.tags,c=rn(t),u=P(t),d=[{name:"Accordion",Item:sn(t)},{name:"Alert",Item:ln(t)},{name:"Autocomplete",Item:dn(t)},{name:"Avatar",Item:un(t)},{name:"Badge",Item:pn(t)},{name:"Breadcrumbs",Item:bn(t)},{name:"Button",Item:gn(t)},{name:"Button Group",Item:fn(t)},{name:"Calendar",Item:vn(t)},{name:"Checkbox",Item:yn(t)},{name:"Chip",Item:xn(t)},{name:"DrillDown Menu",Item:Sn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:kn(t)},{name:"Input",Item:En(t)},{name:"Input Search",Item:An(t)},{name:"Linear Progress",Item:In(t)},{name:"Loading Button",Item:Nn(t)},{name:"Modal",Item:$n(t)},{name:"Radio Button",Item:Ln(t)},{name:"Select",Item:Pn(t)},{name:"Select Native",Item:_n(t)},{name:"Slider",Item:Rn(t)},{name:"Spinner",Item:jn(t)},{name:"Switch",Item:Fn(t)},{name:"Tabs",Item:Tu(t)},{name:"Theme Switch",Item:Xn(t)},{name:"Toggle",Item:Wn(t)},{name:"Toggle Group",Item:Kn(t)},{name:"Tooltip",Item:qn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
          overflow-y: scroll;
        `},s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:m})=>l(u({color:"primary",variant:"solid",href:`#${m}`,size:"sm"},m)))),d.map(m=>a({id:m.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},c(m))))},Bu=({context:t})=>{const e=Du(t);return[{path:"",action:n=>({title:"Bau UI",component:Ro(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ua(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Qa(t)})},{path:"alert",action:()=>({title:"Alert",component:ir(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:mr(t)})},{path:"animate",action:()=>({title:"Animate",component:vr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:$r(t)})},{path:"avatar",action:()=>({title:"Avatar",component:kr(t)})},{path:"badge",action:()=>({title:"Badge",component:_r(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Fr(t)})},{path:"button",action:()=>({title:"Button",component:Xr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:es(t)})},{path:"calendar",action:()=>({title:"Calendar",component:rs(t)})},{path:"carousel",action:()=>({title:"Carousel",component:ds(t)})},{path:"chip",action:()=>({title:"Chip",component:gs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Cs(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Ts(t)})},{path:"divider",action:()=>({title:"Divider",component:Ns(t)})},{path:"drawer",action:()=>({title:"Drawer",component:zs(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Us(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Ws(t)})},{path:"fileInput",action:()=>({title:"File Input",component:Zs(t)})},{path:"form",action:()=>({title:"Form",component:ri(t)})},{path:"input",action:()=>({title:"Input",component:li(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:pi(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:xi(t)})},{path:"lazy",action:()=>({title:"Lazy",component:Ti(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Ii(t)})},{path:"list",action:()=>({title:"List",component:Hi(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Li(t)})},{path:"modal",action:()=>({title:"Modal",component:Ji(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:tc(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:lc(t)})},{path:"paper",action:()=>({title:"Paper",component:bc(t)})},{path:"popover",action:()=>({title:"Popover",component:ac(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:vc(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:Dc(t)})},{path:"select",action:()=>({title:"Select",component:Rc(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:Uc(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Qc(t)})},{path:"slider",action:()=>({title:"Slider",component:il(t)})},{path:"spinner",action:()=>({title:"Spinner",component:dl(t)})},{path:"stepper",action:()=>({title:"Stepper",component:vl(t)})},{path:"switch",action:()=>({title:"Switch",component:Cl(t)})},{path:"table",action:()=>({title:"Table",component:Fl(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Kl(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Yl(t)})},{path:"tabs",action:()=>({title:"Tabs",component:$l(t)})},{path:"toggle",action:()=>({title:"Toggle",component:nu(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:lu(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:gu(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:xu(t)})},{path:"treeView",action:()=>({title:"Tree View",component:Au(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Ho(t)})}]},Mu=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),Iu=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=t,i=a.state(),r=e({componentState:i});return document.getElementById("app").replaceChildren(r),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:m,Layout:b=e}=c.resolve({pathname:u});i.val=m({}),document.title=`${d}`}},Nu=t=>{const{createGlobalStyles:e}=t;e`
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
  `};ho();const Qn={title:"Bau",base:"/bau/bau-ui"},ft=Eo({config:Qn}),{bau:Ou}=ft;ft.states={drawerOpen:Ou.state(!0)};Nu(ft);ro({routes:Bu({context:ft}),onLocationChange:Iu({context:ft,LayoutDefault:Lo(ft),config:Qn}),notFoundRoute:Mu(ft)});
