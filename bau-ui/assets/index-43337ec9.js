(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const at=(e,t)=>({...e,paths:[...t,e.path]}),Ie=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const r=at(o,e);return n?[r,...Ie({paths:[...e,o.path],routes:n})]:r}),nt=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},ot=({routes:e=[],notFoundRoute:t})=>{const n=Ie({routes:e}).map(o=>({...o,regex:nt(o)}));return{resolve:({pathname:o})=>{const r=n.find(({regex:a})=>a.test(o));return r?r.action({match:o.match(r.regex)}):t}}};function rt({routes:e,notFoundRoute:t,onLocationChange:n}){const o=ot({routes:e,notFoundRoute:t});return window.addEventListener("popstate",r=>{r.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(r,a,s)=>{r.apply(a,s),n({router:o})}}),document.addEventListener("click",r=>{const{target:a}=r,s=a.getAttribute("href");a.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),r.preventDefault())}),n({router:o}),o}const Me=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],st=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],lt=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ce=e=>`var(--color-${e})`,it=e=>`var(--color-${e}-lightest)`,ct=()=>Me.map(([e])=>`
.outline.${e} {
  border: 2px solid ${Ce(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${it(e)};
}
.solid.${e} {
  background-color: ${Ce(e)};
}
`).join(`
`),dt=e=>100-e*10,ut=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${dt(t)}%);`).join(`
`),Be=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),mt=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...st.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),...lt.map(([r,a])=>`--color-${e}-${r}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${a}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function ht({createGlobalStyles:e},{colorPalette:t=Me}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>mt([n,o])).join(`
`)}
      ${ut()}
      ${Be({})}
      ${ct()}
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
      --brightness-hover-always: 180%;
      --brightness-active-always: 150%;
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
  `}function pt(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let me=e=>Object.prototype.toString.call(e??0).slice(8,-1),bt=e=>me(e)=="Object",ke=e=>me(e)=="Function",se=e=>["Object","Array"].includes(me(e)),Se=Object.getPrototypeOf,le=e=>ee(e)?e.val:e,ee=e=>e==null?void 0:e.__isState,gt=["splice","push","pop","shift","unshift","sort","reverse"],te=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const U=e=>!ee(e[0])&&bt(e[0])?e:[{},...e];function ft(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,r=new Set,a=new Set,s=!1,l,c=f=>n.createElement(f),m=(f,x,C)=>{let k=l;l=x;let E=f(C);return l=k,E},d=()=>{o||(o=window.requestAnimationFrame(()=>{r.forEach(f=>{f.bindings=f.bindings.filter(x=>{var C;return(C=x.element)==null?void 0:C.isConnected}),!f.bindings.length&&!f.computed&&r.delete(f)}),o=void 0}))},i=(f,x,C,k,E,_)=>{var z;if(s){a.add(f);return}for(let R of f.bindings){let{deps:j,element:L,renderInferred:O,render:X,renderItem:q}=R;if(q&&x)(z=b(L,k,(...Z)=>h(q(...Z)),C,E,_)[x])==null||z.call();else{let Z=O?O({element:L}):X({element:L,renderItem:q})(...j.map(le));Z!==L&&L.replaceWith(R.element=h(Z))}}$(f),d()},u=(f,x,C=[])=>({get(k,E,_){var z;if(l==null||l.add(f),E==="_isProxy")return!0;if(!((z=k[E])!=null&&z._isProxy)&&!ee(k[E])&&se(k[E]))k[E]=new Proxy(k[E],u(f,x,[...C,E]));else if(gt.includes(E)){let R=k[E];return(...j)=>{let L=R.apply(k,j);return i(f,E,L,j,x,C),L}}return Reflect.get(k,E,_)},set(k,E,_,z){let R=Reflect.set(k,E,_,z);return i(f,"setItem",R,{prop:E,value:_},x,[...C,E]),R}}),g=(f,x)=>new Proxy(x,u(f,x)),b=(f,x,C,k,E,_)=>{let z=()=>f.replaceChildren(...te(k,C)),R=j=>f[j]&&f.removeChild(f[j]);return{assign:z,sort:z,reverse:z,setItem:()=>{var L;let j=_[0];(L=f.children[j])==null||L.replaceWith(C(E[j],j))},push:()=>f.append(...te(x,(j,L)=>C(j,E.length+L))),unshift:()=>f.prepend(...te(x,C)),pop:()=>R("lastChild"),shift:()=>R("firstChild"),splice:()=>{let[j,L,...O]=x;const{length:X}=f.children;for(let q=j>=0?Math.min(j+L-1,X-1):X-1;q>=(j>=0?j:X+j);q--)f.children[q].remove();if(O.length){let q=O.forEach((Z,re)=>C(Z,j+re));f.children[j]?f.children[j].after(...q):f.append(...q)}}}},p=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let x=this;return l==null||l.add(x),x.valProxy??(x.valProxy=se(f)?g(x,f):f,x.valProxy)},set val(x){let C=this,k=C.val;se(x)?(C.valProxy=g(C,x),i(C,"assign",x)):x!==k&&(C.valProxy=x,i(C)),C.oldVal=k}}),h=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),v=(f,x)=>{let C=new Set;return x.val=m(f,C),C},y=f=>{let x=p(),C=v(f,x);x.computed=!0;for(let k of C)k.listeners.push({computed:f,deps:C,state:x});return x},$=f=>{for(let x of[...f.listeners])v(x.computed,x.state)},S=(f,...x)=>{if(x.length){let C=[];for(let k of x.flat(1/0))k!=null&&C.push(ee(k)?N({deps:[k],render:()=>E=>E}):ke(k)?G({renderInferred:k}):h(k));f.append(...C)}},M={},D=(f,x)=>f&&(Object.getOwnPropertyDescriptor(f,x)??D(Se(f),x)),A=(f,x,C)=>{var k;return M[f+","+x]??(M[f+","+x]=((k=D(C,x))==null?void 0:k.set)??0)},I=(f,x)=>new MutationObserver((C,k)=>{C.filter(E=>E.removedNodes).forEach(E=>[...E.removedNodes].find(_=>_===f&&(x({element:f}),k.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),B=f=>new Proxy(function(C,...k){var R;let[E,..._]=U(k),z=f?n.createElementNS(f,C):c(C);for(let[j,L]of Object.entries(E)){if(j.startsWith("bau"))continue;let O=A(C,j,Se(z))?X=>z[j]=X:X=>z.setAttribute(j,X);L==null||(ee(L)?N({deps:[L],render:()=>()=>(O(L.val),z)}):ke(L)&&(!j.startsWith("on")||L.isDerived)?G({renderInferred:()=>(O(L({element:z})),z)}):L.renderProp?N({deps:L.deps,render:()=>()=>(O(L.renderProp({element:z})(...L.deps.map(le))),z)}):O(L))}return S(z,..._),(R=E.bauCreated)==null||R.call(E,{element:z}),E.bauMounted&&t.requestAnimationFrame(()=>E.bauMounted({element:z})),E.bauUnmounted&&t.requestAnimationFrame(()=>I(z,E.bauUnmounted)),z},{get:(x,C)=>x.bind(void 0,C)}),P=(f,x,C)=>{f.element=h(C);for(let k of x)ee(k)&&(r.add(k),k.bindings.push(f));return f.element},G=({renderInferred:f,element:x})=>{let C=new Set,k=m(f,C,{element:x});return P({renderInferred:f},C,k)},N=({deps:f,element:x,render:C,renderItem:k})=>P({deps:f,render:C,renderItem:k},f,C({element:x,renderItem:k})(...f.map(le))),H=(f,x,C)=>N({deps:[f],render:({renderItem:k})=>E=>(x.append(...te(E,k)),x),renderItem:C}),F=f=>{s=!0,f(),s=!1,a.forEach(i),a.clear()};return{tags:B(),tagsNS:B,state:p,bind:N,loop:H,derive:y,stateSet:r,batch:F}}const vt=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},wt=(e,t,n,o)=>{const r=e.createElement("style");r.id=n,r.append(o),(t??e.head).append(r)},yt=(e,t)=>e.reduce((n,o,r)=>n+o+(t[r]??""),"");function xt(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(r,...a)=>{const s=yt(r,a),l=vt(s);return!t.getElementById(l)&&wt(t,e==null?void 0:e.target,l,o(l,s)),l};return{css:n((o,r)=>`.${o} { ${r} }`),keyframes:n((o,r)=>`@keyframes ${o} { ${r} }`),createGlobalStyles:n((o,r)=>r)}}function Ct(e){return{bau:ft(),...xt(),tr:n=>n,window,...e}}function T(...e){return e.filter(t=>t).join(" ")}function W(e,t){const{bau:n,css:o}=e,r={root:o`
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
        filter: brightness(var(--brightness-hover-always));
      }
    `,button:o`
      cursor: pointer;
    `,a:o``,disabled:o`
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
      pointer-events: none;
    `};return function(...s){let[{color:l,variant:c,size:m,disabled:d,href:i,...u},...g]=U(s);return(i?n.tags.a:n.tags.button)({...u,class:T("button",r.root,c,m,l,i?r.a:r.button,d&&r.disabled,t==null?void 0:t.class,u.class),disabled:d,href:i,...!i&&{type:"button"}},g)}}const K=["neutral","primary","success","danger","warning"],kt=["plain","outline","solid"],St="light",$t=()=>K.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function he(e,t){const{bau:n,css:o,window:r}=e,{input:a}=n.tags,s=d=>{r.document.documentElement.setAttribute("data-theme",d),localStorage.setItem("theme",d)},l=()=>{try{return localStorage.getItem("theme")}catch{}},c=l();c?s(c):r.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):r.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(St);const m=o`
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
    ${$t()}
  `;return function(...i){let[{color:u,variant:g="outline",size:b,...p},...h]=U(i);return a({required:"required",title:"Switch Theme",...p,class:T("theme-switch",m,u,g,b,t==null?void 0:t.class,p.class),type:"checkbox",checked:l()=="dark",onclick:v=>{s(v.target.checked?"dark":"light")}},...h)}}function Et(e){const{tr:t,bau:n,css:o,config:r,states:a}=e,{i:s,header:l,h1:c,div:m,a:d,img:i,b:u,ul:g,li:b}=n.tags,{svg:p,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),v=a.drawerOpen,y=W(e,{class:o`
      background: transparent;
    `}),$=he(e),S=()=>s(p({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),M=()=>m({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},y({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>v.val=!v.val},S()),d({href:`${r.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),D=()=>m({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},$(),d({class:o`
            padding: 1rem;
          `,target:"_blank",href:"https://github.com/grucloud/bau"},i({class:o`
            border-radius: 50%;
            background: black;
          `,alt:"GitHub",src:`${r.base}/github-mark-white.svg`,width:30,height:30})));return function(){return l({class:o`
          z-index: 2;
          position: sticky;
          top: 0;
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: var(--header-height);
          background-color: var(--background-color);
        `},M(),D())}}function Tt({tr:e,bau:t,css:n}){const{footer:o,span:r,a,ul:s,li:l,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},r("version: 0.40.0"))}}function De(e,t={}){return function({parent:o,animationHide:r,animationShow:a},s){s.style.animation=a;const l=()=>{s.removeEventListener("animationend",l),s.style.animation=""};return s.addEventListener("animationend",l),new MutationObserver((c,m)=>{c.filter(d=>d.removedNodes).forEach(d=>[...d.removedNodes].find(i=>{o.style.position="relative";const u=i.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=r,d.previousSibling?d.previousSibling.after(u):d.nextSibling?d.nextSibling.before(u):d.target&&d.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),m.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}function oe(e,t){const{bau:n,css:o}=e,{ul:r}=n.tags,s=o`
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
      padding: 0.3rem;
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
    ${(()=>K.map(l=>`
`).join(`
`))()}
  `;return function(...c){let[{color:m="neutral",variant:d="plain",size:i,...u},...g]=U(c);return r({...u,class:T("list",s,m,d,i,t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const $e="0.3s",Le=({parent:e,grandParent:t})=>n=>{const{children:o,...r}=n,a=structuredClone(r);return a.children=o==null?void 0:o.map(Le({parent:n,grandParent:e})),e&&(e.parentTree=t),a.parentTree=e,a},Pe=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const r=Pe(e)(t.children[o]);if(r)return r}},At=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function pe(e,t){const{bau:n,css:o,window:r}=e,{base:a=""}=t,s=({currentTree:N,data:H,onclickBack:F})=>h(S({variant:"plain",href:`${a}${N.parentTree.children[0].data.href}`,onclick:F({currentTree:N}),class:o`
            flex-grow: 0;
          `},"←"),S({variant:"plain",href:`${a}${H.href}`},H.name)),l=({name:N,href:H})=>S({href:`${a}${H}`},N),c=({subTree:N})=>{var H;return r.location.pathname.replace(a,"")===((H=N==null?void 0:N.data)==null?void 0:H.href)},{renderHeader:m=s,renderMenuItem:d=l,isActive:i=c}=t,{ul:u,li:g,nav:b,div:p,header:h,a:v}=n.tags,y=De(),$=oe(e),S=W(e,{class:o`
      &.button {
        flex-grow: 1;
        justify-content: flex-start;
      }
    `}),{hideToLeft:M,hideToRight:D,showFromRight:A,showFromLeft:I}=At(e),B=o`
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
      & a {
      }
    }
  `,P=({variant:N,color:H,size:F,onclickItem:f,onclickBack:x,currentTree:C,pathnameState:k})=>{const{children:E,parentTree:_,data:z}=C;return p({class:T("drillDownMenu",N,H,F)},_&&m({data:z,currentTree:C,onclickBack:x}),E&&$({class:T(N,H,F)},E.map(R=>g({class:()=>T(R.children&&"has-children",i({pathname:k.val,subTree:R})&&"active"),onclick:R.children&&f({currentTree:R})},d(R.data)))))},G=({tree:N,pathname:H})=>{let F=Le({})(N),f=Pe(H)(F);return f||(console.log("drilldown no sub tree",H),f=F),f};return function(H){const{variant:F="plain",color:f="neutral",size:x,tree:C,pathnameState:k=n.state(r.location.pathname),...E}=H,_=({currentTree:L})=>O=>R(O,j,L,!0),z=({currentTree:L})=>O=>R(O,j,L.parentTree,!1),R=(L,O,X,q)=>{O.firstChild.replaceChildren(y({parent:O,animationHide:`${q?M:D} ${$e}`,animationShow:`${q?A:I} ${$e}`},P({variant:F,color:f,size:x,currentTree:X,onclickItem:_,onclickBack:z,pathnameState:k})))},j=b({class:T(B,t==null?void 0:t.class,E.class)},()=>P({variant:F,color:f,size:x,currentTree:G({tree:C,pathname:k.val}),onclickItem:_,onclickBack:z,pathnameState:k}));return j}}const It={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Ne(e){const{tr:t,bau:n,css:o,config:r,states:a}=e,{div:s,ul:l,li:c,nav:m,a:d,span:i}=n.tags,u=pe(e,{base:r.base});return function(){return s({onclick:()=>{},class:o`
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
          }
        `},u({tree:It,pathnameState:a.pathname}))}}const Mt=e=>{const{bau:t,css:n,states:o}=e,{div:r}=t.tags,a=Et(e),s=Ne(e),l=Tt(e);return function({componentState:m}){return r({class:n`
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
        `},a(),()=>o.drawerOpen.val&&s(),r({class:n`
            grid-area: main;
            margin: 0 1rem;
            overflow-y: scroll;
          `},()=>m.val&&m.val({})),l())}};function Bt(e){const{bau:t,css:n,config:o}=e,{div:r,h1:a,h2:s,p:l}=t.tags;W(e);const c=n`
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
  `;return function({name:d,text:i,tagLine:u}){return r({class:c},a(d),s(i),l(u))}}function Dt(e){const{bau:t,css:n}=e,{div:o,h1:r,p:a}=t.tags,s=n`
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
  `,l=({title:c,Content:m})=>o({className:"feature"},r(c),a(m()));return function({featuresContent:m}){return o({class:s},m.map(l))}}function Lt(e){const{bau:t,css:n,config:o}=e,{div:r,p:a,a:s}=t.tags,l=Bt(e),c=Dt(e),m=W(e),d=n``,i=[{title:"UI components for the web",Content:()=>[a("Over 25 components such as button, input, tabs, autocomplete etc ..."),m({href:`${o.base}/components`,color:"primary",variant:"solid"},"Visit Gallery")]},{title:"Component style",Content:()=>[a("Each component has a combination of variant, color and size:"),a("3 variant: plain, outline and primary"),a("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[a("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),a("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[a("The component bundle size is about 8x smaller compared to popular React UI component library."),a("Faster download time for users."),a("Save in bandwith fees for the operator."),a("Suitable for low bandwith network and low cost device.")]}];return function({}){return r({class:d},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:i}))}}const Pt=()=>K.map(e=>`
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
`);function ze(e,t){const{bau:n,css:o}=e,{accordionDefs:r}=t,{div:a,ul:s,li:l,header:c,h3:m,button:d}=n.tags,i=n.state(""),u=p=>h=>{i.val==p?i.val="":i.val=p},g=({element:p,open:h})=>{const v=()=>{p.removeEventListener("transitionend",v)};function y(S){S.addEventListener("transitionend",v),window.requestAnimationFrame(()=>{S.style.height="0px"})}function $(S){S.addEventListener("transitionend",v),S.style.height=S.scrollHeight+"px"}p.scrollHeight!=0&&(h?$(p):y(p))},b=o`
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
    ${Pt()}
  `;return function(...h){let[{color:v,variant:y="outline",size:$,content:S,...M},...D]=U(h);const A=I=>{const{Header:B,Content:P,name:G}=I;return l({class:T(v,y,$),onclick:u(G)},m({class:()=>T(i.val==G&&"active")},d({type:"button","aria-controls":`bau-${G}`,"aria-expanded":({element:N})=>i.val==G},B(I))),a({class:"content",role:"region",id:`bau-${G}`,"data-state":({element:N})=>{const H=i.val==G;return g({element:N,open:H}),H}},P(I)))};return a({class:T("accordion",b,t==null?void 0:t.class,M.class)},s(r.map(A)))}}const V=e=>{const{bau:t,css:n}=e,{div:o,table:r,tbody:a,tr:s,td:l,thead:c,th:m}=t.tags;return function({Item:i,name:u}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},r(c(s(m(u??"Variant/Color"),K.map(g=>m(g)))),a(kt.map(g=>s(m(g),K.map((b,p)=>l(i({color:b,variant:g},{index:p}))))))))}},Nt=e=>{const{tr:t,bau:n,css:o}=e,{article:r,div:a,h3:s,h2:l,h1:c,p:m}=n.tags,d=V(e),i=(...b)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),g=ze(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(m("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(m("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(m("Item 3 content"))}]});return()=>r({id:"accordion"},c(t("Accordion")),l("Accordion Table"),d({Item:b=>g({...b})}),l("Customization"),s("Default Accordion"),i(g({})),s("Accordion width: fit-content"),i(g({color:"warning",class:o`
            &.accordion {
              & ul {
                & li {
                  width: fit-content;
                }
              }
            }
          `})),s("Accordion icon cross"),i(g({color:"success",variant:"outline",class:o`
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
          `})))},zt={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},jt=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},Ht=()=>K.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function ne(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a,i:s}=n.tags;jt({css:o,createGlobalStyles:r});const l=o`
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
    ${Ht()}
  `,c=W(e),m=({onclick:d})=>c({"aria-label":"Close",onclick:d,class:"button-close"},"✖");return function(i,...u){const{variant:g="outline",color:b="neutral",size:p,onRemove:h,...v}=i;return a({...v,class:T(`alert-${g}`,g,b,p,l,t==null?void 0:t.class,i.class,"alert"),role:"alert"},s({class:"icon"},zt[b]),a({class:"content"},...u),h&&m({onclick:h}))}}const Ot=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h4:c,p:m}=n.tags,d=V(e),i=ne(e),u=ne(e,{class:o`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>r({id:"alert"},l(t("Alert Examples")),s("Basic Alert"),a(i({color:"danger"},c("Something went wrong"),m("Error code ",404),m("Status ","Not Found"))),s("Custom Alert"),a(u({color:"warning"},c("My message"))),s("Alert Table"),d({Item:g=>i({...g},`Alert ${g.color}`)}))},Gt=(e,t={})=>{const{bau:n,css:o,keyframes:r}=e,{limit:a=10,deleteAfterDuration:s=15e3}=t,{div:l}=n.tags,c=n.state([]),m={inserting:r`
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
    `},i=({id:u,status:g})=>{const b=c.val.findIndex(p=>p.id===u);b!=-1&&(c.val[b].status=g)};return function(g={},...b){const p=({id:y})=>{i({id:y,status:"removing"});const $=c.val.findIndex(S=>S.id===y);$!=-1&&c.val.splice($,1)},h=({Component:y})=>{const $={id:Math.random().toString(10).split(".")[1],Component:y,status:"inserting"};c.val.length>=a&&p({id:c.val[0].id}),c.val.push($),setTimeout(()=>p($),s)},v=y=>l({class:d.item,onclick:()=>p(y)},y.Component());return document.addEventListener("alert.add",y=>h(y.detail)),document.addEventListener("alert.remove",y=>p(y.detail)),l({class:T(d.stack,t==null?void 0:t.class,g.class)},n.loop(c,l(),v))}},Ft=e=>{const{tr:t,bau:n}=e,{section:o,h1:r}=n.tags,a=Gt(e,{deleteAfterDuration:2e4}),s=W(e),l=ne(e);return function(){return o({id:"alert-stack"},a(),r("Alert stack"),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"success"},t("Infrastructure Created"))}}))}},"success alert"),s({color:"danger",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>l({color:"danger"},t("Error creating infrastructure"))}}))}},"danger alert"))}},Rt=({keyframes:e})=>({hideRight:e`
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
 `}),Vt=e=>{const{bau:t}=e,{section:n,div:o,h1:r}=t.tags,a=De(),s=W(e),l=Rt(e);return function(){const c=t.state(!0),m=o(),d=i=>{m.replaceChildren(a({parent:m,animationHide:`${l.hideRight} 0.5s`,animationShow:`${l.showRight} 0.5s`},o(i.val?"Ciao":"")))};return d(c),n({id:"animate"},o(r("Test Animate"),o(s({onclick:()=>{c.val=!c.val,d(c)}},()=>c.val?"Hide":"Show")),m))}};function je(e,t){const{bau:n}=e,{span:o,img:r}=n.tags,a=n.state(!0),s=n.state(!1),l=()=>a.val=!1,c=m=>{a.val=!1,s.val=!0};return function(...d){let[{color:i,variant:u="outline",size:g,width:b=60,height:p=60,...h},...v]=U(d);return o({class:T(t==null?void 0:t.class,h.class)},()=>a.val?"Loading...":"",()=>s.val&&"Error",r({width:b,height:p,onload:l,onerror:c,class:T(t==null?void 0:t.class,i,u,g,h.class),...h}))}}const Ut=e=>{const{tr:t,bau:n,css:o}=e,{section:r,h2:a,h3:s}=n.tags,l=o`
    > img {
      background: var(--color-gray-100);
      border-radius: 50%;
      margin: 0.3rem;
    }
  `,c=V(e),m=je(e,{class:o`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `});return()=>r({id:"avatar"},a(t("Avatar")),m({class:l,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar",width:40,height:40}),m({class:l,src:"./grucloud.svg",alt:"GruCloud",width:40,height:40}),m({src:"./grucloud.svg",alt:"GruCloud"}),s("Avatar Table"),c({Item:d=>m({...d,src:"./grucloud.svg",alt:"GruCloud"})}))};function be(e,t){const{bau:n,css:o,window:r}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:m,triggerEl:d,onClose:i,...u},...g]=U(c);const b=v=>{h.style.opacity=1,h.showModal();const y=d.getBoundingClientRect(),$=h.getBoundingClientRect();y.x<r.innerWidth/2?h.style.left=y.left+"px":h.style.left=y.right-$.width+"px",y.y<r.innerHeight/2?h.style.top=y.top+y.height+"px":h.style.top=y.top-$.height+"px"},p=v=>{const y=()=>{h.close(),h.removeEventListener("transitionend",y)};h.addEventListener("transitionend",y),h.style.opacity=0},h=a({role:"presentation",class:T("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:v=>v.target===h&&(p(),i==null?void 0:i.call())},m);return h.closeDialog=p,h.openDialog=b,h}}const _t=()=>K.map(e=>`
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
`);function ge(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
    ${_t()}
  `;return function(l){const{size:c,variant:m="outline",color:d="neutral",name:i,id:u,disabled:g,...b}=l;return r({...b,class:T("input",c,d,m,a,t==null?void 0:t.class,b.class)})}}const Xt=()=>K.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function He(e,t){const{bau:n,css:o}=e,{div:r,li:a,ul:s}=n.tags,l=be(e),c=W(e),m=ge(e),d=oe(e),i=o`
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
    ${Xt()}
  `,u=n.state(""),g=n.state(""),b=n.state(!1),p=n.state(0),h=()=>{b.val=!1};return function(...y){let[{variant:$="outline",color:S,size:M,id:D,label:A,placeholder:I,Option:B,options:P,getOptionLabel:G=({label:O})=>O,...N},...H]=U(y);const F=n.state(P),f=()=>{L.openDialog(),b.val=!0,g.val="",F.val=P},x=()=>{L.closeDialog(),b.val=!1,g.val=""},C=O=>{const{value:X}=O.target;g.val=X,X?F.val=P.filter(q=>G(q).match(new RegExp(`${X}`,"i"))):F.val=P},k=O=>{b.val?x():f()},E=({option:O,index:X})=>q=>{u.val=G(O),p.val=X,x()},_=O=>{switch(console.log("onkeydown",O.key,p.val),O.key){case"Escape":x();break;case"ArrowDown":p.val<F.val.length-1?p.val++:p.val=0;break;case"ArrowUp":p.val<=0?p.val=F.val.length-1:p.val--;break;case"Enter":u.val=G(F.val[p.val]),g.val="",x();break}},z=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":b,"aria-label":A,onclick:k,variant:$,color:S,size:M},()=>!u.val&&A,u),R=m({id:D,value:g,placeholder:I,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":b,oninput:C,onkeydown:_,variant:$,color:S,size:M}),L=l({id:D,triggerEl:z,contentEl:(()=>r({class:T($,S,M,"content")},R,()=>d({class:T($,S,M)},F.val.map((O,X)=>a({class:()=>T(p.val==X&&"active"),onclick:E({option:O,index:X})},B(O))))))(),onClose:h});return r({...N,class:T("autocomplete",i,t==null?void 0:t.class,N==null?void 0:N.class)},z,L)}}const Wt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:c}=n.tags,m=(...b)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),d=V(e),i=He(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],g=b=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},c(b.label),c(b.code));return()=>r({id:"autocomplete",class:o``},l(t("Autocomplete")),s("Basic Autocomplete"),m(i({options:u,Option:g,getOptionLabel:({label:b})=>b,label:"Country",placeholder:"Search countries",id:"country"})),s("Autocomplete Table"),d({Item:b=>i({...b,options:u,Option:g,getOptionLabel:({label:p})=>p,label:"Country",placeholder:"Search countries",id:"country"})}))};function ie(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:c,variant:m="outline",size:d,content:i,...u},...g]=U(l);return r({...u,class:T("badge",a,t==null?void 0:t.class,u==null?void 0:u.class)},r({class:T(c,m,d)},i),...g)}}const qt=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s}=t.tags,l=(...i)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...i),c=V(e),m=ie(e),d=ie(e,{class:n`
      & span {
        background-color: lightseagreen;
      }
    `});return()=>o({id:"badge"},s("Badge"),a("Basic Badge"),l(m({content:"10"},"☏")),a("Badges Table"),c({Item:(i,{index:u})=>m({...i,content:`${u*100}`},"☏")}),a("Badge custom"),l(d({content:"1"},"☏")))};function Oe(e,t){const{bau:n,css:o}=e,{ul:r,li:a,a:s,span:l}=n.tags,c=W(e),m=o`
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
  `;return function(...i){let[{color:u,variant:g="outline",size:b,items:p,...h},...v]=U(i);return r({...h,class:T(m,t==null?void 0:t.class,h==null?void 0:h.class)},p.map(({href:y,name:$})=>a((y?c:l)({href:y,color:u,variant:g,size:b,class:T(u,g,b)},$))))}}const Yt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},l=V(e),c=Oe(e);return()=>o({id:"breadcrumbs"},r(t("Breadcrumbs")),a("Bacis Breadcrumb"),c(s),a("Breadcrumbs Table"),l({Item:m=>c({...m,...s})}))},Kt=e=>{const{bau:t,css:n}=e,{section:o,p:r,h3:a}=t.tags,s=V(e),l=W(e);return()=>o({id:"button",class:n`
          & button {
            margin: 0.5rem;
          }
        `},a("Button Examples"),s({Item:c=>l({...c},`${c.variant} ${c.color}`)}),a("Full With"),r(l({color:"primary",class:n`
              width: 100%;
            `},"witdh: 100%")),a("Icon"),r(l({"aria-label":"Close"},"✖"),l({},"⟪"),l({},"⟨"),l({},"⟩"),l({},"⟫")))},Zt=()=>K.map(e=>`
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
`);function fe(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
    ${Zt()}
  `;return function(...l){let[{variant:c="outline",size:m="md",color:d,...i},...u]=U(l);return r({...i,class:T("button-group",c,d,m,a,t==null?void 0:t.class,i==null?void 0:i.class)},...u)}}const Jt=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=V(e),l=W(e),c=fe(e),m=["ONE","TWO","THREE"];return()=>o({id:"button-group"},r(t("Button Group Examples")),a("Outline"),c({color:"primary",variant:"solid"},m.map(d=>l({color:"primary",variant:"solid"},d))),a("Button Group Table"),s({Item:d=>c({...d},m.map(i=>l(d,i)))}))};function ce(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
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
  `;return function(...c){let[{color:m="neutral",variant:d="plain",size:i,...u},...g]=U(c);return r({...u,type:"date",class:T("calendar",s,m,d,i,t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const Qt=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,label:c}=n.tags,m=V(e),d=(...b)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),i=n.state("2023-08-08"),u=ce(e),g=ce(e,{class:o`
      background-color: lightseagreen !important;
    `});return()=>r({id:"calendar"},l(t("Calendar")),a("Date: ",i),s("Basic Calendar"),d(c({for:"start"},"Start date:",u({id:"start",value:i.val,oninput:b=>{i.val=b.target.value}}))),s("Calendar min and max"),d(c("End date:",u({min:"2023-01-01",max:"2023-12-31",value:i.val,oninput:b=>{i.val=b.target.value}}))),s("Calendar custom"),d(g({})),s("Calendar Table"),m({Item:b=>u({...b})}))};function Ge(e,t){const{bau:n,css:o}=e,{span:r}=n.tags,a=o`
    border-radius: var(--global-radius);
    padding: 0.2rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: smaller;
    &.clickable {
      cursor: pointer;
    }
  `;return function(...l){let[{size:c,variant:m="outline",color:d="neutral",onclick:i,...u},...g]=U(l);return r({...u,onclick:i,class:T("chip",a,c,m,d,i&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const ea=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l}=n.tags,c=V(e),m=(...i)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...i),d=Ge(e);return()=>r({id:"chip"},l(t("Chip")),s("Chip Default"),m(d("My Chip")),s("Chip Clickable"),m(d({color:"danger",onclick:()=>{alert("Clicked")}},"Chip")),s("Chip Table"),c({Item:i=>d({...i},`Chip ${i.color}`)}))};function Fe(e,t={}){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
      font-size: 1.2rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all var(--transition-fast) ease-in-out;
      opacity: 0;
    }
  `;return function(...l){let[{color:c,variant:m="outline",size:d,...i},...u]=U(l);return r({type:"checkbox",required:"required",...i,class:T(a,c,m,d,t==null?void 0:t.class,i==null?void 0:i.class)})}}const ta=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,label:s,h2:l,form:c}=n.tags,m=V(e),d=Fe(e),i=n.state(!1),u=n.state(!1),g=p=>h=>{p.val=!!h.target.checked},b=(...p)=>a({class:o`
          display: flex;
          align-items: center;
          label {
            margin-left: 1rem;
          }
        `},...p);return()=>r({id:"checkbox"},c(l(t("Checkbox Examples")),b(d({id:"myCheckbox",name:"myCheckbox",checked:i,onchange:g(i)}),s({for:"myCheckbox"},"My Checkbox")),b(d({id:"myCheckbox-disabled",disabled:!0,name:"myCheckbox-disabled",checked:u,onchange:g(u)}),s({for:"myCheckbox-disabled"},"My Disabled Checkbox")),l(t("Checkbox Table")),m({Item:(p,{index:h})=>d({id:`myCheckbox-${h}`,name:`myCheckbox-${h}`,...p})})))};function aa(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=o`
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
  `;return function(...l){let[{color:c,variant:m="outline",size:d,openState:i,...u},...g]=U(l);return r({class:T(a,t==null?void 0:t.class,u.class)},r({class:()=>T("overlay",i.val&&"overlay-open"),onclick:()=>{i.val=!1}}),r({class:()=>T("content",i.val&&"content-open")},g))}}const na=e=>{const{tr:t,bau:n}=e,{section:o,h2:r}=n.tags,a=n.state(!1),s=aa(e),l=W(e),c=Ne(e);return()=>o({id:"drawer"},r(t("Drawer")),l({onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},c()))},oa=e=>{const{tr:t,bau:n,window:o,config:r}=e,{section:a,h2:s,h3:l}=n.tags,c=n.state(o.location.pathname.replace(r.base,"")),m=V(e),d={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},i=pe(e,{base:r.base+"/components/drillDownMenu"});return()=>a({id:"drillDownMenu"},s(t("Drill Down Menu")),i({tree:d,pathnameState:c}),l("Drill Down Table"),m({Item:u=>i({tree:d,...u})}))};function Re(e,t){const{bau:n,css:o}=e,{div:r,span:a,label:s,input:l}=n.tags,c={base:o`
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
    `};return function(d,...i){const{variant:u="outline",color:g="neutral",size:b,Component:p,disabled:h,...v}=d;return r({class:T(c.base,h&&c.disabled,t==null?void 0:t.class,d.class)},s({class:T(u,g,b)},p({disabled:h}),l({type:"file",disabled:h,...v})),a({class:"filename-display"}))}}const ra=e=>{const{tr:t,bau:n,css:o}=e,{svg:r,use:a}=n.tagsNS("http://www.w3.org/2000/svg"),{section:s,div:l,h3:c,h2:m,span:d}=n.tags,i=V(e),u=n.state("No file selected"),g=Re(e),b=h=>{const v=h.target.files[0];v?u.val=v.name:u.val="No file selected"},p=({disabled:h})=>l({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            > * {
              margin: 1rem;
            }
          `,h&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},r({width:100,height:100,fill:"currentColor"},a({href:"uploadIcon.svg#Capa_1"})),d(t("Choose a file to upload")));return()=>s({id:"fileInput"},m(t("FileInput Examples")),c("File Input"),g({Component:p,name:"file",accept:"text/*",onchange:b}),l("File selected: ",u),c("File Input disabled"),g({Component:p,name:"file",accept:"text/*",disabled:!0,onchange:b}),c("File Input Table"),i({Item:h=>g({Component:p,name:"file",accept:"text/*",onchange:b,...h})}))},sa=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=V(e),c=ge(e);return()=>o({id:"input"},s(t("Input Examples")),a("Standard"),r(c({id:"my-Input",name:"Label",label:"Label"})),a("Disabled"),r(c({id:"my-input-disabled",name:"my-input-disabled",label:"my Input disabled",disabled:!0}),c({id:"my-input-disabled-value",name:"my-input-disabled-value",label:"my input disabled",disabled:!0,value:"with value"})),a("Input with error"),r(c({name:"my-input-error",id:"my-input-with-error",label:"my-input",error:"should be greater than 2"})),a("Input Table"),l({Item:m=>c({name:"my-input",id:"my-input-with",placeholder:"Enter text",...m})}))};function Ve(e,t){const{bau:n,css:o}=e,{dialog:r}=n.tags,s=o`
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
  `;return function(...c){let[{color:m="neutral",variant:d="outline",size:i,...u},...g]=U(c);return r({class:T("modal",s,m,d,i,t==null?void 0:t.class,u==null?void 0:u.class)},...g)}}const la=e=>{const{tr:t,bau:n}=e,{section:o,main:r,h2:a,header:s,footer:l,p:c,div:m}=n.tags,d=V(e),i=W(e),u=Ve(e),g=()=>r(Array(10).fill("").map((h,v)=>c(v+1,". Some text here"))),b=h=>{const v=u({id:"my-dialog",...h},s("Header"),g(),l(i({variant:"outline",color:h.color,onclick:()=>{v.close()}},"Cancel"),i({variant:"solid",color:h.color,onclick:()=>{v.close()}},"OK")));return v},p=b({color:"neutral"});return()=>o({id:"modal"},a(t("Modal Examples")),i({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p,a(t("Modal Table")),d({Item:h=>{const v=b(h);return m(i({...h,onclick:()=>{v.showModal()}},"OPEN MODAL"),v)}}))},ia=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,h1:c,p:m}=n.tags,d=W(e),i=(...M)=>a({class:o`
          display: flex;
          justify-content: space-between;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...M),u=be(e),b=(()=>d({onclick:()=>v.open?v.closeDialog():v.openDialog()},"Click"))(),p=()=>a({},c("My content"),m("My Content")),h=p(),v=u({id:"my-popover-left",triggerEl:b,contentEl:h}),y=d({onclick:()=>S.open?S.closeDialog():S.openDialog()},"Click"),$=p(),S=u({id:"my-popover-left",triggerEl:y,contentEl:$});return()=>r({id:"popover",class:o``},l(t("Popover")),s("Basic Popover"),i(a(b,v),a(y,S)))},ca=()=>K.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ue(e,t){const{bau:n,css:o}=e,{div:r,li:a}=n.tags,s=W(e),l=be(e),c=oe(e),m=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${ca()}
  `,d=n.state(""),i=n.state(!1),u=n.state(0);return function(...b){let[{color:p="neutral",variant:h="outline",size:v,id:y,label:$,Option:S,options:M,getOptionLabel:D=({label:k})=>k,...A},...I]=U(b);const B=()=>{C.openDialog(),i.val=!0},P=()=>{C.closeDialog(),i.val=!1},G=()=>{i.val=!1},N=k=>{i.val?P():B()},H=({option:k,index:E})=>_=>{d.val=D(k),u.val=E,P()},F=k=>{switch(k.preventDefault(),k.key){case"Escape":P();break;case"ArrowDown":u.val<M.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=M.length-1:u.val--;break;case"Enter":i.val?(d.val=D(M[u.val]),P()):B();break}},f=()=>c({class:T(p,h)},M.map((k,E)=>a({class:()=>T(u.val==E&&"active"),onclick:H({option:k,index:E})},S(k)))),x=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":i,"aria-label":$,onclick:N,color:p,variant:h,size:v},()=>!d.val&&$,d),C=l({id:y,triggerEl:x,contentEl:f(),onClose:G});return r({...A,class:T("select",p,v,m,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:F},x,C)}}const da=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,span:c}=n.tags,m=(...b)=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...b),d=V(e),i=Ue(e),u=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],g=b=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},c(b.label),c(b.code));return()=>r({id:"select",class:o``},l(t("Select")),s("Basic Select"),m(i({options:u,Option:g,getOptionLabel:({label:b})=>b,label:"Select a country..."})),l(t("Select Table")),d({Item:b=>a(i({...b,options:u,Option:g,getOptionLabel:({label:p})=>p,label:"Select a country..."}))}))};function ae(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,s=o`
    ${(()=>K.map(l=>`
&.slider.${l} {
  accent-color: var(--color-${l});
}
`).join(`
`))()};
  `;return function(...c){let[{color:m="neutral",variant:d="outline",size:i,...u},...g]=U(c);return r({...u,type:"range",class:T("slider",m,d,i,s,t==null?void 0:t.class,u.class)},...g)}}const ua=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:c,label:m,datalist:d,option:i,br:u}=n.tags,g=n.state(0),b=S=>{g.val=S==null?void 0:S.target.value},p=(...S)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...S),h=V(e),v=ae(e),y=ae(e),$=ae(e);return()=>r({id:"slider"},l(t("Slider")),c("Slider value: ",g),s("Basic Slider"),p(v({oninput:b,name:"slider-simple"})),s(t("Slider Table")),h({Item:S=>v(S)}),s("Slider Min Max: -1000 1000"),p(y({oninput:b,min:-1e3,max:1e3})),s("Slider Step 20"),p(v({oninput:b,step:20,min:-100,max:100})),s("Slider Vertical"),p(a({class:o`
              display: flex;
            `},v({oninput:b,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:o`
              width: 30px;

              appearance: slider-vertical;
            `}),d({id:"markers-vertical",class:o`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `},["0","25","50","75","100"].reverse().map(S=>i({value:Number(S),label:S}))))),s("Slider with mark"),p(m({for:"temp"},"Choose a comfortable temperature"),u(),$({oninput:b,class:o`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),d({id:"markers",class:o`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(S=>i({value:Number(S),label:S})))))},Ee={sm:16,md:32,lg:64};function ve(e,t={}){const{bau:n,css:o}=e,{svg:r,animate:a,animateTransform:s,rect:l}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:m="md",color:d="color-base",variant:i="outline",visibility:u=!0,...g}={}){return r({class:T(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${d});
          `,t.class,g.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:Ee[m],height:Ee[m],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},l({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),l({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},a({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const ma=e=>{const{tr:t,bau:n}=e,{section:o,h2:r,h3:a}=n.tags,s=V(e),l=ve(e);return()=>o({id:"spinner"},r(t("Spinner Examples")),a(t("Spinner Table")),s({Item:c=>l(c)}))},ha=()=>K.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{input:r}=n.tags,a=o`
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
    &:hover.solid {
      filter: brightness(var(--brightness-hover-always));
    }
    ${ha()}
  `;return function(...l){let[{color:c="neutral",variant:m="plain",size:d,...i},...u]=U(l);return r({...i,class:T("switch",a,c,m,d,t==null?void 0:t.class,i.class),type:"checkbox",required:"required"},...u)}}const pa=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,label:s,div:l,h2:c}=n.tags,m=V(e),d=_e(e);return()=>r({id:"switch"},c(t("Switch Examples")),a(l({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},s({for:"my-shinny-switch"},"My shinny switch"),d({id:"my-shinny-switch"}))),c(t("Switch Table")),m({Item:i=>l({class:o`
                & label {
                  display: inline-flex;
                  border: 1px dotted var(--color-emphasis-200);
                  font-size: smaller;
                  align-items: center;
                  color: var(--color-content-secondary);
                  padding: 0.2rem;
                }
              `},s("off ",d({...i,id:`my-switch-example-off-${i.color}-${i.variant}`})),s("on ",d({...i,id:`my-switch-example-on-${i.color}-${i.variant}`,checked:!0})))}))},ba=()=>K.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function de(e,t){const{bau:n,css:o}=e,{tabDefs:r}=t,{div:a,ul:s,li:l}=n.tags,c=n.state(r),m=n.state(r[0]),d=u=>c.val.find(g=>g.name==u),i={base:o`
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
      ${ba()}
    `};return function(...g){let[{color:b,variant:p="plain",size:h,...v},...y]=U(g);const $=M=>{const{Header:D,disabled:A,name:I}=M;return l({class:()=>T(m.val.name==I&&"active",A&&"disabled"),onclick:B=>B.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:I},bubbles:!0}))},D(M))},S=a({class:T("tabs",i.base,p,h,b,t==null?void 0:t.class,v.class)},n.loop(c,s(),$),()=>m.val.Content?m.val.Content({}):"");return S.addEventListener("tab.select",M=>{var I,B;const{tabName:D}=M.detail,A=d(D);A&&((I=m.val.exit)==null||I.call(),m.val=A,(B=A.enter)==null||B.call())},!1),S.addEventListener("tab.add",M=>{var A;const{tab:D}=M.detail;(A=D.enter)==null||A.call(),c.val.push(D)},!1),S.addEventListener("tab.remove",M=>{var A;const D=c.val.findIndex(I=>I.name==M.detail.tabName);D>0&&((A=c.val[D].exit)==null||A.call(),c.val.splice(D,1))},!1),S}}const ga=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,p:c,i:m}=n.tags,d=V(e),i=W(e),u=(...y)=>a({class:o`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...y),g=()=>({name:"New Tab",Header:({name:y})=>a(y),Content:()=>a("My Paragraph")}),p=de(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(c("My tab Disabled"))}]}),v=de(e,{tabDefs:[{name:"Tab1",Header:()=>a(m({class:o`
                font-size: 1rem;
                margin: 0 0.3rem;
              `},"⌂"),"TAB 1"),Content:()=>a({class:o`
              > button {
                margin: 10px;
              }
            `},i({onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.add",{detail:{tab:g()},bubbles:!0}))},"Add a new Tab"),i({accent:!0,onclick:y=>y.srcElement.dispatchEvent(new CustomEvent("tab.remove",{detail:{tabName:"New Tab"},bubbles:!0}))},"Remove Tab"),c("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(c("My Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(c("My Content"))}]});return()=>r({id:"tabs"},l(t("Tabs")),s("Basic Tabs"),u(p({})),s("Full Witdth"),u(p({class:o`
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
          `})),s("Add and remove tabs"),u(v({})),l(t("Tabs Table")),d({Item:y=>p(y)}))};function Q(e,t){const{bau:n,css:o,createGlobalStyles:r}=e,{div:a}=n.tags;r`
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
  `;return function(...c){let[{...m},...d]=U(c);return a({...m,class:T("table-container",s,t==null?void 0:t.class,m==null?void 0:m.class)},...d)}}const fa=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,th:l,td:c,tr:m,table:d,thead:i,tbody:u,caption:g}=t.tags;function b(I,B,P,G,N){return{name:I,calories:B,fat:P,carbs:G,protein:N}}const p=[b("Frozen yoghurt",159,6,24,4),b("Ice cream sandwich",237,9,37,4.3),b("Eclair",262,16,24,6),b("Cupcake",305,3.7,67,4.3),b("Gingerbread",356,16,49,3.9)],h=(...I)=>r({class:n`
          border: 1px dotted var(--color-gray-500);
          padding: 1rem;
        `},...I),v=({name:I,calories:B})=>m(c(I),c({class:n`
            text-align: right;
          `},B)),y=()=>i(m(l({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),l({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),$=Q(e,{class:n`
      max-width: 650px;
    `}),S=Q(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `}),M=Q(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `}),D=Q(e,{class:n`
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
    `});return()=>o({id:"table"},s(m("Table")),a("Basic Table"),h($(d(g("Basic Table"),y(),u(p.map(v))))),a("Dense Table"),h(S(d(g("Dense Table"),y(),u(p.map(v))))),a("Zebra Table"),h(M(d(g("Zebra Table"),y(),u(p.map(v))))),a("Caption Bottom"),h(D(d(g("Caption Bottom Table"),y(),u(p.map(v))))),a("Overflow Header"),h(A(d(g("Overflow Header"),y(),u(p.map(v))))))};function Xe(e,t){const{bau:n,css:o}=e,{div:r}=n.tags,a=fe(e),s=W(e),l=ve(e),c=o`
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
  `,m=({label:b,icon:p,...h})=>s({"aria-label":b,title:b,...h},p),d=({count:b,totalCount:p,page:h,rowsPerPage:v})=>r({class:"pages-numbers"},Number(h-1)*Number(v)+(b>0?1:0),"-",Math.min(h*v,p)," of ",p),i=({count:b,page:p,rowsPerPage:h})=>r({class:"pages-numbers"},(p-1)*h+(b>0?1:0),"-",p*h),u=b=>b<=1,g=(b,p,h)=>b>=Math.ceil(p/h);return function(...p){let[{count:h=0,totalCount:v=0,page:y=1,rowsPerPage:$=50,onPageChange:S,isLoading:M=!1,disableFirst:D=()=>u(y),disablePrevious:A=()=>u(y),disableNext:I=()=>g(y,v,$),disableLast:B=()=>g(y,v,$),...P},...G]=U(p);const N=Math.max(0,Math.ceil(v/$)),H=S({page:1}),F=S({page:y-1}),f=S({page:y+1}),x=S({page:N}),C=[{label:"First",icon:"⟪",onclick:H,disabled:D()},{label:"Previous",icon:"⟨",onclick:F,disabled:A()},{label:"Next",icon:"⟩",onclick:f,disabled:I()},{label:"Last",icon:"⟫",onclick:x,disabled:B()}];return r({...P,class:T("table-pagination",c,M&&"disabled",t==null?void 0:t.class,P==null?void 0:P.class)},l({class:"spinner",visibility:M,size:"md"}),v>0?d({count:h,totalCount:v,page:y,maxPages:N,rowsPerPage:$}):i({count:h,page:y,maxPages:N,rowsPerPage:$}),a({variant:"outline",color:"neutral"},C.map(k=>m({...k,variant:"outline",color:"neutral"}))))}}const va=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.col"})),wa=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:c}=t.tags,m=va(45),d=({name:y,email:$})=>a(r(y),r($)),i=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=Xe(e),g=Q(e,{class:n`
      max-width: 650px;
    `}),b=t.state(m),p=t.state({count:m.length,totalCount:m.length,page:1,rowsPerPage:10}),h=t.derive(()=>b.val.slice(p.val.page*p.val.rowsPerPage,(p.val.page+1)*p.val.rowsPerPage)),v=({page:y})=>$=>{p.val.page=y};return()=>g(s(i(),()=>c(h.val.map(d))),()=>u({...p.val,onPageChange:v}))},ya=e=>{const{bau:t,css:n}=e,{th:o,td:r,tr:a,table:s,thead:l,tbody:c,div:m}=t.tags,d=t.state(!1),i=t.state([]),u=t.state(""),g=t.derive(()=>i.val.length),b=t.state(1),p=t.state(10),h=t.derive(()=>i.val),v=B=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(B).toString()}`,y=({page:B})=>P=>{b.val=B,$(v({page:B,per_page:p.val}))};$(v({page:1,per_page:p.val}));async function $(B){try{d.val=!0;const P=await fetch(B,{});if(P.ok){const G=await P.json();i.val=G;return}throw P}catch(P){u.val=P.message}finally{d.val=!1}}const S=({name:B,description:P,stargazers_count:G})=>a(r(B),r(P),r({class:n`
            text-align: right;
          `},G)),M=()=>l(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),D=Xe(e),A=Q(e,{class:n`
      min-width: 650px;
    `}),I=({message:B})=>m(B);return()=>A(()=>D({rowsPerPage:p.val,page:b.val,count:g.val,totalCount:-1,isLoading:d.val,onPageChange:y,disableNext:()=>!1}),s(M(),()=>u.val&&I({message:u.val}),()=>c(h.val.map(S))))},xa=e=>{const{bau:t,css:n}=e,{section:o,div:r,h3:a,h2:s,tr:l}=t.tags,c=wa(e),m=ya(e),d=(...i)=>r({class:n`
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
        `},...i);return()=>o({id:"pagination"},s(l("Table Pagination")),a("Asynchronous Pagination"),d(m()),a("Simple Pagination"),d(c()))};function ue(e,t){const{bau:n,css:o,window:r}=e,{div:a}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:m,side:d="bottom-start",color:i="neutral",variant:u="outline",size:g,...b},...p]=U(c);const h=a({class:T("container",...d.split("-"))},a({class:T("content",i,u,g),role:"tooltip"},m)),v=A=>`move-to-${A}`,y=(A,I,B)=>{if(A()){const P=v(I);h.classList.add(P),h.classList.add(I),h.classList.remove(B)}},$=(A,I)=>{const B=v(A);h.classList.contains(B)&&(h.classList.remove(B),h.classList.add(I),h.classList.remove(A))},S=A=>{const I=h.getBoundingClientRect();y(()=>I.x<0,"right","left"),y(()=>I.x+I.width>r.innerWidth,"left","right"),y(()=>I.y<0,"bottom","top"),y(()=>I.bottom>r.innerHeight,"top","bottom"),h.classList.add("visible")},M=A=>{h.classList.remove("visible"),$("right","left"),$("left","right"),$("bottom","top"),$("top","bottom")};return a({...b,class:T("tooltip",s,t==null?void 0:t.class,b==null?void 0:b.class),bauMounted:({element:A})=>{A.addEventListener("mouseover",S),A.addEventListener("mouseout",M)},bauUnmounted:({element:A})=>{A.removeEventListener("mouseover",S),A.removeEventListener("mouseout",M)}},...p,h)}}const Ca=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h2:s,em:l,p:c}=n.tags,m=V(e),d=W(e),i=ue(e),u=ue(e,{class:o`
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
    `}),g=()=>a({class:o`
          font-size: larger;
        `},c("A ",l("tooltip")," can be any component")),b=()=>[a({class:o`
          display: flex;
          justify-content: space-around;
        `},i({side:"top-start",titleEl:g()},d({},"top-start")),i({side:"top-centered",titleEl:g()},d({},"top-centered")),i({side:"top-end",titleEl:g()},d({},"top-end"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-start",titleEl:g()},d({},"left-start")),i({side:"right-start",titleEl:g()},d({},"right-start"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-centered",titleEl:g()},d({},"left-centered")),i({side:"right-centered",titleEl:g()},d({},"right-centered"))),a({class:o`
          display: flex;
          justify-content: space-between;
        `},i({side:"left-end",titleEl:g()},d({},"left end")),i({side:"right-end",titleEl:g()},d({},"right end"))),a({class:o`
          display: flex;
          justify-content: space-around;
        `},i({side:"bottom-start",titleEl:g()},d({},"bottom start")),i({side:"bottom-centered",titleEl:g()},d({},"bottom centered")),i({side:"bottom-end",titleEl:g()},d({},"bottom end")))];return()=>r({id:"tooltip"},s(t("Tooltip")),a({class:o`
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
          `},u({titleEl:g()},d({},"custom tooltip"))),s(t("Tooltip Table")),m({Item:p=>i({titleEl:g(),...p},d({},`${p.color} ${p.variant}`))}))},ka=e=>{const{tr:t,bau:n,css:o}=e,{section:r,form:a,div:s,h2:l}=n.tags,c=V(e),m=he(e);return()=>r({id:"theme-switch"},l(t("Theme Switch")),a(s({class:o`
              display: flex;
              align-items: center;
              > * {
                margin: 0.5rem;
              }
            `},m({}))),l(t("Theme Switch Table")),c({Item:d=>m(d)}))},Sa=({css:e,createGlobalStyles:t})=>(t`
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
    `});function We(e,t){const{bau:n,css:o,createGlobalStyles:r,window:a}=e,{renderMenuItem:s}=t,{ul:l,li:c,nav:m,div:d}=n.tags,i=Sa({css:o,createGlobalStyles:r}),u=({element:h,closeState:v})=>{h.scrollHeight!=0&&(v.val?g(h):b(h))};function g(h){h.style.height=h.scrollHeight+"px";const v=()=>{h.removeEventListener("transitionend",v)};h.addEventListener("transitionend",v),a.requestAnimationFrame(()=>{h.style.height="0px"})}function b(h){const v=()=>{h.removeEventListener("transitionend",v),h.style.height=null};h.addEventListener("transitionend",v),h.style.height=h.scrollHeight+"px"}const p=({depth:h=1,maxDepth:v,color:y,variant:$,size:S})=>M=>{const{children:D,expanded:A}=M,I=n.state(!A);return c({class:()=>T(D?I.val?i.collapsed:i.expanded:"")},d({class:o`
              cursor: pointer;
            `,onclick:B=>{D&&(I.val=!I.val)}},s(M.data)),D&&h<v&&l({class:T(y,S),bauMounted:({element:B})=>{I.val&&(B.style.height="0px")},"aria-expanded":({element:B})=>(u({element:B,closeState:I}),!I.val)},D.map(p({depth:h+1,maxDepth:v}))))};return function({tree:v,maxDepth:y=1/0,size:$,variant:S="plain",color:M="neutral",...D}){return m({class:T(i.nav,$,S,M,t==null?void 0:t.class,D.class)},v.children&&l(v.children.map(p({maxDepth:y,color:M,variant:S,size:$}))))}}const $a=e=>{const{tr:t,bau:n}=e,{section:o,a:r,h2:a,h3:s}=n.tags,l=V(e),c={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},d=We(e,{renderMenuItem:({name:i,href:u})=>r({href:u,onclick:g=>{g.preventDefault()}},i)});return()=>o({id:"treeview"},a(t("Tree View")),s(t("Tree View Default")),d({tree:c}),s(t("Tree View Table")),l({Item:i=>d({...i,tree:c})}))};function Ea(e,t={}){const{bau:n,css:o}=e,{div:r,span:a,pre:s,h3:l,h4:c}=n.tags;return function(d,...i){return r("Login")}}const Ta=e=>{const{tr:t,bau:n}=e,{section:o,div:r,h3:a,h2:s}=n.tags,l=Ea(e);return()=>o({id:"login"},s(t("Login Examples")),a("Basic"),r(l()))};function Aa(e){const{tr:t,bau:n,css:o}=e,{div:r,article:a,h1:s}=n.tags;return function(){return r({class:o`
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
          `},s(t("Pages Examples")),Ta(e)()))}}const Te=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Ia=e=>{const{tr:t,bau:n,css:o}=e,{section:r,div:a,h3:s,h2:l,li:c,span:m}=n.tags,d=V(e),i=(...b)=>a({class:o`
          border: 1px dotted red;
          padding: 1rem;
        `},...b),u=oe(e),g=({code:b,label:p})=>c({class:o`
          display: flex;
          gap: 1rem;
        `},m(b),m(p));return()=>r({id:"list"},l(t("List")),s("List outline primary"),i(u({variant:"outline",color:"primary"},Te.map(g))),s("List Table"),d({Item:b=>u({...b},Te.map(g))}))},Ma=e=>{const{bau:t,css:n,config:o}=e,{section:r,div:a,h1:s,span:l,p:c,ul:m,li:d,a:i,main:u,header:g,footer:b,label:p}=t.tags,{svg:h,use:v}=t.tagsNS("http://www.w3.org/2000/svg"),y=V(e),S=ze(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>a(c("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>a(c("Item 2 Content"))},{name:"Item3",Header:()=>"Item 3",Content:()=>a(c("Item 3 content"))}]}),M=ne(e),D=He(e),A=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],I=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),B=je(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
        margin: 0.3rem;
      }
    `}),P=ie(e),G={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},N=Oe(e),H=W(e),F=fe(e),f=ce(e),x=Fe(e),C=Ge(e),k={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},E=pe(e,{base:o.base+"/components"}),_=({disabled:w})=>a({class:T(n`
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
            `)},h({width:100,height:100,fill:"currentColor"},v({href:"uploadIcon.svg#Capa_1"})),l("Choose a file to upload")),z=Re(e),R=ge(e),j=Ve(e),L=()=>u(Array(10).fill("").map((w,Y)=>c(Y+1,". Some text here"))),O=w=>{const Y=j({id:"my-dialog",...w},g("Header"),L(),b(H({...w,variant:"outline",onclick:()=>{Y.close()}},"Cancel"),H({...w,variant:"solid",onclick:()=>{Y.close()}},"OK")));return Y},X=Ue(e),q=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],Z=w=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},l(w.label),l(w.code)),re=ae(e),qe=ve(e),ye=_e(e),Ye=de(e,{tabDefs:[{name:"Tab1",Header:()=>a("TAB"),Content:()=>a(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>a("TAB 2"),Content:()=>a(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>a("Tab Disabled"),Content:()=>a(c("My tab Disabled"))}]}),Ke=he(e),Ze=()=>l("My tooltip"),Je=ue(e),Qe={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},et=We(e,{renderMenuItem:({name:w,href:Y})=>i({href:Y,onclick:tt=>{tt.preventDefault()}},w)}),xe=[{name:"Accordion",Item:w=>S({...w})},{name:"Alert",Item:w=>M({...w},`Alert ${w.color}`)},{name:"Autocomplete",Item:w=>D({...w,options:A,Option:I,getOptionLabel:({label:Y})=>Y,label:"Country",placeholder:"Search countries",id:"country"})},{name:"Avatar",Item:w=>B({...w,src:"./grucloud.svg",alt:"GruCloud"})},{name:"Badge",Item:(w,{index:Y})=>P({...w,content:`${Y*100}`},"☏")},{name:"Breadcrumbs",Item:w=>N({...w,...G})},{name:"Button",Item:w=>H({...w},`${w.variant} ${w.color}`)},{name:"Button Group",Item:w=>F({...w},H({},"ONE"),H({},"TWO"),H({},"THREE"))},{name:"Calendar",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,f({...w})))},{name:"Checkbox",Item:w=>p({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${w.color} ${w.variant}`,x({id:`myCheckbox-gallery-${w.color}-${w.variant}`,name:`myCheckbox-gallery-${w.color}-${w.variant}`,...w}))},{name:"Chip",Item:w=>C({...w},`Chip ${w.color}`)},{name:"DrillDown Menu",Item:w=>E({tree:k,...w})},{name:"File Input",Item:w=>z({Component:_,name:"file",accept:"text/*",onchange,...w})},{name:"Input",Item:w=>R({name:"my-input",id:"my-input-with",placeholder:"Enter text",...w})},{name:"Modal",Item:w=>{const Y=O(w);return a(H({...w,onclick:()=>{Y.showModal()}},"OPEN MODAL"),Y)}},{name:"Select",Item:w=>a(X({...w,options:q,Option:Z,getOptionLabel:({label:Y})=>Y,label:"Select a country..."}))},{name:"Slider",Item:w=>a({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},p(`${w.color} ${w.variant}`,re({...w,id:`my-slider-${w.color}-${w.variant}`})))},{name:"Spinner",Item:w=>qe(w)},{name:"Switch",Item:w=>a({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},p("off",ye({...w,id:`mySwitch-off-${w.color}-${w.variant}`})),p("on",ye({...w,id:`mySwitch-on-${w.color}-${w.variant}`,checked:!0})))},{name:"Tabs",Item:w=>Ye(w)},{name:"Theme Switch",Item:w=>Ke(w)},{name:"Tooltip",Item:w=>Je({titleEl:Ze(),...w},H({},`${w.color} ${w.variant}`))},{name:"Tree View",Item:w=>et({...w,tree:Qe})}];return()=>r(s("Bau Component Gallery"),c("This page displays the components with various colors and variants."),m({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},xe.map(({name:w})=>d(C({color:"primary"},i({href:`#${w}`},w))))),xe.map(w=>a({id:w.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},y(w))))},Ba=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Lt(e)})},{path:"components",action:()=>({title:"Component",component:Ma(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Nt(e)})},{path:"alert",action:()=>({title:"Alert",component:Ot(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:Ft(e)})},{path:"animate",action:()=>({title:"Animate",component:Vt(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Wt(e)})},{path:"avatar",action:()=>({title:"Avatar",component:Ut(e)})},{path:"badge",action:()=>({title:"Badge",component:qt(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Yt(e)})},{path:"button",action:()=>({title:"Button",component:Kt(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Jt(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Qt(e)})},{path:"chip",action:()=>({title:"Chip",component:ea(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ta(e)})},{path:"drawer",action:()=>({title:"Drawer",component:na(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:oa(e)})},{path:"fileInput",action:()=>({title:"File Input",component:ra(e)})},{path:"input",action:()=>({title:"Input",component:sa(e)})},{path:"list",action:()=>({title:"List",component:Ia(e)})},{path:"modal",action:()=>({title:"Modal",component:la(e)})},{path:"popover",action:()=>({title:"Popover",component:ia(e)})},{path:"select",action:()=>({title:"Select",component:da(e)})},{path:"slider",action:()=>({title:"Slider",component:ua(e)})},{path:"spinner",action:()=>({title:"Spinner",component:ma(e)})},{path:"switch",action:()=>({title:"Switch",component:pa(e)})},{path:"table",action:()=>({title:"Table",component:fa(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:xa(e)})},{path:"tabs",action:()=>({title:"Tabs",component:ga(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ca(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:ka(e)})},{path:"treeView",action:()=>({title:"Tree View",component:$a(e)})}]},{path:"pages",action:t=>({title:"Pages",component:Aa(e)})}],Da=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),La=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:r,states:a}=e,s=r.state(),l=t({componentState:s});return document.getElementById("app").replaceChildren(l),({router:m})=>{const d=o.location.pathname.replace(n,""),{title:i,component:u,Layout:g=t}=m.resolve({pathname:d});a.pathname.val=d,s.val=u,document.title=`${i}`}},Pa=e=>{const{createGlobalStyles:t}=e;ht(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
      overflow-x: hidden;
    }
    
  `},Na=e=>{const{createGlobalStyles:t}=e;t`
    html[data-theme='dark'] {
  --color-scheme: dark;
  --background-color: #121212;
  --hover-overlay: rgba(255, 255, 255, 0.05);
  --color-content: #e3e3e3;
  --color-content-secondary: rgba(255, 255, 255, 1);
  --brightness-active: 180%;
  --brightness-hover: 250%;
  --brightness-hover-reverse: 60%
  ${Be({dark:!0})}
}
  `};pt();const we={title:"Bau",base:"/bau/bau-ui"},J=Ct({config:we}),{bau:Ae}=J;J.states={pathname:Ae.state(window.location.pathname.replace(we.base,"")),drawerOpen:Ae.state(!0)};Pa(J);Na(J);rt({routes:Ba({context:J}),onLocationChange:La({context:J,LayoutDefault:Mt(J),config:we}),notFoundRoute:Da(J)});
