(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const tt=(e,t)=>({...e,paths:[...t,e.path]}),Te=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const r=tt(o,e);return n?[r,...Te({paths:[...e,o.path],routes:n})]:r}),at=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},nt=({routes:e=[],notFoundRoute:t})=>{const n=Te({routes:e}).map(o=>({...o,regex:at(o)}));return{resolve:({pathname:o})=>{const r=n.find(({regex:a})=>a.test(o));return r?r.action({match:o.match(r.regex)}):t}}};function ot({routes:e,notFoundRoute:t,onLocationChange:n}){const o=nt({routes:e,notFoundRoute:t});return window.addEventListener("popstate",r=>{r.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(r,a,s)=>{r.apply(a,s),n({router:o})}}),document.addEventListener("click",r=>{const{target:a}=r,s=a.getAttribute("href");a.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),r.preventDefault())}),n({router:o}),o}const Ae=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],rt=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],st=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],xe=e=>`var(--color-${e})`,lt=e=>`var(--color-${e}-lightest)`,it=()=>Ae.map(([e])=>`
.outline.${e} {
  border: 2px solid ${xe(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${lt(e)};
}
.solid.${e} {
  background-color: ${xe(e)};
}
`).join(`
`),ct=e=>100-e*10,dt=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${ct(t)}%);`).join(`
`),Ie=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),ut=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...rt.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),...st.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function mt({createGlobalStyles:e},{colorPalette:t=Ae}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>ut([n,o])).join(`
`)}
      ${dt()}
      ${Ie({})}
      ${it()}
      .plain {
        background-color: var(--background-color);
      }
      .outline {
        background-color: var(--background-color);
      }
      .solid {
        color: var(--font-color-inverse);
      }
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
      --brightness: 150%;
      --brightness-hover: 80%;
      --brightness-hover-reverse: 140%;
      --brightness-active: 90%;
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
  `}function ht(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let ue=e=>Object.prototype.toString.call(e??0).slice(8,-1),pt=e=>ue(e)=="Object",Ce=e=>ue(e)=="Function",re=e=>["Object","Array"].includes(ue(e)),ke=Object.getPrototypeOf,se=e=>ee(e)?e.val:e,ee=e=>e==null?void 0:e.__isState,bt=["splice","push","pop","shift","unshift","sort","reverse"],te=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const U=e=>!ee(e[0])&&pt(e[0])?e:[{},...e];function gt(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,r=new Set,a=new Set,s=!1,l,i=v=>n.createElement(v),m=(v,x,C)=>{let k=l;l=x;let T=v(C);return l=k,T},d=()=>{o||(o=window.requestAnimationFrame(()=>{r.forEach(v=>{v.bindings=v.bindings.filter(x=>{var C;return(C=x.element)==null?void 0:C.isConnected}),!v.bindings.length&&!v.computed&&r.delete(v)}),o=void 0}))},c=(v,x,C,k,T,_)=>{var N;if(s){a.add(v);return}for(let X of v.bindings){let{deps:j,element:L,renderInferred:G,render:V,renderItem:Y}=X;if(Y&&x)(N=b(L,k,(...Z)=>g(Y(...Z)),C,T,_)[x])==null||N.call();else{let Z=G?G({element:L}):V({element:L,renderItem:Y})(...j.map(se));Z!==L&&L.replaceWith(X.element=g(Z))}}E(v),d()},u=(v,x,C=[])=>({get(k,T,_){var N;if(l==null||l.add(v),T==="_isProxy")return!0;if(!((N=k[T])!=null&&N._isProxy)&&!ee(k[T])&&re(k[T]))k[T]=new Proxy(k[T],u(v,x,[...C,T]));else if(bt.includes(T)){let X=k[T];return(...j)=>{let L=X.apply(k,j);return c(v,T,L,j,x,C),L}}return Reflect.get(k,T,_)},set(k,T,_,N){let X=Reflect.set(k,T,_,N);return c(v,"setItem",X,{prop:T,value:_},x,[...C,T]),X}}),h=(v,x)=>new Proxy(x,u(v,x)),b=(v,x,C,k,T,_)=>{let N=()=>v.replaceChildren(...te(k,C)),X=j=>v[j]&&v.removeChild(v[j]);return{assign:N,sort:N,reverse:N,setItem:()=>{var L;let j=_[0];(L=v.children[j])==null||L.replaceWith(C(T[j],j))},push:()=>v.append(...te(x,(j,L)=>C(j,T.length+L))),unshift:()=>v.prepend(...te(x,C)),pop:()=>X("lastChild"),shift:()=>X("firstChild"),splice:()=>{let[j,L,...G]=x;const{length:V}=v.children;for(let Y=j>=0?Math.min(j+L-1,V-1):V-1;Y>=(j>=0?j:V+j);Y--)v.children[Y].remove();if(G.length){let Y=G.forEach((Z,oe)=>C(Z,j+oe));v.children[j]?v.children[j].after(...Y):v.append(...Y)}}}},p=v=>({oldVal:v,bindings:[],listeners:[],__isState:!0,get val(){let x=this;return l==null||l.add(x),x.valProxy??(x.valProxy=re(v)?h(x,v):v,x.valProxy)},set val(x){let C=this,k=C.val;re(x)?(C.valProxy=h(C,x),c(C,"assign",x)):x!==k&&(C.valProxy=x,c(C)),C.oldVal=k}}),g=v=>v==null||v===!1?i("span"):v.nodeType?v:n.createTextNode(v),f=(v,x)=>{let C=new Set;return x.val=m(v,C),C},y=v=>{let x=p(),C=f(v,x);x.computed=!0;for(let k of C)k.listeners.push({computed:v,deps:C,state:x});return x},E=v=>{for(let x of[...v.listeners])f(x.computed,x.state)},S=(v,...x)=>{if(x.length){let C=[];for(let k of x.flat(1/0))k!=null&&C.push(ee(k)?z({deps:[k],render:()=>T=>T}):Ce(k)?D({renderInferred:k}):g(k));v.append(...C)}},B={},P=(v,x)=>v&&(Object.getOwnPropertyDescriptor(v,x)??P(ke(v),x)),A=(v,x,C)=>{var k;return B[v+","+x]??(B[v+","+x]=((k=P(C,x))==null?void 0:k.set)??0)},M=(v,x)=>new MutationObserver((C,k)=>{C.filter(T=>T.removedNodes).forEach(T=>[...T.removedNodes].find(_=>_===v&&(x({element:v}),k.disconnect(),!0)))}).observe(v.parentNode,{childList:!0}),I=v=>new Proxy(function(C,...k){var X;let[T,..._]=U(k),N=v?n.createElementNS(v,C):i(C);for(let[j,L]of Object.entries(T)){if(j.startsWith("bau"))continue;let G=A(C,j,ke(N))?V=>N[j]=V:V=>N.setAttribute(j,V);L==null||(ee(L)?z({deps:[L],render:()=>()=>(G(L.val),N)}):Ce(L)&&(!j.startsWith("on")||L.isDerived)?D({renderInferred:()=>(G(L({element:N})),N)}):L.renderProp?z({deps:L.deps,render:()=>()=>(G(L.renderProp({element:N})(...L.deps.map(se))),N)}):G(L))}return S(N,..._),(X=T.bauCreated)==null||X.call(T,{element:N}),T.bauMounted&&t.requestAnimationFrame(()=>T.bauMounted({element:N})),T.bauUnmounted&&t.requestAnimationFrame(()=>M(N,T.bauUnmounted)),N},{get:(x,C)=>x.bind(void 0,C)}),H=(v,x,C)=>{v.element=g(C);for(let k of x)ee(k)&&(r.add(k),k.bindings.push(v));return v.element},D=({renderInferred:v,element:x})=>{let C=new Set,k=m(v,C,{element:x});return H({renderInferred:v},C,k)},z=({deps:v,element:x,render:C,renderItem:k})=>H({deps:v,render:C,renderItem:k},v,C({element:x,renderItem:k})(...v.map(se))),O=(v,x,C)=>z({deps:[v],render:({renderItem:k})=>T=>(x.append(...te(T,k)),x),renderItem:C}),R=v=>{s=!0,v(),s=!1,a.forEach(c),a.clear()};return{tags:I(),tagsNS:I,state:p,bind:z,loop:O,derive:y,stateSet:r,batch:R}}const ft=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},vt=(e,t,n,o)=>{const r=e.createElement("style");r.id=n,r.append(o),(t??e.head).append(r)},wt=(e,t)=>e.reduce((n,o,r)=>n+o+(t[r]??""),"");function yt(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(r,...a)=>{const s=wt(r,a),l=ft(s);return!t.getElementById(l)&&vt(t,e==null?void 0:e.target,l,o(l,s)),l};return{css:n((o,r)=>`.${o} { ${r} }`),keyframes:n((o,r)=>`@keyframes ${o} { ${r} }`),createGlobalStyles:n((o,r)=>r)}}function xt(e){return{bau:gt(),...yt(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function W(e,t){const{bau:n,css:o}=e,r={root:o`
      color: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 0.5rem;
      min-width: 2rem;
      min-height: 2rem;
      border: none;
      border-radius: var(--global-radius);
      font-size: 1rem;
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
        filter: brightness(var(--brightness));
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
      box-shadow: none;
    `};return function(...s){let[{color:l,variant:i,size:m,disabled:d,href:c,...u},...h]=U(s);return(c?n.tags.a:n.tags.button)({...u,class:$(r.root,i,m,l,c?r.a:r.button,d&&r.disabled,t==null?void 0:t.class,u.class),disabled:d,href:c,...!c&&{type:"button"}},h)}}const K=["neutral","primary","success","danger","warning"],Ct=["plain","outline","solid"],kt="light",St=()=>K.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function me(e,t){const{bau:n,css:o,window:r}=e,{input:a}=n.tags,s=d=>{r.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},i=l();i?s(i):r.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(kt);const m=o`
    position: relative;
    width: 2rem;
    height: 2rem;
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
    ${St()}
  `;return function(...c){let[{color:u,variant:h="outline",size:b,...p},...g]=U(c);return a({required:"required",title:"Switch Theme",...p,class:$("theme-switch",m,u,h,b,t==null?void 0:t.class,p.class),type:"checkbox",checked:l()=="dark",onclick:f=>{s(f.target.checked?"dark":"light")}},...g)}}function Et(e){const{tr:t,bau:n,css:o,config:r}=e,{i:a,header:s,h1:l,div:i,a:m,img:d,b:c,ul:u,li:h}=n.tags,{svg:b,path:p}=n.tagsNS("http://www.w3.org/2000/svg"),g=n.state(!0),f=W(e,{class:o`
      background: transparent;
    `}),y=me(e),E=()=>a(b({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},p({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),S=()=>i({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},f({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>g.val=!g.val},E()),m({href:`${r.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},c(t("Bau UI Components")))),B=()=>i({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},y(),m({class:o`
            padding: 1rem;
          `,target:"_blank",href:"https://github.com/grucloud/bau"},d({alt:"GitHub",src:`${r.base}/github-mark-white.svg`,width:30,height:30})));return function(){return s({class:o`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
        `},S(),B())}}function $t({tr:e,bau:t,css:n}){const{footer:o,span:r,a,ul:s,li:l,p:i}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},r("version: 0.40.0"))}}function Me(e,t={}){return function({parent:o,animationHide:r,animationShow:a},s){s.style.animation=a;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((i,m)=>{i.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(c=>{o.style.position="relative";const u=c.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=r,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),m.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}const Se="0.3s",Be=({parent:e,grandParent:t})=>n=>{const{children:o,...r}=n,a=structuredClone(r);return a.children=o==null?void 0:o.map(Be({parent:n,grandParent:e})),e&&(e.parentTree=t),a.parentTree=e,a},De=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const r=De(e)(t.children[o]);if(r)return r}},Tt=({createGlobalStyles:e,keyframes:t})=>(e`
:root {
  --drill-down-menu-color: var(--font-color-base);
  --drill-down-menu-padding: 0.4rem;
  --drill-down-menu-bg-active: var(--color-emphasis-200);
  --drill-down-menu-bg-hover: var(--color-emphasis-200);
}
`,{hideToLeft:t`
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
 `});function he(e,t){const{bau:n,css:o,window:r}=e,{base:a=""}=t,s=({currentTree:D,data:z,onclickBack:O})=>g(E({href:`${a}${D.parentTree.children[0].data.href}`,onclick:O({currentTree:D}),class:o`
            flex-grow: 0;
          `},"←"),E({href:`${a}${z.href}`,class:o`
            flex-grow: 1;
            justify-content: flex-start;
          `},z.name)),l=({name:D,href:z})=>E({href:`${a}${z}`},D),i=({subTree:D})=>{var z;return r.location.pathname.replace(a,"")===((z=D==null?void 0:D.data)==null?void 0:z.href)},{renderHeader:m=s,renderMenuItem:d=l,isActive:c=i}=t,{ul:u,li:h,nav:b,div:p,header:g,a:f}=n.tags,y=Me(),E=W(e,{class:o`
      flex-grow: 1;
      justify-content: flex-start;
    `}),{hideToLeft:S,hideToRight:B,showFromRight:P,showFromLeft:A}=Tt(e),M=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & a {
      padding: 0.5rem;
      border-radius: 0;
    }
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      border-bottom: 1px solid var(--color-emphasis-100);
      transition: background-color var(--transition-slow) ease-in-out;
    }
    & ul {
      display: block;
      list-style: none;
      margin: 0;
      padding-left: 0;
      overflow: hidden;
      & .has-children {
        &::after {
          content: "\u203A";
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      & .is-active {
        background-color: var(--drill-down-menu-bg-active);
        filter: brightness(var(--brightness-active));
      }

      & li {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: inherit;
        transition: all var(--transition-fast) ease-in-out;
        &:hover {
          filter: brightness(var(--brightness-hover));
        }
        & a,
        span {
          text-decoration: none;
          width: 100%;
          color: inherit;
          padding: var(--drill-down-menu-padding);
        }
      }
      &.solid {
        & li:hover {
          filter: brightness(var(--brightness));
        }
      }
    }
  `,I=({variant:D,color:z,size:O,onclickItem:R,onclickBack:v,currentTree:x,pathnameState:C})=>{const{children:k,parentTree:T,data:_}=x;return p({class:$("drillDownMenu",D,z,O)},T&&m({data:_,currentTree:x,onclickBack:v}),k&&u({class:$(D,z,O)},k.map(N=>h({class:()=>$(N.children&&"has-children",c({pathname:C.val,subTree:N})&&"is-active"),onclick:N.children&&R({currentTree:N})},d(N.data)))))},H=({tree:D,pathname:z})=>{let O=Be({})(D),R=De(z)(O);return R||(console.log("drilldown no sub tree",z),R=O),R};return function(z){const{variant:O="plain",color:R="neutral",size:v,tree:x,pathnameState:C=n.state(r.location.pathname),...k}=z,T=({currentTree:j})=>L=>N(L,X,j,!0),_=({currentTree:j})=>L=>N(L,X,j.parentTree,!1),N=(j,L,G,V)=>{L.firstChild.replaceChildren(y({parent:L,animationHide:`${V?S:B} ${Se}`,animationShow:`${V?P:A} ${Se}`},I({variant:O,color:R,size:v,currentTree:G,onclickItem:T,onclickBack:_,pathnameState:C})))},X=b({class:$(M,t==null?void 0:t.class,k.class)},()=>I({variant:O,color:R,size:v,currentTree:H({tree:x,pathname:C.val}),onclickItem:T,onclickBack:_,pathnameState:C}));return X}}const At={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Le(e){const{tr:t,bau:n,css:o,config:r,states:a}=e,{div:s,ul:l,li:i,nav:m,a:d,span:c}=n.tags,u=he(e,{base:r.base});return function(){return s({class:o`
          grid-area: sidebar;
          position: sticky;
          top: calc(var(--header-height));
          align-self: start;
          overflow-y: scroll;
          height: calc(100vh - var(--header-height) - 1rem);
        `},u({tree:At,pathnameState:a.pathname}))}}const It=e=>{const{bau:t,css:n}=e,{div:o}=t.tags,r=Et(e),a=Le(e),s=$t(e);return function({componentState:i}){return o({class:n`
          display: grid;
          grid-template-columns: minmax(15%, 200px) minmax(50%, 85%);
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
            & nav {
              display: none;
            }
          }
        `},r(),a(),o({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>i.val&&i.val({})),s())}};function Mt(e){const{bau:t,css:n,config:o}=e,{div:r,h1:a,h2:s,p:l}=t.tags;W(e);const i=n`
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
  `;return function({name:d,text:c,tagLine:u}){return r({class:i},a(d),s(c),l(u))}}function Bt(e){const{bau:t,css:n}=e,{div:o,h1:r,p:a}=t.tags,s=n`
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
  `,l=({title:i,Content:m})=>o({className:"feature"},r(i),a(m()));return function({featuresContent:m}){return o({class:s},m.map(l))}}function Dt(e){const{bau:t,css:n,config:o}=e,{div:r,p:a,a:s}=t.tags,l=Mt(e),i=Bt(e),m=W(e),d=n``,c=[{title:"UI components for the web",Content:()=>[a("Over 25 components such as button, input, tabs, autocomplete etc ..."),m({href:`${o.base}/components`,color:"primary",variant:"solid"},"Visit Gallery")]},{title:"Component style",Content:()=>[a("Each component has a combination of variant, color and size:"),a("3 variant: plain, outline and primary"),a("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[a("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),a("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[a("The component bundle size is about 8x smaller compared to popular React UI component library."),a("Faster download time for users."),a("Save in bandwith fees for the operator."),a("Suitable for low bandwith network and low cost device.")]}];return function({}){return r({class:d},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),i({featuresContent:c}))}}const Lt=()=>K.map(e=>`
& li.plain.${e} h3::after {
  color: var(--color-${e});
}
& li.outline.${e} h3::after {
  color: var(--color-${e});
}
& h3.solid.${e}:hover {
  filter: brightness(var(--brightness));
}
`).join(`
`);function Pe(e,t){const{bau:n,css:o}=e,{accordionDefs:r}=t,{div:a,ul:s,li:l,header:i,h3:m,button:d}=n.tags,c=n.state(""),u=p=>g=>{c.val==p?c.val="":c.val=p},h=({element:p,open:g})=>{const f=()=>{p.removeEventListener("transitionend",f)};function y(S){S.addEventListener("transitionend",f),window.requestAnimationFrame(()=>{S.style.height="0px"})}function E(S){S.addEventListener("transitionend",f),S.style.height=S.scrollHeight+"px"}p.scrollHeight!=0&&(g?E(p):y(p))},b=o`
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
          filter: brightness(var(--brightness)) !important;
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
    ${Lt()}
  `;return function(...g){let[{color:f,variant:y="outline",size:E,content:S,...B},...P]=U(g);const A=M=>{const{Header:I,Content:H,name:D}=M;return l({class:$(f,y,E),onclick:u(D)},m({class:()=>$(c.val==D&&"active")},d({type:"button","aria-controls":`bau-${D}`,"aria-expanded":({element:z})=>c.val==D},I(M))),a({class:"content",role:"region",id:`bau-${D}`,"data-state":({element:z})=>{const O=c.val==D;return h({element:z,open:O}),O}},H(M)))};return a({class:$("accordion",b,t==null?void 0:t.class,B.class)},s(r.map(A)))}}const F=e=>{const{bau:t,css:n}=e,{div:o,table:r,tbody:a,tr:s,td:l,thead:i,th:m}=t.tags;return function({Item:c,name:u}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},r(i(s(m(u??"Variant/Color"),K.map(h=>m(h)))),a(Ct.map(h=>s(m(h),K.map((b,p)=>l(c({color:b,variant:h},{index:p}))))))))}},Pt=e=>{const{tr:t,bau:n,css:o}=e,{article:r,div:a,h3:s,h2:l,h1:i,p:m}=n.tags,d=F(e),c=(...b)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),h=Pe(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(m("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(m("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(m("Item 3 content"))}]});return()=>r({id:"accordion"},i(t("Accordion")),l("Accordion Table"),d({Item:b=>h({...b})}),l("Customization"),s("Default Accordion"),c(h({})),s("Accordion width: fit-content"),c(h({color:"warning",class:o`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),c(h({color:"success",variant:"outline",class:o`
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
          `})))},Nt={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},zt=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},jt=()=>K.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function ne(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a,i:s}=n.tags;zt({css:o,createGlobalStyles:r});const l=o`
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
    ${jt()}
  `,i=W(e),m=({onclick:d})=>i({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(c,...u){const{variant:h="outline",color:b="neutral",size:p,onRemove:g,...f}=c;return a({...f,class:$(`alert-${h}`,h,b,p,l,t==null?void 0:t.class,c.class,"alert"),role:"alert"},s({class:"icon"},Nt[b]),a({class:"content"},...u),g&&m({onclick:g}))}}const Ht=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h4:i,p:m}=n.tags,d=F(e),c=ne(e),u=ne(e,{class:o`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>r({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),a(c({color:"danger"},i("Something went wrong"),m("Error code ",404),m("Status ","Not Found"))),s("Custom Alert"),a(u({color:"warning"},i("My message"))),s("Alert Table"),d({Item:h=>c({...h},`Alert ${h.color}`)}))},Ot=(e,t={})=>{const{bau:n,css:o,keyframes:r}=e,{limit:a=10,deleteAfterDuration:s=15e3}=t,{div:l}=n.tags,i=n.state([]),m={inserting:r`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:r`
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
      animation: ${m.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${m.removing} var(--transition-slow) ease-out;
    `},c=({id:u,status:h})=>{const b=i.val.findIndex(p=>p.id===u);b!=-1&&(i.val[b].status=h)};return function(h={},...b){const p=({id:y})=>{c({id:y,status:"removing"});const E=i.val.findIndex(S=>S.id===y);E!=-1&&i.val.splice(E,1)},g=({Component:y})=>{const E={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};i.val.length>=a&&p({id:i.val[0].id}),i.val.push(E),setTimeout(()=>p(E),s)},f=y=>l({class:d.item,onclick:()=>p(y)},y.Component());return document.addEventListener("alert.add",y=>g(y.detail)),document.addEventListener("alert.remove",y=>p(y.detail)),l({class:$(d.stack,t==null?void 0:t.class,h.class)},n.loop(i,l(),f))}},Gt=e=>{const{tr:t,bau:n}=e,{section:o,h1:r}=n.tags,a=Ot(e,{deleteAfterDuration:2e4}),s=W(e),l=ne(e);return function(){return o({id:"alert-stack"},a(),r("Alert stack"),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Ft=({keyframes:e})=>({hideRight:e`
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
 `}),Rt=e=>{const{bau:t}=e,{section:n,div:o,h1:r}=t.tags,a=Me(),s=W(e),l=Ft(e);return function(){const i=t.state(!0),m=o(),d=c=>{m.replaceChildren(a({parent:m,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},o(c.val?"Ciao":"")))};return d(i),n({id:"animate"},o(r("Test Animate"),o(s({onclick:()=>{i.val=!i.val,d(i)}},()=>i.val?"Hide":"Show")),m))}};function Ne(e,t){const{bau:n}=e,{span:o,img:r}=n.tags,a=n.state(!0),s=n.state(!1),l=()=>a.val=!1,i=m=>{a.val=!1,s.val=!0};return function(...d){let[{color:c,variant:u="outline",size:h,width:b=60,height:p=60,...g},...f]=U(d);return o({class:$(t==null?void 0:t.class,g.class)},()=>a.val?"Loading...":"",()=>s.val&&"Error",r({width:b,height:p,onload:l,onerror:i,class:$(t==null?void 0:t.class,c,u,h,g.class),...g}))}}const Vt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,h2:a,h3:s}=n.tags,l=o`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,i=F(e),m=Ne(e,{class:o`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>r({id:"avatar"},a(t("Avatar")),m({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),m({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),m({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),i({Item:d=>m({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function pe(e,t){const{bau:n,css:o,window:r}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...i){let[{contentEl:m,triggerEl:d,onClose:c,...u},...h]=U(i);const b=f=>{g.style.opacity=1,g.showModal();const y=d.getBoundingClientRect(),E=g.getBoundingClientRect();y.x<r.innerWidth/2?g.style.left=y.left+"px":g.style.left=y.right-E.width+"px",y.y<r.innerHeight/2?g.style.top=y.top+y.height+"px":g.style.top=y.top-E.height+"px"},p=f=>{const y=()=>{g.close(),g.removeEventListener("transitionend",y)};g.addEventListener("transitionend",y),g.style.opacity=0},g=a({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:f=>f.target===g&&(p(),c==null?void 0:c.call())},m);return g.closeDialog=p,g.openDialog=b,g}}const Ut=()=>K.map(e=>`
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
`);function be(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
    display: inline-block;
    font-size: large;
    padding: 1rem;
    height: 2.5rem;
    box-shadow: var(--shadow-s);
    border-radius: var(--global-radius);
    box-sizing: border-box;
    outline: none;
    color: inherit;
    transition: background-color var(--transition-fast) ease-in-out;
    &.input:hover {
      background-color: var(--color-emphasis-100);
    }
    ${Ut()}
  `;return function(l){const{size:i,variant:m="outline",color:d="neutral",name:c,id:u,disabled:h,...b}=l;return r({...b,class:$("input",i,d,m,a,t==null?void 0:t.class,b.class)})}}function ge(e,t){const{bau:n,css:o}=e,{ul:r}=n.tags,s=o`
    list-style: none;
    padding: 0;
    margin: 0 0;
    &.solid {
      & li:hover {
        filter: brightness(var(--brightness));
      }
    }
    & li {
      padding: 0.5rem;
      cursor: pointer;
      background-color: inherit;
      &:hover {
        filter: brightness(var(--brightness-hover));
      }
      &.active {
        filter: brightness(var(--brightness-active));
      }
    }
    ${(()=>K.map(l=>`
&.list.${l} {
}
`).join(`
`))()}
  `;return function(...i){let[{color:m="neutral",variant:d="plain",size:c,...u},...h]=U(i);return r({...u,class:$("list",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const _t=()=>K.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function ze(e,t){const{bau:n,css:o}=e,{div:r,li:a,ul:s}=n.tags,l=pe(e),i=W(e),m=be(e),d=ge(e),c=o`
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
    ${_t()}
  `,u=n.state(""),h=n.state(""),b=n.state(!1),p=n.state(0),g=()=>{b.val=!1};return function(...y){let[{variant:E="outline",color:S,size:B,id:P,label:A,placeholder:M,Option:I,options:H,getOptionLabel:D=({label:G})=>G,...z},...O]=U(y);const R=n.state(H),v=()=>{L.openDialog(),b.val=!0,h.val="",R.val=H},x=()=>{L.closeDialog(),b.val=!1,h.val=""},C=G=>{const{value:V}=G.target;h.val=V,V?R.val=H.filter(Y=>D(Y).match(new RegExp(`${V}`,"i"))):R.val=H},k=G=>{b.val?x():v()},T=({option:G,index:V})=>Y=>{u.val=D(G),p.val=V,x()},_=G=>{switch(console.log("onkeydown",G.key,p.val),G.key){case"Escape":x();break;case"ArrowDown":p.val<R.val.length-1?p.val++:p.val=0;break;case"ArrowUp":p.val<=0?p.val=R.val.length-1:p.val--;break;case"Enter":u.val=D(R.val[p.val]),h.val="",x();break}},N=i({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":b,"aria-label":A,onclick:k,class:$(E,S,B)},()=>!u.val&&A,u),X=m({id:P,value:h,placeholder:M,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":b,oninput:C,onkeydown:_,class:$(E,S,B)}),L=l({id:P,triggerEl:N,contentEl:(()=>r({class:$(E,S,B,"content")},X,()=>d({class:$(E,S,B)},R.val.map((G,V)=>a({class:()=>$(p.val==V&&"active"),onclick:T({option:G,index:V})},I(G))))))(),onClose:g});return r({...z,class:$("autocomplete",c,t==null?void 0:t.class,z==null?void 0:z.class)},N,L)}}const Xt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:i}=n.tags,m=(...b)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),d=F(e),c=ze(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],h=b=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.label),i(b.code));return()=>r({id:"autocomplete",class:o``},l(t("Autocomplete")),s("Basic Autocomplete"),m(c({options:u,Option:h,getOptionLabel:({label:b})=>b,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:b=>c({...b,options:u,Option:h,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",id:"country"})}))};function le(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,content:c,...u},...h]=U(l);return r({...u,class:$("badge",a,t==null?void 0:t.class,u==null?void 0:u.class)},r({class:$(i,m,d)},c),...h)}}const Wt=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s}=t.tags,l=(...c)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),i=F(e),m=le(e),d=le(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>o({id:"badge"},s("Badge"),a("Basic Badge"),l(m({content:"10"},"☏")),a("Badges Table"),i({Item:(c,{index:u})=>m({...c,content:`${u*100}`},"☏")}),a("Badge custom"),l(d({content:"1"},"☏")))};function je(e,t){const{bau:n,css:o}=e,{ul:r,li:a,a:s,span:l}=n.tags,i=o`
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
  `;return function(...d){let[{color:c,variant:u="outline",size:h,items:b,...p},...g]=U(d);return r({...p,class:$(i,t==null?void 0:t.class,p==null?void 0:p.class)},b.map(({href:f,name:y})=>a((f?s:l)({href:f,class:$(c,u,h)},y))))}}const qt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=F(e),i=je(e);return()=>o({id:"breadcrumbs"},r(t("Breadcrumbs")),a("Bacis Breadcrumb"),i(s),a("Breadcrumbs Table"),l({Item:m=>i({...m,...s})}))},Yt=e=>{const{bau:t,css:n}=e,{section:o,p:r,h3:a}=t.tags,s=F(e),l=W(e);return()=>o({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},a("Button Examples"),s({Item:i=>l({...i},`${i.variant} ${i.color}`)}),a("Full With"),r(l({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),a("Icon"),r(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},Kt=()=>K.map(e=>`
&.button-group.${e} {
  & button { 
    border-right-color: var(--color-${e});
  }
}
&.button-group.solid.${e} {
  & button { 
    border-right-color: var(--color-emphasis-100);
  }
}
`).join(`
`);function He(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
    display: inline-flex;
    border-radius: var(--global-radius);
    & button {
      border-radius: 0;
      border-right: 1px solid var(--color-emphasis-400);
      color: inherit;
      font-size: inherit;
    }
    & button:last-child {
      border: none;
    }
    &.sm {
      & button {
        font-size: 0.7rem;
      }
    }
    &.md {
      font-size: 1rem;
    }
    &.lg {
      & button {
        font-size: 1.5rem;
        padding: 1rem;
      }
    }
    ${Kt()}
  `;return function(...l){let[{variant:i="outline",size:m="md",color:d,...c},...u]=U(l);return r({...c,class:$("button-group",a,i,d,m,t==null?void 0:t.class,c==null?void 0:c.class)},...u)}}const Zt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=W(e),i=He(e);return()=>o({id:"button-group"},r(t("Button Group Examples")),a("Outline"),i({},l({},"ONE"),l({},"TWO"),l({},"THREE")),a("Button Group Table"),s({Item:m=>i({...m},l({},"ONE"),l({},"TWO"),l({},"THREE"))}))};function ie(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>K.map(l=>`
&.calendar.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...i){let[{color:m="neutral",variant:d="plain",size:c,...u},...h]=U(i);return r({...u,type:"date",class:$("calendar",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Jt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,label:i}=n.tags,m=F(e),d=(...b)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),c=n.state("2023-08-08"),u=ie(e),h=ie(e,{class:o`
      background-color: lightseagreen !important;
    `});return()=>r({id:"calendar"},l(t("Calendar")),a("Date: ",c),s("Basic Calendar"),d(i({for:"start"},"Start date:",u({id:"start",value:c.val,oninput:b=>{c.val=b.target.value}}))),s("Calendar min and max"),d(i("End date:",u({min:"2023-01-01",max:"2023-12-31",value:c.val,oninput:b=>{c.val=b.target.value}}))),s("Calendar custom"),d(h({})),s("Calendar Table"),m({Item:b=>u({...b})}))};function Oe(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:i,variant:m="outline",color:d="neutral",onclick:c,...u},...h]=U(l);return r({...u,onclick:c,class:$("chip",a,i,m,d,c&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const Qt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l}=n.tags,i=F(e),m=(...c)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...c),d=Oe(e);return()=>r({id:"chip"},l(t("Chip")),s("Chip Default"),m(d("My Chip")),s("Chip Clickable"),m(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),i({Item:c=>d({...c},`Chip ${c.color}`)}))};function Ge(e,t={}){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
    &:disabled {
      border: 2px dashed var(--color-gray-500);
    }
    &:checked::after {
      opacity: 1;
    }
    &::after {
      content: "\u2716";
      position: absolute;
      font-size: 1.2rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
  `;return function(...l){let[{color:i,variant:m="outline",size:d,...c},...u]=U(l);return r({type:"checkbox",required:"required",...c,class:$(a,i,m,d,t==null?void 0:t.class,c==null?void 0:c.class)})}}const ea=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,label:s,h2:l,form:i}=n.tags,m=F(e),d=Ge(e),c=n.state(!1),u=n.state(!1),h=p=>g=>{p.val=!!g.target.checked},b=(...p)=>a({class:o`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...p);return()=>r({id:"checkbox"},i(l(t("Checkbox Examples")),b(d({id:"myCheckbox",name:"myCheckbox",checked:c,onchange:h(c)}),s({for:"myCheckbox"},"My Checkbox")),b(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:h(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),m({Item:(p,{index:g})=>d({id:`myCheckbox-${g}`,name:`myCheckbox-${g}`,...p})})))};function ta(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:i,variant:m="outline",size:d,openState:c,...u},...h]=U(l);return r({class:$(a,t==null?void 0:t.class,u.class)},r({class:()=>$("overlay",c.val&&"overlay-open"),onclick:()=>{c.val=!1}}),r({class:()=>$("content",c.val&&"content-open")},h))}}const aa=e=>{const{tr:t,bau:n}=e,{section:o,h2:r}=n.tags,a=n.state(!1),s=ta(e),l=W(e),i=Le(e);return()=>o({id:"drawer"},r(t("Drawer")),l({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},i()))},na=e=>{const{tr:t,bau:n,window:o,config:r}=e,{section:a,h2:s,h3:l}=n.tags,i=n.state(o.location.pathname.replace(r.base,"")),m=F(e),d={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},c=he(e,{base:r.base+"/components/drillDownMenu"});return()=>a({id:"drillDownMenu"},s(t("Drill Down Menu")),c({tree:d,pathnameState:i}),l("Drill Down Table"),m({Item:u=>c({tree:d,...u})}))};function Fe(e,t){const{bau:n,css:o}=e,{div:r,span:a,label:s,input:l}=n.tags,i={base:o`
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
    `,disabled:o`
      & label {
        &:hover {
          box-shadow: var(--shadow-s);
        }
        cursor: not-allowed;
      }
    `};return function(d,...c){const{variant:u="outline",color:h="neutral",size:b,Component:p,disabled:g,...f}=d;return r({class:$(i.base,g&&i.disabled,t==null?void 0:t.class,d.class)},s({class:$(u,h,b)},p({disabled:g}),l({type:"file",disabled:g,...f})),a({class:"filename-display"}))}}const oa=e=>{const{tr:t,bau:n,css:o}=e,{svg:r,use:a}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:i,h2:m,span:d}=n.tags,c=F(e),u=n.state("No file selected"),h=Fe(e),b=g=>{const f=g.target.files[0];f?u.val=f.name:u.val="No file selected"},p=({disabled:g})=>l({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},a({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},m(t("FileInput Examples")),i("File Input"),h({Component:p,name:"file",accept:"text/*",onchange:b}),l("File selected: ",u),i("File Input disabled"),h({Component:p,name:"file",accept:"text/*",disabled:!0,onchange:b}),i("File Input Table"),c({Item:g=>h({Component:p,name:"file",accept:"text/*",onchange:b,...g})}))},ra=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=F(e),i=be(e);return()=>o({id:"input"},s(t("Input Examples")),a("Standard"),r(i({id:"my-Input",name:"Label",label:"Label"})),a("Disabled"),r(i({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),i({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),a("Input with error"),r(i({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),a("Input Table"),l({Item:m=>i({name:"my-input",id:"my-input-with",placeholder:"Enter text",...m})}))};function Re(e,t){const{bau:n,css:o}=e,{dialog:r}=n.tags,s=o`
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
    ${(()=>K.map(l=>`
&.modal.plain.${l} {
  color: inherit;
}
&.modal.outline.${l} {
  color: inherit;
}
&.modal.soft.${l} {
  color: inherit;
}
&.modal.solid.${l} {

}
`).join(`
`))()}
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...h]=U(i);return r({class:$("modal",s,m,d,c,t==null?void 0:t.class,u==null?void 0:u.class)},...h)}}const sa=e=>{const{tr:t,bau:n}=e,{section:o,main:r,h2:a,header:s,footer:l,p:i,div:m}=n.tags,d=F(e),c=W(e),u=Re(e),h=()=>r(Array(10).fill("").map((g,f)=>i(f+1,". Some text here"))),b=g=>{const f=u({id:"my-dialog",...g},s("Header"),h(),l(c({variant:"outline",color:g.color,onclick:()=>{f.close()}},"Cancel"),c({variant:"solid",color:g.color,onclick:()=>{f.close()}},"OK")));return f},p=b({color:"neutral"});return()=>o({id:"modal"},a(t("Modal Examples")),c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p,a(t("Modal Table")),d({Item:g=>{const f=b(g);return m(c({...g,onclick:()=>{f.showModal()}},"OPEN MODAL"),f)}}))},la=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h1:i,p:m}=n.tags,d=W(e),c=(...B)=>a({class:o`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...B),u=pe(e),b=(()=>d({onclick:()=>f.open?f.closeDialog():f.openDialog()},"Click"))(),p=()=>a({},i("My content"),m("My Content")),g=p(),f=u({id:"my-popover-left",triggerEl:b,contentEl:g}),y=d({onclick:()=>S.open?S.closeDialog():S.openDialog()},"Click"),E=p(),S=u({id:"my-popover-left",triggerEl:y,contentEl:E});return()=>r({id:"popover",class:o``},l(t("Popover")),s("Basic Popover"),c(a(b,f),a(y,S)))},ia=()=>K.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ve(e,t){const{bau:n,css:o}=e,{div:r,li:a}=n.tags,s=W(e),l=pe(e),i=ge(e),m=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ia()}
  `,d=n.state(""),c=n.state(!1),u=n.state(0);return function(...b){let[{color:p="neutral",variant:g="outline",size:f,id:y,label:E,Option:S,options:B,getOptionLabel:P=({label:k})=>k,...A},...M]=U(b);const I=()=>{C.openDialog(),c.val=!0},H=()=>{C.closeDialog(),c.val=!1},D=()=>{c.val=!1},z=k=>{c.val?H():I()},O=({option:k,index:T})=>_=>{d.val=P(k),u.val=T,H()},R=k=>{switch(k.preventDefault(),k.key){case"Escape":H();break;case"ArrowDown":u.val<B.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=B.length-1:u.val--;break;case"Enter":c.val?(d.val=P(B[u.val]),H()):I();break}},v=()=>i({class:$(p,g)},B.map((k,T)=>a({class:()=>$(u.val==T&&"active"),onclick:O({option:k,index:T})},S(k)))),x=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":c,"aria-label":E,onclick:z,class:$(p,g,f)},()=>!d.val&&E,d),C=l({id:y,triggerEl:x,contentEl:v(),onClose:D});return r({...A,class:$("select",p,f,m,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:R},x,C)}}const ca=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:i}=n.tags,m=(...b)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),d=F(e),c=Ve(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],h=b=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(b.label),i(b.code));return()=>r({id:"select",class:o``},l(t("Select")),s("Basic Select"),m(c({options:u,Option:h,getOptionLabel:({label:b})=>b,label:"Select a country..."})),l(t("Select Table")),d({Item:b=>a(c({...b,options:u,Option:h,getOptionLabel:({label:p})=>p,label:"Select a country..."}))}))};function ae(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    ${(()=>K.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...i){let[{color:m="neutral",variant:d="outline",size:c,...u},...h]=U(i);return r({...u,type:"range",class:$("slider",m,d,c,s,t==null?void 0:t.class,u.class)},...h)}}const da=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:i,label:m,datalist:d,option:c,br:u}=n.tags,h=n.state(0),b=S=>{h.val=S==null?void 0:S.target.value},p=(...S)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),g=F(e),f=ae(e),y=ae(e),E=ae(e);return()=>r({id:"slider"},l(t("Slider")),i("Slider value: ",h),s("Basic Slider"),p(f({oninput:b,name:"slider-simple"})),s(t("Slider Table")),g({Item:S=>f(S)}),s("Slider Min Max: -1000 1000"),p(y({oninput:b,min:-1e3,max:1e3})),s("Slider Step 20"),p(f({oninput:b,step:20,min:-100,max:100})),s("Slider Vertical"),p(a({class:o`
              display: flex;
            `},f({oninput:b,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:o`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:o`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(S=>c({value:Number(S),label:S}))))),s("Slider with mark"),p(m({for:"temp"},"Choose a comfortable temperature"),u(),E({oninput:b,class:o`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:o`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(S=>c({value:Number(S),label:S})))))},Ee={sm:16,md:32,lg:64};function fe(e,t={}){const{bau:n,css:o}=e,{svg:r,animate:a,animateTransform:s,rect:l}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:m="md",color:d="color-base",variant:c="outline",visibility:u=!0,...h}={}){return r({class:$(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,h.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:Ee[m],height:Ee[m],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},a({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const ua=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=F(e),l=fe(e);return()=>o({id:"spinner"},r(t("Spinner Examples")),a(t("Spinner Table")),s({Item:i=>l(i)}))},ma=()=>K.map(e=>`
&.switch.plain.${e} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.outline.${e} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.soft.${e} {
  &::after {
    background-color: var(--color-emphasis-200);
  }
  &:checked::after {
    background-color: var(--color-${e});
  }
}
&.switch.solid.${e} {
  background-color: var(--color-emphasis-800);
  &::after {
    background-color: var(--color-emphasis-200);
  } 
  &:checked {
    background-color: var(--color-${e}) ;
  }
  &:checked::after {
    background-color: var(--color-emphasis-200);
  }
  &:hover {
    filter: brightness(var(--brightness-hover-reverse));
  }
}
`).join(`
`);function Ue(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
    position: relative;
    width: 2.4rem;
    height: 1.4rem;
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
      width: 1rem;
      height: 1rem;
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
    ${ma()}
  `;return function(...l){let[{color:i="neutral",variant:m="plain",size:d,...c},...u]=U(l);return r({...c,class:$("switch",a,i,m,d,t==null?void 0:t.class,c.class),type:"checkbox",required:"required"},...u)}}const ha=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,label:s,div:l,h2:i}=n.tags,m=F(e),d=Ue(e);return()=>r({id:"switch"},i(t("Switch Examples")),a(l({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-shinny-switch"},"My shinny switch"),d({id:"my-shinny-switch"}))),i(t("Switch Table")),m({Item:c=>l({class:o`
                & label {
                  display: inline-flex;
                  border: 1px dotted var(--color-emphasis-200);
                  font-size: smaller;
                  align-items: center;
                  color: var(--color-content-secondary);
                  padding: 0.2rem;
                }
              `},s("off ",d({...c,id:`my-switch-example-off-${c.color}-${c.variant}`})),s("on ",d({...c,id:`my-switch-example-on-${c.color}-${c.variant}`,checked:!0})))}))},pa=()=>K.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function ce(e,t){const{bau:n,css:o}=e,{tabDefs:r}=t,{div:a,ul:s,li:l}=n.tags,i=n.state(r),m=n.state(r[0]),d=u=>i.val.find(h=>h.name==u),c={base:o`
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
      ${pa()}
    `};return function(...h){let[{color:b,variant:p="plain",size:g,...f},...y]=U(h);const E=B=>{const{Header:P,disabled:A,name:M}=B;return l({class:()=>$(m.val.name==M&&"active",A&&"disabled"),onclick:I=>I.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:M},bubbles:!0}))},P(B))},S=a({class:$("tabs",c.base,p,g,b,t==null?void 0:t.class,f.class)},n.loop(i,s(),E),()=>m.val.Content?m.val.Content({}):"");return S.addEventListener("tab.select",B=>{var M,I;const{tabName:P}=B.detail,A=d(P);A&&((M=m.val.exit)==null||M.call(),m.val=A,(I=A.enter)==null||I.call())},!1),S.addEventListener("tab.add",B=>{var A;const{tab:P}=B.detail;(A=P.enter)==null||A.call(),i.val.push(P)},!1),S.addEventListener("tab.remove",B=>{var A;const P=i.val.findIndex(M=>M.name==B.detail.tabName);P>0&&((A=i.val[P].exit)==null||A.call(),i.val.splice(P,1))},!1),S}}const ba=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:i,i:m}=n.tags,d=F(e),c=W(e),u=(...y)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...y),h=()=>({name:"New Tab",Header:({name:y})=>a(y),Content:()=>a("My Paragraph")}),p=ce(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My tab Disabled"))}]}),f=ce(e,{tabDefs:[{name:"Tab1",Header:()=>a(m({class:o`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>a({class:o`
              > button {
                margin: 10px;
              }
            `},c({onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:h()},bubbles:!0}))},"Add a new Tab"),c({accent:!0,onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),i("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My Content"))}]});return()=>r({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(p({})),s("Full Witdth"),u(p({class:o`
            & ul {
              justify-content: center;
              & li {
                flex-grow: 1;
              }
            }
          `})),s("Centered"),u(p({class:o`
            & ul {
              justify-content: center;
            }
          `})),s("Bottom Header"),u(p({class:o`
            flex-direction: column-reverse;
          `})),s("Uppercase header"),u(p({class:o`
            & ul {
              & li {
                text-transform: uppercase;
              }
            }
          `})),s("Horizontal Tabs"),u(p({class:o`
            flex-direction: row;
            & ul {
              border-right: 2px solid var(--color-primary);
              border-bottom: none;
              margin-right: 1rem;
              flex-direction: column;
              align-items: flex-start;
            }
          `})),s("Add and remove tabs"),u(f({})),l(t("Tabs Table")),d({Item:y=>p(y)}))};function Q(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;r`
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
  `;return function(...i){let[{...m},...d]=U(i);return a({...m,class:$("table-container",s,t==null?void 0:t.class,m==null?void 0:m.class)},...d)}}const ga=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,th:l,td:i,tr:m,table:d,thead:c,tbody:u,caption:h}=t.tags;function b(M,I,H,D,z){return{name:M,calories:I,fat:H,carbs:D,protein:z}}const p=[b("Frozen yoghurt",159,6,24,4),b("Ice cream sandwich",237,9,37,4.3),b("Eclair",262,16,24,6),b("Cupcake",305,3.7,67,4.3),b("Gingerbread",356,16,49,3.9)],g=(...M)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...M),f=({name:M,calories:I})=>m(i(M),i({class:n`
            text-align: right;
          `},I)),y=()=>c(m(l({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),l({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),E=Q(e,{class:n`
      max-width: 650px;
    `}),S=Q(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),B=Q(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),P=Q(e,{class:n`
      & caption {
        border-top: 1px solid var(--table-border-color);
        caption-side: bottom;
      }
    `}),A=Q(e,{class:n`
      & table {
        width: 60px;
        & th {
          max-width: 40px;
        }
      }
    `});return()=>o({id:"table"},s(m("Table")),a("Basic Table"),g(E(d(h("Basic Table"),y(),u(p.map(f))))),a("Dense Table"),g(S(d(h("Dense Table"),y(),u(p.map(f))))),a("Zebra Table"),g(B(d(h("Zebra Table"),y(),u(p.map(f))))),a("Caption Bottom"),g(P(d(h("Caption Bottom Table"),y(),u(p.map(f))))),a("Overflow Header"),g(A(d(h("Overflow Header"),y(),u(p.map(f))))))};function _e(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=W(e),s=fe(e),l=o`
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
  `,i=({label:h,icon:b,...p})=>a({"aria-label":h,title:h,...p},b),m=({count:h,totalCount:b,page:p,rowsPerPage:g})=>r({class:"pages-numbers"},Number(p-1)*Number(g)+(h>0?1:0),"-",Math.min(p*g,b)," of ",b),d=({count:h,page:b,rowsPerPage:p})=>r({class:"pages-numbers"},(b-1)*p+(h>0?1:0),"-",b*p),c=h=>h<=1,u=(h,b,p)=>h>=Math.ceil(b/p);return function(...b){let[{count:p=0,totalCount:g=0,page:f=1,rowsPerPage:y=50,onPageChange:E,isLoading:S=!1,disableFirst:B=()=>c(f),disablePrevious:P=()=>c(f),disableNext:A=()=>u(f,g,y),disableLast:M=()=>u(f,g,y),...I},...H]=U(b);const D=Math.max(0,Math.ceil(g/y)),z=E({page:1}),O=E({page:f-1}),R=E({page:f+1}),v=E({page:D});return r({...I,class:$("table-pagination",l,S&&"disabled",t==null?void 0:t.class,I==null?void 0:I.class)},s({class:"spinner",visibility:S,size:"md"}),g>0?m({count:p,totalCount:g,page:f,maxPages:D,rowsPerPage:y}):d({count:p,page:f,maxPages:D,rowsPerPage:y}),r(i({label:"First",icon:"⟪",onclick:z,disabled:B()}),i({label:"Previous",icon:"⟨",onclick:O,disabled:P()}),i({label:"Next",icon:"⟩",onclick:R,disabled:A()}),i({label:"Last",icon:"⟫",onclick:v,disabled:M()})))}}const fa=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),va=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:i}=t.tags,m=fa(45),d=({name:y,email:E})=>a(r(y),r(E)),c=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=_e(e),h=Q(e,{class:n`
      max-width: 650px;
    `}),b=t.state(m),p=t.state({count:m.length,totalCount:m.length,page:1,rowsPerPage:10}),g=t.derive(()=>b.val.slice(p.val.page*p.val.rowsPerPage,(p.val.page+1)*p.val.rowsPerPage)),f=({page:y})=>E=>{p.val.page=y};return()=>h(s(c(),()=>i(g.val.map(d))),()=>u({...p.val,onPageChange:f}))},wa=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:i,div:m}=t.tags,d=t.state(!1),c=t.state([]),u=t.state(""),h=t.derive(()=>c.val.length),b=t.state(1),p=t.state(10),g=t.derive(()=>c.val),f=I=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(I).toString()}`,y=({page:I})=>H=>{b.val=I,E(f({page:I,per_page:p.val}))};E(f({page:1,per_page:p.val}));async function E(I){try{d.val=!0;const H=await fetch(I,{});if(H.ok){const D=await H.json();c.val=D;return}throw H}catch(H){u.val=H.message}finally{d.val=!1}}const S=({name:I,description:H,stargazers_count:D})=>a(r(I),r(H),r({class:n`
            text-align: right;
          `},D)),B=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=_e(e),A=Q(e,{class:n`
      min-width: 650px;
    `}),M=({message:I})=>m(I);return()=>A(()=>P({rowsPerPage:p.val,page:b.val,count:h.val,totalCount:-1,isLoading:d.val,onPageChange:y,disableNext:()=>!1}),s(B(),()=>u.val&&M({message:u.val}),()=>i(g.val.map(S))))},ya=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,tr:l}=t.tags,i=va(e),m=wa(e),d=(...c)=>r({class:n`
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
        `},...c);return()=>o({id:"pagination"},s(l("Table Pagination")),a("Asynchronous Pagination"),d(m()),a("Simple Pagination"),d(i()))};function de(e,t){const{bau:n,css:o,window:r}=e,{div:a}=n.tags,s=o`
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
  `;return function(...i){let[{titleEl:m,side:d="bottom-start",color:c="neutral",variant:u="outline",size:h,...b},...p]=U(i);const g=a({class:$("container",...d.split("-"))},a({class:$("content",c,u,h),role:"tooltip"},m)),f=A=>`move-to-${A}`,y=(A,M,I)=>{if(A()){const H=f(M);g.classList.add(H),g.classList.add(M),g.classList.remove(I)}},E=(A,M)=>{const I=f(A);g.classList.contains(I)&&(g.classList.remove(I),g.classList.add(M),g.classList.remove(A))},S=A=>{const M=g.getBoundingClientRect();y(()=>M.x<0,"right","left"),y(()=>M.x+M.width>r.innerWidth,"left","right"),y(()=>M.y<0,"bottom","top"),y(()=>M.bottom>r.innerHeight,"top","bottom"),g.classList.add("visible")},B=A=>{g.classList.remove("visible"),E("right","left"),E("left","right"),E("bottom","top"),E("top","bottom")};return a({...b,class:$("tooltip",s,t==null?void 0:t.class,b==null?void 0:b.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",B)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",B)}},...p,g)}}const xa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h2:s,em:l,p:i}=n.tags,m=F(e),d=W(e),c=de(e),u=de(e,{class:o`
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
    `}),h=()=>a({class:o`
          font-size: larger;
        `},i("A ",l("tooltip")," can be any component")),b=()=>[a({class:o`
          display: flex;
          justify-content: space-around;
        `},c({side:"top-start",titleEl:h()},d({},"top-start")),c({side:"top-centered",titleEl:h()},d({},"top-centered")),c({side:"top-end",titleEl:h()},d({},"top-end"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-start",titleEl:h()},d({},"left-start")),c({side:"right-start",titleEl:h()},d({},"right-start"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-centered",titleEl:h()},d({},"left-centered")),c({side:"right-centered",titleEl:h()},d({},"right-centered"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},c({side:"left-end",titleEl:h()},d({},"left end")),c({side:"right-end",titleEl:h()},d({},"right end"))),a({class:o`
          display: flex;
          justify-content: space-around;
        `},c({side:"bottom-start",titleEl:h()},d({},"bottom start")),c({side:"bottom-centered",titleEl:h()},d({},"bottom centered")),c({side:"bottom-end",titleEl:h()},d({},"bottom end")))];return()=>r({id:"tooltip"},s(t("Tooltip")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 400px;
            margin: auto;
          `},b()),s(t("Tooltip moved")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},b()),s(t("Tooltip custom")),a({class:o`
            border: 1px dotted var(--color-gray-500);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},u({titleEl:h()},d({},"custom tooltip"))),s(t("Tooltip Table")),m({Item:p=>c({titleEl:h(),...p},d({},`${p.color} ${p.variant}`))}))},Ca=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,div:s,h2:l}=n.tags,i=F(e),m=me(e);return()=>r({id:"theme-switch"},l(t("Theme Switch")),a(s({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},m({}))),l(t("Theme Switch Table")),i({Item:d=>m(d)}))},ka=({css:e,createGlobalStyles:t})=>(t`
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
      filter: brightness(var(--brightness));
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
          transition: background-color var(--transition-fast) ease-in-out;
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
    `});function Xe(e,t){const{bau:n,css:o,createGlobalStyles:r,window:a}=e,{renderMenuItem:s}=t,{ul:l,li:i,nav:m,div:d}=n.tags,c=ka({css:o,createGlobalStyles:r}),u=({element:g,closeState:f})=>{g.scrollHeight!=0&&(f.val?h(g):b(g))};function h(g){g.style.height=g.scrollHeight+"px";const f=()=>{g.removeEventListener("transitionend",f)};g.addEventListener("transitionend",f),a.requestAnimationFrame(()=>{g.style.height="0px"})}function b(g){const f=()=>{g.removeEventListener("transitionend",f),g.style.height=null};g.addEventListener("transitionend",f),g.style.height=g.scrollHeight+"px"}const p=({depth:g=1,maxDepth:f,color:y,variant:E,size:S})=>B=>{const{children:P,expanded:A}=B,M=n.state(!A);return i({class:()=>$(P?M.val?c.collapsed:c.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:I=>{P&&(M.val=!M.val)}},s(B.data)),P&&g<f&&l({class:$(y,S),bauMounted:({element:I})=>{M.val&&(I.style.height="0px")},"aria-expanded":({element:I})=>(u({element:I,closeState:M}),!M.val)},P.map(p({depth:g+1,maxDepth:f}))))};return function({tree:f,maxDepth:y=1/0,size:E,variant:S="plain",color:B="neutral",...P}){return m({class:$(c.nav,E,S,B,t==null?void 0:t.class,P.class)},f.children&&l(f.children.map(p({maxDepth:y,color:B,variant:S,size:E}))))}}const Sa=e=>{const{tr:t,bau:n}=e,{section:o,a:r,h2:a,h3:s}=n.tags,l=F(e),i={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=Xe(e,{renderMenuItem:({name:c,href:u})=>r({href:u,onclick:h=>{h.preventDefault()}},c)});return()=>o({id:"treeview"},a(t("Tree View")),s(t("Tree View Default")),d({tree:i}),s(t("Tree View Table")),l({Item:c=>d({...c,tree:i})}))};function Ea(e,t={}){const{bau:n,css:o}=e,{div:r,span:a,pre:s,h3:l,h4:i}=n.tags;return function(d,...c){return r("Login")}}const $a=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=Ea(e);return()=>o({id:"login"},s(t("Login Examples")),a("Basic"),r(l()))};function Ta(e){const{tr:t,bau:n,css:o}=e,{div:r,article:a,h1:s}=n.tags;return function(){return r({class:o`
          grid-area: main;
          display: flex;
        `},a({class:o`
            grid-area: main;
            padding: 10px;
            margin-top: 20px;
            > section {
              padding: 10px;
              margin: 10px;
              box-shadow: var(--shadow-s);
            }
          `},s(t("Pages Examples")),$a(e)()))}}const $e=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Aa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,li:i,span:m}=n.tags,d=F(e),c=(...b)=>a({class:o`
          border: 1px dotted red;
          padding: 1rem;
        `},...b),u=ge(e),h=({code:b,label:p})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},m(b),m(p));return()=>r({id:"list"},l(t("List")),s("List outline primary"),c(u({variant:"outline",color:"primary"},$e.map(h))),s("List Table"),d({Item:b=>u({...b},$e.map(h))}))},Ia=e=>{const{bau:t,css:n,config:o}=e,{section:r,div:a,h1:s,span:l,p:i,ul:m,li:d,a:c,main:u,header:h,footer:b,label:p}=t.tags,{svg:g,use:f}=t.tagsNS("http://www.w3.org/2000/svg"),y=F(e),S=Pe(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(i("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(i("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(i("Item 3 content"))}]}),B=ne(e),P=ze(e),A=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],M=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),I=Ne(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),H=le(e),D={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},z=je(e),O=W(e),R=He(e),v=ie(e),x=Ge(e),C=Oe(e),k={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},T=he(e,{base:o.base+"/components"}),_=({disabled:w})=>a({class:$(n`
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
            `)},g({width:100,height:100,fill:"currentColor"},f({href:"uploadIcon.svg#Capa_1"})),l("Choose a file to upload")),N=Fe(e),X=be(e),j=Re(e),L=()=>u(Array(10).fill("").map((w,q)=>i(q+1,". Some text here"))),G=w=>{const q=j({id:"my-dialog",...w},h("Header"),L(),b(O({variant:"outline",onclick:()=>{q.close()}},"Cancel"),O({variant:"solid",onclick:()=>{q.close()}},"OK")));return q},V=Ve(e),Y=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Z=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),oe=ae(e),We=fe(e),we=Ue(e),qe=ce(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(i("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(i("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(i("My tab Disabled"))}]}),Ye=me(e),Ke=()=>l("My tooltip"),Ze=de(e),Je={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},Qe=Xe(e,{renderMenuItem:({name:w,href:q})=>c({href:q,onclick:et=>{et.preventDefault()}},w)}),ye=[{name:"Accordion",Item:w=>S({...w})},{name:"Alert",Item:w=>B({...w},`Alert ${w.color}`)},{name:"Autocomplete",Item:w=>P({...w,options:A,Option:M,getOptionLabel:({label:q})=>q,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:w=>I({...w,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(w,{index:q})=>H({...w,content:`${q*100}`},"☏")},{name:"Breadcrumbs",Item:w=>z({...w,...D})},{name:"Button",Item:w=>O({...w},`${w.variant} ${w.color}`)},{name:"Button Group",Item:w=>R({...w},O({},"ONE"),O({},"TWO"),O({},"THREE"))},{name:"Calendar",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,v({...w})))},{name:"Checkbox",Item:w=>p({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${w.color} ${w.variant}`,x({id:`myCheckbox-gallery-${w.color}-${w.variant}`,name:`myCheckbox-gallery-${w.color}-${w.variant}`,...w}))},{name:"Chip",Item:w=>C({...w},`Chip ${w.color}`)},{name:"DrillDown Menu",Item:w=>T({tree:k,...w})},{name:"File Input",Item:w=>N({Component:_,name:"file",accept:"text/*",onchange,...w})},{name:"Input",Item:w=>X({name:"my-input",id:"my-input-with",placeholder:"Enter text",...w})},{name:"Modal",Item:w=>{const q=G(w);return a(O({...w,onclick:()=>{q.showModal()}},"OPEN MODAL"),q)}},{name:"Select",Item:w=>a(V({...w,options:Y,Option:Z,getOptionLabel:({label:q})=>q,label:"Select a country..."}))},{name:"Slider",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,oe({...w,id:`my-slider-${w.color}-${w.variant}`})))},{name:"Spinner",Item:w=>We(w)},{name:"Switch",Item:w=>a({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},p("off",we({...w,id:`mySwitch-off-${w.color}-${w.variant}`})),p("on",we({...w,id:`mySwitch-on-${w.color}-${w.variant}`,checked:!0})))},{name:"Tabs",Item:w=>qe(w)},{name:"Theme Switch",Item:w=>Ye(w)},{name:"Tooltip",Item:w=>Ze({titleEl:Ke(),...w},O({},`${w.color} ${w.variant}`))},{name:"Tree View",Item:w=>Qe({...w,tree:Je})}];return()=>r(s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),m({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},ye.map(({name:w})=>d(C({color:"primary"},c({href:`#${w}`},w))))),ye.map(w=>a({id:w.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},y(w))))},Ma=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Dt(e)})},{path:"components",action:()=>({title:"Component",component:Ia(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Pt(e)})},{path:"alert",action:()=>({title:"Alert",component:Ht(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Gt(e)})},{path:"animate",action:()=>({title:"Animate",component:Rt(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Xt(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Vt(e)})},{path:"badge",action:()=>({title:"Badge",component:Wt(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:qt(e)})},{path:"button",action:()=>({title:"Button",component:Yt(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Zt(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Jt(e)})},{path:"chip",action:()=>({title:"Chip",component:Qt(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ea(e)})},{path:"drawer",action:()=>({title:"Drawer",component:aa(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:na(e)})},{path:"fileInput",action:()=>({title:"File Input",component:oa(e)})},{path:"input",action:()=>({title:"Input",component:ra(e)})},{path:"list",action:()=>({title:"List",component:Aa(e)})},{path:"modal",action:()=>({title:"Modal",component:sa(e)})},{path:"popover",action:()=>({title:"Popover",component:la(e)})},{path:"select",action:()=>({title:"Select",component:ca(e)})},{path:"slider",action:()=>({title:"Slider",component:da(e)})},{path:"spinner",action:()=>({title:"Spinner",component:ua(e)})},{path:"switch",action:()=>({title:"Switch",component:ha(e)})},{path:"table",action:()=>({title:"Table",component:ga(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:ya(e)})},{path:"tabs",action:()=>({title:"Tabs",component:ba(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:xa(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Ca(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Sa(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Ta(e)})}],Ba=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),Da=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:r,states:a}=e,s=r.state(),l=t({componentState:s});return document.getElementById("app").replaceChildren(l),({router:m})=>{const d=o.location.pathname.replace(n,""),{title:c,component:u,Layout:h=t}=m.resolve({pathname:d});a.pathname.val=d,s.val=u,document.title=`${c}`}},La=e=>{const{createGlobalStyles:t}=e;mt(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }
    
  `},Pa=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${Ie({dark:!0})}
}
  `};ht();const ve={title:"Bau",base:"/bau/bau-ui"},J=xt({config:ve});J.states={pathname:J.bau.state(window.location.pathname.replace(ve.base,""))};La(J);Pa(J);ot({routes:Ma({context:J}),onLocationChange:Da({context:J,LayoutDefault:It(J),config:ve}),notFoundRoute:Ba(J)});
