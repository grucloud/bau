(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const In=(e,t)=>({...e,paths:[...t,e.path]}),mt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=In(o,e);return n?[a,...mt({paths:[...e,o.path],routes:n})]:a}),Nn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},$n=({routes:e=[],notFoundRoute:t})=>{const n=mt({routes:e}).map(o=>({...o,regex:Nn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function _n({routes:e,notFoundRoute:t,onLocationChange:n}){const o=$n({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const bt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],Bn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],On=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Qe=e=>`var(--color-${e})`,Rn=e=>`var(--color-${e}-lightest)`,Pn=()=>bt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${Qe(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Rn(e)};
}
.solid.${e} {
  background-color: ${Qe(e)};
}
`).join(`
`),Ln=e=>100-e*10,jn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Ln(t)}%);`).join(`
`),ht=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),zn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...Bn.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...On.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function gt({createGlobalStyles:e},{colorPalette:t=bt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>zn([n,o])).join(`
`)}
      ${jn()}
      ${ht({})}
      ${Pn()}
      
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
      --shadow-m: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
      --shadow-lg: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
      --font-size-base: 100%;
      --line-height-base: 1.65;
      --link-color: var(--color-primary);
      --brightness-hover-always: 180%;
      --brightness-active-always: 150%;
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
        font-size: 1.1rem;
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
    body {
      margin: 0;
    }
  `}function Hn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Le=e=>Object.prototype.toString.call(e??0).slice(8,-1),Un=e=>Le(e)=="Object",et=e=>Le(e)=="Function",Oe=e=>["Object","Array"].includes(Le(e)),tt=Object.getPrototypeOf,Re=e=>pe(e)?e.val:e,pe=e=>e==null?void 0:e.__isState,Gn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const q=e=>!pe(e[0])&&Un(e[0])?e:[{},...e];function Fn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=f=>n.createElement(f),l=(f,y,m)=>{let b=r;r=y;let w=f(m);return r=b,w},d=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(y=>{var m;return(m=y.element)==null?void 0:m.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},p=(f,y,m,b,w,D)=>{var T;if(s){i.add(f);return}for(let z of f.bindings){let{deps:O,element:j,renderInferred:P,render:F,renderItem:Q}=z;if(Q&&y)(T=x(j,b,(...ae)=>h(Q(...ae)),m,w,D)[y])==null||T.call();else{let ae=P?P({element:j}):F({element:j,renderItem:Q})(...O.map(Re));ae!==j&&j.replaceWith(z.element=h(ae))}}k(f),d()},u=(f,y,m=[])=>({get(b,w,D){var T;if(r==null||r.add(f),w==="_isProxy")return!0;if(!((T=b[w])!=null&&T._isProxy)&&!pe(b[w])&&Oe(b[w]))b[w]=new Proxy(b[w],u(f,y,[...m,w]));else if(Gn.includes(w)){let z=b[w];return(...O)=>{let j=z.apply(b,O);return p(f,w,j,O,y,m),j}}return Reflect.get(b,w,D)},set(b,w,D,T){let z=Reflect.set(b,w,D,T);return p(f,"setItem",z,{prop:w,value:D},y,[...m,w]),z}}),v=(f,y)=>new Proxy(y,u(f,y)),x=(f,y,m,b,w,D)=>{let T=()=>f.replaceChildren(...ke(b,m)),z=O=>f[O]&&f.removeChild(f[O]);return{assign:T,sort:T,reverse:T,setItem:()=>{var j;let O=D[0];(j=f.children[O])==null||j.replaceWith(m(w[O],O))},push:()=>f.append(...ke(y,(O,j)=>m(O,w.length+j))),unshift:()=>f.prepend(...ke(y,m)),pop:()=>z("lastChild"),shift:()=>z("firstChild"),splice:()=>{let[O,j,...P]=y;const{length:F}=f.children;for(let Q=O>=0?Math.min(O+j-1,F-1):F-1;Q>=(O>=0?O:F+O);Q--)f.children[Q].remove();if(P.length){let Q=P.forEach((ae,Ee)=>m(ae,O+Ee));f.children[O]?f.children[O].after(...Q):f.append(...Q)}}}},g=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let y=this;return r==null||r.add(y),y.valProxy??(y.valProxy=Oe(f)?v(y,f):f,y.valProxy)},set val(y){let m=this,b=m.val;Oe(y)?(m.valProxy=v(m,y),p(m,"assign",y)):y!==b&&(m.valProxy=y,p(m)),m.oldVal=b}}),h=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),S=(f,y)=>{let m=new Set;return y.val=l(f,m),m},E=f=>{let y=g(),m=S(f,y);y.computed=!0;for(let b of m)b.listeners.push({computed:f,deps:m,state:y});return y},k=f=>{for(let y of[...f.listeners])S(y.computed,y.state)},M=(f,...y)=>{if(y.length){let m=[];for(let b of y.flat(1/0))b!=null&&m.push(pe(b)?G({deps:[b],render:()=>w=>w}):et(b)?K({renderInferred:b}):h(b));f.append(...m)}},_={},R=(f,y)=>f&&(Object.getOwnPropertyDescriptor(f,y)??R(tt(f),y)),N=(f,y,m)=>{var b;return _[f+","+y]??(_[f+","+y]=((b=R(m,y))==null?void 0:b.set)??0)},B=(f,y)=>new MutationObserver((m,b)=>{m.filter(w=>w.removedNodes).forEach(w=>[...w.removedNodes].find(D=>D===f&&(y({element:f}),b.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),$=f=>new Proxy(function(m,...b){var z;let[w,...D]=q(b),T=f?n.createElementNS(f,m):c(m);for(let[O,j]of Object.entries(w)){if(O.startsWith("bau"))continue;let P=N(m,O,tt(T))?F=>T[O]=F:F=>T.setAttribute(O,F);j==null||(pe(j)?G({deps:[j],render:()=>()=>(P(j.val),T)}):et(j)&&(!O.startsWith("on")||j.isDerived)?K({renderInferred:()=>(P(j({element:T})),T)}):j.renderProp?G({deps:j.deps,render:()=>()=>(P(j.renderProp({element:T})(...j.deps.map(Re))),T)}):P(j))}return M(T,...D),(z=w.bauCreated)==null||z.call(w,{element:T}),w.bauMounted&&t.requestAnimationFrame(()=>w.bauMounted({element:T})),w.bauUnmounted&&t.requestAnimationFrame(()=>B(T,w.bauUnmounted)),T},{get:(y,m)=>y.bind(void 0,m)}),H=(f,y,m)=>{f.element=h(m);for(let b of y)pe(b)&&(a.add(b),b.bindings.push(f));return f.element},K=({renderInferred:f,element:y})=>{let m=new Set,b=l(f,m,{element:y});return H({renderInferred:f},m,b)},G=({deps:f,element:y,render:m,renderItem:b})=>H({deps:f,render:m,renderItem:b},f,m({element:y,renderItem:b})(...f.map(Re))),W=(f,y,m)=>G({deps:[f],render:({renderItem:b})=>w=>(y.append(...ke(w,b)),y),renderItem:m}),V=f=>{s=!0,f(),s=!1,i.forEach(p),i.clear()};return{tags:$(),tagsNS:$,state:g,bind:G,loop:W,derive:E,stateSet:a,batch:V}}const Vn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Wn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Xn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Zn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=Xn(a,i),r=Vn(s);return!t.getElementById(r)&&Wn(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Kn(e){const t=Fn(),n=Zn();return gt(n),{bau:t,...n,tr:o=>o,window,...e}}function I(...e){return e.filter(t=>t).join(" ")}function J(e,t){const{bau:n,css:o}=e,a={root:o`
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
        padding: 0.5rem;
      }
      &.lg {
        padding: 0.7rem 2rem;
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:d,href:p,...u},...v]=q(s);return(p?n.tags.a:n.tags.button)({...u,class:I("button",a.root,c,l,r,p?a.a:a.button,d&&a.disabled,t==null?void 0:t.class,u.class),disabled:d,href:p,...!p&&{type:"button"}},v)}}const ne=["neutral","primary","success","danger","warning"],Yn=["plain","outline","solid"],qn="light",Jn=()=>ne.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function je(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=d=>{a.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(qn);const l=o`
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
    ${Jn()}
  `;return function(...p){let[{color:u,variant:v="outline",size:x="md",...g},...h]=q(p);return i({required:"required",title:"Switch Theme",...g,class:I("theme-switch",u,v,x,l,t==null?void 0:t.class,g.class),type:"checkbox",checked:r()=="dark",onclick:S=>{s(S.target.checked?"dark":"light")}},...h)}}function Qn(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:d,img:p,b:u,ul:v,li:x}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),S=i.drawerOpen,E=J(e,{class:o`
      background: transparent;
    `}),k=je(e),M=()=>s(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),_=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>S.val=!S.val},M()),d({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),R=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},k(),E({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},p({class:o`
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
        `},_(),R())}}function eo({tr:e,bau:t,css:n}){const{footer:o,span:a,a:i,ul:s,li:r,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.41.0"))}}function ft(e,t={}){return function({parent:o,animationHide:a,animationShow:i},s){s.style.animation=i;const r=()=>{s.removeEventListener("animationend",r),s.style.animation=""};return s.addEventListener("animationend",r),new MutationObserver((c,l)=>{c.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(p=>{o.style.position="relative";const u=p.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=a,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),l.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}function xe(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,s=o`
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
    ${(()=>ne.map(r=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:p,...u},...v]=q(c);return a({...u,class:I("list",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const nt="0.3s",vt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(vt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},xt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=xt(e)(t.children[o]);if(a)return a}},to=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,showFromLeft:t`
   from {
     transform: translateX(-100%);
     opacity: 0;
   }
   to {
     transform: translateX(0%);
     opacity: 1;
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
   `,showFromRight:t`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `});function ze(e,t){const{bau:n,css:o,window:a}=e,{base:i=""}=t,s=({currentTree:G,data:W,onclickBack:V})=>h(M({variant:"plain",href:`${i}${G.parentTree.children[0].data.href}`,onclick:V({currentTree:G}),class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),M({variant:"plain",href:`${i}${W.href}`,class:o`
            flex-grow: 1;
          `},W.name)),r=({data:{name:G,href:W},children:V=[]})=>M({href:`${i}${W}`,"data-ischild":V.length==0},G),c=({subTree:G})=>{var W;return a.location.pathname.replace(i,"")===((W=G==null?void 0:G.data)==null?void 0:W.href)},{renderHeader:l=s,renderMenuItem:d=r,isActive:p=c}=t,{ul:u,li:v,nav:x,div:g,header:h,a:S}=n.tags,E=ft(),k=xe(e),M=J(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:_,hideToRight:R,showFromRight:N,showFromLeft:B}=to(e),$=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;

    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-200);
      & a {
        padding: 0.6rem;
        border-radius: 0;
      }
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
  `,H=({variant:G,color:W,size:V,onclickItem:f,onclickBack:y,currentTree:m,pathnameState:b})=>{const{children:w,parentTree:D,data:T}=m;return g({class:I("drillDownMenu",G,W,V)},D&&l({data:T,currentTree:m,onclickBack:y}),w&&k({class:I(G,W,V)},w.map(z=>v({class:()=>I(z.children&&"has-children",p({pathname:b.val,subTree:z})&&"active"),onclick:z.children&&f({currentTree:z})},d(z)))))},K=({tree:G,pathname:W})=>{let V=vt({})(G),f=xt(W)(V);return f||(console.log("drilldown no sub tree",W),f=V),f};return function(W){const{variant:V="plain",color:f="neutral",size:y="md",tree:m,pathnameState:b=n.state(a.location.pathname),...w}=W,D=({currentTree:j})=>P=>z(P,O,j,!0),T=({currentTree:j})=>P=>z(P,O,j.parentTree,!1),z=(j,P,F,Q)=>{P.firstChild.replaceChildren(E({parent:P,animationHide:`${Q?_:R} ${nt}`,animationShow:`${Q?N:B} ${nt}`},H({variant:V,color:f,size:y,currentTree:F,onclickItem:D,onclickBack:T,pathnameState:b})))},O=x({class:I($,t==null?void 0:t.class,w.class)},()=>H({variant:V,color:f,size:y,currentTree:K({tree:m,pathname:b.val}),onclickItem:D,onclickBack:T,pathnameState:b}));return O}}const no={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function wt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:d,a:p,span:u}=n.tags;let v=!1;const x=ze(e,{base:a.base});return function(){return r({bauMounted:({element:h})=>{s.innerWidth<=640&&(v=!0,i.drawerOpen.val=!1)},onclick:h=>{v&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:I(o`
            grid-area: sidebar;
            position: sticky;
            top: calc(var(--header-height));
            align-self: start;
            overflow-y: scroll;
            height: calc(100vh - var(--header-height) - 1rem);
            border-right: 1px solid var(--color-emphasis-200);

            @media (max-width: 640px) {
              position: fixed;
              width: 100vw;
              z-index: 1;
              display: none;
            }
          `)},x({tree:no,pathnameState:i.pathname}))}}const oo=e=>{const{bau:t,css:n,states:o}=e,{div:a}=t.tags,i=Qn(e),s=wt(e),r=eo(e);return function({componentState:l}){return a({class:n`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "footer";
          }
        `},i(),s(),a({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>l.val&&l.val({})),r())}};function ao(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;J(e);const c=n`
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
  `;return function({name:d,text:p,tagLine:u}){return a({class:c},i(d),s(p),r(u))}}function ro(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    & .feature {
      background-color: var(--color-emphasis-50);
      border-radius: 0.5rem;
      margin: 0.5rem;
      padding: 0.5rem;
      width: 30%;
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
        width: 90%;
      }
    }
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function so({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:d}=t.tags,p=({maxSize:u=151})=>({libName:v,size:x})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},v),s({class:n`
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
                  var(--color-success) ${x/u*100}%
                );
                justify-content: flex-end;
                width: ${x/u*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},x)));return function({data:v=[]}){return o({class:n`
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
          `},v.map(p({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",d({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function io(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s}=t.tags,r=ao(e),c=ro(e),l=J(e),d=so(e),p=n``,u=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],v=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),i("3 variant: plain, outline and primary"),i("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}];return function({}){return a({class:p},r({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:v}),d({data:u}))}}function co(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(p,...u){return a("Login")}}const lo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=co(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function uo(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),lo(e)()))}}function po(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function yt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&yt(n)}),e}class ot{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Et(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function se(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const mo="</span>",at=e=>!!e.scope,bo=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class ho{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Et(t)}openNode(t){if(!at(t))return;const n=bo(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){at(t)&&(this.buffer+=mo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const rt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class He{constructor(){this.rootNode=rt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=rt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{He._collapse(n)}))}}class go extends He{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new ho(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function fe(e){return e?typeof e=="string"?e:e.source:null}function Ct(e){return ue("(?=",e,")")}function fo(e){return ue("(?:",e,")*")}function vo(e){return ue("(?:",e,")?")}function ue(...e){return e.map(n=>fe(n)).join("")}function xo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ue(...e){return"("+(xo(e).capture?"":"?:")+e.map(o=>fe(o)).join("|")+")"}function St(e){return new RegExp(e.toString()+"|").exec("").length-1}function wo(e,t){const n=e&&e.exec(t);return n&&n.index===0}const yo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ge(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=fe(o),s="";for(;i.length>0;){const r=yo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Eo=/\b\B/,kt="[a-zA-Z]\\w*",Fe="[a-zA-Z_]\\w*",Tt="\\b\\d+(\\.\\d+)?",At="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Mt="\\b(0b[01]+)",Co="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",So=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ue(t,/.*\b/,e.binary,/\b.*/)),se({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},ve={begin:"\\\\[\\s\\S]",relevance:0},ko={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ve]},To={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ve]},Ao={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Me=function(e,t,n={}){const o=se({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Ue("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ue(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Mo=Me("//","$"),Do=Me("/\\*","\\*/"),Io=Me("#","$"),No={scope:"number",begin:Tt,relevance:0},$o={scope:"number",begin:At,relevance:0},_o={scope:"number",begin:Mt,relevance:0},Bo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[ve,{begin:/\[/,end:/\]/,relevance:0,contains:[ve]}]}]},Oo={scope:"title",begin:kt,relevance:0},Ro={scope:"title",begin:Fe,relevance:0},Po={begin:"\\.\\s*"+Fe,relevance:0},Lo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Te=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Eo,IDENT_RE:kt,UNDERSCORE_IDENT_RE:Fe,NUMBER_RE:Tt,C_NUMBER_RE:At,BINARY_NUMBER_RE:Mt,RE_STARTERS_RE:Co,SHEBANG:So,BACKSLASH_ESCAPE:ve,APOS_STRING_MODE:ko,QUOTE_STRING_MODE:To,PHRASAL_WORDS_MODE:Ao,COMMENT:Me,C_LINE_COMMENT_MODE:Mo,C_BLOCK_COMMENT_MODE:Do,HASH_COMMENT_MODE:Io,NUMBER_MODE:No,C_NUMBER_MODE:$o,BINARY_NUMBER_MODE:_o,REGEXP_MODE:Bo,TITLE_MODE:Oo,UNDERSCORE_TITLE_MODE:Ro,METHOD_GUARD:Po,END_SAME_AS_BEGIN:Lo});function jo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function zo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Ho(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=jo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Uo(e,t){Array.isArray(e.illegal)&&(e.illegal=Ue(...e.illegal))}function Go(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Fo(e,t){e.relevance===void 0&&(e.relevance=1)}const Vo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ue(n.beforeMatch,Ct(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Wo=["of","and","for","in","not","or","if","then","parent","list","value"],Xo="keyword";function Dt(e,t,n=Xo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Dt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,Zo(c[0],c[1])]})}}function Zo(e,t){return t?Number(t):Ko(e)?0:1}function Ko(e){return Wo.includes(e.toLowerCase())}const st={},le=e=>{console.error(e)},it=(e,...t)=>{console.log(`WARN: ${e}`,...t)},de=(e,t)=>{st[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),st[`${e}/${t}`]=!0)},Ae=new Error;function It(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=St(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function Yo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw le("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ae;if(typeof e.beginScope!="object"||e.beginScope===null)throw le("beginScope must be object"),Ae;It(e,e.begin,{key:"beginScope"}),e.begin=Ge(e.begin,{joinWith:""})}}function qo(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw le("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ae;if(typeof e.endScope!="object"||e.endScope===null)throw le("endScope must be object"),Ae;It(e,e.end,{key:"endScope"}),e.end=Ge(e.end,{joinWith:""})}}function Jo(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Qo(e){Jo(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Yo(e),qo(e)}function ea(e){function t(s,r){return new RegExp(fe(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=St(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(Ge(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((p,u)=>u>0&&p!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[zo,Go,Qo,Vo].forEach(d=>d(s,r)),e.compilerExtensions.forEach(d=>d(s,r)),s.__beforeBegin=null,[Ho,Uo,Fo].forEach(d=>d(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Dt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=fe(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(d){return ta(d==="self"?s:d)})),s.contains.forEach(function(d){i(d,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=se(e.classNameAliases||{}),i(e)}function Nt(e){return e?e.endsWithParent||Nt(e.starts):!1}function ta(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return se(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Nt(e)?se(e,{starts:e.starts?se(e.starts):null}):Object.isFrozen(e)?se(e):e}var na="11.8.0";class oa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Pe=Et,ct=se,lt=Symbol("nomatch"),aa=7,$t=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:go};function c(m){return r.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const w=r.languageDetectRe.exec(b);if(w){const D=$(w[1]);return D||(it(i.replace("{}",w[1])),it("Falling back to no-highlight mode for this block.",m)),D?w[1]:"no-highlight"}return b.split(/\s+/).find(D=>c(D)||$(D))}function d(m,b,w){let D="",T="";typeof b=="object"?(D=m,w=b.ignoreIllegals,T=b.language):(de("10.7.0","highlight(lang, code, ...args) has been deprecated."),de("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),T=m,D=b),w===void 0&&(w=!0);const z={code:D,language:T};f("before:highlight",z);const O=z.result?z.result:p(z.language,z.code,w);return O.code=z.code,f("after:highlight",O),O}function p(m,b,w,D){const T=Object.create(null);function z(C,A){return C.keywords[A]}function O(){if(!L.keywords){ee.addText(Y);return}let C=0;L.keywordPatternRe.lastIndex=0;let A=L.keywordPatternRe.exec(Y),U="";for(;A;){U+=Y.substring(C,A.index);const X=oe.case_insensitive?A[0].toLowerCase():A[0],te=z(L,X);if(te){const[re,Mn]=te;if(ee.addText(U),U="",T[X]=(T[X]||0)+1,T[X]<=aa&&(Se+=Mn),re.startsWith("_"))U+=A[0];else{const Dn=oe.classNameAliases[re]||re;F(A[0],Dn)}}else U+=A[0];C=L.keywordPatternRe.lastIndex,A=L.keywordPatternRe.exec(Y)}U+=Y.substring(C),ee.addText(U)}function j(){if(Y==="")return;let C=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){ee.addText(Y);return}C=p(L.subLanguage,Y,!0,Je[L.subLanguage]),Je[L.subLanguage]=C._top}else C=v(Y,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Se+=C.relevance),ee.__addSublanguage(C._emitter,C.language)}function P(){L.subLanguage!=null?j():O(),Y=""}function F(C,A){C!==""&&(ee.startScope(A),ee.addText(C),ee.endScope())}function Q(C,A){let U=1;const X=A.length-1;for(;U<=X;){if(!C._emit[U]){U++;continue}const te=oe.classNameAliases[C[U]]||C[U],re=A[U];te?F(re,te):(Y=re,O(),Y=""),U++}}function ae(C,A){return C.scope&&typeof C.scope=="string"&&ee.openNode(oe.classNameAliases[C.scope]||C.scope),C.beginScope&&(C.beginScope._wrap?(F(Y,oe.classNameAliases[C.beginScope._wrap]||C.beginScope._wrap),Y=""):C.beginScope._multi&&(Q(C.beginScope,A),Y="")),L=Object.create(C,{parent:{value:L}}),L}function Ee(C,A,U){let X=wo(C.endRe,U);if(X){if(C["on:end"]){const te=new ot(C);C["on:end"](A,te),te.isMatchIgnored&&(X=!1)}if(X){for(;C.endsParent&&C.parent;)C=C.parent;return C}}if(C.endsWithParent)return Ee(C.parent,A,U)}function Cn(C){return L.matcher.regexIndex===0?(Y+=C[0],1):(Be=!0,0)}function Sn(C){const A=C[0],U=C.rule,X=new ot(U),te=[U.__beforeBegin,U["on:begin"]];for(const re of te)if(re&&(re(C,X),X.isMatchIgnored))return Cn(A);return U.skip?Y+=A:(U.excludeBegin&&(Y+=A),P(),!U.returnBegin&&!U.excludeBegin&&(Y=A)),ae(U,C),U.returnBegin?0:A.length}function kn(C){const A=C[0],U=b.substring(C.index),X=Ee(L,C,U);if(!X)return lt;const te=L;L.endScope&&L.endScope._wrap?(P(),F(A,L.endScope._wrap)):L.endScope&&L.endScope._multi?(P(),Q(L.endScope,C)):te.skip?Y+=A:(te.returnEnd||te.excludeEnd||(Y+=A),P(),te.excludeEnd&&(Y=A));do L.scope&&ee.closeNode(),!L.skip&&!L.subLanguage&&(Se+=L.relevance),L=L.parent;while(L!==X.parent);return X.starts&&ae(X.starts,C),te.returnEnd?0:A.length}function Tn(){const C=[];for(let A=L;A!==oe;A=A.parent)A.scope&&C.unshift(A.scope);C.forEach(A=>ee.openNode(A))}let Ce={};function qe(C,A){const U=A&&A[0];if(Y+=C,U==null)return P(),0;if(Ce.type==="begin"&&A.type==="end"&&Ce.index===A.index&&U===""){if(Y+=b.slice(A.index,A.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=Ce.rule,X}return 1}if(Ce=A,A.type==="begin")return Sn(A);if(A.type==="illegal"&&!w){const X=new Error('Illegal lexeme "'+U+'" for mode "'+(L.scope||"<unnamed>")+'"');throw X.mode=L,X}else if(A.type==="end"){const X=kn(A);if(X!==lt)return X}if(A.type==="illegal"&&U==="")return 1;if(_e>1e5&&_e>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=U,U.length}const oe=$(m);if(!oe)throw le(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const An=ea(oe);let $e="",L=D||An;const Je={},ee=new r.__emitter(r);Tn();let Y="",Se=0,ce=0,_e=0,Be=!1;try{if(oe.__emitTokens)oe.__emitTokens(b,ee);else{for(L.matcher.considerAll();;){_e++,Be?Be=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const C=L.matcher.exec(b);if(!C)break;const A=b.substring(ce,C.index),U=qe(A,C);ce=C.index+U}qe(b.substring(ce))}return ee.finalize(),$e=ee.toHTML(),{language:m,value:$e,relevance:Se,illegal:!1,_emitter:ee,_top:L}}catch(C){if(C.message&&C.message.includes("Illegal"))return{language:m,value:Pe(b),illegal:!0,relevance:0,_illegalBy:{message:C.message,index:ce,context:b.slice(ce-100,ce+100),mode:C.mode,resultSoFar:$e},_emitter:ee};if(a)return{language:m,value:Pe(b),illegal:!1,relevance:0,errorRaised:C,_emitter:ee,_top:L};throw C}}function u(m){const b={value:Pe(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function v(m,b){b=b||r.languages||Object.keys(t);const w=u(m),D=b.filter($).filter(K).map(P=>p(P,m,!1));D.unshift(w);const T=D.sort((P,F)=>{if(P.relevance!==F.relevance)return F.relevance-P.relevance;if(P.language&&F.language){if($(P.language).supersetOf===F.language)return 1;if($(F.language).supersetOf===P.language)return-1}return 0}),[z,O]=T,j=z;return j.secondBest=O,j}function x(m,b,w){const D=b&&n[b]||w;m.classList.add("hljs"),m.classList.add(`language-${D}`)}function g(m){let b=null;const w=l(m);if(c(w))return;if(f("before:highlightElement",{el:m,language:w}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new oa("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const D=b.textContent,T=w?d(D,{language:w,ignoreIllegals:!0}):v(D);m.innerHTML=T.value,x(m,w,T.language),m.result={language:T.language,re:T.relevance,relevance:T.relevance},T.secondBest&&(m.secondBest={language:T.secondBest.language,relevance:T.secondBest.relevance}),f("after:highlightElement",{el:m,result:T,text:D})}function h(m){r=ct(r,m)}const S=()=>{M(),de("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){M(),de("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function M(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(r.cssSelector).forEach(g)}function _(){k&&M()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function R(m,b){let w=null;try{w=b(e)}catch(D){if(le("Language definition for '{}' could not be registered.".replace("{}",m)),a)le(D);else throw D;w=s}w.name||(w.name=m),t[m]=w,w.rawDefinition=b.bind(null,e),w.aliases&&H(w.aliases,{languageName:m})}function N(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function B(){return Object.keys(t)}function $(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(w=>{n[w.toLowerCase()]=b})}function K(m){const b=$(m);return b&&!b.disableAutodetect}function G(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function W(m){G(m),o.push(m)}function V(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function f(m,b){const w=m;o.forEach(function(D){D[w]&&D[w](b)})}function y(m){return de("10.7.0","highlightBlock will be removed entirely in v12.0"),de("10.7.0","Please use highlightElement now."),g(m)}Object.assign(e,{highlight:d,highlightAuto:v,highlightAll:M,highlightElement:g,highlightBlock:y,configure:h,initHighlighting:S,initHighlightingOnLoad:E,registerLanguage:R,unregisterLanguage:N,listLanguages:B,getLanguage:$,registerAliases:H,autoDetection:K,inherit:ct,addPlugin:W,removePlugin:V}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=na,e.regex={concat:ue,lookahead:Ct,either:Ue,optional:vo,anyNumberOfTimes:fo};for(const m in Te)typeof Te[m]=="object"&&yt(Te[m]);return Object.assign(e,Te),e},me=$t({});me.newInstance=()=>$t({});var ra=me;me.HighlightJS=me;me.default=me;const ge=po(ra),ut="[A-Za-z$_][0-9A-Za-z$_]*",sa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ia=["true","false","null","undefined","NaN","Infinity"],_t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Bt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ot=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ca=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],la=[].concat(Ot,_t,Bt);function Rt(e){const t=e.regex,n=(b,{after:w})=>{const D="</"+b[0].slice(1);return b.input.indexOf(D,w)!==-1},o=ut,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,w)=>{const D=b[0].length+b.index,T=b.input[D];if(T==="<"||T===","){w.ignoreMatch();return}T===">"&&(n(b,{after:D})||w.ignoreMatch());let z;const O=b.input.substring(D);if(z=O.match(/^\s*=/)){w.ignoreMatch();return}if((z=O.match(/^\s+extends\s+/))&&z.index===0){w.ignoreMatch();return}}},r={$pattern:ut,keyword:sa,literal:ia,built_in:la,"variable.language":ca},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,x,g,h,{match:/\$\d+/},p];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(k)});const M=[].concat(E,u.contains),_=M.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(M)}]),R={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:_},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[..._t,...Bt]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[R],illegal:/%/},K={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function G(b){return t.concat("(?!",b.join("|"),")")}const W={match:t.concat(/\b/,G([...Ot,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},f={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},R]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[R]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,x,g,h,E,{match:/\$\d+/},p,B,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[R,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[R]},W,K,N,f,{match:/\$[(.]/}]}}function ua(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const da=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return ge.registerLanguage("javascript",Rt),ge.registerLanguage("sh",ua),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=ge.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function pa(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,d=da(e);return function(){return o({class:n`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},a("Getting Started"),i("Grab the source code template for Javascript or Typescript"),d({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),i("Install the dependencies with the package manager of your choice:"),d({text:`cd my-bau-project
npm install`}),i("This template project is built with Vite. To start a development server:"),d({text:"npm run dev"}),i("The application starting point is at ",s("src/main.ts")),i("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),d({text:'import button from "@grucloud/bau-ui/button";'}),i("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),d({text:"const Button = button(context);"}),i("Last step is to place the button into the tree of component:"),d({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}const Pt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags,d=["sm","md","lg"];return function({Item:u,name:v}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(s(l(v??"Variant/Color"),ne.map(x=>l(x)))),i(Yn.map(x=>s(l(x),ne.map((g,h)=>r(u({color:g,variant:x,size:d[h%3]},{index:h}))))))))}},Z=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:i,p:s,h2:r,h3:c,pre:l,div:d,code:p}=t.tags;ge.registerLanguage("javascript",Rt);const u=Pt(e),v=({text:x})=>l({class:n`
          display: inline-block;
        `},p({class:"hljs language-js",bauCreated:({element:g})=>{g.innerHTML=ge.highlight(x,{language:"js"}).value}}));return function(g){return o({class:n``},i(g.title),s(g.description),g.gridItem&&[r("Gallery"),g.gridItem&&u({Item:g.gridItem(e)})],r("Usage"),c("Import"),v({text:g.importStatement}),r("Examples"),g.examples.map(h=>a(i(h.title),s(h.description),d(h.createComponent(e)()),v({text:h.code}))))}},ma=()=>ne.map(e=>`
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
`);function De(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:i,ul:s,li:r,header:c,h3:l,button:d}=n.tags,p=n.state(""),u=g=>h=>{p.val==g?p.val="":p.val=g},v=({element:g,open:h})=>{const S=()=>{g.removeEventListener("transitionend",S)};function E(M){M.addEventListener("transitionend",S),window.requestAnimationFrame(()=>{M.style.height="0px"})}function k(M){M.addEventListener("transitionend",S),M.style.height=M.scrollHeight+"px"}g.scrollHeight!=0&&(h?k(g):E(g))},x=o`
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;

      & li {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
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
          cursor: pointer;
          align-items: center;
          justify-content: space-between;
          margin: 0;
          &::after {
            content: "\u203A";
            transition: all var(--transition-slow) ease-out;
          }
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
          &::after {
            content: "\u203A";
            transform: rotate(90deg);
          }
        }
        & .content {
          height: 0px;
          will-change: height;
          transition: height var(--transition-fast) ease-out;
        }
      }
    }
    ${ma()}
  `;return function(...h){let[{color:S,variant:E="outline",size:k="md",content:M,..._},...R]=q(h);const N=B=>{const{Header:$,Content:H,name:K}=B;return r({class:I(S,E,k),onclick:u(K)},l({class:()=>I(p.val==K&&"active")},d({type:"button","aria-controls":`bau-${K}`,"aria-expanded":({element:G})=>p.val==K},$(B))),i({class:"content",role:"region",id:`bau-${K}`,"data-state":({element:G})=>{const W=p.val==K;return v({element:G,open:W}),W}},H(B)))};return i({class:I("accordion",x,t==null?void 0:t.class,_.class)},s(a.map(N)))}}const Lt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=De(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return s=>i({...s})},ba=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=De(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>i({color:"neutral",variant:"outline"})},ha=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
  const Accordion = accordion(context, { accordionDefs });
  return () => Accordion({ color: "neutral", variant: "outline" });
};
`,jt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},ga=e=>{const{css:t}=e,n=jt(e),o=De(e,{accordionDefs:n});return()=>o({color:"warning",class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},fa=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context, { accordionDefs });

  return () =>
    Accordion({
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
};
`,va=e=>{const{css:t}=e,n=jt(e),o=De(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
      `})},xa=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context, { accordionDefs });

  return () =>
    Accordion({
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
};
`,wa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:ha,createComponent:ba},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:fa,createComponent:ga},{title:"Customize the icon",description:"Customize the icon with a cross.",code:xa,createComponent:va}],gridItem:Lt},ya=e=>{const t=Z(e);return()=>t(wa)},Ea={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ca=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Sa=()=>ne.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Ie(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:s}=n.tags;Ca({css:o,createGlobalStyles:a});const r=o`
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
    ${Sa()}
  `,c=J(e),l=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(p,...u){const{variant:v="outline",color:x="neutral",size:g="md",onRemove:h,...S}=p;return i({...S,class:I(`alert-${v}`,v,x,g,r,t==null?void 0:t.class,p.class,"alert"),role:"alert"},s({class:"icon"},Ea[x]),i({class:"content"},...u),h&&l({onclick:h}))}}const zt=e=>{const t=Ie(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},ka=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Ie(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Ta=`import alert from "@grucloud/bau-ui/alert";
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
`,Aa=e=>{const{css:t}=e,n=Ie(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Ma=`import alert from "@grucloud/bau-ui/alert";
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
`,Da={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ta,createComponent:ka},{title:"Custom Alert ",description:"A custom alert.",code:Ma,createComponent:Aa}],gridItem:zt},Ia=e=>{const t=Z(e);return()=>t(Da)},Na=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:o`
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
    `},p=({id:u,status:v})=>{const x=c.val.findIndex(g=>g.id===u);x!=-1&&(c.val[x].status=v)};return function(v={},...x){const g=({id:E})=>{p({id:E,status:"removing"});const k=c.val.findIndex(M=>M.id===E);k!=-1&&c.val.splice(k,1)},h=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=i&&g({id:c.val[0].id}),c.val.push(k),setTimeout(()=>g(k),s)},S=E=>r({class:d.item,onclick:()=>g(E)},E.Component());return document.addEventListener("alert.add",E=>h(E.detail)),document.addEventListener("alert.remove",E=>g(E.detail)),r({class:I(d.stack,t==null?void 0:t.class,v.class)},n.loop(c,r(),S))}},$a=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Na(e,{deleteAfterDuration:2e4}),i=J(e),s=Ie(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},_a=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ba={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:_a,createComponent:$a}]},Oa=e=>{const t=Z(e);return()=>t(Ba)},Ra=({keyframes:e})=>({hideRight:e`
   from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
  `,showRight:e`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `}),Pa=e=>{const{bau:t}=e,{section:n,div:o,h1:a}=t.tags,i=ft(),s=J(e),r=Ra(e);return function(){const c=t.state(!0),l=o(),d=p=>{l.replaceChildren(i({parent:l,animationHide:`${r.hideRight} 0.5s`,animationShow:`${r.showRight} 0.5s`},o(p.val?"Ciao":"")))};return d(c),n({id:"animate"},o(a("Test Animate"),o(s({onclick:()=>{c.val=!c.val,d(c)}},()=>c.val?"Hide":"Show")),l))}};function Ht(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=p=>{s.val=!1,r.val=!0},d=o`
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
  `;return function(...u){let[{color:v,variant:x="outline",size:g="md",width:h=30,height:S=30,...E},...k]=q(u);return a({class:I(d,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:h,height:S,onload:c,onerror:l,class:I(v,x,g,d,t==null?void 0:t.class,E.class),...E}))}}const Ut=e=>{const{css:t}=e,n=Ht(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},La=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Ht(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},ja=`import avatar from "@grucloud/bau-ui/avatar";
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
`,za={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:ja,createComponent:La}],gridItem:Ut},Ha=e=>{const t=Z(e);return()=>t(za)};function Ve(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:d,onClose:p,...u},...v]=q(c);const x=S=>{h.style.opacity=1,h.showModal();const E=d.getBoundingClientRect(),k=h.getBoundingClientRect();E.x<a.innerWidth/2?h.style.left=E.left+"px":h.style.left=E.right-k.width+"px",E.y<a.innerHeight/2?h.style.top=E.top+E.height+"px":h.style.top=E.top-k.height+"px"},g=S=>{const E=()=>{h.close(),h.removeEventListener("transitionend",E)};h.addEventListener("transitionend",E),h.style.opacity=0},h=i({role:"presentation",class:I("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:S=>S.target===h&&(g(),p==null?void 0:p.call())},l);return h.closeDialog=g,h.openDialog=x,h}}const Ua=()=>ne.map(e=>`
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
    border: 2px solid var(--color-${e});
  };
}
&.input.soft.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
} 
&.input.solid.${e} {
  &:focus {
    border-color: var(--color-${e});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function We(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Ua()}
  `;return function(r){const{size:c="md",variant:l="outline",color:d="neutral",name:p,id:u,disabled:v,...x}=r;return a({...x,class:I("input",c,d,l,i,t==null?void 0:t.class,x.class)})}}const Ga=()=>ne.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Gt(e,t){const{bau:n,css:o}=e,{div:a,li:i,ul:s}=n.tags,r=Ve(e),c=J(e),l=We(e),d=xe(e),p=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0 0.3rem;
      }
    }
    & .content {
      height: fit-content;
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${Ga()}
  `,u=n.state(""),v=n.state(""),x=n.state(!1),g=n.state(0),h=()=>{x.val=!1};return function(...E){let[{variant:k="outline",color:M,size:_="md",id:R,label:N,placeholder:B,Option:$,options:H,getOptionLabel:K=({label:P})=>P,...G},...W]=q(E);const V=n.state(H),f=()=>{j.openDialog(),x.val=!0,v.val="",V.val=H},y=()=>{j.closeDialog(),x.val=!1,v.val=""},m=P=>{const{value:F}=P.target;v.val=F,F?V.val=H.filter(Q=>K(Q).match(new RegExp(`${F}`,"i"))):V.val=H},b=P=>{x.val?y():f()},w=({option:P,index:F})=>Q=>{u.val=K(P),g.val=F,y()},D=P=>{switch(console.log("onkeydown",P.key,g.val),P.key){case"Escape":y();break;case"ArrowDown":g.val<V.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=V.val.length-1:g.val--;break;case"Enter":u.val=K(V.val[g.val]),v.val="",y();break}},T=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":x,"aria-label":N,onclick:b,variant:k,color:M,size:_},()=>!u.val&&N,u),z=l({id:R,value:v,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":x,oninput:m,onkeydown:D,variant:k,color:M,size:_}),j=r({id:R,triggerEl:T,contentEl:(()=>a({class:I(k,M,_,"content")},z,()=>d({class:I(k,M,_)},V.val.map((P,F)=>i({class:()=>I(g.val==F&&"active"),onclick:w({option:P,index:F})},$(P))))))(),onClose:h});return a({...G,class:I("autocomplete",p,t==null?void 0:t.class,G==null?void 0:G.class)},T,j)}}const Ft=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Gt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},Fa=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Gt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Va=`import { Context } from "@grucloud/bau-ui/context";
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
`,Wa={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:Va,createComponent:Fa}],gridItem:Ft},Xa=e=>{const t=Z(e);return()=>t(Wa)};function Vt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",content:p,...u},...v]=q(r);return a({...u,class:I("badge",i,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:I(c,l,d)},p),...v)}}const Wt=e=>{const t=Vt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},Za=e=>{const{bau:t}=e,{section:n}=t.tags,o=Vt(e);return()=>n(o({content:"10"},"☏"))},Ka=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Ya={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ka,createComponent:Za}],gridItem:Wt},qa=e=>{const t=Z(e);return()=>t(Ya)};function Xt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,a:s,span:r}=n.tags,c=J(e),l=o`
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
  `;return function(...p){let[{color:u,variant:v="outline",size:x="md",items:g,...h},...S]=q(p);return a({...h,class:I(l,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:E,name:k})=>i((E?c:r)({href:E,color:u,variant:v,size:x,class:I(u,v,x)},k))))}}const Zt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Xt(e);return o=>n({...o,...t})},Ja=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Xt(e);return()=>n(a(o))},Qa=`import breadcrumbs, {
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
`,er={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Qa,createComponent:Ja}],gridItem:Zt},tr=e=>{const t=Z(e);return()=>t(er)},Kt=e=>{const t=J(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},nr=e=>{const{bau:t}=e,{section:n}=t.tags,o=J(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},or=`import button from "@grucloud/bau-ui/button";
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
`,ar={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:or,createComponent:nr}],gridItem:Kt},rr=e=>{const t=Z(e);return()=>t(ar)},sr=()=>ne.map(e=>`
&.button-group.${e} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function Xe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${sr()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:d,...p},...u]=q(r);return a({...p,class:I("button-group",c,d,l,i,t==null?void 0:t.class,p==null?void 0:p.class)},...u)}}const Yt=e=>{const t=["ONE","TWO","THREE"],n=J(e),o=Xe(e);return a=>o({...a},t.map(i=>n(a,i)))},ir=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=J(e),i=Xe(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},cr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,lr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:cr,createComponent:ir}],gridItem:Yt},ur=e=>{const t=Z(e);return()=>t(lr)};function qt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ne.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:p,...u},...v]=q(c);return a({...u,type:"date",class:I("calendar",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Jt=e=>{const t=qt(e);return n=>t({...n})},dr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=qt(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},pr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,mr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:pr,createComponent:dr}],gridItem:Jt},br=e=>{const t=Z(e);return()=>t(mr)};function Qt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
    display: inline-block;
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0.2rem;
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.5rem;
    }
  `;return function(...r){let[{size:c="md",variant:l="outline",color:d="neutral",onclick:p,...u},...v]=q(r);return a({...u,onclick:p,class:I("chip",i,c,l,d,p&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const en=e=>{const t=Qt(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},hr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Qt(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},gr=`import chip from "@grucloud/bau-ui/chip";
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
`,fr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:gr,createComponent:hr}],gridItem:en},vr=e=>{const t=Z(e);return()=>t(fr)};function tn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...p},...u]=q(r);return a({type:"checkbox",required:"required",...p,class:I(i,c,l,d,t==null?void 0:t.class,p==null?void 0:p.class)})}}const nn=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=tn(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},xr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=tn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},wr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,yr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:wr,createComponent:xr}],gridItem:nn},Er=e=>{const t=Z(e);return()=>t(yr)};function Cr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d,openState:p,...u},...v]=q(r);return a({class:I(i,t==null?void 0:t.class,u.class)},a({class:()=>I("overlay",p.val&&"overlay-open"),onclick:()=>{p.val=!1}}),a({class:()=>I("content",p.val&&"content-open")},v))}}const Sr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=Cr(e),s=J(e),r=wt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},kr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Tr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:kr,createComponent:Sr}]},Ar=e=>{const t=Z(e);return()=>t(Tr)},on=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=ze(e,{base:t.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},Mr=e=>{const{bau:t,config:n}=e,{section:o}=t.tags,a=t.state(window.location.pathname.replace(n.base,"")),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},s=ze(e,{base:n.base+"/components/drillDownMenu"});return()=>o(s({tree:i,pathnameState:a}))},Dr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, config } = context;
  const { section } = bau.tags;

  const pathnameState = bau.state(
    window.location.pathname.replace(config.base, "")
  );

  const tree: Tree = {
    data: { name: "Root Menu" },
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
    base: config.base + "/components/drillDownMenu",
  });

  return () => section(DrillDownMenu({ tree, pathnameState }));
};
`,Ir={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Dr,createComponent:Mr}],gridItem:on},Nr=e=>{const t=Z(e);return()=>t(Ir)};function an(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(d,...p){const{variant:u="outline",color:v="neutral",size:x="md",Component:g,disabled:h,...S}=d;return a({class:I(c.base,h&&c.disabled,t==null?void 0:t.class,d.class)},s({class:I(u,v,x)},g({disabled:h}),r({type:"file",disabled:h,...S})),i({class:"filename-display"}))}}const rn=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),d=an(e),p=v=>{const x=v.target.files[0];x?l.val=x.name:l.val="No file selected"},u=({disabled:v})=>r({class:I(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,v&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return v=>d({Component:u,name:"file",accept:"text/*",onchange:p,...v})},$r=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,d=n.state("No file selected"),p=an(e),u=x=>{const g=x.target.files[0];g?d.val=g.name:d.val="No file selected"},v=({disabled:x})=>c({class:I(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,x&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(p({Component:v,name:"file",accept:"text/*",onchange:u}),c("File selected: ",d))},_r=`import classNames from "@grucloud/bau-css/classNames";
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
`,Br={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:_r,createComponent:$r}],gridItem:rn},Or=e=>{const t=Z(e);return()=>t(Br)},sn=e=>{const t=We(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=We(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},Pr=`import input from "@grucloud/bau-ui/input";
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
`,Lr={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Pr,createComponent:Rr}],gridItem:sn},jr=e=>{const t=Z(e);return()=>t(Lr)},zr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Hr=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=xe(e),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},zr.map(s))},Ur=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Gr=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=xe(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Ur.map(r)))},Fr=`import list from "@grucloud/bau-ui/list";
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
`,Vr={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Fr,createComponent:Gr}],gridItem:Hr},Wr=e=>{const t=Z(e);return()=>t(Vr)};function cn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
    ${(()=>ne.map(r=>`
&.modal.plain.${r} {
  color: inherit;
}
&.modal.outline.${r} {
  color: inherit;
}
&.modal.soft.${r} {
  color: inherit;
}
&.modal.solid.${r} {

}
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p="md",...u},...v]=q(c);return a({class:I("modal",s,l,d,p,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const ln=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=J(e),c=cn(e),l=()=>o(Array(10).fill("").map((p,u)=>s(u+1,". Some text here"))),d=p=>{const u=c({id:"my-dialog",...p},a("Header"),l(),i(r({variant:"outline",color:p.color,onclick:()=>{u.close()}},"Cancel"),r({variant:"solid",color:p.color,onclick:()=>{u.close()}},"OK")));return u};return p=>{const u=d(p);return n(r({...p,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},Xr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=J(e),l=cn(e),d=()=>o(Array(10).fill("").map((u,v)=>s(v+1,". Some text here"))),p=l({id:"my-dialog"},a("Header"),d(),i(c({variant:"outline",color:r,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{p.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Zr=`import modal from "@grucloud/bau-ui/modal";
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
`,Kr={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Zr,createComponent:Xr}],gridItem:ln},Yr=e=>{const t=Z(e);return()=>t(Kr)},qr=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=J(e),r=Ve(e),c=()=>s({variant:"outline",color:"success",onclick:()=>p.open?p.closeDialog():p.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),d=c(),p=r({id:"my-popover-left",triggerEl:d,contentEl:l()});return()=>n(o(d,p))},Jr=`import popover from "@grucloud/bau-ui/popover";
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
`,Qr={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Jr,createComponent:qr}]},es=e=>{const t=Z(e);return()=>t(Qr)},ts=()=>ne.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function un(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=J(e),r=Ve(e),c=xe(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ts()}
  `,d=n.state(""),p=n.state(!1),u=n.state(0);return function(...x){let[{color:g="neutral",variant:h="outline",size:S="md",id:E,label:k,Option:M,options:_,getOptionLabel:R=({label:b})=>b,...N},...B]=q(x);const $=()=>{m.openDialog(),m.focus(),p.val=!0},H=()=>{m.closeDialog(),p.val=!1},K=()=>{p.val=!1},G=b=>{p.val?H():$()},W=({option:b,index:w})=>D=>{d.val=R(b),u.val=w,H()},V=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":u.val<_.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=_.length-1:u.val--;break;case"Enter":p.val?(d.val=R(_[u.val]),H()):$();break}},f=()=>c({tabindex:"0",class:I(g,h)},_.map((b,w)=>i({class:()=>I(u.val==w&&"active"),onclick:W({option:b,index:w})},M(b)))),y=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":p,"aria-label":k,onclick:G,color:g,variant:h,size:S},()=>!d.val&&k,d),m=r({id:E,triggerEl:y,contentEl:f(),onClose:K});return a({...N,class:I("select",g,S,l,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:V},y,m)}}const dn=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=un(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},ns=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=un(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},os=`import select from "@grucloud/bau-ui/select";
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
`,as={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:os,createComponent:ns}],gridItem:dn},rs=e=>{const t=Z(e);return()=>t(as)};function Ne(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>ne.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:p,...u},...v]=q(c);return a({...u,type:"range",class:I("slider",l,d,p,s,t==null?void 0:t.class,u.class)},...v)}}const pn=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ne(e);return i=>a({...i,oninput:o})},ss=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Ne(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},is=`import slider from "@grucloud/bau-ui/slider";
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
`,cs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Ne(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},ls=`import slider from "@grucloud/bau-ui/slider";
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
`,us=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),d=u=>{l.val=u==null?void 0:u.target.value},p=Ne(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,p({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},ds=`import slider from "@grucloud/bau-ui/slider";
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
`,ps={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:is,createComponent:ss},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ls,createComponent:cs},{title:"Vertical Mark",description:"A vertical slider with marks.",code:ds,createComponent:us}],gridItem:pn},ms=e=>{const t=Z(e);return()=>t(ps)},dt={sm:16,md:32,lg:64};function Ze(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:i,animateTransform:s,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:d="color-base",variant:p="outline",visibility:u=!0,...v}={}){return a({class:I(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:dt[l],height:dt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},i({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const mn=e=>{const t=Ze(e);return n=>t({...n})},bs=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ze(e);return()=>n(o({}))},hs=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,gs={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:hs,createComponent:bs}],gridItem:mn},fs=e=>{const t=Z(e);return()=>t(gs)},vs=()=>ne.map(e=>`
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
`);function bn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${vs()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d="md",...p},...u]=q(r);return a({...p,class:I("switch",i,c,l,d,t==null?void 0:t.class,p.class),type:"checkbox",required:"required"},...u)}}const hn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=bn(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},xs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=bn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},ws=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,ys={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ws,createComponent:xs}],gridItem:hn},Es=e=>{const t=Z(e);return()=>t(ys)},Cs=()=>ne.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function we(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:s,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),d=u=>c.val.find(v=>v.name==u),p={base:o`
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
      ${Cs()}
    `};return function(...v){let[{color:x,variant:g="plain",size:h,...S},...E]=q(v);const k=_=>{const{Header:R,disabled:N,name:B}=_;return r({class:()=>I(l.val.name==B&&"active",N&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},R(_))},M=i({class:I("tabs",p.base,g,h,x,t==null?void 0:t.class,S.class)},n.loop(c,s(),k),()=>l.val.Content?l.val.Content({}):"");return M.addEventListener("tab.select",_=>{var B,$;const{tabName:R}=_.detail,N=d(R);N&&((B=l.val.exit)==null||B.call(),l.val=N,($=N.enter)==null||$.call())},!1),M.addEventListener("tab.add",_=>{var N;const{tab:R}=_.detail;(N=R.enter)==null||N.call(),c.val.push(R)},!1),M.addEventListener("tab.remove",_=>{var N;const R=c.val.findIndex(B=>B.name==_.detail.tabName);R>0&&((N=c.val[R].exit)==null||N.call(),c.val.splice(R,1))},!1),M}}const gn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=we(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},Ss=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=we(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},ks=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Ts=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=we(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},As=`import tabs from "@grucloud/bau-ui/tabs";
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
`,fn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Ms=e=>{const{css:t}=e,n=we(e,{tabDefs:fn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Ds=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Is=e=>{const{css:t}=e,n=fn(e),o=we(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Ns=`import tabs from "@grucloud/bau-ui/tabs";
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
`,$s={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ks,createComponent:Ss},{title:"Extended Tabs",description:"An extended tabs.",code:As,createComponent:Ts},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Ds,createComponent:Ms},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Ns,createComponent:Is}],gridItem:gn},_s=e=>{const t=Z(e);return()=>t($s)};function ye(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
`;const s=o`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...c){let[{...l},...d]=q(c);return i({...l,class:I("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...d)}}const Bs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags;function p(h,S,E,k,M){return{name:h,calories:S,fat:E,carbs:k,protein:M}}const u=[p("Frozen yoghurt",159,6,24,4),p("Ice cream sandwich",237,9,37,4.3),p("Eclair",262,16,24,6),p("Cupcake",305,3.7,67,4.3),p("Gingerbread",356,16,49,3.9)],v=({name:h,calories:S})=>s(i(h),i({class:n`
            text-align: right;
          `},S)),x=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=ye(e,{class:n`
      max-width: 650px;
    `});return()=>o(g(r(d("Basic Table"),x(),l(u.map(v)))))},Os=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Rs=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Ps=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:x,calories:g})=>s(i(x),i({class:n`
            text-align: right;
          `},g)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=ye(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(v(r(d("Table Dense"),u(),l(Rs.map(p)))))},Ls=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const js=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],zs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=t.tags,p=({name:x,calories:g})=>s(i(x),i({class:n`
            text-align: right;
          `},g)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=ye(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(v(r(d("Table Zebra"),u(),l(js.map(p)))))},Hs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Us={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Os,createComponent:Bs},{title:"Dense",description:"A dense table.",code:Ls,createComponent:Ps},{title:"Zebra",description:"A zebra table.",code:Hs,createComponent:zs}]},Gs=e=>{const t=Z(e);return()=>t(Us)};function vn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=Xe(e),s=J(e),r=Ze(e),c=o`
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
  `,l=({label:x,icon:g,...h})=>s({"aria-label":x,title:x,...h},g),d=({count:x,totalCount:g,page:h,rowsPerPage:S})=>a({class:"pages-numbers"},Number(h-1)*Number(S)+(x>0?1:0),"-",Math.min(h*S,g)," of ",g),p=({count:x,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(x>0?1:0),"-",g*h),u=x=>x<=1,v=(x,g,h)=>x>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:S=0,page:E=1,rowsPerPage:k=50,onPageChange:M,isLoading:_=!1,disableFirst:R=()=>u(E),disablePrevious:N=()=>u(E),disableNext:B=()=>v(E,S,k),disableLast:$=()=>v(E,S,k),...H},...K]=q(g);const G=Math.max(0,Math.ceil(S/k)),W=M({page:1}),V=M({page:E-1}),f=M({page:E+1}),y=M({page:G}),m=[{label:"First",icon:"⟪",onclick:W,disabled:R()},{label:"Previous",icon:"⟨",onclick:V,disabled:N()},{label:"Next",icon:"⟩",onclick:f,disabled:B()},{label:"Last",icon:"⟫",onclick:y,disabled:$()}];return a({...H,class:I("table-pagination",c,_&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},r({class:"spinner",visibility:_,size:"md"}),S>0?d({count:h,totalCount:S,page:E,maxPages:G,rowsPerPage:k}):p({count:h,page:E,maxPages:G,rowsPerPage:k}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Fs=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Vs=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=Fs(45),d=({name:E,email:k})=>i(a(E),a(k)),p=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=vn(e),v=ye(e,{class:n`
      max-width: 650px;
    `}),x=t.state(l),g=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>x.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),S=({page:E})=>k=>{g.val.page=E};return()=>v(s(p(),()=>c(h.val.map(d))),()=>u({...g.val,onPageChange:S}))},Ws=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,d=t.state(!1),p=t.state([]),u=t.state(""),v=t.derive(()=>p.val.length),x=t.state(1),g=t.state(10),h=t.derive(()=>p.val),S=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,E=({page:$})=>H=>{x.val=$,k(S({page:$,per_page:g.val}))};k(S({page:1,per_page:g.val}));async function k($){try{d.val=!0;const H=await fetch($,{});if(H.ok){const K=await H.json();p.val=K;return}throw H}catch(H){u.val=H.message}finally{d.val=!1}}const M=({name:$,description:H,stargazers_count:K})=>i(a($),a(H),a({class:n`
            text-align: right;
          `},K)),_=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),R=vn(e),N=ye(e,{class:n`
      min-width: 650px;
    `}),B=({message:$})=>l($);return()=>N(()=>R({rowsPerPage:g.val,page:x.val,count:v.val,totalCount:-1,isLoading:d.val,onPageChange:E,disableNext:()=>!1}),s(_(),()=>u.val&&B({message:u.val}),()=>c(h.val.map(M))))},Xs=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=Vs(e),l=Ws(e),d=(...p)=>a({class:n`
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
        `},...p);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),d(l()),i("Simple Pagination"),d(c()))};function Ke(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
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
      z-index: 2;
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
  `;return function(...c){let[{titleEl:l,side:d="bottom-start",color:p="neutral",variant:u="outline",size:v="md",...x},...g]=q(c);const h=i({class:I("container",...d.split("-"))},i({class:I("content",p,u,v),role:"tooltip"},l)),S=N=>`move-to-${N}`,E=(N,B,$)=>{if(N()){const H=S(B);h.classList.add(H),h.classList.add(B),h.classList.remove($)}},k=(N,B)=>{const $=S(N);h.classList.contains($)&&(h.classList.remove($),h.classList.add(B),h.classList.remove(N))},M=N=>{const B=h.getBoundingClientRect();E(()=>B.x<0,"right","left"),E(()=>B.x+B.width>a.innerWidth,"left","right"),E(()=>B.y<0,"bottom","top"),E(()=>B.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},_=N=>{h.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return i({...x,class:I("tooltip",s,t==null?void 0:t.class,x==null?void 0:x.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",M),N.addEventListener("mouseout",_)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",M),N.removeEventListener("mouseout",_)}},...g,h)}}const xn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,s=J(e),r=Ke(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Zs=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=J(e),s=Ke(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Ks=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ys=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,s=J(e),r=Ke(e),c=()=>o(a("A ",i("tooltip")," can be any component")),l=()=>[o({class:n`
          display: flex;
          justify-content: space-around;
        `},r({side:"top-start",titleEl:c()},s("top-start")),r({side:"top-centered",titleEl:c()},s("top-centered")),r({side:"top-end",titleEl:c()},s("top-end"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},r({side:"left-start",titleEl:c()},s("left-start")),r({side:"right-start",titleEl:c()},s("right-start"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},r({side:"left-centered",titleEl:c()},s("left-centered")),r({side:"right-centered",titleEl:c()},s("right-centered"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},r({side:"left-end",titleEl:c()},s("left end")),r({side:"right-end",titleEl:c()},s("right end"))),o({class:n`
          display: flex;
          justify-content: space-around;
        `},r({side:"bottom-start",titleEl:c()},s("bottom start")),r({side:"bottom-centered",titleEl:c()},s("bottom centered")),r({side:"bottom-end",titleEl:c()},s("bottom end")))];return()=>l()},qs=`import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, p, em } = bau.tags;
  const Button = button(context);

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(p("A ", em("tooltip"), " can be any component"));

  const TooltipGrid = () => [
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-around;
        \`,
      },
      Tooltip(
        { side: "top-start", titleEl: TooltipContent() },
        Button("top-start")
      ),
      Tooltip(
        { side: "top-centered", titleEl: TooltipContent() },
        Button("top-centered")
      ),
      Tooltip({ side: "top-end", titleEl: TooltipContent() }, Button("top-end"))
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
        Button("left-start")
      ),
      Tooltip(
        { side: "right-start", titleEl: TooltipContent() },
        Button("right-start")
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
        Button("left-centered")
      ),
      Tooltip(
        { side: "right-centered", titleEl: TooltipContent() },
        Button("right-centered")
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
        Button("left end")
      ),
      Tooltip(
        { side: "right-end", titleEl: TooltipContent() },
        Button("right end")
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
        Button("bottom start")
      ),
      Tooltip(
        { side: "bottom-centered", titleEl: TooltipContent() },
        Button("bottom centered")
      ),
      Tooltip(
        { side: "bottom-end", titleEl: TooltipContent() },
        Button("bottom end")
      )
    ),
  ];

  return () => TooltipGrid();
};
`,Js={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Ks,createComponent:Zs},{title:"Grid",description:"Various tooltip position",code:qs,createComponent:Ys}],gridItem:xn},Qs=e=>{const t=Z(e);return()=>t(Js)},wn=e=>{const t=je(e);return n=>t(n)},ei=e=>{const{bau:t}=e,{section:n}=t.tags,o=je(e);return()=>n(o({}))},ti=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,ni={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:ti,createComponent:ei}],gridItem:wn},oi=e=>{const t=Z(e);return()=>t(ni)},ai=({css:e,createGlobalStyles:t})=>(t`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
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
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      background: inherit;

      & li {
        padding-left: var(--menu-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all var(--transition-fast) ease-in-out;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
          }
          &::after {
            transition: transform var(--transition-fast) linear;
            font-size: x-large;
            margin-right: 1rem;
          }
          > a,
          span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--menu-link-padding-vertical)
              var(--menu-link-padding-horizontal);
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `,expanded:e`
      > div {
        &::after {
          content: "\u203A";
          transform: rotate(90deg);
        }
      }
    `,collapsed:e`
      > div {
        &::after {
          content: "\u203A";
        }
      }
    `});function yn(e,t){const{bau:n,css:o,createGlobalStyles:a,window:i}=e,{renderMenuItem:s}=t,{ul:r,li:c,nav:l,div:d}=n.tags,p=ai({css:o,createGlobalStyles:a}),u=({element:h,closeState:S})=>{h.scrollHeight!=0&&(S.val?v(h):x(h))};function v(h){h.style.height=h.scrollHeight+"px";const S=()=>{h.removeEventListener("transitionend",S)};h.addEventListener("transitionend",S),i.requestAnimationFrame(()=>{h.style.height="0px"})}function x(h){const S=()=>{h.removeEventListener("transitionend",S),h.style.height=null};h.addEventListener("transitionend",S),h.style.height=h.scrollHeight+"px"}const g=({depth:h=1,maxDepth:S,color:E,variant:k,size:M})=>_=>{const{children:R,expanded:N}=_,B=n.state(!N);return c({class:()=>I(R?B.val?p.collapsed:p.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:$=>{R&&(B.val=!B.val)}},s(_.data)),R&&h<S&&r({class:I(E,M),bauMounted:({element:$})=>{B.val&&($.style.height="0px")},"aria-expanded":({element:$})=>(u({element:$,closeState:B}),!B.val)},R.map(g({depth:h+1,maxDepth:S}))))};return function({tree:S,maxDepth:E=1/0,size:k="md",variant:M="plain",color:_="neutral",...R}){return l({class:I(p.nav,k,M,_,t==null?void 0:t.class,R.class)},S.children&&r(S.children.map(g({maxDepth:E,color:_,variant:M,size:k}))))}}const En=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=yn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},ri=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=yn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},si=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,ii={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:si,createComponent:ri}],gridItem:En},ci=e=>{const t=Z(e);return()=>t(ii)},li=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=Pt(e),d=J(e),p=[{name:"Accordion",Item:Lt(e)},{name:"Alert",Item:zt(e)},{name:"Autocomplete",Item:Ft(e)},{name:"Avatar",Item:Ut(e)},{name:"Badge",Item:Wt(e)},{name:"Breadcrumbs",Item:Zt(e)},{name:"Button",Item:Kt(e)},{name:"Button Group",Item:Yt(e)},{name:"Calendar",Item:Jt(e)},{name:"Checkbox",Item:nn(e)},{name:"Chip",Item:en(e)},{name:"DrillDown Menu",Item:on(e)},{name:"File Input",Item:rn(e)},{name:"Input",Item:sn(e)},{name:"Modal",Item:ln(e)},{name:"Select",Item:dn(e)},{name:"Slider",Item:pn(e)},{name:"Spinner",Item:mn(e)},{name:"Switch",Item:hn(e)},{name:"Tabs",Item:gn(e)},{name:"Theme Switch",Item:wn(e)},{name:"Tooltip",Item:xn(e)},{name:"Tree View",Item:En(e)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},p.map(({name:u})=>c(d({color:"primary",variant:"solid",href:`#${u}`},u)))),p.map(u=>a({id:u.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(u))))},ui=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:io(e)})},{path:"GettingStarted",action:t=>({title:"Getting Started",component:pa(e)})},{path:"components",action:()=>({title:"Component",component:li(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:ya(e)})},{path:"alert",action:()=>({title:"Alert",component:Ia(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Oa(e)})},{path:"animate",action:()=>({title:"Animate",component:Pa(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Xa(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ha(e)})},{path:"badge",action:()=>({title:"Badge",component:qa(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:tr(e)})},{path:"button",action:()=>({title:"Button",component:rr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:ur(e)})},{path:"calendar",action:()=>({title:"Calendar",component:br(e)})},{path:"chip",action:()=>({title:"Chip",component:vr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Er(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Ar(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Nr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Or(e)})},{path:"input",action:()=>({title:"Input",component:jr(e)})},{path:"list",action:()=>({title:"List",component:Wr(e)})},{path:"modal",action:()=>({title:"Modal",component:Yr(e)})},{path:"popover",action:()=>({title:"Popover",component:es(e)})},{path:"select",action:()=>({title:"Select",component:rs(e)})},{path:"slider",action:()=>({title:"Slider",component:ms(e)})},{path:"spinner",action:()=>({title:"Spinner",component:fs(e)})},{path:"switch",action:()=>({title:"Switch",component:Es(e)})},{path:"table",action:()=>({title:"Table",component:Gs(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Xs(e)})},{path:"tabs",action:()=>({title:"Tabs",component:_s(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Qs(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:oi(e)})},{path:"treeView",action:()=>({title:"Tree View",component:ci(e)})}]},{path:"pages",action:t=>({title:"Pages",component:uo(e)})}],di=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),pi=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const d=o.location.pathname.replace(n,""),{title:p,component:u,Layout:v=t}=l.resolve({pathname:d});i.pathname.val=d,s.val=u,document.title=`${p}`}},mi=e=>{const{createGlobalStyles:t}=e;gt(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  `},bi=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${ht({dark:!0})}
}
  `};Hn();const Ye={title:"Bau",base:"/bau/bau-ui"},ie=Kn({config:Ye}),{bau:pt}=ie;ie.states={pathname:pt.state(window.location.pathname.replace(Ye.base,"")),drawerOpen:pt.state(!0)};mi(ie);bi(ie);_n({routes:ui({context:ie}),onLocationChange:pi({context:ie,LayoutDefault:oo(ie),config:Ye}),notFoundRoute:di(ie)});
