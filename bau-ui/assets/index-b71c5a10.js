(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const an=(e,t)=>({...e,paths:[...t,e.path]}),It=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=an(o,e);return n?[a,...It({paths:[...e,o.path],routes:n})]:a}),rn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},sn=({routes:e=[],notFoundRoute:t})=>{const n=It({routes:e}).map(o=>({...o,regex:rn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function cn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=sn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,r,s)=>{a.apply(r,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:r}=a,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),a.preventDefault())}),n({router:o}),o}const $t=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],ln=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],un=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ht=e=>`var(--color-${e})`,dn=e=>`var(--color-${e}-lightest)`,pn=()=>$t.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ht(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${dn(e)};
}
.solid.${e} {
  background-color: ${ht(e)};
}
`).join(`
`),mn=e=>100-e*10,bn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${mn(t)}%);`).join(`
`),Nt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),hn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...ln.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...un.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function gn({createGlobalStyles:e},{colorPalette:t=$t}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>hn([n,o])).join(`
`)}
      ${bn()}
      ${Nt({})}
      ${pn()}
      
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
      --shadow-m: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
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
  `}function fn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ke=e=>Object.prototype.toString.call(e??0).slice(8,-1),vn=e=>Ke(e)=="Object",gt=e=>Ke(e)=="Function",We=e=>["Object","Array"].includes(Ke(e)),ft=Object.getPrototypeOf,Xe=e=>he(e)?e.val:e,he=e=>e==null?void 0:e.__isState,xn=["splice","push","pop","shift","unshift","sort","reverse"],$e=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const Q=e=>!he(e[0])&&vn(e[0])?e:[{},...e];function wn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,r=new Set,s=!1,i,c=f=>n.createElement(f),l=(f,E,p)=>{let b=i;i=E;let x=f(p);return i=b,x},m=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(E=>{var p;return(p=E.element)==null?void 0:p.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},d=(f,E,p,b,x,I)=>{var A;if(s){r.add(f);return}for(let z of f.bindings){let{deps:R,element:H,renderInferred:L,render:X,renderItem:te}=z;if(te&&E)(A=y(H,b,(...re)=>h(te(...re)),p,x,I)[E])==null||A.call();else{let re=L?L({element:H}):X({element:H,renderItem:te})(...R.map(Xe));re!==H&&H.replaceWith(z.element=h(re))}}T(f),m()},u=(f,E,p=[])=>({get(b,x,I){var A;if(i==null||i.add(f),x==="_isProxy")return!0;if(!((A=b[x])!=null&&A._isProxy)&&!he(b[x])&&We(b[x]))b[x]=new Proxy(b[x],u(f,E,[...p,x]));else if(xn.includes(x)){let z=b[x];return(...R)=>{let H=z.apply(b,R);return d(f,x,H,R,E,p),H}}return Reflect.get(b,x,I)},set(b,x,I,A){let z=Reflect.set(b,x,I,A);return d(f,"setItem",z,{prop:x,value:I},E,[...p,x]),z}}),v=(f,E)=>new Proxy(E,u(f,E)),y=(f,E,p,b,x,I)=>{let A=()=>f.replaceChildren(...$e(b,p)),z=R=>f[R]&&f.removeChild(f[R]);return{assign:A,sort:A,reverse:A,setItem:()=>{var H;let R=I[0];(H=f.children[R])==null||H.replaceWith(p(x[R],R))},push:()=>f.append(...$e(E,(R,H)=>p(R,x.length+H))),unshift:()=>f.prepend(...$e(E,p)),pop:()=>z("lastChild"),shift:()=>z("firstChild"),splice:()=>{let[R,H,...L]=E;const{length:X}=f.children;for(let te=R>=0?Math.min(R+H-1,X-1):X-1;te>=(R>=0?R:X+R);te--)f.children[te].remove();if(L.length){let te=L.forEach((re,pe)=>p(re,R+pe));f.children[R]?f.children[R].after(...te):f.append(...te)}}}},g=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let E=this;return i==null||i.add(E),E.valProxy??(E.valProxy=We(f)?v(E,f):f,E.valProxy)},set val(E){let p=this,b=p.val;We(E)?(p.valProxy=v(p,E),d(p,"assign",E)):E!==b&&(p.valProxy=E,d(p)),p.oldVal=b}}),h=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),S=(f,E)=>{let p=new Set;return E.val=l(f,p),p},C=f=>{let E=g(),p=S(f,E);E.computed=!0;for(let b of p)b.listeners.push({computed:f,deps:p,state:E});return E},T=f=>{for(let E of[...f.listeners])S(E.computed,E.state)},D=(f,...E)=>{if(E.length){let p=[];for(let b of E.flat(1/0))b!=null&&p.push(he(b)?U({deps:[b],render:()=>x=>x}):gt(b)?K({renderInferred:b}):h(b));f.append(...p)}},B={},P=(f,E)=>f&&(Object.getOwnPropertyDescriptor(f,E)??P(ft(f),E)),N=(f,E,p)=>{var b;return B[f+","+E]??(B[f+","+E]=((b=P(p,E))==null?void 0:b.set)??0)},O=(f,E)=>new MutationObserver((p,b)=>{p.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find(I=>I===f&&(E({element:f}),b.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),_=f=>new Proxy(function(p,...b){var z;let[x,...I]=Q(b),A=f?n.createElementNS(f,p):c(p);for(let[R,H]of Object.entries(x)){if(R.startsWith("bau"))continue;let L=N(p,R,ft(A))?X=>A[R]=X:X=>A.setAttribute(R,X);H==null||(he(H)?U({deps:[H],render:()=>()=>(L(H.val),A)}):gt(H)&&(!R.startsWith("on")||H.isDerived)?K({renderInferred:()=>(L(H({element:A})),A)}):H.renderProp?U({deps:H.deps,render:()=>()=>(L(H.renderProp({element:A})(...H.deps.map(Xe))),A)}):L(H))}return D(A,...I),(z=x.bauCreated)==null||z.call(x,{element:A}),x.bauMounted&&t.requestAnimationFrame(()=>x.bauMounted({element:A})),x.bauUnmounted&&t.requestAnimationFrame(()=>O(A,x.bauUnmounted)),A},{get:(E,p)=>E.bind(void 0,p)}),G=(f,E,p)=>{f.element=h(p);for(let b of E)he(b)&&(a.add(b),b.bindings.push(f));return f.element},K=({renderInferred:f,element:E})=>{let p=new Set,b=l(f,p,{element:E});return G({renderInferred:f},p,b)},U=({deps:f,element:E,render:p,renderItem:b})=>G({deps:f,render:p,renderItem:b},f,p({element:E,renderItem:b})(...f.map(Xe))),V=(f,E,p)=>U({deps:[f],render:({renderItem:b})=>x=>(E.append(...$e(x,b)),E),renderItem:p}),Z=f=>{s=!0,f(),s=!1,r.forEach(d),r.clear()};return{tags:_(),tagsNS:_,state:g,bind:U,loop:V,derive:C,stateSet:a,batch:Z}}const yn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},En=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Cn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Sn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...r)=>{const s=Cn(a,r),i=yn(s);return!t.getElementById(i)&&En(t,e==null?void 0:e.target,i,o(i,s)),i};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function kn(e){return{bau:wn(),...Sn(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function ee(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...s){let[{color:i,variant:c,size:l="md",disabled:m,href:d,...u},...v]=Q(s);return(d?n.tags.a:n.tags.button)({...u,class:$("button",a.root,c,l,i,d?a.a:a.button,m&&a.disabled,t==null?void 0:t.class,u.class),disabled:m,href:d,...!d&&{type:"button"}},v)}}const oe=["neutral","primary","success","danger","warning"],Tn=["plain","outline","solid"],An="light",Mn=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Be(e,t){const{bau:n,css:o,window:a}=e,{input:r}=n.tags,s=m=>{a.document.documentElement.setAttribute("data-theme",m),localStorage.setItem("theme",m)},i=()=>{try{return localStorage.getItem("theme")}catch{}},c=i();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(An);const l=o`
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
    ${Mn()}
  `;return function(...d){let[{color:u,variant:v="outline",size:y="md",...g},...h]=Q(d);return r({required:"required",title:"Switch Theme",...g,class:$("theme-switch",u,v,y,l,t==null?void 0:t.class,g.class),type:"checkbox",checked:i()=="dark",onclick:S=>{s(S.target.checked?"dark":"light")}},...h)}}function Dn(e){const{tr:t,bau:n,css:o,config:a,states:r}=e,{i:s,header:i,h1:c,div:l,a:m,img:d,b:u,ul:v,li:y}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),S=r.drawerOpen,C=ee(e,{class:o`
      background: transparent;
    `}),T=Be(e),D=()=>s(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),B=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},C({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>S.val=!S.val},D()),m({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),P=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},T(),C({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${a.base}/github-mark-white.svg`,width:30,height:30})));return function(){return i({class:o`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
        `},B(),P())}}function In({tr:e,bau:t,css:n}){const{footer:o,span:a,a:r,ul:s,li:i,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.41.0"))}}function _t(e,t={}){return function({parent:o,animationHide:a,animationShow:r},s){s.style.animation=r;const i=()=>{s.removeEventListener("animationend",i),s.style.animation=""};return s.addEventListener("animationend",i),new MutationObserver((c,l)=>{c.filter(m=>m.removedNodes).forEach(m=>[...m.removedNodes].find(d=>{o.style.position="relative";const u=d.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=a,m.previousSibling?m.previousSibling.after(u):m.nextSibling?m.nextSibling.before(u):m.target&&m.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),l.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}function Ce(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,s=o`
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
    ${(()=>oe.map(i=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:m="plain",size:d,...u},...v]=Q(c);return a({...u,class:$("list",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const vt="0.3s",Bt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,r=structuredClone(a);return r.children=o==null?void 0:o.map(Bt({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},Ot=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ot(e)(t.children[o]);if(a)return a}},$n=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function Oe(e,t){const{bau:n,css:o,window:a}=e,{base:r=""}=t,s=({currentTree:U,data:V,onclickBack:Z})=>h(D({variant:"plain",href:`${r}${U.parentTree.children[0].data.href}`,onclick:Z({currentTree:U}),class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:"plain",href:`${r}${V.href}`,class:o`
            flex-grow: 1;
          `},V.name)),i=({data:{name:U,href:V},children:Z=[]})=>D({href:`${r}${V}`,"data-ischild":Z.length==0},U),c=({subTree:U})=>{var V;return a.location.pathname.replace(r,"")===((V=U==null?void 0:U.data)==null?void 0:V.href)},{renderHeader:l=s,renderMenuItem:m=i,isActive:d=c}=t,{ul:u,li:v,nav:y,div:g,header:h,a:S}=n.tags,C=_t(),T=Ce(e),D=ee(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:P,showFromRight:N,showFromLeft:O}=$n(e),_=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
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
  `,G=({variant:U,color:V,size:Z,onclickItem:f,onclickBack:E,currentTree:p,pathnameState:b})=>{const{children:x,parentTree:I,data:A}=p;return g({class:$("drillDownMenu",U,V,Z)},I&&l({data:A,currentTree:p,onclickBack:E}),x&&T({class:$(U,V,Z)},x.map(z=>v({class:()=>$(z.children&&"has-children",d({pathname:b.val,subTree:z})&&"active"),onclick:z.children&&f({currentTree:z})},m(z)))))},K=({tree:U,pathname:V})=>{let Z=Bt({})(U),f=Ot(V)(Z);return f||(console.log("drilldown no sub tree",V),f=Z),f};return function(V){const{variant:Z="plain",color:f="neutral",size:E="md",tree:p,pathnameState:b=n.state(a.location.pathname),...x}=V,I=({currentTree:H})=>L=>z(L,R,H,!0),A=({currentTree:H})=>L=>z(L,R,H.parentTree,!1),z=(H,L,X,te)=>{L.firstChild.replaceChildren(C({parent:L,animationHide:`${te?B:P} ${vt}`,animationShow:`${te?N:O} ${vt}`},G({variant:Z,color:f,size:E,currentTree:X,onclickItem:I,onclickBack:A,pathnameState:b})))},R=y({class:$(_,t==null?void 0:t.class,x.class)},()=>G({variant:Z,color:f,size:E,currentTree:K({tree:p,pathname:b.val}),onclickItem:I,onclickBack:A,pathnameState:b}));return R}}const Nn={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Rt(e){const{tr:t,bau:n,css:o,config:a,states:r,window:s}=e,{div:i,ul:c,li:l,nav:m,a:d,span:u}=n.tags;let v=!1;const y=Oe(e,{base:a.base});return function(){return i({bauMounted:({element:h})=>{s.innerWidth<=640&&(v=!0,r.drawerOpen.val=!1)},onclick:h=>{v&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:$(o`
            grid-area: sidebar;
            position: sticky;
            top: calc(var(--header-height));
            align-self: start;
            overflow-y: scroll;
            height: calc(100vh - var(--header-height) - 1rem);
            @media (max-width: 640px) {
              position: fixed;
              width: 100vw;
              z-index: 1;
              display: none;
            }
          `)},y({tree:Nn,pathnameState:r.pathname}))}}const _n=e=>{const{bau:t,css:n,states:o}=e,{div:a}=t.tags,r=Dn(e),s=Rt(e),i=In(e);return function({componentState:l}){return a({class:n`
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
        `},r(),s(),a({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>l.val&&l.val({})),i())}};function Bn(e){const{bau:t,css:n,config:o}=e,{div:a,h1:r,h2:s,p:i}=t.tags;ee(e);const c=n`
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
  `;return function({name:m,text:d,tagLine:u}){return a({class:c},r(m),s(d),i(u))}}function On(e){const{bau:t,css:n}=e,{div:o,h1:a,p:r}=t.tags,s=n`
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
  `,i=({title:c,Content:l})=>o({className:"feature"},a(c),r(l()));return function({featuresContent:l}){return o({class:s},l.map(i))}}function Rn(e){const{bau:t,css:n,config:o}=e,{div:a,p:r,a:s}=t.tags,i=Bn(e),c=On(e),l=ee(e),m=n``,d=[{title:"UI components for the web",Content:()=>[r("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),r("3 variant: plain, outline and primary"),r("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[r("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[r("The component bundle size is about 8x smaller compared to popular React UI component library."),r("Faster download time for users."),r("Save in bandwith fees for the operator."),r("Suitable for low bandwith network and low cost device.")]}];return function({}){return a({class:m},i({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:d}))}}function Pn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Pt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Pt(n)}),e}class xt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Lt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Ln="</span>",wt=e=>!!e.scope,jn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Hn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Lt(t)}openNode(t){if(!wt(t))return;const n=jn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){wt(t)&&(this.buffer+=Ln)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const yt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ye{constructor(){this.rootNode=yt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=yt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ye._collapse(n)}))}}class zn extends Ye{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Hn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ye(e){return e?typeof e=="string"?e:e.source:null}function jt(e){return de("(?=",e,")")}function Gn(e){return de("(?:",e,")*")}function Un(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ye(n)).join("")}function Fn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function qe(...e){return"("+(Fn(e).capture?"":"?:")+e.map(o=>ye(o)).join("|")+")"}function Ht(e){return new RegExp(e.toString()+"|").exec("").length-1}function Vn(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Wn=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Je(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let r=ye(o),s="";for(;r.length>0;){const i=Wn.exec(r);if(!i){s+=r;break}s+=r.substring(0,i.index),r=r.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?s+="\\"+String(Number(i[1])+a):(s+=i[0],i[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Xn=/\b\B/,zt="[a-zA-Z]\\w*",Qe="[a-zA-Z_]\\w*",Gt="\\b\\d+(\\.\\d+)?",Ut="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ft="\\b(0b[01]+)",Zn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Kn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ee={begin:"\\\\[\\s\\S]",relevance:0},Yn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ee]},qn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ee]},Jn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Re=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Qn=Re("//","$"),eo=Re("/\\*","\\*/"),to=Re("#","$"),no={scope:"number",begin:Gt,relevance:0},oo={scope:"number",begin:Ut,relevance:0},ao={scope:"number",begin:Ft,relevance:0},ro={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ee,{begin:/\[/,end:/\]/,relevance:0,contains:[Ee]}]}]},so={scope:"title",begin:zt,relevance:0},io={scope:"title",begin:Qe,relevance:0},co={begin:"\\.\\s*"+Qe,relevance:0},lo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ne=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Xn,IDENT_RE:zt,UNDERSCORE_IDENT_RE:Qe,NUMBER_RE:Gt,C_NUMBER_RE:Ut,BINARY_NUMBER_RE:Ft,RE_STARTERS_RE:Zn,SHEBANG:Kn,BACKSLASH_ESCAPE:Ee,APOS_STRING_MODE:Yn,QUOTE_STRING_MODE:qn,PHRASAL_WORDS_MODE:Jn,COMMENT:Re,C_LINE_COMMENT_MODE:Qn,C_BLOCK_COMMENT_MODE:eo,HASH_COMMENT_MODE:to,NUMBER_MODE:no,C_NUMBER_MODE:oo,BINARY_NUMBER_MODE:ao,REGEXP_MODE:ro,TITLE_MODE:so,UNDERSCORE_TITLE_MODE:io,METHOD_GUARD:co,END_SAME_AS_BEGIN:lo});function uo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function po(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function mo(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=uo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function bo(e,t){Array.isArray(e.illegal)&&(e.illegal=qe(...e.illegal))}function ho(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function go(e,t){e.relevance===void 0&&(e.relevance=1)}const fo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,jt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},vo=["of","and","for","in","not","or","if","then","parent","list","value"],xo="keyword";function Vt(e,t,n=xo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(r){Object.assign(o,Vt(e[r],t,r))}),o;function a(r,s){t&&(s=s.map(i=>i.toLowerCase())),s.forEach(function(i){const c=i.split("|");o[c[0]]=[r,wo(c[0],c[1])]})}}function wo(e,t){return t?Number(t):yo(e)?0:1}function yo(e){return vo.includes(e.toLowerCase())}const Et={},ue=e=>{console.error(e)},Ct=(e,...t)=>{console.log(`WARN: ${e}`,...t)},be=(e,t)=>{Et[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Et[`${e}/${t}`]=!0)},_e=new Error;function Wt(e,t,{key:n}){let o=0;const a=e[n],r={},s={};for(let i=1;i<=t.length;i++)s[i+o]=a[i],r[i+o]=!0,o+=Ht(t[i-1]);e[n]=s,e[n]._emit=r,e[n]._multi=!0}function Eo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),_e;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),_e;Wt(e,e.begin,{key:"beginScope"}),e.begin=Je(e.begin,{joinWith:""})}}function Co(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),_e;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),_e;Wt(e,e.end,{key:"endScope"}),e.end=Je(e.end,{joinWith:""})}}function So(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function ko(e){So(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Eo(e),Co(e)}function To(e){function t(s,i){return new RegExp(ye(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,i]),this.matchAt+=Ht(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(c=>c[1]);this.matcherRe=t(Je(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(i);if(!c)return null;const l=c.findIndex((d,u)=>u>0&&d!==void 0),m=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,m)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const c=new n;return this.rules.slice(i).forEach(([l,m])=>c.addRule(l,m)),c.compile(),this.multiRegexes[i]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,c){this.rules.push([i,c]),c.type==="begin"&&this.count++}exec(i){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(i);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const m=this.getMatcher(0);m.lastIndex=this.lastIndex+1,l=m.exec(i)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const i=new o;return s.contains.forEach(c=>i.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&i.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&i.addRule(s.illegal,{type:"illegal"}),i}function r(s,i){const c=s;if(s.isCompiled)return c;[po,ho,ko,fo].forEach(m=>m(s,i)),e.compilerExtensions.forEach(m=>m(s,i)),s.__beforeBegin=null,[mo,bo,go].forEach(m=>m(s,i)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Vt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),i&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ye(c.end)||"",s.endsWithParent&&i.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+i.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(m){return Ao(m==="self"?s:m)})),s.contains.forEach(function(m){r(m,c)}),s.starts&&r(s.starts,i),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),r(e)}function Xt(e){return e?e.endsWithParent||Xt(e.starts):!1}function Ao(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Xt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var Mo="11.8.0";class Do extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ze=Lt,St=ie,kt=Symbol("nomatch"),Io=7,Zt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:zn};function c(p){return i.noHighlightRe.test(p)}function l(p){let b=p.className+" ";b+=p.parentNode?p.parentNode.className:"";const x=i.languageDetectRe.exec(b);if(x){const I=_(x[1]);return I||(Ct(r.replace("{}",x[1])),Ct("Falling back to no-highlight mode for this block.",p)),I?x[1]:"no-highlight"}return b.split(/\s+/).find(I=>c(I)||_(I))}function m(p,b,x){let I="",A="";typeof b=="object"?(I=p,x=b.ignoreIllegals,A=b.language):(be("10.7.0","highlight(lang, code, ...args) has been deprecated."),be("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),A=p,I=b),x===void 0&&(x=!0);const z={code:I,language:A};f("before:highlight",z);const R=z.result?z.result:d(z.language,z.code,x);return R.code=z.code,f("after:highlight",R),R}function d(p,b,x,I){const A=Object.create(null);function z(k,M){return k.keywords[M]}function R(){if(!j.keywords){W.addText(J);return}let k=0;j.keywordPatternRe.lastIndex=0;let M=j.keywordPatternRe.exec(J),F="";for(;M;){F+=J.substring(k,M.index);const Y=ae.case_insensitive?M[0].toLowerCase():M[0],ne=z(j,Y);if(ne){const[se,nn]=ne;if(W.addText(F),F="",A[Y]=(A[Y]||0)+1,A[Y]<=Io&&(Ie+=nn),se.startsWith("_"))F+=M[0];else{const on=ae.classNameAliases[se]||se;X(M[0],on)}}else F+=M[0];k=j.keywordPatternRe.lastIndex,M=j.keywordPatternRe.exec(J)}F+=J.substring(k),W.addText(F)}function H(){if(J==="")return;let k=null;if(typeof j.subLanguage=="string"){if(!t[j.subLanguage]){W.addText(J);return}k=d(j.subLanguage,J,!0,w[j.subLanguage]),w[j.subLanguage]=k._top}else k=v(J,j.subLanguage.length?j.subLanguage:null);j.relevance>0&&(Ie+=k.relevance),W.__addSublanguage(k._emitter,k.language)}function L(){j.subLanguage!=null?H():R(),J=""}function X(k,M){k!==""&&(W.startScope(M),W.addText(k),W.endScope())}function te(k,M){let F=1;const Y=M.length-1;for(;F<=Y;){if(!k._emit[F]){F++;continue}const ne=ae.classNameAliases[k[F]]||k[F],se=M[F];ne?X(se,ne):(J=se,R(),J=""),F++}}function re(k,M){return k.scope&&typeof k.scope=="string"&&W.openNode(ae.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(X(J,ae.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),J=""):k.beginScope._multi&&(te(k.beginScope,M),J="")),j=Object.create(k,{parent:{value:j}}),j}function pe(k,M,F){let Y=Vn(k.endRe,F);if(Y){if(k["on:end"]){const ne=new xt(k);k["on:end"](M,ne),ne.isMatchIgnored&&(Y=!1)}if(Y){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return pe(k.parent,M,F)}function ze(k){return j.matcher.regexIndex===0?(J+=k[0],1):(Ve=!0,0)}function Me(k){const M=k[0],F=k.rule,Y=new xt(F),ne=[F.__beforeBegin,F["on:begin"]];for(const se of ne)if(se&&(se(k,Y),Y.isMatchIgnored))return ze(M);return F.skip?J+=M:(F.excludeBegin&&(J+=M),L(),!F.returnBegin&&!F.excludeBegin&&(J=M)),re(F,k),F.returnBegin?0:M.length}function bt(k){const M=k[0],F=b.substring(k.index),Y=pe(j,k,F);if(!Y)return kt;const ne=j;j.endScope&&j.endScope._wrap?(L(),X(M,j.endScope._wrap)):j.endScope&&j.endScope._multi?(L(),te(j.endScope,k)):ne.skip?J+=M:(ne.returnEnd||ne.excludeEnd||(J+=M),L(),ne.excludeEnd&&(J=M));do j.scope&&W.closeNode(),!j.skip&&!j.subLanguage&&(Ie+=j.relevance),j=j.parent;while(j!==Y.parent);return Y.starts&&re(Y.starts,k),ne.returnEnd?0:M.length}function Ge(){const k=[];for(let M=j;M!==ae;M=M.parent)M.scope&&k.unshift(M.scope);k.forEach(M=>W.openNode(M))}let me={};function De(k,M){const F=M&&M[0];if(J+=k,F==null)return L(),0;if(me.type==="begin"&&M.type==="end"&&me.index===M.index&&F===""){if(J+=b.slice(M.index,M.index+1),!a){const Y=new Error(`0 width match regex (${p})`);throw Y.languageName=p,Y.badRule=me.rule,Y}return 1}if(me=M,M.type==="begin")return Me(M);if(M.type==="illegal"&&!x){const Y=new Error('Illegal lexeme "'+F+'" for mode "'+(j.scope||"<unnamed>")+'"');throw Y.mode=j,Y}else if(M.type==="end"){const Y=bt(M);if(Y!==kt)return Y}if(M.type==="illegal"&&F==="")return 1;if(Fe>1e5&&Fe>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return J+=F,F.length}const ae=_(p);if(!ae)throw ue(r.replace("{}",p)),new Error('Unknown language: "'+p+'"');const Ue=To(ae);let ve="",j=I||Ue;const w={},W=new i.__emitter(i);Ge();let J="",Ie=0,le=0,Fe=0,Ve=!1;try{if(ae.__emitTokens)ae.__emitTokens(b,W);else{for(j.matcher.considerAll();;){Fe++,Ve?Ve=!1:j.matcher.considerAll(),j.matcher.lastIndex=le;const k=j.matcher.exec(b);if(!k)break;const M=b.substring(le,k.index),F=De(M,k);le=k.index+F}De(b.substring(le))}return W.finalize(),ve=W.toHTML(),{language:p,value:ve,relevance:Ie,illegal:!1,_emitter:W,_top:j}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:p,value:Ze(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:le,context:b.slice(le-100,le+100),mode:k.mode,resultSoFar:ve},_emitter:W};if(a)return{language:p,value:Ze(b),illegal:!1,relevance:0,errorRaised:k,_emitter:W,_top:j};throw k}}function u(p){const b={value:Ze(p),illegal:!1,relevance:0,_top:s,_emitter:new i.__emitter(i)};return b._emitter.addText(p),b}function v(p,b){b=b||i.languages||Object.keys(t);const x=u(p),I=b.filter(_).filter(K).map(L=>d(L,p,!1));I.unshift(x);const A=I.sort((L,X)=>{if(L.relevance!==X.relevance)return X.relevance-L.relevance;if(L.language&&X.language){if(_(L.language).supersetOf===X.language)return 1;if(_(X.language).supersetOf===L.language)return-1}return 0}),[z,R]=A,H=z;return H.secondBest=R,H}function y(p,b,x){const I=b&&n[b]||x;p.classList.add("hljs"),p.classList.add(`language-${I}`)}function g(p){let b=null;const x=l(p);if(c(x))return;if(f("before:highlightElement",{el:p,language:x}),p.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),i.throwUnescapedHTML))throw new Do("One of your code blocks includes unescaped HTML.",p.innerHTML);b=p;const I=b.textContent,A=x?m(I,{language:x,ignoreIllegals:!0}):v(I);p.innerHTML=A.value,y(p,x,A.language),p.result={language:A.language,re:A.relevance,relevance:A.relevance},A.secondBest&&(p.secondBest={language:A.secondBest.language,relevance:A.secondBest.relevance}),f("after:highlightElement",{el:p,result:A,text:I})}function h(p){i=St(i,p)}const S=()=>{D(),be("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){D(),be("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let T=!1;function D(){if(document.readyState==="loading"){T=!0;return}document.querySelectorAll(i.cssSelector).forEach(g)}function B(){T&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",B,!1);function P(p,b){let x=null;try{x=b(e)}catch(I){if(ue("Language definition for '{}' could not be registered.".replace("{}",p)),a)ue(I);else throw I;x=s}x.name||(x.name=p),t[p]=x,x.rawDefinition=b.bind(null,e),x.aliases&&G(x.aliases,{languageName:p})}function N(p){delete t[p];for(const b of Object.keys(n))n[b]===p&&delete n[b]}function O(){return Object.keys(t)}function _(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function G(p,{languageName:b}){typeof p=="string"&&(p=[p]),p.forEach(x=>{n[x.toLowerCase()]=b})}function K(p){const b=_(p);return b&&!b.disableAutodetect}function U(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=b=>{p["before:highlightBlock"](Object.assign({block:b.el},b))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=b=>{p["after:highlightBlock"](Object.assign({block:b.el},b))})}function V(p){U(p),o.push(p)}function Z(p){const b=o.indexOf(p);b!==-1&&o.splice(b,1)}function f(p,b){const x=p;o.forEach(function(I){I[x]&&I[x](b)})}function E(p){return be("10.7.0","highlightBlock will be removed entirely in v12.0"),be("10.7.0","Please use highlightElement now."),g(p)}Object.assign(e,{highlight:m,highlightAuto:v,highlightAll:D,highlightElement:g,highlightBlock:E,configure:h,initHighlighting:S,initHighlightingOnLoad:C,registerLanguage:P,unregisterLanguage:N,listLanguages:O,getLanguage:_,registerAliases:G,autoDetection:K,inherit:St,addPlugin:V,removePlugin:Z}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Mo,e.regex={concat:de,lookahead:jt,either:qe,optional:Un,anyNumberOfTimes:Gn};for(const p in Ne)typeof Ne[p]=="object"&&Pt(Ne[p]);return Object.assign(e,Ne),e},ge=Zt({});ge.newInstance=()=>Zt({});var $o=ge;ge.HighlightJS=ge;ge.default=ge;const Tt=Pn($o),At="[A-Za-z$_][0-9A-Za-z$_]*",No=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],_o=["true","false","null","undefined","NaN","Infinity"],Kt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Yt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],qt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Bo=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Oo=[].concat(qt,Kt,Yt);function Ro(e){const t=e.regex,n=(b,{after:x})=>{const I="</"+b[0].slice(1);return b.input.indexOf(I,x)!==-1},o=At,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const I=b[0].length+b.index,A=b.input[I];if(A==="<"||A===","){x.ignoreMatch();return}A===">"&&(n(b,{after:I})||x.ignoreMatch());let z;const R=b.input.substring(I);if(z=R.match(/^\s*=/)){x.ignoreMatch();return}if((z=R.match(/^\s+extends\s+/))&&z.index===0){x.ignoreMatch();return}}},i={$pattern:At,keyword:No,literal:_o,built_in:Oo,"variable.language":Bo},c="[0-9](_?[0-9])*",l=`\\.(${c})`,m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${m})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${m})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:i,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},y={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,y,g,h,{match:/\$\d+/},d];u.contains=T.concat({begin:/\{/,end:/\}/,keywords:i,contains:["self"].concat(T)});const D=[].concat(C,u.contains),B=D.concat([{begin:/\(/,end:/\)/,keywords:i,contains:["self"].concat(D)}]),P={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Kt,...Yt]}},_={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},K={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function U(b){return t.concat("(?!",b.join("|"),")")}const V={match:t.concat(/\b/,U([...qt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},Z={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},f={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",p={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:i,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),_,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,y,g,h,C,{match:/\$\d+/},d,O,{className:"attr",begin:o+t.lookahead(":"),relevance:0},p,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},Z,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},V,K,N,f,{match:/\$[(.]/}]}}const Jt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:r,tr:s,td:i,thead:c,th:l}=t.tags,m=["sm","md","lg"];return function({Item:u,name:v}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(s(l(v??"Variant/Color"),oe.map(y=>l(y)))),r(Tn.map(y=>s(l(y),oe.map((g,h)=>i(u({color:g,variant:y,size:m[h%3]},{index:h}))))))))}},q=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:r,p:s,h2:i,h3:c,pre:l,div:m,code:d}=t.tags;Tt.registerLanguage("javascript",Ro);const u=Jt(e),v=({text:y})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:g})=>{g.innerHTML=Tt.highlight(y,{language:"js"}).value}}));return function(g){return o({class:n``},r(g.title),s(g.description),g.gridItem&&[i("Gallery"),g.gridItem&&u({Item:g.gridItem(e)})],i("Usage"),c("Import"),v({text:g.importStatement}),i("Examples"),g.examples.map(h=>a(r(h.title),s(h.description),m(h.createComponent(e)),v({text:h.code}))))}},Po=()=>oe.map(e=>`
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
`);function Se(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:r,ul:s,li:i,header:c,h3:l,button:m}=n.tags,d=n.state(""),u=g=>h=>{d.val==g?d.val="":d.val=g},v=({element:g,open:h})=>{const S=()=>{g.removeEventListener("transitionend",S)};function C(D){D.addEventListener("transitionend",S),window.requestAnimationFrame(()=>{D.style.height="0px"})}function T(D){D.addEventListener("transitionend",S),D.style.height=D.scrollHeight+"px"}g.scrollHeight!=0&&(h?T(g):C(g))},y=o`
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
    ${Po()}
  `;return function(...h){let[{color:S,variant:C="outline",size:T="md",content:D,...B},...P]=Q(h);const N=O=>{const{Header:_,Content:G,name:K}=O;return i({class:$(S,C,T),onclick:u(K)},l({class:()=>$(d.val==K&&"active")},m({type:"button","aria-controls":`bau-${K}`,"aria-expanded":({element:U})=>d.val==K},_(O))),r({class:"content",role:"region",id:`bau-${K}`,"data-state":({element:U})=>{const V=d.val==K;return v({element:U,open:V}),V}},G(O)))};return r({class:$("accordion",y,t==null?void 0:t.class,B.class)},s(a.map(N)))}}const Lo=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return s=>r({...s})},jo=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]})()},Ho=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
  return Accordion();
};
`,Qt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},zo=e=>{const{css:t}=e,n=Qt(e);return Se(e,{accordionDefs:n})({color:"warning",class:t`
      &.accordion {
        & ul {
          & li {
            width: fit-content;
          }
        }
      }
    `})},Go=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context, { accordionDefs });

  return Accordion({
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
`,Uo=e=>{const{css:t}=e,n=Qt(e),o=Se(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
      `})},Fo=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Vo={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ho,createComponent:jo},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Go,createComponent:zo},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Fo,createComponent:Uo}],gridItem:Lo},Wo=e=>{const t=q(e);return()=>t(Vo)},Xo={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Zo=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Ko=()=>oe.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function ke(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r,i:s}=n.tags;Zo({css:o,createGlobalStyles:a});const i=o`
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
    ${Ko()}
  `,c=ee(e),l=({onclick:m})=>c({"aria-label":"Close",onclick:m,class:"button-close"},"✖");return function(d,...u){const{variant:v="outline",color:y="neutral",size:g="md",onRemove:h,...S}=d;return r({...S,class:$(`alert-${v}`,v,y,g,i,t==null?void 0:t.class,d.class,"alert"),role:"alert"},s({class:"icon"},Xo[y]),r({class:"content"},...u),h&&l({onclick:h}))}}const Yo=e=>{const t=ke(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},qo=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags;return ke(e)({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Jo=`import alert from "@grucloud/bau-ui/alert";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { h4, p } = bau.tags;

  const Alert = alert(context);
  return Alert(
    {
      color: "danger",
    },
    h4("Something went wrong"),
    p("Error code ", 404),
    p("Status ", "Not Found")
  );
};
`,Qo=e=>{const{css:t}=e;return ke(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `})({color:"warning"},"Your coffee supply is getting low.")},ea=`import alert from "@grucloud/bau-ui/alert";
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

  return Alert({ color: "warning" }, "Your coffee supply is getting low.");
};
`,ta={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Jo,createComponent:qo},{title:"Custom Alert ",description:"A custom alert.",code:ea,createComponent:Qo}],gridItem:Yo},na=e=>{const t=q(e);return()=>t(ta)},oa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:i}=n.tags,c=n.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},m={stack:o`
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
    `},d=({id:u,status:v})=>{const y=c.val.findIndex(g=>g.id===u);y!=-1&&(c.val[y].status=v)};return function(v={},...y){const g=({id:C})=>{d({id:C,status:"removing"});const T=c.val.findIndex(D=>D.id===C);T!=-1&&c.val.splice(T,1)},h=({Component:C})=>{const T={id:Math.random().toString(10).split(".")[1],Component:C,status:"inserting"};c.val.length>=r&&g({id:c.val[0].id}),c.val.push(T),setTimeout(()=>g(T),s)},S=C=>i({class:m.item,onclick:()=>g(C)},C.Component());return document.addEventListener("alert.add",C=>h(C.detail)),document.addEventListener("alert.remove",C=>g(C.detail)),i({class:$(m.stack,t==null?void 0:t.class,v.class)},n.loop(c,i(),S))}},aa=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=oa(e,{deleteAfterDuration:2e4}),r=ee(e),s=ke(e);return o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ra=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import alert from "@grucloud/bau-ui/alert";
import alertStack from "@grucloud/bau-ui/alertStack";

export default (context: Context) => {
  const { tr, bau } = context;
  const { section } = bau.tags;

  const AlertStack = alertStack(context, { deleteAfterDuration: 20e3 });
  const Button = button(context);
  const Alert = alert(context);

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
`,sa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ra,createComponent:aa}]},ia=e=>{const t=q(e);return()=>t(sa)},ca=({keyframes:e})=>({hideRight:e`
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
 `}),la=e=>{const{bau:t}=e,{section:n,div:o,h1:a}=t.tags,r=_t(),s=ee(e),i=ca(e);return function(){const c=t.state(!0),l=o(),m=d=>{l.replaceChildren(r({parent:l,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},o(d.val?"Ciao":"")))};return m(c),n({id:"animate"},o(a("Test Animate"),o(s({onclick:()=>{c.val=!c.val,m(c)}},()=>c.val?"Hide":"Show")),l))}};function et(e,t){const{bau:n,css:o}=e,{span:a,img:r}=n.tags,s=n.state(!0),i=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,i.val=!0},m=o`
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
  `;return function(...u){let[{color:v,variant:y="outline",size:g="md",width:h=30,height:S=30,...C},...T]=Q(u);return a({class:$(m,t==null?void 0:t.class,C.class)},()=>s.val?"Loading...":"",()=>i.val&&"Error",r({width:h,height:S,onload:c,onerror:l,class:$(v,y,g,m,t==null?void 0:t.class,C.class),...C}))}}const ua=e=>{const{css:t}=e,n=et(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},da=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=et(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},pa=`import avatar from "@grucloud/bau-ui/avatar";
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

  return section(
    Avatar({
      src: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",
      alt: "my avatar",
    })
  );
};
`,ma={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:pa,createComponent:da}],gridItem:ua},ba=e=>{const t=q(e);return()=>t(ma)};function tt(e,t){const{bau:n,css:o,window:a}=e,{dialog:r}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:m,onClose:d,...u},...v]=Q(c);const y=S=>{h.style.opacity=1,h.showModal();const C=m.getBoundingClientRect(),T=h.getBoundingClientRect();C.x<a.innerWidth/2?h.style.left=C.left+"px":h.style.left=C.right-T.width+"px",C.y<a.innerHeight/2?h.style.top=C.top+C.height+"px":h.style.top=C.top-T.height+"px"},g=S=>{const C=()=>{h.close(),h.removeEventListener("transitionend",C)};h.addEventListener("transitionend",C),h.style.opacity=0},h=r({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:S=>S.target===h&&(g(),d==null?void 0:d.call())},l);return h.closeDialog=g,h.openDialog=y,h}}const ha=()=>oe.map(e=>`
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
`);function Pe(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
    ${ha()}
  `;return function(i){const{size:c="md",variant:l="outline",color:m="neutral",name:d,id:u,disabled:v,...y}=i;return a({...y,class:$("input",c,m,l,r,t==null?void 0:t.class,y.class)})}}const ga=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function nt(e,t){const{bau:n,css:o}=e,{div:a,li:r,ul:s}=n.tags,i=tt(e),c=ee(e),l=Pe(e),m=Ce(e),d=o`
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

    ${ga()}
  `,u=n.state(""),v=n.state(""),y=n.state(!1),g=n.state(0),h=()=>{y.val=!1};return function(...C){let[{variant:T="outline",color:D,size:B="md",id:P,label:N,placeholder:O,Option:_,options:G,getOptionLabel:K=({label:L})=>L,...U},...V]=Q(C);const Z=n.state(G),f=()=>{H.openDialog(),y.val=!0,v.val="",Z.val=G},E=()=>{H.closeDialog(),y.val=!1,v.val=""},p=L=>{const{value:X}=L.target;v.val=X,X?Z.val=G.filter(te=>K(te).match(new RegExp(`${X}`,"i"))):Z.val=G},b=L=>{y.val?E():f()},x=({option:L,index:X})=>te=>{u.val=K(L),g.val=X,E()},I=L=>{switch(console.log("onkeydown",L.key,g.val),L.key){case"Escape":E();break;case"ArrowDown":g.val<Z.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=Z.val.length-1:g.val--;break;case"Enter":u.val=K(Z.val[g.val]),v.val="",E();break}},A=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":y,"aria-label":N,onclick:b,variant:T,color:D,size:B},()=>!u.val&&N,u),z=l({id:P,value:v,placeholder:O,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":y,oninput:p,onkeydown:I,variant:T,color:D,size:B}),H=i({id:P,triggerEl:A,contentEl:(()=>a({class:$(T,D,B,"content")},z,()=>m({class:$(T,D,B)},Z.val.map((L,X)=>r({class:()=>$(g.val==X&&"active"),onclick:x({option:L,index:X})},_(L))))))(),onClose:h});return a({...U,class:$("autocomplete",d,t==null?void 0:t.class,U==null?void 0:U.class)},A,H)}}const fa=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,r=nt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},va=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,s=nt(e);return o(s({options:[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Option:l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code)),getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},xa=`import { Context } from "@grucloud/bau-ui/context";
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

  return section(
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
`,wa={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:xa,createComponent:va}],gridItem:fa},ya=e=>{const t=q(e);return()=>t(wa)};function ot(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m="md",content:d,...u},...v]=Q(i);return a({...u,class:$("badge",r,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:$(c,l,m)},d),...v)}}const Ea=e=>{const t=ot(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},Ca=e=>{const{bau:t}=e,{section:n}=t.tags,o=ot(e);return n(o({content:"10"},"☏"))},Sa=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return section(Badge({ content: "10" }, "\\u260F"));
};
`,ka={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Sa,createComponent:Ca}],gridItem:Ea},Ta=e=>{const t=q(e);return()=>t(ka)};function at(e,t){const{bau:n,css:o}=e,{ul:a,li:r,a:s,span:i}=n.tags,c=ee(e),l=o`
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
  `;return function(...d){let[{color:u,variant:v="outline",size:y="md",items:g,...h},...S]=Q(d);return a({...h,class:$(l,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:C,name:T})=>r((C?c:i)({href:C,color:u,variant:v,size:y,class:$(u,v,y)},T))))}}const Aa=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=at(e);return o=>n({...o,...t})},Ma=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=at(e);return n(a(o))},Da=`import breadcrumbs, {
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

  return section(
    //
    Breadcrumbs(breadcrumbsProps)
  );
};
`,Ia={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Da,createComponent:Ma}],gridItem:Aa},$a=e=>{const t=q(e);return()=>t(Ia)},Na=e=>{const t=ee(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},_a=e=>{const{bau:t}=e,{section:n}=t.tags,o=ee(e);return n(o({color:"primary",variant:"outline",onclick:()=>{alert("Click")}},"Click me"))},Ba=`import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Button = button(context);
  const onclick = () => {
    alert("Click");
  };
  return section(
    //
    Button({ color: "primary", variant: "outline", onclick }, "Click me")
  );
};
`,Oa={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Ba,createComponent:_a}],gridItem:Na},Ra=e=>{const t=q(e);return()=>t(Oa)},Pa=()=>oe.map(e=>`
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
`);function Le(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
    ${Pa()}
  `;return function(...i){let[{variant:c="outline",size:l="md",color:m,...d},...u]=Q(i);return a({...d,class:$("button-group",c,m,l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...u)}}const La=e=>{const t=["ONE","TWO","THREE"],n=ee(e),o=Le(e);return a=>o({...a},t.map(r=>n(a,r)))},ja=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=ee(e),r=Le(e),s="primary",i="solid";return n(r({color:s,variant:i},o.map(c=>a({color:s,variant:i},c))))},Ha=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
  return section(
    ButtonGroup(
      { color, variant },
      groups.map((group) => Button({ color, variant }, group))
    )
  );
};
`,za={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Ha,createComponent:ja}],gridItem:La},Ga=e=>{const t=q(e);return()=>t(za)};function rt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>oe.map(i=>`
&.calendar.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:m="plain",size:d,...u},...v]=Q(c);return a({...u,type:"date",class:$("calendar",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Ua=e=>{const t=rt(e);return n=>t({...n})},Fa=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),r=rt(e);return n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Va=`import calendar from "@grucloud/bau-ui/calendar";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, label } = bau.tags;

  const calendarState = bau.state("2023-08-08");

  const Calendar = calendar(context);

  return section(
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
`,Wa={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Va,createComponent:Fa}],gridItem:Ua},Xa=e=>{const t=q(e);return()=>t(Wa)};function st(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...i){let[{size:c="md",variant:l="outline",color:m="neutral",onclick:d,...u},...v]=Q(i);return a({...u,onclick:d,class:$("chip",r,c,l,m,d&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Za=e=>{const t=st(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},Ka=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return n(o({variant:"outline",color:"primary"},"My Chip"))},Ya=`import chip from "@grucloud/bau-ui/chip";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Chip = chip(context);

  return section(
    //
    Chip({ variant: "outline", color: "primary" }, "My Chip")
  );
};
`,qa={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Ya,createComponent:Ka}],gridItem:Za},Ja=e=>{const t=q(e);return()=>t(qa)};function it(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m="md",...d},...u]=Q(i);return a({type:"checkbox",required:"required",...d,class:$(r,c,l,m,t==null?void 0:t.class,d==null?void 0:d.class)})}}const Qa=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=it(e);return r=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${r.color} ${r.variant} ${r.size}`,a({id:`myCheckbox-gallery-${r.color}-${r.variant}-${r.size}`,name:`myCheckbox-gallery-${r.color}-${r.variant}`,...r}))},er=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,r=it(e),s=t.state(!1),i=c=>{s.val=!!c.target.checked};return o(a({class:n`
          display: inline-flex;
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          gap: 1rem;
        `},"My Checkbox",r({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:i})))},tr=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, label } = bau.tags;

  const Checkbox = checkbox(context);

  const checkboxState = bau.state(false);

  const onChange = (event: any) => {
    checkboxState.val = event.target.checked ? true : false;
  };

  return section(
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
`,nr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:tr,createComponent:er}],gridItem:Qa},or=e=>{const t=q(e);return()=>t(nr)};function ar(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m,openState:d,...u},...v]=Q(i);return a({class:$(r,t==null?void 0:t.class,u.class)},a({class:()=>$("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>$("content",d.val&&"content-open")},v))}}const rr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),r=ar(e),s=ee(e),i=Rt(e);return n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},i()))},sr=`import drawer from "@grucloud/bau-ui/drawer";
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

  return section(
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
`,ir={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:sr,createComponent:rr}]},cr=e=>{const t=q(e);return()=>t(ir)},lr=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Oe(e,{base:t.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},ur=e=>{const{bau:t,config:n}=e,{section:o}=t.tags,a=t.state(window.location.pathname.replace(n.base,"")),r={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},s=Oe(e,{base:n.base+"/components/drillDownMenu"});return o(s({tree:r,pathnameState:a}))},dr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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

  return section(DrillDownMenu({ tree, pathnameState }));
};
`,pr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:dr,createComponent:ur}],gridItem:lr},mr=e=>{const t=q(e);return()=>t(pr)};function ct(e,t){const{bau:n,css:o}=e,{div:a,span:r,label:s,input:i}=n.tags,c={base:o`
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
    `};return function(m,...d){const{variant:u="outline",color:v="neutral",size:y="md",Component:g,disabled:h,...S}=m;return a({class:$(c.base,h&&c.disabled,t==null?void 0:t.class,m.class)},s({class:$(u,v,y)},g({disabled:h}),i({type:"file",disabled:h,...S})),r({class:"filename-display"}))}}const br=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:i,span:c}=n.tags,l=n.state("No file selected"),m=ct(e),d=v=>{const y=v.target.files[0];y?l.val=y.name:l.val="No file selected"},u=({disabled:v})=>i({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return v=>m({Component:u,name:"file",accept:"text/*",onchange:d,...v})},hr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:i,div:c,span:l}=n.tags,m=n.state("No file selected"),d=ct(e);return i(d({Component:({disabled:y})=>c({class:$(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,y&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload"))),name:"file",accept:"text/*",onchange:y=>{const g=y.target.files[0];g?m.val=g.name:m.val="No file selected"}}),c("File selected: ",m))},gr=`import classNames from "@grucloud/bau-css/classNames";
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
`,fr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:gr,createComponent:hr}],gridItem:br},vr=e=>{const t=q(e);return()=>t(fr)},xr=e=>{const t=Pe(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},wr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Pe(e);return n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},yr=`import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Input = input(context);

  return section(
    Input({
      id: "my-input",
      name: "my-input",
      placeholder: "Enter Text",
      // oninput: (event)=> {}
    })
  );
};
`,Er={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:yr,createComponent:wr}],gridItem:xr},Cr=e=>{const t=q(e);return()=>t(Er)};function lt(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
    ${(()=>oe.map(i=>`
&.modal.plain.${i} {
  color: inherit;
}
&.modal.outline.${i} {
  color: inherit;
}
&.modal.soft.${i} {
  color: inherit;
}
&.modal.solid.${i} {

}
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:m="outline",size:d="md",...u},...v]=Q(c);return a({class:$("modal",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Sr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:r,p:s}=t.tags,i=ee(e),c=lt(e),l=()=>o(Array(10).fill("").map((d,u)=>s(u+1,". Some text here"))),m=d=>{const u=c({id:"my-dialog",...d},a("Header"),l(),r(i({variant:"outline",color:d.color,onclick:()=>{u.close()}},"Cancel"),i({variant:"solid",color:d.color,onclick:()=>{u.close()}},"OK")));return u};return d=>{const u=m(d);return n(i({...d,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},kr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:r,p:s}=t.tags,i="neutral",c=ee(e),l=lt(e),m=()=>o(Array(10).fill("").map((u,v)=>s(v+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),m(),r(c({variant:"outline",color:i,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:i,onclick:()=>{d.close()}},"OK")));return n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Tr=`import modal from "@grucloud/bau-ui/modal";
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

  return section(
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
`,Ar={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Tr,createComponent:kr}],gridItem:Sr},Mr=e=>{const t=q(e);return()=>t(Ar)},Dr=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:r}=t.tags,s=ee(e),i=tt(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),r("My Content")),m=c(),d=i({id:"my-popover-left",triggerEl:m,contentEl:l()});return n(o(m,d))},Ir=`import popover from "@grucloud/bau-ui/popover";
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

  return section(div(triggerEl, popoverEl));
};
`,$r={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ir,createComponent:Dr}]},Nr=e=>{const t=q(e);return()=>t($r)},_r=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function ut(e,t){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,s=ee(e),i=tt(e),c=Ce(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${_r()}
  `,m=n.state(""),d=n.state(!1),u=n.state(0);return function(...y){let[{color:g="neutral",variant:h="outline",size:S="md",id:C,label:T,Option:D,options:B,getOptionLabel:P=({label:b})=>b,...N},...O]=Q(y);const _=()=>{p.openDialog(),p.focus(),d.val=!0},G=()=>{p.closeDialog(),d.val=!1},K=()=>{d.val=!1},U=b=>{d.val?G():_()},V=({option:b,index:x})=>I=>{m.val=P(b),u.val=x,G()},Z=b=>{switch(b.preventDefault(),b.key){case"Escape":G();break;case"ArrowDown":u.val<B.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=B.length-1:u.val--;break;case"Enter":d.val?(m.val=P(B[u.val]),G()):_();break}},f=()=>c({tabindex:"0",class:$(g,h)},B.map((b,x)=>r({class:()=>$(u.val==x&&"active"),onclick:V({option:b,index:x})},D(b)))),E=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":T,onclick:U,color:g,variant:h,size:S},()=>!m.val&&T,m),p=i({id:C,triggerEl:E,contentEl:f(),onClose:K});return a({...N,class:$("select",g,S,l,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:Z},E,p)}}const Br=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,r=ut(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Or=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,s=ut(e);return o(s({options:[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Option:l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code)),getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Rr=`import select from "@grucloud/bau-ui/select";
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

  return section(
    Select({
      options,
      Option,
      getOptionLabel: ({ label }: any) => label,
      label: "Select a country...",
    })
  );
};
`,Pr={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Rr,createComponent:Or}],gridItem:Br},Lr=e=>{const t=q(e);return()=>t(Pr)};function Te(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(i=>`
&.slider.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:m="outline",size:d,...u},...v]=Q(c);return a({...u,type:"range",class:$("slider",l,m,d,s,t==null?void 0:t.class,u.class)},...v)}}const jr=e=>{const{bau:t}=e,n=t.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=Te(e);return r=>a({...r,oninput:o})},Hr=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:r}=t.tags,s=t.state(0),i=l=>{s.val=l==null?void 0:l.target.value},c=Te(e);return n(o(a("Slider with step, min and max",r,c({oninput:i,name:"slider-simple",step:20,min:-100,max:100}))))},zr=`import slider from "@grucloud/bau-ui/slider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, form, label, br } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);

  return section(
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
`,Gr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),m=u=>{l.val=u==null?void 0:u.target.value},d=Te(e);return o(a(r({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:m,class:n`
          width: 300px;
          margin: 0;
        `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
            width: 300px;
            display: flex;
            justify-content: space-between;
          `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},Ur=`import slider from "@grucloud/bau-ui/slider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, form, label, datalist, br, option } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);

  return section(
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
`,Fr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),m=u=>{l.val=u==null?void 0:u.target.value},d=Te(e);return o(a({class:n`
          display: flex;
        `},r({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:m,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
          width: 30px;
          appearance: slider-vertical;
        `}),s({id:"markers-vertical",class:n`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},Vr=`import slider from "@grucloud/bau-ui/slider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, form, label, datalist, br, option } = bau.tags;

  const sliderState = bau.state(0);

  const oninput = (event: any) => {
    sliderState.val = event?.target.value;
  };

  const Slider = slider(context);

  return section(
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
`,Wr={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:zr,createComponent:Hr},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ur,createComponent:Gr},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Vr,createComponent:Fr}],gridItem:jr},Xr=e=>{const t=q(e);return()=>t(Wr)},Mt={sm:16,md:32,lg:64};function je(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:r,animateTransform:s,rect:i}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:m="color-base",variant:d="outline",visibility:u=!0,...v}={}){return a({class:$(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${m});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:Mt[l],height:Mt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Zr=e=>{const t=je(e);return n=>t({...n})},Kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=je(e);return n(o({}))},Yr=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return section(Spinner({}));
};
`,qr={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Yr,createComponent:Kr}],gridItem:Zr},Jr=e=>{const t=q(e);return()=>t(qr)},Qr=()=>oe.map(e=>`
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
`);function dt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
    ${Qr()}
  `;return function(...i){let[{color:c="neutral",variant:l="plain",size:m="md",...d},...u]=Q(i);return a({...d,class:$("switch",r,c,l,m,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...u)}}const es=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,r=dt(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",r({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",r({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ts=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r}=t.tags,s=dt(e);return o(a(r({class:n`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},ns=`import createSwitch from "@grucloud/bau-ui/switch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, form, label } = bau.tags;

  const Switch = createSwitch(context);

  return section(
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
`,os={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ns,createComponent:ts}],gridItem:es},as=e=>{const t=q(e);return()=>t(os)},rs=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function fe(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:r,ul:s,li:i}=n.tags,c=n.state(a),l=n.state(a[0]),m=u=>c.val.find(v=>v.name==u),d={base:o`
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
      ${rs()}
    `};return function(...v){let[{color:y,variant:g="plain",size:h,...S},...C]=Q(v);const T=B=>{const{Header:P,disabled:N,name:O}=B;return i({class:()=>$(l.val.name==O&&"active",N&&"disabled"),onclick:_=>_.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},P(B))},D=r({class:$("tabs",d.base,g,h,y,t==null?void 0:t.class,S.class)},n.loop(c,s(),T),()=>l.val.Content?l.val.Content({}):"");return D.addEventListener("tab.select",B=>{var O,_;const{tabName:P}=B.detail,N=m(P);N&&((O=l.val.exit)==null||O.call(),l.val=N,(_=N.enter)==null||_.call())},!1),D.addEventListener("tab.add",B=>{var N;const{tab:P}=B.detail;(N=P.enter)==null||N.call(),c.val.push(P)},!1),D.addEventListener("tab.remove",B=>{var N;const P=c.val.findIndex(O=>O.name==B.detail.tabName);P>0&&((N=c.val[P].exit)==null||N.call(),c.val.splice(P,1))},!1),D}}const ss=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=fe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>r(s)},is=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return fe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]})({variant:"outline",color:"neutral"})},cs=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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

  return Tabs({ variant: "outline", color: "neutral" });
};
`,ls=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return fe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]})({variant:"outline",color:"success"})},us=`import tabs from "@grucloud/bau-ui/tabs";
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

  return Tabs({ variant: "outline", color: "success" });
};
`,en=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},ds=e=>{const{css:t}=e;return fe(e,{tabDefs:en(e)})({variant:"outline",color:"neutral",class:t`
      flex-direction: column-reverse;
    `})},ps=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";
import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const Tabs = tabs(context, { tabDefs: createTabDefs(context) });

  return Tabs({
    variant: "outline",
    color: "neutral",
    class: css\`
      flex-direction: column-reverse;
    \`,
  });
};
`,ms=e=>{const{css:t}=e,n=en(e);return fe(e,{tabDefs:n})({variant:"outline",color:"neutral",class:t`
      & ul {
        justify-content: center;
      }
    `})},bs=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const tabDefs = createTabDefs(context);

  const Tabs = tabs(context, { tabDefs });

  return Tabs({
    variant: "outline",
    color: "neutral",
    class: css\`
      & ul {
        justify-content: center;
      }
    \`,
  });
};
`,hs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:cs,createComponent:is},{title:"Extended Tabs",description:"An extended tabs.",code:us,createComponent:ls},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:ps,createComponent:ds},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:bs,createComponent:ms}],gridItem:ss},gs=e=>{const t=q(e);return()=>t(hs)};function Ae(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r}=n.tags;a`
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
  `;return function(...c){let[{...l},...m]=Q(c);return r({...l,class:$("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...m)}}const fs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags;function d(h,S,C,T,D){return{name:h,calories:S,fat:C,carbs:T,protein:D}}const u=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],v=({name:h,calories:S})=>s(r(h),r({class:n`
            text-align: right;
          `},S)),y=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Ae(e,{class:n`
      max-width: 650px;
    `});return o(g(i(m("Basic Table"),y(),l(u.map(v)))))},vs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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

  return section(
    TableSimple(
      table(caption("Basic Table"), TableHeader(), tbody(rows.map(Row)))
    )
  );
};
`;function xe(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const xs=[xe("Frozen yoghurt",159,6,24,4),xe("Ice cream sandwich",237,9,37,4.3),xe("Eclair",262,16,24,6),xe("Cupcake",305,3.7,67,4.3),xe("Gingerbread",356,16,49,3.9)],ws=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags,d=({name:y,calories:g})=>s(r(y),r({class:n`
            text-align: right;
          `},g)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=Ae(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return o(v(i(m("Table Dense"),u(),l(xs.map(d)))))},ys=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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

  return section(
    TableDense(
      table(caption("Table Dense"), TableHeader(), tbody(rows.map(Row)))
    )
  );
};
`;function we(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Es=[we("Frozen yoghurt",159,6,24,4),we("Ice cream sandwich",237,9,37,4.3),we("Eclair",262,16,24,6),we("Cupcake",305,3.7,67,4.3),we("Gingerbread",356,16,49,3.9)],Cs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags,d=({name:y,calories:g})=>s(r(y),r({class:n`
            text-align: right;
          `},g)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=Ae(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return o(v(i(m("Table Zebra"),u(),l(Es.map(d)))))},Ss=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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

  return section(
    TableZebra(
      table(caption("Table Zebra"), TableHeader(), tbody(rows.map(Row)))
    )
  );
};
`,ks={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:vs,createComponent:fs},{title:"Dense",description:"A dense table.",code:ys,createComponent:ws},{title:"Zebra",description:"A zebra table.",code:Ss,createComponent:Cs}]},Ts=e=>{const t=q(e);return()=>t(ks)};function tn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=Le(e),s=ee(e),i=je(e),c=o`
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
  `,l=({label:y,icon:g,...h})=>s({"aria-label":y,title:y,...h},g),m=({count:y,totalCount:g,page:h,rowsPerPage:S})=>a({class:"pages-numbers"},Number(h-1)*Number(S)+(y>0?1:0),"-",Math.min(h*S,g)," of ",g),d=({count:y,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(y>0?1:0),"-",g*h),u=y=>y<=1,v=(y,g,h)=>y>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:S=0,page:C=1,rowsPerPage:T=50,onPageChange:D,isLoading:B=!1,disableFirst:P=()=>u(C),disablePrevious:N=()=>u(C),disableNext:O=()=>v(C,S,T),disableLast:_=()=>v(C,S,T),...G},...K]=Q(g);const U=Math.max(0,Math.ceil(S/T)),V=D({page:1}),Z=D({page:C-1}),f=D({page:C+1}),E=D({page:U}),p=[{label:"First",icon:"⟪",onclick:V,disabled:P()},{label:"Previous",icon:"⟨",onclick:Z,disabled:N()},{label:"Next",icon:"⟩",onclick:f,disabled:O()},{label:"Last",icon:"⟫",onclick:E,disabled:_()}];return a({...G,class:$("table-pagination",c,B&&"disabled",t==null?void 0:t.class,G==null?void 0:G.class)},i({class:"spinner",visibility:B,size:"md"}),S>0?m({count:h,totalCount:S,page:C,maxPages:U,rowsPerPage:T}):d({count:h,page:C,maxPages:U,rowsPerPage:T}),r({variant:"outline",color:"neutral"},p.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const As=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ms=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:s,thead:i,tbody:c}=t.tags,l=As(45),m=({name:C,email:T})=>r(a(C),a(T)),d=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=tn(e),v=Ae(e,{class:n`
      max-width: 650px;
    `}),y=t.state(l),g=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>y.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),S=({page:C})=>T=>{g.val.page=C};return()=>v(s(d(),()=>c(h.val.map(m))),()=>u({...g.val,onPageChange:S}))},Ds=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:s,thead:i,tbody:c,div:l}=t.tags,m=t.state(!1),d=t.state([]),u=t.state(""),v=t.derive(()=>d.val.length),y=t.state(1),g=t.state(10),h=t.derive(()=>d.val),S=_=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(_).toString()}`,C=({page:_})=>G=>{y.val=_,T(S({page:_,per_page:g.val}))};T(S({page:1,per_page:g.val}));async function T(_){try{m.val=!0;const G=await fetch(_,{});if(G.ok){const K=await G.json();d.val=K;return}throw G}catch(G){u.val=G.message}finally{m.val=!1}}const D=({name:_,description:G,stargazers_count:K})=>r(a(_),a(G),a({class:n`
            text-align: right;
          `},K)),B=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=tn(e),N=Ae(e,{class:n`
      min-width: 650px;
    `}),O=({message:_})=>l(_);return()=>N(()=>P({rowsPerPage:g.val,page:y.val,count:v.val,totalCount:-1,isLoading:m.val,onPageChange:C,disableNext:()=>!1}),s(B(),()=>u.val&&O({message:u.val}),()=>c(h.val.map(D))))},Is=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:r,h2:s,tr:i}=t.tags,c=Ms(e),l=Ds(e),m=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(i("Table Pagination")),r("Asynchronous Pagination"),m(l()),r("Simple Pagination"),m(c()))};function He(e,t){const{bau:n,css:o,window:a}=e,{div:r}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:m="bottom-start",color:d="neutral",variant:u="outline",size:v="md",...y},...g]=Q(c);const h=r({class:$("container",...m.split("-"))},r({class:$("content",d,u,v),role:"tooltip"},l)),S=N=>`move-to-${N}`,C=(N,O,_)=>{if(N()){const G=S(O);h.classList.add(G),h.classList.add(O),h.classList.remove(_)}},T=(N,O)=>{const _=S(N);h.classList.contains(_)&&(h.classList.remove(_),h.classList.add(O),h.classList.remove(N))},D=N=>{const O=h.getBoundingClientRect();C(()=>O.x<0,"right","left"),C(()=>O.x+O.width>a.innerWidth,"left","right"),C(()=>O.y<0,"bottom","top"),C(()=>O.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},B=N=>{h.classList.remove("visible"),T("right","left"),T("left","right"),T("bottom","top"),T("top","bottom")};return r({...y,class:$("tooltip",s,t==null?void 0:t.class,y==null?void 0:y.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",D),N.addEventListener("mouseout",B)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",D),N.removeEventListener("mouseout",B)}},...g,h)}}const $s=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r}=t.tags,s=ee(e),i=He(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",r("tooltip")," can be any component"));return l=>i({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Ns=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,r=ee(e);return He(e)({side:"bottom-start",titleEl:(()=>n(o("A ",a("tooltip")," can be any component")))()},r("tooltip"))},_s=`import tooltip from "@grucloud/bau-ui/tooltip";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p, em } = bau.tags;
  const Button = button(context);

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(p("A ", em("tooltip"), " can be any component"));

  return Tooltip(
    { side: "bottom-start", titleEl: TooltipContent() },
    Button("tooltip")
  );
};
`,Bs=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r}=t.tags,s=ee(e),i=He(e),c=()=>o(a("A ",r("tooltip")," can be any component"));return(()=>[o({class:n`
          display: flex;
          justify-content: space-around;
        `},i({side:"top-start",titleEl:c()},s("top-start")),i({side:"top-centered",titleEl:c()},s("top-centered")),i({side:"top-end",titleEl:c()},s("top-end"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-start",titleEl:c()},s("left-start")),i({side:"right-start",titleEl:c()},s("right-start"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-centered",titleEl:c()},s("left-centered")),i({side:"right-centered",titleEl:c()},s("right-centered"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-end",titleEl:c()},s("left end")),i({side:"right-end",titleEl:c()},s("right end"))),o({class:n`
          display: flex;
          justify-content: space-around;
        `},i({side:"bottom-start",titleEl:c()},s("bottom start")),i({side:"bottom-centered",titleEl:c()},s("bottom centered")),i({side:"bottom-end",titleEl:c()},s("bottom end")))])()},Os=`import tooltip from "@grucloud/bau-ui/tooltip";
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

  return TooltipGrid();
};
`,Rs={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:_s,createComponent:Ns},{title:"Grid",description:"Various tooltip position",code:Os,createComponent:Bs}],gridItem:$s},Ps=e=>{const t=q(e);return()=>t(Rs)},Ls=e=>{const t=Be(e);return n=>t(n)},js=e=>{const{bau:t}=e,{section:n}=t.tags,o=Be(e);return n(o({}))},Hs=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return section(ThemeSwitch({}));
};
`,zs={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Hs,createComponent:js}],gridItem:Ls},Gs=e=>{const t=q(e);return()=>t(zs)},Us=({css:e,createGlobalStyles:t})=>(t`
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
    `});function pt(e,t){const{bau:n,css:o,createGlobalStyles:a,window:r}=e,{renderMenuItem:s}=t,{ul:i,li:c,nav:l,div:m}=n.tags,d=Us({css:o,createGlobalStyles:a}),u=({element:h,closeState:S})=>{h.scrollHeight!=0&&(S.val?v(h):y(h))};function v(h){h.style.height=h.scrollHeight+"px";const S=()=>{h.removeEventListener("transitionend",S)};h.addEventListener("transitionend",S),r.requestAnimationFrame(()=>{h.style.height="0px"})}function y(h){const S=()=>{h.removeEventListener("transitionend",S),h.style.height=null};h.addEventListener("transitionend",S),h.style.height=h.scrollHeight+"px"}const g=({depth:h=1,maxDepth:S,color:C,variant:T,size:D})=>B=>{const{children:P,expanded:N}=B,O=n.state(!N);return c({class:()=>$(P?O.val?d.collapsed:d.expanded:"")},m({class:o`
              cursor: pointer;
            `,onclick:_=>{P&&(O.val=!O.val)}},s(B.data)),P&&h<S&&i({class:$(C,D),bauMounted:({element:_})=>{O.val&&(_.style.height="0px")},"aria-expanded":({element:_})=>(u({element:_,closeState:O}),!O.val)},P.map(g({depth:h+1,maxDepth:S}))))};return function({tree:S,maxDepth:C=1/0,size:T="md",variant:D="plain",color:B="neutral",...P}){return l({class:$(d.nav,T,D,B,t==null?void 0:t.class,P.class)},S.children&&i(S.children.map(g({maxDepth:C,color:B,variant:D,size:T}))))}}const Fs=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=pt(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)});return s=>r({...s,tree:o})},Vs=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]};return pt(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)})({tree:o})},Ws=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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

  return TreeView({ tree: menu });
};
`,Xs={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ws,createComponent:Vs}],gridItem:Fs},Zs=e=>{const t=q(e);return()=>t(Xs)};function Ks(e,t={}){const{bau:n,css:o}=e,{div:a,span:r,pre:s,h3:i,h4:c}=n.tags;return function(m,...d){return a("Login")}}const Ys=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:r,h2:s}=n.tags,i=Ks(e);return()=>o({id:"login"},s(t("Login Examples")),r("Basic"),a(i()))};function qs(e){const{tr:t,bau:n,css:o}=e,{div:a,article:r,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Ys(e)()))}}const Js=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Qs=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,r=Ce(e),s=({code:i,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(i),o(c));return i=>r({...i},Js.map(s))},ei=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ti=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:r}=t.tags,s=Ce(e),i=({code:c,label:l})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return o(s({variant:"outline",color:"primary"},ei.map(i)))},ni=`import list from "@grucloud/bau-ui/list";
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

  return section(
    List({ variant: "outline", color: "primary" }, phoneCodes.map(listItem))
  );
};
`,oi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ni,createComponent:ti}],gridItem:Qs},ai=e=>{const t=q(e);return()=>t(oi)},ri=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:r,h1:s,span:i,p:c,ul:l,li:m,a:d,main:u,header:v,footer:y,label:g}=t.tags,{svg:h,use:S}=t.tagsNS("http://www.w3.org/2000/svg"),C=Jt(e),D=Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>r(c("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>r(c("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>r(c("Item 3 content"))}]}),B=ke(e),P=nt(e),N=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],O=w=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(w.label),i(w.code)),_=et(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),G=ot(e),K={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},U=at(e),V=ee(e),Z=Le(e),f=rt(e),E=it(e),p=st(e),b={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},x=Oe(e,{base:o.base+"/components"}),I=({disabled:w})=>r({class:$(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,w&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},h({width:100,height:100,fill:"currentColor"},S({href:"uploadIcon.svg#Capa_1"})),i("Choose a file to upload")),A=ct(e),z=Pe(e),R=lt(e),H=()=>u(Array(10).fill("").map((w,W)=>c(W+1,". Some text here"))),L=w=>{const W=R({id:"my-dialog",...w},v("Header"),H(),y(V({...w,variant:"outline",onclick:()=>{W.close()}},"Cancel"),V({...w,variant:"solid",onclick:()=>{W.close()}},"OK")));return W},X=ut(e),te=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],re=w=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(w.label),i(w.code)),pe=Te(e),ze=je(e),Me=dt(e),Ge=fe(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(c("My tab Disabled"))}]}),me=Be(e),De=()=>i("My tooltip"),ae=He(e),Ue={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},ve=pt(e,{renderMenuItem:({name:w,href:W})=>d({href:W,onclick:J=>{J.preventDefault()}},w)}),j=[{name:"Accordion",Item:w=>D({...w})},{name:"Alert",Item:w=>B({...w},`Alert ${w.color}`)},{name:"Autocomplete",Item:w=>P({...w,options:N,Option:O,getOptionLabel:({label:W})=>W,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:w=>_({...w,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(w,{index:W})=>G({...w,content:`${W*100}`},"☏")},{name:"Breadcrumbs",Item:w=>U({...w,...K})},{name:"Button",Item:w=>V({...w},`${w.variant} ${w.color}`)},{name:"Button Group",Item:w=>Z({...w},["ONE","TWO","THREE"].map(W=>V(w,W)))},{name:"Calendar",Item:w=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${w.color} ${w.variant}`,f({...w})))},{name:"Checkbox",Item:w=>g({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${w.color} ${w.variant}`,E({id:`myCheckbox-gallery-${w.color}-${w.variant}`,name:`myCheckbox-gallery-${w.color}-${w.variant}`,...w}))},{name:"Chip",Item:w=>p({...w},`Chip ${w.color}`)},{name:"DrillDown Menu",Item:w=>x({tree:b,...w})},{name:"File Input",Item:w=>A({Component:I,name:"file",accept:"text/*",onchange,...w})},{name:"Input",Item:w=>z({name:"my-input",id:"my-input-with",placeholder:"Enter text",...w})},{name:"Modal",Item:w=>{const W=L(w);return r(V({...w,onclick:()=>{W.showModal()}},"OPEN MODAL"),W)}},{name:"Select",Item:w=>r(X({...w,options:te,Option:re,getOptionLabel:({label:W})=>W,label:"Select a country..."}))},{name:"Slider",Item:w=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${w.color} ${w.variant}`,pe({...w,id:`my-slider-${w.color}-${w.variant}`})))},{name:"Spinner",Item:w=>ze(w)},{name:"Switch",Item:w=>r({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},g("off",Me({...w,id:`mySwitch-off-${w.color}-${w.variant}`})),g("on",Me({...w,id:`mySwitch-on-${w.color}-${w.variant}`,checked:!0})))},{name:"Tabs",Item:w=>Ge(w)},{name:"Theme Switch",Item:w=>me(w)},{name:"Tooltip",Item:w=>ae({titleEl:De(),...w},V(w,`${w.color} ${w.variant}`))},{name:"Tree View",Item:w=>ve({...w,tree:Ue})}];return()=>a(s("Bau Component Gallery"),c("This page displays the components with various colors and variants."),l({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},j.map(({name:w})=>m(V({color:"primary",variant:"solid",href:`#${w}`},w)))),j.map(w=>r({id:w.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},C(w))))},si=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Rn(e)})},{path:"components",action:()=>({title:"Component",component:ri(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Wo(e)})},{path:"alert",action:()=>({title:"Alert",component:na(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ia(e)})},{path:"animate",action:()=>({title:"Animate",component:la(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:ya(e)})},{path:"avatar",action:()=>({title:"Avatar",component:ba(e)})},{path:"badge",action:()=>({title:"Badge",component:Ta(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:$a(e)})},{path:"button",action:()=>({title:"Button",component:Ra(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ga(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Xa(e)})},{path:"chip",action:()=>({title:"Chip",component:Ja(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:or(e)})},{path:"drawer",action:()=>({title:"Drawer",component:cr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:mr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:vr(e)})},{path:"input",action:()=>({title:"Input",component:Cr(e)})},{path:"list",action:()=>({title:"List",component:ai(e)})},{path:"modal",action:()=>({title:"Modal",component:Mr(e)})},{path:"popover",action:()=>({title:"Popover",component:Nr(e)})},{path:"select",action:()=>({title:"Select",component:Lr(e)})},{path:"slider",action:()=>({title:"Slider",component:Xr(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Jr(e)})},{path:"switch",action:()=>({title:"Switch",component:as(e)})},{path:"table",action:()=>({title:"Table",component:Ts(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Is(e)})},{path:"tabs",action:()=>({title:"Tabs",component:gs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ps(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Gs(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Zs(e)})}]},{path:"pages",action:t=>({title:"Pages",component:qs(e)})}],ii=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ci=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=e,s=a.state(),i=t({componentState:s});return document.getElementById("app").replaceChildren(i),({router:l})=>{const m=o.location.pathname.replace(n,""),{title:d,component:u,Layout:v=t}=l.resolve({pathname:m});r.pathname.val=m,s.val=u,document.title=`${d}`}},li=e=>{const{createGlobalStyles:t}=e;gn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  ${Nt({dark:!0})}
}
  `};fn();const mt={title:"Bau",base:"/bau/bau-ui"},ce=kn({config:mt}),{bau:Dt}=ce;ce.states={pathname:Dt.state(window.location.pathname.replace(mt.base,"")),drawerOpen:Dt.state(!0)};li(ce);ui(ce);cn({routes:si({context:ce}),onLocationChange:ci({context:ce,LayoutDefault:_n(ce),config:mt}),notFoundRoute:ii(ce)});
