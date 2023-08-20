(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Dn=(t,e)=>({...t,paths:[...e,t.path]}),fe=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=Dn(o,t);return n?[a,...fe({paths:[...t,o.path],routes:n})]:a}),In=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},$n=({routes:t=[],notFoundRoute:e})=>{const n=fe({routes:t}).map(o=>({...o,regex:In(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function Nn({routes:t,notFoundRoute:e,onLocationChange:n}){const o=$n({routes:t,notFoundRoute:e});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,i,s)=>{a.apply(i,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:i}=a,s=i.getAttribute("href");i.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const zt=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],_n=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],Bn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],oe=t=>`var(--color-${t})`,Rn=t=>`var(--color-${t}-lightest)`,On=()=>zt.map(([t])=>`
.outline.${t} {
  border: 2px solid ${oe(t)};
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${Rn(t)};
}
.solid.${t} {
  background-color: ${oe(t)};
}
`).join(`
`),Ln=()=>zt.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),Pn=t=>100-t*10,jn=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${Pn(e)}%);`).join(`
`),ae=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),zn=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,..._n.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),...Bn.map(([a,i])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${i}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function Hn({createGlobalStyles:t},{colorPalette:e=zt}={}){t`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${e.map(([n,o])=>zn([n,o])).join(`
`)}
      ${jn()}
      ${ae({})}
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
    html[data-theme="dark"] {
      ${Ln()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 1);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${ae({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function Un(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let Ht=t=>Object.prototype.toString.call(t??0).slice(8,-1),Gn=t=>Ht(t)=="Object",re=t=>Ht(t)=="Function",Lt=t=>["Object","Array"].includes(Ht(t)),se=Object.getPrototypeOf,Pt=t=>mt(t)?t.val:t,mt=t=>t==null?void 0:t.__isState,Fn=["splice","push","pop","shift","unshift","sort","reverse"],kt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const Y=t=>!mt(t[0])&&Gn(t[0])?t:[{},...t];function Vn(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,i=new Set,s=!1,r,c=x=>n.createElement(x),l=(x,p,b)=>{let v=r;r=p;let y=x(b);return r=v,y},d=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(x=>{x.bindings=x.bindings.filter(p=>{var b;return(b=p.element)==null?void 0:b.isConnected}),!x.bindings.length&&!x.computed&&a.delete(x)}),o=void 0}))},m=(x,p,b,v,y,P)=>{var _;if(s){i.add(x);return}for(let X of x.bindings){let{deps:O,element:T,renderInferred:G,render:et,renderItem:ot}=X;if(ot&&p)(_=w(T,v,(...rt)=>h(ot(...rt)),b,y,P)[p])==null||_.call();else{let rt=G?G({element:T}):et({element:T,renderItem:ot})(...O.map(Pt));rt!==T&&T.replaceWith(X.element=h(rt))}}k(x),d()},u=(x,p,b=[])=>({get(v,y,P){var _;if(r==null||r.add(x),y==="_isProxy")return!0;if(!((_=v[y])!=null&&_._isProxy)&&!mt(v[y])&&Lt(v[y]))v[y]=new Proxy(v[y],u(x,p,[...b,y]));else if(Fn.includes(y)){let X=v[y];return(...O)=>{let T=X.apply(v,O);return m(x,y,T,O,p,b),T}}return Reflect.get(v,y,P)},set(v,y,P,_){let X=Reflect.set(v,y,P,_);return m(x,"setItem",X,{prop:y,value:P},p,[...b,y]),X}}),g=(x,p)=>new Proxy(p,u(x,p)),w=(x,p,b,v,y,P)=>{let _=()=>x.replaceChildren(...kt(v,b)),X=O=>x[O]&&x.removeChild(x[O]);return{assign:_,sort:_,reverse:_,setItem:()=>{var T;let O=P[0];(T=x.children[O])==null||T.replaceWith(b(y[O],O))},push:()=>x.append(...kt(p,(O,T)=>b(O,y.length+T))),unshift:()=>x.prepend(...kt(p,b)),pop:()=>X("lastChild"),shift:()=>X("firstChild"),splice:()=>{let[O,T,...G]=p;const{length:et}=x.children;for(let ot=O>=0?Math.min(O+T-1,et-1):et-1;ot>=(O>=0?O:et+O);ot--)x.children[ot].remove();if(G.length){let ot=G.forEach((rt,_t)=>b(rt,O+_t));x.children[O]?x.children[O].after(...ot):x.append(...ot)}}}},f=x=>({oldVal:x,bindings:[],listeners:[],__isState:!0,get val(){let p=this;return r==null||r.add(p),p.valProxy??(p.valProxy=Lt(x)?g(p,x):x,p.valProxy)},set val(p){let b=this,v=b.val;Lt(p)?(b.valProxy=g(b,p),m(b,"assign",p)):p!==v&&(b.valProxy=p,m(b)),b.oldVal=v}}),h=x=>x==null||x===!1?c("span"):x.nodeType?x:n.createTextNode(x),C=(x,p)=>{let b=new Set;return p.val=l(x,b),b},E=x=>{let p=f(),b=C(x,p);p.computed=!0;for(let v of b)v.listeners.push({computed:x,deps:b,state:p});return p},k=x=>{for(let p of[...x.listeners])C(p.computed,p.state)},D=(x,...p)=>{if(p.length){let b=[];for(let v of p.flat(1/0))v!=null&&b.push(mt(v)?W({deps:[v],render:()=>y=>y}):re(v)?U({renderInferred:v}):h(v));x.append(...b)}},N={},R=(x,p)=>x&&(Object.getOwnPropertyDescriptor(x,p)??R(se(x),p)),I=(x,p,b)=>{var v;return N[x+","+p]??(N[x+","+p]=((v=R(b,p))==null?void 0:v.set)??0)},B=(x,p)=>new MutationObserver((b,v)=>{b.filter(y=>y.removedNodes).forEach(y=>[...y.removedNodes].find(P=>P===x&&(p({element:x}),v.disconnect(),!0)))}).observe(x.parentNode,{childList:!0}),$=(x,p)=>new MutationObserver((b,v)=>b.forEach(y=>p({record:y,element:x}))).observe(x,{childList:!0}),H=x=>new Proxy(function(b,...v){var X;let[y,...P]=Y(v),_=x?n.createElementNS(x,b):c(b);for(let[O,T]of Object.entries(y)){if(O.startsWith("bau"))continue;let G=I(b,O,se(_))?et=>_[O]=et:et=>_.setAttribute(O,et);T==null||(mt(T)?W({deps:[T],render:()=>()=>(G(T.val),_)}):re(T)&&(!O.startsWith("on")||T.isDerived)?U({renderInferred:()=>(G(T({element:_})),_)}):T.renderProp?W({deps:T.deps,render:()=>()=>(G(T.renderProp({element:_})(...T.deps.map(Pt))),_)}):G(T))}return y.bauOnChildMutation&&$(_,y.bauOnChildMutation),D(_,...P),(X=y.bauCreated)==null||X.call(y,{element:_}),y.bauMounted&&e.requestAnimationFrame(()=>y.bauMounted({element:_})),y.bauUnmounted&&e.requestAnimationFrame(()=>B(_,y.bauUnmounted)),_},{get:(p,b)=>p.bind(void 0,b)}),j=(x,p,b)=>{x.element=h(b);for(let v of p)mt(v)&&(a.add(v),v.bindings.push(x));return x.element},U=({renderInferred:x,element:p})=>{let b=new Set,v=l(x,b,{element:p});return j({renderInferred:x},b,v)},W=({deps:x,element:p,render:b,renderItem:v})=>j({deps:x,render:b,renderItem:v},x,b({element:p,renderItem:v})(...x.map(Pt))),Z=(x,p,b)=>W({deps:[x],render:({renderItem:v})=>y=>(p.append(...kt(y,v)),p),renderItem:b}),J=x=>{s=!0,x(),s=!1,i.forEach(m),i.clear()};return{tags:H(),tagsNS:H,state:f,bind:W,loop:Z,derive:E,stateSet:a,batch:J}}const Xn=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},Wn=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},Zn=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function Kn(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...i)=>{const s=Zn(a,i),r=Xn(s);return!e.getElementById(r)&&Wn(e,t==null?void 0:t.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Yn(t){const e=Vn(),n=Kn();return Hn(n),{bau:e,...n,tr:o=>o,window,...t}}function M(...t){return t.filter(e=>e).join(" ")}function q(t,e){const{bau:n,css:o}=t,a={root:o`
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
    `};return function(...s){let[{color:r,variant:c,size:l="md",disabled:d,href:m,...u},...g]=Y(s);return(m?n.tags.a:n.tags.button)({...u,class:M("button",a.root,c,l,r,m?a.a:a.button,d&&a.disabled,e==null?void 0:e.class,u.class),disabled:d,href:m,...!m&&{type:"button"}},g)}}const nt=["neutral","primary","success","danger","warning"],qn=["plain","outline","solid"],Jn="light",Qn=()=>nt.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function Ut(t,e){const{bau:n,css:o,window:a}=t,{input:i}=n.tags,s=d=>{a.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Jn);const l=o`
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
    ${Qn()}
  `;return function(...m){let[{color:u,variant:g="outline",size:w="md",...f},...h]=Y(m);return i({required:"required",title:"Switch Theme",...f,class:M("theme-switch",u,g,w,l,e==null?void 0:e.class,f.class),type:"checkbox",checked:r()=="dark",onclick:C=>{s(C.target.checked?"dark":"light")}},...h)}}function to(t){const{tr:e,bau:n,css:o,config:a,states:i}=t,{i:s,header:r,h1:c,div:l,a:d,img:m,b:u,ul:g,li:w}=n.tags,{svg:f,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),C=i.drawerOpen,E=q(t,{class:o`
      background: transparent;
    `}),k=Ut(t),D=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),N=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>C.val=!C.val},D()),d({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(e("Bau UI")))),R=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},k(),E({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},m({class:o`
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
        `},N(),R())}}function eo({tr:t,bau:e,css:n}){const{footer:o,span:a,a:i,ul:s,li:r,p:c}=e.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.41.0"))}}function ve(t,e={}){const{bau:n}=t,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:M("animate",e==null?void 0:e.class,c.class),bauOnChildMutation:({record:d,element:m})=>{[...d.removedNodes].forEach(u=>{if(!s()||u.getAttribute("cloned"))return;const g=u.cloneNode(!0);g.setAttribute("cloned",!0),g.style.top=0,g.style.left=0,g.style.width=u.getAttribute("width"),g.style.height=u.getAttribute("height"),g.style.position="absolute",g.style.animation=s(),d.target.appendChild(g),g.addEventListener("animationend",()=>g.parentNode.removeChild(g))}),[...d.addedNodes].forEach(u=>{if(u.getAttribute("cloned"))return;m.style.position="relative";const g=u.getBoundingClientRect();if(u.setAttribute("width",g.width+"px"),u.setAttribute("height",g.height+"px"),r()){u.style.animation=r();const w=()=>{u.removeEventListener("animationend",w),u.style.animation=""};u.addEventListener("animationend",w)}})},...c},l)}}function wt(t,e){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
    ${(()=>nt.map(r=>`
`).join(`
`))()}
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:m,...u},...g]=Y(c);return a({...u,class:M("list",s,l,d,m,e==null?void 0:e.class,u==null?void 0:u.class)},...g)}}const Tt="0.3s",xe=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,i=structuredClone(a);return i.children=o==null?void 0:o.map(xe({parent:n,grandParent:t})),t&&(t.parentTree=e),i.parentTree=t,i},we=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=we(t)(e.children[o]);if(a)return a}},no=({keyframes:t})=>({hideToLeft:t`
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
 `});function Gt(t,e){const{bau:n,css:o,window:a}=t,{base:i=""}=e,s=({currentTree:j,data:U})=>f(k({variant:"plain",href:`${i}${j.parentTree.children[0].data.href}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),k({variant:"plain",href:`${i}${U.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},U.name)),r=({data:{name:j,href:U},children:W=[]})=>k({href:`${i}${U}`,"data-ischild":!W.length},j),c=({subTree:j})=>{var U;return a.location.pathname.replace(i,"")===((U=j==null?void 0:j.data)==null?void 0:U.href)},{renderHeader:l=s,renderMenuItem:d=r,isActive:m=c}=e,{li:u,nav:g,div:w,header:f,a:h}=n.tags,C=ve(t),E=wt(t),k=q(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:D,hideToRight:N,showFromRight:R,showFromLeft:I}=no(t),B=o`
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
  `,$=({variant:j,color:U,size:W,currentTree:Z,pathnameState:J})=>{const{children:x,parentTree:p,data:b}=Z;return w({class:M("drillDownMenu",j,U,W)},p&&l({data:b,currentTree:Z}),x&&E({class:M(j,U,W)},x.map(v=>u({class:()=>M(v.children&&"has-children",m({pathname:J.val,subTree:v})&&"active")},d(v)))))},H=({tree:j,pathname:U})=>{let W=xe({})(structuredClone(j)),Z=we(U)(W);return Z||(console.log("drilldown no sub tree",U),Z=W),Z};return function(U){const{variant:W="plain",color:Z="neutral",size:J="md",tree:x,pathnameState:p=n.state(a.location.pathname),...b}=U;let v=1;const y=O=>{const{dataset:T}=O.target;T.buttonback=="true"?v=-1:T.ischild=="false"?v=1:T.ischild=="true"&&(v=0)},P=n.derive(()=>H({tree:x,pathname:p.val})),_=O=>{switch(O){case 1:return`${D} ${Tt}`;case-1:return`${N} ${Tt}`;default:return""}},X=O=>{switch(O){case 1:return`${R} ${Tt}`;case-1:return`${I} ${Tt}`;default:return""}};return g({class:M(B,e==null?void 0:e.class,b.class),onclick:y},C({animationHide:()=>_(v),animationShow:()=>X(v)},()=>$({variant:W,color:Z,size:J,currentTree:P.val,pathnameState:p})))}}const oo={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function ye(t){const{tr:e,bau:n,css:o,config:a,states:i,window:s}=t,{div:r,ul:c,li:l,nav:d,a:m,span:u}=n.tags;let g=!1;const w=Gt(t,{base:a.base});return function(){return r({bauMounted:({element:h})=>{s.innerWidth<=640&&(g=!0,i.drawerOpen.val=!1)},onclick:h=>{g&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:M(o`
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
          `)},w({tree:oo,pathnameState:i.pathname}))}}const ao=t=>{const{bau:e,css:n,states:o}=t,{div:a}=e.tags,i=to(t),s=ye(t),r=eo(t);return function({componentState:l}){return a({class:n`
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
          `},()=>l.val&&l.val({})),r())}};function Ft(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0.2rem;
    }
    &.md {
      padding: 0.2rem 0.5rem;
    }
    &.lg {
      padding: 0.3rem 1rem;
    }
  `;return function(...r){let[{size:c="md",variant:l="outline",color:d="neutral",onclick:m,...u},...g]=Y(r);return a({...u,onclick:m,class:M("chip",i,c,l,d,m&&"clickable",e==null?void 0:e.class,u==null?void 0:u.class)},...g)}}function ro(t){const{bau:e,css:n,config:o}=t,{div:a,h1:i,h2:s,p:r}=e.tags;q(t);const c=n`
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
  `;return function({name:d,text:m,tagLine:u}){return a({class:c},i(d),s(m),r(u))}}function so(t){const{bau:e,css:n}=t,{div:o,h1:a,p:i}=e.tags,s=n`
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
      width: 28%;
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function io({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:d}=e.tags,m=({maxSize:u=151})=>({libName:g,size:w})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},g),s({class:n`
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
                  var(--color-success) ${w/u*100}%
                );
                justify-content: flex-end;
                width: ${w/u*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},w)));return function({data:g=[]}){return o({class:n`
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
          `},g.map(m({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",d({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function co(t){const{bau:e,css:n,config:o}=t,{div:a,p:i,a:s,section:r}=e.tags,c=ro(t),l=so(t),d=q(t);Ft(t);const m=io(t),u=(...C)=>a({class:n`
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
          `},...C)),g=n``,w=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 25 components such as button, input, tabs, autocomplete etc ..."),d({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),u(d({variant:"solid",color:"primary"},"solid"),d({variant:"outline",color:"primary"},"outline"),d({variant:"plain",color:"primary"},"plain")),u(d({variant:"solid",color:"neutral",size:"sm"},"neutral"),d({variant:"solid",color:"primary",size:"sm"},"primary"),d({variant:"solid",color:"danger",size:"sm"},"danger"),d({variant:"solid",color:"warning",size:"sm"},"warning")),u(d({variant:"outline",color:"primary",size:"sm"},"small"),d({variant:"outline",color:"primary",size:"md"},"medium"),d({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],h=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},d({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),d({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),d({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),m({data:w}),h())}}function lo(t,e={}){const{bau:n,css:o}=t,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(m,...u){return a("Login")}}const uo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:i,h2:s}=n.tags,r=lo(t);return()=>o({id:"login"},s(e("Login Examples")),i("Basic"),a(r()))};function po(t){const{tr:e,bau:n,css:o}=t,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(e("Pages Examples")),uo(t)()))}}function mo(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ee(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ee(n)}),t}class ie{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ce(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function it(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const bo="</span>",ce=t=>!!t.scope,ho=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class go{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Ce(e)}openNode(e){if(!ce(e))return;const n=ho(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){ce(e)&&(this.buffer+=bo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const le=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class Vt{constructor(){this.rootNode=le(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=le({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{Vt._collapse(n)}))}}class fo extends Vt{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new go(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function vt(t){return t?typeof t=="string"?t:t.source:null}function Se(t){return dt("(?=",t,")")}function vo(t){return dt("(?:",t,")*")}function xo(t){return dt("(?:",t,")?")}function dt(...t){return t.map(n=>vt(n)).join("")}function wo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function Xt(...t){return"("+(wo(t).capture?"":"?:")+t.map(o=>vt(o)).join("|")+")"}function ke(t){return new RegExp(t.toString()+"|").exec("").length-1}function yo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Eo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Wt(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let i=vt(o),s="";for(;i.length>0;){const r=Eo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(e)}const Co=/\b\B/,Te="[a-zA-Z]\\w*",Zt="[a-zA-Z_]\\w*",Ae="\\b\\d+(\\.\\d+)?",Me="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",De="\\b(0b[01]+)",So="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ko=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=dt(e,/.*\b/,t.binary,/\b.*/)),it({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},xt={begin:"\\\\[\\s\\S]",relevance:0},To={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xt]},Ao={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xt]},Mo={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Dt=function(t,e,n={}){const o=it({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=Xt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:dt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Do=Dt("//","$"),Io=Dt("/\\*","\\*/"),$o=Dt("#","$"),No={scope:"number",begin:Ae,relevance:0},_o={scope:"number",begin:Me,relevance:0},Bo={scope:"number",begin:De,relevance:0},Ro={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[xt,{begin:/\[/,end:/\]/,relevance:0,contains:[xt]}]}]},Oo={scope:"title",begin:Te,relevance:0},Lo={scope:"title",begin:Zt,relevance:0},Po={begin:"\\.\\s*"+Zt,relevance:0},jo=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var At=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Co,IDENT_RE:Te,UNDERSCORE_IDENT_RE:Zt,NUMBER_RE:Ae,C_NUMBER_RE:Me,BINARY_NUMBER_RE:De,RE_STARTERS_RE:So,SHEBANG:ko,BACKSLASH_ESCAPE:xt,APOS_STRING_MODE:To,QUOTE_STRING_MODE:Ao,PHRASAL_WORDS_MODE:Mo,COMMENT:Dt,C_LINE_COMMENT_MODE:Do,C_BLOCK_COMMENT_MODE:Io,HASH_COMMENT_MODE:$o,NUMBER_MODE:No,C_NUMBER_MODE:_o,BINARY_NUMBER_MODE:Bo,REGEXP_MODE:Ro,TITLE_MODE:Oo,UNDERSCORE_TITLE_MODE:Lo,METHOD_GUARD:Po,END_SAME_AS_BEGIN:jo});function zo(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function Ho(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function Uo(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=zo,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function Go(t,e){Array.isArray(t.illegal)&&(t.illegal=Xt(...t.illegal))}function Fo(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function Vo(t,e){t.relevance===void 0&&(t.relevance=1)}const Xo=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=dt(n.beforeMatch,Se(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Wo=["of","and","for","in","not","or","if","then","parent","list","value"],Zo="keyword";function Ie(t,e,n=Zo){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(i){Object.assign(o,Ie(t[i],e,i))}),o;function a(i,s){e&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,Ko(c[0],c[1])]})}}function Ko(t,e){return e?Number(e):Yo(t)?0:1}function Yo(t){return Wo.includes(t.toLowerCase())}const ue={},ut=t=>{console.error(t)},de=(t,...e)=>{console.log(`WARN: ${t}`,...e)},pt=(t,e)=>{ue[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),ue[`${t}/${e}`]=!0)},Mt=new Error;function $e(t,e,{key:n}){let o=0;const a=t[n],i={},s={};for(let r=1;r<=e.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=ke(e[r-1]);t[n]=s,t[n]._emit=i,t[n]._multi=!0}function qo(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ut("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Mt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ut("beginScope must be object"),Mt;$e(t,t.begin,{key:"beginScope"}),t.begin=Wt(t.begin,{joinWith:""})}}function Jo(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ut("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Mt;if(typeof t.endScope!="object"||t.endScope===null)throw ut("endScope must be object"),Mt;$e(t,t.end,{key:"endScope"}),t.end=Wt(t.end,{joinWith:""})}}function Qo(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function ta(t){Qo(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),qo(t),Jo(t)}function ea(t){function e(s,r){return new RegExp(vt(s),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=ke(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=e(Wt(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((m,u)=>u>0&&m!==void 0),d=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,d)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,d])=>c.addRule(l,d)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const d=this.getMatcher(0);d.lastIndex=this.lastIndex+1,l=d.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[Ho,Fo,ta,Xo].forEach(d=>d(s,r)),t.compilerExtensions.forEach(d=>d(s,r)),s.__beforeBegin=null,[Uo,Go,Vo].forEach(d=>d(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Ie(s.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=e(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=e(c.end)),c.terminatorEnd=vt(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=e(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(d){return na(d==="self"?s:d)})),s.contains.forEach(function(d){i(d,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=it(t.classNameAliases||{}),i(t)}function Ne(t){return t?t.endsWithParent||Ne(t.starts):!1}function na(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return it(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ne(t)?it(t,{starts:t.starts?it(t.starts):null}):Object.isFrozen(t)?it(t):t}var oa="11.8.0";class aa extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const jt=Ce,pe=it,me=Symbol("nomatch"),ra=7,_e=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:fo};function c(p){return r.noHighlightRe.test(p)}function l(p){let b=p.className+" ";b+=p.parentNode?p.parentNode.className:"";const v=r.languageDetectRe.exec(b);if(v){const y=$(v[1]);return y||(de(i.replace("{}",v[1])),de("Falling back to no-highlight mode for this block.",p)),y?v[1]:"no-highlight"}return b.split(/\s+/).find(y=>c(y)||$(y))}function d(p,b,v){let y="",P="";typeof b=="object"?(y=p,v=b.ignoreIllegals,P=b.language):(pt("10.7.0","highlight(lang, code, ...args) has been deprecated."),pt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=p,y=b),v===void 0&&(v=!0);const _={code:y,language:P};J("before:highlight",_);const X=_.result?_.result:m(_.language,_.code,v);return X.code=_.code,J("after:highlight",X),X}function m(p,b,v,y){const P=Object.create(null);function _(S,A){return S.keywords[A]}function X(){if(!L.keywords){Q.addText(K);return}let S=0;L.keywordPatternRe.lastIndex=0;let A=L.keywordPatternRe.exec(K),z="";for(;A;){z+=K.substring(S,A.index);const F=at.case_insensitive?A[0].toLowerCase():A[0],tt=_(L,F);if(tt){const[st,An]=tt;if(Q.addText(z),z="",P[F]=(P[F]||0)+1,P[F]<=ra&&(St+=An),st.startsWith("_"))z+=A[0];else{const Mn=at.classNameAliases[st]||st;G(A[0],Mn)}}else z+=A[0];S=L.keywordPatternRe.lastIndex,A=L.keywordPatternRe.exec(K)}z+=K.substring(S),Q.addText(z)}function O(){if(K==="")return;let S=null;if(typeof L.subLanguage=="string"){if(!e[L.subLanguage]){Q.addText(K);return}S=m(L.subLanguage,K,!0,ne[L.subLanguage]),ne[L.subLanguage]=S._top}else S=g(K,L.subLanguage.length?L.subLanguage:null);L.relevance>0&&(St+=S.relevance),Q.__addSublanguage(S._emitter,S.language)}function T(){L.subLanguage!=null?O():X(),K=""}function G(S,A){S!==""&&(Q.startScope(A),Q.addText(S),Q.endScope())}function et(S,A){let z=1;const F=A.length-1;for(;z<=F;){if(!S._emit[z]){z++;continue}const tt=at.classNameAliases[S[z]]||S[z],st=A[z];tt?G(st,tt):(K=st,X(),K=""),z++}}function ot(S,A){return S.scope&&typeof S.scope=="string"&&Q.openNode(at.classNameAliases[S.scope]||S.scope),S.beginScope&&(S.beginScope._wrap?(G(K,at.classNameAliases[S.beginScope._wrap]||S.beginScope._wrap),K=""):S.beginScope._multi&&(et(S.beginScope,A),K="")),L=Object.create(S,{parent:{value:L}}),L}function rt(S,A,z){let F=yo(S.endRe,z);if(F){if(S["on:end"]){const tt=new ie(S);S["on:end"](A,tt),tt.isMatchIgnored&&(F=!1)}if(F){for(;S.endsParent&&S.parent;)S=S.parent;return S}}if(S.endsWithParent)return rt(S.parent,A,z)}function _t(S){return L.matcher.regexIndex===0?(K+=S[0],1):(Ot=!0,0)}function Cn(S){const A=S[0],z=S.rule,F=new ie(z),tt=[z.__beforeBegin,z["on:begin"]];for(const st of tt)if(st&&(st(S,F),F.isMatchIgnored))return _t(A);return z.skip?K+=A:(z.excludeBegin&&(K+=A),T(),!z.returnBegin&&!z.excludeBegin&&(K=A)),ot(z,S),z.returnBegin?0:A.length}function Sn(S){const A=S[0],z=b.substring(S.index),F=rt(L,S,z);if(!F)return me;const tt=L;L.endScope&&L.endScope._wrap?(T(),G(A,L.endScope._wrap)):L.endScope&&L.endScope._multi?(T(),et(L.endScope,S)):tt.skip?K+=A:(tt.returnEnd||tt.excludeEnd||(K+=A),T(),tt.excludeEnd&&(K=A));do L.scope&&Q.closeNode(),!L.skip&&!L.subLanguage&&(St+=L.relevance),L=L.parent;while(L!==F.parent);return F.starts&&ot(F.starts,S),tt.returnEnd?0:A.length}function kn(){const S=[];for(let A=L;A!==at;A=A.parent)A.scope&&S.unshift(A.scope);S.forEach(A=>Q.openNode(A))}let Ct={};function ee(S,A){const z=A&&A[0];if(K+=S,z==null)return T(),0;if(Ct.type==="begin"&&A.type==="end"&&Ct.index===A.index&&z===""){if(K+=b.slice(A.index,A.index+1),!a){const F=new Error(`0 width match regex (${p})`);throw F.languageName=p,F.badRule=Ct.rule,F}return 1}if(Ct=A,A.type==="begin")return Cn(A);if(A.type==="illegal"&&!v){const F=new Error('Illegal lexeme "'+z+'" for mode "'+(L.scope||"<unnamed>")+'"');throw F.mode=L,F}else if(A.type==="end"){const F=Sn(A);if(F!==me)return F}if(A.type==="illegal"&&z==="")return 1;if(Rt>1e5&&Rt>A.index*3)throw new Error("potential infinite loop, way more iterations than matches");return K+=z,z.length}const at=$(p);if(!at)throw ut(i.replace("{}",p)),new Error('Unknown language: "'+p+'"');const Tn=ea(at);let Bt="",L=y||Tn;const ne={},Q=new r.__emitter(r);kn();let K="",St=0,ct=0,Rt=0,Ot=!1;try{if(at.__emitTokens)at.__emitTokens(b,Q);else{for(L.matcher.considerAll();;){Rt++,Ot?Ot=!1:L.matcher.considerAll(),L.matcher.lastIndex=ct;const S=L.matcher.exec(b);if(!S)break;const A=b.substring(ct,S.index),z=ee(A,S);ct=S.index+z}ee(b.substring(ct))}return Q.finalize(),Bt=Q.toHTML(),{language:p,value:Bt,relevance:St,illegal:!1,_emitter:Q,_top:L}}catch(S){if(S.message&&S.message.includes("Illegal"))return{language:p,value:jt(b),illegal:!0,relevance:0,_illegalBy:{message:S.message,index:ct,context:b.slice(ct-100,ct+100),mode:S.mode,resultSoFar:Bt},_emitter:Q};if(a)return{language:p,value:jt(b),illegal:!1,relevance:0,errorRaised:S,_emitter:Q,_top:L};throw S}}function u(p){const b={value:jt(p),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(p),b}function g(p,b){b=b||r.languages||Object.keys(e);const v=u(p),y=b.filter($).filter(j).map(T=>m(T,p,!1));y.unshift(v);const P=y.sort((T,G)=>{if(T.relevance!==G.relevance)return G.relevance-T.relevance;if(T.language&&G.language){if($(T.language).supersetOf===G.language)return 1;if($(G.language).supersetOf===T.language)return-1}return 0}),[_,X]=P,O=_;return O.secondBest=X,O}function w(p,b,v){const y=b&&n[b]||v;p.classList.add("hljs"),p.classList.add(`language-${y}`)}function f(p){let b=null;const v=l(p);if(c(v))return;if(J("before:highlightElement",{el:p,language:v}),p.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),r.throwUnescapedHTML))throw new aa("One of your code blocks includes unescaped HTML.",p.innerHTML);b=p;const y=b.textContent,P=v?d(y,{language:v,ignoreIllegals:!0}):g(y);p.innerHTML=P.value,w(p,v,P.language),p.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(p.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),J("after:highlightElement",{el:p,result:P,text:y})}function h(p){r=pe(r,p)}const C=()=>{D(),pt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){D(),pt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let k=!1;function D(){if(document.readyState==="loading"){k=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function N(){k&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",N,!1);function R(p,b){let v=null;try{v=b(t)}catch(y){if(ut("Language definition for '{}' could not be registered.".replace("{}",p)),a)ut(y);else throw y;v=s}v.name||(v.name=p),e[p]=v,v.rawDefinition=b.bind(null,t),v.aliases&&H(v.aliases,{languageName:p})}function I(p){delete e[p];for(const b of Object.keys(n))n[b]===p&&delete n[b]}function B(){return Object.keys(e)}function $(p){return p=(p||"").toLowerCase(),e[p]||e[n[p]]}function H(p,{languageName:b}){typeof p=="string"&&(p=[p]),p.forEach(v=>{n[v.toLowerCase()]=b})}function j(p){const b=$(p);return b&&!b.disableAutodetect}function U(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=b=>{p["before:highlightBlock"](Object.assign({block:b.el},b))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=b=>{p["after:highlightBlock"](Object.assign({block:b.el},b))})}function W(p){U(p),o.push(p)}function Z(p){const b=o.indexOf(p);b!==-1&&o.splice(b,1)}function J(p,b){const v=p;o.forEach(function(y){y[v]&&y[v](b)})}function x(p){return pt("10.7.0","highlightBlock will be removed entirely in v12.0"),pt("10.7.0","Please use highlightElement now."),f(p)}Object.assign(t,{highlight:d,highlightAuto:g,highlightAll:D,highlightElement:f,highlightBlock:x,configure:h,initHighlighting:C,initHighlightingOnLoad:E,registerLanguage:R,unregisterLanguage:I,listLanguages:B,getLanguage:$,registerAliases:H,autoDetection:j,inherit:pe,addPlugin:W,removePlugin:Z}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=oa,t.regex={concat:dt,lookahead:Se,either:Xt,optional:xo,anyNumberOfTimes:vo};for(const p in At)typeof At[p]=="object"&&Ee(At[p]);return Object.assign(t,At),t},bt=_e({});bt.newInstance=()=>_e({});var sa=bt;bt.HighlightJS=bt;bt.default=bt;const ft=mo(sa),be="[A-Za-z$_][0-9A-Za-z$_]*",ia=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],ca=["true","false","null","undefined","NaN","Infinity"],Be=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Re=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Oe=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],la=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ua=[].concat(Oe,Be,Re);function Le(t){const e=t.regex,n=(b,{after:v})=>{const y="</"+b[0].slice(1);return b.input.indexOf(y,v)!==-1},o=be,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,v)=>{const y=b[0].length+b.index,P=b.input[y];if(P==="<"||P===","){v.ignoreMatch();return}P===">"&&(n(b,{after:y})||v.ignoreMatch());let _;const X=b.input.substring(y);if(_=X.match(/^\s*=/)){v.ignoreMatch();return}if((_=X.match(/^\s+extends\s+/))&&_.index===0){v.ignoreMatch();return}}},r={$pattern:be,keyword:ia,literal:ca,built_in:ua,"variable.language":la},c="[0-9](_?[0-9])*",l=`\\.(${c})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},w={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,u],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},k=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,w,f,h,{match:/\$\d+/},m];u.contains=k.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(k)});const D=[].concat(E,u.contains),N=D.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(D)}]),R={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:N},I={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Be,...Re]}},$={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},H={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[R],illegal:/%/},j={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function U(b){return e.concat("(?!",b.join("|"),")")}const W={match:e.concat(/\b/,U([...Oe,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},Z={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},J={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},R]},x="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",p={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(x)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[R]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:N,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),$,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,w,f,h,E,{match:/\$\d+/},m,B,{className:"attr",begin:o+e.lookahead(":"),relevance:0},p,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,t.REGEXP_MODE,{className:"function",begin:x,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:N}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},H,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[R,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},Z,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[R]},W,j,I,J,{match:/\$[(.]/}]}}function da(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const pa=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return ft.registerLanguage("javascript",Le),ft.registerLanguage("sh",da),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=ft.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function ma(t){const{bau:e,css:n}=t,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=e.tags,d=pa(t);return function(){return o({class:n`
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
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}const Pe=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=e.tags,d=["sm","md","lg"];return function({Item:u,name:g}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(s(l(g??"Variant/Color"),nt.map(w=>l(w)))),i(qn.map(w=>s(l(w),nt.map((f,h)=>r(u({color:f,variant:w,size:d[h%3]},{index:h}))))))))}},V=t=>{const{bau:e,css:n}=t,{article:o,section:a,h1:i,p:s,h2:r,h3:c,pre:l,div:d,code:m}=e.tags;ft.registerLanguage("javascript",Le);const u=Pe(t),g=({text:w})=>l({class:n`
          display: inline-block;
        `},m({class:"hljs language-js",bauCreated:({element:f})=>{f.innerHTML=ft.highlight(w,{language:"js"}).value}}));return function(f){return o({class:n``},i(f.title),s(f.description),f.gridItem&&[r("Gallery"),f.gridItem&&u({Item:f.gridItem(t)})],r("Usage"),c("Import"),g({text:f.importStatement}),r("Examples"),f.examples.map(h=>a(i(h.title),s(h.description),d(h.createComponent(t)()),g({text:h.code}))))}},ba=()=>nt.map(t=>`
& li.plain.${t} h3::after {
  color: var(--color-${t});
}
& li.outline.${t} h3::after {
  color: var(--color-${t});
}
& h3.solid.${t}:hover {
  filter: brightness(var(--brightness-hover-always));
}
`).join(`
`);function It(t,e){const{bau:n,css:o}=t,{accordionDefs:a}=e,{div:i,ul:s,li:r,header:c,h3:l,button:d}=n.tags,m=n.state(""),u=f=>h=>{m.val==f?m.val="":m.val=f},g=({element:f,open:h})=>{const C=()=>{f.removeEventListener("transitionend",C)};function E(D){D.addEventListener("transitionend",C),window.requestAnimationFrame(()=>{D.style.height="0px"})}function k(D){D.addEventListener("transitionend",C),D.style.height=D.scrollHeight+"px"}f.scrollHeight!=0&&(h?k(f):E(f))},w=o`
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
    ${ba()}
  `;return function(...h){let[{color:C,variant:E="outline",size:k="md",content:D,...N},...R]=Y(h);const I=B=>{const{Header:$,Content:H,name:j}=B;return r({class:M(C,E,k),onclick:u(j)},l({class:()=>M(m.val==j&&"active")},d({type:"button","aria-controls":`bau-${j}`,"aria-expanded":({element:U})=>m.val==j},$(B))),i({class:"content",role:"region",id:`bau-${j}`,"data-state":({element:U})=>{const W=m.val==j;return g({element:U,open:W}),W}},H(B)))};return i({class:M("accordion",w,e==null?void 0:e.class,N.class)},s(a.map(I)))}}const je=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=It(t,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return s=>i({...s})},ha=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=It(t,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>i({color:"neutral",variant:"outline"})},ga=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,ze=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},fa=t=>{const{css:e}=t,n=ze(t),o=It(t,{accordionDefs:n});return()=>o({color:"warning",class:e`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},va=`import accordion from "@grucloud/bau-ui/accordion";
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
`,xa=t=>{const{css:e}=t,n=ze(t),o=It(t,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:e`
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
      `})},wa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,ya={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:ga,createComponent:ha},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:va,createComponent:fa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:wa,createComponent:xa}],gridItem:je},Ea=t=>{const e=V(t);return()=>e(ya)},Ca={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Sa=({css:t,createGlobalStyles:e})=>{e`
:root {
  --alert-border-left-width: 8px;
}
`},ka=()=>nt.map(t=>`
&.alert.outline.${t} {
  & .icon {
    color: var(--color-${t})
  }
}
`).join(`
`);function $t(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i,i:s}=n.tags;Sa({css:o,createGlobalStyles:a});const r=o`
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
    ${ka()}
  `,c=q(t),l=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(m,...u){const{variant:g="outline",color:w="neutral",size:f="md",onRemove:h,...C}=m;return i({...C,class:M(`alert-${g}`,g,w,f,r,e==null?void 0:e.class,m.class,"alert"),role:"alert"},s({class:"icon"},Ca[w]),i({class:"content"},...u),h&&l({onclick:h}))}}const He=t=>{const e=$t(t);return n=>e({...n},`Alert ${n.variant} ${n.color}`)},Ta=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=$t(t);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Aa=`import alert from "@grucloud/bau-ui/alert";
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
`,Ma=t=>{const{css:e}=t,n=$t(t,{class:e`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},Da=`import alert from "@grucloud/bau-ui/alert";
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
`,Ia={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Aa,createComponent:Ta},{title:"Custom Alert ",description:"A custom alert.",code:Da,createComponent:Ma}],gridItem:He},$a=t=>{const e=V(t);return()=>e(Ia)},Na=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:i=10,deleteAfterDuration:s=15e3}=e,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},m=({id:u,status:g})=>{const w=c.val.findIndex(f=>f.id===u);w!=-1&&(c.val[w].status=g)};return function(g={},...w){const f=({id:E})=>{m({id:E,status:"removing"});const k=c.val.findIndex(D=>D.id===E);k!=-1&&c.val.splice(k,1)},h=({Component:E})=>{const k={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(k),setTimeout(()=>f(k),s)},C=E=>r({class:d.item,onclick:()=>f(E)},E.Component());return document.addEventListener("alert.add",E=>h(E.detail)),document.addEventListener("alert.remove",E=>f(E.detail)),r({class:M(d.stack,e==null?void 0:e.class,g.class)},n.loop(c,r(),C))}},_a=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=Na(t,{deleteAfterDuration:2e4}),i=q(t),s=$t(t);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},Ba=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ra={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:Ba,createComponent:_a}]},Oa=t=>{const e=V(t);return()=>e(Ra)},La=({keyframes:t})=>({hideRight:t`
   from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
  `,showRight:t`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 `}),Pa=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=ve(t),i=q(t),s=La(t),r=e.state(!0);return()=>n(i({onclick:()=>{r.val=!r.val}},()=>r.val?"Hide":"Show"),a({animationHide:()=>`${s.hideRight} 0.5s`,animationShow:()=>`${s.showRight} 0.5s`},()=>o(r.val?"Ciao":"Mondo")))},ja=`import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

const createStyles = ({ keyframes }: Context) => {
  return {
    hideRight: keyframes\`
   from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
  \`,
    showRight: keyframes\`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
 \`,
  };
};

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const styles = createStyles(context);
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
          animationHide: () => \`\${styles.hideRight} 0.5s\`,
          animationShow: () => \`\${styles.showRight} 0.5s\`,
        },
        () => div(showState.val ? "Ciao" : "Mondo")
      )
    );
};
`,za={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Default",description:"A simple animate.",code:ja,createComponent:Pa}]},Ha=t=>{const e=V(t);return()=>e(za)};function Ue(t,e){const{bau:n,css:o}=t,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=m=>{s.val=!1,r.val=!0},d=o`
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
  `;return function(...u){let[{color:g,variant:w="outline",size:f="md",width:h=30,height:C=30,...E},...k]=Y(u);return a({class:M(d,e==null?void 0:e.class,E.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:h,height:C,onload:c,onerror:l,class:M(g,w,f,d,e==null?void 0:e.class,E.class),...E}))}}const Ge=t=>{const{css:e}=t,n=Ue(t,{class:e`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},Ua=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=Ue(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},Ga=`import avatar from "@grucloud/bau-ui/avatar";
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
`,Fa={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:Ga,createComponent:Ua}],gridItem:Ge},Va=t=>{const e=V(t);return()=>e(Fa)};function Kt(t,e){const{bau:n,css:o,window:a}=t,{dialog:i}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:d,onClose:m,...u},...g]=Y(c);const w=C=>{h.style.opacity=1,h.showModal();const E=d.getBoundingClientRect(),k=h.getBoundingClientRect();E.x<a.innerWidth/2?h.style.left=E.left+"px":h.style.left=E.right-k.width+"px",E.y<a.innerHeight/2?h.style.top=E.top+E.height+"px":h.style.top=E.top-k.height+"px"},f=C=>{const E=()=>{h.close(),h.removeEventListener("transitionend",E)};h.addEventListener("transitionend",E),h.style.opacity=0},h=i({role:"presentation",class:M("popover",s,e==null?void 0:e.class,u==null?void 0:u.class),onclick:C=>C.target===h&&(f(),m==null?void 0:m.call())},l);return h.closeDialog=f,h.openDialog=w,h}}const Xa=()=>nt.map(t=>`
&.input.${t} {
  border: 2px solid transparent;
}
&.input.plain.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
}
&.input.outline.${t} {
  border: 1px solid var(--color-${t});
  &:focus {
    border: 2px solid var(--color-${t});
  };
}
&.input.soft.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
} 
&.input.solid.${t} {
  &:focus {
    border-color: var(--color-${t});
  };
  &::placeholder {
    color: var(--font-color-inverse);
    filter: brightness(var(--brightness-hover));
  }
  &:hover {
    background-color: var(--color-${t}-light);
  }
}
`).join(`
`);function Yt(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${Xa()}
  `;return function(r){const{size:c="md",variant:l="outline",color:d="neutral",name:m,id:u,disabled:g,...w}=r;return a({...w,class:M("input",c,d,l,i,e==null?void 0:e.class,w.class)})}}const Wa=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Fe(t,e){const{bau:n,css:o}=t,{div:a,li:i,ul:s}=n.tags,r=Kt(t),c=q(t),l=Yt(t),d=wt(t),m=o`
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

    ${Wa()}
  `,u=n.state(""),g=n.state(""),w=n.state(!1),f=n.state(0),h=()=>{w.val=!1};return function(...E){let[{variant:k="outline",color:D,size:N="md",id:R,label:I,placeholder:B,Option:$,options:H,getOptionLabel:j=({label:T})=>T,...U},...W]=Y(E);const Z=n.state(H),J=()=>{O.openDialog(),w.val=!0,g.val="",Z.val=H},x=()=>{O.closeDialog(),w.val=!1,g.val=""},p=T=>{const{value:G}=T.target;g.val=G,G?Z.val=H.filter(et=>j(et).match(new RegExp(`${G}`,"i"))):Z.val=H},b=T=>{w.val?x():J()},v=({option:T,index:G})=>et=>{u.val=j(T),f.val=G,x()},y=T=>{switch(console.log("onkeydown",T.key,f.val),T.key){case"Escape":x();break;case"ArrowDown":f.val<Z.val.length-1?f.val++:f.val=0;break;case"ArrowUp":f.val<=0?f.val=Z.val.length-1:f.val--;break;case"Enter":u.val=j(Z.val[f.val]),g.val="",x();break}},P=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":w,"aria-label":I,onclick:b,variant:k,color:D,size:N},()=>!u.val&&I,u),_=l({id:R,value:g,placeholder:B,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":w,oninput:p,onkeydown:y,variant:k,color:D,size:N}),O=r({id:R,triggerEl:P,contentEl:(()=>a({class:M(k,D,N,"content")},_,()=>d({class:M(k,D,N)},Z.val.map((T,G)=>i({class:()=>M(f.val==G&&"active"),onclick:v({option:T,index:G})},$(T))))))(),onClose:h});return a({...U,class:M("autocomplete",m,e==null?void 0:e.class,U==null?void 0:U.class)},P,O)}}const Ve=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=Fe(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},Za=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,s=Fe(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Ka=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ya={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:Ka,createComponent:Za}],gridItem:Ve},qa=t=>{const e=V(t);return()=>e(Ya)};function Xe(t,e){const{bau:n,css:o}=t,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",content:m,...u},...g]=Y(r);return a({...u,class:M("badge",i,e==null?void 0:e.class,u==null?void 0:u.class)},a({class:M(c,l,d)},m),...g)}}const We=t=>{const e=Xe(t);return(n,{index:o})=>e({...n,content:`${o*100}`},"☏")},Ja=t=>{const{bau:e}=t,{section:n}=e.tags,o=Xe(t);return()=>n(o({content:"10"},"☏"))},Qa=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,tr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Qa,createComponent:Ja}],gridItem:We},er=t=>{const e=V(t);return()=>e(tr)};function Ze(t,e){const{bau:n,css:o}=t,{ul:a,li:i,a:s,span:r}=n.tags,c=q(t),l=o`
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
  `;return function(...m){let[{color:u,variant:g="outline",size:w="md",items:f,...h},...C]=Y(m);return a({...h,class:M(l,e==null?void 0:e.class,h==null?void 0:h.class)},f.map(({href:E,name:k})=>i((E?c:r)({href:E,color:u,variant:g,size:w,class:M(u,g,w)},k))))}}const Ke=t=>{const e={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Ze(t);return o=>n({...o,...e})},nr=t=>{const{bau:e}=t,{section:n}=e.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Ze(t);return()=>n(a(o))},or=`import breadcrumbs, {
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
`,ar={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:or,createComponent:nr}],gridItem:Ke},rr=t=>{const e=V(t);return()=>e(ar)},Ye=t=>{const e=q(t);return n=>e({...n},`${n.variant} ${n.color} ${n.size}`)},sr=t=>{const{bau:e}=t,{section:n}=e.tags,o=q(t),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},ir=`import button from "@grucloud/bau-ui/button";
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
`,cr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:ir,createComponent:sr}],gridItem:Ye},lr=t=>{const e=V(t);return()=>e(cr)},ur=()=>nt.map(t=>`
&.button-group.${t} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${t}) !important;
  }
  & button:not(:first-child) { 
    border-left: none !important;
  }
}

&.button-group.outline.${t} {
  border: none;
}

&.button-group.solid.${t} {
  & button:not(:last-child) { 
    border-right: 2px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function qt(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
    ${ur()}
  `;return function(...r){let[{variant:c="outline",size:l="md",color:d,...m},...u]=Y(r);return a({...m,class:M("button-group",c,d,l,i,e==null?void 0:e.class,m==null?void 0:m.class)},...u)}}const qe=t=>{const e=["ONE","TWO","THREE"],n=q(t),o=qt(t);return a=>o({...a},e.map(i=>n(a,i)))},dr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a=q(t),i=qt(t),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},pr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,mr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:pr,createComponent:dr}],gridItem:qe},br=t=>{const e=V(t);return()=>e(mr)};function Je(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>nt.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{color:l="neutral",variant:d="plain",size:m,...u},...g]=Y(c);return a({...u,type:"date",class:M("calendar",s,l,d,m,e==null?void 0:e.class,u==null?void 0:u.class)},...g)}}const Qe=t=>{const e=Je(t);return n=>e({...n})},hr=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),i=Je(t);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},gr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,fr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:gr,createComponent:hr}],gridItem:Qe},vr=t=>{const e=V(t);return()=>e(fr)},tn=t=>{const e=Ft(t);return n=>e({...n},`Chip ${n.color} ${n.variant}`)},xr=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ft(t);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},wr=`import chip from "@grucloud/bau-ui/chip";
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
`,yr={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:wr,createComponent:xr}],gridItem:tn},Er=t=>{const e=V(t);return()=>e(yr)};function en(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d="md",...m},...u]=Y(r);return a({type:"checkbox",required:"required",...m,class:M(i,c,l,d,e==null?void 0:e.class,m==null?void 0:m.class)})}}const nn=t=>{const{bau:e,css:n}=t,{label:o}=e.tags,a=en(t);return i=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size}`,a({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},Cr=t=>{const{bau:e,css:n}=t,{section:o,label:a}=e.tags,i=en(t),s=e.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},Sr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,kr={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:Sr,createComponent:Cr}],gridItem:nn},Tr=t=>{const e=V(t);return()=>e(kr)};function Ar(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:d,openState:m,...u},...g]=Y(r);return a({class:M(i,e==null?void 0:e.class,u.class)},a({class:()=>M("overlay",m.val&&"overlay-open"),onclick:()=>{m.val=!1}}),a({class:()=>M("content",m.val&&"content-open")},g))}}const Mr=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),i=Ar(t),s=q(t),r=ye(t);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Dr=`import drawer from "@grucloud/bau-ui/drawer";
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
`,Ir={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Dr,createComponent:Mr}]},$r=t=>{const e=V(t);return()=>e(Ir)},on=t=>{const{config:e}=t,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=Gt(t,{base:e.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},Nr=t=>{const{bau:e,config:n}=t,{section:o}=e.tags,a=e.state(window.location.pathname.replace(n.base,"")),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},s=Gt(t,{base:n.base+"/components/drillDownMenu"});return()=>o(s({tree:i,pathnameState:a}))},_r=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Br={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:_r,createComponent:Nr}],gridItem:on},Rr=t=>{const e=V(t);return()=>e(Br)};function an(t,e){const{bau:n,css:o}=t,{div:a,span:i,label:s,input:r}=n.tags,c={base:o`
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
    `};return function(d,...m){const{variant:u="outline",color:g="neutral",size:w="md",Component:f,disabled:h,...C}=d;return a({class:M(c.base,h&&c.disabled,e==null?void 0:e.class,d.class)},s({class:M(u,g,w)},f({disabled:h}),r({type:"file",disabled:h,...C})),i({class:"filename-display"}))}}const rn=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:r,span:c}=n.tags,l=n.state("No file selected"),d=an(t),m=g=>{const w=g.target.files[0];w?l.val=w.name:l.val="No file selected"},u=({disabled:g})=>r({class:M(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,g&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return g=>d({Component:u,name:"file",accept:"text/*",onchange:m,...g})},Or=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,d=n.state("No file selected"),m=an(t),u=w=>{const f=w.target.files[0];f?d.val=f.name:d.val="No file selected"},g=({disabled:w})=>c({class:M(o`
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
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(e("Choose a file to upload")));return()=>r(m({Component:g,name:"file",accept:"text/*",onchange:u}),c("File selected: ",d))},Lr=`import classNames from "@grucloud/bau-css/classNames";
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
`,Pr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Lr,createComponent:Or}],gridItem:rn},jr=t=>{const e=V(t);return()=>e(Pr)},sn=t=>{const e=Yt(t);return n=>e({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},zr=t=>{const{bau:e}=t,{section:n}=e.tags,o=Yt(t);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},Hr=`import input from "@grucloud/bau-ui/input";
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
`,Ur={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Hr,createComponent:zr}],gridItem:sn},Gr=t=>{const e=V(t);return()=>e(Ur)},Fr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Vr=t=>{const{bau:e,css:n}=t,{span:o,li:a}=e.tags,i=wt(t),s=({code:r,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(r),o(c));return r=>i({...r},Fr.map(s))},Xr=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Wr=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:i}=e.tags,s=wt(t),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},Xr.map(r)))},Zr=`import list from "@grucloud/bau-ui/list";
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
`,Kr={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:Zr,createComponent:Wr}],gridItem:Vr},Yr=t=>{const e=V(t);return()=>e(Kr)};function cn(t,e){const{bau:n,css:o}=t,{dialog:a}=n.tags,s=o`
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
    ${(()=>nt.map(r=>`
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
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:m="md",...u},...g]=Y(c);return a({class:M("modal",s,l,d,m,e==null?void 0:e.class,u==null?void 0:u.class)},...g)}}const ln=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:s}=e.tags,r=q(t),c=cn(t),l=()=>o(Array(10).fill("").map((m,u)=>s(u+1,". Some text here"))),d=m=>{const u=c({id:"my-dialog",...m},a("Header"),l(),i(r({variant:"outline",color:m.color,onclick:()=>{u.close()}},"Cancel"),r({variant:"solid",color:m.color,onclick:()=>{u.close()}},"OK")));return u};return m=>{const u=d(m);return n(r({...m,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},qr=t=>{const{bau:e}=t,{section:n,main:o,header:a,footer:i,p:s}=e.tags,r="neutral",c=q(t),l=cn(t),d=()=>o(Array(10).fill("").map((u,g)=>s(g+1,". Some text here"))),m=l({id:"my-dialog"},a("Header"),d(),i(c({variant:"outline",color:r,onclick:()=>{m.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{m.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{m.showModal()}},"OPEN MODAL"),m)},Jr=`import modal from "@grucloud/bau-ui/modal";
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
`,Qr={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Jr,createComponent:qr}],gridItem:ln},ts=t=>{const e=V(t);return()=>e(Qr)},es=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:i}=e.tags,s=q(t),r=Kt(t),c=()=>s({variant:"outline",color:"success",onclick:()=>m.open?m.closeDialog():m.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),d=c(),m=r({id:"my-popover-left",triggerEl:d,contentEl:l()});return()=>n(o(d,m))},ns=`import popover from "@grucloud/bau-ui/popover";
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
`,os={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:ns,createComponent:es}]},as=t=>{const e=V(t);return()=>e(os)},rs=()=>nt.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function un(t,e){const{bau:n,css:o}=t,{div:a,li:i}=n.tags,s=q(t),r=Kt(t),c=wt(t),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${rs()}
  `,d=n.state(""),m=n.state(!1),u=n.state(0);return function(...w){let[{color:f="neutral",variant:h="outline",size:C="md",id:E,label:k,Option:D,options:N,getOptionLabel:R=({label:b})=>b,...I},...B]=Y(w);const $=()=>{p.openDialog(),p.focus(),m.val=!0},H=()=>{p.closeDialog(),m.val=!1},j=()=>{m.val=!1},U=b=>{m.val?H():$()},W=({option:b,index:v})=>y=>{d.val=R(b),u.val=v,H()},Z=b=>{switch(b.preventDefault(),b.key){case"Escape":H();break;case"ArrowDown":u.val<N.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=N.length-1:u.val--;break;case"Enter":m.val?(d.val=R(N[u.val]),H()):$();break}},J=()=>c({tabindex:"0",class:M(f,h)},N.map((b,v)=>i({class:()=>M(u.val==v&&"active"),onclick:W({option:b,index:v})},D(b)))),x=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":m,"aria-label":k,onclick:U,color:f,variant:h,size:C},()=>!d.val&&k,d),p=r({id:E,triggerEl:x,contentEl:J(),onClose:j});return a({...I,class:M("select",f,C,l,e==null?void 0:e.class,I==null?void 0:I.class),onkeydown:Z},x,p)}}const dn=t=>{const{bau:e,css:n}=t,{div:o,span:a}=e.tags,i=un(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],r=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>i({...c,options:s,Option:r,getOptionLabel:({label:l})=>l,label:"Select a country..."})},ss=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:i}=e.tags,s=un(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},is=`import select from "@grucloud/bau-ui/select";
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
`,cs={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:is,createComponent:ss}],gridItem:dn},ls=t=>{const e=V(t);return()=>e(cs)};function Nt(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
    ${(()=>nt.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:d="outline",size:m,...u},...g]=Y(c);return a({...u,type:"range",class:M("slider",l,d,m,s,e==null?void 0:e.class,u.class)},...g)}}const pn=t=>{const{bau:e}=t,n=e.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Nt(t);return i=>a({...i,oninput:o})},us=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:i}=e.tags,s=e.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Nt(t);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},ds=`import slider from "@grucloud/bau-ui/slider";
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
`,ps=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:s,br:r,option:c}=e.tags,l=e.state(0),d=u=>{l.val=u==null?void 0:u.target.value},m=Nt(t);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,m({oninput:d,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},ms=`import slider from "@grucloud/bau-ui/slider";
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
`,bs=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i,datalist:s,br:r,option:c}=e.tags,l=e.state(0),d=u=>{l.val=u==null?void 0:u.target.value},m=Nt(t);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,m({oninput:d,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(u=>c({value:Number(u),label:u})))))},hs=`import slider from "@grucloud/bau-ui/slider";
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
`,gs={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:ds,createComponent:us},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:ms,createComponent:ps},{title:"Vertical Mark",description:"A vertical slider with marks.",code:hs,createComponent:bs}],gridItem:pn},fs=t=>{const e=V(t);return()=>e(gs)},he={sm:16,md:32,lg:64};function Jt(t,e={}){const{bau:n,css:o}=t,{svg:a,animate:i,animateTransform:s,rect:r}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:d="color-base",variant:m="outline",visibility:u=!0,...g}={}){return a({class:M(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,e.class,g.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:he[l],height:he[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},r({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),r({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},i({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const mn=t=>{const e=Jt(t);return n=>e({...n})},vs=t=>{const{bau:e}=t,{section:n}=e.tags,o=Jt(t);return()=>n(o({}))},xs=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,ws={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:xs,createComponent:vs}],gridItem:mn},ys=t=>{const e=V(t);return()=>e(ws)},Es=()=>nt.map(t=>`
&.switch.plain.${t} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${t});
  }
}
&.switch.outline.${t} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${t});
  }
}
&.switch.soft.${t} {
  &::after {
    background-color: var(--color-emphasis-400);
  }
  &:checked::after {
    background-color: var(--color-${t});
  }
}
&.switch.solid.${t} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-400);
  } 
  &:checked {
    background-color: var(--color-${t}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-400);
  }
}
`).join(`
`);function bn(t,e){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
    ${Es()}
  `;return function(...r){let[{color:c="neutral",variant:l="plain",size:d="md",...m},...u]=Y(r);return a({...m,class:M("switch",i,c,l,d,e==null?void 0:e.class,m.class),type:"checkbox",required:"required"},...u)}}const hn=t=>{const{bau:e,css:n}=t,{form:o,label:a}=e.tags,i=bn(t);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",i({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",i({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},Cs=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:i}=e.tags,s=bn(t);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Ss=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,ks={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Ss,createComponent:Cs}],gridItem:hn},Ts=t=>{const e=V(t);return()=>e(ks)},As=()=>nt.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function yt(t,e){const{bau:n,css:o}=t,{tabDefs:a}=e,{div:i,ul:s,li:r}=n.tags,c=n.state(a),l=n.state(a[0]),d=u=>c.val.find(g=>g.name==u),m={base:o`
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
      ${As()}
    `};return function(...g){let[{color:w,variant:f="plain",size:h,...C},...E]=Y(g);const k=N=>{const{Header:R,disabled:I,name:B}=N;return r({class:()=>M(l.val.name==B&&"active",I&&"disabled"),onclick:$=>$.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:B},bubbles:!0}))},R(N))},D=i({class:M("tabs",m.base,f,h,w,e==null?void 0:e.class,C.class)},n.loop(c,s(),k),()=>l.val.Content?l.val.Content({}):"");return D.addEventListener("tab.select",N=>{var B,$;const{tabName:R}=N.detail,I=d(R);I&&((B=l.val.exit)==null||B.call(),l.val=I,($=I.enter)==null||$.call())},!1),D.addEventListener("tab.add",N=>{var I;const{tab:R}=N.detail;(I=R.enter)==null||I.call(),c.val.push(R)},!1),D.addEventListener("tab.remove",N=>{var I;const R=c.val.findIndex(B=>B.name==N.detail.tabName);R>0&&((I=c.val[R].exit)==null||I.call(),c.val.splice(R,1))},!1),D}}const gn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>i(s)},Ms=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>i({variant:"outline",color:"neutral"})},Ds=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,Is=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,i=yt(t,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},$s=`import tabs from "@grucloud/bau-ui/tabs";
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
`,fn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},Ns=t=>{const{css:e}=t,n=yt(t,{tabDefs:fn(t)});return()=>n({variant:"outline",color:"neutral",class:e`
        flex-direction: column-reverse;
      `})},_s=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Bs=t=>{const{css:e}=t,n=fn(t),o=yt(t,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:e`
        & ul {
          justify-content: center;
        }
      `})},Rs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Os={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Ds,createComponent:Ms},{title:"Extended Tabs",description:"An extended tabs.",code:$s,createComponent:Is},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:_s,createComponent:Ns},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Rs,createComponent:Bs}],gridItem:gn},Ls=t=>{const e=V(t);return()=>e(Os)};function Et(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:i}=n.tags;a`
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
  `;return function(...c){let[{...l},...d]=Y(c);return i({...l,class:M("table-container",s,e==null?void 0:e.class,l==null?void 0:l.class)},...d)}}const Ps=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=e.tags;function m(h,C,E,k,D){return{name:h,calories:C,fat:E,carbs:k,protein:D}}const u=[m("Frozen yoghurt",159,6,24,4),m("Ice cream sandwich",237,9,37,4.3),m("Eclair",262,16,24,6),m("Cupcake",305,3.7,67,4.3),m("Gingerbread",356,16,49,3.9)],g=({name:h,calories:C})=>s(i(h),i({class:n`
            text-align: right;
          `},C)),w=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Et(t,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(d("Basic Table"),w(),l(u.map(g)))))},js=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ht(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const zs=[ht("Frozen yoghurt",159,6,24,4),ht("Ice cream sandwich",237,9,37,4.3),ht("Eclair",262,16,24,6),ht("Cupcake",305,3.7,67,4.3),ht("Gingerbread",356,16,49,3.9)],Hs=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=e.tags,m=({name:w,calories:f})=>s(i(w),i({class:n`
            text-align: right;
          `},f)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Et(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(d("Table Dense"),u(),l(zs.map(m)))))},Us=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function gt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Gs=[gt("Frozen yoghurt",159,6,24,4),gt("Ice cream sandwich",237,9,37,4.3),gt("Eclair",262,16,24,6),gt("Cupcake",305,3.7,67,4.3),gt("Gingerbread",356,16,49,3.9)],Fs=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:d}=e.tags,m=({name:w,calories:f})=>s(i(w),i({class:n`
            text-align: right;
          `},f)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Et(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(d("Table Zebra"),u(),l(Gs.map(m)))))},Vs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Xs={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:js,createComponent:Ps},{title:"Dense",description:"A dense table.",code:Us,createComponent:Hs},{title:"Zebra",description:"A zebra table.",code:Vs,createComponent:Fs}]},Ws=t=>{const e=V(t);return()=>e(Xs)};function vn(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,i=qt(t),s=q(t),r=Jt(t),c=o`
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
  `,l=({label:w,icon:f,...h})=>s({"aria-label":w,title:w,...h},f),d=({count:w,totalCount:f,page:h,rowsPerPage:C})=>a({class:"pages-numbers"},Number(h-1)*Number(C)+(w>0?1:0),"-",Math.min(h*C,f)," of ",f),m=({count:w,page:f,rowsPerPage:h})=>a({class:"pages-numbers"},(f-1)*h+(w>0?1:0),"-",f*h),u=w=>w<=1,g=(w,f,h)=>w>=Math.ceil(f/h);return function(...f){let[{count:h=0,totalCount:C=0,page:E=1,rowsPerPage:k=50,onPageChange:D,isLoading:N=!1,disableFirst:R=()=>u(E),disablePrevious:I=()=>u(E),disableNext:B=()=>g(E,C,k),disableLast:$=()=>g(E,C,k),...H},...j]=Y(f);const U=Math.max(0,Math.ceil(C/k)),W=D({page:1}),Z=D({page:E-1}),J=D({page:E+1}),x=D({page:U}),p=[{label:"First",icon:"⟪",onclick:W,disabled:R()},{label:"Previous",icon:"⟨",onclick:Z,disabled:I()},{label:"Next",icon:"⟩",onclick:J,disabled:B()},{label:"Last",icon:"⟫",onclick:x,disabled:$()}];return a({...H,class:M("table-pagination",c,N&&"disabled",e==null?void 0:e.class,H==null?void 0:H.class)},r({class:"spinner",visibility:N,size:"md"}),C>0?d({count:h,totalCount:C,page:E,maxPages:U,rowsPerPage:k}):m({count:h,page:E,maxPages:U,rowsPerPage:k}),i({variant:"outline",color:"neutral"},p.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Zs=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ks=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=e.tags,l=Zs(45),d=({name:E,email:k})=>i(a(E),a(k)),m=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=vn(t),g=Et(t,{class:n`
      max-width: 650px;
    `}),w=e.state(l),f=e.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=e.derive(()=>w.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),C=({page:E})=>k=>{f.val.page=E};return()=>g(s(m(),()=>c(h.val.map(d))),()=>u({...f.val,onPageChange:C}))},Ys=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=e.tags,d=e.state(!1),m=e.state([]),u=e.state(""),g=e.derive(()=>m.val.length),w=e.state(1),f=e.state(10),h=e.derive(()=>m.val),C=$=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams($).toString()}`,E=({page:$})=>H=>{w.val=$,k(C({page:$,per_page:f.val}))};k(C({page:1,per_page:f.val}));async function k($){try{d.val=!0;const H=await fetch($,{});if(H.ok){const j=await H.json();m.val=j;return}throw H}catch(H){u.val=H.message}finally{d.val=!1}}const D=({name:$,description:H,stargazers_count:j})=>i(a($),a(H),a({class:n`
            text-align: right;
          `},j)),N=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),R=vn(t),I=Et(t,{class:n`
      min-width: 650px;
    `}),B=({message:$})=>l($);return()=>I(()=>R({rowsPerPage:f.val,page:w.val,count:g.val,totalCount:-1,isLoading:d.val,onPageChange:E,disableNext:()=>!1}),s(N(),()=>u.val&&B({message:u.val}),()=>c(h.val.map(D))))},qs=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:i,h2:s,tr:r}=e.tags,c=Ks(t),l=Ys(t),d=(...m)=>a({class:n`
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
        `},...m);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),d(l()),i("Simple Pagination"),d(c()))};function Qt(t,e){const{bau:n,css:o,window:a}=t,{div:i}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:d="bottom-start",color:m="neutral",variant:u="outline",size:g="md",...w},...f]=Y(c);const h=i({class:M("container",...d.split("-"))},i({class:M("content",m,u,g),role:"tooltip"},l)),C=I=>`move-to-${I}`,E=(I,B,$)=>{if(I()){const H=C(B);h.classList.add(H),h.classList.add(B),h.classList.remove($)}},k=(I,B)=>{const $=C(I);h.classList.contains($)&&(h.classList.remove($),h.classList.add(B),h.classList.remove(I))},D=I=>{const B=h.getBoundingClientRect();E(()=>B.x<0,"right","left"),E(()=>B.x+B.width>a.innerWidth,"left","right"),E(()=>B.y<0,"bottom","top"),E(()=>B.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},N=I=>{h.classList.remove("visible"),k("right","left"),k("left","right"),k("bottom","top"),k("top","bottom")};return i({...w,class:M("tooltip",s,e==null?void 0:e.class,w==null?void 0:w.class),bauMounted:({element:I})=>{I.addEventListener("mouseover",D),I.addEventListener("mouseout",N)},bauUnmounted:({element:I})=>{I.removeEventListener("mouseover",D),I.removeEventListener("mouseout",N)}},...f,h)}}const xn=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i}=e.tags,s=q(t),r=Qt(t),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},Js=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,i=q(t),s=Qt(t),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},Qs=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ti=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:i}=e.tags,s=q(t),r=Qt(t),c=()=>o(a("A ",i("tooltip")," can be any component")),l=()=>[o({class:n`
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
        `},r({side:"bottom-start",titleEl:c()},s("bottom start")),r({side:"bottom-centered",titleEl:c()},s("bottom centered")),r({side:"bottom-end",titleEl:c()},s("bottom end")))];return()=>l()},ei=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,ni={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Qs,createComponent:Js},{title:"Grid",description:"Various tooltip position",code:ei,createComponent:ti}],gridItem:xn},oi=t=>{const e=V(t);return()=>e(ni)},wn=t=>{const e=Ut(t);return n=>e(n)},ai=t=>{const{bau:e}=t,{section:n}=e.tags,o=Ut(t);return()=>n(o({}))},ri=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,si={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:ri,createComponent:ai}],gridItem:wn},ii=t=>{const e=V(t);return()=>e(si)},ci=({css:t,createGlobalStyles:e})=>(e`
:root {
  --menu-color: var(--font-color-base);
  --menu-color-active: var(--color-primary);
  --menu-color-background-active: var(--hover-overlay);
  --menu-color-background-hover: var(--hover-overlay);
  --menu-link-padding-horizontal: 0.75rem;
  --menu-link-padding-vertical: 0.375rem;
}
`,{nav:t`
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
  `,expanded:t`
      > div {
        &::after {
          content: "\u203A";
          transform: rotate(90deg);
        }
      }
    `,collapsed:t`
      > div {
        &::after {
          content: "\u203A";
        }
      }
    `});function yn(t,e){const{bau:n,css:o,createGlobalStyles:a,window:i}=t,{renderMenuItem:s}=e,{ul:r,li:c,nav:l,div:d}=n.tags,m=ci({css:o,createGlobalStyles:a}),u=({element:h,closeState:C})=>{h.scrollHeight!=0&&(C.val?g(h):w(h))};function g(h){h.style.height=h.scrollHeight+"px";const C=()=>{h.removeEventListener("transitionend",C)};h.addEventListener("transitionend",C),i.requestAnimationFrame(()=>{h.style.height="0px"})}function w(h){const C=()=>{h.removeEventListener("transitionend",C),h.style.height=null};h.addEventListener("transitionend",C),h.style.height=h.scrollHeight+"px"}const f=({depth:h=1,maxDepth:C,color:E,variant:k,size:D})=>N=>{const{children:R,expanded:I}=N,B=n.state(!I);return c({class:()=>M(R?B.val?m.collapsed:m.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:$=>{R&&(B.val=!B.val)}},s(N.data)),R&&h<C&&r({class:M(E,D),bauMounted:({element:$})=>{B.val&&($.style.height="0px")},"aria-expanded":({element:$})=>(u({element:$,closeState:B}),!B.val)},R.map(f({depth:h+1,maxDepth:C}))))};return function({tree:C,maxDepth:E=1/0,size:k="md",variant:D="plain",color:N="neutral",...R}){return l({class:M(m.nav,k,D,N,e==null?void 0:e.class,R.class)},C.children&&r(C.children.map(f({maxDepth:E,color:N,variant:D,size:k}))))}}const En=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=yn(t,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return s=>i({...s,tree:o})},li=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=yn(t,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},ui=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,di={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:ui,createComponent:li}],gridItem:En},pi=t=>{const e=V(t);return()=>e(di)},mi=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:i,p:s,ul:r,li:c}=e.tags,l=Pe(t),d=q(t),m=[{name:"Accordion",Item:je(t)},{name:"Alert",Item:He(t)},{name:"Autocomplete",Item:Ve(t)},{name:"Avatar",Item:Ge(t)},{name:"Badge",Item:We(t)},{name:"Breadcrumbs",Item:Ke(t)},{name:"Button",Item:Ye(t)},{name:"Button Group",Item:qe(t)},{name:"Calendar",Item:Qe(t)},{name:"Checkbox",Item:nn(t)},{name:"Chip",Item:tn(t)},{name:"DrillDown Menu",Item:on(t)},{name:"File Input",Item:rn(t)},{name:"Input",Item:sn(t)},{name:"Modal",Item:ln(t)},{name:"Select",Item:dn(t)},{name:"Slider",Item:pn(t)},{name:"Spinner",Item:mn(t)},{name:"Switch",Item:hn(t)},{name:"Tabs",Item:gn(t)},{name:"Theme Switch",Item:wn(t)},{name:"Tooltip",Item:xn(t)},{name:"Tree View",Item:En(t)}];return()=>o(i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},m.map(({name:u})=>c(d({color:"primary",variant:"solid",href:`#${u}`,size:"sm"},u)))),m.map(u=>a({id:u.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(u))))},bi=({context:t})=>[{path:"",action:e=>({title:"Bau UI",component:co(t)})},{path:"GettingStarted",action:e=>({title:"Getting Started",component:ma(t)})},{path:"components",action:()=>({title:"Component",component:mi(t)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ea(t)})},{path:"alert",action:()=>({title:"Alert",component:$a(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Oa(t)})},{path:"animate",action:()=>({title:"Animate",component:Ha(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:qa(t)})},{path:"avatar",action:()=>({title:"Avatar",component:Va(t)})},{path:"badge",action:()=>({title:"Badge",component:er(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:rr(t)})},{path:"button",action:()=>({title:"Button",component:lr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:br(t)})},{path:"calendar",action:()=>({title:"Calendar",component:vr(t)})},{path:"chip",action:()=>({title:"Chip",component:Er(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:Tr(t)})},{path:"drawer",action:()=>({title:"Drawer",component:$r(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Rr(t)})},{path:"fileInput",action:()=>({title:"File Input",component:jr(t)})},{path:"input",action:()=>({title:"Input",component:Gr(t)})},{path:"list",action:()=>({title:"List",component:Yr(t)})},{path:"modal",action:()=>({title:"Modal",component:ts(t)})},{path:"popover",action:()=>({title:"Popover",component:as(t)})},{path:"select",action:()=>({title:"Select",component:ls(t)})},{path:"slider",action:()=>({title:"Slider",component:fs(t)})},{path:"spinner",action:()=>({title:"Spinner",component:ys(t)})},{path:"switch",action:()=>({title:"Switch",component:Ts(t)})},{path:"table",action:()=>({title:"Table",component:Ws(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:qs(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Ls(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:oi(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ii(t)})},{path:"treeView",action:()=>({title:"Tree View",component:pi(t)})}]},{path:"pages",action:e=>({title:"Pages",component:po(t)})}],hi=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),gi=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=t,s=a.state(),r=e({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const d=o.location.pathname.replace(n,""),{title:m,component:u,Layout:g=e}=l.resolve({pathname:d});i.pathname.val=d,s.val=u,document.title=`${m}`}},fi=t=>{const{createGlobalStyles:e}=t;e`
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
  `};Un();const te={title:"Bau",base:"/bau/bau-ui"},lt=Yn({config:te}),{bau:ge}=lt;lt.states={pathname:ge.state(window.location.pathname.replace(te.base,"")),drawerOpen:ge.state(!0)};fi(lt);Nn({routes:bi({context:lt}),onLocationChange:gi({context:lt,LayoutDefault:ao(lt),config:te}),notFoundRoute:hi(lt)});
