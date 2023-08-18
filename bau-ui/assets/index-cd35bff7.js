(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const pn=(e,t)=>({...e,paths:[...t,e.path]}),wt=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=pn(o,e);return n?[a,...wt({paths:[...e,o.path],routes:n})]:a}),mn=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},bn=({routes:e=[],notFoundRoute:t})=>{const n=wt({routes:e}).map(o=>({...o,regex:mn(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:r})=>r.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function hn({routes:e,notFoundRoute:t,onLocationChange:n}){const o=bn({routes:e,notFoundRoute:t});return window.addEventListener("popstate",a=>{a.state!=null&&n({router:o})}),window.history.pushState=new Proxy(window.history.pushState,{apply:(a,r,s)=>{a.apply(r,s),n({router:o})}}),document.addEventListener("click",a=>{const{target:r}=a,s=r.getAttribute("href");r.tagName==="A"&&s&&!s.startsWith("http")&&!s.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,s),window.scrollTo({top:0,left:0}),a.preventDefault())}),n({router:o}),o}const yt=[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]],gn=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],fn=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],rt=e=>`var(--color-${e})`,vn=e=>`var(--color-${e}-lightest)`,xn=()=>yt.map(([e])=>`
.outline.${e} {
  border: 2px solid ${rt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${vn(e)};
}
.solid.${e} {
  background-color: ${rt(e)};
}
`).join(`
`),wn=e=>100-e*10,yn=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${wn(t)}%);`).join(`
`),Et=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),En=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-s: ${n};`,`--color-${e}-l: ${o};`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...gn.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),...fn.map(([a,r])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${r}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function Cn({createGlobalStyles:e},{colorPalette:t=yt}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>En([n,o])).join(`
`)}
      ${yn()}
      ${Et({})}
      ${xn()}
      
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
  `}function Sn(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let Ue=e=>Object.prototype.toString.call(e??0).slice(8,-1),kn=e=>Ue(e)=="Object",st=e=>Ue(e)=="Function",ze=e=>["Object","Array"].includes(Ue(e)),it=Object.getPrototypeOf,He=e=>pe(e)?e.val:e,pe=e=>e==null?void 0:e.__isState,Tn=["splice","push","pop","shift","unshift","sort","reverse"],ke=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const J=e=>!pe(e[0])&&kn(e[0])?e:[{},...e];function An(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,r=new Set,s=!1,i,c=f=>n.createElement(f),l=(f,C,p)=>{let b=i;i=C;let w=f(p);return i=b,w},m=()=>{o||(o=window.requestAnimationFrame(()=>{a.forEach(f=>{f.bindings=f.bindings.filter(C=>{var p;return(p=C.element)==null?void 0:p.isConnected}),!f.bindings.length&&!f.computed&&a.delete(f)}),o=void 0}))},d=(f,C,p,b,w,I)=>{var A;if(s){r.add(f);return}for(let H of f.bindings){let{deps:R,element:j,renderInferred:L,render:W,renderItem:y}=H;if(y&&C)(A=x(j,b,(...ee)=>h(y(...ee)),p,w,I)[C])==null||A.call();else{let ee=L?L({element:j}):W({element:j,renderItem:y})(...R.map(He));ee!==j&&j.replaceWith(H.element=h(ee))}}T(f),m()},u=(f,C,p=[])=>({get(b,w,I){var A;if(i==null||i.add(f),w==="_isProxy")return!0;if(!((A=b[w])!=null&&A._isProxy)&&!pe(b[w])&&ze(b[w]))b[w]=new Proxy(b[w],u(f,C,[...p,w]));else if(Tn.includes(w)){let H=b[w];return(...R)=>{let j=H.apply(b,R);return d(f,w,j,R,C,p),j}}return Reflect.get(b,w,I)},set(b,w,I,A){let H=Reflect.set(b,w,I,A);return d(f,"setItem",H,{prop:w,value:I},C,[...p,w]),H}}),v=(f,C)=>new Proxy(C,u(f,C)),x=(f,C,p,b,w,I)=>{let A=()=>f.replaceChildren(...ke(b,p)),H=R=>f[R]&&f.removeChild(f[R]);return{assign:A,sort:A,reverse:A,setItem:()=>{var j;let R=I[0];(j=f.children[R])==null||j.replaceWith(p(w[R],R))},push:()=>f.append(...ke(C,(R,j)=>p(R,w.length+j))),unshift:()=>f.prepend(...ke(C,p)),pop:()=>H("lastChild"),shift:()=>H("firstChild"),splice:()=>{let[R,j,...L]=C;const{length:W}=f.children;for(let y=R>=0?Math.min(R+j-1,W-1):W-1;y>=(R>=0?R:W+R);y--)f.children[y].remove();if(L.length){let y=L.forEach((ee,Ee)=>p(ee,R+Ee));f.children[R]?f.children[R].after(...y):f.append(...y)}}}},g=f=>({oldVal:f,bindings:[],listeners:[],__isState:!0,get val(){let C=this;return i==null||i.add(C),C.valProxy??(C.valProxy=ze(f)?v(C,f):f,C.valProxy)},set val(C){let p=this,b=p.val;ze(C)?(p.valProxy=v(p,C),d(p,"assign",C)):C!==b&&(p.valProxy=C,d(p)),p.oldVal=b}}),h=f=>f==null||f===!1?c("span"):f.nodeType?f:n.createTextNode(f),S=(f,C)=>{let p=new Set;return C.val=l(f,p),p},E=f=>{let C=g(),p=S(f,C);C.computed=!0;for(let b of p)b.listeners.push({computed:f,deps:p,state:C});return C},T=f=>{for(let C of[...f.listeners])S(C.computed,C.state)},D=(f,...C)=>{if(C.length){let p=[];for(let b of C.flat(1/0))b!=null&&p.push(pe(b)?U({deps:[b],render:()=>w=>w}):st(b)?Z({renderInferred:b}):h(b));f.append(...p)}},B={},P=(f,C)=>f&&(Object.getOwnPropertyDescriptor(f,C)??P(it(f),C)),N=(f,C,p)=>{var b;return B[f+","+C]??(B[f+","+C]=((b=P(p,C))==null?void 0:b.set)??0)},O=(f,C)=>new MutationObserver((p,b)=>{p.filter(w=>w.removedNodes).forEach(w=>[...w.removedNodes].find(I=>I===f&&(C({element:f}),b.disconnect(),!0)))}).observe(f.parentNode,{childList:!0}),_=f=>new Proxy(function(p,...b){var H;let[w,...I]=J(b),A=f?n.createElementNS(f,p):c(p);for(let[R,j]of Object.entries(w)){if(R.startsWith("bau"))continue;let L=N(p,R,it(A))?W=>A[R]=W:W=>A.setAttribute(R,W);j==null||(pe(j)?U({deps:[j],render:()=>()=>(L(j.val),A)}):st(j)&&(!R.startsWith("on")||j.isDerived)?Z({renderInferred:()=>(L(j({element:A})),A)}):j.renderProp?U({deps:j.deps,render:()=>()=>(L(j.renderProp({element:A})(...j.deps.map(He))),A)}):L(j))}return D(A,...I),(H=w.bauCreated)==null||H.call(w,{element:A}),w.bauMounted&&t.requestAnimationFrame(()=>w.bauMounted({element:A})),w.bauUnmounted&&t.requestAnimationFrame(()=>O(A,w.bauUnmounted)),A},{get:(C,p)=>C.bind(void 0,p)}),G=(f,C,p)=>{f.element=h(p);for(let b of C)pe(b)&&(a.add(b),b.bindings.push(f));return f.element},Z=({renderInferred:f,element:C})=>{let p=new Set,b=l(f,p,{element:C});return G({renderInferred:f},p,b)},U=({deps:f,element:C,render:p,renderItem:b})=>G({deps:f,render:p,renderItem:b},f,p({element:C,renderItem:b})(...f.map(He))),X=(f,C,p)=>U({deps:[f],render:({renderItem:b})=>w=>(C.append(...ke(w,b)),C),renderItem:p}),V=f=>{s=!0,f(),s=!1,r.forEach(d),r.clear()};return{tags:_(),tagsNS:_,state:g,bind:U,loop:X,derive:E,stateSet:a,batch:V}}const Mn=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},Dn=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},In=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function $n(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...r)=>{const s=In(a,r),i=Mn(s);return!t.getElementById(i)&&Dn(t,e==null?void 0:e.target,i,o(i,s)),i};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function Nn(e){return{bau:An(),...$n(),tr:n=>n,window,...e}}function $(...e){return e.filter(t=>t).join(" ")}function Q(e,t){const{bau:n,css:o}=e,a={root:o`
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
    `};return function(...s){let[{color:i,variant:c,size:l="md",disabled:m,href:d,...u},...v]=J(s);return(d?n.tags.a:n.tags.button)({...u,class:$("button",a.root,c,l,i,d?a.a:a.button,m&&a.disabled,t==null?void 0:t.class,u.class),disabled:m,href:d,...!d&&{type:"button"}},v)}}const oe=["neutral","primary","success","danger","warning"],_n=["plain","outline","solid"],Bn="light",On=()=>oe.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function Me(e,t){const{bau:n,css:o,window:a}=e,{input:r}=n.tags,s=m=>{a.document.documentElement.setAttribute("data-theme",m),localStorage.setItem("theme",m)},i=()=>{try{return localStorage.getItem("theme")}catch{}},c=i();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Bn);const l=o`
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
    ${On()}
  `;return function(...d){let[{color:u,variant:v="outline",size:x="md",...g},...h]=J(d);return r({required:"required",title:"Switch Theme",...g,class:$("theme-switch",u,v,x,l,t==null?void 0:t.class,g.class),type:"checkbox",checked:i()=="dark",onclick:S=>{s(S.target.checked?"dark":"light")}},...h)}}function Rn(e){const{tr:t,bau:n,css:o,config:a,states:r}=e,{i:s,header:i,h1:c,div:l,a:m,img:d,b:u,ul:v,li:x}=n.tags,{svg:g,path:h}=n.tagsNS("http://www.w3.org/2000/svg"),S=r.drawerOpen,E=Q(e,{class:o`
      background: transparent;
    `}),T=Me(e),D=()=>s(g({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},h({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),B=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},E({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>S.val=!S.val},D()),m({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},u(t("Bau UI")))),P=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},T(),E({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},B(),P())}}function Pn({tr:e,bau:t,css:n}){const{footer:o,span:a,a:r,ul:s,li:i,p:c}=t.tags;return function(){return o({class:n`
          grid-area: footer;
          display: flex;
          justify-content: center;
          margin: 1rem;
          span {
          }
        `},a("version: 0.41.0"))}}function Ct(e,t={}){return function({parent:o,animationHide:a,animationShow:r},s){s.style.animation=r;const i=()=>{s.removeEventListener("animationend",i),s.style.animation=""};return s.addEventListener("animationend",i),new MutationObserver((c,l)=>{c.filter(m=>m.removedNodes).forEach(m=>[...m.removedNodes].find(d=>{o.style.position="relative";const u=d.cloneNode(!0);return u.style.top=0,u.style.left=0,u.style.position="absolute",u.style.animation=a,m.previousSibling?m.previousSibling.after(u):m.nextSibling?m.nextSibling.before(u):m.target&&m.target.appendChild(u),u.addEventListener("animationend",()=>u.parentNode.removeChild(u)),l.disconnect(),!0}))}).observe(o,{childList:!0,subtree:!0}),s}}function xe(e,t){const{bau:n,css:o}=e,{ul:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:m="plain",size:d,...u},...v]=J(c);return a({...u,class:$("list",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const ct="0.3s",St=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,r=structuredClone(a);return r.children=o==null?void 0:o.map(St({parent:n,grandParent:e})),e&&(e.parentTree=t),r.parentTree=e,r},kt=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=kt(e)(t.children[o]);if(a)return a}},Ln=({createGlobalStyles:e,keyframes:t})=>({hideToLeft:t`
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
 `});function De(e,t){const{bau:n,css:o,window:a}=e,{base:r=""}=t,s=({currentTree:U,data:X,onclickBack:V})=>h(D({variant:"plain",href:`${r}${U.parentTree.children[0].data.href}`,onclick:V({currentTree:U}),class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:"plain",href:`${r}${X.href}`,class:o`
            flex-grow: 1;
          `},X.name)),i=({data:{name:U,href:X},children:V=[]})=>D({href:`${r}${X}`,"data-ischild":V.length==0},U),c=({subTree:U})=>{var X;return a.location.pathname.replace(r,"")===((X=U==null?void 0:U.data)==null?void 0:X.href)},{renderHeader:l=s,renderMenuItem:m=i,isActive:d=c}=t,{ul:u,li:v,nav:x,div:g,header:h,a:S}=n.tags,E=Ct(),T=xe(e),D=Q(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:P,showFromRight:N,showFromLeft:O}=Ln(e),_=o`
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
  `,G=({variant:U,color:X,size:V,onclickItem:f,onclickBack:C,currentTree:p,pathnameState:b})=>{const{children:w,parentTree:I,data:A}=p;return g({class:$("drillDownMenu",U,X,V)},I&&l({data:A,currentTree:p,onclickBack:C}),w&&T({class:$(U,X,V)},w.map(H=>v({class:()=>$(H.children&&"has-children",d({pathname:b.val,subTree:H})&&"active"),onclick:H.children&&f({currentTree:H})},m(H)))))},Z=({tree:U,pathname:X})=>{let V=St({})(U),f=kt(X)(V);return f||(console.log("drilldown no sub tree",X),f=V),f};return function(X){const{variant:V="plain",color:f="neutral",size:C="md",tree:p,pathnameState:b=n.state(a.location.pathname),...w}=X,I=({currentTree:j})=>L=>H(L,R,j,!0),A=({currentTree:j})=>L=>H(L,R,j.parentTree,!1),H=(j,L,W,y)=>{L.firstChild.replaceChildren(E({parent:L,animationHide:`${y?B:P} ${ct}`,animationShow:`${y?N:O} ${ct}`},G({variant:V,color:f,size:C,currentTree:W,onclickItem:I,onclickBack:A,pathnameState:b})))},R=x({class:$(_,t==null?void 0:t.class,w.class)},()=>G({variant:V,color:f,size:C,currentTree:Z({tree:p,pathname:b.val}),onclickItem:I,onclickBack:A,pathnameState:b}));return R}}const jn={data:{name:"Root"},children:[{data:{name:"Bau UI",href:"/"}},{data:{name:"Components",href:"/components"},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tab",href:"/components/tabs"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};function Tt(e){const{tr:t,bau:n,css:o,config:a,states:r,window:s}=e,{div:i,ul:c,li:l,nav:m,a:d,span:u}=n.tags;let v=!1;const x=De(e,{base:a.base});return function(){return i({bauMounted:({element:h})=>{s.innerWidth<=640&&(v=!0,r.drawerOpen.val=!1)},onclick:h=>{v&&!h.target.dataset.buttonback&&!h.target.parentElement.classList.contains("has-children")&&(r.drawerOpen.val=!1)},style:()=>r.drawerOpen.val?"display:block;":"display:none;",class:$(o`
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
          `)},x({tree:jn,pathnameState:r.pathname}))}}const zn=e=>{const{bau:t,css:n,states:o}=e,{div:a}=t.tags,r=Rn(e),s=Tt(e),i=Pn(e);return function({componentState:l}){return a({class:n`
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
          `},()=>l.val&&l.val({})),i())}};function Hn(e){const{bau:t,css:n,config:o}=e,{div:a,h1:r,h2:s,p:i}=t.tags;Q(e);const c=n`
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
  `;return function({name:m,text:d,tagLine:u}){return a({class:c},r(m),s(d),i(u))}}function Gn(e){const{bau:t,css:n}=e,{div:o,h1:a,p:r}=t.tags,s=n`
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
  `,i=({title:c,Content:l})=>o({className:"feature"},a(c),r(l()));return function({featuresContent:l}){return o({class:s},l.map(i))}}function Un(e){const{bau:t,css:n,config:o}=e,{div:a,p:r,a:s}=t.tags,i=Hn(e),c=Gn(e),l=Q(e),m=n``,d=[{title:"UI components for the web",Content:()=>[r("Over 25 components such as button, input, tabs, autocomplete etc ..."),l({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[r("Each component has a combination of variant, color and size:"),r("3 variant: plain, outline and primary"),r("colors: neutral, primary, danger, warning")]},{title:"Tech",Content:()=>[r("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),r("Typescript support for a better developer experience.")]},{title:"Bundle Size",Content:()=>[r("The component bundle size is about 8x smaller compared to popular React UI component library."),r("Faster download time for users."),r("Save in bandwith fees for the operator."),r("Suitable for low bandwith network and low cost device.")]}];return function({}){return a({class:m},i({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:d}))}}function Fn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function At(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&At(n)}),e}class lt{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Mt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function se(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Wn="</span>",ut=e=>!!e.scope,Vn=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Xn{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Mt(t)}openNode(t){if(!ut(t))return;const n=Vn(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){ut(t)&&(this.buffer+=Wn)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const dt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class Fe{constructor(){this.rootNode=dt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=dt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{Fe._collapse(n)}))}}class Zn extends Fe{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Xn(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function fe(e){return e?typeof e=="string"?e:e.source:null}function Dt(e){return ue("(?=",e,")")}function Kn(e){return ue("(?:",e,")*")}function Yn(e){return ue("(?:",e,")?")}function ue(...e){return e.map(n=>fe(n)).join("")}function qn(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function We(...e){return"("+(qn(e).capture?"":"?:")+e.map(o=>fe(o)).join("|")+")"}function It(e){return new RegExp(e.toString()+"|").exec("").length-1}function Jn(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Qn=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ve(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let r=fe(o),s="";for(;r.length>0;){const i=Qn.exec(r);if(!i){s+=r;break}s+=r.substring(0,i.index),r=r.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?s+="\\"+String(Number(i[1])+a):(s+=i[0],i[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const eo=/\b\B/,$t="[a-zA-Z]\\w*",Xe="[a-zA-Z_]\\w*",Nt="\\b\\d+(\\.\\d+)?",_t="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Bt="\\b(0b[01]+)",to="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",no=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=ue(t,/.*\b/,e.binary,/\b.*/)),se({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},ve={begin:"\\\\[\\s\\S]",relevance:0},oo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[ve]},ao={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[ve]},ro={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Ie=function(e,t,n={}){const o=se({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=We("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:ue(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},so=Ie("//","$"),io=Ie("/\\*","\\*/"),co=Ie("#","$"),lo={scope:"number",begin:Nt,relevance:0},uo={scope:"number",begin:_t,relevance:0},po={scope:"number",begin:Bt,relevance:0},mo={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[ve,{begin:/\[/,end:/\]/,relevance:0,contains:[ve]}]}]},bo={scope:"title",begin:$t,relevance:0},ho={scope:"title",begin:Xe,relevance:0},go={begin:"\\.\\s*"+Xe,relevance:0},fo=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Te=Object.freeze({__proto__:null,MATCH_NOTHING_RE:eo,IDENT_RE:$t,UNDERSCORE_IDENT_RE:Xe,NUMBER_RE:Nt,C_NUMBER_RE:_t,BINARY_NUMBER_RE:Bt,RE_STARTERS_RE:to,SHEBANG:no,BACKSLASH_ESCAPE:ve,APOS_STRING_MODE:oo,QUOTE_STRING_MODE:ao,PHRASAL_WORDS_MODE:ro,COMMENT:Ie,C_LINE_COMMENT_MODE:so,C_BLOCK_COMMENT_MODE:io,HASH_COMMENT_MODE:co,NUMBER_MODE:lo,C_NUMBER_MODE:uo,BINARY_NUMBER_MODE:po,REGEXP_MODE:mo,TITLE_MODE:bo,UNDERSCORE_TITLE_MODE:ho,METHOD_GUARD:go,END_SAME_AS_BEGIN:fo});function vo(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function xo(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function wo(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=vo,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function yo(e,t){Array.isArray(e.illegal)&&(e.illegal=We(...e.illegal))}function Eo(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function Co(e,t){e.relevance===void 0&&(e.relevance=1)}const So=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=ue(n.beforeMatch,Dt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},ko=["of","and","for","in","not","or","if","then","parent","list","value"],To="keyword";function Ot(e,t,n=To){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(r){Object.assign(o,Ot(e[r],t,r))}),o;function a(r,s){t&&(s=s.map(i=>i.toLowerCase())),s.forEach(function(i){const c=i.split("|");o[c[0]]=[r,Ao(c[0],c[1])]})}}function Ao(e,t){return t?Number(t):Mo(e)?0:1}function Mo(e){return ko.includes(e.toLowerCase())}const pt={},le=e=>{console.error(e)},mt=(e,...t)=>{console.log(`WARN: ${e}`,...t)},de=(e,t)=>{pt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),pt[`${e}/${t}`]=!0)},Ae=new Error;function Rt(e,t,{key:n}){let o=0;const a=e[n],r={},s={};for(let i=1;i<=t.length;i++)s[i+o]=a[i],r[i+o]=!0,o+=It(t[i-1]);e[n]=s,e[n]._emit=r,e[n]._multi=!0}function Do(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw le("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ae;if(typeof e.beginScope!="object"||e.beginScope===null)throw le("beginScope must be object"),Ae;Rt(e,e.begin,{key:"beginScope"}),e.begin=Ve(e.begin,{joinWith:""})}}function Io(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw le("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ae;if(typeof e.endScope!="object"||e.endScope===null)throw le("endScope must be object"),Ae;Rt(e,e.end,{key:"endScope"}),e.end=Ve(e.end,{joinWith:""})}}function $o(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function No(e){$o(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Do(e),Io(e)}function _o(e){function t(s,i){return new RegExp(fe(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,i]),this.matchAt+=It(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(c=>c[1]);this.matcherRe=t(Ve(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(i);if(!c)return null;const l=c.findIndex((d,u)=>u>0&&d!==void 0),m=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,m)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const c=new n;return this.rules.slice(i).forEach(([l,m])=>c.addRule(l,m)),c.compile(),this.multiRegexes[i]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,c){this.rules.push([i,c]),c.type==="begin"&&this.count++}exec(i){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(i);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const m=this.getMatcher(0);m.lastIndex=this.lastIndex+1,l=m.exec(i)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const i=new o;return s.contains.forEach(c=>i.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&i.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&i.addRule(s.illegal,{type:"illegal"}),i}function r(s,i){const c=s;if(s.isCompiled)return c;[xo,Eo,No,So].forEach(m=>m(s,i)),e.compilerExtensions.forEach(m=>m(s,i)),s.__beforeBegin=null,[wo,yo,Co].forEach(m=>m(s,i)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Ot(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),i&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=fe(c.end)||"",s.endsWithParent&&i.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+i.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(m){return Bo(m==="self"?s:m)})),s.contains.forEach(function(m){r(m,c)}),s.starts&&r(s.starts,i),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=se(e.classNameAliases||{}),r(e)}function Pt(e){return e?e.endsWithParent||Pt(e.starts):!1}function Bo(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return se(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Pt(e)?se(e,{starts:e.starts?se(e.starts):null}):Object.isFrozen(e)?se(e):e}var Oo="11.8.0";class Ro extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const Ge=Mt,bt=se,ht=Symbol("nomatch"),Po=7,Lt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const r="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Zn};function c(p){return i.noHighlightRe.test(p)}function l(p){let b=p.className+" ";b+=p.parentNode?p.parentNode.className:"";const w=i.languageDetectRe.exec(b);if(w){const I=_(w[1]);return I||(mt(r.replace("{}",w[1])),mt("Falling back to no-highlight mode for this block.",p)),I?w[1]:"no-highlight"}return b.split(/\s+/).find(I=>c(I)||_(I))}function m(p,b,w){let I="",A="";typeof b=="object"?(I=p,w=b.ignoreIllegals,A=b.language):(de("10.7.0","highlight(lang, code, ...args) has been deprecated."),de("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),A=p,I=b),w===void 0&&(w=!0);const H={code:I,language:A};f("before:highlight",H);const R=H.result?H.result:d(H.language,H.code,w);return R.code=H.code,f("after:highlight",R),R}function d(p,b,w,I){const A=Object.create(null);function H(k,M){return k.keywords[M]}function R(){if(!z.keywords){te.addText(q);return}let k=0;z.keywordPatternRe.lastIndex=0;let M=z.keywordPatternRe.exec(q),F="";for(;M;){F+=q.substring(k,M.index);const K=ae.case_insensitive?M[0].toLowerCase():M[0],ne=H(z,K);if(ne){const[re,un]=ne;if(te.addText(F),F="",A[K]=(A[K]||0)+1,A[K]<=Po&&(Se+=un),re.startsWith("_"))F+=M[0];else{const dn=ae.classNameAliases[re]||re;W(M[0],dn)}}else F+=M[0];k=z.keywordPatternRe.lastIndex,M=z.keywordPatternRe.exec(q)}F+=q.substring(k),te.addText(F)}function j(){if(q==="")return;let k=null;if(typeof z.subLanguage=="string"){if(!t[z.subLanguage]){te.addText(q);return}k=d(z.subLanguage,q,!0,at[z.subLanguage]),at[z.subLanguage]=k._top}else k=v(q,z.subLanguage.length?z.subLanguage:null);z.relevance>0&&(Se+=k.relevance),te.__addSublanguage(k._emitter,k.language)}function L(){z.subLanguage!=null?j():R(),q=""}function W(k,M){k!==""&&(te.startScope(M),te.addText(k),te.endScope())}function y(k,M){let F=1;const K=M.length-1;for(;F<=K;){if(!k._emit[F]){F++;continue}const ne=ae.classNameAliases[k[F]]||k[F],re=M[F];ne?W(re,ne):(q=re,R(),q=""),F++}}function ee(k,M){return k.scope&&typeof k.scope=="string"&&te.openNode(ae.classNameAliases[k.scope]||k.scope),k.beginScope&&(k.beginScope._wrap?(W(q,ae.classNameAliases[k.beginScope._wrap]||k.beginScope._wrap),q=""):k.beginScope._multi&&(y(k.beginScope,M),q="")),z=Object.create(k,{parent:{value:z}}),z}function Ee(k,M,F){let K=Jn(k.endRe,F);if(K){if(k["on:end"]){const ne=new lt(k);k["on:end"](M,ne),ne.isMatchIgnored&&(K=!1)}if(K){for(;k.endsParent&&k.parent;)k=k.parent;return k}}if(k.endsWithParent)return Ee(k.parent,M,F)}function an(k){return z.matcher.regexIndex===0?(q+=k[0],1):(je=!0,0)}function rn(k){const M=k[0],F=k.rule,K=new lt(F),ne=[F.__beforeBegin,F["on:begin"]];for(const re of ne)if(re&&(re(k,K),K.isMatchIgnored))return an(M);return F.skip?q+=M:(F.excludeBegin&&(q+=M),L(),!F.returnBegin&&!F.excludeBegin&&(q=M)),ee(F,k),F.returnBegin?0:M.length}function sn(k){const M=k[0],F=b.substring(k.index),K=Ee(z,k,F);if(!K)return ht;const ne=z;z.endScope&&z.endScope._wrap?(L(),W(M,z.endScope._wrap)):z.endScope&&z.endScope._multi?(L(),y(z.endScope,k)):ne.skip?q+=M:(ne.returnEnd||ne.excludeEnd||(q+=M),L(),ne.excludeEnd&&(q=M));do z.scope&&te.closeNode(),!z.skip&&!z.subLanguage&&(Se+=z.relevance),z=z.parent;while(z!==K.parent);return K.starts&&ee(K.starts,k),ne.returnEnd?0:M.length}function cn(){const k=[];for(let M=z;M!==ae;M=M.parent)M.scope&&k.unshift(M.scope);k.forEach(M=>te.openNode(M))}let Ce={};function ot(k,M){const F=M&&M[0];if(q+=k,F==null)return L(),0;if(Ce.type==="begin"&&M.type==="end"&&Ce.index===M.index&&F===""){if(q+=b.slice(M.index,M.index+1),!a){const K=new Error(`0 width match regex (${p})`);throw K.languageName=p,K.badRule=Ce.rule,K}return 1}if(Ce=M,M.type==="begin")return rn(M);if(M.type==="illegal"&&!w){const K=new Error('Illegal lexeme "'+F+'" for mode "'+(z.scope||"<unnamed>")+'"');throw K.mode=z,K}else if(M.type==="end"){const K=sn(M);if(K!==ht)return K}if(M.type==="illegal"&&F==="")return 1;if(Le>1e5&&Le>M.index*3)throw new Error("potential infinite loop, way more iterations than matches");return q+=F,F.length}const ae=_(p);if(!ae)throw le(r.replace("{}",p)),new Error('Unknown language: "'+p+'"');const ln=_o(ae);let Pe="",z=I||ln;const at={},te=new i.__emitter(i);cn();let q="",Se=0,ce=0,Le=0,je=!1;try{if(ae.__emitTokens)ae.__emitTokens(b,te);else{for(z.matcher.considerAll();;){Le++,je?je=!1:z.matcher.considerAll(),z.matcher.lastIndex=ce;const k=z.matcher.exec(b);if(!k)break;const M=b.substring(ce,k.index),F=ot(M,k);ce=k.index+F}ot(b.substring(ce))}return te.finalize(),Pe=te.toHTML(),{language:p,value:Pe,relevance:Se,illegal:!1,_emitter:te,_top:z}}catch(k){if(k.message&&k.message.includes("Illegal"))return{language:p,value:Ge(b),illegal:!0,relevance:0,_illegalBy:{message:k.message,index:ce,context:b.slice(ce-100,ce+100),mode:k.mode,resultSoFar:Pe},_emitter:te};if(a)return{language:p,value:Ge(b),illegal:!1,relevance:0,errorRaised:k,_emitter:te,_top:z};throw k}}function u(p){const b={value:Ge(p),illegal:!1,relevance:0,_top:s,_emitter:new i.__emitter(i)};return b._emitter.addText(p),b}function v(p,b){b=b||i.languages||Object.keys(t);const w=u(p),I=b.filter(_).filter(Z).map(L=>d(L,p,!1));I.unshift(w);const A=I.sort((L,W)=>{if(L.relevance!==W.relevance)return W.relevance-L.relevance;if(L.language&&W.language){if(_(L.language).supersetOf===W.language)return 1;if(_(W.language).supersetOf===L.language)return-1}return 0}),[H,R]=A,j=H;return j.secondBest=R,j}function x(p,b,w){const I=b&&n[b]||w;p.classList.add("hljs"),p.classList.add(`language-${I}`)}function g(p){let b=null;const w=l(p);if(c(w))return;if(f("before:highlightElement",{el:p,language:w}),p.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(p)),i.throwUnescapedHTML))throw new Ro("One of your code blocks includes unescaped HTML.",p.innerHTML);b=p;const I=b.textContent,A=w?m(I,{language:w,ignoreIllegals:!0}):v(I);p.innerHTML=A.value,x(p,w,A.language),p.result={language:A.language,re:A.relevance,relevance:A.relevance},A.secondBest&&(p.secondBest={language:A.secondBest.language,relevance:A.secondBest.relevance}),f("after:highlightElement",{el:p,result:A,text:I})}function h(p){i=bt(i,p)}const S=()=>{D(),de("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function E(){D(),de("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let T=!1;function D(){if(document.readyState==="loading"){T=!0;return}document.querySelectorAll(i.cssSelector).forEach(g)}function B(){T&&D()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",B,!1);function P(p,b){let w=null;try{w=b(e)}catch(I){if(le("Language definition for '{}' could not be registered.".replace("{}",p)),a)le(I);else throw I;w=s}w.name||(w.name=p),t[p]=w,w.rawDefinition=b.bind(null,e),w.aliases&&G(w.aliases,{languageName:p})}function N(p){delete t[p];for(const b of Object.keys(n))n[b]===p&&delete n[b]}function O(){return Object.keys(t)}function _(p){return p=(p||"").toLowerCase(),t[p]||t[n[p]]}function G(p,{languageName:b}){typeof p=="string"&&(p=[p]),p.forEach(w=>{n[w.toLowerCase()]=b})}function Z(p){const b=_(p);return b&&!b.disableAutodetect}function U(p){p["before:highlightBlock"]&&!p["before:highlightElement"]&&(p["before:highlightElement"]=b=>{p["before:highlightBlock"](Object.assign({block:b.el},b))}),p["after:highlightBlock"]&&!p["after:highlightElement"]&&(p["after:highlightElement"]=b=>{p["after:highlightBlock"](Object.assign({block:b.el},b))})}function X(p){U(p),o.push(p)}function V(p){const b=o.indexOf(p);b!==-1&&o.splice(b,1)}function f(p,b){const w=p;o.forEach(function(I){I[w]&&I[w](b)})}function C(p){return de("10.7.0","highlightBlock will be removed entirely in v12.0"),de("10.7.0","Please use highlightElement now."),g(p)}Object.assign(e,{highlight:m,highlightAuto:v,highlightAll:D,highlightElement:g,highlightBlock:C,configure:h,initHighlighting:S,initHighlightingOnLoad:E,registerLanguage:P,unregisterLanguage:N,listLanguages:O,getLanguage:_,registerAliases:G,autoDetection:Z,inherit:bt,addPlugin:X,removePlugin:V}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Oo,e.regex={concat:ue,lookahead:Dt,either:We,optional:Yn,anyNumberOfTimes:Kn};for(const p in Te)typeof Te[p]=="object"&&At(Te[p]);return Object.assign(e,Te),e},me=Lt({});me.newInstance=()=>Lt({});var Lo=me;me.HighlightJS=me;me.default=me;const gt=Fn(Lo),ft="[A-Za-z$_][0-9A-Za-z$_]*",jo=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],zo=["true","false","null","undefined","NaN","Infinity"],jt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],zt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Ht=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ho=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Go=[].concat(Ht,jt,zt);function Uo(e){const t=e.regex,n=(b,{after:w})=>{const I="</"+b[0].slice(1);return b.input.indexOf(I,w)!==-1},o=ft,a={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,w)=>{const I=b[0].length+b.index,A=b.input[I];if(A==="<"||A===","){w.ignoreMatch();return}A===">"&&(n(b,{after:I})||w.ignoreMatch());let H;const R=b.input.substring(I);if(H=R.match(/^\s*=/)){w.ignoreMatch();return}if((H=R.match(/^\s+extends\s+/))&&H.index===0){w.ignoreMatch();return}}},i={$pattern:ft,keyword:jo,literal:zo,built_in:Go,"variable.language":Ho},c="[0-9](_?[0-9])*",l=`\\.(${c})`,m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${m})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${m})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},u={className:"subst",begin:"\\$\\{",end:"\\}",keywords:i,contains:[]},v={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"xml"}},x={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"css"}},g={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,u],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,u]},E={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,x,g,h,{match:/\$\d+/},d];u.contains=T.concat({begin:/\{/,end:/\}/,keywords:i,contains:["self"].concat(T)});const D=[].concat(E,u.contains),B=D.concat([{begin:/\(/,end:/\)/,keywords:i,contains:["self"].concat(D)}]),P={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B},N={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},O={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...jt,...zt]}},_={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},G={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[P],illegal:/%/},Z={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function U(b){return t.concat("(?!",b.join("|"),")")}const X={match:t.concat(/\b/,U([...Ht,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},V={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},f={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},P]},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",p={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[P]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:i,exports:{PARAMS_CONTAINS:B,CLASS_REFERENCE:O},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),_,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,v,x,g,h,E,{match:/\$\d+/},d,O,{className:"attr",begin:o+t.lookahead(":"),relevance:0},p,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[E,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:B}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:r},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},G,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[P,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},V,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[P]},X,Z,N,f,{match:/\$[(.]/}]}}const Gt=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:r,tr:s,td:i,thead:c,th:l}=t.tags,m=["sm","md","lg"];return function({Item:u,name:v}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
          }
        `},a(c(s(l(v??"Variant/Color"),oe.map(x=>l(x)))),r(_n.map(x=>s(l(x),oe.map((g,h)=>i(u({color:g,variant:x,size:m[h%3]},{index:h}))))))))}},Y=e=>{const{bau:t,css:n}=e,{article:o,section:a,h1:r,p:s,h2:i,h3:c,pre:l,div:m,code:d}=t.tags;gt.registerLanguage("javascript",Uo);const u=Gt(e),v=({text:x})=>l({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:g})=>{g.innerHTML=gt.highlight(x,{language:"js"}).value}}));return function(g){return o({class:n``},r(g.title),s(g.description),g.gridItem&&[i("Gallery"),g.gridItem&&u({Item:g.gridItem(e)})],i("Usage"),c("Import"),v({text:g.importStatement}),i("Examples"),g.examples.map(h=>a(r(h.title),s(h.description),m(h.createComponent(e)()),v({text:h.code}))))}},Fo=()=>oe.map(e=>`
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
`);function $e(e,t){const{bau:n,css:o}=e,{accordionDefs:a}=t,{div:r,ul:s,li:i,header:c,h3:l,button:m}=n.tags,d=n.state(""),u=g=>h=>{d.val==g?d.val="":d.val=g},v=({element:g,open:h})=>{const S=()=>{g.removeEventListener("transitionend",S)};function E(D){D.addEventListener("transitionend",S),window.requestAnimationFrame(()=>{D.style.height="0px"})}function T(D){D.addEventListener("transitionend",S),D.style.height=D.scrollHeight+"px"}g.scrollHeight!=0&&(h?T(g):E(g))},x=o`
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
    ${Fo()}
  `;return function(...h){let[{color:S,variant:E="outline",size:T="md",content:D,...B},...P]=J(h);const N=O=>{const{Header:_,Content:G,name:Z}=O;return i({class:$(S,E,T),onclick:u(Z)},l({class:()=>$(d.val==Z&&"active")},m({type:"button","aria-controls":`bau-${Z}`,"aria-expanded":({element:U})=>d.val==Z},_(O))),r({class:"content",role:"region",id:`bau-${Z}`,"data-state":({element:U})=>{const X=d.val==Z;return v({element:U,open:X}),X}},G(O)))};return r({class:$("accordion",x,t==null?void 0:t.class,B.class)},s(a.map(N)))}}const Ut=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=$e(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return s=>r({...s})},Wo=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=$e(e,{accordionDefs:[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]});return()=>r({color:"neutral",variant:"outline"})},Vo=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,Ft=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Xo=e=>{const{css:t}=e,n=Ft(e),o=$e(e,{accordionDefs:n});return()=>o({color:"warning",class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Zo=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ko=e=>{const{css:t}=e,n=Ft(e),o=$e(e,{accordionDefs:n});return()=>o({color:"success",variant:"outline",class:t`
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
      `})},Yo=`import accordion from "@grucloud/bau-ui/accordion";
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
`,qo={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Vo,createComponent:Wo},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Zo,createComponent:Xo},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Yo,createComponent:Ko}],gridItem:Ut},Jo=e=>{const t=Y(e);return()=>t(qo)},Qo={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},ea=({css:e,createGlobalStyles:t})=>{t`
:root {
  --alert-border-left-width: 8px;
}
`},ta=()=>oe.map(e=>`
&.alert.outline.${e} {
  & .icon {
    color: var(--color-${e})
  }
}
`).join(`
`);function Ne(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r,i:s}=n.tags;ea({css:o,createGlobalStyles:a});const i=o`
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
    ${ta()}
  `,c=Q(e),l=({onclick:m})=>c({"aria-label":"Close",onclick:m,class:"button-close"},"✖");return function(d,...u){const{variant:v="outline",color:x="neutral",size:g="md",onRemove:h,...S}=d;return r({...S,class:$(`alert-${v}`,v,x,g,i,t==null?void 0:t.class,d.class,"alert"),role:"alert"},s({class:"icon"},Qo[x]),r({class:"content"},...u),h&&l({onclick:h}))}}const Wt=e=>{const t=Ne(e);return n=>t({...n},`Alert ${n.variant} ${n.color}`)},na=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Ne(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},oa=`import alert from "@grucloud/bau-ui/alert";
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
`,aa=e=>{const{css:t}=e,n=Ne(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},ra=`import alert from "@grucloud/bau-ui/alert";
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
`,sa={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:oa,createComponent:na},{title:"Custom Alert ",description:"A custom alert.",code:ra,createComponent:aa}],gridItem:Wt},ia=e=>{const t=Y(e);return()=>t(sa)},ca=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:r=10,deleteAfterDuration:s=15e3}=t,{div:i}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:u,status:v})=>{const x=c.val.findIndex(g=>g.id===u);x!=-1&&(c.val[x].status=v)};return function(v={},...x){const g=({id:E})=>{d({id:E,status:"removing"});const T=c.val.findIndex(D=>D.id===E);T!=-1&&c.val.splice(T,1)},h=({Component:E})=>{const T={id:Math.random().toString(10).split(".")[1],Component:E,status:"inserting"};c.val.length>=r&&g({id:c.val[0].id}),c.val.push(T),setTimeout(()=>g(T),s)},S=E=>i({class:m.item,onclick:()=>g(E)},E.Component());return document.addEventListener("alert.add",E=>h(E.detail)),document.addEventListener("alert.remove",E=>g(E.detail)),i({class:$(m.stack,t==null?void 0:t.class,v.class)},n.loop(c,i(),S))}},la=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=ca(e,{deleteAfterDuration:2e4}),r=Q(e),s=Ne(e);return()=>o(a(),r({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},ua=`import { Context } from "@grucloud/bau-ui/context";
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
`,da={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:ua,createComponent:la}]},pa=e=>{const t=Y(e);return()=>t(da)},ma=({keyframes:e})=>({hideRight:e`
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
 `}),ba=e=>{const{bau:t}=e,{section:n,div:o,h1:a}=t.tags,r=Ct(),s=Q(e),i=ma(e);return function(){const c=t.state(!0),l=o(),m=d=>{l.replaceChildren(r({parent:l,animationHide:`${i.hideRight} 0.5s`,animationShow:`${i.showRight} 0.5s`},o(d.val?"Ciao":"")))};return m(c),n({id:"animate"},o(a("Test Animate"),o(s({onclick:()=>{c.val=!c.val,m(c)}},()=>c.val?"Hide":"Show")),l))}};function Vt(e,t){const{bau:n,css:o}=e,{span:a,img:r}=n.tags,s=n.state(!0),i=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,i.val=!0},m=o`
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
  `;return function(...u){let[{color:v,variant:x="outline",size:g="md",width:h=30,height:S=30,...E},...T]=J(u);return a({class:$(m,t==null?void 0:t.class,E.class)},()=>s.val?"Loading...":"",()=>i.val&&"Error",r({width:h,height:S,onload:c,onerror:l,class:$(v,x,g,m,t==null?void 0:t.class,E.class),...E}))}}const Xt=e=>{const{css:t}=e,n=Vt(e,{class:t`
      > img {
        border-radius: 50%;
      }
    `});return o=>n({...o,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},ha=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=Vt(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},ga=`import avatar from "@grucloud/bau-ui/avatar";
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
`,fa={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:ga,createComponent:ha}],gridItem:Xt},va=e=>{const t=Y(e);return()=>t(fa)};function Ze(e,t){const{bau:n,css:o,window:a}=e,{dialog:r}=n.tags,s=o`
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
  `;return function(...c){let[{contentEl:l,triggerEl:m,onClose:d,...u},...v]=J(c);const x=S=>{h.style.opacity=1,h.showModal();const E=m.getBoundingClientRect(),T=h.getBoundingClientRect();E.x<a.innerWidth/2?h.style.left=E.left+"px":h.style.left=E.right-T.width+"px",E.y<a.innerHeight/2?h.style.top=E.top+E.height+"px":h.style.top=E.top-T.height+"px"},g=S=>{const E=()=>{h.close(),h.removeEventListener("transitionend",E)};h.addEventListener("transitionend",E),h.style.opacity=0},h=r({role:"presentation",class:$("popover",s,t==null?void 0:t.class,u==null?void 0:u.class),onclick:S=>S.target===h&&(g(),d==null?void 0:d.call())},l);return h.closeDialog=g,h.openDialog=x,h}}const xa=()=>oe.map(e=>`
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
`);function _e(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
    ${xa()}
  `;return function(i){const{size:c="md",variant:l="outline",color:m="neutral",name:d,id:u,disabled:v,...x}=i;return a({...x,class:$("input",c,m,l,r,t==null?void 0:t.class,x.class)})}}const wa=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function Zt(e,t){const{bau:n,css:o}=e,{div:a,li:r,ul:s}=n.tags,i=Ze(e),c=Q(e),l=_e(e),m=xe(e),d=o`
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

    ${wa()}
  `,u=n.state(""),v=n.state(""),x=n.state(!1),g=n.state(0),h=()=>{x.val=!1};return function(...E){let[{variant:T="outline",color:D,size:B="md",id:P,label:N,placeholder:O,Option:_,options:G,getOptionLabel:Z=({label:L})=>L,...U},...X]=J(E);const V=n.state(G),f=()=>{j.openDialog(),x.val=!0,v.val="",V.val=G},C=()=>{j.closeDialog(),x.val=!1,v.val=""},p=L=>{const{value:W}=L.target;v.val=W,W?V.val=G.filter(y=>Z(y).match(new RegExp(`${W}`,"i"))):V.val=G},b=L=>{x.val?C():f()},w=({option:L,index:W})=>y=>{u.val=Z(L),g.val=W,C()},I=L=>{switch(console.log("onkeydown",L.key,g.val),L.key){case"Escape":C();break;case"ArrowDown":g.val<V.val.length-1?g.val++:g.val=0;break;case"ArrowUp":g.val<=0?g.val=V.val.length-1:g.val--;break;case"Enter":u.val=Z(V.val[g.val]),v.val="",C();break}},A=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":x,"aria-label":N,onclick:b,variant:T,color:D,size:B},()=>!u.val&&N,u),H=l({id:P,value:v,placeholder:O,autofocus:!0,type:"search",autocomplete:"new-password",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":x,oninput:p,onkeydown:I,variant:T,color:D,size:B}),j=i({id:P,triggerEl:A,contentEl:(()=>a({class:$(T,D,B,"content")},H,()=>m({class:$(T,D,B)},V.val.map((L,W)=>r({class:()=>$(g.val==W&&"active"),onclick:w({option:L,index:W})},_(L))))))(),onClose:h});return a({...U,class:$("autocomplete",d,t==null?void 0:t.class,U==null?void 0:U.class)},A,j)}}const Kt=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,r=Zt(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"})},ya=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,s=Zt(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code));return()=>o(s({options:i,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Ea=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ca={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Default",description:"A simple autocomplete.",code:Ea,createComponent:ya}],gridItem:Kt},Sa=e=>{const t=Y(e);return()=>t(Ca)};function Yt(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m="md",content:d,...u},...v]=J(i);return a({...u,class:$("badge",r,t==null?void 0:t.class,u==null?void 0:u.class)},a({class:$(c,l,m)},d),...v)}}const qt=e=>{const t=Yt(e);return(n,{index:o})=>t({...n,content:`${o*100}`},"☏")},ka=e=>{const{bau:t}=e,{section:n}=t.tags,o=Yt(e);return()=>n(o({content:"10"},"☏"))},Ta=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Aa={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ta,createComponent:ka}],gridItem:qt},Ma=e=>{const t=Y(e);return()=>t(Aa)};function Jt(e,t){const{bau:n,css:o}=e,{ul:a,li:r,a:s,span:i}=n.tags,c=Q(e),l=o`
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
  `;return function(...d){let[{color:u,variant:v="outline",size:x="md",items:g,...h},...S]=J(d);return a({...h,class:$(l,t==null?void 0:t.class,h==null?void 0:h.class)},g.map(({href:E,name:T})=>r((E?c:i)({href:E,color:u,variant:v,size:x,class:$(u,v,x)},T))))}}const Qt=e=>{const t={items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},n=Jt(e);return o=>n({...o,...t})},Da=e=>{const{bau:t}=e,{section:n}=t.tags,o={variant:"outline",color:"neutral",items:[{href:"/",name:"⌂"},{name:"Dir"},{href:"/dir/subdir",name:"SubDir"}]},a=Jt(e);return()=>n(a(o))},Ia=`import breadcrumbs, {
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
`,$a={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Ia,createComponent:Da}],gridItem:Qt},Na=e=>{const t=Y(e);return()=>t($a)},_a=e=>{const t=Q(e);return n=>t({...n},`${n.variant} ${n.color} ${n.size}`)},Ba=e=>{const{bau:t}=e,{section:n}=t.tags,o=Q(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Oa=`import button from "@grucloud/bau-ui/button";
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
`,Ra={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Default",description:"A simple button.",code:Oa,createComponent:Ba}],gridItem:_a},Pa=e=>{const t=Y(e);return()=>t(Ra)},La=()=>oe.map(e=>`
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
`);function Be(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
    ${La()}
  `;return function(...i){let[{variant:c="outline",size:l="md",color:m,...d},...u]=J(i);return a({...d,class:$("button-group",c,m,l,r,t==null?void 0:t.class,d==null?void 0:d.class)},...u)}}const ja=e=>{const t=["ONE","TWO","THREE"],n=Q(e),o=Be(e);return a=>o({...a},t.map(r=>n(a,r)))},za=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=Q(e),r=Be(e),s="primary",i="solid";return()=>n(r({color:s,variant:i},o.map(c=>a({color:s,variant:i},c))))},Ha=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Ga={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Ha,createComponent:za}],gridItem:ja},Ua=e=>{const t=Y(e);return()=>t(Ga)};function Ke(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:m="plain",size:d,...u},...v]=J(c);return a({...u,type:"date",class:$("calendar",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Fa=e=>{const t=Ke(e);return n=>t({...n})},Wa=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),r=Ke(e);return()=>n(o("Start date:",r({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},Va=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Xa={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:Va,createComponent:Wa}],gridItem:Fa},Za=e=>{const t=Y(e);return()=>t(Xa)};function Ye(e,t){const{bau:n,css:o}=e,{span:a}=n.tags,r=o`
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
  `;return function(...i){let[{size:c="md",variant:l="outline",color:m="neutral",onclick:d,...u},...v]=J(i);return a({...u,onclick:d,class:$("chip",r,c,l,m,d&&"clickable",t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const Ka=e=>{const t=Ye(e);return n=>t({...n},`Chip ${n.color} ${n.variant}`)},Ya=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ye(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},qa=`import chip from "@grucloud/bau-ui/chip";
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
`,Ja={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:qa,createComponent:Ya}],gridItem:Ka},Qa=e=>{const t=Y(e);return()=>t(Ja)};function qe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m="md",...d},...u]=J(i);return a({type:"checkbox",required:"required",...d,class:$(r,c,l,m,t==null?void 0:t.class,d==null?void 0:d.class)})}}const er=e=>{const{bau:t,css:n}=e,{label:o}=t.tags,a=qe(e);return r=>o({class:n`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${r.color} ${r.variant} ${r.size}`,a({id:`myCheckbox-gallery-${r.color}-${r.variant}-${r.size}`,name:`myCheckbox-gallery-${r.color}-${r.variant}`,...r}))},tr=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,r=qe(e),s=t.state(!1),i=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",r({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:i})))},nr=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,or={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:nr,createComponent:tr}],gridItem:er},ar=e=>{const t=Y(e);return()=>t(or)};function rr(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=o`
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
  `;return function(...i){let[{color:c,variant:l="outline",size:m,openState:d,...u},...v]=J(i);return a({class:$(r,t==null?void 0:t.class,u.class)},a({class:()=>$("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>$("content",d.val&&"content-open")},v))}}const sr=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),r=rr(e),s=Q(e),i=Tt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),r({openState:a},i()))},ir=`import drawer from "@grucloud/bau-ui/drawer";
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
`,cr={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:ir,createComponent:sr}]},lr=e=>{const t=Y(e);return()=>t(cr)},ur=e=>{const{config:t}=e,n={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=De(e,{base:t.base+"/components/drillDownMenu"});return a=>o({tree:n,...a})},dr=e=>{const{bau:t,config:n}=e,{section:o}=t.tags,a=t.state(window.location.pathname.replace(n.base,"")),r={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},s=De(e,{base:n.base+"/components/drillDownMenu"});return()=>o(s({tree:r,pathnameState:a}))},pr=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,mr={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:pr,createComponent:dr}],gridItem:ur},br=e=>{const t=Y(e);return()=>t(mr)};function Je(e,t){const{bau:n,css:o}=e,{div:a,span:r,label:s,input:i}=n.tags,c={base:o`
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
    `};return function(m,...d){const{variant:u="outline",color:v="neutral",size:x="md",Component:g,disabled:h,...S}=m;return a({class:$(c.base,h&&c.disabled,t==null?void 0:t.class,m.class)},s({class:$(u,v,x)},g({disabled:h}),i({type:"file",disabled:h,...S})),r({class:"filename-display"}))}}const hr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{div:i,span:c}=n.tags,l=n.state("No file selected"),m=Je(e),d=v=>{const x=v.target.files[0];x?l.val=x.name:l.val="No file selected"},u=({disabled:v})=>i({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(t("Choose a file to upload")));return v=>m({Component:u,name:"file",accept:"text/*",onchange:d,...v})},gr=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:r,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:i,div:c,span:l}=n.tags,m=n.state("No file selected"),d=Je(e),u=x=>{const g=x.target.files[0];g?m.val=g.name:m.val="No file selected"},v=({disabled:x})=>c({class:$(o`
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
            `)},r({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>i(d({Component:v,name:"file",accept:"text/*",onchange:u}),c("File selected: ",m))},fr=`import classNames from "@grucloud/bau-css/classNames";
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
`,vr={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:fr,createComponent:gr}],gridItem:hr},xr=e=>{const t=Y(e);return()=>t(vr)},wr=e=>{const t=_e(e);return n=>t({name:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,id:`myinput-gallery-${n.color}-${n.variant}-${n.size}`,placeholder:"Enter text",...n})},yr=e=>{const{bau:t}=e,{section:n}=t.tags,o=_e(e);return()=>n(o({id:"my-input",name:"my-input",placeholder:"Enter Text"}))},Er=`import input from "@grucloud/bau-ui/input";
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
`,Cr={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Er,createComponent:yr}],gridItem:wr},Sr=e=>{const t=Y(e);return()=>t(Cr)};function Qe(e,t){const{bau:n,css:o}=e,{dialog:a}=n.tags,s=o`
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
  `;return function(...c){let[{color:l="neutral",variant:m="outline",size:d="md",...u},...v]=J(c);return a({class:$("modal",s,l,m,d,t==null?void 0:t.class,u==null?void 0:u.class)},...v)}}const kr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:r,p:s}=t.tags,i=Q(e),c=Qe(e),l=()=>o(Array(10).fill("").map((d,u)=>s(u+1,". Some text here"))),m=d=>{const u=c({id:"my-dialog",...d},a("Header"),l(),r(i({variant:"outline",color:d.color,onclick:()=>{u.close()}},"Cancel"),i({variant:"solid",color:d.color,onclick:()=>{u.close()}},"OK")));return u};return d=>{const u=m(d);return n(i({...d,onclick:()=>{u.showModal()}},"OPEN MODAL"),u)}},Tr=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:r,p:s}=t.tags,i="neutral",c=Q(e),l=Qe(e),m=()=>o(Array(10).fill("").map((u,v)=>s(v+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),m(),r(c({variant:"outline",color:i,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:i,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},Ar=`import modal from "@grucloud/bau-ui/modal";
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
`,Mr={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Ar,createComponent:Tr}],gridItem:kr},Dr=e=>{const t=Y(e);return()=>t(Mr)},Ir=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:r}=t.tags,s=Q(e),i=Ze(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),r("My Content")),m=c(),d=i({id:"my-popover-left",triggerEl:m,contentEl:l()});return()=>n(o(m,d))},$r=`import popover from "@grucloud/bau-ui/popover";
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
`,Nr={title:"Popover",package:"popover",description:"The popover component display a dialog next to a composant.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:$r,createComponent:Ir}]},_r=e=>{const t=Y(e);return()=>t(Nr)},Br=()=>oe.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function et(e,t){const{bau:n,css:o}=e,{div:a,li:r}=n.tags,s=Q(e),i=Ze(e),c=xe(e),l=o`
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Br()}
  `,m=n.state(""),d=n.state(!1),u=n.state(0);return function(...x){let[{color:g="neutral",variant:h="outline",size:S="md",id:E,label:T,Option:D,options:B,getOptionLabel:P=({label:b})=>b,...N},...O]=J(x);const _=()=>{p.openDialog(),p.focus(),d.val=!0},G=()=>{p.closeDialog(),d.val=!1},Z=()=>{d.val=!1},U=b=>{d.val?G():_()},X=({option:b,index:w})=>I=>{m.val=P(b),u.val=w,G()},V=b=>{switch(b.preventDefault(),b.key){case"Escape":G();break;case"ArrowDown":u.val<B.length-1?u.val++:u.val=0;break;case"ArrowUp":u.val<=0?u.val=B.length-1:u.val--;break;case"Enter":d.val?(m.val=P(B[u.val]),G()):_();break}},f=()=>c({tabindex:"0",class:$(g,h)},B.map((b,w)=>r({class:()=>$(u.val==w&&"active"),onclick:X({option:b,index:w})},D(b)))),C=s({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":d,"aria-label":T,onclick:U,color:g,variant:h,size:S},()=>!m.val&&T,m),p=i({id:E,triggerEl:C,contentEl:f(),onClose:Z});return a({...N,class:$("select",g,S,l,t==null?void 0:t.class,N==null?void 0:N.class),onkeydown:V},C,p)}}const Or=e=>{const{bau:t,css:n}=e,{div:o,span:a}=t.tags,r=et(e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],i=c=>o({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},a(c.label),a(c.code));return c=>r({...c,options:s,Option:i,getOptionLabel:({label:l})=>l,label:"Select a country..."})},Rr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:r}=t.tags,s=et(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},r(l.label),r(l.code));return()=>o(s({options:i,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Pr=`import select from "@grucloud/bau-ui/select";
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
`,Lr={title:"Modal",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Default",description:"A simple select.",code:Pr,createComponent:Rr}],gridItem:Or},jr=e=>{const t=Y(e);return()=>t(Lr)};function we(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>oe.map(i=>`
&.slider.${i} {
  accent-color: var(--color-${i});
}
`).join(`
`))()};
  `;return function(...c){let[{color:l="neutral",variant:m="outline",size:d,...u},...v]=J(c);return a({...u,type:"range",class:$("slider",l,m,d,s,t==null?void 0:t.class,u.class)},...v)}}const zr=e=>{const{bau:t}=e,n=t.state(0),o=r=>{n.val=r==null?void 0:r.target.value},a=we(e);return r=>a({...r,oninput:o})},Hr=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:r}=t.tags,s=t.state(0),i=l=>{s.val=l==null?void 0:l.target.value},c=we(e);return()=>n(o(a("Slider with step, min and max",r,c({oninput:i,name:"slider-simple",step:20,min:-100,max:100}))))},Gr=`import slider from "@grucloud/bau-ui/slider";
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
`,Ur=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),m=u=>{l.val=u==null?void 0:u.target.value},d=we(e);return()=>o(a(r({for:"temp"},"Choose a comfortable temperature"),i,d({oninput:m,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(u=>c({value:Number(u),label:u})))))},Fr=`import slider from "@grucloud/bau-ui/slider";
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
`,Wr=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r,datalist:s,br:i,option:c}=t.tags,l=t.state(0),m=u=>{l.val=u==null?void 0:u.target.value},d=we(e);return()=>o(a({class:n`
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
`,Xr={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Gr,createComponent:Hr},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:Fr,createComponent:Ur},{title:"Vertical Mark",description:"A vertical slider with marks.",code:Vr,createComponent:Wr}],gridItem:zr},Zr=e=>{const t=Y(e);return()=>t(Xr)},vt={sm:16,md:32,lg:64};function Oe(e,t={}){const{bau:n,css:o}=e,{svg:a,animate:r,animateTransform:s,rect:i}=n.tagsNS("http://www.w3.org/2000/svg");return function({size:l="md",color:m="color-base",variant:d="outline",visibility:u=!0,...v}={}){return a({class:$(o`
            visibility: ${u?"visible":"hidden"};
            color: var(--color-${m});
          `,t.class,v.class),version:"1.1",id:"L6",x:"0px",y:"0px",width:vt[l],height:vt[l],viewBox:"0 0 100 100",enableBackground:"new 0 0 100 100"},i({fill:"none",stroke:"currentColor",strokeWidth:"4",x:"25",y:"25",width:"50",height:"50"},s({attributeName:"transform",dur:"0.4s",from:"0 50 50",to:"180 50 50",type:"rotate",id:"strokeBox",attributeType:"XML",begin:"rectBox.end"})),i({x:"27",y:"27",fill:"currentColor",width:"46",height:"50"},r({attributeName:"height",dur:"1.3s",attributeType:"XML",from:"50",to:"0",id:"rectBox",fill:"freeze",begin:"0s;strokeBox.end"})))}}const Kr=e=>{const t=Oe(e);return n=>t({...n})},Yr=e=>{const{bau:t}=e,{section:n}=t.tags,o=Oe(e);return()=>n(o({}))},qr=`import spinner from "@grucloud/bau-ui/spinner";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Spinner = spinner(context);

  return () => section(Spinner({}));
};
`,Jr={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:qr,createComponent:Yr}],gridItem:Kr},Qr=e=>{const t=Y(e);return()=>t(Jr)},es=()=>oe.map(e=>`
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
`);function tt(e,t){const{bau:n,css:o}=e,{input:a}=n.tags,r=o`
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
    ${es()}
  `;return function(...i){let[{color:c="neutral",variant:l="plain",size:m="md",...d},...u]=J(i);return a({...d,class:$("switch",r,c,l,m,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...u)}}const ts=e=>{const{bau:t,css:n}=e,{form:o,label:a}=t.tags,r=tt(e);return s=>o({class:n`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",r({...s,id:`my-switch-example-off-${s.color}-${s.variant}`})),a("on ",r({...s,id:`my-switch-example-on-${s.color}-${s.variant}`,checked:!0})))},ns=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:r}=t.tags,s=tt(e);return()=>o(a(r({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},os=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,as={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:os,createComponent:ns}],gridItem:ts},rs=e=>{const t=Y(e);return()=>t(as)},ss=()=>oe.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function be(e,t){const{bau:n,css:o}=e,{tabDefs:a}=t,{div:r,ul:s,li:i}=n.tags,c=n.state(a),l=n.state(a[0]),m=u=>c.val.find(v=>v.name==u),d={base:o`
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
      ${ss()}
    `};return function(...v){let[{color:x,variant:g="plain",size:h,...S},...E]=J(v);const T=B=>{const{Header:P,disabled:N,name:O}=B;return i({class:()=>$(l.val.name==O&&"active",N&&"disabled"),onclick:_=>_.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},P(B))},D=r({class:$("tabs",d.base,g,h,x,t==null?void 0:t.class,S.class)},n.loop(c,s(),T),()=>l.val.Content?l.val.Content({}):"");return D.addEventListener("tab.select",B=>{var O,_;const{tabName:P}=B.detail,N=m(P);N&&((O=l.val.exit)==null||O.call(),l.val=N,(_=N.enter)==null||_.call())},!1),D.addEventListener("tab.add",B=>{var N;const{tab:P}=B.detail;(N=P.enter)==null||N.call(),c.val.push(P)},!1),D.addEventListener("tab.remove",B=>{var N;const P=c.val.findIndex(O=>O.name==B.detail.tabName);P>0&&((N=c.val[P].exit)==null||N.call(),c.val.splice(P,1))},!1),D}}const is=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return s=>r(s)},cs=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]});return()=>r({variant:"outline",color:"neutral"})},ls=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,us=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,r=be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>r({variant:"outline",color:"success"})},ds=`import tabs from "@grucloud/bau-ui/tabs";
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
`,en=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},ps=e=>{const{css:t}=e,n=be(e,{tabDefs:en(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},ms=`import tabs from "@grucloud/bau-ui/tabs";
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
`,bs=e=>{const{css:t}=e,n=en(e),o=be(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},hs=`import tabs from "@grucloud/bau-ui/tabs";
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
`,gs={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:ls,createComponent:cs},{title:"Extended Tabs",description:"An extended tabs.",code:ds,createComponent:us},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:ms,createComponent:ps},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:hs,createComponent:bs}],gridItem:is},fs=e=>{const t=Y(e);return()=>t(gs)};function ye(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:r}=n.tags;a`
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
  `;return function(...c){let[{...l},...m]=J(c);return r({...l,class:$("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...m)}}const vs=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags;function d(h,S,E,T,D){return{name:h,calories:S,fat:E,carbs:T,protein:D}}const u=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],v=({name:h,calories:S})=>s(r(h),r({class:n`
            text-align: right;
          `},S)),x=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=ye(e,{class:n`
      max-width: 650px;
    `});return()=>o(g(i(m("Basic Table"),x(),l(u.map(v)))))},xs=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function he(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const ws=[he("Frozen yoghurt",159,6,24,4),he("Ice cream sandwich",237,9,37,4.3),he("Eclair",262,16,24,6),he("Cupcake",305,3.7,67,4.3),he("Gingerbread",356,16,49,3.9)],ys=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags,d=({name:x,calories:g})=>s(r(x),r({class:n`
            text-align: right;
          `},g)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=ye(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(v(i(m("Table Dense"),u(),l(ws.map(d)))))},Es=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ge(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Cs=[ge("Frozen yoghurt",159,6,24,4),ge("Ice cream sandwich",237,9,37,4.3),ge("Eclair",262,16,24,6),ge("Cupcake",305,3.7,67,4.3),ge("Gingerbread",356,16,49,3.9)],Ss=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:r,tr:s,table:i,thead:c,tbody:l,caption:m}=t.tags,d=({name:x,calories:g})=>s(r(x),r({class:n`
            text-align: right;
          `},g)),u=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),v=ye(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(v(i(m("Table Zebra"),u(),l(Cs.map(d)))))},ks=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Ts={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:xs,createComponent:vs},{title:"Dense",description:"A dense table.",code:Es,createComponent:ys},{title:"Zebra",description:"A zebra table.",code:ks,createComponent:Ss}]},As=e=>{const t=Y(e);return()=>t(Ts)};function tn(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,r=Be(e),s=Q(e),i=Oe(e),c=o`
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
  `,l=({label:x,icon:g,...h})=>s({"aria-label":x,title:x,...h},g),m=({count:x,totalCount:g,page:h,rowsPerPage:S})=>a({class:"pages-numbers"},Number(h-1)*Number(S)+(x>0?1:0),"-",Math.min(h*S,g)," of ",g),d=({count:x,page:g,rowsPerPage:h})=>a({class:"pages-numbers"},(g-1)*h+(x>0?1:0),"-",g*h),u=x=>x<=1,v=(x,g,h)=>x>=Math.ceil(g/h);return function(...g){let[{count:h=0,totalCount:S=0,page:E=1,rowsPerPage:T=50,onPageChange:D,isLoading:B=!1,disableFirst:P=()=>u(E),disablePrevious:N=()=>u(E),disableNext:O=()=>v(E,S,T),disableLast:_=()=>v(E,S,T),...G},...Z]=J(g);const U=Math.max(0,Math.ceil(S/T)),X=D({page:1}),V=D({page:E-1}),f=D({page:E+1}),C=D({page:U}),p=[{label:"First",icon:"⟪",onclick:X,disabled:P()},{label:"Previous",icon:"⟨",onclick:V,disabled:N()},{label:"Next",icon:"⟩",onclick:f,disabled:O()},{label:"Last",icon:"⟫",onclick:C,disabled:_()}];return a({...G,class:$("table-pagination",c,B&&"disabled",t==null?void 0:t.class,G==null?void 0:G.class)},i({class:"spinner",visibility:B,size:"md"}),S>0?m({count:h,totalCount:S,page:E,maxPages:U,rowsPerPage:T}):d({count:h,page:E,maxPages:U,rowsPerPage:T}),r({variant:"outline",color:"neutral"},p.map(b=>l({...b,variant:"outline",color:"neutral"}))))}}const Ms=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Ds=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:s,thead:i,tbody:c}=t.tags,l=Ms(45),m=({name:E,email:T})=>r(a(E),a(T)),d=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),u=tn(e),v=ye(e,{class:n`
      max-width: 650px;
    `}),x=t.state(l),g=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),h=t.derive(()=>x.val.slice(g.val.page*g.val.rowsPerPage,(g.val.page+1)*g.val.rowsPerPage)),S=({page:E})=>T=>{g.val.page=E};return()=>v(s(d(),()=>c(h.val.map(m))),()=>u({...g.val,onPageChange:S}))},Is=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:r,table:s,thead:i,tbody:c,div:l}=t.tags,m=t.state(!1),d=t.state([]),u=t.state(""),v=t.derive(()=>d.val.length),x=t.state(1),g=t.state(10),h=t.derive(()=>d.val),S=_=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(_).toString()}`,E=({page:_})=>G=>{x.val=_,T(S({page:_,per_page:g.val}))};T(S({page:1,per_page:g.val}));async function T(_){try{m.val=!0;const G=await fetch(_,{});if(G.ok){const Z=await G.json();d.val=Z;return}throw G}catch(G){u.val=G.message}finally{m.val=!1}}const D=({name:_,description:G,stargazers_count:Z})=>r(a(_),a(G),a({class:n`
            text-align: right;
          `},Z)),B=()=>i(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),P=tn(e),N=ye(e,{class:n`
      min-width: 650px;
    `}),O=({message:_})=>l(_);return()=>N(()=>P({rowsPerPage:g.val,page:x.val,count:v.val,totalCount:-1,isLoading:m.val,onPageChange:E,disableNext:()=>!1}),s(B(),()=>u.val&&O({message:u.val}),()=>c(h.val.map(D))))},$s=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:r,h2:s,tr:i}=t.tags,c=Ds(e),l=Is(e),m=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(i("Table Pagination")),r("Asynchronous Pagination"),m(l()),r("Simple Pagination"),m(c()))};function Re(e,t){const{bau:n,css:o,window:a}=e,{div:r}=n.tags,s=o`
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
  `;return function(...c){let[{titleEl:l,side:m="bottom-start",color:d="neutral",variant:u="outline",size:v="md",...x},...g]=J(c);const h=r({class:$("container",...m.split("-"))},r({class:$("content",d,u,v),role:"tooltip"},l)),S=N=>`move-to-${N}`,E=(N,O,_)=>{if(N()){const G=S(O);h.classList.add(G),h.classList.add(O),h.classList.remove(_)}},T=(N,O)=>{const _=S(N);h.classList.contains(_)&&(h.classList.remove(_),h.classList.add(O),h.classList.remove(N))},D=N=>{const O=h.getBoundingClientRect();E(()=>O.x<0,"right","left"),E(()=>O.x+O.width>a.innerWidth,"left","right"),E(()=>O.y<0,"bottom","top"),E(()=>O.bottom>a.innerHeight,"top","bottom"),h.classList.add("visible")},B=N=>{h.classList.remove("visible"),T("right","left"),T("left","right"),T("bottom","top"),T("top","bottom")};return r({...x,class:$("tooltip",s,t==null?void 0:t.class,x==null?void 0:x.class),bauMounted:({element:N})=>{N.addEventListener("mouseover",D),N.addEventListener("mouseout",B)},bauUnmounted:({element:N})=>{N.removeEventListener("mouseover",D),N.removeEventListener("mouseout",B)}},...g,h)}}const Ns=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r}=t.tags,s=Q(e),i=Re(e),c=()=>o({class:n`
          font-size: larger;
        `},a("A ",r("tooltip")," can be any component"));return l=>i({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},_s=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,r=Q(e),s=Re(e),i=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:i()},r("tooltip"))},Bs=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Os=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:r}=t.tags,s=Q(e),i=Re(e),c=()=>o(a("A ",r("tooltip")," can be any component")),l=()=>[o({class:n`
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
        `},i({side:"bottom-start",titleEl:c()},s("bottom start")),i({side:"bottom-centered",titleEl:c()},s("bottom centered")),i({side:"bottom-end",titleEl:c()},s("bottom end")))];return()=>l()},Rs=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,Ps={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import createSwitch from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:Bs,createComponent:_s},{title:"Grid",description:"Various tooltip position",code:Rs,createComponent:Os}],gridItem:Ns},Ls=e=>{const t=Y(e);return()=>t(Ps)},js=e=>{const t=Me(e);return n=>t(n)},zs=e=>{const{bau:t}=e,{section:n}=t.tags,o=Me(e);return()=>n(o({}))},Hs=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Gs={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Hs,createComponent:zs}],gridItem:js},Us=e=>{const t=Y(e);return()=>t(Gs)},Fs=({css:e,createGlobalStyles:t})=>(t`
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
    `});function nn(e,t){const{bau:n,css:o,createGlobalStyles:a,window:r}=e,{renderMenuItem:s}=t,{ul:i,li:c,nav:l,div:m}=n.tags,d=Fs({css:o,createGlobalStyles:a}),u=({element:h,closeState:S})=>{h.scrollHeight!=0&&(S.val?v(h):x(h))};function v(h){h.style.height=h.scrollHeight+"px";const S=()=>{h.removeEventListener("transitionend",S)};h.addEventListener("transitionend",S),r.requestAnimationFrame(()=>{h.style.height="0px"})}function x(h){const S=()=>{h.removeEventListener("transitionend",S),h.style.height=null};h.addEventListener("transitionend",S),h.style.height=h.scrollHeight+"px"}const g=({depth:h=1,maxDepth:S,color:E,variant:T,size:D})=>B=>{const{children:P,expanded:N}=B,O=n.state(!N);return c({class:()=>$(P?O.val?d.collapsed:d.expanded:"")},m({class:o`
              cursor: pointer;
            `,onclick:_=>{P&&(O.val=!O.val)}},s(B.data)),P&&h<S&&i({class:$(E,D),bauMounted:({element:_})=>{O.val&&(_.style.height="0px")},"aria-expanded":({element:_})=>(u({element:_,closeState:O}),!O.val)},P.map(g({depth:h+1,maxDepth:S}))))};return function({tree:S,maxDepth:E=1/0,size:T="md",variant:D="plain",color:B="neutral",...P}){return l({class:$(d.nav,T,D,B,t==null?void 0:t.class,P.class)},S.children&&i(S.children.map(g({maxDepth:E,color:B,variant:D,size:T}))))}}const on=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=nn(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)});return s=>r({...s,tree:o})},Ws=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},r=nn(e,{renderMenuItem:({name:s,href:i})=>n({href:i},s)});return()=>r({tree:o})},Vs=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,Xs={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Vs,createComponent:Ws}],gridItem:on},Zs=e=>{const t=Y(e);return()=>t(Xs)};function Ks(e,t={}){const{bau:n,css:o}=e,{div:a,span:r,pre:s,h3:i,h4:c}=n.tags;return function(m,...d){return a("Login")}}const Ys=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:r,h2:s}=n.tags,i=Ks(e);return()=>o({id:"login"},s(t("Login Examples")),r("Basic"),a(i()))};function qs(e){const{tr:t,bau:n,css:o}=e,{div:a,article:r,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),Ys(e)()))}}const Js=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Qs=e=>{const{bau:t,css:n}=e,{span:o,li:a}=t.tags,r=xe(e),s=({code:i,label:c})=>a({class:n`
          display: flex;
          gap: 1rem;
        `},o(i),o(c));return i=>r({...i},Js.map(s))},ei=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ti=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:r}=t.tags,s=xe(e),i=({code:c,label:l})=>r({class:n`
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
`,oi={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ni,createComponent:ti}],gridItem:Qs},ai=e=>{const t=Y(e);return()=>t(oi)},ri=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:r,h1:s,span:i,p:c,ul:l,li:m,main:d,header:u,footer:v,label:x}=t.tags,{svg:g,use:h}=t.tagsNS("http://www.w3.org/2000/svg"),S=Gt(e),E=Q(e),T=Be(e),D=Ke(e),B=qe(e),P=Ye(e),N={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#m1"},children:[{data:{name:"Sub Menu 1",href:"#menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu2"}}]},O=De(e,{base:o.base+"/components"}),_=({disabled:y})=>r({class:$(n`
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
            `)},g({width:100,height:100,fill:"currentColor"},h({href:"uploadIcon.svg#Capa_1"})),i("Choose a file to upload")),G=Je(e),Z=_e(e),U=Qe(e),X=()=>d(Array(10).fill("").map((y,ee)=>c(ee+1,". Some text here"))),V=y=>{const ee=U({id:"my-dialog",...y},u("Header"),X(),v(E({...y,variant:"outline",onclick:()=>{ee.close()}},"Cancel"),E({...y,variant:"solid",onclick:()=>{ee.close()}},"OK")));return ee},f=et(e),C=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],p=y=>r({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(y.label),i(y.code)),b=we(e),w=Oe(e),I=tt(e),H=be(e,{tabDefs:[{name:"Tab1",Header:()=>r("TAB"),Content:()=>r(c("My Tab 1 Content"))},{name:"Tab2",Header:()=>r("TAB 2"),Content:()=>r(c("My tab 2 Content"))},{name:"Tab Disabled",disabled:!0,Header:()=>r("Tab Disabled"),Content:()=>r(c("My tab Disabled"))}]}),R=Me(e),j=()=>i("My tooltip"),L=Re(e),W=[{name:"Accordion",Item:Ut(e)},{name:"Alert",Item:Wt(e)},{name:"Autocomplete",Item:Kt(e)},{name:"Avatar",Item:Xt(e)},{name:"Badge",Item:qt(e)},{name:"Breadcrumbs",Item:Qt(e)},{name:"Button",Item:y=>E({...y},`${y.variant} ${y.color}`)},{name:"Button Group",Item:y=>T({...y},["ONE","TWO","THREE"].map(ee=>E(y,ee)))},{name:"Calendar",Item:y=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},x(`${y.color} ${y.variant}`,D({...y})))},{name:"Checkbox",Item:y=>x({class:n`
              display: flex;
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},`${y.color} ${y.variant}`,B({id:`myCheckbox-gallery-${y.color}-${y.variant}`,name:`myCheckbox-gallery-${y.color}-${y.variant}`,...y}))},{name:"Chip",Item:y=>P({...y},`Chip ${y.color}`)},{name:"DrillDown Menu",Item:y=>O({tree:N,...y})},{name:"File Input",Item:y=>G({Component:_,name:"file",accept:"text/*",onchange,...y})},{name:"Input",Item:y=>Z({name:"my-input",id:"my-input-with",placeholder:"Enter text",...y})},{name:"Modal",Item:y=>{const ee=V(y);return r(E({...y,onclick:()=>{ee.showModal()}},"OPEN MODAL"),ee)}},{name:"Select",Item:y=>r(f({...y,options:C,Option:p,getOptionLabel:({label:ee})=>ee,label:"Select a country..."}))},{name:"Slider",Item:y=>r({class:n`
              border: 1px dotted var(--color-emphasis-200);
              font-size: smaller;
              color: var(--color-content-secondary);
              padding: 0.2rem;
            `},x(`${y.color} ${y.variant}`,b({...y,id:`my-slider-${y.color}-${y.variant}`})))},{name:"Spinner",Item:y=>w(y)},{name:"Switch",Item:y=>r({class:n`
              & label {
                display: inline-flex;
                border: 1px dotted var(--color-emphasis-200);
                font-size: smaller;
                align-items: center;
                color: var(--color-content-secondary);
                padding: 0.2rem;
              }
            `},x("off",I({...y,id:`mySwitch-off-${y.color}-${y.variant}`})),x("on",I({...y,id:`mySwitch-on-${y.color}-${y.variant}`,checked:!0})))},{name:"Tabs",Item:y=>H(y)},{name:"Theme Switch",Item:y=>R(y)},{name:"Tooltip",Item:y=>L({titleEl:j(),...y},E(y,`${y.color} ${y.variant}`))},{name:"Tree View",Item:on(e)}];return()=>a(s("Bau Component Gallery"),c("This page displays the components with various colors and variants."),l({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},W.map(({name:y})=>m(E({color:"primary",variant:"solid",href:`#${y}`},y)))),W.map(y=>r({id:y.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},S(y))))},si=({context:e})=>[{path:"",action:t=>({title:"Bau UI",component:Un(e)})},{path:"components",action:()=>({title:"Component",component:ri(e)}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Jo(e)})},{path:"alert",action:()=>({title:"Alert",component:ia(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:pa(e)})},{path:"animate",action:()=>({title:"Animate",component:ba(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Sa(e)})},{path:"avatar",action:()=>({title:"Avatar",component:va(e)})},{path:"badge",action:()=>({title:"Badge",component:Ma(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Na(e)})},{path:"button",action:()=>({title:"Button",component:Pa(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Ua(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Za(e)})},{path:"chip",action:()=>({title:"Chip",component:Qa(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ar(e)})},{path:"drawer",action:()=>({title:"Drawer",component:lr(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:br(e)})},{path:"fileInput",action:()=>({title:"File Input",component:xr(e)})},{path:"input",action:()=>({title:"Input",component:Sr(e)})},{path:"list",action:()=>({title:"List",component:ai(e)})},{path:"modal",action:()=>({title:"Modal",component:Dr(e)})},{path:"popover",action:()=>({title:"Popover",component:_r(e)})},{path:"select",action:()=>({title:"Select",component:jr(e)})},{path:"slider",action:()=>({title:"Slider",component:Zr(e)})},{path:"spinner",action:()=>({title:"Spinner",component:Qr(e)})},{path:"switch",action:()=>({title:"Switch",component:rs(e)})},{path:"table",action:()=>({title:"Table",component:As(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:$s(e)})},{path:"tabs",action:()=>({title:"Tabs",component:fs(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:Ls(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Us(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Zs(e)})}]},{path:"pages",action:t=>({title:"Pages",component:qs(e)})}],ii=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),ci=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:r}=e,s=a.state(),i=t({componentState:s});return document.getElementById("app").replaceChildren(i),({router:l})=>{const m=o.location.pathname.replace(n,""),{title:d,component:u,Layout:v=t}=l.resolve({pathname:m});r.pathname.val=m,s.val=u,document.title=`${d}`}},li=e=>{const{createGlobalStyles:t}=e;Cn(e,{colorPalette:[["neutral",{h:"0",s:"0%",l:"20%"}],["primary",{h:"230",s:"48%",l:"20%"}],["secondary",{h:"338",s:"100%",l:"20%"}],["success",{h:"120",s:"100%",l:"20%"}],["info",{h:"194",s:"80%",l:"20%"}],["warning",{h:"43",s:"100%",l:"20%"}],["danger",{h:"358",s:"95%",l:"20%"}]]}),t`
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
  ${Et({dark:!0})}
}
  `};Sn();const nt={title:"Bau",base:"/bau/bau-ui"},ie=Nn({config:nt}),{bau:xt}=ie;ie.states={pathname:xt.state(window.location.pathname.replace(nt.base,"")),drawerOpen:xt.state(!0)};li(ie);ui(ie);hn({routes:si({context:ie}),onLocationChange:ci({context:ie,LayoutDefault:zn(ie),config:nt}),notFoundRoute:ii(ie)});
