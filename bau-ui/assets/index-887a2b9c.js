(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const no=(e,t)=>({...e,paths:[...t,e.path]}),Rt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=no(o,e);return n?[a,...Rt({paths:[...e,o.path],routes:n})]:a}),oo=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},ao=({routes:e=[],notFoundRoute:t})=>{const n=Rt({routes:e}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function ro({routes:e,notFoundRoute:t,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},r=ao({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:r}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,s,l)=>{i.apply(s,l),o.pathname!=window.location.pathname&&n({router:r}),a(window.location)}}),document.addEventListener("click",i=>{const{target:s}=i,l=s.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:r}),r}const at=[["neutral",{h:"0",s:"0%",l:"10%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],co=e=>`var(--color-${e})`,lo=e=>`var(--color-${e}-lightest)`,uo=()=>at.map(([e])=>`
.outline.${e} {
  border: 1px solid var(--color-emphasis-600);
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${lo(e)};
}
.solid.${e} {
  background-color: ${co(e)};
}
`).join(`
`),po=()=>at.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),mo=e=>100-e*10,go=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${mo(t)}%);`).join(`
`),kt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),bo=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...so.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...io.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ho({createGlobalStyles:e},{colorPalette:t=at}={}){e`
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
      ${t.map(([n,o])=>bo([n,o])).join(`
`)}
      ${go()}
      ${kt({})}
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
      --brightness-hover-reverse: 70% ${kt({dark:!0})};
    }
  `}function fo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let rt=e=>Object.prototype.toString.call(e??0).slice(8,-1),vo=e=>rt(e)=="Object",Et=e=>rt(e)=="Function",tt=e=>["Object","Array"].includes(rt(e)),Tt=Object.getPrototypeOf,nt=e=>we(e)?e.val:e,we=e=>e==null?void 0:e.__isState,xo=["splice","push","pop","shift","unshift","sort","reverse"],Ge=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const K=e=>!we(e[0])&&vo(e[0])?e:[{},...e];function yo(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,r=new Set,i=!1,s,l=w=>n.createElement(w),c=(w,h,v)=>{let k=s;s=h;let E=w(v);return s=k,E},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(w=>{w.bindings=w.bindings.filter(h=>{var v;return(v=h.element)==null?void 0:v.isConnected}),!w.bindings.length&&!w.computed&&a.delete(w)}),o=void 0}))},d=(w,h,v,k,E,j)=>{var z;if(i){r.add(w);return}for(let V of w.bindings){let{deps:J,element:I,renderInferred:q,render:ne,renderItem:Z}=V;if(Z&&h)(z=m(I,k,(...Y)=>b(Z(...Y)),v,E,j)[h])==null||z.call();else{let Y=q?q({element:I}):ne({element:I,renderItem:Z})(...J.map(nt));Y!==I&&I.replaceWith(V.element=b(Y))}}S(w),u()},p=(w,h,v=[])=>({get(k,E,j){var z;if(s==null||s.add(w),E==="_isProxy")return!0;if(!((z=k[E])!=null&&z._isProxy)&&!we(k[E])&&tt(k[E]))k[E]=new Proxy(k[E],p(w,h,[...v,E]));else if(xo.includes(E)){let V=k[E];return(...J)=>{let I=V.apply(k,J);return d(w,E,I,J,h,v),I}}return Reflect.get(k,E,j)},set(k,E,j,z){let V=Reflect.set(k,E,j,z);return d(w,"setItem",V,{prop:E,value:j},h,[...v,E]),V}}),g=(w,h)=>new Proxy(h,p(w,h)),m=(w,h,v,k,E,j)=>{let z=()=>w.replaceChildren(...Ge(k,v)),V=J=>w[J]&&w.removeChild(w[J]);return{assign:z,sort:z,reverse:z,setItem:()=>{var I;let J=j[0];(I=w.children[J])==null||I.replaceWith(v(E[J],J))},push:()=>w.append(...Ge(h,(J,I)=>v(J,E.length+I))),unshift:()=>w.prepend(...Ge(h,v)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:J}=w.children;let[I,q=J,...ne]=h;for(let Z=I>=0?Math.min(I+q-1,J-1):J-1;Z>=(I>=0?I:J+I);Z--)w.children[Z].remove();if(ne.length){let Z=ne.forEach((Y,re)=>v(Y,I+re));w.children[I]?w.children[I].after(...Z):w.append(...Z)}}}},f=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let h=this;return s==null||s.add(h),h.valProxy??(h.valProxy=tt(w)?g(h,w):w,h.valProxy)},set val(h){let v=this,k=v.val;tt(h)?(v.valProxy=g(v,h),d(v,"assign",h)):h!==k&&(v.valProxy=h,d(v)),v.oldVal=k}}),b=w=>{if(w==null||w===!1){const h=l("span");return h.style.display="none",h}else return w.nodeType?w:n.createTextNode(w)},y=(w,h)=>{let v=new Set;return h.val=c(w,v),v},x=w=>{let h=f(),v=y(w,h);h.computed=!0;for(let k of v)k.listeners.push({computed:w,deps:v,state:h});return h},S=w=>{for(let h of[...w.listeners])y(h.computed,h.state)},C=(w,...h)=>{if(h.length){let v=[];for(let k of h.flat(1/0))k!=null&&v.push(we(k)?_({deps:[k],render:()=>E=>E}):Et(k)?H({renderInferred:k}):b(k));w.append(...v)}},T={},A=(w,h)=>w&&(Object.getOwnPropertyDescriptor(w,h)??A(Tt(w),h)),M=(w,h,v)=>{var k;return T[w+","+h]??(T[w+","+h]=((k=A(v,h))==null?void 0:k.set)??0)},D=(w,h)=>new t.MutationObserver((v,k)=>{v.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(j=>j===w&&(h({element:w}),k.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),L=(w,h)=>new t.MutationObserver((v,k)=>v.forEach(E=>h({record:E,element:w}))).observe(w,{childList:!0}),O=w=>new Proxy(function(v,...k){var V;let[E,...j]=K(k),z=w?n.createElementNS(w,v):l(v);for(let[J,I]of Object.entries(E)){if(J.startsWith("bau"))continue;let q=M(v,J,Tt(z))?ne=>ne!==void 0&&(z[J]=ne):ne=>z.setAttribute(J,ne);I==null||(we(I)?_({deps:[I],render:()=>()=>(q(I.val),z)}):Et(I)&&(!J.startsWith("on")||I.isDerived)?H({renderInferred:()=>(q(I({element:z})),z)}):I.renderProp?_({deps:I.deps,render:()=>()=>(q(I.renderProp({element:z})(...I.deps.map(nt))),z)}):q(I))}return E.bauChildMutated&&L(z,E.bauChildMutated),C(z,...j),z.autofocus&&z.focus&&t.requestAnimationFrame(()=>z.focus()),(V=E.bauCreated)==null||V.call(E,{element:z}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:z})),E.bauUnmounted&&t.requestAnimationFrame(()=>D(z,E.bauUnmounted)),z},{get:(h,v)=>h.bind(void 0,v)}),$=(w,h,v)=>{w.element=b(v);for(let k of h)we(k)&&(a.add(k),k.bindings.push(w));return w.element},H=({renderInferred:w,element:h})=>{let v=new Set,k=c(w,v,{element:h});return $({renderInferred:w},v,k)},_=({deps:w,element:h,render:v,renderItem:k})=>$({deps:w,render:v,renderItem:k},w,v({element:h,renderItem:k})(...w.map(nt))),F=(w,h,v)=>_({deps:[w],render:({renderItem:k})=>E=>(h.append(...Ge(E,k)),h),renderItem:v}),P=async w=>{i=!0;const h=await w();return i=!1,r.forEach(d),r.clear(),h};return{tags:O(),tagsNS:O,state:f,bind:_,loop:F,derive:x,stateSet:a,batch:P}}const wo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},So=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Co=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function ko(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...r)=>{const i=Co(a,r),s=wo(i);return!t.getElementById(s)&&So(t,e==null?void 0:e.target,s,o(s,i)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Eo(e){const t=yo(),n=ko();return ho(n),{bau:t,...n,tr:o=>o,window,...e}}function B(...e){return e.filter(t=>t).join(" ")}function We(e,t={}){const{bau:n,window:o}=e,{div:a}=n.tags,r=()=>{};return function({animationHide:s=r,animationShow:l=r,...c},u){return a({class:B("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(g=>{if(!s()||g.getAttribute("cloned"))return;const m=g.cloneNode(!0);o.requestAnimationFrame(()=>{m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=g.getAttribute("width"),m.style.height=g.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),d.target.appendChild(m),m.addEventListener("animationend",()=>{var f;return(f=m.parentNode)==null?void 0:f.removeChild(m)})})}),[...d.addedNodes].forEach(g=>{g.getAttribute("cloned")||o.requestAnimationFrame(()=>{p.style.position="relative";const m=g.getBoundingClientRect();if(g.setAttribute("width",m.width+"px"),g.setAttribute("height",m.height+"px"),l()){g.style.animation=l();const f=()=>{g.removeEventListener("animationend",f),g.style.animation=""};g.addEventListener("animationend",f)}})})},...c},u)}}const oe=["neutral","primary","success","danger","warning"],To=["plain","outline","solid"],Ao=["sm","md","lg"],Do=()=>oe.map(e=>`
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
`);function G(e,t={}){const{bau:n,css:o}=e,a=o`
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
  `;return function(...i){let[{size:s=t.size??"md",variant:l=t.variant??"none",color:c=t.color??"none",href:u,...d},...p]=K(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:B("button",t.class,l,s,c,a,d.class),href:u},p)}}const Mo="light",Bo=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function st(e,t={}){const{bau:n,css:o,window:a}=e,{input:r}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},s=()=>{try{return localStorage.getItem("theme")}catch{}},l=s();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Mo);const c=o`
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
    ${Bo()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:m=t.color??"neutral",...f},...b]=K(d);return r({required:"required",title:"Switch Theme",...f,class:B("theme-switch",m,g,p,c,t==null?void 0:t.class,f.class),type:"checkbox",checked:s()=="dark",onclick:y=>{i(y.target.checked?"dark":"light")}},...b)}}function Io(e){const{tr:t,bau:n,css:o,config:a,states:r}=e,{i,header:s,h1:l,div:c,a:u,img:d,b:p,ul:g,li:m}=n.tags,{svg:f,path:b}=n.tagsNS("http://www.w3.org/2000/svg"),y=r.drawerOpen,x=G(e,{class:o`
      background: transparent;
    `}),S=st(e),C=()=>i(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},b({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),T=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},x({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},C()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),A=()=>c({class:o`
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
        `},T(),A())}}function No({tr:e,bau:t,css:n}){const{section:o,footer:a,span:r,a:i,ul:s,li:l,p:c,div:u,h1:d}=t.tags,p=({links:f,title:b})=>o({class:n`
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
        `},d(b),s(f.map(({href:y,name:x})=>l(i({href:y},x))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],m=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},r("v0.71.0"),r("MIT license")))}}function ve(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("list",r,u,c,l,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const He="0.3s",_t=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,r={...a};return r.children=o==null?void 0:o.map(_t({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},jt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=jt(e)(t.children[o]);if(a)return a}},$o=({keyframes:e})=>({hideToLeft:e`
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
   `});function it(e,t={}){const{bau:n,css:o,window:a,config:r}=e,{base:i="",hashBased:s=!1}=t,l=`${r.base}${i}`,c=P=>{var w;return((w=P.parentTree.data)==null?void 0:w.href)??P.parentTree.children[0].data.href},u=({variant:P,color:w,size:h,currentTree:v,data:k})=>S(M({variant:P,color:w,size:h,href:`${l}${c(v)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),M({variant:P,color:w,size:h,href:`${l}${k.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},k.name)),d=({size:P,subTree:{data:{name:w,href:h},children:v=[]}})=>M({size:P,href:`${l}${h}`,"data-ischild":!v.length},w),p=({pathname:P,subTree:w})=>{var h;return P===((h=w==null?void 0:w.data)==null?void 0:h.href)},{renderHeader:g=u,renderMenuItem:m=d,isActive:f=p}=t,{li:b,nav:y,div:x,header:S,a:C}=n.tags,T=We(e),A=ve(e),M=G(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:D,hideToRight:L}=$o(e),O=o`
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
  `,$=({children:P,pathnameState:w,variant:h,color:v,size:k})=>A({class:B(h,v,k)},P.map(E=>b({class:()=>B(E.children&&"has-children",f({pathname:w.val,subTree:E})&&"active")},m({variant:h,color:v,size:k,subTree:E})))),H=({variant:P,color:w,size:h,currentTree:v,pathnameState:k})=>{const{children:E,parentTree:j,data:z,renderList:V}=v;return x({class:B("drillDownMenu",P,w,h)},j&&g({variant:P,color:w,size:h,data:z,currentTree:v}),E&&V?V({renderListDefault:$,children:E,pathnameState:k,variant:P,color:w,size:h}):$({children:E,pathnameState:k,variant:P,color:w,size:h}))},_=({tree:P,pathname:w})=>{let h=_t({})({...P}),v=jt(w)(h);return v||(v=h),v},F=({target:P})=>{let h=P.closest("a").getAttribute("href").replace(l,"");return s||(h=h.replace(P.hash,"")),h};return function(w){const{size:h=t.size??"md",variant:v=t.variant??"plain",color:k=t.color??"neutral",tree:E,...j}=w,z=n.state(a.location.pathname.replace(l,""));let V=_({tree:E,pathname:z.val});const J=n.state(JSON.stringify(V.data));let I;a.document.addEventListener("click",Y=>{const{target:re}=Y,ce=re.closest("a");if(!ce)return;const le=ce.getAttribute("href");le&&!le.startsWith("http")&&!le.startsWith("#")&&!le.startsWith("?")&&(V=_({tree:E,pathname:F(Y)}),J.val=JSON.stringify(V.data),z.val=F({target:re}))});const q=Y=>{const{buttonback:re,ischild:ce}=Y.target.dataset;re=="true"?I=-1:ce=="false"?I=1:ce=="true"&&(I=0)},ne=Y=>{switch(Y){case 1:return`${D} ${He}`;case-1:return`${L} ${He}`;default:return""}},Z=Y=>{switch(Y){case 1:return`${L} ${He} reverse`;case-1:return`${D} ${He} reverse`;default:return""}};return y({class:B(O,v,k,h,t==null?void 0:t.class,j.class),onclick:q},T({animationHide:()=>ne(I),animationShow:()=>Z(I)},n.bind({deps:[J],render:()=>()=>H({variant:v,color:k,size:h,currentTree:V,pathnameState:z})})))}}const Lo=()=>oe.map(e=>`
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
`);function pe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(s){const{variant:l=t.variant??"outline",color:c=t.color??"neutral",...u}=s;return a({type:"text",...u,class:B("input",t.class,t.size??"md",c,l,r,u.class)})}}function ct(e,t={}){const{bau:n,css:o,window:a}=e,r=pe(e,t);return function(s){const{variant:l=t.variant??"outline",color:c=t.color??"neutral",...u}=s,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,g=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return r({type:"search",...u,color:c,variant:l,class:B("inputSearch",t.class,g,u.class)})}}function Gt(e){const{tr:t,bau:n,css:o,config:a,states:r,window:i}=e,{div:s,ul:l,li:c,nav:u,a:d,span:p}=n.tags,g=ct(e,{variant:"plain",color:"neutral",size:"sm"}),f={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:x,children:S,pathnameState:C,variant:T,color:A,size:M})=>{const D=n.state(""),L=n.derive(()=>D.val==""?S:S.filter($=>$.data.name.match(new RegExp(`${D.val}`,"i")))),O=$=>{D.val=$.target.value};return s({class:o`
          display: flex;
          flex-direction: column;
        `},g({autocomplete:!1,name:"search",autofocus:!0,value:D,placeholder:`Search ${L.val.length} components`,size:22,oninput:O}),()=>x({children:L.val,pathnameState:C,variant:T,color:A,size:M}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let b=!1;const y=it(e);return function(){return s({bauMounted:({element:S})=>{i.innerWidth<=640&&(b=!0,r.drawerOpen.val=!1)},onclick:S=>{b&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:B(o`
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
          `)},y({tree:f}))}}const Oo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:r}=t.tags,i=We(e),s=Io(e),l=Gt(e),c=No(e),u=a`
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
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),c())}};function Ne(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...g]=K(s);return a({...p,onclick:d,class:B("chip",t.class,l,c,u,d&&"clickable",r,p.class)},...g)}}function Po(e){const{bau:t,css:n,config:o}=e,{div:a,h1:r,h2:i,p:s}=t.tags;G(e);const l=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:l},r(u),i(d),s(p))}}function zo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:r}=t.tags,i=n`
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
  `,s=({title:l,Content:c})=>o({className:"feature"},a(l),r(c()));return function({featuresContent:c}){return o({class:i},c.map(s))}}function Ro({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:r,dd:i,div:s,aside:l,footer:c,a:u}=t.tags,d=({maxSize:p=151})=>({libName:g,size:m})=>s({class:n`
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
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function _o(e){const{bau:t,css:n,config:o}=e,{div:a,p:r,a:i,section:s}=t.tags,l=Po(e),c=zo(e),u=G(e);Ne(e);const d=Ro(e),p=(...y)=>a({class:n`
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
          `},...y)),g=n``,m=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[r("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[r("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]}],b=()=>s({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:f}),d({data:m}),b())}}function jo(e,t={}){const{bau:n,css:o}=e,{div:a,form:r,span:i,pre:s,h3:l,h4:c}=n.tags;return function(d,...p){return a("Login")}}const Go=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:r,h2:i}=n.tags,s=jo(e);return()=>o({id:"login"},i(t("Login Examples")),r("Basic"),a(s()))};function Ho(e){const{tr:t,bau:n,css:o}=e,{div:a,article:r,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(t("Pages Examples")),Go(e)()))}}function Uo(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ht(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ht(n)}),e}class At{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ut(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function me(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Fo="</span>",Dt=e=>!!e.scope,Vo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Wo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ut(t)}openNode(t){if(!Dt(t))return;const n=Vo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Dt(t)&&(this.buffer+=Fo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Mt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class lt{constructor(){this.rootNode=Mt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Mt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{lt._collapse(n)}))}}class Ko extends lt{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Wo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Be(e){return e?typeof e=="string"?e:e.source:null}function Ft(e){return xe("(?=",e,")")}function Jo(e){return xe("(?:",e,")*")}function Xo(e){return xe("(?:",e,")?")}function xe(...e){return e.map(n=>Be(n)).join("")}function qo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function ut(...e){return"("+(qo(e).capture?"":"?:")+e.map(o=>Be(o)).join("|")+")"}function Vt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Zo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function dt(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let r=Be(o),i="";for(;r.length>0;){const s=Yo.exec(r);if(!s){i+=r;break}i+=r.substring(0,s.index),r=r.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?i+="\\"+String(Number(s[1])+a):(i+=s[0],s[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(t)}const Qo=/\b\B/,Wt="[a-zA-Z]\\w*",pt="[a-zA-Z_]\\w*",Kt="\\b\\d+(\\.\\d+)?",Jt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Xt="\\b(0b[01]+)",ea="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ta=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=xe(t,/.*\b/,e.binary,/\b.*/)),me({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ie={begin:"\\\\[\\s\\S]",relevance:0},na={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ie]},oa={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ie]},aa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ke=function(e,t,n={}){const o=me({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ut("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xe(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ra=Ke("//","$"),sa=Ke("/\\*","\\*/"),ia=Ke("#","$"),ca={scope:"number",begin:Kt,relevance:0},la={scope:"number",begin:Jt,relevance:0},ua={scope:"number",begin:Xt,relevance:0},da={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ie,{begin:/\[/,end:/\]/,relevance:0,contains:[Ie]}]}]},pa={scope:"title",begin:Wt,relevance:0},ma={scope:"title",begin:pt,relevance:0},ga={begin:"\\.\\s*"+pt,relevance:0},ba=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ue=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Qo,IDENT_RE:Wt,UNDERSCORE_IDENT_RE:pt,NUMBER_RE:Kt,C_NUMBER_RE:Jt,BINARY_NUMBER_RE:Xt,RE_STARTERS_RE:ea,SHEBANG:ta,BACKSLASH_ESCAPE:Ie,APOS_STRING_MODE:na,QUOTE_STRING_MODE:oa,PHRASAL_WORDS_MODE:aa,COMMENT:Ke,C_LINE_COMMENT_MODE:ra,C_BLOCK_COMMENT_MODE:sa,HASH_COMMENT_MODE:ia,NUMBER_MODE:ca,C_NUMBER_MODE:la,BINARY_NUMBER_MODE:ua,REGEXP_MODE:da,TITLE_MODE:pa,UNDERSCORE_TITLE_MODE:ma,METHOD_GUARD:ga,END_SAME_AS_BEGIN:ba});function ha(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function fa(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function va(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=ha,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function xa(e,t){Array.isArray(e.illegal)&&(e.illegal=ut(...e.illegal))}function ya(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function wa(e,t){e.relevance===void 0&&(e.relevance=1)}const Sa=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=xe(n.beforeMatch,Ft(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ca=["of","and","for","in","not","or","if","then","parent","list","value"],ka="keyword";function qt(e,t,n=ka){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(r){Object.assign(o,qt(e[r],t,r))}),o;function a(r,i){t&&(i=i.map(s=>s.toLowerCase())),i.forEach(function(s){const l=s.split("|");o[l[0]]=[r,Ea(l[0],l[1])]})}}function Ea(e,t){return t?Number(t):Ta(e)?0:1}function Ta(e){return Ca.includes(e.toLowerCase())}const Bt={},fe=e=>{console.error(e)},It=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ye=(e,t)=>{Bt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Bt[`${e}/${t}`]=!0)},Ve=new Error;function Zt(e,t,{key:n}){let o=0;const a=e[n],r={},i={};for(let s=1;s<=t.length;s++)i[s+o]=a[s],r[s+o]=!0,o+=Vt(t[s-1]);e[n]=i,e[n]._emit=r,e[n]._multi=!0}function Aa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ve;if(typeof e.beginScope!="object"||e.beginScope===null)throw fe("beginScope must be object"),Ve;Zt(e,e.begin,{key:"beginScope"}),e.begin=dt(e.begin,{joinWith:""})}}function Da(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ve;if(typeof e.endScope!="object"||e.endScope===null)throw fe("endScope must be object"),Ve;Zt(e,e.end,{key:"endScope"}),e.end=dt(e.end,{joinWith:""})}}function Ma(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ba(e){Ma(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Aa(e),Da(e)}function Ia(e){function t(i,s){return new RegExp(Be(i),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=Vt(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(l=>l[1]);this.matcherRe=t(dt(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(s);if(!l)return null;const c=l.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const l=new n;return this.rules.slice(s).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(s);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(s)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const s=new o;return i.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&s.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&s.addRule(i.illegal,{type:"illegal"}),s}function r(i,s){const l=i;if(i.isCompiled)return l;[fa,ya,Ba,Sa].forEach(u=>u(i,s)),e.compilerExtensions.forEach(u=>u(i,s)),i.__beforeBegin=null,[va,xa,wa].forEach(u=>u(i,s)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=qt(i.keywords,e.case_insensitive)),l.keywordPatternRe=t(c,!0),s&&(i.begin||(i.begin=/\B|\b/),l.beginRe=t(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=t(l.end)),l.terminatorEnd=Be(l.end)||"",i.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(l.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Na(u==="self"?i:u)})),i.contains.forEach(function(u){r(u,l)}),i.starts&&r(i.starts,s),l.matcher=a(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=me(e.classNameAliases||{}),r(e)}function Yt(e){return e?e.endsWithParent||Yt(e.starts):!1}function Na(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return me(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Yt(e)?me(e,{starts:e.starts?me(e.starts):null}):Object.isFrozen(e)?me(e):e}var $a="11.8.0";class La extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ot=Ut,Nt=me,$t=Symbol("nomatch"),Oa=7,Qt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Ko};function l(h){return s.noHighlightRe.test(h)}function c(h){let v=h.className+" ";v+=h.parentNode?h.parentNode.className:"";const k=s.languageDetectRe.exec(v);if(k){const E=L(k[1]);return E||(It(r.replace("{}",k[1])),It("Falling back to no-highlight mode for this block.",h)),E?k[1]:"no-highlight"}return v.split(/\s+/).find(E=>l(E)||L(E))}function u(h,v,k){let E="",j="";typeof v=="object"?(E=h,k=v.ignoreIllegals,j=v.language):(ye("10.7.0","highlight(lang, code, ...args) has been deprecated."),ye("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),j=h,E=v),k===void 0&&(k=!0);const z={code:E,language:j};P("before:highlight",z);const V=z.result?z.result:d(z.language,z.code,k);return V.code=z.code,P("after:highlight",V),V}function d(h,v,k,E){const j=Object.create(null);function z(N,R){return N.keywords[R]}function V(){if(!W.keywords){se.addText(te);return}let N=0;W.keywordPatternRe.lastIndex=0;let R=W.keywordPatternRe.exec(te),X="";for(;R;){X+=te.substring(N,R.index);const ee=ae.case_insensitive?R[0].toLowerCase():R[0],ie=z(W,ee);if(ie){const[de,eo]=ie;if(se.addText(X),X="",j[ee]=(j[ee]||0)+1,j[ee]<=Oa&&(je+=eo),de.startsWith("_"))X+=R[0];else{const to=ae.classNameAliases[de]||de;q(R[0],to)}}else X+=R[0];N=W.keywordPatternRe.lastIndex,R=W.keywordPatternRe.exec(te)}X+=te.substring(N),se.addText(X)}function J(){if(te==="")return;let N=null;if(typeof W.subLanguage=="string"){if(!t[W.subLanguage]){se.addText(te);return}N=d(W.subLanguage,te,!0,Ct[W.subLanguage]),Ct[W.subLanguage]=N._top}else N=g(te,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(je+=N.relevance),se.__addSublanguage(N._emitter,N.language)}function I(){W.subLanguage!=null?J():V(),te=""}function q(N,R){N!==""&&(se.startScope(R),se.addText(N),se.endScope())}function ne(N,R){let X=1;const ee=R.length-1;for(;X<=ee;){if(!N._emit[X]){X++;continue}const ie=ae.classNameAliases[N[X]]||N[X],de=R[X];ie?q(de,ie):(te=de,V(),te=""),X++}}function Z(N,R){return N.scope&&typeof N.scope=="string"&&se.openNode(ae.classNameAliases[N.scope]||N.scope),N.beginScope&&(N.beginScope._wrap?(q(te,ae.classNameAliases[N.beginScope._wrap]||N.beginScope._wrap),te=""):N.beginScope._multi&&(ne(N.beginScope,R),te="")),W=Object.create(N,{parent:{value:W}}),W}function Y(N,R,X){let ee=Zo(N.endRe,X);if(ee){if(N["on:end"]){const ie=new At(N);N["on:end"](R,ie),ie.isMatchIgnored&&(ee=!1)}if(ee){for(;N.endsParent&&N.parent;)N=N.parent;return N}}if(N.endsWithParent)return Y(N.parent,R,X)}function re(N){return W.matcher.regexIndex===0?(te+=N[0],1):(et=!0,0)}function ce(N){const R=N[0],X=N.rule,ee=new At(X),ie=[X.__beforeBegin,X["on:begin"]];for(const de of ie)if(de&&(de(N,ee),ee.isMatchIgnored))return re(R);return X.skip?te+=R:(X.excludeBegin&&(te+=R),I(),!X.returnBegin&&!X.excludeBegin&&(te=R)),Z(X,N),X.returnBegin?0:R.length}function le(N){const R=N[0],X=v.substring(N.index),ee=Y(W,N,X);if(!ee)return $t;const ie=W;W.endScope&&W.endScope._wrap?(I(),q(R,W.endScope._wrap)):W.endScope&&W.endScope._multi?(I(),ne(W.endScope,N)):ie.skip?te+=R:(ie.returnEnd||ie.excludeEnd||(te+=R),I(),ie.excludeEnd&&(te=R));do W.scope&&se.closeNode(),!W.skip&&!W.subLanguage&&(je+=W.relevance),W=W.parent;while(W!==ee.parent);return ee.starts&&Z(ee.starts,N),ie.returnEnd?0:R.length}function Te(){const N=[];for(let R=W;R!==ae;R=R.parent)R.scope&&N.unshift(R.scope);N.forEach(R=>se.openNode(R))}let ue={};function Q(N,R){const X=R&&R[0];if(te+=N,X==null)return I(),0;if(ue.type==="begin"&&R.type==="end"&&ue.index===R.index&&X===""){if(te+=v.slice(R.index,R.index+1),!a){const ee=new Error(`0 width match regex (${h})`);throw ee.languageName=h,ee.badRule=ue.rule,ee}return 1}if(ue=R,R.type==="begin")return ce(R);if(R.type==="illegal"&&!k){const ee=new Error('Illegal lexeme "'+X+'" for mode "'+(W.scope||"<unnamed>")+'"');throw ee.mode=W,ee}else if(R.type==="end"){const ee=le(R);if(ee!==$t)return ee}if(R.type==="illegal"&&X==="")return 1;if(Qe>1e5&&Qe>R.index*3)throw new Error("potential infinite loop, way more iterations than matches");return te+=X,X.length}const ae=L(h);if(!ae)throw fe(r.replace("{}",h)),new Error('Unknown language: "'+h+'"');const _e=Ia(ae);let Ye="",W=E||_e;const Ct={},se=new s.__emitter(s);Te();let te="",je=0,be=0,Qe=0,et=!1;try{if(ae.__emitTokens)ae.__emitTokens(v,se);else{for(W.matcher.considerAll();;){Qe++,et?et=!1:W.matcher.considerAll(),W.matcher.lastIndex=be;const N=W.matcher.exec(v);if(!N)break;const R=v.substring(be,N.index),X=Q(R,N);be=N.index+X}Q(v.substring(be))}return se.finalize(),Ye=se.toHTML(),{language:h,value:Ye,relevance:je,illegal:!1,_emitter:se,_top:W}}catch(N){if(N.message&&N.message.includes("Illegal"))return{language:h,value:ot(v),illegal:!0,relevance:0,_illegalBy:{message:N.message,index:be,context:v.slice(be-100,be+100),mode:N.mode,resultSoFar:Ye},_emitter:se};if(a)return{language:h,value:ot(v),illegal:!1,relevance:0,errorRaised:N,_emitter:se,_top:W};throw N}}function p(h){const v={value:ot(h),illegal:!1,relevance:0,_top:i,_emitter:new s.__emitter(s)};return v._emitter.addText(h),v}function g(h,v){v=v||s.languages||Object.keys(t);const k=p(h),E=v.filter(L).filter($).map(I=>d(I,h,!1));E.unshift(k);const j=E.sort((I,q)=>{if(I.relevance!==q.relevance)return q.relevance-I.relevance;if(I.language&&q.language){if(L(I.language).supersetOf===q.language)return 1;if(L(q.language).supersetOf===I.language)return-1}return 0}),[z,V]=j,J=z;return J.secondBest=V,J}function m(h,v,k){const E=v&&n[v]||k;h.classList.add("hljs"),h.classList.add(`language-${E}`)}function f(h){let v=null;const k=c(h);if(l(k))return;if(P("before:highlightElement",{el:h,language:k}),h.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(h)),s.throwUnescapedHTML))throw new La("One of your code blocks includes unescaped HTML.",h.innerHTML);v=h;const E=v.textContent,j=k?u(E,{language:k,ignoreIllegals:!0}):g(E);h.innerHTML=j.value,m(h,k,j.language),h.result={language:j.language,re:j.relevance,relevance:j.relevance},j.secondBest&&(h.secondBest={language:j.secondBest.language,relevance:j.secondBest.relevance}),P("after:highlightElement",{el:h,result:j,text:E})}function b(h){s=Nt(s,h)}const y=()=>{C(),ye("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){C(),ye("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function C(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(s.cssSelector).forEach(f)}function T(){S&&C()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function A(h,v){let k=null;try{k=v(e)}catch(E){if(fe("Language definition for '{}' could not be registered.".replace("{}",h)),a)fe(E);else throw E;k=i}k.name||(k.name=h),t[h]=k,k.rawDefinition=v.bind(null,e),k.aliases&&O(k.aliases,{languageName:h})}function M(h){delete t[h];for(const v of Object.keys(n))n[v]===h&&delete n[v]}function D(){return Object.keys(t)}function L(h){return h=(h||"").toLowerCase(),t[h]||t[n[h]]}function O(h,{languageName:v}){typeof h=="string"&&(h=[h]),h.forEach(k=>{n[k.toLowerCase()]=v})}function $(h){const v=L(h);return v&&!v.disableAutodetect}function H(h){h["before:highlightBlock"]&&!h["before:highlightElement"]&&(h["before:highlightElement"]=v=>{h["before:highlightBlock"](Object.assign({block:v.el},v))}),h["after:highlightBlock"]&&!h["after:highlightElement"]&&(h["after:highlightElement"]=v=>{h["after:highlightBlock"](Object.assign({block:v.el},v))})}function _(h){H(h),o.push(h)}function F(h){const v=o.indexOf(h);v!==-1&&o.splice(v,1)}function P(h,v){const k=h;o.forEach(function(E){E[k]&&E[k](v)})}function w(h){return ye("10.7.0","highlightBlock will be removed entirely in v12.0"),ye("10.7.0","Please use highlightElement now."),f(h)}Object.assign(e,{highlight:u,highlightAuto:g,highlightAll:C,highlightElement:f,highlightBlock:w,configure:b,initHighlighting:y,initHighlightingOnLoad:x,registerLanguage:A,unregisterLanguage:M,listLanguages:D,getLanguage:L,registerAliases:O,autoDetection:$,inherit:Nt,addPlugin:_,removePlugin:F}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=$a,e.regex={concat:xe,lookahead:Ft,either:ut,optional:Xo,anyNumberOfTimes:Jo};for(const h in Ue)typeof Ue[h]=="object"&&Ht(Ue[h]);return Object.assign(e,Ue),e},Se=Qt({});Se.newInstance=()=>Qt({});var Pa=Se;Se.HighlightJS=Se;Se.default=Se;const Me=Uo(Pa),Lt="[A-Za-z$_][0-9A-Za-z$_]*",za=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Ra=["true","false","null","undefined","NaN","Infinity"],en=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],tn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],_a=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ja=[].concat(nn,en,tn);function on(e){const t=e.regex,n=(v,{after:k})=>{const E="</"+v[0].slice(1);return v.input.indexOf(E,k)!==-1},o=Lt,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,k)=>{const E=v[0].length+v.index,j=v.input[E];if(j==="<"||j===","){k.ignoreMatch();return}j===">"&&(n(v,{after:E})||k.ignoreMatch());let z;const V=v.input.substring(E);if(z=V.match(/^\s*=/)){k.ignoreMatch();return}if((z=V.match(/^\s+extends\s+/))&&z.index===0){k.ignoreMatch();return}}},s={$pattern:Lt,keyword:za,literal:Ra,built_in:ja,"variable.language":_a},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},m={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},b={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},x={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,m,f,b,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(S)});const C=[].concat(x,p.contains),T=C.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(C)}]),A={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T},M={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},D={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...en,...tn]}},L={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[A],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function H(v){return t.concat("(?!",v.join("|"),")")}const _={match:t.concat(/\b/,H([...nn,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},P={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},A]},w="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",h={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(w)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[A]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:D},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),L,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,m,f,b,x,{match:/\$\d+/},d,D,{className:"attr",begin:o+t.lookahead(":"),relevance:0},h,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,e.REGEXP_MODE,{className:"function",begin:w,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[A,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[A]},_,$,M,P,{match:/\$[(.]/}]}}function Ga(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ha=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Me.registerLanguage("javascript",on),Me.registerLanguage("sh",Ga),function({text:i,language:s="js"}){const l=a({class:`hljs language-${s}`});return l.innerHTML=Me.highlight(i,{language:s}).value,o({class:n`
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
)`}),r("Most components accepts the ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",s({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),r("Further reading:",l(c(s({href:"components"},"Visit the component gallery")),c(s({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function mt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("paper",l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function an(e,t={}){const{bau:n,css:o,window:a}=e,{nav:r,ul:i,li:s,a:l}=n.tags,{headerSelector:c="h2,h3"}=t,u=n.state("no"),d=(b,y)=>{let x=null;return(...S)=>{a.clearTimeout(x),x=a.setTimeout(()=>b(...S),y)}},p=o`
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
  `,g=({value:b,id:y,children:x=[]})=>{const S=l({class:()=>u.val==y?"active":"",href:`#${y}`});return S.innerHTML=b,s({class:()=>u.val==y?"active":""},S,x.length>0&&i(x.map(g)))},m=b=>b.tagName.charAt(1),f=({contentEl:b})=>{const y=b.querySelectorAll(c);let x=2,S={},C={children:[]},T=C;const A=T;let M=[T];return[...y].forEach(D=>{const L=m(D);D.setAttribute("id",D.textContent),!D.innerHTML.includes("<button")&&(S={value:D.innerHTML,id:D.id??D.textContent,children:[]},x==L?(C=S,T.children.push(C)):x<L?(M.push(T),T=C,C.children.push(S),C=S):x>L&&(T=M[L-1],M=M.slice(0,L-1),T.children.push(S),C=S),x=L)}),A};return function(...y){let[{size:x=t.size??"md",variant:S=t.variant??"plain",color:C=t.color??"neutral",contentEl:T,...A}]=K(y);const M=f({contentEl:T}),D=d(()=>{const O=[...T.querySelectorAll(c)].find($=>{const{top:H,height:_}=$.getBoundingClientRect();if(H+_>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return r({...A,class:B("tableOfContent",x,S,C,p,t==null?void 0:t.class,A==null?void 0:A.class),bauMounted:()=>{a.addEventListener("scroll",D)},bauUnmounted:()=>{a.removeEventListener("scroll",D)}},M.children&&i(M.children.map(g)))}}const rn=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:r,tr:i,td:s,thead:l,th:c}=t.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(l(i(c(p??""),oe.map(g=>c(g)))),r(To.map(g=>i(c(g),oe.map((m,f)=>s(d({color:m,variant:g},{index:f}))))))))}},Fa=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:r}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Ao.map((i,s)=>r(e,{size:i})({color:"success",variant:"outline"},{size:i,index:s})))}},U=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:r,h1:i,p:s,h2:l,h3:c,pre:u,code:d}=t.tags;Me.registerLanguage("javascript",on);const p=an(e),g=mt(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),m=rn(e),f=Fa(e),b=({text:y})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:x})=>{x.innerHTML=Me.highlight(y,{language:"js"}).value}}));return function(x){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(x.title),s(x.description),x.gridItem&&!x.variantColorTableDisable&&[l("Variant/Color"),g(m({Item:x.gridItem(e)}))],x.gridItem&&!x.variantSizeDisable&&[l("Size"),s("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),g(f({item:x.gridItem}))],l("Usage"),c("Import"),b({text:x.importStatement}),l("Examples"),x.examples.map(C=>r(c(C.title),s(C.description),g(C.createComponent(e)({})),b({text:C.code}))));return o({class:n`
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
        `},S,p({contentEl:S}))}};function gt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?s(c):l(c))};function s(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",Header:m,Content:f,expanded:b=!1,...y}]=K(u);const x=n.state(!b);return a({...y,class:B("collapsible",d,r,t==null?void 0:t.class,y==null?void 0:y.class)},a({class:()=>B("header",f?x.val?"close":"open":""),onclick:S=>{x.val=!x.val,S.stopPropagation()}},m()),a({class:"content",role:"region",bauMounted:({element:S})=>{x.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(i({element:S,closeState:x}),!x.val)},f&&f()))}}const Va=()=>oe.map(e=>`
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
`);function Je(e,t={}){const{bau:n,css:o}=e,{div:a,ul:r,li:i,h3:s,button:l}=n.tags,c=o`
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
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"plain",color:m=t.color??"neutral",data:f=[],...b}]=K(d);const y=n.state(""),x=gt(e,{size:p,variant:g,color:m}),S=T=>A=>{y.val==T?y.val="":y.val=T},C=T=>{const{Header:A,Content:M,name:D}=T,L=()=>s({class:()=>B(y.val==D&&"active")},l({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:$})=>y.val==D},A(T))),O=()=>a({id:`bau-${D}`,"data-state":({element:$})=>y.val==D},M(T));return i({class:B(m,g,p),onclick:S(D)},x({Header:L,Content:O}))};return a({class:B("accordion",c,t==null?void 0:t.class,b.class)},r(f.map(C)))}}const sn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Je(e,t);return s=>i({...s,data:r})},Wa=e=>{const{bau:t}=e,{div:n,p:o,section:a}=t.tags,r=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Je(e);return()=>a(i({data:r,color:"neutral",variant:"outline"}))},Ka=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,cn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ja=e=>{const{css:t}=e,n=cn(e),o=Je(e);return()=>o({color:"warning",data:n,class:t`
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
`,qa=e=>{const{css:t}=e,n=cn(e),o=Je(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Za=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Ka,createComponent:Wa},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Xa,createComponent:Ja},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:qa}],gridItem:sn},Qa=e=>{const t=U(e);return()=>t(Ya)},er={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},tr=()=>oe.map(e=>`
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
    ${tr()}
  `,s=G(e),l=({onclick:c})=>s({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",onRemove:m,...f},...b]=K(u);return a({...f,class:B("alert",`alert-${p}`,t.class,p,g,d,i,f.class),role:"alert"},r({class:"icon"},er[g]),a({class:"content"},...b),m&&l({onclick:m}))}}const ln=(e,t)=>{const n=ke(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},nr=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=ke(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},or=`import alert from "@grucloud/bau-ui/alert";
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
`,ar=e=>{const{css:t}=e,n=ke(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},rr=`import alert from "@grucloud/bau-ui/alert";
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
`,sr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:or,createComponent:nr},{title:"Custom Alert ",description:"A custom alert.",code:rr,createComponent:ar}],gridItem:ln},ir=e=>{const t=U(e);return()=>t(sr)},cr=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:r=10,deleteAfterDuration:i=15e3}=t,{div:s}=n.tags,l=n.state([]),c={inserting:a`
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
    `},d=({id:p,status:g})=>{const m=l.val.findIndex(f=>f.id===p);m!=-1&&(l.val[m].status=g)};return function(g={},...m){const f=({id:x})=>{d({id:x,status:"removing"});const S=l.val.findIndex(C=>C.id===x);S!=-1&&l.val.splice(S,1)},b=({Component:x})=>{const S={id:Math.random().toString(10).split(".")[1],Component:x,status:"inserting"};l.val.length>=r&&f({id:l.val[0].id}),l.val.push(S),setTimeout(()=>f(S),i)},y=x=>s({class:u.item,onclick:()=>f(x)},x.Component());return document.addEventListener("alert.add",x=>b(x.detail)),document.addEventListener("alert.remove",x=>f(x.detail)),s({class:B(u.stack,t==null?void 0:t.class,g.class)},n.loop(l,s(),y))}},lr=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=cr(e,{deleteAfterDuration:2e4}),r=G(e),i=ke(e);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ur=`import { Context } from "@grucloud/bau-ui/context";
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
`,dr={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ur,createComponent:lr}]},pr=e=>{const t=U(e);return()=>t(dr)},mr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,r=We(e),i=G(e),s=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=t.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),r({animationHide:()=>`${s} 0.5s`,animationShow:()=>`${s} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},gr=`import animate from "@grucloud/bau-ui/animate";
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
`,br=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:r,label:i}=t.tags,s=We(e),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=t.state("one"),u=({target:p})=>c.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",r({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",r({type:"radio",id:"two",name:"radio",value:c,oninput:u})),s({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},hr=`import animate from "@grucloud/bau-ui/animate";
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
`,fr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:gr,createComponent:mr},{title:"Component hide and show",description:"Hide and show a component",code:hr,createComponent:br}]},vr=e=>{const t=U(e);return()=>t(fr)};function Ce(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...g},...m]=K(c);return r({...g,class:B("skeleton",u,s,t==null?void 0:t.class,g==null?void 0:g.class)},...m)}}function bt(e,t={}){const{bau:n,css:o}=e,{div:a,img:r}=n.tags,i=n.state(!0),s=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,s.val=!0},u=o`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",width:b=40,height:y=40,alt:x,...S},...C]=K(p);const T=Ce(e,{class:B(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${y}px;
          width: ${b}px;
        `,t==null?void 0:t.class,S.class)});return a({class:B(u,t==null?void 0:t.class,S.class)},()=>i.val&&T(),()=>s.val&&x,r({alt:x,width:b,height:y,onload:l,onerror:c,class:()=>B(!i.val&&"visible",s.val&&"hide",f,m,g,u,t==null?void 0:t.class,S.class),...S}))}}const un=(e,t)=>{const{css:n}=e,o=bt(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},xr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=bt(e,{class:n`
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
`,wr=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=bt(e,{class:n`
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
`,Cr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:yr,createComponent:xr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:Sr,createComponent:wr}],gridItem:un},kr=e=>{const t=U(e);return()=>t(Cr)};function $e(e,t){const{bau:n,css:o,window:a}=e,{dialog:r}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...l){let[{contentEl:c,triggerEl:u,onClose:d,...p},...g]=K(l);const m=y=>{b.style.opacity=1,b.showModal();const x=u.getBoundingClientRect(),S=b.getBoundingClientRect();x.x<a.innerWidth/2?b.style.left=x.left+"px":b.style.left=x.right-S.width+"px",x.y<a.innerHeight/2?(b.style.top=x.top+x.height+"px",b.style.height=Math.min(b.scrollHeight,a.innerHeight-x.top-x.height)+"px"):(b.style.top=Math.max(0,x.top-S.height)+"px",b.scrollHeight>x.top&&(b.style.height=x.top+"px"))},f=y=>{const x=()=>{b.close(),b.removeEventListener("transitionend",x)};b.addEventListener("transitionend",x),b.style.opacity=0},b=r({role:"presentation",class:B("popover",i,t==null?void 0:t.class,p==null?void 0:p.class),onclick:y=>{y.target===b&&(f(),d==null||d.call())}},c);return b.closeDialog=f,b.openDialog=m,b}}const Fe={sm:12,md:16,lg:24},Er=()=>oe.map(e=>`
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
    stroke: var(--color-${e});
  }
}
`).join(`
`);function ge(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:r,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),s=a`
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
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:g=!0,...m}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${s} 2s linear infinite;
      width: ${Fe[u]};
      height: ${Fe[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${Er()}
    `;return r({class:{deps:[g],renderProp:()=>b=>B("spinner",f,d,p,b==!1?"":"visibility",t==null?void 0:t.class,m.class)},version:"1.1",x:"0px",y:"0px",width:Fe[u],height:Fe[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...m},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Tr=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Xe(e,t={}){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:g,Option:m,options:f,defaultOption:b,getOptionLabel:y,getOptionValue:x,onSelect:S=()=>{},id:C,required:T,name:A,loading:M,...D},...L]=K(l);const O=$e(e),$=G(e),H=pe(e,{variant:u,color:d,size:c}),_=ve(e),F=ge(e,{variant:u,color:d,size:c}),P=n.state(b),w=n.state(D.value),h=n.state(!1),v=n.state(0),k=()=>{h.val=!1},E=n.state(f),j=Q=>ae=>Q.val&&y(ae)==y(Q.val),z=()=>{ue.openDialog(),h.val=!0,w.val="",E.val=f,v.val=f.findIndex(j(P));const Q=Te.querySelector("li.selected");Q&&(Q.scrollIntoView({block:"center"}),ce.scrollIntoView({block:"end"}))},V=()=>{ue.closeDialog(),h.val=!1,v.val=0},J=Q=>{const{value:ae}=Q.target;w.val=ae,ae?E.val=f.filter(_e=>y(_e).match(new RegExp(`${ae}`,"i"))):E.val=f},I=Q=>{ue.open?V():z()},q=Q=>{P.val=Q,le.value=x(Q)},ne=({option:Q,index:ae})=>_e=>{q(Q),v.val=ae,V()},Z=()=>{const Q=Te.querySelector("li.active");Q&&Q.scrollIntoView({block:"center",behavior:"smooth"})},Y=Q=>{switch(Q.key){case"Escape":V();break;case"ArrowDown":v.val<E.val.length-1?v.val++:v.val=0,Z();break;case"ArrowUp":v.val<=0?v.val=E.val.length-1:v.val--,Z();break;case"Enter":ue.open?(q(E.val[v.val]),V()):z(),Q.preventDefault();break}},re=$({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,"aria-label":p,onclick:I,variant:u,color:d,size:c,class:M==!0&&"loading",disabled:M},()=>P.val?y(P.val):p,()=>M==!0&&F({visibility:M})),ce=H({value:w,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:J,onkeydown:Y,...D}),le=H({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:b&&x(b),required:T,name:A}),Te=a({class:B(u,d,c,"content")},ce,()=>_({class:B(u,d,c)},E.val.map((Q,ae)=>r({class:()=>B(v.val==ae&&"active",j(P)(Q)&&"selected"),onclick:ne({option:Q,index:ae})},m(Q))))),ue=O({id:C,triggerEl:re,contentEl:Te,onClose:k,class:o`
        overflow: hidden;
      `});return a({...D,class:B("autocomplete",i,t==null?void 0:t.class,D==null?void 0:D.class)},n.bind({deps:[P],render:()=>Q=>{Q&&(le.value=x(Q),S(Q))}}),re,le,ue)}}const dn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:r}=n.tags,i=Xe(e,t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Ar=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Xe(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
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
`,Mr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Xe(e),s="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(u.label),r(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==s),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},Br=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ir=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=G(e,{variant:"outline"}),s=Xe(e),l=t.state([]),c=t.state(!1),u=t.state("");async function d({url:m,transform:f=b=>b}){try{c.val=!0;const b=await fetch(m,{});if(b.ok){const y=await b.json();l.val=f(y)}else u.val=b.statusText}catch(b){u.val=b.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((f,b)=>f.name.common.localeCompare(b.name.common))});p();const g=m=>a({class:n`
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
`,$r={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Dr,createComponent:Ar},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Nr,createComponent:Ir},{title:"Default Option",description:"A autocomplete with a default option.",code:Br,createComponent:Mr}],gridItem:dn},Lr=e=>{const t=U(e);return()=>t($r)};function pn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=K(s);return a({...p,class:B("badge",r,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:B(u,c,l)},d),...g)}}const mn=(e,t)=>{const n=pn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Or=e=>{const{bau:t}=e,{section:n}=t.tags,o=pn(e);return()=>n(o({content:"10"},"☏"))},Pr=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,zr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Pr,createComponent:Or}],gridItem:mn},Rr=e=>{const t=U(e);return()=>t(zr)};function ht(e,t={}){const{bau:n,css:o,config:a}=e,{ul:r,li:i,span:s}=n.tags,{separator:l="〉"}=t,c=G(e),u=o`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",items:b,...y},...x]=K(p);return r({...y,class:B(u,t==null?void 0:t.class,y==null?void 0:y.class)},b.map(({href:S,name:C})=>i((S!=null?c:s)({href:`${a.base}${S}`,color:f,variant:m,size:g,class:B(f,m,g)},C))))}}const gn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=ht(e,t);return a=>o({...a,...n})},_r=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=ht(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},jr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Gr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=ht(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Hr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ur={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:jr,createComponent:_r},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Hr,createComponent:Gr}],gridItem:gn},Fr=e=>{const t=U(e);return()=>t(Ur)},bn=(e,t={})=>{const n=G(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},Vr=e=>{const{bau:t}=e,{section:n}=t.tags,o=G(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Wr=`import button from "@grucloud/bau-ui/button";
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
`,Kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=G(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Jr=`import button from "@grucloud/bau-ui/button";
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
`,Xr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Wr,createComponent:Vr},{title:"Disabled Button",description:"A disabled button.",code:Jr,createComponent:Kr}],gridItem:bn},qr=e=>{const t=U(e);return()=>t(Xr)},Zr=()=>oe.map(e=>`
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
`);function ft(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("button-group",c,u,l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const hn=(e,t)=>{const n=["ONE","TWO","THREE"],o=G(e,t),a=ft(e,t);return r=>a({...r},n.map(i=>o(r,i)))},Yr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=G(e),r=ft(e),i="primary",s="solid";return()=>n(r({color:i,variant:s},o.map(l=>a({color:i,variant:s},l))))},Qr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,es={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Qr,createComponent:Yr}],gridItem:hn},ts=e=>{const t=U(e);return()=>t(es)};function fn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=K(l);return a({...p,type:"date",class:B("calendar",i,d,u,c,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}const vn=(e,t)=>{const n=fn(e,t);return o=>n({...o})},ns=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),r=fn(e);return()=>n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},os=`import calendar from "@grucloud/bau-ui/calendar";
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
`,as={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:os,createComponent:ns}],gridItem:vn},rs=e=>{const t=U(e);return()=>t(as)};function ss(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:g,Previous:m,Next:f,...b}]=K(l);const y=()=>{i.val<=0?i.val=p.length-1:i.val--},x=()=>{i.val>=p.length-1?i.val=0:i.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},p.map(g));return a({...b,class:B("carousel",c,r,t==null?void 0:t.class,b==null?void 0:b.class)},a({class:B("control","control-previous"),onclick:y},m()),a({class:B("control","control-next"),onclick:x},f()),S)}}const is=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],cs=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,r=G(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),s=ss(e,{class:n`
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
`,us={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ls,createComponent:cs}]},ds=e=>{const t=U(e);return()=>t(us)},xn=(e,t)=>{const n=Ne(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ps=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ne(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},ms=`import chip from "@grucloud/bau-ui/chip";
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
`,gs={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ms,createComponent:ps}],gridItem:xn},bs=e=>{const t=U(e);return()=>t(gs)};function Ee(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({type:"checkbox",...d,class:B(r,u,c,l,t==null?void 0:t.class,d==null?void 0:d.class)})}}const yn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,r=Ee(e,t);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,r({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},hs=e=>{const{bau:t,css:n}=e,{form:o,article:a,footer:r,label:i}=t.tags,s=Ee(e,{color:"neutral",variant:"outline"}),l=G(e,{variant:"outline",color:"primary"}),c=t.state(!1),u=p=>{c.val=!!p.target.checked},d=p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(g))};return()=>o({onsubmit:d},a(i({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",s({name:"myCheckbox",checked:c,onchange:u}))),r(l({type:"submit"},"Submit")))},fs=`import { Context } from "@grucloud/bau-ui/context";
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
`,vs=e=>{const{bau:t,css:n}=e,{label:o,footer:a,article:r,form:i}=t.tags,s=Ee(e,{color:"neutral",variant:"outline"}),l=G(e,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.target.closest("form")));alert(JSON.stringify(d))};return()=>i({onsubmit:c,class:n`
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
`,ys=e=>{const{bau:t,css:n}=e,{label:o,footer:a,article:r,form:i}=t.tags,s=Ee(e,{color:"neutral",variant:"outline"}),l=G(e,{variant:"outline",color:"primary"}),c=G(e,{variant:"solid",color:"primary"}),u=p=>{p.preventDefault();const g=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(g))},d=p=>{const g=window.document.getElementById("my-checkbox");g&&(g.indeterminate=!g.indeterminate)};return()=>i({onsubmit:u,class:n`
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
`,Ss={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:fs,createComponent:hs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:xs,createComponent:vs},{title:"Indeterminate checkbox",description:"An indeterminate checkbox.",code:ws,createComponent:ys}],gridItem:yn},Cs=e=>{const t=U(e);return()=>t(Ss)},ks=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=gt(e),r=G(e,{variant:"outline"}),i=()=>r("Header"),s=()=>o("Content");return()=>n(a({Header:i,Content:s}))},Es=`import button from "@grucloud/bau-ui/button";
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
`,Ts={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Es,createComponent:ks}]},As=e=>{const t=U(e);return()=>t(Ts)};function Ds(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("divider",l,r,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const Ms=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ds(e);return()=>n(o("OR"))},Bs=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Is={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Bs,createComponent:Ms}],variantColorTableDisable:!0,variantSizeDisable:!0},Ns=e=>{const t=U(e);return()=>t(Is)};function $s(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{color:l,variant:c="outline",size:u,openState:d,...p},...g]=K(s);return a({class:B(r,t==null?void 0:t.class,p.class)},a({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>B("content",d.val&&"content-open")},g))}}const Ls=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),r=$s(e),i=G(e),s=Gt(e);return()=>n(o("Click on the button to open and close the drawer."),i({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},s()))},Os=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ps={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Os,createComponent:Ls}]},zs=e=>{const t=U(e);return()=>t(Ps)},Rs=()=>oe.map(e=>`
`).join(`
`);function wn(e,t={}){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,i=G(e),s=$e(e),l=ve(e),c=o`
    ${Rs()}
  `;return function(...d){let[{size:p=t.size??"md",variant:g=t.variant??"outline",color:m=t.color??"neutral",label:f,ListItem:b,items:y,...x},...S]=K(d);const C=n.state(0),T=()=>{_.openDialog(),_.focus()},A=()=>{_.closeDialog()},M=()=>{_.open?A():T()},D=F=>{M(),F.preventDefault()},L=({item:F,index:P})=>w=>{C.val=P,A(),w.preventDefault()},O=F=>{switch(F.preventDefault(),F.key){case"Escape":A();break;case"ArrowDown":C.val<options.length-1?C.val++:C.val=0;break;case"ArrowUp":C.val<=0?C.val=options.length-1:C.val--;break;case"Enter":M();break}},$=()=>l({tabindex:"0",class:B(m,g)},y.map((F,P)=>r({class:()=>B(C.val==P&&"active"),onclick:L({item:F,index:P})},b(F)))),H=i({type:"button",onclick:D,color:m,variant:g,size:p},f),_=s({triggerEl:H,contentEl:$()});return a({...x,class:B("dropdownMenu",m,p,c,t==null?void 0:t.class,x==null?void 0:x.class),onkeydown:O},H,_)}}const _s=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,r=wn(e,t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o(a(l.label));return l=>r({...l,items:i,ListItem:s,label:"Action"})},js=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,r=wn(e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],s=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(r({items:i,ListItem:s,label:"Action"}))},Gs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Hs={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Gs,createComponent:js}],gridItem:_s},Us=e=>{const t=U(e);return()=>t(Hs)},Sn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=it(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},Fs=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=it(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Vs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Ws={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Vs,createComponent:Fs}],gridItem:(e,t)=>Sn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Ks=e=>{const t=U(e);return()=>t(Ws)};function Cn(e,t={}){const{bau:n,css:o}=e,{div:a,label:r,input:i}=n.tags,s={base:o`
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
    `};return function(c,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",Component:m,disabled:f,...b}=c;return a({class:B(s.base,f&&s.disabled,t==null?void 0:t.class,c.class)},r({class:B(p,g,d)},m({disabled:f}),i({type:"file",disabled:f,...b})))}}const kn=(e,t)=>{const{tr:n,bau:o,css:a,config:r}=e,{svg:i,use:s}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=Cn(e,t),p=m=>{const f=m.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:m})=>l({class:B(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${r.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return m=>d({Component:g,name:"file",accept:"text/*",onchange:p,...m})},Js=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,span:c}=n.tags,u=n.state("No file selected"),d=Cn(e),p=m=>{const f=m.target.files[0];f?u.val=f.name:u.val="No file selected"},g=({disabled:m})=>l({class:B(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return()=>s(d({Component:g,name:"file",accept:"text/*",onchange:p}),l("File selected: ",u))},Xs=`import classNames from "@grucloud/bau-css/classNames";
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
`,qs={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Xs,createComponent:Js}],gridItem:kn},Zs=e=>{const t=U(e);return()=>t(qs)};function Le(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...g]=K(s);return a({...p,class:B("form",u,c,l,r,t==null?void 0:t.class,p==null?void 0:p.class)},...g)}}function vt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:r}=n.tags,i=a`
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
  `;return function(...c){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:g,...m},...f]=K(c);const b=G(e),y=ge(e);return n.bind({deps:[g],render:()=>x=>b({...m,class:B("loadingButton",u,d,p,s,x&&"loading",t==null?void 0:t.class,m==null?void 0:m.class)},y({size:u,variant:d,color:p,visibility:x}),r({class:x&&"loading"},f))})}}const Ys=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:r,header:i,label:s,img:l,footer:c}=t.tags,u=vt(e),d=ke(e,{variant:"outline",color:"danger"}),p=pe(e),g=Le(e,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:f=()=>{}}){const b=t.state(!1),y=t.state("");return g({onsubmit:async S=>{S.preventDefault();const{username:C,password:T}=Object.fromEntries(new FormData(S.target.closest("form")));try{b.val=!0;const A=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:C,password:T})});if(A.ok){const M=await A.json();f(M)}else A.status==401?y.val="Invalid username or password":y.val=A.statusText}catch(A){y.val=A.message}finally{b.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),r("Login to Grucloud")),a(()=>y.val&&d(y.val),s("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),s("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",variant:"solid",color:"primary",loading:b},"Login")))}},Qs=`import form from "@grucloud/bau-ui/form";
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
`,ei=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:r,footer:i}=t.tags,s=Le(e),l=G(e,{variant:"solid",color:"primary"}),c=pe(e);return function({onSubmitted:d=()=>{}}){return s({onsubmit:async g=>{g.preventDefault();const m=Object.fromEntries(new FormData(g.target.closest("form")));alert(JSON.stringify(m)),d(m)}},a(o("Form with input")),n(r("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},ti=`import form from "@grucloud/bau-ui/form";
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
`,ni=e=>{const{bau:t}=e,{section:n,h1:o,header:a,label:r,footer:i,em:s,span:l}=t.tags,c=t.state(""),u=t.derive(()=>c.val!=="Delete"),d=Le(e),p=G(e,{variant:"solid",color:"primary"}),g=pe(e);return function({onSubmitted:f=()=>{}}){return d({onsubmit:async y=>{y.preventDefault(),f()}},a(o("Delete Protection")),n(r(l("Type ",s("Delete")," to confirm the destruction of the resource."),g({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:y=>c.val=y.target.value}))),i(p({type:"submit",disabled:u},"Delete")))}},oi=`import { Context } from "@grucloud/bau-ui/context";
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
`,ai={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:ti,createComponent:ei},{title:"Form with state",description:"A form with input state and a dervied state.",code:oi,createComponent:ni},{title:"Login page",description:"A login page.",code:Qs,createComponent:Ys}]},ri=e=>{const t=U(e);return()=>t(ai)},En=(e,t={})=>{const n=pe(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},si=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=pe(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ii=`import input from "@grucloud/bau-ui/input";
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
`,ci={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ii,createComponent:si}],gridItem:En},li=e=>{const t=U(e);return()=>t(ci)},Tn=(e,t={})=>{const n=ct(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},ui=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=ct(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},di=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,pi={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:di,createComponent:ui}],gridItem:Tn},mi=e=>{const t=U(e);return()=>t(pi)};function An(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("keyValueList",r,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const gi=e=>{const{bau:t}=e,{section:n,li:o,label:a,span:r}=t.tags,i=An(e);return()=>n(i(o(a("My label"),r("My Value")),o(a("My other label"),r("My Other Value"))))},bi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,hi=e=>{const{bau:t,css:n}=e,{section:o,li:a,label:r,span:i}=t.tags,s=An(e,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(s(a(r("My label"),i("My Value")),a(r("My other label"),i("My Other Value"))))},fi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,vi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:bi,createComponent:gi},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:fi,createComponent:hi}]},xi=e=>{const t=U(e);return()=>t(vi)},yi="modulepreload",wi=function(e){return"/bau/bau-ui/"+e},Ot={},Dn=function(t,n,o){if(!n||n.length===0)return t();const a=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=wi(r),r in Ot)return;Ot[r]=!0;const i=r.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===r&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":yi,i||(c.as="script",c.crossOrigin=""),c.href=r,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>t())};function Mn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=ge(e,{size:"lg"}),i=ke(e,{color:"danger"}),s=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},r({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=s,error:p=l,props:g={}}){const m=n.state(void 0),f=n.state(!0),b=n.state(!1);return u().then(y=>{n.batch(()=>{m.val=y.default(e),f.val=!1})}).catch(y=>{b.val=y.message}),a(()=>{if(b.val)return p({message:b.val});if(f.val)return d();if(m.val)return m.val(g)})}}const Si=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state(!1),a=Mn(e),r=G(e);return()=>n(r({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},Ci=`import { Context } from "@grucloud/bau-ui/context";
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
`,ki=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=t.state(!1),r=Mn(e,{loading:()=>o("My Custom Loading"),error:s=>o("My Custom Error")}),i=G(e);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&r({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Ei=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ti={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:Ci,createComponent:Si},{title:"Custom Loader",description:"Custom loader and error",code:Ei,createComponent:ki}]},Ai=e=>{const t=U(e);return()=>t(Ti)};function Bn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:r}=n.tags,i=()=>oe.map(c=>`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",running:m,...f}]=K(u);return r({...f,role:"progressbar",class:{deps:[m],renderProp:()=>b=>B("linearProgress",d,g,l,b&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const In=(e,t)=>{const n=Bn(e,t);return o=>n({...o,running:!0})},Di=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=G(e),r=Bn(e),i=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,r({running:i}))},Mi=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Bi={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Mi,createComponent:Di}],gridItem:In},Ii=e=>{const t=U(e);return()=>t(Bi)},Nn=(e,t)=>{const n=vt(e,t);return o=>n({...o,loading:!0},"Save")},Ni=e=>{const{bau:t}=e,{section:n}=t.tags,o=vt(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},$i=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Li={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:$i,createComponent:Ni}],gridItem:Nn},Oi=e=>{const t=U(e);return()=>t(Li)},Pi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],zi=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:r}=n.tags,i=ve(e,t),s=({code:l,label:c})=>r({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},Pi.map(s))},Ri=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],_i=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:r}=t.tags,i=ve(e),s=({code:l,label:c})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i({variant:"outline",color:"primary"},Ri.map(s)))},ji=`import list from "@grucloud/bau-ui/list";
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
`,Gi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ji,createComponent:_i}],gridItem:zi},Hi=e=>{const t=U(e);return()=>t(Gi)};function $n(e,t={}){const{bau:n,css:o,window:a}=e,{dialog:r,div:i}=n.tags,l=o`
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
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:g=t.color??"neutral",...m},...f]=K(u);const b=r({...m,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(m.id??"modal")&&b.showModal()},class:B("modal",l,g,p,d,t==null?void 0:t.class,m==null?void 0:m.class)},f);return new MutationObserver(x=>{const S=new URLSearchParams(a.location.search);x[0].attributeName=="open"&&(b.open?S.set("modal",b.id??"modal"):S.delete("modal"),a.history.pushState("","",`?${S.toString()}`))}).observe(b,{attributes:!0}),b}}const Ln=(e,t={})=>{const{bau:n}=e,{form:o,section:a,main:r,header:i,footer:s,p:l,h1:c}=n.tags,u=G(e),d=$n(e,t),p=()=>r(Array(20).fill("").map((m,f)=>l(f+1,". Some text here"))),g=m=>{const f=d({id:`dialog-${m.color}-${m.variant}-${t.size}`,...m},o(i(c("Header")),p(),s(u({variant:"outline",color:m.color,onclick:()=>{f.close()}},"Cancel"),u({variant:"solid",color:m.color,onclick:()=>{f.close()}},"OK"))));return f};return m=>{const f=g(m);return a(u({...m,onclick:()=>{f.showModal()}},"OPEN MODAL"),f)}},Ui=e=>{const{bau:t}=e,{form:n,section:o,main:a,header:r,footer:i,p:s}=t.tags,l="neutral",c=G(e),u=$n(e),d=()=>a(Array(10).fill("").map((g,m)=>s(m+1,". Some text here"))),p=u({id:"my-dialog"},n(r("Header"),d(),i(c({variant:"outline",color:l,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:l,onclick:()=>{p.close()}},"OK"))));return()=>o(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Fi=`import modal from "@grucloud/bau-ui/modal";
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
`,Vi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Fi,createComponent:Ui}],gridItem:Ln},Wi=e=>{const t=U(e);return()=>t(Vi)},Ki=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ji(e,t={}){const{bau:n,css:o}=e,{div:a,li:r,select:i}=n.tags,s=G(e),l=$e(e),c=ve(e),u=Ee(e,{color:"neutral",variant:"outline"}),d=o`
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
    ${Ki()}
  `;return function(...g){let[{size:m=t.size??"md",variant:f=t.variant??"outline",color:b=t.color??"neutral",name:y,label:x,Option:S,options:C,defaultValue:T=[],getOptionLabel:A,getOptionValue:M,renderValue:D,onSelect:L=()=>{},loading:O,...$},...H]=K(g);const _=ge(e,{variant:f,color:b,size:m}),F=n.state(T),P=n.state(!1),w=n.state(0),h=()=>{q.openDialog(),q.focus(),P.val=!0},v=()=>{q.closeDialog(),P.val=!1},k=()=>{P.val=!1},E=Z=>{q.open?v():h(),Z.preventDefault()},j=()=>Array.from(ne.selectedOptions).map(({value:Z})=>C.find(Y=>M(Y)==Z)),z=Z=>{switch(Z.preventDefault(),Z.key){case"Escape":v();break;case"ArrowDown":w.val<C.length-1?w.val++:w.val=0;break;case"ArrowUp":w.val<=0?w.val=C.length-1:w.val--;break;case"Enter":if(q.open){const Y=Z.currentTarget.querySelectorAll("input")[w.val];Y.checked=!Y.checked;const re=ne.options[w.val+1];re.selected=!re.selected,F.val=j()}else h();break}},V=Z=>Y=>{const re=[...ne.options].find(({value:ce})=>ce==M(Z));Y.target.checked?re.selected=!0:re.selected=!1,F.val=j()},J=()=>c({tabindex:"0",class:B(b,f)},C.map((Z,Y)=>r({class:()=>B(w.val==Y&&"active")},n.tags.label(u({checked:T.find(re=>M(re)==M(Z)),name:`${y}-${M(Z)}`,onchange:V(Z)}),S(Z))))),I=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":P,"aria-label":x,onclick:E,color:b,variant:f,size:m,class:O==!0&&"loading",disabled:O},()=>F.val.length?D(F.val):x,()=>O==!0&&_({visibility:O})),q=l({triggerEl:I,contentEl:J(),onClose:k}),ne=i({name:y,multiple:!0,...$},n.tags.option({value:""},"--Category--"),C.map(Z=>n.tags.option({value:M(Z),selected:T.find(Y=>M(Y)==M(Z))},A(Z))));return a({...$,class:B("multiSelect",b,m,d,t==null?void 0:t.class,$==null?void 0:$.class),onkeydown:z},ne,I,q)}}const Xi=e=>{const{bau:t,css:n}=e,{div:o,span:a,form:r,footer:i}=t.tags,s=Ji(e),l=G(e,{variant:"outline",color:"neutral"}),c=Ne(e,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=g=>a(g.group),p=g=>{g.preventDefault();const{selectedOptions:m}=g.target.elements.myMultiSelect;var f=Array.from(m).map(({value:b})=>b);alert(JSON.stringify(f))};return()=>r({onsubmit:p,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},s({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:g})=>g,getOptionLabel:({group:g})=>g,renderValue:g=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},g.map(m=>c(m.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},qi=`import { Context } from "@grucloud/bau-ui/context";
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
`,Zi=e=>{const{bau:t,css:n}=e,{select:o,option:a,form:r}=t.tags,i=G(e,{variant:"outline",color:"neutral"}),s=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:p})=>p);alert(JSON.stringify(d))};return()=>r({onsubmit:l,class:n`
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
`,Qi={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:qi,createComponent:Xi},{title:"Native Multi Select",description:"A native multi select.",code:Yi,createComponent:Zi}]},ec=e=>{const t=U(e);return()=>t(Qi)},tc=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:r}=t.tags,i=G(e),s=$e(e),l=()=>i({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),r("My Content")),u=l(),d=s({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},nc=`import popover from "@grucloud/bau-ui/popover";
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
`,oc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:nc,createComponent:tc}]},ac=e=>{const t=U(e);return()=>t(oc)};function rc(e,t={}){const{bau:n,css:o,config:a}=e,{div:r,a:i,span:s,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:p,label:g,href:m})=>i({href:`${a.base}${m}`},s({class:"sublabel"},d),r({class:`label ${d}`},g??p));return function(...p){let[{size:g=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",data:b={},...y}]=K(p);const{next:x,previous:S}=b;return l({"data-paginationnav":JSON.stringify(b),"aria-label":"pages navigation",...y,class:B("paginationNavigation",g,c,t==null?void 0:t.class,y==null?void 0:y.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(x==null?void 0:x.href)&&u({text:"Next"})(x))}}const sc=e=>{const{bau:t}=e,{section:n}=t.tags,o=rc(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},ic=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,cc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ic,createComponent:sc}]},lc=e=>{const t=U(e);return()=>t(cc)},uc=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=mt(e,t);return r=>a({...r},o(`Paper ${t.size??""}`))},dc=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=mt(e);return()=>n(a({size:"md"},o("My content")))},pc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,mc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:pc,createComponent:dc}],variantColorTableDisable:!0,gridItem:uc},gc=e=>{const t=U(e);return()=>t(mc)};function xt(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    cursor: pointer;
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=K(l);return a({...p,type:"radio",class:B("radio-button",c,d,u,i,t==null?void 0:t.class,p==null?void 0:p.class)})}}const On=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:r}=n.tags,i=xt(e,t);return s=>r({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...s,id:`my-myRadioButton-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-myRadioButton-example-on-${s.color}-${s.variant}`,checked:!0})))},bc=e=>{const{bau:t,css:n}=e,{label:o,div:a,form:r}=t.tags,i=xt(e),s=t.state("one"),l=({target:c})=>s.val=c.id;return()=>r({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        `},o("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:l})),o("Two",i({id:"two",name:"radio",value:s,oninput:l})),a("Choice: ",s))},hc=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,fc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:hc,createComponent:bc}],gridItem:On},vc=e=>{const t=U(e);return()=>t(fc)};function qe(e,t={}){const{bau:n,css:o}=e,{div:a,label:r}=n.tags,i=xt(e),l=o`
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
    ${(()=>oe.map(c=>`
  `).join(`
`))()};
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"none",color:g=t.color??"neutral",name:m,oninput:f,value:b,radios:y=[],...x}]=K(u);return a({...x,class:B("radioButtonGroup",d,g,p,l,t==null?void 0:t.class,x==null?void 0:x.class)},y.map(({id:S,Label:C})=>r(i({size:d,variant:p,color:g,id:S,name:m,checked:b==S,value:S,oninput:f}),C())))}}const xc=e=>{const{bau:t}=e,{form:n,article:o,footer:a,p:r}=t.tags,i=qe(e),s=G(e,{variant:"outline",color:"primary"}),l=t.state("two"),c=({target:d})=>l.val=d.id,u=d=>{d.preventDefault(),alert(l.val)};return()=>n({onsubmit:u},o(i({oninput:c,name:"myRadio",value:l.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),r("CheckedState: ",l)),a(s({type:"submit"},"Submit")))},yc=`import { Context } from "@grucloud/bau-ui/context";
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
`,wc=e=>{const{bau:t}=e,{form:n,article:o,footer:a}=t.tags,r=qe(e),i=G(e,{variant:"outline",color:"primary"}),s=l=>{l.preventDefault();const c=l.target.closest("form"),u=Object.fromEntries(new FormData(c));alert(JSON.stringify(u))};return()=>n({onsubmit:s},o(r({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},Sc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cc=e=>{const{bau:t,config:n}=e,{form:o,article:a,footer:r,img:i}=t.tags,s=qe(e),l=G(e,{variant:"outline",color:"primary"}),c=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28}),d=p=>{p.preventDefault();const g=p.target.closest("form"),m=Object.fromEntries(new FormData(g));alert(JSON.stringify(m))};return()=>o({onsubmit:d},a(s({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>[c(),"GitHub"]},{id:"GitLab",Label:()=>[u(),"GitLab"]}]})),r(l({type:"submit"},"Submit")))},kc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ec=e=>{const{bau:t}=e,{form:n,article:o,footer:a,small:r,div:i}=t.tags,s=qe(e),l=G(e,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=u.target.closest("form"),p=Object.fromEntries(new FormData(d));alert(JSON.stringify(p))};return()=>n({onsubmit:c},o(s({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>i("GitHub",r("Login with GitHub"))},{id:"GitLab",Label:()=>i("GitLab",r("Login with GitLab"))}]})),a(l({type:"submit"},"Submit")))},Tc=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ac={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:Sc,createComponent:wc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:yc,createComponent:xc},{title:"Label with Image",description:"A label with an image.",code:kc,createComponent:Cc},{title:"Label with description",description:"A label with name and description.",code:Tc,createComponent:Ec}]},Dc=e=>{const t=U(e);return()=>t(Ac)},Mc=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Oe(e,t={}){const{bau:n,css:o}=e,{div:a,li:r,select:i,option:s}=n.tags,l=G(e),c=$e(e),u=ve(e),d=o`
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
    ${Mc()}
  `;return function(...g){let[{size:m=t.size??"md",variant:f=t.variant??"outline",color:b=t.color??"neutral",label:y,Option:x,options:S,defaultOption:C,getOptionLabel:T,getOptionValue:A,onSelect:M=()=>{},loading:D,...L},...O]=K(g);const $=ge(e,{variant:f,color:b,size:m}),H=n.state(C?T(C):y),_=n.state(!1),F=n.state(0),P=()=>{V.openDialog(),V.focus(),_.val=!0},w=()=>{V.closeDialog(),_.val=!1},h=()=>{_.val=!1},v=I=>{V.open?w():P(),I.preventDefault()},k=({option:I,index:q})=>ne=>{H.val=T(I),J.value=A(I),J.setCustomValidity(""),F.val=q,w(),M(I),ne.preventDefault()},E=I=>{switch(I.preventDefault(),I.key){case"Escape":w();break;case"ArrowDown":F.val<S.length-1?F.val++:F.val=0;break;case"ArrowUp":F.val<=0?F.val=S.length-1:F.val--;break;case"Enter":V.open?(H.val=T(S[F.val]),J.value=A(s),w()):P();break}},j=()=>u({tabindex:"0",class:B(b,f)},S.map((I,q)=>r({class:()=>B(F.val==q&&"active"),onclick:k({option:I,index:q})},x(I)))),z=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":_,"aria-label":y,onclick:v,color:b,variant:f,size:m,class:D==!0&&"loading",disabled:D},()=>!H.val&&y,H,()=>D==!0&&$({visibility:D})),V=c({triggerEl:z,contentEl:j(),onClose:h}),J=i(L,s({value:""},"--Select Category--"),S.map(I=>s({value:A(I)},T(I))));return J.value=L.value,a({...L,class:B("select",b,m,d,t==null?void 0:t.class,L==null?void 0:L.class),onkeydown:E},J,z,V)}}const Pn=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:r}=n.tags,i=Oe(e,t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(c.label),r(c.code));return c=>i({...c,options:s,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Bc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Oe(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
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
`,Nc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=Oe(e),s="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
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
`,Lc=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Oe(e),r=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n({},s);return()=>o(a({options:r,Option:i,label:"Select a region",getOptionValue:s=>s,getOptionLabel:s=>s}))},Oc=`import select from "@grucloud/bau-ui/select";
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
`,Pc=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,i=G(e,{variant:"outline"}),s=Oe(e),l=t.state([]),c=t.state(!1),u=t.state("");async function d({url:m,transform:f=b=>b}){try{c.val=!0;const b=await fetch(m,{});if(b.ok){const y=await b.json();l.val=f(y)}else u.val=b.statusText}catch(b){u.val=b.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((f,b)=>f.name.common.localeCompare(b.name.common))});p();const g=m=>a({class:n`
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
`,Rc={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Ic,createComponent:Bc},{title:"Default Option",description:"Select with a default option",code:$c,createComponent:Nc},{title:"Select AWS region",description:"Select the AWS region",code:Oc,createComponent:Lc},{title:"Loading Indicator",description:"Select with a loading indicator",code:zc,createComponent:Pc}],gridItem:Pn},_c=e=>{const t=U(e);return()=>t(Rc)};function zn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,r=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("select-native",u,l,c,r,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Rn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=zn(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,r.map(({label:s,phone:l})=>o({value:l},s)))},jc=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=zn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(r.map(({label:i,phone:s})=>o({value:s},i))))},Gc=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,Hc={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Gc,createComponent:jc}],gridItem:Rn},Uc=e=>{const t=U(e);return()=>t(Hc)},Fc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,r=Ce(e),i=()=>a({class:n`
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
`,Wc=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,r=Ce(e),i=()=>a({class:n`
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
`,Jc=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:r,tr:i,td:s}=t.tags,l=Ce(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(r(new Array(8).fill("").map(()=>i(s(l({class:n`
                  width: 5rem;
                `})),s(l()),s(l()),s(l()),s(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},Xc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,qc=e=>{const{bau:t,css:n}=e,{section:o,header:a,span:r,article:i}=t.tags,s=n`
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
    `}),c=Ce(e);function u({columnsSize:d=4}){return o({class:s},a(new Array(d).fill("").map(()=>l(r("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Zc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Yc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Vc,createComponent:Fc},{title:"List",description:"A list skeleton.",code:Kc,createComponent:Wc},{title:"Table",description:"A table skeleton.",code:Xc,createComponent:Jc},{title:"Tabs",description:"A tabs skeleton.",code:Zc,createComponent:qc}],variantColorTableDisable:!0,variantSizeDisable:!0},Qc=e=>{const t=U(e);return()=>t(Yc)};function Ze(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
    ${(()=>oe.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...g]=K(l);return a({...p,type:"range",class:B("slider",d,u,c,i,t==null?void 0:t.class,p.class)},...g)}}const _n=e=>{const{bau:t}=e,n=t.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=Ze(e);return r=>a({...r,oninput:o})},el=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:r}=t.tags,i=t.state(0),s=c=>{i.val=c==null?void 0:c.target.value},l=Ze(e);return()=>n(o(a("Slider with step, min and max",r,l({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},tl=`import slider from "@grucloud/bau-ui/slider";
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
`,nl=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:i,br:s,option:l}=t.tags,c=t.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Ze(e);return()=>o(a(r({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:u,class:n`
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
`,al=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:i,br:s,option:l}=t.tags,c=t.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=Ze(e);return()=>o(a({class:n`
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
`,sl={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:tl,createComponent:el},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ol,createComponent:nl},{title:"Vertical Mark",description:"A vertical slider with marks.",code:rl,createComponent:al}],gridItem:_n},il=e=>{const t=U(e);return()=>t(sl)},jn=(e,t)=>{const n=ge(e,t);return o=>n({...o})},cl=e=>{const{bau:t}=e,{section:n}=t.tags,o=G(e,{variant:"solid",color:"primary"}),a=ge(e,{size:"lg"}),r=t.state(!0);return()=>n(o({onclick:()=>r.val=!r.val},()=>r.val?"Stop":"Start"),a({visibility:r}))},ll=`import spinner from "@grucloud/bau-ui/spinner";
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
`,ul={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ll,createComponent:cl}],gridItem:jn},dl=e=>{const t=U(e);return()=>t(ul)},pl=()=>oe.map(e=>"").join(`
`),Gn=(e,t)=>(n,o)=>{const a=new URLSearchParams(e.window.location.search);return a.delete(t),a.append(t,n),o&&Object.entries(o).map(([r,i])=>(a.delete(r),a.append(r,i))),`?${a.toString()}`};function Hn(e,t={}){const{bau:n,css:o,window:a}=e,{div:r,ul:i,li:s,span:l,section:c}=n.tags,u=o`
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
  `;return function(...p){let[{color:g,variant:m="plain",size:f,stepperDefs:b=[],stepperName:y,activeStepIndex:x=n.state(0),...S},...C]=K(p);const T=n.state(b.map(($,H)=>({...$,index:H}))),A=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:($,H,_)=>{$.apply(H,_);const F=_[2]??"";console.log("stepper pushState ",F),["?","#"].includes(F[0])&&O()}});const M=n.derive(()=>T.val[x.val]),D=$=>{const{Header:H,disabled:_,name:F,index:P}=$;return s({class:()=>B(M.val.name==F&&"active",x.val<P&&"not-completed",x.val>P&&"completed",_&&"disabled")},l({class:"step-number"},P+1),l({class:"step-label"},()=>H($)))},L=$=>b.findIndex(({name:H})=>H==$.name),O=()=>{const H=new URLSearchParams(a.location.search).get(y)??b[0].name,_=Math.max(b.findIndex(({name:F})=>F==H),0);_<x.val&&(console.log("remove last step"),A.val.pop()),A.val.some(({name:F})=>H==F)||(console.log("add new step"),A.val.push(b[_])),x.val=_};return O(),r({bauMounted:({element:$})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:B("stepper",m,f,g,u,t==null?void 0:t.class,S.class)},n.loop(T,i(),D),n.loop(A,c(),$=>r({class:()=>B("content",$.name==M.val.name&&"visible")},$.Content({nextStep:b[L($)+1],previousStep:b[L($)-1]}))))}}const Pt="my-wizard",ml=e=>{const{bau:t,window:n}=e,{footer:o,p:a,label:r,section:i,a:s,ul:l,li:c}=t.tags,u=pe(e),d=Le(e),p=Hn(e),g=Gn(e,Pt),m=G(e,{variant:"outline",color:"primary"}),f=G(e,{variant:"solid",color:"primary"}),b=({nextStep:S})=>C=>{C.preventDefault();const{organization:T}=C.target.elements;n.history.pushState("","",g(S.name,{organization:T.value}))},y=S=>{var M;S.preventDefault();const{organization:C}=(M=n.document.forms)==null?void 0:M.formStep1.elements,A=new URLSearchParams(n.location.search).get("choice");alert(`organization ${C.value}, choice:${A}`)},x=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>d({onsubmit:b({nextStep:S}),id:"formStep1"},r("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:C})=>d(l(c(s({href:g(S.name,{choice:"choice1"})},"Choice 1")),c(s({href:g(S.name,{choice:"choice2"})},"Choice 2"))),o(m({href:g(C.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>d({onsubmit:y},a("My stepper 3 Content"),o(m({href:g(S.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>i(p({stepperDefs:x,stepperName:Pt}))},gl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,zt="stepper-vertical",bl=e=>{const{bau:t,window:n,css:o}=e,{footer:a,p:r,label:i,section:s,a:l,ul:c,li:u}=t.tags,d=pe(e),p=Le(e),g=Hn(e,{class:o`
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
    `}),m=Gn(e,zt),f=G(e,{variant:"outline",color:"primary"}),b=G(e,{variant:"solid",color:"primary"}),y=({nextStep:C})=>T=>{T.preventDefault();const{organization:A}=T.target.elements;n.history.pushState("","",m(C.name,{organization:A.value}))},x=C=>{var D;C.preventDefault();const{organization:T}=(D=n.document.forms)==null?void 0:D.formStep1.elements,M=new URLSearchParams(n.location.search).get("choice");alert(`organization ${T.value}, choice:${M}`)},S=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:C})=>p({onsubmit:y({nextStep:C}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(b({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:C,previousStep:T})=>p(c(u(l({href:m(C.name,{choice:"choice1"})},"Choice 1")),u(l({href:m(C.name,{choice:"choice2"})},"Choice 2"))),a(f({href:m(T.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:C})=>p({onsubmit:x},r("My stepper 3 Content"),a(f({href:m(C.name)},"Previous: Step 2"),b({type:"submit"},"Save")))}];return()=>s(g({stepperDefs:S,stepperName:zt}))},hl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,fl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:gl,createComponent:ml},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:hl,createComponent:bl}]},vl=e=>{const t=U(e);return()=>t(fl)},xl=()=>oe.map(e=>`
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
`);function Un(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=K(s);return a({...d,class:B("switch",r,u,c,l,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Fn=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:r}=n.tags,i=Un(e,t);return s=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},r("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),r("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},yl=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r}=t.tags,i=Un(e);return()=>o(a(r({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",i({variant:"outline",id:"my-shinny-switch"}))))},wl=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Sl={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:wl,createComponent:yl}],gridItem:Fn},Cl=e=>{const t=U(e);return()=>t(Sl)},kl=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Pe(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:r}=t,{div:i,ul:s,li:l,a:c}=n.tags,u=o`
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
  `;return function(...p){let[{size:g=t.size??"md",variant:m=t.variant??"plain",color:f=t.color??"neutral",tabsKey:b="tabs",...y},...x]=K(p);const S=n.state(r),C=O=>S.val.find($=>$.name==O),T=n.state(r[0]),A=()=>{var H,_;const $=new URLSearchParams(a.location.search).get(b)??r[0].name;if($!=T.val.name){const F=C($);(H=T.val.exit)==null||H.call(),T.val=F,(_=F==null?void 0:F.enter)==null||_.call()}};A(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,$,H)=>{O.apply($,H);const _=H[2]??"";["?","#"].includes(_[0])&&A()}});const M=O=>{const $=new URLSearchParams(a.location.search);return $.delete(b),$.append(b,O),`?${$.toString()}`},D=O=>{const{Header:$,disabled:H,name:_}=O;return l({class:()=>B(T.val.name==_&&"active",H&&"disabled")},c({href:M(_)},$(O)))},L=i({class:B("tabs",m,g,f,u,t==null?void 0:t.class,y.class),bauMounted:({element:O})=>{a.addEventListener("popstate",A)},bauUnmounted:()=>{a.removeEventListener("popstate",A)}},n.loop(S,s(),D),n.bind({deps:[T],render:()=>({Content:O})=>O?O(y):""}));return L.addEventListener("tab.add",O=>{var H;const{tab:$}=O.detail;(H=$.enter)==null||H.call(),S.val.push($)},!1),L.addEventListener("tab.remove",O=>{var H;const $=S.val.findIndex(_=>_.name==O.detail.tabName);$>0&&((H=S.val[$].exit)==null||H.call(),S.val.splice($,1))},!1),L}}const El=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Pe(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>r({})},Tl=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Al=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Pe(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>r({tabsKey:"my-tab"})},Dl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Vn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Ml=e=>{const{css:t}=e,n=Pe(e,{tabDefs:Vn(e),class:t`
      flex-direction: column-reverse;
    `});return()=>n({})},Bl=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Il=e=>{const{css:t}=e,n=Vn(e),o=Pe(e,{tabDefs:n,class:t`
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
`,$l={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Tl,createComponent:El},{title:"Extended Tabs",description:"An extended tabs.",code:Dl,createComponent:Al},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Bl,createComponent:Ml},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Nl,createComponent:Il}]},Ll=e=>{const t=U(e);return()=>t($l)};function ze(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r}=n.tags;a`
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
  `;return function(...l){let[{...c},...u]=K(l);return r({...c,class:B("table-container",i,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Ol=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=t.tags;function d(b,y,x,S,C){return{name:b,calories:y,fat:x,carbs:S,protein:C}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:b,calories:y})=>i(r(b),r({class:n`
            text-align: right;
          `},y)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=ze(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(s(u("Basic Table"),m(),c(p.map(g)))))},Pl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ae(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const zl=[Ae("Frozen yoghurt",159,6,24,4),Ae("Ice cream sandwich",237,9,37,4.3),Ae("Eclair",262,16,24,6),Ae("Cupcake",305,3.7,67,4.3),Ae("Gingerbread",356,16,49,3.9)],Rl=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=t.tags,d=({name:m,calories:f})=>i(r(m),r({class:n`
            text-align: right;
          `},f)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=ze(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(s(u("Table Dense"),p(),c(zl.map(d)))))},_l=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function De(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const jl=[De("Frozen yoghurt",159,6,24,4),De("Ice cream sandwich",237,9,37,4.3),De("Eclair",262,16,24,6),De("Cupcake",305,3.7,67,4.3),De("Gingerbread",356,16,49,3.9)],Gl=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:i,table:s,thead:l,tbody:c,caption:u}=t.tags,d=({name:m,calories:f})=>i(r(m),r({class:n`
            text-align: right;
          `},f)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=ze(e,{class:n`
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
`,Ul={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Pl,createComponent:Ol},{title:"Dense",description:"A dense table.",code:_l,createComponent:Rl},{title:"Zebra",description:"A zebra table.",code:Hl,createComponent:Gl}]},Fl=e=>{const t=U(e);return()=>t(Ul)},Vl=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:r,section:i,article:s}=t.tags,l=an(e),c=s({id:"content",class:n`
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
`,Kl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Wl,createComponent:Vl}]},Jl=e=>{const t=U(e);return()=>t(Kl)};function Wn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=ft(e),i=G(e),s=ge(e),l=o`
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
  `,c=({label:m,icon:f,...b})=>i({"aria-label":m,title:m,...b},f),u=({count:m,totalCount:f,page:b,rowsPerPage:y})=>a({class:"pages-numbers"},Number(b-1)*Number(y)+(m>0?1:0),"-",Math.min(b*y,f)," of ",f),d=({count:m,page:f,rowsPerPage:b})=>a({class:"pages-numbers"},(f-1)*b+(m>0?1:0),"-",f*b),p=m=>m<=1,g=(m,f,b)=>m>=Math.ceil(f/b);return function(...f){let[{size:b=t.size??"md",variant:y=t.variant??"outline",color:x=t.color??"neutral",count:S=0,totalCount:C=0,page:T=1,rowsPerPage:A=50,onPageChange:M,isLoading:D=!1,disableFirst:L=()=>p(T),disablePrevious:O=()=>p(T),disableNext:$=()=>g(T,C,A),disableLast:H=()=>g(T,C,A),..._},...F]=K(f);const P=Math.max(0,Math.ceil(C/A)),w=M({page:1}),h=M({page:T-1}),v=M({page:T+1}),k=M({page:P}),E=[{label:"First",icon:"⟪",onclick:w,disabled:L()},{label:"Previous",icon:"⟨",onclick:h,disabled:O()},{label:"Next",icon:"⟩",onclick:v,disabled:$()},{label:"Last",icon:"⟫",onclick:k,disabled:H()}];return a({..._,class:B("table-pagination",l,D&&"disabled",t==null?void 0:t.class,_==null?void 0:_.class)},s({class:"spinner",visibility:D,size:"md"}),C>0?u({count:S,totalCount:C,page:T,maxPages:P,rowsPerPage:A}):d({count:S,page:T,maxPages:P,rowsPerPage:A}),r({variant:y,color:x},E.map(j=>c({...j,variant:y,color:x}))))}}const Xl=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),ql=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:i,thead:s,tbody:l}=t.tags,c=Xl(45),u=({name:x,email:S})=>r(a(x),a(S)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Wn(e),g=ze(e,{class:n`
      max-width: 650px;
    `}),m=t.state(c),f=t.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),b=t.derive(()=>m.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),y=({page:x})=>S=>{f.val.page=x};return()=>g(i(d(),()=>l(b.val.map(u))),()=>p({...f.val,onPageChange:y}))},Zl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:i,thead:s,tbody:l,div:c}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),g=t.derive(()=>d.val.length),m=t.state(1),f=t.state(10),b=t.derive(()=>d.val),y=L=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(L).toString()}`,x=({page:L})=>O=>{m.val=L,S(y({page:L,per_page:f.val}))};S(y({page:1,per_page:f.val}));async function S(L){try{u.val=!0;const O=await fetch(L,{});if(O.ok){const $=await O.json();d.val=$;return}throw O}catch(O){p.val=O.message}finally{u.val=!1}}const C=({name:L,description:O,stargazers_count:$})=>r(a(L),a(O),a({class:n`
            text-align: right;
          `},$)),T=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),A=Wn(e),M=ze(e,{class:n`
      min-width: 650px;
    `}),D=({message:L})=>c(L);return()=>M(()=>A({rowsPerPage:f.val,page:m.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:x,disableNext:()=>!1}),i(T(),()=>p.val&&D({message:p.val}),()=>l(b.val.map(C))))},Yl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:r,h2:i,tr:s}=t.tags,l=ql(e),c=Zl(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(s("Table Pagination")),r("Asynchronous Pagination"),u(c()),r("Simple Pagination"),u(l()))};function Re(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:r}=n.tags;a`
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
  `;return function(...l){let[{size:c=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:g,onChange:m,...f},...b]=K(l);return r({type:"button",...f,"aria-pressed":{deps:[p],renderProp:()=>y=>y},class:{deps:[p],renderProp:()=>y=>B("toggle",c,d,u,i,y&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:g},b)}}const Kn=(e,t)=>{const{bau:n}=e,o=Re(e,t);return a=>{const r=n.state(!1);return o({...a,selected:r,onclick:()=>r.val=!r.val},"Toggle Me")}},Ql=e=>{const{bau:t}=e,{section:n}=t.tags,o=Re(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},eu=`import toggle from "@grucloud/bau-ui/toggle";

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
`,tu={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:eu,createComponent:Ql}],gridItem:Kn},nu=e=>{const t=U(e);return()=>t(tu)},ou=()=>oe.map(e=>`
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
`);function yt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...s){let[{size:l=t.size??"md",variant:c=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...g},...m]=K(s);const f=new Set,b=y=>{const{value:x}=y.target;d?(f.clear(),f.add(x)):f.has(x)?f.delete(x):f.add(x),p({event:y,values:[...f]})};return a({...g,class:B("toggle-group",l,u,c,r,t==null?void 0:t.class,g==null?void 0:g.class),onclick:b},...m)}}const Jn=(e,t)=>{const{bau:n}=e,o=yt(e,t),a=Re(e,t);return r=>{const i=n.state([""]),s=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...r,onChange:({values:c})=>{i.val=c}},s.map(({label:c,value:u})=>()=>a({...r,value:u,selected:i.val.includes(u),"area-label":c},c)))}},au=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],r=Re(e),i=yt(e),s="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:s,variant:l,exclusive:!0,onChange:c},a.map(({label:u,value:d})=>()=>r({color:s,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},ru=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,su=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],r=Re(e),i=yt(e),s="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:s,variant:l,onChange:c},a.map(({label:u,value:d})=>()=>r({color:s,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},iu=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,cu={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:ru,createComponent:au},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:iu,createComponent:su}],gridItem:Jn},lu=e=>{const t=U(e);return()=>t(cu)};function wt(e,t={}){const{bau:n,css:o,window:a}=e,{div:r}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:g=t.color??"neutral",...m},...f]=K(l);const b=r({class:B("container",...u.split("-"))},r({class:B("content",g,p,d),role:"tooltip"},c)),y=M=>`move-to-${M}`,x=(M,D,L)=>{if(M()){const O=y(D);b.classList.add(O),b.classList.add(D),b.classList.remove(L)}},S=(M,D)=>{const L=y(M);b.classList.contains(L)&&(b.classList.remove(L),b.classList.add(D),b.classList.remove(M))},C=M=>{const D=b.getBoundingClientRect();x(()=>D.x<0,"right","left"),x(()=>D.x+D.width>a.innerWidth,"left","right"),x(()=>D.y<0,"bottom","top"),x(()=>D.bottom>a.innerHeight,"top","bottom"),b.classList.add("visible")},T=M=>{b.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return r({...m,class:B("tooltip",i,t==null?void 0:t.class,m==null?void 0:m.class),bauMounted:({element:M})=>{M.addEventListener("mouseover",C),M.addEventListener("mouseout",T)},bauUnmounted:({element:M})=>{M.removeEventListener("mouseover",C),M.removeEventListener("mouseout",T)}},...f,b)}}const Xn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:r}=n.tags,i=G(e),s=wt(e,t),l=()=>o(a("A ",r("tooltip")," can be any component"));return c=>s({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},uu=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,r=G(e),i=wt(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:s()},r("tooltip"))},du=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,pu=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r,section:i}=t.tags,s=Ne(e,{variant:"outline",color:"primary"}),l=wt(e),c=()=>o(a("A ",r("tooltip")," can be any component")),u=()=>i({class:n`
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
`,gu={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:du,createComponent:uu},{title:"Grid",description:"Various tooltip position",code:mu,createComponent:pu}],gridItem:Xn},bu=e=>{const t=U(e);return()=>t(gu)},qn=(e,t)=>{const n=st(e,t);return o=>n(o)},hu=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return()=>n(o({}))},fu=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,vu={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:fu,createComponent:hu}],gridItem:qn},xu=e=>{const t=U(e);return()=>t(vu)},Zn=({parent:e,grandParent:t})=>n=>{const{children:o=[],...a}=n,r={...a};return r.children=o==null?void 0:o.map(Zn({parent:n,grandParent:e})),e&&(e.parent=t),r.parent=e,r},yu=({css:e,createGlobalStyles:t})=>(t`
:root {
  --treeview-link-padding-horizontal: 2rem;
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
            text-align: left;
            color: inherit;
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `});function St(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:r}=t,{ul:i,li:s,nav:l,div:c}=n.tags,u=yu({css:o,createGlobalStyles:a}),d=gt(e),p=({depth:g=1,maxDepth:m,parent:f,color:b,variant:y,size:x})=>S=>{const{children:C,expanded:T}=S,A=n.state(!T),M=()=>c({class:o`
              cursor: ${C?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:L=>{C&&(A.val=!A.val)}},r({item:S,parent:f,depth:g})),D=()=>i({class:B(b,x)},C.map(p({depth:g+1,maxDepth:m,parent:S})));return s(C.length?d({expanded:T,Header:M,Content:C&&g<m&&D}):M())};return function({tree:m,maxDepth:f=1/0,size:b=t.size??"md",variant:y=t.variant??"outline",color:x=t.color??"neutral",...S}){return l({class:B(u.nav,b,y,x,t==null?void 0:t.class,S.class)},i(p({maxDepth:f,color:x,variant:y,size:b})(Zn({})({...m}))))}}const Yn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=St(e,{renderMenuItem:({item:{data:{name:s,href:l}}})=>o({href:l},s),...t});return s=>i({...s,tree:a})},wu=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=St(e,{renderMenuItem:({item:{data:{name:i,href:s}}})=>n({href:s},i)});return()=>r({tree:o})},Su=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Cu=e=>{const{bau:t,css:n,window:o}=e,{form:a,label:r,article:i,footer:s}=t.tags,l=Ee(e,{color:"neutral",variant:"outline"}),c=G(e,{variant:"solid",color:"danger"}),u=t.state(0),d=C=>{C.preventDefault();const T=C.target.closest("form"),A=Object.fromEntries(new FormData(T));alert(JSON.stringify(A))},p={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},g=({id:C,name:T})=>C??T,m=C=>o.document.getElementById(g(C)),f=({onNode:C})=>T=>{C(T);const{children:A=[]}=T;A.map(f({onNode:C}))},b=({parent:C})=>{if(C){const{children:T}=C,A=m(C.data);if(A){const M=T.every(D=>{const{checked:L,indeterminate:O}=m(D.data);return!L&&!O});A.indeterminate=!M&&T.some(D=>!m(D.data).checked),A.checked=T.every(D=>m(D.data).checked)}b({parent:C.parent})}},y=({item:C,parent:T})=>A=>{b({parent:T}),f({onNode:L=>{const O=m(L.data);O&&(O.checked=A.target.checked,O.indeterminate=!1)}})(C);const D=A.target.closest("form").querySelectorAll('input[type="checkbox"][data-type="resources"]:checked');u.val=D.length,A.stopPropagation()},S=St(e,{renderMenuItem:({item:C,parent:T})=>{const{name:A,id:M}=C.data,D=g(C.data);return r({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:L=>L.stopPropagation()},l({onclick:y({item:C,parent:T}),name:D,id:D,"data-type":M?"resources":"group"}),A)}});return()=>a({onsubmit:d},i(S({tree:p})),s(c({type:"submit"},()=>`Delete ${u.val} Resource(s)`)))},ku=`import { Context } from "@grucloud/bau-ui/context";
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
`,Eu={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:Su,createComponent:wu},{title:"Checkable",description:"A treeview with checkboxes.",code:ku,createComponent:Cu}],gridItem:Yn},Tu=e=>{const t=U(e);return()=>t(Eu)},Au=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=Pe(e,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...t});return s=>i(s)},Du=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:r,p:i,ul:s,li:l}=t.tags,c=rn(e),u=G(e),d=[{name:"Accordion",Item:sn(e)},{name:"Alert",Item:ln(e)},{name:"Autocomplete",Item:dn(e)},{name:"Avatar",Item:un(e)},{name:"Badge",Item:mn(e)},{name:"Breadcrumbs",Item:gn(e)},{name:"Button",Item:bn(e)},{name:"Button Group",Item:hn(e)},{name:"Calendar",Item:vn(e)},{name:"Checkbox",Item:yn(e)},{name:"Chip",Item:xn(e)},{name:"DrillDown Menu",Item:Sn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:kn(e)},{name:"Input",Item:En(e)},{name:"Input Search",Item:Tn(e)},{name:"Linear Progress",Item:In(e)},{name:"Loading Button",Item:Nn(e)},{name:"Modal",Item:Ln(e)},{name:"Radio Button",Item:On(e)},{name:"Select",Item:Pn(e)},{name:"Select Native",Item:Rn(e)},{name:"Slider",Item:_n(e)},{name:"Spinner",Item:jn(e)},{name:"Switch",Item:Fn(e)},{name:"Tabs",Item:Au(e)},{name:"Theme Switch",Item:qn(e)},{name:"Toggle",Item:Kn(e)},{name:"Toggle Group",Item:Jn(e)},{name:"Tooltip",Item:Xn(e)},{name:"Tree View",Item:Yn(e)}];return()=>o({class:n`
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
            `},c(p))))},Mu=({context:e})=>{const t=Du(e);return[{path:"",action:n=>({title:"Bau UI",component:_o(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ua(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Qa(e)})},{path:"alert",action:()=>({title:"Alert",component:ir(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:pr(e)})},{path:"animate",action:()=>({title:"Animate",component:vr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Lr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:kr(e)})},{path:"badge",action:()=>({title:"Badge",component:Rr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Fr(e)})},{path:"button",action:()=>({title:"Button",component:qr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:ts(e)})},{path:"calendar",action:()=>({title:"Calendar",component:rs(e)})},{path:"carousel",action:()=>({title:"Carousel",component:ds(e)})},{path:"chip",action:()=>({title:"Chip",component:bs(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Cs(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:As(e)})},{path:"divider",action:()=>({title:"Divider",component:Ns(e)})},{path:"drawer",action:()=>({title:"Drawer",component:zs(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Us(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Ks(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Zs(e)})},{path:"form",action:()=>({title:"Form",component:ri(e)})},{path:"input",action:()=>({title:"Input",component:li(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:mi(e)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:xi(e)})},{path:"lazy",action:()=>({title:"Lazy",component:Ai(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Ii(e)})},{path:"list",action:()=>({title:"List",component:Hi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Oi(e)})},{path:"modal",action:()=>({title:"Modal",component:Wi(e)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:ec(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:lc(e)})},{path:"paper",action:()=>({title:"Paper",component:gc(e)})},{path:"popover",action:()=>({title:"Popover",component:ac(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:vc(e)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:Dc(e)})},{path:"select",action:()=>({title:"Select",component:_c(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:Uc(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Qc(e)})},{path:"slider",action:()=>({title:"Slider",component:il(e)})},{path:"spinner",action:()=>({title:"Spinner",component:dl(e)})},{path:"stepper",action:()=>({title:"Stepper",component:vl(e)})},{path:"switch",action:()=>({title:"Switch",component:Cl(e)})},{path:"table",action:()=>({title:"Table",component:Fl(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:Jl(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Yl(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Ll(e)})},{path:"toggle",action:()=>({title:"Toggle",component:nu(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:lu(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:bu(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:xu(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Tu(e)})}]},{path:"pages",action:n=>({title:"Pages",component:Ho(e)})}]},Bu=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Iu=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=e,i=a.state(),s=t({componentState:i});return document.getElementById("app").replaceChildren(s),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=t}=c.resolve({pathname:u});i.val=p({}),document.title=`${d}`}},Nu=e=>{const{createGlobalStyles:t}=e;t`
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
  `};fo();const Qn={title:"Bau",base:"/bau/bau-ui"},he=Eo({config:Qn}),{bau:$u}=he;he.states={drawerOpen:$u.state(!0)};Nu(he);ro({routes:Mu({context:he}),onLocationChange:Iu({context:he,LayoutDefault:Oo(he),config:Qn}),notFoundRoute:Bu(he)});
