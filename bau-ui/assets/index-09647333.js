(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Jn=(e,t)=>({...e,paths:[...t,e.path]}),Pt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Jn(o,e);return n?[a,...Pt({paths:[...e,o.path],routes:n})]:a}),Yn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},Qn=({routes:e=[],notFoundRoute:t})=>{const n=Pt({routes:e}).map(o=>({...o,regex:Yn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function eo({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const a=s=>{o={...s}},i=Qn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",s=>{o.pathname!=s.target.location.pathname&&n({router:i}),a(s.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(s,r,c)=>{s.apply(r,c),o.pathname!=window.location.pathname&&n({router:i}),a(window.location)}}),document.addEventListener("click",s=>{const{target:r}=s,c=r.closest("a");if(!c)return;const l=c.getAttribute("href");l&&!l.startsWith("http")&&!l.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",l),history.pushState({},null,l),a(window.location),["?","#"].includes(l[0])||window.scrollTo({top:0,left:0}),s.preventDefault())}),n({router:i}),i}const at=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],to=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],no=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],wt=e=>`var(--color-${e})`,oo=e=>`var(--color-${e}-lightest)`,ao=()=>at.map(([e])=>`
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
`),co=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...to.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...no.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function lo({createGlobalStyles:e},{colorPalette:t=at}={}){e`
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
    body {
      margin: 0;
    }
  `}function uo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let rt=e=>Object.prototype.toString.call(e??0).slice(8,-1),po=e=>rt(e)=="Object",Ct=e=>rt(e)=="Function",tt=e=>["Object","Array"].includes(rt(e)),Et=Object.getPrototypeOf,nt=e=>ye(e)?e.val:e,ye=e=>e==null?void 0:e.__isState,mo=["splice","push","pop","shift","unshift","sort","reverse"],He=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const K=e=>!ye(e[0])&&po(e[0])?e:[{},...e];function go(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=S=>n.createElement(S),l=(S,m,v)=>{let C=r;r=m;let E=S(v);return r=C,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(S=>{S.bindings=S.bindings.filter(m=>{var v;return(v=m.element)==null?void 0:v.isConnected}),!S.bindings.length&&!S.computed&&a.delete(S)}),o=void 0}))},p=(S,m,v,C,E,H)=>{var L;if(s){i.add(S);return}for(let V of S.bindings){let{deps:F,element:$,renderInferred:J,render:ne,renderItem:X}=V;if(X&&m)(L=g($,C,(...ee)=>f(X(...ee)),v,E,H)[m])==null||L.call();else{let ee=J?J({element:$}):ne({element:$,renderItem:X})(...F.map(nt));ee!==$&&$.replaceWith(V.element=f(ee))}}w(S),u()},d=(S,m,v=[])=>({get(C,E,H){var L;if(r==null||r.add(S),E==="_isProxy")return!0;if(!((L=C[E])!=null&&L._isProxy)&&!ye(C[E])&&tt(C[E]))C[E]=new Proxy(C[E],d(S,m,[...v,E]));else if(mo.includes(E)){let V=C[E];return(...F)=>{let $=V.apply(C,F);return p(S,E,$,F,m,v),$}}return Reflect.get(C,E,H)},set(C,E,H,L){let V=Reflect.set(C,E,H,L);return p(S,"setItem",V,{prop:E,value:H},m,[...v,E]),V}}),b=(S,m)=>new Proxy(m,d(S,m)),g=(S,m,v,C,E,H)=>{let L=()=>S.replaceChildren(...He(C,v)),V=F=>S[F]&&S.removeChild(S[F]);return{assign:L,sort:L,reverse:L,setItem:()=>{var $;let F=H[0];($=S.children[F])==null||$.replaceWith(v(E[F],F))},push:()=>S.append(...He(m,(F,$)=>v(F,E.length+$))),unshift:()=>S.prepend(...He(m,v)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:F}=S.children;let[$,J=F,...ne]=m;for(let X=$>=0?Math.min($+J-1,F-1):F-1;X>=($>=0?$:F+$);X--)S.children[X].remove();if(ne.length){let X=ne.forEach((ee,ie)=>v(ee,$+ie));S.children[$]?S.children[$].after(...X):S.append(...X)}}}},h=S=>({oldVal:S,bindings:[],listeners:[],__isState:!0,get val(){let m=this;return r==null||r.add(m),m.valProxy??(m.valProxy=tt(S)?b(m,S):S,m.valProxy)},set val(m){let v=this,C=v.val;tt(m)?(v.valProxy=b(v,m),p(v,"assign",m)):m!==C&&(v.valProxy=m,p(v)),v.oldVal=C}}),f=S=>{if(S==null||S===!1){const m=c("span");return m.style.display="none",m}else return S.nodeType?S:n.createTextNode(S)},x=(S,m)=>{let v=new Set;return m.val=l(S,v),v},y=S=>{let m=h(),v=x(S,m);m.computed=!0;for(let C of v)C.listeners.push({computed:S,deps:v,state:m});return m},w=S=>{for(let m of[...S.listeners])x(m.computed,m.state)},k=(S,...m)=>{if(m.length){let v=[];for(let C of m.flat(1/0))C!=null&&v.push(ye(C)?j({deps:[C],render:()=>E=>E}):Ct(C)?R({renderInferred:C}):f(C));S.append(...v)}},A={},B=(S,m)=>S&&(Object.getOwnPropertyDescriptor(S,m)??B(Et(S),m)),T=(S,m,v)=>{var C;return A[S+","+m]??(A[S+","+m]=((C=B(v,m))==null?void 0:C.set)??0)},M=(S,m)=>new t.MutationObserver((v,C)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(H=>H===S&&(m({element:S}),C.disconnect(),!0)))}).observe(S.parentNode,{childList:!0}),P=(S,m)=>new t.MutationObserver((v,C)=>v.forEach(E=>m({record:E,element:S}))).observe(S,{childList:!0}),O=S=>new Proxy(function(v,...C){var V;let[E,...H]=K(C),L=S?n.createElementNS(S,v):c(v);for(let[F,$]of Object.entries(E)){if(F.startsWith("bau"))continue;let J=T(v,F,Et(L))?ne=>ne!==void 0&&(L[F]=ne):ne=>L.setAttribute(F,ne);$==null||(ye($)?j({deps:[$],render:()=>()=>(J($.val),L)}):Ct($)&&(!F.startsWith("on")||$.isDerived)?R({renderInferred:()=>(J($({element:L})),L)}):$.renderProp?j({deps:$.deps,render:()=>()=>(J($.renderProp({element:L})(...$.deps.map(nt))),L)}):J($))}return E.bauChildMutated&&P(L,E.bauChildMutated),k(L,...H),L.autofocus&&L.focus&&t.requestAnimationFrame(()=>L.focus()),(V=E.bauCreated)==null||V.call(E,{element:L}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:L})),E.bauUnmounted&&t.requestAnimationFrame(()=>M(L,E.bauUnmounted)),L},{get:(m,v)=>m.bind(void 0,v)}),N=(S,m,v)=>{S.element=f(v);for(let C of m)ye(C)&&(a.add(C),C.bindings.push(S));return S.element},R=({renderInferred:S,element:m})=>{let v=new Set,C=l(S,v,{element:m});return N({renderInferred:S},v,C)},j=({deps:S,element:m,render:v,renderItem:C})=>N({deps:S,render:v,renderItem:C},S,v({element:m,renderItem:C})(...S.map(nt))),U=(S,m,v)=>j({deps:[S],render:({renderItem:C})=>E=>(m.append(...He(E,C)),m),renderItem:v}),z=S=>{s=!0,S(),s=!1,i.forEach(p),i.clear()};return{tags:O(),tagsNS:O,state:h,bind:j,loop:U,derive:y,stateSet:a,batch:z}}const bo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},ho=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},fo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function vo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=fo(a,i),r=bo(s);return!t.getElementById(r)&&ho(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function xo(e){const t=go(),n=vo();return lo(n),{bau:t,...n,tr:o=>o,window,...e}}function D(...e){return e.filter(t=>t).join(" ")}function We(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:D("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:p})=>{[...u.removedNodes].forEach(d=>{if(!s()||d.getAttribute("cloned"))return;const b=d.cloneNode(!0);b.setAttribute("cloned",!0),b.style.top=0,b.style.left=0,b.style.width=d.getAttribute("width"),b.style.height=d.getAttribute("height"),b.style.position="absolute",b.style.animation=s(),u.target.appendChild(b),b.addEventListener("animationend",()=>{var g;return(g=b.parentNode)==null?void 0:g.removeChild(b)})}),[...u.addedNodes].forEach(d=>{if(d.getAttribute("cloned"))return;p.style.position="relative";const b=d.getBoundingClientRect();if(d.setAttribute("width",b.width+"px"),d.setAttribute("height",b.height+"px"),r()){d.style.animation=r();const g=()=>{d.removeEventListener("animationend",g),d.style.animation=""};d.addEventListener("animationend",g)}})},...c},l)}}const oe=["neutral","primary","success","danger","warning"],yo=["plain","outline","solid"],wo=["sm","md","lg"],So=()=>oe.map(e=>`
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
`);function Z(e,t={}){const{bau:n,css:o}=e,a=o`
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
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...p},...d]=K(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...p,class:D("button",t.class,c,r,l,a,p.class),href:u},d)}}const Co="light",Eo=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function st(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Co);const l=o`
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
  `;return function(...p){let[{size:d=t.size??"md",variant:b=t.variant??"plain",color:g=t.color??"neutral",...h},...f]=K(p);return i({required:"required",title:"Switch Theme",...h,class:D("theme-switch",g,b,d,l,t==null?void 0:t.class,h.class),type:"checkbox",checked:r()=="dark",onclick:x=>{s(x.target.checked?"dark":"light")}},...f)}}function ko(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:p,b:d,ul:b,li:g}=n.tags,{svg:h,path:f}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,y=Z(e,{class:o`
      background: transparent;
    `}),w=st(e),k=()=>s(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},f({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>l({class:o`
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
        `},w(),y({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},A(),B())}}function Ao({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:p}=t.tags,d=({links:h,title:f})=>o({class:n`
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
        `},p(f),r(h.map(({href:x,name:y})=>c(s({href:x},y))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],g=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},d({title:"Bau UI",links:b}),d({title:"Bau Ecosystem",links:g})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.61.2"),i("MIT license")))}}function be(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=K(r);return a({...p,class:D("list",i,u,l,c,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const Ue="0.3s",Lt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(Lt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},zt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=zt(e)(t.children[o]);if(a)return a}},To=({keyframes:e})=>({hideToLeft:e`
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
   `});function it(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=z=>{var S;return((S=z.parentTree.data)==null?void 0:S.href)??z.parentTree.children[0].data.href},u=({variant:z,color:S,size:m,currentTree:v,data:C})=>w(T({variant:z,color:S,size:m,href:`${c}${l(v)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:z,color:S,size:m,href:`${c}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),p=({size:z,subTree:{data:{name:S,href:m},children:v=[]}})=>T({size:z,href:`${c}${m}`,"data-ischild":!v.length},S),d=({pathname:z,subTree:S})=>{var m;return z===((m=S==null?void 0:S.data)==null?void 0:m.href)},{renderHeader:b=u,renderMenuItem:g=p,isActive:h=d}=t,{li:f,nav:x,div:y,header:w,a:k}=n.tags,A=We(e),B=be(e),T=Z(e,{class:o`
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
  `,N=({children:z,pathnameState:S,variant:m,color:v,size:C})=>B({class:D(m,v,C)},z.map(E=>f({class:()=>D(E.children&&"has-children",h({pathname:S.val,subTree:E})&&"active")},g({variant:m,color:v,size:C,subTree:E})))),R=({variant:z,color:S,size:m,currentTree:v,pathnameState:C})=>{const{children:E,parentTree:H,data:L,renderList:V}=v;return y({class:D("drillDownMenu",z,S,m)},H&&b({variant:z,color:S,size:m,data:L,currentTree:v}),E&&V?V({renderListDefault:N,children:E,pathnameState:C,variant:z,color:S,size:m}):N({children:E,pathnameState:C,variant:z,color:S,size:m}))},j=({tree:z,pathname:S})=>{let m=Lt({})({...z}),v=zt(S)(m);return v||(v=m),v},U=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",z=>{const{target:S}=z,m=S.getAttribute("href");if(S.tagName==="A"&&m&&!m.startsWith("http")&&!m.startsWith("#")&&!m.startsWith("?")){let v=m.replace(c,"");r||(v=v.replace(S.hash,"")),U.val=v}}),function(S){const{size:m=t.size??"md",variant:v=t.variant??"plain",color:C=t.color??"neutral",tree:E,...H}=S;let L,V=n.derive(()=>(L=j({tree:E,pathname:U.val}),L)),F=1;const $=X=>{const{dataset:ee}=X.target;ee.buttonback=="true"?F=-1:ee.ischild=="false"?F=1:ee.ischild=="true"&&(F=0)},J=X=>{switch(X){case 1:return`${M} ${Ue}`;case-1:return`${P} ${Ue}`;default:return""}},ne=X=>{switch(X){case 1:return`${P} ${Ue} reverse`;case-1:return`${M} ${Ue} reverse`;default:return""}};return x({class:D(O,v,C,m,t==null?void 0:t.class,H.class),onclick:$},A({animationHide:()=>J(F),animationShow:()=>ne(F)},n.bind({deps:[V],render:()=>()=>R({variant:v,color:C,size:m,currentTree:L,pathnameState:U})})))}}const Do=()=>oe.map(e=>`
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
    ${Do()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:D("input",t.class,t.size??"md",l,c,i,u.class)})}}function ct(e,t={}){const{bau:n,css:o,window:a}=e,i=ue(e,t);return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r,d=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${d};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return i({type:"search",...u,color:l,variant:c,class:D("inputSearch",t.class,b,u.class)})}}function _t(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:p,span:d}=n.tags,b=ct(e,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:y,children:w,pathnameState:k,variant:A,color:B,size:T})=>{const M=n.state(""),P=n.derive(()=>M.val==""?w:w.filter(N=>N.data.name.match(new RegExp(`${M.val}`,"i")))),O=N=>{M.val=N.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},b({autocomplete:!1,name:"search",autofocus:!0,value:M,placeholder:`Search ${P.val.length} components`,size:22,oninput:O}),()=>y({children:P.val,pathnameState:k,variant:A,color:B,size:T}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let f=!1;const x=it(e);return function(){return r({bauMounted:({element:w})=>{s.innerWidth<=640&&(f=!0,i.drawerOpen.val=!1)},onclick:w=>{f&&!w.target.dataset.buttonback&&!w.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:D(o`
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
          `)},x({tree:h}))}}const Mo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=We(e),r=ko(e),c=_t(e),l=Ao(e),u=a`
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
        `},r(),c(),s({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>p(),animationShow:()=>p("reverse")},()=>b.val),l())}};function Ie(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:p,...d},...b]=K(r);return a({...d,onclick:p,class:D("chip",t.class,c,l,u,p&&"clickable",i,d.class)},...b)}}function Io(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;Z(e);const c=n`
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
  `;return function({name:u,text:p,tagLine:d}){return a({class:c},i(u),s(p),r(d))}}function No(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function $o({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,p=({maxSize:d=151})=>({libName:b,size:g})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},b),s({class:n`
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
                  var(--color-success) ${g/d*100}%
                );
                justify-content: flex-end;
                width: ${g/d*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},g)));return function({data:b=[]}){return o({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Bo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=Io(e),l=No(e),u=Z(e);Ie(e);const p=$o(e),d=(...x)=>a({class:n`
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
          `},...x)),b=n``,g=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[i("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),d(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),d(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),d(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],f=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:h}),p({data:g}),f())}}function Oo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...d){return a("Login")}}const Po=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Oo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function Lo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Po(e)()))}}function zo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Rt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Rt(n)}),e}class kt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function jt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const _o="</span>",At=e=>!!e.scope,Ro=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class jo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=jt(t)}openNode(t){if(!At(t))return;const n=Ro(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){At(t)&&(this.buffer+=_o)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Tt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class lt{constructor(){this.rootNode=Tt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Tt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{lt._collapse(n)}))}}class Ho extends lt{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new jo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function De(e){return e?typeof e=="string"?e:e.source:null}function Ht(e){return he("(?=",e,")")}function Uo(e){return he("(?:",e,")*")}function Go(e){return he("(?:",e,")?")}function he(...e){return e.map(n=>De(n)).join("")}function Fo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ut(...e){return"("+(Fo(e).capture?"":"?:")+e.map(o=>De(o)).join("|")+")"}function Ut(e){return new RegExp(e.toString()+"|").exec("").length-1}function Vo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Wo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function dt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=De(o),s="";for(;i.length>0;){const r=Wo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Xo=/\b\B/,Gt="[a-zA-Z]\\w*",pt="[a-zA-Z_]\\w*",Ft="\\b\\d+(\\.\\d+)?",Vt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Wt="\\b(0b[01]+)",Zo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ko=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=he(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Me={begin:"\\\\[\\s\\S]",relevance:0},qo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Me]},Jo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Me]},Yo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Xe=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ut("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:he(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Qo=Xe("//","$"),ea=Xe("/\\*","\\*/"),ta=Xe("#","$"),na={scope:"number",begin:Ft,relevance:0},oa={scope:"number",begin:Vt,relevance:0},aa={scope:"number",begin:Wt,relevance:0},ra={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Me,{begin:/\[/,end:/\]/,relevance:0,contains:[Me]}]}]},sa={scope:"title",begin:Gt,relevance:0},ia={scope:"title",begin:pt,relevance:0},ca={begin:"\\.\\s*"+pt,relevance:0},la=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ge=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Xo,IDENT_RE:Gt,UNDERSCORE_IDENT_RE:pt,NUMBER_RE:Ft,C_NUMBER_RE:Vt,BINARY_NUMBER_RE:Wt,RE_STARTERS_RE:Zo,SHEBANG:Ko,BACKSLASH_ESCAPE:Me,APOS_STRING_MODE:qo,QUOTE_STRING_MODE:Jo,PHRASAL_WORDS_MODE:Yo,COMMENT:Xe,C_LINE_COMMENT_MODE:Qo,C_BLOCK_COMMENT_MODE:ea,HASH_COMMENT_MODE:ta,NUMBER_MODE:na,C_NUMBER_MODE:oa,BINARY_NUMBER_MODE:aa,REGEXP_MODE:ra,TITLE_MODE:sa,UNDERSCORE_TITLE_MODE:ia,METHOD_GUARD:ca,END_SAME_AS_BEGIN:la});function ua(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function da(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function pa(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ua,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ma(e,t){Array.isArray(e.illegal)&&(e.illegal=ut(...e.illegal))}function ga(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ba(e,t){e.relevance===void 0&&(e.relevance=1)}const ha=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=he(n.beforeMatch,Ht(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},fa=["of","and","for","in","not","or","if","then","parent","list","value"],va="keyword";function Xt(e,t,n=va){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Xt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,xa(c[0],c[1])]})}}function xa(e,t){return t?Number(t):ya(e)?0:1}function ya(e){return fa.includes(e.toLowerCase())}const Dt={},ge=e=>{console.error(e)},Mt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},xe=(e,t)=>{Dt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Dt[`${e}/${t}`]=!0)},Ve=new Error;function Zt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=Ut(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function wa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ge("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ve;if(typeof e.beginScope!="object"||e.beginScope===null)throw ge("beginScope must be object"),Ve;Zt(e,e.begin,{key:"beginScope"}),e.begin=dt(e.begin,{joinWith:""})}}function Sa(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ge("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ve;if(typeof e.endScope!="object"||e.endScope===null)throw ge("endScope must be object"),Ve;Zt(e,e.end,{key:"endScope"}),e.end=dt(e.end,{joinWith:""})}}function Ca(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ea(e){Ca(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),wa(e),Sa(e)}function ka(e){function t(s,r){return new RegExp(De(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Ut(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(dt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,d)=>d>0&&p!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[da,ga,Ea,ha].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[pa,ma,ba].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Xt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=De(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Aa(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Kt(e){return e?e.endsWithParent||Kt(e.starts):!1}function Aa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Kt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var Ta="11.8.0";class Da extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ot=jt,It=de,Nt=Symbol("nomatch"),Ma=7,qt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Ho};function c(m){return r.noHighlightRe.test(m)}function l(m){let v=m.className+" ";v+=m.parentNode?m.parentNode.className:"";const C=r.languageDetectRe.exec(v);if(C){const E=P(C[1]);return E||(Mt(i.replace("{}",C[1])),Mt("Falling back to no-highlight mode for this block.",m)),E?C[1]:"no-highlight"}return v.split(/\s+/).find(E=>c(E)||P(E))}function u(m,v,C){let E="",H="";typeof v=="object"?(E=m,C=v.ignoreIllegals,H=v.language):(xe("10.7.0","highlight(lang, code, ...args) has been deprecated."),xe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),H=m,E=v),C===void 0&&(C=!0);const L={code:E,language:H};z("before:highlight",L);const V=L.result?L.result:p(L.language,L.code,C);return V.code=L.code,z("after:highlight",V),V}function p(m,v,C,E){const H=Object.create(null);function L(I,_){return I.keywords[_]}function V(){if(!W.keywords){re.addText(te);return}let I=0;W.keywordPatternRe.lastIndex=0;let _=W.keywordPatternRe.exec(te),q="";for(;_;){q+=te.substring(I,_.index);const Q=ae.case_insensitive?_[0].toLowerCase():_[0],se=L(W,Q);if(se){const[le,Kn]=se;if(re.addText(q),q="",H[Q]=(H[Q]||0)+1,H[Q]<=Ma&&(je+=Kn),le.startsWith("_"))q+=_[0];else{const qn=ae.classNameAliases[le]||le;J(_[0],qn)}}else q+=_[0];I=W.keywordPatternRe.lastIndex,_=W.keywordPatternRe.exec(te)}q+=te.substring(I),re.addText(q)}function F(){if(te==="")return;let I=null;if(typeof W.subLanguage=="string"){if(!t[W.subLanguage]){re.addText(te);return}I=p(W.subLanguage,te,!0,yt[W.subLanguage]),yt[W.subLanguage]=I._top}else I=b(te,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(je+=I.relevance),re.__addSublanguage(I._emitter,I.language)}function $(){W.subLanguage!=null?F():V(),te=""}function J(I,_){I!==""&&(re.startScope(_),re.addText(I),re.endScope())}function ne(I,_){let q=1;const Q=_.length-1;for(;q<=Q;){if(!I._emit[q]){q++;continue}const se=ae.classNameAliases[I[q]]||I[q],le=_[q];se?J(le,se):(te=le,V(),te=""),q++}}function X(I,_){return I.scope&&typeof I.scope=="string"&&re.openNode(ae.classNameAliases[I.scope]||I.scope),I.beginScope&&(I.beginScope._wrap?(J(te,ae.classNameAliases[I.beginScope._wrap]||I.beginScope._wrap),te=""):I.beginScope._multi&&(ne(I.beginScope,_),te="")),W=Object.create(I,{parent:{value:W}}),W}function ee(I,_,q){let Q=Vo(I.endRe,q);if(Q){if(I["on:end"]){const se=new kt(I);I["on:end"](_,se),se.isMatchIgnored&&(Q=!1)}if(Q){for(;I.endsParent&&I.parent;)I=I.parent;return I}}if(I.endsWithParent)return ee(I.parent,_,q)}function ie(I){return W.matcher.regexIndex===0?(te+=I[0],1):(et=!0,0)}function ve(I){const _=I[0],q=I.rule,Q=new kt(q),se=[q.__beforeBegin,q["on:begin"]];for(const le of se)if(le&&(le(I,Q),Q.isMatchIgnored))return ie(_);return q.skip?te+=_:(q.excludeBegin&&(te+=_),$(),!q.returnBegin&&!q.excludeBegin&&(te=_)),X(q,I),q.returnBegin?0:_.length}function Ce(I){const _=I[0],q=v.substring(I.index),Q=ee(W,I,q);if(!Q)return Nt;const se=W;W.endScope&&W.endScope._wrap?($(),J(_,W.endScope._wrap)):W.endScope&&W.endScope._multi?($(),ne(W.endScope,I)):se.skip?te+=_:(se.returnEnd||se.excludeEnd||(te+=_),$(),se.excludeEnd&&(te=_));do W.scope&&re.closeNode(),!W.skip&&!W.subLanguage&&(je+=W.relevance),W=W.parent;while(W!==Q.parent);return Q.starts&&X(Q.starts,I),se.returnEnd?0:_.length}function Ee(){const I=[];for(let _=W;_!==ae;_=_.parent)_.scope&&I.unshift(_.scope);I.forEach(_=>re.openNode(_))}let ce={};function Y(I,_){const q=_&&_[0];if(te+=I,q==null)return $(),0;if(ce.type==="begin"&&_.type==="end"&&ce.index===_.index&&q===""){if(te+=v.slice(_.index,_.index+1),!a){const Q=new Error(`0 width match regex (${m})`);throw Q.languageName=m,Q.badRule=ce.rule,Q}return 1}if(ce=_,_.type==="begin")return ve(_);if(_.type==="illegal"&&!C){const Q=new Error('Illegal lexeme "'+q+'" for mode "'+(W.scope||"<unnamed>")+'"');throw Q.mode=W,Q}else if(_.type==="end"){const Q=Ce(_);if(Q!==Nt)return Q}if(_.type==="illegal"&&q==="")return 1;if(Qe>1e5&&Qe>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return te+=q,q.length}const ae=P(m);if(!ae)throw ge(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Re=ka(ae);let Ye="",W=E||Re;const yt={},re=new r.__emitter(r);Ee();let te="",je=0,pe=0,Qe=0,et=!1;try{if(ae.__emitTokens)ae.__emitTokens(v,re);else{for(W.matcher.considerAll();;){Qe++,et?et=!1:W.matcher.considerAll(),W.matcher.lastIndex=pe;const I=W.matcher.exec(v);if(!I)break;const _=v.substring(pe,I.index),q=Y(_,I);pe=I.index+q}Y(v.substring(pe))}return re.finalize(),Ye=re.toHTML(),{language:m,value:Ye,relevance:je,illegal:!1,_emitter:re,_top:W}}catch(I){if(I.message&&I.message.includes("Illegal"))return{language:m,value:ot(v),illegal:!0,relevance:0,_illegalBy:{message:I.message,index:pe,context:v.slice(pe-100,pe+100),mode:I.mode,resultSoFar:Ye},_emitter:re};if(a)return{language:m,value:ot(v),illegal:!1,relevance:0,errorRaised:I,_emitter:re,_top:W};throw I}}function d(m){const v={value:ot(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return v._emitter.addText(m),v}function b(m,v){v=v||r.languages||Object.keys(t);const C=d(m),E=v.filter(P).filter(N).map($=>p($,m,!1));E.unshift(C);const H=E.sort(($,J)=>{if($.relevance!==J.relevance)return J.relevance-$.relevance;if($.language&&J.language){if(P($.language).supersetOf===J.language)return 1;if(P(J.language).supersetOf===$.language)return-1}return 0}),[L,V]=H,F=L;return F.secondBest=V,F}function g(m,v,C){const E=v&&n[v]||C;m.classList.add("hljs"),m.classList.add(`language-${E}`)}function h(m){let v=null;const C=l(m);if(c(C))return;if(z("before:highlightElement",{el:m,language:C}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Da("One of your code blocks includes unescaped HTML.",m.innerHTML);v=m;const E=v.textContent,H=C?u(E,{language:C,ignoreIllegals:!0}):b(E);m.innerHTML=H.value,g(m,C,H.language),m.result={language:H.language,re:H.relevance,relevance:H.relevance},H.secondBest&&(m.secondBest={language:H.secondBest.language,relevance:H.secondBest.relevance}),z("after:highlightElement",{el:m,result:H,text:E})}function f(m){r=It(r,m)}const x=()=>{k(),xe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function y(){k(),xe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let w=!1;function k(){if(document.readyState==="loading"){w=!0;return}document.querySelectorAll(r.cssSelector).forEach(h)}function A(){w&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function B(m,v){let C=null;try{C=v(e)}catch(E){if(ge("Language definition for '{}' could not be registered.".replace("{}",m)),a)ge(E);else throw E;C=s}C.name||(C.name=m),t[m]=C,C.rawDefinition=v.bind(null,e),C.aliases&&O(C.aliases,{languageName:m})}function T(m){delete t[m];for(const v of Object.keys(n))n[v]===m&&delete n[v]}function M(){return Object.keys(t)}function P(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function O(m,{languageName:v}){typeof m=="string"&&(m=[m]),m.forEach(C=>{n[C.toLowerCase()]=v})}function N(m){const v=P(m);return v&&!v.disableAutodetect}function R(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=v=>{m["before:highlightBlock"](Object.assign({block:v.el},v))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=v=>{m["after:highlightBlock"](Object.assign({block:v.el},v))})}function j(m){R(m),o.push(m)}function U(m){const v=o.indexOf(m);v!==-1&&o.splice(v,1)}function z(m,v){const C=m;o.forEach(function(E){E[C]&&E[C](v)})}function S(m){return xe("10.7.0","highlightBlock will be removed entirely in v12.0"),xe("10.7.0","Please use highlightElement now."),h(m)}Object.assign(e,{highlight:u,highlightAuto:b,highlightAll:k,highlightElement:h,highlightBlock:S,configure:f,initHighlighting:x,initHighlightingOnLoad:y,registerLanguage:B,unregisterLanguage:T,listLanguages:M,getLanguage:P,registerAliases:O,autoDetection:N,inherit:It,addPlugin:j,removePlugin:U}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Ta,e.regex={concat:he,lookahead:Ht,either:ut,optional:Go,anyNumberOfTimes:Uo};for(const m in Ge)typeof Ge[m]=="object"&&Rt(Ge[m]);return Object.assign(e,Ge),e},we=qt({});we.newInstance=()=>qt({});var Ia=we;we.HighlightJS=we;we.default=we;const Te=zo(Ia),$t="[A-Za-z$_][0-9A-Za-z$_]*",Na=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],$a=["true","false","null","undefined","NaN","Infinity"],Jt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Yt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Qt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ba=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Oa=[].concat(Qt,Jt,Yt);function en(e){const t=e.regex,n=(v,{after:C})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,C)!==-1},o=$t,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,C)=>{const E=v[0].length+v.index,H=v.input[E];if(H==="<"||H===","){C.ignoreMatch();return}H===">"&&(n(v,{after:E})||C.ignoreMatch());let L;const V=v.input.substring(E);if(L=V.match(/^\s*=/)){C.ignoreMatch();return}if((L=V.match(/^\s+extends\s+/))&&L.index===0){C.ignoreMatch();return}}},r={$pattern:$t,keyword:Na,literal:$a,built_in:Oa,"variable.language":Ba},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},g={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},f={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,d]},y={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},w=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,g,h,f,{match:/\$\d+/},p];d.contains=w.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(w)});const k=[].concat(y,d.contains),A=k.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(k)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Jt,...Yt]}},P={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},N={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function R(v){return t.concat("(?!",v.join("|"),")")}const j={match:t.concat(/\b/,R([...Qt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},U={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},S="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(S)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),P,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,g,h,f,y,{match:/\$\d+/},p,M,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[y,e.REGEXP_MODE,{className:"function",begin:S,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},U,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},j,N,T,z,{match:/\$[(.]/}]}}function Pa(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const La=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",en),Te.registerLanguage("sh",Pa),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function za(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=La(e);return function(){return o({class:n`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=K(r);return a({...p,class:D("paper",c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}function tn(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),p=(f,x)=>{let y=null;return(...w)=>{a.clearTimeout(y),y=a.setTimeout(()=>f(...w),x)}},d=o`
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
  `,b=({value:f,id:x,children:y=[]})=>{const w=c({class:()=>u.val==x?"active":"",href:`#${x}`});return w.innerHTML=f,r({class:()=>u.val==x?"active":""},w,y.length>0&&s(y.map(b)))},g=f=>f.tagName.charAt(1),h=({contentEl:f})=>{const x=f.querySelectorAll(l);let y=2,w={},k={children:[]},A=k;const B=A;let T=[A];return[...x].forEach(M=>{const P=g(M);M.setAttribute("id",M.textContent),!M.innerHTML.includes("<button")&&(w={value:M.innerHTML,id:M.id??M.textContent,children:[]},y==P?(k=w,A.children.push(k)):y<P?(T.push(A),A=k,k.children.push(w),k=w):y>P&&(A=T[P-1],T=T.slice(0,P-1),A.children.push(w),k=w),y=P)}),B};return function(...x){let[{size:y=t.size??"md",variant:w=t.variant??"plain",color:k=t.color??"neutral",contentEl:A,...B}]=K(x);const T=h({contentEl:A}),M=p(()=>{const O=[...A.querySelectorAll(l)].find(N=>{const{top:R,height:j}=N.getBoundingClientRect();if(R+j>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return i({...B,class:D("tableOfContent",y,w,k,d,t==null?void 0:t.class,B==null?void 0:B.class),bauMounted:()=>{a.addEventListener("scroll",M)},bauUnmounted:()=>{a.removeEventListener("scroll",M)}},T.children&&s(T.children.map(b)))}}const nn=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:p,name:d}){return o({class:n`
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
        `},a(c(s(l(d??""),oe.map(b=>l(b)))),i(yo.map(b=>s(l(b),oe.map((g,h)=>r(p({color:g,variant:b},{index:h}))))))))}},_a=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},wo.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},G=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:p}=t.tags;Te.registerLanguage("javascript",en);const d=tn(e),b=Ne(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),g=nn(e),h=_a(e),f=({text:x})=>u({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:y})=>{y.innerHTML=Te.highlight(x,{language:"js"}).value}}));return function(y){const w=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(y.title),r(y.description),y.gridItem&&!y.variantColorTableDisable&&[c("Variant/Color"),b(g({Item:y.gridItem(e)}))],y.gridItem&&!y.variantSizeDisable&&[c("Size"),r("Component with size: ",p("sm"),", ",p("md"),", and ",p("lg")),b(h({item:y.gridItem}))],c("Usage"),l("Import"),f({text:y.importStatement}),c("Examples"),y.examples.map(k=>i(l(k.title),r(k.description),b(k.createComponent(e)({})),f({text:k.code}))));return o({class:n`
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
        `},w,d({contentEl:w}))}};function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:b=t.color??"neutral",Header:g,Content:h,close:f=!0,...x}]=K(u);const y=n.state(f);return a({...x,class:D("collapsible",p,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>D("header",h?y.val?"close":"open":""),onclick:w=>{y.val=!y.val,w.stopPropagation()}},g()),a({class:"content",role:"region",bauMounted:({element:w})=>{y.val&&(w.style.height="0px")},"aria-expanded":({element:w})=>(s({element:w,closeState:y}),!y.val)},h&&h()))}}const Ra=()=>oe.map(e=>`
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
`);function Ze(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
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
  `;return function(...p){let[{size:d=t.size??"md",variant:b=t.variant??"plain",color:g=t.color??"neutral",data:h=[],...f}]=K(p);const x=n.state(""),y=mt(e,{size:d,variant:b,color:g}),w=A=>B=>{x.val==A?x.val="":x.val=A},k=A=>{const{Header:B,Content:T,name:M}=A,P=()=>r({class:()=>D(x.val==M&&"active")},c({type:"button","aria-controls":`bau-${M}`,"aria-expanded":({element:N})=>x.val==M},B(A))),O=()=>a({id:`bau-${M}`,"data-state":({element:N})=>x.val==M},T(A));return s({class:D(g,b,d),onclick:w(M)},y({Header:P,Content:O}))};return a({class:D("accordion",l,t==null?void 0:t.class,f.class)},i(h.map(k)))}}const on=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=Ze(e,t);return r=>s({...r,data:i})},ja=e=>{const{bau:t}=e,{div:n,p:o,section:a}=t.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],s=Ze(e);return()=>a(s({data:i,color:"neutral",variant:"outline"}))},Ha=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
      `})},Ga=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Fa=e=>{const{css:t}=e,n=an(e),o=Ze(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
`,Wa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Ha,createComponent:ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ga,createComponent:Ua},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Va,createComponent:Fa}],gridItem:on},Xa=e=>{const t=G(e);return()=>t(Wa)},Za={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ka=()=>oe.map(e=>`
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
  `,r=Z(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"outline",color:b=t.color??"neutral",onRemove:g,...h},...f]=K(u);return a({...h,class:D("alert",`alert-${d}`,t.class,d,b,p,s,h.class),role:"alert"},i({class:"icon"},Za[b]),a({class:"content"},...f),g&&c({onclick:g}))}}const rn=(e,t)=>{const n=$e(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},qa=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=$e(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ja=`import alert from "@grucloud/bau-ui/alert";
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
`,er={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ja,createComponent:qa},{title:"Custom Alert ",description:"A custom alert.",code:Qa,createComponent:Ya}],gridItem:rn},tr=e=>{const t=G(e);return()=>t(er)},nr=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},p=({id:d,status:b})=>{const g=c.val.findIndex(h=>h.id===d);g!=-1&&(c.val[g].status=b)};return function(b={},...g){const h=({id:y})=>{p({id:y,status:"removing"});const w=c.val.findIndex(k=>k.id===y);w!=-1&&c.val.splice(w,1)},f=({Component:y})=>{const w={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};c.val.length>=i&&h({id:c.val[0].id}),c.val.push(w),setTimeout(()=>h(w),s)},x=y=>r({class:u.item,onclick:()=>h(y)},y.Component());return document.addEventListener("alert.add",y=>f(y.detail)),document.addEventListener("alert.remove",y=>h(y.detail)),r({class:D(u.stack,t==null?void 0:t.class,b.class)},n.loop(c,r(),x))}},or=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=nr(e,{deleteAfterDuration:2e4}),i=Z(e),s=$e(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ar=`import { Context } from "@grucloud/bau-ui/context";
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
`,rr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ar,createComponent:or}]},sr=e=>{const t=G(e);return()=>t(rr)},ir=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=We(e),s=Z(e),r=n`
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
`,lr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=We(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:d})=>l.val=d.id,p={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>p[l.val]()))},ur=`import animate from "@grucloud/bau-ui/animate";
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
`,dr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:cr,createComponent:ir},{title:"Component hide and show",description:"Hide and show a component",code:ur,createComponent:lr}]},pr=e=>{const t=G(e);return()=>t(dr)};function Se(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",...b},...g]=K(l);return i({...b,class:D("skeleton",u,r,t==null?void 0:t.class,b==null?void 0:b.class)},...g)}}function gt(e,t={}){const{bau:n,css:o}=e,{div:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},u=o`
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
  `;return function(...d){let[{size:b=t.size??"md",variant:g=t.variant??"plain",color:h=t.color??"neutral",width:f=40,height:x=40,alt:y,...w},...k]=K(d);const A=Se(e,{class:D(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${f}px;
        `,t==null?void 0:t.class,w.class)});return a({class:D(u,t==null?void 0:t.class,w.class)},()=>s.val&&A(),()=>r.val&&y,i({width:f,height:x,onload:c,onerror:l,class:()=>D(!s.val&&"visible",r.val&&"hide",h,g,b,u,t==null?void 0:t.class,w.class),...w}))}}const sn=(e,t)=>{const{css:n}=e,o=gt(e,{...t,class:n`
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
`,fr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:gr,createComponent:mr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:hr,createComponent:br}],gridItem:sn},vr=e=>{const t=G(e);return()=>t(fr)};function Be(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=Ne(e,{class:o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:p,onClose:d,...b},...g]=K(l);const h=y=>{x.style.opacity=1,x.showModal();const w=p.getBoundingClientRect(),k=x.getBoundingClientRect();w.x<a.innerWidth/2?x.style.left=w.left+"px":x.style.left=w.right-k.width+"px",w.y<a.innerHeight/2?(x.style.top=w.top+w.height+"px",x.style.height=Math.min(x.scrollHeight,a.innerHeight-w.top-w.height)+"px"):(x.style.top=Math.max(0,w.top-k.height)+"px",x.scrollHeight>w.top&&(x.style.height=w.top+"px"))},f=y=>{const w=()=>{x.close(),x.removeEventListener("transitionend",w)};x.addEventListener("transitionend",w),x.style.opacity=0},x=i({role:"presentation",class:D("popover",r,t==null?void 0:t.class,b==null?void 0:b.class),onclick:y=>{y.target===x&&(f(),d==null||d.call())}},s(u));return x.closeDialog=f,x.openDialog=h,x}}const Fe={sm:12,md:16,lg:24},xr=()=>oe.map(e=>`
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
`);function fe(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=t.size??"md",color:p=t.color??"primary",variant:d=t.variant??"outline",visibility:b=!0,...g}={}){const h=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Fe[u]};
      height: ${Fe[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${xr()}
    `;return i({class:{deps:[b],renderProp:()=>f=>D("spinner",h,p,d,f==!1?"":"visibility",t==null?void 0:t.class,g.class)},version:"1.1",x:"0px",y:"0px",width:Fe[u],height:Fe[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...g},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const yr=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ke(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:p=t.color??"neutral",label:d,placeholder:b,Option:g,options:h,defaultOption:f,getOptionLabel:x,getOptionValue:y,onSelect:w=()=>{},id:k,required:A,name:B,loading:T,...M},...P]=K(c);const O=Be(e),N=Z(e),R=ue(e,{variant:u,color:p,size:l}),j=be(e),U=fe(e,{variant:u,color:p,size:l}),z=n.state(f),S=n.state(M.value),m=n.state(!1),v=n.state(0),C=()=>{m.val=!1},E=n.state(h),H=Y=>ae=>Y.val&&x(ae)==x(Y.val),L=()=>{ce.openDialog(),m.val=!0,S.val="",E.val=h,v.val=h.findIndex(H(z));const Y=Ee.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),ve.scrollIntoView({block:"end"}))},V=()=>{ce.closeDialog(),m.val=!1,v.val=0},F=Y=>{const{value:ae}=Y.target;S.val=ae,ae?E.val=h.filter(Re=>x(Re).match(new RegExp(`${ae}`,"i"))):E.val=h},$=Y=>{ce.open?V():L()},J=Y=>{z.val=Y,Ce.value=y(Y)},ne=({option:Y,index:ae})=>Re=>{J(Y),v.val=ae,V()},X=()=>{const Y=Ee.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},ee=Y=>{switch(Y.key){case"Escape":V();break;case"ArrowDown":v.val<E.val.length-1?v.val++:v.val=0,X();break;case"ArrowUp":v.val<=0?v.val=E.val.length-1:v.val--,X();break;case"Enter":ce.open?(J(E.val[v.val]),V()):L(),Y.preventDefault();break}},ie=N({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":m,"aria-label":d,onclick:$,variant:u,color:p,size:l,class:T==!0&&"loading",disabled:T},()=>z.val?x(z.val):d,()=>T==!0&&U({visibility:T})),ve=R({value:S,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":m,oninput:F,onkeydown:ee,...M}),Ce=R({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:f&&y(f),required:A,name:B}),Ee=a({class:D(u,p,l,"content")},ve,()=>j({class:D(u,p,l)},E.val.map((Y,ae)=>i({class:()=>D(v.val==ae&&"active",H(z)(Y)&&"selected"),onclick:ne({option:Y,index:ae})},g(Y))))),ce=O({id:k,triggerEl:ie,contentEl:Ee,onClose:C,class:o`
        overflow: hidden;
      `});return a({...M,class:D("autocomplete",s,t==null?void 0:t.class,M==null?void 0:M.class)},n.bind({deps:[z],render:()=>Y=>{Y&&(Ce.value=y(Y),w(Y))}}),ie,Ce,ce)}}const cn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ke(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},wr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ke(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Sr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ke(e),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(u.label),i(u.code));return()=>o(s({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},Er=`import { Context } from "@grucloud/bau-ui/context";
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
`,kr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Z(e,{variant:"outline"}),r=Ke(e),c=t.state([]),l=t.state(!1),u=t.state("");async function p({url:g,transform:h=f=>f}){try{l.val=!0;const f=await fetch(g,{});if(f.ok){const x=await f.json();c.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{l.val=!1}}const d=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:g=>g.sort((h,f)=>h.name.common.localeCompare(f.name.common))});d();const b=g=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.flag),i(g.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:b,getOptionValue:({name:g})=>g.common,getOptionLabel:({name:g})=>g.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>d()},"Reload")))},Ar=`import { Context } from "@grucloud/bau-ui/context";
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
`,Tr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Sr,createComponent:wr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ar,createComponent:kr},{title:"Default Option",description:"A autocomplete with a default option.",code:Er,createComponent:Cr}],gridItem:cn},Dr=e=>{const t=G(e);return()=>t(Tr)};function ln(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:p,...d},...b]=K(r);return a({...d,class:D("badge",i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:D(u,l,c)},p),...b)}}const un=(e,t)=>{const n=ln(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o=ln(e);return()=>n(o({content:"10"},"☏"))},Ir=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Nr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ir,createComponent:Mr}],gridItem:un},$r=e=>{const t=G(e);return()=>t(Nr)};function bt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,{separator:c="〉"}=t,l=Z(e),u=o`
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
  `;return function(...d){let[{size:b=t.size??"md",variant:g=t.variant??"plain",color:h=t.color??"neutral",items:f,...x},...y]=K(d);return i({...x,class:D(u,t==null?void 0:t.class,x==null?void 0:x.class)},f.map(({href:w,name:k})=>s((w?l:r)({href:`${a.base}${w}`,color:h,variant:g,size:b,class:D(h,g,b)},k))))}}const dn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=bt(e,t);return a=>o({...a,...n})},Br=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},Or=`import { Context } from "@grucloud/bau-ui/context";
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
`,zr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Or,createComponent:Br},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Lr,createComponent:Pr}],gridItem:dn},_r=e=>{const t=G(e);return()=>t(zr)},pn=(e,t={})=>{const n=Z(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Z(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},jr=`import button from "@grucloud/bau-ui/button";
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
`,Hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Z(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Ur=`import button from "@grucloud/bau-ui/button";
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
`,Gr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:jr,createComponent:Rr},{title:"Disabled Button",description:"A disabled button.",code:Ur,createComponent:Hr}],gridItem:pn},Fr=e=>{const t=G(e);return()=>t(Gr)},Vr=()=>oe.map(e=>`
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
`);function ht(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=K(r);return a({...p,class:D("button-group",l,u,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...d)}}const mn=(e,t)=>{const n=["ONE","TWO","THREE"],o=Z(e,t),a=ht(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Wr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=Z(e),i=ht(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Xr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Zr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Xr,createComponent:Wr}],gridItem:mn},Kr=e=>{const t=G(e);return()=>t(Zr)};function gn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d},...b]=K(c);return a({...d,type:"date",class:D("calendar",s,p,u,l,t==null?void 0:t.class,d==null?void 0:d.class)},...b)}}const bn=(e,t)=>{const n=gn(e,t);return o=>n({...o})},qr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=gn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Jr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Yr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Jr,createComponent:qr}],gridItem:bn},Qr=e=>{const t=G(e);return()=>t(Yr)};function es(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",slides:d,Slide:b,Previous:g,Next:h,...f}]=K(c);const x=()=>{s.val<=0?s.val=d.length-1:s.val--},y=()=>{s.val>=d.length-1?s.val=0:s.val++},w=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},d.map(b));return a({...f,class:D("carousel",l,i,t==null?void 0:t.class,f==null?void 0:f.class)},a({class:D("control","control-previous"),onclick:x},g()),a({class:D("control","control-next"),onclick:y},h()),w)}}const ts=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],ns=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=Z(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=es(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:ts,Slide:s,Previous:c,Next:l}))},os=`import carousel from "@grucloud/bau-ui/carousel";
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
`,as={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:os,createComponent:ns}]},rs=e=>{const t=G(e);return()=>t(as)},hn=(e,t)=>{const n=Ie(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ss=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},is=`import chip from "@grucloud/bau-ui/chip";
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
`,cs={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:is,createComponent:ss}],gridItem:hn},ls=e=>{const t=G(e);return()=>t(cs)};function qe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=K(r);return a({type:"checkbox",...p,class:D(i,u,l,c,t==null?void 0:t.class,p==null?void 0:p.class)})}}const fn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=qe(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},us=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=qe(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},ds=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,ps=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,i=qe(e,{color:"neutral",variant:"outline"}),s=Z(e),r=c=>{c.preventDefault();const l=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(l))};return()=>a({onsubmit:r,class:n`
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
        `},o("My Checkbox",i({id:"my-checkbox-uncontrolled",name:"my-checkbox-uncontrolled"})),s({type:"submit"},"Submit"))},ms=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,gs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:ds,createComponent:us},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:ms,createComponent:ps}],gridItem:fn},bs=e=>{const t=G(e);return()=>t(gs)},hs=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=mt(e),i=Z(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},fs=`import button from "@grucloud/bau-ui/button";
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
`,vs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:fs,createComponent:hs}]},xs=e=>{const t=G(e);return()=>t(vs)};function ys(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=K(r);return a({...p,class:D("divider",c,i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:"content"},...d))}}const ws=e=>{const{bau:t}=e,{section:n}=t.tags,o=ys(e);return()=>n(o("OR"))},Ss=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Cs={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ss,createComponent:ws}],variantColorTableDisable:!0,variantSizeDisable:!0},Es=e=>{const t=G(e);return()=>t(Cs)};function ks(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:p,...d},...b]=K(r);return a({class:D(i,t==null?void 0:t.class,d.class)},a({class:()=>D("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>D("content",p.val&&"content-open")},b))}}const As=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=ks(e),s=Z(e),r=_t(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Ts=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ds={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ts,createComponent:As}]},Ms=e=>{const t=G(e);return()=>t(Ds)},Is=()=>oe.map(e=>`
`).join(`
`);function vn(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=Z(e),r=Be(e),c=be(e),l=o`
    ${Is()}
  `;return function(...p){let[{size:d=t.size??"md",variant:b=t.variant??"outline",color:g=t.color??"neutral",label:h,ListItem:f,items:x,...y},...w]=K(p);const k=n.state(0),A=()=>{j.openDialog(),j.focus()},B=()=>{j.closeDialog()},T=()=>{j.open?B():A()},M=U=>{T(),U.preventDefault()},P=({item:U,index:z})=>S=>{k.val=z,B(),S.preventDefault()},O=U=>{switch(U.preventDefault(),U.key){case"Escape":B();break;case"ArrowDown":k.val<options.length-1?k.val++:k.val=0;break;case"ArrowUp":k.val<=0?k.val=options.length-1:k.val--;break;case"Enter":T();break}},N=()=>c({tabindex:"0",class:D(g,b)},x.map((U,z)=>i({class:()=>D(k.val==z&&"active"),onclick:P({item:U,index:z})},f(U)))),R=s({type:"button",onclick:M,color:g,variant:b,size:d},h),j=r({triggerEl:R,contentEl:N()});return a({...y,class:D("dropdownMenu",g,d,l,t==null?void 0:t.class,y==null?void 0:y.class),onkeydown:O},R,j)}}const Ns=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,i=vn(e,t),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>i({...c,items:s,ListItem:r,label:"Action"})},$s=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,i=vn(e),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(i({items:s,ListItem:r,label:"Action"}))},Bs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Os={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Bs,createComponent:$s}],gridItem:Ns},Ps=e=>{const t=G(e);return()=>t(Os)},xn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=it(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Ls=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=it(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},zs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,_s={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:zs,createComponent:Ls}],gridItem:(e,t)=>xn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Rs=e=>{const t=G(e);return()=>t(_s)};function yn(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:p=t.size??"md",variant:d=t.variant??"outline",color:b=t.color??"neutral",Component:g,disabled:h,...f}=l;return a({class:D(r.base,h&&r.disabled,t==null?void 0:t.class,l.class)},i({class:D(d,b,p)},g({disabled:h}),s({type:"file",disabled:h,...f})))}}const wn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),p=yn(e,t),d=g=>{const h=g.target.files[0];h?u.val=h.name:u.val="No file selected"},b=({disabled:g})=>c({class:D(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,g&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return g=>p({Component:b,name:"file",accept:"text/*",onchange:d,...g})},js=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),p=yn(e),d=g=>{const h=g.target.files[0];h?u.val=h.name:u.val="No file selected"},b=({disabled:g})=>c({class:D(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,g&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:b,name:"file",accept:"text/*",onchange:d}),c("File selected: ",u))},Hs=`import classNames from "@grucloud/bau-css/classNames";
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
`,Us={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Hs,createComponent:js}],gridItem:wn},Gs=e=>{const t=G(e);return()=>t(Us)};function Oe(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:p,...d},...b]=K(r);return a({...d,class:D("form",u,l,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...b)}}function ft(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
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
  `;return function(...l){let[{size:u=t.size??"md",variant:p=t.variant??"plain",color:d=t.color??"neutral",loading:b,...g},...h]=K(l);const f=Z(e),x=fe(e);return n.bind({deps:[b],render:()=>y=>f({...g,class:D("loadingButton",u,p,d,r,y&&"loading",t==null?void 0:t.class,g==null?void 0:g.class)},x({size:u,variant:p,color:d,visibility:y}),i({class:y&&"loading"},h))})}}const Fs=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=ft(e),p=$e(e,{variant:"outline",color:"danger"}),d=ue(e),b=Oe(e,{class:n`
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),g=Ne(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:f=()=>{}}){const x=t.state(!1),y=t.state("");return g(b({onsubmit:async k=>{k.preventDefault();const{username:A,password:B}=Object.fromEntries(new FormData(k.target.closest("form")));try{x.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:A,password:B})});if(T.ok){const M=await T.json();f(M)}else T.status==401?y.val="Invalid username or password":y.val=T.statusText}catch(T){y.val=T.message}finally{x.val=!1}}},s(c({width:"100",height:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>y.val&&p(y.val),r("Email",d({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",d({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:x},"Login"))))}},Vs=`import form from "@grucloud/bau-ui/form";
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
`,Ws=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:i,footer:s}=t.tags,r=Oe(e),c=Z(e,{variant:"solid",color:"primary"}),l=ue(e);return function({onSubmitted:p=()=>{}}){return r({onsubmit:async b=>{b.preventDefault();const g=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(g)),p(g)}},a(o("Form with input")),n(i("Branch",l({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),s(c({type:"submit"},"Click")))}},Xs=`import form from "@grucloud/bau-ui/form";
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
`,Zs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:i,footer:s,em:r,span:c}=t.tags,l=t.state(""),u=t.derive(()=>l.val!=="Delete"),p=Oe(e),d=Z(e,{variant:"solid",color:"primary"}),b=ue(e);return function({onSubmitted:h=()=>{}}){return p({onsubmit:async x=>{x.preventDefault(),h()}},a(o("Delete Protection")),n(i(c("Type ",r("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:l,oninput:x=>l.val=x.target.value}))),s(d({type:"submit",disabled:u},"Delete")))}},Ks=`import { Context } from "@grucloud/bau-ui/context";
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
`,qs={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Xs,createComponent:Ws},{title:"Form with state",description:"A form with input state and a dervied state.",code:Ks,createComponent:Zs},{title:"Login page",description:"A login page.",code:Vs,createComponent:Fs}]},Js=e=>{const t=G(e);return()=>t(qs)},Sn=(e,t={})=>{const n=ue(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Ys=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ue(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Qs=`import input from "@grucloud/bau-ui/input";
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
`,ei={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Qs,createComponent:Ys}],gridItem:Sn},ti=e=>{const t=G(e);return()=>t(ei)},Cn=(e,t={})=>{const n=ct(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},ni=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ct(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},oi=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,ai={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:oi,createComponent:ni}],gridItem:Cn},ri=e=>{const t=G(e);return()=>t(ai)};function En(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>oe.map(l=>`
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
  `;return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:b=t.color??"neutral",running:g,...h}]=K(u);return i({...h,role:"progressbar",class:{deps:[g],renderProp:()=>f=>D("linearProgress",p,b,c,f&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const kn=(e,t)=>{const n=En(e,t);return o=>n({...o,running:!0})},si=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=Z(e),i=En(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},ii=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,ci={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:ii,createComponent:si}],gridItem:kn},li=e=>{const t=G(e);return()=>t(ci)},An=(e,t)=>{const n=ft(e,t);return o=>n({...o,loading:!0},"Save")},ui=e=>{const{bau:t}=e,{section:n}=t.tags,o=ft(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},di=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,pi={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:di,createComponent:ui}],gridItem:An},mi=e=>{const t=G(e);return()=>t(pi)},gi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],bi=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=be(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},gi.map(r))},hi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],fi=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=be(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},hi.map(r)))},vi=`import list from "@grucloud/bau-ui/list";
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
`,xi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:vi,createComponent:fi}],gridItem:bi},yi=e=>{const t=G(e);return()=>t(xi)};function Tn(e,t={}){const{bau:n,css:o,window:a}=e,{dialog:i,div:s}=n.tags,c=o`
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
    ${(()=>oe.map(l=>`
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
`))()}
  `;return function(...u){let[{size:p=t.size??"md",variant:d=t.variant??"plain",color:b=t.color??"neutral",...g},...h]=K(u);const f=i({...g,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(g.id??"modal")&&f.showModal()},class:D("modal",c,b,d,p,t==null?void 0:t.class,g==null?void 0:g.class)},h);return new MutationObserver(y=>{const w=new URLSearchParams(a.location.search);y[0].attributeName=="open"&&(f.open?w.set("modal",f.id??"modal"):w.delete("modal"),a.history.pushState("","",`?${w.toString()}`))}).observe(f,{attributes:!0}),f}}const Dn=(e,t={})=>{const{bau:n}=e,{form:o,section:a,main:i,header:s,footer:r,p:c,h1:l}=n.tags,u=Z(e),p=Tn(e,t),d=()=>i(Array(20).fill("").map((g,h)=>c(h+1,". Some text here"))),b=g=>{const h=p({id:`dialog-${g.color}-${g.variant}-${t.size}`,...g},o(s(l("Header")),d(),r(u({variant:"outline",color:g.color,onclick:()=>{h.close()}},"Cancel"),u({variant:"solid",color:g.color,onclick:()=>{h.close()}},"OK"))));return h};return g=>{const h=b(g);return a(u({...g,onclick:()=>{h.showModal()}},"OPEN MODAL"),h)}},wi=e=>{const{bau:t}=e,{form:n,section:o,main:a,header:i,footer:s,p:r}=t.tags,c="neutral",l=Z(e),u=Tn(e),p=()=>a(Array(10).fill("").map((b,g)=>r(g+1,". Some text here"))),d=u({id:"my-dialog"},n(i("Header"),p(),s(l({variant:"outline",color:c,onclick:()=>{d.close()}},"Cancel"),l({variant:"solid",color:c,onclick:()=>{d.close()}},"OK"))));return()=>o(l({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Si=`import modal from "@grucloud/bau-ui/modal";
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
`,Ci={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Si,createComponent:wi}],gridItem:Dn},Ei=e=>{const t=G(e);return()=>t(Ci)},ki=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ai(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s}=n.tags,r=Z(e),c=Be(e),l=be(e),u=qe(e,{color:"neutral",variant:"outline"}),p=o`
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
  `;return function(...b){let[{size:g=t.size??"md",variant:h=t.variant??"outline",color:f=t.color??"neutral",name:x,label:y,Option:w,options:k,defaultValue:A=[],getOptionLabel:B,getOptionValue:T,renderValue:M,onSelect:P=()=>{},loading:O,...N},...R]=K(b);const j=fe(e,{variant:h,color:f,size:g}),U=n.state(A),z=n.state(!1),S=n.state(0),m=()=>{J.openDialog(),J.focus(),z.val=!0},v=()=>{J.closeDialog(),z.val=!1},C=()=>{z.val=!1},E=X=>{J.open?v():m(),X.preventDefault()},H=()=>Array.from(ne.selectedOptions).map(({value:X})=>k.find(ee=>T(ee)==X)),L=X=>{switch(X.preventDefault(),X.key){case"Escape":v();break;case"ArrowDown":S.val<k.length-1?S.val++:S.val=0;break;case"ArrowUp":S.val<=0?S.val=k.length-1:S.val--;break;case"Enter":if(J.open){const ee=X.currentTarget.querySelectorAll("input")[S.val];ee.checked=!ee.checked;const ie=ne.options[S.val+1];ie.selected=!ie.selected,U.val=H()}else m();break}},V=X=>ee=>{const ie=[...ne.options].find(({value:ve})=>ve==T(X));ee.target.checked?ie.selected=!0:ie.selected=!1,U.val=H()},F=()=>l({tabindex:"0",class:D(f,h)},k.map((X,ee)=>i({class:()=>D(S.val==ee&&"active")},n.tags.label(u({checked:A.find(ie=>T(ie)==T(X)),name:`${x}-${T(X)}`,onchange:V(X)}),w(X))))),$=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":z,"aria-label":y,onclick:E,color:f,variant:h,size:g,class:O==!0&&"loading",disabled:O},()=>U.val.length?M(U.val):y,()=>O==!0&&j({visibility:O})),J=c({triggerEl:$,contentEl:F(),onClose:C}),ne=s({name:x,multiple:!0,...N},n.tags.option({value:""},"--Category--"),k.map(X=>n.tags.option({value:T(X),selected:A.find(ee=>T(ee)==T(X))},B(X))));return a({...N,class:D("multiSelect",f,g,p,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:L},ne,$,J)}}const Ti=e=>{const{bau:t,css:n}=e,{div:o,span:a,form:i,footer:s}=t.tags,r=Ai(e),c=Z(e,{variant:"outline",color:"neutral"}),l=Ie(e,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],p=b=>a(b.group),d=b=>{b.preventDefault();const{selectedOptions:g}=b.target.elements.myMultiSelect;var h=Array.from(g).map(({value:f})=>f);alert(JSON.stringify(h))};return()=>i({onsubmit:d,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:p,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},b.map(g=>l(g.group))),label:"Select services"}),s(c({type:"submit"},"Submit")))},Di=`import { Context } from "@grucloud/bau-ui/context";
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
`,Mi=e=>{const{bau:t,css:n}=e,{select:o,option:a,form:i}=t.tags,s=Z(e,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],c=l=>{l.preventDefault();const{selectedOptions:u}=l.target.elements.myNativeMultiSelect;var p=Array.from(u).map(({value:d})=>d);alert(JSON.stringify(p))};return()=>i({onsubmit:c,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:l})=>a({value:l},l))),s({type:"submit"},"Submit"))},Ii=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ni={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Di,createComponent:Ti},{title:"Native Multi Select",description:"A native multi select.",code:Ii,createComponent:Mi}]},$i=e=>{const t=G(e);return()=>t(Ni)},Bi=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=Z(e),r=Be(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),p=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,p))},Oi=`import popover from "@grucloud/bau-ui/popover";
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
`,Pi={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Oi,createComponent:Bi}]},Li=e=>{const t=G(e);return()=>t(Pi)};function zi(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:p})=>({name:d,label:b,href:g})=>s({href:`${a.base}${g}`},r({class:"sublabel"},p),i({class:`label ${p}`},b??d));return function(...d){let[{size:b=t.size??"md",variant:g=t.variant??"plain",color:h=t.color??"neutral",data:f={},...x}]=K(d);const{next:y,previous:w}=f;return c({"data-paginationnav":JSON.stringify(f),"aria-label":"pages navigation",...x,class:D("paginationNavigation",b,l,t==null?void 0:t.class,x==null?void 0:x.class)},(w==null?void 0:w.href)&&u({text:"Previous"})(w),(y==null?void 0:y.href)&&u({text:"Next"})(y))}}const _i=e=>{const{bau:t}=e,{section:n}=t.tags,o=zi(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Ri=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,ji={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Ri,createComponent:_i}]},Hi=e=>{const t=G(e);return()=>t(ji)},Ui=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ne(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},Gi=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ne(e);return()=>n(a({size:"md"},o("My content")))},Fi=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Vi={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Fi,createComponent:Gi}],variantColorTableDisable:!0,gridItem:Ui},Wi=e=>{const t=G(e);return()=>t(Vi)};function Mn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d}]=K(c);return a({...d,type:"radio",class:D("radio-button",l,p,u,s,t==null?void 0:t.class,d==null?void 0:d.class)})}}const In=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Mn(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Xi=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Mn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},Zi=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,Ki={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:Zi,createComponent:Xi}],gridItem:In},qi=e=>{const t=G(e);return()=>t(Ki)},Ji=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Pe(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=Z(e),l=Be(e),u=be(e),p=o`
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
  `;return function(...b){let[{size:g=t.size??"md",variant:h=t.variant??"outline",color:f=t.color??"neutral",label:x,Option:y,options:w,defaultOption:k,getOptionLabel:A,getOptionValue:B,onSelect:T=()=>{},loading:M,...P},...O]=K(b);const N=fe(e,{variant:h,color:f,size:g}),R=n.state(k?A(k):x),j=n.state(!1),U=n.state(0),z=()=>{V.openDialog(),V.focus(),j.val=!0},S=()=>{V.closeDialog(),j.val=!1},m=()=>{j.val=!1},v=$=>{V.open?S():z(),$.preventDefault()},C=({option:$,index:J})=>ne=>{R.val=A($),F.value=B($),F.setCustomValidity(""),U.val=J,S(),T($),ne.preventDefault()},E=$=>{switch($.preventDefault(),$.key){case"Escape":S();break;case"ArrowDown":U.val<w.length-1?U.val++:U.val=0;break;case"ArrowUp":U.val<=0?U.val=w.length-1:U.val--;break;case"Enter":V.open?(R.val=A(w[U.val]),F.value=B(r),S()):z();break}},H=()=>u({tabindex:"0",class:D(f,h)},w.map(($,J)=>i({class:()=>D(U.val==J&&"active"),onclick:C({option:$,index:J})},y($)))),L=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":j,"aria-label":x,onclick:v,color:f,variant:h,size:g,class:M==!0&&"loading",disabled:M},()=>!R.val&&x,R,()=>M==!0&&N({visibility:M})),V=l({triggerEl:L,contentEl:H(),onClose:m}),F=s(P,r({value:""},"--Select Category--"),w.map($=>r({value:B($)},A($))));return F.value=P.value,a({...P,class:D("select",f,g,p,t==null?void 0:t.class,P==null?void 0:P.class),onkeydown:E},F,L,V)}}const Nn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Pe(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Yi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Pe(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Qi=`import select from "@grucloud/bau-ui/select";
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
`,ec=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Pe(e),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(u.label),i(u.code));return()=>o(s({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},tc=`import select from "@grucloud/bau-ui/select";
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
`,nc=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Pe(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionValue:r=>r,getOptionLabel:r=>r}))},oc=`import select from "@grucloud/bau-ui/select";
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
`,ac=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Z(e,{variant:"outline"}),r=Pe(e),c=t.state([]),l=t.state(!1),u=t.state("");async function p({url:g,transform:h=f=>f}){try{l.val=!0;const f=await fetch(g,{});if(f.ok){const x=await f.json();c.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{l.val=!1}}const d=()=>p({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:g=>g.sort((h,f)=>h.name.common.localeCompare(f.name.common))});d();const b=g=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(g.flag),i(g.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:b,getOptionValue:({name:g})=>g.common,getOptionLabel:({name:g})=>g.common,label:"Country",id:"country",loading:l.val}),s({onclick:()=>d()},"Reload")))},rc=`import { Context } from "@grucloud/bau-ui/context";
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
`,sc={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Qi,createComponent:Yi},{title:"Default Option",description:"Select with a default option",code:tc,createComponent:ec},{title:"Select AWS region",description:"Select the AWS region",code:oc,createComponent:nc},{title:"Loading Indicator",description:"Select with a loading indicator",code:rc,createComponent:ac}],gridItem:Nn},ic=e=>{const t=G(e);return()=>t(sc)};function $n(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...p},...d]=K(r);return a({...p,class:D("select-native",u,c,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},d)}}const Bn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=$n(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},cc=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=$n(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},lc=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,uc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:lc,createComponent:cc}],gridItem:Bn},dc=e=>{const t=G(e);return()=>t(uc)},pc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=Se(e),s=()=>a({class:n`
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
          `})));return()=>o(s())},mc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,gc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=Se(e),s=()=>a({class:n`
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
            `}))));return()=>o(s())},bc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,hc=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:i,tr:s,td:r}=t.tags,c=Se(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),l=()=>a(i(new Array(8).fill("").map(()=>s(r(c({class:n`
                  width: 5rem;
                `})),r(c()),r(c()),r(c()),r(c({class:n`
                  width: 20rem;
                `}))))));return()=>o(l())},fc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,vc=e=>{const{bau:t,css:n}=e,{section:o,header:a,span:i,article:s}=t.tags,r=n`
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
  `,c=Se(e,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),l=Se(e);function u({columnsSize:p=4}){return o({class:r},a(new Array(p).fill("").map(()=>c(i("1")))),s(l("")))}return()=>o(u({columnsSize:3}))},xc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,yc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:mc,createComponent:pc},{title:"List",description:"A list skeleton.",code:bc,createComponent:gc},{title:"Table",description:"A table skeleton.",code:fc,createComponent:hc},{title:"Tabs",description:"A tabs skeleton.",code:xc,createComponent:vc}],variantColorTableDisable:!0,variantSizeDisable:!0},wc=e=>{const t=G(e);return()=>t(yc)};function Je(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:p=t.color??"neutral",...d},...b]=K(c);return a({...d,type:"range",class:D("slider",p,u,l,s,t==null?void 0:t.class,d.class)},...b)}}const On=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Je(e);return i=>a({...i,oninput:o})},Sc=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Je(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Cc=`import slider from "@grucloud/bau-ui/slider";
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
`,Ec=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Je(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(d=>c({value:Number(d),label:d})))))},kc=`import slider from "@grucloud/bau-ui/slider";
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
`,Ac=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=d=>{l.val=d==null?void 0:d.target.value},p=Je(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(d=>c({value:Number(d),label:d})))))},Tc=`import slider from "@grucloud/bau-ui/slider";
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
`,Dc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Cc,createComponent:Sc},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:kc,createComponent:Ec},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Tc,createComponent:Ac}],gridItem:On},Mc=e=>{const t=G(e);return()=>t(Dc)},Pn=(e,t)=>{const n=fe(e,t);return o=>n({...o})},Ic=e=>{const{bau:t}=e,{section:n}=t.tags,o=Z(e),a=fe(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},Nc=`import spinner from "@grucloud/bau-ui/spinner";
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
`,$c={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Nc,createComponent:Ic}],gridItem:Pn},Bc=e=>{const t=G(e);return()=>t($c)},Oc=()=>oe.map(e=>"").join(`
`),Ln=(e,t)=>(n,o)=>{const a=new URLSearchParams(e.window.location.search);return a.delete(t),a.append(t,n),o&&Object.entries(o).map(([i,s])=>(a.delete(i),a.append(i,s))),`?${a.toString()}`};function zn(e,t={}){const{bau:n,css:o,window:a}=e,{div:i,ul:s,li:r,span:c,section:l}=n.tags,u=o`
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
  `;return function(...d){let[{color:b,variant:g="plain",size:h,stepperDefs:f=[],stepperName:x,activeStepIndex:y=n.state(0),...w},...k]=K(d);const A=n.state(f.map((N,R)=>({...N,index:R}))),B=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(N,R,j)=>{N.apply(R,j);const U=j[2]??"";console.log("stepper pushState ",U),["?","#"].includes(U[0])&&O()}});const T=n.derive(()=>A.val[y.val]),M=N=>{const{Header:R,disabled:j,name:U,index:z}=N;return r({class:()=>D(T.val.name==U&&"active",y.val<z&&"not-completed",y.val>z&&"completed",j&&"disabled")},c({class:"step-number"},z+1),c({class:"step-label"},()=>R(N)))},P=N=>f.findIndex(({name:R})=>R==N.name),O=()=>{const R=new URLSearchParams(a.location.search).get(x)??f[0].name,j=Math.max(f.findIndex(({name:U})=>U==R),0);j<y.val&&(console.log("remove last step"),B.val.pop()),B.val.some(({name:U})=>R==U)||(console.log("add new step"),B.val.push(f[j])),y.val=j};return O(),i({bauMounted:({element:N})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:D("stepper",g,h,b,u,t==null?void 0:t.class,w.class)},n.loop(A,s(),M),n.loop(B,l(),N=>i({class:()=>D("content",N.name==T.val.name&&"visible")},N.Content({nextStep:f[P(N)+1],previousStep:f[P(N)-1]}))))}}const Bt="my-wizard",Pc=e=>{const{bau:t,window:n}=e,{footer:o,p:a,label:i,section:s,a:r,ul:c,li:l}=t.tags,u=ue(e),p=Oe(e),d=zn(e),b=Ln(e,Bt),g=Z(e,{variant:"outline",color:"primary"}),h=Z(e,{variant:"solid",color:"primary"}),f=({nextStep:w})=>k=>{k.preventDefault();const{organization:A}=k.target.elements;n.history.pushState("","",b(w.name,{organization:A.value}))},x=w=>{var T;w.preventDefault();const{organization:k}=(T=n.document.forms)==null?void 0:T.formStep1.elements,B=new URLSearchParams(n.location.search).get("choice");alert(`organization ${k.value}, choice:${B}`)},y=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:w})=>p({onsubmit:f({nextStep:w}),id:"formStep1"},i("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:w,previousStep:k})=>p(c(l(r({href:b(w.name,{choice:"choice1"})},"Choice 1")),l(r({href:b(w.name,{choice:"choice2"})},"Choice 2"))),o(g({href:b(k.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:w})=>p({onsubmit:x},a("My stepper 3 Content"),o(g({href:b(w.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>s(d({stepperDefs:y,stepperName:Bt}))},Lc=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Ot="stepper-vertical",zc=e=>{const{bau:t,window:n,css:o}=e,{footer:a,p:i,label:s,section:r,a:c,ul:l,li:u}=t.tags,p=ue(e),d=Oe(e),b=zn(e,{class:o`
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
    `}),g=Ln(e,Ot),h=Z(e,{variant:"outline",color:"primary"}),f=Z(e,{variant:"solid",color:"primary"}),x=({nextStep:k})=>A=>{A.preventDefault();const{organization:B}=A.target.elements;n.history.pushState("","",g(k.name,{organization:B.value}))},y=k=>{var M;k.preventDefault();const{organization:A}=(M=n.document.forms)==null?void 0:M.formStep1.elements,T=new URLSearchParams(n.location.search).get("choice");alert(`organization ${A.value}, choice:${T}`)},w=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:k})=>d({onsubmit:x({nextStep:k}),id:"formStep1"},s("Organization",p({autofocus:!0,placeholder:"Organization",name:"organization"})),a(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:k,previousStep:A})=>d(l(u(c({href:g(k.name,{choice:"choice1"})},"Choice 1")),u(c({href:g(k.name,{choice:"choice2"})},"Choice 2"))),a(h({href:g(A.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:k})=>d({onsubmit:y},i("My stepper 3 Content"),a(h({href:g(k.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>r(b({stepperDefs:w,stepperName:Ot}))},_c=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Rc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:Lc,createComponent:Pc},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:_c,createComponent:zc}]},jc=e=>{const t=G(e);return()=>t(Rc)},Hc=()=>oe.map(e=>`
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
    ${Hc()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...p},...d]=K(r);return a({...p,class:D("switch",i,u,l,c,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...d)}}const Rn=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=_n(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Uc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=_n(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Gc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Fc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Gc,createComponent:Uc}],gridItem:Rn},Vc=e=>{const t=G(e);return()=>t(Fc)},Wc=()=>oe.map(e=>`
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
  `;return function(...d){let[{size:b=t.size??"md",variant:g=t.variant??"plain",color:h=t.color??"neutral",tabsKey:f="tabs",...x},...y]=K(d);const w=n.state(i),k=O=>w.val.find(N=>N.name==O),A=n.state(i[0]),B=()=>{var j,U;const N=new URLSearchParams(a.location.search).get(f)??i[0].name,R=k(N);(j=A.val.exit)==null||j.call(),A.val=R,(U=R==null?void 0:R.enter)==null||U.call()};B(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,N,R)=>{O.apply(N,R);const j=R[2]??"";["?","#"].includes(j[0])&&B()}});const T=O=>{const N=new URLSearchParams(a.location.search);return N.delete(f),N.append(f,O),`?${N.toString()}`},M=O=>{const{Header:N,disabled:R,name:j}=O;return c({class:()=>D(A.val.name==j&&"active",R&&"disabled")},l({href:T(j)},N(O)))},P=s({class:D("tabs",g,b,h,u,t==null?void 0:t.class,x.class),bauMounted:({element:O})=>{a.addEventListener("popstate",B)},bauUnmounted:()=>{a.removeEventListener("popstate",B)}},n.loop(w,r(),M),n.bind({deps:[A],render:()=>({Content:O})=>O?O(x):""}));return P.addEventListener("tab.add",O=>{var R;const{tab:N}=O.detail;(R=N.enter)==null||R.call(),w.val.push(N)},!1),P.addEventListener("tab.remove",O=>{var R;const N=w.val.findIndex(j=>j.name==O.detail.tabName);N>0&&((R=w.val[N].exit)==null||R.call(),w.val.splice(N,1))},!1),P}}const Xc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>i({})},Zc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Kc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>i({tabsKey:"my-tab"})},qc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,tl={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Zc,createComponent:Xc},{title:"Extended Tabs",description:"An extended tabs.",code:qc,createComponent:Kc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Yc,createComponent:Jc},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:el,createComponent:Qc}]},nl=e=>{const t=G(e);return()=>t(tl)};function ze(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=K(c);return i({...l,class:D("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const ol=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function p(f,x,y,w,k){return{name:f,calories:x,fat:y,carbs:w,protein:k}}const d=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],b=({name:f,calories:x})=>s(i(f),i({class:n`
            text-align: right;
          `},x)),g=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=ze(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(r(u("Basic Table"),g(),l(d.map(b)))))},al=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const rl=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],sl=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:g,calories:h})=>s(i(g),i({class:n`
            text-align: right;
          `},h)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=ze(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(r(u("Table Dense"),d(),l(rl.map(p)))))},il=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ae(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const cl=[Ae("Frozen yoghurt",159,6,24,4),Ae("Ice cream sandwich",237,9,37,4.3),Ae("Eclair",262,16,24,6),Ae("Cupcake",305,3.7,67,4.3),Ae("Gingerbread",356,16,49,3.9)],ll=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,p=({name:g,calories:h})=>s(i(g),i({class:n`
            text-align: right;
          `},h)),d=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=ze(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(r(u("Table Zebra"),d(),l(cl.map(p)))))},ul=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,dl={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:al,createComponent:ol},{title:"Dense",description:"A dense table.",code:il,createComponent:sl},{title:"Zebra",description:"A zebra table.",code:ul,createComponent:ll}]},pl=e=>{const t=G(e);return()=>t(dl)},ml=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=tn(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},gl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,bl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:gl,createComponent:ml}]},hl=e=>{const t=G(e);return()=>t(bl)};function Hn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=ht(e),s=Z(e),r=fe(e),c=o`
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
  `,l=({label:g,icon:h,...f})=>s({"aria-label":g,title:g,...f},h),u=({count:g,totalCount:h,page:f,rowsPerPage:x})=>a({class:"pages-numbers"},Number(f-1)*Number(x)+(g>0?1:0),"-",Math.min(f*x,h)," of ",h),p=({count:g,page:h,rowsPerPage:f})=>a({class:"pages-numbers"},(h-1)*f+(g>0?1:0),"-",h*f),d=g=>g<=1,b=(g,h,f)=>g>=Math.ceil(h/f);return function(...h){let[{size:f=t.size??"md",variant:x=t.variant??"outline",color:y=t.color??"neutral",count:w=0,totalCount:k=0,page:A=1,rowsPerPage:B=50,onPageChange:T,isLoading:M=!1,disableFirst:P=()=>d(A),disablePrevious:O=()=>d(A),disableNext:N=()=>b(A,k,B),disableLast:R=()=>b(A,k,B),...j},...U]=K(h);const z=Math.max(0,Math.ceil(k/B)),S=T({page:1}),m=T({page:A-1}),v=T({page:A+1}),C=T({page:z}),E=[{label:"First",icon:"⟪",onclick:S,disabled:P()},{label:"Previous",icon:"⟨",onclick:m,disabled:O()},{label:"Next",icon:"⟩",onclick:v,disabled:N()},{label:"Last",icon:"⟫",onclick:C,disabled:R()}];return a({...j,class:D("table-pagination",c,M&&"disabled",t==null?void 0:t.class,j==null?void 0:j.class)},r({class:"spinner",visibility:M,size:"md"}),k>0?u({count:w,totalCount:k,page:A,maxPages:z,rowsPerPage:B}):p({count:w,page:A,maxPages:z,rowsPerPage:B}),i({variant:x,color:y},E.map(H=>l({...H,variant:x,color:y}))))}}const fl=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),vl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=fl(45),u=({name:y,email:w})=>i(a(y),a(w)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),d=Hn(e),b=ze(e,{class:n`
      max-width: 650px;
    `}),g=t.state(l),h=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),f=t.derive(()=>g.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),x=({page:y})=>w=>{h.val.page=y};return()=>b(s(p(),()=>c(f.val.map(u))),()=>d({...h.val,onPageChange:x}))},xl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),p=t.state([]),d=t.state(""),b=t.derive(()=>p.val.length),g=t.state(1),h=t.state(10),f=t.derive(()=>p.val),x=P=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(P).toString()}`,y=({page:P})=>O=>{g.val=P,w(x({page:P,per_page:h.val}))};w(x({page:1,per_page:h.val}));async function w(P){try{u.val=!0;const O=await fetch(P,{});if(O.ok){const N=await O.json();p.val=N;return}throw O}catch(O){d.val=O.message}finally{u.val=!1}}const k=({name:P,description:O,stargazers_count:N})=>i(a(P),a(O),a({class:n`
            text-align: right;
          `},N)),A=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),B=Hn(e),T=ze(e,{class:n`
      min-width: 650px;
    `}),M=({message:P})=>l(P);return()=>T(()=>B({rowsPerPage:h.val,page:g.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:y,disableNext:()=>!1}),s(A(),()=>d.val&&M({message:d.val}),()=>c(f.val.map(k))))},yl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=vl(e),l=xl(e),u=(...p)=>a({class:n`
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
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:p=t.color??"neutral",selected:d=!1,disabled:b,onChange:g,...h},...f]=K(c);return i({type:"button",...h,"aria-pressed":{deps:[d],renderProp:()=>x=>x},class:{deps:[d],renderProp:()=>x=>D("toggle",l,p,u,s,x&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:b},f)}}const Un=(e,t)=>{const{bau:n}=e,o=_e(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},wl=e=>{const{bau:t}=e,{section:n}=t.tags,o=_e(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Sl=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Cl={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Sl,createComponent:wl}],gridItem:Un},El=e=>{const t=G(e);return()=>t(Cl)},kl=()=>oe.map(e=>`
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
`);function vt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:p=!1,onChange:d=()=>{},...b},...g]=K(r);const h=new Set,f=x=>{const{value:y}=x.target;p?(h.clear(),h.add(y)):h.has(y)?h.delete(y):h.add(y),d({event:x,values:[...h]})};return a({...b,class:D("toggle-group",c,u,l,i,t==null?void 0:t.class,b==null?void 0:b.class),onclick:f},...g)}}const Gn=(e,t)=>{const{bau:n}=e,o=vt(e,t),a=_e(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},Al=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=_e(e),s=vt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},Tl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Dl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=_e(e),s=vt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:p})=>()=>i({color:r,variant:c,value:p,selected:o.val.includes(p),"area-label":u},u))))},Ml=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Il={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Tl,createComponent:Al},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:Ml,createComponent:Dl}],gridItem:Gn},Nl=e=>{const t=G(e);return()=>t(Il)};function xt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:p=t.size??"md",variant:d=t.variant??"outline",color:b=t.color??"neutral",...g},...h]=K(c);const f=i({class:D("container",...u.split("-"))},i({class:D("content",b,d,p),role:"tooltip"},l)),x=T=>`move-to-${T}`,y=(T,M,P)=>{if(T()){const O=x(M);f.classList.add(O),f.classList.add(M),f.classList.remove(P)}},w=(T,M)=>{const P=x(T);f.classList.contains(P)&&(f.classList.remove(P),f.classList.add(M),f.classList.remove(T))},k=T=>{const M=f.getBoundingClientRect();y(()=>M.x<0,"right","left"),y(()=>M.x+M.width>a.innerWidth,"left","right"),y(()=>M.y<0,"bottom","top"),y(()=>M.bottom>a.innerHeight,"top","bottom"),f.classList.add("visible")},A=T=>{f.classList.remove("visible"),w("right","left"),w("left","right"),w("bottom","top"),w("top","bottom")};return i({...g,class:D("tooltip",s,t==null?void 0:t.class,g==null?void 0:g.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",k),T.addEventListener("mouseout",A)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",k),T.removeEventListener("mouseout",A)}},...h,f)}}const Fn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=Z(e),r=xt(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},$l=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=Z(e),s=xt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Bl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ol=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Ie(e,{variant:"outline",color:"primary"}),c=xt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Pl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ll={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Bl,createComponent:$l},{title:"Grid",description:"Various tooltip position",code:Pl,createComponent:Ol}],gridItem:Fn},zl=e=>{const t=G(e);return()=>t(Ll)},Vn=(e,t)=>{const n=st(e,t);return o=>n(o)},_l=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return()=>n(o({}))},Rl=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,jl={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Rl,createComponent:_l}],gridItem:Vn},Hl=e=>{const t=G(e);return()=>t(jl)},Ul=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Wn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Ul({css:o,createGlobalStyles:a}),p=mt(e),d=({depth:b=1,maxDepth:g,color:h,variant:f,size:x})=>y=>{const{children:w,expanded:k}=y,A=n.state(!k),B=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:M=>{w&&(A.val=!A.val)}},i(y.data)),T=()=>s({class:D(h,x)},w.map(d({depth:b+1,maxDepth:g})));return r(p({size:x,Header:B,Content:w&&b<g&&T}))};return function({tree:g,maxDepth:h=1/0,size:f=t.size??"md",variant:x=t.variant??"outline",color:y=t.color??"neutral",...w}){return c({class:D(u.nav,f,x,y,t==null?void 0:t.class,w.class)},g.children&&s(g.children.map(d({maxDepth:h,color:y,variant:x,size:f}))))}}const Xn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Wn(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},Gl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Wn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Fl=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Vl={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Fl,createComponent:Gl}],gridItem:Xn},Wl=e=>{const t=G(e);return()=>t(Vl)},Xl=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=Le(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},Zl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=nn(e),u=Z(e),p=[{name:"Accordion",Item:on(e)},{name:"Alert",Item:rn(e)},{name:"Autocomplete",Item:cn(e)},{name:"Avatar",Item:sn(e)},{name:"Badge",Item:un(e)},{name:"Breadcrumbs",Item:dn(e)},{name:"Button",Item:pn(e)},{name:"Button Group",Item:mn(e)},{name:"Calendar",Item:bn(e)},{name:"Checkbox",Item:fn(e)},{name:"Chip",Item:hn(e)},{name:"DrillDown Menu",Item:xn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:wn(e)},{name:"Input",Item:Sn(e)},{name:"Input Search",Item:Cn(e)},{name:"Linear Progress",Item:kn(e)},{name:"Loading Button",Item:An(e)},{name:"Modal",Item:Dn(e)},{name:"Radio Button",Item:In(e)},{name:"Select",Item:Nn(e)},{name:"Select Native",Item:Bn(e)},{name:"Slider",Item:On(e)},{name:"Spinner",Item:Pn(e)},{name:"Switch",Item:Rn(e)},{name:"Tabs",Item:Xl(e)},{name:"Theme Switch",Item:Vn(e)},{name:"Toggle",Item:Un(e)},{name:"Toggle Group",Item:Gn(e)},{name:"Tooltip",Item:Fn(e)},{name:"Tree View",Item:Xn(e)}];return()=>o({class:n`
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
            `},l(d))))},Kl=({context:e})=>{const t=Zl(e);return[{path:"",action:n=>({title:"Bau UI",component:Bo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:za(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Xa(e)})},{path:"alert",action:()=>({title:"Alert",component:tr(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:sr(e)})},{path:"animate",action:()=>({title:"Animate",component:pr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Dr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:vr(e)})},{path:"badge",action:()=>({title:"Badge",component:$r(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:_r(e)})},{path:"button",action:()=>({title:"Button",component:Fr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Kr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Qr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:rs(e)})},{path:"chip",action:()=>({title:"Chip",component:ls(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:bs(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:xs(e)})},{path:"divider",action:()=>({title:"Divider",component:Es(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Ms(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Ps(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Rs(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Gs(e)})},{path:"form",action:()=>({title:"Form",component:Js(e)})},{path:"input",action:()=>({title:"Input",component:ti(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:ri(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:li(e)})},{path:"list",action:()=>({title:"List",component:yi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:mi(e)})},{path:"modal",action:()=>({title:"Modal",component:Ei(e)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:$i(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Hi(e)})},{path:"paper",action:()=>({title:"Paper",component:Wi(e)})},{path:"popover",action:()=>({title:"Popover",component:Li(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:qi(e)})},{path:"select",action:()=>({title:"Select",component:ic(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:dc(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:wc(e)})},{path:"slider",action:()=>({title:"Slider",component:Mc(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Bc(e)})},{path:"stepper",action:()=>({title:"Stepper",component:jc(e)})},{path:"switch",action:()=>({title:"Switch",component:Vc(e)})},{path:"table",action:()=>({title:"Table",component:pl(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:hl(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:yl(e)})},{path:"tabs",action:()=>({title:"Tabs",component:nl(e)})},{path:"toggle",action:()=>({title:"Toggle",component:El(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:Nl(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:zl(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Hl(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Wl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:Lo(e)})}]},ql=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Jl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:p,component:d,Layout:b=t}=l.resolve({pathname:u});s.val=d({}),document.title=`${p}`}},Yl=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};uo();const Zn={title:"Bau",base:"/bau/bau-ui"},me=xo({config:Zn}),{bau:Ql}=me;me.states={drawerOpen:Ql.state(!0)};Yl(me);eo({routes:Kl({context:me}),onLocationChange:Jl({context:me,LayoutDefault:Mo(me),config:Zn}),notFoundRoute:ql(me)});
