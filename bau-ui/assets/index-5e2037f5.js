(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Mn=(e,t)=>({...e,paths:[...t,e.path]}),mt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Mn(o,e);return n?[a,...mt({paths:[...e,o.path],routes:n})]:a}),Dn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},In=({routes:e=[],notFoundRoute:t})=>{const n=mt({routes:e}).map(o=>({...o,regex:Dn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function Nn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=In({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,r)=>{a.apply(i,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,r=i.getAttribute("href");i.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const bt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],$n=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],_n=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Je=e=>`var(--color-${e})`,Bn=e=>`var(--color-${e}-lightest)`,On=()=>bt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${Je(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Bn(e)};
}
.solid.${e} {
  background-color: ${Je(e)};
}
`).join(`
`),Rn=e=>100-e*10,Pn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${Rn(t)}%);`).join(`
`),ht=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Ln=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...$n.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),..._n.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function jn({createGlobalStyles:e},{colorPalette:t=bt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>Ln([n,o])).join(`
`)}
      ${Pn()}
      ${ht({})}
      ${On()}
      
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
  `}function zn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Pe=e=>Object.prototype.toString.call(e??0).slice(8,-1),Hn=e=>Pe(e)=="Object",Qe=e=>Pe(e)=="Function",Be=e=>["Object","Array"].includes(Pe(e)),et=Object.getPrototypeOf,Oe=e=>pe(e)?e.val:e,pe=e=>e==null?void 0:e.__isState,Un=["splice","push","pop","shift","unshift","sort","reverse"],Se=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const q=e=>!pe(e[0])&&Hn(e[0])?e:[{},...e];function Fn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,r=!1,s,c=f=>n.createElement(f),l=(f,y,m)=>{let b=s;s=y;let x=f(m);return s=b,x},p=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(y=>{var m;return(m=y.element)==null?void 0:m.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},d=(f,y,m,b,x,D)=>{var T;if(r){i.add(f);return}for(let z of f.bindings){let{deps:O,element:j,renderInferred:P,render:G,renderItem:Q}=z;if(Q&&y)(T=w(j,b,(...ae)=>h(Q(...ae)),m,x,D)[y])==null||T.call();else{let ae=P?P({element:j}):G({element:j,renderItem:Q})(...O.map(Oe));ae!==j&&j.replaceWith(z.element=h(ae))}}k(f),p()},u=(f,y,m=[])=>({get(b,x,D){var T;if(s==null||s.add(f),x==="_isProxy")return!0;if(!((T=b[x])!=null&&T._isProxy)&&!pe(b[x])&&Be(b[x]))b[x]=new Proxy(b[x],u(f,y,[...m,x]));else if(Un.includes(x)){let z=b[x];return(...O)=>{let j=z.apply(b,O);return d(f,x,j,O,y,m),j}}return Reflect.get(b,x,D)},set(b,x,D,T){let z=Reflect.set(b,x,D,T);return d(f,"setItem",z,{prop:x,value:D},y,[...m,x]),z}}),v=(f,y)=>new Proxy(y,u(f,y)),w=(f,y,m,b,x,D)=>{let T=()=>f.replaceChildren(...Se(b,m)),z=O=>f[O]&&f.removeChild(f[O]);return{assign:T,sort:T,reverse:T,setItem:()=>{var j;let O=D[0];(j=f.children[O])==null||j.replaceWith(m(x[O],O))},push:()=>f.append(...Se(y,(O,j)=>m(O,x.length+j))),unshift:()=>f.prepend(...Se(y,m)),pop:()=>z("lastChild"),shift:()=>z("firstChild"),splice:()=>{let[O,j,...P]=y;const{length:G}=f.children;for(let Q=O>=0?Math.min(O+j-1,G-1):G-1;Q>=(O>=0?O:G+O);Q--)f.children[Q].remove();if(P.length){let Q=P.forEach((ae,ye)=>m(ae,O+ye));f.children[O]?f.children[O].after(...Q):f.append(...Q)}}}},g=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let y=this;return s==null||s.add(y),y.valProxy??(y.valProxy=Be(f)?v(y,f):f,y.valProxy)},set val(y){let m=this,b=m.val;Be(y)?(m.valProxy=v(m,y),d(m,"assign",y)):y!==b&&(m.valProxy=y,d(m)),m.oldVal=b}}),h=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),S=(f,y)=>{let m=new Set;return y.val=l(f,m),m},E=f=>{let y=g(),m=S(f,y);y.computed=!0;for(let b of m)b.listeners.push({computed:f,deps:m,state:y});return y},k=f=>{for(let y of[...f.listeners])S(y.computed,y.state)},M=(f,...y)=>{if(y.length){let m=[];for(let b of y.flat(1/0))b!=null&&m.push(pe(b)?F({deps:[b],render:()=>x=>x}):Qe(b)?K({renderInferred:b}):h(b));f.append(...m)}},_={},R=(f,y)=>f&&(Object.getOwnPropertyDescriptor(f,y)??R(et(f),y)),N=(f,y,m)=>{var b;return _[f+","+y]??(_[f+","+y]=((b=R(m,y))==null?void 0:b.set)??0)},B=(f,y)=>new MutationObserver((m,b)=>{m.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find(D=>D===f&&(y({element:f}),b.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),$=f=>new Proxy(function(m,...b){var z;let[x,...D]=q(b),T=f?n.createElementNS(f,m):c(m);for(let[O,j]of Object.entries(x)){if(O.startsWith("bau"))continue;let P=N(m,O,et(T))?G=>T[O]=G:G=>T.setAttribute(O,G);j==null||(pe(j)?F({deps:[j],render:()=>()=>(P(j.val),T)}):Qe(j)&&(!O.startsWith("on")||j.isDerived)?K({renderInferred:()=>(P(j({element:T})),T)}):j.renderProp?F({deps:j.deps,render:()=>()=>(P(j.renderProp({element:T})(...j.deps.map(Oe))),T)}):P(j))}return M(T,...D),(z=x.bauCreated)==null||z.call(x,{element:T}),x.bauMounted&&t.requestAnimationFrame(()=>x.bauMounted({element:T})),x.bauUnmounted&&t.requestAnimationFrame(()=>B(T,x.bauUnmounted)),T},{get:(y,m)=>y.bind(void 0,m)}),H=(f,y,m)=>{f.element=h(m);for(let b of y)pe(b)&&(a.add(b),b.bindings.push(f));return f.element},K=({renderInferred:f,element:y})=>{let m=new Set,b=l(f,m,{element:y});return H({renderInferred:f},m,b)},F=({deps:f,element:y,render:m,renderItem:b})=>H({deps:f,render:m,renderItem:b},f,m({element:y,renderItem:b})(...f.map(Oe))),V=(f,y,m)=>F({deps:[f],render:({renderItem:b})=>x=>(y.append(...Se(x,b)),y),renderItem:m}),W=f=>{r=!0,f(),r=!1,i.forEach(d),i.clear()};return{tags:$(),tagsNS:$,state:g,bind:F,loop:V,derive:E,stateSet:a,batch:W}}const Gn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Wn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Vn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Xn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const r=Vn(a,i),s=Gn(r);return!t.getElementById(s)&&Wn(t,e==null?void 0:e.target,s,o(s,r)),s};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Zn(e){return{bau:Fn(),...Xn(),tr:n=>n,window,...e}}function I(...e){return e.filter(t=>t).join(" ")}function J(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...r){let[{color:s,variant:c,size:l="md",disabled:p,href:d,...u},...v]=q(r);return(d?n.tags.a:n.tags.button)({...u,class:I("button",a.root,c,l,s,d?a.a:a.button,p&&a.disabled,t==null?void 0:t.class,u.class),disabled:p,href:d,...!d&&{type:"button"}},v)}}const ne=["neutral","primary","success","danger","warning"],Kn=["plain","outline","solid"],Yn="light",qn=()=>ne.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Le(e,t){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,r=p=>{a.document.documentElement.setAttribute("data-theme",p),localStorage.setItem("theme",p)},s=()=>{try{return localStorage.getItem("theme")}catch{}},c=s();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(Yn);const l=o`
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
    ${qn()}
  `;return function(...d){let[{color:u,variant:v="outline",size:w="md",...g},...h]=q(d);return i({required:"required",title:"Switch Theme",...g,class:I("theme-switch",u,v,w,l,t==null?void 0:t.class,g.class),type:"checkbox",checked:s()=="dark",onclick:S=>{r(S.target.checked?"dark":"light")}},...h)}}function Jn(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:r,header:s,h1:c,div:l,a:p,img:d,b:u,ul:v,li:w}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),S=i.drawerOpen,E=J(e,{class:o`
      background: transparent;
    `}),k=Le(e),M=()=>r(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),_=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>S.val=!S.val},M()),p({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),R=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},k(),E({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},_(),R())}}function Qn({tr:e,bau:t,css:n}){const{footer:o,span:a,a:i,ul:r,li:s,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.41.0"))}}function gt(e,t={}){return function({parent:o,animationHide:a,animationShow:i},r){r.style.animation=i;const s=()=>{r.removeEventListener("animationend",s),r.style.animation=""};return r.addEventListener("animationend",s),new MutationObserver((c,l)=>{c.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(d=>{o.style.position="relative";const u=d.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=a,p.previousSibling?p.previousSibling.after(u):p.nextSibling?p.nextSibling.before(u):p.target&&p.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),l.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),r}}function ve(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,r=o`
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
    ${(()=>ne.map(s=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:p="plain",size:d,...u},...v]=q(c);return a({...u,class:I("list",r,l,p,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const tt="0.3s",ft=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(ft({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},vt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=vt(e)(t.children[o]);if(a)return a}},eo=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function je(e,t){const{bau:n,css:o,window:a}=e,{base:i=""}=t,r=({currentTree:F,data:V,onclickBack:W})=>h(M({variant:"plain",href:`${i}${F.parentTree.children[0].data.href}`,onclick:W({currentTree:F}),class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),M({variant:"plain",href:`${i}${V.href}`,class:o`
            flex-grow: 1;
          `},V.name)),s=({data:{name:F,href:V},children:W=[]})=>M({href:`${i}${V}`,"data-ischild":W.length==0},F),c=({subTree:F})=>{var V;return a.location.pathname.replace(i,"")===((V=F==null?void 0:F.data)==null?void 0:V.href)},{renderHeader:l=r,renderMenuItem:p=s,isActive:d=c}=t,{ul:u,li:v,nav:w,div:g,header:h,a:S}=n.tags,E=gt(),k=ve(e),M=J(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:_,hideToRight:R,showFromRight:N,showFromLeft:B}=eo(e),$=o`
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
      }
    }
  `,H=({variant:F,color:V,size:W,onclickItem:f,onclickBack:y,currentTree:m,pathnameState:b})=>{const{children:x,parentTree:D,data:T}=m;return g({class:I("drillDownMenu",F,V,W)},D&&l({data:T,currentTree:m,onclickBack:y}),x&&k({class:I(F,V,W)},x.map(z=>v({class:()=>I(z.children&&"has-children",d({pathname:b.val,subTree:z})&&"active"),onclick:z.children&&f({currentTree:z})},p(z)))))},K=({tree:F,pathname:V})=>{let W=ft({})(F),f=vt(V)(W);return f||(console.log("drilldown no sub tree",V),f=W),f};return function(V){const{variant:W="plain",color:f="neutral",size:y="md",tree:m,pathnameState:b=n.state(a.location.pathname),...x}=V,D=({currentTree:j})=>P=>z(P,O,j,!0),T=({currentTree:j})=>P=>z(P,O,j.parentTree,!1),z=(j,P,G,Q)=>{P.firstChild.replaceChildren(E({parent:P,animationHide:`${Q?_:R} ${tt}`,animationShow:`${Q?N:B} ${tt}`},H({variant:W,color:f,size:y,currentTree:G,onclickItem:D,onclickBack:T,pathnameState:b})))},O=w({class:I($,t==null?void 0:t.class,x.class)},()=>H({variant:W,color:f,size:y,currentTree:K({tree:m,pathname:b.val}),onclickItem:D,onclickBack:T,pathnameState:b}));return O}}const to={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function xt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:r}=e,{div:s,ul:c,li:l,nav:p,a:d,span:u}=n.tags;let v=!1;const w=je(e,{base:a.base});return function(){return s({bauMounted:({element:h})=>{r.innerWidth<=640&&(v=!0,i.drawerOpen.val=!1)},onclick:h=>{v&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:I(o`
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
          `)},w({tree:to,pathnameState:i.pathname}))}}const no=e=>{const{bau:t,css:n,states:o}=e,{div:a}=t.tags,i=Jn(e),r=xt(e),s=Qn(e);return function({componentState:l}){return a({class:n`
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
        `},i(),r(),a({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>l.val&&l.val({})),s())}};function oo(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:r,p:s}=t.tags;J(e);const c=n`
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
  `;return function({name:p,text:d,tagLine:u}){return a({class:c},i(p),r(d),s(u))}}function ao(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,r=n`
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
  `,s=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:r},l.map(s))}}function ro(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:r}=t.tags,s=oo(e),c=ao(e),l=J(e),p=n``,d=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),i("3 variant: plain, outline and primary"),i("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[i("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[i("The component bundle size is about 8x smaller compared to popular React UI component library."),i("Faster download time for users."),i("Save in bandwith fees for the operator."),i("Suitable for low bandwith network and low cost device.")]}];return function({}){return a({class:p},s({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:d}))}}function so(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function wt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&wt(n)}),e}class nt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function yt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function se(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const io="</span>",ot=e=>!!e.scope,co=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class lo{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=yt(t)}openNode(t){if(!ot(t))return;const n=co(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){ot(t)&&(this.buffer+=io)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const at=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class ze{constructor(){this.rootNode=at(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=at({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{ze._collapse(n)}))}}class uo extends ze{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new lo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ge(e){return e?typeof e=="string"?e:e.source:null}function Et(e){return ue("(?=",e,")")}function po(e){return ue("(?:",e,")*")}function mo(e){return ue("(?:",e,")?")}function ue(...e){return e.map(n=>ge(n)).join("")}function bo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function He(...e){return"("+(bo(e).capture?"":"?:")+e.map(o=>ge(o)).join("|")+")"}function Ct(e){return new RegExp(e.toString()+"|").exec("").length-1}function ho(e,t){const n=e&&e.exec(t);return n&&n.index===0}const go=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ue(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=ge(o),r="";for(;i.length>0;){const s=go.exec(i);if(!s){r+=i;break}r+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\"&&s[1]?r+="\\"+String(Number(s[1])+a):(r+=s[0],s[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(t)}const fo=/\b\B/,St="[a-zA-Z]\\w*",Fe="[a-zA-Z_]\\w*",kt="\\b\\d+(\\.\\d+)?",Tt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",At="\\b(0b[01]+)",vo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",xo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ue(t,/.*\b/,e.binary,/\b.*/)),se({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},fe={begin:"\\\\[\\s\\S]",relevance:0},wo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[fe]},yo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[fe]},Eo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ae=function(e,t,n={}){const o=se({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=He("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ue(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Co=Ae("//","$"),So=Ae("/\\*","\\*/"),ko=Ae("#","$"),To={scope:"number",begin:kt,relevance:0},Ao={scope:"number",begin:Tt,relevance:0},Mo={scope:"number",begin:At,relevance:0},Do={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[fe,{begin:/\[/,end:/\]/,relevance:0,contains:[fe]}]}]},Io={scope:"title",begin:St,relevance:0},No={scope:"title",begin:Fe,relevance:0},$o={begin:"\\.\\s*"+Fe,relevance:0},_o=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var ke=Object.freeze({__proto__:null,MATCH_NOTHING_RE:fo,IDENT_RE:St,UNDERSCORE_IDENT_RE:Fe,NUMBER_RE:kt,C_NUMBER_RE:Tt,BINARY_NUMBER_RE:At,RE_STARTERS_RE:vo,SHEBANG:xo,BACKSLASH_ESCAPE:fe,APOS_STRING_MODE:wo,QUOTE_STRING_MODE:yo,PHRASAL_WORDS_MODE:Eo,COMMENT:Ae,C_LINE_COMMENT_MODE:Co,C_BLOCK_COMMENT_MODE:So,HASH_COMMENT_MODE:ko,NUMBER_MODE:To,C_NUMBER_MODE:Ao,BINARY_NUMBER_MODE:Mo,REGEXP_MODE:Do,TITLE_MODE:Io,UNDERSCORE_TITLE_MODE:No,METHOD_GUARD:$o,END_SAME_AS_BEGIN:_o});function Bo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Oo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Ro(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Bo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Po(e,t){Array.isArray(e.illegal)&&(e.illegal=He(...e.illegal))}function Lo(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function jo(e,t){e.relevance===void 0&&(e.relevance=1)}const zo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ue(n.beforeMatch,Et(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Ho=["of","and","for","in","not","or","if","then","parent","list","value"],Uo="keyword";function Mt(e,t,n=Uo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Mt(e[i],t,i))}),o;function a(i,r){t&&(r=r.map(s=>s.toLowerCase())),r.forEach(function(s){const c=s.split("|");o[c[0]]=[i,Fo(c[0],c[1])]})}}function Fo(e,t){return t?Number(t):Go(e)?0:1}function Go(e){return Ho.includes(e.toLowerCase())}const rt={},le=e=>{console.error(e)},st=(e,...t)=>{console.log(`WARN: ${e}`,...t)},de=(e,t)=>{rt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),rt[`${e}/${t}`]=!0)},Te=new Error;function Dt(e,t,{key:n}){let o=0;const a=e[n],i={},r={};for(let s=1;s<=t.length;s++)r[s+o]=a[s],i[s+o]=!0,o+=Ct(t[s-1]);e[n]=r,e[n]._emit=i,e[n]._multi=!0}function Wo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw le("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Te;if(typeof e.beginScope!="object"||e.beginScope===null)throw le("beginScope must be object"),Te;Dt(e,e.begin,{key:"beginScope"}),e.begin=Ue(e.begin,{joinWith:""})}}function Vo(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw le("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Te;if(typeof e.endScope!="object"||e.endScope===null)throw le("endScope must be object"),Te;Dt(e,e.end,{key:"endScope"}),e.end=Ue(e.end,{joinWith:""})}}function Xo(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Zo(e){Xo(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Wo(e),Vo(e)}function Ko(e){function t(r,s){return new RegExp(ge(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,s]),this.matchAt+=Ct(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const s=this.regexes.map(c=>c[1]);this.matcherRe=t(Ue(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(s);if(!c)return null;const l=c.findIndex((d,u)=>u>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];const c=new n;return this.rules.slice(s).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[s]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,c){this.rules.push([s,c]),c.type==="begin"&&this.count++}exec(s){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(s);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(s)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const s=new o;return r.contains.forEach(c=>s.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&s.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&s.addRule(r.illegal,{type:"illegal"}),s}function i(r,s){const c=r;if(r.isCompiled)return c;[Oo,Lo,Zo,zo].forEach(p=>p(r,s)),e.compilerExtensions.forEach(p=>p(r,s)),r.__beforeBegin=null,[Ro,Po,jo].forEach(p=>p(r,s)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=Mt(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),s&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ge(c.end)||"",r.endsWithParent&&s.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+s.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(p){return Yo(p==="self"?r:p)})),r.contains.forEach(function(p){i(p,c)}),r.starts&&i(r.starts,s),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=se(e.classNameAliases||{}),i(e)}function It(e){return e?e.endsWithParent||It(e.starts):!1}function Yo(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return se(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:It(e)?se(e,{starts:e.starts?se(e.starts):null}):Object.isFrozen(e)?se(e):e}var qo="11.8.0";class Jo extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Re=yt,it=se,ct=Symbol("nomatch"),Qo=7,Nt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:uo};function c(m){return s.noHighlightRe.test(m)}function l(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const x=s.languageDetectRe.exec(b);if(x){const D=$(x[1]);return D||(st(i.replace("{}",x[1])),st("Falling back to no-highlight mode for this block.",m)),D?x[1]:"no-highlight"}return b.split(/\s+/).find(D=>c(D)||$(D))}function p(m,b,x){let D="",T="";typeof b=="object"?(D=m,x=b.ignoreIllegals,T=b.language):(de("10.7.0","highlight(lang, code, ...args) has been deprecated."),de("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),T=m,D=b),x===void 0&&(x=!0);const z={code:D,language:T};f("before:highlight",z);const O=z.result?z.result:d(z.language,z.code,x);return O.code=z.code,f("after:highlight",O),O}function d(m,b,x,D){const T=Object.create(null);function z(C,A){return C.keywords[A]}function O(){if(!L.keywords){ee.addText(Y);return}let C=0;L.keywordPatternRe.lastIndex=0;let A=L.keywordPatternRe.exec(Y),U="";for(;A;){U+=Y.substring(C,A.index);const X=oe.case_insensitive?A[0].toLowerCase():A[0],te=z(L,X);if(te){const[re,Tn]=te;if(ee.addText(U),U="",T[X]=(T[X]||0)+1,T[X]<=Qo&&(Ce+=Tn),re.startsWith("_"))U+=A[0];else{const An=oe.classNameAliases[re]||re;G(A[0],An)}}else U+=A[0];C=L.keywordPatternRe.lastIndex,A=L.keywordPatternRe.exec(Y)}U+=Y.substring(C),ee.addText(U)}function j(){if(Y==="")return;let C=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){ee.addText(Y);return}C=d(L.subLanguage,Y,!0,qe[L.subLanguage]),qe[L.subLanguage]=C._top}else C=v(Y,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Ce+=C.relevance),ee.__addSublanguage(C._emitter,C.language)}function P(){L.subLanguage!=null?j():O(),Y=""}function G(C,A){C!==""&&(ee.startScope(A),ee.addText(C),ee.endScope())}function Q(C,A){let U=1;const X=A.length-1;for(;U<=X;){if(!C._emit[U]){U++;continue}const te=oe.classNameAliases[C[U]]||C[U],re=A[U];te?G(re,te):(Y=re,O(),Y=""),U++}}function ae(C,A){return C.scope&&typeof C.scope=="string"&&ee.openNode(oe.classNameAliases[C.scope]||C.scope),C.beginScope&&(C.beginScope._wrap?(G(Y,oe.classNameAliases[C.beginScope._wrap]||C.beginScope._wrap),Y=""):C.beginScope._multi&&(Q(C.beginScope,A),Y="")),L=Object.create(C,{parent:{value:L}}),L}function ye(C,A,U){let X=ho(C.endRe,U);if(X){if(C["on:end"]){const te=new nt(C);C["on:end"](A,te),te.isMatchIgnored&&(X=!1)}if(X){for(;C.endsParent&&C.parent;)C=C.parent;return C}}if(C.endsWithParent)return ye(C.parent,A,U)}function yn(C){return L.matcher.regexIndex===0?(Y+=C[0],1):(_e=!0,0)}function En(C){const A=C[0],U=C.rule,X=new nt(U),te=[U.__beforeBegin,U["on:begin"]];for(const re of te)if(re&&(re(C,X),X.isMatchIgnored))return yn(A);return U.skip?Y+=A:(U.excludeBegin&&(Y+=A),P(),!U.returnBegin&&!U.excludeBegin&&(Y=A)),ae(U,C),U.returnBegin?0:A.length}function Cn(C){const A=C[0],U=b.substring(C.index),X=ye(L,C,U);if(!X)return ct;const te=L;L.endScope&&L.endScope._wrap?(P(),G(A,L.endScope._wrap)):L.endScope&&L.endScope._multi?(P(),Q(L.endScope,C)):te.skip?Y+=A:(te.returnEnd||te.excludeEnd||(Y+=A),P(),te.excludeEnd&&(Y=A));do L.scope&&ee.closeNode(),!L.skip&&!L.subLanguage&&(Ce+=L.relevance),L=L.parent;while(L!==X.parent);return X.starts&&ae(X.starts,C),te.returnEnd?0:A.length}function Sn(){const C=[];for(let A=L;A!==oe;A=A.parent)A.scope&&C.unshift(A.scope);C.forEach(A=>ee.openNode(A))}let Ee={};function Ye(C,A){const U=A&&A[0];if(Y+=C,U==null)return P(),0;if(Ee.type==="begin"&&A.type==="end"&&Ee.index===A.index&&U===""){if(Y+=b.slice(A.index,A.index+1),!a){const X=new Error(`0 width match regex (${m})`);throw X.languageName=m,X.badRule=Ee.rule,X}return 1}if(Ee=A,A.type==="begin")return En(A);if(A.type==="illegal"&&!x){const X=new Error('Illegal lexeme "'+U+'" for mode "'+(L.scope||"<unnamed>")+'"');throw X.mode=L,X}else if(A.type==="end"){const X=Cn(A);if(X!==ct)return X}if(A.type==="illegal"&&U==="")return 1;if($e>1e5&&$e>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=U,U.length}const oe=$(m);if(!oe)throw le(i.replace("{}",m)),new Error('Unknown language: "'+m+'"');const kn=Ko(oe);let Ne="",L=D||kn;const qe={},ee=new s.__emitter(s);Sn();let Y="",Ce=0,ce=0,$e=0,_e=!1;try{if(oe.__emitTokens)oe.__emitTokens(b,ee);else{for(L.matcher.considerAll();;){$e++,_e?_e=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const C=L.matcher.exec(b);if(!C)break;const A=b.substring(ce,C.index),U=Ye(A,C);ce=C.index+U}Ye(b.substring(ce))}return ee.finalize(),Ne=ee.toHTML(),{language:m,value:Ne,relevance:Ce,illegal:!1,_emitter:ee,_top:L}}catch(C){if(C.message&&C.message.includes("Illegal"))return{language:m,value:Re(b),illegal:!0,relevance:0,_illegalBy:{message:C.message,index:ce,context:b.slice(ce-100,ce+100),mode:C.mode,resultSoFar:Ne},_emitter:ee};if(a)return{language:m,value:Re(b),illegal:!1,relevance:0,errorRaised:C,_emitter:ee,_top:L};throw C}}function u(m){const b={value:Re(m),illegal:!1,relevance:0,_top:r,_emitter:new s.__emitter(s)};return b._emitter.addText(m),b}function v(m,b){b=b||s.languages||Object.keys(t);const x=u(m),D=b.filter($).filter(K).map(P=>d(P,m,!1));D.unshift(x);const T=D.sort((P,G)=>{if(P.relevance!==G.relevance)return G.relevance-P.relevance;if(P.language&&G.language){if($(P.language).supersetOf===G.language)return 1;if($(G.language).supersetOf===P.language)return-1}return 0}),[z,O]=T,j=z;return j.secondBest=O,j}function w(m,b,x){const D=b&&n[b]||x;m.classList.add("hljs"),m.classList.add(`language-${D}`)}function g(m){let b=null;const x=l(m);if(c(x))return;if(f("before:highlightElement",{el:m,language:x}),m.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),s.throwUnescapedHTML))throw new Jo("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const D=b.textContent,T=x?p(D,{language:x,ignoreIllegals:!0}):v(D);m.innerHTML=T.value,w(m,x,T.language),m.result={language:T.language,re:T.relevance,relevance:T.relevance},T.secondBest&&(m.secondBest={language:T.secondBest.language,relevance:T.secondBest.relevance}),f("after:highlightElement",{el:m,result:T,text:D})}function h(m){s=it(s,m)}const S=()=>{M(),de("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){M(),de("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function M(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(s.cssSelector).forEach(g)}function _(){k&&M()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function R(m,b){let x=null;try{x=b(e)}catch(D){if(le("Language definition for '{}' could not be registered.".replace("{}",m)),a)le(D);else throw D;x=r}x.name||(x.name=m),t[m]=x,x.rawDefinition=b.bind(null,e),x.aliases&&H(x.aliases,{languageName:m})}function N(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function B(){return Object.keys(t)}function $(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=b})}function K(m){const b=$(m);return b&&!b.disableAutodetect}function F(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function V(m){F(m),o.push(m)}function W(m){const b=o.indexOf(m);b!==-1&&o.splice(b,1)}function f(m,b){const x=m;o.forEach(function(D){D[x]&&D[x](b)})}function y(m){return de("10.7.0","highlightBlock will be removed entirely in v12.0"),de("10.7.0","Please use highlightElement now."),g(m)}Object.assign(e,{highlight:p,highlightAuto:v,highlightAll:M,highlightElement:g,highlightBlock:y,configure:h,initHighlighting:S,initHighlightingOnLoad:E,registerLanguage:R,unregisterLanguage:N,listLanguages:B,getLanguage:$,registerAliases:H,autoDetection:K,inherit:it,addPlugin:V,removePlugin:W}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=qo,e.regex={concat:ue,lookahead:Et,either:He,optional:mo,anyNumberOfTimes:po};for(const m in ke)typeof ke[m]=="object"&&wt(ke[m]);return Object.assign(e,ke),e},me=Nt({});me.newInstance=()=>Nt({});var ea=me;me.HighlightJS=me;me.default=me;const lt=so(ea),ut="[A-Za-z$_][0-9A-Za-z$_]*",ta=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],na=["true","false","null","undefined","NaN","Infinity"],$t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],_t=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Bt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],oa=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],aa=[].concat(Bt,$t,_t);function ra(e){const t=e.regex,n=(b,{after:x})=>{const D="</"+b[0].slice(1);return b.input.indexOf(D,x)!==-1},o=ut,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const D=b[0].length+b.index,T=b.input[D];if(T==="<"||T===","){x.ignoreMatch();return}T===">"&&(n(b,{after:D})||x.ignoreMatch());let z;const O=b.input.substring(D);if(z=O.match(/^\s*=/)){x.ignoreMatch();return}if((z=O.match(/^\s+extends\s+/))&&z.index===0){x.ignoreMatch();return}}},s={$pattern:ut,keyword:ta,literal:na,built_in:aa,"variable.language":oa},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:s,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},w={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,w,g,h,{match:/\$\d+/},d];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:s,contains:["self"].concat(k)});const M=[].concat(E,u.contains),_=M.concat([{begin:/\(/,end:/\)/,keywords:s,contains:["self"].concat(M)}]),R={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:_},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...$t,..._t]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[R],illegal:/%/},K={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function F(b){return t.concat("(?!",b.join("|"),")")}const V={match:t.concat(/\b/,F([...Bt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},W={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},f={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},R]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[R]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:s,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,w,g,h,E,{match:/\$\d+/},d,B,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[R,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},W,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[R]},V,K,N,f,{match:/\$[(.]/}]}}const Ot=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:r,td:s,thead:c,th:l}=t.tags,p=["sm","md","lg"];return function({Item:u,name:v}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(r(l(v??"Variant/Color"),ne.map(w=>l(w)))),i(Kn.map(w=>r(l(w),ne.map((g,h)=>s(u({color:g,variant:w,size:p[h%3]},{index:h}))))))))}},Z=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:i,p:r,h2:s,h3:c,pre:l,div:p,code:d}=t.tags;lt.registerLanguage("javascript",ra);const u=Ot(e),v=({text:w})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:g})=>{g.innerHTML=lt.highlight(w,{language:"js"}).value}}));return function(g){return o({class:n``},i(g.title),r(g.description),g.gridItem&&[s("Gallery"),g.gridItem&&u({Item:g.gridItem(e)})],s("Usage"),c("Import"),v({text:g.importStatement}),s("Examples"),g.examples.map(h=>a(i(h.title),r(h.description),p(h.createComponent(e)()),v({text:h.code}))))}},sa=()=>ne.map(e=>`
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
`);function Me(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:i,ul:r,li:s,header:c,h3:l,button:p}=n.tags,d=n.state(""),u=g=>h=>{d.val==g?d.val="":d.val=g},v=({element:g,open:h})=>{const S=()=>{g.removeEventListener("transitionend",S)};function E(M){M.addEventListener("transitionend",S),window.requestAnimationFrame(()=>{M.style.height="0px"})}function k(M){M.addEventListener("transitionend",S),M.style.height=M.scrollHeight+"px"}g.scrollHeight!=0&&(h?k(g):E(g))},w=o`
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
    ${sa()}
  `;return function(...h){let[{color:S,variant:E="outline",size:k="md",content:M,..._},...R]=q(h);const N=B=>{const{Header:$,Content:H,name:K}=B;return s({class:I(S,E,k),onclick:u(K)},l({class:()=>I(d.val==K&&"active")},p({type:"button","aria-controls":`bau-${K}`,"aria-expanded":({element:F})=>d.val==K},$(B))),i({class:"content",role:"region",id:`bau-${K}`,"data-state":({element:F})=>{const V=d.val==K;return v({element:F,open:V}),V}},H(B)))};return i({class:I("accordion",w,t==null?void 0:t.class,_.class)},r(a.map(N)))}}const Rt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return r=>i({...r})},ia=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Me(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>i({color:"neutral",variant:"outline"})},ca=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Pt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},la=e=>{const{css:t}=e,n=Pt(e),o=Me(e,{accordionDefs:n});return()=>o({color:"warning",class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},ua=`import accordion from "@grucloud/bau-ui/accordion";
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
`,da=e=>{const{css:t}=e,n=Pt(e),o=Me(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
      `})},pa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,ma={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:ca,createComponent:ia},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:ua,createComponent:la},{title:"Customize the icon",description:"Customize the icon with a cross.",code:pa,createComponent:da}],gridItem:Rt},ba=e=>{const t=Z(e);return()=>t(ma)},ha={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},ga=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},fa=()=>ne.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function De(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i,i:r}=n.tags;ga({css:o,createGlobalStyles:a});const s=o`
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
    ${fa()}
  `,c=J(e),l=({onclick:p})=>c({"aria-label":"Close",onclick:p,class:"button-close"},"✖");return function(d,...u){const{variant:v="outline",color:w="neutral",size:g="md",onRemove:h,...S}=d;return i({...S,class:I(`alert-${v}`,v,w,g,s,t==null?void 0:t.class,d.class,"alert"),role:"alert"},r({class:"icon"},ha[w]),i({class:"content"},...u),h&&l({onclick:h}))}}const Lt=e=>{const t=De(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},va=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=De(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},xa=`import alert from "@grucloud/bau-ui/alert";
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
`,wa=e=>{const{css:t}=e,n=De(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},ya=`import alert from "@grucloud/bau-ui/alert";
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
`,Ea={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:xa,createComponent:va},{title:"Custom Alert ",description:"A custom alert.",code:ya,createComponent:wa}],gridItem:Lt},Ca=e=>{const t=Z(e);return()=>t(Ea)},Sa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:r=15e3}=t,{div:s}=n.tags,c=n.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},p={stack:o`
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
    `},d=({id:u,status:v})=>{const w=c.val.findIndex(g=>g.id===u);w!=-1&&(c.val[w].status=v)};return function(v={},...w){const g=({id:E})=>{d({id:E,status:"removing"});const k=c.val.findIndex(M=>M.id===E);k!=-1&&c.val.splice(k,1)},h=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=i&&g({id:c.val[0].id}),c.val.push(k),setTimeout(()=>g(k),r)},S=E=>s({class:p.item,onclick:()=>g(E)},E.Component());return document.addEventListener("alert.add",E=>h(E.detail)),document.addEventListener("alert.remove",E=>g(E.detail)),s({class:I(p.stack,t==null?void 0:t.class,v.class)},n.loop(c,s(),S))}},ka=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=Sa(e,{deleteAfterDuration:2e4}),i=J(e),r=De(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},Ta=`import { Context } from "@grucloud/bau-ui/context";
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
`,Aa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ta,createComponent:ka}]},Ma=e=>{const t=Z(e);return()=>t(Aa)},Da=({keyframes:e})=>({hideRight:e`
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
 `}),Ia=e=>{const{bau:t}=e,{section:n,div:o,h1:a}=t.tags,i=gt(),r=J(e),s=Da(e);return function(){const c=t.state(!0),l=o(),p=d=>{l.replaceChildren(i({parent:l,animationHide:`${s.hideRight} 0.5s`,animationShow:`${s.showRight} 0.5s`},o(d.val?"Ciao":"")))};return p(c),n({id:"animate"},o(a("Test Animate"),o(r({onclick:()=>{c.val=!c.val,p(c)}},()=>c.val?"Hide":"Show")),l))}};function jt(e,t){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,r=n.state(!0),s=n.state(!1),c=()=>r.val=!1,l=d=>{r.val=!1,s.val=!0},p=o`
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
  `;return function(...u){let[{color:v,variant:w="outline",size:g="md",width:h=30,height:S=30,...E},...k]=q(u);return a({class:I(p,t==null?void 0:t.class,E.class)},()=>r.val?"Loading...":"",()=>s.val&&"Error",i({width:h,height:S,onload:c,onerror:l,class:I(v,w,g,p,t==null?void 0:t.class,E.class),...E}))}}const zt=e=>{const{css:t}=e,n=jt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Na=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=jt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},$a=`import avatar from "@grucloud/bau-ui/avatar";
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
`,_a={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:$a,createComponent:Na}],gridItem:zt},Ba=e=>{const t=Z(e);return()=>t(_a)};function Ge(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,r=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:p,onClose:d,...u},...v]=q(c);const w=S=>{h.style.opacity=1,h.showModal();const E=p.getBoundingClientRect(),k=h.getBoundingClientRect();E.x<a.innerWidth/2?h.style.left=E.left+"px":h.style.left=E.right-k.width+"px",E.y<a.innerHeight/2?h.style.top=E.top+E.height+"px":h.style.top=E.top-k.height+"px"},g=S=>{const E=()=>{h.close(),h.removeEventListener("transitionend",E)};h.addEventListener("transitionend",E),h.style.opacity=0},h=i({role:"presentation",class:I("popover",r,t==null?void 0:t.class,u==null?void 0:u.class),onclick:S=>S.target===h&&(g(),d==null?void 0:d.call())},l);return h.closeDialog=g,h.openDialog=w,h}}const Oa=()=>ne.map(e=>`
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
    ${Oa()}
  `;return function(s){const{size:c="md",variant:l="outline",color:p="neutral",name:d,id:u,disabled:v,...w}=s;return a({...w,class:I("input",c,p,l,i,t==null?void 0:t.class,w.class)})}}const Ra=()=>ne.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ht(e,t){const{bau:n,css:o}=e,{div:a,li:i,ul:r}=n.tags,s=Ge(e),c=J(e),l=We(e),p=ve(e),d=o`
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

    ${Ra()}
  `,u=n.state(""),v=n.state(""),w=n.state(!1),g=n.state(0),h=()=>{w.val=!1};return function(...E){let[{variant:k="outline",color:M,size:_="md",id:R,label:N,placeholder:B,Option:$,options:H,getOptionLabel:K=({label:P})=>P,...F},...V]=q(E);const W=n.state(H),f=()=>{j.openDialog(),w.val=!0,v.val="",W.val=H},y=()=>{j.closeDialog(),w.val=!1,v.val=""},m=P=>{const{value:G}=P.target;v.val=G,G?W.val=H.filter(Q=>K(Q).match(new RegExp(`${G}`,"i"))):W.val=H},b=P=>{w.val?y():f()},x=({option:P,index:G})=>Q=>{u.val=K(P),g.val=G,y()},D=P=>{switch(console.log("onkeydown",P.key,g.val),P.key){case"Escape":y();break;case"ArrowDown":g.val<W.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=W.val.length-1:g.val--;break;case"Enter":u.val=K(W.val[g.val]),v.val="",y();break}},T=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":w,"aria-label":N,onclick:b,variant:k,color:M,size:_},()=>!u.val&&N,u),z=l({id:R,value:v,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":w,oninput:m,onkeydown:D,variant:k,color:M,size:_}),j=s({id:R,triggerEl:T,contentEl:(()=>a({class:I(k,M,_,"content")},z,()=>p({class:I(k,M,_)},W.val.map((P,G)=>i({class:()=>I(g.val==G&&"active"),onclick:x({option:P,index:G})},$(P))))))(),onClose:h});return a({...F,class:I("autocomplete",d,t==null?void 0:t.class,F==null?void 0:F.class)},T,j)}}const Ut=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=Ht(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},Pa=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=Ht(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},La=`import { Context } from "@grucloud/bau-ui/context";
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
`,ja={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:La,createComponent:Pa}],gridItem:Ut},za=e=>{const t=Z(e);return()=>t(ja)};function Ft(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:p="md",content:d,...u},...v]=q(s);return a({...u,class:I("badge",i,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:I(c,l,p)},d),...v)}}const Gt=e=>{const t=Ft(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},Ha=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ft(e);return()=>n(o({content:"10"},"☏"))},Ua=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Fa={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ua,createComponent:Ha}],gridItem:Gt},Ga=e=>{const t=Z(e);return()=>t(Fa)};function Wt(e,t){const{bau:n,css:o}=e,{ul:a,li:i,a:r,span:s}=n.tags,c=J(e),l=o`
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
  `;return function(...d){let[{color:u,variant:v="outline",size:w="md",items:g,...h},...S]=q(d);return a({...h,class:I(l,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:E,name:k})=>i((E?c:s)({href:E,color:u,variant:v,size:w,class:I(u,v,w)},k))))}}const Vt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Wt(e);return o=>n({...o,...t})},Wa=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Wt(e);return()=>n(a(o))},Va=`import breadcrumbs, {
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
`,Xa={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Va,createComponent:Wa}],gridItem:Vt},Za=e=>{const t=Z(e);return()=>t(Xa)},Xt=e=>{const t=J(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},Ka=e=>{const{bau:t}=e,{section:n}=t.tags,o=J(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Ya=`import button from "@grucloud/bau-ui/button";
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
`,qa={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Ya,createComponent:Ka}],gridItem:Xt},Ja=e=>{const t=Z(e);return()=>t(qa)},Qa=()=>ne.map(e=>`
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
`);function Ve(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${Qa()}
  `;return function(...s){let[{variant:c="outline",size:l="md",color:p,...d},...u]=q(s);return a({...d,class:I("button-group",c,p,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},...u)}}const Zt=e=>{const t=["ONE","TWO","THREE"],n=J(e),o=Ve(e);return a=>o({...a},t.map(i=>n(a,i)))},er=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=J(e),i=Ve(e),r="primary",s="solid";return()=>n(i({color:r,variant:s},o.map(c=>a({color:r,variant:s},c))))},tr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,nr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:tr,createComponent:er}],gridItem:Zt},or=e=>{const t=Z(e);return()=>t(nr)};function Kt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ne.map(s=>`
&.calendar.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:p="plain",size:d,...u},...v]=q(c);return a({...u,type:"date",class:I("calendar",r,l,p,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Yt=e=>{const t=Kt(e);return n=>t({...n})},ar=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=Kt(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},rr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,sr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:rr,createComponent:ar}],gridItem:Yt},ir=e=>{const t=Z(e);return()=>t(sr)};function qt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...s){let[{size:c="md",variant:l="outline",color:p="neutral",onclick:d,...u},...v]=q(s);return a({...u,onclick:d,class:I("chip",i,c,l,p,d&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Jt=e=>{const t=qt(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},cr=e=>{const{bau:t}=e,{section:n}=t.tags,o=qt(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},lr=`import chip from "@grucloud/bau-ui/chip";
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
`,ur={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:lr,createComponent:cr}],gridItem:Jt},dr=e=>{const t=Z(e);return()=>t(ur)};function Qt(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:p="md",...d},...u]=q(s);return a({type:"checkbox",required:"required",...d,class:I(i,c,l,p,t==null?void 0:t.class,d==null?void 0:d.class)})}}const en=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=Qt(e);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},pr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=Qt(e),r=t.state(!1),s=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:s})))},mr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,br={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:mr,createComponent:pr}],gridItem:en},hr=e=>{const t=Z(e);return()=>t(br)};function gr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...s){let[{color:c,variant:l="outline",size:p,openState:d,...u},...v]=q(s);return a({class:I(i,t==null?void 0:t.class,u.class)},a({class:()=>I("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>I("content",d.val&&"content-open")},v))}}const fr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=gr(e),r=J(e),s=xt(e);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},s()))},vr=`import drawer from "@grucloud/bau-ui/drawer";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import navBarMenu from "../../navBarMenu";

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
`,xr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:vr,createComponent:fr}]},wr=e=>{const t=Z(e);return()=>t(xr)},tn=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=je(e,{base:t.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},yr=e=>{const{bau:t,config:n}=e,{section:o}=t.tags,a=t.state(window.location.pathname.replace(n.base,"")),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},r=je(e,{base:n.base+"/components/drillDownMenu"});return()=>o(r({tree:i,pathnameState:a}))},Er=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Cr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Er,createComponent:yr}],gridItem:tn},Sr=e=>{const t=Z(e);return()=>t(Cr)};function nn(e,t){const{bau:n,css:o}=e,{div:a,span:i,label:r,input:s}=n.tags,c={base:o`
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
    `};return function(p,...d){const{variant:u="outline",color:v="neutral",size:w="md",Component:g,disabled:h,...S}=p;return a({class:I(c.base,h&&c.disabled,t==null?void 0:t.class,p.class)},r({class:I(u,v,w)},g({disabled:h}),s({type:"file",disabled:h,...S})),i({class:"filename-display"}))}}const on=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:s,span:c}=n.tags,l=n.state("No file selected"),p=nn(e),d=v=>{const w=v.target.files[0];w?l.val=w.name:l.val="No file selected"},u=({disabled:v})=>s({class:I(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return v=>p({Component:u,name:"file",accept:"text/*",onchange:d,...v})},kr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:c,span:l}=n.tags,p=n.state("No file selected"),d=nn(e),u=w=>{const g=w.target.files[0];g?p.val=g.name:p.val="No file selected"},v=({disabled:w})=>c({class:I(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,w&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>s(d({Component:v,name:"file",accept:"text/*",onchange:u}),c("File selected: ",p))},Tr=`import classNames from "@grucloud/bau-css/classNames";
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
`,Ar={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Tr,createComponent:kr}],gridItem:on},Mr=e=>{const t=Z(e);return()=>t(Ar)},an=e=>{const t=We(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},Dr=e=>{const{bau:t}=e,{section:n}=t.tags,o=We(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},Ir=`import input from "@grucloud/bau-ui/input";
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
`,Nr={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Ir,createComponent:Dr}],gridItem:an},$r=e=>{const t=Z(e);return()=>t(Nr)};function rn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,r=o`
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
    ${(()=>ne.map(s=>`
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
  `;return function(...c){let[{color:l="neutral",variant:p="outline",size:d="md",...u},...v]=q(c);return a({class:I("modal",r,l,p,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const sn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s=J(e),c=rn(e),l=()=>o(Array(10).fill("").map((d,u)=>r(u+1,". Some text here"))),p=d=>{const u=c({id:"my-dialog",...d},a("Header"),l(),i(s({variant:"outline",color:d.color,onclick:()=>{u.close()}},"Cancel"),s({variant:"solid",color:d.color,onclick:()=>{u.close()}},"OK")));return u};return d=>{const u=p(d);return n(s({...d,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},_r=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:r}=t.tags,s="neutral",c=J(e),l=rn(e),p=()=>o(Array(10).fill("").map((u,v)=>r(v+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),p(),i(c({variant:"outline",color:s,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:s,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Br=`import modal from "@grucloud/bau-ui/modal";
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
`,Or={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Br,createComponent:_r}],gridItem:sn},Rr=e=>{const t=Z(e);return()=>t(Or)},Pr=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,r=J(e),s=Ge(e),c=()=>r({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),p=c(),d=s({id:"my-popover-left",triggerEl:p,contentEl:l()});return()=>n(o(p,d))},Lr=`import popover from "@grucloud/bau-ui/popover";
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
`,jr={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Lr,createComponent:Pr}]},zr=e=>{const t=Z(e);return()=>t(jr)},Hr=()=>ne.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function cn(e,t){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,r=J(e),s=Ge(e),c=ve(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Hr()}
  `,p=n.state(""),d=n.state(!1),u=n.state(0);return function(...w){let[{color:g="neutral",variant:h="outline",size:S="md",id:E,label:k,Option:M,options:_,getOptionLabel:R=({label:b})=>b,...N},...B]=q(w);const $=()=>{m.openDialog(),m.focus(),d.val=!0},H=()=>{m.closeDialog(),d.val=!1},K=()=>{d.val=!1},F=b=>{d.val?H():$()},V=({option:b,index:x})=>D=>{p.val=R(b),u.val=x,H()},W=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":u.val<_.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=_.length-1:u.val--;break;case"Enter":d.val?(p.val=R(_[u.val]),H()):$();break}},f=()=>c({tabindex:"0",class:I(g,h)},_.map((b,x)=>i({class:()=>I(u.val==x&&"active"),onclick:V({option:b,index:x})},M(b)))),y=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":k,onclick:F,color:g,variant:h,size:S},()=>!p.val&&k,p),m=s({id:E,triggerEl:y,contentEl:f(),onClose:K});return a({...N,class:I("select",g,S,l,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:W},y,m)}}const ln=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,i=cn(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],s=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:r,Option:s,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Ur=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,r=cn(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(r({options:s,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Fr=`import select from "@grucloud/bau-ui/select";
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
`,Gr={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Fr,createComponent:Ur}],gridItem:ln},Wr=e=>{const t=Z(e);return()=>t(Gr)};function Ie(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    ${(()=>ne.map(s=>`
&.slider.${s} {
  accent-color: var(--color-${s});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:p="outline",size:d,...u},...v]=q(c);return a({...u,type:"range",class:I("slider",l,p,d,r,t==null?void 0:t.class,u.class)},...v)}}const un=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Ie(e);return i=>a({...i,oninput:o})},Vr=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,r=t.state(0),s=l=>{r.val=l==null?void 0:l.target.value},c=Ie(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:s,name:"slider-simple",step:20,min:-100,max:100}))))},Xr=`import slider from "@grucloud/bau-ui/slider";
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
`,Zr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),p=u=>{l.val=u==null?void 0:u.target.value},d=Ie(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:p,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},Kr=`import slider from "@grucloud/bau-ui/slider";
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
`,Yr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:r,br:s,option:c}=t.tags,l=t.state(0),p=u=>{l.val=u==null?void 0:u.target.value},d=Ie(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),s,d({oninput:p,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},qr=`import slider from "@grucloud/bau-ui/slider";
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
`,Jr={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Xr,createComponent:Vr},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Kr,createComponent:Zr},{title:"Vertical Mark",description:"A vertical slider with marks.",code:qr,createComponent:Yr}],gridItem:un},Qr=e=>{const t=Z(e);return()=>t(Jr)},dt={sm:16,md:32,lg:64};function Xe(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:i,animateTransform:r,rect:s}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:p="color-base",variant:d="outline",visibility:u=!0,...v}={}){return a({class:I(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${p});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:dt[l],height:dt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},s({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},r({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),s({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},i({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const dn=e=>{const t=Xe(e);return n=>t({...n})},es=e=>{const{bau:t}=e,{section:n}=t.tags,o=Xe(e);return()=>n(o({}))},ts=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,ns={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:ts,createComponent:es}],gridItem:dn},os=e=>{const t=Z(e);return()=>t(ns)},as=()=>ne.map(e=>`
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
`);function pn(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${as()}
  `;return function(...s){let[{color:c="neutral",variant:l="plain",size:p="md",...d},...u]=q(s);return a({...d,class:I("switch",i,c,l,p,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...u)}}const mn=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,i=pn(e);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},rs=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,r=pn(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},ss=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,is={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ss,createComponent:rs}],gridItem:mn},cs=e=>{const t=Z(e);return()=>t(is)},ls=()=>ne.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function xe(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:i,ul:r,li:s}=n.tags,c=n.state(a),l=n.state(a[0]),p=u=>c.val.find(v=>v.name==u),d={base:o`
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
      ${ls()}
    `};return function(...v){let[{color:w,variant:g="plain",size:h,...S},...E]=q(v);const k=_=>{const{Header:R,disabled:N,name:B}=_;return s({class:()=>I(l.val.name==B&&"active",N&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},R(_))},M=i({class:I("tabs",d.base,g,h,w,t==null?void 0:t.class,S.class)},n.loop(c,r(),k),()=>l.val.Content?l.val.Content({}):"");return M.addEventListener("tab.select",_=>{var B,$;const{tabName:R}=_.detail,N=p(R);N&&((B=l.val.exit)==null||B.call(),l.val=N,($=N.enter)==null||$.call())},!1),M.addEventListener("tab.add",_=>{var N;const{tab:R}=_.detail;(N=R.enter)==null||N.call(),c.val.push(R)},!1),M.addEventListener("tab.remove",_=>{var N;const R=c.val.findIndex(B=>B.name==_.detail.tabName);R>0&&((N=c.val[R].exit)==null||N.call(),c.val.splice(R,1))},!1),M}}const bn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=xe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>i(r)},us=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=xe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},ds=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ps=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=xe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},ms=`import tabs from "@grucloud/bau-ui/tabs";
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
`,hn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},bs=e=>{const{css:t}=e,n=xe(e,{tabDefs:hn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},hs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,gs=e=>{const{css:t}=e,n=hn(e),o=xe(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},fs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,vs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ds,createComponent:us},{title:"Extended Tabs",description:"An extended tabs.",code:ms,createComponent:ps},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:hs,createComponent:bs},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:fs,createComponent:gs}],gridItem:bn},xs=e=>{const t=Z(e);return()=>t(vs)};function we(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...p]=q(c);return i({...l,class:I("table-container",r,t==null?void 0:t.class,l==null?void 0:l.class)},...p)}}const ws=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:p}=t.tags;function d(h,S,E,k,M){return{name:h,calories:S,fat:E,carbs:k,protein:M}}const u=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],v=({name:h,calories:S})=>r(i(h),i({class:n`
            text-align: right;
          `},S)),w=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=we(e,{class:n`
      max-width: 650px;
    `});return()=>o(g(s(p("Basic Table"),w(),l(u.map(v)))))},ys=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Es=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Cs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:p}=t.tags,d=({name:w,calories:g})=>r(i(w),i({class:n`
            text-align: right;
          `},g)),u=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=we(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(v(s(p("Table Dense"),u(),l(Es.map(d)))))},Ss=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const ks=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],Ts=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:r,table:s,thead:c,tbody:l,caption:p}=t.tags,d=({name:w,calories:g})=>r(i(w),i({class:n`
            text-align: right;
          `},g)),u=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=we(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(v(s(p("Table Zebra"),u(),l(ks.map(d)))))},As=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Ms={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:ys,createComponent:ws},{title:"Dense",description:"A dense table.",code:Ss,createComponent:Cs},{title:"Zebra",description:"A zebra table.",code:As,createComponent:Ts}]},Ds=e=>{const t=Z(e);return()=>t(Ms)};function gn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=Ve(e),r=J(e),s=Xe(e),c=o`
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
  `,l=({label:w,icon:g,...h})=>r({"aria-label":w,title:w,...h},g),p=({count:w,totalCount:g,page:h,rowsPerPage:S})=>a({class:"pages-numbers"},Number(h-1)*Number(S)+(w>0?1:0),"-",Math.min(h*S,g)," of ",g),d=({count:w,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(w>0?1:0),"-",g*h),u=w=>w<=1,v=(w,g,h)=>w>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:S=0,page:E=1,rowsPerPage:k=50,onPageChange:M,isLoading:_=!1,disableFirst:R=()=>u(E),disablePrevious:N=()=>u(E),disableNext:B=()=>v(E,S,k),disableLast:$=()=>v(E,S,k),...H},...K]=q(g);const F=Math.max(0,Math.ceil(S/k)),V=M({page:1}),W=M({page:E-1}),f=M({page:E+1}),y=M({page:F}),m=[{label:"First",icon:"⟪",onclick:V,disabled:R()},{label:"Previous",icon:"⟨",onclick:W,disabled:N()},{label:"Next",icon:"⟩",onclick:f,disabled:B()},{label:"Last",icon:"⟫",onclick:y,disabled:$()}];return a({...H,class:I("table-pagination",c,_&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},s({class:"spinner",visibility:_,size:"md"}),S>0?p({count:h,totalCount:S,page:E,maxPages:F,rowsPerPage:k}):d({count:h,page:E,maxPages:F,rowsPerPage:k}),i({variant:"outline",color:"neutral"},m.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Is=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ns=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c}=t.tags,l=Is(45),p=({name:E,email:k})=>i(a(E),a(k)),d=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=gn(e),v=we(e,{class:n`
      max-width: 650px;
    `}),w=t.state(l),g=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>w.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),S=({page:E})=>k=>{g.val.page=E};return()=>v(r(d(),()=>c(h.val.map(p))),()=>u({...g.val,onPageChange:S}))},$s=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:r,thead:s,tbody:c,div:l}=t.tags,p=t.state(!1),d=t.state([]),u=t.state(""),v=t.derive(()=>d.val.length),w=t.state(1),g=t.state(10),h=t.derive(()=>d.val),S=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,E=({page:$})=>H=>{w.val=$,k(S({page:$,per_page:g.val}))};k(S({page:1,per_page:g.val}));async function k($){try{p.val=!0;const H=await fetch($,{});if(H.ok){const K=await H.json();d.val=K;return}throw H}catch(H){u.val=H.message}finally{p.val=!1}}const M=({name:$,description:H,stargazers_count:K})=>i(a($),a(H),a({class:n`
            text-align: right;
          `},K)),_=()=>s(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),R=gn(e),N=we(e,{class:n`
      min-width: 650px;
    `}),B=({message:$})=>l($);return()=>N(()=>R({rowsPerPage:g.val,page:w.val,count:v.val,totalCount:-1,isLoading:p.val,onPageChange:E,disableNext:()=>!1}),r(_(),()=>u.val&&B({message:u.val}),()=>c(h.val.map(M))))},_s=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:r,tr:s}=t.tags,c=Ns(e),l=$s(e),p=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},r(s("Table Pagination")),i("Asynchronous Pagination"),p(l()),i("Simple Pagination"),p(c()))};function Ze(e,t){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:p="bottom-start",color:d="neutral",variant:u="outline",size:v="md",...w},...g]=q(c);const h=i({class:I("container",...p.split("-"))},i({class:I("content",d,u,v),role:"tooltip"},l)),S=N=>`move-to-${N}`,E=(N,B,$)=>{if(N()){const H=S(B);h.classList.add(H),h.classList.add(B),h.classList.remove($)}},k=(N,B)=>{const $=S(N);h.classList.contains($)&&(h.classList.remove($),h.classList.add(B),h.classList.remove(N))},M=N=>{const B=h.getBoundingClientRect();E(()=>B.x<0,"right","left"),E(()=>B.x+B.width>a.innerWidth,"left","right"),E(()=>B.y<0,"bottom","top"),E(()=>B.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},_=N=>{h.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return i({...w,class:I("tooltip",r,t==null?void 0:t.class,w==null?void 0:w.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",M),N.addEventListener("mouseout",_)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",M),N.removeEventListener("mouseout",_)}},...g,h)}}const fn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,r=J(e),s=Ze(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>s({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},Bs=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=J(e),r=Ze(e),s=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:s()},i("tooltip"))},Os=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Rs=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i}=t.tags,r=J(e),s=Ze(e),c=()=>o(a("A ",i("tooltip")," can be any component")),l=()=>[o({class:n`
          display: flex;
          justify-content: space-around;
        `},s({side:"top-start",titleEl:c()},r("top-start")),s({side:"top-centered",titleEl:c()},r("top-centered")),s({side:"top-end",titleEl:c()},r("top-end"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},s({side:"left-start",titleEl:c()},r("left-start")),s({side:"right-start",titleEl:c()},r("right-start"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},s({side:"left-centered",titleEl:c()},r("left-centered")),s({side:"right-centered",titleEl:c()},r("right-centered"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},s({side:"left-end",titleEl:c()},r("left end")),s({side:"right-end",titleEl:c()},r("right end"))),o({class:n`
          display: flex;
          justify-content: space-around;
        `},s({side:"bottom-start",titleEl:c()},r("bottom start")),s({side:"bottom-centered",titleEl:c()},r("bottom centered")),s({side:"bottom-end",titleEl:c()},r("bottom end")))];return()=>l()},Ps=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ls={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Os,createComponent:Bs},{title:"Grid",description:"Various tooltip position",code:Ps,createComponent:Rs}],gridItem:fn},js=e=>{const t=Z(e);return()=>t(Ls)},vn=e=>{const t=Le(e);return n=>t(n)},zs=e=>{const{bau:t}=e,{section:n}=t.tags,o=Le(e);return()=>n(o({}))},Hs=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Us={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Hs,createComponent:zs}],gridItem:vn},Fs=e=>{const t=Z(e);return()=>t(Us)},Gs=({css:e,createGlobalStyles:t})=>(t`
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
    `});function xn(e,t){const{bau:n,css:o,createGlobalStyles:a,window:i}=e,{renderMenuItem:r}=t,{ul:s,li:c,nav:l,div:p}=n.tags,d=Gs({css:o,createGlobalStyles:a}),u=({element:h,closeState:S})=>{h.scrollHeight!=0&&(S.val?v(h):w(h))};function v(h){h.style.height=h.scrollHeight+"px";const S=()=>{h.removeEventListener("transitionend",S)};h.addEventListener("transitionend",S),i.requestAnimationFrame(()=>{h.style.height="0px"})}function w(h){const S=()=>{h.removeEventListener("transitionend",S),h.style.height=null};h.addEventListener("transitionend",S),h.style.height=h.scrollHeight+"px"}const g=({depth:h=1,maxDepth:S,color:E,variant:k,size:M})=>_=>{const{children:R,expanded:N}=_,B=n.state(!N);return c({class:()=>I(R?B.val?d.collapsed:d.expanded:"")},p({class:o`
              cursor: pointer;
            `,onclick:$=>{R&&(B.val=!B.val)}},r(_.data)),R&&h<S&&s({class:I(E,M),bauMounted:({element:$})=>{B.val&&($.style.height="0px")},"aria-expanded":({element:$})=>(u({element:$,closeState:B}),!B.val)},R.map(g({depth:h+1,maxDepth:S}))))};return function({tree:S,maxDepth:E=1/0,size:k="md",variant:M="plain",color:_="neutral",...R}){return l({class:I(d.nav,k,M,_,t==null?void 0:t.class,R.class)},S.children&&s(S.children.map(g({maxDepth:E,color:_,variant:M,size:k}))))}}const wn=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=xn(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return r=>i({...r,tree:o})},Ws=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=xn(e,{renderMenuItem:({name:r,href:s})=>n({href:s},r)});return()=>i({tree:o})},Vs=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Xs={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Vs,createComponent:Ws}],gridItem:wn},Zs=e=>{const t=Z(e);return()=>t(Xs)};function Ks(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:r,pre:s,h3:c,h4:l}=n.tags;return function(d,...u){return a("Login")}}const Ys=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:r}=n.tags,s=Ks(e);return()=>o({id:"login"},r(t("Login Examples")),i("Basic"),a(s()))};function qs(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:r}=n.tags;return function(){return a({class:o`
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
          `},r(t("Pages Examples")),Ys(e)()))}}const Js=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Qs=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,i=ve(e),r=({code:s,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(s),o(c));return s=>i({...s},Js.map(r))},ei=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ti=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,r=ve(e),s=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},ei.map(s)))},ni=`import list from "@grucloud/bau-ui/list";
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
`,oi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ni,createComponent:ti}],gridItem:Qs},ai=e=>{const t=Z(e);return()=>t(oi)},ri=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:r,ul:s,li:c}=t.tags,l=Ot(e),p=J(e),d=[{name:"Accordion",Item:Rt(e)},{name:"Alert",Item:Lt(e)},{name:"Autocomplete",Item:Ut(e)},{name:"Avatar",Item:zt(e)},{name:"Badge",Item:Gt(e)},{name:"Breadcrumbs",Item:Vt(e)},{name:"Button",Item:Xt(e)},{name:"Button Group",Item:Zt(e)},{name:"Calendar",Item:Yt(e)},{name:"Checkbox",Item:en(e)},{name:"Chip",Item:Jt(e)},{name:"DrillDown Menu",Item:tn(e)},{name:"File Input",Item:on(e)},{name:"Input",Item:an(e)},{name:"Modal",Item:sn(e)},{name:"Select",Item:ln(e)},{name:"Slider",Item:un(e)},{name:"Spinner",Item:dn(e)},{name:"Switch",Item:mn(e)},{name:"Tabs",Item:bn(e)},{name:"Theme Switch",Item:vn(e)},{name:"Tooltip",Item:fn(e)},{name:"Tree View",Item:wn(e)}];return()=>o(i("Bau Component Gallery"),r("This page displays the components with various colors and variants."),s({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},d.map(({name:u})=>c(p({color:"primary",variant:"solid",href:`#${u}`},u)))),d.map(u=>a({id:u.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(u))))},si=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:ro(e)})},{path:"components",action:()=>({title:"Component",component:ri(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:ba(e)})},{path:"alert",action:()=>({title:"Alert",component:Ca(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ma(e)})},{path:"animate",action:()=>({title:"Animate",component:Ia(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:za(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ba(e)})},{path:"badge",action:()=>({title:"Badge",component:Ga(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Za(e)})},{path:"button",action:()=>({title:"Button",component:Ja(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:or(e)})},{path:"calendar",action:()=>({title:"Calendar",component:ir(e)})},{path:"chip",action:()=>({title:"Chip",component:dr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:hr(e)})},{path:"drawer",action:()=>({title:"Drawer",component:wr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Sr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Mr(e)})},{path:"input",action:()=>({title:"Input",component:$r(e)})},{path:"list",action:()=>({title:"List",component:ai(e)})},{path:"modal",action:()=>({title:"Modal",component:Rr(e)})},{path:"popover",action:()=>({title:"Popover",component:zr(e)})},{path:"select",action:()=>({title:"Select",component:Wr(e)})},{path:"slider",action:()=>({title:"Slider",component:Qr(e)})},{path:"spinner",action:()=>({title:"Spinner",component:os(e)})},{path:"switch",action:()=>({title:"Switch",component:cs(e)})},{path:"table",action:()=>({title:"Table",component:Ds(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:_s(e)})},{path:"tabs",action:()=>({title:"Tabs",component:xs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:js(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Fs(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Zs(e)})}]},{path:"pages",action:t=>({title:"Pages",component:qs(e)})}],ii=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ci=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,r=a.state(),s=t({componentState:r});return document.getElementById("app").replaceChildren(s),({router:l})=>{const p=o.location.pathname.replace(n,""),{title:d,component:u,Layout:v=t}=l.resolve({pathname:p});i.pathname.val=p,r.val=u,document.title=`${d}`}},li=e=>{const{createGlobalStyles:t}=e;jn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  `},ui=e=>{const{createGlobalStyles:t}=e;t`
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
  `};zn();const Ke={title:"Bau",base:"/bau/bau-ui"},ie=Zn({config:Ke}),{bau:pt}=ie;ie.states={pathname:pt.state(window.location.pathname.replace(Ke.base,"")),drawerOpen:pt.state(!0)};li(ie);ui(ie);Nn({routes:si({context:ie}),onLocationChange:ci({context:ie,LayoutDefault:no(ie),config:Ke}),notFoundRoute:ii(ie)});
