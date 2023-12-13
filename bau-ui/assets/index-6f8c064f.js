(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const no=(e,t)=>({...e,paths:[...t,e.path]}),zt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=no(o,e);return n?[a,...zt({paths:[...e,o.path],routes:n})]:a}),oo=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},ao=({routes:e=[],notFoundRoute:t})=>{const n=zt({routes:e}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function ro({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},r=ao({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:r}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,s,l)=>{i.apply(s,l),o.pathname!=window.location.pathname&&n({router:r}),a(window.location)}}),document.addEventListener("click",i=>{const{target:s}=i,l=s.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:r}),r}const at=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],St=e=>`var(--color-${e})`,co=e=>`var(--color-${e}-lightest)`,lo=()=>at.map(([e])=>`
.outline.${e} {
  border: 1px solid ${St(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${co(e)};
}
.solid.${e} {
  background-color: ${St(e)};
}
`).join(`
`),uo=()=>at.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),po=e=>100-e*10,mo=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${po(t)}%);`).join(`
`),Ct=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),go=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...so.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...io.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function bo({createGlobalStyles:e},{colorPalette:t=at}={}){e`
    * {
      margin: 0;
      padding: 0;
    }
    h1,h2,h3,p {
      margin:0.3rem 0;
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
      ${t.map(([n,o])=>go([n,o])).join(`
`)}
      ${mo()}
      ${Ct({})}
      ${lo()}
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
      ${uo()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Ct({dark:!0})};
    }
  `}function ho(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let rt=e=>Object.prototype.toString.call(e??0).slice(8,-1),fo=e=>rt(e)=="Object",kt=e=>rt(e)=="Function",tt=e=>["Object","Array"].includes(rt(e)),Et=Object.getPrototypeOf,nt=e=>we(e)?e.val:e,we=e=>e==null?void 0:e.__isState,vo=["splice","push","pop","shift","unshift","sort","reverse"],je=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const X=e=>!we(e[0])&&fo(e[0])?e:[{},...e];function xo(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,r=new Set,i=!1,s,l=S=>n.createElement(S),c=(S,g,v)=>{let C=s;s=g;let k=S(v);return s=C,k},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(S=>{S.bindings=S.bindings.filter(g=>{var v;return(v=g.element)==null?void 0:v.isConnected}),!S.bindings.length&&!S.computed&&a.delete(S)}),o=void 0}))},d=(S,g,v,C,k,P)=>{var z;if(i){r.add(S);return}for(let W of S.bindings){let{deps:G,element:$,renderInferred:J,render:ne,renderItem:F}=W;if(F&&g)(z=m($,C,(...ee)=>f(F(...ee)),v,k,P)[g])==null||z.call();else{let ee=J?J({element:$}):ne({element:$,renderItem:F})(...G.map(nt));ee!==$&&$.replaceWith(W.element=f(ee))}}y(S),u()},p=(S,g,v=[])=>({get(C,k,P){var z;if(s==null||s.add(S),k==="_isProxy")return!0;if(!((z=C[k])!=null&&z._isProxy)&&!we(C[k])&&tt(C[k]))C[k]=new Proxy(C[k],p(S,g,[...v,k]));else if(vo.includes(k)){let W=C[k];return(...G)=>{let $=W.apply(C,G);return d(S,k,$,G,g,v),$}}return Reflect.get(C,k,P)},set(C,k,P,z){let W=Reflect.set(C,k,P,z);return d(S,"setItem",W,{prop:k,value:P},g,[...v,k]),W}}),b=(S,g)=>new Proxy(g,p(S,g)),m=(S,g,v,C,k,P)=>{let z=()=>S.replaceChildren(...je(C,v)),W=G=>S[G]&&S.removeChild(S[G]);return{assign:z,sort:z,reverse:z,setItem:()=>{var $;let G=P[0];($=S.children[G])==null||$.replaceWith(v(k[G],G))},push:()=>S.append(...je(g,(G,$)=>v(G,k.length+$))),unshift:()=>S.prepend(...je(g,v)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{const{length:G}=S.children;let[$,J=G,...ne]=g;for(let F=$>=0?Math.min($+J-1,G-1):G-1;F>=($>=0?$:G+$);F--)S.children[F].remove();if(ne.length){let F=ne.forEach((ee,re)=>v(ee,$+re));S.children[$]?S.children[$].after(...F):S.append(...F)}}}},h=S=>({oldVal:S,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return s==null||s.add(g),g.valProxy??(g.valProxy=tt(S)?b(g,S):S,g.valProxy)},set val(g){let v=this,C=v.val;tt(g)?(v.valProxy=b(v,g),d(v,"assign",g)):g!==C&&(v.valProxy=g,d(v)),v.oldVal=C}}),f=S=>{if(S==null||S===!1){const g=l("span");return g.style.display="none",g}else return S.nodeType?S:n.createTextNode(S)},x=(S,g)=>{let v=new Set;return g.val=c(S,v),v},w=S=>{let g=h(),v=x(S,g);g.computed=!0;for(let C of v)C.listeners.push({computed:S,deps:v,state:g});return g},y=S=>{for(let g of[...S.listeners])x(g.computed,g.state)},E=(S,...g)=>{if(g.length){let v=[];for(let C of g.flat(1/0))C!=null&&v.push(we(C)?_({deps:[C],render:()=>k=>k}):kt(C)?j({renderInferred:C}):f(C));S.append(...v)}},A={},I=(S,g)=>S&&(Object.getOwnPropertyDescriptor(S,g)??I(Et(S),g)),D=(S,g,v)=>{var C;return A[S+","+g]??(A[S+","+g]=((C=I(v,g))==null?void 0:C.set)??0)},B=(S,g)=>new t.MutationObserver((v,C)=>{v.filter(k=>k.removedNodes).forEach(k=>[...k.removedNodes].find(P=>P===S&&(g({element:S}),C.disconnect(),!0)))}).observe(S.parentNode,{childList:!0}),O=(S,g)=>new t.MutationObserver((v,C)=>v.forEach(k=>g({record:k,element:S}))).observe(S,{childList:!0}),L=S=>new Proxy(function(v,...C){var W;let[k,...P]=X(C),z=S?n.createElementNS(S,v):l(v);for(let[G,$]of Object.entries(k)){if(G.startsWith("bau"))continue;let J=D(v,G,Et(z))?ne=>ne!==void 0&&(z[G]=ne):ne=>z.setAttribute(G,ne);$==null||(we($)?_({deps:[$],render:()=>()=>(J($.val),z)}):kt($)&&(!G.startsWith("on")||$.isDerived)?j({renderInferred:()=>(J($({element:z})),z)}):$.renderProp?_({deps:$.deps,render:()=>()=>(J($.renderProp({element:z})(...$.deps.map(nt))),z)}):J($))}return k.bauChildMutated&&O(z,k.bauChildMutated),E(z,...P),z.autofocus&&z.focus&&t.requestAnimationFrame(()=>z.focus()),(W=k.bauCreated)==null||W.call(k,{element:z}),k.bauMounted&&t.requestAnimationFrame(()=>k.bauMounted({element:z})),k.bauUnmounted&&t.requestAnimationFrame(()=>B(z,k.bauUnmounted)),z},{get:(g,v)=>g.bind(void 0,v)}),N=(S,g,v)=>{S.element=f(v);for(let C of g)we(C)&&(a.add(C),C.bindings.push(S));return S.element},j=({renderInferred:S,element:g})=>{let v=new Set,C=c(S,v,{element:g});return N({renderInferred:S},v,C)},_=({deps:S,element:g,render:v,renderItem:C})=>N({deps:S,render:v,renderItem:C},S,v({element:g,renderItem:C})(...S.map(nt))),U=(S,g,v)=>_({deps:[S],render:({renderItem:C})=>k=>(g.append(...je(k,C)),g),renderItem:v}),Z=S=>{i=!0,S(),i=!1,r.forEach(d),r.clear()};return{tags:L(),tagsNS:L,state:h,bind:_,loop:U,derive:w,stateSet:a,batch:Z}}const yo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},wo=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},So=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Co(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...r)=>{const i=So(a,r),s=yo(i);return!t.getElementById(s)&&wo(t,e==null?void 0:e.target,s,o(s,i)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function ko(e){const t=xo(),n=Co();return bo(n),{bau:t,...n,tr:o=>o,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function Ve(e,t={}){const{bau:n,window:o}=e,{div:a}=n.tags,r=()=>{};return function({animationHide:s=r,animationShow:l=r,...c},u){return a({class:T("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(b=>{if(!s()||b.getAttribute("cloned"))return;const m=b.cloneNode(!0);o.requestAnimationFrame(()=>{m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=b.getAttribute("width"),m.style.height=b.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),d.target.appendChild(m),m.addEventListener("animationend",()=>{var h;return(h=m.parentNode)==null?void 0:h.removeChild(m)})})}),[...d.addedNodes].forEach(b=>{b.getAttribute("cloned")||o.requestAnimationFrame(()=>{p.style.position="relative";const m=b.getBoundingClientRect();if(b.setAttribute("width",m.width+"px"),b.setAttribute("height",m.height+"px"),l()){b.style.animation=l();const h=()=>{b.removeEventListener("animationend",h),b.style.animation=""};b.addEventListener("animationend",h)}})})},...c},u)}}const oe=["neutral","primary","success","danger","warning"],Eo=["plain","outline","solid"],Ao=["sm","md","lg"],To=()=>oe.map(e=>`
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
`);function V(e,t={}){const{bau:n,css:o}=e,a=o`
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
    ${To()}
  `;return function(...i){let[{size:s=t.size??"md",variant:l=t.variant??"none",color:c=t.color??"none",href:u,...d},...p]=X(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:T("button",t.class,l,s,c,a,d.class),href:u},p)}}const Do="light",Mo=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function st(e,t={}){const{bau:n,css:o,window:a}=e,{input:r}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},l=s();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Do);const c=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:b=t.variant??"plain",color:m=t.color??"neutral",...h},...f]=X(d);return r({required:"required",title:"Switch Theme",...h,class:T("theme-switch",m,b,p,c,t==null?void 0:t.class,h.class),type:"checkbox",checked:s()=="dark",onclick:x=>{i(x.target.checked?"dark":"light")}},...f)}}function Bo(e){const{tr:t,bau:n,css:o,config:a,states:r}=e,{i,header:s,h1:l,div:c,a:u,img:d,b:p,ul:b,li:m}=n.tags,{svg:h,path:f}=n.tagsNS("http://www.w3.org/2000/svg"),x=r.drawerOpen,w=V(e,{class:o`
      background: transparent;
    `}),y=st(e),E=()=>i(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},f({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},w({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},E()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),I=()=>c({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},y(),w({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},A(),I())}}function Io({tr:e,bau:t,css:n}){const{section:o,footer:a,span:r,a:i,ul:s,li:l,p:c,div:u,h1:d}=t.tags,p=({links:h,title:f})=>o({class:n`
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
        `},d(f),s(h.map(({href:x,name:w})=>l(i({href:x},w))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],m=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},r("v0.67.1"),r("MIT license")))}}function ve(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("list",r,u,c,l,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const He="0.3s",Rt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,r={...a};return r.children=o==null?void 0:o.map(Rt({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},_t=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=_t(e)(t.children[o]);if(a)return a}},No=({keyframes:e})=>({hideToLeft:e`
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
   `});function it(e,t={}){const{bau:n,css:o,window:a,config:r}=e,{base:i="",hashBased:s=!1}=t,l=`${r.base}${i}`,c=S=>{var g;return((g=S.parentTree.data)==null?void 0:g.href)??S.parentTree.children[0].data.href},u=({variant:S,color:g,size:v,currentTree:C,data:k})=>y(D({variant:S,color:g,size:v,href:`${l}${c(C)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:S,color:g,size:v,href:`${l}${k.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},k.name)),d=({size:S,subTree:{data:{name:g,href:v},children:C=[]}})=>D({size:S,href:`${l}${v}`,"data-ischild":!C.length},g),p=({pathname:S,subTree:g})=>{var v;return S===((v=g==null?void 0:g.data)==null?void 0:v.href)},{renderHeader:b=u,renderMenuItem:m=d,isActive:h=p}=t,{li:f,nav:x,div:w,header:y,a:E}=n.tags,A=Ve(e),I=ve(e),D=V(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:O}=No(e),L=o`
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
  `,N=({children:S,pathnameState:g,variant:v,color:C,size:k})=>I({class:T(v,C,k)},S.map(P=>f({class:()=>T(P.children&&"has-children",h({pathname:g.val,subTree:P})&&"active")},m({variant:v,color:C,size:k,subTree:P})))),j=({variant:S,color:g,size:v,currentTree:C,pathnameState:k})=>{const{children:P,parentTree:z,data:W,renderList:G}=C;return w({class:T("drillDownMenu",S,g,v)},z&&b({variant:S,color:g,size:v,data:W,currentTree:C}),P&&G?G({renderListDefault:N,children:P,pathnameState:k,variant:S,color:g,size:v}):N({children:P,pathnameState:k,variant:S,color:g,size:v}))},_=({tree:S,pathname:g})=>{let v=Rt({})({...S}),C=_t(g)(v);return C||(C=v),C},U=n.state(a.location.pathname.replace(l,"")),Z=({target:S})=>{let v=S.closest("a").getAttribute("href").replace(l,"");return s||(v=v.replace(S.hash,"")),v};return function(g){const{size:v=t.size??"md",variant:C=t.variant??"plain",color:k=t.color??"neutral",tree:P,...z}=g;let W=_({tree:P,pathname:U.val}),G;a.document.addEventListener("click",F=>{const{target:ee}=F,re=ee.closest("a");if(!re)return;const ce=re.getAttribute("href");if(ce&&!ce.startsWith("http")&&!ce.startsWith("#")&&!ce.startsWith("?")){W=_({tree:P,pathname:Z(F)});const{ischild:ge}=F.target.dataset;ge!=="true"&&(U.val=Z({target:ee}))}});const $=F=>{const{buttonback:ee,ischild:re}=F.target.dataset;ee=="true"?G=-1:re=="false"?G=1:re=="true"&&(G=0)},J=F=>{switch(F){case 1:return`${B} ${He}`;case-1:return`${O} ${He}`;default:return""}},ne=F=>{switch(F){case 1:return`${O} ${He} reverse`;case-1:return`${B} ${He} reverse`;default:return""}};return x({class:T(L,C,k,v,t==null?void 0:t.class,z.class),onclick:$},A({animationHide:()=>J(G),animationShow:()=>ne(G)},n.bind({deps:[U],render:()=>()=>j({variant:C,color:k,size:v,currentTree:W,pathnameState:U})})))}}const $o=()=>oe.map(e=>`
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
`);function de(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(s){const{variant:l=t.variant??"outline",color:c=t.color??"neutral",...u}=s;return a({type:"text",...u,class:T("input",t.class,t.size??"md",c,l,r,u.class)})}}function ct(e,t={}){const{bau:n,css:o,window:a}=e,r=de(e,t);return function(s){const{variant:l=t.variant??"outline",color:c=t.color??"neutral",...u}=s,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return r({type:"search",...u,color:c,variant:l,class:T("inputSearch",t.class,b,u.class)})}}function jt(e){const{tr:t,bau:n,css:o,config:a,states:r,window:i}=e,{div:s,ul:l,li:c,nav:u,a:d,span:p}=n.tags,b=ct(e,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:w,children:y,pathnameState:E,variant:A,color:I,size:D})=>{const B=n.state(""),O=n.derive(()=>B.val==""?y:y.filter(N=>N.data.name.match(new RegExp(`${B.val}`,"i")))),L=N=>{B.val=N.target.value};return s({class:o`
          display: flex;
          flex-direction: column;
        `},b({autocomplete:!1,name:"search",autofocus:!0,value:B,placeholder:`Search ${O.val.length} components`,size:22,oninput:L}),()=>w({children:O.val,pathnameState:E,variant:A,color:I,size:D}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let f=!1;const x=it(e);return function(){return s({bauMounted:({element:y})=>{i.innerWidth<=640&&(f=!0,r.drawerOpen.val=!1)},onclick:y=>{f&&!y.target.dataset.buttonback&&!y.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},x({tree:h}))}}const Lo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:r}=t.tags,i=Ve(e),s=Bo(e),l=jt(e),c=Io(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:b}){return r({class:n`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>b.val),c())}};function Ie(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...b]=X(s);return a({...p,onclick:d,class:T("chip",t.class,l,c,u,d&&"clickable",r,p.class)},...b)}}function Oo(e){const{bau:t,css:n,config:o}=e,{div:a,h1:r,h2:i,p:s}=t.tags;V(e);const l=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:l},r(u),i(d),s(p))}}function Po(e){const{bau:t,css:n}=e,{div:o,h1:a,p:r}=t.tags,i=n`
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
  `,s=({title:l,Content:c})=>o({className:"feature"},a(l),r(c()));return function({featuresContent:c}){return o({class:i},c.map(s))}}function zo({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:r,dd:i,div:s,aside:l,footer:c,a:u}=t.tags,d=({maxSize:p=151})=>({libName:b,size:m})=>s({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Ro(e){const{bau:t,css:n,config:o}=e,{div:a,p:r,a:i,section:s}=t.tags,l=Oo(e),c=Po(e),u=V(e);Ie(e);const d=zo(e),p=(...x)=>a({class:n`
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
          `},...x)),b=n``,m=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[r("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[r("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]}],f=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:h}),d({data:m}),f())}}function _o(e,t={}){const{bau:n,css:o}=e,{div:a,form:r,span:i,pre:s,h3:l,h4:c}=n.tags;return function(d,...p){return a("Login")}}const jo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:r,h2:i}=n.tags,s=_o(e);return()=>o({id:"login"},i(t("Login Examples")),r("Basic"),a(s()))};function Ho(e){const{tr:t,bau:n,css:o}=e,{div:a,article:r,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(t("Pages Examples")),jo(e)()))}}function Uo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ht(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ht(n)}),e}class At{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ut(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function pe(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Go="</span>",Tt=e=>!!e.scope,Fo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Vo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ut(t)}openNode(t){if(!Tt(t))return;const n=Fo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Tt(t)&&(this.buffer+=Go)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Dt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class lt{constructor(){this.rootNode=Dt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Dt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{lt._collapse(n)}))}}class Wo extends lt{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Vo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Me(e){return e?typeof e=="string"?e:e.source:null}function Gt(e){return xe("(?=",e,")")}function Ko(e){return xe("(?:",e,")*")}function Xo(e){return xe("(?:",e,")?")}function xe(...e){return e.map(n=>Me(n)).join("")}function Zo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ut(...e){return"("+(Zo(e).capture?"":"?:")+e.map(o=>Me(o)).join("|")+")"}function Ft(e){return new RegExp(e.toString()+"|").exec("").length-1}function qo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Jo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function dt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let r=Me(o),i="";for(;r.length>0;){const s=Jo.exec(r);if(!s){i+=r;break}i+=r.substring(0,s.index),r=r.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+a):(i+=s[0],s[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(t)}const Yo=/\b\B/,Vt="[a-zA-Z]\\w*",pt="[a-zA-Z_]\\w*",Wt="\\b\\d+(\\.\\d+)?",Kt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Xt="\\b(0b[01]+)",Qo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ea=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=xe(t,/.*\b/,e.binary,/\b.*/)),pe({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Be={begin:"\\\\[\\s\\S]",relevance:0},ta={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Be]},na={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Be]},oa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},We=function(e,t,n={}){const o=pe({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ut("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xe(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},aa=We("//","$"),ra=We("/\\*","\\*/"),sa=We("#","$"),ia={scope:"number",begin:Wt,relevance:0},ca={scope:"number",begin:Kt,relevance:0},la={scope:"number",begin:Xt,relevance:0},ua={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Be,{begin:/\[/,end:/\]/,relevance:0,contains:[Be]}]}]},da={scope:"title",begin:Vt,relevance:0},pa={scope:"title",begin:pt,relevance:0},ma={begin:"\\.\\s*"+pt,relevance:0},ga=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ue=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Yo,IDENT_RE:Vt,UNDERSCORE_IDENT_RE:pt,NUMBER_RE:Wt,C_NUMBER_RE:Kt,BINARY_NUMBER_RE:Xt,RE_STARTERS_RE:Qo,SHEBANG:ea,BACKSLASH_ESCAPE:Be,APOS_STRING_MODE:ta,QUOTE_STRING_MODE:na,PHRASAL_WORDS_MODE:oa,COMMENT:We,C_LINE_COMMENT_MODE:aa,C_BLOCK_COMMENT_MODE:ra,HASH_COMMENT_MODE:sa,NUMBER_MODE:ia,C_NUMBER_MODE:ca,BINARY_NUMBER_MODE:la,REGEXP_MODE:ua,TITLE_MODE:da,UNDERSCORE_TITLE_MODE:pa,METHOD_GUARD:ma,END_SAME_AS_BEGIN:ga});function ba(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ha(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function fa(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ba,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function va(e,t){Array.isArray(e.illegal)&&(e.illegal=ut(...e.illegal))}function xa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ya(e,t){e.relevance===void 0&&(e.relevance=1)}const wa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=xe(n.beforeMatch,Gt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Sa=["of","and","for","in","not","or","if","then","parent","list","value"],Ca="keyword";function Zt(e,t,n=Ca){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(r){Object.assign(o,Zt(e[r],t,r))}),o;function a(r,i){t&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){const l=s.split("|");o[l[0]]=[r,ka(l[0],l[1])]})}}function ka(e,t){return t?Number(t):Ea(e)?0:1}function Ea(e){return Sa.includes(e.toLowerCase())}const Mt={},fe=e=>{console.error(e)},Bt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ye=(e,t)=>{Mt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Mt[`${e}/${t}`]=!0)},Fe=new Error;function qt(e,t,{key:n}){let o=0;const a=e[n],r={},i={};for(let s=1;s<=t.length;s++)i[s+o]=a[s],r[s+o]=!0,o+=Ft(t[s-1]);e[n]=i,e[n]._emit=r,e[n]._multi=!0}function Aa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Fe;if(typeof e.beginScope!="object"||e.beginScope===null)throw fe("beginScope must be object"),Fe;qt(e,e.begin,{key:"beginScope"}),e.begin=dt(e.begin,{joinWith:""})}}function Ta(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Fe;if(typeof e.endScope!="object"||e.endScope===null)throw fe("endScope must be object"),Fe;qt(e,e.end,{key:"endScope"}),e.end=dt(e.end,{joinWith:""})}}function Da(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ma(e){Da(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Aa(e),Ta(e)}function Ba(e){function t(i,s){return new RegExp(Me(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=Ft(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(l=>l[1]);this.matcherRe=t(dt(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(s);if(!l)return null;const c=l.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const l=new n;return this.rules.slice(s).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const s=new o;return i.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function r(i,s){const l=i;if(i.isCompiled)return l;[ha,xa,Ma,wa].forEach(u=>u(i,s)),e.compilerExtensions.forEach(u=>u(i,s)),i.__beforeBegin=null,[fa,va,ya].forEach(u=>u(i,s)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=Zt(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(c,!0),s&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=Me(l.end)||"",i.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ia(u==="self"?i:u)})),i.contains.forEach(function(u){r(u,l)}),i.starts&&r(i.starts,s),l.matcher=a(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=pe(e.classNameAliases||{}),r(e)}function Jt(e){return e?e.endsWithParent||Jt(e.starts):!1}function Ia(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return pe(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Jt(e)?pe(e,{starts:e.starts?pe(e.starts):null}):Object.isFrozen(e)?pe(e):e}var Na="11.8.0";class $a extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ot=Ut,It=pe,Nt=Symbol("nomatch"),La=7,Yt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Wo};function l(g){return s.noHighlightRe.test(g)}function c(g){let v=g.className+" ";v+=g.parentNode?g.parentNode.className:"";const C=s.languageDetectRe.exec(v);if(C){const k=O(C[1]);return k||(Bt(r.replace("{}",C[1])),Bt("Falling back to no-highlight mode for this block.",g)),k?C[1]:"no-highlight"}return v.split(/\s+/).find(k=>l(k)||O(k))}function u(g,v,C){let k="",P="";typeof v=="object"?(k=g,C=v.ignoreIllegals,P=v.language):(ye("10.7.0","highlight(lang, code, ...args) has been deprecated."),ye("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=g,k=v),C===void 0&&(C=!0);const z={code:k,language:P};Z("before:highlight",z);const W=z.result?z.result:d(z.language,z.code,C);return W.code=z.code,Z("after:highlight",W),W}function d(g,v,C,k){const P=Object.create(null);function z(M,R){return M.keywords[R]}function W(){if(!K.keywords){se.addText(te);return}let M=0;K.keywordPatternRe.lastIndex=0;let R=K.keywordPatternRe.exec(te),q="";for(;R;){q+=te.substring(M,R.index);const Q=ae.case_insensitive?R[0].toLowerCase():R[0],ie=z(K,Q);if(ie){const[ue,eo]=ie;if(se.addText(q),q="",P[Q]=(P[Q]||0)+1,P[Q]<=La&&(_e+=eo),ue.startsWith("_"))q+=R[0];else{const to=ae.classNameAliases[ue]||ue;J(R[0],to)}}else q+=R[0];M=K.keywordPatternRe.lastIndex,R=K.keywordPatternRe.exec(te)}q+=te.substring(M),se.addText(q)}function G(){if(te==="")return;let M=null;if(typeof K.subLanguage=="string"){if(!t[K.subLanguage]){se.addText(te);return}M=d(K.subLanguage,te,!0,wt[K.subLanguage]),wt[K.subLanguage]=M._top}else M=b(te,K.subLanguage.length?K.subLanguage:null);K.relevance>0&&(_e+=M.relevance),se.__addSublanguage(M._emitter,M.language)}function $(){K.subLanguage!=null?G():W(),te=""}function J(M,R){M!==""&&(se.startScope(R),se.addText(M),se.endScope())}function ne(M,R){let q=1;const Q=R.length-1;for(;q<=Q;){if(!M._emit[q]){q++;continue}const ie=ae.classNameAliases[M[q]]||M[q],ue=R[q];ie?J(ue,ie):(te=ue,W(),te=""),q++}}function F(M,R){return M.scope&&typeof M.scope=="string"&&se.openNode(ae.classNameAliases[M.scope]||M.scope),M.beginScope&&(M.beginScope._wrap?(J(te,ae.classNameAliases[M.beginScope._wrap]||M.beginScope._wrap),te=""):M.beginScope._multi&&(ne(M.beginScope,R),te="")),K=Object.create(M,{parent:{value:K}}),K}function ee(M,R,q){let Q=qo(M.endRe,q);if(Q){if(M["on:end"]){const ie=new At(M);M["on:end"](R,ie),ie.isMatchIgnored&&(Q=!1)}if(Q){for(;M.endsParent&&M.parent;)M=M.parent;return M}}if(M.endsWithParent)return ee(M.parent,R,q)}function re(M){return K.matcher.regexIndex===0?(te+=M[0],1):(et=!0,0)}function ce(M){const R=M[0],q=M.rule,Q=new At(q),ie=[q.__beforeBegin,q["on:begin"]];for(const ue of ie)if(ue&&(ue(M,Q),Q.isMatchIgnored))return re(R);return q.skip?te+=R:(q.excludeBegin&&(te+=R),$(),!q.returnBegin&&!q.excludeBegin&&(te=R)),F(q,M),q.returnBegin?0:R.length}function ge(M){const R=M[0],q=v.substring(M.index),Q=ee(K,M,q);if(!Q)return Nt;const ie=K;K.endScope&&K.endScope._wrap?($(),J(R,K.endScope._wrap)):K.endScope&&K.endScope._multi?($(),ne(K.endScope,M)):ie.skip?te+=R:(ie.returnEnd||ie.excludeEnd||(te+=R),$(),ie.excludeEnd&&(te=R));do K.scope&&se.closeNode(),!K.skip&&!K.subLanguage&&(_e+=K.relevance),K=K.parent;while(K!==Q.parent);return Q.starts&&F(Q.starts,M),ie.returnEnd?0:R.length}function Ee(){const M=[];for(let R=K;R!==ae;R=R.parent)R.scope&&M.unshift(R.scope);M.forEach(R=>se.openNode(R))}let le={};function Y(M,R){const q=R&&R[0];if(te+=M,q==null)return $(),0;if(le.type==="begin"&&R.type==="end"&&le.index===R.index&&q===""){if(te+=v.slice(R.index,R.index+1),!a){const Q=new Error(`0 width match regex (${g})`);throw Q.languageName=g,Q.badRule=le.rule,Q}return 1}if(le=R,R.type==="begin")return ce(R);if(R.type==="illegal"&&!C){const Q=new Error('Illegal lexeme "'+q+'" for mode "'+(K.scope||"<unnamed>")+'"');throw Q.mode=K,Q}else if(R.type==="end"){const Q=ge(R);if(Q!==Nt)return Q}if(R.type==="illegal"&&q==="")return 1;if(Qe>1e5&&Qe>R.index*3)throw new Error("potential infinite loop, way more iterations than matches");return te+=q,q.length}const ae=O(g);if(!ae)throw fe(r.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Re=Ba(ae);let Ye="",K=k||Re;const wt={},se=new s.__emitter(s);Ee();let te="",_e=0,be=0,Qe=0,et=!1;try{if(ae.__emitTokens)ae.__emitTokens(v,se);else{for(K.matcher.considerAll();;){Qe++,et?et=!1:K.matcher.considerAll(),K.matcher.lastIndex=be;const M=K.matcher.exec(v);if(!M)break;const R=v.substring(be,M.index),q=Y(R,M);be=M.index+q}Y(v.substring(be))}return se.finalize(),Ye=se.toHTML(),{language:g,value:Ye,relevance:_e,illegal:!1,_emitter:se,_top:K}}catch(M){if(M.message&&M.message.includes("Illegal"))return{language:g,value:ot(v),illegal:!0,relevance:0,_illegalBy:{message:M.message,index:be,context:v.slice(be-100,be+100),mode:M.mode,resultSoFar:Ye},_emitter:se};if(a)return{language:g,value:ot(v),illegal:!1,relevance:0,errorRaised:M,_emitter:se,_top:K};throw M}}function p(g){const v={value:ot(g),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return v._emitter.addText(g),v}function b(g,v){v=v||s.languages||Object.keys(t);const C=p(g),k=v.filter(O).filter(N).map($=>d($,g,!1));k.unshift(C);const P=k.sort(($,J)=>{if($.relevance!==J.relevance)return J.relevance-$.relevance;if($.language&&J.language){if(O($.language).supersetOf===J.language)return 1;if(O(J.language).supersetOf===$.language)return-1}return 0}),[z,W]=P,G=z;return G.secondBest=W,G}function m(g,v,C){const k=v&&n[v]||C;g.classList.add("hljs"),g.classList.add(`language-${k}`)}function h(g){let v=null;const C=c(g);if(l(C))return;if(Z("before:highlightElement",{el:g,language:C}),g.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),s.throwUnescapedHTML))throw new $a("One of your code blocks includes unescaped HTML.",g.innerHTML);v=g;const k=v.textContent,P=C?u(k,{language:C,ignoreIllegals:!0}):b(k);g.innerHTML=P.value,m(g,C,P.language),g.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(g.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),Z("after:highlightElement",{el:g,result:P,text:k})}function f(g){s=It(s,g)}const x=()=>{E(),ye("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function w(){E(),ye("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let y=!1;function E(){if(document.readyState==="loading"){y=!0;return}document.querySelectorAll(s.cssSelector).forEach(h)}function A(){y&&E()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function I(g,v){let C=null;try{C=v(e)}catch(k){if(fe("Language definition for '{}' could not be registered.".replace("{}",g)),a)fe(k);else throw k;C=i}C.name||(C.name=g),t[g]=C,C.rawDefinition=v.bind(null,e),C.aliases&&L(C.aliases,{languageName:g})}function D(g){delete t[g];for(const v of Object.keys(n))n[v]===g&&delete n[v]}function B(){return Object.keys(t)}function O(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function L(g,{languageName:v}){typeof g=="string"&&(g=[g]),g.forEach(C=>{n[C.toLowerCase()]=v})}function N(g){const v=O(g);return v&&!v.disableAutodetect}function j(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=v=>{g["before:highlightBlock"](Object.assign({block:v.el},v))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=v=>{g["after:highlightBlock"](Object.assign({block:v.el},v))})}function _(g){j(g),o.push(g)}function U(g){const v=o.indexOf(g);v!==-1&&o.splice(v,1)}function Z(g,v){const C=g;o.forEach(function(k){k[C]&&k[C](v)})}function S(g){return ye("10.7.0","highlightBlock will be removed entirely in v12.0"),ye("10.7.0","Please use highlightElement now."),h(g)}Object.assign(e,{highlight:u,highlightAuto:b,highlightAll:E,highlightElement:h,highlightBlock:S,configure:f,initHighlighting:x,initHighlightingOnLoad:w,registerLanguage:I,unregisterLanguage:D,listLanguages:B,getLanguage:O,registerAliases:L,autoDetection:N,inherit:It,addPlugin:_,removePlugin:U}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Na,e.regex={concat:xe,lookahead:Gt,either:ut,optional:Xo,anyNumberOfTimes:Ko};for(const g in Ue)typeof Ue[g]=="object"&&Ht(Ue[g]);return Object.assign(e,Ue),e},Se=Yt({});Se.newInstance=()=>Yt({});var Oa=Se;Se.HighlightJS=Se;Se.default=Se;const De=Uo(Oa),$t="[A-Za-z$_][0-9A-Za-z$_]*",Pa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],za=["true","false","null","undefined","NaN","Infinity"],Qt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],en=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],tn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ra=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],_a=[].concat(tn,Qt,en);function nn(e){const t=e.regex,n=(v,{after:C})=>{const k="</"+v[0].slice(1);return v.input.indexOf(k,C)!==-1},o=$t,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,C)=>{const k=v[0].length+v.index,P=v.input[k];if(P==="<"||P===","){C.ignoreMatch();return}P===">"&&(n(v,{after:k})||C.ignoreMatch());let z;const W=v.input.substring(k);if(z=W.match(/^\s*=/)){C.ignoreMatch();return}if((z=W.match(/^\s+extends\s+/))&&z.index===0){C.ignoreMatch();return}}},s={$pattern:$t,keyword:Pa,literal:za,built_in:_a,"variable.language":Ra},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},m={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},f={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},y=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,m,h,f,{match:/\$\d+/},d];p.contains=y.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(y)});const E=[].concat(w,p.contains),A=E.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(E)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:A},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Qt,...en]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},N={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(v){return t.concat("(?!",v.join("|"),")")}const _={match:t.concat(/\b/,j([...tn,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},U={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},S="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(S)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,m,h,f,w,{match:/\$\d+/},d,B,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:S,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},U,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},_,N,D,Z,{match:/\$[(.]/}]}}function ja(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ha=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return De.registerLanguage("javascript",nn),De.registerLanguage("sh",ja),function({text:i,language:s="js"}){const l=a({class:`hljs language-${s}`});return l.innerHTML=De.highlight(i,{language:s}).value,o({class:n`
          display: inline-block;
        `},l)}};function Ua(e){const{bau:t,css:n}=e,{article:o,h1:a,p:r,code:i,a:s,ul:l,li:c}=t.tags,u=Ha(e);return function(){return o({class:n`
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
)`}),r("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),r("Further reading:",l(c(s({href:"components"},"Visit the component gallery")),c(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Ke(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("paper",l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function on(e,t={}){const{bau:n,css:o,window:a}=e,{nav:r,ul:i,li:s,a:l}=n.tags,{headerSelector:c="h2,h3"}=t,u=n.state("no"),d=(f,x)=>{let w=null;return(...y)=>{a.clearTimeout(w),w=a.setTimeout(()=>f(...y),x)}},p=o`
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
  `,b=({value:f,id:x,children:w=[]})=>{const y=l({class:()=>u.val==x?"active":"",href:`#${x}`});return y.innerHTML=f,s({class:()=>u.val==x?"active":""},y,w.length>0&&i(w.map(b)))},m=f=>f.tagName.charAt(1),h=({contentEl:f})=>{const x=f.querySelectorAll(c);let w=2,y={},E={children:[]},A=E;const I=A;let D=[A];return[...x].forEach(B=>{const O=m(B);B.setAttribute("id",B.textContent),!B.innerHTML.includes("<button")&&(y={value:B.innerHTML,id:B.id??B.textContent,children:[]},w==O?(E=y,A.children.push(E)):w<O?(D.push(A),A=E,E.children.push(y),E=y):w>O&&(A=D[O-1],D=D.slice(0,O-1),A.children.push(y),E=y),w=O)}),I};return function(...x){let[{size:w=t.size??"md",variant:y=t.variant??"plain",color:E=t.color??"neutral",contentEl:A,...I}]=X(x);const D=h({contentEl:A}),B=d(()=>{const L=[...A.querySelectorAll(c)].find(N=>{const{top:j,height:_}=N.getBoundingClientRect();if(j+_>60)return!0});L&&(u.val=L==null?void 0:L.id)},100);return r({...I,class:T("tableOfContent",w,y,E,p,t==null?void 0:t.class,I==null?void 0:I.class),bauMounted:()=>{a.addEventListener("scroll",B)},bauUnmounted:()=>{a.removeEventListener("scroll",B)}},D.children&&i(D.children.map(b)))}}const an=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:r,tr:i,td:s,thead:l,th:c}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(l(i(c(p??""),oe.map(b=>c(b)))),r(Eo.map(b=>i(c(b),oe.map((m,h)=>s(d({color:m,variant:b},{index:h}))))))))}},Ga=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:r}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Ao.map((i,s)=>r(e,{size:i})({color:"success",variant:"outline"},{size:i,index:s})))}},H=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:r,h1:i,p:s,h2:l,h3:c,pre:u,code:d}=t.tags;De.registerLanguage("javascript",nn);const p=on(e),b=Ke(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),m=an(e),h=Ga(e),f=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:w})=>{w.innerHTML=De.highlight(x,{language:"js"}).value}}));return function(w){const y=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(w.title),s(w.description),w.gridItem&&!w.variantColorTableDisable&&[l("Variant/Color"),b(m({Item:w.gridItem(e)}))],w.gridItem&&!w.variantSizeDisable&&[l("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b(h({item:w.gridItem}))],l("Usage"),c("Import"),f({text:w.importStatement}),l("Examples"),w.examples.map(E=>r(c(E.title),s(E.description),b(E.createComponent(e)({})),f({text:E.code}))));return o({class:n`
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
        `},y,p({contentEl:y}))}};function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?s(c):l(c))};function s(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:b=t.color??"neutral",Header:m,Content:h,close:f=!0,...x}]=X(u);const w=n.state(f);return a({...x,class:T("collapsible",d,r,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>T("header",h?w.val?"close":"open":""),onclick:y=>{w.val=!w.val,y.stopPropagation()}},m()),a({class:"content",role:"region",bauMounted:({element:y})=>{w.val&&(y.style.height="0px")},"aria-expanded":({element:y})=>(i({element:y,closeState:w}),!w.val)},h&&h()))}}const Fa=()=>oe.map(e=>`
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
`);function Xe(e,t={}){const{bau:n,css:o}=e,{div:a,ul:r,li:i,h3:s,button:l}=n.tags,c=o`
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
    ${Fa()}
  `;return function(...d){let[{size:p=t.size??"md",variant:b=t.variant??"plain",color:m=t.color??"neutral",data:h=[],...f}]=X(d);const x=n.state(""),w=mt(e,{size:p,variant:b,color:m}),y=A=>I=>{x.val==A?x.val="":x.val=A},E=A=>{const{Header:I,Content:D,name:B}=A,O=()=>s({class:()=>T(x.val==B&&"active")},l({type:"button","aria-controls":`bau-${B}`,"aria-expanded":({element:N})=>x.val==B},I(A))),L=()=>a({id:`bau-${B}`,"data-state":({element:N})=>x.val==B},D(A));return i({class:T(m,b,p),onclick:y(B)},w({Header:O,Content:L}))};return a({class:T("accordion",c,t==null?void 0:t.class,f.class)},r(h.map(E)))}}const rn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Xe(e,t);return s=>i({...s,data:r})},Va=e=>{const{bau:t}=e,{div:n,p:o,section:a}=t.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Xe(e);return()=>a(i({data:r,color:"neutral",variant:"outline"}))},Wa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,sn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ka=e=>{const{css:t}=e,n=sn(e),o=Xe(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Xa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Za=e=>{const{css:t}=e,n=sn(e),o=Xe(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},qa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ja={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Wa,createComponent:Va},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Xa,createComponent:Ka},{title:"Customize the icon",description:"Customize the icon with a cross.",code:qa,createComponent:Za}],gridItem:rn},Ya=e=>{const t=H(e);return()=>t(Ja)},Qa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},er=()=>oe.map(e=>`
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
`);function ke(e,t={}){const{bau:n,css:o}=e,{div:a,i:r}=n.tags,i=o`
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
  `,s=V(e),l=({onclick:c})=>s({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:b=t.color??"neutral",onRemove:m,...h},...f]=X(u);return a({...h,class:T("alert",`alert-${p}`,t.class,p,b,d,i,h.class),role:"alert"},r({class:"icon"},Qa[b]),a({class:"content"},...f),m&&l({onclick:m}))}}const cn=(e,t)=>{const n=ke(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},tr=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=ke(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},nr=`import alert from "@grucloud/bau-ui/alert";
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
`,or=e=>{const{css:t}=e,n=ke(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},ar=`import alert from "@grucloud/bau-ui/alert";
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
`,rr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:nr,createComponent:tr},{title:"Custom Alert ",description:"A custom alert.",code:ar,createComponent:or}],gridItem:cn},sr=e=>{const t=H(e);return()=>t(rr)},ir=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:r=10,deleteAfterDuration:i=15e3}=t,{div:s}=n.tags,l=n.state([]),c={inserting:a`
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
    `},d=({id:p,status:b})=>{const m=l.val.findIndex(h=>h.id===p);m!=-1&&(l.val[m].status=b)};return function(b={},...m){const h=({id:w})=>{d({id:w,status:"removing"});const y=l.val.findIndex(E=>E.id===w);y!=-1&&l.val.splice(y,1)},f=({Component:w})=>{const y={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};l.val.length>=r&&h({id:l.val[0].id}),l.val.push(y),setTimeout(()=>h(y),i)},x=w=>s({class:u.item,onclick:()=>h(w)},w.Component());return document.addEventListener("alert.add",w=>f(w.detail)),document.addEventListener("alert.remove",w=>h(w.detail)),s({class:T(u.stack,t==null?void 0:t.class,b.class)},n.loop(l,s(),x))}},cr=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=ir(e,{deleteAfterDuration:2e4}),r=V(e),i=ke(e);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},lr=`import { Context } from "@grucloud/bau-ui/context";
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
`,ur={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:lr,createComponent:cr}]},dr=e=>{const t=H(e);return()=>t(ur)},pr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,r=Ve(e),i=V(e),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=t.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),r({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},mr=`import animate from "@grucloud/bau-ui/animate";
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
`,gr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:r,label:i}=t.tags,s=Ve(e),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=t.state("one"),u=({target:p})=>c.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",r({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",r({type:"radio",id:"two",name:"radio",value:c,oninput:u})),s({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},br=`import animate from "@grucloud/bau-ui/animate";
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
`,hr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:mr,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:br,createComponent:gr}]},fr=e=>{const t=H(e);return()=>t(hr)};function Ce(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...b},...m]=X(c);return r({...b,class:T("skeleton",u,s,t==null?void 0:t.class,b==null?void 0:b.class)},...m)}}function gt(e,t={}){const{bau:n,css:o}=e,{div:a,img:r}=n.tags,i=n.state(!0),s=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,s.val=!0},u=o`
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
  `;return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",width:f=40,height:x=40,alt:w,...y},...E]=X(p);const A=Ce(e,{class:T(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${f}px;
        `,t==null?void 0:t.class,y.class)});return a({class:T(u,t==null?void 0:t.class,y.class)},()=>i.val&&A(),()=>s.val&&w,r({alt:w,width:f,height:x,onload:l,onerror:c,class:()=>T(!i.val&&"visible",s.val&&"hide",h,m,b,u,t==null?void 0:t.class,y.class),...y}))}}const ln=(e,t)=>{const{css:n}=e,o=gt(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},vr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=gt(e,{class:n`
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

  return () =>
    section(
      Avatar({
        src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
        alt: "my avatar",
      })
    );
};
`,yr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=gt(e,{class:n`
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
`,Sr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:xr,createComponent:vr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:wr,createComponent:yr}],gridItem:ln},Cr=e=>{const t=H(e);return()=>t(Sr)};function Ne(e,t){const{bau:n,css:o,window:a}=e,{dialog:r}=n.tags,i=Ke(e,{class:o`
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
    opacity: 0;
  `;return function(...c){let[{contentEl:u,triggerEl:d,onClose:p,...b},...m]=X(c);const h=w=>{x.style.opacity=1,x.showModal();const y=d.getBoundingClientRect(),E=x.getBoundingClientRect();y.x<a.innerWidth/2?x.style.left=y.left+"px":x.style.left=y.right-E.width+"px",y.y<a.innerHeight/2?(x.style.top=y.top+y.height+"px",x.style.height=Math.min(x.scrollHeight,a.innerHeight-y.top-y.height)+"px"):(x.style.top=Math.max(0,y.top-E.height)+"px",x.scrollHeight>y.top&&(x.style.height=y.top+"px"))},f=w=>{const y=()=>{x.close(),x.removeEventListener("transitionend",y)};x.addEventListener("transitionend",y),x.style.opacity=0},x=r({role:"presentation",class:T("popover",s,t==null?void 0:t.class,b==null?void 0:b.class),onclick:w=>{w.target===x&&(f(),p==null||p.call())}},i(u));return x.closeDialog=f,x.openDialog=h,x}}const Ge={sm:12,md:16,lg:24},kr=()=>oe.map(e=>`
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
`);function me(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:r,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
      animation: ${s} 2s linear infinite;
      width: ${Ge[u]};
      height: ${Ge[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${kr()}
    `;return r({class:{deps:[b],renderProp:()=>f=>T("spinner",h,d,p,f==!1?"":"visibility",t==null?void 0:t.class,m.class)},version:"1.1",x:"0px",y:"0px",width:Ge[u],height:Ge[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...m},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Er=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ze(e,t={}){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,i=o`
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

    ${Er()}
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:b,Option:m,options:h,defaultOption:f,getOptionLabel:x,getOptionValue:w,onSelect:y=()=>{},id:E,required:A,name:I,loading:D,...B},...O]=X(l);const L=Ne(e),N=V(e),j=de(e,{variant:u,color:d,size:c}),_=ve(e),U=me(e,{variant:u,color:d,size:c}),Z=n.state(f),S=n.state(B.value),g=n.state(!1),v=n.state(0),C=()=>{g.val=!1},k=n.state(h),P=Y=>ae=>Y.val&&x(ae)==x(Y.val),z=()=>{le.openDialog(),g.val=!0,S.val="",k.val=h,v.val=h.findIndex(P(Z));const Y=Ee.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),ce.scrollIntoView({block:"end"}))},W=()=>{le.closeDialog(),g.val=!1,v.val=0},G=Y=>{const{value:ae}=Y.target;S.val=ae,ae?k.val=h.filter(Re=>x(Re).match(new RegExp(`${ae}`,"i"))):k.val=h},$=Y=>{le.open?W():z()},J=Y=>{Z.val=Y,ge.value=w(Y)},ne=({option:Y,index:ae})=>Re=>{J(Y),v.val=ae,W()},F=()=>{const Y=Ee.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},ee=Y=>{switch(Y.key){case"Escape":W();break;case"ArrowDown":v.val<k.val.length-1?v.val++:v.val=0,F();break;case"ArrowUp":v.val<=0?v.val=k.val.length-1:v.val--,F();break;case"Enter":le.open?(J(k.val[v.val]),W()):z(),Y.preventDefault();break}},re=N({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":g,"aria-label":p,onclick:$,variant:u,color:d,size:c,class:D==!0&&"loading",disabled:D},()=>Z.val?x(Z.val):p,()=>D==!0&&U({visibility:D})),ce=j({value:S,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":g,oninput:G,onkeydown:ee,...B}),ge=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:f&&w(f),required:A,name:I}),Ee=a({class:T(u,d,c,"content")},ce,()=>_({class:T(u,d,c)},k.val.map((Y,ae)=>r({class:()=>T(v.val==ae&&"active",P(Z)(Y)&&"selected"),onclick:ne({option:Y,index:ae})},m(Y))))),le=L({id:E,triggerEl:re,contentEl:Ee,onClose:C,class:o`
        overflow: hidden;
      `});return a({...B,class:T("autocomplete",i,t==null?void 0:t.class,B==null?void 0:B.class)},n.bind({deps:[Z],render:()=>Y=>{Y&&(ge.value=w(Y),y(Y))}}),re,ge,le)}}const un=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:r}=n.tags,i=Ze(e,t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Ar=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Ze(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return()=>o(i({options:s,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Country",placeholder:"Search countries",id:"country"}))},Tr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Dr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Ze(e),s="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
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
`,Br=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=V(e,{variant:"outline"}),s=Ze(e),l=t.state([]),c=t.state(!1),u=t.state("");async function d({url:m,transform:h=f=>f}){try{c.val=!0;const f=await fetch(m,{});if(f.ok){const x=await f.json();l.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,f)=>h.name.common.localeCompare(f.name.common))});p();const b=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(m.flag),r(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>s({options:l.val,Option:b,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",placeholder:"Search countries",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},Ir=`import { Context } from "@grucloud/bau-ui/context";
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
`,Nr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Tr,createComponent:Ar},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ir,createComponent:Br},{title:"Default Option",description:"A autocomplete with a default option.",code:Mr,createComponent:Dr}],gridItem:un},$r=e=>{const t=H(e);return()=>t(Nr)};function dn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...b]=X(s);return a({...p,class:T("badge",r,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:T(u,c,l)},d),...b)}}const pn=(e,t)=>{const n=dn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Lr=e=>{const{bau:t}=e,{section:n}=t.tags,o=dn(e);return()=>n(o({content:"10"},"☏"))},Or=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Pr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Or,createComponent:Lr}],gridItem:pn},zr=e=>{const t=H(e);return()=>t(Pr)};function bt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:r,li:i,span:s}=n.tags,{separator:l="〉"}=t,c=V(e),u=o`
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
  `;return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",items:f,...x},...w]=X(p);return r({...x,class:T(u,t==null?void 0:t.class,x==null?void 0:x.class)},f.map(({href:y,name:E})=>i((y!=null?c:s)({href:`${a.base}${y}`,color:h,variant:m,size:b,class:T(h,m,b)},E))))}}const mn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=bt(e,t);return a=>o({...a,...n})},Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},_r=`import { Context } from "@grucloud/bau-ui/context";
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
`,jr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=bt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Hr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ur={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:_r,createComponent:Rr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Hr,createComponent:jr}],gridItem:mn},Gr=e=>{const t=H(e);return()=>t(Ur)},gn=(e,t={})=>{const n=V(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Fr=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Vr=`import button from "@grucloud/bau-ui/button";
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
`,Wr=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
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
`,Xr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Vr,createComponent:Fr},{title:"Disabled Button",description:"A disabled button.",code:Kr,createComponent:Wr}],gridItem:gn},Zr=e=>{const t=H(e);return()=>t(Xr)},qr=()=>oe.map(e=>`
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
`);function ht(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
    ${qr()}
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("button-group",c,u,l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const bn=(e,t)=>{const n=["ONE","TWO","THREE"],o=V(e,t),a=ht(e,t);return r=>a({...r},n.map(i=>o(r,i)))},Jr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=V(e),r=ht(e),i="primary",s="solid";return()=>n(r({color:i,variant:s},o.map(l=>a({color:i,variant:s},l))))},Yr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Qr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Yr,createComponent:Jr}],gridItem:bn},es=e=>{const t=H(e);return()=>t(Qr)};function hn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>oe.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...b]=X(l);return a({...p,type:"date",class:T("calendar",i,d,u,c,t==null?void 0:t.class,p==null?void 0:p.class)},...b)}}const fn=(e,t)=>{const n=hn(e,t);return o=>n({...o})},ts=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),r=hn(e);return()=>n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},ns=`import calendar from "@grucloud/bau-ui/calendar";
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
`,os={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:ns,createComponent:ts}],gridItem:fn},as=e=>{const t=H(e);return()=>t(os)};function rs(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:b,Previous:m,Next:h,...f}]=X(l);const x=()=>{i.val<=0?i.val=p.length-1:i.val--},w=()=>{i.val>=p.length-1?i.val=0:i.val++},y=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},p.map(b));return a({...f,class:T("carousel",c,r,t==null?void 0:t.class,f==null?void 0:f.class)},a({class:T("control","control-previous"),onclick:x},m()),a({class:T("control","control-next"),onclick:w},h()),y)}}const ss=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],is=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,r=V(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),s=rs(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),l=()=>r("◀"),c=()=>r("▶");return()=>o(s({slides:ss,Slide:i,Previous:l,Next:c}))},cs=`import carousel from "@grucloud/bau-ui/carousel";
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
`,ls={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:cs,createComponent:is}]},us=e=>{const t=H(e);return()=>t(ls)},vn=(e,t)=>{const n=Ie(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ds=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ie(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},ps=`import chip from "@grucloud/bau-ui/chip";
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
`,ms={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ps,createComponent:ds}],gridItem:vn},gs=e=>{const t=H(e);return()=>t(ms)};function qe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({type:"checkbox",...d,class:T(r,u,c,l,t==null?void 0:t.class,d==null?void 0:d.class)})}}const xn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,r=qe(e,t);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,r({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},bs=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,r=qe(e),i=t.state(!1),s=l=>{i.val=!!l.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",r({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:i,onchange:s})))},hs=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,fs=e=>{const{bau:t,css:n}=e,{label:o,form:a}=t.tags,r=qe(e,{color:"neutral",variant:"outline"}),i=V(e),s=l=>{l.preventDefault();const c=Object.fromEntries(new FormData(l.target.closest("form")));alert(JSON.stringify(c))};return()=>a({onsubmit:s,class:n`
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
        `},o("My Checkbox",r({id:"my-checkbox-uncontrolled",name:"my-checkbox-uncontrolled"})),i({type:"submit"},"Submit"))},vs=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,xs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:hs,createComponent:bs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:vs,createComponent:fs}],gridItem:xn},ys=e=>{const t=H(e);return()=>t(xs)},ws=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=mt(e),r=V(e,{variant:"outline"}),i=()=>r("Header"),s=()=>o("Content");return()=>n(a({Header:i,Content:s}))},Ss=`import button from "@grucloud/bau-ui/button";
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
`,Cs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Ss,createComponent:ws}]},ks=e=>{const t=H(e);return()=>t(Cs)};function Es(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("divider",l,r,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const As=e=>{const{bau:t}=e,{section:n}=t.tags,o=Es(e);return()=>n(o("OR"))},Ts=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Ds={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ts,createComponent:As}],variantColorTableDisable:!0,variantSizeDisable:!0},Ms=e=>{const t=H(e);return()=>t(Ds)};function Bs(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{color:l,variant:c="outline",size:u,openState:d,...p},...b]=X(s);return a({class:T(r,t==null?void 0:t.class,p.class)},a({class:()=>T("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>T("content",d.val&&"content-open")},b))}}const Is=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),r=Bs(e),i=V(e),s=jt(e);return()=>n(o("Click on the button to open and close the drawer."),i({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},s()))},Ns=`import drawer from "@grucloud/bau-ui/drawer";
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
`,$s={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ns,createComponent:Is}]},Ls=e=>{const t=H(e);return()=>t($s)},Os=()=>oe.map(e=>`
`).join(`
`);function yn(e,t={}){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,i=V(e),s=Ne(e),l=ve(e),c=o`
    ${Os()}
  `;return function(...d){let[{size:p=t.size??"md",variant:b=t.variant??"outline",color:m=t.color??"neutral",label:h,ListItem:f,items:x,...w},...y]=X(d);const E=n.state(0),A=()=>{_.openDialog(),_.focus()},I=()=>{_.closeDialog()},D=()=>{_.open?I():A()},B=U=>{D(),U.preventDefault()},O=({item:U,index:Z})=>S=>{E.val=Z,I(),S.preventDefault()},L=U=>{switch(U.preventDefault(),U.key){case"Escape":I();break;case"ArrowDown":E.val<options.length-1?E.val++:E.val=0;break;case"ArrowUp":E.val<=0?E.val=options.length-1:E.val--;break;case"Enter":D();break}},N=()=>l({tabindex:"0",class:T(m,b)},x.map((U,Z)=>r({class:()=>T(E.val==Z&&"active"),onclick:O({item:U,index:Z})},f(U)))),j=i({type:"button",onclick:B,color:m,variant:b,size:p},h),_=s({triggerEl:j,contentEl:N()});return a({...w,class:T("dropdownMenu",m,p,c,t==null?void 0:t.class,w==null?void 0:w.class),onkeydown:L},j,_)}}const Ps=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,r=yn(e,t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o(a(l.label));return l=>r({...l,items:i,ListItem:s,label:"Action"})},zs=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,r=yn(e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(r({items:i,ListItem:s,label:"Action"}))},Rs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,_s={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Rs,createComponent:zs}],gridItem:Ps},js=e=>{const t=H(e);return()=>t(_s)},wn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=it(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Hs=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=it(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Us=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Gs={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Us,createComponent:Hs}],gridItem:(e,t)=>wn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Fs=e=>{const t=H(e);return()=>t(Gs)};function Sn(e,t={}){const{bau:n,css:o}=e,{div:a,label:r,input:i}=n.tags,s={base:o`
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
    `};return function(c,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:b=t.color??"neutral",Component:m,disabled:h,...f}=c;return a({class:T(s.base,h&&s.disabled,t==null?void 0:t.class,c.class)},r({class:T(p,b,d)},m({disabled:h}),i({type:"file",disabled:h,...f})))}}const Cn=(e,t)=>{const{tr:n,bau:o,css:a,config:r}=e,{svg:i,use:s}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=Sn(e,t),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},b=({disabled:m})=>l({class:T(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${r.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return m=>d({Component:b,name:"file",accept:"text/*",onchange:p,...m})},Vs=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,span:c}=n.tags,u=n.state("No file selected"),d=Sn(e),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},b=({disabled:m})=>l({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return()=>s(d({Component:b,name:"file",accept:"text/*",onchange:p}),l("File selected: ",u))},Ws=`import classNames from "@grucloud/bau-css/classNames";
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
`,Ks={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Ws,createComponent:Vs}],gridItem:Cn},Xs=e=>{const t=H(e);return()=>t(Ks)};function $e(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...b]=X(s);return a({...p,class:T("form",u,c,l,r,t==null?void 0:t.class,p==null?void 0:p.class)},...b)}}function ft(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:b,...m},...h]=X(c);const f=V(e),x=me(e);return n.bind({deps:[b],render:()=>w=>f({...m,class:T("loadingButton",u,d,p,s,w&&"loading",t==null?void 0:t.class,m==null?void 0:m.class)},x({size:u,variant:d,color:p,visibility:w}),r({class:w&&"loading"},h))})}}const Zs=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:r,header:i,label:s,img:l,footer:c}=t.tags,u=ft(e),d=ke(e,{variant:"outline",color:"danger"}),p=de(e),b=$e(e,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:h=()=>{}}){const f=t.state(!1),x=t.state("");return b({onsubmit:async y=>{y.preventDefault();const{username:E,password:A}=Object.fromEntries(new FormData(y.target.closest("form")));try{f.val=!0;const I=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:E,password:A})});if(I.ok){const D=await I.json();h(D)}else I.status==401?x.val="Invalid username or password":x.val=I.statusText}catch(I){x.val=I.message}finally{f.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),r("Login to Grucloud")),a(()=>x.val&&d(x.val),s("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),s("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",variant:"solid",color:"primary",loading:f},"Login")))}},qs=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
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
            variant: "solid",
            color: "primary",
            loading: loadingState,
          },
          "Login"
        )
      )
    );
  };
};
`,Js=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:r,footer:i}=t.tags,s=$e(e),l=V(e,{variant:"solid",color:"primary"}),c=de(e);return function({onSubmitted:d=()=>{}}){return s({onsubmit:async b=>{b.preventDefault();const m=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(m)),d(m)}},a(o("Form with input")),n(r("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},Ys=`import form from "@grucloud/bau-ui/form";
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
`,Qs=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:r,footer:i,em:s,span:l}=t.tags,c=t.state(""),u=t.derive(()=>c.val!=="Delete"),d=$e(e),p=V(e,{variant:"solid",color:"primary"}),b=de(e);return function({onSubmitted:h=()=>{}}){return d({onsubmit:async x=>{x.preventDefault(),h()}},a(o("Delete Protection")),n(r(l("Type ",s("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:x=>c.val=x.target.value}))),i(p({type:"submit",disabled:u},"Delete")))}},ei=`import { Context } from "@grucloud/bau-ui/context";
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
`,ti={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Ys,createComponent:Js},{title:"Form with state",description:"A form with input state and a dervied state.",code:ei,createComponent:Qs},{title:"Login page",description:"A login page.",code:qs,createComponent:Zs}]},ni=e=>{const t=H(e);return()=>t(ti)},kn=(e,t={})=>{const n=de(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},oi=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=de(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ai=`import input from "@grucloud/bau-ui/input";
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
`,ri={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ai,createComponent:oi}],gridItem:kn},si=e=>{const t=H(e);return()=>t(ri)},En=(e,t={})=>{const n=ct(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},ii=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ct(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},ci=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,li={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:ci,createComponent:ii}],gridItem:En},ui=e=>{const t=H(e);return()=>t(li)};function An(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("keyValueList",r,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const di=e=>{const{bau:t}=e,{section:n,li:o,label:a,span:r}=t.tags,i=An(e);return()=>n(i(o(a("My label"),r("My Value")),o(a("My other label"),r("My Other Value"))))},pi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,mi=e=>{const{bau:t,css:n}=e,{section:o,li:a,label:r,span:i}=t.tags,s=An(e,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(s(a(r("My label"),i("My Value")),a(r("My other label"),i("My Other Value"))))},gi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,bi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:pi,createComponent:di},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:gi,createComponent:mi}]},hi=e=>{const t=H(e);return()=>t(bi)},fi="modulepreload",vi=function(e){return"/bau/bau-ui/"+e},Lt={},Tn=function(t,n,o){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=vi(r),r in Lt)return;Lt[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===r&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":fi,i||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>t())};function Dn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=me(e,{size:"lg"}),i=ke(e,{color:"danger"}),s=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},r({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=s,error:p=l,props:b={}}){const m=n.state(void 0),h=n.state(!0),f=n.state(!1);return u().then(x=>{m.val=x.default(e),h.val=!1}).catch(x=>{f.val=x.message}),a(()=>{if(f.val)return p({message:f.val});if(m.val)return m.val(b);if(h.val)return d()})}}const xi=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state(!1),a=Dn(e),r=V(e);return()=>n(r({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>Tn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},yi=`import { Context } from "@grucloud/bau-ui/context";
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
`,wi=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=t.state(!1),r=Dn(e,{loading:()=>o("My Custom Loading"),error:s=>o("My Custom Error")}),i=V(e);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&r({getModule:()=>Tn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Si=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ci={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:yi,createComponent:xi},{title:"Custom Loader",description:"Custom loader and error",code:Si,createComponent:wi}]},ki=e=>{const t=H(e);return()=>t(Ci)};function Mn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:r}=n.tags,i=()=>oe.map(c=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:b=t.color??"neutral",running:m,...h}]=X(u);return r({...h,role:"progressbar",class:{deps:[m],renderProp:()=>f=>T("linearProgress",d,b,l,f&&"running",t==null?void 0:t.class,h==null?void 0:h.class)}})}}const Bn=(e,t)=>{const n=Mn(e,t);return o=>n({...o,running:!0})},Ei=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=V(e),r=Mn(e),i=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,r({running:i}))},Ai=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Ti={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Ai,createComponent:Ei}],gridItem:Bn},Di=e=>{const t=H(e);return()=>t(Ti)},In=(e,t)=>{const n=ft(e,t);return o=>n({...o,loading:!0},"Save")},Mi=e=>{const{bau:t}=e,{section:n}=t.tags,o=ft(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Bi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Ii={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Bi,createComponent:Mi}],gridItem:In},Ni=e=>{const t=H(e);return()=>t(Ii)},$i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Li=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:r}=n.tags,i=ve(e,t),s=({code:l,label:c})=>r({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},$i.map(s))},Oi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Pi=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:r}=t.tags,i=ve(e),s=({code:l,label:c})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i({variant:"outline",color:"primary"},Oi.map(s)))},zi=`import list from "@grucloud/bau-ui/list";
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
`,Ri={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:zi,createComponent:Pi}],gridItem:Li},_i=e=>{const t=H(e);return()=>t(Ri)};function Nn(e,t={}){const{bau:n,css:o,window:a}=e,{dialog:r,div:i}=n.tags,l=o`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:b=t.color??"neutral",...m},...h]=X(u);const f=r({...m,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(m.id??"modal")&&f.showModal()},class:T("modal",l,b,p,d,t==null?void 0:t.class,m==null?void 0:m.class)},h);return new MutationObserver(w=>{const y=new URLSearchParams(a.location.search);w[0].attributeName=="open"&&(f.open?y.set("modal",f.id??"modal"):y.delete("modal"),a.history.pushState("","",`?${y.toString()}`))}).observe(f,{attributes:!0}),f}}const $n=(e,t={})=>{const{bau:n}=e,{form:o,section:a,main:r,header:i,footer:s,p:l,h1:c}=n.tags,u=V(e),d=Nn(e,t),p=()=>r(Array(20).fill("").map((m,h)=>l(h+1,". Some text here"))),b=m=>{const h=d({id:`dialog-${m.color}-${m.variant}-${t.size}`,...m},o(i(c("Header")),p(),s(u({variant:"outline",color:m.color,onclick:()=>{h.close()}},"Cancel"),u({variant:"solid",color:m.color,onclick:()=>{h.close()}},"OK"))));return h};return m=>{const h=b(m);return a(u({...m,onclick:()=>{h.showModal()}},"OPEN MODAL"),h)}},ji=e=>{const{bau:t}=e,{form:n,section:o,main:a,header:r,footer:i,p:s}=t.tags,l="neutral",c=V(e),u=Nn(e),d=()=>a(Array(10).fill("").map((b,m)=>s(m+1,". Some text here"))),p=u({id:"my-dialog"},n(r("Header"),d(),i(c({variant:"outline",color:l,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:l,onclick:()=>{p.close()}},"OK"))));return()=>o(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Hi=`import modal from "@grucloud/bau-ui/modal";
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
`,Ui={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Hi,createComponent:ji}],gridItem:$n},Gi=e=>{const t=H(e);return()=>t(Ui)},Fi=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Vi(e,t={}){const{bau:n,css:o}=e,{div:a,li:r,select:i}=n.tags,s=V(e),l=Ne(e),c=ve(e),u=qe(e,{color:"neutral",variant:"outline"}),d=o`
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
    ${Fi()}
  `;return function(...b){let[{size:m=t.size??"md",variant:h=t.variant??"outline",color:f=t.color??"neutral",name:x,label:w,Option:y,options:E,defaultValue:A=[],getOptionLabel:I,getOptionValue:D,renderValue:B,onSelect:O=()=>{},loading:L,...N},...j]=X(b);const _=me(e,{variant:h,color:f,size:m}),U=n.state(A),Z=n.state(!1),S=n.state(0),g=()=>{J.openDialog(),J.focus(),Z.val=!0},v=()=>{J.closeDialog(),Z.val=!1},C=()=>{Z.val=!1},k=F=>{J.open?v():g(),F.preventDefault()},P=()=>Array.from(ne.selectedOptions).map(({value:F})=>E.find(ee=>D(ee)==F)),z=F=>{switch(F.preventDefault(),F.key){case"Escape":v();break;case"ArrowDown":S.val<E.length-1?S.val++:S.val=0;break;case"ArrowUp":S.val<=0?S.val=E.length-1:S.val--;break;case"Enter":if(J.open){const ee=F.currentTarget.querySelectorAll("input")[S.val];ee.checked=!ee.checked;const re=ne.options[S.val+1];re.selected=!re.selected,U.val=P()}else g();break}},W=F=>ee=>{const re=[...ne.options].find(({value:ce})=>ce==D(F));ee.target.checked?re.selected=!0:re.selected=!1,U.val=P()},G=()=>c({tabindex:"0",class:T(f,h)},E.map((F,ee)=>r({class:()=>T(S.val==ee&&"active")},n.tags.label(u({checked:A.find(re=>D(re)==D(F)),name:`${x}-${D(F)}`,onchange:W(F)}),y(F))))),$=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":Z,"aria-label":w,onclick:k,color:f,variant:h,size:m,class:L==!0&&"loading",disabled:L},()=>U.val.length?B(U.val):w,()=>L==!0&&_({visibility:L})),J=l({triggerEl:$,contentEl:G(),onClose:C}),ne=i({name:x,multiple:!0,...N},n.tags.option({value:""},"--Category--"),E.map(F=>n.tags.option({value:D(F),selected:A.find(ee=>D(ee)==D(F))},I(F))));return a({...N,class:T("multiSelect",f,m,d,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:z},ne,$,J)}}const Wi=e=>{const{bau:t,css:n}=e,{div:o,span:a,form:r,footer:i}=t.tags,s=Vi(e),l=V(e,{variant:"outline",color:"neutral"}),c=Ie(e,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=b=>a(b.group),p=b=>{b.preventDefault();const{selectedOptions:m}=b.target.elements.myMultiSelect;var h=Array.from(m).map(({value:f})=>f);alert(JSON.stringify(h))};return()=>r({onsubmit:p,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},s({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},b.map(m=>c(m.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},Ki=`import { Context } from "@grucloud/bau-ui/context";
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
`,Xi=e=>{const{bau:t,css:n}=e,{select:o,option:a,form:r}=t.tags,i=V(e,{variant:"outline",color:"neutral"}),s=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:p})=>p);alert(JSON.stringify(d))};return()=>r({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},s.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},Zi=`import { Context } from "@grucloud/bau-ui/context";
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
`,qi={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Ki,createComponent:Wi},{title:"Native Multi Select",description:"A native multi select.",code:Zi,createComponent:Xi}]},Ji=e=>{const t=H(e);return()=>t(qi)},Yi=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:r}=t.tags,i=V(e),s=Ne(e),l=()=>i({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),r("My Content")),u=l(),d=s({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},Qi=`import popover from "@grucloud/bau-ui/popover";
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
`,ec={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Qi,createComponent:Yi}]},tc=e=>{const t=H(e);return()=>t(ec)};function nc(e,t={}){const{bau:n,css:o,config:a}=e,{div:r,a:i,span:s,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:p,label:b,href:m})=>i({href:`${a.base}${m}`},s({class:"sublabel"},d),r({class:`label ${d}`},b??p));return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",data:f={},...x}]=X(p);const{next:w,previous:y}=f;return l({"data-paginationnav":JSON.stringify(f),"aria-label":"pages navigation",...x,class:T("paginationNavigation",b,c,t==null?void 0:t.class,x==null?void 0:x.class)},(y==null?void 0:y.href)&&u({text:"Previous"})(y),(w==null?void 0:w.href)&&u({text:"Next"})(w))}}const oc=e=>{const{bau:t}=e,{section:n}=t.tags,o=nc(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},ac=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,rc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ac,createComponent:oc}]},sc=e=>{const t=H(e);return()=>t(rc)},ic=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=Ke(e,t);return r=>a({...r},o(`Paper ${t.size??""}`))},cc=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=Ke(e);return()=>n(a({size:"md"},o("My content")))},lc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,uc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:lc,createComponent:cc}],variantColorTableDisable:!0,gridItem:ic},dc=e=>{const t=H(e);return()=>t(uc)};function vt(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    cursor: pointer;
    margin: 0.5rem;
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>oe.map(s=>`
&.radio-button.${s} {
  accent-color: var(--color-${s});
}
  `).join(`
`))()}
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=X(l);return a({...p,type:"radio",class:T("radio-button",c,d,u,i,t==null?void 0:t.class,p==null?void 0:p.class)})}}const Ln=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:r}=n.tags,i=vt(e,t);return s=>r({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},pc=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,r=vt(e),i=t.state("one"),s=({target:l})=>i.val=l.id;return()=>a(n("One",r({id:"one",name:"radio",checked:!0,value:i,oninput:s})),n("Two",r({id:"two",name:"radio",value:i,oninput:s})),o("Choice: ",i))},mc=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,gc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:mc,createComponent:pc}],gridItem:Ln},bc=e=>{const t=H(e);return()=>t(gc)};function On(e,t={}){const{bau:n,css:o}=e,{div:a,label:r}=n.tags,i=vt(e),l=o`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    & label {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px dotted var(--color-emphasis-500);
      border-radius: var(--global-radius);
      padding: 0.4rem;
      cursor: pointer;
    }
    ${(()=>oe.map(c=>`
  `).join(`
`))()};
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"none",color:b=t.color??"neutral",name:m,oninput:h,value:f,radios:x=[],...w}]=X(u);return a({...w,class:T("radioButtonGroup",d,b,p,l,t==null?void 0:t.class,w==null?void 0:w.class)},x.map(({id:y,Label:E})=>r(i({size:d,variant:p,color:b,id:y,name:m,checked:f==y,value:y,oninput:h}),E())))}}const hc=e=>{const{bau:t}=e,{form:n,article:o,footer:a,p:r}=t.tags,i=On(e),s=V(e,{variant:"outline",color:"primary"}),l=t.state("two"),c=({target:d})=>l.val=d.id,u=d=>{d.preventDefault(),alert(l.val)};return()=>n({onsubmit:u},o(i({oninput:c,name:"myRadio",value:l.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),r("CheckedState: ",l)),a(s({type:"submit"},"Submit")))},fc=`import { Context } from "@grucloud/bau-ui/context";
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
`,vc=e=>{const{bau:t}=e,{form:n,article:o,footer:a}=t.tags,r=On(e),i=V(e,{variant:"outline",color:"primary"}),s=l=>{l.preventDefault();const c=l.target.closest("form"),u=Object.fromEntries(new FormData(c));alert(JSON.stringify(u))};return()=>n({onsubmit:s},o(r({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},xc=`import { Context } from "@grucloud/bau-ui/context";
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
`,yc={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:xc,createComponent:vc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:fc,createComponent:hc}]},wc=e=>{const t=H(e);return()=>t(yc)},Sc=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Le(e,t={}){const{bau:n,css:o}=e,{div:a,li:r,select:i,option:s}=n.tags,l=V(e),c=Ne(e),u=ve(e),d=o`
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
    ${Sc()}
  `;return function(...b){let[{size:m=t.size??"md",variant:h=t.variant??"outline",color:f=t.color??"neutral",label:x,Option:w,options:y,defaultOption:E,getOptionLabel:A,getOptionValue:I,onSelect:D=()=>{},loading:B,...O},...L]=X(b);const N=me(e,{variant:h,color:f,size:m}),j=n.state(E?A(E):x),_=n.state(!1),U=n.state(0),Z=()=>{W.openDialog(),W.focus(),_.val=!0},S=()=>{W.closeDialog(),_.val=!1},g=()=>{_.val=!1},v=$=>{W.open?S():Z(),$.preventDefault()},C=({option:$,index:J})=>ne=>{j.val=A($),G.value=I($),G.setCustomValidity(""),U.val=J,S(),D($),ne.preventDefault()},k=$=>{switch($.preventDefault(),$.key){case"Escape":S();break;case"ArrowDown":U.val<y.length-1?U.val++:U.val=0;break;case"ArrowUp":U.val<=0?U.val=y.length-1:U.val--;break;case"Enter":W.open?(j.val=A(y[U.val]),G.value=I(s),S()):Z();break}},P=()=>u({tabindex:"0",class:T(f,h)},y.map(($,J)=>r({class:()=>T(U.val==J&&"active"),onclick:C({option:$,index:J})},w($)))),z=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":_,"aria-label":x,onclick:v,color:f,variant:h,size:m,class:B==!0&&"loading",disabled:B},()=>!j.val&&x,j,()=>B==!0&&N({visibility:B})),W=c({triggerEl:z,contentEl:P(),onClose:g}),G=i(O,s({value:""},"--Select Category--"),y.map($=>s({value:I($)},A($))));return G.value=O.value,a({...O,class:T("select",f,m,d,t==null?void 0:t.class,O==null?void 0:O.class),onkeydown:k},G,z,W)}}const Pn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:r}=n.tags,i=Le(e,t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Cc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Le(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return()=>o(i({options:s,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Select a country..."}))},kc=`import select from "@grucloud/bau-ui/select";
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
`,Ec=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Le(e),s="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(u.label),r(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==s),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},Ac=`import select from "@grucloud/bau-ui/select";
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
`,Tc=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Le(e),r=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n({},s);return()=>o(a({options:r,Option:i,label:"Select a region",getOptionValue:s=>s,getOptionLabel:s=>s}))},Dc=`import select from "@grucloud/bau-ui/select";
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
`,Mc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=V(e,{variant:"outline"}),s=Le(e),l=t.state([]),c=t.state(!1),u=t.state("");async function d({url:m,transform:h=f=>f}){try{c.val=!0;const f=await fetch(m,{});if(f.ok){const x=await f.json();l.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,f)=>h.name.common.localeCompare(f.name.common))});p();const b=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(m.flag),r(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>s({options:l.val,Option:b,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},Bc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ic={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:kc,createComponent:Cc},{title:"Default Option",description:"Select with a default option",code:Ac,createComponent:Ec},{title:"Select AWS region",description:"Select the AWS region",code:Dc,createComponent:Tc},{title:"Loading Indicator",description:"Select with a loading indicator",code:Bc,createComponent:Mc}],gridItem:Pn},Nc=e=>{const t=H(e);return()=>t(Ic)};function zn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,r=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("select-native",u,l,c,r,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Rn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=zn(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,r.map(({label:s,phone:l})=>o({value:l},s)))},$c=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=zn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(r.map(({label:i,phone:s})=>o({value:s},i))))},Lc=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,Oc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Lc,createComponent:$c}],gridItem:Rn},Pc=e=>{const t=H(e);return()=>t(Oc)},zc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,r=Ce(e),i=()=>a({class:n`
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
          `})));return()=>o(i())},Rc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,_c=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,r=Ce(e),i=()=>a({class:n`
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
            `}))));return()=>o(i())},jc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Hc=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:r,tr:i,td:s}=t.tags,l=Ce(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(r(new Array(8).fill("").map(()=>i(s(l({class:n`
                  width: 5rem;
                `})),s(l()),s(l()),s(l()),s(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},Uc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Gc=e=>{const{bau:t,css:n}=e,{section:o,header:a,span:r,article:i}=t.tags,s=n`
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
    `}),c=Ce(e);function u({columnsSize:d=4}){return o({class:s},a(new Array(d).fill("").map(()=>l(r("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Fc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Vc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Rc,createComponent:zc},{title:"List",description:"A list skeleton.",code:jc,createComponent:_c},{title:"Table",description:"A table skeleton.",code:Uc,createComponent:Hc},{title:"Tabs",description:"A tabs skeleton.",code:Fc,createComponent:Gc}],variantColorTableDisable:!0,variantSizeDisable:!0},Wc=e=>{const t=H(e);return()=>t(Vc)};function Je(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    ${(()=>oe.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...b]=X(l);return a({...p,type:"range",class:T("slider",d,u,c,i,t==null?void 0:t.class,p.class)},...b)}}const _n=e=>{const{bau:t}=e,n=t.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=Je(e);return r=>a({...r,oninput:o})},Kc=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:r}=t.tags,i=t.state(0),s=c=>{i.val=c==null?void 0:c.target.value},l=Je(e);return()=>n(o(a("Slider with step, min and max",r,l({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},Xc=`import slider from "@grucloud/bau-ui/slider";
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
`,Zc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:i,br:s,option:l}=t.tags,c=t.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Je(e);return()=>o(a(r({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>l({value:Number(p),label:p})))))},qc=`import slider from "@grucloud/bau-ui/slider";
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
`,Jc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:i,br:s,option:l}=t.tags,c=t.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Je(e);return()=>o(a({class:n`
            display: flex;
          `},r({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>l({value:Number(p),label:p})))))},Yc=`import slider from "@grucloud/bau-ui/slider";
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
`,Qc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Xc,createComponent:Kc},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:qc,createComponent:Zc},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Yc,createComponent:Jc}],gridItem:_n},el=e=>{const t=H(e);return()=>t(Qc)},jn=(e,t)=>{const n=me(e,t);return o=>n({...o})},tl=e=>{const{bau:t}=e,{section:n}=t.tags,o=V(e),a=me(e,{size:"lg"}),r=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),a({visibility:r}))},nl=`import spinner from "@grucloud/bau-ui/spinner";
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
`,ol={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:nl,createComponent:tl}],gridItem:jn},al=e=>{const t=H(e);return()=>t(ol)},rl=()=>oe.map(e=>"").join(`
`),Hn=(e,t)=>(n,o)=>{const a=new URLSearchParams(e.window.location.search);return a.delete(t),a.append(t,n),o&&Object.entries(o).map(([r,i])=>(a.delete(r),a.append(r,i))),`?${a.toString()}`};function Un(e,t={}){const{bau:n,css:o,window:a}=e,{div:r,ul:i,li:s,span:l,section:c}=n.tags,u=o`
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
    ${rl()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...p){let[{color:b,variant:m="plain",size:h,stepperDefs:f=[],stepperName:x,activeStepIndex:w=n.state(0),...y},...E]=X(p);const A=n.state(f.map((N,j)=>({...N,index:j}))),I=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(N,j,_)=>{N.apply(j,_);const U=_[2]??"";console.log("stepper pushState ",U),["?","#"].includes(U[0])&&L()}});const D=n.derive(()=>A.val[w.val]),B=N=>{const{Header:j,disabled:_,name:U,index:Z}=N;return s({class:()=>T(D.val.name==U&&"active",w.val<Z&&"not-completed",w.val>Z&&"completed",_&&"disabled")},l({class:"step-number"},Z+1),l({class:"step-label"},()=>j(N)))},O=N=>f.findIndex(({name:j})=>j==N.name),L=()=>{const j=new URLSearchParams(a.location.search).get(x)??f[0].name,_=Math.max(f.findIndex(({name:U})=>U==j),0);_<w.val&&(console.log("remove last step"),I.val.pop()),I.val.some(({name:U})=>j==U)||(console.log("add new step"),I.val.push(f[_])),w.val=_};return L(),r({bauMounted:({element:N})=>{a.addEventListener("popstate",L)},bauUnmounted:()=>{a.removeEventListener("popstate",L)},class:T("stepper",m,h,b,u,t==null?void 0:t.class,y.class)},n.loop(A,i(),B),n.loop(I,c(),N=>r({class:()=>T("content",N.name==D.val.name&&"visible")},N.Content({nextStep:f[O(N)+1],previousStep:f[O(N)-1]}))))}}const Ot="my-wizard",sl=e=>{const{bau:t,window:n}=e,{footer:o,p:a,label:r,section:i,a:s,ul:l,li:c}=t.tags,u=de(e),d=$e(e),p=Un(e),b=Hn(e,Ot),m=V(e,{variant:"outline",color:"primary"}),h=V(e,{variant:"solid",color:"primary"}),f=({nextStep:y})=>E=>{E.preventDefault();const{organization:A}=E.target.elements;n.history.pushState("","",b(y.name,{organization:A.value}))},x=y=>{var D;y.preventDefault();const{organization:E}=(D=n.document.forms)==null?void 0:D.formStep1.elements,I=new URLSearchParams(n.location.search).get("choice");alert(`organization ${E.value}, choice:${I}`)},w=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:y})=>d({onsubmit:f({nextStep:y}),id:"formStep1"},r("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:y,previousStep:E})=>d(l(c(s({href:b(y.name,{choice:"choice1"})},"Choice 1")),c(s({href:b(y.name,{choice:"choice2"})},"Choice 2"))),o(m({href:b(E.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:y})=>d({onsubmit:x},a("My stepper 3 Content"),o(m({href:b(y.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>i(p({stepperDefs:w,stepperName:Ot}))},il=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,Pt="stepper-vertical",cl=e=>{const{bau:t,window:n,css:o}=e,{footer:a,p:r,label:i,section:s,a:l,ul:c,li:u}=t.tags,d=de(e),p=$e(e),b=Un(e,{class:o`
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
    `}),m=Hn(e,Pt),h=V(e,{variant:"outline",color:"primary"}),f=V(e,{variant:"solid",color:"primary"}),x=({nextStep:E})=>A=>{A.preventDefault();const{organization:I}=A.target.elements;n.history.pushState("","",m(E.name,{organization:I.value}))},w=E=>{var B;E.preventDefault();const{organization:A}=(B=n.document.forms)==null?void 0:B.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${A.value}, choice:${D}`)},y=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:E})=>p({onsubmit:x({nextStep:E}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:E,previousStep:A})=>p(c(u(l({href:m(E.name,{choice:"choice1"})},"Choice 1")),u(l({href:m(E.name,{choice:"choice2"})},"Choice 2"))),a(h({href:m(A.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:E})=>p({onsubmit:w},r("My stepper 3 Content"),a(h({href:m(E.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>s(b({stepperDefs:y,stepperName:Pt}))},ll=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ul={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:il,createComponent:sl},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:ll,createComponent:cl}]},dl=e=>{const t=H(e);return()=>t(ul)},pl=()=>oe.map(e=>`
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
`);function Gn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
    ${pl()}
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=X(s);return a({...d,class:T("switch",r,u,c,l,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Fn=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:r}=n.tags,i=Gn(e,t);return s=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},r("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),r("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ml=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r}=t.tags,i=Gn(e);return()=>o(a(r({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",i({variant:"outline",id:"my-shinny-switch"}))))},gl=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,bl={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:gl,createComponent:ml}],gridItem:Fn},hl=e=>{const t=H(e);return()=>t(bl)},fl=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Oe(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:r}=t,{div:i,ul:s,li:l,a:c}=n.tags,u=o`
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
    ${fl()}
  `;return function(...p){let[{size:b=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",tabsKey:f="tabs",...x},...w]=X(p);const y=n.state(r),E=L=>y.val.find(N=>N.name==L),A=n.state(r[0]),I=()=>{var _,U;const N=new URLSearchParams(a.location.search).get(f)??r[0].name,j=E(N);(_=A.val.exit)==null||_.call(),A.val=j,(U=j==null?void 0:j.enter)==null||U.call()};I(),a.history.pushState=new Proxy(a.history.pushState,{apply:(L,N,j)=>{L.apply(N,j);const _=j[2]??"";["?","#"].includes(_[0])&&I()}});const D=L=>{const N=new URLSearchParams(a.location.search);return N.delete(f),N.append(f,L),`?${N.toString()}`},B=L=>{const{Header:N,disabled:j,name:_}=L;return l({class:()=>T(A.val.name==_&&"active",j&&"disabled")},c({href:D(_)},N(L)))},O=i({class:T("tabs",m,b,h,u,t==null?void 0:t.class,x.class),bauMounted:({element:L})=>{a.addEventListener("popstate",I)},bauUnmounted:()=>{a.removeEventListener("popstate",I)}},n.loop(y,s(),B),n.bind({deps:[A],render:()=>({Content:L})=>L?L(x):""}));return O.addEventListener("tab.add",L=>{var j;const{tab:N}=L.detail;(j=N.enter)==null||j.call(),y.val.push(N)},!1),O.addEventListener("tab.remove",L=>{var j;const N=y.val.findIndex(_=>_.name==L.detail.tabName);N>0&&((j=y.val[N].exit)==null||j.call(),y.val.splice(N,1))},!1),O}}const vl=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Oe(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>r({})},xl=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,yl=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Oe(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>r({tabsKey:"my-tab"})},wl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Vn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Sl=e=>{const{css:t}=e,n=Oe(e,{tabDefs:Vn(e),class:t`
      flex-direction: column-reverse;
    `});return()=>n({})},Cl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,kl=e=>{const{css:t}=e,n=Vn(e),o=Oe(e,{tabDefs:n,class:t`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},El=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Al={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:xl,createComponent:vl},{title:"Extended Tabs",description:"An extended tabs.",code:wl,createComponent:yl},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Cl,createComponent:Sl},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:El,createComponent:kl}]},Tl=e=>{const t=H(e);return()=>t(Al)};function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r}=n.tags;a`
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
  `;return function(...l){let[{...c},...u]=X(l);return r({...c,class:T("table-container",i,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Dl=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=t.tags;function d(f,x,w,y,E){return{name:f,calories:x,fat:w,carbs:y,protein:E}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],b=({name:f,calories:x})=>i(r(f),r({class:n`
            text-align: right;
          `},x)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Pe(e,{class:n`
      max-width: 650px;
    `});return()=>o(h(s(u("Basic Table"),m(),c(p.map(b)))))},Ml=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ae(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Bl=[Ae("Frozen yoghurt",159,6,24,4),Ae("Ice cream sandwich",237,9,37,4.3),Ae("Eclair",262,16,24,6),Ae("Cupcake",305,3.7,67,4.3),Ae("Gingerbread",356,16,49,3.9)],Il=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=t.tags,d=({name:m,calories:h})=>i(r(m),r({class:n`
            text-align: right;
          `},h)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Pe(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(s(u("Table Dense"),p(),c(Bl.map(d)))))},Nl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Te(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const $l=[Te("Frozen yoghurt",159,6,24,4),Te("Ice cream sandwich",237,9,37,4.3),Te("Eclair",262,16,24,6),Te("Cupcake",305,3.7,67,4.3),Te("Gingerbread",356,16,49,3.9)],Ll=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=t.tags,d=({name:m,calories:h})=>i(r(m),r({class:n`
            text-align: right;
          `},h)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=Pe(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(s(u("Table Zebra"),p(),c($l.map(d)))))},Ol=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Pl={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Ml,createComponent:Dl},{title:"Dense",description:"A dense table.",code:Nl,createComponent:Il},{title:"Zebra",description:"A zebra table.",code:Ol,createComponent:Ll}]},zl=e=>{const t=H(e);return()=>t(Pl)},Rl=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:r,section:i,article:s}=t.tags,l=on(e),c=s({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),r({id:"h3-1-1"},"h3 1 1"),r({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),r({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},_l=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,jl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:_l,createComponent:Rl}]},Hl=e=>{const t=H(e);return()=>t(jl)};function Wn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=ht(e),i=V(e),s=me(e),l=o`
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
  `,c=({label:m,icon:h,...f})=>i({"aria-label":m,title:m,...f},h),u=({count:m,totalCount:h,page:f,rowsPerPage:x})=>a({class:"pages-numbers"},Number(f-1)*Number(x)+(m>0?1:0),"-",Math.min(f*x,h)," of ",h),d=({count:m,page:h,rowsPerPage:f})=>a({class:"pages-numbers"},(h-1)*f+(m>0?1:0),"-",h*f),p=m=>m<=1,b=(m,h,f)=>m>=Math.ceil(h/f);return function(...h){let[{size:f=t.size??"md",variant:x=t.variant??"outline",color:w=t.color??"neutral",count:y=0,totalCount:E=0,page:A=1,rowsPerPage:I=50,onPageChange:D,isLoading:B=!1,disableFirst:O=()=>p(A),disablePrevious:L=()=>p(A),disableNext:N=()=>b(A,E,I),disableLast:j=()=>b(A,E,I),..._},...U]=X(h);const Z=Math.max(0,Math.ceil(E/I)),S=D({page:1}),g=D({page:A-1}),v=D({page:A+1}),C=D({page:Z}),k=[{label:"First",icon:"⟪",onclick:S,disabled:O()},{label:"Previous",icon:"⟨",onclick:g,disabled:L()},{label:"Next",icon:"⟩",onclick:v,disabled:N()},{label:"Last",icon:"⟫",onclick:C,disabled:j()}];return a({..._,class:T("table-pagination",l,B&&"disabled",t==null?void 0:t.class,_==null?void 0:_.class)},s({class:"spinner",visibility:B,size:"md"}),E>0?u({count:y,totalCount:E,page:A,maxPages:Z,rowsPerPage:I}):d({count:y,page:A,maxPages:Z,rowsPerPage:I}),r({variant:x,color:w},k.map(P=>c({...P,variant:x,color:w}))))}}const Ul=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Gl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:i,thead:s,tbody:l}=t.tags,c=Ul(45),u=({name:w,email:y})=>r(a(w),a(y)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Wn(e),b=Pe(e,{class:n`
      max-width: 650px;
    `}),m=t.state(c),h=t.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),f=t.derive(()=>m.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),x=({page:w})=>y=>{h.val.page=w};return()=>b(i(d(),()=>l(f.val.map(u))),()=>p({...h.val,onPageChange:x}))},Fl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:i,thead:s,tbody:l,div:c}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),b=t.derive(()=>d.val.length),m=t.state(1),h=t.state(10),f=t.derive(()=>d.val),x=O=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(O).toString()}`,w=({page:O})=>L=>{m.val=O,y(x({page:O,per_page:h.val}))};y(x({page:1,per_page:h.val}));async function y(O){try{u.val=!0;const L=await fetch(O,{});if(L.ok){const N=await L.json();d.val=N;return}throw L}catch(L){p.val=L.message}finally{u.val=!1}}const E=({name:O,description:L,stargazers_count:N})=>r(a(O),a(L),a({class:n`
            text-align: right;
          `},N)),A=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),I=Wn(e),D=Pe(e,{class:n`
      min-width: 650px;
    `}),B=({message:O})=>c(O);return()=>D(()=>I({rowsPerPage:h.val,page:m.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:w,disableNext:()=>!1}),i(A(),()=>p.val&&B({message:p.val}),()=>l(f.val.map(E))))},Vl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:r,h2:i,tr:s}=t.tags,l=Gl(e),c=Fl(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(s("Table Pagination")),r("Asynchronous Pagination"),u(c()),r("Simple Pagination"),u(l()))};function ze(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:r}=n.tags;a`
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:b,onChange:m,...h},...f]=X(l);return r({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>x=>x},class:{deps:[p],renderProp:()=>x=>T("toggle",c,d,u,i,x&&"selected",t==null?void 0:t.class,h==null?void 0:h.class)},disabled:b},f)}}const Kn=(e,t)=>{const{bau:n}=e,o=ze(e,t);return a=>{const r=n.state(!1);return o({...a,selected:r,onclick:()=>r.val=!r.val},"Toggle Me")}},Wl=e=>{const{bau:t}=e,{section:n}=t.tags,o=ze(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Kl=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Xl={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Kl,createComponent:Wl}],gridItem:Kn},Zl=e=>{const t=H(e);return()=>t(Xl)},ql=()=>oe.map(e=>`
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
`);function xt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
    ${ql()}
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...b},...m]=X(s);const h=new Set,f=x=>{const{value:w}=x.target;d?(h.clear(),h.add(w)):h.has(w)?h.delete(w):h.add(w),p({event:x,values:[...h]})};return a({...b,class:T("toggle-group",l,u,c,r,t==null?void 0:t.class,b==null?void 0:b.class),onclick:f},...m)}}const Xn=(e,t)=>{const{bau:n}=e,o=xt(e,t),a=ze(e,t);return r=>{const i=n.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...r,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:u})=>()=>a({...r,value:u,selected:i.val.includes(u),"area-label":c},c)))}},Jl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],r=ze(e),i=xt(e),s="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:s,variant:l,exclusive:!0,onChange:c},a.map(({label:u,value:d})=>()=>r({color:s,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},Yl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,Ql=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],r=ze(e),i=xt(e),s="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:s,variant:l,onChange:c},a.map(({label:u,value:d})=>()=>r({color:s,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},eu=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,tu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:Yl,createComponent:Jl},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:eu,createComponent:Ql}],gridItem:Xn},nu=e=>{const t=H(e);return()=>t(tu)};function yt(e,t={}){const{bau:n,css:o,window:a}=e,{div:r}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:b=t.color??"neutral",...m},...h]=X(l);const f=r({class:T("container",...u.split("-"))},r({class:T("content",b,p,d),role:"tooltip"},c)),x=D=>`move-to-${D}`,w=(D,B,O)=>{if(D()){const L=x(B);f.classList.add(L),f.classList.add(B),f.classList.remove(O)}},y=(D,B)=>{const O=x(D);f.classList.contains(O)&&(f.classList.remove(O),f.classList.add(B),f.classList.remove(D))},E=D=>{const B=f.getBoundingClientRect();w(()=>B.x<0,"right","left"),w(()=>B.x+B.width>a.innerWidth,"left","right"),w(()=>B.y<0,"bottom","top"),w(()=>B.bottom>a.innerHeight,"top","bottom"),f.classList.add("visible")},A=D=>{f.classList.remove("visible"),y("right","left"),y("left","right"),y("bottom","top"),y("top","bottom")};return r({...m,class:T("tooltip",i,t==null?void 0:t.class,m==null?void 0:m.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",E),D.addEventListener("mouseout",A)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",E),D.removeEventListener("mouseout",A)}},...h,f)}}const Zn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:r}=n.tags,i=V(e),s=yt(e,t),l=()=>o(a("A ",r("tooltip")," can be any component"));return c=>s({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},ou=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,r=V(e),i=yt(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:s()},r("tooltip"))},au=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ru=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r,section:i}=t.tags,s=Ie(e,{variant:"outline",color:"primary"}),l=yt(e),c=()=>o(a("A ",r("tooltip")," can be any component")),u=()=>i({class:n`
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
          `},l({side:"bottom-start",titleEl:c()},s("bottom start")),l({side:"bottom-centered",titleEl:c()},s("bottom centered")),l({side:"bottom-end",titleEl:c()},s("bottom end"))));return()=>u()},su=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,iu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:au,createComponent:ou},{title:"Grid",description:"Various tooltip position",code:su,createComponent:ru}],gridItem:Zn},cu=e=>{const t=H(e);return()=>t(iu)},qn=(e,t)=>{const n=st(e,t);return o=>n(o)},lu=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return()=>n(o({}))},uu=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,du={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:uu,createComponent:lu}],gridItem:qn},pu=e=>{const t=H(e);return()=>t(du)},mu=({css:e,createGlobalStyles:t})=>(t`
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
  `});function Jn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:r}=t,{ul:i,li:s,nav:l,div:c}=n.tags,u=mu({css:o,createGlobalStyles:a}),d=mt(e),p=({depth:b=1,maxDepth:m,color:h,variant:f,size:x})=>w=>{const{children:y,expanded:E}=w,A=n.state(!E),I=()=>c({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:B=>{y&&(A.val=!A.val)}},r(w.data)),D=()=>i({class:T(h,x)},y.map(p({depth:b+1,maxDepth:m})));return s(d({size:x,Header:I,Content:y&&b<m&&D}))};return function({tree:m,maxDepth:h=1/0,size:f=t.size??"md",variant:x=t.variant??"outline",color:w=t.color??"neutral",...y}){return l({class:T(u.nav,f,x,w,t==null?void 0:t.class,y.class)},m.children&&i(m.children.map(p({maxDepth:h,color:w,variant:x,size:f}))))}}const Yn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Jn(e,{renderMenuItem:({name:s,href:l})=>o({href:l},s),...t});return s=>i({...s,tree:a})},gu=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=Jn(e,{renderMenuItem:({name:i,href:s})=>n({href:s},i)});return()=>r({tree:o})},bu=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,hu={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:bu,createComponent:gu}],gridItem:Yn},fu=e=>{const t=H(e);return()=>t(hu)},vu=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=Oe(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...t});return s=>i(s)},xu=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:r,p:i,ul:s,li:l}=t.tags,c=an(e),u=V(e),d=[{name:"Accordion",Item:rn(e)},{name:"Alert",Item:cn(e)},{name:"Autocomplete",Item:un(e)},{name:"Avatar",Item:ln(e)},{name:"Badge",Item:pn(e)},{name:"Breadcrumbs",Item:mn(e)},{name:"Button",Item:gn(e)},{name:"Button Group",Item:bn(e)},{name:"Calendar",Item:fn(e)},{name:"Checkbox",Item:xn(e)},{name:"Chip",Item:vn(e)},{name:"DrillDown Menu",Item:wn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:Cn(e)},{name:"Input",Item:kn(e)},{name:"Input Search",Item:En(e)},{name:"Linear Progress",Item:Bn(e)},{name:"Loading Button",Item:In(e)},{name:"Modal",Item:$n(e)},{name:"Radio Button",Item:Ln(e)},{name:"Select",Item:Pn(e)},{name:"Select Native",Item:Rn(e)},{name:"Slider",Item:_n(e)},{name:"Spinner",Item:jn(e)},{name:"Switch",Item:Fn(e)},{name:"Tabs",Item:vu(e)},{name:"Theme Switch",Item:qn(e)},{name:"Toggle",Item:Kn(e)},{name:"Toggle Group",Item:Xn(e)},{name:"Tooltip",Item:Zn(e)},{name:"Tree View",Item:Yn(e)}];return()=>o({class:n`
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
            `},c(p))))},yu=({context:e})=>{const t=xu(e);return[{path:"",action:n=>({title:"Bau UI",component:Ro(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ua(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ya(e)})},{path:"alert",action:()=>({title:"Alert",component:sr(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:dr(e)})},{path:"animate",action:()=>({title:"Animate",component:fr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:$r(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Cr(e)})},{path:"badge",action:()=>({title:"Badge",component:zr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Gr(e)})},{path:"button",action:()=>({title:"Button",component:Zr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:es(e)})},{path:"calendar",action:()=>({title:"Calendar",component:as(e)})},{path:"carousel",action:()=>({title:"Carousel",component:us(e)})},{path:"chip",action:()=>({title:"Chip",component:gs(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ys(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ks(e)})},{path:"divider",action:()=>({title:"Divider",component:Ms(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Ls(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:js(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Fs(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Xs(e)})},{path:"form",action:()=>({title:"Form",component:ni(e)})},{path:"input",action:()=>({title:"Input",component:si(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:ui(e)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:hi(e)})},{path:"lazy",action:()=>({title:"Lazy",component:ki(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Di(e)})},{path:"list",action:()=>({title:"List",component:_i(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Ni(e)})},{path:"modal",action:()=>({title:"Modal",component:Gi(e)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:Ji(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:sc(e)})},{path:"paper",action:()=>({title:"Paper",component:dc(e)})},{path:"popover",action:()=>({title:"Popover",component:tc(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:bc(e)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:wc(e)})},{path:"select",action:()=>({title:"Select",component:Nc(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:Pc(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Wc(e)})},{path:"slider",action:()=>({title:"Slider",component:el(e)})},{path:"spinner",action:()=>({title:"Spinner",component:al(e)})},{path:"stepper",action:()=>({title:"Stepper",component:dl(e)})},{path:"switch",action:()=>({title:"Switch",component:hl(e)})},{path:"table",action:()=>({title:"Table",component:zl(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:Hl(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Vl(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Tl(e)})},{path:"toggle",action:()=>({title:"Toggle",component:Zl(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:nu(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:cu(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:pu(e)})},{path:"treeView",action:()=>({title:"Tree View",component:fu(e)})}]},{path:"pages",action:n=>({title:"Pages",component:Ho(e)})}]},wu=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Su=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=e,i=a.state(),s=t({componentState:i});return document.getElementById("app").replaceChildren(s),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:b=t}=c.resolve({pathname:u});i.val=p({}),document.title=`${d}`}},Cu=e=>{const{createGlobalStyles:t}=e;t`
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
      padding:1rem 0;
    }
  `};ho();const Qn={title:"Bau",base:"/bau/bau-ui"},he=ko({config:Qn}),{bau:ku}=he;he.states={drawerOpen:ku.state(!0)};Cu(he);ro({routes:yu({context:he}),onLocationChange:Su({context:he,LayoutDefault:Lo(he),config:Qn}),notFoundRoute:wu(he)});
