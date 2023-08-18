(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const an=(e,t)=>({...e,paths:[...t,e.path]}),$t=({paths:e=[],routes:t})=>t.flatMap(({children:n,...a})=>{const o=an(a,e);return n?[o,...$t({paths:[...e,a.path],routes:n})]:o}),on=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},rn=({routes:e=[],notFoundRoute:t})=>{const n=$t({routes:e}).map(a=>({...a,regex:on(a)}));return{resolve:({pathname:a})=>{const o=n.find(({regex:r})=>r.test(a));return o?o.action({match:a.match(o.regex)}):t}}};function sn({routes:e,notFoundRoute:t,onLocationChange:n}){const a=rn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",o=>{o.state!=null&&n({router:a})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(o,r,s)=>{o.apply(r,s),n({router:a})}}),document.addEventListener("click",o=>{const{target:r}=o,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),o.preventDefault())}),n({router:a}),a}const Nt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],cn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ln=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],gt=e=>`var(--color-${e})`,un=e=>`var(--color-${e}-lightest)`,dn=()=>Nt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${gt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${un(e)};
}
.solid.${e} {
  background-color: ${gt(e)};
}
`).join(`
`),mn=e=>100-e*10,pn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${mn(t)}%);`).join(`
`),_t=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),bn=([e,{h:t,s:n,l:a}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${a};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...cn.map(([o,r])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...ln.map(([o,r])=>`--color-${e}-${o}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function hn({createGlobalStyles:e},{colorPalette:t=Nt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,a])=>bn([n,a])).join(`
`)}
      ${pn()}
      ${_t({})}
      ${dn()}
      
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
  `}function gn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ke=e=>Object.prototype.toString.call(e??0).slice(8,-1),fn=e=>Ke(e)=="Object",ft=e=>Ke(e)=="Function",We=e=>["Object","Array"].includes(Ke(e)),vt=Object.getPrototypeOf,Ve=e=>he(e)?e.val:e,he=e=>e==null?void 0:e.__isState,vn=["splice","push","pop","shift","unshift","sort","reverse"],$e=(e,t)=>{const n=new Array(e.length);for(let a=0;a<e.length;a++)n[a]=t(e[a],a);return n};const Q=e=>!he(e[0])&&fn(e[0])?e:[{},...e];function xn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,a,o=new Set,r=new Set,s=!1,i,c=v=>n.createElement(v),l=(v,C,p)=>{let b=i;i=C;let w=v(p);return i=b,w},d=()=>{a||(a=window.requestAnimationFrame(()=>{o.forEach(v=>{v.bindings=v.bindings.filter(C=>{var p;return(p=C.element)==null?void 0:p.isConnected}),!v.bindings.length&&!v.computed&&o.delete(v)}),a=void 0}))},u=(v,C,p,b,w,I)=>{var T;if(s){r.add(v);return}for(let z of v.bindings){let{deps:R,element:H,renderInferred:P,render:X,renderItem:ee}=z;if(ee&&C)(T=x(H,b,(...re)=>h(ee(...re)),p,w,I)[C])==null||T.call();else{let re=P?P({element:H}):X({element:H,renderItem:ee})(...R.map(Ve));re!==H&&H.replaceWith(z.element=h(re))}}A(v),d()},m=(v,C,p=[])=>({get(b,w,I){var T;if(i==null||i.add(v),w==="_isProxy")return!0;if(!((T=b[w])!=null&&T._isProxy)&&!he(b[w])&&We(b[w]))b[w]=new Proxy(b[w],m(v,C,[...p,w]));else if(vn.includes(w)){let z=b[w];return(...R)=>{let H=z.apply(b,R);return u(v,w,H,R,C,p),H}}return Reflect.get(b,w,I)},set(b,w,I,T){let z=Reflect.set(b,w,I,T);return u(v,"setItem",z,{prop:w,value:I},C,[...p,w]),z}}),f=(v,C)=>new Proxy(C,m(v,C)),x=(v,C,p,b,w,I)=>{let T=()=>v.replaceChildren(...$e(b,p)),z=R=>v[R]&&v.removeChild(v[R]);return{assign:T,sort:T,reverse:T,setItem:()=>{var H;let R=I[0];(H=v.children[R])==null||H.replaceWith(p(w[R],R))},push:()=>v.append(...$e(C,(R,H)=>p(R,w.length+H))),unshift:()=>v.prepend(...$e(C,p)),pop:()=>z("lastChild"),shift:()=>z("firstChild"),splice:()=>{let[R,H,...P]=C;const{length:X}=v.children;for(let ee=R>=0?Math.min(R+H-1,X-1):X-1;ee>=(R>=0?R:X+R);ee--)v.children[ee].remove();if(P.length){let ee=P.forEach((re,me)=>p(re,R+me));v.children[R]?v.children[R].after(...ee):v.append(...ee)}}}},g=v=>({oldVal:v,bindings:[],listeners:[],__isState:!0,get val(){let C=this;return i==null||i.add(C),C.valProxy??(C.valProxy=We(v)?f(C,v):v,C.valProxy)},set val(C){let p=this,b=p.val;We(C)?(p.valProxy=f(p,C),u(p,"assign",C)):C!==b&&(p.valProxy=C,u(p)),p.oldVal=b}}),h=v=>v==null||v===!1?c("span"):v.nodeType?v:n.createTextNode(v),S=(v,C)=>{let p=new Set;return C.val=l(v,p),p},E=v=>{let C=g(),p=S(v,C);C.computed=!0;for(let b of p)b.listeners.push({computed:v,deps:p,state:C});return C},A=v=>{for(let C of[...v.listeners])S(C.computed,C.state)},D=(v,...C)=>{if(C.length){let p=[];for(let b of C.flat(1/0))b!=null&&p.push(he(b)?U({deps:[b],render:()=>w=>w}):ft(b)?K({renderInferred:b}):h(b));v.append(...p)}},B={},j=(v,C)=>v&&(Object.getOwnPropertyDescriptor(v,C)??j(vt(v),C)),N=(v,C,p)=>{var b;return B[v+","+C]??(B[v+","+C]=((b=j(p,C))==null?void 0:b.set)??0)},O=(v,C)=>new MutationObserver((p,b)=>{p.filter(w=>w.removedNodes).forEach(w=>[...w.removedNodes].find(I=>I===v&&(C({element:v}),b.disconnect(),!0)))}).observe(v.parentNode,{childList:!0}),_=v=>new Proxy(function(p,...b){var z;let[w,...I]=Q(b),T=v?n.createElementNS(v,p):c(p);for(let[R,H]of Object.entries(w)){if(R.startsWith("bau"))continue;let P=N(p,R,vt(T))?X=>T[R]=X:X=>T.setAttribute(R,X);H==null||(he(H)?U({deps:[H],render:()=>()=>(P(H.val),T)}):ft(H)&&(!R.startsWith("on")||H.isDerived)?K({renderInferred:()=>(P(H({element:T})),T)}):H.renderProp?U({deps:H.deps,render:()=>()=>(P(H.renderProp({element:T})(...H.deps.map(Ve))),T)}):P(H))}return D(T,...I),(z=w.bauCreated)==null||z.call(w,{element:T}),w.bauMounted&&t.requestAnimationFrame(()=>w.bauMounted({element:T})),w.bauUnmounted&&t.requestAnimationFrame(()=>O(T,w.bauUnmounted)),T},{get:(C,p)=>C.bind(void 0,p)}),G=(v,C,p)=>{v.element=h(p);for(let b of C)he(b)&&(o.add(b),b.bindings.push(v));return v.element},K=({renderInferred:v,element:C})=>{let p=new Set,b=l(v,p,{element:C});return G({renderInferred:v},p,b)},U=({deps:v,element:C,render:p,renderItem:b})=>G({deps:v,render:p,renderItem:b},v,p({element:C,renderItem:b})(...v.map(Ve))),W=(v,C,p)=>U({deps:[v],render:({renderItem:b})=>w=>(C.append(...$e(w,b)),C),renderItem:p}),Z=v=>{s=!0,v(),s=!1,r.forEach(u),r.clear()};return{tags:_(),tagsNS:_,state:g,bind:U,loop:W,derive:E,stateSet:o,batch:Z}}const wn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},yn=(e,t,n,a)=>{const o=e.createElement("style");o.id=n,o.append(a),(t??e.head).append(o)},Cn=(e,t)=>e.reduce((n,a,o)=>n+a+(t[o]??""),"");function En(e){let{document:t}=(e==null?void 0:e.window)??window;const n=a=>(o,...r)=>{const s=Cn(o,r),i=wn(s);return!t.getElementById(i)&&yn(t,e==null?void 0:e.target,i,a(i,s)),i};return{css:n((a,o)=>`.${a} { ${o} }`),keyframes:n((a,o)=>`@keyframes ${a} { ${o} }`),createGlobalStyles:n((a,o)=>o)}}function Sn(e){return{bau:xn(),...En(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function te(e,t){const{bau:n,css:a}=e,o={root:a`
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
    `,button:a`
      cursor: pointer;
    `,a:a``,disabled:a`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...s){let[{color:i,variant:c,size:l="md",disabled:d,href:u,...m},...f]=Q(s);return(u?n.tags.a:n.tags.button)({...m,class:$("button",o.root,c,l,i,u?o.a:o.button,d&&o.disabled,t==null?void 0:t.class,m.class),disabled:d,href:u,...!u&&{type:"button"}},f)}}const ae=["neutral","primary","success","danger","warning"],kn=["plain","outline","solid"],An="light",Tn=()=>ae.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Be(e,t){const{bau:n,css:a,window:o}=e,{input:r}=n.tags,s=d=>{o.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},i=()=>{try{return localStorage.getItem("theme")}catch{}},c=i();c?s(c):o.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):o.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(An);const l=a`
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
    ${Tn()}
  `;return function(...u){let[{color:m,variant:f="outline",size:x="md",...g},...h]=Q(u);return r({required:"required",title:"Switch Theme",...g,class:$("theme-switch",m,f,x,l,t==null?void 0:t.class,g.class),type:"checkbox",checked:i()=="dark",onclick:S=>{s(S.target.checked?"dark":"light")}},...h)}}function Mn(e){const{tr:t,bau:n,css:a,config:o,states:r}=e,{i:s,header:i,h1:c,div:l,a:d,img:u,b:m,ul:f,li:x}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),S=r.drawerOpen,E=te(e,{class:a`
      background: transparent;
    `}),A=Be(e),D=()=>s(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),B=()=>l({class:a`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>S.val=!S.val},D()),d({href:`${o.base}/`,class:a`
            text-decoration: none;
            font-size: x-large;
          `},m(t("Bau UI")))),j=()=>l({class:a`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},A(),E({class:a``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},u({class:a`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${o.base}/github-mark-white.svg`,width:30,height:30})));return function(){return i({class:a`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
        `},B(),j())}}function Dn({tr:e,bau:t,css:n}){const{footer:a,span:o,a:r,ul:s,li:i,p:c}=t.tags;return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},o("version: 0.41.0"))}}function Bt(e,t={}){return function({parent:a,animationHide:o,animationShow:r},s){s.style.animation=r;const i=()=>{s.removeEventListener("animationend",i),s.style.animation=""};return s.addEventListener("animationend",i),new MutationObserver((c,l)=>{c.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(u=>{a.style.position="relative";const m=u.cloneNode(!0);return m.style.top=0,m.style.left=0,m.style.position="absolute",m.style.animation=o,d.previousSibling?d.previousSibling.after(m):d.nextSibling?d.nextSibling.before(m):d.target&&d.target.appendChild(m),m.addEventListener("animationend",()=>m.parentNode.removeChild(m)),l.disconnect(),!0}))}).observe(a,{childList:!0,subtree:!0}),s}}function Ee(e,t){const{bau:n,css:a}=e,{ul:o}=n.tags,s=a`
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
    ${(()=>ae.map(i=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:u,...m},...f]=Q(c);return o({...m,class:$("list",s,l,d,u,t==null?void 0:t.class,m==null?void 0:m.class)},...f)}}const xt="0.3s",Ot=({parent:e,grandParent:t})=>n=>{const{children:a,...o}=n,r=structuredClone(o);return r.children=a==null?void 0:a.map(Ot({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},Rt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let a=0;a<t.children.length;a++){const o=Rt(e)(t.children[a]);if(o)return o}},In=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function Oe(e,t){const{bau:n,css:a,window:o}=e,{base:r=""}=t,s=({currentTree:U,data:W,onclickBack:Z})=>h(D({variant:"plain",href:`${r}${U.parentTree.children[0].data.href}`,onclick:Z({currentTree:U}),class:a`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:"plain",href:`${r}${W.href}`,class:a`
            flex-grow: 1;
          `},W.name)),i=({data:{name:U,href:W},children:Z=[]})=>D({href:`${r}${W}`,"data-ischild":Z.length==0},U),c=({subTree:U})=>{var W;return o.location.pathname.replace(r,"")===((W=U==null?void 0:U.data)==null?void 0:W.href)},{renderHeader:l=s,renderMenuItem:d=i,isActive:u=c}=t,{ul:m,li:f,nav:x,div:g,header:h,a:S}=n.tags,E=Bt(),A=Ee(e),D=te(e,{class:a`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:j,showFromRight:N,showFromLeft:O}=In(e),_=a`
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
  `,G=({variant:U,color:W,size:Z,onclickItem:v,onclickBack:C,currentTree:p,pathnameState:b})=>{const{children:w,parentTree:I,data:T}=p;return g({class:$("drillDownMenu",U,W,Z)},I&&l({data:T,currentTree:p,onclickBack:C}),w&&A({class:$(U,W,Z)},w.map(z=>f({class:()=>$(z.children&&"has-children",u({pathname:b.val,subTree:z})&&"active"),onclick:z.children&&v({currentTree:z})},d(z)))))},K=({tree:U,pathname:W})=>{let Z=Ot({})(U),v=Rt(W)(Z);return v||(console.log("drilldown no sub tree",W),v=Z),v};return function(W){const{variant:Z="plain",color:v="neutral",size:C="md",tree:p,pathnameState:b=n.state(o.location.pathname),...w}=W,I=({currentTree:H})=>P=>z(P,R,H,!0),T=({currentTree:H})=>P=>z(P,R,H.parentTree,!1),z=(H,P,X,ee)=>{P.firstChild.replaceChildren(E({parent:P,animationHide:`${ee?B:j} ${xt}`,animationShow:`${ee?N:O} ${xt}`},G({variant:Z,color:v,size:C,currentTree:X,onclickItem:I,onclickBack:T,pathnameState:b})))},R=x({class:$(_,t==null?void 0:t.class,w.class)},()=>G({variant:Z,color:v,size:C,currentTree:K({tree:p,pathname:b.val}),onclickItem:I,onclickBack:T,pathnameState:b}));return R}}const $n={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function jt(e){const{tr:t,bau:n,css:a,config:o,states:r,window:s}=e,{div:i,ul:c,li:l,nav:d,a:u,span:m}=n.tags;let f=!1;const x=Oe(e,{base:o.base});return function(){return i({bauMounted:({element:h})=>{s.innerWidth<=640&&(f=!0,r.drawerOpen.val=!1)},onclick:h=>{f&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:$(a`
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
          `)},x({tree:$n,pathnameState:r.pathname}))}}const Nn=e=>{const{bau:t,css:n,states:a}=e,{div:o}=t.tags,r=Mn(e),s=jt(e),i=Dn(e);return function({componentState:l}){return o({class:n`
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
        `},r(),s(),o({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>l.val&&l.val({})),i())}};function _n(e){const{bau:t,css:n,config:a}=e,{div:o,h1:r,h2:s,p:i}=t.tags;te(e);const c=n`
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
  `;return function({name:d,text:u,tagLine:m}){return o({class:c},r(d),s(u),i(m))}}function Bn(e){const{bau:t,css:n}=e,{div:a,h1:o,p:r}=t.tags,s=n`
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
  `,i=({title:c,Content:l})=>a({className:"feature"},o(c),r(l()));return function({featuresContent:l}){return a({class:s},l.map(i))}}function On(e){const{bau:t,css:n,config:a}=e,{div:o,p:r,a:s}=t.tags,i=_n(e),c=Bn(e),l=te(e),d=n``,u=[{title:"UI components for the web",Content:()=>[r("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${a.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),r("3 variant: plain, outline and primary"),r("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[r("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[r("The component bundle size is about 8x smaller compared to popular React UI component library."),r("Faster download time for users."),r("Save in bandwith fees for the operator."),r("Suitable for low bandwith network and low cost device.")]}];return function({}){return o({class:d},i({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:u}))}}function Rn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Pt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],a=typeof n;(a==="object"||a==="function")&&!Object.isFrozen(n)&&Pt(n)}),e}class wt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Lt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const a in e)n[a]=e[a];return t.forEach(function(a){for(const o in a)n[o]=a[o]}),n}const jn="</span>",yt=e=>!!e.scope,Pn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((a,o)=>`${a}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`};class Ln{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Lt(t)}openNode(t){if(!yt(t))return;const n=Pn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){yt(t)&&(this.buffer+=jn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Ct=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ye{constructor(){this.rootNode=Ct(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Ct({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(a=>this._walk(t,a)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ye._collapse(n)}))}}class Hn extends Ye{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const a=t.root;n&&(a.scope=`language:${n}`),this.add(a)}toHTML(){return new Ln(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ye(e){return e?typeof e=="string"?e:e.source:null}function Ht(e){return de("(?=",e,")")}function zn(e){return de("(?:",e,")*")}function Gn(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ye(n)).join("")}function Un(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function qe(...e){return"("+(Un(e).capture?"":"?:")+e.map(a=>ye(a)).join("|")+")"}function zt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Fn(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Wn=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Je(e,{joinWith:t}){let n=0;return e.map(a=>{n+=1;const o=n;let r=ye(a),s="";for(;r.length>0;){const i=Wn.exec(r);if(!i){s+=r;break}s+=r.substring(0,i.index),r=r.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?s+="\\"+String(Number(i[1])+o):(s+=i[0],i[0]==="("&&n++)}return s}).map(a=>`(${a})`).join(t)}const Vn=/\b\B/,Gt="[a-zA-Z]\\w*",Qe="[a-zA-Z_]\\w*",Ut="\\b\\d+(\\.\\d+)?",Ft="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Wt="\\b(0b[01]+)",Xn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Zn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,a)=>{n.index!==0&&a.ignoreMatch()}},e)},Ce={begin:"\\\\[\\s\\S]",relevance:0},Kn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ce]},Yn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ce]},qn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Re=function(e,t,n={}){const a=ie({scope:"comment",begin:e,end:t,contains:[]},n);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const o=qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:de(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},Jn=Re("//","$"),Qn=Re("/\\*","\\*/"),ea=Re("#","$"),ta={scope:"number",begin:Ut,relevance:0},na={scope:"number",begin:Ft,relevance:0},aa={scope:"number",begin:Wt,relevance:0},oa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ce,{begin:/\[/,end:/\]/,relevance:0,contains:[Ce]}]}]},ra={scope:"title",begin:Gt,relevance:0},sa={scope:"title",begin:Qe,relevance:0},ia={begin:"\\.\\s*"+Qe,relevance:0},ca=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ne=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Vn,IDENT_RE:Gt,UNDERSCORE_IDENT_RE:Qe,NUMBER_RE:Ut,C_NUMBER_RE:Ft,BINARY_NUMBER_RE:Wt,RE_STARTERS_RE:Xn,SHEBANG:Zn,BACKSLASH_ESCAPE:Ce,APOS_STRING_MODE:Kn,QUOTE_STRING_MODE:Yn,PHRASAL_WORDS_MODE:qn,COMMENT:Re,C_LINE_COMMENT_MODE:Jn,C_BLOCK_COMMENT_MODE:Qn,HASH_COMMENT_MODE:ea,NUMBER_MODE:ta,C_NUMBER_MODE:na,BINARY_NUMBER_MODE:aa,REGEXP_MODE:oa,TITLE_MODE:ra,UNDERSCORE_TITLE_MODE:sa,METHOD_GUARD:ia,END_SAME_AS_BEGIN:ca});function la(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ua(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function da(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=la,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ma(e,t){Array.isArray(e.illegal)&&(e.illegal=qe(...e.illegal))}function pa(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ba(e,t){e.relevance===void 0&&(e.relevance=1)}const ha=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(a=>{delete e[a]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,Ht(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ga=["of","and","for","in","not","or","if","then","parent","list","value"],fa="keyword";function Vt(e,t,n=fa){const a=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(r){Object.assign(a,Vt(e[r],t,r))}),a;function o(r,s){t&&(s=s.map(i=>i.toLowerCase())),s.forEach(function(i){const c=i.split("|");a[c[0]]=[r,va(c[0],c[1])]})}}function va(e,t){return t?Number(t):xa(e)?0:1}function xa(e){return ga.includes(e.toLowerCase())}const Et={},ue=e=>{console.error(e)},St=(e,...t)=>{console.log(`WARN: ${e}`,...t)},be=(e,t)=>{Et[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Et[`${e}/${t}`]=!0)},_e=new Error;function Xt(e,t,{key:n}){let a=0;const o=e[n],r={},s={};for(let i=1;i<=t.length;i++)s[i+a]=o[i],r[i+a]=!0,a+=zt(t[i-1]);e[n]=s,e[n]._emit=r,e[n]._multi=!0}function wa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),_e;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),_e;Xt(e,e.begin,{key:"beginScope"}),e.begin=Je(e.begin,{joinWith:""})}}function ya(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),_e;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),_e;Xt(e,e.end,{key:"endScope"}),e.end=Je(e.end,{joinWith:""})}}function Ca(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ea(e){Ca(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),wa(e),ya(e)}function Sa(e){function t(s,i){return new RegExp(ye(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,i]),this.matchAt+=zt(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(c=>c[1]);this.matcherRe=t(Je(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(i);if(!c)return null;const l=c.findIndex((u,m)=>m>0&&u!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const c=new n;return this.rules.slice(i).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[i]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,c){this.rules.push([i,c]),c.type==="begin"&&this.count++}exec(i){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(i);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(i)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function o(s){const i=new a;return s.contains.forEach(c=>i.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&i.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&i.addRule(s.illegal,{type:"illegal"}),i}function r(s,i){const c=s;if(s.isCompiled)return c;[ua,pa,Ea,ha].forEach(d=>d(s,i)),e.compilerExtensions.forEach(d=>d(s,i)),s.__beforeBegin=null,[da,ma,ba].forEach(d=>d(s,i)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Vt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),i&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ye(c.end)||"",s.endsWithParent&&i.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+i.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(d){return ka(d==="self"?s:d)})),s.contains.forEach(function(d){r(d,c)}),s.starts&&r(s.starts,i),c.matcher=o(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),r(e)}function Zt(e){return e?e.endsWithParent||Zt(e.starts):!1}function ka(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Zt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var Aa="11.8.0";class Ta extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Xe=Lt,kt=ie,At=Symbol("nomatch"),Ma=7,Kt=function(e){const t=Object.create(null),n=Object.create(null),a=[];let o=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Hn};function c(p){return i.noHighlightRe.test(p)}function l(p){let b=p.className+" ";b+=p.parentNode?p.parentNode.className:"";const w=i.languageDetectRe.exec(b);if(w){const I=_(w[1]);return I||(St(r.replace("{}",w[1])),St("Falling back to no-highlight mode for this block.",p)),I?w[1]:"no-highlight"}return b.split(/\s+/).find(I=>c(I)||_(I))}function d(p,b,w){let I="",T="";typeof b=="object"?(I=p,w=b.ignoreIllegals,T=b.language):(be("10.7.0","highlight(lang, code, ...args) has been deprecated."),be("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),T=p,I=b),w===void 0&&(w=!0);const z={code:I,language:T};v("before:highlight",z);const R=z.result?z.result:u(z.language,z.code,w);return R.code=z.code,v("after:highlight",R),R}function u(p,b,w,I){const T=Object.create(null);function z(k,M){return k.keywords[M]}function R(){if(!L.keywords){V.addText(q);return}let k=0;L.keywordPatternRe.lastIndex=0;let M=L.keywordPatternRe.exec(q),F="";for(;M;){F+=q.substring(k,M.index);const Y=oe.case_insensitive?M[0].toLowerCase():M[0],ne=z(L,Y);if(ne){const[se,tn]=ne;if(V.addText(F),F="",T[Y]=(T[Y]||0)+1,T[Y]<=Ma&&(Ie+=tn),se.startsWith("_"))F+=M[0];else{const nn=oe.classNameAliases[se]||se;X(M[0],nn)}}else F+=M[0];k=L.keywordPatternRe.lastIndex,M=L.keywordPatternRe.exec(q)}F+=q.substring(k),V.addText(F)}function H(){if(q==="")return;let k=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){V.addText(q);return}k=u(L.subLanguage,q,!0,y[L.subLanguage]),y[L.subLanguage]=k._top}else k=f(q,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Ie+=k.relevance),V.__addSublanguage(k._emitter,k.language)}function P(){L.subLanguage!=null?H():R(),q=""}function X(k,M){k!==""&&(V.startScope(M),V.addText(k),V.endScope())}function ee(k,M){let F=1;const Y=M.length-1;for(;F<=Y;){if(!k._emit[F]){F++;continue}const ne=oe.classNameAliases[k[F]]||k[F],se=M[F];ne?X(se,ne):(q=se,R(),q=""),F++}}function re(k,M){return k.scope&&typeof k.scope=="string"&&V.openNode(oe.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(X(q,oe.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),q=""):k.beginScope._multi&&(ee(k.beginScope,M),q="")),L=Object.create(k,{parent:{value:L}}),L}function me(k,M,F){let Y=Fn(k.endRe,F);if(Y){if(k["on:end"]){const ne=new wt(k);k["on:end"](M,ne),ne.isMatchIgnored&&(Y=!1)}if(Y){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return me(k.parent,M,F)}function He(k){return L.matcher.regexIndex===0?(q+=k[0],1):(Fe=!0,0)}function Me(k){const M=k[0],F=k.rule,Y=new wt(F),ne=[F.__beforeBegin,F["on:begin"]];for(const se of ne)if(se&&(se(k,Y),Y.isMatchIgnored))return He(M);return F.skip?q+=M:(F.excludeBegin&&(q+=M),P(),!F.returnBegin&&!F.excludeBegin&&(q=M)),re(F,k),F.returnBegin?0:M.length}function ht(k){const M=k[0],F=b.substring(k.index),Y=me(L,k,F);if(!Y)return At;const ne=L;L.endScope&&L.endScope._wrap?(P(),X(M,L.endScope._wrap)):L.endScope&&L.endScope._multi?(P(),ee(L.endScope,k)):ne.skip?q+=M:(ne.returnEnd||ne.excludeEnd||(q+=M),P(),ne.excludeEnd&&(q=M));do L.scope&&V.closeNode(),!L.skip&&!L.subLanguage&&(Ie+=L.relevance),L=L.parent;while(L!==Y.parent);return Y.starts&&re(Y.starts,k),ne.returnEnd?0:M.length}function ze(){const k=[];for(let M=L;M!==oe;M=M.parent)M.scope&&k.unshift(M.scope);k.forEach(M=>V.openNode(M))}let pe={};function De(k,M){const F=M&&M[0];if(q+=k,F==null)return P(),0;if(pe.type==="begin"&&M.type==="end"&&pe.index===M.index&&F===""){if(q+=b.slice(M.index,M.index+1),!o){const Y=new Error(`0 width match regex (${p})`);throw Y.languageName=p,Y.badRule=pe.rule,Y}return 1}if(pe=M,M.type==="begin")return Me(M);if(M.type==="illegal"&&!w){const Y=new Error('Illegal lexeme "'+F+'" for mode "'+(L.scope||"<unnamed>")+'"');throw Y.mode=L,Y}else if(M.type==="end"){const Y=ht(M);if(Y!==At)return Y}if(M.type==="illegal"&&F==="")return 1;if(Ue>1e5&&Ue>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return q+=F,F.length}const oe=_(p);if(!oe)throw ue(r.replace("{}",p)),new Error('Unknown language: "'+p+'"');const Ge=Sa(oe);let ve="",L=I||Ge;const y={},V=new i.__emitter(i);ze();let q="",Ie=0,le=0,Ue=0,Fe=!1;try{if(oe.__emitTokens)oe.__emitTokens(b,V);else{for(L.matcher.considerAll();;){Ue++,Fe?Fe=!1:L.matcher.considerAll(),L.matcher.lastIndex=le;const k=L.matcher.exec(b);if(!k)break;const M=b.substring(le,k.index),F=De(M,k);le=k.index+F}De(b.substring(le))}return V.finalize(),ve=V.toHTML(),{language:p,value:ve,relevance:Ie,illegal:!1,_emitter:V,_top:L}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:p,value:Xe(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:le,context:b.slice(le-100,le+100),mode:k.mode,resultSoFar:ve},_emitter:V};if(o)return{language:p,value:Xe(b),illegal:!1,relevance:0,errorRaised:k,_emitter:V,_top:L};throw k}}function m(p){const b={value:Xe(p),illegal:!1,relevance:0,_top:s,_emitter:new i.__emitter(i)};return b._emitter.addText(p),b}function f(p,b){b=b||i.languages||Object.keys(t);const w=m(p),I=b.filter(_).filter(K).map(P=>u(P,p,!1));I.unshift(w);const T=I.sort((P,X)=>{if(P.relevance!==X.relevance)return X.relevance-P.relevance;if(P.language&&X.language){if(_(P.language).supersetOf===X.language)return 1;if(_(X.language).supersetOf===P.language)return-1}return 0}),[z,R]=T,H=z;return H.secondBest=R,H}function x(p,b,w){const I=b&&n[b]||w;p.classList.add("hljs"),p.classList.add(`language-${I}`)}function g(p){let b=null;const w=l(p);if(c(w))return;if(v("before:highlightElement",{el:p,language:w}),p.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),i.throwUnescapedHTML))throw new Ta("One of your code blocks includes unescaped HTML.",p.innerHTML);b=p;const I=b.textContent,T=w?d(I,{language:w,ignoreIllegals:!0}):f(I);p.innerHTML=T.value,x(p,w,T.language),p.result={language:T.language,re:T.relevance,relevance:T.relevance},T.secondBest&&(p.secondBest={language:T.secondBest.language,relevance:T.secondBest.relevance}),v("after:highlightElement",{el:p,result:T,text:I})}function h(p){i=kt(i,p)}const S=()=>{D(),be("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){D(),be("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let A=!1;function D(){if(document.readyState==="loading"){A=!0;return}document.querySelectorAll(i.cssSelector).forEach(g)}function B(){A&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",B,!1);function j(p,b){let w=null;try{w=b(e)}catch(I){if(ue("Language definition for '{}' could not be registered.".replace("{}",p)),o)ue(I);else throw I;w=s}w.name||(w.name=p),t[p]=w,w.rawDefinition=b.bind(null,e),w.aliases&&G(w.aliases,{languageName:p})}function N(p){delete t[p];for(const b of Object.keys(n))n[b]===p&&delete n[b]}function O(){return Object.keys(t)}function _(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function G(p,{languageName:b}){typeof p=="string"&&(p=[p]),p.forEach(w=>{n[w.toLowerCase()]=b})}function K(p){const b=_(p);return b&&!b.disableAutodetect}function U(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=b=>{p["before:highlightBlock"](Object.assign({block:b.el},b))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=b=>{p["after:highlightBlock"](Object.assign({block:b.el},b))})}function W(p){U(p),a.push(p)}function Z(p){const b=a.indexOf(p);b!==-1&&a.splice(b,1)}function v(p,b){const w=p;a.forEach(function(I){I[w]&&I[w](b)})}function C(p){return be("10.7.0","highlightBlock will be removed entirely in v12.0"),be("10.7.0","Please use highlightElement now."),g(p)}Object.assign(e,{highlight:d,highlightAuto:f,highlightAll:D,highlightElement:g,highlightBlock:C,configure:h,initHighlighting:S,initHighlightingOnLoad:E,registerLanguage:j,unregisterLanguage:N,listLanguages:O,getLanguage:_,registerAliases:G,autoDetection:K,inherit:kt,addPlugin:W,removePlugin:Z}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=Aa,e.regex={concat:de,lookahead:Ht,either:qe,optional:Gn,anyNumberOfTimes:zn};for(const p in Ne)typeof Ne[p]=="object"&&Pt(Ne[p]);return Object.assign(e,Ne),e},ge=Kt({});ge.newInstance=()=>Kt({});var Da=ge;ge.HighlightJS=ge;ge.default=ge;const Tt=Rn(Da),Mt="[A-Za-z$_][0-9A-Za-z$_]*",Ia=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],$a=["true","false","null","undefined","NaN","Infinity"],Yt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],qt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Jt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Na=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],_a=[].concat(Jt,Yt,qt);function Ba(e){const t=e.regex,n=(b,{after:w})=>{const I="</"+b[0].slice(1);return b.input.indexOf(I,w)!==-1},a=Mt,o={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,w)=>{const I=b[0].length+b.index,T=b.input[I];if(T==="<"||T===","){w.ignoreMatch();return}T===">"&&(n(b,{after:I})||w.ignoreMatch());let z;const R=b.input.substring(I);if(z=R.match(/^\s*=/)){w.ignoreMatch();return}if((z=R.match(/^\s+extends\s+/))&&z.index===0){w.ignoreMatch();return}}},i={$pattern:Mt,keyword:Ia,literal:$a,built_in:_a,"variable.language":Na},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",u={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},m={className:"subst",begin:"\\$\\{",end:"\\}",keywords:i,contains:[]},f={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,m],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,m],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,m],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,m]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},A=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,x,g,h,{match:/\$\d+/},u];m.contains=A.concat({begin:/\{/,end:/\}/,keywords:i,contains:["self"].concat(A)});const D=[].concat(E,m.contains),B=D.concat([{begin:/\(/,end:/\)/,keywords:i,contains:["self"].concat(D)}]),j={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B},N={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Yt,...qt]}},_={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[j],illegal:/%/},K={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function U(b){return t.concat("(?!",b.join("|"),")")}const W={match:t.concat(/\b/,U([...Jt,"super","import"]),a,t.lookahead(/\(/)),className:"title.function",relevance:0},Z={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},v={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},j]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",p={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[j]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:i,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),_,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,f,x,g,h,E,{match:/\$\d+/},u,O,{className:"attr",begin:a+t.lookahead(":"),relevance:0},p,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:o.begin,end:o.end},{match:r},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[j,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},Z,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[j]},W,K,N,v,{match:/\$[(.]/}]}}const et=e=>{const{bau:t,css:n}=e,{div:a,table:o,tbody:r,tr:s,td:i,thead:c,th:l}=t.tags,d=["sm","md","lg"];return function({Item:m,name:f}){return a({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},o(c(s(l(f??"Variant/Color"),ae.map(x=>l(x)))),r(kn.map(x=>s(l(x),ae.map((g,h)=>i(m({color:g,variant:x,size:d[h%3]},{index:h}))))))))}},J=e=>{const{bau:t,css:n}=e,{article:a,section:o,h1:r,p:s,h2:i,h3:c,pre:l,div:d}=t.tags;Tt.registerLanguage("javascript",Ba);const u=et(e),m=({text:f})=>l({bauCreated:({element:x})=>{x.innerHTML=Tt.highlight(f,{language:"js"}).value}});return function(x){return a({class:n``},r(x.title),s(x.description),x.gridItem&&[i("Gallery"),x.gridItem&&u({Item:x.gridItem(e)})],i("Usage"),c("Import"),m({text:x.importStatement}),i("Examples"),x.examples.map(g=>o(r(g.title),s(g.description),d(g.createComponent(e)),m({text:g.code}))))}},Oa=()=>ae.map(e=>`
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
`);function Se(e,t){const{bau:n,css:a}=e,{accordionDefs:o}=t,{div:r,ul:s,li:i,header:c,h3:l,button:d}=n.tags,u=n.state(""),m=g=>h=>{u.val==g?u.val="":u.val=g},f=({element:g,open:h})=>{const S=()=>{g.removeEventListener("transitionend",S)};function E(D){D.addEventListener("transitionend",S),window.requestAnimationFrame(()=>{D.style.height="0px"})}function A(D){D.addEventListener("transitionend",S),D.style.height=D.scrollHeight+"px"}g.scrollHeight!=0&&(h?A(g):E(g))},x=a`
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
    ${Oa()}
  `;return function(...h){let[{color:S,variant:E="outline",size:A="md",content:D,...B},...j]=Q(h);const N=O=>{const{Header:_,Content:G,name:K}=O;return i({class:$(S,E,A),onclick:m(K)},l({class:()=>$(u.val==K&&"active")},d({type:"button","aria-controls":`bau-${K}`,"aria-expanded":({element:U})=>u.val==K},_(O))),r({class:"content",role:"region",id:`bau-${K}`,"data-state":({element:U})=>{const W=u.val==K;return f({element:U,open:W}),W}},G(O)))};return r({class:$("accordion",x,t==null?void 0:t.class,B.class)},s(o.map(N)))}}const Ra=e=>{const{bau:t}=e,{div:n,p:a}=t.tags,r=Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>n(a("Item 3 content"))}]});return s=>r({...s})},ja=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))}]})()},Pa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,La=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))}]},Ha=e=>{const{css:t}=e,n=La(e);return Se(e,{accordionDefs:n})({color:"warning",class:t`
      &.accordion {
        & ul {
          & li {
            width: fit-content;
          }
        }
      }
    `})},za=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

const createAccordionDefs = (context: Context): Accordion[] => {
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
  return accordionDefs;
};

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
`,Ga=e=>{const{bau:t,css:n}=e,{div:a,p:o}=t.tags;return Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(o("Item 2 Content"))}]})({color:"success",variant:"outline",class:n`
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
    `})},Ua=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
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

  return Accordion({
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
`,Fa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Pa,createComponent:ja},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:za,createComponent:Ha},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ua,createComponent:Ga}],gridItem:Ra},Wa=e=>{const t=J(e);return()=>t(Fa)},Va={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Xa=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Za=()=>ae.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function ke(e,t){const{bau:n,css:a,createGlobalStyles:o}=e,{div:r,i:s}=n.tags;Xa({css:a,createGlobalStyles:o});const i=a`
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
    ${Za()}
  `,c=te(e),l=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(u,...m){const{variant:f="outline",color:x="neutral",size:g="md",onRemove:h,...S}=u;return r({...S,class:$(`alert-${f}`,f,x,g,i,t==null?void 0:t.class,u.class,"alert"),role:"alert"},s({class:"icon"},Va[x]),r({class:"content"},...m),h&&l({onclick:h}))}}const Ka=e=>{const t=ke(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},Ya=e=>{const{bau:t}=e,{h4:n,p:a}=t.tags;return ke(e)({color:"danger"},n("Something went wrong"),a("Error code ",404),a("Status ","Not Found"))},qa=`import alert from "@grucloud/bau-ui/alert";
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
`,Ja=e=>{const{css:t}=e;return ke(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `})({color:"warning"},"Your coffee supply is getting low.")},Qa=`import alert from "@grucloud/bau-ui/alert";
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
`,eo={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:qa,createComponent:Ya},{title:"Custom Alert ",description:"A custom alert.",code:Qa,createComponent:Ja}],gridItem:Ka},to=e=>{const t=J(e);return()=>t(eo)},no=(e,t={})=>{const{bau:n,css:a,keyframes:o}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:i}=n.tags,c=n.state([]),l={inserting:o`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:o`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},d={stack:a`
      min-width: 300px;
      max-width: 90% vw;
      position: fixed;
      right: var(--global-spacing);
      top: var(--global-spacing);
      z-index: 10;
    `,item:a`
      margin: 0.2rem;
      padding: 0.2rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      animation: ${l.inserting} var(--transition-slow) ease-out;
    `,itemOut:a`
      animation: ${l.removing} var(--transition-slow) ease-out;
    `},u=({id:m,status:f})=>{const x=c.val.findIndex(g=>g.id===m);x!=-1&&(c.val[x].status=f)};return function(f={},...x){const g=({id:E})=>{u({id:E,status:"removing"});const A=c.val.findIndex(D=>D.id===E);A!=-1&&c.val.splice(A,1)},h=({Component:E})=>{const A={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=r&&g({id:c.val[0].id}),c.val.push(A),setTimeout(()=>g(A),s)},S=E=>i({class:d.item,onclick:()=>g(E)},E.Component());return document.addEventListener("alert.add",E=>h(E.detail)),document.addEventListener("alert.remove",E=>g(E.detail)),i({class:$(d.stack,t==null?void 0:t.class,f.class)},n.loop(c,i(),S))}},ao=e=>{const{tr:t,bau:n}=e,{section:a}=n.tags,o=no(e,{deleteAfterDuration:2e4}),r=te(e),s=ke(e);return a(o(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},oo=`import { Context } from "@grucloud/bau-ui/context";
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
`,ro={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:oo,createComponent:ao}]},so=e=>{const t=J(e);return()=>t(ro)},io=({keyframes:e})=>({hideRight:e`
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
 `}),co=e=>{const{bau:t}=e,{section:n,div:a,h1:o}=t.tags,r=Bt(),s=te(e),i=io(e);return function(){const c=t.state(!0),l=a(),d=u=>{l.replaceChildren(r({parent:l,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},a(u.val?"Ciao":"")))};return d(c),n({id:"animate"},a(o("Test Animate"),a(s({onclick:()=>{c.val=!c.val,d(c)}},()=>c.val?"Hide":"Show")),l))}};function tt(e,t){const{bau:n,css:a}=e,{span:o,img:r}=n.tags,s=n.state(!0),i=n.state(!1),c=()=>s.val=!1,l=u=>{s.val=!1,i.val=!0},d=a`
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
  `;return function(...m){let[{color:f,variant:x="outline",size:g="md",width:h=30,height:S=30,...E},...A]=Q(m);return o({class:$(d,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>i.val&&"Error",r({width:h,height:S,onload:c,onerror:l,class:$(f,x,g,d,t==null?void 0:t.class,E.class),...E}))}}const lo=e=>{const{css:t}=e,n=tt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return a=>n({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},uo=e=>{const{bau:t,css:n}=e,{section:a}=t.tags,o=tt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return a(o({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},mo=`import avatar from "@grucloud/bau-ui/avatar";
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
`,po={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:mo,createComponent:uo}],gridItem:lo},bo=e=>{const t=J(e);return()=>t(po)};function nt(e,t){const{bau:n,css:a,window:o}=e,{dialog:r}=n.tags,s=a`
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
  `;return function(...c){let[{contentEl:l,triggerEl:d,onClose:u,...m},...f]=Q(c);const x=S=>{h.style.opacity=1,h.showModal();const E=d.getBoundingClientRect(),A=h.getBoundingClientRect();E.x<o.innerWidth/2?h.style.left=E.left+"px":h.style.left=E.right-A.width+"px",E.y<o.innerHeight/2?h.style.top=E.top+E.height+"px":h.style.top=E.top-A.height+"px"},g=S=>{const E=()=>{h.close(),h.removeEventListener("transitionend",E)};h.addEventListener("transitionend",E),h.style.opacity=0},h=r({role:"presentation",class:$("popover",s,t==null?void 0:t.class,m==null?void 0:m.class),onclick:S=>S.target===h&&(g(),u==null?void 0:u.call())},l);return h.closeDialog=g,h.openDialog=x,h}}const ho=()=>ae.map(e=>`
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
`);function je(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,r=a`
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
    ${ho()}
  `;return function(i){const{size:c="md",variant:l="outline",color:d="neutral",name:u,id:m,disabled:f,...x}=i;return o({...x,class:$("input",c,d,l,r,t==null?void 0:t.class,x.class)})}}const go=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function at(e,t){const{bau:n,css:a}=e,{div:o,li:r,ul:s}=n.tags,i=nt(e),c=te(e),l=je(e),d=Ee(e),u=a`
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

    ${go()}
  `,m=n.state(""),f=n.state(""),x=n.state(!1),g=n.state(0),h=()=>{x.val=!1};return function(...E){let[{variant:A="outline",color:D,size:B="md",id:j,label:N,placeholder:O,Option:_,options:G,getOptionLabel:K=({label:P})=>P,...U},...W]=Q(E);const Z=n.state(G),v=()=>{H.openDialog(),x.val=!0,f.val="",Z.val=G},C=()=>{H.closeDialog(),x.val=!1,f.val=""},p=P=>{const{value:X}=P.target;f.val=X,X?Z.val=G.filter(ee=>K(ee).match(new RegExp(`${X}`,"i"))):Z.val=G},b=P=>{x.val?C():v()},w=({option:P,index:X})=>ee=>{m.val=K(P),g.val=X,C()},I=P=>{switch(console.log("onkeydown",P.key,g.val),P.key){case"Escape":C();break;case"ArrowDown":g.val<Z.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=Z.val.length-1:g.val--;break;case"Enter":m.val=K(Z.val[g.val]),f.val="",C();break}},T=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":x,"aria-label":N,onclick:b,variant:A,color:D,size:B},()=>!m.val&&N,m),z=l({id:j,value:f,placeholder:O,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":x,oninput:p,onkeydown:I,variant:A,color:D,size:B}),H=i({id:j,triggerEl:T,contentEl:(()=>o({class:$(A,D,B,"content")},z,()=>d({class:$(A,D,B)},Z.val.map((P,X)=>r({class:()=>$(g.val==X&&"active"),onclick:w({option:P,index:X})},_(P))))))(),onClose:h});return o({...U,class:$("autocomplete",u,t==null?void 0:t.class,U==null?void 0:U.class)},T,H)}}const fo=e=>{const{bau:t,css:n}=e,{div:a,span:o}=t.tags,r=at(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},o(c.label),o(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},vo=e=>{const{bau:t,css:n}=e,{section:a,div:o,span:r}=t.tags,s=at(e);return a(s({options:[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Option:l=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code)),getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},xo=`import { Context } from "@grucloud/bau-ui/context";
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
`,wo={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:xo,createComponent:vo}],gridItem:fo},yo=e=>{const t=J(e);return()=>t(wo)};function ot(e,t){const{bau:n,css:a}=e,{span:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:d="md",content:u,...m},...f]=Q(i);return o({...m,class:$("badge",r,t==null?void 0:t.class,m==null?void 0:m.class)},o({class:$(c,l,d)},u),...f)}}const Co=e=>{const t=ot(e);return(n,{index:a})=>t({...n,content:`${a*100}`},"☏")},Eo=e=>{const{bau:t}=e,{section:n}=t.tags,a=ot(e);return n(a({content:"10"},"☏"))},So=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return section(Badge({ content: "10" }, "\\u260F"));
};
`,ko={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:So,createComponent:Eo}],gridItem:Co},Ao=e=>{const t=J(e);return()=>t(ko)};function rt(e,t){const{bau:n,css:a}=e,{ul:o,li:r,a:s,span:i}=n.tags,c=te(e),l=a`
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
  `;return function(...u){let[{color:m,variant:f="outline",size:x="md",items:g,...h},...S]=Q(u);return o({...h,class:$(l,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:E,name:A})=>r((E?c:i)({href:E,color:m,variant:f,size:x,class:$(m,f,x)},A))))}}const To=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=rt(e);return a=>n({...a,...t})},Mo=e=>{const{bau:t}=e,{section:n}=t.tags,a={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},o=rt(e);return n(o(a))},Do=`import breadcrumbs, {
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
`,Io={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Do,createComponent:Mo}],gridItem:To},$o=e=>{const t=J(e);return()=>t(Io)},No=e=>{const t=te(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},_o=e=>{const{bau:t}=e,{section:n}=t.tags,a=te(e);return n(a({color:"primary",variant:"outline",onclick:()=>{alert("Click")}},"Click me"))},Bo=`import button from "@grucloud/bau-ui/button";
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
`,Oo={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Bo,createComponent:_o}],gridItem:No},Ro=e=>{const t=J(e);return()=>t(Oo)},jo=()=>ae.map(e=>`
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
`);function Pe(e,t){const{bau:n,css:a}=e,{div:o}=n.tags,r=a`
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
    ${jo()}
  `;return function(...i){let[{variant:c="outline",size:l="md",color:d,...u},...m]=Q(i);return o({...u,class:$("button-group",c,d,l,r,t==null?void 0:t.class,u==null?void 0:u.class)},...m)}}const Po=e=>{const t=["ONE","TWO","THREE"],n=te(e),a=Pe(e);return o=>a({...o},t.map(r=>n(o,r)))},Lo=e=>{const{bau:t}=e,{section:n}=t.tags,a=["ONE","TWO","THREE"],o=te(e),r=Pe(e),s="primary",i="solid";return n(r({color:s,variant:i},a.map(c=>o({color:s,variant:i},c))))},Ho=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,zo={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Ho,createComponent:Lo}],gridItem:Po},Go=e=>{const t=J(e);return()=>t(zo)};function st(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,s=a`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ae.map(i=>`
&.calendar.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:u,...m},...f]=Q(c);return o({...m,type:"date",class:$("calendar",s,l,d,u,t==null?void 0:t.class,m==null?void 0:m.class)},...f)}}const Uo=e=>{const t=st(e);return n=>t({...n})},Fo=e=>{const{bau:t}=e,{section:n,label:a}=t.tags,o=t.state("2023-08-08"),r=st(e);return n(a("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:o.val,oninput:s=>{o.val=s.target.value}})))},Wo=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Vo={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Wo,createComponent:Fo}],gridItem:Uo},Xo=e=>{const t=J(e);return()=>t(Vo)};function it(e,t){const{bau:n,css:a}=e,{span:o}=n.tags,r=a`
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
  `;return function(...i){let[{size:c="md",variant:l="outline",color:d="neutral",onclick:u,...m},...f]=Q(i);return o({...m,onclick:u,class:$("chip",r,c,l,d,u&&"clickable",t==null?void 0:t.class,m==null?void 0:m.class)},...f)}}const Zo=e=>{const t=it(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},Ko=e=>{const{bau:t}=e,{section:n}=t.tags,a=it(e);return n(a({variant:"outline",color:"primary"},"My Chip"))},Yo=`import chip from "@grucloud/bau-ui/chip";
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
`,qo={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Yo,createComponent:Ko}],gridItem:Zo},Jo=e=>{const t=J(e);return()=>t(qo)};function ct(e,t={}){const{bau:n,css:a}=e,{input:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:d="md",...u},...m]=Q(i);return o({type:"checkbox",required:"required",...u,class:$(r,c,l,d,t==null?void 0:t.class,u==null?void 0:u.class)})}}const Qo=e=>{const{bau:t,css:n}=e,{label:a}=t.tags,o=ct(e);return r=>a({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${r.color} ${r.variant} ${r.size}`,o({id:`myCheckbox-gallery-${r.color}-${r.variant}-${r.size}`,name:`myCheckbox-gallery-${r.color}-${r.variant}`,...r}))},er=e=>{const{bau:t,css:n}=e,{section:a,label:o}=t.tags,r=ct(e),s=t.state(!1),i=c=>{s.val=!!c.target.checked};return a(o({class:n`
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
`,nr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:tr,createComponent:er}],gridItem:Qo},ar=e=>{const t=J(e);return()=>t(nr)};function or(e,t){const{bau:n,css:a}=e,{div:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:d,openState:u,...m},...f]=Q(i);return o({class:$(r,t==null?void 0:t.class,m.class)},o({class:()=>$("overlay",u.val&&"overlay-open"),onclick:()=>{u.val=!1}}),o({class:()=>$("content",u.val&&"content-open")},f))}}const rr=e=>{const{bau:t}=e,{section:n,p:a}=t.tags,o=t.state(!1),r=or(e),s=te(e),i=jt(e);return n(a("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{o.val=!o.val}},"OPEN DRAWER"),r({openState:o},i()))},sr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,ir={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:sr,createComponent:rr}]},cr=e=>{const t=J(e);return()=>t(ir)},lr=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=Oe(e,{base:t.base+"/components/drillDownMenu"});return o=>a({tree:n,...o})},ur=e=>{const{bau:t,config:n}=e,{section:a}=t.tags,o=t.state(window.location.pathname.replace(n.base,"")),r={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},s=Oe(e,{base:n.base+"/components/drillDownMenu"});return a(s({tree:r,pathnameState:o}))},dr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,mr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:dr,createComponent:ur}],gridItem:lr},pr=e=>{const t=J(e);return()=>t(mr)};function lt(e,t){const{bau:n,css:a}=e,{div:o,span:r,label:s,input:i}=n.tags,c={base:a`
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
    `,disabled:a`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(d,...u){const{variant:m="outline",color:f="neutral",size:x="md",Component:g,disabled:h,...S}=d;return o({class:$(c.base,h&&c.disabled,t==null?void 0:t.class,d.class)},s({class:$(m,f,x)},g({disabled:h}),i({type:"file",disabled:h,...S})),r({class:"filename-display"}))}}const br=e=>{const{tr:t,bau:n,css:a,config:o}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:i,span:c}=n.tags,l=n.state("No file selected"),d=lt(e),u=f=>{const x=f.target.files[0];x?l.val=x.name:l.val="No file selected"},m=({disabled:f})=>i({class:$(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,f&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${o.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return f=>d({Component:m,name:"file",accept:"text/*",onchange:u,...f})},hr=e=>{const{tr:t,bau:n,css:a,config:o}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:i,div:c,span:l}=n.tags,d=n.state("No file selected"),u=lt(e);return i(u({Component:({disabled:x})=>c({class:$(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,x&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${o.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload"))),name:"file",accept:"text/*",onchange:x=>{const g=x.target.files[0];g?d.val=g.name:d.val="No file selected"}}),c("File selected: ",d))},gr=`import classNames from "@grucloud/bau-css/classNames";
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
`,fr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:gr,createComponent:hr}],gridItem:br},vr=e=>{const t=J(e);return()=>t(fr)},xr=e=>{const t=je(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},wr=e=>{const{bau:t}=e,{section:n}=t.tags,a=je(e);return n(a({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},yr=`import input from "@grucloud/bau-ui/input";
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
`,Cr={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:yr,createComponent:wr}],gridItem:xr},Er=e=>{const t=J(e);return()=>t(Cr)};function ut(e,t){const{bau:n,css:a}=e,{dialog:o}=n.tags,s=a`
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
    ${(()=>ae.map(i=>`
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
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:u="md",...m},...f]=Q(c);return o({class:$("modal",s,l,d,u,t==null?void 0:t.class,m==null?void 0:m.class)},...f)}}const Sr=e=>{const{bau:t}=e,{section:n,main:a,header:o,footer:r,p:s}=t.tags,i=te(e),c=ut(e),l=()=>a(Array(10).fill("").map((u,m)=>s(m+1,". Some text here"))),d=u=>{const m=c({id:"my-dialog",...u},o("Header"),l(),r(i({variant:"outline",color:u.color,onclick:()=>{m.close()}},"Cancel"),i({variant:"solid",color:u.color,onclick:()=>{m.close()}},"OK")));return m};return u=>{const m=d(u);return n(i({...u,onclick:()=>{m.showModal()}},"OPEN MODAL"),m)}},kr=e=>{const{bau:t}=e,{section:n,main:a,header:o,footer:r,p:s}=t.tags,i="neutral",c=te(e),l=ut(e),d=()=>a(Array(10).fill("").map((m,f)=>s(f+1,". Some text here"))),u=l({id:"my-dialog"},o("Header"),d(),r(c({variant:"outline",color:i,onclick:()=>{u.close()}},"Cancel"),c({variant:"solid",color:i,onclick:()=>{u.close()}},"OK")));return n(c({variant:"solid",color:"neutral",onclick:()=>{u.showModal()}},"OPEN MODAL"),u)},Ar=`import modal from "@grucloud/bau-ui/modal";
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
`,Tr={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ar,createComponent:kr}],gridItem:Sr},Mr=e=>{const t=J(e);return()=>t(Tr)},Dr=e=>{const{bau:t}=e,{section:n,div:a,h1:o,p:r}=t.tags,s=te(e),i=nt(e),c=()=>s({variant:"outline",color:"success",onclick:()=>u.open?u.closeDialog():u.openDialog()},"Click"),l=()=>a({},o("My content"),r("My Content")),d=c(),u=i({id:"my-popover-left",triggerEl:d,contentEl:l()});return n(a(d,u))},Ir=`import popover from "@grucloud/bau-ui/popover";
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
`,$r={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ir,createComponent:Dr}]},Nr=e=>{const t=J(e);return()=>t($r)},_r=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function dt(e,t){const{bau:n,css:a}=e,{div:o,li:r}=n.tags,s=te(e),i=nt(e),c=Ee(e),l=a`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${_r()}
  `,d=n.state(""),u=n.state(!1),m=n.state(0);return function(...x){let[{color:g="neutral",variant:h="outline",size:S="md",id:E,label:A,Option:D,options:B,getOptionLabel:j=({label:b})=>b,...N},...O]=Q(x);const _=()=>{p.openDialog(),p.focus(),u.val=!0},G=()=>{p.closeDialog(),u.val=!1},K=()=>{u.val=!1},U=b=>{u.val?G():_()},W=({option:b,index:w})=>I=>{d.val=j(b),m.val=w,G()},Z=b=>{switch(b.preventDefault(),b.key){case"Escape":G();break;case"ArrowDown":m.val<B.length-1?m.val++:m.val=0;break;case"ArrowUp":m.val<=0?m.val=B.length-1:m.val--;break;case"Enter":u.val?(d.val=j(B[m.val]),G()):_();break}},v=()=>c({tabindex:"0",class:$(g,h)},B.map((b,w)=>r({class:()=>$(m.val==w&&"active"),onclick:W({option:b,index:w})},D(b)))),C=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":u,"aria-label":A,onclick:U,color:g,variant:h,size:S},()=>!d.val&&A,d),p=i({id:E,triggerEl:C,contentEl:v(),onClose:K});return o({...N,class:$("select",g,S,l,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:Z},C,p)}}const Br=e=>{const{bau:t,css:n}=e,{div:a,span:o}=t.tags,r=dt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},o(c.label),o(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Or=e=>{const{bau:t,css:n}=e,{section:a,div:o,span:r}=t.tags,s=dt(e);return a(s({options:[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Option:l=>o({class:n`
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
`,jr={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Rr,createComponent:Or}],gridItem:Br},Pr=e=>{const t=J(e);return()=>t(jr)};function Ae(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,s=a`
    ${(()=>ae.map(i=>`
&.slider.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:u,...m},...f]=Q(c);return o({...m,type:"range",class:$("slider",l,d,u,s,t==null?void 0:t.class,m.class)},...f)}}const Lr=e=>{const{bau:t}=e,n=t.state(0),a=r=>{n.val=r==null?void 0:r.target.value},o=Ae(e);return r=>o({...r,oninput:a})},Hr=e=>{const{bau:t}=e,{section:n,form:a,label:o,br:r}=t.tags,s=t.state(0),i=l=>{s.val=l==null?void 0:l.target.value},c=Ae(e);return n(a(o("Slider with step, min and max",r,c({oninput:i,name:"slider-simple",step:20,min:-100,max:100}))))},zr=`import slider from "@grucloud/bau-ui/slider";
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
`,Gr=e=>{const{bau:t,css:n}=e,{section:a,form:o,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),d=m=>{l.val=m==null?void 0:m.target.value},u=Ae(e);return a(o(r({for:"temp"},"Choose a comfortable temperature"),i,u({oninput:d,class:n`
          width: 300px;
          margin: 0;
        `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
            width: 300px;
            display: flex;
            justify-content: space-between;
          `},["0","25","50","75","100"].map(m=>c({value:Number(m),label:m})))))},Ur=`import slider from "@grucloud/bau-ui/slider";
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
`,Fr=e=>{const{bau:t,css:n}=e,{section:a,form:o,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),d=m=>{l.val=m==null?void 0:m.target.value},u=Ae(e);return a(o({class:n`
          display: flex;
        `},r({for:"temp"},"Choose a comfortable temperature"),i,u({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
          width: 30px;
          appearance: slider-vertical;
        `}),s({id:"markers-vertical",class:n`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `},["0","25","50","75","100"].reverse().map(m=>c({value:Number(m),label:m})))))},Wr=`import slider from "@grucloud/bau-ui/slider";
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
`,Vr={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:zr,createComponent:Hr},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ur,createComponent:Gr},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Wr,createComponent:Fr}],gridItem:Lr},Xr=e=>{const t=J(e);return()=>t(Vr)},Dt={sm:16,md:32,lg:64};function Le(e,t={}){const{bau:n,css:a}=e,{svg:o,animate:r,animateTransform:s,rect:i}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:d="color-base",variant:u="outline",visibility:m=!0,...f}={}){return o({class:$(a`
            visibility: ${m?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,f.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:Dt[l],height:Dt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Zr=e=>{const t=Le(e);return n=>t({...n})},Kr=e=>{const{bau:t}=e,{section:n}=t.tags,a=Le(e);return n(a({}))},Yr=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return section(Spinner({}));
};
`,qr={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Yr,createComponent:Kr}],gridItem:Zr},Jr=e=>{const t=J(e);return()=>t(qr)},Qr=()=>ae.map(e=>`
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
`);function mt(e,t){const{bau:n,css:a}=e,{input:o}=n.tags,r=a`
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
  `;return function(...i){let[{color:c="neutral",variant:l="plain",size:d="md",...u},...m]=Q(i);return o({...u,class:$("switch",r,c,l,d,t==null?void 0:t.class,u.class),type:"checkbox",required:"required"},...m)}}const es=e=>{const{bau:t,css:n}=e,{form:a,label:o}=t.tags,r=mt(e);return s=>a({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},o("off ",r({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),o("on ",r({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ts=e=>{const{bau:t,css:n}=e,{section:a,form:o,label:r}=t.tags,s=mt(e);return a(o(r({class:n`
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
`,as={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ns,createComponent:ts}],gridItem:es},os=e=>{const t=J(e);return()=>t(as)},rs=()=>ae.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function fe(e,t){const{bau:n,css:a}=e,{tabDefs:o}=t,{div:r,ul:s,li:i}=n.tags,c=n.state(o),l=n.state(o[0]),d=m=>c.val.find(f=>f.name==m),u={base:a`
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
    `};return function(...f){let[{color:x,variant:g="plain",size:h,...S},...E]=Q(f);const A=B=>{const{Header:j,disabled:N,name:O}=B;return i({class:()=>$(l.val.name==O&&"active",N&&"disabled"),onclick:_=>_.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},j(B))},D=r({class:$("tabs",u.base,g,h,x,t==null?void 0:t.class,S.class)},n.loop(c,s(),A),()=>l.val.Content?l.val.Content({}):"");return D.addEventListener("tab.select",B=>{var O,_;const{tabName:j}=B.detail,N=d(j);N&&((O=l.val.exit)==null||O.call(),l.val=N,(_=N.enter)==null||_.call())},!1),D.addEventListener("tab.add",B=>{var N;const{tab:j}=B.detail;(N=j.enter)==null||N.call(),c.val.push(j)},!1),D.addEventListener("tab.remove",B=>{var N;const j=c.val.findIndex(O=>O.name==B.detail.tabName);j>0&&((N=c.val[j].exit)==null||N.call(),c.val.splice(j,1))},!1),D}}const ss=e=>{const{bau:t}=e,{div:n,p:a}=t.tags,r=fe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(a("My tab 2 Content"))}]});return s=>r(s)},is=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return fe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(a("My tab 2 Content"))}]})({variant:"outline",color:"neutral"})},cs=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ls=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return fe(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(a("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(a("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(a("My Content Disabled"))}]})({variant:"outline",color:"success"})},us=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Qt=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(a("My tab 2 Content"))}]},ds=e=>{const{css:t}=e;return fe(e,{tabDefs:Qt(e)})({variant:"outline",color:"neutral",class:t`
      flex-direction: column-reverse;
    `})},ms=`import tabs from "@grucloud/bau-ui/tabs";
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
`,ps=e=>{const{css:t}=e,n=Qt(e);return fe(e,{tabDefs:n})({variant:"outline",color:"neutral",class:t`
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
`,hs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:cs,createComponent:is},{title:"Extended Tabs",description:"An extended tabs.",code:us,createComponent:ls},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:ms,createComponent:ds},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:bs,createComponent:ps}],gridItem:ss},gs=e=>{const t=J(e);return()=>t(hs)};function Te(e,t){const{bau:n,css:a,createGlobalStyles:o}=e,{div:r}=n.tags;o`
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
`;const s=a`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
  `;return function(...c){let[{...l},...d]=Q(c);return r({...l,class:$("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...d)}}const fs=e=>{const{bau:t,css:n}=e,{section:a,th:o,td:r,tr:s,table:i,thead:c,tbody:l,caption:d}=t.tags;function u(h,S,E,A,D){return{name:h,calories:S,fat:E,carbs:A,protein:D}}const m=[u("Frozen yoghurt",159,6,24,4),u("Ice cream sandwich",237,9,37,4.3),u("Eclair",262,16,24,6),u("Cupcake",305,3.7,67,4.3),u("Gingerbread",356,16,49,3.9)],f=({name:h,calories:S})=>s(r(h),r({class:n`
            text-align: right;
          `},S)),x=()=>c(s(o({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),o({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Te(e,{class:n`
      max-width: 650px;
    `});return a(g(i(d("Basic Table"),x(),l(m.map(f)))))},vs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function xe(e,t,n,a,o){return{name:e,calories:t,fat:n,carbs:a,protein:o}}const xs=[xe("Frozen yoghurt",159,6,24,4),xe("Ice cream sandwich",237,9,37,4.3),xe("Eclair",262,16,24,6),xe("Cupcake",305,3.7,67,4.3),xe("Gingerbread",356,16,49,3.9)],ws=e=>{const{bau:t,css:n}=e,{section:a,th:o,td:r,tr:s,table:i,thead:c,tbody:l,caption:d}=t.tags,u=({name:x,calories:g})=>s(r(x),r({class:n`
            text-align: right;
          `},g)),m=()=>c(s(o({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),o({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Te(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return a(f(i(d("Table Dense"),m(),l(xs.map(u)))))},ys=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function we(e,t,n,a,o){return{name:e,calories:t,fat:n,carbs:a,protein:o}}const Cs=[we("Frozen yoghurt",159,6,24,4),we("Ice cream sandwich",237,9,37,4.3),we("Eclair",262,16,24,6),we("Cupcake",305,3.7,67,4.3),we("Gingerbread",356,16,49,3.9)],Es=e=>{const{bau:t,css:n}=e,{section:a,th:o,td:r,tr:s,table:i,thead:c,tbody:l,caption:d}=t.tags,u=({name:x,calories:g})=>s(r(x),r({class:n`
            text-align: right;
          `},g)),m=()=>c(s(o({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),o({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Te(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return a(f(i(d("Table Zebra"),m(),l(Cs.map(u)))))},Ss=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,ks={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:vs,createComponent:fs},{title:"Dense",description:"A dense table.",code:ys,createComponent:ws},{title:"Zebra",description:"A zebra table.",code:Ss,createComponent:Es}]},As=e=>{const t=J(e);return()=>t(ks)};function en(e,t){const{bau:n,css:a}=e,{div:o}=n.tags,r=Pe(e),s=te(e),i=Le(e),c=a`
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
  `,l=({label:x,icon:g,...h})=>s({"aria-label":x,title:x,...h},g),d=({count:x,totalCount:g,page:h,rowsPerPage:S})=>o({class:"pages-numbers"},Number(h-1)*Number(S)+(x>0?1:0),"-",Math.min(h*S,g)," of ",g),u=({count:x,page:g,rowsPerPage:h})=>o({class:"pages-numbers"},(g-1)*h+(x>0?1:0),"-",g*h),m=x=>x<=1,f=(x,g,h)=>x>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:S=0,page:E=1,rowsPerPage:A=50,onPageChange:D,isLoading:B=!1,disableFirst:j=()=>m(E),disablePrevious:N=()=>m(E),disableNext:O=()=>f(E,S,A),disableLast:_=()=>f(E,S,A),...G},...K]=Q(g);const U=Math.max(0,Math.ceil(S/A)),W=D({page:1}),Z=D({page:E-1}),v=D({page:E+1}),C=D({page:U}),p=[{label:"First",icon:"⟪",onclick:W,disabled:j()},{label:"Previous",icon:"⟨",onclick:Z,disabled:N()},{label:"Next",icon:"⟩",onclick:v,disabled:O()},{label:"Last",icon:"⟫",onclick:C,disabled:_()}];return o({...G,class:$("table-pagination",c,B&&"disabled",t==null?void 0:t.class,G==null?void 0:G.class)},i({class:"spinner",visibility:B,size:"md"}),S>0?d({count:h,totalCount:S,page:E,maxPages:U,rowsPerPage:A}):u({count:h,page:E,maxPages:U,rowsPerPage:A}),r({variant:"outline",color:"neutral"},p.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Ts=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ms=e=>{const{bau:t,css:n}=e,{th:a,td:o,tr:r,table:s,thead:i,tbody:c}=t.tags,l=Ts(45),d=({name:E,email:A})=>r(o(E),o(A)),u=()=>i(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Email")),m=en(e),f=Te(e,{class:n`
      max-width: 650px;
    `}),x=t.state(l),g=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>x.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),S=({page:E})=>A=>{g.val.page=E};return()=>f(s(u(),()=>c(h.val.map(d))),()=>m({...g.val,onPageChange:S}))},Ds=e=>{const{bau:t,css:n}=e,{th:a,td:o,tr:r,table:s,thead:i,tbody:c,div:l}=t.tags,d=t.state(!1),u=t.state([]),m=t.state(""),f=t.derive(()=>u.val.length),x=t.state(1),g=t.state(10),h=t.derive(()=>u.val),S=_=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(_).toString()}`,E=({page:_})=>G=>{x.val=_,A(S({page:_,per_page:g.val}))};A(S({page:1,per_page:g.val}));async function A(_){try{d.val=!0;const G=await fetch(_,{});if(G.ok){const K=await G.json();u.val=K;return}throw G}catch(G){m.val=G.message}finally{d.val=!1}}const D=({name:_,description:G,stargazers_count:K})=>r(o(_),o(G),o({class:n`
            text-align: right;
          `},K)),B=()=>i(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Description"),a({class:n`
            text-align: right;
          `},"Stars")),j=en(e),N=Te(e,{class:n`
      min-width: 650px;
    `}),O=({message:_})=>l(_);return()=>N(()=>j({rowsPerPage:g.val,page:x.val,count:f.val,totalCount:-1,isLoading:d.val,onPageChange:E,disableNext:()=>!1}),s(B(),()=>m.val&&O({message:m.val}),()=>c(h.val.map(D))))},Is=e=>{const{bau:t,css:n}=e,{section:a,div:o,h3:r,h2:s,tr:i}=t.tags,c=Ms(e),l=Ds(e),d=(...u)=>o({class:n`
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
        `},...u);return()=>a({id:"pagination"},s(i("Table Pagination")),r("Asynchronous Pagination"),d(l()),r("Simple Pagination"),d(c()))};function Ze(e,t){const{bau:n,css:a,window:o}=e,{div:r}=n.tags,s=a`
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
  `;return function(...c){let[{titleEl:l,side:d="bottom-start",color:u="neutral",variant:m="outline",size:f="md",...x},...g]=Q(c);const h=r({class:$("container",...d.split("-"))},r({class:$("content",u,m,f),role:"tooltip"},l)),S=N=>`move-to-${N}`,E=(N,O,_)=>{if(N()){const G=S(O);h.classList.add(G),h.classList.add(O),h.classList.remove(_)}},A=(N,O)=>{const _=S(N);h.classList.contains(_)&&(h.classList.remove(_),h.classList.add(O),h.classList.remove(N))},D=N=>{const O=h.getBoundingClientRect();E(()=>O.x<0,"right","left"),E(()=>O.x+O.width>o.innerWidth,"left","right"),E(()=>O.y<0,"bottom","top"),E(()=>O.bottom>o.innerHeight,"top","bottom"),h.classList.add("visible")},B=N=>{h.classList.remove("visible"),A("right","left"),A("left","right"),A("bottom","top"),A("top","bottom")};return r({...x,class:$("tooltip",s,t==null?void 0:t.class,x==null?void 0:x.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",D),N.addEventListener("mouseout",B)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",D),N.removeEventListener("mouseout",B)}},...g,h)}}const $s=e=>{const{tr:t,bau:n,css:a}=e,{section:o,div:r,h2:s,em:i,p:c}=n.tags,l=et(e),d=te(e),u=Ze(e),m=Ze(e,{class:a`
      .container > .content {
        background-color: lightgreen;
        border: 2px dotted darkgreen;
        font-size: 1.5rem;
      }
      .container.top {
        &::after {
          position: absolute;
          content: " ";
          bottom: 0%;
          left: 20%;
          margin-top: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent var(--color-emphasis-400)
            transparent;
        }
      }
      .container.bottom {
        &::after {
          position: absolute;
          content: " ";
          top: 0%;
          left: 20%;
          margin-left: 5px;
          border-width: 5px;
          border-style: solid;
          border-color: var(--color-emphasis-400) transparent transparent
            transparent;
        }
      }
    `}),f=()=>r({class:a`
          font-size: larger;
        `},c("A ",i("tooltip")," can be any component")),x=()=>[r({class:a`
          display: flex;
          justify-content: space-around;
        `},u({side:"top-start",titleEl:f()},d({},"top-start")),u({side:"top-centered",titleEl:f()},d({},"top-centered")),u({side:"top-end",titleEl:f()},d({},"top-end"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},u({side:"left-start",titleEl:f()},d({},"left-start")),u({side:"right-start",titleEl:f()},d({},"right-start"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},u({side:"left-centered",titleEl:f()},d({},"left-centered")),u({side:"right-centered",titleEl:f()},d({},"right-centered"))),r({class:a`
          display: flex;
          justify-content: space-between;
        `},u({side:"left-end",titleEl:f()},d({},"left end")),u({side:"right-end",titleEl:f()},d({},"right end"))),r({class:a`
          display: flex;
          justify-content: space-around;
        `},u({side:"bottom-start",titleEl:f()},d({},"bottom start")),u({side:"bottom-centered",titleEl:f()},d({},"bottom centered")),u({side:"bottom-end",titleEl:f()},d({},"bottom end")))];return()=>o({id:"tooltip"},s(t("Tooltip")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},x()),s(t("Tooltip moved")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},x()),s(t("Tooltip custom")),r({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},m({titleEl:f()},d({},"custom tooltip"))),s(t("Tooltip Table")),l({Item:g=>u({titleEl:f(),...g},d(g,`${g.color} ${g.variant}`))}))},Ns=e=>{const t=Be(e);return n=>t(n)},_s=e=>{const{bau:t}=e,{section:n}=t.tags,a=Be(e);return n(a({}))},Bs=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return section(ThemeSwitch({}));
};
`,Os={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Bs,createComponent:_s}],gridItem:Ns},Rs=e=>{const t=J(e);return()=>t(Os)},js=({css:e,createGlobalStyles:t})=>(t`
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
    `});function pt(e,t){const{bau:n,css:a,createGlobalStyles:o,window:r}=e,{renderMenuItem:s}=t,{ul:i,li:c,nav:l,div:d}=n.tags,u=js({css:a,createGlobalStyles:o}),m=({element:h,closeState:S})=>{h.scrollHeight!=0&&(S.val?f(h):x(h))};function f(h){h.style.height=h.scrollHeight+"px";const S=()=>{h.removeEventListener("transitionend",S)};h.addEventListener("transitionend",S),r.requestAnimationFrame(()=>{h.style.height="0px"})}function x(h){const S=()=>{h.removeEventListener("transitionend",S),h.style.height=null};h.addEventListener("transitionend",S),h.style.height=h.scrollHeight+"px"}const g=({depth:h=1,maxDepth:S,color:E,variant:A,size:D})=>B=>{const{children:j,expanded:N}=B,O=n.state(!N);return c({class:()=>$(j?O.val?u.collapsed:u.expanded:"")},d({class:a`
              cursor: pointer;
            `,onclick:_=>{j&&(O.val=!O.val)}},s(B.data)),j&&h<S&&i({class:$(E,D),bauMounted:({element:_})=>{O.val&&(_.style.height="0px")},"aria-expanded":({element:_})=>(m({element:_,closeState:O}),!O.val)},j.map(g({depth:h+1,maxDepth:S}))))};return function({tree:S,maxDepth:E=1/0,size:A="md",variant:D="plain",color:B="neutral",...j}){return l({class:$(u.nav,A,D,B,t==null?void 0:t.class,j.class)},S.children&&i(S.children.map(g({maxDepth:E,color:B,variant:D,size:A}))))}}const Ps=e=>{const{bau:t}=e,{a:n}=t.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]};return pt(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)})({tree:a})},Ls=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Hs={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ls,createComponent:Ps}],gridItem:e=>{const{bau:t}=e,{a:n}=t.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=pt(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)});return s=>r({...s,tree:a})}},zs=e=>{const t=J(e);return()=>t(Hs)};function Gs(e,t={}){const{bau:n,css:a}=e,{div:o,span:r,pre:s,h3:i,h4:c}=n.tags;return function(d,...u){return o("Login")}}const Us=e=>{const{tr:t,bau:n}=e,{section:a,div:o,h3:r,h2:s}=n.tags,i=Gs(e);return()=>a({id:"login"},s(t("Login Examples")),r("Basic"),o(i()))};function Fs(e){const{tr:t,bau:n,css:a}=e,{div:o,article:r,h1:s}=n.tags;return function(){return o({class:a`
          grid-area: main;
          display: flex;
        `},r({class:a`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),Us(e)()))}}const Ws=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Vs=e=>{const{bau:t,css:n}=e,{span:a,li:o}=t.tags,r=Ee(e),s=({code:i,label:c})=>o({class:n`
          display: flex;
          gap: 1rem;
        `},a(i),a(c));return i=>r({...i},Ws.map(s))},Xs=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Zs=e=>{const{bau:t,css:n}=e,{section:a,span:o,li:r}=t.tags,s=Ee(e),i=({code:c,label:l})=>r({class:n`
          display: flex;
          gap: 1rem;
        `},o(c),o(l));return a(s({variant:"outline",color:"primary"},Xs.map(i)))},Ks=`import list from "@grucloud/bau-ui/list";
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
`,Ys={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Ks,createComponent:Zs}],gridItem:Vs},qs=e=>{const t=J(e);return()=>t(Ys)},Js=e=>{const{bau:t,css:n,config:a}=e,{section:o,div:r,h1:s,span:i,p:c,ul:l,li:d,a:u,main:m,header:f,footer:x,label:g}=t.tags,{svg:h,use:S}=t.tagsNS("http://www.w3.org/2000/svg"),E=et(e),D=Se(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>r(c("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>r(c("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>r(c("Item 3 content"))}]}),B=ke(e),j=at(e),N=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],O=y=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(y.label),i(y.code)),_=tt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),G=ot(e),K={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},U=rt(e),W=te(e),Z=Pe(e),v=st(e),C=ct(e),p=it(e),b={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},w=Oe(e,{base:a.base+"/components"}),I=({disabled:y})=>r({class:$(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,y&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},h({width:100,height:100,fill:"currentColor"},S({href:"uploadIcon.svg#Capa_1"})),i("Choose a file to upload")),T=lt(e),z=je(e),R=ut(e),H=()=>m(Array(10).fill("").map((y,V)=>c(V+1,". Some text here"))),P=y=>{const V=R({id:"my-dialog",...y},f("Header"),H(),x(W({...y,variant:"outline",onclick:()=>{V.close()}},"Cancel"),W({...y,variant:"solid",onclick:()=>{V.close()}},"OK")));return V},X=dt(e),ee=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],re=y=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(y.label),i(y.code)),me=Ae(e),He=Le(e),Me=mt(e),ze=fe(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(c("My tab Disabled"))}]}),pe=Be(e),De=()=>i("My tooltip"),oe=Ze(e),Ge={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},ve=pt(e,{renderMenuItem:({name:y,href:V})=>u({href:V,onclick:q=>{q.preventDefault()}},y)}),L=[{name:"Accordion",Item:y=>D({...y})},{name:"Alert",Item:y=>B({...y},`Alert ${y.color}`)},{name:"Autocomplete",Item:y=>j({...y,options:N,Option:O,getOptionLabel:({label:V})=>V,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:y=>_({...y,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(y,{index:V})=>G({...y,content:`${V*100}`},"☏")},{name:"Breadcrumbs",Item:y=>U({...y,...K})},{name:"Button",Item:y=>W({...y},`${y.variant} ${y.color}`)},{name:"Button Group",Item:y=>Z({...y},["ONE","TWO","THREE"].map(V=>W(y,V)))},{name:"Calendar",Item:y=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${y.color} ${y.variant}`,v({...y})))},{name:"Checkbox",Item:y=>g({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${y.color} ${y.variant}`,C({id:`myCheckbox-gallery-${y.color}-${y.variant}`,name:`myCheckbox-gallery-${y.color}-${y.variant}`,...y}))},{name:"Chip",Item:y=>p({...y},`Chip ${y.color}`)},{name:"DrillDown Menu",Item:y=>w({tree:b,...y})},{name:"File Input",Item:y=>T({Component:I,name:"file",accept:"text/*",onchange,...y})},{name:"Input",Item:y=>z({name:"my-input",id:"my-input-with",placeholder:"Enter text",...y})},{name:"Modal",Item:y=>{const V=P(y);return r(W({...y,onclick:()=>{V.showModal()}},"OPEN MODAL"),V)}},{name:"Select",Item:y=>r(X({...y,options:ee,Option:re,getOptionLabel:({label:V})=>V,label:"Select a country..."}))},{name:"Slider",Item:y=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${y.color} ${y.variant}`,me({...y,id:`my-slider-${y.color}-${y.variant}`})))},{name:"Spinner",Item:y=>He(y)},{name:"Switch",Item:y=>r({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},g("off",Me({...y,id:`mySwitch-off-${y.color}-${y.variant}`})),g("on",Me({...y,id:`mySwitch-on-${y.color}-${y.variant}`,checked:!0})))},{name:"Tabs",Item:y=>ze(y)},{name:"Theme Switch",Item:y=>pe(y)},{name:"Tooltip",Item:y=>oe({titleEl:De(),...y},W(y,`${y.color} ${y.variant}`))},{name:"Tree View",Item:y=>ve({...y,tree:Ge})}];return()=>o(s("Bau Component Gallery"),c("This page displays the components with various colors and variants."),l({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},L.map(({name:y})=>d(W({color:"primary",variant:"solid",href:`#${y}`},y)))),L.map(y=>r({id:y.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},E(y))))},Qs=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:On(e)})},{path:"components",action:()=>({title:"Component",component:Js(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Wa(e)})},{path:"alert",action:()=>({title:"Alert",component:to(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:so(e)})},{path:"animate",action:()=>({title:"Animate",component:co(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:yo(e)})},{path:"avatar",action:()=>({title:"Avatar",component:bo(e)})},{path:"badge",action:()=>({title:"Badge",component:Ao(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:$o(e)})},{path:"button",action:()=>({title:"Button",component:Ro(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Go(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Xo(e)})},{path:"chip",action:()=>({title:"Chip",component:Jo(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ar(e)})},{path:"drawer",action:()=>({title:"Drawer",component:cr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:pr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:vr(e)})},{path:"input",action:()=>({title:"Input",component:Er(e)})},{path:"list",action:()=>({title:"List",component:qs(e)})},{path:"modal",action:()=>({title:"Modal",component:Mr(e)})},{path:"popover",action:()=>({title:"Popover",component:Nr(e)})},{path:"select",action:()=>({title:"Select",component:Pr(e)})},{path:"slider",action:()=>({title:"Slider",component:Xr(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Jr(e)})},{path:"switch",action:()=>({title:"Switch",component:os(e)})},{path:"table",action:()=>({title:"Table",component:As(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Is(e)})},{path:"tabs",action:()=>({title:"Tabs",component:gs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:$s(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Rs(e)})},{path:"treeView",action:()=>({title:"Tree View",component:zs(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Fs(e)})}],ei=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ti=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:a,bau:o,states:r}=e,s=o.state(),i=t({componentState:s});return document.getElementById("app").replaceChildren(i),({router:l})=>{const d=a.location.pathname.replace(n,""),{title:u,component:m,Layout:f=t}=l.resolve({pathname:d});r.pathname.val=d,s.val=m,document.title=`${u}`}},ni=e=>{const{createGlobalStyles:t}=e;hn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }
    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#3e5915;background:#f6f5b2}.hljs-keyword,.hljs-literal,.hljs-selector-tag{color:#059}.hljs-subst{color:#3e5915}.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-link,.hljs-section,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable{color:#2c009f}.hljs-comment,.hljs-deletion,.hljs-meta,.hljs-quote{color:#e60415}.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-id,.hljs-selector-tag,.hljs-strong,.hljs-title,.hljs-type{font-weight:700}.hljs-emphasis{font-style:italic}

    .hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}
  `},ai=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${_t({dark:!0})}
}
  `};gn();const bt={title:"Bau",base:"/bau/bau-ui"},ce=Sn({config:bt}),{bau:It}=ce;ce.states={pathname:It.state(window.location.pathname.replace(bt.base,"")),drawerOpen:It.state(!0)};ni(ce);ai(ce);sn({routes:Qs({context:ce}),onLocationChange:ti({context:ce,LayoutDefault:Nn(ce),config:bt}),notFoundRoute:ei(ce)});
