(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Rn=(t,e)=>({...t,paths:[...e,t.path]}),ve=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=Rn(o,t);return n?[a,...ve({paths:[...t,o.path],routes:n})]:a}),On=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},Ln=({routes:t=[],notFoundRoute:e})=>{const n=ve({routes:t}).map(o=>({...o,regex:On(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function jn({routes:t,notFoundRoute:e,onLocationChange:n}){const o=Ln({routes:t,notFoundRoute:e});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const Vt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],zn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Hn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],se=t=>`var(--color-${t})`,Un=t=>`var(--color-${t}-lightest)`,Gn=()=>Vt.map(([t])=>`
.outline.${t} {
  border: 2px solid ${se(t)};
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${Un(t)};
}
.solid.${t} {
  background-color: ${se(t)};
}
`).join(`
`),Fn=()=>Vt.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),Vn=t=>100-t*10,Wn=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${Vn(e)}%);`).join(`
`),ie=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),Zn=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...zn.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),...Hn.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function Xn({createGlobalStyles:t},{colorPalette:e=Vt}={}){t`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${e.map(([n,o])=>Zn([n,o])).join(`
`)}
      ${Wn()}
      ${ie({})}
      ${Gn()}
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
      ${Fn()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ie({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Kn(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let Wt=t=>Object.prototype.toString.call(t??0).slice(8,-1),Yn=t=>Wt(t)=="Object",ce=t=>Wt(t)=="Function",Ut=t=>["Object","Array"].includes(Wt(t)),le=Object.getPrototypeOf,Gt=t=>mt(t)?t.val:t,mt=t=>t==null?void 0:t.__isState,qn=["splice","push","pop","shift","unshift","sort","reverse"],kt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const Z=t=>!mt(t[0])&&Yn(t[0])?t:[{},...t];function Jn(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,i=new Set,r=!1,s,c=x=>n.createElement(x),l=(x,m,g)=>{let w=s;s=m;let S=x(g);return s=w,S},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(x=>{x.bindings=x.bindings.filter(m=>{var g;return(g=m.element)==null?void 0:g.isConnected}),!x.bindings.length&&!x.computed&&a.delete(x)}),o=void 0}))},p=(x,m,g,w,S,P)=>{var I;if(r){i.add(x);return}for(let W of x.bindings){let{deps:N,element:M,renderInferred:V,render:J,renderItem:Q}=W;if(Q&&m)(I=h(M,w,(...at)=>v(Q(...at)),g,S,P)[m])==null||I.call();else{let at=V?V({element:M}):J({element:M,renderItem:Q})(...N.map(Gt));at!==M&&M.replaceWith(W.element=v(at))}}E(x),u()},d=(x,m,g=[])=>({get(w,S,P){var I;if(s==null||s.add(x),S==="_isProxy")return!0;if(!((I=w[S])!=null&&I._isProxy)&&!mt(w[S])&&Ut(w[S]))w[S]=new Proxy(w[S],d(x,m,[...g,S]));else if(qn.includes(S)){let W=w[S];return(...N)=>{let M=W.apply(w,N);return p(x,S,M,N,m,g),M}}return Reflect.get(w,S,P)},set(w,S,P,I){let W=Reflect.set(w,S,P,I);return p(x,"setItem",W,{prop:S,value:P},m,[...g,S]),W}}),b=(x,m)=>new Proxy(m,d(x,m)),h=(x,m,g,w,S,P)=>{let I=()=>x.replaceChildren(...kt(w,g)),W=N=>x[N]&&x.removeChild(x[N]);return{assign:I,sort:I,reverse:I,setItem:()=>{var M;let N=P[0];(M=x.children[N])==null||M.replaceWith(g(S[N],N))},push:()=>x.append(...kt(m,(N,M)=>g(N,S.length+M))),unshift:()=>x.prepend(...kt(m,g)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{let[N,M,...V]=m;const{length:J}=x.children;for(let Q=N>=0?Math.min(N+M-1,J-1):J-1;Q>=(N>=0?N:J+N);Q--)x.children[Q].remove();if(V.length){let Q=V.forEach((at,Lt)=>g(at,N+Lt));x.children[N]?x.children[N].after(...Q):x.append(...Q)}}}},f=x=>({oldVal:x,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return s==null||s.add(m),m.valProxy??(m.valProxy=Ut(x)?b(m,x):x,m.valProxy)},set val(m){let g=this,w=g.val;Ut(m)?(g.valProxy=b(g,m),p(g,"assign",m)):m!==w&&(g.valProxy=m,p(g)),g.oldVal=w}}),v=x=>x==null||x===!1?c("span"):x.nodeType?x:n.createTextNode(x),y=(x,m)=>{let g=new Set;return m.val=l(x,g),g},C=x=>{let m=f(),g=y(x,m);m.computed=!0;for(let w of g)w.listeners.push({computed:x,deps:g,state:m});return m},E=x=>{for(let m of[...x.listeners])y(m.computed,m.state)},B=(x,...m)=>{if(m.length){let g=[];for(let w of m.flat(1/0))w!=null&&g.push(mt(w)?j({deps:[w],render:()=>S=>S}):ce(w)?nt({renderInferred:w}):v(w));x.append(...g)}},_={},L=(x,m)=>x&&(Object.getOwnPropertyDescriptor(x,m)??L(le(x),m)),D=(x,m,g)=>{var w;return _[x+","+m]??(_[x+","+m]=((w=L(g,m))==null?void 0:w.set)??0)},R=(x,m)=>new e.MutationObserver((g,w)=>{g.filter(S=>S.removedNodes).forEach(S=>[...S.removedNodes].find(P=>P===x&&(m({element:x}),w.disconnect(),!0)))}).observe(x.parentNode,{childList:!0}),$=(x,m)=>new e.MutationObserver((g,w)=>g.forEach(S=>m({record:S,element:x}))).observe(x,{childList:!0}),H=x=>new Proxy(function(g,...w){var W;let[S,...P]=Z(w),I=x?n.createElementNS(x,g):c(g);for(let[N,M]of Object.entries(S)){if(N.startsWith("bau"))continue;let V=D(g,N,le(I))?J=>I[N]=J:J=>I.setAttribute(N,J);M==null||(mt(M)?j({deps:[M],render:()=>()=>(V(M.val),I)}):ce(M)&&(!N.startsWith("on")||M.isDerived)?nt({renderInferred:()=>(V(M({element:I})),I)}):M.renderProp?j({deps:M.deps,render:()=>()=>(V(M.renderProp({element:I})(...M.deps.map(Gt))),I)}):V(M))}return S.bauChildMutated&&$(I,S.bauChildMutated),B(I,...P),(W=S.bauCreated)==null||W.call(S,{element:I}),S.bauMounted&&e.requestAnimationFrame(()=>S.bauMounted({element:I})),S.bauUnmounted&&e.requestAnimationFrame(()=>R(I,S.bauUnmounted)),I},{get:(m,g)=>m.bind(void 0,g)}),q=(x,m,g)=>{x.element=v(g);for(let w of m)mt(w)&&(a.add(w),w.bindings.push(x));return x.element},nt=({renderInferred:x,element:m})=>{let g=new Set,w=l(x,g,{element:m});return q({renderInferred:x},g,w)},j=({deps:x,element:m,render:g,renderItem:w})=>q({deps:x,render:g,renderItem:w},x,g({element:m,renderItem:w})(...x.map(Gt))),F=(x,m,g)=>j({deps:[x],render:({renderItem:w})=>S=>(m.append(...kt(S,w)),m),renderItem:g}),G=x=>{r=!0,x(),r=!1,i.forEach(p),i.clear()};return{tags:H(),tagsNS:H,state:f,bind:j,loop:F,derive:C,stateSet:a,batch:G}}const Qn=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},to=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},eo=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function no(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...i)=>{const r=eo(a,i),s=Qn(r);return!e.getElementById(s)&&to(e,t==null?void 0:t.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function oo(t){const e=Jn(),n=no();return Xn(n),{bau:e,...n,tr:o=>o,window,...t}}function T(...t){return t.filter(e=>e).join(" ")}function It(t,e={}){const{bau:n}=t,{div:o}=n.tags,a=()=>{};return function({animationHide:r=a,animationShow:s=a,...c},l){return o({class:T("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!r()||d.getAttribute("cloned"))return;const b=d.cloneNode(!0);b.setAttribute("cloned",!0),b.style.top=0,b.style.left=0,b.style.width=d.getAttribute("width"),b.style.height=d.getAttribute("height"),b.style.position="absolute",b.style.animation=r(),u.target.appendChild(b),b.addEventListener("animationend",()=>b.parentNode.removeChild(b))}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const b=d.getBoundingClientRect();if(d.setAttribute("width",b.width+"px"),d.setAttribute("height",b.height+"px"),s()){d.style.animation=s();const h=()=>{d.removeEventListener("animationend",h),d.style.animation=""};d.addEventListener("animationend",h)}})},...c},l)}}function K(t,e){const{bau:n,css:o}=t,a={root:o`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:u,href:p,...d},...b]=Z(r);return(p?n.tags.a:n.tags.button)({...d,class:T("button",a.root,c,l,s,p?a.a:a.button,u&&a.disabled,e==null?void 0:e.class,d.class),disabled:u,href:p,...!p&&{type:"button"}},b)}}const et=["neutral","primary","success","danger","warning"],ao=["plain","outline","solid"],ro=["sm","md","lg"],so="light",io=()=>et.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function Zt(t,e){const{bau:n,css:o,window:a}=t,{input:i}=n.tags,r=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(so);const l=o`
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
    ${io()}
  `;return function(...p){let[{color:d,variant:b="outline",size:h="md",...f},...v]=Z(p);return i({required:"required",title:"Switch Theme",...f,class:T("theme-switch",d,b,h,l,e==null?void 0:e.class,f.class),type:"checkbox",checked:s()=="dark",onclick:y=>{r(y.target.checked?"dark":"light")}},...v)}}function co(t){const{tr:e,bau:n,css:o,config:a,states:i}=t,{i:r,header:s,h1:c,div:l,a:u,img:p,b:d,ul:b,li:h}=n.tags,{svg:f,path:v}=n.tagsNS("http://www.w3.org/2000/svg"),y=i.drawerOpen,C=K(t,{class:o`
      background: transparent;
    `}),E=Zt(t),B=()=>r(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},v({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),_=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},C({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},B()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},d(e("Bau UI")))),L=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},E(),C({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},_(),L())}}function lo({tr:t,bau:e,css:n}){const{section:o,footer:a,span:i,a:r,ul:s,li:c,p:l,div:u,h1:p}=e.tags,d=({links:f,title:v})=>o({class:n`
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
        `},p(v),s(f.map(({href:y,name:C})=>c(r({href:y},C))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},d({title:"Bau UI",links:b}),d({title:"Bau Ecosystem",links:h})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.42.0"),i("MIT license")))}}function wt(t,e){const{bau:n,css:o}=t,{ul:a}=n.tags,i=o`
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
    & li {
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
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u,...p},...d]=Z(s);return a({...p,class:T("list",i,c,l,u,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const Tt="0.3s",xe=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(xe({parent:n,grandParent:t})),t&&(t.parentTree=e),i.parentTree=t,i},we=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=we(t)(e.children[o]);if(a)return a}},uo=({keyframes:t})=>({hideToLeft:t`
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
   `});function Xt(t,e={}){const{bau:n,css:o,window:a,config:i}=t,{base:r="",hashBased:s=!1}=e,c=`${i.base}${r}`,l=j=>{var F;return((F=j.parentTree.data)==null?void 0:F.href)??j.parentTree.children[0].data.href},u=({variant:j,color:F,size:G,currentTree:x,data:m})=>E(D({variant:j,color:F,size:G,href:`${c}${l(x)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:j,color:F,size:G,href:`${c}${m.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},m.name)),p=({size:j,subTree:{data:{name:F,href:G},children:x=[]}})=>D({size:j,href:`${c}${G}`,"data-ischild":!x.length},F),d=({pathname:j,subTree:F})=>{var G;return j===((G=F==null?void 0:F.data)==null?void 0:G.href)},{renderHeader:b=u,renderMenuItem:h=p,isActive:f=d}=e,{li:v,nav:y,div:C,header:E,a:B}=n.tags,_=It(t),L=wt(t),D=K(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:R,hideToRight:$}=uo(t),H=o`
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
  `,q=({variant:j,color:F,size:G,currentTree:x,pathnameState:m})=>{const{children:g,parentTree:w,data:S}=x;return C({class:T("drillDownMenu",j,F,G)},w&&b({variant:j,color:F,size:G,data:S,currentTree:x}),g&&L({class:T(j,F,G)},g.map(P=>v({class:()=>T(P.children&&"has-children",f({pathname:m.val,subTree:P})&&"active")},h({variant:j,color:F,size:G,subTree:P})))))},nt=({tree:j,pathname:F})=>{let G=xe({})(structuredClone(j)),x=we(F)(G);return x||(console.error("drilldown no sub tree",F),x=G),x};return function(F){const{variant:G="plain",color:x="neutral",size:m="md",tree:g,...w}=F,S=n.state(a.location.pathname.replace(c,"")),P=n.derive(()=>nt({tree:g,pathname:S.val}));a.document.addEventListener("click",V=>{const{target:J}=V,Q=J.getAttribute("href");if(J.tagName==="A"&&Q&&!Q.startsWith("http")){let at=Q.replace(c,"");s||(at=at.replace(J.hash,"")),S.val=at}});let I=1;const W=V=>{const{dataset:J}=V.target;J.buttonback=="true"?I=-1:J.ischild=="false"?I=1:J.ischild=="true"&&(I=0)},N=V=>{switch(V){case 1:return`${R} ${Tt}`;case-1:return`${$} ${Tt}`;default:return""}},M=V=>{switch(V){case 1:return`${$} ${Tt} reverse`;case-1:return`${R} ${Tt} reverse`;default:return""}};return y({class:T(H,e==null?void 0:e.class,w.class),onclick:W},_({animationHide:()=>N(I),animationShow:()=>M(I)},()=>q({variant:G,color:x,size:m,currentTree:P.val,pathnameState:S})))}}const po={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function ye(t){const{tr:e,bau:n,css:o,config:a,states:i,window:r}=t,{div:s,ul:c,li:l,nav:u,a:p,span:d}=n.tags;let b=!1;const h=Xt(t);return function(){return s({bauMounted:({element:v})=>{r.innerWidth<=640&&(b=!0,i.drawerOpen.val=!1)},onclick:v=>{b&&!v.target.dataset.buttonback&&!v.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},h({tree:po}))}}const mo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:i}=e.tags,r=It(t),s=co(t),c=ye(t),l=lo(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,p=(d="")=>`${u} ease-in-out 0.5s ${d}`;return function({componentState:b}){return i({class:n`
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
            overflow-y: scroll;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>b.val&&b.val({})),l())}};function $t(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
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
  `;return function(...s){let[{size:c="md",variant:l="outline",color:u="neutral",onclick:p,...d},...b]=Z(s);return a({...d,onclick:p,class:T("chip",i,c,l,u,p&&"clickable",e==null?void 0:e.class,d==null?void 0:d.class)},...b)}}function bo(t){const{bau:e,css:n,config:o}=t,{div:a,h1:i,h2:r,p:s}=e.tags;K(t);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),r(p),s(d))}}function go(t){const{bau:e,css:n}=t,{div:o,h1:a,p:i}=e.tags,r=n`
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
      width: 28%;
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
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function ho({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:i,dd:r,div:s,aside:c,footer:l,a:u}=e.tags,p=({maxSize:d=151})=>({libName:b,size:h})=>s({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},b),r({class:n`
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
                  var(--color-success) ${h/d*100}%
                );
                justify-content: flex-end;
                width: ${h/d*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},h)));return function({data:b=[]}){return o({class:n`
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
          `},b.map(p({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function fo(t){const{bau:e,css:n,config:o}=t,{div:a,p:i,a:r,section:s}=e.tags,c=bo(t),l=go(t),u=K(t);$t(t);const p=ho(t),d=(...y)=>a({class:n`
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
          `},...y)),b=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],v=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),p({data:h}),v())}}function vo(t,e={}){const{bau:n,css:o}=t,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const xo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:i,h2:r}=n.tags,s=vo(t);return()=>o({id:"login"},r(e("Login Examples")),i("Basic"),a(s()))};function wo(t){const{tr:e,bau:n,css:o}=t,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
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
          `},r(e("Pages Examples")),xo(t)()))}}function yo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ce(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ce(n)}),t}class ue{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Se(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function it(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Co="</span>",de=t=>!!t.scope,So=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Eo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Se(e)}openNode(e){if(!de(e))return;const n=So(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){de(e)&&(this.buffer+=Co)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const pe=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class Kt{constructor(){this.rootNode=pe(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=pe({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{Kt._collapse(n)}))}}class ko extends Kt{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Eo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function vt(t){return t?typeof t=="string"?t:t.source:null}function Ee(t){return dt("(?=",t,")")}function To(t){return dt("(?:",t,")*")}function Ao(t){return dt("(?:",t,")?")}function dt(...t){return t.map(n=>vt(n)).join("")}function Mo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function Yt(...t){return"("+(Mo(t).capture?"":"?:")+t.map(o=>vt(o)).join("|")+")"}function ke(t){return new RegExp(t.toString()+"|").exec("").length-1}function Do(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Io=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qt(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let i=vt(o),r="";for(;i.length>0;){const s=Io.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(e)}const $o=/\b\B/,Te="[a-zA-Z]\\w*",Jt="[a-zA-Z_]\\w*",Ae="\\b\\d+(\\.\\d+)?",Me="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",De="\\b(0b[01]+)",No="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Bo=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=dt(e,/.*\b/,t.binary,/\b.*/)),it({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},xt={begin:"\\\\[\\s\\S]",relevance:0},Po={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xt]},_o={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xt]},Ro={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Nt=function(t,e,n={}){const o=it({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Yt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:dt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Oo=Nt("//","$"),Lo=Nt("/\\*","\\*/"),jo=Nt("#","$"),zo={scope:"number",begin:Ae,relevance:0},Ho={scope:"number",begin:Me,relevance:0},Uo={scope:"number",begin:De,relevance:0},Go={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xt,{begin:/\[/,end:/\]/,relevance:0,contains:[xt]}]}]},Fo={scope:"title",begin:Te,relevance:0},Vo={scope:"title",begin:Jt,relevance:0},Wo={begin:"\\.\\s*"+Jt,relevance:0},Zo=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var At=Object.freeze({__proto__:null,MATCH_NOTHING_RE:$o,IDENT_RE:Te,UNDERSCORE_IDENT_RE:Jt,NUMBER_RE:Ae,C_NUMBER_RE:Me,BINARY_NUMBER_RE:De,RE_STARTERS_RE:No,SHEBANG:Bo,BACKSLASH_ESCAPE:xt,APOS_STRING_MODE:Po,QUOTE_STRING_MODE:_o,PHRASAL_WORDS_MODE:Ro,COMMENT:Nt,C_LINE_COMMENT_MODE:Oo,C_BLOCK_COMMENT_MODE:Lo,HASH_COMMENT_MODE:jo,NUMBER_MODE:zo,C_NUMBER_MODE:Ho,BINARY_NUMBER_MODE:Uo,REGEXP_MODE:Go,TITLE_MODE:Fo,UNDERSCORE_TITLE_MODE:Vo,METHOD_GUARD:Wo,END_SAME_AS_BEGIN:Zo});function Xo(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function Ko(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function Yo(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=Xo,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function qo(t,e){Array.isArray(t.illegal)&&(t.illegal=Yt(...t.illegal))}function Jo(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function Qo(t,e){t.relevance===void 0&&(t.relevance=1)}const ta=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=dt(n.beforeMatch,Ee(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},ea=["of","and","for","in","not","or","if","then","parent","list","value"],na="keyword";function Ie(t,e,n=na){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(i){Object.assign(o,Ie(t[i],e,i))}),o;function a(i,r){e&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,oa(c[0],c[1])]})}}function oa(t,e){return e?Number(e):aa(t)?0:1}function aa(t){return ea.includes(t.toLowerCase())}const me={},ut=t=>{console.error(t)},be=(t,...e)=>{console.log(`WARN: ${t}`,...e)},pt=(t,e)=>{me[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),me[`${t}/${e}`]=!0)},Dt=new Error;function $e(t,e,{key:n}){let o=0;const a=t[n],i={},r={};for(let s=1;s<=e.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=ke(e[s-1]);t[n]=r,t[n]._emit=i,t[n]._multi=!0}function ra(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ut("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Dt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ut("beginScope must be object"),Dt;$e(t,t.begin,{key:"beginScope"}),t.begin=qt(t.begin,{joinWith:""})}}function sa(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ut("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Dt;if(typeof t.endScope!="object"||t.endScope===null)throw ut("endScope must be object"),Dt;$e(t,t.end,{key:"endScope"}),t.end=qt(t.end,{joinWith:""})}}function ia(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function ca(t){ia(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),ra(t),sa(t)}function la(t){function e(r,s){return new RegExp(vt(r),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=ke(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=e(qt(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[Ko,Jo,ca,ta].forEach(u=>u(r,s)),t.compilerExtensions.forEach(u=>u(r,s)),r.__beforeBegin=null,[Yo,qo,Qo].forEach(u=>u(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=Ie(r.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=e(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=e(c.end)),c.terminatorEnd=vt(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=e(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(u){return ua(u==="self"?r:u)})),r.contains.forEach(function(u){i(u,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=it(t.classNameAliases||{}),i(t)}function Ne(t){return t?t.endsWithParent||Ne(t.starts):!1}function ua(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return it(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ne(t)?it(t,{starts:t.starts?it(t.starts):null}):Object.isFrozen(t)?it(t):t}var da="11.8.0";class pa extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const Ft=Se,ge=it,he=Symbol("nomatch"),ma=7,Be=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:ko};function c(m){return s.noHighlightRe.test(m)}function l(m){let g=m.className+" ";g+=m.parentNode?m.parentNode.className:"";const w=s.languageDetectRe.exec(g);if(w){const S=$(w[1]);return S||(be(i.replace("{}",w[1])),be("Falling back to no-highlight mode for this block.",m)),S?w[1]:"no-highlight"}return g.split(/\s+/).find(S=>c(S)||$(S))}function u(m,g,w){let S="",P="";typeof g=="object"?(S=m,w=g.ignoreIllegals,P=g.language):(pt("10.7.0","highlight(lang, code, ...args) has been deprecated."),pt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=m,S=g),w===void 0&&(w=!0);const I={code:S,language:P};G("before:highlight",I);const W=I.result?I.result:p(I.language,I.code,w);return W.code=I.code,G("after:highlight",W),W}function p(m,g,w,S){const P=Object.create(null);function I(k,A){return k.keywords[A]}function W(){if(!O.keywords){tt.addText(Y);return}let k=0;O.keywordPatternRe.lastIndex=0;let A=O.keywordPatternRe.exec(Y),z="";for(;A;){z+=Y.substring(k,A.index);const X=rt.case_insensitive?A[0].toLowerCase():A[0],ot=I(O,X);if(ot){const[st,Pn]=ot;if(tt.addText(z),z="",P[X]=(P[X]||0)+1,P[X]<=ma&&(Et+=Pn),st.startsWith("_"))z+=A[0];else{const _n=rt.classNameAliases[st]||st;V(A[0],_n)}}else z+=A[0];k=O.keywordPatternRe.lastIndex,A=O.keywordPatternRe.exec(Y)}z+=Y.substring(k),tt.addText(z)}function N(){if(Y==="")return;let k=null;if(typeof O.subLanguage=="string"){if(!e[O.subLanguage]){tt.addText(Y);return}k=p(O.subLanguage,Y,!0,re[O.subLanguage]),re[O.subLanguage]=k._top}else k=b(Y,O.subLanguage.length?O.subLanguage:null);O.relevance>0&&(Et+=k.relevance),tt.__addSublanguage(k._emitter,k.language)}function M(){O.subLanguage!=null?N():W(),Y=""}function V(k,A){k!==""&&(tt.startScope(A),tt.addText(k),tt.endScope())}function J(k,A){let z=1;const X=A.length-1;for(;z<=X;){if(!k._emit[z]){z++;continue}const ot=rt.classNameAliases[k[z]]||k[z],st=A[z];ot?V(st,ot):(Y=st,W(),Y=""),z++}}function Q(k,A){return k.scope&&typeof k.scope=="string"&&tt.openNode(rt.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(V(Y,rt.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(J(k.beginScope,A),Y="")),O=Object.create(k,{parent:{value:O}}),O}function at(k,A,z){let X=Do(k.endRe,z);if(X){if(k["on:end"]){const ot=new ue(k);k["on:end"](A,ot),ot.isMatchIgnored&&(X=!1)}if(X){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return at(k.parent,A,z)}function Lt(k){return O.matcher.regexIndex===0?(Y+=k[0],1):(Ht=!0,0)}function In(k){const A=k[0],z=k.rule,X=new ue(z),ot=[z.__beforeBegin,z["on:begin"]];for(const st of ot)if(st&&(st(k,X),X.isMatchIgnored))return Lt(A);return z.skip?Y+=A:(z.excludeBegin&&(Y+=A),M(),!z.returnBegin&&!z.excludeBegin&&(Y=A)),Q(z,k),z.returnBegin?0:A.length}function $n(k){const A=k[0],z=g.substring(k.index),X=at(O,k,z);if(!X)return he;const ot=O;O.endScope&&O.endScope._wrap?(M(),V(A,O.endScope._wrap)):O.endScope&&O.endScope._multi?(M(),J(O.endScope,k)):ot.skip?Y+=A:(ot.returnEnd||ot.excludeEnd||(Y+=A),M(),ot.excludeEnd&&(Y=A));do O.scope&&tt.closeNode(),!O.skip&&!O.subLanguage&&(Et+=O.relevance),O=O.parent;while(O!==X.parent);return X.starts&&Q(X.starts,k),ot.returnEnd?0:A.length}function Nn(){const k=[];for(let A=O;A!==rt;A=A.parent)A.scope&&k.unshift(A.scope);k.forEach(A=>tt.openNode(A))}let St={};function ae(k,A){const z=A&&A[0];if(Y+=k,z==null)return M(),0;if(St.type==="begin"&&A.type==="end"&&St.index===A.index&&z===""){if(Y+=g.slice(A.index,A.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=St.rule,X}return 1}if(St=A,A.type==="begin")return In(A);if(A.type==="illegal"&&!w){const X=new Error('Illegal lexeme "'+z+'" for mode "'+(O.scope||"<unnamed>")+'"');throw X.mode=O,X}else if(A.type==="end"){const X=$n(A);if(X!==he)return X}if(A.type==="illegal"&&z==="")return 1;if(zt>1e5&&zt>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=z,z.length}const rt=$(m);if(!rt)throw ut(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Bn=la(rt);let jt="",O=S||Bn;const re={},tt=new s.__emitter(s);Nn();let Y="",Et=0,ct=0,zt=0,Ht=!1;try{if(rt.__emitTokens)rt.__emitTokens(g,tt);else{for(O.matcher.considerAll();;){zt++,Ht?Ht=!1:O.matcher.considerAll(),O.matcher.lastIndex=ct;const k=O.matcher.exec(g);if(!k)break;const A=g.substring(ct,k.index),z=ae(A,k);ct=k.index+z}ae(g.substring(ct))}return tt.finalize(),jt=tt.toHTML(),{language:m,value:jt,relevance:Et,illegal:!1,_emitter:tt,_top:O}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:m,value:Ft(g),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ct,context:g.slice(ct-100,ct+100),mode:k.mode,resultSoFar:jt},_emitter:tt};if(a)return{language:m,value:Ft(g),illegal:!1,relevance:0,errorRaised:k,_emitter:tt,_top:O};throw k}}function d(m){const g={value:Ft(m),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return g._emitter.addText(m),g}function b(m,g){g=g||s.languages||Object.keys(e);const w=d(m),S=g.filter($).filter(q).map(M=>p(M,m,!1));S.unshift(w);const P=S.sort((M,V)=>{if(M.relevance!==V.relevance)return V.relevance-M.relevance;if(M.language&&V.language){if($(M.language).supersetOf===V.language)return 1;if($(V.language).supersetOf===M.language)return-1}return 0}),[I,W]=P,N=I;return N.secondBest=W,N}function h(m,g,w){const S=g&&n[g]||w;m.classList.add("hljs"),m.classList.add(`language-${S}`)}function f(m){let g=null;const w=l(m);if(c(w))return;if(G("before:highlightElement",{el:m,language:w}),m.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),s.throwUnescapedHTML))throw new pa("One of your code blocks includes unescaped HTML.",m.innerHTML);g=m;const S=g.textContent,P=w?u(S,{language:w,ignoreIllegals:!0}):b(S);m.innerHTML=P.value,h(m,w,P.language),m.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(m.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),G("after:highlightElement",{el:m,result:P,text:S})}function v(m){s=ge(s,m)}const y=()=>{B(),pt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){B(),pt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let E=!1;function B(){if(document.readyState==="loading"){E=!0;return}document.querySelectorAll(s.cssSelector).forEach(f)}function _(){E&&B()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function L(m,g){let w=null;try{w=g(t)}catch(S){if(ut("Language definition for '{}' could not be registered.".replace("{}",m)),a)ut(S);else throw S;w=r}w.name||(w.name=m),e[m]=w,w.rawDefinition=g.bind(null,t),w.aliases&&H(w.aliases,{languageName:m})}function D(m){delete e[m];for(const g of Object.keys(n))n[g]===m&&delete n[g]}function R(){return Object.keys(e)}function $(m){return m=(m||"").toLowerCase(),e[m]||e[n[m]]}function H(m,{languageName:g}){typeof m=="string"&&(m=[m]),m.forEach(w=>{n[w.toLowerCase()]=g})}function q(m){const g=$(m);return g&&!g.disableAutodetect}function nt(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=g=>{m["before:highlightBlock"](Object.assign({block:g.el},g))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=g=>{m["after:highlightBlock"](Object.assign({block:g.el},g))})}function j(m){nt(m),o.push(m)}function F(m){const g=o.indexOf(m);g!==-1&&o.splice(g,1)}function G(m,g){const w=m;o.forEach(function(S){S[w]&&S[w](g)})}function x(m){return pt("10.7.0","highlightBlock will be removed entirely in v12.0"),pt("10.7.0","Please use highlightElement now."),f(m)}Object.assign(t,{highlight:u,highlightAuto:b,highlightAll:B,highlightElement:f,highlightBlock:x,configure:v,initHighlighting:y,initHighlightingOnLoad:C,registerLanguage:L,unregisterLanguage:D,listLanguages:R,getLanguage:$,registerAliases:H,autoDetection:q,inherit:ge,addPlugin:j,removePlugin:F}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=da,t.regex={concat:dt,lookahead:Ee,either:Yt,optional:Ao,anyNumberOfTimes:To};for(const m in At)typeof At[m]=="object"&&Ce(At[m]);return Object.assign(t,At),t},bt=Be({});bt.newInstance=()=>Be({});var ba=bt;bt.HighlightJS=bt;bt.default=bt;const ft=yo(ba),fe="[A-Za-z$_][0-9A-Za-z$_]*",ga=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ha=["true","false","null","undefined","NaN","Infinity"],Pe=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],_e=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Re=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],fa=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],va=[].concat(Re,Pe,_e);function Oe(t){const e=t.regex,n=(g,{after:w})=>{const S="</"+g[0].slice(1);return g.input.indexOf(S,w)!==-1},o=fe,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(g,w)=>{const S=g[0].length+g.index,P=g.input[S];if(P==="<"||P===","){w.ignoreMatch();return}P===">"&&(n(g,{after:S})||w.ignoreMatch());let I;const W=g.input.substring(S);if(I=W.match(/^\s*=/)){w.ignoreMatch();return}if((I=W.match(/^\s+extends\s+/))&&I.index===0){w.ignoreMatch();return}}},s={$pattern:fe,keyword:ga,literal:ha,built_in:va,"variable.language":fa},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,d]},C={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},E=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,h,f,v,{match:/\$\d+/},p];d.contains=E.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(E)});const B=[].concat(C,d.contains),_=B.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(B)}]),L={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:_},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Pe,..._e]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[L],illegal:/%/},q={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function nt(g){return e.concat("(?!",g.join("|"),")")}const j={match:e.concat(/\b/,nt([...Re,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},G={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},L]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[L]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,h,f,v,C,{match:/\$\d+/},p,R,{className:"attr",begin:o+e.lookahead(":"),relevance:0},m,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,t.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[L,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[L]},j,q,D,G,{match:/\$[(.]/}]}}function xa(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const wa=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return ft.registerLanguage("javascript",Oe),ft.registerLanguage("sh",xa),function({text:r,language:s="js"}){const c=a({class:`hljs language-${s}`});return c.innerHTML=ft.highlight(r,{language:s}).value,o({class:n`
          display: inline-block;
        `},c)}};function ya(t){const{bau:e,css:n}=t,{article:o,h1:a,p:i,code:r,a:s,ul:c,li:l}=e.tags,u=wa(t);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(s({href:"components"},"Visit the component gallery")),l(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Bt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=Z(s);return a({...p,class:T("paper",u,i,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const Le=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=e.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(r(l(d??""),et.map(b=>l(b)))),i(ao.map(b=>r(l(b),et.map((h,f)=>s(p({color:h,variant:b},{index:f}))))))))}},Ca=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({Item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},ro.map((r,s)=>i({color:"success",variant:"outline",size:r},{index:s})))}},U=t=>{const{bau:e,css:n}=t,{article:o,section:a,h1:i,p:r,h2:s,h3:c,pre:l,code:u}=e.tags;ft.registerLanguage("javascript",Oe);const p=Bt(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),d=Le(t),b=Ca(t),h=({text:f})=>l({class:n`
          display: inline-block;
        `},u({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=ft.highlight(f,{language:"js"}).value}}));return function(v){return o({class:n``},i(v.title),r(v.description),v.gridItem&&[s("Variant/Color"),!v.variantColorTableDisable&&v.gridItem&&p(d({Item:v.gridItem(t)})),s("Size"),r("Component with size: ",u("sm"),", ",u("md"),", and ",u("lg")),v.gridItem&&p(b({Item:v.gridItem(t)}))],s("Usage"),c("Import"),h({text:v.importStatement}),s("Examples"),v.examples.map(y=>a(i(y.title),r(y.description),p(y.createComponent(t)()),h({text:y.code}))))}};function Qt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `,r=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?s(l):c(l))};function s(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{color:p,variant:d="plain",size:b="md",Header:h,Content:f,close:v=!0,...y}]=Z(u);const C=n.state(v);return a({...y,class:T("collapsible",b,i,e==null?void 0:e.class,y==null?void 0:y.class)},a({class:()=>T("header",f?C.val?"close":"open":""),onclick:E=>{C.val=!C.val,E.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:E})=>{C.val&&(E.style.height="0px")},"aria-expanded":({element:E})=>(r({element:E,closeState:C}),!C.val)},f&&f()))}}const Sa=()=>et.map(t=>`
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
`);function Pt(t,e){const{bau:n,css:o}=t,{div:a,ul:i,li:r,h3:s,button:c}=n.tags,l=n.state(""),u=Qt(t),p=b=>h=>{l.val==b?l.val="":l.val=b},d=o`
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
    ${Sa()}
  `;return function(...h){let[{color:f,variant:v="outline",size:y="md",data:C=[],...E}]=Z(h);const B=_=>{const{Header:L,Content:D,name:R}=_,$=()=>s({class:()=>T(l.val==R&&"active")},c({type:"button","aria-controls":`bau-${R}`,"aria-expanded":({element:q})=>l.val==R},L(_))),H=()=>a({id:`bau-${R}`,"data-state":({element:q})=>l.val==R},D(_));return r({class:T(f,v,y),onclick:p(R)},u({Header:$,Content:H}))};return a({class:T("accordion",d,e==null?void 0:e.class,E.class)},i(C.map(B)))}}const je=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Pt(t);return r=>i({...r,data:a})},Ea=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Pt(t);return()=>i({data:a,color:"neutral",variant:"outline"})},ka=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,ze=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ta=t=>{const{css:e}=t,n=ze(t),o=Pt(t);return()=>o({color:"warning",data:n,class:e`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Aa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ma=t=>{const{css:e}=t,n=ze(t),o=Pt(t);return()=>o({color:"success",variant:"outline",data:n,class:e`
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
      `})},Da=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ia={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:ka,createComponent:Ea},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Aa,createComponent:Ta},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Da,createComponent:Ma}],gridItem:je},$a=t=>{const e=U(t);return()=>e(Ia)},Na={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ba=({css:t,createGlobalStyles:e})=>{e`
:root {
  --alert-border-left-width: 8px;
}
`},Pa=()=>et.map(t=>`
&.alert.outline.${t} {
  & .icon {
    color: var(--color-${t})
  }
}
`).join(`
`);function _t(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i,i:r}=n.tags;Ba({css:o,createGlobalStyles:a});const s=o`
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
    ${Pa()}
  `,c=K(t),l=({onclick:u})=>c({"aria-label":"Close",onclick:u,class:"button-close"},"✖");return function(p,...d){const{variant:b="outline",color:h="neutral",size:f="md",onRemove:v,...y}=p;return i({...y,class:T(`alert-${b}`,b,h,f,s,e==null?void 0:e.class,p.class,"alert"),role:"alert"},r({class:"icon"},Na[h]),i({class:"content"},...d),v&&l({onclick:v}))}}const He=t=>{const e=_t(t);return n=>e({...n},`Alert ${n.variant} ${n.color}`)},_a=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=_t(t);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ra=`import alert from "@grucloud/bau-ui/alert";
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
`,Oa=t=>{const{css:e}=t,n=_t(t,{class:e`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},La=`import alert from "@grucloud/bau-ui/alert";
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
`,ja={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ra,createComponent:_a},{title:"Custom Alert ",description:"A custom alert.",code:La,createComponent:Oa}],gridItem:He},za=t=>{const e=U(t);return()=>e(ja)},Ha=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:i=10,deleteAfterDuration:r=15e3}=e,{div:s}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:b})=>{const h=c.val.findIndex(f=>f.id===d);h!=-1&&(c.val[h].status=b)};return function(b={},...h){const f=({id:C})=>{p({id:C,status:"removing"});const E=c.val.findIndex(B=>B.id===C);E!=-1&&c.val.splice(E,1)},v=({Component:C})=>{const E={id:Math.random().toString(10).split(".")[1],Component:C,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(E),setTimeout(()=>f(E),r)},y=C=>s({class:u.item,onclick:()=>f(C)},C.Component());return document.addEventListener("alert.add",C=>v(C.detail)),document.addEventListener("alert.remove",C=>f(C.detail)),s({class:T(u.stack,e==null?void 0:e.class,b.class)},n.loop(c,s(),y))}},Ua=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=Ha(t,{deleteAfterDuration:2e4}),i=K(t),r=_t(t);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},Ga=`import { Context } from "@grucloud/bau-ui/context";
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
`,Fa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ga,createComponent:Ua}]},Va=t=>{const e=U(t);return()=>e(Fa)},Wa=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,i=It(t),r=K(t),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=e.state(!0);return()=>o(r({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},Za=`import animate from "@grucloud/bau-ui/animate";
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
`,Xa=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:i,label:r}=e.tags,s=It(t),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=e.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(r("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),r("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),s({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},Ka=`import animate from "@grucloud/bau-ui/animate";
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
`,Ya={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:Za,createComponent:Wa},{title:"Component hide and show",description:"Hide and show a component",code:Ka,createComponent:Xa}]},qa=t=>{const e=U(t);return()=>e(Ya)};function Ue(t,e){const{bau:n,css:o}=t,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=p=>{r.val=!1,s.val=!0},u=o`
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
  `;return function(...d){let[{color:b,variant:h="outline",size:f="md",width:v=30,height:y=30,...C},...E]=Z(d);return a({class:T(u,e==null?void 0:e.class,C.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:v,height:y,onload:c,onerror:l,class:T(b,h,f,u,e==null?void 0:e.class,C.class),...C}))}}const Ge=t=>{const{css:e}=t,n=Ue(t,{class:e`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Ja=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=Ue(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Qa=`import avatar from "@grucloud/bau-ui/avatar";
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
`,tr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Qa,createComponent:Ja}],gridItem:Ge},er=t=>{const e=U(t);return()=>e(tr)};function te(t,e){const{bau:n,css:o,window:a}=t,{dialog:i}=n.tags,r=Bt(t,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...b},...h]=Z(l);const f=C=>{y.style.opacity=1,y.showModal();const E=p.getBoundingClientRect(),B=y.getBoundingClientRect();E.x<a.innerWidth/2?y.style.left=E.left+"px":y.style.left=E.right-B.width+"px",E.y<a.innerHeight/2?y.style.top=E.top+E.height+"px":y.style.top=E.top-B.height+"px"},v=C=>{const E=()=>{y.close(),y.removeEventListener("transitionend",E)};y.addEventListener("transitionend",E),y.style.opacity=0},y=i({role:"presentation",class:T("popover",s,e==null?void 0:e.class,b==null?void 0:b.class),onclick:C=>C.target===y&&(v(),d==null?void 0:d.call())},r(u));return y.closeDialog=v,y.openDialog=f,y}}const nr=()=>et.map(t=>`
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
    border: 2px solid var(--color-${t});
  };
}
&.input.soft.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
} 
&.input.solid.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${t}-light);
  }
}
`).join(`
`);function ee(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${nr()}
  `;return function(s){const{size:c="md",variant:l="outline",color:u="neutral",name:p,id:d,disabled:b,...h}=s;return a({...h,class:T("input",c,u,l,i,e==null?void 0:e.class,h.class)})}}const or=()=>et.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Fe(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,r=te(t),s=K(t),c=ee(t),l=wt(t),u=o`
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

    ${or()}
  `,p=n.state(""),d=n.state(""),b=n.state(!1),h=n.state(0),f=()=>{b.val=!1};return function(...y){let[{variant:C="outline",color:E,size:B="md",id:_,label:L,placeholder:D,Option:R,options:$,getOptionLabel:H=({label:N})=>N,...q},...nt]=Z(y);const j=n.state($),F=()=>{W.openDialog(),b.val=!0,d.val="",j.val=$},G=()=>{W.closeDialog(),b.val=!1,d.val=""},x=N=>{const{value:M}=N.target;d.val=M,M?j.val=$.filter(V=>H(V).match(new RegExp(`${M}`,"i"))):j.val=$},m=N=>{b.val?G():F()},g=({option:N,index:M})=>V=>{p.val=H(N),h.val=M,G()},w=N=>{switch(console.log("onkeydown",N.key,h.val),N.key){case"Escape":G();break;case"ArrowDown":h.val<j.val.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=j.val.length-1:h.val--;break;case"Enter":p.val=H(j.val[h.val]),d.val="",G();break}},S=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":b,"aria-label":L,onclick:m,variant:C,color:E,size:B},()=>!p.val&&L,p),P=c({id:_,value:d,placeholder:D,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":b,oninput:x,onkeydown:w,variant:C,color:E,size:B}),W=r({id:_,triggerEl:S,contentEl:(()=>a({class:T(C,E,B,"content")},P,()=>l({class:T(C,E,B)},j.val.map((N,M)=>i({class:()=>T(h.val==M&&"active"),onclick:g({option:N,index:M})},R(N))))))(),onClose:f});return a({...q,class:T("autocomplete",u,e==null?void 0:e.class,q==null?void 0:q.class)},S,W)}}const Ve=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=Fe(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},ar=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,r=Fe(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},rr=`import { Context } from "@grucloud/bau-ui/context";
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
`,sr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:rr,createComponent:ar}],gridItem:Ve},ir=t=>{const e=U(t);return()=>e(sr)};function We(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",content:p,...d},...b]=Z(s);return a({...d,class:T("badge",i,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:T(c,l,u)},p),...b)}}const Ze=t=>{const e=We(t);return(n,{index:o})=>e({...n,content:`${o*100}`},"☏")},cr=t=>{const{bau:e}=t,{section:n}=e.tags,o=We(t);return()=>n(o({content:"10"},"☏"))},lr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,ur={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:lr,createComponent:cr}],gridItem:Ze},dr=t=>{const e=U(t);return()=>e(ur)};function Xe(t,e){const{bau:n,css:o}=t,{ul:a,li:i,span:r}=n.tags,s=K(t),c=o`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:b="md",items:h,...f},...v]=Z(u);return a({...f,class:T(c,e==null?void 0:e.class,f==null?void 0:f.class)},h.map(({href:y,name:C})=>i((y?s:r)({href:y,color:p,variant:d,size:b,class:T(p,d,b)},C))))}}const Ke=t=>{const e={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Xe(t);return o=>n({...o,...e})},pr=t=>{const{bau:e}=t,{section:n}=e.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Xe(t);return()=>n(a(o))},mr=`import breadcrumbs, {
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
`,br={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:mr,createComponent:pr}],gridItem:Ke},gr=t=>{const e=U(t);return()=>e(br)},Ye=t=>{const e=K(t);return n=>e({...n},`${n.variant} ${n.color} ${n.size??""}`)},hr=t=>{const{bau:e}=t,{section:n}=e.tags,o=K(t),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},fr=`import button from "@grucloud/bau-ui/button";
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
`,vr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:fr,createComponent:hr}],gridItem:Ye},xr=t=>{const e=U(t);return()=>e(vr)},wr=()=>et.map(t=>`
&.button-group.${t} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${t}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${t} {
  border: none;
}

&.button-group.solid.${t} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function ne(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
    ${wr()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:u,...p},...d]=Z(s);return a({...p,class:T("button-group",c,u,l,i,e==null?void 0:e.class,p==null?void 0:p.class)},...d)}}const qe=t=>{const e=["ONE","TWO","THREE"],n=K(t),o=ne(t);return a=>o({...a},e.map(i=>n(a,i)))},yr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a=K(t),i=ne(t),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},Cr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Sr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Cr,createComponent:yr}],gridItem:qe},Er=t=>{const e=U(t);return()=>e(Sr)};function Je(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>et.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p,...d},...b]=Z(c);return a({...d,type:"date",class:T("calendar",r,l,u,p,e==null?void 0:e.class,d==null?void 0:d.class)},...b)}}const Qe=t=>{const e=Je(t);return n=>e({...n})},kr=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),i=Je(t);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},Tr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Ar={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Tr,createComponent:kr}],gridItem:Qe},Mr=t=>{const e=U(t);return()=>e(Ar)};function Dr(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `,r=n.state(0);return function(...c){let[{color:l,variant:u="plain",size:p="md",slides:d,Slide:b,Previous:h,Next:f,...v}]=Z(c);const y=()=>{r.val<=0?r.val=d.length-1:r.val--},C=()=>{r.val>=d.length-1?r.val=0:r.val++},E=a({class:"track",style:()=>`transform: translateX(${-100*r.val}%);`},d.map(b));return a({...v,class:T("carousel",p,i,e==null?void 0:e.class,v==null?void 0:v.class)},a({class:T("control","control-previous"),onclick:y},h()),a({class:T("control","control-next"),onclick:C},f()),E)}}const Ir=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],$r=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,i=K(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),r=({src:u})=>a({src:u}),s=Dr(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(s({slides:Ir,Slide:r,Previous:c,Next:l}))},Nr=`import carousel from "@grucloud/bau-ui/carousel";
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
`,Br={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:Nr,createComponent:$r}]},Pr=t=>{const e=U(t);return()=>e(Br)},tn=t=>{const e=$t(t);return n=>e({...n},`Chip ${n.color} ${n.variant} ${n.size??""}`)},_r=t=>{const{bau:e}=t,{section:n}=e.tags,o=$t(t);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Rr=`import chip from "@grucloud/bau-ui/chip";
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
`,Or={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Rr,createComponent:_r}],gridItem:tn},Lr=t=>{const e=U(t);return()=>e(Or)};function en(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u="md",...p},...d]=Z(s);return a({type:"checkbox",required:"required",...p,class:T(i,c,l,u,e==null?void 0:e.class,p==null?void 0:p.class)})}}const nn=t=>{const{bau:e,css:n}=t,{label:o}=e.tags,a=en(t);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},jr=t=>{const{bau:e,css:n}=t,{section:o,label:a}=e.tags,i=en(t),r=e.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:s})))},zr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,Hr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:zr,createComponent:jr}],gridItem:nn},Ur=t=>{const e=U(t);return()=>e(Hr)},Gr=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Qt(t),i=K(t),r=()=>i("Header"),s=()=>o("Content");return()=>n(a({Header:r,Content:s}))},Fr=`import button from "@grucloud/bau-ui/button";
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
`,Vr={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Fr,createComponent:Gr}]},Wr=t=>{const e=U(t);return()=>e(Vr)};function Zr(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:u,openState:p,...d},...b]=Z(s);return a({class:T(i,e==null?void 0:e.class,d.class)},a({class:()=>T("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>T("content",p.val&&"content-open")},b))}}const Xr=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),i=Zr(t),r=K(t),s=ye(t);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},Kr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Yr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Kr,createComponent:Xr}]},qr=t=>{const e=U(t);return()=>e(Yr)},on=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Xt(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Jr=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Xt(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Qr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,ts={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Qr,createComponent:Jr}],gridItem:t=>on(t,{base:"/components/drillDownMenu",hashBased:!0})},es=t=>{const e=U(t);return()=>e(ts)};function an(t,e){const{bau:n,css:o}=t,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
      display: inline-block;
      > * {
        margin: 1rem 0;
      }
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
        border-radius: var(--global-radius);
        display: flex;
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
    `};return function(u,...p){const{variant:d="outline",color:b="neutral",size:h="md",Component:f,disabled:v,...y}=u;return a({class:T(c.base,v&&c.disabled,e==null?void 0:e.class,u.class)},r({class:T(d,b,h)},f({disabled:v}),s({type:"file",disabled:v,...y})),i({class:"filename-display"}))}}const rn=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),u=an(t),p=b=>{const h=b.target.files[0];h?l.val=h.name:l.val="No file selected"},d=({disabled:b})=>s({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,b&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return b=>u({Component:d,name:"file",accept:"text/*",onchange:p,...b})},ns=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,u=n.state("No file selected"),p=an(t),d=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},b=({disabled:h})=>c({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,h&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(e("Choose a file to upload")));return()=>s(p({Component:b,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},os=`import classNames from "@grucloud/bau-css/classNames";
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
`,as={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:os,createComponent:ns}],gridItem:rn},rs=t=>{const e=U(t);return()=>e(as)},sn=t=>{const e=ee(t);return n=>e({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},ss=t=>{const{bau:e}=t,{section:n}=e.tags,o=ee(t);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},is=`import input from "@grucloud/bau-ui/input";
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
`,cs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:is,createComponent:ss}],gridItem:sn},ls=t=>{const e=U(t);return()=>e(cs)};function cn(t,e){const{bau:n,css:o,keyframes:a}=t,{div:i}=n.tags,r=()=>et.map(l=>`
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
  `;return function(...u){let[{color:p="neutral",variant:d="plain",size:b="md",running:h,...f}]=Z(u);return i({...f,role:"progressbar",class:{deps:[h],renderProp:()=>v=>T("linearProgress",b,p,c,v&&"running",e==null?void 0:e.class,f==null?void 0:f.class)}})}}const ln=t=>{const e=cn(t);return n=>e({...n,running:!0})},us=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=K(t),i=cn(t),r=e.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),o,i({running:r}))},ds=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ps={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ds,createComponent:us}],gridItem:ln},ms=t=>{const e=U(t);return()=>e(ps)},Mt={sm:12,md:16,lg:24},bs=()=>et.map(t=>`
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
  background-color:transparent;
  & .path {
    stroke: var(--font-color-inverse);
    ;
  }
}
`).join(`
`);function Rt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:i,circle:r}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
  `;return function({size:u="md",color:p="primary",variant:d="outline",visibility:b=!0,...h}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all 0.5s ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${Mt[u]};
      height: ${Mt[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${bs()}
    `;return i({class:{deps:[b],renderProp:()=>v=>T("spinner",f,p,d,v==!1?"":"visibility",e==null?void 0:e.class,h.class)},version:"1.1",x:"0px",y:"0px",width:Mt[u],height:Mt[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},r({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}function un(t,e){const{bau:n,css:o,keyframes:a}=t,{span:i}=n.tags,r=a`
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
  `;return function(...l){let[{color:u,variant:p="plain",size:d="md",loading:b,...h},...f]=Z(l);const v=K(t),y=Rt(t);return n.bind({deps:[b],render:()=>C=>v({...h,class:T("loadingButton",d,p,u,s,C&&"loading",e==null?void 0:e.class,h==null?void 0:h.class)},y({size:d,variant:p,color:u,visibility:C}),i({class:C&&"loading"},f))})}}const dn=t=>{const e=un(t);return n=>e({...n,loading:!0},"Save")},gs=t=>{const{bau:e}=t,{section:n}=e.tags,o=un(t),a=e.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},hs=`import loadingButton from "@grucloud/bau-ui/loadingButton";
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
`,fs={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:hs,createComponent:gs}],gridItem:dn},vs=t=>{const e=U(t);return()=>e(fs)},xs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ws=t=>{const{bau:e,css:n}=t,{span:o,li:a}=e.tags,i=wt(t),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},xs.map(r))},ys=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Cs=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:i}=e.tags,r=wt(t),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},ys.map(s)))},Ss=`import list from "@grucloud/bau-ui/list";
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
`,Es={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ss,createComponent:Cs}],gridItem:ws},ks=t=>{const e=U(t);return()=>e(Es)};function pn(t,e){const{bau:n,css:o}=t,{dialog:a}=n.tags,r=o`
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
    ${(()=>et.map(s=>`
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
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p="md",...d},...b]=Z(c);return a({class:T("modal",r,l,u,p,e==null?void 0:e.class,d==null?void 0:d.class)},...b)}}const mn=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:r}=e.tags,s=K(t),c=pn(t),l=()=>o(Array(10).fill("").map((p,d)=>r(d+1,". Some text here"))),u=p=>{const d=c({id:"my-dialog",...p},a("Header"),l(),i(s({variant:"outline",color:p.color,onclick:()=>{d.close()}},"Cancel"),s({variant:"solid",color:p.color,onclick:()=>{d.close()}},"OK")));return d};return p=>{const d=u(p);return n(s({...p,onclick:()=>{d.showModal()}},"OPEN MODAL"),d)}},Ts=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:r}=e.tags,s="neutral",c=K(t),l=pn(t),u=()=>o(Array(10).fill("").map((d,b)=>r(b+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:s,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},As=`import modal from "@grucloud/bau-ui/modal";
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
`,Ms={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:As,createComponent:Ts}],gridItem:mn},Ds=t=>{const e=U(t);return()=>e(Ms)},Is=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:i}=e.tags,r=K(t),s=te(t),c=()=>r({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=s({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},$s=`import popover from "@grucloud/bau-ui/popover";
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
`,Ns={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:$s,createComponent:Is}]},Bs=t=>{const e=U(t);return()=>e(Ns)};function Ps(t,e){const{bau:n,css:o,config:a}=t,{div:i,a:r,span:s,nav:c}=n.tags,l=o`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
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
  `,u=({text:p})=>({name:d,label:b,href:h})=>r({href:`${a.base}${h}`},s({class:"sublabel"},p),i({class:`label ${p}`},b??d));return function(...d){let[{color:b,variant:h="plain",size:f="md",data:v={},...y}]=Z(d);const{next:C,previous:E}=v;return c({"data-paginationnav":JSON.stringify(v),"aria-label":"pages navigation",...y,class:T("paginationNavigation",f,l,e==null?void 0:e.class,y==null?void 0:y.class)},(E==null?void 0:E.href)&&u({text:"Previous"})(E),(C==null?void 0:C.href)&&u({text:"Next"})(C))}}const _s=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ps(t),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Rs=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,Os={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Rs,createComponent:_s}]},Ls=t=>{const e=U(t);return()=>e(Os)},js=t=>{const{bau:e}=t,{div:n}=e.tags,o=Bt(t);return a=>o({...a},n(`Paper ${a.size??""}`))},zs=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Bt(t);return()=>n(a({size:"md"},o("My content")))},Hs=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Us={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Hs,createComponent:zs}],variantColorTableDisable:!0,gridItem:js},Gs=t=>{const e=U(t);return()=>e(Us)};function bn(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>et.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
  `).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:u="plain",size:p="md",...d}]=Z(c);return a({...d,type:"radio",class:T("radio-button",p,l,u,r,e==null?void 0:e.class,d==null?void 0:d.class)})}}const gn=t=>{const{bau:e,css:n}=t,{label:o,form:a}=e.tags,i=bn(t);return r=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),o("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Fs=t=>{const{bau:e}=t,{label:n,div:o,form:a}=e.tags,i=bn(t),r=e.state("one"),s=({target:c})=>r.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:s})),n("Two",i({id:"two",name:"radio",value:r,oninput:s})),o("Choice: ",r))},Vs=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Ws={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Vs,createComponent:Fs}],gridItem:gn},Zs=t=>{const e=U(t);return()=>e(Ws)},Xs=()=>et.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function hn(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,r=K(t),s=te(t),c=wt(t),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Xs()}
  `,u=n.state(""),p=n.state(!1),d=n.state(0);return function(...h){let[{color:f="neutral",variant:v="outline",size:y="md",id:C,label:E,Option:B,options:_,getOptionLabel:L=({label:g})=>g,...D},...R]=Z(h);const $=()=>{m.openDialog(),m.focus(),p.val=!0},H=()=>{m.closeDialog(),p.val=!1},q=()=>{p.val=!1},nt=g=>{p.val?H():$()},j=({option:g,index:w})=>S=>{u.val=L(g),d.val=w,H()},F=g=>{switch(g.preventDefault(),g.key){case"Escape":H();break;case"ArrowDown":d.val<_.length-1?d.val++:d.val=0;break;case"ArrowUp":d.val<=0?d.val=_.length-1:d.val--;break;case"Enter":p.val?(u.val=L(_[d.val]),H()):$();break}},G=()=>c({tabindex:"0",class:T(f,v)},_.map((g,w)=>i({class:()=>T(d.val==w&&"active"),onclick:j({option:g,index:w})},B(g)))),x=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":E,onclick:nt,color:f,variant:v,size:y},()=>!u.val&&E,u),m=s({id:C,triggerEl:x,contentEl:G(),onClose:q});return a({...D,class:T("select",f,y,l,e==null?void 0:e.class,D==null?void 0:D.class),onkeydown:F},x,m)}}const fn=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=hn(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Ks=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,r=hn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Ys=`import select from "@grucloud/bau-ui/select";
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
`,qs={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Ys,createComponent:Ks}],gridItem:fn},Js=t=>{const e=U(t);return()=>e(qs)};function Ot(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,r=o`
    ${(()=>et.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:u="outline",size:p,...d},...b]=Z(c);return a({...d,type:"range",class:T("slider",l,u,p,r,e==null?void 0:e.class,d.class)},...b)}}const vn=t=>{const{bau:e}=t,n=e.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ot(t);return i=>a({...i,oninput:o})},Qs=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:i}=e.tags,r=e.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=Ot(t);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},ti=`import slider from "@grucloud/bau-ui/slider";
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
`,ei=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:r,br:s,option:c}=e.tags,l=e.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Ot(t);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},ni=`import slider from "@grucloud/bau-ui/slider";
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
`,oi=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:r,br:s,option:c}=e.tags,l=e.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Ot(t);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},ai=`import slider from "@grucloud/bau-ui/slider";
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
`,ri={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ti,createComponent:Qs},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ni,createComponent:ei},{title:"Vertical Mark",description:"A vertical slider with marks.",code:ai,createComponent:oi}],gridItem:vn},si=t=>{const e=U(t);return()=>e(ri)},xn=t=>{const e=Rt(t);return n=>e({...n})},ii=t=>{const{bau:e}=t,{section:n}=e.tags,o=Rt(t);return()=>n(o({}))},ci=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,li={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ci,createComponent:ii}],gridItem:xn},ui=t=>{const e=U(t);return()=>e(li)},di=()=>et.map(t=>`
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
`);function wn(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${di()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:u="md",...p},...d]=Z(s);return a({...p,class:T("switch",i,c,l,u,e==null?void 0:e.class,p.class),type:"checkbox",required:"required"},...d)}}const yn=t=>{const{bau:e,css:n}=t,{form:o,label:a}=e.tags,i=wn(t);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},pi=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i}=e.tags,r=wn(t);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},mi=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,bi={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:mi,createComponent:pi}],gridItem:yn},gi=t=>{const e=U(t);return()=>e(bi)},hi=()=>et.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function yt(t,e){const{bau:n,css:o}=t,{tabDefs:a}=e,{div:i,ul:r,li:s}=n.tags,c=n.state(a),l=n.state(a[0]),u=d=>c.val.find(b=>b.name==d),p={base:o`
      display: flex;
      flex-direction: column;
      & ul {
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
      ${hi()}
    `};return function(...b){let[{color:h,variant:f="plain",size:v,...y},...C]=Z(b);const E=_=>{const{Header:L,disabled:D,name:R}=_;return s({class:()=>T(l.val.name==R&&"active",D&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:R},bubbles:!0}))},L(_))},B=i({class:T("tabs",p.base,f,v,h,e==null?void 0:e.class,y.class)},n.loop(c,r(),E),()=>l.val.Content?l.val.Content({}):"");return B.addEventListener("tab.select",_=>{var R,$;const{tabName:L}=_.detail,D=u(L);D&&((R=l.val.exit)==null||R.call(),l.val=D,($=D.enter)==null||$.call())},!1),B.addEventListener("tab.add",_=>{var D;const{tab:L}=_.detail;(D=L.enter)==null||D.call(),c.val.push(L)},!1),B.addEventListener("tab.remove",_=>{var D;const L=c.val.findIndex(R=>R.name==_.detail.tabName);L>0&&((D=c.val[L].exit)==null||D.call(),c.val.splice(L,1))},!1),B}}const Cn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},fi=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},vi=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,xi=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},wi=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Sn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},yi=t=>{const{css:e}=t,n=yt(t,{tabDefs:Sn(t)});return()=>n({variant:"outline",color:"neutral",class:e`
        flex-direction: column-reverse;
      `})},Ci=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Si=t=>{const{css:e}=t,n=Sn(t),o=yt(t,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:e`
        & ul {
          justify-content: center;
        }
      `})},Ei=`import tabs from "@grucloud/bau-ui/tabs";
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
`,ki={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:vi,createComponent:fi},{title:"Extended Tabs",description:"An extended tabs.",code:wi,createComponent:xi},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Ci,createComponent:yi},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Ei,createComponent:Si}],gridItem:Cn},Ti=t=>{const e=U(t);return()=>e(ki)};function Ct(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=Z(c);return i({...l,class:T("table-container",r,e==null?void 0:e.class,l==null?void 0:l.class)},...u)}}const Ai=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=e.tags;function p(v,y,C,E,B){return{name:v,calories:y,fat:C,carbs:E,protein:B}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],b=({name:v,calories:y})=>r(i(v),i({class:n`
            text-align: right;
          `},y)),h=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Ct(t,{class:n`
      max-width: 650px;
    `});return()=>o(f(s(u("Basic Table"),h(),l(d.map(b)))))},Mi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function gt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Di=[gt("Frozen yoghurt",159,6,24,4),gt("Ice cream sandwich",237,9,37,4.3),gt("Eclair",262,16,24,6),gt("Cupcake",305,3.7,67,4.3),gt("Gingerbread",356,16,49,3.9)],Ii=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=e.tags,p=({name:h,calories:f})=>r(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ct(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(s(u("Table Dense"),d(),l(Di.map(p)))))},$i=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ht(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Ni=[ht("Frozen yoghurt",159,6,24,4),ht("Ice cream sandwich",237,9,37,4.3),ht("Eclair",262,16,24,6),ht("Cupcake",305,3.7,67,4.3),ht("Gingerbread",356,16,49,3.9)],Bi=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:u}=e.tags,p=({name:h,calories:f})=>r(i(h),i({class:n`
            text-align: right;
          `},f)),d=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Ct(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(s(u("Table Zebra"),d(),l(Ni.map(p)))))},Pi=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,_i={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Mi,createComponent:Ai},{title:"Dense",description:"A dense table.",code:$i,createComponent:Ii},{title:"Zebra",description:"A zebra table.",code:Pi,createComponent:Bi}]},Ri=t=>{const e=U(t);return()=>e(_i)};function En(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=ne(t),r=K(t),s=Rt(t),c=o`
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
  `,l=({label:h,icon:f,...v})=>r({"aria-label":h,title:h,...v},f),u=({count:h,totalCount:f,page:v,rowsPerPage:y})=>a({class:"pages-numbers"},Number(v-1)*Number(y)+(h>0?1:0),"-",Math.min(v*y,f)," of ",f),p=({count:h,page:f,rowsPerPage:v})=>a({class:"pages-numbers"},(f-1)*v+(h>0?1:0),"-",f*v),d=h=>h<=1,b=(h,f,v)=>h>=Math.ceil(f/v);return function(...f){let[{count:v=0,totalCount:y=0,page:C=1,rowsPerPage:E=50,onPageChange:B,isLoading:_=!1,disableFirst:L=()=>d(C),disablePrevious:D=()=>d(C),disableNext:R=()=>b(C,y,E),disableLast:$=()=>b(C,y,E),...H},...q]=Z(f);const nt=Math.max(0,Math.ceil(y/E)),j=B({page:1}),F=B({page:C-1}),G=B({page:C+1}),x=B({page:nt}),m=[{label:"First",icon:"⟪",onclick:j,disabled:L()},{label:"Previous",icon:"⟨",onclick:F,disabled:D()},{label:"Next",icon:"⟩",onclick:G,disabled:R()},{label:"Last",icon:"⟫",onclick:x,disabled:$()}];return a({...H,class:T("table-pagination",c,_&&"disabled",e==null?void 0:e.class,H==null?void 0:H.class)},s({class:"spinner",visibility:_,size:"md"}),y>0?u({count:v,totalCount:y,page:C,maxPages:nt,rowsPerPage:E}):p({count:v,page:C,maxPages:nt,rowsPerPage:E}),i({variant:"outline",color:"neutral"},m.map(g=>l({...g,variant:"outline",color:"neutral"}))))}}const Oi=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Li=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=e.tags,l=Oi(45),u=({name:C,email:E})=>i(a(C),a(E)),p=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=En(t),b=Ct(t,{class:n`
      max-width: 650px;
    `}),h=e.state(l),f=e.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),v=e.derive(()=>h.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),y=({page:C})=>E=>{f.val.page=C};return()=>b(r(p(),()=>c(v.val.map(u))),()=>d({...f.val,onPageChange:y}))},ji=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=e.tags,u=e.state(!1),p=e.state([]),d=e.state(""),b=e.derive(()=>p.val.length),h=e.state(1),f=e.state(10),v=e.derive(()=>p.val),y=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,C=({page:$})=>H=>{h.val=$,E(y({page:$,per_page:f.val}))};E(y({page:1,per_page:f.val}));async function E($){try{u.val=!0;const H=await fetch($,{});if(H.ok){const q=await H.json();p.val=q;return}throw H}catch(H){d.val=H.message}finally{u.val=!1}}const B=({name:$,description:H,stargazers_count:q})=>i(a($),a(H),a({class:n`
            text-align: right;
          `},q)),_=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),L=En(t),D=Ct(t,{class:n`
      min-width: 650px;
    `}),R=({message:$})=>l($);return()=>D(()=>L({rowsPerPage:f.val,page:h.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:C,disableNext:()=>!1}),r(_(),()=>d.val&&R({message:d.val}),()=>c(v.val.map(B))))},zi=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:i,h2:r,tr:s}=e.tags,c=Li(t),l=ji(t),u=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function oe(t,e){const{bau:n,css:o,window:a}=t,{div:i}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",color:p="neutral",variant:d="outline",size:b="md",...h},...f]=Z(c);const v=i({class:T("container",...u.split("-"))},i({class:T("content",p,d,b),role:"tooltip"},l)),y=D=>`move-to-${D}`,C=(D,R,$)=>{if(D()){const H=y(R);v.classList.add(H),v.classList.add(R),v.classList.remove($)}},E=(D,R)=>{const $=y(D);v.classList.contains($)&&(v.classList.remove($),v.classList.add(R),v.classList.remove(D))},B=D=>{const R=v.getBoundingClientRect();C(()=>R.x<0,"right","left"),C(()=>R.x+R.width>a.innerWidth,"left","right"),C(()=>R.y<0,"bottom","top"),C(()=>R.bottom>a.innerHeight,"top","bottom"),v.classList.add("visible")},_=D=>{v.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return i({...h,class:T("tooltip",r,e==null?void 0:e.class,h==null?void 0:h.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",B),D.addEventListener("mouseout",_)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",B),D.removeEventListener("mouseout",_)}},...f,v)}}const kn=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i}=e.tags,r=K(t),s=oe(t),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},Hi=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,i=K(t),r=oe(t),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},Ui=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Gi=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i,section:r}=e.tags,s=(...p)=>$t(t)({variant:"outline",color:"primary"},p),c=oe(t),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>r({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},s("bottom start")),c({side:"bottom-centered",titleEl:l()},s("bottom centered")),c({side:"bottom-end",titleEl:l()},s("bottom end"))));return()=>u()},Fi=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Vi={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Ui,createComponent:Hi},{title:"Grid",description:"Various tooltip position",code:Fi,createComponent:Gi}],gridItem:kn},Wi=t=>{const e=U(t);return()=>e(Vi)},Tn=t=>{const e=Zt(t);return n=>e(n)},Zi=t=>{const{bau:e}=t,{section:n}=e.tags,o=Zt(t);return()=>n(o({}))},Xi=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Ki={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Xi,createComponent:Zi}],gridItem:Tn},Yi=t=>{const e=U(t);return()=>e(Ki)},qi=({css:t,createGlobalStyles:e})=>(e`
:root {
  --treeview-link-padding-horizontal: 0.75rem;
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

      & li {
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
  `});function An(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:i}=e,{ul:r,li:s,nav:c,div:l}=n.tags,u=qi({css:o,createGlobalStyles:a}),p=Qt(t),d=({depth:b=1,maxDepth:h,color:f,variant:v,size:y})=>C=>{const{children:E,expanded:B}=C,_=n.state(!B),L=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:R=>{E&&(_.val=!_.val)}},i(C.data)),D=()=>r({class:T(f,y)},E.map(d({depth:b+1,maxDepth:h})));return s(p({Header:L,Content:E&&b<h&&D}))};return function({tree:h,maxDepth:f=1/0,size:v="md",variant:y="plain",color:C="neutral",...E}){return c({class:T(u.nav,v,y,C,e==null?void 0:e.class,E.class)},h.children&&r(h.children.map(d({maxDepth:f,color:C,variant:y,size:v}))))}}const Mn=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=An(t,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},Ji=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=An(t,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},Qi=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,tc={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Qi,createComponent:Ji}],gridItem:Mn},ec=t=>{const e=U(t);return()=>e(tc)},nc=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:i,p:r,ul:s,li:c}=e.tags,l=Le(t),u=K(t),p=[{name:"Accordion",Item:je(t)},{name:"Alert",Item:He(t)},{name:"Autocomplete",Item:Ve(t)},{name:"Avatar",Item:Ge(t)},{name:"Badge",Item:Ze(t)},{name:"Breadcrumbs",Item:Ke(t)},{name:"Button",Item:Ye(t)},{name:"Button Group",Item:qe(t)},{name:"Calendar",Item:Qe(t)},{name:"Checkbox",Item:nn(t)},{name:"Chip",Item:tn(t)},{name:"DrillDown Menu",Item:on(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:rn(t)},{name:"Input",Item:sn(t)},{name:"Linear Progress",Item:ln(t)},{name:"Loading Button",Item:dn(t)},{name:"Modal",Item:mn(t)},{name:"Radio Button",Item:gn(t)},{name:"Select",Item:fn(t)},{name:"Slider",Item:vn(t)},{name:"Spinner",Item:xn(t)},{name:"Switch",Item:yn(t)},{name:"Tabs",Item:Cn(t)},{name:"Theme Switch",Item:Tn(t)},{name:"Tooltip",Item:kn(t)},{name:"Tree View",Item:Mn(t)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:d})=>c(u({color:"primary",variant:"solid",href:`#${d}`,size:"sm"},d)))),p.map(d=>a({id:d.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(d))))},oc=({context:t})=>[{path:"",action:e=>({title:"Bau UI",component:fo(t)})},{path:"GettingStarted",action:e=>({title:"Getting Started",component:ya(t)})},{path:"components",action:()=>({title:"Component",component:nc(t)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:$a(t)})},{path:"alert",action:()=>({title:"Alert",component:za(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Va(t)})},{path:"animate",action:()=>({title:"Animate",component:qa(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:ir(t)})},{path:"avatar",action:()=>({title:"Avatar",component:er(t)})},{path:"badge",action:()=>({title:"Badge",component:dr(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:gr(t)})},{path:"button",action:()=>({title:"Button",component:xr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Er(t)})},{path:"calendar",action:()=>({title:"Calendar",component:Mr(t)})},{path:"carousel",action:()=>({title:"Carousel",component:Pr(t)})},{path:"chip",action:()=>({title:"Chip",component:Lr(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Ur(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:Wr(t)})},{path:"drawer",action:()=>({title:"Drawer",component:qr(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:es(t)})},{path:"fileInput",action:()=>({title:"File Input",component:rs(t)})},{path:"input",action:()=>({title:"Input",component:ls(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ms(t)})},{path:"list",action:()=>({title:"List",component:ks(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:vs(t)})},{path:"modal",action:()=>({title:"Modal",component:Ds(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Ls(t)})},{path:"paper",action:()=>({title:"Paper",component:Gs(t)})},{path:"popover",action:()=>({title:"Popover",component:Bs(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Zs(t)})},{path:"select",action:()=>({title:"Select",component:Js(t)})},{path:"slider",action:()=>({title:"Slider",component:si(t)})},{path:"spinner",action:()=>({title:"Spinner",component:ui(t)})},{path:"switch",action:()=>({title:"Switch",component:gi(t)})},{path:"table",action:()=>({title:"Table",component:Ri(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:zi(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Ti(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Wi(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Yi(t)})},{path:"treeView",action:()=>({title:"Tree View",component:ec(t)})}]},{path:"pages",action:e=>({title:"Pages",component:wo(t)})}],ac=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),rc=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=t,r=a.state(),s=e({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:b=e}=l.resolve({pathname:u});r.val=d,document.title=`${p}`}},sc=t=>{const{createGlobalStyles:e}=t;e`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};Kn();const Dn={title:"Bau",base:"/bau/bau-ui"},lt=oo({config:Dn}),{bau:ic}=lt;lt.states={drawerOpen:ic.state(!0)};sc(lt);jn({routes:oc({context:lt}),onLocationChange:rc({context:lt,LayoutDefault:mo(lt),config:Dn}),notFoundRoute:ac(lt)});
