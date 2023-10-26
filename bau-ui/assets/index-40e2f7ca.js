(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Qn=(e,t)=>({...e,paths:[...t,e.path]}),Ot=({paths:e=[],routes:t})=>t.flatMap(({children:n,...o})=>{const a=Qn(o,e);return n?[a,...Ot({paths:[...e,o.path],routes:n})]:a}),eo=({paths:e})=>{const t=e.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${t}$`)},to=({routes:e=[],notFoundRoute:t})=>{const n=Ot({routes:e}).map(o=>({...o,regex:eo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:i})=>i.test(o));return a?a.action({match:o.match(a.regex)}):t}}};function no({routes:e,notFoundRoute:t,onLocationChange:n}){let o=window.location;const a=s=>o=s,i=to({routes:e,notFoundRoute:t});return window.addEventListener("popstate",s=>{o.pathname!=s.target.location.pathname&&n({router:i}),a(s.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(s,r,c)=>{s.apply(r,c),n({router:i}),a(window.location)}}),document.addEventListener("click",s=>{const{target:r}=s,c=r.getAttribute("href");r.tagName==="A"&&c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(history.pushState({},null,c),window.scrollTo({top:0,left:0}),s.preventDefault())}),n({router:i}),i}const ot=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],oo=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],ao=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],kt=e=>`var(--color-${e})`,ro=e=>`var(--color-${e}-lightest)`,so=()=>ot.map(([e])=>`
.outline.${e} {
  border: 1px solid ${kt(e)};
  color: var(--font-color-base)
}
.soft.${e} {
  background-color: ${ro(e)};
}
.solid.${e} {
  background-color: ${kt(e)};
}
`).join(`
`),io=()=>ot.map(([e])=>[`--color-${e}-s: var(--color-${e}-dark-s);`]).join(`
`),co=e=>100-e*10,lo=()=>new Array(10).fill("").map((e,t)=>`--color-gray-${t*100}: hsl(0, 0%, ${co(t)}%);`).join(`
`),Et=({dark:e})=>new Array(10).fill("").map((t,n)=>`--color-emphasis-${n*100}: var(--color-gray-${e?1e3-n*100:n*100});`).join(`
`),uo=([e,{h:t,s:n,l:o}])=>[`--color-${e}-h: ${t};`,`--color-${e}-l: ${o};`,`--color-${e}-base-s: ${n};`,`--color-${e}-s: var(--color-${e}-base-s);`,`--color-${e}-dark-s: calc(${n} - 25%);`,`--color-${e}-hsl: var(--color-${e}-h), var(--color-${e}-s), var(--color-${e}-l);`,`--color-${e}: hsl(var(--color-${e}-hsl));`,...oo.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),...ao.map(([a,i])=>`--color-${e}-${a}: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * ${i}));`),`--color-${e}-contrast-background: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) / var(--contrast-background-value)));`,`--color-${e}-contrast-foreground: hsl(var(--color-${e}-h), var(--color-${e}-s), calc(var(--color-${e}-l) * var(--contrast-foreground-value)));`].join(`
`);function po({createGlobalStyles:e},{colorPalette:t=ot}={}){e`
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${t.map(([n,o])=>uo([n,o])).join(`
`)}
      ${lo()}
      ${Et({})}
      ${so()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);

      --color-content-secondary: hsl(0, 0%, 30%);
      --background-color: var(--color-white);
      --global-border-width: 1px;
      --global-radius: 0.2rem;
      --font-color-base: var(--color-content);
      --font-color-disabled: var(--color-emphasis-600);
      --font-color-inverse: var(--color-content-inverse);
      --font-color-secondary: var(--color-content-secondary);
      --font-color-inverse-secondary: hsl(0, 0%, 75%);
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
        font-size: 1rem;
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
      ${io()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.7);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Et({dark:!0})};
    }
    body {
      margin: 0;
    }
  `}function mo(){const e=document.getElementById("loading");e&&e.classList.add("m-fadeOut")}let at=e=>Object.prototype.toString.call(e??0).slice(8,-1),go=e=>at(e)=="Object",Tt=e=>at(e)=="Function",et=e=>["Object","Array"].includes(at(e)),At=Object.getPrototypeOf,tt=e=>Se(e)?e.val:e,Se=e=>e==null?void 0:e.__isState,bo=["splice","push","pop","shift","unshift","sort","reverse"],ze=(e,t)=>{const n=new Array(e.length);for(let o=0;o<e.length;o++)n[o]=t(e[o],o);return n};const G=e=>!Se(e[0])&&go(e[0])?e:[{},...e];function ho(e){let t=(e==null?void 0:e.window)??window,{document:n}=t,o,a=new Set,i=new Set,s=!1,r,c=y=>n.createElement(y),l=(y,g,b)=>{let C=r;r=g;let k=y(b);return r=C,k},u=()=>{o||(o=t.requestAnimationFrame(()=>{a.forEach(y=>{y.bindings=y.bindings.filter(g=>{var b;return(b=g.element)==null?void 0:b.isConnected}),!y.bindings.length&&!y.computed&&a.delete(y)}),o=void 0}))},d=(y,g,b,C,k,L)=>{var B;if(s){i.add(y);return}for(let F of y.bindings){let{deps:R,element:z,renderInferred:Z,render:ne,renderItem:ee}=F;if(ee&&g)(B=h(z,C,(...ae)=>w(ee(...ae)),b,k,L)[g])==null||B.call();else{let ae=Z?Z({element:z}):ne({element:z,renderItem:ee})(...R.map(tt));ae!==z&&z.replaceWith(F.element=w(ae))}}S(y),u()},p=(y,g,b=[])=>({get(C,k,L){var B;if(r==null||r.add(y),k==="_isProxy")return!0;if(!((B=C[k])!=null&&B._isProxy)&&!Se(C[k])&&et(C[k]))C[k]=new Proxy(C[k],p(y,g,[...b,k]));else if(bo.includes(k)){let F=C[k];return(...R)=>{let z=F.apply(C,R);return d(y,k,z,R,g,b),z}}return Reflect.get(C,k,L)},set(C,k,L,B){let F=Reflect.set(C,k,L,B);return d(y,"setItem",F,{prop:k,value:L},g,[...b,k]),F}}),m=(y,g)=>new Proxy(g,p(y,g)),h=(y,g,b,C,k,L)=>{let B=()=>y.replaceChildren(...ze(C,b)),F=R=>y[R]&&y.removeChild(y[R]);return{assign:B,sort:B,reverse:B,setItem:()=>{var z;let R=L[0];(z=y.children[R])==null||z.replaceWith(b(k[R],R))},push:()=>y.append(...ze(g,(R,z)=>b(R,k.length+z))),unshift:()=>y.prepend(...ze(g,b)),pop:()=>F("lastChild"),shift:()=>F("firstChild"),splice:()=>{let[R,z,...Z]=g;const{length:ne}=y.children;for(let ee=R>=0?Math.min(R+z-1,ne-1):ne-1;ee>=(R>=0?R:ne+R);ee--)y.children[ee].remove();if(Z.length){let ee=Z.forEach((ae,pe)=>b(ae,R+pe));y.children[R]?y.children[R].after(...ee):y.append(...ee)}}}},f=y=>({oldVal:y,bindings:[],listeners:[],__isState:!0,get val(){let g=this;return r==null||r.add(g),g.valProxy??(g.valProxy=et(y)?m(g,y):y,g.valProxy)},set val(g){let b=this,C=b.val;et(g)?(b.valProxy=m(b,g),d(b,"assign",g)):g!==C&&(b.valProxy=g,d(b)),b.oldVal=C}}),w=y=>{if(y==null||y===!1){const g=c("span");return g.style.display="none",g}else return y.nodeType?y:n.createTextNode(y)},x=(y,g)=>{let b=new Set;return g.val=l(y,b),b},v=y=>{let g=f(),b=x(y,g);g.computed=!0;for(let C of b)C.listeners.push({computed:y,deps:b,state:g});return g},S=y=>{for(let g of[...y.listeners])x(g.computed,g.state)},E=(y,...g)=>{if(g.length){let b=[];for(let C of g.flat(1/0))C!=null&&b.push(Se(C)?V({deps:[C],render:()=>k=>k}):Tt(C)?Q({renderInferred:C}):w(C));y.append(...b)}},A={},M=(y,g)=>y&&(Object.getOwnPropertyDescriptor(y,g)??M(At(y),g)),T=(y,g,b)=>{var C;return A[y+","+g]??(A[y+","+g]=((C=M(b,g))==null?void 0:C.set)??0)},I=(y,g)=>new t.MutationObserver((b,C)=>{b.filter(k=>k.removedNodes).forEach(k=>[...k.removedNodes].find(L=>L===y&&(g({element:y}),C.disconnect(),!0)))}).observe(y.parentNode,{childList:!0}),D=(y,g)=>new t.MutationObserver((b,C)=>b.forEach(k=>g({record:k,element:y}))).observe(y,{childList:!0}),O=y=>new Proxy(function(b,...C){var F;let[k,...L]=G(C),B=y?n.createElementNS(y,b):c(b);for(let[R,z]of Object.entries(k)){if(R.startsWith("bau"))continue;let Z=T(b,R,At(B))?ne=>B[R]=ne:ne=>B.setAttribute(R,ne);z==null||(Se(z)?V({deps:[z],render:()=>()=>(Z(z.val),B)}):Tt(z)&&(!R.startsWith("on")||z.isDerived)?Q({renderInferred:()=>(Z(z({element:B})),B)}):z.renderProp?V({deps:z.deps,render:()=>()=>(Z(z.renderProp({element:B})(...z.deps.map(tt))),B)}):Z(z))}return k.bauChildMutated&&D(B,k.bauChildMutated),E(B,...L),(F=k.bauCreated)==null||F.call(k,{element:B}),k.bauMounted&&t.requestAnimationFrame(()=>k.bauMounted({element:B})),k.bauUnmounted&&t.requestAnimationFrame(()=>I(B,k.bauUnmounted)),B},{get:(g,b)=>g.bind(void 0,b)}),U=(y,g,b)=>{y.element=w(b);for(let C of g)Se(C)&&(a.add(C),C.bindings.push(y));return y.element},Q=({renderInferred:y,element:g})=>{let b=new Set,C=l(y,b,{element:g});return U({renderInferred:y},b,C)},V=({deps:y,element:g,render:b,renderItem:C})=>U({deps:y,render:b,renderItem:C},y,b({element:g,renderItem:C})(...y.map(tt))),X=(y,g,b)=>V({deps:[y],render:({renderItem:C})=>k=>(g.append(...ze(k,C)),g),renderItem:b}),_=y=>{s=!0,y(),s=!1,i.forEach(d),i.clear()};return{tags:O(),tagsNS:O,state:f,bind:V,loop:X,derive:v,stateSet:a,batch:_}}const fo=e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return"bau"+n},vo=(e,t,n,o)=>{const a=e.createElement("style");a.id=n,a.append(o),(t??e.head).append(a)},xo=(e,t)=>e.reduce((n,o,a)=>n+o+(t[a]??""),"");function wo(e){let{document:t}=(e==null?void 0:e.window)??window;const n=o=>(a,...i)=>{const s=xo(a,i),r=fo(s);return!t.getElementById(r)&&vo(t,e==null?void 0:e.target,r,o(r,s)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function yo(e){const t=ho(),n=wo();return po(n),{bau:t,...n,tr:o=>o,window,...e}}function N(...e){return e.filter(t=>t).join(" ")}function Ge(e,t={}){const{bau:n}=e,{div:o}=n.tags,a=()=>{};return function({animationHide:s=a,animationShow:r=a,...c},l){return o({class:N("animate",t==null?void 0:t.class,c.class),bauChildMutated:({record:u,element:d})=>{[...u.removedNodes].forEach(p=>{if(!s()||p.getAttribute("cloned"))return;const m=p.cloneNode(!0);m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=p.getAttribute("width"),m.style.height=p.getAttribute("height"),m.style.position="absolute",m.style.animation=s(),u.target.appendChild(m),m.addEventListener("animationend",()=>{var h;return(h=m.parentNode)==null?void 0:h.removeChild(m)})}),[...u.addedNodes].forEach(p=>{if(p.getAttribute("cloned"))return;d.style.position="relative";const m=p.getBoundingClientRect();if(p.setAttribute("width",m.width+"px"),p.setAttribute("height",m.height+"px"),r()){p.style.animation=r();const h=()=>{p.removeEventListener("animationend",h),p.style.animation=""};p.addEventListener("animationend",h)}})},...c},l)}}const te=["neutral","primary","success","danger","warning"],So=["plain","outline","solid"],Co=["sm","md","lg"],ko=()=>te.map(e=>`
&.button.plain.${e} {
  &:focus {
    outline: 4px auto var(--color-${e});
    border: 1px solid var(--color-neutral);
  };
}
&.button.outline.${e} {
  &:focus {
    outline: 4px auto var(--color-${e});
  };
}
&.button.solid.${e} {
  &:focus {
    outline: 4px auto var(--color-${e}-lightest);
  };
}
`).join(`
`);function K(e,t={}){const{bau:n,css:o}=e,a=o`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
    cursor: pointer;
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
    &.button:disabled {
      filter: grayscale(1) brightness(var(--brightness-hover));
      cursor: not-allowed;
      pointer-events: none;
    }
    &.sm {
      padding: 0.3rem;
    }
    &.md {
      padding: 0.2rem 0.8rem;
    }
    &.lg {
      padding: 0.4rem 2rem;
    }
    & i {
      font-style: normal;
    }
    ${ko()}
  `;return function(...s){let[{size:r=t.size??"md",variant:c=t.variant??"none",color:l=t.color??"none",href:u,...d},...p]=G(s);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:N("button",t.class,c,r,l,a,d.class),href:u},p)}}const Eo="light",To=()=>te.map(e=>`
&.theme-switch.outline.${e} {
  color: var(--color-${e})
}
`).join(`
`);function rt(e,t={}){const{bau:n,css:o,window:a}=e,{input:i}=n.tags,s=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?s(c):a.matchMedia("(prefers-color-scheme: dark)").matches?s("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?s("light"):s(Eo);const l=o`
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
    ${To()}
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",...f},...w]=G(d);return i({required:"required",title:"Switch Theme",...f,class:N("theme-switch",h,m,p,l,t==null?void 0:t.class,f.class),type:"checkbox",checked:r()=="dark",onclick:x=>{s(x.target.checked?"dark":"light")}},...w)}}function Ao(e){const{tr:t,bau:n,css:o,config:a,states:i}=e,{i:s,header:r,h1:c,div:l,a:u,img:d,b:p,ul:m,li:h}=n.tags,{svg:f,path:w}=n.tagsNS("http://www.w3.org/2000/svg"),x=i.drawerOpen,v=K(e,{class:o`
      background: transparent;
    `}),S=rt(e),E=()=>s(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},w({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},E()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(t("Bau UI")))),M=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},S(),v({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},A(),M())}}function Io({tr:e,bau:t,css:n}){const{section:o,footer:a,span:i,a:s,ul:r,li:c,p:l,div:u,h1:d}=t.tags,p=({links:f,title:w})=>o({class:n`
          & ul {
            list-style: none;
            padding-left: 0;
          }
          & h1 {
            font-size: medium;
            color: var(--color-content-secondary);
          }
          & a {
            text-decoration: none;
            color: var(--color-content-secondary);
            &:hover {
              text-decoration: underline;
            }
          }
        `},d(w),r(f.map(({href:x,name:v})=>c(s({href:x},v))))),m=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],h=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 4rem;
          border-top: 1px solid var(--color-emphasis-200);
          color: var(--color-content-secondary);
        `},u({class:n`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `},p({title:"Bau UI",links:m}),p({title:"Bau Ecosystem",links:h})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},i("v0.50.0"),i("MIT license")))}}function ve(e,t={}){const{bau:n,css:o}=e,{ul:a}=n.tags,i=o`
    display: flex;
    flex-direction: column;
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
    & > li {
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=G(r);return a({...d,class:N("list",i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const _e="0.3s",zt=({parent:e,grandParent:t})=>n=>{const{children:o,...a}=n,i={...a};return i.children=o==null?void 0:o.map(zt({parent:n,grandParent:e})),e&&(e.parentTree=t),i.parentTree=e,i},_t=e=>t=>{var n;if(!e)return t;if(((n=t==null?void 0:t.data)==null?void 0:n.href)==e)return t.children?t:t.parentTree;if(t.children)for(let o=0;o<t.children.length;o++){const a=_t(e)(t.children[o]);if(a)return a}},Do=({keyframes:e})=>({hideToLeft:e`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
  `,hideToRight:e`
   from {
     transform: translateX(0%);
     opacity: 1;
   }
   to {
     transform: translateX(100%);
     opacity: 0;
   }
   `});function st(e,t={}){const{bau:n,css:o,window:a,config:i}=e,{base:s="",hashBased:r=!1}=t,c=`${i.base}${s}`,l=_=>{var y;return((y=_.parentTree.data)==null?void 0:y.href)??_.parentTree.children[0].data.href},u=({variant:_,color:y,size:g,currentTree:b,data:C})=>S(T({variant:_,color:y,size:g,href:`${c}${l(b)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),T({variant:_,color:y,size:g,href:`${c}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),d=({size:_,subTree:{data:{name:y,href:g},children:b=[]}})=>T({size:_,href:`${c}${g}`,"data-ischild":!b.length},y),p=({pathname:_,subTree:y})=>{var g;return _===((g=y==null?void 0:y.data)==null?void 0:g.href)},{renderHeader:m=u,renderMenuItem:h=d,isActive:f=p}=t,{li:w,nav:x,div:v,header:S,a:E}=n.tags,A=Ge(e),M=ve(e),T=K(e,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:I,hideToRight:D}=Do(e),O=o`
    font-weight: var(--font-weight-semibold);
    overflow: hidden;
    position: relative;
    & header {
      display: flex;
      align-items: center;
      font-weight: var(--font-weight-bold);
      & a {
        padding: 0.6rem;
        border-radius: 0;
        font-weight: 600;
      }
    }
    & a,
    & ul {
      border-width: 0 !important;
      box-shadow: none !important;
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
  `,U=({children:_,pathnameState:y,variant:g,color:b,size:C})=>M({class:N(g,b,C)},_.map(k=>w({class:()=>N(k.children&&"has-children",f({pathname:y.val,subTree:k})&&"active")},h({variant:g,color:b,size:C,subTree:k})))),Q=({variant:_,color:y,size:g,currentTree:b,pathnameState:C})=>{const{children:k,parentTree:L,data:B,renderList:F}=b;return v({class:N("drillDownMenu",_,y,g)},L&&m({variant:_,color:y,size:g,data:B,currentTree:b}),k&&F?F({renderListDefault:U,children:k,pathnameState:C,variant:_,color:y,size:g}):U({children:k,pathnameState:C,variant:_,color:y,size:g}))},V=({tree:_,pathname:y})=>{let g=zt({})({..._}),b=_t(y)(g);return b||(b=g),b},X=n.state(a.location.pathname.replace(c,""));return a.document.addEventListener("click",_=>{const{target:y}=_,g=y.getAttribute("href");if(y.tagName==="A"&&g&&!g.startsWith("http")&&!g.startsWith("#")){let b=g.replace(c,"");r||(b=b.replace(y.hash,"")),X.val=b}}),function(y){const{size:g=t.size??"md",variant:b=t.variant??"plain",color:C=t.color??"neutral",tree:k,...L}=y;let B,F=n.derive(()=>(B=V({tree:k,pathname:X.val}),B)),R=1;const z=ee=>{const{dataset:ae}=ee.target;ae.buttonback=="true"?R=-1:ae.ischild=="false"?R=1:ae.ischild=="true"&&(R=0)},Z=ee=>{switch(ee){case 1:return`${I} ${_e}`;case-1:return`${D} ${_e}`;default:return""}},ne=ee=>{switch(ee){case 1:return`${D} ${_e} reverse`;case-1:return`${I} ${_e} reverse`;default:return""}};return x({class:N(O,b,C,g,t==null?void 0:t.class,L.class),onclick:z},A({animationHide:()=>Z(R),animationShow:()=>ne(R)},n.bind({deps:[F],render:()=>()=>Q({variant:b,color:C,size:g,currentTree:B,pathnameState:X})})))}}const No=()=>te.map(e=>`
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
    outline: 4px auto var(--color-${e});
  };
}
&.input.solid.${e} {
  &:focus {
    outline: 4px auto var(--color-${e}-lightest);
  };
  &::placeholder {
    color: var(--font-color-inverse-secondary);
  }
  &:hover {
    background-color: var(--color-${e}-light);
  }
}
`).join(`
`);function xe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    &.input:disabled {
      filter: grayscale(100%);
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
    ${No()}
  `;return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r;return a({type:"text",...u,class:N("input",t.class,t.size??"md",l,c,i,u.class)})}}function it(e,t={}){const{bau:n,css:o,window:a}=e,i=xe(e,t);return function(r){const{variant:c=t.variant??"outline",color:l=t.color??"neutral",...u}=r,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,m=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return i({type:"search",...u,color:l,variant:c,class:N("inputSearch",t.class,m,u.class)})}}function Rt(e){const{tr:t,bau:n,css:o,config:a,states:i,window:s}=e,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags,m=it(e,{variant:"plain",color:"neutral",size:"sm"}),f={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:v,children:S,pathnameState:E,variant:A,color:M,size:T})=>{const I=n.state(""),D=n.derive(()=>I.val==""?S:S.filter(U=>U.data.name.match(new RegExp(`${I.val}`,"i")))),O=U=>{I.val=U.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},m({autocomplete:!1,name:"search",autofocus:!0,value:I,placeholder:`Search ${D.val.length} components`,size:22,oninput:O}),()=>v({children:D.val,pathnameState:E,variant:A,color:M,size:T}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let w=!1;const x=st(e);return function(){return r({bauMounted:({element:S})=>{s.innerWidth<=640&&(w=!0,i.drawerOpen.val=!1)},onclick:S=>{w&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(i.drawerOpen.val=!1)},style:()=>i.drawerOpen.val?"display:block;":"display:none;",class:N(o`
            grid-area: sidebar;
            position: sticky;
            top: calc(var(--header-height));
            align-self: start;
            overflow-y: scroll;
            height: calc(100vh - var(--header-height) - 1rem);
            border-right: 1px solid var(--color-emphasis-200);
            min-width: 200px;

            @media (max-width: 640px) {
              position: fixed;
              width: 100vw;
              z-index: 1;
              display: none;
            }
          `)},x({tree:f}))}}const Mo=e=>{const{bau:t,css:n,states:o,keyframes:a}=e,{div:i}=t.tags,s=Ge(e),r=Ao(e),c=Rt(e),l=Io(e),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:m}){return i({class:n`
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr auto;
          grid-template-areas:
            "header header"
            "sidebar main"
            "sidebar footer";
          min-height: 100vh;
          min-width: 100vw;
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "footer";
          }
        `},r(),c(),s({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>m.val),l())}};function Ue(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
    display: inline-block;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",onclick:d,...p},...m]=G(r);return a({...p,onclick:d,class:N("chip",t.class,c,l,u,d&&"clickable",i,p.class)},...m)}}function $o(e){const{bau:t,css:n,config:o}=e,{div:a,h1:i,h2:s,p:r}=t.tags;K(e);const c=n`
    padding: 0 1rem 1rem 1rem;
    & h1 {
      font-size: 56px;
      line-height: 2rem;
    }
    & h2 {
      font-size: 48px;
      line-height: 1.8rem;
    }
    & p {
      font-size: 24px;
      line-height: 1.8rem;
      color: var(--color-emphasis-900);
    }
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},i(u),s(d),r(p))}}function Bo(e){const{bau:t,css:n}=e,{div:o,h1:a,p:i}=t.tags,s=n`
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
      width: 25%;
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),i(l()));return function({featuresContent:l}){return o({class:s},l.map(r))}}function Po({tr:e,bau:t,css:n}){const{article:o,dl:a,dt:i,dd:s,div:r,aside:c,footer:l,a:u}=t.tags,d=({maxSize:p=151})=>({libName:m,size:h})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},i({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},m),s({class:n`
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
                  var(--color-success) ${h/p*100}%
                );
                justify-content: flex-end;
                width: ${h/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},h)));return function({data:m=[]}){return o({class:n`
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
          `},m.map(d({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Lo(e){const{bau:t,css:n,config:o}=e,{div:a,p:i,a:s,section:r}=t.tags,c=$o(e),l=Bo(e),u=K(e);Ue(e);const d=Po(e),p=(...x)=>a({class:n`
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
          `},...x)),m=n``,h=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[i("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[i("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[i("Built with ",s({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),i("Typescript support for a better developer experience.")]}],w=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:m},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:f}),d({data:h}),w())}}function Oo(e,t={}){const{bau:n,css:o}=e,{div:a,form:i,span:s,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const zo=e=>{const{tr:t,bau:n}=e,{section:o,div:a,h3:i,h2:s}=n.tags,r=Oo(e);return()=>o({id:"login"},s(t("Login Examples")),i("Basic"),a(r()))};function _o(e){const{tr:t,bau:n,css:o}=e,{div:a,article:i,h1:s}=n.tags;return function(){return a({class:o`
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
          `},s(t("Pages Examples")),zo(e)()))}}function Ro(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function jt(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&jt(n)}),e}class It{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ht(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function de(e,...t){const n=Object.create(null);for(const o in e)n[o]=e[o];return t.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const jo="</span>",Dt=e=>!!e.scope,Ho=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${t}${e}`};class Go{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ht(t)}openNode(t){if(!Dt(t))return;const n=Ho(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){Dt(t)&&(this.buffer+=jo)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Nt=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class ct{constructor(){this.rootNode=Nt(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Nt({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{ct._collapse(n)}))}}class Uo extends ct{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Go(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Ae(e){return e?typeof e=="string"?e:e.source:null}function Gt(e){return we("(?=",e,")")}function Fo(e){return we("(?:",e,")*")}function Wo(e){return we("(?:",e,")?")}function we(...e){return e.map(n=>Ae(n)).join("")}function Vo(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function lt(...e){return"("+(Vo(e).capture?"":"?:")+e.map(o=>Ae(o)).join("|")+")"}function Ut(e){return new RegExp(e.toString()+"|").exec("").length-1}function Ko(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Xo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ut(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;const a=n;let i=Ae(o),s="";for(;i.length>0;){const r=Xo.exec(i);if(!r){s+=i;break}s+=i.substring(0,r.index),i=i.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?s+="\\"+String(Number(r[1])+a):(s+=r[0],r[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}const qo=/\b\B/,Ft="[a-zA-Z]\\w*",dt="[a-zA-Z_]\\w*",Wt="\\b\\d+(\\.\\d+)?",Vt="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Kt="\\b(0b[01]+)",Zo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Yo=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=we(t,/.*\b/,e.binary,/\b.*/)),de({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},Ie={begin:"\\\\[\\s\\S]",relevance:0},Jo={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Ie]},Qo={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Ie]},ea={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Fe=function(e,t,n={}){const o=de({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=lt("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:we(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},ta=Fe("//","$"),na=Fe("/\\*","\\*/"),oa=Fe("#","$"),aa={scope:"number",begin:Wt,relevance:0},ra={scope:"number",begin:Vt,relevance:0},sa={scope:"number",begin:Kt,relevance:0},ia={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Ie,{begin:/\[/,end:/\]/,relevance:0,contains:[Ie]}]}]},ca={scope:"title",begin:Ft,relevance:0},la={scope:"title",begin:dt,relevance:0},ua={begin:"\\.\\s*"+dt,relevance:0},da=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var Re=Object.freeze({__proto__:null,MATCH_NOTHING_RE:qo,IDENT_RE:Ft,UNDERSCORE_IDENT_RE:dt,NUMBER_RE:Wt,C_NUMBER_RE:Vt,BINARY_NUMBER_RE:Kt,RE_STARTERS_RE:Zo,SHEBANG:Yo,BACKSLASH_ESCAPE:Ie,APOS_STRING_MODE:Jo,QUOTE_STRING_MODE:Qo,PHRASAL_WORDS_MODE:ea,COMMENT:Fe,C_LINE_COMMENT_MODE:ta,C_BLOCK_COMMENT_MODE:na,HASH_COMMENT_MODE:oa,NUMBER_MODE:aa,C_NUMBER_MODE:ra,BINARY_NUMBER_MODE:sa,REGEXP_MODE:ia,TITLE_MODE:ca,UNDERSCORE_TITLE_MODE:la,METHOD_GUARD:ua,END_SAME_AS_BEGIN:da});function pa(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function ma(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function ga(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=pa,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function ba(e,t){Array.isArray(e.illegal)&&(e.illegal=lt(...e.illegal))}function ha(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function fa(e,t){e.relevance===void 0&&(e.relevance=1)}const va=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=we(n.beforeMatch,Gt(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},xa=["of","and","for","in","not","or","if","then","parent","list","value"],wa="keyword";function Xt(e,t,n=wa){const o=Object.create(null);return typeof e=="string"?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach(function(i){Object.assign(o,Xt(e[i],t,i))}),o;function a(i,s){t&&(s=s.map(r=>r.toLowerCase())),s.forEach(function(r){const c=r.split("|");o[c[0]]=[i,ya(c[0],c[1])]})}}function ya(e,t){return t?Number(t):Sa(e)?0:1}function Sa(e){return xa.includes(e.toLowerCase())}const Mt={},fe=e=>{console.error(e)},$t=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ye=(e,t)=>{Mt[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Mt[`${e}/${t}`]=!0)},He=new Error;function qt(e,t,{key:n}){let o=0;const a=e[n],i={},s={};for(let r=1;r<=t.length;r++)s[r+o]=a[r],i[r+o]=!0,o+=Ut(t[r-1]);e[n]=s,e[n]._emit=i,e[n]._multi=!0}function Ca(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw fe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),He;if(typeof e.beginScope!="object"||e.beginScope===null)throw fe("beginScope must be object"),He;qt(e,e.begin,{key:"beginScope"}),e.begin=ut(e.begin,{joinWith:""})}}function ka(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw fe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),He;if(typeof e.endScope!="object"||e.endScope===null)throw fe("endScope must be object"),He;qt(e,e.end,{key:"endScope"}),e.end=ut(e.end,{joinWith:""})}}function Ea(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function Ta(e){Ea(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Ca(e),ka(e)}function Aa(e){function t(s,r){return new RegExp(Ae(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Ut(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=t(ut(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(s){const r=new o;return s.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),s.terminatorEnd&&r.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&r.addRule(s.illegal,{type:"illegal"}),r}function i(s,r){const c=s;if(s.isCompiled)return c;[ma,ha,Ta,va].forEach(u=>u(s,r)),e.compilerExtensions.forEach(u=>u(s,r)),s.__beforeBegin=null,[ga,ba,fa].forEach(u=>u(s,r)),s.isCompiled=!0;let l=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),l=s.keywords.$pattern,delete s.keywords.$pattern),l=l||/\w+/,s.keywords&&(s.keywords=Xt(s.keywords,e.case_insensitive)),c.keywordPatternRe=t(l,!0),r&&(s.begin||(s.begin=/\B|\b/),c.beginRe=t(c.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(c.endRe=t(c.end)),c.terminatorEnd=Ae(c.end)||"",s.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(s.end?"|":"")+r.terminatorEnd)),s.illegal&&(c.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(u){return Ia(u==="self"?s:u)})),s.contains.forEach(function(u){i(u,c)}),s.starts&&i(s.starts,r),c.matcher=a(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=de(e.classNameAliases||{}),i(e)}function Zt(e){return e?e.endsWithParent||Zt(e.starts):!1}function Ia(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return de(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Zt(e)?de(e,{starts:e.starts?de(e.starts):null}):Object.isFrozen(e)?de(e):e}var Da="11.8.0";class Na extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const nt=Ht,Bt=de,Pt=Symbol("nomatch"),Ma=7,Yt=function(e){const t=Object.create(null),n=Object.create(null),o=[];let a=!0;const i="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Uo};function c(g){return r.noHighlightRe.test(g)}function l(g){let b=g.className+" ";b+=g.parentNode?g.parentNode.className:"";const C=r.languageDetectRe.exec(b);if(C){const k=D(C[1]);return k||($t(i.replace("{}",C[1])),$t("Falling back to no-highlight mode for this block.",g)),k?C[1]:"no-highlight"}return b.split(/\s+/).find(k=>c(k)||D(k))}function u(g,b,C){let k="",L="";typeof b=="object"?(k=g,C=b.ignoreIllegals,L=b.language):(ye("10.7.0","highlight(lang, code, ...args) has been deprecated."),ye("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),L=g,k=b),C===void 0&&(C=!0);const B={code:k,language:L};_("before:highlight",B);const F=B.result?B.result:d(B.language,B.code,C);return F.code=B.code,_("after:highlight",F),F}function d(g,b,C,k){const L=Object.create(null);function B($,P){return $.keywords[P]}function F(){if(!H.keywords){oe.addText(Y);return}let $=0;H.keywordPatternRe.lastIndex=0;let P=H.keywordPatternRe.exec(Y),W="";for(;P;){W+=Y.substring($,P.index);const q=ie.case_insensitive?P[0].toLowerCase():P[0],re=B(H,q);if(re){const[ce,Yn]=re;if(oe.addText(W),W="",L[q]=(L[q]||0)+1,L[q]<=Ma&&(Oe+=Yn),ce.startsWith("_"))W+=P[0];else{const Jn=ie.classNameAliases[ce]||ce;Z(P[0],Jn)}}else W+=P[0];$=H.keywordPatternRe.lastIndex,P=H.keywordPatternRe.exec(Y)}W+=Y.substring($),oe.addText(W)}function R(){if(Y==="")return;let $=null;if(typeof H.subLanguage=="string"){if(!t[H.subLanguage]){oe.addText(Y);return}$=d(H.subLanguage,Y,!0,Ct[H.subLanguage]),Ct[H.subLanguage]=$._top}else $=m(Y,H.subLanguage.length?H.subLanguage:null);H.relevance>0&&(Oe+=$.relevance),oe.__addSublanguage($._emitter,$.language)}function z(){H.subLanguage!=null?R():F(),Y=""}function Z($,P){$!==""&&(oe.startScope(P),oe.addText($),oe.endScope())}function ne($,P){let W=1;const q=P.length-1;for(;W<=q;){if(!$._emit[W]){W++;continue}const re=ie.classNameAliases[$[W]]||$[W],ce=P[W];re?Z(ce,re):(Y=ce,F(),Y=""),W++}}function ee($,P){return $.scope&&typeof $.scope=="string"&&oe.openNode(ie.classNameAliases[$.scope]||$.scope),$.beginScope&&($.beginScope._wrap?(Z(Y,ie.classNameAliases[$.beginScope._wrap]||$.beginScope._wrap),Y=""):$.beginScope._multi&&(ne($.beginScope,P),Y="")),H=Object.create($,{parent:{value:H}}),H}function ae($,P,W){let q=Ko($.endRe,W);if(q){if($["on:end"]){const re=new It($);$["on:end"](P,re),re.isMatchIgnored&&(q=!1)}if(q){for(;$.endsParent&&$.parent;)$=$.parent;return $}}if($.endsWithParent)return ae($.parent,P,W)}function pe($){return H.matcher.regexIndex===0?(Y+=$[0],1):(Qe=!0,0)}function me($){const P=$[0],W=$.rule,q=new It(W),re=[W.__beforeBegin,W["on:begin"]];for(const ce of re)if(ce&&(ce($,q),q.isMatchIgnored))return pe(P);return W.skip?Y+=P:(W.excludeBegin&&(Y+=P),z(),!W.returnBegin&&!W.excludeBegin&&(Y=P)),ee(W,$),W.returnBegin?0:P.length}function J($){const P=$[0],W=b.substring($.index),q=ae(H,$,W);if(!q)return Pt;const re=H;H.endScope&&H.endScope._wrap?(z(),Z(P,H.endScope._wrap)):H.endScope&&H.endScope._multi?(z(),ne(H.endScope,$)):re.skip?Y+=P:(re.returnEnd||re.excludeEnd||(Y+=P),z(),re.excludeEnd&&(Y=P));do H.scope&&oe.closeNode(),!H.skip&&!H.subLanguage&&(Oe+=H.relevance),H=H.parent;while(H!==q.parent);return q.starts&&ee(q.starts,$),re.returnEnd?0:P.length}function se(){const $=[];for(let P=H;P!==ie;P=P.parent)P.scope&&$.unshift(P.scope);$.forEach(P=>oe.openNode(P))}let ge={};function St($,P){const W=P&&P[0];if(Y+=$,W==null)return z(),0;if(ge.type==="begin"&&P.type==="end"&&ge.index===P.index&&W===""){if(Y+=b.slice(P.index,P.index+1),!a){const q=new Error(`0 width match regex (${g})`);throw q.languageName=g,q.badRule=ge.rule,q}return 1}if(ge=P,P.type==="begin")return me(P);if(P.type==="illegal"&&!C){const q=new Error('Illegal lexeme "'+W+'" for mode "'+(H.scope||"<unnamed>")+'"');throw q.mode=H,q}else if(P.type==="end"){const q=J(P);if(q!==Pt)return q}if(P.type==="illegal"&&W==="")return 1;if(Je>1e5&&Je>P.index*3)throw new Error("potential infinite loop, way more iterations than matches");return Y+=W,W.length}const ie=D(g);if(!ie)throw fe(i.replace("{}",g)),new Error('Unknown language: "'+g+'"');const Zn=Aa(ie);let Ye="",H=k||Zn;const Ct={},oe=new r.__emitter(r);se();let Y="",Oe=0,be=0,Je=0,Qe=!1;try{if(ie.__emitTokens)ie.__emitTokens(b,oe);else{for(H.matcher.considerAll();;){Je++,Qe?Qe=!1:H.matcher.considerAll(),H.matcher.lastIndex=be;const $=H.matcher.exec(b);if(!$)break;const P=b.substring(be,$.index),W=St(P,$);be=$.index+W}St(b.substring(be))}return oe.finalize(),Ye=oe.toHTML(),{language:g,value:Ye,relevance:Oe,illegal:!1,_emitter:oe,_top:H}}catch($){if($.message&&$.message.includes("Illegal"))return{language:g,value:nt(b),illegal:!0,relevance:0,_illegalBy:{message:$.message,index:be,context:b.slice(be-100,be+100),mode:$.mode,resultSoFar:Ye},_emitter:oe};if(a)return{language:g,value:nt(b),illegal:!1,relevance:0,errorRaised:$,_emitter:oe,_top:H};throw $}}function p(g){const b={value:nt(g),illegal:!1,relevance:0,_top:s,_emitter:new r.__emitter(r)};return b._emitter.addText(g),b}function m(g,b){b=b||r.languages||Object.keys(t);const C=p(g),k=b.filter(D).filter(U).map(z=>d(z,g,!1));k.unshift(C);const L=k.sort((z,Z)=>{if(z.relevance!==Z.relevance)return Z.relevance-z.relevance;if(z.language&&Z.language){if(D(z.language).supersetOf===Z.language)return 1;if(D(Z.language).supersetOf===z.language)return-1}return 0}),[B,F]=L,R=B;return R.secondBest=F,R}function h(g,b,C){const k=b&&n[b]||C;g.classList.add("hljs"),g.classList.add(`language-${k}`)}function f(g){let b=null;const C=l(g);if(c(C))return;if(_("before:highlightElement",{el:g,language:C}),g.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(g)),r.throwUnescapedHTML))throw new Na("One of your code blocks includes unescaped HTML.",g.innerHTML);b=g;const k=b.textContent,L=C?u(k,{language:C,ignoreIllegals:!0}):m(k);g.innerHTML=L.value,h(g,C,L.language),g.result={language:L.language,re:L.relevance,relevance:L.relevance},L.secondBest&&(g.secondBest={language:L.secondBest.language,relevance:L.secondBest.relevance}),_("after:highlightElement",{el:g,result:L,text:k})}function w(g){r=Bt(r,g)}const x=()=>{E(),ye("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function v(){E(),ye("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function E(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function A(){S&&E()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function M(g,b){let C=null;try{C=b(e)}catch(k){if(fe("Language definition for '{}' could not be registered.".replace("{}",g)),a)fe(k);else throw k;C=s}C.name||(C.name=g),t[g]=C,C.rawDefinition=b.bind(null,e),C.aliases&&O(C.aliases,{languageName:g})}function T(g){delete t[g];for(const b of Object.keys(n))n[b]===g&&delete n[b]}function I(){return Object.keys(t)}function D(g){return g=(g||"").toLowerCase(),t[g]||t[n[g]]}function O(g,{languageName:b}){typeof g=="string"&&(g=[g]),g.forEach(C=>{n[C.toLowerCase()]=b})}function U(g){const b=D(g);return b&&!b.disableAutodetect}function Q(g){g["before:highlightBlock"]&&!g["before:highlightElement"]&&(g["before:highlightElement"]=b=>{g["before:highlightBlock"](Object.assign({block:b.el},b))}),g["after:highlightBlock"]&&!g["after:highlightElement"]&&(g["after:highlightElement"]=b=>{g["after:highlightBlock"](Object.assign({block:b.el},b))})}function V(g){Q(g),o.push(g)}function X(g){const b=o.indexOf(g);b!==-1&&o.splice(b,1)}function _(g,b){const C=g;o.forEach(function(k){k[C]&&k[C](b)})}function y(g){return ye("10.7.0","highlightBlock will be removed entirely in v12.0"),ye("10.7.0","Please use highlightElement now."),f(g)}Object.assign(e,{highlight:u,highlightAuto:m,highlightAll:E,highlightElement:f,highlightBlock:y,configure:w,initHighlighting:x,initHighlightingOnLoad:v,registerLanguage:M,unregisterLanguage:T,listLanguages:I,getLanguage:D,registerAliases:O,autoDetection:U,inherit:Bt,addPlugin:V,removePlugin:X}),e.debugMode=function(){a=!1},e.safeMode=function(){a=!0},e.versionString=Da,e.regex={concat:we,lookahead:Gt,either:lt,optional:Wo,anyNumberOfTimes:Fo};for(const g in Re)typeof Re[g]=="object"&&jt(Re[g]);return Object.assign(e,Re),e},Ce=Yt({});Ce.newInstance=()=>Yt({});var $a=Ce;Ce.HighlightJS=Ce;Ce.default=Ce;const Te=Ro($a),Lt="[A-Za-z$_][0-9A-Za-z$_]*",Ba=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Pa=["true","false","null","undefined","NaN","Infinity"],Jt=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Qt=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],en=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],La=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Oa=[].concat(en,Jt,Qt);function tn(e){const t=e.regex,n=(b,{after:C})=>{const k="</"+b[0].slice(1);return b.input.indexOf(k,C)!==-1},o=Lt,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(b,C)=>{const k=b[0].length+b.index,L=b.input[k];if(L==="<"||L===","){C.ignoreMatch();return}L===">"&&(n(b,{after:k})||C.ignoreMatch());let B;const F=b.input.substring(k);if(B=F.match(/^\s*=/)){C.ignoreMatch();return}if((B=F.match(/^\s+extends\s+/))&&B.index===0){C.ignoreMatch();return}}},r={$pattern:Lt,keyword:Ba,literal:Pa,built_in:Oa,"variable.language":La},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},m={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},h={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},v={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,h,f,w,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const E=[].concat(v,p.contains),A=E.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(E)}]),M={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A},T={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,t.concat(o,"(",t.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},I={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Jt,...Qt]}},D={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},U={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function Q(b){return t.concat("(?!",b.join("|"),")")}const V={match:t.concat(/\b/,Q([...en,"super","import"]),o,t.lookahead(/\(/)),className:"title.function",relevance:0},X={begin:t.concat(/\./,t.lookahead(t.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},_={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},y="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",g={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(y)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:I},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),D,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,m,h,f,w,v,{match:/\$\d+/},d,I,{className:"attr",begin:o+t.lookahead(":"),relevance:0},g,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[v,e.REGEXP_MODE,{className:"function",begin:y,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,e.inherit(e.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},X,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},V,U,T,_,{match:/\$[(.]/}]}}function za(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const _a=e=>{const{bau:t,css:n}=e,{pre:o,code:a}=t.tags;return Te.registerLanguage("javascript",tn),Te.registerLanguage("sh",za),function({text:s,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Te.highlight(s,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function Ra(e){const{bau:t,css:n}=e,{article:o,h1:a,p:i,code:s,a:r,ul:c,li:l}=t.tags,u=_a(e);return function(){return o({class:n`
          background-color: var(--background-color);
          border-bottom: 1px solid var(--color-emphasis-200);
        `},a("Getting Started"),i("Grab the source code template for Javascript or Typescript"),u({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),i("Install the dependencies with the package manager of your choice:"),u({text:`cd my-bau-project
npm install`}),i("This template project is built with Vite. To start a development server:"),u({text:"npm run dev"}),i("The application starting point is at ",s("src/main.ts")),i("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),u({text:'import button from "@grucloud/bau-ui/button";'}),i("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),u({text:"const Button = button(context);"}),i("Last step is to place the button into the tree of component:"),u({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),i("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),i("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function De(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    border: 1px solid transparent;
    height: fit-content;
    border-radius: var(--global-radius);
    &.sm {
      box-shadow: var(--shadow-s);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.03)
      );
    }
    &.md {
      box-shadow: var(--shadow-m);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05)
      );
    }
    &.lg {
      box-shadow: var(--shadow-lg);
      background-image: linear-gradient(
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1)
      );
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=G(r);return a({...d,class:N("paper",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}function nn(e,t={}){const{bau:n,css:o,window:a}=e,{nav:i,ul:s,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=t,u=n.state("no"),d=(w,x)=>{let v=null;return(...S)=>{a.clearTimeout(v),v=a.setTimeout(()=>w(...S),x)}},p=o`
    grid-area: toc;
    position: sticky;
    right: 0;
    z-index: 1;
    top: calc(var(--header-height));
    height: fit-content;
    max-height: calc(100vh - var(--header-height));
    background-color: var(--background-color);
    border-left: 1px solid var(--color-emphasis-200);
    & ul {
      padding-left: 0rem;
      & ul {
        padding-left: 1rem;
      }
    }
    & li {
      display: block;
      &::before {
        content: "";
        border: 1px solid transparent;
        margin-right: 1rem;
        display: inline;
        height: 100%;
        vertical-align: middle;
      }
      &.active::before {
        transition: all 0.4s ease-in-out;
        border-color: var(--link-color);
      }
    }
    & a {
      font-size: 0.8rem;
      text-decoration: none;
      color: var(--color-content-secondary);
      &:hover {
        text-decoration: underline;
      }
      &.active {
        color: var(--link-color);
      }
    }
  `,m=({value:w,id:x,children:v=[]})=>{const S=c({class:()=>u.val==x?"active":"",href:`#${x}`});return S.innerHTML=w,r({class:()=>u.val==x?"active":""},S,v.length>0&&s(v.map(m)))},h=w=>w.tagName.charAt(1),f=({contentEl:w})=>{const x=w.querySelectorAll(l);let v=2,S={},E={children:[]},A=E;const M=A;let T=[A];return[...x].forEach(I=>{const D=h(I);I.setAttribute("id",I.textContent),!I.innerHTML.includes("<button")&&(S={value:I.innerHTML,id:I.id??I.textContent,children:[]},v==D?(E=S,A.children.push(E)):v<D?(T.push(A),A=E,E.children.push(S),E=S):v>D&&(A=T[D-1],T=T.slice(0,D-1),A.children.push(S),E=S),v=D)}),M};return function(...x){let[{size:v=t.size??"md",variant:S=t.variant??"plain",color:E=t.color??"neutral",contentEl:A,...M}]=G(x);const T=f({contentEl:A}),I=d(()=>{const O=[...A.querySelectorAll(l)].find(U=>{const{top:Q,height:V}=U.getBoundingClientRect();if(Q+V>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return i({...M,class:N("tableOfContent",v,S,E,p,t==null?void 0:t.class,M==null?void 0:M.class),bauMounted:()=>{a.addEventListener("scroll",I)},bauUnmounted:()=>{a.removeEventListener("scroll",I)}},T.children&&s(T.children.map(m)))}}const on=e=>{const{bau:t,css:n}=e,{div:o,table:a,tbody:i,tr:s,td:r,thead:c,th:l}=t.tags;return function({Item:d,name:p}){return o({class:n`
          overflow-x: auto;
          overflow-y: visible;
          width: 100%;
          max-width: 80vw;
          & table {
            table-layout: fixed;
            overflow-x: auto;
            & th,
            & td {
              padding: 0.5rem;
            }
          }
        `},a(c(s(l(p??""),te.map(m=>l(m)))),i(So.map(m=>s(l(m),te.map((h,f)=>r(d({color:h,variant:m},{index:f}))))))))}},ja=e=>{const{bau:t,css:n}=e,{section:o}=t.tags;return function({item:i}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Co.map((s,r)=>i(e,{size:s})({color:"success",variant:"outline"},{size:s,index:r})))}},j=e=>{const{bau:t,css:n}=e,{div:o,article:a,section:i,h1:s,p:r,h2:c,h3:l,pre:u,code:d}=t.tags;Te.registerLanguage("javascript",tn);const p=nn(e),m=De(e,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),h=on(e),f=ja(e),w=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=Te.highlight(x,{language:"js"}).value}}));return function(v){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},s(v.title),r(v.description),v.gridItem&&!v.variantColorTableDisable&&[c("Variant/Color"),m(h({Item:v.gridItem(e)}))],v.gridItem&&!v.variantSizeDisable&&[c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),m(f({item:v.gridItem}))],c("Usage"),l("Import"),w({text:v.importStatement}),c("Examples"),v.examples.map(E=>i(l(E.title),r(E.description),m(E.createComponent(e)({})),w({text:E.code}))));return o({class:n`
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr auto;
          grid-template-areas: "content toc";
          @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-areas: "content";
            & nav {
              display: none;
            }
          }
        `},S,p({contentEl:S}))}};function pt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: inherit;
      &::before {
        padding: 0.5rem;
        transition: transform var(--transition-fast) linear;
        line-height: 1rem;
      }
      &.close::before {
        content: "\u203A";
        padding: 0.5rem;
      }
      &.open::before {
        content: "\u203A";
        padding: 0.5rem;
        transform: rotate(90deg);
      }
    }
    & .content {
      background-color: inherit;
      will-change: height;
      transition: height var(--transition-fast) ease-out;
      overflow-y: scroll;
    }
  `,s=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:m=t.color??"neutral",Header:h,Content:f,close:w=!0,...x}]=G(u);const v=n.state(w);return a({...x,class:N("collapsible",d,i,t==null?void 0:t.class,x==null?void 0:x.class)},a({class:()=>N("header",f?v.val?"close":"open":""),onclick:S=>{v.val=!v.val,S.stopPropagation()}},h()),a({class:"content",role:"region",bauMounted:({element:S})=>{v.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(s({element:S,closeState:v}),!v.val)},f&&f()))}}const Ha=()=>te.map(e=>`
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
`);function We(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,h3:r,button:c}=n.tags,l=o`
    & ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      list-style: none;
      & li {
        display: flex;
        flex-direction: column;
        padding: 0 0.5rem;
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
          align-items: center;
          justify-content: space-between;
          margin: 0;
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
        }
      }
    }
    ${Ha()}
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"plain",color:h=t.color??"neutral",data:f=[],...w}]=G(d);const x=n.state(""),v=pt(e,{size:p,variant:m,color:h}),S=A=>M=>{x.val==A?x.val="":x.val=A},E=A=>{const{Header:M,Content:T,name:I}=A,D=()=>r({class:()=>N(x.val==I&&"active")},c({type:"button","aria-controls":`bau-${I}`,"aria-expanded":({element:U})=>x.val==I},M(A))),O=()=>a({id:`bau-${I}`,"data-state":({element:U})=>x.val==I},T(A));return s({class:N(h,m,p),onclick:S(I)},v({Header:D,Content:O}))};return a({class:N("accordion",l,t==null?void 0:t.class,w.class)},i(f.map(E)))}}const an=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,i=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],s=We(e,t);return r=>s({...r,data:i})},Ga=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,a=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=We(e);return()=>i({data:a,color:"neutral",variant:"outline"})},Ua=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
  const Accordion = accordion(context);

  return () =>
    Accordion({ data: accordionDefs, color: "neutral", variant: "outline" });
};
`,rn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Fa=e=>{const{css:t}=e,n=rn(e),o=We(e);return()=>o({color:"warning",data:n,class:t`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Wa=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";
import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);

  const Accordion = accordion(context);

  return () =>
    Accordion({
      color: "warning",
      data: accordionDefs,
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
`,Va=e=>{const{css:t}=e,n=rn(e),o=We(e);return()=>o({color:"success",variant:"outline",data:n,class:t`
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
      `})},Ka=`import accordion from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

import { createAccordionDefs } from "./accordion-definitions";

export default (context: Context) => {
  const { css } = context;

  const accordionDefs = createAccordionDefs(context);
  const Accordion = accordion(context);

  return () =>
    Accordion({
      color: "success",
      variant: "outline",
      data: accordionDefs,
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
`,Xa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Default ",description:"A simple accordion.",code:Ua,createComponent:Ga},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Wa,createComponent:Fa},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Ka,createComponent:Va}],gridItem:an},qa=e=>{const t=j(e);return()=>t(Xa)},Za={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},Ya=()=>te.map(e=>`
&.alert {
  &.plain.${e} {
    & .icon {
      color: var(--color-${e})
    }
  }
  &.outline.${e} {
    & .icon {
      color: var(--color-${e})
    }
  }
}
  `).join(`
`);function Ne(e,t={}){const{bau:n,css:o}=e,{div:a,i}=n.tags,s=o`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 0.5rem;
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
    ${Ya()}
  `,r=K(e),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",onRemove:h,...f},...w]=G(u);return a({...f,class:N("alert",`alert-${p}`,t.class,p,m,d,s,f.class),role:"alert"},i({class:"icon"},Za[m]),a({class:"content"},...w),h&&c({onclick:h}))}}const sn=(e,t)=>{const n=Ne(e,t);return o=>n({...o},`Alert ${(t==null?void 0:t.size)??""} `)},Ja=e=>{const{bau:t}=e,{h4:n,p:o}=t.tags,a=Ne(e);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},Qa=`import alert from "@grucloud/bau-ui/alert";
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
`,er=e=>{const{css:t}=e,n=Ne(e,{class:t`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},tr=`import alert from "@grucloud/bau-ui/alert";
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
`,nr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:Qa,createComponent:Ja},{title:"Custom Alert ",description:"A custom alert.",code:tr,createComponent:er}],gridItem:sn},or=e=>{const t=j(e);return()=>t(nr)},ar=(e,t={})=>{const{bau:n,css:o,keyframes:a}=e,{limit:i=10,deleteAfterDuration:s=15e3}=t,{div:r}=n.tags,c=n.state([]),l={inserting:a`
    0% { transform: scale(0.5); opacity: 0 }
    100% { transform: scale(1); opacity: 1 }
  `,removing:a`
    0% { transform: scale(1); opacity: 1 }
    100% { transform: scale(0); opacity: 0 }
  `},u={stack:o`
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
    `},d=({id:p,status:m})=>{const h=c.val.findIndex(f=>f.id===p);h!=-1&&(c.val[h].status=m)};return function(m={},...h){const f=({id:v})=>{d({id:v,status:"removing"});const S=c.val.findIndex(E=>E.id===v);S!=-1&&c.val.splice(S,1)},w=({Component:v})=>{const S={id:Math.random().toString(10).split(".")[1],Component:v,status:"inserting"};c.val.length>=i&&f({id:c.val[0].id}),c.val.push(S),setTimeout(()=>f(S),s)},x=v=>r({class:u.item,onclick:()=>f(v)},v.Component());return document.addEventListener("alert.add",v=>w(v.detail)),document.addEventListener("alert.remove",v=>f(v.detail)),r({class:N(u.stack,t==null?void 0:t.class,m.class)},n.loop(c,r(),x))}},rr=e=>{const{tr:t,bau:n}=e,{section:o}=n.tags,a=ar(e,{deleteAfterDuration:2e4}),i=K(e),s=Ne(e);return()=>o(a(),i({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>s({color:"success"},t("Infrastructure Created"))}}))}},"Success Alert"))},sr=`import { Context } from "@grucloud/bau-ui/context";
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
`,ir={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:sr,createComponent:rr}]},cr=e=>{const t=j(e);return()=>t(ir)},lr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a}=t.tags,i=Ge(e),s=K(e),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=t.state(!0);return()=>o(s({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),i({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},ur=`import animate from "@grucloud/bau-ui/animate";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, keyframes } = context;
  const { section, div } = bau.tags;
  const Animate = animate(context);
  const Button = button(context);

  const hideRight = keyframes\`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  \`;

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
          animationHide: () => \`\${hideRight} 0.5s\`,
          animationShow: () => \`\${hideRight} 0.5s reverse\`,
        },
        () => div(showState.val ? "Ciao" : "Mondo")
      )
    );
};
`,dr=e=>{const{bau:t,keyframes:n}=e,{section:o,div:a,input:i,label:s}=t.tags,r=Ge(e),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=t.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(s("One",i({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),s("Two",i({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},pr=`import animate from "@grucloud/bau-ui/animate";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, keyframes } = context;
  const { section, div, input, label } = bau.tags;
  const Animate = animate(context);

  const fadeIn = keyframes\`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  \`;

  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  const routeMap: any = {
    //
    one: () => div("ONE"),
    two: () => div("TWO"),
  };

  return () =>
    section(
      label(
        "One",
        input({
          type: "radio",
          id: "one",
          name: "radio",
          checked: true,
          value: checkedState,
          oninput,
        })
      ),
      label(
        "Two",
        input({
          type: "radio",
          id: "two",
          name: "radio",
          value: checkedState,
          oninput,
        })
      ),
      Animate(
        {
          animationHide: () => \`\${fadeIn} 0.5s\`,
          animationShow: () => \`\${fadeIn} 0.5s reverse\`,
        },
        () => routeMap[checkedState.val]()
      )
    );
};
`,mr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:ur,createComponent:lr},{title:"Component hide and show",description:"Hide and show a component",code:pr,createComponent:dr}]},gr=e=>{const t=j(e);return()=>t(mr)};function cn(e,t={}){const{bau:n,css:o}=e,{span:a,img:i}=n.tags,s=n.state(!0),r=n.state(!1),c=()=>s.val=!1,l=d=>{s.val=!1,r.val=!0},u=o`
    display: flex;
    justify-content: center;
    align-items: center;
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
  `;return function(...p){let[{size:m=t.size??"md",variant:h=t.variant??"plain",color:f=t.color??"neutral",width:w=40,height:x=40,...v},...S]=G(p);return a({class:N(u,t==null?void 0:t.class,v.class)},()=>s.val?"Loading...":"",()=>r.val&&"Error",i({width:w,height:x,onload:c,onerror:l,class:N(f,h,m,u,t==null?void 0:t.class,v.class),...v}))}}const ln=(e,t)=>{const{css:n}=e,o=cn(e,{...t,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},br=e=>{const{bau:t,css:n}=e,{section:o}=t.tags,a=cn(e,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},hr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,fr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:hr,createComponent:br}],gridItem:ln},vr=e=>{const t=j(e);return()=>t(fr)};function Ve(e,t){const{bau:n,css:o,window:a}=e,{dialog:i}=n.tags,s=De(e,{class:o`
      &.paper {
        padding: 0;
      }
    `}),r=o`
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
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...m},...h]=G(l);const f=v=>{x.style.opacity=1,x.showModal();const S=d.getBoundingClientRect(),E=x.getBoundingClientRect();S.x<a.innerWidth/2?x.style.left=S.left+"px":x.style.left=S.right-E.width+"px",S.y<a.innerHeight/2?x.style.top=S.top+S.height+"px":(x.style.top=Math.max(0,S.top-E.height)+"px",x.scrollHeight>S.top&&(x.style.height=S.top+"px"))},w=v=>{const S=()=>{x.close(),x.removeEventListener("transitionend",S)};x.addEventListener("transitionend",S),x.style.opacity=0},x=i({role:"presentation",class:N("popover",r,t==null?void 0:t.class,m==null?void 0:m.class),onclick:v=>v.target===x&&(w(),p==null?void 0:p.call())},s(u));return x.closeDialog=w,x.openDialog=f,x}}const je={sm:12,md:16,lg:24},xr=()=>te.map(e=>`
&.${e} {
  background-color:transparent;
}
&.plain.${e} {
  & .path {
    stroke: var(--color-${e});
  }
}
&.outline.${e} {
  border: none;
  & .path {
    stroke: var(--color-${e});
  }
}
&.solid.${e} {
  background-color:transparent;
  & .path {
    stroke: var(--font-color-inverse);
    ;
  }
}
`).join(`
`);function Me(e,t={}){const{bau:n,css:o,keyframes:a}=e,{svg:i,circle:s}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
100% {
      transform: rotate(360deg);
}
  `,c=a`
0% {
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
}
50% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -35;
}
100% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -124;
}
  `;return function({size:u=t.size??"md",color:d=t.color??"primary",variant:p=t.variant??"outline",visibility:m=!0,...h}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${je[u]};
      height: ${je[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${xr()}
    `;return i({class:{deps:[m],renderProp:()=>w=>N("spinner",f,d,p,w==!1?"":"visibility",t==null?void 0:t.class,h.class)},version:"1.1",x:"0px",y:"0px",width:je[u],height:je[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...h},s({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const wr=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
  `).join(`
`);function mt(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=o`
    position: relative;
    overflow: hidden;
    height: fit-content;
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    & .content {
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow: hidden;
      & ul {
        border-width: 0px !important;
        overflow: auto;
      }
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${wr()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",label:p,placeholder:m,Option:h,options:f,getOptionLabel:w=({label:J})=>J,onSelect:x=()=>{},id:v,required:S,name:E,loading:A,...M},...T]=G(c);const I=Ve(e),D=K(e),O=xe(e,{variant:u,color:d,size:l}),U=ve(e),Q=Me(e,{variant:u,color:d,size:l}),V=n.state(M.value);n.derive(()=>{V.val&&(ae.value=w(V.val),x(V.val))});const X=n.state(""),_=n.state(!1),y=n.state(0),g=()=>{_.val=!1},b=n.state(f),C=J=>se=>J.val&&w(se)==w(J.val),k=()=>{me.openDialog(),_.val=!0,X.val="",b.val=f,y.val=f.findIndex(C(V));const J=pe.querySelector("li.selected");J&&(J.scrollIntoView({block:"center"}),ee.scrollIntoView({block:"end"}))},L=()=>{me.closeDialog(),_.val=!1,X.val="",y.val=0},B=J=>{const{value:se}=J.target;X.val=se,se?b.val=f.filter(ge=>w(ge).match(new RegExp(`${se}`,"i"))):b.val=f},F=J=>{me.open?L():k()},R=({option:J,index:se})=>ge=>{V.val=J,y.val=se,L()},z=()=>{const J=pe.querySelector("li.active");J&&J.scrollIntoView({block:"center",behavior:"smooth"})},Z=J=>{switch(J.key){case"Escape":L();break;case"ArrowDown":y.val<b.val.length-1?y.val++:y.val=0,z();break;case"ArrowUp":y.val<=0?y.val=b.val.length-1:y.val--,z();break;case"Enter":me.open?(V.val=b.val[y.val],X.val="",L()):k(),J.preventDefault();break}},ne=D({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":_,"aria-label":p,onclick:F,variant:u,color:d,size:l,class:A==!0&&"loading",disabled:A},()=>V.val?w(V.val):p,()=>A==!0&&Q({visibility:A})),ee=O({value:X,placeholder:m,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":_,oninput:B,onkeydown:Z,...M}),ae=O({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,value:X,required:S,name:E}),pe=a({class:N(u,d,l,"content")},ee,()=>U({class:N(u,d,l)},b.val.map((J,se)=>i({class:()=>N(y.val==se&&"active",C(V)(J)&&"selected"),onclick:R({option:J,index:se})},h(J))))),me=I({id:v,triggerEl:ne,contentEl:pe,onClose:g,class:o`
        overflow: hidden;
      `});return a({...M,class:N("autocomplete",s,t==null?void 0:t.class,M==null?void 0:M.class)},ne,ae,me)}}const un=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=mt(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},yr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=mt(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Sr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Cr=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=K(e,{variant:"outline"}),r=mt(e),c=t.state([]),l=t.state(!1),u=t.state("");async function d({url:h,transform:f=w=>w}){try{l.val=!0;const w=await fetch(h,{});if(w.ok){const x=await w.json();c.val=f(x)}else u.val=w.statusText}catch(w){u.val=w.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:h=>h.sort((f,w)=>f.name.common.localeCompare(w.name.common))});p();const m=h=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(h.flag),i(h.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:m,getOptionLabel:({name:h})=>h.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),s({onclick:()=>p()},"Reload")))},kr=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const Autocomplete = autocomplete(context);

  const dataState = bau.state([]);
  const loadingState = bau.state(false);
  const errorMessageState = bau.state("");

  async function fetchData({ url, transform = (x: any) => x }: any) {
    try {
      loadingState.val = true;
      const response = await fetch(url, {});
      if (response.ok) {
        const json = await response.json();
        dataState.val = transform(json);
      } else {
        errorMessageState.val = response.statusText;
      }
    } catch (error: any) {
      errorMessageState.val = error.message;
    } finally {
      loadingState.val = false;
    }
  }
  const fetchCountries = () =>
    fetchData({
      url: "https://restcountries.com/v3.1/all?fields=name,flag",
      transform: (data: any) =>
        data.sort((a: any, b: any) =>
          a.name.common.localeCompare(b.name.common)
        ),
    });

  fetchCountries();

  const Option = (option: any) =>
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        \`,
      },
      span(option.flag),
      span(option.name.common)
    );

  return () =>
    section(
      div(
        {
          class: css\`
            display: flex;
            gap: 1rem;
          \`,
        },
        () =>
          Autocomplete({
            options: dataState.val,
            Option,
            getOptionLabel: ({ name }: any) => name.common,
            label: "Country",
            placeholder: "Search countries",
            id: "country",
            loading: loadingState.val,
          }),
        Button({ onclick: () => fetchCountries() }, "Reload")
      )
    );
};
`,Er={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Sr,createComponent:yr},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:kr,createComponent:Cr}],gridItem:un},Tr=e=>{const t=j(e);return()=>t(Er)};function dn(e,t={}){const{bau:n,css:o}=e,{span:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...m]=G(r);return a({...p,class:N("badge",i,t==null?void 0:t.class,p==null?void 0:p.class)},a({class:N(u,l,c)},d),...m)}}const pn=(e,t)=>{const n=dn(e,t);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Ar=e=>{const{bau:t}=e,{section:n}=t.tags,o=dn(e);return()=>n(o({content:"10"},"☏"))},Ir=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Dr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Ir,createComponent:Ar}],gridItem:pn},Nr=e=>{const t=j(e);return()=>t(Dr)};function gt(e,t={}){const{bau:n,css:o,config:a}=e,{ul:i,li:s,span:r}=n.tags,{separator:c="〉"}=t,l=K(e),u=o`
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    margin: 0;
    & li {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
      &::after {
        content: "${c}";
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
  `;return function(...p){let[{size:m=t.size??"md",variant:h=t.variant??"plain",color:f=t.color??"neutral",items:w,...x},...v]=G(p);return i({...x,class:N(u,t==null?void 0:t.class,x==null?void 0:x.class)},w.map(({href:S,name:E})=>s((S?l:r)({href:`${a.base}${S}`,color:f,variant:h,size:m,class:N(f,h,m)},E))))}}const mn=(e,t)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=gt(e,t);return a=>o({...a,...n})},Mr=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=gt(e,{variant:"outline",color:"neutral"});return()=>n(a(o))},$r=`import { Context } from "@grucloud/bau-ui/context";
import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const breadcrumbsProps: BreadcrumbsProps = {
    items: [
      {
        href: "/",
        name: "\\u2302",
      },
      { name: "Dir", href: "/dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const Breadcrumbs = breadcrumbs(context, {
    variant: "outline",
    color: "neutral",
  });

  return () =>
    section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
};
`,Br=e=>{const{bau:t}=e,{section:n}=t.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=gt(e,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Pr=`import { Context } from "@grucloud/bau-ui/context";
import breadcrumbs, {
  type BreadcrumbsProps,
} from "@grucloud/bau-ui/breadcrumbs";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const breadcrumbsProps: BreadcrumbsProps = {
    items: [
      {
        href: "/",
        name: "\\u2302",
      },
      { name: "Dir", href: "/dir" },
      { href: "/dir/subdir", name: "SubDir" },
    ],
  };

  const Breadcrumbs = breadcrumbs(context, {
    variant: "plain",
    color: "neutral",
    separator: "/",
  });

  return () =>
    section(
      //
      Breadcrumbs(breadcrumbsProps)
    );
};
`,Lr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:$r,createComponent:Mr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Pr,createComponent:Br}],gridItem:mn},Or=e=>{const t=j(e);return()=>t(Lr)},gn=(e,t={})=>{const n=K(e,t);return o=>n({...o},`${o.variant} ${o.color} ${t.size??""}`)},zr=e=>{const{bau:t}=e,{section:n}=t.tags,o=K(e),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},_r=`import button from "@grucloud/bau-ui/button";
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
`,Rr=e=>{const{bau:t}=e,{section:n}=t.tags,o=K(e),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},jr=`import button from "@grucloud/bau-ui/button";
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
      Button(
        { disabled: true, color: "primary", variant: "outline", onclick },
        "Click me"
      )
    );
};
`,Hr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:_r,createComponent:zr},{title:"Disabled Button",description:"A disabled button.",code:jr,createComponent:Rr}],gridItem:gn},Gr=e=>{const t=j(e);return()=>t(Hr)},Ur=()=>te.map(e=>`
&.button-group.${e} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}) !important;
  }
  & .button:not(:first-child) { 
    border-left: 1px solid var(--color-${e}) !important;
  }
}

&.button-group.outline.${e} {
  border: none;
}

&.button-group.solid.${e} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function bt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-flex;
    box-sizing: border-box;
    border-radius: var(--global-radius);
    & .button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & .button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    ${Ur()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=G(r);return a({...d,class:N("button-group",l,u,c,i,t==null?void 0:t.class,d==null?void 0:d.class)},...p)}}const bn=(e,t)=>{const n=["ONE","TWO","THREE"],o=K(e,t),a=bt(e,t);return i=>a({...i},n.map(s=>o(i,s)))},Fr=e=>{const{bau:t}=e,{section:n}=t.tags,o=["ONE","TWO","THREE"],a=K(e),i=bt(e),s="primary",r="solid";return()=>n(i({color:s,variant:r},o.map(c=>a({color:s,variant:r},c))))},Wr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Vr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Wr,createComponent:Fr}],gridItem:bn},Kr=e=>{const t=j(e);return()=>t(Vr)};function hn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>te.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...m]=G(c);return a({...p,type:"date",class:N("calendar",s,d,u,l,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}const fn=(e,t)=>{const n=hn(e,t);return o=>n({...o})},Xr=e=>{const{bau:t}=e,{section:n,label:o}=t.tags,a=t.state("2023-08-08"),i=hn(e);return()=>n(o("Start date:",i({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:s=>{a.val=s.target.value}})))},qr=`import calendar from "@grucloud/bau-ui/calendar";
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
`,Zr={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:qr,createComponent:Xr}],gridItem:fn},Yr=e=>{const t=j(e);return()=>t(Zr)};function Jr(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: inline-block;
    position: relative;
    overflow: hidden;
    & img {
      object-fit: contain;
    }
    & .control {
      z-index: 1;
      position: absolute;
      padding: 0.5rem;
      cursor: pointer;
    }
    & .control-previous {
      top: 50%;
      transform: translateY(-50%);
    }
    & .control-next {
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    & .track {
      display: flex;
      flex-direction: row;
      transition: all var(--transition-slow);
    }
  `,s=n.state(0);return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",slides:p,Slide:m,Previous:h,Next:f,...w}]=G(c);const x=()=>{s.val<=0?s.val=p.length-1:s.val--},v=()=>{s.val>=p.length-1?s.val=0:s.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*s.val}%);`},p.map(m));return a({...w,class:N("carousel",l,i,t==null?void 0:t.class,w==null?void 0:w.class)},a({class:N("control","control-previous"),onclick:x},h()),a({class:N("control","control-next"),onclick:v},f()),S)}}const Qr=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],es=e=>{const{bau:t,css:n}=e,{section:o,img:a}=t.tags,i=K(e,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),s=({src:u})=>a({src:u}),r=Jr(e,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),c=()=>i("◀"),l=()=>i("▶");return()=>o(r({slides:Qr,Slide:s,Previous:c,Next:l}))},ts=`import carousel from "@grucloud/bau-ui/carousel";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

const slides: any[] = [
  { src: "https://source.unsplash.com//featured/200x201" },
  { src: "https://source.unsplash.com//featured/200x202" },
  { src: "https://source.unsplash.com//featured/200x203" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, img } = bau.tags;

  const Button = button(context, {
    class: css\`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    \`,
  });

  const Slide = ({ src }: any) => img({ src });

  const Carousel = carousel(context, {
    class: css\`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    \`,
  });

  const Previous = () => Button("\\u25C0");
  const Next = () => Button("\\u25B6");

  return () =>
    section(
      //
      Carousel({ slides, Slide, Previous, Next })
    );
};
`,ns={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ts,createComponent:es}]},os=e=>{const t=j(e);return()=>t(ns)},vn=(e,t)=>{const n=Ue(e,t);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},as=e=>{const{bau:t}=e,{section:n}=t.tags,o=Ue(e);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},rs=`import chip from "@grucloud/bau-ui/chip";
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
`,ss={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:rs,createComponent:as}],gridItem:vn},is=e=>{const t=j(e);return()=>t(ss)};function xn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=G(r);return a({type:"checkbox",required:"required",...d,class:N(i,u,l,c,t==null?void 0:t.class,d==null?void 0:d.class)})}}const wn=(e,t)=>{const{bau:n,css:o}=e,{label:a}=n.tags,i=xn(e,t);return s=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${s.color} ${s.variant} ${s.size??""}`,i({id:`myCheckbox-gallery-${s.color}-${s.variant}-${s.size}`,name:`myCheckbox-gallery-${s.color}-${s.variant}`,...s}))},cs=e=>{const{bau:t,css:n}=e,{section:o,label:a}=t.tags,i=xn(e),s=t.state(!1),r=c=>{s.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",i({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:s,onchange:r})))},ls=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,us={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Default",description:"A simple checkbox.",code:ls,createComponent:cs}],gridItem:wn},ds=e=>{const t=j(e);return()=>t(us)},ps=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=pt(e),i=K(e,{variant:"outline"}),s=()=>i("Header"),r=()=>o("Content");return()=>n(a({Header:s,Content:r}))},ms=`import button from "@grucloud/bau-ui/button";
import collapsible from "@grucloud/bau-ui/collapsible";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Collapsible = collapsible(context);
  const Button = button(context, { variant: "outline" });

  const Header = () => Button("Header");
  const Content = () => div("Content");

  return () =>
    section(
      //
      Collapsible({ Header, Content })
    );
};
`,gs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:ms,createComponent:ps}]},bs=e=>{const t=j(e);return()=>t(gs)};function hs(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
    display: flex;
    align-items: center;
    .content {
      margin: 1rem;
      font-weight: 400;
      font-size: 0.875rem;
    }
    &::before,
    &::after {
      content: "";
      width: 100%;
      height: 0px;
      border-top: 1px solid var(--color-emphasis-200);
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=G(r);return a({...d,class:N("divider",c,i,t==null?void 0:t.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const fs=e=>{const{bau:t}=e,{section:n}=t.tags,o=hs(e);return()=>n(o("OR"))},vs=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,xs={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:vs,createComponent:fs}],variantColorTableDisable:!0,variantSizeDisable:!0},ws=e=>{const t=j(e);return()=>t(xs)};function ys(e,t){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...m]=G(r);return a({class:N(i,t==null?void 0:t.class,p.class)},a({class:()=>N("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>N("content",d.val&&"content-open")},m))}}const Ss=e=>{const{bau:t}=e,{section:n,p:o}=t.tags,a=t.state(!1),i=ys(e),s=K(e),r=Rt(e);return()=>n(o("Click on the button to open and close the drawer."),s({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),i({openState:a},r()))},Cs=`import drawer from "@grucloud/bau-ui/drawer";
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
`,ks={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Cs,createComponent:Ss}]},Es=e=>{const t=j(e);return()=>t(ks)},Ts=()=>te.map(e=>`
`).join(`
`);function yn(e,t={}){const{bau:n,css:o}=e,{div:a,li:i}=n.tags,s=K(e),r=Ve(e),c=ve(e),l=o`
    ${Ts()}
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"outline",color:h=t.color??"neutral",label:f,ListItem:w,items:x,...v},...S]=G(d);const E=n.state(0),A=()=>{V.openDialog(),V.focus()},M=()=>{V.closeDialog()},T=()=>{V.open?M():A()},I=X=>{T(),X.preventDefault()},D=({item:X,index:_})=>y=>{E.val=_,M(),y.preventDefault()},O=X=>{switch(X.preventDefault(),X.key){case"Escape":M();break;case"ArrowDown":E.val<options.length-1?E.val++:E.val=0;break;case"ArrowUp":E.val<=0?E.val=options.length-1:E.val--;break;case"Enter":T();break}},U=()=>c({tabindex:"0",class:N(h,m)},x.map((X,_)=>i({class:()=>N(E.val==_&&"active"),onclick:D({item:X,index:_})},w(X)))),Q=s({type:"button",onclick:I,color:h,variant:m,size:p},f),V=r({triggerEl:Q,contentEl:U()});return a({...v,class:N("dropdownMenu",h,p,l,t==null?void 0:t.class,v==null?void 0:v.class),onkeydown:O},Q,V)}}const As=(e,t)=>{const{bau:n}=e,{div:o,span:a}=n.tags,i=yn(e,t),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>i({...c,items:s,ListItem:r,label:"Action"})},Is=e=>{const{bau:t}=e,{section:n,div:o,span:a}=t.tags,i=yn(e),s=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(i({items:s,ListItem:r,label:"Action"}))},Ds=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div, span } = bau.tags;

  const DropdownMenu = dropdownMenu(context);

  const items = [
    { label: "List" },
    {
      label: "Plan",
    },
    { label: "Apply" },
  ];

  const ListItem = (option: any) =>
    div(
      {
        onclick: () => {
          alert(\`click  \${option.label}\`);
        },
      },
      span(option.label)
    );

  return () =>
    section(
      DropdownMenu({
        items,
        ListItem,
        label: "Action",
      })
    );
};
`,Ns={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Ds,createComponent:Is}],gridItem:As},Ms=e=>{const t=j(e);return()=>t(Ns)},Sn=(e,t)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=st(e,t);return a=>o({id:"drilldown-gallery",tree:n,...a})},$s=e=>{const{bau:t}=e,{section:n}=t.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=st(e,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Bs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const tree: Tree = {
    data: { name: "Root Menu", href: "#drilldown-example" },
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
    base: "/components/drillDownMenu",
    hashBased: true,
  });

  return () => section({ id: "drilldown-example" }, DrillDownMenu({ tree }));
};
`,Ps={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Bs,createComponent:$s}],gridItem:(e,t)=>Sn(e,{base:"/components/drillDownMenu",hashBased:!0,...t})},Ls=e=>{const t=j(e);return()=>t(Ps)};function ht(e,t={}){const{bau:n,css:o}=e,{div:a,label:i,input:s}=n.tags,r={base:o`
      display: inline-flex;
      & input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
      }
      & label {
        padding: 1rem;
        border-radius: var(--global-radius);
        display: inline-flex;
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
    `};return function(l,...u){const{size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",Component:h,disabled:f,...w}=l;return a({class:N(r.base,f&&r.disabled,t==null?void 0:t.class,l.class)},i({class:N(p,m,d)},h({disabled:f}),s({type:"file",disabled:f,...w})))}}const Cn=(e,t)=>{const{tr:n,bau:o,css:a,config:i}=e,{svg:s,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=ht(e,t),p=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},m=({disabled:h})=>c({class:N(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,h&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},r({href:`${i.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return h=>d({Component:m,name:"file",accept:"text/*",onchange:p,...h})},Os=e=>{const{tr:t,bau:n,css:o,config:a}=e,{svg:i,use:s}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=ht(e),p=h=>{const f=h.target.files[0];f?u.val=f.name:u.val="No file selected"},m=({disabled:h})=>c({class:N(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,h&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},s({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(t("Choose a file to upload")));return()=>r(d({Component:m,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},zs=`import classNames from "@grucloud/bau-css/classNames";
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
            gap: 1rem;
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
`,_s={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:zs,createComponent:Os}],gridItem:Cn},Rs=e=>{const t=j(e);return()=>t(_s)};function $e(e,t={}){const{bau:n,css:o}=e,{form:a}=n.tags,i=o`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;

    & > header {
      & h1 {
        line-height: 0;
        font-size: 1.3rem;
      }
    }
    & section {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    & label,
    legend {
      display: inline-flex;
      flex-direction: column;
      gap: 0.3rem;
      font-weight: 500;
      font-size: smaller;
      color: var(--color-content-secondary);
    }
    & fieldset {
      border-radius: var(--global-radius);
    }
    & > footer {
      display: flex;
      gap: 1rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",content:d,...p},...m]=G(r);return a({...p,class:N("form",u,l,c,i,t==null?void 0:t.class,p==null?void 0:p.class)},...m)}}function ft(e,t={}){const{bau:n,css:o,keyframes:a}=e,{span:i}=n.tags,s=a`
0% {
      opacity: 1;
}
100% {
      opacity: 0;
}
`,r=o`
    position: relative;
    &:hover.loading {
      cursor: default;
    }
    & .spinner {
      position: absolute;
    }
    & span {
      &.loading {
        animation: ${s} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",loading:m,...h},...f]=G(l);const w=K(e),x=Me(e);return n.bind({deps:[m],render:()=>v=>w({...h,class:N("loadingButton",u,d,p,r,v&&"loading",t==null?void 0:t.class,h==null?void 0:h.class)},x({size:u,variant:d,color:p,visibility:v}),i({class:v&&"loading"},f))})}}const js=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,label:r,img:c,footer:l}=t.tags,u=ft(e),d=Ne(e,{variant:"outline",color:"danger"}),p=xe(e),m=$e(e,{class:n`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `}),h=De(e,{class:n`
      max-width: 400px;
    `});return function({onLoggedIn:w=()=>{}}){const x=t.state(!1),v=t.state("");return h(m({onsubmit:async E=>{const{username:A,password:M}=E.target.elements;E.preventDefault();try{x.val=!0;const T=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:A.value,password:M.value})});if(T.ok){const I=await T.json();w(I)}else T.status==401?v.val="Invalid username or password":v.val=T.statusText}catch(T){v.val=T.message}finally{x.val=!1}}},s(c({width:"100",src:`${o.base}/gc.svg`}),i("Login to Grucloud")),a(()=>v.val&&d(v.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:x},"Login"))))}},Hs=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import paper from "@grucloud/bau-ui/paper";
import loadingButton from "@grucloud/bau-ui/loadingButton";
import alert from "@grucloud/bau-ui/alert";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css, config } = context;
  const { section, h1, header, label, img, footer } = bau.tags;

  const LoadingButton = loadingButton(context);
  const Alert = alert(context, { variant: "outline", color: "danger" });
  const Input = input(context);
  const Form = form(context, {
    class: css\`
      align-items: center;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    \`,
  });
  const Paper = paper(context, {
    class: css\`
      max-width: 400px;
    \`,
  });

  type LoginFormProp = {
    onLoggedIn: (response: object) => void;
  };

  return function LoginForm({ onLoggedIn = () => {} }: LoginFormProp) {
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      const { username, password } = event.target.elements;
      event.preventDefault();
      try {
        loadingState.val = true;
        const response = await fetch("/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        });
        if (response.ok) {
          const json = await response.json();
          onLoggedIn(json);
        } else if (response.status == 401) {
          errorMessageState.val = "Invalid username or password";
        } else {
          errorMessageState.val = response.statusText;
        }
      } catch (error: any) {
        errorMessageState.val = error.message;
      } finally {
        loadingState.val = false;
      }
    };

    return Paper(
      Form(
        { onsubmit },
        header(
          img({ width: "100", src: \`\${config.base}/gc.svg\` }),
          h1("Login to Grucloud")
        ),
        section(
          () => errorMessageState.val && Alert(errorMessageState.val),
          label(
            "Email",
            Input({
              type: "email",
              autofocus: true,
              placeholder: "Email",
              name: "username",
              autocomplete: "username",
              required: true,
            })
          ),
          label(
            "Password",
            Input({
              type: "password",
              placeholder: "Password",
              name: "password",
              autocomplete: "current-password",
              minlength: "8",
              required: true,
            })
          )
        ),
        footer(
          LoadingButton(
            {
              type: "submit",
              variant: "solid",
              color: "primary",
              loading: loadingState,
            },
            "Login"
          )
        )
      )
    );
  };
};
`,Gs={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Login page",description:"A login page.",code:Hs,createComponent:js}]},Us=e=>{const t=j(e);return()=>t(Gs)},kn=(e,t={})=>{const n=xe(e,t);return o=>n({name:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinput-gallery-${t.color}-${t.variant}-${t.size}`,placeholder:"Enter text",...o})},Fs=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=xe(e);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},Ws=`import input from "@grucloud/bau-ui/input";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, h3 } = bau.tags;

  const Input = input(context);

  return () =>
    section(
      h3("Basic input"),
      Input({
        id: "my-input",
        name: "my-input",
        placeholder: "Enter Text",
        // oninput: (event)=> {}
      }),
      h3("Disabled input"),
      Input({
        name: "my-input-disabled",
        placeholder: "Enter Text",
        disabled: true,
      })
    );
};
`,Vs={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:Ws,createComponent:Fs}],gridItem:kn},Ks=e=>{const t=j(e);return()=>t(Vs)},En=(e,t={})=>{const n=it(e,t);return o=>n({name:`myinputSearch-gallery-${t.color}-${t.variant}-${t.size}`,id:`myinputSearch-gallery-${t.color??o.color}-${t.variant??o.variant}-${o.size??t.size}`,placeholder:"Enter text",...o})},Xs=e=>{const{bau:t}=e,{section:n,h3:o}=t.tags,a=it(e);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},qs=`import inputSearch from "@grucloud/bau-ui/inputSearch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, h3 } = bau.tags;

  const InputSearch = inputSearch(context);

  return () =>
    section(
      h3("Basic inputSearch"),
      InputSearch({
        id: "my-inputSearch",
        name: "my-inputSearch",
        placeholder: "Enter Text",
        // oninputSearch: (event)=> {}
      }),
      h3("Disabled inputSearch"),
      InputSearch({
        name: "my-inputSearch-disabled",
        placeholder: "Enter Text",
        disabled: true,
      })
    );
};
`,Zs={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:qs,createComponent:Xs}],gridItem:En},Ys=e=>{const t=j(e);return()=>t(Zs)};function Tn(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=()=>te.map(l=>`
&.${l}{
  background-color: var(--color-${l});
}
  `).join(`
`),r=a`
    0% {
      background-position: 0rem 0;
    }
    100% {
      background-position: 1rem 0;
    }
  `,c=o`
    width: 100%;
    height: 5px;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    transition: all 0.3s linear;
    opacity: 0;
    &.running {
      opacity: 1;
      animation: ${r} 1s linear infinite;
    }
    &.sm {
      height: 0.2rem;
    }
    &.md {
      height: 0.5rem;
    }
    &.lg {
      height: 1rem;
    }

    ${s()}
  `;return function(...u){let[{size:d=t.size??"md",variant:p=t.variant??"plain",color:m=t.color??"neutral",running:h,...f}]=G(u);return i({...f,role:"progressbar",class:{deps:[h],renderProp:()=>w=>N("linearProgress",d,m,c,w&&"running",t==null?void 0:t.class,f==null?void 0:f.class)}})}}const An=(e,t)=>{const n=Tn(e,t);return o=>n({...o,running:!0})},Js=e=>{const{bau:t}=e,{section:n,hr:o}=t.tags,a=K(e),i=Tn(e),s=t.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),o,i({running:s}))},Qs=`import linearProgress from "@grucloud/bau-ui/linearProgress";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, hr } = bau.tags;
  const Button = button(context);
  const LinearProgress = linearProgress(context);

  const runningState = bau.state(false);

  return () =>
    section(
      Button(
        {
          variant: "solid",
          color: "primary",
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      hr,
      LinearProgress({
        running: runningState,
      })
    );
};
`,ei={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Qs,createComponent:Js}],gridItem:An},ti=e=>{const t=j(e);return()=>t(ei)},In=(e,t)=>{const n=ft(e,t);return o=>n({...o,loading:!0},"Save")},ni=e=>{const{bau:t}=e,{section:n}=t.tags,o=ft(e),a=t.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},oi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const LoadingButton = loadingButton(context);

  const loadingState = bau.state(true);

  return () =>
    section(
      LoadingButton(
        {
          variant: "solid",
          color: "primary",
          loading: loadingState,
          onclick: () => (loadingState.val = !loadingState.val),
        },
        "Save"
      )
    );
};
`,ai={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:oi,createComponent:ni}],gridItem:In},ri=e=>{const t=j(e);return()=>t(ai)},si=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],ii=(e,t)=>{const{bau:n,css:o}=e,{span:a,li:i}=n.tags,s=ve(e,t),r=({code:c,label:l})=>i({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>s({...c},si.map(r))},ci=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],li=e=>{const{bau:t,css:n}=e,{section:o,span:a,li:i}=t.tags,s=ve(e),r=({code:c,label:l})=>i({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(s({variant:"outline",color:"primary"},ci.map(r)))},ui=`import list from "@grucloud/bau-ui/list";
import { Context } from "@grucloud/bau-ui/context";

const phoneCodes = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default (context: Context) => {
  const { bau, css } = context;
  const { section, span, li } = bau.tags;

  const List = list(context);

  const ListItem = ({ code, label }: any) =>
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
      List({ variant: "outline", color: "primary" }, phoneCodes.map(ListItem))
    );
};
`,di={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:ui,createComponent:li}],gridItem:ii},pi=e=>{const t=j(e);return()=>t(di)};function vt(e,t={}){const{bau:n,css:o}=e,{dialog:a,div:i}=n.tags,r=o`
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    padding: 1rem;
    border: 0px;
    > div {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-height: 90vh;
      max-width: 95vw;
      & > header {
        font-size: 1.5rem;
        font-weight: 500;
      }
      & > main,
      > section {
        flex-grow: 1;
        overflow-y: auto;
      }
      & > footer {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
        gap: 1rem;
      }
    }

    ${(()=>te.map(c=>`
&.modal.plain.${c} {
  color: inherit;
}
&.modal.outline.${c} {
  color: inherit;
}
&.modal.soft.${c} {
  color: inherit;
}
&.modal.solid.${c} {
}
`).join(`
`))()}
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...m},...h]=G(l);return a({class:N("modal",r,p,d,u,t==null?void 0:t.class,m==null?void 0:m.class)},i(...h))}}const Dn=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r=K(e),c=vt(e),l=()=>o(Array(10).fill("").map((d,p)=>s(p+1,". Some text here"))),u=d=>{const p=c({id:"my-dialog",...d},a("Header"),l(),i(r({variant:"outline",color:d.color,onclick:()=>{p.close()}},"Cancel"),r({variant:"solid",color:d.color,onclick:()=>{p.close()}},"OK")));return p};return d=>{const p=u(d);return n(r({...d,onclick:()=>{p.showModal()}},"OPEN MODAL"),p)}},mi=e=>{const{bau:t}=e,{section:n,main:o,header:a,footer:i,p:s}=t.tags,r="neutral",c=K(e),l=vt(e),u=()=>o(Array(10).fill("").map((p,m)=>s(m+1,". Some text here"))),d=l({id:"my-dialog"},a("Header"),u(),i(c({variant:"outline",color:r,onclick:()=>{d.close()}},"Cancel"),c({variant:"solid",color:r,onclick:()=>{d.close()}},"OK")));return()=>n(c({variant:"solid",color:"neutral",onclick:()=>{d.showModal()}},"OPEN MODAL"),d)},gi=`import modal from "@grucloud/bau-ui/modal";
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
`,bi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:gi,createComponent:mi}],gridItem:Dn},hi=e=>{const t=j(e);return()=>t(bi)},fi=e=>{const{bau:t}=e,{section:n,div:o,h1:a,p:i}=t.tags,s=K(e),r=Ve(e),c=()=>s({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),i("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},vi=`import popover from "@grucloud/bau-ui/popover";
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
`,xi={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:vi,createComponent:fi}]},wi=e=>{const t=j(e);return()=>t(xi)};function yi(e,t={}){const{bau:n,css:o,config:a}=e,{div:i,a:s,span:r,nav:c}=n.tags,l=o`
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: grid;
    grid-area: paginationnav;
    gap: var(--spacing-horizontal);
    grid-template-columns: repeat(2, 1fr);
    & > a {
      padding: 0.5rem 1rem;
      text-decoration: none;
      border: 1px solid var(--color-emphasis-300);
      border-radius: var(--global-radius);
      transition: border-color var(--transition-slow);
      &:hover {
        border-color: var(--color-primary);
      }
      .sublabel {
        color: var(--color-content-secondary);
        font-size: 0.8rem;
        font-weight: var(--font-weight-semibold);
        margin-bottom: 0.25rem;
      }
      .label {
        color: var(--link-color);
        font-size: 1rem;
        font-weight: var(--font-weight-bold);
      }
      .Previous {
        &::before {
          content: "« ";
        }
      }
      .Next {
        &::after {
          content: " »";
        }
      }
    }
  `,u=({text:d})=>({name:p,label:m,href:h})=>s({href:`${a.base}${h}`},r({class:"sublabel"},d),i({class:`label ${d}`},m??p));return function(...p){let[{size:m=t.size??"md",variant:h=t.variant??"plain",color:f=t.color??"neutral",data:w={},...x}]=G(p);const{next:v,previous:S}=w;return c({"data-paginationnav":JSON.stringify(w),"aria-label":"pages navigation",...x,class:N("paginationNavigation",m,l,t==null?void 0:t.class,x==null?void 0:x.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(v==null?void 0:v.href)&&u({text:"Next"})(v))}}const Si=e=>{const{bau:t}=e,{section:n}=t.tags,o=yi(e),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},Ci=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const PaginationNavigation = paginationNavigation(context);

  const data = {
    next: {
      name: "next page",
      label: "Popover",
      href: "/components/popover",
    },
    previous: {
      name: "previous page",
      label: "Paper",
      href: "/components/paper",
    },
  };

  return () =>
    section(
      PaginationNavigation({
        variant: "solid",
        color: "primary",
        data,
      })
    );
};
`,ki={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:Ci,createComponent:Si}]},Ei=e=>{const t=j(e);return()=>t(ki)},Ti=(e,t)=>{const{bau:n}=e,{div:o}=n.tags,a=De(e,t);return i=>a({...i},o(`Paper ${t.size??""}`))},Ai=e=>{const{bau:t}=e,{section:n,div:o}=t.tags,a=De(e);return()=>n(a({size:"md"},o("My content")))},Ii=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,Di={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:Ii,createComponent:Ai}],variantColorTableDisable:!0,gridItem:Ti},Ni=e=>{const t=j(e);return()=>t(Di)};function Nn(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>te.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
  `).join(`
`))()}
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p}]=G(c);return a({...p,type:"radio",class:N("radio-button",l,d,u,s,t==null?void 0:t.class,p==null?void 0:p.class)})}}const Mn=(e,t)=>{const{bau:n,css:o}=e,{label:a,form:i}=n.tags,s=Nn(e,t);return r=>i({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},a("off ",s({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",s({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},Mi=e=>{const{bau:t}=e,{label:n,div:o,form:a}=t.tags,i=Nn(e),s=t.state("one"),r=({target:c})=>s.val=c.id;return()=>a(n("One",i({id:"one",name:"radio",checked:!0,value:s,oninput:r})),n("Two",i({id:"two",name:"radio",value:s,oninput:r})),o("Choice: ",s))},$i=`import radioButton from "@grucloud/bau-ui/radioButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { label, div, form } = bau.tags;
  const RadioButton = radioButton(context);

  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  return () =>
    form(
      label(
        "One",
        RadioButton({
          id: "one",
          name: "radio",
          checked: true,
          value: checkedState,
          oninput,
        })
      ),
      label(
        "Two",
        RadioButton({
          id: "two",
          name: "radio",
          value: checkedState,
          oninput,
        })
      ),
      div("Choice: ", checkedState)
    );
};
`,Bi={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:$i,createComponent:Mi}],gridItem:Mn},Pi=e=>{const t=j(e);return()=>t(Bi)},Li=()=>te.map(e=>`
& button.plain.${e}::after {
  color: var(--color-${e});
}
& button.outline.${e}::after {
  color: var(--color-${e});
}
`).join(`
`);function Ke(e,t={}){const{bau:n,css:o}=e,{div:a,li:i,select:s,option:r}=n.tags,c=K(e),l=Ve(e),u=ve(e),d=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
        padding: 0.3rem;
      }
    }
    ${Li()}
  `;return function(...m){let[{size:h=t.size??"md",variant:f=t.variant??"outline",color:w=t.color??"neutral",label:x,Option:v,options:S,getOptionLabel:E=({label:k})=>k,...A},...M]=G(m);const T=n.state(A.value),I=n.state(!1),D=n.state(0),O=()=>{b.openDialog(),b.focus(),I.val=!0},U=()=>{b.closeDialog(),I.val=!1},Q=()=>{I.val=!1},V=k=>{b.open?U():O(),k.preventDefault()},X=({option:k,index:L})=>B=>{T.val=E(k),C.value=T.val,C.setCustomValidity(""),D.val=L,U(),B.preventDefault()},_=k=>{switch(k.preventDefault(),k.key){case"Escape":U();break;case"ArrowDown":D.val<S.length-1?D.val++:D.val=0;break;case"ArrowUp":D.val<=0?D.val=S.length-1:D.val--;break;case"Enter":b.open?(T.val=E(S[D.val]),U()):O();break}},y=()=>u({tabindex:"0",class:N(w,f)},S.map((k,L)=>i({class:()=>N(D.val==L&&"active"),onclick:X({option:k,index:L})},v(k)))),g=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":I,"aria-label":x,onclick:V,color:w,variant:f,size:h},()=>!T.val&&x,T),b=l({triggerEl:g,contentEl:y(),onClose:Q}),C=s(A,r({value:""},"--Select Category--"),S.map(k=>r(E(k))));return C.value=A.value,a({...A,class:N("select",w,h,d,t==null?void 0:t.class,A==null?void 0:A.class),onkeydown:_},C,g,b)}}const $n=(e,t)=>{const{bau:n,css:o}=e,{div:a,span:i}=n.tags,s=Ke(e,t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return l=>s({...l,options:r,Option:c,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Oi=e=>{const{bau:t,css:n}=e,{section:o,div:a,span:i}=t.tags,s=Ke(e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},i(l.label),i(l.code));return()=>o(s({options:r,Option:c,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},zi=`import select from "@grucloud/bau-ui/select";
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
`,_i=e=>{const{bau:t}=e,{span:n,form:o}=t.tags,a=Ke(e),i=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],s=r=>n({},r);return()=>o(a({options:i,Option:s,label:"Select a region",getOptionLabel:r=>r}))},Ri=`import select from "@grucloud/bau-ui/select";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { span, form } = bau.tags;

  const Select = select(context);

  const options: any = [
    "eu-north-1",
    "ap-south-1",
    "eu-west-3",
    "eu-west-2",
    "eu-west-1",
    "ap-northeast-3",
    "ap-northeast-2",
    "ap-northeast-1",
    "sa-east-1",
    "ca-central-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "eu-central-1",
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
  ];

  const Option = (option: any) => span({}, option);

  return () =>
    form(
      Select({
        options,
        Option,
        label: "Select a region",
        getOptionLabel: (label: any) => label,
      })
    );
};
`,ji={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:zi,createComponent:Oi},{title:"Select AWS region",description:"Select the AWS region",code:Ri,createComponent:_i}],gridItem:$n},Hi=e=>{const t=j(e);return()=>t(ji)};function Bn(e,t={}){const{bau:n,css:o}=e,{select:a}=n.tags,i=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",...d},...p]=G(r);return a({...d,class:N("select-native",u,c,l,i,t==null?void 0:t.class,d==null?void 0:d.class)},p)}}const Pn=(e,t)=>{const{bau:n}=e,{option:o}=n.tags,a=Bn(e,t),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return s=>a(s,i.map(({label:r,phone:c})=>o({value:c},r)))},Gi=e=>{const{bau:t}=e,{section:n,option:o}=t.tags,a=Bn(e),i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(i.map(({label:s,phone:r})=>o({value:r},s))))},Ui=`import selectNative from "@grucloud/bau-ui/selectNative";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, option } = bau.tags;

  const SelectNative = selectNative(context);

  const phoneOptions = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
  ];

  return () =>
    section(
      SelectNative(
        phoneOptions.map(({ label, phone }) => option({ value: phone }, label))
      )
    );
};
`,Fi={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Ui,createComponent:Gi}],gridItem:Pn},Wi=e=>{const t=j(e);return()=>t(Fi)};function xt(e,t={}){const{bau:n,css:o,keyframes:a}=e,{div:i}=n.tags,s=a`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  `,r=o`
    background-color: var(--color-emphasis-200);
    position: relative;
    overflow: hidden;
    &::after {
      animation: 2s linear 0.5s infinite normal none running ${s};
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      content: "";
      position: absolute;
      transform: translateX(-100%);
      inset: 0px;
    }
  `;return function(...l){let[{size:u=t.size??"md",variant:d=t.variant??"plain",color:p=t.color??"neutral",...m},...h]=G(l);return i({...m,class:N("skeleton",u,r,t==null?void 0:t.class,m==null?void 0:m.class)},...h)}}const Vi=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=xt(e),s=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},i({class:n`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        `}),new Array(4).fill("").map(()=>i({class:n`
            border-radius: 5px;
            width: 100%;
            height: 2rem;
          `})));return()=>o(s())},Ki=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const Skeleton = skeleton(context);
  const CardSkeleton = () =>
    div(
      {
        class: css\`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        \`,
      },
      Skeleton({
        class: css\`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        \`,
      }),
      new Array(4).fill("").map(() =>
        Skeleton({
          class: css\`
            border-radius: 5px;
            width: 100%;
            height: 2rem;
          \`,
        })
      )
    );

  return () => section(CardSkeleton());
};
`,Xi=e=>{const{bau:t,css:n}=e,{section:o,div:a}=t.tags,i=xt(e),s=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},new Array(4).fill("").map(()=>a({class:n`
              display: flex;
              gap: 1rem;
              align-items: center;
            `},i({class:n`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            `}),i({class:n`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            `}))));return()=>o(s())},qi=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div } = bau.tags;

  const Skeleton = skeleton(context);
  const ListSkeleton = () =>
    div(
      {
        class: css\`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        \`,
      },
      new Array(4).fill("").map(() =>
        div(
          {
            class: css\`
              display: flex;
              gap: 1rem;
              align-items: center;
            \`,
          },
          Skeleton({
            class: css\`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            \`,
          }),
          Skeleton({
            class: css\`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            \`,
          })
        )
      )
    );

  return () => section(ListSkeleton());
};
`,Zi=e=>{const{bau:t,css:n}=e,{section:o,table:a,tbody:i,tr:s,td:r}=t.tags,c=xt(e,{class:n`
      height: 2rem;
      width: 10rem;
    `}),l=()=>a(i(new Array(8).fill("").map(()=>s(r(c({class:n`
                  width: 5rem;
                `})),r(c()),r(c()),r(c()),r(c({class:n`
                  width: 20rem;
                `}))))));return()=>o(l())},Yi=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, table, tbody, tr, td } = bau.tags;

  const Skeleton = skeleton(context, {
    class: css\`
      height: 2rem;
      width: 10rem;
    \`,
  });

  const TableSkeleton = () =>
    table(
      tbody(
        new Array(8).fill("").map(() =>
          tr(
            td(
              Skeleton({
                class: css\`
                  width: 5rem;
                \`,
              })
            ),
            td(Skeleton()),
            td(Skeleton()),
            td(Skeleton()),
            td(
              Skeleton({
                class: css\`
                  width: 20rem;
                \`,
              })
            )
          )
        )
      )
    );

  return () => section(TableSkeleton());
};
`,Ji={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Ki,createComponent:Vi},{title:"List",description:"A list skeleton.",code:qi,createComponent:Xi},{title:"Table",description:"A table skeleton.",code:Yi,createComponent:Zi}],variantColorTableDisable:!0,variantSizeDisable:!0},Qi=e=>{const t=j(e);return()=>t(Ji)};function Xe(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,s=o`
    ${(()=>te.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"plain",color:d=t.color??"neutral",...p},...m]=G(c);return a({...p,type:"range",class:N("slider",d,u,l,s,t==null?void 0:t.class,p.class)},...m)}}const Ln=e=>{const{bau:t}=e,n=t.state(0),o=i=>{n.val=i==null?void 0:i.target.value},a=Xe(e);return i=>a({...i,oninput:o})},ec=e=>{const{bau:t}=e,{section:n,form:o,label:a,br:i}=t.tags,s=t.state(0),r=l=>{s.val=l==null?void 0:l.target.value},c=Xe(e);return()=>n(o(a("Slider with step, min and max",i,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},tc=`import slider from "@grucloud/bau-ui/slider";
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
`,nc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Xe(e);return()=>o(a(i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),s({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},oc=`import slider from "@grucloud/bau-ui/slider";
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
`,ac=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i,datalist:s,br:r,option:c}=t.tags,l=t.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Xe(e);return()=>o(a({class:n`
            display: flex;
          `},i({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),s({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},rc=`import slider from "@grucloud/bau-ui/slider";
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
`,sc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:tc,createComponent:ec},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:oc,createComponent:nc},{title:"Vertical Mark",description:"A vertical slider with marks.",code:rc,createComponent:ac}],gridItem:Ln},ic=e=>{const t=j(e);return()=>t(sc)},On=(e,t)=>{const n=Me(e,t);return o=>n({...o})},cc=e=>{const{bau:t}=e,{section:n}=t.tags,o=K(e),a=Me(e,{size:"lg"}),i=t.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),a({visibility:i}))},lc=`import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Button = button(context);
  const Spinner = spinner(context, { size: "lg" });

  const runningState = bau.state(true);

  return () =>
    section(
      Button(
        {
          variant: "solid",
          color: "primary",
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      Spinner({ visibility: runningState })
    );
};
`,uc={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:lc,createComponent:cc}],gridItem:On},dc=e=>{const t=j(e);return()=>t(uc)},pc=()=>te.map(e=>`
`).join(`
`);function zn(e,t={}){const{bau:n,css:o}=e,{div:a,ul:i,li:s,span:r}=n.tags,c=o`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0;
      list-style: none;
      & > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        flex-grow: 1;
        padding: 0.5rem;
        padding-bottom: 0rem;
        color: inherit;
        font-weight: var(--font-weight-semibold);
        transition: all var(--transition-slow) ease-in-out;
        background-color: var(--background-color);
        overflow: hidden;
        & .step-number {
          background-color: var(--color-primary);
          color: var(--font-color-inverse);
          height: 1.5rem;
          width: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
        }
        & .step-label {
          text-align: center;
        }
      }
      & .not-completed {
        & .step-number {
          background-color: var(--color-neutral);
        }
        & .step-label {
          color: var(--font-color-secondary);
        }
      }
      & .completed {
        & .step-number {
          background-color: var(--color-success);
        }
      }

      & .active {
        filter: brightness(var(--brightness-active));
      }
      & .disabled {
        cursor: not-allowed;
        font-style: italic;
        transform: none;
      }
    }
    ${pc()}
  `;return function(...u){let[{color:d,variant:p="plain",size:m,stepperDefs:h=[],activeStepIndex:f,...w},...x]=G(u);const v=n.state(h.map((M,T)=>({...M,index:T}))),S=n.derive(()=>v.val[f.val]),E=M=>{const{Header:T,disabled:I,name:D,index:O}=M;return s({class:()=>N(S.val.name==D&&"active",f.val<O&&"not-completed",f.val>O&&"completed",I&&"disabled")},r({class:"step-number"},O+1),r({class:"step-label"},()=>T(M)))};return a({class:N("stepper",p,m,d,c,t==null?void 0:t.class,w.class)},n.loop(v,i(),E),n.bind({deps:[S],render:()=>M=>M.Content?M.Content({}):""}))}}const mc=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=zn(e),r=K(e),c=({name:h})=>h,l=[{name:"Step 1",Header:c,Content:()=>a(i("My stepper 1 Content"))},{name:"Step 2",Header:c,Content:()=>a(i("My stepper 2 Content"))},{name:"Step 3",Header:c,Content:()=>a(i("My stepper 3 Content"))}],u=t.state(0),d=()=>{u.val>0&&u.val--},p=()=>{l.length>u.val+1&&u.val++},m=()=>a({class:n`
          display: flex;
          justify-content: space-around;
        `},r({onclick:d,variant:"outline",color:"primary"},"Previous"),r({onclick:p,variant:"solid",color:"primary"},"Next"));return()=>o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:l,activeStepIndex:u}),m())},gc=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, p } = bau.tags;
  const Stepper = stepper(context);
  const Button = button(context);

  const Header = ({ name }: any) => name;

  const stepperDefs: StepperPage[] = [
    {
      name: "Step 1",
      Header,
      Content: () => div(p("My stepper 1 Content")),
    },
    {
      name: "Step 2",
      Header,
      Content: () => div(p("My stepper 2 Content")),
    },
    {
      name: "Step 3",
      Header,
      Content: () => div(p("My stepper 3 Content")),
    },
  ];

  const activeStepIndex = bau.state(0);

  const onclickPrevious = () => {
    if (activeStepIndex.val > 0) {
      activeStepIndex.val--;
    }
  };

  const onclickNext = () => {
    if (stepperDefs.length > activeStepIndex.val + 1) {
      activeStepIndex.val++;
    }
  };

  const Buttons = () =>
    div(
      {
        class: css\`
          display: flex;
          justify-content: space-around;
        \`,
      },
      Button(
        { onclick: onclickPrevious, variant: "outline", color: "primary" },
        "Previous"
      ),
      Button(
        { onclick: onclickNext, variant: "solid", color: "primary" },
        "Next"
      )
    );

  return () =>
    section(
      {
        class: css\`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      Stepper({ stepperDefs, activeStepIndex }),
      Buttons()
    );
};
`,bc=e=>{const{bau:t,css:n,config:o}=e,{section:a,div:i,h1:s}=t.tags,{svg:r,use:c}=t.tagsNS("http://www.w3.org/2000/svg"),l=K(e,{variant:"outline",color:"primary"});return function({onclickProvider:d}){return a(s("Provider selection"),i({class:n`
            display: flex;
            flex-direction: column;
            gap: 1rem;
          `},l({"data-button-select-aws":!0,onclick:d("AWS")},r({width:118,height:90,viewBox:"0 0 118 70",fill:"currentColor"},c({href:`${o.base}/aws.svg#aws`}))),l({"data-button-select-azure":!0,onclick:d("Azure")},r({width:261,height:90,fill:"currentColor"},c({href:`${o.base}/azure.svg#azure`}))),l({"data-button-select-google":!0,onclick:d("Google")},r({width:300,height:90,viewBox:"0 0 473 75",fill:"currentColor"},c({href:`${o.base}/gcp.svg#gcp`})))))}},qe=e=>{const{bau:t,css:n}=e,{footer:o}=t.tags;return function(...i){return o({class:n`
          display: flex;
          gap: 1rem;
        `},...i)}},Ze=e=>{const{bau:t}=e,{i:n}=t.tags,o=K(e);return function({onclick:i}){return o({onclick:i,variant:"outline",color:"primary"},n("◀"),"Previous")}},le="https://github.com/grucloud/grucloud/",ue="main",hc={AWS:[{title:"EC2 an instance with public address",description:"Deploy a EC2 virtual machine attached to an elastic public address",url:le,branch:ue,directory:"examples/aws/ec2"},{title:"EKS",description:"Deploy a kubernetes cluster with EKS",url:le,branch:ue,directory:"examples/aws/EKS/eks-simple"},{title:"Route53 TXT Record",description:"Create an Hosted Zone and a TXT record",url:le,branch:ue,directory:"examples/aws/route53/dns-validation-record-txt"}],Azure:[{title:"Virtual machine",description:"Deploy a virtual machine with a public address, protected by a firewall",url:le,branch:ue,directory:"examples/azure/Compute/vm"}],Google:[{title:"Virtual machine",description:"Deploy a virtual machine on the default network",resources:["compute.instance"],url:le,branch:ue,directory:"examples/google/vm"},{title:"Virtual machine inside a network",description:"Create a network, a sub-network, a virtual machine and firewall rules for HTTP/HTTPS",url:le,branch:ue,directory:"examples/google/vm-network",resources:["compute.network","compute.subnetwork","compute.subnetwork"]},{title:"Secure static website",description:"Deploy a static website served with HTTPS",url:le,branch:ue,directory:"examples/google/storage/website-https"},{title:"DNS records",description:"Manages DNS records such as A, CNAME, TXT and MX records",url:le,branch:ue,directory:"examples/google/dns/github-page"}]},fc=e=>{const{bau:t,css:n}=e,{li:o,strong:a,span:i}=t.tags;return function({project:r,onclickItem:c}){return o({onclick:c(r),class:n`
          flex-direction: column;
          align-items: flex-start;
        `},a(r.title),i(r.description))}},vc=e=>{const{bau:t,css:n}=e,{strong:o,small:a}=t.tags,i=K(e);return function({item:r,onclickItem:c}){return i({onclick:c(r),class:n`
          &.button {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 1rem;
          }
        `},o(r.title),a(r.description))}},xc=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,footer:s}=t.tags,r=K(e),c=$e(e),l=Ze(e),u=qe(e),d=vc(e),p=fc(e),m=ve(e),h=vt(e);return function({providerName:w,onclickPrevious:x,onclickImportExistingInfra:v,onclickImportFromTemplate:S}){const E=h({id:"my-dialog"},a("Infrastructure from template"),i("Select an infrastructure template from the list below."),n(m(hc[w].map(A=>p({project:A,onclickItem:M=>()=>{E.close(),S(M)}})))),s(r({variant:"outline",onclick:()=>{E.close()}},"Cancel")));return c({name:"form-import-project","data-form-import-project":!0},a(o("Import Project"),i("")),n(d({"data-selection-project-import-existing":!0,item:{title:"Import an existing infrastructure",description:"Choose this option to visualize an existing infrastructure."},onclickItem:()=>()=>{v()}}),d({"data-selection-project-new-from-template":!0,item:{title:"Create new infrastructure from a template",description:"This option lets you create an infrastructure from a selection of ready made template."},onclickItem:()=>()=>{E.showModal()}})),E,u(l({onclick:x})))}},wc=e=>{const{bau:t}=e,{span:n}=t.tags,o=Ke(e),a=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=s=>n(s);return function(r){return o({required:"required",title:"Select an AWS region",oninvalid:c=>{c.target.setCustomValidity("Please select an AWS region")},Option:i,options:a,label:"Select region",getOptionLabel:c=>c,...r})}},yc=e=>{const{bau:t}=e,{section:n,h1:o,header:a,p:i,label:s,i:r}=t.tags,c=K(e),l=xe(e),u=$e(e),d=Ze(e),p=qe(e),m=wc(e);return function({onclickPrevious:f,onclickNext:w}){return u({name:"form-config-aws",onsubmit:v=>{v.preventDefault(),w()},"data-infra-create":!0},a(o("AWS Configuration"),i("Please provide the following information to create and scan a new infrastructure")),n(s("Infrastructure Name",l({autofocus:!0,placeholder:"Infrastructure Name",name:"infraName",pattern:String.raw`\w{3,64}`,title:"Length should be greater than 3 and below 64",required:!0})),s("Access Key Id",l({placeholder:"Access Key Id",name:"accessKeyId",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Secret Key",l({type:"password",placeholder:"Secret Key",name:"secretKey",pattern:String.raw`\w{16,128}`,title:"Length should be greater than 16 and below 128",required:!0})),s("Region",m({name:"region"}))),p(d({onclick:f}),c({type:"submit",variant:"outline",color:"primary"},"Next",r("▶"))))}},Sc=e=>{const{bau:t,css:n}=e,{section:o,h1:a,header:i,p:s,label:r,i:c,ol:l,li:u,h3:d,pre:p,em:m,div:h}=t.tags,f=K(e),w=Ze(e),x=qe(e),v=xe(e),S=$e(e);return function({onclickPrevious:A,onclickNext:M}){const T=D=>{D.preventDefault(),M()},I=n`
      & ol {
        list-style: none;
        counter-reset: counter;
        padding-left: 40px;
        > li {
          counter-increment: counter;
          margin: 0 0 0.5rem 0;
          position: relative;
          ::before {
            background-color: var(--color-primary);
            color: var(--font-color-inverse);
            content: counter(counter) ".";
            font-weight: bold;
            position: absolute;
            --size: 32px;
            left: calc(-1 * var(--size) - 10px);
            line-height: var(--size);
            width: var(--size);
            height: var(--size);
            top: 0;
            border-radius: 50%;
            text-align: center;
          }
        }
      }
    `;return S({name:"form-config-azure",onsubmit:T,"data-infra-create":!0,class:I},i(a("Azure Configuration"),s("Please follow the instructions to setup a service principal used by Grucloud to scan an Azure infrastructure.")),o(l(u(d("Subscription Id"),s("Retrieve the ",m("Subscription Id")," with the following command:"),p("az account show --query id -otsv"),r("Subscription Id",v({"data-input-azure-subscription-id":!0,autofocus:!0,placeholder:"Subscription Id",name:"subscriptionId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("Tenant Id"),s("Retrieve the ",m("Tenant Id")," with the following command:"),p("az account show"),r("Tenant Id",v({"data-input-azure-tenant-id":!0,placeholder:"Tenant Id",name:"tenantId",minLength:36,maxLength:36,size:36,required:!0}))),u(d("App ID and PASSWORD"),s("Retrieve the ",m("APP_ID")," and ",m("PASSWORD")," by creating a service principal called grucloud:"),p('az ad sp create-for-rbac -n "grucloud"'),h({class:n`
                  display: inline-flex;
                  flex-direction: column;
                  gap: 1rem;
                `},r("App Id",v({"data-input-azure-app-id":!0,placeholder:"App Id",name:"appId",minLength:36,maxLength:36,size:36,required:!0})),r("Password",v({"data-input-azure-password":!0,type:"password",placeholder:"Password",name:"password",minLength:8,maxLength:64,size:64,required:!0})))))),x(w({onclick:A}),f({type:"submit",variant:"outline",color:"primary"},"Next",c("▶"))))}},Cc=e=>{const{bau:t,css:n,config:o}=e,{section:a,h1:i,header:s,p:r,div:c,i:l,ol:u,li:d,span:p,em:m,a:h,table:f,tbody:w,th:x,tr:v,td:S}=t.tags,{svg:E,use:A}=t.tagsNS("http://www.w3.org/2000/svg"),M=ht(e),T=K(e),I=$e(e),D=Ze(e),O=qe(e);return function({onclickPrevious:Q,onclickNext:V}){const X=t.state("No file selected"),_=t.state({}),y=t.state(!0),g=B=>{const F=B.target.files[0];if(F){X.val=F.name;const R=new FileReader;R.readAsText(F),R.onload=()=>{try{debugger;if(R.result){const z=JSON.parse(R.result);_.val=z,z.project_id&&(y.val=!1)}}catch{}},R.onerror=()=>{console.log(R.error)}}else X.val=""},b=({fileName:B,content:F})=>f({class:n`
            border-collapse: collapse;
            & td,
            th {
              border-top: 1px solid var(--color-emphasis-100);
              border-bottom: 1px solid var(--color-emphasis-100);
              padding: 0.5rem;
              text-align: left;
            }
          `},w(v(x("Credential File"),S(B)),v(x("Project Name"),S(F.project_id)),v(x("Service Account"),S(F.client_email)))),C=({})=>c({class:n`
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `},E({width:100,height:100,fill:"currentColor"},A({href:`${o.base}/uploadIcon.svg#Capa_1`})),p("Choose a GCP credential file to upload")),k=B=>{B.preventDefault(),V()},L=n`
      & ol {
        & > li {
          padding: 0.3rem 0;
        }
      }
    `;return I({name:"form-config-google",class:L,onsubmit:k,"data-infra-create":!0},s(i("Google Configuration"),r("GruCloud requires a read-only service account to scan a project's architecture. Please select the service account credential JSON file for the project that will be scanned. Follow the following steps to create and upload this file.")),a(u(d("Visit the ",h({href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank"},"service account page")," on the google cloud console"),d("Select your project"),d("Click on ",m("CREATE SERVICE ACCOUNT"),""),d("Set the ",m("Service account name")," to 'grucloud' for instance"),d("Click on ",m("CREATE"),""),d("Select the basic role 'Viewer'"),d("Click on ",m("CONTINUE"),""),d("Click on ",m("DONE"),""),d("Go to the ",m("Actions")," column, click on the three dot icon of the newly created service account"),d("Click on ",m("Manage keys"),""),d("Click on ",m("ADD KEYS"),", then ",m("Create new key"),""),d("Click on ",m("CREATE")," to download the credential file in JSON format.")),M({"data-input-google-upload":!0,Component:C,name:"file",accept:"application/JSON",onchange:g}),()=>b({fileName:X.val,content:_.val})),O(D({onclick:Q}),()=>T({type:"submit",variant:"outline",color:"primary",disabled:y.val},"Next",l("▶"))))}},kc=e=>{const{bau:t,css:n}=e,{section:o,div:a,p:i}=t.tags,s=zn(e),r=bc(e),c=yc(e),l=Sc(e),u=Cc(e),d=xc(e),p=t.state(""),m=t.state(0),h=({name:f})=>f;return function(){const w=T=>()=>{p.val=T,m.val++},x=()=>{m.val++},v=()=>{m.val++},E=[{name:"Provider Selection",Header:h,Content:()=>r({onclickProvider:w}),enter:async()=>{p.val=""}},{name:"Import",Header:()=>"Import Project",Content:()=>d({providerName:p.val,onclickPrevious:A,onclickImportExistingInfra:x,onclickImportFromTemplate:v})},{name:"Configuration",Header:()=>`Configuration ${p.val}`,Content:()=>{switch(p.val){case"AWS":return c({onclickPrevious:A,onclickNext:M});case"Azure":return l({onclickPrevious:A,onclickNext:M});case"Google":return u({onclickPrevious:A,onclickNext:M})}}},{name:"Scan",Header:h,Content:()=>a(i("My stepper 3 Content"))}],A=()=>{m.val>0&&m.val--},M=()=>{E.length>m.val+1&&m.val++};return o({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `},s({stepperDefs:E,activeStepIndex:m}))}},Ec=`import stepper, { type StepperPage } from "@grucloud/bau-ui/stepper";
import { Context } from "@grucloud/bau-ui/context";

import stepStepProviderSelection from "./cloud-config/stepProviderSelection";
import importProject from "./cloud-config/importProject";

import configAws from "./cloud-config/configAws";
import configAzure from "./cloud-config/configAzure";
import configGoogle from "./cloud-config/configGoogle";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, p } = bau.tags;
  const Stepper = stepper(context);
  const StepProviderSelection = stepStepProviderSelection(context);
  const ConfigAws = configAws(context);
  const ConfigAzure = configAzure(context);
  const ConfigGoogle = configGoogle(context);
  const ImportProject = importProject(context);

  const providerNameState = bau.state("");
  const activeStepIndex = bau.state(0);

  // For testing
  // const providerNameState = bau.state("AWS");
  // const activeStepIndex = bau.state(1);

  const Header = ({ name }: any) => name;

  return function StepperCloudConfig() {
    const onclickProvider = (providerName: string) => () => {
      providerNameState.val = providerName;
      activeStepIndex.val++;
    };

    const onclickImportExistingInfra = () => {
      activeStepIndex.val++;
    };

    const onclickImportFromTemplate = () => {
      //TODO
      activeStepIndex.val++;
    };

    const ConfigPage = () => {
      switch (providerNameState.val) {
        case "AWS":
          return ConfigAws({ onclickPrevious, onclickNext });
        case "Azure":
          return ConfigAzure({ onclickPrevious, onclickNext });
        case "Google":
          return ConfigGoogle({ onclickPrevious, onclickNext });
        default:
          break;
      }
    };

    const stepperDefs: StepperPage[] = [
      {
        name: "Provider Selection",
        Header,
        Content: () => StepProviderSelection({ onclickProvider }),
        enter: async () => {
          providerNameState.val = "";
        },
      },
      {
        name: "Import",
        Header: () => "Import Project",
        Content: () =>
          ImportProject({
            providerName: providerNameState.val,
            onclickPrevious,
            onclickImportExistingInfra,
            onclickImportFromTemplate,
          }),
      },
      {
        name: "Configuration",
        Header: () => \`Configuration \${providerNameState.val}\`,
        Content: ConfigPage,
      },
      {
        name: "Scan",
        Header,
        Content: () => div(p("My stepper 3 Content")),
      },
    ];

    const onclickPrevious = () => {
      if (activeStepIndex.val > 0) {
        activeStepIndex.val--;
      }
    };

    const onclickNext = () => {
      if (stepperDefs.length > activeStepIndex.val + 1) {
        activeStepIndex.val++;
      }
    };

    return section(
      {
        class: css\`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      Stepper({ stepperDefs, activeStepIndex })
    );
  };
};
`,Tc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Simple Stepper",description:"A simple stepper.",code:gc,createComponent:mc},{title:"Cloud Config Stepper",description:"Configure cloud provider",code:Ec,createComponent:kc}]},Ac=e=>{const t=j(e);return()=>t(Tc)},Ic=()=>te.map(e=>`
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
`);function _n(e,t={}){const{bau:n,css:o}=e,{input:a}=n.tags,i=o`
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
    ${Ic()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"plain",color:u=t.color??"neutral",...d},...p]=G(r);return a({...d,class:N("switch",i,u,l,c,t==null?void 0:t.class,d.class),type:"checkbox",required:"required"},...p)}}const Rn=(e,t)=>{const{bau:n,css:o}=e,{form:a,label:i}=n.tags,s=_n(e,t);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},i("off ",s({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),i("on ",s({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},Dc=e=>{const{bau:t,css:n}=e,{section:o,form:a,label:i}=t.tags,s=_n(e);return()=>o(a(i({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",s({variant:"outline",id:"my-shinny-switch"}))))},Nc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,Mc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:Nc,createComponent:Dc}],gridItem:Rn},$c=e=>{const t=j(e);return()=>t(Mc)},Bc=()=>te.map(e=>`
&.tabs.solid.${e} {
}
`).join(`
`);function Be(e,t={}){const{bau:n,css:o,window:a}=e,{tabDefs:i}=t,{div:s,ul:r,li:c}=n.tags,l=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      list-style: none;
      & li {
        & > a {
          color: inherit;
          text-decoration: none;
        }
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
          background-color: var(--color-emphasis-200);
          &::after {
            transform: translateY(0%);
          }
        }
        &::after {
          transition: var(--transition-fast) ease-in-out;
          transform: translateY(100%);
          background: var(--color-primary-light);
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
        pointer-events: none;
        transform: none;
        &:hover {
          border: none;
        }
      }
    }
    ${Bc()}
  `;return function(...d){let[{size:p=t.size??"md",variant:m=t.variant??"outline",color:h=t.color??"neutral",...f},...w]=G(d);const x=n.state(i),v=a.location.hash.slice(1),S=T=>x.val.find(I=>I.name==T),E=n.state(S(v)??i[0]),A=T=>{const{Header:I,disabled:D,name:O}=T;return c({class:()=>N(E.val.name==O&&"active",D&&"disabled"),onclick:U=>U.srcElement.dispatchEvent(new CustomEvent("tab.select",{detail:{tabName:O},bubbles:!0}))},I(T))},M=s({class:N("tabs",m,p,h,l,t==null?void 0:t.class,f.class)},n.loop(x,r(),A),()=>E.val.Content?E.val.Content(f):"");return M.addEventListener("tab.select",T=>{var O,U;const{tabName:I}=T.detail,D=S(I);D&&((O=E.val.exit)==null||O.call(),E.val=D,(U=D.enter)==null||U.call())},!1),M.addEventListener("tab.add",T=>{var D;const{tab:I}=T.detail;(D=I.enter)==null||D.call(),x.val.push(I)},!1),M.addEventListener("tab.remove",T=>{var D;const I=x.val.findIndex(O=>O.name==T.detail.tabName);I>0&&((D=x.val[I].exit)==null||D.call(),x.val.splice(I,1))},!1),M}}const jn=(e,t)=>{const{bau:n}=e,{div:o,p:a}=n.tags,s=Be(e,{tabDefs:[{name:"Tab1",Header:()=>o("TAB"),Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>o("TAB 2"),Content:()=>o(a("My tab 2 Content"))}],...t});return r=>s(r)},Pc=e=>{const{bau:t}=e,{div:n,p:o,a}=t.tags,s=Be(e,{tabDefs:[{name:"Tab1",Header:()=>a({href:"#Tab1"},"TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>a({href:"#Tab2"},"TAB 2"),Content:()=>n(o("My tab 2 Content"))}],variant:"outline",color:"neutral"});return()=>s({})},Lc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p, a } = bau.tags;

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => a({ href: "#Tab1" }, "TAB"),
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => a({ href: "#Tab2" }, "TAB 2"),
      Content: () => div(p("My tab 2 Content")),
    },
  ];

  const Tabs = tabs(context, { tabDefs, variant: "outline", color: "neutral" });

  return () => Tabs({});
};
`,Oc=e=>{const{bau:t}=e,{div:n,p:o}=t.tags,i=Be(e,{tabDefs:[{name:"Tab1",Header:()=>n("TAB 1"),Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>n("Tab Disabled"),Content:()=>n(o("My Content Disabled"))}]});return()=>i({variant:"outline",color:"success"})},zc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Hn=e=>{const{bau:t}=e,{div:n,p:o}=t.tags;return[{name:"Tab1",Header:()=>n("TAB"),Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>n("TAB 2"),Content:()=>n(o("My tab 2 Content"))}]},_c=e=>{const{css:t}=e,n=Be(e,{tabDefs:Hn(e)});return()=>n({variant:"outline",color:"neutral",class:t`
        flex-direction: column-reverse;
      `})},Rc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,jc=e=>{const{css:t}=e,n=Hn(e),o=Be(e,{tabDefs:n});return()=>o({variant:"outline",color:"neutral",class:t`
        & ul {
          justify-content: center;
        }
      `})},Hc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Gc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Lc,createComponent:Pc},{title:"Extended Tabs",description:"An extended tabs.",code:zc,createComponent:Oc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Rc,createComponent:_c},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Hc,createComponent:jc}],gridItem:jn},Uc=e=>{const t=j(e);return()=>t(Gc)};function Pe(e,t){const{bau:n,css:o,createGlobalStyles:a}=e,{div:i}=n.tags;a`
  :root {
    --table-cell-padding: 0.75rem;
    --table-background: transparent;
    --table-stripe-background: rgba(0, 0, 0, 0.03);
    --table-border-width: 1px;
    --table-border-color: var(--color-emphasis-300);
    --table-head-background: inherit;
    --table-head-color: var(--font-color-secondary);
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
    width: fit-content;
  `;return function(...c){let[{...l},...u]=G(c);return i({...l,class:N("table-container",s,t==null?void 0:t.class,l==null?void 0:l.class)},...u)}}const Fc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags;function d(w,x,v,S,E){return{name:w,calories:x,fat:v,carbs:S,protein:E}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],m=({name:w,calories:x})=>s(i(w),i({class:n`
            text-align: right;
          `},x)),h=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=Pe(e,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),h(),l(p.map(m)))))},Wc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function ke(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const Vc=[ke("Frozen yoghurt",159,6,24,4),ke("Ice cream sandwich",237,9,37,4.3),ke("Eclair",262,16,24,6),ke("Cupcake",305,3.7,67,4.3),ke("Gingerbread",356,16,49,3.9)],Kc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:h,calories:f})=>s(i(h),i({class:n`
            text-align: right;
          `},f)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=Pe(e,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(m(r(u("Table Dense"),p(),l(Vc.map(d)))))},Xc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Ee(e,t,n,o,a){return{name:e,calories:t,fat:n,carbs:o,protein:a}}const qc=[Ee("Frozen yoghurt",159,6,24,4),Ee("Ice cream sandwich",237,9,37,4.3),Ee("Eclair",262,16,24,6),Ee("Cupcake",305,3.7,67,4.3),Ee("Gingerbread",356,16,49,3.9)],Zc=e=>{const{bau:t,css:n}=e,{section:o,th:a,td:i,tr:s,table:r,thead:c,tbody:l,caption:u}=t.tags,d=({name:h,calories:f})=>s(i(h),i({class:n`
            text-align: right;
          `},f)),p=()=>c(s(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),m=Pe(e,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(m(r(u("Table Zebra"),p(),l(qc.map(d)))))},Yc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,Jc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:Wc,createComponent:Fc},{title:"Dense",description:"A dense table.",code:Xc,createComponent:Kc},{title:"Zebra",description:"A zebra table.",code:Yc,createComponent:Zc}]},Qc=e=>{const t=j(e);return()=>t(Jc)},el=e=>{const{bau:t,css:n}=e,{h1:o,h2:a,h3:i,section:s,article:r}=t.tags,c=nn(e),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),i({id:"h3-1-1"},"h3 1 1"),i({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),i({id:"h3-2-1"},"h3 2 1"));return()=>s({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},tl=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { h1, h2, h3, section, article } = bau.tags;
  const TableOfContent = tableOfContent(context);

  const contentEl = article(
    {
      id: "content",
      class: css\`
        grid-area: content;
      \`,
    },
    h1({ id: "h1" }, "h1"),
    h2({ id: "h2-1" }, "h2 1"),
    h3({ id: "h3-1-1" }, "h3 1 1"),
    h3({ id: "h3-1-2" }, "h3 1 2"),
    h2({ id: "h2-2" }, "h2 2"),
    h3({ id: "h3-2-1" }, "h3 2 1")
  );

  return () =>
    section(
      {
        class: css\`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        \`,
      },
      contentEl,
      TableOfContent({ contentEl })
    );
};
`,nl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:tl,createComponent:el}]},ol=e=>{const t=j(e);return()=>t(nl)};function Gn(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=bt(e),s=K(e),r=Me(e),c=o`
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
  `,l=({label:h,icon:f,...w})=>s({"aria-label":h,title:h,...w},f),u=({count:h,totalCount:f,page:w,rowsPerPage:x})=>a({class:"pages-numbers"},Number(w-1)*Number(x)+(h>0?1:0),"-",Math.min(w*x,f)," of ",f),d=({count:h,page:f,rowsPerPage:w})=>a({class:"pages-numbers"},(f-1)*w+(h>0?1:0),"-",f*w),p=h=>h<=1,m=(h,f,w)=>h>=Math.ceil(f/w);return function(...f){let[{size:w=t.size??"md",variant:x=t.variant??"outline",color:v=t.color??"neutral",count:S=0,totalCount:E=0,page:A=1,rowsPerPage:M=50,onPageChange:T,isLoading:I=!1,disableFirst:D=()=>p(A),disablePrevious:O=()=>p(A),disableNext:U=()=>m(A,E,M),disableLast:Q=()=>m(A,E,M),...V},...X]=G(f);const _=Math.max(0,Math.ceil(E/M)),y=T({page:1}),g=T({page:A-1}),b=T({page:A+1}),C=T({page:_}),k=[{label:"First",icon:"⟪",onclick:y,disabled:D()},{label:"Previous",icon:"⟨",onclick:g,disabled:O()},{label:"Next",icon:"⟩",onclick:b,disabled:U()},{label:"Last",icon:"⟫",onclick:C,disabled:Q()}];return a({...V,class:N("table-pagination",c,I&&"disabled",t==null?void 0:t.class,V==null?void 0:V.class)},r({class:"spinner",visibility:I,size:"md"}),E>0?u({count:S,totalCount:E,page:A,maxPages:_,rowsPerPage:M}):d({count:S,page:A,maxPages:_,rowsPerPage:M}),i({variant:x,color:v},k.map(L=>l({...L,variant:x,color:v}))))}}const al=(e=1e3)=>new Array(e).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),rl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c}=t.tags,l=al(45),u=({name:v,email:S})=>i(a(v),a(S)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Gn(e),m=Pe(e,{class:n`
      max-width: 650px;
    `}),h=t.state(l),f=t.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),w=t.derive(()=>h.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),x=({page:v})=>S=>{f.val.page=v};return()=>m(s(d(),()=>c(w.val.map(u))),()=>p({...f.val,onPageChange:x}))},sl=e=>{const{bau:t,css:n}=e,{th:o,td:a,tr:i,table:s,thead:r,tbody:c,div:l}=t.tags,u=t.state(!1),d=t.state([]),p=t.state(""),m=t.derive(()=>d.val.length),h=t.state(1),f=t.state(10),w=t.derive(()=>d.val),x=D=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(D).toString()}`,v=({page:D})=>O=>{h.val=D,S(x({page:D,per_page:f.val}))};S(x({page:1,per_page:f.val}));async function S(D){try{u.val=!0;const O=await fetch(D,{});if(O.ok){const U=await O.json();d.val=U;return}throw O}catch(O){p.val=O.message}finally{u.val=!1}}const E=({name:D,description:O,stargazers_count:U})=>i(a(D),a(O),a({class:n`
            text-align: right;
          `},U)),A=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),M=Gn(e),T=Pe(e,{class:n`
      min-width: 650px;
    `}),I=({message:D})=>l(D);return()=>T(()=>M({rowsPerPage:f.val,page:h.val,count:m.val,totalCount:-1,isLoading:u.val,onPageChange:v,disableNext:()=>!1}),s(A(),()=>p.val&&I({message:p.val}),()=>c(w.val.map(E))))},il=e=>{const{bau:t,css:n}=e,{section:o,div:a,h3:i,h2:s,tr:r}=t.tags,c=rl(e),l=sl(e),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},s(r("Table Pagination")),i("Asynchronous Pagination"),u(l()),i("Simple Pagination"),u(c()))};function Le(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{button:i}=n.tags;a`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.2);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.16)
    }
  `;const s=o`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
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
    box-sizing: border-box;
    cursor: pointer;
    &.selected {
      background-color: var(--toggle-background-color);
    }
    &.selected.solid {
      filter: brightness(80%) !important;
    }
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
      padding: 0.2rem 0.8rem;
    }
    &.lg {
      padding: 0.2rem 2rem;
    }
  `;return function(...c){let[{size:l=t.size??"md",variant:u=t.variant??"outline",color:d=t.color??"neutral",selected:p=!1,disabled:m,onChange:h,...f},...w]=G(c);return i({type:"button",...f,"aria-pressed":{deps:[p],renderProp:()=>x=>x},class:{deps:[p],renderProp:()=>x=>N("toggle",l,d,u,s,x&&"selected",t==null?void 0:t.class,f==null?void 0:f.class)},disabled:m},w)}}const Un=(e,t)=>{const{bau:n}=e,o=Le(e,t);return a=>{const i=n.state(!1);return o({...a,selected:i,onclick:()=>i.val=!i.val},"Toggle Me")}},cl=e=>{const{bau:t}=e,{section:n}=t.tags,o=Le(e),a=t.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},ll=`import toggle from "@grucloud/bau-ui/toggle";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Toggle = toggle(context);

  const selectedState = bau.state(false);

  return () =>
    section(
      Toggle(
        {
          variant: "plain",
          selected: selectedState,
          onclick: () => (selectedState.val = !selectedState.val),
        },
        "Toggle Me"
      )
    );
};
`,ul={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:ll,createComponent:cl}],gridItem:Un},dl=e=>{const t=j(e);return()=>t(ul)},pl=()=>te.map(e=>`
&.toggle-group.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${e}) !important;
  }
}

&.toggle-group.outline.${e} {
  border: none;
}

&.toggle-group.solid.${e} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${e}-lightest) !important;
  }
}
`).join(`
`);function wt(e,t={}){const{bau:n,css:o}=e,{div:a}=n.tags,i=o`
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
    ${pl()}
  `;return function(...r){let[{size:c=t.size??"md",variant:l=t.variant??"outline",color:u=t.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...m},...h]=G(r);const f=new Set,w=x=>{const{value:v}=x.target;d?(f.clear(),f.add(v)):f.has(v)?f.delete(v):f.add(v),p({event:x,values:[...f]})};return a({...m,class:N("toggle-group",c,u,l,i,t==null?void 0:t.class,m==null?void 0:m.class),onclick:w},...h)}}const Fn=(e,t)=>{const{bau:n}=e,o=wt(e,t),a=Le(e,t);return i=>{const s=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...i,onChange:({values:l})=>{s.val=l}},r.map(({label:l,value:u})=>()=>a({...i,value:u,selected:s.val.includes(u),"area-label":l},l)))}},ml=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Le(e),s=wt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},gl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const Toggle = toggle(context);
  const ToggleGroup = toggleGroup(context);

  const color = "primary";
  const variant = "solid";

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  return () =>
    section(
      ToggleGroup(
        { color, variant, exclusive: true, onChange },
        groups.map(
          ({ label, value }) =>
            () =>
              Toggle(
                {
                  color,
                  variant,
                  value,
                  selected: selectedState.val.includes(value),
                  "area-label": label,
                },
                label
              )
        )
      )
    );
};
`,bl=e=>{const{bau:t}=e,{section:n}=t.tags,o=t.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],i=Le(e),s=wt(e),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(s({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>i({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},hl=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
import toggle from "@grucloud/bau-ui/toggle";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const selectedState = bau.state([""]);

  const groups = [
    { value: "one", label: "ONE" },
    { value: "two", label: "TWO" },
    { value: "three", label: "THREE" },
  ];

  const Toggle = toggle(context);
  const ToggleGroup = toggleGroup(context);

  const color = "primary";
  const variant = "solid";

  const onChange = ({ values }: any) => {
    selectedState.val = values;
  };

  return () =>
    section(
      ToggleGroup(
        { color, variant, onChange },
        groups.map(
          ({ label, value }) =>
            () =>
              Toggle(
                {
                  color,
                  variant,
                  value,
                  selected: selectedState.val.includes(value),
                  "area-label": label,
                },
                label
              )
        )
      )
    );
};
`,fl={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:gl,createComponent:ml},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:hl,createComponent:bl}],gridItem:Fn},vl=e=>{const t=j(e);return()=>t(fl)};function yt(e,t={}){const{bau:n,css:o,window:a}=e,{div:i}=n.tags,s=o`
    position: relative;
    display: inline-block;
    & .container {
      & .content {
        box-shadow: var(--shadow-m);
        border-radius: var(--global-radius);
        padding: 0.3rem;
      }
      white-space: nowrap;
      position: absolute;
      z-index: 10;
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=t.size??"md",variant:p=t.variant??"outline",color:m=t.color??"neutral",...h},...f]=G(c);const w=i({class:N("container",...u.split("-"))},i({class:N("content",m,p,d),role:"tooltip"},l)),x=T=>`move-to-${T}`,v=(T,I,D)=>{if(T()){const O=x(I);w.classList.add(O),w.classList.add(I),w.classList.remove(D)}},S=(T,I)=>{const D=x(T);w.classList.contains(D)&&(w.classList.remove(D),w.classList.add(I),w.classList.remove(T))},E=T=>{const I=w.getBoundingClientRect();v(()=>I.x<0,"right","left"),v(()=>I.x+I.width>a.innerWidth,"left","right"),v(()=>I.y<0,"bottom","top"),v(()=>I.bottom>a.innerHeight,"top","bottom"),w.classList.add("visible")},A=T=>{w.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return i({...h,class:N("tooltip",s,t==null?void 0:t.class,h==null?void 0:h.class),bauMounted:({element:T})=>{T.addEventListener("mouseover",E),T.addEventListener("mouseout",A)},bauUnmounted:({element:T})=>{T.removeEventListener("mouseover",E),T.removeEventListener("mouseout",A)}},...f,w)}}const Wn=(e,t)=>{const{bau:n}=e,{div:o,p:a,em:i}=n.tags,s=K(e),r=yt(e,t),c=()=>o(a("A ",i("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},s(l,`${l.color} ${l.variant}`))},xl=e=>{const{bau:t}=e,{div:n,p:o,em:a}=t.tags,i=K(e),s=yt(e),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>s({side:"bottom-start",titleEl:r()},i("tooltip"))},wl=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,yl=e=>{const{bau:t,css:n}=e,{div:o,p:a,em:i,section:s}=t.tags,r=Ue(e,{variant:"outline",color:"primary"}),c=yt(e),l=()=>o(a("A ",i("tooltip")," can be any component")),u=()=>s({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        `},o({class:n`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          `},c({side:"top-start",titleEl:l()},r("top-start")),c({side:"top-centered",titleEl:l()},r("top-centered")),c({side:"top-end",titleEl:l()},r("top-end"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-start",titleEl:l()},r("left-start")),c({side:"right-start",titleEl:l()},r("right-start"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-centered",titleEl:l()},r("left-centered")),c({side:"right-centered",titleEl:l()},r("right-centered"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},c({side:"left-end",titleEl:l()},r("left end")),c({side:"right-end",titleEl:l()},r("right end"))),o({class:n`
            display: flex;
            justify-content: space-around;
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},Sl=`import tooltip from "@grucloud/bau-ui/tooltip";
import chip from "@grucloud/bau-ui/chip";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, p, em, section } = bau.tags;

  const Chip = chip(context, { variant: "outline", color: "primary" });

  const Tooltip = tooltip(context);

  const TooltipContent = () =>
    div(p("A ", em("tooltip"), " can be any component"));

  const TooltipGrid = () =>
    section(
      {
        class: css\`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        \`,
      },
      div(
        {
          class: css\`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          \`,
        },
        Tooltip(
          { side: "top-start", titleEl: TooltipContent() },
          Chip("top-start")
        ),
        Tooltip(
          { side: "top-centered", titleEl: TooltipContent() },
          Chip("top-centered")
        ),
        Tooltip({ side: "top-end", titleEl: TooltipContent() }, Chip("top-end"))
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
          Chip("left-start")
        ),
        Tooltip(
          { side: "right-start", titleEl: TooltipContent() },
          Chip("right-start")
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
          Chip("left-centered")
        ),
        Tooltip(
          { side: "right-centered", titleEl: TooltipContent() },
          Chip("right-centered")
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
          Chip("left end")
        ),
        Tooltip(
          { side: "right-end", titleEl: TooltipContent() },
          Chip("right end")
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
          Chip("bottom start")
        ),
        Tooltip(
          { side: "bottom-centered", titleEl: TooltipContent() },
          Chip("bottom centered")
        ),
        Tooltip(
          { side: "bottom-end", titleEl: TooltipContent() },
          Chip("bottom end")
        )
      )
    );
  return () => TooltipGrid();
};
`,Cl={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:wl,createComponent:xl},{title:"Grid",description:"Various tooltip position",code:Sl,createComponent:yl}],gridItem:Wn},kl=e=>{const t=j(e);return()=>t(Cl)},Vn=(e,t)=>{const n=rt(e,t);return o=>n(o)},El=e=>{const{bau:t}=e,{section:n}=t.tags,o=rt(e);return()=>n(o({}))},Tl=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,Al={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:Tl,createComponent:El}],gridItem:Vn},Il=e=>{const t=j(e);return()=>t(Al)},Dl=({css:e,createGlobalStyles:t})=>(t`
:root {
  --treeview-link-padding-horizontal: 0.75rem;
  --treeview-link-padding-vertical: 0.375rem;
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
      background: inherit;

      & > li {
        padding-left: var(--treeview-link-padding-horizontal);
        border-radius: 0.25rem;
        background: inherit;

        & .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: inherit;
          &:hover {
            filter: brightness(var(--brightness-hover));
          }
          & a,
          & span {
            display: flex;
            flex-grow: 1;
            text-decoration: none;
            color: inherit;
            padding: var(--treeview-link-padding-vertical)
              var(--treeview-link-padding-horizontal);
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `});function Kn(e,t={}){const{bau:n,css:o,createGlobalStyles:a}=e,{renderMenuItem:i}=t,{ul:s,li:r,nav:c,div:l}=n.tags,u=Dl({css:o,createGlobalStyles:a}),d=pt(e),p=({depth:m=1,maxDepth:h,color:f,variant:w,size:x})=>v=>{const{children:S,expanded:E}=v,A=n.state(!E),M=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:I=>{S&&(A.val=!A.val)}},i(v.data)),T=()=>s({class:N(f,x)},S.map(p({depth:m+1,maxDepth:h})));return r(d({size:x,Header:M,Content:S&&m<h&&T}))};return function({tree:h,maxDepth:f=1/0,size:w=t.size??"md",variant:x=t.variant??"outline",color:v=t.color??"neutral",...S}){return c({class:N(u.nav,w,x,v,t==null?void 0:t.class,S.class)},h.children&&s(h.children.map(p({maxDepth:f,color:v,variant:x,size:w}))))}}const Xn=(e,t)=>{const{bau:n}=e,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Kn(e,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...t});return r=>s({...r,tree:a})},Nl=e=>{const{bau:t}=e,{a:n}=t.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Kn(e,{renderMenuItem:({name:s,href:r})=>n({href:r},s)});return()=>i({tree:o})},Ml=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,$l={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:Ml,createComponent:Nl}],gridItem:Xn},Bl=e=>{const t=j(e);return()=>t($l)},Pl=e=>{const{bau:t,css:n}=e,{section:o,div:a,h1:i,p:s,ul:r,li:c}=t.tags,l=on(e),u=K(e),d=[{name:"Accordion",Item:an(e)},{name:"Alert",Item:sn(e)},{name:"Autocomplete",Item:un(e)},{name:"Avatar",Item:ln(e)},{name:"Badge",Item:pn(e)},{name:"Breadcrumbs",Item:mn(e)},{name:"Button",Item:gn(e)},{name:"Button Group",Item:bn(e)},{name:"Calendar",Item:fn(e)},{name:"Checkbox",Item:wn(e)},{name:"Chip",Item:vn(e)},{name:"DrillDown Menu",Item:Sn(e,{base:"/components",hashBased:!0})},{name:"File Input",Item:Cn(e)},{name:"Input",Item:kn(e)},{name:"Input Search",Item:En(e)},{name:"Linear Progress",Item:An(e)},{name:"Loading Button",Item:In(e)},{name:"Modal",Item:Dn(e)},{name:"Radio Button",Item:Mn(e)},{name:"Select",Item:$n(e)},{name:"Select Native",Item:Pn(e)},{name:"Slider",Item:Ln(e)},{name:"Spinner",Item:On(e)},{name:"Switch",Item:Rn(e)},{name:"Tabs",Item:jn(e)},{name:"Theme Switch",Item:Vn(e)},{name:"Toggle",Item:Un(e)},{name:"Toggle Group",Item:Fn(e)},{name:"Tooltip",Item:Wn(e)},{name:"Tree View",Item:Xn(e)}];return()=>o({class:n`
          overflow-y: scroll;
        `},i("Bau Component Gallery"),s("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 0;
          `},d.map(({name:p})=>c(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(p))))},Ll=({context:e})=>{const t=Pl(e);return[{path:"",action:n=>({title:"Bau UI",component:Lo(e)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ra(e)})},{path:"components",action:()=>({title:"Component",component:t}),children:[{path:"accordion",action:()=>({title:"Accordion",component:qa(e)})},{path:"alert",action:()=>({title:"Alert",component:or(e)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:cr(e)})},{path:"animate",action:()=>({title:"Animate",component:gr(e)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:Tr(e)})},{path:"avatar",action:()=>({title:"Avatar",component:vr(e)})},{path:"badge",action:()=>({title:"Badge",component:Nr(e)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Or(e)})},{path:"button",action:()=>({title:"Button",component:Gr(e)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:Kr(e)})},{path:"calendar",action:()=>({title:"Calendar",component:Yr(e)})},{path:"carousel",action:()=>({title:"Carousel",component:os(e)})},{path:"chip",action:()=>({title:"Chip",component:is(e)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ds(e)})},{path:"collapsible",action:()=>({title:"Collapsible",component:bs(e)})},{path:"divider",action:()=>({title:"Divider",component:ws(e)})},{path:"drawer",action:()=>({title:"Drawer",component:Es(e)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:Ms(e)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Ls(e)})},{path:"fileInput",action:()=>({title:"File Input",component:Rs(e)})},{path:"form",action:()=>({title:"Form",component:Us(e)})},{path:"input",action:()=>({title:"Input",component:Ks(e)})},{path:"inputSearch",action:()=>({title:"Input Search",component:Ys(e)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:ti(e)})},{path:"list",action:()=>({title:"List",component:pi(e)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:ri(e)})},{path:"modal",action:()=>({title:"Modal",component:hi(e)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:Ei(e)})},{path:"paper",action:()=>({title:"Paper",component:Ni(e)})},{path:"popover",action:()=>({title:"Popover",component:wi(e)})},{path:"radioButton",action:()=>({title:"Radio Button",component:Pi(e)})},{path:"select",action:()=>({title:"Select",component:Hi(e)})},{path:"selectNative",action:()=>({title:"Select Native",component:Wi(e)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Qi(e)})},{path:"slider",action:()=>({title:"Slider",component:ic(e)})},{path:"spinner",action:()=>({title:"Spinner",component:dc(e)})},{path:"stepper",action:()=>({title:"Stepper",component:Ac(e)})},{path:"switch",action:()=>({title:"Switch",component:$c(e)})},{path:"table",action:()=>({title:"Table",component:Qc(e)})},{path:"tableOfContent",action:()=>({title:"Table",component:ol(e)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:il(e)})},{path:"tabs",action:()=>({title:"Tabs",component:Uc(e)})},{path:"toggle",action:()=>({title:"Toggle",component:dl(e)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:vl(e)})},{path:"tooltip",action:()=>({title:"Tooltip",component:kl(e)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:Il(e)})},{path:"treeView",action:()=>({title:"Tree View",component:Bl(e)})}]},{path:"pages",action:n=>({title:"Pages",component:_o(e)})}]},Ol=e=>({title:e.tr("Page Not Found"),component:()=>"Not Found"}),zl=({context:e,LayoutDefault:t,config:{base:n=""}})=>{const{window:o,bau:a,states:i}=e,s=a.state(),r=t({componentState:s});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:m=t}=l.resolve({pathname:u});s.val=p({}),document.title=`${d}`}},_l=e=>{const{createGlobalStyles:t}=e;t`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{background:#2f1e2e;color:#a39e9b}.hljs-comment,.hljs-quote{color:#8d8687}.hljs-link,.hljs-meta,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ef6155}.hljs-built_in,.hljs-deletion,.hljs-literal,.hljs-number,.hljs-params,.hljs-type{color:#f99b15}.hljs-attribute,.hljs-section,.hljs-title{color:#fec418}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#48b685}.hljs-keyword,.hljs-selector-tag{color:#815ba4}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}

    pre code.hljs{border-radius: var(--global-radius)}
  `};mo();const qn={title:"Bau",base:"/bau/bau-ui"},he=yo({config:qn}),{bau:Rl}=he;he.states={drawerOpen:Rl.state(!0)};_l(he);no({routes:Ll({context:he}),onLocationChange:zl({context:he,LayoutDefault:Mo(he),config:qn}),notFoundRoute:Ol(he)});
