(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const vn=(e,t)=>({...e,paths:[...t,e.path]}),vt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=vn(o,e);return n?[a,...vt({paths:[...e,o.path],routes:n})]:a}),xn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},wn=({routes:e=[],notFoundRoute:t})=>{const n=vt({routes:e}).map(o=>({...o,regex:xn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function yn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=wn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,s,r)=>{a.apply(s,r),n({router:o})}}),document.addEventListener("click",a=>{const{target:s}=a,r=s.getAttribute("href");s.tagName==="A"&&r&&!r.startsWith("http")&&!r.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,r),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const xt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],En=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Cn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ot=e=>`var(--color-${e})`,Sn=e=>`var(--color-${e}-lightest)`,kn=()=>xt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${ot(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${Sn(e)};
}
.solid.${e} {
  background-color: ${ot(e)};
}
`).join(`
`),An=e=>100-e*10,Tn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${An(t)}%);`).join(`
`),wt=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),Mn=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...En.map(([a,s])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),...Cn.map(([a,s])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${s}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Dn({createGlobalStyles:e},{colorPalette:t=xt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>Mn([n,o])).join(`
`)}
      ${Tn()}
      ${wt({})}
      ${kn()}
      
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
  `}function In(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let He=e=>Object.prototype.toString.call(e??0).slice(8,-1),$n=e=>He(e)=="Object",at=e=>He(e)=="Function",Le=e=>["Object","Array"].includes(He(e)),rt=Object.getPrototypeOf,je=e=>pe(e)?e.val:e,pe=e=>e==null?void 0:e.__isState,Nn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const q=e=>!pe(e[0])&&$n(e[0])?e:[{},...e];function _n(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,s=new Set,r=!1,i,c=b=>n.createElement(b),l=(b,y,m)=>{let h=i;i=y;let x=b(m);return i=h,x},p=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(b=>{b.bindings=b.bindings.filter(y=>{var m;return(m=y.element)==null?void 0:m.isConnected}),!b.bindings.length&&!b.computed&&a.delete(b)}),o=void 0}))},d=(b,y,m,h,x,$)=>{var A;if(r){s.add(b);return}for(let U of b.bindings){let{deps:R,element:j,renderInferred:P,render:V,renderItem:Q}=U;if(Q&&y)(A=w(j,h,(...ae)=>g(Q(...ae)),m,x,$)[y])==null||A.call();else{let ae=P?P({element:j}):V({element:j,renderItem:Q})(...R.map(je));ae!==j&&j.replaceWith(U.element=g(ae))}}k(b),p()},u=(b,y,m=[])=>({get(h,x,$){var A;if(i==null||i.add(b),x==="_isProxy")return!0;if(!((A=h[x])!=null&&A._isProxy)&&!pe(h[x])&&Le(h[x]))h[x]=new Proxy(h[x],u(b,y,[...m,x]));else if(Nn.includes(x)){let U=h[x];return(...R)=>{let j=U.apply(h,R);return d(b,x,j,R,y,m),j}}return Reflect.get(h,x,$)},set(h,x,$,A){let U=Reflect.set(h,x,$,A);return d(b,"setItem",U,{prop:x,value:$},y,[...m,x]),U}}),v=(b,y)=>new Proxy(y,u(b,y)),w=(b,y,m,h,x,$)=>{let A=()=>b.replaceChildren(...ke(h,m)),U=R=>b[R]&&b.removeChild(b[R]);return{assign:A,sort:A,reverse:A,setItem:()=>{var j;let R=$[0];(j=b.children[R])==null||j.replaceWith(m(x[R],R))},push:()=>b.append(...ke(y,(R,j)=>m(R,x.length+j))),unshift:()=>b.prepend(...ke(y,m)),pop:()=>U("lastChild"),shift:()=>U("firstChild"),splice:()=>{let[R,j,...P]=y;const{length:V}=b.children;for(let Q=R>=0?Math.min(R+j-1,V-1):V-1;Q>=(R>=0?R:V+R);Q--)b.children[Q].remove();if(P.length){let Q=P.forEach((ae,Ee)=>m(ae,R+Ee));b.children[R]?b.children[R].after(...Q):b.append(...Q)}}}},f=b=>({oldVal:b,bindings:[],listeners:[],__isState:!0,get val(){let y=this;return i==null||i.add(y),y.valProxy??(y.valProxy=Le(b)?v(y,b):b,y.valProxy)},set val(y){let m=this,h=m.val;Le(y)?(m.valProxy=v(m,y),d(m,"assign",y)):y!==h&&(m.valProxy=y,d(m)),m.oldVal=h}}),g=b=>b==null||b===!1?c("span"):b.nodeType?b:n.createTextNode(b),C=(b,y)=>{let m=new Set;return y.val=l(b,m),m},E=b=>{let y=f(),m=C(b,y);y.computed=!0;for(let h of m)h.listeners.push({computed:b,deps:m,state:y});return y},k=b=>{for(let y of[...b.listeners])C(y.computed,y.state)},M=(b,...y)=>{if(y.length){let m=[];for(let h of y.flat(1/0))h!=null&&m.push(pe(h)?H({deps:[h],render:()=>x=>x}):at(h)?X({renderInferred:h}):g(h));b.append(...m)}},_={},O=(b,y)=>b&&(Object.getOwnPropertyDescriptor(b,y)??O(rt(b),y)),I=(b,y,m)=>{var h;return _[b+","+y]??(_[b+","+y]=((h=O(m,y))==null?void 0:h.set)??0)},B=(b,y)=>new MutationObserver((m,h)=>{m.filter(x=>x.removedNodes).forEach(x=>[...x.removedNodes].find($=>$===b&&(y({element:b}),h.disconnect(),!0)))}).observe(b.parentNode,{childList:!0}),N=b=>new Proxy(function(m,...h){var U;let[x,...$]=q(h),A=b?n.createElementNS(b,m):c(m);for(let[R,j]of Object.entries(x)){if(R.startsWith("bau"))continue;let P=I(m,R,rt(A))?V=>A[R]=V:V=>A.setAttribute(R,V);j==null||(pe(j)?H({deps:[j],render:()=>()=>(P(j.val),A)}):at(j)&&(!R.startsWith("on")||j.isDerived)?X({renderInferred:()=>(P(j({element:A})),A)}):j.renderProp?H({deps:j.deps,render:()=>()=>(P(j.renderProp({element:A})(...j.deps.map(je))),A)}):P(j))}return M(A,...$),(U=x.bauCreated)==null||U.call(x,{element:A}),x.bauMounted&&t.requestAnimationFrame(()=>x.bauMounted({element:A})),x.bauUnmounted&&t.requestAnimationFrame(()=>B(A,x.bauUnmounted)),A},{get:(y,m)=>y.bind(void 0,m)}),z=(b,y,m)=>{b.element=g(m);for(let h of y)pe(h)&&(a.add(h),h.bindings.push(b));return b.element},X=({renderInferred:b,element:y})=>{let m=new Set,h=l(b,m,{element:y});return z({renderInferred:b},m,h)},H=({deps:b,element:y,render:m,renderItem:h})=>z({deps:b,render:m,renderItem:h},b,m({element:y,renderItem:h})(...b.map(je))),W=(b,y,m)=>H({deps:[b],render:({renderItem:h})=>x=>(y.append(...ke(x,h)),y),renderItem:m}),F=b=>{r=!0,b(),r=!1,s.forEach(d),s.clear()};return{tags:N(),tagsNS:N,state:f,bind:H,loop:W,derive:E,stateSet:a,batch:F}}const Bn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},On=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},Rn=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function Pn(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...s)=>{const r=Rn(a,s),i=Bn(r);return!t.getElementById(i)&&On(t,e==null?void 0:e.target,i,o(i,r)),i};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Ln(e){return{bau:_n(),...Pn(),tr:n=>n,window,...e}}function D(...e){return e.filter(t=>t).join(" ")}function J(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...r){let[{color:i,variant:c,size:l="md",disabled:p,href:d,...u},...v]=q(r);return(d?n.tags.a:n.tags.button)({...u,class:D("button",a.root,c,l,i,d?a.a:a.button,p&&a.disabled,t==null?void 0:t.class,u.class),disabled:p,href:d,...!d&&{type:"button"}},v)}}const ne=["neutral","primary","success","danger","warning"],jn=["plain","outline","solid"],zn="light",Hn=()=>ne.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Me(e,t){const{bau:n,css:o,window:a}=e,{input:s}=n.tags,r=p=>{a.document.documentElement.setAttribute("data-theme",p),localStorage.setItem("theme",p)},i=()=>{try{return localStorage.getItem("theme")}catch{}},c=i();c?r(c):a.matchMedia("(prefers-color-scheme: dark)").matches?r("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?r("light"):r(zn);const l=o`
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
    ${Hn()}
  `;return function(...d){let[{color:u,variant:v="outline",size:w="md",...f},...g]=q(d);return s({required:"required",title:"Switch Theme",...f,class:D("theme-switch",u,v,w,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:i()=="dark",onclick:C=>{r(C.target.checked?"dark":"light")}},...g)}}function Un(e){const{tr:t,bau:n,css:o,config:a,states:s}=e,{i:r,header:i,h1:c,div:l,a:p,img:d,b:u,ul:v,li:w}=n.tags,{svg:f,path:g}=n.tagsNS("http://www.w3.org/2000/svg"),C=s.drawerOpen,E=J(e,{class:o`
      background: transparent;
    `}),k=Me(e),M=()=>r(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},g({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),_=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>C.val=!C.val},M()),p({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),O=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},k(),E({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},_(),O())}}function Gn({tr:e,bau:t,css:n}){const{footer:o,span:a,a:s,ul:r,li:i,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.41.0"))}}function yt(e,t={}){return function({parent:o,animationHide:a,animationShow:s},r){r.style.animation=s;const i=()=>{r.removeEventListener("animationend",i),r.style.animation=""};return r.addEventListener("animationend",i),new MutationObserver((c,l)=>{c.filter(p=>p.removedNodes).forEach(p=>[...p.removedNodes].find(d=>{o.style.position="relative";const u=d.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=a,p.previousSibling?p.previousSibling.after(u):p.nextSibling?p.nextSibling.before(u):p.target&&p.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),l.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),r}}function ve(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,r=o`
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
    ${(()=>ne.map(i=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:p="plain",size:d,...u},...v]=q(c);return a({...u,class:D("list",r,l,p,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const st="0.3s",Et=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,s=structuredClone(a);return s.children=o==null?void 0:o.map(Et({parent:n,grandParent:e})),e&&(e.parentTree=t),s.parentTree=e,s},Ct=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=Ct(e)(t.children[o]);if(a)return a}},Fn=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function De(e,t){const{bau:n,css:o,window:a}=e,{base:s=""}=t,r=({currentTree:H,data:W,onclickBack:F})=>g(M({variant:"plain",href:`${s}${H.parentTree.children[0].data.href}`,onclick:F({currentTree:H}),class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),M({variant:"plain",href:`${s}${W.href}`,class:o`
            flex-grow: 1;
          `},W.name)),i=({data:{name:H,href:W},children:F=[]})=>M({href:`${s}${W}`,"data-ischild":F.length==0},H),c=({subTree:H})=>{var W;return a.location.pathname.replace(s,"")===((W=H==null?void 0:H.data)==null?void 0:W.href)},{renderHeader:l=r,renderMenuItem:p=i,isActive:d=c}=t,{ul:u,li:v,nav:w,div:f,header:g,a:C}=n.tags,E=yt(),k=ve(e),M=J(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:_,hideToRight:O,showFromRight:I,showFromLeft:B}=Fn(e),N=o`
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
  `,z=({variant:H,color:W,size:F,onclickItem:b,onclickBack:y,currentTree:m,pathnameState:h})=>{const{children:x,parentTree:$,data:A}=m;return f({class:D("drillDownMenu",H,W,F)},$&&l({data:A,currentTree:m,onclickBack:y}),x&&k({class:D(H,W,F)},x.map(U=>v({class:()=>D(U.children&&"has-children",d({pathname:h.val,subTree:U})&&"active"),onclick:U.children&&b({currentTree:U})},p(U)))))},X=({tree:H,pathname:W})=>{let F=Et({})(H),b=Ct(W)(F);return b||(console.log("drilldown no sub tree",W),b=F),b};return function(W){const{variant:F="plain",color:b="neutral",size:y="md",tree:m,pathnameState:h=n.state(a.location.pathname),...x}=W,$=({currentTree:j})=>P=>U(P,R,j,!0),A=({currentTree:j})=>P=>U(P,R,j.parentTree,!1),U=(j,P,V,Q)=>{P.firstChild.replaceChildren(E({parent:P,animationHide:`${Q?_:O} ${st}`,animationShow:`${Q?I:B} ${st}`},z({variant:F,color:b,size:y,currentTree:V,onclickItem:$,onclickBack:A,pathnameState:h})))},R=w({class:D(N,t==null?void 0:t.class,x.class)},()=>z({variant:F,color:b,size:y,currentTree:X({tree:m,pathname:h.val}),onclickItem:$,onclickBack:A,pathnameState:h}));return R}}const Wn={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function St(e){const{tr:t,bau:n,css:o,config:a,states:s,window:r}=e,{div:i,ul:c,li:l,nav:p,a:d,span:u}=n.tags;let v=!1;const w=De(e,{base:a.base});return function(){return i({bauMounted:({element:g})=>{r.innerWidth<=640&&(v=!0,s.drawerOpen.val=!1)},onclick:g=>{v&&!g.target.dataset.buttonback&&!g.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:D(o`
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
          `)},w({tree:Wn,pathnameState:s.pathname}))}}const Vn=e=>{const{bau:t,css:n,states:o}=e,{div:a}=t.tags,s=Un(e),r=St(e),i=Gn(e);return function({componentState:l}){return a({class:n`
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
        `},s(),r(),a({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>l.val&&l.val({})),i())}};function Xn(e){const{bau:t,css:n,config:o}=e,{div:a,h1:s,h2:r,p:i}=t.tags;J(e);const c=n`
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
  `;return function({name:p,text:d,tagLine:u}){return a({class:c},s(p),r(d),i(u))}}function Zn(e){const{bau:t,css:n}=e,{div:o,h1:a,p:s}=t.tags,r=n`
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
  `,i=({title:c,Content:l})=>o({className:"feature"},a(c),s(l()));return function({featuresContent:l}){return o({class:r},l.map(i))}}function Kn(e){const{bau:t,css:n,config:o}=e,{div:a,p:s,a:r}=t.tags,i=Xn(e),c=Zn(e),l=J(e),p=n``,d=[{title:"UI components for the web",Content:()=>[s("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),s("3 variant: plain, outline and primary"),s("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[s("Built with ",r({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[s("The component bundle size is about 8x smaller compared to popular React UI component library."),s("Faster download time for users."),s("Save in bandwith fees for the operator."),s("Suitable for low bandwith network and low cost device.")]}];return function({}){return a({class:p},i({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:d}))}}function Yn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function kt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&kt(n)}),e}class it{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function At(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function se(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const qn="</span>",ct=e=>!!e.scope,Jn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Qn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=At(t)}openNode(t){if(!ct(t))return;const n=Jn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){ct(t)&&(this.buffer+=qn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const lt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Ue{constructor(){this.rootNode=lt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=lt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Ue._collapse(n)}))}}class eo extends Ue{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Qn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function ge(e){return e?typeof e=="string"?e:e.source:null}function Tt(e){return ue("(?=",e,")")}function to(e){return ue("(?:",e,")*")}function no(e){return ue("(?:",e,")?")}function ue(...e){return e.map(n=>ge(n)).join("")}function oo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Ge(...e){return"("+(oo(e).capture?"":"?:")+e.map(o=>ge(o)).join("|")+")"}function Mt(e){return new RegExp(e.toString()+"|").exec("").length-1}function ao(e,t){const n=e&&e.exec(t);return n&&n.index===0}const ro=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Fe(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let s=ge(o),r="";for(;s.length>0;){const i=ro.exec(s);if(!i){r+=s;break}r+=s.substring(0,i.index),s=s.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?r+="\\"+String(Number(i[1])+a):(r+=i[0],i[0]==="("&&n++)}return r}).map(o=>`(${o})`).join(t)}const so=/\b\B/,Dt="[a-zA-Z]\\w*",We="[a-zA-Z_]\\w*",It="\\b\\d+(\\.\\d+)?",$t="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Nt="\\b(0b[01]+)",io="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",co=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ue(t,/.*\b/,e.binary,/\b.*/)),se({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},fe={begin:"\\\\[\\s\\S]",relevance:0},lo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[fe]},uo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[fe]},po={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ie=function(e,t,n={}){const o=se({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Ge("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ue(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},mo=Ie("//","$"),bo=Ie("/\\*","\\*/"),ho=Ie("#","$"),go={scope:"number",begin:It,relevance:0},fo={scope:"number",begin:$t,relevance:0},vo={scope:"number",begin:Nt,relevance:0},xo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[fe,{begin:/\[/,end:/\]/,relevance:0,contains:[fe]}]}]},wo={scope:"title",begin:Dt,relevance:0},yo={scope:"title",begin:We,relevance:0},Eo={begin:"\\.\\s*"+We,relevance:0},Co=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Ae=Object.freeze({__proto__:null,MATCH_NOTHING_RE:so,IDENT_RE:Dt,UNDERSCORE_IDENT_RE:We,NUMBER_RE:It,C_NUMBER_RE:$t,BINARY_NUMBER_RE:Nt,RE_STARTERS_RE:io,SHEBANG:co,BACKSLASH_ESCAPE:fe,APOS_STRING_MODE:lo,QUOTE_STRING_MODE:uo,PHRASAL_WORDS_MODE:po,COMMENT:Ie,C_LINE_COMMENT_MODE:mo,C_BLOCK_COMMENT_MODE:bo,HASH_COMMENT_MODE:ho,NUMBER_MODE:go,C_NUMBER_MODE:fo,BINARY_NUMBER_MODE:vo,REGEXP_MODE:xo,TITLE_MODE:wo,UNDERSCORE_TITLE_MODE:yo,METHOD_GUARD:Eo,END_SAME_AS_BEGIN:Co});function So(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ko(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Ao(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=So,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function To(e,t){Array.isArray(e.illegal)&&(e.illegal=Ge(...e.illegal))}function Mo(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Do(e,t){e.relevance===void 0&&(e.relevance=1)}const Io=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ue(n.beforeMatch,Tt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},$o=["of","and","for","in","not","or","if","then","parent","list","value"],No="keyword";function _t(e,t,n=No){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(s){Object.assign(o,_t(e[s],t,s))}),o;function a(s,r){t&&(r=r.map(i=>i.toLowerCase())),r.forEach(function(i){const c=i.split("|");o[c[0]]=[s,_o(c[0],c[1])]})}}function _o(e,t){return t?Number(t):Bo(e)?0:1}function Bo(e){return $o.includes(e.toLowerCase())}const ut={},le=e=>{console.error(e)},dt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},de=(e,t)=>{ut[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),ut[`${e}/${t}`]=!0)},Te=new Error;function Bt(e,t,{key:n}){let o=0;const a=e[n],s={},r={};for(let i=1;i<=t.length;i++)r[i+o]=a[i],s[i+o]=!0,o+=Mt(t[i-1]);e[n]=r,e[n]._emit=s,e[n]._multi=!0}function Oo(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw le("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Te;if(typeof e.beginScope!="object"||e.beginScope===null)throw le("beginScope must be object"),Te;Bt(e,e.begin,{key:"beginScope"}),e.begin=Fe(e.begin,{joinWith:""})}}function Ro(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw le("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Te;if(typeof e.endScope!="object"||e.endScope===null)throw le("endScope must be object"),Te;Bt(e,e.end,{key:"endScope"}),e.end=Fe(e.end,{joinWith:""})}}function Po(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Lo(e){Po(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Oo(e),Ro(e)}function jo(e){function t(r,i){return new RegExp(ge(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,i]),this.matchAt+=Mt(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(c=>c[1]);this.matcherRe=t(Fe(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(i);if(!c)return null;const l=c.findIndex((d,u)=>u>0&&d!==void 0),p=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,p)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const c=new n;return this.rules.slice(i).forEach(([l,p])=>c.addRule(l,p)),c.compile(),this.multiRegexes[i]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,c){this.rules.push([i,c]),c.type==="begin"&&this.count++}exec(i){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(i);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const p=this.getMatcher(0);p.lastIndex=this.lastIndex+1,l=p.exec(i)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(r){const i=new o;return r.contains.forEach(c=>i.addRule(c.begin,{rule:c,type:"begin"})),r.terminatorEnd&&i.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&i.addRule(r.illegal,{type:"illegal"}),i}function s(r,i){const c=r;if(r.isCompiled)return c;[ko,Mo,Lo,Io].forEach(p=>p(r,i)),e.compilerExtensions.forEach(p=>p(r,i)),r.__beforeBegin=null,[Ao,To,Do].forEach(p=>p(r,i)),r.isCompiled=!0;let l=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),l=r.keywords.$pattern,delete r.keywords.$pattern),l=l||/\w+/,r.keywords&&(r.keywords=_t(r.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),i&&(r.begin||(r.begin=/\B|\b/),c.beginRe=t(c.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(c.endRe=t(c.end)),c.terminatorEnd=ge(c.end)||"",r.endsWithParent&&i.terminatorEnd&&(c.terminatorEnd+=(r.end?"|":"")+i.terminatorEnd)),r.illegal&&(c.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(p){return zo(p==="self"?r:p)})),r.contains.forEach(function(p){s(p,c)}),r.starts&&s(r.starts,i),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=se(e.classNameAliases||{}),s(e)}function Ot(e){return e?e.endsWithParent||Ot(e.starts):!1}function zo(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return se(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ot(e)?se(e,{starts:e.starts?se(e.starts):null}):Object.isFrozen(e)?se(e):e}var Ho="11.8.0";class Uo extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const ze=At,pt=se,mt=Symbol("nomatch"),Go=7,Rt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:eo};function c(m){return i.noHighlightRe.test(m)}function l(m){let h=m.className+" ";h+=m.parentNode?m.parentNode.className:"";const x=i.languageDetectRe.exec(h);if(x){const $=N(x[1]);return $||(dt(s.replace("{}",x[1])),dt("Falling back to no-highlight mode for this block.",m)),$?x[1]:"no-highlight"}return h.split(/\s+/).find($=>c($)||N($))}function p(m,h,x){let $="",A="";typeof h=="object"?($=m,x=h.ignoreIllegals,A=h.language):(de("10.7.0","highlight(lang, code, ...args) has been deprecated."),de("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),A=m,$=h),x===void 0&&(x=!0);const U={code:$,language:A};b("before:highlight",U);const R=U.result?U.result:d(U.language,U.code,x);return R.code=U.code,b("after:highlight",R),R}function d(m,h,x,$){const A=Object.create(null);function U(S,T){return S.keywords[T]}function R(){if(!L.keywords){ee.addText(Y);return}let S=0;L.keywordPatternRe.lastIndex=0;let T=L.keywordPatternRe.exec(Y),G="";for(;T;){G+=Y.substring(S,T.index);const Z=oe.case_insensitive?T[0].toLowerCase():T[0],te=U(L,Z);if(te){const[re,gn]=te;if(ee.addText(G),G="",A[Z]=(A[Z]||0)+1,A[Z]<=Go&&(Se+=gn),re.startsWith("_"))G+=T[0];else{const fn=oe.classNameAliases[re]||re;V(T[0],fn)}}else G+=T[0];S=L.keywordPatternRe.lastIndex,T=L.keywordPatternRe.exec(Y)}G+=Y.substring(S),ee.addText(G)}function j(){if(Y==="")return;let S=null;if(typeof L.subLanguage=="string"){if(!t[L.subLanguage]){ee.addText(Y);return}S=d(L.subLanguage,Y,!0,nt[L.subLanguage]),nt[L.subLanguage]=S._top}else S=v(Y,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(Se+=S.relevance),ee.__addSublanguage(S._emitter,S.language)}function P(){L.subLanguage!=null?j():R(),Y=""}function V(S,T){S!==""&&(ee.startScope(T),ee.addText(S),ee.endScope())}function Q(S,T){let G=1;const Z=T.length-1;for(;G<=Z;){if(!S._emit[G]){G++;continue}const te=oe.classNameAliases[S[G]]||S[G],re=T[G];te?V(re,te):(Y=re,R(),Y=""),G++}}function ae(S,T){return S.scope&&typeof S.scope=="string"&&ee.openNode(oe.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(V(Y,oe.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),Y=""):S.beginScope._multi&&(Q(S.beginScope,T),Y="")),L=Object.create(S,{parent:{value:L}}),L}function Ee(S,T,G){let Z=ao(S.endRe,G);if(Z){if(S["on:end"]){const te=new it(S);S["on:end"](T,te),te.isMatchIgnored&&(Z=!1)}if(Z){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return Ee(S.parent,T,G)}function dn(S){return L.matcher.regexIndex===0?(Y+=S[0],1):(Pe=!0,0)}function pn(S){const T=S[0],G=S.rule,Z=new it(G),te=[G.__beforeBegin,G["on:begin"]];for(const re of te)if(re&&(re(S,Z),Z.isMatchIgnored))return dn(T);return G.skip?Y+=T:(G.excludeBegin&&(Y+=T),P(),!G.returnBegin&&!G.excludeBegin&&(Y=T)),ae(G,S),G.returnBegin?0:T.length}function mn(S){const T=S[0],G=h.substring(S.index),Z=Ee(L,S,G);if(!Z)return mt;const te=L;L.endScope&&L.endScope._wrap?(P(),V(T,L.endScope._wrap)):L.endScope&&L.endScope._multi?(P(),Q(L.endScope,S)):te.skip?Y+=T:(te.returnEnd||te.excludeEnd||(Y+=T),P(),te.excludeEnd&&(Y=T));do L.scope&&ee.closeNode(),!L.skip&&!L.subLanguage&&(Se+=L.relevance),L=L.parent;while(L!==Z.parent);return Z.starts&&ae(Z.starts,S),te.returnEnd?0:T.length}function bn(){const S=[];for(let T=L;T!==oe;T=T.parent)T.scope&&S.unshift(T.scope);S.forEach(T=>ee.openNode(T))}let Ce={};function tt(S,T){const G=T&&T[0];if(Y+=S,G==null)return P(),0;if(Ce.type==="begin"&&T.type==="end"&&Ce.index===T.index&&G===""){if(Y+=h.slice(T.index,T.index+1),!a){const Z=new Error(`0 width match regex (${m})`);throw Z.languageName=m,Z.badRule=Ce.rule,Z}return 1}if(Ce=T,T.type==="begin")return pn(T);if(T.type==="illegal"&&!x){const Z=new Error('Illegal lexeme "'+G+'" for mode "'+(L.scope||"<unnamed>")+'"');throw Z.mode=L,Z}else if(T.type==="end"){const Z=mn(T);if(Z!==mt)return Z}if(T.type==="illegal"&&G==="")return 1;if(Re>1e5&&Re>T.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=G,G.length}const oe=N(m);if(!oe)throw le(s.replace("{}",m)),new Error('Unknown language: "'+m+'"');const hn=jo(oe);let Oe="",L=$||hn;const nt={},ee=new i.__emitter(i);bn();let Y="",Se=0,ce=0,Re=0,Pe=!1;try{if(oe.__emitTokens)oe.__emitTokens(h,ee);else{for(L.matcher.considerAll();;){Re++,Pe?Pe=!1:L.matcher.considerAll(),L.matcher.lastIndex=ce;const S=L.matcher.exec(h);if(!S)break;const T=h.substring(ce,S.index),G=tt(T,S);ce=S.index+G}tt(h.substring(ce))}return ee.finalize(),Oe=ee.toHTML(),{language:m,value:Oe,relevance:Se,illegal:!1,_emitter:ee,_top:L}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:m,value:ze(h),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:ce,context:h.slice(ce-100,ce+100),mode:S.mode,resultSoFar:Oe},_emitter:ee};if(a)return{language:m,value:ze(h),illegal:!1,relevance:0,errorRaised:S,_emitter:ee,_top:L};throw S}}function u(m){const h={value:ze(m),illegal:!1,relevance:0,_top:r,_emitter:new i.__emitter(i)};return h._emitter.addText(m),h}function v(m,h){h=h||i.languages||Object.keys(t);const x=u(m),$=h.filter(N).filter(X).map(P=>d(P,m,!1));$.unshift(x);const A=$.sort((P,V)=>{if(P.relevance!==V.relevance)return V.relevance-P.relevance;if(P.language&&V.language){if(N(P.language).supersetOf===V.language)return 1;if(N(V.language).supersetOf===P.language)return-1}return 0}),[U,R]=A,j=U;return j.secondBest=R,j}function w(m,h,x){const $=h&&n[h]||x;m.classList.add("hljs"),m.classList.add(`language-${$}`)}function f(m){let h=null;const x=l(m);if(c(x))return;if(b("before:highlightElement",{el:m,language:x}),m.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(m)),i.throwUnescapedHTML))throw new Uo("One of your code blocks includes unescaped HTML.",m.innerHTML);h=m;const $=h.textContent,A=x?p($,{language:x,ignoreIllegals:!0}):v($);m.innerHTML=A.value,w(m,x,A.language),m.result={language:A.language,re:A.relevance,relevance:A.relevance},A.secondBest&&(m.secondBest={language:A.secondBest.language,relevance:A.secondBest.relevance}),b("after:highlightElement",{el:m,result:A,text:$})}function g(m){i=pt(i,m)}const C=()=>{M(),de("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){M(),de("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function M(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(i.cssSelector).forEach(f)}function _(){k&&M()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",_,!1);function O(m,h){let x=null;try{x=h(e)}catch($){if(le("Language definition for '{}' could not be registered.".replace("{}",m)),a)le($);else throw $;x=r}x.name||(x.name=m),t[m]=x,x.rawDefinition=h.bind(null,e),x.aliases&&z(x.aliases,{languageName:m})}function I(m){delete t[m];for(const h of Object.keys(n))n[h]===m&&delete n[h]}function B(){return Object.keys(t)}function N(m){return m=(m||"").toLowerCase(),t[m]||t[n[m]]}function z(m,{languageName:h}){typeof m=="string"&&(m=[m]),m.forEach(x=>{n[x.toLowerCase()]=h})}function X(m){const h=N(m);return h&&!h.disableAutodetect}function H(m){m["before:highlightBlock"]&&!m["before:highlightElement"]&&(m["before:highlightElement"]=h=>{m["before:highlightBlock"](Object.assign({block:h.el},h))}),m["after:highlightBlock"]&&!m["after:highlightElement"]&&(m["after:highlightElement"]=h=>{m["after:highlightBlock"](Object.assign({block:h.el},h))})}function W(m){H(m),o.push(m)}function F(m){const h=o.indexOf(m);h!==-1&&o.splice(h,1)}function b(m,h){const x=m;o.forEach(function($){$[x]&&$[x](h)})}function y(m){return de("10.7.0","highlightBlock will be removed entirely in v12.0"),de("10.7.0","Please use highlightElement now."),f(m)}Object.assign(e,{highlight:p,highlightAuto:v,highlightAll:M,highlightElement:f,highlightBlock:y,configure:g,initHighlighting:C,initHighlightingOnLoad:E,registerLanguage:O,unregisterLanguage:I,listLanguages:B,getLanguage:N,registerAliases:z,autoDetection:X,inherit:pt,addPlugin:W,removePlugin:F}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Ho,e.regex={concat:ue,lookahead:Tt,either:Ge,optional:no,anyNumberOfTimes:to};for(const m in Ae)typeof Ae[m]=="object"&&kt(Ae[m]);return Object.assign(e,Ae),e},me=Rt({});me.newInstance=()=>Rt({});var Fo=me;me.HighlightJS=me;me.default=me;const bt=Yn(Fo),ht="[A-Za-z$_][0-9A-Za-z$_]*",Wo=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Vo=["true","false","null","undefined","NaN","Infinity"],Pt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Lt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],jt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Xo=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Zo=[].concat(jt,Pt,Lt);function Ko(e){const t=e.regex,n=(h,{after:x})=>{const $="</"+h[0].slice(1);return h.input.indexOf($,x)!==-1},o=ht,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(h,x)=>{const $=h[0].length+h.index,A=h.input[$];if(A==="<"||A===","){x.ignoreMatch();return}A===">"&&(n(h,{after:$})||x.ignoreMatch());let U;const R=h.input.substring($);if(U=R.match(/^\s*=/)){x.ignoreMatch();return}if((U=R.match(/^\s+extends\s+/))&&U.index===0){x.ignoreMatch();return}}},i={$pattern:ht,keyword:Wo,literal:Vo,built_in:Zo,"variable.language":Xo},c="[0-9](_?[0-9])*",l=`\\.(${c})`,p="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${p})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${p})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:i,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},w={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,w,f,g,{match:/\$\d+/},d];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:i,contains:["self"].concat(k)});const M=[].concat(E,u.contains),_=M.concat([{begin:/\(/,end:/\)/,keywords:i,contains:["self"].concat(M)}]),O={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:_},I={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Pt,...Lt]}},N={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},z={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[O],illegal:/%/},X={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function H(h){return t.concat("(?!",h.join("|"),")")}const W={match:t.concat(/\b/,H([...jt,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},b={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},O]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",m={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[O]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:i,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),N,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,w,f,g,E,{match:/\$\d+/},d,B,{className:"attr",begin:o+t.lookahead(":"),relevance:0},m,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},z,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[O,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[O]},W,X,I,b,{match:/\$[(.]/}]}}const zt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:s,tr:r,td:i,thead:c,th:l}=t.tags,p=["sm","md","lg"];return function({Item:u,name:v}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(r(l(v??"Variant/Color"),ne.map(w=>l(w)))),s(jn.map(w=>r(l(w),ne.map((f,g)=>i(u({color:f,variant:w,size:p[g%3]},{index:g}))))))))}},K=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:s,p:r,h2:i,h3:c,pre:l,div:p,code:d}=t.tags;bt.registerLanguage("javascript",Ko);const u=zt(e),v=({text:w})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=bt.highlight(w,{language:"js"}).value}}));return function(f){return o({class:n``},s(f.title),r(f.description),f.gridItem&&[i("Gallery"),f.gridItem&&u({Item:f.gridItem(e)})],i("Usage"),c("Import"),v({text:f.importStatement}),i("Examples"),f.examples.map(g=>a(s(g.title),r(g.description),p(g.createComponent(e)()),v({text:g.code}))))}},Yo=()=>ne.map(e=>`
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
`);function $e(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:s,ul:r,li:i,header:c,h3:l,button:p}=n.tags,d=n.state(""),u=f=>g=>{d.val==f?d.val="":d.val=f},v=({element:f,open:g})=>{const C=()=>{f.removeEventListener("transitionend",C)};function E(M){M.addEventListener("transitionend",C),window.requestAnimationFrame(()=>{M.style.height="0px"})}function k(M){M.addEventListener("transitionend",C),M.style.height=M.scrollHeight+"px"}f.scrollHeight!=0&&(g?k(f):E(f))},w=o`
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
    ${Yo()}
  `;return function(...g){let[{color:C,variant:E="outline",size:k="md",content:M,..._},...O]=q(g);const I=B=>{const{Header:N,Content:z,name:X}=B;return i({class:D(C,E,k),onclick:u(X)},l({class:()=>D(d.val==X&&"active")},p({type:"button","aria-controls":`bau-${X}`,"aria-expanded":({element:H})=>d.val==X},N(B))),s({class:"content",role:"region",id:`bau-${X}`,"data-state":({element:H})=>{const W=d.val==X;return v({element:H,open:W}),W}},z(B)))};return s({class:D("accordion",w,t==null?void 0:t.class,_.class)},r(a.map(I)))}}const Ht=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=$e(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return r=>s({...r})},qo=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=$e(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>s({color:"neutral",variant:"outline"})},Jo=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ut=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Qo=e=>{const{css:t}=e,n=Ut(e),o=$e(e,{accordionDefs:n});return()=>o({color:"warning",class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},ea=`import accordion from "@grucloud/bau-ui/accordion";
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
`,ta=e=>{const{css:t}=e,n=Ut(e),o=$e(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
      `})},na=`import accordion from "@grucloud/bau-ui/accordion";
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
`,oa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Jo,createComponent:qo},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:ea,createComponent:Qo},{title:"Customize the icon",description:"Customize the icon with a cross.",code:na,createComponent:ta}],gridItem:Ht},aa=e=>{const t=K(e);return()=>t(oa)},ra={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},sa=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},ia=()=>ne.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Ne(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:s,i:r}=n.tags;sa({css:o,createGlobalStyles:a});const i=o`
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
    ${ia()}
  `,c=J(e),l=({onclick:p})=>c({"aria-label":"Close",onclick:p,class:"button-close"},"✖");return function(d,...u){const{variant:v="outline",color:w="neutral",size:f="md",onRemove:g,...C}=d;return s({...C,class:D(`alert-${v}`,v,w,f,i,t==null?void 0:t.class,d.class,"alert"),role:"alert"},r({class:"icon"},ra[w]),s({class:"content"},...u),g&&l({onclick:g}))}}const Gt=e=>{const t=Ne(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},ca=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Ne(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},la=`import alert from "@grucloud/bau-ui/alert";
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
`,ua=e=>{const{css:t}=e,n=Ne(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},da=`import alert from "@grucloud/bau-ui/alert";
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
`,pa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:la,createComponent:ca},{title:"Custom Alert ",description:"A custom alert.",code:da,createComponent:ua}],gridItem:Gt},ma=e=>{const t=K(e);return()=>t(pa)},ba=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:s=10,deleteAfterDuration:r=15e3}=t,{div:i}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:u,status:v})=>{const w=c.val.findIndex(f=>f.id===u);w!=-1&&(c.val[w].status=v)};return function(v={},...w){const f=({id:E})=>{d({id:E,status:"removing"});const k=c.val.findIndex(M=>M.id===E);k!=-1&&c.val.splice(k,1)},g=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=s&&f({id:c.val[0].id}),c.val.push(k),setTimeout(()=>f(k),r)},C=E=>i({class:p.item,onclick:()=>f(E)},E.Component());return document.addEventListener("alert.add",E=>g(E.detail)),document.addEventListener("alert.remove",E=>f(E.detail)),i({class:D(p.stack,t==null?void 0:t.class,v.class)},n.loop(c,i(),C))}},ha=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=ba(e,{deleteAfterDuration:2e4}),s=J(e),r=Ne(e);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>r({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ga=`import { Context } from "@grucloud/bau-ui/context";
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
`,fa={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ga,createComponent:ha}]},va=e=>{const t=K(e);return()=>t(fa)},xa=({keyframes:e})=>({hideRight:e`
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
 `}),wa=e=>{const{bau:t}=e,{section:n,div:o,h1:a}=t.tags,s=yt(),r=J(e),i=xa(e);return function(){const c=t.state(!0),l=o(),p=d=>{l.replaceChildren(s({parent:l,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},o(d.val?"Ciao":"")))};return p(c),n({id:"animate"},o(a("Test Animate"),o(r({onclick:()=>{c.val=!c.val,p(c)}},()=>c.val?"Hide":"Show")),l))}};function Ft(e,t){const{bau:n,css:o}=e,{span:a,img:s}=n.tags,r=n.state(!0),i=n.state(!1),c=()=>r.val=!1,l=d=>{r.val=!1,i.val=!0},p=o`
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
  `;return function(...u){let[{color:v,variant:w="outline",size:f="md",width:g=30,height:C=30,...E},...k]=q(u);return a({class:D(p,t==null?void 0:t.class,E.class)},()=>r.val?"Loading...":"",()=>i.val&&"Error",s({width:g,height:C,onload:c,onerror:l,class:D(v,w,f,p,t==null?void 0:t.class,E.class),...E}))}}const Wt=e=>{const{css:t}=e,n=Ft(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},ya=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Ft(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Ea=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Ca={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Ea,createComponent:ya}],gridItem:Wt},Sa=e=>{const t=K(e);return()=>t(Ca)};function Ve(e,t){const{bau:n,css:o,window:a}=e,{dialog:s}=n.tags,r=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:p,onClose:d,...u},...v]=q(c);const w=C=>{g.style.opacity=1,g.showModal();const E=p.getBoundingClientRect(),k=g.getBoundingClientRect();E.x<a.innerWidth/2?g.style.left=E.left+"px":g.style.left=E.right-k.width+"px",E.y<a.innerHeight/2?g.style.top=E.top+E.height+"px":g.style.top=E.top-k.height+"px"},f=C=>{const E=()=>{g.close(),g.removeEventListener("transitionend",E)};g.addEventListener("transitionend",E),g.style.opacity=0},g=s({role:"presentation",class:D("popover",r,t==null?void 0:t.class,u==null?void 0:u.class),onclick:C=>C.target===g&&(f(),d==null?void 0:d.call())},l);return g.closeDialog=f,g.openDialog=w,g}}const ka=()=>ne.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
    ${ka()}
  `;return function(i){const{size:c="md",variant:l="outline",color:p="neutral",name:d,id:u,disabled:v,...w}=i;return a({...w,class:D("input",c,p,l,s,t==null?void 0:t.class,w.class)})}}const Aa=()=>ne.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Vt(e,t){const{bau:n,css:o}=e,{div:a,li:s,ul:r}=n.tags,i=Ve(e),c=J(e),l=_e(e),p=ve(e),d=o`
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

    ${Aa()}
  `,u=n.state(""),v=n.state(""),w=n.state(!1),f=n.state(0),g=()=>{w.val=!1};return function(...E){let[{variant:k="outline",color:M,size:_="md",id:O,label:I,placeholder:B,Option:N,options:z,getOptionLabel:X=({label:P})=>P,...H},...W]=q(E);const F=n.state(z),b=()=>{j.openDialog(),w.val=!0,v.val="",F.val=z},y=()=>{j.closeDialog(),w.val=!1,v.val=""},m=P=>{const{value:V}=P.target;v.val=V,V?F.val=z.filter(Q=>X(Q).match(new RegExp(`${V}`,"i"))):F.val=z},h=P=>{w.val?y():b()},x=({option:P,index:V})=>Q=>{u.val=X(P),f.val=V,y()},$=P=>{switch(console.log("onkeydown",P.key,f.val),P.key){case"Escape":y();break;case"ArrowDown":f.val<F.val.length-1?f.val++:f.val=0;break;case"ArrowUp":f.val<=0?f.val=F.val.length-1:f.val--;break;case"Enter":u.val=X(F.val[f.val]),v.val="",y();break}},A=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":w,"aria-label":I,onclick:h,variant:k,color:M,size:_},()=>!u.val&&I,u),U=l({id:O,value:v,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":w,oninput:m,onkeydown:$,variant:k,color:M,size:_}),j=i({id:O,triggerEl:A,contentEl:(()=>a({class:D(k,M,_,"content")},U,()=>p({class:D(k,M,_)},F.val.map((P,V)=>s({class:()=>D(f.val==V&&"active"),onclick:x({option:P,index:V})},N(P))))))(),onClose:g});return a({...H,class:D("autocomplete",d,t==null?void 0:t.class,H==null?void 0:H.class)},A,j)}}const Xt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,s=Vt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>s({...c,options:r,Option:i,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},Ta=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,r=Vt(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return()=>o(r({options:i,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Ma=`import { Context } from "@grucloud/bau-ui/context";
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
`,Da={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:Ma,createComponent:Ta}],gridItem:Xt},Ia=e=>{const t=K(e);return()=>t(Da)};function Zt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,s=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:p="md",content:d,...u},...v]=q(i);return a({...u,class:D("badge",s,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:D(c,l,p)},d),...v)}}const Kt=e=>{const t=Zt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},$a=e=>{const{bau:t}=e,{section:n}=t.tags,o=Zt(e);return()=>n(o({content:"10"},"☏"))},Na=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,_a={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Na,createComponent:$a}],gridItem:Kt},Ba=e=>{const t=K(e);return()=>t(_a)};function Yt(e,t){const{bau:n,css:o}=e,{ul:a,li:s,a:r,span:i}=n.tags,c=J(e),l=o`
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
  `;return function(...d){let[{color:u,variant:v="outline",size:w="md",items:f,...g},...C]=q(d);return a({...g,class:D(l,t==null?void 0:t.class,g==null?void 0:g.class)},f.map(({href:E,name:k})=>s((E?c:i)({href:E,color:u,variant:v,size:w,class:D(u,v,w)},k))))}}const qt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Yt(e);return o=>n({...o,...t})},Oa=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Yt(e);return()=>n(a(o))},Ra=`import breadcrumbs, {
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
`,Pa={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Ra,createComponent:Oa}],gridItem:qt},La=e=>{const t=K(e);return()=>t(Pa)},Jt=e=>{const t=J(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},ja=e=>{const{bau:t}=e,{section:n}=t.tags,o=J(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},za=`import button from "@grucloud/bau-ui/button";
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
`,Ha={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:za,createComponent:ja}],gridItem:Jt},Ua=e=>{const t=K(e);return()=>t(Ha)},Ga=()=>ne.map(e=>`
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
`);function Xe(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
    ${Ga()}
  `;return function(...i){let[{variant:c="outline",size:l="md",color:p,...d},...u]=q(i);return a({...d,class:D("button-group",c,p,l,s,t==null?void 0:t.class,d==null?void 0:d.class)},...u)}}const Qt=e=>{const t=["ONE","TWO","THREE"],n=J(e),o=Xe(e);return a=>o({...a},t.map(s=>n(a,s)))},Fa=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=J(e),s=Xe(e),r="primary",i="solid";return()=>n(s({color:r,variant:i},o.map(c=>a({color:r,variant:i},c))))},Wa=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Va={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Wa,createComponent:Fa}],gridItem:Qt},Xa=e=>{const t=K(e);return()=>t(Va)};function en(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ne.map(i=>`
&.calendar.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:p="plain",size:d,...u},...v]=q(c);return a({...u,type:"date",class:D("calendar",r,l,p,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const tn=e=>{const t=en(e);return n=>t({...n})},Za=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),s=en(e);return()=>n(o("Start date:",s({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:r=>{a.val=r.target.value}})))},Ka=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Ya={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Ka,createComponent:Za}],gridItem:tn},qa=e=>{const t=K(e);return()=>t(Ya)};function Ze(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,s=o`
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
  `;return function(...i){let[{size:c="md",variant:l="outline",color:p="neutral",onclick:d,...u},...v]=q(i);return a({...u,onclick:d,class:D("chip",s,c,l,p,d&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Ja=e=>{const t=Ze(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},Qa=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ze(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},er=`import chip from "@grucloud/bau-ui/chip";
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
`,tr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:er,createComponent:Qa}],gridItem:Ja},nr=e=>{const t=K(e);return()=>t(tr)};function Ke(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:p="md",...d},...u]=q(i);return a({type:"checkbox",required:"required",...d,class:D(s,c,l,p,t==null?void 0:t.class,d==null?void 0:d.class)})}}const or=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=Ke(e);return s=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size}`,a({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},ar=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,s=Ke(e),r=t.state(!1),i=c=>{r.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",s({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:r,onchange:i})))},rr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,sr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:rr,createComponent:ar}],gridItem:or},ir=e=>{const t=K(e);return()=>t(sr)};function cr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:p,openState:d,...u},...v]=q(i);return a({class:D(s,t==null?void 0:t.class,u.class)},a({class:()=>D("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>D("content",d.val&&"content-open")},v))}}const lr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),s=cr(e),r=J(e),i=St(e);return()=>n(o("Click on the button to open and close the drawer."),r({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},i()))},ur=`import drawer from "@grucloud/bau-ui/drawer";
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
`,dr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:ur,createComponent:lr}]},pr=e=>{const t=K(e);return()=>t(dr)},mr=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=De(e,{base:t.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},br=e=>{const{bau:t,config:n}=e,{section:o}=t.tags,a=t.state(window.location.pathname.replace(n.base,"")),s={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},r=De(e,{base:n.base+"/components/drillDownMenu"});return()=>o(r({tree:s,pathnameState:a}))},hr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,gr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:hr,createComponent:br}],gridItem:mr},fr=e=>{const t=K(e);return()=>t(gr)};function Ye(e,t){const{bau:n,css:o}=e,{div:a,span:s,label:r,input:i}=n.tags,c={base:o`
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
    `};return function(p,...d){const{variant:u="outline",color:v="neutral",size:w="md",Component:f,disabled:g,...C}=p;return a({class:D(c.base,g&&c.disabled,t==null?void 0:t.class,p.class)},r({class:D(u,v,w)},f({disabled:g}),i({type:"file",disabled:g,...C})),s({class:"filename-display"}))}}const vr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:s,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{div:i,span:c}=n.tags,l=n.state("No file selected"),p=Ye(e),d=v=>{const w=v.target.files[0];w?l.val=w.name:l.val="No file selected"},u=({disabled:v})=>i({class:D(o`
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
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return v=>p({Component:u,name:"file",accept:"text/*",onchange:d,...v})},xr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:s,use:r}=n.tagsNS("http://www.w3.org/2000/svg"),{section:i,div:c,span:l}=n.tags,p=n.state("No file selected"),d=Ye(e),u=w=>{const f=w.target.files[0];f?p.val=f.name:p.val="No file selected"},v=({disabled:w})=>c({class:D(o`
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
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>i(d({Component:v,name:"file",accept:"text/*",onchange:u}),c("File selected: ",p))},wr=`import classNames from "@grucloud/bau-css/classNames";
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
`,yr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:wr,createComponent:xr}],gridItem:vr},Er=e=>{const t=K(e);return()=>t(yr)},Cr=e=>{const t=_e(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},Sr=e=>{const{bau:t}=e,{section:n}=t.tags,o=_e(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},kr=`import input from "@grucloud/bau-ui/input";
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
`,Ar={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:kr,createComponent:Sr}],gridItem:Cr},Tr=e=>{const t=K(e);return()=>t(Ar)};function nn(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,r=o`
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
    ${(()=>ne.map(i=>`
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
  `;return function(...c){let[{color:l="neutral",variant:p="outline",size:d="md",...u},...v]=q(c);return a({class:D("modal",r,l,p,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const on=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:s,p:r}=t.tags,i=J(e),c=nn(e),l=()=>o(Array(10).fill("").map((d,u)=>r(u+1,". Some text here"))),p=d=>{const u=c({id:"my-dialog",...d},a("Header"),l(),s(i({variant:"outline",color:d.color,onclick:()=>{u.close()}},"Cancel"),i({variant:"solid",color:d.color,onclick:()=>{u.close()}},"OK")));return u};return d=>{const u=p(d);return n(i({...d,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},Mr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:s,p:r}=t.tags,i="neutral",c=J(e),l=nn(e),p=()=>o(Array(10).fill("").map((u,v)=>r(v+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),p(),s(c({variant:"outline",color:i,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:i,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Dr=`import modal from "@grucloud/bau-ui/modal";
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
`,Ir={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Dr,createComponent:Mr}],gridItem:on},$r=e=>{const t=K(e);return()=>t(Ir)},Nr=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:s}=t.tags,r=J(e),i=Ve(e),c=()=>r({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),s("My Content")),p=c(),d=i({id:"my-popover-left",triggerEl:p,contentEl:l()});return()=>n(o(p,d))},_r=`import popover from "@grucloud/bau-ui/popover";
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
`,Br={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:_r,createComponent:Nr}]},Or=e=>{const t=K(e);return()=>t(Br)},Rr=()=>ne.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function qe(e,t){const{bau:n,css:o}=e,{div:a,li:s}=n.tags,r=J(e),i=Ve(e),c=ve(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Rr()}
  `,p=n.state(""),d=n.state(!1),u=n.state(0);return function(...w){let[{color:f="neutral",variant:g="outline",size:C="md",id:E,label:k,Option:M,options:_,getOptionLabel:O=({label:h})=>h,...I},...B]=q(w);const N=()=>{m.openDialog(),m.focus(),d.val=!0},z=()=>{m.closeDialog(),d.val=!1},X=()=>{d.val=!1},H=h=>{d.val?z():N()},W=({option:h,index:x})=>$=>{p.val=O(h),u.val=x,z()},F=h=>{switch(h.preventDefault(),h.key){case"Escape":z();break;case"ArrowDown":u.val<_.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=_.length-1:u.val--;break;case"Enter":d.val?(p.val=O(_[u.val]),z()):N();break}},b=()=>c({tabindex:"0",class:D(f,g)},_.map((h,x)=>s({class:()=>D(u.val==x&&"active"),onclick:W({option:h,index:x})},M(h)))),y=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":k,onclick:H,color:f,variant:g,size:C},()=>!p.val&&k,p),m=i({id:E,triggerEl:y,contentEl:b(),onClose:X});return a({...I,class:D("select",f,C,l,t==null?void 0:t.class,I==null?void 0:I.class),onkeydown:F},y,m)}}const Pr=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,s=qe(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>s({...c,options:r,Option:i,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Lr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:s}=t.tags,r=qe(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return()=>o(r({options:i,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},jr=`import select from "@grucloud/bau-ui/select";
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
`,zr={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:jr,createComponent:Lr}],gridItem:Pr},Hr=e=>{const t=K(e);return()=>t(zr)};function xe(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
    ${(()=>ne.map(i=>`
&.slider.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:p="outline",size:d,...u},...v]=q(c);return a({...u,type:"range",class:D("slider",l,p,d,r,t==null?void 0:t.class,u.class)},...v)}}const Ur=e=>{const{bau:t}=e,n=t.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=xe(e);return s=>a({...s,oninput:o})},Gr=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:s}=t.tags,r=t.state(0),i=l=>{r.val=l==null?void 0:l.target.value},c=xe(e);return()=>n(o(a("Slider with step, min and max",s,c({oninput:i,name:"slider-simple",step:20,min:-100,max:100}))))},Fr=`import slider from "@grucloud/bau-ui/slider";
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
`,Wr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s,datalist:r,br:i,option:c}=t.tags,l=t.state(0),p=u=>{l.val=u==null?void 0:u.target.value},d=xe(e);return()=>o(a(s({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:p,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),r({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},Vr=`import slider from "@grucloud/bau-ui/slider";
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
`,Xr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s,datalist:r,br:i,option:c}=t.tags,l=t.state(0),p=u=>{l.val=u==null?void 0:u.target.value},d=xe(e);return()=>o(a({class:n`
            display: flex;
          `},s({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:p,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),r({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},Zr=`import slider from "@grucloud/bau-ui/slider";
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
`,Kr={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Fr,createComponent:Gr},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Vr,createComponent:Wr},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Zr,createComponent:Xr}],gridItem:Ur},Yr=e=>{const t=K(e);return()=>t(Kr)},gt={sm:16,md:32,lg:64};function Be(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:s,animateTransform:r,rect:i}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:p="color-base",variant:d="outline",visibility:u=!0,...v}={}){return a({class:D(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${p});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:gt[l],height:gt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},r({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},s({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const qr=e=>{const t=Be(e);return n=>t({...n})},Jr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Be(e);return()=>n(o({}))},Qr=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,es={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:Qr,createComponent:Jr}],gridItem:qr},ts=e=>{const t=K(e);return()=>t(es)},ns=()=>ne.map(e=>`
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
`);function Je(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
    ${ns()}
  `;return function(...i){let[{color:c="neutral",variant:l="plain",size:p="md",...d},...u]=q(i);return a({...d,class:D("switch",s,c,l,p,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...u)}}const os=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,s=Je(e);return r=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},as=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:s}=t.tags,r=Je(e);return()=>o(a(s({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",r({variant:"outline",id:"my-shinny-switch"}))))},rs=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,ss={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:rs,createComponent:as}],gridItem:os},is=e=>{const t=K(e);return()=>t(ss)},cs=()=>ne.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function we(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:s,ul:r,li:i}=n.tags,c=n.state(a),l=n.state(a[0]),p=u=>c.val.find(v=>v.name==u),d={base:o`
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
      ${cs()}
    `};return function(...v){let[{color:w,variant:f="plain",size:g,...C},...E]=q(v);const k=_=>{const{Header:O,disabled:I,name:B}=_;return i({class:()=>D(l.val.name==B&&"active",I&&"disabled"),onclick:N=>N.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},O(_))},M=s({class:D("tabs",d.base,f,g,w,t==null?void 0:t.class,C.class)},n.loop(c,r(),k),()=>l.val.Content?l.val.Content({}):"");return M.addEventListener("tab.select",_=>{var B,N;const{tabName:O}=_.detail,I=p(O);I&&((B=l.val.exit)==null||B.call(),l.val=I,(N=I.enter)==null||N.call())},!1),M.addEventListener("tab.add",_=>{var I;const{tab:O}=_.detail;(I=O.enter)==null||I.call(),c.val.push(O)},!1),M.addEventListener("tab.remove",_=>{var I;const O=c.val.findIndex(B=>B.name==_.detail.tabName);O>0&&((I=c.val[O].exit)==null||I.call(),c.val.splice(O,1))},!1),M}}const an=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=we(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return r=>s(r)},ls=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=we(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>s({variant:"outline",color:"neutral"})},us=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,ds=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,s=we(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>s({variant:"outline",color:"success"})},ps=`import tabs from "@grucloud/bau-ui/tabs";
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
`,rn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},ms=e=>{const{css:t}=e,n=we(e,{tabDefs:rn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},bs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,hs=e=>{const{css:t}=e,n=rn(e),o=we(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},gs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,fs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:us,createComponent:ls},{title:"Extended Tabs",description:"An extended tabs.",code:ps,createComponent:ds},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:bs,createComponent:ms},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:gs,createComponent:hs}],gridItem:an},vs=e=>{const t=K(e);return()=>t(fs)};function ye(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:s}=n.tags;a`
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
  `;return function(...c){let[{...l},...p]=q(c);return s({...l,class:D("table-container",r,t==null?void 0:t.class,l==null?void 0:l.class)},...p)}}const xs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:r,table:i,thead:c,tbody:l,caption:p}=t.tags;function d(g,C,E,k,M){return{name:g,calories:C,fat:E,carbs:k,protein:M}}const u=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],v=({name:g,calories:C})=>r(s(g),s({class:n`
            text-align: right;
          `},C)),w=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=ye(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(i(p("Basic Table"),w(),l(u.map(v)))))},ws=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function be(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const ys=[be("Frozen yoghurt",159,6,24,4),be("Ice cream sandwich",237,9,37,4.3),be("Eclair",262,16,24,6),be("Cupcake",305,3.7,67,4.3),be("Gingerbread",356,16,49,3.9)],Es=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:r,table:i,thead:c,tbody:l,caption:p}=t.tags,d=({name:w,calories:f})=>r(s(w),s({class:n`
            text-align: right;
          `},f)),u=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=ye(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(v(i(p("Table Dense"),u(),l(ys.map(d)))))},Cs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Ss=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],ks=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:s,tr:r,table:i,thead:c,tbody:l,caption:p}=t.tags,d=({name:w,calories:f})=>r(s(w),s({class:n`
            text-align: right;
          `},f)),u=()=>c(r(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=ye(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(v(i(p("Table Zebra"),u(),l(Ss.map(d)))))},As=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Ts={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:ws,createComponent:xs},{title:"Dense",description:"A dense table.",code:Cs,createComponent:Es},{title:"Zebra",description:"A zebra table.",code:As,createComponent:ks}]},Ms=e=>{const t=K(e);return()=>t(Ts)};function sn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,s=Xe(e),r=J(e),i=Be(e),c=o`
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
  `,l=({label:w,icon:f,...g})=>r({"aria-label":w,title:w,...g},f),p=({count:w,totalCount:f,page:g,rowsPerPage:C})=>a({class:"pages-numbers"},Number(g-1)*Number(C)+(w>0?1:0),"-",Math.min(g*C,f)," of ",f),d=({count:w,page:f,rowsPerPage:g})=>a({class:"pages-numbers"},(f-1)*g+(w>0?1:0),"-",f*g),u=w=>w<=1,v=(w,f,g)=>w>=Math.ceil(f/g);return function(...f){let[{count:g=0,totalCount:C=0,page:E=1,rowsPerPage:k=50,onPageChange:M,isLoading:_=!1,disableFirst:O=()=>u(E),disablePrevious:I=()=>u(E),disableNext:B=()=>v(E,C,k),disableLast:N=()=>v(E,C,k),...z},...X]=q(f);const H=Math.max(0,Math.ceil(C/k)),W=M({page:1}),F=M({page:E-1}),b=M({page:E+1}),y=M({page:H}),m=[{label:"First",icon:"⟪",onclick:W,disabled:O()},{label:"Previous",icon:"⟨",onclick:F,disabled:I()},{label:"Next",icon:"⟩",onclick:b,disabled:B()},{label:"Last",icon:"⟫",onclick:y,disabled:N()}];return a({...z,class:D("table-pagination",c,_&&"disabled",t==null?void 0:t.class,z==null?void 0:z.class)},i({class:"spinner",visibility:_,size:"md"}),C>0?p({count:g,totalCount:C,page:E,maxPages:H,rowsPerPage:k}):d({count:g,page:E,maxPages:H,rowsPerPage:k}),s({variant:"outline",color:"neutral"},m.map(h=>l({...h,variant:"outline",color:"neutral"}))))}}const Ds=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Is=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:s,table:r,thead:i,tbody:c}=t.tags,l=Ds(45),p=({name:E,email:k})=>s(a(E),a(k)),d=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=sn(e),v=ye(e,{class:n`
      max-width: 650px;
    `}),w=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),g=t.derive(()=>w.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),C=({page:E})=>k=>{f.val.page=E};return()=>v(r(d(),()=>c(g.val.map(p))),()=>u({...f.val,onPageChange:C}))},$s=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:s,table:r,thead:i,tbody:c,div:l}=t.tags,p=t.state(!1),d=t.state([]),u=t.state(""),v=t.derive(()=>d.val.length),w=t.state(1),f=t.state(10),g=t.derive(()=>d.val),C=N=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(N).toString()}`,E=({page:N})=>z=>{w.val=N,k(C({page:N,per_page:f.val}))};k(C({page:1,per_page:f.val}));async function k(N){try{p.val=!0;const z=await fetch(N,{});if(z.ok){const X=await z.json();d.val=X;return}throw z}catch(z){u.val=z.message}finally{p.val=!1}}const M=({name:N,description:z,stargazers_count:X})=>s(a(N),a(z),a({class:n`
            text-align: right;
          `},X)),_=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),O=sn(e),I=ye(e,{class:n`
      min-width: 650px;
    `}),B=({message:N})=>l(N);return()=>I(()=>O({rowsPerPage:f.val,page:w.val,count:v.val,totalCount:-1,isLoading:p.val,onPageChange:E,disableNext:()=>!1}),r(_(),()=>u.val&&B({message:u.val}),()=>c(g.val.map(M))))},Ns=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:s,h2:r,tr:i}=t.tags,c=Is(e),l=$s(e),p=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},r(i("Table Pagination")),s("Asynchronous Pagination"),p(l()),s("Simple Pagination"),p(c()))};function Qe(e,t){const{bau:n,css:o,window:a}=e,{div:s}=n.tags,r=o`
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
  `;return function(...c){let[{titleEl:l,side:p="bottom-start",color:d="neutral",variant:u="outline",size:v="md",...w},...f]=q(c);const g=s({class:D("container",...p.split("-"))},s({class:D("content",d,u,v),role:"tooltip"},l)),C=I=>`move-to-${I}`,E=(I,B,N)=>{if(I()){const z=C(B);g.classList.add(z),g.classList.add(B),g.classList.remove(N)}},k=(I,B)=>{const N=C(I);g.classList.contains(N)&&(g.classList.remove(N),g.classList.add(B),g.classList.remove(I))},M=I=>{const B=g.getBoundingClientRect();E(()=>B.x<0,"right","left"),E(()=>B.x+B.width>a.innerWidth,"left","right"),E(()=>B.y<0,"bottom","top"),E(()=>B.bottom>a.innerHeight,"top","bottom"),g.classList.add("visible")},_=I=>{g.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return s({...w,class:D("tooltip",r,t==null?void 0:t.class,w==null?void 0:w.class),bauMounted:({element:I})=>{I.addEventListener("mouseover",M),I.addEventListener("mouseout",_)},bauUnmounted:({element:I})=>{I.removeEventListener("mouseover",M),I.removeEventListener("mouseout",_)}},...f,g)}}const cn=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:s}=t.tags,r=J(e),i=Qe(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",s("tooltip")," can be any component"));return l=>i({titleEl:c(),...l},r(l,`${l.color} ${l.variant}`))},_s=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,s=J(e),r=Qe(e),i=()=>n(o("A ",a("tooltip")," can be any component"));return()=>r({side:"bottom-start",titleEl:i()},s("tooltip"))},Bs=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Os=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:s}=t.tags,r=J(e),i=Qe(e),c=()=>o(a("A ",s("tooltip")," can be any component")),l=()=>[o({class:n`
          display: flex;
          justify-content: space-around;
        `},i({side:"top-start",titleEl:c()},r("top-start")),i({side:"top-centered",titleEl:c()},r("top-centered")),i({side:"top-end",titleEl:c()},r("top-end"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-start",titleEl:c()},r("left-start")),i({side:"right-start",titleEl:c()},r("right-start"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-centered",titleEl:c()},r("left-centered")),i({side:"right-centered",titleEl:c()},r("right-centered"))),o({class:n`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-end",titleEl:c()},r("left end")),i({side:"right-end",titleEl:c()},r("right end"))),o({class:n`
          display: flex;
          justify-content: space-around;
        `},i({side:"bottom-start",titleEl:c()},r("bottom start")),i({side:"bottom-centered",titleEl:c()},r("bottom centered")),i({side:"bottom-end",titleEl:c()},r("bottom end")))];return()=>l()},Rs=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ps={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Bs,createComponent:_s},{title:"Grid",description:"Various tooltip position",code:Rs,createComponent:Os}],gridItem:cn},Ls=e=>{const t=K(e);return()=>t(Ps)},js=e=>{const t=Me(e);return n=>t(n)},zs=e=>{const{bau:t}=e,{section:n}=t.tags,o=Me(e);return()=>n(o({}))},Hs=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Us={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Hs,createComponent:zs}],gridItem:js},Gs=e=>{const t=K(e);return()=>t(Us)},Fs=({css:e,createGlobalStyles:t})=>(t`
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
    `});function ln(e,t){const{bau:n,css:o,createGlobalStyles:a,window:s}=e,{renderMenuItem:r}=t,{ul:i,li:c,nav:l,div:p}=n.tags,d=Fs({css:o,createGlobalStyles:a}),u=({element:g,closeState:C})=>{g.scrollHeight!=0&&(C.val?v(g):w(g))};function v(g){g.style.height=g.scrollHeight+"px";const C=()=>{g.removeEventListener("transitionend",C)};g.addEventListener("transitionend",C),s.requestAnimationFrame(()=>{g.style.height="0px"})}function w(g){const C=()=>{g.removeEventListener("transitionend",C),g.style.height=null};g.addEventListener("transitionend",C),g.style.height=g.scrollHeight+"px"}const f=({depth:g=1,maxDepth:C,color:E,variant:k,size:M})=>_=>{const{children:O,expanded:I}=_,B=n.state(!I);return c({class:()=>D(O?B.val?d.collapsed:d.expanded:"")},p({class:o`
              cursor: pointer;
            `,onclick:N=>{O&&(B.val=!B.val)}},r(_.data)),O&&g<C&&i({class:D(E,M),bauMounted:({element:N})=>{B.val&&(N.style.height="0px")},"aria-expanded":({element:N})=>(u({element:N,closeState:B}),!B.val)},O.map(f({depth:g+1,maxDepth:C}))))};return function({tree:C,maxDepth:E=1/0,size:k="md",variant:M="plain",color:_="neutral",...O}){return l({class:D(d.nav,k,M,_,t==null?void 0:t.class,O.class)},C.children&&i(C.children.map(f({maxDepth:E,color:_,variant:M,size:k}))))}}const un=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=ln(e,{renderMenuItem:({name:r,href:i})=>n({href:i},r)});return r=>s({...r,tree:o})},Ws=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=ln(e,{renderMenuItem:({name:r,href:i})=>n({href:i},r)});return()=>s({tree:o})},Vs=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Xs={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Vs,createComponent:Ws}],gridItem:un},Zs=e=>{const t=K(e);return()=>t(Xs)};function Ks(e,t={}){const{bau:n,css:o}=e,{div:a,span:s,pre:r,h3:i,h4:c}=n.tags;return function(p,...d){return a("Login")}}const Ys=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:s,h2:r}=n.tags,i=Ks(e);return()=>o({id:"login"},r(t("Login Examples")),s("Basic"),a(i()))};function qs(e){const{tr:t,bau:n,css:o}=e,{div:a,article:s,h1:r}=n.tags;return function(){return a({class:o`
          grid-area: main;
          display: flex;
        `},s({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},r(t("Pages Examples")),Ys(e)()))}}const Js=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Qs=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,s=ve(e),r=({code:i,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(i),o(c));return i=>s({...i},Js.map(r))},ei=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ti=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:s}=t.tags,r=ve(e),i=({code:c,label:l})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(r({variant:"outline",color:"primary"},ei.map(i)))},ni=`import list from "@grucloud/bau-ui/list";
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
`,oi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ni,createComponent:ti}],gridItem:Qs},ai=e=>{const t=K(e);return()=>t(oi)},ri=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:s,h1:r,span:i,p:c,ul:l,li:p,label:d}=t.tags,{svg:u,use:v}=t.tagsNS("http://www.w3.org/2000/svg"),w=zt(e),f=J(e),g=Ke(e),C=Ze(e),E={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},k=De(e,{base:o.base+"/components"}),M=({disabled:b})=>s({class:D(n`
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
            `)},u({width:100,height:100,fill:"currentColor"},v({href:"uploadIcon.svg#Capa_1"})),i("Choose a file to upload")),_=Ye(e),O=_e(e),I=qe(e),B=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],N=b=>s({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.label),i(b.code)),z=xe(e),X=Be(e),H=Je(e),W=Me(e),F=[{name:"Accordion",Item:Ht(e)},{name:"Alert",Item:Gt(e)},{name:"Autocomplete",Item:Xt(e)},{name:"Avatar",Item:Wt(e)},{name:"Badge",Item:Kt(e)},{name:"Breadcrumbs",Item:qt(e)},{name:"Button",Item:Jt(e)},{name:"Button Group",Item:Qt(e)},{name:"Calendar",Item:tn(e)},{name:"Checkbox",Item:b=>d({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${b.color} ${b.variant}`,g({id:`myCheckbox-gallery-${b.color}-${b.variant}`,name:`myCheckbox-gallery-${b.color}-${b.variant}`,...b}))},{name:"Chip",Item:b=>C({...b},`Chip ${b.color}`)},{name:"DrillDown Menu",Item:b=>k({tree:E,...b})},{name:"File Input",Item:b=>_({Component:M,name:"file",accept:"text/*",onchange,...b})},{name:"Input",Item:b=>O({name:"my-input",id:"my-input-with",placeholder:"Enter text",...b})},{name:"Modal",Item:on(e)},{name:"Select",Item:b=>s(I({...b,options:B,Option:N,getOptionLabel:({label:y})=>y,label:"Select a country..."}))},{name:"Slider",Item:b=>s({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},d(`${b.color} ${b.variant}`,z({...b,id:`my-slider-${b.color}-${b.variant}`})))},{name:"Spinner",Item:b=>X(b)},{name:"Switch",Item:b=>s({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},d("off",H({...b,id:`mySwitch-off-${b.color}-${b.variant}`})),d("on",H({...b,id:`mySwitch-on-${b.color}-${b.variant}`,checked:!0})))},{name:"Tabs",Item:an(e)},{name:"Theme Switch",Item:b=>W(b)},{name:"Tooltip",Item:cn(e)},{name:"Tree View",Item:un(e)}];return()=>a(r("Bau Component Gallery"),c("This page displays the components with various colors and variants."),l({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},F.map(({name:b})=>p(f({color:"primary",variant:"solid",href:`#${b}`},b)))),F.map(b=>s({id:b.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},w(b))))},si=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Kn(e)})},{path:"components",action:()=>({title:"Component",component:ri(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:aa(e)})},{path:"alert",action:()=>({title:"Alert",component:ma(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:va(e)})},{path:"animate",action:()=>({title:"Animate",component:wa(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Ia(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Sa(e)})},{path:"badge",action:()=>({title:"Badge",component:Ba(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:La(e)})},{path:"button",action:()=>({title:"Button",component:Ua(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Xa(e)})},{path:"calendar",action:()=>({title:"Calendar",component:qa(e)})},{path:"chip",action:()=>({title:"Chip",component:nr(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ir(e)})},{path:"drawer",action:()=>({title:"Drawer",component:pr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:fr(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Er(e)})},{path:"input",action:()=>({title:"Input",component:Tr(e)})},{path:"list",action:()=>({title:"List",component:ai(e)})},{path:"modal",action:()=>({title:"Modal",component:$r(e)})},{path:"popover",action:()=>({title:"Popover",component:Or(e)})},{path:"select",action:()=>({title:"Select",component:Hr(e)})},{path:"slider",action:()=>({title:"Slider",component:Yr(e)})},{path:"spinner",action:()=>({title:"Spinner",component:ts(e)})},{path:"switch",action:()=>({title:"Switch",component:is(e)})},{path:"table",action:()=>({title:"Table",component:Ms(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Ns(e)})},{path:"tabs",action:()=>({title:"Tabs",component:vs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ls(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Gs(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Zs(e)})}]},{path:"pages",action:t=>({title:"Pages",component:qs(e)})}],ii=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ci=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=e,r=a.state(),i=t({componentState:r});return document.getElementById("app").replaceChildren(i),({router:l})=>{const p=o.location.pathname.replace(n,""),{title:d,component:u,Layout:v=t}=l.resolve({pathname:p});s.pathname.val=p,r.val=u,document.title=`${d}`}},li=e=>{const{createGlobalStyles:t}=e;Dn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  ${wt({dark:!0})}
}
  `};In();const et={title:"Bau",base:"/bau/bau-ui"},ie=Ln({config:et}),{bau:ft}=ie;ie.states={pathname:ft.state(window.location.pathname.replace(et.base,"")),drawerOpen:ft.state(!0)};li(ie);ui(ie);yn({routes:si({context:ie}),onLocationChange:ci({context:ie,LayoutDefault:Vn(ie),config:et}),notFoundRoute:ii(ie)});
