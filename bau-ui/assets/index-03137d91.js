(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const Jn=(e,t)=>({...e,paths:[...t,e.path]}),Pt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Jn(o,e);return n?[a,...Pt({paths:[...e,o.path],routes:n})]:a}),Yn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Qn=({routes:e=[],notFoundRoute:t})=>{const n=Pt({routes:e}).map(o=>({...o,regex:Yn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function eo({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},s=Qn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:s}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,r,l)=>{i.apply(r,l),o.pathname!=window.location.pathname&&n({router:s}),a(window.location)}}),document.addEventListener("click",i=>{const{target:r}=i,l=r.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:s}),s}const at=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],to=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],no=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],wt=e=>`var(--color-${e})`,oo=e=>`var(--color-${e}-lightest)`,ao=()=>at.map(([e])=>`
.outline.${e} {
  border: 1px solid ${wt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${oo(e)};
}
.solid.${e} {
  background-color: ${wt(e)};
}
`).join(`
`),ro=()=>at.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),so=e=>100-e*10,io=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${so(t)}%);`).join(`
`),St=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),co=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...to.map(([a,s])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),...no.map(([a,s])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function lo({createGlobalStyles:e},{colorPalette:t=at}={}){e`
    * {
      margin: 0;
      padding: 0;
    }
    p {
      margin:0.4rem 0;
    }
    ul {
      padding-left:1rem
    }
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
      ${St({})}
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
    html:has(dialog[open]) {
      overflow: hidden;
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
      --brightness-hover-reverse: 70% ${St({dark:!0})};
    }
  `}function uo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let rt=e=>Object.prototype.toString.call(e??0).slice(8,-1),po=e=>rt(e)=="Object",Ct=e=>rt(e)=="Function",tt=e=>["Object","Array"].includes(rt(e)),Et=Object.getPrototypeOf,nt=e=>we(e)?e.val:e,we=e=>e==null?void 0:e.__isState,mo=["splice","push","pop","shift","unshift","sort","reverse"],He=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const Z=e=>!we(e[0])&&po(e[0])?e:[{},...e];function go(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,s=new Set,i=!1,r,l=S=>n.createElement(S),c=(S,g,v)=>{let C=r;r=g;let E=S(v);return r=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(S=>{S.bindings=S.bindings.filter(g=>{var v;return(v=g.element)==null?void 0:v.isConnected}),!S.bindings.length&&!S.computed&&a.delete(S)}),o=void 0}))},d=(S,g,v,C,E,L)=>{var z;if(i){s.add(S);return}for(let V of S.bindings){let{deps:U,element:$,renderInferred:J,render:ne,renderItem:G}=V;if(G&&g)(z=m($,C,(...ee)=>f(G(...ee)),v,E,L)[g])==null||z.call();else{let ee=J?J({element:$}):ne({element:$,renderItem:G})(...U.map(nt));ee!==$&&$.replaceWith(V.element=f(ee))}}w(S),u()},p=(S,g,v=[])=>({get(C,E,L){var z;if(r==null||r.add(S),E==="_isProxy")return!0;if(!((z=C[E])!=null&&z._isProxy)&&!we(C[E])&&tt(C[E]))C[E]=new Proxy(C[E],p(S,g,[...v,E]));else if(mo.includes(E)){let V=C[E];return(...U)=>{let $=V.apply(C,U);return d(S,E,$,U,g,v),$}}return Reflect.get(C,E,L)},set(C,E,L,z){let V=Reflect.set(C,E,L,z);return d(S,"setItem",V,{prop:E,value:L},g,[...v,E]),V}}),b=(S,g)=>new Proxy(g,p(S,g)),m=(S,g,v,C,E,L)=>{let z=()=>S.replaceChildren(...He(C,v)),V=U=>S[U]&&S.removeChild(S[U]);return{assign:z,sort:z,reverse:z,setItem:()=>{var $;let U=L[0];($=S.children[U])==null||$.replaceWith(v(E[U],U))},push:()=>S.append(...He(g,(U,$)=>v(U,E.length+$))),unshift:()=>S.prepend(...He(g,v)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:U}=S.children;let[$,J=U,...ne]=g;for(let G=$>=0?Math.min($+J-1,U-1):U-1;G>=($>=0?$:U+$);G--)S.children[G].remove();if(ne.length){let G=ne.forEach((ee,re)=>v(ee,$+re));S.children[$]?S.children[$].after(...G):S.append(...G)}}}},h=S=>({oldVal:S,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return r==null||r.add(g),g.valProxy??(g.valProxy=tt(S)?b(g,S):S,g.valProxy)},set val(g){let v=this,C=v.val;tt(g)?(v.valProxy=b(v,g),d(v,"assign",g)):g!==C&&(v.valProxy=g,d(v)),v.oldVal=C}}),f=S=>{if(S==null||S===!1){const g=l("span");return g.style.display="none",g}else return S.nodeType?S:n.createTextNode(S)},x=(S,g)=>{let v=new Set;return g.val=c(S,v),v},y=S=>{let g=h(),v=x(S,g);g.computed=!0;for(let C of v)C.listeners.push({computed:S,deps:v,state:g});return g},w=S=>{for(let g of[...S.listeners])x(g.computed,g.state)},k=(S,...g)=>{if(g.length){let v=[];for(let C of g.flat(1/0))C!=null&&v.push(we(C)?R({deps:[C],render:()=>E=>E}):Ct(C)?j({renderInferred:C}):f(C));S.append(...v)}},A={},B=(S,g)=>S&&(Object.getOwnPropertyDescriptor(S,g)??B(Et(S),g)),T=(S,g,v)=>{var C;return A[S+","+g]??(A[S+","+g]=((C=B(v,g))==null?void 0:C.set)??0)},M=(S,g)=>new t.MutationObserver((v,C)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(L=>L===S&&(g({element:S}),C.disconnect(),!0)))}).observe(S.parentNode,{childList:!0}),P=(S,g)=>new t.MutationObserver((v,C)=>v.forEach(E=>g({record:E,element:S}))).observe(S,{childList:!0}),O=S=>new Proxy(function(v,...C){var V;let[E,...L]=Z(C),z=S?n.createElementNS(S,v):l(v);for(let[U,$]of Object.entries(E)){if(U.startsWith("bau"))continue;let J=T(v,U,Et(z))?ne=>ne!==void 0&&(z[U]=ne):ne=>z.setAttribute(U,ne);$==null||(we($)?R({deps:[$],render:()=>()=>(J($.val),z)}):Ct($)&&(!U.startsWith("on")||$.isDerived)?j({renderInferred:()=>(J($({element:z})),z)}):$.renderProp?R({deps:$.deps,render:()=>()=>(J($.renderProp({element:z})(...$.deps.map(nt))),z)}):J($))}return E.bauChildMutated&&P(z,E.bauChildMutated),k(z,...L),z.autofocus&&z.focus&&t.requestAnimationFrame(()=>z.focus()),(V=E.bauCreated)==null||V.call(E,{element:z}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:z})),E.bauUnmounted&&t.requestAnimationFrame(()=>M(z,E.bauUnmounted)),z},{get:(g,v)=>g.bind(void 0,v)}),N=(S,g,v)=>{S.element=f(v);for(let C of g)we(C)&&(a.add(C),C.bindings.push(S));return S.element},j=({renderInferred:S,element:g})=>{let v=new Set,C=c(S,v,{element:g});return N({renderInferred:S},v,C)},R=({deps:S,element:g,render:v,renderItem:C})=>N({deps:S,render:v,renderItem:C},S,v({element:g,renderItem:C})(...S.map(nt))),H=(S,g,v)=>R({deps:[S],render:({renderItem:C})=>E=>(g.append(...He(E,C)),g),renderItem:v}),K=S=>{i=!0,S(),i=!1,s.forEach(d),s.clear()};return{tags:O(),tagsNS:O,state:h,bind:R,loop:H,derive:y,stateSet:a,batch:K}}const bo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},ho=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},fo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function vo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...s)=>{const i=fo(a,s),r=bo(i);return!t.getElementById(r)&&ho(t,e==null?void 0:e.target,r,o(r,i)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function xo(e){const t=go(),n=vo();return lo(n),{bau:t,...n,tr:o=>o,window,...e}}function D(...e){return e.filter(t=>t).join(" ")}function We(e,t={}){const{bau:n,window:o}=e,{div:a}=n.tags,s=()=>{};return function({animationHide:r=s,animationShow:l=s,...c},u){return a({class:D("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(b=>{if(!r()||b.getAttribute("cloned"))return;const m=b.cloneNode(!0);o.requestAnimationFrame(()=>{m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=b.getAttribute("width"),m.style.height=b.getAttribute("height"),m.style.position="absolute",m.style.animation=r(),d.target.appendChild(m),m.addEventListener("animationend",()=>{var h;return(h=m.parentNode)==null?void 0:h.removeChild(m)})})}),[...d.addedNodes].forEach(b=>{b.getAttribute("cloned")||o.requestAnimationFrame(()=>{p.style.position="relative";const m=b.getBoundingClientRect();if(b.setAttribute("width",m.width+"px"),b.setAttribute("height",m.height+"px"),l()){b.style.animation=l();const h=()=>{b.removeEventListener("animationend",h),b.style.animation=""};b.addEventListener("animationend",h)}})})},...c},u)}}const oe=["neutral","primary","success","danger","warning"],yo=["plain","outline","solid"],wo=["sm","md","lg"],So=()=>oe.map(e=>`
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
    ${So()}
  `;return function(...i){let[{size:r=t.size??"md",variant:l=t.variant??"none",color:c=t.color??"none",href:u,...d},...p]=Z(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:D("button",t.class,l,r,c,a,d.class),href:u},p)}}const Co="light",Eo=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function st(e,t={}){const{bau:n,css:o,window:a}=e,{input:s}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},l=r();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Co);const c=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:b=t.variant??"plain",color:m=t.color??"neutral",...h},...f]=Z(d);return s({required:"required",title:"Switch Theme",...h,class:D("theme-switch",m,b,p,c,t==null?void 0:t.class,h.class),type:"checkbox",checked:r()=="dark",onclick:x=>{i(x.target.checked?"dark":"light")}},...f)}}function ko(e){const{tr:t,bau:n,css:o,config:a,states:s}=e,{i,header:r,h1:l,div:c,a:u,img:d,b:p,ul:b,li:m}=n.tags,{svg:h,path:f}=n.tagsNS("http://www.w3.org/2000/svg"),x=s.drawerOpen,y=X(e,{class:o`
      background: transparent;
    `}),w=st(e),k=()=>i(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},f({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},y({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},k()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),B=()=>c({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},w(),y({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},A(),B())}}function Ao({tr:e,bau:t,css:n}){const{section:o,footer:a,span:s,a:i,ul:r,li:l,p:c,div:u,h1:d}=t.tags,p=({links:h,title:f})=>o({class:n`
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
        `},d(f),r(h.map(({href:x,name:y})=>l(i({href:x},y))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],m=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:b}),p({title:"Bau Ecosystem",links:m})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},s("v0.63.1"),s("MIT license")))}}function fe(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=Z(r);return a({...d,class:D("list",s,u,c,l,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const Ue="0.3s",Lt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,s={...a};return s.children=o==null?void 0:o.map(Lt({parent:n,grandParent:e})),e&&(e.parentTree=t),s.parentTree=e,s},zt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=zt(e)(t.children[o]);if(a)return a}},To=({keyframes:e})=>({hideToLeft:e`
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
   `});function it(e,t={}){const{bau:n,css:o,window:a,config:s}=e,{base:i="",hashBased:r=!1}=t,l=`${s.base}${i}`,c=S=>{var g;return((g=S.parentTree.data)==null?void 0:g.href)??S.parentTree.children[0].data.href},u=({variant:S,color:g,size:v,currentTree:C,data:E})=>w(T({variant:S,color:g,size:v,href:`${l}${c(C)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:S,color:g,size:v,href:`${l}${E.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},E.name)),d=({size:S,subTree:{data:{name:g,href:v},children:C=[]}})=>T({size:S,href:`${l}${v}`,"data-ischild":!C.length},g),p=({pathname:S,subTree:g})=>{var v;return S===((v=g==null?void 0:g.data)==null?void 0:v.href)},{renderHeader:b=u,renderMenuItem:m=d,isActive:h=p}=t,{li:f,nav:x,div:y,header:w,a:k}=n.tags,A=We(e),B=fe(e),T=X(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:M,hideToRight:P}=To(e),O=o`
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
  `,N=({children:S,pathnameState:g,variant:v,color:C,size:E})=>B({class:D(v,C,E)},S.map(L=>f({class:()=>D(L.children&&"has-children",h({pathname:g.val,subTree:L})&&"active")},m({variant:v,color:C,size:E,subTree:L})))),j=({variant:S,color:g,size:v,currentTree:C,pathnameState:E})=>{const{children:L,parentTree:z,data:V,renderList:U}=C;return y({class:D("drillDownMenu",S,g,v)},z&&b({variant:S,color:g,size:v,data:V,currentTree:C}),L&&U?U({renderListDefault:N,children:L,pathnameState:E,variant:S,color:g,size:v}):N({children:L,pathnameState:E,variant:S,color:g,size:v}))},R=({tree:S,pathname:g})=>{let v=Lt({})({...S}),C=zt(g)(v);return C||(C=v),C},H=n.state(a.location.pathname.replace(l,"")),K=({target:S})=>{let v=S.closest("a").getAttribute("href").replace(l,"");return r||(v=v.replace(S.hash,"")),v};return function(g){const{size:v=t.size??"md",variant:C=t.variant??"plain",color:E=t.color??"neutral",tree:L,...z}=g;let V=R({tree:L,pathname:H.val}),U;a.document.addEventListener("click",G=>{const{target:ee}=G,re=ee.closest("a");if(!re)return;const ce=re.getAttribute("href");if(ce&&!ce.startsWith("http")&&!ce.startsWith("#")&&!ce.startsWith("?")){V=R({tree:L,pathname:K(G)});const{ischild:me}=G.target.dataset;me!=="true"&&(H.val=K({target:ee}))}});const $=G=>{const{buttonback:ee,ischild:re}=G.target.dataset;ee=="true"?U=-1:re=="false"?U=1:re=="true"&&(U=0)},J=G=>{switch(G){case 1:return`${M} ${Ue}`;case-1:return`${P} ${Ue}`;default:return""}},ne=G=>{switch(G){case 1:return`${P} ${Ue} reverse`;case-1:return`${M} ${Ue} reverse`;default:return""}};return x({class:D(O,C,E,v,t==null?void 0:t.class,z.class),onclick:$},A({animationHide:()=>J(U),animationShow:()=>ne(U)},n.bind({deps:[H],render:()=>()=>j({variant:C,color:E,size:v,currentTree:V,pathnameState:H})})))}}const Do=()=>oe.map(e=>`
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
`);function de(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
    ${Do()}
  `;return function(r){const{variant:l=t.variant??"outline",color:c=t.color??"neutral",...u}=r;return a({type:"text",...u,class:D("input",t.class,t.size??"md",c,l,s,u.class)})}}function ct(e,t={}){const{bau:n,css:o,window:a}=e,s=de(e,t);return function(r){const{variant:l=t.variant??"outline",color:c=t.color??"neutral",...u}=r,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return s({type:"search",...u,color:c,variant:l,class:D("inputSearch",t.class,b,u.class)})}}function _t(e){const{tr:t,bau:n,css:o,config:a,states:s,window:i}=e,{div:r,ul:l,li:c,nav:u,a:d,span:p}=n.tags,b=ct(e,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:y,children:w,pathnameState:k,variant:A,color:B,size:T})=>{const M=n.state(""),P=n.derive(()=>M.val==""?w:w.filter(N=>N.data.name.match(new RegExp(`${M.val}`,"i")))),O=N=>{M.val=N.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},b({autocomplete:!1,name:"search",autofocus:!0,value:M,placeholder:`Search ${P.val.length} components`,size:22,oninput:O}),()=>y({children:P.val,pathnameState:k,variant:A,color:B,size:T}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let f=!1;const x=it(e);return function(){return r({bauMounted:({element:w})=>{i.innerWidth<=640&&(f=!0,s.drawerOpen.val=!1)},onclick:w=>{f&&!w.target.dataset.buttonback&&!w.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:D(o`
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
          `)},x({tree:h}))}}const Mo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:s}=t.tags,i=We(e),r=ko(e),l=_t(e),c=Ao(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:b}){return s({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>b.val),c())}};function Ie(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...b]=Z(r);return a({...p,onclick:d,class:D("chip",t.class,l,c,u,d&&"clickable",s,p.class)},...b)}}function Io(e){const{bau:t,css:n,config:o}=e,{div:a,h1:s,h2:i,p:r}=t.tags;X(e);const l=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:l},s(u),i(d),r(p))}}function No(e){const{bau:t,css:n}=e,{div:o,h1:a,p:s}=t.tags,i=n`
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
  `,r=({title:l,Content:c})=>o({className:"feature"},a(l),s(c()));return function({featuresContent:c}){return o({class:i},c.map(r))}}function $o({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:s,dd:i,div:r,aside:l,footer:c,a:u}=t.tags,d=({maxSize:p=151})=>({libName:b,size:m})=>r({class:n`
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
                  var(--color-success) ${m/p*100}%
                );
                justify-content: flex-end;
                width: ${m/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},m)));return function({data:b=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Bo(e){const{bau:t,css:n,config:o}=e,{div:a,p:s,a:i,section:r}=t.tags,l=Io(e),c=No(e),u=X(e);Ie(e);const d=$o(e),p=(...x)=>a({class:n`
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
          `},...x)),b=n``,m=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[s("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[s("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]}],f=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:h}),d({data:m}),f())}}function Oo(e,t={}){const{bau:n,css:o}=e,{div:a,form:s,span:i,pre:r,h3:l,h4:c}=n.tags;return function(d,...p){return a("Login")}}const Po=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:s,h2:i}=n.tags,r=Oo(e);return()=>o({id:"login"},i(t("Login Examples")),s("Basic"),a(r()))};function Lo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:s,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(t("Pages Examples")),Po(e)()))}}function zo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Rt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Rt(n)}),e}class kt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function jt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function pe(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const _o="</span>",At=e=>!!e.scope,Ro=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class jo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=jt(t)}openNode(t){if(!At(t))return;const n=Ro(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){At(t)&&(this.buffer+=_o)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Tt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class lt{constructor(){this.rootNode=Tt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Tt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{lt._collapse(n)}))}}class Ho extends lt{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function De(e){return e?typeof e=="string"?e:e.source:null}function Ht(e){return ve("(?=",e,")")}function Uo(e){return ve("(?:",e,")*")}function Fo(e){return ve("(?:",e,")?")}function ve(...e){return e.map(n=>De(n)).join("")}function Go(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ut(...e){return"("+(Go(e).capture?"":"?:")+e.map(o=>De(o)).join("|")+")"}function Ut(e){return new RegExp(e.toString()+"|").exec("").length-1}function Vo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Wo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function dt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let s=De(o),i="";for(;s.length>0;){const r=Wo.exec(s);if(!r){i+=s;break}i+=s.substring(0,r.index),s=s.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?i+="\\"+String(Number(r[1])+a):(i+=r[0],r[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(t)}const Xo=/\b\B/,Ft="[a-zA-Z]\\w*",pt="[a-zA-Z_]\\w*",Gt="\\b\\d+(\\.\\d+)?",Vt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Wt="\\b(0b[01]+)",Zo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ve(t,/.*\b/,e.binary,/\b.*/)),pe({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Me={begin:"\\\\[\\s\\S]",relevance:0},qo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Me]},Jo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Me]},Yo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Xe=function(e,t,n={}){const o=pe({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ut("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ve(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Qo=Xe("//","$"),ea=Xe("/\\*","\\*/"),ta=Xe("#","$"),na={scope:"number",begin:Gt,relevance:0},oa={scope:"number",begin:Vt,relevance:0},aa={scope:"number",begin:Wt,relevance:0},ra={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Me,{begin:/\[/,end:/\]/,relevance:0,contains:[Me]}]}]},sa={scope:"title",begin:Ft,relevance:0},ia={scope:"title",begin:pt,relevance:0},ca={begin:"\\.\\s*"+pt,relevance:0},la=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Fe=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Xo,IDENT_RE:Ft,UNDERSCORE_IDENT_RE:pt,NUMBER_RE:Gt,C_NUMBER_RE:Vt,BINARY_NUMBER_RE:Wt,RE_STARTERS_RE:Zo,SHEBANG:Ko,BACKSLASH_ESCAPE:Me,APOS_STRING_MODE:qo,QUOTE_STRING_MODE:Jo,PHRASAL_WORDS_MODE:Yo,COMMENT:Xe,C_LINE_COMMENT_MODE:Qo,C_BLOCK_COMMENT_MODE:ea,HASH_COMMENT_MODE:ta,NUMBER_MODE:na,C_NUMBER_MODE:oa,BINARY_NUMBER_MODE:aa,REGEXP_MODE:ra,TITLE_MODE:sa,UNDERSCORE_TITLE_MODE:ia,METHOD_GUARD:ca,END_SAME_AS_BEGIN:la});function ua(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function da(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function pa(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ua,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ma(e,t){Array.isArray(e.illegal)&&(e.illegal=ut(...e.illegal))}function ga(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ba(e,t){e.relevance===void 0&&(e.relevance=1)}const ha=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ve(n.beforeMatch,Ht(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},fa=["of","and","for","in","not","or","if","then","parent","list","value"],va="keyword";function Xt(e,t,n=va){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(s){Object.assign(o,Xt(e[s],t,s))}),o;function a(s,i){t&&(i=i.map(r=>r.toLowerCase())),i.forEach(function(r){const l=r.split("|");o[l[0]]=[s,xa(l[0],l[1])]})}}function xa(e,t){return t?Number(t):ya(e)?0:1}function ya(e){return fa.includes(e.toLowerCase())}const Dt={},he=e=>{console.error(e)},Mt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ye=(e,t)=>{Dt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Dt[`${e}/${t}`]=!0)},Ve=new Error;function Zt(e,t,{key:n}){let o=0;const a=e[n],s={},i={};for(let r=1;r<=t.length;r++)i[r+o]=a[r],s[r+o]=!0,o+=Ut(t[r-1]);e[n]=i,e[n]._emit=s,e[n]._multi=!0}function wa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw he("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ve;if(typeof e.beginScope!="object"||e.beginScope===null)throw he("beginScope must be object"),Ve;Zt(e,e.begin,{key:"beginScope"}),e.begin=dt(e.begin,{joinWith:""})}}function Sa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw he("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ve;if(typeof e.endScope!="object"||e.endScope===null)throw he("endScope must be object"),Ve;Zt(e,e.end,{key:"endScope"}),e.end=dt(e.end,{joinWith:""})}}function Ca(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ea(e){Ca(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),wa(e),Sa(e)}function ka(e){function t(i,r){return new RegExp(De(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=Ut(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=t(dt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const c=l.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new n;return this.rules.slice(r).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(r);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(r)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const r=new o;return i.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&r.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&r.addRule(i.illegal,{type:"illegal"}),r}function s(i,r){const l=i;if(i.isCompiled)return l;[da,ga,Ea,ha].forEach(u=>u(i,r)),e.compilerExtensions.forEach(u=>u(i,r)),i.__beforeBegin=null,[pa,ma,ba].forEach(u=>u(i,r)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Xt(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(c,!0),r&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=De(l.end)||"",i.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Aa(u==="self"?i:u)})),i.contains.forEach(function(u){s(u,l)}),i.starts&&s(i.starts,r),l.matcher=a(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=pe(e.classNameAliases||{}),s(e)}function Kt(e){return e?e.endsWithParent||Kt(e.starts):!1}function Aa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return pe(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Kt(e)?pe(e,{starts:e.starts?pe(e.starts):null}):Object.isFrozen(e)?pe(e):e}var Ta="11.8.0";class Da extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ot=jt,It=pe,Nt=Symbol("nomatch"),Ma=7,qt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Ho};function l(g){return r.noHighlightRe.test(g)}function c(g){let v=g.className+" ";v+=g.parentNode?g.parentNode.className:"";const C=r.languageDetectRe.exec(v);if(C){const E=P(C[1]);return E||(Mt(s.replace("{}",C[1])),Mt("Falling back to no-highlight mode for this block.",g)),E?C[1]:"no-highlight"}return v.split(/\s+/).find(E=>l(E)||P(E))}function u(g,v,C){let E="",L="";typeof v=="object"?(E=g,C=v.ignoreIllegals,L=v.language):(ye("10.7.0","highlight(lang, code, ...args) has been deprecated."),ye("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),L=g,E=v),C===void 0&&(C=!0);const z={code:E,language:L};K("before:highlight",z);const V=z.result?z.result:d(z.language,z.code,C);return V.code=z.code,K("after:highlight",V),V}function d(g,v,C,E){const L=Object.create(null);function z(I,_){return I.keywords[_]}function V(){if(!W.keywords){se.addText(te);return}let I=0;W.keywordPatternRe.lastIndex=0;let _=W.keywordPatternRe.exec(te),q="";for(;_;){q+=te.substring(I,_.index);const Q=ae.case_insensitive?_[0].toLowerCase():_[0],ie=z(W,Q);if(ie){const[ue,Kn]=ie;if(se.addText(q),q="",L[Q]=(L[Q]||0)+1,L[Q]<=Ma&&(je+=Kn),ue.startsWith("_"))q+=_[0];else{const qn=ae.classNameAliases[ue]||ue;J(_[0],qn)}}else q+=_[0];I=W.keywordPatternRe.lastIndex,_=W.keywordPatternRe.exec(te)}q+=te.substring(I),se.addText(q)}function U(){if(te==="")return;let I=null;if(typeof W.subLanguage=="string"){if(!t[W.subLanguage]){se.addText(te);return}I=d(W.subLanguage,te,!0,yt[W.subLanguage]),yt[W.subLanguage]=I._top}else I=b(te,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(je+=I.relevance),se.__addSublanguage(I._emitter,I.language)}function $(){W.subLanguage!=null?U():V(),te=""}function J(I,_){I!==""&&(se.startScope(_),se.addText(I),se.endScope())}function ne(I,_){let q=1;const Q=_.length-1;for(;q<=Q;){if(!I._emit[q]){q++;continue}const ie=ae.classNameAliases[I[q]]||I[q],ue=_[q];ie?J(ue,ie):(te=ue,V(),te=""),q++}}function G(I,_){return I.scope&&typeof I.scope=="string"&&se.openNode(ae.classNameAliases[I.scope]||I.scope),I.beginScope&&(I.beginScope._wrap?(J(te,ae.classNameAliases[I.beginScope._wrap]||I.beginScope._wrap),te=""):I.beginScope._multi&&(ne(I.beginScope,_),te="")),W=Object.create(I,{parent:{value:W}}),W}function ee(I,_,q){let Q=Vo(I.endRe,q);if(Q){if(I["on:end"]){const ie=new kt(I);I["on:end"](_,ie),ie.isMatchIgnored&&(Q=!1)}if(Q){for(;I.endsParent&&I.parent;)I=I.parent;return I}}if(I.endsWithParent)return ee(I.parent,_,q)}function re(I){return W.matcher.regexIndex===0?(te+=I[0],1):(et=!0,0)}function ce(I){const _=I[0],q=I.rule,Q=new kt(q),ie=[q.__beforeBegin,q["on:begin"]];for(const ue of ie)if(ue&&(ue(I,Q),Q.isMatchIgnored))return re(_);return q.skip?te+=_:(q.excludeBegin&&(te+=_),$(),!q.returnBegin&&!q.excludeBegin&&(te=_)),G(q,I),q.returnBegin?0:_.length}function me(I){const _=I[0],q=v.substring(I.index),Q=ee(W,I,q);if(!Q)return Nt;const ie=W;W.endScope&&W.endScope._wrap?($(),J(_,W.endScope._wrap)):W.endScope&&W.endScope._multi?($(),ne(W.endScope,I)):ie.skip?te+=_:(ie.returnEnd||ie.excludeEnd||(te+=_),$(),ie.excludeEnd&&(te=_));do W.scope&&se.closeNode(),!W.skip&&!W.subLanguage&&(je+=W.relevance),W=W.parent;while(W!==Q.parent);return Q.starts&&G(Q.starts,I),ie.returnEnd?0:_.length}function Ee(){const I=[];for(let _=W;_!==ae;_=_.parent)_.scope&&I.unshift(_.scope);I.forEach(_=>se.openNode(_))}let le={};function Y(I,_){const q=_&&_[0];if(te+=I,q==null)return $(),0;if(le.type==="begin"&&_.type==="end"&&le.index===_.index&&q===""){if(te+=v.slice(_.index,_.index+1),!a){const Q=new Error(`0 width match regex (${g})`);throw Q.languageName=g,Q.badRule=le.rule,Q}return 1}if(le=_,_.type==="begin")return ce(_);if(_.type==="illegal"&&!C){const Q=new Error('Illegal lexeme "'+q+'" for mode "'+(W.scope||"<unnamed>")+'"');throw Q.mode=W,Q}else if(_.type==="end"){const Q=me(_);if(Q!==Nt)return Q}if(_.type==="illegal"&&q==="")return 1;if(Qe>1e5&&Qe>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return te+=q,q.length}const ae=P(g);if(!ae)throw he(s.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Re=ka(ae);let Ye="",W=E||Re;const yt={},se=new r.__emitter(r);Ee();let te="",je=0,ge=0,Qe=0,et=!1;try{if(ae.__emitTokens)ae.__emitTokens(v,se);else{for(W.matcher.considerAll();;){Qe++,et?et=!1:W.matcher.considerAll(),W.matcher.lastIndex=ge;const I=W.matcher.exec(v);if(!I)break;const _=v.substring(ge,I.index),q=Y(_,I);ge=I.index+q}Y(v.substring(ge))}return se.finalize(),Ye=se.toHTML(),{language:g,value:Ye,relevance:je,illegal:!1,_emitter:se,_top:W}}catch(I){if(I.message&&I.message.includes("Illegal"))return{language:g,value:ot(v),illegal:!0,relevance:0,_illegalBy:{message:I.message,index:ge,context:v.slice(ge-100,ge+100),mode:I.mode,resultSoFar:Ye},_emitter:se};if(a)return{language:g,value:ot(v),illegal:!1,relevance:0,errorRaised:I,_emitter:se,_top:W};throw I}}function p(g){const v={value:ot(g),illegal:!1,relevance:0,_top:i,_emitter:new r.__emitter(r)};return v._emitter.addText(g),v}function b(g,v){v=v||r.languages||Object.keys(t);const C=p(g),E=v.filter(P).filter(N).map($=>d($,g,!1));E.unshift(C);const L=E.sort(($,J)=>{if($.relevance!==J.relevance)return J.relevance-$.relevance;if($.language&&J.language){if(P($.language).supersetOf===J.language)return 1;if(P(J.language).supersetOf===$.language)return-1}return 0}),[z,V]=L,U=z;return U.secondBest=V,U}function m(g,v,C){const E=v&&n[v]||C;g.classList.add("hljs"),g.classList.add(`language-${E}`)}function h(g){let v=null;const C=c(g);if(l(C))return;if(K("before:highlightElement",{el:g,language:C}),g.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),r.throwUnescapedHTML))throw new Da("One of your code blocks includes unescaped HTML.",g.innerHTML);v=g;const E=v.textContent,L=C?u(E,{language:C,ignoreIllegals:!0}):b(E);g.innerHTML=L.value,m(g,C,L.language),g.result={language:L.language,re:L.relevance,relevance:L.relevance},L.secondBest&&(g.secondBest={language:L.secondBest.language,relevance:L.secondBest.relevance}),K("after:highlightElement",{el:g,result:L,text:E})}function f(g){r=It(r,g)}const x=()=>{k(),ye("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function y(){k(),ye("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let w=!1;function k(){if(document.readyState==="loading"){w=!0;return}document.querySelectorAll(r.cssSelector).forEach(h)}function A(){w&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function B(g,v){let C=null;try{C=v(e)}catch(E){if(he("Language definition for '{}' could not be registered.".replace("{}",g)),a)he(E);else throw E;C=i}C.name||(C.name=g),t[g]=C,C.rawDefinition=v.bind(null,e),C.aliases&&O(C.aliases,{languageName:g})}function T(g){delete t[g];for(const v of Object.keys(n))n[v]===g&&delete n[v]}function M(){return Object.keys(t)}function P(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function O(g,{languageName:v}){typeof g=="string"&&(g=[g]),g.forEach(C=>{n[C.toLowerCase()]=v})}function N(g){const v=P(g);return v&&!v.disableAutodetect}function j(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=v=>{g["before:highlightBlock"](Object.assign({block:v.el},v))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=v=>{g["after:highlightBlock"](Object.assign({block:v.el},v))})}function R(g){j(g),o.push(g)}function H(g){const v=o.indexOf(g);v!==-1&&o.splice(v,1)}function K(g,v){const C=g;o.forEach(function(E){E[C]&&E[C](v)})}function S(g){return ye("10.7.0","highlightBlock will be removed entirely in v12.0"),ye("10.7.0","Please use highlightElement now."),h(g)}Object.assign(e,{highlight:u,highlightAuto:b,highlightAll:k,highlightElement:h,highlightBlock:S,configure:f,initHighlighting:x,initHighlightingOnLoad:y,registerLanguage:B,unregisterLanguage:T,listLanguages:M,getLanguage:P,registerAliases:O,autoDetection:N,inherit:It,addPlugin:R,removePlugin:H}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Ta,e.regex={concat:ve,lookahead:Ht,either:ut,optional:Fo,anyNumberOfTimes:Uo};for(const g in Fe)typeof Fe[g]=="object"&&Rt(Fe[g]);return Object.assign(e,Fe),e},Se=qt({});Se.newInstance=()=>qt({});var Ia=Se;Se.HighlightJS=Se;Se.default=Se;const Te=zo(Ia),$t="[A-Za-z$_][0-9A-Za-z$_]*",Na=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],$a=["true","false","null","undefined","NaN","Infinity"],Jt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Yt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Qt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ba=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Oa=[].concat(Qt,Jt,Yt);function en(e){const t=e.regex,n=(v,{after:C})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,C)!==-1},o=$t,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,C)=>{const E=v[0].length+v.index,L=v.input[E];if(L==="<"||L===","){C.ignoreMatch();return}L===">"&&(n(v,{after:E})||C.ignoreMatch());let z;const V=v.input.substring(E);if(z=V.match(/^\s*=/)){C.ignoreMatch();return}if((z=V.match(/^\s+extends\s+/))&&z.index===0){C.ignoreMatch();return}}},r={$pattern:$t,keyword:Na,literal:$a,built_in:Oa,"variable.language":Ba},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},m={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},f={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},y={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},w=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,m,h,f,{match:/\$\d+/},d];p.contains=w.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(w)});const k=[].concat(y,p.contains),A=k.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(k)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Jt,...Yt]}},P={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},N={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(v){return t.concat("(?!",v.join("|"),")")}const R={match:t.concat(/\b/,j([...Qt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},H={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},K={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},S="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(S)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),P,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,m,h,f,y,{match:/\$\d+/},d,M,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[y,e.REGEXP_MODE,{className:"function",begin:S,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},H,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},R,N,T,K,{match:/\$[(.]/}]}}function Pa(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const La=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",en),Te.registerLanguage("sh",Pa),function({text:i,language:r="js"}){const l=a({class:`hljs language-${r}`});return l.innerHTML=Te.highlight(i,{language:r}).value,o({class:n`
          display: inline-block;
        `},l)}};function za(e){const{bau:t,css:n}=e,{article:o,h1:a,p:s,code:i,a:r,ul:l,li:c}=t.tags,u=La(e);return function(){return o({class:n`
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
)`}),s("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),s("Further reading:",l(c(r({href:"components"},"Visit the component gallery")),c(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ne(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=Z(r);return a({...d,class:D("paper",l,s,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function tn(e,t={}){const{bau:n,css:o,window:a}=e,{nav:s,ul:i,li:r,a:l}=n.tags,{headerSelector:c="h2,h3"}=t,u=n.state("no"),d=(f,x)=>{let y=null;return(...w)=>{a.clearTimeout(y),y=a.setTimeout(()=>f(...w),x)}},p=o`
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
  `,b=({value:f,id:x,children:y=[]})=>{const w=l({class:()=>u.val==x?"active":"",href:`#${x}`});return w.innerHTML=f,r({class:()=>u.val==x?"active":""},w,y.length>0&&i(y.map(b)))},m=f=>f.tagName.charAt(1),h=({contentEl:f})=>{const x=f.querySelectorAll(c);let y=2,w={},k={children:[]},A=k;const B=A;let T=[A];return[...x].forEach(M=>{const P=m(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(w={value:M.innerHTML,id:M.id??M.textContent,children:[]},y==P?(k=w,A.children.push(k)):y<P?(T.push(A),A=k,k.children.push(w),k=w):y>P&&(A=T[P-1],T=T.slice(0,P-1),A.children.push(w),k=w),y=P)}),B};return function(...x){let[{size:y=t.size??"md",variant:w=t.variant??"plain",color:k=t.color??"neutral",contentEl:A,...B}]=Z(x);const T=h({contentEl:A}),M=d(()=>{const O=[...A.querySelectorAll(c)].find(N=>{const{top:j,height:R}=N.getBoundingClientRect();if(j+R>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return s({...B,class:D("tableOfContent",y,w,k,p,t==null?void 0:t.class,B==null?void 0:B.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},T.children&&i(T.children.map(b)))}}const nn=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:s,tr:i,td:r,thead:l,th:c}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(l(i(c(p??""),oe.map(b=>c(b)))),s(yo.map(b=>i(c(b),oe.map((m,h)=>r(d({color:m,variant:b},{index:h}))))))))}},_a=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:s}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},wo.map((i,r)=>s(e,{size:i})({color:"success",variant:"outline"},{size:i,index:r})))}},F=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:s,h1:i,p:r,h2:l,h3:c,pre:u,code:d}=t.tags;Te.registerLanguage("javascript",en);const p=tn(e),b=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),m=nn(e),h=_a(e),f=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:y})=>{y.innerHTML=Te.highlight(x,{language:"js"}).value}}));return function(y){const w=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(y.title),r(y.description),y.gridItem&&!y.variantColorTableDisable&&[l("Variant/Color"),b(m({Item:y.gridItem(e)}))],y.gridItem&&!y.variantSizeDisable&&[l("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b(h({item:y.gridItem}))],l("Usage"),c("Import"),f({text:y.importStatement}),l("Examples"),y.examples.map(k=>s(c(k.title),r(k.description),b(k.createComponent(e)({})),f({text:k.code}))));return o({class:n`
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
        `},w,p({contentEl:w}))}};function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?r(c):l(c))};function r(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:b=t.color??"neutral",Header:m,Content:h,close:f=!0,...x}]=Z(u);const y=n.state(f);return a({...x,class:D("collapsible",d,s,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>D("header",h?y.val?"close":"open":""),onclick:w=>{y.val=!y.val,w.stopPropagation()}},m()),a({class:"content",role:"region",bauMounted:({element:w})=>{y.val&&(w.style.height="0px")},"aria-expanded":({element:w})=>(i({element:w,closeState:y}),!y.val)},h&&h()))}}const Ra=()=>oe.map(e=>`
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
`);function Ze(e,t={}){const{bau:n,css:o}=e,{div:a,ul:s,li:i,h3:r,button:l}=n.tags,c=o`
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
    ${Ra()}
  `;return function(...d){let[{size:p=t.size??"md",variant:b=t.variant??"plain",color:m=t.color??"neutral",data:h=[],...f}]=Z(d);const x=n.state(""),y=mt(e,{size:p,variant:b,color:m}),w=A=>B=>{x.val==A?x.val="":x.val=A},k=A=>{const{Header:B,Content:T,name:M}=A,P=()=>r({class:()=>D(x.val==M&&"active")},l({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:N})=>x.val==M},B(A))),O=()=>a({id:`bau-${M}`,"data-state":({element:N})=>x.val==M},T(A));return i({class:D(m,b,p),onclick:w(M)},y({Header:P,Content:O}))};return a({class:D("accordion",c,t==null?void 0:t.class,f.class)},s(h.map(k)))}}const on=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Ze(e,t);return r=>i({...r,data:s})},ja=e=>{const{bau:t}=e,{div:n,p:o,section:a}=t.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Ze(e);return()=>a(i({data:s,color:"neutral",variant:"outline"}))},Ha=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,an=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ua=e=>{const{css:t}=e,n=an(e),o=Ze(e);return()=>o({color:"warning",data:n,class:t`
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
`,Ga=e=>{const{css:t}=e,n=an(e),o=Ze(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Va=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Wa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Ha,createComponent:ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Fa,createComponent:Ua},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Va,createComponent:Ga}],gridItem:on},Xa=e=>{const t=F(e);return()=>t(Wa)},Za={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ka=()=>oe.map(e=>`
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
`);function $e(e,t={}){const{bau:n,css:o}=e,{div:a,i:s}=n.tags,i=o`
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
  `,r=X(e),l=({onclick:c})=>r({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:b=t.color??"neutral",onRemove:m,...h},...f]=Z(u);return a({...h,class:D("alert",`alert-${p}`,t.class,p,b,d,i,h.class),role:"alert"},s({class:"icon"},Za[b]),a({class:"content"},...f),m&&l({onclick:m}))}}const rn=(e,t)=>{const n=$e(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},qa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=$e(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ja=`import alert from "@grucloud/bau-ui/alert";
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
`,Ya=e=>{const{css:t}=e,n=$e(e,{class:t`
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
`,er={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ja,createComponent:qa},{title:"Custom Alert ",description:"A custom alert.",code:Qa,createComponent:Ya}],gridItem:rn},tr=e=>{const t=F(e);return()=>t(er)},nr=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:s=10,deleteAfterDuration:i=15e3}=t,{div:r}=n.tags,l=n.state([]),c={inserting:a`
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
    `},d=({id:p,status:b})=>{const m=l.val.findIndex(h=>h.id===p);m!=-1&&(l.val[m].status=b)};return function(b={},...m){const h=({id:y})=>{d({id:y,status:"removing"});const w=l.val.findIndex(k=>k.id===y);w!=-1&&l.val.splice(w,1)},f=({Component:y})=>{const w={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};l.val.length>=s&&h({id:l.val[0].id}),l.val.push(w),setTimeout(()=>h(w),i)},x=y=>r({class:u.item,onclick:()=>h(y)},y.Component());return document.addEventListener("alert.add",y=>f(y.detail)),document.addEventListener("alert.remove",y=>h(y.detail)),r({class:D(u.stack,t==null?void 0:t.class,b.class)},n.loop(l,r(),x))}},or=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=nr(e,{deleteAfterDuration:2e4}),s=X(e),i=$e(e);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ar=`import { Context } from "@grucloud/bau-ui/context";
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
`,rr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ar,createComponent:or}]},sr=e=>{const t=F(e);return()=>t(rr)},ir=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,s=We(e),i=X(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=t.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),s({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},cr=`import animate from "@grucloud/bau-ui/animate";
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
`,lr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:s,label:i}=t.tags,r=We(e),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=t.state("one"),u=({target:p})=>c.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",s({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",s({type:"radio",id:"two",name:"radio",value:c,oninput:u})),r({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},ur=`import animate from "@grucloud/bau-ui/animate";
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
`,dr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:cr,createComponent:ir},{title:"Component hide and show",description:"Hide and show a component",code:ur,createComponent:lr}]},pr=e=>{const t=F(e);return()=>t(dr)};function Ce(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:s}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...b},...m]=Z(c);return s({...b,class:D("skeleton",u,r,t==null?void 0:t.class,b==null?void 0:b.class)},...m)}}function gt(e,t={}){const{bau:n,css:o}=e,{div:a,img:s}=n.tags,i=n.state(!0),r=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,r.val=!0},u=o`
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
  `;return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",width:f=40,height:x=40,alt:y,...w},...k]=Z(p);const A=Ce(e,{class:D(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${f}px;
        `,t==null?void 0:t.class,w.class)});return a({class:D(u,t==null?void 0:t.class,w.class)},()=>i.val&&A(),()=>r.val&&y,s({width:f,height:x,onload:l,onerror:c,class:()=>D(!i.val&&"visible",r.val&&"hide",h,m,b,u,t==null?void 0:t.class,w.class),...w}))}}const sn=(e,t)=>{const{css:n}=e,o=gt(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},mr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=gt(e,{class:n`
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
`,br=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=gt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",alt:"My Avatar"}))},hr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,fr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:gr,createComponent:mr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:hr,createComponent:br}],gridItem:sn},vr=e=>{const t=F(e);return()=>t(fr)};function Be(e,t){const{bau:n,css:o,window:a}=e,{dialog:s}=n.tags,i=Ne(e,{class:o`
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
  `;return function(...c){let[{contentEl:u,triggerEl:d,onClose:p,...b},...m]=Z(c);const h=y=>{x.style.opacity=1,x.showModal();const w=d.getBoundingClientRect(),k=x.getBoundingClientRect();w.x<a.innerWidth/2?x.style.left=w.left+"px":x.style.left=w.right-k.width+"px",w.y<a.innerHeight/2?(x.style.top=w.top+w.height+"px",x.style.height=Math.min(x.scrollHeight,a.innerHeight-w.top-w.height)+"px"):(x.style.top=Math.max(0,w.top-k.height)+"px",x.scrollHeight>w.top&&(x.style.height=w.top+"px"))},f=y=>{const w=()=>{x.close(),x.removeEventListener("transitionend",w)};x.addEventListener("transitionend",w),x.style.opacity=0},x=s({role:"presentation",class:D("popover",r,t==null?void 0:t.class,b==null?void 0:b.class),onclick:y=>{y.target===x&&(f(),p==null||p.call())}},i(u));return x.closeDialog=f,x.openDialog=h,x}}const Ge={sm:12,md:16,lg:24},xr=()=>oe.map(e=>`
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
`);function xe(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:s,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:b=!0,...m}={}){const h=o`
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
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${xr()}
    `;return s({class:{deps:[b],renderProp:()=>f=>D("spinner",h,d,p,f==!1?"":"visibility",t==null?void 0:t.class,m.class)},version:"1.1",x:"0px",y:"0px",width:Ge[u],height:Ge[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...m},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const yr=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ke(e,t={}){const{bau:n,css:o}=e,{div:a,li:s}=n.tags,i=o`
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

    ${yr()}
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:b,Option:m,options:h,defaultOption:f,getOptionLabel:x,getOptionValue:y,onSelect:w=()=>{},id:k,required:A,name:B,loading:T,...M},...P]=Z(l);const O=Be(e),N=X(e),j=de(e,{variant:u,color:d,size:c}),R=fe(e),H=xe(e,{variant:u,color:d,size:c}),K=n.state(f),S=n.state(M.value),g=n.state(!1),v=n.state(0),C=()=>{g.val=!1},E=n.state(h),L=Y=>ae=>Y.val&&x(ae)==x(Y.val),z=()=>{le.openDialog(),g.val=!0,S.val="",E.val=h,v.val=h.findIndex(L(K));const Y=Ee.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),ce.scrollIntoView({block:"end"}))},V=()=>{le.closeDialog(),g.val=!1,v.val=0},U=Y=>{const{value:ae}=Y.target;S.val=ae,ae?E.val=h.filter(Re=>x(Re).match(new RegExp(`${ae}`,"i"))):E.val=h},$=Y=>{le.open?V():z()},J=Y=>{K.val=Y,me.value=y(Y)},ne=({option:Y,index:ae})=>Re=>{J(Y),v.val=ae,V()},G=()=>{const Y=Ee.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},ee=Y=>{switch(Y.key){case"Escape":V();break;case"ArrowDown":v.val<E.val.length-1?v.val++:v.val=0,G();break;case"ArrowUp":v.val<=0?v.val=E.val.length-1:v.val--,G();break;case"Enter":le.open?(J(E.val[v.val]),V()):z(),Y.preventDefault();break}},re=N({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":p,onclick:$,variant:u,color:d,size:c,class:T==!0&&"loading",disabled:T},()=>K.val?x(K.val):p,()=>T==!0&&H({visibility:T})),ce=j({value:S,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:U,onkeydown:ee,...M}),me=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:f&&y(f),required:A,name:B}),Ee=a({class:D(u,d,c,"content")},ce,()=>R({class:D(u,d,c)},E.val.map((Y,ae)=>s({class:()=>D(v.val==ae&&"active",L(K)(Y)&&"selected"),onclick:ne({option:Y,index:ae})},m(Y))))),le=O({id:k,triggerEl:re,contentEl:Ee,onClose:C,class:o`
        overflow: hidden;
      `});return a({...M,class:D("autocomplete",i,t==null?void 0:t.class,M==null?void 0:M.class)},n.bind({deps:[K],render:()=>Y=>{Y&&(me.value=y(Y),w(Y))}}),re,me,le)}}const cn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:s}=n.tags,i=Ke(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return c=>i({...c,options:r,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},wr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=Ke(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return()=>o(i({options:r,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Country",placeholder:"Search countries",id:"country"}))},Sr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=Ke(e),r="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(u.label),s(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},Er=`import { Context } from "@grucloud/bau-ui/context";
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
`,kr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=X(e,{variant:"outline"}),r=Ke(e),l=t.state([]),c=t.state(!1),u=t.state("");async function d({url:m,transform:h=f=>f}){try{c.val=!0;const f=await fetch(m,{});if(f.ok){const x=await f.json();l.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,f)=>h.name.common.localeCompare(f.name.common))});p();const b=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:l.val,Option:b,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",placeholder:"Search countries",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},Ar=`import { Context } from "@grucloud/bau-ui/context";
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
`,Tr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Sr,createComponent:wr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ar,createComponent:kr},{title:"Default Option",description:"A autocomplete with a default option.",code:Er,createComponent:Cr}],gridItem:cn},Dr=e=>{const t=F(e);return()=>t(Tr)};function ln(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...b]=Z(r);return a({...p,class:D("badge",s,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:D(u,c,l)},d),...b)}}const un=(e,t)=>{const n=ln(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o=ln(e);return()=>n(o({content:"10"},"☏"))},Ir=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Nr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ir,createComponent:Mr}],gridItem:un},$r=e=>{const t=F(e);return()=>t(Nr)};function bt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:s,li:i,span:r}=n.tags,{separator:l="〉"}=t,c=X(e),u=o`
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
  `;return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",items:f,...x},...y]=Z(p);return s({...x,class:D(u,t==null?void 0:t.class,x==null?void 0:x.class)},f.map(({href:w,name:k})=>i((w?c:r)({href:`${a.base}${w}`,color:h,variant:m,size:b,class:D(h,m,b)},k))))}}const dn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=bt(e,t);return a=>o({...a,...n})},Br=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},Or=`import { Context } from "@grucloud/bau-ui/context";
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
`,Pr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Lr=`import { Context } from "@grucloud/bau-ui/context";
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
`,zr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Or,createComponent:Br},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Lr,createComponent:Pr}],gridItem:dn},_r=e=>{const t=F(e);return()=>t(zr)},pn=(e,t={})=>{const n=X(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},jr=`import button from "@grucloud/bau-ui/button";
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
`,Hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Ur=`import button from "@grucloud/bau-ui/button";
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
`,Fr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:jr,createComponent:Rr},{title:"Disabled Button",description:"A disabled button.",code:Ur,createComponent:Hr}],gridItem:pn},Gr=e=>{const t=F(e);return()=>t(Fr)},Vr=()=>oe.map(e=>`
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
`);function ht(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
    ${Vr()}
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=Z(r);return a({...d,class:D("button-group",c,u,l,s,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const mn=(e,t)=>{const n=["ONE","TWO","THREE"],o=X(e,t),a=ht(e,t);return s=>a({...s},n.map(i=>o(s,i)))},Wr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=X(e),s=ht(e),i="primary",r="solid";return()=>n(s({color:i,variant:r},o.map(l=>a({color:i,variant:r},l))))},Xr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Zr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Xr,createComponent:Wr}],gridItem:mn},Kr=e=>{const t=F(e);return()=>t(Zr)};function gn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...b]=Z(l);return a({...p,type:"date",class:D("calendar",i,d,u,c,t==null?void 0:t.class,p==null?void 0:p.class)},...b)}}const bn=(e,t)=>{const n=gn(e,t);return o=>n({...o})},qr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),s=gn(e);return()=>n(o("Start date:",s({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},Jr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Yr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Jr,createComponent:qr}],gridItem:bn},Qr=e=>{const t=F(e);return()=>t(Yr)};function es(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:b,Previous:m,Next:h,...f}]=Z(l);const x=()=>{i.val<=0?i.val=p.length-1:i.val--},y=()=>{i.val>=p.length-1?i.val=0:i.val++},w=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},p.map(b));return a({...f,class:D("carousel",c,s,t==null?void 0:t.class,f==null?void 0:f.class)},a({class:D("control","control-previous"),onclick:x},m()),a({class:D("control","control-next"),onclick:y},h()),w)}}const ts=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],ns=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,s=X(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),r=es(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),l=()=>s("◀"),c=()=>s("▶");return()=>o(r({slides:ts,Slide:i,Previous:l,Next:c}))},os=`import carousel from "@grucloud/bau-ui/carousel";
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
`,as={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:os,createComponent:ns}]},rs=e=>{const t=F(e);return()=>t(as)},hn=(e,t)=>{const n=Ie(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ss=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},is=`import chip from "@grucloud/bau-ui/chip";
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
`,cs={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:is,createComponent:ss}],gridItem:hn},ls=e=>{const t=F(e);return()=>t(cs)};function qe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=Z(r);return a({type:"checkbox",...d,class:D(s,u,c,l,t==null?void 0:t.class,d==null?void 0:d.class)})}}const fn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,s=qe(e,t);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,s({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},us=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,s=qe(e),i=t.state(!1),r=l=>{i.val=!!l.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",s({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:i,onchange:r})))},ds=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,ps=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,s=qe(e,{color:"neutral",variant:"outline"}),i=X(e),r=l=>{l.preventDefault();const c=Object.fromEntries(new FormData(l.target.closest("form")));alert(JSON.stringify(c))};return()=>a({onsubmit:r,class:n`
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
        `},o("My Checkbox",s({id:"my-checkbox-uncontrolled",name:"my-checkbox-uncontrolled"})),i({type:"submit"},"Submit"))},ms=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,gs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:ds,createComponent:us},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:ms,createComponent:ps}],gridItem:fn},bs=e=>{const t=F(e);return()=>t(gs)},hs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=mt(e),s=X(e,{variant:"outline"}),i=()=>s("Header"),r=()=>o("Content");return()=>n(a({Header:i,Content:r}))},fs=`import button from "@grucloud/bau-ui/button";
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
`,vs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:fs,createComponent:hs}]},xs=e=>{const t=F(e);return()=>t(vs)};function ys(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=Z(r);return a({...d,class:D("divider",l,s,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const ws=e=>{const{bau:t}=e,{section:n}=t.tags,o=ys(e);return()=>n(o("OR"))},Ss=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Cs={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ss,createComponent:ws}],variantColorTableDisable:!0,variantSizeDisable:!0},Es=e=>{const t=F(e);return()=>t(Cs)};function ks(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:l,variant:c="outline",size:u,openState:d,...p},...b]=Z(r);return a({class:D(s,t==null?void 0:t.class,p.class)},a({class:()=>D("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>D("content",d.val&&"content-open")},b))}}const As=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),s=ks(e),i=X(e),r=_t(e);return()=>n(o("Click on the button to open and close the drawer."),i({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},r()))},Ts=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ds={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ts,createComponent:As}]},Ms=e=>{const t=F(e);return()=>t(Ds)},Is=()=>oe.map(e=>`
`).join(`
`);function vn(e,t={}){const{bau:n,css:o}=e,{div:a,li:s}=n.tags,i=X(e),r=Be(e),l=fe(e),c=o`
    ${Is()}
  `;return function(...d){let[{size:p=t.size??"md",variant:b=t.variant??"outline",color:m=t.color??"neutral",label:h,ListItem:f,items:x,...y},...w]=Z(d);const k=n.state(0),A=()=>{R.openDialog(),R.focus()},B=()=>{R.closeDialog()},T=()=>{R.open?B():A()},M=H=>{T(),H.preventDefault()},P=({item:H,index:K})=>S=>{k.val=K,B(),S.preventDefault()},O=H=>{switch(H.preventDefault(),H.key){case"Escape":B();break;case"ArrowDown":k.val<options.length-1?k.val++:k.val=0;break;case"ArrowUp":k.val<=0?k.val=options.length-1:k.val--;break;case"Enter":T();break}},N=()=>l({tabindex:"0",class:D(m,b)},x.map((H,K)=>s({class:()=>D(k.val==K&&"active"),onclick:P({item:H,index:K})},f(H)))),j=i({type:"button",onclick:M,color:m,variant:b,size:p},h),R=r({triggerEl:j,contentEl:N()});return a({...y,class:D("dropdownMenu",m,p,c,t==null?void 0:t.class,y==null?void 0:y.class),onkeydown:O},j,R)}}const Ns=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,s=vn(e,t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=l=>o(a(l.label));return l=>s({...l,items:i,ListItem:r,label:"Action"})},$s=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,s=vn(e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(s({items:i,ListItem:r,label:"Action"}))},Bs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Os={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Bs,createComponent:$s}],gridItem:Ns},Ps=e=>{const t=F(e);return()=>t(Os)},xn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=it(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Ls=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=it(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},zs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,_s={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:zs,createComponent:Ls}],gridItem:(e,t)=>xn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Rs=e=>{const t=F(e);return()=>t(_s)};function yn(e,t={}){const{bau:n,css:o}=e,{div:a,label:s,input:i}=n.tags,r={base:o`
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
    `};return function(c,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:b=t.color??"neutral",Component:m,disabled:h,...f}=c;return a({class:D(r.base,h&&r.disabled,t==null?void 0:t.class,c.class)},s({class:D(p,b,d)},m({disabled:h}),i({type:"file",disabled:h,...f})))}}const wn=(e,t)=>{const{tr:n,bau:o,css:a,config:s}=e,{svg:i,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=yn(e,t),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},b=({disabled:m})=>l({class:D(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${s.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return m=>d({Component:b,name:"file",accept:"text/*",onchange:p,...m})},js=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:l,span:c}=n.tags,u=n.state("No file selected"),d=yn(e),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},b=({disabled:m})=>l({class:D(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return()=>r(d({Component:b,name:"file",accept:"text/*",onchange:p}),l("File selected: ",u))},Hs=`import classNames from "@grucloud/bau-css/classNames";
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
`,Us={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Hs,createComponent:js}],gridItem:wn},Fs=e=>{const t=F(e);return()=>t(Us)};function Oe(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...b]=Z(r);return a({...p,class:D("form",u,c,l,s,t==null?void 0:t.class,p==null?void 0:p.class)},...b)}}function ft(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:s}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:b,...m},...h]=Z(c);const f=X(e),x=xe(e);return n.bind({deps:[b],render:()=>y=>f({...m,class:D("loadingButton",u,d,p,r,y&&"loading",t==null?void 0:t.class,m==null?void 0:m.class)},x({size:u,variant:d,color:p,visibility:y}),s({class:y&&"loading"},h))})}}const Gs=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:s,header:i,label:r,img:l,footer:c}=t.tags,u=ft(e),d=$e(e,{variant:"outline",color:"danger"}),p=de(e),b=Oe(e,{class:n`
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),m=Ne(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:f=()=>{}}){const x=t.state(!1),y=t.state("");return m(b({onsubmit:async k=>{k.preventDefault();const{username:A,password:B}=Object.fromEntries(new FormData(k.target.closest("form")));try{x.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:A,password:B})});if(T.ok){const M=await T.json();f(M)}else T.status==401?y.val="Invalid username or password":y.val=T.statusText}catch(T){y.val=T.message}finally{x.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),s("Login to Grucloud")),a(()=>y.val&&d(y.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",variant:"solid",color:"primary",loading:x},"Login"))))}},Vs=`import form from "@grucloud/bau-ui/form";
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
`,Ws=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:s,footer:i}=t.tags,r=Oe(e),l=X(e,{variant:"solid",color:"primary"}),c=de(e);return function({onSubmitted:d=()=>{}}){return r({onsubmit:async b=>{b.preventDefault();const m=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(m)),d(m)}},a(o("Form with input")),n(s("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},Xs=`import form from "@grucloud/bau-ui/form";
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
`,Zs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:s,footer:i,em:r,span:l}=t.tags,c=t.state(""),u=t.derive(()=>c.val!=="Delete"),d=Oe(e),p=X(e,{variant:"solid",color:"primary"}),b=de(e);return function({onSubmitted:h=()=>{}}){return d({onsubmit:async x=>{x.preventDefault(),h()}},a(o("Delete Protection")),n(s(l("Type ",r("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:x=>c.val=x.target.value}))),i(p({type:"submit",disabled:u},"Delete")))}},Ks=`import { Context } from "@grucloud/bau-ui/context";
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
`,qs={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Xs,createComponent:Ws},{title:"Form with state",description:"A form with input state and a dervied state.",code:Ks,createComponent:Zs},{title:"Login page",description:"A login page.",code:Vs,createComponent:Gs}]},Js=e=>{const t=F(e);return()=>t(qs)},Sn=(e,t={})=>{const n=de(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Ys=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=de(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Qs=`import input from "@grucloud/bau-ui/input";
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
`,ei={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Qs,createComponent:Ys}],gridItem:Sn},ti=e=>{const t=F(e);return()=>t(ei)},Cn=(e,t={})=>{const n=ct(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},ni=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ct(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},oi=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,ai={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:oi,createComponent:ni}],gridItem:Cn},ri=e=>{const t=F(e);return()=>t(ai)};function En(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:s}=n.tags,i=()=>oe.map(c=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:b=t.color??"neutral",running:m,...h}]=Z(u);return s({...h,role:"progressbar",class:{deps:[m],renderProp:()=>f=>D("linearProgress",d,b,l,f&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const kn=(e,t)=>{const n=En(e,t);return o=>n({...o,running:!0})},si=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=X(e),s=En(e),i=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,s({running:i}))},ii=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ci={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ii,createComponent:si}],gridItem:kn},li=e=>{const t=F(e);return()=>t(ci)},An=(e,t)=>{const n=ft(e,t);return o=>n({...o,loading:!0},"Save")},ui=e=>{const{bau:t}=e,{section:n}=t.tags,o=ft(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},di=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,pi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:di,createComponent:ui}],gridItem:An},mi=e=>{const t=F(e);return()=>t(pi)},gi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],bi=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:s}=n.tags,i=fe(e,t),r=({code:l,label:c})=>s({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},gi.map(r))},hi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],fi=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:s}=t.tags,i=fe(e),r=({code:l,label:c})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i({variant:"outline",color:"primary"},hi.map(r)))},vi=`import list from "@grucloud/bau-ui/list";
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
`,xi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:vi,createComponent:fi}],gridItem:bi},yi=e=>{const t=F(e);return()=>t(xi)};function Tn(e,t={}){const{bau:n,css:o,window:a}=e,{dialog:s,div:i}=n.tags,l=o`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:b=t.color??"neutral",...m},...h]=Z(u);const f=s({...m,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(m.id??"modal")&&f.showModal()},class:D("modal",l,b,p,d,t==null?void 0:t.class,m==null?void 0:m.class)},h);return new MutationObserver(y=>{const w=new URLSearchParams(a.location.search);y[0].attributeName=="open"&&(f.open?w.set("modal",f.id??"modal"):w.delete("modal"),a.history.pushState("","",`?${w.toString()}`))}).observe(f,{attributes:!0}),f}}const Dn=(e,t={})=>{const{bau:n}=e,{form:o,section:a,main:s,header:i,footer:r,p:l,h1:c}=n.tags,u=X(e),d=Tn(e,t),p=()=>s(Array(20).fill("").map((m,h)=>l(h+1,". Some text here"))),b=m=>{const h=d({id:`dialog-${m.color}-${m.variant}-${t.size}`,...m},o(i(c("Header")),p(),r(u({variant:"outline",color:m.color,onclick:()=>{h.close()}},"Cancel"),u({variant:"solid",color:m.color,onclick:()=>{h.close()}},"OK"))));return h};return m=>{const h=b(m);return a(u({...m,onclick:()=>{h.showModal()}},"OPEN MODAL"),h)}},wi=e=>{const{bau:t}=e,{form:n,section:o,main:a,header:s,footer:i,p:r}=t.tags,l="neutral",c=X(e),u=Tn(e),d=()=>a(Array(10).fill("").map((b,m)=>r(m+1,". Some text here"))),p=u({id:"my-dialog"},n(s("Header"),d(),i(c({variant:"outline",color:l,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:l,onclick:()=>{p.close()}},"OK"))));return()=>o(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Si=`import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { form, section, main, header, footer, p } = bau.tags;

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
    form(
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
`,Ci={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Si,createComponent:wi}],gridItem:Dn},Ei=e=>{const t=F(e);return()=>t(Ci)},ki=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ai(e,t={}){const{bau:n,css:o}=e,{div:a,li:s,select:i}=n.tags,r=X(e),l=Be(e),c=fe(e),u=qe(e,{color:"neutral",variant:"outline"}),d=o`
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
    ${ki()}
  `;return function(...b){let[{size:m=t.size??"md",variant:h=t.variant??"outline",color:f=t.color??"neutral",name:x,label:y,Option:w,options:k,defaultValue:A=[],getOptionLabel:B,getOptionValue:T,renderValue:M,onSelect:P=()=>{},loading:O,...N},...j]=Z(b);const R=xe(e,{variant:h,color:f,size:m}),H=n.state(A),K=n.state(!1),S=n.state(0),g=()=>{J.openDialog(),J.focus(),K.val=!0},v=()=>{J.closeDialog(),K.val=!1},C=()=>{K.val=!1},E=G=>{J.open?v():g(),G.preventDefault()},L=()=>Array.from(ne.selectedOptions).map(({value:G})=>k.find(ee=>T(ee)==G)),z=G=>{switch(G.preventDefault(),G.key){case"Escape":v();break;case"ArrowDown":S.val<k.length-1?S.val++:S.val=0;break;case"ArrowUp":S.val<=0?S.val=k.length-1:S.val--;break;case"Enter":if(J.open){const ee=G.currentTarget.querySelectorAll("input")[S.val];ee.checked=!ee.checked;const re=ne.options[S.val+1];re.selected=!re.selected,H.val=L()}else g();break}},V=G=>ee=>{const re=[...ne.options].find(({value:ce})=>ce==T(G));ee.target.checked?re.selected=!0:re.selected=!1,H.val=L()},U=()=>c({tabindex:"0",class:D(f,h)},k.map((G,ee)=>s({class:()=>D(S.val==ee&&"active")},n.tags.label(u({checked:A.find(re=>T(re)==T(G)),name:`${x}-${T(G)}`,onchange:V(G)}),w(G))))),$=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":K,"aria-label":y,onclick:E,color:f,variant:h,size:m,class:O==!0&&"loading",disabled:O},()=>H.val.length?M(H.val):y,()=>O==!0&&R({visibility:O})),J=l({triggerEl:$,contentEl:U(),onClose:C}),ne=i({name:x,multiple:!0,...N},n.tags.option({value:""},"--Category--"),k.map(G=>n.tags.option({value:T(G),selected:A.find(ee=>T(ee)==T(G))},B(G))));return a({...N,class:D("multiSelect",f,m,d,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:z},ne,$,J)}}const Ti=e=>{const{bau:t,css:n}=e,{div:o,span:a,form:s,footer:i}=t.tags,r=Ai(e),l=X(e,{variant:"outline",color:"neutral"}),c=Ie(e,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=b=>a(b.group),p=b=>{b.preventDefault();const{selectedOptions:m}=b.target.elements.myMultiSelect;var h=Array.from(m).map(({value:f})=>f);alert(JSON.stringify(h))};return()=>s({onsubmit:p,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},b.map(m=>c(m.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},Di=`import { Context } from "@grucloud/bau-ui/context";
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
`,Mi=e=>{const{bau:t,css:n}=e,{select:o,option:a,form:s}=t.tags,i=X(e,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:p})=>p);alert(JSON.stringify(d))};return()=>s({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},Ii=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ni={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Di,createComponent:Ti},{title:"Native Multi Select",description:"A native multi select.",code:Ii,createComponent:Mi}]},$i=e=>{const t=F(e);return()=>t(Ni)},Bi=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:s}=t.tags,i=X(e),r=Be(e),l=()=>i({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),s("My Content")),u=l(),d=r({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},Oi=`import popover from "@grucloud/bau-ui/popover";
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
`,Pi={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Oi,createComponent:Bi}]},Li=e=>{const t=F(e);return()=>t(Pi)};function zi(e,t={}){const{bau:n,css:o,config:a}=e,{div:s,a:i,span:r,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:p,label:b,href:m})=>i({href:`${a.base}${m}`},r({class:"sublabel"},d),s({class:`label ${d}`},b??p));return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",data:f={},...x}]=Z(p);const{next:y,previous:w}=f;return l({"data-paginationnav":JSON.stringify(f),"aria-label":"pages navigation",...x,class:D("paginationNavigation",b,c,t==null?void 0:t.class,x==null?void 0:x.class)},(w==null?void 0:w.href)&&u({text:"Previous"})(w),(y==null?void 0:y.href)&&u({text:"Next"})(y))}}const _i=e=>{const{bau:t}=e,{section:n}=t.tags,o=zi(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Ri=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,ji={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Ri,createComponent:_i}]},Hi=e=>{const t=F(e);return()=>t(ji)},Ui=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ne(e,t);return s=>a({...s},o(`Paper ${t.size??""}`))},Fi=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},Gi=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Vi={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Gi,createComponent:Fi}],variantColorTableDisable:!0,gridItem:Ui},Wi=e=>{const t=F(e);return()=>t(Vi)};function Mn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    margin: 0.5rem;
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=Z(l);return a({...p,type:"radio",class:D("radio-button",c,d,u,i,t==null?void 0:t.class,p==null?void 0:p.class)})}}const In=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:s}=n.tags,i=Mn(e,t);return r=>s({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Xi=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,s=Mn(e),i=t.state("one"),r=({target:l})=>i.val=l.id;return()=>a(n("One",s({id:"one",name:"radio",checked:!0,value:i,oninput:r})),n("Two",s({id:"two",name:"radio",value:i,oninput:r})),o("Choice: ",i))},Zi=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Ki={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Zi,createComponent:Xi}],gridItem:In},qi=e=>{const t=F(e);return()=>t(Ki)},Ji=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Pe(e,t={}){const{bau:n,css:o}=e,{div:a,li:s,select:i,option:r}=n.tags,l=X(e),c=Be(e),u=fe(e),d=o`
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
    ${Ji()}
  `;return function(...b){let[{size:m=t.size??"md",variant:h=t.variant??"outline",color:f=t.color??"neutral",label:x,Option:y,options:w,defaultOption:k,getOptionLabel:A,getOptionValue:B,onSelect:T=()=>{},loading:M,...P},...O]=Z(b);const N=xe(e,{variant:h,color:f,size:m}),j=n.state(k?A(k):x),R=n.state(!1),H=n.state(0),K=()=>{V.openDialog(),V.focus(),R.val=!0},S=()=>{V.closeDialog(),R.val=!1},g=()=>{R.val=!1},v=$=>{V.open?S():K(),$.preventDefault()},C=({option:$,index:J})=>ne=>{j.val=A($),U.value=B($),U.setCustomValidity(""),H.val=J,S(),T($),ne.preventDefault()},E=$=>{switch($.preventDefault(),$.key){case"Escape":S();break;case"ArrowDown":H.val<w.length-1?H.val++:H.val=0;break;case"ArrowUp":H.val<=0?H.val=w.length-1:H.val--;break;case"Enter":V.open?(j.val=A(w[H.val]),U.value=B(r),S()):K();break}},L=()=>u({tabindex:"0",class:D(f,h)},w.map(($,J)=>s({class:()=>D(H.val==J&&"active"),onclick:C({option:$,index:J})},y($)))),z=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":R,"aria-label":x,onclick:v,color:f,variant:h,size:m,class:M==!0&&"loading",disabled:M},()=>!j.val&&x,j,()=>M==!0&&N({visibility:M})),V=c({triggerEl:z,contentEl:L(),onClose:g}),U=i(P,r({value:""},"--Select Category--"),w.map($=>r({value:B($)},A($))));return U.value=P.value,a({...P,class:D("select",f,m,d,t==null?void 0:t.class,P==null?void 0:P.class),onkeydown:E},U,z,V)}}const Nn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:s}=n.tags,i=Pe(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return c=>i({...c,options:r,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Yi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=Pe(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return()=>o(i({options:r,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Select a country..."}))},Qi=`import select from "@grucloud/bau-ui/select";
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
`,ec=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=Pe(e),r="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(u.label),s(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},tc=`import select from "@grucloud/bau-ui/select";
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
`,nc=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Pe(e),s=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=r=>n({},r);return()=>o(a({options:s,Option:i,label:"Select a region",getOptionValue:r=>r,getOptionLabel:r=>r}))},oc=`import select from "@grucloud/bau-ui/select";
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
`,ac=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,i=X(e,{variant:"outline"}),r=Pe(e),l=t.state([]),c=t.state(!1),u=t.state("");async function d({url:m,transform:h=f=>f}){try{c.val=!0;const f=await fetch(m,{});if(f.ok){const x=await f.json();l.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,f)=>h.name.common.localeCompare(f.name.common))});p();const b=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:l.val,Option:b,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},rc=`import { Context } from "@grucloud/bau-ui/context";
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
`,sc={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Qi,createComponent:Yi},{title:"Default Option",description:"Select with a default option",code:tc,createComponent:ec},{title:"Select AWS region",description:"Select the AWS region",code:oc,createComponent:nc},{title:"Loading Indicator",description:"Select with a loading indicator",code:rc,createComponent:ac}],gridItem:Nn},ic=e=>{const t=F(e);return()=>t(sc)};function $n(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,s=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=Z(r);return a({...d,class:D("select-native",u,l,c,s,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Bn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=$n(e,t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,s.map(({label:r,phone:l})=>o({value:l},r)))},cc=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=$n(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(s.map(({label:i,phone:r})=>o({value:r},i))))},lc=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,uc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:lc,createComponent:cc}],gridItem:Bn},dc=e=>{const t=F(e);return()=>t(uc)},pc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,s=Ce(e),i=()=>a({class:n`
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
          `})));return()=>o(i())},mc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,gc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,s=Ce(e),i=()=>a({class:n`
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
            `}))));return()=>o(i())},bc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,hc=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:s,tr:i,td:r}=t.tags,l=Ce(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(s(new Array(8).fill("").map(()=>i(r(l({class:n`
                  width: 5rem;
                `})),r(l()),r(l()),r(l()),r(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},fc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,vc=e=>{const{bau:t,css:n}=e,{section:o,header:a,span:s,article:i}=t.tags,r=n`
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
  `,l=Ce(e,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),c=Ce(e);function u({columnsSize:d=4}){return o({class:r},a(new Array(d).fill("").map(()=>l(s("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},xc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,yc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:mc,createComponent:pc},{title:"List",description:"A list skeleton.",code:bc,createComponent:gc},{title:"Table",description:"A table skeleton.",code:fc,createComponent:hc},{title:"Tabs",description:"A tabs skeleton.",code:xc,createComponent:vc}],variantColorTableDisable:!0,variantSizeDisable:!0},wc=e=>{const t=F(e);return()=>t(yc)};function Je(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...b]=Z(l);return a({...p,type:"range",class:D("slider",d,u,c,i,t==null?void 0:t.class,p.class)},...b)}}const On=e=>{const{bau:t}=e,n=t.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=Je(e);return s=>a({...s,oninput:o})},Sc=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:s}=t.tags,i=t.state(0),r=c=>{i.val=c==null?void 0:c.target.value},l=Je(e);return()=>n(o(a("Slider with step, min and max",s,l({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Cc=`import slider from "@grucloud/bau-ui/slider";
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
`,Ec=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s,datalist:i,br:r,option:l}=t.tags,c=t.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Je(e);return()=>o(a(s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>l({value:Number(p),label:p})))))},kc=`import slider from "@grucloud/bau-ui/slider";
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
`,Ac=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s,datalist:i,br:r,option:l}=t.tags,c=t.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Je(e);return()=>o(a({class:n`
            display: flex;
          `},s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>l({value:Number(p),label:p})))))},Tc=`import slider from "@grucloud/bau-ui/slider";
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
`,Dc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Cc,createComponent:Sc},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:kc,createComponent:Ec},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Tc,createComponent:Ac}],gridItem:On},Mc=e=>{const t=F(e);return()=>t(Dc)},Pn=(e,t)=>{const n=xe(e,t);return o=>n({...o})},Ic=e=>{const{bau:t}=e,{section:n}=t.tags,o=X(e),a=xe(e,{size:"lg"}),s=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),a({visibility:s}))},Nc=`import spinner from "@grucloud/bau-ui/spinner";
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
`,$c={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Nc,createComponent:Ic}],gridItem:Pn},Bc=e=>{const t=F(e);return()=>t($c)},Oc=()=>oe.map(e=>"").join(`
`),Ln=(e,t)=>(n,o)=>{const a=new URLSearchParams(e.window.location.search);return a.delete(t),a.append(t,n),o&&Object.entries(o).map(([s,i])=>(a.delete(s),a.append(s,i))),`?${a.toString()}`};function zn(e,t={}){const{bau:n,css:o,window:a}=e,{div:s,ul:i,li:r,span:l,section:c}=n.tags,u=o`
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
    ${Oc()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...p){let[{color:b,variant:m="plain",size:h,stepperDefs:f=[],stepperName:x,activeStepIndex:y=n.state(0),...w},...k]=Z(p);const A=n.state(f.map((N,j)=>({...N,index:j}))),B=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(N,j,R)=>{N.apply(j,R);const H=R[2]??"";console.log("stepper pushState ",H),["?","#"].includes(H[0])&&O()}});const T=n.derive(()=>A.val[y.val]),M=N=>{const{Header:j,disabled:R,name:H,index:K}=N;return r({class:()=>D(T.val.name==H&&"active",y.val<K&&"not-completed",y.val>K&&"completed",R&&"disabled")},l({class:"step-number"},K+1),l({class:"step-label"},()=>j(N)))},P=N=>f.findIndex(({name:j})=>j==N.name),O=()=>{const j=new URLSearchParams(a.location.search).get(x)??f[0].name,R=Math.max(f.findIndex(({name:H})=>H==j),0);R<y.val&&(console.log("remove last step"),B.val.pop()),B.val.some(({name:H})=>j==H)||(console.log("add new step"),B.val.push(f[R])),y.val=R};return O(),s({bauMounted:({element:N})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:D("stepper",m,h,b,u,t==null?void 0:t.class,w.class)},n.loop(A,i(),M),n.loop(B,c(),N=>s({class:()=>D("content",N.name==T.val.name&&"visible")},N.Content({nextStep:f[P(N)+1],previousStep:f[P(N)-1]}))))}}const Bt="my-wizard",Pc=e=>{const{bau:t,window:n}=e,{footer:o,p:a,label:s,section:i,a:r,ul:l,li:c}=t.tags,u=de(e),d=Oe(e),p=zn(e),b=Ln(e,Bt),m=X(e,{variant:"outline",color:"primary"}),h=X(e,{variant:"solid",color:"primary"}),f=({nextStep:w})=>k=>{k.preventDefault();const{organization:A}=k.target.elements;n.history.pushState("","",b(w.name,{organization:A.value}))},x=w=>{var T;w.preventDefault();const{organization:k}=(T=n.document.forms)==null?void 0:T.formStep1.elements,B=new URLSearchParams(n.location.search).get("choice");alert(`organization ${k.value}, choice:${B}`)},y=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:w})=>d({onsubmit:f({nextStep:w}),id:"formStep1"},s("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:w,previousStep:k})=>d(l(c(r({href:b(w.name,{choice:"choice1"})},"Choice 1")),c(r({href:b(w.name,{choice:"choice2"})},"Choice 2"))),o(m({href:b(k.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:w})=>d({onsubmit:x},a("My stepper 3 Content"),o(m({href:b(w.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>i(p({stepperDefs:y,stepperName:Bt}))},Lc=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Ot="stepper-vertical",zc=e=>{const{bau:t,window:n,css:o}=e,{footer:a,p:s,label:i,section:r,a:l,ul:c,li:u}=t.tags,d=de(e),p=Oe(e),b=zn(e,{class:o`
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
    `}),m=Ln(e,Ot),h=X(e,{variant:"outline",color:"primary"}),f=X(e,{variant:"solid",color:"primary"}),x=({nextStep:k})=>A=>{A.preventDefault();const{organization:B}=A.target.elements;n.history.pushState("","",m(k.name,{organization:B.value}))},y=k=>{var M;k.preventDefault();const{organization:A}=(M=n.document.forms)==null?void 0:M.formStep1.elements,T=new URLSearchParams(n.location.search).get("choice");alert(`organization ${A.value}, choice:${T}`)},w=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:k})=>p({onsubmit:x({nextStep:k}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:k,previousStep:A})=>p(c(u(l({href:m(k.name,{choice:"choice1"})},"Choice 1")),u(l({href:m(k.name,{choice:"choice2"})},"Choice 2"))),a(h({href:m(A.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:k})=>p({onsubmit:y},s("My stepper 3 Content"),a(h({href:m(k.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>r(b({stepperDefs:w,stepperName:Ot}))},_c=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Rc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:Lc,createComponent:Pc},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:_c,createComponent:zc}]},jc=e=>{const t=F(e);return()=>t(Rc)},Hc=()=>oe.map(e=>`
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
`);function _n(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
    ${Hc()}
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=Z(r);return a({...d,class:D("switch",s,u,c,l,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Rn=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:s}=n.tags,i=_n(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},s("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),s("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Uc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s}=t.tags,i=_n(e);return()=>o(a(s({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",i({variant:"outline",id:"my-shinny-switch"}))))},Fc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Gc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Fc,createComponent:Uc}],gridItem:Rn},Vc=e=>{const t=F(e);return()=>t(Gc)},Wc=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Le(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:s}=t,{div:i,ul:r,li:l,a:c}=n.tags,u=o`
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
    ${Wc()}
  `;return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",tabsKey:f="tabs",...x},...y]=Z(p);const w=n.state(s),k=O=>w.val.find(N=>N.name==O),A=n.state(s[0]),B=()=>{var R,H;const N=new URLSearchParams(a.location.search).get(f)??s[0].name,j=k(N);(R=A.val.exit)==null||R.call(),A.val=j,(H=j==null?void 0:j.enter)==null||H.call()};B(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,N,j)=>{O.apply(N,j);const R=j[2]??"";["?","#"].includes(R[0])&&B()}});const T=O=>{const N=new URLSearchParams(a.location.search);return N.delete(f),N.append(f,O),`?${N.toString()}`},M=O=>{const{Header:N,disabled:j,name:R}=O;return l({class:()=>D(A.val.name==R&&"active",j&&"disabled")},c({href:T(R)},N(O)))},P=i({class:D("tabs",m,b,h,u,t==null?void 0:t.class,x.class),bauMounted:({element:O})=>{a.addEventListener("popstate",B)},bauUnmounted:()=>{a.removeEventListener("popstate",B)}},n.loop(w,r(),M),n.bind({deps:[A],render:()=>({Content:O})=>O?O(x):""}));return P.addEventListener("tab.add",O=>{var j;const{tab:N}=O.detail;(j=N.enter)==null||j.call(),w.val.push(N)},!1),P.addEventListener("tab.remove",O=>{var j;const N=w.val.findIndex(R=>R.name==O.detail.tabName);N>0&&((j=w.val[N].exit)==null||j.call(),w.val.splice(N,1))},!1),P}}const Xc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>s({})},Zc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Kc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>s({tabsKey:"my-tab"})},qc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,jn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Jc=e=>{const{css:t}=e,n=Le(e,{tabDefs:jn(e),class:t`
      flex-direction: column-reverse;
    `});return()=>n({})},Yc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Qc=e=>{const{css:t}=e,n=jn(e),o=Le(e,{tabDefs:n,class:t`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},el=`import tabs from "@grucloud/bau-ui/tabs";
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
`,tl={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Zc,createComponent:Xc},{title:"Extended Tabs",description:"An extended tabs.",code:qc,createComponent:Kc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Yc,createComponent:Jc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:el,createComponent:Qc}]},nl=e=>{const t=F(e);return()=>t(tl)};function ze(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:s}=n.tags;a`
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
  `;return function(...l){let[{...c},...u]=Z(l);return s({...c,class:D("table-container",i,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const ol=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=t.tags;function d(f,x,y,w,k){return{name:f,calories:x,fat:y,carbs:w,protein:k}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],b=({name:f,calories:x})=>i(s(f),s({class:n`
            text-align: right;
          `},x)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=ze(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(r(u("Basic Table"),m(),c(p.map(b)))))},al=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const rl=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],sl=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=t.tags,d=({name:m,calories:h})=>i(s(m),s({class:n`
            text-align: right;
          `},h)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=ze(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(r(u("Table Dense"),p(),c(rl.map(d)))))},il=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ae(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const cl=[Ae("Frozen yoghurt",159,6,24,4),Ae("Ice cream sandwich",237,9,37,4.3),Ae("Eclair",262,16,24,6),Ae("Cupcake",305,3.7,67,4.3),Ae("Gingerbread",356,16,49,3.9)],ll=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=t.tags,d=({name:m,calories:h})=>i(s(m),s({class:n`
            text-align: right;
          `},h)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=ze(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(r(u("Table Zebra"),p(),c(cl.map(d)))))},ul=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,dl={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:al,createComponent:ol},{title:"Dense",description:"A dense table.",code:il,createComponent:sl},{title:"Zebra",description:"A zebra table.",code:ul,createComponent:ll}]},pl=e=>{const t=F(e);return()=>t(dl)},ml=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:s,section:i,article:r}=t.tags,l=tn(e),c=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),s({id:"h3-1-1"},"h3 1 1"),s({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),s({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},gl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,bl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:gl,createComponent:ml}]},hl=e=>{const t=F(e);return()=>t(bl)};function Hn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=ht(e),i=X(e),r=xe(e),l=o`
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
  `,c=({label:m,icon:h,...f})=>i({"aria-label":m,title:m,...f},h),u=({count:m,totalCount:h,page:f,rowsPerPage:x})=>a({class:"pages-numbers"},Number(f-1)*Number(x)+(m>0?1:0),"-",Math.min(f*x,h)," of ",h),d=({count:m,page:h,rowsPerPage:f})=>a({class:"pages-numbers"},(h-1)*f+(m>0?1:0),"-",h*f),p=m=>m<=1,b=(m,h,f)=>m>=Math.ceil(h/f);return function(...h){let[{size:f=t.size??"md",variant:x=t.variant??"outline",color:y=t.color??"neutral",count:w=0,totalCount:k=0,page:A=1,rowsPerPage:B=50,onPageChange:T,isLoading:M=!1,disableFirst:P=()=>p(A),disablePrevious:O=()=>p(A),disableNext:N=()=>b(A,k,B),disableLast:j=()=>b(A,k,B),...R},...H]=Z(h);const K=Math.max(0,Math.ceil(k/B)),S=T({page:1}),g=T({page:A-1}),v=T({page:A+1}),C=T({page:K}),E=[{label:"First",icon:"⟪",onclick:S,disabled:P()},{label:"Previous",icon:"⟨",onclick:g,disabled:O()},{label:"Next",icon:"⟩",onclick:v,disabled:N()},{label:"Last",icon:"⟫",onclick:C,disabled:j()}];return a({...R,class:D("table-pagination",l,M&&"disabled",t==null?void 0:t.class,R==null?void 0:R.class)},r({class:"spinner",visibility:M,size:"md"}),k>0?u({count:w,totalCount:k,page:A,maxPages:K,rowsPerPage:B}):d({count:w,page:A,maxPages:K,rowsPerPage:B}),s({variant:x,color:y},E.map(L=>c({...L,variant:x,color:y}))))}}const fl=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),vl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:s,table:i,thead:r,tbody:l}=t.tags,c=fl(45),u=({name:y,email:w})=>s(a(y),a(w)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Hn(e),b=ze(e,{class:n`
      max-width: 650px;
    `}),m=t.state(c),h=t.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),f=t.derive(()=>m.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),x=({page:y})=>w=>{h.val.page=y};return()=>b(i(d(),()=>l(f.val.map(u))),()=>p({...h.val,onPageChange:x}))},xl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:s,table:i,thead:r,tbody:l,div:c}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),b=t.derive(()=>d.val.length),m=t.state(1),h=t.state(10),f=t.derive(()=>d.val),x=P=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(P).toString()}`,y=({page:P})=>O=>{m.val=P,w(x({page:P,per_page:h.val}))};w(x({page:1,per_page:h.val}));async function w(P){try{u.val=!0;const O=await fetch(P,{});if(O.ok){const N=await O.json();d.val=N;return}throw O}catch(O){p.val=O.message}finally{u.val=!1}}const k=({name:P,description:O,stargazers_count:N})=>s(a(P),a(O),a({class:n`
            text-align: right;
          `},N)),A=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),B=Hn(e),T=ze(e,{class:n`
      min-width: 650px;
    `}),M=({message:P})=>c(P);return()=>T(()=>B({rowsPerPage:h.val,page:m.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:y,disableNext:()=>!1}),i(A(),()=>p.val&&M({message:p.val}),()=>l(f.val.map(k))))},yl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:s,h2:i,tr:r}=t.tags,l=vl(e),c=xl(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(r("Table Pagination")),s("Asynchronous Pagination"),u(c()),s("Simple Pagination"),u(l()))};function _e(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:s}=n.tags;a`
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:b,onChange:m,...h},...f]=Z(l);return s({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>x=>x},class:{deps:[p],renderProp:()=>x=>D("toggle",c,d,u,i,x&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:b},f)}}const Un=(e,t)=>{const{bau:n}=e,o=_e(e,t);return a=>{const s=n.state(!1);return o({...a,selected:s,onclick:()=>s.val=!s.val},"Toggle Me")}},wl=e=>{const{bau:t}=e,{section:n}=t.tags,o=_e(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Sl=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Cl={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Sl,createComponent:wl}],gridItem:Un},El=e=>{const t=F(e);return()=>t(Cl)},kl=()=>oe.map(e=>`
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
`);function vt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
    ${kl()}
  `;return function(...r){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...b},...m]=Z(r);const h=new Set,f=x=>{const{value:y}=x.target;d?(h.clear(),h.add(y)):h.has(y)?h.delete(y):h.add(y),p({event:x,values:[...h]})};return a({...b,class:D("toggle-group",l,u,c,s,t==null?void 0:t.class,b==null?void 0:b.class),onclick:f},...m)}}const Fn=(e,t)=>{const{bau:n}=e,o=vt(e,t),a=_e(e,t);return s=>{const i=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...s,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:u})=>()=>a({...s,value:u,selected:i.val.includes(u),"area-label":c},c)))}},Al=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s=_e(e),i=vt(e),r="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:r,variant:l,exclusive:!0,onChange:c},a.map(({label:u,value:d})=>()=>s({color:r,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},Tl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Dl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s=_e(e),i=vt(e),r="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:r,variant:l,onChange:c},a.map(({label:u,value:d})=>()=>s({color:r,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},Ml=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Il={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Tl,createComponent:Al},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Ml,createComponent:Dl}],gridItem:Fn},Nl=e=>{const t=F(e);return()=>t(Il)};function xt(e,t={}){const{bau:n,css:o,window:a}=e,{div:s}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:b=t.color??"neutral",...m},...h]=Z(l);const f=s({class:D("container",...u.split("-"))},s({class:D("content",b,p,d),role:"tooltip"},c)),x=T=>`move-to-${T}`,y=(T,M,P)=>{if(T()){const O=x(M);f.classList.add(O),f.classList.add(M),f.classList.remove(P)}},w=(T,M)=>{const P=x(T);f.classList.contains(P)&&(f.classList.remove(P),f.classList.add(M),f.classList.remove(T))},k=T=>{const M=f.getBoundingClientRect();y(()=>M.x<0,"right","left"),y(()=>M.x+M.width>a.innerWidth,"left","right"),y(()=>M.y<0,"bottom","top"),y(()=>M.bottom>a.innerHeight,"top","bottom"),f.classList.add("visible")},A=T=>{f.classList.remove("visible"),w("right","left"),w("left","right"),w("bottom","top"),w("top","bottom")};return s({...m,class:D("tooltip",i,t==null?void 0:t.class,m==null?void 0:m.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",k),T.addEventListener("mouseout",A)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",k),T.removeEventListener("mouseout",A)}},...h,f)}}const Gn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:s}=n.tags,i=X(e),r=xt(e,t),l=()=>o(a("A ",s("tooltip")," can be any component"));return c=>r({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},$l=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,s=X(e),i=xt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:r()},s("tooltip"))},Bl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ol=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:s,section:i}=t.tags,r=Ie(e,{variant:"outline",color:"primary"}),l=xt(e),c=()=>o(a("A ",s("tooltip")," can be any component")),u=()=>i({class:n`
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
          `},l({side:"bottom-start",titleEl:c()},r("bottom start")),l({side:"bottom-centered",titleEl:c()},r("bottom centered")),l({side:"bottom-end",titleEl:c()},r("bottom end"))));return()=>u()},Pl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ll={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Bl,createComponent:$l},{title:"Grid",description:"Various tooltip position",code:Pl,createComponent:Ol}],gridItem:Gn},zl=e=>{const t=F(e);return()=>t(Ll)},Vn=(e,t)=>{const n=st(e,t);return o=>n(o)},_l=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return()=>n(o({}))},Rl=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,jl={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Rl,createComponent:_l}],gridItem:Vn},Hl=e=>{const t=F(e);return()=>t(jl)},Ul=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Wn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:s}=t,{ul:i,li:r,nav:l,div:c}=n.tags,u=Ul({css:o,createGlobalStyles:a}),d=mt(e),p=({depth:b=1,maxDepth:m,color:h,variant:f,size:x})=>y=>{const{children:w,expanded:k}=y,A=n.state(!k),B=()=>c({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:M=>{w&&(A.val=!A.val)}},s(y.data)),T=()=>i({class:D(h,x)},w.map(p({depth:b+1,maxDepth:m})));return r(d({size:x,Header:B,Content:w&&b<m&&T}))};return function({tree:m,maxDepth:h=1/0,size:f=t.size??"md",variant:x=t.variant??"outline",color:y=t.color??"neutral",...w}){return l({class:D(u.nav,f,x,y,t==null?void 0:t.class,w.class)},m.children&&i(m.children.map(p({maxDepth:h,color:y,variant:x,size:f}))))}}const Xn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Wn(e,{renderMenuItem:({name:r,href:l})=>o({href:l},r),...t});return r=>i({...r,tree:a})},Fl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Wn(e,{renderMenuItem:({name:i,href:r})=>n({href:r},i)});return()=>s({tree:o})},Gl=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Vl={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Gl,createComponent:Fl}],gridItem:Xn},Wl=e=>{const t=F(e);return()=>t(Vl)},Xl=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...t});return r=>i(r)},Zl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:s,p:i,ul:r,li:l}=t.tags,c=nn(e),u=X(e),d=[{name:"Accordion",Item:on(e)},{name:"Alert",Item:rn(e)},{name:"Autocomplete",Item:cn(e)},{name:"Avatar",Item:sn(e)},{name:"Badge",Item:un(e)},{name:"Breadcrumbs",Item:dn(e)},{name:"Button",Item:pn(e)},{name:"Button Group",Item:mn(e)},{name:"Calendar",Item:bn(e)},{name:"Checkbox",Item:fn(e)},{name:"Chip",Item:hn(e)},{name:"DrillDown Menu",Item:xn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:wn(e)},{name:"Input",Item:Sn(e)},{name:"Input Search",Item:Cn(e)},{name:"Linear Progress",Item:kn(e)},{name:"Loading Button",Item:An(e)},{name:"Modal",Item:Dn(e)},{name:"Radio Button",Item:In(e)},{name:"Select",Item:Nn(e)},{name:"Select Native",Item:Bn(e)},{name:"Slider",Item:On(e)},{name:"Spinner",Item:Pn(e)},{name:"Switch",Item:Rn(e)},{name:"Tabs",Item:Xl(e)},{name:"Theme Switch",Item:Vn(e)},{name:"Toggle",Item:Un(e)},{name:"Toggle Group",Item:Fn(e)},{name:"Tooltip",Item:Gn(e)},{name:"Tree View",Item:Xn(e)}];return()=>o({class:n`
          overflow-y: scroll;
        `},s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:p})=>l(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},c(p))))},Kl=({context:e})=>{const t=Zl(e);return[{path:"",action:n=>({title:"Bau UI",component:Bo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:za(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Xa(e)})},{path:"alert",action:()=>({title:"Alert",component:tr(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:sr(e)})},{path:"animate",action:()=>({title:"Animate",component:pr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Dr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:vr(e)})},{path:"badge",action:()=>({title:"Badge",component:$r(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:_r(e)})},{path:"button",action:()=>({title:"Button",component:Gr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Kr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Qr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:rs(e)})},{path:"chip",action:()=>({title:"Chip",component:ls(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:bs(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:xs(e)})},{path:"divider",action:()=>({title:"Divider",component:Es(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Ms(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Ps(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Rs(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Fs(e)})},{path:"form",action:()=>({title:"Form",component:Js(e)})},{path:"input",action:()=>({title:"Input",component:ti(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:ri(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:li(e)})},{path:"list",action:()=>({title:"List",component:yi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:mi(e)})},{path:"modal",action:()=>({title:"Modal",component:Ei(e)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:$i(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Hi(e)})},{path:"paper",action:()=>({title:"Paper",component:Wi(e)})},{path:"popover",action:()=>({title:"Popover",component:Li(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:qi(e)})},{path:"select",action:()=>({title:"Select",component:ic(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:dc(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:wc(e)})},{path:"slider",action:()=>({title:"Slider",component:Mc(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Bc(e)})},{path:"stepper",action:()=>({title:"Stepper",component:jc(e)})},{path:"switch",action:()=>({title:"Switch",component:Vc(e)})},{path:"table",action:()=>({title:"Table",component:pl(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:hl(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:yl(e)})},{path:"tabs",action:()=>({title:"Tabs",component:nl(e)})},{path:"toggle",action:()=>({title:"Toggle",component:El(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Nl(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:zl(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Hl(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Wl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:Lo(e)})}]},ql=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Jl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=e,i=a.state(),r=t({componentState:i});return document.getElementById("app").replaceChildren(r),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:b=t}=c.resolve({pathname:u});i.val=p({}),document.title=`${d}`}},Yl=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};uo();const Zn={title:"Bau",base:"/bau/bau-ui"},be=xo({config:Zn}),{bau:Ql}=be;be.states={drawerOpen:Ql.state(!0)};Yl(be);eo({routes:Kl({context:be}),onLocationChange:Jl({context:be,LayoutDefault:Mo(be),config:Zn}),notFoundRoute:ql(be)});
