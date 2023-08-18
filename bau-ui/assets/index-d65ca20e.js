(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const rn=(e,t)=>({...e,paths:[...t,e.path]}),It=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=rn(o,e);return n?[a,...It({paths:[...e,o.path],routes:n})]:a}),sn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},cn=({routes:e=[],notFoundRoute:t})=>{const n=It({routes:e}).map(o=>({...o,regex:sn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function ln({routes:e,notFoundRoute:t,onLocationChange:n}){const o=cn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,r,s)=>{a.apply(r,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:r}=a,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const $t=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],un=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],dn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ht=e=>`var(--color-${e})`,pn=e=>`var(--color-${e}-lightest)`,mn=()=>$t.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ht(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${pn(e)};
}
.solid.${e} {
  background-color: ${ht(e)};
}
`).join(`
`),bn=e=>100-e*10,hn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${bn(t)}%);`).join(`
`),Nt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),gn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...un.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...dn.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function fn({createGlobalStyles:e},{colorPalette:t=$t}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>gn([n,o])).join(`
`)}
      ${hn()}
      ${Nt({})}
      ${mn()}
      
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
  `}function vn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ke=e=>Object.prototype.toString.call(e??0).slice(8,-1),xn=e=>Ke(e)=="Object",gt=e=>Ke(e)=="Function",Ve=e=>["Object","Array"].includes(Ke(e)),ft=Object.getPrototypeOf,Xe=e=>ge(e)?e.val:e,ge=e=>e==null?void 0:e.__isState,wn=["splice","push","pop","shift","unshift","sort","reverse"],Ie=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const q=e=>!ge(e[0])&&xn(e[0])?e:[{},...e];function yn(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,r=new Set,s=!1,i,c=v=>n.createElement(v),l=(v,E,p)=>{let h=i;i=E;let w=v(p);return i=h,w},m=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(v=>{v.bindings=v.bindings.filter(E=>{var p;return(p=E.element)==null?void 0:p.isConnected}),!v.bindings.length&&!v.computed&&a.delete(v)}),o=void 0}))},d=(v,E,p,h,w,I)=>{var T;if(s){r.add(v);return}for(let H of v.bindings){let{deps:R,element:z,renderInferred:j,render:F,renderItem:Q}=H;if(Q&&E)(T=y(z,h,(...re)=>g(Q(...re)),p,w,I)[E])==null||T.call();else{let re=j?j({element:z}):F({element:z,renderItem:Q})(...R.map(Xe));re!==z&&z.replaceWith(H.element=g(re))}}A(v),m()},u=(v,E,p=[])=>({get(h,w,I){var T;if(i==null||i.add(v),w==="_isProxy")return!0;if(!((T=h[w])!=null&&T._isProxy)&&!ge(h[w])&&Ve(h[w]))h[w]=new Proxy(h[w],u(v,E,[...p,w]));else if(wn.includes(w)){let H=h[w];return(...R)=>{let z=H.apply(h,R);return d(v,w,z,R,E,p),z}}return Reflect.get(h,w,I)},set(h,w,I,T){let H=Reflect.set(h,w,I,T);return d(v,"setItem",H,{prop:w,value:I},E,[...p,w]),H}}),x=(v,E)=>new Proxy(E,u(v,E)),y=(v,E,p,h,w,I)=>{let T=()=>v.replaceChildren(...Ie(h,p)),H=R=>v[R]&&v.removeChild(v[R]);return{assign:T,sort:T,reverse:T,setItem:()=>{var z;let R=I[0];(z=v.children[R])==null||z.replaceWith(p(w[R],R))},push:()=>v.append(...Ie(E,(R,z)=>p(R,w.length+z))),unshift:()=>v.prepend(...Ie(E,p)),pop:()=>H("lastChild"),shift:()=>H("firstChild"),splice:()=>{let[R,z,...j]=E;const{length:F}=v.children;for(let Q=R>=0?Math.min(R+z-1,F-1):F-1;Q>=(R>=0?R:F+R);Q--)v.children[Q].remove();if(j.length){let Q=j.forEach((re,pe)=>p(re,R+pe));v.children[R]?v.children[R].after(...Q):v.append(...Q)}}}},f=v=>({oldVal:v,bindings:[],listeners:[],__isState:!0,get val(){let E=this;return i==null||i.add(E),E.valProxy??(E.valProxy=Ve(v)?x(E,v):v,E.valProxy)},set val(E){let p=this,h=p.val;Ve(E)?(p.valProxy=x(p,E),d(p,"assign",E)):E!==h&&(p.valProxy=E,d(p)),p.oldVal=h}}),g=v=>v==null||v===!1?c("span"):v.nodeType?v:n.createTextNode(v),S=(v,E)=>{let p=new Set;return E.val=l(v,p),p},C=v=>{let E=f(),p=S(v,E);E.computed=!0;for(let h of p)h.listeners.push({computed:v,deps:p,state:E});return E},A=v=>{for(let E of[...v.listeners])S(E.computed,E.state)},D=(v,...E)=>{if(E.length){let p=[];for(let h of E.flat(1/0))h!=null&&p.push(ge(h)?L({deps:[h],render:()=>w=>w}):gt(h)?X({renderInferred:h}):g(h));v.append(...p)}},B={},P=(v,E)=>v&&(Object.getOwnPropertyDescriptor(v,E)??P(ft(v),E)),N=(v,E,p)=>{var h;return B[v+","+E]??(B[v+","+E]=((h=P(p,E))==null?void 0:h.set)??0)},O=(v,E)=>new MutationObserver((p,h)=>{p.filter(w=>w.removedNodes).forEach(w=>[...w.removedNodes].find(I=>I===v&&(E({element:v}),h.disconnect(),!0)))}).observe(v.parentNode,{childList:!0}),_=v=>new Proxy(function(p,...h){var H;let[w,...I]=q(h),T=v?n.createElementNS(v,p):c(p);for(let[R,z]of Object.entries(w)){if(R.startsWith("bau"))continue;let j=N(p,R,ft(T))?F=>T[R]=F:F=>T.setAttribute(R,F);z==null||(ge(z)?L({deps:[z],render:()=>()=>(j(z.val),T)}):gt(z)&&(!R.startsWith("on")||z.isDerived)?X({renderInferred:()=>(j(z({element:T})),T)}):z.renderProp?L({deps:z.deps,render:()=>()=>(j(z.renderProp({element:T})(...z.deps.map(Xe))),T)}):j(z))}return D(T,...I),(H=w.bauCreated)==null||H.call(w,{element:T}),w.bauMounted&&t.requestAnimationFrame(()=>w.bauMounted({element:T})),w.bauUnmounted&&t.requestAnimationFrame(()=>O(T,w.bauUnmounted)),T},{get:(E,p)=>E.bind(void 0,p)}),G=(v,E,p)=>{v.element=g(p);for(let h of E)ge(h)&&(a.add(h),h.bindings.push(v));return v.element},X=({renderInferred:v,element:E})=>{let p=new Set,h=l(v,p,{element:E});return G({renderInferred:v},p,h)},L=({deps:v,element:E,render:p,renderItem:h})=>G({deps:v,render:p,renderItem:h},v,p({element:E,renderItem:h})(...v.map(Xe))),V=(v,E,p)=>L({deps:[v],render:({renderItem:h})=>w=>(E.append(...Ie(w,h)),E),renderItem:p}),W=v=>{s=!0,v(),s=!1,r.forEach(d),r.clear()};return{tags:_(),tagsNS:_,state:f,bind:L,loop:V,derive:C,stateSet:a,batch:W}}const En=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Cn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Sn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function kn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...r)=>{const s=Sn(a,r),i=En(s);return!t.getElementById(i)&&Cn(t,e==null?void 0:e.target,i,o(i,s)),i};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function An(e){return{bau:yn(),...kn(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function J(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...s){let[{color:i,variant:c,size:l="md",disabled:m,href:d,...u},...x]=q(s);return(d?n.tags.a:n.tags.button)({...u,class:$("button",a.root,c,l,i,d?a.a:a.button,m&&a.disabled,t==null?void 0:t.class,u.class),disabled:m,href:d,...!d&&{type:"button"}},x)}}const oe=["neutral","primary","success","danger","warning"],Tn=["plain","outline","solid"],Mn="light",Dn=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function _e(e,t){const{bau:n,css:o,window:a}=e,{input:r}=n.tags,s=m=>{a.document.documentElement.setAttribute("data-theme",m),localStorage.setItem("theme",m)},i=()=>{try{return localStorage.getItem("theme")}catch{}},c=i();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Mn);const l=o`
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
    ${Dn()}
  `;return function(...d){let[{color:u,variant:x="outline",size:y="md",...f},...g]=q(d);return r({required:"required",title:"Switch Theme",...f,class:$("theme-switch",u,x,y,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:i()=="dark",onclick:S=>{s(S.target.checked?"dark":"light")}},...g)}}function In(e){const{tr:t,bau:n,css:o,config:a,states:r}=e,{i:s,header:i,h1:c,div:l,a:m,img:d,b:u,ul:x,li:y}=n.tags,{svg:f,path:g}=n.tagsNS("http://www.w3.org/2000/svg"),S=r.drawerOpen,C=J(e,{class:o`
      background: transparent;
    `}),A=_e(e),D=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},g({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),B=()=>l({class:o`
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
        `},A(),C({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},B(),P())}}function $n({tr:e,bau:t,css:n}){const{footer:o,span:a,a:r,ul:s,li:i,p:c}=t.tags;return function(){return o({class:n`
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
  `;return function(...c){let[{color:l="neutral",variant:m="plain",size:d,...u},...x]=q(c);return a({...u,class:$("list",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...x)}}const vt="0.3s",Bt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,r=structuredClone(a);return r.children=o==null?void 0:o.map(Bt({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},Ot=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ot(e)(t.children[o]);if(a)return a}},Nn=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function Be(e,t){const{bau:n,css:o,window:a}=e,{base:r=""}=t,s=({currentTree:L,data:V,onclickBack:W})=>g(D({variant:"plain",href:`${r}${L.parentTree.children[0].data.href}`,onclick:W({currentTree:L}),class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:"plain",href:`${r}${V.href}`,class:o`
            flex-grow: 1;
          `},V.name)),i=({data:{name:L,href:V},children:W=[]})=>D({href:`${r}${V}`,"data-ischild":W.length==0},L),c=({subTree:L})=>{var V;return a.location.pathname.replace(r,"")===((V=L==null?void 0:L.data)==null?void 0:V.href)},{renderHeader:l=s,renderMenuItem:m=i,isActive:d=c}=t,{ul:u,li:x,nav:y,div:f,header:g,a:S}=n.tags,C=_t(),A=Ce(e),D=J(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:P,showFromRight:N,showFromLeft:O}=Nn(e),_=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    border-right: 1px solid var(--color-emphasis-200);

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
  `,G=({variant:L,color:V,size:W,onclickItem:v,onclickBack:E,currentTree:p,pathnameState:h})=>{const{children:w,parentTree:I,data:T}=p;return f({class:$("drillDownMenu",L,V,W)},I&&l({data:T,currentTree:p,onclickBack:E}),w&&A({class:$(L,V,W)},w.map(H=>x({class:()=>$(H.children&&"has-children",d({pathname:h.val,subTree:H})&&"active"),onclick:H.children&&v({currentTree:H})},m(H)))))},X=({tree:L,pathname:V})=>{let W=Bt({})(L),v=Ot(V)(W);return v||(console.log("drilldown no sub tree",V),v=W),v};return function(V){const{variant:W="plain",color:v="neutral",size:E="md",tree:p,pathnameState:h=n.state(a.location.pathname),...w}=V,I=({currentTree:z})=>j=>H(j,R,z,!0),T=({currentTree:z})=>j=>H(j,R,z.parentTree,!1),H=(z,j,F,Q)=>{j.firstChild.replaceChildren(C({parent:j,animationHide:`${Q?B:P} ${vt}`,animationShow:`${Q?N:O} ${vt}`},G({variant:W,color:v,size:E,currentTree:F,onclickItem:I,onclickBack:T,pathnameState:h})))},R=y({class:$(_,t==null?void 0:t.class,w.class)},()=>G({variant:W,color:v,size:E,currentTree:X({tree:p,pathname:h.val}),onclickItem:I,onclickBack:T,pathnameState:h}));return R}}const _n={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Rt(e){const{tr:t,bau:n,css:o,config:a,states:r,window:s}=e,{div:i,ul:c,li:l,nav:m,a:d,span:u}=n.tags;let x=!1;const y=Be(e,{base:a.base});return function(){return i({bauMounted:({element:g})=>{s.innerWidth<=640&&(x=!0,r.drawerOpen.val=!1)},onclick:g=>{x&&!g.target.dataset.buttonback&&!g.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:$(o`
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
          `)},y({tree:_n,pathnameState:r.pathname}))}}const Bn=e=>{const{bau:t,css:n,states:o}=e,{div:a}=t.tags,r=In(e),s=Rt(e),i=$n(e);return function({componentState:l}){return a({class:n`
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
          `},()=>l.val&&l.val({})),i())}};function On(e){const{bau:t,css:n,config:o}=e,{div:a,h1:r,h2:s,p:i}=t.tags;J(e);const c=n`
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
  `;return function({name:m,text:d,tagLine:u}){return a({class:c},r(m),s(d),i(u))}}function Rn(e){const{bau:t,css:n}=e,{div:o,h1:a,p:r}=t.tags,s=n`
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
  `,i=({title:c,Content:l})=>o({className:"feature"},a(c),r(l()));return function({featuresContent:l}){return o({class:s},l.map(i))}}function Pn(e){const{bau:t,css:n,config:o}=e,{div:a,p:r,a:s}=t.tags,i=On(e),c=Rn(e),l=J(e),m=n``,d=[{title:"UI components for the web",Content:()=>[r("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),r("3 variant: plain, outline and primary"),r("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[r("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[r("The component bundle size is about 8x smaller compared to popular React UI component library."),r("Faster download time for users."),r("Save in bandwith fees for the operator."),r("Suitable for low bandwith network and low cost device.")]}];return function({}){return a({class:m},i({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:d}))}}function Ln(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Pt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Pt(n)}),e}class xt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Lt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function ie(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const jn="</span>",wt=e=>!!e.scope,zn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Hn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Lt(t)}openNode(t){if(!wt(t))return;const n=zn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){wt(t)&&(this.buffer+=jn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const yt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ye{constructor(){this.rootNode=yt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=yt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ye._collapse(n)}))}}class Gn extends Ye{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Hn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ye(e){return e?typeof e=="string"?e:e.source:null}function jt(e){return de("(?=",e,")")}function Un(e){return de("(?:",e,")*")}function Fn(e){return de("(?:",e,")?")}function de(...e){return e.map(n=>ye(n)).join("")}function Wn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function qe(...e){return"("+(Wn(e).capture?"":"?:")+e.map(o=>ye(o)).join("|")+")"}function zt(e){return new RegExp(e.toString()+"|").exec("").length-1}function Vn(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Xn=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Je(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let r=ye(o),s="";for(;r.length>0;){const i=Xn.exec(r);if(!i){s+=r;break}s+=r.substring(0,i.index),r=r.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?s+="\\"+String(Number(i[1])+a):(s+=i[0],i[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const Zn=/\b\B/,Ht="[a-zA-Z]\\w*",Qe="[a-zA-Z_]\\w*",Gt="\\b\\d+(\\.\\d+)?",Ut="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ft="\\b(0b[01]+)",Kn="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Yn=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=de(t,/.*\b/,e.binary,/\b.*/)),ie({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ee={begin:"\\\\[\\s\\S]",relevance:0},qn={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ee]},Jn={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ee]},Qn={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Oe=function(e,t,n={}){const o=ie({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=qe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:de(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},eo=Oe("//","$"),to=Oe("/\\*","\\*/"),no=Oe("#","$"),oo={scope:"number",begin:Gt,relevance:0},ao={scope:"number",begin:Ut,relevance:0},ro={scope:"number",begin:Ft,relevance:0},so={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ee,{begin:/\[/,end:/\]/,relevance:0,contains:[Ee]}]}]},io={scope:"title",begin:Ht,relevance:0},co={scope:"title",begin:Qe,relevance:0},lo={begin:"\\.\\s*"+Qe,relevance:0},uo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var $e=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Zn,IDENT_RE:Ht,UNDERSCORE_IDENT_RE:Qe,NUMBER_RE:Gt,C_NUMBER_RE:Ut,BINARY_NUMBER_RE:Ft,RE_STARTERS_RE:Kn,SHEBANG:Yn,BACKSLASH_ESCAPE:Ee,APOS_STRING_MODE:qn,QUOTE_STRING_MODE:Jn,PHRASAL_WORDS_MODE:Qn,COMMENT:Oe,C_LINE_COMMENT_MODE:eo,C_BLOCK_COMMENT_MODE:to,HASH_COMMENT_MODE:no,NUMBER_MODE:oo,C_NUMBER_MODE:ao,BINARY_NUMBER_MODE:ro,REGEXP_MODE:so,TITLE_MODE:io,UNDERSCORE_TITLE_MODE:co,METHOD_GUARD:lo,END_SAME_AS_BEGIN:uo});function po(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function mo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function bo(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=po,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ho(e,t){Array.isArray(e.illegal)&&(e.illegal=qe(...e.illegal))}function go(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function fo(e,t){e.relevance===void 0&&(e.relevance=1)}const vo=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=de(n.beforeMatch,jt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},xo=["of","and","for","in","not","or","if","then","parent","list","value"],wo="keyword";function Wt(e,t,n=wo){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(r){Object.assign(o,Wt(e[r],t,r))}),o;function a(r,s){t&&(s=s.map(i=>i.toLowerCase())),s.forEach(function(i){const c=i.split("|");o[c[0]]=[r,yo(c[0],c[1])]})}}function yo(e,t){return t?Number(t):Eo(e)?0:1}function Eo(e){return xo.includes(e.toLowerCase())}const Et={},ue=e=>{console.error(e)},Ct=(e,...t)=>{console.log(`WARN: ${e}`,...t)},he=(e,t)=>{Et[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Et[`${e}/${t}`]=!0)},Ne=new Error;function Vt(e,t,{key:n}){let o=0;const a=e[n],r={},s={};for(let i=1;i<=t.length;i++)s[i+o]=a[i],r[i+o]=!0,o+=zt(t[i-1]);e[n]=s,e[n]._emit=r,e[n]._multi=!0}function Co(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw ue("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ne;if(typeof e.beginScope!="object"||e.beginScope===null)throw ue("beginScope must be object"),Ne;Vt(e,e.begin,{key:"beginScope"}),e.begin=Je(e.begin,{joinWith:""})}}function So(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw ue("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ne;if(typeof e.endScope!="object"||e.endScope===null)throw ue("endScope must be object"),Ne;Vt(e,e.end,{key:"endScope"}),e.end=Je(e.end,{joinWith:""})}}function ko(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ao(e){ko(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Co(e),So(e)}function To(e){function t(s,i){return new RegExp(ye(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,i]),this.matchAt+=zt(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(c=>c[1]);this.matcherRe=t(Je(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(i);if(!c)return null;const l=c.findIndex((d,u)=>u>0&&d!==void 0),m=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,m)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const c=new n;return this.rules.slice(i).forEach(([l,m])=>c.addRule(l,m)),c.compile(),this.multiRegexes[i]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,c){this.rules.push([i,c]),c.type==="begin"&&this.count++}exec(i){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(i);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const m=this.getMatcher(0);m.lastIndex=this.lastIndex+1,l=m.exec(i)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const i=new o;return s.contains.forEach(c=>i.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&i.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&i.addRule(s.illegal,{type:"illegal"}),i}function r(s,i){const c=s;if(s.isCompiled)return c;[mo,go,Ao,vo].forEach(m=>m(s,i)),e.compilerExtensions.forEach(m=>m(s,i)),s.__beforeBegin=null,[bo,ho,fo].forEach(m=>m(s,i)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Wt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),i&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=ye(c.end)||"",s.endsWithParent&&i.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+i.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(m){return Mo(m==="self"?s:m)})),s.contains.forEach(function(m){r(m,c)}),s.starts&&r(s.starts,i),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=ie(e.classNameAliases||{}),r(e)}function Xt(e){return e?e.endsWithParent||Xt(e.starts):!1}function Mo(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return ie(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Xt(e)?ie(e,{starts:e.starts?ie(e.starts):null}):Object.isFrozen(e)?ie(e):e}var Do="11.8.0";class Io extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ze=Lt,St=ie,kt=Symbol("nomatch"),$o=7,Zt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Gn};function c(p){return i.noHighlightRe.test(p)}function l(p){let h=p.className+" ";h+=p.parentNode?p.parentNode.className:"";const w=i.languageDetectRe.exec(h);if(w){const I=_(w[1]);return I||(Ct(r.replace("{}",w[1])),Ct("Falling back to no-highlight mode for this block.",p)),I?w[1]:"no-highlight"}return h.split(/\s+/).find(I=>c(I)||_(I))}function m(p,h,w){let I="",T="";typeof h=="object"?(I=p,w=h.ignoreIllegals,T=h.language):(he("10.7.0","highlight(lang, code, ...args) has been deprecated."),he("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),T=p,I=h),w===void 0&&(w=!0);const H={code:I,language:T};v("before:highlight",H);const R=H.result?H.result:d(H.language,H.code,w);return R.code=H.code,v("after:highlight",R),R}function d(p,h,w,I){const T=Object.create(null);function H(k,M){return k.keywords[M]}function R(){if(!b.keywords){te.addText(Y);return}let k=0;b.keywordPatternRe.lastIndex=0;let M=b.keywordPatternRe.exec(Y),U="";for(;M;){U+=Y.substring(k,M.index);const Z=ae.case_insensitive?M[0].toLowerCase():M[0],ne=H(b,Z);if(ne){const[se,on]=ne;if(te.addText(U),U="",T[Z]=(T[Z]||0)+1,T[Z]<=$o&&(De+=on),se.startsWith("_"))U+=M[0];else{const an=ae.classNameAliases[se]||se;F(M[0],an)}}else U+=M[0];k=b.keywordPatternRe.lastIndex,M=b.keywordPatternRe.exec(Y)}U+=Y.substring(k),te.addText(U)}function z(){if(Y==="")return;let k=null;if(typeof b.subLanguage=="string"){if(!t[b.subLanguage]){te.addText(Y);return}k=d(b.subLanguage,Y,!0,ee[b.subLanguage]),ee[b.subLanguage]=k._top}else k=x(Y,b.subLanguage.length?b.subLanguage:null);b.relevance>0&&(De+=k.relevance),te.__addSublanguage(k._emitter,k.language)}function j(){b.subLanguage!=null?z():R(),Y=""}function F(k,M){k!==""&&(te.startScope(M),te.addText(k),te.endScope())}function Q(k,M){let U=1;const Z=M.length-1;for(;U<=Z;){if(!k._emit[U]){U++;continue}const ne=ae.classNameAliases[k[U]]||k[U],se=M[U];ne?F(se,ne):(Y=se,R(),Y=""),U++}}function re(k,M){return k.scope&&typeof k.scope=="string"&&te.openNode(ae.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(F(Y,ae.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),Y=""):k.beginScope._multi&&(Q(k.beginScope,M),Y="")),b=Object.create(k,{parent:{value:b}}),b}function pe(k,M,U){let Z=Vn(k.endRe,U);if(Z){if(k["on:end"]){const ne=new xt(k);k["on:end"](M,ne),ne.isMatchIgnored&&(Z=!1)}if(Z){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return pe(k.parent,M,U)}function Te(k){return b.matcher.regexIndex===0?(Y+=k[0],1):(We=!0,0)}function bt(k){const M=k[0],U=k.rule,Z=new xt(U),ne=[U.__beforeBegin,U["on:begin"]];for(const se of ne)if(se&&(se(k,Z),Z.isMatchIgnored))return Te(M);return U.skip?Y+=M:(U.excludeBegin&&(Y+=M),j(),!U.returnBegin&&!U.excludeBegin&&(Y=M)),re(U,k),U.returnBegin?0:M.length}function He(k){const M=k[0],U=h.substring(k.index),Z=pe(b,k,U);if(!Z)return kt;const ne=b;b.endScope&&b.endScope._wrap?(j(),F(M,b.endScope._wrap)):b.endScope&&b.endScope._multi?(j(),Q(b.endScope,k)):ne.skip?Y+=M:(ne.returnEnd||ne.excludeEnd||(Y+=M),j(),ne.excludeEnd&&(Y=M));do b.scope&&te.closeNode(),!b.skip&&!b.subLanguage&&(De+=b.relevance),b=b.parent;while(b!==Z.parent);return Z.starts&&re(Z.starts,k),ne.returnEnd?0:M.length}function Ge(){const k=[];for(let M=b;M!==ae;M=M.parent)M.scope&&k.unshift(M.scope);k.forEach(M=>te.openNode(M))}let me={};function Me(k,M){const U=M&&M[0];if(Y+=k,U==null)return j(),0;if(me.type==="begin"&&M.type==="end"&&me.index===M.index&&U===""){if(Y+=h.slice(M.index,M.index+1),!a){const Z=new Error(`0 width match regex (${p})`);throw Z.languageName=p,Z.badRule=me.rule,Z}return 1}if(me=M,M.type==="begin")return bt(M);if(M.type==="illegal"&&!w){const Z=new Error('Illegal lexeme "'+U+'" for mode "'+(b.scope||"<unnamed>")+'"');throw Z.mode=b,Z}else if(M.type==="end"){const Z=He(M);if(Z!==kt)return Z}if(M.type==="illegal"&&U==="")return 1;if(Fe>1e5&&Fe>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=U,U.length}const ae=_(p);if(!ae)throw ue(r.replace("{}",p)),new Error('Unknown language: "'+p+'"');const Ue=To(ae);let be="",b=I||Ue;const ee={},te=new i.__emitter(i);Ge();let Y="",De=0,le=0,Fe=0,We=!1;try{if(ae.__emitTokens)ae.__emitTokens(h,te);else{for(b.matcher.considerAll();;){Fe++,We?We=!1:b.matcher.considerAll(),b.matcher.lastIndex=le;const k=b.matcher.exec(h);if(!k)break;const M=h.substring(le,k.index),U=Me(M,k);le=k.index+U}Me(h.substring(le))}return te.finalize(),be=te.toHTML(),{language:p,value:be,relevance:De,illegal:!1,_emitter:te,_top:b}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:p,value:Ze(h),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:le,context:h.slice(le-100,le+100),mode:k.mode,resultSoFar:be},_emitter:te};if(a)return{language:p,value:Ze(h),illegal:!1,relevance:0,errorRaised:k,_emitter:te,_top:b};throw k}}function u(p){const h={value:Ze(p),illegal:!1,relevance:0,_top:s,_emitter:new i.__emitter(i)};return h._emitter.addText(p),h}function x(p,h){h=h||i.languages||Object.keys(t);const w=u(p),I=h.filter(_).filter(X).map(j=>d(j,p,!1));I.unshift(w);const T=I.sort((j,F)=>{if(j.relevance!==F.relevance)return F.relevance-j.relevance;if(j.language&&F.language){if(_(j.language).supersetOf===F.language)return 1;if(_(F.language).supersetOf===j.language)return-1}return 0}),[H,R]=T,z=H;return z.secondBest=R,z}function y(p,h,w){const I=h&&n[h]||w;p.classList.add("hljs"),p.classList.add(`language-${I}`)}function f(p){let h=null;const w=l(p);if(c(w))return;if(v("before:highlightElement",{el:p,language:w}),p.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),i.throwUnescapedHTML))throw new Io("One of your code blocks includes unescaped HTML.",p.innerHTML);h=p;const I=h.textContent,T=w?m(I,{language:w,ignoreIllegals:!0}):x(I);p.innerHTML=T.value,y(p,w,T.language),p.result={language:T.language,re:T.relevance,relevance:T.relevance},T.secondBest&&(p.secondBest={language:T.secondBest.language,relevance:T.secondBest.relevance}),v("after:highlightElement",{el:p,result:T,text:I})}function g(p){i=St(i,p)}const S=()=>{D(),he("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function C(){D(),he("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let A=!1;function D(){if(document.readyState==="loading"){A=!0;return}document.querySelectorAll(i.cssSelector).forEach(f)}function B(){A&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",B,!1);function P(p,h){let w=null;try{w=h(e)}catch(I){if(ue("Language definition for '{}' could not be registered.".replace("{}",p)),a)ue(I);else throw I;w=s}w.name||(w.name=p),t[p]=w,w.rawDefinition=h.bind(null,e),w.aliases&&G(w.aliases,{languageName:p})}function N(p){delete t[p];for(const h of Object.keys(n))n[h]===p&&delete n[h]}function O(){return Object.keys(t)}function _(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function G(p,{languageName:h}){typeof p=="string"&&(p=[p]),p.forEach(w=>{n[w.toLowerCase()]=h})}function X(p){const h=_(p);return h&&!h.disableAutodetect}function L(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=h=>{p["before:highlightBlock"](Object.assign({block:h.el},h))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=h=>{p["after:highlightBlock"](Object.assign({block:h.el},h))})}function V(p){L(p),o.push(p)}function W(p){const h=o.indexOf(p);h!==-1&&o.splice(h,1)}function v(p,h){const w=p;o.forEach(function(I){I[w]&&I[w](h)})}function E(p){return he("10.7.0","highlightBlock will be removed entirely in v12.0"),he("10.7.0","Please use highlightElement now."),f(p)}Object.assign(e,{highlight:m,highlightAuto:x,highlightAll:D,highlightElement:f,highlightBlock:E,configure:g,initHighlighting:S,initHighlightingOnLoad:C,registerLanguage:P,unregisterLanguage:N,listLanguages:O,getLanguage:_,registerAliases:G,autoDetection:X,inherit:St,addPlugin:V,removePlugin:W}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Do,e.regex={concat:de,lookahead:jt,either:qe,optional:Fn,anyNumberOfTimes:Un};for(const p in $e)typeof $e[p]=="object"&&Pt($e[p]);return Object.assign(e,$e),e},fe=Zt({});fe.newInstance=()=>Zt({});var No=fe;fe.HighlightJS=fe;fe.default=fe;const At=Ln(No),Tt="[A-Za-z$_][0-9A-Za-z$_]*",_o=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Bo=["true","false","null","undefined","NaN","Infinity"],Kt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Yt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],qt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Oo=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ro=[].concat(qt,Kt,Yt);function Po(e){const t=e.regex,n=(h,{after:w})=>{const I="</"+h[0].slice(1);return h.input.indexOf(I,w)!==-1},o=Tt,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(h,w)=>{const I=h[0].length+h.index,T=h.input[I];if(T==="<"||T===","){w.ignoreMatch();return}T===">"&&(n(h,{after:I})||w.ignoreMatch());let H;const R=h.input.substring(I);if(H=R.match(/^\s*=/)){w.ignoreMatch();return}if((H=R.match(/^\s+extends\s+/))&&H.index===0){w.ignoreMatch();return}}},i={$pattern:Tt,keyword:_o,literal:Bo,built_in:Ro,"variable.language":Oo},c="[0-9](_?[0-9])*",l=`\\.(${c})`,m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${m})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${m})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:i,contains:[]},x={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},y={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},C={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},A=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,x,y,f,g,{match:/\$\d+/},d];u.contains=A.concat({begin:/\{/,end:/\}/,keywords:i,contains:["self"].concat(A)});const D=[].concat(C,u.contains),B=D.concat([{begin:/\(/,end:/\)/,keywords:i,contains:["self"].concat(D)}]),P={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Kt,...Yt]}},_={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},X={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function L(h){return t.concat("(?!",h.join("|"),")")}const V={match:t.concat(/\b/,L([...qt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},W={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},v={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},E="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",p={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(E)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:i,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),_,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,x,y,f,g,C,{match:/\$\d+/},d,O,{className:"attr",begin:o+t.lookahead(":"),relevance:0},p,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[C,e.REGEXP_MODE,{className:"function",begin:E,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},W,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},V,X,N,v,{match:/\$[(.]/}]}}const Jt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:r,tr:s,td:i,thead:c,th:l}=t.tags,m=["sm","md","lg"];return function({Item:u,name:x}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(s(l(x??"Variant/Color"),oe.map(y=>l(y)))),r(Tn.map(y=>s(l(y),oe.map((f,g)=>i(u({color:f,variant:y,size:m[g%3]},{index:g}))))))))}},K=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:r,p:s,h2:i,h3:c,pre:l,div:m,code:d}=t.tags;At.registerLanguage("javascript",Po);const u=Jt(e),x=({text:y})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=At.highlight(y,{language:"js"}).value}}));return function(f){return o({class:n``},r(f.title),s(f.description),f.gridItem&&[i("Gallery"),f.gridItem&&u({Item:f.gridItem(e)})],i("Usage"),c("Import"),x({text:f.importStatement}),i("Examples"),f.examples.map(g=>a(r(g.title),s(g.description),m(g.createComponent(e)()),x({text:g.code}))))}},Lo=()=>oe.map(e=>`
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
`);function Re(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:r,ul:s,li:i,header:c,h3:l,button:m}=n.tags,d=n.state(""),u=f=>g=>{d.val==f?d.val="":d.val=f},x=({element:f,open:g})=>{const S=()=>{f.removeEventListener("transitionend",S)};function C(D){D.addEventListener("transitionend",S),window.requestAnimationFrame(()=>{D.style.height="0px"})}function A(D){D.addEventListener("transitionend",S),D.style.height=D.scrollHeight+"px"}f.scrollHeight!=0&&(g?A(f):C(f))},y=o`
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
    ${Lo()}
  `;return function(...g){let[{color:S,variant:C="outline",size:A="md",content:D,...B},...P]=q(g);const N=O=>{const{Header:_,Content:G,name:X}=O;return i({class:$(S,C,A),onclick:u(X)},l({class:()=>$(d.val==X&&"active")},m({type:"button","aria-controls":`bau-${X}`,"aria-expanded":({element:L})=>d.val==X},_(O))),r({class:"content",role:"region",id:`bau-${X}`,"data-state":({element:L})=>{const V=d.val==X;return x({element:L,open:V}),V}},G(O)))};return r({class:$("accordion",y,t==null?void 0:t.class,B.class)},s(a.map(N)))}}const Qt=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Re(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return s=>r({...s})},jo=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=Re(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>r({color:"neutral",variant:"outline"})},zo=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,en=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ho=e=>{const{css:t}=e,n=en(e),o=Re(e,{accordionDefs:n});return()=>o({color:"warning",class:t`
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
`,Uo=e=>{const{css:t}=e,n=en(e),o=Re(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
`,Wo={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:zo,createComponent:jo},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Go,createComponent:Ho},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Fo,createComponent:Uo}],gridItem:Qt},Vo=e=>{const t=K(e);return()=>t(Wo)},Xo={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Zo=({css:e,createGlobalStyles:t})=>{t`
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
`);function Se(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r,i:s}=n.tags;Zo({css:o,createGlobalStyles:a});const i=o`
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
  `,c=J(e),l=({onclick:m})=>c({"aria-label":"Close",onclick:m,class:"button-close"},"✖");return function(d,...u){const{variant:x="outline",color:y="neutral",size:f="md",onRemove:g,...S}=d;return r({...S,class:$(`alert-${x}`,x,y,f,i,t==null?void 0:t.class,d.class,"alert"),role:"alert"},s({class:"icon"},Xo[y]),r({class:"content"},...u),g&&l({onclick:g}))}}const Yo=e=>{const t=Se(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},qo=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Se(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Jo=`import alert from "@grucloud/bau-ui/alert";
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
`,Qo=e=>{const{css:t}=e,n=Se(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},ea=`import alert from "@grucloud/bau-ui/alert";
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
`,ta={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Jo,createComponent:qo},{title:"Custom Alert ",description:"A custom alert.",code:ea,createComponent:Qo}],gridItem:Yo},na=e=>{const t=K(e);return()=>t(ta)},oa=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:i}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:u,status:x})=>{const y=c.val.findIndex(f=>f.id===u);y!=-1&&(c.val[y].status=x)};return function(x={},...y){const f=({id:C})=>{d({id:C,status:"removing"});const A=c.val.findIndex(D=>D.id===C);A!=-1&&c.val.splice(A,1)},g=({Component:C})=>{const A={id:Math.random().toString(10).split(".")[1],Component:C,status:"inserting"};c.val.length>=r&&f({id:c.val[0].id}),c.val.push(A),setTimeout(()=>f(A),s)},S=C=>i({class:m.item,onclick:()=>f(C)},C.Component());return document.addEventListener("alert.add",C=>g(C.detail)),document.addEventListener("alert.remove",C=>f(C.detail)),i({class:$(m.stack,t==null?void 0:t.class,x.class)},n.loop(c,i(),S))}},aa=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=oa(e,{deleteAfterDuration:2e4}),r=J(e),s=Se(e);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ra=`import { Context } from "@grucloud/bau-ui/context";
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
`,sa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ra,createComponent:aa}]},ia=e=>{const t=K(e);return()=>t(sa)},ca=({keyframes:e})=>({hideRight:e`
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
 `}),la=e=>{const{bau:t}=e,{section:n,div:o,h1:a}=t.tags,r=_t(),s=J(e),i=ca(e);return function(){const c=t.state(!0),l=o(),m=d=>{l.replaceChildren(r({parent:l,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},o(d.val?"Ciao":"")))};return m(c),n({id:"animate"},o(a("Test Animate"),o(s({onclick:()=>{c.val=!c.val,m(c)}},()=>c.val?"Hide":"Show")),l))}};function et(e,t){const{bau:n,css:o}=e,{span:a,img:r}=n.tags,s=n.state(!0),i=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,i.val=!0},m=o`
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
  `;return function(...u){let[{color:x,variant:y="outline",size:f="md",width:g=30,height:S=30,...C},...A]=q(u);return a({class:$(m,t==null?void 0:t.class,C.class)},()=>s.val?"Loading...":"",()=>i.val&&"Error",r({width:g,height:S,onload:c,onerror:l,class:$(x,y,f,m,t==null?void 0:t.class,C.class),...C}))}}const ua=e=>{const{css:t}=e,n=et(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},da=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=et(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},pa=`import avatar from "@grucloud/bau-ui/avatar";
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
`,ma={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:pa,createComponent:da}],gridItem:ua},ba=e=>{const t=K(e);return()=>t(ma)};function tt(e,t){const{bau:n,css:o,window:a}=e,{dialog:r}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:m,onClose:d,...u},...x]=q(c);const y=S=>{g.style.opacity=1,g.showModal();const C=m.getBoundingClientRect(),A=g.getBoundingClientRect();C.x<a.innerWidth/2?g.style.left=C.left+"px":g.style.left=C.right-A.width+"px",C.y<a.innerHeight/2?g.style.top=C.top+C.height+"px":g.style.top=C.top-A.height+"px"},f=S=>{const C=()=>{g.close(),g.removeEventListener("transitionend",C)};g.addEventListener("transitionend",C),g.style.opacity=0},g=r({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:S=>S.target===g&&(f(),d==null?void 0:d.call())},l);return g.closeDialog=f,g.openDialog=y,g}}const ha=()=>oe.map(e=>`
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
  `;return function(i){const{size:c="md",variant:l="outline",color:m="neutral",name:d,id:u,disabled:x,...y}=i;return a({...y,class:$("input",c,m,l,r,t==null?void 0:t.class,y.class)})}}const ga=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function nt(e,t){const{bau:n,css:o}=e,{div:a,li:r,ul:s}=n.tags,i=tt(e),c=J(e),l=Pe(e),m=Ce(e),d=o`
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
  `,u=n.state(""),x=n.state(""),y=n.state(!1),f=n.state(0),g=()=>{y.val=!1};return function(...C){let[{variant:A="outline",color:D,size:B="md",id:P,label:N,placeholder:O,Option:_,options:G,getOptionLabel:X=({label:j})=>j,...L},...V]=q(C);const W=n.state(G),v=()=>{z.openDialog(),y.val=!0,x.val="",W.val=G},E=()=>{z.closeDialog(),y.val=!1,x.val=""},p=j=>{const{value:F}=j.target;x.val=F,F?W.val=G.filter(Q=>X(Q).match(new RegExp(`${F}`,"i"))):W.val=G},h=j=>{y.val?E():v()},w=({option:j,index:F})=>Q=>{u.val=X(j),f.val=F,E()},I=j=>{switch(console.log("onkeydown",j.key,f.val),j.key){case"Escape":E();break;case"ArrowDown":f.val<W.val.length-1?f.val++:f.val=0;break;case"ArrowUp":f.val<=0?f.val=W.val.length-1:f.val--;break;case"Enter":u.val=X(W.val[f.val]),x.val="",E();break}},T=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":y,"aria-label":N,onclick:h,variant:A,color:D,size:B},()=>!u.val&&N,u),H=l({id:P,value:x,placeholder:O,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":y,oninput:p,onkeydown:I,variant:A,color:D,size:B}),z=i({id:P,triggerEl:T,contentEl:(()=>a({class:$(A,D,B,"content")},H,()=>m({class:$(A,D,B)},W.val.map((j,F)=>r({class:()=>$(f.val==F&&"active"),onclick:w({option:j,index:F})},_(j))))))(),onClose:g});return a({...L,class:$("autocomplete",d,t==null?void 0:t.class,L==null?void 0:L.class)},T,z)}}const fa=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,r=nt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},va=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,s=nt(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code));return()=>o(s({options:i,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},xa=`import { Context } from "@grucloud/bau-ui/context";
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
`,wa={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:xa,createComponent:va}],gridItem:fa},ya=e=>{const t=K(e);return()=>t(wa)};function ot(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m="md",content:d,...u},...x]=q(i);return a({...u,class:$("badge",r,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:$(c,l,m)},d),...x)}}const Ea=e=>{const t=ot(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},Ca=e=>{const{bau:t}=e,{section:n}=t.tags,o=ot(e);return()=>n(o({content:"10"},"☏"))},Sa=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,ka={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Sa,createComponent:Ca}],gridItem:Ea},Aa=e=>{const t=K(e);return()=>t(ka)};function at(e,t){const{bau:n,css:o}=e,{ul:a,li:r,a:s,span:i}=n.tags,c=J(e),l=o`
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
  `;return function(...d){let[{color:u,variant:x="outline",size:y="md",items:f,...g},...S]=q(d);return a({...g,class:$(l,t==null?void 0:t.class,g==null?void 0:g.class)},f.map(({href:C,name:A})=>r((C?c:i)({href:C,color:u,variant:x,size:y,class:$(u,x,y)},A))))}}const Ta=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=at(e);return o=>n({...o,...t})},Ma=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=at(e);return()=>n(a(o))},Da=`import breadcrumbs, {
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
`,Ia={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Da,createComponent:Ma}],gridItem:Ta},$a=e=>{const t=K(e);return()=>t(Ia)},Na=e=>{const t=J(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},_a=e=>{const{bau:t}=e,{section:n}=t.tags,o=J(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Ba=`import button from "@grucloud/bau-ui/button";
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
`,Oa={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Ba,createComponent:_a}],gridItem:Na},Ra=e=>{const t=K(e);return()=>t(Oa)},Pa=()=>oe.map(e=>`
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
  `;return function(...i){let[{variant:c="outline",size:l="md",color:m,...d},...u]=q(i);return a({...d,class:$("button-group",c,m,l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...u)}}const La=e=>{const t=["ONE","TWO","THREE"],n=J(e),o=Le(e);return a=>o({...a},t.map(r=>n(a,r)))},ja=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=J(e),r=Le(e),s="primary",i="solid";return()=>n(r({color:s,variant:i},o.map(c=>a({color:s,variant:i},c))))},za=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Ha={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:za,createComponent:ja}],gridItem:La},Ga=e=>{const t=K(e);return()=>t(Ha)};function rt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:m="plain",size:d,...u},...x]=q(c);return a({...u,type:"date",class:$("calendar",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...x)}}const Ua=e=>{const t=rt(e);return n=>t({...n})},Fa=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),r=rt(e);return()=>n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Wa=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Va={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Wa,createComponent:Fa}],gridItem:Ua},Xa=e=>{const t=K(e);return()=>t(Va)};function st(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...i){let[{size:c="md",variant:l="outline",color:m="neutral",onclick:d,...u},...x]=q(i);return a({...u,onclick:d,class:$("chip",r,c,l,m,d&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...x)}}const Za=e=>{const t=st(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},Ka=e=>{const{bau:t}=e,{section:n}=t.tags,o=st(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},Ya=`import chip from "@grucloud/bau-ui/chip";
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
`,qa={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:Ya,createComponent:Ka}],gridItem:Za},Ja=e=>{const t=K(e);return()=>t(qa)};function it(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m="md",...d},...u]=q(i);return a({type:"checkbox",required:"required",...d,class:$(r,c,l,m,t==null?void 0:t.class,d==null?void 0:d.class)})}}const Qa=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=it(e);return r=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${r.color} ${r.variant} ${r.size}`,a({id:`myCheckbox-gallery-${r.color}-${r.variant}-${r.size}`,name:`myCheckbox-gallery-${r.color}-${r.variant}`,...r}))},er=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,r=it(e),s=t.state(!1),i=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
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
`,nr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:tr,createComponent:er}],gridItem:Qa},or=e=>{const t=K(e);return()=>t(nr)};function ar(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m,openState:d,...u},...x]=q(i);return a({class:$(r,t==null?void 0:t.class,u.class)},a({class:()=>$("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>$("content",d.val&&"content-open")},x))}}const rr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),r=ar(e),s=J(e),i=Rt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},i()))},sr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,ir={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:sr,createComponent:rr}]},cr=e=>{const t=K(e);return()=>t(ir)},lr=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Be(e,{base:t.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},ur=e=>{const{bau:t,config:n}=e,{section:o}=t.tags,a=t.state(window.location.pathname.replace(n.base,"")),r={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},s=Be(e,{base:n.base+"/components/drillDownMenu"});return()=>o(s({tree:r,pathnameState:a}))},dr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,pr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:dr,createComponent:ur}],gridItem:lr},mr=e=>{const t=K(e);return()=>t(pr)};function ct(e,t){const{bau:n,css:o}=e,{div:a,span:r,label:s,input:i}=n.tags,c={base:o`
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
    `};return function(m,...d){const{variant:u="outline",color:x="neutral",size:y="md",Component:f,disabled:g,...S}=m;return a({class:$(c.base,g&&c.disabled,t==null?void 0:t.class,m.class)},s({class:$(u,x,y)},f({disabled:g}),i({type:"file",disabled:g,...S})),r({class:"filename-display"}))}}const br=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:i,span:c}=n.tags,l=n.state("No file selected"),m=ct(e),d=x=>{const y=x.target.files[0];y?l.val=y.name:l.val="No file selected"},u=({disabled:x})=>i({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return x=>m({Component:u,name:"file",accept:"text/*",onchange:d,...x})},hr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:i,div:c,span:l}=n.tags,m=n.state("No file selected"),d=ct(e),u=y=>{const f=y.target.files[0];f?m.val=f.name:m.val="No file selected"},x=({disabled:y})=>c({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>i(d({Component:x,name:"file",accept:"text/*",onchange:u}),c("File selected: ",m))},gr=`import classNames from "@grucloud/bau-css/classNames";
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
`,fr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:gr,createComponent:hr}],gridItem:br},vr=e=>{const t=K(e);return()=>t(fr)},xr=e=>{const t=Pe(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},wr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Pe(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},yr=`import input from "@grucloud/bau-ui/input";
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
`,Er={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:yr,createComponent:wr}],gridItem:xr},Cr=e=>{const t=K(e);return()=>t(Er)};function lt(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:m="outline",size:d="md",...u},...x]=q(c);return a({class:$("modal",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...x)}}const Sr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:r,p:s}=t.tags,i=J(e),c=lt(e),l=()=>o(Array(10).fill("").map((d,u)=>s(u+1,". Some text here"))),m=d=>{const u=c({id:"my-dialog",...d},a("Header"),l(),r(i({variant:"outline",color:d.color,onclick:()=>{u.close()}},"Cancel"),i({variant:"solid",color:d.color,onclick:()=>{u.close()}},"OK")));return u};return d=>{const u=m(d);return n(i({...d,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},kr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:r,p:s}=t.tags,i="neutral",c=J(e),l=lt(e),m=()=>o(Array(10).fill("").map((u,x)=>s(x+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),m(),r(c({variant:"outline",color:i,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:i,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Ar=`import modal from "@grucloud/bau-ui/modal";
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
`,Tr={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ar,createComponent:kr}],gridItem:Sr},Mr=e=>{const t=K(e);return()=>t(Tr)},Dr=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:r}=t.tags,s=J(e),i=tt(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),r("My Content")),m=c(),d=i({id:"my-popover-left",triggerEl:m,contentEl:l()});return()=>n(o(m,d))},Ir=`import popover from "@grucloud/bau-ui/popover";
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
`,$r={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Ir,createComponent:Dr}]},Nr=e=>{const t=K(e);return()=>t($r)},_r=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function ut(e,t){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,s=J(e),i=tt(e),c=Ce(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${_r()}
  `,m=n.state(""),d=n.state(!1),u=n.state(0);return function(...y){let[{color:f="neutral",variant:g="outline",size:S="md",id:C,label:A,Option:D,options:B,getOptionLabel:P=({label:h})=>h,...N},...O]=q(y);const _=()=>{p.openDialog(),p.focus(),d.val=!0},G=()=>{p.closeDialog(),d.val=!1},X=()=>{d.val=!1},L=h=>{d.val?G():_()},V=({option:h,index:w})=>I=>{m.val=P(h),u.val=w,G()},W=h=>{switch(h.preventDefault(),h.key){case"Escape":G();break;case"ArrowDown":u.val<B.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=B.length-1:u.val--;break;case"Enter":d.val?(m.val=P(B[u.val]),G()):_();break}},v=()=>c({tabindex:"0",class:$(f,g)},B.map((h,w)=>r({class:()=>$(u.val==w&&"active"),onclick:V({option:h,index:w})},D(h)))),E=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":A,onclick:L,color:f,variant:g,size:S},()=>!m.val&&A,m),p=i({id:C,triggerEl:E,contentEl:v(),onClose:X});return a({...N,class:$("select",f,S,l,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:W},E,p)}}const Br=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,r=ut(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Or=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,s=ut(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code));return()=>o(s({options:i,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Rr=`import select from "@grucloud/bau-ui/select";
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
`,Pr={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Rr,createComponent:Or}],gridItem:Br},Lr=e=>{const t=K(e);return()=>t(Pr)};function ke(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(i=>`
&.slider.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:m="outline",size:d,...u},...x]=q(c);return a({...u,type:"range",class:$("slider",l,m,d,s,t==null?void 0:t.class,u.class)},...x)}}const jr=e=>{const{bau:t}=e,n=t.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=ke(e);return r=>a({...r,oninput:o})},zr=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:r}=t.tags,s=t.state(0),i=l=>{s.val=l==null?void 0:l.target.value},c=ke(e);return()=>n(o(a("Slider with step, min and max",r,c({oninput:i,name:"slider-simple",step:20,min:-100,max:100}))))},Hr=`import slider from "@grucloud/bau-ui/slider";
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
`,Gr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),m=u=>{l.val=u==null?void 0:u.target.value},d=ke(e);return()=>o(a(r({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:m,class:n`
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
`,Fr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),m=u=>{l.val=u==null?void 0:u.target.value},d=ke(e);return()=>o(a({class:n`
            display: flex;
          `},r({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:m,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},Wr=`import slider from "@grucloud/bau-ui/slider";
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
`,Vr={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Hr,createComponent:zr},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Ur,createComponent:Gr},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Wr,createComponent:Fr}],gridItem:jr},Xr=e=>{const t=K(e);return()=>t(Vr)},Mt={sm:16,md:32,lg:64};function je(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:r,animateTransform:s,rect:i}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:m="color-base",variant:d="outline",visibility:u=!0,...x}={}){return a({class:$(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${m});
          `,t.class,x.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:Mt[l],height:Mt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Zr=e=>{const t=je(e);return n=>t({...n})},Kr=e=>{const{bau:t}=e,{section:n}=t.tags,o=je(e);return()=>n(o({}))},Yr=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,qr={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Yr,createComponent:Kr}],gridItem:Zr},Jr=e=>{const t=K(e);return()=>t(qr)},Qr=()=>oe.map(e=>`
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
  `;return function(...i){let[{color:c="neutral",variant:l="plain",size:m="md",...d},...u]=q(i);return a({...d,class:$("switch",r,c,l,m,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...u)}}const es=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,r=dt(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",r({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",r({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ts=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r}=t.tags,s=dt(e);return()=>o(a(r({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},ns=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,os={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:ns,createComponent:ts}],gridItem:es},as=e=>{const t=K(e);return()=>t(os)},rs=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ve(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:r,ul:s,li:i}=n.tags,c=n.state(a),l=n.state(a[0]),m=u=>c.val.find(x=>x.name==u),d={base:o`
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
    `};return function(...x){let[{color:y,variant:f="plain",size:g,...S},...C]=q(x);const A=B=>{const{Header:P,disabled:N,name:O}=B;return i({class:()=>$(l.val.name==O&&"active",N&&"disabled"),onclick:_=>_.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},P(B))},D=r({class:$("tabs",d.base,f,g,y,t==null?void 0:t.class,S.class)},n.loop(c,s(),A),()=>l.val.Content?l.val.Content({}):"");return D.addEventListener("tab.select",B=>{var O,_;const{tabName:P}=B.detail,N=m(P);N&&((O=l.val.exit)==null||O.call(),l.val=N,(_=N.enter)==null||_.call())},!1),D.addEventListener("tab.add",B=>{var N;const{tab:P}=B.detail;(N=P.enter)==null||N.call(),c.val.push(P)},!1),D.addEventListener("tab.remove",B=>{var N;const P=c.val.findIndex(O=>O.name==B.detail.tabName);P>0&&((N=c.val[P].exit)==null||N.call(),c.val.splice(P,1))},!1),D}}const ss=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=ve(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>r(s)},is=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=ve(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>r({variant:"outline",color:"neutral"})},cs=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ls=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=ve(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>r({variant:"outline",color:"success"})},us=`import tabs from "@grucloud/bau-ui/tabs";
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
`,tn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},ds=e=>{const{css:t}=e,n=ve(e,{tabDefs:tn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},ps=`import tabs from "@grucloud/bau-ui/tabs";
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
`,ms=e=>{const{css:t}=e,n=tn(e),o=ve(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
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
`,hs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:cs,createComponent:is},{title:"Extended Tabs",description:"An extended tabs.",code:us,createComponent:ls},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:ps,createComponent:ds},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:bs,createComponent:ms}],gridItem:ss},gs=e=>{const t=K(e);return()=>t(hs)};function Ae(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r}=n.tags;a`
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
  `;return function(...c){let[{...l},...m]=q(c);return r({...l,class:$("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...m)}}const fs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags;function d(g,S,C,A,D){return{name:g,calories:S,fat:C,carbs:A,protein:D}}const u=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],x=({name:g,calories:S})=>s(r(g),r({class:n`
            text-align: right;
          `},S)),y=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Ae(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(i(m("Basic Table"),y(),l(u.map(x)))))},vs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function xe(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const xs=[xe("Frozen yoghurt",159,6,24,4),xe("Ice cream sandwich",237,9,37,4.3),xe("Eclair",262,16,24,6),xe("Cupcake",305,3.7,67,4.3),xe("Gingerbread",356,16,49,3.9)],ws=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags,d=({name:y,calories:f})=>s(r(y),r({class:n`
            text-align: right;
          `},f)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),x=Ae(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(x(i(m("Table Dense"),u(),l(xs.map(d)))))},ys=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function we(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Es=[we("Frozen yoghurt",159,6,24,4),we("Ice cream sandwich",237,9,37,4.3),we("Eclair",262,16,24,6),we("Cupcake",305,3.7,67,4.3),we("Gingerbread",356,16,49,3.9)],Cs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags,d=({name:y,calories:f})=>s(r(y),r({class:n`
            text-align: right;
          `},f)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),x=Ae(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(x(i(m("Table Zebra"),u(),l(Es.map(d)))))},Ss=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,ks={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:vs,createComponent:fs},{title:"Dense",description:"A dense table.",code:ys,createComponent:ws},{title:"Zebra",description:"A zebra table.",code:Ss,createComponent:Cs}]},As=e=>{const t=K(e);return()=>t(ks)};function nn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=Le(e),s=J(e),i=je(e),c=o`
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
  `,l=({label:y,icon:f,...g})=>s({"aria-label":y,title:y,...g},f),m=({count:y,totalCount:f,page:g,rowsPerPage:S})=>a({class:"pages-numbers"},Number(g-1)*Number(S)+(y>0?1:0),"-",Math.min(g*S,f)," of ",f),d=({count:y,page:f,rowsPerPage:g})=>a({class:"pages-numbers"},(f-1)*g+(y>0?1:0),"-",f*g),u=y=>y<=1,x=(y,f,g)=>y>=Math.ceil(f/g);return function(...f){let[{count:g=0,totalCount:S=0,page:C=1,rowsPerPage:A=50,onPageChange:D,isLoading:B=!1,disableFirst:P=()=>u(C),disablePrevious:N=()=>u(C),disableNext:O=()=>x(C,S,A),disableLast:_=()=>x(C,S,A),...G},...X]=q(f);const L=Math.max(0,Math.ceil(S/A)),V=D({page:1}),W=D({page:C-1}),v=D({page:C+1}),E=D({page:L}),p=[{label:"First",icon:"⟪",onclick:V,disabled:P()},{label:"Previous",icon:"⟨",onclick:W,disabled:N()},{label:"Next",icon:"⟩",onclick:v,disabled:O()},{label:"Last",icon:"⟫",onclick:E,disabled:_()}];return a({...G,class:$("table-pagination",c,B&&"disabled",t==null?void 0:t.class,G==null?void 0:G.class)},i({class:"spinner",visibility:B,size:"md"}),S>0?m({count:g,totalCount:S,page:C,maxPages:L,rowsPerPage:A}):d({count:g,page:C,maxPages:L,rowsPerPage:A}),r({variant:"outline",color:"neutral"},p.map(h=>l({...h,variant:"outline",color:"neutral"}))))}}const Ts=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ms=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:s,thead:i,tbody:c}=t.tags,l=Ts(45),m=({name:C,email:A})=>r(a(C),a(A)),d=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=nn(e),x=Ae(e,{class:n`
      max-width: 650px;
    `}),y=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),g=t.derive(()=>y.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),S=({page:C})=>A=>{f.val.page=C};return()=>x(s(d(),()=>c(g.val.map(m))),()=>u({...f.val,onPageChange:S}))},Ds=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:s,thead:i,tbody:c,div:l}=t.tags,m=t.state(!1),d=t.state([]),u=t.state(""),x=t.derive(()=>d.val.length),y=t.state(1),f=t.state(10),g=t.derive(()=>d.val),S=_=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(_).toString()}`,C=({page:_})=>G=>{y.val=_,A(S({page:_,per_page:f.val}))};A(S({page:1,per_page:f.val}));async function A(_){try{m.val=!0;const G=await fetch(_,{});if(G.ok){const X=await G.json();d.val=X;return}throw G}catch(G){u.val=G.message}finally{m.val=!1}}const D=({name:_,description:G,stargazers_count:X})=>r(a(_),a(G),a({class:n`
            text-align: right;
          `},X)),B=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=nn(e),N=Ae(e,{class:n`
      min-width: 650px;
    `}),O=({message:_})=>l(_);return()=>N(()=>P({rowsPerPage:f.val,page:y.val,count:x.val,totalCount:-1,isLoading:m.val,onPageChange:C,disableNext:()=>!1}),s(B(),()=>u.val&&O({message:u.val}),()=>c(g.val.map(D))))},Is=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:r,h2:s,tr:i}=t.tags,c=Ms(e),l=Ds(e),m=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(i("Table Pagination")),r("Asynchronous Pagination"),m(l()),r("Simple Pagination"),m(c()))};function ze(e,t){const{bau:n,css:o,window:a}=e,{div:r}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:m="bottom-start",color:d="neutral",variant:u="outline",size:x="md",...y},...f]=q(c);const g=r({class:$("container",...m.split("-"))},r({class:$("content",d,u,x),role:"tooltip"},l)),S=N=>`move-to-${N}`,C=(N,O,_)=>{if(N()){const G=S(O);g.classList.add(G),g.classList.add(O),g.classList.remove(_)}},A=(N,O)=>{const _=S(N);g.classList.contains(_)&&(g.classList.remove(_),g.classList.add(O),g.classList.remove(N))},D=N=>{const O=g.getBoundingClientRect();C(()=>O.x<0,"right","left"),C(()=>O.x+O.width>a.innerWidth,"left","right"),C(()=>O.y<0,"bottom","top"),C(()=>O.bottom>a.innerHeight,"top","bottom"),g.classList.add("visible")},B=N=>{g.classList.remove("visible"),A("right","left"),A("left","right"),A("bottom","top"),A("top","bottom")};return r({...y,class:$("tooltip",s,t==null?void 0:t.class,y==null?void 0:y.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",D),N.addEventListener("mouseout",B)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",D),N.removeEventListener("mouseout",B)}},...f,g)}}const $s=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r}=t.tags,s=J(e),i=ze(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",r("tooltip")," can be any component"));return l=>i({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Ns=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,r=J(e),s=ze(e),i=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:i()},r("tooltip"))},_s=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Bs=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r}=t.tags,s=J(e),i=ze(e),c=()=>o(a("A ",r("tooltip")," can be any component")),l=()=>[o({class:n`
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
        `},i({side:"bottom-start",titleEl:c()},s("bottom start")),i({side:"bottom-centered",titleEl:c()},s("bottom centered")),i({side:"bottom-end",titleEl:c()},s("bottom end")))];return()=>l()},Os=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Rs={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:_s,createComponent:Ns},{title:"Grid",description:"Various tooltip position",code:Os,createComponent:Bs}],gridItem:$s},Ps=e=>{const t=K(e);return()=>t(Rs)},Ls=e=>{const t=_e(e);return n=>t(n)},js=e=>{const{bau:t}=e,{section:n}=t.tags,o=_e(e);return()=>n(o({}))},zs=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Hs={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:zs,createComponent:js}],gridItem:Ls},Gs=e=>{const t=K(e);return()=>t(Hs)},Us=({css:e,createGlobalStyles:t})=>(t`
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
    `});function pt(e,t){const{bau:n,css:o,createGlobalStyles:a,window:r}=e,{renderMenuItem:s}=t,{ul:i,li:c,nav:l,div:m}=n.tags,d=Us({css:o,createGlobalStyles:a}),u=({element:g,closeState:S})=>{g.scrollHeight!=0&&(S.val?x(g):y(g))};function x(g){g.style.height=g.scrollHeight+"px";const S=()=>{g.removeEventListener("transitionend",S)};g.addEventListener("transitionend",S),r.requestAnimationFrame(()=>{g.style.height="0px"})}function y(g){const S=()=>{g.removeEventListener("transitionend",S),g.style.height=null};g.addEventListener("transitionend",S),g.style.height=g.scrollHeight+"px"}const f=({depth:g=1,maxDepth:S,color:C,variant:A,size:D})=>B=>{const{children:P,expanded:N}=B,O=n.state(!N);return c({class:()=>$(P?O.val?d.collapsed:d.expanded:"")},m({class:o`
              cursor: pointer;
            `,onclick:_=>{P&&(O.val=!O.val)}},s(B.data)),P&&g<S&&i({class:$(C,D),bauMounted:({element:_})=>{O.val&&(_.style.height="0px")},"aria-expanded":({element:_})=>(u({element:_,closeState:O}),!O.val)},P.map(f({depth:g+1,maxDepth:S}))))};return function({tree:S,maxDepth:C=1/0,size:A="md",variant:D="plain",color:B="neutral",...P}){return l({class:$(d.nav,A,D,B,t==null?void 0:t.class,P.class)},S.children&&i(S.children.map(f({maxDepth:C,color:B,variant:D,size:A}))))}}const Fs=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=pt(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)});return s=>r({...s,tree:o})},Ws=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=pt(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)});return()=>r({tree:o})},Vs=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Xs={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Vs,createComponent:Ws}],gridItem:Fs},Zs=e=>{const t=K(e);return()=>t(Xs)};function Ks(e,t={}){const{bau:n,css:o}=e,{div:a,span:r,pre:s,h3:i,h4:c}=n.tags;return function(m,...d){return a("Login")}}const Ys=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:r,h2:s}=n.tags,i=Ks(e);return()=>o({id:"login"},s(t("Login Examples")),r("Basic"),a(i()))};function qs(e){const{tr:t,bau:n,css:o}=e,{div:a,article:r,h1:s}=n.tags;return function(){return a({class:o`
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
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},ei.map(i)))},ni=`import list from "@grucloud/bau-ui/list";
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
`,oi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ni,createComponent:ti}],gridItem:Qs},ai=e=>{const t=K(e);return()=>t(oi)},ri=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:r,h1:s,span:i,p:c,ul:l,li:m,a:d,main:u,header:x,footer:y,label:f}=t.tags,{svg:g,use:S}=t.tagsNS("http://www.w3.org/2000/svg"),C=Jt(e),A=Qt(e),D=Se(e),B=nt(e),P=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],N=b=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.label),i(b.code)),O=et(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),_=ot(e),G={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},X=at(e),L=J(e),V=Le(e),W=rt(e),v=it(e),E=st(e),p={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},h=Be(e,{base:o.base+"/components"}),w=({disabled:b})=>r({class:$(n`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,b&&n`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},g({width:100,height:100,fill:"currentColor"},S({href:"uploadIcon.svg#Capa_1"})),i("Choose a file to upload")),I=ct(e),T=Pe(e),H=lt(e),R=()=>u(Array(10).fill("").map((b,ee)=>c(ee+1,". Some text here"))),z=b=>{const ee=H({id:"my-dialog",...b},x("Header"),R(),y(L({...b,variant:"outline",onclick:()=>{ee.close()}},"Cancel"),L({...b,variant:"solid",onclick:()=>{ee.close()}},"OK")));return ee},j=ut(e),F=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Q=b=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.label),i(b.code)),re=ke(e),pe=je(e),Te=dt(e),He=ve(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(c("My tab Disabled"))}]}),Ge=_e(e),me=()=>i("My tooltip"),Me=ze(e),ae={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},Ue=pt(e,{renderMenuItem:({name:b,href:ee})=>d({href:ee,onclick:te=>{te.preventDefault()}},b)}),be=[{name:"Accordion",Item:b=>A({...b})},{name:"Alert",Item:b=>D({...b},`Alert ${b.color}`)},{name:"Autocomplete",Item:b=>B({...b,options:P,Option:N,getOptionLabel:({label:ee})=>ee,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:b=>O({...b,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(b,{index:ee})=>_({...b,content:`${ee*100}`},"☏")},{name:"Breadcrumbs",Item:b=>X({...b,...G})},{name:"Button",Item:b=>L({...b},`${b.variant} ${b.color}`)},{name:"Button Group",Item:b=>V({...b},["ONE","TWO","THREE"].map(ee=>L(b,ee)))},{name:"Calendar",Item:b=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},f(`${b.color} ${b.variant}`,W({...b})))},{name:"Checkbox",Item:b=>f({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${b.color} ${b.variant}`,v({id:`myCheckbox-gallery-${b.color}-${b.variant}`,name:`myCheckbox-gallery-${b.color}-${b.variant}`,...b}))},{name:"Chip",Item:b=>E({...b},`Chip ${b.color}`)},{name:"DrillDown Menu",Item:b=>h({tree:p,...b})},{name:"File Input",Item:b=>I({Component:w,name:"file",accept:"text/*",onchange,...b})},{name:"Input",Item:b=>T({name:"my-input",id:"my-input-with",placeholder:"Enter text",...b})},{name:"Modal",Item:b=>{const ee=z(b);return r(L({...b,onclick:()=>{ee.showModal()}},"OPEN MODAL"),ee)}},{name:"Select",Item:b=>r(j({...b,options:F,Option:Q,getOptionLabel:({label:ee})=>ee,label:"Select a country..."}))},{name:"Slider",Item:b=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},f(`${b.color} ${b.variant}`,re({...b,id:`my-slider-${b.color}-${b.variant}`})))},{name:"Spinner",Item:b=>pe(b)},{name:"Switch",Item:b=>r({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},f("off",Te({...b,id:`mySwitch-off-${b.color}-${b.variant}`})),f("on",Te({...b,id:`mySwitch-on-${b.color}-${b.variant}`,checked:!0})))},{name:"Tabs",Item:b=>He(b)},{name:"Theme Switch",Item:b=>Ge(b)},{name:"Tooltip",Item:b=>Me({titleEl:me(),...b},L(b,`${b.color} ${b.variant}`))},{name:"Tree View",Item:b=>Ue({...b,tree:ae})}];return()=>a(s("Bau Component Gallery"),c("This page displays the components with various colors and variants."),l({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},be.map(({name:b})=>m(L({color:"primary",variant:"solid",href:`#${b}`},b)))),be.map(b=>r({id:b.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},C(b))))},si=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Pn(e)})},{path:"components",action:()=>({title:"Component",component:ri(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Vo(e)})},{path:"alert",action:()=>({title:"Alert",component:na(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:ia(e)})},{path:"animate",action:()=>({title:"Animate",component:la(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:ya(e)})},{path:"avatar",action:()=>({title:"Avatar",component:ba(e)})},{path:"badge",action:()=>({title:"Badge",component:Aa(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:$a(e)})},{path:"button",action:()=>({title:"Button",component:Ra(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ga(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Xa(e)})},{path:"chip",action:()=>({title:"Chip",component:Ja(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:or(e)})},{path:"drawer",action:()=>({title:"Drawer",component:cr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:mr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:vr(e)})},{path:"input",action:()=>({title:"Input",component:Cr(e)})},{path:"list",action:()=>({title:"List",component:ai(e)})},{path:"modal",action:()=>({title:"Modal",component:Mr(e)})},{path:"popover",action:()=>({title:"Popover",component:Nr(e)})},{path:"select",action:()=>({title:"Select",component:Lr(e)})},{path:"slider",action:()=>({title:"Slider",component:Xr(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Jr(e)})},{path:"switch",action:()=>({title:"Switch",component:as(e)})},{path:"table",action:()=>({title:"Table",component:As(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Is(e)})},{path:"tabs",action:()=>({title:"Tabs",component:gs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ps(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Gs(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Zs(e)})}]},{path:"pages",action:t=>({title:"Pages",component:qs(e)})}],ii=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ci=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=e,s=a.state(),i=t({componentState:s});return document.getElementById("app").replaceChildren(i),({router:l})=>{const m=o.location.pathname.replace(n,""),{title:d,component:u,Layout:x=t}=l.resolve({pathname:m});r.pathname.val=m,s.val=u,document.title=`${d}`}},li=e=>{const{createGlobalStyles:t}=e;fn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  `};vn();const mt={title:"Bau",base:"/bau/bau-ui"},ce=An({config:mt}),{bau:Dt}=ce;ce.states={pathname:Dt.state(window.location.pathname.replace(mt.base,"")),drawerOpen:Dt.state(!0)};li(ce);ui(ce);ln({routes:si({context:ce}),onLocationChange:ci({context:ce,LayoutDefault:Bn(ce),config:mt}),notFoundRoute:ii(ce)});
