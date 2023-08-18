(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const tn=(e,t)=>({...e,paths:[...t,e.path]}),Et=({paths:e=[],routes:t})=>t.flatMap(({children:n,...a})=>{const i=tn(a,e);return n?[i,...Et({paths:[...e,a.path],routes:n})]:i}),nn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},an=({routes:e=[],notFoundRoute:t})=>{const n=Et({routes:e}).map(a=>({...a,regex:nn(a)}));return{resolve:({pathname:a})=>{const i=n.find(({regex:o})=>o.test(a));return i?i.action({match:a.match(i.regex)}):t}}};function on({routes:e,notFoundRoute:t,onLocationChange:n}){const a=an({routes:e,notFoundRoute:t});return window.addEventListener("popstate",i=>{i.state!=null&&n({router:a})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,o,s)=>{i.apply(o,s),n({router:a})}}),document.addEventListener("click",i=>{const{target:o}=i,s=o.getAttribute("href");o.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),i.preventDefault())}),n({router:a}),a}const xt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],rn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],sn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],rt=e=>`var(--color-${e})`,ln=e=>`var(--color-${e}-lightest)`,cn=()=>xt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${rt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ln(e)};
}
.solid.${e} {
  background-color: ${rt(e)};
}
`).join(`
`),dn=e=>100-e*10,un=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${dn(t)}%);`).join(`
`),Ct=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),hn=([e,{h:t,s:n,l:a}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${a};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...rn.map(([i,o])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),...sn.map(([i,o])=>`--color-${e}-${i}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${o}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function mn({createGlobalStyles:e},{colorPalette:t=xt}={}){e`
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
      ${Ct({})}
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
  `}function gn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ue=e=>Object.prototype.toString.call(e??0).slice(8,-1),pn=e=>Ue(e)=="Object",st=e=>Ue(e)=="Function",Le=e=>["Object","Array"].includes(Ue(e)),it=Object.getPrototypeOf,je=e=>fe(e)?e.val:e,fe=e=>e==null?void 0:e.__isState,fn=["splice","push","pop","shift","unshift","sort","reverse"],Ae=(e,t)=>{const n=new Array(e.length);for(let a=0;a<e.length;a++)n[a]=t(e[a],a);return n};const J=e=>!fe(e[0])&&pn(e[0])?e:[{},...e];function bn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,a,i=new Set,o=new Set,s=!1,r,l=w=>n.createElement(w),u=(w,S,m)=>{let b=r;r=S;let x=w(m);return r=b,x},c=()=>{a||(a=window.requestAnimationFrame(()=>{i.forEach(w=>{w.bindings=w.bindings.filter(S=>{var m;return(m=S.element)==null?void 0:m.isConnected}),!w.bindings.length&&!w.computed&&i.delete(w)}),a=void 0}))},d=(w,S,m,b,x,$)=>{var M;if(s){o.add(w);return}for(let F of w.bindings){let{deps:L,element:H,renderInferred:j,render:X,renderItem:ee}=F;if(ee&&S)(M=f(H,b,(...re)=>p(ee(...re)),m,x,$)[S])==null||M.call();else{let re=j?j({element:H}):X({element:H,renderItem:ee})(...L.map(je));re!==H&&H.replaceWith(F.element=p(re))}}T(w),c()},h=(w,S,m=[])=>({get(b,x,$){var M;if(r==null||r.add(w),x==="_isProxy")return!0;if(!((M=b[x])!=null&&M._isProxy)&&!fe(b[x])&&Le(b[x]))b[x]=new Proxy(b[x],h(w,S,[...m,x]));else if(fn.includes(x)){let F=b[x];return(...L)=>{let H=F.apply(b,L);return d(w,x,H,L,S,m),H}}return Reflect.get(b,x,$)},set(b,x,$,M){let F=Reflect.set(b,x,$,M);return d(w,"setItem",F,{prop:x,value:$},S,[...m,x]),F}}),v=(w,S)=>new Proxy(S,h(w,S)),f=(w,S,m,b,x,$)=>{let M=()=>w.replaceChildren(...Ae(b,m)),F=L=>w[L]&&w.removeChild(w[L]);return{assign:M,sort:M,reverse:M,setItem:()=>{var H;let L=$[0];(H=w.children[L])==null||H.replaceWith(m(x[L],L))},push:()=>w.append(...Ae(S,(L,H)=>m(L,x.length+H))),unshift:()=>w.prepend(...Ae(S,m)),pop:()=>F("lastChild"),shift:()=>F("firstChild"),splice:()=>{let[L,H,...j]=S;const{length:X}=w.children;for(let ee=L>=0?Math.min(L+H-1,X-1):X-1;ee>=(L>=0?L:X+L);ee--)w.children[ee].remove();if(j.length){let ee=j.forEach((re,me)=>m(re,L+me));w.children[L]?w.children[L].after(...ee):w.append(...ee)}}}},g=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let S=this;return r==null||r.add(S),S.valProxy??(S.valProxy=Le(w)?v(S,w):w,S.valProxy)},set val(S){let m=this,b=m.val;Le(S)?(m.valProxy=v(m,S),d(m,"assign",S)):S!==b&&(m.valProxy=S,d(m)),m.oldVal=b}}),p=w=>w==null||w===!1?l("span"):w.nodeType?w:n.createTextNode(w),y=(w,S)=>{let m=new Set;return S.val=u(w,m),m},E=w=>{let S=g(),m=y(w,S);S.computed=!0;for(let b of m)b.listeners.push({computed:w,deps:m,state:S});return S},T=w=>{for(let S of[...w.listeners])y(S.computed,S.state)},k=(w,...S)=>{if(S.length){let m=[];for(let b of S.flat(1/0))b!=null&&m.push(fe(b)?G({deps:[b],render:()=>x=>x}):st(b)?Z({renderInferred:b}):p(b));w.append(...m)}},D={},B=(w,S)=>w&&(Object.getOwnPropertyDescriptor(w,S)??B(it(w),S)),N=(w,S,m)=>{var b;return D[w+","+S]??(D[w+","+S]=((b=B(m,S))==null?void 0:b.set)??0)},O=(w,S)=>new MutationObserver((m,b)=>{m.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find($=>$===w&&(S({element:w}),b.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),_=w=>new Proxy(function(m,...b){var F;let[x,...$]=J(b),M=w?n.createElementNS(w,m):l(m);for(let[L,H]of Object.entries(x)){if(L.startsWith("bau"))continue;let j=N(m,L,it(M))?X=>M[L]=X:X=>M.setAttribute(L,X);H==null||(fe(H)?G({deps:[H],render:()=>()=>(j(H.val),M)}):st(H)&&(!L.startsWith("on")||H.isDerived)?Z({renderInferred:()=>(j(H({element:M})),M)}):H.renderProp?G({deps:H.deps,render:()=>()=>(j(H.renderProp({element:M})(...H.deps.map(je))),M)}):j(H))}return k(M,...$),(F=x.bauCreated)==null||F.call(x,{element:M}),x.bauMounted&&t.requestAnimationFrame(()=>x.bauMounted({element:M})),x.bauUnmounted&&t.requestAnimationFrame(()=>O(M,x.bauUnmounted)),M},{get:(S,m)=>S.bind(void 0,m)}),z=(w,S,m)=>{w.element=p(m);for(let b of S)fe(b)&&(i.add(b),b.bindings.push(w));return w.element},Z=({renderInferred:w,element:S})=>{let m=new Set,b=u(w,m,{element:S});return z({renderInferred:w},m,b)},G=({deps:w,element:S,render:m,renderItem:b})=>z({deps:w,render:m,renderItem:b},w,m({element:S,renderItem:b})(...w.map(je))),W=(w,S,m)=>G({deps:[w],render:({renderItem:b})=>x=>(S.append(...Ae(x,b)),S),renderItem:m}),K=w=>{s=!0,w(),s=!1,o.forEach(d),o.clear()};return{tags:_(),tagsNS:_,state:g,bind:G,loop:W,derive:E,stateSet:i,batch:K}}const vn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},wn=(e,t,n,a)=>{const i=e.createElement("style");i.id=n,i.append(a),(t??e.head).append(i)},yn=(e,t)=>e.reduce((n,a,i)=>n+a+(t[i]??""),"");function En(e){let{document:t}=(e==null?void 0:e.window)??window;const n=a=>(i,...o)=>{const s=yn(i,o),r=vn(s);return!t.getElementById(r)&&wn(t,e==null?void 0:e.target,r,a(r,s)),r};return{css:n((a,i)=>`.${a} { ${i} }`),keyframes:n((a,i)=>`@keyframes ${a} { ${i} }`),createGlobalStyles:n((a,i)=>i)}}function xn(e){return{bau:bn(),...En(),tr:n=>n,window,...e}}function R(...e){return e.filter(t=>t).join(" ")}function te(e,t){const{bau:n,css:a}=e,i={root:a`
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
    `};return function(...s){let[{color:r,variant:l,size:u="md",disabled:c,href:d,...h},...v]=J(s);return(d?n.tags.a:n.tags.button)({...h,class:R("button",i.root,l,u,r,d?i.a:i.button,c&&i.disabled,t==null?void 0:t.class,h.class),disabled:c,href:d,...!d&&{type:"button"}},v)}}const ae=["neutral","primary","success","danger","warning"],Cn=["plain","outline","solid"],Sn="light",kn=()=>ae.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function We(e,t){const{bau:n,css:a,window:i}=e,{input:o}=n.tags,s=c=>{i.document.documentElement.setAttribute("data-theme",c),localStorage.setItem("theme",c)},r=()=>{try{return localStorage.getItem("theme")}catch{}},l=r();l?s(l):i.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):i.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Sn);const u=a`
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
  `;return function(...d){let[{color:h,variant:v="outline",size:f="md",...g},...p]=J(d);return o({required:"required",title:"Switch Theme",...g,class:R("theme-switch",h,v,f,u,t==null?void 0:t.class,g.class),type:"checkbox",checked:r()=="dark",onclick:y=>{s(y.target.checked?"dark":"light")}},...p)}}function An(e){const{tr:t,bau:n,css:a,config:i,states:o}=e,{i:s,header:r,h1:l,div:u,a:c,img:d,b:h,ul:v,li:f}=n.tags,{svg:g,path:p}=n.tagsNS("http://www.w3.org/2000/svg"),y=o.drawerOpen,E=te(e,{class:a`
      background: transparent;
    `}),T=We(e),k=()=>s(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},p({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),D=()=>u({class:a`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},k()),c({href:`${i.base}/`,class:a`
            text-decoration: none;
            font-size: x-large;
          `},h(t("Bau UI")))),B=()=>u({class:a`
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
        `},D(),B())}}function Tn({tr:e,bau:t,css:n}){const{footer:a,span:i,a:o,ul:s,li:r,p:l}=t.tags;return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},i("version: 0.41.0"))}}function St(e,t={}){return function({parent:a,animationHide:i,animationShow:o},s){s.style.animation=o;const r=()=>{s.removeEventListener("animationend",r),s.style.animation=""};return s.addEventListener("animationend",r),new MutationObserver((l,u)=>{l.filter(c=>c.removedNodes).forEach(c=>[...c.removedNodes].find(d=>{a.style.position="relative";const h=d.cloneNode(!0);return h.style.top=0,h.style.left=0,h.style.position="absolute",h.style.animation=i,c.previousSibling?c.previousSibling.after(h):c.nextSibling?c.nextSibling.before(h):c.target&&c.target.appendChild(h),h.addEventListener("animationend",()=>h.parentNode.removeChild(h)),u.disconnect(),!0}))}).observe(a,{childList:!0,subtree:!0}),s}}function _e(e,t){const{bau:n,css:a}=e,{ul:i}=n.tags,s=a`
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
  `;return function(...l){let[{color:u="neutral",variant:c="plain",size:d,...h},...v]=J(l);return i({...h,class:R("list",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const lt="0.3s",kt=({parent:e,grandParent:t})=>n=>{const{children:a,...i}=n,o=structuredClone(i);return o.children=a==null?void 0:a.map(kt({parent:n,grandParent:e})),e&&(e.parentTree=t),o.parentTree=e,o},At=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let a=0;a<t.children.length;a++){const i=At(e)(t.children[a]);if(i)return i}},Mn=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
          `,"data-buttonback":!0},"←"),k({variant:"plain",href:`${o}${W.href}`},W.name)),r=({data:{name:G,href:W},children:K=[]})=>k({href:`${o}${W}`,"data-ischild":K.length==0},G),l=({subTree:G})=>{var W;return i.location.pathname.replace(o,"")===((W=G==null?void 0:G.data)==null?void 0:W.href)},{renderHeader:u=s,renderMenuItem:c=r,isActive:d=l}=t,{ul:h,li:v,nav:f,div:g,header:p,a:y}=n.tags,E=St(),T=_e(e),k=te(e,{class:a`
      &.button {
        flex-grow: 1;
        justify-content: flex-start;
      }
    `}),{hideToLeft:D,hideToRight:B,showFromRight:N,showFromLeft:O}=Mn(e),_=a`
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
  `,z=({variant:G,color:W,size:K,onclickItem:w,onclickBack:S,currentTree:m,pathnameState:b})=>{const{children:x,parentTree:$,data:M}=m;return g({class:R("drillDownMenu",G,W,K)},$&&u({data:M,currentTree:m,onclickBack:S}),x&&T({class:R(G,W,K)},x.map(F=>v({class:()=>R(F.children&&"has-children",d({pathname:b.val,subTree:F})&&"active"),onclick:F.children&&w({currentTree:F})},c(F)))))},Z=({tree:G,pathname:W})=>{let K=kt({})(G),w=At(W)(K);return w||(console.log("drilldown no sub tree",W),w=K),w};return function(W){const{variant:K="plain",color:w="neutral",size:S="md",tree:m,pathnameState:b=n.state(i.location.pathname),...x}=W,$=({currentTree:H})=>j=>F(j,L,H,!0),M=({currentTree:H})=>j=>F(j,L,H.parentTree,!1),F=(H,j,X,ee)=>{j.firstChild.replaceChildren(E({parent:j,animationHide:`${ee?D:B} ${lt}`,animationShow:`${ee?N:O} ${lt}`},z({variant:K,color:w,size:S,currentTree:X,onclickItem:$,onclickBack:M,pathnameState:b})))},L=f({class:R(_,t==null?void 0:t.class,x.class)},()=>z({variant:K,color:w,size:S,currentTree:Z({tree:m,pathname:b.val}),onclickItem:$,onclickBack:M,pathnameState:b}));return L}}const In={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Tt(e){const{tr:t,bau:n,css:a,config:i,states:o,window:s}=e,{div:r,ul:l,li:u,nav:c,a:d,span:h}=n.tags;let v=!1;const f=Ve(e,{base:i.base});return function(){return r({bauMounted:({element:p})=>{s.innerWidth<=640&&(v=!0,o.drawerOpen.val=!1)},onclick:p=>{v&&!p.target.dataset.buttonback&&!p.target.parentElement.classList.contains("has-children")&&(o.drawerOpen.val=!1)},style:()=>o.drawerOpen.val?"display:block;":"display:none;",class:R(a`
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
          `)},f({tree:In,pathnameState:o.pathname}))}}const _n=e=>{const{bau:t,css:n,states:a}=e,{div:i}=t.tags,o=An(e),s=Tt(e),r=Tn(e);return function({componentState:u}){return i({class:n`
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
  `,r=({title:l,Content:u})=>a({className:"feature"},i(l),o(u()));return function({featuresContent:u}){return a({class:s},u.map(r))}}function Dn(e){const{bau:t,css:n,config:a}=e,{div:i,p:o,a:s}=t.tags,r=Nn(e),l=$n(e),u=te(e),c=n``,d=[{title:"UI components for the web",Content:()=>[o("Over 25 components such as button, input, tabs, autocomplete etc ..."),u({href:`${a.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[o("Each component has a combination of variant, color and size:"),o("3 variant: plain, outline and primary"),o("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[o("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),o("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[o("The component bundle size is about 8x smaller compared to popular React UI component library."),o("Faster download time for users."),o("Save in bandwith fees for the operator."),o("Suitable for low bandwith network and low cost device.")]}];return function({}){return i({class:c},r({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:d}))}}const On=()=>ae.map(e=>`
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
`);function Ee(e,t){const{bau:n,css:a}=e,{accordionDefs:i}=t,{div:o,ul:s,li:r,header:l,h3:u,button:c}=n.tags,d=n.state(""),h=g=>p=>{d.val==g?d.val="":d.val=g},v=({element:g,open:p})=>{const y=()=>{g.removeEventListener("transitionend",y)};function E(k){k.addEventListener("transitionend",y),window.requestAnimationFrame(()=>{k.style.height="0px"})}function T(k){k.addEventListener("transitionend",y),k.style.height=k.scrollHeight+"px"}g.scrollHeight!=0&&(p?T(g):E(g))},f=a`
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
    ${On()}
  `;return function(...p){let[{color:y,variant:E="outline",size:T="md",content:k,...D},...B]=J(p);const N=O=>{const{Header:_,Content:z,name:Z}=O;return r({class:R(y,E,T),onclick:h(Z)},u({class:()=>R(d.val==Z&&"active")},c({type:"button","aria-controls":`bau-${Z}`,"aria-expanded":({element:G})=>d.val==Z},_(O))),o({class:"content",role:"region",id:`bau-${Z}`,"data-state":({element:G})=>{const W=d.val==Z;return v({element:G,open:W}),W}},z(O)))};return o({class:R("accordion",f,t==null?void 0:t.class,D.class)},s(i.map(N)))}}function Rn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Mt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],a=typeof n;(a==="object"||a==="function")&&!Object.isFrozen(n)&&Mt(n)}),e}class ct{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function It(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const a in e)n[a]=e[a];return t.forEach(function(a){for(const i in a)n[i]=a[i]}),n}const Bn="</span>",dt=e=>!!e.scope,Ln=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((a,i)=>`${a}${"_".repeat(i+1)}`)].join(" ")}return`${t}${e}`};class jn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=It(t)}openNode(t){if(!dt(t))return;const n=Ln(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){dt(t)&&(this.buffer+=Bn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const ut=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Xe{constructor(){this.rootNode=ut(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=ut({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(a=>this._walk(t,a)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Xe._collapse(n)}))}}class Pn extends Xe{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const a=t.root;n&&(a.scope=`language:${n}`),this.add(a)}toHTML(){return new jn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function we(e){return e?typeof e=="string"?e:e.source:null}function _t(e){return he("(?=",e,")")}function Hn(e){return he("(?:",e,")*")}function zn(e){return he("(?:",e,")?")}function he(...e){return e.map(n=>we(n)).join("")}function Gn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ke(...e){return"("+(Gn(e).capture?"":"?:")+e.map(a=>we(a)).join("|")+")"}function Nt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Fn(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Un=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ze(e,{joinWith:t}){let n=0;return e.map(a=>{n+=1;const i=n;let o=we(a),s="";for(;o.length>0;){const r=Un.exec(o);if(!r){s+=o;break}s+=o.substring(0,r.index),o=o.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+i):(s+=r[0],r[0]==="("&&n++)}return s}).map(a=>`(${a})`).join(t)}const Wn=/\b\B/,$t="[a-zA-Z]\\w*",Ye="[a-zA-Z_]\\w*",Dt="\\b\\d+(\\.\\d+)?",Ot="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Rt="\\b(0b[01]+)",Vn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Xn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=he(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,a)=>{n.index!==0&&a.ignoreMatch()}},e)},ye={begin:"\\\\[\\s\\S]",relevance:0},Kn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ye]},Zn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ye]},Yn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ne=function(e,t,n={}){const a=ie({scope:"comment",begin:e,end:t,contains:[]},n);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=Ke("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:he(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},qn=Ne("//","$"),Jn=Ne("/\\*","\\*/"),Qn=Ne("#","$"),ea={scope:"number",begin:Dt,relevance:0},ta={scope:"number",begin:Ot,relevance:0},na={scope:"number",begin:Rt,relevance:0},aa={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[ye,{begin:/\[/,end:/\]/,relevance:0,contains:[ye]}]}]},oa={scope:"title",begin:$t,relevance:0},ra={scope:"title",begin:Ye,relevance:0},sa={begin:"\\.\\s*"+Ye,relevance:0},ia=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Te=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Wn,IDENT_RE:$t,UNDERSCORE_IDENT_RE:Ye,NUMBER_RE:Dt,C_NUMBER_RE:Ot,BINARY_NUMBER_RE:Rt,RE_STARTERS_RE:Vn,SHEBANG:Xn,BACKSLASH_ESCAPE:ye,APOS_STRING_MODE:Kn,QUOTE_STRING_MODE:Zn,PHRASAL_WORDS_MODE:Yn,COMMENT:Ne,C_LINE_COMMENT_MODE:qn,C_BLOCK_COMMENT_MODE:Jn,HASH_COMMENT_MODE:Qn,NUMBER_MODE:ea,C_NUMBER_MODE:ta,BINARY_NUMBER_MODE:na,REGEXP_MODE:aa,TITLE_MODE:oa,UNDERSCORE_TITLE_MODE:ra,METHOD_GUARD:sa,END_SAME_AS_BEGIN:ia});function la(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ca(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function da(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=la,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ua(e,t){Array.isArray(e.illegal)&&(e.illegal=Ke(...e.illegal))}function ha(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function ma(e,t){e.relevance===void 0&&(e.relevance=1)}const ga=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(a=>{delete e[a]}),e.keywords=n.keywords,e.begin=he(n.beforeMatch,_t(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},pa=["of","and","for","in","not","or","if","then","parent","list","value"],fa="keyword";function Bt(e,t,n=fa){const a=Object.create(null);return typeof e=="string"?i(n,e.split(" ")):Array.isArray(e)?i(n,e):Object.keys(e).forEach(function(o){Object.assign(a,Bt(e[o],t,o))}),a;function i(o,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const l=r.split("|");a[l[0]]=[o,ba(l[0],l[1])]})}}function ba(e,t){return t?Number(t):va(e)?0:1}function va(e){return pa.includes(e.toLowerCase())}const ht={},ue=e=>{console.error(e)},mt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},pe=(e,t)=>{ht[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ht[`${e}/${t}`]=!0)},Ie=new Error;function Lt(e,t,{key:n}){let a=0;const i=e[n],o={},s={};for(let r=1;r<=t.length;r++)s[r+a]=i[r],o[r+a]=!0,a+=Nt(t[r-1]);e[n]=s,e[n]._emit=o,e[n]._multi=!0}function wa(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ie;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Ie;Lt(e,e.begin,{key:"beginScope"}),e.begin=Ze(e.begin,{joinWith:""})}}function ya(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ie;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Ie;Lt(e,e.end,{key:"endScope"}),e.end=Ze(e.end,{joinWith:""})}}function Ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function xa(e){Ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),wa(e),ya(e)}function Ca(e){function t(s,r){return new RegExp(we(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=Nt(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=t(Ze(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const u=l.findIndex((d,h)=>h>0&&d!==void 0),c=this.matchIndexes[u];return l.splice(0,u),Object.assign(l,c)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new n;return this.rules.slice(r).forEach(([u,c])=>l.addRule(u,c)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let u=l.exec(r);if(this.resumingScanAtSamePosition()&&!(u&&u.index===this.lastIndex)){const c=this.getMatcher(0);c.lastIndex=this.lastIndex+1,u=c.exec(r)}return u&&(this.regexIndex+=u.position+1,this.regexIndex===this.count&&this.considerAll()),u}}function i(s){const r=new a;return s.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function o(s,r){const l=s;if(s.isCompiled)return l;[ca,ha,xa,ga].forEach(c=>c(s,r)),e.compilerExtensions.forEach(c=>c(s,r)),s.__beforeBegin=null,[da,ua,ma].forEach(c=>c(s,r)),s.isCompiled=!0;let u=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),u=s.keywords.$pattern,delete s.keywords.$pattern),u=u||/\w+/,s.keywords&&(s.keywords=Bt(s.keywords,e.case_insensitive)),l.keywordPatternRe=t(u,!0),r&&(s.begin||(s.begin=/\B|\b/),l.beginRe=t(l.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(l.endRe=t(l.end)),l.terminatorEnd=we(l.end)||"",s.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(l.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(c){return Sa(c==="self"?s:c)})),s.contains.forEach(function(c){o(c,l)}),s.starts&&o(s.starts,r),l.matcher=i(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),o(e)}function jt(e){return e?e.endsWithParent||jt(e.starts):!1}function Sa(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:jt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var ka="11.8.0";class Aa extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Pe=It,gt=ie,pt=Symbol("nomatch"),Ta=7,Pt=function(e){const t=Object.create(null),n=Object.create(null),a=[];let i=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Pn};function l(m){return r.noHighlightRe.test(m)}function u(m){let b=m.className+" ";b+=m.parentNode?m.parentNode.className:"";const x=r.languageDetectRe.exec(b);if(x){const $=_(x[1]);return $||(mt(o.replace("{}",x[1])),mt("Falling back to no-highlight mode for this block.",m)),$?x[1]:"no-highlight"}return b.split(/\s+/).find($=>l($)||_($))}function c(m,b,x){let $="",M="";typeof b=="object"?($=m,x=b.ignoreIllegals,M=b.language):(pe("10.7.0","highlight(lang, code, ...args) has been deprecated."),pe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),M=m,$=b),x===void 0&&(x=!0);const F={code:$,language:M};w("before:highlight",F);const L=F.result?F.result:d(F.language,F.code,x);return L.code=F.code,w("after:highlight",L),L}function d(m,b,x,$){const M=Object.create(null);function F(A,I){return A.keywords[I]}function L(){if(!P.keywords){V.addText(q);return}let A=0;P.keywordPatternRe.lastIndex=0;let I=P.keywordPatternRe.exec(q),U="";for(;I;){U+=q.substring(A,I.index);const Y=oe.case_insensitive?I[0].toLowerCase():I[0],ne=F(P,Y);if(ne){const[se,Qt]=ne;if(V.addText(U),U="",M[Y]=(M[Y]||0)+1,M[Y]<=Ta&&(ke+=Qt),se.startsWith("_"))U+=I[0];else{const en=oe.classNameAliases[se]||se;X(I[0],en)}}else U+=I[0];A=P.keywordPatternRe.lastIndex,I=P.keywordPatternRe.exec(q)}U+=q.substring(A),V.addText(U)}function H(){if(q==="")return;let A=null;if(typeof P.subLanguage=="string"){if(!t[P.subLanguage]){V.addText(q);return}A=d(P.subLanguage,q,!0,C[P.subLanguage]),C[P.subLanguage]=A._top}else A=v(q,P.subLanguage.length?P.subLanguage:null);P.relevance>0&&(ke+=A.relevance),V.__addSublanguage(A._emitter,A.language)}function j(){P.subLanguage!=null?H():L(),q=""}function X(A,I){A!==""&&(V.startScope(I),V.addText(A),V.endScope())}function ee(A,I){let U=1;const Y=I.length-1;for(;U<=Y;){if(!A._emit[U]){U++;continue}const ne=oe.classNameAliases[A[U]]||A[U],se=I[U];ne?X(se,ne):(q=se,L(),q=""),U++}}function re(A,I){return A.scope&&typeof A.scope=="string"&&V.openNode(oe.classNameAliases[A.scope]||A.scope),A.beginScope&&(A.beginScope._wrap?(X(q,oe.classNameAliases[A.beginScope._wrap]||A.beginScope._wrap),q=""):A.beginScope._multi&&(ee(A.beginScope,I),q="")),P=Object.create(A,{parent:{value:P}}),P}function me(A,I,U){let Y=Fn(A.endRe,U);if(Y){if(A["on:end"]){const ne=new ct(A);A["on:end"](I,ne),ne.isMatchIgnored&&(Y=!1)}if(Y){for(;A.endsParent&&A.parent;)A=A.parent;return A}}if(A.endsWithParent)return me(A.parent,I,U)}function $e(A){return P.matcher.regexIndex===0?(q+=A[0],1):(Be=!0,0)}function Ce(A){const I=A[0],U=A.rule,Y=new ct(U),ne=[U.__beforeBegin,U["on:begin"]];for(const se of ne)if(se&&(se(A,Y),Y.isMatchIgnored))return $e(I);return U.skip?q+=I:(U.excludeBegin&&(q+=I),j(),!U.returnBegin&&!U.excludeBegin&&(q=I)),re(U,A),U.returnBegin?0:I.length}function ot(A){const I=A[0],U=b.substring(A.index),Y=me(P,A,U);if(!Y)return pt;const ne=P;P.endScope&&P.endScope._wrap?(j(),X(I,P.endScope._wrap)):P.endScope&&P.endScope._multi?(j(),ee(P.endScope,A)):ne.skip?q+=I:(ne.returnEnd||ne.excludeEnd||(q+=I),j(),ne.excludeEnd&&(q=I));do P.scope&&V.closeNode(),!P.skip&&!P.subLanguage&&(ke+=P.relevance),P=P.parent;while(P!==Y.parent);return Y.starts&&re(Y.starts,A),ne.returnEnd?0:I.length}function De(){const A=[];for(let I=P;I!==oe;I=I.parent)I.scope&&A.unshift(I.scope);A.forEach(I=>V.openNode(I))}let ge={};function Se(A,I){const U=I&&I[0];if(q+=A,U==null)return j(),0;if(ge.type==="begin"&&I.type==="end"&&ge.index===I.index&&U===""){if(q+=b.slice(I.index,I.index+1),!i){const Y=new Error(`0 width match regex (${m})`);throw Y.languageName=m,Y.badRule=ge.rule,Y}return 1}if(ge=I,I.type==="begin")return Ce(I);if(I.type==="illegal"&&!x){const Y=new Error('Illegal lexeme "'+U+'" for mode "'+(P.scope||"<unnamed>")+'"');throw Y.mode=P,Y}else if(I.type==="end"){const Y=ot(I);if(Y!==pt)return Y}if(I.type==="illegal"&&U==="")return 1;if(Re>1e5&&Re>I.index*3)throw new Error("potential infinite loop, way more iterations than matches");return q+=U,U.length}const oe=_(m);if(!oe)throw ue(o.replace("{}",m)),new Error('Unknown language: "'+m+'"');const Oe=Ca(oe);let ve="",P=$||Oe;const C={},V=new r.__emitter(r);De();let q="",ke=0,ce=0,Re=0,Be=!1;try{if(oe.__emitTokens)oe.__emitTokens(b,V);else{for(P.matcher.considerAll();;){Re++,Be?Be=!1:P.matcher.considerAll(),P.matcher.lastIndex=ce;const A=P.matcher.exec(b);if(!A)break;const I=b.substring(ce,A.index),U=Se(I,A);ce=A.index+U}Se(b.substring(ce))}return V.finalize(),ve=V.toHTML(),{language:m,value:ve,relevance:ke,illegal:!1,_emitter:V,_top:P}}catch(A){if(A.message&&A.message.includes("Illegal"))return{language:m,value:Pe(b),illegal:!0,relevance:0,_illegalBy:{message:A.message,index:ce,context:b.slice(ce-100,ce+100),mode:A.mode,resultSoFar:ve},_emitter:V};if(i)return{language:m,value:Pe(b),illegal:!1,relevance:0,errorRaised:A,_emitter:V,_top:P};throw A}}function h(m){const b={value:Pe(m),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(m),b}function v(m,b){b=b||r.languages||Object.keys(t);const x=h(m),$=b.filter(_).filter(Z).map(j=>d(j,m,!1));$.unshift(x);const M=$.sort((j,X)=>{if(j.relevance!==X.relevance)return X.relevance-j.relevance;if(j.language&&X.language){if(_(j.language).supersetOf===X.language)return 1;if(_(X.language).supersetOf===j.language)return-1}return 0}),[F,L]=M,H=F;return H.secondBest=L,H}function f(m,b,x){const $=b&&n[b]||x;m.classList.add("hljs"),m.classList.add(`language-${$}`)}function g(m){let b=null;const x=u(m);if(l(x))return;if(w("before:highlightElement",{el:m,language:x}),m.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),r.throwUnescapedHTML))throw new Aa("One of your code blocks includes unescaped HTML.",m.innerHTML);b=m;const $=b.textContent,M=x?c($,{language:x,ignoreIllegals:!0}):v($);m.innerHTML=M.value,f(m,x,M.language),m.result={language:M.language,re:M.relevance,relevance:M.relevance},M.secondBest&&(m.secondBest={language:M.secondBest.language,relevance:M.secondBest.relevance}),w("after:highlightElement",{el:m,result:M,text:$})}function p(m){r=gt(r,m)}const y=()=>{k(),pe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){k(),pe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let T=!1;function k(){if(document.readyState==="loading"){T=!0;return}document.querySelectorAll(r.cssSelector).forEach(g)}function D(){T&&k()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",D,!1);function B(m,b){let x=null;try{x=b(e)}catch($){if(ue("Language definition for '{}' could not be registered.".replace("{}",m)),i)ue($);else throw $;x=s}x.name||(x.name=m),t[m]=x,x.rawDefinition=b.bind(null,e),x.aliases&&z(x.aliases,{languageName:m})}function N(m){delete t[m];for(const b of Object.keys(n))n[b]===m&&delete n[b]}function O(){return Object.keys(t)}function _(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function z(m,{languageName:b}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=b})}function Z(m){const b=_(m);return b&&!b.disableAutodetect}function G(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=b=>{m["before:highlightBlock"](Object.assign({block:b.el},b))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=b=>{m["after:highlightBlock"](Object.assign({block:b.el},b))})}function W(m){G(m),a.push(m)}function K(m){const b=a.indexOf(m);b!==-1&&a.splice(b,1)}function w(m,b){const x=m;a.forEach(function($){$[x]&&$[x](b)})}function S(m){return pe("10.7.0","highlightBlock will be removed entirely in v12.0"),pe("10.7.0","Please use highlightElement now."),g(m)}Object.assign(e,{highlight:c,highlightAuto:v,highlightAll:k,highlightElement:g,highlightBlock:S,configure:p,initHighlighting:y,initHighlightingOnLoad:E,registerLanguage:B,unregisterLanguage:N,listLanguages:O,getLanguage:_,registerAliases:z,autoDetection:Z,inherit:gt,addPlugin:W,removePlugin:K}),e.debugMode=function(){i=!1},e.safeMode=function(){i=!0},e.versionString=ka,e.regex={concat:he,lookahead:_t,either:Ke,optional:zn,anyNumberOfTimes:Hn};for(const m in Te)typeof Te[m]=="object"&&Mt(Te[m]);return Object.assign(e,Te),e},be=Pt({});be.newInstance=()=>Pt({});var Ma=be;be.HighlightJS=be;be.default=be;const ft=Rn(Ma),bt="[A-Za-z$_][0-9A-Za-z$_]*",Ia=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],_a=["true","false","null","undefined","NaN","Infinity"],Ht=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],zt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Gt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Na=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],$a=[].concat(Gt,Ht,zt);function Da(e){const t=e.regex,n=(b,{after:x})=>{const $="</"+b[0].slice(1);return b.input.indexOf($,x)!==-1},a=bt,i={begin:"<>",end:"</>"},o=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,x)=>{const $=b[0].length+b.index,M=b.input[$];if(M==="<"||M===","){x.ignoreMatch();return}M===">"&&(n(b,{after:$})||x.ignoreMatch());let F;const L=b.input.substring($);if(F=L.match(/^\s*=/)){x.ignoreMatch();return}if((F=L.match(/^\s+extends\s+/))&&F.index===0){x.ignoreMatch();return}}},r={$pattern:bt,keyword:Ia,literal:_a,built_in:$a,"variable.language":Na},l="[0-9](_?[0-9])*",u=`\\.(${l})`,c="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${c})((${u})|\\.)?|(${u}))[eE][+-]?(${l})\\b`},{begin:`\\b(${c})\\b((${u})\\b|\\.)?|(${u})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},h={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"xml"}},f={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,h],subLanguage:"graphql"}},p={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,h]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:a+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,f,g,p,{match:/\$\d+/},d];h.contains=T.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(T)});const k=[].concat(E,h.contains),D=k.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(k)}]),B={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:D},N={variants:[{match:[/class/,/\s+/,a,/\s+/,/extends/,/\s+/,t.concat(a,"(",t.concat(/\./,a),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,a],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ht,...zt]}},_={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},z={variants:[{match:[/function/,/\s+/,a,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[B],illegal:/%/},Z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function G(b){return t.concat("(?!",b.join("|"),")")}const W={match:t.concat(/\b/,G([...Gt,"super","import"]),a,t.lookahead(/\(/)),className:"title.function",relevance:0},K={begin:t.concat(/\./,t.lookahead(t.concat(a,/(?![0-9A-Za-z$_(])/))),end:a,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},w={match:[/get|set/,/\s+/,a,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},B]},S="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,a,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(S)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[B]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:D,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),_,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,f,g,p,E,{match:/\$\d+/},d,O,{className:"attr",begin:a+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:S,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:D}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:i.begin,end:i.end},{match:o},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},z,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[B,e.inherit(e.TITLE_MODE,{begin:a,className:"title.function"})]},{match:/\.\.\./,relevance:0},K,{match:"\\$"+a,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[B]},W,Z,N,w,{match:/\$[(.]/}]}}const Q=e=>{const{bau:t,css:n}=e,{div:a,table:i,tbody:o,tr:s,td:r,thead:l,th:u}=t.tags,c=["sm","md","lg"];return function({Item:h,name:v}){return a({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},i(l(s(u(v??"Variant/Color"),ae.map(f=>u(f)))),o(Cn.map(f=>s(u(f),ae.map((g,p)=>r(h({color:g,variant:f,size:c[p%3]},{index:p}))))))))}},qe=e=>{const{bau:t,css:n}=e,{article:a,section:i,h1:o,p:s,h2:r,h3:l,pre:u,div:c}=t.tags;ft.registerLanguage("javascript",Da);const d=Q(e),h=({text:v})=>u({bauCreated:({element:f})=>{f.innerHTML=ft.highlight(v,{language:"js"}).value}});return function(f){return a({class:n``},o(f.title),s(f.description),r("Gallery"),d({Item:f.gridItem(e)}),r("Usage"),l("Import"),h({text:f.importStatement}),r("Examples"),f.examples.map(g=>i(o(g.title),s(g.description),c(g.createComponent(e)),h({text:g.code}))))}},Oa=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return Ee(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))}]})()},Ra=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ba=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))}]},La=e=>{const{css:t}=e,n=Ba(e);return Ee(e,{accordionDefs:n})({color:"warning",class:t`
      &.accordion {
        & ul {
          & li {
            width: fit-content;
          }
        }
      }
    `})},ja=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Pa=e=>{const{bau:t,css:n}=e,{div:a,p:i}=t.tags;return Ee(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(i("Item 2 Content"))}]})({color:"success",variant:"outline",class:n`
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
    `})},Ha=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,za=e=>{const{bau:t}=e,{div:n,p:a}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(a("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>n(a("Item 3 content"))}]},Ga={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ra,createComponent:Oa},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:ja,createComponent:La},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ha,createComponent:Pa}],gridItem:e=>{const t=za(e),n=Ee(e,{accordionDefs:t});return a=>n({...a})}},Fa=e=>{const t=qe(e);return()=>t(Ga)},Ua={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Wa=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Va=()=>ae.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function xe(e,t){const{bau:n,css:a,createGlobalStyles:i}=e,{div:o,i:s}=n.tags;Wa({css:a,createGlobalStyles:i});const r=a`
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
    ${Va()}
  `,l=te(e),u=({onclick:c})=>l({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(d,...h){const{variant:v="outline",color:f="neutral",size:g="md",onRemove:p,...y}=d;return o({...y,class:R(`alert-${v}`,v,f,g,r,t==null?void 0:t.class,d.class,"alert"),role:"alert"},s({class:"icon"},Ua[f]),o({class:"content"},...h),p&&u({onclick:p}))}}const Xa=e=>{const{bau:t}=e,{h4:n,p:a}=t.tags;return xe(e)({color:"danger"},n("Something went wrong"),a("Error code ",404),a("Status ","Not Found"))},Ka=`import alert from "@grucloud/bau-ui/alert";
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
`,Za=e=>{const{css:t}=e;return xe(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `})({color:"warning"},"Your coffee supply is getting low.")},Ya=`import alert from "@grucloud/bau-ui/alert";
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
`,qa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Ka,createComponent:Xa},{title:"Custom Alert ",description:"A custom alert.",code:Ya,createComponent:Za}],gridItem:e=>{const t=xe(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)}},Ja=e=>{const t=qe(e);return()=>t(qa)},Qa=(e,t={})=>{const{bau:n,css:a,keyframes:i}=e,{limit:o=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,l=n.state([]),u={inserting:i`
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
    `},d=({id:h,status:v})=>{const f=l.val.findIndex(g=>g.id===h);f!=-1&&(l.val[f].status=v)};return function(v={},...f){const g=({id:E})=>{d({id:E,status:"removing"});const T=l.val.findIndex(k=>k.id===E);T!=-1&&l.val.splice(T,1)},p=({Component:E})=>{const T={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};l.val.length>=o&&g({id:l.val[0].id}),l.val.push(T),setTimeout(()=>g(T),s)},y=E=>r({class:c.item,onclick:()=>g(E)},E.Component());return document.addEventListener("alert.add",E=>p(E.detail)),document.addEventListener("alert.remove",E=>g(E.detail)),r({class:R(c.stack,t==null?void 0:t.class,v.class)},n.loop(l,r(),y))}},eo=e=>{const{tr:t,bau:n}=e,{section:a,h1:i}=n.tags,o=Qa(e,{deleteAfterDuration:2e4}),s=te(e),r=xe(e);return function(){return a({id:"alert-stack"},o(),i("Alert stack"),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},to=({keyframes:e})=>({hideRight:e`
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
 `}),no=e=>{const{bau:t}=e,{section:n,div:a,h1:i}=t.tags,o=St(),s=te(e),r=to(e);return function(){const l=t.state(!0),u=a(),c=d=>{u.replaceChildren(o({parent:u,animationHide:`${r.hideRight} 0.5s`,animationShow:`${r.showRight} 0.5s`},a(d.val?"Ciao":"")))};return c(l),n({id:"animate"},a(i("Test Animate"),a(s({onclick:()=>{l.val=!l.val,c(l)}},()=>l.val?"Hide":"Show")),u))}};function Ft(e,t){const{bau:n,css:a}=e,{span:i,img:o}=n.tags,s=n.state(!0),r=n.state(!1),l=()=>s.val=!1,u=d=>{s.val=!1,r.val=!0},c=a`
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
  `;return function(...h){let[{color:v,variant:f="outline",size:g="md",width:p=30,height:y=30,...E},...T]=J(h);return i({class:R(c,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",o({width:p,height:y,onload:l,onerror:u,class:R(v,f,g,c,t==null?void 0:t.class,E.class),...E}))}}const ao=e=>{const{tr:t,bau:n,css:a,config:i}=e,{section:o,h2:s,h3:r}=n.tags,l=a`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,u=Q(e),c=Ft(e,{class:a`
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
  `;return function(...l){let[{contentEl:u,triggerEl:c,onClose:d,...h},...v]=J(l);const f=y=>{p.style.opacity=1,p.showModal();const E=c.getBoundingClientRect(),T=p.getBoundingClientRect();E.x<i.innerWidth/2?p.style.left=E.left+"px":p.style.left=E.right-T.width+"px",E.y<i.innerHeight/2?p.style.top=E.top+E.height+"px":p.style.top=E.top-T.height+"px"},g=y=>{const E=()=>{p.close(),p.removeEventListener("transitionend",E)};p.addEventListener("transitionend",E),p.style.opacity=0},p=o({role:"presentation",class:R("popover",s,t==null?void 0:t.class,h==null?void 0:h.class),onclick:y=>y.target===p&&(g(),d==null?void 0:d.call())},u);return p.closeDialog=g,p.openDialog=f,p}}const oo=()=>ae.map(e=>`
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
    ${oo()}
  `;return function(r){const{size:l="md",variant:u="outline",color:c="neutral",name:d,id:h,disabled:v,...f}=r;return i({...f,class:R("input",l,c,u,o,t==null?void 0:t.class,f.class)})}}const ro=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Ut(e,t){const{bau:n,css:a}=e,{div:i,li:o,ul:s}=n.tags,r=Je(e),l=te(e),u=Qe(e),c=_e(e),d=a`
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

    ${ro()}
  `,h=n.state(""),v=n.state(""),f=n.state(!1),g=n.state(0),p=()=>{f.val=!1};return function(...E){let[{variant:T="outline",color:k,size:D="md",id:B,label:N,placeholder:O,Option:_,options:z,getOptionLabel:Z=({label:j})=>j,...G},...W]=J(E);const K=n.state(z),w=()=>{H.openDialog(),f.val=!0,v.val="",K.val=z},S=()=>{H.closeDialog(),f.val=!1,v.val=""},m=j=>{const{value:X}=j.target;v.val=X,X?K.val=z.filter(ee=>Z(ee).match(new RegExp(`${X}`,"i"))):K.val=z},b=j=>{f.val?S():w()},x=({option:j,index:X})=>ee=>{h.val=Z(j),g.val=X,S()},$=j=>{switch(console.log("onkeydown",j.key,g.val),j.key){case"Escape":S();break;case"ArrowDown":g.val<K.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=K.val.length-1:g.val--;break;case"Enter":h.val=Z(K.val[g.val]),v.val="",S();break}},M=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":f,"aria-label":N,onclick:b,variant:T,color:k,size:D},()=>!h.val&&N,h),F=u({id:B,value:v,placeholder:O,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":f,oninput:m,onkeydown:$,variant:T,color:k,size:D}),H=r({id:B,triggerEl:M,contentEl:(()=>i({class:R(T,k,D,"content")},F,()=>c({class:R(T,k,D)},K.val.map((j,X)=>o({class:()=>R(g.val==X&&"active"),onclick:x({option:j,index:X})},_(j))))))(),onClose:p});return i({...G,class:R("autocomplete",d,t==null?void 0:t.class,G==null?void 0:G.class)},M,H)}}const so=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,span:l}=n.tags,u=(...f)=>o({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),c=Q(e),d=Ut(e),h=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],v=f=>o({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(f.label),l(f.code));return()=>i({id:"autocomplete",class:a``},r(t("Autocomplete")),s("Basic Autocomplete"),u(d({options:h,Option:v,getOptionLabel:({label:f})=>f,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),c({Item:f=>d({...f,options:h,Option:v,getOptionLabel:({label:g})=>g,label:"Country",placeholder:"Search countries",id:"country"})}))};function He(e,t){const{bau:n,css:a}=e,{span:i}=n.tags,o=a`
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
  `;return function(...r){let[{color:l,variant:u="outline",size:c="md",content:d,...h},...v]=J(r);return i({...h,class:R("badge",o,t==null?void 0:t.class,h==null?void 0:h.class)},i({class:R(l,u,c)},d),...v)}}const io=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:o,h2:s}=t.tags,r=(...d)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...d),l=Q(e),u=He(e),c=He(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>a({id:"badge"},s("Badge"),o("Basic Badge"),r(u({content:"10"},"☏")),o("Badges Table"),l({Item:(d,{index:h})=>u({...d,content:`${h*100}`},"☏")}),o("Badge custom"),r(c({content:"1"},"☏")))};function Wt(e,t){const{bau:n,css:a}=e,{ul:i,li:o,a:s,span:r}=n.tags,l=te(e),u=a`
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
  `;return function(...d){let[{color:h,variant:v="outline",size:f="md",items:g,...p},...y]=J(d);return i({...p,class:R(u,t==null?void 0:t.class,p==null?void 0:p.class)},g.map(({href:E,name:T})=>o((E?l:r)({href:E,color:h,variant:v,size:f,class:R(h,v,f)},T))))}}const lo=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:o}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},r=Q(e),l=Wt(e);return()=>a({id:"breadcrumbs"},i(t("Breadcrumbs")),o("Bacis Breadcrumb"),l(s),o("Breadcrumbs Table"),r({Item:u=>l({...u,...s})}))},co=e=>{const{bau:t,css:n}=e,{section:a,p:i,h3:o}=t.tags,s=Q(e),r=te(e);return()=>a({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},o("Button Examples"),s({Item:l=>r({...l},`${l.variant} ${l.color} ${l.size}`)}),o("Full With"),i(r({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),o("Icon"),i(r({"aria-label":"Close"},"✖"),r({},"⟪"),r({},"⟨"),r({},"⟩"),r({},"⟫")))},uo=()=>ae.map(e=>`
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
    ${uo()}
  `;return function(...r){let[{variant:l="outline",size:u="md",color:c,...d},...h]=J(r);return i({...d,class:R("button-group",l,c,u,o,t==null?void 0:t.class,d==null?void 0:d.class)},...h)}}const ho=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:o}=n.tags,s=Q(e),r=te(e),l=et(e),u=["ONE","TWO","THREE"];return()=>a({id:"button-group"},i(t("Button Group Examples")),o("Outline"),l({color:"primary",variant:"solid"},u.map(c=>r({color:"primary",variant:"solid"},c))),o("Button Group Table"),s({Item:c=>l({...c},u.map(d=>r(c,d)))}))};function ze(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,s=a`
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
  `;return function(...l){let[{color:u="neutral",variant:c="plain",size:d,...h},...v]=J(l);return i({...h,type:"date",class:R("calendar",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const mo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,label:l}=n.tags,u=Q(e),c=(...f)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),d=n.state("2023-08-08"),h=ze(e),v=ze(e,{class:a`
      background-color: lightseagreen !important;
    `});return()=>i({id:"calendar"},r(t("Calendar")),o("Date: ",d),s("Basic Calendar"),c(l({for:"start"},"Start date:",h({id:"start",value:d.val,oninput:f=>{d.val=f.target.value}}))),s("Calendar min and max"),c(l("End date:",h({min:"2023-01-01",max:"2023-12-31",value:d.val,oninput:f=>{d.val=f.target.value}}))),s("Calendar custom"),c(v({})),s("Calendar Table"),u({Item:f=>h({...f})}))};function Vt(e,t){const{bau:n,css:a}=e,{span:i}=n.tags,o=a`
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
  `;return function(...r){let[{size:l="md",variant:u="outline",color:c="neutral",onclick:d,...h},...v]=J(r);return i({...h,onclick:d,class:R("chip",o,l,u,c,d&&"clickable",t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const go=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r}=n.tags,l=Q(e),u=(...d)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...d),c=Vt(e);return()=>i({id:"chip"},r(t("Chip")),s("Chip Default"),u(c("My Chip")),s("Chip Clickable"),u(c({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),l({Item:d=>c({...d},`Chip ${d.color}`)}))};function Xt(e,t={}){const{bau:n,css:a}=e,{input:i}=n.tags,o=a`
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
  `;return function(...r){let[{color:l,variant:u="outline",size:c="md",...d},...h]=J(r);return i({type:"checkbox",required:"required",...d,class:R(o,l,u,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const po=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,label:s,h2:r,form:l}=n.tags,u=Q(e),c=Xt(e),d=n.state(!1),h=n.state(!1),v=g=>p=>{g.val=!!p.target.checked},f=(...g)=>o({class:a`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...g);return()=>i({id:"checkbox"},l(r(t("Checkbox Examples")),f(c({id:"myCheckbox",name:"myCheckbox",checked:d,onchange:v(d)}),s({for:"myCheckbox"},"My Checkbox")),f(c({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:h,onchange:v(h)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),r(t("Checkbox Table")),u({Item:(g,{index:p})=>c({id:`myCheckbox-${p}`,name:`myCheckbox-${p}`,...g})})))};function fo(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,o=a`
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
  `;return function(...r){let[{color:l,variant:u="outline",size:c,openState:d,...h},...v]=J(r);return i({class:R(o,t==null?void 0:t.class,h.class)},i({class:()=>R("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),i({class:()=>R("content",d.val&&"content-open")},v))}}const bo=e=>{const{tr:t,bau:n}=e,{section:a,h2:i}=n.tags,o=n.state(!1),s=fo(e),r=te(e),l=Tt(e);return()=>a({id:"drawer"},i(t("Drawer")),r({onclick:()=>{o.val=!o.val}},"OPEN DRAWER"),s({openState:o},l()))},vo=e=>{const{tr:t,bau:n,window:a,config:i}=e,{section:o,h2:s,h3:r}=n.tags,l=n.state(a.location.pathname.replace(i.base,"")),u=Q(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},d=Ve(e,{base:i.base+"/components/drillDownMenu"});return()=>o({id:"drillDownMenu"},s(t("Drill Down Menu")),d({tree:c,pathnameState:l}),r("Drill Down Table"),u({Item:h=>d({tree:c,...h})}))};function Kt(e,t){const{bau:n,css:a}=e,{div:i,span:o,label:s,input:r}=n.tags,l={base:a`
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
    `};return function(c,...d){const{variant:h="outline",color:v="neutral",size:f="md",Component:g,disabled:p,...y}=c;return i({class:R(l.base,p&&l.disabled,t==null?void 0:t.class,c.class)},s({class:R(h,v,f)},g({disabled:p}),r({type:"file",disabled:p,...y})),o({class:"filename-display"}))}}const wo=e=>{const{tr:t,bau:n,css:a}=e,{svg:i,use:o}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:r,h3:l,h2:u,span:c}=n.tags,d=Q(e),h=n.state("No file selected"),v=Kt(e),f=p=>{const y=p.target.files[0];y?h.val=y.name:h.val="No file selected"},g=({disabled:p})=>r({class:R(a`
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
            `)},i({width:100,height:100,fill:"currentColor"},o({href:"uploadIcon.svg#Capa_1"})),c(t("Choose a file to upload")));return()=>s({id:"fileInput"},u(t("FileInput Examples")),l("File Input"),v({Component:g,name:"file",accept:"text/*",onchange:f}),r("File selected: ",h),l("File Input disabled"),v({Component:g,name:"file",accept:"text/*",disabled:!0,onchange:f}),l("File Input Table"),d({Item:p=>v({Component:g,name:"file",accept:"text/*",onchange:f,...p})}))},yo=e=>{const{tr:t,bau:n}=e,{section:a,div:i,h3:o,h2:s}=n.tags,r=Q(e),l=Qe(e);return()=>a({id:"input"},s(t("Input Examples")),o("Standard"),i(l({id:"my-Input",name:"Label",label:"Label"})),o("Disabled"),i(l({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),l({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),o("Input with error"),i(l({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),o("Input Table"),r({Item:u=>l({name:"my-input",id:"my-input-with",placeholder:"Enter text",...u})}))};function Zt(e,t){const{bau:n,css:a}=e,{dialog:i}=n.tags,s=a`
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
  `;return function(...l){let[{color:u="neutral",variant:c="outline",size:d="md",...h},...v]=J(l);return i({class:R("modal",s,u,c,d,t==null?void 0:t.class,h==null?void 0:h.class)},...v)}}const Eo=e=>{const{tr:t,bau:n}=e,{section:a,main:i,h2:o,header:s,footer:r,p:l,div:u}=n.tags,c=Q(e),d=te(e),h=Zt(e),v=()=>i(Array(10).fill("").map((p,y)=>l(y+1,". Some text here"))),f=p=>{const y=h({id:"my-dialog",...p},s("Header"),v(),r(d({variant:"outline",color:p.color,onclick:()=>{y.close()}},"Cancel"),d({variant:"solid",color:p.color,onclick:()=>{y.close()}},"OK")));return y},g=f({color:"neutral"});return()=>a({id:"modal"},o(t("Modal Examples")),d({variant:"solid",color:"neutral",onclick:()=>{g.showModal()}},"OPEN MODAL"),g,o(t("Modal Table")),c({Item:p=>{const y=f(p);return u(d({...p,onclick:()=>{y.showModal()}},"OPEN MODAL"),y)}}))},xo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,h1:l,p:u}=n.tags,c=te(e),d=(...D)=>o({class:a`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...D),h=Je(e),f=(()=>c({onclick:()=>y.open?y.closeDialog():y.openDialog()},"Click"))(),g=()=>o({},l("My content"),u("My Content")),p=g(),y=h({id:"my-popover-left",triggerEl:f,contentEl:p}),E=c({onclick:()=>k.open?k.closeDialog():k.openDialog()},"Click"),T=g(),k=h({id:"my-popover-left",triggerEl:E,contentEl:T});return()=>i({id:"popover",class:a``},r(t("Popover")),s("Basic Popover"),d(o(f,y),o(E,k)))},Co=()=>ae.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Yt(e,t){const{bau:n,css:a}=e,{div:i,li:o}=n.tags,s=te(e),r=Je(e),l=_e(e),u=a`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Co()}
  `,c=n.state(""),d=n.state(!1),h=n.state(0);return function(...f){let[{color:g="neutral",variant:p="outline",size:y="md",id:E,label:T,Option:k,options:D,getOptionLabel:B=({label:b})=>b,...N},...O]=J(f);const _=()=>{m.openDialog(),m.focus(),d.val=!0},z=()=>{m.closeDialog(),d.val=!1},Z=()=>{d.val=!1},G=b=>{d.val?z():_()},W=({option:b,index:x})=>$=>{c.val=B(b),h.val=x,z()},K=b=>{switch(b.preventDefault(),b.key){case"Escape":z();break;case"ArrowDown":h.val<D.length-1?h.val++:h.val=0;break;case"ArrowUp":h.val<=0?h.val=D.length-1:h.val--;break;case"Enter":d.val?(c.val=B(D[h.val]),z()):_();break}},w=()=>l({tabindex:"0",class:R(g,p)},D.map((b,x)=>o({class:()=>R(h.val==x&&"active"),onclick:W({option:b,index:x})},k(b)))),S=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":T,onclick:G,color:g,variant:p,size:y},()=>!c.val&&T,c),m=r({id:E,triggerEl:S,contentEl:w(),onClose:Z});return i({...N,class:R("select",g,y,u,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:K},S,m)}}const So=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,span:l}=n.tags,u=(...f)=>o({class:a`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...f),c=Q(e),d=Yt(e),h=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],v=f=>o({class:a`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(f.label),l(f.code));return()=>i({id:"select",class:a``},r(t("Select")),s("Basic Select"),u(d({options:h,Option:v,getOptionLabel:({label:f})=>f,label:"Select a country..."})),r(t("Select Table")),c({Item:f=>o(d({...f,options:h,Option:v,getOptionLabel:({label:g})=>g,label:"Select a country..."}))}))};function Me(e,t){const{bau:n,css:a}=e,{input:i}=n.tags,s=a`
    ${(()=>ae.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...l){let[{color:u="neutral",variant:c="outline",size:d,...h},...v]=J(l);return i({...h,type:"range",class:R("slider",u,c,d,s,t==null?void 0:t.class,h.class)},...v)}}const ko=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,p:l,label:u,datalist:c,option:d,br:h}=n.tags,v=n.state(0),f=k=>{v.val=k==null?void 0:k.target.value},g=(...k)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...k),p=Q(e),y=Me(e),E=Me(e),T=Me(e);return()=>i({id:"slider"},r(t("Slider")),l("Slider value: ",v),s("Basic Slider"),g(y({oninput:f,name:"slider-simple"})),s(t("Slider Table")),p({Item:k=>y(k)}),s("Slider Min Max: -1000 1000"),g(E({oninput:f,min:-1e3,max:1e3})),s("Slider Step 20"),g(y({oninput:f,step:20,min:-100,max:100})),s("Slider Vertical"),g(o({class:a`
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
            `},["0","25","50","75","100"].map(k=>d({value:Number(k),label:k})))))},vt={sm:16,md:32,lg:64};function tt(e,t={}){const{bau:n,css:a}=e,{svg:i,animate:o,animateTransform:s,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:u="md",color:c="color-base",variant:d="outline",visibility:h=!0,...v}={}){return i({class:R(a`
            visibility: ${h?"visible":"hidden"};
            color: var(--color-${c});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:vt[u],height:vt[u],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},o({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Ao=e=>{const{tr:t,bau:n}=e,{section:a,h2:i,h3:o}=n.tags,s=Q(e),r=tt(e);return()=>a({id:"spinner"},i(t("Spinner Examples")),o(t("Spinner Table")),s({Item:l=>r(l)}))},To=()=>ae.map(e=>`
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
    ${To()}
  `;return function(...r){let[{color:l="neutral",variant:u="plain",size:c="md",...d},...h]=J(r);return i({...d,class:R("switch",o,l,u,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...h)}}const Mo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,form:o,label:s,div:r,h2:l}=n.tags,u=Q(e),c=qt(e);return()=>i({id:"switch"},l(t("Switch Examples")),o(r({class:a`
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
              `},s("off ",c({...d,id:`my-switch-example-off-${d.color}-${d.variant}`})),s("on ",c({...d,id:`my-switch-example-on-${d.color}-${d.variant}`,checked:!0})))}))},Io=()=>ae.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Ge(e,t){const{bau:n,css:a}=e,{tabDefs:i}=t,{div:o,ul:s,li:r}=n.tags,l=n.state(i),u=n.state(i[0]),c=h=>l.val.find(v=>v.name==h),d={base:a`
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
      ${Io()}
    `};return function(...v){let[{color:f,variant:g="plain",size:p,...y},...E]=J(v);const T=D=>{const{Header:B,disabled:N,name:O}=D;return r({class:()=>R(u.val.name==O&&"active",N&&"disabled"),onclick:_=>_.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},B(D))},k=o({class:R("tabs",d.base,g,p,f,t==null?void 0:t.class,y.class)},n.loop(l,s(),T),()=>u.val.Content?u.val.Content({}):"");return k.addEventListener("tab.select",D=>{var O,_;const{tabName:B}=D.detail,N=c(B);N&&((O=u.val.exit)==null||O.call(),u.val=N,(_=N.enter)==null||_.call())},!1),k.addEventListener("tab.add",D=>{var N;const{tab:B}=D.detail;(N=B.enter)==null||N.call(),l.val.push(B)},!1),k.addEventListener("tab.remove",D=>{var N;const B=l.val.findIndex(O=>O.name==D.detail.tabName);B>0&&((N=l.val[B].exit)==null||N.call(),l.val.splice(B,1))},!1),k}}const _o=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,p:l,i:u}=n.tags,c=Q(e),d=te(e),h=(...E)=>o({class:a`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...E),v=()=>({name:"New Tab",Header:({name:E})=>o(E),Content:()=>o("My Paragraph")}),g=Ge(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My tab Disabled"))}]}),y=Ge(e,{tabDefs:[{name:"Tab1",Header:()=>o(u({class:a`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>o({class:a`
              > button {
                margin: 10px;
              }
            `},d({onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:v()},bubbles:!0}))},"Add a new Tab"),d({accent:!0,onclick:E=>E.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),l("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My Content"))}]});return()=>i({id:"tabs"},r(t("Tabs")),s("Basic Tabs"),h(g({})),s("Full Witdth"),h(g({class:a`
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
  `;return function(...l){let[{...u},...c]=J(l);return o({...u,class:R("table-container",s,t==null?void 0:t.class,u==null?void 0:u.class)},...c)}}const No=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:o,h2:s,th:r,td:l,tr:u,table:c,thead:d,tbody:h,caption:v}=t.tags;function f(O,_,z,Z,G){return{name:O,calories:_,fat:z,carbs:Z,protein:G}}const g=[f("Frozen yoghurt",159,6,24,4),f("Ice cream sandwich",237,9,37,4.3),f("Eclair",262,16,24,6),f("Cupcake",305,3.7,67,4.3),f("Gingerbread",356,16,49,3.9)],p=(...O)=>i({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...O),y=({name:O,calories:_})=>u(l(O),l({class:n`
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
    `}),D=de(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),B=de(e,{class:n`
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
    `});return()=>a({id:"table"},s(u("Table")),o("Basic Table"),p(T(c(v("Basic Table"),E(),h(g.map(y))))),o("Dense Table"),p(k(c(v("Dense Table"),E(),h(g.map(y))))),o("Zebra Table"),p(D(c(v("Zebra Table"),E(),h(g.map(y))))),o("Caption Bottom"),p(B(c(v("Caption Bottom Table"),E(),h(g.map(y))))),o("Overflow Header"),p(N(c(v("Overflow Header"),E(),h(g.map(y))))))};function Jt(e,t){const{bau:n,css:a}=e,{div:i}=n.tags,o=et(e),s=te(e),r=tt(e),l=a`
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
  `,u=({label:f,icon:g,...p})=>s({"aria-label":f,title:f,...p},g),c=({count:f,totalCount:g,page:p,rowsPerPage:y})=>i({class:"pages-numbers"},Number(p-1)*Number(y)+(f>0?1:0),"-",Math.min(p*y,g)," of ",g),d=({count:f,page:g,rowsPerPage:p})=>i({class:"pages-numbers"},(g-1)*p+(f>0?1:0),"-",g*p),h=f=>f<=1,v=(f,g,p)=>f>=Math.ceil(g/p);return function(...g){let[{count:p=0,totalCount:y=0,page:E=1,rowsPerPage:T=50,onPageChange:k,isLoading:D=!1,disableFirst:B=()=>h(E),disablePrevious:N=()=>h(E),disableNext:O=()=>v(E,y,T),disableLast:_=()=>v(E,y,T),...z},...Z]=J(g);const G=Math.max(0,Math.ceil(y/T)),W=k({page:1}),K=k({page:E-1}),w=k({page:E+1}),S=k({page:G}),m=[{label:"First",icon:"⟪",onclick:W,disabled:B()},{label:"Previous",icon:"⟨",onclick:K,disabled:N()},{label:"Next",icon:"⟩",onclick:w,disabled:O()},{label:"Last",icon:"⟫",onclick:S,disabled:_()}];return i({...z,class:R("table-pagination",l,D&&"disabled",t==null?void 0:t.class,z==null?void 0:z.class)},r({class:"spinner",visibility:D,size:"md"}),y>0?c({count:p,totalCount:y,page:E,maxPages:G,rowsPerPage:T}):d({count:p,page:E,maxPages:G,rowsPerPage:T}),o({variant:"outline",color:"neutral"},m.map(b=>u({...b,variant:"outline",color:"neutral"}))))}}const $o=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),Do=e=>{const{bau:t,css:n}=e,{th:a,td:i,tr:o,table:s,thead:r,tbody:l}=t.tags,u=$o(45),c=({name:E,email:T})=>o(i(E),i(T)),d=()=>r(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Email")),h=Jt(e),v=de(e,{class:n`
      max-width: 650px;
    `}),f=t.state(u),g=t.state({count:u.length,totalCount:u.length,page:1,rowsPerPage:10}),p=t.derive(()=>f.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),y=({page:E})=>T=>{g.val.page=E};return()=>v(s(d(),()=>l(p.val.map(c))),()=>h({...g.val,onPageChange:y}))},Oo=e=>{const{bau:t,css:n}=e,{th:a,td:i,tr:o,table:s,thead:r,tbody:l,div:u}=t.tags,c=t.state(!1),d=t.state([]),h=t.state(""),v=t.derive(()=>d.val.length),f=t.state(1),g=t.state(10),p=t.derive(()=>d.val),y=_=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(_).toString()}`,E=({page:_})=>z=>{f.val=_,T(y({page:_,per_page:g.val}))};T(y({page:1,per_page:g.val}));async function T(_){try{c.val=!0;const z=await fetch(_,{});if(z.ok){const Z=await z.json();d.val=Z;return}throw z}catch(z){h.val=z.message}finally{c.val=!1}}const k=({name:_,description:z,stargazers_count:Z})=>o(i(_),i(z),i({class:n`
            text-align: right;
          `},Z)),D=()=>r(a({class:n`
            text-align: left;
          `},"Name"),a({class:n`
            text-align: left;
          `},"Description"),a({class:n`
            text-align: right;
          `},"Stars")),B=Jt(e),N=de(e,{class:n`
      min-width: 650px;
    `}),O=({message:_})=>u(_);return()=>N(()=>B({rowsPerPage:g.val,page:f.val,count:v.val,totalCount:-1,isLoading:c.val,onPageChange:E,disableNext:()=>!1}),s(D(),()=>h.val&&O({message:h.val}),()=>l(p.val.map(k))))},Ro=e=>{const{bau:t,css:n}=e,{section:a,div:i,h3:o,h2:s,tr:r}=t.tags,l=Do(e),u=Oo(e),c=(...d)=>i({class:n`
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
  `;return function(...l){let[{titleEl:u,side:c="bottom-start",color:d="neutral",variant:h="outline",size:v="md",...f},...g]=J(l);const p=o({class:R("container",...c.split("-"))},o({class:R("content",d,h,v),role:"tooltip"},u)),y=N=>`move-to-${N}`,E=(N,O,_)=>{if(N()){const z=y(O);p.classList.add(z),p.classList.add(O),p.classList.remove(_)}},T=(N,O)=>{const _=y(N);p.classList.contains(_)&&(p.classList.remove(_),p.classList.add(O),p.classList.remove(N))},k=N=>{const O=p.getBoundingClientRect();E(()=>O.x<0,"right","left"),E(()=>O.x+O.width>i.innerWidth,"left","right"),E(()=>O.y<0,"bottom","top"),E(()=>O.bottom>i.innerHeight,"top","bottom"),p.classList.add("visible")},D=N=>{p.classList.remove("visible"),T("right","left"),T("left","right"),T("bottom","top"),T("top","bottom")};return o({...f,class:R("tooltip",s,t==null?void 0:t.class,f==null?void 0:f.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",k),N.addEventListener("mouseout",D)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",k),N.removeEventListener("mouseout",D)}},...g,p)}}const Bo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h2:s,em:r,p:l}=n.tags,u=Q(e),c=te(e),d=Fe(e),h=Fe(e,{class:a`
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
    `}),v=()=>o({class:a`
          font-size: larger;
        `},l("A ",r("tooltip")," can be any component")),f=()=>[o({class:a`
          display: flex;
          justify-content: space-around;
        `},d({side:"top-start",titleEl:v()},c({},"top-start")),d({side:"top-centered",titleEl:v()},c({},"top-centered")),d({side:"top-end",titleEl:v()},c({},"top-end"))),o({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-start",titleEl:v()},c({},"left-start")),d({side:"right-start",titleEl:v()},c({},"right-start"))),o({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-centered",titleEl:v()},c({},"left-centered")),d({side:"right-centered",titleEl:v()},c({},"right-centered"))),o({class:a`
          display: flex;
          justify-content: space-between;
        `},d({side:"left-end",titleEl:v()},c({},"left end")),d({side:"right-end",titleEl:v()},c({},"right end"))),o({class:a`
          display: flex;
          justify-content: space-around;
        `},d({side:"bottom-start",titleEl:v()},c({},"bottom start")),d({side:"bottom-centered",titleEl:v()},c({},"bottom centered")),d({side:"bottom-end",titleEl:v()},c({},"bottom end")))];return()=>i({id:"tooltip"},s(t("Tooltip")),o({class:a`
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
          `},h({titleEl:v()},c({},"custom tooltip"))),s(t("Tooltip Table")),u({Item:g=>d({titleEl:v(),...g},c(g,`${g.color} ${g.variant}`))}))},Lo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,form:o,div:s,h2:r}=n.tags,l=Q(e),u=We(e);return()=>i({id:"theme-switch"},r(t("Theme Switch")),o(s({class:a`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},u({}))),r(t("Theme Switch Table")),l({Item:c=>u(c)}))},jo=({css:e,createGlobalStyles:t})=>(t`
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
    `});function nt(e,t){const{bau:n,css:a,createGlobalStyles:i,window:o}=e,{renderMenuItem:s}=t,{ul:r,li:l,nav:u,div:c}=n.tags,d=jo({css:a,createGlobalStyles:i}),h=({element:p,closeState:y})=>{p.scrollHeight!=0&&(y.val?v(p):f(p))};function v(p){p.style.height=p.scrollHeight+"px";const y=()=>{p.removeEventListener("transitionend",y)};p.addEventListener("transitionend",y),o.requestAnimationFrame(()=>{p.style.height="0px"})}function f(p){const y=()=>{p.removeEventListener("transitionend",y),p.style.height=null};p.addEventListener("transitionend",y),p.style.height=p.scrollHeight+"px"}const g=({depth:p=1,maxDepth:y,color:E,variant:T,size:k})=>D=>{const{children:B,expanded:N}=D,O=n.state(!N);return l({class:()=>R(B?O.val?d.collapsed:d.expanded:"")},c({class:a`
              cursor: pointer;
            `,onclick:_=>{B&&(O.val=!O.val)}},s(D.data)),B&&p<y&&r({class:R(E,k),bauMounted:({element:_})=>{O.val&&(_.style.height="0px")},"aria-expanded":({element:_})=>(h({element:_,closeState:O}),!O.val)},B.map(g({depth:p+1,maxDepth:y}))))};return function({tree:y,maxDepth:E=1/0,size:T="md",variant:k="plain",color:D="neutral",...B}){return u({class:R(d.nav,T,k,D,t==null?void 0:t.class,B.class)},y.children&&r(y.children.map(g({maxDepth:E,color:D,variant:k,size:T}))))}}const Po=e=>{const{bau:t}=e,{a:n}=t.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]};return nt(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)})({tree:a})},Ho=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,zo={title:"Tree View",package:"treeview",description:"A tree view displays tree data",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ho,createComponent:Po}],gridItem:e=>{const{bau:t}=e,{a:n}=t.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},o=nt(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>o({...s,tree:a})}},Go=e=>{const t=qe(e);return()=>t(zo)};function Fo(e,t={}){const{bau:n,css:a}=e,{div:i,span:o,pre:s,h3:r,h4:l}=n.tags;return function(c,...d){return i("Login")}}const Uo=e=>{const{tr:t,bau:n}=e,{section:a,div:i,h3:o,h2:s}=n.tags,r=Fo(e);return()=>a({id:"login"},s(t("Login Examples")),o("Basic"),i(r()))};function Wo(e){const{tr:t,bau:n,css:a}=e,{div:i,article:o,h1:s}=n.tags;return function(){return i({class:a`
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
          `},s(t("Pages Examples")),Uo(e)()))}}const wt=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Vo=e=>{const{tr:t,bau:n,css:a}=e,{section:i,div:o,h3:s,h2:r,li:l,span:u}=n.tags,c=Q(e),d=(...f)=>o({class:a`
          border: 1px dotted red;
          padding: 1rem;
        `},...f),h=_e(e),v=({code:f,label:g})=>l({class:a`
          display: flex;
          gap: 1rem;
        `},u(f),u(g));return()=>i({id:"list"},r(t("List")),s("List outline primary"),d(h({variant:"outline",color:"primary"},wt.map(v))),s("List Table"),c({Item:f=>h({...f},wt.map(v))}))},Xo=e=>{const{bau:t,css:n,config:a}=e,{section:i,div:o,h1:s,span:r,p:l,ul:u,li:c,a:d,main:h,header:v,footer:f,label:g}=t.tags,{svg:p,use:y}=t.tagsNS("http://www.w3.org/2000/svg"),E=Q(e),k=Ee(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>o(l("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(l("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>o(l("Item 3 content"))}]}),D=xe(e),B=Ut(e),N=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],O=C=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(C.label),r(C.code)),_=Ft(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),z=He(e),Z={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},G=Wt(e),W=te(e),K=et(e),w=ze(e),S=Xt(e),m=Vt(e),b={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},x=Ve(e,{base:a.base+"/components"}),$=({disabled:C})=>o({class:R(n`
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
            `)},p({width:100,height:100,fill:"currentColor"},y({href:"uploadIcon.svg#Capa_1"})),r("Choose a file to upload")),M=Kt(e),F=Qe(e),L=Zt(e),H=()=>h(Array(10).fill("").map((C,V)=>l(V+1,". Some text here"))),j=C=>{const V=L({id:"my-dialog",...C},v("Header"),H(),f(W({...C,variant:"outline",onclick:()=>{V.close()}},"Cancel"),W({...C,variant:"solid",onclick:()=>{V.close()}},"OK")));return V},X=Yt(e),ee=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],re=C=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(C.label),r(C.code)),me=Me(e),$e=tt(e),Ce=qt(e),De=Ge(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(l("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(l("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>o("Tab Disabled"),Content:()=>o(l("My tab Disabled"))}]}),ge=We(e),Se=()=>r("My tooltip"),oe=Fe(e),Oe={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},ve=nt(e,{renderMenuItem:({name:C,href:V})=>d({href:V,onclick:q=>{q.preventDefault()}},C)}),P=[{name:"Accordion",Item:C=>k({...C})},{name:"Alert",Item:C=>D({...C},`Alert ${C.color}`)},{name:"Autocomplete",Item:C=>B({...C,options:N,Option:O,getOptionLabel:({label:V})=>V,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:C=>_({...C,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(C,{index:V})=>z({...C,content:`${V*100}`},"☏")},{name:"Breadcrumbs",Item:C=>G({...C,...Z})},{name:"Button",Item:C=>W({...C},`${C.variant} ${C.color}`)},{name:"Button Group",Item:C=>K({...C},["ONE","TWO","THREE"].map(V=>W(C,V)))},{name:"Calendar",Item:C=>o({class:n`
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
            `},`${C.color} ${C.variant}`,S({id:`myCheckbox-gallery-${C.color}-${C.variant}`,name:`myCheckbox-gallery-${C.color}-${C.variant}`,...C}))},{name:"Chip",Item:C=>m({...C},`Chip ${C.color}`)},{name:"DrillDown Menu",Item:C=>x({tree:b,...C})},{name:"File Input",Item:C=>M({Component:$,name:"file",accept:"text/*",onchange,...C})},{name:"Input",Item:C=>F({name:"my-input",id:"my-input-with",placeholder:"Enter text",...C})},{name:"Modal",Item:C=>{const V=j(C);return o(W({...C,onclick:()=>{V.showModal()}},"OPEN MODAL"),V)}},{name:"Select",Item:C=>o(X({...C,options:ee,Option:re,getOptionLabel:({label:V})=>V,label:"Select a country..."}))},{name:"Slider",Item:C=>o({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},g(`${C.color} ${C.variant}`,me({...C,id:`my-slider-${C.color}-${C.variant}`})))},{name:"Spinner",Item:C=>$e(C)},{name:"Switch",Item:C=>o({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},g("off",Ce({...C,id:`mySwitch-off-${C.color}-${C.variant}`})),g("on",Ce({...C,id:`mySwitch-on-${C.color}-${C.variant}`,checked:!0})))},{name:"Tabs",Item:C=>De(C)},{name:"Theme Switch",Item:C=>ge(C)},{name:"Tooltip",Item:C=>oe({titleEl:Se(),...C},W(C,`${C.color} ${C.variant}`))},{name:"Tree View",Item:C=>ve({...C,tree:Oe})}];return()=>i(s("Bau Component Gallery"),l("This page displays the components with various colors and variants."),u({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},P.map(({name:C})=>c(W({color:"primary",variant:"solid",href:`#${C}`},C)))),P.map(C=>o({id:C.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},E(C))))},Ko=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Dn(e)})},{path:"components",action:()=>({title:"Component",component:Xo(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Fa(e)})},{path:"alert",action:()=>({title:"Alert",component:Ja(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:eo(e)})},{path:"animate",action:()=>({title:"Animate",component:no(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:so(e)})},{path:"avatar",action:()=>({title:"Avatar",component:ao(e)})},{path:"badge",action:()=>({title:"Badge",component:io(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:lo(e)})},{path:"button",action:()=>({title:"Button",component:co(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:ho(e)})},{path:"calendar",action:()=>({title:"Calendar",component:mo(e)})},{path:"chip",action:()=>({title:"Chip",component:go(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:po(e)})},{path:"drawer",action:()=>({title:"Drawer",component:bo(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:vo(e)})},{path:"fileInput",action:()=>({title:"File Input",component:wo(e)})},{path:"input",action:()=>({title:"Input",component:yo(e)})},{path:"list",action:()=>({title:"List",component:Vo(e)})},{path:"modal",action:()=>({title:"Modal",component:Eo(e)})},{path:"popover",action:()=>({title:"Popover",component:xo(e)})},{path:"select",action:()=>({title:"Select",component:So(e)})},{path:"slider",action:()=>({title:"Slider",component:ko(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Ao(e)})},{path:"switch",action:()=>({title:"Switch",component:Mo(e)})},{path:"table",action:()=>({title:"Table",component:No(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ro(e)})},{path:"tabs",action:()=>({title:"Tabs",component:_o(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Bo(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Lo(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Go(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Wo(e)})}],Zo=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Yo=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:a,bau:i,states:o}=e,s=i.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:u})=>{const c=a.location.pathname.replace(n,""),{title:d,component:h,Layout:v=t}=u.resolve({pathname:c});o.pathname.val=c,s.val=h,document.title=`${d}`}},qo=e=>{const{createGlobalStyles:t}=e;mn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  `},Jo=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${Ct({dark:!0})}
}
  `};gn();const at={title:"Bau",base:"/bau/bau-ui"},le=xn({config:at}),{bau:yt}=le;le.states={pathname:yt.state(window.location.pathname.replace(at.base,"")),drawerOpen:yt.state(!0)};qo(le);Jo(le);on({routes:Ko({context:le}),onLocationChange:Yo({context:le,LayoutDefault:_n(le),config:at}),notFoundRoute:Zo(le)});
