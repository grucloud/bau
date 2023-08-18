(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const tn=(e,t)=>({...e,paths:[...t,e.path]}),yt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...a})=>{const i=tn(a,e);return n?[i,...yt({paths:[...e,a.path],routes:n})]:i}),nn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},an=({routes:e=[],notFoundRoute:t})=>{const n=yt({routes:e}).map(a=>({...a,regex:nn(a)}));return{resolve:({pathname:a})=>{const i=n.find(({regex:o})=>o.test(a));return i?i.action({match:a.match(i.regex)}):t}}};function on({routes:e,notFoundRoute:t,onLocationChange:n}){const a=an({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{i.state!=null&&n({router:a})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,o,s)=>{i.apply(o,s),n({router:a})}}),document.addEventListener("click",i=>{const{target:o}=i,s=o.getAttribute("href");o.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),i.preventDefault())}),n({router:a}),a}const Et=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],rn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],sn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ot=e=>`var(--color-${e})`,ln=e=>`var(--color-${e}-lightest)`,cn=()=>Et.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ot(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ln(e)};
}
.solid.${e} {
  background-color: ${ot(e)};
}
`).join(`
`),dn=e=>100-e*10,un=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${dn(t)}%);`).join(`
`),xt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),hn=([e,{h:t,s:n,l:a}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${a};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...rn.map(([i,o])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),...sn.map(([i,o])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function mn({createGlobalStyles:e},{colorPalette:t=Et}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,a])=>hn([n,a])).join(`
`)}
      ${un()}
      ${xt({})}
      ${cn()}
      
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
  `}function gn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let We=e=>Object.prototype.toString.call(e??0).slice(8,-1),fn=e=>We(e)=="Object",rt=e=>We(e)=="Function",je=e=>["Object","Array"].includes(We(e)),st=Object.getPrototypeOf,Pe=e=>pe(e)?e.val:e,pe=e=>e==null?void 0:e.__isState,pn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let a=0;a<e.length;a++)n[a]=t(e[a],a);return n};const Q=e=>!pe(e[0])&&fn(e[0])?e:[{},...e];function bn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,a,i=new Set,o=new Set,s=!1,r,l=w=>n.createElement(w),u=(w,S,m)=>{let v=r;r=S;let x=w(m);return r=v,x},c=()=>{a||(a=window.requestAnimationFrame(()=>{i.forEach(w=>{w.bindings=w.bindings.filter(S=>{var m;return(m=S.element)==null?void 0:m.isConnected}),!w.bindings.length&&!w.computed&&i.delete(w)}),a=void 0}))},d=(w,S,m,v,x,$)=>{var M;if(s){o.add(w);return}for(let U of w.bindings){let{deps:L,element:z,renderInferred:j,render:V,renderItem:ee}=U;if(ee&&S)(M=f(z,v,(...re)=>p(ee(...re)),m,x,$)[S])==null||M.call();else{let re=j?j({element:z}):V({element:z,renderItem:ee})(...L.map(Pe));re!==z&&z.replaceWith(U.element=p(re))}}T(w),c()},h=(w,S,m=[])=>({get(v,x,$){var M;if(r==null||r.add(w),x==="_isProxy")return!0;if(!((M=v[x])!=null&&M._isProxy)&&!pe(v[x])&&je(v[x]))v[x]=new Proxy(v[x],h(w,S,[...m,x]));else if(pn.includes(x)){let U=v[x];return(...L)=>{let z=U.apply(v,L);return d(w,x,z,L,S,m),z}}return Reflect.get(v,x,$)},set(v,x,$,M){let U=Reflect.set(v,x,$,M);return d(w,"setItem",U,{prop:x,value:$},S,[...m,x]),U}}),b=(w,S)=>new Proxy(S,h(w,S)),f=(w,S,m,v,x,$)=>{let M=()=>w.replaceChildren(...ke(v,m)),U=L=>w[L]&&w.removeChild(w[L]);return{assign:M,sort:M,reverse:M,setItem:()=>{var z;let L=$[0];(z=w.children[L])==null||z.replaceWith(m(x[L],L))},push:()=>w.append(...ke(S,(L,z)=>m(L,x.length+z))),unshift:()=>w.prepend(...ke(S,m)),pop:()=>U("lastChild"),shift:()=>U("firstChild"),splice:()=>{let[L,z,...j]=S;const{length:V}=w.children;for(let ee=L>=0?Math.min(L+z-1,V-1):V-1;ee>=(L>=0?L:V+L);ee--)w.children[ee].remove();if(j.length){let ee=j.forEach((re,me)=>m(re,L+me));w.children[L]?w.children[L].after(...ee):w.append(...ee)}}}},g=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let S=this;return r==null||r.add(S),S.valProxy??(S.valProxy=je(w)?b(S,w):w,S.valProxy)},set val(S){let m=this,v=m.val;je(S)?(m.valProxy=b(m,S),d(m,"assign",S)):S!==v&&(m.valProxy=S,d(m)),m.oldVal=v}}),p=w=>w==null||w===!1?l("span"):w.nodeType?w:n.createTextNode(w),y=(w,S)=>{let m=new Set;return S.val=u(w,m),m},E=w=>{let S=g(),m=y(w,S);S.computed=!0;for(let v of m)v.listeners.push({computed:w,deps:m,state:S});return S},T=w=>{for(let S of[...w.listeners])y(S.computed,S.state)},k=(w,...S)=>{if(S.length){let m=[];for(let v of S.flat(1/0))v!=null&&m.push(pe(v)?G({deps:[v],render:()=>x=>x}):rt(v)?Z({renderInferred:v}):p(v));w.append(...m)}},O={},R=(w,S)=>w&&(Object.getOwnPropertyDescriptor(w,S)??R(st(w),S)),N=(w,S,m)=>{var v;return O[w+","+S]??(O[w+","+S]=((v=R(m,S))==null?void 0:v.set)??0)},D=(w,S)=>new MutationObserver((m,v)=>{m.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find($=>$===w&&(S({element:w}),v.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),_=w=>new Proxy(function(m,...v){var U;let[x,...$]=Q(v),M=w?n.createElementNS(w,m):l(m);for(let[L,z]of Object.entries(x)){if(L.startsWith("bau"))continue;let j=N(m,L,st(M))?V=>M[L]=V:V=>M.setAttribute(L,V);z==null||(pe(z)?G({deps:[z],render:()=>()=>(j(z.val),M)}):rt(z)&&(!L.startsWith("on")||z.isDerived)?Z({renderInferred:()=>(j(z({element:M})),M)}):z.renderProp?G({deps:z.deps,render:()=>()=>(j(z.renderProp({element:M})(...z.deps.map(Pe))),M)}):j(z))}return k(M,...$),(U=x.bauCreated)==null||U.call(x,{element:M}),x.bauMounted&&t.requestAnimationFrame(()=>x.bauMounted({element:M})),x.bauUnmounted&&t.requestAnimationFrame(()=>D(M,x.bauUnmounted)),M},{get:(S,m)=>S.bind(void 0,m)}),H=(w,S,m)=>{w.element=p(m);for(let v of S)pe(v)&&(i.add(v),v.bindings.push(w));return w.element},Z=({renderInferred:w,element:S})=>{let m=new Set,v=u(w,m,{element:S});return H({renderInferred:w},m,v)},G=({deps:w,element:S,render:m,renderItem:v})=>H({deps:w,render:m,renderItem:v},w,m({element:S,renderItem:v})(...w.map(Pe))),W=(w,S,m)=>G({deps:[w],render:({renderItem:v})=>x=>(S.append(...ke(x,v)),S),renderItem:m}),K=w=>{s=!0,w(),s=!1,o.forEach(d),o.clear()};return{tags:_(),tagsNS:_,state:g,bind:G,loop:W,derive:E,stateSet:i,batch:K}}const vn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},wn=(e,t,n,a)=>{const i=e.createElement("style");i.id=n,i.append(a),(t??e.head).append(i)},yn=(e,t)=>e.reduce((n,a,i)=>n+a+(t[i]??""),"");function En(e){let{document:t}=(e==null?void 0:e.window)??window;const n=a=>(i,...o)=>{const s=yn(i,o),r=vn(s);return!t.getElementById(r)&&wn(t,e==null?void 0:e.target,r,a(r,s)),r};return{css:n((a,i)=>`.${a} { ${i} }`),keyframes:n((a,i)=>`@keyframes ${a} { ${i} }`),createGlobalStyles:n((a,i)=>i)}}function xn(e){return{bau:bn(),...En(),tr:n=>n,window,...e}}function B(...e){return e.filter(t=>t).join(" ")}function te(e,t){const{bau:n,css:a}=e,i={root:a`
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
    `};return function(...s){let[{color:r,variant:l,size:u="md",disabled:c,href:d,...h},...b]=Q(s);return(d?n.tags.a:n.tags.button)({...h,class:B("button",i.root,l,u,r,d?i.a:i.button,c&&i.disabled,t==null?void 0:t.class,h.class),disabled:c,href:d,...!d&&{type:"button"}},b)}}const ae=["neutral","primary","success","danger","warning"],Cn=["plain","outline","solid"],Sn="light",kn=()=>ae.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Xe(e,t){const{bau:n,css:a,window:i}=e,{input:o}=n.tags,s=c=>{i.document.documentElement.setAttribute("data-theme",c),localStorage.setItem("theme",c)},r=()=>{try{return localStorage.getItem("theme")}catch{}},l=r();l?s(l):i.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):i.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Sn);const u=a`
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
    ${kn()}
  `;return function(...d){let[{color:h,variant:b="outline",size:f="md",...g},...p]=Q(d);return o({required:"required",title:"Switch Theme",...g,class:B("theme-switch",h,b,f,u,t==null?void 0:t.class,g.class),type:"checkbox",checked:r()=="dark",onclick:y=>{s(y.target.checked?"dark":"light")}},...p)}}function An(e){const{tr:t,bau:n,css:a,config:i,states:o}=e,{i:s,header:r,h1:l,div:u,a:c,img:d,b:h,ul:b,li:f}=n.tags,{svg:g,path:p}=n.tagsNS("http://www.w3.org/2000/svg"),y=o.drawerOpen,E=te(e,{class:a`
      background: transparent;
    `}),T=Xe(e),k=()=>s(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},p({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),O=()=>u({class:a`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},k()),c({href:`${i.base}/`,class:a`
            text-decoration: none;
            font-size: x-large;
          `},h(t("Bau UI")))),R=()=>u({class:a`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},T(),E({class:a``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:a`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${i.base}/github-mark-white.svg`,width:30,height:30})));return function(){return r({class:a`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
        `},O(),R())}}function Tn({tr:e,bau:t,css:n}){const{footer:a,span:i,a:o,ul:s,li:r,p:l}=t.tags;return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},i("version: 0.41.0"))}}function Ct(e,t={}){return function({parent:a,animationHide:i,animationShow:o},s){s.style.animation=o;const r=()=>{s.removeEventListener("animationend",r),s.style.animation=""};return s.addEventListener("animationend",r),new MutationObserver((l,u)=>{l.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(d=>{a.style.position="relative";const h=d.cloneNode(!0);return h.style.top=0,h.style.left=0,h.style.position="absolute",h.style.animation=i,c.previousSibling?c.previousSibling.after(h):c.nextSibling?c.nextSibling.before(h):c.target&&c.target.appendChild(h),h.addEventListener("animationend",()=>h.parentNode.removeChild(h)),u.disconnect(),!0}))}).observe(a,{childList:!0,subtree:!0}),s}}function Ne(e,t){const{bau:n,css:a}=e,{ul:i}=n.tags,s=a`
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
    ${(()=>ae.map(r=>`
`).join(`
`))()}
  `;return function(...l){let[{color:u="neutral",variant:c="plain",size:d,...h},...b]=Q(l);return i({...h,class:B("list",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...b)}}const it="0.3s",St=({parent:e,grandParent:t})=>n=>{const{children:a,...i}=n,o=structuredClone(i);return o.children=a==null?void 0:a.map(St({parent:n,grandParent:e})),e&&(e.parentTree=t),o.parentTree=e,o},kt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let a=0;a<t.children.length;a++){const i=kt(e)(t.children[a]);if(i)return i}},Mn=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function Ve(e,t){const{bau:n,css:a,window:i}=e,{base:o=""}=t,s=({currentTree:G,data:W,onclickBack:K})=>p(k({variant:"plain",href:`${o}${G.parentTree.children[0].data.href}`,onclick:K({currentTree:G}),class:a`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),k({variant:"plain",href:`${o}${W.href}`},W.name)),r=({data:{name:G,href:W},children:K=[]})=>k({href:`${o}${W}`,"data-ischild":K.length==0},G),l=({subTree:G})=>{var W;return i.location.pathname.replace(o,"")===((W=G==null?void 0:G.data)==null?void 0:W.href)},{renderHeader:u=s,renderMenuItem:c=r,isActive:d=l}=t,{ul:h,li:b,nav:f,div:g,header:p,a:y}=n.tags,E=Ct(),T=Ne(e),k=te(e,{class:a`
      &.button {
        flex-grow: 1;
        justify-content: flex-start;
      }
    `}),{hideToLeft:O,hideToRight:R,showFromRight:N,showFromLeft:D}=Mn(e),_=a`
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
  `,H=({variant:G,color:W,size:K,onclickItem:w,onclickBack:S,currentTree:m,pathnameState:v})=>{const{children:x,parentTree:$,data:M}=m;return g({class:B("drillDownMenu",G,W,K)},$&&u({data:M,currentTree:m,onclickBack:S}),x&&T({class:B(G,W,K)},x.map(U=>b({class:()=>B(U.children&&"has-children",d({pathname:v.val,subTree:U})&&"active"),onclick:U.children&&w({currentTree:U})},c(U)))))},Z=({tree:G,pathname:W})=>{let K=St({})(G),w=kt(W)(K);return w||(console.log("drilldown no sub tree",W),w=K),w};return function(W){const{variant:K="plain",color:w="neutral",size:S="md",tree:m,pathnameState:v=n.state(i.location.pathname),...x}=W,$=({currentTree:z})=>j=>U(j,L,z,!0),M=({currentTree:z})=>j=>U(j,L,z.parentTree,!1),U=(z,j,V,ee)=>{j.firstChild.replaceChildren(E({parent:j,animationHide:`${ee?O:R} ${it}`,animationShow:`${ee?N:D} ${it}`},H({variant:K,color:w,size:S,currentTree:V,onclickItem:$,onclickBack:M,pathnameState:v})))},L=f({class:B(_,t==null?void 0:t.class,x.class)},()=>H({variant:K,color:w,size:S,currentTree:Z({tree:m,pathname:v.val}),onclickItem:$,onclickBack:M,pathnameState:v}));return L}}const In={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function At(e){const{tr:t,bau:n,css:a,config:i,states:o,window:s}=e,{div:r,ul:l,li:u,nav:c,a:d,span:h}=n.tags;let b=!1;const f=Ve(e,{base:i.base});return function(){return r({bauMounted:({element:p})=>{s.innerWidth<=640&&(b=!0,o.drawerOpen.val=!1)},onclick:p=>{b&&!p.target.dataset.buttonback&&!p.target.parentElement.classList.contains("has-children")&&(o.drawerOpen.val=!1)},style:()=>o.drawerOpen.val?"display:block;":"display:none;",class:B(a`
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
          `)},f({tree:In,pathnameState:o.pathname}))}}const _n=e=>{const{bau:t,css:n,states:a}=e,{div:i}=t.tags,o=An(e),s=At(e),r=Tn(e);return function({componentState:u}){return i({class:n`
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
        `},o(),s(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>u.val&&u.val({})),r())}};function Nn(e){const{bau:t,css:n,config:a}=e,{div:i,h1:o,h2:s,p:r}=t.tags;te(e);const l=n`
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
  `;return function({name:c,text:d,tagLine:h}){return i({class:l},o(c),s(d),r(h))}}function $n(e){const{bau:t,css:n}=e,{div:a,h1:i,p:o}=t.tags,s=n`
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
  `,r=({title:l,Content:u})=>a({className:"feature"},i(l),o(u()));return function({featuresContent:u}){return a({class:s},u.map(r))}}function On(e){const{bau:t,css:n,config:a}=e,{div:i,p:o,a:s}=t.tags,r=Nn(e),l=$n(e),u=te(e),c=n``,d=[{title:"UI components for the web",Content:()=>[o("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${a.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[o("Each component has a combination of variant, color and size:"),o("3 variant: plain, outline and primary"),o("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[o("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),o("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[o("The component bundle size is about 8x smaller compared to popular React UI component library."),o("Faster download time for users."),o("Save in bandwith fees for the operator."),o("Suitable for low bandwith network and low cost device.")]}];return function({}){return i({class:c},r({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:d}))}}const Dn=()=>ae.map(e=>`
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
`);function we(e,t){const{bau:n,css:a}=e,{accordionDefs:i}=t,{div:o,ul:s,li:r,header:l,h3:u,button:c}=n.tags,d=n.state(""),h=g=>p=>{d.val==g?d.val="":d.val=g},b=({element:g,open:p})=>{const y=()=>{g.removeEventListener("transitionend",y)};function E(k){k.addEventListener("transitionend",y),window.requestAnimationFrame(()=>{k.style.height="0px"})}function T(k){k.addEventListener("transitionend",y),k.style.height=k.scrollHeight+"px"}g.scrollHeight!=0&&(p?T(g):E(g))},f=a`
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
    ${Dn()}
  `;return function(...p){let[{color:y,variant:E="outline",size:T="md",content:k,...O},...R]=Q(p);const N=D=>{const{Header:_,Content:H,name:Z}=D;return r({class:B(y,E,T),onclick:h(Z)},u({class:()=>B(d.val==Z&&"active")},c({type:"button","aria-controls":`bau-${Z}`,"aria-expanded":({element:G})=>d.val==Z},_(D))),o({class:"content",role:"region",id:`bau-${Z}`,"data-state":({element:G})=>{const W=d.val==Z;return b({element:G,open:W}),W}},H(D)))};return o({class:B("accordion",f,t==null?void 0:t.class,O.class)},s(i.map(N)))}}function Bn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Tt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],a=typeof n;(a==="object"||a==="function")&&!Object.isFrozen(n)&&Tt(n)}),e}class lt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Mt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const a in e)n[a]=e[a];return t.forEach(function(a){for(const i in a)n[i]=a[i]}),n}const Rn="</span>",ct=e=>!!e.scope,Ln=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((a,i)=>`${a}${"_".repeat(i+1)}`)].join(" ")}return`${t}${e}`};class jn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Mt(t)}openNode(t){if(!ct(t))return;const n=Ln(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){ct(t)&&(this.buffer+=Rn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const dt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ke{constructor(){this.rootNode=dt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=dt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(a=>this._walk(t,a)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ke._collapse(n)}))}}class Pn extends Ke{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const a=t.root;n&&(a.scope=`language:${n}`),this.add(a)}toHTML(){return new jn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ye(e){return e?typeof e=="string"?e:e.source:null}function It(e){return he("(?=",e,")")}function zn(e){return he("(?:",e,")*")}function Hn(e){return he("(?:",e,")?")}function he(...e){return e.map(n=>ye(n)).join("")}function Gn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ze(...e){return"("+(Gn(e).capture?"":"?:")+e.map(a=>ye(a)).join("|")+")"}function _t(e){return new RegExp(e.toString()+"|").exec("").length-1}function Un(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Fn=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function qe(e,{joinWith:t}){let n=0;return e.map(a=>{n+=1;const i=n;let o=ye(a),s="";for(;o.length>0;){const r=Fn.exec(o);if(!r){s+=o;break}s+=o.substring(0,r.index),o=o.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+i):(s+=r[0],r[0]==="("&&n++)}return s}).map(a=>`(${a})`).join(t)}const Wn=/\b\B/,Nt="[a-zA-Z]\\w*",Ye="[a-zA-Z_]\\w*",$t="\\b\\d+(\\.\\d+)?",Ot="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Dt="\\b(0b[01]+)",Xn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Vn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=he(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,a)=>{n.index!==0&&a.ignoreMatch()}},e)},Ee={begin:"\\\\[\\s\\S]",relevance:0},Kn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ee]},Zn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ee]},qn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},$e=function(e,t,n={}){const a=ie({scope:"comment",begin:e,end:t,contains:[]},n);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=Ze("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:he(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},Yn=$e("//","$"),Jn=$e("/\\*","\\*/"),Qn=$e("#","$"),ea={scope:"number",begin:$t,relevance:0},ta={scope:"number",begin:Ot,relevance:0},na={scope:"number",begin:Dt,relevance:0},aa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ee,{begin:/\[/,end:/\]/,relevance:0,contains:[Ee]}]}]},oa={scope:"title",begin:Nt,relevance:0},ra={scope:"title",begin:Ye,relevance:0},sa={begin:"\\.\\s*"+Ye,relevance:0},ia=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ae=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Wn,IDENT_RE:Nt,UNDERSCORE_IDENT_RE:Ye,NUMBER_RE:$t,C_NUMBER_RE:Ot,BINARY_NUMBER_RE:Dt,RE_STARTERS_RE:Xn,SHEBANG:Vn,BACKSLASH_ESCAPE:Ee,APOS_STRING_MODE:Kn,QUOTE_STRING_MODE:Zn,PHRASAL_WORDS_MODE:qn,COMMENT:$e,C_LINE_COMMENT_MODE:Yn,C_BLOCK_COMMENT_MODE:Jn,HASH_COMMENT_MODE:Qn,NUMBER_MODE:ea,C_NUMBER_MODE:ta,BINARY_NUMBER_MODE:na,REGEXP_MODE:aa,TITLE_MODE:oa,UNDERSCORE_TITLE_MODE:ra,METHOD_GUARD:sa,END_SAME_AS_BEGIN:ia});function la(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ca(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function da(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=la,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ua(e,t){Array.isArray(e.illegal)&&(e.illegal=Ze(...e.illegal))}function ha(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ma(e,t){e.relevance===void 0&&(e.relevance=1)}const ga=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(a=>{delete e[a]}),e.keywords=n.keywords,e.begin=he(n.beforeMatch,It(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},fa=["of","and","for","in","not","or","if","then","parent","list","value"],pa="keyword";function Bt(e,t,n=pa){const a=Object.create(null);return typeof e=="string"?i(n,e.split(" ")):Array.isArray(e)?i(n,e):Object.keys(e).forEach(function(o){Object.assign(a,Bt(e[o],t,o))}),a;function i(o,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const l=r.split("|");a[l[0]]=[o,ba(l[0],l[1])]})}}function ba(e,t){return t?Number(t):va(e)?0:1}function va(e){return fa.includes(e.toLowerCase())}const ut={},ue=e=>{console.error(e)},ht=(e,...t)=>{console.log(`WARN: ${e}`,...t)},fe=(e,t)=>{ut[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ut[`${e}/${t}`]=!0)},Ie=new Error;function Rt(e,t,{key:n}){let a=0;const i=e[n],o={},s={};for(let r=1;r<=t.length;r++)s[r+a]=i[r],o[r+a]=!0,a+=_t(t[r-1]);e[n]=s,e[n]._emit=o,e[n]._multi=!0}function wa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ie;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Ie;Rt(e,e.begin,{key:"beginScope"}),e.begin=qe(e.begin,{joinWith:""})}}function ya(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ie;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Ie;Rt(e,e.end,{key:"endScope"}),e.end=qe(e.end,{joinWith:""})}}function Ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function xa(e){Ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),wa(e),ya(e)}function Ca(e){function t(s,r){return new RegExp(ye(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=_t(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=t(qe(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const u=l.findIndex((d,h)=>h>0&&d!==void 0),c=this.matchIndexes[u];return l.splice(0,u),Object.assign(l,c)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new n;return this.rules.slice(r).forEach(([u,c])=>l.addRule(u,c)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let u=l.exec(r);if(this.resumingScanAtSamePosition()&&!(u&&u.index===this.lastIndex)){const c=this.getMatcher(0);c.lastIndex=this.lastIndex+1,u=c.exec(r)}return u&&(this.regexIndex+=u.position+1,this.regexIndex===this.count&&this.considerAll()),u}}function i(s){const r=new a;return s.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function o(s,r){const l=s;if(s.isCompiled)return l;[ca,ha,xa,ga].forEach(c=>c(s,r)),e.compilerExtensions.forEach(c=>c(s,r)),s.__beforeBegin=null,[da,ua,ma].forEach(c=>c(s,r)),s.isCompiled=!0;let u=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),u=s.keywords.$pattern,delete s.keywords.$pattern),u=u||/\w+/,s.keywords&&(s.keywords=Bt(s.keywords,e.case_insensitive)),l.keywordPatternRe=t(u,!0),r&&(s.begin||(s.begin=/\B|\b/),l.beginRe=t(l.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(l.endRe=t(l.end)),l.terminatorEnd=ye(l.end)||"",s.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(l.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(c){return Sa(c==="self"?s:c)})),s.contains.forEach(function(c){o(c,l)}),s.starts&&o(s.starts,r),l.matcher=i(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),o(e)}function Lt(e){return e?e.endsWithParent||Lt(e.starts):!1}function Sa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Lt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var ka="11.8.0";class Aa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ze=Mt,mt=ie,gt=Symbol("nomatch"),Ta=7,jt=function(e){const t=Object.create(null),n=Object.create(null),a=[];let i=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Pn};function l(m){return r.noHighlightRe.test(m)}function u(m){let v=m.className+" ";v+=m.parentNode?m.parentNode.className:"";const x=r.languageDetectRe.exec(v);if(x){const $=_(x[1]);return $||(ht(o.replace("{}",x[1])),ht("Falling back to no-highlight mode for this block.",m)),$?x[1]:"no-highlight"}return v.split(/\s+/).find($=>l($)||_($))}function c(m,v,x){let $="",M="";typeof v=="object"?($=m,x=v.ignoreIllegals,M=v.language):(fe("10.7.0","highlight(lang, code, ...args) has been deprecated."),fe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),M=m,$=v),x===void 0&&(x=!0);const U={code:$,language:M};w("before:highlight",U);const L=U.result?U.result:d(U.language,U.code,x);return L.code=U.code,w("after:highlight",L),L}function d(m,v,x,$){const M=Object.create(null);function U(A,I){return A.keywords[I]}function L(){if(!P.keywords){X.addText(Y);return}let A=0;P.keywordPatternRe.lastIndex=0;let I=P.keywordPatternRe.exec(Y),F="";for(;I;){F+=Y.substring(A,I.index);const q=oe.case_insensitive?I[0].toLowerCase():I[0],ne=U(P,q);if(ne){const[se,Qt]=ne;if(X.addText(F),F="",M[q]=(M[q]||0)+1,M[q]<=Ta&&(Se+=Qt),se.startsWith("_"))F+=I[0];else{const en=oe.classNameAliases[se]||se;V(I[0],en)}}else F+=I[0];A=P.keywordPatternRe.lastIndex,I=P.keywordPatternRe.exec(Y)}F+=Y.substring(A),X.addText(F)}function z(){if(Y==="")return;let A=null;if(typeof P.subLanguage=="string"){if(!t[P.subLanguage]){X.addText(Y);return}A=d(P.subLanguage,Y,!0,C[P.subLanguage]),C[P.subLanguage]=A._top}else A=b(Y,P.subLanguage.length?P.subLanguage:null);P.relevance>0&&(Se+=A.relevance),X.__addSublanguage(A._emitter,A.language)}function j(){P.subLanguage!=null?z():L(),Y=""}function V(A,I){A!==""&&(X.startScope(I),X.addText(A),X.endScope())}function ee(A,I){let F=1;const q=I.length-1;for(;F<=q;){if(!A._emit[F]){F++;continue}const ne=oe.classNameAliases[A[F]]||A[F],se=I[F];ne?V(se,ne):(Y=se,L(),Y=""),F++}}function re(A,I){return A.scope&&typeof A.scope=="string"&&X.openNode(oe.classNameAliases[A.scope]||A.scope),A.beginScope&&(A.beginScope._wrap?(V(Y,oe.classNameAliases[A.beginScope._wrap]||A.beginScope._wrap),Y=""):A.beginScope._multi&&(ee(A.beginScope,I),Y="")),P=Object.create(A,{parent:{value:P}}),P}function me(A,I,F){let q=Un(A.endRe,F);if(q){if(A["on:end"]){const ne=new lt(A);A["on:end"](I,ne),ne.isMatchIgnored&&(q=!1)}if(q){for(;A.endsParent&&A.parent;)A=A.parent;return A}}if(A.endsWithParent)return me(A.parent,I,F)}function Oe(A){return P.matcher.regexIndex===0?(Y+=A[0],1):(Le=!0,0)}function xe(A){const I=A[0],F=A.rule,q=new lt(F),ne=[F.__beforeBegin,F["on:begin"]];for(const se of ne)if(se&&(se(A,q),q.isMatchIgnored))return Oe(I);return F.skip?Y+=I:(F.excludeBegin&&(Y+=I),j(),!F.returnBegin&&!F.excludeBegin&&(Y=I)),re(F,A),F.returnBegin?0:I.length}function at(A){const I=A[0],F=v.substring(A.index),q=me(P,A,F);if(!q)return gt;const ne=P;P.endScope&&P.endScope._wrap?(j(),V(I,P.endScope._wrap)):P.endScope&&P.endScope._multi?(j(),ee(P.endScope,A)):ne.skip?Y+=I:(ne.returnEnd||ne.excludeEnd||(Y+=I),j(),ne.excludeEnd&&(Y=I));do P.scope&&X.closeNode(),!P.skip&&!P.subLanguage&&(Se+=P.relevance),P=P.parent;while(P!==q.parent);return q.starts&&re(q.starts,A),ne.returnEnd?0:I.length}function De(){const A=[];for(let I=P;I!==oe;I=I.parent)I.scope&&A.unshift(I.scope);A.forEach(I=>X.openNode(I))}let ge={};function Ce(A,I){const F=I&&I[0];if(Y+=A,F==null)return j(),0;if(ge.type==="begin"&&I.type==="end"&&ge.index===I.index&&F===""){if(Y+=v.slice(I.index,I.index+1),!i){const q=new Error(`0 width match regex (${m})`);throw q.languageName=m,q.badRule=ge.rule,q}return 1}if(ge=I,I.type==="begin")return xe(I);if(I.type==="illegal"&&!x){const q=new Error('Illegal lexeme "'+F+'" for mode "'+(P.scope||"<unnamed>")+'"');throw q.mode=P,q}else if(I.type==="end"){const q=at(I);if(q!==gt)return q}if(I.type==="illegal"&&F==="")return 1;if(Re>1e5&&Re>I.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=F,F.length}const oe=_(m);if(!oe)throw ue(o.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Be=Ca(oe);let ve="",P=$||Be;const C={},X=new r.__emitter(r);De();let Y="",Se=0,ce=0,Re=0,Le=!1;try{if(oe.__emitTokens)oe.__emitTokens(v,X);else{for(P.matcher.considerAll();;){Re++,Le?Le=!1:P.matcher.considerAll(),P.matcher.lastIndex=ce;const A=P.matcher.exec(v);if(!A)break;const I=v.substring(ce,A.index),F=Ce(I,A);ce=A.index+F}Ce(v.substring(ce))}return X.finalize(),ve=X.toHTML(),{language:m,value:ve,relevance:Se,illegal:!1,_emitter:X,_top:P}}catch(A){if(A.message&&A.message.includes("Illegal"))return{language:m,value:ze(v),illegal:!0,relevance:0,_illegalBy:{message:A.message,index:ce,context:v.slice(ce-100,ce+100),mode:A.mode,resultSoFar:ve},_emitter:X};if(i)return{language:m,value:ze(v),illegal:!1,relevance:0,errorRaised:A,_emitter:X,_top:P};throw A}}function h(m){const v={value:ze(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return v._emitter.addText(m),v}function b(m,v){v=v||r.languages||Object.keys(t);const x=h(m),$=v.filter(_).filter(Z).map(j=>d(j,m,!1));$.unshift(x);const M=$.sort((j,V)=>{if(j.relevance!==V.relevance)return V.relevance-j.relevance;if(j.language&&V.language){if(_(j.language).supersetOf===V.language)return 1;if(_(V.language).supersetOf===j.language)return-1}return 0}),[U,L]=M,z=U;return z.secondBest=L,z}function f(m,v,x){const $=v&&n[v]||x;m.classList.add("hljs"),m.classList.add(`language-${$}`)}function g(m){let v=null;const x=u(m);if(l(x))return;if(w("before:highlightElement",{el:m,language:x}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Aa("One of your code blocks includes unescaped HTML.",m.innerHTML);v=m;const $=v.textContent,M=x?c($,{language:x,ignoreIllegals:!0}):b($);m.innerHTML=M.value,f(m,x,M.language),m.result={language:M.language,re:M.relevance,relevance:M.relevance},M.secondBest&&(m.secondBest={language:M.secondBest.language,relevance:M.secondBest.relevance}),w("after:highlightElement",{el:m,result:M,text:$})}function p(m){r=mt(r,m)}const y=()=>{k(),fe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){k(),fe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let T=!1;function k(){if(document.readyState==="loading"){T=!0;return}document.querySelectorAll(r.cssSelector).forEach(g)}function O(){T&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",O,!1);function R(m,v){let x=null;try{x=v(e)}catch($){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),i)ue($);else throw $;x=s}x.name||(x.name=m),t[m]=x,x.rawDefinition=v.bind(null,e),x.aliases&&H(x.aliases,{languageName:m})}function N(m){delete t[m];for(const v of Object.keys(n))n[v]===m&&delete n[v]}function D(){return Object.keys(t)}function _(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function H(m,{languageName:v}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=v})}function Z(m){const v=_(m);return v&&!v.disableAutodetect}function G(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=v=>{m["before:highlightBlock"](Object.assign({block:v.el},v))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=v=>{m["after:highlightBlock"](Object.assign({block:v.el},v))})}function W(m){G(m),a.push(m)}function K(m){const v=a.indexOf(m);v!==-1&&a.splice(v,1)}function w(m,v){const x=m;a.forEach(function($){$[x]&&$[x](v)})}function S(m){return fe("10.7.0","highlightBlock will be removed entirely in v12.0"),fe("10.7.0","Please use highlightElement now."),g(m)}Object.assign(e,{highlight:c,highlightAuto:b,highlightAll:k,highlightElement:g,highlightBlock:S,configure:p,initHighlighting:y,initHighlightingOnLoad:E,registerLanguage:R,unregisterLanguage:N,listLanguages:D,getLanguage:_,registerAliases:H,autoDetection:Z,inherit:mt,addPlugin:W,removePlugin:K}),e.debugMode=function(){i=!1},e.safeMode=function(){i=!0},e.versionString=ka,e.regex={concat:he,lookahead:It,either:Ze,optional:Hn,anyNumberOfTimes:zn};for(const m in Ae)typeof Ae[m]=="object"&&Tt(Ae[m]);return Object.assign(e,Ae),e},be=jt({});be.newInstance=()=>jt({});var Ma=be;be.HighlightJS=be;be.default=be;const ft=Bn(Ma),pt="[A-Za-z$_][0-9A-Za-z$_]*",Ia=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],_a=["true","false","null","undefined","NaN","Infinity"],Pt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],zt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ht=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Na=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],$a=[].concat(Ht,Pt,zt);function Oa(e){const t=e.regex,n=(v,{after:x})=>{const $="</"+v[0].slice(1);return v.input.indexOf($,x)!==-1},a=pt,i={begin:"<>",end:"</>"},o=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,x)=>{const $=v[0].length+v.index,M=v.input[$];if(M==="<"||M===","){x.ignoreMatch();return}M===">"&&(n(v,{after:$})||x.ignoreMatch());let U;const L=v.input.substring($);if(U=L.match(/^\s*=/)){x.ignoreMatch();return}if((U=L.match(/^\s+extends\s+/))&&U.index===0){x.ignoreMatch();return}}},r={$pattern:pt,keyword:Ia,literal:_a,built_in:$a,"variable.language":Na},l="[0-9](_?[0-9])*",u=`\\.(${l})`,c="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${c})((${u})|\\.)?|(${u}))[eE][+-]?(${l})\\b`},{begin:`\\b(${c})\\b((${u})\\b|\\.)?|(${u})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},h={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"graphql"}},p={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,h]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,f,g,p,{match:/\$\d+/},d];h.contains=T.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(T)});const k=[].concat(E,h.contains),O=k.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(k)}]),R={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:O},N={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},D={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Pt,...zt]}},_={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[R],illegal:/%/},Z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function G(v){return t.concat("(?!",v.join("|"),")")}const W={match:t.concat(/\b/,G([...Ht,"super","import"]),a,t.lookahead(/\(/)),className:"title.function",relevance:0},K={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},w={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},R]},S="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(S)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[R]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:O,CLASS_REFERENCE:D},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),_,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,b,f,g,p,E,{match:/\$\d+/},d,D,{className:"attr",begin:a+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:S,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:O}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:o},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[R,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},K,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[R]},W,Z,N,w,{match:/\$[(.]/}]}}const J=e=>{const{bau:t,css:n}=e,{div:a,table:i,tbody:o,tr:s,td:r,thead:l,th:u}=t.tags,c=["sm","md","lg"];return function({Item:h,name:b}){return a({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},i(l(s(u(b??"Variant/Color"),ae.map(f=>u(f)))),o(Cn.map(f=>s(u(f),ae.map((g,p)=>r(h({color:g,variant:f,size:c[p%3]},{index:p}))))))))}},Da=e=>{const{bau:t,css:n}=e,{article:a,section:i,h1:o,p:s,h2:r,h3:l,pre:u,div:c}=t.tags;ft.registerLanguage("javascript",Oa);const d=J(e),h=({text:b})=>u({bauCreated:({element:f})=>{f.innerHTML=ft.highlight(b,{language:"js"}).value}});return function(f){return a({class:n``},o(f.title),s(f.description),r("Gallery"),d({Item:f.gridItem(e)}),r("Usage"),l("Import"),h({text:f.importStatement}),l("Instantiate"),h({text:f.instantiate}),l("Invocation"),h({text:f.invovation}),r("Usage"),f.examples.map(g=>i(o(g.title),s(g.description),c(g.createComponent(e)),h({text:g.code}))))}},Ba=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context, { accordionDefs });
  return Accordion();
};
`,Te=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>n(a("Item 3 content"))}]},Ra={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',instantiate:`
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

const Accordion = accordion(context);`,invovation:'Accordion({color: "danger", variant: "plain"});',examples:[{title:"Default ",description:"A simple accordion.",code:Ba,createComponent:e=>{const t=Te(e);return we(e,{accordionDefs:t})()}},{title:"width: fit-content",description:"Customize the width of the accordion.",code:`
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
})
    `,createComponent:e=>{const{css:t}=e,n=Te(e);return we(e,{accordionDefs:n})({color:"warning",class:t`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})}},{title:"Cross Icon",description:"Customize the icon with a cross.",code:`
Accordion({
  color: "success",
  variant: "outline",
  class: css\`
    &.accordion {
      & ul {
        & li {
          & h3 {
            &::after {
              content: "+";
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
})
    `,createComponent:e=>{const{css:t}=e,n=Te(e);return we(e,{accordionDefs:n})({color:"success",variant:"outline",class:t`
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
          `})}}],gridItem:e=>{const t=Te(e),n=we(e,{accordionDefs:t});return a=>n({...a})}},La=e=>{const t=Da(e);return()=>t(Ra)},ja={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Pa=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},za=()=>ae.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function _e(e,t){const{bau:n,css:a,createGlobalStyles:i}=e,{div:o,i:s}=n.tags;Pa({css:a,createGlobalStyles:i});const r=a`
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
    ${za()}
  `,l=te(e),u=({onclick:c})=>l({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(d,...h){const{variant:b="outline",color:f="neutral",size:g="md",onRemove:p,...y}=d;return o({...y,class:B(`alert-${b}`,b,f,g,r,t==null?void 0:t.class,d.class,"alert"),role:"alert"},s({class:"icon"},ja[f]),o({class:"content"},...h),p&&u({onclick:p}))}}const Ha=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,h4:l,p:u}=n.tags,c=J(e),d=_e(e),h=_e(e,{class:a`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>i({id:"alert"},r(t("Alert Examples")),s("Basic Alert"),o(d({color:"danger"},l("Something went wrong"),u("Error code ",404),u("Status ","Not Found"))),s("Custom Alert"),o(h({color:"warning"},l("My message"))),s("Alert Table"),c({Item:b=>d({...b},`Alert ${b.color}`)}))},Ga=(e,t={})=>{const{bau:n,css:a,keyframes:i}=e,{limit:o=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,l=n.state([]),u={inserting:i`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:i`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},c={stack:a`
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
      animation: ${u.inserting} var(--transition-slow) ease-out;
    `,itemOut:a`
      animation: ${u.removing} var(--transition-slow) ease-out;
    `},d=({id:h,status:b})=>{const f=l.val.findIndex(g=>g.id===h);f!=-1&&(l.val[f].status=b)};return function(b={},...f){const g=({id:E})=>{d({id:E,status:"removing"});const T=l.val.findIndex(k=>k.id===E);T!=-1&&l.val.splice(T,1)},p=({Component:E})=>{const T={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};l.val.length>=o&&g({id:l.val[0].id}),l.val.push(T),setTimeout(()=>g(T),s)},y=E=>r({class:c.item,onclick:()=>g(E)},E.Component());return document.addEventListener("alert.add",E=>p(E.detail)),document.addEventListener("alert.remove",E=>g(E.detail)),r({class:B(c.stack,t==null?void 0:t.class,b.class)},n.loop(l,r(),y))}},Ua=e=>{const{tr:t,bau:n}=e,{section:a,h1:i}=n.tags,o=Ga(e,{deleteAfterDuration:2e4}),s=te(e),r=_e(e);return function(){return a({id:"alert-stack"},o(),i("Alert stack"),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Fa=({keyframes:e})=>({hideRight:e`
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
 `}),Wa=e=>{const{bau:t}=e,{section:n,div:a,h1:i}=t.tags,o=Ct(),s=te(e),r=Fa(e);return function(){const l=t.state(!0),u=a(),c=d=>{u.replaceChildren(o({parent:u,animationHide:`${r.hideRight} 0.5s`,animationShow:`${r.showRight} 0.5s`},a(d.val?"Ciao":"")))};return c(l),n({id:"animate"},a(i("Test Animate"),a(s({onclick:()=>{l.val=!l.val,c(l)}},()=>l.val?"Hide":"Show")),u))}};function Gt(e,t){const{bau:n,css:a}=e,{span:i,img:o}=n.tags,s=n.state(!0),r=n.state(!1),l=()=>s.val=!1,u=d=>{s.val=!1,r.val=!0},c=a`
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
  `;return function(...h){let[{color:b,variant:f="outline",size:g="md",width:p=30,height:y=30,...E},...T]=Q(h);return i({class:B(c,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",o({width:p,height:y,onload:l,onerror:u,class:B(b,f,g,c,t==null?void 0:t.class,E.class),...E}))}}const Xa=e=>{const{tr:t,bau:n,css:a,config:i}=e,{section:o,h2:s,h3:r}=n.tags,l=a`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,u=J(e),c=Gt(e,{class:a`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>o({id:"avatar"},s(t("Avatar")),c({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}),c({src:`${i.base}/grucloud.svg`,alt:"GruCloud"}),r("Avatar Table"),u({Item:d=>c({...d,src:`${i.base}/grucloud.svg`,alt:"GruCloud"})}))};function Je(e,t){const{bau:n,css:a,window:i}=e,{dialog:o}=n.tags,s=a`
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
  `;return function(...l){let[{contentEl:u,triggerEl:c,onClose:d,...h},...b]=Q(l);const f=y=>{p.style.opacity=1,p.showModal();const E=c.getBoundingClientRect(),T=p.getBoundingClientRect();E.x<i.innerWidth/2?p.style.left=E.left+"px":p.style.left=E.right-T.width+"px",E.y<i.innerHeight/2?p.style.top=E.top+E.height+"px":p.style.top=E.top-T.height+"px"},g=y=>{const E=()=>{p.close(),p.removeEventListener("transitionend",E)};p.addEventListener("transitionend",E),p.style.opacity=0},p=o({role:"presentation",class:B("popover",s,t==null?void 0:t.class,h==null?void 0:h.class),onclick:y=>y.target===p&&(g(),d==null?void 0:d.call())},u);return p.closeDialog=g,p.openDialog=f,p}}const Va=()=>ae.map(e=>`
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
`);function Qe(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,o=a`
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
    ${Va()}
  `;return function(r){const{size:l="md",variant:u="outline",color:c="neutral",name:d,id:h,disabled:b,...f}=r;return i({...f,class:B("input",l,c,u,o,t==null?void 0:t.class,f.class)})}}const Ka=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ut(e,t){const{bau:n,css:a}=e,{div:i,li:o,ul:s}=n.tags,r=Je(e),l=te(e),u=Qe(e),c=Ne(e),d=a`
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

    ${Ka()}
  `,h=n.state(""),b=n.state(""),f=n.state(!1),g=n.state(0),p=()=>{f.val=!1};return function(...E){let[{variant:T="outline",color:k,size:O="md",id:R,label:N,placeholder:D,Option:_,options:H,getOptionLabel:Z=({label:j})=>j,...G},...W]=Q(E);const K=n.state(H),w=()=>{z.openDialog(),f.val=!0,b.val="",K.val=H},S=()=>{z.closeDialog(),f.val=!1,b.val=""},m=j=>{const{value:V}=j.target;b.val=V,V?K.val=H.filter(ee=>Z(ee).match(new RegExp(`${V}`,"i"))):K.val=H},v=j=>{f.val?S():w()},x=({option:j,index:V})=>ee=>{h.val=Z(j),g.val=V,S()},$=j=>{switch(console.log("onkeydown",j.key,g.val),j.key){case"Escape":S();break;case"ArrowDown":g.val<K.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=K.val.length-1:g.val--;break;case"Enter":h.val=Z(K.val[g.val]),b.val="",S();break}},M=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":f,"aria-label":N,onclick:v,variant:T,color:k,size:O},()=>!h.val&&N,h),U=u({id:R,value:b,placeholder:D,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":f,oninput:m,onkeydown:$,variant:T,color:k,size:O}),z=r({id:R,triggerEl:M,contentEl:(()=>i({class:B(T,k,O,"content")},U,()=>c({class:B(T,k,O)},K.val.map((j,V)=>o({class:()=>B(g.val==V&&"active"),onclick:x({option:j,index:V})},_(j))))))(),onClose:p});return i({...G,class:B("autocomplete",d,t==null?void 0:t.class,G==null?void 0:G.class)},M,z)}}const Za=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,span:l}=n.tags,u=(...f)=>o({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),c=J(e),d=Ut(e),h=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=f=>o({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(f.label),l(f.code));return()=>i({id:"autocomplete",class:a``},r(t("Autocomplete")),s("Basic Autocomplete"),u(d({options:h,Option:b,getOptionLabel:({label:f})=>f,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),c({Item:f=>d({...f,options:h,Option:b,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})}))};function He(e,t){const{bau:n,css:a}=e,{span:i}=n.tags,o=a`
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
  `;return function(...r){let[{color:l,variant:u="outline",size:c="md",content:d,...h},...b]=Q(r);return i({...h,class:B("badge",o,t==null?void 0:t.class,h==null?void 0:h.class)},i({class:B(l,u,c)},d),...b)}}const qa=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:o,h2:s}=t.tags,r=(...d)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...d),l=J(e),u=He(e),c=He(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>a({id:"badge"},s("Badge"),o("Basic Badge"),r(u({content:"10"},"☏")),o("Badges Table"),l({Item:(d,{index:h})=>u({...d,content:`${h*100}`},"☏")}),o("Badge custom"),r(c({content:"1"},"☏")))};function Ft(e,t){const{bau:n,css:a}=e,{ul:i,li:o,a:s,span:r}=n.tags,l=te(e),u=a`
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
  `;return function(...d){let[{color:h,variant:b="outline",size:f="md",items:g,...p},...y]=Q(d);return i({...p,class:B(u,t==null?void 0:t.class,p==null?void 0:p.class)},g.map(({href:E,name:T})=>o((E?l:r)({href:E,color:h,variant:b,size:f,class:B(h,b,f)},T))))}}const Ya=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:o}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},r=J(e),l=Ft(e);return()=>a({id:"breadcrumbs"},i(t("Breadcrumbs")),o("Bacis Breadcrumb"),l(s),o("Breadcrumbs Table"),r({Item:u=>l({...u,...s})}))},Ja=e=>{const{bau:t,css:n}=e,{section:a,p:i,h3:o}=t.tags,s=J(e),r=te(e);return()=>a({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},o("Button Examples"),s({Item:l=>r({...l},`${l.variant} ${l.color} ${l.size}`)}),o("Full With"),i(r({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),o("Icon"),i(r({"aria-label":"Close"},"✖"),r({},"⟪"),r({},"⟨"),r({},"⟩"),r({},"⟫")))},Qa=()=>ae.map(e=>`
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
`);function et(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,o=a`
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
  `;return function(...r){let[{variant:l="outline",size:u="md",color:c,...d},...h]=Q(r);return i({...d,class:B("button-group",l,c,u,o,t==null?void 0:t.class,d==null?void 0:d.class)},...h)}}const eo=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:o}=n.tags,s=J(e),r=te(e),l=et(e),u=["ONE","TWO","THREE"];return()=>a({id:"button-group"},i(t("Button Group Examples")),o("Outline"),l({color:"primary",variant:"solid"},u.map(c=>r({color:"primary",variant:"solid"},c))),o("Button Group Table"),s({Item:c=>l({...c},u.map(d=>r(c,d)))}))};function Ge(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,s=a`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ae.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{color:u="neutral",variant:c="plain",size:d,...h},...b]=Q(l);return i({...h,type:"date",class:B("calendar",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...b)}}const to=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,label:l}=n.tags,u=J(e),c=(...f)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),d=n.state("2023-08-08"),h=Ge(e),b=Ge(e,{class:a`
      background-color: lightseagreen !important;
    `});return()=>i({id:"calendar"},r(t("Calendar")),o("Date: ",d),s("Basic Calendar"),c(l({for:"start"},"Start date:",h({id:"start",value:d.val,oninput:f=>{d.val=f.target.value}}))),s("Calendar min and max"),c(l("End date:",h({min:"2023-01-01",max:"2023-12-31",value:d.val,oninput:f=>{d.val=f.target.value}}))),s("Calendar custom"),c(b({})),s("Calendar Table"),u({Item:f=>h({...f})}))};function Wt(e,t){const{bau:n,css:a}=e,{span:i}=n.tags,o=a`
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
  `;return function(...r){let[{size:l="md",variant:u="outline",color:c="neutral",onclick:d,...h},...b]=Q(r);return i({...h,onclick:d,class:B("chip",o,l,u,c,d&&"clickable",t==null?void 0:t.class,h==null?void 0:h.class)},...b)}}const no=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r}=n.tags,l=J(e),u=(...d)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...d),c=Wt(e);return()=>i({id:"chip"},r(t("Chip")),s("Chip Default"),u(c("My Chip")),s("Chip Clickable"),u(c({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),l({Item:d=>c({...d},`Chip ${d.color}`)}))};function Xt(e,t={}){const{bau:n,css:a}=e,{input:i}=n.tags,o=a`
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
  `;return function(...r){let[{color:l,variant:u="outline",size:c="md",...d},...h]=Q(r);return i({type:"checkbox",required:"required",...d,class:B(o,l,u,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const ao=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,label:s,h2:r,form:l}=n.tags,u=J(e),c=Xt(e),d=n.state(!1),h=n.state(!1),b=g=>p=>{g.val=!!p.target.checked},f=(...g)=>o({class:a`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...g);return()=>i({id:"checkbox"},l(r(t("Checkbox Examples")),f(c({id:"myCheckbox",name:"myCheckbox",checked:d,onchange:b(d)}),s({for:"myCheckbox"},"My Checkbox")),f(c({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:h,onchange:b(h)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),r(t("Checkbox Table")),u({Item:(g,{index:p})=>c({id:`myCheckbox-${p}`,name:`myCheckbox-${p}`,...g})})))};function oo(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,o=a`
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
  `;return function(...r){let[{color:l,variant:u="outline",size:c,openState:d,...h},...b]=Q(r);return i({class:B(o,t==null?void 0:t.class,h.class)},i({class:()=>B("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),i({class:()=>B("content",d.val&&"content-open")},b))}}const ro=e=>{const{tr:t,bau:n}=e,{section:a,h2:i}=n.tags,o=n.state(!1),s=oo(e),r=te(e),l=At(e);return()=>a({id:"drawer"},i(t("Drawer")),r({onclick:()=>{o.val=!o.val}},"OPEN DRAWER"),s({openState:o},l()))},so=e=>{const{tr:t,bau:n,window:a,config:i}=e,{section:o,h2:s,h3:r}=n.tags,l=n.state(a.location.pathname.replace(i.base,"")),u=J(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},d=Ve(e,{base:i.base+"/components/drillDownMenu"});return()=>o({id:"drillDownMenu"},s(t("Drill Down Menu")),d({tree:c,pathnameState:l}),r("Drill Down Table"),u({Item:h=>d({tree:c,...h})}))};function Vt(e,t){const{bau:n,css:a}=e,{div:i,span:o,label:s,input:r}=n.tags,l={base:a`
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
        &:hover {
          box-shadow: var(--shadow-m);
        }
      }
    `,disabled:a`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(c,...d){const{variant:h="outline",color:b="neutral",size:f="md",Component:g,disabled:p,...y}=c;return i({class:B(l.base,p&&l.disabled,t==null?void 0:t.class,c.class)},s({class:B(h,b,f)},g({disabled:p}),r({type:"file",disabled:p,...y})),o({class:"filename-display"}))}}const io=e=>{const{tr:t,bau:n,css:a}=e,{svg:i,use:o}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:r,h3:l,h2:u,span:c}=n.tags,d=J(e),h=n.state("No file selected"),b=Vt(e),f=p=>{const y=p.target.files[0];y?h.val=y.name:h.val="No file selected"},g=({disabled:p})=>r({class:B(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,p&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},o({href:"uploadIcon.svg#Capa_1"})),c(t("Choose a file to upload")));return()=>s({id:"fileInput"},u(t("FileInput Examples")),l("File Input"),b({Component:g,name:"file",accept:"text/*",onchange:f}),r("File selected: ",h),l("File Input disabled"),b({Component:g,name:"file",accept:"text/*",disabled:!0,onchange:f}),l("File Input Table"),d({Item:p=>b({Component:g,name:"file",accept:"text/*",onchange:f,...p})}))},lo=e=>{const{tr:t,bau:n}=e,{section:a,div:i,h3:o,h2:s}=n.tags,r=J(e),l=Qe(e);return()=>a({id:"input"},s(t("Input Examples")),o("Standard"),i(l({id:"my-Input",name:"Label",label:"Label"})),o("Disabled"),i(l({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),l({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),o("Input with error"),i(l({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),o("Input Table"),r({Item:u=>l({name:"my-input",id:"my-input-with",placeholder:"Enter text",...u})}))};function Kt(e,t){const{bau:n,css:a}=e,{dialog:i}=n.tags,s=a`
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
    ${(()=>ae.map(r=>`
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
  `;return function(...l){let[{color:u="neutral",variant:c="outline",size:d="md",...h},...b]=Q(l);return i({class:B("modal",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...b)}}const co=e=>{const{tr:t,bau:n}=e,{section:a,main:i,h2:o,header:s,footer:r,p:l,div:u}=n.tags,c=J(e),d=te(e),h=Kt(e),b=()=>i(Array(10).fill("").map((p,y)=>l(y+1,". Some text here"))),f=p=>{const y=h({id:"my-dialog",...p},s("Header"),b(),r(d({variant:"outline",color:p.color,onclick:()=>{y.close()}},"Cancel"),d({variant:"solid",color:p.color,onclick:()=>{y.close()}},"OK")));return y},g=f({color:"neutral"});return()=>a({id:"modal"},o(t("Modal Examples")),d({variant:"solid",color:"neutral",onclick:()=>{g.showModal()}},"OPEN MODAL"),g,o(t("Modal Table")),c({Item:p=>{const y=f(p);return u(d({...p,onclick:()=>{y.showModal()}},"OPEN MODAL"),y)}}))},uo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,h1:l,p:u}=n.tags,c=te(e),d=(...O)=>o({class:a`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...O),h=Je(e),f=(()=>c({onclick:()=>y.open?y.closeDialog():y.openDialog()},"Click"))(),g=()=>o({},l("My content"),u("My Content")),p=g(),y=h({id:"my-popover-left",triggerEl:f,contentEl:p}),E=c({onclick:()=>k.open?k.closeDialog():k.openDialog()},"Click"),T=g(),k=h({id:"my-popover-left",triggerEl:E,contentEl:T});return()=>i({id:"popover",class:a``},r(t("Popover")),s("Basic Popover"),d(o(f,y),o(E,k)))},ho=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Zt(e,t){const{bau:n,css:a}=e,{div:i,li:o}=n.tags,s=te(e),r=Je(e),l=Ne(e),u=a`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ho()}
  `,c=n.state(""),d=n.state(!1),h=n.state(0);return function(...f){let[{color:g="neutral",variant:p="outline",size:y="md",id:E,label:T,Option:k,options:O,getOptionLabel:R=({label:v})=>v,...N},...D]=Q(f);const _=()=>{m.openDialog(),m.focus(),d.val=!0},H=()=>{m.closeDialog(),d.val=!1},Z=()=>{d.val=!1},G=v=>{d.val?H():_()},W=({option:v,index:x})=>$=>{c.val=R(v),h.val=x,H()},K=v=>{switch(v.preventDefault(),v.key){case"Escape":H();break;case"ArrowDown":h.val<O.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=O.length-1:h.val--;break;case"Enter":d.val?(c.val=R(O[h.val]),H()):_();break}},w=()=>l({tabindex:"0",class:B(g,p)},O.map((v,x)=>o({class:()=>B(h.val==x&&"active"),onclick:W({option:v,index:x})},k(v)))),S=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":T,onclick:G,color:g,variant:p,size:y},()=>!c.val&&T,c),m=r({id:E,triggerEl:S,contentEl:w(),onClose:Z});return i({...N,class:B("select",g,y,u,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:K},S,m)}}const mo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,span:l}=n.tags,u=(...f)=>o({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),c=J(e),d=Zt(e),h=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],b=f=>o({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(f.label),l(f.code));return()=>i({id:"select",class:a``},r(t("Select")),s("Basic Select"),u(d({options:h,Option:b,getOptionLabel:({label:f})=>f,label:"Select a country..."})),r(t("Select Table")),c({Item:f=>o(d({...f,options:h,Option:b,getOptionLabel:({label:g})=>g,label:"Select a country..."}))}))};function Me(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,s=a`
    ${(()=>ae.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...l){let[{color:u="neutral",variant:c="outline",size:d,...h},...b]=Q(l);return i({...h,type:"range",class:B("slider",u,c,d,s,t==null?void 0:t.class,h.class)},...b)}}const go=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,p:l,label:u,datalist:c,option:d,br:h}=n.tags,b=n.state(0),f=k=>{b.val=k==null?void 0:k.target.value},g=(...k)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...k),p=J(e),y=Me(e),E=Me(e),T=Me(e);return()=>i({id:"slider"},r(t("Slider")),l("Slider value: ",b),s("Basic Slider"),g(y({oninput:f,name:"slider-simple"})),s(t("Slider Table")),p({Item:k=>y(k)}),s("Slider Min Max: -1000 1000"),g(E({oninput:f,min:-1e3,max:1e3})),s("Slider Step 20"),g(y({oninput:f,step:20,min:-100,max:100})),s("Slider Vertical"),g(o({class:a`
              display: flex;
            `},y({oninput:f,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:a`
              width: 30px;

              appearance: slider-vertical;
            `}),c({id:"markers-vertical",class:a`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(k=>d({value:Number(k),label:k}))))),s("Slider with mark"),g(u({for:"temp"},"Choose a comfortable temperature"),h(),T({oninput:f,class:a`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),c({id:"markers",class:a`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(k=>d({value:Number(k),label:k})))))},bt={sm:16,md:32,lg:64};function tt(e,t={}){const{bau:n,css:a}=e,{svg:i,animate:o,animateTransform:s,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:u="md",color:c="color-base",variant:d="outline",visibility:h=!0,...b}={}){return i({class:B(a`
            visibility: ${h?"visible":"hidden"};
            color: var(--color-${c});
          `,t.class,b.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:bt[u],height:bt[u],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},o({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const fo=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:o}=n.tags,s=J(e),r=tt(e);return()=>a({id:"spinner"},i(t("Spinner Examples")),o(t("Spinner Table")),s({Item:l=>r(l)}))},po=()=>ae.map(e=>`
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
`);function qt(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,o=a`
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
    ${po()}
  `;return function(...r){let[{color:l="neutral",variant:u="plain",size:c="md",...d},...h]=Q(r);return i({...d,class:B("switch",o,l,u,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...h)}}const bo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,form:o,label:s,div:r,h2:l}=n.tags,u=J(e),c=qt(e);return()=>i({id:"switch"},l(t("Switch Examples")),o(r({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-shinny-switch"},"My shinny switch"),c({id:"my-shinny-switch"}))),l(t("Switch Table")),u({Item:d=>r({class:a`
                & label {
                  display: inline-flex;
                  border: 1px dotted var(--color-emphasis-200);
                  font-size: smaller;
                  align-items: center;
                  color: var(--color-content-secondary);
                  padding: 0.2rem;
                }
              `},s("off ",c({...d,id:`my-switch-example-off-${d.color}-${d.variant}`})),s("on ",c({...d,id:`my-switch-example-on-${d.color}-${d.variant}`,checked:!0})))}))},vo=()=>ae.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Ue(e,t){const{bau:n,css:a}=e,{tabDefs:i}=t,{div:o,ul:s,li:r}=n.tags,l=n.state(i),u=n.state(i[0]),c=h=>l.val.find(b=>b.name==h),d={base:a`
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
      ${vo()}
    `};return function(...b){let[{color:f,variant:g="plain",size:p,...y},...E]=Q(b);const T=O=>{const{Header:R,disabled:N,name:D}=O;return r({class:()=>B(u.val.name==D&&"active",N&&"disabled"),onclick:_=>_.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:D},bubbles:!0}))},R(O))},k=o({class:B("tabs",d.base,g,p,f,t==null?void 0:t.class,y.class)},n.loop(l,s(),T),()=>u.val.Content?u.val.Content({}):"");return k.addEventListener("tab.select",O=>{var D,_;const{tabName:R}=O.detail,N=c(R);N&&((D=u.val.exit)==null||D.call(),u.val=N,(_=N.enter)==null||_.call())},!1),k.addEventListener("tab.add",O=>{var N;const{tab:R}=O.detail;(N=R.enter)==null||N.call(),l.val.push(R)},!1),k.addEventListener("tab.remove",O=>{var N;const R=l.val.findIndex(D=>D.name==O.detail.tabName);R>0&&((N=l.val[R].exit)==null||N.call(),l.val.splice(R,1))},!1),k}}const wo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,p:l,i:u}=n.tags,c=J(e),d=te(e),h=(...E)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...E),b=()=>({name:"New Tab",Header:({name:E})=>o(E),Content:()=>o("My Paragraph")}),g=Ue(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My tab Disabled"))}]}),y=Ue(e,{tabDefs:[{name:"Tab1",Header:()=>o(u({class:a`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>o({class:a`
              > button {
                margin: 10px;
              }
            `},d({onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:b()},bubbles:!0}))},"Add a new Tab"),d({accent:!0,onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My Content"))}]});return()=>i({id:"tabs"},r(t("Tabs")),s("Basic Tabs"),h(g({})),s("Full Witdth"),h(g({class:a`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),h(g({class:a`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),h(g({class:a`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),h(g({class:a`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),h(g({class:a`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),h(y({})),r(t("Tabs Table")),c({Item:E=>g(E)}))};function de(e,t){const{bau:n,css:a,createGlobalStyles:i}=e,{div:o}=n.tags;i`
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
  `;return function(...l){let[{...u},...c]=Q(l);return o({...u,class:B("table-container",s,t==null?void 0:t.class,u==null?void 0:u.class)},...c)}}const yo=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:o,h2:s,th:r,td:l,tr:u,table:c,thead:d,tbody:h,caption:b}=t.tags;function f(D,_,H,Z,G){return{name:D,calories:_,fat:H,carbs:Z,protein:G}}const g=[f("Frozen yoghurt",159,6,24,4),f("Ice cream sandwich",237,9,37,4.3),f("Eclair",262,16,24,6),f("Cupcake",305,3.7,67,4.3),f("Gingerbread",356,16,49,3.9)],p=(...D)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...D),y=({name:D,calories:_})=>u(l(D),l({class:n`
            text-align: right;
          `},_)),E=()=>d(u(r({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),r({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),T=de(e,{class:n`
      max-width: 650px;
    `}),k=de(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),O=de(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),R=de(e,{class:n`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),N=de(e,{class:n`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>a({id:"table"},s(u("Table")),o("Basic Table"),p(T(c(b("Basic Table"),E(),h(g.map(y))))),o("Dense Table"),p(k(c(b("Dense Table"),E(),h(g.map(y))))),o("Zebra Table"),p(O(c(b("Zebra Table"),E(),h(g.map(y))))),o("Caption Bottom"),p(R(c(b("Caption Bottom Table"),E(),h(g.map(y))))),o("Overflow Header"),p(N(c(b("Overflow Header"),E(),h(g.map(y))))))};function Yt(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,o=et(e),s=te(e),r=tt(e),l=a`
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
  `,u=({label:f,icon:g,...p})=>s({"aria-label":f,title:f,...p},g),c=({count:f,totalCount:g,page:p,rowsPerPage:y})=>i({class:"pages-numbers"},Number(p-1)*Number(y)+(f>0?1:0),"-",Math.min(p*y,g)," of ",g),d=({count:f,page:g,rowsPerPage:p})=>i({class:"pages-numbers"},(g-1)*p+(f>0?1:0),"-",g*p),h=f=>f<=1,b=(f,g,p)=>f>=Math.ceil(g/p);return function(...g){let[{count:p=0,totalCount:y=0,page:E=1,rowsPerPage:T=50,onPageChange:k,isLoading:O=!1,disableFirst:R=()=>h(E),disablePrevious:N=()=>h(E),disableNext:D=()=>b(E,y,T),disableLast:_=()=>b(E,y,T),...H},...Z]=Q(g);const G=Math.max(0,Math.ceil(y/T)),W=k({page:1}),K=k({page:E-1}),w=k({page:E+1}),S=k({page:G}),m=[{label:"First",icon:"⟪",onclick:W,disabled:R()},{label:"Previous",icon:"⟨",onclick:K,disabled:N()},{label:"Next",icon:"⟩",onclick:w,disabled:D()},{label:"Last",icon:"⟫",onclick:S,disabled:_()}];return i({...H,class:B("table-pagination",l,O&&"disabled",t==null?void 0:t.class,H==null?void 0:H.class)},r({class:"spinner",visibility:O,size:"md"}),y>0?c({count:p,totalCount:y,page:E,maxPages:G,rowsPerPage:T}):d({count:p,page:E,maxPages:G,rowsPerPage:T}),o({variant:"outline",color:"neutral"},m.map(v=>u({...v,variant:"outline",color:"neutral"}))))}}const Eo=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),xo=e=>{const{bau:t,css:n}=e,{th:a,td:i,tr:o,table:s,thead:r,tbody:l}=t.tags,u=Eo(45),c=({name:E,email:T})=>o(i(E),i(T)),d=()=>r(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Email")),h=Yt(e),b=de(e,{class:n`
      max-width: 650px;
    `}),f=t.state(u),g=t.state({count:u.length,totalCount:u.length,page:1,rowsPerPage:10}),p=t.derive(()=>f.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),y=({page:E})=>T=>{g.val.page=E};return()=>b(s(d(),()=>l(p.val.map(c))),()=>h({...g.val,onPageChange:y}))},Co=e=>{const{bau:t,css:n}=e,{th:a,td:i,tr:o,table:s,thead:r,tbody:l,div:u}=t.tags,c=t.state(!1),d=t.state([]),h=t.state(""),b=t.derive(()=>d.val.length),f=t.state(1),g=t.state(10),p=t.derive(()=>d.val),y=_=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(_).toString()}`,E=({page:_})=>H=>{f.val=_,T(y({page:_,per_page:g.val}))};T(y({page:1,per_page:g.val}));async function T(_){try{c.val=!0;const H=await fetch(_,{});if(H.ok){const Z=await H.json();d.val=Z;return}throw H}catch(H){h.val=H.message}finally{c.val=!1}}const k=({name:_,description:H,stargazers_count:Z})=>o(i(_),i(H),i({class:n`
            text-align: right;
          `},Z)),O=()=>r(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Description"),a({class:n`
            text-align: right;
          `},"Stars")),R=Yt(e),N=de(e,{class:n`
      min-width: 650px;
    `}),D=({message:_})=>u(_);return()=>N(()=>R({rowsPerPage:g.val,page:f.val,count:b.val,totalCount:-1,isLoading:c.val,onPageChange:E,disableNext:()=>!1}),s(O(),()=>h.val&&D({message:h.val}),()=>l(p.val.map(k))))},So=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:o,h2:s,tr:r}=t.tags,l=xo(e),u=Co(e),c=(...d)=>i({class:n`
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
        `},...d);return()=>a({id:"pagination"},s(r("Table Pagination")),o("Asynchronous Pagination"),c(u()),o("Simple Pagination"),c(l()))};function Fe(e,t){const{bau:n,css:a,window:i}=e,{div:o}=n.tags,s=a`
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
  `;return function(...l){let[{titleEl:u,side:c="bottom-start",color:d="neutral",variant:h="outline",size:b="md",...f},...g]=Q(l);const p=o({class:B("container",...c.split("-"))},o({class:B("content",d,h,b),role:"tooltip"},u)),y=N=>`move-to-${N}`,E=(N,D,_)=>{if(N()){const H=y(D);p.classList.add(H),p.classList.add(D),p.classList.remove(_)}},T=(N,D)=>{const _=y(N);p.classList.contains(_)&&(p.classList.remove(_),p.classList.add(D),p.classList.remove(N))},k=N=>{const D=p.getBoundingClientRect();E(()=>D.x<0,"right","left"),E(()=>D.x+D.width>i.innerWidth,"left","right"),E(()=>D.y<0,"bottom","top"),E(()=>D.bottom>i.innerHeight,"top","bottom"),p.classList.add("visible")},O=N=>{p.classList.remove("visible"),T("right","left"),T("left","right"),T("bottom","top"),T("top","bottom")};return o({...f,class:B("tooltip",s,t==null?void 0:t.class,f==null?void 0:f.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",k),N.addEventListener("mouseout",O)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",k),N.removeEventListener("mouseout",O)}},...g,p)}}const ko=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h2:s,em:r,p:l}=n.tags,u=J(e),c=te(e),d=Fe(e),h=Fe(e,{class:a`
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
    `}),b=()=>o({class:a`
          font-size: larger;
        `},l("A ",r("tooltip")," can be any component")),f=()=>[o({class:a`
          display: flex;
          justify-content: space-around;
        `},d({side:"top-start",titleEl:b()},c({},"top-start")),d({side:"top-centered",titleEl:b()},c({},"top-centered")),d({side:"top-end",titleEl:b()},c({},"top-end"))),o({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-start",titleEl:b()},c({},"left-start")),d({side:"right-start",titleEl:b()},c({},"right-start"))),o({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-centered",titleEl:b()},c({},"left-centered")),d({side:"right-centered",titleEl:b()},c({},"right-centered"))),o({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-end",titleEl:b()},c({},"left end")),d({side:"right-end",titleEl:b()},c({},"right end"))),o({class:a`
          display: flex;
          justify-content: space-around;
        `},d({side:"bottom-start",titleEl:b()},c({},"bottom start")),d({side:"bottom-centered",titleEl:b()},c({},"bottom centered")),d({side:"bottom-end",titleEl:b()},c({},"bottom end")))];return()=>i({id:"tooltip"},s(t("Tooltip")),o({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},f()),s(t("Tooltip moved")),o({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},f()),s(t("Tooltip custom")),o({class:a`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},h({titleEl:b()},c({},"custom tooltip"))),s(t("Tooltip Table")),u({Item:g=>d({titleEl:b(),...g},c(g,`${g.color} ${g.variant}`))}))},Ao=e=>{const{tr:t,bau:n,css:a}=e,{section:i,form:o,div:s,h2:r}=n.tags,l=J(e),u=Xe(e);return()=>i({id:"theme-switch"},r(t("Theme Switch")),o(s({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},u({}))),r(t("Theme Switch Table")),l({Item:c=>u(c)}))},To=({css:e,createGlobalStyles:t})=>(t`
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
    `});function Jt(e,t){const{bau:n,css:a,createGlobalStyles:i,window:o}=e,{renderMenuItem:s}=t,{ul:r,li:l,nav:u,div:c}=n.tags,d=To({css:a,createGlobalStyles:i}),h=({element:p,closeState:y})=>{p.scrollHeight!=0&&(y.val?b(p):f(p))};function b(p){p.style.height=p.scrollHeight+"px";const y=()=>{p.removeEventListener("transitionend",y)};p.addEventListener("transitionend",y),o.requestAnimationFrame(()=>{p.style.height="0px"})}function f(p){const y=()=>{p.removeEventListener("transitionend",y),p.style.height=null};p.addEventListener("transitionend",y),p.style.height=p.scrollHeight+"px"}const g=({depth:p=1,maxDepth:y,color:E,variant:T,size:k})=>O=>{const{children:R,expanded:N}=O,D=n.state(!N);return l({class:()=>B(R?D.val?d.collapsed:d.expanded:"")},c({class:a`
              cursor: pointer;
            `,onclick:_=>{R&&(D.val=!D.val)}},s(O.data)),R&&p<y&&r({class:B(E,k),bauMounted:({element:_})=>{D.val&&(_.style.height="0px")},"aria-expanded":({element:_})=>(h({element:_,closeState:D}),!D.val)},R.map(g({depth:p+1,maxDepth:y}))))};return function({tree:y,maxDepth:E=1/0,size:T="md",variant:k="plain",color:O="neutral",...R}){return u({class:B(d.nav,T,k,O,t==null?void 0:t.class,R.class)},y.children&&r(y.children.map(g({maxDepth:E,color:O,variant:k,size:T}))))}}const Mo=e=>{const{tr:t,bau:n}=e,{section:a,a:i,h2:o,h3:s}=n.tags,r=J(e),l={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},c=Jt(e,{renderMenuItem:({name:d,href:h})=>i({href:h,onclick:b=>{b.preventDefault()}},d)});return()=>a({id:"treeview"},o(t("Tree View")),s(t("Tree View Default")),c({tree:l}),s(t("Tree View Table")),r({Item:d=>c({...d,tree:l})}))};function Io(e,t={}){const{bau:n,css:a}=e,{div:i,span:o,pre:s,h3:r,h4:l}=n.tags;return function(c,...d){return i("Login")}}const _o=e=>{const{tr:t,bau:n}=e,{section:a,div:i,h3:o,h2:s}=n.tags,r=Io(e);return()=>a({id:"login"},s(t("Login Examples")),o("Basic"),i(r()))};function No(e){const{tr:t,bau:n,css:a}=e,{div:i,article:o,h1:s}=n.tags;return function(){return i({class:a`
          grid-area: main;
          display: flex;
        `},o({class:a`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),_o(e)()))}}const vt=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],$o=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,li:l,span:u}=n.tags,c=J(e),d=(...f)=>o({class:a`
          border: 1px dotted red;
          padding: 1rem;
        `},...f),h=Ne(e),b=({code:f,label:g})=>l({class:a`
          display: flex;
          gap: 1rem;
        `},u(f),u(g));return()=>i({id:"list"},r(t("List")),s("List outline primary"),d(h({variant:"outline",color:"primary"},vt.map(b))),s("List Table"),c({Item:f=>h({...f},vt.map(b))}))},Oo=e=>{const{bau:t,css:n,config:a}=e,{section:i,div:o,h1:s,span:r,p:l,ul:u,li:c,a:d,main:h,header:b,footer:f,label:g}=t.tags,{svg:p,use:y}=t.tagsNS("http://www.w3.org/2000/svg"),E=J(e),k=we(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>o(l("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(l("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>o(l("Item 3 content"))}]}),O=_e(e),R=Ut(e),N=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],D=C=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(C.label),r(C.code)),_=Gt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),H=He(e),Z={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},G=Ft(e),W=te(e),K=et(e),w=Ge(e),S=Xt(e),m=Wt(e),v={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},x=Ve(e,{base:a.base+"/components"}),$=({disabled:C})=>o({class:B(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,C&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},p({width:100,height:100,fill:"currentColor"},y({href:"uploadIcon.svg#Capa_1"})),r("Choose a file to upload")),M=Vt(e),U=Qe(e),L=Kt(e),z=()=>h(Array(10).fill("").map((C,X)=>l(X+1,". Some text here"))),j=C=>{const X=L({id:"my-dialog",...C},b("Header"),z(),f(W({...C,variant:"outline",onclick:()=>{X.close()}},"Cancel"),W({...C,variant:"solid",onclick:()=>{X.close()}},"OK")));return X},V=Zt(e),ee=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],re=C=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(C.label),r(C.code)),me=Me(e),Oe=tt(e),xe=qt(e),De=Ue(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My tab Disabled"))}]}),ge=Xe(e),Ce=()=>r("My tooltip"),oe=Fe(e),Be={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},ve=Jt(e,{renderMenuItem:({name:C,href:X})=>d({href:X,onclick:Y=>{Y.preventDefault()}},C)}),P=[{name:"Accordion",Item:C=>k({...C})},{name:"Alert",Item:C=>O({...C},`Alert ${C.color}`)},{name:"Autocomplete",Item:C=>R({...C,options:N,Option:D,getOptionLabel:({label:X})=>X,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:C=>_({...C,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(C,{index:X})=>H({...C,content:`${X*100}`},"☏")},{name:"Breadcrumbs",Item:C=>G({...C,...Z})},{name:"Button",Item:C=>W({...C},`${C.variant} ${C.color}`)},{name:"Button Group",Item:C=>K({...C},["ONE","TWO","THREE"].map(X=>W(C,X)))},{name:"Calendar",Item:C=>o({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${C.color} ${C.variant}`,w({...C})))},{name:"Checkbox",Item:C=>g({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${C.color} ${C.variant}`,S({id:`myCheckbox-gallery-${C.color}-${C.variant}`,name:`myCheckbox-gallery-${C.color}-${C.variant}`,...C}))},{name:"Chip",Item:C=>m({...C},`Chip ${C.color}`)},{name:"DrillDown Menu",Item:C=>x({tree:v,...C})},{name:"File Input",Item:C=>M({Component:$,name:"file",accept:"text/*",onchange,...C})},{name:"Input",Item:C=>U({name:"my-input",id:"my-input-with",placeholder:"Enter text",...C})},{name:"Modal",Item:C=>{const X=j(C);return o(W({...C,onclick:()=>{X.showModal()}},"OPEN MODAL"),X)}},{name:"Select",Item:C=>o(V({...C,options:ee,Option:re,getOptionLabel:({label:X})=>X,label:"Select a country..."}))},{name:"Slider",Item:C=>o({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${C.color} ${C.variant}`,me({...C,id:`my-slider-${C.color}-${C.variant}`})))},{name:"Spinner",Item:C=>Oe(C)},{name:"Switch",Item:C=>o({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},g("off",xe({...C,id:`mySwitch-off-${C.color}-${C.variant}`})),g("on",xe({...C,id:`mySwitch-on-${C.color}-${C.variant}`,checked:!0})))},{name:"Tabs",Item:C=>De(C)},{name:"Theme Switch",Item:C=>ge(C)},{name:"Tooltip",Item:C=>oe({titleEl:Ce(),...C},W(C,`${C.color} ${C.variant}`))},{name:"Tree View",Item:C=>ve({...C,tree:Be})}];return()=>i(s("Bau Component Gallery"),l("This page displays the components with various colors and variants."),u({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},P.map(({name:C})=>c(W({color:"primary",variant:"solid",href:`#${C}`},C)))),P.map(C=>o({id:C.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},E(C))))},Do=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:On(e)})},{path:"components",action:()=>({title:"Component",component:Oo(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:La(e)})},{path:"alert",action:()=>({title:"Alert",component:Ha(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ua(e)})},{path:"animate",action:()=>({title:"Animate",component:Wa(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Za(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Xa(e)})},{path:"badge",action:()=>({title:"Badge",component:qa(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ya(e)})},{path:"button",action:()=>({title:"Button",component:Ja(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:eo(e)})},{path:"calendar",action:()=>({title:"Calendar",component:to(e)})},{path:"chip",action:()=>({title:"Chip",component:no(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ao(e)})},{path:"drawer",action:()=>({title:"Drawer",component:ro(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:so(e)})},{path:"fileInput",action:()=>({title:"File Input",component:io(e)})},{path:"input",action:()=>({title:"Input",component:lo(e)})},{path:"list",action:()=>({title:"List",component:$o(e)})},{path:"modal",action:()=>({title:"Modal",component:co(e)})},{path:"popover",action:()=>({title:"Popover",component:uo(e)})},{path:"select",action:()=>({title:"Select",component:mo(e)})},{path:"slider",action:()=>({title:"Slider",component:go(e)})},{path:"spinner",action:()=>({title:"Spinner",component:fo(e)})},{path:"switch",action:()=>({title:"Switch",component:bo(e)})},{path:"table",action:()=>({title:"Table",component:yo(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:So(e)})},{path:"tabs",action:()=>({title:"Tabs",component:wo(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:ko(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Ao(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Mo(e)})}]},{path:"pages",action:t=>({title:"Pages",component:No(e)})}],Bo=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Ro=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:a,bau:i,states:o}=e,s=i.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:u})=>{const c=a.location.pathname.replace(n,""),{title:d,component:h,Layout:b=t}=u.resolve({pathname:c});o.pathname.val=c,s.val=h,document.title=`${d}`}},Lo=e=>{const{createGlobalStyles:t}=e;mn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  `},jo=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${xt({dark:!0})}
}
  `};gn();const nt={title:"Bau",base:"/bau/bau-ui"},le=xn({config:nt}),{bau:wt}=le;le.states={pathname:wt.state(window.location.pathname.replace(nt.base,"")),drawerOpen:wt.state(!0)};Lo(le);jo(le);on({routes:Do({context:le}),onLocationChange:Ro({context:le,LayoutDefault:_n(le),config:nt}),notFoundRoute:Bo(le)});
