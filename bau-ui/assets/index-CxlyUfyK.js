(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),Ue=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,...Ue({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=Ue({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},s=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:s}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,r,c)=>{i.apply(r,c),o.pathname!=window.location.pathname&&n({router:s}),a(window.location)}}),document.addEventListener("click",i=>{const{target:r}=i,c=r.closest("a");if(!c)return;const l=c.getAttribute("href");l&&!l.startsWith("http")&&!l.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",l),history.pushState({},null,l),a(window.location),["?","#"].includes(l[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:s}),s}const re=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.7"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],co=t=>`var(--color-${t})`,lo=t=>`var(--color-${t}-lightest)`,uo=()=>re.map(([t])=>`
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
`),mo=()=>re.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),po=t=>100-t*10,bo=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${po(e)}%);`).join(`
`),Te=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),go=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),...io.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function ho({createGlobalStyles:t},{colorPalette:e=re}={}){t`
    * {
      margin: 0;
      padding: 0;
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
      ${Te({})}
      ${uo()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.2rem;
      --font-color: var(--color-content);
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
      --brightness-hover-reverse: 70% ${Te({dark:!0})};
    }
  `}function fo(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let se=t=>Object.prototype.toString.call(t??0).slice(8,-1),vo=t=>se(t)=="Object",Ae=t=>se(t)=="Function",ne=t=>["Object","Array"].includes(se(t)),De=Object.getPrototypeOf,oe=t=>kt(t)?t.val:t,Be=t=>Array.isArray(t)?t:[t],kt=t=>t==null?void 0:t.__isState,yo=["splice","push","pop","shift","unshift","sort","reverse"];const J=t=>!kt(t[0])&&vo(t[0])?[t[0],t.slice(1)]:[{},t];function xo(t){let e=window,{document:n}=e,o,a=new Set,s=new Set,i=!1,r,c=C=>n.createElement(C),l=(C,v,x)=>{let T=r;r=v;let E=C(x);return r=T,E},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(C=>{C.bindings=C.bindings.filter(({element:v})=>{var x;return(x=Array.isArray(v)?v[0]:v)==null?void 0:x.isConnected}),!C.bindings.length&&!C.computed&&a.delete(C)}),o=void 0}))},d=(C,v,x,T,E,_)=>{var R;if(i){s.add([C,v,x,T,E,_]);return}for(let V of C.bindings){let{deps:U,element:I,renderInferred:X,render:tt,renderItem:W,isAttribute:Q}=V;if(W&&v)(R=p(I,T,(...nt)=>h(W(...nt)),x,E,_)[v])==null||R.call();else{let nt=X?X({element:I}):tt({element:I,renderItem:W})(...U.map(oe));if(nt!==I&&!Q){let rt=Be(V.element=h(nt)),ct=Be(I),lt=0;for(;lt<ct.length&&lt<rt.length;lt++)ct[lt].replaceWith(h(rt[lt]));let ut=lt;for(;rt.length>ut;)rt[ut-1].after(rt[ut]),ut++;for(;ct.length>lt;)ct[lt].remove(),lt++}}}e.requestAnimationFrame(()=>S(C)),u()},m=(C,v,x=[])=>({get(T,E,_){var R;if(r==null||r.add(C),E==="_isProxy")return!0;if(!((R=T[E])!=null&&R._isProxy)&&!kt(T[E])&&ne(T[E]))T[E]=new Proxy(T[E],m(C,v,[...x,E]));else if(yo.includes(E)){let V=T[E];return(...U)=>{let I=V.apply(T,U);return d(C,E,I,U,v,x),I}}return Reflect.get(T,E,_)},set(T,E,_,R){let V=Reflect.set(T,E,_,R);return d(C,"setItem",V,{prop:E,value:_},v,[...x,E]),V}}),b=(C,v)=>new Proxy(v,m(C,v)),p=(C,v,x,T,E,_)=>{let R=()=>{C.textContent="";for(let U=0;U<T.length;U++)C.appendChild(x(T[U],U))},V=U=>C[U]&&C.removeChild(C[U]);return{assign:R,sort:R,reverse:R,setItem:()=>{var I;let U=_[0];(I=C.children[U])==null||I.replaceWith(x(E[U],U))},push:()=>{for(let U=0;U<v.length;U++)C.appendChild(x(v[U],E.length+U))},unshift:()=>{for(let U=v.length-1;U>=0;U--)C.prepend(x(v[U]))},pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:U}=C.children;let[I,X=U,...tt]=v;for(let W=I>=0?Math.min(I+X-1,U-1):U-1;W>=(I>=0?I:U+I);W--)C.children[W].remove();if(tt.length){let W=tt.map((Q,nt)=>x(Q,I+nt));C.children[I]?C.children[I].before(...W):C.append(...W)}}}},g=C=>({oldVal:C,bindings:[],listeners:[],__isState:!0,get val(){let v=this;return r==null||r.add(v),v.valProxy??(v.valProxy=ne(C)?b(v,C):C,v.valProxy)},set val(v){let x=this,T=x.val;ne(v)?(x.valProxy=b(x,v),d(x,"assign",v)):v!==T&&(x.valProxy=v,d(x)),x.oldVal=T}}),h=C=>{if(C==null||C===!1){const v=c("span");return v.style.display="none",v}else return C.nodeType?C:Array.isArray(C)?C.map(h):n.createTextNode(C)},y=(C,v)=>{let x=new Set;return v.val=l(C,x),x},f=C=>{let v=g(),x=y(C,v);v.computed=!0;for(let T of x)T.listeners.push({computed:C,deps:x,state:v});return v},S=C=>{for(let v of[...C.listeners])y(v.computed,v.state)},w=(C,v=[])=>{for(let x of v)if(Array.isArray(x))w(C,x);else if(x!=null){const T=kt(x)?F({deps:[x],render:()=>E=>E}):Ae(x)?G(x):h(x);Array.isArray(T)?C.append(...T):C.appendChild(T)}},k={},D=(C,v)=>C&&(Object.getOwnPropertyDescriptor(C,v)??D(De(C),v)),A=(C,v,x)=>{var T;return k[C+","+v]??(k[C+","+v]=((T=D(x,v))==null?void 0:T.set)??0)},N=(C,v)=>new e.MutationObserver((x,T)=>{x.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(_=>_===C&&(v({element:C}),T.disconnect(),!0)))}).observe(C.parentNode,{childList:!0}),B=(C,v)=>new e.MutationObserver((x,T)=>x.forEach(E=>v({record:E,element:C}))).observe(C,{childList:!0}),M=C=>new Proxy(function(x,...T){var V;let[E,_]=J(T),R=C?n.createElementNS(C,x):c(x);for(let[U,I]of Object.entries(E)){if(U.startsWith("bau"))continue;let X=A(x,U,De(R))?tt=>tt!==void 0&&(R[U]=tt):tt=>R.setAttribute(U,Array.isArray(tt)?tt.filter(W=>W).join(" "):tt);I==null||(kt(I)?F({deps:[I],render:()=>()=>(X(I.val),R)},!0):Ae(I)&&(!U.startsWith("on")||I.isDerived)?G(()=>(X(I({element:R})),R),!0):I.renderProp?F({deps:I.deps,render:()=>()=>(X(I.renderProp({element:R})(...I.deps.map(oe))),R)},!0):X(I))}return E.bauChildMutated&&B(R,E.bauChildMutated),w(R,_),R.autofocus&&R.focus&&e.requestAnimationFrame(()=>R.focus()),(V=E.bauCreated)==null||V.call(E,{element:R}),E.bauMounted&&e.requestAnimationFrame(()=>E.bauMounted({element:R})),E.bauUnmounted&&e.requestAnimationFrame(()=>N(R,E.bauUnmounted)),R},{get:(v,x)=>v.bind(void 0,x)}),P=(C,v,x,T)=>{C.element=h(x),C.isAttribute=T;for(let E of v)kt(E)&&(a.add(E),E.bindings.push(C));return C.element},G=(C,v)=>{let x=new Set,T=l(C,x,{});return P({renderInferred:C},x,T,v)},F=({deps:C,element:v,render:x,renderItem:T},E)=>P({deps:C,render:x,renderItem:T},C,x({element:v,renderItem:T})(...C.map(oe)),E),z=(C,v,x)=>F({deps:[C],render:({renderItem:T})=>E=>{for(let _=0;_<E.length;_++)v.appendChild(T(E[_],_));return v},renderItem:x}),$=async C=>{i=!0;const v=await C();return i=!1,s.forEach(x=>d(...x)),s.clear(),v};return{tags:M(),tagsNS:M,state:g,bind:F,loop:z,derive:f,stateSet:a,batch:$}}const wo=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},So=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Co=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function ko(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...s)=>{const i=Co(a,s),r=wo(i);return!e.getElementById(r)&&So(e,t==null?void 0:t.target,r,o(r,i)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Eo(t){const e=xo(),n=ko({target:window.document.getElementById("bau-css")});return ho(n),{bau:e,...n,tr:o=>o,window,...t}}function Wt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,s=()=>{};return function({animationHide:r=s,animationShow:c=s,...l},u){return a({class:["animate",e==null?void 0:e.class,l.class],bauChildMutated:({record:d,element:m})=>{[...d.removedNodes].forEach(b=>{if(!r()||b.getAttribute("cloned"))return;const p=b.cloneNode(!0);o.requestAnimationFrame(()=>{p.setAttribute("cloned",!0),p.style.top=0,p.style.left=0,p.style.width=b.getAttribute("width"),p.style.height=b.getAttribute("height"),p.style.position="absolute",p.style.animation=r(),d.target.appendChild(p),p.addEventListener("animationend",()=>{var g;return(g=p.parentNode)==null?void 0:g.removeChild(p)})})}),[...d.addedNodes].forEach(b=>{b.getAttribute("cloned")||o.requestAnimationFrame(()=>{m.style.position="relative";const p=b.getBoundingClientRect();if(b.setAttribute("width",p.width+"px"),b.setAttribute("height",p.height+"px"),c()){b.style.animation=c();const g=()=>{b.removeEventListener("animationend",g),b.style.animation=""};b.addEventListener("animationend",g)}})})},...l},u)}}const ot=["neutral","primary","success","danger","warning"],To=["plain","outline","solid"],Ao=["sm","md","lg"],Do=()=>ot.map(t=>`
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
`);function O(t,e={}){const{bau:n,css:o}=t,a=o`
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
  `;return function(...i){var p;let[{size:r=e.size??"md",variant:c=e.variant??"none",color:l=e.color??"none",href:u,...d},m]=J(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:["button",c,r,l,a,e.class,Array.isArray(d.class)?(p=d.class)==null?void 0:p.join(" "):d.class],href:u},m)}}const Bo="light",No=()=>ot.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function ie(t,e={}){const{bau:n,css:o,window:a}=t,{input:s}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?i(c):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Bo);const l=o`
    position: relative;
    display: inline-flex;
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
    ${No()}
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"plain",color:p=e.color??"neutral",...g},h]=J(d);return s({required:"required",title:"Switch Theme",name:"theme-switch",...g,class:["theme-switch",p,b,m,l,e==null?void 0:e.class,g.class],type:"checkbox",checked:r()=="dark",onclick:y=>{i(y.target.checked?"dark":"light")}},h)}}function Oo(t){const{tr:e,bau:n,css:o,config:a,states:s}=t,{i,header:r,h1:c,div:l,a:u,img:d,b:m,ul:b,li:p}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),y=s.drawerOpen,f=O(t,{class:o`
      background: transparent;
    `}),S=ie(t),w=()=>i(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),k=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},w()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},m(e("Bau UI")))),D=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),f({target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},k(),D())}}function Mo({tr:t,bau:e,css:n}){const{section:o,footer:a,span:s,a:i,ul:r,li:c,p:l,div:u,h1:d}=e.tags,m=({links:g,title:h})=>o({class:n`
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
        `},d(h),r(g.map(({href:y,name:f})=>c(i({href:y},f))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],p=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},s("v0.90.0"),s("MIT license")))}}function xt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["list",s,u,l,c,e==null?void 0:e.class,d==null?void 0:d.class.join(" ")]},m)}}const Ht="0.3s",Ge=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,s={...a};return s.children=o==null?void 0:o.map(Ge({parent:n,grandParent:t})),t&&(t.parentTree=e),s.parentTree=t,s},Fe=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=Fe(t)(e.children[o]);if(a)return a}},Io=({keyframes:t})=>({hideToLeft:t`
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
   `});function ce(t,e={}){const{bau:n,css:o,window:a,config:s}=t,{base:i="",hashBased:r=!1}=e,c=`${s.base}${i}`,l=$=>{var C;return((C=$.parentTree.data)==null?void 0:C.href)??$.parentTree.children[0].data.href},u=({variant:$,color:C,size:v,currentTree:x,data:T})=>S(A({variant:$,color:C,size:v,href:`${c}${l(x)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),A({variant:$,color:C,size:v,href:`${c}${T.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},T.name)),d=({size:$,subTree:{data:{name:C,href:v},children:x=[]}})=>A({size:$,href:`${c}${v}`,"data-ischild":!x.length},C),m=({pathname:$,subTree:C})=>{var v;return $===((v=C==null?void 0:C.data)==null?void 0:v.href)},{renderHeader:b=u,renderMenuItem:p=d,isActive:g=m}=e,{li:h,nav:y,div:f,header:S,a:w}=n.tags,k=Wt(t),D=xt(t),A=O(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:N,hideToRight:B}=Io(t),M=o`
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
  `,P=({children:$,pathnameState:C,variant:v,color:x,size:T})=>D({class:[v,x,T]},$.map(E=>h({class:()=>[E.children&&"has-children",g({pathname:C.val,subTree:E})&&"active"]},p({variant:v,color:x,size:T,subTree:E})))),G=({variant:$,color:C,size:v,currentTree:x,pathnameState:T})=>{const{children:E,parentTree:_,data:R,renderList:V}=x;return f({class:["drillDownMenu",$,C,v]},_&&b({variant:$,color:C,size:v,data:R,currentTree:x}),E&&V?V({renderListDefault:P,children:E,pathnameState:T,variant:$,color:C,size:v}):P({children:E,pathnameState:T,variant:$,color:C,size:v}))},F=({tree:$,pathname:C})=>{let v=Ge({})({...$}),x=Fe(C)(v);return x||(x=v),x},z=({target:$})=>{let C=`${$.closest("a").pathname.replace(".md","").replace(c,"")}${$.hash}`;return r||(C=C.replace($.hash,"")),C};return function(C){const{size:v=e.size??"md",variant:x=e.variant??"plain",color:T=e.color??"neutral",tree:E,..._}=C,R=n.state(a.location.pathname.replace(c,""));let V=F({tree:E,pathname:R.val});const U=n.state(JSON.stringify(V.data));let I;a.document.addEventListener("click",Q=>{const{target:nt}=Q,rt=nt.closest("a");if(!rt)return;const ct=rt.getAttribute("href");ct&&!ct.startsWith("http")&&!ct.startsWith("#")&&!ct.startsWith("?")&&(V=F({tree:E,pathname:z(Q)}),U.val=JSON.stringify(V.data),R.val=z({target:nt}))});const X=Q=>{const{buttonback:nt,ischild:rt}=Q.target.dataset;nt=="true"?I=-1:rt=="false"?I=1:rt=="true"&&(I=0)},tt=Q=>{switch(Q){case 1:return`${N} ${Ht}`;case-1:return`${B} ${Ht}`;default:return""}},W=Q=>{switch(Q){case 1:return`${B} ${Ht} reverse`;case-1:return`${N} ${Ht} reverse`;default:return""}};return y({class:[M,x,T,v,e==null?void 0:e.class,_.class],onclick:X},k({animationHide:()=>tt(I),animationShow:()=>W(I)},n.bind({deps:[U],render:()=>()=>G({variant:x,color:T,size:v,currentTree:V,pathnameState:R})})))}}const Lo=()=>ot.map(t=>`
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
`);function dt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
    ${Lo()}
  `;return function(r){var d;const{variant:c=e.variant??"outline",color:l=e.color??"neutral",...u}=r;return a({type:"text",...u,class:["input",e.class,e.size??"md",l,c,s,Array.isArray(r.class)?(d=r.class)==null?void 0:d.join(" "):r.class]})}}function le(t,e={}){const{bau:n,css:o,window:a}=t,s=dt(t,e);return function(r){const{variant:c=e.variant??"outline",color:l=e.color??"neutral",...u}=r,m=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":"--font-color-secondary")}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        padding-left: 1.8rem;
        background-image: ${m};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return s({type:"search",...u,color:l,variant:c,class:["inputSearch",e.class,b,u.class]})}}function He(t){const{tr:e,bau:n,css:o,config:a,states:s,window:i}=t,{div:r,ul:c,li:l,nav:u,a:d,span:m,form:b}=n.tags,p=le(t,{variant:"plain",color:"neutral",size:"sm",class:o`
      margin: 0.5rem;
    `}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:S,children:w,pathnameState:k,variant:D,color:A,size:N})=>{const B=n.state(""),M=n.derive(()=>B.val==""?w:w.filter(G=>G.data.name.match(new RegExp(`${B.val}`,"i")))),P=G=>{B.val=G.target.value};return b({class:o`
          display: flex;
          flex-direction: column;
          gap: 0;
        `},p({autocomplete:"off",name:"component-search",autofocus:!0,value:B,placeholder:`Search ${M.val.length} components`,size:32,oninput:P}),()=>S({children:M.val,pathnameState:k,variant:D,color:A,size:N}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Resizable",href:"/components/resizable"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let y=!1;const f=ce(t);return function(){return r({bauMounted:({element:w})=>{i.innerWidth<=640&&(y=!0,s.drawerOpen.val=!1)},onclick:w=>{y&&!w.target.dataset.buttonback&&!w.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:o`
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
        `},f({tree:h}))}}const $o=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:s}=e.tags,i=Wt(t),r=Oo(t),c=He(t),l=Mo(t),u=a`
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
        `},r(),c(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>b.val),l())}};function Pt(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...m},b]=J(r);return a({...m,onclick:d,class:["chip",e.class,c,l,u,d&&"clickable",s,m.class]},b)}}function Po(t){const{bau:e,css:n,config:o}=t,{div:a,h1:s,h2:i,p:r}=e.tags;O(t);const c=n`
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
  `;return function({name:u,text:d,tagLine:m}){return a({class:c},s(u),i(d),r(m))}}function zo(t){const{bau:e,css:n}=t,{div:o,h1:a,p:s}=e.tags,i=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),s(l()));return function({featuresContent:l}){return o({class:i},l.map(r))}}function Ro({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:s,dd:i,div:r,aside:c,footer:l,a:u}=e.tags,d=({maxSize:m=151})=>({libName:b,size:p})=>r({class:n`
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
        `},c({class:n`
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
          `},"Bundle Size Comparison in kB"),a({class:n`
            display: flex;
            flex-direction: column;
          `},b.map(d({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function jo(t){const{bau:e,css:n,config:o}=t,{div:a,p:s,a:i,section:r}=e.tags,c=Po(t),l=zo(t),u=O(t);Pt(t);const d=Ro(t),m=(...y)=>a({class:n`
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
          `},y)),b=n``,p=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],g=[{title:"UI components for the web",Content:()=>[s("Over 50 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),m(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),m(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),m(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[s("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]}],h=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:g}),d({data:p}),h())}}function _o(t,e={}){const{bau:n,css:o}=t,{div:a,form:s,span:i,pre:r,h3:c,h4:l}=n.tags;return function(d,...m){return a("Login")}}const Uo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:s,h2:i}=n.tags,r=_o(t);return()=>o({id:"login"},i(e("Login Examples")),s("Basic"),a(r()))};function Go(t){const{tr:e,bau:n,css:o}=t,{div:a,article:s,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(e("Pages Examples")),Uo(t)()))}}function Fo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ve(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ve(n)}),t}class Ne{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Je(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function pt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Ho="</span>",Oe=t=>!!t.scope,Vo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Jo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Je(e)}openNode(e){if(!Oe(e))return;const n=Vo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){Oe(e)&&(this.buffer+=Ho)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Me=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class ue{constructor(){this.rootNode=Me(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Me({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{ue._collapse(n)}))}}class qo extends ue{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function It(t){return t?typeof t=="string"?t:t.source:null}function qe(t){return wt("(?=",t,")")}function Wo(t){return wt("(?:",t,")*")}function Ko(t){return wt("(?:",t,")?")}function wt(...t){return t.map(n=>It(n)).join("")}function Xo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function de(...t){return"("+(Xo(t).capture?"":"?:")+t.map(o=>It(o)).join("|")+")"}function We(t){return new RegExp(t.toString()+"|").exec("").length-1}function Zo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function me(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let s=It(o),i="";for(;s.length>0;){const r=Yo.exec(s);if(!r){i+=s;break}i+=s.substring(0,r.index),s=s.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?i+="\\"+String(Number(r[1])+a):(i+=r[0],r[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Qo=/\b\B/,Ke="[a-zA-Z]\\w*",pe="[a-zA-Z_]\\w*",Xe="\\b\\d+(\\.\\d+)?",Ze="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ye="\\b(0b[01]+)",ta="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ea=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=wt(e,/.*\b/,t.binary,/\b.*/)),pt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},Lt={begin:"\\\\[\\s\\S]",relevance:0},na={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Lt]},oa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Lt]},aa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Kt=function(t,e,n={}){const o=pt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=de("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:wt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ra=Kt("//","$"),sa=Kt("/\\*","\\*/"),ia=Kt("#","$"),ca={scope:"number",begin:Xe,relevance:0},la={scope:"number",begin:Ze,relevance:0},ua={scope:"number",begin:Ye,relevance:0},da={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Lt,{begin:/\[/,end:/\]/,relevance:0,contains:[Lt]}]},ma={scope:"title",begin:Ke,relevance:0},pa={scope:"title",begin:pe,relevance:0},ba={begin:"\\.\\s*"+pe,relevance:0},ga=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Vt=Object.freeze({__proto__:null,APOS_STRING_MODE:na,BACKSLASH_ESCAPE:Lt,BINARY_NUMBER_MODE:ua,BINARY_NUMBER_RE:Ye,COMMENT:Kt,C_BLOCK_COMMENT_MODE:sa,C_LINE_COMMENT_MODE:ra,C_NUMBER_MODE:la,C_NUMBER_RE:Ze,END_SAME_AS_BEGIN:ga,HASH_COMMENT_MODE:ia,IDENT_RE:Ke,MATCH_NOTHING_RE:Qo,METHOD_GUARD:ba,NUMBER_MODE:ca,NUMBER_RE:Xe,PHRASAL_WORDS_MODE:aa,QUOTE_STRING_MODE:oa,REGEXP_MODE:da,RE_STARTERS_RE:ta,SHEBANG:ea,TITLE_MODE:ma,UNDERSCORE_IDENT_RE:pe,UNDERSCORE_TITLE_MODE:pa});function ha(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function fa(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function va(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=ha,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function ya(t,e){Array.isArray(t.illegal)&&(t.illegal=de(...t.illegal))}function xa(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function wa(t,e){t.relevance===void 0&&(t.relevance=1)}const Sa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=wt(n.beforeMatch,qe(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Ca=["of","and","for","in","not","or","if","then","parent","list","value"],ka="keyword";function Qe(t,e,n=ka){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(s){Object.assign(o,Qe(t[s],e,s))}),o;function a(s,i){e&&(i=i.map(r=>r.toLowerCase())),i.forEach(function(r){const c=r.split("|");o[c[0]]=[s,Ea(c[0],c[1])]})}}function Ea(t,e){return e?Number(e):Ta(t)?0:1}function Ta(t){return Ca.includes(t.toLowerCase())}const Ie={},yt=t=>{console.error(t)},Le=(t,...e)=>{console.log(`WARN: ${t}`,...e)},Ct=(t,e)=>{Ie[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Ie[`${t}/${e}`]=!0)},qt=new Error;function tn(t,e,{key:n}){let o=0;const a=t[n],s={},i={};for(let r=1;r<=e.length;r++)i[r+o]=a[r],s[r+o]=!0,o+=We(e[r-1]);t[n]=i,t[n]._emit=s,t[n]._multi=!0}function Aa(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw yt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),qt;if(typeof t.beginScope!="object"||t.beginScope===null)throw yt("beginScope must be object"),qt;tn(t,t.begin,{key:"beginScope"}),t.begin=me(t.begin,{joinWith:""})}}function Da(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw yt("skip, excludeEnd, returnEnd not compatible with endScope: {}"),qt;if(typeof t.endScope!="object"||t.endScope===null)throw yt("endScope must be object"),qt;tn(t,t.end,{key:"endScope"}),t.end=me(t.end,{joinWith:""})}}function Ba(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Na(t){Ba(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Aa(t),Da(t)}function Oa(t){function e(i,r){return new RegExp(It(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=We(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=e(me(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,m)=>m>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(i){const r=new o;return i.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&r.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&r.addRule(i.illegal,{type:"illegal"}),r}function s(i,r){const c=i;if(i.isCompiled)return c;[fa,xa,Na,Sa].forEach(u=>u(i,r)),t.compilerExtensions.forEach(u=>u(i,r)),i.__beforeBegin=null,[va,ya,wa].forEach(u=>u(i,r)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=Qe(i.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),r&&(i.begin||(i.begin=/\B|\b/),c.beginRe=e(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=e(c.end)),c.terminatorEnd=It(c.end)||"",i.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(c.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ma(u==="self"?i:u)})),i.contains.forEach(function(u){s(u,c)}),i.starts&&s(i.starts,r),c.matcher=a(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=pt(t.classNameAliases||{}),s(t)}function en(t){return t?t.endsWithParent||en(t.starts):!1}function Ma(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return pt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:en(t)?pt(t,{starts:t.starts?pt(t.starts):null}):Object.isFrozen(t)?pt(t):t}var Ia="11.9.0";class La extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const ae=Je,$e=pt,Pe=Symbol("nomatch"),$a=7,nn=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:qo};function c(v){return r.noHighlightRe.test(v)}function l(v){let x=v.className+" ";x+=v.parentNode?v.parentNode.className:"";const T=r.languageDetectRe.exec(x);if(T){const E=B(T[1]);return E||(Le(s.replace("{}",T[1])),Le("Falling back to no-highlight mode for this block.",v)),E?T[1]:"no-highlight"}return x.split(/\s+/).find(E=>c(E)||B(E))}function u(v,x,T){let E="",_="";typeof x=="object"?(E=v,T=x.ignoreIllegals,_=x.language):(Ct("10.7.0","highlight(lang, code, ...args) has been deprecated."),Ct("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),_=v,E=x),T===void 0&&(T=!0);const R={code:E,language:_};$("before:highlight",R);const V=R.result?R.result:d(R.language,R.code,T);return V.code=R.code,$("after:highlight",V),V}function d(v,x,T,E){const _=Object.create(null);function R(L,j){return L.keywords[j]}function V(){if(!q.keywords){st.addText(et);return}let L=0;q.keywordPatternRe.lastIndex=0;let j=q.keywordPatternRe.exec(et),K="";for(;j;){K+=et.substring(L,j.index);const Y=at.case_insensitive?j[0].toLowerCase():j[0],it=R(q,Y);if(it){const[mt,to]=it;if(st.addText(K),K="",_[Y]=(_[Y]||0)+1,_[Y]<=$a&&(Ft+=to),mt.startsWith("_"))K+=j[0];else{const eo=at.classNameAliases[mt]||mt;X(j[0],eo)}}else K+=j[0];L=q.keywordPatternRe.lastIndex,j=q.keywordPatternRe.exec(et)}K+=et.substring(L),st.addText(K)}function U(){if(et==="")return;let L=null;if(typeof q.subLanguage=="string"){if(!e[q.subLanguage]){st.addText(et);return}L=d(q.subLanguage,et,!0,Ee[q.subLanguage]),Ee[q.subLanguage]=L._top}else L=b(et,q.subLanguage.length?q.subLanguage:null);q.relevance>0&&(Ft+=L.relevance),st.__addSublanguage(L._emitter,L.language)}function I(){q.subLanguage!=null?U():V(),et=""}function X(L,j){L!==""&&(st.startScope(j),st.addText(L),st.endScope())}function tt(L,j){let K=1;const Y=j.length-1;for(;K<=Y;){if(!L._emit[K]){K++;continue}const it=at.classNameAliases[L[K]]||L[K],mt=j[K];it?X(mt,it):(et=mt,V(),et=""),K++}}function W(L,j){return L.scope&&typeof L.scope=="string"&&st.openNode(at.classNameAliases[L.scope]||L.scope),L.beginScope&&(L.beginScope._wrap?(X(et,at.classNameAliases[L.beginScope._wrap]||L.beginScope._wrap),et=""):L.beginScope._multi&&(tt(L.beginScope,j),et="")),q=Object.create(L,{parent:{value:q}}),q}function Q(L,j,K){let Y=Zo(L.endRe,K);if(Y){if(L["on:end"]){const it=new Ne(L);L["on:end"](j,it),it.isMatchIgnored&&(Y=!1)}if(Y){for(;L.endsParent&&L.parent;)L=L.parent;return L}}if(L.endsWithParent)return Q(L.parent,j,K)}function nt(L){return q.matcher.regexIndex===0?(et+=L[0],1):(ee=!0,0)}function rt(L){const j=L[0],K=L.rule,Y=new Ne(K),it=[K.__beforeBegin,K["on:begin"]];for(const mt of it)if(mt&&(mt(L,Y),Y.isMatchIgnored))return nt(j);return K.skip?et+=j:(K.excludeBegin&&(et+=j),I(),!K.returnBegin&&!K.excludeBegin&&(et=j)),W(K,L),K.returnBegin?0:j.length}function ct(L){const j=L[0],K=x.substring(L.index),Y=Q(q,L,K);if(!Y)return Pe;const it=q;q.endScope&&q.endScope._wrap?(I(),X(j,q.endScope._wrap)):q.endScope&&q.endScope._multi?(I(),tt(q.endScope,L)):it.skip?et+=j:(it.returnEnd||it.excludeEnd||(et+=j),I(),it.excludeEnd&&(et=j));do q.scope&&st.closeNode(),!q.skip&&!q.subLanguage&&(Ft+=q.relevance),q=q.parent;while(q!==Y.parent);return Y.starts&&W(Y.starts,L),it.returnEnd?0:j.length}function lt(){const L=[];for(let j=q;j!==at;j=j.parent)j.scope&&L.unshift(j.scope);L.forEach(j=>st.openNode(j))}let ut={};function Z(L,j){const K=j&&j[0];if(et+=L,K==null)return I(),0;if(ut.type==="begin"&&j.type==="end"&&ut.index===j.index&&K===""){if(et+=x.slice(j.index,j.index+1),!a){const Y=new Error(`0 width match regex (${v})`);throw Y.languageName=v,Y.badRule=ut.rule,Y}return 1}if(ut=j,j.type==="begin")return rt(j);if(j.type==="illegal"&&!T){const Y=new Error('Illegal lexeme "'+K+'" for mode "'+(q.scope||"<unnamed>")+'"');throw Y.mode=q,Y}else if(j.type==="end"){const Y=ct(j);if(Y!==Pe)return Y}if(j.type==="illegal"&&K==="")return 1;if(te>1e5&&te>j.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=K,K.length}const at=B(v);if(!at)throw yt(s.replace("{}",v)),new Error('Unknown language: "'+v+'"');const Gt=Oa(at);let Qt="",q=E||Gt;const Ee={},st=new r.__emitter(r);lt();let et="",Ft=0,ft=0,te=0,ee=!1;try{if(at.__emitTokens)at.__emitTokens(x,st);else{for(q.matcher.considerAll();;){te++,ee?ee=!1:q.matcher.considerAll(),q.matcher.lastIndex=ft;const L=q.matcher.exec(x);if(!L)break;const j=x.substring(ft,L.index),K=Z(j,L);ft=L.index+K}Z(x.substring(ft))}return st.finalize(),Qt=st.toHTML(),{language:v,value:Qt,relevance:Ft,illegal:!1,_emitter:st,_top:q}}catch(L){if(L.message&&L.message.includes("Illegal"))return{language:v,value:ae(x),illegal:!0,relevance:0,_illegalBy:{message:L.message,index:ft,context:x.slice(ft-100,ft+100),mode:L.mode,resultSoFar:Qt},_emitter:st};if(a)return{language:v,value:ae(x),illegal:!1,relevance:0,errorRaised:L,_emitter:st,_top:q};throw L}}function m(v){const x={value:ae(v),illegal:!1,relevance:0,_top:i,_emitter:new r.__emitter(r)};return x._emitter.addText(v),x}function b(v,x){x=x||r.languages||Object.keys(e);const T=m(v),E=x.filter(B).filter(P).map(I=>d(I,v,!1));E.unshift(T);const _=E.sort((I,X)=>{if(I.relevance!==X.relevance)return X.relevance-I.relevance;if(I.language&&X.language){if(B(I.language).supersetOf===X.language)return 1;if(B(X.language).supersetOf===I.language)return-1}return 0}),[R,V]=_,U=R;return U.secondBest=V,U}function p(v,x,T){const E=x&&n[x]||T;v.classList.add("hljs"),v.classList.add(`language-${E}`)}function g(v){let x=null;const T=l(v);if(c(T))return;if($("before:highlightElement",{el:v,language:T}),v.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",v);return}if(v.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(v)),r.throwUnescapedHTML))throw new La("One of your code blocks includes unescaped HTML.",v.innerHTML);x=v;const E=x.textContent,_=T?u(E,{language:T,ignoreIllegals:!0}):b(E);v.innerHTML=_.value,v.dataset.highlighted="yes",p(v,T,_.language),v.result={language:_.language,re:_.relevance,relevance:_.relevance},_.secondBest&&(v.secondBest={language:_.secondBest.language,relevance:_.secondBest.relevance}),$("after:highlightElement",{el:v,result:_,text:E})}function h(v){r=$e(r,v)}const y=()=>{w(),Ct("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function f(){w(),Ct("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function w(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(g)}function k(){S&&w()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",k,!1);function D(v,x){let T=null;try{T=x(t)}catch(E){if(yt("Language definition for '{}' could not be registered.".replace("{}",v)),a)yt(E);else throw E;T=i}T.name||(T.name=v),e[v]=T,T.rawDefinition=x.bind(null,t),T.aliases&&M(T.aliases,{languageName:v})}function A(v){delete e[v];for(const x of Object.keys(n))n[x]===v&&delete n[x]}function N(){return Object.keys(e)}function B(v){return v=(v||"").toLowerCase(),e[v]||e[n[v]]}function M(v,{languageName:x}){typeof v=="string"&&(v=[v]),v.forEach(T=>{n[T.toLowerCase()]=x})}function P(v){const x=B(v);return x&&!x.disableAutodetect}function G(v){v["before:highlightBlock"]&&!v["before:highlightElement"]&&(v["before:highlightElement"]=x=>{v["before:highlightBlock"](Object.assign({block:x.el},x))}),v["after:highlightBlock"]&&!v["after:highlightElement"]&&(v["after:highlightElement"]=x=>{v["after:highlightBlock"](Object.assign({block:x.el},x))})}function F(v){G(v),o.push(v)}function z(v){const x=o.indexOf(v);x!==-1&&o.splice(x,1)}function $(v,x){const T=v;o.forEach(function(E){E[T]&&E[T](x)})}function C(v){return Ct("10.7.0","highlightBlock will be removed entirely in v12.0"),Ct("10.7.0","Please use highlightElement now."),g(v)}Object.assign(t,{highlight:u,highlightAuto:b,highlightAll:w,highlightElement:g,highlightBlock:C,configure:h,initHighlighting:y,initHighlightingOnLoad:f,registerLanguage:D,unregisterLanguage:A,listLanguages:N,getLanguage:B,registerAliases:M,autoDetection:P,inherit:$e,addPlugin:F,removePlugin:z}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=Ia,t.regex={concat:wt,lookahead:qe,either:de,optional:Ko,anyNumberOfTimes:Wo};for(const v in Vt)typeof Vt[v]=="object"&&Ve(Vt[v]);return Object.assign(t,Vt),t},Et=nn({});Et.newInstance=()=>nn({});var Pa=Et;Et.HighlightJS=Et;Et.default=Et;const Mt=Fo(Pa),ze="[A-Za-z$_][0-9A-Za-z$_]*",za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ra=["true","false","null","undefined","NaN","Infinity"],on=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],an=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],rn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ja=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],_a=[].concat(rn,on,an);function sn(t){const e=t.regex,n=(x,{after:T})=>{const E="</"+x[0].slice(1);return x.input.indexOf(E,T)!==-1},o=ze,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(x,T)=>{const E=x[0].length+x.index,_=x.input[E];if(_==="<"||_===","){T.ignoreMatch();return}_===">"&&(n(x,{after:E})||T.ignoreMatch());let R;const V=x.input.substring(E);if(R=V.match(/^\s*=/)){T.ignoreMatch();return}if((R=V.match(/^\s+extends\s+/))&&R.index===0){T.ignoreMatch();return}}},r={$pattern:ze,keyword:za,literal:Ra,built_in:_a,"variable.language":ja},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},m={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"xml"}},p={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,m]},f={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},S=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,p,g,h,{match:/\$\d+/},d];m.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const w=[].concat(f,m.contains),k=w.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(w)}]),D={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},N={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...on,...an]}},B={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},M={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},P={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function G(x){return e.concat("(?!",x.join("|"),")")}const F={match:e.concat(/\b/,G([...rn,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},z={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},$={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",v={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:N},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),B,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,p,g,h,f,{match:/\$\d+/},d,N,{className:"attr",begin:o+e.lookahead(":"),relevance:0},v,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[f,t.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},M,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},z,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},F,P,A,$,{match:/\$[(.]/}]}}function Ua(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ga=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return Mt.registerLanguage("javascript",sn),Mt.registerLanguage("sh",Ua),function({text:i,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Mt.highlight(i,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function Fa(t){const{bau:e,css:n}=t,{article:o,h1:a,p:s,code:i,a:r,ul:c,li:l}=e.tags,u=Ga(t);return function(){return o({class:n`
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
)`}),s("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),s("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function be(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["paper",c,s,e==null?void 0:e.class,d==null?void 0:d.class]},m)}}function cn(t,e={}){const{bau:n,css:o,window:a}=t,{nav:s,ul:i,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=e,u=n.state("no"),d=(h,y)=>{let f=null;return(...S)=>{a.clearTimeout(f),f=a.setTimeout(()=>h(...S),y)}},m=o`
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
  `,b=({value:h,id:y,children:f=[]})=>{const S=c({class:()=>u.val==y?"active":"",href:`#${y}`});return S.innerHTML=h,r({class:()=>u.val==y?"active":""},S,f.length>0&&i(f.map(b)))},p=h=>h.tagName.charAt(1),g=({contentEl:h})=>{const y=h.querySelectorAll(l);let f=2,S={},w={children:[]},k=w;const D=k;let A=[k];return[...y].forEach(N=>{const B=p(N);N.setAttribute("id",N.textContent),!N.innerHTML.includes("<button")&&(S={value:N.innerHTML,id:N.id??N.textContent,children:[]},f==B?(w=S,k.children.push(w)):f<B?(A.push(k),k=w,w.children.push(S),w=S):f>B&&(k=A[B-1],A=A.slice(0,B-1),k.children.push(S),w=S),f=B)}),D};return function(...y){let[{size:f=e.size??"md",variant:S=e.variant??"plain",color:w=e.color??"neutral",contentEl:k,...D}]=J(y);const A=g({contentEl:k}),N=d(()=>{const M=[...k.querySelectorAll(l)].find(P=>{const{top:G,height:F}=P.getBoundingClientRect();if(G+F>60)return!0});M&&(u.val=M==null?void 0:M.id)},100);return s({...D,class:["tableOfContent",f,S,w,m,e==null?void 0:e.class,D==null?void 0:D.class],bauMounted:()=>{a.addEventListener("scroll",N)},bauUnmounted:()=>{a.removeEventListener("scroll",N)}},A.children&&i(A.children.map(b)))}}const ln=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:s,tr:i,td:r,thead:c,th:l}=e.tags;return function({Item:d,name:m}){return o({class:n`
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
        `},a(c(i(l(m??""),ot.map(b=>l(b)))),s(To.map(b=>i(l(b),ot.map((p,g)=>r(d({color:p,variant:b},{index:g}))))))))}},Ha=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:s}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Ao.map((i,r)=>s(t,{size:i})({color:"success",variant:"outline"},{size:i,index:r})))}},H=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:s,h1:i,p:r,h2:c,h3:l,pre:u,code:d}=e.tags;Mt.registerLanguage("javascript",sn);const m=cn(t),b=be(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),p=ln(t),g=Ha(t),h=({text:y})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=Mt.highlight(y,{language:"js"}).value}}));return function(f){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(f.title),r(f.description),f.gridItem&&!f.variantColorTableDisable&&[c("Variant/Color"),b(p({Item:f.gridItem(t)}))],f.gridItem&&!f.variantSizeDisable&&[c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b(g({item:f.gridItem}))],c("Usage"),l("Import"),h({text:f.importStatement}),c("Examples"),f.examples.map(w=>s(l(w.title),r(w.description),b(w.createComponent(t)({})),h({text:w.code}))));return o({class:n`
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
        `},S,m({contentEl:S}))}};function ge(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",Header:p,Content:g,expanded:h=!1,...y}]=J(u);const f=n.state(!h);return a({...y,class:["collapsible",d,s,e==null?void 0:e.class,y==null?void 0:y.class]},a({class:()=>["header",g?f.val?"close":"open":""],onclick:S=>{f.val=!f.val,S.stopPropagation()}},p()),a({class:"content",role:"region",bauMounted:({element:S})=>{f.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(i({element:S,closeState:f}),!f.val)},g&&g()))}}const Va=()=>ot.map(t=>`
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
`);function Xt(t,e={}){const{bau:n,css:o}=t,{div:a,ul:s,li:i,h3:r,button:c}=n.tags,l=o`
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
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"plain",color:p=e.color??"neutral",data:g=[],...h}]=J(d);const y=n.state(""),f=ge(t,{size:m,variant:b,color:p}),S=k=>D=>{y.val==k?y.val="":y.val=k},w=k=>{const{Header:D,Content:A,name:N}=k,B=()=>r({class:()=>y.val==N&&"active"},c({type:"button","aria-controls":`bau-${N}`,"aria-expanded":({element:P})=>y.val==N},D(k))),M=()=>a({id:`bau-${N}`,"data-state":({element:P})=>y.val==N},A(k));return i({class:[p,b,m],onclick:S(N)},f({Header:B,Content:M}))};return a({class:["accordion",l,e==null?void 0:e.class,h.class]},s(g.map(w)))}}const un=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Xt(t,e);return r=>i({...r,data:s})},Ja=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Xt(t,{color:"neutral",variant:"outline"});return()=>a(i({data:s}))},qa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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

  return () => {
    return section(Accordion({ data: accordionDefs }));
  };
};
`,dn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Wa=t=>{const{css:e}=t,n=dn(t),o=Xt(t,{color:"warning",class:e`
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

  return () => {
    return Accordion({
      data: accordionDefs,
    });
  };
};
`,Xa=t=>{const{css:e}=t,n=dn(t),o=Xt(t,{color:"success",variant:"outline",class:e`
      &.accordion {
        & ul {
          & li {
            .header {
              justify-content: space-between;
              &.close::before {
                content: none;
                width: 0;
              }
              &.open::before {
                content: "";
                width: 0;
              }
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
            .header {
              justify-content: space-between;
              &.close::before {
                content: none;
                width: 0;
              }
              &.open::before {
                content: "";
                width: 0;
              }
              &::after {
                padding: 0.5rem;
                transition: transform var(--transition-fast) linear;
                line-height: 1rem;
              }
              &.close::after {
                content: "\\u203A";
                padding: 0.5rem;
              }
              &.open::after {
                content: "\\u203A";
                padding: 0.5rem;
                transform: rotate(90deg);
              }
            }
          }
        }
      }
    \`,
  });

  return () => {
    return Accordion({
      data: accordionDefs,
    });
  };
};
`,Ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:qa,createComponent:Ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ka,createComponent:Wa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:Xa}],gridItem:un},Qa=t=>{const e=H(t);return()=>e(Ya)},tr={danger:"⚠",warning:"⚠",success:"✔",primary:"ⓘ",neutral:"ⓘ"},er=()=>ot.map(t=>`
&.alert {
  &.plain.${t} {
    & .icon {
      color: var(--color-${t});
      
    }
  }
  &.outline.${t} {
    & .icon {
      color: var(--color-${t});
    }
    border: 2px solid var(--color-${t});
  }
}
  `).join(`
`);function At(t,e={}){const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=o`
    display: inline-flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
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
  `,r=O(t),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",onRemove:p,...g},h]=J(u);return a({...g,class:["alert",`alert-${m}`,e.class,m,b,d,i,g.class],role:"alert"},s({class:"icon"},tr[b]),a({class:"content"},h),p&&c({onclick:p}))}}const mn=(t,e)=>{const n=At(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},nr=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=At(t,{color:"danger"});return()=>a(n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},or=`import alert from "@grucloud/bau-ui/alert";
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
`,ar=t=>{const{css:e}=t,n=At(t,{color:"warning",class:e`
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
`,sr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:or,createComponent:nr},{title:"Custom Alert ",description:"A custom alert.",code:rr,createComponent:ar}],gridItem:mn},ir=t=>{const e=H(t);return()=>e(sr)},cr=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:s=10,deleteAfterDuration:i=15e3}=e,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:m,status:b})=>{const p=c.val.findIndex(g=>g.id===m);p!=-1&&(c.val[p].status=b)};return function(b={}){const p=({id:y})=>{d({id:y,status:"removing"});const f=c.val.findIndex(S=>S.id===y);f!=-1&&c.val.splice(f,1)},g=({Component:y})=>{const f={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};c.val.length>=s&&p({id:c.val[0].id}),c.val.push(f),setTimeout(()=>p(f),i)},h=y=>r({class:u.item,onclick:()=>p(y)},y.Component());return document.addEventListener("alert.add",y=>g(y.detail)),document.addEventListener("alert.remove",y=>p(y.detail)),r({class:[u.stack,e==null?void 0:e.class,b.class]},n.loop(c,r(),h))}},lr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=cr(t,{deleteAfterDuration:2e4}),s=O(t),i=At(t);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},ur=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import alert from "@grucloud/bau-ui/alert";
import alertStack from "@grucloud/bau-ui/alertStack";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section } = bau.tags;

  const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
  const Button = button(context);
  const Alert = alert(context);

  return () => {
    return section(
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
};
`,dr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ur,createComponent:lr}]},mr=t=>{const e=H(t);return()=>e(dr)},pr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,s=Wt(t),i=O(t),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `;return()=>{const c=e.state(!0);return o(i({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),s({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))}},br=`import animate from "@grucloud/bau-ui/animate";
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

  return () => {
    const showState = bau.state(true);

    return section(
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
};
`,gr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:s,label:i}=e.tags,r=Wt(t),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l={one:()=>a("ONE"),two:()=>a("TWO")};return()=>{const u=e.state("one"),d=({target:m})=>u.val=m.id;return o(i("One",s({type:"radio",id:"one",name:"radio",checked:!0,value:u,oninput:d})),i("Two",s({type:"radio",id:"two",name:"radio",value:u,oninput:d})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>l[u.val]()))}},hr=`import animate from "@grucloud/bau-ui/animate";
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

  const routeMap: any = {
    //
    one: () => div("ONE"),
    two: () => div("TWO"),
  };

  return () => {
    const checkedState = bau.state("one");
    const oninput = ({ target }: { target: HTMLInputElement }) =>
      (checkedState.val = target.id);

    return section(
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
};
`,fr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:br,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:hr,createComponent:gr}]},vr=t=>{const e=H(t);return()=>e(fr)};function Tt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=a`
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
  `;return function(...l){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",...b},p]=J(l);return s({...b,class:["skeleton",u,r,e==null?void 0:e.class,b==null?void 0:b.class]},p)}}function he(t,e={}){const{bau:n,css:o}=t,{div:a,img:s}=n.tags,i=n.state(!0),r=n.state(!1),c=()=>i.val=!1,l=d=>{i.val=!1,r.val=!0},u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",width:h=40,height:y=40,alt:f,...S},w]=J(m);const k=Tt(t,{class:[o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${y}px;
          width: ${h}px;
        `,e==null?void 0:e.class,S.class]});return a({class:[u,e==null?void 0:e.class,S.class]},()=>i.val&&k(),()=>r.val&&f,s({alt:f,width:h,height:y,onload:c,onerror:l,class:()=>[!i.val&&"visible",r.val&&"hide",g,p,b,u,e==null?void 0:e.class,S.class],...S}))}}const pn=(t,e)=>{const{css:n}=t,o=he(t,{...e,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},yr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=he(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},xr=`import avatar from "@grucloud/bau-ui/avatar";
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

  return () => {
    return section(
      Avatar({
        src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
        alt: "my avatar",
      })
    );
  };
};
`,wr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=he(t,{class:n`
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

  return () => {
    return section(
      Avatar({
        src: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",
        alt: "My Avatar",
      })
    );
  };
};
`,Cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:xr,createComponent:yr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:Sr,createComponent:wr}],gridItem:pn},kr=t=>{const e=H(t);return()=>e(Cr)};function zt(t,e){const{bau:n,css:o,window:a}=t,{dialog:s}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...c){let[{contentEl:l,triggerEl:u,onClose:d,...m},...b]=J(c);const p=y=>{h.style.opacity=1,h.showModal();const f=u.getBoundingClientRect(),S=h.getBoundingClientRect();f.x<a.innerWidth/2?h.style.left=f.left+"px":h.style.left=f.right-S.width+"px",f.y<a.innerHeight/2?(h.style.top=f.top+f.height+"px",h.style.height=Math.min(h.scrollHeight,a.innerHeight-f.top-f.height)+"px"):(h.style.top=Math.max(0,f.top-S.height)+"px",h.scrollHeight>f.top&&(h.style.height=f.top+"px"))},g=y=>{const f=()=>{h.close(),h.removeEventListener("transitionend",f)};h.addEventListener("transitionend",f),h.style.opacity=0},h=s({role:"presentation",class:["popover",i,e==null?void 0:e.class,m==null?void 0:m.class],onclick:y=>{y.target===h&&(g(),d==null||d.call())}},l);return h.closeDialog=g,h.openDialog=p,h}}const Jt={sm:12,md:16,lg:24},Er=()=>ot.map(t=>`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:m=e.variant??"outline",visibility:b=!0,...p}={}){const g=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Jt[u]};
      height: ${Jt[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${Er()}
    `;return s({class:{deps:[b],renderProp:()=>h=>["spinner",g,d,m,h==!1?"":"visibility",e==null?void 0:e.class,p.class]},version:"1.1",x:"0px",y:"0px",width:Jt[u],height:Jt[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...p},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Tr=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Rt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=o`
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
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:m,placeholder:b,Option:p,options:g,defaultOption:h,getOptionLabel:y,getOptionValue:f,onSelect:S=()=>{},id:w,required:k,name:D,loading:A,...N},B]=J(c);const M=zt(t),P=O(t),G=dt(t,{variant:u,color:d,size:l}),F=xt(t),z=bt(t,{variant:u,color:d,size:l}),$=n.state(h),C=n.state(N.value),v=n.state(!1),x=n.state(0),T=()=>{v.val=!1},E=n.state(g),_=Z=>at=>Z.val&&y(at)==y(Z.val),R=()=>{ut.openDialog(),v.val=!0,C.val="",E.val=g,x.val=g.findIndex(_($));const Z=lt.querySelector("li.selected");Z&&(Z.scrollIntoView({block:"center"}),rt.scrollIntoView({block:"end"}))},V=()=>{ut.closeDialog(),v.val=!1,x.val=0},U=Z=>{const{value:at}=Z.target;C.val=at,at?E.val=g.filter(Gt=>y(Gt).match(new RegExp(`${at}`,"i"))):E.val=g},I=Z=>{ut.open?V():R()},X=Z=>{$.val=Z,ct.value=f(Z)},tt=({option:Z,index:at})=>Gt=>{X(Z),x.val=at,V()},W=()=>{const Z=lt.querySelector("li.active");Z&&Z.scrollIntoView({block:"center",behavior:"smooth"})},Q=Z=>{switch(Z.key){case"Escape":V();break;case"ArrowDown":x.val<E.val.length-1?x.val++:x.val=0,W();break;case"ArrowUp":x.val<=0?x.val=E.val.length-1:x.val--,W();break;case"Enter":ut.open?(X(E.val[x.val]),V()):R(),Z.preventDefault();break}},nt=P({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":v,"aria-label":m,onclick:I,variant:u,color:d,size:l,class:A==!0&&"loading",disabled:A},()=>$.val?y($.val):m,()=>A==!0&&z({visibility:A})),rt=G({value:C,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":v,oninput:U,onkeydown:Q,...N}),ct=G({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:h&&f(h),required:k,"aria-hidden":!1,"aria-label":D,name:D}),lt=a({class:[u,d,l,"content"]},rt,()=>F({class:[u,d,l]},E.val.map((Z,at)=>s({class:()=>[x.val==at&&"active",_($)(Z)&&"selected"],onclick:tt({option:Z,index:at})},p(Z))))),ut=M({id:w,triggerEl:nt,contentEl:lt,onClose:T,class:o`
        overflow: hidden;
      `});return a({...N,class:["autocomplete",i,e==null?void 0:e.class,N==null?void 0:N.class]},n.bind({deps:[$],render:()=>Z=>{Z&&(ct.value=f(Z),S(Z))}}),nt,ct,ut)}}const bn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Rt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return l=>i({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",name:"country","aria-label":"country"})},Ar=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Dr=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:s,article:i,footer:r}=e.tags,c=Rt(t),l=O(t,{variant:"outline",color:"primary"}),u=d=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(d.label),a(d.code));return()=>s({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},i(c({options:Ar,Option:u,getOptionValue:({code:m})=>m,getOptionLabel:({label:m})=>m,label:"Country",placeholder:"Search countries",name:"country"})),r(l({type:"submit"},"Submit")))},Br=`import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

const options = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { div, span, form, article, footer } = bau.tags;

  const Autocomplete = autocomplete(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,Nr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,c=Rt(t),l=O(t,{variant:"outline",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],m=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(b.label),r(b.code));return()=>o({onsubmit:p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(g))}},a(c({options:d,Option:m,defaultOption:d.find(({code:p})=>p==u),getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",name:"country"})),s(l({type:"submit"},"Submit")))},Or=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,Mr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,c=O(t,{variant:"outline"}),l=O(t,{variant:"solid",color:"primary"}),u=Rt(t),d=m=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(m.flag),r(m.name.common));return()=>{const m=e.state([]),b=e.state(!1),p=e.state("");async function g({url:f,transform:S=w=>w}){try{b.val=!0;const w=await fetch(f,{});if(w.ok){const k=await w.json();m.val=S(k)}else p.val=w.statusText}catch(w){p.val=w.message}finally{b.val=!1}}const h=()=>g({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:f=>f.sort((S,w)=>S.name.common.localeCompare(w.name.common))});return h(),o({onsubmit:f=>{f.preventDefault();const S=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(S))}},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({options:m.val,Option:d,getOptionValue:({name:f})=>f.common,getOptionLabel:({name:f})=>f.common,label:"Country",placeholder:"Search countries",name:"country",loading:b.val}),c({onclick:h},"Reload")),s(l({type:"submit"},"Submit")))}},Ir=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, div, span } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });
  const Autocomplete = autocomplete(context);

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

  return () => {
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
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,Lr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,c=Rt(t),l=O(t,{variant:"outline",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],d=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(b.label),r(b.code)),m="country";return()=>{const b=f=>{f.preventDefault();const S=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(S))},g=new URLSearchParams(window.location.search).get("country"),h=({code:f})=>f,y=f=>{const S=new URLSearchParams(window.location.search);S.delete(m),S.append(m,h(f)),window.history.replaceState("","",`?${S.toString()}${window.location.hash}`)};return o({onsubmit:b},a(c({name:m,options:u,Option:d,defaultOption:u.find(({code:f})=>f==g),getOptionValue:({code:f})=>f,getOptionLabel:({label:f})=>f,label:"Country",placeholder:"Search countries",onSelect:y})),s(l({type:"submit"},"Submit")))}},$r=`import { Context } from "@grucloud/bau-ui/context";
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

  const autocompleteName = "country";

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    const search = new URLSearchParams(window.location.search);
    const defaultCode = search.get("country");

    const getOptionValue = ({ code }: any) => code;

    const onSelect = (option: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(autocompleteName);
      search.append(autocompleteName, getOptionValue(option));
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    return form(
      { onsubmit },
      article(
        Autocomplete({
          name: autocompleteName,
          options,
          Option,
          defaultOption: options.find(({ code }) => code == defaultCode),
          getOptionValue: ({ code }: any) => code,
          getOptionLabel: ({ label }: any) => label,
          label: "Country",
          placeholder: "Search countries",
          onSelect,
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Pr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Br,createComponent:Dr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ir,createComponent:Mr},{title:"Default Option",description:"A autocomplete with a default option.",code:Or,createComponent:Nr},{title:"URL State",description:"A autocomplete with the state in the URL",code:$r,createComponent:Lr}],gridItem:bn},zr=t=>{const e=H(t);return()=>e(Pr)};function gn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},b]=J(r);return a({...m,class:["badge",s,e==null?void 0:e.class,m==null?void 0:m.class]},a({class:[u,l,c]},d),b)}}const hn=(t,e)=>{const n=gn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Rr=t=>{const{bau:e}=t,{section:n}=e.tags,o=gn(t);return()=>n(o({content:"10"},"☏"))},jr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => {
    return section(Badge({ content: "10" }, "\\u260F"));
  };
};
`,_r={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:jr,createComponent:Rr}],gridItem:hn},Ur=t=>{const e=H(t);return()=>e(_r)};function fe(t,e={}){const{bau:n,css:o,config:a}=t,{ul:s,li:i,span:r}=n.tags,{separator:c="〉"}=e,l=O(t),u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",items:h,...y},f]=J(m);return s({...y,class:[u,e==null?void 0:e.class,y==null?void 0:y.class]},h.map(({href:S,name:w})=>i((S!=null?l:r)({href:`${a.base}${S}`,color:g,variant:p,size:b,class:[g,p,b]},w))))}}const fn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=fe(t,e);return a=>o({...a,...n})},Gr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=fe(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},Fr=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    return section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
  };
};
`,Hr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=fe(t,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Vr=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    return section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
  };
};
`,Jr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Fr,createComponent:Gr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Vr,createComponent:Hr}],gridItem:fn},qr=t=>{const e=H(t);return()=>e(Jr)},vn=(t,e={})=>{const n=O(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Wr=t=>{const{bau:e}=t,{section:n}=e.tags,o=O(t,{color:"primary",variant:"outline"});return()=>n(o({onclick:()=>{alert("Click")}},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context, { color: "primary", variant: "outline" });

  return () => {
    const onclick = () => {
      alert("Click");
    };

    return section(
      //
      Button({ onclick }, "Click me")
    );
  };
};
`,Xr=t=>{const{bau:e}=t,{section:n}=e.tags,o=O(t,{color:"primary",variant:"outline"});return()=>n(o({disabled:!0,onclick:()=>{alert("Click")}},"Click me"))},Zr=`import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context, { color: "primary", variant: "outline" });

  return () => {
    const onclick = () => {
      alert("Click");
    };

    return section(
      //
      Button({ disabled: true, onclick }, "Click me")
    );
  };
};
`,Yr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Kr,createComponent:Wr},{title:"Disabled Button",description:"A disabled button.",code:Zr,createComponent:Xr}],gridItem:vn},Qr=t=>{const e=H(t);return()=>e(Yr)},ts=()=>ot.map(t=>`
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
`);function ve(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
    ${ts()}
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["button-group",l,u,c,s,e==null?void 0:e.class,d==null?void 0:d.class]},m)}}const yn=(t,e)=>{const n=["ONE","TWO","THREE"],o=O(t,e),a=ve(t,e);return s=>a({...s},n.map(i=>o(s,i)))},es=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a="primary",s="solid",i=O(t,{color:a,variant:s}),r=ve(t,{color:a,variant:s});return()=>{const c=l=>u=>{alert(l)};return n(r(o.map(l=>i({onclick:c(l)},l))))}},ns=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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

  return () => {
    const onClick = (group: string) => (_event: any) => {
      alert(group);
    };

    return section(
      ButtonGroup(
        groups.map((group) => Button({ onclick: onClick(group) }, group))
      )
    );
  };
};
`,os={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:ns,createComponent:es}],gridItem:yn},as=t=>{const e=H(t);return()=>e(os)};function ye(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${ot.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`)}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},b]=J(c);return a({...m,type:"date",class:["calendar",i,d,u,l,e==null?void 0:e.class,m==null?void 0:m.class]},b)}}const xn=(t,e)=>{const n=ye(t,e),o=({props:a={},options:s={}})=>`myinput-gallery-${a.color??s.color}-${a.variant??s.variant}-${a.size??s.size}`;return a=>n({"aria-label":o({props:a,options:e}),...a})},rs=t=>{const{bau:e}=t,{form:n,footer:o,article:a,label:s}=e.tags,i=ye(t),r=O(t,{variant:"outline",color:"primary"});return()=>n({onsubmit:l=>{l.preventDefault();const u=Object.fromEntries(new FormData(l.currentTarget));alert(JSON.stringify(u))}},a(s("Start date:",i({name:"start",min:"2023-01-01",max:"2024-12-31",required:!0}))),o(r({type:"submit"},"Submit")))},ss=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import calendar from "@grucloud/bau-ui/calendar";

export default (context: Context) => {
  const { bau } = context;
  const { form, footer, article, label } = bau.tags;

  const Calendar = calendar(context);
  const ButtonSubmit = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        label(
          "Start date:",
          Calendar({
            name: "start",
            min: "2023-01-01",
            max: "2024-12-31",
            required: true,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,is=t=>{const{bau:e}=t,{form:n,footer:o,article:a,label:s}=e.tags,i=ye(t),r=O(t,{variant:"outline",color:"primary"});return()=>{const c=e.state("2023-08-08");return n({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))}},a(s("Start date:",i({name:"start",min:"2023-01-01",max:"2024-12-31",oninput:u=>{c.val=u.target.value}}))),o(r({type:"submit"},"Submit")))}},cs=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import calendar from "@grucloud/bau-ui/calendar";

export default (context: Context) => {
  const { bau } = context;
  const { form, footer, article, label } = bau.tags;

  const Calendar = calendar(context);
  const ButtonSubmit = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const calendarState = bau.state("2023-08-08");

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        label(
          "Start date:",
          Calendar({
            name: "start",
            min: "2023-01-01",
            max: "2024-12-31",
            oninput: (event: any) => {
              calendarState.val = event.target.value;
            },
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,ls={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Uncontrolled Calendar",description:"A simple calendar.",code:ss,createComponent:rs},{title:"Controlled Calendar",description:"A controlled calendar.",code:cs,createComponent:is}],gridItem:xn},us=t=>{const e=H(t);return()=>e(ls)};function ds(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=n.state(0);return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:m,Slide:b,Previous:p,Next:g,...h}]=J(c);const y=()=>{i.val<=0?i.val=m.length-1:i.val--},f=()=>{i.val>=m.length-1?i.val=0:i.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},m.map(b));return a({...h,class:["carousel",l,s,e==null?void 0:e.class,h==null?void 0:h.class]},a({class:["control","control-previous"],onclick:y},p()),a({class:["control","control-next"],onclick:f},g()),S)}}const ms=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],ps=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,s=O(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),r=ds(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>s("◀"),l=()=>s("▶");return()=>o(r({slides:ms,Slide:i,Previous:c,Next:l}))},bs=`import carousel from "@grucloud/bau-ui/carousel";
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

  return () => {
    return section(
      //
      Carousel({ slides, Slide, Previous, Next })
    );
  };
};
`,gs={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:bs,createComponent:ps}]},hs=t=>{const e=H(t);return()=>e(gs)},wn=(t,e)=>{const n=Pt(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},fs=t=>{const{bau:e}=t,{section:n}=e.tags,o=Pt(t,{variant:"outline",color:"primary"});return()=>n(o("My Chip"))},vs=`import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Chip = chip(context, { variant: "outline", color: "primary" });

  return () => {
    return section(
      //
      Chip("My Chip")
    );
  };
};
`,ys={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:vs,createComponent:fs}],gridItem:wn},xs=t=>{const e=H(t);return()=>e(ys)};function St(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({type:"checkbox",...d,class:[s,u,l,c,e==null?void 0:e.class,d==null?void 0:d.class]})}}const Sn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,s=St(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,s({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},ws=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,label:i}=e.tags,r=St(t,{color:"neutral",variant:"outline"}),c=O(t,{variant:"outline",color:"primary"});return()=>{const l=e.state(!1),u=m=>l.val=m.target.checked;return o({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},a(i({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",r({name:"myCheckbox",checked:l,onchange:u}))),s(c({type:"submit"},"Submit")))}},Ss=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const checkboxState = bau.state(false);

    const onChange = (event: any) => (checkboxState.val = event.target.checked);

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,Cs=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:s,form:i}=e.tags,r=St(t,{color:"neutral",variant:"outline"}),c=O(t,{variant:"outline",color:"primary"});return()=>i({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))},class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          & article {
            display: inline-flex;
            flex-direction: column;
          }
          & label {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: smaller;
            align-items: center;
            gap: 1rem;
          }
        `},s(o("My Checkbox",r({name:"my-checkbox-uncontrolled"})),o("My Checkbox with default",r({name:"my-checkbox-uncontrolled-default",defaultChecked:"on"}))),a(c({type:"submit"},"Submit")))},ks=`import checkbox from "@grucloud/bau-ui/checkbox";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          & article {
            display: inline-flex;
            flex-direction: column;
          }
          & label {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
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
        ),
        label(
          "My Checkbox with default",
          Checkbox({
            name: "my-checkbox-uncontrolled-default",
            defaultChecked: "on",
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Es=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:s,form:i}=e.tags,r=St(t,{color:"neutral",variant:"outline"}),c=O(t,{variant:"outline",color:"primary"}),l=O(t,{variant:"solid",color:"primary"});return()=>{const u=m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))},d=m=>{const b=window.document.getElementById("my-checkbox");b&&(b.indeterminate=!b.indeterminate)};return i({onsubmit:u,class:n`
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
        `},s(o("My Checkbox",r({id:"my-checkbox",name:"my-checkbox"})),c({onclick:d},"Toggle Indeterminate")),a(l({type:"submit"},"Submit")))}},Ts=`import checkbox from "@grucloud/bau-ui/checkbox";
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

  return () => {
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
    return form(
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
};
`,As=t=>{const{bau:e,css:n,window:o}=t,{form:a,article:s,footer:i,label:r}=e.tags,c="myCheckbox",l=St(t,{color:"neutral",variant:"outline"}),u=O(t,{variant:"outline",color:"primary"});return()=>{const d=new URLSearchParams(o.location.search),m=p=>{const g=new URLSearchParams(o.location.search);g.delete(p.target.name),g.append(p.target.name,p.target.checked),o.history.replaceState("","",`?${g.toString()}${o.location.hash}`)};return a({onsubmit:p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(g))}},s(r({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",l({name:c,defaultChecked:d.get(c)=="true",onchange:m}))),i(u({type:"submit"},"Submit")))}},Ds=`import { Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css, window } = context;
  const { form, article, footer, label } = bau.tags;

  const checkboxName = "myCheckbox";

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const search = new URLSearchParams(window.location.search);

    const onChange = (event: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(event.target.name);
      search.append(event.target.name, event.target.checked);
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
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
            name: checkboxName,
            defaultChecked: search.get(checkboxName) == "true" ? true : false,
            onchange: onChange,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Bs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:ks,createComponent:Cs},{title:"Controlled checkbox",description:"A controlled checkbox.",code:Ss,createComponent:ws},{title:"Indeterminate checkbox",description:"An indeterminate checkbox.",code:Ts,createComponent:Es},{title:"State in URL",description:"Checkbox states in URL",code:Ds,createComponent:As}],gridItem:Sn},Ns=t=>{const e=H(t);return()=>e(Bs)},Os=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=ge(t),s=O(t,{variant:"outline"}),i=()=>s("Header"),r=()=>o("Content");return()=>n(a({Header:i,Content:r}))},Ms=`import button from "@grucloud/bau-ui/button";
import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Collapsible = collapsible(context);
  const Button = button(context, { variant: "outline" });

  const Header = () => Button("Header");
  const Content = () => div("Content");

  return () => {
    return section(
      //
      Collapsible({ Header, Content })
    );
  };
};
`,Is={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Ms,createComponent:Os}]},Ls=t=>{const e=H(t);return()=>e(Is)};function $s(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["divider",c,s,e==null?void 0:e.class,d==null?void 0:d.class]},a({class:"content"},m))}}const Ps=t=>{const{bau:e}=t,{section:n}=e.tags,o=$s(t);return()=>n(o("OR"))},zs=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => {
    return section(Divider("OR"));
  };
};
`,Rs={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:zs,createComponent:Ps}],variantColorTableDisable:!0,variantSizeDisable:!0},js=t=>{const e=H(t);return()=>e(Rs)};function _s(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...m},b]=J(r);return a({class:[s,e==null?void 0:e.class,m.class]},a({class:()=>["overlay",d.val&&"overlay-open"],onclick:()=>{d.val=!1}}),a({class:()=>["content",d.val&&"content-open"]},b))}}const Us=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=_s(t),s=O(t,{color:"neutral",variant:"outline"}),i=He(t);return()=>{const r=e.state(!1);return n(o("Click on the button to open and close the drawer."),s({onclick:()=>{r.val=!r.val}},"OPEN DRAWER"),a({openState:r},i()))}},Gs=`import drawer from "@grucloud/bau-ui/drawer";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import navBarMenu from "../../components/navBarMenu";

export default (context: Context) => {
  const { bau } = context;
  const { section, p } = bau.tags;

  const Drawer = drawer(context);
  const Button = button(context, { color: "neutral", variant: "outline" });
  const NavBarMenu = navBarMenu(context);

  return () => {
    const openState = bau.state(false);
    return section(
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
};
`,Fs={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Gs,createComponent:Us}]},Hs=t=>{const e=H(t);return()=>e(Fs)},Vs=()=>ot.map(t=>`
`).join(`
`);function Cn(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=O(t),r=zt(t),c=xt(t),l=o`
    ${Vs()}
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"outline",color:p=e.color??"neutral",label:g,ListItem:h,items:y,...f},S]=J(d);const w=n.state(0),k=()=>{F.openDialog(),F.focus()},D=()=>{F.closeDialog()},A=()=>{F.open?D():k()},N=z=>{A(),z.preventDefault()},B=({item:z,index:$})=>C=>{w.val=$,D(),C.preventDefault()},M=z=>{switch(z.preventDefault(),z.key){case"Escape":D();break;case"ArrowDown":w.val<options.length-1?w.val++:w.val=0;break;case"ArrowUp":w.val<=0?w.val=options.length-1:w.val--;break;case"Enter":A();break}},P=()=>c({tabindex:"0",class:[p,b]},y.map((z,$)=>s({class:()=>[w.val==$&&"active"],onclick:B({item:z,index:$})},h(z)))),G=i({type:"button",onclick:N,color:p,variant:b,size:m},g),F=r({triggerEl:G,contentEl:P()});return a({...f,class:["dropdownMenu",p,m,l,e==null?void 0:e.class,f==null?void 0:f.class],onkeydown:M},G,F)}}const Js=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,s=Cn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>s({...c,items:i,ListItem:r,label:"Action"})},qs=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,s=Cn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(s({items:i,ListItem:r,label:"Action"}))},Ws=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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

  return () => {
    return section(
      DropdownMenu({
        items,
        ListItem,
        label: "Action",
      })
    );
  };
};
`,Ks={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Ws,createComponent:qs}],gridItem:Js},Xs=t=>{const e=H(t);return()=>e(Ks)},kn=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=ce(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Zs=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=ce(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Ys=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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

  return () => {
    return section({ id: "drilldown-example" }, DrillDownMenu({ tree }));
  };
};
`,Qs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Ys,createComponent:Zs}],gridItem:(t,e)=>kn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},ti=t=>{const e=H(t);return()=>e(Qs)};function En(t,e={}){const{bau:n,css:o}=t,{div:a,label:s,input:i}=n.tags,r={base:o`
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
    `};return function(l){const{size:u=e.size??"md",variant:d=e.variant??"outline",color:m=e.color??"neutral",Component:b,disabled:p,...g}=l;return a({class:[r.base,p&&r.disabled,e==null?void 0:e.class,l.class]},s({class:[d,m,u]},b({disabled:p}),i({type:"file",disabled:p,...g})))}}const Tn=(t,e)=>{const{tr:n,bau:o,css:a,config:s}=t,{svg:i,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=En(t,e),m=p=>{const g=p.target.files[0];g?u.val=g.name:u.val="No file selected"},b=({disabled:p})=>c({class:[a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,p&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `]},i({width:100,height:100,fill:"currentColor"},r({href:`${s.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return p=>d({Component:b,name:"file",accept:"text/*",onchange:m,...p})},ei=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=En(t),d=({disabled:m})=>c({class:[o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `]},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(e("Choose a file to upload")));return()=>{const m=n.state("No file selected");return r(u({Component:d,name:"file",accept:"text/*",onchange:p=>{const g=p.target.files[0];g?m.val=g.name:m.val="No file selected"}}),c("File selected: ",m))}},ni=`import fileInput from "@grucloud/bau-ui/fileInput";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { tr, bau, css, config } = context;

  const { svg, use } = bau.tagsNS("http://www.w3.org/2000/svg");
  const { section, div, span } = bau.tags;

  const FileInput = fileInput(context);

  const FileInputLabel = ({ disabled }: any) =>
    div(
      {
        class: [
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
            \`,
        ],
      },
      svg(
        { width: 100, height: 100, fill: "currentColor" },
        use({ href: \`\${config.base}/uploadIcon.svg#Capa_1\` })
      ),
      span(tr("Choose a file to upload"))
    );

  return () => {
    const fileState = bau.state("No file selected");

    const onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        fileState.val = file.name;
      } else {
        fileState.val = "No file selected";
      }
    };

    return section(
      FileInput({
        Component: FileInputLabel,
        name: "file",
        accept: "text/*",
        onchange,
      }),
      div("File selected: ", fileState)
    );
  };
};
`,oi={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ni,createComponent:ei}],gridItem:Tn},ai=t=>{const e=H(t);return()=>e(oi)};function gt(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,s=o`
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
        :is(
            input[type="text"],
            input[type="password"],
            input[type="email"],
            input[type="search"]
          )
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},b]=J(r);return a({...m,class:["form",u,l,c,s,e==null?void 0:e.class,m==null?void 0:m.class]},b)}}function xe(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:s}=n.tags,i=a`
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
  `;return function(...l){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",loading:b,...p},g]=J(l);const h=O(t),y=bt(t);return n.bind({deps:[b],render:()=>f=>h({...p,class:["loadingButton",u,d,m,r,f&&"loading",e==null?void 0:e.class,p==null?void 0:p.class]},y({size:u,variant:d,color:m,visibility:f}),s({class:f&&"loading"},g))})}}const ri=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:s,header:i,label:r,img:c,footer:l}=e.tags,u=xe(t,{variant:"solid",color:"primary"}),d=At(t,{variant:"outline",color:"danger"}),m=dt(t),b=gt(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:g=()=>{}}){const h=e.state(!1),y=e.state("");return b({onsubmit:async S=>{S.preventDefault();const{username:w,password:k}=Object.fromEntries(new FormData(S.currentTarget));try{h.val=!0;const D=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:w,password:k})});if(D.ok){const A=await D.json();g(A)}else D.status==401?y.val="Invalid username or password":y.val=D.statusText}catch(D){y.val=D.message}finally{h.val=!1}}},i(c({width:"100",height:"100",src:`${o.base}/gc.svg`}),s("Login to Grucloud")),a(()=>y.val&&d(y.val),r("Email",m({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",m({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",loading:h},"Login")))}},si=`import form from "@grucloud/bau-ui/form";
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
`,ii=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i}=e.tags,r=gt(t),c=O(t,{variant:"solid",color:"primary"}),l=dt(t);return function({onSubmitted:d=()=>{}}){return r({onsubmit:async b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p)),d(p)}},a(o("Form with input")),n(s("Branch",l({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(c({type:"submit"},"Click")))}},ci=`import form from "@grucloud/bau-ui/form";
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
`,li=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i,em:r,span:c}=e.tags,l=e.state(""),u=e.derive(()=>l.val!=="Delete"),d=gt(t),m=O(t,{variant:"solid",color:"danger"}),b=dt(t);return function({onSubmitted:g=()=>{}}){return d({onsubmit:async y=>{y.preventDefault(),g()}},a(o("Delete Protection")),n(s(c("Type ",r("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:l,oninput:y=>l.val=y.target.value}))),i(m({type:"submit",disabled:u},"Delete")))}},ui=`import { Context } from "@grucloud/bau-ui/context";
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
`,di={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:ci,createComponent:ii},{title:"Form with state",description:"A form with input state and a dervied state.",code:ui,createComponent:li},{title:"Login page",description:"A login page.",code:si,createComponent:ri}]},mi=t=>{const e=H(t);return()=>e(di)},An=(t,e={})=>{const n=dt(t,e),o=({color:a,variant:s,size:i,options:r})=>`myinput-gallery-${a??r.color}-${s??r.variant}-${i??r.size}`;return({color:a,variant:s,size:i,...r})=>n({"aria-label":o({color:a,variant:s,size:i,options:e}),name:o({color:a,variant:s,size:i,options:e}),placeholder:"Enter text",color:a,variant:s,size:i,...r})},pi=t=>{const{bau:e}=t,{article:n,footer:o,label:a}=e.tags,s=dt(t),i=gt(t),r=O(t,{variant:"solid",color:"primary"});return()=>i({onsubmit:l=>{l.preventDefault();const u=Object.fromEntries(new FormData(l.currentTarget));alert(JSON.stringify(u))}},n(a("Basic input",s({name:"my-input",placeholder:"Enter Text"})),a("Required input",s({required:!0,name:"my-required-input",placeholder:"Enter Text"})),a("Input with minLength/maxLength",s({name:"my-required-input-min-max",placeholder:"Enter Text",required:!0,minLength:3,maxLength:24})),a("Input with custom error message",s({name:"my-required-input-custom",placeholder:"Enter Text",required:!0,minLength:3,maxLength:24,oninvalid:l=>{l.target.setCustomValidity("Please select the correct format.")}})),a("Disabled input",s({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))),o(r({type:"submit"},"Submit")))},bi=`import { Context } from "@grucloud/bau-ui/context";
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
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return Form(
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
};
`,gi=t=>{const{bau:e}=t,{article:n,footer:o,label:a}=e.tags,s=dt(t),i=gt(t),r=O(t,{variant:"solid",color:"primary"});return()=>{const c=e.state(""),l=e.derive(()=>c.val=="");return i({onsubmit:m=>{m.preventDefault(),alert(c.val)}},n(a("Input",s({name:"my-input",placeholder:"Enter Text",value:c,oninput:m=>c.val=m.target.value}))),o(r({type:"submit",disabled:l},"Submit")))}},hi=`import { Context } from "@grucloud/bau-ui/context";
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
`,fi={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Uncontrolled Input",description:"Various uncontrolled inputs.",code:bi,createComponent:pi},{title:"Controlled Input",description:"Various controlled inputs.",code:hi,createComponent:gi}],gridItem:An},vi=t=>{const e=H(t);return()=>e(fi)},Dn=(t,e={})=>{const n=le(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},yi=t=>{const{bau:e}=t,{label:n,footer:o,article:a}=e.tags,s=gt(t),i=le(t),r=O(t,{variant:"solid",color:"primary"});return()=>s({onsubmit:l=>{l.preventDefault();const u=Object.fromEntries(new FormData(l.currentTarget));alert(JSON.stringify(u))}},a(n("Basic inputSearch",i({name:"my-inputSearch",placeholder:"Enter Text"})),n("Disabled inputSearch",i({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))),o(r({type:"submit"},"Submit")))},xi=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import inputSearch from "@grucloud/bau-ui/inputSearch";
import form from "@grucloud/bau-ui/form";

export default (context: Context) => {
  const { bau } = context;
  const { label, footer, article } = bau.tags;

  const Form = form(context);
  const InputSearch = inputSearch(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return Form(
      { onsubmit },
      article(
        label(
          "Basic inputSearch",
          InputSearch({
            name: "my-inputSearch",
            placeholder: "Enter Text",
          })
        ),
        label(
          "Disabled inputSearch",
          InputSearch({
            name: "my-inputSearch-disabled",
            placeholder: "Enter Text",
            disabled: true,
          })
        )
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,wi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:xi,createComponent:yi}],gridItem:Dn},Si=t=>{const e=H(t);return()=>e(wi)};function Bn(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["keyValueList",s,e==null?void 0:e.class,d==null?void 0:d.class]},m)}}const Ci=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:s}=e.tags,i=Bn(t);return()=>n(i(o(a("My label"),s("My Value")),o(a("My other label"),s("My Other Value"))))},ki=`import keyValueList from "@grucloud/bau-ui/keyValueList";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, li, label, span } = bau.tags;

  const KeyValueList = keyValueList(context);

  return () => {
    return section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
  };
};
`,Ei=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:s,span:i}=e.tags,r=Bn(t,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(r(a(s("My label"),i("My Value")),a(s("My other label"),i("My Other Value"))))},Ti=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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

  return () => {
    return section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
  };
};
`,Ai={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:ki,createComponent:Ci},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:Ti,createComponent:Ei}]},Di=t=>{const e=H(t);return()=>e(Ai)},Bi="modulepreload",Ni=function(t){return"/bau/bau-ui/"+t},Re={},Nn=function(e,n,o){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),i=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));a=Promise.all(n.map(r=>{if(r=Ni(r),r in Re)return;Re[r]=!0;const c=r.endsWith(".css"),l=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${l}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Bi,c||(u.as="script"),u.crossOrigin="",u.href=r,i&&u.setAttribute("nonce",i),document.head.appendChild(u),c)return new Promise((d,m)=>{u.addEventListener("load",d),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})}))}return a.then(()=>e()).catch(s=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=s,window.dispatchEvent(i),!i.defaultPrevented)throw s})};function On(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=bt(t,{size:"lg"}),i=At(t,{color:"danger"}),r=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},s({visibility:!0})),c=l=>i(l.message);return function({getModule:u,loading:d=r,error:m=c,props:b={}}){const p=n.state(void 0),g=n.state(!0),h=n.state(!1);return u().then(y=>{n.batch(()=>{p.val=y.default(t),g.val=!1})}).catch(y=>{h.val=y.message}),a(()=>{if(h.val)return m({message:h.val});if(g.val)return d();if(p.val)return p.val(b)})}}const Oi=t=>{const{bau:e}=t,{section:n}=e.tags,o=On(t),a=O(t);return()=>{const s=e.state(!1);return n(a({onclick:()=>s.val=!s.val},()=>s.val?"Hide":"Show"),()=>s.val&&o({getModule:()=>Nn(()=>import("./myComponent-B8W3Hpri.js"),[]),props:{message:"myValue"}}))}},Mi=`import { Context } from "@grucloud/bau-ui/context";
import lazy from "@grucloud/bau-ui/lazy";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Lazy = lazy(context);
  const Button = button(context);

  return () => {
    const showState = bau.state(false);

    return section(
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
};
`,Ii=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),s=On(t,{loading:()=>o("My Custom Loading"),error:r=>o("My Custom Error")}),i=O(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&s({getModule:()=>Nn(()=>import("./myComponent-B8W3Hpri.js"),[]),props:{message:"Additional Props here"}}))},Li=`import { Context } from "@grucloud/bau-ui/context";
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
`,$i={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:Mi,createComponent:Oi},{title:"Custom Loader",description:"Custom loader and error",code:Li,createComponent:Ii}]},Pi=t=>{const e=H(t);return()=>e($i)};function Mn(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=()=>ot.map(l=>`
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

    ${i()}
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",running:p,...g}]=J(u);return s({...g,role:"progressbar",class:{deps:[p],renderProp:()=>h=>["linearProgress",d,b,c,h&&"running",e==null?void 0:e.class,g==null?void 0:g.class]}})}}const In=(t,e)=>{const n=Mn(t,e);return o=>n({...o,"aria-label":"linear-progress",running:!0})},zi=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=O(t,{variant:"solid",color:"primary"}),s=Mn(t),i=e.state(!1);return()=>n(a({onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,s({"aria-label":"linear-progress",running:i}))},Ri=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ji={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Ri,createComponent:zi}],gridItem:In},_i=t=>{const e=H(t);return()=>e(ji)},Ln=(t,e)=>{const n=xe(t,e);return o=>n({...o,loading:!0},"Save")},Ui=t=>{const{bau:e}=t,{section:n}=e.tags,o=xe(t,{variant:"solid",color:"primary"});return()=>{const a=e.state(!0);return n(o({loading:a,onclick:()=>a.val=!a.val},"Save"))}},Gi=`import { Context } from "@grucloud/bau-ui/context";
import loadingButton from "@grucloud/bau-ui/loadingButton";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const LoadingButton = loadingButton(context, {
    variant: "solid",
    color: "primary",
  });

  return () => {
    const loadingState = bau.state(true);

    return section(
      LoadingButton(
        {
          loading: loadingState,
          onclick: () => (loadingState.val = !loadingState.val),
        },
        "Save"
      )
    );
  };
};
`,Fi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Gi,createComponent:Ui}],gridItem:Ln},Hi=t=>{const e=H(t);return()=>e(Fi)},Vi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ji=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:s}=n.tags,i=xt(t,e),r=({code:c,label:l})=>s({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>i({...c},Vi.map(r))},qi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Wi=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:s}=e.tags,i=xt(t,{variant:"outline",color:"primary"}),r=({code:c,label:l})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(i(qi.map(r)))},Ki=`import list from "@grucloud/bau-ui/list";
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

  return () => {
    return section(List(phoneCodes.map(ListItem)));
  };
};
`,Xi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ki,createComponent:Wi}],gridItem:Ji},Zi=t=>{const e=H(t);return()=>e(Xi)};function $n(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:s,div:i}=n.tags,c=o`
    margin: auto;
    padding: 1rem;
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    border: 0px;
    overflow: hidden;

    &,
    &::backdrop {
      transition: display 0.3s allow-discrete, overlay 0.3s allow-discrete,
        opacity 0.3s;
      opacity: 0;
    }
    &[open],
    &[open]::backdrop {
      opacity: 1;
      @starting-style {
        opacity: 0;
      }
    }

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
    ${ot.map(l=>`
&.modal.plain.${l} {
  color: inherit;
}
&.modal.outline.${l} {
  color: inherit;
}
&.modal.soft.${l} {
  color: inherit;
}
&.modal.solid.${l} {
}
`).join(`
`)}
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",...p},g]=J(u);const h=s({...p,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(p.id??"modal")&&h.showModal()},class:["modal",c,b,m,d,e==null?void 0:e.class,p==null?void 0:p.class]},g);return new MutationObserver(f=>{const S=new URLSearchParams(a.location.search);f[0].attributeName=="open"&&(h.open?S.set("modal",h.id??"modal"):S.delete("modal"),a.history.pushState("","",`?${S.toString()}`))}).observe(h,{attributes:!0}),h}}const Pn=(t,e={})=>{const{bau:n,window:o}=t,{document:a}=o,{form:s,section:i,main:r,header:c,footer:l,p:u,h1:d}=n.tags,m=O(t),b=$n(t,e),p=()=>r(Array(20).fill("").map((y,f)=>u(f+1,". Some text here"))),g=y=>`dialog-${y.color}-${y.variant}-${e.size}`,h=y=>b({id:g(y),...y},s(c(d("Header")),p(),l(m({variant:"outline",color:y.color,onclick:f=>{f.target.closest("dialog").close()}},"Cancel"),m({variant:"solid",color:y.color,onclick:f=>{f.target.closest("dialog").close()}},"OK"))));return y=>i(m({...y,onclick:()=>{a.getElementById(g(y)).showModal()}},"OPEN MODAL"),h(y))},Yi=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,section:s,main:i,header:r,footer:c,p:l}=e.tags,d=O(t,{color:"neutral"}),m=$n(t),b=()=>i(Array(10).fill("").map((p,g)=>l(g+1,". Some text here")));return()=>s(d({variant:"solid",onclick:()=>{o.getElementById("my-dialog").showModal()}},"OPEN MODAL"),m({id:"my-dialog"},a(r("Header"),b(),c(d({variant:"outline",onclick:p=>{p.target.closest("dialog").close()}},"Cancel"),d({variant:"solid",onclick:p=>{p.target.closest("dialog").close()}},"OK")))))},Qi=`import modal from "@grucloud/bau-ui/modal";
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

  return () => {
    return section(
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
};
`,tc={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Qi,createComponent:Yi}],gridItem:Pn},ec=t=>{const e=H(t);return()=>e(tc)},nc=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function oc(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i}=n.tags,r=O(t),c=zt(t),l=xt(t),u=St(t,{color:"neutral",variant:"outline"}),d=o`
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
    ${nc()}
  `;return function(...b){let[{size:p=e.size??"md",variant:g=e.variant??"outline",color:h=e.color??"neutral",name:y,label:f,Option:S,options:w,defaultValue:k=[],getOptionLabel:D,getOptionValue:A,renderValue:N,onSelect:B=()=>{},loading:M,...P},G]=J(b);const F=bt(t,{variant:g,color:h,size:p}),z=n.state(k),$=n.state(!1),C=n.state(0),v=()=>{X.openDialog(),X.focus(),$.val=!0},x=()=>{X.closeDialog(),$.val=!1},T=()=>{$.val=!1},E=W=>{X.open?x():v(),W.preventDefault()},_=()=>Array.from(tt.selectedOptions).map(({value:W})=>w.find(Q=>A(Q)==W)),R=W=>{switch(W.preventDefault(),W.key){case"Escape":x();break;case"ArrowDown":C.val<w.length-1?C.val++:C.val=0;break;case"ArrowUp":C.val<=0?C.val=w.length-1:C.val--;break;case"Enter":if(X.open){const Q=W.currentTarget.querySelectorAll("input")[C.val];Q.checked=!Q.checked;const nt=tt.options[C.val+1];nt.selected=!nt.selected,z.val=_()}else v();break}},V=W=>Q=>{const nt=[...tt.options].find(({value:rt})=>rt==A(W));Q.target.checked?nt.selected=!0:nt.selected=!1,z.val=_()},U=()=>l({tabindex:"0",class:[h,g]},w.map((W,Q)=>s({class:()=>C.val==Q&&"active"},n.tags.label(u({checked:k.find(nt=>A(nt)==A(W)),name:`${y}-${A(W)}`,onchange:V(W)}),S(W))))),I=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":$,"aria-label":f,onclick:E,color:h,variant:g,size:p,class:M==!0&&"loading",disabled:M},()=>z.val.length?N(z.val):f,()=>M==!0&&F({visibility:M})),X=c({triggerEl:I,contentEl:U(),onClose:T}),tt=i({name:y,multiple:!0,...P},n.tags.option({value:""},"--Category--"),w.map(W=>n.tags.option({value:A(W),selected:k.find(Q=>A(Q)==A(W))},D(W))));return a({...P,class:["multiSelect",h,p,d,e==null?void 0:e.class,P==null?void 0:P.class],onkeydown:R},tt,I,X)}}const ac=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:s,footer:i}=e.tags,r=oc(t),c=O(t,{variant:"outline",color:"neutral"}),l=Pt(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=m=>a(m.group);return()=>s({onsubmit:b=>{b.preventDefault();const{selectedOptions:p}=b.target.elements.myMultiSelect,g=Array.from(p).map(({value:h})=>h);alert(JSON.stringify(g))},class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                align-items: center;
                gap: 0.2rem;
              `},b.map(p=>l(p.group))),label:"Select services"}),i(c({type:"submit"},"Submit")))},rc=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const { selectedOptions } = event.target.elements.myMultiSelect;
      const values = Array.from(selectedOptions).map(({ value }: any) => value);
      alert(JSON.stringify(values));
    };
    return form(
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
};
`,sc=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:s}=e.tags,i=O(t,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],c=l=>{l.preventDefault();const{selectedOptions:u}=l.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:m})=>m);alert(JSON.stringify(d))};return()=>s({onsubmit:c,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:l})=>a({value:l},l))),i({type:"submit"},"Submit"))},ic=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    return form(
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
};
`,cc={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:rc,createComponent:ac},{title:"Native Multi Select",description:"A native multi select.",code:ic,createComponent:sc}]},lc=t=>{const e=H(t);return()=>e(cc)},uc=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:s}=e.tags,i=O(t,{variant:"outline",color:"success"}),r=zt(t),c=()=>i({onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),s("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},dc=`import popover from "@grucloud/bau-ui/popover";
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

  return () => {
    return section(div(triggerEl, popoverEl));
  };
};
`,mc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:dc,createComponent:uc}]},pc=t=>{const e=H(t);return()=>e(mc)};function bc(t,e={}){const{bau:n,css:o,config:a}=t,{div:s,a:i,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:m,label:b,href:p})=>i({href:`${a.base}${p}`},r({class:"sublabel"},d),s({class:`label ${d}`},b??m));return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",data:h={},...y}]=J(m);const{next:f,previous:S}=h;return c({"data-paginationnav":JSON.stringify(h),"aria-label":"pages navigation",...y,class:["paginationNavigation",b,l,e==null?void 0:e.class,y==null?void 0:y.class]},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(f==null?void 0:f.href)&&u({text:"Next"})(f))}}const gc=t=>{const{bau:e}=t,{section:n}=e.tags,o=bc(t,{variant:"solid",color:"primary"}),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({data:a}))},hc=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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

  return () => {
    return section(
      PaginationNavigation({
        data,
      })
    );
  };
};
`,fc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:hc,createComponent:gc}]},vc=t=>{const e=H(t);return()=>e(fc)},yc=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=be(t,e);return s=>a({...s},o(`Paper ${e.size??""}`))},xc=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=be(t,{size:"md"});return()=>n(a(o("My content")))},wc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context, { size: "md" });

  return () => {
    return section(Paper(div("My content")));
  };
};
`,Sc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:wc,createComponent:xc}],variantColorTableDisable:!0,gridItem:yc},Cc=t=>{const e=H(t);return()=>e(Sc)};function we(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    cursor: pointer;
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${ot.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`)}
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m}]=J(c);return a({...m,type:"radio",class:["radio-button",l,d,u,i,e==null?void 0:e.class,m==null?void 0:m.class]})}}const zn=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:s}=n.tags,i=we(t,e);return r=>s({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},kc=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:s,article:i,footer:r,fieldset:c,legend:l}=e.tags,u=we(t),d=O(t,{variant:"outline",color:"primary"});return()=>{const m=e.state("one"),b=({target:g})=>m.val=g.id,p=g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))};return s({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
          & fieldset {
            padding: 0.5rem;
            display: inline-flex;
            flex-direction: column;
          }
        `,onsubmit:p},i(c(l("One or two"),o("One",u({id:"one",name:"radio",checked:!0,value:m,oninput:b})),o("Two",u({id:"two",name:"radio",value:m,oninput:b}))),a("Choice: ",m)),r(d({type:"submit"},"Submit")))}},Ec=`import { Context } from "@grucloud/bau-ui/context";
import radioButton from "@grucloud/bau-ui/radioButton";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, div, form, article, footer, fieldset, legend } = bau.tags;
  const RadioButton = radioButton(context);
  const ButtonSubmit = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const checkedState = bau.state("one");

    const oninput = ({ target }: { target: HTMLInputElement }) =>
      (checkedState.val = target.id);

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      {
        class: css\`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
          & fieldset {
            padding: 0.5rem;
            display: inline-flex;
            flex-direction: column;
          }
        \`,
        onsubmit,
      },
      article(
        fieldset(
          legend("One or two"),
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
          )
        ),
        div("Choice: ", checkedState)
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,Tc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Ec,createComponent:kc}],gridItem:zn},Ac=t=>{const e=H(t);return()=>e(Tc)};function jt(t,e={}){const{bau:n,css:o}=t,{div:a,label:s}=n.tags,i=we(t),c=o`
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
    ${ot.map(l=>`
  `).join(`
`)};
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"none",color:b=e.color??"neutral",name:p,oninput:g,radios:h=[],...y}]=J(u);return a({class:["radioButtonGroup",d,b,m,c,e==null?void 0:e.class,y==null?void 0:y.class]},h.map(({value:f,Label:S})=>s(i({...y,size:d,variant:m,color:b,id:f,name:p,checked:f==y.value,value:f,oninput:g}),S())))}}const Dc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:s}=e.tags,i=jt(t),r=O(t,{variant:"outline",color:"primary"});return()=>{const c=e.state("two");return n({onsubmit:d=>{d.preventDefault(),alert(c.val)}},o(i({oninput:({target:d})=>c.val=d.value,name:"myRadio",value:c.val,radios:[{value:"one",Label:()=>"One"},{value:"two",Label:()=>"Two"}]}),s("CheckedState: ",c)),a(r({type:"submit"},"Submit")))}},Bc=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const checkedState = bau.state("two");

    const oninput = ({ target }: { target: HTMLInputElement }) =>
      (checkedState.val = target.value);

    const onsubmit = (event: any) => {
      event.preventDefault();
      alert(checkedState.val);
    };

    return form(
      { onsubmit },
      article(
        RadioButtonGroup({
          oninput,
          name: "myRadio",
          value: checkedState.val,
          radios: [
            { value: "one", Label: () => "One" },
            { value: "two", Label: () => "Two" },
          ],
        }),
        p("CheckedState: ", checkedState)
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Nc=t=>{const{bau:e,window:n}=t,{form:o,article:a,footer:s}=e.tags,i="myRadio",r=jt(t),c=O(t,{variant:"outline",color:"primary"});return()=>{const l=new URLSearchParams(n.location.search);return o({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},a(r({oninput:({target:m})=>{const b=new URLSearchParams(n.location.search);b.delete(m.name),b.append(m.name,m.value),n.history.replaceState("","",`?${b.toString()}${n.location.hash}`)},name:i,value:l.get(i),radios:[{value:"one",Label:()=>"One"},{value:"two",Label:()=>"Two"}]})),s(c({type:"submit"},"Submit")))}},Oc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { form, article, footer } = bau.tags;

  const radioButtonGroupName = "myRadio";

  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const search = new URLSearchParams(window.location.search);

    const oninput = ({ target }: { target: HTMLInputElement }) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(target.name);
      search.append(target.name, target.value);
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        RadioButtonGroup({
          oninput,
          name: radioButtonGroupName,
          value: search.get(radioButtonGroupName),
          radios: [
            { value: "one", Label: () => "One" },
            { value: "two", Label: () => "Two" },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Mc=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=jt(t),i=O(t,{variant:"outline",color:"primary"});return()=>n({onsubmit:c=>{c.preventDefault();const l=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(l))}},o(s({name:"myRadio",value:"one",radios:[{value:"one",Label:()=>"One"},{value:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},Ic=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "myRadio",
          value: "one",
          radios: [
            { value: "one", Label: () => "One" },
            { value: "two", Label: () => "Two" },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Lc=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:s,img:i}=e.tags,r=jt(t),c=O(t,{variant:"outline",color:"primary"}),l=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28});return()=>o({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},a(r({name:"git_provider_type",value:"",radios:[{value:"GitHub",Label:()=>[l(),"GitHub"]},{value:"GitLab",Label:()=>[u(),"GitLab"]}]})),s(c({type:"submit"},"Submit")))},$c=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };
    return form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "git_provider_type",
          value: "",
          radios: [
            { value: "GitHub", Label: () => [GithubImg(), "GitHub"] },
            { value: "GitLab", Label: () => [GitlabImg(), "GitLab"] },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Pc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:s,div:i}=e.tags,r=jt(t),c=O(t,{variant:"outline",color:"primary"});return()=>n({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))}},o(r({name:"git_provider_type",value:"",radios:[{value:"GitHub",Label:()=>i("GitHub",s("Login with GitHub"))},{value:"GitLab",Label:()=>i("GitLab",s("Login with GitLab"))}]})),a(c({type:"submit"},"Submit")))},zc=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };
    return form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "git_provider_type",
          value: "",
          radios: [
            {
              value: "GitHub",
              Label: () => div("GitHub", small("Login with GitHub")),
            },
            {
              value: "GitLab",
              Label: () => div("GitLab", small("Login with GitLab")),
            },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Rc={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:Ic,createComponent:Mc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:Bc,createComponent:Dc},{title:"Url State Radio Button Group",description:"A radio button group with the state in the URL",code:Oc,createComponent:Nc},{title:"Label with Image",description:"A label with an image.",code:$c,createComponent:Lc},{title:"Label with description",description:"A label with name and description.",code:zc,createComponent:Pc}]},jc=t=>{const e=H(t);return()=>e(Rc)};function $t(t,e={}){const{bau:n,css:o,window:a}=t,{section:s,article:i,div:r}=n.tags,{document:c}=a,{direction:l="horizontal"}=e,u=o`
    & .resizablePanel {
      box-sizing: border-box;
    }
    & .handle {
      position: relative;
      width: 1px;
      cursor: col-resize;
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        content: "";
        position: absolute;
        background-color: var(--color-emphasis-100);
      }
    }
    & .horizontal {
      width: 1rem;
      cursor: col-resize;
      &::after {
        height: 100%;
        width: 1px;
      }
    }
    & .vertical {
      height: 1rem;
      width: 100%;
      cursor: row-resize;
      &::after {
        height: 1px;
        width: 100%;
      }
    }
  `;function d(...p){let[g,h]=J(p);return s({...g,class:["resizablePanelGroup",g==null?void 0:g.class,e==null?void 0:e.class,u]},h)}function m(...p){let[g,h]=J(p);return i({...g,class:["resizablePanel",g==null?void 0:g.class]},h)}function b(...p){let[g,h]=J(p),y=0,f=0,S,w,k,D,A;const N=()=>l==="horizontal",B=z=>N()?M(z):P(z),M=z=>{const $=z.clientX-y;A&&(D.style.width=`${A.width+$}px`),k&&(w.style.width=`${k.width-$}px`)},P=z=>{const $=z.clientY-f;A&&(D.style.height=`${A.height+$}px`),k&&(w.style.height=`${k.height-$}px`)},G=()=>{w=null,D=null,k=null,A=null,S.style.cursor=null,S.style["user-select"]="auto",c.removeEventListener("mousemove",B),c.removeEventListener("mouseup",G)},F=z=>{y=z.clientX,f=z.clientY;const{target:$}=z,C=$.closest(".handle");S=$.closest(".resizablePanelGroup"),S.style.cursor=N()?"col-resize":"row-resize",S.style["user-select"]="none",w=C.nextSibling,D=C.previousSibling,D&&(A=D.getBoundingClientRect()),w&&(k=w.getBoundingClientRect()),c.addEventListener("mousemove",B),c.addEventListener("mouseup",G)};return r({...g,class:["handle",l],role:"separator",bauMounted:({element:z})=>{z.addEventListener("mousedown",F)},bauUnmounted:({element:z})=>{z.removeEventListener("mousedown",F)}},h)}return{PanelGroup:d,Panel:m,Handle:b}}const _c=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:s,Panel:i,Handle:r}=$t(t,{class:n`
      display: inline-flex;
      border: 1px var(--color-emphasis-100) solid;
      width: 400px;
    `}),c=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        `},a("Resize me")),l=()=>a({class:n`
          background-color: var(--color-emphasis-100);
          color: var(--color-emphasis-400);
          border-radius: var(--global-radius);
          font-size: large;
          padding: 0.2rem;
          z-index: 1;
        `},"⋮");return()=>o(s(c(),r(l())))},Uc=`import resizable from "@grucloud/bau-ui/resizable";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const { PanelGroup, Panel, Handle } = resizable(context, {
    class: css\`
      display: inline-flex;
      border: 1px var(--color-emphasis-100) solid;
      width: 400px;
    \`,
  });

  const Panel1 = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        \`,
      },
      div("Resize me")
    );

  const HandleIcon = () =>
    div(
      {
        class: css\`
          background-color: var(--color-emphasis-100);
          color: var(--color-emphasis-400);
          border-radius: var(--global-radius);
          font-size: large;
          padding: 0.2rem;
          z-index: 1;
        \`,
      },
      "\\u22EE"
    );

  return () => {
    return section(PanelGroup(Panel1(), Handle(HandleIcon())));
  };
};
`,Gc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:s,Panel:i,Handle:r}=$t(t,{class:n`
      display: inline-flex;
      border: 1px var(--color-emphasis-100) solid;
      width: 600px;
    `}),c=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        `},a("Panel1")),l=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        `},a("Panel2"));return()=>o(s(c(),r(),l()))},Fc=`import resizable from "@grucloud/bau-ui/resizable";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const { PanelGroup, Panel, Handle } = resizable(context, {
    class: css\`
      display: inline-flex;
      border: 1px var(--color-emphasis-100) solid;
      width: 600px;
    \`,
  });

  const Panel1 = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        \`,
      },
      div("Panel1")
    );

  const Panel2 = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        \`,
      },
      div("Panel2")
    );

  return () => {
    return section(PanelGroup(Panel1(), Handle(), Panel2()));
  };
};
`,Hc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:s,Panel:i,Handle:r}=$t(t,{direction:"vertical",class:n`
      display: inline-flex;
      flex-direction: column;
      border: 1px grey dotted;
      height: 300px;
    `}),c=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          width: 100px;
          height: 100px;
        `},a("Panel1")),l=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          width: 100px;
          height: 100px;
        `},a("Panel2")),u=()=>a({class:n`
          background-color: var(--color-emphasis-100);
          color: var(--color-emphasis-400);
          border-radius: var(--global-radius);
          font-size: large;
          z-index: 1;
          line-height: 0.5;
        `},"⋯");return()=>o(s(c(),r(u()),l()))},Vc=`import resizable from "@grucloud/bau-ui/resizable";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const { PanelGroup, Panel, Handle } = resizable(context, {
    direction: "vertical",
    class: css\`
      display: inline-flex;
      flex-direction: column;
      border: 1px grey dotted;
      height: 300px;
    \`,
  });

  const Panel1 = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          width: 100px;
          height: 100px;
        \`,
      },
      div("Panel1")
    );

  const Panel2 = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          width: 100px;
          height: 100px;
        \`,
      },
      div("Panel2")
    );

  const HandleIcon = () =>
    div(
      {
        class: css\`
          background-color: var(--color-emphasis-100);
          color: var(--color-emphasis-400);
          border-radius: var(--global-radius);
          font-size: large;
          z-index: 1;
          line-height: 0.5;
        \`,
      },
      "\\u22EF"
    );

  return () => {
    return section(PanelGroup(Panel1(), Handle(HandleIcon()), Panel2()));
  };
};
`,Jc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:s,Panel:i,Handle:r}=$t(t,{class:n`
      display: inline-flex;
      border: 1px var(--color-emphasis-500) solid;
      width: 600px;
      height: 300px;

      & > div.handle {
        width: 0.1rem;
        &::after {
          width: 0.1rem;
        }
      }
    `}),c=$t(t,{direction:"vertical",class:n`
      flex-grow: 1;
      display: inline-flex;
      flex-direction: column;
      min-width: fit-content;
      & > div.handle {
        height: 0.1rem;
        &::after {
          height: 0.1rem;
        }
      }
    `}),l=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
        `},a("NavBar")),u=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 2rem;
          height: 70%;
        `},a("Main")),d=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 2rem;
        `},a("Footer"));return()=>o(s(l(),r(),c.PanelGroup(u(),c.Handle(),d())))},qc=`import resizable from "@grucloud/bau-ui/resizable";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const { PanelGroup, Panel, Handle } = resizable(context, {
    class: css\`
      display: inline-flex;
      border: 1px var(--color-emphasis-500) solid;
      width: 600px;
      height: 300px;

      & > div.handle {
        width: 0.1rem;
        &::after {
          width: 0.1rem;
        }
      }
    \`,
  });

  const vertical = resizable(context, {
    direction: "vertical",
    class: css\`
      flex-grow: 1;
      display: inline-flex;
      flex-direction: column;
      min-width: fit-content;
      & > div.handle {
        height: 0.1rem;
        &::after {
          height: 0.1rem;
        }
      }
    \`,
  });

  const NavBar = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
        \`,
      },
      div("NavBar")
    );

  const Main = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 2rem;
          height: 70%;
        \`,
      },
      div("Main")
    );

  const Footer = () =>
    Panel(
      {
        class: css\`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 2rem;
        \`,
      },
      div("Footer")
    );

  return () => {
    return section(
      PanelGroup(
        NavBar(),
        Handle(),
        vertical.PanelGroup(Main(), vertical.Handle(), Footer())
      )
    );
  };
};
`,Wc={title:"Resizable",package:"resizable",description:"The resizable component allows to resize panels",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/resizable/resizable.js",importStatement:'import resizable from "@grucloud/bau-ui/resizable";',examples:[{title:"Horizontal 1 Panel",description:"A resizable horizontal panel.",code:Uc,createComponent:_c},{title:"Horizontal 2 Panels",description:"A resizable 2 side horizontal panel.",code:Fc,createComponent:Gc},{title:"Vertical 2 Panels",description:"A resizable 2 side vertical panel.",code:Vc,createComponent:Hc},{title:"Nested",description:"Nested panels.",code:qc,createComponent:Jc}]},Kc=t=>{const e=H(t);return()=>e(Wc)},Xc=()=>ot.map(t=>`
& button.plain {
  color: var(--font-color-secondary);
}
& button.plain.${t}::after {
  color: var(--font-color-secondary);
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Dt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i,option:r}=n.tags,c=O(t),l=zt(t),u=xt(t),d=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
      border: 0;
    }
    dialog {
      outline: none;
    }
    & button {
      &.lg {
        padding: 0.8rem;
      }
      box-shadow: var(--shadow-s);

      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    ${Xc()}
  `;return function(...b){let[{size:p=e.size??"md",variant:g=e.variant??"outline",color:h=e.color??"neutral",label:y,Option:f,options:S,defaultOption:w,getOptionLabel:k,getOptionValue:D,onSelect:A=()=>{},loading:N,...B},M]=J(b);const P=bt(t,{variant:g,color:h,size:p}),G=n.state(w?k(w):y),F=n.state(!1),z=n.state(0),$=()=>{V.openDialog(),V.focus(),F.val=!0},C=()=>{V.closeDialog(),F.val=!1},v=()=>{F.val=!1},x=I=>{V.open?C():$(),I.preventDefault()},T=({option:I,index:X})=>tt=>{G.val=k(I),U.value=D(I),U.setCustomValidity(""),z.val=X,C(),A(I),tt.preventDefault()},E=I=>{if(V.open)switch(I.preventDefault(),I.key){case"Escape":C();break;case"ArrowDown":z.val<S.length-1?z.val++:z.val=0;break;case"ArrowUp":z.val<=0?z.val=S.length-1:z.val--;break;case"Enter":V.open?(G.val=k(S[z.val]),U.value=D(r),A(S[z.val]),C()):$();break}},_=()=>u({tabindex:"0",class:[h,g]},S.map((I,X)=>s({class:()=>z.val==X&&"active",onclick:T({option:I,index:X})},f(I)))),R=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":F,"aria-label":y,onclick:x,color:h,variant:g,size:p,class:N==!0&&"loading",disabled:N},()=>!G.val&&y,G,()=>N==!0&&P({visibility:N})),V=l({triggerEl:R,contentEl:_(),onClose:v}),U=i({...B,"aria-label":y,tabindex:"-1"},r({value:""},"--Select Category--"),S.map(I=>r({value:D(I)},k(I))));return w?U.value=D(w):U.value=B.value,a({...B,class:["select",h,p,d,e==null?void 0:e.class,B==null?void 0:B.class],onkeydown:E},U,R,V)}}const Rn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Dt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return l=>i({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Zc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,c=Dt(t),l=O(t,{variant:"solid",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],d=m=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(m.label),r(m.code));return()=>o({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},a(c({name:"country",options:u,Option:d,getOptionValue:({code:b})=>b,getOptionLabel:({label:b})=>b,label:"Select a country..."})),s(l({type:"submit"},"Submit")))},Yc=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,Qc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,div:i,span:r}=e.tags,c=Dt(t),l=O(t,{variant:"solid",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],m=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(b.label),r(b.code));return()=>o({onsubmit:p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(g))}},a(c({name:"country",options:d,Option:m,defaultOption:d.find(({code:p})=>p==u),getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Select a country..."})),s(l({type:"submit"},"Submit")))},tl=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };
    return form(
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
};
`,el=t=>{const{bau:e,css:n,window:o}=t,{form:a,article:s,footer:i,div:r,span:c}=e.tags,l="country",u=Dt(t),d=O(t,{variant:"solid",color:"primary"}),m=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=p=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},c(p.label),c(p.code));return()=>{const p=f=>{f.preventDefault();const S=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(S))},g=({code:f})=>f,h=f=>{const S=new URLSearchParams(o.location.search);S.delete(l),S.append(l,g(f)),o.history.replaceState("","",`?${S.toString()}${o.location.hash}`)},y=new URLSearchParams(o.location.search);return a({onsubmit:p},s(u({name:l,options:m,Option:b,defaultOption:m.find(({code:f})=>f==y.get(l)),getOptionValue:g,getOptionLabel:({label:f})=>f,label:"Select a country...",onSelect:h})),i(d({type:"submit"},"Submit")))}},nl=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import select from "@grucloud/bau-ui/select";

export default (context: Context) => {
  const { bau, css, window } = context;
  const { form, article, footer, div, span } = bau.tags;

  const selectName = "country";

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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    const getOptionValue = ({ code }: any) => code;

    const onSelect = (option: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(selectName);
      search.append(selectName, getOptionValue(option));
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    const search = new URLSearchParams(window.location.search);

    return form(
      { onsubmit },
      article(
        Select({
          name: selectName,
          options,
          Option,
          defaultOption: options.find(
            ({ code }) => code == search.get(selectName)
          ),
          getOptionValue,
          getOptionLabel: ({ label }: any) => label,
          label: "Select a country...",
          onSelect,
        })
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,ol=t=>{const{bau:e}=t,{form:n,article:o,footer:a,span:s}=e.tags,i=Dt(t),r=O(t,{variant:"solid",color:"primary"}),c=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],l=u=>s({},u);return()=>n({onsubmit:d=>{d.preventDefault();const m=Object.fromEntries(new FormData(d.currentTarget));alert(JSON.stringify(m))}},o(i({name:"region",options:c,Option:l,label:"Select a region",getOptionValue:d=>d,getOptionLabel:d=>d,required:!0,oninvalid:d=>{d.target.setCustomValidity("Please select an AWS region")}})),a(r({type:"submit"},"Submit")))},al=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,rl=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,span:i,div:r}=e.tags,c=O(t,{variant:"outline"}),l=O(t,{variant:"solid",color:"primary"}),u=Dt(t),d=m=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(m.flag),i(m.name.common));return()=>{const m=e.state([]),b=e.state(!1),p=e.state("");async function g({url:f,transform:S=w=>w}){try{b.val=!0;const w=await fetch(f,{});if(w.ok){const k=await w.json();m.val=S(k)}else p.val=w.statusText}catch(w){p.val=w.message}finally{b.val=!1}}const h=()=>g({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:f=>f.sort((S,w)=>S.name.common.localeCompare(w.name.common))});return h(),o({onsubmit:f=>{f.preventDefault();const S=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(S))}},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({name:"country",options:m.val,Option:d,getOptionValue:({name:f})=>f.common,getOptionLabel:({name:f})=>f.common,label:"Country",id:"country",loading:b.val,required:!0}),c({onclick:()=>h()},"Reload")),s(l({type:"submit"},"Submit")))}},sl=`import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, span, div } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const Select = select(context);

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

  return () => {
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

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,il={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Yc,createComponent:Zc},{title:"Default Option",description:"Select with a default option",code:tl,createComponent:Qc},{title:"State in URL",description:"Select with state in URL",code:nl,createComponent:el},{title:"Select AWS region",description:"Select the AWS region",code:al,createComponent:ol},{title:"Loading Indicator",description:"Select with a loading indicator",code:sl,createComponent:rl}],gridItem:Rn},cl=t=>{const e=H(t);return()=>e(il)};function Se(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,s=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"outline",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["select-native",u,c,l,s,e==null?void 0:e.class,d==null?void 0:d.class]},m)}}const jn=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=Se(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a({...i,"aria-label":"select-country"},s.map(({label:r,phone:c})=>o({value:c},r)))},ll=t=>{const{bau:e}=t,{option:n,form:o,footer:a}=e.tags,s=O(t,{variant:"outline",color:"primary"}),i=Se(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>o({onsubmit:l=>{l.preventDefault();const u=Object.fromEntries(new FormData(l.currentTarget));alert(JSON.stringify(u))}},i({name:"my-select"},n({value:""},"--Please choose a phone code--"),r.map(({label:l,phone:u})=>n({value:u},l))),a(s({type:"submit"},"Submit")))},ul=`import { Context } from "@grucloud/bau-ui/context";
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

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };
    return form(
      { onsubmit },
      SelectNative(
        { name: "my-select" },
        option({ value: "" }, "--Please choose a phone code--"),
        phoneOptions.map(({ label, phone }) => option({ value: phone }, label))
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,dl=t=>{const{bau:e,window:n}=t,{option:o,form:a,footer:s}=e.tags,i=O(t,{variant:"outline",color:"primary"}),r=Se(t),c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l="my-select";return()=>{const u=g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))},d=g=>{const h=new URLSearchParams(n.location.search);h.delete(l),h.append(l,g.target.value),n.history.replaceState("","",`?${h.toString()}${n.location.hash}`)},b=new URLSearchParams(n.location.search).get(l),p=c.map(({label:g,code:h})=>o({value:h,selected:h==b},g));return a({onsubmit:u},r({name:l,oninput:d},o({value:""},"--Please choose a phone code--"),p),s(i({type:"submit"},"Submit")))}},ml=`import { Context } from "@grucloud/bau-ui/context";
import selectNative from "@grucloud/bau-ui/selectNative";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
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

  const selectName = "my-select";

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    const oninput = (event: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(selectName);
      search.append(selectName, event.target.value);
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    const search = new URLSearchParams(window.location.search);
    const selectValueFromUrl = search.get(selectName);

    const options = phoneOptions.map(({ label, code }) =>
      option(
        {
          value: code,
          selected: code == selectValueFromUrl,
        },
        label
      )
    );

    return form(
      { onsubmit },
      SelectNative(
        { name: selectName, oninput },
        option({ value: "" }, "--Please choose a phone code--"),
        options
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,pl={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:ul,createComponent:ll},{title:"State URL",description:"A selectNative with state in URL",code:ml,createComponent:dl}],gridItem:jn},bl=t=>{const e=H(t);return()=>e(pl)},gl=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Tt(t),i=()=>a({class:n`
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
          `})));return()=>o(i())},hl=`import skeleton from "@grucloud/bau-ui/skeleton";
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

  return () => {
    return section(CardSkeleton());
  };
};
`,fl=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Tt(t),i=()=>a({class:n`
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
            `}))));return()=>o(i())},vl=`import skeleton from "@grucloud/bau-ui/skeleton";
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

  return () => {
    return section(ListSkeleton());
  };
};
`,yl=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:s,tr:i,td:r}=e.tags,c=Tt(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),l=()=>a(s(new Array(8).fill("").map(()=>i(r(c({class:n`
                  width: 5rem;
                `})),r(c()),r(c()),r(c()),r(c({class:n`
                  width: 20rem;
                `}))))));return()=>o(l())},xl=`import skeleton from "@grucloud/bau-ui/skeleton";
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

  return () => {
    return section(TableSkeleton());
  };
};
`,wl=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:s,article:i}=e.tags,r=n`
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
  `,c=Tt(t,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),l=Tt(t);function u({columnsSize:d=4}){return o({class:r},a(new Array(d).fill("").map(()=>c(s("1")))),i(l("")))}return()=>o(u({columnsSize:3}))},Sl=`import skeleton from "@grucloud/bau-ui/skeleton";
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

  return () => {
    return section(TabsSkeleton({ columnsSize: 3 }));
  };
};
`,Cl={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:hl,createComponent:gl},{title:"List",description:"A list skeleton.",code:vl,createComponent:fl},{title:"Table",description:"A table skeleton.",code:xl,createComponent:yl},{title:"Tabs",description:"A tabs skeleton.",code:Sl,createComponent:wl}],variantColorTableDisable:!0,variantSizeDisable:!0},kl=t=>{const e=H(t);return()=>e(Cl)};function Bt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${ot.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`)};
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},b]=J(c);return a({...m,type:"range",class:["slider",d,u,l,i,e==null?void 0:e.class,m.class]},b)}}const _n=t=>{const{bau:e}=t,n=e.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=Bt(t);return s=>a({"aria-label":"slider",...s,oninput:o})},El=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:s,footer:i}=e.tags,r=Bt(t),c=O(t,{variant:"solid",color:"primary"});return()=>n({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))}},o(a("Slider with step, min and max",s,r({name:"slider-simple",step:20,min:-100,max:100}))),i(c({type:"submit"},"Submit")))},Tl=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, label, br, footer } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
};
`,Al=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:s,footer:i}=e.tags,r=Bt(t),c=O(t,{variant:"solid",color:"primary"});return()=>{const l=e.state(0);return n({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},o(a("Slider Value:",l,s,r({oninput:m=>{l.val=m==null?void 0:m.target.value},name:"slider-simple",step:20,min:-100,max:100}))),i(c({type:"submit"},"Submit")))}},Dl=`import { Context } from "@grucloud/bau-ui/context";
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
`,Bl=t=>{const{bau:e,css:n}=t,{article:o,footer:a,form:s,label:i,datalist:r,br:c,option:l}=e.tags,u=Bt(t),d=O(t,{variant:"solid",color:"primary"});return()=>s({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},o(i({for:"temp"},"Choose a comfortable temperature"),c,u({class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(b=>l({value:Number(b),label:b})))),a(d({type:"submit"},"Submit")))},Nl=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau, css } = context;
  const { article, footer, form, label, datalist, br, option } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };
    return form(
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
};
`,Ol=t=>{const{bau:e,css:n}=t,{article:o,footer:a,form:s,label:i,datalist:r,br:c,option:l}=e.tags,u=Bt(t),d=O(t,{variant:"solid",color:"primary"});return()=>s({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},o({class:n`
            display: flex;
          `},i({for:"temp-vertical"},"Choose a comfortable temperature"),c,u({id:"temp-vertical",name:"temp",list:"markers-vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(b=>l({value:Number(b),label:b})))),a(d({type:"submit"},"Submit")))},Ml=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau, css } = context;
  const { article, footer, form, label, datalist, br, option } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
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
          id: "temp-vertical",
          name: "temp",
          list: "markers-vertical",
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
      ),
      footer(ButtonSubmit({ type: "submit" }, "Submit"))
    );
  };
};
`,Il=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:s,footer:i}=e.tags,r=Bt(t),c=O(t,{variant:"solid",color:"primary"}),l="my-slider";return()=>{const u=new URLSearchParams(window.location.search).get(l);return n({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},o(a("Slider Value:",s,r({oninput:b=>{const p=new URLSearchParams(window.location.search);p.delete(l),p.append(l,b.target.value),window.history.replaceState("","",`?${p.toString()}${window.location.hash}`)},defaultValue:u,name:l,step:20,min:-100,max:100}))),i(c({type:"submit"},"Submit")))}},Ll=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import slider from "@grucloud/bau-ui/slider";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, label, br, footer } = bau.tags;

  const Slider = slider(context);
  const ButtonSubmit = button(context, { variant: "solid", color: "primary" });

  const sliderName = "my-slider";

  return () => {
    const defaultValue = new URLSearchParams(window.location.search).get(
      sliderName
    );

    const oninput = (event: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(sliderName);
      search.append(sliderName, event.target.value);
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
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
          br,
          Slider({
            oninput,
            defaultValue,
            name: sliderName,
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
`,$l={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Uncontrolled slider",description:"A uncontrolled slider.",code:Tl,createComponent:El},{title:"Controlled slider",description:"A controlled slider.",code:Dl,createComponent:Al},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Nl,createComponent:Bl},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Ml,createComponent:Ol},{title:"State URL",description:"State stored in the URL",code:Ll,createComponent:Il}],gridItem:_n},Pl=t=>{const e=H(t);return()=>e($l)},Un=(t,e)=>{const n=bt(t,e);return o=>n({...o})},zl=t=>{const{bau:e}=t,{section:n}=e.tags,o=O(t,{variant:"solid",color:"primary"}),a=bt(t,{size:"lg"});return()=>{const s=e.state(!0);return n(o({onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),a({visibility:s}))}},Rl=`import spinner from "@grucloud/bau-ui/spinner";
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

  return () => {
    const runningState = bau.state(true);

    return section(
      Button(
        {
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      Spinner({ visibility: runningState })
    );
  };
};
`,jl={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Rl,createComponent:zl}],gridItem:Un},_l=t=>{const e=H(t);return()=>e(jl)},Ul=()=>ot.map(t=>"").join(`
`),Gn=(t,e)=>(n,o)=>{const a=new URLSearchParams(t.window.location.search);return a.delete(e),a.append(e,n),o&&Object.entries(o).map(([s,i])=>(a.delete(s),a.append(s,i))),`?${a.toString()}`};function Fn(t,e={}){const{bau:n,css:o,window:a}=t,{div:s,ul:i,li:r,span:c,section:l}=n.tags,u=o`
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
    ${Ul()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...m){let[{color:b,variant:p="plain",size:g,stepperDefs:h=[],stepperName:y,activeStepIndex:f=n.state(0),...S},w]=J(m);const k=n.state(h.map((P,G)=>({...P,index:G}))),D=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(P,G,F)=>{P.apply(G,F);const z=F[2]??"";["?","#"].includes(z[0])&&M()}});const A=n.derive(()=>k.val[f.val]),N=P=>{const{Header:G,disabled:F,name:z,index:$}=P;return r({class:()=>[A.val.name==z&&"active",f.val<$&&"not-completed",f.val>$&&"completed",F&&"disabled"]},c({class:"step-number"},$+1),c({class:"step-label"},()=>G(P)))},B=P=>h.findIndex(({name:G})=>G==P.name),M=()=>{const G=new URLSearchParams(a.location.search).get(y)??h[0].name,F=Math.max(h.findIndex(({name:z})=>z==G),0);F<f.val&&D.val.pop(),D.val.some(({name:z})=>G==z)||D.val.push(h[F]),f.val=F};return M(),s({bauMounted:({element:P})=>{a.addEventListener("popstate",M)},bauUnmounted:()=>{a.removeEventListener("popstate",M)},class:["stepper",p,g,b,u,e==null?void 0:e.class,S.class]},n.loop(k,i(),N),n.loop(D,l(),P=>s({class:()=>["content",P.name==A.val.name&&"visible"]},P.Content({nextStep:h[B(P)+1],previousStep:h[B(P)-1]}))))}}const je="my-wizard",Gl=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:s,section:i,a:r,ul:c,li:l}=e.tags,u=dt(t),d=gt(t),m=Fn(t),b=Gn(t,je),p=O(t,{variant:"outline",color:"primary"}),g=O(t,{variant:"solid",color:"primary"});return()=>{const h=({nextStep:S})=>w=>{w.preventDefault();const{organization:k}=w.target.elements;n.history.pushState("","",b(S.name,{organization:k.value}))},y=S=>{var A;S.preventDefault();const{organization:w}=(A=n.document.forms)==null?void 0:A.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${w.value}, choice:${D}`)};return i(m({stepperDefs:[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>d({onsubmit:h({nextStep:S}),id:"formStep1"},s("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(g({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:w})=>d(c(l(r({href:b(S.name,{choice:"choice1"})},"Choice 1")),l(r({href:b(S.name,{choice:"choice2"})},"Choice 2"))),o(p({href:b(w.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>d({onsubmit:y},a("My stepper 3 Content"),o(p({href:b(S.name)},"Previous: Step 2"),g({type:"submit"},"Save")))}],stepperName:je}))}},Fl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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

  return () => {
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
    return section(Stepper({ stepperDefs, stepperName }));
  };
};
`,_e="stepper-vertical",Hl=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:s,label:i,section:r,a:c,ul:l,li:u}=e.tags,d=dt(t),m=gt(t),b=Fn(t,{class:o`
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
    `}),p=Gn(t,_e),g=O(t,{variant:"outline",color:"primary"}),h=O(t,{variant:"solid",color:"primary"});return()=>{const y=({nextStep:w})=>k=>{k.preventDefault();const{organization:D}=k.target.elements;n.history.pushState("","",p(w.name,{organization:D.value}))},f=w=>{var N;w.preventDefault();const{organization:k}=(N=n.document.forms)==null?void 0:N.formStep1.elements,A=new URLSearchParams(n.location.search).get("choice");alert(`organization ${k.value}, choice:${A}`)};return r(b({stepperDefs:[{name:"step1",Header:()=>"Step 1",Content:({nextStep:w})=>m({onsubmit:y({nextStep:w}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:w,previousStep:k})=>m(l(u(c({href:p(w.name,{choice:"choice1"})},"Choice 1")),u(c({href:p(w.name,{choice:"choice2"})},"Choice 2"))),a(g({href:p(k.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:w})=>m({onsubmit:f},s("My stepper 3 Content"),a(g({href:p(w.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}],stepperName:_e}))}},Vl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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

  return () => {
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
    return section(Stepper({ stepperDefs, stepperName }));
  };
};
`,Jl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:Fl,createComponent:Gl},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:Vl,createComponent:Hl}]},ql=t=>{const e=H(t);return()=>e(Jl)},Wl=()=>ot.map(t=>`
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
`);function Zt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
    ${Wl()}
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},m]=J(r);return a({...d,class:["switch",s,u,l,c,e==null?void 0:e.class,d.class],type:"checkbox"},m)}}const Hn=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:s}=n.tags,i=Zt(t,e);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},s("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),s("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Kl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:s,article:i}=e.tags,r=Zt(t,{variant:"outline",color:"primary"}),c=O(t,{variant:"outline",color:"primary"}),l=n`
    & label {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 0.5rem;
    }
    & article {
      display: inline-flex;
      flex-direction: column;
    }
  `;return()=>a({onsubmit:d=>{d.preventDefault();const m=Object.fromEntries(new FormData(d.currentTarget));alert(JSON.stringify(m))},class:l},i(s("My shinny switch",r({name:"my-shinny-switch"})),s("Switch with default",r({name:"my-switch--default",defaultChecked:"on"}))),o(c({type:"submit"},"Submit")))},Xl=`import { Context } from "@grucloud/bau-ui/context";
import createSwitch from "@grucloud/bau-ui/switch";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { footer, form, label, article } = bau.tags;

  const Switch = createSwitch(context, {
    variant: "outline",
    color: "primary",
  });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const className = css\`
    & label {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      gap: 0.5rem;
    }
    & article {
      display: inline-flex;
      flex-direction: column;
    }
  \`;

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit, class: className },
      article(
        label("My shinny switch", Switch({ name: "my-shinny-switch" })),
        label(
          "Switch with default",
          Switch({ name: "my-switch--default", defaultChecked: "on" })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Zl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:s,article:i}=e.tags,r=Zt(t,{variant:"outline",color:"primary"}),c=O(t,{variant:"outline",color:"primary"}),l=n`
    & label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;return()=>{const u=e.state("on");return a({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))},class:l},i(s("My controlled switch",r({name:"my-shinny-switch",onchange:b=>{u.val=b.target.value},checked:u}))),o(c({type:"submit"},"Submit")))}},Yl=`import { Context } from "@grucloud/bau-ui/context";
import createSwitch from "@grucloud/bau-ui/switch";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { footer, form, label, article } = bau.tags;

  const Switch = createSwitch(context, {
    variant: "outline",
    color: "primary",
  });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const className = css\`
    & label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  \`;

  return () => {
    const switchState = bau.state("on");

    const onchange = (event: any) => {
      switchState.val = event.target.value;
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit, class: className },
      article(
        label(
          "My controlled switch",
          Switch({ name: "my-shinny-switch", onchange, checked: switchState })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Ql=t=>{const{bau:e,css:n,window:o}=t,{footer:a,form:s,label:i,article:r}=e.tags,c="my-shinny-switch",l=Zt(t,{variant:"outline",color:"primary"}),u=O(t,{variant:"outline",color:"primary"}),d=n`
    & label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;return()=>{const m=new URLSearchParams(o.location.search);return s({onsubmit:g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))},class:d},r(i("My switch",l({name:c,onchange:g=>{const h=new URLSearchParams(o.location.search);h.delete(g.target.name),h.append(g.target.name,g.target.checked),o.history.replaceState("","",`?${h.toString()}${o.location.hash}`)},defaultChecked:m.get(c)=="true"}))),a(u({type:"submit"},"Submit")))}},tu=`import { Context } from "@grucloud/bau-ui/context";
import createSwitch from "@grucloud/bau-ui/switch";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css, window } = context;
  const { footer, form, label, article } = bau.tags;

  const switchName = "my-shinny-switch";

  const Switch = createSwitch(context, {
    variant: "outline",
    color: "primary",
  });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const className = css\`
    & label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  \`;

  return () => {
    const search = new URLSearchParams(window.location.search);

    const onchange = (event: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(event.target.name);
      search.append(event.target.name, event.target.checked);
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(event.currentTarget));
      alert(JSON.stringify(payload));
    };

    return form(
      { onsubmit, class: className },
      article(
        label(
          "My switch",
          Switch({
            name: switchName,
            onchange,
            defaultChecked: search.get(switchName) == "true" ? true : false,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,eu={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Uncontrolled Switch",description:"A uncontrolled switch.",code:Xl,createComponent:Kl},{title:"Controlled Switch",description:"A controlled switch.",code:Yl,createComponent:Zl},{title:"State in URL",description:"A switch with state in URL",code:tu,createComponent:Ql}],gridItem:Hn},nu=t=>{const e=H(t);return()=>e(eu)},ou=()=>ot.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function _t(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:s}=e,{div:i,ul:r,li:c,a:l}=n.tags,u=o`
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
    ${ou()}
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",tabsKey:h="tabs",...y}]=J(m);const f=n.state(s),S=B=>f.val.find(M=>M.name==B),w=n.state(s[0]),k=()=>{var P,G;const M=new URLSearchParams(a.location.search).get(h)??s[0].name;if(M!=w.val.name){const F=S(M);(P=w.val.exit)==null||P.call(),w.val=F,(G=F==null?void 0:F.enter)==null||G.call()}};k(),a.history.pushState=new Proxy(a.history.pushState,{apply:(B,M,P)=>{B.apply(M,P);const G=P[2]??"";["?","#"].includes(G[0])&&k()}});const D=B=>{const M=new URLSearchParams(a.location.search);return M.delete(h),M.append(h,B),`?${M.toString()}`},A=B=>{const{Header:M,disabled:P,name:G}=B;return c({class:()=>[w.val.name==G&&"active",P&&"disabled"]},l({href:D(G)},M(B)))},N=i({class:["tabs",p,b,g,u,e==null?void 0:e.class,y.class],bauMounted:({element:B})=>{a.addEventListener("popstate",k)},bauUnmounted:()=>{a.removeEventListener("popstate",k)}},n.loop(f,r(),A),n.bind({deps:[w],render:()=>({Content:B})=>B?B(y):""}));return N.addEventListener("tab.add",B=>{var P;const{tab:M}=B.detail;(P=M.enter)==null||P.call(),f.val.push(M)},!1),N.addEventListener("tab.remove",B=>{var P;const M=f.val.findIndex(G=>G.name==B.detail.tabName);M>0&&((P=f.val[M].exit)==null||P.call(),f.val.splice(M,1))},!1),N}}const au=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=_t(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>s({})},ru=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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

  return () => {
    return Tabs({});
  };
};
`,su=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=_t(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>s({tabsKey:"my-tab"})},iu=`import tabs from "@grucloud/bau-ui/tabs";
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

  return () => {
    return Tabs({ tabsKey: "my-tab" });
  };
};
`,Vn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},cu=t=>{const{css:e}=t,n=_t(t,{tabDefs:Vn(t),class:e`
      flex-direction: column-reverse;
    `});return()=>n({})},lu=`import tabs from "@grucloud/bau-ui/tabs";
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

  return () => {
    return Tabs({});
  };
};
`,uu=t=>{const{css:e}=t,n=Vn(t),o=_t(t,{tabDefs:n,class:e`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},du=`import tabs from "@grucloud/bau-ui/tabs";
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

  return () => {
    return Tabs({});
  };
};
`,mu={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ru,createComponent:au},{title:"Extended Tabs",description:"An extended tabs.",code:iu,createComponent:su},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:lu,createComponent:cu},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:du,createComponent:uu}]},pu=t=>{const e=H(t);return()=>e(mu)};function Ut(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:s}=n.tags;a`
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
  `;return function(...c){let[l,u]=J(c);return s({...l,class:["table-container",i,e==null?void 0:e.class,l==null?void 0:l.class]},u)}}const bu=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:u}=e.tags;function d(h,y,f,S,w){return{name:h,calories:y,fat:f,carbs:S,protein:w}}const m=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],b=({name:h,calories:y})=>i(s(h),s({class:n`
            text-align: right;
          `},y)),p=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ut(t,{class:n`
      max-width: 650px;
    `});return()=>o(g(r(u("Basic Table"),p(),l(m.map(b)))))},gu=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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

  return () => {
    return section(
      TableSimple(
        table(caption("Basic Table"), TableHeader(), tbody(rows.map(Row)))
      )
    );
  };
};
`;function Nt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const hu=[Nt("Frozen yoghurt",159,6,24,4),Nt("Ice cream sandwich",237,9,37,4.3),Nt("Eclair",262,16,24,6),Nt("Cupcake",305,3.7,67,4.3),Nt("Gingerbread",356,16,49,3.9)],fu=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:u}=e.tags,d=({name:p,calories:g})=>i(s(p),s({class:n`
            text-align: right;
          `},g)),m=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ut(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(r(u("Table Dense"),m(),l(hu.map(d)))))},vu=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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

  return () => {
    return section(
      TableDense(
        table(caption("Table Dense"), TableHeader(), tbody(rows.map(Row)))
      )
    );
  };
};
`;function Ot(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const yu=[Ot("Frozen yoghurt",159,6,24,4),Ot("Ice cream sandwich",237,9,37,4.3),Ot("Eclair",262,16,24,6),Ot("Cupcake",305,3.7,67,4.3),Ot("Gingerbread",356,16,49,3.9)],xu=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:u}=e.tags,d=({name:p,calories:g})=>i(s(p),s({class:n`
            text-align: right;
          `},g)),m=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ut(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(r(u("Table Zebra"),m(),l(yu.map(d)))))},wu=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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

  return () => {
    return section(
      TableZebra(
        table(caption("Table Zebra"), TableHeader(), tbody(rows.map(Row)))
      )
    );
  };
};
`,Su={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:gu,createComponent:bu},{title:"Dense",description:"A dense table.",code:vu,createComponent:fu},{title:"Zebra",description:"A zebra table.",code:wu,createComponent:xu}]},Cu=t=>{const e=H(t);return()=>e(Su)},ku=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:s,section:i,article:r}=e.tags,c=cn(t),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),s({id:"h3-1-1"},"h3 1 1"),s({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),s({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},Eu=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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

  return () => {
    return section(
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
};
`,Tu={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Eu,createComponent:ku}]},Au=t=>{const e=H(t);return()=>e(Tu)};function Jn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=ve(t),i=O(t),r=bt(t),c=o`
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
  `,l=({label:p,icon:g,...h})=>i({"aria-label":p,title:p,...h},g),u=({count:p,totalCount:g,page:h,rowsPerPage:y})=>a({class:"pages-numbers"},Number(h-1)*Number(y)+(p>0?1:0),"-",Math.min(h*y,g)," of ",g),d=({count:p,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(p>0?1:0),"-",g*h),m=p=>p<=1,b=(p,g,h)=>p>=Math.ceil(g/h);return function(...g){let[{size:h=e.size??"md",variant:y=e.variant??"outline",color:f=e.color??"neutral",count:S=0,totalCount:w=0,page:k=1,rowsPerPage:D=50,onPageChange:A,isLoading:N=!1,disableFirst:B=()=>m(k),disablePrevious:M=()=>m(k),disableNext:P=()=>b(k,w,D),disableLast:G=()=>b(k,w,D),...F}]=J(g);const z=Math.max(0,Math.ceil(w/D)),$=A({page:1}),C=A({page:k-1}),v=A({page:k+1}),x=A({page:z}),T=[{label:"First",icon:"⟪",onclick:$,disabled:B()},{label:"Previous",icon:"⟨",onclick:C,disabled:M()},{label:"Next",icon:"⟩",onclick:v,disabled:P()},{label:"Last",icon:"⟫",onclick:x,disabled:G()}];return a({...F,class:["table-pagination",c,N&&"disabled",e==null?void 0:e.class,F==null?void 0:F.class]},r({class:"spinner",visibility:N,size:"md"}),w>0?u({count:S,totalCount:w,page:k,maxPages:z,rowsPerPage:D}):d({count:S,page:k,maxPages:z,rowsPerPage:D}),s({variant:y,color:f},T.map(E=>l({...E,variant:y,color:f}))))}}const Du=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Bu=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:c}=e.tags,l=Du(45),u=({name:p,email:g})=>s(a(p),a(g)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),m=Jn(t),b=Ut(t,{class:n`
      max-width: 650px;
    `});return()=>{const p=e.state(l),g=e.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=e.derive(()=>p.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),y=({page:f})=>S=>{g.val.page=f};return b(i(d(),()=>c(h.val.map(u))),()=>m({...g.val,onPageChange:y}))}},Nu=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:c,div:l}=e.tags,u=e.state(!1),d=e.state([]),m=e.state(""),b=e.derive(()=>d.val.length),p=e.state(1),g=e.state(10),h=e.derive(()=>d.val),y=B=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(B).toString()}`,f=({page:B})=>M=>{p.val=B,S(y({page:B,per_page:g.val}))};S(y({page:1,per_page:g.val}));async function S(B){try{u.val=!0;const M=await fetch(B,{});if(M.ok){const P=await M.json();d.val=P;return}throw M}catch(M){m.val=M.message}finally{u.val=!1}}const w=({name:B,description:M,stargazers_count:P})=>s(a(B),a(M),a({class:n`
            text-align: right;
          `},P)),k=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),D=Jn(t),A=Ut(t,{class:n`
      min-width: 650px;
    `}),N=({message:B})=>l(B);return()=>A(()=>D({rowsPerPage:g.val,page:p.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:f,disableNext:()=>!1}),i(k(),()=>m.val&&N({message:m.val}),()=>c(h.val.map(w))))},Ou=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:s,h2:i,tr:r}=e.tags,c=Bu(t),l=Nu(t),u=(...d)=>a({class:n`
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
        `},d);return()=>o({id:"pagination"},i(r("Table Pagination")),s("Asynchronous Pagination"),u(l()),s("Simple Pagination"),u(c()))};function ht(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{button:s}=n.tags;a`
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
    &[selected="true"] {
      background-color: var(--toggle-background-color);
      box-shadow: var(--shadow-lg);
    }
    &[selected="true"].solid {
      filter: brightness(80%) !important;
    }
    &.outline,
    &.solid {
      box-shadow: var(--shadow-sm);
    }
    &.outline:hover,
    &.solid:hover {
      box-shadow: var(--shadow-lg);
    }
    &:hover:not([aria-pressed="true"]) {
      filter: brightness(var(--brightness-hover)) !important;
    }
    &:hover.solid:not([aria-pressed="true"]) {
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
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",onclick:m,...b},p]=J(c);return s({type:"button",...b,onclick:g=>{const{target:h}=g,y=h.getAttribute("aria-pressed");h.setAttribute("aria-pressed",y=="true"?"false":"true"),m&&m(g)},class:["toggle",l,d,u,i,e==null?void 0:e.class,b==null?void 0:b.class]},p)}}const qn=(t,e)=>{const{bau:n}=t,o=ht(t,e);return a=>{const s=n.state(!1);return o({...a,selected:s,onclick:()=>s.val=!s.val},"Toggle Me")}},Mu=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=ht(t,{variant:"solid",color:"primary"}),i=O(t,{variant:"outline",color:"primary"});return()=>{const r=e.state(!1);return n({onsubmit:l=>{l.preventDefault(),alert(r.val)}},o(s({name:"my-toogle","aria-pressed":r,onclick:()=>r.val=!r.val},"Toggle Me")),a(i({type:"submit"},"Submit")))}},Iu=`import { Context } from "@grucloud/bau-ui/context";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;

  const Toggle = toggle(context, { variant: "solid", color: "primary" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const selectedState = bau.state(false);

    const onsubmit = (event: any) => {
      event.preventDefault();
      alert(selectedState.val);
    };

    return form(
      { onsubmit },
      article(
        Toggle(
          {
            name: "my-toogle",
            "aria-pressed": selectedState,
            onclick: () => (selectedState.val = !selectedState.val),
          },
          "Toggle Me"
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Lu=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,article:s,footer:i}=e.tags,r="my-toogle-uncontrolled",c=ht(t,{variant:"solid",color:"primary"}),l=O(t,{variant:"outline",color:"primary"});return()=>a({onsubmit:d=>{d.preventDefault();const m=o.getElementsByName(r)[0];alert(m.getAttribute("aria-pressed"))}},s(c({name:r},"Toggle Me")),i(l({type:"submit"},"Submit")))},$u=`import { Context } from "@grucloud/bau-ui/context";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { document } = window;
  const { form, article, footer } = bau.tags;
  const toogleName = "my-toogle-uncontrolled";
  const Toggle = toggle(context, { variant: "solid", color: "primary" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const onsubmit = (event: any) => {
      event.preventDefault();
      const buttonEl = document.getElementsByName(toogleName)[0];
      alert(buttonEl.getAttribute("aria-pressed"));
    };

    return form(
      { onsubmit },
      article(
        Toggle(
          {
            name: toogleName,
          },
          "Toggle Me"
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Pu=t=>{const{bau:e,window:n}=t,{history:o}=n,{form:a,article:s,footer:i}=e.tags,r=ht(t,{variant:"solid",color:"primary"}),c=O(t,{variant:"outline",color:"primary"});return()=>{const l="toggle-url",u=new URLSearchParams(n.location.search).get(l)=="pressed"?"true":"false";return a({onsubmit:b=>{b.preventDefault();const p=document.getElementsByName(l)[0];alert(p.getAttribute("aria-pressed"))}},s(r({name:l,"aria-pressed":u,onclick:b=>{const p=new URLSearchParams(n.location.search);p.delete(l),b.target.getAttribute("aria-pressed")=="true"&&p.append(l,"pressed"),o.replaceState("","",`?${p.toString()}${n.location.hash}`)}},"Toggle Me")),i(c({type:"submit"},"Submit")))}},zu=`import { Context } from "@grucloud/bau-ui/context";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { history } = window;
  const { form, article, footer } = bau.tags;

  const Toggle = toggle(context, { variant: "solid", color: "primary" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  return () => {
    const toggleName = "toggle-url";

    const toggleValueFromUrl =
      new URLSearchParams(window.location.search).get(toggleName) == "pressed"
        ? "true"
        : "false";

    const onsubmit = (event: any) => {
      event.preventDefault();
      const buttonEl = document.getElementsByName(toggleName)[0];
      alert(buttonEl.getAttribute("aria-pressed"));
    };

    const onclick = (event: any) => {
      const search = new URLSearchParams(window.location.search);
      search.delete(toggleName);
      if (event.target.getAttribute("aria-pressed") == "true") {
        search.append(toggleName, "pressed");
      }
      history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    return form(
      { onsubmit },
      article(
        Toggle(
          {
            name: toggleName,
            "aria-pressed": toggleValueFromUrl,
            onclick,
          },
          "Toggle Me"
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
  };
};
`,Ru={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Controlled Toggle",description:"A controlled toggle.",code:Iu,createComponent:Mu},{title:"Uncontrolled Toggle",description:"A uncontrolled toggle.",code:$u,createComponent:Lu},{title:"State in URL",description:"Toggle with state stored in the URL.",code:zu,createComponent:Pu}],gridItem:qn},ju=t=>{const e=H(t);return()=>e(Ru)},_u=()=>ot.map(t=>`
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
`);function Yt(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
    ${_u()}
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:m=()=>{},...b},p]=J(r);const g=new Set,h=y=>{const{value:f}=y.target;d?(g.clear(),g.add(f)):g.has(f)?g.delete(f):g.add(f),m({event:y,values:[...g]})};return a({...b,class:["toggle-group",c,u,l,s,e==null?void 0:e.class,b==null?void 0:b.class],onclick:h},p)}}const Wn=(t,e)=>{const{bau:n}=t,o=Yt(t,e),a=ht(t,e);return s=>{const i=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...s,onChange:({values:l})=>{i.val=l}},r.map(({label:l,value:u})=>()=>a({...s,value:u,selected:i.val.includes(u),"area-label":l},l)))}},Uu=t=>{const{bau:e}=t,{form:n,footer:o,article:a}=e.tags,s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i="primary",r="solid",c=ht(t,{color:i,variant:r}),l=Yt(t,{color:i,variant:r}),u=O(t,{variant:"outline",color:"primary"});return()=>{const d=e.state([""]);return n({onsubmit:p=>{var y;p.preventDefault();const h=(y=p.currentTarget.querySelector("button[selected=true]"))==null?void 0:y.name;alert(h)}},a(l({exclusive:!0,onChange:({values:p})=>{d.val=p}},s.map(({label:p,value:g})=>()=>c({value:g,name:p,selected:d.val.includes(g)},p)))),o(u({type:"submit"},"Submit")))}},Gu=`import { Context } from "@grucloud/bau-ui/context";
import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, footer, article } = bau.tags;

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

  return () => {
    const selectedState = bau.state([""]);

    const onChange = ({ values }: any) => {
      selectedState.val = values;
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const formEl = event.currentTarget;
      const buttonName = formEl.querySelector("button[selected=true]")?.name;
      alert(buttonName);
    };

    return form(
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
};
`,Fu=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i="primary",r="solid",c=ht(t,{variant:r,color:i}),l=Yt(t,{variant:r,color:i}),u=O(t,{variant:"outline",color:"primary"});return()=>{const d=e.state([""]);return n({onsubmit:p=>{p.preventDefault();const h=[...p.currentTarget.querySelectorAll("button[selected=true]")].map(({name:y})=>y);alert(JSON.stringify(h))}},o(l({onChange:({values:p})=>{d.val=p}},s.map(({label:p,value:g})=>()=>c({value:g,name:p,selected:d.val.includes(g)},p)))),a(u({type:"submit"},"Submit")))}},Hu=`import { Context } from "@grucloud/bau-ui/context";
import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;

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

  return () => {
    const selectedState = bau.state([""]);

    const onChange = ({ values }: any) => {
      selectedState.val = values;
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const formEl = event.currentTarget;
      const buttonNames = [
        ...formEl.querySelectorAll("button[selected=true]"),
      ].map(({ name }: any) => name);
      alert(JSON.stringify(buttonNames));
    };

    return form(
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
};
`,Vu=t=>{const{bau:e,window:n}=t,{form:o,footer:a,article:s}=e.tags,i="my-toggle-group",r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],c="primary",l="solid",u=ht(t,{color:c,variant:l}),d=Yt(t,{color:c,variant:l}),m=O(t,{variant:"outline",color:"primary"});return()=>{const b=new URLSearchParams(n.location.search),p=e.state([...b.getAll(i)]);return o({onsubmit:y=>{y.preventDefault();const f=new URLSearchParams(n.location.search);alert(f.getAll(i))}},s(d({name:i,exclusive:!0,onChange:({values:y})=>{p.val=y;const f=new URLSearchParams(n.location.search);f.delete(i),y.forEach(S=>f.append(i,S)),n.history.replaceState("","",`?${f.toString()}${n.location.hash}`)}},r.map(({label:y,value:f})=>()=>u({value:f,name:y,selected:p.val.includes(f)},y)))),a(m({type:"submit"},"Submit")))}},Ju=`import { Context } from "@grucloud/bau-ui/context";
import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, window } = context;
  const { form, footer, article } = bau.tags;

  const toggleGroupName = "my-toggle-group";
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

  return () => {
    const search = new URLSearchParams(window.location.search);

    const selectedState = bau.state([...search.getAll(toggleGroupName)]);

    const onChange = ({ values }: any) => {
      selectedState.val = values;
      const search = new URLSearchParams(window.location.search);
      search.delete(toggleGroupName);
      values.forEach((value: string) => search.append(toggleGroupName, value));
      window.history.replaceState(
        "",
        "",
        \`?\${search.toString()}\${window.location.hash}\`
      );
    };

    const onsubmit = (event: any) => {
      event.preventDefault();
      const search = new URLSearchParams(window.location.search);
      alert(search.getAll(toggleGroupName));
    };

    return form(
      { onsubmit },
      article(
        ToggleGroup(
          { name: toggleGroupName, exclusive: true, onChange },
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
};
`,qu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Gu,createComponent:Uu},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Hu,createComponent:Fu},{title:"State in URL",description:"A toggleGroup with state in the URL.",code:Ju,createComponent:Vu}],gridItem:Wn},Wu=t=>{const e=H(t);return()=>e(qu)};function Ce(t,e={}){const{bau:n,css:o,window:a}=t,{div:s}=n.tags,i=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",...p},g]=J(c);const h=s({class:["container",...u.split("-")]},s({class:["content",b,m,d],role:"tooltip"},l)),y=A=>`move-to-${A}`,f=(A,N,B)=>{if(A()){const M=y(N);h.classList.add(M),h.classList.add(N),h.classList.remove(B)}},S=(A,N)=>{const B=y(A);h.classList.contains(B)&&(h.classList.remove(B),h.classList.add(N),h.classList.remove(A))},w=A=>{const N=h.getBoundingClientRect();f(()=>N.x<0,"right","left"),f(()=>N.x+N.width>a.innerWidth,"left","right"),f(()=>N.y<0,"bottom","top"),f(()=>N.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},k=A=>{h.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return s({...p,class:["tooltip",i,e==null?void 0:e.class,p==null?void 0:p.class],bauMounted:({element:A})=>{A.addEventListener("mouseover",w),A.addEventListener("mouseout",k)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",w),A.removeEventListener("mouseout",k)}},g,h)}}const Kn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:s}=n.tags,i=O(t),r=Ce(t,e),c=()=>o(a("A ",s("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},i(l,`${l.color} ${l.variant}`))},Ku=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,s=O(t),i=Ce(t),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:r()},s("tooltip"))},Xu=`import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p, em } = bau.tags;
  const Button = button(context);

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(p("A ", em("tooltip"), " can be any component"));

  return () => {
    return Tooltip(
      { side: "bottom-start", titleEl: TooltipContent() },
      Button("tooltip")
    );
  };
};
`,Zu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:s,section:i}=e.tags,r=Pt(t,{variant:"outline",color:"primary"}),c=Ce(t),l=()=>o(a("A ",s("tooltip")," can be any component")),u=()=>i({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Yu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Qu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Xu,createComponent:Ku},{title:"Grid",description:"Various tooltip position",code:Yu,createComponent:Zu}],gridItem:Kn},td=t=>{const e=H(t);return()=>e(Qu)},Xn=(t,e)=>{const n=ie(t,e);return o=>n(o)},ed=t=>{const{bau:e}=t,{section:n}=e.tags,o=ie(t);return()=>n(o({}))},nd=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => {
    return section(ThemeSwitch({}));
  };
};
`,od={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:nd,createComponent:ed}],gridItem:Xn},ad=t=>{const e=H(t);return()=>e(od)},Zn=({parent:t,grandParent:e})=>n=>{const{children:o=[],...a}=n,s={...a};return s.children=o==null?void 0:o.map(Zn({parent:n,grandParent:t})),t&&(t.parent=e),s.parent=t,s},rd=({css:t,createGlobalStyles:e})=>(e`
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
  `});function ke(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:s}=e,{ul:i,li:r,nav:c,div:l}=n.tags,u=rd({css:o,createGlobalStyles:a}),d=ge(t),m=({depth:b=1,maxDepth:p,parent:g,color:h,variant:y,size:f})=>S=>{const{children:w,expanded:k}=S,D=n.state(!k),A=()=>l({class:o`
              cursor: ${w?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:B=>{w&&(D.val=!D.val)}},s({item:S,parent:g,depth:b})),N=()=>i({class:[h,f]},w.map(m({depth:b+1,maxDepth:p,parent:S})));return r(w.length?d({expanded:k,Header:A,Content:w&&b<p&&N}):A())};return function({tree:p,maxDepth:g=1/0,size:h=e.size??"md",variant:y=e.variant??"outline",color:f=e.color??"neutral",...S}){return c({class:[u.nav,h,y,f,e==null?void 0:e.class,S.class]},i(m({maxDepth:g,color:f,variant:y,size:h})(Zn({})({...p}))))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o,span:a}=n.tags,s={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=ke(t,{renderMenuItem:({item:{data:{name:c,href:l}}})=>l?o({href:l},c):a(c),...e});return c=>r({...c,tree:s})},sd=t=>{const{bau:e}=t,{a:n,span:o}=e.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=ke(t,{renderMenuItem:({item:{data:{name:r,href:c}}})=>c?n({href:c},r):o(r)});return()=>i({tree:a})},id=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { a, span } = bau.tags;

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
  }: any) => (href ? a({ href }, name) : span(name));

  const TreeView = treeView(context, { renderMenuItem });

  return () => {
    return TreeView({ tree: menu });
  };
};
`,cd=t=>{const{bau:e,css:n,window:o}=t,{form:a,label:s,article:i,footer:r}=e.tags,c=St(t,{color:"neutral",variant:"outline"}),l=O(t,{variant:"solid",color:"danger"}),u=e.state(0),d=w=>{w.preventDefault();const k=Object.fromEntries(new FormData(w.currentTarget));alert(JSON.stringify(k))},m={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},b=({id:w,name:k})=>w??k,p=w=>o.document.getElementById(b(w)),g=({onNode:w})=>k=>{w(k);const{children:D=[]}=k;D.map(g({onNode:w}))},h=({parent:w})=>{if(w){const{children:k}=w,D=p(w.data);if(D){const A=k.every(N=>{const{checked:B,indeterminate:M}=p(N.data);return!B&&!M});D.indeterminate=!A&&k.some(N=>!p(N.data).checked),D.checked=k.every(N=>p(N.data).checked)}h({parent:w.parent})}},y=({item:w,parent:k})=>D=>{h({parent:k}),g({onNode:B=>{const M=p(B.data);M&&(M.checked=D.target.checked,M.indeterminate=!1)}})(w);const N=D.currentTarget.closest("form").querySelectorAll('input[type="checkbox"][data-type="resources"]:checked');u.val=N.length,D.stopPropagation()},S=ke(t,{renderMenuItem:({item:w,parent:k})=>{const{name:D,id:A}=w.data,N=b(w.data);return s({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:B=>B.stopPropagation()},c({onclick:y({item:w,parent:k}),name:N,id:N,"data-type":A?"resources":"group"}),D)}});return()=>a({onsubmit:d},i(S({tree:m})),r(l({type:"submit"},()=>`Delete ${u.val} Resource(s)`)))},ld=`import { Context } from "@grucloud/bau-ui/context";
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

      const formEl = event.currentTarget.closest("form");
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
`,ud={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:id,createComponent:sd},{title:"Checkable",description:"A treeview with checkboxes.",code:ld,createComponent:cd}],gridItem:Yn},dd=t=>{const e=H(t);return()=>e(ud)},md=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=_t(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return r=>i(r)},pd=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:s,p:i,ul:r,li:c}=e.tags,l=ln(t),u=O(t),d=[{name:"Accordion",Item:un(t)},{name:"Alert",Item:mn(t)},{name:"Autocomplete",Item:bn(t)},{name:"Avatar",Item:pn(t)},{name:"Badge",Item:hn(t)},{name:"Breadcrumbs",Item:fn(t)},{name:"Button",Item:vn(t)},{name:"Button Group",Item:yn(t)},{name:"Calendar",Item:xn(t)},{name:"Checkbox",Item:Sn(t)},{name:"Chip",Item:wn(t)},{name:"DrillDown Menu",Item:kn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:Tn(t)},{name:"Input",Item:An(t)},{name:"Input Search",Item:Dn(t)},{name:"Linear Progress",Item:In(t)},{name:"Loading Button",Item:Ln(t)},{name:"Modal",Item:Pn(t)},{name:"Radio Button",Item:zn(t)},{name:"Select",Item:Rn(t)},{name:"Select Native",Item:jn(t)},{name:"Slider",Item:_n(t)},{name:"Spinner",Item:Un(t)},{name:"Switch",Item:Hn(t)},{name:"Tabs",Item:md(t)},{name:"Theme Switch",Item:Xn(t)},{name:"Toggle",Item:qn(t)},{name:"Toggle Group",Item:Wn(t)},{name:"Tooltip",Item:Kn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
          overflow-y: scroll;
        `},s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:m})=>c(u({color:"primary",variant:"solid",href:`#${m}`,size:"sm"},m)))),d.map(m=>a({id:m.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(m))))},bd=({context:t})=>{const e=pd(t);return[{path:"",action:n=>({title:"Bau UI",component:jo(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Fa(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Qa(t)})},{path:"alert",action:()=>({title:"Alert",component:ir(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:mr(t)})},{path:"animate",action:()=>({title:"Animate",component:vr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:zr(t)})},{path:"avatar",action:()=>({title:"Avatar",component:kr(t)})},{path:"badge",action:()=>({title:"Badge",component:Ur(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:qr(t)})},{path:"button",action:()=>({title:"Button",component:Qr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:as(t)})},{path:"calendar",action:()=>({title:"Calendar",component:us(t)})},{path:"carousel",action:()=>({title:"Carousel",component:hs(t)})},{path:"chip",action:()=>({title:"Chip",component:xs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Ns(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Ls(t)})},{path:"divider",action:()=>({title:"Divider",component:js(t)})},{path:"drawer",action:()=>({title:"Drawer",component:Hs(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Xs(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:ti(t)})},{path:"fileInput",action:()=>({title:"File Input",component:ai(t)})},{path:"form",action:()=>({title:"Form",component:mi(t)})},{path:"input",action:()=>({title:"Input",component:vi(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:Si(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:Di(t)})},{path:"lazy",action:()=>({title:"Lazy",component:Pi(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:_i(t)})},{path:"list",action:()=>({title:"List",component:Zi(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Hi(t)})},{path:"modal",action:()=>({title:"Modal",component:ec(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:lc(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:vc(t)})},{path:"paper",action:()=>({title:"Paper",component:Cc(t)})},{path:"popover",action:()=>({title:"Popover",component:pc(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Ac(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:jc(t)})},{path:"select",action:()=>({title:"Select",component:cl(t)})},{path:"resizable",action:()=>({title:"Resizable",component:Kc(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:bl(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:kl(t)})},{path:"slider",action:()=>({title:"Slider",component:Pl(t)})},{path:"spinner",action:()=>({title:"Spinner",component:_l(t)})},{path:"stepper",action:()=>({title:"Stepper",component:ql(t)})},{path:"switch",action:()=>({title:"Switch",component:nu(t)})},{path:"table",action:()=>({title:"Table",component:Cu(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Au(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ou(t)})},{path:"tabs",action:()=>({title:"Tabs",component:pu(t)})},{path:"toggle",action:()=>({title:"Toggle",component:ju(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Wu(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:td(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ad(t)})},{path:"treeView",action:()=>({title:"Tree View",component:dd(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Go(t)})}]},gd=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),hd=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=t,i=a.state(),r=e({componentState:i});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:m,Layout:b=e}=l.resolve({pathname:u});i.val=m({}),document.title=`${d}`}},fd=t=>{const{createGlobalStyles:e}=t;e`
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
      display: inline-flex;
      flex-direction: column;
      gap: 1rem;
    }
  `};fo();const Qn={title:"Bau",base:"/bau/bau-ui"},vt=Eo({config:Qn}),{bau:vd}=vt;vt.states={drawerOpen:vd.state(!0)};fd(vt);ro({routes:bd({context:vt}),onLocationChange:hd({context:vt,LayoutDefault:$o(vt),config:Qn}),notFoundRoute:gd(vt)});
