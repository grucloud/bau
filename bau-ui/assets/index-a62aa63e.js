(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),_e=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,..._e({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=_e({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},s=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:s}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,r,l)=>{i.apply(r,l),o.pathname!=window.location.pathname&&n({router:s}),a(window.location)}}),document.addEventListener("click",i=>{const{target:r}=i,l=r.closest("a");if(!l)return;const c=l.getAttribute("href");c&&!c.startsWith("http")&&!c.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",c),history.pushState({},null,c),a(window.location),["?","#"].includes(c[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:s}),s}const ae=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],ke=t=>`var(--color-${t})`,co=t=>`var(--color-${t}-lightest)`,lo=()=>ae.map(([t])=>`
.outline.${t} {
  border: 1px solid ${ke(t)};
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${co(t)};
}
.solid.${t} {
  background-color: ${ke(t)};
}
`).join(`
`),uo=()=>ae.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),po=t=>100-t*10,mo=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${po(e)}%);`).join(`
`),Ee=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),go=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),...io.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function bo({createGlobalStyles:t},{colorPalette:e=ae}={}){t`
    * {
      margin: 0;
      padding: 0;
    }
    h1,h2,h3,p {
      margin:0.3rem 0;
    }
    ul,ol {
      padding-left:1.3rem
    }
    :root {
      --color-scheme: light;
      --contrast-background-value: 90%;
      --contrast-foreground-value: 70%;
      --contrast-background-dark-value: 70%;
      --contrast-foreground-dark-value: 90%;
      --color-white: #fff;
      --color-black: #000;
      ${e.map(([n,o])=>go([n,o])).join(`
`)}
      ${mo()}
      ${Ee({})}
      ${lo()}
      --color-content: hsl(0, 0%, 10%);
      --color-content-inverse: hsl(0, 0%, 95%);
      --color-content-secondary: hsl(0, 0%, 40%);
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
    html:has(dialog[open]) {
      overflow: hidden;
    }
    html[data-theme="dark"] {
      ${uo()}
      --color-scheme: dark;
      --background-color: #121212;
      --hover-overlay: rgba(255, 255, 255, 0.05);
      --color-content: #e3e3e3;
      --color-content-secondary: rgba(255, 255, 255, 0.5);
      --brightness-hover-always: 130%;
      --brightness-active-always: 120%;
      --brightness-active: 180%;
      --brightness-hover: 150%;
      --brightness-hover-reverse: 70% ${Ee({dark:!0})};
    }
  `}function ho(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let re=t=>Object.prototype.toString.call(t??0).slice(8,-1),fo=t=>re(t)=="Object",Ae=t=>re(t)=="Function",ee=t=>["Object","Array"].includes(re(t)),Te=Object.getPrototypeOf,ne=t=>wt(t)?t.val:t,wt=t=>t==null?void 0:t.__isState,vo=["splice","push","pop","shift","unshift","sort","reverse"],Gt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const K=t=>!wt(t[0])&&fo(t[0])?t:[{},...t];function xo(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,s=new Set,i=!1,r,l=w=>n.createElement(w),c=(w,h,x)=>{let C=r;r=h;let k=w(x);return r=C,k},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(w=>{w.bindings=w.bindings.filter(h=>{var x;return(x=h.element)==null?void 0:x.isConnected}),!w.bindings.length&&!w.computed&&a.delete(w)}),o=void 0}))},d=(w,h,x,C,k,G)=>{var z;if(i){s.add(w);return}for(let V of w.bindings){let{deps:J,element:M,renderInferred:Z,render:nt,renderItem:q}=V;if(q&&h)(z=m(M,C,(...Y)=>g(q(...Y)),x,k,G)[h])==null||z.call();else{let Y=Z?Z({element:M}):nt({element:M,renderItem:q})(...J.map(ne));Y!==M&&M.replaceWith(V.element=g(Y))}}S(w),u()},p=(w,h,x=[])=>({get(C,k,G){var z;if(r==null||r.add(w),k==="_isProxy")return!0;if(!((z=C[k])!=null&&z._isProxy)&&!wt(C[k])&&ee(C[k]))C[k]=new Proxy(C[k],p(w,h,[...x,k]));else if(vo.includes(k)){let V=C[k];return(...J)=>{let M=V.apply(C,J);return d(w,k,M,J,h,x),M}}return Reflect.get(C,k,G)},set(C,k,G,z){let V=Reflect.set(C,k,G,z);return d(w,"setItem",V,{prop:k,value:G},h,[...x,k]),V}}),b=(w,h)=>new Proxy(h,p(w,h)),m=(w,h,x,C,k,G)=>{let z=()=>w.replaceChildren(...Gt(C,x)),V=J=>w[J]&&w.removeChild(w[J]);return{assign:z,sort:z,reverse:z,setItem:()=>{var M;let J=G[0];(M=w.children[J])==null||M.replaceWith(x(k[J],J))},push:()=>w.append(...Gt(h,(J,M)=>x(J,k.length+M))),unshift:()=>w.prepend(...Gt(h,x)),pop:()=>V("lastChild"),shift:()=>V("firstChild"),splice:()=>{const{length:J}=w.children;let[M,Z=J,...nt]=h;for(let q=M>=0?Math.min(M+Z-1,J-1):J-1;q>=(M>=0?M:J+M);q--)w.children[q].remove();if(nt.length){let q=nt.forEach((Y,rt)=>x(Y,M+rt));w.children[M]?w.children[M].after(...q):w.append(...q)}}}},f=w=>({oldVal:w,bindings:[],listeners:[],__isState:!0,get val(){let h=this;return r==null||r.add(h),h.valProxy??(h.valProxy=ee(w)?b(h,w):w,h.valProxy)},set val(h){let x=this,C=x.val;ee(h)?(x.valProxy=b(x,h),d(x,"assign",h)):h!==C&&(x.valProxy=h,d(x)),x.oldVal=C}}),g=w=>{if(w==null||w===!1){const h=l("span");return h.style.display="none",h}else return w.nodeType?w:n.createTextNode(w)},y=(w,h)=>{let x=new Set;return h.val=c(w,x),x},v=w=>{let h=f(),x=y(w,h);h.computed=!0;for(let C of x)C.listeners.push({computed:w,deps:x,state:h});return h},S=w=>{for(let h of[...w.listeners])y(h.computed,h.state)},E=(w,...h)=>{if(h.length){let x=[];for(let C of h.flat(1/0))C!=null&&x.push(wt(C)?_({deps:[C],render:()=>k=>k}):Ae(C)?j({renderInferred:C}):g(C));w.append(...x)}},A={},N=(w,h)=>w&&(Object.getOwnPropertyDescriptor(w,h)??N(Te(w),h)),D=(w,h,x)=>{var C;return A[w+","+h]??(A[w+","+h]=((C=N(x,h))==null?void 0:C.set)??0)},B=(w,h)=>new e.MutationObserver((x,C)=>{x.filter(k=>k.removedNodes).forEach(k=>[...k.removedNodes].find(G=>G===w&&(h({element:w}),C.disconnect(),!0)))}).observe(w.parentNode,{childList:!0}),L=(w,h)=>new e.MutationObserver((x,C)=>x.forEach(k=>h({record:k,element:w}))).observe(w,{childList:!0}),O=w=>new Proxy(function(x,...C){var V;let[k,...G]=K(C),z=w?n.createElementNS(w,x):l(x);for(let[J,M]of Object.entries(k)){if(J.startsWith("bau"))continue;let Z=D(x,J,Te(z))?nt=>nt!==void 0&&(z[J]=nt):nt=>z.setAttribute(J,nt);M==null||(wt(M)?_({deps:[M],render:()=>()=>(Z(M.val),z)}):Ae(M)&&(!J.startsWith("on")||M.isDerived)?j({renderInferred:()=>(Z(M({element:z})),z)}):M.renderProp?_({deps:M.deps,render:()=>()=>(Z(M.renderProp({element:z})(...M.deps.map(ne))),z)}):Z(M))}return k.bauChildMutated&&L(z,k.bauChildMutated),E(z,...G),z.autofocus&&z.focus&&e.requestAnimationFrame(()=>z.focus()),(V=k.bauCreated)==null||V.call(k,{element:z}),k.bauMounted&&e.requestAnimationFrame(()=>k.bauMounted({element:z})),k.bauUnmounted&&e.requestAnimationFrame(()=>B(z,k.bauUnmounted)),z},{get:(h,x)=>h.bind(void 0,x)}),$=(w,h,x)=>{w.element=g(x);for(let C of h)wt(C)&&(a.add(C),C.bindings.push(w));return w.element},j=({renderInferred:w,element:h})=>{let x=new Set,C=c(w,x,{element:h});return $({renderInferred:w},x,C)},_=({deps:w,element:h,render:x,renderItem:C})=>$({deps:w,render:x,renderItem:C},w,x({element:h,renderItem:C})(...w.map(ne))),F=(w,h,x)=>_({deps:[w],render:({renderItem:C})=>k=>(h.append(...Gt(k,C)),h),renderItem:x}),P=w=>{i=!0,w(),i=!1,s.forEach(d),s.clear()};return{tags:O(),tagsNS:O,state:f,bind:_,loop:F,derive:v,stateSet:a,batch:P}}const yo=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},wo=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},So=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function Co(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...s)=>{const i=So(a,s),r=yo(i);return!e.getElementById(r)&&wo(e,t==null?void 0:t.target,r,o(r,i)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function ko(t){const e=xo(),n=Co();return bo(n),{bau:e,...n,tr:o=>o,window,...t}}function T(...t){return t.filter(e=>e).join(" ")}function Wt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,s=()=>{};return function({animationHide:r=s,animationShow:l=s,...c},u){return a({class:T("animate",e==null?void 0:e.class,c.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(b=>{if(!r()||b.getAttribute("cloned"))return;const m=b.cloneNode(!0);o.requestAnimationFrame(()=>{m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=b.getAttribute("width"),m.style.height=b.getAttribute("height"),m.style.position="absolute",m.style.animation=r(),d.target.appendChild(m),m.addEventListener("animationend",()=>{var f;return(f=m.parentNode)==null?void 0:f.removeChild(m)})})}),[...d.addedNodes].forEach(b=>{b.getAttribute("cloned")||o.requestAnimationFrame(()=>{p.style.position="relative";const m=b.getBoundingClientRect();if(b.setAttribute("width",m.width+"px"),b.setAttribute("height",m.height+"px"),l()){b.style.animation=l();const f=()=>{b.removeEventListener("animationend",f),b.style.animation=""};b.addEventListener("animationend",f)}})})},...c},u)}}const ot=["neutral","primary","success","danger","warning"],Eo=["plain","outline","solid"],Ao=["sm","md","lg"],To=()=>ot.map(t=>`
&.button.plain.${t} {
  &:focus {
    outline: 4px auto var(--color-${t});
    border: 1px solid var(--color-neutral);
  };
}
&.button.outline.${t} {
  &:focus {
    outline: 4px auto var(--color-${t});
  };
}
&.button.solid.${t} {
  &:focus {
    outline: 4px auto var(--color-${t}-lightest);
  };
}
`).join(`
`);function U(t,e={}){const{bau:n,css:o}=t,a=o`
    color: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
      cursor: pointer;
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
      min-width: 2rem;
      min-height: 2rem;
    }
    &.lg {
      padding: 0.4rem 2rem;
      min-width: 2.5rem;
      min-height: 2.5rem;
    }
    & i {
      font-style: normal;
    }
    ${To()}
  `;return function(...i){let[{size:r=e.size??"md",variant:l=e.variant??"none",color:c=e.color??"none",href:u,...d},...p]=K(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:T("button",e.class,l,r,c,a,d.class),href:u},p)}}const Do="light",Mo=()=>ot.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function se(t,e={}){const{bau:n,css:o,window:a}=t,{input:s}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},l=r();l?i(l):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Do);const c=o`
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
    ${Mo()}
  `;return function(...d){let[{size:p=e.size??"md",variant:b=e.variant??"plain",color:m=e.color??"neutral",...f},...g]=K(d);return s({required:"required",title:"Switch Theme",...f,class:T("theme-switch",m,b,p,c,e==null?void 0:e.class,f.class),type:"checkbox",checked:r()=="dark",onclick:y=>{i(y.target.checked?"dark":"light")}},...g)}}function Bo(t){const{tr:e,bau:n,css:o,config:a,states:s}=t,{i,header:r,h1:l,div:c,a:u,img:d,b:p,ul:b,li:m}=n.tags,{svg:f,path:g}=n.tagsNS("http://www.w3.org/2000/svg"),y=s.drawerOpen,v=U(t,{class:o`
      background: transparent;
    `}),S=se(t),E=()=>i(f({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},g({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>c({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},v({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>y.val=!y.val},E()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(e("Bau UI")))),N=()=>c({class:o`
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
        `},A(),N())}}function Io({tr:t,bau:e,css:n}){const{section:o,footer:a,span:s,a:i,ul:r,li:l,p:c,div:u,h1:d}=e.tags,p=({links:f,title:g})=>o({class:n`
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
        `},d(g),r(f.map(({href:y,name:v})=>l(i({href:y},v))))),b=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],m=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
          grid-area: footer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 4rem;
          padding: 1rem;
          border-top: 1px solid var(--color-emphasis-200);
          color: var(--color-content-secondary);
        `},u({class:n`
            display: flex;
            justify-content: center;
            align-items: flex-start;
            gap: 10rem;
          `},p({title:"Bau UI",links:b}),p({title:"Bau Ecosystem",links:m})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},s("v0.68.0"),s("MIT license")))}}function vt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("list",s,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const Ht="0.3s",je=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,s={...a};return s.children=o==null?void 0:o.map(je({parent:n,grandParent:t})),t&&(t.parentTree=e),s.parentTree=t,s},Ge=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=Ge(t)(e.children[o]);if(a)return a}},No=({keyframes:t})=>({hideToLeft:t`
  from {
    transform: translateX(0%);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
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
   `});function ie(t,e={}){const{bau:n,css:o,window:a,config:s}=t,{base:i="",hashBased:r=!1}=e,l=`${s.base}${i}`,c=P=>{var w;return((w=P.parentTree.data)==null?void 0:w.href)??P.parentTree.children[0].data.href},u=({variant:P,color:w,size:h,currentTree:x,data:C})=>S(D({variant:P,color:w,size:h,href:`${l}${c(x)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:P,color:w,size:h,href:`${l}${C.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},C.name)),d=({size:P,subTree:{data:{name:w,href:h},children:x=[]}})=>D({size:P,href:`${l}${h}`,"data-ischild":!x.length},w),p=({pathname:P,subTree:w})=>{var h;return P===((h=w==null?void 0:w.data)==null?void 0:h.href)},{renderHeader:b=u,renderMenuItem:m=d,isActive:f=p}=e,{li:g,nav:y,div:v,header:S,a:E}=n.tags,A=Wt(t),N=vt(t),D=U(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:L}=No(t),O=o`
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
  `,$=({children:P,pathnameState:w,variant:h,color:x,size:C})=>N({class:T(h,x,C)},P.map(k=>g({class:()=>T(k.children&&"has-children",f({pathname:w.val,subTree:k})&&"active")},m({variant:h,color:x,size:C,subTree:k})))),j=({variant:P,color:w,size:h,currentTree:x,pathnameState:C})=>{const{children:k,parentTree:G,data:z,renderList:V}=x;return v({class:T("drillDownMenu",P,w,h)},G&&b({variant:P,color:w,size:h,data:z,currentTree:x}),k&&V?V({renderListDefault:$,children:k,pathnameState:C,variant:P,color:w,size:h}):$({children:k,pathnameState:C,variant:P,color:w,size:h}))},_=({tree:P,pathname:w})=>{let h=je({})({...P}),x=Ge(w)(h);return x||(x=h),x},F=({target:P})=>{let h=P.closest("a").getAttribute("href").replace(l,"");return r||(h=h.replace(P.hash,"")),h};return function(w){const{size:h=e.size??"md",variant:x=e.variant??"plain",color:C=e.color??"neutral",tree:k,...G}=w,z=n.state(a.location.pathname.replace(l,""));let V=_({tree:k,pathname:z.val});const J=n.state(JSON.stringify(V.data));let M;a.document.addEventListener("click",Y=>{const{target:rt}=Y,ct=rt.closest("a");if(!ct)return;const lt=ct.getAttribute("href");lt&&!lt.startsWith("http")&&!lt.startsWith("#")&&!lt.startsWith("?")&&(V=_({tree:k,pathname:F(Y)}),J.val=JSON.stringify(V.data),z.val=F({target:rt}))});const Z=Y=>{const{buttonback:rt,ischild:ct}=Y.target.dataset;rt=="true"?M=-1:ct=="false"?M=1:ct=="true"&&(M=0)},nt=Y=>{switch(Y){case 1:return`${B} ${Ht}`;case-1:return`${L} ${Ht}`;default:return""}},q=Y=>{switch(Y){case 1:return`${L} ${Ht} reverse`;case-1:return`${B} ${Ht} reverse`;default:return""}};return y({class:T(O,x,C,h,e==null?void 0:e.class,G.class),onclick:Z},A({animationHide:()=>nt(M),animationShow:()=>q(M)},n.bind({deps:[J],render:()=>()=>j({variant:x,color:C,size:h,currentTree:V,pathnameState:z})})))}}const $o=()=>ot.map(t=>`
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
    outline: 4px auto var(--color-${t});
  };
}
&.input.solid.${t} {
  &:focus {
    outline: 4px auto var(--color-${t}-lightest);
  };
  &::placeholder {
    color: var(--font-color-inverse-secondary);
  }
  &:hover {
    background-color: var(--color-${t}-light);
  }
}
`).join(`
`);function pt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
    ${$o()}
  `;return function(r){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=r;return a({type:"text",...u,class:T("input",e.class,e.size??"md",c,l,s,u.class)})}}function ce(t,e={}){const{bau:n,css:o,window:a}=t,s=pt(t,e);return function(r){const{variant:l=e.variant??"outline",color:c=e.color??"neutral",...u}=r,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(l=="solid"?"--font-color-inverse-secondary":`--color-${c}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,b=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return s({type:"search",...u,color:c,variant:l,class:T("inputSearch",e.class,b,u.class)})}}function He(t){const{tr:e,bau:n,css:o,config:a,states:s,window:i}=t,{div:r,ul:l,li:c,nav:u,a:d,span:p}=n.tags,b=ce(t,{variant:"plain",color:"neutral",size:"sm"}),f={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:v,children:S,pathnameState:E,variant:A,color:N,size:D})=>{const B=n.state(""),L=n.derive(()=>B.val==""?S:S.filter($=>$.data.name.match(new RegExp(`${B.val}`,"i")))),O=$=>{B.val=$.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},b({autocomplete:!1,name:"search",autofocus:!0,value:B,placeholder:`Search ${L.val.length} components`,size:22,oninput:O}),()=>v({children:L.val,pathnameState:E,variant:A,color:N,size:D}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let g=!1;const y=ie(t);return function(){return r({bauMounted:({element:S})=>{i.innerWidth<=640&&(g=!0,s.drawerOpen.val=!1)},onclick:S=>{g&&!S.target.dataset.buttonback&&!S.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},y({tree:f}))}}const Lo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:s}=e.tags,i=Wt(t),r=Bo(t),l=He(t),c=Io(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:b}){return s({class:n`
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
        `},r(),l(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>b.val),c())}};function It(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
    display: inline-flex;
    align-items: center;
    flex-grow: 0;
    box-sizing: border-box;
    gap: 0.5rem;
    border-radius: var(--global-radius);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    &.clickable {
      cursor: pointer;
    }
    &.sm {
      padding: 0rem 0.4rem;
    }
    &.md {
      padding: 0.2rem 0.5rem;
    }
    &.lg {
      padding: 0.3rem 1rem;
    }
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...p},...b]=K(r);return a({...p,onclick:d,class:T("chip",e.class,l,c,u,d&&"clickable",s,p.class)},...b)}}function Oo(t){const{bau:e,css:n,config:o}=t,{div:a,h1:s,h2:i,p:r}=e.tags;U(t);const l=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:l},s(u),i(d),r(p))}}function Po(t){const{bau:e,css:n}=t,{div:o,h1:a,p:s}=e.tags,i=n`
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
  `,r=({title:l,Content:c})=>o({className:"feature"},a(l),s(c()));return function({featuresContent:c}){return o({class:i},c.map(r))}}function zo({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:s,dd:i,div:r,aside:l,footer:c,a:u}=e.tags,d=({maxSize:p=151})=>({libName:b,size:m})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},s({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},b),i({class:n`
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
                  var(--color-success) ${m/p*100}%
                );
                justify-content: flex-end;
                width: ${m/p*100}%;
                font-weight: bold;
                padding: 0 0.5rem;
                border-radius: 10px;
              `},m)));return function({data:b=[]}){return o({class:n`
          box-shadow: var(--shadow-m);
          border: 1px solid var(--color-emphasis-200);
          padding: 1rem;
        `},l({class:n`
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
          `},"Bundle Size Comparison in kB"),a({class:n`
            display: flex;
            flex-direction: column;
          `},b.map(d({}))),c({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function Ro(t){const{bau:e,css:n,config:o}=t,{div:a,p:s,a:i,section:r}=e.tags,l=Oo(t),c=Po(t),u=U(t);It(t);const d=zo(t),p=(...y)=>a({class:n`
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
          `},...y)),b=n``,m=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],f=[{title:"UI components for the web",Content:()=>[s("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[s("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]}],g=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:b},l({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),c({featuresContent:f}),d({data:m}),g())}}function _o(t,e={}){const{bau:n,css:o}=t,{div:a,form:s,span:i,pre:r,h3:l,h4:c}=n.tags;return function(d,...p){return a("Login")}}const jo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:s,h2:i}=n.tags,r=_o(t);return()=>o({id:"login"},i(e("Login Examples")),s("Basic"),a(r()))};function Go(t){const{tr:e,bau:n,css:o}=t,{div:a,article:s,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(e("Pages Examples")),jo(t)()))}}function Ho(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function Ue(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&Ue(n)}),t}class De{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Fe(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function mt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Uo="</span>",Me=t=>!!t.scope,Fo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Vo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Fe(e)}openNode(e){if(!Me(e))return;const n=Fo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){Me(e)&&(this.buffer+=Uo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Be=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class le{constructor(){this.rootNode=Be(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Be({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{le._collapse(n)}))}}class Wo extends le{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Vo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Mt(t){return t?typeof t=="string"?t:t.source:null}function Ve(t){return xt("(?=",t,")")}function Ko(t){return xt("(?:",t,")*")}function Jo(t){return xt("(?:",t,")?")}function xt(...t){return t.map(n=>Mt(n)).join("")}function Xo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function ue(...t){return"("+(Xo(t).capture?"":"?:")+t.map(o=>Mt(o)).join("|")+")"}function We(t){return new RegExp(t.toString()+"|").exec("").length-1}function Zo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const qo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function de(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let s=Mt(o),i="";for(;s.length>0;){const r=qo.exec(s);if(!r){i+=s;break}i+=s.substring(0,r.index),s=s.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?i+="\\"+String(Number(r[1])+a):(i+=r[0],r[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Yo=/\b\B/,Ke="[a-zA-Z]\\w*",pe="[a-zA-Z_]\\w*",Je="\\b\\d+(\\.\\d+)?",Xe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ze="\\b(0b[01]+)",Qo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ta=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=xt(e,/.*\b/,t.binary,/\b.*/)),mt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},Bt={begin:"\\\\[\\s\\S]",relevance:0},ea={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Bt]},na={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Bt]},oa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Kt=function(t,e,n={}){const o=mt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=ue("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},aa=Kt("//","$"),ra=Kt("/\\*","\\*/"),sa=Kt("#","$"),ia={scope:"number",begin:Je,relevance:0},ca={scope:"number",begin:Xe,relevance:0},la={scope:"number",begin:Ze,relevance:0},ua={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Bt,{begin:/\[/,end:/\]/,relevance:0,contains:[Bt]}]}]},da={scope:"title",begin:Ke,relevance:0},pa={scope:"title",begin:pe,relevance:0},ma={begin:"\\.\\s*"+pe,relevance:0},ga=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Ut=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Yo,IDENT_RE:Ke,UNDERSCORE_IDENT_RE:pe,NUMBER_RE:Je,C_NUMBER_RE:Xe,BINARY_NUMBER_RE:Ze,RE_STARTERS_RE:Qo,SHEBANG:ta,BACKSLASH_ESCAPE:Bt,APOS_STRING_MODE:ea,QUOTE_STRING_MODE:na,PHRASAL_WORDS_MODE:oa,COMMENT:Kt,C_LINE_COMMENT_MODE:aa,C_BLOCK_COMMENT_MODE:ra,HASH_COMMENT_MODE:sa,NUMBER_MODE:ia,C_NUMBER_MODE:ca,BINARY_NUMBER_MODE:la,REGEXP_MODE:ua,TITLE_MODE:da,UNDERSCORE_TITLE_MODE:pa,METHOD_GUARD:ma,END_SAME_AS_BEGIN:ga});function ba(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function ha(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function fa(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=ba,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function va(t,e){Array.isArray(t.illegal)&&(t.illegal=ue(...t.illegal))}function xa(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function ya(t,e){t.relevance===void 0&&(t.relevance=1)}const wa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=xt(n.beforeMatch,Ve(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Sa=["of","and","for","in","not","or","if","then","parent","list","value"],Ca="keyword";function qe(t,e,n=Ca){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(s){Object.assign(o,qe(t[s],e,s))}),o;function a(s,i){e&&(i=i.map(r=>r.toLowerCase())),i.forEach(function(r){const l=r.split("|");o[l[0]]=[s,ka(l[0],l[1])]})}}function ka(t,e){return e?Number(e):Ea(t)?0:1}function Ea(t){return Sa.includes(t.toLowerCase())}const Ie={},ft=t=>{console.error(t)},Ne=(t,...e)=>{console.log(`WARN: ${t}`,...e)},yt=(t,e)=>{Ie[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Ie[`${t}/${e}`]=!0)},Vt=new Error;function Ye(t,e,{key:n}){let o=0;const a=t[n],s={},i={};for(let r=1;r<=e.length;r++)i[r+o]=a[r],s[r+o]=!0,o+=We(e[r-1]);t[n]=i,t[n]._emit=s,t[n]._multi=!0}function Aa(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ft("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Vt;if(typeof t.beginScope!="object"||t.beginScope===null)throw ft("beginScope must be object"),Vt;Ye(t,t.begin,{key:"beginScope"}),t.begin=de(t.begin,{joinWith:""})}}function Ta(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ft("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Vt;if(typeof t.endScope!="object"||t.endScope===null)throw ft("endScope must be object"),Vt;Ye(t,t.end,{key:"endScope"}),t.end=de(t.end,{joinWith:""})}}function Da(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Ma(t){Da(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Aa(t),Ta(t)}function Ba(t){function e(i,r){return new RegExp(Mt(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,r]),this.matchAt+=We(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(l=>l[1]);this.matcherRe=e(de(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const l=this.matcherRe.exec(r);if(!l)return null;const c=l.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const l=new n;return this.rules.slice(r).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[r]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,l){this.rules.push([r,l]),l.type==="begin"&&this.count++}exec(r){const l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(r);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(r)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function a(i){const r=new o;return i.contains.forEach(l=>r.addRule(l.begin,{rule:l,type:"begin"})),i.terminatorEnd&&r.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&r.addRule(i.illegal,{type:"illegal"}),r}function s(i,r){const l=i;if(i.isCompiled)return l;[ha,xa,Ma,wa].forEach(u=>u(i,r)),t.compilerExtensions.forEach(u=>u(i,r)),i.__beforeBegin=null,[fa,va,ya].forEach(u=>u(i,r)),i.isCompiled=!0;let c=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),c=i.keywords.$pattern,delete i.keywords.$pattern),c=c||/\w+/,i.keywords&&(i.keywords=qe(i.keywords,t.case_insensitive)),l.keywordPatternRe=e(c,!0),r&&(i.begin||(i.begin=/\B|\b/),l.beginRe=e(l.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(l.endRe=e(l.end)),l.terminatorEnd=Mt(l.end)||"",i.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(l.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ia(u==="self"?i:u)})),i.contains.forEach(function(u){s(u,l)}),i.starts&&s(i.starts,r),l.matcher=a(l),l}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=mt(t.classNameAliases||{}),s(t)}function Qe(t){return t?t.endsWithParent||Qe(t.starts):!1}function Ia(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return mt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Qe(t)?mt(t,{starts:t.starts?mt(t.starts):null}):Object.isFrozen(t)?mt(t):t}var Na="11.8.0";class $a extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const oe=Fe,$e=mt,Le=Symbol("nomatch"),La=7,tn=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Wo};function l(h){return r.noHighlightRe.test(h)}function c(h){let x=h.className+" ";x+=h.parentNode?h.parentNode.className:"";const C=r.languageDetectRe.exec(x);if(C){const k=L(C[1]);return k||(Ne(s.replace("{}",C[1])),Ne("Falling back to no-highlight mode for this block.",h)),k?C[1]:"no-highlight"}return x.split(/\s+/).find(k=>l(k)||L(k))}function u(h,x,C){let k="",G="";typeof x=="object"?(k=h,C=x.ignoreIllegals,G=x.language):(yt("10.7.0","highlight(lang, code, ...args) has been deprecated."),yt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),G=h,k=x),C===void 0&&(C=!0);const z={code:k,language:G};P("before:highlight",z);const V=z.result?z.result:d(z.language,z.code,C);return V.code=z.code,P("after:highlight",V),V}function d(h,x,C,k){const G=Object.create(null);function z(I,R){return I.keywords[R]}function V(){if(!W.keywords){st.addText(et);return}let I=0;W.keywordPatternRe.lastIndex=0;let R=W.keywordPatternRe.exec(et),X="";for(;R;){X+=et.substring(I,R.index);const tt=at.case_insensitive?R[0].toLowerCase():R[0],it=z(W,tt);if(it){const[dt,to]=it;if(st.addText(X),X="",G[tt]=(G[tt]||0)+1,G[tt]<=La&&(jt+=to),dt.startsWith("_"))X+=R[0];else{const eo=at.classNameAliases[dt]||dt;Z(R[0],eo)}}else X+=R[0];I=W.keywordPatternRe.lastIndex,R=W.keywordPatternRe.exec(et)}X+=et.substring(I),st.addText(X)}function J(){if(et==="")return;let I=null;if(typeof W.subLanguage=="string"){if(!e[W.subLanguage]){st.addText(et);return}I=d(W.subLanguage,et,!0,Ce[W.subLanguage]),Ce[W.subLanguage]=I._top}else I=b(et,W.subLanguage.length?W.subLanguage:null);W.relevance>0&&(jt+=I.relevance),st.__addSublanguage(I._emitter,I.language)}function M(){W.subLanguage!=null?J():V(),et=""}function Z(I,R){I!==""&&(st.startScope(R),st.addText(I),st.endScope())}function nt(I,R){let X=1;const tt=R.length-1;for(;X<=tt;){if(!I._emit[X]){X++;continue}const it=at.classNameAliases[I[X]]||I[X],dt=R[X];it?Z(dt,it):(et=dt,V(),et=""),X++}}function q(I,R){return I.scope&&typeof I.scope=="string"&&st.openNode(at.classNameAliases[I.scope]||I.scope),I.beginScope&&(I.beginScope._wrap?(Z(et,at.classNameAliases[I.beginScope._wrap]||I.beginScope._wrap),et=""):I.beginScope._multi&&(nt(I.beginScope,R),et="")),W=Object.create(I,{parent:{value:W}}),W}function Y(I,R,X){let tt=Zo(I.endRe,X);if(tt){if(I["on:end"]){const it=new De(I);I["on:end"](R,it),it.isMatchIgnored&&(tt=!1)}if(tt){for(;I.endsParent&&I.parent;)I=I.parent;return I}}if(I.endsWithParent)return Y(I.parent,R,X)}function rt(I){return W.matcher.regexIndex===0?(et+=I[0],1):(te=!0,0)}function ct(I){const R=I[0],X=I.rule,tt=new De(X),it=[X.__beforeBegin,X["on:begin"]];for(const dt of it)if(dt&&(dt(I,tt),tt.isMatchIgnored))return rt(R);return X.skip?et+=R:(X.excludeBegin&&(et+=R),M(),!X.returnBegin&&!X.excludeBegin&&(et=R)),q(X,I),X.returnBegin?0:R.length}function lt(I){const R=I[0],X=x.substring(I.index),tt=Y(W,I,X);if(!tt)return Le;const it=W;W.endScope&&W.endScope._wrap?(M(),Z(R,W.endScope._wrap)):W.endScope&&W.endScope._multi?(M(),nt(W.endScope,I)):it.skip?et+=R:(it.returnEnd||it.excludeEnd||(et+=R),M(),it.excludeEnd&&(et=R));do W.scope&&st.closeNode(),!W.skip&&!W.subLanguage&&(jt+=W.relevance),W=W.parent;while(W!==tt.parent);return tt.starts&&q(tt.starts,I),it.returnEnd?0:R.length}function Et(){const I=[];for(let R=W;R!==at;R=R.parent)R.scope&&I.unshift(R.scope);I.forEach(R=>st.openNode(R))}let ut={};function Q(I,R){const X=R&&R[0];if(et+=I,X==null)return M(),0;if(ut.type==="begin"&&R.type==="end"&&ut.index===R.index&&X===""){if(et+=x.slice(R.index,R.index+1),!a){const tt=new Error(`0 width match regex (${h})`);throw tt.languageName=h,tt.badRule=ut.rule,tt}return 1}if(ut=R,R.type==="begin")return ct(R);if(R.type==="illegal"&&!C){const tt=new Error('Illegal lexeme "'+X+'" for mode "'+(W.scope||"<unnamed>")+'"');throw tt.mode=W,tt}else if(R.type==="end"){const tt=lt(R);if(tt!==Le)return tt}if(R.type==="illegal"&&X==="")return 1;if(Qt>1e5&&Qt>R.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=X,X.length}const at=L(h);if(!at)throw ft(s.replace("{}",h)),new Error('Unknown language: "'+h+'"');const _t=Ba(at);let Yt="",W=k||_t;const Ce={},st=new r.__emitter(r);Et();let et="",jt=0,bt=0,Qt=0,te=!1;try{if(at.__emitTokens)at.__emitTokens(x,st);else{for(W.matcher.considerAll();;){Qt++,te?te=!1:W.matcher.considerAll(),W.matcher.lastIndex=bt;const I=W.matcher.exec(x);if(!I)break;const R=x.substring(bt,I.index),X=Q(R,I);bt=I.index+X}Q(x.substring(bt))}return st.finalize(),Yt=st.toHTML(),{language:h,value:Yt,relevance:jt,illegal:!1,_emitter:st,_top:W}}catch(I){if(I.message&&I.message.includes("Illegal"))return{language:h,value:oe(x),illegal:!0,relevance:0,_illegalBy:{message:I.message,index:bt,context:x.slice(bt-100,bt+100),mode:I.mode,resultSoFar:Yt},_emitter:st};if(a)return{language:h,value:oe(x),illegal:!1,relevance:0,errorRaised:I,_emitter:st,_top:W};throw I}}function p(h){const x={value:oe(h),illegal:!1,relevance:0,_top:i,_emitter:new r.__emitter(r)};return x._emitter.addText(h),x}function b(h,x){x=x||r.languages||Object.keys(e);const C=p(h),k=x.filter(L).filter($).map(M=>d(M,h,!1));k.unshift(C);const G=k.sort((M,Z)=>{if(M.relevance!==Z.relevance)return Z.relevance-M.relevance;if(M.language&&Z.language){if(L(M.language).supersetOf===Z.language)return 1;if(L(Z.language).supersetOf===M.language)return-1}return 0}),[z,V]=G,J=z;return J.secondBest=V,J}function m(h,x,C){const k=x&&n[x]||C;h.classList.add("hljs"),h.classList.add(`language-${k}`)}function f(h){let x=null;const C=c(h);if(l(C))return;if(P("before:highlightElement",{el:h,language:C}),h.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(h)),r.throwUnescapedHTML))throw new $a("One of your code blocks includes unescaped HTML.",h.innerHTML);x=h;const k=x.textContent,G=C?u(k,{language:C,ignoreIllegals:!0}):b(k);h.innerHTML=G.value,m(h,C,G.language),h.result={language:G.language,re:G.relevance,relevance:G.relevance},G.secondBest&&(h.secondBest={language:G.secondBest.language,relevance:G.secondBest.relevance}),P("after:highlightElement",{el:h,result:G,text:k})}function g(h){r=$e(r,h)}const y=()=>{E(),yt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function v(){E(),yt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let S=!1;function E(){if(document.readyState==="loading"){S=!0;return}document.querySelectorAll(r.cssSelector).forEach(f)}function A(){S&&E()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function N(h,x){let C=null;try{C=x(t)}catch(k){if(ft("Language definition for '{}' could not be registered.".replace("{}",h)),a)ft(k);else throw k;C=i}C.name||(C.name=h),e[h]=C,C.rawDefinition=x.bind(null,t),C.aliases&&O(C.aliases,{languageName:h})}function D(h){delete e[h];for(const x of Object.keys(n))n[x]===h&&delete n[x]}function B(){return Object.keys(e)}function L(h){return h=(h||"").toLowerCase(),e[h]||e[n[h]]}function O(h,{languageName:x}){typeof h=="string"&&(h=[h]),h.forEach(C=>{n[C.toLowerCase()]=x})}function $(h){const x=L(h);return x&&!x.disableAutodetect}function j(h){h["before:highlightBlock"]&&!h["before:highlightElement"]&&(h["before:highlightElement"]=x=>{h["before:highlightBlock"](Object.assign({block:x.el},x))}),h["after:highlightBlock"]&&!h["after:highlightElement"]&&(h["after:highlightElement"]=x=>{h["after:highlightBlock"](Object.assign({block:x.el},x))})}function _(h){j(h),o.push(h)}function F(h){const x=o.indexOf(h);x!==-1&&o.splice(x,1)}function P(h,x){const C=h;o.forEach(function(k){k[C]&&k[C](x)})}function w(h){return yt("10.7.0","highlightBlock will be removed entirely in v12.0"),yt("10.7.0","Please use highlightElement now."),f(h)}Object.assign(t,{highlight:u,highlightAuto:b,highlightAll:E,highlightElement:f,highlightBlock:w,configure:g,initHighlighting:y,initHighlightingOnLoad:v,registerLanguage:N,unregisterLanguage:D,listLanguages:B,getLanguage:L,registerAliases:O,autoDetection:$,inherit:$e,addPlugin:_,removePlugin:F}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=Na,t.regex={concat:xt,lookahead:Ve,either:ue,optional:Jo,anyNumberOfTimes:Ko};for(const h in Ut)typeof Ut[h]=="object"&&Ue(Ut[h]);return Object.assign(t,Ut),t},St=tn({});St.newInstance=()=>tn({});var Oa=St;St.HighlightJS=St;St.default=St;const Dt=Ho(Oa),Oe="[A-Za-z$_][0-9A-Za-z$_]*",Pa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],za=["true","false","null","undefined","NaN","Infinity"],en=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],nn=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],on=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ra=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],_a=[].concat(on,en,nn);function an(t){const e=t.regex,n=(x,{after:C})=>{const k="</"+x[0].slice(1);return x.input.indexOf(k,C)!==-1},o=Oe,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(x,C)=>{const k=x[0].length+x.index,G=x.input[k];if(G==="<"||G===","){C.ignoreMatch();return}G===">"&&(n(x,{after:k})||C.ignoreMatch());let z;const V=x.input.substring(k);if(z=V.match(/^\s*=/)){C.ignoreMatch();return}if((z=V.match(/^\s+extends\s+/))&&z.index===0){C.ignoreMatch();return}}},r={$pattern:Oe,keyword:Pa,literal:za,built_in:_a,"variable.language":Ra},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},b={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},m={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"css"}},f={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},g={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,p]},v={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},S=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,m,f,g,{match:/\$\d+/},d];p.contains=S.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(S)});const E=[].concat(v,p.contains),A=E.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(E)}]),N={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...en,...nn]}},L={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},O={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[N],illegal:/%/},$={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(x){return e.concat("(?!",x.join("|"),")")}const _={match:e.concat(/\b/,j([...on,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},F={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},P={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},N]},w="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",h={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(w)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[N]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),L,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,b,m,f,g,v,{match:/\$\d+/},d,B,{className:"attr",begin:o+e.lookahead(":"),relevance:0},h,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[v,t.REGEXP_MODE,{className:"function",begin:w,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},O,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[N,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},F,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[N]},_,$,D,P,{match:/\$[(.]/}]}}function ja(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ga=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return Dt.registerLanguage("javascript",an),Dt.registerLanguage("sh",ja),function({text:i,language:r="js"}){const l=a({class:`hljs language-${r}`});return l.innerHTML=Dt.highlight(i,{language:r}).value,o({class:n`
          display: inline-block;
        `},l)}};function Ha(t){const{bau:e,css:n}=t,{article:o,h1:a,p:s,code:i,a:r,ul:l,li:c}=e.tags,u=Ga(t);return function(){return o({class:n`
          background-color: var(--background-color);
        `},a("Getting Started"),s("Grab the source code template for Javascript or Typescript"),u({text:"npx degit grucloud/bau/bau-ui/examples/bau-ui-template-js my-bau-project"}),s("Install the dependencies with the package manager of your choice:"),u({text:`cd my-bau-project
npm install`}),s("This template project is built with Vite. To start a development server:"),u({text:"npm run dev"}),s("The application starting point is at ",i("src/main.ts")),s("let's see how to add a ",r({href:"components/button"},"button component")," , first of all,  import the button:"),u({text:'import button from "@grucloud/bau-ui/button";'}),s("Then, create an instance of this ",r({href:"components/button"},"button")," by passing the context object:"),u({text:"const Button = button(context);"}),s("Last step is to place the button into the tree of component:"),u({text:`Button(
{
  color: "primary",
  variant: "outline",
  size:"lg",
  onclick: () => {
    alert("clicked");
  },
},
"Click me"
)`}),s("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),s("Further reading:",l(c(r({href:"components"},"Visit the component gallery")),c(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function me(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
    border: 1px solid transparent;
    height: fit-content;
    border-radius: var(--global-radius);
    margin: 1rem 0;
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("paper",l,s,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}function rn(t,e={}){const{bau:n,css:o,window:a}=t,{nav:s,ul:i,li:r,a:l}=n.tags,{headerSelector:c="h2,h3"}=e,u=n.state("no"),d=(g,y)=>{let v=null;return(...S)=>{a.clearTimeout(v),v=a.setTimeout(()=>g(...S),y)}},p=o`
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
  `,b=({value:g,id:y,children:v=[]})=>{const S=l({class:()=>u.val==y?"active":"",href:`#${y}`});return S.innerHTML=g,r({class:()=>u.val==y?"active":""},S,v.length>0&&i(v.map(b)))},m=g=>g.tagName.charAt(1),f=({contentEl:g})=>{const y=g.querySelectorAll(c);let v=2,S={},E={children:[]},A=E;const N=A;let D=[A];return[...y].forEach(B=>{const L=m(B);B.setAttribute("id",B.textContent),!B.innerHTML.includes("<button")&&(S={value:B.innerHTML,id:B.id??B.textContent,children:[]},v==L?(E=S,A.children.push(E)):v<L?(D.push(A),A=E,E.children.push(S),E=S):v>L&&(A=D[L-1],D=D.slice(0,L-1),A.children.push(S),E=S),v=L)}),N};return function(...y){let[{size:v=e.size??"md",variant:S=e.variant??"plain",color:E=e.color??"neutral",contentEl:A,...N}]=K(y);const D=f({contentEl:A}),B=d(()=>{const O=[...A.querySelectorAll(c)].find($=>{const{top:j,height:_}=$.getBoundingClientRect();if(j+_>60)return!0});O&&(u.val=O==null?void 0:O.id)},100);return s({...N,class:T("tableOfContent",v,S,E,p,e==null?void 0:e.class,N==null?void 0:N.class),bauMounted:()=>{a.addEventListener("scroll",B)},bauUnmounted:()=>{a.removeEventListener("scroll",B)}},D.children&&i(D.children.map(b)))}}const sn=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:s,tr:i,td:r,thead:l,th:c}=e.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(l(i(c(p??""),ot.map(b=>c(b)))),s(Eo.map(b=>i(c(b),ot.map((m,f)=>r(d({color:m,variant:b},{index:f}))))))))}},Ua=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:s}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Ao.map((i,r)=>s(t,{size:i})({color:"success",variant:"outline"},{size:i,index:r})))}},H=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:s,h1:i,p:r,h2:l,h3:c,pre:u,code:d}=e.tags;Dt.registerLanguage("javascript",an);const p=rn(t),b=me(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),m=sn(t),f=Ua(t),g=({text:y})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:v})=>{v.innerHTML=Dt.highlight(y,{language:"js"}).value}}));return function(v){const S=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(v.title),r(v.description),v.gridItem&&!v.variantColorTableDisable&&[l("Variant/Color"),b(m({Item:v.gridItem(t)}))],v.gridItem&&!v.variantSizeDisable&&[l("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),b(f({item:v.gridItem}))],l("Usage"),c("Import"),g({text:v.importStatement}),l("Examples"),v.examples.map(E=>s(c(E.title),r(E.description),b(E.createComponent(t)({})),g({text:E.code}))));return o({class:n`
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
        `},S,p({contentEl:S}))}};function ge(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
    overflow: hidden;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    & .header {
      display: flex;
      align-items: center;
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
  `,i=({element:c,closeState:u})=>{c.scrollHeight!=0&&(u.val?r(c):l(c))};function r(c){c.style.height=c.scrollHeight+"px";const u=()=>{c.removeEventListener("transitionend",u)};c.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{c.style.height="0px"})}function l(c){const u=()=>{c.removeEventListener("transitionend",u),c.style.height=null};c.addEventListener("transitionend",u),c.style.height=c.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:b=e.color??"neutral",Header:m,Content:f,expanded:g=!1,...y}]=K(u);const v=n.state(!g);return a({...y,class:T("collapsible",d,s,e==null?void 0:e.class,y==null?void 0:y.class)},a({class:()=>T("header",f?v.val?"close":"open":""),onclick:S=>{v.val=!v.val,S.stopPropagation()}},m()),a({class:"content",role:"region",bauMounted:({element:S})=>{v.val&&(S.style.height="0px")},"aria-expanded":({element:S})=>(i({element:S,closeState:v}),!v.val)},f&&f()))}}const Fa=()=>ot.map(t=>`
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
`);function Jt(t,e={}){const{bau:n,css:o}=t,{div:a,ul:s,li:i,h3:r,button:l}=n.tags,c=o`
    & ul {
      display: inline-flex;
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
    ${Fa()}
  `;return function(...d){let[{size:p=e.size??"md",variant:b=e.variant??"plain",color:m=e.color??"neutral",data:f=[],...g}]=K(d);const y=n.state(""),v=ge(t,{size:p,variant:b,color:m}),S=A=>N=>{y.val==A?y.val="":y.val=A},E=A=>{const{Header:N,Content:D,name:B}=A,L=()=>r({class:()=>T(y.val==B&&"active")},l({type:"button","aria-controls":`bau-${B}`,"aria-expanded":({element:$})=>y.val==B},N(A))),O=()=>a({id:`bau-${B}`,"data-state":({element:$})=>y.val==B},D(A));return i({class:T(m,b,p),onclick:S(B)},v({Header:L,Content:O}))};return a({class:T("accordion",c,e==null?void 0:e.class,g.class)},s(f.map(E)))}}const cn=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Jt(t,e);return r=>i({...r,data:s})},Va=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Jt(t);return()=>a(i({data:s,color:"neutral",variant:"outline"}))},Wa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p, section } = bau.tags;

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
    section(
      Accordion({ data: accordionDefs, color: "neutral", variant: "outline" })
    );
};
`,ln=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ka=t=>{const{css:e}=t,n=ln(t),o=Jt(t);return()=>o({color:"warning",data:n,class:e`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Ja=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Xa=t=>{const{css:e}=t,n=ln(t),o=Jt(t);return()=>o({color:"success",variant:"outline",data:n,class:e`
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
      `})},Za=`import accordion from "@grucloud/bau-ui/accordion";
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
`,qa={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Wa,createComponent:Va},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Ja,createComponent:Ka},{title:"Customize the icon",description:"Customize the icon with a cross.",code:Za,createComponent:Xa}],gridItem:cn},Ya=t=>{const e=H(t);return()=>e(qa)},Qa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},tr=()=>ot.map(t=>`
&.alert {
  &.sm {
    & .icon {
      font-size: 1.3rem;
    }
  }
  &.lg {
    & .icon {
      font-size: 2.5rem;
    }
  }
  &.plain.${t} {
    & .icon {
      color: var(--color-${t})
    }
  }
  &.outline.${t} {
    & .icon {
      color: var(--color-${t})
    }
  }
}
  `).join(`
`);function kt(t,e={}){const{bau:n,css:o}=t,{div:a,i:s}=n.tags,i=o`
    display: flex;
    max-width: 600px;
    justify-content: flex-start;
    align-items: center;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-m);
    border-radius: var(--global-radius);
    & .icon {
      padding: 0 0.5rem;
      font-size: 2rem;
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
    ${tr()}
  `,r=U(t),l=({onclick:c})=>r({"aria-label":"Close",onclick:c,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"outline",color:b=e.color??"neutral",onRemove:m,...f},...g]=K(u);return a({...f,class:T("alert",`alert-${p}`,e.class,p,b,d,i,f.class),role:"alert"},s({class:"icon"},Qa[b]),a({class:"content"},...g),m&&l({onclick:m}))}}const un=(t,e)=>{const n=kt(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},er=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=kt(t);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},nr=`import alert from "@grucloud/bau-ui/alert";
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
`,or=t=>{const{css:e}=t,n=kt(t,{class:e`
      &.alert {
        border: 3px dotted !important;
        height: 80px;
      }
    `});return()=>n({color:"warning"},"Your coffee supply is getting low.")},ar=`import alert from "@grucloud/bau-ui/alert";
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
`,rr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:nr,createComponent:er},{title:"Custom Alert ",description:"A custom alert.",code:ar,createComponent:or}],gridItem:un},sr=t=>{const e=H(t);return()=>e(rr)},ir=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:s=10,deleteAfterDuration:i=15e3}=e,{div:r}=n.tags,l=n.state([]),c={inserting:a`
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
      animation: ${c.inserting} var(--transition-slow) ease-out;
    `,itemOut:o`
      animation: ${c.removing} var(--transition-slow) ease-out;
    `},d=({id:p,status:b})=>{const m=l.val.findIndex(f=>f.id===p);m!=-1&&(l.val[m].status=b)};return function(b={},...m){const f=({id:v})=>{d({id:v,status:"removing"});const S=l.val.findIndex(E=>E.id===v);S!=-1&&l.val.splice(S,1)},g=({Component:v})=>{const S={id:Math.random().toString(10).split(".")[1],Component:v,status:"inserting"};l.val.length>=s&&f({id:l.val[0].id}),l.val.push(S),setTimeout(()=>f(S),i)},y=v=>r({class:u.item,onclick:()=>f(v)},v.Component());return document.addEventListener("alert.add",v=>g(v.detail)),document.addEventListener("alert.remove",v=>f(v.detail)),r({class:T(u.stack,e==null?void 0:e.class,b.class)},n.loop(l,r(),y))}},cr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=ir(t,{deleteAfterDuration:2e4}),s=U(t),i=kt(t);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},lr=`import { Context } from "@grucloud/bau-ui/context";
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
`,ur={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:lr,createComponent:cr}]},dr=t=>{const e=H(t);return()=>e(ur)},pr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,s=Wt(t),i=U(t),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,l=e.state(!0);return()=>o(i({onclick:()=>{l.val=!l.val}},()=>l.val?"Hide":"Show"),s({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(l.val?"Ciao":"Mondo")))},mr=`import animate from "@grucloud/bau-ui/animate";
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
`,gr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:s,label:i}=e.tags,r=Wt(t),l=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,c=e.state("one"),u=({target:p})=>c.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",s({type:"radio",id:"one",name:"radio",checked:!0,value:c,oninput:u})),i("Two",s({type:"radio",id:"two",name:"radio",value:c,oninput:u})),r({animationHide:()=>`${l} 0.5s`,animationShow:()=>`${l} 0.5s reverse`},()=>d[c.val]()))},br=`import animate from "@grucloud/bau-ui/animate";
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
`,hr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:mr,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:br,createComponent:gr}]},fr=t=>{const e=H(t);return()=>e(hr)};function Ct(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=a`
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
      animation: 2s linear 0.5s infinite normal none running ${i};
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
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:p=e.color??"neutral",...b},...m]=K(c);return s({...b,class:T("skeleton",u,r,e==null?void 0:e.class,b==null?void 0:b.class)},...m)}}function be(t,e={}){const{bau:n,css:o}=t,{div:a,img:s}=n.tags,i=n.state(!0),r=n.state(!1),l=()=>i.val=!1,c=d=>{i.val=!1,r.val=!0},u=o`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    & img {
      visibility: hidden;
      opacity: 0;
      transition: opacity var(--transition-slow) ease-in;
    }
    & .visible {
      visibility: visible;
      opacity: 1;
    }
    & .hide {
      display: none;
    }
  `;return function(...p){let[{size:b=e.size??"md",variant:m=e.variant??"plain",color:f=e.color??"neutral",width:g=40,height:y=40,alt:v,...S},...E]=K(p);const A=Ct(t,{class:T(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${y}px;
          width: ${g}px;
        `,e==null?void 0:e.class,S.class)});return a({class:T(u,e==null?void 0:e.class,S.class)},()=>i.val&&A(),()=>r.val&&v,s({alt:v,width:g,height:y,onload:l,onerror:c,class:()=>T(!i.val&&"visible",r.val&&"hide",f,m,b,u,e==null?void 0:e.class,S.class),...S}))}}const dn=(t,e)=>{const{css:n}=t,o=be(t,{...e,class:n`
      > img {
        border-radius: 50%;
      }
    `});return a=>o({...a,src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"})},vr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=be(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y",alt:"my avatar"}))},xr=`import avatar from "@grucloud/bau-ui/avatar";
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
`,yr=t=>{const{bau:e,css:n}=t,{section:o}=e.tags,a=be(t,{class:n`
      > img {
        background: var(--color-gray-100);
        border-radius: 50%;
      }
    `});return()=>o(a({src:"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",alt:"My Avatar"}))},wr=`import avatar from "@grucloud/bau-ui/avatar";
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
        src: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158898146978581&height=50&width=50&ext=1701028242&hash=AeQrP0Xi84kZRknM7_s",
        alt: "My Avatar",
      })
    );
};
`,Sr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:xr,createComponent:vr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:wr,createComponent:yr}],gridItem:dn},Cr=t=>{const e=H(t);return()=>e(Sr)};function Nt(t,e){const{bau:n,css:o,window:a}=t,{dialog:s}=n.tags,i=o`
    width: fit-content;
    margin: 0;
    background: var(--background-color);
    border: none;
    box-shadow: var(--shadow-m);
    padding: 0rem;
    margin: 0rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
  `;return function(...l){let[{contentEl:c,triggerEl:u,onClose:d,...p},...b]=K(l);const m=y=>{g.style.opacity=1,g.showModal();const v=u.getBoundingClientRect(),S=g.getBoundingClientRect();v.x<a.innerWidth/2?g.style.left=v.left+"px":g.style.left=v.right-S.width+"px",v.y<a.innerHeight/2?(g.style.top=v.top+v.height+"px",g.style.height=Math.min(g.scrollHeight,a.innerHeight-v.top-v.height)+"px"):(g.style.top=Math.max(0,v.top-S.height)+"px",g.scrollHeight>v.top&&(g.style.height=v.top+"px"))},f=y=>{const v=()=>{g.close(),g.removeEventListener("transitionend",v)};g.addEventListener("transitionend",v),g.style.opacity=0},g=s({role:"presentation",class:T("popover",i,e==null?void 0:e.class,p==null?void 0:p.class),onclick:y=>{y.target===g&&(f(),d==null||d.call())}},c);return g.closeDialog=f,g.openDialog=m,g}}const Ft={sm:12,md:16,lg:24},kr=()=>ot.map(t=>`
&.${t} {
  background-color:transparent;
}
&.plain.${t} {
  & .path {
    stroke: var(--color-${t});
  }
}
&.outline.${t} {
  border: none;
  & .path {
    stroke: var(--color-${t});
  }
}
&.solid.${t} {
  background-color:transparent;
  & .path {
    stroke: var(--color-${t});
  }
}
`).join(`
`);function gt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:s,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
    100% {
      transform: rotate(360deg);
    }
  `,l=a`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:p=e.variant??"outline",visibility:b=!0,...m}={}){const f=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Ft[u]};
      height: ${Ft[u]};
      & .path {
        stroke-linecap: round;
        animation: ${l} 1.5s ease-in-out infinite;
      }
      ${kr()}
    `;return s({class:{deps:[b],renderProp:()=>g=>T("spinner",f,d,p,g==!1?"":"visibility",e==null?void 0:e.class,m.class)},version:"1.1",x:"0px",y:"0px",width:Ft[u],height:Ft[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...m},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Er=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Xt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=o`
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
        overflow-y: scroll;
      }
      & input {
        padding: 0.8rem;
        margin: 0.3rem;
      }
    }

    ${Er()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:p,placeholder:b,Option:m,options:f,defaultOption:g,getOptionLabel:y,getOptionValue:v,onSelect:S=()=>{},id:E,required:A,name:N,loading:D,...B},...L]=K(l);const O=Nt(t),$=U(t),j=pt(t,{variant:u,color:d,size:c}),_=vt(t),F=gt(t,{variant:u,color:d,size:c}),P=n.state(g),w=n.state(B.value),h=n.state(!1),x=n.state(0),C=()=>{h.val=!1},k=n.state(f),G=Q=>at=>Q.val&&y(at)==y(Q.val),z=()=>{ut.openDialog(),h.val=!0,w.val="",k.val=f,x.val=f.findIndex(G(P));const Q=Et.querySelector("li.selected");Q&&(Q.scrollIntoView({block:"center"}),ct.scrollIntoView({block:"end"}))},V=()=>{ut.closeDialog(),h.val=!1,x.val=0},J=Q=>{const{value:at}=Q.target;w.val=at,at?k.val=f.filter(_t=>y(_t).match(new RegExp(`${at}`,"i"))):k.val=f},M=Q=>{ut.open?V():z()},Z=Q=>{P.val=Q,lt.value=v(Q)},nt=({option:Q,index:at})=>_t=>{Z(Q),x.val=at,V()},q=()=>{const Q=Et.querySelector("li.active");Q&&Q.scrollIntoView({block:"center",behavior:"smooth"})},Y=Q=>{switch(Q.key){case"Escape":V();break;case"ArrowDown":x.val<k.val.length-1?x.val++:x.val=0,q();break;case"ArrowUp":x.val<=0?x.val=k.val.length-1:x.val--,q();break;case"Enter":ut.open?(Z(k.val[x.val]),V()):z(),Q.preventDefault();break}},rt=$({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":h,"aria-label":p,onclick:M,variant:u,color:d,size:c,class:D==!0&&"loading",disabled:D},()=>P.val?y(P.val):p,()=>D==!0&&F({visibility:D})),ct=j({value:w,placeholder:b,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":h,oninput:J,onkeydown:Y,...B}),lt=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:g&&v(g),required:A,name:N}),Et=a({class:T(u,d,c,"content")},ct,()=>_({class:T(u,d,c)},k.val.map((Q,at)=>s({class:()=>T(x.val==at&&"active",G(P)(Q)&&"selected"),onclick:nt({option:Q,index:at})},m(Q))))),ut=O({id:E,triggerEl:rt,contentEl:Et,onClose:C,class:o`
        overflow: hidden;
      `});return a({...B,class:T("autocomplete",i,e==null?void 0:e.class,B==null?void 0:B.class)},n.bind({deps:[P],render:()=>Q=>{Q&&(lt.value=v(Q),S(Q))}}),rt,lt,ut)}}const pn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Xt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return c=>i({...c,options:r,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Ar=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Xt(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return()=>o(i({options:r,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Country",placeholder:"Search countries",id:"country"}))},Tr=`import { Context } from "@grucloud/bau-ui/context";
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
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Country",
        placeholder: "Search countries",
        id: "country",
      })
    );
};
`,Dr=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Xt(t),r="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(u.label),s(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},Mr=`import { Context } from "@grucloud/bau-ui/context";
import autocomplete from "@grucloud/bau-ui/autocomplete";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Autocomplete = autocomplete(context);

  const defaultCode = "AD";

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
        defaultOption: options.find(({ code }) => code == defaultCode),
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Country",
        placeholder: "Search countries",
        id: "country",
      })
    );
};
`,Br=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=U(t,{variant:"outline"}),r=Xt(t),l=e.state([]),c=e.state(!1),u=e.state("");async function d({url:m,transform:f=g=>g}){try{c.val=!0;const g=await fetch(m,{});if(g.ok){const y=await g.json();l.val=f(y)}else u.val=g.statusText}catch(g){u.val=g.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((f,g)=>f.name.common.localeCompare(g.name.common))});p();const b=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:l.val,Option:b,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",placeholder:"Search countries",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},Ir=`import { Context } from "@grucloud/bau-ui/context";
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
            getOptionValue: ({ name }: any) => name.common,
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
`,Nr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Tr,createComponent:Ar},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ir,createComponent:Br},{title:"Default Option",description:"A autocomplete with a default option.",code:Mr,createComponent:Dr}],gridItem:pn},$r=t=>{const e=H(t);return()=>e(Nr)};function mn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...p},...b]=K(r);return a({...p,class:T("badge",s,e==null?void 0:e.class,p==null?void 0:p.class)},a({class:T(u,c,l)},d),...b)}}const gn=(t,e)=>{const n=mn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Lr=t=>{const{bau:e}=t,{section:n}=e.tags,o=mn(t);return()=>n(o({content:"10"},"☏"))},Or=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Pr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Or,createComponent:Lr}],gridItem:gn},zr=t=>{const e=H(t);return()=>e(Pr)};function he(t,e={}){const{bau:n,css:o,config:a}=t,{ul:s,li:i,span:r}=n.tags,{separator:l="〉"}=e,c=U(t),u=o`
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
        content: "${l}";
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
  `;return function(...p){let[{size:b=e.size??"md",variant:m=e.variant??"plain",color:f=e.color??"neutral",items:g,...y},...v]=K(p);return s({...y,class:T(u,e==null?void 0:e.class,y==null?void 0:y.class)},g.map(({href:S,name:E})=>i((S!=null?c:r)({href:`${a.base}${S}`,color:f,variant:m,size:b,class:T(f,m,b)},E))))}}const bn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=he(t,e);return a=>o({...a,...n})},Rr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=he(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},_r=`import { Context } from "@grucloud/bau-ui/context";
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
`,jr=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=he(t,{variant:"plain",color:"neutral",separator:"/"});return()=>n(a(o))},Gr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Hr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:_r,createComponent:Rr},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Gr,createComponent:jr}],gridItem:bn},Ur=t=>{const e=H(t);return()=>e(Hr)},hn=(t,e={})=>{const n=U(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Fr=t=>{const{bau:e}=t,{section:n}=e.tags,o=U(t),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Vr=`import button from "@grucloud/bau-ui/button";
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
`,Wr=t=>{const{bau:e}=t,{section:n}=e.tags,o=U(t),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
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
`,Jr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Vr,createComponent:Fr},{title:"Disabled Button",description:"A disabled button.",code:Kr,createComponent:Wr}],gridItem:hn},Xr=t=>{const e=H(t);return()=>e(Jr)},Zr=()=>ot.map(t=>`
&.button-group.${t} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}) !important;
  }
  & .button:not(:first-child) { 
    border-left: 1px solid var(--color-${t}) !important;
  }
}

&.button-group.outline.${t} {
  border: none;
}

&.button-group.solid.${t} {
  & .button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function fe(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
    ${Zr()}
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("button-group",c,u,l,s,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const fn=(t,e)=>{const n=["ONE","TWO","THREE"],o=U(t,e),a=fe(t,e);return s=>a({...s},n.map(i=>o(s,i)))},qr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a=U(t),s=fe(t),i="primary",r="solid";return()=>n(s({color:i,variant:r},o.map(l=>a({color:i,variant:r},l))))},Yr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Qr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Yr,createComponent:qr}],gridItem:fn},ts=t=>{const e=H(t);return()=>e(Qr)};function vn(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    padding: 0.3rem;
    border-radius: var(--global-radius);
    border: none;
    ${(()=>ot.map(r=>`
&.calendar.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()}
    &:hover {
      filter: brightness(var(--brightness-hover));
    }
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p},...b]=K(l);return a({...p,type:"date",class:T("calendar",i,d,u,c,e==null?void 0:e.class,p==null?void 0:p.class)},...b)}}const xn=(t,e)=>{const n=vn(t,e);return o=>n({...o})},es=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),s=vn(t);return()=>n(o("Start date:",s({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},ns=`import calendar from "@grucloud/bau-ui/calendar";
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
`,os={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:ns,createComponent:es}],gridItem:xn},as=t=>{const e=H(t);return()=>e(os)};function rs(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=n.state(0);return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:p,Slide:b,Previous:m,Next:f,...g}]=K(l);const y=()=>{i.val<=0?i.val=p.length-1:i.val--},v=()=>{i.val>=p.length-1?i.val=0:i.val++},S=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},p.map(b));return a({...g,class:T("carousel",c,s,e==null?void 0:e.class,g==null?void 0:g.class)},a({class:T("control","control-previous"),onclick:y},m()),a({class:T("control","control-next"),onclick:v},f()),S)}}const ss=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],is=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,s=U(t,{class:n`
      &.button {
        opacity: 0.4;
        &:hover {
          opacity: 1;
        }
      }
    `}),i=({src:u})=>a({src:u}),r=rs(t,{class:n`
      width: 200px;
      height: 200px;
      & img {
        width: 200px;
        height: 200px;
      }
    `}),l=()=>s("◀"),c=()=>s("▶");return()=>o(r({slides:ss,Slide:i,Previous:l,Next:c}))},cs=`import carousel from "@grucloud/bau-ui/carousel";
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
`,ls={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:cs,createComponent:is}]},us=t=>{const e=H(t);return()=>e(ls)},yn=(t,e)=>{const n=It(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ds=t=>{const{bau:e}=t,{section:n}=e.tags,o=It(t);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},ps=`import chip from "@grucloud/bau-ui/chip";
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
`,ms={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ps,createComponent:ds}],gridItem:yn},gs=t=>{const e=H(t);return()=>e(ms)};function $t(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
    margin: 0.5rem;
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
      width: 1rem;
      height: 1rem;
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({type:"checkbox",...d,class:T(s,u,c,l,e==null?void 0:e.class,d==null?void 0:d.class)})}}const wn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,s=$t(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,s({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},bs=t=>{const{bau:e,css:n}=t,{form:o,article:a,footer:s,label:i}=e.tags,r=$t(t,{color:"neutral",variant:"outline"}),l=U(t,{variant:"outline",color:"primary"}),c=e.state(!1),u=p=>{c.val=!!p.target.checked},d=p=>{p.preventDefault();const b=Object.fromEntries(new FormData(p.target.closest("form")));alert(JSON.stringify(b))};return()=>o({onsubmit:d},a(i({class:n`
              display: inline-flex;
              font-size: smaller;
              align-items: center;
              justify-content: space-between;
              color: var(--color-content-secondary);
              gap: 1rem;
            `},"My Checkbox",r({name:"myCheckbox",checked:c,onchange:u}))),s(l({type:"submit"},"Submit")))},hs=`import { Context } from "@grucloud/bau-ui/context";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, article, footer, label } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const checkboxState = bau.state(false);

  const onChange = (event: any) => {
    checkboxState.val = event.target.checked ? true : false;
  };

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
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
            name: "myCheckbox",
            checked: checkboxState,
            onchange: onChange,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,fs=t=>{const{bau:e,css:n}=t,{label:o,footer:a,article:s,form:i}=e.tags,r=$t(t,{color:"neutral",variant:"outline"}),l=U(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=Object.fromEntries(new FormData(u.target.closest("form")));alert(JSON.stringify(d))};return()=>i({onsubmit:c,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          & label {
            display: inline-flex;
            flex-direction: row;
            font-size: smaller;
            align-items: center;
            gap: 1rem;
          }
        `},s(o("My Checkbox",r({name:"my-checkbox-uncontrolled"}))),a(l({type:"submit"},"Submit")))},vs=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, footer, article, form } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      new FormData(event.target.closest("form"))
    );
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          & label {
            display: inline-flex;
            flex-direction: row;
            font-size: smaller;
            align-items: center;
            gap: 1rem;
          }
        \`,
      },
      article(
        label(
          "My Checkbox",
          Checkbox({
            name: "my-checkbox-uncontrolled",
          })
        )
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,xs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:hs,createComponent:bs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:vs,createComponent:fs}],gridItem:wn},ys=t=>{const e=H(t);return()=>e(xs)},ws=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=ge(t),s=U(t,{variant:"outline"}),i=()=>s("Header"),r=()=>o("Content");return()=>n(a({Header:i,Content:r}))},Ss=`import button from "@grucloud/bau-ui/button";
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
`,Cs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Ss,createComponent:ws}]},ks=t=>{const e=H(t);return()=>e(Cs)};function Es(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("divider",l,s,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const As=t=>{const{bau:e}=t,{section:n}=e.tags,o=Es(t);return()=>n(o("OR"))},Ts=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Ds={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ts,createComponent:As}],variantColorTableDisable:!0,variantSizeDisable:!0},Ms=t=>{const e=H(t);return()=>e(Ds)};function Bs(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:l,variant:c="outline",size:u,openState:d,...p},...b]=K(r);return a({class:T(s,e==null?void 0:e.class,p.class)},a({class:()=>T("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>T("content",d.val&&"content-open")},b))}}const Is=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),s=Bs(t),i=U(t),r=He(t);return()=>n(o("Click on the button to open and close the drawer."),i({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},r()))},Ns=`import drawer from "@grucloud/bau-ui/drawer";
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
`,$s={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ns,createComponent:Is}]},Ls=t=>{const e=H(t);return()=>e($s)},Os=()=>ot.map(t=>`
`).join(`
`);function Sn(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=U(t),r=Nt(t),l=vt(t),c=o`
    ${Os()}
  `;return function(...d){let[{size:p=e.size??"md",variant:b=e.variant??"outline",color:m=e.color??"neutral",label:f,ListItem:g,items:y,...v},...S]=K(d);const E=n.state(0),A=()=>{_.openDialog(),_.focus()},N=()=>{_.closeDialog()},D=()=>{_.open?N():A()},B=F=>{D(),F.preventDefault()},L=({item:F,index:P})=>w=>{E.val=P,N(),w.preventDefault()},O=F=>{switch(F.preventDefault(),F.key){case"Escape":N();break;case"ArrowDown":E.val<options.length-1?E.val++:E.val=0;break;case"ArrowUp":E.val<=0?E.val=options.length-1:E.val--;break;case"Enter":D();break}},$=()=>l({tabindex:"0",class:T(m,b)},y.map((F,P)=>s({class:()=>T(E.val==P&&"active"),onclick:L({item:F,index:P})},g(F)))),j=i({type:"button",onclick:B,color:m,variant:b,size:p},f),_=r({triggerEl:j,contentEl:$()});return a({...v,class:T("dropdownMenu",m,p,c,e==null?void 0:e.class,v==null?void 0:v.class),onkeydown:O},j,_)}}const Ps=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,s=Sn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=l=>o(a(l.label));return l=>s({...l,items:i,ListItem:r,label:"Action"})},zs=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,s=Sn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=l=>o({onclick:()=>{alert(`click  ${l.label}`)}},a(l.label));return()=>n(s({items:i,ListItem:r,label:"Action"}))},Rs=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,_s={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:Rs,createComponent:zs}],gridItem:Ps},js=t=>{const e=H(t);return()=>e(_s)},Cn=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=ie(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Gs=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=ie(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Hs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Us={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Hs,createComponent:Gs}],gridItem:(t,e)=>Cn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},Fs=t=>{const e=H(t);return()=>e(Us)};function kn(t,e={}){const{bau:n,css:o}=t,{div:a,label:s,input:i}=n.tags,r={base:o`
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
    `};return function(c,...u){const{size:d=e.size??"md",variant:p=e.variant??"outline",color:b=e.color??"neutral",Component:m,disabled:f,...g}=c;return a({class:T(r.base,f&&r.disabled,e==null?void 0:e.class,c.class)},s({class:T(p,b,d)},m({disabled:f}),i({type:"file",disabled:f,...g})))}}const En=(t,e)=>{const{tr:n,bau:o,css:a,config:s}=t,{svg:i,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:l,span:c}=o.tags,u=o.state("No file selected"),d=kn(t,e),p=m=>{const f=m.target.files[0];f?u.val=f.name:u.val="No file selected"},b=({disabled:m})=>l({class:T(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${s.base}/uploadIcon.svg#Capa_1`})),c(n("Choose a file to upload")));return m=>d({Component:b,name:"file",accept:"text/*",onchange:p,...m})},Vs=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:l,span:c}=n.tags,u=n.state("No file selected"),d=kn(t),p=m=>{const f=m.target.files[0];f?u.val=f.name:u.val="No file selected"},b=({disabled:m})=>l({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),c(e("Choose a file to upload")));return()=>r(d({Component:b,name:"file",accept:"text/*",onchange:p}),l("File selected: ",u))},Ws=`import classNames from "@grucloud/bau-css/classNames";
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
`,Ks={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Ws,createComponent:Vs}],gridItem:En},Js=t=>{const e=H(t);return()=>e(Ks)};function Lt(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,s=o`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    min-width: 350px;
    & > header {
      & h1 {
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
    & footer {
      display: flex;
      gap: 1rem;
    }
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",content:d,...p},...b]=K(r);return a({...p,class:T("form",u,c,l,s,e==null?void 0:e.class,p==null?void 0:p.class)},...b)}}function ve(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:s}=n.tags,i=a`
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
        animation: ${i} 0.5s;
        opacity: 0;
      }
    }
    &.md {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  `;return function(...c){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:p=e.color??"neutral",loading:b,...m},...f]=K(c);const g=U(t),y=gt(t);return n.bind({deps:[b],render:()=>v=>g({...m,class:T("loadingButton",u,d,p,r,v&&"loading",e==null?void 0:e.class,m==null?void 0:m.class)},y({size:u,variant:d,color:p,visibility:v}),s({class:v&&"loading"},f))})}}const Xs=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:s,header:i,label:r,img:l,footer:c}=e.tags,u=ve(t),d=kt(t,{variant:"outline",color:"danger"}),p=pt(t),b=Lt(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:f=()=>{}}){const g=e.state(!1),y=e.state("");return b({onsubmit:async S=>{S.preventDefault();const{username:E,password:A}=Object.fromEntries(new FormData(S.target.closest("form")));try{g.val=!0;const N=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:E,password:A})});if(N.ok){const D=await N.json();f(D)}else N.status==401?y.val="Invalid username or password":y.val=N.statusText}catch(N){y.val=N.message}finally{g.val=!1}}},i(l({width:"100",height:"100",src:`${o.base}/gc.svg`}),s("Login to Grucloud")),a(()=>y.val&&d(y.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),c(u({type:"submit",variant:"solid",color:"primary",loading:g},"Login")))}},Zs=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
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
      max-width: 400px;
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

  type LoginFormProp = {
    onLoggedIn: (response: object) => void;
  };

  return function LoginForm({ onLoggedIn = () => {} }: LoginFormProp) {
    const loadingState = bau.state(false);
    const errorMessageState = bau.state("");

    const onsubmit = async (event: any) => {
      event.preventDefault();
      const { username, password } = Object.fromEntries(
        new FormData(event.target.closest("form"))
      );
      try {
        loadingState.val = true;
        const response = await fetch("/auth/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
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

    return Form(
      { onsubmit },
      header(
        img({ width: "100", height: "100", src: \`\${config.base}/gc.svg\` }),
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
    );
  };
};
`,qs=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i}=e.tags,r=Lt(t),l=U(t,{variant:"solid",color:"primary"}),c=pt(t);return function({onSubmitted:d=()=>{}}){return r({onsubmit:async b=>{b.preventDefault();const m=Object.fromEntries(new FormData(b.target.closest("form")));alert(JSON.stringify(m)),d(m)}},a(o("Form with input")),n(s("Branch",c({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(l({type:"submit"},"Click")))}},Ys=`import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, label, footer } = bau.tags;

  const Form = form(context);
  const Button = button(context, { variant: "solid", color: "primary" });
  const Input = input(context);

  return function SimpleForm({ onSubmitted = () => {} }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      const payload = Object.fromEntries(
        new FormData(event.target.closest("form"))
      );
      alert(JSON.stringify(payload));
      onSubmitted(payload);
    };

    return Form(
      { onsubmit },
      header(h1("Form with input")),
      section(
        label(
          "Branch",
          Input({
            autofocus: true,
            placeholder: "Branch",
            name: "branch",
            required: true,
          })
        )
      ),
      footer(Button({ type: "submit" }, "Click"))
    );
  };
};
`,Qs=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i,em:r,span:l}=e.tags,c=e.state(""),u=e.derive(()=>c.val!=="Delete"),d=Lt(t),p=U(t,{variant:"solid",color:"primary"}),b=pt(t);return function({onSubmitted:f=()=>{}}){return d({onsubmit:async y=>{y.preventDefault(),f()}},a(o("Delete Protection")),n(s(l("Type ",r("Delete")," to confirm the destruction of the resource."),b({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:c,oninput:y=>c.val=y.target.value}))),i(p({type:"submit",disabled:u},"Delete")))}},ti=`import { Context } from "@grucloud/bau-ui/context";
import form from "@grucloud/bau-ui/form";
import input from "@grucloud/bau-ui/input";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { section, h1, header, label, footer, em, span } = bau.tags;

  const inputState = bau.state("");
  const disabledState = bau.derive(() => inputState.val !== "Delete");

  const Form = form(context);
  const Button = button(context, { variant: "solid", color: "primary" });
  const Input = input(context);

  return function SimpleForm({ onSubmitted = () => {} }: any) {
    const onsubmit = async (event: any) => {
      event.preventDefault();
      onSubmitted();
    };

    return Form(
      { onsubmit },
      header(h1("Delete Protection")),
      section(
        label(
          span(
            "Type ",
            em("Delete"),
            " to confirm the destruction of the resource."
          ),
          Input({
            autofocus: true,
            placeholder: "Type 'Delete'",
            name: "check",
            required: true,
            value: inputState,
            oninput: (event: any) => (inputState.val = event.target.value),
          })
        )
      ),
      footer(Button({ type: "submit", disabled: disabledState }, "Delete"))
    );
  };
};
`,ei={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Ys,createComponent:qs},{title:"Form with state",description:"A form with input state and a dervied state.",code:ti,createComponent:Qs},{title:"Login page",description:"A login page.",code:Zs,createComponent:Xs}]},ni=t=>{const e=H(t);return()=>e(ei)},An=(t,e={})=>{const n=pt(t,e);return o=>n({name:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,placeholder:"Enter text",...o})},oi=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=pt(t);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ai=`import input from "@grucloud/bau-ui/input";
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
`,ri={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ai,createComponent:oi}],gridItem:An},si=t=>{const e=H(t);return()=>e(ri)},Tn=(t,e={})=>{const n=ce(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},ii=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=ce(t);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},ci=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,li={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:ci,createComponent:ii}],gridItem:Tn},ui=t=>{const e=H(t);return()=>e(li)};function Dn(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding-left: 0;
    & li {
      margin: 0.5rem 0;
      display: flex;
      flex-direction: column;
      font-size: smaller;
      line-height: 1.6rem;
      & label {
        color: var(--font-color-secondary);
      }
    }
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("keyValueList",s,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const di=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:s}=e.tags,i=Dn(t);return()=>n(i(o(a("My label"),s("My Value")),o(a("My other label"),s("My Other Value"))))},pi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, li, label, span } = bau.tags;

  const KeyValueList = keyValueList(context);

  return () =>
    section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
};
`,mi=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:s,span:i}=e.tags,r=Dn(t,{class:n`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    `});return()=>o(r(a(s("My label"),i("My Value")),a(s("My other label"),i("My Other Value"))))},gi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, li, label, span } = bau.tags;

  const KeyValueList = keyValueList(context, {
    class: css\`
      &.keyValueList {
        flex-direction: row;
        gap: 1rem;
      }
    \`,
  });

  return () =>
    section(
      KeyValueList(
        li(label("My label"), span("My Value")),
        li(label("My other label"), span("My Other Value"))
      )
    );
};
`,bi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:pi,createComponent:di},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:gi,createComponent:mi}]},hi=t=>{const e=H(t);return()=>e(bi)},fi="modulepreload",vi=function(t){return"/bau/bau-ui/"+t},Pe={},Mn=function(e,n,o){if(!n||n.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=vi(s),s in Pe)return;Pe[s]=!0;const i=s.endsWith(".css"),r=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===s&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${r}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":fi,i||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),i)return new Promise((u,d)=>{c.addEventListener("load",u),c.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())};function Bn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=gt(t,{size:"lg"}),i=kt(t,{color:"danger"}),r=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},s({visibility:!0})),l=c=>i(c.message);return function({getModule:u,loading:d=r,error:p=l,props:b={}}){const m=n.state(void 0),f=n.state(!0),g=n.state(!1);return u().then(y=>{m.val=y.default(t),f.val=!1}).catch(y=>{g.val=y.message}),a(()=>{if(g.val)return p({message:g.val});if(m.val)return m.val(b);if(f.val)return d()})}}const xi=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state(!1),a=Bn(t),s=U(t);return()=>n(s({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>Mn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},yi=`import { Context } from "@grucloud/bau-ui/context";
import lazy from "@grucloud/bau-ui/lazy";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const showState = bau.state(false);

  const Lazy = lazy(context);
  const Button = button(context);

  return () =>
    section(
      Button({ onclick: () => (showState.val = !showState.val) }, () =>
        showState.val ? "Hide" : "Show"
      ),
      () =>
        showState.val &&
        Lazy({
          getModule: () => import("./myComponent"),
          props: { message: "myValue" },
        })
    );
};
`,wi=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),s=Bn(t,{loading:()=>o("My Custom Loading"),error:r=>o("My Custom Error")}),i=U(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&s({getModule:()=>Mn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Si=`import { Context } from "@grucloud/bau-ui/context";
import lazy from "@grucloud/bau-ui/lazy";
import button from "@grucloud/bau-ui/button";
export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const showState = bau.state(false);

  const Lazy = lazy(context, {
    loading: () => div("My Custom Loading"),
    error: (_error: any) => div("My Custom Error"),
  });
  const Button = button(context);

  return () =>
    section(
      Button({ onclick: () => (showState.val = !showState.val) }, () =>
        showState.val ? "Hide" : "Show"
      ),
      () =>
        showState.val &&
        Lazy({
          getModule: () => import("./myComponent"),
          props: { message: "Additional Props here" },
        })
    );
};
`,Ci={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:yi,createComponent:xi},{title:"Custom Loader",description:"Custom loader and error",code:Si,createComponent:wi}]},ki=t=>{const e=H(t);return()=>e(Ci)};function In(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=()=>ot.map(c=>`
&.${c}{
  background-color: var(--color-${c});
}
  `).join(`
`),r=a`
    0% {
      background-position: 0rem 0;
    }
    100% {
      background-position: 1rem 0;
    }
  `,l=o`
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

    ${i()}
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:b=e.color??"neutral",running:m,...f}]=K(u);return s({...f,role:"progressbar",class:{deps:[m],renderProp:()=>g=>T("linearProgress",d,b,l,g&&"running",e==null?void 0:e.class,f==null?void 0:f.class)}})}}const Nn=(t,e)=>{const n=In(t,e);return o=>n({...o,running:!0})},Ei=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=U(t),s=In(t),i=e.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,s({running:i}))},Ai=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Ti={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Ai,createComponent:Ei}],gridItem:Nn},Di=t=>{const e=H(t);return()=>e(Ti)},$n=(t,e)=>{const n=ve(t,e);return o=>n({...o,loading:!0},"Save")},Mi=t=>{const{bau:e}=t,{section:n}=e.tags,o=ve(t),a=e.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Bi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Ii={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Bi,createComponent:Mi}],gridItem:$n},Ni=t=>{const e=H(t);return()=>e(Ii)},$i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Li=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:s}=n.tags,i=vt(t,e),r=({code:l,label:c})=>s({class:o`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return l=>i({...l},$i.map(r))},Oi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Pi=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:s}=e.tags,i=vt(t),r=({code:l,label:c})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(l),a(c));return()=>o(i({variant:"outline",color:"primary"},Oi.map(r)))},zi=`import list from "@grucloud/bau-ui/list";
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
`,Ri={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:zi,createComponent:Pi}],gridItem:Li},_i=t=>{const e=H(t);return()=>e(Ri)};function Ln(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:s,div:i}=n.tags,l=o`
    margin: auto;
    padding: 1rem;
    box-shadow: var(--shadow-s);
    background-color: var(--background-color);
    border-radius: var(--global-radius);
    min-width: 400px;
    border: 0px;
    overflow: hidden;
    > form {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      max-height: 96vh;
      max-width: 96vw;
      & > header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
      }
      & > main,
      > section,
      > article {
        overflow-y: auto;
        flex-grow: 1;
      }
      & > footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
    }
    &.sm {
      max-height: 50vh;
      max-width: 50vw;
    }
    &.md {
    }
    &.lg {
      height: 96vh;
      width: 96vw;
    }
    ${(()=>ot.map(c=>`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:b=e.color??"neutral",...m},...f]=K(u);const g=s({...m,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(m.id??"modal")&&g.showModal()},class:T("modal",l,b,p,d,e==null?void 0:e.class,m==null?void 0:m.class)},f);return new MutationObserver(v=>{const S=new URLSearchParams(a.location.search);v[0].attributeName=="open"&&(g.open?S.set("modal",g.id??"modal"):S.delete("modal"),a.history.pushState("","",`?${S.toString()}`))}).observe(g,{attributes:!0}),g}}const On=(t,e={})=>{const{bau:n}=t,{form:o,section:a,main:s,header:i,footer:r,p:l,h1:c}=n.tags,u=U(t),d=Ln(t,e),p=()=>s(Array(20).fill("").map((m,f)=>l(f+1,". Some text here"))),b=m=>{const f=d({id:`dialog-${m.color}-${m.variant}-${e.size}`,...m},o(i(c("Header")),p(),r(u({variant:"outline",color:m.color,onclick:()=>{f.close()}},"Cancel"),u({variant:"solid",color:m.color,onclick:()=>{f.close()}},"OK"))));return f};return m=>{const f=b(m);return a(u({...m,onclick:()=>{f.showModal()}},"OPEN MODAL"),f)}},ji=t=>{const{bau:e}=t,{form:n,section:o,main:a,header:s,footer:i,p:r}=e.tags,l="neutral",c=U(t),u=Ln(t),d=()=>a(Array(10).fill("").map((b,m)=>r(m+1,". Some text here"))),p=u({id:"my-dialog"},n(s("Header"),d(),i(c({variant:"outline",color:l,onclick:()=>{p.close()}},"Cancel"),c({variant:"solid",color:l,onclick:()=>{p.close()}},"OK"))));return()=>o(c({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Gi=`import modal from "@grucloud/bau-ui/modal";
import button from "@grucloud/bau-ui/button";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { form, section, main, header, footer, p } = bau.tags;

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
    form(
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
`,Hi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Gi,createComponent:ji}],gridItem:On},Ui=t=>{const e=H(t);return()=>e(Hi)},Fi=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Vi(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i}=n.tags,r=U(t),l=Nt(t),c=vt(t),u=$t(t,{color:"neutral",variant:"outline"}),d=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    & label {
      display: flex;
      gap: 0.5rem;
      flex-grow: 1;
    }
    ${Fi()}
  `;return function(...b){let[{size:m=e.size??"md",variant:f=e.variant??"outline",color:g=e.color??"neutral",name:y,label:v,Option:S,options:E,defaultValue:A=[],getOptionLabel:N,getOptionValue:D,renderValue:B,onSelect:L=()=>{},loading:O,...$},...j]=K(b);const _=gt(t,{variant:f,color:g,size:m}),F=n.state(A),P=n.state(!1),w=n.state(0),h=()=>{Z.openDialog(),Z.focus(),P.val=!0},x=()=>{Z.closeDialog(),P.val=!1},C=()=>{P.val=!1},k=q=>{Z.open?x():h(),q.preventDefault()},G=()=>Array.from(nt.selectedOptions).map(({value:q})=>E.find(Y=>D(Y)==q)),z=q=>{switch(q.preventDefault(),q.key){case"Escape":x();break;case"ArrowDown":w.val<E.length-1?w.val++:w.val=0;break;case"ArrowUp":w.val<=0?w.val=E.length-1:w.val--;break;case"Enter":if(Z.open){const Y=q.currentTarget.querySelectorAll("input")[w.val];Y.checked=!Y.checked;const rt=nt.options[w.val+1];rt.selected=!rt.selected,F.val=G()}else h();break}},V=q=>Y=>{const rt=[...nt.options].find(({value:ct})=>ct==D(q));Y.target.checked?rt.selected=!0:rt.selected=!1,F.val=G()},J=()=>c({tabindex:"0",class:T(g,f)},E.map((q,Y)=>s({class:()=>T(w.val==Y&&"active")},n.tags.label(u({checked:A.find(rt=>D(rt)==D(q)),name:`${y}-${D(q)}`,onchange:V(q)}),S(q))))),M=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":P,"aria-label":v,onclick:k,color:g,variant:f,size:m,class:O==!0&&"loading",disabled:O},()=>F.val.length?B(F.val):v,()=>O==!0&&_({visibility:O})),Z=l({triggerEl:M,contentEl:J(),onClose:C}),nt=i({name:y,multiple:!0,...$},n.tags.option({value:""},"--Category--"),E.map(q=>n.tags.option({value:D(q),selected:A.find(Y=>D(Y)==D(q))},N(q))));return a({...$,class:T("multiSelect",g,m,d,e==null?void 0:e.class,$==null?void 0:$.class),onkeydown:z},nt,M,Z)}}const Wi=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:s,footer:i}=e.tags,r=Vi(t),l=U(t,{variant:"outline",color:"neutral"}),c=It(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=b=>a(b.group),p=b=>{b.preventDefault();const{selectedOptions:m}=b.target.elements.myMultiSelect;var f=Array.from(m).map(({value:g})=>g);alert(JSON.stringify(f))};return()=>s({onsubmit:p,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:b})=>b,getOptionLabel:({group:b})=>b,renderValue:b=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},b.map(m=>c(m.group))),label:"Select services"}),i(l({type:"submit"},"Submit")))},Ki=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";
import chip from "@grucloud/bau-ui/chip";
import multiSelect from "@grucloud/bau-ui/multiSelect";

export default (context: Context) => {
  const { bau, css } = context;
  const { div, span, form, footer } = bau.tags;

  const MultiSelect = multiSelect(context);
  const Button = button(context, { variant: "outline", color: "neutral" });
  const Chip = chip(context, { size: "sm" });

  const options = [
    { group: "EC2" },
    { group: "ECS" },
    { group: "IAM" },
    { group: "Lambda" },
    { group: "RDS" },
    { group: "S3" },
  ];

  const Option = (option: any) => span(option.group);

  const onsubmit = (event: any) => {
    event.preventDefault();
    const { selectedOptions } = event.target.elements.myMultiSelect;
    var values = Array.from(selectedOptions).map(({ value }: any) => value);
    alert(JSON.stringify(values));
  };

  return () =>
    form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      MultiSelect({
        name: "myMultiSelect",
        options,
        Option,
        defaultValue: [{ group: "IAM" }],
        getOptionValue: ({ group }: any) => group,
        getOptionLabel: ({ group }: any) => group,
        renderValue: (selected: any) =>
          div(
            {
              class: css\`
                display: flex;
                gap: 0.2rem;
              \`,
            },
            selected.map((item: any) => Chip(item.group))
          ),
        label: "Select services",
      }),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Ji=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:s}=e.tags,i=U(t,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],l=c=>{c.preventDefault();const{selectedOptions:u}=c.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:p})=>p);alert(JSON.stringify(d))};return()=>s({onsubmit:l,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:c})=>a({value:c},c))),i({type:"submit"},"Submit"))},Xi=`import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { select, option, form } = bau.tags;

  const Button = button(context, { variant: "outline", color: "neutral" });

  const options = [
    { group: "Cabrinha" },
    { group: "Core" },
    { group: "Duotone" },
    { group: "Naish" },
    { group: "Reedin" },
    { group: "Slingshot" },
  ];

  const onsubmit = (event: any) => {
    event.preventDefault();
    const { selectedOptions } = event.target.elements.myNativeMultiSelect;
    var values = Array.from(selectedOptions).map(({ value }: any) => value);
    alert(JSON.stringify(values));
  };

  return () =>
    form(
      {
        onsubmit,
        class: css\`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        \`,
      },
      select(
        {
          multiple: true,
          name: "myNativeMultiSelect",
        },
        options.map(({ group }) => option({ value: group }, group))
      ),
      Button({ type: "submit" }, "Submit")
    );
};
`,Zi={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Ki,createComponent:Wi},{title:"Native Multi Select",description:"A native multi select.",code:Xi,createComponent:Ji}]},qi=t=>{const e=H(t);return()=>e(Zi)},Yi=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:s}=e.tags,i=U(t),r=Nt(t),l=()=>i({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),c=()=>o({},a("My content"),s("My Content")),u=l(),d=r({id:"my-popover-left",triggerEl:u,contentEl:c()});return()=>n(o(u,d))},Qi=`import popover from "@grucloud/bau-ui/popover";
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
`,tc={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Qi,createComponent:Yi}]},ec=t=>{const e=H(t);return()=>e(tc)};function nc(t,e={}){const{bau:n,css:o,config:a}=t,{div:s,a:i,span:r,nav:l}=n.tags,c=o`
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
  `,u=({text:d})=>({name:p,label:b,href:m})=>i({href:`${a.base}${m}`},r({class:"sublabel"},d),s({class:`label ${d}`},b??p));return function(...p){let[{size:b=e.size??"md",variant:m=e.variant??"plain",color:f=e.color??"neutral",data:g={},...y}]=K(p);const{next:v,previous:S}=g;return l({"data-paginationnav":JSON.stringify(g),"aria-label":"pages navigation",...y,class:T("paginationNavigation",b,c,e==null?void 0:e.class,y==null?void 0:y.class)},(S==null?void 0:S.href)&&u({text:"Previous"})(S),(v==null?void 0:v.href)&&u({text:"Next"})(v))}}const oc=t=>{const{bau:e}=t,{section:n}=e.tags,o=nc(t),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},ac=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,rc={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:ac,createComponent:oc}]},sc=t=>{const e=H(t);return()=>e(rc)},ic=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=me(t,e);return s=>a({...s},o(`Paper ${e.size??""}`))},cc=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=me(t);return()=>n(a({size:"md"},o("My content")))},lc=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,uc={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:lc,createComponent:cc}],variantColorTableDisable:!0,gridItem:ic},dc=t=>{const e=H(t);return()=>e(uc)};function xe(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    cursor: pointer;
    &.sm {
      transform: scale(0.8);
    }
    &.md {
    }
    &.lg {
      transform: scale(1.5);
    }
    ${(()=>ot.map(r=>`
&.radio-button.${r} {
  accent-color: var(--color-${r});
}
  `).join(`
`))()}
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p}]=K(l);return a({...p,type:"radio",class:T("radio-button",c,d,u,i,e==null?void 0:e.class,p==null?void 0:p.class)})}}const Pn=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:s}=n.tags,i=xe(t,e);return r=>s({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},pc=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:s}=e.tags,i=xe(t),r=e.state("one"),l=({target:c})=>r.val=c.id;return()=>s({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        `},o("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:l})),o("Two",i({id:"two",name:"radio",value:r,oninput:l})),a("Choice: ",r))},mc=`import radioButton from "@grucloud/bau-ui/radioButton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, div, form } = bau.tags;
  const RadioButton = radioButton(context);

  const checkedState = bau.state("one");
  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  return () =>
    form(
      {
        class: css\`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        \`,
      },
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
`,gc={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:mc,createComponent:pc}],gridItem:Pn},bc=t=>{const e=H(t);return()=>e(gc)};function Zt(t,e={}){const{bau:n,css:o}=t,{div:a,label:s}=n.tags,i=xe(t),l=o`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    & label {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px dotted var(--color-emphasis-500);
      border-radius: var(--global-radius);
      gap: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      > div {
        display: flex;
        flex-direction: column;
      }
    }
    ${(()=>ot.map(c=>`
  `).join(`
`))()};
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"none",color:b=e.color??"neutral",name:m,oninput:f,value:g,radios:y=[],...v}]=K(u);return a({...v,class:T("radioButtonGroup",d,b,p,l,e==null?void 0:e.class,v==null?void 0:v.class)},y.map(({id:S,Label:E})=>s(i({size:d,variant:p,color:b,id:S,name:m,checked:g==S,value:S,oninput:f}),E())))}}const hc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:s}=e.tags,i=Zt(t),r=U(t,{variant:"outline",color:"primary"}),l=e.state("two"),c=({target:d})=>l.val=d.id,u=d=>{d.preventDefault(),alert(l.val)};return()=>n({onsubmit:u},o(i({oninput:c,name:"myRadio",value:l.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),s("CheckedState: ",l)),a(r({type:"submit"},"Submit")))},fc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer, p } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const checkedState = bau.state("two");

  const oninput = ({ target }: { target: HTMLInputElement }) =>
    (checkedState.val = target.id);

  const onsubmit = (event: any) => {
    event.preventDefault();
    alert(checkedState.val);
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          oninput,
          name: "myRadio",
          value: checkedState.val,
          radios: [
            { id: "one", Label: () => "One" },
            { id: "two", Label: () => "Two" },
          ],
        }),
        p("CheckedState: ", checkedState)
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,vc=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=Zt(t),i=U(t,{variant:"outline",color:"primary"}),r=l=>{l.preventDefault();const c=l.target.closest("form"),u=Object.fromEntries(new FormData(c));alert(JSON.stringify(u))};return()=>n({onsubmit:r},o(s({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},xc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "myRadio",
          value: "one",
          radios: [
            { id: "one", Label: () => "One" },
            { id: "two", Label: () => "Two" },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,yc=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:s,img:i}=e.tags,r=Zt(t),l=U(t,{variant:"outline",color:"primary"}),c=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28}),d=p=>{p.preventDefault();const b=p.target.closest("form"),m=Object.fromEntries(new FormData(b));alert(JSON.stringify(m))};return()=>o({onsubmit:d},a(r({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>[c(),"GitHub"]},{id:"GitLab",Label:()=>[u(),"GitLab"]}]})),s(l({type:"submit"},"Submit")))},wc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, config } = context;
  const { form, article, footer, img } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const GithubImg = () =>
    img({
      src: \`\${config.base}/login/github.svg#Capa_1\`,
      alt: "GitHub",
      width: 28,
      height: 28,
    });

  const GitlabImg = () =>
    img({
      src: \`\${config.base}/login/gitlab-logo.svg#Capa_1\`,
      alt: "GitLab",
      width: 28,
      height: 28,
    });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "git_provider_type",
          value: "",
          radios: [
            { id: "GitHub", Label: () => [GithubImg(), "GitHub"] },
            { id: "GitLab", Label: () => [GitlabImg(), "GitLab"] },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Sc=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:s,div:i}=e.tags,r=Zt(t),l=U(t,{variant:"outline",color:"primary"}),c=u=>{u.preventDefault();const d=u.target.closest("form"),p=Object.fromEntries(new FormData(d));alert(JSON.stringify(p))};return()=>n({onsubmit:c},o(r({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>i("GitHub",s("Login with GitHub"))},{id:"GitLab",Label:()=>i("GitLab",s("Login with GitLab"))}]})),a(l({type:"submit"},"Submit")))},Cc=`import { Context } from "@grucloud/bau-ui/context";
import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau } = context;
  const { form, article, footer, small, div } = bau.tags;
  const RadioButtonGroup = radioButtonGroup(context);
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
    alert(JSON.stringify(payload));
  };

  return () =>
    form(
      { onsubmit },
      article(
        RadioButtonGroup({
          name: "git_provider_type",
          value: "",
          radios: [
            {
              id: "GitHub",
              Label: () => div("GitHub", small("Login with GitHub")),
            },
            {
              id: "GitLab",
              Label: () => div("GitLab", small("Login with GitLab")),
            },
          ],
        })
      ),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,kc={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:xc,createComponent:vc},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:fc,createComponent:hc},{title:"Label with Image",description:"A label with an image.",code:wc,createComponent:yc},{title:"Label with description",description:"A label with name and description.",code:Cc,createComponent:Sc}]},Ec=t=>{const e=H(t);return()=>e(kc)},Ac=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Ot(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i,option:r}=n.tags,l=U(t),c=Nt(t),u=vt(t),d=o`
    & select {
      width: 0;
      height: 0;
      opacity: 0;
    }
    & button {
      &::after {
        content: "\u25BC";
      }
      &.loading::after {
        display: none;
      }
    }
    ${Ac()}
  `;return function(...b){let[{size:m=e.size??"md",variant:f=e.variant??"outline",color:g=e.color??"neutral",label:y,Option:v,options:S,defaultOption:E,getOptionLabel:A,getOptionValue:N,onSelect:D=()=>{},loading:B,...L},...O]=K(b);const $=gt(t,{variant:f,color:g,size:m}),j=n.state(E?A(E):y),_=n.state(!1),F=n.state(0),P=()=>{V.openDialog(),V.focus(),_.val=!0},w=()=>{V.closeDialog(),_.val=!1},h=()=>{_.val=!1},x=M=>{V.open?w():P(),M.preventDefault()},C=({option:M,index:Z})=>nt=>{j.val=A(M),J.value=N(M),J.setCustomValidity(""),F.val=Z,w(),D(M),nt.preventDefault()},k=M=>{switch(M.preventDefault(),M.key){case"Escape":w();break;case"ArrowDown":F.val<S.length-1?F.val++:F.val=0;break;case"ArrowUp":F.val<=0?F.val=S.length-1:F.val--;break;case"Enter":V.open?(j.val=A(S[F.val]),J.value=N(r),w()):P();break}},G=()=>u({tabindex:"0",class:T(g,f)},S.map((M,Z)=>s({class:()=>T(F.val==Z&&"active"),onclick:C({option:M,index:Z})},v(M)))),z=l({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":_,"aria-label":y,onclick:x,color:g,variant:f,size:m,class:B==!0&&"loading",disabled:B},()=>!j.val&&y,j,()=>B==!0&&$({visibility:B})),V=c({triggerEl:z,contentEl:G(),onClose:h}),J=i(L,r({value:""},"--Select Category--"),S.map(M=>r({value:N(M)},A(M))));return J.value=L.value,a({...L,class:T("select",g,m,d,e==null?void 0:e.class,L==null?void 0:L.class),onkeydown:k},J,z,V)}}const zn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Ot(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],l=c=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return c=>i({...c,options:r,Option:l,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Tc=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Ot(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=c=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(c.label),s(c.code));return()=>o(i({options:r,Option:l,getOptionValue:({code:c})=>c,getOptionLabel:({label:c})=>c,label:"Select a country..."}))},Dc=`import select from "@grucloud/bau-ui/select";
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
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Select a country...",
      })
    );
};
`,Mc=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Ot(t),r="AD",l=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(u.label),s(u.code));return()=>o(i({options:l,Option:c,defaultOption:l.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},Bc=`import select from "@grucloud/bau-ui/select";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Select = select(context);

  const defaultCode = "AD";

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
        defaultOption: options.find(({ code }) => code == defaultCode),
        getOptionValue: ({ code }: any) => code,
        getOptionLabel: ({ label }: any) => label,
        label: "Select a country...",
      })
    );
};
`,Ic=t=>{const{bau:e}=t,{span:n,form:o}=e.tags,a=Ot(t),s=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=r=>n({},r);return()=>o(a({options:s,Option:i,label:"Select a region",getOptionValue:r=>r,getOptionLabel:r=>r}))},Nc=`import select from "@grucloud/bau-ui/select";
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
        getOptionValue: (label: any) => label,
        getOptionLabel: (label: any) => label,
      })
    );
};
`,$c=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=U(t,{variant:"outline"}),r=Ot(t),l=e.state([]),c=e.state(!1),u=e.state("");async function d({url:m,transform:f=g=>g}){try{c.val=!0;const g=await fetch(m,{});if(g.ok){const y=await g.json();l.val=f(y)}else u.val=g.statusText}catch(g){u.val=g.message}finally{c.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((f,g)=>f.name.common.localeCompare(g.name.common))});p();const b=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:l.val,Option:b,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",id:"country",loading:c.val}),i({onclick:()=>p()},"Reload")))},Lc=`import { Context } from "@grucloud/bau-ui/context";
import select from "@grucloud/bau-ui/select";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, div, span } = bau.tags;

  const Button = button(context, { variant: "outline" });
  const Select = select(context);

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
          Select({
            options: dataState.val,
            Option,
            getOptionValue: ({ name }: any) => name.common,
            getOptionLabel: ({ name }: any) => name.common,
            label: "Country",
            id: "country",
            loading: loadingState.val,
          }),
        Button({ onclick: () => fetchCountries() }, "Reload")
      )
    );
};
`,Oc={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Dc,createComponent:Tc},{title:"Default Option",description:"Select with a default option",code:Bc,createComponent:Mc},{title:"Select AWS region",description:"Select the AWS region",code:Nc,createComponent:Ic},{title:"Loading Indicator",description:"Select with a loading indicator",code:Lc,createComponent:$c}],gridItem:zn},Pc=t=>{const e=H(t);return()=>e(Oc)};function Rn(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,s=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("select-native",u,l,c,s,e==null?void 0:e.class,d==null?void 0:d.class)},p)}}const _n=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=Rn(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,s.map(({label:r,phone:l})=>o({value:l},r)))},zc=t=>{const{bau:e}=t,{section:n,option:o}=e.tags,a=Rn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(s.map(({label:i,phone:r})=>o({value:r},i))))},Rc=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,_c={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:Rc,createComponent:zc}],gridItem:_n},jc=t=>{const e=H(t);return()=>e(_c)},Gc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Ct(t),i=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},s({class:n`
          border-radius: 100%;
          width: 50px;
          height: 50px;
        `}),new Array(4).fill("").map(()=>s({class:n`
            border-radius: 5px;
            width: 100%;
            height: 2rem;
          `})));return()=>o(i())},Hc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Uc=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Ct(t),i=()=>a({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          margin: 1rem;
        `},new Array(4).fill("").map(()=>a({class:n`
              display: flex;
              gap: 1rem;
              align-items: center;
            `},s({class:n`
              border-radius: 100%;
              width: 50px;
              height: 50px;
            `}),s({class:n`
              border-radius: 5px;
              width: 100%;
              height: 2rem;
            `}))));return()=>o(i())},Fc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Vc=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:s,tr:i,td:r}=e.tags,l=Ct(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),c=()=>a(s(new Array(8).fill("").map(()=>i(r(l({class:n`
                  width: 5rem;
                `})),r(l()),r(l()),r(l()),r(l({class:n`
                  width: 20rem;
                `}))))));return()=>o(c())},Wc=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Kc=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:s,article:i}=e.tags,r=n`
    display: flex;
    flex-direction: column;
    & header {
      display: inline-flex;
      justify-content: flex-start;
      gap: 2rem;
      padding: 1rem;
    }
    & article > div {
      min-height: 600px;
    }
  `,l=Ct(t,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),c=Ct(t);function u({columnsSize:d=4}){return o({class:r},a(new Array(d).fill("").map(()=>l(s("1")))),i(c("")))}return()=>o(u({columnsSize:3}))},Jc=`import skeleton from "@grucloud/bau-ui/skeleton";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau, css } = context;
  const { section, header, span, article } = bau.tags;

  const className = css\`
    display: flex;
    flex-direction: column;
    & header {
      display: inline-flex;
      justify-content: flex-start;
      gap: 2rem;
      padding: 1rem;
    }
    & article > div {
      min-height: 600px;
    }
  \`;

  const Skeleton = skeleton(context, {
    class: css\`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    \`,
  });

  const SkeletonContent = skeleton(context);
  function TabsSkeleton({ columnsSize = 4 }) {
    return section(
      {
        class: className,
      },
      header(new Array(columnsSize).fill("").map(() => Skeleton(span("1")))),
      article(SkeletonContent(""))
    );
  }

  return () => section(TabsSkeleton({ columnsSize: 3 }));
};
`,Xc={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Hc,createComponent:Gc},{title:"List",description:"A list skeleton.",code:Fc,createComponent:Uc},{title:"Table",description:"A table skeleton.",code:Wc,createComponent:Vc},{title:"Tabs",description:"A tabs skeleton.",code:Jc,createComponent:Kc}],variantColorTableDisable:!0,variantSizeDisable:!0},Zc=t=>{const e=H(t);return()=>e(Xc)};function qt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${(()=>ot.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p},...b]=K(l);return a({...p,type:"range",class:T("slider",d,u,c,i,e==null?void 0:e.class,p.class)},...b)}}const jn=t=>{const{bau:e}=t,n=e.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=qt(t);return s=>a({...s,oninput:o})},qc=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:s}=e.tags,i=e.state(0),r=c=>{i.val=c==null?void 0:c.target.value},l=qt(t);return()=>n(o(a("Slider with step, min and max",s,l({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Yc=`import slider from "@grucloud/bau-ui/slider";
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
`,Qc=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s,datalist:i,br:r,option:l}=e.tags,c=e.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=qt(t);return()=>o(a(s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>l({value:Number(p),label:p})))))},tl=`import slider from "@grucloud/bau-ui/slider";
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
`,el=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s,datalist:i,br:r,option:l}=e.tags,c=e.state(0),u=p=>{c.val=p==null?void 0:p.target.value},d=qt(t);return()=>o(a({class:n`
            display: flex;
          `},s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>l({value:Number(p),label:p})))))},nl=`import slider from "@grucloud/bau-ui/slider";
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
`,ol={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Yc,createComponent:qc},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:tl,createComponent:Qc},{title:"Vertical Mark",description:"A vertical slider with marks.",code:nl,createComponent:el}],gridItem:jn},al=t=>{const e=H(t);return()=>e(ol)},Gn=(t,e)=>{const n=gt(t,e);return o=>n({...o})},rl=t=>{const{bau:e}=t,{section:n}=e.tags,o=U(t,{variant:"solid",color:"primary"}),a=gt(t,{size:"lg"}),s=e.state(!0);return()=>n(o({onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),a({visibility:s}))},sl=`import spinner from "@grucloud/bau-ui/spinner";
import button from "@grucloud/bau-ui/button";

import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;
  const Button = button(context, {
    variant: "solid",
    color: "primary",
  });
  const Spinner = spinner(context, { size: "lg" });

  const runningState = bau.state(true);

  return () =>
    section(
      Button(
        {
          onclick: () => (runningState.val = !runningState.val),
        },
        () => (runningState.val ? "Stop" : "Start")
      ),
      Spinner({ visibility: runningState })
    );
};
`,il={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:sl,createComponent:rl}],gridItem:Gn},cl=t=>{const e=H(t);return()=>e(il)},ll=()=>ot.map(t=>"").join(`
`),Hn=(t,e)=>(n,o)=>{const a=new URLSearchParams(t.window.location.search);return a.delete(e),a.append(e,n),o&&Object.entries(o).map(([s,i])=>(a.delete(s),a.append(s,i))),`?${a.toString()}`};function Un(t,e={}){const{bau:n,css:o,window:a}=t,{div:s,ul:i,li:r,span:l,section:c}=n.tags,u=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      gap: 1rem;
      list-style: none;
      & > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        flex-grow: 0;
        padding: 0.5rem;
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
    ${ll()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...p){let[{color:b,variant:m="plain",size:f,stepperDefs:g=[],stepperName:y,activeStepIndex:v=n.state(0),...S},...E]=K(p);const A=n.state(g.map(($,j)=>({...$,index:j}))),N=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:($,j,_)=>{$.apply(j,_);const F=_[2]??"";console.log("stepper pushState ",F),["?","#"].includes(F[0])&&O()}});const D=n.derive(()=>A.val[v.val]),B=$=>{const{Header:j,disabled:_,name:F,index:P}=$;return r({class:()=>T(D.val.name==F&&"active",v.val<P&&"not-completed",v.val>P&&"completed",_&&"disabled")},l({class:"step-number"},P+1),l({class:"step-label"},()=>j($)))},L=$=>g.findIndex(({name:j})=>j==$.name),O=()=>{const j=new URLSearchParams(a.location.search).get(y)??g[0].name,_=Math.max(g.findIndex(({name:F})=>F==j),0);_<v.val&&(console.log("remove last step"),N.val.pop()),N.val.some(({name:F})=>j==F)||(console.log("add new step"),N.val.push(g[_])),v.val=_};return O(),s({bauMounted:({element:$})=>{a.addEventListener("popstate",O)},bauUnmounted:()=>{a.removeEventListener("popstate",O)},class:T("stepper",m,f,b,u,e==null?void 0:e.class,S.class)},n.loop(A,i(),B),n.loop(N,c(),$=>s({class:()=>T("content",$.name==D.val.name&&"visible")},$.Content({nextStep:g[L($)+1],previousStep:g[L($)-1]}))))}}const ze="my-wizard",ul=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:s,section:i,a:r,ul:l,li:c}=e.tags,u=pt(t),d=Lt(t),p=Un(t),b=Hn(t,ze),m=U(t,{variant:"outline",color:"primary"}),f=U(t,{variant:"solid",color:"primary"}),g=({nextStep:S})=>E=>{E.preventDefault();const{organization:A}=E.target.elements;n.history.pushState("","",b(S.name,{organization:A.value}))},y=S=>{var D;S.preventDefault();const{organization:E}=(D=n.document.forms)==null?void 0:D.formStep1.elements,N=new URLSearchParams(n.location.search).get("choice");alert(`organization ${E.value}, choice:${N}`)},v=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:S})=>d({onsubmit:g({nextStep:S}),id:"formStep1"},s("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:S,previousStep:E})=>d(l(c(r({href:b(S.name,{choice:"choice1"})},"Choice 1")),c(r({href:b(S.name,{choice:"choice2"})},"Choice 2"))),o(m({href:b(E.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:S})=>d({onsubmit:y},a("My stepper 3 Content"),o(m({href:b(S.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>i(p({stepperDefs:v,stepperName:ze}))},dl=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";

const stepperName = "my-wizard";

export default (context: Context) => {
  const { bau, window } = context;
  const { footer, p, label, section, a, ul, li } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const Stepper = stepper(context);
  const nextUrl = NextUrl(context, stepperName);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const ButtonNext = button(context, {
    variant: "solid",
    color: "primary",
  });

  const onsubmitStep1 =
    ({ nextStep }: any) =>
    (event: any) => {
      event.preventDefault();
      const { organization } = event.target.elements;
      window.history.pushState(
        "",
        "",
        nextUrl(nextStep.name, { organization: organization.value })
      );
    };

  const onsubmitStep3 = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const { organization } = window.document.forms?.formStep1.elements;
    const search = new URLSearchParams(window.location.search);
    const choice = search.get("choice");
    alert(\`organization \${organization.value}, choice:\${choice}\`);
  };

  const stepperDefs: StepperPage[] = [
    {
      name: "step1",
      Header: () => "Step 1",
      Content: ({ nextStep }: any) =>
        Form(
          { onsubmit: onsubmitStep1({ nextStep }), id: "formStep1" },
          label(
            "Organization",
            Input({
              autofocus: true,
              placeholder: "Organization",
              name: "organization",
            })
          ),
          footer(ButtonNext({ type: "submit" }, "Next: "))
        ),
    },
    {
      name: "step2",
      Header: () => "Step 2",
      Content: ({ nextStep, previousStep }: any) =>
        Form(
          ul(
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice1" }) },
                "Choice 1"
              )
            ),
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice2" }) },
                "Choice 2"
              )
            )
          ),
          footer(
            ButtonPrevious({ href: nextUrl(previousStep.name) }, "Previous")
          )
        ),
    },
    {
      name: "step3",
      Header: () => "Step 3",
      Content: ({ previousStep }: any) =>
        Form(
          { onsubmit: onsubmitStep3 },
          p("My stepper 3 Content"),
          footer(
            ButtonPrevious(
              { href: nextUrl(previousStep.name) },
              "Previous: Step 2"
            ),
            ButtonNext({ type: "submit" }, "Save")
          )
        ),
    },
  ];

  return () => section(Stepper({ stepperDefs, stepperName }));
};
`,Re="stepper-vertical",pl=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:s,label:i,section:r,a:l,ul:c,li:u}=e.tags,d=pt(t),p=Lt(t),b=Un(t,{class:o`
      &.stepper {
        flex-direction: row;
        & > ul {
          flex-direction: column;
          & > li {
            flex-direction: row;
            gap: 0.5rem;
            justify-content: space-around;
          }
        }
      }
    `}),m=Hn(t,Re),f=U(t,{variant:"outline",color:"primary"}),g=U(t,{variant:"solid",color:"primary"}),y=({nextStep:E})=>A=>{A.preventDefault();const{organization:N}=A.target.elements;n.history.pushState("","",m(E.name,{organization:N.value}))},v=E=>{var B;E.preventDefault();const{organization:A}=(B=n.document.forms)==null?void 0:B.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${A.value}, choice:${D}`)},S=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:E})=>p({onsubmit:y({nextStep:E}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(g({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:E,previousStep:A})=>p(c(u(l({href:m(E.name,{choice:"choice1"})},"Choice 1")),u(l({href:m(E.name,{choice:"choice2"})},"Choice 2"))),a(f({href:m(A.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:E})=>p({onsubmit:v},s("My stepper 3 Content"),a(f({href:m(E.name)},"Previous: Step 2"),g({type:"submit"},"Save")))}];return()=>r(b({stepperDefs:S,stepperName:Re}))},ml=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
import button from "@grucloud/bau-ui/button";
import input from "@grucloud/bau-ui/input";
import form from "@grucloud/bau-ui/form";

import { Context } from "@grucloud/bau-ui/context";

const stepperName = "stepper-vertical";

export default (context: Context) => {
  const { bau, window, css } = context;
  const { footer, p, label, section, a, ul, li } = bau.tags;

  const Input = input(context);
  const Form = form(context);
  const Stepper = stepper(context, {
    class: css\`
      &.stepper {
        flex-direction: row;
        & > ul {
          flex-direction: column;
          & > li {
            flex-direction: row;
            gap: 0.5rem;
            justify-content: space-around;
          }
        }
      }
    \`,
  });
  const nextUrl = NextUrl(context, stepperName);
  const ButtonPrevious = button(context, {
    variant: "outline",
    color: "primary",
  });
  const ButtonNext = button(context, {
    variant: "solid",
    color: "primary",
  });

  const onsubmitStep1 =
    ({ nextStep }: any) =>
    (event: any) => {
      event.preventDefault();
      const { organization } = event.target.elements;
      window.history.pushState(
        "",
        "",
        nextUrl(nextStep.name, { organization: organization.value })
      );
    };

  const onsubmitStep3 = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const { organization } = window.document.forms?.formStep1.elements;
    const search = new URLSearchParams(window.location.search);
    const choice = search.get("choice");
    alert(\`organization \${organization.value}, choice:\${choice}\`);
  };

  const stepperDefs: StepperPage[] = [
    {
      name: "step1",
      Header: () => "Step 1",
      Content: ({ nextStep }: any) =>
        Form(
          { onsubmit: onsubmitStep1({ nextStep }), id: "formStep1" },
          label(
            "Organization",
            Input({
              autofocus: true,
              placeholder: "Organization",
              name: "organization",
            })
          ),
          footer(ButtonNext({ type: "submit" }, "Next: "))
        ),
    },
    {
      name: "step2",
      Header: () => "Step 2",
      Content: ({ nextStep, previousStep }: any) =>
        Form(
          ul(
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice1" }) },
                "Choice 1"
              )
            ),
            li(
              a(
                { href: nextUrl(nextStep.name, { choice: "choice2" }) },
                "Choice 2"
              )
            )
          ),
          footer(
            ButtonPrevious({ href: nextUrl(previousStep.name) }, "Previous")
          )
        ),
    },
    {
      name: "step3",
      Header: () => "Step 3",
      Content: ({ previousStep }: any) =>
        Form(
          { onsubmit: onsubmitStep3 },
          p("My stepper 3 Content"),
          footer(
            ButtonPrevious(
              { href: nextUrl(previousStep.name) },
              "Previous: Step 2"
            ),
            ButtonNext({ type: "submit" }, "Save")
          )
        ),
    },
  ];

  return () => section(Stepper({ stepperDefs, stepperName }));
};
`,gl={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:dl,createComponent:ul},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:ml,createComponent:pl}]},bl=t=>{const e=H(t);return()=>e(gl)},hl=()=>ot.map(t=>`
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
`);function Fn(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
    cursor: pointer;
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
    ${hl()}
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=K(r);return a({...d,class:T("switch",s,u,c,l,e==null?void 0:e.class,d.class),type:"checkbox",required:"required"},...p)}}const Vn=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:s}=n.tags,i=Fn(t,e);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},s("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),s("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},fl=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s}=e.tags,i=Fn(t);return()=>o(a(s({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",i({variant:"outline",id:"my-shinny-switch"}))))},vl=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,xl={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:vl,createComponent:fl}],gridItem:Vn},yl=t=>{const e=H(t);return()=>e(xl)},wl=()=>ot.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function Pt(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:s}=e,{div:i,ul:r,li:l,a:c}=n.tags,u=o`
    display: flex;
    flex-direction: column;
    & > ul {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid var(--color-emphasis-100);
      list-style: none;
      & li:not(:last-child) {
        border-right: 1px solid var(--color-emphasis-100);
      }
      & li {
        display: flex;
        flex-direction: column;

        & > a {
          padding: 0.6rem 1rem 0.6rem 1rem;
          color: inherit;
          text-decoration: none;
        }
        text-align: center;
        color: inherit;
        cursor: pointer;
        font-weight: var(--font-weight-semibold);
        transition: var(--transition-fast) ease-in-out;
        overflow: hidden;
        &:hover {
          color: var(--color-primary-light);
          background-color: var(--color-emphasis-200);
        }
        &::after {
          transition: var(--transition-fast) ease-in-out;
          transform: translateY(100%);
          background: var(--color-primary-light);
          opacity: 1;
          content: "";
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
    ${wl()}
  `;return function(...p){let[{size:b=e.size??"md",variant:m=e.variant??"plain",color:f=e.color??"neutral",tabsKey:g="tabs",...y},...v]=K(p);const S=n.state(s),E=O=>S.val.find($=>$.name==O),A=n.state(s[0]),N=()=>{var _,F;const $=new URLSearchParams(a.location.search).get(g)??s[0].name,j=E($);(_=A.val.exit)==null||_.call(),A.val=j,(F=j==null?void 0:j.enter)==null||F.call()};N(),a.history.pushState=new Proxy(a.history.pushState,{apply:(O,$,j)=>{O.apply($,j);const _=j[2]??"";["?","#"].includes(_[0])&&N()}});const D=O=>{const $=new URLSearchParams(a.location.search);return $.delete(g),$.append(g,O),`?${$.toString()}`},B=O=>{const{Header:$,disabled:j,name:_}=O;return l({class:()=>T(A.val.name==_&&"active",j&&"disabled")},c({href:D(_)},$(O)))},L=i({class:T("tabs",m,b,f,u,e==null?void 0:e.class,y.class),bauMounted:({element:O})=>{a.addEventListener("popstate",N)},bauUnmounted:()=>{a.removeEventListener("popstate",N)}},n.loop(S,r(),B),n.bind({deps:[A],render:()=>({Content:O})=>O?O(y):""}));return L.addEventListener("tab.add",O=>{var j;const{tab:$}=O.detail;(j=$.enter)==null||j.call(),S.val.push($)},!1),L.addEventListener("tab.remove",O=>{var j;const $=S.val.findIndex(_=>_.name==O.detail.tabName);$>0&&((j=S.val[$].exit)==null||j.call(),S.val.splice($,1))},!1),L}}const Sl=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>s({})},Cl=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;

  const tabDefs: Tabs = [
    {
      name: "Tab1",
      Header: () => "TAB 1",
      Content: () => div(p("My Tab 1 Content")),
    },
    {
      name: "Tab2",
      Header: () => "TAB 2",
      Content: () => div(p("My tab 2 Content")),
    },
  ];

  const Tabs = tabs(context, {
    tabDefs,
  });

  return () => Tabs({});
};
`,kl=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>s({tabsKey:"my-tab"})},El=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { div, p } = bau.tags;
  const tabDefs = [
    {
      name: "Tab1",
      Header: () => "TAB 1",
      Content: () => div(p("My Content")),
      enter: async () => console.log("tab1 enter"),
      exit: async () => console.log("tab1 exit"),
    },
    {
      name: "Tab2",
      Header: () => "TAB 2",
      Content: () => div(p("My TAB 2 Content")),
      enter: async () => console.log("tab2 enter"),
      exit: async () => console.log("tab2 exit"),
    },
    {
      name: "Tab Disabled",
      disabled: true,
      Header: () => "Tab Disabled",

      Content: () => div(p("My Content Disabled")),
    },
  ];

  const Tabs = tabs(context, { tabDefs, variant: "plain", color: "neutral" });

  return () => Tabs({ tabsKey: "my-tab" });
};
`,Wn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Al=t=>{const{css:e}=t,n=Pt(t,{tabDefs:Wn(t),class:e`
      flex-direction: column-reverse;
    `});return()=>n({})},Tl=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";
import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const Tabs = tabs(context, {
    tabDefs: createTabDefs(context),
    class: css\`
      flex-direction: column-reverse;
    \`,
  });

  return () => Tabs({});
};
`,Dl=t=>{const{css:e}=t,n=Wn(t),o=Pt(t,{tabDefs:n,class:e`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},Ml=`import tabs from "@grucloud/bau-ui/tabs";
import { Context } from "@grucloud/bau-ui/context";

import createTabDefs from "./tabs-definitions";

export default (context: Context) => {
  const { css } = context;

  const tabDefs = createTabDefs(context);

  const Tabs = tabs(context, {
    tabDefs,
    class: css\`
      & ul {
        justify-content: center;
      }
    \`,
  });

  return () => Tabs({});
};
`,Bl={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Cl,createComponent:Sl},{title:"Extended Tabs",description:"An extended tabs.",code:El,createComponent:kl},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Tl,createComponent:Al},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Ml,createComponent:Dl}]},Il=t=>{const e=H(t);return()=>e(Bl)};function zt(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:s}=n.tags;a`
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
`;const i=o`
    display: inline-block;
    border: 1px solid var(--color-emphasis-50);
    width: fit-content;
  `;return function(...l){let[{...c},...u]=K(l);return s({...c,class:T("table-container",i,e==null?void 0:e.class,c==null?void 0:c.class)},...u)}}const Nl=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=e.tags;function d(g,y,v,S,E){return{name:g,calories:y,fat:v,carbs:S,protein:E}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],b=({name:g,calories:y})=>i(s(g),s({class:n`
            text-align: right;
          `},y)),m=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),f=zt(t,{class:n`
      max-width: 650px;
    `});return()=>o(f(r(u("Basic Table"),m(),c(p.map(b)))))},$l=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function At(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Ll=[At("Frozen yoghurt",159,6,24,4),At("Ice cream sandwich",237,9,37,4.3),At("Eclair",262,16,24,6),At("Cupcake",305,3.7,67,4.3),At("Gingerbread",356,16,49,3.9)],Ol=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=e.tags,d=({name:m,calories:f})=>i(s(m),s({class:n`
            text-align: right;
          `},f)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=zt(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(b(r(u("Table Dense"),p(),c(Ll.map(d)))))},Pl=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Tt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const zl=[Tt("Frozen yoghurt",159,6,24,4),Tt("Ice cream sandwich",237,9,37,4.3),Tt("Eclair",262,16,24,6),Tt("Cupcake",305,3.7,67,4.3),Tt("Gingerbread",356,16,49,3.9)],Rl=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:l,tbody:c,caption:u}=e.tags,d=({name:m,calories:f})=>i(s(m),s({class:n`
            text-align: right;
          `},f)),p=()=>l(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),b=zt(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(b(r(u("Table Zebra"),p(),c(zl.map(d)))))},_l=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,jl={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:$l,createComponent:Nl},{title:"Dense",description:"A dense table.",code:Pl,createComponent:Ol},{title:"Zebra",description:"A zebra table.",code:_l,createComponent:Rl}]},Gl=t=>{const e=H(t);return()=>e(jl)},Hl=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:s,section:i,article:r}=e.tags,l=rn(t),c=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),s({id:"h3-1-1"},"h3 1 1"),s({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),s({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},c,l({contentEl:c}))},Ul=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Fl={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Ul,createComponent:Hl}]},Vl=t=>{const e=H(t);return()=>e(Fl)};function Kn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=fe(t),i=U(t),r=gt(t),l=o`
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
  `,c=({label:m,icon:f,...g})=>i({"aria-label":m,title:m,...g},f),u=({count:m,totalCount:f,page:g,rowsPerPage:y})=>a({class:"pages-numbers"},Number(g-1)*Number(y)+(m>0?1:0),"-",Math.min(g*y,f)," of ",f),d=({count:m,page:f,rowsPerPage:g})=>a({class:"pages-numbers"},(f-1)*g+(m>0?1:0),"-",f*g),p=m=>m<=1,b=(m,f,g)=>m>=Math.ceil(f/g);return function(...f){let[{size:g=e.size??"md",variant:y=e.variant??"outline",color:v=e.color??"neutral",count:S=0,totalCount:E=0,page:A=1,rowsPerPage:N=50,onPageChange:D,isLoading:B=!1,disableFirst:L=()=>p(A),disablePrevious:O=()=>p(A),disableNext:$=()=>b(A,E,N),disableLast:j=()=>b(A,E,N),..._},...F]=K(f);const P=Math.max(0,Math.ceil(E/N)),w=D({page:1}),h=D({page:A-1}),x=D({page:A+1}),C=D({page:P}),k=[{label:"First",icon:"⟪",onclick:w,disabled:L()},{label:"Previous",icon:"⟨",onclick:h,disabled:O()},{label:"Next",icon:"⟩",onclick:x,disabled:$()},{label:"Last",icon:"⟫",onclick:C,disabled:j()}];return a({..._,class:T("table-pagination",l,B&&"disabled",e==null?void 0:e.class,_==null?void 0:_.class)},r({class:"spinner",visibility:B,size:"md"}),E>0?u({count:S,totalCount:E,page:A,maxPages:P,rowsPerPage:N}):d({count:S,page:A,maxPages:P,rowsPerPage:N}),s({variant:y,color:v},k.map(G=>c({...G,variant:y,color:v}))))}}const Wl=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Kl=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:l}=e.tags,c=Wl(45),u=({name:v,email:S})=>s(a(v),a(S)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Kn(t),b=zt(t,{class:n`
      max-width: 650px;
    `}),m=e.state(c),f=e.state({count:c.length,totalCount:c.length,page:1,rowsPerPage:10}),g=e.derive(()=>m.val.slice(f.val.page*f.val.rowsPerPage,(f.val.page+1)*f.val.rowsPerPage)),y=({page:v})=>S=>{f.val.page=v};return()=>b(i(d(),()=>l(g.val.map(u))),()=>p({...f.val,onPageChange:y}))},Jl=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:l,div:c}=e.tags,u=e.state(!1),d=e.state([]),p=e.state(""),b=e.derive(()=>d.val.length),m=e.state(1),f=e.state(10),g=e.derive(()=>d.val),y=L=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(L).toString()}`,v=({page:L})=>O=>{m.val=L,S(y({page:L,per_page:f.val}))};S(y({page:1,per_page:f.val}));async function S(L){try{u.val=!0;const O=await fetch(L,{});if(O.ok){const $=await O.json();d.val=$;return}throw O}catch(O){p.val=O.message}finally{u.val=!1}}const E=({name:L,description:O,stargazers_count:$})=>s(a(L),a(O),a({class:n`
            text-align: right;
          `},$)),A=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),N=Kn(t),D=zt(t,{class:n`
      min-width: 650px;
    `}),B=({message:L})=>c(L);return()=>D(()=>N({rowsPerPage:f.val,page:m.val,count:b.val,totalCount:-1,isLoading:u.val,onPageChange:v,disableNext:()=>!1}),i(A(),()=>p.val&&B({message:p.val}),()=>l(g.val.map(E))))},Xl=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:s,h2:i,tr:r}=e.tags,l=Kl(t),c=Jl(t),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(r("Table Pagination")),s("Asynchronous Pagination"),u(c()),s("Simple Pagination"),u(l()))};function Rt(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{button:s}=n.tags;a`
    :root {
      --toggle-background-color: rgba(0, 0, 0, 0.2);
    }
    html[data-theme="dark"] {
      --toggle-background-color: rgba(255, 255, 255, 0.16)
    }
  `;const i=o`
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
  `;return function(...l){let[{size:c=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",selected:p=!1,disabled:b,onChange:m,...f},...g]=K(l);return s({type:"button",...f,"aria-pressed":{deps:[p],renderProp:()=>y=>y},class:{deps:[p],renderProp:()=>y=>T("toggle",c,d,u,i,y&&"selected",e==null?void 0:e.class,f==null?void 0:f.class)},disabled:b},g)}}const Jn=(t,e)=>{const{bau:n}=t,o=Rt(t,e);return a=>{const s=n.state(!1);return o({...a,selected:s,onclick:()=>s.val=!s.val},"Toggle Me")}},Zl=t=>{const{bau:e}=t,{section:n}=e.tags,o=Rt(t),a=e.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},ql=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Yl={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:ql,createComponent:Zl}],gridItem:Jn},Ql=t=>{const e=H(t);return()=>e(Yl)},tu=()=>ot.map(t=>`
&.toggle-group.${t} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}) !important;
  }
  & button:not(:first-child) { 
    border-left: 1px solid var(--color-${t}) !important;
  }
}

&.toggle-group.outline.${t} {
  border: none;
}

&.toggle-group.solid.${t} {
  & button:not(:last-child) { 
    border-right: 1px solid var(--color-${t}-lightest) !important;
  }
}
`).join(`
`);function ye(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
    ${tu()}
  `;return function(...r){let[{size:l=e.size??"md",variant:c=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...b},...m]=K(r);const f=new Set,g=y=>{const{value:v}=y.target;d?(f.clear(),f.add(v)):f.has(v)?f.delete(v):f.add(v),p({event:y,values:[...f]})};return a({...b,class:T("toggle-group",l,u,c,s,e==null?void 0:e.class,b==null?void 0:b.class),onclick:g},...m)}}const Xn=(t,e)=>{const{bau:n}=t,o=ye(t,e),a=Rt(t,e);return s=>{const i=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...s,onChange:({values:c})=>{i.val=c}},r.map(({label:c,value:u})=>()=>a({...s,value:u,selected:i.val.includes(u),"area-label":c},c)))}},eu=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s=Rt(t),i=ye(t),r="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:r,variant:l,exclusive:!0,onChange:c},a.map(({label:u,value:d})=>()=>s({color:r,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},nu=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,ou=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s=Rt(t),i=ye(t),r="primary",l="solid",c=({values:u})=>{o.val=u};return()=>n(i({color:r,variant:l,onChange:c},a.map(({label:u,value:d})=>()=>s({color:r,variant:l,value:d,selected:o.val.includes(d),"area-label":u},u))))},au=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,ru={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:nu,createComponent:eu},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:au,createComponent:ou}],gridItem:Xn},su=t=>{const e=H(t);return()=>e(ru)};function we(t,e={}){const{bau:n,css:o,window:a}=t,{div:s}=n.tags,i=o`
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
  `;return function(...l){let[{titleEl:c,side:u="bottom-start",size:d=e.size??"md",variant:p=e.variant??"outline",color:b=e.color??"neutral",...m},...f]=K(l);const g=s({class:T("container",...u.split("-"))},s({class:T("content",b,p,d),role:"tooltip"},c)),y=D=>`move-to-${D}`,v=(D,B,L)=>{if(D()){const O=y(B);g.classList.add(O),g.classList.add(B),g.classList.remove(L)}},S=(D,B)=>{const L=y(D);g.classList.contains(L)&&(g.classList.remove(L),g.classList.add(B),g.classList.remove(D))},E=D=>{const B=g.getBoundingClientRect();v(()=>B.x<0,"right","left"),v(()=>B.x+B.width>a.innerWidth,"left","right"),v(()=>B.y<0,"bottom","top"),v(()=>B.bottom>a.innerHeight,"top","bottom"),g.classList.add("visible")},A=D=>{g.classList.remove("visible"),S("right","left"),S("left","right"),S("bottom","top"),S("top","bottom")};return s({...m,class:T("tooltip",i,e==null?void 0:e.class,m==null?void 0:m.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",E),D.addEventListener("mouseout",A)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",E),D.removeEventListener("mouseout",A)}},...f,g)}}const Zn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:s}=n.tags,i=U(t),r=we(t,e),l=()=>o(a("A ",s("tooltip")," can be any component"));return c=>r({titleEl:l(),...c},i(c,`${c.color} ${c.variant}`))},iu=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,s=U(t),i=we(t),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:r()},s("tooltip"))},cu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,lu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:s,section:i}=e.tags,r=It(t,{variant:"outline",color:"primary"}),l=we(t),c=()=>o(a("A ",s("tooltip")," can be any component")),u=()=>i({class:n`
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem;
        `},o({class:n`
            display: flex;
            justify-content: space-around;
            gap: 1rem;
          `},l({side:"top-start",titleEl:c()},r("top-start")),l({side:"top-centered",titleEl:c()},r("top-centered")),l({side:"top-end",titleEl:c()},r("top-end"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-start",titleEl:c()},r("left-start")),l({side:"right-start",titleEl:c()},r("right-start"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-centered",titleEl:c()},r("left-centered")),l({side:"right-centered",titleEl:c()},r("right-centered"))),o({class:n`
            display: flex;
            justify-content: space-between;
          `},l({side:"left-end",titleEl:c()},r("left end")),l({side:"right-end",titleEl:c()},r("right end"))),o({class:n`
            display: flex;
            justify-content: space-around;
          `},l({side:"bottom-start",titleEl:c()},r("bottom start")),l({side:"bottom-centered",titleEl:c()},r("bottom centered")),l({side:"bottom-end",titleEl:c()},r("bottom end"))));return()=>u()},uu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,du={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:cu,createComponent:iu},{title:"Grid",description:"Various tooltip position",code:uu,createComponent:lu}],gridItem:Zn},pu=t=>{const e=H(t);return()=>e(du)},qn=(t,e)=>{const n=se(t,e);return o=>n(o)},mu=t=>{const{bau:e}=t,{section:n}=e.tags,o=se(t);return()=>n(o({}))},gu=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,bu={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:gu,createComponent:mu}],gridItem:qn},hu=t=>{const e=H(t);return()=>e(bu)},fu=({css:t,createGlobalStyles:e})=>(e`
:root {
  --treeview-link-padding-horizontal: 2rem;
  --treeview-link-padding-vertical: 0.375rem;
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
            text-align: left;
            color: inherit;
          }
        }
      }
    }

    & > ul > li {
      padding-left: 0rem;
    }
  `});function Se(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:s}=e,{ul:i,li:r,nav:l,div:c}=n.tags,u=fu({css:o,createGlobalStyles:a}),d=ge(t),p=({depth:b=1,maxDepth:m,parent:f,color:g,variant:y,size:v})=>S=>{const{children:E,expanded:A}=S,N=n.state(!A),D=()=>c({class:o`
              cursor: ${E?"pointer":"auto"};
              display: inline-flex;
              justify-content: flex-start;
              align-items: center;
              width: 100%;
            `,onclick:L=>{E&&(N.val=!N.val)}},s({item:S,parent:f})),B=()=>i({class:T(g,v)},E.map(p({depth:b+1,maxDepth:m,parent:S})));return r(d({expanded:A,Header:D,Content:E&&b<m&&B}))};return function({tree:m,maxDepth:f=1/0,size:g=e.size??"md",variant:y=e.variant??"outline",color:v=e.color??"neutral",...S}){return l({class:T(u.nav,g,y,v,e==null?void 0:e.class,S.class)},i(p({maxDepth:f,color:v,variant:y,size:g})(m)))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Se(t,{renderMenuItem:({item:{data:{name:r,href:l}}})=>o({href:l},r),...e});return r=>i({...r,tree:a})},vu=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Se(t,{renderMenuItem:({item:{data:{name:i,href:r}}})=>n({href:r},i)});return()=>s({tree:o})},xu=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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

  const renderMenuItem = ({
    item: {
      data: { name, href },
    },
  }: any) =>
    a(
      {
        href,
      },
      name
    );

  const TreeView = treeView(context, { renderMenuItem });

  return () => TreeView({ tree: menu });
};
`,yu=t=>{const{bau:e,css:n}=t,{form:o,label:a,article:s,footer:i}=e.tags,r=$t(t,{color:"neutral",variant:"outline"}),l=U(t,{variant:"outline",color:"primary"}),c=m=>{m.preventDefault();const f=m.target.closest("form"),g=Object.fromEntries(new FormData(f));alert(JSON.stringify(g))},u={data:{name:"Resources"},expanded:!0,children:[{data:{name:"EC2"},expanded:!0,children:[{data:{name:"Vpc",id:"EC2::Vpc"}},{data:{name:"Subnet",id:"EC2::Subnet"}}]},{data:{name:"IAM"},children:[{data:{name:"Role",id:"IAM:Role"}}]}]},d=({item:m,parent:f})=>g=>{console.log(m,f),g.stopPropagation()},b=Se(t,{renderMenuItem:({item:m,parent:f})=>{const{id:g,name:y}=m.data;return console.log(y,f),a({class:n`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        `,onclick:v=>v.stopPropagation()},r({onclick:d({item:m,parent:f}),name:g??y}),y)}});return()=>o({onsubmit:c},s(b({tree:u})),i(l({type:"submit"},"Submit")))},wu=`import { Context } from "@grucloud/bau-ui/context";
import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
import checkbox from "@grucloud/bau-ui/checkbox";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { form, label, article, footer } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context, {
    variant: "outline",
    color: "primary",
  });

  const onsubmit = (event: any) => {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const payload = Object.fromEntries(new FormData(formEl));
    alert(JSON.stringify(payload));
  };

  const menu: Tree = {
    data: { name: "Resources" },
    expanded: true,
    children: [
      {
        data: { name: "EC2" },
        expanded: true,
        children: [
          { data: { name: "Vpc", id: "EC2::Vpc" } },
          { data: { name: "Subnet", id: "EC2::Subnet" } },
        ],
      },
      {
        data: { name: "IAM" },
        children: [{ data: { name: "Role", id: "IAM:Role" } }],
      },
    ],
  };

  const onclickCheckbox =
    ({ item, parent }: any) =>
    (event: any) => {
      console.log(item, parent);
      event.stopPropagation();
    };

  const renderMenuItem = ({ item, parent }: any) => {
    const { id, name } = item.data;
    parent;
    console.log(name, parent);
    return label(
      {
        class: css\`
          display: flex;
          align-items: center;
          padding-right: 1rem;
        \`,
        onclick: (event: any) => event.stopPropagation(),
      },
      Checkbox({
        onclick: onclickCheckbox({ item, parent }),
        name: id ?? name,
      }),
      name
    );
  };

  const TreeView = treeView(context, { renderMenuItem });

  return () =>
    form(
      { onsubmit },
      article(TreeView({ tree: menu })),
      footer(Button({ type: "submit" }, "Submit"))
    );
};
`,Su={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Simple",description:"A simple treeview.",code:xu,createComponent:vu},{title:"Checkable",description:"A treeview with checkboxes.",code:wu,createComponent:yu}],gridItem:Yn},Cu=t=>{const e=H(t);return()=>e(Su)},ku=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=Pt(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return r=>i(r)},Eu=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:s,p:i,ul:r,li:l}=e.tags,c=sn(t),u=U(t),d=[{name:"Accordion",Item:cn(t)},{name:"Alert",Item:un(t)},{name:"Autocomplete",Item:pn(t)},{name:"Avatar",Item:dn(t)},{name:"Badge",Item:gn(t)},{name:"Breadcrumbs",Item:bn(t)},{name:"Button",Item:hn(t)},{name:"Button Group",Item:fn(t)},{name:"Calendar",Item:xn(t)},{name:"Checkbox",Item:wn(t)},{name:"Chip",Item:yn(t)},{name:"DrillDown Menu",Item:Cn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:En(t)},{name:"Input",Item:An(t)},{name:"Input Search",Item:Tn(t)},{name:"Linear Progress",Item:Nn(t)},{name:"Loading Button",Item:$n(t)},{name:"Modal",Item:On(t)},{name:"Radio Button",Item:Pn(t)},{name:"Select",Item:zn(t)},{name:"Select Native",Item:_n(t)},{name:"Slider",Item:jn(t)},{name:"Spinner",Item:Gn(t)},{name:"Switch",Item:Vn(t)},{name:"Tabs",Item:ku(t)},{name:"Theme Switch",Item:qn(t)},{name:"Toggle",Item:Jn(t)},{name:"Toggle Group",Item:Xn(t)},{name:"Tooltip",Item:Zn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
          overflow-y: scroll;
        `},s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:p})=>l(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},c(p))))},Au=({context:t})=>{const e=Eu(t);return[{path:"",action:n=>({title:"Bau UI",component:Ro(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ha(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ya(t)})},{path:"alert",action:()=>({title:"Alert",component:sr(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:dr(t)})},{path:"animate",action:()=>({title:"Animate",component:fr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:$r(t)})},{path:"avatar",action:()=>({title:"Avatar",component:Cr(t)})},{path:"badge",action:()=>({title:"Badge",component:zr(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ur(t)})},{path:"button",action:()=>({title:"Button",component:Xr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:ts(t)})},{path:"calendar",action:()=>({title:"Calendar",component:as(t)})},{path:"carousel",action:()=>({title:"Carousel",component:us(t)})},{path:"chip",action:()=>({title:"Chip",component:gs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ys(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ks(t)})},{path:"divider",action:()=>({title:"Divider",component:Ms(t)})},{path:"drawer",action:()=>({title:"Drawer",component:Ls(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:js(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Fs(t)})},{path:"fileInput",action:()=>({title:"File Input",component:Js(t)})},{path:"form",action:()=>({title:"Form",component:ni(t)})},{path:"input",action:()=>({title:"Input",component:si(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:ui(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:hi(t)})},{path:"lazy",action:()=>({title:"Lazy",component:ki(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Di(t)})},{path:"list",action:()=>({title:"List",component:_i(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Ni(t)})},{path:"modal",action:()=>({title:"Modal",component:Ui(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:qi(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:sc(t)})},{path:"paper",action:()=>({title:"Paper",component:dc(t)})},{path:"popover",action:()=>({title:"Popover",component:ec(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:bc(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:Ec(t)})},{path:"select",action:()=>({title:"Select",component:Pc(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:jc(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:Zc(t)})},{path:"slider",action:()=>({title:"Slider",component:al(t)})},{path:"spinner",action:()=>({title:"Spinner",component:cl(t)})},{path:"stepper",action:()=>({title:"Stepper",component:bl(t)})},{path:"switch",action:()=>({title:"Switch",component:yl(t)})},{path:"table",action:()=>({title:"Table",component:Gl(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Vl(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Xl(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Il(t)})},{path:"toggle",action:()=>({title:"Toggle",component:Ql(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:su(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:pu(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:hu(t)})},{path:"treeView",action:()=>({title:"Tree View",component:Cu(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Go(t)})}]},Tu=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),Du=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=t,i=a.state(),r=e({componentState:i});return document.getElementById("app").replaceChildren(r),({router:c})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:b=e}=c.resolve({pathname:u});i.val=p({}),document.title=`${d}`}},Mu=t=>{const{createGlobalStyles:e}=t;e`
    :root {
      --header-height: 3rem;
    }
    html {
      scroll-behavior: smooth;
      scroll-padding-top: calc(var(--header-height) + 1rem);
    }

    pre code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
    }
    code.hljs {
      padding: 3px 5px;
    }
    .hljs {
      background: #2f1e2e;
      color: #a39e9b;
    }
    .hljs-comment,
    .hljs-quote {
      color: #8d8687;
    }
    .hljs-link,
    .hljs-meta,
    .hljs-name,
    .hljs-regexp,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-tag,
    .hljs-template-variable,
    .hljs-variable {
      color: #ef6155;
    }
    .hljs-built_in,
    .hljs-deletion,
    .hljs-literal,
    .hljs-number,
    .hljs-params,
    .hljs-type {
      color: #f99b15;
    }
    .hljs-attribute,
    .hljs-section,
    .hljs-title {
      color: #fec418;
    }
    .hljs-addition,
    .hljs-bullet,
    .hljs-string,
    .hljs-symbol {
      color: #48b685;
    }
    .hljs-keyword,
    .hljs-selector-tag {
      color: #815ba4;
    }
    .hljs-emphasis {
      font-style: italic;
    }
    .hljs-strong {
      font-weight: 700;
    }

    pre code.hljs {
      border-radius: var(--global-radius);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `};ho();const Qn={title:"Bau",base:"/bau/bau-ui"},ht=ko({config:Qn}),{bau:Bu}=ht;ht.states={drawerOpen:Bu.state(!0)};Mu(ht);ro({routes:Au({context:ht}),onLocationChange:Du({context:ht,LayoutDefault:Lo(ht),config:Qn}),notFoundRoute:Tu(ht)});
