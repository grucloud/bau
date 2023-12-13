(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const no=(t,e)=>({...t,paths:[...e,t.path]}),_e=({paths:t=[],routes:e})=>e.flatMap(({children:n,...o})=>{const a=no(o,t);return n?[a,..._e({paths:[...t,o.path],routes:n})]:a}),oo=({paths:t})=>{const e=t.map(n=>n instanceof RegExp?n.source:n).map(n=>String.raw`\/${n}`).join("");return new RegExp(`^${e}$`)},ao=({routes:t=[],notFoundRoute:e})=>{const n=_e({routes:t}).map(o=>({...o,regex:oo(o)}));return{resolve:({pathname:o})=>{const a=n.find(({regex:s})=>s.test(o));return a?a.action({match:o.match(a.regex)}):e}}};function ro({routes:t,notFoundRoute:e,onLocationChange:n}){let o={...window.location};const a=i=>{o={...i}},s=ao({routes:t,notFoundRoute:e});return window.addEventListener("popstate",i=>{o.pathname!=i.target.location.pathname&&n({router:s}),a(i.target.location)}),window.history.pushState=new Proxy(window.history.pushState,{apply:(i,r,c)=>{i.apply(r,c),o.pathname!=window.location.pathname&&n({router:s}),a(window.location)}}),document.addEventListener("click",i=>{const{target:r}=i,c=r.closest("a");if(!c)return;const l=c.getAttribute("href");l&&!l.startsWith("http")&&!l.replace(window.location.pathname,"").startsWith("#")&&(console.log("bau router click",l),history.pushState({},null,l),a(window.location),["?","#"].includes(l[0])||window.scrollTo({top:0,left:0}),i.preventDefault())}),n({router:s}),s}const re=[["neutral",{h:"0",s:"0%",l:"50%"}],["primary",{h:"230",s:"70%",l:"30%"}],["secondary",{h:"338",s:"70%",l:"50%"}],["success",{h:"120",s:"70%",l:"25%"}],["info",{h:"194",s:"70%",l:"30%"}],["warning",{h:"43",s:"70%",l:"25%"}],["danger",{h:"358",s:"70%",l:"30%"}]],so=[["light","1.15"],["lighter","1.3"],["lightest","1.5"]],io=[["dark","0.9"],["darker","0.7"],["darkest","0.5"]],Ce=t=>`var(--color-${t})`,lo=t=>`var(--color-${t}-lightest)`,co=()=>re.map(([t])=>`
.outline.${t} {
  border: 1px solid ${Ce(t)};
  color: var(--font-color-base)
}
.soft.${t} {
  background-color: ${lo(t)};
}
.solid.${t} {
  background-color: ${Ce(t)};
}
`).join(`
`),uo=()=>re.map(([t])=>[`--color-${t}-s: var(--color-${t}-dark-s);`]).join(`
`),po=t=>100-t*10,mo=()=>new Array(10).fill("").map((t,e)=>`--color-gray-${e*100}: hsl(0, 0%, ${po(e)}%);`).join(`
`),ke=({dark:t})=>new Array(10).fill("").map((e,n)=>`--color-emphasis-${n*100}: var(--color-gray-${t?1e3-n*100:n*100});`).join(`
`),go=([t,{h:e,s:n,l:o}])=>[`--color-${t}-h: ${e};`,`--color-${t}-l: ${o};`,`--color-${t}-base-s: ${n};`,`--color-${t}-s: var(--color-${t}-base-s);`,`--color-${t}-dark-s: calc(${n} - 25%);`,`--color-${t}-hsl: var(--color-${t}-h), var(--color-${t}-s), var(--color-${t}-l);`,`--color-${t}: hsl(var(--color-${t}-hsl));`,...so.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),...io.map(([a,s])=>`--color-${t}-${a}: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * ${s}));`),`--color-${t}-contrast-background: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) / var(--contrast-background-value)));`,`--color-${t}-contrast-foreground: hsl(var(--color-${t}-h), var(--color-${t}-s), calc(var(--color-${t}-l) * var(--contrast-foreground-value)));`].join(`
`);function bo({createGlobalStyles:t},{colorPalette:e=re}={}){t`
    * {
      margin: 0;
      padding: 0;
    }
    h1,h2,h3,p {
      margin:0.3rem 0;
    }
    ul {
      padding-left:1rem
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
      ${ke({})}
      ${co()}
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
      --brightness-hover-reverse: 70% ${ke({dark:!0})};
    }
  `}function ho(){const t=document.getElementById("loading");t&&t.classList.add("m-fadeOut")}let se=t=>Object.prototype.toString.call(t??0).slice(8,-1),fo=t=>se(t)=="Object",Ee=t=>se(t)=="Function",ne=t=>["Object","Array"].includes(se(t)),Ae=Object.getPrototypeOf,oe=t=>wt(t)?t.val:t,wt=t=>t==null?void 0:t.__isState,vo=["splice","push","pop","shift","unshift","sort","reverse"],jt=(t,e)=>{const n=new Array(t.length);for(let o=0;o<t.length;o++)n[o]=e(t[o],o);return n};const X=t=>!wt(t[0])&&fo(t[0])?t:[{},...t];function xo(t){let e=(t==null?void 0:t.window)??window,{document:n}=e,o,a=new Set,s=new Set,i=!1,r,c=S=>n.createElement(S),l=(S,b,v)=>{let C=r;r=b;let k=S(v);return r=C,k},u=()=>{o||(o=e.requestAnimationFrame(()=>{a.forEach(S=>{S.bindings=S.bindings.filter(b=>{var v;return(v=b.element)==null?void 0:v.isConnected}),!S.bindings.length&&!S.computed&&a.delete(S)}),o=void 0}))},d=(S,b,v,C,k,P)=>{var z;if(i){s.add(S);return}for(let W of S.bindings){let{deps:U,element:$,renderInferred:J,render:nt,renderItem:V}=W;if(V&&b)(z=m($,C,(...tt)=>f(V(...tt)),v,k,P)[b])==null||z.call();else{let tt=J?J({element:$}):nt({element:$,renderItem:V})(...U.map(oe));tt!==$&&$.replaceWith(W.element=f(tt))}}y(S),u()},p=(S,b,v=[])=>({get(C,k,P){var z;if(r==null||r.add(S),k==="_isProxy")return!0;if(!((z=C[k])!=null&&z._isProxy)&&!wt(C[k])&&ne(C[k]))C[k]=new Proxy(C[k],p(S,b,[...v,k]));else if(vo.includes(k)){let W=C[k];return(...U)=>{let $=W.apply(C,U);return d(S,k,$,U,b,v),$}}return Reflect.get(C,k,P)},set(C,k,P,z){let W=Reflect.set(C,k,P,z);return d(S,"setItem",W,{prop:k,value:P},b,[...v,k]),W}}),g=(S,b)=>new Proxy(b,p(S,b)),m=(S,b,v,C,k,P)=>{let z=()=>S.replaceChildren(...jt(C,v)),W=U=>S[U]&&S.removeChild(S[U]);return{assign:z,sort:z,reverse:z,setItem:()=>{var $;let U=P[0];($=S.children[U])==null||$.replaceWith(v(k[U],U))},push:()=>S.append(...jt(b,(U,$)=>v(U,k.length+$))),unshift:()=>S.prepend(...jt(b,v)),pop:()=>W("lastChild"),shift:()=>W("firstChild"),splice:()=>{const{length:U}=S.children;let[$,J=U,...nt]=b;for(let V=$>=0?Math.min($+J-1,U-1):U-1;V>=($>=0?$:U+$);V--)S.children[V].remove();if(nt.length){let V=nt.forEach((tt,rt)=>v(tt,$+rt));S.children[$]?S.children[$].after(...V):S.append(...V)}}}},h=S=>({oldVal:S,bindings:[],listeners:[],__isState:!0,get val(){let b=this;return r==null||r.add(b),b.valProxy??(b.valProxy=ne(S)?g(b,S):S,b.valProxy)},set val(b){let v=this,C=v.val;ne(b)?(v.valProxy=g(v,b),d(v,"assign",b)):b!==C&&(v.valProxy=b,d(v)),v.oldVal=C}}),f=S=>{if(S==null||S===!1){const b=c("span");return b.style.display="none",b}else return S.nodeType?S:n.createTextNode(S)},x=(S,b)=>{let v=new Set;return b.val=l(S,v),v},w=S=>{let b=h(),v=x(S,b);b.computed=!0;for(let C of v)C.listeners.push({computed:S,deps:v,state:b});return b},y=S=>{for(let b of[...S.listeners])x(b.computed,b.state)},E=(S,...b)=>{if(b.length){let v=[];for(let C of b.flat(1/0))C!=null&&v.push(wt(C)?R({deps:[C],render:()=>k=>k}):Ee(C)?j({renderInferred:C}):f(C));S.append(...v)}},A={},I=(S,b)=>S&&(Object.getOwnPropertyDescriptor(S,b)??I(Ae(S),b)),D=(S,b,v)=>{var C;return A[S+","+b]??(A[S+","+b]=((C=I(v,b))==null?void 0:C.set)??0)},B=(S,b)=>new e.MutationObserver((v,C)=>{v.filter(k=>k.removedNodes).forEach(k=>[...k.removedNodes].find(P=>P===S&&(b({element:S}),C.disconnect(),!0)))}).observe(S.parentNode,{childList:!0}),O=(S,b)=>new e.MutationObserver((v,C)=>v.forEach(k=>b({record:k,element:S}))).observe(S,{childList:!0}),L=S=>new Proxy(function(v,...C){var W;let[k,...P]=X(C),z=S?n.createElementNS(S,v):c(v);for(let[U,$]of Object.entries(k)){if(U.startsWith("bau"))continue;let J=D(v,U,Ae(z))?nt=>nt!==void 0&&(z[U]=nt):nt=>z.setAttribute(U,nt);$==null||(wt($)?R({deps:[$],render:()=>()=>(J($.val),z)}):Ee($)&&(!U.startsWith("on")||$.isDerived)?j({renderInferred:()=>(J($({element:z})),z)}):$.renderProp?R({deps:$.deps,render:()=>()=>(J($.renderProp({element:z})(...$.deps.map(oe))),z)}):J($))}return k.bauChildMutated&&O(z,k.bauChildMutated),E(z,...P),z.autofocus&&z.focus&&e.requestAnimationFrame(()=>z.focus()),(W=k.bauCreated)==null||W.call(k,{element:z}),k.bauMounted&&e.requestAnimationFrame(()=>k.bauMounted({element:z})),k.bauUnmounted&&e.requestAnimationFrame(()=>B(z,k.bauUnmounted)),z},{get:(b,v)=>b.bind(void 0,v)}),N=(S,b,v)=>{S.element=f(v);for(let C of b)wt(C)&&(a.add(C),C.bindings.push(S));return S.element},j=({renderInferred:S,element:b})=>{let v=new Set,C=l(S,v,{element:b});return N({renderInferred:S},v,C)},R=({deps:S,element:b,render:v,renderItem:C})=>N({deps:S,render:v,renderItem:C},S,v({element:b,renderItem:C})(...S.map(oe))),H=(S,b,v)=>R({deps:[S],render:({renderItem:C})=>k=>(b.append(...jt(k,C)),b),renderItem:v}),Z=S=>{i=!0,S(),i=!1,s.forEach(d),s.clear()};return{tags:L(),tagsNS:L,state:h,bind:R,loop:H,derive:w,stateSet:a,batch:Z}}const yo=t=>{let e=0,n=11;for(;e<t.length;)n=101*n+t.charCodeAt(e++)>>>0;return"bau"+n},wo=(t,e,n,o)=>{const a=t.createElement("style");a.id=n,a.append(o),(e??t.head).append(a)},So=(t,e)=>t.reduce((n,o,a)=>n+o+(e[a]??""),"");function Co(t){let{document:e}=(t==null?void 0:t.window)??window;const n=o=>(a,...s)=>{const i=So(a,s),r=yo(i);return!e.getElementById(r)&&wo(e,t==null?void 0:t.target,r,o(r,i)),r};return{css:n((o,a)=>`.${o} { ${a} }`),keyframes:n((o,a)=>`@keyframes ${o} { ${a} }`),createGlobalStyles:n((o,a)=>a)}}function ko(t){const e=xo(),n=Co();return bo(n),{bau:e,...n,tr:o=>o,window,...t}}function T(...t){return t.filter(e=>e).join(" ")}function Vt(t,e={}){const{bau:n,window:o}=t,{div:a}=n.tags,s=()=>{};return function({animationHide:r=s,animationShow:c=s,...l},u){return a({class:T("animate",e==null?void 0:e.class,l.class),bauChildMutated:({record:d,element:p})=>{[...d.removedNodes].forEach(g=>{if(!r()||g.getAttribute("cloned"))return;const m=g.cloneNode(!0);o.requestAnimationFrame(()=>{m.setAttribute("cloned",!0),m.style.top=0,m.style.left=0,m.style.width=g.getAttribute("width"),m.style.height=g.getAttribute("height"),m.style.position="absolute",m.style.animation=r(),d.target.appendChild(m),m.addEventListener("animationend",()=>{var h;return(h=m.parentNode)==null?void 0:h.removeChild(m)})})}),[...d.addedNodes].forEach(g=>{g.getAttribute("cloned")||o.requestAnimationFrame(()=>{p.style.position="relative";const m=g.getBoundingClientRect();if(g.setAttribute("width",m.width+"px"),g.setAttribute("height",m.height+"px"),c()){g.style.animation=c();const h=()=>{g.removeEventListener("animationend",h),g.style.animation=""};g.addEventListener("animationend",h)}})})},...l},u)}}const ot=["neutral","primary","success","danger","warning"],Eo=["plain","outline","solid"],Ao=["sm","md","lg"],To=()=>ot.map(t=>`
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
`);function F(t,e={}){const{bau:n,css:o}=t,a=o`
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
  `;return function(...i){let[{size:r=e.size??"md",variant:c=e.variant??"none",color:l=e.color??"none",href:u,...d},...p]=X(i);return(u?n.tags.a:n.tags.button)({...!u&&{type:"button"},...d,class:T("button",e.class,c,r,l,a,d.class),href:u},p)}}const Do="light",Mo=()=>ot.map(t=>`
&.theme-switch.outline.${t} {
  color: var(--color-${t})
}
`).join(`
`);function ie(t,e={}){const{bau:n,css:o,window:a}=t,{input:s}=n.tags,i=u=>{a.document.documentElement.setAttribute("data-theme",u),localStorage.setItem("theme",u)},r=()=>{try{return localStorage.getItem("theme")}catch{}},c=r();c?i(c):a.matchMedia("(prefers-color-scheme: dark)").matches?i("dark"):a.matchMedia("(prefers-color-scheme: light)").matches?i("light"):i(Do);const l=o`
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
  `;return function(...d){let[{size:p=e.size??"md",variant:g=e.variant??"plain",color:m=e.color??"neutral",...h},...f]=X(d);return s({required:"required",title:"Switch Theme",...h,class:T("theme-switch",m,g,p,l,e==null?void 0:e.class,h.class),type:"checkbox",checked:r()=="dark",onclick:x=>{i(x.target.checked?"dark":"light")}},...f)}}function Bo(t){const{tr:e,bau:n,css:o,config:a,states:s}=t,{i,header:r,h1:c,div:l,a:u,img:d,b:p,ul:g,li:m}=n.tags,{svg:h,path:f}=n.tagsNS("http://www.w3.org/2000/svg"),x=s.drawerOpen,w=F(t,{class:o`
      background: transparent;
    `}),y=ie(t),E=()=>i(h({id:"burger-icon",version:"1.1",viewBox:"0 0 32 32",width:"40px",height:"50px"},f({fill:"currentColor",d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))),A=()=>l({class:o`
          display: flex;
          align-items: center;
          & a {
            color: var(--color-inverse);
          }
        `},w({"aria-label":"drawer",variant:"none",color:"none",onclick:()=>x.val=!x.val},E()),u({href:`${a.base}/`,class:o`
            text-decoration: none;
            font-size: x-large;
          `},p(e("Bau UI")))),I=()=>l({class:o`
          display: flex;
          padding: 1rem;
          align-items: center;
        `},y(),w({class:o``,target:"_blank",href:"https://github.com/grucloud/bau",title:"Bau's Github"},d({class:o`
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
        `},A(),I())}}function Io({tr:t,bau:e,css:n}){const{section:o,footer:a,span:s,a:i,ul:r,li:c,p:l,div:u,h1:d}=e.tags,p=({links:h,title:f})=>o({class:n`
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
        `},d(f),r(h.map(({href:x,name:w})=>c(i({href:x},w))))),g=[{href:"GettingStarted",name:"Getting Started"},{href:"components",name:"Component Gallery"}],m=[{href:"https://github.com/grucloud/bau/tree/main",name:"bau: a 2Kb alternative to React/Vue/Svelte"},{href:"https://github.com/grucloud/bau/tree/main/bau-css",name:"bau-css: a CSS in JS library in 33 lines."},{href:"https://github.com/grucloud/bau/tree/main/bau-ui",name:"bau-ui: UI Component library."},{href:"https://github.com/grucloud/bau/tree/main/bau-router",name:"bau-router: a router for SPA."}];return function(){return a({class:n`
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
          `},p({title:"Bau UI",links:g}),p({title:"Bau Ecosystem",links:m})),u({class:n`
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `},s("v0.67.1"),s("MIT license")))}}function vt(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("list",s,u,l,c,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const Gt="0.3s",Re=({parent:t,grandParent:e})=>n=>{const{children:o,...a}=n,s={...a};return s.children=o==null?void 0:o.map(Re({parent:n,grandParent:t})),t&&(t.parentTree=e),s.parentTree=t,s},je=t=>e=>{var n;if(!t)return e;if(((n=e==null?void 0:e.data)==null?void 0:n.href)==t)return e.children?e:e.parentTree;if(e.children)for(let o=0;o<e.children.length;o++){const a=je(t)(e.children[o]);if(a)return a}},No=({keyframes:t})=>({hideToLeft:t`
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
   `});function le(t,e={}){const{bau:n,css:o,window:a,config:s}=t,{base:i="",hashBased:r=!1}=e,c=`${s.base}${i}`,l=S=>{var b;return((b=S.parentTree.data)==null?void 0:b.href)??S.parentTree.children[0].data.href},u=({variant:S,color:b,size:v,currentTree:C,data:k})=>y(D({variant:S,color:b,size:v,href:`${c}${l(C)}`,class:o`
            flex-grow: 0;
          `,"data-buttonback":!0},"←"),D({variant:S,color:b,size:v,href:`${c}${k.href}`,class:o`
            flex-grow: 1;
          `,"data-ischild":!0},k.name)),d=({size:S,subTree:{data:{name:b,href:v},children:C=[]}})=>D({size:S,href:`${c}${v}`,"data-ischild":!C.length},b),p=({pathname:S,subTree:b})=>{var v;return S===((v=b==null?void 0:b.data)==null?void 0:v.href)},{renderHeader:g=u,renderMenuItem:m=d,isActive:h=p}=e,{li:f,nav:x,div:w,header:y,a:E}=n.tags,A=Vt(t),I=vt(t),D=F(t,{class:o`
      &.button {
        justify-content: flex-start;
      }
    `}),{hideToLeft:B,hideToRight:O}=No(t),L=o`
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
  `,N=({children:S,pathnameState:b,variant:v,color:C,size:k})=>I({class:T(v,C,k)},S.map(P=>f({class:()=>T(P.children&&"has-children",h({pathname:b.val,subTree:P})&&"active")},m({variant:v,color:C,size:k,subTree:P})))),j=({variant:S,color:b,size:v,currentTree:C,pathnameState:k})=>{const{children:P,parentTree:z,data:W,renderList:U}=C;return w({class:T("drillDownMenu",S,b,v)},z&&g({variant:S,color:b,size:v,data:W,currentTree:C}),P&&U?U({renderListDefault:N,children:P,pathnameState:k,variant:S,color:b,size:v}):N({children:P,pathnameState:k,variant:S,color:b,size:v}))},R=({tree:S,pathname:b})=>{let v=Re({})({...S}),C=je(b)(v);return C||(C=v),C},H=n.state(a.location.pathname.replace(c,"")),Z=({target:S})=>{let v=S.closest("a").getAttribute("href").replace(c,"");return r||(v=v.replace(S.hash,"")),v};return function(b){const{size:v=e.size??"md",variant:C=e.variant??"plain",color:k=e.color??"neutral",tree:P,...z}=b;let W=R({tree:P,pathname:H.val}),U;a.document.addEventListener("click",V=>{const{target:tt}=V,rt=tt.closest("a");if(!rt)return;const lt=rt.getAttribute("href");if(lt&&!lt.startsWith("http")&&!lt.startsWith("#")&&!lt.startsWith("?")){W=R({tree:P,pathname:Z(V)});const{ischild:gt}=V.target.dataset;gt!=="true"&&(H.val=Z({target:tt}))}});const $=V=>{const{buttonback:tt,ischild:rt}=V.target.dataset;tt=="true"?U=-1:rt=="false"?U=1:rt=="true"&&(U=0)},J=V=>{switch(V){case 1:return`${B} ${Gt}`;case-1:return`${O} ${Gt}`;default:return""}},nt=V=>{switch(V){case 1:return`${O} ${Gt} reverse`;case-1:return`${B} ${Gt} reverse`;default:return""}};return x({class:T(L,C,k,v,e==null?void 0:e.class,z.class),onclick:$},A({animationHide:()=>J(U),animationShow:()=>nt(U)},n.bind({deps:[H],render:()=>()=>j({variant:C,color:k,size:v,currentTree:W,pathnameState:H})})))}}const $o=()=>ot.map(t=>`
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
`);function dt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
  `;return function(r){const{variant:c=e.variant??"outline",color:l=e.color??"neutral",...u}=r;return a({type:"text",...u,class:T("input",e.class,e.size??"md",l,c,s,u.class)})}}function ce(t,e={}){const{bau:n,css:o,window:a}=t,s=dt(t,e);return function(r){const{variant:c=e.variant??"outline",color:l=e.color??"neutral",...u}=r,p=`url('data:image/svg+xml,<svg fill="${a.getComputedStyle(a.document.documentElement).getPropertyValue(c=="solid"?"--font-color-inverse-secondary":`--color-${l}`)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>')`,g=o`
      &.inputSearch {
        margin: 0.5rem 1rem;
        padding-left: 1.8rem;
        background-image: ${p};
        background-repeat: no-repeat;
        background-size: 1rem;
        background-position: 0.3rem;
      }
    `;return s({type:"search",...u,color:l,variant:c,class:T("inputSearch",e.class,g,u.class)})}}function Ge(t){const{tr:e,bau:n,css:o,config:a,states:s,window:i}=t,{div:r,ul:c,li:l,nav:u,a:d,span:p}=n.tags,g=ce(t,{variant:"plain",color:"neutral",size:"sm"}),h={data:{name:"Root"},children:[{data:{name:"Home",href:"/"}},{data:{name:"Getting Started",href:"/GettingStarted"}},{data:{name:"Components",href:"/components"},renderList:({renderListDefault:w,children:y,pathnameState:E,variant:A,color:I,size:D})=>{const B=n.state(""),O=n.derive(()=>B.val==""?y:y.filter(N=>N.data.name.match(new RegExp(`${B.val}`,"i")))),L=N=>{B.val=N.target.value};return r({class:o`
          display: flex;
          flex-direction: column;
        `},g({autocomplete:!1,name:"search",autofocus:!0,value:B,placeholder:`Search ${O.val.length} components`,size:22,oninput:L}),()=>w({children:O.val,pathnameState:E,variant:A,color:I,size:D}))},children:[{data:{name:"Accordion",href:"/components/accordion"}},{data:{name:"Alert",href:"/components/alert"}},{data:{name:"Alert Stack",href:"/components/alertStack"}},{data:{name:"Animate",href:"/components/animate"}},{data:{name:"Autocomplete",href:"/components/autocomplete"}},{data:{name:"Avatar",href:"/components/avatar"}},{data:{name:"Badge",href:"/components/badge"}},{data:{name:"Breadcrumb",href:"/components/breadcrumb"}},{data:{name:"Button",href:"/components/button"}},{data:{name:"Button Group",href:"/components/buttonGroup"}},{data:{name:"Calendar",href:"/components/calendar"}},{data:{name:"Carousel",href:"/components/carousel"}},{data:{name:"Chip",href:"/components/chip"}},{data:{name:"Checkbox",href:"/components/checkbox"}},{data:{name:"Collapsible",href:"/components/collapsible"}},{data:{name:"Divider",href:"/components/divider"}},{data:{name:"Drawer",href:"/components/drawer"}},{data:{name:"Dropdown Menu",href:"/components/dropdownMenu"}},{data:{name:"DrillDown Menu",href:"/components/drillDownMenu"}},{data:{name:"File Input",href:"/components/fileInput"}},{data:{name:"Form",href:"/components/form"}},{data:{name:"Input",href:"/components/input"}},{data:{name:"Input Search",href:"/components/inputSearch"}},{data:{name:"Key Value List",href:"/components/keyValueList"}},{data:{name:"Lazy",href:"/components/lazy"}},{data:{name:"Linear Progress",href:"/components/linearProgress"}},{data:{name:"List",href:"/components/list"}},{data:{name:"Loading Button",href:"/components/loadingButton"}},{data:{name:"Modal",href:"/components/modal"}},{data:{name:"Multi Select",href:"/components/multiSelect"}},{data:{name:"Paper",href:"/components/paper"}},{data:{name:"Pagination Navigation",href:"/components/paginationNavigation"}},{data:{name:"Popover",href:"/components/popover"}},{data:{name:"Radio Button",href:"/components/radioButton"}},{data:{name:"Radio Button Group",href:"/components/radioButtonGroup"}},{data:{name:"Select",href:"/components/select"}},{data:{name:"Select Native",href:"/components/selectNative"}},{data:{name:"Skeleton",href:"/components/skeleton"}},{data:{name:"Slider",href:"/components/slider"}},{data:{name:"Spinner",href:"/components/spinner"}},{data:{name:"Stepper",href:"/components/stepper"}},{data:{name:"Switch",href:"/components/switch"}},{data:{name:"Table",href:"/components/table"}},{data:{name:"Table Pagination",href:"/components/tablePagination"}},{data:{name:"Tabs",href:"/components/tabs"}},{data:{name:"Table of content",href:"/components/tableOfContent"}},{data:{name:"Toggle",href:"/components/toggle"}},{data:{name:"Toggle Group",href:"/components/toggleGroup"}},{data:{name:"Tooltip",href:"/components/tooltip"}},{data:{name:"Theme Switch",href:"/components/themeSwitch"}},{data:{name:"Tree View",href:"/components/treeView"}}]}]};let f=!1;const x=le(t);return function(){return r({bauMounted:({element:y})=>{i.innerWidth<=640&&(f=!0,s.drawerOpen.val=!1)},onclick:y=>{f&&!y.target.dataset.buttonback&&!y.target.parentElement.classList.contains("has-children")&&(s.drawerOpen.val=!1)},style:()=>s.drawerOpen.val?"display:block;":"display:none;",class:T(o`
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
          `)},x({tree:h}))}}const Lo=t=>{const{bau:e,css:n,states:o,keyframes:a}=t,{div:s}=e.tags,i=Vt(t),r=Bo(t),c=Ge(t),l=Io(t),u=a`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `,d=(p="")=>`${u} ease-in-out 0.5s ${p}`;return function({componentState:g}){return s({class:n`
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
        `},r(),c(),i({class:n`
            grid-area: main;
            margin: 0 1rem;
            display: grid;
          `,animationHide:()=>d(),animationShow:()=>d("reverse")},()=>g.val),l())}};function It(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"outline",color:u=e.color??"neutral",onclick:d,...p},...g]=X(r);return a({...p,onclick:d,class:T("chip",e.class,c,l,u,d&&"clickable",s,p.class)},...g)}}function Oo(t){const{bau:e,css:n,config:o}=t,{div:a,h1:s,h2:i,p:r}=e.tags;F(t);const c=n`
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
  `;return function({name:u,text:d,tagLine:p}){return a({class:c},s(u),i(d),r(p))}}function Po(t){const{bau:e,css:n}=t,{div:o,h1:a,p:s}=e.tags,i=n`
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
  `,r=({title:c,Content:l})=>o({className:"feature"},a(c),s(l()));return function({featuresContent:l}){return o({class:i},l.map(r))}}function zo({tr:t,bau:e,css:n}){const{article:o,dl:a,dt:s,dd:i,div:r,aside:c,footer:l,a:u}=e.tags,d=({maxSize:p=151})=>({libName:g,size:m})=>r({class:n`
            display: flex;
            margin: 0.3rem;
          `},s({class:n`
              display: flex;
              flex-basis: 14rem;
              justify-content: flex-end;
              font-size: larger;
              font-weight: 600;
              color: var(--color-emphasis-600);
            `},g),i({class:n`
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
              `},m)));return function({data:g=[]}){return o({class:n`
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
          `},g.map(d({}))),l({class:n`
            text-align: center;
          `},"The bundle size corresponds to a simple application with a dozen components. ",u({href:"https://github.com/FredericHeem/component-library-bundle-size"},"How is it measured?")))}}function _o(t){const{bau:e,css:n,config:o}=t,{div:a,p:s,a:i,section:r}=e.tags,c=Oo(t),l=Po(t),u=F(t);It(t);const d=zo(t),p=(...x)=>a({class:n`
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
          `},...x)),g=n``,m=[{libName:"Bau UI ",size:11},{libName:"Shadcn/React",size:88},{libName:"Svelte UI",size:105},{libName:"Quasar/Vue ",size:124},{libName:"Material UI React",size:133},{libName:"Material UI Angular",size:151}],h=[{title:"UI components for the web",Content:()=>[s("Over 45 components such as button, input, tabs, autocomplete etc ..."),u({href:`${o.base}/components`,color:"primary",variant:"solid",size:"lg"},"Visit Gallery")]},{title:"Component style",Content:()=>[s("Each component has a combination of variant, color and size:"),p(u({variant:"solid",color:"primary"},"solid"),u({variant:"outline",color:"primary"},"outline"),u({variant:"plain",color:"primary"},"plain")),p(u({variant:"solid",color:"neutral",size:"sm"},"neutral"),u({variant:"solid",color:"primary",size:"sm"},"primary"),u({variant:"solid",color:"danger",size:"sm"},"danger"),u({variant:"solid",color:"warning",size:"sm"},"warning")),p(u({variant:"outline",color:"primary",size:"sm"},"small"),u({variant:"outline",color:"primary",size:"md"},"medium"),u({variant:"outline",color:"primary",size:"lg"},"large"))]},{title:"Tech",Content:()=>[s("Built with ",i({href:"https://github.com/grucloud/bau"},"Bau"),", a 2kB alternative to React, Vue, Angular, and Svelte."),s("Typescript support for a better developer experience.")]}],f=()=>r({class:n`
          display: flex;
          flex-wrap: wrap;
          margin: 2rem;
          gap: 2rem;
          justify-content: center;
        `},u({color:"primary",variant:"solid",href:"GettingStarted",size:"lg"},"Getting Started"),u({color:"primary",variant:"outline",href:"components",size:"lg"},"Component Gallery"),u({color:"neutral",variant:"outline",href:"https://github.com/grucloud/bau/tree/main/bau-ui",target:"_blank",size:"lg"},"Source Code"));return function({}){return a({class:g},c({name:"Bau UI",text:"Stylable UI Components",tagLine:"Web UI components, easy to use, stylable, lightweight."}),l({featuresContent:h}),d({data:m}),f())}}function Ro(t,e={}){const{bau:n,css:o}=t,{div:a,form:s,span:i,pre:r,h3:c,h4:l}=n.tags;return function(d,...p){return a("Login")}}const jo=t=>{const{tr:e,bau:n}=t,{section:o,div:a,h3:s,h2:i}=n.tags,r=Ro(t);return()=>o({id:"login"},i(e("Login Examples")),s("Basic"),a(r()))};function Go(t){const{tr:e,bau:n,css:o}=t,{div:a,article:s,h1:i}=n.tags;return function(){return a({class:o`
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
          `},i(e("Pages Examples")),jo(t)()))}}function Ho(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function He(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw new Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw new Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(e=>{const n=t[e],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&He(n)}),t}class Te{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ue(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function pt(t,...e){const n=Object.create(null);for(const o in t)n[o]=t[o];return e.forEach(function(o){for(const a in o)n[a]=o[a]}),n}const Uo="</span>",De=t=>!!t.scope,Fo=(t,{prefix:e})=>{if(t.startsWith("language:"))return t.replace("language:","language-");if(t.includes(".")){const n=t.split(".");return[`${e}${n.shift()}`,...n.map((o,a)=>`${o}${"_".repeat(a+1)}`)].join(" ")}return`${e}${t}`};class Vo{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=Ue(e)}openNode(e){if(!De(e))return;const n=Fo(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){De(e)&&(this.buffer+=Uo)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const Me=(t={})=>{const e={children:[]};return Object.assign(e,t),e};class ue{constructor(){this.rootNode=Me(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=Me({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return typeof n=="string"?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(o=>this._walk(e,o)),e.closeNode(n)),e}static _collapse(e){typeof e!="string"&&e.children&&(e.children.every(n=>typeof n=="string")?e.children=[e.children.join("")]:e.children.forEach(n=>{ue._collapse(n)}))}}class Wo extends ue{constructor(e){super(),this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const o=e.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new Vo(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function Mt(t){return t?typeof t=="string"?t:t.source:null}function Fe(t){return xt("(?=",t,")")}function Ko(t){return xt("(?:",t,")*")}function Xo(t){return xt("(?:",t,")?")}function xt(...t){return t.map(n=>Mt(n)).join("")}function Zo(t){const e=t[t.length-1];return typeof e=="object"&&e.constructor===Object?(t.splice(t.length-1,1),e):{}}function de(...t){return"("+(Zo(t).capture?"":"?:")+t.map(o=>Mt(o)).join("|")+")"}function Ve(t){return new RegExp(t.toString()+"|").exec("").length-1}function qo(t,e){const n=t&&t.exec(e);return n&&n.index===0}const Jo=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function pe(t,{joinWith:e}){let n=0;return t.map(o=>{n+=1;const a=n;let s=Mt(o),i="";for(;s.length>0;){const r=Jo.exec(s);if(!r){i+=s;break}i+=s.substring(0,r.index),s=s.substring(r.index+r[0].length),r[0][0]==="\\"&&r[1]?i+="\\"+String(Number(r[1])+a):(i+=r[0],r[0]==="("&&n++)}return i}).map(o=>`(${o})`).join(e)}const Yo=/\b\B/,We="[a-zA-Z]\\w*",me="[a-zA-Z_]\\w*",Ke="\\b\\d+(\\.\\d+)?",Xe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ze="\\b(0b[01]+)",Qo="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",ta=(t={})=>{const e=/^#![ ]*\//;return t.binary&&(t.begin=xt(e,/.*\b/,t.binary,/\b.*/)),pt({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},t)},Bt={begin:"\\\\[\\s\\S]",relevance:0},ea={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Bt]},na={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Bt]},oa={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Wt=function(t,e,n={}){const o=pt({scope:"comment",begin:t,end:e,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const a=de("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:xt(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},aa=Wt("//","$"),ra=Wt("/\\*","\\*/"),sa=Wt("#","$"),ia={scope:"number",begin:Ke,relevance:0},la={scope:"number",begin:Xe,relevance:0},ca={scope:"number",begin:Ze,relevance:0},ua={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[Bt,{begin:/\[/,end:/\]/,relevance:0,contains:[Bt]}]}]},da={scope:"title",begin:We,relevance:0},pa={scope:"title",begin:me,relevance:0},ma={begin:"\\.\\s*"+me,relevance:0},ga=function(t){return Object.assign(t,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})};var Ht=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Yo,IDENT_RE:We,UNDERSCORE_IDENT_RE:me,NUMBER_RE:Ke,C_NUMBER_RE:Xe,BINARY_NUMBER_RE:Ze,RE_STARTERS_RE:Qo,SHEBANG:ta,BACKSLASH_ESCAPE:Bt,APOS_STRING_MODE:ea,QUOTE_STRING_MODE:na,PHRASAL_WORDS_MODE:oa,COMMENT:Wt,C_LINE_COMMENT_MODE:aa,C_BLOCK_COMMENT_MODE:ra,HASH_COMMENT_MODE:sa,NUMBER_MODE:ia,C_NUMBER_MODE:la,BINARY_NUMBER_MODE:ca,REGEXP_MODE:ua,TITLE_MODE:da,UNDERSCORE_TITLE_MODE:pa,METHOD_GUARD:ma,END_SAME_AS_BEGIN:ga});function ba(t,e){t.input[t.index-1]==="."&&e.ignoreMatch()}function ha(t,e){t.className!==void 0&&(t.scope=t.className,delete t.className)}function fa(t,e){e&&t.beginKeywords&&(t.begin="\\b("+t.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",t.__beforeBegin=ba,t.keywords=t.keywords||t.beginKeywords,delete t.beginKeywords,t.relevance===void 0&&(t.relevance=0))}function va(t,e){Array.isArray(t.illegal)&&(t.illegal=de(...t.illegal))}function xa(t,e){if(t.match){if(t.begin||t.end)throw new Error("begin & end are not supported with match");t.begin=t.match,delete t.match}}function ya(t,e){t.relevance===void 0&&(t.relevance=1)}const wa=(t,e)=>{if(!t.beforeMatch)return;if(t.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},t);Object.keys(t).forEach(o=>{delete t[o]}),t.keywords=n.keywords,t.begin=xt(n.beforeMatch,Fe(n.begin)),t.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},t.relevance=0,delete n.beforeMatch},Sa=["of","and","for","in","not","or","if","then","parent","list","value"],Ca="keyword";function qe(t,e,n=Ca){const o=Object.create(null);return typeof t=="string"?a(n,t.split(" ")):Array.isArray(t)?a(n,t):Object.keys(t).forEach(function(s){Object.assign(o,qe(t[s],e,s))}),o;function a(s,i){e&&(i=i.map(r=>r.toLowerCase())),i.forEach(function(r){const c=r.split("|");o[c[0]]=[s,ka(c[0],c[1])]})}}function ka(t,e){return e?Number(e):Ea(t)?0:1}function Ea(t){return Sa.includes(t.toLowerCase())}const Be={},ft=t=>{console.error(t)},Ie=(t,...e)=>{console.log(`WARN: ${t}`,...e)},yt=(t,e)=>{Be[`${t}/${e}`]||(console.log(`Deprecated as of ${t}. ${e}`),Be[`${t}/${e}`]=!0)},Ft=new Error;function Je(t,e,{key:n}){let o=0;const a=t[n],s={},i={};for(let r=1;r<=e.length;r++)i[r+o]=a[r],s[r+o]=!0,o+=Ve(e[r-1]);t[n]=i,t[n]._emit=s,t[n]._multi=!0}function Aa(t){if(Array.isArray(t.begin)){if(t.skip||t.excludeBegin||t.returnBegin)throw ft("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Ft;if(typeof t.beginScope!="object"||t.beginScope===null)throw ft("beginScope must be object"),Ft;Je(t,t.begin,{key:"beginScope"}),t.begin=pe(t.begin,{joinWith:""})}}function Ta(t){if(Array.isArray(t.end)){if(t.skip||t.excludeEnd||t.returnEnd)throw ft("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Ft;if(typeof t.endScope!="object"||t.endScope===null)throw ft("endScope must be object"),Ft;Je(t,t.end,{key:"endScope"}),t.end=pe(t.end,{joinWith:""})}}function Da(t){t.scope&&typeof t.scope=="object"&&t.scope!==null&&(t.beginScope=t.scope,delete t.scope)}function Ma(t){Da(t),typeof t.beginScope=="string"&&(t.beginScope={_wrap:t.beginScope}),typeof t.endScope=="string"&&(t.endScope={_wrap:t.endScope}),Aa(t),Ta(t)}function Ba(t){function e(i,r){return new RegExp(Mt(i),"m"+(t.case_insensitive?"i":"")+(t.unicodeRegex?"u":"")+(r?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(r,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,r]),this.matchAt+=Ve(r)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const r=this.regexes.map(c=>c[1]);this.matcherRe=e(pe(r,{joinWith:"|"}),!0),this.lastIndex=0}exec(r){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(r);if(!c)return null;const l=c.findIndex((d,p)=>p>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(r){if(this.multiRegexes[r])return this.multiRegexes[r];const c=new n;return this.rules.slice(r).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[r]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(r,c){this.rules.push([r,c]),c.type==="begin"&&this.count++}exec(r){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(r);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){const u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(r)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function a(i){const r=new o;return i.contains.forEach(c=>r.addRule(c.begin,{rule:c,type:"begin"})),i.terminatorEnd&&r.addRule(i.terminatorEnd,{type:"end"}),i.illegal&&r.addRule(i.illegal,{type:"illegal"}),r}function s(i,r){const c=i;if(i.isCompiled)return c;[ha,xa,Ma,wa].forEach(u=>u(i,r)),t.compilerExtensions.forEach(u=>u(i,r)),i.__beforeBegin=null,[fa,va,ya].forEach(u=>u(i,r)),i.isCompiled=!0;let l=null;return typeof i.keywords=="object"&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=qe(i.keywords,t.case_insensitive)),c.keywordPatternRe=e(l,!0),r&&(i.begin||(i.begin=/\B|\b/),c.beginRe=e(c.begin),!i.end&&!i.endsWithParent&&(i.end=/\B|\b/),i.end&&(c.endRe=e(c.end)),c.terminatorEnd=Mt(c.end)||"",i.endsWithParent&&r.terminatorEnd&&(c.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(c.illegalRe=e(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(function(u){return Ia(u==="self"?i:u)})),i.contains.forEach(function(u){s(u,c)}),i.starts&&s(i.starts,r),c.matcher=a(c),c}if(t.compilerExtensions||(t.compilerExtensions=[]),t.contains&&t.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return t.classNameAliases=pt(t.classNameAliases||{}),s(t)}function Ye(t){return t?t.endsWithParent||Ye(t.starts):!1}function Ia(t){return t.variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return pt(t,{variants:null},e)})),t.cachedVariants?t.cachedVariants:Ye(t)?pt(t,{starts:t.starts?pt(t.starts):null}):Object.isFrozen(t)?pt(t):t}var Na="11.8.0";class $a extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const ae=Ue,Ne=pt,$e=Symbol("nomatch"),La=7,Qe=function(t){const e=Object.create(null),n=Object.create(null),o=[];let a=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",i={disableAutodetect:!0,name:"Plain text",contains:[]};let r={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Wo};function c(b){return r.noHighlightRe.test(b)}function l(b){let v=b.className+" ";v+=b.parentNode?b.parentNode.className:"";const C=r.languageDetectRe.exec(v);if(C){const k=O(C[1]);return k||(Ie(s.replace("{}",C[1])),Ie("Falling back to no-highlight mode for this block.",b)),k?C[1]:"no-highlight"}return v.split(/\s+/).find(k=>c(k)||O(k))}function u(b,v,C){let k="",P="";typeof v=="object"?(k=b,C=v.ignoreIllegals,P=v.language):(yt("10.7.0","highlight(lang, code, ...args) has been deprecated."),yt("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),P=b,k=v),C===void 0&&(C=!0);const z={code:k,language:P};Z("before:highlight",z);const W=z.result?z.result:d(z.language,z.code,C);return W.code=z.code,Z("after:highlight",W),W}function d(b,v,C,k){const P=Object.create(null);function z(M,_){return M.keywords[_]}function W(){if(!K.keywords){st.addText(et);return}let M=0;K.keywordPatternRe.lastIndex=0;let _=K.keywordPatternRe.exec(et),q="";for(;_;){q+=et.substring(M,_.index);const Q=at.case_insensitive?_[0].toLowerCase():_[0],it=z(K,Q);if(it){const[ut,to]=it;if(st.addText(q),q="",P[Q]=(P[Q]||0)+1,P[Q]<=La&&(Rt+=to),ut.startsWith("_"))q+=_[0];else{const eo=at.classNameAliases[ut]||ut;J(_[0],eo)}}else q+=_[0];M=K.keywordPatternRe.lastIndex,_=K.keywordPatternRe.exec(et)}q+=et.substring(M),st.addText(q)}function U(){if(et==="")return;let M=null;if(typeof K.subLanguage=="string"){if(!e[K.subLanguage]){st.addText(et);return}M=d(K.subLanguage,et,!0,Se[K.subLanguage]),Se[K.subLanguage]=M._top}else M=g(et,K.subLanguage.length?K.subLanguage:null);K.relevance>0&&(Rt+=M.relevance),st.__addSublanguage(M._emitter,M.language)}function $(){K.subLanguage!=null?U():W(),et=""}function J(M,_){M!==""&&(st.startScope(_),st.addText(M),st.endScope())}function nt(M,_){let q=1;const Q=_.length-1;for(;q<=Q;){if(!M._emit[q]){q++;continue}const it=at.classNameAliases[M[q]]||M[q],ut=_[q];it?J(ut,it):(et=ut,W(),et=""),q++}}function V(M,_){return M.scope&&typeof M.scope=="string"&&st.openNode(at.classNameAliases[M.scope]||M.scope),M.beginScope&&(M.beginScope._wrap?(J(et,at.classNameAliases[M.beginScope._wrap]||M.beginScope._wrap),et=""):M.beginScope._multi&&(nt(M.beginScope,_),et="")),K=Object.create(M,{parent:{value:K}}),K}function tt(M,_,q){let Q=qo(M.endRe,q);if(Q){if(M["on:end"]){const it=new Te(M);M["on:end"](_,it),it.isMatchIgnored&&(Q=!1)}if(Q){for(;M.endsParent&&M.parent;)M=M.parent;return M}}if(M.endsWithParent)return tt(M.parent,_,q)}function rt(M){return K.matcher.regexIndex===0?(et+=M[0],1):(ee=!0,0)}function lt(M){const _=M[0],q=M.rule,Q=new Te(q),it=[q.__beforeBegin,q["on:begin"]];for(const ut of it)if(ut&&(ut(M,Q),Q.isMatchIgnored))return rt(_);return q.skip?et+=_:(q.excludeBegin&&(et+=_),$(),!q.returnBegin&&!q.excludeBegin&&(et=_)),V(q,M),q.returnBegin?0:_.length}function gt(M){const _=M[0],q=v.substring(M.index),Q=tt(K,M,q);if(!Q)return $e;const it=K;K.endScope&&K.endScope._wrap?($(),J(_,K.endScope._wrap)):K.endScope&&K.endScope._multi?($(),nt(K.endScope,M)):it.skip?et+=_:(it.returnEnd||it.excludeEnd||(et+=_),$(),it.excludeEnd&&(et=_));do K.scope&&st.closeNode(),!K.skip&&!K.subLanguage&&(Rt+=K.relevance),K=K.parent;while(K!==Q.parent);return Q.starts&&V(Q.starts,M),it.returnEnd?0:_.length}function Et(){const M=[];for(let _=K;_!==at;_=_.parent)_.scope&&M.unshift(_.scope);M.forEach(_=>st.openNode(_))}let ct={};function Y(M,_){const q=_&&_[0];if(et+=M,q==null)return $(),0;if(ct.type==="begin"&&_.type==="end"&&ct.index===_.index&&q===""){if(et+=v.slice(_.index,_.index+1),!a){const Q=new Error(`0 width match regex (${b})`);throw Q.languageName=b,Q.badRule=ct.rule,Q}return 1}if(ct=_,_.type==="begin")return lt(_);if(_.type==="illegal"&&!C){const Q=new Error('Illegal lexeme "'+q+'" for mode "'+(K.scope||"<unnamed>")+'"');throw Q.mode=K,Q}else if(_.type==="end"){const Q=gt(_);if(Q!==$e)return Q}if(_.type==="illegal"&&q==="")return 1;if(te>1e5&&te>_.index*3)throw new Error("potential infinite loop, way more iterations than matches");return et+=q,q.length}const at=O(b);if(!at)throw ft(s.replace("{}",b)),new Error('Unknown language: "'+b+'"');const _t=Ba(at);let Qt="",K=k||_t;const Se={},st=new r.__emitter(r);Et();let et="",Rt=0,bt=0,te=0,ee=!1;try{if(at.__emitTokens)at.__emitTokens(v,st);else{for(K.matcher.considerAll();;){te++,ee?ee=!1:K.matcher.considerAll(),K.matcher.lastIndex=bt;const M=K.matcher.exec(v);if(!M)break;const _=v.substring(bt,M.index),q=Y(_,M);bt=M.index+q}Y(v.substring(bt))}return st.finalize(),Qt=st.toHTML(),{language:b,value:Qt,relevance:Rt,illegal:!1,_emitter:st,_top:K}}catch(M){if(M.message&&M.message.includes("Illegal"))return{language:b,value:ae(v),illegal:!0,relevance:0,_illegalBy:{message:M.message,index:bt,context:v.slice(bt-100,bt+100),mode:M.mode,resultSoFar:Qt},_emitter:st};if(a)return{language:b,value:ae(v),illegal:!1,relevance:0,errorRaised:M,_emitter:st,_top:K};throw M}}function p(b){const v={value:ae(b),illegal:!1,relevance:0,_top:i,_emitter:new r.__emitter(r)};return v._emitter.addText(b),v}function g(b,v){v=v||r.languages||Object.keys(e);const C=p(b),k=v.filter(O).filter(N).map($=>d($,b,!1));k.unshift(C);const P=k.sort(($,J)=>{if($.relevance!==J.relevance)return J.relevance-$.relevance;if($.language&&J.language){if(O($.language).supersetOf===J.language)return 1;if(O(J.language).supersetOf===$.language)return-1}return 0}),[z,W]=P,U=z;return U.secondBest=W,U}function m(b,v,C){const k=v&&n[v]||C;b.classList.add("hljs"),b.classList.add(`language-${k}`)}function h(b){let v=null;const C=l(b);if(c(C))return;if(Z("before:highlightElement",{el:b,language:C}),b.children.length>0&&(r.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(b)),r.throwUnescapedHTML))throw new $a("One of your code blocks includes unescaped HTML.",b.innerHTML);v=b;const k=v.textContent,P=C?u(k,{language:C,ignoreIllegals:!0}):g(k);b.innerHTML=P.value,m(b,C,P.language),b.result={language:P.language,re:P.relevance,relevance:P.relevance},P.secondBest&&(b.secondBest={language:P.secondBest.language,relevance:P.secondBest.relevance}),Z("after:highlightElement",{el:b,result:P,text:k})}function f(b){r=Ne(r,b)}const x=()=>{E(),yt("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function w(){E(),yt("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let y=!1;function E(){if(document.readyState==="loading"){y=!0;return}document.querySelectorAll(r.cssSelector).forEach(h)}function A(){y&&E()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function I(b,v){let C=null;try{C=v(t)}catch(k){if(ft("Language definition for '{}' could not be registered.".replace("{}",b)),a)ft(k);else throw k;C=i}C.name||(C.name=b),e[b]=C,C.rawDefinition=v.bind(null,t),C.aliases&&L(C.aliases,{languageName:b})}function D(b){delete e[b];for(const v of Object.keys(n))n[v]===b&&delete n[v]}function B(){return Object.keys(e)}function O(b){return b=(b||"").toLowerCase(),e[b]||e[n[b]]}function L(b,{languageName:v}){typeof b=="string"&&(b=[b]),b.forEach(C=>{n[C.toLowerCase()]=v})}function N(b){const v=O(b);return v&&!v.disableAutodetect}function j(b){b["before:highlightBlock"]&&!b["before:highlightElement"]&&(b["before:highlightElement"]=v=>{b["before:highlightBlock"](Object.assign({block:v.el},v))}),b["after:highlightBlock"]&&!b["after:highlightElement"]&&(b["after:highlightElement"]=v=>{b["after:highlightBlock"](Object.assign({block:v.el},v))})}function R(b){j(b),o.push(b)}function H(b){const v=o.indexOf(b);v!==-1&&o.splice(v,1)}function Z(b,v){const C=b;o.forEach(function(k){k[C]&&k[C](v)})}function S(b){return yt("10.7.0","highlightBlock will be removed entirely in v12.0"),yt("10.7.0","Please use highlightElement now."),h(b)}Object.assign(t,{highlight:u,highlightAuto:g,highlightAll:E,highlightElement:h,highlightBlock:S,configure:f,initHighlighting:x,initHighlightingOnLoad:w,registerLanguage:I,unregisterLanguage:D,listLanguages:B,getLanguage:O,registerAliases:L,autoDetection:N,inherit:Ne,addPlugin:R,removePlugin:H}),t.debugMode=function(){a=!1},t.safeMode=function(){a=!0},t.versionString=Na,t.regex={concat:xt,lookahead:Fe,either:de,optional:Xo,anyNumberOfTimes:Ko};for(const b in Ht)typeof Ht[b]=="object"&&He(Ht[b]);return Object.assign(t,Ht),t},St=Qe({});St.newInstance=()=>Qe({});var Oa=St;St.HighlightJS=St;St.default=St;const Dt=Ho(Oa),Le="[A-Za-z$_][0-9A-Za-z$_]*",Pa=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],za=["true","false","null","undefined","NaN","Infinity"],tn=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],en=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],nn=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],_a=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ra=[].concat(nn,tn,en);function on(t){const e=t.regex,n=(v,{after:C})=>{const k="</"+v[0].slice(1);return v.input.indexOf(k,C)!==-1},o=Le,a={begin:"<>",end:"</>"},s=/<[A-Za-z0-9\\._:-]+\s*\/>/,i={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(v,C)=>{const k=v[0].length+v.index,P=v.input[k];if(P==="<"||P===","){C.ignoreMatch();return}P===">"&&(n(v,{after:k})||C.ignoreMatch());let z;const W=v.input.substring(k);if(z=W.match(/^\s*=/)){C.ignoreMatch();return}if((z=W.match(/^\s+extends\s+/))&&z.index===0){C.ignoreMatch();return}}},r={$pattern:Le,keyword:Pa,literal:za,built_in:Ra,"variable.language":_a},c="[0-9](_?[0-9])*",l=`\\.(${c})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${u})((${l})|\\.)?|(${l}))[eE][+-]?(${c})\\b`},{begin:`\\b(${u})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},g={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},m={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"css"}},h={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[t.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},f={className:"string",begin:"`",end:"`",contains:[t.BACKSLASH_ESCAPE,p]},w={className:"comment",variants:[t.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:o+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),t.C_BLOCK_COMMENT_MODE,t.C_LINE_COMMENT_MODE]},y=[t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,m,h,f,{match:/\$\d+/},d];p.contains=y.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(y)});const E=[].concat(w,p.contains),A=E.concat([{begin:/\(/,end:/\)/,keywords:r,contains:["self"].concat(E)}]),I={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A},D={variants:[{match:[/class/,/\s+/,o,/\s+/,/extends/,/\s+/,e.concat(o,"(",e.concat(/\./,o),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,o],scope:{1:"keyword",3:"title.class"}}]},B={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...tn,...en]}},O={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},L={variants:[{match:[/function/,/\s+/,o,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[I],illegal:/%/},N={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function j(v){return e.concat("(?!",v.join("|"),")")}const R={match:e.concat(/\b/,j([...nn,"super","import"]),o,e.lookahead(/\(/)),className:"title.function",relevance:0},H={begin:e.concat(/\./,e.lookahead(e.concat(o,/(?![0-9A-Za-z$_(])/))),end:o,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Z={match:[/get|set/,/\s+/,o,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},I]},S="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+t.UNDERSCORE_IDENT_RE+")\\s*=>",b={match:[/const|var|let/,/\s+/,o,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(S)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[I]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:A,CLASS_REFERENCE:B},illegal:/#(?![$_A-z])/,contains:[t.SHEBANG({label:"shebang",binary:"node",relevance:5}),O,t.APOS_STRING_MODE,t.QUOTE_STRING_MODE,g,m,h,f,w,{match:/\$\d+/},d,B,{className:"attr",begin:o+e.lookahead(":"),relevance:0},b,{begin:"("+t.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,t.REGEXP_MODE,{className:"function",begin:S,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:t.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:A}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:s},{begin:i.begin,"on:begin":i.isTrulyOpeningTag,end:i.end}],subLanguage:"xml",contains:[{begin:i.begin,end:i.end,skip:!0,contains:["self"]}]}]},L,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+t.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[I,t.inherit(t.TITLE_MODE,{begin:o,className:"title.function"})]},{match:/\.\.\./,relevance:0},H,{match:"\\$"+o,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[I]},R,N,D,Z,{match:/\$[(.]/}]}}function ja(t){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}const Ga=t=>{const{bau:e,css:n}=t,{pre:o,code:a}=e.tags;return Dt.registerLanguage("javascript",on),Dt.registerLanguage("sh",ja),function({text:i,language:r="js"}){const c=a({class:`hljs language-${r}`});return c.innerHTML=Dt.highlight(i,{language:r}).value,o({class:n`
          display: inline-block;
        `},c)}};function Ha(t){const{bau:e,css:n}=t,{article:o,h1:a,p:s,code:i,a:r,ul:c,li:l}=e.tags,u=Ga(t);return function(){return o({class:n`
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
)`}),s("Most components accepts the ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L1",target:"_blank"},"variant"),", ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L3",target:"_blank"},"color"),",  and ",r({href:"https://github.com/grucloud/bau/blob/main/bau-ui/constants.d.ts#L2",target:"_blank"},"size"),", property."),s("Further reading:",c(l(r({href:"components"},"Visit the component gallery")),l(r({href:"https://github.com/grucloud/bau",target:"_blank"},"Learn more about bau")))))}}function Kt(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("paper",c,s,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}function an(t,e={}){const{bau:n,css:o,window:a}=t,{nav:s,ul:i,li:r,a:c}=n.tags,{headerSelector:l="h2,h3"}=e,u=n.state("no"),d=(f,x)=>{let w=null;return(...y)=>{a.clearTimeout(w),w=a.setTimeout(()=>f(...y),x)}},p=o`
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
  `,g=({value:f,id:x,children:w=[]})=>{const y=c({class:()=>u.val==x?"active":"",href:`#${x}`});return y.innerHTML=f,r({class:()=>u.val==x?"active":""},y,w.length>0&&i(w.map(g)))},m=f=>f.tagName.charAt(1),h=({contentEl:f})=>{const x=f.querySelectorAll(l);let w=2,y={},E={children:[]},A=E;const I=A;let D=[A];return[...x].forEach(B=>{const O=m(B);B.setAttribute("id",B.textContent),!B.innerHTML.includes("<button")&&(y={value:B.innerHTML,id:B.id??B.textContent,children:[]},w==O?(E=y,A.children.push(E)):w<O?(D.push(A),A=E,E.children.push(y),E=y):w>O&&(A=D[O-1],D=D.slice(0,O-1),A.children.push(y),E=y),w=O)}),I};return function(...x){let[{size:w=e.size??"md",variant:y=e.variant??"plain",color:E=e.color??"neutral",contentEl:A,...I}]=X(x);const D=h({contentEl:A}),B=d(()=>{const L=[...A.querySelectorAll(l)].find(N=>{const{top:j,height:R}=N.getBoundingClientRect();if(j+R>60)return!0});L&&(u.val=L==null?void 0:L.id)},100);return s({...I,class:T("tableOfContent",w,y,E,p,e==null?void 0:e.class,I==null?void 0:I.class),bauMounted:()=>{a.addEventListener("scroll",B)},bauUnmounted:()=>{a.removeEventListener("scroll",B)}},D.children&&i(D.children.map(g)))}}const rn=t=>{const{bau:e,css:n}=t,{div:o,table:a,tbody:s,tr:i,td:r,thead:c,th:l}=e.tags;return function({Item:d,name:p}){return o({class:n`
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
        `},a(c(i(l(p??""),ot.map(g=>l(g)))),s(Eo.map(g=>i(l(g),ot.map((m,h)=>r(d({color:m,variant:g},{index:h}))))))))}},Ua=t=>{const{bau:e,css:n}=t,{section:o}=e.tags;return function({item:s}){return o({class:n`
          display: flex;
          gap: 1rem;
          flex-direction: column;
          align-items: flex-start;
        `},Ao.map((i,r)=>s(t,{size:i})({color:"success",variant:"outline"},{size:i,index:r})))}},G=t=>{const{bau:e,css:n}=t,{div:o,article:a,section:s,h1:i,p:r,h2:c,h3:l,pre:u,code:d}=e.tags;Dt.registerLanguage("javascript",on);const p=an(t),g=Kt(t,{class:n`
      &.paper {
        border: 3px dashed rgba(255, 255, 255, 0.1);
      }
    `}),m=rn(t),h=Ua(t),f=({text:x})=>u({class:n`
          display: inline-block;
        `},d({class:"hljs language-js",bauCreated:({element:w})=>{w.innerHTML=Dt.highlight(x,{language:"js"}).value}}));return function(w){const y=a({class:n`
          grid-area: content;
          overflow-x: scroll;
        `},i(w.title),r(w.description),w.gridItem&&!w.variantColorTableDisable&&[c("Variant/Color"),g(m({Item:w.gridItem(t)}))],w.gridItem&&!w.variantSizeDisable&&[c("Size"),r("Component with size: ",d("sm"),", ",d("md"),", and ",d("lg")),g(h({item:w.gridItem}))],c("Usage"),l("Import"),f({text:w.importStatement}),c("Examples"),w.examples.map(E=>s(l(E.title),r(E.description),g(E.createComponent(t)({})),f({text:E.code}))));return o({class:n`
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
        `},y,p({contentEl:y}))}};function ge(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=({element:l,closeState:u})=>{l.scrollHeight!=0&&(u.val?r(l):c(l))};function r(l){l.style.height=l.scrollHeight+"px";const u=()=>{l.removeEventListener("transitionend",u)};l.addEventListener("transitionend",u),window.requestAnimationFrame(()=>{l.style.height="0px"})}function c(l){const u=()=>{l.removeEventListener("transitionend",u),l.style.height=null};l.addEventListener("transitionend",u),l.style.height=l.scrollHeight+"px"}return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",Header:m,Content:h,close:f=!0,...x}]=X(u);const w=n.state(f);return a({...x,class:T("collapsible",d,s,e==null?void 0:e.class,x==null?void 0:x.class)},a({class:()=>T("header",h?w.val?"close":"open":""),onclick:y=>{w.val=!w.val,y.stopPropagation()}},m()),a({class:"content",role:"region",bauMounted:({element:y})=>{w.val&&(y.style.height="0px")},"aria-expanded":({element:y})=>(i({element:y,closeState:w}),!w.val)},h&&h()))}}const Fa=()=>ot.map(t=>`
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
`);function Xt(t,e={}){const{bau:n,css:o}=t,{div:a,ul:s,li:i,h3:r,button:c}=n.tags,l=o`
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
  `;return function(...d){let[{size:p=e.size??"md",variant:g=e.variant??"plain",color:m=e.color??"neutral",data:h=[],...f}]=X(d);const x=n.state(""),w=ge(t,{size:p,variant:g,color:m}),y=A=>I=>{x.val==A?x.val="":x.val=A},E=A=>{const{Header:I,Content:D,name:B}=A,O=()=>r({class:()=>T(x.val==B&&"active")},c({type:"button","aria-controls":`bau-${B}`,"aria-expanded":({element:N})=>x.val==B},I(A))),L=()=>a({id:`bau-${B}`,"data-state":({element:N})=>x.val==B},D(A));return i({class:T(m,g,p),onclick:y(B)},w({Header:O,Content:L}))};return a({class:T("accordion",l,e==null?void 0:e.class,f.class)},s(h.map(E)))}}const sn=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>o(a("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>o(a("Item 2 Content"))}],i=Xt(t,e);return r=>i({...r,data:s})},Va=t=>{const{bau:e}=t,{div:n,p:o,section:a}=e.tags,s=[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}],i=Xt(t);return()=>a(i({data:s,color:"neutral",variant:"outline"}))},Wa=`import accordion, { Accordion } from "@grucloud/bau-ui/accordion";
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
`,ln=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Item1",Header:()=>"Item 1",Content:()=>n(o("Item 1 Content"))},{name:"Item2",Header:()=>"Item 2",Content:()=>n(o("Item 2 Content"))}]},Ka=t=>{const{css:e}=t,n=ln(t),o=Xt(t);return()=>o({color:"warning",data:n,class:e`
        &.accordion {
          & ul {
            & li {
              width: fit-content;
            }
          }
        }
      `})},Xa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Za=t=>{const{css:e}=t,n=ln(t),o=Xt(t);return()=>o({color:"success",variant:"outline",data:n,class:e`
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
      `})},qa=`import accordion from "@grucloud/bau-ui/accordion";
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
`,Ja={title:"Accordion",package:"accordion",description:"An accordion is a stacked list of headers that reveal or hide associated sections of content.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/accordion/accordion.js",importStatement:'import accordion from "@grucloud/bau-ui/accordion";',examples:[{title:"Simple",description:"A simple accordion.",code:Wa,createComponent:Va},{title:"Customize with with fit-content",description:"Customize the width of the accordion.",code:Xa,createComponent:Ka},{title:"Customize the icon",description:"Customize the icon with a cross.",code:qa,createComponent:Za}],gridItem:sn},Ya=t=>{const e=G(t);return()=>e(Ja)},Qa={danger:"⚠",warning:"⚠",success:"✔",primary:"ℹ",neutral:"ℹ"},tr=()=>ot.map(t=>`
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
  `,r=F(t),c=({onclick:l})=>r({"aria-label":"Close",onclick:l,class:"button-close"},"✖");return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"outline",color:g=e.color??"neutral",onRemove:m,...h},...f]=X(u);return a({...h,class:T("alert",`alert-${p}`,e.class,p,g,d,i,h.class),role:"alert"},s({class:"icon"},Qa[g]),a({class:"content"},...f),m&&c({onclick:m}))}}const cn=(t,e)=>{const n=kt(t,e);return o=>n({...o},`Alert ${(e==null?void 0:e.size)??""} `)},er=t=>{const{bau:e}=t,{h4:n,p:o}=e.tags,a=kt(t);return()=>a({color:"danger"},n("Something went wrong"),o("Error code ",404),o("Status ","Not Found"))},nr=`import alert from "@grucloud/bau-ui/alert";
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
`,rr={title:"Alert",package:"alert",description:"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alert/alert.js",importStatement:'import alert from "@grucloud/bau-ui/alert";',examples:[{title:"Default",description:"A simple danger alert.",code:nr,createComponent:er},{title:"Custom Alert ",description:"A custom alert.",code:ar,createComponent:or}],gridItem:cn},sr=t=>{const e=G(t);return()=>e(rr)},ir=(t,e={})=>{const{bau:n,css:o,keyframes:a}=t,{limit:s=10,deleteAfterDuration:i=15e3}=e,{div:r}=n.tags,c=n.state([]),l={inserting:a`
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
    `},d=({id:p,status:g})=>{const m=c.val.findIndex(h=>h.id===p);m!=-1&&(c.val[m].status=g)};return function(g={},...m){const h=({id:w})=>{d({id:w,status:"removing"});const y=c.val.findIndex(E=>E.id===w);y!=-1&&c.val.splice(y,1)},f=({Component:w})=>{const y={id:Math.random().toString(10).split(".")[1],Component:w,status:"inserting"};c.val.length>=s&&h({id:c.val[0].id}),c.val.push(y),setTimeout(()=>h(y),i)},x=w=>r({class:u.item,onclick:()=>h(w)},w.Component());return document.addEventListener("alert.add",w=>f(w.detail)),document.addEventListener("alert.remove",w=>h(w.detail)),r({class:T(u.stack,e==null?void 0:e.class,g.class)},n.loop(c,r(),x))}},lr=t=>{const{tr:e,bau:n}=t,{section:o}=n.tags,a=ir(t,{deleteAfterDuration:2e4}),s=F(t),i=kt(t);return()=>o(a(),s({color:"success",variant:"outline",onclick:()=>{document.dispatchEvent(new CustomEvent("alert.add",{detail:{Component:()=>i({color:"success"},e("Infrastructure Created"))}}))}},"Success Alert"))},cr=`import { Context } from "@grucloud/bau-ui/context";
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
`,ur={title:"Alert Stack",package:"alertStack",description:"An alertStack displays alerts in a stack. To send an alert from any component, send a CustomEvent with the alert to display.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/alertStack/alertStack.js",importStatement:'import alertStack from "@grucloud/bau-ui/alertStack";',examples:[{title:"Default",description:"A simple alertStack.",code:cr,createComponent:lr}]},dr=t=>{const e=G(t);return()=>e(ur)},pr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a}=e.tags,s=Vt(t),i=F(t),r=n`
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  `,c=e.state(!0);return()=>o(i({onclick:()=>{c.val=!c.val}},()=>c.val?"Hide":"Show"),s({animationHide:()=>`${r} 0.5s`,animationShow:()=>`${r} 0.5s reverse`},()=>a(c.val?"Ciao":"Mondo")))},mr=`import animate from "@grucloud/bau-ui/animate";
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
`,gr=t=>{const{bau:e,keyframes:n}=t,{section:o,div:a,input:s,label:i}=e.tags,r=Vt(t),c=n`
    to {
      transform: translateX(1rem);
      opacity: 0;
    }
  `,l=e.state("one"),u=({target:p})=>l.val=p.id,d={one:()=>a("ONE"),two:()=>a("TWO")};return()=>o(i("One",s({type:"radio",id:"one",name:"radio",checked:!0,value:l,oninput:u})),i("Two",s({type:"radio",id:"two",name:"radio",value:l,oninput:u})),r({animationHide:()=>`${c} 0.5s`,animationShow:()=>`${c} 0.5s reverse`},()=>d[l.val]()))},br=`import animate from "@grucloud/bau-ui/animate";
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
`,hr={title:"Animate",package:"animate",description:"The animate component animates a child component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/animate/animate.js",importStatement:'import animate from "@grucloud/bau-ui/animate";',examples:[{title:"Basic Example",description:"A simple animation example.",code:mr,createComponent:pr},{title:"Component hide and show",description:"Hide and show a component",code:br,createComponent:gr}]},fr=t=>{const e=G(t);return()=>e(hr)};function Ct(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=a`
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
  `;return function(...l){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:p=e.color??"neutral",...g},...m]=X(l);return s({...g,class:T("skeleton",u,r,e==null?void 0:e.class,g==null?void 0:g.class)},...m)}}function be(t,e={}){const{bau:n,css:o}=t,{div:a,img:s}=n.tags,i=n.state(!0),r=n.state(!1),c=()=>i.val=!1,l=d=>{i.val=!1,r.val=!0},u=o`
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
  `;return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",width:f=40,height:x=40,alt:w,...y},...E]=X(p);const A=Ct(t,{class:T(o`
          position: absolute;
          top: 0;
          left: 0;
          height: ${x}px;
          width: ${f}px;
        `,e==null?void 0:e.class,y.class)});return a({class:T(u,e==null?void 0:e.class,y.class)},()=>i.val&&A(),()=>r.val&&w,s({alt:w,width:f,height:x,onload:c,onerror:l,class:()=>T(!i.val&&"visible",r.val&&"hide",h,m,g,u,e==null?void 0:e.class,y.class),...y}))}}const un=(t,e)=>{const{css:n}=t,o=be(t,{...e,class:n`
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
`,Sr={title:"Avatar",package:"avatar",description:"The avatar component displays a small image or initial of a person.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/avatar/avatar.js",importStatement:'import avatar from "@grucloud/bau-ui/avatar";',examples:[{title:"Default",description:"A simple avatar.",code:xr,createComponent:vr},{title:"Not Found",description:"An avatar defaulting to alt when the image is not found.",code:wr,createComponent:yr}],gridItem:un},Cr=t=>{const e=G(t);return()=>e(Sr)};function Nt(t,e){const{bau:n,css:o,window:a}=t,{dialog:s}=n.tags,i=Kt(t,{class:o`
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
    opacity: 0;
  `;return function(...l){let[{contentEl:u,triggerEl:d,onClose:p,...g},...m]=X(l);const h=w=>{x.style.opacity=1,x.showModal();const y=d.getBoundingClientRect(),E=x.getBoundingClientRect();y.x<a.innerWidth/2?x.style.left=y.left+"px":x.style.left=y.right-E.width+"px",y.y<a.innerHeight/2?(x.style.top=y.top+y.height+"px",x.style.height=Math.min(x.scrollHeight,a.innerHeight-y.top-y.height)+"px"):(x.style.top=Math.max(0,y.top-E.height)+"px",x.scrollHeight>y.top&&(x.style.height=y.top+"px"))},f=w=>{const y=()=>{x.close(),x.removeEventListener("transitionend",y)};x.addEventListener("transitionend",y),x.style.opacity=0},x=s({role:"presentation",class:T("popover",r,e==null?void 0:e.class,g==null?void 0:g.class),onclick:w=>{w.target===x&&(f(),p==null||p.call())}},i(u));return x.closeDialog=f,x.openDialog=h,x}}const Ut={sm:12,md:16,lg:24},kr=()=>ot.map(t=>`
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
    stroke: var(--font-color-inverse);
    ;
  }
}
`).join(`
`);function mt(t,e={}){const{bau:n,css:o,keyframes:a}=t,{svg:s,circle:i}=n.tagsNS("http://www.w3.org/2000/svg"),r=a`
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
  `;return function({size:u=e.size??"md",color:d=e.color??"primary",variant:p=e.variant??"outline",visibility:g=!0,...m}={}){const h=o`
      visibility: hidden;
      opacity: 0;
      transition: all var(--transition-slow) ease-in-out;
      &.visibility {
        visibility: visible;
        opacity: 1;
      }
      animation: ${r} 2s linear infinite;
      width: ${Ut[u]};
      height: ${Ut[u]};
      & .path {
        stroke-linecap: round;
        animation: ${c} 1.5s ease-in-out infinite;
      }
      ${kr()}
    `;return s({class:{deps:[g],renderProp:()=>f=>T("spinner",h,d,p,f==!1?"":"visibility",e==null?void 0:e.class,m.class)},version:"1.1",x:"0px",y:"0px",width:Ut[u],height:Ut[u],viewBox:"0 0 50 50",enableBackground:"new 0 0 50 50",...m},i({class:"path",cx:"25",cy:"25",r:"20",fill:"none","stroke-width":"5"}))}}const Er=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
  `).join(`
`);function Zt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=o`
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
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",label:p,placeholder:g,Option:m,options:h,defaultOption:f,getOptionLabel:x,getOptionValue:w,onSelect:y=()=>{},id:E,required:A,name:I,loading:D,...B},...O]=X(c);const L=Nt(t),N=F(t),j=dt(t,{variant:u,color:d,size:l}),R=vt(t),H=mt(t,{variant:u,color:d,size:l}),Z=n.state(f),S=n.state(B.value),b=n.state(!1),v=n.state(0),C=()=>{b.val=!1},k=n.state(h),P=Y=>at=>Y.val&&x(at)==x(Y.val),z=()=>{ct.openDialog(),b.val=!0,S.val="",k.val=h,v.val=h.findIndex(P(Z));const Y=Et.querySelector("li.selected");Y&&(Y.scrollIntoView({block:"center"}),lt.scrollIntoView({block:"end"}))},W=()=>{ct.closeDialog(),b.val=!1,v.val=0},U=Y=>{const{value:at}=Y.target;S.val=at,at?k.val=h.filter(_t=>x(_t).match(new RegExp(`${at}`,"i"))):k.val=h},$=Y=>{ct.open?W():z()},J=Y=>{Z.val=Y,gt.value=w(Y)},nt=({option:Y,index:at})=>_t=>{J(Y),v.val=at,W()},V=()=>{const Y=Et.querySelector("li.active");Y&&Y.scrollIntoView({block:"center",behavior:"smooth"})},tt=Y=>{switch(Y.key){case"Escape":W();break;case"ArrowDown":v.val<k.val.length-1?v.val++:v.val=0,V();break;case"ArrowUp":v.val<=0?v.val=k.val.length-1:v.val--,V();break;case"Enter":ct.open?(J(k.val[v.val]),W()):z(),Y.preventDefault();break}},rt=N({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":b,"aria-label":p,onclick:$,variant:u,color:d,size:l,class:D==!0&&"loading",disabled:D},()=>Z.val?x(Z.val):p,()=>D==!0&&H({visibility:D})),lt=j({value:S,placeholder:g,autofocus:!0,type:"search",autocomplete:"off",autocapitalize:"none",spellcheck:!1,role:"combobox","aria-autocomplete":"list","aria-expanded":b,oninput:U,onkeydown:tt,...B}),gt=j({class:o`
        width: 1px;
        opacity: 0;
        left: 0;
        bottom: 0;
        position: absolute;
      `,tabindex:-1,defaultValue:f&&w(f),required:A,name:I}),Et=a({class:T(u,d,l,"content")},lt,()=>R({class:T(u,d,l)},k.val.map((Y,at)=>s({class:()=>T(v.val==at&&"active",P(Z)(Y)&&"selected"),onclick:nt({option:Y,index:at})},m(Y))))),ct=L({id:E,triggerEl:rt,contentEl:Et,onClose:C,class:o`
        overflow: hidden;
      `});return a({...B,class:T("autocomplete",i,e==null?void 0:e.class,B==null?void 0:B.class)},n.bind({deps:[Z],render:()=>Y=>{Y&&(gt.value=w(Y),y(Y))}}),rt,gt,ct)}}const dn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Zt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return l=>i({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"})},Ar=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Zt(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return()=>o(i({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Country",placeholder:"Search countries",id:"country"}))},Tr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Dr=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Zt(t),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(u.label),s(u.code));return()=>o(i({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Country",placeholder:"Search countries",id:"country"}))},Mr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Br=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=F(t,{variant:"outline"}),r=Zt(t),c=e.state([]),l=e.state(!1),u=e.state("");async function d({url:m,transform:h=f=>f}){try{l.val=!0;const f=await fetch(m,{});if(f.ok){const x=await f.json();c.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,f)=>h.name.common.localeCompare(f.name.common))});p();const g=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",placeholder:"Search countries",id:"country",loading:l.val}),i({onclick:()=>p()},"Reload")))},Ir=`import { Context } from "@grucloud/bau-ui/context";
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
`,Nr={title:"Auto Complete",package:"autocomplete",description:"An autocomplete allows to search and select an item from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/autocomplete/autocomplete.js",importStatement:'import autocomplete from "@grucloud/bau-ui/autocomplete";',examples:[{title:"Basic",description:"A simple autocomplete.",code:Tr,createComponent:Ar},{title:"Loading Indicator",description:"A autocomplete with a loading indicator.",code:Ir,createComponent:Br},{title:"Default Option",description:"A autocomplete with a default option.",code:Mr,createComponent:Dr}],gridItem:dn},$r=t=>{const e=G(t);return()=>e(Nr)};function pn(t,e={}){const{bau:n,css:o}=t,{span:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",content:d,...p},...g]=X(r);return a({...p,class:T("badge",s,e==null?void 0:e.class,p==null?void 0:p.class)},a({class:T(u,l,c)},d),...g)}}const mn=(t,e)=>{const n=pn(t,e);return(o,{index:a})=>n({...o,content:`${a*100}`},"☏")},Lr=t=>{const{bau:e}=t,{section:n}=e.tags,o=pn(t);return()=>n(o({content:"10"},"☏"))},Or=`import badge from "@grucloud/bau-ui/badge";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Badge = badge(context);

  return () => section(Badge({ content: "10" }, "\\u260F"));
};
`,Pr={title:"Badge",package:"badge",description:"The badge component displays a number on the top right corner of an icon",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/badge/badge.js",importStatement:'import badge from "@grucloud/bau-ui/badge";',examples:[{title:"Default",description:"A simple badge.",code:Or,createComponent:Lr}],gridItem:mn},zr=t=>{const e=G(t);return()=>e(Pr)};function he(t,e={}){const{bau:n,css:o,config:a}=t,{ul:s,li:i,span:r}=n.tags,{separator:c="〉"}=e,l=F(t),u=o`
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
  `;return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",items:f,...x},...w]=X(p);return s({...x,class:T(u,e==null?void 0:e.class,x==null?void 0:x.class)},f.map(({href:y,name:E})=>i((y!=null?l:r)({href:`${a.base}${y}`,color:h,variant:m,size:g,class:T(h,m,g)},E))))}}const gn=(t,e)=>{const n={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},o=he(t,e);return a=>o({...a,...n})},_r=t=>{const{bau:e}=t,{section:n}=e.tags,o={items:[{href:"/",name:"⌂"},{name:"Dir",href:"/dir"},{href:"/dir/subdir",name:"SubDir"}]},a=he(t,{variant:"outline",color:"neutral"});return()=>n(a(o))},Rr=`import { Context } from "@grucloud/bau-ui/context";
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
`,Hr={title:"Breadcrumbs",package:"breadcrumbs",description:"The breadcrumbs component is an horizonal bar for navigation between pages",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/breadcrumbs/breadcrumbs.js",importStatement:'import breadcrumbs from "@grucloud/bau-ui/breadcrumbs";',examples:[{title:"Default",description:"A simple breadcrumbs.",code:Rr,createComponent:_r},{title:"Separator",description:"A breadcrumbs with a custom separator.",code:Gr,createComponent:jr}],gridItem:gn},Ur=t=>{const e=G(t);return()=>e(Hr)},bn=(t,e={})=>{const n=F(t,e);return o=>n({...o},`${o.variant} ${o.color} ${e.size??""}`)},Fr=t=>{const{bau:e}=t,{section:n}=e.tags,o=F(t),a=()=>{alert("Click")};return()=>n(o({color:"primary",variant:"outline",onclick:a},"Click me"))},Vr=`import button from "@grucloud/bau-ui/button";
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
`,Wr=t=>{const{bau:e}=t,{section:n}=e.tags,o=F(t),a=()=>{alert("Click")};return()=>n(o({disabled:!0,color:"primary",variant:"outline",onclick:a},"Click me"))},Kr=`import button from "@grucloud/bau-ui/button";
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
`,Xr={title:"Button",package:"button",description:"The button component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/button/button.js",importStatement:'import button from "@grucloud/bau-ui/button";',examples:[{title:"Solid Button",description:"A simple button.",code:Vr,createComponent:Fr},{title:"Disabled Button",description:"A disabled button.",code:Kr,createComponent:Wr}],gridItem:bn},Zr=t=>{const e=G(t);return()=>e(Xr)},qr=()=>ot.map(t=>`
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
    ${qr()}
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("button-group",l,u,c,s,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const hn=(t,e)=>{const n=["ONE","TWO","THREE"],o=F(t,e),a=fe(t,e);return s=>a({...s},n.map(i=>o(s,i)))},Jr=t=>{const{bau:e}=t,{section:n}=e.tags,o=["ONE","TWO","THREE"],a=F(t),s=fe(t),i="primary",r="solid";return()=>n(s({color:i,variant:r},o.map(c=>a({color:i,variant:r},c))))},Yr=`import buttonGroup from "@grucloud/bau-ui/buttonGroup";
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
`,Qr={title:"Button",package:"buttonGroup",description:"The buttonGroup component groups button together.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/buttonGroup/buttonGroup.js",importStatement:'import buttonGroup from "@grucloud/bau-ui/buttonGroup";',examples:[{title:"Default",description:"A simple buttonGroup.",code:Yr,createComponent:Jr}],gridItem:hn},ts=t=>{const e=G(t);return()=>e(Qr)};function fn(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p},...g]=X(c);return a({...p,type:"date",class:T("calendar",i,d,u,l,e==null?void 0:e.class,p==null?void 0:p.class)},...g)}}const vn=(t,e)=>{const n=fn(t,e);return o=>n({...o})},es=t=>{const{bau:e}=t,{section:n,label:o}=e.tags,a=e.state("2023-08-08"),s=fn(t);return()=>n(o("Start date:",s({id:"start",min:"2023-01-01",max:"2024-12-31",value:a.val,oninput:i=>{a.val=i.target.value}})))},ns=`import calendar from "@grucloud/bau-ui/calendar";
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
`,os={title:"Calendar",package:"calendar",description:"The calendar component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/calendar/calendar.js",importStatement:'import calendar from "@grucloud/bau-ui/calendar";',examples:[{title:"Default",description:"A simple calendar.",code:ns,createComponent:es}],gridItem:vn},as=t=>{const e=G(t);return()=>e(os)};function rs(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `,i=n.state(0);return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",slides:p,Slide:g,Previous:m,Next:h,...f}]=X(c);const x=()=>{i.val<=0?i.val=p.length-1:i.val--},w=()=>{i.val>=p.length-1?i.val=0:i.val++},y=a({class:"track",style:()=>`transform: translateX(${-100*i.val}%);`},p.map(g));return a({...f,class:T("carousel",l,s,e==null?void 0:e.class,f==null?void 0:f.class)},a({class:T("control","control-previous"),onclick:x},m()),a({class:T("control","control-next"),onclick:w},h()),y)}}const ss=[{src:"https://source.unsplash.com//featured/200x201"},{src:"https://source.unsplash.com//featured/200x202"},{src:"https://source.unsplash.com//featured/200x203"}],is=t=>{const{bau:e,css:n}=t,{section:o,img:a}=e.tags,s=F(t,{class:n`
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
    `}),c=()=>s("◀"),l=()=>s("▶");return()=>o(r({slides:ss,Slide:i,Previous:c,Next:l}))},ls=`import carousel from "@grucloud/bau-ui/carousel";
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
`,cs={title:"Carousel",package:"carousel",description:"The carousel component displays images once at a time.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/carousel/carousel.js",importStatement:'import carousel from "@grucloud/bau-ui/carousel";',examples:[{title:"Simple Carousel",description:"A simple carousel displaying a few random pictures.",code:ls,createComponent:is}]},us=t=>{const e=G(t);return()=>e(cs)},xn=(t,e)=>{const n=It(t,e);return o=>n({...o},`Chip ${o.color} ${o.variant} ${o.size??""}`)},ds=t=>{const{bau:e}=t,{section:n}=e.tags,o=It(t);return()=>n(o({variant:"outline",color:"primary"},"My Chip"))},ps=`import chip from "@grucloud/bau-ui/chip";
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
`,ms={title:"Chip",package:"chip",description:"The chip component displays text that needs to stand out and get noticed. ",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/chip/chip.js",importStatement:'import chip from "@grucloud/bau-ui/chip";',examples:[{title:"Default",description:"A simple chip.",code:ps,createComponent:ds}],gridItem:xn},gs=t=>{const e=G(t);return()=>e(ms)};function qt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({type:"checkbox",...d,class:T(s,u,l,c,e==null?void 0:e.class,d==null?void 0:d.class)})}}const yn=(t,e)=>{const{bau:n,css:o}=t,{label:a}=n.tags,s=qt(t,e);return i=>a({class:o`
          display: flex;
          border: 1px dotted var(--color-emphasis-200);
          font-size: smaller;
          align-items: center;
          justify-content: space-between;
          color: var(--color-content-secondary);
          padding: 0.2rem;
        `},`${i.color} ${i.variant} ${i.size??""}`,s({id:`myCheckbox-gallery-${i.color}-${i.variant}-${i.size}`,name:`myCheckbox-gallery-${i.color}-${i.variant}`,...i}))},bs=t=>{const{bau:e,css:n}=t,{section:o,label:a}=e.tags,s=qt(t),i=e.state(!1),r=c=>{i.val=!!c.target.checked};return()=>o(a({class:n`
            display: inline-flex;
            font-size: smaller;
            align-items: center;
            justify-content: space-between;
            color: var(--color-content-secondary);
            gap: 1rem;
          `},"My Checkbox",s({color:"neutral",variant:"outline",id:"my-checkbox",name:"myCheckbox",checked:i,onchange:r})))},hs=`import checkbox from "@grucloud/bau-ui/checkbox";
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
`,fs=t=>{const{bau:e,css:n}=t,{label:o,form:a}=e.tags,s=qt(t,{color:"neutral",variant:"outline"}),i=F(t),r=c=>{c.preventDefault();const l=Object.fromEntries(new FormData(c.target.closest("form")));alert(JSON.stringify(l))};return()=>a({onsubmit:r,class:n`
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
        `},o("My Checkbox",s({id:"my-checkbox-uncontrolled",name:"my-checkbox-uncontrolled"})),i({type:"submit"},"Submit"))},vs=`import checkbox from "@grucloud/bau-ui/checkbox";
import { Context } from "@grucloud/bau-ui/context";
import button from "@grucloud/bau-ui/button";

export default (context: Context) => {
  const { bau, css } = context;
  const { label, form } = bau.tags;

  const Checkbox = checkbox(context, { color: "neutral", variant: "outline" });
  const Button = button(context);

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
      label(
        "My Checkbox",
        Checkbox({
          id: "my-checkbox-uncontrolled",
          name: "my-checkbox-uncontrolled",
        })
      ),
      Button({ type: "submit" }, "Submit")
    );
};
`,xs={title:"Checkbox",package:"checkbox",description:"The checkbox component uses the native input date type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/checkbox/checkbox.js",importStatement:'import checkbox from "@grucloud/bau-ui/checkbox";',examples:[{title:"Controlled checkbox",description:"A controlled checkbox.",code:hs,createComponent:bs},{title:"Uncontrolled checkbox",description:"An uncontrolled checkbox.",code:vs,createComponent:fs}],gridItem:yn},ys=t=>{const e=G(t);return()=>e(xs)},ws=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=ge(t),s=F(t,{variant:"outline"}),i=()=>s("Header"),r=()=>o("Content");return()=>n(a({Header:i,Content:r}))},Ss=`import button from "@grucloud/bau-ui/button";
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
`,Cs={title:"Collapsible",package:"collapsible",description:"The collapsible component expands and collapse a list of elements.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/collapsible/collapsible.js",importStatement:'import collapsible from "@grucloud/bau-ui/collapsible";',examples:[{title:"Simple Collapsible",description:"A simple collapsible, click on the header to expand or collapse the content.",code:Ss,createComponent:ws}]},ks=t=>{const e=G(t);return()=>e(Cs)};function Es(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("divider",c,s,e==null?void 0:e.class,d==null?void 0:d.class)},a({class:"content"},...p))}}const As=t=>{const{bau:e}=t,{section:n}=e.tags,o=Es(t);return()=>n(o("OR"))},Ts=`import divider from "@grucloud/bau-ui/divider";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const Divider = divider(context);

  return () => section(Divider("OR"));
};
`,Ds={title:"Divider",package:"divider",description:"The divider component is a separator between components",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/divider/divider.js",importStatement:'import divider from "@grucloud/bau-ui/divider";',examples:[{title:"Simple Divider",description:"A simple divider.",code:Ts,createComponent:As}],variantColorTableDisable:!0,variantSizeDisable:!0},Ms=t=>{const e=G(t);return()=>e(Ds)};function Bs(t,e){const{bau:n,css:o}=t,{div:a}=n.tags,s=o`
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
  `;return function(...r){let[{color:c,variant:l="outline",size:u,openState:d,...p},...g]=X(r);return a({class:T(s,e==null?void 0:e.class,p.class)},a({class:()=>T("overlay",d.val&&"overlay-open"),onclick:()=>{d.val=!1}}),a({class:()=>T("content",d.val&&"content-open")},g))}}const Is=t=>{const{bau:e}=t,{section:n,p:o}=e.tags,a=e.state(!1),s=Bs(t),i=F(t),r=Ge(t);return()=>n(o("Click on the button to open and close the drawer."),i({color:"neutral",variant:"outline",onclick:()=>{a.val=!a.val}},"OPEN DRAWER"),s({openState:a},r()))},Ns=`import drawer from "@grucloud/bau-ui/drawer";
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
`,$s={title:"DrilldownMenu",package:"drawer",description:"The drawer show and hide a menu.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drawer/drawer.js",importStatement:'import drawer from "@grucloud/bau-ui/drawer";',examples:[{title:"Default",description:"A simple drawer.",code:Ns,createComponent:Is}]},Ls=t=>{const e=G(t);return()=>e($s)},Os=()=>ot.map(t=>`
`).join(`
`);function wn(t,e={}){const{bau:n,css:o}=t,{div:a,li:s}=n.tags,i=F(t),r=Nt(t),c=vt(t),l=o`
    ${Os()}
  `;return function(...d){let[{size:p=e.size??"md",variant:g=e.variant??"outline",color:m=e.color??"neutral",label:h,ListItem:f,items:x,...w},...y]=X(d);const E=n.state(0),A=()=>{R.openDialog(),R.focus()},I=()=>{R.closeDialog()},D=()=>{R.open?I():A()},B=H=>{D(),H.preventDefault()},O=({item:H,index:Z})=>S=>{E.val=Z,I(),S.preventDefault()},L=H=>{switch(H.preventDefault(),H.key){case"Escape":I();break;case"ArrowDown":E.val<options.length-1?E.val++:E.val=0;break;case"ArrowUp":E.val<=0?E.val=options.length-1:E.val--;break;case"Enter":D();break}},N=()=>c({tabindex:"0",class:T(m,g)},x.map((H,Z)=>s({class:()=>T(E.val==Z&&"active"),onclick:O({item:H,index:Z})},f(H)))),j=i({type:"button",onclick:B,color:m,variant:g,size:p},h),R=r({triggerEl:j,contentEl:N()});return a({...w,class:T("dropdownMenu",m,p,l,e==null?void 0:e.class,w==null?void 0:w.class),onkeydown:L},j,R)}}const Ps=(t,e)=>{const{bau:n}=t,{div:o,span:a}=n.tags,s=wn(t,e),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o(a(c.label));return c=>s({...c,items:i,ListItem:r,label:"Action"})},zs=t=>{const{bau:e}=t,{section:n,div:o,span:a}=e.tags,s=wn(t),i=[{label:"List"},{label:"Plan"},{label:"Apply"}],r=c=>o({onclick:()=>{alert(`click  ${c.label}`)}},a(c.label));return()=>n(s({items:i,ListItem:r,label:"Action"}))},_s=`import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";
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
`,Rs={title:"Dropdown Menu",package:"dropdownMenu",description:"The dropdown menu shows a menu when a button is clicked.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/dropdownMenu/dropdownMenu.js",importStatement:'import dropdownMenu from "@grucloud/bau-ui/dropdownMenu";',examples:[{title:"Simple Dropdown Menu",description:"A simple dropdown menu.",code:_s,createComponent:zs}],gridItem:Ps},js=t=>{const e=G(t);return()=>e(Rs)},Sn=(t,e)=>{const n={data:{name:"Root Menu",href:"#drilldown-gallery"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},o=le(t,e);return a=>o({id:"drilldown-gallery",tree:n,...a})},Gs=t=>{const{bau:e}=t,{section:n}=e.tags,o={data:{name:"Root Menu",href:"#drilldown-example"},children:[{data:{name:"Menu 1",href:"#dd-menu1"},children:[{data:{name:"Sub Menu 1",href:"#dd-menusub2"},children:[{data:{name:"Sub Sub Menu 1",href:"#menusubsub1"}}]},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#dd-menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]},{data:{name:"Menu 3",href:"#menu3"}}]},a=le(t,{base:"/components/drillDownMenu",hashBased:!0});return()=>n({id:"drilldown-example"},a({tree:o}))},Hs=`import drillDownMenu, { type Tree } from "@grucloud/bau-ui/drillDownMenu";
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
`,Us={title:"DrilldownMenu",package:"drilldownMenu",description:"The drilldown menu component helps navigate thought hierachical data.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/drilldownMenu/drilldownMenu.js",importStatement:'import drilldownMenu from "@grucloud/bau-ui/drilldownMenu";',examples:[{title:"Default",description:"A simple drilldown menu.",code:Hs,createComponent:Gs}],gridItem:(t,e)=>Sn(t,{base:"/components/drillDownMenu",hashBased:!0,...e})},Fs=t=>{const e=G(t);return()=>e(Us)};function Cn(t,e={}){const{bau:n,css:o}=t,{div:a,label:s,input:i}=n.tags,r={base:o`
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
    `};return function(l,...u){const{size:d=e.size??"md",variant:p=e.variant??"outline",color:g=e.color??"neutral",Component:m,disabled:h,...f}=l;return a({class:T(r.base,h&&r.disabled,e==null?void 0:e.class,l.class)},s({class:T(p,g,d)},m({disabled:h}),i({type:"file",disabled:h,...f})))}}const kn=(t,e)=>{const{tr:n,bau:o,css:a,config:s}=t,{svg:i,use:r}=o.tagsNS("http://www.w3.org/2000/svg"),{div:c,span:l}=o.tags,u=o.state("No file selected"),d=Cn(t,e),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:m})=>c({class:T(a`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&a`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},i({width:100,height:100,fill:"currentColor"},r({href:`${s.base}/uploadIcon.svg#Capa_1`})),l(n("Choose a file to upload")));return m=>d({Component:g,name:"file",accept:"text/*",onchange:p,...m})},Vs=t=>{const{tr:e,bau:n,css:o,config:a}=t,{svg:s,use:i}=n.tagsNS("http://www.w3.org/2000/svg"),{section:r,div:c,span:l}=n.tags,u=n.state("No file selected"),d=Cn(t),p=m=>{const h=m.target.files[0];h?u.val=h.name:u.val="No file selected"},g=({disabled:m})=>c({class:T(o`
            display: flex;
            align-items: center;
            flex-direction: column;
            stroke: var(--font-color-base);
            fill: var(--font-color-base);
            gap: 1rem;
          `,m&&o`
              color: var(--color-emphasis-500);
              fill: var(--font-color-disabled);
            `)},s({width:100,height:100,fill:"currentColor"},i({href:`${a.base}/uploadIcon.svg#Capa_1`})),l(e("Choose a file to upload")));return()=>r(d({Component:g,name:"file",accept:"text/*",onchange:p}),c("File selected: ",u))},Ws=`import classNames from "@grucloud/bau-css/classNames";
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
`,Ks={title:"File Input",package:"fileInput",description:"The fileInput component displays wraps the native input file type.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/fileInput/fileInput.js",importStatement:'import fileInput from "@grucloud/bau-ui/fileInput";',examples:[{title:"Default",description:"A simple file input.",code:Ws,createComponent:Vs}],gridItem:kn},Xs=t=>{const e=G(t);return()=>e(Ks)};function $t(t,e={}){const{bau:n,css:o}=t,{form:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",content:d,...p},...g]=X(r);return a({...p,class:T("form",u,l,c,s,e==null?void 0:e.class,p==null?void 0:p.class)},...g)}}function ve(t,e={}){const{bau:n,css:o,keyframes:a}=t,{span:s}=n.tags,i=a`
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
  `;return function(...l){let[{size:u=e.size??"md",variant:d=e.variant??"plain",color:p=e.color??"neutral",loading:g,...m},...h]=X(l);const f=F(t),x=mt(t);return n.bind({deps:[g],render:()=>w=>f({...m,class:T("loadingButton",u,d,p,r,w&&"loading",e==null?void 0:e.class,m==null?void 0:m.class)},x({size:u,variant:d,color:p,visibility:w}),s({class:w&&"loading"},h))})}}const Zs=t=>{const{bau:e,css:n,config:o}=t,{section:a,h1:s,header:i,label:r,img:c,footer:l}=e.tags,u=ve(t),d=kt(t,{variant:"outline",color:"danger"}),p=dt(t),g=$t(t,{class:n`
      max-width: 400px;
      & > header {
        text-align: center;
      }
      & > footer {
        & button {
          flex-grow: 1;
        }
      }
    `});return function({onLoggedIn:h=()=>{}}){const f=e.state(!1),x=e.state("");return g({onsubmit:async y=>{y.preventDefault();const{username:E,password:A}=Object.fromEntries(new FormData(y.target.closest("form")));try{f.val=!0;const I=await fetch("/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:E,password:A})});if(I.ok){const D=await I.json();h(D)}else I.status==401?x.val="Invalid username or password":x.val=I.statusText}catch(I){x.val=I.message}finally{f.val=!1}}},i(c({width:"100",height:"100",src:`${o.base}/gc.svg`}),s("Login to Grucloud")),a(()=>x.val&&d(x.val),r("Email",p({type:"email",autofocus:!0,placeholder:"Email",name:"username",autocomplete:"username",required:!0})),r("Password",p({type:"password",placeholder:"Password",name:"password",autocomplete:"current-password",minlength:"8",required:!0}))),l(u({type:"submit",variant:"solid",color:"primary",loading:f},"Login")))}},qs=`import form from "@grucloud/bau-ui/form";
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
`,Js=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i}=e.tags,r=$t(t),c=F(t,{variant:"solid",color:"primary"}),l=dt(t);return function({onSubmitted:d=()=>{}}){return r({onsubmit:async g=>{g.preventDefault();const m=Object.fromEntries(new FormData(g.target.closest("form")));alert(JSON.stringify(m)),d(m)}},a(o("Form with input")),n(s("Branch",l({autofocus:!0,placeholder:"Branch",name:"branch",required:!0}))),i(c({type:"submit"},"Click")))}},Ys=`import form from "@grucloud/bau-ui/form";
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
`,Qs=t=>{const{bau:e}=t,{section:n,h1:o,header:a,label:s,footer:i,em:r,span:c}=e.tags,l=e.state(""),u=e.derive(()=>l.val!=="Delete"),d=$t(t),p=F(t,{variant:"solid",color:"primary"}),g=dt(t);return function({onSubmitted:h=()=>{}}){return d({onsubmit:async x=>{x.preventDefault(),h()}},a(o("Delete Protection")),n(s(c("Type ",r("Delete")," to confirm the destruction of the resource."),g({autofocus:!0,placeholder:"Type 'Delete'",name:"check",required:!0,value:l,oninput:x=>l.val=x.target.value}))),i(p({type:"submit",disabled:u},"Delete")))}},ti=`import { Context } from "@grucloud/bau-ui/context";
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
`,ei={title:"Form",package:"form",description:"The form component displays an html form.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/form/form.js",importStatement:'import form from "@grucloud/bau-ui/form";',examples:[{title:"Simple form",description:"A simple form.",code:Ys,createComponent:Js},{title:"Form with state",description:"A form with input state and a dervied state.",code:ti,createComponent:Qs},{title:"Login page",description:"A login page.",code:qs,createComponent:Zs}]},ni=t=>{const e=G(t);return()=>e(ei)},En=(t,e={})=>{const n=dt(t,e);return o=>n({name:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinput-gallery-${e.color}-${e.variant}-${e.size}`,placeholder:"Enter text",...o})},oi=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=dt(t);return()=>n(o("Basic input"),a({id:"my-input",name:"my-input",placeholder:"Enter Text"}),o("Disabled input"),a({name:"my-input-disabled",placeholder:"Enter Text",disabled:!0}))},ai=`import input from "@grucloud/bau-ui/input";
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
`,ri={title:"Input",package:"input",description:"The input component allows user to enter text.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/input/input.js",importStatement:'import input from "@grucloud/bau-ui/input";',examples:[{title:"Default",description:"A simple input.",code:ai,createComponent:oi}],gridItem:En},si=t=>{const e=G(t);return()=>e(ri)},An=(t,e={})=>{const n=ce(t,e);return o=>n({name:`myinputSearch-gallery-${e.color}-${e.variant}-${e.size}`,id:`myinputSearch-gallery-${e.color??o.color}-${e.variant??o.variant}-${o.size??e.size}`,placeholder:"Enter text",...o})},ii=t=>{const{bau:e}=t,{section:n,h3:o}=e.tags,a=ce(t);return()=>n(o("Basic inputSearch"),a({id:"my-inputSearch",name:"my-inputSearch",placeholder:"Enter Text"}),o("Disabled inputSearch"),a({name:"my-inputSearch-disabled",placeholder:"Enter Text",disabled:!0}))},li=`import inputSearch from "@grucloud/bau-ui/inputSearch";
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
`,ci={title:"Input Search",package:"inputSearch",description:"The inputSearch component is an input of type 'search' with an icon on the left hand side.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/inputSearch/inputSearch.js",importStatement:'import inputSearch from "@grucloud/bau-ui/inputSearch";',examples:[{title:"Basic",description:"A simple inputSearch.",code:li,createComponent:ii}],gridItem:An},ui=t=>{const e=G(t);return()=>e(ci)};function Tn(t,e={}){const{bau:n,css:o}=t,{ul:a}=n.tags,s=o`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("keyValueList",s,e==null?void 0:e.class,d==null?void 0:d.class)},...p)}}const di=t=>{const{bau:e}=t,{section:n,li:o,label:a,span:s}=e.tags,i=Tn(t);return()=>n(i(o(a("My label"),s("My Value")),o(a("My other label"),s("My Other Value"))))},pi=`import keyValueList from "@grucloud/bau-ui/keyValueList";
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
`,mi=t=>{const{bau:e,css:n}=t,{section:o,li:a,label:s,span:i}=e.tags,r=Tn(t,{class:n`
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
`,bi={title:"KeyValueList",package:"keyValueList",description:"The keyValueList component displays a list of key value pair",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/keyValueList/keyValueList.js",importStatement:'import keyValueList from "@grucloud/bau-ui/keyValueList";',examples:[{title:"Vertical keyValueList",description:"A vertical keyValueList.",code:pi,createComponent:di},{title:"Horizontal keyValueList",description:"A horizontal keyValueList.",code:gi,createComponent:mi}]},hi=t=>{const e=G(t);return()=>e(bi)},fi="modulepreload",vi=function(t){return"/bau/bau-ui/"+t},Oe={},Dn=function(e,n,o){if(!n||n.length===0)return e();const a=document.getElementsByTagName("link");return Promise.all(n.map(s=>{if(s=vi(s),s in Oe)return;Oe[s]=!0;const i=s.endsWith(".css"),r=i?'[rel="stylesheet"]':"";if(!!o)for(let u=a.length-1;u>=0;u--){const d=a[u];if(d.href===s&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${r}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":fi,i||(l.as="script",l.crossOrigin=""),l.href=s,document.head.appendChild(l),i)return new Promise((u,d)=>{l.addEventListener("load",u),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())};function Mn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=mt(t,{size:"lg"}),i=kt(t,{color:"danger"}),r=()=>a({class:o`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `},s({visibility:!0})),c=l=>i(l.message);return function({getModule:u,loading:d=r,error:p=c,props:g={}}){const m=n.state(void 0),h=n.state(!0),f=n.state(!1);return u().then(x=>{m.val=x.default(t),h.val=!1}).catch(x=>{f.val=x.message}),a(()=>{if(f.val)return p({message:f.val});if(m.val)return m.val(g);if(h.val)return d()})}}const xi=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state(!1),a=Mn(t),s=F(t);return()=>n(s({onclick:()=>o.val=!o.val},()=>o.val?"Hide":"Show"),()=>o.val&&a({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"myValue"}}))},yi=`import { Context } from "@grucloud/bau-ui/context";
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
`,wi=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=e.state(!1),s=Mn(t,{loading:()=>o("My Custom Loading"),error:r=>o("My Custom Error")}),i=F(t);return()=>n(i({onclick:()=>a.val=!a.val},()=>a.val?"Hide":"Show"),()=>a.val&&s({getModule:()=>Dn(()=>import("./myComponent-a7adf959.js"),[]),props:{message:"Additional Props here"}}))},Si=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ci={title:"Lazy",package:"lazy",description:"The lazy component delays the loading of a component, hence improving the initial bundle size.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/lazy/lazy.js",importStatement:'import lazy from "@grucloud/bau-ui/lazy";',examples:[{title:"Simple",description:"Lazy load a component.",code:yi,createComponent:xi},{title:"Custom Loader",description:"Custom loader and error",code:Si,createComponent:wi}]},ki=t=>{const e=G(t);return()=>e(Ci)};function Bn(t,e={}){const{bau:n,css:o,keyframes:a}=t,{div:s}=n.tags,i=()=>ot.map(l=>`
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

    ${i()}
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",running:m,...h}]=X(u);return s({...h,role:"progressbar",class:{deps:[m],renderProp:()=>f=>T("linearProgress",d,g,c,f&&"running",e==null?void 0:e.class,h==null?void 0:h.class)}})}}const In=(t,e)=>{const n=Bn(t,e);return o=>n({...o,running:!0})},Ei=t=>{const{bau:e}=t,{section:n,hr:o}=e.tags,a=F(t),s=Bn(t),i=e.state(!1);return()=>n(a({variant:"solid",color:"primary",onclick:()=>i.val=!i.val},()=>i.val?"Stop":"Start"),o,s({running:i}))},Ai=`import linearProgress from "@grucloud/bau-ui/linearProgress";
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
`,Ti={title:"LinearProgress",package:"linearProgress",description:"The linearProgress component displays an animated horizontal bar.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/linearProgress/linearProgress.js",importStatement:'import linearProgress from "@grucloud/bau-ui/linearProgress";',examples:[{title:"Simple LinearProgress",description:"A simple linearProgress.",code:Ai,createComponent:Ei}],gridItem:In},Di=t=>{const e=G(t);return()=>e(Ti)},Nn=(t,e)=>{const n=ve(t,e);return o=>n({...o,loading:!0},"Save")},Mi=t=>{const{bau:e}=t,{section:n}=e.tags,o=ve(t),a=e.state(!0);return()=>n(o({variant:"solid",color:"primary",loading:a,onclick:()=>a.val=!a.val},"Save"))},Bi=`import loadingButton from "@grucloud/bau-ui/loadingButton";

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
`,Ii={title:"LoadingButton",package:"loadingButton",description:"The loadingButton component displays a button with a loading indicator.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/loadingButton/loadingButton.js",importStatement:'import loadingButton from "@grucloud/bau-ui/loadingButton";',examples:[{title:"Simple LoadingButton",description:"A simple loadingButton.",code:Bi,createComponent:Mi}],gridItem:Nn},Ni=t=>{const e=G(t);return()=>e(Ii)},$i=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Li=(t,e)=>{const{bau:n,css:o}=t,{span:a,li:s}=n.tags,i=vt(t,e),r=({code:c,label:l})=>s({class:o`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return c=>i({...c},$i.map(r))},Oi=[{code:"AD",label:"Andorra",phone:"376"},{code:"AF",label:"Afghanistan",phone:"93"}],Pi=t=>{const{bau:e,css:n}=t,{section:o,span:a,li:s}=e.tags,i=vt(t),r=({code:c,label:l})=>s({class:n`
          display: flex;
          gap: 1rem;
        `},a(c),a(l));return()=>o(i({variant:"outline",color:"primary"},Oi.map(r)))},zi=`import list from "@grucloud/bau-ui/list";
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
`,_i={title:"Input",package:"list",description:"The list component displays a list of items.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/list/list.js",importStatement:'import list from "@grucloud/bau-ui/list";',examples:[{title:"Default",description:"A simple list.",code:zi,createComponent:Pi}],gridItem:Li},Ri=t=>{const e=G(t);return()=>e(_i)};function $n(t,e={}){const{bau:n,css:o,window:a}=t,{dialog:s,div:i}=n.tags,c=o`
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
    ${(()=>ot.map(l=>`
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
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"plain",color:g=e.color??"neutral",...m},...h]=X(u);const f=s({...m,bauMounted:()=>{new URLSearchParams(a.location.search).get("modal")==(m.id??"modal")&&f.showModal()},class:T("modal",c,g,p,d,e==null?void 0:e.class,m==null?void 0:m.class)},h);return new MutationObserver(w=>{const y=new URLSearchParams(a.location.search);w[0].attributeName=="open"&&(f.open?y.set("modal",f.id??"modal"):y.delete("modal"),a.history.pushState("","",`?${y.toString()}`))}).observe(f,{attributes:!0}),f}}const Ln=(t,e={})=>{const{bau:n}=t,{form:o,section:a,main:s,header:i,footer:r,p:c,h1:l}=n.tags,u=F(t),d=$n(t,e),p=()=>s(Array(20).fill("").map((m,h)=>c(h+1,". Some text here"))),g=m=>{const h=d({id:`dialog-${m.color}-${m.variant}-${e.size}`,...m},o(i(l("Header")),p(),r(u({variant:"outline",color:m.color,onclick:()=>{h.close()}},"Cancel"),u({variant:"solid",color:m.color,onclick:()=>{h.close()}},"OK"))));return h};return m=>{const h=g(m);return a(u({...m,onclick:()=>{h.showModal()}},"OPEN MODAL"),h)}},ji=t=>{const{bau:e}=t,{form:n,section:o,main:a,header:s,footer:i,p:r}=e.tags,c="neutral",l=F(t),u=$n(t),d=()=>a(Array(10).fill("").map((g,m)=>r(m+1,". Some text here"))),p=u({id:"my-dialog"},n(s("Header"),d(),i(l({variant:"outline",color:c,onclick:()=>{p.close()}},"Cancel"),l({variant:"solid",color:c,onclick:()=>{p.close()}},"OK"))));return()=>o(l({variant:"solid",color:"neutral",onclick:()=>{p.showModal()}},"OPEN MODAL"),p)},Gi=`import modal from "@grucloud/bau-ui/modal";
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
`,Hi={title:"Modal",package:"modal",description:"The modal component is a wrapper around the native dialog element.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/modal/modal.js",importStatement:'import modal from "@grucloud/bau-ui/modal";',examples:[{title:"Default",description:"A simple modal.",code:Gi,createComponent:ji}],gridItem:Ln},Ui=t=>{const e=G(t);return()=>e(Hi)},Fi=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Vi(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i}=n.tags,r=F(t),c=Nt(t),l=vt(t),u=qt(t,{color:"neutral",variant:"outline"}),d=o`
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
  `;return function(...g){let[{size:m=e.size??"md",variant:h=e.variant??"outline",color:f=e.color??"neutral",name:x,label:w,Option:y,options:E,defaultValue:A=[],getOptionLabel:I,getOptionValue:D,renderValue:B,onSelect:O=()=>{},loading:L,...N},...j]=X(g);const R=mt(t,{variant:h,color:f,size:m}),H=n.state(A),Z=n.state(!1),S=n.state(0),b=()=>{J.openDialog(),J.focus(),Z.val=!0},v=()=>{J.closeDialog(),Z.val=!1},C=()=>{Z.val=!1},k=V=>{J.open?v():b(),V.preventDefault()},P=()=>Array.from(nt.selectedOptions).map(({value:V})=>E.find(tt=>D(tt)==V)),z=V=>{switch(V.preventDefault(),V.key){case"Escape":v();break;case"ArrowDown":S.val<E.length-1?S.val++:S.val=0;break;case"ArrowUp":S.val<=0?S.val=E.length-1:S.val--;break;case"Enter":if(J.open){const tt=V.currentTarget.querySelectorAll("input")[S.val];tt.checked=!tt.checked;const rt=nt.options[S.val+1];rt.selected=!rt.selected,H.val=P()}else b();break}},W=V=>tt=>{const rt=[...nt.options].find(({value:lt})=>lt==D(V));tt.target.checked?rt.selected=!0:rt.selected=!1,H.val=P()},U=()=>l({tabindex:"0",class:T(f,h)},E.map((V,tt)=>s({class:()=>T(S.val==tt&&"active")},n.tags.label(u({checked:A.find(rt=>D(rt)==D(V)),name:`${x}-${D(V)}`,onchange:W(V)}),y(V))))),$=r({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":Z,"aria-label":w,onclick:k,color:f,variant:h,size:m,class:L==!0&&"loading",disabled:L},()=>H.val.length?B(H.val):w,()=>L==!0&&R({visibility:L})),J=c({triggerEl:$,contentEl:U(),onClose:C}),nt=i({name:x,multiple:!0,...N},n.tags.option({value:""},"--Category--"),E.map(V=>n.tags.option({value:D(V),selected:A.find(tt=>D(tt)==D(V))},I(V))));return a({...N,class:T("multiSelect",f,m,d,e==null?void 0:e.class,N==null?void 0:N.class),onkeydown:z},nt,$,J)}}const Wi=t=>{const{bau:e,css:n}=t,{div:o,span:a,form:s,footer:i}=e.tags,r=Vi(t),c=F(t,{variant:"outline",color:"neutral"}),l=It(t,{size:"sm"}),u=[{group:"EC2"},{group:"ECS"},{group:"IAM"},{group:"Lambda"},{group:"RDS"},{group:"S3"}],d=g=>a(g.group),p=g=>{g.preventDefault();const{selectedOptions:m}=g.target.elements.myMultiSelect;var h=Array.from(m).map(({value:f})=>f);alert(JSON.stringify(h))};return()=>s({onsubmit:p,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},r({name:"myMultiSelect",options:u,Option:d,defaultValue:[{group:"IAM"}],getOptionValue:({group:g})=>g,getOptionLabel:({group:g})=>g,renderValue:g=>o({class:n`
                display: flex;
                gap: 0.2rem;
              `},g.map(m=>l(m.group))),label:"Select services"}),i(c({type:"submit"},"Submit")))},Ki=`import { Context } from "@grucloud/bau-ui/context";
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
`,Xi=t=>{const{bau:e,css:n}=t,{select:o,option:a,form:s}=e.tags,i=F(t,{variant:"outline",color:"neutral"}),r=[{group:"Cabrinha"},{group:"Core"},{group:"Duotone"},{group:"Naish"},{group:"Reedin"},{group:"Slingshot"}],c=l=>{l.preventDefault();const{selectedOptions:u}=l.target.elements.myNativeMultiSelect;var d=Array.from(u).map(({value:p})=>p);alert(JSON.stringify(d))};return()=>s({onsubmit:c,class:n`
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
        `},o({multiple:!0,name:"myNativeMultiSelect"},r.map(({group:l})=>a({value:l},l))),i({type:"submit"},"Submit"))},Zi=`import { Context } from "@grucloud/bau-ui/context";
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
`,qi={title:"MultiSelect",package:"multiSelect",description:"The multiSelect component allows user to select multiple items from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/multiSelect/multiSelect.js",importStatement:'import multiSelect from "@grucloud/bau-ui/multiSelect";',examples:[{title:"Simple Multi Select",description:"A simple multi select.",code:Ki,createComponent:Wi},{title:"Native Multi Select",description:"A native multi select.",code:Zi,createComponent:Xi}]},Ji=t=>{const e=G(t);return()=>e(qi)},Yi=t=>{const{bau:e}=t,{section:n,div:o,h1:a,p:s}=e.tags,i=F(t),r=Nt(t),c=()=>i({variant:"outline",color:"success",onclick:()=>d.open?d.closeDialog():d.openDialog()},"Click"),l=()=>o({},a("My content"),s("My Content")),u=c(),d=r({id:"my-popover-left",triggerEl:u,contentEl:l()});return()=>n(o(u,d))},Qi=`import popover from "@grucloud/bau-ui/popover";
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
`,tl={title:"Popover",package:"popover",description:"The popover component display a dialog next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/popover/popover.js",importStatement:'import popover from "@grucloud/bau-ui/popover";',examples:[{title:"Default",description:"A simple popover.",code:Qi,createComponent:Yi}]},el=t=>{const e=G(t);return()=>e(tl)};function nl(t,e={}){const{bau:n,css:o,config:a}=t,{div:s,a:i,span:r,nav:c}=n.tags,l=o`
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
  `,u=({text:d})=>({name:p,label:g,href:m})=>i({href:`${a.base}${m}`},r({class:"sublabel"},d),s({class:`label ${d}`},g??p));return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",data:f={},...x}]=X(p);const{next:w,previous:y}=f;return c({"data-paginationnav":JSON.stringify(f),"aria-label":"pages navigation",...x,class:T("paginationNavigation",g,l,e==null?void 0:e.class,x==null?void 0:x.class)},(y==null?void 0:y.href)&&u({text:"Previous"})(y),(w==null?void 0:w.href)&&u({text:"Next"})(w))}}const ol=t=>{const{bau:e}=t,{section:n}=e.tags,o=nl(t),a={next:{name:"next page",label:"Popover",href:"/components/popover"},previous:{name:"previous page",label:"Paper",href:"/components/paper"}};return()=>n(o({variant:"solid",color:"primary",data:a}))},al=`import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";

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
`,rl={title:"Pagination Navigation",package:"paginationNavigation",description:"The paginationNavigation component displays a previous and a next button for navigation",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paginationNavigation/paginationNavigation.js",importStatement:'import paginationNavigation from "@grucloud/bau-ui/paginationNavigation";',examples:[{title:"Simple PaginationNavigation",description:"A simple paginationNavigation.",code:al,createComponent:ol}]},sl=t=>{const e=G(t);return()=>e(rl)},il=(t,e)=>{const{bau:n}=t,{div:o}=n.tags,a=Kt(t,e);return s=>a({...s},o(`Paper ${e.size??""}`))},ll=t=>{const{bau:e}=t,{section:n,div:o}=e.tags,a=Kt(t);return()=>n(a({size:"md"},o("My content")))},cl=`import paper from "@grucloud/bau-ui/paper";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section, div } = bau.tags;

  const Paper = paper(context);

  return () => section(Paper({ size: "md" }, div("My content")));
};
`,ul={title:"Paper",package:"paper",description:"The paper component displays child components on a surface area.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/paper/paper.js",importStatement:'import paper from "@grucloud/bau-ui/paper";',examples:[{title:"Default",description:"A simple paper.",code:cl,createComponent:ll}],variantColorTableDisable:!0,gridItem:il},dl=t=>{const e=G(t);return()=>e(ul)};function xe(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
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
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p}]=X(c);return a({...p,type:"radio",class:T("radio-button",l,d,u,i,e==null?void 0:e.class,p==null?void 0:p.class)})}}const On=(t,e)=>{const{bau:n,css:o}=t,{label:a,form:s}=n.tags,i=xe(t,e);return r=>s({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
            gap: 0.5rem;
          }
        `},a("off ",i({...r,id:`my-myRadioButton-example-off-${r.color}-${r.variant}`})),a("on ",i({...r,id:`my-myRadioButton-example-on-${r.color}-${r.variant}`,checked:!0})))},pl=t=>{const{bau:e,css:n}=t,{label:o,div:a,form:s}=e.tags,i=xe(t),r=e.state("one"),c=({target:l})=>r.val=l.id;return()=>s({class:n`
          & label {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
        `},o("One",i({id:"one",name:"radio",checked:!0,value:r,oninput:c})),o("Two",i({id:"two",name:"radio",value:r,oninput:c})),a("Choice: ",r))},ml=`import radioButton from "@grucloud/bau-ui/radioButton";
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
`,gl={title:"RadioButton",package:"radioButton",description:"The radioButton component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButton/radioButton.js",importStatement:'import radioButton from "@grucloud/bau-ui/radioButton";',examples:[{title:"Simple RadioButton",description:"A simple radioButton.",code:ml,createComponent:pl}],gridItem:On},bl=t=>{const e=G(t);return()=>e(gl)};function Jt(t,e={}){const{bau:n,css:o}=t,{div:a,label:s}=n.tags,i=xe(t),c=o`
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
    ${(()=>ot.map(l=>`
  `).join(`
`))()};
  `;return function(...u){let[{size:d=e.size??"md",variant:p=e.variant??"none",color:g=e.color??"neutral",name:m,oninput:h,value:f,radios:x=[],...w}]=X(u);return a({...w,class:T("radioButtonGroup",d,g,p,c,e==null?void 0:e.class,w==null?void 0:w.class)},x.map(({id:y,Label:E})=>s(i({size:d,variant:p,color:g,id:y,name:m,checked:f==y,value:y,oninput:h}),E())))}}const hl=t=>{const{bau:e}=t,{form:n,article:o,footer:a,p:s}=e.tags,i=Jt(t),r=F(t,{variant:"outline",color:"primary"}),c=e.state("two"),l=({target:d})=>c.val=d.id,u=d=>{d.preventDefault(),alert(c.val)};return()=>n({onsubmit:u},o(i({oninput:l,name:"myRadio",value:c.val,radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]}),s("CheckedState: ",c)),a(r({type:"submit"},"Submit")))},fl=`import { Context } from "@grucloud/bau-ui/context";
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
`,vl=t=>{const{bau:e}=t,{form:n,article:o,footer:a}=e.tags,s=Jt(t),i=F(t,{variant:"outline",color:"primary"}),r=c=>{c.preventDefault();const l=c.target.closest("form"),u=Object.fromEntries(new FormData(l));alert(JSON.stringify(u))};return()=>n({onsubmit:r},o(s({name:"myRadio",value:"one",radios:[{id:"one",Label:()=>"One"},{id:"two",Label:()=>"Two"}]})),a(i({type:"submit"},"Submit")))},xl=`import { Context } from "@grucloud/bau-ui/context";
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
`,yl=t=>{const{bau:e,config:n}=t,{form:o,article:a,footer:s,img:i}=e.tags,r=Jt(t),c=F(t,{variant:"outline",color:"primary"}),l=()=>i({src:`${n.base}/login/github.svg#Capa_1`,alt:"GitHub",width:28,height:28}),u=()=>i({src:`${n.base}/login/gitlab-logo.svg#Capa_1`,alt:"GitLab",width:28,height:28}),d=p=>{p.preventDefault();const g=p.target.closest("form"),m=Object.fromEntries(new FormData(g));alert(JSON.stringify(m))};return()=>o({onsubmit:d},a(r({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>[l(),"GitHub"]},{id:"GitLab",Label:()=>[u(),"GitLab"]}]})),s(c({type:"submit"},"Submit")))},wl=`import { Context } from "@grucloud/bau-ui/context";
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
`,Sl=t=>{const{bau:e}=t,{form:n,article:o,footer:a,small:s,div:i}=e.tags,r=Jt(t),c=F(t,{variant:"outline",color:"primary"}),l=u=>{u.preventDefault();const d=u.target.closest("form"),p=Object.fromEntries(new FormData(d));alert(JSON.stringify(p))};return()=>n({onsubmit:l},o(r({name:"git_provider_type",value:"",radios:[{id:"GitHub",Label:()=>i("GitHub",s("Login with GitHub"))},{id:"GitLab",Label:()=>i("GitLab",s("Login with GitLab"))}]})),a(c({type:"submit"},"Submit")))},Cl=`import { Context } from "@grucloud/bau-ui/context";
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
`,kl={title:"RadioButtonGroup",package:"radioButtonGroup",description:"The radioButtonGroup component displays an input of type radio",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/radioButtonGroup/radioButtonGroup.js",importStatement:'import radioButtonGroup from "@grucloud/bau-ui/radioButtonGroup";',examples:[{title:"Stateless Radio Button Group",description:"A stateless radio button group.",code:xl,createComponent:vl},{title:"Statefull Radio Button Group",description:"A statefull radio button group.",code:fl,createComponent:hl},{title:"Label with Image",description:"A label with an image.",code:wl,createComponent:yl},{title:"Label with description",description:"A label with name and description.",code:Cl,createComponent:Sl}]},El=t=>{const e=G(t);return()=>e(kl)},Al=()=>ot.map(t=>`
& button.plain.${t}::after {
  color: var(--color-${t});
}
& button.outline.${t}::after {
  color: var(--color-${t});
}
`).join(`
`);function Lt(t,e={}){const{bau:n,css:o}=t,{div:a,li:s,select:i,option:r}=n.tags,c=F(t),l=Nt(t),u=vt(t),d=o`
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
    ${Al()}
  `;return function(...g){let[{size:m=e.size??"md",variant:h=e.variant??"outline",color:f=e.color??"neutral",label:x,Option:w,options:y,defaultOption:E,getOptionLabel:A,getOptionValue:I,onSelect:D=()=>{},loading:B,...O},...L]=X(g);const N=mt(t,{variant:h,color:f,size:m}),j=n.state(E?A(E):x),R=n.state(!1),H=n.state(0),Z=()=>{W.openDialog(),W.focus(),R.val=!0},S=()=>{W.closeDialog(),R.val=!1},b=()=>{R.val=!1},v=$=>{W.open?S():Z(),$.preventDefault()},C=({option:$,index:J})=>nt=>{j.val=A($),U.value=I($),U.setCustomValidity(""),H.val=J,S(),D($),nt.preventDefault()},k=$=>{switch($.preventDefault(),$.key){case"Escape":S();break;case"ArrowDown":H.val<y.length-1?H.val++:H.val=0;break;case"ArrowUp":H.val<=0?H.val=y.length-1:H.val--;break;case"Enter":W.open?(j.val=A(y[H.val]),U.value=I(r),S()):Z();break}},P=()=>u({tabindex:"0",class:T(f,h)},y.map(($,J)=>s({class:()=>T(H.val==J&&"active"),onclick:C({option:$,index:J})},w($)))),z=c({type:"button",role:"combobox","aria-autocomplete":"list","aria-expanded":R,"aria-label":x,onclick:v,color:f,variant:h,size:m,class:B==!0&&"loading",disabled:B},()=>!j.val&&x,j,()=>B==!0&&N({visibility:B})),W=l({triggerEl:z,contentEl:P(),onClose:b}),U=i(O,r({value:""},"--Select Category--"),y.map($=>r({value:I($)},A($))));return U.value=O.value,a({...O,class:T("select",f,m,d,e==null?void 0:e.class,O==null?void 0:O.class),onkeydown:k},U,z,W)}}const Pn=(t,e)=>{const{bau:n,css:o}=t,{div:a,span:s}=n.tags,i=Lt(t,e),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"}],c=l=>a({class:o`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return l=>i({...l,options:r,Option:c,getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."})},Tl=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Lt(t),r=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],c=l=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(l.label),s(l.code));return()=>o(i({options:r,Option:c,getOptionValue:({code:l})=>l,getOptionLabel:({label:l})=>l,label:"Select a country..."}))},Dl=`import select from "@grucloud/bau-ui/select";
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
`,Ml=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=Lt(t),r="AD",c=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}],l=u=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(u.label),s(u.code));return()=>o(i({options:c,Option:l,defaultOption:c.find(({code:u})=>u==r),getOptionValue:({code:u})=>u,getOptionLabel:({label:u})=>u,label:"Select a country..."}))},Bl=`import select from "@grucloud/bau-ui/select";
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
`,Il=t=>{const{bau:e}=t,{span:n,form:o}=e.tags,a=Lt(t),s=["eu-north-1","ap-south-1","eu-west-3","eu-west-2","eu-west-1","ap-northeast-3","ap-northeast-2","ap-northeast-1","sa-east-1","ca-central-1","ap-southeast-1","ap-southeast-2","eu-central-1","us-east-1","us-east-2","us-west-1","us-west-2"],i=r=>n({},r);return()=>o(a({options:s,Option:i,label:"Select a region",getOptionValue:r=>r,getOptionLabel:r=>r}))},Nl=`import select from "@grucloud/bau-ui/select";
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
`,$l=t=>{const{bau:e,css:n}=t,{section:o,div:a,span:s}=e.tags,i=F(t,{variant:"outline"}),r=Lt(t),c=e.state([]),l=e.state(!1),u=e.state("");async function d({url:m,transform:h=f=>f}){try{l.val=!0;const f=await fetch(m,{});if(f.ok){const x=await f.json();c.val=h(x)}else u.val=f.statusText}catch(f){u.val=f.message}finally{l.val=!1}}const p=()=>d({url:"https://restcountries.com/v3.1/all?fields=name,flag",transform:m=>m.sort((h,f)=>h.name.common.localeCompare(f.name.common))});p();const g=m=>a({class:n`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
        `},s(m.flag),s(m.name.common));return()=>o(a({class:n`
            display: flex;
            gap: 1rem;
          `},()=>r({options:c.val,Option:g,getOptionValue:({name:m})=>m.common,getOptionLabel:({name:m})=>m.common,label:"Country",id:"country",loading:l.val}),i({onclick:()=>p()},"Reload")))},Ll=`import { Context } from "@grucloud/bau-ui/context";
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
`,Ol={title:"Select",package:"select",description:"The select component allows user to select from a list.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/select/select.js",importStatement:'import select from "@grucloud/bau-ui/select";',examples:[{title:"Simple Select",description:"A simple select.",code:Dl,createComponent:Tl},{title:"Default Option",description:"Select with a default option",code:Bl,createComponent:Ml},{title:"Select AWS region",description:"Select the AWS region",code:Nl,createComponent:Il},{title:"Loading Indicator",description:"Select with a loading indicator",code:Ll,createComponent:$l}],gridItem:Pn},Pl=t=>{const e=G(t);return()=>e(Ol)};function zn(t,e={}){const{bau:n,css:o}=t,{select:a}=n.tags,s=o`
    border-radius: var(--global-radius);
    &.sm {
    }
    &.md {
      padding: 0.5rem;
    }
    &.lg {
      padding: 0.7rem;
    }
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"outline",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("select-native",u,c,l,s,e==null?void 0:e.class,d==null?void 0:d.class)},p)}}const _n=(t,e)=>{const{bau:n}=t,{option:o}=n.tags,a=zn(t,e),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return i=>a(i,s.map(({label:r,phone:c})=>o({value:c},r)))},zl=t=>{const{bau:e}=t,{section:n,option:o}=e.tags,a=zn(t),s=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"}];return()=>n(a(s.map(({label:i,phone:r})=>o({value:r},i))))},_l=`import selectNative from "@grucloud/bau-ui/selectNative";
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
`,Rl={title:"SelectNative",package:"selectNative",description:"The selectNative component encapsulates the native html select.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/selectNative/selectNative.js",importStatement:'import selectNative from "@grucloud/bau-ui/selectNative";',examples:[{title:"Simple SelectNative",description:"A simple selectNative.",code:_l,createComponent:zl}],gridItem:_n},jl=t=>{const e=G(t);return()=>e(Rl)},Gl=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Ct(t),i=()=>a({class:n`
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
          `})));return()=>o(i())},Hl=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Ul=t=>{const{bau:e,css:n}=t,{section:o,div:a}=e.tags,s=Ct(t),i=()=>a({class:n`
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
            `}))));return()=>o(i())},Fl=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Vl=t=>{const{bau:e,css:n}=t,{section:o,table:a,tbody:s,tr:i,td:r}=e.tags,c=Ct(t,{class:n`
      height: 2rem;
      width: 10rem;
    `}),l=()=>a(s(new Array(8).fill("").map(()=>i(r(c({class:n`
                  width: 5rem;
                `})),r(c()),r(c()),r(c()),r(c({class:n`
                  width: 20rem;
                `}))))));return()=>o(l())},Wl=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Kl=t=>{const{bau:e,css:n}=t,{section:o,header:a,span:s,article:i}=e.tags,r=n`
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
  `,c=Ct(t,{class:n`
      min-width: 6rem;
      & span {
        visibility: hidden;
      }
    `}),l=Ct(t);function u({columnsSize:d=4}){return o({class:r},a(new Array(d).fill("").map(()=>c(s("1")))),i(l("")))}return()=>o(u({columnsSize:3}))},Xl=`import skeleton from "@grucloud/bau-ui/skeleton";
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
`,Zl={title:"Skeleton",package:"skeleton",description:"The skeleton component is used a loading indicator",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/skeleton/skeleton.js",importStatement:'import skeleton from "@grucloud/bau-ui/skeleton";',examples:[{title:"Card",description:"A card skeleton.",code:Hl,createComponent:Gl},{title:"List",description:"A list skeleton.",code:Fl,createComponent:Ul},{title:"Table",description:"A table skeleton.",code:Wl,createComponent:Vl},{title:"Tabs",description:"A tabs skeleton.",code:Xl,createComponent:Kl}],variantColorTableDisable:!0,variantSizeDisable:!0},ql=t=>{const e=G(t);return()=>e(Zl)};function Yt(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,i=o`
    ${(()=>ot.map(r=>`
&.slider.${r} {
  accent-color: var(--color-${r});
}
`).join(`
`))()};
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"plain",color:d=e.color??"neutral",...p},...g]=X(c);return a({...p,type:"range",class:T("slider",d,u,l,i,e==null?void 0:e.class,p.class)},...g)}}const Rn=t=>{const{bau:e}=t,n=e.state(0),o=s=>{n.val=s==null?void 0:s.target.value},a=Yt(t);return s=>a({...s,oninput:o})},Jl=t=>{const{bau:e}=t,{section:n,form:o,label:a,br:s}=e.tags,i=e.state(0),r=l=>{i.val=l==null?void 0:l.target.value},c=Yt(t);return()=>n(o(a("Slider with step, min and max",s,c({oninput:r,name:"slider-simple",step:20,min:-100,max:100}))))},Yl=`import slider from "@grucloud/bau-ui/slider";
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
`,Ql=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s,datalist:i,br:r,option:c}=e.tags,l=e.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Yt(t);return()=>o(a(s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,class:n`
            width: 300px;
            margin: 0;
          `,id:"temp",name:"temp",list:"markers"}),i({id:"markers",class:n`
              width: 300px;
              display: flex;
              justify-content: space-between;
            `},["0","25","50","75","100"].map(p=>c({value:Number(p),label:p})))))},tc=`import slider from "@grucloud/bau-ui/slider";
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
`,ec=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s,datalist:i,br:r,option:c}=e.tags,l=e.state(0),u=p=>{l.val=p==null?void 0:p.target.value},d=Yt(t);return()=>o(a({class:n`
            display: flex;
          `},s({for:"temp"},"Choose a comfortable temperature"),r,d({oninput:u,id:"temp-vertical",name:"temp",list:"markers-vertical",orient:"vertical",class:n`
            width: 30px;
            appearance: slider-vertical;
          `}),i({id:"markers-vertical",class:n`
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `},["0","25","50","75","100"].reverse().map(p=>c({value:Number(p),label:p})))))},nc=`import slider from "@grucloud/bau-ui/slider";
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
`,oc={title:"Slide",package:"slider",description:"The slider component allows a user to to choose a number between a range.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/slider/slider.js",importStatement:'import slider from "@grucloud/bau-ui/slider";',examples:[{title:"Default",description:"A simple slider.",code:Yl,createComponent:Jl},{title:"Horizontal Mark",description:"A slider with horizontal mark.",code:tc,createComponent:Ql},{title:"Vertical Mark",description:"A vertical slider with marks.",code:nc,createComponent:ec}],gridItem:Rn},ac=t=>{const e=G(t);return()=>e(oc)},jn=(t,e)=>{const n=mt(t,e);return o=>n({...o})},rc=t=>{const{bau:e}=t,{section:n}=e.tags,o=F(t),a=mt(t,{size:"lg"}),s=e.state(!0);return()=>n(o({variant:"solid",color:"primary",onclick:()=>s.val=!s.val},()=>s.val?"Stop":"Start"),a({visibility:s}))},sc=`import spinner from "@grucloud/bau-ui/spinner";
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
`,ic={title:"Spinner",package:"spinner",description:"The spinner component displays an animated loading spinner.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/spinner/spinner.js",importStatement:'import spinner from "@grucloud/bau-ui/spinner";',examples:[{title:"Default",description:"A simple spinner.",code:sc,createComponent:rc}],gridItem:jn},lc=t=>{const e=G(t);return()=>e(ic)},cc=()=>ot.map(t=>"").join(`
`),Gn=(t,e)=>(n,o)=>{const a=new URLSearchParams(t.window.location.search);return a.delete(e),a.append(e,n),o&&Object.entries(o).map(([s,i])=>(a.delete(s),a.append(s,i))),`?${a.toString()}`};function Hn(t,e={}){const{bau:n,css:o,window:a}=t,{div:s,ul:i,li:r,span:c,section:l}=n.tags,u=o`
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
    ${cc()}
    &.stepper > section > .content {
      visibility: hidden;
      display: none;
    }

    &.stepper > section > .visible {
      visibility: visible;
      display: block;
    }
  `;return function(...p){let[{color:g,variant:m="plain",size:h,stepperDefs:f=[],stepperName:x,activeStepIndex:w=n.state(0),...y},...E]=X(p);const A=n.state(f.map((N,j)=>({...N,index:j}))),I=n.state([]);a.history.pushState=new Proxy(a.history.pushState,{apply:(N,j,R)=>{N.apply(j,R);const H=R[2]??"";console.log("stepper pushState ",H),["?","#"].includes(H[0])&&L()}});const D=n.derive(()=>A.val[w.val]),B=N=>{const{Header:j,disabled:R,name:H,index:Z}=N;return r({class:()=>T(D.val.name==H&&"active",w.val<Z&&"not-completed",w.val>Z&&"completed",R&&"disabled")},c({class:"step-number"},Z+1),c({class:"step-label"},()=>j(N)))},O=N=>f.findIndex(({name:j})=>j==N.name),L=()=>{const j=new URLSearchParams(a.location.search).get(x)??f[0].name,R=Math.max(f.findIndex(({name:H})=>H==j),0);R<w.val&&(console.log("remove last step"),I.val.pop()),I.val.some(({name:H})=>j==H)||(console.log("add new step"),I.val.push(f[R])),w.val=R};return L(),s({bauMounted:({element:N})=>{a.addEventListener("popstate",L)},bauUnmounted:()=>{a.removeEventListener("popstate",L)},class:T("stepper",m,h,g,u,e==null?void 0:e.class,y.class)},n.loop(A,i(),B),n.loop(I,l(),N=>s({class:()=>T("content",N.name==D.val.name&&"visible")},N.Content({nextStep:f[O(N)+1],previousStep:f[O(N)-1]}))))}}const Pe="my-wizard",uc=t=>{const{bau:e,window:n}=t,{footer:o,p:a,label:s,section:i,a:r,ul:c,li:l}=e.tags,u=dt(t),d=$t(t),p=Hn(t),g=Gn(t,Pe),m=F(t,{variant:"outline",color:"primary"}),h=F(t,{variant:"solid",color:"primary"}),f=({nextStep:y})=>E=>{E.preventDefault();const{organization:A}=E.target.elements;n.history.pushState("","",g(y.name,{organization:A.value}))},x=y=>{var D;y.preventDefault();const{organization:E}=(D=n.document.forms)==null?void 0:D.formStep1.elements,I=new URLSearchParams(n.location.search).get("choice");alert(`organization ${E.value}, choice:${I}`)},w=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:y})=>d({onsubmit:f({nextStep:y}),id:"formStep1"},s("Organization",u({autofocus:!0,placeholder:"Organization",name:"organization"})),o(h({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:y,previousStep:E})=>d(c(l(r({href:g(y.name,{choice:"choice1"})},"Choice 1")),l(r({href:g(y.name,{choice:"choice2"})},"Choice 2"))),o(m({href:g(E.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:y})=>d({onsubmit:x},a("My stepper 3 Content"),o(m({href:g(y.name)},"Previous: Step 2"),h({type:"submit"},"Save")))}];return()=>i(p({stepperDefs:w,stepperName:Pe}))},dc=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,ze="stepper-vertical",pc=t=>{const{bau:e,window:n,css:o}=t,{footer:a,p:s,label:i,section:r,a:c,ul:l,li:u}=e.tags,d=dt(t),p=$t(t),g=Hn(t,{class:o`
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
    `}),m=Gn(t,ze),h=F(t,{variant:"outline",color:"primary"}),f=F(t,{variant:"solid",color:"primary"}),x=({nextStep:E})=>A=>{A.preventDefault();const{organization:I}=A.target.elements;n.history.pushState("","",m(E.name,{organization:I.value}))},w=E=>{var B;E.preventDefault();const{organization:A}=(B=n.document.forms)==null?void 0:B.formStep1.elements,D=new URLSearchParams(n.location.search).get("choice");alert(`organization ${A.value}, choice:${D}`)},y=[{name:"step1",Header:()=>"Step 1",Content:({nextStep:E})=>p({onsubmit:x({nextStep:E}),id:"formStep1"},i("Organization",d({autofocus:!0,placeholder:"Organization",name:"organization"})),a(f({type:"submit"},"Next: ")))},{name:"step2",Header:()=>"Step 2",Content:({nextStep:E,previousStep:A})=>p(l(u(c({href:m(E.name,{choice:"choice1"})},"Choice 1")),u(c({href:m(E.name,{choice:"choice2"})},"Choice 2"))),a(h({href:m(A.name)},"Previous")))},{name:"step3",Header:()=>"Step 3",Content:({previousStep:E})=>p({onsubmit:w},s("My stepper 3 Content"),a(h({href:m(E.name)},"Previous: Step 2"),f({type:"submit"},"Save")))}];return()=>r(g({stepperDefs:y,stepperName:ze}))},mc=`import stepper, { NextUrl, type StepperPage } from "@grucloud/bau-ui/stepper";
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
`,gc={title:"Stepper",package:"stepper",description:"The stepper component displays a series of screens that are accessed one after the other.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/stepper/stepper.js",importStatement:'import stepper from "@grucloud/bau-ui/stepper";',examples:[{title:"Horizontal Stepper",description:"A simple horizontal stepper.",code:dc,createComponent:uc},{title:"Vertical Stepper",description:"A simple vertical stepper.",code:mc,createComponent:pc}]},bc=t=>{const e=G(t);return()=>e(gc)},hc=()=>ot.map(t=>`
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
`);function Un(t,e={}){const{bau:n,css:o}=t,{input:a}=n.tags,s=o`
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
    ${hc()}
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"plain",color:u=e.color??"neutral",...d},...p]=X(r);return a({...d,class:T("switch",s,u,l,c,e==null?void 0:e.class,d.class),type:"checkbox",required:"required"},...p)}}const Fn=(t,e)=>{const{bau:n,css:o}=t,{form:a,label:s}=n.tags,i=Un(t,e);return r=>a({class:o`
          & label {
            display: inline-flex;
            border: 1px dotted var(--color-emphasis-200);
            font-size: smaller;
            align-items: center;
            color: var(--color-content-secondary);
            padding: 0.2rem;
          }
        `},s("off ",i({...r,id:`my-switch-example-off-${r.color}-${r.variant}`})),s("on ",i({...r,id:`my-switch-example-on-${r.color}-${r.variant}`,checked:!0})))},fc=t=>{const{bau:e,css:n}=t,{section:o,form:a,label:s}=e.tags,i=Un(t);return()=>o(a(s({class:n`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `},"My shinny switch",i({variant:"outline",id:"my-shinny-switch"}))))},vc=`import createSwitch from "@grucloud/bau-ui/switch";
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
`,xc={title:"Switch",package:"switch",description:"The switch component allows a user to to choose a boolean value.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/switch/switch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/switch";',examples:[{title:"Default",description:"A simple switch.",code:vc,createComponent:fc}],gridItem:Fn},yc=t=>{const e=G(t);return()=>e(xc)},wc=()=>ot.map(t=>`
&.tabs.solid.${t} {
}
`).join(`
`);function Ot(t,e={}){const{bau:n,css:o,window:a}=t,{tabDefs:s}=e,{div:i,ul:r,li:c,a:l}=n.tags,u=o`
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
    ${wc()}
  `;return function(...p){let[{size:g=e.size??"md",variant:m=e.variant??"plain",color:h=e.color??"neutral",tabsKey:f="tabs",...x},...w]=X(p);const y=n.state(s),E=L=>y.val.find(N=>N.name==L),A=n.state(s[0]),I=()=>{var R,H;const N=new URLSearchParams(a.location.search).get(f)??s[0].name,j=E(N);(R=A.val.exit)==null||R.call(),A.val=j,(H=j==null?void 0:j.enter)==null||H.call()};I(),a.history.pushState=new Proxy(a.history.pushState,{apply:(L,N,j)=>{L.apply(N,j);const R=j[2]??"";["?","#"].includes(R[0])&&I()}});const D=L=>{const N=new URLSearchParams(a.location.search);return N.delete(f),N.append(f,L),`?${N.toString()}`},B=L=>{const{Header:N,disabled:j,name:R}=L;return c({class:()=>T(A.val.name==R&&"active",j&&"disabled")},l({href:D(R)},N(L)))},O=i({class:T("tabs",m,g,h,u,e==null?void 0:e.class,x.class),bauMounted:({element:L})=>{a.addEventListener("popstate",I)},bauUnmounted:()=>{a.removeEventListener("popstate",I)}},n.loop(y,r(),B),n.bind({deps:[A],render:()=>({Content:L})=>L?L(x):""}));return O.addEventListener("tab.add",L=>{var j;const{tab:N}=L.detail;(j=N.enter)==null||j.call(),y.val.push(N)},!1),O.addEventListener("tab.remove",L=>{var j;const N=y.val.findIndex(R=>R.name==L.detail.tabName);N>0&&((j=y.val[N].exit)==null||j.call(),y.val.splice(N,1))},!1),O}}const Sc=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=Ot(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]});return()=>s({})},Cc=`import tabs, { Tabs } from "@grucloud/bau-ui/tabs";
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
`,kc=t=>{const{bau:e}=t,{div:n,p:o}=e.tags,s=Ot(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>n(o("My Content")),enter:async()=>console.log("tab1 enter"),exit:async()=>console.log("tab1 exit")},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My TAB 2 Content")),enter:async()=>console.log("tab2 enter"),exit:async()=>console.log("tab2 exit")},{name:"Tab Disabled",disabled:!0,Header:()=>"Tab Disabled",Content:()=>n(o("My Content Disabled"))}],variant:"plain",color:"neutral"});return()=>s({tabsKey:"my-tab"})},Ec=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Vn=t=>{const{bau:e}=t,{div:n,p:o}=e.tags;return[{name:"Tab1",Header:()=>"TAB",Content:()=>n(o("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>n(o("My tab 2 Content"))}]},Ac=t=>{const{css:e}=t,n=Ot(t,{tabDefs:Vn(t),class:e`
      flex-direction: column-reverse;
    `});return()=>n({})},Tc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Dc=t=>{const{css:e}=t,n=Vn(t),o=Ot(t,{tabDefs:n,class:e`
      & ul {
        justify-content: center;
      }
    `});return()=>o({})},Mc=`import tabs from "@grucloud/bau-ui/tabs";
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
`,Bc={title:"Tabs",package:"tabs",description:"The tabs component displays multiple content and a header for navigation.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tabs/tabs.js",importStatement:'import tabs from "@grucloud/bau-ui/tabs";',examples:[{title:"Default",description:"A simple tabs.",code:Cc,createComponent:Sc},{title:"Extended Tabs",description:"An extended tabs.",code:Ec,createComponent:kc},{title:"Bottom Header Tabs",description:"Tabs where the header is at the bottom of the content.",code:Tc,createComponent:Ac},{title:"Centered Header Tabs",description:"Tabs where the headers are centered.",code:Mc,createComponent:Dc}]},Ic=t=>{const e=G(t);return()=>e(Bc)};function Pt(t,e){const{bau:n,css:o,createGlobalStyles:a}=t,{div:s}=n.tags;a`
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
  `;return function(...c){let[{...l},...u]=X(c);return s({...l,class:T("table-container",i,e==null?void 0:e.class,l==null?void 0:l.class)},...u)}}const Nc=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:u}=e.tags;function d(f,x,w,y,E){return{name:f,calories:x,fat:w,carbs:y,protein:E}}const p=[d("Frozen yoghurt",159,6,24,4),d("Ice cream sandwich",237,9,37,4.3),d("Eclair",262,16,24,6),d("Cupcake",305,3.7,67,4.3),d("Gingerbread",356,16,49,3.9)],g=({name:f,calories:x})=>i(s(f),s({class:n`
            text-align: right;
          `},x)),m=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),h=Pt(t,{class:n`
      max-width: 650px;
    `});return()=>o(h(r(u("Basic Table"),m(),l(p.map(g)))))},$c=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function At(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const Lc=[At("Frozen yoghurt",159,6,24,4),At("Ice cream sandwich",237,9,37,4.3),At("Eclair",262,16,24,6),At("Cupcake",305,3.7,67,4.3),At("Gingerbread",356,16,49,3.9)],Oc=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:u}=e.tags,d=({name:m,calories:h})=>i(s(m),s({class:n`
            text-align: right;
          `},h)),p=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pt(t,{class:n`
      & td,
      th {
        padding: 0.4rem;
      }
    `});return()=>o(g(r(u("Table Dense"),p(),l(Lc.map(d)))))},Pc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`;function Tt(t,e,n,o,a){return{name:t,calories:e,fat:n,carbs:o,protein:a}}const zc=[Tt("Frozen yoghurt",159,6,24,4),Tt("Ice cream sandwich",237,9,37,4.3),Tt("Eclair",262,16,24,6),Tt("Cupcake",305,3.7,67,4.3),Tt("Gingerbread",356,16,49,3.9)],_c=t=>{const{bau:e,css:n}=t,{section:o,th:a,td:s,tr:i,table:r,thead:c,tbody:l,caption:u}=e.tags,d=({name:m,calories:h})=>i(s(m),s({class:n`
            text-align: right;
          `},h)),p=()=>c(i(a({class:n`
              text-align: left;
            `,title:"Product Name"},"Product Name"),a({class:n`
              text-align: right;
            `,title:"Calories"},"Calories"))),g=Pt(t,{class:n`
      & thead,
      tr:nth-child(2n) {
        background-color: var(--table-stripe-background);
      }
    `});return()=>o(g(r(u("Table Zebra"),p(),l(zc.map(d)))))},Rc=`import tableContainer from "@grucloud/bau-ui/tableContainer";
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
`,jc={title:"Table",package:"table",description:"The table container component styles an HTML table.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/table/table.js",importStatement:'import tableContainer from "@grucloud/bau-ui/tableContainer";',examples:[{title:"Default",description:"A simple table.",code:$c,createComponent:Nc},{title:"Dense",description:"A dense table.",code:Pc,createComponent:Oc},{title:"Zebra",description:"A zebra table.",code:Rc,createComponent:_c}]},Gc=t=>{const e=G(t);return()=>e(jc)},Hc=t=>{const{bau:e,css:n}=t,{h1:o,h2:a,h3:s,section:i,article:r}=e.tags,c=an(t),l=r({id:"content",class:n`
        grid-area: content;
      `},o({id:"h1"},"h1"),a({id:"h2-1"},"h2 1"),s({id:"h3-1-1"},"h3 1 1"),s({id:"h3-1-2"},"h3 1 2"),a({id:"h2-2"},"h2 2"),s({id:"h3-2-1"},"h3 2 1"));return()=>i({class:n`
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: "content toc";
        `},l,c({contentEl:l}))},Uc=`import tableOfContent from "@grucloud/bau-ui/tableOfContent";
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
`,Fc={title:"TableOfContent",package:"tableOfContent",description:"The tableOfContent component displays a table of content",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tableOfContent/tableOfContent.js",importStatement:'import tableOfContent from "@grucloud/bau-ui/tableOfContent";',examples:[{title:"Simple TableOfContent",description:"A simple tableOfContent.",code:Uc,createComponent:Hc}]},Vc=t=>{const e=G(t);return()=>e(Fc)};function Wn(t,e={}){const{bau:n,css:o}=t,{div:a}=n.tags,s=fe(t),i=F(t),r=mt(t),c=o`
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
  `,l=({label:m,icon:h,...f})=>i({"aria-label":m,title:m,...f},h),u=({count:m,totalCount:h,page:f,rowsPerPage:x})=>a({class:"pages-numbers"},Number(f-1)*Number(x)+(m>0?1:0),"-",Math.min(f*x,h)," of ",h),d=({count:m,page:h,rowsPerPage:f})=>a({class:"pages-numbers"},(h-1)*f+(m>0?1:0),"-",h*f),p=m=>m<=1,g=(m,h,f)=>m>=Math.ceil(h/f);return function(...h){let[{size:f=e.size??"md",variant:x=e.variant??"outline",color:w=e.color??"neutral",count:y=0,totalCount:E=0,page:A=1,rowsPerPage:I=50,onPageChange:D,isLoading:B=!1,disableFirst:O=()=>p(A),disablePrevious:L=()=>p(A),disableNext:N=()=>g(A,E,I),disableLast:j=()=>g(A,E,I),...R},...H]=X(h);const Z=Math.max(0,Math.ceil(E/I)),S=D({page:1}),b=D({page:A-1}),v=D({page:A+1}),C=D({page:Z}),k=[{label:"First",icon:"⟪",onclick:S,disabled:O()},{label:"Previous",icon:"⟨",onclick:b,disabled:L()},{label:"Next",icon:"⟩",onclick:v,disabled:N()},{label:"Last",icon:"⟫",onclick:C,disabled:j()}];return a({...R,class:T("table-pagination",c,B&&"disabled",e==null?void 0:e.class,R==null?void 0:R.class)},r({class:"spinner",visibility:B,size:"md"}),E>0?u({count:y,totalCount:E,page:A,maxPages:Z,rowsPerPage:I}):d({count:y,page:A,maxPages:Z,rowsPerPage:I}),s({variant:x,color:w},k.map(P=>l({...P,variant:x,color:w}))))}}const Wc=(t=1e3)=>new Array(t).fill("").map(()=>({name:"my name",email:"myemail@mail.com"})),Kc=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:c}=e.tags,l=Wc(45),u=({name:w,email:y})=>s(a(w),a(y)),d=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Email")),p=Wn(t),g=Pt(t,{class:n`
      max-width: 650px;
    `}),m=e.state(l),h=e.state({count:l.length,totalCount:l.length,page:1,rowsPerPage:10}),f=e.derive(()=>m.val.slice(h.val.page*h.val.rowsPerPage,(h.val.page+1)*h.val.rowsPerPage)),x=({page:w})=>y=>{h.val.page=w};return()=>g(i(d(),()=>c(f.val.map(u))),()=>p({...h.val,onPageChange:x}))},Xc=t=>{const{bau:e,css:n}=t,{th:o,td:a,tr:s,table:i,thead:r,tbody:c,div:l}=e.tags,u=e.state(!1),d=e.state([]),p=e.state(""),g=e.derive(()=>d.val.length),m=e.state(1),h=e.state(10),f=e.derive(()=>d.val),x=O=>`https://api.github.com/orgs/aws/repos?${new URLSearchParams(O).toString()}`,w=({page:O})=>L=>{m.val=O,y(x({page:O,per_page:h.val}))};y(x({page:1,per_page:h.val}));async function y(O){try{u.val=!0;const L=await fetch(O,{});if(L.ok){const N=await L.json();d.val=N;return}throw L}catch(L){p.val=L.message}finally{u.val=!1}}const E=({name:O,description:L,stargazers_count:N})=>s(a(O),a(L),a({class:n`
            text-align: right;
          `},N)),A=()=>r(o({class:n`
            text-align: left;
          `},"Name"),o({class:n`
            text-align: left;
          `},"Description"),o({class:n`
            text-align: right;
          `},"Stars")),I=Wn(t),D=Pt(t,{class:n`
      min-width: 650px;
    `}),B=({message:O})=>l(O);return()=>D(()=>I({rowsPerPage:h.val,page:m.val,count:g.val,totalCount:-1,isLoading:u.val,onPageChange:w,disableNext:()=>!1}),i(A(),()=>p.val&&B({message:p.val}),()=>c(f.val.map(E))))},Zc=t=>{const{bau:e,css:n}=t,{section:o,div:a,h3:s,h2:i,tr:r}=e.tags,c=Kc(t),l=Xc(t),u=(...d)=>a({class:n`
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
        `},...d);return()=>o({id:"pagination"},i(r("Table Pagination")),s("Asynchronous Pagination"),u(l()),s("Simple Pagination"),u(c()))};function zt(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{button:s}=n.tags;a`
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
  `;return function(...c){let[{size:l=e.size??"md",variant:u=e.variant??"outline",color:d=e.color??"neutral",selected:p=!1,disabled:g,onChange:m,...h},...f]=X(c);return s({type:"button",...h,"aria-pressed":{deps:[p],renderProp:()=>x=>x},class:{deps:[p],renderProp:()=>x=>T("toggle",l,d,u,i,x&&"selected",e==null?void 0:e.class,h==null?void 0:h.class)},disabled:g},f)}}const Kn=(t,e)=>{const{bau:n}=t,o=zt(t,e);return a=>{const s=n.state(!1);return o({...a,selected:s,onclick:()=>s.val=!s.val},"Toggle Me")}},qc=t=>{const{bau:e}=t,{section:n}=e.tags,o=zt(t),a=e.state(!1);return()=>n(o({variant:"plain",selected:a,onclick:()=>a.val=!a.val},"Toggle Me"))},Jc=`import toggle from "@grucloud/bau-ui/toggle";

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
`,Yc={title:"Toggle",package:"toggle",description:"The toggle component displays a button with 2 states",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggle/toggle.js",importStatement:'import toggle from "@grucloud/bau-ui/toggle";',examples:[{title:"Simple Toggle",description:"A simple toggle.",code:Jc,createComponent:qc}],gridItem:Kn},Qc=t=>{const e=G(t);return()=>e(Yc)},tu=()=>ot.map(t=>`
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
  `;return function(...r){let[{size:c=e.size??"md",variant:l=e.variant??"outline",color:u=e.color??"neutral",exclusive:d=!1,onChange:p=()=>{},...g},...m]=X(r);const h=new Set,f=x=>{const{value:w}=x.target;d?(h.clear(),h.add(w)):h.has(w)?h.delete(w):h.add(w),p({event:x,values:[...h]})};return a({...g,class:T("toggle-group",c,u,l,s,e==null?void 0:e.class,g==null?void 0:g.class),onclick:f},...m)}}const Xn=(t,e)=>{const{bau:n}=t,o=ye(t,e),a=zt(t,e);return s=>{const i=n.state([""]),r=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}];return o({...s,onChange:({values:l})=>{i.val=l}},r.map(({label:l,value:u})=>()=>a({...s,value:u,selected:i.val.includes(u),"area-label":l},l)))}},eu=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s=zt(t),i=ye(t),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(i({color:r,variant:c,exclusive:!0,onChange:l},a.map(({label:u,value:d})=>()=>s({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},nu=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,ou=t=>{const{bau:e}=t,{section:n}=e.tags,o=e.state([""]),a=[{value:"one",label:"ONE"},{value:"two",label:"TWO"},{value:"three",label:"THREE"}],s=zt(t),i=ye(t),r="primary",c="solid",l=({values:u})=>{o.val=u};return()=>n(i({color:r,variant:c,onChange:l},a.map(({label:u,value:d})=>()=>s({color:r,variant:c,value:d,selected:o.val.includes(d),"area-label":u},u))))},au=`import toggleGroup from "@grucloud/bau-ui/toggleGroup";
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
`,ru={title:"Toggle Group",package:"toggleGroup",description:"The toggleGroup component displays a set of toogle button",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/toggleGroup/toggleGroup.js",importStatement:'import toggleGroup from "@grucloud/bau-ui/toggleGroup";',examples:[{title:"Exclusive ToggleGroup",description:"A simple exclusive toggleGroup.",code:nu,createComponent:eu},{title:"Inclusive ToggleGroup",description:"A simple inclusive toggleGroup.",code:au,createComponent:ou}],gridItem:Xn},su=t=>{const e=G(t);return()=>e(ru)};function we(t,e={}){const{bau:n,css:o,window:a}=t,{div:s}=n.tags,i=o`
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
  `;return function(...c){let[{titleEl:l,side:u="bottom-start",size:d=e.size??"md",variant:p=e.variant??"outline",color:g=e.color??"neutral",...m},...h]=X(c);const f=s({class:T("container",...u.split("-"))},s({class:T("content",g,p,d),role:"tooltip"},l)),x=D=>`move-to-${D}`,w=(D,B,O)=>{if(D()){const L=x(B);f.classList.add(L),f.classList.add(B),f.classList.remove(O)}},y=(D,B)=>{const O=x(D);f.classList.contains(O)&&(f.classList.remove(O),f.classList.add(B),f.classList.remove(D))},E=D=>{const B=f.getBoundingClientRect();w(()=>B.x<0,"right","left"),w(()=>B.x+B.width>a.innerWidth,"left","right"),w(()=>B.y<0,"bottom","top"),w(()=>B.bottom>a.innerHeight,"top","bottom"),f.classList.add("visible")},A=D=>{f.classList.remove("visible"),y("right","left"),y("left","right"),y("bottom","top"),y("top","bottom")};return s({...m,class:T("tooltip",i,e==null?void 0:e.class,m==null?void 0:m.class),bauMounted:({element:D})=>{D.addEventListener("mouseover",E),D.addEventListener("mouseout",A)},bauUnmounted:({element:D})=>{D.removeEventListener("mouseover",E),D.removeEventListener("mouseout",A)}},...h,f)}}const Zn=(t,e)=>{const{bau:n}=t,{div:o,p:a,em:s}=n.tags,i=F(t),r=we(t,e),c=()=>o(a("A ",s("tooltip")," can be any component"));return l=>r({titleEl:c(),...l},i(l,`${l.color} ${l.variant}`))},iu=t=>{const{bau:e}=t,{div:n,p:o,em:a}=e.tags,s=F(t),i=we(t),r=()=>n(o("A ",a("tooltip")," can be any component"));return()=>i({side:"bottom-start",titleEl:r()},s("tooltip"))},lu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,cu=t=>{const{bau:e,css:n}=t,{div:o,p:a,em:s,section:i}=e.tags,r=It(t,{variant:"outline",color:"primary"}),c=we(t),l=()=>o(a("A ",s("tooltip")," can be any component")),u=()=>i({class:n`
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
          `},c({side:"bottom-start",titleEl:l()},r("bottom start")),c({side:"bottom-centered",titleEl:l()},r("bottom centered")),c({side:"bottom-end",titleEl:l()},r("bottom end"))));return()=>u()},uu=`import tooltip from "@grucloud/bau-ui/tooltip";
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
`,du={title:"Tooltip",package:"tooltip",description:"The tooltip display information next to a component.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/tooltip/tooltip.js",importStatement:'import tooltip from "@grucloud/bau-ui/tooltip";',examples:[{title:"Default",description:"A simple tooltip.",code:lu,createComponent:iu},{title:"Grid",description:"Various tooltip position",code:uu,createComponent:cu}],gridItem:Zn},pu=t=>{const e=G(t);return()=>e(du)},qn=(t,e)=>{const n=ie(t,e);return o=>n(o)},mu=t=>{const{bau:e}=t,{section:n}=e.tags,o=ie(t);return()=>n(o({}))},gu=`import createThemeSwitch from "@grucloud/bau-ui/themeSwitch";
import { Context } from "@grucloud/bau-ui/context";

export default (context: Context) => {
  const { bau } = context;
  const { section } = bau.tags;

  const ThemeSwitch = createThemeSwitch(context);

  return () => section(ThemeSwitch({}));
};
`,bu={title:"Theme Switch",package:"themeSwitch",description:"The themeSwitch component allows a user to switch between light and dark theme.",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/themeSwitch/themeSwitch.js",importStatement:'import createSwitch from "@grucloud/bau-ui/themeSwitch";',examples:[{title:"Default",description:"A simple themeSwitch.",code:gu,createComponent:mu}],gridItem:qn},hu=t=>{const e=G(t);return()=>e(bu)},fu=({css:t,createGlobalStyles:e})=>(e`
:root {
  --treeview-link-padding-horizontal: 0.75rem;
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
  `});function Jn(t,e={}){const{bau:n,css:o,createGlobalStyles:a}=t,{renderMenuItem:s}=e,{ul:i,li:r,nav:c,div:l}=n.tags,u=fu({css:o,createGlobalStyles:a}),d=ge(t),p=({depth:g=1,maxDepth:m,color:h,variant:f,size:x})=>w=>{const{children:y,expanded:E}=w,A=n.state(!E),I=()=>l({class:o`
              cursor: pointer;
              display: flex;
              width: 100%;
            `,onclick:B=>{y&&(A.val=!A.val)}},s(w.data)),D=()=>i({class:T(h,x)},y.map(p({depth:g+1,maxDepth:m})));return r(d({size:x,Header:I,Content:y&&g<m&&D}))};return function({tree:m,maxDepth:h=1/0,size:f=e.size??"md",variant:x=e.variant??"outline",color:w=e.color??"neutral",...y}){return c({class:T(u.nav,f,x,w,e==null?void 0:e.class,y.class)},m.children&&i(m.children.map(p({maxDepth:h,color:w,variant:x,size:f}))))}}const Yn=(t,e)=>{const{bau:n}=t,{a:o}=n.tags,a={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},i=Jn(t,{renderMenuItem:({name:r,href:c})=>o({href:c},r),...e});return r=>i({...r,tree:a})},vu=t=>{const{bau:e}=t,{a:n}=e.tags,o={data:{name:"Root Menu"},children:[{data:{name:"Menu 1",href:"#menu"},expanded:!0,children:[{data:{name:"Sub Menu 1",href:"#menusub2"}},{data:{name:"Sub Menu 2",href:"#menusub1"}}]},{data:{name:"Menu 2",href:"#menu2"},children:[{data:{name:"Sub Menu 21",href:"#menusub21"}}]}]},s=Jn(t,{renderMenuItem:({name:i,href:r})=>n({href:r},i)});return()=>s({tree:o})},xu=`import treeView, { type Tree } from "@grucloud/bau-ui/treeView";
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
`,yu={title:"Tree View",package:"treeview",description:"A tree view displays a hierarchical list",sourceCodeUrl:"https://github.com/grucloud/bau/blob/main/bau-ui/treeview/treeview.js",importStatement:'import treeview from "@grucloud/bau-ui/treeview";',examples:[{title:"Default",description:"A simple treeview.",code:xu,createComponent:vu}],gridItem:Yn},wu=t=>{const e=G(t);return()=>e(yu)},Su=(t,e)=>{const{bau:n}=t,{div:o,p:a}=n.tags,i=Ot(t,{tabDefs:[{name:"Tab1",Header:()=>"TAB 1",Content:()=>o(a("My Tab 1 Content"))},{name:"Tab2",Header:()=>"TAB 2",Content:()=>o(a("My tab 2 Content"))}],...e});return r=>i(r)},Cu=t=>{const{bau:e,css:n}=t,{section:o,div:a,h1:s,p:i,ul:r,li:c}=e.tags,l=rn(t),u=F(t),d=[{name:"Accordion",Item:sn(t)},{name:"Alert",Item:cn(t)},{name:"Autocomplete",Item:dn(t)},{name:"Avatar",Item:un(t)},{name:"Badge",Item:mn(t)},{name:"Breadcrumbs",Item:gn(t)},{name:"Button",Item:bn(t)},{name:"Button Group",Item:hn(t)},{name:"Calendar",Item:vn(t)},{name:"Checkbox",Item:yn(t)},{name:"Chip",Item:xn(t)},{name:"DrillDown Menu",Item:Sn(t,{base:"/components",hashBased:!0})},{name:"File Input",Item:kn(t)},{name:"Input",Item:En(t)},{name:"Input Search",Item:An(t)},{name:"Linear Progress",Item:In(t)},{name:"Loading Button",Item:Nn(t)},{name:"Modal",Item:Ln(t)},{name:"Radio Button",Item:On(t)},{name:"Select",Item:Pn(t)},{name:"Select Native",Item:_n(t)},{name:"Slider",Item:Rn(t)},{name:"Spinner",Item:jn(t)},{name:"Switch",Item:Fn(t)},{name:"Tabs",Item:Su(t)},{name:"Theme Switch",Item:qn(t)},{name:"Toggle",Item:Kn(t)},{name:"Toggle Group",Item:Xn(t)},{name:"Tooltip",Item:Zn(t)},{name:"Tree View",Item:Yn(t)}];return()=>o({class:n`
          overflow-y: scroll;
        `},s("Bau Component Gallery"),i("This page displays the components with various colors and variants."),r({class:n`
            display: inline-flex;
            flex-wrap: wrap;
            gap: 1rem;
            list-style: none;
            padding: 1rem;
          `},d.map(({name:p})=>c(u({color:"primary",variant:"solid",href:`#${p}`,size:"sm"},p)))),d.map(p=>a({id:p.name,class:n`
              border: 1px dotted var(--color-emphasis-400);
              padding: 1rem;
              margin: 1rem;
            `},l(p))))},ku=({context:t})=>{const e=Cu(t);return[{path:"",action:n=>({title:"Bau UI",component:_o(t)})},{path:"GettingStarted",action:n=>({title:"Getting Started",component:Ha(t)})},{path:"components",action:()=>({title:"Component",component:e}),children:[{path:"accordion",action:()=>({title:"Accordion",component:Ya(t)})},{path:"alert",action:()=>({title:"Alert",component:sr(t)})},{path:"alertStack",action:()=>({title:"Alert Stack",component:dr(t)})},{path:"animate",action:()=>({title:"Animate",component:fr(t)})},{path:"autocomplete",action:()=>({title:"Autocomplete",component:$r(t)})},{path:"avatar",action:()=>({title:"Avatar",component:Cr(t)})},{path:"badge",action:()=>({title:"Badge",component:zr(t)})},{path:"breadcrumb",action:()=>({title:"Breadcrumb",component:Ur(t)})},{path:"button",action:()=>({title:"Button",component:Zr(t)})},{path:"buttonGroup",action:()=>({title:"Button Group",component:ts(t)})},{path:"calendar",action:()=>({title:"Calendar",component:as(t)})},{path:"carousel",action:()=>({title:"Carousel",component:us(t)})},{path:"chip",action:()=>({title:"Chip",component:gs(t)})},{path:"checkbox",action:()=>({title:"Checkbox",component:ys(t)})},{path:"collapsible",action:()=>({title:"Collapsible",component:ks(t)})},{path:"divider",action:()=>({title:"Divider",component:Ms(t)})},{path:"drawer",action:()=>({title:"Drawer",component:Ls(t)})},{path:"dropdownMenu",action:()=>({title:"Dropdown Menu ",component:js(t)})},{path:"drillDownMenu",action:()=>({title:"DrillDown Menu",component:Fs(t)})},{path:"fileInput",action:()=>({title:"File Input",component:Xs(t)})},{path:"form",action:()=>({title:"Form",component:ni(t)})},{path:"input",action:()=>({title:"Input",component:si(t)})},{path:"inputSearch",action:()=>({title:"Input Search",component:ui(t)})},{path:"keyValueList",action:()=>({title:"Key Value List",component:hi(t)})},{path:"lazy",action:()=>({title:"Lazy",component:ki(t)})},{path:"linearProgress",action:()=>({title:"Linear Progress",component:Di(t)})},{path:"list",action:()=>({title:"List",component:Ri(t)})},{path:"loadingButton",action:()=>({title:"Loading Button",component:Ni(t)})},{path:"modal",action:()=>({title:"Modal",component:Ui(t)})},{path:"multiSelect",action:()=>({title:"Multi Select",component:Ji(t)})},{path:"paginationNavigation",action:()=>({title:"Pagination Navigation",component:sl(t)})},{path:"paper",action:()=>({title:"Paper",component:dl(t)})},{path:"popover",action:()=>({title:"Popover",component:el(t)})},{path:"radioButton",action:()=>({title:"Radio Button",component:bl(t)})},{path:"radioButtonGroup",action:()=>({title:"Radio Button Group",component:El(t)})},{path:"select",action:()=>({title:"Select",component:Pl(t)})},{path:"selectNative",action:()=>({title:"Select Native",component:jl(t)})},{path:"skeleton",action:()=>({title:"Skeleton",component:ql(t)})},{path:"slider",action:()=>({title:"Slider",component:ac(t)})},{path:"spinner",action:()=>({title:"Spinner",component:lc(t)})},{path:"stepper",action:()=>({title:"Stepper",component:bc(t)})},{path:"switch",action:()=>({title:"Switch",component:yc(t)})},{path:"table",action:()=>({title:"Table",component:Gc(t)})},{path:"tableOfContent",action:()=>({title:"Table",component:Vc(t)})},{path:"tablePagination",action:()=>({title:"Table Pagination",component:Zc(t)})},{path:"tabs",action:()=>({title:"Tabs",component:Ic(t)})},{path:"toggle",action:()=>({title:"Toggle",component:Qc(t)})},{path:"toggleGroup",action:()=>({title:"Toggle Group",component:su(t)})},{path:"tooltip",action:()=>({title:"Tooltip",component:pu(t)})},{path:"themeSwitch",action:()=>({title:"Theme Switch",component:hu(t)})},{path:"treeView",action:()=>({title:"Tree View",component:wu(t)})}]},{path:"pages",action:n=>({title:"Pages",component:Go(t)})}]},Eu=t=>({title:t.tr("Page Not Found"),component:()=>"Not Found"}),Au=({context:t,LayoutDefault:e,config:{base:n=""}})=>{const{window:o,bau:a,states:s}=t,i=a.state(),r=e({componentState:i});return document.getElementById("app").replaceChildren(r),({router:l})=>{const u=o.location.pathname.replace(n,""),{title:d,component:p,Layout:g=e}=l.resolve({pathname:u});i.val=p({}),document.title=`${d}`}},Tu=t=>{const{createGlobalStyles:e}=t;e`
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
  `};ho();const Qn={title:"Bau",base:"/bau/bau-ui"},ht=ko({config:Qn}),{bau:Du}=ht;ht.states={drawerOpen:Du.state(!0)};Tu(ht);ro({routes:ku({context:ht}),onLocationChange:Au({context:ht,LayoutDefault:Lo(ht),config:Qn}),notFoundRoute:Eu(ht)});
