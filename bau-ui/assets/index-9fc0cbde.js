(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),Ue=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,...Ue({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=Ue({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},r=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:r}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,s,l)=>{i.apply(s,l),o.pathname!=window.location.pathname&&n({router:r}),a(window.location)}}),document.addEventListener("click",i=>{const{target:s}=i,l=s.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:r}),r}const se=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],co=t=>`var(--color-${t})`,lo=t=>`var(--color-${t}-lightest)`,uo=()=>se.map(([t])=>`
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
`),mo=()=>se.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),po=t=>100-t*10,bo=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${po(e)}%);`).join(`
`),De=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),go=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,r])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${r}));`),...io.map(([a,r])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${r}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function ho({createGlobalStyles:t},{colorPalette:e=se}={}){t`
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
      ${De({})}
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
      --brightness-hover-reverse: 70% ${De({dark:!0})};
    }
  `}function fo(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let ie=t=>Object.prototype.toString.call(t??0).slice(8,-1),vo=t=>ie(t)=="Object",Ae=t=>ie(t)=="Function",oe=t=>["Object","Array"].includes(ie(t)),Be=Object.getPrototypeOf,ae=t=>Ct(t)?t.val:t,Ct=t=>t==null?void 0:t.__isState,yo=["splice","push","pop","shift","unshift","sort","reverse"],Ht=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const V=t=>!Ct(t[0])&&vo(t[0])?t:[{},...t];function xo(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,r=new Set,i=!1,s,l=C=>n.createElement(C),c=(C,v,w)=>{let E=s;s=v;let T=C(w);return s=E,T},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(C=>{C.bindings=C.bindings.filter(v=>{var w;return(w=v.element)==null?void 0:w.isConnected}),!C.bindings.length&&!C.computed&&a.delete(C)}),o=void 0}))},d=(C,v,w,E,T,G)=>{var R;if(i){r.add(C);return}for(let H of C.bindings){let{deps:J,element:M,renderInferred:X,render:tt,renderItem:W}=H;if(W&&v)(R=p(M,E,(...Z)=>h(W(...Z)),w,T,G)[v])==null||R.call();else{let Z=X?X({element:M}):tt({element:M,renderItem:W})(...J.map(ae));Z!==M&&M.replaceWith(H.element=h(Z))}}x(C),u()},m=(C,v,w=[])=>({get(E,T,G){var R;if(s==null||s.add(C),T==="_isProxy")return!0;if(!((R=E[T])!=null&&R._isProxy)&&!Ct(E[T])&&oe(E[T]))E[T]=new Proxy(E[T],m(C,v,[...w,T]));else if(yo.includes(T)){let H=E[T];return(...J)=>{let M=H.apply(E,J);return d(C,T,M,J,v,w),M}}return Reflect.get(E,T,G)},set(E,T,G,R){let H=Reflect.set(E,T,G,R);return d(C,"setItem",H,{prop:T,value:G},v,[...w,T]),H}}),b=(C,v)=>new Proxy(v,m(C,v)),p=(C,v,w,E,T,G)=>{let R=()=>C.replaceChildren(...Ht(E,w)),H=J=>C[J]&&C.removeChild(C[J]);return{assign:R,sort:R,reverse:R,setItem:()=>{var M;let J=G[0];(M=C.children[J])==null||M.replaceWith(w(T[J],J))},push:()=>C.append(...Ht(v,(J,M)=>w(J,T.length+M))),unshift:()=>C.prepend(...Ht(v,w)),pop:()=>H("lastChild"),shift:()=>H("firstChild"),splice:()=>{const{length:J}=C.children;let[M,X=J,...tt]=v;for(let W=M>=0?Math.min(M+X-1,J-1):J-1;W>=(M>=0?M:J+M);W--)C.children[W].remove();if(tt.length){let W=tt.map((Z,at)=>w(Z,M+at));C.children[M]?C.children[M].before(...W):C.append(...W)}}}},g=C=>({oldVal:C,bindings:[],listeners:[],__isState:!0,get val(){let v=this;return s==null||s.add(v),v.valProxy??(v.valProxy=oe(C)?b(v,C):C,v.valProxy)},set val(v){let w=this,E=w.val;oe(v)?(w.valProxy=b(w,v),d(w,"assign",v)):v!==E&&(w.valProxy=v,d(w)),w.oldVal=E}}),h=C=>{if(C==null||C===!1){const v=l("span");return v.style.display="none",v}else return C.nodeType?C:n.createTextNode(C)},y=(C,v)=>{let w=new Set;return v.val=c(C,w),w},f=C=>{let v=g(),w=y(C,v);v.computed=!0;for(let E of w)E.listeners.push({computed:C,deps:w,state:v});return v},x=C=>{for(let v of[...C.listeners])y(v.computed,v.state)},S=(C,...v)=>{if(v.length){let w=[];for(let E of v.flat(1/0))E!=null&&w.push(Ct(E)?U({deps:[E],render:()=>T=>T}):Ae(E)?j({renderInferred:E}):h(E));C.append(...w)}},k={},D=(C,v)=>C&&(Object.getOwnPropertyDescriptor(C,v)??D(Be(C),v)),A=(C,v,w)=>{var E;return k[C+","+v]??(k[C+","+v]=((E=D(w,v))==null?void 0:E.set)??0)},B=(C,v)=>new e.MutationObserver((w,E)=>{w.filter(T=>T.removedNodes).forEach(T=>[...T.removedNodes].find(G=>G===C&&(v({element:C}),E.disconnect(),!0)))}).observe(C.parentNode,{childList:!0}),O=(C,v)=>new e.MutationObserver((w,E)=>w.forEach(T=>v({record:T,element:C}))).observe(C,{childList:!0}),I=C=>new Proxy(function(w,...E){var H;let[T,...G]=V(E),R=C?n.createElementNS(C,w):l(w);for(let[J,M]of Object.entries(T)){if(J.startsWith("bau"))continue;let X=A(w,J,Be(R))?tt=>tt!==void 0&&(R[J]=tt):tt=>R.setAttribute(J,Array.isArray(tt)?tt.filter(W=>W).join(" "):tt);M==null||(Ct(M)?U({deps:[M],render:()=>()=>(X(M.val),R)}):Ae(M)&&(!J.startsWith("on")||M.isDerived)?j({renderInferred:()=>(X(M({element:R})),R)}):M.renderProp?U({deps:M.deps,render:()=>()=>(X(M.renderProp({element:R})(...M.deps.map(ae))),R)}):X(M))}return T.bauChildMutated&&O(R,T.bauChildMutated),S(R,...G),R.autofocus&&R.focus&&e.requestAnimationFrame(()=>R.focus()),(H=T.bauCreated)==null||H.call(T,{element:R}),T.bauMounted&&e.requestAnimationFrame(()=>T.bauMounted({element:R})),T.bauUnmounted&&e.requestAnimationFrame(()=>B(R,T.bauUnmounted)),R},{get:(v,w)=>v.bind(void 0,w)}),$=(C,v,w)=>{C.element=h(w);for(let E of v)Ct(E)&&(a.add(E),E.bindings.push(C));return C.element},j=({renderInferred:C,element:v})=>{let w=new Set,E=c(C,w,{element:v});return $({renderInferred:C},w,E)},U=({deps:C,element:v,render:w,renderItem:E})=>$({deps:C,render:w,renderItem:E},C,w({element:v,renderItem:E})(...C.map(ae))),z=(C,v,w)=>U({deps:[C],render:({renderItem:E})=>T=>(v.append(...Ht(T,E)),v),renderItem:w}),P=async C=>{i=!0;const v=await C();return i=!1,r.forEach(d),r.clear(),v};return{tags:I(),tagsNS:I,state:g,bind:U,loop:z,derive:f,stateSet:a,batch:P}}const wo=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},So=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Co=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function ko(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...r)=>{const i=Co(a,r),s=wo(i);return!e.getElementById(s)&&So(e,t==null?void 0:t.target,s,o(s,i)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Eo(t){const e=xo(),n=ko();return ho(n),{bau:e,...n,tr:o=>o,window,...t}}function Kt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,r=()=>{};return function({animationHide:s=r,animationShow:l=r,...c},u){return a({class:["animate",e==null?void 0:e.class,c.class],bauChildMutated:({record:d,element:m})=>{[...d.removedNodes].forEach(b=>{if(!s()||b.getAttribute("cloned"))return;const p=b.cloneNode(!0);o.requestAnimationFrame(()=>{p.setAttribute("cloned",!0),p.style.top=0,p.style.left=0,p.style.width=b.getAttribute("width"),p.style.height=b.getAttribute("height"),p.style.position="absolute",p.style.animation=s(),d.target.appendChild(p),p.addEventListener("animationend",()=>{var g;return(g=p.parentNode)==null?void 0:g.removeChild(p)})})}),[...d.addedNodes].forEach(b=>{b.getAttribute("cloned")||o.requestAnimationFrame(()=>{m.style.position="relative";const p=b.getBoundingClientRect();if(b.setAttribute("width",p.width+"px"),b.setAttribute("height",p.height+"px"),l()){b.style.animation=l();const g=()=>{b.removeEventListener("animationend",g),b.style.animation=""};b.addEventListener("animationend",g)}})})},...c},u)}}const nt=["neutral","primary","success","danger","warning"],To=["plain","outline","solid"],Do=["sm","md","lg"],Ao=()=>nt.map(t=>`
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
`);function N(t,e={}){const{bau:n,css:o}=t,a=o`
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
  `;return function(...i){var p;let[{size:s=e.size??"md",variant:l=e.variant??"none",color:c=e.color??"none",href:u,...d},...m]=V(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:["button",l,s,c,a,e.class,Array.isArray(d.class)?(p=d.class)==null?void 0:p.join(" "):d.class],href:u},m)}}const Bo="light",No=()=>nt.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function ce(t,e={}){const{bau:n,css:o,window:a}=t,{input:r}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},l=s();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Bo);const c=o`
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
    ${No()}
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"plain",color:p=e.color??"neutral",...g},...h]=V(d);return r({required:"required",title:"Switch Theme",name:"theme-switch",...g,class:["theme-switch",p,b,m,c,e==null?void 0:e.class,g.class],type:"checkbox",checked:s()=="dark",onclick:y=>{i(y.target.checked?"dark":"light")}},...h)}}function Oo(t){const{tr:e,bau:n,css:o,config:a,states:r}=t,{i,header:s,h1:l,div:c,a:u,img:d,b:m,ul:b,li:p}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),y=r.drawerOpen,f=N(t,{class:o`
      background: transparent;
    `}),x=ce(t),S=()=>i(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),k=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},S()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},m(e("Bau UI")))),D=()=>c({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},x(),f({target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},k(),D())}}function Mo({tr:t,bau:e,css:n}){const{section:o,footer:a,span:r,a:i,ul:s,li:l,p:c,div:u,h1:d}=e.tags,m=({links:g,title:h})=>o({class:n`
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
        `},d(h),s(g.map(({href:y,name:f})=>l(i({href:y},f))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],p=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},r("v0.82.1"),r("MIT license")))}}function yt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["list",r,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class.join(" ")]},...m)}}const Vt="0.3s",Ge=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,r={...a};return r.children=o==null?void 0:o.map(Ge({parent:n,grandParent:t})),t&&(t.parentTree=e),r.parentTree=t,r},Fe=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=Fe(t)(e.children[o]);if(a)return a}},Io=({keyframes:t})=>({hideToLeft:t`
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
   `});function le(t,e={}){const{bau:n,css:o,window:a,config:r}=t,{base:i="",hashBased:s=!1}=e,l=`${r.base}${i}`,c=P=>{var C;return((C=P.parentTree.data)==null?void 0:C.href)??P.parentTree.children[0].data.href},u=({variant:P,color:C,size:v,currentTree:w,data:E})=>x(A({variant:P,color:C,size:v,href:`${l}${c(w)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),A({variant:P,color:C,size:v,href:`${l}${E.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},E.name)),d=({size:P,subTree:{data:{name:C,href:v},children:w=[]}})=>A({size:P,href:`${l}${v}`,"data-ischild":!w.length},C),m=({pathname:P,subTree:C})=>{var v;return P===((v=C==null?void 0:C.data)==null?void 0:v.href)},{renderHeader:b=u,renderMenuItem:p=d,isActive:g=m}=e,{li:h,nav:y,div:f,header:x,a:S}=n.tags,k=Kt(t),D=yt(t),A=N(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:O}=Io(t),I=o`
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
  `,$=({children:P,pathnameState:C,variant:v,color:w,size:E})=>D({class:[v,w,E]},P.map(T=>h({class:()=>[T.children&&"has-children",g({pathname:C.val,subTree:T})&&"active"]},p({variant:v,color:w,size:E,subTree:T})))),j=({variant:P,color:C,size:v,currentTree:w,pathnameState:E})=>{const{children:T,parentTree:G,data:R,renderList:H}=w;return f({class:["drillDownMenu",P,C,v]},G&&b({variant:P,color:C,size:v,data:R,currentTree:w}),T&&H?H({renderListDefault:$,children:T,pathnameState:E,variant:P,color:C,size:v}):$({children:T,pathnameState:E,variant:P,color:C,size:v}))},U=({tree:P,pathname:C})=>{let v=Ge({})({...P}),w=Fe(C)(v);return w||(w=v),w},z=({target:P})=>{let v=P.closest("a").getAttribute("href").replace(l,"");return s||(v=v.replace(P.hash,"")),v};return function(C){const{size:v=e.size??"md",variant:w=e.variant??"plain",color:E=e.color??"neutral",tree:T,...G}=C,R=n.state(a.location.pathname.replace(l,""));let H=U({tree:T,pathname:R.val});const J=n.state(JSON.stringify(H.data));let M;a.document.addEventListener("click",Z=>{const{target:at}=Z,it=at.closest("a");if(!it)return;const ct=it.getAttribute("href");ct&&!ct.startsWith("http")&&!ct.startsWith("#")&&!ct.startsWith("?")&&(H=U({tree:T,pathname:z(Z)}),J.val=JSON.stringify(H.data),R.val=z({target:at}))});const X=Z=>{const{buttonback:at,ischild:it}=Z.target.dataset;at=="true"?M=-1:it=="false"?M=1:it=="true"&&(M=0)},tt=Z=>{switch(Z){case 1:return`${B} ${Vt}`;case-1:return`${O} ${Vt}`;default:return""}},W=Z=>{switch(Z){case 1:return`${O} ${Vt} reverse`;case-1:return`${B} ${Vt} reverse`;default:return""}};return y({class:[I,w,E,v,e==null?void 0:e.class,G.class],onclick:X},k({animationHide:()=>tt(M),animationShow:()=>W(M)},n.bind({deps:[J],render:()=>()=>j({variant:w,color:E,size:v,currentTree:H,pathnameState:R})})))}}const Lo=()=>nt.map(t=>`
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
`);function ut(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
  `;return function(s){var d;const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=s;return a({type:"text",...u,class:["input",e.class,e.size??"md",c,l,r,Array.isArray(s.class)?(d=s.class)==null?void 0:d.join(" "):s.class]})}}function ue(t,e={}){const{bau:n,css:o,window:a}=t,r=ut(t,e);return function(s){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=s,m=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        padding-left: 1.8rem;
        background-image: ${m};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return r({type:"search",...u,color:c,variant:l,class:["inputSearch",e.class,b,u.class]})}}function He(t){const{tr:e,bau:n,css:o,config:a,states:r,window:i}=t,{div:s,ul:l,li:c,nav:u,a:d,span:m,form:b}=n.tags,p=ue(t,{variant:"plain",color:"neutral",size:"sm",class:o`
      margin: 0.5rem;
    `}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:x,children:S,pathnameState:k,variant:D,color:A,size:B})=>{const O=n.state(""),I=n.derive(()=>O.val==""?S:S.filter(j=>j.data.name.match(new RegExp(`${O.val}`,"i")))),$=j=>{O.val=j.target.value};return b({class:o`
          display: flex;
          flex-direction: column;
          gap: 0;
        `},p({autocomplete:"off",name:"component-search",autofocus:!0,value:O,placeholder:`Search ${I.val.length} components`,size:32,oninput:$}),()=>x({children:I.val,pathnameState:k,variant:D,color:A,size:B}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Resizable",href:"/components/resizable"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let y=!1;const f=le(t);return function(){return s({bauMounted:({element:S})=>{i.innerWidth<=640&&(y=!0,r.drawerOpen.val=!1)},onclick:S=>{y&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:o`
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
        `},f({tree:h}))}}const $o=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:r}=e.tags,i=Kt(t),s=Oo(t),l=He(t),c=Mo(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(m="")=>`${u} ease-in-out 0.5s ${m}`;return function({componentState:b}){return r({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>b.val),c())}};function Pt(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...m},...b]=V(s);return a({...m,onclick:d,class:["chip",e.class,l,c,u,d&&"clickable",r,m.class]},...b)}}function Po(t){const{bau:e,css:n,config:o}=t,{div:a,h1:r,h2:i,p:s}=e.tags;N(t);const l=n`
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
  `,s=({title:l,Content:c})=>o({className:"feature"},a(l),r(c()));return function({featuresContent:c}){return o({class:i},c.map(s))}}function Ro({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:r,dd:i,div:s,aside:l,footer:c,a:u}=e.tags,d=({maxSize:m=151})=>({libName:b,size:p})=>s({class:n`
            display: flex;
            margin: 0.3rem;
          `},r({class:n`
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
            `},s({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function jo(t){const{bau:e,css:n,config:o}=t,{div:a,p:r,a:i,section:s}=e.tags,l=Po(t),c=zo(t),u=N(t);Pt(t);const d=Ro(t),m=(...y)=>a({class:n`
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
          `},...y)),b=n``,p=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],g=[{title:"UI components for the web",Content:()=>[r("Over 50 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),m(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),m(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),m(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[r("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]}],h=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:g}),d({data:p}),h())}}function _o(t,e={}){const{bau:n,css:o}=t,{div:a,form:r,span:i,pre:s,h3:l,h4:c}=n.tags;return function(d,...m){return a("Login")}}const Uo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:r,h2:i}=n.tags,s=_o(t);return()=>o({id:"login"},i(e("Login Examples")),r("Basic"),a(s()))};function Go(t){const{tr:e,bau:n,css:o}=t,{div:a,article:r,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(e("Pages Examples")),Uo(t)()))}}function Fo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ve(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ve(n)}),t}class Ne{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Je(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function mt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Ho="</span>",Oe=t=>!!t.scope,Vo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Jo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Je(e)}openNode(e){if(!Oe(e))return;const n=Vo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){Oe(e)&&(this.buffer+=Ho)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Me=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class de{constructor(){this.rootNode=Me(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Me({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{de._collapse(n)}))}}class qo extends de{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function It(t){return t?typeof t=="string"?t:t.source:null}function qe(t){return xt("(?=",t,")")}function Wo(t){return xt("(?:",t,")*")}function Ko(t){return xt("(?:",t,")?")}function xt(...t){return t.map(n=>It(n)).join("")}function Xo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function me(...t){return"("+(Xo(t).capture?"":"?:")+t.map(o=>It(o)).join("|")+")"}function We(t){return new RegExp(t.toString()+"|").exec("").length-1}function Zo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function pe(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let r=It(o),i="";for(;r.length>0;){const s=Yo.exec(r);if(!s){i+=r;break}i+=r.substring(0,s.index),r=r.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+a):(i+=s[0],s[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Qo=/\b\B/,Ke="[a-zA-Z]\\w*",be="[a-zA-Z_]\\w*",Xe="\\b\\d+(\\.\\d+)?",Ze="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ye="\\b(0b[01]+)",ta="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ea=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=xt(e,/.*\b/,t.binary,/\b.*/)),mt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},Lt={begin:"\\\\[\\s\\S]",relevance:0},na={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Lt]},oa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Lt]},aa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Xt=function(t,e,n={}){const o=mt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=me("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ra=Xt("//","$"),sa=Xt("/\\*","\\*/"),ia=Xt("#","$"),ca={scope:"number",begin:Xe,relevance:0},la={scope:"number",begin:Ze,relevance:0},ua={scope:"number",begin:Ye,relevance:0},da={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Lt,{begin:/\[/,end:/\]/,relevance:0,contains:[Lt]}]}]},ma={scope:"title",begin:Ke,relevance:0},pa={scope:"title",begin:be,relevance:0},ba={begin:"\\.\\s*"+be,relevance:0},ga=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Jt=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Qo,IDENT_RE:Ke,UNDERSCORE_IDENT_RE:be,NUMBER_RE:Xe,C_NUMBER_RE:Ze,BINARY_NUMBER_RE:Ye,RE_STARTERS_RE:ta,SHEBANG:ea,BACKSLASH_ESCAPE:Lt,APOS_STRING_MODE:na,QUOTE_STRING_MODE:oa,PHRASAL_WORDS_MODE:aa,COMMENT:Xt,C_LINE_COMMENT_MODE:ra,C_BLOCK_COMMENT_MODE:sa,HASH_COMMENT_MODE:ia,NUMBER_MODE:ca,C_NUMBER_MODE:la,BINARY_NUMBER_MODE:ua,REGEXP_MODE:da,TITLE_MODE:ma,UNDERSCORE_TITLE_MODE:pa,METHOD_GUARD:ba,END_SAME_AS_BEGIN:ga});function ha(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function fa(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function va(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=ha,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function ya(t,e){Array.isArray(t.illegal)&&(t.illegal=me(...t.illegal))}function xa(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function wa(t,e){t.relevance===void 0&&(t.relevance=1)}const Sa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=xt(n.beforeMatch,qe(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Ca=["of","and","for","in","not","or","if","then","parent","list","value"],ka="keyword";function Qe(t,e,n=ka){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(r){Object.assign(o,Qe(t[r],e,r))}),o;function a(r,i){e&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){const l=s.split("|");o[l[0]]=[r,Ea(l[0],l[1])]})}}function Ea(t,e){return e?Number(e):Ta(t)?0:1}function Ta(t){return Ca.includes(t.toLowerCase())}const Ie={},vt=t=>{console.error(t)},Le=(t,...e)=>{console.log(`WARN: ${t}`,...e)},St=(t,e)=>{Ie[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Ie[`${t}/${e}`]=!0)},Wt=new Error;function tn(t,e,{key:n}){let o=0;const a=t[n],r={},i={};for(let s=1;s<=e.length;s++)i[s+o]=a[s],r[s+o]=!0,o+=We(e[s-1]);t[n]=i,t[n]._emit=r,t[n]._multi=!0}function Da(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw vt("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Wt;if(typeof t.beginScope!="object"||t.beginScope===null)throw vt("beginScope must be object"),Wt;tn(t,t.begin,{key:"beginScope"}),t.begin=pe(t.begin,{joinWith:""})}}function Aa(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw vt("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Wt;if(typeof t.endScope!="object"||t.endScope===null)throw vt("endScope must be object"),Wt;tn(t,t.end,{key:"endScope"}),t.end=pe(t.end,{joinWith:""})}}function Ba(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Na(t){Ba(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Da(t),Aa(t)}function Oa(t){function e(i,s){return new RegExp(It(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=We(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(l=>l[1]);this.matcherRe=e(pe(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(s);if(!l)return null;const c=l.findIndex((d,m)=>m>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const l=new n;return this.rules.slice(s).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const s=new o;return i.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function r(i,s){const l=i;if(i.isCompiled)return l;[fa,xa,Na,Sa].forEach(u=>u(i,s)),t.compilerExtensions.forEach(u=>u(i,s)),i.__beforeBegin=null,[va,ya,wa].forEach(u=>u(i,s)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Qe(i.keywords,t.case_insensitive)),l.keywordPatternRe=e(c,!0),s&&(i.begin||(i.begin=/\B|\b/),l.beginRe=e(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=e(l.end)),l.terminatorEnd=It(l.end)||"",i.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(l.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ma(u==="self"?i:u)})),i.contains.forEach(function(u){r(u,l)}),i.starts&&r(i.starts,s),l.matcher=a(l),l}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=mt(t.classNameAliases||{}),r(t)}function en(t){return t?t.endsWithParent||en(t.starts):!1}function Ma(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return mt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:en(t)?mt(t,{starts:t.starts?mt(t.starts):null}):Object.isFrozen(t)?mt(t):t}var Ia="11.8.0";class La extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const re=Je,$e=mt,Pe=Symbol("nomatch"),$a=7,nn=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:qo};function l(v){return s.noHighlightRe.test(v)}function c(v){let w=v.className+" ";w+=v.parentNode?v.parentNode.className:"";const E=s.languageDetectRe.exec(w);if(E){const T=O(E[1]);return T||(Le(r.replace("{}",E[1])),Le("Falling back to no-highlight mode for this block.",v)),T?E[1]:"no-highlight"}return w.split(/\s+/).find(T=>l(T)||O(T))}function u(v,w,E){let T="",G="";typeof w=="object"?(T=v,E=w.ignoreIllegals,G=w.language):(St("10.7.0","highlight(lang, code, ...args) has been deprecated."),St("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),G=v,T=w),E===void 0&&(E=!0);const R={code:T,language:G};P("before:highlight",R);const H=R.result?R.result:d(R.language,R.code,E);return H.code=R.code,P("after:highlight",H),H}function d(v,w,E,T){const G=Object.create(null);function R(L,_){return L.keywords[_]}function H(){if(!q.keywords){rt.addText(et);return}let L=0;q.keywordPatternRe.lastIndex=0;let _=q.keywordPatternRe.exec(et),K="";for(;_;){K+=et.substring(L,_.index);const Q=ot.case_insensitive?_[0].toLowerCase():_[0],st=R(q,Q);if(st){const[dt,to]=st;if(rt.addText(K),K="",G[Q]=(G[Q]||0)+1,G[Q]<=$a&&(Ft+=to),dt.startsWith("_"))K+=_[0];else{const eo=ot.classNameAliases[dt]||dt;X(_[0],eo)}}else K+=_[0];L=q.keywordPatternRe.lastIndex,_=q.keywordPatternRe.exec(et)}K+=et.substring(L),rt.addText(K)}function J(){if(et==="")return;let L=null;if(typeof q.subLanguage=="string"){if(!e[q.subLanguage]){rt.addText(et);return}L=d(q.subLanguage,et,!0,Te[q.subLanguage]),Te[q.subLanguage]=L._top}else L=b(et,q.subLanguage.length?q.subLanguage:null);q.relevance>0&&(Ft+=L.relevance),rt.__addSublanguage(L._emitter,L.language)}function M(){q.subLanguage!=null?J():H(),et=""}function X(L,_){L!==""&&(rt.startScope(_),rt.addText(L),rt.endScope())}function tt(L,_){let K=1;const Q=_.length-1;for(;K<=Q;){if(!L._emit[K]){K++;continue}const st=ot.classNameAliases[L[K]]||L[K],dt=_[K];st?X(dt,st):(et=dt,H(),et=""),K++}}function W(L,_){return L.scope&&typeof L.scope=="string"&&rt.openNode(ot.classNameAliases[L.scope]||L.scope),L.beginScope&&(L.beginScope._wrap?(X(et,ot.classNameAliases[L.beginScope._wrap]||L.beginScope._wrap),et=""):L.beginScope._multi&&(tt(L.beginScope,_),et="")),q=Object.create(L,{parent:{value:q}}),q}function Z(L,_,K){let Q=Zo(L.endRe,K);if(Q){if(L["on:end"]){const st=new Ne(L);L["on:end"](_,st),st.isMatchIgnored&&(Q=!1)}if(Q){for(;L.endsParent&&L.parent;)L=L.parent;return L}}if(L.endsWithParent)return Z(L.parent,_,K)}function at(L){return q.matcher.regexIndex===0?(et+=L[0],1):(ne=!0,0)}function it(L){const _=L[0],K=L.rule,Q=new Ne(K),st=[K.__beforeBegin,K["on:begin"]];for(const dt of st)if(dt&&(dt(L,Q),Q.isMatchIgnored))return at(_);return K.skip?et+=_:(K.excludeBegin&&(et+=_),M(),!K.returnBegin&&!K.excludeBegin&&(et=_)),W(K,L),K.returnBegin?0:_.length}function ct(L){const _=L[0],K=w.substring(L.index),Q=Z(q,L,K);if(!Q)return Pe;const st=q;q.endScope&&q.endScope._wrap?(M(),X(_,q.endScope._wrap)):q.endScope&&q.endScope._multi?(M(),tt(q.endScope,L)):st.skip?et+=_:(st.returnEnd||st.excludeEnd||(et+=_),M(),st.excludeEnd&&(et=_));do q.scope&&rt.closeNode(),!q.skip&&!q.subLanguage&&(Ft+=q.relevance),q=q.parent;while(q!==Q.parent);return Q.starts&&W(Q.starts,L),st.returnEnd?0:_.length}function Bt(){const L=[];for(let _=q;_!==ot;_=_.parent)_.scope&&L.unshift(_.scope);L.forEach(_=>rt.openNode(_))}let lt={};function Y(L,_){const K=_&&_[0];if(et+=L,K==null)return M(),0;if(lt.type==="begin"&&_.type==="end"&&lt.index===_.index&&K===""){if(et+=w.slice(_.index,_.index+1),!a){const Q=new Error(`0 width match regex (${v})`);throw Q.languageName=v,Q.badRule=lt.rule,Q}return 1}if(lt=_,_.type==="begin")return it(_);if(_.type==="illegal"&&!E){const Q=new Error('Illegal lexeme "'+K+'" for mode "'+(q.scope||"<unnamed>")+'"');throw Q.mode=q,Q}else if(_.type==="end"){const Q=ct(_);if(Q!==Pe)return Q}if(_.type==="illegal"&&K==="")return 1;if(ee>1e5&&ee>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=K,K.length}const ot=O(v);if(!ot)throw vt(r.replace("{}",v)),new Error('Unknown language: "'+v+'"');const Gt=Oa(ot);let te="",q=T||Gt;const Te={},rt=new s.__emitter(s);Bt();let et="",Ft=0,ht=0,ee=0,ne=!1;try{if(ot.__emitTokens)ot.__emitTokens(w,rt);else{for(q.matcher.considerAll();;){ee++,ne?ne=!1:q.matcher.considerAll(),q.matcher.lastIndex=ht;const L=q.matcher.exec(w);if(!L)break;const _=w.substring(ht,L.index),K=Y(_,L);ht=L.index+K}Y(w.substring(ht))}return rt.finalize(),te=rt.toHTML(),{language:v,value:te,relevance:Ft,illegal:!1,_emitter:rt,_top:q}}catch(L){if(L.message&&L.message.includes("Illegal"))return{language:v,value:re(w),illegal:!0,relevance:0,_illegalBy:{message:L.message,index:ht,context:w.slice(ht-100,ht+100),mode:L.mode,resultSoFar:te},_emitter:rt};if(a)return{language:v,value:re(w),illegal:!1,relevance:0,errorRaised:L,_emitter:rt,_top:q};throw L}}function m(v){const w={value:re(v),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return w._emitter.addText(v),w}function b(v,w){w=w||s.languages||Object.keys(e);const E=m(v),T=w.filter(O).filter($).map(M=>d(M,v,!1));T.unshift(E);const G=T.sort((M,X)=>{if(M.relevance!==X.relevance)return X.relevance-M.relevance;if(M.language&&X.language){if(O(M.language).supersetOf===X.language)return 1;if(O(X.language).supersetOf===M.language)return-1}return 0}),[R,H]=G,J=R;return J.secondBest=H,J}function p(v,w,E){const T=w&&n[w]||E;v.classList.add("hljs"),v.classList.add(`language-${T}`)}function g(v){let w=null;const E=c(v);if(l(E))return;if(P("before:highlightElement",{el:v,language:E}),v.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(v)),s.throwUnescapedHTML))throw new La("One of your code blocks includes unescaped HTML.",v.innerHTML);w=v;const T=w.textContent,G=E?u(T,{language:E,ignoreIllegals:!0}):b(T);v.innerHTML=G.value,p(v,E,G.language),v.result={language:G.language,re:G.relevance,relevance:G.relevance},G.secondBest&&(v.secondBest={language:G.secondBest.language,relevance:G.secondBest.relevance}),P("after:highlightElement",{el:v,result:G,text:T})}function h(v){s=$e(s,v)}const y=()=>{S(),St("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function f(){S(),St("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let x=!1;function S(){if(document.readyState==="loading"){x=!0;return}document.querySelectorAll(s.cssSelector).forEach(g)}function k(){x&&S()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",k,!1);function D(v,w){let E=null;try{E=w(t)}catch(T){if(vt("Language definition for '{}' could not be registered.".replace("{}",v)),a)vt(T);else throw T;E=i}E.name||(E.name=v),e[v]=E,E.rawDefinition=w.bind(null,t),E.aliases&&I(E.aliases,{languageName:v})}function A(v){delete e[v];for(const w of Object.keys(n))n[w]===v&&delete n[w]}function B(){return Object.keys(e)}function O(v){return v=(v||"").toLowerCase(),e[v]||e[n[v]]}function I(v,{languageName:w}){typeof v=="string"&&(v=[v]),v.forEach(E=>{n[E.toLowerCase()]=w})}function $(v){const w=O(v);return w&&!w.disableAutodetect}function j(v){v["before:highlightBlock"]&&!v["before:highlightElement"]&&(v["before:highlightElement"]=w=>{v["before:highlightBlock"](Object.assign({block:w.el},w))}),v["after:highlightBlock"]&&!v["after:highlightElement"]&&(v["after:highlightElement"]=w=>{v["after:highlightBlock"](Object.assign({block:w.el},w))})}function U(v){j(v),o.push(v)}function z(v){const w=o.indexOf(v);w!==-1&&o.splice(w,1)}function P(v,w){const E=v;o.forEach(function(T){T[E]&&T[E](w)})}function C(v){return St("10.7.0","highlightBlock will be removed entirely in v12.0"),St("10.7.0","Please use highlightElement now."),g(v)}Object.assign(t,{highlight:u,highlightAuto:b,highlightAll:S,highlightElement:g,highlightBlock:C,configure:h,initHighlighting:y,initHighlightingOnLoad:f,registerLanguage:D,unregisterLanguage:A,listLanguages:B,getLanguage:O,registerAliases:I,autoDetection:$,inherit:$e,addPlugin:U,removePlugin:z}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=Ia,t.regex={concat:xt,lookahead:qe,either:me,optional:Ko,anyNumberOfTimes:Wo};for(const v in Jt)typeof Jt[v]=="object"&&Ve(Jt[v]);return Object.assign(t,Jt),t},kt=nn({});kt.newInstance=()=>nn({});var Pa=kt;kt.HighlightJS=kt;kt.default=kt;const Mt=Fo(Pa),ze="[A-Za-z$_][0-9A-Za-z$_]*",za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ra=["true","false","null","undefined","NaN","Infinity"],on=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],an=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],rn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ja=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],_a=[].concat(rn,on,an);function sn(t){const e=t.regex,n=(w,{after:E})=>{const T="</"+w[0].slice(1);return w.input.indexOf(T,E)!==-1},o=ze,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(w,E)=>{const T=w[0].length+w.index,G=w.input[T];if(G==="<"||G===","){E.ignoreMatch();return}G===">"&&(n(w,{after:T})||E.ignoreMatch());let R;const H=w.input.substring(T);if(R=H.match(/^\s*=/)){E.ignoreMatch();return}if((R=H.match(/^\s+extends\s+/))&&R.index===0){E.ignoreMatch();return}}},s={$pattern:ze,keyword:za,literal:Ra,built_in:_a,"variable.language":ja},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},m={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"xml"}},p={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,m],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,m]},f={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},x=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,p,g,h,{match:/\$\d+/},d];m.contains=x.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(x)});const S=[].concat(f,m.contains),k=S.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(S)}]),D={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:k},A={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...on,...an]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},I={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(w){return e.concat("(?!",w.join("|"),")")}const U={match:e.concat(/\b/,j([...rn,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},z={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},P={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",v={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:k,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,p,g,h,f,{match:/\$\d+/},d,B,{className:"attr",begin:o+e.lookahead(":"),relevance:0},v,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[f,t.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:k}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},I,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},z,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},U,$,A,P,{match:/\$[(.]/}]}}function Ua(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ga=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return Mt.registerLanguage("javascript",sn),Mt.registerLanguage("sh",Ua),function({text:i,language:s="js"}){const l=a({class:`hljs language-${s}`});return l.innerHTML=Mt.highlight(i,{language:s}).value,o({class:n`
          display: inline-block;
        `},l)}};function Fa(t){const{bau:e,css:n}=t,{article:o,h1:a,p:r,code:i,a:s,ul:l,li:c}=e.tags,u=Ga(t);return function(){return o({class:n`
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
)`}),r("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),r("Further reading:",l(c(s({href:"components"},"Visit the component gallery")),c(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function ge(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["paper",l,r,e==null?void 0:e.class,d==null?void 0:d.class]},...m)}}function cn(t,e={}){const{bau:n,css:o,window:a}=t,{nav:r,ul:i,li:s,a:l}=n.tags,{headerSelector:c="h2,h3"}=e,u=n.state("no"),d=(h,y)=>{let f=null;return(...x)=>{a.clearTimeout(f),f=a.setTimeout(()=>h(...x),y)}},m=o`
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
  `,b=({value:h,id:y,children:f=[]})=>{const x=l({class:()=>u.val==y?"active":"",href:`#${y}`});return x.innerHTML=h,s({class:()=>u.val==y?"active":""},x,f.length>0&&i(f.map(b)))},p=h=>h.tagName.charAt(1),g=({contentEl:h})=>{const y=h.querySelectorAll(c);let f=2,x={},S={children:[]},k=S;const D=k;let A=[k];return[...y].forEach(B=>{const O=p(B);B.setAttribute("id",B.textContent),!B.innerHTML.includes("<button")&&(x={value:B.innerHTML,id:B.id??B.textContent,children:[]},f==O?(S=x,k.children.push(S)):f<O?(A.push(k),k=S,S.children.push(x),S=x):f>O&&(k=A[O-1],A=A.slice(0,O-1),k.children.push(x),S=x),f=O)}),D};return function(...y){let[{size:f=e.size??"md",variant:x=e.variant??"plain",color:S=e.color??"neutral",contentEl:k,...D}]=V(y);const A=g({contentEl:k}),B=d(()=>{const I=[...k.querySelectorAll(c)].find($=>{const{top:j,height:U}=$.getBoundingClientRect();if(j+U>60)return!0});I&&(u.val=I==null?void 0:I.id)},100);return r({...D,class:["tableOfContent",f,x,S,m,e==null?void 0:e.class,D==null?void 0:D.class],bauMounted:()=>{a.addEventListener("scroll",B)},bauUnmounted:()=>{a.removeEventListener("scroll",B)}},A.children&&i(A.children.map(b)))}}const ln=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:r,tr:i,td:s,thead:l,th:c}=e.tags;return function({Item:d,name:m}){return o({class:n`
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
        `},a(l(i(c(m??""),nt.map(b=>c(b)))),r(To.map(b=>i(c(b),nt.map((p,g)=>s(d({color:p,variant:b},{index:g}))))))))}},Ha=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:r}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Do.map((i,s)=>r(t,{size:i})({color:"success",variant:"outline"},{size:i,index:s})))}},F=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:r,h1:i,p:s,h2:l,h3:c,pre:u,code:d}=e.tags;Mt.registerLanguage("javascript",sn);const m=cn(t),b=ge(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),p=ln(t),g=Ha(t),h=({text:y})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=Mt.highlight(y,{language:"js"}).value}}));return function(f){const x=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(f.title),s(f.description),f.gridItem&&!f.variantColorTableDisable&&[l("Variant/Color"),b(p({Item:f.gridItem(t)}))],f.gridItem&&!f.variantSizeDisable&&[l("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b(g({item:f.gridItem}))],l("Usage"),c("Import"),h({text:f.importStatement}),l("Examples"),f.examples.map(S=>r(c(S.title),s(S.description),b(S.createComponent(t)({})),h({text:S.code}))));return o({class:n`
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
        `},x,m({contentEl:x}))}};function he(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?s(c):l(c))};function s(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",Header:p,Content:g,expanded:h=!1,...y}]=V(u);const f=n.state(!h);return a({...y,class:["collapsible",d,r,e==null?void 0:e.class,y==null?void 0:y.class]},a({class:()=>["header",g?f.val?"close":"open":""],onclick:x=>{f.val=!f.val,x.stopPropagation()}},p()),a({class:"content",role:"region",bauMounted:({element:x})=>{f.val&&(x.style.height="0px")},"aria-expanded":({element:x})=>(i({element:x,closeState:f}),!f.val)},g&&g()))}}const Va=()=>nt.map(t=>`
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
`);function Zt(t,e={}){const{bau:n,css:o}=t,{div:a,ul:r,li:i,h3:s,button:l}=n.tags,c=o`
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
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"plain",color:p=e.color??"neutral",data:g=[],...h}]=V(d);const y=n.state(""),f=he(t,{size:m,variant:b,color:p}),x=k=>D=>{y.val==k?y.val="":y.val=k},S=k=>{const{Header:D,Content:A,name:B}=k,O=()=>s({class:()=>y.val==B&&"active"},l({type:"button","aria-controls":`bau-${B}`,"aria-expanded":({element:$})=>y.val==B},D(k))),I=()=>a({id:`bau-${B}`,"data-state":({element:$})=>y.val==B},A(k));return i({class:[p,b,m],onclick:x(B)},f({Header:O,Content:I}))};return a({class:["accordion",c,e==null?void 0:e.class,h.class]},r(g.map(S)))}}const un=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Zt(t,e);return s=>i({...s,data:r})},Ja=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Zt(t,{color:"neutral",variant:"outline"});return()=>a(i({data:r}))},qa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,dn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Wa=t=>{const{css:e}=t,n=dn(t),o=Zt(t,{color:"warning",class:e`
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
`,Xa=t=>{const{css:e}=t,n=dn(t),o=Zt(t,{color:"success",variant:"outline",class:e`
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

  return () => {
    return Accordion({
      data: accordionDefs,
    });
  };
};
`,Ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:qa,createComponent:Ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ka,createComponent:Wa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:Xa}],gridItem:un},Qa=t=>{const e=F(t);return()=>e(Ya)},tr={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},er=()=>nt.map(t=>`
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
`);function Tt(t,e={}){const{bau:n,css:o}=t,{div:a,i:r}=n.tags,i=o`
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
  `,s=N(t),l=({onclick:c})=>s({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",onRemove:p,...g},...h]=V(u);return a({...g,class:["alert",`alert-${m}`,e.class,m,b,d,i,g.class],role:"alert"},r({class:"icon"},tr[b]),a({class:"content"},...h),p&&l({onclick:p}))}}const mn=(t,e)=>{const n=Tt(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},nr=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=Tt(t,{color:"danger"});return()=>a(n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},or=`import alert from "@grucloud/bau-ui/alert";
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
`,ar=t=>{const{css:e}=t,n=Tt(t,{color:"warning",class:e`
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
`,sr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:or,createComponent:nr},{title:"Custom Alert ",description:"A custom alert.",code:rr,createComponent:ar}],gridItem:mn},ir=t=>{const e=F(t);return()=>e(sr)},cr=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:r=10,deleteAfterDuration:i=15e3}=e,{div:s}=n.tags,l=n.state([]),c={inserting:a`
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
    `},d=({id:m,status:b})=>{const p=l.val.findIndex(g=>g.id===m);p!=-1&&(l.val[p].status=b)};return function(b={},...p){const g=({id:f})=>{d({id:f,status:"removing"});const x=l.val.findIndex(S=>S.id===f);x!=-1&&l.val.splice(x,1)},h=({Component:f})=>{const x={id:Math.random().toString(10).split(".")[1],Component:f,status:"inserting"};l.val.length>=r&&g({id:l.val[0].id}),l.val.push(x),setTimeout(()=>g(x),i)},y=f=>s({class:u.item,onclick:()=>g(f)},f.Component());return document.addEventListener("alert.add",f=>h(f.detail)),document.addEventListener("alert.remove",f=>g(f.detail)),s({class:[u.stack,e==null?void 0:e.class,b.class]},n.loop(l,s(),y))}},lr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=cr(t,{deleteAfterDuration:2e4}),r=N(t),i=Tt(t);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},ur=`import { Context } from "@grucloud/bau-ui/context";
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
`,dr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ur,createComponent:lr}]},mr=t=>{const e=F(t);return()=>e(dr)},pr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,r=Kt(t),i=N(t),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `;return()=>{const l=e.state(!0);return o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),r({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))}},br=`import animate from "@grucloud/bau-ui/animate";
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
`,gr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:r,label:i}=e.tags,s=Kt(t),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c={one:()=>a("ONE"),two:()=>a("TWO")};return()=>{const u=e.state("one"),d=({target:m})=>u.val=m.id;return o(i("One",r({type:"radio",id:"one",name:"radio",checked:!0,value:u,oninput:d})),i("Two",r({type:"radio",id:"two",name:"radio",value:u,oninput:d})),s({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>c[u.val]()))}},hr=`import animate from "@grucloud/bau-ui/animate";
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
`,fr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:br,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:hr,createComponent:gr}]},vr=t=>{const e=F(t);return()=>e(fr)};function Et(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",...b},...p]=V(c);return r({...b,class:["skeleton",u,s,e==null?void 0:e.class,b==null?void 0:b.class]},...p)}}function fe(t,e={}){const{bau:n,css:o}=t,{div:a,img:r}=n.tags,i=n.state(!0),s=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,s.val=!0},u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",width:h=40,height:y=40,alt:f,...x},...S]=V(m);const k=Et(t,{class:[o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${y}px;
          width: ${h}px;
        `,e==null?void 0:e.class,x.class]});return a({class:[u,e==null?void 0:e.class,x.class]},()=>i.val&&k(),()=>s.val&&f,r({alt:f,width:h,height:y,onload:l,onerror:c,class:()=>[!i.val&&"visible",s.val&&"hide",g,p,b,u,e==null?void 0:e.class,x.class],...x}))}}const pn=(t,e)=>{const{css:n}=t,o=fe(t,{...e,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},yr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=fe(t,{class:n`
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
`,wr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=fe(t,{class:n`
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
`,Cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:xr,createComponent:yr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:Sr,createComponent:wr}],gridItem:pn},kr=t=>{const e=F(t);return()=>e(Cr)};function zt(t,e){const{bau:n,css:o,window:a}=t,{dialog:r}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...l){let[{contentEl:c,triggerEl:u,onClose:d,...m},...b]=V(l);const p=y=>{h.style.opacity=1,h.showModal();const f=u.getBoundingClientRect(),x=h.getBoundingClientRect();f.x<a.innerWidth/2?h.style.left=f.left+"px":h.style.left=f.right-x.width+"px",f.y<a.innerHeight/2?(h.style.top=f.top+f.height+"px",h.style.height=Math.min(h.scrollHeight,a.innerHeight-f.top-f.height)+"px"):(h.style.top=Math.max(0,f.top-x.height)+"px",h.scrollHeight>f.top&&(h.style.height=f.top+"px"))},g=y=>{const f=()=>{h.close(),h.removeEventListener("transitionend",f)};h.addEventListener("transitionend",f),h.style.opacity=0},h=r({role:"presentation",class:["popover",i,e==null?void 0:e.class,m==null?void 0:m.class],onclick:y=>{y.target===h&&(g(),d==null||d.call())}},c);return h.closeDialog=g,h.openDialog=p,h}}const qt={sm:12,md:16,lg:24},Er=()=>nt.map(t=>`
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
`);function pt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:r,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:m=e.variant??"outline",visibility:b=!0,...p}={}){const g=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${qt[u]};
      height: ${qt[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${Er()}
    `;return r({class:{deps:[b],renderProp:()=>h=>["spinner",g,d,m,h==!1?"":"visibility",e==null?void 0:e.class,p.class]},version:"1.1",x:"0px",y:"0px",width:qt[u],height:qt[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...p},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Tr=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Rt(t,e={}){const{bau:n,css:o}=t,{div:a,li:r}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:m,placeholder:b,Option:p,options:g,defaultOption:h,getOptionLabel:y,getOptionValue:f,onSelect:x=()=>{},id:S,required:k,name:D,loading:A,...B},...O]=V(l);const I=zt(t),$=N(t),j=ut(t,{variant:u,color:d,size:c}),U=yt(t),z=pt(t,{variant:u,color:d,size:c}),P=n.state(h),C=n.state(B.value),v=n.state(!1),w=n.state(0),E=()=>{v.val=!1},T=n.state(g),G=Y=>ot=>Y.val&&y(ot)==y(Y.val),R=()=>{lt.openDialog(),v.val=!0,C.val="",T.val=g,w.val=g.findIndex(G(P));const Y=Bt.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),it.scrollIntoView({block:"end"}))},H=()=>{lt.closeDialog(),v.val=!1,w.val=0},J=Y=>{const{value:ot}=Y.target;C.val=ot,ot?T.val=g.filter(Gt=>y(Gt).match(new RegExp(`${ot}`,"i"))):T.val=g},M=Y=>{lt.open?H():R()},X=Y=>{P.val=Y,ct.value=f(Y)},tt=({option:Y,index:ot})=>Gt=>{X(Y),w.val=ot,H()},W=()=>{const Y=Bt.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},Z=Y=>{switch(Y.key){case"Escape":H();break;case"ArrowDown":w.val<T.val.length-1?w.val++:w.val=0,W();break;case"ArrowUp":w.val<=0?w.val=T.val.length-1:w.val--,W();break;case"Enter":lt.open?(X(T.val[w.val]),H()):R(),Y.preventDefault();break}},at=$({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":v,"aria-label":m,onclick:M,variant:u,color:d,size:c,class:A==!0&&"loading",disabled:A},()=>P.val?y(P.val):m,()=>A==!0&&z({visibility:A})),it=j({value:C,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":v,oninput:J,onkeydown:Z,...B}),ct=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:h&&f(h),required:k,"aria-hidden":!1,"aria-label":D,name:D}),Bt=a({class:[u,d,c,"content"]},it,()=>U({class:[u,d,c]},T.val.map((Y,ot)=>r({class:()=>[w.val==ot&&"active",G(P)(Y)&&"selected"],onclick:tt({option:Y,index:ot})},p(Y))))),lt=I({id:S,triggerEl:at,contentEl:Bt,onClose:E,class:o`
        overflow: hidden;
      `});return a({...B,class:["autocomplete",i,e==null?void 0:e.class,B==null?void 0:B.class]},n.bind({deps:[P],render:()=>Y=>{Y&&(ct.value=f(Y),x(Y))}}),at,ct,lt)}}const bn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:r}=n.tags,i=Rt(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",name:"country","aria-label":"country"})},Dr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ar=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:r,article:i,footer:s}=e.tags,l=Rt(t),c=N(t,{variant:"outline",color:"primary"}),u=d=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(d.label),a(d.code));return()=>r({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},i(l({options:Dr,Option:u,getOptionValue:({code:m})=>m,getOptionLabel:({label:m})=>m,label:"Country",placeholder:"Search countries",name:"country"})),s(c({type:"submit"},"Submit")))},Br=`import autocomplete from "@grucloud/bau-ui/autocomplete";
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
`,Nr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Rt(t),c=N(t,{variant:"outline",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],m=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(b.label),s(b.code));return()=>o({onsubmit:p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(g))}},a(l({options:d,Option:m,defaultOption:d.find(({code:p})=>p==u),getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",name:"country"})),r(c({type:"submit"},"Submit")))},Or=`import { Context } from "@grucloud/bau-ui/context";
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
`,Mr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=N(t,{variant:"outline"}),c=N(t,{variant:"solid",color:"primary"}),u=Rt(t),d=m=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>{const m=e.state([]),b=e.state(!1),p=e.state("");async function g({url:f,transform:x=S=>S}){try{b.val=!0;const S=await fetch(f,{});if(S.ok){const k=await S.json();m.val=x(k)}else p.val=S.statusText}catch(S){p.val=S.message}finally{b.val=!1}}const h=()=>g({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:f=>f.sort((x,S)=>x.name.common.localeCompare(S.name.common))});return h(),o({onsubmit:f=>{f.preventDefault();const x=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(x))}},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({options:m.val,Option:d,getOptionValue:({name:f})=>f.common,getOptionLabel:({name:f})=>f.common,label:"Country",placeholder:"Search countries",name:"country",loading:b.val}),l({onclick:h},"Reload")),r(c({type:"submit"},"Submit")))}},Ir=`import { Context } from "@grucloud/bau-ui/context";
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
`,Lr=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Rt(t),c=N(t,{variant:"outline",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],d=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(b.label),s(b.code)),m="country";return()=>{const b=f=>{f.preventDefault();const x=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(x))},g=new URLSearchParams(window.location.search).get("country"),h=({code:f})=>f,y=f=>{const x=new URLSearchParams(window.location.search);x.delete(m),x.append(m,h(f)),window.history.replaceState("","",`?${x.toString()}${window.location.hash}`)};return o({onsubmit:b},a(l({name:m,options:u,Option:d,defaultOption:u.find(({code:f})=>f==g),getOptionValue:({code:f})=>f,getOptionLabel:({label:f})=>f,label:"Country",placeholder:"Search countries",onSelect:y})),r(c({type:"submit"},"Submit")))}},$r=`import { Context } from "@grucloud/bau-ui/context";
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
`,Pr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Br,createComponent:Ar},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ir,createComponent:Mr},{title:"Default Option",description:"A autocomplete with a default option.",code:Or,createComponent:Nr},{title:"URL State",description:"A autocomplete with the state in the URL",code:$r,createComponent:Lr}],gridItem:bn},zr=t=>{const e=F(t);return()=>e(Pr)};function gn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},...b]=V(s);return a({...m,class:["badge",r,e==null?void 0:e.class,m==null?void 0:m.class]},a({class:[u,c,l]},d),...b)}}const hn=(t,e)=>{const n=gn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Rr=t=>{const{bau:e}=t,{section:n}=e.tags,o=gn(t);return()=>n(o({content:"10"},"☏"))},jr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => {
    return section(Badge({ content: "10" }, "\\u260F"));
  };
};
`,_r={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:jr,createComponent:Rr}],gridItem:hn},Ur=t=>{const e=F(t);return()=>e(_r)};function ve(t,e={}){const{bau:n,css:o,config:a}=t,{ul:r,li:i,span:s}=n.tags,{separator:l="〉"}=e,c=N(t),u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",items:h,...y},...f]=V(m);return r({...y,class:[u,e==null?void 0:e.class,y==null?void 0:y.class]},h.map(({href:x,name:S})=>i((x!=null?c:s)({href:`${a.base}${x}`,color:g,variant:p,size:b,class:[g,p,b]},S))))}}const fn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=ve(t,e);return a=>o({...a,...n})},Gr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=ve(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},Fr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Hr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=ve(t,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Vr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Jr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Fr,createComponent:Gr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Vr,createComponent:Hr}],gridItem:fn},qr=t=>{const e=F(t);return()=>e(Jr)},vn=(t,e={})=>{const n=N(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Wr=t=>{const{bau:e}=t,{section:n}=e.tags,o=N(t,{color:"primary",variant:"outline"});return()=>n(o({onclick:()=>{alert("Click")}},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
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
`,Xr=t=>{const{bau:e}=t,{section:n}=e.tags,o=N(t,{color:"primary",variant:"outline"});return()=>n(o({disabled:!0,onclick:()=>{alert("Click")}},"Click me"))},Zr=`import button from "@grucloud/bau-ui/button";
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
`,Yr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Kr,createComponent:Wr},{title:"Disabled Button",description:"A disabled button.",code:Zr,createComponent:Xr}],gridItem:vn},Qr=t=>{const e=F(t);return()=>e(Yr)},ts=()=>nt.map(t=>`
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
`);function ye(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["button-group",c,u,l,r,e==null?void 0:e.class,d==null?void 0:d.class]},...m)}}const yn=(t,e)=>{const n=["ONE","TWO","THREE"],o=N(t,e),a=ye(t,e);return r=>a({...r},n.map(i=>o(r,i)))},es=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a="primary",r="solid",i=N(t,{color:a,variant:r}),s=ye(t,{color:a,variant:r});return()=>{const l=c=>u=>{alert(c)};return n(s(o.map(c=>i({onclick:l(c)},c))))}},ns=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,os={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:ns,createComponent:es}],gridItem:yn},as=t=>{const e=F(t);return()=>e(os)};function xe(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>nt.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},...b]=V(l);return a({...m,type:"date",class:["calendar",i,d,u,c,e==null?void 0:e.class,m==null?void 0:m.class]},...b)}}const xn=(t,e)=>{const n=xe(t,e),o=({props:a={},options:r={}})=>`myinput-gallery-${a.color??r.color}-${a.variant??r.variant}-${a.size??r.size}`;return a=>n({"aria-label":o({props:a,options:e}),...a})},rs=t=>{const{bau:e}=t,{form:n,footer:o,article:a,label:r}=e.tags,i=xe(t),s=N(t,{variant:"outline",color:"primary"});return()=>n({onsubmit:c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))}},a(r("Start date:",i({name:"start",min:"2023-01-01",max:"2024-12-31",required:!0}))),o(s({type:"submit"},"Submit")))},ss=`import { Context } from "@grucloud/bau-ui/context";
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
`,is=t=>{const{bau:e}=t,{form:n,footer:o,article:a,label:r}=e.tags,i=xe(t),s=N(t,{variant:"outline",color:"primary"});return()=>{const l=e.state("2023-08-08");return n({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))}},a(r("Start date:",i({name:"start",min:"2023-01-01",max:"2024-12-31",oninput:u=>{l.val=u.target.value}}))),o(s({type:"submit"},"Submit")))}},cs=`import { Context } from "@grucloud/bau-ui/context";
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
`,ls={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Uncontrolled Calendar",description:"A simple calendar.",code:ss,createComponent:rs},{title:"Controlled Calendar",description:"A controlled calendar.",code:cs,createComponent:is}],gridItem:xn},us=t=>{const e=F(t);return()=>e(ls)};function ds(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:m,Slide:b,Previous:p,Next:g,...h}]=V(l);const y=()=>{i.val<=0?i.val=m.length-1:i.val--},f=()=>{i.val>=m.length-1?i.val=0:i.val++},x=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},m.map(b));return a({...h,class:["carousel",c,r,e==null?void 0:e.class,h==null?void 0:h.class]},a({class:["control","control-previous"],onclick:y},p()),a({class:["control","control-next"],onclick:f},g()),x)}}const ms=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],ps=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,r=N(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),s=ds(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),l=()=>r("◀"),c=()=>r("▶");return()=>o(s({slides:ms,Slide:i,Previous:l,Next:c}))},bs=`import carousel from "@grucloud/bau-ui/carousel";
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
`,gs={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:bs,createComponent:ps}]},hs=t=>{const e=F(t);return()=>e(gs)},wn=(t,e)=>{const n=Pt(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},fs=t=>{const{bau:e}=t,{section:n}=e.tags,o=Pt(t,{variant:"outline",color:"primary"});return()=>n(o("My Chip"))},vs=`import chip from "@grucloud/bau-ui/chip";
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
`,ys={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:vs,createComponent:fs}],gridItem:wn},xs=t=>{const e=F(t);return()=>e(ys)};function wt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({type:"checkbox",...d,class:[r,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class]})}}const Sn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,r=wt(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,r({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},ws=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,label:i}=e.tags,s=wt(t,{color:"neutral",variant:"outline"}),l=N(t,{variant:"outline",color:"primary"});return()=>{const c=e.state(!1),u=m=>c.val=m.target.checked;return o({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},a(i({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",s({name:"myCheckbox",checked:c,onchange:u}))),r(l({type:"submit"},"Submit")))}},Ss=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cs=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:r,form:i}=e.tags,s=wt(t,{color:"neutral",variant:"outline"}),l=N(t,{variant:"outline",color:"primary"});return()=>i({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))},class:n`
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
        `},r(o("My Checkbox",s({name:"my-checkbox-uncontrolled"})),o("My Checkbox with default",s({name:"my-checkbox-uncontrolled-default",defaultChecked:"on"}))),a(l({type:"submit"},"Submit")))},ks=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Es=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:r,form:i}=e.tags,s=wt(t,{color:"neutral",variant:"outline"}),l=N(t,{variant:"outline",color:"primary"}),c=N(t,{variant:"solid",color:"primary"});return()=>{const u=m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))},d=m=>{const b=window.document.getElementById("my-checkbox");b&&(b.indeterminate=!b.indeterminate)};return i({onsubmit:u,class:n`
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
        `},r(o("My Checkbox",s({id:"my-checkbox",name:"my-checkbox"})),l({onclick:d},"Toggle Indeterminate")),a(c({type:"submit"},"Submit")))}},Ts=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Ds=t=>{const{bau:e,css:n,window:o}=t,{form:a,article:r,footer:i,label:s}=e.tags,l="myCheckbox",c=wt(t,{color:"neutral",variant:"outline"}),u=N(t,{variant:"outline",color:"primary"});return()=>{const d=new URLSearchParams(o.location.search),m=p=>{const g=new URLSearchParams(o.location.search);g.delete(p.target.name),g.append(p.target.name,p.target.checked),o.history.replaceState("","",`?${g.toString()}${o.location.hash}`)};return a({onsubmit:p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(g))}},r(s({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",c({name:l,defaultChecked:d.get(l)=="true",onchange:m}))),i(u({type:"submit"},"Submit")))}},As=`import { Context } from "@grucloud/bau-ui/context";
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
`,Bs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:ks,createComponent:Cs},{title:"Controlled checkbox",description:"A controlled checkbox.",code:Ss,createComponent:ws},{title:"Indeterminate checkbox",description:"An indeterminate checkbox.",code:Ts,createComponent:Es},{title:"State in URL",description:"Checkbox states in URL",code:As,createComponent:Ds}],gridItem:Sn},Ns=t=>{const e=F(t);return()=>e(Bs)},Os=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=he(t),r=N(t,{variant:"outline"}),i=()=>r("Header"),s=()=>o("Content");return()=>n(a({Header:i,Content:s}))},Ms=`import button from "@grucloud/bau-ui/button";
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
`,Is={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Ms,createComponent:Os}]},Ls=t=>{const e=F(t);return()=>e(Is)};function $s(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["divider",l,r,e==null?void 0:e.class,d==null?void 0:d.class]},a({class:"content"},...m))}}const Ps=t=>{const{bau:e}=t,{section:n}=e.tags,o=$s(t);return()=>n(o("OR"))},zs=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => {
    return section(Divider("OR"));
  };
};
`,Rs={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:zs,createComponent:Ps}],variantColorTableDisable:!0,variantSizeDisable:!0},js=t=>{const e=F(t);return()=>e(Rs)};function _s(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{color:l,variant:c="outline",size:u,openState:d,...m},...b]=V(s);return a({class:[r,e==null?void 0:e.class,m.class]},a({class:()=>["overlay",d.val&&"overlay-open"],onclick:()=>{d.val=!1}}),a({class:()=>["content",d.val&&"content-open"]},b))}}const Us=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=_s(t),r=N(t,{color:"neutral",variant:"outline"}),i=He(t);return()=>{const s=e.state(!1);return n(o("Click on the button to open and close the drawer."),r({onclick:()=>{s.val=!s.val}},"OPEN DRAWER"),a({openState:s},i()))}},Gs=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Fs={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Gs,createComponent:Us}]},Hs=t=>{const e=F(t);return()=>e(Fs)},Vs=()=>nt.map(t=>`
`).join(`
`);function Cn(t,e={}){const{bau:n,css:o}=t,{div:a,li:r}=n.tags,i=N(t),s=zt(t),l=yt(t),c=o`
    ${Vs()}
  `;return function(...d){let[{size:m=e.size??"md",variant:b=e.variant??"outline",color:p=e.color??"neutral",label:g,ListItem:h,items:y,...f},...x]=V(d);const S=n.state(0),k=()=>{U.openDialog(),U.focus()},D=()=>{U.closeDialog()},A=()=>{U.open?D():k()},B=z=>{A(),z.preventDefault()},O=({item:z,index:P})=>C=>{S.val=P,D(),C.preventDefault()},I=z=>{switch(z.preventDefault(),z.key){case"Escape":D();break;case"ArrowDown":S.val<options.length-1?S.val++:S.val=0;break;case"ArrowUp":S.val<=0?S.val=options.length-1:S.val--;break;case"Enter":A();break}},$=()=>l({tabindex:"0",class:[p,b]},y.map((z,P)=>r({class:()=>[S.val==P&&"active"],onclick:O({item:z,index:P})},h(z)))),j=i({type:"button",onclick:B,color:p,variant:b,size:m},g),U=s({triggerEl:j,contentEl:$()});return a({...f,class:["dropdownMenu",p,m,c,e==null?void 0:e.class,f==null?void 0:f.class],onkeydown:I},j,U)}}const Js=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,r=Cn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o(a(l.label));return l=>r({...l,items:i,ListItem:s,label:"Action"})},qs=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,r=Cn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(r({items:i,ListItem:s,label:"Action"}))},Ws=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Ks={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Ws,createComponent:qs}],gridItem:Js},Xs=t=>{const e=F(t);return()=>e(Ks)},kn=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=le(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Zs=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=le(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Ys=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Qs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Ys,createComponent:Zs}],gridItem:(t,e)=>kn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},ti=t=>{const e=F(t);return()=>e(Qs)};function En(t,e={}){const{bau:n,css:o}=t,{div:a,label:r,input:i}=n.tags,s={base:o`
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
    `};return function(c,...u){const{size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",Component:p,disabled:g,...h}=c;return a({class:[s.base,g&&s.disabled,e==null?void 0:e.class,c.class]},r({class:[m,b,d]},p({disabled:g}),i({type:"file",disabled:g,...h})))}}const Tn=(t,e)=>{const{tr:n,bau:o,css:a,config:r}=t,{svg:i,use:s}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=En(t,e),m=p=>{const g=p.target.files[0];g?u.val=g.name:u.val="No file selected"},b=({disabled:p})=>l({class:[a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,p&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `]},i({width:100,height:100,fill:"currentColor"},s({href:`${r.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return p=>d({Component:b,name:"file",accept:"text/*",onchange:m,...p})},ei=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:r,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,span:c}=n.tags,u=En(t),d=({disabled:m})=>l({class:[o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `]},r({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return()=>{const m=n.state("No file selected");return s(u({Component:d,name:"file",accept:"text/*",onchange:p=>{const g=p.target.files[0];g?m.val=g.name:m.val="No file selected"}}),l("File selected: ",m))}},ni=`import fileInput from "@grucloud/bau-ui/fileInput";
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
`,oi={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:ni,createComponent:ei}],gridItem:Tn},ai=t=>{const e=F(t);return()=>e(oi)};function bt(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...m},...b]=V(s);return a({...m,class:["form",u,c,l,r,e==null?void 0:e.class,m==null?void 0:m.class]},...b)}}function we(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:m=e.color??"neutral",loading:b,...p},...g]=V(c);const h=N(t),y=pt(t);return n.bind({deps:[b],render:()=>f=>h({...p,class:["loadingButton",u,d,m,s,f&&"loading",e==null?void 0:e.class,p==null?void 0:p.class]},y({size:u,variant:d,color:m,visibility:f}),r({class:f&&"loading"},g))})}}const ri=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:r,header:i,label:s,img:l,footer:c}=e.tags,u=we(t,{variant:"solid",color:"primary"}),d=Tt(t,{variant:"outline",color:"danger"}),m=ut(t),b=bt(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:g=()=>{}}){const h=e.state(!1),y=e.state("");return b({onsubmit:async x=>{x.preventDefault();const{username:S,password:k}=Object.fromEntries(new FormData(x.currentTarget));try{h.val=!0;const D=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:S,password:k})});if(D.ok){const A=await D.json();g(A)}else D.status==401?y.val="Invalid username or password":y.val=D.statusText}catch(D){y.val=D.message}finally{h.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),r("Login to Grucloud")),a(()=>y.val&&d(y.val),s("Email",m({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),s("Password",m({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",loading:h},"Login")))}},si=`import form from "@grucloud/bau-ui/form";
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
`,ii=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:r,footer:i}=e.tags,s=bt(t),l=N(t,{variant:"solid",color:"primary"}),c=ut(t);return function({onSubmitted:d=()=>{}}){return s({onsubmit:async b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p)),d(p)}},a(o("Form with input")),n(r("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},ci=`import form from "@grucloud/bau-ui/form";
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
`,li=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:r,footer:i,em:s,span:l}=e.tags,c=e.state(""),u=e.derive(()=>c.val!=="Delete"),d=bt(t),m=N(t,{variant:"solid",color:"danger"}),b=ut(t);return function({onSubmitted:g=()=>{}}){return d({onsubmit:async y=>{y.preventDefault(),g()}},a(o("Delete Protection")),n(r(l("Type ",s("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:y=>c.val=y.target.value}))),i(m({type:"submit",disabled:u},"Delete")))}},ui=`import { Context } from "@grucloud/bau-ui/context";
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
`,di={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:ci,createComponent:ii},{title:"Form with state",description:"A form with input state and a dervied state.",code:ui,createComponent:li},{title:"Login page",description:"A login page.",code:si,createComponent:ri}]},mi=t=>{const e=F(t);return()=>e(di)},Dn=(t,e={})=>{const n=ut(t,e),o=({color:a,variant:r,size:i,options:s})=>`myinput-gallery-${a??s.color}-${r??s.variant}-${i??s.size}`;return({color:a,variant:r,size:i,...s})=>n({"aria-label":o({color:a,variant:r,size:i,options:e}),name:o({color:a,variant:r,size:i,options:e}),placeholder:"Enter text",color:a,variant:r,size:i,...s})},pi=t=>{const{bau:e}=t,{article:n,footer:o,label:a}=e.tags,r=ut(t),i=bt(t),s=N(t,{variant:"solid",color:"primary"});return()=>i({onsubmit:c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))}},n(a("Basic input",r({name:"my-input",placeholder:"Enter Text"})),a("Required input",r({required:!0,name:"my-required-input",placeholder:"Enter Text"})),a("Input with minLength/maxLength",r({name:"my-required-input-min-max",placeholder:"Enter Text",required:!0,minLength:3,maxLength:24})),a("Input with custom error message",r({name:"my-required-input-custom",placeholder:"Enter Text",required:!0,minLength:3,maxLength:24,oninvalid:c=>{c.target.setCustomValidity("Please select the correct format.")}})),a("Disabled input",r({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))),o(s({type:"submit"},"Submit")))},bi=`import { Context } from "@grucloud/bau-ui/context";
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
`,gi=t=>{const{bau:e}=t,{article:n,footer:o,label:a}=e.tags,r=ut(t),i=bt(t),s=N(t,{variant:"solid",color:"primary"});return()=>{const l=e.state(""),c=e.derive(()=>l.val=="");return i({onsubmit:m=>{m.preventDefault(),alert(l.val)}},n(a("Input",r({name:"my-input",placeholder:"Enter Text",value:l,oninput:m=>l.val=m.target.value}))),o(s({type:"submit",disabled:c},"Submit")))}},hi=`import { Context } from "@grucloud/bau-ui/context";
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
`,fi={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Uncontrolled Input",description:"Various uncontrolled inputs.",code:bi,createComponent:pi},{title:"Controlled Input",description:"Various controlled inputs.",code:hi,createComponent:gi}],gridItem:Dn},vi=t=>{const e=F(t);return()=>e(fi)},An=(t,e={})=>{const n=ue(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},yi=t=>{const{bau:e}=t,{label:n,footer:o,article:a}=e.tags,r=bt(t),i=ue(t),s=N(t,{variant:"solid",color:"primary"});return()=>r({onsubmit:c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))}},a(n("Basic inputSearch",i({name:"my-inputSearch",placeholder:"Enter Text"})),n("Disabled inputSearch",i({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))),o(s({type:"submit"},"Submit")))},xi=`import { Context } from "@grucloud/bau-ui/context";
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
`,wi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:xi,createComponent:yi}],gridItem:An},Si=t=>{const e=F(t);return()=>e(wi)};function Bn(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["keyValueList",r,e==null?void 0:e.class,d==null?void 0:d.class]},...m)}}const Ci=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:r}=e.tags,i=Bn(t);return()=>n(i(o(a("My label"),r("My Value")),o(a("My other label"),r("My Other Value"))))},ki=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,Ei=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:r,span:i}=e.tags,s=Bn(t,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(s(a(r("My label"),i("My Value")),a(r("My other label"),i("My Other Value"))))},Ti=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,Di={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:ki,createComponent:Ci},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:Ti,createComponent:Ei}]},Ai=t=>{const e=F(t);return()=>e(Di)},Bi="modulepreload",Ni=function(t){return"/bau/bau-ui/"+t},Re={},Nn=function(e,n,o){if(!n||n.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=Ni(r),r in Re)return;Re[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===r&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":Bi,i||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e())};function On(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=pt(t,{size:"lg"}),i=Tt(t,{color:"danger"}),s=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},r({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=s,error:m=l,props:b={}}){const p=n.state(void 0),g=n.state(!0),h=n.state(!1);return u().then(y=>{n.batch(()=>{p.val=y.default(t),g.val=!1})}).catch(y=>{h.val=y.message}),a(()=>{if(h.val)return m({message:h.val});if(g.val)return d();if(p.val)return p.val(b)})}}const Oi=t=>{const{bau:e}=t,{section:n}=e.tags,o=On(t),a=N(t);return()=>{const r=e.state(!1);return n(a({onclick:()=>r.val=!r.val},()=>r.val?"Hide":"Show"),()=>r.val&&o({getModule:()=>Nn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))}},Mi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ii=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),r=On(t,{loading:()=>o("My Custom Loading"),error:s=>o("My Custom Error")}),i=N(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&r({getModule:()=>Nn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Li=`import { Context } from "@grucloud/bau-ui/context";
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
`,$i={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:Mi,createComponent:Oi},{title:"Custom Loader",description:"Custom loader and error",code:Li,createComponent:Ii}]},Pi=t=>{const e=F(t);return()=>e($i)};function Mn(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:r}=n.tags,i=()=>nt.map(c=>`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",running:p,...g}]=V(u);return r({...g,role:"progressbar",class:{deps:[p],renderProp:()=>h=>["linearProgress",d,b,l,h&&"running",e==null?void 0:e.class,g==null?void 0:g.class]}})}}const In=(t,e)=>{const n=Mn(t,e);return o=>n({...o,"aria-label":"linear-progress",running:!0})},zi=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=N(t,{variant:"solid",color:"primary"}),r=Mn(t),i=e.state(!1);return()=>n(a({onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,r({"aria-label":"linear-progress",running:i}))},Ri=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ji={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Ri,createComponent:zi}],gridItem:In},_i=t=>{const e=F(t);return()=>e(ji)},Ln=(t,e)=>{const n=we(t,e);return o=>n({...o,loading:!0},"Save")},Ui=t=>{const{bau:e}=t,{section:n}=e.tags,o=we(t,{variant:"solid",color:"primary"});return()=>{const a=e.state(!0);return n(o({loading:a,onclick:()=>a.val=!a.val},"Save"))}},Gi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Fi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Gi,createComponent:Ui}],gridItem:Ln},Hi=t=>{const e=F(t);return()=>e(Fi)},Vi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Ji=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:r}=n.tags,i=yt(t,e),s=({code:l,label:c})=>r({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},Vi.map(s))},qi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Wi=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:r}=e.tags,i=yt(t,{variant:"outline",color:"primary"}),s=({code:l,label:c})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i(qi.map(s)))},Ki=`import list from "@grucloud/bau-ui/list";
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
`,Xi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ki,createComponent:Wi}],gridItem:Ji},Zi=t=>{const e=F(t);return()=>e(Xi)};function $n(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:r,div:i}=n.tags,l=o`
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
    ${(()=>nt.map(c=>`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"plain",color:b=e.color??"neutral",...p},...g]=V(u);const h=r({...p,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(p.id??"modal")&&h.showModal()},class:["modal",l,b,m,d,e==null?void 0:e.class,p==null?void 0:p.class]},g);return new MutationObserver(f=>{const x=new URLSearchParams(a.location.search);f[0].attributeName=="open"&&(h.open?x.set("modal",h.id??"modal"):x.delete("modal"),a.history.pushState("","",`?${x.toString()}`))}).observe(h,{attributes:!0}),h}}const Pn=(t,e={})=>{const{bau:n,window:o}=t,{document:a}=o,{form:r,section:i,main:s,header:l,footer:c,p:u,h1:d}=n.tags,m=N(t),b=$n(t,e),p=()=>s(Array(20).fill("").map((y,f)=>u(f+1,". Some text here"))),g=y=>`dialog-${y.color}-${y.variant}-${e.size}`,h=y=>b({id:g(y),...y},r(l(d("Header")),p(),c(m({variant:"outline",color:y.color,onclick:f=>{f.target.closest("dialog").close()}},"Cancel"),m({variant:"solid",color:y.color,onclick:f=>{f.target.closest("dialog").close()}},"OK"))));return y=>i(m({...y,onclick:()=>{a.getElementById(g(y)).showModal()}},"OPEN MODAL"),h(y))},Yi=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,section:r,main:i,header:s,footer:l,p:c}=e.tags,d=N(t,{color:"neutral"}),m=$n(t),b=()=>i(Array(10).fill("").map((p,g)=>c(g+1,". Some text here")));return()=>r(d({variant:"solid",onclick:()=>{o.getElementById("my-dialog").showModal()}},"OPEN MODAL"),m({id:"my-dialog"},a(s("Header"),b(),l(d({variant:"outline",onclick:p=>{p.target.closest("dialog").close()}},"Cancel"),d({variant:"solid",onclick:p=>{p.target.closest("dialog").close()}},"OK")))))},Qi=`import modal from "@grucloud/bau-ui/modal";
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
`,tc={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Qi,createComponent:Yi}],gridItem:Pn},ec=t=>{const e=F(t);return()=>e(tc)},nc=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function oc(t,e={}){const{bau:n,css:o}=t,{div:a,li:r,select:i}=n.tags,s=N(t),l=zt(t),c=yt(t),u=wt(t,{color:"neutral",variant:"outline"}),d=o`
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
  `;return function(...b){let[{size:p=e.size??"md",variant:g=e.variant??"outline",color:h=e.color??"neutral",name:y,label:f,Option:x,options:S,defaultValue:k=[],getOptionLabel:D,getOptionValue:A,renderValue:B,onSelect:O=()=>{},loading:I,...$},...j]=V(b);const U=pt(t,{variant:g,color:h,size:p}),z=n.state(k),P=n.state(!1),C=n.state(0),v=()=>{X.openDialog(),X.focus(),P.val=!0},w=()=>{X.closeDialog(),P.val=!1},E=()=>{P.val=!1},T=W=>{X.open?w():v(),W.preventDefault()},G=()=>Array.from(tt.selectedOptions).map(({value:W})=>S.find(Z=>A(Z)==W)),R=W=>{switch(W.preventDefault(),W.key){case"Escape":w();break;case"ArrowDown":C.val<S.length-1?C.val++:C.val=0;break;case"ArrowUp":C.val<=0?C.val=S.length-1:C.val--;break;case"Enter":if(X.open){const Z=W.currentTarget.querySelectorAll("input")[C.val];Z.checked=!Z.checked;const at=tt.options[C.val+1];at.selected=!at.selected,z.val=G()}else v();break}},H=W=>Z=>{const at=[...tt.options].find(({value:it})=>it==A(W));Z.target.checked?at.selected=!0:at.selected=!1,z.val=G()},J=()=>c({tabindex:"0",class:[h,g]},S.map((W,Z)=>r({class:()=>C.val==Z&&"active"},n.tags.label(u({checked:k.find(at=>A(at)==A(W)),name:`${y}-${A(W)}`,onchange:H(W)}),x(W))))),M=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":P,"aria-label":f,onclick:T,color:h,variant:g,size:p,class:I==!0&&"loading",disabled:I},()=>z.val.length?B(z.val):f,()=>I==!0&&U({visibility:I})),X=l({triggerEl:M,contentEl:J(),onClose:E}),tt=i({name:y,multiple:!0,...$},n.tags.option({value:""},"--Category--"),S.map(W=>n.tags.option({value:A(W),selected:k.find(Z=>A(Z)==A(W))},D(W))));return a({...$,class:["multiSelect",h,p,d,e==null?void 0:e.class,$==null?void 0:$.class],onkeydown:R},tt,M,X)}}const ac=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:r,footer:i}=e.tags,s=oc(t),l=N(t,{variant:"outline",color:"neutral"}),c=Pt(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=m=>a(m.group);return()=>r({onsubmit:b=>{b.preventDefault();const{selectedOptions:p}=b.target.elements.myMultiSelect,g=Array.from(p).map(({value:h})=>h);alert(JSON.stringify(g))},class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},s({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                align-items: center;
                gap: 0.2rem;
              `},b.map(p=>c(p.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},rc=`import { Context } from "@grucloud/bau-ui/context";
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
`,sc=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:r}=e.tags,i=N(t,{variant:"outline",color:"neutral"}),s=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:m})=>m);alert(JSON.stringify(d))};return()=>r({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},s.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},ic=`import { Context } from "@grucloud/bau-ui/context";
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
`,cc={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:rc,createComponent:ac},{title:"Native Multi Select",description:"A native multi select.",code:ic,createComponent:sc}]},lc=t=>{const e=F(t);return()=>e(cc)},uc=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:r}=e.tags,i=N(t,{variant:"outline",color:"success"}),s=zt(t),l=()=>i({onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),r("My Content")),u=l(),d=s({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},dc=`import popover from "@grucloud/bau-ui/popover";
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
`,mc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:dc,createComponent:uc}]},pc=t=>{const e=F(t);return()=>e(mc)};function bc(t,e={}){const{bau:n,css:o,config:a}=t,{div:r,a:i,span:s,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:m,label:b,href:p})=>i({href:`${a.base}${p}`},s({class:"sublabel"},d),r({class:`label ${d}`},b??m));return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",data:h={},...y}]=V(m);const{next:f,previous:x}=h;return l({"data-paginationnav":JSON.stringify(h),"aria-label":"pages navigation",...y,class:["paginationNavigation",b,c,e==null?void 0:e.class,y==null?void 0:y.class]},(x==null?void 0:x.href)&&u({text:"Previous"})(x),(f==null?void 0:f.href)&&u({text:"Next"})(f))}}const gc=t=>{const{bau:e}=t,{section:n}=e.tags,o=bc(t,{variant:"solid",color:"primary"}),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({data:a}))},hc=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,fc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:hc,createComponent:gc}]},vc=t=>{const e=F(t);return()=>e(fc)},yc=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=ge(t,e);return r=>a({...r},o(`Paper ${e.size??""}`))},xc=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=ge(t,{size:"md"});return()=>n(a(o("My content")))},wc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context, { size: "md" });

  return () => {
    return section(Paper(div("My content")));
  };
};
`,Sc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:wc,createComponent:xc}],variantColorTableDisable:!0,gridItem:yc},Cc=t=>{const e=F(t);return()=>e(Sc)};function Se(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    cursor: pointer;
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>nt.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m}]=V(l);return a({...m,type:"radio",class:["radio-button",c,d,u,i,e==null?void 0:e.class,m==null?void 0:m.class]})}}const zn=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:r}=n.tags,i=Se(t,e);return s=>r({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},kc=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:r,article:i,footer:s,fieldset:l,legend:c}=e.tags,u=Se(t),d=N(t,{variant:"outline",color:"primary"});return()=>{const m=e.state("one"),b=({target:g})=>m.val=g.id,p=g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))};return r({class:n`
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
        `,onsubmit:p},i(l(c("One or two"),o("One",u({id:"one",name:"radio",checked:!0,value:m,oninput:b})),o("Two",u({id:"two",name:"radio",value:m,oninput:b}))),a("Choice: ",m)),s(d({type:"submit"},"Submit")))}},Ec=`import { Context } from "@grucloud/bau-ui/context";
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
`,Tc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Ec,createComponent:kc}],gridItem:zn},Dc=t=>{const e=F(t);return()=>e(Tc)};function jt(t,e={}){const{bau:n,css:o}=t,{div:a,label:r}=n.tags,i=Se(t),l=o`
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
    ${(()=>nt.map(c=>`
  `).join(`
`))()};
  `;return function(...u){let[{size:d=e.size??"md",variant:m=e.variant??"none",color:b=e.color??"neutral",name:p,oninput:g,radios:h=[],...y}]=V(u);return a({class:["radioButtonGroup",d,b,m,l,e==null?void 0:e.class,y==null?void 0:y.class]},h.map(({value:f,Label:x})=>r(i({...y,size:d,variant:m,color:b,id:f,name:p,checked:f==y.value,value:f,oninput:g}),x())))}}const Ac=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:r}=e.tags,i=jt(t),s=N(t,{variant:"outline",color:"primary"});return()=>{const l=e.state("two");return n({onsubmit:d=>{d.preventDefault(),alert(l.val)}},o(i({oninput:({target:d})=>l.val=d.value,name:"myRadio",value:l.val,radios:[{value:"one",Label:()=>"One"},{value:"two",Label:()=>"Two"}]}),r("CheckedState: ",l)),a(s({type:"submit"},"Submit")))}},Bc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Nc=t=>{const{bau:e,window:n}=t,{form:o,article:a,footer:r}=e.tags,i="myRadio",s=jt(t),l=N(t,{variant:"outline",color:"primary"});return()=>{const c=new URLSearchParams(n.location.search);return o({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},a(s({oninput:({target:m})=>{const b=new URLSearchParams(n.location.search);b.delete(m.name),b.append(m.name,m.value),n.history.replaceState("","",`?${b.toString()}${n.location.hash}`)},name:i,value:c.get(i),radios:[{value:"one",Label:()=>"One"},{value:"two",Label:()=>"Two"}]})),r(l({type:"submit"},"Submit")))}},Oc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Mc=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=jt(t),i=N(t,{variant:"outline",color:"primary"});return()=>n({onsubmit:l=>{l.preventDefault();const c=Object.fromEntries(new FormData(l.currentTarget));alert(JSON.stringify(c))}},o(r({name:"myRadio",value:"one",radios:[{value:"one",Label:()=>"One"},{value:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},Ic=`import { Context } from "@grucloud/bau-ui/context";
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
`,Lc=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:r,img:i}=e.tags,s=jt(t),l=N(t,{variant:"outline",color:"primary"}),c=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28});return()=>o({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},a(s({name:"git_provider_type",value:"",radios:[{value:"GitHub",Label:()=>[c(),"GitHub"]},{value:"GitLab",Label:()=>[u(),"GitLab"]}]})),r(l({type:"submit"},"Submit")))},$c=`import { Context } from "@grucloud/bau-ui/context";
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
`,Pc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:r,div:i}=e.tags,s=jt(t),l=N(t,{variant:"outline",color:"primary"});return()=>n({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))}},o(s({name:"git_provider_type",value:"",radios:[{value:"GitHub",Label:()=>i("GitHub",r("Login with GitHub"))},{value:"GitLab",Label:()=>i("GitLab",r("Login with GitLab"))}]})),a(l({type:"submit"},"Submit")))},zc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Rc={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:Ic,createComponent:Mc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:Bc,createComponent:Ac},{title:"Url State Radio Button Group",description:"A radio button group with the state in the URL",code:Oc,createComponent:Nc},{title:"Label with Image",description:"A label with an image.",code:$c,createComponent:Lc},{title:"Label with description",description:"A label with name and description.",code:zc,createComponent:Pc}]},jc=t=>{const e=F(t);return()=>e(Rc)};function $t(t,e={}){const{bau:n,css:o,window:a}=t,{section:r,article:i,div:s}=n.tags,{document:l}=a,{direction:c="horizontal"}=e,u=o`
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
  `;function d(...p){let[g,...h]=V(p);return r({...g,class:["resizablePanelGroup",g==null?void 0:g.class,e==null?void 0:e.class,u]},h)}function m(...p){let[g,...h]=V(p);return i({...g,class:["resizablePanel",g==null?void 0:g.class]},h)}function b(...p){let[g,...h]=V(p),y=0,f=0,x,S,k,D,A;const B=()=>c==="horizontal",O=z=>B()?I(z):$(z),I=z=>{const P=z.clientX-y;A&&(D.style.width=`${A.width+P}px`),k&&(S.style.width=`${k.width-P}px`)},$=z=>{const P=z.clientY-f;A&&(D.style.height=`${A.height+P}px`),k&&(S.style.height=`${k.height-P}px`)},j=()=>{S=null,D=null,k=null,A=null,x.style.cursor=null,x.style["user-select"]="auto",l.removeEventListener("mousemove",O),l.removeEventListener("mouseup",j)},U=z=>{y=z.clientX,f=z.clientY;const{target:P}=z,C=P.closest(".handle");x=P.closest(".resizablePanelGroup"),x.style.cursor=B()?"col-resize":"row-resize",x.style["user-select"]="none",S=C.nextSibling,D=C.previousSibling,D&&(A=D.getBoundingClientRect()),S&&(k=S.getBoundingClientRect()),l.addEventListener("mousemove",O),l.addEventListener("mouseup",j)};return s({...g,class:["handle",c],role:"separator",bauMounted:({element:z})=>{z.addEventListener("mousedown",U)},bauUnmounted:({element:z})=>{z.removeEventListener("mousedown",U)}},h)}return{PanelGroup:d,Panel:m,Handle:b}}const _c=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:r,Panel:i,Handle:s}=$t(t,{class:n`
      display: inline-flex;
      border: 1px var(--color-emphasis-100) solid;
      width: 400px;
    `}),l=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        `},a("Resize me")),c=()=>a({class:n`
          background-color: var(--color-emphasis-100);
          color: var(--color-emphasis-400);
          border-radius: var(--global-radius);
          font-size: large;
          padding: 0.2rem;
          z-index: 1;
        `},"⋮");return()=>o(r(l(),s(c())))},Uc=`import resizable from "@grucloud/bau-ui/resizable";
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
`,Gc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:r,Panel:i,Handle:s}=$t(t,{class:n`
      display: inline-flex;
      border: 1px var(--color-emphasis-100) solid;
      width: 600px;
    `}),l=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        `},a("Panel1")),c=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: fit-content;
          width: 100px;
          height: 100px;
        `},a("Panel2"));return()=>o(r(l(),s(),c()))},Fc=`import resizable from "@grucloud/bau-ui/resizable";
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
`,Hc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:r,Panel:i,Handle:s}=$t(t,{direction:"vertical",class:n`
      display: inline-flex;
      flex-direction: column;
      border: 1px grey dotted;
      height: 300px;
    `}),l=()=>i({class:n`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50px;
          width: 100px;
          height: 100px;
        `},a("Panel1")),c=()=>i({class:n`
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
        `},"⋯");return()=>o(r(l(),s(u()),c()))},Vc=`import resizable from "@grucloud/bau-ui/resizable";
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
`,Jc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,{PanelGroup:r,Panel:i,Handle:s}=$t(t,{class:n`
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
    `}),l=$t(t,{direction:"vertical",class:n`
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
    `}),c=()=>i({class:n`
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
        `},a("Footer"));return()=>o(r(c(),s(),l.PanelGroup(u(),l.Handle(),d())))},qc=`import resizable from "@grucloud/bau-ui/resizable";
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
`,Wc={title:"Resizable",package:"resizable",description:"The resizable component allows to resize panels",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/resizable/resizable.js",importStatement:'import resizable from "@grucloud/bau-ui/resizable";',examples:[{title:"Horizontal 1 Panel",description:"A resizable horizontal panel.",code:Uc,createComponent:_c},{title:"Horizontal 2 Panels",description:"A resizable 2 side horizontal panel.",code:Fc,createComponent:Gc},{title:"Vertical 2 Panels",description:"A resizable 2 side vertical panel.",code:Vc,createComponent:Hc},{title:"Nested",description:"Nested panels.",code:qc,createComponent:Jc}]},Kc=t=>{const e=F(t);return()=>e(Wc)},Xc=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Dt(t,e={}){const{bau:n,css:o}=t,{div:a,li:r,select:i,option:s}=n.tags,l=N(t),c=zt(t),u=yt(t),d=o`
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
    ${Xc()}
  `;return function(...b){let[{size:p=e.size??"md",variant:g=e.variant??"outline",color:h=e.color??"neutral",label:y,Option:f,options:x,defaultOption:S,getOptionLabel:k,getOptionValue:D,onSelect:A=()=>{},loading:B,...O},...I]=V(b);const $=pt(t,{variant:g,color:h,size:p}),j=n.state(S?k(S):y),U=n.state(!1),z=n.state(0),P=()=>{H.openDialog(),H.focus(),U.val=!0},C=()=>{H.closeDialog(),U.val=!1},v=()=>{U.val=!1},w=M=>{H.open?C():P(),M.preventDefault()},E=({option:M,index:X})=>tt=>{j.val=k(M),J.value=D(M),J.setCustomValidity(""),z.val=X,C(),A(M),tt.preventDefault()},T=M=>{switch(M.preventDefault(),M.key){case"Escape":C();break;case"ArrowDown":z.val<x.length-1?z.val++:z.val=0;break;case"ArrowUp":z.val<=0?z.val=x.length-1:z.val--;break;case"Enter":H.open?(j.val=k(x[z.val]),J.value=D(s),C()):P();break}},G=()=>u({tabindex:"0",class:[h,g]},x.map((M,X)=>r({class:()=>z.val==X&&"active",onclick:E({option:M,index:X})},f(M)))),R=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":U,"aria-label":y,onclick:w,color:h,variant:g,size:p,class:B==!0&&"loading",disabled:B},()=>!j.val&&y,j,()=>B==!0&&$({visibility:B})),H=c({triggerEl:R,contentEl:G(),onClose:v}),J=i({...O,"aria-label":y},s({value:""},"--Select Category--"),x.map(M=>s({value:D(M)},k(M))));return S?J.value=D(S):J.value=O.value,a({...O,class:["select",h,p,d,e==null?void 0:e.class,O==null?void 0:O.class],onkeydown:T},J,R,H)}}const Rn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:r}=n.tags,i=Dt(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Zc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Dt(t),c=N(t,{variant:"solid",color:"primary"}),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],d=m=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.label),s(m.code));return()=>o({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},a(l({name:"country",options:u,Option:d,getOptionValue:({code:b})=>b,getOptionLabel:({label:b})=>b,label:"Select a country..."})),r(c({type:"submit"},"Submit")))},Yc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Qc=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,div:i,span:s}=e.tags,l=Dt(t),c=N(t,{variant:"solid",color:"primary"}),u="AD",d=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],m=b=>i({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(b.label),s(b.code));return()=>o({onsubmit:p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.currentTarget));alert(JSON.stringify(g))}},a(l({name:"country",options:d,Option:m,defaultOption:d.find(({code:p})=>p==u),getOptionValue:({code:p})=>p,getOptionLabel:({label:p})=>p,label:"Select a country..."})),r(c({type:"submit"},"Submit")))},tl=`import { Context } from "@grucloud/bau-ui/context";
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
`,el=t=>{const{bau:e,css:n,window:o}=t,{form:a,article:r,footer:i,div:s,span:l}=e.tags,c="country",u=Dt(t),d=N(t,{variant:"solid",color:"primary"}),m=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=p=>s({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(p.label),l(p.code));return()=>{const p=f=>{f.preventDefault();const x=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(x))},g=({code:f})=>f,h=f=>{const x=new URLSearchParams(o.location.search);x.delete(c),x.append(c,g(f)),o.history.replaceState("","",`?${x.toString()}${o.location.hash}`)},y=new URLSearchParams(o.location.search);return a({onsubmit:p},r(u({name:c,options:m,Option:b,defaultOption:m.find(({code:f})=>f==y.get(c)),getOptionValue:g,getOptionLabel:({label:f})=>f,label:"Select a country...",onSelect:h})),i(d({type:"submit"},"Submit")))}},nl=`import { Context } from "@grucloud/bau-ui/context";
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
`,ol=t=>{const{bau:e}=t,{form:n,article:o,footer:a,span:r}=e.tags,i=Dt(t),s=N(t,{variant:"solid",color:"primary"}),l=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],c=u=>r({},u);return()=>n({onsubmit:d=>{d.preventDefault();const m=Object.fromEntries(new FormData(d.currentTarget));alert(JSON.stringify(m))}},o(i({name:"region",options:l,Option:c,label:"Select a region",getOptionValue:d=>d,getOptionLabel:d=>d,required:!0,oninvalid:d=>{d.target.setCustomValidity("Please select an AWS region")}})),a(s({type:"submit"},"Submit")))},al=`import { Context } from "@grucloud/bau-ui/context";
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
`,rl=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:r,span:i,div:s}=e.tags,l=N(t,{variant:"outline"}),c=N(t,{variant:"solid",color:"primary"}),u=Dt(t),d=m=>s({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(m.flag),i(m.name.common));return()=>{const m=e.state([]),b=e.state(!1),p=e.state("");async function g({url:f,transform:x=S=>S}){try{b.val=!0;const S=await fetch(f,{});if(S.ok){const k=await S.json();m.val=x(k)}else p.val=S.statusText}catch(S){p.val=S.message}finally{b.val=!1}}const h=()=>g({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:f=>f.sort((x,S)=>x.name.common.localeCompare(S.name.common))});return h(),o({onsubmit:f=>{f.preventDefault();const x=Object.fromEntries(new FormData(f.currentTarget));alert(JSON.stringify(x))}},a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>u({name:"country",options:m.val,Option:d,getOptionValue:({name:f})=>f.common,getOptionLabel:({name:f})=>f.common,label:"Country",id:"country",loading:b.val,required:!0}),l({onclick:()=>h()},"Reload")),r(c({type:"submit"},"Submit")))}},sl=`import { Context } from "@grucloud/bau-ui/context";
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
`,il={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Yc,createComponent:Zc},{title:"Default Option",description:"Select with a default option",code:tl,createComponent:Qc},{title:"State in URL",description:"Select with state in URL",code:nl,createComponent:el},{title:"Select AWS region",description:"Select the AWS region",code:al,createComponent:ol},{title:"Loading Indicator",description:"Select with a loading indicator",code:sl,createComponent:rl}],gridItem:Rn},cl=t=>{const e=F(t);return()=>e(il)};function Ce(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,r=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["select-native",u,l,c,r,e==null?void 0:e.class,d==null?void 0:d.class]},m)}}const jn=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=Ce(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a({...i,"aria-label":"select-country"},r.map(({label:s,phone:l})=>o({value:l},s)))},ll=t=>{const{bau:e}=t,{option:n,form:o,footer:a}=e.tags,r=N(t,{variant:"outline",color:"primary"}),i=Ce(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>o({onsubmit:c=>{c.preventDefault();const u=Object.fromEntries(new FormData(c.currentTarget));alert(JSON.stringify(u))}},i({name:"my-select"},n({value:""},"--Please choose a phone code--"),s.map(({label:c,phone:u})=>n({value:u},c))),a(r({type:"submit"},"Submit")))},ul=`import { Context } from "@grucloud/bau-ui/context";
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
`,dl=t=>{const{bau:e,window:n}=t,{option:o,form:a,footer:r}=e.tags,i=N(t,{variant:"outline",color:"primary"}),s=Ce(t),l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c="my-select";return()=>{const u=g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))},d=g=>{const h=new URLSearchParams(n.location.search);h.delete(c),h.append(c,g.target.value),n.history.replaceState("","",`?${h.toString()}${n.location.hash}`)},b=new URLSearchParams(n.location.search).get(c),p=l.map(({label:g,code:h})=>o({value:h,selected:h==b},g));return a({onsubmit:u},s({name:c,oninput:d},o({value:""},"--Please choose a phone code--"),p),r(i({type:"submit"},"Submit")))}},ml=`import { Context } from "@grucloud/bau-ui/context";
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
`,pl={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:ul,createComponent:ll},{title:"State URL",description:"A selectNative with state in URL",code:ml,createComponent:dl}],gridItem:jn},bl=t=>{const e=F(t);return()=>e(pl)},gl=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,r=Et(t),i=()=>a({class:n`
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
`,fl=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,r=Et(t),i=()=>a({class:n`
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
`,yl=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:r,tr:i,td:s}=e.tags,l=Et(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(r(new Array(8).fill("").map(()=>i(s(l({class:n`
                  width: 5rem;
                `})),s(l()),s(l()),s(l()),s(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},xl=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,wl=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:r,article:i}=e.tags,s=n`
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
  `,l=Et(t,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),c=Et(t);function u({columnsSize:d=4}){return o({class:s},a(new Array(d).fill("").map(()=>l(r("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Sl=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Cl={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:hl,createComponent:gl},{title:"List",description:"A list skeleton.",code:vl,createComponent:fl},{title:"Table",description:"A table skeleton.",code:xl,createComponent:yl},{title:"Tabs",description:"A tabs skeleton.",code:Sl,createComponent:wl}],variantColorTableDisable:!0,variantSizeDisable:!0},kl=t=>{const e=F(t);return()=>e(Cl)};function At(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${(()=>nt.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...m},...b]=V(l);return a({...m,type:"range",class:["slider",d,u,c,i,e==null?void 0:e.class,m.class]},...b)}}const _n=t=>{const{bau:e}=t,n=e.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=At(t);return r=>a({"aria-label":"slider",...r,oninput:o})},El=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:r,footer:i}=e.tags,s=At(t),l=N(t,{variant:"solid",color:"primary"});return()=>n({onsubmit:u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.currentTarget));alert(JSON.stringify(d))}},o(a("Slider with step, min and max",r,s({name:"slider-simple",step:20,min:-100,max:100}))),i(l({type:"submit"},"Submit")))},Tl=`import { Context } from "@grucloud/bau-ui/context";
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
`,Dl=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:r,footer:i}=e.tags,s=At(t),l=N(t,{variant:"solid",color:"primary"});return()=>{const c=e.state(0);return n({onsubmit:m=>{m.preventDefault();const b=Object.fromEntries(new FormData(m.currentTarget));alert(JSON.stringify(b))}},o(a("Slider Value:",c,r,s({oninput:m=>{c.val=m==null?void 0:m.target.value},name:"slider-simple",step:20,min:-100,max:100}))),i(l({type:"submit"},"Submit")))}},Al=`import { Context } from "@grucloud/bau-ui/context";
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
`,Bl=t=>{const{bau:e,css:n}=t,{article:o,footer:a,form:r,label:i,datalist:s,br:l,option:c}=e.tags,u=At(t),d=N(t,{variant:"solid",color:"primary"});return()=>r({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},o(i({for:"temp"},"Choose a comfortable temperature"),l,u({class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(b=>c({value:Number(b),label:b})))),a(d({type:"submit"},"Submit")))},Nl=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ol=t=>{const{bau:e,css:n}=t,{article:o,footer:a,form:r,label:i,datalist:s,br:l,option:c}=e.tags,u=At(t),d=N(t,{variant:"solid",color:"primary"});return()=>r({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},o({class:n`
            display: flex;
          `},i({for:"temp-vertical"},"Choose a comfortable temperature"),l,u({id:"temp-vertical",name:"temp",list:"markers-vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(b=>c({value:Number(b),label:b})))),a(d({type:"submit"},"Submit")))},Ml=`import { Context } from "@grucloud/bau-ui/context";
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
`,Il=t=>{const{bau:e}=t,{form:n,article:o,label:a,br:r,footer:i}=e.tags,s=At(t),l=N(t,{variant:"solid",color:"primary"}),c="my-slider";return()=>{const u=new URLSearchParams(window.location.search).get(c);return n({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))}},o(a("Slider Value:",r,s({oninput:b=>{const p=new URLSearchParams(window.location.search);p.delete(c),p.append(c,b.target.value),window.history.replaceState("","",`?${p.toString()}${window.location.hash}`)},defaultValue:u,name:c,step:20,min:-100,max:100}))),i(l({type:"submit"},"Submit")))}},Ll=`import { Context } from "@grucloud/bau-ui/context";
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
`,$l={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Uncontrolled slider",description:"A uncontrolled slider.",code:Tl,createComponent:El},{title:"Controlled slider",description:"A controlled slider.",code:Al,createComponent:Dl},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Nl,createComponent:Bl},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Ml,createComponent:Ol},{title:"State URL",description:"State stored in the URL",code:Ll,createComponent:Il}],gridItem:_n},Pl=t=>{const e=F(t);return()=>e($l)},Un=(t,e)=>{const n=pt(t,e);return o=>n({...o})},zl=t=>{const{bau:e}=t,{section:n}=e.tags,o=N(t,{variant:"solid",color:"primary"}),a=pt(t,{size:"lg"});return()=>{const r=e.state(!0);return n(o({onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),a({visibility:r}))}},Rl=`import spinner from "@grucloud/bau-ui/spinner";
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
`,jl={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Rl,createComponent:zl}],gridItem:Un},_l=t=>{const e=F(t);return()=>e(jl)},Ul=()=>nt.map(t=>"").join(`
`),Gn=(t,e)=>(n,o)=>{const a=new URLSearchParams(t.window.location.search);return a.delete(e),a.append(e,n),o&&Object.entries(o).map(([r,i])=>(a.delete(r),a.append(r,i))),`?${a.toString()}`};function Fn(t,e={}){const{bau:n,css:o,window:a}=t,{div:r,ul:i,li:s,span:l,section:c}=n.tags,u=o`
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
  `;return function(...m){let[{color:b,variant:p="plain",size:g,stepperDefs:h=[],stepperName:y,activeStepIndex:f=n.state(0),...x},...S]=V(m);const k=n.state(h.map(($,j)=>({...$,index:j}))),D=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:($,j,U)=>{$.apply(j,U);const z=U[2]??"";console.log("stepper pushState ",z),["?","#"].includes(z[0])&&I()}});const A=n.derive(()=>k.val[f.val]),B=$=>{const{Header:j,disabled:U,name:z,index:P}=$;return s({class:()=>[A.val.name==z&&"active",f.val<P&&"not-completed",f.val>P&&"completed",U&&"disabled"]},l({class:"step-number"},P+1),l({class:"step-label"},()=>j($)))},O=$=>h.findIndex(({name:j})=>j==$.name),I=()=>{const j=new URLSearchParams(a.location.search).get(y)??h[0].name,U=Math.max(h.findIndex(({name:z})=>z==j),0);U<f.val&&(console.log("remove last step"),D.val.pop()),D.val.some(({name:z})=>j==z)||(console.log("add new step"),D.val.push(h[U])),f.val=U};return I(),r({bauMounted:({element:$})=>{a.addEventListener("popstate",I)},bauUnmounted:()=>{a.removeEventListener("popstate",I)},class:["stepper",p,g,b,u,e==null?void 0:e.class,x.class]},n.loop(k,i(),B),n.loop(D,c(),$=>r({class:()=>["content",$.name==A.val.name&&"visible"]},$.Content({nextStep:h[O($)+1],previousStep:h[O($)-1]}))))}}const je="my-wizard",Gl=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:r,section:i,a:s,ul:l,li:c}=e.tags,u=ut(t),d=bt(t),m=Fn(t),b=Gn(t,je),p=N(t,{variant:"outline",color:"primary"}),g=N(t,{variant:"solid",color:"primary"});return()=>{const h=({nextStep:x})=>S=>{S.preventDefault();const{organization:k}=S.target.elements;n.history.pushState("","",b(x.name,{organization:k.value}))},y=x=>{var A;x.preventDefault();const{organization:S}=(A=n.document.forms)==null?void 0:A.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${S.value}, choice:${D}`)};return i(m({stepperDefs:[{name:"step1",Header:()=>"Step 1",Content:({nextStep:x})=>d({onsubmit:h({nextStep:x}),id:"formStep1"},r("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(g({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:x,previousStep:S})=>d(l(c(s({href:b(x.name,{choice:"choice1"})},"Choice 1")),c(s({href:b(x.name,{choice:"choice2"})},"Choice 2"))),o(p({href:b(S.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:x})=>d({onsubmit:y},a("My stepper 3 Content"),o(p({href:b(x.name)},"Previous: Step 2"),g({type:"submit"},"Save")))}],stepperName:je}))}},Fl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,_e="stepper-vertical",Hl=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:r,label:i,section:s,a:l,ul:c,li:u}=e.tags,d=ut(t),m=bt(t),b=Fn(t,{class:o`
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
    `}),p=Gn(t,_e),g=N(t,{variant:"outline",color:"primary"}),h=N(t,{variant:"solid",color:"primary"});return()=>{const y=({nextStep:S})=>k=>{k.preventDefault();const{organization:D}=k.target.elements;n.history.pushState("","",p(S.name,{organization:D.value}))},f=S=>{var B;S.preventDefault();const{organization:k}=(B=n.document.forms)==null?void 0:B.formStep1.elements,A=new URLSearchParams(n.location.search).get("choice");alert(`organization ${k.value}, choice:${A}`)};return s(b({stepperDefs:[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>m({onsubmit:y({nextStep:S}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:k})=>m(c(u(l({href:p(S.name,{choice:"choice1"})},"Choice 1")),u(l({href:p(S.name,{choice:"choice2"})},"Choice 2"))),a(g({href:p(k.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>m({onsubmit:f},r("My stepper 3 Content"),a(g({href:p(S.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}],stepperName:_e}))}},Vl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Jl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:Fl,createComponent:Gl},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:Vl,createComponent:Hl}]},ql=t=>{const e=F(t);return()=>e(Jl)},Wl=()=>nt.map(t=>`
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
`);function Yt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...m]=V(s);return a({...d,class:["switch",r,u,c,l,e==null?void 0:e.class,d.class],type:"checkbox"},...m)}}const Hn=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:r}=n.tags,i=Yt(t,e);return s=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},r("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),r("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},Kl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:r,article:i}=e.tags,s=Yt(t,{variant:"outline",color:"primary"}),l=N(t,{variant:"outline",color:"primary"}),c=n`
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
  `;return()=>a({onsubmit:d=>{d.preventDefault();const m=Object.fromEntries(new FormData(d.currentTarget));alert(JSON.stringify(m))},class:c},i(r("My shinny switch",s({name:"my-shinny-switch"})),r("Switch with default",s({name:"my-switch--default",defaultChecked:"on"}))),o(l({type:"submit"},"Submit")))},Xl=`import { Context } from "@grucloud/bau-ui/context";
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
`,Zl=t=>{const{bau:e,css:n}=t,{footer:o,form:a,label:r,article:i}=e.tags,s=Yt(t,{variant:"outline",color:"primary"}),l=N(t,{variant:"outline",color:"primary"}),c=n`
    & label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;return()=>{const u=e.state("on");return a({onsubmit:b=>{b.preventDefault();const p=Object.fromEntries(new FormData(b.currentTarget));alert(JSON.stringify(p))},class:c},i(r("My controlled switch",s({name:"my-shinny-switch",onchange:b=>{u.val=b.target.value},checked:u}))),o(l({type:"submit"},"Submit")))}},Yl=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ql=t=>{const{bau:e,css:n,window:o}=t,{footer:a,form:r,label:i,article:s}=e.tags,l="my-shinny-switch",c=Yt(t,{variant:"outline",color:"primary"}),u=N(t,{variant:"outline",color:"primary"}),d=n`
    & label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;return()=>{const m=new URLSearchParams(o.location.search);return r({onsubmit:g=>{g.preventDefault();const h=Object.fromEntries(new FormData(g.currentTarget));alert(JSON.stringify(h))},class:d},s(i("My switch",c({name:l,onchange:g=>{const h=new URLSearchParams(o.location.search);h.delete(g.target.name),h.append(g.target.name,g.target.checked),o.history.replaceState("","",`?${h.toString()}${o.location.hash}`)},defaultChecked:m.get(l)=="true"}))),a(u({type:"submit"},"Submit")))}},tu=`import { Context } from "@grucloud/bau-ui/context";
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
`,eu={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Uncontrolled Switch",description:"A uncontrolled switch.",code:Xl,createComponent:Kl},{title:"Controlled Switch",description:"A controlled switch.",code:Yl,createComponent:Zl},{title:"State in URL",description:"A switch with state in URL",code:tu,createComponent:Ql}],gridItem:Hn},nu=t=>{const e=F(t);return()=>e(eu)},ou=()=>nt.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function _t(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:r}=e,{div:i,ul:s,li:l,a:c}=n.tags,u=o`
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
  `;return function(...m){let[{size:b=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",tabsKey:h="tabs",...y},...f]=V(m);const x=n.state(r),S=I=>x.val.find($=>$.name==I),k=n.state(r[0]),D=()=>{var j,U;const $=new URLSearchParams(a.location.search).get(h)??r[0].name;if($!=k.val.name){const z=S($);(j=k.val.exit)==null||j.call(),k.val=z,(U=z==null?void 0:z.enter)==null||U.call()}};D(),a.history.pushState=new Proxy(a.history.pushState,{apply:(I,$,j)=>{I.apply($,j);const U=j[2]??"";["?","#"].includes(U[0])&&D()}});const A=I=>{const $=new URLSearchParams(a.location.search);return $.delete(h),$.append(h,I),`?${$.toString()}`},B=I=>{const{Header:$,disabled:j,name:U}=I;return l({class:()=>[k.val.name==U&&"active",j&&"disabled"]},c({href:A(U)},$(I)))},O=i({class:["tabs",p,b,g,u,e==null?void 0:e.class,y.class],bauMounted:({element:I})=>{a.addEventListener("popstate",D)},bauUnmounted:()=>{a.removeEventListener("popstate",D)}},n.loop(x,s(),B),n.bind({deps:[k],render:()=>({Content:I})=>I?I(y):""}));return O.addEventListener("tab.add",I=>{var j;const{tab:$}=I.detail;(j=$.enter)==null||j.call(),x.val.push($)},!1),O.addEventListener("tab.remove",I=>{var j;const $=x.val.findIndex(U=>U.name==I.detail.tabName);$>0&&((j=x.val[$].exit)==null||j.call(),x.val.splice($,1))},!1),O}}const au=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,r=_t(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>r({})},ru=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,su=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,r=_t(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>r({tabsKey:"my-tab"})},iu=`import tabs from "@grucloud/bau-ui/tabs";
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
`,mu={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ru,createComponent:au},{title:"Extended Tabs",description:"An extended tabs.",code:iu,createComponent:su},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:lu,createComponent:cu},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:du,createComponent:uu}]},pu=t=>{const e=F(t);return()=>e(mu)};function Ut(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:r}=n.tags;a`
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
  `;return function(...l){let[{...c},...u]=V(l);return r({...c,class:["table-container",i,e==null?void 0:e.class,c==null?void 0:c.class]},...u)}}const bu=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags;function d(h,y,f,x,S){return{name:h,calories:y,fat:f,carbs:x,protein:S}}const m=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],b=({name:h,calories:y})=>i(r(h),r({class:n`
            text-align: right;
          `},y)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ut(t,{class:n`
      max-width: 650px;
    `});return()=>o(g(s(u("Basic Table"),p(),c(m.map(b)))))},gu=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Nt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const hu=[Nt("Frozen yoghurt",159,6,24,4),Nt("Ice cream sandwich",237,9,37,4.3),Nt("Eclair",262,16,24,6),Nt("Cupcake",305,3.7,67,4.3),Nt("Gingerbread",356,16,49,3.9)],fu=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags,d=({name:p,calories:g})=>i(r(p),r({class:n`
            text-align: right;
          `},g)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ut(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(s(u("Table Dense"),m(),c(hu.map(d)))))},vu=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ot(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const yu=[Ot("Frozen yoghurt",159,6,24,4),Ot("Ice cream sandwich",237,9,37,4.3),Ot("Eclair",262,16,24,6),Ot("Cupcake",305,3.7,67,4.3),Ot("Gingerbread",356,16,49,3.9)],xu=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=e.tags,d=({name:p,calories:g})=>i(r(p),r({class:n`
            text-align: right;
          `},g)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ut(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(s(u("Table Zebra"),m(),c(yu.map(d)))))},wu=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Su={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:gu,createComponent:bu},{title:"Dense",description:"A dense table.",code:vu,createComponent:fu},{title:"Zebra",description:"A zebra table.",code:wu,createComponent:xu}]},Cu=t=>{const e=F(t);return()=>e(Su)},ku=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:r,section:i,article:s}=e.tags,l=cn(t),c=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),r({id:"h3-1-1"},"h3 1 1"),r({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),r({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},Eu=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Tu={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Eu,createComponent:ku}]},Du=t=>{const e=F(t);return()=>e(Tu)};function Jn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=ye(t),i=N(t),s=pt(t),l=o`
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
  `,c=({label:p,icon:g,...h})=>i({"aria-label":p,title:p,...h},g),u=({count:p,totalCount:g,page:h,rowsPerPage:y})=>a({class:"pages-numbers"},Number(h-1)*Number(y)+(p>0?1:0),"-",Math.min(h*y,g)," of ",g),d=({count:p,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(p>0?1:0),"-",g*h),m=p=>p<=1,b=(p,g,h)=>p>=Math.ceil(g/h);return function(...g){let[{size:h=e.size??"md",variant:y=e.variant??"outline",color:f=e.color??"neutral",count:x=0,totalCount:S=0,page:k=1,rowsPerPage:D=50,onPageChange:A,isLoading:B=!1,disableFirst:O=()=>m(k),disablePrevious:I=()=>m(k),disableNext:$=()=>b(k,S,D),disableLast:j=()=>b(k,S,D),...U},...z]=V(g);const P=Math.max(0,Math.ceil(S/D)),C=A({page:1}),v=A({page:k-1}),w=A({page:k+1}),E=A({page:P}),T=[{label:"First",icon:"⟪",onclick:C,disabled:O()},{label:"Previous",icon:"⟨",onclick:v,disabled:I()},{label:"Next",icon:"⟩",onclick:w,disabled:$()},{label:"Last",icon:"⟫",onclick:E,disabled:j()}];return a({...U,class:["table-pagination",l,B&&"disabled",e==null?void 0:e.class,U==null?void 0:U.class]},s({class:"spinner",visibility:B,size:"md"}),S>0?u({count:x,totalCount:S,page:k,maxPages:P,rowsPerPage:D}):d({count:x,page:k,maxPages:P,rowsPerPage:D}),r({variant:y,color:f},T.map(G=>c({...G,variant:y,color:f}))))}}const Au=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Bu=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:r,table:i,thead:s,tbody:l}=e.tags,c=Au(45),u=({name:p,email:g})=>r(a(p),a(g)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),m=Jn(t),b=Ut(t,{class:n`
      max-width: 650px;
    `});return()=>{const p=e.state(c),g=e.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),h=e.derive(()=>p.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),y=({page:f})=>x=>{g.val.page=f};return b(i(d(),()=>l(h.val.map(u))),()=>m({...g.val,onPageChange:y}))}},Nu=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:r,table:i,thead:s,tbody:l,div:c}=e.tags,u=e.state(!1),d=e.state([]),m=e.state(""),b=e.derive(()=>d.val.length),p=e.state(1),g=e.state(10),h=e.derive(()=>d.val),y=O=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(O).toString()}`,f=({page:O})=>I=>{p.val=O,x(y({page:O,per_page:g.val}))};x(y({page:1,per_page:g.val}));async function x(O){try{u.val=!0;const I=await fetch(O,{});if(I.ok){const $=await I.json();d.val=$;return}throw I}catch(I){m.val=I.message}finally{u.val=!1}}const S=({name:O,description:I,stargazers_count:$})=>r(a(O),a(I),a({class:n`
            text-align: right;
          `},$)),k=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),D=Jn(t),A=Ut(t,{class:n`
      min-width: 650px;
    `}),B=({message:O})=>c(O);return()=>A(()=>D({rowsPerPage:g.val,page:p.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:f,disableNext:()=>!1}),i(k(),()=>m.val&&B({message:m.val}),()=>l(h.val.map(S))))},Ou=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:r,h2:i,tr:s}=e.tags,l=Bu(t),c=Nu(t),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(s("Table Pagination")),r("Asynchronous Pagination"),u(c()),r("Simple Pagination"),u(l()))};function gt(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{button:r}=n.tags;a`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",onclick:m,...b},...p]=V(l);return r({type:"button",...b,onclick:g=>{const{target:h}=g,y=h.getAttribute("aria-pressed");h.setAttribute("aria-pressed",y=="true"?"false":"true"),m&&m(g)},class:["toggle",c,d,u,i,e==null?void 0:e.class,b==null?void 0:b.class]},p)}}const qn=(t,e)=>{const{bau:n}=t,o=gt(t,e);return a=>{const r=n.state(!1);return o({...a,selected:r,onclick:()=>r.val=!r.val},"Toggle Me")}},Mu=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=gt(t,{variant:"solid",color:"primary"}),i=N(t,{variant:"outline",color:"primary"});return()=>{const s=e.state(!1);return n({onsubmit:c=>{c.preventDefault(),alert(s.val)}},o(r({name:"my-toogle","aria-pressed":s,onclick:()=>s.val=!s.val},"Toggle Me")),a(i({type:"submit"},"Submit")))}},Iu=`import { Context } from "@grucloud/bau-ui/context";
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
`,Lu=t=>{const{bau:e,window:n}=t,{document:o}=n,{form:a,article:r,footer:i}=e.tags,s="my-toogle-uncontrolled",l=gt(t,{variant:"solid",color:"primary"}),c=N(t,{variant:"outline",color:"primary"});return()=>a({onsubmit:d=>{d.preventDefault();const m=o.getElementsByName(s)[0];alert(m.getAttribute("aria-pressed"))}},r(l({name:s},"Toggle Me")),i(c({type:"submit"},"Submit")))},$u=`import { Context } from "@grucloud/bau-ui/context";
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
`,Pu=t=>{const{bau:e,window:n}=t,{history:o}=n,{form:a,article:r,footer:i}=e.tags,s=gt(t,{variant:"solid",color:"primary"}),l=N(t,{variant:"outline",color:"primary"});return()=>{const c="toggle-url",u=new URLSearchParams(n.location.search).get(c)=="pressed"?"true":"false";return a({onsubmit:b=>{b.preventDefault();const p=document.getElementsByName(c)[0];alert(p.getAttribute("aria-pressed"))}},r(s({name:c,"aria-pressed":u,onclick:b=>{const p=new URLSearchParams(n.location.search);p.delete(c),b.target.getAttribute("aria-pressed")=="true"&&p.append(c,"pressed"),o.replaceState("","",`?${p.toString()}${n.location.hash}`)}},"Toggle Me")),i(l({type:"submit"},"Submit")))}},zu=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ru={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Controlled Toggle",description:"A controlled toggle.",code:Iu,createComponent:Mu},{title:"Uncontrolled Toggle",description:"A uncontrolled toggle.",code:$u,createComponent:Lu},{title:"State in URL",description:"Toggle with state stored in the URL.",code:zu,createComponent:Pu}],gridItem:qn},ju=t=>{const e=F(t);return()=>e(Ru)},_u=()=>nt.map(t=>`
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
`);function Qt(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:m=()=>{},...b},...p]=V(s);const g=new Set,h=y=>{const{value:f}=y.target;d?(g.clear(),g.add(f)):g.has(f)?g.delete(f):g.add(f),m({event:y,values:[...g]})};return a({...b,class:["toggle-group",l,u,c,r,e==null?void 0:e.class,b==null?void 0:b.class],onclick:h},...p)}}const Wn=(t,e)=>{const{bau:n}=t,o=Qt(t,e),a=gt(t,e);return r=>{const i=n.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...r,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:u})=>()=>a({...r,value:u,selected:i.val.includes(u),"area-label":c},c)))}},Uu=t=>{const{bau:e}=t,{form:n,footer:o,article:a}=e.tags,r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i="primary",s="solid",l=gt(t,{color:i,variant:s}),c=Qt(t,{color:i,variant:s}),u=N(t,{variant:"outline",color:"primary"});return()=>{const d=e.state([""]);return n({onsubmit:p=>{var y;p.preventDefault();const h=(y=p.currentTarget.querySelector("button[selected=true]"))==null?void 0:y.name;alert(h)}},a(c({exclusive:!0,onChange:({values:p})=>{d.val=p}},r.map(({label:p,value:g})=>()=>l({value:g,name:p,selected:d.val.includes(g)},p)))),o(u({type:"submit"},"Submit")))}},Gu=`import { Context } from "@grucloud/bau-ui/context";
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
`,Fu=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i="primary",s="solid",l=gt(t,{variant:s,color:i}),c=Qt(t,{variant:s,color:i}),u=N(t,{variant:"outline",color:"primary"});return()=>{const d=e.state([""]);return n({onsubmit:p=>{p.preventDefault();const h=[...p.currentTarget.querySelectorAll("button[selected=true]")].map(({name:y})=>y);alert(JSON.stringify(h))}},o(c({onChange:({values:p})=>{d.val=p}},r.map(({label:p,value:g})=>()=>l({value:g,name:p,selected:d.val.includes(g)},p)))),a(u({type:"submit"},"Submit")))}},Hu=`import { Context } from "@grucloud/bau-ui/context";
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
`,Vu=t=>{const{bau:e,window:n}=t,{form:o,footer:a,article:r}=e.tags,i="my-toggle-group",s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],l="primary",c="solid",u=gt(t,{color:l,variant:c}),d=Qt(t,{color:l,variant:c}),m=N(t,{variant:"outline",color:"primary"});return()=>{const b=new URLSearchParams(n.location.search),p=e.state([...b.getAll(i)]);return o({onsubmit:y=>{y.preventDefault();const f=new URLSearchParams(n.location.search);alert(f.getAll(i))}},r(d({name:i,exclusive:!0,onChange:({values:y})=>{p.val=y;const f=new URLSearchParams(n.location.search);f.delete(i),y.forEach(x=>f.append(i,x)),n.history.replaceState("","",`?${f.toString()}${n.location.hash}`)}},s.map(({label:y,value:f})=>()=>u({value:f,name:y,selected:p.val.includes(f)},y)))),a(m({type:"submit"},"Submit")))}},Ju=`import { Context } from "@grucloud/bau-ui/context";
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
`,qu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Gu,createComponent:Uu},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Hu,createComponent:Fu},{title:"State in URL",description:"A toggleGroup with state in the URL.",code:Ju,createComponent:Vu}],gridItem:Wn},Wu=t=>{const e=F(t);return()=>e(qu)};function ke(t,e={}){const{bau:n,css:o,window:a}=t,{div:r}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=e.size??"md",variant:m=e.variant??"outline",color:b=e.color??"neutral",...p},...g]=V(l);const h=r({class:["container",...u.split("-")]},r({class:["content",b,m,d],role:"tooltip"},c)),y=A=>`move-to-${A}`,f=(A,B,O)=>{if(A()){const I=y(B);h.classList.add(I),h.classList.add(B),h.classList.remove(O)}},x=(A,B)=>{const O=y(A);h.classList.contains(O)&&(h.classList.remove(O),h.classList.add(B),h.classList.remove(A))},S=A=>{const B=h.getBoundingClientRect();f(()=>B.x<0,"right","left"),f(()=>B.x+B.width>a.innerWidth,"left","right"),f(()=>B.y<0,"bottom","top"),f(()=>B.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},k=A=>{h.classList.remove("visible"),x("right","left"),x("left","right"),x("bottom","top"),x("top","bottom")};return r({...p,class:["tooltip",i,e==null?void 0:e.class,p==null?void 0:p.class],bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",k)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",k)}},...g,h)}}const Kn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:r}=n.tags,i=N(t),s=ke(t,e),l=()=>o(a("A ",r("tooltip")," can be any component"));return c=>s({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},Ku=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,r=N(t),i=ke(t),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:s()},r("tooltip"))},Xu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Zu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:r,section:i}=e.tags,s=Pt(t,{variant:"outline",color:"primary"}),l=ke(t),c=()=>o(a("A ",r("tooltip")," can be any component")),u=()=>i({class:n`
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
          `},l({side:"bottom-start",titleEl:c()},s("bottom start")),l({side:"bottom-centered",titleEl:c()},s("bottom centered")),l({side:"bottom-end",titleEl:c()},s("bottom end"))));return()=>u()},Yu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Qu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Xu,createComponent:Ku},{title:"Grid",description:"Various tooltip position",code:Yu,createComponent:Zu}],gridItem:Kn},td=t=>{const e=F(t);return()=>e(Qu)},Xn=(t,e)=>{const n=ce(t,e);return o=>n(o)},ed=t=>{const{bau:e}=t,{section:n}=e.tags,o=ce(t);return()=>n(o({}))},nd=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => {
    return section(ThemeSwitch({}));
  };
};
`,od={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:nd,createComponent:ed}],gridItem:Xn},ad=t=>{const e=F(t);return()=>e(od)},Zn=({parent:t,grandParent:e})=>n=>{const{children:o=[],...a}=n,r={...a};return r.children=o==null?void 0:o.map(Zn({parent:n,grandParent:t})),t&&(t.parent=e),r.parent=t,r},rd=({css:t,createGlobalStyles:e})=>(e`
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
  `});function Ee(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:r}=e,{ul:i,li:s,nav:l,div:c}=n.tags,u=rd({css:o,createGlobalStyles:a}),d=he(t),m=({depth:b=1,maxDepth:p,parent:g,color:h,variant:y,size:f})=>x=>{const{children:S,expanded:k}=x,D=n.state(!k),A=()=>c({class:o`
              cursor: ${S?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:O=>{S&&(D.val=!D.val)}},r({item:x,parent:g,depth:b})),B=()=>i({class:[h,f]},S.map(m({depth:b+1,maxDepth:p,parent:x})));return s(S.length?d({expanded:k,Header:A,Content:S&&b<p&&B}):A())};return function({tree:p,maxDepth:g=1/0,size:h=e.size??"md",variant:y=e.variant??"outline",color:f=e.color??"neutral",...x}){return l({class:[u.nav,h,y,f,e==null?void 0:e.class,x.class]},i(m({maxDepth:g,color:f,variant:y,size:h})(Zn({})({...p}))))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o,span:a}=n.tags,r={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Ee(t,{renderMenuItem:({item:{data:{name:l,href:c}}})=>c?o({href:c},l):a(l),...e});return l=>s({...l,tree:r})},sd=t=>{const{bau:e}=t,{a:n,span:o}=e.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Ee(t,{renderMenuItem:({item:{data:{name:s,href:l}}})=>l?n({href:l},s):o(s)});return()=>i({tree:a})},id=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,cd=t=>{const{bau:e,css:n,window:o}=t,{form:a,label:r,article:i,footer:s}=e.tags,l=wt(t,{color:"neutral",variant:"outline"}),c=N(t,{variant:"solid",color:"danger"}),u=e.state(0),d=S=>{S.preventDefault();const k=Object.fromEntries(new FormData(S.currentTarget));alert(JSON.stringify(k))},m={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},b=({id:S,name:k})=>S??k,p=S=>o.document.getElementById(b(S)),g=({onNode:S})=>k=>{S(k);const{children:D=[]}=k;D.map(g({onNode:S}))},h=({parent:S})=>{if(S){const{children:k}=S,D=p(S.data);if(D){const A=k.every(B=>{const{checked:O,indeterminate:I}=p(B.data);return!O&&!I});D.indeterminate=!A&&k.some(B=>!p(B.data).checked),D.checked=k.every(B=>p(B.data).checked)}h({parent:S.parent})}},y=({item:S,parent:k})=>D=>{h({parent:k}),g({onNode:O=>{const I=p(O.data);I&&(I.checked=D.target.checked,I.indeterminate=!1)}})(S);const B=D.currentTarget.closest("form").querySelectorAll('input[type="checkbox"][data-type="resources"]:checked');u.val=B.length,D.stopPropagation()},x=Ee(t,{renderMenuItem:({item:S,parent:k})=>{const{name:D,id:A}=S.data,B=b(S.data);return r({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:O=>O.stopPropagation()},l({onclick:y({item:S,parent:k}),name:B,id:B,"data-type":A?"resources":"group"}),D)}});return()=>a({onsubmit:d},i(x({tree:m})),s(c({type:"submit"},()=>`Delete ${u.val} Resource(s)`)))},ld=`import { Context } from "@grucloud/bau-ui/context";
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
`,ud={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:id,createComponent:sd},{title:"Checkable",description:"A treeview with checkboxes.",code:ld,createComponent:cd}],gridItem:Yn},dd=t=>{const e=F(t);return()=>e(ud)},md=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=_t(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return s=>i(s)},pd=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:r,p:i,ul:s,li:l}=e.tags,c=ln(t),u=N(t),d=[{name:"Accordion",Item:un(t)},{name:"Alert",Item:mn(t)},{name:"Autocomplete",Item:bn(t)},{name:"Avatar",Item:pn(t)},{name:"Badge",Item:hn(t)},{name:"Breadcrumbs",Item:fn(t)},{name:"Button",Item:vn(t)},{name:"Button Group",Item:yn(t)},{name:"Calendar",Item:xn(t)},{name:"Checkbox",Item:Sn(t)},{name:"Chip",Item:wn(t)},{name:"DrillDown Menu",Item:kn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:Tn(t)},{name:"Input",Item:Dn(t)},{name:"Input Search",Item:An(t)},{name:"Linear Progress",Item:In(t)},{name:"Loading Button",Item:Ln(t)},{name:"Modal",Item:Pn(t)},{name:"Radio Button",Item:zn(t)},{name:"Select",Item:Rn(t)},{name:"Select Native",Item:jn(t)},{name:"Slider",Item:_n(t)},{name:"Spinner",Item:Un(t)},{name:"Switch",Item:Hn(t)},{name:"Tabs",Item:md(t)},{name:"Theme Switch",Item:Xn(t)},{name:"Toggle",Item:qn(t)},{name:"Toggle Group",Item:Wn(t)},{name:"Tooltip",Item:Kn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
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
            `},c(m))))},bd=({context:t})=>{const e=pd(t);return[{path:"",action:n=>({title:"Bau UI",component:jo(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Fa(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Qa(t)})},{path:"alert",action:()=>({title:"Alert",component:ir(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:mr(t)})},{path:"animate",action:()=>({title:"Animate",component:vr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:zr(t)})},{path:"avatar",action:()=>({title:"Avatar",component:kr(t)})},{path:"badge",action:()=>({title:"Badge",component:Ur(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:qr(t)})},{path:"button",action:()=>({title:"Button",component:Qr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:as(t)})},{path:"calendar",action:()=>({title:"Calendar",component:us(t)})},{path:"carousel",action:()=>({title:"Carousel",component:hs(t)})},{path:"chip",action:()=>({title:"Chip",component:xs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Ns(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Ls(t)})},{path:"divider",action:()=>({title:"Divider",component:js(t)})},{path:"drawer",action:()=>({title:"Drawer",component:Hs(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Xs(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:ti(t)})},{path:"fileInput",action:()=>({title:"File Input",component:ai(t)})},{path:"form",action:()=>({title:"Form",component:mi(t)})},{path:"input",action:()=>({title:"Input",component:vi(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:Si(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:Ai(t)})},{path:"lazy",action:()=>({title:"Lazy",component:Pi(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:_i(t)})},{path:"list",action:()=>({title:"List",component:Zi(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Hi(t)})},{path:"modal",action:()=>({title:"Modal",component:ec(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:lc(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:vc(t)})},{path:"paper",action:()=>({title:"Paper",component:Cc(t)})},{path:"popover",action:()=>({title:"Popover",component:pc(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Dc(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:jc(t)})},{path:"select",action:()=>({title:"Select",component:cl(t)})},{path:"resizable",action:()=>({title:"Resizable",component:Kc(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:bl(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:kl(t)})},{path:"slider",action:()=>({title:"Slider",component:Pl(t)})},{path:"spinner",action:()=>({title:"Spinner",component:_l(t)})},{path:"stepper",action:()=>({title:"Stepper",component:ql(t)})},{path:"switch",action:()=>({title:"Switch",component:nu(t)})},{path:"table",action:()=>({title:"Table",component:Cu(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Du(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ou(t)})},{path:"tabs",action:()=>({title:"Tabs",component:pu(t)})},{path:"toggle",action:()=>({title:"Toggle",component:ju(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Wu(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:td(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ad(t)})},{path:"treeView",action:()=>({title:"Tree View",component:dd(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Go(t)})}]},gd=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),hd=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=t,i=a.state(),s=e({componentState:i});return document.getElementById("app").replaceChildren(s),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:m,Layout:b=e}=c.resolve({pathname:u});i.val=m({}),document.title=`${d}`}},fd=t=>{const{createGlobalStyles:e}=t;e`
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
  `};fo();const Qn={title:"Bau",base:"/bau/bau-ui"},ft=Eo({config:Qn}),{bau:vd}=ft;ft.states={drawerOpen:vd.state(!0)};fd(ft);ro({routes:bd({context:ft}),onLocationChange:hd({context:ft,LayoutDefault:$o(ft),config:Qn}),notFoundRoute:gd(ft)});
